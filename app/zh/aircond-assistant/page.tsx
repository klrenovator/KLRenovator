import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { AiAssistant } from "@/components/ai-assistant";
import { getToolContent } from "@/config/tool-content";

const PAGE_URL = "https://www.klrenovator.com/zh/aircond-assistant";

export const metadata: Metadata = {
  title: clampMetaTitle("AI 冷气专家助手 — 免费24/7冷气咨询"),
  description:
    "向KL Renovator的AI冷气专家提问：安装费用、加气价格、匹数推荐、服务建议、故障排除和预约帮助。基于我们真实的2026年定价训练。",
  alternates: buildTrilingualHreflang("/aircond-assistant", "zh"),
  openGraph: {
    title: clampMetaTitle("AI 冷气专家助手 — 免费24/7咨询"),
    description: "面向吉隆坡和雪兰莪的免费AI冷气助手 — 即时价格、安装报价、匹数推荐和预约帮助。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — AI 冷气专家助手",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("AI 冷气专家助手 — 免费24/7咨询"),
    description: "即时冷气价格、报价与服务建议 — 免费AI助手。",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function ZhAiAssistantPage() {
  const c = getToolContent("assistant", "zh");
  return (
    <ToolPageLayout
      lang="zh"
      eyebrow={c.eyebrow}
      h1={c.h1}
      intro={c.intro}
      calculator={<AiAssistant lang="zh" />}
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
