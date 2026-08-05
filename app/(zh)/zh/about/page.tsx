import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { AboutPageI18n } from "@/components/about-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("关于 KL Renovator | 值得信赖的吉隆坡及雪兰莪冷气专家"),
  description:
    "KL Renovator（Multicore Dynamics Resources）—— 值得信赖的吉隆坡及雪兰莪冷气专家。12 年以上经验，5,000 多位满意客户，500 多条好评。",
  alternates: {
    canonical: "https://www.klrenovator.com/zh/about",
    languages: {
      "en-MY": "https://www.klrenovator.com/about",
      "ms-MY": "https://www.klrenovator.com/ms/about",
      "zh-MY": "https://www.klrenovator.com/zh/about",
      "x-default": "https://www.klrenovator.com/about",
    },
  },
  openGraph: {
    title: clampMetaTitle("关于 KL Renovator | 值得信赖的吉隆坡及雪兰莪冷气专家"),
    description:
      "KL Renovator（Multicore Dynamics Resources）—— 12 年以上 HVAC 专业经验，5,000 多位满意客户，500 多条五星好评。专业冷气服务，覆盖吉隆坡及雪兰莪全区。",
    url: "https://www.klrenovator.com/zh/about",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "关于 KL Renovator — 值得信赖的吉隆坡及雪兰莪冷气专家",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("关于 KL Renovator | 值得信赖的吉隆坡及雪兰莪冷气专家"),
    description: "12 年以上 HVAC 专业经验，5,000 多位满意客户，500 多条五星好评。专业冷气服务，覆盖吉隆坡及雪兰莪全区。",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function AboutPageZH() {
  return <AboutPageI18n lang="zh" />;
}
