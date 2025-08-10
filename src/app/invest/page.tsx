
'use client';

import { useState, useEffect } from 'react';
import { HandCoins, Loader2 } from 'lucide-react';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import FundingProjectCard from '@/components/funding-project-card';
import type { FundingProject } from '@/lib/data';

export default function InvestPage() {
  const [productions, setProductions] = useState<FundingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "productions"), where("status", "==", "active"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const prods: FundingProject[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        prods.push({
          id: doc.id,
          title: data.title,
          tagline: data.tagline,
          synopsis: data.description,
          fundingGoal: data.fundingGoal / 100,
          currentFunding: data.currentFunding / 100,
          investors: data.investors,
          posterUrl: data.imageUrl || 'https://placehold.co/600x900.png',
          trailerYoutubeId: data.trailerYoutubeId,
          investmentTiers: data.investmentTiers, // This might need to be adjusted based on your data model
          minimumInvestment: data.minimumInvestment / 100,
          expectedROI: data.expectedROI,
          productionTimeline: data.productionTimeline,
          category: data.category,
        });
      });
      setProductions(prods);
      setLoading(false);
    }, (error) => {
      console.error("Error loading productions:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto py-12 text-center">
            <HandCoins className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-5xl font-bold">
              FROM VISION TO SCREEN
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Where independent filmmakers create, collaborate, and connect with audiences globally.
              Invest in the next generation of cinema.
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
            {productions.map((production) => (
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
