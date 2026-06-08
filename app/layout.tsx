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
  metadataBase: new URL("https://www.klrenovator.com"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | KL Renovator`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_MY",
    url: "https://www.klrenovator.com/",
    siteName: "KL Renovator",
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
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
    images: ["https://www.klrenovator.com/logo/image.png"],
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
        {/* Primary Local Business JSON-LD Schema */}
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
              "image": "https://www.klrenovator.com/logo/image.png",
              "description": siteConfig.description,
              "slogan": "Expert Aircond Servicing, Chemical Overhaul & Repair KL & Selangor",
              "foundingDate": "2014",
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": 10 },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1",
              },
              "sameAs": [
                siteConfig.links.googleMaps,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                "https://www.tiktok.com/@klrenovator",
                "https://www.youtube.com/@klrenovator",
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Megnavilla Selayang",
                "postalCode": "68100",
                "addressLocality": "Selayang",
                "addressRegion": "Selangor",
                "addressCountry": "MY",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "3.22050",
                "longitude": "101.64120",
              },
              "hasMap": siteConfig.links.googleMaps,
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "09:00",
                  "closes": "18:00",
                },
              ],
              "areaServed": siteConfig.areas.map((area) => ({
                "@type": "AdministrativeArea",
                "name": `${area}, Malaysia`,
              })),
              "serviceType": [
                "Aircon Installation", "Aircon Basic Servicing", "Pressure Chemical Wash",
                "Chemical Overhaul", "Gas Top-Up R22 R410A R32",
                "Aircon Repair & Troubleshooting", "Dismantle & Relocation",
                "Ceiling Cassette Service", "Commercial HVAC Maintenance",
                "VRF VRV System Installation",
              ],
              "knowsAbout": [
                "New Unit Installation",
                "Pressure Chemical Wash Maintenance",
                "Chemical Overhaul Deep Cleaning",
                "Precision Gas Top-Up R32 R410A R22 Balancing",
                "Aircond Water Leaking Troubleshooting",
                "HVAC Commercial Ceiling Cassette Solutions",
                "Capacitor Fan Motor PCB Board Repairs",
                "VRF VRV Multi-split Commercial Systems",
              ],
              "brand": siteConfig.brandsSupported.map((brand) => ({
                "@type": "Brand",
                "name": brand,
              })),
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": siteConfig.phone,
                  "contactType": "customer service",
                  "areaServed": "MY",
                  "availableLanguage": ["English", "Malay", "Chinese"],
                },
                {
                  "@type": "ContactPoint",
                  "url": siteConfig.whatsappLink,
                  "contactType": "sales",
                  "areaServed": "MY",
                  "availableLanguage": ["English", "Malay", "Chinese"],
                },
              ],
            }),
          }}
        />

        {/* Global FAQ Schema — AEO */}
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
                    "text": "Aircon chemical wash in KL starts from RM 120 for a standard wall-mounted unit (1.0-1.5HP). Prices vary by unit type and HP. KL Renovator offers transparent pricing with no hidden fees.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How often should I service my aircon in Malaysia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In Malaysia's hot and humid climate, service every 3 months for heavy use, or every 6 months for light use. A chemical wash is recommended every 12 months.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator service Batu Caves?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator covers Batu Caves, Selayang, Kepong, and all surrounding areas. Same-day service available. Call +60182983573.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator service Cheras, Ampang and Setapak?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator covers Cheras, Ampang, Setapak, Wangsa Maju, Kepong, Sri Petaling, Bukit Jalil and all KL areas. Chemical wash from RM 120, repairs from RM 88. Call +60182983573.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator cover Klang, Setia Alam and Port Klang?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator covers Klang, Port Klang, Setia Alam, Meru and Bukit Tinggi. Professional HVAC team, same-day slots available. WhatsApp +60182983573.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Does KL Renovator offer same day aircon service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator offers same-day aircond servicing across KL and Selangor. Book via WhatsApp at +60182983573 for fastest response.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What is the difference between chemical wash and chemical overhaul?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A chemical wash (from RM 120) cleans the unit while it stays mounted on the wall — ideal for regular maintenance. A chemical overhaul (from RM 220) fully dismantles the indoor unit for deep cleaning of every component — recommended for water leaking, ice formation, or units not serviced in 3+ years.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "What aircond brands does KL Renovator service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "KL Renovator services all major brands including Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp, Toshiba and Haier. All inverter and non-inverter models supported.",
                  },
                },
              ],
            }),
          }}
        />

        {/* HowTo Schema — Aircond Chemical Wash */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Book an Aircond Chemical Wash in KL & Selangor",
              "description": "Book a professional aircond pressure chemical wash with KL Renovator in Kuala Lumpur or Selangor. Service starts from RM 120. Same-day available.",
              "totalTime": "PT45M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "MYR",
                "value": "120",
              },
              "supply": [
                { "@type": "HowToSupply", "name": "Aircond unit (wall-mounted, ceiling cassette, or window unit)" },
                { "@type": "HowToSupply", "name": "Access to your indoor and outdoor unit" },
              ],
              "tool": [
                { "@type": "HowToTool", "name": "KL Renovator trained HVAC technician" },
                { "@type": "HowToTool", "name": "High-pressure chemical wash equipment" },
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "WhatsApp or Call to Book",
                  "text": "Contact KL Renovator via WhatsApp at +60182983573 or call directly. Provide your area, unit type (wall-mounted / ceiling cassette), and HP size. Same-day slots available.",
                  "url": "https://www.klrenovator.com/contact",
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Receive Confirmed Quote",
                  "text": "KL Renovator confirms the price before the technician is dispatched. Chemical wash starts from RM 120 for a 1.0–1.5 HP wall-mounted unit. No hidden charges.",
                  "url": "https://www.klrenovator.com/services/chemical-wash",
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Technician Arrives and Protects Your Space",
                  "text": "The technician arrives at your property. Drop sheets are laid to protect your floor, walls and furniture before any work begins.",
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Chemical Spray and High-Pressure Rinse",
                  "text": "Food-safe chemical solution is sprayed onto the evaporator coil and blower wheel. A high-pressure rinse flushes dissolved mould, dust and bacteria through the drain pipe.",
                },
                {
                  "@type": "HowToStep",
                  "position": 5,
                  "name": "Test and Handover",
                  "text": "Cooling output is tested and confirmed. The work area is cleaned, and a job card with 1-month workmanship warranty is handed to you.",
                },
              ],
            }),
          }}
        />

        {/* HowTo Schema — Aircond Gas Top-Up */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Get Aircond Gas Top-Up (R22, R410A, R32) in KL & Selangor",
              "description": "Book a precision refrigerant gas top-up with KL Renovator. Supports R22, R410A and R32 systems. Leak check included. Starts from RM 120.",
              "totalTime": "PT30M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "MYR",
                "value": "120",
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Identify Your Gas Type",
                  "text": "Check the sticker on your outdoor unit for gas type (R22, R410A, or R32). Not sure? WhatsApp a photo to +60182983573 and KL Renovator will identify it for you.",
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Book via WhatsApp",
                  "text": "Contact KL Renovator at +60182983573. Provide your area, gas type, and unit HP. Same-day gas top-up slots available across KL and Selangor.",
                  "url": "https://www.klrenovator.com/services/gas-topup",
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Technician Checks for Leaks First",
                  "text": "Before topping up, the technician performs a leak check. If a leak is found, it is repaired before gas is added — topping up without fixing a leak wastes gas and money.",
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Precision Gas Balancing",
                  "text": "Refrigerant is added and balanced to the correct operating pressure using a manifold gauge. Over-filling or under-filling is avoided — both damage the compressor.",
                },
                {
                  "@type": "HowToStep",
                  "position": 5,
                  "name": "Cooling Test and Handover",
                  "text": "Unit is run and cooling output confirmed. Job card with warranty details handed to you. R22 from RM 120, R410A from RM 150, R32 from RM 180.",
                },
              ],
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
