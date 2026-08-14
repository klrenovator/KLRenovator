import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaBolt, FaBuilding, FaCubes, FaTags, FaPhone, FaSnowflake } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "Pemasangan Aircond Seluruh Rumah KL — Pakej Pukal",
  description: padMetaDescription("Pemasangan aircond seluruh rumah di KL & Selangor — 3+ unit. Diskaun volum, panduan BTU bilik demi bilik, pelan penyejukan penuh. Dari RM199/unit."),
  openGraph: {
    title: "Pemasangan Aircond Seluruh Rumah KL — Pakej Pukal",
    description: "3+ unit aircond? Diskaun volum, panduan BTU bilik, pelan penyejukan seluruh rumah. Dari RM199/unit. WhatsApp +60182983573",
    type: "website", locale: "ms_MY",
    url: "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp", width: 1200, height: 630, alt: "Pemasangan Aircond Seluruh Rumah KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Pemasangan Aircond Seluruh Rumah KL & Selangor | KL Renovator", description: "Pemasangan berbilang unit dengan diskaun volum. Panduan BTU, garis masa projek, dari RM199/unit. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah", languages: { "en-MY": "https://www.klrenovator.com/whole-house-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah", "zh-MY": "https://www.klrenovator.com/zh/whole-house-aircond-installation", "x-default": "https://www.klrenovator.com/whole-house-aircond-installation" } },
};

const VOLUME_TIERS = [
  { units: "3 Unit", price: "RM 597", save: "Jimat RM 0 vs individu", highlights: ["3× dinding (pelbagai HP ikut keperluan)", "7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran ×3", "3× vakum pam", "Siap dalam 1 hari"], badge: "Popular untuk Rumah 3 Bilik" },
  { units: "5 Unit", price: "RM 945", save: "Jimat RM 50 vs individu", highlights: ["5× dinding (pelbagai HP)", "7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran ×5", "5× vakum pam", "Siap 1 hari keutamaan", "Penilaian kotak DB percuma"], badge: "Nilai Terbaik", highlight: true },
  { units: "10+ Unit", price: "Dari RM 1,790", save: "Diskaun volum khas", highlights: ["10+× dinding (pelbagai HP)", "7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran seunit", "Vakum pam setiap unit", "Pasukan projek khusus", "Penilaian DB percuma + pengimbangan beban", "Penjadualan keutamaan — siap 1–2 hari", "Jadual bayaran khas tersedia"], badge: "Pukal / Komersial" },
];

const ROOM_BTU_GUIDE = [
  { room: "Bilik Tidur Kecil", size: "100–150 kaki²", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "Bilik tidur standard Malaysia. Seorang penghuni. Pendedahan matahari rendah." },
  { room: "Bilik Tidur Utama", size: "150–250 kaki²", btus: "12,000 – 18,000", hp: "1.0 – 1.5 HP", notes: "Bilik air bersambung tambah beban haba. Mungkin perlu 1.5 HP jika menghadap barat." },
  { room: "Ruang Tamu", size: "250–400 kaki²", btus: "18,000 – 24,000", hp: "1.5 – 2.0 HP", notes: "Pelan terbuka dengan dapur? Minimum 2.0 HP. Pertimbangkan 2.5 HP untuk siling dua tingkat." },
  { room: "Dewan Keluarga Besar", size: "400–600 kaki²", btus: "24,000 – 36,000", hp: "2.0 – 3.0 HP", notes: "Konsep terbuka dengan ruang makan + dapur kering. Ceiling cassette lebih baik untuk penyejukan sekata." },
  { room: "Pejabat Rumah / Bilik Belajar", size: "80–120 kaki²", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "Elektronik (PC, monitor, pencetak) tambah haba. 1.0 HP biasanya mencukupi." },
  { room: "Dapur (Basah)", size: "100–200 kaki²", btus: "12,000+", hp: "1.0 – 1.5 HP", notes: "Tidak disyorkan kecuali unit khas kalis minyak. Gris menyumbat gegelung dengan cepat — perlu cuci kimia 6 bulan." },
  { room: "Kedai / Runcit", size: "300–800 kaki²", btus: "24,000 – 48,000", hp: "2.0 – 4.0 HP", notes: "Trafik tinggi, pintu kerap dibuka, muka depan kaca. Mungkin perlu berbilang unit atau ceiling cassette." },
  { room: "Pejabat / Bilik Mesyuarat", size: "200–400 kaki²", btus: "18,000 – 30,000", hp: "1.5 – 2.5 HP", notes: "4–8 penghuni tambah beban haba signifikan. Ceiling cassette disyorkan untuk pengagihan sekata." },
];

