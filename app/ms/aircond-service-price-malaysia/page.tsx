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
import { getFreshDateMS } from "@/lib/dates";
import { PriceComparisonUI } from "@/components/price-comparison";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const freshDate = getFreshDateMS();
  const metaTitle = clampMetaTitle(
    buildFreshMetaTitle(`Harga Servis Aircond Malaysia — Senarai Harga Telus`, "ms")
  );
  const metaDesc = clampMetaDescription(
    `Senarai harga servis aircond ${freshDate} di KL & Selangor. Servis asas RM99, cuci kimia RM120, overhaul RM220, tambah gas dari RM2.50/PSI, pasang RM199. Tiada caj tersembunyi.`
  );

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: getServiceOGImages("basic-servicing", "ms"),
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
    title: "Servis Pembersihan (Cleaning)",
    rows: [
      { label: "Servis Asas · Dinding 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Servis Asas · Dinding 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Servis Asas · Dinding 3.0 – 3.5 HP", price: "RM 150" },
      { label: "Cuci Kimia Tekanan · Dinding 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Cuci Kimia Tekanan · Dinding 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Cuci Kimia Tekanan · Dinding 3.0 HP", price: "RM 180" },
      { label: "Chemical Overhaul · Dinding 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Overhaul · Dinding 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Chemical Overhaul · Dinding 3.0 – 3.5 HP", price: "RM 350" },
    ],
  },
  {
    title: "Tambah Gas & Refill (Per PSI)",
    rows: [
      { label: "Isi Semula Gas R22", price: "RM 2.50 / PSI" },
      { label: "Isi Semula Gas R410A", price: "RM 3.00 / PSI" },
      { label: "Isi Semula Gas R32", price: "RM 3.00 / PSI" },
      { label: "Pemeriksaan Kebocoran (Leak Check)", price: "RM 88" },
    ],
  },
  {
    title: "Pemasangan Unit Baharu",
    rows: [
      { label: "Dinding 1.0 – 1.5 HP (7 kaki paip termasuk)", price: "RM 199" },
      { label: "Dinding 2.0 HP", price: "RM 249" },
      { label: "Dinding 2.5 HP", price: "RM 279" },
      { label: "Dinding 3.0 HP", price: "RM 329" },
      { label: "Ceiling Cassette 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Unit Tingkap 1.0 – 1.5 HP", price: "RM 199" },
    ],
  },
  {
    title: "Ceiling Cassette (Komersial)",
    rows: [
      { label: "Servis Asas · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Servis Asas · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Cuci Kimia · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Cuci Kimia · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Overhaul Kimia · 1.0 – 3.0 HP", price: "RM 430" },
    ],
  },
  {
    title: "Pembaikan & Alat Ganti",
    rows: [
      { label: "Yuran Diagnostik (dikecualikan jika dibaiki)", price: "RM 88" },
      { label: "Tukar Kapasitor", price: "RM 150 – 250" },
      { label: "Tukar Motor Kipas Dalaman", price: "RM 250 – 380" },
      { label: "Tukar Motor Kipas Luaran", price: "RM 300 – 450" },
      { label: "Repair / Tukar Papan PCB", price: "RM 280 – 600" },
      { label: "Tukar Pam Longkang", price: "RM 350 – 550" },
    ],
  },
  {
    title: "Tanggal, Pemindahan & Kecemasan",
    rows: [
      { label: "Tanggal Sahaja (tanpa pasang semula)", price: "RM 90" },
      { label: "Tanggal + Pasang Semula (1.0 – 1.5 HP, berdekatan)", price: "RM 250" },
      { label: "Tanggal + Pasang Semula lokasi berbeza (1.0 – 1.5 HP)", price: "RM 350" },
      { label: "Diagnostik Kecemasan (9am–6pm)", price: "RM 88" },
      { label: "Surcaj Waktu Luar (6pm–10pm)", price: "RM 50" },
    ],
  },
  {
    title: "Kontrak Penyelenggaraan Tahunan (AMC)",
    rows: [
      { label: "AMC Basic — 2× servis asas + 1× cuci kimia", price: "RM 299/tahun" },
      { label: "AMC Standard — 2× asas + 2× cuci kimia + keutamaan", price: "RM 499/tahun" },
      { label: "AMC Premium — 4× asas + 2× cuci + 1× overhaul", price: "RM 899/tahun" },
    ],
  },
];

