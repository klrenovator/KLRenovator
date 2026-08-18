import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { InstallationCostCalculator } from "@/components/calculators/installation-cost-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-installation-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Kalkulator Kos Pemasangan Aircond Malaysia"),
  description:
    padMetaDescription("Kalkulator kos pemasangan aircond Malaysia percuma. Anggarkan buruh, paip tembaga, wayar, paip saliran, pendakap, suis & pam air dengan diskaun pakej. Dapatkan sebut harga sah dari KL Renovator."),
  alternates: buildTrilingualHreflang("/aircond-installation-cost-calculator", "ms"),
  openGraph: {
    title: clampMetaTitle("Kalkulator Kos Pemasangan Aircond Malaysia"),
    description: "Anggaran kos pemasangan aircond serta-merta — buruh, paip tembaga, wayar, saliran, pendakap & banyak lagi.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Kalkulator Kos Pemasangan Aircond Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Kalkulator Kos Pemasangan Aircond Malaysia"),
    description: "Anggaran kos pemasangan aircond serta-merta — buruh & bahan dengan diskaun pakej.",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function MsInstallationCostCalculatorPage() {
  const c = getToolContent("installation", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<InstallationCostCalculator lang="ms" />}
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
