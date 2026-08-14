import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import NearMeClient from "@/app/(en)/near-me/near-me-client";

export const metadata: Metadata = {
  title: clampMetaTitle("附近冷气服务 — 吉隆坡及雪兰莪 | KL Renovator"),
  description:
    padMetaDescription("寻找您附近的专业冷气服务？KL Renovator 派遣专业训练的空调技术团队覆盖吉隆坡与雪兰莪全区 — 提供当天上门、明码实价、服务所有冷气品牌。欢迎 WhatsApp +60182983573 咨询。"),
  alternates: {
    canonical: "https://www.klrenovator.com/zh/near-me",
    languages: {
      "en-MY": "https://www.klrenovator.com/near-me",
      "ms-MY": "https://www.klrenovator.com/ms/near-me",
      "zh-MY": "https://www.klrenovator.com/zh/near-me",
      "x-default": "https://www.klrenovator.com/near-me",
    },
  },
  openGraph: {
    title: clampMetaTitle("附近冷气服务 — 吉隆坡及雪兰莪 | KL Renovator"),
    description:
      "吉隆坡与雪兰莪全区本地上门冷气服务。提供当天预约，挂壁式高压药水清洗从 RM 120 起，服务各品牌。欢迎 WhatsApp +60182983573。",
    url: "https://www.klrenovator.com/zh/near-me",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator 冷气专业技术人员 — 覆盖吉隆坡与雪兰莪全区服务",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("附近冷气服务 — 吉隆坡及雪兰莪 | KL Renovator"),
    description:
      "吉隆坡与雪兰莪全区本地上门冷气服务。当天时段可约，高压药水清洗从 RM 120 起。",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp"],
  },
};

export default function NearMePageZH() {
  return <NearMeClient initialLang="zh" />;
}
