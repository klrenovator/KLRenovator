import type { Metadata } from "next";
import { GalleryPageI18n } from "@/components/gallery-page-i18n";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Aircond Project Gallery — Real Work by KL Renovator | KL & Selangor",
  description:
    "Real aircond installation, chemical wash, overhaul & repair project photos by KL Renovator across KL & Selangor. 100% genuine — no stock images.",
  openGraph: {
    title: "Project Gallery — KL Renovator Real Aircon Works",
    description: "Real project photos: installations, chemical wash, overhaul, commercial HVAC & repairs across KL & Selangor. 100% genuine photos.",
    url: "https://www.klrenovator.com/gallery",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      { url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630, alt: "KL Renovator Aircond Project Gallery" },
    ],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/gallery",
    languages: {
      "en-MY": "https://www.klrenovator.com/gallery",
      "ms-MY": "https://www.klrenovator.com/ms/gallery",
      "zh-MY": "https://www.klrenovator.com/zh/gallery",
      "x-default": "https://www.klrenovator.com/gallery",
    },
  },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.klrenovator.com" },
          { name: "Gallery", url: "https://www.klrenovator.com/gallery" },
        ]}
      />
      <GalleryPageI18n lang="en" />
    </>
  );
}
