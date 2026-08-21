import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaBuilding, FaStore, FaUtensils, FaHospital, FaServer, FaPhone, FaBolt, FaCalendarCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";
import { PageExplainers } from "@/components/aeo-explainer-blocks";

export const metadata: Metadata = {
  title: "Pemasangan Aircond Komersial KL — Pejabat & Kedai",
  description: padMetaDescription("Pemasangan aircond komersial untuk pejabat, kedai, restoran, klinik & bilik server di KL & Selangor. Ceiling cassette & multi-split. AMC tersedia."),
  openGraph: {
    title: "Pemasangan Aircond Komersial KL — Pejabat & Kedai",
    description: "Pemasangan aircond untuk pejabat, kedai, restoran, klinik & bilik server. Ceiling cassette, ducted, multi-split. AMC tersedia. WhatsApp +60182983573",
    type: "website", locale: "ms_MY",
    url: "https://www.klrenovator.com/ms/pemasangan-aircond-komersial",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp", width: 1200, height: 630, alt: "Pemasangan Aircond Komersial KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Pemasangan Aircond Komersial KL & Selangor — B2B | KL Renovator", description: "Pejabat, kedai, restoran, klinik & bilik server. Ceiling cassette, ducted, multi-split. AMC tersedia. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/ms/pemasangan-aircond-komersial", languages: { "en-MY": "https://www.klrenovator.com/commercial-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-komersial", "zh-MY": "https://www.klrenovator.com/zh/commercial-aircond-installation", "x-default": "https://www.klrenovator.com/commercial-aircond-installation" } },
};

const BUSINESS_TYPES = [
  { icon: <FaBuilding className="h-6 w-6" />, title: "Bangunan Pejabat", desc: "Sistem ceiling cassette atau ducted untuk pejabat pelan terbuka. Pemasangan luar waktu untuk elak gangguan operasi. Penyejukan berbilang zon dengan kawalan termostat individu setiap tingkat atau jabatan. Pelan AMC dari RM 299/tahun seunit.", features: ["Ceiling cassette 2.0–6.0 HP", "Konfigurasi multi-split", "Pemasangan luar waktu/hujung minggu", "Reka bentuk penyejukan berasaskan zon", "AMC dengan servis suku tahunan"] },
  { icon: <FaStore className="h-6 w-6" />, title: "Kedai & Runcit", desc: "Unit dinding atau ceiling cassette untuk depan kedai, butik, dan ruang runcit. Unit berkapasiti penyejukan tinggi untuk kedai muka depan kaca dengan trafik tinggi. Pemasangan diskrit yang tidak mengganggu paparan atau aliran pelanggan.", features: ["Dinding 1.5–3.0 HP", "Ceiling cassette untuk ruang besar", "Pam kondensat untuk saliran tersembunyi", "Pemasangan pantas — henti tugas minima", "Pilihan inverter cekap tenaga"] },
  { icon: <FaUtensils className="h-6 w-6" />, title: "Restoran & F&B", desc: "Sistem aircond tugas berat untuk dapur dan ruang makan. Salutan gegelung tahan gris tersedia. Unit aliran udara tinggi untuk beban haba dapur terbuka. Mematuhi keperluan pengudaraan jabatan kesihatan tempatan.", features: ["Unit khas dapur dengan gegelung bersalut", "Tekanan statik tinggi untuk saluran panjang", "Keserasian penapis gris", "Ruang makan: ceiling cassette atau ducted", "Kitaran cuci kimia 6 bulan disyorkan"] },
  { icon: <FaHospital className="h-6 w-6" />, title: "Klinik & Perubatan", desc: "Penyejukan suhu stabil untuk bilik perundingan, ruang menunggu, dan farmasi. Pilihan penapisan HEPA/UV tersedia. Unit bunyi rendah untuk keselesaan pesakit. Mematuhi garis panduan kemudahan KKM.", features: ["Dinding atau ceiling cassette", "Penapis HEPA/UV pilihan", "Model inverter ultra-senyap", "Operasi 24/7 boleh harap", "SLA keutamaan pembaikan kecemasan"] },
  { icon: <FaServer className="h-6 w-6" />, title: "Bilik Server", desc: "Penyejukan ketepatan untuk bilik server kecil hingga sederhana dan almari IT. Pemampat inverter dinilai 24/7. Pilihan lebihan (konfigurasi N+1). Integrasi pemantauan suhu dan kelembapan.", features: ["Unit nisbah penyejukan sensible tinggi", "Dinilai operasi berterusan 24/7", "Inverter untuk kawalan suhu tepat", "Pam kondensat dengan penggera limpahan", "Konfigurasi unit lebihan tersedia"] },
];

const PRICING = [
  { type: "Dinding · 1.5 HP", price: "RM 199", suitable: "Pejabat kecil, bilik perundingan, kaunter runcit" },
  { type: "Dinding · 2.0–2.5 HP", price: "RM 249–279", suitable: "Pejabat sederhana, kedai, ruang menunggu" },
  { type: "Dinding · 3.0 HP", price: "RM 329", suitable: "Pejabat besar, ruang makan restoran" },
  { type: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 290", suitable: "Bilik mesyuarat kecil, pejabat persendirian" },
  { type: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 350", suitable: "Pejabat pelan terbuka, kedai, ruang tunggu klinik" },
  { type: "Ceiling Cassette · 3.5–6.0 HP", price: "RM 400", suitable: "Ruang komersial besar, restoran" },
];

const AMC_BENEFITS = [
  { icon: <FaCalendarCheck className="h-5 w-5" />, title: "Penyelenggaraan Pencegahan Suku Tahunan", desc: "Servis berjadual setiap 3 bulan — pembersihan penapis, pemeriksaan gegelung, tekanan gas, pemeriksaan elektrik. Mengekalkan unit pada kecekapan puncak, mengurangkan kerosakan sebanyak 60%+." },
  { icon: <FaBolt className="h-5 w-5" />, title: "Tindak Balas Kecemasan Keutamaan", desc: "Pelanggan AMC dapat penghantaran keutamaan dalam masa 2 jam semasa waktu perniagaan. Talian sokongan komersial khusus. Juruteknik hari sama untuk kerosakan kritikal." },
  { icon: <FaShield className="h-5 w-5" />, title: "Kadar Pembaikan Diskaun", desc: "Ahli AMC jimat 15–25% untuk semua alat ganti dan upah pembaikan. Pemeriksaan diagnostik percuma. Tiada fi panggilan untuk pelanggan kontrak." },
];

const FAQS = [
  { q: "Berapa kos pemasangan aircond komersial di KL untuk pejabat?", a: "Pemasangan komersial dinding bermula dari RM 199 (1.5 HP) untuk pejabat kecil. Ceiling cassette dari RM 290 (1.0–1.5 HP) hingga RM 400 (3.5–6.0 HP). Setiap harga termasuk 7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran/kit ampaian, vakum pam, dan waranti kerja 1 bulan. Bahan tambahan disebut harga dan diluluskan di tapak." },
  { q: "Bolehkah anda pasang aircond di luar waktu perniagaan untuk elak gangguan operasi?", a: "Ya — kami pakar dalam pemasangan komersial luar waktu. Slot malam (6 PTG–10 MLM), hujung minggu, dan cuti umum tersedia. Untuk restoran, kami boleh bekerja antara waktu tutup dan buka. Pemasangan pejabat biasanya dijadualkan hujung minggu. Tiada caj tambahan untuk kerja luar waktu — ia standard untuk pelanggan komersial kami." },
  { q: "Jenis aircond apa yang terbaik untuk kedai atau pejabat saya?", a: "Untuk pejabat pelan terbuka dan kedai: ceiling cassette (penyejukan sekata, pemasangan tersembunyi, muat grid siling standard). Untuk pejabat individu dan bilik perundingan: dinding (kos lebih rendah, kawalan individu). Untuk bilik server: unit sensible tinggi khusus dengan penarafan 24/7. Tinjauan tapak kami menentukan jenis optimum untuk ruang khusus anda." },
  { q: "Adakah anda tawarkan Kontrak Penyelenggaraan Tahunan (AMC) untuk pelanggan komersial?", a: "Ya — pelan AMC dari RM 299/tahun seunit untuk penyelenggaraan pencegahan suku tahunan. Termasuk tindak balas kecemasan keutamaan (penghantaran 2 jam), kadar pembaikan diskaun 15–25%, pemeriksaan diagnostik percuma, dan servis berjadual. Diskaun komersial berbilang unit disebut harga atas pertanyaan." },
  { q: "Berapa cepat anda boleh pasang aircond di kedai atau pejabat baru saya sebelum dibuka?", a: "Pemasangan komersial standard 1–3 unit: 1–2 hari. Pemasangan lebih besar (5+ unit ceiling cassette): 3–5 hari dengan pasukan projek khusus. Kami syorkan tempahan 2 minggu sebelum tarikh pembukaan sasaran. Pemasangan segera/ekspres tersedia — WhatsApp kami untuk ketersediaan." },
  { q: "Adakah anda pasang sistem aircond ducted atau tersembunyi untuk ruang komersial?", a: "Ya — kami pasang sistem split ducted tersembunyi untuk ruang komersial yang memerlukan unit dalaman tersembunyi dengan aliran udara teragih melalui jeriji siling. Ini biasa untuk pejabat mewah, butik, dan restoran yang mahukan rupa siling bersih. Sistem ducted disebut harga mengikut projek selepas tinjauan tapak." },
  { q: "Bolehkah anda kendalikan pemasangan aircond pejabat berbilang tingkat di bangunan komersial KL?", a: "Ya — kami selaras dengan pengurusan bangunan untuk pemasangan berbilang tingkat, termasuk penjadualan lif/ruang muatan, permit akses luar waktu, dan kelulusan pemasangan struktur. Pasukan projek kami menguruskan keseluruhan koordinasi. Kami berpengalaman di bangunan komersial utama KL termasuk kawasan KLCC, Bangsar South, Damansara Perdana, dan Mont Kiara." },
  { q: "Jenama aircond komersial apa yang anda pasang dan servis?", a: "Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi, York, Carrier, Midea, LG, Samsung, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic dan National. Kami membawa model gred komersial (tekanan statik lebih tinggi, larian paip lebih panjang, dinilai kitaran tugas 24/7) dari semua pengedar utama di Lembah Klang." },
];

export default function CommercialInstallationPageMS() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Utama", url: "https://www.klrenovator.com/ms" },
    { name: "Pemasangan Aircond KL & Selangor", url: "https://www.klrenovator.com/ms/pemasangan-aircond-kl" },
    { name: "Pemasangan Aircond Komersial", url: "https://www.klrenovator.com/ms/pemasangan-aircond-komersial" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/logo/image.png" alt="Pemasangan aircond komersial pejabat kedai restoran KL Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">Pakar Pemasangan Komersial B2B</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Pemasangan Aircond Komersial<br /><span className="text-indigo-400">Pejabat · Kedai · Restoran · B2B</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Pemasangan aircond komersial ceiling cassette, ducted, multi-split, dan dinding di KL & Selangor. Pemasangan luar waktu, kontrak penyelenggaraan AMC, pengurusan projek khusus. Semua 20 jenama.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />Luar Waktu Tersedia</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />Pelan AMC dari RM 299/thn</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />Pasukan Projek Khusus</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏢 Pertanyaan Pemasangan Komersial\n\nHi KL Renovator, saya perlukan pemasangan aircond komersial untuk perniagaan saya.\n\n📍 Lokasi:\n🏢 Jenis Perniagaan: Pejabat / Kedai / Restoran / Klinik / Lain-lain\n📏 Saiz Ruang (kaki²):\n🔢 Unit Diperlukan:\n\nSila hantar harga & garis masa komersial.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Dapatkan Sebut Harga Komersial</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Hubungi +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50" id="business-types">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>Penyelesaian Komersial Mengikut Jenis Perniagaan</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Pemasangan Disesuaikan untuk </span><span className={title({ size: "sm", color: "brand" })}>Setiap Ruang Komersial</span></h2><p className="mt-4 text-slate-600 font-medium">Setiap jenis perniagaan ada keperluan penyejukan unik. Kami reka bentuk sekitar operasi anda — bukan sebaliknya.</p></div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_TYPES.map((bt, i) => (<Reveal key={bt.title} delay={i * 80}><div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all h-full flex flex-col"><div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{bt.icon}</div><h3 className="font-black text-lg text-slate-900 mb-2">{bt.title}</h3><p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{bt.desc}</p><div className="bg-slate-50 rounded-xl p-4"><ul className="space-y-1.5">{bt.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-xs text-slate-600"><FaCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" /><span>{f}</span></li>))}</ul></div></div></Reveal>))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>Harga Pemasangan Komersial</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Harga Telus untuk </span><span className={title({ size: "sm", color: "brand" })}>Perniagaan</span></h2><p className="mt-4 text-slate-600 font-medium">Harga telus seunit sama seperti kediaman — dengan standard perkhidmatan gred komersial.</p></div></Reveal>
          <Reveal delay={100}><div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl"><div className="min-w-[700px]"><div className="grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider"><div>Jenis Unit</div><div>Harga Upah</div><div>Sesuai Untuk</div></div>{PRICING.map((p, i) => (<div key={i} className={`grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}><div className="font-black text-slate-900">{p.type}</div><div className="text-indigo-600 font-black">{p.price}</div><div className="text-slate-500">{p.suitable}</div></div>))}</div></div></Reveal>
          <Reveal delay={200}><div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 max-w-3xl mx-auto"><p className="font-black text-amber-800 text-sm mb-2">Sebut Harga Komersial Khas?</p><p className="text-amber-700 text-sm mb-3">Berbilang unit, sistem ducted, atau susun atur kompleks — WhatsApp kami dengan pelan lantai anda untuk sebut harga projek terperinci.</p><a href={waLink("🏢 Sebut Harga Komersial Khas\n\nHi KL Renovator, saya perlukan sebut harga pemasangan komersial khas.\n\n📍 Lokasi:\n🏢 Jenis Perniagaan:\n📏 Jumlah Keluasan (kaki²):\n🔢 Unit Diperlukan:\n\nSila hantar harga projek terperinci.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Minta Sebut Harga Komersial Khas</a></div></Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50" id="amc">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12"><p className={eyebrow()}>Kontrak Penyelenggaraan Tahunan (AMC)</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Pastikan Unit Komersial Anda </span><span className={title({ size: "sm", color: "brand" })}>Beroperasi 24/7</span></h2><p className="mt-4 text-slate-600 font-medium">Penyelenggaraan pencegahan lebih baik daripada pembaikan kecemasan. Pelan AMC dari RM 299/tahun seunit — jimat sehingga 30% berbanding tempahan sekali.</p></div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">{AMC_BENEFITS.map((b, i) => (<Reveal key={b.title} delay={i * 100}><div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all h-full"><div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{b.icon}</div><h3 className="font-black text-slate-900 mb-2">{b.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p></div></Reveal>))}</div>
          <Reveal delay={300}><div className="max-w-2xl mx-auto bg-indigo-600 text-white rounded-2xl p-8 text-center"><h3 className="font-black text-xl mb-2">Pakej AMC Komersial</h3><div className="grid grid-cols-2 gap-4 mt-6 text-left"><div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">Asas · seunit</p><p className="font-black text-2xl">RM 299<span className="text-sm font-normal text-indigo-200">/tahun</span></p></div><div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">Premium · seunit</p><p className="font-black text-2xl">RM 899<span className="text-sm font-normal text-indigo-200">/tahun</span></p></div></div><a href={waLink("📋 Pertanyaan Kontrak AMC\n\nHi KL Renovator, saya berminat dengan pelan AMC komersial.\n\n🏢 Jenis Perniagaan:\n🔢 Bilangan Unit:\n📍 Lokasi:\n\nSila hantar butiran & harga AMC.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-white hover:bg-indigo-50 text-indigo-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Tanya Tentang AMC</a></div></Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      <section className="py-20 sm:py-28 bg-white" id="faq"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><Reveal><div className="text-center mb-12"><p className={eyebrow()}>Soalan Lazim Pemasangan Komersial</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Soalan Pemilik Perniagaan </span><span className={title({ size: "sm", color: "brand" })}>Dijawab</span></h2></div></Reveal><div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">{FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}</div></div></section>

      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"><Reveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Sedia Sejukkan Perniagaan Anda?</h2>
          <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Tinjauan tapak komersial percuma. Harga telus. Pemasangan luar waktu. Pelan AMC dari RM 299/thn. Semua 20 jenama.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink("🏢 Pemasangan Komersial — Tempahan Akhir\n\nHi KL Renovator, saya mahu teruskan dengan pemasangan komersial.\n\n📍 Lokasi:\n🏢 Jenis Perniagaan:\n🔢 Unit:\n📅 Tarikh Pilihan:\n\nSila sahkan harga & jadual.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Tempah Pemasangan Komersial</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Hubungi +60 18-298 3573</a>
          </div>
          <p className="mt-6 text-slate-500 text-sm">Meliputi hartanah komersial di semua kawasan KL & Selangor — KLCC, Bangsar South, Damansara Perdana, Mont Kiara, PJ, Subang Jaya, Shah Alam, Klang, Puchong, Cheras & banyak lagi.</p>
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
            <Link href="/ms/pemasangan-aircond-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← Semua Perkhidmatan Pemasangan</Link>
            <Link href="/ms/servis-aircond-komersial" className="text-sm text-slate-500 hover:text-white transition-colors">Servis & AMC Komersial</Link>
            <Link href="/ms/services/maintenance-contract" className="text-sm text-slate-500 hover:text-white transition-colors">Butiran AMC</Link>
            <Link href="/ms/faq" className="text-sm text-slate-500 hover:text-white transition-colors">Lebih Banyak Soalan Lazim</Link>
          </div>
        </Reveal></div>
      </section>

      {/* Definition + comparison blocks (issue #72) — curated for this page. */}
      <PageExplainers locale="ms" presetId="install:commercial" />
    </>
  );
}
