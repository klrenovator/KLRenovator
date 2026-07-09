import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight, FiTag, FiClock, FiShield } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, subtitle, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { getFreshDate } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDate();
  return {
    title: `Aircond Service Price Malaysia ${freshDate} — Transparent Price List`,
    description: `Latest ${freshDate} aircond service prices in KL & Selangor. Chemical wash RM120, basic service RM99, overhaul RM220 & gas top-up RM120. No hidden charges.`,
    openGraph: {
      title: `Aircond Service Price Malaysia ${freshDate} — Transparent Price List`,
      description: `Find the latest ${freshDate} aircond service prices in KL & Selangor. We offer transparent pricing for chemical wash, overhaul & repair. WhatsApp +60182983573.`,
      url: "https://www.klrenovator.com/aircond-service-price-malaysia",
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
    },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("basic-servicing", "en"),
  },
    alternates: {
      canonical: "https://www.klrenovator.com/aircond-service-price-malaysia",
      languages: {
        "en-MY": "https://www.klrenovator.com/aircond-service-price-malaysia",
        "ms-MY": "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
        "zh-MY": "https://www.klrenovator.com/zh/aircond-service-price-malaysia",
        "x-default": "https://www.klrenovator.com/aircond-service-price-malaysia",
      },
    },
  };
}

const pricingCategories = [
  {
    title: clampMetaTitle("Cleaning Services"),
    rows: [
      { label: "Basic Servicing (Standard) · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Basic Servicing (Standard) · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Pressure Chemical Wash · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Pressure Chemical Wash · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Pressure Chemical Wash · 3.0 HP", price: "RM 180" },
      { label: "Chemical Overhaul (Dismantle) · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Overhaul (Dismantle) · 2.0 – 2.5 HP", price: "RM 280" },
    ],
  },
  {
    title: clampMetaTitle("Gas Top-Up & Refill"),
    rows: [
      { label: "R22 Gas (Standard) · 1.0 HP", price: "RM 120" },
      { label: "R410A Gas (Inverter) · 1.0 HP", price: "RM 150" },
      { label: "R32 Gas (Eco Inverter) · 1.0 HP", price: "RM 180" },
      { label: "Structural Leak Check", price: "RM 88" },
    ],
  },
  {
    title: clampMetaTitle("Repairs & Spare Parts"),
    rows: [
      { label: "Diagnostic Fee", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 150 – 250" },
      { label: "Fan Motor Replacement", price: "RM 250 – 380" },
      { label: "PCB Control Board Repair", price: "RM 280 – 600" },
    ],
  },
];

const faqs = [
  { q: "Does this price include transportation charges?", a: "Yes. The prices shown are 'all-in' for KL & Selangor areas. We do not apply hidden charges for transport or toll." },
  { q: "Is there a warranty after service?", a: "All our service and repair work is covered by a 1-month workmanship warranty. If the same issue recurs, we return free of charge." },
  { q: "How long does a chemical wash service take?", a: "A standard wall-mounted unit typically takes 45 to 60 minutes. For a chemical overhaul, it may take 2 to 3 hours as the unit needs to be fully dismantled." },
  { q: "Do gas prices differ by type?", a: "Yes. R22 gas is for older models, while R410A and R32 are for modern Inverter models. Prices vary according to the pressure (PSI) required by your unit." },
  { q: "Can I get a discount for servicing multiple units?", a: "Certainly! We offer a 5% discount for 2-3 units, 10% for 4-8 units, and 15% for 8 units and above during the same visit." },
  { q: "Why is an overhaul more expensive than a chemical wash?", a: "An overhaul requires our technician to remove the entire unit from the wall to wash each part individually, while a chemical wash is done without dismantling. Overhaul is the definitive fix for chronic water leaks." },
  { q: "How can I make a payment?", a: "We accept cash or online bank transfers after the work is completed and you are satisfied with our service quality." },
];

export default function PricingPage() {
  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "Aircond Service Price Malaysia 2026",
    description: "Transparent price list for aircond servicing, chemical wash, overhaul, and repairs in KL & Selangor.",
    startPrice: 99,
    locale: "en",
    priceTable: pricingCategories[0].rows,
    pricingName: "Aircond Service Price List 2026",
    priceDescription: "Pricing starts from RM 99 for basic servicing.",
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Service Price 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Updated: {getFreshDate()}</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Aircond Service </span>
              <span className={title({ size: "lg", color: "brand" })}>Price {new Date().getFullYear()}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Find the latest aircond service price list in KL & Selangor. KL Renovator offers transparent pricing with no hidden charges for your home and office.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName={`Price List ${new Date().getFullYear()}`} size="lg" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                Call Us: {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {pricingCategories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 100}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <FiTag className="text-sky-400" /> {cat.title}
                    </h2>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {cat.rows.map((row) => (
                      <li key={row.label} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-700 font-medium">{row.label}</span>
                        <span className="text-base font-black text-sky-600 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-12 bg-sky-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-sky-900/20">
              <h3 className="text-xl sm:text-2xl font-black uppercase">Multi-Unit Bundle Savings</h3>
              <p className="mt-2 text-sky-100 font-medium">Service more units in one visit for greater savings.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">5% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">2 – 3 Units</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">10% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">4 – 8 Units</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">15% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">8+ Units</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose KL Renovator */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Quality & Trust</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Why Choose </span>
                <span className={title({ size: "sm", color: "brand" })}>Our Service?</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: <FiCheck />, title: clampMetaTitle("Transparent Pricing"), desc: "No hidden charges. The price we quote on WhatsApp is the price you pay at the site." },
              { icon: <FiShield />, title: clampMetaTitle("1-Month Warranty"), desc: "Every service is protected by a workmanship guarantee. If issues recur, we'll fix it for free." },
              { icon: <FiClock />, title: clampMetaTitle("Same-Day Slots"), desc: "WhatsApp us before 11 AM for the best chance of securing a same-day service appointment." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Common Questions</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">Aircond Service Price FAQ</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-5 font-bold text-slate-900">
                    {f.q}
                    <FiChevronRight className="h-5 w-5 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{f.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Get Your Free Quote Now</h2>
          <p className="mt-4 text-lg text-slate-400 font-medium">WhatsApp us your aircond model and location for a fast response within 30 minutes.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink("Hi KL Renovator, I'd like to ask about aircond service pricing.")}
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-10 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white px-10 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
