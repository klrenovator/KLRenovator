import { FiChevronRight, FiClock, FiMapPin, FiShield } from "react-icons/fi";

/**
 * Shared "what to expect" support block for the conversion pages (/book,
 * /contact) — issue #69, thin-content fix.
 *
 * These pages must keep their form above the fold, so this block sits BELOW
 * it: real service-area coverage, response-time expectations and a short,
 * page-appropriate FAQ (with FAQPage schema). Authored EN/MS/ZH — not
 * machine-mirrored. No review-count claim, no rating.
 */

type Locale = "en" | "ms" | "zh";

const COPY: Record<
  Locale,
  {
    heading: string;
    coverage: { title: string; body: string };
    response: { title: string; body: string };
    warranty: { title: string; body: string };
    faqHeading: string;
    faqs: { q: string; a: string }[];
  }
> = {
  en: {
    heading: "What to expect after you book",
    coverage: {
      title: "Where we cover",
      body: "KL Renovator serves the whole of Kuala Lumpur and Selangor — Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras, Ampang, Klang, Kepong, Rawang and every neighbourhood in between. If you are inside the Klang Valley, we can reach you.",
    },
    response: {
      title: "How fast we reply",
      body: "WhatsApp is the fastest way to reach us and is usually answered within business hours the same day. Same-day and next-day slots are often available; tell us your area and preferred time and we will confirm the nearest slot and a firm price before any work begins.",
    },
    warranty: {
      title: "Price & warranty, confirmed upfront",
      body: "Every job is quoted from our published price list before we start — basic service from RM 99, chemical wash from RM 120, installation from RM 199 — and covered by a 1-month workmanship warranty. No deposit to book, no surprise charges on the day.",
    },
    faqHeading: "Booking FAQs",
    faqs: [
      { q: "Do I need to pay a deposit to book?", a: "No. Booking is free and requires no deposit. You confirm the service and time, we confirm the price, and you pay only after the work is done and you are satisfied." },
      { q: "Can I get same-day aircond service?", a: "Often yes, depending on your area and the time you contact us. Same-day and next-day slots are common across KL & Selangor — WhatsApp us your location and we will confirm the nearest available slot." },
      { q: "Will the price be confirmed before work starts?", a: "Yes. We quote from our published price list and confirm the full price with you before any work begins. Extra materials, if any, are shown and approved on site first." },
      { q: "Which brands do you service?", a: "All 20 major aircond brands — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Acson, Sharp, Hisense, TCL and more — for servicing, chemical wash, repair and installation." },
    ],
  },
  ms: {
    heading: "Apa yang boleh dijangka selepas anda tempah",
    coverage: {
      title: "Kawasan liputan kami",
      body: "KL Renovator melayani seluruh Kuala Lumpur dan Selangor — Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras, Ampang, Klang, Kepong, Rawang dan setiap kejiranan di antaranya. Jika anda di dalam Lembah Klang, kami boleh sampai kepada anda.",
    },
    response: {
      title: "Berapa pantas kami balas",
      body: "WhatsApp ialah cara terpantas menghubungi kami dan biasanya dibalas dalam waktu perniagaan pada hari yang sama. Slot hari sama dan hari esok selalu ada; beritahu kami kawasan dan masa pilihan anda dan kami sahkan slot terdekat serta harga tetap sebelum kerja bermula.",
    },
    warranty: {
      title: "Harga & waranti, disahkan awal",
      body: "Setiap kerja disebut harga dari senarai harga terbitan kami sebelum kami mula — servis asas dari RM 99, cuci kimia dari RM 120, pemasangan dari RM 199 — dan dilindungi waranti kerja tangan 1 bulan. Tiada deposit untuk menempah, tiada caj mengejut pada hari itu.",
    },
    faqHeading: "Soalan Lazim Tempahan",
    faqs: [
      { q: "Perlukah saya bayar deposit untuk menempah?", a: "Tidak. Tempahan adalah percuma dan tidak memerlukan deposit. Anda sahkan servis dan masa, kami sahkan harga, dan anda bayar hanya selepas kerja siap dan anda berpuas hati." },
      { q: "Bolehkah saya dapat servis aircond hari sama?", a: "Selalunya boleh, bergantung pada kawasan dan masa anda menghubungi kami. Slot hari sama dan hari esok biasa di seluruh KL & Selangor — WhatsApp kami lokasi anda dan kami sahkan slot terdekat yang ada." },
      { q: "Adakah harga disahkan sebelum kerja bermula?", a: "Ya. Kami sebut harga dari senarai harga terbitan kami dan sahkan harga penuh dengan anda sebelum sebarang kerja bermula. Bahan tambahan, jika ada, ditunjuk dan diluluskan di tapak dahulu." },
      { q: "Jenama apa yang anda servis?", a: "Semua 20 jenama aircond utama — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Acson, Sharp, Hisense, TCL dan lagi — untuk servis, cuci kimia, pembaikan dan pemasangan." },
    ],
  },
  zh: {
    heading: "预约之后会如何",
    coverage: {
      title: "我们的覆盖地区",
      body: "KL Renovator 服务整个吉隆坡与雪兰莪——八打灵再也、梳邦再也、莎阿南、蒲种、蕉赖、安邦、巴生、甲洞、万挠以及之间的每一个社区。只要您在巴生谷范围内，我们都能上门。",
    },
    response: {
      title: "我们多快回复",
      body: "WhatsApp 是联系我们最快的方式，通常在营业时间内当天回复。当天与隔天的时段通常都有；告诉我们您的地区与理想时间，我们会在动工前确认最近的时段与固定价格。",
    },
    warranty: {
      title: "价格与保修，事先确认",
      body: "每项作业都在动工前依据我们公布的价目表报价——基础保养 RM 99 起、化学清洗 RM 120 起、安装 RM 199 起——并享1个月工艺保修。预约免押金，当天绝无隐藏收费。",
    },
    faqHeading: "预约常见问题",
    faqs: [
      { q: "预约需要付押金吗？", a: "不需要。预约免费且无需押金。您确认服务与时间，我们确认价格，待作业完成且您满意后才付款。" },
      { q: "可以当天上门保养冷气吗？", a: "通常可以，视您的地区与联系时间而定。当天与隔天的时段在吉隆坡与雪兰莪很常见——请 WhatsApp 告知地点，我们会确认最近的可用时段。" },
      { q: "价格会在动工前确认吗？", a: "会。我们依据公布的价目表报价，并在任何作业开始前与您确认全额价格。如需额外材料，会先在现场展示并经您同意。" },
      { q: "你们服务哪些品牌？", a: "全部20个主要冷气品牌——大金、松下、三菱、约克、美的、LG、三星、Acson、夏普、海信、TCL 等——涵盖保养、化学清洗、维修与安装。" },
    ],
  },
};

export function BookingSupportInfo({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const cards = [
    { icon: <FiMapPin className="h-5 w-5" />, ...t.coverage },
    { icon: <FiClock className="h-5 w-5" />, ...t.response },
    { icon: <FiShield className="h-5 w-5" />, ...t.warranty },
  ];

  return (
    <section className="py-14 bg-slate-50 border-t border-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 speakable">{t.heading}</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="inline-flex p-2.5 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-3">{c.icon}</div>
              <h3 className="font-black text-slate-900 text-base">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">{t.faqHeading}</h2>
        <div className="mt-5 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden bg-white">
          {t.faqs.map((f, i) => (
            <details key={i} className="group bg-white p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                {f.q}
                <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
              </summary>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
