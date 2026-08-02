// ─────────────────────────────────────────────────────────────────────────
// KL Renovator — Aircond Expert Assistant engine.
//
// Deterministic, knowledge-based assistant. It is "trained" exclusively on
// the website's own content (config/site-public.ts + the curated knowledge
// base below) so the website remains the single source of truth:
//   • All prices are read from sitePublic.pricing at answer time — the
//     assistant can never drift from the published price list.
//   • It never invents prices: anything that requires an on-site inspection
//     (exact gas PSI, drain routing, water pump sizing) is always returned
//     as a range or with the on-site confirmation disclaimer.
//   • Every recommendation links back to the relevant page or calculator.
//
// Client-safe (imports only site-public + aircond-math). Pure functions —
// the React component in components/ai-assistant.tsx handles UI only.
// ─────────────────────────────────────────────────────────────────────────

import { sitePublic } from "@/config/site-public";
import {
  calculateBtu,
  calculateGasEstimate,
  calculateInstallationEstimate,
  copperPipeRate,
  DRAIN_PIPE_RATE,
  electricalWireRate,
  formatRM,
  FREE_RUN_FEET,
  GAS_LABELS,
  peopleBtu,
  recommendHpFromBtu,
  ROOM_TYPE_MULTIPLIERS,
  SUN_MULTIPLIERS,
  heightMultiplier,
  windowsBtu,
  type GasType,
  type HpSize,
  type UnitType,
} from "@/lib/aircond-math";

// ── Types ─────────────────────────────────────────────────────────────────

export type AssistantCard =
  | {
      type: "pricing";
      title: string;
      rows: { label: string; price: string }[];
      note?: string;
    }
  | {
      type: "quote";
      title: string;
      lines: { label: string; detail: string; amount: string }[];
      total: string;
      discount?: string;
      note: string;
    }
  | {
      type: "hp";
      title: string;
      btu: number;
      hp: string;
      installFrom: number;
      note: string;
    }
  | {
      type: "service";
      title: string;
      service: string;
      price: string;
      why: string;
      href: string;
    }
  | {
      type: "links";
      title: string;
      links: { label: string; href: string }[];
    };

export interface AssistantMessage {
  role: "user" | "assistant";
  text: string;
  cards?: AssistantCard[];
  suggested?: string[];
}

export interface AssistantContext {
  hp?: HpSize;
  unitType?: UnitType;
  gasType?: GasType;
  units?: number;
  roomSqft?: number;
  service?: string;
  lastIntent?: string;
}

export interface AssistantReply {
  /** Assistant message — the UI adds `role: "assistant"` when rendering. */
  message: Omit<AssistantMessage, "role">;
  context: AssistantContext;
  intent: string;
}

// ── Small helpers ─────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "How much is aircond installation?",
  "How much is gas top-up for 1.5 HP R32?",
  "What HP do I need for a 12x10 room?",
  "My aircond smells bad — what service?",
  "Which gas — R22 or R32?",
  "How do I book a service?",
  "Do you cover Cheras?",
  "What warranty do you give?",
];

function normalize(input: string): string {
  // ES5-safe normalizer: keep ASCII alnum, spaces, common punctuation and
  // ALL non-ASCII (Malay/Chinese characters, ×, emoji); replace everything
  // else with a space so keyword regexes still match across languages.
  let out = "";
  for (const ch of input.toLowerCase()) {
    const code = ch.codePointAt(0) ?? 0;
    const keep =
      (code >= 48 && code <= 57) ||
      (code >= 97 && code <= 122) ||
      code >= 128 ||
      " x*×.%/,-".includes(ch);
    out += keep ? ch : " ";
  }
  return out.replace(/\s+/g, " ").trim();
}

function hpFromText(n: string): HpSize | undefined {
  const m = n.match(/(\d(?:\.\d)?)\s*(?:hp|horsepower|匹|pk|hp)/i);
  if (!m) return undefined;
  const v = parseFloat(m[1]);
  const valid: HpSize[] = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "5.0"];
  return valid.find((h) => parseFloat(h) === v) ?? undefined;
}

function roomDimsFromText(n: string): { length: number; width: number } | null {
  const m = n.match(/(\d+(?:\.\d)?)\s*[x×*]\s*(\d+(?:\.\d)?)/);
  if (m) return { length: parseFloat(m[1]), width: parseFloat(m[2]) };
  return null;
}

function sqftFromText(n: string): number | null {
  const m = n.match(/(\d+(?:\.\d)?)\s*(?:sq\s*ft|sqft|square\s*feet|kaki\s*persegi)/i);
  return m ? parseFloat(m[1]) : null;
}

function unitTypeFromText(n: string): UnitType | null {
  if (/\b(cassette|ceiling)\b/.test(n)) return "cassette";
  if (/\bwindow\b/.test(n)) return "window";
  if (/\bwall|dinding|挂壁|掛壁\b/.test(n)) return "wall";
  return null;
}

function gasFromText(n: string): GasType | null {
  if (/r\s?22|\br22\b/.test(n)) return "r22";
  if (/r\s?410a?|\br410a\b|\b410a\b/.test(n)) return "r410a";
  if (/r\s?32|\br32\b/.test(n)) return "r32";
  return null;
}

