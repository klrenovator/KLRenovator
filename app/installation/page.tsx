import type { Metadata } from "next";
import { InstallationHubPage } from "@/components/installation-hub-page";
import { HUB_COPY } from "@/config/installation-hub";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";

const t = HUB_COPY.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: buildTrilingualHreflang("/installation"),
  openGraph: {
    title: t.metaTitle,
    description: t.metaDescription,
    url: "https://www.klrenovator.com/installation",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "Aircond installation KL & Selangor — KL Renovator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t.metaTitle,
    description: t.metaDescription,
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function Page() {
  return <InstallationHubPage locale="en" />;
}
