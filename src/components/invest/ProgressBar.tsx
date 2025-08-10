'use client';

import { Progress } from '@/components/ui/progress';

type ProgressBarProps = {
  value: number;
};

export function InvestmentProgressBar({ value }: ProgressBarProps) {
  return <Progress value={value} className="h-2 w-full" />;
}
