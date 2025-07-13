import FilmCard from '@/components/film-card';
import { films } from '@/lib/data';
import { Film } from 'lucide-react';

export default function BrowsePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-10 text-center">
        <Film className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Browse All Shows</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our complete collection of independent films, shorts, and documentaries.
        </p>
      </div>

      {films.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No films available at the moment.</p>
          <p className="text-sm text-muted-foreground">
            Please check back later for new content.
          </p>
        </div>
      )}
    </div>
  );
}
