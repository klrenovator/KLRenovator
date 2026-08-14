import type { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { ToolsHub } from "@/components/calculators/tools-hub";

const PAGE_URL = "https://www.klrenovator.com/tools";

export const metadata: Metadata = {
  title: clampMetaTitle("Free Aircond Calculators & Tools Malaysia"),
  description:
    padMetaDescription("Free aircond calculators Malaysia: installation cost, gas top-up cost, BTU & HP, aircond size, electricity cost, inverter savings & service recommendation. Instant estimates from KL Renovator."),
  alternates: buildTrilingualHreflang("/tools"),
  openGraph: {
    title: clampMetaTitle("Free Aircond Calculators & Tools — KL Renovator"),
    description:
      "6 free aircond calculators: installation cost, gas top-up, BTU/HP, size, electricity & inverter savings. Instant, accurate, mobile-friendly.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Free Aircond Calculators & Tools Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Free Aircond Calculators & Tools Malaysia"),
    description: "Installation cost, gas top-up, BTU, size, electricity & savings calculators — free.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function ToolsPage() {
  return <ToolsHub lang="en" />;
}
