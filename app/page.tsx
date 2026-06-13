import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    taxID: "003765188-T",
    url: "https://www.klrenovator.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    image: "https://www.klrenovator.com/logo/image.png",
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "RM 88 – RM 2,000",
    currenciesAccepted: "MYR",
    paymentAccepted: "Cash, Bank Transfer, DuitNow",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressCity,
      postalCode: siteConfig.addressPostal,
      addressRegion: siteConfig.addressState,
      addressCountry: siteConfig.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geoLat,
      longitude: siteConfig.geoLng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: siteConfig.areas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviewRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aircond Services Kuala Lumpur & Selangor",
      itemListElement: siteConfig.services.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: `https://www.klrenovator.com/services/${service.slug}`,
          provider: {
            "@type": "HVACBusiness",
            "@id": "https://www.klrenovator.com/#business",
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: service.startPrice,
          priceCurrency: "MYR",
          description: `Starting from RM ${service.startPrice}`,
        },
      })),
    },
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.googleBusiness,
    ],
    serviceType: [
      "Aircond Basic Servicing",
      "Pressure Chemical Wash",
      "Chemical Overhaul",
      "Gas Top-Up R22 R410A R32",
      "Aircond Repair & Troubleshooting",
      "New Aircond Installation",
      "Dismantle & Relocation",
      "Ceiling Cassette Service",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "MY",
        availableLanguage: ["English", "Malay", "Chinese"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.klrenovator.com/#website",
    name: siteConfig.name,
    url: "https://www.klrenovator.com",
    description: siteConfig.tagline,
    inLanguage: ["en-MY", "ms-MY", "zh-MY"],
    publisher: {
      "@id": "https://www.klrenovator.com/#business",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.klrenovator.com/services/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* LocalBusiness Schema — HVACBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero />
      <StatsBand />
      <ServicesWithPricing />
      <WhyChooseUs />
      <GoogleReviews />
      <CoverageAreas />
      {/* Topical Authority Hub — Internal Linking */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Problems Hub */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">Aircond Problems · Masalah</p>
              <ul className="space-y-1.5">
                {siteConfig.problemPages.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <NextLink href={`/problems/${p.slug}`} className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition">
                      <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />{p.name}
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink href="/problems" className="text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                    All Problems →
                  </NextLink>
                </li>
              </ul>
            </div>
            {/* Brands Hub */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">Brands We Service · Jenama</p>
              <ul className="space-y-1.5">
                {siteConfig.brandPages.slice(0, 6).map((b) => (
                  <li key={b.slug}>
                    <NextLink href={`/brands/${b.slug}`} className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition">
                      <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />{b.name} Aircond Service
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink href="/brands" className="text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                    All Brands →
                  </NextLink>
                </li>
              </ul>
            </div>
            {/* Areas Hub */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">Service Areas · Kawasan</p>
              <ul className="space-y-1.5">
                {siteConfig.areaPages.slice(0, 6).map((a) => (
                  <li key={a.slug}>
                    <NextLink href={`/areas/${a.slug}`} className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition">
                      <FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Aircond Service {a.name}
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink href="/areas" className="text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                    All Areas →
                  </NextLink>
                </li>
              </ul>
            </div>
            {/* Blog Hub */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">Expert Guides · Panduan</p>
              <ul className="space-y-1.5">
                <li><NextLink href="/blog/how-often-service-aircond-malaysia" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />How Often to Service Aircond</NextLink></li>
                <li><NextLink href="/blog/chemical-wash-vs-chemical-overhaul" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Chemical Wash vs Overhaul</NextLink></li>
                <li><NextLink href="/blog/aircond-not-cold-reasons" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Why Aircond Not Cold</NextLink></li>
                <li><NextLink href="/blog/aircond-water-leaking-causes" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Why Aircond Leaking Water</NextLink></li>
                <li><NextLink href="/blog/r32-r410a-r22-gas-difference" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />R32 vs R410A vs R22 Gas</NextLink></li>
                <li><NextLink href="/blog/best-aircond-brands-malaysia-2025" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Best Aircond Brands Malaysia</NextLink></li>
                <li>
                  <NextLink href="/blog" className="text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
                    All Guides →
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </>
  );
}
