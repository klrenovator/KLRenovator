"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "ms" | "zh";

export const translations = {
  en: {
    nav_home: "Home", nav_about: "About", nav_services: "Services",
    nav_faq: "FAQ", nav_contact: "Contact", nav_call: "Call Support",
    nav_book: "Book Now", nav_topbar: "Same-Day Aircond Installation & Servicing Across KL & Selangor — From RM199",
    hero_badge: "⭐ TOP RATED 5 / 5 ON GOOGLE MAPS REVIEWS",
    hero_h1_line1: "Expert Aircond Installation", hero_h1_line2: "& Servicing KL Selangor",
    hero_desc: "Professional aircond installation from RM199 — plus chemical wash, overhaul, gas top-up, repairs & servicing for all 20 brands. Same-day, transparent pricing, 1-month workmanship warranty. Installation specialists near you in Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong & Klang.",
    hero_whatsapp: "Book Via WhatsApp", hero_call: "Call +60 18-298 3573",
    hero_trust1: "Installation From RM199", hero_trust2: "Same-Day Available", hero_trust3: "1-Month Workmanship Warranty",
    stats_customers: "Happy Klang Valley Customers", stats_years: "Years HVAC Experience",
    stats_reviews: "5-Star Verified Reviews", stats_response: "Emergency Response Time",
    services_eyebrow: "Premium Aircond Installation & Solutions", services_title1: "Our Expert ", services_title2: "Aircond Services",
    services_desc: "Professional aircond installation, servicing, chemical wash & repairs across Kuala Lumpur and Selangor. Click any service to view details and pricing.",
    services_residential: "Residential Services", services_commercial: "Commercial HVAC",
    services_from: "From", services_book: "Book This Service",
    why_eyebrow: "Why KL Renovator", why_title1: "Trusted by ", why_title2: "5,000+ Customers",
    why_1_title: "12+ Years Experience", why_1_desc: "Decade of HVAC expertise across Klang Valley residential and commercial properties.",
    why_2_title: "Same-Day Response", why_2_desc: "Emergency calls answered fast. Most jobs scheduled within hours of your booking.",
    why_3_title: "Transparent Pricing", why_3_desc: "No hidden charges. Every quote is itemized before we start any work.",
    why_4_title: "All Brands Covered", why_4_desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung — we service them all.",
    why_5_title: "Certified Technicians", why_5_desc: "All technicians are trained, insured, and carry proper HVAC certification.",
    why_6_title: "Satisfaction Guaranteed", why_6_desc: "If you're not happy, we come back. 100% service satisfaction guarantee.",
    reviews_eyebrow: "Google Reviews", reviews_title1: "What Our ", reviews_title2: "Customers Say",
    cta_title1: "Ready To Book ", cta_title2: "Your Service?",
    cta_desc: "Contact us now via WhatsApp or call for same-day appointments across KL & Selangor.",
    cta_whatsapp: "Book Via WhatsApp", cta_call: "Call Now",
    footer_desc: "Expert aircond installation, servicing & repairs across Kuala Lumpur & Selangor. From RM199, same-day available, all 20 brands. Managed under Multicore Dynamics Resources.",
    footer_dispatch: "Direct Dispatch", footer_services: "Our Services",
    footer_areas: "Service Areas", footer_rights: "All rights reserved.",
    footer_hours: "Mon–Sun · 9:00 AM – 6:00 PM", lang_label: "Language",
    nav_gallery: "Gallery",
    gallery_eyebrow: "Real Projects · Real Results",
    gallery_title: "Our Work Gallery",
    testimonials_eyebrow: "Customer Stories",
    testimonials_title1: "What Customers Say About ",
    testimonials_title2: "the KL Renovator Team",
    services_view_details: "View Details & Pricing",
    homepage_ai_qa_eyebrow: "Got Questions? Quick Answers",
    homepage_ai_qa_title1: "Aircond Installation ",
    homepage_ai_qa_title2: "FAQs at a Glance",
    homepage_ai_qa_desc: "Quick, honest answers to the most common questions — for AI Overviews & instant clarity.",
    homepage_ai_qa1_q: "How much does aircond installation cost in KL & Selangor?",
    homepage_ai_qa1_a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft copper pipe, insulation, electrical wire and drain pipe pipe, vacuum pump commissioning, and 1-month workmanship warranty. Ceiling cassette from RM 290, window unit from RM 180. All prices confirmed before work begins.",
    homepage_ai_qa2_q: "How long does aircond installation take?",
    homepage_ai_qa2_a: "Standard wall-mounted installation takes 3–5 hours for a single unit. Ceiling cassette takes 5–8 hours. Multi-unit whole-house installations typically complete in 1–2 days. Same-day installation available for bookings made before 11 AM.",
    homepage_ai_qa3_q: "Which aircond brands does KL Renovator install?",
    homepage_ai_qa3_a: "All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic and National. Both inverter and non-inverter models.",
    homepage_ai_qa4_q: "Can you install aircond in high-rise condos in KL?",
    homepage_ai_qa4_a: "Yes — we regularly install in condos across KLCC, Mont Kiara, Bangsar, Sentul, PJ and Subang Jaya. We coordinate with building management for lift/loading bay access, follow JMB rules, and ensure outdoor unit placement complies with all regulations.",
    homepage_ai_qa5_q: "What warranty does KL Renovator provide on installation?",
    homepage_ai_qa5_a: "1-month written workmanship warranty on all installation labour. If any installation-related issue arises (leaks, vibration, electrical fault, poor cooling) within 30 days, we return and rectify at zero cost. Manufacturer warranty on the unit itself remains fully protected.",
  },
  ms: {
    nav_home: "Utama", nav_about: "Tentang Kami", nav_services: "Perkhidmatan",
    nav_faq: "Soalan Lazim", nav_contact: "Hubungi", nav_call: "Hubungi Kami",
    nav_book: "Tempah Sekarang", nav_topbar: "Pemasangan & Servis Aircond Hari Sama Seluruh KL & Selangor — Dari RM199",
    hero_badge: "⭐ PENILAIAN TERTINGGI 5 / 5 DI GOOGLE MAPS",
    hero_h1_line1: "Pakar Pemasangan Aircond", hero_h1_line2: "& Servis KL Selangor",
    hero_desc: "Pemasangan aircond profesional dari RM199 — cuci kimia, overhaul, tambah gas, pembaikan & servis untuk semua 20 jenama. Harga telus, hari sama, waranti kerja 1 bulan. Pakar pemasangan berhampiran anda di Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong & Klang.",
    hero_whatsapp: "Tempah Via WhatsApp", hero_call: "Hubungi +60 18-298 3573",
    hero_trust1: "Pemasangan Dari RM199", hero_trust2: "Tersedia Hari Sama", hero_trust3: "Waranti Kerja 1 Bulan",
    stats_customers: "Pelanggan Lembah Klang Gembira", stats_years: "Tahun Pengalaman HVAC",
    stats_reviews: "Ulasan Bintang 5 Disahkan", stats_response: "Masa Tindak Balas Kecemasan",
    services_eyebrow: "Pemasangan & Penyelesaian Aircond Premium", services_title1: "Perkhidmatan Aircond ", services_title2: "Profesional Kami",
    services_desc: "Pemasangan aircond, servis, cuci kimia & pembaikan profesional merentasi Kuala Lumpur dan Selangor. Klik mana-mana perkhidmatan untuk lihat butiran dan harga.",
    services_residential: "Perkhidmatan Kediaman", services_commercial: "Perkhidmatan Komersial",
    services_from: "Dari", services_book: "Tempah Perkhidmatan Ini",
    why_eyebrow: "Mengapa KL Renovator", why_title1: "Dipercayai ", why_title2: "5,000+ Pelanggan",
    why_1_title: "12+ Tahun Pengalaman", why_1_desc: "Lebih sedekad kepakaran HVAC merentasi hartanah kediaman dan komersial Lembah Klang.",
    why_2_title: "Tindak Balas Hari Sama", why_2_desc: "Panggilan kecemasan dijawab cepat. Kebanyakan kerja dijadualkan dalam beberapa jam.",
    why_3_title: "Harga Telus", why_3_desc: "Tiada caj tersembunyi. Setiap sebut harga terperinci sebelum kerja dimulakan.",
    why_4_title: "Semua Jenama Diliputi", why_4_desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung — kami servis semua.",
    why_5_title: "Juruteknik Bertauliah", why_5_desc: "Semua juruteknik terlatih, diinsurankan, dan mempunyai sijil HVAC yang betul.",
    why_6_title: "Kepuasan Terjamin", why_6_desc: "Jika anda tidak berpuas hati, kami akan kembali. Jaminan kepuasan servis 100%.",
    reviews_eyebrow: "Ulasan Google", reviews_title1: "Apa Kata ", reviews_title2: "Pelanggan Kami",
    cta_title1: "Bersedia Untuk Tempah ", cta_title2: "Servis Anda?",
    cta_desc: "Hubungi kami sekarang melalui WhatsApp atau telefon untuk temujanji hari sama di seluruh KL & Selangor.",
    cta_whatsapp: "Tempah Via WhatsApp", cta_call: "Hubungi Sekarang",
    footer_desc: "Pakar pemasangan, servis & pembaikan aircond merentasi Kuala Lumpur & Selangor. Dari RM199, hari sama, semua 20 jenama. Diuruskan di bawah Multicore Dynamics Resources.",
    footer_dispatch: "Hubungi Terus", footer_services: "Perkhidmatan Kami",
    footer_areas: "Kawasan Servis", footer_rights: "Hak cipta terpelihara.",
    footer_hours: "Isnin–Ahad · 9:00 PG – 6:00 PTG", lang_label: "Bahasa",
    nav_gallery: "Galeri",
    gallery_eyebrow: "Projek Nyata · Hasil Sebenar",
    gallery_title: "Galeri Kerja Kami",
    testimonials_eyebrow: "Cerita Pelanggan",
    testimonials_title1: "Apa Kata Pelanggan Tentang ",
    testimonials_title2: "Pasukan KL Renovator",
    services_view_details: "Lihat Butiran & Harga",
    homepage_ai_qa_eyebrow: "Ada Soalan? Jawapan Pantas",
    homepage_ai_qa_title1: "Soalan Lazim ",
    homepage_ai_qa_title2: "Pemasangan Aircond",
    homepage_ai_qa_desc: "Jawapan pantas dan jujur kepada soalan paling lazim — untuk AI Overviews & kejelasan segera.",
    homepage_ai_qa1_q: "Berapa harga pemasangan aircond di KL & Selangor?",
    homepage_ai_qa1_a: "Pemasangan dinding bermula dari RM 199 untuk 1.0–1.5 HP termasuk 7 kaki paip tembaga, pendawaian, paip saliran standard, vakum pam, dan waranti kerja 1 bulan. Ceiling cassette dari RM 290, unit tingkap dari RM 180. Semua harga disahkan sebelum kerja bermula.",
    homepage_ai_qa2_q: "Berapa lama pemasangan aircond mengambil masa?",
    homepage_ai_qa2_a: "Pemasangan dinding standard mengambil masa 3–5 jam untuk satu unit. Ceiling cassette mengambil 5–8 jam. Pemasangan seluruh rumah biasanya siap dalam 1–2 hari. Pemasangan hari sama tersedia untuk tempahan sebelum 11 pagi.",
    homepage_ai_qa3_q: "Jenama aircond apa yang dipasang oleh KL Renovator?",
    homepage_ai_qa3_a: "Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic dan National. Kedua-dua model inverter dan bukan inverter.",
    homepage_ai_qa4_q: "Bolehkah anda pasang aircond di kondominium tinggi di KL?",
    homepage_ai_qa4_a: "Ya — kami kerap memasang di kondo sekitar KLCC, Mont Kiara, Bangsar, Sentul, PJ dan Subang Jaya. Kami berurusan dengan pengurusan bangunan untuk akses lif/teluk muatan, mematuhi peraturan JMB, dan memastikan penempatan unit luar mematuhi semua peraturan.",
    homepage_ai_qa5_q: "Apa waranti yang diberikan KL Renovator untuk pemasangan?",
    homepage_ai_qa5_a: "Waranti kerja bertulis 1 bulan untuk semua kerja pemasangan. Jika sebarang isu berkaitan pemasangan timbul (kebocoran, getaran, kerosakan elektrik, penyejukan lemah) dalam masa 30 hari, kami kembali dan baiki tanpa caj. Waranti pengeluar pada unit kekal dilindungi sepenuhnya.",
  },
  zh: {
    nav_home: "首页", nav_about: "关于我们", nav_services: "服务",
    nav_faq: "常见问题", nav_contact: "联系我们", nav_call: "致电支持",
    nav_book: "立即预约", nav_topbar: "当天冷气安装与服务，覆盖吉隆坡及雪兰全区 — 低至RM199",
    hero_badge: "⭐ 谷歌地图评分 5 / 5 — 最高评价",
    hero_h1_line1: "专业冷气安装", hero_h1_line2: "与服务 吉隆坡雪兰莪",
    hero_desc: "专业冷气安装RM199起 — 化学清洗、大修、充气、维修与服务，覆盖全部20个品牌。透明价格，当天上门，1个月工艺保修。吉隆坡、八打灵再也、莎阿南、梳邦再也、蕉赖、安邦、蒲种及巴生 — 您身边的安装专家。",
    hero_whatsapp: "通过 WhatsApp 预约", hero_call: "致电 +60 18-298 3573",
    hero_trust1: "安装低至RM199", hero_trust2: "当天可预约", hero_trust3: "1个月工艺保修",
    stats_customers: "巴生谷满意客户", stats_years: "年 HVAC 经验",
    stats_reviews: "五星级认证评价", stats_response: "紧急响应时间",
    services_eyebrow: "优质冷气安装与解决方案", services_title1: "我们的专业 ", services_title2: "冷气服务",
    services_desc: "专业冷气安装、服务、化学清洗及维修，覆盖吉隆坡及雪兰莪。点击任何服务查看详情与价格。",
    services_residential: "住宅服务", services_commercial: "商业服务",
    services_from: "起价", services_book: "预约此服务",
    why_eyebrow: "为何选择 KL Renovator", why_title1: "超过 ", why_title2: "5,000 位客户信赖",
    why_1_title: "12 年以上经验", why_1_desc: "十二年来服务巴生谷住宅及商业冷暖气系统的丰富经验。",
    why_2_title: "当天响应", why_2_desc: "紧急来电快速响应，大多数工作在预约后数小时内安排。",
    why_3_title: "透明收费", why_3_desc: "无隐藏费用，所有报价在开工前逐项列明。",
    why_4_title: "覆盖所有品牌", why_4_desc: "大金、松下、三菱、约克、美的、LG、三星 — 我们全部服务。",
    why_5_title: "持证技术员", why_5_desc: "所有技术员均经过培训、投保，并持有正规 HVAC 认证。",
    why_6_title: "满意保证", why_6_desc: "如您不满意，我们将再次上门。100% 服务满意保证。",
    reviews_eyebrow: "谷歌评价", reviews_title1: "客户 ", reviews_title2: "怎么说",
    cta_title1: "准备好预约 ", cta_title2: "您的服务了吗？",
    cta_desc: "立即通过 WhatsApp 或电话联系我们，预约吉隆坡及雪兰莪当天上门服务。",
    cta_whatsapp: "通过 WhatsApp 预约", cta_call: "立即致电",
    footer_desc: "专业冷气安装、服务与维修，覆盖吉隆坡及雪兰莪。低至RM199，当天上门，全部20个品牌。由 Multicore Dynamics Resources 管理。",
    footer_dispatch: "直接联系", footer_services: "我们的服务",
    footer_areas: "服务区域", footer_rights: "版权所有。",
    footer_hours: "周一至周日 · 上午 9:00 – 下午 6:00", lang_label: "语言",
    nav_gallery: "项目图库",
    gallery_eyebrow: "真实项目 · 真实成果",
    gallery_title: "我们的工程图库",
    testimonials_eyebrow: "客户故事",
    testimonials_title1: "客户对 ",
    testimonials_title2: "KL Renovator 团队的评价",
    services_view_details: "查看详情与价格",
    homepage_ai_qa_eyebrow: "有疑问？快速解答",
    homepage_ai_qa_title1: "冷气安装",
    homepage_ai_qa_title2: "常见问题一览",
    homepage_ai_qa_desc: "对最常见问题的快速诚实回答 — 为AI概览和即时清晰度而设计。",
    homepage_ai_qa1_q: "吉隆坡和雪兰莪冷气安装费用是多少？",
    homepage_ai_qa1_a: "挂壁式安装从RM 199起（1.0–1.5 HP），包含7英尺铜管、电线、排水管、标准支架、真空泵调试和1个月工艺保修。天花板卡式机RM 290起，窗式机RM 180起。所有价格在施工前确认。",
    homepage_ai_qa2_q: "冷气安装需要多长时间？",
    homepage_ai_qa2_a: "标准挂壁式安装单台需要3–5小时。天花板卡式机需要5–8小时。全屋多台安装通常1–2天完成。上午11点前预约可安排当天安装。",
    homepage_ai_qa3_q: "KL Renovator安装哪些冷气品牌？",
    homepage_ai_qa3_a: "全部20个主要品牌 — 大金、松下、三菱、约克、美的、LG、三星、Carrier、富士通、日立、夏普、Acson、格力、东芝、海尔、海信、Aux、TCL、Isonic和National。变频和非变频机型均可。",
    homepage_ai_qa4_q: "能在吉隆坡高层公寓安装冷气吗？",
    homepage_ai_qa4_a: "可以 — 我们经常在KLCC、Mont Kiara、Bangsar、Sentul、PJ和Subang Jaya的公寓安装。我们协调大厦管理处的电梯/卸货区通行，遵守JMB规定，确保室外机位置符合所有规范。",
    homepage_ai_qa5_q: "KL Renovator提供什么安装保修？",
    homepage_ai_qa5_a: "所有安装工程享有1个月书面工艺保修。如30天内出现任何安装相关问题（漏水、震动、电气故障、制冷不佳），我们免费返修。机组本身的制造商保修完全不受影响。",
  },
} as const;

type TranslationKey = keyof typeof translations["en"];

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => translations["en"][k],
});

export const LanguageProvider = ({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  /** Use for a route whose locale is already known on the server. */
  initialLang?: Lang;
}) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Keep the shared client shell aligned with the route after hydration.
  // Route-specific content must use an explicit initialLang for SSR.
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    // The URL is authoritative. In particular, never restore a previous Malay
    // or Chinese localStorage value while rendering an explicit English URL.
    // Route-specific server components pass initialLang for indexable content;
    // this is only a client-navigation safety net for the shared shell.
    const path = window.location.pathname;
    const detected: Lang = path.startsWith("/ms/") || path === "/ms"
      ? "ms"
      : path.startsWith("/zh/") || path === "/zh"
        ? "zh"
        : "en";
    setLangState(detected);
  }, []);

  const setLang = (l: Lang) => {
    // Navbar changes the route at the same time. Keep this state update for
    // immediate UI feedback, but do not persist a preference that can later
    // contradict an explicit URL.
    setLangState(l);
  };

  const t = (key: TranslationKey): string =>
    ((translations[lang] as Record<string, string>)[key]) ??
    ((translations["en"] as Record<string, string>)[key]) ??
    key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
