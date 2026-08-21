import type { Metadata } from "next";

import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { CommercialHubPage } from "@/components/commercial-hub-page";
import { COMMERCIAL_META } from "@/config/commercial-iaq-content";

const EN = "https://www.klrenovator.com/commercial-aircond-service";
const MS = "https://www.klrenovator.com/ms/servis-aircond-komersial";
const ZH = "https://www.klrenovator.com/zh/commercial-aircond-service";

export const metadata: Metadata = {
  title: COMMERCIAL_META.title.ms,
  description: padMetaDescription(COMMERCIAL_META.description.ms),
  openGraph: {
    title: COMMERCIAL_META.title.ms,
    description: COMMERCIAL_META.description.ms,
    type: "website",
    locale: "ms_MY",
    url: MS,
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp", width: 1200, height: 630, alt: "Servis aircond komersial di KL & Selangor — KL Renovator" }],
  },
  twitter: { card: "summary_large_image", title: COMMERCIAL_META.title.ms, description: COMMERCIAL_META.description.ms, images: ["https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp"] },
  alternates: { canonical: MS, languages: { "en-MY": EN, "ms-MY": MS, "zh-MY": ZH, "x-default": EN } },
};

export default function Page() {
  return <CommercialHubPage locale="ms" />;
}
