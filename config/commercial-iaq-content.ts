/**
 * Commercial (B2B) service hub + Indoor Air Quality hub — authored content.
 *
 * Issue #75: two commercially significant clusters were near-empty. The site
 * already had a `/commercial-aircond-installation` landing (install only) and a
 * `maintenance-contract` service page, but no B2B *servicing / maintenance*
 * hub, and almost no indoor-air-quality editorial tied to the chemical-wash
 * service it already sells.
 *
 * This module holds the trilingual copy for both hubs so:
 *   - every price / warranty figure resolves from `lib/published-prices.ts`
 *     (which throws if a pricing row is renamed — no hand-typed "RM 120"),
 *   - EN / MS / ZH are authored separately (not machine-mirrored), and
 *   - the two pages stay in sync on facts while reading naturally per language.
 *
 * Health-claim discipline (IAQ): copy describes what a chemical wash physically
 * REMOVES (mould, biofilm, dust, odour on the coil and blower) and never makes
 * a medical/therapeutic claim about curing allergies, asthma or illness.
 */

import { publishedPrices } from "@/lib/published-prices";

export type HubLocale = "en" | "ms" | "zh";

type Tri = { en: string; ms: string; zh: string };
type TriList = { en: string[]; ms: string[]; zh: string[] };

export type HubFaq = { q: string; a: string };
export type HubFaqSet = { en: HubFaq[]; ms: HubFaq[]; zh: HubFaq[] };

// ── Authorities cited (see issue #64 machinery / commercial-proof-blocks) ──
export const HUB_CITATIONS: {
  label: string;
  href: string;
  en: string;
  ms: string;
  zh: string;
}[] = [
  {
    label: "Energy Commission Malaysia — MEPS for air conditioners",
    href: "https://www.st.gov.my/contents/2021/MEPS/20210108%20-Guide%20on%20MEPS%20for%20AC%20(UPDATED).pdf",
    en: "Energy Commission guidance on minimum energy-performance standards and efficiency labels",
    ms: "panduan Suruhanjaya Tenaga tentang piawaian prestasi tenaga minimum dan label kecekapan",
    zh: "马来西亚能源委员会关于最低能效标准（MEPS）与能效标签的指南",
  },
  {
    label: "TNB — understanding electricity usage and tariffs",
    href: "https://www.mytnb.com.my/residential/understand-your-bill/online-bill-layout",
    en: "TNB guidance on kWh usage, tariff blocks and reading a commercial electricity bill",
    ms: "panduan TNB tentang penggunaan kWh, blok tarif dan membaca bil elektrik komersial",
    zh: "TNB 关于 kWh 用量、电费结构与阅读商用电费单的说明",
  },
  {
    label: "DOSH Malaysia — work-at-height guidance",
    href: "https://www.dosh.gov.my/index.php/construction-safety-v/work-at-height",
    en: "DOSH work-at-height guidance for safe access to ceiling-cassette and rooftop condenser units",
    ms: "panduan JKKP/DOSH kerja di tempat tinggi untuk akses selamat ke unit kaset siling dan kondenser bumbung",
    zh: "马来西亚职业安全卫生局关于高处作业安全通道（天花机与屋顶室外机）的指引",
  },
];

/* ────────────────────────────── COMMERCIAL HUB ────────────────────────────── */

export const COMMERCIAL_META = {
  title: {
    en: "Commercial Aircond Service KL — Office, Shoplot & F&B AMC",
    ms: "Servis Aircond Komersial KL — Pejabat, Kedai & AMC F&B",
    zh: "商用冷气保养服务 KL — 办公室、店屋与餐饮 AMC",
  } as Tri,
  description: {
    en: "Commercial aircond servicing, chemical wash & maintenance contracts (AMC) for offices, shoplots, restaurants & clinics across KL & Selangor. After-hours slots, all 20 brands, transparent per-unit pricing.",
    ms: "Servis aircond komersial, cuci kimia & kontrak penyelenggaraan (AMC) untuk pejabat, kedai, restoran & klinik di KL & Selangor. Slot luar waktu, semua 20 jenama, harga per unit telus.",
    zh: "为吉隆坡与雪兰莪的办公室、店屋、餐厅与诊所提供商用冷气保养、化学清洗及维护合约（AMC）。可安排非营业时间、支持全部20个品牌、每台价格透明。",
  } as Tri,
};

