import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/which-aircond-service-do-i-need";

export const metadata: Metadata = {
  title: clampMetaTitle("我需要哪种冷气服务？— 免费推荐"),
  description:
    padMetaDescription("不确定冷气需要基本保养、化学清洗、化学大修、加气还是维修？回答几个快速问题，即可获得KL Renovator的免费服务推荐和价格。"),
  alternates: buildTrilingualHreflang("/which-aircond-service-do-i-need", "zh"),
  openGraph: {
    title: clampMetaTitle("我需要哪种冷气服务？"),
    description: "免费冷气服务推荐工具 — 化学清洗、大修、加气或维修。回答几个问题即可获得正确服务和清晰价格。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 我需要哪种冷气服务？",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("我需要哪种冷气服务？"),
    description: "回答4个问题 — 获得正确的冷气服务和价格。",
    images: ["https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp"],
  },
};

export default function ZhWhichAircondServicePage() {
  const c = getToolContent("service", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<DiagnosticTool lang="zh" />}
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
