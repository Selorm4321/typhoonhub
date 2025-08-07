'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Award, Check, DollarSign, PlayCircle, Users, Loader2 } from 'lucide-react';

import type { FundingProject, InvestmentTier } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { useAuth } from '@/context/auth-context';
import { createCheckoutSession } from '@/ai/flows/create-checkout-session';
import { useRouter } from 'next/navigation';

type FundingProjectCardProps = {
  project: FundingProject;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function FundingProjectCard({ project }: FundingProjectCardProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

  const handleInvestClick = async (tier: InvestmentTier) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in or sign up to invest.',
      });
      router.push('/login');
      return;
    }

    setLoadingTier(tier.name);

    try {
      const { sessionId, url } = await createCheckoutSession({
        userId: user.uid,
        userEmail: user.email!,
        tierName: tier.name,
        tierAmount: tier.amount,
        projectName: project.title
      });

      if (url) {
        window.location.assign(url);
      } else {
        throw new Error('Could not retrieve checkout URL.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Could not create a checkout session. Please try again.',
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <Card className="overflow-hidden shadow-2xl shadow-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <Image
            src={project.posterUrl}
            alt={`Poster for ${project.title}`}
            width={600}
            height={900}
            className="w-full h-full object-cover"
            data-ai-hint="movie poster"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
              >
                <PlayCircle className="mr-2" />
                Watch Trailer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 border-0">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${project.trailerYoutubeId}?autoplay=1`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col">
          <CardHeader className="p-6">
            <CardTitle className="font-headline text-3xl">{project.title}</CardTitle>
            <CardDescription className="text-lg">{project.tagline}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0 flex-grow">
            <div className="space-y-2">
              <h3 className="font-semibold">Funding Status</h3>
              <Progress value={fundingPercentage} aria-label={`${fundingPercentage.toFixed(0)}% funded`} />
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-primary">{formatter.format(project.currentFunding)} raised</span>
                <span className="text-muted-foreground">Goal: {formatter.format(project.fundingGoal)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-2 pt-1">
                <Users className="h-4 w-4" />
                <span>{project.investors} investors</span>
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-sm text-muted-foreground">{project.synopsis}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Investment Tiers</h3>
              <div className="space-y-4">
                {project.investmentTiers.map((tier) => (
                  <InvestmentTierCard 
                    key={tier.name} 
                    tier={tier} 
                    onInvest={() => handleInvestClick(tier)}
                    isLoading={loadingTier === tier.name} 
                  />
                ))}
              </div>
            </div>

          </CardContent>
          <CardFooter className="bg-secondary/30 p-4">
             <p className="text-xs text-muted-foreground text-center w-full">
              Legal Disclaimer: Investments are subject to terms and conditions. Please review all documentation before investing.
            </p>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

function InvestmentTierCard({ tier, onInvest, isLoading }: { tier: InvestmentTier; onInvest: () => void; isLoading: boolean }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50">
      <div className="flex-grow">
        <div className="flex items-center gap-3">
          <Award className="text-accent h-6 w-6" />
          <div>
            <h4 className="font-bold">{tier.name}</h4>
            <p className="font-headline text-lg text-primary">{formatter.format(tier.amount)}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1 pl-2">
          {tier.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-green-500" />
              <span>{perk}</span>
            </div>
          ))}
           <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold pt-1">
              <DollarSign className="h-3 w-3 text-green-500" />
              <span>{tier.profitShare}</span>
            </div>
        </div>
      </div>
      <Button onClick={onInvest} className="w-full sm:w-auto shrink-0" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Invest'
        )}
      </Button>
    </div>
  )
}