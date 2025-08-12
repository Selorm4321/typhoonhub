
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { db } from "@/lib/firebase-admin";
import InvestmentProjectCard from "@/components/investment-project-card";
import type { Production } from "@/lib/types";

async function getActiveProductions(): Promise<Production[]> {
  // fetch all to support both schemas
  const snap = await db().collection("productions").get();
  return snap.docs.map(d => normalize(d.id, d.data())).filter((x): x is Production => !!x);
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