export const COMMERCIAL_HERO = {
  eyebrow: {
    en: "B2B Aircond Servicing & Maintenance",
    ms: "Servis & Penyelenggaraan Aircond B2B",
    zh: "商用冷气保养与维护",
  } as Tri,
  h1: {
    en: "Commercial Aircond Service in KL & Selangor",
    ms: "Servis Aircond Komersial di KL & Selangor",
    zh: "吉隆坡与雪兰莪商用冷气保养服务",
  } as Tri,
  subtitle: {
    en: "Offices · Shoplots · F&B · Clinics · Multi-Unit AMC",
    ms: "Pejabat · Kedai · F&B · Klinik · AMC Berbilang Unit",
    zh: "办公室 · 店屋 · 餐饮 · 诊所 · 多机 AMC",
  } as Tri,
  intro: {
    en: "Keeping a business cool is different from a home visit — downtime costs money, ceiling-cassette units sit above customers, and finance teams need a clean invoice. KL Renovator runs scheduled servicing, chemical washes and annual maintenance contracts (AMC) for commercial properties across KL & Selangor, with after-hours slots so your operations never stop.",
    ms: "Menyejukkan perniagaan berbeza daripada lawatan rumah — waktu henti membebankan kos, unit kaset siling berada di atas pelanggan, dan pasukan kewangan perlukan invois kemas. KL Renovator menjalankan servis berjadual, cuci kimia dan kontrak penyelenggaraan tahunan (AMC) untuk hartanah komersial di KL & Selangor, dengan slot luar waktu supaya operasi anda tidak terhenti.",
    zh: "让商业场所保持凉爽和上门服务住宅不同——停机就是损失、天花嵌入机就在顾客头顶、财务部门需要一张规范的发票。KL Renovator 为吉隆坡与雪兰莪的商用物业提供定期保养、化学清洗与年度维护合约（AMC），并可安排非营业时间上门，让您的运营不中断。",
  } as Tri,
  badges: {
    en: ["After-hours & weekend slots", "All 20 brands serviced", "SST-ready business invoicing"],
    ms: ["Slot luar waktu & hujung minggu", "Semua 20 jenama diservis", "Invois perniagaan sedia SST"],
    zh: ["可安排非营业时间与周末", "支持全部20个品牌", "可开具含SST的商用发票"],
  } as TriList,
};

export const COMMERCIAL_SEGMENTS: {
  key: string;
  title: Tri;
  body: Tri;
  points: TriList;
}[] = [
  {
    key: "office",
    title: { en: "Offices & Towers", ms: "Pejabat & Menara", zh: "办公室与写字楼" },
    body: {
      en: "Open-plan floors, meeting rooms and server closets each carry a different heat load. We service wall-mounted and ceiling-cassette units on a scheduled cycle so cooling stays even and filters never clog to the point of tripping.",
      ms: "Lantai ruang terbuka, bilik mesyuarat dan bilik pelayan masing-masing membawa beban haba berbeza. Kami servis unit dinding dan kaset siling mengikut jadual supaya penyejukan sekata dan penapis tidak tersumbat sehingga trip.",
      zh: "开放式楼层、会议室与服务器机房各有不同热负荷。我们按周期保养壁挂机与天花嵌入机，让制冷均匀、滤网不会堵到跳电。",
    },
    points: {
      en: ["Scheduled quarterly or half-yearly servicing", "Ceiling-cassette 2.0–6.0 HP coverage", "Weekend work to avoid disrupting staff"],
      ms: ["Servis suku tahun atau setengah tahun berjadual", "Liputan kaset siling 2.0–6.0 HP", "Kerja hujung minggu elak ganggu staf"],
      zh: ["按季度或半年定期保养", "覆盖2.0–6.0 HP天花嵌入机", "周末施工，不打扰员工"],
    },
  },
  {
    key: "shoplot",
    title: { en: "Shoplots & Retail", ms: "Kedai & Runcit", zh: "店屋与零售" },
    body: {
      en: "Glass-front shops heat up fast and a warm store loses browsing time. We keep retail units clean and cooling hard, and schedule visits before opening or after closing so the shopfloor is never blocked.",
      ms: "Kedai depan kaca cepat panas dan kedai yang panas kehilangan masa melihat-lihat. Kami pastikan unit runcit bersih dan menyejuk kuat, serta jadualkan lawatan sebelum buka atau selepas tutup supaya ruang jualan tidak terhalang.",
      zh: "玻璃门面的店铺升温快，闷热会缩短顾客停留时间。我们让零售机保持清洁、制冷有力，并安排在开门前或关门后上门，绝不占用卖场。",
    },
    points: {
      en: ["Before-open / after-close scheduling", "Wall-mounted & cassette servicing", "Fast in-and-out to protect displays"],
      ms: ["Jadual sebelum buka / selepas tutup", "Servis unit dinding & kaset", "Masuk-keluar pantas lindungi pameran"],
      zh: ["开门前 / 关门后安排", "壁挂机与嵌入机保养", "快速进出，保护陈列"],
    },
  },
  {
    key: "fnb",
    title: { en: "Restaurants & F&B", ms: "Restoran & F&B", zh: "餐厅与餐饮" },
    body: {
      en: "Kitchen grease and cooking oil vapour coat evaporator coils faster than any other setting, which is why F&B units need a shorter chemical-wash cycle. We plan washes around service hours and clear the grease that ordinary cleaning leaves behind.",
      ms: "Gris dapur dan wap minyak masak melekat pada gegelung evaporator lebih cepat daripada tempat lain, sebab itu unit F&B perlukan kitaran cuci kimia lebih kerap. Kami rancang cuci mengikut waktu operasi dan buang gris yang pembersihan biasa tinggalkan.",
      zh: "厨房油烟比任何场所都更快在蒸发盘管上结油垢，因此餐饮机需要更短的化学清洗周期。我们围绕营业时间安排清洗，清除普通保养留下的油垢。",
    },
    points: {
      en: ["Shorter chemical-wash cycle for kitchens", "Grease & odour removal on coil + blower", "Dining-area cassette servicing"],
      ms: ["Kitaran cuci kimia lebih kerap untuk dapur", "Buang gris & bau pada gegelung + blower", "Servis kaset kawasan makan"],
      zh: ["厨房化学清洗周期更短", "清除盘管与风轮上的油垢与异味", "用餐区嵌入机保养"],
    },
  },
  {
    key: "clinic",
    title: { en: "Clinics & Offices with Patients", ms: "Klinik & Pejabat Berpesakit", zh: "诊所与接待病患的场所" },
    body: {
      en: "Waiting rooms and consultation rooms need quiet, stable, clean cooling. Regular chemical washes keep the coil and blower free of the mould and biofilm that cause a musty smell in a closed, air-conditioned room.",
      ms: "Bilik menunggu dan bilik rundingan perlukan penyejukan senyap, stabil dan bersih. Cuci kimia berkala memastikan gegelung dan blower bebas daripada kulat dan biofilem yang menyebabkan bau hapak dalam bilik berhawa dingin tertutup.",
      zh: "候诊室与诊室需要安静、稳定、洁净的制冷。定期化学清洗让盘管与风轮远离霉菌与生物膜——它们正是密闭空调房内霉味的来源。",
    },
    points: {
      en: ["Quiet, low-disruption servicing", "Regular coil & blower chemical wash", "Scheduled around clinic hours"],
      ms: ["Servis senyap, gangguan minimum", "Cuci kimia gegelung & blower berkala", "Dijadual mengikut waktu klinik"],
      zh: ["安静、低干扰保养", "定期盘管与风轮化学清洗", "按诊所时间安排"],
    },
  },
];

