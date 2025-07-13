import { HandCoins, Info, Zap, Milestone, Crown, TrendingUp } from 'lucide-react';
import { fundingProjects } from '@/lib/data';
import FundingProjectCard from '@/components/funding-project-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function InvestPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto text-center">
        <HandCoins className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Invest in Independent Film</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Become a producer and help bring these creative visions to life. Browse projects seeking funding and invest in the next wave of indie cinema.
        </p>
      </div>
      
      <Card className="max-w-5xl mx-auto mt-12 bg-secondary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Be Part of the Next Big Thing: Invest in the Future of Entertainment!</CardTitle>
          <CardDescription className="text-base pt-2">
            Imagine a world where the shows you love are brought to life by you. We're revolutionizing content creation, putting the power directly into the hands of fans and empowering visionary content creators. This isn't just crowdfunding; it's fan-powered production, a groundbreaking model where your passion fuels the next hit series.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Zap className="text-accent"/>Why Your Investment Matters</h3>
              <p className="text-muted-foreground">
                In the traditional entertainment landscape, amazing stories often go untold due to funding barriers. We're changing that. By investing, you're not just providing capital; you're becoming a crucial part of the creative journey.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Milestone className="h-5 w-5 mt-1 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Empower Creators:</span> Your contribution directly helps talented content creators bring their unique visions to the screen, bypassing traditional gatekeepers.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                   <TrendingUp className="h-5 w-5 mt-1 text-primary shrink-0" />
                  <div>
                     <span className="font-semibold text-foreground">Shape the Future:</span> Be an integral part of the shows you believe in, from concept to screen.
                  </div>
                </li>
              </ul>
            </div>
             <div className="space-y-4">
              <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Crown className="text-accent"/>How You Become a Producer</h3>
                <p className="text-muted-foreground">
                  It's simple, transparent, and rewarding. When you invest in a show on our platform, you're not just a donor; you're a producer.
                </p>
               <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Milestone className="h-5 w-5 mt-1 text-primary shrink-0" />
                  <div>
                     <span className="font-semibold text-foreground">Producer Credits:</span> Become an official Producer or even an Executive Producer, recognized for your vital contribution. Specific investment tiers will grant you appropriate credit.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                   <TrendingUp className="h-5 w-5 mt-1 text-primary shrink-0" />
                   <div>
                     <span className="font-semibold text-foreground">Share in Success:</span> Once a show reaches its funding goal and becomes a hit, investors are "locked in" and receive a return on their investment. Your support helps bring the show to life, and its success becomes your success too!
                   </div>
                </li>
              </ul>
            </div>
          </div>
           <div className="text-center pt-4">
             <p className="text-lg font-semibold">This is more than an investment; it's a movement. It's about building a community where fans and creators unite to make extraordinary entertainment a reality. Let's make history together!</p>
           </div>
        </CardContent>
      </Card>

      <Separator className="my-12 max-w-5xl mx-auto" />

      <Alert className="max-w-4xl mx-auto mt-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Demonstration Only</AlertTitle>
        <AlertDescription>
          The investment projects and funding data shown on this page are for placeholder purposes.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
        {fundingProjects.map((project) => (
          <FundingProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
