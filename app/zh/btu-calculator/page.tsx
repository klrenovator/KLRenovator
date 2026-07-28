import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { BtuCalculator } from "@/components/btu-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("马来西亚冷气马力计算器 | BTU 计算工具"),
  description:
    "免费马来西亚冷气马力（HP）与 BTU 尺寸计算器。根据房间大小、西晒情况及人数，精准计算您所需要的冷气大小与安装价格估算。",
  alternates: buildTrilingualHreflang("/btu-calculator"),
};

export default function BtuCalculatorPageZH() {
  return <BtuCalculator lang="zh" />;
}
