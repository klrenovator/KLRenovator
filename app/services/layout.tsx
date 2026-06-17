import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aircond Services & Price List KL Selangor | KL Renovator",
  description:
    "Full aircond service price list for KL & Selangor — chemical wash from RM 120, chemical overhaul from RM 220, gas top-up, installation, repair. Transparent pricing, no hidden fees.",
  alternates: {
    canonical: "https://www.klrenovator.com/services",
    languages: {
      "en-MY": "https://www.klrenovator.com/services",
      "ms-MY": "https://www.klrenovator.com/services",
      "zh-MY": "https://www.klrenovator.com/services",
      "x-default": "https://www.klrenovator.com/services",
    },
  },
  openGraph: {
    title: "Aircond Services & Price List | KL Renovator",
    description: "Chemical wash, overhaul, gas top-up, installation & repair — full price list with zero hidden fees.",
    url: "https://www.klrenovator.com/services",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
