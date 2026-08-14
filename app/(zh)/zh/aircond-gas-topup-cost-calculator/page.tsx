import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { GasTopupCalculator } from "@/components/calculators/gas-topup-calculator";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-gas-topup-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气加气费用计算器 — 马来西亚"),
  description:
    padMetaDescription("马来西亚免费冷气加气费用计算器。按匹数和气体状况估算R22、R410A和R32加气价格。每PSI RM 2.50–3.00。最终费用检查后确认。"),
  alternates: buildTrilingualHreflang("/aircond-gas-topup-cost-calculator", "zh"),
  openGraph: {
    title: clampMetaTitle("冷气加气费用计算器 — 马来西亚"),
    description: "即时估算冷气加气费用 — R22每PSI RM 2.50，R410A和R32每PSI RM 3.00。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 冷气加气费用计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("冷气加气费用计算器 — 马来西亚"),
    description: "按匹数估算R22、R410A和R32加气价格 — 每PSI RM 2.50起。",
    images: ["https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp"],
  },
};

export default function ZhGasTopupCostCalculatorPage() {
  const c = getToolContent("gas", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<GasTopupCalculator lang="zh" />}
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
