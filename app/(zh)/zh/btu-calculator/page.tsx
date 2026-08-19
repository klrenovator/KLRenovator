import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";
import { ToolLinks } from "@/components/calculators/tool-links";

export const metadata: Metadata = {
  title: clampMetaTitle("马来西亚冷气马力计算器 | BTU 计算工具"),
  description:
    padMetaDescription("免费马来西亚冷气马力（HP）与 BTU 尺寸计算器。根据房间大小、西晒情况及人数，精准计算您所需要的冷气大小与安装价格估算。"),
  alternates: buildTrilingualHreflang("/btu-calculator", "zh"),
  // og:locale was inherited from the root layout as en_MY, so Facebook,
  // WhatsApp and LinkedIn previews announced this localized page as English.
  openGraph: {
    url: "https://www.klrenovator.com/zh/btu-calculator",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/sharp-aircond-basic-servicing-cheras-115.webp",
      width: 1200,
      height: 630,
      alt: "冷气 BTU 与马力尺寸计算器 — KL Renovator",
    }],
  },
};

export default function BtuCalculatorPageZH() {
  return (
    <>
      <BtuCalculator lang="zh" />
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="zh" heading="免费冷气计算工具" />
        </div>
      </section>
    </>
  );
}
