import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SizeCalculator } from "@/components/calculators/size-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-size-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Saiz Aircond Malaysia — Saiz Bilik ke HP"),
  description:
    padMetaDescription("Kalkulator saiz aircond Malaysia percuma. Masukkan saiz bilik, jenis, penggunaan & pendedahan haba untuk mencari HP, BTU dan kapasiti aircond yang disyorkan. Panduan saiz bilik-ke-HP tepat dari KL Renovator."),
  alternates: buildTrilingualHreflang("/aircond-size-calculator", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator Saiz Aircond Malaysia — Bilik ke HP"),
    description: "Cari HP & BTU aircond yang betul untuk bilik anda — saiz, jenis, penggunaan dan pendedahan haba.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator Saiz Aircond Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator Saiz Aircond Malaysia"),
    description: "Saiz bilik ke HP & BTU — cari kapasiti aircond yang betul.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function MsAircondSizeCalculatorPage() {
  const c = getToolContent("size", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SizeCalculator lang="ms" />}
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
