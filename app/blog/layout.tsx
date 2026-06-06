import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aircond Tips & Expert Guides | KL Renovator Blog",
  description:
    "Practical aircond advice from KL Renovator — chemical wash vs overhaul, why aircon not cold, how often to service, refrigerant gas types R22 R410A R32, and more.",
  alternates: {
    canonical: "https://www.klrenovator.com/blog",
  },
  openGraph: {
    title: "Aircond Tips & Expert Guides | KL Renovator Blog",
    description: "Practical aircond maintenance guides, troubleshooting tips, and service advice from Malaysia's trusted HVAC specialist.",
    url: "https://www.klrenovator.com/blog",
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630 }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
