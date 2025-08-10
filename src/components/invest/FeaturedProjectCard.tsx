'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestmentProgressBar } from '@/components/invest/ProgressBar';
import { fetchInvestmentBySlug } from '@/lib/investments';
import type { Investment } from '@/lib/types/investment';
import { pct } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

function FeaturedProjectSkeleton() {
    return (
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg md:grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="p-6 md:p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    );
}

export function FeaturedProjectCard() {
  const [project, setProject] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentBySlug("mary-and-rose").then(data => {
      setProject(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <FeaturedProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Featured project not available at the moment. Check back soon!</p>
      </div>
    );
  }

  const percent = pct(project.raised, project.goal);

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg md:grid md:grid-cols-2">
        <div className="relative h-64 md:h-full">
            <Image src={project.heroImage} alt={`${project.title} Poster`} layout="fill" objectFit="cover"/>
        </div>
        <div className="p-6 md:p-8">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-primary">{formatter.format(project.raised)} Raised</span>
                        <span className="text-sm text-muted-foreground">{percent}%</span>
                    </div>
                    <InvestmentProgressBar value={percent} />
                    <div className="text-right text-sm font-medium mt-1">Goal: {formatter.format(project.goal)}</div>
                </div>
                <Link href="#register" className="inline-flex items-center text-primary font-semibold">
                    View details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </CardContent>
        </div>
    </Card>
  );
}
