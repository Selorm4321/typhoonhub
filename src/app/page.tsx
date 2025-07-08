'use client';

import React from 'react';
import FilmCarousel from '@/components/film-carousel';
import { Button } from '@/components/ui/button';
import { films } from '@/lib/data';
import { PlayCircle, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] w-full -mb-16">
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="w-full h-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {films.map((film, index) => (
              <CarouselItem key={film.id}>
                <div className="relative h-[60vh] w-full">
                  <Image
                    src={film.backdropUrl}
                    alt={film.title}
                    fill
                    objectFit="cover"
                    className="absolute inset-0 opacity-40"
                    data-ai-hint="youtube thumbnail"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  <div className="relative z-10 flex h-full items-end p-8 md:p-16">
                    <div className="max-w-2xl space-y-4">
                      <h1 className="font-headline text-4xl font-bold md:text-6xl text-primary-foreground drop-shadow-lg">
                        {film.title}
                      </h1>
                      <p className="text-lg text-muted-foreground drop-shadow-md">{film.tagline}</p>
                      <div className="flex items-center gap-4">
                        <Button asChild size="lg">
                          <Link href={`/watch/${film.id}`}>
                            <PlayCircle />
                            Watch Now
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                          <Link href={`/film/${film.id}`}>More Info</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
        </Carousel>
      </section>

      <main className="container mx-auto space-y-12 pb-16 pt-16">
        <FilmCarousel title="All Shows" films={films} />

        <section className="text-center py-16 bg-secondary/20 rounded-lg">
          <div className="container mx-auto max-w-3xl">
            <Send className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl font-bold">Share Your Vision</h2>
            <p className="mt-4 mx-auto text-muted-foreground">
              Are you an independent filmmaker with a story to tell? We want to see it. Submit your film for a chance to be featured on Typhoon Indie Stream.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/submit">
                Submit Your Film
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
