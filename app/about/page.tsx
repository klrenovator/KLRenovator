import type { Metadata } from "next";
import Image from "next/image";
import {
  FaShieldAlt, FaUserCheck, FaTools, FaHandshake,
  FaWhatsapp, FaPhoneAlt,
} from "react-icons/fa";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow, subtitle } from "@/components/primitives";
import { StatsBand } from "@/components/sections/stats-band";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
  description:
    "Learn about KL Renovator (Multicore Dynamic Resources) — KL & Selangor's trusted aircon specialist. Serving Kuala Lumpur, Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Kepong, Sri Petaling, Bukit Jalil, Sunway, USJ, Putrajaya & Cyberjaya. 10+ years experience, 5,000+ happy customers.",
  alternates: { canonical: "https://www.klrenovator.com/about" },
  openGraph: {
    title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
    description:
      "KL Renovator (Multicore Dynamic Resources) — 10+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across Kuala Lumpur & Selangor.",
    url: "https://www.klrenovator.com/about",
    type: "website",
  },
};

const VALUES = [
  {
    icon: FaShieldAlt,
    title: "Integrity",
    desc: "We give honest assessments and never recommend services you don't need.",
  },
  {
    icon: FaTools,
    title: "Craftsmanship",
    desc: "Every job is done by licensed technicians using proper tools and techniques.",
  },
  {
    icon: FaUserCheck,
    title: "Customer-First",
    desc: "Your satisfaction drives every decision we make — from quote to handover.",
  },
  {
    icon: FaHandshake,
    title: "Transparency",
    desc: "Clear quotes, no hidden fees, no surprises on the invoice.",
  },
];

const HIGHLIGHTS = [
  "10+ years of aircon expertise",
  "5,000+ satisfied customers",
  "Licensed & insured technicians",
  "Same-day service available",
  "1-month workmanship warranty",
  "Servicing all major brands",
];

const GALLERY_IMAGES = [
  { src: "/hero/Installation 2026-05-03 at 13.39.24.jpeg", alt: "KL Renovator aircond installation work Kuala Lumpur" },
  { src: "/hero/New installation 2026-05-03 at 13.39.25 (1).jpeg", alt: "Professional aircond servicing technician KL Selangor" },
  { src: "/hero/Cieling Cassette Installation 2026-05-03 at 13.39.25 (2).jpeg", alt: "Aircond chemical wash deep cleaning Selangor" },
  { src: "/hero/Installation again 2026-05-03 at 13.39.25.jpeg", alt: "HVAC technician pressure chemical wash KL" },
  { src: "/hero/Pressure Chemical Wash2026-05-03 at 13.39.26.jpeg", alt: "Aircond repair and maintenance Klang Valley" },
  { src: "/hero/Aircon Repairing 2026-05-03 at 13.39.27.jpeg", alt: "KL Renovator completed installation project" },
  { src: "/hero/New Compressor installation 2026-05-03 at 13.39.29 (1).jpeg", alt: "Wall-mounted aircond installation Petaling Jaya" },
  { src: "/hero/Aircon Compressor Flaring2026-05-03 at 13.39.29.jpeg", alt: "Chemical overhaul deep clean service KL" },
  { src: "/hero/Aircon Compressor Repairing 2026-05-03 at 13.39.30 (1).jpeg", alt: "Gas top-up R32 R410A precision balancing Selangor" },
  { src: "/hero/Installation 2 2026-05-03 at 13.39.30 (2).jpeg", alt: "Aircond troubleshooting repair Cheras Ampang" },
  { src: "/hero/Gas Top up 2026-05-03 at 13.39.30.jpeg", alt: "HVAC maintenance outdoor unit Selangor" },
  { src: "/hero/Compressor installation new2026-05-03 at 13.39.32 (1).jpeg", alt: "KL Renovator technician team on-site visit" },
  { src: "/hero/PCB Board Replacement 2026-05-03 at 13.39.32.jpeg", alt: "Aircond servicing Daikin Panasonic Mitsubishi KL" },
  { src: "/hero/New Aircon installation in Rawang2026-05-03 at 13.39.33 (1).jpeg", alt: "Ceiling cassette installation commercial KL" },
  { src: "/hero/Compressor Bracket Installation 2026-05-03 at 13.39.33 (2).jpeg", alt: "Commercial aircond service office Selangor" },
  { src: "/hero/Aircon installation in ampang2026-05-03 at 13.39.33.jpeg", alt: "Aircond filter cleaning basic servicing KL" },
  { src: "/hero/Chemical Service Aircon 2026-05-03 at 13.39.34 (1).jpeg", alt: "Daikin Panasonic new unit installation Subang Jaya" },
  { src: "/hero/PCB Board Replacement 2 2026-05-03 at 13.39.34 (2).jpeg", alt: "Aircond outdoor bracket unit installation Shah Alam" },
  { src: "/hero/Bracket Installation 2026-05-03 at 13.39.34.jpeg", alt: "Copper pipe routing clean installation KL" },
  { src: "/hero/Aircon Chemical wash with canvas2026-05-03 at 13.39.35 (1).jpeg", alt: "KL Renovator quality workmanship Klang Valley" },
  { src: "/hero/Copper Sensor replacement 2026-05-03 at 13.39.35.jpeg", alt: "KL Renovator completed aircond project Selangor" },
];

