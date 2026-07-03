import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiChevronRight, FiClock, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow, subtitle, sectionContainer } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
  description:
    "Looking for aircond service near you? KL Renovator sends trained HVAC technicians across Kuala Lumpur & Selangor — same-day slots, transparent pricing, all brands. WhatsApp +60182983573.",
  alternates: {
    canonical: "https://www.klrenovator.com/near-me",
    languages: {
      "en-MY": "https://www.klrenovator.com/near-me",
      "x-default": "https://www.klrenovator.com/near-me",
    },
  },
  openGraph: {
    title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/near-me",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator aircond technician — local service across KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aircond Service Near Me — KL & Selangor | KL Renovator",
    description:
      "Local aircond servicing across KL & Selangor. Same-day slots, chemical wash from RM 120, all brands.",
    images: ["https://www.klrenovator.com/hero/aircond-repair-technician-klang-valley.webp"],
  },
};

// ── Structured Data ──────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Aircond Service Near Me", item: "https://www.klrenovator.com/near-me" },
  ],
};

const nearMeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aircond Service Near Me — KL & Selangor",
  description:
    "KL Renovator provides local aircond servicing across Kuala Lumpur and Selangor — same-day slots, pressure chemical wash, chemical overhaul, gas top-up, repairs and new installation. All brands, all building types.",
  url: "https://www.klrenovator.com/near-me",
  provider: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: siteConfig.name,
    legalName: siteConfig.parentCompany,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://www.klrenovator.com",
  },
  areaServed: [
    { "@type": "City", name: "Kuala Lumpur" },
    { "@type": "State", name: "Selangor" },
  ],
  offers: {
    "@type": "Offer",
    price: 99,
    priceCurrency: "MYR",
    description: "Basic aircond servicing from RM 99; pressure chemical wash from RM 120",
    availability: "https://schema.org/InStock",
    areaServed: "Kuala Lumpur and Selangor, Malaysia",
  },
};

