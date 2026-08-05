import { Hero } from "@/components/sections/hero";
import { InstallationSpotlight } from "@/components/sections/installation-spotlight";
import { PriceCalculator } from "@/components/price-calculator";
import { DiagnosticTool } from "@/components/diagnostic-tool";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesWithPricing } from "@/components/sections/services-with-pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { ReviewTrustWidget } from "@/components/review-trust-widget";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { siteConfig } from "@/config/site";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { PriceComparisonUI } from "@/components/price-comparison";
import { HOMEPAGE_SILO } from "@/config/topical-authority-map";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import NextLink from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { HomepageAeoSchemas } from "@/components/homepage-aeo-schemas";
import type { Metadata } from "next";
import { LanguageProvider, type Lang } from "@/context/language-context";

// Homepage-specific OG/Twitter image (the layout default is the logo).
// Deep-merges with the root layout's openGraph — only the image is overridden.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.klrenovator.com",
    languages: {
      "en-MY": "https://www.klrenovator.com",
      "ms-MY": "https://www.klrenovator.com/ms",
      "zh-MY": "https://www.klrenovator.com/zh",
      "x-default": "https://www.klrenovator.com",
    },
  },
  openGraph: {
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Expert aircond installation & servicing across Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

function HomeContent({ locale }: { locale: Lang }) {
  // NOTE: HVACBusiness and WebSite schema used to be duplicated here AND in
  // app/layout.tsx (same @id, rendered twice on the homepage specifically).
  // The layout.tsx version is the more complete one (aggregateRating, brand
  // list, knowsAbout, dual contactPoints) and already renders on every page
  // including this one, so the duplicate copies were removed from here.
  // Only the pricing/offer-catalog data + homepage-specific FAQPage —
  // which wasn't in the layout.tsx version — is kept below.

  // ── HOMEPAGE-01: AI-Ready Installation Q&A data ────────────────────────
  const HOMEPAGE_AI_FAQS = [
    { q: "How much does aircond installation cost in KL & Selangor?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft copper pipe, wiring, drain pipe, standard bracket, vacuum pump commissioning, and 1-month workmanship warranty. Ceiling cassette from RM 290, window unit from RM 180. All prices confirmed before work begins." },
    { q: "How long does aircond installation take?", a: "Standard wall-mounted installation takes 3–5 hours for a single unit. Ceiling cassette takes 5–8 hours. Multi-unit whole-house installations typically complete in 1–2 days. Same-day installation available for bookings made before 11 AM." },
    { q: "Which aircond brands does KL Renovator install?", a: "All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic and National. Both inverter and non-inverter models." },
    { q: "Can you install aircond in high-rise condos in KL?", a: "Yes — we regularly install in condos across KLCC, Mont Kiara, Bangsar, Sentul, PJ and Subang Jaya. We coordinate with building management for lift/loading bay access, follow JMB rules, and ensure outdoor unit placement complies with all regulations." },
    { q: "What warranty does KL Renovator provide on installation?", a: "1-month written workmanship warranty on all installation labour. If any installation-related issue arises (leaks, vibration, electrical fault, poor cooling) within 30 days, we return and rectify at zero cost. Manufacturer warranty on the unit itself remains fully protected." },
  ];

  // ── HOMEPAGE-02: Homepage-specific FAQPage schema ──────────────────────
  const homeFAQSchema = buildFaqSchema(HOMEPAGE_AI_FAQS);

  // ── Homepage Service schema (installation-first) ───────────────────────
  const homeServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.klrenovator.com/#homepage-service",
    name: "Aircond Installation & Servicing KL & Selangor",
    description: "Expert aircond installation from RM199 — plus servicing, chemical wash, overhaul & repairs across Kuala Lumpur & Selangor. Same-day, transparent pricing, 1-month workmanship warranty.",
    serviceType: "Aircon Installation & Servicing",
    category: "Air conditioning services",
    url: "https://www.klrenovator.com/",
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: "KL Renovator", telephone: siteConfig.phone },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "City", name: "Petaling Jaya" },
      { "@type": "City", name: "Shah Alam" },
      { "@type": "City", name: "Subang Jaya" },
      { "@type": "City", name: "Cheras" },
      { "@type": "City", name: "Ampang" },
      { "@type": "City", name: "Puchong" },
      { "@type": "City", name: "Klang" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: {
      "@type": "Offer",
      price: 199,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      description: "Starting from RM 199 for wall-mounted 1.0–1.5 HP installation",
    },
  };

  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Aircond Installation & Servicing Kuala Lumpur & Selangor",
    "itemListElement": siteConfig.services.map((service, i) => ({
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
  };

  return (
    <>
      <HomepageAeoSchemas />
      {/* BreadcrumbList — Homepage (single "Home" node; deeper pages add their own) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.klrenovator.com" },
            ],
          }),
        }}
      />
      {/* OfferCatalog Schema — service price list, unique to homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      {/* HOMEPAGE-02: FAQPage Schema — 5 AI-ready installation questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFAQSchema) }}
      />
      {/* HOMEPAGE-02: Homepage-specific Service schema — installation-first */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }}
      />

      <Hero />
      <StatsBand />
      {/* Installation is the primary revenue service — surfaced here, right
          under the hero, instead of as a small card ~8 sections down. */}
      <InstallationSpotlight />
      <ServicesWithPricing />
      <WhyChooseUs />
      <GoogleReviews />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ReviewTrustWidget locale={locale} />
      </div>
      <PriceComparisonUI locale={locale} />

      {/* ── Emergency Banner ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-red-700 to-rose-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse inline-block" />
              Same-Day Emergency Available
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">Aircond Breakdown? We Come Today.</h2>
            <p className="text-red-100 text-sm">{locale === "ms" ? "Aircond rosak? Kami datang hari ini." : locale === "zh" ? "冷气坏了？我们今天上门。" : "Aircond Breakdown? We respond same day."}</p>
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
              rel="nofollow noopener noreferrer"
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

          {/* All calculator tools — internal linking hub */}
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2.5">
              <NextLink href="/aircond-installation-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">
                🔧 Installation Cost Calculator
              </NextLink>
              <NextLink href="/aircond-gas-topup-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">
                ⛽ Gas Top-up Cost Estimator
              </NextLink>
              <NextLink href="/aircond-size-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">
                📏 Aircond Size Calculator
              </NextLink>
              <NextLink href="/aircond-electricity-cost-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">
                ⚡ Electricity Cost Calculator
              </NextLink>
              <NextLink href="/aircond-savings-calculator" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm transition-all">
                💰 Inverter Savings Calculator
              </NextLink>
              <NextLink href="/tools" className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-4 py-2 text-xs font-black hover:bg-sky-700 hover:shadow-md transition-all">
                View All Tools →
              </NextLink>
            </div>

          </div>
        </div>
      </section>

      <CoverageAreas />
      {/* Topical Authority Hub — Internal Linking */}

      {/* 10.10 Click-Depth: Popular Price Guides — 3 commercial landings at 1-click depth */}
      <section className="py-12 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">Popular Price Guides</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Transparent Aircond Pricing — No Hidden Fees</h2>
            <p className="text-slate-500 text-sm mt-1">Harga Telus Tanpa Yuran Tersembunyi | 价格透明无隐藏费用</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <NextLink href="/aircond-service-price-malaysia" className="group rounded-2xl border border-amber-200 bg-amber-50/50 p-6 hover:border-amber-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-amber-700 transition-colors">Aircond Service Price 2026</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">Full service price list — basic, chemical wash, gas, repair, installation. All prices confirmed upfront.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-amber-600 group-hover:gap-2 transition-all">View Prices <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/installation-price-malaysia" className="group rounded-2xl border border-sky-200 bg-sky-50/50 p-6 hover:border-sky-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-sky-700 transition-colors">Installation Price Guide</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">New AC installation from RM 199. Full materials breakdown, copper piping, wall bracket &amp; warranty included.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">View Guide <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/aircond-installation-kl" className="group rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🏗️</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">Aircond Installation KL & Selangor</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">Expert installation from RM 199. 7-step process, vacuum pump, Type L copper, 1-month warranty. Same-day available.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">View Installation <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
            <NextLink href="/cuci-aircond-kl" className="group rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">🧹</div>
              <h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">Chemical Wash KL Guide</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">Cuci aircond KL dari RM 120. Pressure chemical cleaning, same-day booking. Full Klang Valley coverage.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-2 transition-all">Cuci Aircond KL <FiArrowRight className="h-3 w-3" /></span>
            </NextLink>
          </div>
        </div>
      </section>
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
                <li><NextLink href="/blog/best-aircond-brands-malaysia-2026" className="text-sm font-medium text-slate-700 hover:text-sky-600 flex items-center gap-1 transition"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />Best Aircond Brands Malaysia</NextLink></li>
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

            {/* Installation cluster — INS-21 internal linking mesh */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">Installation</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">Install Like a Pro</h3>
              <div className="space-y-1.5">
                {HOMEPAGE_SILO.installation.featured.map((item) => (
                  <NextLink
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href="/aircond-installation-kl" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-sky-600 hover:text-sky-800">
                Installation Guide →
              </NextLink>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOMEPAGE-01: AI-Ready Q&A Section ────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white" id="homepage-faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-3">Got Questions? Quick Answers</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Aircond Installation <span className="text-sky-500">FAQs at a Glance</span>
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Quick, honest answers to the most common questions — for AI Overviews & instant clarity.
              </p>
            </div>
          </Reveal>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {HOMEPAGE_AI_FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="px-6 py-6 sm:px-8">
                  <h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 text-center">
              <a
                href={waLink("🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I have a question about installation.\n\n📍 My Area:\n❄️ Unit Type:\n📏 HP Size:\n\nPlease send info & pricing.")}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> Ask More on WhatsApp
              </a>
              <p className="mt-3 text-xs text-slate-400">Or browse all 100+ FAQs on our <NextLink href="/faq" className="text-sky-600 font-bold underline hover:text-sky-800">dedicated FAQ page →</NextLink></p>
            </div>
          </Reveal>
        </div>
      </section>

      <InstagramFeed locale={locale} />

      <ReadyToBook />
    </>
  );
}


/**
 * The public URL selects the locale before the first server render.  Do not
 * depend on localStorage for an indexable page: crawlers and first-time users
 * must receive the same language as the URL declares.
 */
export default function Home({ locale = "en" }: { locale?: Lang }) {
  return (
    <LanguageProvider initialLang={locale}>
      <HomeContent locale={locale} />
    </LanguageProvider>
  );
}