const PROJECT_TIMELINE = [
  { phase: "Hari 1 — PG", title: "Perundingan & Tinjauan Tapak", desc: "WhatsApp pelan lantai atau senarai bilik anda. Juruteknik kanan kami melawat hartanah anda. Kami menilai setiap bilik, ukur keperluan BTU, periksa kapasiti kotak DB, rancang laluan paip, dan pilih lokasi unit luar. Percuma — tiada obligasi.", icon: <FaBuilding className="h-6 w-6" /> },
  { phase: "Hari 1 — PTG", title: "Sebut Harga Akhir & Penjadualan", desc: "Anda terima sebut harga terperinci: upah seunit, jumlah panjang paip tembaga, jenis bracket, kerja elektrik (jika ada), dan jumlah kos projek. Setelah diluluskan, kami kunci tarikh pemasangan — biasanya dalam 48 jam untuk rumah landed.", icon: <FaTags className="h-6 w-6" /> },
  { phase: "Hari 2 — Sepanjang Hari", title: "Pemasangan Berbilang Unit", desc: "Pasukan kami tiba dengan semua bahan siap sedia. Unit dipasang bilik demi bilik mengikut urutan. Kain pelindung meliputi setiap kawasan. Paip tembaga, vakum (500 mikron), litar elektrik, ujian saliran — setiap unit melalui proses 7 langkah penuh.", icon: <FaBolt className="h-6 w-6" /> },
  { phase: "Hari 2 — Tamat", title: "Ujian & Penyerahan", desc: "Semua unit dijalankan serentak untuk ujian akhir. Delta-T penyejukan diukur pada setiap unit. Kad kerja ditandatangani bilik demi bilik. Waranti kerja bertulis 1 bulan pada semua unit. Alat kawalan jauh dipasangkan. Anda melangkah ke rumah yang sejuk sepenuhnya.", icon: <FaShield className="h-6 w-6" /> },
];

const FAQS = [
  { q: "Berapa kos pemasangan aircond seluruh rumah untuk rumah 3 bilik di KL?", a: "Pakej 3 unit bermula dari RM 597 untuk unit dinding (1.0–1.5 HP setiap bilik). Pakej 5 unit dari RM 945. Setiap unit termasuk 7 kaki paip tembaga, penebat, wayar elektrik dan paip saliran, vakum pam, dan waranti kerja 1 bulan. Paip tembaga tambahan melebihi 7 kaki dikenakan RM 17–27/kaki. Semua harga disahkan sebelum sebarang kerja bermula." },
  { q: "Adakah anda tawarkan diskaun volum untuk pemasangan 5 atau lebih unit aircond?", a: "Ya — pakej 5 unit kami menjimatkan RM 50 berbanding tempahan individu, dan termasuk penilaian kapasiti kotak DB percuma. Untuk 10+ unit, kami sediakan harga volum khas dengan pengurusan projek khusus. WhatsApp kami dengan jumlah unit dan jenis hartanah untuk sebut harga tepat." },
  { q: "Bagaimana saya tahu saiz HP yang diperlukan setiap bilik?", a: "Gunakan panduan BTU bilik demi bilik di halaman ini. Bilik tidur kecil (100–150 kaki²): 1.0 HP. Bilik utama (150–250 kaki²): 1.0–1.5 HP. Ruang tamu (250–400 kaki²): 1.5–2.0 HP. Juruteknik kami mengesahkan semua saiz semasa tinjauan tapak percuma — tiada tekaan." },
  { q: "Berapa lama masa untuk pasang 5 unit aircond dalam satu rumah?", a: "5 unit biasanya siap dalam 1 hari penuh (8 PG – 6 PTG) dengan pasukan khusus 2–3 orang. 10+ unit mengambil 1–2 hari. Kami pra-sedia semua bahan malam sebelumnya dan bekerja bilik demi bilik. Rumah landed lebih pantas; kondo mungkin perlu tambahan satu hari untuk akses lif." },
  { q: "Bolehkah panel elektrik rumah saya menampung 5 unit aircond baru?", a: "Juruteknik kami memeriksa kotak DB semasa tinjauan tapak percuma. Kebanyakan rumah dibina selepas 2015 mempunyai 2–4 slot MCB simpanan. Jika anda perlukan slot tambahan atau pemutus utama kapasiti lebih tinggi, kami sebut harga kerja elektrik awal. Naik taraf panel biasa antara RM 100–300." },
  { q: "Adakah anda pasang jenis campuran — dinding di bilik tidur dan ceiling cassette di ruang tamu?", a: "Ya — ini sebenarnya sangat biasa untuk projek seluruh rumah. Unit dinding di bilik tidur (cekap, lebih senyap) dengan ceiling cassette di ruang tamu/makan pelan terbuka (liputan lebih baik, rupa lebih bersih). Kami pasang kedua-dua jenis dan selaras keperluan pemasangan, saliran, dan elektrik dengan lancar." },
  { q: "Bagaimana jika saya perlukan paip tembaga tambahan melebihi 7 kaki termasuk?", a: "Paip tembaga melebihi 7 kaki dikenakan setiap kaki: RM 17/kaki (1.0–1.5 HP), RM 23/kaki (2.0–2.5 HP), RM 27/kaki (3.0 HP+). Semasa tinjauan tapak, kami ukur panjang paip tepat untuk setiap unit dan masukkan dalam sebut harga anda. Anda luluskan semua tambahan sebelum kerja bermula." },
  { q: "Siapa pakar pemasangan aircond terbaik berhampiran saya untuk projek seluruh rumah di KL & Selangor?", a: "KL Renovator adalah pakar pemasangan berbilang unit paling dipercayai di Lembah Klang — dengan 500+ ulasan 5-bintang, pendaftaran SSM, dan rekod prestasi terbukti untuk projek seluruh rumah di Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Klang, Kajang, dan banyak lagi. WhatsApp +60182983573 untuk tinjauan tapak percuma dan sebut harga pukal." },
];

