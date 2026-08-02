import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { buildAreaServedSchema, buildServiceAreaGeoCircle } from "@/lib/seo";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConversionWidgetsLoader } from "@/components/conversion-widgets-loader";
import { FloatingAssistantButton } from "@/components/floating-assistant-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klrenovator.com"),
  // NOTE: no `template` here — every page (services, areas, brands, problems, blog)
  // already includes "| KL Renovator" in its own metaTitle. A template here
  // caused a double-suffix bug ("...KL Renovator | KL Renovator") across 100+ pages.
  // `title` is set as a plain string (not the {default, template} object) since
  // the template slot is unused — this is the cleaner way to express "no template".
  // Kept under 60 chars: this exact string is what /_not-found, /brands and
  // any page without its own `title` renders. `siteConfig.tagline` on its
  // own pushed it to 69 characters, which Google truncates.
  title: "KL Renovator — Aircond Installation & Service KL",
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

// ── NOTE: no "review" array and no "aggregateRating" in the business schema.
//
// Google's structured data guidelines (Sept 2019, restated Dec 2025) treat
// self-serving reviews — reviews about Entity A published on Entity A's own
// website, whether hand-written or pulled from a Google/Facebook widget — as
// ineligible for review rich results on LocalBusiness / Organization and all
// their subtypes, which includes HVACBusiness.
//
// The `review` array went first (it produced 11 invalid items in the Rich
// Results Test). `aggregateRating` was kept at the time on the assumption it
// was still valid — it is not: it produced the 36 invalid review snippets
// reported in Search Console on 2026-07-28, so it has now been removed too.
//
// The stars were never eligible to render, so nothing is lost. Rankings are
// unaffected — this is a rich-result eligibility rule, not a quality signal.
// The genuine rating still reaches Google via the Google Business Profile,
// and the testimonials remain visible on-page in plain HTML for users.
// See: https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ── Google Tag Manager (container script) ──────────────────
            GTM-57MCF8NQ — kept parser-blocking / as early as possible in
            <head> so the dataLayer and tag container initialise before
            first paint (matching Google's recommended placement). The
            matching <noscript> iframe lives immediately after <body>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-57MCF8NQ');`,
          }}
        />

        {/* ── <html lang> correction ──────────────────────────────────
            Architecture note: English lives unprefixed at the root and
            ms/zh are literal folder trees, so there is no [lang] segment
            and only ONE root <html> — which is statically rendered as
            lang="en" for every locale. Previously this was corrected in a
            useEffect (app/providers.tsx), i.e. only AFTER hydration, so
            the initial HTML that crawlers parse declared Malay and Chinese
            pages as English.

            This script is parser-blocking and runs before first paint and
            before the DOM snapshot a rendering crawler takes, so the
            attribute is right by the time anything reads it — without
            forcing the whole site out of static generation (which reading
            headers() in the root layout would do). providers.tsx still
            syncs the attribute on client-side language switches. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;var l=p==="/ms"||p.indexOf("/ms/")===0?"ms-MY":p==="/zh"||p.indexOf("/zh/")===0?"zh-MY":"en-MY";document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
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
              // ── aggregateRating REMOVED 2026-07-28 ──────────────────────
              // This emitted our own 5.0 / 500-review rating inside
              // HVACBusiness on all 2,104 pages, and was the cause of the
              // "36 invalid review snippets" in Search Console.
              //
              // Google's self-serving review policy (Sept 2019, restated
              // Dec 2025): when the entity being reviewed controls the
              // reviews, LocalBusiness and Organization — and every subtype,
              // which includes HVACBusiness — are INELIGIBLE for review rich
              // results. So these stars could never render; the markup only
              // ever produced invalid items in GSC.
              //
              // Nothing is lost by removing it:
              //   • the stars were never eligible to show
              //   • ranking is unaffected — this is a rich-result eligibility
              //     rule, not a quality signal
              //   • the real rating still reaches Google through the Google
              //     Business Profile, which is the supported route
              //   • the 5.0 / 500 reviews remain visible on-page for users
              //     (components/sections/google-reviews.tsx)
              //
              // The `review` array was already removed for the same reason —
              // see the note above RootLayout.
              // sameAs = the profiles Google follows to verify this business
              // entity. Every URL here must resolve — dead profiles weaken
              // entity verification. Audited 2026-07-28: removed YouTube
              // (channel 404s), Yelp ("no-title" placeholder) and Medium
              // (404). The rest were confirmed live.
              sameAs: [
                siteConfig.googleBusinessProfile,
                siteConfig.links.googleMaps,
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
                "https://www.pinterest.com/klrenovator/",
                "https://linktr.ee/klrenovator",
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
                "https://www.pinterest.com/klrenovator/",
                "https://linktr.ee/klrenovator",
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
        {/* Google Tag Manager (noscript) — must be immediately after <body>
            so non-JS browsers / fallback still load the container. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57MCF8NQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
        {/* Skip link — keyboard users previously had to tab through the
            entire utility bar, logo, 7 nav links and language switcher on
            every single page before reaching content. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-600 focus:px-5 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-wider focus:text-white focus:shadow-xl"
        >
          Skip to main content
        </a>
        <Providers>
          <div className="relative flex min-h-screen flex-col pb-16 lg:pb-0">
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <ConversionWidgetsLoader />
            {/* Always-visible "Expert / AI Assistant" launcher — see
                components/floating-assistant-button.tsx. Mounted directly
                (not via the idle-loaded conversion bundle) so it shows on
                every page without waiting for idle / first interaction. */}
            <FloatingAssistantButton />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
