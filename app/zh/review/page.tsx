import type { Metadata } from "next";
import { ReviewPageI18n } from "@/components/review-page-i18n";

export const metadata: Metadata = {
  title: "感谢您 — 为 KL Renovator 的服务评分 | KL Renovator",
  description:
    "感谢您选择 KL Renovator。我们希望您的冷气运行完美。如果您对服务满意，我们很乐意收到您的一个简短 Google 评价！",
  alternates: {
    canonical: "https://www.klrenovator.com/zh/review",
    languages: {
      "en-MY": "https://www.klrenovator.com/review",
      "ms-MY": "https://www.klrenovator.com/ms/review",
      "zh-MY": "https://www.klrenovator.com/zh/review",
      "x-default": "https://www.klrenovator.com/review",
    },
  },
  robots: { index: false },
};

export default function ReviewPageZH() {
  return <ReviewPageI18n lang="zh" />;
}
