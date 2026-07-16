import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("BTU 计算器 | 找到完美的冷气尺寸 — KL Renovator"),
  description:
    "免费 BTU 计算器——为您的房间找到确切需要的冷气匹数。即时获取安装费用估算。当天安装服务 RM 199 起。",
  alternates: buildTrilingualHreflang("/btu-calculator"),
};

export default function BtuCalculatorPageZH() {
  return <BtuCalculator lang="zh" />;
}