/** Commercial pricing rows — every figure resolves from published-prices. */
export const COMMERCIAL_PRICING: {
  service: Tri;
  price: Tri;
  note: Tri;
}[] = [
  {
    service: { en: "Basic servicing · wall-mounted 1.0–1.5 HP", ms: "Servis asas · dinding 1.0–1.5 HP", zh: "基础保养 · 壁挂 1.0–1.5 HP" },
    price: { en: publishedPrices.basic15, ms: publishedPrices.basic15, zh: publishedPrices.basic15 },
    note: { en: "Per unit, per visit", ms: "Setiap unit, setiap lawatan", zh: "每台每次" },
  },
  {
    service: { en: "Basic servicing · ceiling cassette 1.0–1.5 HP", ms: "Servis asas · kaset siling 1.0–1.5 HP", zh: "基础保养 · 天花嵌入 1.0–1.5 HP" },
    price: { en: publishedPrices.basicCassette15, ms: publishedPrices.basicCassette15, zh: publishedPrices.basicCassette15 },
    note: { en: "Per unit, per visit", ms: "Setiap unit, setiap lawatan", zh: "每台每次" },
  },
  {
    service: { en: "Pressure chemical wash · wall-mounted 1.0–1.5 HP", ms: "Cuci kimia tekanan · dinding 1.0–1.5 HP", zh: "高压化学清洗 · 壁挂 1.0–1.5 HP" },
    price: { en: publishedPrices.chemicalWash15, ms: publishedPrices.chemicalWash15, zh: publishedPrices.chemicalWash15 },
    note: { en: "Recommended every 3–6 months for F&B", ms: "Disyorkan setiap 3–6 bulan untuk F&B", zh: "餐饮建议每3–6个月一次" },
  },
  {
    service: { en: "Pressure chemical wash · ceiling cassette 1.0–1.5 HP", ms: "Cuci kimia tekanan · kaset siling 1.0–1.5 HP", zh: "高压化学清洗 · 天花嵌入 1.0–1.5 HP" },
    price: { en: publishedPrices.chemicalWashCassette15, ms: publishedPrices.chemicalWashCassette15, zh: publishedPrices.chemicalWashCassette15 },
    note: { en: "Per unit, per visit", ms: "Setiap unit, setiap lawatan", zh: "每台每次" },
  },
  {
    service: { en: "Commercial installation · ceiling cassette 1.0–1.5 HP", ms: "Pemasangan komersial · kaset siling 1.0–1.5 HP", zh: "商用安装 · 天花嵌入 1.0–1.5 HP" },
    price: { en: publishedPrices.installCassette15, ms: publishedPrices.installCassette15, zh: publishedPrices.installCassette15 },
    note: { en: "Labour; see commercial installation page", ms: "Upah; lihat halaman pemasangan komersial", zh: "工费；详见商用安装页" },
  },
];

export const COMMERCIAL_PRICING_NOTE: Tri = {
  en: "Per-unit labour, confirmed before work starts — the same transparent price list as residential. Multi-unit and AMC contracts are quoted after a free site survey; after-hours work carries a flat surcharge agreed upfront. Every commercial job is covered by the 1-month workmanship warranty and can be invoiced with SST for business accounts.",
  ms: "Upah per unit, disahkan sebelum kerja bermula — senarai harga telus yang sama seperti kediaman. Kontrak berbilang unit dan AMC disebut harga selepas tinjauan tapak percuma; kerja luar waktu dikenakan caj tetap yang dipersetujui awal. Setiap kerja komersial dilindungi waranti kerja tangan 1 bulan dan boleh diinvois dengan SST untuk akaun perniagaan.",
  zh: "按台计工费，施工前确认——与住宅相同的透明价目表。多机与 AMC 合约在免费现场勘查后报价；非营业时间施工按事先约定的固定附加费计算。每一项商用作业均享1个月工艺保修，并可为企业账户开具含 SST 的发票。",
};

