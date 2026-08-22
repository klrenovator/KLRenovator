import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { ReviewPageI18n } from "@/components/review-page-i18n";
import { PrimaryJobPhoto } from "@/components/primary-job-photo";

export const metadata: Metadata = {
  title: clampMetaTitle("感谢您选择 KL Renovator | KL Renovator"),
  description:
    padMetaDescription("感谢您选择 KL Renovator。我们希望您的冷气运行完美。如果您对服务满意，我们很乐意收到您的一个简短 Google 评价！"),
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
  // og:locale was inherited from the root layout as en_MY, so Facebook,
  // WhatsApp and LinkedIn previews announced this localized page as English.
  openGraph: {
    url: "https://www.klrenovator.com/zh/review",
    type: "website",
    locale: "zh_MY",
    alternateLocale: ["en_MY", "ms_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/toshiba-aircond-gas-topup-rawang-141.webp",
      width: 1200,
      height: 630,
      alt: "KL Renovator 冷气服务客户评价",
    }],
  },
};

export default function ReviewPageZH() {
  return (
    <>
      <ReviewPageI18n lang="zh" />
      <section className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <PrimaryJobPhoto
            seed="https://www.klrenovator.com/zh/review"
            pageUrl="https://www.klrenovator.com/zh/review"
            title="感谢您 — 为 KL Renovator 的服务评分"
            locale="zh"
            hints={["basic-servicing"]}
            sizes="(min-width: 1024px) 672px, (min-width: 640px) 80vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
