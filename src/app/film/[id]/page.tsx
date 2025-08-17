import FilmClient from './FilmClient';

// Required for static export
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /film/[id] pages prebuilt yet
}

export default function Page({ params }: { params: { id: string } }) {
  return <FilmClient id={params.id} />;
}