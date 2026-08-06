import type { Metadata } from "next";
import { clampMetaTitle, buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiChevronRight, FiTag, FiClock, FiShield, FiTool, FiHome } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { getFreshDate } from "@/lib/dates";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDate();
  const metaTitle = clampMetaTitle(
    buildFreshMetaTitle(`Aircond Service Price Malaysia — Transparent Price List`, "en")
  );
  const metaDesc = clampMetaDescription(
    `Latest ${freshDate} aircond service prices in KL & Selangor. Basic service RM99, chemical wash RM120, overhaul RM220, gas top-up from RM2.50/PSI, install RM199. No hidden charges.`
  );

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: "https://www.klrenovator.com/aircond-service-price-malaysia",
      type: "website",
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
      images: getServiceOGImages("basic-servicing", "en"),
    },
    twitter: {
      card: "summary_large_image",
      images: getServiceOGImages("basic-servicing", "en"),
    },
    alternates: buildTrilingualHreflang("/aircond-service-price-malaysia"),
  };
}

const pricingCategories = [
  {
    title: "Cleaning Services",
    rows: [
      { label: "Basic Servicing · Wall 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Basic Servicing · Wall 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Basic Servicing · Wall 3.0 – 3.5 HP", price: "RM 150" },
      { label: "Pressure Chemical Wash · Wall 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Pressure Chemical Wash · Wall 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Pressure Chemical Wash · Wall 3.0 HP", price: "RM 180" },
      { label: "Chemical Overhaul · Wall 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Overhaul · Wall 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Chemical Overhaul · Wall 3.0 – 3.5 HP", price: "RM 350" },
    ],
  },
  {
    title: "Gas Top-Up & Refill (Per PSI)",
    rows: [
      { label: "R22 Gas Refill", price: "RM 2.50 / PSI" },
      { label: "R410A Gas Refill", price: "RM 3.00 / PSI" },
      { label: "R32 Gas Refill", price: "RM 3.00 / PSI" },
      { label: "Structural Leak Check", price: "RM 88" },
    ],
  },
  {
    title: "New Unit Installation",
    rows: [
      { label: "Wall 1.0 – 1.5 HP (7 ft copper included)", price: "RM 199" },
      { label: "Wall 2.0 HP", price: "RM 249" },
      { label: "Wall 2.5 HP", price: "RM 279" },
      { label: "Wall 3.0 HP", price: "RM 329" },
      { label: "Ceiling Cassette 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Window Unit 1.0 – 1.5 HP", price: "RM 199" },
    ],
  },
  {
    title: "Ceiling Cassette (Commercial)",
    rows: [
      { label: "Basic Servicing · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Basic Servicing · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Chemical Wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Wash · 2.0 – 3.0 HP", price: "RM 280" },
    ],
  },
  {
    title: "Repairs & Spare Parts",
    rows: [
      { label: "Diagnostic Fee (waived if repaired same visit)", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 150 – 250" },
      { label: "Indoor Fan Motor Replacement", price: "RM 250 – 380" },
      { label: "Outdoor Fan Motor Replacement", price: "RM 300 – 450" },
      { label: "PCB Control Board Repair / Replace", price: "RM 350 – 600" },
      { label: "Drain Pump Replacement", price: "RM 350 – 550" },
    ],
  },
  {
    title: "Dismantle, Relocation & Emergency",
    rows: [
      { label: "Dismantle Only (no reinstall)", price: "RM 90" },
      { label: "Dismantle + Reinstall nearby (1.0 – 1.5 HP)", price: "RM 250" },
      { label: "Dismantle + Reinstall different location (1.0 – 1.5 HP)", price: "RM 350" },
      { label: "Emergency Diagnostic (9am–6pm)", price: "RM 88" },
      { label: "After-Hours Surcharge (6pm–10pm)", price: "RM 50" },
    ],
  },
  {
    title: "Annual Maintenance Contract (AMC)",
    rows: [
      { label: "AMC Basic — 2× basic + 1× chemical wash", price: "RM 299/year" },
      { label: "AMC Standard — 2× basic + 2× chemical + priority", price: "RM 499/year" },
      { label: "AMC Premium — 4× basic + 2× chemical + 1× overhaul", price: "RM 899/year" },
    ],
  },
];

const faqs = [
  {
    q: "Does this price include transportation charges?",
    a: "Yes. The prices shown are all-in for KL & Selangor areas. We do not apply hidden charges for transport or toll.",
  },
  {
    q: "Is there a warranty after service?",
    a: "All service and repair work is covered by a 1-month workmanship warranty. Spare parts (capacitor, motor, PCB) carry a 3-month warranty. If the same issue recurs, we return free of charge.",
  },
  {
    q: "How long does a chemical wash service take?",
    a: "A standard wall-mounted unit typically takes 45 to 60 minutes. For a chemical overhaul, it may take 2 to 3 hours as the unit needs to be fully dismantled.",
  },
  {
    q: "How is gas top-up charged?",
    a: "Gas top-up is charged based on the actual PSI required after inspection by our technician. R22 is RM2.50/PSI, while R410A and R32 are RM3.00/PSI. We only refill the amount needed and provide transparent pricing with no hidden charges. Final cost depends on refrigerant type, PSI required, and leak condition.",
  },
  {
    q: "Can I get a discount for servicing multiple units?",
    a: "Yes. We offer 5% OFF Instant Booking Discount for 4–10 units, and 10% OFF Instant Booking Discount for 10+ units during the same visit.",
  },
  {
    q: "Why is an overhaul more expensive than a chemical wash?",
    a: "An overhaul requires our technician to remove the entire unit from the wall to wash each part individually, while a chemical wash is done without dismantling. Overhaul is the definitive fix for chronic water leaks.",
  },
  {
    q: "How can I make a payment?",
    a: "We accept cash, online bank transfer, or DuitNow after the work is completed and you are satisfied. No upfront payment is required.",
  },
  {
    q: "How is this page different from the full pricing blog guide?",
    a: "This page is a quick booking price list. For the full 9-service breakdown, complete HP tables and service-selection guide, see the Harga Servis Aircond Malaysia 2026 blog article.",
  },
];

const serviceLinks = [
  { href: "/services/basic-servicing", label: "Basic Servicing" },
  { href: "/services/chemical-wash", label: "Chemical Wash" },
  { href: "/services/chemical-overhaul", label: "Chemical Overhaul" },
  { href: "/services/gas-topup", label: "Gas Top-Up" },
  { href: "/services/installation", label: "Installation" },
  { href: "/services/repair", label: "Repair" },
  { href: "/services/ceiling-cassette", label: "Ceiling Cassette" },
  { href: "/services/dismantling-relocation", label: "Dismantle & Relocate" },
  { href: "/services/emergency", label: "Emergency" },
  { href: "/services/maintenance-contract", label: "AMC Contract" },
  { href: "/installation-price-malaysia", label: "Installation Price Guide" },
  { href: "/cuci-aircond-kl", label: "Cuci Aircond KL" },
  { href: "/blog/harga-servis-aircond-2026-malaysia", label: "Full Pricing Blog Guide" },
];

export default function PricingPage() {
  const freshDate = getFreshDate();

  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "Aircond Service Price Malaysia 2026",
    description:
      "Transparent price list for aircond servicing, chemical wash, overhaul, gas top-up, installation and repairs in KL & Selangor.",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.klrenovator.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Aircond Service Price Malaysia 2026",
        item: "https://www.klrenovator.com/aircond-service-price-malaysia",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Aircond Service Price Malaysia ${freshDate}`,
    description:
      "Complete transparent aircond service price list for Kuala Lumpur & Selangor. Updated monthly.",
    url: "https://www.klrenovator.com/aircond-service-price-malaysia",
    inLanguage: "en-MY",
    isPartOf: { "@type": "WebSite", name: "KL Renovator", url: "https://www.klrenovator.com" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable", "h1"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition">
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Service Price Malaysia 2026</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Updated: {freshDate}</p>
            <h1 className="mt-4 speakable">
              <span className={title({ size: "lg" })}>Aircond Service </span>
              <span className={title({ size: "lg", color: "brand" })}>Price 2026</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto speakable">
              Latest transparent aircond service prices in KL &amp; Selangor. Basic service from RM 99, chemical wash
              from RM 120, installation from RM 199 — no hidden charges.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName="Aircond Service Price List 2026" size="lg" />
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

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {pricingCategories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 60}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-6 py-4">
                    <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <FiTag className="text-sky-400" /> {cat.title}
                    </h2>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {cat.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm text-slate-700 font-medium">{row.label}</span>
                        <span className="text-base font-black text-sky-600 whitespace-nowrap bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {cat.title === "Gas Top-Up & Refill (Per PSI)" && (
                    <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        * Gas top-up is charged based on the actual PSI required after inspection by our technician. 
                        We only refill the amount needed and provide transparent pricing with no hidden charges.
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 bg-sky-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-sky-900/20">
              <h3 className="text-xl sm:text-2xl font-black uppercase">Multi-Unit Bundle Savings</h3>
              <p className="mt-2 text-sky-100 font-medium">Service more units in one visit for bigger savings.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 text-center max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                  <p className="text-3xl font-black">5% OFF</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">4 – 10 Units</p>
                  <p className="text-[10px] text-sky-100 mt-1">Instant Booking Discount</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                  <p className="text-3xl font-black">10% OFF</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">10+ Units</p>
                  <p className="text-[10px] text-sky-100 mt-1">Instant Booking Discount</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Quality &amp; Trust</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Why Choose </span>
                <span className={title({ size: "sm", color: "brand" })}>Our Service?</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: <FiCheck />,
                title: "Transparent Fixed Pricing",
                desc: "No hidden charges. The price we quote on WhatsApp is the price you pay on site.",
              },
              {
                icon: <FiShield />,
                title: "1-Month Workmanship Warranty",
                desc: "Every service is covered. If the same issue returns, we come back and fix it free.",
              },
              {
                icon: <FiClock />,
                title: "Same-Day Slots",
                desc: "WhatsApp us before 11am for the best chance of a same-day service slot.",
              },
              {
                icon: <FiTool />,
                title: "20 Brands Supported",
                desc: "Daikin, Panasonic, Mitsubishi, Acson, York, LG, Samsung, Midea and 12 more — wall, cassette & window.",
              },
              {
                icon: <FiHome />,
                title: "KL & Selangor Coverage",
                desc: "From Batu Caves to Klang, Cheras to Shah Alam — local teams ready in 30–60 minutes.",
              },
              {
                icon: <FiTag />,
                title: "Confirmed Before Work",
                desc: "All prices are confirmed in writing on WhatsApp before the technician starts.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full">
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

      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-lg font-black text-slate-900 mb-6">Related Links</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {serviceLinks.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-white border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
                >
                  {link.label}
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>FAQ</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 speakable">
                Aircond Service Price FAQ
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 40}>
                <details className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
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

      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Get a Free Quote Now</h2>
          <p className="mt-4 text-lg text-slate-500 font-medium">
            WhatsApp us your aircond model and location for a fast reply within 30 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink("Hi KL Renovator, I would like to ask about aircond service prices.")}
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
      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
      <PriceComparisonUI locale="en" />
    </>
  );
}
