import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, projectSlug, tierName, projectTitle } = await req.json();
    
    const baseUrl = req.headers.get('origin') || 'http://localhost:9002';

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Investment - ${projectTitle}`,
              description: `${tierName} tier investment in ${projectTitle}`,
            },
            unit_amount: amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/invest/success?session_id={CHECKOUT_SESSION_ID}&production_id=${projectSlug}`,
      cancel_url: `${baseUrl}/invest/cancel`,
      metadata: {
        projectSlug,
        tierName,
        projectTitle,
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}