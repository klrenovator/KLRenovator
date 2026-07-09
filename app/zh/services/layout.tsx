import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气服务与价格表 KL & Selangor | KL Renovator"),
  description:
    "吉隆坡及雪兰莪冷气服务价格表 — 化学清洗从RM 120起，大修从RM 220起，加气与安装。无隐藏费用。",
  alternates: {
    canonical: "https://www.klrenovator.com/zh/services",
    languages: {
      "en-MY": "https://www.klrenovator.com/services",
      "ms-MY": "https://www.klrenovator.com/ms/services",
      "zh-MY": "https://www.klrenovator.com/zh/services",
      "x-default": "https://www.klrenovator.com/services",
    },
  },
  openGraph: {
    title: clampMetaTitle("冷气服务与价格表 | KL Renovator"),
    description: "化学清洗、大修、加气、安装与维修 — 完整价格表。",
    url: "https://www.klrenovator.com/zh/services",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
  },
};

export default function ZhServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
