import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import NearMeClient from "@/app/(en)/near-me/near-me-client";

export const metadata: Metadata = {
  title: clampMetaTitle("Servis Aircond Berdekatan — KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("Servis aircond berdekatan anda di KL & Selangor. Juruteknik HVAC terlatih, slot hari sama, harga telus, semua 20 jenama. Cuci kimia dari RM 120. WhatsApp kami."),
  alternates: {
    canonical: "https://www.klrenovator.com/ms/near-me",
    languages: {
      "en-MY": "https://www.klrenovator.com/near-me",
      "ms-MY": "https://www.klrenovator.com/ms/near-me",
      "zh-MY": "https://www.klrenovator.com/zh/near-me",
      "x-default": "https://www.klrenovator.com/near-me",
    },
  },
  openGraph: {
    title: clampMetaTitle("Servis Aircond Berdekatan — KL & Selangor | KL Renovator"),
    description:
      "Servis aircond tempatan di seluruh KL & Selangor. Slot hari sama, cuci kimia dari RM 120, semua jenama. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/ms/near-me",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp",
        width: 1200,
        height: 630,
        alt: "Juruteknik aircond KL Renovator — servis tempatan seluruh KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Servis Aircond Berdekatan — KL & Selangor | KL Renovator"),
    description:
      "Servis aircond tempatan di seluruh KL & Selangor. Slot hari sama, cuci kimia dari RM 120, semua jenama.",
    images: ["https://www.klrenovator.com/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp"],
  },
};

export default function NearMePageMS() {
  return <NearMeClient initialLang="ms" />;
}
