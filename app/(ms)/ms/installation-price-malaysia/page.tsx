import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { buildServiceSchema } from "@/lib/seo";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: buildFreshMetaTitle("Harga Pemasangan Aircond 2026 — RM 199 Siap Pasang | KL Renovator", "ms"),
  description:
    padMetaDescription("Panduan harga pemasangan aircond KL & Selangor 2026. Pasang RM 199 termasuk 7 kaki paip kuprum, pendawaian, vakum & ujian kebocoran. Semua 20 jenama."),
  openGraph: {
    title: buildFreshMetaTitle("Harga Pasang Aircond 2026 — Dari RM 199 | KL Renovator", "ms"),
    description: "Panduan harga pemasangan aircond lengkap untuk KL & Selangor 2026. RM 199 termasuk 7 kaki paip kuprum, vakum & ujian kebocoran.",
    url: "https://www.klrenovator.com/ms/installation-price-malaysia",
    images: getServiceOGImages("installation", "ms"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("installation", "ms"),
  },
  alternates: {
    canonical: "https://www.klrenovator.com/ms/installation-price-malaysia",
    languages: {
      "en-MY": "https://www.klrenovator.com/installation-price-malaysia",
      "ms-MY": "https://www.klrenovator.com/ms/installation-price-malaysia",
      "zh-MY": "https://www.klrenovator.com/zh/installation-price-malaysia",
      "x-default": "https://www.klrenovator.com/installation-price-malaysia",
    },
  },
};

