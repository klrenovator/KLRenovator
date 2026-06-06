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
    // Core service keywords
    "aircon service KL",
    "aircond service Selangor",
    "chemical wash aircond KL",
    "aircon installation Malaysia",
    "gas top up aircon KL",
    "ceiling cassette service Malaysia",
    "aircon repair KL",
    "KL Renovator",
    // Geo-targeted keywords
    "aircon service Kuala Lumpur",
    "aircon service Cheras",
    "aircon service Ampang",
    "aircon service Petaling Jaya",
    "aircon service Subang Jaya",
    "aircon service Puchong",
    "aircon service Shah Alam",
    "aircon service Damansara",
    "aircon service Mont Kiara",
    "aircon service Bangsar",
    "aircon service Kajang",
    "aircon service Setapak",
    // Brand + service keywords
    "Daikin aircond service KL",
    "Panasonic aircond repair Selangor",
    "Mitsubishi aircond installation KL",
    "York aircond servicing Malaysia",
    "Midea aircond service KL",
    // Problem-based keywords
    "aircond not cold KL",
    "aircond water leaking repair KL",
    "aircond chemical wash price Malaysia",
    "R32 gas top up KL",
    "R410A gas refill Selangor",
    "aircon compressor repair KL",
    // Commercial
    "commercial HVAC KL",
    "office aircon maintenance contract Selangor",
    "VRF VRV system installation KL",
    "ceiling cassette chemical wash Malaysia",
    // Company
    "Multicore Dynamic Resources",
    "KL Renovator aircond specialist",
    // AEO / LLMO semantic phrases
    "best aircon service company Kuala Lumpur",
    "trusted aircond technician KL Selangor",
    "same day aircon repair booking KL",
    "affordable chemical wash aircon Malaysia",
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
  alternates: {
    canonical: "https://www.klrenovator.com",
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com",
      "zh-MY": "https://www.klrenovator.com",
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
        {/* Primary Local Business JSON-LD Schema — HVACBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              "name": "KL Renovator",
              "legalName": "Multicore Dynamic Resources",
              "alternateName": ["KL Renovator Aircond Services", "KL Renovator HVAC"],
              "url": "https://www.klrenovator.com/",
              "telephone": siteConfig.phone,
              "priceRange": "RM88 - RM2000",
              "currenciesAccepted": "MYR",
              "paymentAccepted": "Cash, Bank Transfer, DuitNow",
              "image": "https://www.klrenovator.com/logo.png",
              "description": siteConfig.description,
              "slogan": "Expert Aircond Servicing, Chemical Overhaul & Repair KL & Selangor",
              "foundingDate": "2014",
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": 10 },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              },
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
              "hasMap": siteConfig.links.googleMaps,
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": siteConfig.areas.map(area => ({
                "@type": "AdministrativeArea",
                "name": `${area}, Malaysia`
              })),
              "serviceType": [
                "Aircon Installation",
                "Aircon Basic Servicing",
                "Pressure Chemical Wash",
                "Chemical Overhaul",
                "Gas Top-Up R22 R410A R32",
                "Aircon Repair & Troubleshooting",
                "Dismantle & Relocation",
                "Ceiling Cassette Service",
                "Commercial HVAC Maintenance",
                "VRF VRV System Installation"
              ],
              "knowsAbout": [
                "Airconditioning Installation & Dismantling",
                "Pressure Chemical Wash Maintenance",
                "Chemical Overhaul Deep Cleaning",
                "Precision Gas Top-Up R32 R410A R22 Balancing",
                "Aircond Water Leaking Troubleshooting",
                "HVAC Commercial Ceiling Cassette Solutions",
                "Capacitor Fan Motor PCB Board Repairs",
                "VRF VRV Multi-split Commercial Systems"
              ],
              "brand": siteConfig.brandsSupported.map(brand => ({
                "@type": "Brand",
                "name": brand
              })),
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": siteConfig.phone,
                  "contactType": "customer service",
                  "areaServed": "MY",
                  "availableLanguage": ["English", "Malay", "Chinese"],
                  "contactOption": "TollFree"
                },
                {
                  "@type": "ContactPoint",
                  "url": siteConfig.whatsappLink,
                  "contactType": "sales",
                  "areaServed": "MY",
                  "availableLanguage": ["English", "Malay", "Chinese"]
                }
              ]
            }),
          }}
        />

        {/* FAQ Schema — for AEO (Answer Engine Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much does aircon chemical wash cost in KL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aircon chemical wash in KL starts from RM120 for a standard wall-mounted unit (1.0-1.5HP). Prices vary by unit type and HP. KL Renovator offers transparent pricing with no hidden fees."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How often should I service my aircon in Malaysia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In Malaysia's hot and humid climate, you should service your aircon every 3 months for heavy use, or every 6 months for light use. A chemical wash is recommended every 12-18 months."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator service all aircon brands?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator services all major brands including Daikin, Panasonic, Mitsubishi, York, Midea, LG, and Samsung across KL and Selangor."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the difference between chemical wash and chemical overhaul?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A chemical wash cleans the unit in place using chemical solution. A chemical overhaul involves fully dismantling the indoor unit for a deeper immersion clean — recommended for heavily soiled units or those with severe water leaking issues."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator offer same day aircon service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator offers same-day aircon servicing across Kuala Lumpur and Selangor. Book via WhatsApp at +60182983573 for fastest response."
                  }
                }
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
