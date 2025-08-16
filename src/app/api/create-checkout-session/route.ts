import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Request validation schema
const CheckoutRequestSchema = z.object({
  tierName: z.string().min(1, "Tier name is required"),
  tierAmount: z.number().min(1, "Amount must be greater than 0"),
  projectName: z.string().min(1, "Project name is required"),
  userEmail: z.string().email("Valid email is required"),
  userName: z.string().min(1, "User name is required"),
  userId: z.string().optional(),
  productionId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = CheckoutRequestSchema.parse(body);
    const { tierName, tierAmount, projectName, userEmail, userName, userId, productionId } = validatedData;
    
    // Get the origin for redirect URLs
    const origin = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:9002';
    
    // Create or retrieve Stripe customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          userId: userId || '',
        },
      });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${projectName} - ${tierName} Investment`,
              description: `Investment in the "${projectName}" film project at the ${tierName} tier.`,
              images: [], // You can add project images here
            },
            unit_amount: Math.round(tierAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId || '',
        productionId: productionId || '',
        projectName,
        tierName,
        tierAmount: tierAmount.toString(),
        userEmail,
        userName,
      },
      success_url: `${origin}/invest/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/invest/cancel`,
      billing_address_collection: 'required',
      automatic_tax: {
        enabled: false,
      },
    });
    
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Payment processing error', message: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}