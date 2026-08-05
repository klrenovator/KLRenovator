import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { InstallationCostCalculator } from "@/components/calculators/installation-cost-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-installation-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia — Free Quote"),
  description:
    "Free aircond installation cost calculator Malaysia. Estimate labour, copper pipe, wire, drain pipe, bracket, switch & water pump costs with bundle discounts. Get a confirmed quote from KL Renovator.",
  alternates: buildTrilingualHreflang("/aircond-installation-cost-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia"),
    description:
      "Estimate your aircond installation cost instantly — labour, copper pipe, electrical wire, drain pipe, bracket & more. From RM 199 installation.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Installation Cost Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia"),
    description: "Instant aircond installation cost estimate — labour & materials with bundle discounts.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp"],
  },
};

export default function InstallationCostCalculatorPage() {
  const c = getToolContent("installation", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<InstallationCostCalculator lang="en" />}
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
