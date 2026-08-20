import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { GasTopupCalculator } from "@/components/calculators/gas-topup-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-gas-topup-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Kos Tambah Gas Aircond Malaysia"),
  description:
    padMetaDescription("Kalkulator kos tambah gas aircond Malaysia percuma. Anggarkan harga isi semula R22, R410A & R32 mengikut HP dan keadaan gas. RM 2.50–3.00/PSI. Caj akhir disahkan selepas pemeriksaan."),
  alternates: buildTrilingualHreflang("/aircond-gas-topup-cost-calculator", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator Kos Tambah Gas Aircond Malaysia"),
    description: "Anggarkan kos tambah gas aircond serta-merta — R22 RM 2.50/PSI, R410A & R32 RM 3.00/PSI.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator Kos Tambah Gas Aircond Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator Kos Tambah Gas Aircond Malaysia"),
    description: "Anggaran harga tambah gas R22, R410A & R32 mengikut HP — dari RM 2.50/PSI.",
    images: ["https://www.klrenovator.com/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp"],
  },
};

export default function MsGasTopupCostCalculatorPage() {
  const c = getToolContent("gas", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<GasTopupCalculator lang="ms" />}
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
