import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaShield, FaClipboardList, FaBolt, FaKey, FaPhone, FaBuilding } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "Pemasangan Aircond Rumah Baru KL — Pakej Seluruh Rumah",
  description: "Berpindah ke rumah baru di KL atau Selangor? Pakej pemasangan aircond lengkap untuk rumah 1BR, 2BR, 3BR & 4BR. Dari RM199/unit. Harga telus, waranti 1 bulan. WhatsApp +60182983573",
  openGraph: {
    title: "Pemasangan Aircond Rumah Baru KL — Pakej Seluruh Rumah",
    description: "Berpindah ke rumah baru? Pakej pemasangan aircond lengkap untuk 1BR–4BR. Dari RM199/unit, waranti 1 bulan. WhatsApp +60182983573",
    type: "website", locale: "ms_MY",
    url: "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "Pemasangan Aircond Rumah Baru KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Pemasangan Aircond Rumah Baru KL — Pakej Seluruh Rumah", description: "Pakej pemasangan aircond lengkap untuk rumah baru. 1BR–4BR, pakar kondo & landed, timeline 48 jam. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru", languages: { "en-MY": "https://www.klrenovator.com/new-home-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru", "zh-MY": "https://www.klrenovator.com/zh/new-home-aircond-installation", "x-default": "https://www.klrenovator.com/new-home-aircond-installation" } },
};

const PACKAGES = [
  { name: "1 Bilik Tidur (Studio / 1BR)", subtitle: "Sesuai untuk apartmen studio & kondo 1 bilik", price: "RM 199", includes: ["1× aircond dinding (1.0–1.5 HP)", "7 kaki paip tembaga, pendawaian, paip saliran", "Bracket luar standard", "Vakum pam", "Waranti kerja 1 bulan"], badge: "Paling Popular untuk Bujang & Pasangan" },
  { name: "2 Bilik Tidur (2BR)", subtitle: "Ideal untuk kondo & apartmen 2 bilik", price: "RM 398", includes: ["2× aircond dinding (1.0–1.5 HP setiap satu)", "7 kaki paip tembaga, pendawaian, paip saliran ×2", "Bracket luar standard ×2", "Vakum pam ×2", "Waranti kerja 1 bulan"], badge: "Nilai Terbaik untuk Keluarga Kecil", highlight: true },
  { name: "3 Bilik Tidur (3BR)", subtitle: "Penyejukan lengkap untuk rumah landed & kondo 3 bilik", price: "RM 597", includes: ["3× aircond dinding (1.0–2.0 HP ikut keperluan)", "7 kaki paip tembaga, pendawaian, paip saliran ×3", "Bracket luar standard ×3", "Vakum pam ×3", "Waranti kerja 1 bulan", "Tinjauan tapak & semakan elektrik percuma"], badge: "Perlindungan Seluruh Rumah" },
  { name: "4 Bilik Tidur (4BR+)", subtitle: "Penyejukan penuh untuk rumah landed besar & semi-D", price: "Dari RM 796", includes: ["4+× aircond dinding (pelbagai saiz HP)", "7 kaki paip tembaga, pendawaian, paip saliran seunit", "Bracket tugas berat jika perlu", "Vakum pam pada setiap unit", "Waranti kerja 1 bulan", "Tinjauan tapak + penilaian kotak DB percuma", "Penjadualan keutamaan — siap dalam 1 hari"], badge: "Penyelesaian Rumah Lengkap" },
];

const CONDO_VS_LANDED = [
  { aspect: "Penempatan Unit Luar", condo: "Tebing servis atau balkoni — peraturan pengurusan bangunan terpakai. Mungkin perlu kelulusan JMB untuk lokasi penggerudian.", landed: "Bracket aras tanah atau dipasang di dinding. Lebih fleksibiliti dalam penempatan — kurang sekatan akses." },
  { aspect: "Panjang Paip Tembaga", condo: "Biasanya 7–15 kaki bergantung jarak dalam-luar. Larian lebih panjang dikenakan caj RM 17–27/kaki.", landed: "Biasanya 7–12 kaki untuk dinding. Larian lebih panjang hanya jika unit dalam di tingkat atas dari kompressor aras tanah." },
  { aspect: "Litar Elektrik", condo: "Kotak DB sedia ada diperiksa. Sesetengah kondo lama mungkin perlu naik taraf litar (disebut harga awal sebelum kerja).", landed: "Rumah baru biasanya ada slot MCB simpanan. Rumah landed lama mungkin perlu penilaian kotak DB untuk litar tambahan." },
  { aspect: "Akses & Masa", condo: "Tempahan lif, pendaftaran keselamatan, tempahan ruang muatan diperlukan. Kami uruskan — syorkan slot pagi hari bekerja.", landed: "Akses terus. Penjadualan lebih fleksibel. Slot hujung minggu tersedia. Garis masa lebih pantas keseluruhan." },
  { aspect: "Kelulusan JMB/Pengurusan", condo: "Diperlukan untuk kebanyakan kondo. Kami sediakan rancangan pemasangan untuk semakan JMB. Kelulusan biasanya 3–7 hari bekerja.", landed: "Tiada kelulusan JMB diperlukan untuk hartanah landed individu. Pemasangan segera boleh dilakukan." },
];

