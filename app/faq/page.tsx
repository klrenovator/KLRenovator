import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { FaqPageI18n } from "@/components/faq-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("FAQ | Aircond Services KL & Selangor — KL Renovator"),
  description:
    "Frequently asked questions about aircond services, pricing, warranty & coverage areas in KL & Selangor. Chemical wash from RM 120. Same-day service available.",
  alternates: buildTrilingualHreflang("/faq"),
  openGraph: {
    title: clampMetaTitle("FAQ | Aircond Services KL & Selangor — KL Renovator"),
    description:
      "Honest answers about aircond service pricing, chemical wash, gas top-up, warranty & coverage. WhatsApp us for same-day quotes.",
    url: "https://www.klrenovator.com/faq",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator FAQ — Aircond Services KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("FAQ | Aircond Services KL & Selangor — KL Renovator"),
    description: "Honest answers about aircond service pricing, warranty & coverage. WhatsApp for same-day quotes.",
    images: ["https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp"],
  },
};

export default function FaqPage() {
  return <FaqPageI18n lang="en" />;
}
