"use client";

import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiChevronRight, FiClock, FiMapPin } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { useLang } from "@/context/language-context";

// ── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    breadcrumb: "Aircond Service Near Me",
    badge: "Local Aircond Service · KL & Selangor",
    h1: "Aircond Service Near Me in KL & Selangor",
    hero_desc: "Searching for a reliable aircond technician near you? KL Renovator dispatches trained HVAC technicians across Kuala Lumpur and Selangor — same-day slots, transparent pricing and all brands serviced. Trusted by 500+ homeowners and businesses.",
    hero_wa: "WhatsApp Us for a Same-Day Slot",
    hero_call: "Call",
    hero_hours: "Mon–Sun, 9:00 AM – 6:00 PM · Reply within 30 minutes on WhatsApp",
    why_badge: "Why book a local aircond team",
    why_h2: "Fast, local & transparent aircond service near you",
    features: [
      { t: "Same-day response", d: "Technicians based across KL & Selangor mean shorter travel times and more same-day slots." },
      { t: "Local building know-how", d: "We regularly service high-rise condos, landed homes, shoplots and offices — and follow each building's access procedure." },
      { t: "Transparent pricing", d: "Every job is quoted before we start. No hidden call-out fees, no surprise charges." },
      { t: "All brands & types", d: "Wall-mounted, ceiling cassette and window units — inverter and non-inverter, all 20 major brands." },
      { t: "1-month workmanship warranty", d: "Every service and repair is backed by our workmanship warranty for your peace of mind." },
      { t: "500+ happy customers", d: "Trusted by households and businesses across the Klang Valley for honest, reliable aircond work." },
    ],
    how_badge: "How it works",
    how_h2: "Getting an aircond technician near you takes 4 simple steps",
    steps: [
      { n: "1", t: "WhatsApp or call us", d: "Send your area, unit type and the problem. We reply within 30 minutes." },
      { n: "2", t: "We match the nearest slot", d: "We confirm a same-day or next-day appointment that suits you." },
      { n: "3", t: "Technician arrives", d: "A trained HVAC technician arrives on time with the right tools and parts." },
      { n: "4", t: "Service & handover", d: "We service, test and explain the work — with pricing confirmed upfront." },
    ],
    what_badge: "What we service near you",
    what_h2: "Aircond servicing for every home & business",
    what_desc: "From a single bedroom unit to a row of shoplofts, our HVAC expert team handles it all — using genuine care and transparent pricing on every visit.",
    what_list: [
      "Wall-mounted split units (homes & condos)",
      "Ceiling cassette units (shoplots, offices, commercial)",
      "Window units (compact homes & service rooms)",
      "Pressure chemical wash, chemical overhaul & gas top-up",
      "Troubleshooting, repairs, PCB & compressor work",
      "New installation & dismantle / relocation",
    ],
    what_btn: "View all aircond services",
    areas_badge: "Areas we cover near you",
    areas_h2: "We service all of Kuala Lumpur & Selangor",
    areas_desc: "No matter where you are in the Klang Valley, there's a KL Renovator technician nearby.",
    areas_btn: "See all 40 service areas",
    intent_badge: "Fast local dispatch · Area service guides",
    intent_h3: "When to use this page and when to choose your area",
    intent_desc: "Use this page when you need a fast aircond technician near you anywhere in Kuala Lumpur or Selangor. If you want details for your exact township—such as common water-leak issues, condo access notes or local pricing—choose your area page below.",
    faq_badge: "Frequently asked questions",
    faq_h2: "Aircond service near me — common questions",
    faqs: [
      { q: "How do I find a reliable aircond technician near me?", a: "WhatsApp KL Renovator at +60182983573 with your area and the problem — we match you with the nearest available slot and a trained HVAC technician. We cover all of Kuala Lumpur and Selangor, including high-rise condos, landed homes, shoplots and offices." },
      { q: "Do you offer same-day aircond service near me?", a: "Yes — same-day slots are frequently available across KL & Selangor. For the best chance, WhatsApp us early in the day with your location and the issue (not cooling, water leaking, strange noise, or a routine service)." },
      { q: "How much does aircond service cost near me?", a: "Basic servicing from RM 99, pressure chemical wash from RM 120 (1.0–1.5 HP wall-mounted), chemical overhaul from RM 220, and gas top-up from RM 120 (R22, R410A or R32). Every price is confirmed before any work begins — no hidden charges, no surprise call-out fees." },
      { q: "Which areas of KL & Selangor do you cover?", a: "We cover the entire Klang Valley — Kuala Lumpur, Petaling Jaya, Cheras, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Kajang, Setia Alam, Bangsar, Mont Kiara, Kepong, Sri Petaling, Bukit Jalil, Putrajaya, Cyberjaya and 30+ more neighbourhoods." },
      { q: "Which aircond brands do you service near me?", a: "All major brands — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL and Isonic." },
      { q: "Is there a call-out or travelling charge?", a: "No hidden call-out fee — pricing is transparent and quoted upfront based on the service and unit type. You'll always know the price before the technician starts work." },
    ],
    cta_h2: "Need an aircond technician near you today?",
    cta_desc: "WhatsApp KL Renovator now with your area and the problem — we'll match you with the nearest available slot. Same-day appointments available across KL & Selangor.",
    cta_wa: "WhatsApp +60182983573",
  },
  ms: {
    breadcrumb: "Servis Aircond Berdekatan",
    badge: "Servis Aircond Tempatan · KL & Selangor",
    h1: "Servis Aircond Berdekatan di KL & Selangor",
    hero_desc: "Mencari juruteknik aircond yang dipercayai berdekatan anda? KL Renovator menghantar juruteknik HVAC terlatih ke seluruh Kuala Lumpur dan Selangor — slot hari sama, harga telus dan semua jenama diservis. Dipercayai 500+ pemilik rumah dan perniagaan.",
    hero_wa: "WhatsApp Kami untuk Slot Hari Sama",
    hero_call: "Hubungi",
    hero_hours: "Isnin–Ahad, 9:00 PG – 6:00 PTG · Balas dalam 30 minit melalui WhatsApp",
    why_badge: "Mengapa tempah pasukan aircond tempatan",
    why_h2: "Servis aircond pantas, tempatan & telus berdekatan anda",
    features: [
      { t: "Tindak balas hari sama", d: "Juruteknik yang berpangkalan di seluruh KL & Selangor bermaksud masa perjalanan lebih singkat dan lebih banyak slot hari sama." },
      { t: "Pengetahuan bangunan tempatan", d: "Kami kerap menyervis kondominium bertingkat, rumah teres, kedai dan pejabat — dan mengikut prosedur akses setiap bangunan." },
      { t: "Harga telus", d: "Setiap kerja diberi sebut harga sebelum kami mulakan. Tiada caj keluar tersembunyi, tiada caj mengejut." },
      { t: "Semua jenama & jenis", d: "Unit dinding, ceiling cassette dan tingkap — penyongsang dan bukan penyongsang, semua 20 jenama utama." },
      { t: "Waranti kerja 1 bulan", d: "Setiap servis dan pembaikan disokong oleh waranti kerja kami untuk ketenangan fikiran anda." },
      { t: "500+ pelanggan gembira", d: "Dipercayai oleh isi rumah dan perniagaan di seluruh Lembah Klang untuk kerja aircond yang jujur dan boleh dipercayai." },
    ],
    how_badge: "Cara ia berfungsi",
    how_h2: "Mendapatkan juruteknik aircond berdekatan anda hanya 4 langkah mudah",
    steps: [
      { n: "1", t: "WhatsApp atau hubungi kami", d: "Hantar kawasan, jenis unit dan masalah anda. Kami balas dalam 30 minit." },
      { n: "2", t: "Kami padankan slot terdekat", d: "Kami sahkan temujanji hari sama atau hari berikutnya yang sesuai dengan anda." },
      { n: "3", t: "Juruteknik tiba", d: "Juruteknik HVAC terlatih tiba tepat pada masanya dengan alatan dan bahagian yang betul." },
      { n: "4", t: "Servis & serah terima", d: "Kami servis, uji dan terangkan kerja — dengan harga disahkan terlebih dahulu." },
    ],
    what_badge: "Apa yang kami servis berdekatan anda",
    what_h2: "Servis aircond untuk setiap rumah & perniagaan",
    what_desc: "Dari unit bilik tidur tunggal hingga deretan kedai, pasukan pakar HVAC kami mengendalikan semuanya — dengan penjagaan tulen dan harga telus pada setiap lawatan.",
    what_list: [
      "Unit berpisah dinding (rumah & kondominium)",
      "Unit ceiling cassette (kedai, pejabat, komersial)",
      "Unit tingkap (rumah kompak & bilik servis)",
      "Cuci kimia bertekanan, overhaul kimia & tambah gas",
      "Penyelesaian masalah, pembaikan, PCB & kerja penyampuk",
      "Pemasangan baru & bongkar / pindah",
    ],
    what_btn: "Lihat semua perkhidmatan aircond",
    areas_badge: "Kawasan yang kami liputi berdekatan anda",
    areas_h2: "Kami menyervis seluruh Kuala Lumpur & Selangor",
    areas_desc: "Di mana sahaja anda berada di Lembah Klang, ada juruteknik KL Renovator berdekatan.",
    areas_btn: "Lihat semua 40 kawasan servis",
    intent_badge: "Dispatch pantas · Panduan kawasan",
    intent_h3: "Bila guna halaman ini dan bila pilih kawasan anda",
    intent_desc: "Gunakan halaman ini jika anda perlukan juruteknik aircond berdekatan dengan cepat di Kuala Lumpur atau Selangor. Jika anda mahu maklumat untuk bandar tertentu—seperti isu air menitis biasa, akses kondominium atau anggaran harga setempat—pilih halaman kawasan anda di bawah.",
    faq_badge: "Soalan yang kerap ditanya",
    faq_h2: "Servis aircond berdekatan — soalan biasa",
    faqs: [
      { q: "Bagaimana saya mencari juruteknik aircond yang dipercayai berdekatan saya?", a: "WhatsApp KL Renovator di +60182983573 dengan kawasan dan masalah anda — kami padankan anda dengan slot terdekat yang tersedia dan juruteknik HVAC terlatih." },
      { q: "Adakah anda menawarkan servis aircond hari sama berdekatan saya?", a: "Ya — slot hari sama kerap tersedia di seluruh KL & Selangor. Untuk peluang terbaik, WhatsApp kami awal pagi dengan lokasi dan isu anda." },
      { q: "Berapa harga servis aircond berdekatan saya?", a: "Servis asas dari RM 99, cuci kimia bertekanan dari RM 120 (1.0–1.5 HP dinding), overhaul kimia dari RM 220, dan tambah gas dari RM 120 (R22, R410A atau R32). Setiap harga disahkan sebelum kerja bermula." },
      { q: "Kawasan mana di KL & Selangor yang anda liputi?", a: "Kami meliputi seluruh Lembah Klang — Kuala Lumpur, Petaling Jaya, Cheras, Shah Alam, Subang Jaya, Puchong, Klang, Ampang, Kajang, Setia Alam, Bangsar, Mont Kiara, Kepong, Sri Petaling, Bukit Jalil, Putrajaya, Cyberjaya dan 30+ kawasan lagi." },
      { q: "Jenama aircond mana yang anda servis berdekatan saya?", a: "Semua jenama utama — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL dan Isonic." },
      { q: "Adakah terdapat caj keluar atau perjalanan?", a: "Tiada caj keluar tersembunyi — harga adalah telus dan disebut terlebih dahulu berdasarkan perkhidmatan dan jenis unit." },
    ],
    cta_h2: "Perlukan juruteknik aircond berdekatan anda hari ini?",
    cta_desc: "WhatsApp KL Renovator sekarang dengan kawasan dan masalah anda — kami akan padankan anda dengan slot terdekat yang tersedia. Temujanji hari sama tersedia di seluruh KL & Selangor.",
    cta_wa: "WhatsApp +60182983573",
  },
  zh: {
    breadcrumb: "附近冷气服务",
    badge: "本地冷气服务 · 吉隆坡及雪兰莪",
    h1: "附近冷气服务 — 吉隆坡及雪兰莪",
    hero_desc: "寻找附近可靠的冷气技术员？KL Renovator 在吉隆坡和雪兰莪全区派遣专业HVAC技术人员——当天预约、透明收费、覆盖所有品牌。已获500+住户和企业信赖。",
    hero_wa: "WhatsApp 预约当天服务",
    hero_call: "致电",
    hero_hours: "周一至周日 上午9时–下午6时 · WhatsApp 30分钟内回复",
    why_badge: "为何选择本地冷气团队",
    why_h2: "附近快速、本地、透明的冷气服务",
    features: [
      { t: "当天响应", d: "技术员分布在KL及雪兰莪各地，出行时间更短，当天预约名额更多。" },
      { t: "熟悉本地建筑", d: "我们定期服务高层公寓、有地住宅、店屋和办公室，并遵守各建筑的进入程序。" },
      { t: "透明收费", d: "每项工作开始前先报价。无隐藏上门费，无意外收费。" },
      { t: "覆盖所有品牌及类型", d: "挂壁式、天花板卡式机和窗式机——变频和非变频，全部20个主要品牌。" },
      { t: "1个月工艺保修", d: "每项服务和维修均附我们的工艺保修，让您放心。" },
      { t: "500+满意客户", d: "获巴生谷各地住户和企业信赖，提供诚实可靠的冷气服务。" },
    ],
    how_badge: "服务流程",
    how_h2: "4个简单步骤获得附近冷气技术员上门服务",
    steps: [
      { n: "1", t: "WhatsApp或致电我们", d: "发送您的地区、机型和问题。我们30分钟内回复。" },
      { n: "2", t: "我们匹配最近的预约", d: "我们确认适合您的当天或次日预约。" },
      { n: "3", t: "技术员上门", d: "训练有素的HVAC技术员准时携带合适工具和零件上门。" },
      { n: "4", t: "服务及交接", d: "我们服务、测试并解释工作内容——价格事先确认。" },
    ],
    what_badge: "我们在附近提供的服务",
    what_h2: "适合每个家庭和企业的冷气服务",
    what_desc: "从单间卧室的机组到一排店屋，我们的HVAC专家团队全部处理——每次上门都以真诚态度和透明收费服务。",
    what_list: [
      "挂壁式分体机（住宅及公寓）",
      "天花板卡式机（店屋、办公室、商业）",
      "窗式机（紧凑型住宅及服务室）",
      "加压化学清洗、化学大修及充冷媒",
      "故障排除、维修、电路板及压缩机工作",
      "新安装及拆卸/迁移",
    ],
    what_btn: "查看所有冷气服务",
    areas_badge: "我们覆盖的附近地区",
    areas_h2: "我们服务整个吉隆坡及雪兰莪",
    areas_desc: "无论您在巴生谷哪里，附近都有KL Renovator技术员。",
    areas_btn: "查看全部40个服务地区",
    intent_badge: "快速本地派工 · 区域服务指南",
    intent_h3: "何时使用此页面，何时选择您的区域",
    intent_desc: "如果您需要吉隆坡或雪兰莪附近的冷气技术员，可使用此页面快速预约。若您想查看特定城镇资料，例如常见漏水问题、公寓出入规则或本地收费说明，请在下方选择您的区域页面。",
    faq_badge: "常见问题",
    faq_h2: "附近冷气服务 — 常见问题",
    faqs: [
      { q: "如何在附近找到可靠的冷气技术员？", a: "WhatsApp KL Renovator至+60182983573，告知您的地区和问题——我们为您匹配最近的可用档期和训练有素的HVAC技术员。覆盖吉隆坡和雪兰莪全区。" },
      { q: "您在附近提供当天冷气服务吗？", a: "是的——KL及雪兰莪全区经常有当天名额。为获得最佳机会，请尽早在当天通过WhatsApp告知我们您的位置和问题。" },
      { q: "附近冷气服务费用是多少？", a: "基本保养从RM 99起，加压化学清洗从RM 120起（1.0–1.5 HP挂壁式），化学大修从RM 220起，充冷媒从RM 120起（R22、R410A或R32）。所有价格在开工前确认——无隐藏费用。" },
      { q: "您覆盖KL及雪兰莪哪些地区？", a: "我们覆盖整个巴生谷——吉隆坡、白蒲、茨厂街、沙阿南、梳邦再也、蒲种、巴生、安邦、加影、武吉免登、蒙基亚拉、葛冬及30+个地区。" },
      { q: "您在附近服务哪些冷气品牌？", a: "所有主要品牌——大金、松下、三菱、约克、爱信、开利、美的、海尔、东芝、日立、三星、LG、夏普、富士通、格力、National、海信、Aux、TCL及Isonic。" },
      { q: "有上门费或交通费吗？", a: "无隐藏上门费——收费透明，根据服务和机型事先报价。技术员开工前您始终知道价格。" },
    ],
    cta_h2: "今天需要附近的冷气技术员？",
    cta_desc: "立即WhatsApp KL Renovator告知您的地区和问题——我们将为您匹配最近的可用档期。KL及雪兰莪全区提供当天预约。",
    cta_wa: "WhatsApp +60182983573",
  },
};

