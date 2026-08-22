"use client";

import { useState, useMemo } from "react";
import { FaWhatsapp, FaChevronDown, FaPhone, FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegClock, FaShieldAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { sitePublic } from "@/config/site-public";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { masterFaqPool, FAQ_CATEGORIES, MOST_ASKED_CATEGORIES, type Lang, type MasterFaqItem } from "@/config/master-faq-pool";

const HERO: Record<Lang, { eyebrow: string; title: string[]; desc: string; searchPlaceholder: string; mostAsked: string; showingResults: string; noResults: string }> = {
  en: {
    eyebrow: "Knowledge Base",
    title: ["Frequently Asked ", "Questions"],
    desc: "100+ honest answers about aircond installation, servicing, chemical wash, pricing, warranty and coverage in KL & Selangor — all in one place.",
    searchPlaceholder: "Search questions...",
    mostAsked: "Most Asked",
    showingResults: "questions found",
    noResults: "No questions match your search. Try different keywords or WhatsApp us directly.",
  },
  ms: {
    eyebrow: "Pusat Pengetahuan",
    title: ["Soalan Lazim ", "Yang Sering Ditanya"],
    desc: "100+ jawapan jujur tentang pemasangan aircond, servis, cuci kimia, harga, waranti dan liputan di KL & Selangor — semuanya di satu tempat.",
    searchPlaceholder: "Cari soalan...",
    mostAsked: "Paling Banyak Ditanya",
    showingResults: "soalan ditemui",
    noResults: "Tiada soalan sepadan dengan carian anda. Cuba kata kunci berbeza atau WhatsApp kami terus.",
  },
  zh: {
    eyebrow: "知识库",
    title: ["常见", "问答"],
    desc: "100+ 关于冷气安装、保养、化学清洗、价格、保修及覆盖范围（KL & 雪兰莪）的诚实解答——全部汇聚于此。",
    searchPlaceholder: "搜索问题...",
    mostAsked: "热门问题",
    showingResults: "条问题",
    noResults: "没有找到匹配的问题。请尝试不同关键词或直接 WhatsApp 联系我们。",
  },
};

const CTA: Record<Lang, { badge: string; title: string[]; desc: string; whatsapp: string; call: string; trust: string[] }> = {
  en: {
    badge: "Same-day slots available",
    title: ["Ready to book your ", "aircond service?"],
    desc: "Chat with us on WhatsApp and get a transparent quote in minutes. Licensed technicians · Honest pricing · Quality workmanship.",
    whatsapp: "Request a Quote",
    call: "Call",
    trust: ["Reply within 30 mins", "Licensed & insured", "Satisfaction guaranteed"],
  },
  ms: {
    badge: "Slot hari sama tersedia",
    title: ["Sedia untuk menempah ", "servis aircond?"],
    desc: "Berbual dengan kami di WhatsApp dan dapatkan sebut harga telus dalam beberapa minit. Juruteknik berlesen · Harga jujur · Kerja berkualiti.",
    whatsapp: "Minta Sebut Harga",
    call: "Hubungi",
    trust: ["Balas dalam 30 minit", "Berlesen & berinsurans", "Jaminan kepuasan"],
  },
  zh: {
    badge: "可提供当天服务时段",
    title: ["准备好预约", "冷气服务了吗？"],
    desc: "通过 WhatsApp 联系我们，几分钟内即可获得透明报价。持证技术员 · 价格诚实 · 品质工艺。",
    whatsapp: "索取报价",
    call: "致电",
    trust: ["30 分钟内回复", "持证投保", "满意保证"],
  },
};

const FAQ_CTA: Record<Lang, { emoji: string; title: string; desc: string; button: string }> = {
  en: { emoji: "💬", title: "Still have a question?", desc: "WhatsApp us — our technicians reply within 30 minutes.", button: "Ask Us on WhatsApp" },
  ms: { emoji: "💬", title: "Masih ada soalan?", desc: "WhatsApp kami — juruteknik kami akan membalas dalam 30 minit.", button: "Tanya Kami di WhatsApp" },
  zh: { emoji: "💬", title: "还有其他问题？", desc: "WhatsApp 联系我们——技术员将在 30 分钟内回复。", button: "WhatsApp 咨询我们" },
};

const SOURCE_LABEL: Record<Lang, string> = {
  en: "Learn more →",
  ms: "Ketahui lebih →",
  zh: "了解更多 →",
};

function FaqItem({ q, a, source, lang = "en" }: { q: string; a: string; source?: string; lang?: Lang }) {
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
        <FaChevronDown className={`h-4 w-4 shrink-0 mt-1 text-slate-600 transition-all duration-200 ${open ? "rotate-180 text-sky-500" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-5" : "max-h-0"}`}>
        <p className="text-sm text-slate-600 font-medium leading-relaxed pr-8">{a}</p>
        {source && (
          <a
            href={source}
            className="inline-block mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
          >
            {SOURCE_LABEL[lang]} {source.replace("/", "").replace(/-/g, " ")}
          </a>
        )}
      </div>
    </div>
  );
}

