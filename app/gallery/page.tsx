import type { Metadata } from "next";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Aircond Project Gallery — Real Work by KL Renovator | KL & Selangor",
  description:
    "Browse real aircond installation, chemical wash, chemical overhaul and repair project photos by KL Renovator across Kuala Lumpur & Selangor. 100% genuine company photos — no stock images.",
  keywords: [
    "aircon installation photos KL",
    "aircond chemical wash before after Malaysia",
    "KL Renovator project gallery",
    "aircond repair photos Selangor",
    "ceiling cassette installation KL",
    "chemical overhaul before after KL",
  ].join(", "),
  openGraph: {
    title: "Project Gallery — KL Renovator Real Aircon Works",
    description: "Real project photos: installations, chemical wash, overhaul, commercial HVAC & repairs across KL & Selangor. 100% genuine photos.",
    url: "https://www.klrenovator.com/gallery",
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
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
