
import { HandCoins, Info, Send, Sparkles } from 'lucide-react';
import { fundingProjects } from '@/lib/data';
import FundingProjectCard from '@/components/funding-project-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InvestPage() {
  const activeProject = fundingProjects[0];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto text-center">
        <HandCoins className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Invest in Independent Film</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Become a producer. Support independent creators and share in their success.
        </p>
      </div>

      <Alert className="max-w-4xl mx-auto mt-12">
        <Info className="h-4 w-4" />
        <AlertTitle>Real Projects, Real Impact</AlertTitle>
        <AlertDescription>
          This is a professional film investment platform by Typhoon Entertainment. The investment data shown is for our current, real project.
        </AlertDescription>
      </Alert>

      <div className="mt-12">
        {activeProject ? (
          <FundingProjectCard project={activeProject} />
        ) : (
          <Card className="text-center py-16">
            <CardHeader>
              <CardTitle>No Active Projects</CardTitle>
              <CardDescription>There are no projects actively seeking funding right now.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>

      <Separator className="my-16" />

      <section className="text-center">
        <Sparkles className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-headline text-3xl font-bold">More Projects Coming Soon</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Typhoon Entertainment is always developing new and exciting projects. Sign up for our newsletter to be the first to know about new investment opportunities.
        </p>
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button asChild size="lg">
            <Link href="/submit">Submit Your Project</Link>
          </Button>
          <p className="text-muted-foreground">Are you a creator?</p>
        </div>
      </section>
    </div>
  );
}
