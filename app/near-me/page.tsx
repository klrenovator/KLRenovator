import type { Metadata } from "next";
import NearMeClient from "./near-me-client";

export const metadata: Metadata = {
  title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
  description:
    "Looking for aircond service near you? KL Renovator sends trained HVAC technicians across Kuala Lumpur & Selangor — same-day slots, transparent pricing, all brands. WhatsApp +60182983573.",
  alternates: {
    canonical: "https://www.klrenovator.com/near-me",
    languages: {
      "en-MY": "https://www.klrenovator.com/near-me",
      "ms-MY": "https://www.klrenovator.com/near-me",
      "zh-MY": "https://www.klrenovator.com/near-me",
      "x-default": "https://www.klrenovator.com/near-me",
    },
  },
  openGraph: {
    title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/near-me",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator aircond technician — local service across KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands.",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp"],
  },
};

export default function NearMePage() {
  return <NearMeClient />;
}
