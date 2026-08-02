// ─────────────────────────────────────────────────────────────────────────
// Tool registry — single source of truth for the site's calculator/tool
// URLs, used by the /tools hub, footer, homepage and every internal-link
// strip. Add a new tool here and it appears everywhere automatically.
// ─────────────────────────────────────────────────────────────────────────

export interface ToolInfo {
  slug: string;
  /** Short display name (nav / cards / chips). */
  title: string;
  /** One-line description for cards. */
  desc: string;
  /** Emoji icon used across tool cards. */
  icon: string;
  /** The main search phrase the page targets (for anchor diversity). */
  anchor: string;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "/aircond-installation-cost-calculator",
    title: "Installation Cost Calculator",
    desc: "Instant aircond installation estimate — labour, copper pipe, wire, drain pipe, bracket, switch & water pump with bundle discounts.",
    icon: "🔧",
    anchor: "Aircond Installation Cost Calculator",
  },
  {
    slug: "/aircond-gas-topup-cost-calculator",
    title: "Gas Top-up Cost Estimator",
    desc: "Estimate R22, R410A & R32 gas top-up cost by HP and gas condition — charged per actual PSI after inspection.",
    icon: "⛽",
    anchor: "Aircond Gas Top-up Cost Calculator",
  },
  {
    slug: "/which-aircond-service-do-i-need",
    title: "Service Recommendation Tool",
    desc: "Answer 4 quick questions and find out whether you need basic service, chemical wash, overhaul, gas top-up or repair.",
    icon: "🩺",
    anchor: "Which Aircond Service Do I Need?",
  },
  {
    slug: "/btu-calculator",
    title: "BTU / HP Calculator",
    desc: "Enter room dimensions, sun exposure, people & windows to find the exact BTU and HP your room needs.",
    icon: "📐",
    anchor: "Aircond BTU Calculator",
  },
  {
    slug: "/aircond-size-calculator",
    title: "Aircond Size Calculator",
    desc: "Room size + type + usage + heat exposure → recommended HP, BTU and suitable aircond capacity.",
    icon: "📏",
    anchor: "Aircond Size Calculator",
  },
  {
    slug: "/aircond-electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    desc: "Estimate your monthly aircond electricity bill by HP, daily usage hours and your TNB electricity rate.",
    icon: "⚡",
    anchor: "Aircond Electricity Cost Calculator",
  },
  {
    slug: "/aircond-savings-calculator",
    title: "Inverter Savings Calculator",
    desc: "Compare old non-inverter vs new inverter aircond — monthly savings, yearly savings and payback period.",
    icon: "💰",
    anchor: "Inverter Aircond Savings Calculator",
  },
];

/** The AI assistant page — listed separately so hubs can feature it. */
export const AI_ASSISTANT_TOOL = {
  slug: "/aircond-assistant",
  title: "AI Aircond Expert Assistant",
  desc: "Ask KL Renovator's AI assistant anything — pricing, HP recommendation, installation quotes, gas type, service advice & booking help.",
  icon: "🤖",
  anchor: "AI Aircond Expert Assistant",
};

export function toolBySlug(slug: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
