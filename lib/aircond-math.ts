// ─────────────────────────────────────────────────────────────────────────
// Aircond calculation core — shared by EVERY calculator .
//
// RULES:
//  1. Client-safe: imports ONLY `config/site-public.ts` (the auto-generated
//     projection of `config/site.ts`). NEVER import `config/site.ts` here —
//     that would drag the 1.1 MB config into every client bundle.
//  2. All published KL Renovator prices come from `sitePublic.pricing` so
//     `config/site.ts` stays the single source of truth. If you change a
//     price in site.ts, run `npm run gen:site-public`.
//  3. Any assumption that is NOT published on the website (wattage per HP,
//     typical gas PSI, inverter savings %) is declared as a named constant
//     below with a comment, so it can be audited and tuned in one place.
// ─────────────────────────────────────────────────────────────────────────

import { sitePublic } from "@/config/site-public";

// ── Types ─────────────────────────────────────────────────────────────────
export type UnitType = "wall" | "cassette" | "window";
export type GasType = "r22" | "r410a" | "r32";
export type HpSize =
  | "1.0" | "1.5" | "2.0" | "2.5" | "3.0" | "3.5" | "4.0" | "5.0";

export interface BundleDiscount {
  pct: number;
  label: string;
  /** Human description e.g. "4–10 units" — mirrors siteConfig.volumeDiscounts */
  range: string;
}

// ── Published-price helpers (source: sitePublic.pricing) ────────────────────

/** "RM 199" → 199 · "RM 17/ft" → 17 · "RM 2.50 / PSI" → 2.5 */
export function rmToNumber(price: string): number {
  const m = price.replace(/[^\d.]/g, "");
  const n = parseFloat(m);
  return Number.isFinite(n) ? n : 0;
}

