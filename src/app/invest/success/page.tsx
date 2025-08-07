'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function InvestmentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && sessionId) {
      console.log(`Verifying payment for user ${user.uid} and session ${sessionId}`);
      // Here you would typically make a call to your backend
      // to verify the payment status with Stripe and update your database.
      // For now, we just log it.
    }
  }, [sessionId, user]);

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="mt-4 text-3xl font-bold">Investment Successful!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Thank you for your support. You're officially part of the project!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your contribution will help bring this film to life. We've sent a confirmation email with your investment details and what to expect next.
          </p>
          <p className="text-sm text-muted-foreground">
            Stripe Session ID: <code className="bg-muted px-2 py-1 rounded">{sessionId}</code>
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}