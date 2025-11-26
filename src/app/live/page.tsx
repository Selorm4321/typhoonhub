
'use client';

import { useState } from 'react';
import { films } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export default function LivePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Edge case: no films defined at all.
  if (!films || films.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-3xl font-bold">Live TV</h1>
        <p className="mt-4 text-muted-foreground">No shows available to play.</p>
      </div>
    );
  }

  const activeFilm = films[currentIndex];
  const upNextFilms = films.filter((_, index) => index !== currentIndex);

  const handleSelectFilm = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
            {activeFilm.videoType === 'youtube' && activeFilm.youtubeVideoId ? (
              <iframe
                key={activeFilm.id}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeFilm.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeFilm.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeFilm.videoType === 'firebase' && activeFilm.firebaseVideoUrl ? (
              <video
                key={activeFilm.id}
                className="w-full h-full"
                controls
                autoPlay
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src={activeFilm.firebaseVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
          
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary-foreground">Now Playing</h2>
            <div className="mt-4 space-y-2">
              <h3 className="font-headline text-2xl font-semibold">{activeFilm.title}</h3>
              <p className="text-lg text-muted-foreground italic">{activeFilm.tagline}</p>
              <p className="text-foreground/80 pt-2">{activeFilm.synopsis}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Up Next</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px] pr-4">
                <div className="space-y-3">
                  {films.map((film, index) => (
                    <button
                      key={film.id}
                      onClick={() => handleSelectFilm(index)}
                      className={cn(
                        "w-full text-left p-3 rounded-md transition-colors flex items-center gap-3",
                        index === currentIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {index === currentIndex && <Play className="h-4 w-4 shrink-0" />}
                      <span className="truncate">{film.title}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
