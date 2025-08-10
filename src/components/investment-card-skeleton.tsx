import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function InvestmentCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/6" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      </CardFooter>
    </Card>
  );
}
