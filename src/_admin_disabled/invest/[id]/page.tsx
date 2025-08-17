
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Required for static export
export const dynamicParams = false;
export async function generateStaticParams() {
  return []; // no /admin/invest/[id] pages prebuilt yet
}

import { db } from "@/lib/firebase-admin";
import AdminProductionForm from "@/components/admin/admin-production-form";

type ProdDoc = Record<string, any>;

async function getDoc(id: string): Promise<ProdDoc | null> {
  const doc = await db().collection("productions").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export default async function AdminInvestEditPage({ params }: { params: { id: string } }) {
  const doc = await getDoc(params.id);
  if (!doc) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Not found</h1>
        <p className="text-neutral-500">Production document does not exist.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Edit: {doc.title ?? doc.id}</h1>
      <AdminProductionForm initial={doc} />
    </main>
  );
}
