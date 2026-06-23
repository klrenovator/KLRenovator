import { Hero } from "@/components/sections/hero";
import { PriceCalculator } from "@/components/price-calculator";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { siteConfig } from "@/config/site";
import { HOMEPAGE_SILO } from "@/config/topical-authority-map";
import { waLink } from "@/lib/whatsapp";
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

      {/* ── Emergency Banner ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-red-700 to-rose-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse inline-block" />
              Same-Day Emergency Available
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">Aircond Breakdown? We Come Today.</h2>
            <p className="text-red-100 text-sm">Aircond rosak? Kami datang hari ini. &nbsp;|&nbsp; 冷气坏了？我们今天上门。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <NextLink
              href="/services/emergency"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-700 hover:bg-red-50 font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              🚨 Emergency Service →
            </NextLink>
            <a
              href={waLink(
                "🚨 URGENT — Emergency Aircond Service Needed\n\nHi KL Renovator, I need EMERGENCY aircond help right now.\n\n📍 Location:\n❄️ Problem:\n\nPlease send a technician ASAP."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              📲 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Tools Section: Price Calculator + Diagnostic Tool ────────── */}
      <section className="py-16 px-4 bg-slate-50" id="tools">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Free Instant Tools</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Get Your Answer in 30 Seconds
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Dapatkan Jawapan Dalam 30 Saat &nbsp;|&nbsp; 30秒内获得答案
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DiagnosticTool />
            <PriceCalculator />
          </div>
        </div>
      </section>

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

      {/* ── Topical Authority Hub ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white border-t border-slate-100" id="topical-hub">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Complete Resource Hub</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Everything You Need — All In One Place
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Semua Dalam Satu Tempat &nbsp;|&nbsp; 所有资源一站式
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Problems cluster */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Aircond Problems</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">Fix By Problem Type</h3>
              <div className="space-y-1.5">
                {HOMEPAGE_SILO.problems.featured.map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/problems/${item.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-red-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href="/problems" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-red-600 hover:text-red-800">
                All Problems → 
              </NextLink>
            </div>

            {/* Brands cluster */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">Aircond Brands</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">Service By Brand</h3>
              <div className="space-y-1.5">
                {HOMEPAGE_SILO.brands.featured.map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/brands/${item.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href="/brands" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-sky-600 hover:text-sky-800">
                All Brands →
              </NextLink>
            </div>

            {/* Areas cluster */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Service Areas</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">Find Your Area</h3>
              <div className="space-y-1.5">
                {HOMEPAGE_SILO.areas.featured.map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/areas/${item.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href="/areas" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-emerald-600 hover:text-emerald-800">
                All Areas →
              </NextLink>
            </div>

            {/* Blog cluster */}
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1">Expert Guides</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">Learn & Decide</h3>
              <div className="space-y-1.5">
                {HOMEPAGE_SILO.blog.featured.map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-violet-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href="/blog" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-violet-600 hover:text-violet-800">
                All Guides →
              </NextLink>
            </div>

          </div>
        </div>
      </section>

      <ReadyToBook />
    </>
  );
}
