import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";

export const dynamic = "force-static";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { ServiceWorkPhotos } from "@/components/service-work-photos";

const amcMsg = [
  "Hi KL Renovator, saya berminat dengan Kontrak Penyelenggaraan Tahunan (AMC) untuk unit aircond saya.",
  "",
  "Bilangan unit:",
  "Jenis: Dinding / Ceiling Cassette / Tingkap",
  "Lokasi:",
  "",
  "Sila kongsi harga AMC dan pelan yang tersedia. Terima kasih!",
].join("\n");
const amcWaLink = waLink(amcMsg);

export const metadata: Metadata = {
  title: clampMetaTitle("Kontrak Penyelenggaraan Aircond (AMC) KL & Selangor — Pelan Tahunan dari RM 299 | KL Renovator"),
  description: padMetaDescription("Kontrak penyelenggaraan aircond tahunan KL & Selangor. Jimat 30% berbanding tempahan sekali. Servis suku tahunan, keutamaan, kecemasan percuma. Dari RM 299/thn."),
  openGraph: {
    title: clampMetaTitle("Kontrak Penyelenggaraan Aircond (AMC) KL & Selangor | KL Renovator"),
    description: "Jimat sehingga 30% dengan pelan penyelenggaraan aircond tahunan. Servis suku tahunan, respons keutamaan, diagnostik percuma. Dari RM 299/tahun.",
    url: "https://www.klrenovator.com/ms/services/maintenance-contract",
    type: "website", locale: "ms_MY", alternateLocale: ["en_MY", "zh_MY"],
    images: getServiceOGImages("maintenance-contract", "ms"),
  },
  twitter: { card: "summary_large_image", title: clampMetaTitle("Kontrak Penyelenggaraan Aircond KL & Selangor | KL Renovator"), description: "Jimat sehingga 30% dengan pelan tahunan. Dari RM 299/tahun.", images: ["https://www.klrenovator.com/hero/aux-aircond-basic-servicing-shah-alam-53.webp"] },
  alternates: {
    canonical: "https://www.klrenovator.com/ms/services/maintenance-contract",
    languages: { "en-MY": "https://www.klrenovator.com/services/maintenance-contract", "ms-MY": "https://www.klrenovator.com/ms/services/maintenance-contract", "zh-MY": "https://www.klrenovator.com/zh/services/maintenance-contract", "x-default": "https://www.klrenovator.com/services/maintenance-contract" },
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Servis", item: "https://www.klrenovator.com/ms/services" },
    { "@type": "ListItem", position: 3, name: "Kontrak Penyelenggaraan Aircond", item: "https://www.klrenovator.com/ms/services/maintenance-contract" },
  ],
};

const plans = [
  { name: "Asas", price: "299", period: "/tahun", color: "bg-slate-700", border: "border-slate-300", badging: "Paling Berpatutan", services: "3 lawatan/tahun", includes: ["2 Servis Asas (nilai RM 99 setiap satu)", "1 Cuci Kimia Tekanan (nilai RM 120)", "Penjadualan keutamaan", "Harga terkunci 12 bulan", "Talian WhatsApp terus untuk pelanggan AMC"] },
  { name: "Standard", price: "499", period: "/tahun", color: "bg-sky-600", border: "border-sky-300", badging: "Nilai Terbaik", services: "4 lawatan/tahun", includes: ["2 Servis Asas", "2 Cuci Kimia Tekanan", "1 Diagnostik Kecemasan Percuma (nilai RM 88)", "Penjadualan keutamaan + respons hari sama", "Harga terkunci 12 bulan", "10% diskaun untuk buruh pembaikan tambahan"] },
  { name: "Premium", price: "899", period: "/tahun", color: "bg-amber-600", border: "border-amber-300", badging: "Perlindungan Maksimum", services: "7 lawatan/tahun", includes: ["4 Servis Asas (suku tahunan)", "2 Cuci Kimia Tekanan", "1 Overhaul Kimia (nilai RM 220)", "2 Diagnostik Kecemasan Percuma (nilai RM 176)", "Keutamaan + hari sama + luar waktu", "15% diskaun untuk buruh pembaikan tambahan", "Pemeriksaan tekanan gas percuma setiap lawatan"] },
];

