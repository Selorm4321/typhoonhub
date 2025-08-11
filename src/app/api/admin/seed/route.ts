
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_SEED_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doc = {
    active: true,
    title: "Cleaning House: Mary & Rose",
    slug: "cleaning-house-mary-and-rose",
    summary: "Feature-length drama about community, courage, and second chances.",
    goal: 5000000,
    raised: 0,
    heroImage:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1920&auto=format&fit=crop",
    minInvestment: 2500,
  };

  const ref = db().collection("productions").doc("mary-rose");
  await ref.set(doc, { merge: true });

  return NextResponse.json({ ok: true, id: ref.id });
}
