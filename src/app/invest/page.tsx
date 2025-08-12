
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { db } from "@/lib/firebase-admin";
import InvestmentProjectCard from "@/components/investment-project-card";

type Production = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  goal?: number;       // cents
  raised?: number;     // cents
  heroImage?: string;
  minInvestment?: number; // cents
  active: boolean;
};

function toCents(v: any): number | undefined {
  if (typeof v !== "number") return undefined;
  // This function assumes that if a value is less than a large threshold,
  // it's in dollars and needs to be converted to cents.
  // Adjust the logic if your data schema is different.
  if (v <= 500000) { 
    return Math.round(v * 100);
  }
  return v; // Assumed to be in cents already
}

function normalize(id: string, d: any): Production | null {
  const isActive = d?.active === true || d?.status === "active";
  if (!isActive) return null;

  const title = d?.title ?? "Untitled";
  const slug = d?.slug ?? id;
  const summary = d?.summary ?? d?.description ?? "";
  const heroImage = d?.heroImage ?? d?.imageUrl ?? "";

  // Prefer new cents fields; else convert old dollar fields to cents
  const goal =
    typeof d?.goal === "number" ? d.goal :
    toCents(d?.fundingGoal);

  const raised =
    typeof d?.raised === "number" ? d.raised :
    typeof d?.currentFunding === "number" ? toCents(d.currentFunding) ?? 0 : 0;

  const minInvestment =
    typeof d?.minInvestment === "number" ? d.minInvestment :
    toCents(d?.minimumInvestment) ?? 2500;

  return { id, title, slug, summary, goal, raised, heroImage, minInvestment, active: true };
}

async function getActiveProductions(): Promise<Production[]> {
  const snap = await db().collection("productions").where("active", "==", true).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Production, "id">) }));
}

export default async function InvestPage() {
  const projects = await getActiveProductions();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Invest in Projects</h1>
      {projects.length === 0 ? (
        <p className="text-neutral-500">No Active Investments</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <InvestmentProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </main>
  );
}
