import type { Metadata } from "next";
import { AboutPageI18n } from "@/components/about-page-i18n";

export const metadata: Metadata = {
  title: "Tentang KL Renovator | Pakar Aircond Dipercayai KL & Selangor",
  description:
    "KL Renovator (Multicore Dynamics Resources) — pakar aircond dipercayai di KL & Selangor. 12+ tahun pengalaman, 5,000+ pelanggan gembira, 500+ ulasan.",
  alternates: {
    canonical: "https://www.klrenovator.com/ms/about",
    languages: {
      "en-MY": "https://www.klrenovator.com/about",
      "ms-MY": "https://www.klrenovator.com/ms/about",
      "zh-MY": "https://www.klrenovator.com/zh/about",
      "x-default": "https://www.klrenovator.com/about",
    },
  },
  openGraph: {
    title: "Tentang KL Renovator | Pakar Aircond Dipercayai KL & Selangor",
    description:
      "KL Renovator (Multicore Dynamics Resources) — 12+ tahun kepakaran HVAC, 5,000+ pelanggan gembira, 500+ ulasan 5 bintang. Servis aircond profesional merentasi Kuala Lumpur & Selangor.",
    url: "https://www.klrenovator.com/ms/about",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "Tentang KL Renovator — Pakar Aircond Dipercayai Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang KL Renovator | Pakar Aircond Dipercayai KL & Selangor",
    description: "12+ tahun kepakaran HVAC, 5,000+ pelanggan gembira, 500+ ulasan 5 bintang. Servis aircond profesional merentasi KL & Selangor.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function AboutPageMS() {
  return <AboutPageI18n lang="ms" />;
}
