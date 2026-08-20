import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/ms/which-aircond-service-do-i-need";

export const metadata: Metadata = {
  title: clampMetaTitle("Servis Aircond Mana Yang Saya Perlukan? — Percuma"),
  description:
    padMetaDescription("Tidak pasti aircond anda perlukan servis asas, cuci kimia, overhaul kimia, tambah gas atau pembaikan? Jawab soalan pantas dan dapatkan cadangan servis percuma dengan harga dari KL Renovator."),
  alternates: buildTrilingualHreflang("/which-aircond-service-do-i-need", "ms"),
  openGraph: {
    title: clampMetaTitle("Servis Aircond Mana Yang Saya Perlukan?"),
    description: "Alat cadangan servis aircond percuma — cuci kimia, overhaul, tambah gas atau pembaikan. Jawab beberapa soalan.",
    url: PAGE_URL,
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/daikin-aircond-basic-servicing-ampang-140.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Alat Cadangan Servis Aircond Percuma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Servis Aircond Mana Yang Saya Perlukan?"),
    description: "Jawab 4 soalan — dapatkan servis aircond yang betul dengan harga.",
    images: ["https://www.klrenovator.com/hero/daikin-aircond-basic-servicing-ampang-140.webp"],
  },
};

export default function MsWhichAircondServicePage() {
  const c = getToolContent("service", "ms");
  return (
    <ToolPageLayout
      lang="ms"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<DiagnosticTool lang="ms" />}
      howItWorks={c.howItWorks}
      factors={c.factors}
      faqs={c.faqs}
      webAppName={c.webAppName}
      pageUrl={PAGE_URL}
      howToName={c.howToName}
      howItWorksTitle={c.howItWorksTitle}
      explainerPreset="tool:service"
    />
  );
}
