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
  onInvest?: (tierName: string, amount: number) => void;
};

export function TierCard({ tierName, amount, perks, isFeatured = false, onInvest }: TierCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Extract numeric value from amount string (e.g., "$100" -> 100)
  const numericAmount = parseInt(amount.replace(/[^0-9]/g, ''));
  
  const handleInvestClick = async () => {
    if (onInvest) {
      onInvest(tierName, numericAmount);
      return;
    }
    
    // Default behavior - direct checkout
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierName,
          tierAmount: numericAmount,
          projectName: 'Mary and Rose', // Default project name - could be made dynamic
          userEmail: '', // This should be collected from user context or modal
          userName: '', // This should be collected from user context or modal
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Please fill in your details first or try again later.',
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
          onClick={handleInvestClick}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Processing...' : 'Invest Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
