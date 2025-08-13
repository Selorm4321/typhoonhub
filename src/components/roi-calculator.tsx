
"use client";

import * as React from "react";

export type RoiConfig = {
  platformFeePct?: number;       // 0..1
  distributorFeePct?: number;    // 0..1
  otherCostsCents?: number;      // cents
  targetMultiple?: number;       // e.g. 1.2
  investorSharePreRecoup?: number;   // 0..1
  investorSharePostRecoup?: number;  // 0..1
};

type Props = {
  investmentCents: number; // user-entered investment
  config?: RoiConfig;
};

function fmt(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function RoiCalculator({ investmentCents, config }: Props) {
  const defaults: Required<RoiConfig> = {
    platformFeePct: 0.10,
    distributorFeePct: 0.05,
    otherCostsCents: 0,
    targetMultiple: 1.2,
    investorSharePreRecoup: 1,
    investorSharePostRecoup: 0.5,
  };

  const cfg = { ...defaults, ...(config || {}) };

  const [grossRevenueUSD, setGrossRevenueUSD] = React.useState<number>(50000); // user scenario

  // Core math (all internal in cents)
  const grossCents = Math.max(0, Math.round(grossRevenueUSD * 100));
  const feesCents = Math.round(grossCents * (cfg.platformFeePct + cfg.distributorFeePct));
  const netDistributableBeforeCosts = grossCents - feesCents;
  const netDistributable = Math.max(0, netDistributableBeforeCosts - (cfg.otherCostsCents || 0));

  const recoupCapCents = Math.round(investmentCents * (cfg.targetMultiple || 1));
  const preRecoupForInvestors = Math.min(
    netDistributable,
    Math.round(netDistributable * (cfg.investorSharePreRecoup || 0))
  );

  // Amount investors can still receive at pre-recoup rate
  const remainingToCap = Math.max(0, recoupCapCents);
  const preRecoupPayout = Math.min(preRecoupForInvestors, remainingToCap);

  const afterPreRecoupDistributable = Math.max(0, netDistributable - preRecoupPayout);

  // Post-recoup split applies only if pre-recoup payout hit cap
  const hitCap = preRecoupPayout >= remainingToCap && remainingToCap > 0;
  const postRecoupPayout = hitCap
    ? Math.round(afterPreRecoupDistributable * (cfg.investorSharePostRecoup || 0))
    : 0;

  const totalInvestorPayoutCents = preRecoupPayout + postRecoupPayout;

  const roiMultiple = investmentCents > 0 ? totalInvestorPayoutCents / investmentCents : 0;
  const roiPercent = (roiMultiple - 1) * 100;

  return (
    <div className="rounded-xl border border-gray-700 p-3 mt-3 text-sm">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-xs text-neutral-400">Projected Gross Revenue (USD)</label>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="100"
            value={grossRevenueUSD}
            onChange={(e) => setGrossRevenueUSD(parseFloat(e.target.value || "0"))}
            className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2"
            placeholder="50000"
          />
          <div className="mt-1 text-xs text-neutral-400">
            Fees: {(cfg.platformFeePct + cfg.distributorFeePct) * 100}% • Other costs: $
            {fmt((cfg.otherCostsCents || 0) / 100)}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Net Distributable</div>
          <div className="text-base font-semibold text-white">${fmt(netDistributable / 100)}</div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Investor Payout</div>
          <div className="text-base font-semibold text-white">${fmt(totalInvestorPayoutCents / 100)}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">Target Recoup</div>
          <div className="text-base font-semibold text-white">${fmt(recoupCapCents / 100)} ({cfg.targetMultiple}x)</div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">ROI Multiple</div>
          <div className="text-base font-semibold text-white">{roiMultiple.toFixed(2)}x</div>
        </div>
        <div className="rounded-lg bg-black/20 p-3">
          <div className="text-xs text-neutral-400">ROI %</div>
          <div className="text-base font-semibold text-white">{isFinite(roiPercent) ? roiPercent.toFixed(1) : "—"}%</div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-neutral-500">
        Estimates only. Actual returns depend on real revenues and contract terms.
      </div>
    </div>
  );
}
