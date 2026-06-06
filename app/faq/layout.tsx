import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Aircond Service Questions Answered | KL Renovator",
  description:
    "Common questions about KL Renovator's aircond services — pricing, service frequency, warranty, coverage areas (Batu Caves, Ampang, Cheras, PJ, Subang, Shah Alam & more), and booking.",
  alternates: {
    canonical: "https://www.klrenovator.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | KL Renovator Aircond Service",
    description: "Answers on pricing, service types, warranty, and coverage areas across KL & Selangor.",
    url: "https://www.klrenovator.com/faq",
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
