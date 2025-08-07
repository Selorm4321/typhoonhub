
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, DocumentData } from 'firebase/firestore';
import { Loader2, TrendingUp, DollarSign, Film } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Investment extends DocumentData {
  id: string;
  production?: DocumentData;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInvested, setTotalInvested] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      loadUserInvestments();
    } else if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const loadUserInvestments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const investmentsQuery = query(
        collection(db, 'investments'),
        where('userId', '==', user.uid),
        where('status', '==', 'succeeded')
      );
      
      const investmentsSnapshot = await getDocs(investmentsQuery);
      const investmentsList: Investment[] = [];
      let total = 0;

      for (const investmentDoc of investmentsSnapshot.docs) {
        const investmentData = { id: investmentDoc.id, ...investmentDoc.data() };
        
        if (investmentData.productionId) {
          const productionDoc = await getDoc(doc(db, 'productions', investmentData.productionId));
          if (productionDoc.exists()) {
            investmentData.production = productionDoc.data();
          }
        }
        
        investmentsList.push(investmentData);
        total += investmentData.amount;
      }

      setInvestments(investmentsList);
      setTotalInvested(total);
    } catch (error) {
      console.error('Error loading investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (authLoading || loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="font-headline text-4xl font-bold mb-8">Investment Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalInvested)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investor Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Active Investor</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Investments</h2>
        {investments.length > 0 ? (
          <div className="space-y-4">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{investment.production?.title || 'Unknown Production'}</h3>
                      <p className="text-muted-foreground">{investment.production?.category || 'N/A'}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold text-primary">{formatCurrency(investment.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {investment.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">No Investments Yet</h3>
            <p className="text-muted-foreground mb-6">Start investing in amazing film projects today!</p>
            <Button asChild>
              <Link href="/invest">Explore Investment Opportunities</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
