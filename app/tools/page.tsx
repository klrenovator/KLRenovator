import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { Reveal } from "@/components/reveal";
import { TOOLS, AI_ASSISTANT_TOOL } from "@/config/tools";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildFaqSchema } from "@/lib/seo";

const PAGE_URL = "https://www.klrenovator.com/tools";

export const metadata: Metadata = {
  title: clampMetaTitle("Free Aircond Calculators & Tools Malaysia"),
  description:
    "Free aircond calculators Malaysia: installation cost, gas top-up cost, BTU & HP, aircond size, electricity cost, inverter savings & service recommendation. Instant estimates from KL Renovator.",
  alternates: buildCanonicalOnly("/tools"),
  openGraph: {
    title: clampMetaTitle("Free Aircond Calculators & Tools — KL Renovator"),
    description:
      "7 free aircond calculators + AI assistant: installation cost, gas top-up, BTU/HP, size, electricity & inverter savings. Instant, accurate, mobile-friendly.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Free Aircond Calculators & Tools Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Free Aircond Calculators & Tools Malaysia"),
    description: "Installation cost, gas top-up, BTU, size, electricity & savings calculators — free.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

const HUB_FAQS = [
  {
    q: "Are KL Renovator's aircond calculators free to use?",
    a: "Yes — all calculators on this page are completely free, with no registration and no email required. They use KL Renovator's published 2026 pricing so the estimates match real quotes.",
  },
  {
    q: "How accurate are the calculator estimates?",
    a: "Labour and published material rates (copper pipe, wire, brackets, casing, gas per PSI) are taken directly from KL Renovator's official price list, so those figures are exact. Anything that depends on an on-site inspection — like the exact PSI of gas needed or drain pipe routing — is shown as a range and confirmed by the technician before work begins.",
  },
  {
    q: "Which aircond calculator should I use first?",
    a: "Start with the Aircond Size Calculator or BTU Calculator to find the right HP for your room, then use the Installation Cost Calculator for the full labour + materials estimate. Use the Electricity Cost Calculator to check your running cost and the Inverter Savings Calculator before deciding between inverter and non-inverter.",
  },
  {
    q: "Can I book a service directly from a calculator?",
    a: "Yes — every calculator result has a WhatsApp button that pre-fills your details and estimate, so you can confirm a booking in one tap. You can also book a slot online at klrenovator.com/book.",
  },
];

export default function ToolsPage() {
  const faqSchema = buildFaqSchema(HUB_FAQS);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Aircond Calculators & Tools Malaysia",
    url: PAGE_URL,
    description:
      "Free aircond installation cost, gas top-up, BTU, size, electricity and inverter savings calculators plus a service recommendation tool.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.anchor,
        url: `https://www.klrenovator.com${t.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">Free Instant Tools</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              Aircond Calculators &amp; <span className="text-sky-500">Tools</span>
            </h1>
            <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Seven free, mobile-friendly calculators built on KL Renovator&apos;s published 2026 pricing — get an instant estimate for
              installation, gas top-up, aircond sizing, electricity cost and inverter savings, or ask the AI assistant anything.
            </p>
          </Reveal>
        </div>
      </section>

      {/* AI Assistant feature card */}
      <section className="pb-4 px-4">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <NextLink
              href={AI_ASSISTANT_TOOL.slug}
              className="group block rounded-3xl bg-gradient-to-r from-violet-700 via-violet-600 to-sky-600 text-white p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.01]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <span className="text-5xl" aria-hidden="true">{AI_ASSISTANT_TOOL.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-violet-200 mb-2">New — Ask Anything</p>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight">{AI_ASSISTANT_TOOL.title}</h2>
                  <p className="text-violet-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                    {AI_ASSISTANT_TOOL.desc} Instant pricing, quotations, HP recommendations and booking help — trained on KL Renovator&apos;s real
                    service information.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-xl px-5 py-3 text-sm font-black uppercase tracking-widest transition-colors shrink-0">
                  Chat Now <FiArrowRight className="h-4 w-4" />
                </span>
              </div>
            </NextLink>
          </Reveal>
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.slug} delay={i * 40}>
                <NextLink
                  href={tool.slug}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-sky-400 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <span className="text-3xl mb-4" aria-hidden="true">{tool.icon}</span>
                  <h2 className="font-black text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed flex-1">{tool.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">
                    Use Tool <FiArrowRight className="h-3 w-3" />
                  </span>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          Also on our homepage:{" "}
          <NextLink href="/#tools" className="font-bold text-sky-600 hover:underline">Price Calculator</NextLink> and{" "}
          <NextLink href="/#tools" className="font-bold text-sky-600 hover:underline">Problem Diagnostic Tool</NextLink> — quick cost &amp; diagnosis cards with WhatsApp booking.
        </p>
      </section>

      {/* How the estimates work */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">How the Estimates Work</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Every calculator uses KL Renovator&apos;s official published price list — the same figures shown on the{" "}
              <NextLink href="/aircond-service-price-malaysia" className="text-sky-600 font-bold hover:underline">service price page</NextLink> and{" "}
              <NextLink href="/installation-price-malaysia" className="text-sky-600 font-bold hover:underline">installation price guide</NextLink>.
              Installation labour is per HP (RM 199–449), copper pipe RM 17–27/ft, electrical wire RM 9–17/ft, gas R22 RM 2.50/PSI and R410A/R32
              RM 3.00/PSI. Where a figure depends on an on-site inspection — exact gas PSI, drain pipe routing, water pump sizing — the tool shows a
              range and the technician confirms the final price before any work begins. No hidden charges, ever.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            <NextLink href="/aircond-service-price-malaysia" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all">
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">Aircond Service Price 2026</p>
              <p className="text-xs text-slate-500 mt-1.5">Basic RM 99 · Chemical wash RM 120 · Overhaul RM 220 · Gas RM 2.50/PSI — full published list.</p>
            </NextLink>
            <NextLink href="/installation-price-malaysia" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all">
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">Installation Price Guide</p>
              <p className="text-xs text-slate-500 mt-1.5">Installation from RM 199 with full materials breakdown and warranty terms.</p>
            </NextLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {HUB_FAQS.map((faq, idx) => (
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">Prefer to Just Ask a Human?</h2>
          <p className="text-sky-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            WhatsApp KL Renovator directly — real technicians reply with transparent pricing, same-day availability across KL &amp; Selangor.
          </p>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest px-7 py-4 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg"
          >
            <FaWhatsapp className="h-5 w-5" /> WhatsApp +60 18-298 3573
          </a>
        </div>
      </section>
    </>
  );
}