export default function AMCPageMS() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/ms" className="hover:text-sky-600 transition">Laman Utama</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/ms/services" className="hover:text-sky-600 transition">Servis</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Kontrak Penyelenggaraan Aircond</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 text-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Kontrak Penyelenggaraan Tahunan (AMC)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Jimat Sehingga 30% Dengan Pelan Penyelenggaraan Aircond Tahunan
          </h1>
          <p className="text-sky-200 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Satu bayaran tahunan. Servis suku tahunan berjadual. Respons kecemasan keutamaan. Jangan risau tentang aircond anda lagi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
              <FaWhatsapp className="h-5 w-5" /> Dapatkan Harga AMC
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-sky-300">
            <span>✓ Dari RM 299/tahun</span><span>✓ Semua 20 Jenama</span><span>✓ KL & Selangor</span><span>✓ Tiada Penalti</span>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Pelan AMC</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Pilih Pelan Penyelenggaraan Anda</h2>
            <p className="text-slate-500 text-sm mt-2">Semua harga untuk satu unit dinding 1.0–1.5 HP. Diskaun pelbagai unit tersedia.</p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={"relative bg-white border-2 " + plan.border + " rounded-2xl p-6 sm:p-8 flex flex-col"}>
                {plan.badging && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">{plan.badging}</span>}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="mt-3"><span className="text-4xl font-black text-slate-900">RM {plan.price}</span><span className="text-slate-500 text-sm">{plan.period}</span></div>
                  <p className="text-xs text-slate-500 mt-1 font-bold">{plan.services}</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm"><FiCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-600">{item}</span></li>
                  ))}
                </ul>
                <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className={"mt-6 block text-center " + plan.color + " hover:opacity-90 text-white font-black uppercase tracking-wider text-sm py-3.5 rounded-xl transition-all"}>
                  Pilih {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceWorkPhotos
        slug="maintenance-contract"
        lang="ms"
        eyebrow="Servis Kontrak Sebenar"
        heading="Beginilah Rupa Lawatan AMC Anda"
        intro="Kerja penyelenggaraan berjadual untuk pelanggan AMC di seluruh KL & Selangor — servis suku tahunan, rumah berbilang unit, semakan pencegahan dan respons keutamaan hari sama."
        heroImage="/hero/aux-aircond-basic-servicing-shah-alam-53.webp"
        heroTitle="Servis AMC Berjadual — Shah Alam"
        heroAlt="Juruteknik KL Renovator menjalankan servis kontrak penyelenggaraan berjadual pada aircond Aux di Shah Alam"
        className="py-14 px-4 bg-white border-y border-slate-100"
      />

      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Cara Ia Berfungsi</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10">Dapatkan Perlindungan dalam 3 Langkah Mudah</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Pilih Pelan Anda", desc: "Pilih Asas, Standard, atau Premium berdasarkan bilangan unit dan penggunaan anda. WhatsApp kami jika anda perlukan bantuan memilih." },
              { step: "2", title: "Kami Jadualkan Lawatan Pertama", desc: "Lawatan servis pertama disahkan dalam 3–5 hari bekerja. Kami periksa unit anda, lakukan servis pertama, dan tetapkan jadual suku tahunan." },
              { step: "3", title: "Bertenang — Kami Uruskan Selebihnya", desc: "Peringatan automatik sebelum setiap lawatan. Respons kecemasan keutamaan jika berlaku masalah. Peringatan pembaharuan tahunan 30 hari sebelum tamat." },
            ].map((s, i) => (
              <div key={i} className="flex gap-5 text-left items-start">
                <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white font-black text-lg">{s.step}</span>
                <div><h3 className="font-black text-slate-900 text-lg">{s.title}</h3><p className="text-slate-500 text-sm mt-1">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-sky-700 to-slate-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Bersedia untuk Tidak Risau Tentang Aircond Anda Lagi?</h2>
          <p className="text-sky-200 mb-8 text-sm max-w-md mx-auto">Sertai 500+ pelanggan Lembah Klang yang mempercayai KL Renovator untuk penyelenggaraan aircond mereka. WhatsApp kami sekarang.</p>
          <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
            <FaWhatsapp className="h-5 w-5" /> Dapatkan Pelan AMC Saya
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-sky-300">
            <span>✓ Dari RM 299/thn</span><span>✓ Semua Jenama</span><span>✓ KL & Selangor</span>
          </div>
        </div>
      </section>
    </>
  );
}
