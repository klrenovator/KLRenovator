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
import { getFreshDateMS } from "@/lib/dates";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDateMS();
  return {
    title: `Harga Servis Aircond ${freshDate} Malaysia — Senarai Harga Telus`,
    description: `Senarai harga servis aircond ${freshDate} terbaru di KL & Selangor. Cuci kimia RM120, servis asas RM99, overhaul RM220 & tambah gas RM120. Harga telus tanpa caj tersembunyi.`,
    openGraph: {
      title: `Harga Servis Aircond ${freshDate} Malaysia — Senarai Harga Telus`,
      description: `Cari harga servis aircond ${freshDate} terbaru di KL & Selangor. Kami tawarkan harga telus untuk cuci kimia, overhaul & repair. WhatsApp +60182983573.`,
      url: "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
    },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("basic-servicing", "ms"),
  },
    alternates: {
      canonical: "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
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
    title: clampMetaTitle("Servis Pembersihan (Cleaning)"),
    rows: [
      { label: "Servis Asas (Standard) · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Servis Asas (Standard) · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Cuci Kimia Tekanan (Chemical Wash) · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Cuci Kimia Tekanan (Chemical Wash) · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Cuci Kimia Tekanan (Chemical Wash) · 3.0 HP", price: "RM 180" },
      { label: "Chemical Overhaul (Dismantle) · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Overhaul (Dismantle) · 2.0 – 2.5 HP", price: "RM 280" },
    ],
  },
  {
    title: clampMetaTitle("Tambah Gas & Refill"),
    rows: [
      { label: "Gas R22 (Standard) · 1.0 HP", price: "RM 120" },
      { label: "Gas R410A (Inverter) · 1.0 HP", price: "RM 150" },
      { label: "Gas R32 (Eco Inverter) · 1.0 HP", price: "RM 180" },
      { label: "Pemeriksaan Kebocoran (Leak Check)", price: "RM 88" },
    ],
  },
  {
    title: clampMetaTitle("Pembaikan & Alat Ganti"),
    rows: [
      { label: "Yuran Diagnostik (Diagnostic Fee)", price: "RM 88" },
      { label: "Tukar Kapasitor (Capacitor)", price: "RM 150 – 250" },
      { label: "Tukar Motor Kipas (Fan Motor)", price: "RM 250 – 380" },
      { label: "Repair Papan PCB (Control Board)", price: "RM 280 – 600" },
    ],
  },
];

const faqs = [
  { q: "Adakah harga ini termasuk caj pengangkutan?", a: "Ya. Harga yang dipaparkan adalah harga 'all-in' untuk kawasan KL & Selangor. Kami tidak mengenakan caj tersembunyi untuk pengangkutan atau tol." },
  { q: "Adakah terdapat waranti selepas servis?", a: "Semua kerja servis dan pembaikan kami dilindungi oleh jaminan (workmanship warranty) selama 1 bulan. Jika masalah yang sama berulang, kami akan datang semula secara percuma." },
  { q: "Berapa lama masa yang diambil untuk servis cuci kimia?", a: "Satu unit dinding standard biasanya mengambil masa 45 hingga 60 minit. Untuk chemical overhaul, ia mungkin mengambil masa 2 hingga 3 jam kerana unit perlu dibuka sepenuhnya." },
  { q: "Adakah harga gas berbeza mengikut jenis?", a: "Ya. Gas R22 adalah untuk model lama, manakala R410A dan R32 adalah untuk model Inverter moden. Harga berbeza mengikut tekanan (PSI) yang diperlukan oleh unit anda." },
  { q: "Boleh saya dapat diskaun jika servis banyak unit?", a: "Mestilah boleh! Kami menawarkan diskaun 5% untuk 2-3 unit, 10% untuk 4-8 unit, dan 15% untuk 8 unit ke atas dalam satu lawatan yang sama." },
  { q: "Kenapa harga overhaul lebih mahal dari cuci kimia?", a: "Overhaul memerlukan juruteknik menurunkan keseluruhan unit dari dinding untuk dicuci setiap bahagian secara individu, manakala cuci kimia dilakukan tanpa menurunkan unit. Overhaul adalah penyelesaian tetap untuk masalah bocor air kronik." },
  { q: "Bagaimana cara pembayaran?", a: "Kami menerima tunai (cash) atau pemindahan bank dalam talian (online transfer) selepas kerja selesai dan anda berpuas hati dengan kualiti servis kami." },
];

export default function HargaServisPage() {
  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "Harga Servis Aircond 2026 Malaysia",
    description: "Senarai harga telus untuk servis, cuci kimia, overhaul dan repair aircond di KL & Selangor.",
    startPrice: 99,
    locale: "ms",
    priceTable: pricingCategories[0].rows,
    pricingName: "Senarai Harga Servis Aircond 2026",
    priceDescription: "Harga bermula dari RM 99 untuk servis asas.",
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
            <NextLink href="/ms" className="hover:text-sky-600 transition">Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Harga Servis Aircond 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Kemas Kini: {getFreshDateMS()}</p>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Harga Servis </span>
              <span className={title({ size: "lg", color: "brand" })}>Aircond {new Date().getFullYear()}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Cari senarai harga servis aircond terbaru di KL & Selangor. KL Renovator menawarkan harga telus tanpa caj tersembunyi untuk kediaman dan pejabat anda.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName={`Penyenaraian Harga ${new Date().getFullYear()}`} size="lg" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
              >
                Hubungi Kami: {siteConfig.phoneDisplay}
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
              <h3 className="text-xl sm:text-2xl font-black uppercase">Pakej Diskaun Banyak Unit</h3>
              <p className="mt-2 text-sky-100 font-medium">Servis lebih banyak unit dalam satu lawatan untuk lebih penjimatan.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">5% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">2 – 3 Unit</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">10% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">4 – 8 Unit</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-black">15% Off</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">8+ Unit</p>
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
              <p className={eyebrow()}>Kualiti & Kepercayaan</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Kenapa Pilih </span>
                <span className={title({ size: "sm", color: "brand" })}>Servis Kami?</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: <FiCheck />, title: clampMetaTitle("Harga Telus & Tetap"), desc: "Tiada caj tersembunyi. Harga yang kami sebut di WhatsApp adalah harga yang anda bayar di lokasi." },
              { icon: <FiShield />, title: clampMetaTitle("Waranti Kerja 1 Bulan"), desc: "Setiap servis dilindungi oleh jaminan workmanship. Jika ada masalah semula, kami datang betulkan percuma." },
              { icon: <FiClock />, title: clampMetaTitle("Slot Hari Yang Sama"), desc: "WhatsApp kami sebelum jam 11 pagi untuk peluang terbaik mendapatkan slot servis pada hari yang sama." },
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
              <p className={eyebrow()}>Soalan Lazim</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">FAQ Harga Servis Aircond</h2>
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
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Dapatkan Sebut Harga Percuma Sekarang</h2>
          <p className="mt-4 text-lg text-slate-400 font-medium">WhatsApp kami model aircond dan lokasi anda untuk respon pantas dalam 30 minit.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink("Hi KL Renovator, saya ingin bertanya tentang harga servis aircond.")}
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-10 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all shadow-lg shadow-emerald-900/20"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp Kami
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