const faqs = [
  {
    q: "How do I find a reliable aircond technician near me?",
    a: "WhatsApp KL Renovator at +60182983573 with your area and the problem — we match you with the nearest available slot and a trained HVAC technician. We cover all of Kuala Lumpur and Selangor, including high-rise condos, landed homes, shoplots and offices.",
  },
  {
    q: "Do you offer same-day aircond service near me?",
    a: "Yes — same-day slots are frequently available across KL & Selangor. For the best chance, WhatsApp us early in the day with your location and the issue (not cooling, water leaking, strange noise, or a routine service).",
  },
  {
    q: "How much does aircond service cost near me?",
    a: "Basic servicing from RM 99, pressure chemical wash from RM 120 (1.0–1.5 HP wall-mounted), chemical overhaul from RM 220, and gas top-up from RM 120 (R22, R410A or R32). Every price is confirmed before any work begins — no hidden charges, no surprise call-out fees.",
  },
  {
    q: "Which areas of KL & Selangor do you cover?",
    a: "We cover the entire Klang Valley — Kuala Lumpur, Petaling Jaya, Cheras, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Kajang, Setia Alam, Bangsar, Mont Kiara, Kepong, Sri Petaling, Bukit Jalil, Putrajaya, Cyberjaya and 30+ more neighbourhoods. See our full service areas list.",
  },
  {
    q: "Which aircond brands do you service near me?",
    a: "All major brands — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic. Inverter and non-inverter, wall-mounted, ceiling cassette and window units.",
  },
  {
    q: "Is there a call-out or travelling charge?",
    a: "No hidden call-out fee — pricing is transparent and quoted upfront based on the service and unit type. You'll always know the price before the technician starts work.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const workPhotos = [
  { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: "KL Renovator technician servicing an aircond unit in Klang Valley" },
  { src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp", alt: "Pressure chemical wash being carried out on an aircond unit in Kepong, KL" },
  { src: "/hero/aircond-installation-wall-mounted-kl.webp", alt: "Wall-mounted aircond installation by KL Renovator in Kuala Lumpur" },
];

export default function NearMePage() {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nearMeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb Nav */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-700 font-medium">Aircond Service Near Me</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-sky-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className={eyebrow({ className: "text-sky-300" })}>Local Aircond Service · KL &amp; Selangor</p>
            <h1 className={`${title({ size: "lg", color: "white" })} mt-3`}>
              Aircond Service Near Me in KL &amp; Selangor
            </h1>
            <p className={`${subtitle({ fullWidth: true })} !text-slate-200 !mt-4 !text-lg`}>
              Searching for a reliable aircond technician near you? KL Renovator dispatches
              trained HVAC technicians across Kuala Lumpur and Selangor — same-day slots,
              transparent pricing and all brands serviced. Trusted by{" "}
              <span className="font-semibold text-white">500+ homeowners and businesses</span>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(rfqMsg)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284c7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-900/40 transition hover:bg-[#0369a1]"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Us for a Same-Day Slot
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                <FaPhone className="h-5 w-5" />
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <FiClock className="h-4 w-4 text-sky-300" />
              Mon–Sun, 9:00 AM – 6:00 PM · Reply within 30 minutes on WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* Why choose a local team */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>Why book a local aircond team</p>
            <h2 className={`${title({ size: "md" })} mt-2`}>
              Fast, local &amp; transparent aircond service near you
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Same-day response", d: "Technicians based across KL & Selangor mean shorter travel times and more same-day slots." },
              { t: "Local building know-how", d: "We regularly service high-rise condos, landed homes, shoplots and offices — and follow each building's access procedure." },
              { t: "Transparent pricing", d: "Every job is quoted before we start. No hidden call-out fees, no surprise charges." },
              { t: "All brands & types", d: "Wall-mounted, ceiling cassette and window units — inverter and non-inverter, all 20 major brands." },
              { t: "1-month workmanship warranty", d: "Every service and repair is backed by our workmanship warranty for your peace of mind." },
              { t: "500+ happy customers", d: "Trusted by households and businesses across the Klang Valley for honest, reliable aircond work." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{f.t}</h3>
                    <p className="mt-1 text-sm text-slate-600">{f.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How local service works */}
      <section className="py-14 sm:py-18 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>How it works</p>
            <h2 className={`${title({ size: "md" })} mt-2`}>Getting an aircond technician near you takes 4 simple steps</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "WhatsApp or call us", d: "Send your area, unit type and the problem. We reply within 30 minutes." },
              { n: "2", t: "We match the nearest slot", d: "We confirm a same-day or next-day appointment that suits you." },
              { n: "3", t: "Technician arrives", d: "A trained HVAC technician arrives on time with the right tools and parts." },
              { n: "4", t: "Service & handover", d: "We service, test and explain the work — with pricing confirmed upfront." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-black text-white">{s.n}</span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we service near you */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className={eyebrow()}>What we service near you</p>
              <h2 className={`${title({ size: "md" })} mt-2`}>Aircond servicing for every home &amp; business</h2>
              <p className="mt-4 text-slate-600">
                From a single bedroom unit to a row of shoplofts, our HVAC expert team handles it all —
                using genuine care and transparent pricing on every visit.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Wall-mounted split units (homes &amp; condos)",
                  "Ceiling cassette units (shoplots, offices, commercial)",
                  "Window units (compact homes &amp; service rooms)",
                  "Pressure chemical wash, chemical overhaul &amp; gas top-up",
                  "Troubleshooting, repairs, PCB &amp; compressor work",
                  "New installation &amp; dismantle / relocation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <NextLink
                href="/services"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0284c7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0369a1]"
              >
                View all aircond services
                <FiChevronRight className="h-4 w-4" />
              </NextLink>
            </Reveal>

            {/* Real work near you */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {workPhotos.map((p, i) => (
                <div
                  key={p.src}
                  className={`relative overflow-hidden rounded-2xl border border-slate-200 ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="py-14 sm:py-18 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2 text-sky-700">
              <FiMapPin className="h-5 w-5" />
              <p className={eyebrow({ className: "text-sky-700" })}>Areas we cover near you</p>
            </div>
            <h2 className={`${title({ size: "md" })} mt-2`}>We service all of Kuala Lumpur &amp; Selangor</h2>
            <p className={subtitle({ fullWidth: true })}>
              No matter where you are in the Klang Valley, there's a KL Renovator technician nearby.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Kuala Lumpur","Petaling Jaya","Cheras","Shah Alam","Subang Jaya","Puchong","Klang","Ampang","Kajang","Setia Alam","Bangsar","Mont Kiara","Kepong","Sri Petaling","Bukit Jalil","Putrajaya","Cyberjaya","Sunway","USJ","Bandar Utama"]
              .map((a) => (
                <span key={a} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600">
                  {a}
                </span>
              ))}
          </div>
          <NextLink
            href="/areas"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0284c7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0369a1]"
          >
            See all 39 service areas
            <FiChevronRight className="h-4 w-4" />
          </NextLink>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>Frequently asked questions</p>
            <h2 className={`${title({ size: "md" })} mt-2`}>Aircond service near me — common questions</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-900 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className={`${title({ size: "md", color: "white" })}`}>
            Need an aircond technician near you today?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">
            WhatsApp KL Renovator now with your area and the problem — we'll match you with the
            nearest available slot. Same-day appointments available across KL &amp; Selangor.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink(rfqMsg)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-700 shadow-lg transition hover:bg-slate-100"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp +60182983573
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
            >
              <FaPhone className="h-5 w-5" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
