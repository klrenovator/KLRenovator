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
  verification: {
    google: "bXgZJKdBlDiVK9DsjNukmCqqicH37cqU_YdHSIVhjlg",
  },
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
        alt: "KL Renovator - Professional Aircond Services Kuala Lumpur & Selangor",
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
        {/* Primary Local Business JSON-LD Schema — HVACBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              "@id": "https://www.klrenovator.com/#business",
              "name": "KL Renovator",
              "legalName": "Multicore Dynamics Resources",
              "taxID": "003765188-T",
              "alternateName": ["KL Renovator Aircond Services", "KL Renovator HVAC"],
              "url": "https://www.klrenovator.com/",
              "telephone": siteConfig.phone,
              "email": siteConfig.email,
              "priceRange": "RM88 - RM2000",
              "currenciesAccepted": "MYR",
              "paymentAccepted": "Cash, Bank Transfer, DuitNow",
              "image": "https://www.klrenovator.com/logo/image.png",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.klrenovator.com/logo/image.png",
                "width": 400,
                "height": 400,
              },
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
                "streetAddress": "A-22-09 Magnaville Selayang",
                "postalCode": "68100",
                "addressLocality": "Batu Caves",
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

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.klrenovator.com/#organization",
              "name": "KL Renovator",
              "legalName": "Multicore Dynamics Resources",
              "taxID": "003765188-T",
              "url": "https://www.klrenovator.com/",
              "logo": "https://www.klrenovator.com/logo/image.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": siteConfig.phone,
                "contactType": "customer service",
                "areaServed": "MY",
                "availableLanguage": ["English", "Malay", "Chinese"],
              },
              "sameAs": [
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                "https://www.tiktok.com/@klrenovator",
                "https://www.youtube.com/@klrenovator",
              ],
            }),
          }}
        />

        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.klrenovator.com/#website",
              "url": "https://www.klrenovator.com/",
              "name": "KL Renovator",
              "description": siteConfig.tagline,
              "inLanguage": ["en-MY", "ms-MY", "zh-MY"],
              "publisher": {
                "@id": "https://www.klrenovator.com/#organization",
              },
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
                    "text": "Aircon chemical wash in KL starts from RM 120 for a standard wall-mounted unit (1.0–1.5HP). Ceiling cassette starts from RM 220. KL Renovator offers transparent pricing with no hidden fees.",
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
                  "name": "What is the difference between chemical wash and chemical overhaul?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A chemical wash (from RM 120) cleans the unit while it stays mounted on the wall — ideal for regular maintenance. A chemical overhaul (from RM 220) fully dismantles the indoor unit for deep cleaning of every component — recommended for water leaking, ice formation, or units not serviced in 3+ years.",
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
                  "name": "What aircond brands does KL Renovator service?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "KL Renovator services all major brands including Daikin, Panasonic, Mitsubishi Electric, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu and Gree. All inverter and non-inverter models supported.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How much does aircon gas top-up cost in KL & Selangor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gas top-up in KL starts from RM 120 for R22, RM 150 for R410A, and RM 180 for R32. Leak check is included with every gas top-up. KL Renovator covers all Klang Valley areas.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Why is my aircon not cold?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. KL Renovator diagnoses the exact issue and provides a quote before any repair starts. Diagnostic fee is RM 88 (waived if repair done same visit).",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Why is my aircon leaking water?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Water leaking from the indoor unit is almost always caused by a blocked drain pipe or dirty drain pan. A chemical wash or chemical overhaul by KL Renovator clears the blockage and stops the leak.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How much does aircond installation cost in KL & Selangor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aircond installation in KL starts from RM 199 for wall-mounted 1.0–1.5 HP. Ceiling cassette starts from RM 290. Standard installation includes 7 ft copper pipe, wiring and drainage setup. KL Renovator installs all major brands.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Is KL Renovator a registered business in Malaysia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. KL Renovator operates under the registered entity Multicore Dynamics Resources, SSM registration number 003765188-T, registered at A-22-09 Magnaville Selayang, 68100 Batu Caves, Selangor.",
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
