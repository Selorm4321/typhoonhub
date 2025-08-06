
'use client';

import { useState } from 'react';
import { podcastEpisodes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Headphones, Play } from 'lucide-react';
import Image from 'next/image';

export default function GlobalCinemaPage() {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  if (!podcastEpisodes || podcastEpisodes.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Headphones className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Global Cinema Podcast</h1>
        <p className="mt-4 text-lg text-muted-foreground">No podcast episodes available at the moment.</p>
      </div>
    );
  }

  const activeEpisode = podcastEpisodes[currentEpisodeIndex];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Headphones className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Global Cinema Podcast</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tune in for discussions on independent film, creator interviews, and industry insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="bg-secondary/20 overflow-hidden">
 <div className="aspect-video relative w-full">
 <Image
                    src={activeEpisode.coverUrl}
 alt={activeEpisode.title}
 layout="fill"
 className="object-cover"
 data-ai-hint="podcast cover art"
                />
             </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{activeEpisode.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 rounded-lg">
                <audio controls className="w-full" key={activeEpisode.id} src={activeEpisode.audioUrl}>
                  Your browser does not support the audio element.
                </audio>
                 <CardDescription>{activeEpisode.showNotes}</CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>All Episodes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3 pr-4">
                  {podcastEpisodes.map((episode, index) => (
                    <button
                      key={episode.id}
                      onClick={() => setCurrentEpisodeIndex(index)}
                      className={cn(
                        "w-full text-left p-3 rounded-md transition-colors flex items-center gap-4",
                        index === currentEpisodeIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
 <div className="flex items-center gap-4">
 <Image src={episode.coverUrl} alt={episode.title} width={64} height={64} className="w-16 h-16 object-cover rounded-lg shrink-0" data-ai-hint="podcast cover art" />
 <span className="font-medium text-sm truncate">{episode.title}</span>
 </div>
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
