import type { Metadata } from "next";
import { AreasClient } from "./areas-client";

export const metadata: Metadata = {
  title: "Aircond Service Areas — KL & Selangor | KL Renovator",
  description:
    "KL Renovator provides professional aircond servicing across all areas of Kuala Lumpur and Selangor. Same-day service. View all 38 service areas — Petaling Jaya, Cheras, Shah Alam, Subang, Ampang, Puchong, Klang, Kajang, Bangsar, Mont Kiara and more.",
  keywords: [
    "aircond service KL areas",
    "aircond service Selangor areas",
    "aircond service near me KL",
    "servis aircond kawasan KL",
    "servis aircond Selangor",
    "冷气服务地区吉隆坡",
    "冷气服务雪兰莪",
    "KL Renovator service areas",
    "aircond Klang Valley coverage",
  ].join(", "),
  openGraph: {
    title: "Aircond Service Areas — KL & Selangor | KL Renovator",
    description:
      "Professional aircond servicing across all KL & Selangor areas. Same-day available. 38 areas covered.",
    url: "https://www.klrenovator.com/areas",
    type: "website",
  },
  alternates: {
    canonical: "https://www.klrenovator.com/areas",
  },
};

const areaHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.klrenovator.com/areas#page",
  name: "Aircond Service Areas — KL & Selangor",
  description:
    "KL Renovator provides professional aircond servicing across all areas of Kuala Lumpur and Selangor. View all 38 service areas.",
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
      <AreasClient />
    </>
  );
}