const INSTALL_PRICES = [
  { label: "Dinding · 1.0 HP", price: "RM 199" },
  { label: "Dinding · 1.5 HP", price: "RM 199" },
  { label: "Dinding · 2.0 HP", price: "RM 249" },
  { label: "Dinding · 2.5 HP", price: "RM 279" },
  { label: "Dinding · 3.0 HP", price: "RM 329" },
  { label: "Dinding · 4.0 HP", price: "RM 399" },
  { label: "Dinding · 5.0 HP", price: "RM 449" },
  { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 290" },
  { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 350" },
  { label: "Ceiling Cassette · 3.5–6.0 HP", price: "RM 400" },
  { label: "Unit Tingkap · 1.0–1.5 HP", price: "RM 199" },
  { label: "Unit Tingkap · 2.0–2.5 HP", price: "RM 249" },
];

const MATERIAL_PRICES = [
  { label: "Paip Kuprum 1.0–1.5 HP", price: "RM 17/kaki" },
  { label: "Paip Kuprum 2.0–2.5 HP", price: "RM 23/kaki" },
  { label: "Paip Kuprum 3.0–3.5 HP", price: "RM 27/kaki" },
  { label: "Wayar Elektrik", price: "RM 9/kaki" },
  { label: "Penebat", price: "RM 7/kaki" },
  { label: "Paip saliran melebihi 7 kaki", price: "RM 5/kaki" },
  { label: "Braket Kompressor / Luaran Standard", price: "RM 45" },
  { label: "Braket Kompressor / Luaran Heavy Duty", price: "RM 70" },
  { label: "Braket Universal Dalaman", price: "RM 35" },
  { label: "Casing PVC Kecil (Wayar Elektrik)", price: "RM 6/kaki" },
  { label: "Casing PVC Besar (Paip Kuprum + Wayar + Penebat)", price: "RM 12/kaki" },
  { label: "Pemasangan Titik Plag Elektrik", price: "RM 100" },
  { label: "Kerja Pecah Dinding & Pendam", price: "RM 6/kaki" },
  { label: "Caj Akses Bangunan Tinggi", price: "RM 50–150" },
  { label: "Dulang Kabel Logam Standard", price: "RM 15/kaki" },
];

const FAQS = [
  {
    q: "Berapa harga pasang aircond di KL & Selangor 2026?",
    a: "Dinding 1.0–1.5 HP dari RM 199. 2.0 HP dari RM 249, 2.5 HP dari RM 279, 3.0 HP dari RM 329. Ceiling cassette dari RM 290. Unit tingkap dari RM 199. Setiap harga termasuk 7 kaki paip kuprum, penebat, wayar elektrik dan paip longkang, vakum, ujian kebocoran dan pentauliahan — disahkan sebelum kami mula.",
  },
  {
    q: "Apa yang termasuk dalam pemasangan asas RM 199?",
    a: "Pakej 9 titik: (1) Tinjauan tapak & penilaian dinding, (2) 7 kaki paip kuprum bersaiz betul dengan penebat, (3) Pendawaian elektrik melalui konduit khusus, (4) Paip longkang PVC dengan kecerunan betul, (5) Braket dinding dengan pad getah getaran, (6) Evakuasi pam vakum minimum 15 min, (7) Pentauliahan pam vakum (500 mikron), (8) Pentauliahan penuh — penyejukan, aliran udara, termostat, (9) Kad kerja bertulis + waranti kerja 1 bulan.",
  },
  {
    q: "Kenapa paip kuprum tambahan dikenakan caj selepas 7 kaki?",
    a: "Standard 7 kaki mencakupi kebanyakan susun atur bilik. Laluan lebih panjang memerlukan lebih paip kuprum, penebat dan buruh. Caj dikira setiap kaki pada kadar telus (RM 17–27/kaki mengikut HP). Juruteknik mengukur laluan sebenar yang diperlukan dan mengesahkan kos tambahan sebelum memotong sebarang paip.",
  },
  {
    q: "Apa beza antara RM 199 asas dan pakej paip kuprum penuh?",
    a: "RM 199 meliputi pemasangan standard laluan lurus sehingga 7 kaki kuprum. 'Pakej paip kuprum penuh' biasanya bermaksud laluan kuprum lebih panjang (10–20 kaki+), trunking tersembunyi, dulang kabel luar, dan mungkin braket tambahan — biasa di kondo di mana unit luar lebih jauh dari unit dalam. Jumlah kos bergantung pada panjang paip sebenar dan bahan. Kami sebut harga tepat di lokasi sebelum memulakan.",
  },
  {
    q: "Berapa lama masa pemasangan?",
    a: "Dinding standard: 2–3 jam. Ceiling cassette: 3–4 jam. Dua unit hari sama: 5–6 jam. Kami tidak pernah tergesa-gesa — evakuasi vakum yang betul sahaja memerlukan 15–20 minit minimum.",
  },
  {
    q: "Adakah anda membekalkan unit aircond?",
    a: "KL Renovator menyediakan perkhidmatan pemasangan profesional sahaja. Anda beli unit dari Harvey Norman, Senheng, AEON, Lazada, Shopee, dll. Jika perlukan panduan jenama dan HP yang sesuai, WhatsApp kami sebelum membeli — kami nasihat berdasarkan keadaan bilik sebenar Malaysia.",
  },
  {
    q: "Boleh pasang di kondo tinggi dengan peraturan ketat?",
    a: "Boleh — kami pasang di KLCC, Mont Kiara, Bangsar, Damansara, Sentul setiap minggu. Kami patuhi peraturan setiap bangunan: waktu kerja, perlindungan lif, had bunyi, pelupusan sisa. Jika pengurusan perlukan permit, beritahu lebih awal dan kami sediakan dokumen.",
  },
  {
    q: "Apa waranti untuk pemasangan?",
    a: "Waranti kerja 1 bulan untuk setiap pemasangan. Jika unit bocor gas, tidak sejuk, atau masalah longkang kerana kerja kami dalam tempoh itu, kami kembali baiki tanpa caj. Ujian vakum + tekanan kami mengesan 99% masalah sebelum kami pulang.",
  },
];

const WHY_ITEMS = [
  { title: buildFreshMetaTitle("Harga Telus", "ms"), zh: "价格透明", desc: "Harga penuh disahkan sebelum kerja dimulakan. Tiada caj tersembunyi." },
  { title: buildFreshMetaTitle("Paip Kuprum Betul", "ms"), zh: "正确铜管", desc: "Diameter paip dipadankan mengikut HP unit anda — bukan saiz universal nipis." },
  { title: buildFreshMetaTitle("Vakum Wajib", "ms"), zh: "强制抽真空", desc: "Kami tidak pernah langkau vakum pam. Ini melindungi pemampat anda." },
  { title: buildFreshMetaTitle("500+ Ulasan 5★", "ms"), zh: "500+五星好评", desc: "Rekod prestasi kami bercakap sendiri di seluruh Lembah Klang." },
  { title: buildFreshMetaTitle("Waranti 1 Bulan", "ms"), zh: "一个月保修", desc: "Semua pemasangan dilindungi waranti kerja 1 bulan." },
  { title: buildFreshMetaTitle("Hari Sama Tersedia", "ms"), zh: "当天可安装", desc: "WhatsApp lokasi anda — kami sahkan slot terdekat dalam minit." },
];

export default function MsInstallationPricePage() {
  const serviceSchema = buildServiceSchema({
    slug: "installation",
    name: "Pemasangan Aircond",
    description: "Pemasangan aircond profesional dari RM 199. Semua 20 jenama, evakuasi pam vakum, ujian kebocoran tekanan, waranti 1 bulan.",
    startPrice: 199,
    locale: "ms",
    priceTable: INSTALL_PRICES,
    pricingName: "Harga Pemasangan Aircond 2026",
    priceDescription: "Dari RM 199",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Panduan Harga Pemasangan", item: "https://www.klrenovator.com/ms/installation-price-malaysia" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition">Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Panduan Harga Pemasangan Aircond 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/hero/aircond-installation-kuala-lumpur.webp" alt="Harga pasang aircond 2026" fill sizes="100vw" className="object-cover" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-block bg-sky-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">Panduan Harga 2026</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900 speakable">
                Harga Pasang Aircond 2026 — Dari RM 199
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
                Cari &quot;harga pasang aircond&quot; atau &quot;pasang aircond berapa&quot;? Panduan telus KL Renovator merangkumi setiap rating HP, setiap jenis unit, dan setiap kos bahan — tiada caj tersembunyi. <strong>RM 199</strong> pemasangan asas termasuk 7 kaki paip kuprum, pendawaian, pam vakum, ujian kebocoran dan waranti 1 bulan.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider text-sm">Dari RM 199</span>
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Semua 20 Jenama · Seluruh KL & Selangor</span>
              </div>
              <div className="mt-8"><BookingButton serviceName="Pemasangan Aircond" size="lg" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 7 Kaki Kuprum Termasuk</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Pam Vakum Wajib</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Waranti 1 Bulan</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 500+ Ulasan 5★</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Berdaftar SSM</span>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Senarai Harga Pemasangan</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 speakable">Senarai Harga Pemasangan Aircond Lengkap 2026</h2>
            <p className="text-sm text-slate-500 mb-6">Semua harga termasuk 7 kaki paip kuprum, penebat, wayar elektrik dan paip longkang, vakum, ujian kebocoran & pentauliahan. Disahkan sebelum kerja bermula.</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {INSTALL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs text-emerald-800 leading-relaxed">
                <span className="font-black">✓ Termasuk percuma dalam setiap pemasangan: </span>
                7 kaki paip kuprum (bersaiz betul mengikut HP), pendawaian elektrik, paip longkang PVC dinding, evakuasi pam vakum, pentauliahan pam vakum (500 mikron), pentauliahan, kad kerja bertulis.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9-Point What You Get */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Apa Yang Anda Dapat</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">Apa Yang Termasuk Dalam Pemasangan Asas RM 199?</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: buildFreshMetaTitle("Tinjauan Tapak & Penilaian Dinding", "ms"), desc: "Juruteknik semak kekuatan dinding, kapasiti bekalan elektrik, kecerenan longkang dan kedudukan pemampat luar sebelum menggerudi." },
              { title: buildFreshMetaTitle("7 Kaki Paip Kuprum (Saiz Betul)", "ms"), desc: "Diameter paip dipadankan mengikut HP unit anda — bukan saiz universal nipis. Dengan penebat yang betul." },
              { title: buildFreshMetaTitle("Pendawaian + Konduit", "ms"), desc: "Pendawaian khusus dari pengasing ke unit dalaman melalui konduit yang betul." },
              { title: buildFreshMetaTitle("Paip Longkang PVC", "ms"), desc: "Ditetapkan dengan kecerunan jatuh yang betul supaya air mengalir secara semula jadi." },
              { title: buildFreshMetaTitle("Braket + Pad Getah", "ms"), desc: "Braket diratakan dan dilekatkan dengan pad getah untuk mengurangkan bunyi getaran pemampat." },
              { title: buildFreshMetaTitle("Evakuasi Pam Vakum", "ms"), desc: "Minimum 15–20 minit. Membuang semua kelembapan dan udara dari paip bahan pendingin." },
              { title: buildFreshMetaTitle("Ujian Kebocoran ", "ms"), desc: "Mengesahkan sifar kebocoran sebelum bahan pendingin dilepaskan. Langkah yang dilangkau oleh pemasang murah." },
              { title: buildFreshMetaTitle("Pentauliahan Penuh", "ms"), desc: "Output penyejukan diuji pada semua kelajuan kipas, termostat dikalibrasi, aliran udara disahkan." },
              { title: buildFreshMetaTitle("Waranti Kerja 1 Bulan", "ms"), desc: "Jika sebarang masalah berulang kerana kerja kami dalam 1 bulan, kami kembali baiki tanpa caj." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-emerald-500 text-white mt-0.5"><FiCheck className="h-3 w-3" /></span>
                  <h3 className="font-black text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-14 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Bahan Tambahan</p>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Bahan & Caj Tambahan</h2>
            <p className="text-sm text-slate-500 mb-6">Hanya dikenakan apabila pemasangan anda memerlukan lebih dari pakej 7 kaki standard. Dikutip dan disahkan sebelum kerja bermula.</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {MATERIAL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Perbandingan Pakej</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">Pemasangan RM 199 vs Pakej Paip Kuprum Penuh</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-white border-2 border-sky-200 rounded-2xl p-6">
                <span className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">Paling Popular</span>
                <h3 className="font-black text-xl text-slate-900">Pemasangan Standard</h3>
                <p className="text-3xl font-black text-sky-600 mt-2">RM 199</p>
                <p className="text-xs text-slate-500 mt-1">Dinding 1.0–1.5 HP</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 7 kaki paip kuprum termasuk</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Pendawaian + longkang + braket</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Pam vakum + ujian kebocoran</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Pentauliahan + kad kerja</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Waranti kerja 1 bulan</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>Sesuai untuk:</strong> Susun atur bilik standard di mana unit dalam dan luar dalam jarak 7 kaki. Kebanyakan rumah teres, pangsapuri dan bilik tingkat bawah.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">Untuk Laluan Panjang</span>
                <h3 className="font-black text-xl text-slate-900">Pakej Paip Kuprum Penuh</h3>
                <p className="text-3xl font-black text-slate-600 mt-2">RM 350–600+</p>
                <p className="text-xs text-slate-500 mt-1">Bergantung pada panjang & bahan</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 10–20 kaki+ paip kuprum</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Trunking PVC tersembunyi</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Dulang kabel luar jika perlu</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Braket tambahan</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Caj akses bangunan tinggi</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>Sesuai untuk:</strong> Kondo tinggi di mana unit luar di balkoni lebih jauh. Pejabat dan lot kedai dengan laluan siling panjang. Harga dikutip di lokasi selepas tinjauan.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1 text-center">Mengapa KL Renovator</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 text-center">Mengapa Pelanggan Memilih Kami</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-black text-slate-900 text-sm mb-0.5">{item.title}</h3>
                <p className="text-[10px] text-slate-500 font-semibold mb-2">English · {item.zh}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Soalan Lazim · FAQ · 常见问答</p>
            <h2 className="text-2xl font-black text-slate-900 mb-6 speakable">Soalan Biasa Tentang Pemasangan Aircond</h2>
          </Reveal>
          <div className="border border-slate-200 divide-y divide-slate-200">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">Tempah Pemasangan Hari Ini</p>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">Dapatkan Harga Pemasangan Pasti — WhatsApp Kami Sekarang</h2>
          <p className="text-sky-100 text-sm mb-6 max-w-2xl mx-auto">Hantar jenama unit, HP dan lokasi anda. Kami sahkan harga tepat dan slot tersedia dalam minit. Pemasangan hari sama tersedia Isnin–Ahad di seluruh KL & Selangor.</p>
          <BookingButton serviceName="Pemasangan Aircond" size="lg" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <NextLink href="/ms/services/installation" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">Lihat Halaman Pemasangan Penuh <FiArrowRight className="h-3 w-3" /></NextLink>
            <NextLink href="/ms/cuci-aircond-kl" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">Cuci Kimia dari RM 120 <FiArrowRight className="h-3 w-3" /></NextLink>
          </div>
        </div>
      </section>

      {/* Keyword tags */}
      <section className="py-6 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {["harga pasang aircond 2026", "pasang aircond KL", "kos pemasangan aircond selangor", "aircond installation price Malaysia", "pemasangan aircond murah", "harga pasang aircond kondo"].map((kw) => (
              <span key={kw} className="inline-flex items-center bg-slate-50 text-slate-600 px-3 py-1.5 text-xs font-bold rounded-full border border-slate-200">{kw}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="ms" heading="Kalkulator Aircond Percuma" />
        </div>
      </section>

      <PriceComparisonUI locale="ms" />
    </>
  );
}
