
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase-admin";

// --- Make sure these env vars are set in Firebase Hosting env ---
// STRIPE_SECRET_KEY
// STRIPE_WEBHOOK_SECRET

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Fetch projectId from metadata (Checkout Session or PaymentIntent)
function getProjectId(obj: any): string | undefined {
  const md = obj?.metadata || {};
  return md.projectId || md.project_id || md.project || undefined;
}

// Idempotency: store processed event ids
async function alreadyProcessed(eventId: string) {
  const ref = db().collection("stripe_events").doc(eventId);
  const snap = await ref.get();
  return { exists: snap.exists, ref };
}

async function incrementRaised(projectId: string, amountCents: number) {
  const ref = db().collection("productions").doc(projectId);
  await db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return; // silently ignore
    const current = Number(snap.data()?.raised ?? 0);
    tx.update(ref, { raised: current + amountCents });
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
    // IMPORTANT: use the raw body for signature verification
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message || err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // idempotency
    const { exists, ref } = await alreadyProcessed(event.id);
    if (exists) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // Handle events
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const projectId = getProjectId(session);
        // Prefer amount_total; fallback to amount_subtotal if needed
        const amount = session.amount_total ?? session.amount_subtotal ?? 0;
        if (projectId && amount > 0) {
          await incrementRaised(projectId, amount);
        }
        break;
      }

      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        const projectId = getProjectId(pi);
        // Stripe guarantees amount_received when succeeded
        const amount = pi.amount_received ?? pi.amount ?? 0;
        if (projectId && amount > 0) {
          await incrementRaised(projectId, amount);
        }
        break;
      }

      default:
        // Ignore everything else for now
        break;
    }

    // mark processed
    await ref.set({ processedAt: Date.now(), type: event.type });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
