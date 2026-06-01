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
    "klrenovator",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_MY",
  },
  robots: { index: true, follow: true },
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              "name": "KL Renovator",
              "alternateName": "Multicore Dynamic Resources",
              "url": "https://www.klrenovator.com/",
              "telephone": "+60182983573",
              "priceRange": "RM",
              "image": "https://www.klrenovator.com/logo.png",
              "description": "Professional Aircond installation, chemical wash, overhaul, gas top-up, and repair services for residential and commercial units in Kuala Lumpur and Selangor.",
              "sameAs": [
                "https://share.google/HhXvqWDkefZ5bzNdL",
                "https://www.facebook.com/share/1EXXRLVXER/",
                "https://www.instagram.com/klrneovator",
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
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Kuala Lumpur"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Selangor"
                }
              ],
              "knowsAbout": [
                "Airconditioning Installation",
                "Aircond Chemical Wash",
                "Chemical Overhaul",
                "Gas Top-Up R32 R410A R22",
                "Aircond Leaking Repair",
                "HVAC Maintenance Kuala Lumpur"
              ]
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
