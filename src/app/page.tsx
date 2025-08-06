
'use client';

import React from 'react';
import FilmCarousel from '@/components/film-carousel';
import { Button } from '@/components/ui/button';
import { films } from '@/lib/data';
import { PlayCircle, Send, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background"
          fill
          objectFit="cover"
          className="absolute inset-0 opacity-20"
          data-ai-hint="cinema film background"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 space-y-6 max-w-4xl">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground drop-shadow-2xl">
            FROM VISION TO SCREEN
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground drop-shadow-lg max-w-2xl">
            Where independent filmmakers create, collaborate, and connect with audiences globally.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg">
              <Link href="/browse">
                Explore Films
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/submit">
                Submit Your Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto space-y-12 pb-16 -mt-16">
        <FilmCarousel title="All Shows" films={films} />

        <section className="text-center py-16 bg-secondary/20 rounded-lg">
          <div className="container mx-auto max-w-3xl">
            <Send className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl font-bold">Share Your Vision</h2>
            <p className="mt-4 mx-auto text-muted-foreground">
              Are you an independent filmmaker with a story to tell? We want to see it. Submit your film for a chance to be featured on Typhoonhub.
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
