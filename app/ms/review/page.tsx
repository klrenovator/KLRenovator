import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ReviewPageI18n } from "@/components/review-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("Terima Kasih — Nilaikan Servis KL Renovator Anda | KL Renovator"),
  description:
    "Terima kasih kerana memilih KL Renovator. Kami harap aircond anda berfungsi dengan sempurna. Jika anda berpuas hati dengan servis, kami ingin ulasan Google ringkas!",
  alternates: {
    canonical: "https://www.klrenovator.com/ms/review",
    languages: {
      "en-MY": "https://www.klrenovator.com/review",
      "ms-MY": "https://www.klrenovator.com/ms/review",
      "zh-MY": "https://www.klrenovator.com/zh/review",
      "x-default": "https://www.klrenovator.com/review",
    },
  },
  robots: { index: false },
};

export default function ReviewPageMS() {
  return <ReviewPageI18n lang="ms" />;
}
