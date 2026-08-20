import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PageExplainers } from "@/components/aeo-explainer-blocks";

export const dynamic = "force-static";

const waMsg = "Hi KL Renovator, saya nak tempah Cuci Aircond KL. Lokasi saya KL/Selangor. Terima kasih!";
const waHref = waLink(waMsg);

export const metadata: Metadata = {
  title: buildFreshMetaTitle("Cuci Aircond KL & Selangor 2026 — Chemical Wash RM120 | KL Renovator", "ms"),
  description: padMetaDescription("Cuci aircond KL & Selangor — chemical wash RM120. Same-day KL Renovator. 500+ 5★ Google. Hapuskan bau, bocor & tak sejuk. WhatsApp +60182983573."),
  alternates: {
    canonical: "https://www.klrenovator.com/ms/cuci-aircond-kl",
    languages: {
      "ms-MY": "https://www.klrenovator.com/ms/cuci-aircond-kl",
      "en-MY": "https://www.klrenovator.com/cuci-aircond-kl",
      "zh-MY": "https://www.klrenovator.com/zh/cuci-aircond-kl",
      "x-default": "https://www.klrenovator.com/cuci-aircond-kl",
    },
  },
  openGraph: {
    title: buildFreshMetaTitle("Cuci Aircond KL — RM120 | KL Renovator", "ms"),
    description: "Chemical wash RM120. Same-day KL & Selangor. 500+ 5-star. Waranti 1 bulan.",
    url: "https://www.klrenovator.com/ms/cuci-aircond-kl",
    locale: "ms_MY",
    type: "website",
    images: getServiceOGImages("chemical-wash", "ms"),
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("chemical-wash", "ms"),
  },
};

const pricing = [
  { label: "Wall-Mounted 1.0–1.5 HP", price: "RM 120" },
  { label: "Wall-Mounted 2.0–2.5 HP", price: "RM 150" },
  { label: "Wall-Mounted 3.0 HP", price: "RM 180" },
  { label: "Ceiling Cassette 1.0–1.5 HP", price: "RM 220" },
  { label: "Ceiling Cassette 2.0–3.0 HP", price: "RM 280" },
  { label: "Window Unit 1.0–2.0 HP", price: "RM 130" },
];

const areas = ["Kuala Lumpur","Petaling Jaya","Subang Jaya","Shah Alam","Klang","Puchong","Cheras","Ampang","Kajang","Damansara","Bangsar","Mont Kiara","Kepong","Setapak","Gombak","Selayang","Rawang","Seri Kembangan","Bandar Utama","Ara Damansara","Kota Damansara","USJ"];

const faqs = [
  { q: "Berapa harga cuci aircond KL 2026?", a: "RM120 wall-mounted 1.0–1.5 HP. 2.0–2.5 HP RM150. 3.0 HP RM180. Ceiling cassette RM220+. Harga disahkan sebelum kerja. Multi-unit diskaun 5%/10%/15%." },
  { q: "Kawasan mana cover cuci aircond KL?", a: "Seluruh Klang Valley: KL, PJ, Subang Jaya, Shah Alam, Klang, Puchong, Cheras, Ampang, Kajang, Damansara, Bangsar, Mont Kiara, Kepong, Setapak, Gombak, Selayang, Rawang, Seri Kembangan. Same-day Isnin–Ahad." },
  { q: "Berapa kerap perlu cuci aircond di KL?", a: "Standard 12 bulan. Ground floor / tepi highway / construction: 6–8 bulan. Heavy use 8+ jam: 6 bulan servis asas + chemical wash tahunan." },
  { q: "Beza chemical wash vs servis biasa RM99?", a: "Servis biasa: permukaan sahaja. Chemical wash RM120: kimia 80–120 PSI tembus coil & blower, larutkan biofilm & kulat. Bau / angin lemah / 12+ bulan tak deep clean = chemical wash." },
  { q: "Cuci aircond boleh stop air bocor?", a: "Ya jika punca drain tersumbat biofilm. Kalau bocor berterusan lepas cuci, drain pan retak — perlu chemical overhaul RM220. Kami check jujur semasa servis." },
  { q: "Berapa lama 1 unit?", a: "60–75 minit wall-mounted 1.0–1.5 HP. Unit kekal di dinding. Boleh guna serta-merta." },
  { q: "Chemical selamat?", a: "Ya. Food-grade alkaline, biodegradable, phosphate-free. Tiada wap toksik. Canvas lindungi lantai/perabot. Selamat guna serta-merta." },
  { q: "Boleh same-day hari ini?", a: "Boleh. WhatsApp +60182983573 lokasi anda. Kami confirm slot terdekat 2–5 minit. Isnin–Ahad 9am–10pm." },
];

