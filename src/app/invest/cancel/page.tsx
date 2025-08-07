
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <XCircle className="mx-auto h-16 w-16 text-destructive" />
          <CardTitle className="mt-4 text-3xl font-bold">Investment Cancelled</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your investment process was cancelled.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            It looks like you've cancelled the checkout process. If you have any questions or faced any issues, please don't hesitate to contact our support team.
          </p>
          <p>You can return to the investment page to try again.</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button asChild size="lg">
              <Link href="/invest">Back to Invest</Link>
            </Button>
             <Button asChild variant="outline" size="lg">
              <Link href="/">Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </