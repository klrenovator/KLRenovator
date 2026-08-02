import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { GasTopupCalculator } from "@/components/calculators/gas-topup-calculator";

const PAGE_URL = "https://www.klrenovator.com/aircond-gas-topup-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Gas Top-up Cost Calculator Malaysia"),
  description:
    "Free aircond gas top-up cost calculator Malaysia. Estimate R22, R410A & R32 gas refill price by HP and gas condition. RM 2.50–3.00/PSI. Final charge confirmed after inspection.",
  alternates: buildCanonicalOnly("/aircond-gas-topup-cost-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Gas Top-up Cost Calculator Malaysia"),
    description:
      "Estimate your aircond gas refill cost instantly — R22 RM 2.50/PSI, R410A & R32 RM 3.00/PSI, by HP and gas condition.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Gas Top-up Cost Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Gas Top-up Cost Calculator Malaysia"),
    description: "R22, R410A & R32 gas top-up price estimate by HP — from RM 2.50/PSI.",
    images: ["https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp"],
  },
};

export default function GasTopupCostCalculatorPage() {
  return (
    <ToolPageLayout
      eyebrow="Free Instant Estimate"
      h1="Aircond Gas Top-up Cost Calculator"
      intro="Estimate your aircond gas top-up cost in Malaysia instantly. Choose your HP, gas type (R22, R410A or R32) and estimated gas condition, and get a realistic cost range based on KL Renovator's published per-PSI rates. The final gas quantity and charges are confirmed by the technician after on-site inspection."
      calculator={<GasTopupCalculator />}
      howItWorks={[
        "Select your aircond horsepower (HP) — 1.0 HP to 3.0 HP are the most common sizes for gas top-ups.",
        "Choose your gas type. KL Renovator tops up all three: R22 at RM 2.50/PSI (older units), R410A at RM 3.00/PSI (standard) and R32 at RM 3.00/PSI (newer inverter units).",
        "Estimate how low the refrigerant is — slightly low, moderately low or very low. This sets the typical PSI shortfall range for your HP.",
        "Enter the number of units that need topping up.",
        "The calculator returns a cost RANGE (never a false-precision single number) based on the published per-PSI rates.",
        "Book a gas top-up with KL Renovator — a precision manifold gauge check measures the actual PSI, a leak check is included, and you only pay for the PSI actually refilled.",
      ]}
      factors={[
        { title: "Gas type & published rate", desc: "R22 is RM 2.50/PSI (older R22 systems), R410A and R32 are RM 3.00/PSI. These are KL Renovator's published rates — the calculator uses them directly." },
        { title: "Horsepower (HP)", desc: "Larger systems hold more refrigerant and typically need more PSI restored: 1.0 HP usually needs the least, 2.5–3.0 HP the most." },
        { title: "How low the gas is", desc: "A unit that barely cools needs more PSI than one that is only slightly weak. The estimate uses typical shortfall bands for each condition." },
        { title: "Leak check is included", desc: "Refrigerant never 'runs out' — if it is low, it leaked. Every KL Renovator gas top-up includes a physical leak inspection at all flare connections, service valves and coil surfaces." },
      ]}
      faqs={[
        { q: "How much does aircond gas top-up cost in Malaysia?", a: "KL Renovator charges per PSI: R22 at RM 2.50/PSI, R410A and R32 at RM 3.00/PSI. A typical 1.5 HP top-up ranges from roughly RM 105–270 depending on how much gas is missing. The exact PSI is measured with a manifold gauge during inspection and you only pay for what is refilled — no hidden charges." },
        { q: "Which gas does my aircond use — R22, R410A or R32?", a: "Units made before ~2015 usually use R22. Most units from 2015–2021 use R410A. Newer inverter models (2021+) use R32. Check the sticker on the outdoor unit — it states the refrigerant type. KL Renovator tops up all three." },
        { q: "Why is my aircond gas low every year?", a: "Because refrigerant does not get 'used up' — if it is low, it leaked out somewhere. A proper gas top-up always includes a leak check. KL Renovator inspects all accessible flare connections, service valves and coil surfaces with every top-up." },
        { q: "Is gas top-up charged per PSI or per unit?", a: "KL Renovator charges per actual PSI required after inspection: RM 2.50/PSI for R22 and RM 3.00/PSI for R410A and R32. We only refill the amount needed and confirm the total with you before refilling." },
        { q: "Does gas top-up include the labour or diagnostic fee?", a: "The per-PSI charge covers the gas itself and the precision balancing. Every top-up includes a leak check. If a leak or other fault is found, you will receive a separate transparent quote before any repair work begins." },
      ]}
      webAppName="KL Renovator Aircond Gas Top-up Cost Calculator"
      pageUrl={PAGE_URL}
      howToName="How to Estimate Aircond Gas Top-up Cost in Malaysia"
    />
  );
}