export function FaqPageI18n({ lang }: { lang: Lang }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMostAsked, setShowMostAsked] = useState(true);

  const faqs = masterFaqPool[lang];
  const categories = FAQ_CATEGORIES[lang];
  const hero = HERO[lang];
  const cta = CTA[lang];
  const faqCta = FAQ_CTA[lang];

  // Most Asked — first question from each top category
  const mostAsked = useMemo(() => {
    const result: MasterFaqItem[] = [];
    for (const cat of MOST_ASKED_CATEGORIES) {
      const first = faqs.find((f) => f.category === cat);
      if (first) result.push(first);
    }
    return result;
  }, [faqs]);

  // Filter by category + search
  const filtered = useMemo(() => {
    let items = faqs;
    if (activeCategory !== "all") {
      items = items.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }
    return items;
  }, [faqs, activeCategory, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const displayFaqs = isSearching || activeCategory !== "all" ? filtered : faqs;
  const hideMostAsked = isSearching || activeCategory !== "all" || !showMostAsked;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/lg-aircond-gas-topup-r32-shah-alam-51.webp"
            alt="HVAC technician servicing aircond unit KL Selangor"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-slate-900 max-w-2xl leading-[1.05]">
              {hero.title[0]}<span className="text-sky-500">{hero.title[1]}</span>
            </h1>
            <p className="mt-5 text-slate-600 font-medium max-w-xl leading-relaxed">
              {hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search + Category Filter */}
      <section className="bg-white border-b border-slate-100 sticky top-[80px] z-30 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Search */}
          <div className="relative mb-3">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) setShowMostAsked(false);
                else setShowMostAsked(true);
              }}
              placeholder={hero.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setShowMostAsked(true); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setShowMostAsked(false);
                }}
                className={`shrink-0 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-200 ${
                  activeCategory === cat.key && !isSearching
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Most Asked Section */}
      {!hideMostAsked && (
        <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-6 flex items-center gap-2">
                <span className="text-base">⭐</span> {hero.mostAsked}
              </p>
            </Reveal>
            <div className="bg-amber-50 rounded-2xl border border-amber-100 px-6 sm:px-8">
              {mostAsked.map((faq, i) => (
                <Reveal key={i} delay={i * 30}>
                  <FaqItem q={faq.q} a={faq.a} source={faq.source} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Accordion */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">
            {displayFaqs.length} {hero.showingResults}
            {isSearching && ` — "${searchQuery}"`}
          </p>

          {displayFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
              <p className="text-slate-600 font-medium">{hero.noResults}</p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[#25D366] hover:bg-[#1ebe5d] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-4 w-4" /> {faqCta.button}
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 sm:px-8 divide-y divide-slate-100">
              {displayFaqs.map((faq, i) => (
                <Reveal key={`${faq.category}-${i}`} delay={Math.min(i * 15, 300)}>
                  <FaqItem q={faq.q} a={faq.a} source={faq.source} lang={lang} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <div className="mt-10 bg-[#0284c7] text-white rounded-2xl p-8 text-center">
              <p className="text-2xl mb-1">{faqCta.emoji}</p>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                {faqCta.title}
              </h2>
              <p className="mt-2 text-sky-100 font-medium text-sm">
                {faqCta.desc}
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" /> {faqCta.button}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-sky-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block border border-sky-300 bg-sky-700 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-sky-100 rounded-full">
              {cta.badge}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] uppercase">
              {cta.title[0]}<span className="text-sky-100">{cta.title[1]}</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-sky-100 font-medium">
              {cta.desc}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                {cta.whatsapp}
              </a>
              <a
                href={`tel:${sitePublic.phone}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-all rounded-xl"
              >
                <FaPhone className="h-4 w-4" />
                {cta.call} {sitePublic.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-sky-500 border border-sky-500 rounded-xl overflow-hidden">
              {[
                { icon: FaRegClock, label: cta.trust[0] },
                { icon: FaShieldAlt, label: cta.trust[1] },
                { icon: FiCheckCircle, label: cta.trust[2] },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2.5 bg-sky-700 hover:bg-sky-600 transition-colors px-4 py-5 text-sm font-black text-white uppercase tracking-wider"
                >
                  <Icon className="h-4 w-4 text-sky-200 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
