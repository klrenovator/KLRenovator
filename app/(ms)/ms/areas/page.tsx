import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { AreasClient } from "@/app/(en)/areas/areas-client";

export const metadata: Metadata = {
  title: clampMetaTitle("Kawasan Servis Aircond KL & Selangor | KL Renovator"),
  description: clampMetaDescription("KL Renovator servis 39 kawasan di Kuala Lumpur & Selangor — Petaling Jaya, Cheras, Shah Alam, Subang, Ampang, Puchong & lebih. Servis hari sama."),
  openGraph: {
    title: clampMetaTitle("Kawasan Servis Aircond KL & Selangor | KL Renovator"),
    description: clampMetaDescription("Servis aircond profesional di semua kawasan KL & Selangor. Tersedia hari sama. 38 kawasan diliputi."),
    url: "https://www.klrenovator.com/ms/areas",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
  },
  alternates: {
    canonical: "https://www.klrenovator.com/ms/areas",
    languages: {
      "en-MY": "https://www.klrenovator.com/areas",
      "ms-MY": "https://www.klrenovator.com/ms/areas",
      "zh-MY": "https://www.klrenovator.com/zh/areas",
      "x-default": "https://www.klrenovator.com/areas",
    },
  },
};

export default function AreasPageMS() {
  return <AreasClient forcedLang="ms" />;
}