const faqs = [
  {
    q: "Adakah harga ini termasuk caj pengangkutan?",
    a: "Ya. Harga yang dipaparkan adalah harga 'all-in' untuk kawasan KL & Selangor. Kami tidak mengenakan caj tersembunyi untuk pengangkutan atau tol.",
  },
  {
    q: "Adakah terdapat waranti selepas servis?",
    a: "Semua kerja servis dan pembaikan dilindungi waranti kerja 1 bulan. Alat ganti (kapasitor, motor, PCB) dilindungi waranti 3 bulan. Jika masalah sama berulang, kami datang semula secara percuma.",
  },
  {
    q: "Berapa lama masa yang diambil untuk servis cuci kimia?",
    a: "Satu unit dinding standard biasanya 45–60 minit. Chemical overhaul mungkin 2–3 jam kerana unit dibuka sepenuhnya.",
  },
  {
    q: "Bagaimanakah tambah gas dikenakan bayaran?",
    a: "Tambah gas dikenakan bayaran berdasarkan PSI sebenar yang diperlukan selepas pemeriksaan oleh juruteknik kami. R22 ialah RM2.50/PSI, manakala R410A dan R32 ialah RM3.00/PSI. Kami hanya mengisi jumlah yang diperlukan dan menyediakan harga telus tanpa caj tersembunyi. Kos akhir bergantung kepada jenis gas, jumlah PSI dan keadaan kebocoran.",
  },
  {
    q: "Boleh saya dapat diskaun jika servis banyak unit?",
    a: "Ya. Diskaun 5% untuk 2–3 unit, 10% untuk 4–8 unit, dan 15% untuk 8 unit ke atas dalam satu lawatan yang sama.",
  },
  {
    q: "Kenapa harga overhaul lebih mahal dari cuci kimia?",
    a: "Overhaul memerlukan juruteknik menurunkan keseluruhan unit dari dinding untuk dicuci setiap bahagian secara individu. Cuci kimia dilakukan tanpa menurunkan unit. Overhaul adalah penyelesaian tetap untuk bocor air kronik.",
  },
  {
    q: "Bagaimana cara pembayaran?",
    a: "Kami menerima tunai, pemindahan bank dalam talian, atau DuitNow selepas kerja selesai dan anda berpuas hati. Tiada bayaran pendahuluan diperlukan.",
  },
  {
    q: "Apa perbezaan halaman ini dengan panduan blog harga?",
    a: "Halaman ini ialah senarai harga pantas untuk tempahan. Untuk pecahan penuh 9 perkhidmatan, jadual HP lengkap dan panduan pilih servis, lihat artikel blog Harga Servis Aircond Malaysia 2026.",
  },
];

const serviceLinks = [
  { href: "/ms/services/basic-servicing", label: "Servis Asas" },
  { href: "/ms/services/chemical-wash", label: "Cuci Kimia" },
  { href: "/ms/services/chemical-overhaul", label: "Overhaul Kimia" },
  { href: "/ms/services/gas-topup", label: "Tambah Gas" },
  { href: "/ms/services/installation", label: "Pemasangan" },
  { href: "/ms/services/repair", label: "Pembaikan" },
  { href: "/ms/services/ceiling-cassette", label: "Ceiling Cassette" },
  { href: "/ms/services/dismantling-relocation", label: "Tanggal & Pindah" },
  { href: "/ms/services/emergency", label: "Kecemasan" },
  { href: "/ms/services/maintenance-contract", label: "Kontrak AMC" },
  { href: "/ms/installation-price-malaysia", label: "Harga Pasang" },
  { href: "/ms/cuci-aircond-kl", label: "Cuci Aircond KL" },
  { href: "/ms/blog/harga-servis-aircond-2026-malaysia", label: "Panduan Blog Penuh" },
];

