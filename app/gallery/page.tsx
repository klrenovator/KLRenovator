import type { Metadata } from "next";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Project Gallery — KL Renovator Aircon Works",
  description:
    "See our real aircon installation, chemical wash, overhaul, and repair projects across KL & Selangor. Before & after photos, commercial projects, and technicians at work.",
  openGraph: {
    title: "Gallery — KL Renovator Aircon Projects",
    description: "Real project photos: installations, chemical wash, commercial HVAC, repairs & more.",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
