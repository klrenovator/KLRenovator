import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { AreasClient } from "./areas-client";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Service Areas — KL & Selangor | KL Renovator"),
  description:
    padMetaDescription("KL Renovator services 39 areas across Kuala Lumpur & Selangor — Petaling Jaya, Cheras, Shah Alam, Subang, Ampang, Puchong & more. Same-day service."),
  openGraph: {
    title: clampMetaTitle("Aircond Service Areas — KL & Selangor | KL Renovator"),
    description:
      "Professional aircond servicing across all KL & Selangor areas. Same-day available. 38 areas covered.",
    url: "https://www.klrenovator.com/areas",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [{
      url: "https://www.klrenovator.com/hero/acson-aircond-chemical-overhaul-puchong-38.webp",
      width: 1200,
      height: 630,
      alt: "Aircond service areas across Kuala Lumpur and Selangor — KL Renovator",
    }],
  },
  alternates: buildTrilingualHreflang("/areas"),
};

const areaHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.klrenovator.com/areas#page",
  name: "Aircond Service Areas — KL & Selangor",
  description:
    padMetaDescription("KL Renovator provides professional aircond servicing across all areas of Kuala Lumpur and Selangor. View all 38 service areas."),
  url: "https://www.klrenovator.com/areas",
  provider: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: "KL Renovator",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klrenovator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: "https://www.klrenovator.com/areas",
      },
    ],
  },
};

export default function AreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaHubSchema) }}
      />
      <AreasClient forcedLang="en" />
    </>
  );
}