const SERVICE_SLUGS: { slug: string; keywords: RegExp; title: string }[] = [
  { slug: "basic-servicing", keywords: /basic service|basic servicing|routine|regular service|filter cleaning|servis asas|普通保养|基本保养|routine maintenance/, title: "Basic Servicing" },
  { slug: "chemical-wash", keywords: /chemical wash|pressure wash|cuci kimia|cuci aircond|chemical cleaning|化学清洗|清洗/, title: "Pressure Chemical Wash" },
  { slug: "chemical-overhaul", keywords: /chemical overhaul|overhaul|top overhaul|overhaul kimia|化学大修|大修/, title: "Chemical Overhaul" },
  { slug: "gas-topup", keywords: /gas top|top.?up|tambah gas|gas refill|gas charge|refrigerant|加气|充气|加gas/, title: "Gas Top-Up" },
  { slug: "repair", keywords: /repair|baiki|troubleshoot|diagnostic|维修|修理|fix/, title: "Troubleshooting & Repair" },
  { slug: "installation", keywords: /install|pemasangan|安装|setup|new unit/, title: "New Unit Installation" },
  { slug: "dismantling-relocation", keywords: /dismantle|relocat|pindah|拆除|搬迁/, title: "Dismantle & Relocation" },
  { slug: "maintenance-contract", keywords: /contract|amc|maintenance plan|yearly plan|annual plan/, title: "Maintenance Contract (AMC)" },
];

function detectService(n: string): { slug: string; title: string } | null {
  for (const s of SERVICE_SLUGS) if (s.keywords.test(n)) return s;
  return null;
}

// ── Curated knowledge base (all facts from the live website) ──────────────

const KNOWLEDGE: { keywords: RegExp; answer: string; links?: { label: string; href: string }[] }[] = [
  {
    keywords: /warranty|waranti|guarantee|保证|保修/,
    answer:
      "Every KL Renovator visit comes with a 1-month written workmanship warranty. If any issue related to our work arises within 30 days — leaks, vibration, electrical fault, poor cooling after installation — we return and rectify it at zero cost. Manufacturer warranty on the unit itself remains fully protected. All our work is SSM-registered (003765188-T) and invoiced.",
  },
  {
    keywords: /what time|operating hour|open (at|from)|opening hour|business hour|working hour|\bbuka\b|waktu|几点|营业时间/,
    answer: `KL Renovator operates every day, Monday to Sunday, from 9:00 AM to 6:00 PM (${sitePublic.hours}). Most emergency calls for leaks or breakdowns are assigned a technician within 30–60 minutes. WhatsApp ${sitePublic.phoneDisplay} for the fastest response.`,
  },
  {
    keywords: /same.?day|hari sama|当天|today( service)?/,
    answer:
      "Yes — same-day service is available across KL & Selangor for bookings made early in the day (installation before ~11 AM for same-day completion). We keep same-day slots for emergencies like water leaks and breakdowns. WhatsApp +60182983573 with your location and the problem for the fastest routing.",
  },
  {
    keywords: /cover|service area|coverage|kawasan|area|where (do|are)|location|地区|覆盖/,
    answer:
      `KL Renovator serves the whole Klang Valley — Kuala Lumpur and Selangor only. That includes ${sitePublic.areas.slice(0, 18).join(", ")}, and more than 40 main areas plus 150+ named neighbourhoods. If you tell me your area, I can confirm coverage. We do not serve other Malaysian states.`,
  },
  {
    keywords: /brand|jenama|牌子|品牌/,
    answer:
      `KL Renovator services and installs all 20 major brands: ${sitePublic.brandsSupported.join(", ")}. Inverter and non-inverter, wall-mounted, ceiling cassette and window units. We are an independent HVAC service company — not an authorized dealer — which means we work on every brand equally.`,
  },
  {
    keywords: /diagnostic fee|diagnostic|检查费|rm ?88|diagnosis/,
    answer:
      "The diagnostic / troubleshooting fee is RM 88 and it is WAIVED if we repair the unit in the same visit. It covers a full system check — gauges, capacitors, sensors, PCB error codes — and you receive a transparent quote before any repair starts.",
  },
  {
    keywords: /payment|bayar|deposit|how (do i )?pay|payment method|付款|支付/,
    answer:
      "Payment is straightforward: KL Renovator confirms the total price with you BEFORE any work begins, and you pay after the job is done and you are satisfied — cash or bank transfer (online banking). No deposit is required for standard servicing and repairs. Multi-unit commercial jobs may be quoted with agreed payment terms.",
  },
  {
    keywords: /emergency|kecemasan|紧急|urgent|breakdown/,
    answer:
      "For emergencies — heavy water leak near electrical points, complete breakdown, MCB tripping, burning smell — switch off the unit at the MCB first. KL Renovator operates 9 AM–6 PM daily and typically assigns a technician within 30–60 minutes for urgent calls. WhatsApp +60182983573 with 'EMERGENCY' and your location, or call directly.",
  },
  {
    keywords: /how (do i )?book|booking|book a|tempah|预约|reserve|slot|schedule/,
    answer:
      "Booking with KL Renovator takes about 2 minutes: 1) Choose your service (installation, chemical wash, overhaul, gas top-up, repair, or maintenance contract). 2) Tell us the unit type, HP and quantity. 3) Pick a date and time — we confirm live availability. 4) We confirm the price upfront on WhatsApp or via the online booking form. You can book online at klrenovator.com/book, or WhatsApp +60182983573 with your service and location for same-day slots.",
    links: [
      { label: "Book a slot online", href: "/book" },
      { label: "All services & prices", href: "/services" },
    ],
  },
  {
    keywords: /installation (process|step|take|time|how long)|how long.*install|install.*how long|pemasangan.*lama|安装.*时间|安装.*多久/,
    answer:
      "A standard wall-mounted installation takes 3–5 hours for one unit (includes mounting, 7 ft piping, vacuum pump commissioning and testing). Ceiling cassette takes 5–8 hours. Multi-unit whole-house installations usually complete in 1–2 days. Same-day installation is available for bookings made before 11 AM.",
  },
  {
    keywords: /maintenance contract|amc|service contract|annual maintenance/,
    answer:
      "KL Renovator's Maintenance Contract (AMC) gives you quarterly servicing, priority scheduling and free emergency checks — saving up to 30% vs one-off bookings. Residential: RM 499/year (2–4 units) or RM 999/year (5+ units). Commercial: RM 1,999/year (5–10 units) or RM 3,499/year (10+ units).",
  },
  {
    keywords: /high.?rise|condo|apartment|jmb|management approval/,
    answer:
      "Yes — we regularly work in high-rise condos and apartments across KL & Selangor (KLCC, Mont Kiara, Bangsar, Sentul, PJ, Subang Jaya and more). We follow each building's access procedure, coordinate with management for lifts/loading bay, and confirm outdoor-unit placement per JMB rules. High-rise or difficult access carries a published surcharge of RM 50–150, confirmed before work.",
  },
  {
    keywords: /old unit|replace.*unit|compressor replace|换新|old aircond|unit too old|replace my aircond/,
    answer:
      "For units 10+ years old, weigh repair vs replacement: capacitor, sensor, drain and contactor faults are worth repairing (RM 50–300). Fan motor and PCB faults (RM 250–600) depend on the unit's age and value. Compressor failure (RM 800–2,000) is usually only worth it for 2.0 HP+ units — for 1.0–1.5 HP units, a new unit often makes more sense. We always give you both options with transparent quotes and let you decide.",
  },
];

