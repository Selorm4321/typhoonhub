'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type TierCardProps = {
  tierName: string;
  amount: string;
  perks: string[];
  isFeatured?: boolean;
  projectSlug?: string;
  projectTitle?: string;
};

export function TierCard({ tierName, amount, perks, isFeatured = false, projectSlug = 'mary-and-rose', projectTitle = 'Mary and Rose' }: TierCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInvest = async () => {
    setIsLoading(true);
    
    try {
      const numericAmount = parseInt(amount.replace('$', '').replace(',', ''));
      
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericAmount,
          projectSlug,
          tierName,
          projectTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Failed to initialize payment. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={isFeatured ? 'border-primary shadow-lg' : ''}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{tierName}</CardTitle>
        <p className="text-4xl font-bold">{amount}</p>
        <p className="text-sm text-muted-foreground">Investment</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {perks.map((perk, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleInvest}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Processing...' : 'Select Tier'}
        </Button>
      </CardFooter>
    </Card>
  );
}
