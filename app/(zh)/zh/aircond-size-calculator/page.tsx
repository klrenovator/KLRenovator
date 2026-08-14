import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SizeCalculator } from "@/components/calculators/size-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-size-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气尺寸计算器 — 房间面积换算匹数"),
  description:
    padMetaDescription("马来西亚免费冷气尺寸计算器。输入房间大小、类型、使用和受热情况，获取推荐的匹数、BTU和合适的冷气容量。KL Renovator提供准确的房间到匹数换算指南。"),
  alternates: buildTrilingualHreflang("/aircond-size-calculator", "zh"),
  openGraph: {
    title: clampMetaTitle("冷气尺寸计算器 — 房间换算匹数"),
    description: "为您的房间找到正确的冷气匹数和BTU — 房间大小、类型、使用和受热情况。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 冷气尺寸计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("冷气尺寸计算器"),
    description: "房间面积换算匹数与BTU — 找到正确的冷气容量。",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function ZhAircondSizeCalculatorPage() {
  const c = getToolContent("size", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SizeCalculator lang="zh" />}
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