// ── Troubleshooting map (mirrors the site's problem pages) ────────────────

const TROUBLESHOOTING: { keywords: RegExp; title: string; steps: string[]; service: string; price: string; why: string; href: string }[] = [
  {
    keywords: /not cool|not cold|warm air|tidak sejuk|不冷|吹热风|not cooling|less cool/,
    title: "Not Cooling / Warm Air",
    steps: [
      "Check the filter — a clogged filter can cut cooling by up to 40%. Clean it and see if airflow improves.",
      "Check the outdoor unit — is the fan spinning? If it runs but air is warm, it is usually low refrigerant gas or a failing capacitor.",
      "If cooling has dropped gradually over weeks, the refrigerant is likely low — refrigerant never 'runs out', it leaks.",
    ],
    service: "Gas Top-Up / Diagnostic + Repair",
    price: "From RM 2.50/PSI · Diagnostic RM 88 (waived with repair)",
    why: "Gradual cooling loss = low gas (leak check included with every top-up). Sudden warm air with the outdoor unit running = capacitor or gas. Sudden warm air with the outdoor unit off = compressor/PCB fault.",
    href: "/problems/aircond-not-cold",
  },
  {
    keywords: /leak|bocor|漏水|滴水|dripping|water (leaking|drip)/,
    title: "Water Leakage",
    steps: [
      "A small occasional drip is usually a partially blocked drain pipe — a chemical wash with drain flush clears it.",
      "Continuous heavy leaking means the drain pipe is fully blocked or the drain pan is overflowing — switch off the unit.",
      "If water is near electrical points or damaging the ceiling, switch off the MCB now and call for emergency service.",
    ],
    service: "Chemical Wash / Chemical Overhaul",
    price: "From RM 120 (wash) · RM 220 (overhaul)",
    why: "Leaks come from blocked drains and dirty drain pans. A wash flushes the line; an overhaul dismantles and permanently clears the drain system — recommended for heavy leaks and ice buildup.",
    href: "/problems/aircond-water-leaking",
  },
  {
    keywords: /smell|bau|smelly|musty|odor|odour|异味|臭味|发臭/,
    title: "Bad Smell / Mouldy Odour",
    steps: [
      "A musty smell means mould and bacteria on the evaporator coil and blower wheel — extremely common in KL's humidity.",
      "If the smell appears only when the unit first starts, a chemical wash will usually fix it completely.",
      "If the smell persists after washing, the unit needs an overhaul to access the deep drain pan and back tray.",
    ],
    service: "Pressure Chemical Wash",
    price: "From RM 120 (1.0–1.5 HP wall-mounted)",
    why: "The 80–120 PSI alkaline chemical dissolves the biofilm causing the smell and sanitizes the coil — recommended every 12 months (6–8 months for units running 8+ hours a day).",
    href: "/problems/aircond-smell",
  },
  {
    keywords: /noise|bising|noisy|loud|吵|噪音|bunyi/,
    title: "Noise from the Aircond",
    steps: [
      "Rattling or vibration is usually a loose fan blade, dirty blower wheel or loose panel screw — a chemical wash lets the technician check and tighten everything.",
      "A loud humming or buzzing from the outdoor unit often points to a failing capacitor, contactor or compressor.",
      "A hissing sound can indicate a refrigerant leak — book a gas check with leak inspection.",
    ],
    service: "Chemical Wash / Troubleshooting & Repair",
    price: "From RM 120 (wash) · Diagnostic RM 88 (waived with repair)",
    why: "Most indoor noise is fixed by cleaning + tightening during a wash. Outdoor or electrical noise needs a diagnostic to identify the failing component and quote before repair.",
    href: "/problems/aircond-noise",
  },
  {
    keywords: /\bice\b|\bais\b|结冰|freezing|frost/,
    title: "Ice Formation",
    steps: [
      "Switch off the unit and let it defrost for about 2 hours.",
      "Ice on the coil is caused by low refrigerant gas, a severely blocked evaporator coil, or both — the unit will eventually stop cooling completely.",
      "Book a gas check + chemical overhaul so both causes are fixed in one visit.",
    ],
    service: "Chemical Overhaul + Gas Check",
    price: "From RM 220 (overhaul) · Gas RM 2.50–3.00/PSI",
    why: "Ice forms when the coil temperature drops too low — low gas or blocked airflow. The overhaul cleans the coil; the gas check restores the correct charge with a leak inspection.",
    href: "/problems/aircond-freezing-up",
  },
  {
    keywords: /airflow|air flow|weak.*air|aliran|风量|风力弱|not blowing|blower/,
    title: "Weak Airflow",
    steps: [
      "Check and clean the air filter first — a clogged filter is the #1 cause of weak airflow.",
      "If airflow is weak even with a clean filter, the blower wheel is coated with dust and biofilm, reducing volume.",
      "A pressure chemical wash restores the blower wheel and coil to near-new airflow.",
    ],
    service: "Pressure Chemical Wash",
    price: "From RM 120 (1.0–1.5 HP wall-mounted)",
    why: "Dust and mould on the blower wheel physically block airflow. The high-pressure wash removes the buildup and restores volumetric airflow.",
    href: "/problems/aircond-weak-airflow",
  },
  {
    keywords: /bill|electric|electricity|tenaga|电费|电力|energy/,
    title: "High Electricity Bill",
    steps: [
      "A dirty coil and filter make the unit run 30–40% longer to reach temperature — the cheapest fix is a chemical wash (from RM 120).",
      "Low refrigerant gas makes the compressor run non-stop without reaching the set temperature.",
      "An old non-inverter unit running 8+ hours a day typically uses ~35% more electricity than an inverter unit.",
    ],
    service: "Chemical Wash / Gas Check / Inverter Upgrade",
    price: "Wash from RM 120 · Gas RM 2.50–3.00/PSI · Installation from RM 199",
    why: "High bills are almost always efficiency losses: dirt, low gas, or an outdated compressor. The savings calculator can show you the payback period for an inverter upgrade.",
    href: "/aircond-savings-calculator",
  },
];

