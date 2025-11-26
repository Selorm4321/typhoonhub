'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { films } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function WatchClient({ id }: { id: string }) {
  const film = films.find((f) => f.id.toString() === id);

  if (!film || !film.youtubeVideoId) {
    notFound();
  }

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${film.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="bg-black flex flex-col h-screen">
      <header className="p-4 z-10 flex justify-between items-center">
        <Button asChild variant="secondary">
          <Link href="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>
        <h1 className="text-lg font-semibold text-white">{film.title}</h1>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src={youtubeEmbedUrl}
            title={film.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}
