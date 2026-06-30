import type { Metadata } from "next";
import Image from "next/image";
import {
  FaShieldAlt, FaUserCheck, FaTools, FaHandshake,
  FaWhatsapp, FaPhoneAlt,
} from "react-icons/fa";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { googlePlace } from "@/config/reviews";
import { Reveal } from "@/components/reveal";
import { title, eyebrow, subtitle } from "@/components/primitives";
import { StatsBand } from "@/components/sections/stats-band";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
  description:
    "KL Renovator (Multicore Dynamics Resources) — trusted aircond specialist in KL & Selangor. 12+ years experience, 5,000+ happy customers, 500+ reviews.",
  alternates: {
    canonical: "https://www.klrenovator.com/about",
    languages: {
      "en-MY": "https://www.klrenovator.com/about",
      "x-default": "https://www.klrenovator.com/about",
    },
  },
  openGraph: {
    title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
    description:
      "KL Renovator (Multicore Dynamics Resources) — 12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across Kuala Lumpur & Selangor.",
    url: "https://www.klrenovator.com/about",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Trusted Aircond Specialist Kuala Lumpur & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About KL Renovator | Trusted Aircond Specialist KL & Selangor",
    description: "12+ years HVAC expertise, 5,000+ happy customers, 500+ 5-star reviews. Professional aircond servicing across KL & Selangor.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

// ── Breadcrumb Schema ────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.klrenovator.com/about" },
  ],
};

// ── Organization Schema ───────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.klrenovator.com/#organization",
  name: "KL Renovator",
  legalName: "Multicore Dynamics Resources",
  url: "https://www.klrenovator.com",
  logo: "https://www.klrenovator.com/logo/image.png",
  image: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
  description: "Professional HVAC and air conditioning service company in Kuala Lumpur and Selangor. 12+ years experience, 5,000+ customers, 500+ 5-star reviews.",
  foundingDate: "2014",
  telephone: "+60182983573",
  email: "info@klrenovator.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-22-09 Magnaville Selayang",
    addressLocality: "Batu Caves",
    postalCode: "68100",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  sameAs: [
    "https://www.facebook.com/share/1HV3kAqC6V/",
    "https://www.instagram.com/klrenovator",
    "https://www.tiktok.com/@klrenovator",
    "https://share.google/HhXvqWDkefZ5bzNdL",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(googlePlace.averageRating),
    reviewCount: String(googlePlace.totalReviews),
    bestRating: "5",
    worstRating: "1",
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
  "12+ years of aircon expertise",
  "5,000+ satisfied customers",
  "Licensed & insured technicians",
  "Same-day service available",
  "1-month workmanship warranty",
  "Servicing all major brands",
];

