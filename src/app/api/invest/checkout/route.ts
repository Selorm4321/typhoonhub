
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function POST(req: Request) {
  try {
    const { projectId, projectTitle, amountCents } = await req.json();

    if (!projectId || !amountCents || amountCents < 50) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const doc = await db().collection("productions").doc(projectId).get();
    if (!doc.exists || !doc.data()?.active) {
      return NextResponse.json({ error: "Project unavailable" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Investment: ${projectTitle ?? "Project"}`,
              metadata: { projectId },
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
      metadata: { projectId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
