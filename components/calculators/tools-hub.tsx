// ─────────────────────────────────────────────────────────────────────────
// Tools hub page content — trilingual (en/ms/zh). Renders the full hub:
// hero, tool grid, how-it-works, price links, FAQs and CTA. The /tools,
// /ms/tools and /zh/tools pages are thin wrappers that pass metadata + lang.
// ─────────────────────────────────────────────────────────────────────────

import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { TOOLS } from "@/config/tools";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildFaqSchema } from "@/lib/seo";

type Lang = "en" | "ms" | "zh";

const HUB_STRINGS: Record<Lang, {
  eyebrow: string;
  h1a: string;
  h1b: string;
  intro: string;
  bottomNote: string;
  worksTitle: string;
  worksBody: string;
  worksBody2: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaWa: string;
}> = {
  en: {
    eyebrow: "Free Instant Tools",
    h1a: "Aircond Calculators &",
    h1b: "Tools",
    intro:
      "Six free, mobile-friendly calculators built on KL Renovator's published 2026 pricing — get an instant estimate for installation, gas top-up, aircond sizing, electricity cost and inverter savings.",
    bottomNote: "Also on our homepage: Price Calculator and Problem Diagnostic Tool — quick cost & diagnosis cards with WhatsApp booking.",
    worksTitle: "How the Estimates Work",
    worksBody:
      "Every calculator uses KL Renovator's official published price list — the same figures shown on the service price page and installation price guide. Installation labour is per HP (RM 199–449), copper pipe RM 17–27/ft, electrical wire RM 9–17/ft, gas R22 RM 2.50/PSI and R410A/R32 RM 3.00/PSI. Where a figure depends on an on-site inspection — exact gas PSI, drain pipe routing, water pump sizing — the tool shows a range and the technician confirms the final price before any work begins. No hidden charges, ever.",
    worksBody2: "",
    faqs: [
      { q: "Are KL Renovator's aircond calculators free to use?", a: "Yes — all calculators on this page are completely free, with no registration and no email required. They use KL Renovator's published 2026 pricing so the estimates match real quotes." },
      { q: "How accurate are the calculator estimates?", a: "Labour and published material rates (copper pipe, wire, brackets, casing, gas per PSI) are taken directly from KL Renovator's official price list, so those figures are exact. Anything that depends on an on-site inspection — like the exact PSI of gas needed or drain pipe routing — is shown as a range and confirmed by the technician before work begins." },
      { q: "Which aircond calculator should I use first?", a: "Start with the Aircond Size Calculator or BTU Calculator to find the right HP for your room, then use the Installation Cost Calculator for the full labour + materials estimate. Use the Electricity Cost Calculator to check your running cost and the Inverter Savings Calculator before deciding between inverter and non-inverter." },
      { q: "Can I book a service directly from a calculator?", a: "Yes — every calculator result has a WhatsApp button that pre-fills your details and estimate, so you can confirm a booking in one tap. You can also book a slot online at klrenovator.com/book." },
    ],
    ctaTitle: "Prefer to Just Ask a Human?",
    ctaBody: "WhatsApp KL Renovator directly — real technicians reply with transparent pricing, same-day availability across KL & Selangor.",
    ctaWa: "WhatsApp +60 18-298 3573",
  },
  ms: {
    eyebrow: "Alat Percuma Segera",
    h1a: "Kalkulator Aircond &",
    h1b: "Alat",
    intro:
      "Enam kalkulator percuma mesra mudah alih dibina berdasarkan harga 2026 KL Renovator yang diterbitkan — dapatkan anggaran segera untuk pemasangan, tambah gas, saiz aircond, kos elektrik dan penjimatan inverter.",
    bottomNote: "Juga di laman utama kami: Kalkulator Harga dan Alat Diagnostik Masalah — kad kos & diagnosis pantas dengan tempahan WhatsApp.",
    worksTitle: "Macam Mana Anggaran Berfungsi",
    worksBody:
      "Setiap kalkulator menggunakan senarai harga rasmi KL Renovator yang diterbitkan — angka yang sama pada halaman harga servis dan panduan harga pemasangan. Buruh pemasangan mengikut HP (RM 199–449), paip tembaga RM 17–27/kaki, wayar elektrik RM 9–17/kaki, gas R22 RM 2.50/PSI dan R410A/R32 RM 3.00/PSI. Apabila angka bergantung pada pemeriksaan di tapak — PSI gas tepat, laluan paip saliran, saiz pam air — alat menunjukkan julat dan juruteknik mengesahkan harga akhir sebelum kerja bermula. Tiada caj tersembunyi, langsung.",
    worksBody2: "",
    faqs: [
      { q: "Adakah kalkulator aircond KL Renovator percuma?", a: "Ya — semua kalkulator di halaman ini percuma sepenuhnya, tanpa pendaftaran dan tanpa emel. Ia menggunakan harga 2026 KL Renovator yang diterbitkan supaya anggaran sepadan dengan sebut harga sebenar." },
      { q: "Seberapa tepat anggaran kalkulator?", a: "Buruh dan kadar bahan diterbitkan (paip tembaga, wayar, pendakap, casing, gas per PSI) diambil terus dari senarai harga rasmi KL Renovator, jadi angka itu tepat. Apa-apa yang bergantung pada pemeriksaan di tapak — seperti PSI gas tepat atau laluan paip saliran — ditunjukkan sebagai julat dan disahkan oleh juruteknik sebelum kerja bermula." },
      { q: "Kalkulator aircond mana yang patut saya guna dahulu?", a: "Mula dengan Kalkulator Saiz Aircond atau Kalkulator BTU untuk mencari HP yang betul untuk bilik anda, kemudian gunakan Kalkulator Kos Pemasangan untuk anggaran buruh + bahan penuh. Gunakan Kalkulator Kos Elektrik untuk semak kos bulanan dan Kalkulator Penjimatan Inverter sebelum memutuskan antara inverter dan bukan inverter." },
      { q: "Bolehkah saya tempah servis terus dari kalkulator?", a: "Ya — setiap keputusan kalkulator ada butang WhatsApp yang mengisi butiran dan anggaran anda, jadi anda boleh sahkan tempahan dengan satu ketukan. Anda juga boleh tempah slot dalam talian di klrenovator.com/book." },
    ],
    ctaTitle: "Lebih Suka Tanya Manusia Terus?",
    ctaBody: "WhatsApp KL Renovator terus — juruteknik sebenar membalas dengan harga telus, ketersediaan hari sama di seluruh KL & Selangor.",
    ctaWa: "WhatsApp +60 18-298 3573",
  },
  zh: {
    eyebrow: "免费即时工具",
    h1a: "冷气计算器与",
    h1b: "工具",
    intro:
      "六个基于KL Renovator已公布2026年定价构建的免费移动端计算器 — 立即获取安装、加气、冷气尺寸、电费和变频节省的估算。",
    bottomNote: "首页还有：价格计算器和问题诊断工具 — 带WhatsApp预约的快速费用与诊断卡片。",
    worksTitle: "估价原理",
    worksBody:
      "每个计算器都使用KL Renovator官方已公布的价目表 — 与服务价格页和安装价格指南上的数字一致。安装人工按匹数（RM 199–449）、铜管每英尺RM 17–27、电线每英尺RM 9–17、R22气体每PSI RM 2.50、R410A/R32每PSI RM 3.00。凡是依赖现场检查的数字 — 精确气体PSI、排水走向、水泵规格 — 工具会给出范围，技术员在动工前确认最终价格。绝无隐藏费用。",
    worksBody2: "",
    faqs: [
      { q: "KL Renovator的冷气计算器免费使用吗？", a: "是的 — 本页所有计算器完全免费，无需注册或提供邮箱。它们使用KL Renovator已公布的2026年定价，因此估算与实际报价一致。" },
      { q: "计算器的估算有多准确？", a: "人工和已公布的材料费率（铜管、电线、支架、线槽、每PSI气体）直接取自KL Renovator官方价目表，因此这些数字是准确的。任何依赖现场检查的项目 — 如所需精确气体PSI或排水走向 — 都会以范围形式显示，并由技术员在动工前确认。" },
      { q: "应该先用哪个冷气计算器？", a: "先用冷气尺寸计算器或BTU计算器确定房间所需匹数，再用安装费用计算器获取完整的人工+材料估算。用费用计算器查看运行成本，在决定变频还是非变频前使用变频节省计算器。" },
      { q: "可以直接从计算器预约服务吗？", a: "可以 — 每个计算器结果都有WhatsApp按钮，自动填入您的信息和估算，一键确认预约。也可以在线预约klrenovator.com/book。" },
    ],
    ctaTitle: "想直接问真人？",
    ctaBody: "直接WhatsApp KL Renovator — 真实技术员回复透明价格，吉隆坡和雪兰莪当天可上门。",
    ctaWa: "WhatsApp +60 18-298 3573",
  },
};

