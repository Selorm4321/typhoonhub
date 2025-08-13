
import { db } from "@/lib/firebase-admin";
import { Production } from "@/lib/types";
import InvestmentProjectCard from "@/components/investment-project-card";

export const revalidate = 60; // Revalidate data every 60 seconds
export const dynamic = "force-dynamic";

async function getActiveProductions(): Promise<Production[]> {
  try {
    const snap = await db().collection("productions").where("active", "==", true).get();
    if (snap.empty) {
      return [];
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Production, "id">) }));
  } catch (error) {
    console.error("Failed to fetch active productions:", error);
    return []; // Return an empty array on error
  }
}

export default async function InvestPage() {
  const projects = await getActiveProductions();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">INVEST IN INDEPENDENT CINEMA</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Where independent filmmakers create, collaborate, and connect with audiences globally.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No active investment opportunities at the moment.</p>
            <p className="text-sm text-muted-foreground">Please check back later for new projects.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {projects.map((p) => (
            <InvestmentProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
       <section className="py-16 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Share Your Vision</h2>
            <p className="text-gray-300 mb-8">
              Are you an independent filmmaker with a story to tell? We want to see it. Submit your film for a chance to
              be featured on Typhoonhub.
            </p>
            <a
              href="https://typhoonhub.ca/submit-film"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium"
            >
              Submit Your Film
            </a>
          </div>
        </section>
    </main>
  );
}
