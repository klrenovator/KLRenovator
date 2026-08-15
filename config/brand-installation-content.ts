// Brand-specific installation landing page content for INS-11 (Round 73).
// Every page is generated from real brand data in config/site.ts so that
// content remains unique, accurate and natural across all 20 brands.

import { siteConfig } from "@/config/site";
import { buildInstallationMetaTitle } from "@/lib/seo-title-optimizer";
import { buildInstallationMetaDesc } from "@/lib/seo-description-optimizer";

export type BrandInstallationLocale = "en" | "ms" | "zh";

export interface BrandInstallationContent {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  heroBadges: string[];
  introTitle: string;
  introBody: string;
  modelsTitle: string;
  models: string[];
  gasTitle: string;
  gasBody: string;
  typesTitle: string;
  types: { title: string; body: string }[];
  pricingTitle: string;
  includedTitle: string;
  includedItems: string[];
  extrasTitle: string;
  extrasItems: string[];
  whyTitle: string;
  whyItems: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  whatsAppLabel: string;
  breadcrumbLabel: string;
}

function brandVariant(slug: string, variants: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

function pick<T>(slug: string, items: T[]): T {
  return items[brandVariant(slug, items.length)];
}

function joinItems(items: string[], locale: BrandInstallationLocale, max = 4): string {
  const used = items.slice(0, max);
  if (used.length === 0) return "";
  if (used.length === 1) return used[0];
  if (locale === "en") {
    if (used.length === 2) return `${used[0]} and ${used[1]}`;
    return `${used.slice(0, -1).join(", ")} and ${used[used.length - 1]}`;
  }
  if (locale === "ms") {
    if (used.length === 2) return `${used[0]} dan ${used[1]}`;
    return `${used.slice(0, -1).join(", ")} dan ${used[used.length - 1]}`;
  }
  if (used.length === 2) return `${used[0]}和${used[1]}`;
  return `${used.slice(0, -1).join("、")}和${used[used.length - 1]}`;
}

function getIntroBody(
  brand: (typeof siteConfig.brandPages)[number],
  locale: BrandInstallationLocale,
): string {
  const name = brand.name;
  const models = joinItems(brand.models || [name], locale, 4);
  const highlights = joinItems(brand.highlights || [], locale, 3);

  if (locale === "en") {
    const templates = [
      `KL Renovator installs ${name} airconds across Kuala Lumpur and Selangor. Our technicians are trained on ${name} models including ${models}, sizing the right HP, running copper pipe, and commissioning every unit with vacuum pump evacuation and a 1-month workmanship warranty.`,
      `Whether you are moving into a new home or upgrading an old unit, KL Renovator handles full ${name} aircond installation from survey to final testing. We install all ${name} series including ${models}, using genuine or OEM-equivalent parts and confirming every price before drilling.`,
      `${name} units such as ${models} are popular across KL and Selangor for their reliability. KL Renovator's installers fit wall-mounted, ceiling cassette and window ${name} units, matching the correct HP to your room size and completing every job to manufacturer warranty standards.`,
      `Need a new ${name} aircond installed? Our team dispatches trained HVAC technicians throughout KL & Selangor. Every ${name} installation includes 7 ft copper pipe, insulation, electrical wire and drain pipe, vacuum pump commissioning, and a 1-month workmanship warranty card.`,
    ];
    return pick(brand.slug, templates);
  }

  if (locale === "ms") {
    const templates = [
      `KL Renovator memasang aircond ${name} di seluruh Kuala Lumpur dan Selangor. Juruteknik kami dilatih untuk model ${name} termasuk ${models}, menentukan saiz HP yang betul, memasang paip tembaga, dan menauliahkan setiap unit dengan pengosongan pam vakum serta waranti kerja 1 bulan.`,
      `Sama ada anda berpindah ke rumah baharu atau menaik taraf unit lama, KL Renovator mengendalikan pemasangan aircond ${name} penuh dari tinjauan hingga ujian akhir. Kami memasang semua siri ${name} termasuk ${models}, menggunakan alat ganti asli atau setara OEM dan mengesahkan setiap harga sebelum mengecer.`,
      `Unit ${name} seperti ${models} popular di KL dan Selangor kerana kebolehpercayaannya. Pemasang KL Renovator memasang unit ${name} dinding, ceiling cassette dan tingkap, memadankan HP yang betul dengan saiz bilik anda dan menyelesaikan setiap kerja mengikut standard waranti pengeluar.`,
      `Perlukan aircond ${name} baharu dipasang? Pasukan kami menghantar juruteknik HVAC berlatih di seluruh KL & Selangor. Setiap pemasangan ${name} termasuk 7 ft paip tembaga, wayar, paip saliran luar standard, pentauliahan pam vakum, dan kad waranti kerja 1 bulan.`,
    ];
    return pick(brand.slug, templates);
  }

  const templates = [
    `KL Renovator 在吉隆坡和雪兰莪提供${name}冷气安装服务。我们的技师接受过${name}机型培训，包括${models}，会准确匹配马力、铺设铜管，并用真空泵抽真空调试，同时提供1个月工艺保修。`,
    `无论您是搬入新家还是升级旧机，KL Renovator 都能完成从勘察到最终测试的完整${name}冷气安装流程。我们安装${name}所有系列，包括${models}，使用原厂或OEM等效配件，并在钻孔施工前确认每一项价格。`,
    `${name}机型如${models}因可靠性高而广受吉隆坡和雪兰莪用户欢迎。KL Renovator 的安装团队精通${name}挂壁式、天花板卡式机和窗口式冷气安装，会根据房间大小匹配正确马力，并按制造商保修标准完成作业。`,
    `需要安装新${name}冷气？我们的团队会派遣持证HVAC技师覆盖整个吉隆坡及雪兰莪。每次${name}安装均包含7尺铜管、电线、排水管、真空泵抽真空以及1个月工艺保修卡。`,
  ];
  return pick(brand.slug, templates);
}

function getGasBody(
  brand: (typeof siteConfig.brandPages)[number],
  locale: BrandInstallationLocale,
): string {
  const name = brand.name;
  const gases = brand.gasTypes || ["R32", "R410A"];
  const gasList = joinItems(gases, locale, gases.length);

  if (locale === "en") {
    return `We install ${name} units that use ${gasList} refrigerant. Our technicians vacuum-test every new ${name} installation to protect the compressor and keep the manufacturer's warranty valid. We never mix refrigerant types and confirm the correct gas charge during commissioning.`;
  }
  if (locale === "ms") {
    return `Kami memasang unit ${name} yang menggunakan refrigeran ${gasList}. Juruteknik kami menguji setiap pemasangan ${name} baharu dengan pam vakum untuk melindungi pemampat dan mengekalkan waranti pengeluar. Kami tidak mencampur jenis refrigeran dan mengesahkan cas gas yang betul semasa pentauliahan.`;
  }
  return `我们安装使用${gasList}冷媒的${name}机型。我们的技师会对每台新装的${name}冷气进行真空测试，以保护压缩机并维持制造商保修有效。我们绝不混用冷媒类型，并会在调试时确认正确的充气量。`;
}

function getTypes(
  brand: (typeof siteConfig.brandPages)[number],
  locale: BrandInstallationLocale,
): { title: string; body: string }[] {
  const name = brand.name;

  if (locale === "en") {
    return [
      {
        title: `Wall-Mounted ${name} Installation`,
        body: `The most common choice for ${name} homes and condos. We mount the indoor unit on a reinforced bracket, run copper pipe and wiring to the outdoor compressor, and finish with vacuum pump commissioning. Ideal for bedrooms and living rooms.`,
      },
      {
        title: `${name} Ceiling Cassette Installation`,
        body: `Popular for offices, retail shops, and large open-plan homes using ${name} systems. We fit the ceiling suspension kit, drain pump, and piping, then align the cassette for even four-way airflow.`,
      },
      {
        title: `${name} Window Unit Installation`,
        body: `A practical, budget-friendly option for older apartments and rental rooms. We secure the ${name} unit in the window frame, seal the opening, and wire it to a dedicated circuit.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        title: `Pemasangan ${name} Dinding`,
        body: `Pilihan paling biasa untuk rumah dan kondominium ${name}. Kami memasang unit dalaman pada braket yang diperkukuh, memasang paip tembaga dan wayar ke kompresor luar, dan menyelesaikan dengan pentauliahan pam vakum. Ideal untuk bilik tidur dan ruang tamu.`,
      },
      {
        title: `Pemasangan Ceiling Cassette ${name}`,
        body: `Popular untuk pejabat, kedai runcit, dan rumah terbuka besar menggunakan sistem ${name}. Kami memasang kit suspensi siling, pam saliran, dan paip, kemudian menyelaraskan cassette untuk aliran udara empat arah yang sekata.`,
      },
      {
        title: `Pemasangan Unit Tingkap ${name}`,
        body: `Pilihan praktikal dan mesra bajet untuk pangsapuri lama serta bilik sewa. Kami memasang unit ${name} dengan selamat di bingkai tingkap, menyegel bukaan, dan menyambung wayar ke litar khas.`,
      },
    ];
  }

  return [
    {
      title: `${name}挂壁式安装`,
      body: `${name}家庭和公寓最常见的选择。我们会将室内机安装在加固支架上，铺设铜管和电线连接室外压缩机，最后进行真空泵抽真空调试。非常适合卧室和客厅。`,
    },
    {
      title: `${name}天花板卡式机安装`,
      body: `适合使用${name}系统的办公室、零售店和大型开放式住宅。我们安装吊顶悬挂套件、排水泵和管线，然后对卡式机进行四向均匀气流对位。`,
    },
    {
      title: `${name}窗口式冷气安装`,
      body: `老旧公寓和出租房的经济实用选择。我们将${name}机体固定在窗框内，密封开口，并接入专用电路。`,
    },
  ];
}

function getWhyItems(
  brand: (typeof siteConfig.brandPages)[number],
  locale: BrandInstallationLocale,
): { title: string; body: string }[] {
  const name = brand.name;

  if (locale === "en") {
    return [
      { title: `${name}-Trained Technicians`, body: `Our installers understand ${name} wiring, PCB logic, and gas requirements, so installations are completed correctly the first time.` },
      { title: "Right HP, Every Room", body: `We measure room size, ceiling height, and sun exposure before recommending 1HP, 1.5HP, or 2HP for your ${name} unit.` },
      { title: "Vacuum Pump Standard", body: `Every ${name} installation includes proper evacuation to protect the compressor and keep manufacturer warranty valid.` },
      { title: "Price Confirmed First", body: `Copper pipe, wirings, and extras are quoted before drilling begins — no surprise bills for your ${name} install.` },
    ];
  }

  if (locale === "ms") {
    return [
      { title: `Juruteknik ${name} Berlatih`, body: `Pemasang kami memahami pendawaian, logik PCB, dan keperluan gas ${name}, jadi pemasangan diselesaikan dengan betul pada kali pertama.` },
      { title: "HP Yang Tepat, Setiap Bilik", body: `Kami mengukur saiz bilik, ketinggian siling, dan pendedahan matahari sebelum mencadangkan 1HP, 1.5HP, atau 2HP untuk unit ${name} anda.` },
      { title: "Standard Pam Vakum", body: `Setiap pemasangan ${name} termasuk pengosongan yang betul untuk melindungi pemampat dan mengekalkan waranti pengeluar.` },
      { title: "Harga Disahkan Dahulu", body: `Paip tembaga, wayar, dan tambahan disebut sebelum mengecer bermula — tiada bil surprise untuk pemasangan ${name} anda.` },
    ];
  }

  return [
    { title: `持证${name}技师`, body: `我们的安装团队熟悉${name}的布线、PCB逻辑和冷媒要求，因此每次安装都能一次到位。` },
    { title: "每间房间匹配正确马力", body: `我们会先测量房间大小、天花板高度和日照情况，再为您的${name}机型推荐1匹、1.5匹或2匹。` },
    { title: "真空泵标准作业", body: `每次${name}安装都包含规范抽真空，保护压缩机并维持制造商保修有效。` },
    { title: "先确认价格", body: `铜管、电线、支架和额外费用均在钻孔施工前报价——您的${name}安装绝无意外账单。` },
  ];
}

function getFAQs(
  brand: (typeof siteConfig.brandPages)[number],
  locale: BrandInstallationLocale,
): { q: string; a: string }[] {
  const source = locale === "en" ? brand.faqs : locale === "ms" ? brand.faqsBM : brand.faqsZH;
  if (source && source.length > 0) {
    return source.slice(0, 5);
  }

  const name = brand.name;
  const models = joinItems(brand.models || [name], locale, 3);

  if (locale === "en") {
    return [
      {
        q: `How much does ${name} aircond installation cost in KL?`,
        a: `Wall-mounted ${name} installation starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP, and RM 279–RM 329 for larger units. Ceiling cassette starts from RM 290, and window units from RM 199. Every quote includes the first 7 ft of copper pipe, insulation, electrical wire and drain pipe. If an outdoor bracket is required, it is quoted separately as a paid special charge before work begins.`,
      },
      {
        q: `Which ${name} models can KL Renovator install?`,
        a: `We install all major ${name} series including ${models}. Both inverter and non-inverter units are supported across KL & Selangor.`,
      },
      {
        q: `Do you use original parts for ${name} installation?`,
        a: `Yes — we use genuine or high-quality OEM-equivalent parts for ${name} installations, including capacitors, wirings, to ensure system longevity and warranty protection.`,
      },
      {
        q: `How long does ${name} installation take?`,
        a: `A standard wall-mounted ${name} unit takes 3–5 hours including vacuum pump commissioning and electrical testing. Ceiling cassette installations take 5–8 hours.`,
      },
      {
        q: `Is same-day ${name} installation available?`,
        a: `Same-day installation is often available across KL & Selangor for bookings confirmed before 11 AM. WhatsApp +60182983573 with your address and preferred unit size to check today's slot.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        q: `Berapa harga pemasangan aircond ${name} di KL?`,
        a: `Pemasangan dinding ${name} bermula RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP, dan RM 279–RM 329 untuk unit lebih besar. Ceiling cassette bermula RM 290, dan unit tingkap dari RM 199. Setiap sebut harga termasuk 7 ft paip tembaga, wayar, paip saliran standard.`,
      },
      {
        q: `Model ${name} apa yang KL Renovator boleh pasang?`,
        a: `Kami memasang semua siri utama ${name} termasuk ${models}. Unit inverter dan bukan inverter disokong di KL & Selangor.`,
      },
      {
        q: `Adakah anda menggunakan alat ganti asli untuk pemasangan ${name}?`,
        a: `Ya — kami menggunakan alat ganti asli atau berkualiti tinggi setara OEM untuk pemasangan ${name}, termasuk kapasitor, wayar, bagi memastikan jangka hayat sistem dan perlindungan waranti.`,
      },
      {
        q: `Berapa lama pemasangan ${name}?`,
        a: `Unit dinding ${name} standard mengambil masa 3–5 jam termasuk pentauliahan pam vakum dan ujian elektrik. Pemasangan ceiling cassette mengambil masa 5–8 jam.`,
      },
      {
        q: `Adakah pemasangan ${name} hari sama tersedia?`,
        a: `Pemasangan hari sama kerap tersedia di KL & Selangor untuk tempahan yang disahkan sebelum 11 pagi. WhatsApp +60182983573 dengan alamat dan saiz unit pilihan anda untuk semak slot hari ini.`,
      },
    ];
  }

  return [
    {
      q: `吉隆坡${name}冷气安装费用是多少？`,
      a: `${name}挂壁式安装从RM 199起（1.0–1.5匹），2.0匹RM 249，更大马力RM 279–RM 329。天花板卡式机从RM 290起，窗式机从RM 199起。每次报价均包含7尺铜管、电线和排水管；如需室外支架则另行收费。`,
    },
    {
      q: `KL Renovator可以安装哪些${name}型号？`,
      a: `我们安装${name}所有主流系列，包括${models}。变频与非变频机型在吉隆坡及雪兰莪均可安装。`,
    },
    {
      q: `安装${name}时使用原厂配件吗？`,
      a: `是的——我们为${name}安装使用原厂或高质量OEM等效配件，包括电容器、电线和支架，以确保系统耐用性和保修保护。`,
    },
    {
      q: `${name}安装需要多长时间？`,
      a: `标准${name}挂壁式安装约需3–5小时，包括真空泵抽真空和电路测试。天花板卡式机安装约需5–8小时。`,
    },
    {
      q: `${name}可以当天安装吗？`,
      a: `吉隆坡及雪兰莪地区通常在上午11点前确认预约可安排当天安装。请WhatsApp +60182983573告知地址和所需马力以查询今日名额。`,
    },
  ];
}

const baseIncluded: Record<BrandInstallationLocale, string[]> = {
  en: [
    "Free site survey & quotation",
    "7 ft copper pipe (liquid + gas lines)",
    "7 ft electrical wiring",
    "7 ft PVC drain pipe",
    "Vacuum pump commissioning",
    "Refrigerant release & run test",
    "1-month workmanship warranty card",
  ],
  ms: [
    "Pemeriksaan tapak & sebut harga percuma",
    "7 ft paip tembaga (tali cecair + gas)",
    "7 ft wayar elektrik",
    "7 ft paip saliran PVC",
    "Pentauliahan pam vakum",
    "Pelepasan refrigeran & ujian jalan",
    "Kad waranti kerja 1 bulan",
  ],
  zh: [
    "免费现场勘察与报价",
    "7尺铜管（液管+气管）",
    "7尺电线",
    "7尺PVC排水管",
    "真空泵抽真空调试",
    "冷媒释放与运行测试",
    "1个月工艺保修卡",
  ],
};

const baseExtras: Record<BrandInstallationLocale, string[]> = {
  en: [
    "Copper pipe beyond 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)",
      "Drain pipe beyond 7 ft: RM 5/ft",
    "Wire beyond 7 ft: RM 9/ft",
    "Small PVC casing (electrical wire): RM 6/ft; large PVC casing (copper pipe + wire + insulation): RM 12/ft",
    "Standard compressor / outdoor bracket: RM 45",
    "Heavy-duty compressor / outdoor bracket: RM 70",
    "New electrical plug point: RM 100",
    "Wall hacking / concealment: RM 25/ft",
    "High-rise / difficult access: RM 50–150",
  ],
  ms: [
    "Paip tembaga melebihi 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)",
      "Paip saliran melebihi 7 ft: RM 5/ft",
    "Wayar elektrik melebihi 7 ft: RM 9/ft",
    "Casing PVC kecil (wayar elektrik): RM 6/kaki; casing PVC besar (paip kuprum + wayar + penebat): RM 12/kaki",
    "Braket kompressor / luaran standard: RM 45",
    "Braket kompressor / luaran heavy-duty: RM 70",
    "Pasang plug point baharu: RM 100",
    "Pecah dinding / penyembunyian: RM 25/ft",
    "Tinggi / akses sukar: RM 50–150",
  ],
  zh: [
    "超出7尺铜管：RM 17/尺 (1.0–1.5 匹), RM 23/尺 (2.0–2.5 匹), RM 27/尺 (3.0–3.5 匹)",
    "超出7尺排水管：RM 5/尺",
    "超出7尺电线：RM 9/尺",
    "小型PVC线槽（电线）：RM 6/尺；大型PVC线槽（铜管+电线+保温层）：RM 12/尺",
    "标准室外压缩机/支架：RM 45",
    "重型室外压缩机/支架：RM 70",
    "新增电源插座：RM 100",
    "敲墙/隐藏管线：RM 25/尺",
    "高层/困难施工：RM 50–150",
  ],
};

export function getBrandInstallationContent(
  slug: string,
  locale: BrandInstallationLocale,
): BrandInstallationContent {
  const brand = siteConfig.brandPages.find((b) => b.slug === slug);
  if (!brand) {
    throw new Error(`Brand not found for installation content: ${slug}`);
  }

  const name = brand.name;
  const phone = "+60182983573";

  const labels: Record<
    BrandInstallationLocale,
    {
      from: string;
      sameDay: string;
      warranty: string;
      allModels: string;
      installationOf: string;
      bookInstallation: string;
      call: string;
    }
  > = {
    en: {
      from: "From RM 199",
      sameDay: "Same-Day Available",
      warranty: "1-Month Warranty",
      allModels: "All Models",
      installationOf: "Installation of",
      bookInstallation: "Book Installation of",
      call: "Call",
    },
    ms: {
      from: "Dari RM 199",
      sameDay: "Hari Sama Tersedia",
      warranty: "Waranti 1 Bulan",
      allModels: "Semua Model",
      installationOf: "Pemasangan",
      bookInstallation: "Tempah Pemasangan",
      call: "Hubungi",
    },
    zh: {
      from: "RM199起",
      sameDay: "可当天上门",
      warranty: "1个月保修",
      allModels: "全型号",
      installationOf: "安装",
      bookInstallation: "预约安装",
      call: "致电",
    },
  };

  const l = labels[locale];
  const metaTitle = buildInstallationMetaTitle(name, locale, { type: "brand" });
  const metaDescription = buildInstallationMetaDesc(name, locale, { type: "brand" });

  return {
    metaTitle,
    metaDescription,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: brand.heroImage || "/hero/aircond-installation-kuala-lumpur.webp",
    ogImageAlt:
      locale === "en"
        ? `${name} aircond installation`
        : locale === "ms"
          ? `Pemasangan aircond ${name}`
          : `${name}冷气安装`,
    eyebrow: `${l.installationOf} ${name}`,
    h1:
      locale === "en"
        ? `${name} Aircond Installation`
        : locale === "ms"
          ? `Pemasangan Aircond ${name}`
          : `${name}冷气安装`,
    subtitle:
      locale === "en"
        ? `From RM 199 · Same-Day · Wall-Mounted, Ceiling Cassette & Window Units`
        : locale === "ms"
          ? `Dari RM 199 · Hari Sama · Dinding, Ceiling Cassette & Unit Tingkap`
          : `RM199起 · 当天服务 · 挂壁式、天花板卡式机与窗口式冷气`,
    heroBadges: [l.from, l.sameDay, l.warranty, l.allModels],
    introTitle:
      locale === "en"
        ? `Professional ${name} Aircond Installation`
        : locale === "ms"
          ? `Pemasangan Aircond ${name} Profesional`
          : `专业${name}冷气安装`,
    introBody: getIntroBody(brand, locale),
    modelsTitle:
      locale === "en"
        ? `${name} Models We Install`
        : locale === "ms"
          ? `Model ${name} Yang Kami Pasang`
          : `我们安装的${name}机型`,
    models: brand.models || [name],
    gasTitle:
      locale === "en"
        ? `${name} Refrigerant & Warranty`
        : locale === "ms"
          ? `Refrigeran & Waranti ${name}`
          : `${name}冷媒与保修`,
    gasBody: getGasBody(brand, locale),
    typesTitle:
      locale === "en"
        ? `Installation Types for ${name}`
        : locale === "ms"
          ? `Jenis Pemasangan untuk ${name}`
          : `${name}安装类型`,
    types: getTypes(brand, locale),
    pricingTitle:
      locale === "en"
        ? `${name} Installation Pricing`
        : locale === "ms"
          ? `Harga Pemasangan ${name}`
          : `${name}安装价格`,
    includedTitle:
      locale === "en" ? "What's Included" : locale === "ms" ? "Apa Yang Termasuk" : "包含项目",
    includedItems: baseIncluded[locale],
    extrasTitle:
      locale === "en"
        ? "Optional Extras (Quoted First)"
        : locale === "ms"
          ? "Tambahan Pilihan (Disebut Dahulu)"
          : "可选额外费用（先报价）",
    extrasItems: baseExtras[locale],
    whyTitle:
      locale === "en"
        ? `Why Install ${name} with KL Renovator?`
        : locale === "ms"
          ? `Kenapa Pilih KL Renovator untuk Pemasangan ${name}?`
          : `为什么选择 KL Renovator 安装${name}？`,
    whyItems: getWhyItems(brand, locale),
    faqs: getFAQs(brand, locale),
    ctaTitle:
      locale === "en"
        ? `${l.bookInstallation} ${name} Today`
        : locale === "ms"
          ? `${l.bookInstallation} ${name} Hari Ini`
          : `立即预约${name}冷气安装`,
    ctaBody:
      locale === "en"
        ? `Same-day ${name} installation slots are available across KL & Selangor. Get a confirmed price before we drill.`
        : locale === "ms"
          ? `Slot pemasangan ${name} hari sama tersedia di KL & Selangor. Dapatkan harga disahkan sebelum kami mula mengecer.`
          : `${name}当天安装名额覆盖吉隆坡及雪兰莪。施工前先确认价格。`,
    whatsAppLabel: `${l.bookInstallation} ${name} via WhatsApp`,
    breadcrumbLabel:
      locale === "en"
        ? `Installation of ${name}`
        : locale === "ms"
          ? `Pemasangan ${name}`
          : `${name}安装`,
  };
}

export function getAllBrandInstallationSlugs(): string[] {
  return siteConfig.brandPages.map((b) => b.slug);
}
