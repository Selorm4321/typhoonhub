import WatchClient from './WatchClient';
import { films } from '@/lib/data';

// Server Component: do NOT use "use client" here.
export const dynamicParams = false;
export async function generateStaticParams() {
  // Pre-render all known watch pages based on our static data
  return films.map((f) => ({ id: f.id.toString() }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <WatchClient id={params.id} />;
}
