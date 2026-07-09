import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { AboutPageI18n } from "@/components/about-page-i18n";

export const metadata: Metadata = {
  title: clampMetaTitle("About KL Renovator | Trusted Aircond Specialist KL & Selangor"),
  description:
    "KL Renovator (Multicore Dynamics Resources) — trusted aircond specialist in KL & Selangor. 12+ years experience, 5,000+ happy customers, 500+ reviews.",
  alternates: buildTrilingualHreflang("/about"),
  openGraph: {
    title: clampMetaTitle("About KL Renovator | Trusted Aircond Specialist KL & Selangor"),
    description:
      "KL Renovator (Multicore Dynamics Resources) — 12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across Kuala Lumpur & Selangor.",
    url: "https://www.klrenovator.com/about",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Trusted Aircond Specialist Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("About KL Renovator | Trusted Aircond Specialist KL & Selangor"),
    description: "12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across KL & Selangor.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function AboutPage() {
  return <AboutPageI18n lang="en" />;
}
