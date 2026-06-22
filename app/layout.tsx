import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StickyActions } from "@/components/sticky-actions";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { ScrollDepthCTA } from "@/components/scroll-depth-cta";
import { googlePlace } from "@/config/reviews";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klrenovator.com"),
  // NOTE: no `template` here — every page (services, areas, brands, problems, blog)
  // already includes "| KL Renovator" in its own metaTitle. Adding a template here
  // caused a double-suffix bug ("...KL Renovator | KL Renovator") across 100+ pages.
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s`,
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
    alternateLocale: ["ms_MY", "zh_MY"],
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
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com",
      "zh-MY": "https://www.klrenovator.com",
      "x-default": "https://www.klrenovator.com",
    },
  },
  // ── Geo + AI meta tags (merged — no duplicate) ───────────────────────────
  other: {
    "geo.region": "MY-10",
    "geo.placename": "Kuala Lumpur, Selangor, Malaysia",
    "geo.position": `${siteConfig.geoLat};${siteConfig.geoLng}`,
    "ICBM": `${siteConfig.geoLat}, ${siteConfig.geoLng}`,
    "language": "English, Bahasa Malaysia, Chinese",
    "ai-context": "https://www.klrenovator.com/llms.txt",
    "llms": "https://www.klrenovator.com/llms.txt",
    "llms-full": "https://www.klrenovator.com/llms-full.txt",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── NOTE: We intentionally do NOT generate a "review" schema array here.
// Google's structured data guidelines (Sept 2019 update) mark self-serving
// reviews — reviews about Entity A published on Entity A's own website,
// whether typed directly or pulled from a Google/Facebook reviews widget —
// as INVALID for LocalBusiness/Organization types (and their subtypes,
// which includes HVACBusiness). Embedding the "review" array here caused
// 11 invalid items in Google's Rich Results Test. aggregateRating alone is
// kept below since it remains valid (just won't render stars on its own,
// which is expected and harmless). The testimonials themselves stay
// visible on-page in plain HTML for users — only the rich-result markup
// was removed. See: https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ── 1. Primary Local Business — HVACBusiness ── */}
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
                "ratingValue": googlePlace.averageRating,
                "reviewCount": googlePlace.totalReviews,
                "bestRating": 5,
                "worstRating": 1,
              },
              "sameAs": [
                siteConfig.googleBusinessProfile,
                siteConfig.links.googleMaps,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.addressStreet,
                "postalCode": siteConfig.addressPostal,
                "addressLocality": siteConfig.addressCity,
                "addressRegion": siteConfig.addressState,
                "addressCountry": siteConfig.addressCountry,
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": siteConfig.geoLat,
                "longitude": siteConfig.geoLng,
              },
              "hasMap": siteConfig.links.googleMaps,
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday", "Sunday",
                  ],
                  "opens": "09:00",
                  "closes": "18:00",
                },
              ],
              "areaServed": siteConfig.areas.map((area) => ({
                "@type": "AdministrativeArea",
                "name": `${area}, Malaysia`,
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

        {/* ── 2. Organization Schema ── */}
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
                siteConfig.googleBusinessProfile,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
              ],
            }),
          }}
        />

        {/* ── 3. WebSite Schema with SearchAction ── */}
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
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.klrenovator.com/services/{search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ── 4. Global FAQ Schema — AEO / Answer Engine Optimization ── */}
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
                    "text": "Aircon chemical wash in KL starts from RM 120 for a standard wall-mounted 1.0–1.5HP unit. For 2.0–2.5HP it is RM 150, 3.0HP is RM 180. Ceiling cassette starts from RM 220. KL Renovator offers transparent pricing with no hidden fees.",
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
                    "text": "Gas top-up in KL starts from RM 120 for R22 (1.0HP), RM 150 for R410A (1.0HP), and RM 180 for R32 (1.0HP). Leak check is included with every gas top-up. KL Renovator covers all Klang Valley areas.",
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
                {
                  "@type": "Question",
                  "name": "Berapa harga cuci kimia aircond di KL?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cuci kimia aircond di KL bermula dari RM 120 untuk unit dinding 1.0–1.5HP. Ceiling cassette bermula dari RM 220. Harga disahkan sebelum kerja bermula — tiada caj tersembunyi.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "KL冷气化学清洗价格是多少？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "吉隆坡冷气化学清洗从RM 120起（1.0–1.5HP挂壁式）。天花板卡式机从RM 220起。所有价格在施工前确认，无隐藏收费。致电 +60182983573。",
                  },
                },
              ],
            }),
          }}
        />

        {/* ── 5. HowTo — Chemical Wash ── */}
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

        {/* ── 6. SpeakableSpecification — GRO Direct Answer Block ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://www.klrenovator.com/#webpage",
              "name": "KL Renovator — Expert Aircond Services KL & Selangor",
              "url": "https://www.klrenovator.com",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", ".speakable"]
              },
              "about": {
                "@type": "HVACBusiness",
                "@id": "https://www.klrenovator.com/#business",
                "name": "KL Renovator",
                "telephone": "+60182983573",
                "priceRange": "RM 88 - RM 480"
              }
            }),
          }}
        />

        {/* ── 7. ItemList — Services for AI Overview ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "KL Renovator Aircond Services",
              "description": "Professional aircond services in Kuala Lumpur and Selangor by KL Renovator",
              "numberOfItems": 8,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Basic Servicing from RM 99", "url": "https://www.klrenovator.com/services/basic-servicing" },
                { "@type": "ListItem", "position": 2, "name": "Pressure Chemical Wash from RM 120", "url": "https://www.klrenovator.com/services/chemical-wash" },
                { "@type": "ListItem", "position": 3, "name": "Chemical Overhaul from RM 220", "url": "https://www.klrenovator.com/services/chemical-overhaul" },
                { "@type": "ListItem", "position": 4, "name": "Gas Top-Up R22/R410A/R32 from RM 120", "url": "https://www.klrenovator.com/services/gas-topup" },
                { "@type": "ListItem", "position": 5, "name": "Troubleshooting & Repair from RM 88", "url": "https://www.klrenovator.com/services/repair" },
                { "@type": "ListItem", "position": 6, "name": "New Unit Installation from RM 199", "url": "https://www.klrenovator.com/services/installation" },
                { "@type": "ListItem", "position": 7, "name": "Ceiling Cassette Service from RM 150", "url": "https://www.klrenovator.com/services/ceiling-cassette" },
                { "@type": "ListItem", "position": 8, "name": "Dismantle & Relocation from RM 90", "url": "https://www.klrenovator.com/services/dismantling-relocation" },
              ],
            }),
          }}
        />

        {/* ── 8. HowTo — Gas Top-Up ── */}
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
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x4h3dghn6p");
            `,
          }}
        />

        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5V6TDZ48W0"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5V6TDZ48W0');
            `,
          }}
        />
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyActions />
            <ExitIntentPopup />
            <ScrollDepthCTA />
          </div>
        </Providers>
      </body>
    </html>
  );
}
