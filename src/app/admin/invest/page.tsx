
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Link from "next/link";
import { db } from "@/lib/firebase-admin";

type Row = {
  id: string;
  title: string;
  active: boolean;
  goal?: number;
  raised?: number;
  minInvestment?: number;

  // ROI & terms (optional)
  platformFeePct?: number;
  distributorFeePct?: number;
  otherCostsCents?: number;
  targetMultiple?: number;
  investorSharePreRecoup?: number;
  investorSharePostRecoup?: number;
  offerTermsUrl?: string;
  currency?: string; // e.g. "USD"
};

async function getProductions(): Promise<Row[]> {
  const snap = await db().collection("productions").get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export default async function AdminInvest() {
  const rows = await getProductions();
  const totalRaised = rows.reduce((sum, r) => sum + (r.raised ?? 0), 0);
  const totalGoal = rows.reduce((sum, r) => sum + (r.goal ?? 0), 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Investments Admin</h1>

      <div className="mb-6 rounded-xl border p-4">
        <div className="text-sm text-neutral-600">Totals</div>
        <div className="mt-1 text-lg">
          Raised ${(totalRaised / 100).toLocaleString()}{" "}
          {totalGoal ? (
            <>/ ${(totalGoal / 100).toLocaleString()} ({((totalRaised / totalGoal) * 100).toFixed(1)}%)</>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Raised</th>
              <th className="px-4 py-3">Goal</th>
              <th className="px-4 py-3">% Funded</th>
              <th className="px-4 py-3">Currency</th>
              <th className="px-4 py-3">Edit</th>
              <th className="px-4 py-3">Doc ID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const raised = r.raised ?? 0;
              const goal = r.goal ?? 0;
              const pct = goal ? ((raised / goal) * 100).toFixed(1) : "—";
              return (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3">{r.active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">${(raised / 100).toLocaleString()}</td>
                  <td className="px-4 py-3">{goal ? `$${(goal / 100).toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3">{pct}%</td>
                  <td className="px-4 py-3">{r.currency ?? "USD"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/invest/${r.id}`} className="rounded-md border px-3 py-1 hover:bg-neutral-100">
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{r.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
