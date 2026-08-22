// Server component on purpose.
//
// This file was marked "use client" but uses no state, effects, refs or
// event handlers — it is pure presentational markup plus JSON-LD. The
// "use client" directive was dragging lib/seo (and through it the full
// 1.1 MB config/site.ts) into the browser bundle for every installation
// route. Rendering on the server keeps all of that out of the client graph.

import {
  FaWhatsapp,
  FaCheck,
  FaTruck,
  FaWrench,
  FaGauge,
  FaShield,
  FaClock,
  FaLocationDot,
  FaBolt,
  FaTemperatureHalf,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import {
  buildBreadcrumbSchema,
  buildInstallationServiceSchema,
  buildInstallationFAQSchema,
} from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationProof } from "@/components/installation-proof";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import {
  getInstallationContent,
  getInstallationCanonical,
  getInstallationPath,
  type InstallationPageKey,
  type InstallationLocale,
} from "@/config/installation-page-content";

const langLabel: Record<InstallationLocale, string> = {
  en: "Aircond Installation",
  ms: "Pemasangan Aircond",
  zh: "冷气安装",
};

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90">
      <Icon className="h-4 w-4 text-emerald-400" />
      {label}
    </span>
  );
}

function PricingRow({
  hp,
  labour,
  pipe,
  bracket,
  note,
  isHeader = false,
}: {
  hp: string;
  labour: string;
  pipe: string;
  bracket?: string;
  note?: string;
  isHeader?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_80px_100px_1fr_1fr_1fr] gap-4 px-4 py-3 ${
        isHeader
          ? "bg-slate-50 font-black text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200"
          : "border-b border-slate-50 hover:bg-sky-50/30 transition-colors text-sm"
      }`}
    >
      <span className={isHeader ? "" : "font-medium text-slate-900"}>{hp}</span>
      <span className="text-center">{labour}</span>
      <span className="text-center text-sky-600 font-black">{pipe}</span>
      <span className="text-center text-xs text-slate-600">{bracket}</span>
      <span className="text-center text-xs text-slate-600">{note || "—"}</span>
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

export function InstallationLandingPage({
  pageKey,
  locale,
}: {
  pageKey: InstallationPageKey;
  locale: InstallationLocale;
}) {
  const c = getInstallationContent(pageKey, locale);
  const canonical = getInstallationCanonical(pageKey, locale);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.klrenovator.com" },
    {
      name: langLabel[locale],
      url: `https://www.klrenovator.com${locale === "en" ? "" : `/${locale}`}/aircond-installation-kl`,
    },
    { name: c.breadcrumbLabel, url: canonical },
  ]);

  const serviceSchema = buildInstallationServiceSchema();
  const faqSchema = buildInstallationFAQSchema(c.faqs);

  const waMsg = rfqMsg.replace("Aircond service", `Aircond installation - ${c.breadcrumbLabel}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center bg-slate-900 overflow-hidden">
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
                <TrustBadge key={badge} icon={FaCheck} label={badge} />
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> {c.whatsAppLabel}
              </a>
              <a
                href={`tel:${sitePublic.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"
              >
                <FiPhone className="h-4 w-4 text-sky-300" /> {c.callLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview + Best For */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <Reveal>
              <p className={eyebrow()}>{c.overviewTitle}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Right Size, </span>
                <span className={title({ size: "sm", color: "brand" })}>Right Price</span>
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed font-medium">{c.overviewBody}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
                <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2">
                  <FaLocationDot className="h-5 w-5 text-sky-600" /> {c.bestForTitle}
                </h3>
                <ul className="space-y-3">
                  {c.bestForItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 sm:py-28 bg-slate-50" id="pricing">
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
                <PricingRow
                  hp={locale === "zh" ? "马力" : locale === "ms" ? "HP" : "HP"}
                  labour={locale === "zh" ? "人工" : locale === "ms" ? "Upah" : "Labour"}
                  pipe={locale === "zh" ? "铜管" : locale === "ms" ? "Paip" : "Copper Pipe"}
                  bracket={locale === "zh" ? "支架" : locale === "ms" ? "Braket" : "Bracket"}
                  note={locale === "zh" ? "备注" : locale === "ms" ? "Nota" : "Note"}
                  isHeader
                />
                {c.pricingRows.map((row) => (
                  <PricingRow key={row.hp} {...row} />
                ))}
              </div>
            </div>
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
                  <FaMagnifyingGlass className="h-5 w-5" /> {c.extrasTitle}
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
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>Why KL Renovator?</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Installation Done </span>
                <span className={title({ size: "sm", color: "brand" })}>Right the First Time</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {c.whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">
                    {i === 0 ? <FaWrench className="h-6 w-6" /> : i === 1 ? <FaGauge className="h-6 w-6" /> : i === 2 ? <FaShield className="h-6 w-6" /> : <FaClock className="h-6 w-6" />}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real project photos + verified reviews.
          These pages previously rendered only two images (logo + hero) and
          carried no social proof at all — see components/installation-proof.tsx */}
      <InstallationProof locale={locale} />

      {/* Definition + comparison blocks (issue #72) — the install steps and
          sizing units this page prices, defined in plain language. */}
      <PageExplainers locale={locale} presetId={`install:${pageKey}`} />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-slate-50" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Frequently Asked Questions</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Your Questions, </span>
                <span className={title({ size: "sm", color: "brand" })}>Answered Honestly</span>
              </h2>
            </div>
          </Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
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
                <FiPhone className="h-4 w-4" /> {c.callLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
