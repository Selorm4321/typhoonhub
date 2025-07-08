import { HandCoins } from 'lucide-react';
import { fundingProjects } from '@/lib/data';
import FundingProjectCard from '@/components/funding-project-card';

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
        {fundingProjects.map((project) => (
          <FundingProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
