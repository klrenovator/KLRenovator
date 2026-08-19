import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ReviewPageI18n } from "@/components/review-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("Thank You — Rate Your KL Renovator Service | KL Renovator"),
  description:
    padMetaDescription("Thank you for choosing KL Renovator. We hope your aircond is working perfectly. If you're happy with the service, we'd love a quick Google review!"),
  openGraph: {
    type: "website",
    locale: "en_MY",
    images: [{
      url: "https://www.klrenovator.com/hero/toshiba-aircond-gas-topup-rawang-141.webp",
      width: 1200,
      height: 630,
      alt: "Customer reviews of KL Renovator aircond services",
    }],
  },
  alternates: buildTrilingualHreflang("/review"),
  robots: { index: false }, // No-index — internal conversion page
};

export default function ReviewPage() {
  return <ReviewPageI18n lang="en" />;
}
