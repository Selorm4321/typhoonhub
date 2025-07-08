import type { Film } from '@/lib/data';
import FilmCard from './film-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type FilmCarouselProps = {
  title: string;
  films: Film[];
};

export default function FilmCarousel({ title, films }: FilmCarouselProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-headline text-2xl font-bold">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {films.map((film) => (
            <CarouselItem key={film.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <FilmCard film={film} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex"/>
      </Carousel>
    </section>
  );
}
