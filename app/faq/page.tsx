"use client";

import { useState } from "react";
import { FaWhatsapp, FaChevronDown } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { ReadyToBook } from "@/components/sections/ready-to-book";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { useLang } from "@/context/language-context";


// ─── FAQ DATA — All 3 Languages ──────────────────────────────────────────────
const FAQS = {
  en: [
    {
      category: "pricing",
      q: "How much does a chemical wash cost?",
      a: "Chemical wash starts from RM 120 for a 1.0–1.5 HP wall-mounted unit. Prices vary by unit type and HP size. Check our full price list on the Services page.",
    },
    {
      category: "pricing",
      q: "Are there any hidden charges?",
      a: "No hidden charges at all. We provide a full quote before starting any work. Extra materials (copper pipe, brackets) are quoted and approved by you on-site before installation.",
    },
    {
      category: "pricing",
      q: "What is your emergency / after-hours rate?",
      a: "Standard hours are 9:00 AM to 6:00 PM. Jobs booked between 6:00 PM and 10:00 PM carry an overtime surcharge of RM 50.",
    },
    {
      category: "pricing",
      q: "Do you offer volume discounts?",
      a: "Yes! 2–3 units: 5% off. 4–8 units: 10% off. 8+ units: 15% off. Discounts apply to labour charges. WhatsApp us to confirm.",
    },
    {
      category: "service",
      q: "What is the difference between chemical wash and chemical overhaul?",
      a: "A chemical wash cleans the unit while it stays mounted on the wall — great for regular maintenance. A chemical overhaul fully dismantles the unit for a deep clean of every internal component — recommended for water leaking, ice formation, or units not serviced in 3+ years.",
    },
    {
      category: "service",
      q: "How often should I service my aircond?",
      a: "For light use (evenings only), service every 6 months. For heavy use (8+ hours daily), every 3 months. A chemical wash is recommended annually regardless of usage.",
    },
    {
      category: "service",
      q: "My aircond is running but not cold. What's wrong?",
      a: "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. Our technicians diagnose the exact issue and quote you before any repair starts. Diagnostic fee is RM 88 (waived if repair is done).",
    },
    {
      category: "service",
      q: "My aircond is leaking water. What should I do?",
      a: "Switch off the unit if leaking heavily to prevent damage. The most common cause is a blocked drain pipe — usually fixed with a basic service. If severe (heavy leaking, ice forming), a chemical overhaul may be needed.",
    },
    {
      category: "service",
      q: "What gas type does my aircond use?",
      a: "Check the sticker on your outdoor unit — it states the gas type (R22, R410A, or R32). Or WhatsApp us a photo of the outdoor unit sticker and we'll identify it for you.",
    },
    {
      category: "service",
      q: "Do you do commercial and office aircond servicing?",
      a: "Yes, we handle commercial ceiling cassette units, VRF/VRV systems, ducted systems, and large-capacity commercial units. We also offer annual maintenance contracts for offices and commercial properties.",
    },
    {
      category: "booking",
      q: "How do I book a service?",
      a: "The fastest way is via WhatsApp at +60 18-298 3573. Tell us your unit type, area, and the issue — we'll confirm availability and pricing within 30 minutes.",
    },
    {
      category: "booking",
      q: "Do you offer same-day service?",
      a: "Yes, same-day appointments are available subject to technician availability. WhatsApp us early in the morning for the best chance of a same-day slot.",
    },
    {
      category: "trust",
      q: "Is there a warranty on your work?",
      a: "Yes. All workmanship carries a 1-month warranty. Parts and components replaced by us are covered under the respective manufacturer's warranty.",
    },
    {
      category: "trust",
      q: "What areas do you cover?",
      a: "We cover the entire Klang Valley — all areas of Kuala Lumpur and Selangor including Ampang, Batu Caves, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Putrajaya, and Cyberjaya.",
    },
    {
      category: "trust",
      q: "What brands do you service?",
      a: "We service all major brands including Daikin, Panasonic, Mitsubishi, York, Midea, LG, and Samsung. If your brand isn't listed, WhatsApp us — we likely service it.",
    },
  ],
  ms: [
    {
      category: "pricing",
      q: "Berapa harga cuci kimia (chemical wash)?",
      a: "Cuci kimia bermula dari RM 120 untuk unit dinding 1.0–1.5 HP. Harga bergantung kepada jenis dan saiz HP unit. Semak senarai harga penuh di halaman Perkhidmatan kami.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat caj tersembunyi?",
      a: "Tiada caj tersembunyi sama sekali. Kami berikan sebut harga penuh sebelum memulakan sebarang kerja. Bahan tambahan (paip tembaga, pendakap) akan dinyatakan dan diluluskan oleh anda terlebih dahulu.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat kadar lebih masa?",
      a: "Waktu standard ialah 9:00 PG hingga 6:00 PTG. Kerja yang ditempah antara 6:00 PTG – 10:00 malam akan dikenakan tambahan RM 50.",
    },
    {
      category: "pricing",
      q: "Adakah terdapat diskaun untuk banyak unit?",
      a: "Ya! 2–3 unit: diskaun 5%. 4–8 unit: diskaun 10%. 8+ unit: diskaun 15%. Diskaun terpakai untuk caj buruh. WhatsApp kami untuk pengesahan.",
    },
    {
      category: "service",
      q: "Apa beza cuci kimia dan overhaul kimia?",
      a: "Cuci kimia membersihkan unit di tempat ia terpasang — sesuai untuk penyelenggaraan biasa. Overhaul kimia menanggalkan unit sepenuhnya untuk pembersihan mendalam setiap komponen — disyorkan untuk kebocoran air, pembentukan ais, atau unit yang tidak diservis lebih 3 tahun.",
    },
    {
      category: "service",
      q: "Berapa kerap saya perlu servis aircond?",
      a: "Penggunaan ringan (waktu malam sahaja): setiap 6 bulan. Penggunaan berat (8+ jam sehari): setiap 3 bulan. Cuci kimia disyorkan setiap tahun.",
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
      a: "Ya, temujanji hari sama tersedia bergantung kepada ketersediaan juruteknik. WhatsApp kami awal pagi untuk peluang terbaik mendapat slot hari sama.",
    },
    {
      category: "trust",
      q: "Adakah terdapat waranti untuk kerja anda?",
      a: "Ya. Semua kerja buruh dilindungi waranti 1 bulan. Komponen yang diganti oleh kami dilindungi di bawah waranti pengilang.",
    },
    {
      category: "trust",
      q: "Kawasan mana yang anda liputi?",
      a: "Kami meliputi seluruh Lembah Klang — semua kawasan Kuala Lumpur dan Selangor termasuk Ampang, Batu Caves, Cheras, Petaling Jaya, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, dan Cyberjaya.",
    },
    {
      category: "trust",
      q: "Jenama apa yang anda servis?",
      a: "Kami servis semua jenama utama termasuk Daikin, Panasonic, Mitsubishi, York, Midea, LG, dan Samsung. Jika jenama anda tidak disenaraikan, WhatsApp kami — kami mungkin servisnya.",
    },
  ],
  zh: [
    {
      category: "pricing",
      q: "化学清洗（Chemical Wash）费用是多少？",
      a: "化学清洗起价 RM 120，适用于 1.0–1.5 HP 壁挂式冷气机。价格因机型和匹数而异。请查阅服务页面的完整价格表。",
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
      a: "化学清洗是在机器安装状态下进行清洗，适合定期保养。化学大修是将室内机完全拆卸进行深层清洁，适合严重漏水、结冰或超过 3 年未保养的机器。",
    },
    {
      category: "service",
      q: "冷气机应该多久保养一次？",
      a: "轻度使用（晚间使用）：每 6 个月一次。重度使用（每天 8 小时以上）：每 3 个月一次。无论使用频率如何，建议每年进行一次化学清洗。",
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
      a: "是的。所有工艺提供 1 个月保固。我们更换的零件受制造商保固保障。",
    },
    {
      category: "trust",
      q: "服务范围覆盖哪些地区？",
      a: "我们覆盖整个巴生谷地区——包括吉隆坡及雪兰莪所有地区，如安邦、蕉赖、八打灵再也、梳邦再也、普城、沙阿南、白沙罗、巴生、加影、孟沙、满家乐及布城等。",
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

// ─── Single FAQ Item ──────────────────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const { lang, setLang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");

  const currentLang = (lang === "en" || lang === "ms" || lang === "zh") ? lang : "en";
  const faqs = FAQS[currentLang];

  const filtered = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.en.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              Knowledge Base
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white max-w-2xl leading-[1.05]">
              Frequently Asked <span className="text-sky-400">Questions</span>
            </h1>
            <p className="mt-5 text-slate-400 font-medium max-w-xl leading-relaxed">
              Quick honest answers about our aircon services, pricing, warranty, and coverage areas — in English, Bahasa Malaysia, and Chinese.
            </p>
            {/* Language tabs — clickable, connected to lang context */}
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
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
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

          {/* Count */}
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

          {/* Still have questions CTA */}
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
                className="inline-flex items-center gap-2.5 mt-6 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
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