export default function HargaServisPage() {
  const freshDate = getFreshDateMS();

  const serviceSchema = buildServiceSchema({
    slug: "aircond-service-price-malaysia",
    name: "Harga Servis Aircond 2026 Malaysia",
    description:
      "Senarai harga telus untuk servis, cuci kimia, overhaul, tambah gas, pemasangan dan repair aircond di KL & Selangor.",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Utama",
        item: "https://www.klrenovator.com/ms",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Harga Servis Aircond 2026",
        item: "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Harga Servis Aircond ${freshDate} Malaysia`,
    description:
      "Senarai harga servis aircond lengkap dan telus di Kuala Lumpur & Selangor. Dikemas kini bulanan.",
    url: "https://www.klrenovator.com/ms/aircond-service-price-malaysia",
    inLanguage: "ms-MY",
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
            <NextLink href="/ms" className="hover:text-sky-600 transition">
              Utama
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Harga Servis Aircond 2026</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className={eyebrow()}>Kemas Kini: {freshDate}</p>
            <h1 className="mt-4 speakable">
              <span className={title({ size: "lg" })}>Harga Servis </span>
              <span className={title({ size: "lg", color: "brand" })}>Aircond 2026</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto speakable">
              Senarai harga servis aircond terbaru di KL &amp; Selangor. KL Renovator tawarkan harga telus tanpa caj
              tersembunyi — servis asas dari RM 99, cuci kimia dari RM 120, pasang dari RM 199.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BookingButton serviceName="Harga Servis Aircond 2026" size="lg" />
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
                  {cat.title === "Tambah Gas & Refill (Per PSI)" && (
                    <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        * Tambah gas dikenakan bayaran berdasarkan PSI sebenar selepas pemeriksaan oleh juruteknik kami. 
                        Kami hanya mengisi jumlah yang diperlukan dan menyediakan harga telus tanpa caj tersembunyi.
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 bg-sky-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-sky-900/20">
              <h3 className="text-xl sm:text-2xl font-black uppercase">Pakej Diskaun Banyak Unit</h3>
              <p className="mt-2 text-sky-100 font-medium">Servis lebih banyak unit dalam satu lawatan untuk penjimatan lebih besar.</p>
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

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Kualiti &amp; Kepercayaan</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Kenapa Pilih </span>
                <span className={title({ size: "sm", color: "brand" })}>Servis Kami?</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: <FiCheck />,
                title: "Harga Telus & Tetap",
                desc: "Tiada caj tersembunyi. Harga yang kami sebut di WhatsApp adalah harga yang anda bayar di lokasi.",
              },
              {
                icon: <FiShield />,
                title: "Waranti Kerja 1 Bulan",
                desc: "Setiap servis dilindungi jaminan workmanship. Jika ada masalah semula, kami datang betulkan percuma.",
              },
              {
                icon: <FiClock />,
                title: "Slot Hari Yang Sama",
                desc: "WhatsApp kami sebelum jam 11 pagi untuk peluang terbaik mendapatkan slot servis pada hari yang sama.",
              },
              {
                icon: <FiTool />,
                title: "20 Jenama Disokong",
                desc: "Daikin, Panasonic, Mitsubishi, Acson, York, LG, Samsung, Midea dan 12 jenama lagi — unit dinding, cassette & tingkap.",
              },
              {
                icon: <FiHome />,
                title: "Liputan KL & Selangor",
                desc: "Dari Batu Caves ke Klang, Cheras ke Shah Alam — pasukan tempatan siap dihantar 30–60 minit.",
              },
              {
                icon: <FiTag />,
                title: "Disahkan Sebelum Kerja",
                desc: "Semua harga disahkan secara bertulis melalui WhatsApp sebelum juruteknik mula kerja.",
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
            <h2 className="text-center text-lg font-black text-slate-900 mb-6">Pautan Berkaitan</h2>
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
              <p className={eyebrow()}>Soalan Lazim</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 speakable">
                FAQ Harga Servis Aircond
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
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Dapatkan Sebut Harga Percuma Sekarang</h2>
          <p className="mt-4 text-lg text-slate-400 font-medium">
            WhatsApp kami model aircond dan lokasi anda untuk respon pantas dalam 30 minit.
          </p>
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
      <PriceComparisonUI locale="ms" />
    </>
  );
}
