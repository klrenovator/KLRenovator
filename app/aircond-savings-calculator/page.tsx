import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SavingsCalculator } from "@/components/calculators/savings-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-savings-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Inverter Aircond Savings Calculator Malaysia"),
  description:
    "Free inverter aircond savings calculator Malaysia. Compare your old non-inverter aircond vs a new inverter unit — monthly savings, yearly savings and estimated payback period.",
  alternates: buildTrilingualHreflang("/aircond-savings-calculator"),
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
  const c = getToolContent("savings", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SavingsCalculator lang="en" />}
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
