import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { AreasClient } from "@/app/(en)/areas/areas-client";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气服务区域 KL & Selangor | KL Renovator"),
  description: clampMetaDescription("KL Renovator 服务吉隆坡和雪兰莪39个区域 — 八打灵再也、蕉赖、莎阿南、梳邦、安邦、蒲种等。当天服务。"),
  openGraph: {
    title: clampMetaTitle("冷气服务区域 KL & Selangor | KL Renovator"),
    description: clampMetaDescription("吉隆坡和雪兰莪所有区域的专业冷气服务。当天可用。覆盖38个区域。"),
    url: "https://www.klrenovator.com/zh/areas",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
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