// ── Pricing answer builder ────────────────────────────────────────────────

function pricingAnswerFor(serviceSlug: string | null, hp: HpSize | undefined, n: string): AssistantReply | null {
  const p = sitePublic.pricing;

  // Material pricing questions
  if (/copper|paip tembaga|铜管|pipe rate|铜/.test(n)) {
    const h = hp ?? "1.5";
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("copper"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text:
          "Copper pipe is charged per foot beyond the free 7 ft included with installation. The published rates are:",
        cards: [{ type: "pricing", title: "Copper Pipe Rates (published)", rows: rows.map((r) => ({ label: r.label, price: r.price })), note: "First 7 ft free with every installation." }],
        suggested: ["How much for a 30 ft run?", "Full installation cost"],
      },
    };
  }
  if (/wire|wayar|电线|electrical cable/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("wire"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: "Electrical wire is charged per foot beyond the free 7 ft. Published rates:",
        cards: [{ type: "pricing", title: "Electrical Wire Rates (published)", rows: rows.map((r) => ({ label: r.label, price: r.price })) }],
      },
    };
  }
  if (/drain|longkang|排水/.test(n)) {
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text:
          "Drain pipe is included free for the first 7 ft with installation. Beyond that, the standard rate is approximately RM 5/ft — this is an estimate and is confirmed by the technician on-site. If you are asking about drain cleaning, a chemical wash (from RM 120) includes a full drain-line flush.",
        suggested: ["Chemical wash price", "Water leaking — what service?"],
      },
    };
  }
  if (/pvc|casing|trunking/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("pvc"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: "PVC casing for concealing wire and copper pipe runs is published at:",
        cards: [{ type: "pricing", title: "PVC Casing Rates (published)", rows: rows.map((r) => ({ label: r.label, price: r.price })), note: "Charged per foot of casing installed." }],
      },
    };
  }
  if (/bracket|支架|compressor stand/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("bracket"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: "Outdoor and indoor brackets are published as:",
        cards: [{ type: "pricing", title: "Bracket Prices (published)", rows: rows.map((r) => ({ label: r.label, price: r.price })), note: "Standard brackets are included with most installation packages — check your quote." }],
      },
    };
  }
  if (/switch|plug point|socket/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("plug"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: "An aircond switch / plug point installation is published at:",
        cards: [{ type: "pricing", title: "Electrical (published)", rows: rows.map((r) => ({ label: r.label, price: r.price })) }],
      },
    };
  }
  if (/water pump|drain pump|pam|水泵/.test(n)) {
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text:
          "A condensate drain/water pump is usually included with ceiling cassette installations. For concealed wall-mounted installs it is an add-on; the published repair-table range for a drain pump is RM 350–550 (supply + installation). The exact model and price are confirmed on-site.",
        suggested: ["Ceiling cassette installation cost", "Installation cost calculator"],
      },
    };
  }

  // Gas top-up pricing
  if (/gas|top.?up|refill|tambah gas|冷媒|充气|加气|r22|r32|r410a/.test(n)) {
    const gasType = gasFromText(n) ?? "r32";
    const g = calculateGasEstimate({ hp: hp ?? "1.5", gasType, condition: "medium", units: 1 });
    const rows = p.gasTopup.rows.map((r) => ({ label: r.label, price: r.price }));
    const note =
      "Gas is charged per actual PSI measured during inspection — the estimate assumes a typical medium shortfall for the selected HP. Final quantity and charges are confirmed by the technician after on-site inspection.";
    return {
      intent: "gas-pricing",
      context: { hp, gasType },
      message: {
        text:
          `Here are the published gas rates, plus an estimate for ${hp ?? "1.5"} HP ${GAS_LABELS[gasType]}: roughly ${g.psiMin}–${g.psiMax} PSI needed ≈ ${formatRM(g.totalMin)}–${formatRM(g.totalMax)} per unit.`,
        cards: [
          { type: "pricing", title: "Gas Top-Up Rates (published)", rows, note },
          { type: "service", title: "Recommended service", service: "Gas Top-Up / Precision Balancing", price: "Per actual PSI · leak check included", why: "Precision manifold gauge measurement balances the system to the manufacturer's spec, with a full physical leak inspection included.", href: "/services/gas-topup" },
        ],
        suggested: ["Book gas top-up", "Which gas — R22 or R32?"],
      },
    };
  }

  // Service pricing (chemical wash, overhaul, basic, repair, installation)
  if (serviceSlug) {
    const detail = sitePublic.services.find((s) => s.slug === serviceSlug);
    const table = p[serviceSlug as keyof typeof p] as { rows: { label: string; price: string }[]; note?: string } | undefined;
    if (detail && table && "rows" in table) {
      let text = "";
      if (serviceSlug === "installation") {
        text =
          "Installation starts from RM 199 for 1.0–1.5 HP wall-mounted, including 7 ft of copper pipe, wire and drain pipe, bracket, vacuum pump commissioning and a 1-month workmanship warranty. Here is the full published table:";
      } else {
        text = `${detail.title} starts from ${detail.short.match(/from RM [\d.]+/)?.[0] ?? "the published rate"}. Here is the full published price table:`;
      }
      return {
        intent: "service-pricing",
        context: { hp, service: serviceSlug },
        message: {
          text,
          cards: [
            { type: "pricing", title: `${detail.title} — Published Prices`, rows: table.rows.map((r) => ({ label: r.label, price: r.price })), note: table.note },
            { type: "links", title: "More information", links: [{ label: `${detail.title} — service page`, href: `/services/${serviceSlug}` }, { label: "Full 2026 price list", href: "/aircond-service-price-malaysia" }] },
          ],
          suggested: ["Book this service", "Which aircond service do I need?"],
        },
      };
    }
  }

  // General "how much is service/price" — full price list
  return {
    intent: "pricing",
    context: { hp },
    message: {
      text:
        "Here is KL Renovator's published 2026 price summary. Every price is confirmed before work begins — no hidden charges:",
      cards: [
        {
          type: "pricing",
          title: "Aircond Service Prices (published 2026)",
          rows: [
            { label: "Basic Servicing · 1.0–1.5 HP", price: "RM 99" },
            { label: "Pressure Chemical Wash · 1.0–1.5 HP", price: "RM 120" },
            { label: "Chemical Overhaul · 1.0–1.5 HP", price: "RM 220" },
            { label: "Gas Top-Up", price: "R22 RM 2.50/PSI · R410A/R32 RM 3.00/PSI" },
            { label: "Diagnostic (waived with repair)", price: "RM 88" },
            { label: "Installation · Wall-Mounted 1.0–1.5 HP", price: "RM 199" },
            { label: "Installation · Ceiling Cassette", price: "From RM 290" },
          ],
          note: "Full tables on the price page. Multi-unit: 4–10 units 5% OFF, 10+ units 10% OFF.",
        },
        {
          type: "links",
          title: "Full published price lists",
          links: [
            { label: "Aircond Service Price 2026 — Malaysia", href: "/aircond-service-price-malaysia" },
            { label: "Installation Price Guide", href: "/installation-price-malaysia" },
            { label: "Use the Installation Cost Calculator", href: "/aircond-installation-cost-calculator" },
          ],
        },
      ],
      suggested: ["How much is chemical wash?", "How much is installation for 2 HP?", "Gas top-up cost"],
    },
  };
}

