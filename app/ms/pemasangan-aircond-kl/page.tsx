import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaTruck, FaWrench, FaGauge, FaShield, FaClock, FaLocationDot, FaBuilding, FaPlug, FaSnowflake, FaMagnifyingGlass, FaBolt, FaTemperatureHalf } from "react-icons/fa6";
import { FiMessageSquare, FiPhone } from "react-icons/fi";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildInstallationServiceSchema, buildInstallationHowToSchema, buildInstallationFAQSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationCROModule } from "@/components/installation-cro-module";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "Pemasangan Aircond KL & Selangor — Dari RM199 | Hari Sama | KL Renovator",
  description: "Pemasangan aircond pakar dari RM199 — dinding, ceiling cassette & unit tingkap untuk 20 jenama. Vacuum pump, paip tembaga, waranti 1 bulan. Servis hari sama. WhatsApp +60182983573",
  openGraph: {
    title: "Pemasangan Aircond KL & Selangor — Dari RM199 | KL Renovator",
    description: "Pemasangan aircond profesional dari RM199. Dinding, ceiling cassette, semua jenama. Vacuum pump, paip tembaga, waranti 1 bulan. WhatsApp +60182983573",
    type: "website",
    locale: "ms_MY",
    url: "https://www.klrenovator.com/ms/pemasangan-aircond-kl",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "Pemasangan Aircond KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Pemasangan Aircond KL & Selangor — Dari RM199 | KL Renovator", description: "Pemasangan aircond profesional dari RM199. Hari sama, semua jenama, waranti 1 bulan. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/ms/pemasangan-aircond-kl", languages: { "en-MY": "https://www.klrenovator.com/aircond-installation-kl", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-kl", "zh-MY": "https://www.klrenovator.com/zh/aircond-installation-kl", "x-default": "https://www.klrenovator.com/aircond-installation-kl" } },
};

const INSTALLATION_PROCESS = [
  { step: 1, title: "Tempahan WhatsApp & Survei Tapak", desc: "Hubungi kami via WhatsApp di +60182983573 dengan kawasan anda, jenis unit (dinding, ceiling cassette, tingkap), dan saiz HP. Kami sahkan harga dan jadualkan survei tapak hari sama atau esok. Juruteknik menilai laluan paip, kedudukan unit luar, dan keperluan elektrik.", icon: <FiMessageSquare className="h-5 w-5" /> },
  { step: 2, title: "Penghantaran Juruteknik & Persediaan", desc: "Juruteknik HVAC berlesen kami tiba dengan semua alat, bahan (paip tembaga, penebatan, braket, wayar), dan peralatan keselamatan. Lapik lindung melindungi lantai dan perabot. Kami sahkan pelan pemasangan tepat dengan anda sebelum mula.", icon: <FaTruck className="h-5 w-5" /> },
  { step: 3, title: "Pemasangan Paip Tembaga & Penebatan", desc: "Paip tembaga Type L atau Type M (bergantung saiz HP) dipotong, di-flare, dan dilalukan dengan kemas. Penebatan Armaflex (minimum 9mm) mengelakkan kondensasi dan kehilangan tenaga. Paip disokong dengan braket yang betul — tiada lengkung tajam yang menghalang aliran refrigeran.", icon: <FaWrench className="h-5 w-5" /> },
  { step: 4, title: "Pemasangan Paip Saliran dengan Gradien", desc: "Paip PVC saliran dipasang dengan gradien minimum 1:50 untuk saliran graviti. Periuk anti-siphon mengelakkan aliran balik. Kondensat diuji sebelum ditutup. Untuk kondo tinggi, kami lalukan ke lubang saliran lantai atau saliran balconi mengikut peraturan pengurusan bangunan.", icon: <FaWrench className="h-5 w-5" /> },
  { step: 5, title: "Sambungan Elektrik & Pemeriksaan Breaker", desc: "Litar terpakai dengan rating MCB yang betul (16A untuk 1.0–1.5HP, 20A untuk 2.0–2.5HP, 32A untuk 3.0HP+). Saiz wayar mengikut standard Malaysia. Perlindungan kebocoran bumi disahkan. Isolator unit luar dipasang untuk keselamatan dan akses penyelenggaraan.", icon: <FaBolt className="h-5 w-5" /> },
  { step: 6, title: "Komisen Vacuum Pump (Wajib)", desc: "Vacuum pump dua peringkat menarik sistem ke 500 mikron atau kurang — mengeluarkan semua kelembapan dan bukan-kondensat. Langkah ini TIDAK BOLEH DILEWATKAN. Melangkau vacuum menyebabkan kegagalan kompresor, pembentukan asid, dan membatalkan waranti pengeluar. Kami mengekang vacuum 15+ minit untuk sahkan tiada kebocoran.", icon: <FaGauge className="h-5 w-5" /> },
  { step: 7, title: "Pelucahan Refrigeran, Ujian & Serah Terima", desc: "Cas kilang dilepaskan. Sistem berjalan 15+ minit. Kami sahkan: output penyejukan (termometer di supply/return), tekanan operasi, tarikan amp, kalibrasi termostat, sifar getaran, sifar kebocoran. Kad waranti kerja 1 bulan bertulis diserahkan. Kad kerja dengan senarai semak ditandatangani.", icon: <FaTemperatureHalf className="h-5 w-5" /> },
];

const PRICING_TABLE = [
  { type: "Dinding", hp: "1.0 HP", price: "RM 199", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket standard inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "1.5 HP", price: "RM 199", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket standard inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "2.0 HP", price: "RM 249", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket standard inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "2.5 HP", price: "RM 279", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket standard inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "3.0 HP", price: "RM 329", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket standard inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "4.0 HP", price: "RM 399", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket heavy-duty inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Dinding", hp: "5.0 HP", price: "RM 449", pipe: "7 kaki paip tembaga inklusif", bracket: "Braket heavy-duty inklusif", wire: "Wayar inklusif", drain: "Paip saliran inklusif" },
  { type: "Ceiling Cassette", hp: "1.0–1.5 HP", price: "RM 290", pipe: "7 kaki paip tembaga inklusif", bracket: "Kit gantungan ceiling inklusif", wire: "Wayar inklusif", drain: "Paip saliran + pump inklusif" },
  { type: "Ceiling Cassette", hp: "2.0–3.0 HP", price: "RM 350", pipe: "7 kaki paip tembaga inklusif", bracket: "Kit gantungan ceiling inklusif", wire: "Wayar inklusif", drain: "Paip saliran + pump inklusif" },
  { type: "Ceiling Cassette", hp: "3.5–6.0 HP", price: "RM 400", pipe: "7 kaki paip tembaga inklusif", bracket: "Kit gantungan ceiling inklusif", wire: "Wayar inklusif", drain: "Paip saliran + pump inklusif" },
  { type: "Unit Tingkap", hp: "1.0–2.0 HP", price: "RM 180", pipe: "Tidak berkenaan", bracket: "Pasangan bingkai tingkap", wire: "Wayar inklusif", drain: "Saliran terbina dalam" },
];

const BRANDS = siteConfig.brandsSupported;

const FAQS = [
  { q: "Berapa harga pemasangan aircond di KL & Selangor?", a: "Pemasangan dinding bermula RM 199 untuk 1.0–1.5 HP termasuk 7 kaki paip tembaga, wayar, paip saliran, dan braket standard. Ceiling cassette dari RM 290. Unit tingkap dari RM 180. Bahan tambahan melebihi 7 kaki dikira per kaki — paip tembaga RM 17–27/kaki, wayar RM 9/kaki, casing RM 6–12/kaki. Semua harga disahkan sebelum kerja bermula." },
  { q: "Berapa lama masa pemasangan aircond?", a: "Pemasangan dinding standard mengambil 3–5 jam untuk satu unit. Ceiling cassette ambil 5–8 jam disebabkan gantungan ceiling dan wayaran pump saliran. Pemasangan multi-unit seluruh rumah biasanya siap dalam 1–2 hari. Slot hari sama tersedia untuk tempahan sebelum 11 PG." },
  { q: "Adakah anda memasang aircond di kondo tinggi di KL?", a: "Ya — kami kerap memasang di kondo merentasi KLCC, Mont Kiara, Bangsar, Sentul, PJ, dan Subang Jaya. Kami urus dengan pengurusan bangunan untuk akses lif/loading bay, ikut prosedur keselamatan, dan pastikan penempatan unit luar mematuhi peraturan JMB. Juruteknik kami berpengalaman dengan pemasangan di tebing servis dan balconi." },
  { q: "Gred paip tembaga apa yang anda guna untuk pemasangan?", a: "Kami guna paip tembaga Type L untuk unit dinding 1.0–2.5 HP dan Type M untuk 3.0 HP+ di mana ketebalan dinding membenarkan. Semua paip dibersihkan nitrogen semasa brazing untuk elakkan pengoksidaan dalaman. Penebatan Armaflex (9–13mm) standard. Ini melebihi standard minimum Malaysia dan memastikan kebolehypercayaan jangka panjang." },
  { q: "Mengapa komisen vacuum pump adalah wajib?", a: "Vacuum mengeluarkan kelembapan dan udara dari paip refrigeran. Kelembapan + refrigeran = asid, yang musnahkan lilitan kompresor dan menyumbat tiub kapilari. Bukan-kondensat menaikkan tekanan kepala dan membunuh kecekapan. Kami tarik ke 500 mikron dan pegang 15+ minit. Tiada vacuum = tiada waranti. Ini amalan HVAC terbaik di seluruh dunia." },
  { q: "Bolehkah pemasangan dilakukan semasa musim hujan di Malaysia?", a: "Ya — kami pasang sepanjang tahun. Untuk kerja luar semasa hujan, kami guna kanopi popup dan penutup air-tahan. Pasangan unit dalaman dan paipan berterusan tidak terganggu. Hujan lepet dengan kilat sahaja menghentikan penempatan kompresor luar untuk keselamatan. Slot hari sama mungkin lebih ketat semasa monsun — tempah awal." },
  { q: "Adakah saya perlukan litar elektrik khusus untuk aircond baharu?", a: "Ya — peraturan Malaysia (MS IEC 60364) memerlukan litar terpakai dengan MCB sendiri untuk setiap unit aircond. Kami pasang litar baharu dari kotak DB anda jika tidak wujud, atau sahkan kapasiti litar sedia ada. Unit berkisar masih perlu soket terpakai pada litar terlindung. Kerja elektrik termasuk dalam sebut harga pemasangan kami." },
  { q: "Apa waranti yang anda berikan untuk pemasangan?", a: "Waranti kerja 1 bulan bertulis untuk semua buruh pemasangan. Jika sebarang isu berkaitan pemasangan timbul (kebocoran, getaran, kegagalan elektrik, penyejukan lemah) dalam 30 hari, kami kembali dan betulkan tanpa bayaran. Waranti pengeluar pada unit sendiri (biasanya 5 tahun kompresor, 1 tahun bahagian) adalah berasingan dan memerlukan bukti pemasangan profesional — yang kad kerja kami sediakan." },
  { q: "Bagaimana nak tempah pemasangan aircond berhampiran saya di KL atau Selangor?", a: "WhatsApp +60182983573 dengan kawasan anda, jenis unit (dinding/ceiling cassette/tingkap), saiz HP, dan tarikh keutamaan. Kami sah harga dan jadual dalam 30 minit. Pemasangan hari sama tersedia untuk tempahan awal. Kami meliputi semua kawasan KL & Selangor termasuk Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, dan Cyberjaya." },
];

function TrustBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90">
      <Icon className="h-4 w-4 text-emerald-400" />
      {label}
    </span>
  );
}

