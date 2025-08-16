import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');
    
    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }
    
    let event: Stripe.Event;
    
    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
        
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout session:', session.id);
    
    const metadata = session.metadata;
    if (!metadata) {
      console.error('No metadata found in session:', session.id);
      return;
    }
    
    // Store investment record in Firebase
    const investmentData = {
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      userId: metadata.userId || null,
      userEmail: metadata.userEmail || session.customer_details?.email,
      userName: metadata.userName || session.customer_details?.name,
      projectName: metadata.projectName,
      productionId: metadata.productionId || null,
      tierName: metadata.tierName,
      tierAmount: parseFloat(metadata.tierAmount || '0'),
      amountPaid: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
      currency: session.currency || 'usd',
      paymentStatus: session.payment_status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Add to investments collection
    const docRef = await addDoc(collection(db, 'investments'), investmentData);
    console.log('Investment record created:', docRef.id);
    
    // You can add additional logic here like:
    // - Sending confirmation emails
    // - Updating user profiles
    // - Triggering fulfillment processes
    // - Creating investor accounts
    
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment succeeded:', paymentIntent.id);
    
    // Additional logic for successful payments
    // This could include updating investment status, triggering notifications, etc.
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment failed:', paymentIntent.id);
    
    // Handle failed payments
    // This could include logging failed attempts, notifying administrators, etc.
    
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}