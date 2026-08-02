// ─────────────────────────────────────────────────────────────────────────
// Calculator page layout — shared SEO/GEO scaffolding for every calculator
// landing page: JSON-LD (Breadcrumb + WebApplication + FAQ + HowTo), hero,
// calculator slot, "how it works", factors, FAQs, internal links and CTA.
//
// Server component on purpose: all schema and content render in the initial
// HTML so search engines and AI crawlers see the full page without JS.
// ─────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildFaqSchema } from "@/lib/seo";
import { ToolLinks } from "./tool-links";

export interface ToolPageProps {
  /** Small uppercase eyebrow above the H1. */
  eyebrow: string;
  /** H1 — exactly one per page. */
  h1: string;
  /** Intro paragraph under the H1. */
  intro: string;
  /** The calculator component. */
  calculator: ReactNode;
  /** Step-by-step "how it works" list (GEO-friendly). */
  howItWorks: string[];
  /** Factors that affect the estimate. */
  factors?: { title: string; desc: string }[];
  /** Visible FAQs + FAQPage schema. */
  faqs: { q: string; a: string }[];
  /** SoftwareApplication/WebApplication schema name. */
  webAppName: string;
  /** Absolute canonical URL of the page. */
  pageUrl: string;
  /** HowTo schema name. */
  howToName: string;
  /** Heading above the step list (defaults to "How This Calculator Works"). */
  howItWorksTitle?: string;
  /** Extra content sections rendered between factors and FAQs. */
  children?: ReactNode;
}

const BASE = "https://www.klrenovator.com";

export function ToolPageLayout({
  eyebrow,
  h1,
  intro,
  calculator,
  howItWorks,
  factors = [],
  faqs,
  webAppName,
  pageUrl,
  howToName,
  howItWorksTitle = "How This Calculator Works",
  children,
}: ToolPageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Free Aircond Calculators", item: `${BASE}/tools` },
      { "@type": "ListItem", position: 3, name: h1, item: pageUrl },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: webAppName,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
    provider: {
      "@type": "HVACBusiness",
      name: "KL Renovator",
      url: BASE,
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToName,
    step: howItWorks.map((stepText, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: stepText,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">{eyebrow}</p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">{h1}</h1>
              <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">{intro}</p>
            </div>
          </Reveal>
          <Reveal>{calculator}</Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">{howItWorksTitle}</h2>
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100">
              <ol className="space-y-4">
                {howItWorks.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-black">
                      {idx + 1}
                    </span>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Factors that affect the estimate */}
      {factors.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">What Affects the Estimate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {factors.map((f, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Extra content (pricing reference, comparison, etc.) */}
      {children}

      {/* FAQs */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex gap-2">
                    <span className="text-sky-600 font-extrabold">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed pl-6 border-l-2 border-sky-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NextLink
              href="/aircond-service-price-malaysia"
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all"
            >
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">Aircond Service Price 2026 — Malaysia</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Basic service RM 99, chemical wash RM 120, overhaul RM 220, gas RM 2.50/PSI. Full published price list.</p>
            </NextLink>
            <NextLink
              href="/installation-price-malaysia"
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all"
            >
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">Aircond Installation Price Guide</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Installation from RM 199 — full materials breakdown: copper pipe, wire, bracket, casing &amp; warranty.</p>
            </NextLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">Get a Confirmed Quotation — Free</h2>
          <p className="text-sky-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Estimates are instant; the final price is confirmed before any work begins. No hidden charges, 1-month workmanship warranty,
            same-day service across KL &amp; Selangor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest px-7 py-4 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg"
            >
              <FaWhatsapp className="h-5 w-5" /> WhatsApp for a Quote
            </a>
            <NextLink
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 hover:bg-sky-50 font-black uppercase tracking-widest px-7 py-4 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg"
            >
              Book a Slot Online <FiArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
}
