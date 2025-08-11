
export const dynamic = "force-dynamic"; // avoid build-time fetch
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

async function getActiveProductions(): Promise<Production[]> {
    const productionsRef = db.collection("productions");
    const snapshot = await productionsRef.where('status', '==', 'active').get();
    
    if (snapshot.empty) {
        return [];
    }
    
    const productions: Production[] = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        productions.push({
            id: doc.id,
            title: data.title || 'Untitled Project',
            slug: data.slug || doc.id,
            summary: data.description || '', // Using description field as summary
            goal: data.fundingGoal || data.goal || 0,
            raised: data.currentFunding || data.raised || 0,
            heroImage: data.imageUrl || data.heroImage || 'https://placehold.co/600x400.png',
            minInvestment: data.minimumInvestment || data.minInvestment || 100,
            active: data.status === 'active'
        });
    });
    
    return productions;
}

export default async function InvestPage() {
  let projects: Production[] = [];
  try {
    projects = await getActiveProductions();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Invest in Projects</h1>

      {projects.length === 0 ? (
        <p className="text-neutral-500">No Active Investments</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <InvestmentProjectCard key={p.id} project={p as any} />
          ))}
        </div>
      )}
    </main>
  );
}
