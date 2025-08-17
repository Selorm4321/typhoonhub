import WatchClient from './WatchClient';

// Server Component
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /watch/[id] pages prebuilt yet
}

export default function Page({ params }: { params: { id: string } }) {
  return <WatchClient id={params.id} />;
}
