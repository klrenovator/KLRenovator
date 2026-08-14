import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { ElectricityCalculator } from "@/components/calculators/electricity-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-electricity-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Electricity Cost Calculator Malaysia"),
  description:
    padMetaDescription("Free aircond electricity cost calculator Malaysia. Estimate your monthly aircond power consumption & TNB bill by HP, daily usage hours and electricity rate. Compare inverter savings."),
  alternates: buildTrilingualHreflang("/aircond-electricity-cost-calculator"),
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
  const c = getToolContent("electricity", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<ElectricityCalculator lang="en" />}
      howItWorks={c.howItWorks}
      factors={c.factors}
      faqs={c.faqs}
      webAppName={c.webAppName}
      pageUrl={PAGE_URL}
      howToName={c.howToName}
      howItWorksTitle={c.howItWorksTitle}
    />
  );
}
