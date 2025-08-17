import WatchClient from './WatchClient';

// Required for static export
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /watch/[id] pages prebuilt yet
}

export default function Page({ params }: { params: { id: string } }) {
  return <WatchClient id={params.id} />;
}