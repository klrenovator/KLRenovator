import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import {
  FaWhatsapp, FaPhone, FaEnvelope, FaRegClock, FaLocationDot,
} from "react-icons/fa6";
import { FiCheck, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { CoverageAreas } from "@/components/sections/coverage-areas";

export const metadata: Metadata = {
  title: "Hubungi KL Renovator | Servis Aircond KL & Selangor",
  description:
    "Hubungi KL Renovator untuk servis aircond di seluruh KL & Selangor. WhatsApp +60182983573 untuk sebut harga hari sama. Harga telus, tindak balas pantas.",
  alternates: {
    canonical: "https://www.klrenovator.com/ms/contact",
    languages: {
      "en-MY": "https://www.klrenovator.com/contact",
      "ms-MY": "https://www.klrenovator.com/ms/contact",
      "zh-MY": "https://www.klrenovator.com/zh/contact",
      "x-default": "https://www.klrenovator.com/contact",
    },
  },
  openGraph: {
    title: "Hubungi KL Renovator | Servis Aircond KL & Selangor",
    description:
      "Tindak balas terpantas melalui WhatsApp — balas dalam 30 minit. Servis aircond hari sama di seluruh KL & Selangor. Cuci kimia dari RM 120.",
    url: "https://www.klrenovator.com/ms/contact",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
    images: [
      { url: "https://www.klrenovator.com/hero/aircond-sensor-replacement-klang-valley.webp", width: 1200, height: 630, alt: "Hubungi KL Renovator — Servis Aircond KL & Selangor" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi KL Renovator | Servis Aircond KL & Selangor",
    description: "Tindak balas terpantas melalui WhatsApp — servis aircond hari sama di seluruh KL & Selangor. Cuci kimia dari RM 120.",
    images: ["https://www.klrenovator.com/hero/aircond-sensor-replacement-klang-valley.webp"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Utama", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Hubungi", item: "https://www.klrenovator.com/ms/contact" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.klrenovator.com/ms/contact#contactpage",
  name: "Hubungi KL Renovator — Servis Aircond KL & Selangor",
  description:
    "Hubungi KL Renovator untuk servis aircond profesional di Kuala Lumpur dan Selangor. Servis hari sama tersedia. WhatsApp +60182983573.",
  url: "https://www.klrenovator.com/ms/contact",
  mainEntity: {
    "@type": "HVACBusiness",
    "@id": "https://www.klrenovator.com/#business",
    name: "KL Renovator",
    legalName: "Multicore Dynamics Resources",
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
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geoLat, longitude: siteConfig.geoLng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "18:00" },
    ],
    hasMap: siteConfig.links.googleMaps,
    priceRange: "RM88 – RM2000",
  },
};

const SERVICES_QUICK = [
  "Cuci Kimia Bertekanan",
  "Overhaul Kimia",
  "Tambah Gas (R22 / R410A / R32)",
  "Penyelesaian Masalah & Pembaikan",
  "Pemasangan Unit Baharu",
  "Servis Ceiling Cassette",
  "Cabut & Pindah",
  "Kontrak Penyelenggaraan Tahunan",
];

const WHATSAPP_MESSAGES = [
  { label: "Sebut Harga Am", text: "Hai KL Renovator, saya ingin mendapatkan sebut harga untuk servis aircond." },
  { label: "Cuci Kimia", text: "Hai KL Renovator, saya memerlukan Cuci Kimia untuk unit aircond saya. Bolehkah anda maklumkan harga dan ketersediaan?" },
  { label: "Aircond Tidak Sejuk", text: "Hai KL Renovator, aircond saya berfungsi tetapi tidak menyejuk dengan baik. Bolehkah anda bantu diagnosis masalah ini?" },
  { label: "Air Bocor", text: "Hai KL Renovator, aircond saya bocor air. Bila teknisi anda boleh datang memeriksa?" },
  { label: "Pemasangan Baharu", text: "Hai KL Renovator, saya perlu memasang unit aircond baharu. Bolehkah saya dapat sebut harga termasuk upah dan bahan?" },
  { label: "Tambah Gas", text: "Hai KL Renovator, saya perlu menambah gas untuk aircond saya. Bolehkah anda maklumkan harga?" },
];

export default function ContactPageMS() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/ms" className="hover:text-sky-600 transition">Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-700 font-medium">Hubungi</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/aircond-sensor-replacement-klang-valley.webp"
            alt="Juruteknik KL Renovator menyervis unit aircond di Kuala Lumpur"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              Hubungi Kami
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-[1.05] uppercase text-slate-900">
              Mari selesaikan<br />
              <span className="text-sky-500">aircond anda.</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-600 font-medium leading-relaxed">
              Tindak balas terpantas adalah melalui WhatsApp — kami membalas dalam masa 30 minit
              semasa waktu perniagaan. Lawatan hari sama tersedia di seluruh KL &amp; Selangor.
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
                <p className={eyebrow()}>Hubungi Kami</p>
                <h2 className="mt-3">
                  <span className={title({ size: "sm" })}>Bercakap dengan juruteknik </span>
                  <span className={title({ size: "sm", color: "brand" })}>sebenar.</span>
                </h2>
                <p className="mt-4 text-slate-600 font-medium">
                  Pilih saluran yang anda suka — kami membalas pantas di semua saluran.
                </p>

                <div className="mt-8 space-y-3">
                  <a href={waLink(rfqMsg)} target="_blank" rel="nofollow noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0284c7] hover:bg-[#0369a1] text-white p-5 transition-all group">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366]">
                      <FaWhatsapp className="h-6 w-6 text-white" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                        Paling Pantas · Balas dalam 30 minit
                      </p>
                      <p className="font-black uppercase tracking-tight text-white text-lg">
                        WhatsApp Kami Sekarang
                      </p>
                    </div>
                    <span className="text-white font-black text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <a href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaPhone className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Panggilan Terus</p>
                      <p className="font-black text-slate-950 text-lg">{siteConfig.phoneDisplay}</p>
                    </div>
                  </a>

                  <a href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 border-2 border-slate-200 bg-white p-5 hover:border-sky-500 hover:bg-sky-50 transition-all">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#0284c7] text-white">
                      <FaEnvelope className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">E-mel</p>
                      <p className="font-black text-slate-950 break-all">{siteConfig.email}</p>
                    </div>
                  </a>

                  <div className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaRegClock className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Waktu</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">{siteConfig.hours}</p>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaLocationDot className="h-3.5 w-3.5 text-sky-500" />
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Liputan</p>
                      </div>
                      <p className="font-black text-slate-950 text-sm">KL &amp; Selangor (Lembah Klang)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-slate-50 border border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-4">
                    Servis Yang Kami Sediakan
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
                  Tempahan Pantas WhatsApp
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Apa yang anda perlukan?
                </h3>
                <p className="text-sky-100 text-sm font-medium mb-8">
                  Ketik servis yang anda perlukan — ia membuka WhatsApp dengan mesej anda sudah sedia.
                  Tiada taipan diperlukan.
                </p>
                <div className="grid gap-3">
                  {WHATSAPP_MESSAGES.map((item) => (
                    <a
                      key={item.label}
                      href={`https://wa.me/60182983573?text=${encodeURIComponent(item.text)}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
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
                    Atau hubungi kami terus di{" "}
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
