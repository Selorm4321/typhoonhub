import WatchClient from './WatchClient';

// Server Component: do NOT use "use client" here.
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /watch/[id] pages prebuilt yet (needed for static export)
}

export default function Page({ params }: { params: { id: string } }) {
  return <WatchClient id={params.id} />;
}
