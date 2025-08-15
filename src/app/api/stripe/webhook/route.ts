
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Idempotency: store processed event ids
async function alreadyProcessed(eventId: string) {
  const ref = db.collection("stripe_events").doc(eventId);
  const snap = await ref.get();
  if (snap.exists) {
    console.log(`Event ${eventId} already processed.`);
    return true;
  }
  return false;
}

async function markEventAsProcessed(eventId: string, data: any) {
    await db.collection("stripe_events").doc(eventId).set({
        ...data,
        processedAt: FieldValue.serverTimestamp(),
    });
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !whSecret) {
    console.error("Missing stripe-signature header or STRIPE_WEBHOOK_SECRET env");
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message || err);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (await alreadyProcessed(event.id)) {
    return NextResponse.json({ ok: true, message: "Event already processed." });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        const { userId, productionId, tierName } = session.metadata || {};
        const amount = session.amount_total;

        if (!userId || !productionId || !amount) {
          console.error('Missing metadata in checkout session:', session.id);
          break;
        }

        // 1. Update Production's funding
        const productionRef = db.collection('productions').doc(productionId);
        await db.runTransaction(async (transaction) => {
            const prodDoc = await transaction.get(productionRef);
            if (!prodDoc.exists) throw new Error('Production not found');
            
            const newFunding = (prodDoc.data()?.currentFunding || 0) + amount;
            const newInvestors = (prodDoc.data()?.investors || 0) + 1;

            transaction.update(productionRef, {
                currentFunding: newFunding,
                investors: newInvestors
            });
        });

        // 2. Create an investment record for the user
        const investmentRef = db.collection('users').doc(userId).collection('investments').doc(session.id);
        await investmentRef.set({
            productionId,
            amount, // in cents
            tierName,
            status: 'completed',
            createdAt: FieldValue.serverTimestamp(),
            stripeSessionId: session.id,
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    await markEventAsProcessed(event.id, { type: event.type });

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: `Webhook handler failed: ${error.message}` }, { status: 500 });
  }
}
