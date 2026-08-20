import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { GasTopupCalculator } from "@/components/calculators/gas-topup-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-gas-topup-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Gas Top-up Cost Calculator Malaysia"),
  description:
    padMetaDescription("Free aircond gas top-up cost calculator Malaysia. Estimate R22, R410A & R32 gas refill price by HP and gas condition. RM 2.50–3.00/PSI. Final charge confirmed after inspection."),
  alternates: buildTrilingualHreflang("/aircond-gas-topup-cost-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Gas Top-up Cost Calculator Malaysia"),
    description:
      "Estimate your aircond gas refill cost instantly — R22 RM 2.50/PSI, R410A & R32 RM 3.00/PSI, by HP and gas condition.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp",
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
    images: ["https://www.klrenovator.com/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp"],
  },
};

export default function GasTopupCostCalculatorPage() {
  const c = getToolContent("gas", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<GasTopupCalculator lang="en" />}
      howItWorks={c.howItWorks}
      factors={c.factors}
      faqs={c.faqs}
      webAppName={c.webAppName}
      pageUrl={PAGE_URL}
      howToName={c.howToName}
      howItWorksTitle={c.howItWorksTitle}
      explainerPreset="tool:gas"
    />
  );
}
