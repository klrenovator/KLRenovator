import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ReviewPageI18n } from "@/components/review-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("Thank You — Rate Your KL Renovator Service | KL Renovator"),
  description:
    "Thank you for choosing KL Renovator. We hope your aircond is working perfectly. If you're happy with the service, we'd love a quick Google review!",
  alternates: {
    canonical: "https://www.klrenovator.com/review",
    languages: {
      "en-MY": "https://www.klrenovator.com/review",
      "ms-MY": "https://www.klrenovator.com/ms/review",
      "zh-MY": "https://www.klrenovator.com/zh/review",
      "x-default": "https://www.klrenovator.com/review",
    },
  },
  robots: { index: false }, // No-index — internal conversion page
};

export default function ReviewPage() {
  return <ReviewPageI18n lang="en" />;
}
