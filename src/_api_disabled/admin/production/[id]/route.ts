
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase-admin";

const ADMIN_COOKIE = "adminDash";

function isAuthorized() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_DASH_PASSWORD;
  return Boolean(cookie && expected && cookie === expected);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Basic validation
    const currency = String(body.currency || "USD").toUpperCase().slice(0, 3);
    const offerTermsUrl = typeof body.offerTermsUrl === "string" ? body.offerTermsUrl : "";

    const update: Record<string, any> = {
      active: !!body.active,
      currency,
      offerTermsUrl,

      platformFeePct: clampNumber(body.platformFeePct, 0, 1, 0.10),
      distributorFeePct: clampNumber(body.distributorFeePct, 0, 1, 0.05),
      otherCostsCents: clampInt(body.otherCostsCents, 0, 10_000_000_000), // up to $100M

      targetMultiple: clampNumber(body.targetMultiple, 1, 10, 1.2),
      investorSharePreRecoup: clampNumber(body.investorSharePreRecoup, 0, 1, 1.0),
      investorSharePostRecoup: clampNumber(body.investorSharePostRecoup, 0, 1, 0.5),
    };

    await db().collection("productions").doc(params.id).set(update, { merge: true });
    return NextResponse.json({ ok: true, id: params.id });
  } catch (err) {
    console.error("PATCH /api/admin/production/[id] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function clampNumber(v: any, min: number, max: number, def: number) {
  const n = Number(v);
  if (!isFinite(n)) return def;
  return Math.min(max, Math.max(min, n));
}
function clampInt(v: any, min: number, max: number) {
  const n = Math.floor(Number(v));
  if (!isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
