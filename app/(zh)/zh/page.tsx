import Home from "@/app/(en)/page";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "吉隆坡与雪兰莪专业冷气服务 | KL Renovator",
  description: padMetaDescription("吉隆坡与雪兰莪的冷气安装、清洗和维修专家。价格透明，1个月保修，提供当天服务。"),
  alternates: {
    canonical: "https://www.klrenovator.com/zh",
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com/ms",
      "zh-MY": "https://www.klrenovator.com/zh",
      "x-default": "https://www.klrenovator.com",
    },
  },
  openGraph: {
    title: "吉隆坡与雪兰莪专业冷气服务 | KL Renovator",
    description: "吉隆坡与雪兰莪的冷气安装、清洗和维修专家。价格透明，1个月保修，提供当天服务。",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    url: "https://www.klrenovator.com/zh",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/hero/york-aircond-chemical-wash-puchong-37.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator - 吉隆坡与雪兰莪冷气专家",
      },
    ],
  },
};

export default function HomeZH() {
  return <Home locale="zh" />;
}
