import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SavingsCalculator } from "@/components/calculators/savings-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-savings-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("变频冷气节省计算器 — 马来西亚"),
  description:
    padMetaDescription("马来西亚免费变频冷气节省计算器。对比旧非变频机与新型变频机 — 每月节省、每年节省和预计回本周期。"),
  alternates: buildTrilingualHreflang("/aircond-savings-calculator", "zh"),
  openGraph: {
    title: clampMetaTitle("变频冷气节省计算器 — 马来西亚"),
    description: "对比非变频与变频冷气 — 每月和每年节省及回本周期。看看升级是否值得。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 变频冷气节省计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("变频冷气节省计算器"),
    description: "非变频 vs 变频 — 节省与回本周期一键计算。",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function ZhSavingsCalculatorPage() {
  const c = getToolContent("savings", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<SavingsCalculator lang="zh" />}
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