const workPhotos = [
  { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: "KL Renovator technician servicing an aircond unit in Klang Valley" },
  { src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp", alt: "Pressure chemical wash being carried out on an aircond unit in Kepong, KL" },
  { src: "/hero/aircond-installation-wall-mounted-kl.webp", alt: "Wall-mounted aircond installation by KL Renovator in Kuala Lumpur" },
];

export default function NearMeClient({ initialLang }: { initialLang?: "en" | "ms" | "zh" } = {}) {
  const { lang: ctxLang } = useLang();
  const lang = initialLang || ctxLang;
  const tx = T[lang];
  const prefix = lang === "en" ? "" : `/${lang}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href={prefix || "/"} className="hover:text-sky-600 transition">
              {lang === "en" ? "Home" : lang === "ms" ? "Utama" : "首页"}
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-700 font-medium">{tx.breadcrumb}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-sky-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sky-300 text-xs font-black uppercase tracking-widest mb-3">{tx.badge}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{tx.h1}</h1>
            <p className="mt-4 text-lg text-slate-200 leading-relaxed">{tx.hero_desc}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(rfqMsg)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284c7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-900/40 transition hover:bg-[#0369a1]"
              >
                <FaWhatsapp className="h-5 w-5" />
                {tx.hero_wa}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                <FaPhone className="h-5 w-5" />
                {tx.hero_call} {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <FiClock className="h-4 w-4 text-sky-300" />
              {tx.hero_hours}
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tx.why_badge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{tx.why_h2}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tx.features.map((f) => (
              <div key={f.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{f.t}</h3>
                    <p className="mt-1 text-sm text-slate-600">{f.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-18 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tx.how_badge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{tx.how_h2}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tx.steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-black text-white">{s.n}</span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we service */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tx.what_badge}</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{tx.what_h2}</h2>
              <p className="mt-4 text-slate-600">{tx.what_desc}</p>
              <ul className="mt-6 space-y-3">
                {tx.what_list.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <NextLink
                href={`${prefix}/services`}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0284c7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0369a1]"
              >
                {tx.what_btn}
                <FiChevronRight className="h-4 w-4" />
              </NextLink>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {workPhotos.map((p, i) => (
                <div
                  key={p.src}
                  className={`relative overflow-hidden rounded-2xl border border-slate-200 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <Image src={p.src} alt={p.alt} fill loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas Aggregator Hub Grid */}
      <section className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2 text-sky-700">
              <FiMapPin className="h-5 w-5" />
              <p className="text-xs font-black uppercase tracking-widest text-sky-600">{tx.areas_badge}</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{tx.areas_h2}</h2>
            <p className="mt-2 text-slate-600">{tx.areas_desc}</p>
          </Reveal>

          {/* Intent Separation Callout Box */}
          <div className="mt-6 mb-8 rounded-2xl border border-sky-200 bg-sky-50/80 p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-sky-700 mb-1">{tx.intent_badge}</p>
            <h3 className="text-base font-black text-slate-900">{tx.intent_h3}</h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">{tx.intent_desc}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {siteConfig.areaPages.map((area) => (
              <NextLink
                key={area.slug}
                href={`${prefix}/areas/${area.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:border-sky-400 hover:bg-sky-50 hover:shadow transition-all"
              >
                <div className="flex items-center gap-2">
                  <FiMapPin className="h-3.5 w-3.5 text-sky-500 shrink-0 group-hover:text-sky-600" />
                  <span className="font-bold text-slate-900 text-xs truncate group-hover:text-sky-800">{area.name}</span>
                </div>
                <span className="mt-2 text-[10px] font-semibold text-slate-400 group-hover:text-sky-600 uppercase tracking-wider">
                  {area.state} →
                </span>
              </NextLink>
            ))}
          </div>

          <NextLink
            href={`${prefix}/areas`}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0284c7] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0369a1]"
          >
            {tx.areas_btn}
            <FiChevronRight className="h-4 w-4" />
          </NextLink>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-18 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tx.faq_badge}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{tx.faq_h2}</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {tx.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-900 py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white">{tx.cta_h2}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">{tx.cta_desc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink(rfqMsg)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-700 shadow-lg transition hover:bg-slate-100"
            >
              <FaWhatsapp className="h-5 w-5" />
              {tx.cta_wa}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20"
            >
              <FaPhone className="h-5 w-5" />
              {tx.hero_call} {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