export const COMMERCIAL_AMC: {
  heading: Tri;
  intro: Tri;
  points: TriList;
} = {
  heading: {
    en: "Annual Maintenance Contracts (AMC) for multi-unit sites",
    ms: "Kontrak Penyelenggaraan Tahunan (AMC) untuk tapak berbilang unit",
    zh: "多机场所的年度维护合约（AMC）",
  },
  intro: {
    en: "For sites with several units, a scheduled contract is cheaper and more reliable than one-off call-outs. Preventive servicing keeps efficiency up — a coil choked with dust makes the compressor work harder and pushes the electricity bill up, as the Energy Commission's efficiency guidance explains.",
    ms: "Untuk tapak dengan beberapa unit, kontrak berjadual lebih murah dan boleh dipercayai berbanding panggilan sekali-sekala. Servis pencegahan mengekalkan kecekapan — gegelung tersumbat habuk memaksa kompresor bekerja lebih keras dan menaikkan bil elektrik, seperti dijelaskan panduan kecekapan Suruhanjaya Tenaga.",
    zh: "对于拥有多台机器的场所，定期合约比零星报修更省钱、更可靠。预防性保养可维持能效——盘管积尘会迫使压缩机更费力运转、推高电费，正如能源委员会的能效指南所述。",
  },
  points: {
    en: [
      "Scheduled visits — quarterly or half-yearly, planned around your hours",
      "One point of contact and one consolidated, SST-ready invoice",
      "Priority scheduling for breakdowns during the contract term",
      "Per-unit rates fixed for the year so budgeting is predictable",
    ],
    ms: [
      "Lawatan berjadual — suku tahun atau setengah tahun, dirancang ikut waktu anda",
      "Satu titik hubungan dan satu invois disatukan, sedia SST",
      "Penjadualan keutamaan untuk kerosakan dalam tempoh kontrak",
      "Kadar per unit ditetapkan untuk setahun supaya belanjawan boleh diramal",
    ],
    zh: [
      "定期上门——按季度或半年，围绕您的营业时间规划",
      "单一对接窗口，一张合并的、含SST的发票",
      "合约期内故障享优先排期",
      "每台价格全年锁定，预算可预测",
    ],
  },
};

