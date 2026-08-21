import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ReviewPageI18n } from "@/components/review-page-i18n";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

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
  return (
    <>
      <ReviewPageI18n lang="en" />
      <section className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <PrimaryJobPhoto
            seed="https://www.klrenovator.com/review"
            pageUrl="https://www.klrenovator.com/review"
            title="Thank You — Rate Your KL Renovator Service"
            locale="en"
            hints={["basic-servicing"]}
            sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
