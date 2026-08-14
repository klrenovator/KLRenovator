import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";


import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";
import { buildServiceAreaGeoCircle } from "@/lib/seo";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConversionWidgetsLoader } from "@/components/conversion-widgets-loader";
import { ConversionTracking } from "@/components/conversion-tracking";
import { AiSupportAssistant } from "@/components/ai-support-assistant";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.klrenovator.com"),
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

export default function SiteRootLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: "en" | "ms" | "zh";
}) {
  const htmlLang = locale === "ms" ? "ms-MY" : locale === "zh" ? "zh-MY" : "en-MY";
  // NOTE: this layout previously awaited `headers()` to read a CSP nonce that
  // the (now removed) middleware injected. The middleware is gone, so the
  // nonce was always undefined — but the `headers()` call alone forced EVERY
  // route into dynamic, on-demand server rendering. That turned 2100+ static
  // pages into serverless function calls and made streaming responses
  // fragile under load/timeouts (the root cause of 0-byte responses, most
  // visibly on /book). Removed so all pages prerender statically again.

  return (
    <html lang={htmlLang} className="scroll-smooth">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* GTM — loaded via static inline bootstrap (CSP allows googletagmanager.com) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-57MCF8NQ');`,
          }}
        />

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
              logo: "https://www.klrenovator.com/logo/image.png",
              description: siteConfig.metaDescription,
              slogan:
                "Aircond Installation, Servicing & Repair KL & Selangor",
              foundingDate: "2014",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
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
              // Compact areaServed: area NAMES plus one geo circle. The
              // previous payload inlined all 39 areas with per-area GeoCoordinates
              // (~7 KB) on EVERY page of the site — twice, since the layout's
              // head markup is also serialized into the RSC flight payload.
              // Full per-area schema lives on /areas and each /areas/[slug] page.
              areaServed: [
                ...siteConfig.areaPages.map((area) => area.name),
                buildServiceAreaGeoCircle(),
              ],
              serviceType: [
                "Aircon Installation",
                "Aircon Servicing",
                "Chemical Wash & Overhaul",
                "Gas Top-Up",
                "Aircon Repair",
                "Dismantle & Relocation",
                "Commercial HVAC Maintenance",
              ],
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57MCF8NQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-600 focus:px-5 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:tracking-wider focus:text-white focus:shadow-xl"
        >
          Skip to main content
        </a>
        {/* GA4 conversion tracking mounts immediately (render-null component,
            one capture-phase click listener) so WhatsApp/phone/booking events
            are never missed while the lazy widget bundle is still loading. */}
        <ConversionTracking />
        <Providers initialLang={locale}>
          <div className="relative flex min-h-screen flex-col pb-16 lg:pb-0">
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <ConversionWidgetsLoader />
            <AiSupportAssistant />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
