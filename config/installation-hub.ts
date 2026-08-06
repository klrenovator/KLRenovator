// ─────────────────────────────────────────────────────────────────────────
// Data for the /installation hub page (and its /ms and /zh twins).
//
// Audit finding: the site had 768 installation URLs in the sitemap but no
// single hub tying them together, and "Installation" did not appear in the
// navbar at all. Every installation landing sat flat at the root, so search
// engines saw no topical hierarchy and visitors had no way to browse the
// cluster. This file is the single source of truth for that hub.
// ─────────────────────────────────────────────────────────────────────────

export type HubLocale = "en" | "ms" | "zh";

export type HubLink = {
  /** Path WITHOUT locale prefix for en; ms/zh give their real slugs. */
  href: Record<HubLocale, string>;
  label: Record<HubLocale, string>;
  blurb: Record<HubLocale, string>;
  price?: string;
};

export type HubGroup = {
  id: string;
  eyebrow: Record<HubLocale, string>;
  title: Record<HubLocale, string>;
  accent: "sky" | "emerald" | "amber" | "violet";
  links: HubLink[];
};

export const INSTALLATION_HUB_GROUPS: HubGroup[] = [
  {
    id: "by-size",
    accent: "sky",
    eyebrow: { en: "By Unit Size", ms: "Mengikut Saiz", zh: "按匹数" },
    title: {
      en: "Choose Your HP Size",
      ms: "Pilih Saiz HP Anda",
      zh: "选择您的匹数",
    },
    links: [
      {
        href: {
          en: "/1hp-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-1hp-kl",
          zh: "/zh/1hp-aircond-installation-kl",
        },
        label: { en: "1.0 HP Installation", ms: "Pemasangan 1.0 HP", zh: "1.0匹安装" },
        blurb: {
          en: "Small bedrooms & study rooms up to 120 sq ft.",
          ms: "Bilik tidur kecil & bilik belajar sehingga 120 kaki persegi.",
          zh: "适合 120 平方英尺以内的小卧室与书房。",
        },
        price: "RM 199",
      },
      {
        href: {
          en: "/1.5hp-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-1.5hp-kl",
          zh: "/zh/1.5hp-aircond-installation-kl",
        },
        label: { en: "1.5 HP Installation", ms: "Pemasangan 1.5 HP", zh: "1.5匹安装" },
        blurb: {
          en: "Master bedrooms & small living halls, 120–180 sq ft.",
          ms: "Bilik tidur utama & ruang tamu kecil, 120–180 kaki persegi.",
          zh: "主卧与小客厅，120–180 平方英尺。",
        },
        price: "RM 199",
      },
      {
        href: {
          en: "/2hp-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-2hp-kl",
          zh: "/zh/2hp-aircond-installation-kl",
        },
        label: { en: "2.0 HP Installation", ms: "Pemasangan 2.0 HP", zh: "2.0匹安装" },
        blurb: {
          en: "Living halls & open-plan areas, 180–280 sq ft.",
          ms: "Ruang tamu & kawasan pelan terbuka, 180–280 kaki persegi.",
          zh: "客厅与开放式空间，180–280 平方英尺。",
        },
        price: "RM 249",
      },
      {
        href: {
          en: "/btu-calculator",
          ms: "/ms/btu-calculator",
          zh: "/zh/btu-calculator",
        },
        label: { en: "Not sure? BTU Calculator", ms: "Tidak pasti? Kalkulator BTU", zh: "不确定？BTU 计算器" },
        blurb: {
          en: "Enter your room size and get the exact HP you need in 30 seconds.",
          ms: "Masukkan saiz bilik dan dapatkan HP tepat dalam 30 saat.",
          zh: "输入房间尺寸，30 秒内得出所需匹数。",
        },
      },
    ],
  },
  {
    id: "by-type",
    accent: "emerald",
    eyebrow: { en: "By Unit Type", ms: "Mengikut Jenis", zh: "按机型" },
    title: {
      en: "Choose Your Unit Type",
      ms: "Pilih Jenis Unit Anda",
      zh: "选择您的机型",
    },
    links: [
      {
        href: {
          en: "/wall-mounted-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-dinding-kl",
          zh: "/zh/wall-mounted-aircond-installation-kl",
        },
        label: { en: "Wall-Mounted", ms: "Pemasangan Dinding", zh: "挂壁式" },
        blurb: {
          en: "The standard split unit for homes and condos.",
          ms: "Unit split standard untuk rumah dan kondominium.",
          zh: "住宅与公寓最常见的分体式冷气。",
        },
        price: "RM 199",
      },
      {
        href: {
          en: "/ceiling-cassette-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-keset-siling-kl",
          zh: "/zh/ceiling-cassette-aircond-installation-kl",
        },
        label: { en: "Ceiling Cassette", ms: "Keset Siling", zh: "天花板卡式" },
        blurb: {
          en: "4-way airflow for offices, shoplots and larger halls.",
          ms: "Aliran udara 4 arah untuk pejabat, kedai dan dewan besar.",
          zh: "四面出风，适合办公室、店铺与大厅。",
        },
        price: "RM 290",
      },
      {
        href: {
          en: "/window-unit-aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-tingkap-kl",
          zh: "/zh/window-unit-aircond-installation-kl",
        },
        label: { en: "Window Unit", ms: "Unit Tingkap", zh: "窗式冷气" },
        blurb: {
          en: "Self-contained units for older homes and rentals.",
          ms: "Unit lengkap untuk rumah lama dan sewaan.",
          zh: "一体式机型，适合旧屋与出租单位。",
        },
        price: "RM 199",
      },
    ],
  },
  {
    id: "by-property",
    accent: "violet",
    eyebrow: { en: "By Property", ms: "Mengikut Hartanah", zh: "按物业类型" },
    title: {
      en: "Whole-Property Packages",
      ms: "Pakej Seluruh Hartanah",
      zh: "整屋 / 整场地方案",
    },
    links: [
      {
        href: {
          en: "/new-home-aircond-installation",
          ms: "/ms/pemasangan-aircond-rumah-baru",
          zh: "/zh/new-home-aircond-installation",
        },
        label: { en: "New Home Package", ms: "Pakej Rumah Baru", zh: "新居配套" },
        blurb: {
          en: "Moving in? Full-house install coordinated around your renovation.",
          ms: "Baru berpindah? Pemasangan seluruh rumah diselaraskan dengan renovasi anda.",
          zh: "刚入伙？整屋安装，配合装修进度安排。",
        },
      },
      {
        href: {
          en: "/whole-house-aircond-installation",
          ms: "/ms/pemasangan-aircond-seluruh-rumah",
          zh: "/zh/whole-house-aircond-installation",
        },
        label: { en: "Whole-House Multi-Unit", ms: "Seluruh Rumah Pelbagai Unit", zh: "整屋多机" },
        blurb: {
          en: "3+ units in one visit with volume pricing.",
          ms: "3+ unit dalam satu lawatan dengan harga pukal.",
          zh: "一次上门安装 3 台以上，享批量价格。",
        },
      },
      {
        href: {
          en: "/commercial-aircond-installation",
          ms: "/ms/pemasangan-aircond-komersial",
          zh: "/zh/commercial-aircond-installation",
        },
        label: { en: "Commercial & Shoplot", ms: "Komersial & Kedai", zh: "商用与店铺" },
        blurb: {
          en: "Offices, retail, F&B — after-hours installation available.",
          ms: "Pejabat, runcit, F&B — pemasangan selepas waktu pejabat tersedia.",
          zh: "办公室、零售、餐饮 — 可安排非营业时间施工。",
        },
      },
    ],
  },
  {
    id: "pricing",
    accent: "amber",
    eyebrow: { en: "Pricing & Planning", ms: "Harga & Perancangan", zh: "价格与规划" },
    title: {
      en: "Know the Cost First",
      ms: "Ketahui Kos Dahulu",
      zh: "先了解费用",
    },
    links: [
      {
        href: {
          en: "/installation-price-malaysia",
          ms: "/ms/installation-price-malaysia",
          zh: "/zh/installation-price-malaysia",
        },
        label: {
          en: "Full Installation Price Guide",
          ms: "Panduan Harga Pemasangan Penuh",
          zh: "完整安装价格指南",
        },
        blurb: {
          en: "Every HP size, materials rates, and what counts as an extra.",
          ms: "Setiap saiz HP, kadar bahan, dan apa yang dikira tambahan.",
          zh: "各匹数、材料费率，以及哪些属于额外收费。",
        },
      },
      {
        href: {
          en: "/aircond-installation-kl",
          ms: "/ms/pemasangan-aircond-kl",
          zh: "/zh/aircond-installation-kl",
        },
        label: {
          en: "How We Install (7 Steps)",
          ms: "Cara Kami Memasang (7 Langkah)",
          zh: "我们的安装流程（7 步）",
        },
        blurb: {
          en: "Vacuum pump commissioning, Type L copper, MCB sizing explained.",
          ms: "Pentauliahan pam vakum, kuprum Type L, saiz MCB dijelaskan.",
          zh: "真空泵抽真空、Type L 铜管、MCB 规格说明。",
        },
      },
      {
        href: { en: "/book", ms: "/book", zh: "/book" },
        label: { en: "Book an Installation Slot", ms: "Tempah Slot Pemasangan", zh: "预约安装时段" },
        blurb: {
          en: "Pick a date and time online — we confirm within 30 minutes.",
          ms: "Pilih tarikh dan masa dalam talian — kami sahkan dalam 30 minit.",
          zh: "在线选择日期时间 — 我们 30 分钟内确认。",
        },
      },
    ],
  },
];

