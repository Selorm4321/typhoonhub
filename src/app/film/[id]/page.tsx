import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, PlayCircle, Star } from 'lucide-react';

import { films, type Film } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FilmCard from '@/components/film-card';

export default function FilmDetailPage({ params }: { params: { id: string } }) {
  const film = films.find((f) => f.id.toString() === params.id);

  if (!film) {
    notFound();
  }

  const similarFilms = films.filter((f) => f.id !== film.id);

  return (
    <div className="flex flex-col">
      <section className="relative h-[50vh] w-full">
        <Image
          src={film.backdropUrl}
          alt={`Backdrop for ${film.title}`}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="youtube thumbnail"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="container -mt-48 z-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
          <div className="w-full">
            <Image
              src={film.posterUrl}
              alt={`Poster for ${film.title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl w-full"
              data-ai-hint="youtube thumbnail"
            />
            <Button asChild size="lg" className="w-full mt-4">
              <Link href={`/watch/${film.id}`}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Now
              </Link>
            </Button>
          </div>

          <div className="space-y-6 pt-8 md:pt-0">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl lg:text-5xl font-bold">{film.title}</h1>
              <p className="text-lg text-muted-foreground">{film.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{film.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-2">
                  {film.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-headline text-2xl font-semibold">Synopsis</h2>
              <p className="text-foreground/80">{film.synopsis}</p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-semibold">Cast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {film.cast.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person photo"/>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-headline text-2xl font-semibold">Reviews</h2>
            {film.reviews.length > 0 ? (
              <div className="space-y-4">
                {film.reviews.map((review) => (
                  <Card key={review.author}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{review.author}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-accent fill-accent" />
                          <span>{review.rating}/5</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">"{review.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
               <p className="text-muted-foreground">No reviews yet.</p>
            )}
          </section>
        </div>

        {similarFilms.length > 0 && (
          <>
            <Separator className="my-12" />
            <section className="space-y-6">
              <h2 className="font-headline text-2xl font-semibold">You Might Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {similarFilms.map((similarFilm) => (
                  <FilmCard key={similarFilm.id} film={similarFilm} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