export const COMMERCIAL_FAQS: HubFaqSet = {
  en: [
    { q: "Do you service commercial aircond outside business hours?", a: "Yes. We schedule evening, weekend and public-holiday slots so servicing does not interrupt trading. Before-open and after-close windows work well for retail and F&B; offices are usually done on weekends. After-hours work carries a flat surcharge that is agreed with you before the visit." },
    { q: "How often should a commercial aircond be serviced?", a: `It depends on the environment. A quiet office is fine on a half-yearly basic service from ${publishedPrices.basic15} per unit. A busy F&B kitchen coats its coil in grease far faster and should have a pressure chemical wash every 3–6 months, from ${publishedPrices.chemicalWash15} per wall-mounted unit. We recommend a cycle after a free site survey.` },
    { q: "Can you invoice my company with SST?", a: "Yes. Commercial jobs can be issued with a proper business invoice including SST where applicable, with one consolidated invoice for multi-unit and AMC work. Give us your company details when you book and we will format the paperwork your finance team needs." },
    { q: "Do you cover ceiling-cassette and multi-split systems?", a: "Yes — ceiling cassette, multi-split and wall-mounted units are all covered, across all 20 brands we service. Cassette units sit above the ceiling grid and are worked on following safe work-at-height practice; we bring the access equipment so your staff are not involved." },
    { q: "What does a commercial AMC include?", a: "A contract bundles scheduled servicing (quarterly or half-yearly), a single point of contact, priority scheduling for breakdowns during the term, and per-unit rates fixed for the year. It is quoted after a free site survey so the plan matches your actual unit count and usage. Every visit is covered by the 1-month workmanship warranty." },
    { q: "Which areas do you cover for commercial work?", a: "All of KL and Selangor — including the KLCC area, Bangsar South, Mont Kiara, Damansara, Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras and Klang. WhatsApp us your address and unit count for a site survey slot." },
  ],
  ms: [
    { q: "Adakah anda servis aircond komersial di luar waktu perniagaan?", a: "Ya. Kami jadualkan slot petang, hujung minggu dan cuti umum supaya servis tidak mengganggu operasi. Waktu sebelum buka dan selepas tutup sesuai untuk runcit dan F&B; pejabat biasanya dibuat pada hujung minggu. Kerja luar waktu dikenakan caj tetap yang dipersetujui sebelum lawatan." },
    { q: "Berapa kerap aircond komersial perlu diservis?", a: `Ia bergantung pada persekitaran. Pejabat yang tenang memadai dengan servis asas setengah tahun dari ${publishedPrices.basic15} setiap unit. Dapur F&B yang sibuk menyaluti gegelung dengan gris jauh lebih cepat dan patut dicuci kimia tekanan setiap 3–6 bulan, dari ${publishedPrices.chemicalWash15} setiap unit dinding. Kami syorkan kitaran selepas tinjauan tapak percuma.` },
    { q: "Boleh invois syarikat saya dengan SST?", a: "Ya. Kerja komersial boleh dikeluarkan dengan invois perniagaan yang sepatutnya termasuk SST jika berkenaan, dengan satu invois disatukan untuk kerja berbilang unit dan AMC. Beri kami butiran syarikat semasa tempahan dan kami sediakan dokumen yang diperlukan pasukan kewangan anda." },
    { q: "Adakah anda melindungi sistem kaset siling dan multi-split?", a: "Ya — unit kaset siling, multi-split dan dinding semuanya dilindungi, merentas semua 20 jenama yang kami servis. Unit kaset berada di atas grid siling dan dikerjakan mengikut amalan kerja di tempat tinggi yang selamat; kami bawa peralatan akses supaya staf anda tidak terlibat." },
    { q: "Apa yang termasuk dalam AMC komersial?", a: "Kontrak menggabungkan servis berjadual (suku tahun atau setengah tahun), satu titik hubungan, penjadualan keutamaan untuk kerosakan dalam tempoh, dan kadar per unit yang ditetapkan untuk setahun. Ia disebut harga selepas tinjauan tapak percuma supaya pelan sepadan dengan bilangan unit dan penggunaan sebenar. Setiap lawatan dilindungi waranti kerja tangan 1 bulan." },
    { q: "Kawasan mana anda liputi untuk kerja komersial?", a: "Seluruh KL dan Selangor — termasuk kawasan KLCC, Bangsar South, Mont Kiara, Damansara, Petaling Jaya, Subang Jaya, Shah Alam, Puchong, Cheras dan Klang. WhatsApp kami alamat dan bilangan unit anda untuk slot tinjauan tapak." },
  ],
  zh: [
    { q: "你们会在营业时间以外保养商用冷气吗？", a: "会。我们可安排傍晚、周末与公共假期的时段，让保养不打断营业。开门前与关门后的时段适合零售与餐饮；办公室通常安排在周末。非营业时间施工按事先约定的固定附加费计算。" },
    { q: "商用冷气应该多久保养一次？", a: `视环境而定。安静的办公室每半年做一次基础保养即可，每台自 ${publishedPrices.basic15} 起。繁忙的餐饮厨房会更快在盘管上结油垢，应每3–6个月做一次高压化学清洗，壁挂机每台自 ${publishedPrices.chemicalWash15} 起。我们会在免费现场勘查后建议周期。` },
    { q: "可以为我的公司开具含SST的发票吗？", a: "可以。商用作业可开具正规的企业发票（如适用含SST），多机与 AMC 作业可合并为一张发票。预约时提供公司资料，我们会按您财务部门需要的格式出具单据。" },
    { q: "你们支持天花嵌入机与多联机系统吗？", a: "支持——天花嵌入机、多联机与壁挂机均涵盖，覆盖我们服务的全部20个品牌。嵌入机位于天花板格栅之上，按安全的高处作业规范施工；我们自备登高设备，无需贵方员工参与。" },
    { q: "商用 AMC 包含什么？", a: "合约打包了定期保养（按季度或半年）、单一对接窗口、合约期内故障优先排期，以及全年锁定的每台价格。它在免费现场勘查后报价，让方案与您实际的机器数量和使用情况相符。每次上门均享1个月工艺保修。" },
    { q: "商用作业覆盖哪些地区？", a: "覆盖整个吉隆坡与雪兰莪——包括 KLCC 一带、Bangsar South、Mont Kiara、白沙罗、八打灵再也、梳邦再也、莎阿南、蒲种、蕉赖与巴生。请 WhatsApp 告知地址与机器数量以预约勘查时段。" },
  ],
};

/* ────────────────────────────── IAQ HUB ────────────────────────────── */

export const IAQ_META = {
  title: {
    en: "Indoor Air Quality & Aircond Chemical Wash — KL & Selangor",
    ms: "Kualiti Udara Dalaman & Cuci Kimia Aircond — KL & Selangor",
    zh: "室内空气质量与冷气化学清洗 — 吉隆坡与雪兰莪",
  } as Tri,
  description: {
    en: "How a dirty aircond affects the air in your room, and what a pressure chemical wash actually removes — mould, biofilm, dust and odour on the coil and blower. Tropical-humidity servicing advice for KL & Selangor. From RM 120.",
    ms: "Bagaimana aircond kotor menjejaskan udara bilik anda, dan apa yang cuci kimia tekanan sebenarnya buang — kulat, biofilem, habuk dan bau pada gegelung dan blower. Nasihat servis untuk kelembapan tropika KL & Selangor. Dari RM 120.",
    zh: "脏冷气如何影响房间空气，以及高压化学清洗到底清除什么——盘管与风轮上的霉菌、生物膜、灰尘与异味。针对吉隆坡与雪兰莪热带湿度的保养建议。RM 120 起。",
  } as Tri,
};

