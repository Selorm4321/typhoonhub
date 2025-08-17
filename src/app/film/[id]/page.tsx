import FilmClient from './FilmClient';
import { films } from '@/lib/data';

// Required for static export
export const dynamicParams = false;
export async function generateStaticParams() {
  // Pre-render all known film pages based on our static data
  return films.map((f) => ({ id: f.id.toString() }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <FilmClient id={params.id} />;
}