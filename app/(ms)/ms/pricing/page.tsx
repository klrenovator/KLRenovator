import type { Metadata } from "next";
import { TopicHubPage } from "@/components/topic-hub-page";
import { TOPIC_HUBS } from "@/config/topic-hubs";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const t = TOPIC_HUBS.pricing.copy.ms;

export const metadata: Metadata = {
  title: clampMetaTitle(t.metaTitle),
  description: padMetaDescription(t.metaDescription),
  alternates: buildTrilingualHreflang("/pricing", "ms"),
  openGraph: {
    title: clampMetaTitle(t.metaTitle),
    description: padMetaDescription(t.metaDescription),
    url: "https://www.klrenovator.com/ms/pricing",
    type: "website",
    locale: "ms_MY",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
        width: 1200,
        height: 630,
        alt: "Harga servis aircond KL & Selangor — KL Renovator",
      },
    ],
  },
};

export default function Page() {
  return <TopicHubPage hubId="pricing" locale="ms" />;
}
