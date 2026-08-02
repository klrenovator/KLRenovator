import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { AiAssistant } from "@/components/ai-assistant";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/aircond-assistant";

export const metadata: Metadata = {
  title: clampMetaTitle("Pembantu Pakar Aircond AI — Bantuan 24/7 Percuma"),
  description:
    "Tanya pembantu AI aircond KL Renovator apa sahaja: kos pemasangan, harga tambah gas, cadangan HP, nasihat servis, penyelesaian masalah & bantuan tempahan. Dilatih dengan harga 2026 sebenar kami.",
  alternates: buildTrilingualHreflang("/aircond-assistant", "ms"),
  openGraph: {
    title: clampMetaTitle("Pembantu Pakar Aircond AI — Bantuan 24/7"),
    description: "Pembantu AI aircond percuma untuk KL & Selangor — harga segera, sebut harga pemasangan, cadangan HP dan bantuan tempahan.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Pembantu Pakar Aircond AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Pembantu Pakar Aircond AI — Bantuan 24/7"),
    description: "Harga, sebut harga & nasihat servis aircond segera — pembantu AI percuma.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function MsAiAssistantPage() {
  const c = getToolContent("assistant", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<AiAssistant lang="ms" />}
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
