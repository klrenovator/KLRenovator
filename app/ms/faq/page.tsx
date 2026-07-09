import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { FaqPageI18n } from "@/components/faq-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("Soalan Lazim | Servis Aircond KL & Selangor — KL Renovator"),
  description:
    "Soalan lazim mengenai servis aircond, harga, waranti & kawasan liputan di KL & Selangor. Cuci kimia dari RM 120. Servis hari sama tersedia.",
  alternates: {
    canonical: "https://www.klrenovator.com/ms/faq",
    languages: {
      "en-MY": "https://www.klrenovator.com/faq",
      "ms-MY": "https://www.klrenovator.com/ms/faq",
      "zh-MY": "https://www.klrenovator.com/zh/faq",
      "x-default": "https://www.klrenovator.com/faq",
    },
  },
  openGraph: {
    title: clampMetaTitle("Soalan Lazim | Servis Aircond KL & Selangor — KL Renovator"),
    description:
      "Jawapan jujur mengenai harga servis aircond, cuci kimia, tambah gas, waranti & kawasan liputan. WhatsApp kami untuk sebut harga hari sama.",
    url: "https://www.klrenovator.com/ms/faq",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp",
        width: 1200,
        height: 630,
        alt: "Soalan Lazim KL Renovator — Servis Aircond KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Soalan Lazim | Servis Aircond KL & Selangor — KL Renovator"),
    description: "Jawapan jujur mengenai harga servis aircond, waranti & kawasan liputan. WhatsApp untuk sebut harga hari sama.",
    images: ["https://www.klrenovator.com/hero/aircond-gas-topup-r32-r410a-selangor.webp"],
  },
};

export default function FaqPageMS() {
  return <FaqPageI18n lang="ms" />;
}
