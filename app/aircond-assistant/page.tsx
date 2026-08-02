import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { AiAssistant } from "@/components/ai-assistant";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-assistant";

export const metadata: Metadata = {
  title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Aircond Help"),
  description:
    "Ask KL Renovator's AI aircond expert anything: installation cost, gas top-up price, HP recommendation, service advice, troubleshooting & booking help. Trained on our real 2026 pricing.",
  alternates: buildTrilingualHreflang("/aircond-assistant"),
  openGraph: {
    title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Help"),
    description:
      "Free AI aircond assistant for KL & Selangor — instant pricing, installation quotes, HP recommendations, gas type advice and booking help.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — AI Aircond Expert Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Help"),
    description: "Instant aircond pricing, quotes & service advice — free AI assistant.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function AiAssistantPage() {
  const c = getToolContent("assistant", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<AiAssistant lang="en" />}
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
