
'use client';

export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /watch/[id] pages prebuilt yet
}

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// …rest of your imports and component code…
// Temporary so static export succeeds
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /watch/[id] pages prebuilt yet
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { films } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function WatchPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const film = films.find((f) => f.id.toString() === params.id);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!film || !film.youtubeVideoId) {
    notFound();
  }

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${film.youtubeVideoId}?autoplay=1&rel=0`;

  return (
    <div className="bg-black flex flex-col h-screen">
      <header className="p-4 z-10 flex justify-between items-center">
        <Button asChild variant="secondary">
          <Link href={`/film/${film.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Link>
        </Button>
        <h1 className="text-lg font-semibold text-white">{film.title}</h1>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={youtubeEmbedUrl}
            title={film.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
