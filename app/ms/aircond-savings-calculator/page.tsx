import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SavingsCalculator } from "@/components/calculators/savings-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-savings-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Penjimatan Aircond Inverter Malaysia"),
  description:
    "Kalkulator penjimatan aircond inverter Malaysia percuma. Bandingkan aircond bukan inverter lama vs unit inverter baharu — penjimatan bulanan, tahunan dan tempoh pulangan anggaran.",
  alternates: buildTrilingualHreflang("/aircond-savings-calculator", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator Penjimatan Aircond Inverter Malaysia"),
    description: "Bandingkan bukan inverter vs inverter — penjimatan bulanan & tahunan dan tempoh pulangan.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-new-installation-petaling-jaya.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator Penjimatan Aircond Inverter Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator Penjimatan Aircond Inverter Malaysia"),
    description: "Bukan inverter vs inverter — penjimatan & tempoh pulangan dalam satu klik.",
    images: ["https://www.klrenovator.com/hero/aircond-new-installation-petaling-jaya.webp"],
  },
};

export default function MsSavingsCalculatorPage() {
  const c = getToolContent("savings", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SavingsCalculator lang="ms" />}
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
