// Area-specific installation landing page content for INS-10 (Round 71).
// Every page is generated from real area data in config/site.ts so that
// content remains unique, accurate and natural across all 60 top-level areas.

import { siteConfig } from "@/config/site";

export type AreaInstallationLocale = "en" | "ms" | "zh";

export interface AreaInstallationContent {
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
  whereTitle: string;
  whereBody: string;
  whereLandmarks: string[];
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

// ── Stable pseudo-random index per area slug (deterministic, not random at runtime)
function areaVariant(slug: string, variants: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

function pick<T>(slug: string, items: T[]): T {
  return items[areaVariant(slug, items.length)];
}

function joinLandmarks(landmarks: string[], locale: AreaInstallationLocale, max = 4): string {
  const used = landmarks.slice(0, max);
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

function getLocaleState(state: string, locale: AreaInstallationLocale): string {
  if (locale === "en") return state;
  if (locale === "ms") {
    if (state.toLowerCase().includes("kuala lumpur")) return "Kuala Lumpur";
    if (state.toLowerCase().includes("selangor")) return "Selangor";
    if (state.toLowerCase().includes("putrajaya")) return "Putrajaya";
    return state;
  }
  if (state.toLowerCase().includes("kuala lumpur")) return "吉隆坡";
  if (state.toLowerCase().includes("selangor")) return "雪兰莪";
  if (state.toLowerCase().includes("putrajaya")) return "布城";
  return state;
}

function getIntroBody(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): string {
  const name = area.name;
  const state = getLocaleState(area.state, locale);
  const landmarks = joinLandmarks(area.landmarks, locale, 4);
  const firstLandmark = area.landmarks[0] || name;
  const secondLandmark = area.landmarks[1] || firstLandmark;

  if (locale === "en") {
    const templates = [
      `KL Renovator installs airconds across ${name} and the wider ${state} area. From ${landmarks}, our technicians fit wall-mounted units in condos and apartments, ceiling cassette systems in shops and offices, and window units in older flats — all with vacuum pump commissioning, dedicated electrical wiring, and a 1-month workmanship warranty.`,
      `Whether you are moving into a new home near ${firstLandmark}, upgrading an old non-inverter unit in ${secondLandmark}, or fitting out a commercial space elsewhere in ${name}, KL Renovator handles the full aircond installation from survey to final testing. We service all 20 major brands across ${state}.`,
      `${name} homes and businesses use many different aircond setups — high-rise condos near ${firstLandmark}, landed terraces around ${secondLandmark}, and shoplots along busy commercial strips. KL Renovator's installation team works in all of them, sizing the right HP, running copper pipe, and commissioning every unit properly.`,
      `Need a new aircond installed in ${name}? KL Renovator dispatches trained HVAC technicians throughout ${state}, including ${landmarks}. Every installation includes 7 ft copper pipe, wiring, drain pipe, a standard outdoor bracket, vacuum pump evacuation, and a 1-month workmanship warranty card.`,
    ];
    return pick(area.slug, templates);
  }

  if (locale === "ms") {
    const templates = [
      `KL Renovator memasang aircond di seluruh ${name} dan kawasan ${state} yang lebih luas. Dari ${landmarks}, juruteknik kami memasang unit dinding di kondominium dan pangsapuri, sistem ceiling cassette di kedai dan pejabat, serta unit tingkap di flat lama — semuanya dengan pentauliahan pam vakum, pendawaian elektrik khas, dan waranti kerja 1 bulan.`,
      `Sama ada anda berpindah ke rumah baharu berhampiran ${firstLandmark}, menaik taraf unit bukan inverter lama di ${secondLandmark}, atau memasang ruang komersial di ${name}, KL Renovator mengendalikan pemasangan aircond penuh dari tinjauan hingga ujian akhir. Kami menservis semua 20 jenama utama di ${state}.`,
      `Kediaman dan perniagaan di ${name} menggunakan pelbagai jenis aircond — kondominium tinggi berhampiran ${firstLandmark}, teres landed di sekitar ${secondLandmark}, dan kedai di sepanjang lorong komersial yang sibuk. Pasukan pemasangan KL Renovator bekerja di semuanya, menentukan saiz HP yang betul, memasang paip tembaga, dan menauliahkan setiap unit dengan betul.`,
      `Perlukan aircond baharu dipasang di ${name}? KL Renovator menghantar juruteknik HVAC berlatih di seluruh ${state}, termasuk ${landmarks}. Setiap pemasangan termasuk 7 ft paip tembaga, wayar, paip saliran, braket luar standard, pengosongan pam vakum, dan kad waranti kerja 1 bulan.`,
    ];
    return pick(area.slug, templates);
  }

  // zh
  const templates = [
    `KL Renovator 在${name}及整个${state}地区提供冷气安装服务。从${landmarks}，我们的技师为公寓和住宅安装挂壁式冷气、为店铺和办公室安装天花板卡式机、为老旧组屋安装窗式冷气——每项安装都包含真空泵抽真空、专用电路布线以及1个月工艺保修。`,
    `无论您是即将搬入${firstLandmark}附近的新家、为${secondLandmark}的旧非变频机升级，还是为${name}的商铺安装冷气，KL Renovator 都能完成从勘察到最终测试的完整安装流程。我们覆盖${state}所有20个主流品牌。`,
    `${name}的住宅和商业场所使用各种不同的冷气配置——${firstLandmark}附近的高层公寓、${secondLandmark}周边的排屋，以及繁忙商业街上的店屋。KL Renovator 的安装团队精通所有场景，会准确匹配马力、铺设铜管并规范调试每台机器。`,
    `需要在${name}安装新冷气？KL Renovator 派遣持证HVAC技师覆盖整个${state}，包括${landmarks}。每次安装均包含7尺铜管、电线、排水管、标准室外机支架、真空泵抽真空以及1个月工艺保修卡。`,
  ];
  return pick(area.slug, templates);
}

function getWhereBody(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): string {
  const name = area.name;
  const landmarks = joinLandmarks(area.landmarks, locale, 6);
  const first = area.landmarks[0] || name;
  const last = area.landmarks[area.landmarks.length - 1] || first;

  if (locale === "en") {
    return `We install airconds throughout ${name}, including ${landmarks}. Near ${first}, we commonly fit wall-mounted split units in condos and serviced residences. Around ${last}, we handle landed home installations as well as shoplot and small-office ceiling cassette systems. If your address is not listed, WhatsApp us anyway — our ${name} coverage route extends to all adjoining neighbourhoods.`;
  }
  if (locale === "ms") {
    return `Kami memasang aircond di seluruh ${name}, termasuk ${landmarks}. Berhampiran ${first}, kami biasanya memasang unit split dinding di kondominium dan kediaman servis. Di sekitar ${last}, kami mengendalikan pemasangan rumah landed serta sistem ceiling cassette untuk kedai dan pejabat kecil. Jika alamat anda tidak tersenarai, WhatsApp kami — laluan liputan ${name} kami merangkumi semua kawasan sekitar.`;
  }
  return `我们在${name}全区提供冷气安装服务，包括${landmarks}。在${first}附近，我们通常为公寓和服务式住宅安装挂壁式分体机；在${last}周边，我们则处理排屋住宅以及店屋和小型办公室的天花板卡式机系统。即使您的地址未列出，也请WhatsApp联系我们——我们的${name}服务路线覆盖所有邻近社区。`;
}

function getTypes(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): { title: string; body: string }[] {
  const name = area.name;
  const firstLandmark = area.landmarks[0] || name;

  if (locale === "en") {
    return [
      {
        title: "Wall-Mounted Split Installation",
        body: `The most common choice in ${name} homes and condos. We mount the indoor unit on a reinforced bracket, run copper pipe and wiring to the outdoor compressor, and finish with vacuum pump commissioning. Ideal for bedrooms and living rooms near ${firstLandmark}.`,
      },
      {
        title: "Ceiling Cassette Installation",
        body: `Popular for ${name} offices, retail shops, and large open-plan homes. We supply and fit the ceiling suspension kit, drain pump, and piping, then align the cassette for even four-way airflow.`,
      },
      {
        title: "Window Unit Installation",
        body: `A practical, budget-friendly option for older ${name} apartments and rental rooms. We secure the unit in the window frame, seal the opening, and wire it to a dedicated circuit.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        title: "Pemasangan Split Dinding",
        body: `Pilihan paling biasa di rumah dan kondominium ${name}. Kami memasang unit dalaman pada braket yang diperkukuh, memasang paip tembaga dan wayar ke kompresor luar, dan menyelesaikan dengan pentauliahan pam vakum. Ideal untuk bilik tidur dan ruang tamu berhampiran ${firstLandmark}.`,
      },
      {
        title: "Pemasangan Ceiling Cassette",
        body: `Popular untuk pejabat, kedai runcit, dan rumah terbuka besar di ${name}. Kami membekal dan memasang kit suspensi siling, pam saliran, dan paip, kemudian menyelaraskan cassette untuk aliran udara empat arah yang sekata.`,
      },
      {
        title: "Pemasangan Unit Tingkap",
        body: `Pilihan praktikal dan mesra bajet untuk pangsapuri lama serta bilik sewa di ${name}. Kami memasang unit dengan selamat di bingkai tingkap, menyegel bukaan, dan menyambung wayar ke litar khas.`,
      },
    ];
  }

  return [
    {
      title: "挂壁式分体机安装",
      body: `${name}家庭和公寓最常见的选择。我们会将室内机安装在加固支架上，铺设铜管和电线连接室外压缩机，最后进行真空泵抽真空调试。非常适合${firstLandmark}附近的卧室和客厅。`,
    },
    {
      title: "天花板卡式机安装",
      body: `${name}的办公室、零售店和大型开放式住宅常选用此方案。我们提供并安装吊顶悬挂套件、排水泵和管线，然后对卡式机进行四向均匀气流对位。`,
    },
    {
      title: "窗口式冷气安装",
      body: `${name}老旧公寓和出租房的经济实用选择。我们将机体固定在窗框内，密封开口，并接入专用电路。`,
    },
  ];
}

function getWhyItems(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): { title: string; body: string }[] {
  const name = area.name;

  if (locale === "en") {
    return [
      { title: "Local ${name} Technicians", body: `Our team knows ${name} building types, JMB procedures, and access constraints, so installations are scheduled efficiently.` },
      { title: "Right HP, Every Time", body: `We measure your room size, ceiling height, and sun exposure before recommending 1HP, 1.5HP, or 2HP for ${name}'s climate.` },
      { title: "Vacuum Pump Standard", body: `Every installation in ${name} includes proper evacuation to protect your compressor and keep manufacturer warranty valid.` },
      { title: "Price Confirmed First", body: `Copper pipe, wiring, brackets, and extras are quoted before drilling begins — no surprise bills in ${name}.` },
    ];
  }

  if (locale === "ms") {
    return [
      { title: `Juruteknik ${name} Tempatan`, body: `Pasukan kami mengenali jenis bangunan, prosedur JMB, dan kekangan akses di ${name}, jadi pemasangan dijadualkan dengan cekap.` },
      { title: "HP Yang Tepat, Setiap Masa", body: `Kami mengukur saiz bilik, ketinggian siling, dan pendedahan matahari sebelum mencadangkan 1HP, 1.5HP, atau 2HP untuk iklim ${name}.` },
      { title: "Standard Pam Vakum", body: `Setiap pemasangan di ${name} termasuk pengosongan yang betul untuk melindungi pemampat anda dan mengekalkan waranti pengeluar.` },
      { title: "Harga Disahkan Dahulu", body: `Paip tembaga, wayar, braket, dan tambahan disebut sebelum mengecer bermula — tiada bil surprise di ${name}.` },
    ];
  }

  return [
    { title: `${name}本地技师`, body: `我们的团队熟悉${name}的建筑类型、管理处（JMB）流程和进出限制，因此安装安排高效顺畅。` },
    { title: "每次匹配正确马力", body: `我们会先测量房间大小、天花板高度和日照情况，再针对${name}的气候推荐1匹、1.5匹或2匹机型。` },
    { title: "真空泵标准作业", body: `${name}的每次安装都包含规范抽真空，保护压缩机并维持制造商保修有效。` },
    { title: "先确认价格", body: `铜管、电线、支架和额外费用均在钻孔施工前报价——在${name}绝无意外账单。` },
  ];
}

function getFAQs(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): { q: string; a: string }[] {
  const name = area.name;
  const firstLandmark = area.landmarks[0] || name;
  const state = getLocaleState(area.state, locale);

  if (locale === "en") {
    return [
      {
        q: `How much does aircond installation cost in ${name}?`,
        a: `Wall-mounted installation in ${name} starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP, and RM 279–RM 329 for larger units. Ceiling cassette starts from RM 290, and window units from RM 180. Every quote includes 7 ft copper pipe, wiring, drain pipe, and a standard bracket.`,
      },
      {
        q: `How long does aircond installation take in ${name}?`,
        a: `A standard wall-mounted unit in ${name} takes 3–5 hours including vacuum pump commissioning and electrical testing. Ceiling cassette installations take 5–8 hours. Window units are usually completed in 2–3 hours.`,
      },
      {
        q: `Do you install aircond in condos near ${firstLandmark}?`,
        a: `Yes — KL Renovator regularly installs wall-mounted and ceiling cassette units in condos and high-rises near ${firstLandmark} and across ${name}. We coordinate with building management for lift and service-ledge access where required.`,
      },
      {
        q: `Which aircond brands can you install in ${name}?`,
        a: `All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, and Isonic. We install both inverter and non-inverter units.`,
      },
      {
        q: `Is same-day aircond installation available in ${name}?`,
        a: `Same-day installation is often available in ${name} and surrounding ${state} areas for bookings confirmed before 11 AM. WhatsApp +60182983573 with your address and preferred unit size to check today's slot.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        q: `Berapa harga pemasangan aircond di ${name}?`,
        a: `Pemasangan dinding di ${name} bermula RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP, dan RM 279–RM 329 untuk unit lebih besar. Ceiling cassette bermula RM 290, dan unit tingkap dari RM 180. Setiap sebut harga termasuk 7 ft paip tembaga, wayar, paip saliran, dan braket standard.`,
      },
      {
        q: `Berapa lama pemasangan aircond di ${name}?`,
        a: `Unit dinding standard di ${name} mengambil masa 3–5 jam termasuk pentauliahan pam vakum dan ujian elektrik. Pemasangan ceiling cassette mengambil masa 5–8 jam. Unit tingkap biasanya siap dalam 2–3 jam.`,
      },
      {
        q: `Adakah anda memasang aircond di kondominium berhampiran ${firstLandmark}?`,
        a: `Ya — KL Renovator kerap memasang unit dinding dan ceiling cassette di kondominium dan bangunan tinggi berhampiran ${firstLandmark} dan di seluruh ${name}. Kami menyelaraskan dengan pengurusan bangunan untuk akses lif dan service ledge jika diperlukan.`,
      },
      {
        q: `Jenama aircond apa yang anda boleh pasang di ${name}?`,
        a: `Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, dan Isonic. Kami memasang unit inverter dan bukan inverter.`,
      },
      {
        q: `Adakah pemasangan aircond hari sama tersedia di ${name}?`,
        a: `Pemasangan hari sama kerap tersedia di ${name} dan kawasan ${state} sekitar untuk tempahan yang disahkan sebelum 11 pagi. WhatsApp +60182983573 dengan alamat dan saiz unit pilihan anda untuk semak slot hari ini.`,
      },
    ];
  }

  return [
    {
      q: `${name}的冷气安装费用是多少？`,
      a: `${name}的挂壁式安装从RM 199起（1.0–1.5匹），2.0匹RM 249，更大马力RM 279–RM 329。天花板卡式机从RM 290起，窗式机从RM 180起。每次报价均包含7尺铜管、电线、排水管和标准支架。`,
    },
    {
      q: `${name}的冷气安装需要多长时间？`,
      a: `${name}的标准挂壁式安装约需3–5小时，包括真空泵抽真空和电路测试。天花板卡式机安装约需5–8小时。窗口式冷气通常2–3小时完成。`,
    },
    {
      q: `你们会在${firstLandmark}附近的公寓安装冷气吗？`,
      a: `是的——KL Renovator 经常在${firstLandmark}附近及${name}全区的高层公寓安装挂壁式和天花板卡式机。如需使用电梯和服务阳台，我们会与大厦管理处协调。`,
    },
    {
      q: `在${name}可以安装哪些冷气品牌？`,
      a: `我们安装20个主流品牌——Daikin、Panasonic、Mitsubishi、York、Acson、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL和Isonic。变频与非变频机型均可安装。`,
    },
    {
      q: `${name}有当天冷气安装服务吗？`,
      a: `${name}及${state}周边地区通常在上午11点前确认预约可安排当天安装。请WhatsApp +60182983573告知地址和所需马力以查询今日名额。`,
    },
  ];
}

const baseIncluded: Record<AreaInstallationLocale, string[]> = {
  en: [
    "Free site survey & quotation",
    "7 ft copper pipe (liquid + gas lines)",
    "7 ft electrical wiring",
    "7 ft PVC drain pipe",
    "Standard outdoor bracket",
    "Vacuum pump commissioning",
    "Refrigerant release & run test",
    "1-month workmanship warranty card",
  ],
  ms: [
    "Pemeriksaan tapak & sebut harga percuma",
    "7 ft paip tembaga (tali cecair + gas)",
    "7 ft wayar elektrik",
    "7 ft paip saliran PVC",
    "Braket luar standard",
    "Pentauliahan pam vakum",
    "Pelepasan refrigeran & ujian jalan",
    "Kad waranti kerja 1 bulan",
  ],
  zh: [
    "免费现场勘察与报价",
    "7尺铜管（液管+气管）",
    "7尺电线",
    "7尺PVC排水管",
    "标准室外机支架",
    "真空泵抽真空调试",
    "冷媒释放与运行测试",
    "1个月工艺保修卡",
  ],
};

const baseExtras: Record<AreaInstallationLocale, string[]> = {
  en: [
    "Copper pipe beyond 7 ft: RM 17–27/ft",
    "Wire beyond 7 ft: RM 9/ft",
    "PVC casing / concealment: RM 6–12/ft",
    "Heavy-duty bracket upgrade: RM 45",
    "New electrical plug point: RM 100",
    "Wall hacking / concealment: RM 6/ft",
    "High-rise / difficult access: RM 50–150",
  ],
  ms: [
    "Paip tembaga melebihi 7 ft: RM 17–27/ft",
    "Wayar melebihi 7 ft: RM 9/ft",
    "Casing PVC / penyembunyian: RM 6–12/ft",
    "Naik taraf braket heavy-duty: RM 45",
    "Pasang plug point baharu: RM 100",
    "Pecah dinding / penyembunyian: RM 6/ft",
    "Tinggi / akses sukar: RM 50–150",
  ],
  zh: [
    "超出7尺铜管：RM 17–27/尺",
    "超出7尺电线：RM 9/尺",
    "PVC套管/隐藏：RM 6–12/尺",
    "重型支架升级：RM 45",
    "新增电源插座：RM 100",
    "敲墙/隐藏管线：RM 6/尺",
    "高层/困难施工：RM 50–150",
  ],
};

function isRealArea(area: (typeof siteConfig.areaPages)[number]): boolean {
  return Boolean(
    area && typeof area.lat === "number" && typeof area.lng === "number" && Array.isArray(area.landmarks) && area.landmarks.length > 0,
  );
}

export function getAreaInstallationContent(
  slug: string,
  locale: AreaInstallationLocale,
): AreaInstallationContent {
  const area = siteConfig.areaPages.find((a) => a.slug === slug);
  if (!area) {
    throw new Error(`Area not found for installation content: ${slug}`);
  }

  const name = area.name;
  const state = getLocaleState(area.state, locale);
  const phone = "+60182983573";

  const labels: Record<
    AreaInstallationLocale,
    {
      from: string;
      sameDay: string;
      warranty: string;
      allBrands: string;
      installationIn: string;
      bookInstallation: string;
      call: string;
    }
  > = {
    en: {
      from: "From RM 199",
      sameDay: "Same-Day Available",
      warranty: "1-Month Warranty",
      allBrands: "All 20 Brands",
      installationIn: "Aircond Installation in",
      bookInstallation: "Book Installation in",
      call: "Call",
    },
    ms: {
      from: "Dari RM 199",
      sameDay: "Hari Sama Tersedia",
      warranty: "Waranti 1 Bulan",
      allBrands: "Semua 20 Jenama",
      installationIn: "Pemasangan Aircond di",
      bookInstallation: "Tempah Pemasangan di",
      call: "Hubungi",
    },
    zh: {
      from: "RM199起",
      sameDay: "可当天上门",
      warranty: "1个月保修",
      allBrands: "20个品牌",
      installationIn: "冷气安装在",
      bookInstallation: "预约安装",
      call: "致电",
    },
  };

  const l = labels[locale];

  return {
    metaTitle:
      locale === "en"
        ? `Aircond Installation ${name} — From RM199 | Same-Day | KL Renovator`
        : locale === "ms"
          ? `Pemasangan Aircond ${name} — Dari RM199 | Hari Sama | KL Renovator`
          : `${name}冷气安装 — RM199起 | 当天服务 | KL Renovator`,
    metaDescription:
      locale === "en"
        ? `Professional aircond installation in ${name}, ${state} from RM199. Wall-mounted, ceiling cassette & window units. Same-day slots, vacuum pump, 1-month warranty. WhatsApp ${phone}.`
        : locale === "ms"
          ? `Pemasangan aircond profesional di ${name}, ${state} dari RM199. Unit dinding, ceiling cassette & unit tingkap. Slot hari sama, pam vakum, waranti 1 bulan. WhatsApp ${phone}.`
          : `专业冷气安装服务覆盖${name}、${state}，RM199起。挂壁式、天花板卡式机、窗口式冷气均可安装，当天可约，含真空泵调试与1个月保修。WhatsApp ${phone}。`,
    ogTitle:
      locale === "en"
        ? `Aircond Installation ${name} — From RM199 | Same-Day | KL Renovator`
        : locale === "ms"
          ? `Pemasangan Aircond ${name} — Dari RM199 | Hari Sama | KL Renovator`
          : `${name}冷气安装 — RM199起 | 当天服务 | KL Renovator`,
    ogDescription:
      locale === "en"
        ? `Professional aircond installation in ${name}, ${state} from RM199. Wall-mounted, ceiling cassette & window units. Same-day slots, vacuum pump, 1-month warranty.`
        : locale === "ms"
          ? `Pemasangan aircond profesional di ${name}, ${state} dari RM199. Unit dinding, ceiling cassette & unit tingkap. Slot hari sama, pam vakum, waranti 1 bulan.`
          : `专业冷气安装服务覆盖${name}、${state}，RM199起。挂壁式、天花板卡式机、窗口式冷气均可安装，当天可约。`,
    ogImage: area.heroImage || "/hero/aircond-installation-kuala-lumpur.webp",
    ogImageAlt:
      locale === "en"
        ? `Aircond installation in ${name}`
        : locale === "ms"
          ? `Pemasangan aircond di ${name}`
          : `${name}冷气安装`,
    eyebrow: `${l.installationIn} ${name}`,
    h1:
      locale === "en"
        ? `Aircond Installation ${name}`
        : locale === "ms"
          ? `Pemasangan Aircond ${name}`
          : `${name}冷气安装`,
    subtitle:
      locale === "en"
        ? `From RM 199 · Same-Day · Wall-Mounted, Ceiling Cassette & Window Units`
        : locale === "ms"
          ? `Dari RM 199 · Hari Sama · Dinding, Ceiling Cassette & Unit Tingkap`
          : `RM199起 · 当天服务 · 挂壁式、天花板卡式机与窗口式冷气`,
    heroBadges: [l.from, l.sameDay, l.warranty, l.allBrands],
    introTitle:
      locale === "en"
        ? `Professional Aircond Installation in ${name}`
        : locale === "ms"
          ? `Pemasangan Aircond Profesional di ${name}`
          : `${name}专业冷气安装`,
    introBody: getIntroBody(area, locale),
    whereTitle:
      locale === "en"
        ? `Where We Install in ${name}`
        : locale === "ms"
          ? `Kawasan Pemasangan di ${name}`
          : `${name}服务覆盖区域`,
    whereBody: getWhereBody(area, locale),
    whereLandmarks: area.landmarks.slice(0, 8),
    typesTitle:
      locale === "en"
        ? `Installation Types for ${name} Homes & Businesses`
        : locale === "ms"
          ? `Jenis Pemasangan untuk Rumah & Perniagaan ${name}`
          : `${name}住宅与商业安装类型`,
    types: getTypes(area, locale),
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
        ? `Why Install with KL Renovator in ${name}?`
        : locale === "ms"
          ? `Kenapa Pilih KL Renovator untuk Pemasangan di ${name}?`
          : `为什么选择 KL Renovator 在${name}安装冷气？`,
    whyItems: getWhyItems(area, locale),
    faqs: getFAQs(area, locale),
    ctaTitle:
      locale === "en"
        ? `${l.bookInstallation} ${name} Today`
        : locale === "ms"
          ? `${l.bookInstallation} ${name} Hari Ini`
          : `立即预约${name}冷气安装`,
    ctaBody:
      locale === "en"
        ? `Same-day installation slots are available across ${name} and surrounding ${state}. Get a confirmed price before we drill.`
        : locale === "ms"
          ? `Slot pemasangan hari sama tersedia di ${name} dan ${state} sekitar. Dapatkan harga disahkan sebelum kami mula mengecer.`
          : `${name}及${state}周边地区当天安装名额有限。施工前先确认价格。`,
    whatsAppLabel: `${l.bookInstallation} ${name} via WhatsApp`,
    breadcrumbLabel:
      locale === "en"
        ? `Installation in ${name}`
        : locale === "ms"
          ? `Pemasangan di ${name}`
          : `${name}安装`,
  };
}

export function getAllAreaInstallationSlugs(): string[] {
  return siteConfig.areaPages.filter(isRealArea).map((a) => a.slug);
}
