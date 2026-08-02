import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SavingsCalculator } from "@/components/calculators/savings-calculator";

const PAGE_URL = "https://www.klrenovator.com/aircond-savings-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Inverter Aircond Savings Calculator Malaysia"),
  description:
    "Free inverter aircond savings calculator Malaysia. Compare your old non-inverter aircond vs a new inverter unit — monthly savings, yearly savings and estimated payback period.",
  alternates: buildCanonicalOnly("/aircond-savings-calculator"),
  openGraph: {
    title: clampMetaTitle("Inverter Aircond Savings Calculator Malaysia"),
    description:
      "Compare non-inverter vs inverter aircond — monthly & yearly savings and payback period. See if upgrading is worth it.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-new-installation-petaling-jaya.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Inverter Aircond Savings Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Inverter Aircond Savings Calculator Malaysia"),
    description: "Non-inverter vs inverter — savings & payback period in one click.",
    images: ["https://www.klrenovator.com/hero/aircond-new-installation-petaling-jaya.webp"],
  },
};

export default function SavingsCalculatorPage() {
  return (
    <ToolPageLayout
      eyebrow="Free Instant Estimate"
      h1="Inverter Aircond Savings Calculator"
      intro="Wondering whether upgrading from your old non-inverter aircond to a new inverter unit is worth it? Enter your HP, usage and electricity rate, and the calculator estimates your monthly savings, yearly savings and the payback period for the inverter price difference — with a clean visual comparison."
      calculator={<SavingsCalculator />}
      howItWorks={[
        "Select the horsepower (HP) of your current aircond.",
        "Enter your daily usage hours and days per month — inverter savings grow with runtime, so 8+ hours a day makes the upgrade far more attractive.",
        "Set your electricity rate (default RM 0.509/kWh, the TNB domestic average — edit to match your bill).",
        "Enter the inverter price difference for the same HP — the typical market premium is pre-filled and fully editable.",
        "The calculator compares the electricity used by a non-inverter unit against an inverter unit (which uses ~35% less) and computes monthly savings, yearly savings and the payback period.",
        "The result shows a visual kWh comparison bar, and you can send the numbers to KL Renovator on WhatsApp to discuss the installation.",
      ]}
      factors={[
        { title: "Runtime matters most", desc: "Inverter savings are proportional to usage. A unit running 8+ hours a day can save RM 50–150/month; a unit used 2 hours a day will take much longer to pay back the premium." },
        { title: "HP size", desc: "Bigger units use more electricity, so the absolute savings (and the price premium) are higher for 2.0 HP+ units." },
        { title: "Your electricity rate", desc: "TNB rates are tiered. Use the effective rate from your bill (total RM ÷ total kWh) for the most accurate savings figure." },
        { title: "Price premium", desc: "Inverter units typically cost RM 500–1,200 more than equivalent non-inverter units depending on HP and brand. The calculator lets you enter the exact quote you received." },
        { title: "Maintenance condition", desc: "A dirty non-inverter unit wastes even more electricity — servicing it (chemical wash from RM 120) is the cheapest efficiency fix and can be combined with an inverter upgrade decision." },
      ]}
      faqs={[
        { q: "How much can I save with an inverter aircond in Malaysia?", a: "Inverter airconds typically use about 35% less electricity than non-inverter units. For a 1.5 HP unit running 8 hours/day at RM 0.509/kWh, that is roughly RM 50–60/month or RM 600–700/year in electricity savings alone." },
        { q: "How long does an inverter aircond take to pay back?", a: "With typical 8-hour daily usage, the inverter price premium (usually RM 500–1,200) pays back in about 1–2 years. After that, the savings are pure gain — and inverter units also cool more quietly and hold temperature more steadily." },
        { q: "Is it worth changing from non-inverter to inverter aircond?", a: "If your unit runs 6+ hours a day, yes — the electricity savings usually cover the price difference within 1–3 years, and inverter units last longer because the compressor does not stop-start. For light usage under 3 hours a day, the payback is slower and a well-maintained non-inverter may make more sense." },
        { q: "Does an inverter aircond save 50% on electricity?", a: "Not exactly — 30–40% is the realistic range for cooling electricity in Malaysian conditions. The exact saving depends on runtime pattern, room heat load and temperature setting. KL Renovator's calculator uses a conservative 35%." },
        { q: "Can KL Renovator install the inverter aircond I buy?", a: "Yes — KL Renovator installs all 20 major brands, inverter and non-inverter, wall-mounted, ceiling cassette and window units. Installation starts from RM 199 (1.0–1.5 HP wall-mounted) including 7 ft of copper pipe, wire and drain pipe, bracket, vacuum pump commissioning and a 1-month workmanship warranty." },
      ]}
      webAppName="KL Renovator Inverter Aircond Savings Calculator"
      pageUrl={PAGE_URL}
      howToName="How to Calculate Inverter Aircond Savings in Malaysia"
    />
  );
}
