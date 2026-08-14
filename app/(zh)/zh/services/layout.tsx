import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("冷气服务与价格表 KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("吉隆坡及雪兰莪冷气服务价格表 — 化学清洗从RM 120起，大修从RM 220起，加气与安装。无隐藏费用。"),
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
  return (
    <>
      {children}
      {/* Free calculator tools — internal linking on every service page */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="zh" heading="免费冷气计算工具" />
        </div>
      </section>
    </>
  );
}
