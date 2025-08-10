'use client';

import { useState, useEffect } from 'react';
import { HandCoins } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Investment } from '@/lib/types/investment';
import { useToast } from '@/hooks/use-toast';
import InvestmentCard from '@/components/investment-card';
import InvestmentCardSkeleton from '@/components/investment-card-skeleton';

export default function InvestPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // NOTE: Temporarily simplified query to diagnose a potential missing index issue.
    // The original query included orderBy('priority', 'desc') and orderBy('createdAt', 'desc').
    const q = query(
      collection(db, 'investments'),
      where('status', '==', 'active')
    );

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const investmentData: Investment[] = [];
        querySnapshot.forEach(doc => {
          investmentData.push({
            id: doc.id,
            ...doc.data(),
          } as Investment);
        });
        setInvestments(investmentData);
        setLoading(false);
      },
      error => {
        console.error('Error loading investments:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading investments',
          description: 'Could not fetch investment opportunities. Please try again later.',
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <InvestmentCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (investments.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-2xl font-bold text-muted-foreground mb-4">No Active Investments</h3>
          <p className="text-muted-foreground">Check back soon for new film investment opportunities!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {investments.map(investment => (
          <InvestmentCard key={investment.id} investment={investment} />
        ))}
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </div>
  );
}