export const HUB_COPY: Record<
  HubLocale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    badges: string[];
    areasTitle: string;
    areasSub: string;
    areasCta: string;
    brandsTitle: string;
    brandsSub: string;
    brandsCta: string;
    ctaTitle: string;
    ctaBody: string;
    whatsapp: string;
    call: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
  }
> = {
  en: {
    metaTitle: "Aircond Installation KL & Selangor — From RM199",
    metaDescription:
      "Aircond installation hub — browse by HP, unit type or property. Wall-mounted from RM199, ceiling cassette from RM290. Same-day, 20 brands, 1-month warranty.",
    eyebrow: "Installation Hub",
    h1: "Aircond Installation in KL & Selangor",
    intro:
      "Everything about getting a new aircond installed — pick your HP size, unit type or property type below. Standard wall-mounted installation starts from RM 199 including 7 ft copper pipe, insulation, electrical wire and drain pipe and bracket, with mandatory vacuum pump commissioning and a 1-month written workmanship warranty.",
    badges: ["From RM 199", "Same-Day Available", "All 20 Brands", "1-Month Warranty"],
    areasTitle: "Installation Near You",
    areasSub: "We install across 39 areas in Kuala Lumpur and Selangor.",
    areasCta: "View all service areas",
    brandsTitle: "Installation by Brand",
    brandsSub: "Daikin, Panasonic, Mitsubishi and 17 more — inverter and non-inverter.",
    brandsCta: "View all brands",
    ctaTitle: "Get a confirmed installation price",
    ctaBody:
      "Send us your area, unit type and HP size. We confirm the full price — including any extra copper pipe or bracket work — before we drill anything.",
    whatsapp: "WhatsApp for a Quote",
    call: "Call +60 18-298 3573",
    faqTitle: "Installation Questions",
    faqs: [
      {
        q: "How much does aircond installation cost in KL and Selangor?",
        a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP and RM 329 for 3.0 HP. Ceiling cassette starts from RM 290 and window units from RM 199. Every quote includes the first 7 ft of copper pipe, insulation, electrical wire and drain pipe. Any required outdoor bracket is quoted separately as a paid special charge before work begins. Extra copper pipe is RM 17–27 per foot depending on HP size. Extra drain pipe beyond the included 7 ft is RM 5 per foot.",
      },
      {
        q: "How long does an aircond installation take?",
        a: "A single wall-mounted unit takes 3–5 hours. Ceiling cassette takes 5–8 hours because of the ceiling suspension and drain pump wiring. Whole-house multi-unit jobs usually finish in 1–2 days. Same-day installation is available for bookings confirmed before 11 AM.",
      },
      {
        q: "Do you install aircond in high-rise condos?",
        a: "Yes. We install regularly in condos across KLCC, Mont Kiara, Bangsar, Sentul, Petaling Jaya and Subang Jaya. We coordinate lift and loading-bay booking with building management, follow JMB rules, and place outdoor units on the service ledge or balcony in line with building regulations.",
      },
      {
        q: "What is included in the standard installation price?",
        a: "7 ft of copper pipe with Armaflex insulation, electrical wiring, PVC drain pipe with correct gradient, a standard outdoor bracket, vacuum pump commissioning to 500 microns, a 15-minute run test, and a written 1-month workmanship warranty card. Anything beyond that — extra piping, concealed wall hacking, high-rise access, a new plug point — is quoted and approved on site before work starts.",
      },
      {
        q: "Do I need to buy the aircond unit from you?",
        a: "No. We install units you have already bought from any retailer, and we can also supply the unit if you prefer. Installation by a professional team with a documented job card is what protects your manufacturer warranty — most brands require proof of proper installation for compressor warranty claims.",
      },
    ],
  },
  ms: {
    metaTitle: "Pemasangan Aircond KL & Selangor — Dari RM199 | KL Renovator",
    metaDescription:
      "Hab pemasangan aircond — pilih ikut saiz HP, jenis unit atau hartanah. Dinding dari RM199, keset siling dari RM290. Hari sama, 20 jenama, waranti 1 bulan.",
    eyebrow: "Hab Pemasangan",
    h1: "Pemasangan Aircond di KL & Selangor",
    intro:
      "Semua tentang pemasangan aircond baharu — pilih saiz HP, jenis unit atau jenis hartanah di bawah. Pemasangan dinding standard bermula dari RM 199 termasuk 7 kaki pertama paip kuprum, penebat, wayar elektrik dan paip saliran, dengan pentauliahan pam vakum wajib dan waranti kerja bertulis 1 bulan. Braket luar, jika diperlukan, ialah caj khas berbayar yang disahkan sebelum kerja bermula.",
    badges: ["Dari RM 199", "Tersedia Hari Sama", "Semua 20 Jenama", "Waranti 1 Bulan"],
    areasTitle: "Pemasangan Berhampiran Anda",
    areasSub: "Kami memasang di 39 kawasan di Kuala Lumpur dan Selangor.",
    areasCta: "Lihat semua kawasan servis",
    brandsTitle: "Pemasangan Mengikut Jenama",
    brandsSub: "Daikin, Panasonic, Mitsubishi dan 17 lagi — inverter dan bukan inverter.",
    brandsCta: "Lihat semua jenama",
    ctaTitle: "Dapatkan harga pemasangan yang disahkan",
    ctaBody:
      "Hantar kawasan, jenis unit dan saiz HP anda. Kami sahkan harga penuh — termasuk sebarang kerja paip kuprum atau bracket tambahan — sebelum kami menebuk apa-apa.",
    whatsapp: "WhatsApp untuk Sebut Harga",
    call: "Hubungi +60 18-298 3573",
    faqTitle: "Soalan Pemasangan",
    faqs: [
      {
        q: "Berapakah kos pemasangan aircond di KL dan Selangor?",
        a: "Pemasangan dinding bermula dari RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP dan RM 329 untuk 3.0 HP. Keset siling bermula dari RM 290 dan unit tingkap dari RM 199. Setiap sebut harga termasuk 7 kaki pertama paip kuprum, penebat, wayar elektrik dan paip saliran. Braket luar jika diperlukan akan disebut sebagai caj khas berbayar sebelum kerja bermula. Paip kuprum tambahan RM 17–27 sekaki bergantung pada saiz HP.",
      },
      {
        q: "Berapa lama masa pemasangan aircond?",
        a: "Satu unit dinding mengambil masa 3–5 jam. Keset siling mengambil masa 5–8 jam kerana gantungan siling dan pendawaian pam saliran. Kerja pelbagai unit seluruh rumah biasanya siap dalam 1–2 hari. Pemasangan hari sama tersedia untuk tempahan yang disahkan sebelum 11 pagi.",
      },
      {
        q: "Adakah anda memasang aircond di kondominium tinggi?",
        a: "Ya. Kami kerap memasang di kondominium di KLCC, Mont Kiara, Bangsar, Sentul, Petaling Jaya dan Subang Jaya. Kami menyelaras tempahan lif dan ruang muat dengan pihak pengurusan bangunan, mematuhi peraturan JMB, dan meletakkan unit luar di birai servis atau balkoni mengikut peraturan bangunan.",
      },
      {
        q: "Apakah yang termasuk dalam harga pemasangan standard?",
        a: "Paip kuprum 7 kaki dengan penebat Armaflex, pendawaian elektrik, paip saliran PVC dengan kecerunan betul luar standard, pentauliahan pam vakum sehingga 500 mikron, ujian jalan 15 minit, dan kad waranti kerja bertulis 1 bulan. Apa-apa selain itu — paip tambahan, tebukan dinding tersembunyi, akses bangunan tinggi, titik plug baharu — disebut harga dan diluluskan di tapak sebelum kerja bermula.",
      },
      {
        q: "Perlukah saya membeli unit aircond daripada anda?",
        a: "Tidak. Kami memasang unit yang anda sudah beli dari mana-mana peruncit, dan kami juga boleh membekalkan unit jika anda mahu. Pemasangan oleh pasukan profesional dengan kad kerja bertulis adalah yang melindungi waranti pengilang anda — kebanyakan jenama memerlukan bukti pemasangan betul untuk tuntutan waranti kompressor.",
      },
    ],
  },
  zh: {
    metaTitle: "吉隆坡雪兰莪冷气安装 — RM199起 | KL Renovator",
    metaDescription:
      "冷气安装总览 — 按匹数、机型或物业类型选择。挂壁式 RM199 起，天花板卡式 RM290 起。当天可上门，20 大品牌，1 个月保修。",
    eyebrow: "安装总览",
    h1: "吉隆坡与雪兰莪冷气安装",
    intro:
      "新冷气安装的一切资讯 — 在下方按匹数、机型或物业类型选择。标准挂壁式安装 RM 199 起，包含 7 英尺铜管、电线、排水管与支架，并含强制真空泵抽真空程序及 1 个月书面工艺保修。",
    badges: ["RM 199 起", "当天可上门", "全部 20 大品牌", "1 个月保修"],
    areasTitle: "就近安装服务",
    areasSub: "我们的安装服务覆盖吉隆坡及雪兰莪 39 个地区。",
    areasCta: "查看所有服务地区",
    brandsTitle: "按品牌安装",
    brandsSub: "大金、松下、三菱等 20 个品牌 — 变频与定频皆可。",
    brandsCta: "查看所有品牌",
    ctaTitle: "获取确认安装报价",
    ctaBody:
      "告诉我们您的地区、机型与匹数。在动工钻孔前，我们会先确认完整价格 — 包括任何额外铜管或支架工程。",
    whatsapp: "WhatsApp 索取报价",
    call: "致电 +60 18-298 3573",
    faqTitle: "安装常见问题",
    faqs: [
      {
        q: "在吉隆坡和雪兰莪安装冷气需要多少钱？",
        a: "挂壁式安装 1.0–1.5 匹 RM 199 起，2.0 匹 RM 249，3.0 匹 RM 329。天花板卡式 RM 290 起，窗式机 RM 199 起。每份报价均包含 7 英尺铜管、电线、排水管及标准支架。额外铜管依匹数每英尺 RM 17–27。",
      },
      {
        q: "冷气安装需要多长时间？",
        a: "单台挂壁式需 3–5 小时。天花板卡式需 5–8 小时，因涉及天花吊装与排水泵接线。整屋多机工程通常 1–2 天完成。上午 11 点前确认的预约可安排当天安装。",
      },
      {
        q: "你们在高层公寓安装冷气吗？",
        a: "是的。我们经常在 KLCC、Mont Kiara、Bangsar、Sentul、八打灵再也及梳邦再也的公寓施工。我们会与管理层协调电梯与卸货区预约，遵守 JMB 规定，并依照建筑规范将室外机安装于服务平台或阳台。",
      },
      {
        q: "标准安装价格包含什么？",
        a: "7 英尺铜管含 Armaflex 保温、电线、具正确坡度的 PVC 排水管、标准室外支架、抽真空至 500 微米、15 分钟试机，以及 1 个月书面工艺保修卡。其他项目 — 额外铜管、埋墙开槽、高楼作业、新增插座 — 均于现场报价并经您同意后才施工。",
      },
      {
        q: "必须向你们购买冷气机吗？",
        a: "不需要。您在任何商家购买的机器我们都能安装，若您希望我们也可代为供货。由专业团队安装并提供书面工单，正是保障原厂保修的关键 — 多数品牌在压缩机保修索赔时会要求提供正规安装证明。",
      },
    ],
  },
};
