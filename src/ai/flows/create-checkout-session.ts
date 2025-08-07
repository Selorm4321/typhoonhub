
'use server';

/**
 * @fileOverview Creates a Stripe checkout session for an investment.
 *
 * - createCheckoutSession - A function that handles creating the checkout session.
 * - CreateCheckoutSessionInput - The input type for the function.
 * - CreateCheckoutSessionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
  });
}
const db = admin.firestore();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const CreateCheckoutSessionInputSchema = z.object({
  userId: z.string().describe('The ID of the user making the investment.'),
  userEmail: z.string().email().describe('The email of the user.'),
  tierName: z.string().describe('The name of the investment tier.'),
  tierAmount: z.number().int().min(1).describe('The investment amount in USD cents.'),
  projectName: z.string().describe('The name of the project being invested in.'),
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
    const { userId, userEmail, tierName, tierAmount, projectName } = input;
    
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${projectName} - ${tierName} Tier`,
                description: `Investment in the project "${projectName}".`,
              },
              unit_amount: tierAmount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        customer_email: userEmail,
        metadata: {
          userId,
          tierName,
          projectName,
        },
        success_url: `${origin}/invest/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/invest/cancel`,
      });

      if (!session.id || !session.url) {
        throw new Error('Failed to create a valid Stripe session.');
      }

      await db.collection('users').doc(userId).collection('investments').add({
        stripeSessionId: session.id,
        projectName,
        tierName,
        amount: tierAmount,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      console.error('Stripe session creation failed:', error