export const IAQ_HERO = {
  eyebrow: {
    en: "Indoor Air Quality & Chemical Wash",
    ms: "Kualiti Udara Dalaman & Cuci Kimia",
    zh: "室内空气质量与化学清洗",
  } as Tri,
  h1: {
    en: "Indoor Air Quality & Your Aircond in KL's Humidity",
    ms: "Kualiti Udara Dalaman & Aircond Anda dalam Kelembapan KL",
    zh: "在吉隆坡的湿度下，室内空气质量与你的冷气",
  } as Tri,
  subtitle: {
    en: "What a Dirty Coil Does — and What a Chemical Wash Removes",
    ms: "Apa Gegelung Kotor Lakukan — dan Apa Cuci Kimia Buang",
    zh: "脏盘管带来什么——化学清洗又清除什么",
  } as Tri,
  intro: {
    en: "In a tropical climate the same humidity that makes an aircond essential also turns the inside of a neglected unit into a home for mould and biofilm. This guide explains, plainly and without medical claims, how a dirty evaporator coil and blower wheel affect the air in a closed room — and exactly what a pressure chemical wash physically removes.",
    ms: "Dalam iklim tropika, kelembapan yang sama yang menjadikan aircond penting juga menjadikan bahagian dalam unit yang diabaikan sarang kulat dan biofilem. Panduan ini menerangkan, secara jelas dan tanpa dakwaan perubatan, bagaimana gegelung evaporator dan roda blower kotor menjejaskan udara dalam bilik tertutup — dan apa sebenarnya yang cuci kimia tekanan buang.",
    zh: "在热带气候中，让冷气成为必需品的湿度，也会把疏于保养的机器内部变成霉菌与生物膜的温床。本指南以清晰、不作任何医疗宣称的方式，说明脏的蒸发盘管与风轮如何影响密闭房间的空气——以及高压化学清洗到底清除了什么。",
  } as Tri,
  badges: {
    en: ["No medical claims — just what we remove", "Chemical wash from RM 120", "Tropical-humidity servicing advice"],
    ms: ["Tiada dakwaan perubatan — hanya apa kami buang", "Cuci kimia dari RM 120", "Nasihat servis kelembapan tropika"],
    zh: ["不作医疗宣称——只说清除了什么", "化学清洗 RM 120 起", "热带湿度保养建议"],
  } as TriList,
};

export const IAQ_FACTORS: {
  key: string;
  title: Tri;
  body: Tri;
}[] = [
  {
    key: "mould",
    title: { en: "Mould & biofilm on a wet coil", ms: "Kulat & biofilem pada gegelung basah", zh: "潮湿盘管上的霉菌与生物膜" },
    body: {
      en: "An evaporator coil is cold and wet whenever the aircond runs. In KL's humidity that surface, plus the drain pan below it, is an ideal place for mould and a slimy bacterial biofilm to grow. A pressure chemical wash strips that layer off the fins and flushes the drain — ordinary filter-rinsing does not reach it.",
      ms: "Gegelung evaporator sejuk dan basah setiap kali aircond berjalan. Dalam kelembapan KL, permukaan itu, serta dulang longkang di bawahnya, tempat ideal untuk kulat dan biofilem bakteria berlendir tumbuh. Cuci kimia tekanan menanggalkan lapisan itu dari sirip dan membersihkan longkang — bilas penapis biasa tidak sampai ke situ.",
      zh: "只要冷气运行，蒸发盘管就又冷又湿。在吉隆坡的湿度下，这个表面连同下方的接水盘，是霉菌与黏滑细菌生物膜生长的理想场所。高压化学清洗把这层从翅片上剥离并冲洗排水管——普通冲洗滤网根本触及不到。",
    },
  },
  {
    key: "smell",
    title: { en: "That musty smell when it starts up", ms: "Bau hapak bila ia dihidupkan", zh: "开机时那股霉味" },
    body: {
      en: "The sour or musty smell when an aircond first switches on is air being pushed across a coil and blower wheel coated in that biofilm. It is a symptom of what has grown inside, not of the room itself. Cleaning the coil and blower — not just spraying a fragrance — is what actually removes the source.",
      ms: "Bau masam atau hapak apabila aircond mula dihidupkan ialah udara ditolak melintasi gegelung dan roda blower bersalut biofilem itu. Ia gejala apa yang tumbuh di dalam, bukan bilik itu sendiri. Membersihkan gegelung dan blower — bukan sekadar semburan wangian — yang benar-benar membuang sumbernya.",
      zh: "冷气刚开机时的酸味或霉味，是空气被推过覆盖着生物膜的盘管与风轮。它是内部滋生物的表现，而非房间本身。清洗盘管与风轮——而非只喷香氛——才能真正去除源头。",
    },
  },
  {
    key: "dust",
    title: { en: "Dust load & clogged filters", ms: "Beban habuk & penapis tersumbat", zh: "积尘与滤网堵塞" },
    body: {
      en: "Filters trap dust, but once they clog, airflow drops and the fine dust that gets past them settles on the wet coil. Rinsing the filters monthly is a homeowner job; clearing the coil and blower that the filters could not protect is what a service visit is for.",
      ms: "Penapis memerangkap habuk, tetapi apabila tersumbat, aliran udara jatuh dan habuk halus yang lepas mendap pada gegelung basah. Membilas penapis setiap bulan kerja pemilik rumah; membersihkan gegelung dan blower yang penapis tak dapat lindungi itulah tujuan lawatan servis.",
      zh: "滤网会拦住灰尘，但一旦堵塞，风量下降，穿过滤网的细尘就会落在潮湿的盘管上。每月冲洗滤网是住户可自理的事；清理滤网没能挡住的盘管与风轮，才是上门保养要做的。",
    },
  },
  {
    key: "humidity",
    title: { en: "Humidity, dry mode & condensation", ms: "Kelembapan, mod kering & pemeluwapan", zh: "湿度、除湿模式与冷凝" },
    body: {
      en: "A healthy aircond also removes moisture from the air. When the coil is caked or the drain is blocked, that water can back up instead of draining away, feeding more mould. Running dry mode in very humid weather and keeping the coil clean both help the unit manage moisture the way it should.",
      ms: "Aircond yang sihat juga membuang lembapan dari udara. Apabila gegelung berkerak atau longkang tersumbat, air itu boleh melimpah balik dan bukannya mengalir keluar, memberi makan lebih banyak kulat. Menjalankan mod kering dalam cuaca sangat lembap dan memastikan gegelung bersih membantu unit menguruskan lembapan sepatutnya.",
      zh: "健康的冷气还会带走空气中的湿气。当盘管结垢或排水堵塞时，水会倒流而非排出，反而滋养更多霉菌。在非常潮湿的天气使用除湿模式并保持盘管清洁，都能帮助机器按应有的方式管理湿气。",
    },
  },
];

