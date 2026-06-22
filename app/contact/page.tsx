import { Metadata } from "next";
import Image from "next/image";
import {
  FaPhone, FaEnvelope, FaLocationDot, FaRegClock, FaWhatsapp,
} from "react-icons/fa6";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { CoverageAreas } from "@/components/sections/coverage-areas";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact KL Renovator | Aircond Service KL & Selangor",
  alternates: {
    canonical: "https://www.klrenovator.com/contact",
    languages: {
      "en-MY": "https://www.klrenovator.com/contact",
      "x-default": "https://www.klrenovator.com/contact",
    },
  },
  description:
    "Contact KL Renovator for professional aircond servicing in KL & Selangor. Covering Cheras, Ampang, Petaling Jaya, Subang Jaya, Shah Alam, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Kepong, Sri Petaling, Bukit Jalil, Sunway, USJ, Rawang, Putrajaya & Cyberjaya. WhatsApp +60182983573. Same-day service.",
  openGraph: {
    title: "Contact KL Renovator | Aircond Service KL & Selangor",
    description:
      "Fastest response via WhatsApp — reply within 30 minutes. Same-day aircond service across KL & Selangor. Chemical wash from RM 120. Call +60182983573.",
    url: "https://www.klrenovator.com/contact",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-sensor-replacement-klang-valley.jpg",
        width: 1200,
        height: 630,
        alt: "Contact KL Renovator — Aircond Service KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact KL Renovator | Aircond Service KL & Selangor",
    description: "Fastest WhatsApp response — same-day aircond service across KL & Selangor. Chemical wash from RM 120.",
    images: ["https://www.klrenovator.com/hero/aircond-sensor-replacement-klang-valley.jpg"],
  },
};

// ── Schemas ─────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.klrenovator.com/contact" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact KL Renovator",
  url: "https://www.klrenovator.com/contact",
  description: "Contact KL Renovator for professional aircond services in Kuala Lumpur and Selangor. WhatsApp for fastest response.",
  mainEntity: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: "KL Renovator",
    telephone: "+60182983573",
    email: "info@klrenovator.com",
    url: "https://www.klrenovator.com",
    openingHours: "Mo-Su 09:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "A-22-09 Magnaville Selayang",
      addressLocality: "Batu Caves",
      postalCode: "68100",
      addressRegion: "Selangor",
      addressCountry: "MY",
    },
  },
};

const SERVICES_QUICK = [
  "Pressure Chemical Wash",
  "Chemical Overhaul",
  "Gas Top-Up (R22 / R410A / R32)",
  "Troubleshooting & Repair",
  "New Unit Installation",
  "Ceiling Cassette Service",
  "Dismantle & Relocate",
  "Annual Maintenance Contract",
];

const WHATSAPP_MESSAGES = [
  {
    label: "General Quote",
    text: "Hi KL Renovator, I'd like to get a quote for aircond service.",
  },
  {
    label: "Chemical Wash",
    text: "Hi KL Renovator, I need a Chemical Wash for my aircond unit. Can you advise on pricing and availability?",
  },
  {
    label: "Aircond Not Cold",
    text: "Hi KL Renovator, my aircond is running but not cooling properly. Can you help diagnose the issue?",
  },
  {
    label: "Water Leaking",
    text: "Hi KL Renovator, my aircond is leaking water. When can your technician come to check?",
  },
  {
    label: "New Installation",
    text: "Hi KL Renovator, I need a new aircond unit installed. Can I get a quote including labour and materials?",
  },
  {
    label: "Gas Top-Up",
    text: "Hi KL Renovator, I need a gas top-up for my aircond. Can you advise on pricing?",
  },
];

