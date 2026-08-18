import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolsHub } from "@/components/calculators/tools-hub";

const PAGE_URL = "https://www.klrenovator.com/zh/tools";

export const metadata: Metadata = {
  title: clampMetaTitle("免费冷气计算器与工具 — 马来西亚"),
  description:
    padMetaDescription("马来西亚免费冷气计算器：安装费用、加气费用、BTU与匹数、冷气尺寸、电费、变频节省与服务推荐。KL Renovator即时估算。"),
  alternates: buildTrilingualHreflang("/tools", "zh"),
  openGraph: {
    title: clampMetaTitle("免费冷气计算器与工具"),
    description:
      "6个免费冷气计算器：安装费用、加气、BTU/匹数、尺寸、电费和变频节省。即时、准确、移动端友好。",
    url: PAGE_URL,
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator — 免费冷气计算器与工具",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("免费冷气计算器与工具"),
    description: "安装费用、加气、BTU、尺寸、电费和节省计算器 — 免费。",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function ZhToolsPage() {
  return <ToolsHub lang="zh" />;
}
