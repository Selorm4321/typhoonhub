'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Investment } from '@/lib/types/investment';
import { pct } from '@/lib/utils';

type InvestmentCardProps = {
  investment: Investment;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const { title, shortDescription, goal, raised, heroImage, slug } = investment;
  const percent = pct(raised, goal);

  return (
    <Link href={`/invest/${slug}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={heroImage}
              alt={`Hero image for ${title}`}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="mb-2 text-xl font-bold group-hover:text-primary">{title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {shortDescription}
          </p>
        </CardContent>
        <CardFooter className="p-4 mt-auto">
          <div className="w-full">
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-bold text-primary">{formatter.format(raised)}</span>
                <span className="text-muted-foreground">{percent}%</span>
            </div>
            <Progress value={percent} className="h-2" />
            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                <span>Raised</span>
                <span>Goal: {formatter.format(goal)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