const GALLERY_IMAGES = [
  { src: "/hero/aircond-installation-kuala-lumpur.webp", alt: "Professional Aircon Installation Kuala Lumpur by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-installation-wall-mounted-kl.webp", alt: "Professional Aircon Installation Wall Mounted Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-ceiling-cassette-installation-commercial.webp", alt: "Professional Aircon Ceiling Cassette Installation Commercial by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-new-installation-rawang-selangor.webp", alt: "Professional Aircon New Installation Rawang Selangor by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-pressure-chemical-wash-selangor.webp", alt: "Professional Aircon Pressure Chemical Wash Selangor by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: "Professional Aircon Repair Technician Klang Valley by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-new-compressor-installation-rawang.webp", alt: "Professional Aircon New Compressor Installation Rawang by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-compressor-flaring-repair-kl.webp", alt: "Professional Aircon Compressor Flaring Repair Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-compressor-bracket-installation-kl.webp", alt: "Professional Aircon Compressor Bracket Installation Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-installation-double-unit-kl.webp", alt: "Professional Aircon Installation Double Unit Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp", alt: "Professional Aircon Gas Topup R32 R410A Selangor by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-compressor-installation-new-kl.webp", alt: "Professional Aircon Compressor Installation New Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-pcb-board-replacement-kl.webp", alt: "Professional Aircon Pcb Board Replacement Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-installation-ampang-selangor.webp", alt: "Professional Aircon Installation Ampang Selangor by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp", alt: "Professional Aircon Chemical Service Canvas Wrap Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp", alt: "Professional Aircon Pcb Board Replacement 2 Klang Valley by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-bracket-installation-kl-renovator.webp", alt: "Professional Aircon Bracket Installation Kl Renovator by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp", alt: "Professional Aircon Chemical Wash Canvas Kepong Kl by KL Renovator experts in Klang Valley",
  { src: "/hero/aircond-sensor-replacement-klang-valley.webp", alt: "Professional Aircon Sensor Replacement Klang Valley by KL Renovator experts in Klang Valley",
  
];

// ── Meet The Team — E-E-A-T: named, real people behind the work ───────────────
// NOTE for next Claude session: Technician #4's name is still missing (Tauseef
// only gave "6 months experience" with no name as of 19 June 2026). Do not
// invent a name — ask Tauseef for it before adding a 4th card here.
const TEAM = [
  {
    name: "Muhammad",
    role: "Owner & Founder",
    experience: "Running KL Renovator since 2014",
    bio: "Started KL Renovator as a single-van operation servicing homes in Cheras. Personally oversees every technician's training and every job quality check.",
    image: "/hero/aircond-installation-ampang-selangor.webp",
    imageAlt: "Muhammad, Owner & Founder of KL Renovator, on an aircond installation job in Ampang Selangor",
  },
  {
    name: "Shahzaib",
    role: "Senior Installation Technician",
    experience: "18 years experience",
    bio: "Our most experienced installer — handles wall-mounted splits, ceiling cassettes, and multi-unit commercial installations across the Klang Valley.",
    image: "/hero/aircond-installation-kuala-lumpur.webp",
    imageAlt: "Shahzaib, Senior Installation Technician with 18 years experience, installing an aircond unit in Kuala Lumpur",
  },
  {
    name: "Mudassar",
    role: "Service & Chemical Wash Technician",
    experience: "3 years experience",
    bio: "Specialist in chemical wash and chemical overhaul jobs — known for careful canvas-protected cleaning that keeps walls and floors spotless.",
    image: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp",
    imageAlt: "Mudassar, Service & Chemical Wash Technician with 3 years experience, performing a canvas-protected chemical wash in Kepong KL",
  },
  {
    name: "Hamzah",
    role: "Service Technician",
    experience: "1.5 years experience",
    bio: "Handles pressure chemical washes and routine servicing across Selangor — fast, tidy, and thorough on every visit.",
    image: "/hero/aircond-pressure-chemical-wash-selangor.webp",
    imageAlt: "Hamzah, Service Technician with 1.5 years experience, performing a pressure chemical wash in Selangor",
  },
  // 4th technician — 6 months experience — name pending from Tauseef, do not add until provided.
];

export default function AboutPage() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.klrenovator.com/#organization",
    name: "KL Renovator",
    legalName: "Multicore Dynamics Resources",
    url: "https://www.klrenovator.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.klrenovator.com/logo/image.png",
      width: 400,
      height: 400,
    },
    image: "https://www.klrenovator.com/logo/image.png",
    description:
      "KL Renovator (Multicore Dynamics Resources) is a professional HVAC and aircond servicing company based in Selayang, serving all of Kuala Lumpur and Selangor since 2014. Specialized in chemical wash, chemical overhaul, gas top-up, repair, and new unit installation.",
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
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ],
    founder: {
      "@type": "Person",
      name: "Muhammad",
      jobTitle: "Owner & Founder",
    },
    employee: [
      {
        "@type": "Person",
        name: "Shahzaib",
        jobTitle: "Senior Installation Technician",
        description: "18 years experience in aircond installation",
      },
      {
        "@type": "Person",
        name: "Mudassar",
        jobTitle: "Service & Chemical Wash Technician",
        description: "3 years experience in aircond chemical wash and servicing",
      },
      {
        "@type": "Person",
        name: "Hamzah",
        jobTitle: "Service Technician",
        description: "1.5 years experience in aircond servicing",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(googlePlace.averageRating),
      reviewCount: String(googlePlace.totalReviews),
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
            src="/hero/aircond-pcb-board-replacement-kl.webp"
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
              For 12+ years we have been the aircon partner Kuala Lumpur
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
                  src="/hero/aircond-installation-ampang-selangor.webp"
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

      {/* Meet The Team — named technicians for E-E-A-T trust signals */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className={eyebrow()}>Meet The Team</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>The people </span>
                <span className={title({ size: "md", color: "brand" })}>behind every job.</span>
              </h2>
              <p className="mt-4 text-slate-600 font-medium">
                Real technicians, real experience — not a faceless call centre.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="bg-white h-full">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-sky-600">
                      {member.role}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">{member.experience}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
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
