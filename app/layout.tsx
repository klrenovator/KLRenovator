import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyActions } from "@/components/sticky-actions";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "aircon service KL",
    "aircond Selangor",
    "chemical wash aircond",
    "aircon installation Malaysia",
    "gas top up aircon",
    "ceiling cassette service",
    "aircon repair KL",
    "KL Renovator",
    "Pressure Chemical Wash Ampang",
    "Chemical Overhaul Cheras",
    "Daikin aircond service PJ",
    "Panasonic aircond repair Subang Jaya",
    "Mitsubishi aircond installation Puchong",
    "York servicing Shah Alam",
    "Aircond leaking repair Damansara",
    "R32 gas top up Kuala Lumpur",
    "Multicore Dynamic Resources",
    "Commercial HVAC contract Selangor",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_MY",
    url: "https://www.klrenovator.com/",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/logo.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator - Premium Airconditioning Services Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["https://www.klrenovator.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Local JSON-LD Schema Core for Advanced Google SEO & GEO Citations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              "name": "KL Renovator",
              "legalName": "Multicore Dynamic Resources",
              "alternateName": "KL Renovator Aircond Services",
              "url": "https://www.klrenovator.com/",
              "telephone": siteConfig.phone,
              "priceRange": "RM88 - RM2000",
              "image": "https://www.klrenovator.com/logo.png",
              "description": siteConfig.description,
              "sameAs": [
                siteConfig.links.googleMaps,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                "https://www.tiktok.com/@klrenovator"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Megnavilla Selayang",
                "postalCode": "68100",
                "addressLocality": "Selayang",
                "addressRegion": "Selangor",
                "addressCountry": "MY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "3.2424",
                "longitude": "101.6521"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": siteConfig.areas.map(area => ({
                "@type": "AdministrativeArea",
                "name": area
              })),
              "knowsAbout": [
                "Airconditioning Installation & Dismantling",
                "Pressure Chemical Wash Maintenance",
                "Chemical Overhaul Deep Cleaning",
                "Precision Gas Top-Up R32 R410A R22 balancing",
                "Aircond Water Leaking Troubleshooting",
                "HVAC Commercial Ceiling Cassette Solutions",
                "Capacitor and Fan Motor Repairs"
              ],
              "brand": siteConfig.brandsSupported.map(brand => ({
                "@type": "Brand",
                "name": brand
              }))
            }),
          }}
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-white text-slate-900 antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyActions />
          </div>
        </Providers>
      </body>
    </html>
  );
}
