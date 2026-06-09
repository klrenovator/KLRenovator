"use client";

import { useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaChevronDown } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";

// ─── FAQ DATA — All 3 Languages ──────────────────────────────────────────────
// IMPORTANT: All prices synced with site.ts and services-data.ts (June 2026)
const FAQS = {
  en: [
    {
      category: "pricing",
      q: "How much does a chemical wash cost in KL & Selangor?",
      a: "Chemical wash starts from RM 120 for a standard 1.0–1.5 HP wall-mounted unit. Ceiling cassette starts from RM 220. Prices vary by unit type and HP size. All prices confirmed before work begins — no hidden charges.",
    },
    {
      category: "pricing",
      q: "Are there any hidden charges?",
      a: "No hidden charges at all. We provide a full quote before starting any work. Extra materials (copper pipe, brackets, casing) are quoted and approved by you on-site before installation.",
    },
    {
      category: "pricing",
      q: "What is your emergency / after-hours rate?",
      a: "Standard hours are 9:00 AM to 6:00 PM daily. Jobs booked between 6:00 PM and 10:00 PM carry a mandatory overtime surcharge of RM 50. Total after-hours diagnostic fee is RM 138.",
    },
    {
      category: "pricing",
      q: "Do you offer volume discounts?",
      a: "Yes! 2–3 units: 5% off. 4–8 units: 10% off. 8+ units: 15% off. Discounts apply to labour charges. WhatsApp us to confirm.",
    },
    {
      category: "pricing",
      q: "How much does gas top-up cost?",
      a: "R22 gas top-up starts from RM 120. R410A from RM 150. R32 from RM 180. Price depends on unit HP size. Leak check is included with every gas top-up.",
    },
    {
      category: "service",
      q: "What is the difference between chemical wash and chemical overhaul?",
      a: "A chemical wash (from RM 120) cleans the unit while it stays mounted on the wall — great for regular maintenance. A chemical overhaul (from RM 220) fully dismantles the unit for a deep clean of every internal component — recommended for water leaking, ice formation, or units not serviced in 3+ years.",
    },
    {
      category: "service",
      q: "How often should I service my aircond in Malaysia?",
      a: "For light use (evenings only), service every 6 months. For heavy use (8+ hours daily), every 3 months. A chemical wash is recommended annually regardless of usage. Malaysia's humidity means units accumulate dirt faster than in temperate countries.",
    },
    {
      category: "service",
      q: "My aircond is running but not cold. What's wrong?",
      a: "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. Our technicians diagnose the exact issue and quote you before any repair starts. Diagnostic fee is RM 88 (waived if repair is done on the same visit).",
    },
    {
      category: "service",
      q: "My aircond is leaking water. What should I do?",
      a: "Switch off the unit if leaking heavily to prevent damage. The most common cause is a blocked drain pipe — usually fixed with a basic service or chemical wash. If leaking continues after a wash, a chemical overhaul is needed to clean the drain pan and internal channels properly.",
    },
    {
      category: "service",
      q: "What gas type does my aircond use?",
      a: "Check the sticker on your outdoor unit — it states the gas type (R22, R410A, or R32). Or WhatsApp us a photo of the outdoor unit sticker and we'll identify it for you.",
    },
    {
      category: "service",
      q: "Do you do commercial and office aircond servicing?",
      a: "Yes, we handle commercial ceiling cassette units, VRF/VRV multi-split systems, and large-capacity commercial units. We also offer annual maintenance contracts for offices and commercial properties.",
    },
    {
      category: "booking",
      q: "How do I book a service?",
      a: "The fastest way is via WhatsApp at +60 18-298 3573. Tell us your unit type (HP and brand), area, and the issue. We'll confirm availability and pricing within 30 minutes.",
    },
    {
      category: "booking",
      q: "Do you offer same-day service?",
      a: "Yes, same-day appointments are available subject to technician availability. WhatsApp us early in the morning for the best chance of a same-day slot across KL and Selangor.",
    },
    {
      category: "trust",
      q: "Is there a warranty on your work?",
      a: "Yes. All workmanship carries a 1-month warranty. Replaced parts carry a 3-month warranty. If any related issue arises within the warranty period, we return and inspect at no charge.",
    },
    {
      category: "trust",
      q: "What areas does KL Renovator cover?",
      a: "We cover the entire Klang Valley — all areas of Kuala Lumpur and Selangor including Petaling Jaya, Ampang, Batu Caves, Cheras, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Selayang, Putrajaya, and Cyberjaya.",
    },
    {
      category: "trust",
      q: "What brands do you service?",
      a: "We service all major brands including Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp, Toshiba and Haier. All inverter and non-inverter models. If your brand isn't listed, WhatsApp us — we likely service it.",
    },
  ],
  ms: [
    {
      category: "pricing",
      q: "Berapa harga cuci kimia (chemical wash) di KL & Selangor?",
      a: "Cuci kimia bermula dari RM 120 untuk unit dinding 1.0–1.5 HP. Ceiling cassette bermula RM 220. Harga bergantung kepada jenis dan saiz HP unit. Semua harga disahkan sebelum kerja bermula — tiada caj tersembunyi.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat caj tersembunyi?",
      a: "Tiada caj tersembunyi sama sekali. Kami berikan sebut harga penuh sebelum memulakan sebarang kerja. Bahan tambahan (paip tembaga, pendakap) akan dinyatakan dan diluluskan oleh anda terlebih dahulu.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat kadar lebih masa?",
      a: "Waktu standard ialah 9:00 PG hingga 6:00 PTG setiap hari. Kerja yang ditempah antara 6:00 PTG – 10:00 malam akan dikenakan tambahan wajib RM 50. Jumlah yuran diagnosis luar waktu ialah RM 138.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat diskaun untuk banyak unit?",
      a: "Ya! 2–3 unit: diskaun 5%. 4–8 unit: diskaun 10%. 8+ unit: diskaun 15%. Diskaun terpakai untuk caj buruh. WhatsApp kami untuk pengesahan.",
    },
    {
      category: "service",
      q: "Apa beza cuci kimia dan overhaul kimia?",
      a: "Cuci kimia (dari RM 120) membersihkan unit di tempat ia terpasang — sesuai untuk penyelenggaraan biasa. Overhaul kimia (dari RM 220) menanggalkan unit sepenuhnya untuk pembersihan mendalam setiap komponen — disyorkan untuk kebocoran air, pembentukan ais, atau unit yang tidak diservis lebih 3 tahun.",
    },
    {
      category: "service",
      q: "Berapa kerap saya perlu servis aircond di Malaysia?",
      a: "Penggunaan ringan (waktu malam sahaja): setiap 6 bulan. Penggunaan berat (8+ jam sehari): setiap 3 bulan. Cuci kimia disyorkan setiap tahun kerana kelembapan tinggi di Malaysia menyebabkan unit kotor lebih cepat.",
    },
    {
      category: "service",
      q: "Aircond saya beroperasi tetapi tidak sejuk. Apa masalahnya?",
      a: "Punca paling biasa ialah gas rendah, gegelung penyejat kotor, atau kapasitor rosak. Juruteknik kami akan mendiagnosis masalah dan memberikan sebut harga sebelum memulakan pembaikan. Yuran diagnosis RM 88 (dikecualikan jika pembaikan dilakukan).",
    },
    {
      category: "booking",
      q: "Bagaimana cara menempah servis?",
      a: "Cara paling pantas ialah melalui WhatsApp di +60 18-298 3573. Beritahu kami jenis unit, kawasan, dan masalah anda — kami akan mengesahkan ketersediaan dan harga dalam masa 30 minit.",
    },
    {
      category: "booking",
      q: "Adakah servis hari sama tersedia?",
      a: "Ya, temujanji hari sama tersedia bergantung kepada ketersediaan juruteknik. WhatsApp kami awal pagi untuk peluang terbaik mendapat slot hari sama merentasi KL dan Selangor.",
    },
    {
      category: "trust",
      q: "Adakah terdapat waranti untuk kerja anda?",
      a: "Ya. Semua kerja buruh dilindungi waranti 1 bulan. Komponen yang diganti dilindungi waranti 3 bulan. Jika masalah berkaitan timbul dalam tempoh waranti, kami akan kembali dan memeriksa tanpa sebarang bayaran.",
    },
    {
      category: "trust",
      q: "Kawasan mana yang KL Renovator liputi?",
      a: "Kami meliputi seluruh Lembah Klang — semua kawasan Kuala Lumpur dan Selangor termasuk Petaling Jaya, Ampang, Batu Caves, Cheras, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Selayang, Putrajaya dan Cyberjaya.",
    },
    {
      category: "trust",
      q: "Jenama apa yang anda servis?",
      a: "Kami servis semua jenama utama termasuk Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp dan Haier. Jika jenama anda tidak disenaraikan, WhatsApp kami.",
    },
  ],
  zh: [
    {
      category: "pricing",
      q: "KL & 雪兰莪化学清洗（Chemical Wash）费用是多少？",
      a: "化学清洗起价 RM 120，适用于 1.0–1.5 HP 壁挂式冷气机。天花板卡式机起价 RM 220。价格因机型和匹数而异。所有价格在开工前确认——没有隐藏收费。",
    },
    {
      category: "pricing",
      q: "是否有隐藏收费？",
      a: "绝对没有隐藏收费。我们在开工前提供完整报价。额外材料（铜管、支架）会在现场告知您并获得批准后才进行。",
    },
    {
      category: "pricing",
      q: "是否有多台优惠？",
      a: "有！2–3 台：九五折。4–8 台：九折。8 台以上：八五折。折扣适用于人工费用。请通过 WhatsApp 联系我们确认。",
    },
    {
      category: "service",
      q: "化学清洗和化学大修（Chemical Overhaul）有什么区别？",
      a: "化学清洗（起价 RM 120）是在机器安装状态下进行清洗，适合定期保养。化学大修（起价 RM 220）是将室内机完全拆卸进行深层清洁，适合严重漏水、结冰或超过 3 年未保养的机器。",
    },
    {
      category: "service",
      q: "冷气机应该多久保养一次？",
      a: "轻度使用（晚间使用）：每 6 个月一次。重度使用（每天 8 小时以上）：每 3 个月一次。无论使用频率如何，建议每年进行一次化学清洗。马来西亚湿度高，冷气机积尘更快。",
    },
    {
      category: "service",
      q: "冷气机开着但不冷，是什么原因？",
      a: "最常见原因是冷媒不足、蒸发器线圈脏污或电容器故障。我们的技术员会现场诊断并报价后才开始维修。诊断费 RM 88（若进行维修则豁免）。",
    },
    {
      category: "booking",
      q: "如何预约服务？",
      a: "最快的方式是通过 WhatsApp 联系 +60 18-298 3573。告诉我们您的机型、地区和问题，我们将在 30 分钟内确认服务时间和价格。",
    },
    {
      category: "booking",
      q: "是否提供当天服务？",
      a: "是的，视技术员档期而定，可提供当天服务。请尽早通过 WhatsApp 联系我们，以获得当天时段的最大机会。",
    },
    {
      category: "trust",
      q: "服务是否有保固？",
      a: "是的。所有工艺提供 1 个月保固，更换零件提供 3 个月保固。保固期内如有相关问题，我们免费上门检查。",
    },
    {
      category: "trust",
      q: "服务范围覆盖哪些地区？",
      a: "我们覆盖整个巴生谷地区——包括吉隆坡及雪兰莪所有地区，如八打灵再也、安邦、蕉赖、梳邦再也、普城、沙阿南、白沙罗、巴生、加影、孟沙、满家乐、武吉洞、万宜及布城等。",
    },
    {
      category: "trust",
      q: "你们维修哪些品牌？",
      a: "我们服务所有主要品牌，包括大金（Daikin）、松下（Panasonic）、三菱（Mitsubishi）、约克（York）、美的（Midea）、LG 及三星（Samsung）。如您的品牌不在列表中，请 WhatsApp 我们询问。",
    },
  ],
};