/** Parses published RM price strings into minimum/maximum values. */
export function rmRange(price: string): { min: number; max: number } {
  const nums = price.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (nums.length === 0) return { min: 0, max: 0 };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

export function formatRM(n: number): string {
  return `RM ${n.toLocaleString("en-MY", { maximumFractionDigits: 0 })}`;
}

// ── HP helpers ─────────────────────────────────────────────────────────────

export function hpNumeric(hp: HpSize): number {
  return parseFloat(hp);
}

/** Installation labour — rows straight from siteConfig.pricing.installation. */
export function installationLabour(hp: HpSize, unitType: UnitType): number {
  const rows = sitePublic.pricing.installation.rows;
  const h = hpNumeric(hp);

  if (unitType === "cassette") {
    const byPrice = (labelPart: string) =>
      rmToNumber(rows.find((r) => r.label.startsWith("Ceiling") && r.label.includes(labelPart))?.price ?? "0");
    if (h <= 1.5) return byPrice("1.0") || 290;
    if (h <= 3.0) return byPrice("2.0") || 350;
    return byPrice("3.5") || 400;
  }
  if (unitType === "window") {
    // siteConfig.pricing.installation has no window rows; the live homepage
    // PriceCalculator (source of truth for tools) prices window at 199/249.
    // The homepage FAQ quotes "window unit from RM 180".
    return h <= 1.5 ? 199 : 249;
  }
  // wall-mounted — exact HP row first, then nearest published tier
  const exact = rows.find((r) => r.label.startsWith("Wall-Mounted") && r.label.includes(` ${hp} HP`));
  if (exact) return rmToNumber(exact.price);
  if (h <= 1.5) return 199;
  if (h <= 2.0) return 249;
  if (h <= 2.5) return 279;
  if (h <= 3.0) return 329;
  if (h <= 3.5) return 329;
  if (h <= 4.0) return 399;
  return 449;
}

/** Copper pipe rate per foot beyond the free 7 ft — from pricing.materials. */
export function copperPipeRate(hp: HpSize): number {
  const h = hpNumeric(hp);
  if (h <= 1.5) return 17;
  if (h <= 2.5) return 23;
  return 27;
}

/** Electrical wire rate per foot beyond the free 7 ft — one published rate for every HP. */
export const ELECTRICAL_WIRE_RATE = rmToNumber(
  sitePublic.pricing.materials.rows.find((x) => x.label === "Electrical Wire")?.price ?? "RM 9/ft",
);
export function electricalWireRate(_hp: HpSize): number {
  return ELECTRICAL_WIRE_RATE;
}

/** Insulation rate per foot beyond the free 7 ft. */
export const INSULATION_RATE = rmToNumber(
  sitePublic.pricing.materials.rows.find((x) => x.label === "Insulation")?.price ?? "RM 7/ft",
);

/** Drain pipe rate per foot beyond the free 7 ft. */
export const DRAIN_PIPE_RATE = rmToNumber(
  sitePublic.pricing.materials.rows.find((x) => x.label.includes("Drain Pipe"))?.price ?? "RM 5/ft",
);

/** Separate published PVC casing rates. */
export const SMALL_PVC_CASING_RATE = rmToNumber(
  sitePublic.pricing.materials.rows.find((x) => x.label.includes("Small PVC Casing"))?.price ?? "RM 6/ft",
);
export const LARGE_PVC_CASING_RATE = rmToNumber(
  sitePublic.pricing.materials.rows.find((x) => x.label.includes("Large PVC Casing"))?.price ?? "RM 12/ft",
);

/** Free run included with every installation (published in pricing notes). */
export const FREE_RUN_FEET = 7;

/** Outdoor bracket — published in pricing.materials. */
export function outdoorBracketPrice(heavyDuty: boolean): number {
  const rows = sitePublic.pricing.materials.rows;
  const label = heavyDuty
    ? rows.find((x) => x.label.includes("Heavy Duty"))
    : rows.find((x) => x.label.includes("Standard") && x.label.includes("Outdoor"));
  return rmToNumber(label?.price ?? (heavyDuty ? "70" : "45"));
}

/** Indoor universal bracket — published in pricing.materials. */
export function indoorBracketPrice(): number {
  const rows = sitePublic.pricing.materials.rows;
  return rmToNumber(rows.find((x) => x.label.includes("Indoor Universal Bracket"))?.price ?? "35");
}

/** Aircond switch / plug point — published in pricing.materials. */
export function switchPrice(): number {
  const rows = sitePublic.pricing.materials.rows;
  return rmToNumber(rows.find((x) => x.label.includes("Plug Point"))?.price ?? "100");
}

/**
 * Drain / condensate pump — the site publishes "Drain Pump Replacement
 * RM 350 – 550" in the repair table; that same published range is used for
 * a new-install water pump add-on (supply + installation). Final confirmed
 * on-site.
 */
export function waterPumpRange(): { min: number; max: number } {
  const row = sitePublic.pricing.repair.rows.find((r) => r.label.includes("Drain Pump"));
  return rmRange(row?.price ?? "RM 350 – 550");
}

/** Bundle discount — mirrors siteConfig.volumeDiscounts + live PriceCalculator. */
export function getBundleDiscount(units: number): BundleDiscount {
  if (units >= 11) return { pct: 10, label: "10% OFF Instant Booking Discount", range: "10+ units" };
  if (units >= 4) return { pct: 5, label: "5% OFF Instant Booking Discount", range: "4–10 units" };
  return { pct: 0, label: "", range: "" };
}

// ── BTU / HP recommendation ─────────────────────────────────────────────────

export interface HpRecommendation {
  hp: HpSize;
  label: string;
  minBTU: number;
  maxBTU: number;
  /** Published installation starting price for this HP (wall-mounted). */
  installFrom: number;
}

/** Common Malaysian aircond sizes. BTU ranges are the industry standard. */
export const HP_BTU_TABLE: HpRecommendation[] = [
  { hp: "1.0", label: "1.0 HP (9,000 BTU)", minBTU: 0, maxBTU: 9000, installFrom: 199 },
  { hp: "1.5", label: "1.5 HP (12,000 BTU)", minBTU: 9001, maxBTU: 12000, installFrom: 199 },
  { hp: "2.0", label: "2.0 HP (18,000 BTU)", minBTU: 12001, maxBTU: 18000, installFrom: 249 },
  { hp: "2.5", label: "2.5 HP (24,000 BTU)", minBTU: 18001, maxBTU: 24000, installFrom: 279 },
  { hp: "3.0", label: "3.0 HP (30,000 BTU)", minBTU: 24001, maxBTU: 30000, installFrom: 329 },
  { hp: "3.5", label: "3.5 HP (36,000 BTU)", minBTU: 30001, maxBTU: 36000, installFrom: 329 },
  { hp: "4.0", label: "4.0 HP (42,000 BTU)", minBTU: 36001, maxBTU: 42000, installFrom: 399 },
  { hp: "5.0", label: "5.0 HP (48,000+ BTU)", minBTU: 42001, maxBTU: Infinity, installFrom: 449 },
];

export function recommendHpFromBtu(btu: number): HpRecommendation {
  const found = HP_BTU_TABLE.find((h) => btu >= h.minBTU && btu <= h.maxBTU);
  return found ?? HP_BTU_TABLE[HP_BTU_TABLE.length - 1];
}

export interface RoomFactors {
  areaSqft: number;
  roomTypeMultiplier: number;
  sunMultiplier: number;
  heightMultiplier: number;
  peopleBTU: number;
  windowsBTU: number;
}

/** Base BTU = area × 25, adjusted for room type, sun, height, people, windows. */
export function calculateBtu(f: RoomFactors): number {
  return Math.round(
    f.areaSqft * 25 * f.roomTypeMultiplier * f.sunMultiplier * f.heightMultiplier +
      f.peopleBTU +
      f.windowsBTU,
  );
}

// Standard multipliers used by the BTU calculator, size calculator and AI.
export const ROOM_TYPE_MULTIPLIERS: Record<string, number> = {
  bedroom: 1.0,
  "master-bedroom": 1.1,
  "living-room": 1.15,
  office: 1.1,
  kitchen: 1.3,
  shop: 1.25,
};

export const SUN_MULTIPLIERS: Record<string, number> = {
  low: 1.0,
  medium: 1.1,
  high: 1.25,
};

/** +600 BTU per person beyond 2 occupants. */
export function peopleBtu(occupants: number): number {
  return occupants > 2 ? (occupants - 2) * 600 : 0;
}

/** +600 BTU per window beyond 1 standard window. */
export function windowsBtu(windows: number): number {
  return windows > 1 ? (windows - 1) * 600 : 0;
}

/** +10% per foot above a 10 ft ceiling. */
export function heightMultiplier(heightFt: number): number {
  return heightFt > 10 ? 1 + (heightFt - 10) * 0.1 : 1;
}

// ── Gas top-up estimate ─────────────────────────────────────────────────────

export interface GasEstimateInput {
  hp: HpSize;
  gasType: GasType;
  /** Estimated refrigerant condition: "low" | "medium" | "high" (how much is missing) */
  condition: "low" | "medium" | "high";
  units: number;
}

export interface GasEstimateResult {
  perPsi: number;
  psiMin: number;
  psiMax: number;
  totalMin: number;
  totalMax: number;
  gasLabel: string;
}

/**
 * Typical PSI shortfall per HP size. Assumptions (not published on the
 * website — the site charges per actual PSI after inspection):
 *   1.0 HP:      low 30 / med 50 / high 70 PSI
 *   1.5–2.0 HP:  low 40 / med 70 / high 90 PSI
 *   2.5–3.0 HP:  low 50 / med 90 / high 120 PSI
 * The estimate is always shown as a RANGE because only a technician's
 * manifold gauge can confirm the real figure.
 */
export function estimateGasPsi(hp: HpSize, condition: GasEstimateInput["condition"]): { min: number; max: number } {
  const h = hpNumeric(hp);
  const base = h <= 1.0 ? [30, 50, 70] : h <= 2.0 ? [40, 70, 90] : [50, 90, 120];
  const idx = condition === "low" ? 0 : condition === "medium" ? 1 : 2;
  const center = base[idx];
  // ±25% band so the estimate reads as a range, never a false-precision number.
  return { min: Math.round(center * 0.75), max: Math.round(center * 1.25) };
}

export const GAS_LABELS: Record<GasType, string> = {
  r22: "R22 (older units)",
  r410a: "R410A (standard)",
  r32: "R32 (newer inverter)",
};

/** Per-PSI published rate: R22 RM 2.50, R410A & R32 RM 3.00. */
export function gasPerPsi(gasType: GasType): number {
  const row = sitePublic.pricing.gasTopup.rows.find((r) => r.label.includes(GAS_LABELS[gasType].split(" ")[0]));
  return rmToNumber(row?.price ?? (gasType === "r22" ? "RM 2.50 / PSI" : "RM 3.00 / PSI"));
}

export function calculateGasEstimate(input: GasEstimateInput): GasEstimateResult {
  const perPsi = gasPerPsi(input.gasType);
  const psi = estimateGasPsi(input.hp, input.condition);
  const totalMin = Math.round(psi.min * perPsi) * input.units;
  const totalMax = Math.round(psi.max * perPsi) * input.units;
  return {
    perPsi,
    psiMin: psi.min,
    psiMax: psi.max,
    totalMin,
    totalMax,
    gasLabel: GAS_LABELS[input.gasType],
  };
}

// ── Installation cost estimate ──────────────────────────────────────────────

export interface InstallationEstimateInput {
  units: number;
  hp: HpSize;
  unitType: UnitType;
  /** Extra copper pipe length in feet BEYOND the free 7 ft. */
  extraCopperFeet: number;
  /** Extra electrical wire length in feet BEYOND the free 7 ft. */
  extraWireFeet: number;
  /** Extra insulation length in feet BEYOND the free 7 ft. */
  extraInsulationFeet: number;
  /** Extra drain pipe length in feet BEYOND the free 7 ft. */
  extraDrainFeet: number;
  /** Small PVC casing (electrical wire) length in feet. */
  smallPvcFeet: number;
  /** Large PVC casing (copper pipe + wire + insulation) length in feet. */
  largePvcFeet: number;
  needsOutdoorBracket: boolean;
  heavyDutyBracket: boolean;
  needsIndoorBracket: boolean;
  needsSwitch: boolean;
  needsWaterPump: boolean;
}

export interface InstallationLineItem {
  label: string;
  detail: string;
  amount: number;
  note?: string;
}

export interface InstallationEstimateResult {
  labourPerUnit: number;
  labourTotal: number;
  lineItems: InstallationLineItem[];
  materialsTotal: number;
  addOnsTotal: number;
  subtotal: number;
  discount: BundleDiscount;
  discountAmount: number;
  grandTotal: number;
  perUnitTotal: number;
  includesFreeRun: boolean;
}

/**
 * Full installation estimate. Labour comes from the published installation
 * table; every material line comes from published pricing (or a declared
 * estimate constant — see DRAIN_PIPE_RATE / waterPumpRange).
 */
export function calculateInstallationEstimate(input: InstallationEstimateInput): InstallationEstimateResult {
  const u = Math.max(1, Math.min(30, input.units));
  const labourPerUnit = installationLabour(input.hp, input.unitType);
  const labourTotal = labourPerUnit * u;

  const copperRate = copperPipeRate(input.hp);
  const wireRate = electricalWireRate(input.hp);
  const pump = waterPumpRange();

  const lineItems: InstallationLineItem[] = [];

  // Labour
  const unitLabel =
    input.unitType === "wall" ? "Wall-Mounted" : input.unitType === "cassette" ? "Ceiling Cassette" : "Window Unit";
  lineItems.push({
    label: `Installation Labour — ${unitLabel} ${input.hp} HP`,
    detail: `${u} unit${u > 1 ? "s" : ""} × ${formatRM(labourPerUnit)}`,
    amount: labourTotal,
  });

  // Copper pipe beyond free 7 ft
  if (input.extraCopperFeet > 0) {
    const amt = Math.round(input.extraCopperFeet * copperRate * u);
    lineItems.push({
      label: "Copper Pipe (extra)",
      detail: `${input.extraCopperFeet} ft × ${formatRM(copperRate)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
      note: "First 7 ft free with installation",
    });
  }

  // Electrical wire beyond free 7 ft
  if (input.extraWireFeet > 0) {
    const amt = Math.round(input.extraWireFeet * wireRate * u);
    lineItems.push({
      label: "Electrical Wire (extra)",
      detail: `${input.extraWireFeet} ft × ${formatRM(wireRate)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
      note: "First 7 ft free with installation",
    });
  }

  // Insulation beyond free 7 ft
  if (input.extraInsulationFeet > 0) {
    const amt = Math.round(input.extraInsulationFeet * INSULATION_RATE * u);
    lineItems.push({
      label: "Insulation (extra)",
      detail: `${input.extraInsulationFeet} ft × ${formatRM(INSULATION_RATE)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
      note: "First 7 ft free with installation",
    });
  }

  // Drain pipe beyond free 7 ft
  if (input.extraDrainFeet > 0) {
    const amt = Math.round(input.extraDrainFeet * DRAIN_PIPE_RATE * u);
    lineItems.push({
      label: "Drain Pipe (extra)",
      detail: `${input.extraDrainFeet} ft × ${formatRM(DRAIN_PIPE_RATE)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
      note: "Estimate rate — confirmed on-site",
    });
  }

  // Separate PVC casing options
  if (input.smallPvcFeet > 0) {
    const amt = Math.round(input.smallPvcFeet * SMALL_PVC_CASING_RATE * u);
    lineItems.push({
      label: "Small PVC Casing (Electrical Wire)",
      detail: `${input.smallPvcFeet} ft × ${formatRM(SMALL_PVC_CASING_RATE)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
    });
  }
  if (input.largePvcFeet > 0) {
    const amt = Math.round(input.largePvcFeet * LARGE_PVC_CASING_RATE * u);
    lineItems.push({
      label: "Large PVC Casing (Copper Pipe + Wire + Insulation)",
      detail: `${input.largePvcFeet} ft × ${formatRM(LARGE_PVC_CASING_RATE)}/ft × ${u} unit${u > 1 ? "s" : ""}`,
      amount: amt,
    });
  }

  // Outdoor bracket
  if (input.needsOutdoorBracket) {
    const price = outdoorBracketPrice(input.heavyDutyBracket);
    const amt = price * u;
    lineItems.push({
      label: input.heavyDutyBracket ? "Heavy Duty Outdoor Bracket" : "Standard Outdoor Bracket",
      detail: `${u} × ${formatRM(price)}`,
      amount: amt,
    });
  }

  // Indoor bracket
  if (input.needsIndoorBracket) {
    const price = indoorBracketPrice();
    lineItems.push({
      label: "Indoor Unit Bracket",
      detail: `${u} × ${formatRM(price)}`,
      amount: price * u,
    });
  }

  // Switch / plug point
  if (input.needsSwitch) {
    const price = switchPrice();
    lineItems.push({
      label: "Aircond Switch / Plug Point",
      detail: `${u} × ${formatRM(price)}`,
      amount: price * u,
    });
  }

  // Water pump
  if (input.needsWaterPump) {
    const amt = u * pump.min;
    lineItems.push({
      label: "Condensate Water Pump (supply + install)",
      detail: `${u} × ${formatRM(pump.min)} (RM ${pump.min.toLocaleString()}–${pump.max.toLocaleString()} published range)`,
      amount: amt,
      note: "Estimated at the low end of the published range — confirmed on-site",
    });
  }

  const materialsTotal = lineItems.slice(1).reduce((s, i) => s + i.amount, 0);
  const addOnsTotal = materialsTotal;
  const subtotal = labourTotal + addOnsTotal;
  const discount = getBundleDiscount(u);
  const discountAmount = Math.round((subtotal * discount.pct) / 100);
  const grandTotal = subtotal - discountAmount;

  return {
    labourPerUnit,
    labourTotal,
    lineItems,
    materialsTotal,
    addOnsTotal,
    subtotal,
    discount,
    discountAmount,
    grandTotal,
    perUnitTotal: Math.round(grandTotal / u),
    includesFreeRun: true,
  };
}

// ── Electricity cost ─────────────────────────────────────────────────────────

/**
 * Typical running power draw per HP (non-inverter, wall-mounted).
 * Engineering estimates — actual draw depends on the model, age and
 * ambient temperature. Used by the electricity calculator.
 */
export const HP_WATTAGE: Record<HpSize, number> = {
  "1.0": 900,
  "1.5": 1200,
  "2.0": 1700,
  "2.5": 2100,
  "3.0": 2500,
  "3.5": 2800,
  "4.0": 3200,
  "5.0": 3800,
};

/** Default TNB domestic blended rate (sen/kWh → RM/kWh). Editable in the UI. */
export const DEFAULT_ELECTRICITY_RATE = 0.509; // RM per kWh (TNB domestic average)

export function calculateElectricityCost(hp: HpSize, hoursPerDay: number, daysPerMonth: number, ratePerKwh: number): number {
  const kw = HP_WATTAGE[hp] ?? 1200;
  const kwh = (kw * Math.max(0, hoursPerDay) * Math.max(0, daysPerMonth)) / 1000;
  return kwh * ratePerKwh;
}

// ── Inverter savings ─────────────────────────────────────────────────────────

/**
 * Inverter airconds typically use ~30–40% less electricity than equivalent
 * non-inverter units in Malaysian conditions. 35% is the commonly cited
 * midpoint. Used for estimates only.
 */
export const INVERTER_SAVINGS_PCT = 0.35;

/** Typical price premium of an inverter over a non-inverter unit (editable). */
export function defaultInverterPremium(hp: HpSize): number {
  const h = hpNumeric(hp);
  if (h <= 1.0) return 500;
  if (h <= 1.5) return 650;
  if (h <= 2.0) return 800;
  if (h <= 2.5) return 950;
  return 1200;
}

export interface SavingsResult {
  oldMonthlyKwh: number;
  newMonthlyKwh: number;
  monthlySavingsKwh: number;
  monthlySavingsRm: number;
  yearlySavingsRm: number;
  paybackMonths: number;
  paybackYears: string;
  savingsPct: number;
}

export function calculateInverterSavings(
  hp: HpSize,
  hoursPerDay: number,
  daysPerMonth: number,
  ratePerKwh: number,
  inverterPremium: number,
): SavingsResult {
  const kw = HP_WATTAGE[hp] ?? 1200;
  const oldKwh = (kw * Math.max(0, hoursPerDay) * Math.max(0, daysPerMonth)) / 1000;
  const newKwh = oldKwh * (1 - INVERTER_SAVINGS_PCT);
  const monthlyRm = (oldKwh - newKwh) * ratePerKwh;
  const yearly = monthlyRm * 12;
  const paybackMonths = inverterPremium > 0 && monthlyRm > 0 ? inverterPremium / monthlyRm : Infinity;
  return {
    oldMonthlyKwh: oldKwh,
    newMonthlyKwh: newKwh,
    monthlySavingsKwh: oldKwh - newKwh,
    monthlySavingsRm: monthlyRm,
    yearlySavingsRm: yearly,
    paybackMonths,
    paybackYears: Number.isFinite(paybackMonths) ? (paybackMonths / 12).toFixed(1) : "—",
    savingsPct: Math.round(INVERTER_SAVINGS_PCT * 100),
  };
}

// ── Aircond size calculator (room-based HP) ─────────────────────────────────

export interface SizeEstimateInput {
  areaSqft: number;
  roomType: string;
  usage: "standard" | "heavy" | "light";
  heatExposure: "low" | "medium" | "high";
}

export interface SizeEstimateResult {
  btu: number;
  recommendation: HpRecommendation;
  capacityLabel: string;
}

export function estimateSizeFromArea(input: SizeEstimateInput): SizeEstimateResult {
  const roomM = ROOM_TYPE_MULTIPLIERS[input.roomType] ?? 1.0;
  const usageM = input.usage === "heavy" ? 1.15 : input.usage === "light" ? 0.9 : 1.0;
  const heatM = SUN_MULTIPLIERS[input.heatExposure] ?? 1.1;
  const btu = Math.round(input.areaSqft * 25 * roomM * usageM * heatM);
  const recommendation = recommendHpFromBtu(btu);
  return {
    btu,
    recommendation,
    capacityLabel: recommendation.label,
  };
}
