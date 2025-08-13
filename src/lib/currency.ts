export function money(nCents: number | undefined, currency = "USD") {
  if (typeof nCents !== "number" || !isFinite(nCents)) return "—";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(nCents / 100);
  } catch {
    // fallback if unknown ISO code
    return `${currency} ${(nCents / 100).toLocaleString()}`;
  }
}

export function pct(fraction: number | undefined) {
  if (typeof fraction !== "number" || !isFinite(fraction)) return "—";
  return `${(fraction * 100).toFixed(1)}%`;
}