const CATEGORIES = [
  { key: "all", label: { en: "All Questions", ms: "Semua Soalan", zh: "全部问题" } },
  { key: "pricing", label: { en: "Pricing", ms: "Harga", zh: "价格" } },
  { key: "service", label: { en: "Services", ms: "Perkhidmatan", zh: "服务" } },
  { key: "booking", label: { en: "Booking", ms: "Tempahan", zh: "预约" } },
  { key: "trust", label: { en: "Trust & Areas", ms: "Kawasan & Waranti", zh: "保障与覆盖范围" } },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`text-sm sm:text-base font-black tracking-tight transition-colors ${open ? "text-sky-600" : "text-slate-900 group-hover:text-sky-600"}`}>
          {q}
        </span>
        <FaChevronDown className={`h-4 w-4 shrink-0 mt-1 text-slate-400 transition-all duration-200 ${open ? "rotate-180 text-sky-500" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <p className="text-sm text-slate-600 font-medium leading-relaxed pr-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const { lang, setLang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");

  const currentLang = (lang === "en" || lang === "ms" || lang === "zh") ? lang : "en";
  const faqs = FAQS[currentLang];

  const filtered = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* Hero — White + watermark */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/hero/Gas Top up 2026-05-03 at 13.39.30.jpeg"
            alt="HVAC technician servicing aircond unit KL Selangor"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              Knowledge Base
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-slate-900 max-w-2xl leading-[1.05]">
              Frequently Asked <span className="text-sky-500">Questions</span>
            </h1>
            <p className="mt-5 text-slate-600 font-medium max-w-xl leading-relaxed">
              Quick honest answers about our aircon services, pricing, warranty, and coverage areas in KL & Selangor — in English, Bahasa Malaysia, and Chinese.
            </p>
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">FAQ available in:</span>
              {([
                { code: "en" as const, flag: "🇬🇧", label: "English" },
                { code: "ms" as const, flag: "🇲🇾", label: "Bahasa Malaysia" },
                { code: "zh" as const, flag: "🇨🇳", label: "中文" },
              ]).map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    lang === opt.code
                      ? "bg-sky-500 border-sky-400 text-white shadow-sm"
                      : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-100 sticky top-[80px] z-30 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat.label[currentLang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            {filtered.length} questions
          </p>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 sm:px-8 divide-y divide-slate-100">
            {filtered.map((faq, i) => (
              <Reveal key={i} delay={i * 20}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 bg-[#0284c7] text-white rounded-2xl p-8 text-center">
              <p className="text-2xl mb-1">💬</p>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Still have a question?
              </h2>
              <p className="mt-2 text-sky-100 font-medium text-sm">
                WhatsApp us — our technicians reply within 30 minutes.
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> Ask Us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ReadyToBook />
    </>
  );
}