export default function WholeHouseInstallationPageMS() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Utama", url: "https://www.klrenovator.com/ms" },
    { name: "Pemasangan Aircond KL & Selangor", url: "https://www.klrenovator.com/ms/pemasangan-aircond-kl" },
    { name: "Pemasangan Aircond Seluruh Rumah", url: "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-double-unit-kl.webp" alt="Pemasangan aircond seluruh rumah berbilang unit Kuala Lumpur Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-4">Pakar Pemasangan Berbilang Unit</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Pemasangan Aircond Seluruh Rumah<br /><span className="text-amber-400">Harga Volum · Pakar Berbilang Unit</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Pasang 3, 5, atau 10+ unit aircond di rumah KL atau Selangor anda? Tier diskaun volum, panduan BTU bilik demi bilik, pelan penyejukan seluruh rumah, pasukan projek khusus. Dari RM 199/unit.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Diskaun Volum Tersedia</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Penilaian Kotak DB Percuma</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Pasukan Projek Khusus</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 Pertanyaan Pemasangan Seluruh Rumah\n\nHi KL Renovator, saya perlukan sebut harga pukal untuk berbilang unit aircond.\n\n📍 Kawasan:\n🏠 Jenis Hartanah: Kondo / Landed / Pejabat\n🔢 Bilangan Unit:\n🛏️ Jenis Bilik:\n\nSila hantar harga volum & garis masa.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Dapatkan Sebut Harga Pukal</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Hubungi +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volume Tiers */}
      <section className="py-20 sm:py-28 bg-slate-50" id="tiers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Tier Diskaun Volum</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Lebih Banyak Pasang, </span><span className={title({ size: "sm", color: "brand" })}>Lebih Banyak Jimat</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Harga pakej telus untuk projek berbilang unit. Satu pasukan, satu garis masa, satu waranti — tiada masalah koordinasi.</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {VOLUME_TIERS.map((tier, i) => (
              <Reveal key={tier.units} delay={i * 120}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${tier.highlight ? "border-amber-400 shadow-lg shadow-amber-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Nilai Terbaik</div>}
                  <div className="mb-4"><div className="inline-flex bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{tier.badge}</div><h3 className="font-black text-2xl text-slate-900">{tier.units}</h3></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{tier.price}</span><span className="text-slate-500 text-sm ml-1">jumlah upah</span></div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5 inline-flex self-start mb-5"><span className="text-xs font-black text-emerald-700">{tier.save}</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1"><ul className="space-y-2">{tier.highlights.map((h: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{h}</span></li>))}</ul></div>
                  <a href={waLink("🏠 Sebut Harga " + tier.units + "\n\nHi KL Renovator, saya mahu pakej pemasangan " + tier.units + ".\n\n📍 Kawasan:\n🏠 Jenis Hartanah:\n\nSila sahkan harga & ketersediaan.")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${tier.highlight ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> Dapatkan Sebut Harga {tier.units}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}><div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <p className="font-black text-sky-800 text-sm mb-1"><FaCubes className="h-4 w-4 inline mr-1" /> Projek Khas? 15+ Unit? Bangunan Komersial?</p>
            <p className="text-sky-700 text-sm">WhatsApp kami untuk sebut harga projek khusus dengan jadual bayaran dan garis masa projek khas.</p>
            <a href={waLink("🏢 Pertanyaan Projek Besar — 15+ Unit\n\nHi KL Renovator, saya ada projek besar dengan 15+ unit aircond.\n\n📍 Lokasi:\n🔢 Bilangan Unit:\n🏠 Jenis Hartanah:\n📅 Tarikh Siap Sasaran:\n\nSila hantar harga & garis masa projek khas.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Minta Sebut Harga Projek</a>
          </div></Reveal>
        </div>
      </section>

      {/* BTU Guide */}
      <section className="py-20 sm:py-28 bg-white" id="btu-guide">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Pelan Penyejukan Seluruh Rumah</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Panduan </span><span className={title({ size: "sm", color: "brand" })}>BTU & HP Bilik demi Bilik</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Tak pasti HP apa setiap bilik perlukan? Guna panduan ini — juruteknik kami sahkan semasa tinjauan tapak percuma.</p>
          </div></Reveal>
          <Reveal delay={100}><div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl"><div className="min-w-[800px]">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider"><div>Jenis Bilik</div><div>Saiz (kaki²)</div><div>BTU Diperlukan</div><div>HP</div><div>Nota Pemasangan</div></div>
            {ROOM_BTU_GUIDE.map((row, i) => (<div key={i} className={`grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}><div className="font-black text-slate-900">{row.room}</div><div className="text-slate-600">{row.size}</div><div className="text-sky-600 font-bold">{row.btus}</div><div className="text-slate-900 font-black">{row.hp}</div><div className="text-slate-500 text-xs leading-relaxed">{row.notes}</div></div>))}
          </div></div></Reveal>
          <Reveal delay={200}><div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 max-w-3xl mx-auto">
            <h3 className="font-black text-sky-800 mb-2 flex items-center gap-2"><FaSnowflake className="h-5 w-5" /> Panduan Pantas</h3>
            <p className="text-sky-700 text-sm leading-relaxed">Untuk rumah Malaysia: <strong>60–65 BTU setiap kaki persegi</strong> adalah garis asas standard. Tambah 10% untuk bilik menghadap barat, 10% untuk bilik di atas haba dapur, dan 600 BTU setiap penghuni tambahan melebihi 2 orang. Juruteknik kami kira beban tepat semasa tinjauan percuma.</p>
          </div></Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-slate-50" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Garis Masa Projek</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Dari Bilik Kosong ke </span><span className={title({ size: "sm", color: "brand" })}>Rumah Sejuk Sepenuhnya</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Proses berbilang unit kami yang lancar — diuruskan oleh pasukan projek khusus dari sebut harga hingga penyerahan.</p>
          </div></Reveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {PROJECT_TIMELINE.map((phase, i) => (
              <Reveal key={phase.phase} delay={i * 120}>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-sky-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4"><div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl shrink-0">{phase.icon}</div><div><p className="text-xs font-black uppercase tracking-widest text-sky-500 mb-1">{phase.phase}</p><h3 className="font-black text-lg text-slate-900 mb-2">{phase.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{phase.desc}</p></div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12"><p className={eyebrow()}>Soalan Lazim Pemasangan Seluruh Rumah</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Soalan Berbilang Unit </span><span className={title({ size: "sm", color: "brand" })}>Dijawab Jelas</span></h2></div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">{FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Sedia Sejukkan Seluruh Rumah Anda?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Tinjauan tapak percuma. Penilaian BTU bilik demi bilik. Harga volum dari RM 199/unit. Pasukan projek khusus. Waranti 1 bulan setiap unit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 Seluruh Rumah — Tempahan Akhir\n\nHi KL Renovator, saya mahu tempah pemasangan seluruh rumah.\n\n📍 Kawasan:\n🏠 Jenis Hartanah:\n🔢 Bilangan Unit:\n📅 Tarikh Pilihan:\n\nSila sahkan harga volum & garis masa.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Dapatkan Sebut Harga Pukal</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Hubungi +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Meliputi semua kawasan KL & Selangor — Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong, Klang, Damansara, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & banyak lagi.</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/ms/pemasangan-aircond-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← Semua Perkhidmatan Pemasangan</Link>
              <Link href="/ms/pemasangan-aircond-rumah-baru" className="text-sm text-slate-500 hover:text-white transition-colors">Pakej Rumah Baru</Link>
              <Link href="/ms/installation-price-malaysia" className="text-sm text-slate-500 hover:text-white transition-colors">Panduan Harga Penuh</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
