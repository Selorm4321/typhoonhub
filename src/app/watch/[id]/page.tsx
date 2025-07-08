import { films } from '@/lib/data';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function WatchPage({ params }: { params: { id: string } }) {
  const film = films.find((f) => f.id.toString() === params.id);

  if (!film) {
    notFound();
  }

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
          {/* In a real app, this would be a sophisticated video player component like Plyr, Video.js, etc. */}
          <video
            className="w-full h-full"
            controls
            autoPlay
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster={film.backdropUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
