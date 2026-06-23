import type { Metadata } from "next";
import { GalleryClient } from "./gallery-client";

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
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator Aircond Project Gallery",
      },
    ],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/gallery",
    languages: {
      "en-MY": "https://www.klrenovator.com/gallery",
      "x-default": "https://www.klrenovator.com/gallery",
    },
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
