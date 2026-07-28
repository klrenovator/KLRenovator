"use client";

import { FiCheck, FiX, FiShield, FiDollarSign, FiClock, FiStar } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { waLink } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa6";
import NextLink from "next/link";
import { sitePublic } from "@/config/site-public";

// ═══════════════════════════════════════════════════════════════════════
// 20K.111 — Price Transparency Market Comparison UI
// Highlights KL Renovator's transparent pricing & warranty vs typical
// competitor practices. Multilingual EN/MS/ZH. Reusable component.
// ═══════════════════════════════════════════════════════════════════════

type ComparisonLocale = "en" | "ms" | "zh";

interface ComparisonRow {
  icon: "price" | "hidden" | "warranty" | "registered" | "parts" | "reviews" | "confirm" | "speed";
  label: string;
  klr: string;   // KL Renovator's value
  them: string;  // competitor typical behavior
  klrGood: boolean;
}

const ICON_MAP = {
  price: FiDollarSign,
  hidden: FiX,
  warranty: FiShield,
  registered: FiCheck,
  parts: FiDollarSign,
  reviews: FiStar,
  confirm: FiCheck,
  speed: FiClock,
};

// ─── Data per locale ──────────────────────────────────────────────────
const DATA: Record<ComparisonLocale, {
  badge: string;
  heading: string;
  subheading: string;
  klrLabel: string;
  themLabel: string;
  rows: ComparisonRow[];
  ctaText: string;
  ctaSub: string;
  trustPills: string[];
}> = {
  en: {
    badge: "Why Choose KL Renovator",
    heading: "Transparent Pricing vs The Typical Aircond Service Market",
    subheading: "We publish real prices. Others make you call first. Here's what that means for your wallet.",
    klrLabel: "KL Renovator",
    themLabel: "Typical Competitors",
    rows: [
      { icon: "price", label: "Price Display", klr: "Full price list published online — you see RM 99, RM 120, RM 220 before you even call.", them: "No prices online. \"Call for quote\" — price depends on who answers the phone.", klrGood: true },
      { icon: "confirm", label: "Quote Before Work", klr: "Price confirmed in writing before any work begins. No surprises.", them: "Quote given verbally, often changes after \"inspection\" with add-on charges.", klrGood: true },
      { icon: "hidden", label: "Hidden Fees", klr: "Zero hidden fees. Materials, transport & labour included in the starting price.", them: "Transport fee, service charge, weekend surcharge — all added after arrival.", klrGood: true },
      { icon: "warranty", label: "Workmanship Warranty", klr: "1-month written workmanship warranty on every service. If it fails within 30 days, we return free.", them: "Most offer no warranty. If they do, it's verbal only — no written guarantee.", klrGood: true },
      { icon: "registered", label: "Business Registration", klr: `SSM registered (${sitePublic.ssm}). Legitimate Malaysian business with a track record.`, them: "Many are unregistered freelancers operating from a personal phone number.", klrGood: true },
      { icon: "parts", label: "Parts & Materials", klr: "Genuine or OEM-equivalent parts from trusted Malaysian suppliers. Quote before replacement.", them: "Unknown part sources. Some use recycled or counterfeit components.", klrGood: true },
      { icon: "reviews", label: "Verified Reviews", klr: `500+ Google Reviews with real job photos. Read what actual customers say.`, them: "Few or no reviews — or fake reviews from inactive accounts.", klrGood: true },
    ],
    ctaText: "Get Your Transparent Quote Now",
    ctaSub: "Same-day service available. Price confirmed before we touch your unit.",
    trustPills: ["SSM Registered", "1-Month Warranty", "500+ Reviews", "Price Confirmed First"],
  },
  ms: {
    badge: "Kenapa Pilih KL Renovator",
    heading: "Harga Telus vs Pasaran Servis Aircond Biasa",
    subheading: "Kami paparkan harga sebenar. Orang lain suruh anda telefon dulu. Ini maksudnya untuk dompet anda.",
    klrLabel: "KL Renovator",
    themLabel: "Pesaing Biasa",
    rows: [
      { icon: "price", label: "Paparan Harga", klr: "Senarai harga penuh disiarkan dalam talian — anda lihat RM 99, RM 120, RM 220 sebelum membuat panggilan.", them: "Tiada harga dalam talian. \"Telefon untuk sebut harga\" — harga bergantung kepada siapa yang menjawab telefon.", klrGood: true },
      { icon: "confirm", label: "Sebut Harga Sebelum Kerja", klr: "Harga disahkan secara bertulis sebelum sebarang kerja dimulakan. Tiada kejutan.", them: "Sebut harga diberi secara lisan, sering berubah selepas \"pemeriksaan\" dengan caj tambahan.", klrGood: true },
      { icon: "hidden", label: "Yuran Tersembunyi", klr: "Sifar yuran tersembunyi. Bahan, pengangkutan & buruh termasuk dalam harga permulaan.", them: "Yuran pengangkutan, caj servis, surcaj hujung minggu — semua ditambah selepas ketibaan.", klrGood: true },
      { icon: "warranty", label: "Waranti Kerja", klr: "Waranti kerja bertulis 1 bulan untuk setiap servis. Jika rosak dalam 30 hari, kami kembali percuma.", them: "Kebanyakan tidak menawarkan waranti. Jika ada pun, hanya secara lisan — tiada jaminan bertulis.", klrGood: true },
      { icon: "registered", label: "Pendaftaran Perniagaan", klr: `Berdaftar SSM (${sitePublic.ssm}). Perniagaan Malaysia yang sah dengan rekod prestasi.`, them: "Ramai adalah pekerja bebas tidak berdaftar yang beroperasi dari nombor telefon peribadi.", klrGood: true },
      { icon: "parts", label: "Alat Ganti & Bahan", klr: "Alat ganti asli atau setara OEM daripada pembekal Malaysia yang dipercayai. Sebut harga sebelum penggantian.", them: "Sumber alat ganti tidak diketahui. Ada yang menggunakan komponen kitar semula atau tiruan.", klrGood: true },
      { icon: "reviews", label: "Ulasan Disahkan", klr: `500+ Ulasan Google dengan foto kerja sebenar. Baca apa kata pelanggan sebenar.`, them: "Sedikit atau tiada ulasan — atau ulasan palsu dari akaun tidak aktif.", klrGood: true },
    ],
    ctaText: "Dapatkan Sebut Harga Telus Anda Sekarang",
    ctaSub: "Servis hari sama tersedia. Harga disahkan sebelum kami sentuh unit anda.",
    trustPills: ["Berdaftar SSM", "Waranti 1 Bulan", "500+ Ulasan", "Harga Disahkan Dahulu"],
  },
  zh: {
    badge: "为什么选择 KL Renovator",
    heading: "透明价格 vs 常见冷气服务市场",
    subheading: "我们公开真实价格。别人让您先打电话。这对您的钱包意味着什么。",
    klrLabel: "KL Renovator",
    themLabel: "普通竞争对手",
    rows: [
      { icon: "price", label: "价格展示", klr: "完整价格表在线公开——您在打电话前就能看到 RM 99、RM 120、RM 220。", them: "网上没有价格。\"来电咨询\"——价格取决于谁接电话。", klrGood: true },
      { icon: "confirm", label: "施工前报价", klr: "任何工作开始前以书面形式确认价格。无意外收费。", them: "口头报价，经\"检查\"后经常变更，另加附加费用。", klrGood: true },
      { icon: "hidden", label: "隐藏费用", klr: "零隐藏费用。材料费、交通费和人工费均包含在起步价内。", them: "交通费、服务费、周末附加费——全部在到达后添加。", klrGood: true },
      { icon: "warranty", label: "工艺保修", klr: "每次服务提供 1 个月书面工艺保修。若 30 天内出现问题，我们免费返工。", them: "多数不提供保修。即使有，也只口头承诺——没有书面保证。", klrGood: true },
      { icon: "registered", label: "商业注册", klr: `SSM 注册（${sitePublic.ssm}）。合法的马来西亚企业，有业绩记录。`, them: "很多是使用个人电话号码运营的未注册自由职业者。", klrGood: true },
      { icon: "parts", label: "零件与材料", klr: "来自可信赖马来西亚供应商的正品或等同等部件。更换前先报价。", them: "零件来源不明。有些使用回收或假冒组件。", klrGood: true },
      { icon: "reviews", label: "真实评价", klr: `500+ 条 Google 评价，附真实工作照片。阅读真实客户的评价。`, them: "评价很少或没有——或来自不活跃账户的虚假评价。", klrGood: true },
    ],
    ctaText: "立即获取透明报价",
    ctaSub: "提供当天服务。价格在接触您的机器前确认。",
    trustPills: ["SSM 注册", "1 个月保修", "500+ 评价", "先确认价格"],
  },
};

