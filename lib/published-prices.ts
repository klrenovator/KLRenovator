/**
 * Single source of published prices for body copy and schema.
 *
 * Every price string is looked up from `config/site/pricing.ts` so commercial
 * claims cannot drift from the live price list. Import these constants
 * instead of typing "RM 120" inline.
 *
 * Lookups throw at module load if a row is renamed or removed — that is
 * deliberate. A missing price must fail the build, not silently ship a
 * stale figure.
 */

import { pricing } from "@/config/site/pricing";

type PricingGroup = keyof typeof pricing;

function price(group: PricingGroup, labelIncludes: string): string {
  const table = pricing[group];
  if (!("rows" in table)) {
    throw new Error(`published-prices: ${group} has no rows`);
  }
  const row = table.rows.find((r) =>
    r.label.toLowerCase().includes(labelIncludes.toLowerCase()),
  );
  if (!row) {
    throw new Error(
      `published-prices: no ${group} row matching "${labelIncludes}"`,
    );
  }
  return row.price;
}

/** Numeric MYR amount parsed from a "RM 120" / "RM 2.50 / PSI" string. */
export function priceAmount(priceText: string): string {
  const m = priceText.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!m) {
    throw new Error(`published-prices: cannot parse amount from "${priceText}"`);
  }
  return m[1];
}

export const publishedPrices = {
  diagnostic: price("repair", "Diagnostic"),
  capacitor: price("repair", "Capacitor"),
  fanMotor: price("repair", "Fan Motor"),
  pcb: price("repair", "PCB"),
  leakRepair: price("repair", "Gas Leak"),
  sensor: price("repair", "Temperature Sensor"),
  contactor: price("repair", "Contactor"),
  drainPump: price("repair", "Drain Pump"),
  compressor: price("repair", "Compressor"),

  chemicalWash15: price("chemicalWash", "1.0 – 1.5"),
  chemicalWash25: price("chemicalWash", "2.0 – 2.5"),
  chemicalWash30: price("chemicalWash", "3.0 HP"),
  chemicalWashCassette15: price("chemicalWash", "Cassette · 1.0"),
  chemicalWashWindow: price("chemicalWash", "Window Unit · 1.0"),

  overhaul15: price("chemicalOverhaul", "1.0 – 1.5"),
  overhaul25: price("chemicalOverhaul", "2.0 – 2.5"),
  overhaul30: price("chemicalOverhaul", "3.0 – 3.5"),

  r22: price("gasTopup", "R22"),
  r410a: price("gasTopup", "R410A"),
  r32: price("gasTopup", "R32"),
  gasLeakRepair: price("gasTopup", "Leak"),

  basic15: price("basicServicing", "1.0 – 1.5"),
  basic25: price("basicServicing", "2.0 – 2.5"),

  installWall15: price("installation", "1.0 HP"),
  installWall20: price("installation", "2.0 HP"),
  installCassette15: price("installation", "Cassette · 1.0"),
  installWindow: price("installation", "Window Unit · 1.0"),
} as const;

export type PublishedPrices = typeof publishedPrices;