const JMB_STEPS = [
  { step: 1, title: "Hantar Pelan Pemasangan", desc: "Kami sediakan gambarajah ringkas menunjukkan lokasi unit luar, jenis bracket, dan laluan paip. Anda hantar ke pejabat JMB/pengurusan (atau kami bantu uruskan terus)." },
  { step: 2, title: "Semakan JMB (3–7 Hari Bekerja)", desc: "Pengurusan menyemak terhadap undang-undang kecil bangunan. Kebanyakan pemasangan dinding standard diluluskan tanpa isu. Ceiling cassette mungkin perlu kelulusan struktur tambahan." },
  { step: 3, title: "Kelulusan & Penjadualan", desc: "Setelah diluluskan, kami tempah akses lif/ruang muatan dan sahkan tarikh pemasangan. Kami uruskan semua koordinasi bangunan bagi pihak anda." },
];

const FAQS = [
  { q: "Berapa kos pemasangan aircond seluruh rumah untuk rumah baru di KL?", a: "Pakej kondo 2BR (2 unit) berharga RM 398, pakej 3BR (3 unit) RM 597, dan pakej 4BR+ bermula dari RM 796. Setiap unit termasuk 7 kaki paip tembaga, pendawaian, paip saliran, bracket, vakum pam, dan waranti kerja 1 bulan. Bahan tambahan melebihi 7 kaki disebut harga dan diluluskan di tapak sebelum kerja bermula. Semua harga disahkan awal — tiada caj tersembunyi." },
  { q: "Berapa lama pemasangan aircond rumah baru mengambil masa?", a: "1BR (1 unit): 3–5 jam. 2BR (2 unit): 5–8 jam. 3BR (3 unit): 1 hari. 4BR+ (4+ unit): 1–2 hari. Kami selalunya boleh siapkan hari sama untuk pemasangan 1–3 unit apabila ditempah sebelum 11 pagi. Pemasangan seluruh rumah dijadualkan lebih awal dengan masa keutamaan." },
  { q: "Perlukah kelulusan JMB untuk pemasangan aircond di kondo?", a: "Ya — kebanyakan kondo di KL & Selangor memerlukan kelulusan JMB/pengurusan sebelum menggerudi atau memasang unit luar. Kami sediakan pelan pemasangan ringkas untuk anda hantar. Kelulusan biasanya mengambil 3–7 hari bekerja. Pasukan kami boleh bantu uruskan terus dengan pengurusan bangunan." },
  { q: "Apa perbezaan antara pemasangan kondo dan rumah landed?", a: "Kondo perlu kelulusan JMB, tempahan lif/ruang muatan, dan mungkin ada sekatan tebing servis. Rumah landed lebih fleksibel dalam penempatan unit luar dan penjadualan lebih pantas. Kedua-duanya menggunakan bahan berkualiti sama (paip tembaga Type L, penebat Armaflex, litar khusus). Harga sama untuk unit dinding." },
  { q: "Bolehkah anda pasang sebelum saya pindah — rumah masih kosong?", a: "Ya — ini sebenarnya ideal. Rumah kosong membenarkan akses tanpa had untuk pemasangan paip, penggerudian, dan penempatan unit luar. Ramai pemilik rumah baru menempah kami 1–2 minggu sebelum berpindah. Kami akan selaras dengan jadual kontraktor/pengubahsuaian jika masih berjalan." },
  { q: "Bagaimana jika panel elektrik rumah baru saya tak boleh tampung unit aircond tambahan?", a: "Juruteknik kami memeriksa kapasiti kotak DB semasa tinjauan tapak percuma. Jika naik taraf diperlukan (slot MCB tambahan, pemutus utama kapasiti lebih tinggi), kami sebut harga kerja elektrik awal. Kebanyakan rumah baru (selepas 2015) ada kapasiti simpanan. Rumah lama mungkin perlu naik taraf panel kecil — biasanya RM 100–300." },
  { q: "Adakah anda tawarkan diskaun volum untuk unit berganda?", a: "Ya — harga pakej kami menggabungkan unit berganda dalam satu tempahan mudah. Untuk 5+ unit atau projek komersial, WhatsApp kami untuk sebut harga khas — diskaun tambahan tersedia untuk pemasangan lebih besar di KL & Selangor." },
  { q: "Jenama aircond apa yang anda syorkan untuk rumah baru berhampiran saya di KL?", a: "Daikin dan Panasonic adalah paling dipercayai untuk rumah baru di Malaysia — boleh harap, cekap tenaga, dengan ketersediaan alat ganti tempatan yang kukuh. Mitsubishi dan Midea menawarkan nilai hebat. Sebagai pakar pemasangan berhampiran anda, kami pasang semua 20 jenama dan boleh syorkan berdasarkan saiz bilik, bajet, dan keutamaan penjimatan tenaga semasa tinjauan tapak percuma." },
];

export default function PemasanganAircondRumahBaruPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Utama", url: "https://www.klrenovator.com/ms" },
    { name: "Pemasangan Aircond KL & Selangor", url: "https://www.klrenovator.com/ms/pemasangan-aircond-kl" },
    { name: "Pemasangan Aircond Rumah Baru", url: "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-kuala-lumpur.webp" alt="Pemasangan aircond rumah baru Kuala Lumpur Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">Pakar Pemasangan untuk Pemilik Rumah Baru</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Berpindah ke Rumah Baru?<br /><span className="text-emerald-400">Pakej Pemasangan Aircond Lengkap</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Pemasangan aircond seluruh rumah untuk rumah baru, kondo, dan hartanah landed di KL & Selangor. Harga pakej, tersedia hari sama, waranti kerja 1 bulan. Dari tempahan ke keselesaan sejuk dalam 48 jam.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Harga Pakej dari RM 199/unit</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Garis Masa 48 Jam Tersedia</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Tinjauan Tapak Percuma</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 Pertanyaan Pemasangan Rumah Baru\n\nHi KL Renovator, saya berpindah ke rumah baru dan perlukan pemasangan aircond.\n\n📍 Kawasan:\n🏠 Jenis Rumah: Kondo / Landed\n🛏️ Bilik Tidur:\n📅 Tarikh Pindah:\n\nSila hantar harga pakej & slot tersedia.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Dapatkan Sebut Harga di WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Hubungi +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Pricing */}
      <section className="py-20 sm:py-28 bg-slate-50" id="packages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Pakej Pemasangan Rumah Baru</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Harga Seluruh Rumah — </span><span className={title({ size: "sm", color: "brand" })}>Pakej & Jimat</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Satu tempahan meliputi seluruh rumah anda. Harga telus seunit, tiada caj tersembunyi.</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${pkg.highlight ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Nilai Terbaik</div>}
                  {pkg.badge && !pkg.highlight && <div className="inline-flex self-start bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{pkg.badge}</div>}
                  <div className="mb-4"><h3 className="font-black text-xl text-slate-900 mb-1">{pkg.name}</h3><p className="text-slate-500 text-sm">{pkg.subtitle}</p></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{pkg.price}</span><span className="text-slate-400 text-sm ml-1">jumlah upah</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Apa Termasuk</p>
                    <ul className="space-y-2">{pkg.includes.map((item: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                  </div>
                  <a href={waLink("🏠 Pertanyaan Pakej\n\nHi KL Renovator, saya mahu pakej pemasangan " + pkg.name + ".\n\n📍 Kawasan Saya:\n🏠 Jenis Rumah: Kondo / Landed\n📅 Tarikh Pilihan:\n\nSila sahkan harga & ketersediaan.")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${pkg.highlight ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> Pilih Pakej {pkg.name.split(" ")[0]}</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
              <p className="font-black text-amber-800 text-sm mb-1">5+ Unit? Projek Komersial?</p>
              <p className="text-amber-700 text-sm">WhatsApp kami untuk sebut harga khas berbilang unit — diskaun volum tambahan tersedia untuk pemasangan lebih besar di KL & Selangor.</p>
              <a href={waLink("🏢 Pertanyaan Berbilang Unit\n\nHi KL Renovator, saya perlukan sebut harga khas untuk berbilang unit aircond.\n\n📍 Lokasi:\n🔢 Bilangan Unit:\n🏠 Jenis Hartanah:\n\nSila hantar harga & garis masa khas.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Minta Sebut Harga Khas</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 bg-white" id="whats-included">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Apa Termasuk dalam Setiap Pakej</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Pemasangan Profesional — </span><span className={title({ size: "sm", color: "brand" })}>Tiada Jalan Pintas</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Setiap pakej termasuk lima langkah ini sebagai standard. Tiada caj tersembunyi, tiada prosedur dilangkau.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaCheck className="h-5 w-5" />, title: "Tinjauan Tapak & Perundingan", desc: "Juruteknik kami melawat rumah baru anda untuk menilai saiz bilik, keperluan BTU, laluan paip, penempatan unit luar, dan kapasiti elektrik. Percuma — tiada obligasi." },
              { icon: <FaBolt className="h-5 w-5" />, title: "Semakan Beban Elektrik", desc: "Kami sahkan kotak DB anda boleh menampung litar aircond tambahan. Jika naik taraf diperlukan, kami sebut harga awal sebelum sebarang kerja bermula." },
              { icon: <FaClipboardList className="h-5 w-5" />, title: "Spesifikasi Bahan", desc: "Paip tembaga Type L, penebat Armaflex 9–13mm, pendawaian 2.5mm²/4mm² ikut piawaian Malaysia. Setiap bahan disahkan dengan anda sebelum kerja." },
              { icon: <FaShield className="h-5 w-5" />, title: "Vakum Pam", desc: "Vakum dalam 500-mikron pada setiap unit. Wajib — melindungi kompressor, mencegah pembentukan asid, mengekalkan waranti pengeluar sah." },
              { icon: <FaKey className="h-5 w-5" />, title: "Penyerahan & Kad Waranti", desc: "Kad kerja bertandatangan dengan senarai semak pemasangan. Waranti kerja bertulis 1 bulan. Semua waranti pengeluar dilindungi dengan bukti pemasangan profesional." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condo vs Landed */}
      <section className="py-20 sm:py-28 bg-slate-50" id="condo-vs-landed">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Kondo vs Landed — Apa Bezanya?</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Pakar Pemasangan untuk </span><span className={title({ size: "sm", color: "brand" })}>Kedua-dua Jenis Hartanah</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Peraturan berbeza, kualiti sama. Juruteknik kami berpengalaman dalam kedua-dua kondo tinggi dan rumah landed di KL & Selangor.</p>
          </div></Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-0">
                  <div className="bg-slate-50 px-6 py-4 font-black text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Aspek</div>
                  <div className="bg-sky-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-sky-500">🏢 Kondo / Apartmen</div>
                  <div className="bg-emerald-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-emerald-500">🏠 Rumah Landed</div>
                  {CONDO_VS_LANDED.map((row, i) => (
                    <div key={i} className="contents">
                      <div className={`px-6 py-4 font-black text-slate-700 text-sm border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.aspect}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.condo}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.landed}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JMB */}
      <section className="py-20 sm:py-28 bg-white" id="jmb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Pemasangan Kondo — Panduan Kelulusan JMB</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Kami Uruskan Koordinasi </span><span className={title({ size: "sm", color: "brand" })}>Bangunan untuk Anda</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Kebanyakan kondo di KL & Selangor memerlukan kelulusan JMB/pengurusan. Pasukan kami mengemudinya dengan lancar.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {JMB_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 pt-10 h-full">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-lg">{step.step}</div>
                  <h3 className="font-black text-slate-900 mb-2 mt-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <h3 className="font-black text-sky-800 mb-3 flex items-center gap-2"><FaBuilding className="h-5 w-5" /> Pakar Pemasangan Kondo Berhampiran Anda</h3>
              <p className="text-sky-700 text-sm leading-relaxed mb-4">Sebagai pakar pemasangan paling dipercayai untuk kondo di KLCC, Mont Kiara, Bangsar, Sentul, PJ, Subang Jaya, dan seterusnya — kami telah mengemudi kelulusan JMB untuk ratusan unit di Lembah Klang.</p>
              <p className="text-sky-700 text-sm leading-relaxed">Tip: Tempah tinjauan tapak anda <strong>2 minggu sebelum berpindah</strong> untuk memberi masa untuk kelulusan JMB + pemasangan. Untuk rumah landed, 48 jam biasanya mencukupi.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-emerald-600 text-white" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100 mb-4">Dari Tempahan ke Keselesaan Sejuk</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Udara Sejuk dalam 48 Jam — Dijamin</h2>
            <p className="mt-4 text-emerald-100 font-medium">Proses rumah baru kami yang lancar membawa anda dari tempahan ke pemasangan lengkap hanya dalam 2 hari.</p>
          </div></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { step: "Hari 1 PG", icon: <FaWhatsapp className="h-6 w-6" />, title: "Tempahan WhatsApp", desc: "Hantar butiran rumah baru anda — kawasan, jenis rumah, bilangan bilik. Kami sahkan harga pakej dan jadual tinjauan tapak dalam beberapa jam." },
              { step: "Hari 1 PTG", icon: <FaClipboardList className="h-6 w-6" />, title: "Tinjauan Tapak & Sebut Harga", desc: "Juruteknik melawat rumah baru anda. Menilai keperluan BTU, laluan paip, elektrik. Sebut harga akhir disahkan di tapak — percuma, tiada obligasi." },
              { step: "Hari 2 PG", icon: <FaBolt className="h-6 w-6" />, title: "Hari Pemasangan", desc: "Pasukan tiba dengan semua bahan. Berbilang unit dipasang mengikut urutan. Kain pelindung lantai. Paip tembaga, vakum, ujian setiap unit." },
              { step: "Hari 2 PTG", icon: <FaShield className="h-6 w-6" />, title: "Penyerahan & Waranti", desc: "Semua unit diuji. Penyejukan disahkan. Kad kerja ditandatangani. Waranti kerja bertulis 1 bulan diserahkan. Anda melangkah ke rumah baru yang sejuk." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">{item.icon}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-200 mb-2">{item.step}</p>
                  <h3 className="font-black text-lg mb-2">{item.title}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={500}>
            <div className="mt-12 text-center">
              <p className="text-emerald-100 text-sm mb-4">*Garis masa 48 jam terpakai untuk rumah landed dan kondo dengan JMB pra-lulus. Kondo yang perlu kelulusan JMB baru: tambah 3–7 hari bekerja.</p>
              <a href={waLink("🏠 Tempah Pemasangan Rumah Baru — Garis Masa 48 Jam\n\nHi KL Renovator, saya mahu tempah pemasangan rumah baru dengan garis masa 48 jam.\n\n📍 Kawasan:\n🏠 Jenis Rumah:\n🛏️ Bilik Tidur:\n📅 Tarikh Mula Pilihan:\n\nSila sahkan ketersediaan & harga.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" /> Mulakan Garis Masa 48 Jam Saya</a>
            </div>
          </Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12">
            <p className={eyebrow()}>Soalan Lazim Pemasangan Rumah Baru</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Soalan Lazim </span><span className={title({ size: "sm", color: "brand" })}>Dijawab Jujur</span></h2>
          </div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Pindah Tidak Lama Lagi? Mari Uruskan Aircond Anda.</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Tinjauan tapak percuma. Harga pakej dari RM 199/unit. Garis masa 48 jam tersedia. Waranti kerja 1 bulan. Semua 20 jenama.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 Pemasangan Rumah Baru — Tempahan Akhir\n\nHi KL Renovator, saya sedia untuk tempah pemasangan rumah baru.\n\n📍 Kawasan:\n🏠 Jenis Rumah: Kondo / Landed\n🛏️ Bilik Tidur:\n📅 Tarikh Pilihan:\n\nSila sahkan pakej & slot saya.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Tempah via WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Hubungi +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Meliputi semua kawasan KL & Selangor — Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong, Klang, Damansara, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & banyak lagi.</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/ms/pemasangan-aircond-kl" className="text-sm text-slate-400 hover:text-white transition-colors">← Semua Perkhidmatan Pemasangan</Link>
              <Link href="/ms/installation-price-malaysia" className="text-sm text-slate-400 hover:text-white transition-colors">Panduan Harga Penuh</Link>
              <Link href="/ms/faq" className="text-sm text-slate-400 hover:text-white transition-colors">Lebih Banyak Soalan Lazim</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
