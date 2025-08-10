'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type TierCardProps = {
  tierName: string;
  amount: string;
  perks: string[];
  isFeatured?: boolean;
};

export function TierCard({ tierName, amount, perks, isFeatured = false }: TierCardProps) {
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
        <Button className="w-full">Select Tier</Button>
      </CardFooter>
    </Card>
  );
}
