import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { GalleryPageI18n } from "@/components/gallery-page-i18n";
import { GALLERY_ITEMS, GALLERY_INITIAL_COUNT } from "@/config/gallery-items";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Project Gallery — Real Work by KL Renovator | KL & Selangor"),
  description:
    padMetaDescription("Real aircond installation, chemical wash, overhaul & repair project photos by KL Renovator across KL & Selangor. 100% genuine — no stock images."),
  openGraph: {
    title: clampMetaTitle("Project Gallery — KL Renovator Real Aircon Works"),
    description: "Real project photos: installations, chemical wash, overhaul, commercial HVAC & repairs across KL & Selangor. 100% genuine photos.",
    url: "https://www.klrenovator.com/gallery",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      { url: "https://www.klrenovator.com/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp", width: 1200, height: 630, alt: "KL Renovator Aircond Project Gallery" },
    ],
  },
  alternates: buildTrilingualHreflang("/gallery"),
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
      <GalleryPageI18n lang="en" initialItems={GALLERY_ITEMS.slice(0, GALLERY_INITIAL_COUNT)} />
    </>
  );
}
