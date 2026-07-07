import type { Metadata } from "next";
import NearMeClient from "@/app/near-me/near-me-client";

export const metadata: Metadata = {
  title: "Servis Aircond Berdekatan — KL & Selangor | KL Renovator",
  description:
    "Mencari servis aircond berdekatan anda? KL Renovator menghantar juruteknik HVAC terlatih ke seluruh Kuala Lumpur & Selangor — slot hari sama, harga telus, semua jenama. WhatsApp +60182983573.",
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
    title: "Servis Aircond Berdekatan — KL & Selangor | KL Renovator",
    description:
      "Servis aircond tempatan di seluruh KL & Selangor. Slot hari sama, cuci kimia dari RM 120, semua jenama. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/ms/near-me",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp",
        width: 1200,
        height: 630,
        alt: "Juruteknik aircond KL Renovator — servis tempatan seluruh KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servis Aircond Berdekatan — KL & Selangor | KL Renovator",
    description:
      "Servis aircond tempatan di seluruh KL & Selangor. Slot hari sama, cuci kimia dari RM 120, semua jenama.",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp"],
  },
};

export default function NearMePageMS() {
  return <NearMeClient initialLang="ms" />;
}
