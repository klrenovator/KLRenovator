import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NextLink from "next/link";
import { FiArrowRight, FiCheck, FiUsers, FiZap, FiClock, FiShield } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: clampMetaTitle("Servis Aircond Mengikut Jenama KL & Selangor — Satu Pasukan, 20 Jenama | KL Renovator"),
  description: "Satu pasukan bertauliah menservis semua 20 jenama aircond utama — Daikin, Panasonic, Mitsubishi, York, LG, Samsung, Midea & banyak lagi. Servis hari sama. Berdaftar SSM, waranti 1 bulan.",
  openGraph: {
    title: clampMetaTitle("Satu Pasukan, 20 Jenama — Servis Aircond KL & Selangor | KL Renovator"),
    description: "Juruteknik bertauliah yang sama menservis setiap jenama aircond utama. Harga telus, tempahan hari sama, waranti 1 bulan.",
    url: "https://www.klrenovator.com/ms/brands",
    type: "website",
    locale: "ms_MY",
    alternateLocale: ["en_MY", "zh_MY"],
  },
  alternates: buildTrilingualHreflang("/brands", "ms"),
};

const waMsg = "Hi KL Renovator, saya nak servis aircond. Tolong bagi harga.";
const STATS = [
  { icon: FiUsers, value: "20", label: "Jenama Diservis", sub: "Semua jenama utama" },
  { icon: FiZap, value: "30–60", label: "Minit Dispatch", sub: "Hari sama Lembah Klang" },
  { icon: FiClock, value: "10+", label: "Tahun Pengalaman", sub: "Kediaman & komersial" },
  { icon: FiShield, value: "1-Bulan", label: "Waranti", sub: "Jaminan kerja bertulis" },
];

const BRAND_GROUPS = [
  { flag: "🇯🇵", name: "Jenama Jepun", brands: ["Daikin", "Panasonic", "Mitsubishi", "Toshiba", "Hitachi", "Fujitsu", "Sharp"], note: "Peneraju inverter — R32, diagnostik PCB" },
  { flag: "🇰🇷", name: "Jenama Korea", brands: ["Samsung", "LG"], note: "Teknologi inverter pintar — WiFi, AI cooling" },
  { flag: "🇨🇳", name: "Jenama Cina", brands: ["Midea", "Haier", "Gree", "Hisense", "Aux", "TCL", "Chigo"], note: "Nilai & pertengahan — R410A/R32" },
  { flag: "🇲🇾", name: "Malaysia & Antarabangsa", brands: ["Acson", "York", "Carrier", "McQuay", "National", "Isonic", "Trane", "Fujiaire"], note: "Jenama tempatan & global dipercayai" },
];

export default function BrandsPageMS() {
  const brands = siteConfig.brandPages;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
          { "@type": "ListItem", position: 2, name: "Servis Aircond Mengikut Jenama", item: "https://www.klrenovator.com/ms/brands" },
        ],
      }) }} />

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-700 mb-4">
              <FiUsers className="h-3 w-3" /> Satu Pasukan Untuk Semua
            </span>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>Juruteknik Bertauliah Yang Sama{" "}</span>
              <span className={title({ size: "lg", color: "brand" })}>Servis Setiap Jenama</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Tak seperti ejen eksklusif jenama, pasukan HVAC KL Renovator dilatih silang untuk semua 20 jenama aircond utama di Malaysia. Satu pasukan. Satu standard. Setiap jenama.<br />
              <strong className="text-slate-900">Berdaftar SSM · Waranti 1 bulan · 500+ ulasan Google.</strong>
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-sky-600 mb-1" />
                  <p className="text-lg font-black text-sky-700">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">{s.label}</p>
                  <p className="text-[9px] text-sky-500">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp Untuk Tempah</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all">Call {siteConfig.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Groups */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className={eyebrow()}>Semua 20 Jenama</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Pilih </span><span className={title({ size: "sm", color: "brand" })}>Jenama Aircond</span></h2>
            <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto">Setiap jenama diservis oleh pasukan KL Renovator yang sama — harga telus, waranti sama, dispatch hari sama.</p>
          </div></Reveal>
          <div className="space-y-8">
            {BRAND_GROUPS.map((cat) => {
              const catBrands = brands.filter((b) => cat.brands.includes(b.name));
              if (catBrands.length === 0) return null;
              return (
                <div key={cat.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{cat.flag}</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">{cat.name}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">— {cat.note}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {catBrands.map((brand) => (
                      <NextLink key={brand.slug} href={`/ms/brands/${brand.slug}`} className="group flex flex-col bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md rounded-2xl p-4 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700">{brand.name}</h3>
                          <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500" />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {brand.gasTypes.slice(0, 2).map((gas) => (<span key={gas} className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">{gas}</span>))}
                        </div>
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider mt-auto">Lihat Servis {brand.name} →</span>
                      </NextLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why One Team */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className={eyebrow()}>Kenapa Satu Pasukan Penting</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Tidak Terikat Jenama = </span><span className={title({ size: "sm", color: "brand" })}>Servis Lebih Baik</span></h2>
          </div></Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Diagnosis Silang Jenama", desc: "Juruteknik yang servis 20 jenama tahu bahawa 'bunyi Panasonic' dan 'getaran York' selalunya punca sama — bracket longgar. Tiada pandangan terhad jenama.", icon: FiZap },
              { title: "Satu Piawaian Setiap Kerja", desc: "Senarai semak 8-perkara yang sama, tekanan cuci kimia sama (80–120 PSI), ujian halaju selepas servis — tak kira jenama.", icon: FiShield },
              { title: "Akses Alat Ganti Lebih Cepat", desc: "Kami stok alat ganti biasa (kapasitor, kontaktor, pam saliran) yang sesuai untuk 15+ jenama.", icon: FiClock },
            ].map((item) => (
              <div key={item.title} className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
                <item.icon className="h-5 w-5 text-sky-600 mb-3" />
                <h3 className="font-black text-sm text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">Harga Sama — Setiap Jenama</p>
            <h2 className="text-2xl font-black uppercase text-white">Harga Telus Tanpa Ikatan Jenama</h2>
            <p className="mt-2 text-slate-400 text-sm font-medium">Harga sama untuk Daikin, Panasonic, Mitsubishi — semua 20 jenama.</p>
          </div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { service: "Servis Asas", price: "Dari RM 99" },
              { service: "Cuci Kimia", price: "Dari RM 120" },
              { service: "Overhaul Kimia", price: "Dari RM 220" },
              { service: "Tambah Gas R22", price: "Dari RM 120" },
              { service: "Tambah Gas R410A", price: "Dari RM 150" },
              { service: "Tambah Gas R32", price: "Dari RM 180" },
              { service: "Diagnostik Baiki", price: "Dari RM 88" },
              { service: "Pemasangan", price: "Dari RM 199" },
            ].map((item) => (
              <div key={item.service} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-slate-400 mb-1">{item.service}</p>
                <p className="text-lg font-black text-sky-400">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">Satu Pasukan, 20 Jenama — Sedia Hari Ini</h2>
          <p className="mt-3 text-sky-100 font-medium">Juruteknik bertauliah sama. Harga telus sama. Semua 20 jenama utama.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp Sekarang</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all">Call {siteConfig.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
}
