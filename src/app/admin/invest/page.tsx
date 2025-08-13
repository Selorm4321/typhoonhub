
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Link from "next/link";
import { db } from "@/lib/firebase-admin";
import { money, pct } from "@/lib/currency";

type Row = {
  id: string;
  title: string;
  active: boolean;
  goal?: number;
  raised?: number;
  minInvestment?: number;

  currency?: string;
  offerTermsUrl?: string;

  platformFeePct?: number;
  distributorFeePct?: number;
  otherCostsCents?: number;

  targetMultiple?: number;
  investorSharePreRecoup?: number;
  investorSharePostRecoup?: number;
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
    <main className="mx-auto max-w-[1200px] px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Investments Admin</h1>

      <div className="mb-6 rounded-xl border p-4">
        <div className="text-sm text-neutral-600">Totals</div>
        <div className="mt-1 text-lg">
          {money(totalRaised)}{" "}
          {totalGoal ? <>/ {money(totalGoal)} ({((totalRaised / totalGoal) * 100).toFixed(1)}%)</> : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-[1100px] text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Raised</th>
              <th className="px-4 py-3">Goal</th>
              <th className="px-4 py-3">% Funded</th>
              <th className="px-4 py-3">Currency</th>

              {/* ROI columns */}
              <th className="px-4 py-3">Platform %</th>
              <th className="px-4 py-3">Distributor %</th>
              <th className="px-4 py-3">Other Costs</th>
              <th className="px-4 py-3">Target ×</th>
              <th className="px-4 py-3">Pre‑recoup %</th>
              <th className="px-4 py-3">Post‑recoup %</th>

              <th className="px-4 py-3">Offer Terms</th>
              <th className="px-4 py-3">Edit</th>
              <th className="px-4 py-3">Doc ID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const raised = r.raised ?? 0;
              const goal = r.goal ?? 0;
              const cur = r.currency ?? "USD";
              const funded = goal ? ((raised / goal) * 100).toFixed(1) : "—";
              return (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3">{r.active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{money(raised, cur)}</td>
                  <td className="px-4 py-3">{goal ? money(goal, cur) : "—"}</td>
                  <td className="px-4 py-3">{funded}%</td>
                  <td className="px-4 py-3">{cur}</td>

                  <td className="px-4 py-3">{pct(r.platformFeePct)}</td>
                  <td className="px-4 py-3">{pct(r.distributorFeePct)}</td>
                  <td className="px-4 py-3">{money(r.otherCostsCents, cur)}</td>
                  <td className="px-4 py-3">{r.targetMultiple ?? "—"}x</td>
                  <td className="px-4 py-3">{pct(r.investorSharePreRecoup)}</td>
                  <td className="px-4 py-3">{pct(r.investorSharePostRecoup)}</td>

                  <td className="px-4 py-3">
                    {r.offerTermsUrl ? (
                      <a className="underline" href={r.offerTermsUrl} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
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
