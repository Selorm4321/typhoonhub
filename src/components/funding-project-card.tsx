
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { DollarSign, PlayCircle, Users } from 'lucide-react';

import type { FundingProject } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type FundingProjectCardProps = {
  project: FundingProject;
};

export default function FundingProjectCard({ project }: FundingProjectCardProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  
  const handleInvestClick = () => {
    toast({
      title: 'Coming Soon!',
      description: 'Stripe integration is currently in development.',
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="relative aspect-video rounded-md overflow-hidden cursor-pointer group">
              <Image
                src={`https://img.youtube.com/vi/${project.trailerYoutubeId}/maxresdefault.jpg`}
                alt={`Trailer for ${project.title}`}
                layout="fill"
                style={{ objectFit: "cover" }}
                data-ai-hint="movie trailer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white" />
              </div>
            </div>
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
        
        <p className="text-sm text-muted-foreground">{project.synopsis}</p>
        
        <div className="space-y-2 pt-2">
          <Progress value={fundingPercentage} aria-label={`${fundingPercentage.toFixed(0)}% funded`} />
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-primary">{formatter.format(project.currentFunding)}</span>
            <span className="text-muted-foreground">Goal: {formatter.format(project.fundingGoal)}</span>
          </div>
        </div>

      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{project.investors} Investors</span>
          </div>
        </div>
        <Button onClick={handleInvestClick} disabled>
          <DollarSign className="mr-2 h-4 w-4" />
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
}