export function ToolsHub({ lang = "en" }: { lang?: Lang }) {
  const t = HUB_STRINGS[lang];
  const faqSchema = buildFaqSchema(t.faqs);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: lang === "ms" ? "Kalkulator & Alat Aircond Percuma Malaysia" : lang === "zh" ? "马来西亚免费冷气计算器与工具" : "Free Aircond Calculators & Tools Malaysia",
    url: `https://www.klrenovator.com${lang === "en" ? "" : `/${lang}`}/tools`,
    description:
      lang === "ms"
        ? "Kalkulator percuma: kos pemasangan, tambah gas, BTU, saiz, elektrik, penjimatan inverter dan alat cadangan servis."
        : lang === "zh"
          ? "免费计算器：安装费用、加气、BTU、尺寸、电费、变频节省及服务推荐工具。"
          : "Free aircond installation cost, gas top-up, BTU, size, electricity and inverter savings calculators plus a service recommendation tool.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TOOLS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: lang === "ms" ? tool.titleMS : lang === "zh" ? tool.titleZH : tool.anchor,
        url: `https://www.klrenovator.com${lang === "en" ? "" : `/${lang}`}${tool.slug}`,
      })),
    },
  };

  const localePrefix = lang === "en" ? "" : `/${lang}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">{t.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
              {t.h1a} <span className="text-sky-500">{t.h1b}</span>
            </h1>
            <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">{t.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.slug} delay={i * 40}>
                <NextLink
                  href={`${localePrefix}${tool.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-sky-400 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <span className="text-3xl mb-4" aria-hidden="true">{tool.icon}</span>
                  <h2 className="font-black text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors">
                    {lang === "ms" ? tool.titleMS : lang === "zh" ? tool.titleZH : tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed flex-1">
                    {lang === "ms" ? tool.descMS : lang === "zh" ? tool.descZH : tool.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">
                    {lang === "ms" ? "Guna Alat" : lang === "zh" ? "使用工具" : "Use Tool"} <FiArrowRight className="h-3 w-3" />
                  </span>
                </NextLink>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          {t.bottomNote}
        </p>
      </section>

      {/* How the estimates work */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">{t.worksTitle}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">{t.worksBody}</p>
            {t.worksBody2 && <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">{t.worksBody2}</p>}
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            <NextLink href={`${localePrefix}/aircond-service-price-malaysia`} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all">
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                {lang === "ms" ? "Harga Servis Aircond 2026" : lang === "zh" ? "2026年冷气服务价格" : "Aircond Service Price 2026"}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                {lang === "ms" ? "Asas RM 99 · Cuci kimia RM 120 · Overhaul RM 220 · Gas RM 2.50/PSI." : lang === "zh" ? "基本RM 99 · 化学清洗RM 120 · 大修RM 220 · 气体RM 2.50/PSI。" : "Basic RM 99 · Chemical wash RM 120 · Overhaul RM 220 · Gas RM 2.50/PSI — full published list."}
              </p>
            </NextLink>
            <NextLink href={`${localePrefix}/installation-price-malaysia`} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all">
              <p className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                {lang === "ms" ? "Panduan Harga Pemasangan" : lang === "zh" ? "安装价格指南" : "Installation Price Guide"}
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                {lang === "ms" ? "Pemasangan dari RM 199 dengan pecahan bahan penuh." : lang === "zh" ? "安装从RM 199起，含完整材料明细和保修条款。" : "Installation from RM 199 with full materials breakdown and warranty terms."}
              </p>
            </NextLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              {lang === "ms" ? "Soalan Lazim" : lang === "zh" ? "常见问题" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-5">
              {t.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex gap-2">
                    <span className="text-sky-600 font-extrabold">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed pl-6 border-l-2 border-sky-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">{t.ctaTitle}</h2>
          <p className="text-sky-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">{t.ctaBody}</p>
          <a
            href={waLink(rfqMsg)}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest px-7 py-4 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg"
          >
            <FaWhatsapp className="h-5 w-5" /> {t.ctaWa}
          </a>
        </div>
      </section>
    </>
  );
}
