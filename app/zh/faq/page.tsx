import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { FaqPageI18n } from "@/components/faq-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("常见问答 | 冷气服务 吉隆坡及雪兰莪 — KL Renovator"),
  description:
    "关于冷气服务、收费、保修及覆盖范围（吉隆坡及雪兰莪）的常见问答。化学清洗起价 RM 120。可提供当天服务。",
  alternates: {
    canonical: "https://www.klrenovator.com/zh/faq",
    languages: {
      "en-MY": "https://www.klrenovator.com/faq",
      "ms-MY": "https://www.klrenovator.com/ms/faq",
      "zh-MY": "https://www.klrenovator.com/zh/faq",
      "x-default": "https://www.klrenovator.com/faq",
    },
  },
  openGraph: {
    title: clampMetaTitle("常见问答 | 冷气服务 吉隆坡及雪兰莪 — KL Renovator"),
    description:
      "关于冷气服务收费、化学清洗、充冷媒、保修及覆盖范围的 honest 解答。WhatsApp 联系我们获取当天报价。",
    url: "https://www.klrenovator.com/zh/faq",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator 常见问答 — 冷气服务 吉隆坡及雪兰莪",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("常见问答 | 冷气服务 吉隆坡及雪兰莪 — KL Renovator"),
    description: "关于冷气服务收费、保修及覆盖范围的 honest 解答。WhatsApp 联系获取当天报价。",
    images: ["https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp"],
  },
};

export default function FaqPageZH() {
  return <FaqPageI18n lang="zh" />;
}