export default function AboutPage() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.klrenovator.com/#organization",
    name: "KL Renovator",
    legalName: "Multicore Dynamic Resources",
    url: "https://www.klrenovator.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    image: "https://www.klrenovator.com/logo/image.png",
    description:
      "KL Renovator (Multicore Dynamic Resources) is a professional HVAC and aircond servicing company based in Selayang, serving all of Kuala Lumpur and Selangor since 2014. Specialized in chemical wash, chemical overhaul, gas top-up, repair, and new unit installation.",
    foundingDate: "2014",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Megnavilla Selayang",
      postalCode: "68100",
      addressLocality: "Selayang",
      addressRegion: "Selangor",
      addressCountry: "MY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "MY",
        availableLanguage: ["English", "Malay", "Chinese"],
      },
    ],
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
      siteConfig.links.googleBusiness,
      siteConfig.links.googleMaps,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // BreadcrumbList Schema
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
        name: "About",
        item: "https://www.klrenovator.com/about",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Nav */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition">
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">About</span>
          </nav>
        </div>
      </div>

      {/* Hero — White */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/hero/PCB Board Replacement 2026-05-03 at 13.39.32.jpeg"
            alt="KL Renovator professional HVAC team at work Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              About KL Renovator
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] text-slate-900 uppercase">
              Built on craft.
              <br />
              <span className="text-sky-500">Driven by trust.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              For over a decade we have been the aircon partner Kuala Lumpur
              and Selangor turn to when comfort matters. From condos to
              commercial cassette installs — we deliver clean, careful work
              every single visit.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl rounded-2xl">
                <Image
                  src="/hero/Aircon installation in ampang2026-05-03 at 13.39.33.jpeg"
                  alt="KL Renovator HVAC technician servicing aircond unit Selangor"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className={eyebrow()}>Our Story</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>A team of </span>
                  <span className={title({ size: "md", color: "brand" })}>
                    aircon experts.
                  </span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  KL Renovator started as a single-van operation servicing
                  homes in Cheras. Today we are a full-service aircon
                  specialist with technicians stationed across the Klang Valley.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed font-medium">
                  What has not changed is the obsession with doing the small
                  things well — wearing shoe covers indoors, cleaning up after
                  every visit, and giving customers a clear quote before a
                  single screw is turned.
                </p>

                <ul className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 bg-white px-4 py-3">
                      <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                      <span className="text-sm font-bold text-slate-900">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Photo Gallery — Horizontal Scroll */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className={eyebrow()}>Our Work</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Real Projects. </span>
                <span className={title({ size: "md", color: "brand" })}>Real Results.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Every photo below is from an actual KL Renovator job — no stock images, no staging.
              </p>
            </div>
          </Reveal>

          <div
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-72 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-md snap-start border border-slate-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="320px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400 font-medium">
            ← Swipe or scroll horizontally to view more →
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className={eyebrow()}>Our Values</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>How we </span>
                <span className={title({ size: "md", color: "brand" })}>do business.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Four principles that guide every booking, quote, and visit.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="bg-white p-6 sm:p-8 h-full hover:bg-slate-50 transition-colors">
                  <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-600 text-white rounded-xl">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-slate-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoverageAreas />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-sky-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
              Let&apos;s get your aircon{" "}
              <span className="text-sky-100">running like new.</span>
            </h2>
            <p className="mt-4 text-sky-100 font-medium">
              Same-day slots available across KL &amp; Selangor — Batu Caves, Ampang, Cheras, Petaling Jaya, Subang Jaya, Shah Alam, Klang, Kajang, Bangsar, Mont Kiara, Kepong, Sri Petaling, Sunway, USJ, Putrajaya, Cyberjaya &amp; more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                Request a Quote
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-all rounded-xl"
              >
                <FaPhoneAlt className="h-4 w-4" />
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
