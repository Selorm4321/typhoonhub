export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import InvestmentProjectCard from "@/components/investment-project-card";
import { getInvestments } from "@/lib/investments"; // Import getInvestments

export default async function InvestPage() {
  // Use getInvestments to fetch project data
  const projects = await getInvestments();

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