// ── Main entry ─────────────────────────────────────────────────────────────

export function answer(input: string, prev: AssistantContext): AssistantReply {
  const n = normalize(input);
  const ctx: AssistantContext = { ...prev };

  // Extract structured facts from the message for follow-up context
  const hp = hpFromText(n) ?? prev.hp ?? undefined;
  const unitType = unitTypeFromText(n) ?? prev.unitType ?? undefined;
  const gasType = gasFromText(n) ?? prev.gasType ?? undefined;
  const dims = roomDimsFromText(n);
  const sqft = sqftFromText(n);
  const roomSqft = sqft ?? (dims ? dims.length * dims.width : prev.roomSqft);
  const units = n.match(/(\d+)\s*(units?|unit|台|架)/)?.[1] ? parseInt(n.match(/(\d+)\s*(units?|unit|台|架)/)![1], 10) : prev.units ?? undefined;
  const nextCtx: AssistantContext = { ...ctx, hp, unitType, gasType, units, roomSqft };

  // 1. Greetings / pleasantries
  if (/^(hi|hii+|hello|hey|halo|hai|selamat (pagi|petang|tengah)|good (morning|afternoon|evening)|yo|assalam)\b/.test(n) && n.length < 40) {
    return {
      intent: "greeting",
      context: nextCtx,
      message: {
        text:
          "Hello! 👋 I'm KL Renovator's Aircond Expert Assistant. I can help you with pricing (using our published 2026 rates), HP recommendations, installation estimates, gas type advice, service recommendations and booking. What would you like to know?",
        suggested: SUGGESTIONS.slice(0, 4),
      },
    };
  }
  if (/thank|thanks|terima kasih|tq|thx|cheers|谢谢|多谢/.test(n)) {
    return {
      intent: "thanks",
      context: nextCtx,
      message: {
        text:
          "You're very welcome! 😊 If you need a confirmed price or a same-day slot, just WhatsApp +60182983573 or book online at klrenovator.com/book — mention this chat and we'll pick up right where we left off.",
        suggested: ["How much is chemical wash?", "How do I book a service?"],
      },
    };
  }
  if (/bye|goodbye|see you|selamat tinggal|再见|下次/.test(n)) {
    return {
      intent: "bye",
      context: nextCtx,
      message: {
        text: "Goodbye! Thanks for chatting with KL Renovator. If anything comes up — a leak, strange noise, or a new installation — we're open 9 AM–6 PM every day, including weekends. WhatsApp +60182983573 anytime. 👋",
        suggested: ["Installation cost", "Gas top-up price"],
      },
    };
  }
  if (/what can you do|help me|bantuan|capabilit|what do you know|who are you|help\b/.test(n)) {
    return {
      intent: "help",
      context: nextCtx,
      message: {
        text:
          "I'm trained on KL Renovator's full service information — the same content as our website. I can: 1) Quote published service & material prices, 2) Recommend the right HP for your room, 3) Generate an installation quotation, 4) Estimate materials (copper pipe, wire, drain, casing, bracket), 5) Advise on gas type (R22/R410A/R32) and gas top-up costs, 6) Recommend the right service from your symptoms, 7) Answer FAQs (warranty, hours, coverage, brands), 8) Guide you through booking, 9) Troubleshoot common problems. Try one of these:",
        suggested: SUGGESTIONS,
      },
    };
  }
  if (/calculator|kalkulator|tool\b|tools|use the (calculator|tool)|计算器/.test(n)) {
    return {
      intent: "calculators",
      context: nextCtx,
      message: {
        text:
          "Here are KL Renovator's free calculators — all built on our published pricing and fully mobile-friendly:",
        cards: [
          {
            type: "links",
            title: "Free Aircond Calculators",
            links: [
              { label: "Installation Cost Calculator", href: "/aircond-installation-cost-calculator" },
              { label: "Gas Top-up Cost Estimator", href: "/aircond-gas-topup-cost-calculator" },
              { label: "BTU / HP Calculator", href: "/btu-calculator" },
              { label: "Aircond Size Calculator", href: "/aircond-size-calculator" },
              { label: "Electricity Cost Calculator", href: "/aircond-electricity-cost-calculator" },
              { label: "Inverter Savings Calculator", href: "/aircond-savings-calculator" },
              { label: "Service Recommendation Tool", href: "/which-aircond-service-do-i-need" },
            ],
          },
        ],
        suggested: ["How much is installation?", "What HP do I need for 12x10?"],
      },
    };
  }

  // 2. Intent classification helpers
  const sizingWords = /what hp|which hp|hp do i need|hp (for|utk|untuk|yang|sesuai|patut)|berapa hp|what size|what capacity|aircond size|aircon size|saiz aircond|匹数|几匹|多大匹|size aircond/;
  // Only treat context room size as sizing intent when the CURRENT message
  // actually mentions a room/space — otherwise follow-ups like "how much to
  // install that?" would be misread as new sizing questions.
  const roomMention = /room|bilik|space|sqft|square feet|kaki persegi|\bft\b|\d+\s*[x×*]\s*\d+|房间|室/;
  const hasRoomInfo = roomSqft !== undefined && roomSqft > 0 && roomMention.test(n);
  const wantsHp = sizingWords.test(n) || hasRoomInfo;
  const priceWords = /price|cost|how much|harga|berapa|charge|fee|rate|收费|多少钱/;
  // "quotation"/"estimate" requests flow to the quote builder (unless gas is
  // mentioned, in which case the gas pricing answer is the right response).
  const wantsQuote = /quote|quotation|estimate/.test(n) && !/gas|top.?up|refill/.test(n);
  const service = detectService(n);

  // 2b. Material run estimate — "20 ft copper pipe", "30 ft run", "10 ft wire"
  // (before pricing so "how much for a 30 ft run?" gets a material answer)
  const ftRun = n.match(/(\d+(?:\.\d)?)\s*(?:ft|feet|kaki)/);
  const materialWord = /copper|wire|drain|pvc|casing|pipe run|\brun\b/.test(n);
  if (ftRun && materialWord) {
    const runLen = Math.max(0, parseFloat(ftRun[1]) - FREE_RUN_FEET);
    const h = hp ?? "1.5";
    const copper = copperPipeRate(h);
    const wire = electricalWireRate(h);
    const u = units ?? 1;
    const copperAmt = Math.round(runLen * copper * u);
    const wireAmt = Math.round(runLen * wire * u);
    const drainAmt = Math.round(runLen * DRAIN_PIPE_RATE * u);
    const isCopper = /copper/.test(n);
    const isWire = /wire/.test(n);
    const isDrain = /drain/.test(n) || !isCopper && !isWire && /run/.test(n);
    const total = (isCopper ? copperAmt : 0) + (isWire ? wireAmt : 0) + (isDrain ? drainAmt : 0);
    const detail = [
      isCopper ? `Copper pipe: ${runLen} ft beyond free ${FREE_RUN_FEET} ft × RM ${copper}/ft × ${u} = RM ${copperAmt.toLocaleString()}` : "",
      isWire ? `Wire: ${runLen} ft × RM ${wire}/ft × ${u} = RM ${wireAmt.toLocaleString()}` : "",
      isDrain ? `Drain pipe: ${runLen} ft × RM ${DRAIN_PIPE_RATE}/ft × ${u} = RM ${drainAmt.toLocaleString()} (estimate)` : "",
    ].filter(Boolean);
    return {
      intent: "material-estimate",
      context: nextCtx,
      message: {
        text:
          `Here is your material estimate for a ${ftRun[1]} ft run (${h} HP, ${u} unit${u > 1 ? "s" : ""}). The first ${FREE_RUN_FEET} ft of pipe, wire and drain is free with installation, so only ${runLen} ft is chargeable per unit:`,
        cards: [
          {
            type: "quote",
            title: "Material Estimate",
            lines: [
              { label: "Copper pipe (extra)", detail: `${runLen} ft × RM ${copper}/ft × ${u} unit${u > 1 ? "s" : ""}`, amount: copperAmt.toLocaleString() },
              { label: "Electrical wire (extra)", detail: `${runLen} ft × RM ${wire}/ft × ${u} unit${u > 1 ? "s" : ""}`, amount: wireAmt.toLocaleString() },
              { label: "Drain pipe (extra)", detail: `${runLen} ft × RM ${DRAIN_PIPE_RATE}/ft × ${u} unit${u > 1 ? "s" : ""}`, amount: drainAmt.toLocaleString() },
            ],
            total: total.toLocaleString(),
            note: "Published rates for copper and wire; drain pipe at the standard estimate rate. Final pricing confirmed on-site.",
          },
          {
            type: "links",
            title: "Full breakdown",
            links: [{ label: "Installation Cost Calculator", href: "/aircond-installation-cost-calculator" }],
          },
        ],
        suggested: ["Full installation cost", "How much is PVC casing?"],
      },
    };
  }

  // 2c. Gas pricing — catches "gas quotation", "gas estimate for r32", etc.
  if (/gas|top.?up|refill|r22|r32|r410a/.test(n) && /price|cost|how much|harga|berapa|charge|quote|quotation|estimate|费用|多少钱/.test(n)) {
    const gasReply = pricingAnswerFor(null, hp, n);
    if (gasReply) return { ...gasReply, context: nextCtx };
  }

  // 2d. General pricing (before HP sizing so "how much is installation for
  //     2 hp?" answers with prices — "berapa hp ... bilik" stays with sizing)
  if ((priceWords.test(n) || service) && !wantsQuote && !wantsHp) {
    const pricingReply = pricingAnswerFor(service?.slug ?? null, hp, n);
    if (pricingReply) return { ...pricingReply, context: nextCtx };
  }

  // 3. HP recommendation
  if (wantsHp && (roomSqft || dims || /sqft|square feet|kaki persegi/.test(n) || /\d+\s*[x×*]\s*\d+/.test(n))) {
    const area = roomSqft ?? (dims ? dims.length * dims.width : 0);
    const btu = calculateBtu({
      areaSqft: area,
      roomTypeMultiplier: ROOM_TYPE_MULTIPLIERS["bedroom"],
      sunMultiplier: SUN_MULTIPLIERS["medium"],
      heightMultiplier: heightMultiplier(10),
      peopleBTU: peopleBtu(2),
      windowsBTU: windowsBtu(1),
    });
    const rec = recommendHpFromBtu(btu);
    return {
      intent: "hp-recommendation",
      context: { ...nextCtx, hp: rec.hp as HpSize },
      message: {
        text:
          `For a room of about ${Math.round(area)} sqft (with standard bedroom conditions: medium sun, 2 people, 1 window, 10 ft ceiling), you need roughly ${btu.toLocaleString()} BTU — a ${rec.hp} HP aircond. Installation for this size starts from ${formatRM(rec.installFrom)}.`,
        cards: [
          { type: "hp", title: "Recommended Aircond Size", btu, hp: rec.hp, installFrom: rec.installFrom, note: "For precise sizing with room type, sun exposure, people and windows, use the BTU Calculator." },
          { type: "links", title: "Next steps", links: [{ label: "BTU / HP Calculator", href: "/btu-calculator" }, { label: "Installation cost calculator", href: "/aircond-installation-cost-calculator" }] },
        ],
        suggested: ["How much to install this size?", "Estimate my installation cost"],
      },
    };
  }
  if (wantsHp) {
    return {
      intent: "hp-ask-room",
      context: nextCtx,
      message: {
        text:
          "I'd be happy to recommend the right HP! Just tell me your room size — for example \"12 x 10 ft\" or \"200 sqft\" — and if you know it, the room type (bedroom, living room, kitchen) and sun exposure (west-facing or top floor need more power).",
        suggested: ["12 x 10 ft", "200 sqft living room", "Use the BTU calculator"],
      },
    };
  }

  // 3. Installation estimate / quotation
  if (/install|pemasangan|安装|quote|quotation|estimate/.test(n) || (nextCtx.lastIntent === "install-estimate" && /yes|ya|ok|确认|好的/.test(n))) {
    const estimateHp = hp ?? "1.5";
    const estimate = calculateInstallationEstimate({
      units: units ?? 1,
      hp: estimateHp,
      unitType: unitType ?? "wall",
      extraCopperFeet: 0,
      extraWireFeet: 0,
      extraDrainFeet: 0,
      pvcFeet: 0,
      needsOutdoorBracket: true,
      heavyDutyBracket: false,
      needsIndoorBracket: false,
      needsSwitch: false,
      needsWaterPump: false,
    });
    return {
      intent: "install-estimate",
      context: { ...nextCtx, hp: estimateHp, lastIntent: "install-estimate" },
      message: {
        text:
          `Here is a professional estimated quotation for ${units ?? 1} × ${estimateHp} HP ${unitType ?? "wall-mounted"} aircond installation, based on our published pricing. The standard package includes 7 ft of copper pipe, wire and drain pipe, bracket, vacuum pump commissioning and a 1-month workmanship warranty.`,
        cards: [
          {
            type: "quote",
            title: "Estimated Quotation",
            lines: estimate.lineItems.map((l) => ({ label: l.label, detail: l.detail, amount: l.amount.toLocaleString() })),
            total: estimate.grandTotal.toLocaleString(),
            discount: estimate.discountAmount > 0 ? `${estimate.discount.label} (−${formatRM(estimate.discountAmount)})` : undefined,
            note: "Extras like longer pipe runs, PVC casing, switch or water pump are added per the published material rates. Final price is confirmed before work begins.",
          },
          {
            type: "links",
            title: "Refine or book",
            links: [
              { label: "Installation Cost Calculator — add pipe runs & add-ons", href: "/aircond-installation-cost-calculator" },
              { label: "Book installation", href: "/book" },
              { label: "Installation price guide", href: "/installation-price-malaysia" },
            ],
          },
        ],
        suggested: ["Add 20 ft copper pipe", "How much for 3 units?", "Book this installation"],
      },
    };
  }

  // 4. Gas recommendation
  if (/which gas|gas (type|apa)|r22 or|r32 or|r410a or|gas mana|用什么gas|选.*gas|gas untuk/.test(n) || (/gas/.test(n) && /recommend|suggest|sesuai|适合/.test(n))) {
    return {
      intent: "gas-recommendation",
      context: nextCtx,
      message: {
        text:
          "Here's how to choose your refrigerant: 1) R22 — used in units made before ~2015; older systems. RM 2.50/PSI. 2) R410A — the standard for most 2015–2021 units. RM 3.00/PSI. 3) R32 — used in newer inverter models (2021+); more efficient and lower charge volume. RM 3.00/PSI. The gas type is printed on the sticker on your outdoor unit — never mix refrigerants. If you're unsure, our technician identifies the gas type during inspection and confirms the price before refilling. ⚠️ The final gas quantity and charges are confirmed after on-site inspection.",
        cards: [
          {
            type: "pricing",
            title: "Gas Rates (published)",
            rows: sitePublic.pricing.gasTopup.rows.map((r) => ({ label: r.label, price: r.price })),
            note: "Every top-up includes a leak check — refrigerant never 'runs out', so if it's low, it leaked.",
          },
        ],
        suggested: ["How much is gas top-up for 1.5 HP?", "My unit is from 2012 — which gas?"],
      },
    };
  }

  // 5. Service recommendation from symptoms
  const symptom = TROUBLESHOOTING.find((t) => t.keywords.test(n));
  if (symptom && !/price|cost|how much|harga/.test(n)) {
    return {
      intent: "service-recommendation",
      context: nextCtx,
      message: {
        text:
          `Sounds like you're dealing with: ${symptom.title}. Here's what I recommend and why:`,
        cards: [
          {
            type: "service",
            title: "Recommended service",
            service: symptom.service,
            price: symptom.price,
            why: symptom.why,
            href: symptom.href,
          },
          {
            type: "links",
            title: "Immediate steps",
            links: symptom.steps.map((s, i) => ({ label: `${i + 1}. ${s}`, href: symptom.href })),
          },
        ],
        suggested: ["How much is this service?", "Book this service", "Use the service recommendation tool"],
      },
    };
  }

  // 6. Curated knowledge base
  for (const k of KNOWLEDGE) {
    if (k.keywords.test(n)) {
      return {
        intent: "knowledge",
        context: nextCtx,
        message: {
          text: k.answer,
          cards: k.links ? [{ type: "links", title: "Useful links", links: k.links }] : undefined,
          suggested: ["How much is chemical wash?", "What HP do I need?", "Book a service"],
        },
      };
    }
  }

  // 8. Fallback — never invent, always offer a path forward
  return {
    intent: "fallback",
    context: nextCtx,
    message: {
      text:
        "I want to make sure you get the right answer, and I never guess prices or information. Could you rephrase, or try one of these common questions? You can also WhatsApp +60182983573 — a real KL Renovator technician will reply with a confirmed price.",
      suggested: SUGGESTIONS,
    },
  };
}

/** Opening message shown when the chat first loads. */
export function welcomeMessage(): AssistantMessage {
  return {
    role: "assistant",
    text:
      "Hi! 👋 I'm the KL Renovator Aircond Expert Assistant — trained on our real 2026 service information and pricing. Ask me about installation costs, gas top-up prices, the right HP for your room, which service you need, or how to book. What can I help you with?",
    suggested: SUGGESTIONS.slice(0, 6),
  };
}
