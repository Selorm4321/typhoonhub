import SubmitClient from './SubmitClient';

// Server Component
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /submit pages prebuilt yet
}

export default function SubmitPage() {
  return <SubmitClient />;
}