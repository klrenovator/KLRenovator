import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { buildAreaServedSchema, buildServiceAreaGeoCircle } from "@/lib/seo";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConversionWidgetsLoader } from "@/components/conversion-widgets-loader";
import { googlePlace } from "@/config/reviews";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klrenovator.com"),
  // NOTE: no `template` here — every page (services, areas, brands, problems, blog)
  // already includes "| KL Renovator" in its own metaTitle. A template here
  // caused a double-suffix bug ("...KL Renovator | KL Renovator") across 100+ pages.
  // `title` is set as a plain string (not the {default, template} object) since
  // the template slot is unused — this is the cleaner way to express "no template".
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.metaDescription,
  verification: {
    google: "bXgZJKdBlDiVK9DsjNukmCqqicH37cqU_YdHSIVhjlg",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.metaDescription,
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
    description: siteConfig.metaDescription,
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
      "x-default": "https://www.klrenovator.com",
    },
  },
  // ── Geo + AI meta tags (merged — no duplicate) ───────────────────────────
  other: {
    "geo.region": "MY-10",
    "geo.placename": "Kuala Lumpur, Selangor, Malaysia",
    "geo.position": `${siteConfig.geoLat};${siteConfig.geoLng}`,
    ICBM: `${siteConfig.geoLat}, ${siteConfig.geoLng}`,
    language: "English, Bahasa Malaysia, Chinese",
    "ai-context": "https://www.klrenovator.com/llms.txt",
    llms: "https://www.klrenovator.com/llms.txt",
    "llms-full": "https://www.klrenovator.com/llms-full.txt",
  },
  icons: { icon: "/favicon.ico" },
  manifest: "/site.webmanifest",
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
              name: "KL Renovator",
              legalName: "Multicore Dynamics Resources",
              taxID: "003765188-T",
              alternateName: [
                "KL Renovator Aircond Services",
                "KL Renovator HVAC",
              ],
              url: "https://www.klrenovator.com/",
              telephone: siteConfig.phone,
              email: siteConfig.email,
              priceRange: "RM88 - RM2000",
              currenciesAccepted: "MYR",
              paymentAccepted: "Cash, Bank Transfer, DuitNow",
              image: "https://www.klrenovator.com/logo/image.png",
              logo: {
                "@type": "ImageObject",
                url: "https://www.klrenovator.com/logo/image.png",
                width: 1536,
                height: 1024,
              },
              description: siteConfig.description,
              slogan:
                "Aircond Installation, Servicing & Repair KL & Selangor",
              foundingDate: "2014",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: googlePlace.averageRating,
                reviewCount: googlePlace.totalReviews,
                bestRating: 5,
                worstRating: 1,
              },
              sameAs: [
                siteConfig.googleBusinessProfile,
                siteConfig.links.googleMaps,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.addressStreet,
                postalCode: siteConfig.addressPostal,
                addressLocality: siteConfig.addressCity,
                addressRegion: siteConfig.addressState,
                addressCountry: siteConfig.addressCountry,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: siteConfig.geoLat,
                longitude: siteConfig.geoLng,
              },
              hasMap: siteConfig.links.googleMaps,
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              areaServed: [
                ...buildAreaServedSchema(),
                // Service-radius GeoCircle tells Google the broad
                // operational footprint (Klang Valley, ~50 km from
                // KL centre) without forcing enumeration of every
                // neighbourhood. Complements the per-City list above.
                buildServiceAreaGeoCircle(),
              ],
              serviceType: [
                "Aircon Installation",
                "Aircon Basic Servicing",
                "Pressure Chemical Wash",
                "Chemical Overhaul",
                "Gas Top-Up R22 R410A R32",
                "Aircon Repair & Troubleshooting",
                "Dismantle & Relocation",
                "Ceiling Cassette Service",
                "Commercial HVAC Maintenance",
                "Multi-Unit Commercial Air Conditioning Services",
              ],
              knowsAbout: [
                "New Unit Installation",
                "Pressure Chemical Wash Maintenance",
                "Chemical Overhaul Deep Cleaning",
                "Precision Gas Top-Up R32 R410A R22 Balancing",
                "Aircond Water Leaking Troubleshooting",
                "HVAC Commercial Ceiling Cassette Solutions",
                "Capacitor Fan Motor PCB Board Repairs",
                "Commercial Ceiling Cassette Multi-Unit Systems",
              ],
              brand: siteConfig.brandsSupported.map((brand) => ({
                "@type": "Brand",
                name: brand,
              })),
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: siteConfig.phone,
                  contactType: "customer service",
                  areaServed: "MY",
                  availableLanguage: ["English", "Malay", "Chinese"],
                },
                {
                  "@type": "ContactPoint",
                  url: siteConfig.whatsappLink,
                  contactType: "sales",
                  areaServed: "MY",
                  availableLanguage: ["English", "Malay", "Chinese"],
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
              name: "KL Renovator",
              legalName: "Multicore Dynamics Resources",
              taxID: "003765188-T",
              url: "https://www.klrenovator.com/",
              logo: "https://www.klrenovator.com/logo/image.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: siteConfig.phone,
                contactType: "customer service",
                areaServed: "MY",
                availableLanguage: ["English", "Malay", "Chinese"],
              },
              sameAs: [
                siteConfig.googleBusinessProfile,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
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
              url: "https://www.klrenovator.com/",
              name: "KL Renovator",
              description: siteConfig.tagline,
              inLanguage: ["en-MY", "ms-MY", "zh-MY"],
              publisher: {
                "@id": "https://www.klrenovator.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.klrenovator.com/services/{search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
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
          <div className="relative flex min-h-screen flex-col pb-16 lg:pb-0">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ConversionWidgetsLoader />
          </div>
        </Providers>
      </body>
    </html>
  );
}
