// Server component on purpose — no state, effects or event handlers here.
// Marking it "use client" pulled its whole import graph (including the
// 1.1 MB config/site.ts, via lib/whatsapp) into the browser bundle for
// every one of these routes.

import { FaWhatsapp, FaCheck, FaLocationDot, FaHouseChimney, FaBuilding, FaSquare } from "react-icons/fa6";
import { FiPhone, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";
import { InstallationProof } from "@/components/installation-proof";
import { ExpertReviewBlock, LocalPriceComparisonTable } from "@/components/commercial-proof-blocks";
import {
  getAreaInstallationContent,
  type AreaInstallationLocale,
} from "@/config/area-installation-content";
import { areaInstallBrandLinks } from "@/config/orphan-cross-links";
import { MoneyCrossLinks } from "@/components/money-cross-links";

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90">
      <FaCheck className="h-4 w-4 text-emerald-400" />
      {label}
    </span>
  );
}

function TypeCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
      <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <h3 className="font-black text-slate-900 mb-2 text-base">{q}</h3>
      <p className="text-slate-600 leading-relaxed">{a}</p>
    </div>
  );
}

export function AreaInstallationLandingPage({
  slug,
  locale,
}: {
  slug: string;
  locale: AreaInstallationLocale;
}) {
  const c = getAreaInstallationContent(slug, locale);
  const basePath = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `https://www.klrenovator.com${basePath}/areas/${slug}/installation`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.klrenovator.com/areas" },
      { "@type": "ListItem", position: 3, name: c.h1, item: pageUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: c.h1,
    description: c.metaDescription,
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business" },
    areaServed: { "@type": "City", name: c.h1.replace(/Aircond Installation |Pemasangan Aircond |冷气安装 /, "") },
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "MYR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const waMsg = rfqMsg.replace("Aircond service", `Aircond installation - ${c.h1}`);
  const callLabel = locale === "en" ? "Call" : locale === "ms" ? "Hubungi" : "致电";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-600 transition">Home</Link>
            <FiChevronRight className="h-3 w-3" />
            <Link href="/areas" className="hover:text-sky-600 transition">Service Areas</Link>
            <FiChevronRight className="h-3 w-3" />
            <Link href={`/areas/${slug}`} className="hover:text-sky-600 transition">{c.h1.replace(/Aircond Installation |Pemasangan Aircond |冷气安装 /, "")}</Link>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">{c.breadcrumbLabel}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center bg-slate-900 overflow-hidden">
        <Image
          src={c.ogImage}
          alt={c.ogImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              {c.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">
              {c.h1}
              <br />
              <span className="text-sky-400">{c.subtitle}</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              {c.heroBadges.map((badge) => (
                <TrustBadge key={badge} label={badge} />
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> {c.whatsAppLabel}
              </a>
              <a
                href={`tel:${sitePublic.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all rounded-xl"
              >
                <FiPhone className="h-4 w-4 text-sky-300" /> {callLabel} {sitePublic.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] items-start">
            <Reveal>
              <p className={eyebrow()}>{c.introTitle}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Local Installers, </span>
                <span className={title({ size: "sm", color: "brand" })}>Proper Standards</span>
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed font-medium">{c.introBody}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
                <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2">
                  <FaLocationDot className="h-5 w-5 text-sky-600" /> {c.whereTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5">{c.whereBody}</p>
                <div className="flex flex-wrap gap-2">
                  {c.whereLandmarks.map((lm) => (
                    <span
                      key={lm}
                      className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full border border-sky-200"
                    >
                      {lm}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Local context — genuinely unique per-area installation know-how */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{c.localContextTitle}</p>
            <h2 className="mt-3 mb-6">
              <span className={title({ size: "sm" })}>What Installation Here </span>
              <span className={title({ size: "sm", color: "brand" })}>Actually Involves</span>
            </h2>
            <div className="space-y-5">
              {c.localContextParagraphs.map((p, i) => (
                <p key={i} className="text-slate-700 leading-relaxed text-lg">{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Installation Types */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>{c.typesTitle}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>The Right Unit </span>
                <span className={title({ size: "sm", color: "brand" })}>For Every Space</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {c.types.map((t, i) => (
              <Reveal key={t.title} delay={i * 60}>
                <TypeCard
                  icon={i === 0 ? FaHouseChimney : i === 1 ? FaBuilding : FaSquare}
                  title={t.title}
                  body={t.body}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + Included/Extras */}
      <section className="py-20 sm:py-28 bg-white" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className={eyebrow()}>{c.pricingTitle}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Transparent Pricing — </span>
                <span className={title({ size: "sm", color: "brand" })}>Confirmed First</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-4 py-3 bg-slate-50 font-black text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200">
                  <span>{locale === "zh" ? "类型" : locale === "ms" ? "Jenis" : "Type"}</span>
                  <span className="text-center">{locale === "zh" ? "1.0–1.5 HP" : "1.0–1.5 HP"}</span>
                  <span className="text-center">{locale === "zh" ? "2.0 HP" : "2.0 HP"}</span>
                  <span className="text-center">{locale === "zh" ? "天花板卡式" : locale === "ms" ? "Cassette" : "Cassette"}</span>
                </div>
                {[
                  {
                    type: locale === "zh" ? "挂壁式" : locale === "ms" ? "Dinding" : "Wall-Mounted",
                    p1: "RM 199",
                    p2: "RM 249",
                    p3: "—",
                  },
                  {
                    type: locale === "zh" ? "天花板卡式" : locale === "ms" ? "Ceiling Cassette" : "Ceiling Cassette",
                    p1: "RM 290",
                    p2: "RM 350",
                    p3: "RM 400",
                  },
                  {
                    type: locale === "zh" ? "窗口式" : locale === "ms" ? "Unit Tingkap" : "Window Unit",
                    p1: "RM 199",
                    p2: "RM 200",
                    p3: "—",
                  },
                ].map((row) => (
                  <div
                    key={row.type}
                    className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-4 py-3 border-b border-slate-50 hover:bg-sky-50/30 transition-colors text-sm"
                  >
                    <span className="font-medium text-slate-900">{row.type}</span>
                    <span className="text-center text-sky-600 font-black">{row.p1}</span>
                    <span className="text-center">{row.p2}</span>
                    <span className="text-center">{row.p3}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              {locale === "en"
                ? "Prices are for standard installation including 7 ft copper pipe, insulation, electrical wire and drain pipe. Extras quoted first."
                : locale === "ms"
                  ? "Harga adalah untuk pemasangan standard termasuk 7 ft paip tembaga, wayar, paip saliran standard. Tambahan disebut dahulu."
                  : "价格为标准安装费用，包含7尺铜管、电线和排水管。室外支架及其他额外费用先报价。"}
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <Reveal delay={200}>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-black text-emerald-800 mb-3 flex items-center gap-2">
                  <FaCheck className="h-5 w-5" /> {c.includedTitle}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-700">
                  {c.includedItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <FaCheck className="h-4 w-4 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2">
                  <FaCheck className="h-5 w-5" /> {c.extrasTitle}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-700">
                  {c.extrasItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <FaCheck className="h-4 w-4 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>{c.whyTitle}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Installation Done </span>
                <span className={title({ size: "sm", color: "brand" })}>Right the First Time</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {c.whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
                  <div className="inline-flex h-10 w-10 items-center justify-center bg-sky-50 text-sky-600 rounded-xl mb-4 font-black text-lg">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real project photos + verified reviews — these pages previously
          shipped zero social proof and only two images. */}
      <InstallationProof locale={locale} photoCount={3} reviewCount={3} />

      <LocalPriceComparisonTable locale={locale} name={c.h1} />
      <ExpertReviewBlock locale={locale} name={c.h1} context="installation" seed={`area-installation-${slug}-${locale}`} />

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <MoneyCrossLinks
            block={areaInstallBrandLinks(
              slug,
              c.h1.replace(/Aircond Installation |Pemasangan Aircond |冷气安装 /, ""),
              locale,
            )}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Frequently Asked Questions</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Your Installation Questions, </span>
                <span className={title({ size: "sm", color: "brand" })}>Answered</span>
              </h2>
            </div>
          </Reveal>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
            {c.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">{c.ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> {c.whatsAppLabel}
              </a>
              <a
                href={`tel:${sitePublic.phone}`}
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FiPhone className="h-4 w-4" /> {callLabel} {sitePublic.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
