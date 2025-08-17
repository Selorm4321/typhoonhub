'use client';

import FilmCard from '@/components/film-card';
import SearchInput from '@/components/search-input';
import { films } from '@/lib/data';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase();

  const filteredFilms = films.filter((film) => {
    if (!query) return true;
    return (
      film.title.toLowerCase().includes(query) ||
      film.genres.some((genre) => genre.toLowerCase().includes(query)) ||
      film.cast.some((actor) => actor.name.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="font-headline text-3xl font-bold">Search</h1>
        <div className="md:hidden">
          <SearchInput />
        </div>
        {query && (
          <p className="text-muted-foreground">
            Showing {filteredFilms.length} results for "{query}"
          </p>
        )}
      </div>

      {filteredFilms.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No films found.</p>
          <p className="text-sm text-muted-foreground">
            Try searching for a different title, genre, or actor.
          </p>
        </div>
      )}
    </div>
  );
}