export default function ContactPage() {
  // ContactPage Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.klrenovator.com/contact#contactpage",
    name: "Contact KL Renovator — Aircond Service KL & Selangor",
    description:
      "Contact KL Renovator for professional aircond servicing across Kuala Lumpur and Selangor. Same-day service available. WhatsApp +60182983573.",
    url: "https://www.klrenovator.com/contact",
    mainEntity: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: "KL Renovator",
      legalName: "Multicore Dynamic Resources",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      url: "https://www.klrenovator.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addressStreet,
        addressLocality: siteConfig.addressCity,
        postalCode: siteConfig.addressPostal,
        addressRegion: siteConfig.addressState,
        addressCountry: siteConfig.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geoLat,
        longitude: siteConfig.geoLng,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      hasMap: siteConfig.links.googleMaps,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          contactType: "customer service",
          areaServed: "MY",
          availableLanguage: ["English", "Malay", "Chinese"],
        },
        {
          "@type": "ContactPoint",
          url: siteConfig.whatsappLink,
          contactType: "sales",
          areaServed: "MY",
          availableLanguage: ["English", "Malay", "Chinese"],
        },
      ],
      priceRange: "RM88 – RM2000",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
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
        name: "Contact",
        item: "https://www.klrenovator.com/contact",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
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
            <span className="text-slate-900 font-semibold">Contact</span>
          </nav>
        </div>
      </div>

      {/* ── HERO — White + Low-Opacity Watermark ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        {/* Watermark image — very low opacity */}
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-sensor-replacement-klang-valley.jpg"
            alt="KL Renovator aircond technician servicing unit Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] uppercase text-slate-900">
              Let&apos;s get your<br />
              <span className="text-sky-500">aircon sorted.</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-600 font-medium leading-relaxed">
              Fastest response is via WhatsApp — we reply within 30 minutes
              during business hours. Same-day visits available across KL &amp; Selangor.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Left: Contact Methods */}
            <Reveal>
              <div>
                <p className={eyebrow()}>Reach Us</p>
                <h2 className="mt-3">
                  <span className={title({ size: "sm" })}>Talk to a real </span>
                  <span className={title({ size: "sm", color: "brand" })}>technician.</span>
                </h2>
                <p className="mt-4 text-slate-600 font-medium">
                  Pick whichever channel suits you — we respond fast on all of them.
                </p>

                <div className="mt-8 space-y-3">
                  {/* WhatsApp */}
                  <a href={waLink(rfqMsg)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0284c7] hover:bg-[#0369a1] text-white p-5 transition-all group">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366]">
                      <FaWhatsapp className="h-6 w-6 text-white" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                        Fastest · Reply within 30 mins
                      </p>
                      <p className="font-black uppercase tracking-tight text-white text-lg">
                        WhatsApp Us Now
                      </p>
                    </div>
                    <span className="text-white font-black text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  {/* Phone */}
                  <a href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaPhone className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Direct Call</p>
                      <p className="font-black text-slate-950 text-lg">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaEnvelope className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Email</p>
                      <p className="font-black text-slate-950 break-all">{siteConfig.email}</p>
                    </div>
                  </a>

                  {/* Hours + Area */}
                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaRegClock className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Hours</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">{siteConfig.hours}</p>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaLocationDot className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Coverage</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">KL &amp; Selangor (Klang Valley)</p>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="mt-8 bg-slate-50 border border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-4">
                    Services We Cover
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {SERVICES_QUICK.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <FiCheck className="h-4 w-4 text-sky-600 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right: WhatsApp Quick-Select */}
            <Reveal delay={100}>
              <div className="bg-[#0284c7] text-white p-8 sm:p-10">
                <p className="text-xs font-black uppercase tracking-widest text-sky-100 mb-2">
                  Quick WhatsApp Booking
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  What do you need?
                </h3>
                <p className="text-sky-100 text-sm font-medium mb-8">
                  Tap the service you need — it opens WhatsApp with your message ready.
                  No typing needed.
                </p>
                <div className="grid gap-3">
                  {WHATSAPP_MESSAGES.map((item) => (
                    <a
                      key={item.label}
                      href={`https://wa.me/60182983573?text=${encodeURIComponent(item.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 bg-white/15 hover:bg-[#25D366] border border-white/20 hover:border-[#25D366] px-5 py-4 text-sm font-black uppercase tracking-wider text-white transition-all group"
                    >
                      <span className="flex items-center gap-3">
                        <FaWhatsapp className="h-4 w-4 text-white shrink-0" />
                        {item.label}
                      </span>
                      <span className="text-sky-100 group-hover:text-white transition-colors">→</span>
                    </a>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/20 pt-6">
                  <p className="text-xs text-sky-100 font-medium text-center">
                    Or call us directly at{" "}
                    <a href={`tel:${siteConfig.phone}`}
                      className="text-white font-black hover:text-sky-200 transition-colors">
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CoverageAreas />
    </>
  );
}
