'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { films } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function WatchClient({ id }: { id: string }) {
  const film = films.find((f) => f.id.toString() === id);

  if (!film) {
    notFound();
  }

  // Check if we have a valid video source
  if (!film.youtubeVideoId && !film.firebaseVideoUrl) {
    notFound();
  }

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
          {film.videoType === 'youtube' && film.youtubeVideoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${film.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={film.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : film.videoType === 'firebase' && film.firebaseVideoUrl ? (
            <video
              className="w-full h-full"
              controls
              autoPlay
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src={film.firebaseVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>
    </div>
  );
}