// ─── Props ────────────────────────────────────────────────────────────
interface Props {
  locale?: ComparisonLocale;
  /** Show compact version (fewer rows, smaller) for sidebar placement */
  compact?: boolean;
  /** Optional: prepend a service-specific intro */
  serviceName?: string;
}

export function PriceComparisonUI({ locale = "en", compact = false, serviceName }: Props) {
  const d = DATA[locale];
  const rows = compact ? d.rows.slice(0, 4) : d.rows;
  const waMsg = serviceName
    ? `Hi KL Renovator, I'd like a transparent quote for: ${serviceName}. My location is:`
    : "Hi KL Renovator, I'd like a transparent quote. My location is:";

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Badge + Heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4">
              <FiShield className="h-3 w-3" /> {d.badge}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950">
              {d.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {d.subheading}
            </p>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {d.trustPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-700"
              >
                <FiCheck className="h-3 w-3" /> {pill}
              </span>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-900 text-white">
              <div className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                &nbsp;
              </div>
              <div className="px-4 py-3 text-center text-xs font-black uppercase tracking-widest bg-sky-600">
                ✅ {d.klrLabel}
              </div>
              <div className="px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                ❌ {d.themLabel}
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {rows.map((row, i) => {
                const Icon = ICON_MAP[row.icon];
                return (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[1fr_1fr_1fr] ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    {/* Label */}
                    <div className="px-4 py-3 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide">{row.label}</span>
                    </div>
                    {/* KLR */}
                    <div className="px-4 py-3 bg-sky-50/40 border-l border-sky-100">
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">{row.klr}</p>
                    </div>
                    {/* Them */}
                    <div className="px-4 py-3 border-l border-slate-100">
                      <p className="text-xs text-slate-500 leading-relaxed italic">{row.them}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Row */}
            <div className="bg-sky-50 border-t border-sky-200 px-4 py-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-slate-900">{d.ctaText}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{d.ctaSub}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={waLink(waMsg)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider px-5 py-3 rounded-xl text-xs transition-all"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <NextLink
                    href="/services"
                    className="inline-flex items-center gap-1 border-2 border-sky-200 hover:border-sky-400 text-sky-700 font-black uppercase tracking-wider px-5 py-3 rounded-xl text-xs transition-all"
                  >
                    All Prices →
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
