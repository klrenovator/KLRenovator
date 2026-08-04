import Home from "../page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pakar Servis Aircond KL & Selangor | KL Renovator",
  description: "Pemasangan, servis, dan pembaikan aircond pakar di Kuala Lumpur & Selangor. Harga telus, waranti 1 bulan, dan servis hari sama.",
  alternates: {
    canonical: "https://www.klrenovator.com/ms",
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com/ms",
      "zh-MY": "https://www.klrenovator.com/zh",
      "x-default": "https://www.klrenovator.com",
    },
  },
  openGraph: {
    title: "Pakar Servis Aircond KL & Selangor | KL Renovator",
    description: "Pemasangan, servis, dan pembaikan aircond pakar di Kuala Lumpur & Selangor. Harga telus, waranti 1 bulan, dan servis hari sama.",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    url: "https://www.klrenovator.com/ms",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator - Pakar Aircond Kuala Lumpur & Selangor",
      },
    ],
  },
};

export default function HomeMS() {
  return <Home locale="ms" />;
}