function ProcessStep({ step, title, desc, icon }: { step: number; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="relative flex gap-6 group">
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-xl z-10 relative border-4 border-white">{step}</div>
        {step < 7 && <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-transparent" />}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex p-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl">{icon}</div>
          <h3 className="font-black text-slate-900 text-lg">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed ml-10">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <h3 className="font-black text-slate-900 mb-2 text-base">{q}</h3>
      <p className="text-slate-600 leading-relaxed">{a}</p>
    </div>
  );
}

function PricingRow({ type, hp, price, pipe, bracket, wire, drain, isHeader = false }: { type: string; hp: string; price: string; pipe: string; bracket: string; wire: string; drain: string; isHeader?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_80px_repeat(4,1fr)] gap-4 px-4 py-3 ${isHeader ? "bg-slate-50 font-black text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200" : "border-b border-slate-50 hover:bg-sky-50/30 transition-colors text-sm"}`}>
      <span className={`font-${isHeader ? "black" : "medium"} text-${isHeader ? "slate-700" : "slate-900"}`}>{type}</span>
      <span className="text-center">{hp}</span>
      <span className="text-center text-sky-600 font-black">{price}</span>
      <span className="text-center text-xs text-slate-500">{pipe}</span>
      <span className="text-center text-xs text-slate-500">{bracket}</span>
      <span className="text-center text-xs text-slate-500">{wire}</span>
      <span className="text-center text-xs text-slate-500">{drain}</span>
    </div>
  );
}

export default function PemasanganAircondKLPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Utama", url: "https://www.klrenovator.com/ms" },
    { name: "Pemasangan Aircond KL & Selangor", url: "https://www.klrenovator.com/ms/pemasangan-aircond-kl" },
  ]);

  const serviceSchema = buildInstallationServiceSchema();
  const howToSchema = buildInstallationHowToSchema();
  const faqSchema = buildInstallationFAQSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image
          src="/hero/aircond-installation-kuala-lumpur.webp"
          alt="Juruteknik KL Renovator melaksanakan pemasangan aircond profesional Kuala Lumpur"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">Pakar Pemasangan Aircond Paling Dipercayai KL & Selangor</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">
              Pemasangan Aircond KL & Selangor
              <br />
              <span className="text-sky-400">Dari RM 199 · Hari Sama · Semua Jenama</span>
            </h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
              Pemasangan pakar unit dinding, ceiling cassette & tingkap merentasi Kuala Lumpur dan Selangor.
              Komisen vacuum pump, paip tembaga Type L, penebatan Armaflex, waranti kerja 1 bulan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrustBadge icon={FaCheck} label="Pemasangan Dari RM 199" />
              <TrustBadge icon={FaClock} label="Tersedia Hari Sama" />
              <TrustBadge icon={FaShield} label="Waranti Kerja 1 Bulan" />
              <TrustBadge icon={FaTruck} label="20 Jenama Disokong" />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🔧 Pertanyaan Pemasangan Aircond\n\nHai KL Renovator, saya perlukan aircond baharu dipasang.\n\n📍 Kawasan Saya:\n❄️ Jenis Unit: Dinding / Ceiling Cassette / Tingkap\n📏 Saiz HP (jika diketahui):\n🏠 Hartanah: Kondo / Landed / Pejabat / Kedai\n\nSila hantar sebut harga & slot tersedia.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all">
                <FaWhatsapp className="h-5 w-5" /> Tempah Pemasangan via WhatsApp
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all">
                <FiPhone className="h-4 w-4 text-sky-300" /> Hubungi +60 18-298 3573
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose KL Renovator for Installation */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>Mengapa KL Renovator untuk Pemasangan?</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Pemasangan Pakar oleh </span><span className={title({ size: "sm", color: "brand" })}>Juruteknik HVAC Berlesen</span></h2>
              <p className="mt-4 text-slate-600 font-medium">Kami tidak hanya memasang unit — kami merekabentuk sistem penyejukan lengkap yang tahan lama.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FaWrench className="h-6 w-6" />, title: "Vacuum Pump Setiap Kerja", desc: "Vacuum 500-mikron wajib pada setiap pemasangan. Tiada pengecualian. Melindungi kompresor anda bertahun-tahun." },
              { icon: <FaPlug className="h-6 w-6" />, title: "Paip Tembaga Type L & Armaflex", desc: "Paip tembaga premium dengan penebatan Armaflex 9–13mm. Tiada gantian nipis murah." },
              { icon: <FaBolt className="h-6 w-6" />, title: "Litar Terpakai & MCB Betul", desc: "Elektrik mengikut MS IEC 60364. Saiz breaker betul, kebocoran bumi, isolator termasuk." },
              { icon: <FaGauge className="h-6 w-6" />, title: "Komisen Presisi", desc: "Ujian 15-minit: tekanan, tarikan amp, kalibrasi termostat, delta-T penyejukan disahkan." },
              { icon: <FaShield className="h-6 w-6" />, title: "Waranti 1 Bulan Bertulis", desc: "Kad kerja dengan senarai semak ditandatangani. Mana-mana isu pemasangan dalam 30 hari — kami pulang percuma." },
              { icon: <FaBuilding className="h-6 w-6" />, title: "Pakar Kondo & JMB", desc: "Kami urus kelulusan bangunan, tempahan lif, akses tebing servis, peraturan selepas waktu pejabat dengan lancar." },
              { icon: <FaSnowflake className="h-6 w-6" />, title: "Semua 20 Jenama Utama", desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Hisense, Aux, TCL, Isonic, National, Sanyo." },
              { icon: <FaLocationDot className="h-6 w-6" />, title: "Liputan KL & Selangor", desc: "Petaling Jaya, Cheras, Ampang, Subang, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process - 7 Steps */}
      <section className="py-20 sm:py-28 bg-slate-50" id="process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>Proses Pemasangan 7 Langkah Kami</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Daripada Tempahan ke </span><span className={title({ size: "sm", color: "brand" })}>Keselesaan Sejuk</span></h2>
              <p className="mt-4 text-slate-600 font-medium">Setiap pemasangan mengikuti urutan tepat ini — tiada pintasan, tiada kejutan.</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {INSTALLATION_PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <ProcessStep {...step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Technical Details */}
      <section className="py-20 sm:py-28 bg-white" id="materials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>Bahan & Standard Teknikal</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Apa Yang Terlibat Dalam Setiap </span><span className={title({ size: "sm", color: "brand" })}>Pemasangan Berkualiti</span></h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaPlug className="h-5 w-5 text-sky-600" /> Paip Tembaga</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Tembaga Type L (1.0–2.5 HP) — dinding tebal, rintangan kakisan lebih baik</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Tembaga Type M (3.0 HP+) — diluluskan untuk kapasiti lebih besar</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Dibersihkan nitrogen semasa brazing — elakkan pengoksidaan dalaman</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Sambungan flare yang betul — dikencangkan kunci tork mengikut spesifikasi</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Tiada kink, lengkung tajam, atau laluan paip undersized</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaTemperatureHalf className="h-5 w-5 text-sky-600" /> Penebatan</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Armaflex (elastomer sel-terbuka) — minimum ketebalan 9mm</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 13mm untuk ceiling cassette &amp; laluan paip panjang (&gt;15 kaki)</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Mencegah tetesan kondensasi & kehilangan tenaga</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Tape UV-rintang pada semua joint & terminasi</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Liputan penuh — tiada tembaga terdedah mana-mana</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaBolt className="h-5 w-5 text-sky-600" /> Elektrik & Braket</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Litar terpakai dari DB — rating MCB betul mengikut HP</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Kabel 2.5mm² (1.0–2.5 HP), 4mm² (3.0–5.0 HP)</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Suis isolator luar — keselamatan & akses penyelenggaraan</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Braket heavy-duty — getaran-dipekat, powder-coated</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Trunking kabel — kemas, dilindungi, boleh cat</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing Transparency Table */}
      <section className="py-20 sm:py-28 bg-slate-50" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className={eyebrow()}>Harga Pemasangan Telus</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Tiada Caj Tersembunyi — </span><span className={title({ size: "sm", color: "brand" })}>Harga Disahkan Sebelum Kami Borong</span></h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[900px]">
                <PricingRow type="Jenis" hp="HP" price="Buruh" pipe="Paip Tembaga" bracket="Braket" wire="Wayar" drain="Paip Saliran" isHeader />
                {PRICING_TABLE.map((row) => (
                  <PricingRow key={`${row.type}-${row.hp}`} {...row} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="font-black text-emerald-800 mb-3 flex items-center gap-2"><FaCheck className="h-5 w-5" /> Apa Yang Termasuk Dalam Harga Buruh</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Survei tapak & sebut harga (percuma)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 kaki paip tembaga (cecair + gas)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 kaki wayar elektrik</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 kaki paip PVC saliran</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Braket standard luar</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Komisen vacuum pump</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Pelucahan refrigeran & ujian</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Kad waranti kerja 1 bulan</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2"><FaMagnifyingGlass className="h-5 w-5" /> Caj Tambahan (Hanya Jika Perlu)</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Paip tembaga melebihi 7 kaki: RM 17–27/kaki</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Wayar melebihi 7 kaki: RM 9/kaki</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Casing PVC/penyembunyian: RM 6–12/kaki</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Naik taraf braket heavy-duty: RM 45</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Soket elektrik baharu: RM 100</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Borong dinding/penyembunyian: RM 6/kaki</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Akses kondo tinggi/sukar: RM 50–150</li>
              </ul>
              <p className="mt-4 text-xs text-amber-600">Semua tambahan dikutip & diluluskan di tapak SEBELUM kerja bermula. Tiada kejutan.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Expertise */}
      <section className="py-20 sm:py-28 bg-white" id="brands">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>Kepakaran Pemasangan Jenama</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Kami Pasang Semua </span><span className={title({ size: "sm", color: "brand" })}>20 Jenama Utama</span></h2>
              <p className="mt-4 text-slate-600 font-medium">Daripada split Daikin kompatibel VRV ke unit dinding inverter Midea — juruteknik kami kenal setiap keunikan jenama, spesifikasi tork, dan prosedur komisen.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {BRANDS.map((brand) => (
                <a key={brand} href={`/ms/brands/${brand.toLowerCase()}/pemasangan`} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center hover:border-sky-300 hover:shadow-md transition-all group">
                  <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors">{brand}</p>
                  <p className="text-xs text-slate-400 mt-1">Pemasangan Pakar</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warranty & Trust Signals */}
      <section className="py-20 sm:py-28 bg-sky-600 text-white" id="warranty">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-100 mb-4">Janji Kami</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Waranti Kerja 1 Bulan Bertulis</h2>
              <p className="mt-4 text-sky-100 font-medium">Bukan lisan. Bukan tersirat. Kad kerja bertandatangan dengan senarai semak — bukti pemasangan profesional anda.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">1</div>
                <h3 className="font-black text-lg mb-2">Bulan Waranti Kerja</h3>
                <p className="text-sky-100 text-sm">Mana-mana isu berkaitan pemasangan — kebocoran, getaran, elektrik, penyejukan — kami pulang percuma.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">3</div>
                <h3 className="font-black text-lg mb-2">Bulan Waranti Bahagian</h3>
                <p className="text-sky-100 text-sm">Atas sebarang komponen yang kami bekalkan (braket, paip, wayar, fitting).</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">✓</div>
                <h3 className="font-black text-lg mb-2">Waranti Pengeluar Dilindungi</h3>
                <p className="text-sky-100 text-sm">Kad kerja kami membuktikan pemasangan profesional — mengekalkan waranti 5 tahun kompresor anda sah.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="mt-12 text-center">
              <h3 className="font-black text-xl mb-4">Harga Disahkan Sebelum Kami Borong — Dijamin</h3>
              <p className="text-sky-100 mb-6 max-w-2xl mx-auto">Tiada caj tersembunyi. Tiada kejutan "sambil-sambil". Setiap bahan tambahan dikutip dan diluluskan oleh anda di tapak sebelum sebarang pengeboran atau pemotongan bermula.</p>
              <a href={waLink("🔧 Permintaan Sebut Harga Pemasangan\n\nHai KL Renovator, saya mahu harga disahkan untuk pemasangan aircond.\n\n📍 Kawasan:\n❄️ Jenis Unit:\n📏 Saiz HP:\n🏠 Jenis Hartanah:\n\nSila hantar pecahan penuh.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> Dapatkan Harga Disahkan WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Soalan Lazim</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Soalan Pemasangan </span><span className={title({ size: "sm", color: "brand" })}>Dijawab Dengan Jujur</span></h2>
            </div>
          </Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CRO Module — Installation Page Conversion Optimization */}
      <InstallationCROModule 
        title="Mengapa KL Renovator untuk Pemasangan?"
        subtitle="Pemasangan aircond profesional dari RM199 — hari sama tersedia, semua 20 jenama, waranti kerja 1 bulan."
        showObjectionHandling={true}
        showTrustSignals={true}
        showPricingGuarantee={true}
        showUSPBlock={true}
      />

      {/* Installation Trust Signals — INS-17 */}
      <InstallationTrustSignals variant="default" />

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Sedia Untuk Pemasangan Profesional?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Slot hari sama tersedia merentasi KL & Selangor. Harga telus dari RM 199. Waranti kerja 1 bulan. Semua 20 jenama.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🔧 Tempahan Pemasangan Aircond\n\nHai KL Renovator, saya mahu tempah pemasangan.\n\n📍 Kawasan Saya:\n❄️ Jenis Unit: Dinding / Ceiling Cassette / Tingkap\n📏 Saiz HP:\n🏠 Hartanah: Kondo / Landed / Pejabat\n\nTarikh keutamaan:\n\nSila sahkan harga & slot.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> Tempah via WhatsApp
              </a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FiPhone className="h-4 w-4" /> Hubungi +60 18-298 3573
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Kami melayani semua kawasan KL & Selangor — Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & banyak lagi.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}