export const IAQ_CLEAN_CADENCE: {
  heading: Tri;
  intro: Tri;
  rows: { label: Tri; value: Tri }[];
} = {
  heading: {
    en: "How often should you clean for air quality?",
    ms: "Berapa kerap perlu bersihkan untuk kualiti udara?",
    zh: "为了空气质量应该多久清洁一次？",
  },
  intro: {
    en: "There is no single answer — it depends on how the room is used. As a practical guide for KL & Selangor homes and businesses:",
    ms: "Tiada jawapan tunggal — ia bergantung pada cara bilik digunakan. Sebagai panduan praktikal untuk rumah dan perniagaan KL & Selangor:",
    zh: "没有唯一答案——取决于房间如何使用。作为吉隆坡与雪兰莪家庭与商家的实用参考：",
  },
  rows: [
    {
      label: { en: "Rinse washable filters", ms: "Bilas penapis boleh dicuci", zh: "冲洗可清洗滤网" },
      value: { en: "Every 2–4 weeks (do it yourself)", ms: "Setiap 2–4 minggu (buat sendiri)", zh: "每2–4周（可自理）" },
    },
    {
      label: { en: "Basic servicing (home)", ms: "Servis asas (rumah)", zh: "基础保养（家用）" },
      value: { en: `Every 3–4 months, from ${publishedPrices.basic15} per unit`, ms: `Setiap 3–4 bulan, dari ${publishedPrices.basic15} setiap unit`, zh: `每3–4个月，每台自 ${publishedPrices.basic15} 起` },
    },
    {
      label: { en: "Pressure chemical wash", ms: "Cuci kimia tekanan", zh: "高压化学清洗" },
      value: { en: `Every 6–12 months, from ${publishedPrices.chemicalWash15} per wall unit`, ms: `Setiap 6–12 bulan, dari ${publishedPrices.chemicalWash15} setiap unit dinding`, zh: `每6–12个月，壁挂机每台自 ${publishedPrices.chemicalWash15} 起` },
    },
    {
      label: { en: "Chemical overhaul (deep strip-down)", ms: "Overhaul kimia (tanggal penuh)", zh: "化学大修（彻底拆洗）" },
      value: { en: `When smell/biofilm returns fast, from ${publishedPrices.overhaul15}`, ms: `Bila bau/biofilem cepat kembali, dari ${publishedPrices.overhaul15}`, zh: `当异味/生物膜很快再现时，自 ${publishedPrices.overhaul15} 起` },
    },
  ],
};

