import Link from "next/link";
import Image from "next/image";
import type { Investment } from "@/lib/types/investment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InvestmentProgressBar } from "./invest/ProgressBar";
import { pct } from "@/lib/utils";

interface InvestmentProjectCardProps {
  project: Investment;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function InvestmentProjectCard({
  project,
}: InvestmentProjectCardProps) {
  const percent = pct(project.raised, project.goal);
  return (
    <Link href={`/invest/${project.slug}`}>
      <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="relative h-48 w-full">
          <Image
            src={project.heroImage}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 text-lg font-semibold">{project.title}</CardTitle>
          <p className="mb-4 text-sm text-neutral-500">
            {project.shortDescription}
          </p>
          <div>
            <div className="mb-1 flex justify-between">
                <p className="font-semibold">{formatter.format(project.raised)}</p>
                <p className="text-neutral-500">{percent}%</p>
            </div>
            <InvestmentProgressBar value={percent} />
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <p className="text-sm text-neutral-500">
            Goal: {formatter.format(project.goal)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
