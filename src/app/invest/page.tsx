
import { db } from "@/lib/firebase-admin";
import type { Production } from "@/lib/types";
import InvestmentProjectCard from "@/components/investment-project-card";
import { HandCoins } from "lucide-react";

export const revalidate = 60; // ISR (rebuild every 60s)
export const dynamic = "force-static"; // cache-friendly for list

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
            goal: data.fundingGoal || 0,
            raised: data.currentFunding || 0,
            heroImage: data.imageUrl || 'https://placehold.co/600x400.png',
            minInvestment: data.minimumInvestment || 100,
            active: data.status === 'active'
        });
    });
    
    return productions;
}


export default async function InvestPage() {
  const projects = await getActiveProductions();

  return (
    <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <HandCoins className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-4xl font-bold">Invest in Independent Cinema</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Become a part of the next wave of filmmaking. Your investment helps bring unique stories to the screen and supports independent creators.
            </p>
        </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">There are no active investment opportunities at the moment.</p>
          <p className="text-sm text-muted-foreground">
            Please check back later for new projects.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {projects.map((p) => (
            <InvestmentProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
