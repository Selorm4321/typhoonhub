
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlayCircle, Users, Loader2 } from 'lucide-react';

import type { FundingProject } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { useAuth } from '@/context/auth-context';
import { createCheckoutSession } from '@/ai/flows/create-checkout-session';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import Link from 'next/link';

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
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');

  // All amounts are expected in cents from Firestore
  const fundingGoal = project.fundingGoal / 100;
  const currentFunding = project.currentFunding / 100;
  const minimumInvestment = project.minimumInvestment / 100;

  const fundingPercentage = fundingGoal > 0 ? (currentFunding / fundingGoal) * 100 : 0;
  
  const getInvestmentLevel = (amount: number) => {
    if (amount >= 5000) return 'Studio Partner';
    if (amount >= 1500) return 'Co-Producer';
    if (amount >= 500) return 'Executive Producer';
    if (amount >= 100) return 'Producer';
    return 'Backer';
  };

  const handleInvestClick = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Required', description: 'Please log in or sign up to invest.' });
      router.push('/login');
      return;
    }

    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount < minimumInvestment) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: `The minimum investment is ${formatter.format(minimumInvestment)}.` });
      return;
    }
    
    setLoading(true);

    try {
      const { url } = await createCheckoutSession({
        userId: user.uid,
        userEmail: user.email!,
        tierName: getInvestmentLevel(amount),
        tierAmount: amount, // Send amount in dollars
        projectName: project.title,
        productionId: project.id
      });

      if (url) {
        window.location.assign(url);
      } else {
        throw new Error('Could not retrieve checkout URL.');
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Payment Error', description: 'Could not create a checkout session. Please try again.' });
      setLoading(false);
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
          {project.trailerYoutubeId && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="absolute bottom-6 left-1/2 -translate-x-1/2">
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
          )}
        </div>

        <div className="flex flex-col p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-headline text-3xl">{project.title}</CardTitle>
            <CardDescription className="text-lg">{project.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-0 flex-grow">
            <div className="space-y-2">
              <h3 className="font-semibold">Funding Status</h3>
              <Progress value={fundingPercentage} aria-label={`${fundingPercentage.toFixed(0)}% funded`} />
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-primary">{formatter.format(currentFunding)} raised</span>
                <span className="text-muted-foreground">Goal: {formatter.format(fundingGoal)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-2 pt-1">
                <Users className="h-4 w-4" />
                <span>{project.investors || 0} investors</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{project.synopsis}</p>

            <Separator />
            
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Minimum Investment:</span><span className="font-semibold">{formatter.format(minimumInvestment)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Expected ROI:</span><span className="font-semibold">{project.expectedROI}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Timeline:</span><span className="font-semibold">{project.productionTimeline}</span></div>
            </div>

            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-semibold">Invest Now</h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">$</span>
                <Input
                    type="number"
                    placeholder={`${minimumInvestment}`}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="text-lg font-bold"
                    min={minimumInvestment}
                  />
              </div>
              
              {parseFloat(investmentAmount) > 0 && (
                <p className="text-sm text-primary">
                  Investment Level: <strong>{getInvestmentLevel(parseFloat(investmentAmount))}</strong>
                </p>
              )}
              
              <Button
                onClick={handleInvestClick}
                disabled={!user || loading || !investmentAmount || parseFloat(investmentAmount) < minimumInvestment}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Invest Now'
                )}
              </Button>
              {!user && <p className="text-center text-xs text-muted-foreground">Please <Link href="/login" className="underline">sign in</Link> to invest.</p>}
            </div>

          </CardContent>
          <CardFooter className="bg-secondary/30 p-4 -mx-6 -mb-6 mt-6">
             <p className="text-xs text-muted-foreground text-center w-full">
              Legal Disclaimer: Investments are subject to terms and conditions. Please review all documentation before investing.
            </p>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
