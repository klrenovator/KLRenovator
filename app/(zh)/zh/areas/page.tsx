import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription, padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { AreasClient } from "@/app/(en)/areas/areas-client";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气服务区域 KL & Selangor | KL Renovator"),
  description: padMetaDescription("KL Renovator 服务吉隆坡和雪兰莪39个区域 — 八打灵再也、蕉赖、莎阿南、梳邦、安邦、蒲种等。当天服务。"),
  openGraph: {
    title: clampMetaTitle("冷气服务区域 KL & Selangor | KL Renovator"),
    description: clampMetaDescription("吉隆坡和雪兰莪所有区域的专业冷气服务。当天可用。覆盖38个区域。"),
    url: "https://www.klrenovator.com/zh/areas",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/acson-aircond-chemical-overhaul-puchong-38.webp",
      width: 1200,
      height: 630,
      alt: "吉隆坡与雪兰莪冷气服务区域 — KL Renovator",
    }],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/zh/areas",
    languages: {
      "en-MY": "https://www.klrenovator.com/areas",
      "ms-MY": "https://www.klrenovator.com/ms/areas",
      "zh-MY": "https://www.klrenovator.com/zh/areas",
      "x-default": "https://www.klrenovator.com/areas",
    },
  },
};

export default function AreasPageZH() {
  return <AreasClient forcedLang="zh" />;
}
