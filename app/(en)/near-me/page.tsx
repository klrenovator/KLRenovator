import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NearMeClient from "./near-me-client";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Service Near Me — KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("Aircond service near you in KL & Selangor. Trained HVAC technicians, same-day slots, transparent pricing, all 20 brands. Chemical wash from RM 120. WhatsApp us."),
  alternates: buildTrilingualHreflang("/near-me"),
  openGraph: {
    title: clampMetaTitle("Aircond Service Near Me — KL & Selangor | KL Renovator"),
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/near-me",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator aircond technician — local service across KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Service Near Me — KL & Selangor | KL Renovator"),
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands.",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function NearMePage() {
  return <NearMeClient initialLang="en" />;
}
