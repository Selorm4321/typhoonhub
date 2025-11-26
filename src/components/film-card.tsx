import Image from 'next/image';
import Link from 'next/link';
import type { Film } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type FilmCardProps = {
  film: Film;
  className?: string;
  linkTo?: 'detail' | 'browse' | 'watch';
};

export default function FilmCard({ film, className, linkTo = 'browse' }: FilmCardProps) {
  const href = linkTo === 'detail' 
    ? `/film/${film.id}` 
    : linkTo === 'watch'
    ? `/watch/${film.id}`
    : '/browse';

  return (
    <Link href={href} className="group block">
      <Card
        className={cn(
          'overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20',
          className
        )}
      >
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={film.posterUrl}
              alt={film.title}
 layout="fill"
 style={{ objectFit: "cover" }}
              className="transition-opacity duration-300 group-hover:opacity-80"
              data-ai-hint="youtube thumbnail"
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <h3 className="font-semibold text-sm truncate">{film.title}</h3>
      </div>
    </Link>
  );
}
