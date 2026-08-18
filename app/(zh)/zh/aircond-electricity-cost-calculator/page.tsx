import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { ElectricityCalculator } from "@/components/calculators/electricity-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-electricity-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气电费计算器 — 马来西亚"),
  description:
    padMetaDescription("马来西亚免费冷气电费计算器。按匹数、每日使用小时数和电费费率估算每月冷气耗电量和国能账单。对比变频节省。"),
  alternates: buildTrilingualHreflang("/aircond-electricity-cost-calculator", "zh"),
  openGraph: {
    title: clampMetaTitle("冷气电费计算器 — 马来西亚"),
    description: "按匹数和使用小时数估算每月冷气电费 — 并了解变频机能节省多少。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 冷气电费计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("冷气电费计算器"),
    description: "按匹数与使用情况估算每月冷气电费。",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function ZhElectricityCostCalculatorPage() {
  const c = getToolContent("electricity", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<ElectricityCalculator lang="zh" />}
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
