import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/which-aircond-service-do-i-need";

export const metadata: Metadata = {
  title: clampMetaTitle("Which Aircond Service Do I Need? — Free Recommendation"),
  description:
    padMetaDescription("Not sure if your aircond needs basic service, chemical wash, chemical overhaul, gas top-up or repair? Answer 4 quick questions and get a free service recommendation with pricing from KL Renovator."),
  alternates: buildTrilingualHreflang("/which-aircond-service-do-i-need"),
  openGraph: {
    title: clampMetaTitle("Which Aircond Service Do I Need? Free Tool"),
    description:
      "Free aircond service recommendation tool — chemical wash, overhaul, gas top-up or repair. Answer a few questions and get the right service with clear pricing.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/daikin-aircond-basic-servicing-ampang-140.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Which Aircond Service Do I Need? Free Recommendation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Which Aircond Service Do I Need? Free Tool"),
    description: "Answer 4 questions — get the right aircond service with pricing.",
    images: ["https://www.klrenovator.com/hero/daikin-aircond-basic-servicing-ampang-140.webp"],
  },
};

export default function WhichAircondServicePage() {
  const c = getToolContent("service", "en");
  return (
    <ToolPageLayout
      lang="en"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<DiagnosticTool lang="en" />}
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
