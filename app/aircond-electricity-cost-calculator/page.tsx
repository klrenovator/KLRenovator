import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { ElectricityCalculator } from "@/components/calculators/electricity-calculator";

const PAGE_URL = "https://www.klrenovator.com/aircond-electricity-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Electricity Cost Calculator Malaysia"),
  description:
    "Free aircond electricity cost calculator Malaysia. Estimate your monthly aircond power consumption & TNB bill by HP, daily usage hours and electricity rate. Compare inverter savings.",
  alternates: buildCanonicalOnly("/aircond-electricity-cost-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Electricity Cost Calculator Malaysia"),
    description:
      "Estimate your monthly aircond electricity bill by HP and usage hours — and see how much an inverter unit could save you.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/midea-aircond-chemical-wash-klang-61.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Electricity Cost Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Electricity Cost Calculator Malaysia"),
    description: "Estimate your monthly aircond electricity bill by HP & usage.",
    images: ["https://www.klrenovator.com/hero/midea-aircond-chemical-wash-klang-61.webp"],
  },
};

export default function ElectricityCostCalculatorPage() {
  return (
    <ToolPageLayout
      eyebrow="Free Instant Estimate"
      h1="Aircond Electricity Cost Calculator"
      intro="Estimate how much your aircond adds to your monthly TNB bill. Enter your HP, daily usage hours, days per month and your electricity rate (editable), and the calculator shows the estimated monthly cost in RM, energy used in kWh, and how much an inverter upgrade could save."
      calculator={<ElectricityCalculator />}
      howItWorks={[
        "Select your aircond horsepower (HP) — the calculator uses the typical running power draw for each size (e.g. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW).",
        "Enter how many hours per day the aircond runs and how many days per month.",
        "Enter your electricity rate. The default is the TNB domestic average of RM 0.509/kWh — check your bill and edit it for accuracy.",
        "The calculator multiplies power (kW) × hours × days × rate to get the estimated monthly cost in RM and kWh.",
        "The result includes a comparison tip: a dirty coil makes the unit run longer, and an inverter model typically cuts cooling electricity by ~35%.",
        "Send the result to KL Renovator on WhatsApp if your bill seems high — a chemical wash or service often restores efficiency.",
      ]}
      factors={[
        { title: "Horsepower (HP)", desc: "A 1.0 HP unit draws about 0.9 kW, 1.5 HP about 1.2 kW, 2.0 HP about 1.7 kW, 2.5 HP about 2.1 kW and 3.0 HP about 2.5 kW while running." },
        { title: "Usage hours", desc: "Airconds running 8 hours a day cost roughly twice as much as those running 4 hours. Thermostat setting also matters — every degree lower adds about 5–8% consumption." },
        { title: "Electricity rate (editable)", desc: "TNB domestic tariffs are tiered from 21.8 sen to 57.1 sen per kWh. The RM 0.509/kWh default is a blended average; use the rate from your actual bill for precision." },
        { title: "Maintenance condition", desc: "A dirty evaporator coil and clogged filter reduce cooling efficiency by up to 40% — the unit runs longer to reach the same temperature. Regular chemical wash (from RM 120) keeps consumption at the rated level." },
        { title: "Inverter vs non-inverter", desc: "Inverter units typically use ~35% less electricity than non-inverter units. See the inverter savings calculator for monthly savings and payback period." },
      ]}
      faqs={[
        { q: "How much electricity does an aircond use per month in Malaysia?", a: "A 1.0–1.5 HP aircond running 8 hours a day typically uses 200–290 kWh per month, costing roughly RM 100–180 at TNB domestic rates. A 2.0–2.5 HP unit running the same hours costs around RM 200–350. Actual usage depends on the model, thermostat setting, room size and how clean the unit is." },
        { q: "How do I calculate my aircond electricity cost?", a: "Multiply the unit's power draw in kW (e.g. 1.5 HP ≈ 1.2 kW) by daily usage hours, then by days per month to get kWh, then by your electricity rate (RM/kWh). Example: 1.2 kW × 8 hrs × 30 days = 288 kWh × RM 0.509 = about RM 147/month." },
        { q: "Why is my aircond electricity bill so high?", a: "The most common causes: a dirty coil or filter forcing longer runtimes, a low-refrigerant system that never reaches temperature, thermostat set very low, an oversized or undersized unit, or an old non-inverter unit. A chemical wash (from RM 120) and service restore efficiency; upgrading to inverter saves ~35%." },
        { q: "Does an inverter aircond really save electricity?", a: "Yes — inverter compressors run at variable speed instead of stop-start, which typically cuts cooling electricity by 30–40% in Malaysian conditions. For an 8-hour daily usage, a 1.5 HP inverter often saves RM 50–70 per month compared with an equivalent non-inverter unit." },
        { q: "What is the TNB electricity rate for aircond use?", a: "TNB domestic (Residential) tariffs in 2026 are tiered: 21.8 sen/kWh for the first 200 kWh, 33.4 sen for 201–300 kWh, 51.6 sen for 301–600 kWh, 54.6 sen for 601–900 kWh and 57.1 sen above 900 kWh. Use your bill's effective rate (total RM ÷ total kWh) for the most accurate estimate." },
      ]}
      webAppName="KL Renovator Aircond Electricity Cost Calculator"
      pageUrl={PAGE_URL}
      howToName="How to Calculate Your Aircond Electricity Cost in Malaysia"
    />
  );
}
