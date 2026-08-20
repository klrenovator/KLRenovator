import type { Metadata } from "next";
import { TopicHubPage } from "@/components/topic-hub-page";
import { TOPIC_HUBS } from "@/config/topic-hubs";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const t = TOPIC_HUBS.maintenance.copy.en;

export const metadata: Metadata = {
  title: clampMetaTitle(t.metaTitle),
  description: padMetaDescription(t.metaDescription),
  alternates: buildTrilingualHreflang("/maintenance"),
  openGraph: {
    title: clampMetaTitle(t.metaTitle),
    description: padMetaDescription(t.metaDescription),
    url: "https://www.klrenovator.com/maintenance",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/hero/acson-aircond-chemical-wash-shah-alam-49.webp",
        width: 1200,
        height: 630,
        alt: "Aircond maintenance & servicing guides KL & Selangor — KL Renovator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle(t.metaTitle),
    description: padMetaDescription(t.metaDescription),
    images: ["https://www.klrenovator.com/hero/acson-aircond-chemical-wash-shah-alam-49.webp"],
  },
};

export default function Page() {
  return <TopicHubPage hubId="maintenance" locale="en" />;
}
