import FilmCarousel from '@/components/film-carousel';
import { Button } from '@/components/ui/button';
import { films } from '@/lib/data';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const featuredFilm = films[0];
  const trendingFilms = films.slice(1, 7);
  const newReleases = films.slice(7, 13);
  const criticallyAcclaimed = films.slice(13);

  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] w-full">
        <Image
          src={featuredFilm.backdropUrl}
          alt={featuredFilm.title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-40"
          data-ai-hint="youtube thumbnail"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 flex h-full items-end p-8 md:p-16">
          <div className="max-w-2xl space-y-4">
            <h1 className="font-headline text-4xl font-bold md:text-6xl text-primary-foreground">
              {featuredFilm.title}
            </h1>
            <p className="text-lg text-muted-foreground">{featuredFilm.tagline}</p>
            <div className="flex items-center gap-4">
              <Button asChild size="lg">
                <Link href={`/watch/${featuredFilm.id}`}>
                  <PlayCircle />
                  Watch Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/film/${featuredFilm.id}`}>More Info</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto space-y-12 pb-16">
        <FilmCarousel title="Trending Now" films={trendingFilms} />
        <FilmCarousel title="New Releases" films={newReleases} />
        <FilmCarousel title="Critically Acclaimed" films={criticallyAcclaimed} />
      </main>
    </div>
  );
}
