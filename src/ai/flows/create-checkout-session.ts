
'use server';

/**
 * @fileOverview Creates a Stripe checkout session for an investment.
 *
 * - createCheckoutSession - A function that handles creating the checkout session.
 * - CreateCheckoutSessionInput - The input type for the function.
 * - CreateCheckoutSessionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
  });
}
const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const CreateCheckoutSessionInputSchema = z.object({
  userId: z.string().describe('The ID of the user making the investment.'),
  userEmail: z.string().email().describe('The email of the user.'),
  tierName: z.string().describe('The name of the investment tier.'),
  tierAmount: z.number().int().min(1).describe('The investment amount in USD dollars.'),
  projectName: z.string().describe('The name of the project being invested in.'),
  productionId: z.string().describe('The ID of the production being invested in.'),
});
export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionInputSchema>;

const CreateCheckoutSessionOutputSchema = z.object({
  sessionId: z.string().describe('The ID of the created Stripe checkout session.'),
  url: z.string().url().describe('The URL to redirect the user to for checkout.'),
});
export type CreateCheckoutSessionOutput = z.infer<typeof CreateCheckoutSessionOutputSchema>;

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<CreateCheckoutSessionOutput> {
  return createCheckoutSessionFlow(input);
}

const createCheckoutSessionFlow = ai.defineFlow(
  {
    name: 'createCheckoutSessionFlow',
    inputSchema: CreateCheckoutSessionInputSchema,
    outputSchema: CreateCheckoutSessionOutputSchema,
  },
  async (input) => {
    const { userId, userEmail, tierName, tierAmount, projectName, productionId } = input;
    
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    
    try {
      // Check for an existing Stripe customer, or create a new one
      const customerSnapshot = await db.collection('customers').doc(userId).get();
      let customerId;
      if (customerSnapshot.exists) {
        customerId = customerSnapshot.data()?.stripeCustomerId;
      }
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: userEmail,
          metadata: { userId },
        });
        customerId = customer.id;
        await db.collection('customers').doc(userId).set({
          stripeCustomerId: customerId,
          email: userEmail,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${projectName} - ${tierName}`,
                description: `Investment in the project "${projectName}".`,
              },
              unit_amount: tierAmount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          productionId,
          projectName,
          tierName,
        },
        success_url: `${origin}/invest/success?session_id={CHECKOUT_SESSION_ID}&production_id=${productionId}`,
        cancel_url: `${origin}/invest/cancel`,
      });

      if (!session.id || !session.url) {
        throw new Error('Failed to create a valid Stripe session.');
      }
      
      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error: any) {
      console.error('Stripe session creation failed:', error);
      throw new Error(`Stripe error: ${error.message}`);
    }
  }
);
