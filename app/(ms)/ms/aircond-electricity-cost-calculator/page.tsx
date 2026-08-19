import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { ElectricityCalculator } from "@/components/calculators/electricity-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-electricity-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Kos Elektrik Aircond Malaysia"),
  description:
    padMetaDescription("Kalkulator kos elektrik aircond Malaysia percuma. Anggarkan penggunaan kuasa bulanan & bil TNB mengikut HP, jam penggunaan harian dan kadar elektrik. Bandingkan penjimatan inverter."),
  alternates: buildTrilingualHreflang("/aircond-electricity-cost-calculator", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator Kos Elektrik Aircond Malaysia"),
    description: "Anggarkan bil elektrik aircond bulanan mengikut HP dan jam penggunaan — dan lihat penjimatan inverter.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/hisense-aircond-chemical-wash-klang-111.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator Kos Elektrik Aircond Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator Kos Elektrik Aircond Malaysia"),
    description: "Anggarkan bil elektrik aircond bulanan mengikut HP & penggunaan.",
    images: ["https://www.klrenovator.com/hero/hisense-aircond-chemical-wash-klang-111.webp"],
  },
};

export default function MsElectricityCostCalculatorPage() {
  const c = getToolContent("electricity", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<ElectricityCalculator lang="ms" />}
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
