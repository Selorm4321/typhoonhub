
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc, increment, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [production, setProduction] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const productionId = searchParams.get('production_id');
    
    if (sessionId && productionId && user) {
      processSuccessfulInvestment(sessionId, productionId, user.uid);
    } else if (!sessionId || !productionId) {
       setError("Missing session or production information.");
       setLoading(false);
    }
  }, [searchParams, user]);

  const processSuccessfulInvestment = async (sessionId: string, productionId: string, userId: string) => {
    try {
      // Check if we've already processed this session
      const investmentCheck = await getDocs(
        query(collection(db, 'investments'), where('stripeSessionId', '==', sessionId))
      );

      if (!investmentCheck.empty) {
        // Already processed, just load data
        const investmentData = investmentCheck.docs[0].data();
        const prodDoc = await getDoc(doc(db, 'productions', investmentData.productionId));
        if (prodDoc.exists()) setProduction(prodDoc.data());
        setLoading(false);
        return;
      }
      
      // NOTE: In a real app, you would get the session details from Stripe backend
      // to confirm payment and get the amount. For now, we simulate this.
      // This is a security risk as client can manipulate it.
      // A Firebase Function triggered by Stripe webhook is the correct way.
      
      const productionRef = doc(db, 'productions', productionId);
      const productionDoc = await getDoc(productionRef);

      if (productionDoc.exists()) {
        const productionData = productionDoc.data();
        setProduction(productionData);
        
        // This is a placeholder amount. You'd get this from Stripe.
        const investmentAmount = 100;

        // Update production stats
        await updateDoc(productionRef, {
          currentFunding: increment(investmentAmount * 100),
          investorCount: increment(1)
        });

        // Create investment record
        await addDoc(collection(db, 'investments'), {
          userId: userId,
          productionId: productionId,
          amount: investmentAmount, // Placeholder
          stripeSessionId: sessionId,
          status: 'succeeded',
          createdAt: serverTimestamp(),
          paymentMethod: 'card',
          metadata: {
            showTitle: productionData.title,
          }
        });
      } else {
        throw new Error("Production not found.");
      }
    } catch (err: any) {
      console.error('Error processing investment:', err);
      setError(err.message || 'An error occurred while processing your investment.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Processing your investment...</p>
      </div>
    );
  }

  if (error) {
     return (
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CheckCircle className="mx-auto h-16 w-16 text-destructive" />
            <CardTitle className="mt-4 text-3xl font-bold">Processing Error</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/invest">Back to Investments</Link>
            </Button>
          </CardContent>
        </Card>
      )
  }

  return (
    <Card className="w-full max-w-lg text-center">
      <CardHeader>
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <CardTitle className="mt-4 text-3xl font-bold">Investment Successful!</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Thank you for supporting independent filmmaking!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {production && (
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold">You've invested in:</h3>
            <p className="text-xl font-bold text-primary">{production.title}</p>
          </div>
        )}
        <p>
          You're officially part of the project! We've sent a confirmation email with your investment details and what to expect next.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">View Portfolio</Link>
          </Button>
           <Button asChild variant="outline" size="lg">
            <Link href="/invest">Invest in More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InvestmentSuccessPage() {
  return (
     <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Suspense fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