export const IAQ_FAQS: HubFaqSet = {
  en: [
    { q: "Can a dirty aircond really affect the air in my room?", a: "A neglected evaporator coil and blower wheel collect mould, biofilm and dust because they stay cold and wet in KL's humidity. When the fan runs, room air passes over that surface. We describe this as what the unit physically holds and what cleaning removes — we do not make any medical or health-cure claim. If you have a health concern, speak to a doctor." },
    { q: "What does a chemical wash actually remove?", a: "A pressure chemical wash strips mould, biofilm, grease and embedded dust off the evaporator fins and flushes the drain pan and pipe. It reaches the coil and blower that rinsing the filter cannot. That is why the musty smell on start-up usually disappears after a proper wash rather than after spraying a fragrance." },
    { q: "Is a chemical wash or a chemical overhaul better for smell?", a: `A chemical wash cleans the coil and drain in place and is enough for most units, from ${publishedPrices.chemicalWash15}. If the smell or biofilm returns quickly, a chemical overhaul dismantles the indoor unit for a deep strip-down and clean, from ${publishedPrices.overhaul15}. We advise which one you actually need after inspecting the unit — we do not upsell the overhaul by default.` },
    { q: "How often should I clean my aircond for better air quality?", a: `Rinse washable filters yourself every 2–4 weeks. Book a basic service every 3–4 months (from ${publishedPrices.basic15} per unit) and a pressure chemical wash every 6–12 months (from ${publishedPrices.chemicalWash15} per wall unit). Kitchens and rooms used heavily need the shorter end of each range.` },
    { q: "Does running the aircond on dry mode help with humidity?", a: "Dry mode makes the unit prioritise removing moisture over cooling, which can help in very humid weather. It is not a substitute for cleaning, though — if the coil is caked or the drain is blocked, water backs up and feeds more mould. Dry mode plus a clean coil and clear drain is what actually keeps humidity in check." },
    { q: "Do you clean the drain pipe as well as the coil?", a: "Yes. A pressure chemical wash includes flushing the drain pan and pipe, which is where standing water and biofilm collect and where a musty smell and water leaks both start. A blocked drain is one of the most common causes of both odour and an indoor unit dripping water." },
  ],
  ms: [
    { q: "Bolehkah aircond kotor benar-benar menjejaskan udara bilik saya?", a: "Gegelung evaporator dan roda blower yang diabaikan mengumpul kulat, biofilem dan habuk kerana ia kekal sejuk dan basah dalam kelembapan KL. Apabila kipas berjalan, udara bilik melintasi permukaan itu. Kami menerangkan ini sebagai apa yang unit itu simpan secara fizikal dan apa yang pembersihan buang — kami tidak membuat sebarang dakwaan perubatan atau penyembuhan kesihatan. Jika anda ada kebimbangan kesihatan, rujuk doktor." },
    { q: "Apa sebenarnya yang cuci kimia buang?", a: "Cuci kimia tekanan menanggalkan kulat, biofilem, gris dan habuk terbenam dari sirip evaporator dan membersihkan dulang serta paip longkang. Ia sampai ke gegelung dan blower yang bilas penapis tidak boleh. Sebab itu bau hapak semasa dihidupkan biasanya hilang selepas cuci yang betul, bukan selepas semburan wangian." },
    { q: "Cuci kimia atau overhaul kimia lebih baik untuk bau?", a: `Cuci kimia membersihkan gegelung dan longkang di tempat dan memadai untuk kebanyakan unit, dari ${publishedPrices.chemicalWash15}. Jika bau atau biofilem cepat kembali, overhaul kimia menanggalkan unit dalam untuk pembersihan penuh, dari ${publishedPrices.overhaul15}. Kami nasihatkan yang mana anda benar-benar perlu selepas memeriksa unit — kami tidak menjual overhaul secara lalai.` },
    { q: "Berapa kerap saya perlu bersihkan aircond untuk kualiti udara lebih baik?", a: `Bilas penapis boleh dicuci sendiri setiap 2–4 minggu. Tempah servis asas setiap 3–4 bulan (dari ${publishedPrices.basic15} setiap unit) dan cuci kimia tekanan setiap 6–12 bulan (dari ${publishedPrices.chemicalWash15} setiap unit dinding). Dapur dan bilik yang digunakan berat perlukan hujung julat yang lebih pendek.` },
    { q: "Adakah menjalankan aircond pada mod kering membantu kelembapan?", a: "Mod kering menjadikan unit mengutamakan membuang lembapan berbanding penyejukan, yang boleh membantu dalam cuaca sangat lembap. Namun ia bukan pengganti pembersihan — jika gegelung berkerak atau longkang tersumbat, air melimpah balik dan memberi makan lebih banyak kulat. Mod kering serta gegelung bersih dan longkang lancar yang benar-benar mengawal kelembapan." },
    { q: "Adakah anda membersihkan paip longkang serta gegelung?", a: "Ya. Cuci kimia tekanan termasuk membersihkan dulang dan paip longkang, di mana air bertakung dan biofilem berkumpul dan di mana bau hapak serta kebocoran air bermula. Longkang tersumbat ialah salah satu punca paling biasa untuk kedua-dua bau dan unit dalam menitis air." },
  ],
  zh: [
    { q: "脏冷气真的会影响我房间的空气吗？", a: "疏于保养的蒸发盘管与风轮在吉隆坡的湿度下持续又冷又湿，会积聚霉菌、生物膜与灰尘。风扇运转时，房间空气会经过这些表面。我们只描述机器内部实际存留了什么、清洗清除了什么——不作任何医疗或治病宣称。若有健康顾虑，请咨询医生。" },
    { q: "化学清洗到底清除什么？", a: "高压化学清洗把霉菌、生物膜、油垢与嵌入的灰尘从蒸发翅片上剥离，并冲洗接水盘与排水管。它能触及冲洗滤网无法到达的盘管与风轮。这就是为什么开机时的霉味通常在一次到位的清洗后消失，而不是靠喷香氛。" },
    { q: "去异味，化学清洗还是化学大修更好？", a: `化学清洗在原位清洁盘管与排水，对大多数机器已足够，自 ${publishedPrices.chemicalWash15} 起。若异味或生物膜很快再现，化学大修会拆下室内机做彻底清洗，自 ${publishedPrices.overhaul15} 起。我们会在检查机器后建议你真正需要哪一种——不会默认推销大修。` },
    { q: "为了更好的空气质量应该多久清洁冷气？", a: `可清洗滤网每2–4周自行冲洗。每3–4个月预约一次基础保养（每台自 ${publishedPrices.basic15} 起），每6–12个月做一次高压化学清洗（壁挂机每台自 ${publishedPrices.chemicalWash15} 起）。厨房与高频使用的房间需取每个区间的较短端。` },
    { q: "用除湿模式运行冷气对湿度有帮助吗？", a: "除湿模式让机器优先除湿而非制冷，在非常潮湿的天气有帮助。但它不能替代清洁——若盘管结垢或排水堵塞，水会倒流并滋养更多霉菌。除湿模式加上洁净的盘管与畅通的排水，才能真正控制湿度。" },
    { q: "你们会连排水管一起清洗，而不只是盘管吗？", a: "会。高压化学清洗包含冲洗接水盘与排水管——那正是积水与生物膜聚集之处，也是霉味与漏水的共同起点。排水堵塞是异味与室内机漏水两者最常见的原因之一。" },
  ],
};
