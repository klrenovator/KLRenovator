import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { GalleryPageI18n } from "@/components/gallery-page-i18n";
import { GALLERY_ITEMS, GALLERY_INITIAL_COUNT } from "@/config/gallery-items";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: clampMetaTitle("Galeri Projek Aircond — Kerja Sebenar KL Renovator | KL & Selangor"),
  description:
    padMetaDescription("Gambar projek sebenar pemasangan, cuci kimia, overhaul & pembaikan aircond oleh KL Renovator di seluruh KL & Selangor. 100% tulen — tiada gambar stok."),
  openGraph: {
    title: clampMetaTitle("Galeri Projek — Kerja Sebenar KL Renovator"),
    description: "Gambar projek sebenar: pemasangan, cuci kimia, overhaul, servis HVAC & pembaikan di seluruh KL & Selangor. 100% gambar tulen.",
    url: "https://www.klrenovator.com/ms/gallery",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      { url: "https://www.klrenovator.com/hero/midea-aircond-chemical-overhaul-shah-alam-50.webp", width: 1200, height: 630, alt: "Galeri Projek Aircond KL Renovator" },
    ],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/ms/gallery",
    languages: {
      "en-MY": "https://www.klrenovator.com/gallery",
      "ms-MY": "https://www.klrenovator.com/ms/gallery",
      "zh-MY": "https://www.klrenovator.com/zh/gallery",
      "x-default": "https://www.klrenovator.com/gallery",
    },
  },
};

export default function GalleryPageMS() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Utama", url: "https://www.klrenovator.com" },
          { name: "Galeri", url: "https://www.klrenovator.com/ms/gallery" },
        ]}
      />
      <GalleryPageI18n lang="ms" initialItems={GALLERY_ITEMS.slice(0, GALLERY_INITIAL_COUNT)} />
    </>
  );
}
