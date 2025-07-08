import { films } from '@/lib/data';
import { Tv } from 'lucide-react';

export default function LivePage() {
  // Edge case: no films defined at all.
  if (!films || films.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-3xl font-bold">Live TV</h1>
        <p className="mt-4 text-muted-foreground">No shows available to play.</p>
      </div>
    );
  }

  // Filter out any films that might not have a video ID
  const videoIds = films.map((film) => film.youtubeVideoId).filter(Boolean);

  // Edge case: films exist, but none have video IDs.
  if (videoIds.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-3xl font-bold">Live TV</h1>
        <p className="mt-4 text-muted-foreground">No shows with valid video IDs available to create a playlist.</p>
      </div>
    );
  }

  const firstVideoId = videoIds[0];
  const playlist = videoIds.join(',');

  // Construct the embed URL. loop=1 requires playlist to be set. It will loop the entire playlist.
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${firstVideoId}?playlist=${playlist}&autoplay=1&loop=1&rel=0&iv_load_policy=3&controls=1`;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Tv className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Live TV Channel</h1>
      </div>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Welcome to our 24/7 non-stop stream of all content. Sit back, relax, and enjoy the show! The next video will play automatically once the current one finishes.
      </p>

      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
        <iframe
          className="w-full h-full"
          src={youtubeEmbedUrl}
          title="Typhoon Entertainment Live Channel"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
