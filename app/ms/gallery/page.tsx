import type { Metadata } from "next";
import { GalleryPageI18n } from "@/components/gallery-page-i18n";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Galeri Projek Aircond — Kerja Sebenar KL Renovator | KL & Selangor",
  description:
    "Gambar projek sebenar pemasangan, cuci kimia, overhaul & pembaikan aircond oleh KL Renovator di seluruh KL & Selangor. 100% tulen — tiada gambar stok.",
  openGraph: {
    title: "Galeri Projek — Kerja Sebenar KL Renovator",
    description: "Gambar projek sebenar: pemasangan, cuci kimia, overhaul, servis HVAC & pembaikan di seluruh KL & Selangor. 100% gambar tulen.",
    url: "https://www.klrenovator.com/ms/gallery",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      { url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630, alt: "Galeri Projek Aircond KL Renovator" },
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
      <GalleryPageI18n lang="ms" />
    </>
  );
}
