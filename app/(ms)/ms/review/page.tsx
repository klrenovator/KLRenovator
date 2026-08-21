import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ReviewPageI18n } from "@/components/review-page-i18n";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

export const metadata: Metadata = {
  title: clampMetaTitle("Terima Kasih — Nilaikan Servis KL Renovator Anda | KL Renovator"),
  description:
    padMetaDescription("Terima kasih kerana memilih KL Renovator. Kami harap aircond anda berfungsi dengan sempurna. Jika anda berpuas hati dengan servis, kami ingin ulasan Google ringkas!"),
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
  // og:locale was inherited from the root layout as en_MY, so Facebook,
  // WhatsApp and LinkedIn previews announced this localized page as English.
  openGraph: {
    url: "https://www.klrenovator.com/ms/review",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/toshiba-aircond-gas-topup-rawang-141.webp",
      width: 1200,
      height: 630,
      alt: "Ulasan pelanggan servis aircond KL Renovator",
    }],
  },
};

export default function ReviewPageMS() {
  return (
    <>
      <ReviewPageI18n lang="ms" />
      <section className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <PrimaryJobPhoto
            seed="https://www.klrenovator.com/ms/review"
            pageUrl="https://www.klrenovator.com/ms/review"
            title="Terima Kasih — Nilaikan Servis KL Renovator Anda"
            locale="ms"
            hints={["basic-servicing"]}
            sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
