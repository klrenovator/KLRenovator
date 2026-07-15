// Kampung/neighbourhood-level installation landing page content for INS-10 (Round 72).
// Content is generated from real kampung data in config/site.ts so every page
// remains unique, accurate and natural across all 158 neighbourhoods.

import { siteConfig } from "@/config/site";

export type KampungInstallationLocale = "en" | "ms" | "zh";

export interface KampungInstallationContent {
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
  localNoteTitle: string;
  localNoteBody: string;
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
  tipsTitle: string;
  tips: { title: string; body: string }[];
  nearbyTitle: string;
  nearbyKampungs: { name: string; slug: string; parentSlug: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  whatsAppLabel: string;
  breadcrumbLabel: string;
  lat?: number;
  lng?: number;
}

// ── Deterministic variant selection by kampung slug (stable across builds)
function kampungVariant(slug: string, variants: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

function pick<T>(slug: string, items: T[]): T {
  return items[kampungVariant(slug, items.length)];
}

function joinLandmarks(landmarks: string[], locale: KampungInstallationLocale, max = 4): string {
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

function getLocaleState(state: string, locale: KampungInstallationLocale): string {
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

function getHousingTypeNote(housingNote: string, locale: KampungInstallationLocale): string {
  if (locale === "en") return housingNote;
  if (locale === "ms") {
    // Minimal natural Malay translation for common housing terms
    return housingNote
      .replace(/double-storey terrace houses?/gi, "rumah teres dua tingkat")
      .replace(/terrace houses?/gi, "rumah teres")
      .replace(/apartment blocks?/gi, "blok pangsapuri")
      .replace(/apartments?/gi, "pangsapuri")
      .replace(/condominiums?/gi, "kondominium")
      .replace(/bungalows?/gi, "banglo")
      .replace(/semi-detached houses?/gi, "rumah berkembar")
      .replace(/shoplots?/gi, "kedai")
      .replace(/offices?/gi, "pejabat")
      .replace(/landed homes?/gi, "rumah landed")
      .replace(/high-rise/gi, "tinggi")
      .replace(/near/gi, "berhampiran")
      .replace(/off the/gi, "di tepi")
      .replace(/MRR2/g, "MRR2");
  }
  return housingNote
    .replace(/double-storey terrace houses?/gi, "双层排屋")
    .replace(/terrace houses?/gi, "排屋")
    .replace(/apartment blocks?/gi, "公寓楼")
    .replace(/apartments?/gi, "公寓")
    .replace(/condominiums?/gi, "公寓")
    .replace(/bungalows?/gi, "洋房")
    .replace(/semi-detached houses?/gi, "半独立式住宅")
    .replace(/shoplots?/gi, "店屋")
    .replace(/offices?/gi, "办公室")
    .replace(/landed homes?/gi, "有地住宅")
    .replace(/high-rise/gi, "高层")
    .replace(/near/gi, "靠近")
    .replace(/off the/gi, "临近")
    .replace(/MRR2/g, "MRR2");
}

function getIntroBody(
  kampung: (typeof siteConfig.kampungPages)[number],
  parent: (typeof siteConfig.areaPages)[number],
  locale: KampungInstallationLocale,
): string {
  const name = kampung.name;
  const parentName = parent.name;
  const state = getLocaleState(kampung.state, locale);
  const housing = getHousingTypeNote(kampung.housingNote, locale);
  const firstLandmark = parent.landmarks[0] || parentName;

  if (locale === "en") {
    const templates = [
      `KL Renovator installs airconds in ${name}, ${parentName}. This neighbourhood is known for ${housing}. Our technicians size the right HP, run copper pipe, and commission every unit with vacuum pump evacuation and a 1-month workmanship warranty.`,
      `Whether you live in a high-rise or landed home in ${name}, KL Renovator handles full aircond installation from survey to testing. We cover all 20 major brands across ${state}, including jobs near ${firstLandmark}.`,
      `${name} has a mix of ${housing}. KL Renovator's installers work in all of them, fitting wall-mounted units, ceiling cassettes, and window units with the same quality standards used across ${parentName}.`,
      `Need a new aircond in ${name}? Our ${parentName} team dispatches trained HVAC technicians to this neighbourhood. Every installation includes 7 ft copper pipe, wiring, drain pipe, a standard outdoor bracket, vacuum pump commissioning, and a 1-month workmanship warranty card.`,
    ];
    return pick(kampung.slug, templates);
  }

  if (locale === "ms") {
    const templates = [
      `KL Renovator memasang aircond di ${name}, ${parentName}. Kawasan kejiranan ini dikenali dengan ${housing}. Juruteknik kami menentukan saiz HP yang betul, memasang paip tembaga, dan menauliahkan setiap unit dengan pengosongan pam vakum dan waranti kerja 1 bulan.`,
      `Sama ada anda tinggal di rumah tinggi atau landed di ${name}, KL Renovator mengendalikan pemasangan aircond penuh dari tinjauan hingga ujian. Kami merangkumi semua 20 jenama utama di ${state}, termasuk kerja berhampiran ${firstLandmark}.`,
      `${name} mempunyai campuran ${housing}. Pemasang KL Renovator bekerja di semuanya, memasang unit dinding, ceiling cassette, dan unit tingkap dengan standard kualiti yang sama digunakan di seluruh ${parentName}.`,
      `Perlukan aircond baharu di ${name}? Pasukan ${parentName} kami menghantar juruteknik HVAC berlatih ke kawasan ini. Setiap pemasangan termasuk 7 ft paip tembaga, wayar, paip saliran, braket luar standard, pentauliahan pam vakum, dan kad waranti kerja 1 bulan.`,
    ];
    return pick(kampung.slug, templates);
  }

  const templates = [
    `KL Renovator 在${name}（${parentName}）提供冷气安装服务。该社区以${housing}为主。我们的技师会准确匹配马力、铺设铜管，并用真空泵抽真空调试，同时提供1个月工艺保修。`,
    `无论您在${name}住的是高层公寓还是有地住宅，KL Renovator 都能完成从勘察到测试的完整安装流程。我们覆盖${state}所有20个主流品牌，包括${firstLandmark}附近的安装项目。`,
    `${name}混合了${housing}。KL Renovator 的安装团队精通所有户型，安装挂壁式、天花板卡式机和窗口式冷气均采用与${parentName}全区一致的品质标准。`,
    `需要在${name}安装新冷气？我们的${parentName}团队会派遣持证HVAC技师前往该社区。每次安装均包含7尺铜管、电线、排水管、标准室外机支架、真空泵抽真空以及1个月工艺保修卡。`,
  ];
  return pick(kampung.slug, templates);
}

function getWhereBody(
  kampung: (typeof siteConfig.kampungPages)[number],
  parent: (typeof siteConfig.areaPages)[number],
  locale: KampungInstallationLocale,
): string {
  const name = kampung.name;
  const parentName = parent.name;
  const landmarks = joinLandmarks(parent.landmarks, locale, 6);

  if (locale === "en") {
    return `We install airconds throughout ${name} and the surrounding ${parentName} area, including ${landmarks}. Our team is familiar with the housing layout here — ${getHousingTypeNote(kampung.housingNote, "en")} — so we arrive with the right brackets, copper pipe length, and access tools for your building type.`;
  }
  if (locale === "ms") {
    return `Kami memasang aircond di seluruh ${name} dan kawasan ${parentName} sekitar, termasuk ${landmarks}. Pasukan kami biasa dengan susunan perumahan di sini — ${getHousingTypeNote(kampung.housingNote, "ms")} — jadi kami tiba dengan braket, panjang paip tembaga, dan alat akses yang sesuai untuk jenis bangunan anda.`;
  }
  return `我们在${name}及整个${parentName}周边地区提供冷气安装服务，包括${landmarks}。我们的团队熟悉这里的住宅布局——${getHousingTypeNote(kampung.housingNote, "zh")}——因此会针对您的建筑类型携带合适的支架、铜管长度和施工工具。`;
}

function getTypes(
  kampung: (typeof siteConfig.kampungPages)[number],
  locale: KampungInstallationLocale,
): { title: string; body: string }[] {
  const name = kampung.name;
  const housing = getHousingTypeNote(kampung.housingNote, locale);

  if (locale === "en") {
    return [
      {
        title: "Wall-Mounted Split Installation",
        body: `The most popular choice in ${name} homes. We mount the indoor unit on a reinforced bracket, run copper pipe and wiring to the outdoor compressor, and finish with vacuum pump commissioning. Ideal for the bedrooms and living rooms common in ${name}.`,
      },
      {
        title: "Ceiling Cassette Installation",
        body: `Great for ${name} shoplots, offices, and large open-plan homes. We fit the ceiling suspension kit, drain pump, and piping, then align the cassette for even four-way airflow.`,
      },
      {
        title: "Window Unit Installation",
        body: `A practical option for older apartments and rental rooms in ${name}. We secure the unit in the window frame, seal the opening, and wire it to a dedicated circuit.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        title: "Pemasangan Split Dinding",
        body: `Pilihan paling popular di rumah ${name}. Kami memasang unit dalaman pada braket yang diperkukuh, memasang paip tembaga dan wayar ke kompresor luar, dan menyelesaikan dengan pentauliahan pam vakum. Ideal untuk bilik tidur dan ruang tamu yang biasa di ${name}.`,
      },
      {
        title: "Pemasangan Ceiling Cassette",
        body: `Sesuai untuk kedai, pejabat, dan rumah terbuka besar di ${name}. Kami memasang kit suspensi siling, pam saliran, dan paip, kemudian menyelaraskan cassette untuk aliran udara empat arah yang sekata.`,
      },
      {
        title: "Pemasangan Unit Tingkap",
        body: `Pilihan praktikal untuk pangsapuri lama dan bilik sewa di ${name}. Kami memasang unit dengan selamat di bingkai tingkap, menyegel bukaan, dan menyambung wayar ke litar khas.`,
      },
    ];
  }

  return [
    {
      title: "挂壁式分体机安装",
      body: `${name}家庭最常见的选择。我们会将室内机安装在加固支架上，铺设铜管和电线连接室外压缩机，最后进行真空泵抽真空调试。非常适合${name}常见的卧室和客厅。`,
    },
    {
      title: "天花板卡式机安装",
      body: `适合${name}的店屋、办公室和大型开放式住宅。我们安装吊顶悬挂套件、排水泵和管线，然后对卡式机进行四向均匀气流对位。`,
    },
    {
      title: "窗口式冷气安装",
      body: `${name}老旧公寓和出租房的实用选择。我们将机体固定在窗框内，密封开口，并接入专用电路。`,
    },
  ];
}

function getWhyItems(
  kampung: (typeof siteConfig.kampungPages)[number],
  parent: (typeof siteConfig.areaPages)[number],
  locale: KampungInstallationLocale,
): { title: string; body: string }[] {
  const name = kampung.name;
  const parentName = parent.name;

  if (locale === "en") {
    return [
      { title: `Local ${name} Knowledge`, body: `Our installers understand the building types and access constraints in ${name}, so jobs are scheduled efficiently.` },
      { title: "Right HP, Every Home", body: `We measure room size, ceiling height, and sun exposure before recommending 1HP, 1.5HP, or 2HP for your ${name} home.` },
      { title: "Vacuum Pump Standard", body: `Every installation in ${name} includes proper evacuation to protect your compressor and keep manufacturer warranty valid.` },
      { title: "Price Confirmed First", body: `Copper pipe, wiring, brackets, and extras are quoted before drilling begins — no surprise bills in ${name}.` },
    ];
  }

  if (locale === "ms") {
    return [
      { title: `Pengetahuan Tempatan ${name}`, body: `Pemasang kami memahami jenis bangunan dan kekangan akses di ${name}, jadi kerja dijadualkan dengan cekap.` },
      { title: "HP Tepat, Setiap Rumah", body: `Kami mengukur saiz bilik, ketinggian siling, dan pendedahan matahari sebelum mencadangkan 1HP, 1.5HP, atau 2HP untuk rumah anda di ${name}.` },
      { title: "Standard Pam Vakum", body: `Setiap pemasangan di ${name} termasuk pengosongan yang betul untuk melindungi pemampat anda dan mengekalkan waranti pengeluar.` },
      { title: "Harga Disahkan Dahulu", body: `Paip tembaga, wayar, braket, dan tambahan disebut sebelum mengecer bermula — tiada bil surprise di ${name}.` },
    ];
  }

  return [
    { title: `${name}本地经验`, body: `我们的安装团队熟悉${name}的建筑类型和进出限制，因此安装安排高效顺畅。` },
    { title: "每户匹配正确马力", body: `我们会先测量房间大小、天花板高度和日照情况，再为您的${name}住宅推荐1匹、1.5匹或2匹机型。` },
    { title: "真空泵标准作业", body: `${name}的每次安装都包含规范抽真空，保护压缩机并维持制造商保修有效。` },
    { title: "先确认价格", body: `铜管、电线、支架和额外费用均在钻孔施工前报价——在${name}绝无意外账单。` },
  ];
}

function getGeneratedFAQs(
  kampung: (typeof siteConfig.kampungPages)[number],
  parent: (typeof siteConfig.areaPages)[number],
  locale: KampungInstallationLocale,
): { q: string; a: string }[] {
  const name = kampung.name;
  const parentName = parent.name;
  const state = getLocaleState(kampung.state, locale);
  const housing = getHousingTypeNote(kampung.housingNote, locale);

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
        q: `Do you install aircond in ${housing} in ${name}?`,
        a: `Yes — KL Renovator regularly installs wall-mounted and ceiling cassette units in ${name}, including ${housing}. We coordinate with building management for lift and service-ledge access where required.`,
      },
      {
        q: `Which aircond brands can you install in ${name}?`,
        a: `All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, and Isonic. We install both inverter and non-inverter units.`,
      },
      {
        q: `Is same-day aircond installation available in ${name}?`,
        a: `Same-day installation is often available in ${name} and surrounding ${parentName} areas for bookings confirmed before 11 AM. WhatsApp +60182983573 with your address and preferred unit size to check today's slot.`,
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
        q: `Adakah anda memasang aircond di ${housing} di ${name}?`,
        a: `Ya — KL Renovator kerap memasang unit dinding dan ceiling cassette di ${name}, termasuk ${housing}. Kami menyelaraskan dengan pengurusan bangunan untuk akses lif dan service ledge jika diperlukan.`,
      },
      {
        q: `Jenama aircond apa yang anda boleh pasang di ${name}?`,
        a: `Semua 20 jenama utama — Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, dan Isonic. Kami memasang unit inverter dan bukan inverter.`,
      },
      {
        q: `Adakah pemasangan aircond hari sama tersedia di ${name}?`,
        a: `Pemasangan hari sama kerap tersedia di ${name} dan kawasan ${parentName} sekitar untuk tempahan yang disahkan sebelum 11 pagi. WhatsApp +60182983573 dengan alamat dan saiz unit pilihan anda untuk semak slot hari ini.`,
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
      q: `你们会在${name}的${housing}安装冷气吗？`,
      a: `是的——KL Renovator 经常在${name}安装挂壁式和天花板卡式机，包括${housing}。如需使用电梯和服务阳台，我们会与大厦管理处协调。`,
    },
    {
      q: `在${name}可以安装哪些冷气品牌？`,
      a: `我们安装20个主流品牌——Daikin、Panasonic、Mitsubishi、York、Acson、Carrier、Midea、Haier、Toshiba、Hitachi、Samsung、LG、Sharp、Fujitsu、Gree、National、Hisense、Aux、TCL和Isonic。变频与非变频机型均可安装。`,
    },
    {
      q: `${name}有当天冷气安装服务吗？`,
      a: `${name}及${parentName}周边地区通常在上午11点前确认预约可安排当天安装。请WhatsApp +60182983573告知地址和所需马力以查询今日名额。`,
    },
  ];
}

function getFAQs(
  kampung: (typeof siteConfig.kampungPages)[number],
  parent: (typeof siteConfig.areaPages)[number],
  locale: KampungInstallationLocale,
): { q: string; a: string }[] {
  const source = locale === "en" ? kampung.faqs : locale === "ms" ? kampung.faqsBM : kampung.faqsZH;
  const kampungSpecific = source && source.length > 0 ? source.slice(0, 5) : [];
  const generated = getGeneratedFAQs(kampung, parent, locale);
  // Merge: use kampung-specific FAQs first, then fill with generated until we reach 8
  const merged = [...kampungSpecific];
  for (const g of generated) {
    if (merged.length >= 8) break;
    const exists = merged.some((q) => q.q === g.q);
    if (!exists) merged.push(g);
  }
  return merged;
}

function getLocalNote(
  kampung: (typeof siteConfig.kampungPages)[number],
  locale: KampungInstallationLocale,
): string {
  const raw =
    locale === "en"
      ? kampung.description
      : locale === "ms"
        ? kampung.descriptionMS
        : kampung.descriptionZH;
  if (!raw) return "";
  // Re-frame existing real description for installation context without inventing facts.
  const prefix =
    locale === "en"
      ? `When installing or replacing an aircond in ${kampung.name}, it helps to know the local housing profile. `
      : locale === "ms"
        ? `Semasa memasang atau mengganti aircond di ${kampung.name}, adalah membantu untuk memahami profil perumahan tempatan. `
        : `在${kampung.name}安装或更换冷气时，了解当地住宅概况会很有帮助。`;
  return prefix + raw;
}

function getInstallationTips(
  kampung: (typeof siteConfig.kampungPages)[number],
  locale: KampungInstallationLocale,
): { title: string; body: string }[] {
  const name = kampung.name;
  const housing = getHousingTypeNote(kampung.housingNote, locale).toLowerCase();
  const isLanded = /terrace|bungalow|semi-detached|landed|kampung|single-storey|double-storey|rumah/.test(housing);
  const isHighRise = /apartment|condo|high-rise|pangsapuri|kondominium|tinggi|公寓/.test(housing);
  const isShoplot = /shoplot|shop office|kedai|店屋/.test(housing);

  if (locale === "en") {
    return [
      {
        title: isHighRise ? "Check service-ledge access before installation day" : isShoplot ? "Plan power supply for shoplot units" : "Measure outdoor compressor placement early",
        body: isHighRise
          ? `Many ${name} buildings require management approval or a booked service-ledge slot. Confirm lift access and outdoor ledge timing when you book so our team arrives with the right harness and length of copper pipe.`
          : isShoplot
            ? `Shoplot units in ${name} often share power with ground-floor businesses. We recommend confirming a dedicated circuit or plug point before installation to avoid tripping during peak hours.`
            : `In ${name}'s ${housing}, the outdoor compressor is usually mounted on a wall bracket or concrete pad. We check the wall strength and available pipe route before drilling to keep the install neat and safe.`,
      },
      {
        title: isHighRise ? "Budget for longer pipe runs" : isShoplot ? "Allow for ceiling cassette drain pumps" : "Allow for upstairs-downstairs pipe runs",
        body: isHighRise
          ? `High-rise installations in ${name} can need more than the standard 7 ft of copper pipe and wiring. We quote extra footage before work begins so there are no surprises when routing from the indoor unit to the outdoor compressor.`
          : isShoplot
            ? `Ceiling cassette installs in ${name} shoplots usually need a drain pump because gravity drainage may not reach the nearest soil pipe. We include this in the quote when a cassette is chosen.`
            : `Double-storey and larger landed homes in ${name} often need extended copper runs from upstairs bedrooms to the ground-level compressor. We bring extra pipe and quote the additional length up front.`,
      },
      {
        title: "Book a morning slot for same-day completion",
        body: `Same-day installation in ${name} is easiest when the booking is confirmed before 11 AM. This gives our technicians time to load the right unit size, bracket type, and copper length for your specific home or shop.`,
      },
    ];
  }

  if (locale === "ms") {
    return [
      {
        title: isHighRise ? "Semak akses service ledge sebelum hari pemasangan" : isShoplot ? "Rancang bekalan kuasa untuk unit kedai" : "Ukur kedudukan kompressor luar lebih awal",
        body: isHighRise
          ? `Kebanyakan bangunan di ${name} memerlukan kelulusan pengurusan atau slot service ledge yang ditempah. Sahkan akses lif dan masa ledge luar apabila anda membuat tempahan supaya pasukan kami tiba dengan tali pinggang keselamatan dan panjang paip tembaga yang sesuai.`
          : isShoplot
            ? `Unit kedai di ${name} sering berkongg kuasa dengan perniagaan tingkat bawah. Kami mencadangkan mengesahkan litar atau plug point khas sebelum pemasangan untuk mengelakkan tripping semasa waktu puncak.`
            : `Dalam ${housing} di ${name}, kompressor luar biasanya dipasang pada braket dinding atau papak konkrit. Kami menyemak kekuatan dinding dan laluan paip yang ada sebelum mengecer.`,
      },
      {
        title: isHighRise ? "Bajet untuk laluan paip yang lebih panjang" : isShoplot ? "Sediakan pam saliran ceiling cassette" : "Sediakan laluan paip tingkat atas ke bawah",
        body: isHighRise
          ? `Pemasangan di bangunan tinggi di ${name} mungkin memerlukan lebih daripada 7 ft paip tembaga dan wayar standard. Kami menyebut harga tambahan sebelum kerja bermula.`
          : isShoplot
            ? `Pemasangan ceiling cassette di kedai ${name} biasanya memerlukan pam saliran kerana saliran graviti mungkin tidak sampai ke paip tanah terdekat. Kami termasuk ini dalam sebut harga apabila cassette dipilih.`
            : `Rumah landed dua tingkat dan lebih besar di ${name} sering memerlukan laluan tembaga tambahan dari bilik tidur tingkat atas ke kompressor di paras tanah. Kami membawa paip tambahan dan menyebut harga tambahan terlebih dahulu.`,
      },
      {
        title: "Tempah slot pagi untuk penyiapan hari sama",
        body: `Pemasangan hari sama di ${name} paling mudah apabila tempahan disahkan sebelum 11 pagi. Ini memberi masa kepada juruteknik kami untuk memuatkan saiz unit, jenis braket, dan panjang paip tembaga yang sesuai.`,
      },
    ];
  }

  return [
    {
      title: isHighRise ? "安装前一天确认服务阳台通道" : isShoplot ? "提前规划店屋电源" : "尽早测量室外机位置",
      body: isHighRise
        ? `${name}许多大厦需要管理处批准或预约服务阳台时段。请在预约时确认电梯通道和室外阳台时间，以便我们的团队携带合适的安全带和铜管长度上门。`
        : isShoplot
          ? `${name}店屋单位经常与底层商铺共用电源。我们建议安装前确认专用电路或插座，避免高峰时段跳闸。`
          : `在${name}的${housing}中，室外压缩机通常安装在墙壁支架或水泥底座上。我们会在钻孔前检查墙体强度和可用管线走向，确保安装整洁安全。`,
    },
    {
      title: isHighRise ? "为更长管线预留预算" : isShoplot ? "天花板卡式机需配排水泵" : "预留楼上到楼下的管线长度",
      body: isHighRise
        ? `${name}高层安装可能需要超出标准7尺的铜管和电线。我们会在施工前报价额外长度，避免管线铺设时出现意外费用。`
        : isShoplot
          ? `${name}店屋安装天花板卡式机通常需要排水泵，因为重力排水可能无法到达最近的排污管。选择卡式机时我们会将此费用纳入报价。`
          : `${name}双层及更大地块住宅通常需要从楼上卧室到地面压缩机的延长铜管。我们会携带额外铜管并预先报价。`,
    },
    {
      title: "预约上午时段更易当天完成",
      body: `${name}当天安装最容易在上午11点前确认预约。这给我们的技师足够时间准备适合您住宅或店铺的单位尺寸、支架类型和铜管长度。`,
    },
  ];
}

function getNearbyKampungs(
  kampung: (typeof siteConfig.kampungPages)[number],
  locale: KampungInstallationLocale,
): { name: string; slug: string; parentSlug: string }[] {
  const siblings = siteConfig.kampungPages.filter(
    (k) => k.parentSlug === kampung.parentSlug && k.slug !== kampung.slug,
  );
  // Deterministically pick up to 4 nearby siblings using the same hash function
  const count = Math.min(4, siblings.length);
  const start = kampungVariant(kampung.slug, siblings.length);
  const nearby: { name: string; slug: string; parentSlug: string }[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (start + i) % siblings.length;
    nearby.push({
      name: siblings[idx].name,
      slug: siblings[idx].slug,
      parentSlug: siblings[idx].parentSlug,
    });
  }
  return nearby;
}

const baseIncluded: Record<KampungInstallationLocale, string[]> = {
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

const baseExtras: Record<KampungInstallationLocale, string[]> = {
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

export function getKampungInstallationContent(
  parentSlug: string,
  kampungSlug: string,
  locale: KampungInstallationLocale,
): KampungInstallationContent {
  const kampung = siteConfig.kampungPages.find(
    (k) => k.parentSlug === parentSlug && k.slug === kampungSlug,
  );
  if (!kampung) {
    throw new Error(`Kampung not found for installation content: ${parentSlug}/${kampungSlug}`);
  }

  const parent = siteConfig.areaPages.find((a) => a.slug === parentSlug);
  if (!parent) {
    throw new Error(`Parent area not found for kampung installation content: ${parentSlug}`);
  }

  const name = kampung.name;
  const parentName = parent.name;
  const state = getLocaleState(kampung.state, locale);
  const phone = "+60182983573";

  const labels: Record<
    KampungInstallationLocale,
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
        ? `Aircond Installation ${name} (${parentName}) — From RM199 | KL Renovator`
        : locale === "ms"
          ? `Pemasangan Aircond ${name} (${parentName}) — Dari RM199 | KL Renovator`
          : `${name}冷气安装（${parentName}）— RM199起 | KL Renovator`,
    metaDescription:
      locale === "en"
        ? `Professional aircond installation in ${name}, ${parentName}, ${state} from RM199. Wall-mounted, ceiling cassette & window units. Same-day slots, vacuum pump, 1-month warranty. WhatsApp ${phone}.`
        : locale === "ms"
          ? `Pemasangan aircond profesional di ${name}, ${parentName}, ${state} dari RM199. Unit dinding, ceiling cassette & unit tingkap. Slot hari sama, pam vakum, waranti 1 bulan. WhatsApp ${phone}.`
          : `专业冷气安装服务覆盖${name}（${parentName}、${state}），RM199起。挂壁式、天花板卡式机、窗口式冷气均可安装，当天可约，含真空泵调试与1个月保修。WhatsApp ${phone}。`,
    ogTitle:
      locale === "en"
        ? `Aircond Installation ${name} (${parentName}) — From RM199 | KL Renovator`
        : locale === "ms"
          ? `Pemasangan Aircond ${name} (${parentName}) — Dari RM199 | KL Renovator`
          : `${name}冷气安装（${parentName}）— RM199起 | KL Renovator`,
    ogDescription:
      locale === "en"
        ? `Professional aircond installation in ${name}, ${parentName}, ${state} from RM199. Wall-mounted, ceiling cassette & window units. Same-day slots, vacuum pump, 1-month warranty.`
        : locale === "ms"
          ? `Pemasangan aircond profesional di ${name}, ${parentName}, ${state} dari RM199. Unit dinding, ceiling cassette & unit tingkap. Slot hari sama, pam vakum, waranti 1 bulan.`
          : `专业冷气安装服务覆盖${name}（${parentName}、${state}），RM199起。挂壁式、天花板卡式机、窗口式冷气均可安装，当天可约。`,
    ogImage: parent.heroImage || "/hero/aircond-installation-kuala-lumpur.webp",
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
    introBody: getIntroBody(kampung, parent, locale),
    localNoteTitle:
      locale === "en"
        ? `What to Know About Installing in ${name}`
        : locale === "ms"
          ? `Yang Perlu Diketahui Semasa Memasang di ${name}`
          : `在${name}安装冷气须知`,
    localNoteBody: getLocalNote(kampung, locale),
    whereTitle:
      locale === "en"
        ? `Where We Install in ${name}`
        : locale === "ms"
          ? `Kawasan Pemasangan di ${name}`
          : `${name}服务覆盖区域`,
    whereBody: getWhereBody(kampung, parent, locale),
    whereLandmarks: parent.landmarks.slice(0, 8),
    typesTitle:
      locale === "en"
        ? `Installation Types for ${name} Homes & Businesses`
        : locale === "ms"
          ? `Jenis Pemasangan untuk Rumah & Perniagaan ${name}`
          : `${name}住宅与商业安装类型`,
    types: getTypes(kampung, locale),
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
    whyItems: getWhyItems(kampung, parent, locale),
    tipsTitle:
      locale === "en"
        ? `Installation Tips for ${name}`
        : locale === "ms"
          ? `Tip Pemasangan untuk ${name}`
          : `${name}安装小贴士`,
    tips: getInstallationTips(kampung, locale),
    nearbyTitle:
      locale === "en"
        ? `Nearby Areas We Also Serve`
        : locale === "ms"
          ? `Kawasan Berhampiran yang Kami Layani Juga`
          : `我们也服务的邻近区域`,
    nearbyKampungs: getNearbyKampungs(kampung, locale),
    faqs: getFAQs(kampung, parent, locale),
    lat: kampung.lat,
    lng: kampung.lng,
    ctaTitle:
      locale === "en"
        ? `${l.bookInstallation} ${name} Today`
        : locale === "ms"
          ? `${l.bookInstallation} ${name} Hari Ini`
          : `立即预约${name}冷气安装`,
    ctaBody:
      locale === "en"
        ? `Same-day installation slots are available across ${name} and surrounding ${parentName}. Get a confirmed price before we drill.`
        : locale === "ms"
          ? `Slot pemasangan hari sama tersedia di ${name} dan ${parentName} sekitar. Dapatkan harga disahkan sebelum kami mula mengecer.`
          : `${name}及${parentName}周边地区当天安装名额有限。施工前先确认价格。`,
    whatsAppLabel: `${l.bookInstallation} ${name} via WhatsApp`,
    breadcrumbLabel:
      locale === "en"
        ? `Installation in ${name}`
        : locale === "ms"
          ? `Pemasangan di ${name}`
          : `${name}安装`,
  };
}

export function getAllKampungInstallationParams(): { slug: string; kampung: string }[] {
  return siteConfig.kampungPages.map((k) => ({
    slug: k.parentSlug,
    kampung: k.slug,
  }));
}
