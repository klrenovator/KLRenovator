import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SizeCalculator } from "@/components/calculators/size-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/aircond-size-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Size Calculator Malaysia — Room Size to HP"),
  description:
    padMetaDescription("Free aircond size calculator Malaysia. Enter room size, type, usage & heat exposure to find the recommended HP, BTU and suitable aircond capacity. Accurate room-size-to-HP guide from KL Renovator."),
  alternates: buildTrilingualHreflang("/aircond-size-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Size Calculator Malaysia — Room to HP"),
    description:
      "Find the right aircond HP & BTU for your room — room size, type, usage and heat exposure. Get the correct capacity before you buy.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Size Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Size Calculator Malaysia"),
    description: "Room size to HP & BTU — find the right aircond capacity.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function AircondSizeCalculatorPage() {
  const c = getToolContent("size", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SizeCalculator lang="en" />}
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
