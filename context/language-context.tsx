"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "ms" | "zh";

// ─── ALL TRANSLATIONS ───────────────────────────────────────────────
export const translations = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_call: "Call Support",
    nav_book: "Book Now",
    nav_topbar: "Same-day Aircond Service Across KL & Selangor",

    // Hero
    hero_badge: "⭐ TOP RATED 4.9 / 5 ON GOOGLE MAPS REVIEWS",
    hero_h1_line1: "Expert Aircond Services",
    hero_h1_line2: "In KL & Selangor",
    hero_desc:
      "Premium residential and commercial HVAC solutions by KL Renovator. Specialist pressure chemical wash, chemical overhaul, precision troubleshooting, leak repairs, and gas balancing. Rapid response teams across Klang Valley.",
    hero_whatsapp: "Book Via WhatsApp",
    hero_call: "Call +60 18-298 3573",
    hero_trust1: "Same-Day Scheduled Visits",
    hero_trust2: "Expert Aircond Technicians",
    hero_trust3: "Transparent Upfront Rates",

    // Stats
    stats_customers: "Happy Klang Valley Customers",
    stats_years: "Years HVAC Experience",
    stats_reviews: "5-Star Verified Reviews",
    stats_response: "Emergency Response Time",

    // Services Section
    services_eyebrow: "Premium Aircond Solutions",
    services_title1: "Transparent ",
    services_title2: "Aircond Pricing",
    services_desc:
      "No hidden fees. Professional residential and commercial HVAC services across Kuala Lumpur and Selangor with upfront, competitive rates.",
    services_residential: "Residential Services",
    services_commercial: "Commercial Services",
    services_from: "From",
    services_book: "Book This Service",
    services_view: "View Details",

    // Why Choose Us
    why_eyebrow: "Why KL Renovator",
    why_title1: "Trusted by ",
    why_title2: "5,000+ Customers",
    why_1_title: "10+ Years Experience",
    why_1_desc: "Decade of HVAC expertise across Klang Valley residential and commercial properties.",
    why_2_title: "Same-Day Response",
    why_2_desc: "Emergency calls answered fast. Most jobs scheduled within hours of your booking.",
    why_3_title: "Transparent Pricing",
    why_3_desc: "No hidden charges. Every quote is itemized before we start any work.",
    why_4_title: "All Brands Covered",
    why_4_desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung — we service them all.",
    why_5_title: "Certified Technicians",
    why_5_desc: "All technicians are trained, insured, and carry proper HVAC certification.",
    why_6_title: "Satisfaction Guaranteed",
    why_6_desc: "If you're not happy, we come back. 100% service satisfaction guarantee.",

    // Reviews
    reviews_eyebrow: "Google Reviews",
    reviews_title1: "What Our ",
    reviews_title2: "Customers Say",
    reviews_verified: "Verified Google Review",

    // CTA / Ready To Book
    cta_eyebrow: "Get In Touch",
    cta_title1: "Ready To Book ",
    cta_title2: "Your Service?",
    cta_desc: "Contact us now via WhatsApp or call for same-day appointments across KL & Selangor.",
    cta_whatsapp: "Book Via WhatsApp",
    cta_call: "Call Now",

    // Footer
    footer_desc:
      "Premium residential and commercial airconditioning across Kuala Lumpur & Selangor. Managed under Multicore Dynamic Resources.",
    footer_dispatch: "Direct Dispatch",
    footer_services: "Our Services",
    footer_areas: "Service Areas",
    footer_rights: "All rights reserved.",
    footer_hours: "Mon–Sun · 9:00 AM – 6:00 PM",

    // Language button
    lang_label: "Language",
  },

  ms: {
    nav_home: "Utama",
    nav_about: "Tentang Kami",
    nav_services: "Perkhidmatan",
    nav_faq: "Soalan Lazim",
    nav_contact: "Hubungi",
    nav_call: "Hubungi Kami",
    nav_book: "Tempah Sekarang",
    nav_topbar: "Servis Aircond Hari Sama Seluruh KL & Selangor",

    hero_badge: "⭐ PENILAIAN TERTINGGI 4.9 / 5 DI GOOGLE MAPS",
    hero_h1_line1: "Pakar Servis Aircond",
    hero_h1_line2: "KL & Selangor",
    hero_desc:
      "Penyelesaian HVAC kediaman dan komersial premium oleh KL Renovator. Pakar cuci kimia, overhaul kimia, penyelesaian masalah, pembaikan kebocoran, dan mengimbang gas. Pasukan tindak balas pantas seluruh Lembah Klang.",
    hero_whatsapp: "Tempah Via WhatsApp",
    hero_call: "Hubungi +60 18-298 3573",
    hero_trust1: "Lawatan Hari Sama",
    hero_trust2: "Juruteknik Aircond Pakar",
    hero_trust3: "Kadar Telus & Jelas",

    stats_customers: "Pelanggan Lembah Klang Gembira",
    stats_years: "Tahun Pengalaman HVAC",
    stats_reviews: "Ulasan Bintang 5 Disahkan",
    stats_response: "Masa Tindak Balas Kecemasan",

    services_eyebrow: "Penyelesaian Aircond Premium",
    services_title1: "Harga Aircond ",
    services_title2: "Yang Telus",
    services_desc:
      "Tiada bayaran tersembunyi. Perkhidmatan HVAC profesional merentasi Kuala Lumpur dan Selangor dengan kadar kompetitif yang jelas.",
    services_residential: "Perkhidmatan Kediaman",
    services_commercial: "Perkhidmatan Komersial",
    services_from: "Dari",
    services_book: "Tempah Perkhidmatan Ini",
    services_view: "Lihat Butiran",

    why_eyebrow: "Mengapa KL Renovator",
    why_title1: "Dipercayai ",
    why_title2: "5,000+ Pelanggan",
    why_1_title: "10+ Tahun Pengalaman",
    why_1_desc: "Dekad kepakaran HVAC merentasi hartanah kediaman dan komersial Lembah Klang.",
    why_2_title: "Tindak Balas Hari Sama",
    why_2_desc: "Panggilan kecemasan dijawab cepat. Kebanyakan kerja dijadualkan dalam beberapa jam.",
    why_3_title: "Harga Telus",
    why_3_desc: "Tiada caj tersembunyi. Setiap sebut harga terperinci sebelum kerja dimulakan.",
    why_4_title: "Semua Jenama Diliputi",
    why_4_desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung — kami servis semua.",
    why_5_title: "Juruteknik Bertauliah",
    why_5_desc: "Semua juruteknik terlatih, diinsurankan, dan mempunyai sijil HVAC yang betul.",
    why_6_title: "Kepuasan Terjamin",
    why_6_desc: "Jika anda tidak berpuas hati, kami akan kembali. Jaminan kepuasan servis 100%.",

    reviews_eyebrow: "Ulasan Google",
    reviews_title1: "Apa Kata ",
    reviews_title2: "Pelanggan Kami",
    reviews_verified: "Ulasan Google Disahkan",

    cta_eyebrow: "Hubungi Kami",
    cta_title1: "Bersedia Untuk Tempah ",
    cta_title2: "Servis Anda?",
    cta_desc: "Hubungi kami sekarang melalui WhatsApp atau telefon untuk temujanji hari sama di seluruh KL & Selangor.",
    cta_whatsapp: "Tempah Via WhatsApp",
    cta_call: "Hubungi Sekarang",

    footer_desc:
      "Penyamanan udara kediaman dan komersial premium merentasi Kuala Lumpur & Selangor. Diuruskan di bawah Multicore Dynamic Resources.",
    footer_dispatch: "Hubungi Terus",
    footer_services: "Perkhidmatan Kami",
    footer_areas: "Kawasan Servis",
    footer_rights: "Hak cipta terpelihara.",
    footer_hours: "Isnin–Ahad · 9:00 PG – 6:00 PTG",

    lang_label: "Bahasa",
  },

  zh: {
    nav_home: "首页",
    nav_about: "关于我们",
    nav_services: "服务",
    nav_faq: "常见问题",
    nav_contact: "联系我们",
    nav_call: "致电支持",
    nav_book: "立即预约",
    nav_topbar: "当天冷气服务，覆盖吉隆坡及雪兰莪全区",

    hero_badge: "⭐ 谷歌地图评分 4.9 / 5 — 最高评价",
    hero_h1_line1: "专业冷气服务",
    hero_h1_line2: "吉隆坡 & 雪兰莪",
    hero_desc:
      "KL Renovator 提供优质住宅及商业冷暖气系统解决方案。专业化学清洗、化学大修、故障排除、漏水维修及冷媒充注。快速响应团队覆盖巴生谷全区。",
    hero_whatsapp: "通过 WhatsApp 预约",
    hero_call: "致电 +60 18-298 3573",
    hero_trust1: "当天预约上门",
    hero_trust2: "专业冷气技术员",
    hero_trust3: "透明收费，无隐藏费用",

    stats_customers: "巴生谷满意客户",
    stats_years: "年 HVAC 经验",
    stats_reviews: "五星级认证评价",
    stats_response: "紧急响应时间",

    services_eyebrow: "优质冷气解决方案",
    services_title1: "透明 ",
    services_title2: "冷气价格",
    services_desc:
      "无隐藏收费。专业住宅及商业冷暖气服务，覆盖吉隆坡及雪兰莪，提供透明竞争性价格。",
    services_residential: "住宅服务",
    services_commercial: "商业服务",
    services_from: "起价",
    services_book: "预约此服务",
    services_view: "查看详情",

    why_eyebrow: "为何选择 KL Renovator",
    why_title1: "超过 ",
    why_title2: "5,000 位客户信赖",
    why_1_title: "10 年以上经验",
    why_1_desc: "十年来服务巴生谷住宅及商业冷暖气系统的丰富经验。",
    why_2_title: "当天响应",
    why_2_desc: "紧急来电快速响应，大多数工作在预约后数小时内安排。",
    why_3_title: "透明收费",
    why_3_desc: "无隐藏费用，所有报价在开工前逐项列明。",
    why_4_title: "覆盖所有品牌",
    why_4_desc: "大金、松下、三菱、约克、美的、LG、三星 — 我们全部服务。",
    why_5_title: "持证技术员",
    why_5_desc: "所有技术员均经过培训、投保，并持有正规 HVAC 认证。",
    why_6_title: "满意保证",
    why_6_desc: "如您不满意，我们将再次上门。100% 服务满意保证。",

    reviews_eyebrow: "谷歌评价",
    reviews_title1: "客户 ",
    reviews_title2: "怎么说",
    reviews_verified: "已认证谷歌评价",

    cta_eyebrow: "联系我们",
    cta_title1: "准备好预约 ",
    cta_title2: "您的服务了吗？",
    cta_desc: "立即通过 WhatsApp 或电话联系我们，预约吉隆坡及雪兰莪当天上门服务。",
    cta_whatsapp: "通过 WhatsApp 预约",
    cta_call: "立即致电",

    footer_desc:
      "覆盖吉隆坡及雪兰莪的优质住宅及商业冷暖气服务，由 Multicore Dynamic Resources 管理。",
    footer_dispatch: "直接联系",
    footer_services: "我们的服务",
    footer_areas: "服务区域",
    footer_rights: "版权所有。",
    footer_hours: "周一至周日 · 上午 9:00 – 下午 6:00",

    lang_label: "语言",
  },
};

// ─── CONTEXT ─────────────────────────────────────────────────────────
type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations["en"]) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => translations["en"][k],
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("klr_lang") as Lang | null;
    if (saved && ["en", "ms", "zh"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("klr_lang", l);
  };

  const t = (key: keyof typeof translations["en"]) =>
    translations[lang]?.[key] ?? translations["en"][key];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
  
