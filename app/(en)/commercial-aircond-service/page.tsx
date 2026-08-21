import type { Metadata } from "next";

import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { CommercialHubPage } from "@/components/commercial-hub-page";
import { COMMERCIAL_META } from "@/config/commercial-iaq-content";

const EN = "https://www.klrenovator.com/commercial-aircond-service";
const MS = "https://www.klrenovator.com/ms/servis-aircond-komersial";
const ZH = "https://www.klrenovator.com/zh/commercial-aircond-service";

export const metadata: Metadata = {
  title: COMMERCIAL_META.title.en,
  description: padMetaDescription(COMMERCIAL_META.description.en),
  openGraph: {
    title: COMMERCIAL_META.title.en,
    description: COMMERCIAL_META.description.en,
    type: "website",
    locale: "en_MY",
    url: EN,
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp", width: 1200, height: 630, alt: "Commercial aircond servicing in KL & Selangor — KL Renovator" }],
  },
  twitter: { card: "summary_large_image", title: COMMERCIAL_META.title.en, description: COMMERCIAL_META.description.en, images: ["https://www.klrenovator.com/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp"] },
  alternates: { canonical: EN, languages: { "en-MY": EN, "ms-MY": MS, "zh-MY": ZH, "x-default": EN } },
};

export default function Page() {
  return <CommercialHubPage locale="en" />;
}
