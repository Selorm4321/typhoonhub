
'use client';

import { useState, useEffect } from 'react';
import { HandCoins, Loader2 } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import FundingProjectCard from '@/components/funding-project-card';
import type { FundingProject } from '@/lib/data';

export default function InvestPage() {
  const [productions, setProductions] = useState<FundingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'productions'), where('status', '==', 'active'));

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const prods: FundingProject[] = [];
        querySnapshot.forEach(doc => {
          console.log(data);
          const data = doc.data();
          prods.push({
            id: doc.id,
            title: data.title || 'Untitled Project',
            synopsis: data.description || 'No synopsis available.',
            fundingGoal: data.fundingGoal || 0,
            currentFunding: data.currentFunding || 0,
            investors: data.investors || 0,
            posterUrl: data.imageUrl || 'https://placehold.co/600x900.png',
            minimumInvestment: data.minimumInvestment || 0,
            expectedROI: data.expectedROI || 'N/A',
            productionTimeline: data.productionTimeline || 'No timeline available.',
            category: data.category,
            trailerYoutubeId: data.trailerYoutubeId || '',
          } as FundingProject);
        });
        setProductions(prods);
        setLoading(false);
      },
      error => {
        console.error('Error loading productions:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto py-12 text-center">
          <HandCoins className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-5xl font-bold">FROM VISION TO SCREEN</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Where independent filmmakers create, collaborate, and connect with audiences globally. Invest in the
            next generation of cinema.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Active Investment Opportunities</h2>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : productions.length > 0 ? (
          <div className="space-y-12">
            {productions.map(production => (
              <FundingProjectCard key={production.id} project={production} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-2xl font-bold text-muted-foreground mb-4">No Active Investments</h3>
            <p className="text-muted-foreground">Check back soon for new film investment opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
}
