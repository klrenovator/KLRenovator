import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { InstallationCostCalculator } from "@/components/calculators/installation-cost-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-installation-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气安装费用计算器 — 马来西亚"),
  description:
    "马来西亚免费冷气安装费用计算器。估算人工、铜管、电线、排水管、支架、开关和水泵费用，自动套用批量折扣。获取KL Renovator正式报价。",
  alternates: buildTrilingualHreflang("/aircond-installation-cost-calculator", "zh"),
  openGraph: {
    title: clampMetaTitle("冷气安装费用计算器 — 马来西亚"),
    description: "即时估算冷气安装费用 — 人工、铜管、电线、排水管、支架等。安装从RM 199起。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 冷气安装费用计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("冷气安装费用计算器 — 马来西亚"),
    description: "即时冷气安装费用估算 — 人工与材料，含批量折扣。",
    images: ["https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp"],
  },
};

export default function ZhInstallationCostCalculatorPage() {
  const c = getToolContent("installation", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<InstallationCostCalculator lang="zh" />}
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
