"use client";

import * as React from "react";

export type RoiConfig = {
  platformFeePct?: number;       // 0..1
  distributorFeePct?: number;    // 0..1
  otherCostsCents?: number;      // cents
  targetMultiple?: number;       // e.g. 1.2
  investorSharePreRecoup?: number;   // 0..1
  investorSharePostRecoup?: number;  // 0..1
  currency?: string;             // "USD" default
  offerTermsUrl?: string;        // optional link
};

type Props = {
  investmentCents: number;       // user-entered investment
  config?: RoiConfig;
};

function fmtMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
}

export default function RoiCalculator({ investmentCents, config }: Props) {
  const defaults = {
    platformFeePct: 0.10,
    distributorFeePct: 0.05,
    otherCostsCents: 0,
    targetMultiple: 1.2,
    investorSharePreRecoup: 1,
    investorSharePostRecoup: 0.5,
    currency: "USD",
    offerTermsUrl: "",
  };

  const cfg = { ...defaults, ...(config || {}) };
  const [grossRevenue, setGrossRevenue] = React.useState<number>(50000); // user scenario (in currency units)

  // Math (in cents)
  const grossCents = Math.max(0, Math.round(grossRevenue * 100));
  const feesCents = Math.round(grossCents * (cfg.platformFeePct + cfg.distributorFeePct));
  const netDistributableBeforeCosts = grossCents - feesCents;
  const netDistributable = Math.max(0, netDistributableBeforeCosts - (cfg.otherCostsCents || 0));

  const recoupCapCents = Math.round(investmentCents * (cfg.targetMultiple || 1));
  const preRecoupForInvestors = Math.min(
    netDistributable,
    Math.round(netDistributable * (cfg.investorSharePreRecoup || 0))
  );

  const preRecoupPayout = Math.min(preRecoupForInvestors, recoupCapCents);
  const afterPreRecoupDistributable = Math.max(0, netDistributable - preRecoupPayout);

  const hitCap = preRecoupPayout >= recoupCapCents && recoupCapCents > 0;
  const postRecoupPayout = hitCap
    ? Math.round(afterPreRecoupDistributable * (cfg.investorSharePostRecoup || 0))
    : 0;

  const totalInvestorPayoutCents = preRecoupPayout + postRecoupPayout;
  const roiMultiple = investmentCents > 0 ? totalInvestorPayoutCents / investmentCents : 0;
  const roiPercent = (roiMultiple - 1) * 100;

  return (
    <div className="rounded-xl border p-3 mt-3 text-sm">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-xs text-neutral-400">Projected Gross Revenue ({cfg.currency})</label>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="100"
            value={grossRevenue}
            onChange={(e) => setGrossRevenue(parseFloat(e.target.value || "0"))}
            className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2"
            placeholder="50000"
          />
          <div className="mt-1 text-xs text-neutral-400">
            Fees: {(cfg.platformFeePct + cfg.distributorFeePct) * 100}% • Other costs: {fmtMoney(cfg.otherCostsCents || 0, cfg.currency)}
            {cfg.offerTermsUrl ? (
              <>
                {" • "}
                <a href={cfg.offerTermsUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  Offer Terms
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Net Distributable</div>
          <div className="text-base">{fmtMoney(netDistributable, cfg.currency)}</div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Investor Payout</div>
          <div className="text-base">{fmtMoney(totalInvestorPayoutCents, cfg.currency)}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Target Recoup</div>
          <div className="text-base">
            {fmtMoney(recoupCapCents, cfg.currency)} ({cfg.targetMultiple}x)
          </div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">ROI Multiple</div>
          <div className="text-base">{roiMultiple.toFixed(2)}x</div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">ROI %</div>
          <div className="text-base">{isFinite(roiPercent) ? roiPercent.toFixed(1) : "—"}%</div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">
        Estimates only. Actual returns depend on real revenues and contract terms.
      </div>
    </div>
  );
}
