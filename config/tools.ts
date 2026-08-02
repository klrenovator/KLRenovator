// ─────────────────────────────────────────────────────────────────────────
// Tool registry — single source of truth for the site's calculator/tool
// URLs, used by the /tools hub, footer, homepage and every internal-link
// strip. Add a new tool here and it appears everywhere automatically.
// ─────────────────────────────────────────────────────────────────────────

export interface ToolInfo {
  slug: string;
  /** Short display name (nav / cards / chips) — English. */
  title: string;
  /** Bahasa Malaysia display name. */
  titleMS: string;
  /** Mandarin display name. */
  titleZH: string;
  /** One-line description (English) for cards. */
  desc: string;
  /** One-line description (Bahasa Malaysia) for cards. */
  descMS: string;
  /** One-line description (Mandarin) for cards. */
  descZH: string;
  /** Emoji icon used across tool cards. */
  icon: string;
  /** The main search phrase the page targets (for anchor diversity). */
  anchor: string;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "/aircond-installation-cost-calculator",
    title: "Installation Cost Calculator",
    titleMS: "Kalkulator Kos Pemasangan",
    titleZH: "安装费用计算器",
    desc: "Instant aircond installation estimate — labour, copper pipe, wire, drain pipe, bracket, switch & water pump with bundle discounts.",
    descMS: "Anggaran pemasangan aircond serta-merta — buruh, paip tembaga, wayar, saliran, pendakap, suis & pam air dengan diskaun pakej.",
    descZH: "即时冷气安装估价 — 人工、铜管、电线、排水管、支架、开关和水泵，含批量折扣。",
    icon: "🔧",
    anchor: "Aircond Installation Cost Calculator",
  },
  {
    slug: "/aircond-gas-topup-cost-calculator",
    title: "Gas Top-up Cost Estimator",
    titleMS: "Anggaran Kos Tambah Gas",
    titleZH: "加气费用估算器",
    desc: "Estimate R22, R410A & R32 gas top-up cost by HP and gas condition — charged per actual PSI after inspection.",
    descMS: "Anggarkan kos tambah gas R22, R410A & R32 mengikut HP dan keadaan gas — dicaj mengikut PSI sebenar selepas pemeriksaan.",
    descZH: "按匹数和气体状况估算R22、R410A和R32加气费用 — 按检查后的实际PSI收费。",
    icon: "⛽",
    anchor: "Aircond Gas Top-up Cost Calculator",
  },
  {
    slug: "/which-aircond-service-do-i-need",
    title: "Service Recommendation Tool",
    titleMS: "Alat Cadangan Servis",
    titleZH: "服务推荐工具",
    desc: "Answer 4 quick questions and find out whether you need basic service, chemical wash, overhaul, gas top-up or repair.",
    descMS: "Jawab 4 soalan pantas dan ketahui sama ada anda perlukan servis asas, cuci kimia, overhaul, tambah gas atau pembaikan.",
    descZH: "回答4个快速问题，了解您需要基本保养、化学清洗、大修、加气还是维修。",
    icon: "🩺",
    anchor: "Which Aircond Service Do I Need?",
  },
  {
    slug: "/btu-calculator",
    title: "BTU / HP Calculator",
    titleMS: "Kalkulator BTU / HP",
    titleZH: "BTU/匹数计算器",
    desc: "Enter room dimensions, sun exposure, people & windows to find the exact BTU and HP your room needs.",
    descMS: "Masukkan dimensi bilik, pendedahan matahari, orang & tingkap untuk mencari BTU dan HP yang tepat untuk bilik anda.",
    descZH: "输入房间尺寸、日照、人数和窗户，找出房间所需的精确BTU和匹数。",
    icon: "📐",
    anchor: "Aircond BTU Calculator",
  },
  {
    slug: "/aircond-size-calculator",
    title: "Aircond Size Calculator",
    titleMS: "Kalkulator Saiz Aircond",
    titleZH: "冷气尺寸计算器",
    desc: "Room size + type + usage + heat exposure → recommended HP, BTU and suitable aircond capacity.",
    descMS: "Saiz bilik + jenis + penggunaan + pendedahan haba → HP, BTU dan kapasiti aircond yang disyorkan.",
    descZH: "房间大小 + 类型 + 使用 + 受热 → 推荐匹数、BTU和合适的冷气容量。",
    icon: "📏",
    anchor: "Aircond Size Calculator",
  },
  {
    slug: "/aircond-electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    titleMS: "Kalkulator Kos Elektrik",
    titleZH: "电费计算器",
    desc: "Estimate your monthly aircond electricity bill by HP, daily usage hours and your TNB electricity rate.",
    descMS: "Anggarkan bil elektrik aircond bulanan mengikut HP, jam penggunaan harian dan kadar elektrik TNB anda.",
    descZH: "按匹数、每日使用小时数和您的TNB电费费率估算每月冷气电费。",
    icon: "⚡",
    anchor: "Aircond Electricity Cost Calculator",
  },
  {
    slug: "/aircond-savings-calculator",
    title: "Inverter Savings Calculator",
    titleMS: "Kalkulator Penjimatan Inverter",
    titleZH: "变频节省计算器",
    desc: "Compare old non-inverter vs new inverter aircond — monthly savings, yearly savings and payback period.",
    descMS: "Bandingkan aircond bukan inverter lama vs inverter baharu — penjimatan bulanan, tahunan dan tempoh pulangan.",
    descZH: "对比旧非变频机与新型变频机 — 每月节省、每年节省和回本周期。",
    icon: "💰",
    anchor: "Inverter Aircond Savings Calculator",
  },
];

export function toolBySlug(slug: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