export default function Page() {
  const baseSchema = buildServiceSchema({
    slug: "chemical-wash",
    name: "Cuci Aircond KL & Selangor",
    description: "Cuci aircond KL chemical wash RM120. Same-day KL & Selangor. 500+ 5★ review.",
    startPrice: 120,
    locale: "ms",
    priceTable: pricing,
    pricingName: "Harga Cuci Aircond KL",
    priceDescription: "Bermula RM120"
  });
  const serviceSchema = { ...baseSchema, "@id": "https://www.klrenovator.com/ms/cuci-aircond-kl#service", url: "https://www.klrenovator.com/ms/cuci-aircond-kl", inLanguage: "ms-MY" };
  const breadcrumb = { "@context":"https://schema.org","@type":"BreadcrumbList", itemListElement: [
    { "@type":"ListItem", position:1, name:"Home", item:"https://www.klrenovator.com/ms"},
    { "@type":"ListItem", position:2, name:"Cuci Aircond KL", item:"https://www.klrenovator.com/ms/cuci-aircond-kl"}
  ]};
  const faqSchema = { "@context":"https://schema.org","@type":"FAQPage", mainEntity: faqs.map(f=>({ "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a }}))};

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}/>

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1">
          <NextLink href="/ms" className="hover:text-sky-600">Laman Utama</NextLink>
          <FiChevronRight className="h-3 w-3"/>
          <span className="text-slate-900 font-bold">Cuci Aircond KL</span>
        </div>
      </div>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-sky-700">Cuci Aircond KL #1 • 2026</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">Cuci Aircond KL &amp; Selangor — <span className="text-sky-600">RM120</span></h1>
            <p className="mt-4 text-lg text-slate-700 max-w-xl">Chemical wash tekanan tinggi 80–120 PSI. Hapuskan bau, bocor, angin lemah. Same-day Klang Valley. <strong>500+ 5★ Google</strong>. Waranti 1 bulan.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-800">✓ Same-Day</span>
              <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-1.5 text-sky-800">✓ RM120 Disahkan Dulu</span>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-amber-900">✓ Waranti 1 Bulan</span>
            </div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22c55e] px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"> <FaWhatsapp className="h-5 w-5"/> WhatsApp Tempah</a>
              <a href="tel:+60182983573" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 px-7 py-4 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white"><FaPhone className="h-4 w-4"/> Call +60182983573</a>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">Harga 2026</p>
            <h2 className="mt-1 text-xl font-black">Cuci Aircond KL</h2>
            <ul className="mt-4 divide-y divide-slate-100 border rounded-2xl overflow-hidden">
              {pricing.map(p=>(
                <li key={p.label} className="flex justify-between px-4 py-3 text-sm"><span className="text-slate-700">{p.label}</span><span className="font-black text-sky-700">{p.price}</span></li>
              ))}
            </ul>
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="mt-4 block text-center rounded-xl bg-slate-950 text-white py-3 text-xs font-black uppercase tracking-wider">Dapatkan Slot →</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">Cuci Aircond KL — Chemical Wash No.1 Lembah Klang</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
            <p>Cari <strong>“cuci aircond KL”</strong>, <strong>“cuci aircond Selangor”</strong>, <strong>“servis aircond murah KL”</strong>? Anda di halaman tepat. KL Renovator — <strong>500+ review 5-bintang</strong>, SSM berdaftar, harga telus <strong>RM120</strong>. Chemical wash <strong>80–120 PSI</strong> larutkan biofilm, kulat & habuk jalan KL dalam coil & blower anda — bukan sembur air biasa.</p>
            <p>Masalah harian KL yang kami selesaikan: <em>aircond tak sejuk</em>, <em>air bocor</em>, <em>bau hapak</em>, <em>angin lemah</em>, <em>bil TNB naik</em>. 60–75 minit siap, unit kekal di dinding, terus boleh guna. Liputan: <strong>KLCC, Bangsar, Mont Kiara, Damansara, PJ, Subang Jaya, Shah Alam, Klang, Puchong, Cheras, Ampang, Kajang, Kepong, Setapak, Gombak, Rawang</strong> — seluruh Klang Valley. WhatsApp sekarang — slot <strong>same-day</strong>.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">Liputan KL & Selangor</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Semua Kawasan Lembah Klang</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {areas.map(a=>(
              <span key={a} className="border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full text-slate-700">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-sky-600 text-center">FAQ</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-center text-slate-950">Soalan Cuci Aircond KL</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f,i)=>(
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">{f.q}<FiChevronRight className="h-4 w-4 text-sky-600 transition group-open:rotate-90"/></summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#22c55e] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"> <FaWhatsapp className="h-5 w-5"/> Book Cuci Aircond KL Sekarang</a>
            <p className="mt-3 text-xs text-slate-500">Balas 2–5 minit • Isnin–Ahad 9am–10pm • +60182983573</p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <p>
            Lihat juga: <NextLink href="/ms/services/chemical-wash" className="text-sky-700 font-bold hover:underline">Chemical Wash Service Page</NextLink> • <NextLink href="/ms/services/basic-servicing" className="text-sky-700 font-bold hover:underline">Servis Asas RM99</NextLink> • <NextLink href="/ms/services/maintenance-contract" className="text-sky-700 font-bold hover:underline">Kontrak Penyelenggaraan</NextLink>
          </p>
        </div>
      </section>
      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks lang="ms" heading="Kalkulator Aircond Percuma" />
        </div>
      </section>

      <PriceComparisonUI locale="ms" />

      {/* Definition + comparison blocks (issue #72) — curated for this page. */}
      <PageExplainers locale="ms" presetId="service:cuci-aircond" />
    </>
  );
}
