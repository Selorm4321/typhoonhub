
"use client";

import * as React from "react";

type Props = {
  initial: Record<string, any>;
};

export default function AdminProductionForm({ initial }: Props) {
  const [values, setValues] = React.useState({
    active: Boolean(initial.active),
    currency: initial.currency ?? "USD",
    offerTermsUrl: initial.offerTermsUrl ?? "",

    platformFeePct: withNum(initial.platformFeePct, 0.10),
    distributorFeePct: withNum(initial.distributorFeePct, 0.05),
    otherCostsCents: withInt(initial.otherCostsCents, 0),

    targetMultiple: withNum(initial.targetMultiple, 1.2),
    investorSharePreRecoup: withNum(initial.investorSharePreRecoup, 1.0),
    investorSharePostRecoup: withNum(initial.investorSharePostRecoup, 0.5),
  });

  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, v: any) {
    setValues((old) => ({ ...old, [key]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/production/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitize(values)),
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage("Saved!");
    } catch (err: any) {
      console.error(err);
      setMessage("Save failed. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.active}
              onChange={(e) => set("active", e.target.checked)}
            />
            <span>Active</span>
          </label>

          <div>
            <div className="text-sm mb-1">Currency (ISO)</div>
            <input
              type="text"
              value={values.currency}
              onChange={(e) => set("currency", e.target.value.toUpperCase())}
              placeholder="USD"
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
            <div className="text-[11px] text-neutral-500 mt-1">Examples: USD, CAD, EUR. (Checkout is USD unless you change Stripe config.)</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-sm mb-1">Offer Terms URL</div>
            <input
              type="url"
              value={values.offerTermsUrl}
              onChange={(e) => set("offerTermsUrl", e.target.value)}
              placeholder="https://example.com/offer-terms.pdf"
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">ROI / Waterfall</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm mb-1">Platform Fee %</div>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={values.platformFeePct * 100}
              onChange={(e) => set("platformFeePct", clampPct(e.target.value))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <div className="text-sm mb-1">Distributor Fee %</div>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={values.distributorFeePct * 100}
              onChange={(e) => set("distributorFeePct", clampPct(e.target.value))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <div className="text-sm mb-1">Other Costs (USD cents)</div>
            <input
              type="number"
              min={0}
              step="100"
              value={values.otherCostsCents}
              onChange={(e) => set("otherCostsCents", clampInt(e.target.value))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <div className="text-sm mb-1">Target Multiple (x)</div>
            <input
              type="number"
              min={1}
              step="0.1"
              value={values.targetMultiple}
              onChange={(e) => set("targetMultiple", clampFloat(e.target.value, 1, 10, 1.2))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <div className="text-sm mb-1">Investor Share Pre‑Recoup %</div>
            <input
              type="number"
              min={0}
              max={100}
              step="1"
              value={values.investorSharePreRecoup * 100}
              onChange={(e) => set("investorSharePreRecoup", clampPct(e.target.value))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <div className="text-sm mb-1">Investor Share Post‑Recoup %</div>
            <input
              type="number"
              min={0}
              max={100}
              step="1"
              value={values.investorSharePostRecoup * 100}
              onChange={(e) => set("investorSharePostRecoup", clampPct(e.target.value))}
              className="w-full rounded-md border bg-transparent px-3 py-2"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {message ? <span className="text-sm">{message}</span> : null}
      </div>
    </form>
  );
}

function withNum(v: any, def: number) {
  return typeof v === "number" ? v : def;
}
function withInt(v: any, def: number) {
  return Number.isInteger(v) ? v : def;
}
function clampPct(str: string) {
  const n = Number(str);
  const pct = isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
  return pct / 100;
}
function clampInt(str: string) {
  const n = Math.max(0, Math.floor(Number(str)));
  return isFinite(n) ? n : 0;
}
function clampFloat(str: string, min: number, max: number, def: number) {
  const n = Number(str);
  if (!isFinite(n)) return def;
  return Math.min(max, Math.max(min, n));
}

function sanitize(v: any) {
  return {
    active: !!v.active,
    currency: String(v.currency || "USD").toUpperCase().slice(0, 3),
    offerTermsUrl: v.offerTermsUrl || "",

    platformFeePct: numberOr(v.platformFeePct, 0.10),
    distributorFeePct: numberOr(v.distributorFeePct, 0.05),
    otherCostsCents: intOr(v.otherCostsCents, 0),

    targetMultiple: numberOr(v.targetMultiple, 1.2),
    investorSharePreRecoup: numberOr(v.investorSharePreRecoup, 1.0),
    investorSharePostRecoup: numberOr(v.investorSharePostRecoup, 0.5),
  };
}
function numberOr(v: any, def: number) {
  const n = Number(v);
  return isFinite(n) ? n : def;
}
function intOr(v: any, def: number) {
  const n = Math.floor(Number(v));
  return isFinite(n) ? n : def;
}
