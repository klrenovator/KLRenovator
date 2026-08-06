// Area-specific installation landing page content for INS-10 (Round 71).
// Every page is generated from real area data in config/site.ts so that
// content remains unique, accurate and natural across all 60 top-level areas.

import { siteConfig } from "@/config/site";
import { buildInstallationMetaTitle } from "@/lib/seo-title-optimizer";
import { buildInstallationMetaDesc } from "@/lib/seo-description-optimizer";

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
  localContextTitle: string;
  localContextParagraphs: string[];
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
      `Need a new aircond installed in ${name}? KL Renovator dispatches trained HVAC technicians throughout ${state}, including ${landmarks}. Every installation includes 7 ft copper pipe, insulation, electrical wire and drain pipe, a standard outdoor bracket, vacuum pump evacuation, and a 1-month workmanship warranty card.`,
    ];
    return pick(area.slug, templates);
  }

  if (locale === "ms") {
    const templates = [
      `KL Renovator memasang aircond di seluruh ${name} dan kawasan ${state} yang lebih luas. Dari ${landmarks}, juruteknik kami memasang unit dinding di kondominium dan pangsapuri, sistem ceiling cassette di kedai dan pejabat, serta unit tingkap di flat lama — semuanya dengan pentauliahan pam vakum, pendawaian elektrik khas, dan waranti kerja 1 bulan.`,
      `Sama ada anda berpindah ke rumah baharu berhampiran ${firstLandmark}, menaik taraf unit bukan inverter lama di ${secondLandmark}, atau memasang ruang komersial di ${name}, KL Renovator mengendalikan pemasangan aircond penuh dari tinjauan hingga ujian akhir. Kami menservis semua 20 jenama utama di ${state}.`,
      `Kediaman dan perniagaan di ${name} menggunakan pelbagai jenis aircond — kondominium tinggi berhampiran ${firstLandmark}, teres landed di sekitar ${secondLandmark}, dan kedai di sepanjang lorong komersial yang sibuk. Pasukan pemasangan KL Renovator bekerja di semuanya, menentukan saiz HP yang betul, memasang paip tembaga, dan menauliahkan setiap unit dengan betul.`,
      `Perlukan aircond baharu dipasang di ${name}? KL Renovator menghantar juruteknik HVAC berlatih di seluruh ${state}, termasuk ${landmarks}. Setiap pemasangan termasuk 7 ft paip tembaga, wayar, paip saliran luar standard, pengosongan pam vakum, dan kad waranti kerja 1 bulan.`,
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
  const state = getLocaleState(area.state, locale);
  const firstLandmark = area.landmarks[0] || name;
  const population = area.population || name;
  const populationClause = area.population ? ` (${area.population})` : "";

  if (locale === "en") {
    // Four distinct card sets, selected deterministically per area. Previously
    // every area returned the identical four cards with only the name swapped,
    // which left these 40 pages 93.4% token-identical — reported by Google as
    // "Duplicate without user-selected canonical" / "Crawled - not indexed".
    return pick(area.slug, [
      [
        { title: `Local ${name} Technicians`, body: `Our team knows ${name} building types, JMB procedures, and access constraints, so installations are scheduled efficiently.` },
        { title: "Right HP, Every Time", body: `We measure your room size, ceiling height, and sun exposure before recommending 1HP, 1.5HP, or 2HP for ${name}'s climate.` },
        { title: "Vacuum Pump Standard", body: `Every installation in ${name} includes proper evacuation to protect your compressor and keep manufacturer warranty valid.` },
        { title: "Price Confirmed First", body: `Copper pipe, wirings, and extras are quoted before drilling begins — no surprise bills in ${name}.` },
      ],
      [
        { title: `${firstLandmark} Access Handled`, body: `High-rise work near ${firstLandmark} needs a service-lift slot and a management permit. We arrange both before the van leaves, so the crew is not turned away at the guardhouse.` },
        { title: "-Purged Brazing", body: `We purge with while brazing every joint. It costs us more time but stops internal oxide scale forming in the copper — the slow killer of compressors in ${name}'s humidity.` },
        { title: "Drain Fall Verified", body: `A drain line laid flat will back up within months. We check the gradient with a level on every ${name} job and water-test before handover.` },
        { title: "Written Warranty Card", body: `You get a physical 1-month workmanship warranty card on completion, not a verbal promise — valid across ${state}.` },
      ],
      [
        { title: "Load Calculated, Not Guessed", body: `Room area, glazing, orientation and occupancy all feed the sizing. Getting this wrong in ${name} means either a compressor that never rests or a room that is cold and clammy.` },
        { title: `Electrical Check First`, body: `Before quoting we look at your DB box. Older ${name} properties often lack a spare MCB way, and a 2.0 HP unit needs its own circuit — better to know before installation day.` },
        { title: "Clean Site Guarantee", body: `Drilling makes dust. We sheet the area, vacuum on completion, and take the packaging away with us — your ${name} home is left as we found it.` },
        { title: "All 20 Brands Fitted", body: `Daikin, Panasonic, Mitsubishi, Acson, York and 15 more. We carry the torque specs and commissioning procedure for each rather than fitting them all the same way.` },
      ],
      [
        { title: `Serving ${population}`, body: `${name} is a substantial catchment${populationClause}, so we run a standing route here. That is why same-day slots are usually available rather than a three-day wait.` },
        { title: "Copper Grade Matched to HP", body: `Type L copper for 1.0–2.5 HP, Type M above that where wall thickness allows. Thin-wall pipe fails under R32 pressures — we do not use it.` },
        { title: "Outdoor Unit Sited Properly", body: `30 cm clearance, shaded where possible, away from bedroom windows — yours and your neighbour's. Placement is agreed with you before anything is mounted in ${name}.` },
        { title: "One Team, Start to Finish", body: `The technician who surveys your ${name} property is the one who installs it. Nothing gets lost in a handover between crews.` },
      ],
    ]);
  }

  if (locale === "ms") {
    return pick(area.slug, [
      [
        { title: `Juruteknik ${name} Tempatan`, body: `Pasukan kami mengenali jenis bangunan, prosedur JMB, dan kekangan akses di ${name}, jadi pemasangan dijadualkan dengan cekap.` },
        { title: "HP Yang Tepat, Setiap Masa", body: `Kami mengukur saiz bilik, ketinggian siling, dan pendedahan matahari sebelum mencadangkan 1HP, 1.5HP, atau 2HP untuk iklim ${name}.` },
        { title: "Standard Pam Vakum", body: `Setiap pemasangan di ${name} termasuk pengosongan yang betul untuk melindungi pemampat anda dan mengekalkan waranti pengeluar.` },
        { title: "Harga Disahkan Dahulu", body: `Paip tembaga, wayar, dan tambahan disebut sebelum kerja bermula — tiada bil mengejut di ${name}.` },
      ],
      [
        { title: `Akses ${firstLandmark} Diuruskan`, body: `Kerja bangunan tinggi berhampiran ${firstLandmark} memerlukan slot lif servis dan permit pengurusan. Kami uruskan kedua-duanya sebelum juruteknik bertolak.` },
        { title: "Brazing Dibersih ", body: `Kami membersihkan dengan semasa brazing setiap sambungan. Ia mengambil masa lebih tetapi menghalang kerak oksida dalam paip tembaga — punca utama kerosakan pemampat dalam kelembapan ${name}.` },
        { title: "Kecerunan Saliran Disahkan", body: `Paip saliran yang rata akan tersumbat dalam beberapa bulan. Kami memeriksa kecerunan dengan alat aras pada setiap kerja di ${name} dan menguji dengan air sebelum serahan.` },
        { title: "Kad Waranti Bertulis", body: `Anda menerima kad waranti kerja 1 bulan secara fizikal apabila siap, bukan janji lisan — sah di seluruh ${state}.` },
      ],
      [
        { title: "Beban Dikira, Bukan Diteka", body: `Luas bilik, kaca tingkap, orientasi dan bilangan penghuni semuanya dikira. Salah kira di ${name} bermakna pemampat tidak berhenti atau bilik sejuk tetapi lembap.` },
        { title: "Semakan Elektrik Dahulu", body: `Sebelum memberi sebut harga kami periksa kotak DB anda. Hartanah lama di ${name} selalunya tiada slot MCB ganti, dan unit 2.0 HP perlukan litar sendiri.` },
        { title: "Jaminan Tapak Bersih", body: `Menggerudi menghasilkan habuk. Kami tutup kawasan, vakum selepas siap, dan bawa balik bungkusan — rumah ${name} anda ditinggalkan seperti asal.` },
        { title: "Semua 20 Jenama Dipasang", body: `Daikin, Panasonic, Mitsubishi, Acson, York dan 15 lagi. Kami membawa spesifikasi tork dan prosedur pentauliahan untuk setiap satu.` },
      ],
      [
        { title: `Berkhidmat untuk ${population}`, body: `${name} adalah kawasan tadahan yang besar${populationClause}, jadi kami menjalankan laluan tetap di sini. Sebab itu slot hari sama biasanya tersedia.` },
        { title: "Gred Tembaga Ikut HP", body: `Tembaga Type L untuk 1.0–2.5 HP, Type M ke atas di mana ketebalan dinding membenarkan. Paip dinding nipis gagal di bawah tekanan R32 — kami tidak menggunakannya.` },
        { title: "Unit Luar Ditempatkan Betul", body: `Jarak 30 cm, teduh jika boleh, jauh dari tingkap bilik tidur — anda dan jiran. Penempatan dipersetujui dengan anda sebelum sebarang pemasangan di ${name}.` },
        { title: "Satu Pasukan, Mula Hingga Akhir", body: `Juruteknik yang meninjau hartanah ${name} anda adalah yang memasangnya. Tiada maklumat hilang antara pasukan.` },
      ],
    ]);
  }

  return pick(area.slug, [
    [
      { title: `${name}本地技师`, body: `我们的团队熟悉${name}的建筑类型、管理处（JMB）流程和进出限制，因此安装安排高效顺畅。` },
      { title: "每次匹配正确马力", body: `我们会先测量房间大小、天花板高度和日照情况，再针对${name}的气候推荐1匹、1.5匹或2匹机型。` },
      { title: "真空泵标准作业", body: `${name}的每次安装都包含规范抽真空，保护压缩机并维持制造商保修有效。` },
      { title: "先确认价格", body: `铜管、电线、支架和额外费用均在钻孔施工前报价——在${name}绝无意外账单。` },
    ],
    [
      { title: `${firstLandmark}进出全代办`, body: `${firstLandmark}附近的高层作业需要服务电梯时段和管理处准证。我们在出车前就办妥两者，避免技师被拦在门岗。` },
      { title: "氮气保护焊接", body: `我们在焊接每个接口时通入氮气。这会多花时间，但能防止铜管内壁生成氧化皮——那正是${name}潮湿气候下压缩机的慢性杀手。` },
      { title: "排水坡度实测", body: `排水管铺平几个月内必定返水。我们在${name}的每单作业都用水平仪检查坡度，并在交付前做注水测试。` },
      { title: "纸质保修卡", body: `完工时您会拿到实体的1个月工艺保修卡，而非口头承诺——${state}全区有效。` },
    ],
    [
      { title: "负荷计算而非估算", body: `房间面积、玻璃窗、朝向和常住人数都会纳入计算。在${name}算错的后果是压缩机不停机，或者房间冷但发闷。` },
      { title: "先查电路", body: `报价前我们会检查您的配电箱。${name}的老旧房产常常没有备用MCB空位，而2.0匹机组需要独立回路。` },
      { title: "工地清洁保证", body: `钻孔必然产生粉尘。我们会铺设防尘布、完工吸尘并带走全部包装——您在${name}的家会保持原样。` },
      { title: "20个品牌全能装", body: `Daikin、Panasonic、Mitsubishi、Acson、York等共20个品牌。我们掌握每个品牌的扭矩参数和调试流程，而非一套装法通用。` },
    ],
    [
      { title: `服务${population}`, body: `${name}是相当大的服务片区${populationClause}，我们在此有固定路线。这就是为什么这里通常能当天上门，而不必等三天。` },
      { title: "铜管等级匹配马力", body: `1.0至2.5匹使用L型铜管，更高马力在壁厚允许时使用M型。薄壁管在R32压力下会失效——我们不使用。` },
      { title: "室外机规范定位", body: `四周留30厘米间距、尽量遮阳、远离卧室窗户——您和邻居的都算。安装前会先与您确认${name}的机位。` },
      { title: "一个团队负责到底", body: `勘察您${name}房产的技师就是负责安装的人，不会在班组交接中遗漏信息。` },
    ],
  ]);
}

// ── Geo position phrase derived from lat/lng, used to add unique tokens and
//    genuine local context per area. Returns the phrase already localized.
function getPosition(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): string {
  const lat = typeof area.lat === "number" ? area.lat : 3.14;
  const lng = typeof area.lng === "number" ? area.lng : 101.69;
  const ns = lat >= 3.2 ? "north" : lat <= 3.0 ? "south" : "central";
  const ew = lng >= 101.7 ? "east" : "east";
  const combo = `${ns}-${ew}`;
  const stateIsKL = (area.state || "").toLowerCase().includes("kuala lumpur");
  const region = stateIsKL ? "Kuala Lumpur" : "Selangor";
  const map: Record<string, { en: string; ms: string; zh: string }> = {
    "north-east": { en: `northeastern ${region}`, ms: `timur laut ${region}`, zh: `${region}东北部` },
    "south-east": { en: `southeastern ${region}`, ms: `tenggara ${region}`, zh: `${region}东南部` },
    "central-east": { en: `central ${region}`, ms: `tengah ${region}`, zh: `${region}中部` },
    "north-west": { en: `northern ${region}`, ms: `utara ${region}`, zh: `${region}北部` },
    "south-west": { en: `southern ${region}`, ms: `selatan ${region}`, zh: `${region}南部` },
    "central-west": { en: `central ${region}`, ms: `tengah ${region}`, zh: `${region}中部` },
  };
  const key = combo.includes("north") ? (lng >= 101.7 ? "north-east" : "north-west")
    : combo.includes("south") ? (lng >= 101.7 ? "south-east" : "south-west")
    : (lng >= 101.7 ? "central-east" : "central-west");
  return map[key][locale];
}

// ── Substantial, installation-specific, genuinely-unique-per-area context.
// Each area has a different landmark set + population + geo position, so even
// areas sharing a variant produce very different token sets. Three variant
// sets rotate deterministically to break the templated-family similarity that
// left these 40 pages ~81% identical (Google "Duplicate without canonical").
function getLocalContext(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): string[] {
  const name = area.name;
  const state = getLocaleState(area.state, locale);
  const position = getPosition(area, locale);
  const landmarks = Array.isArray(area.landmarks) ? area.landmarks.filter(Boolean) : [];
  const population = area.population || name;
  const L = (n: number) => landmarks[n] || landmarks[landmarks.length - 1] || name;
  const joined = joinLandmarks(landmarks, locale, 6);

  if (locale === "en") {
    const variants: string[][] = [
      [
        `${name} sits in ${position}, ${state}, home to roughly ${population} residents and landmarks like ${joined}. That density and mix of building types shapes how aircond installation works here — a wall-mounted split in a ${L(0)} condo follows a very different process from a ceiling cassette in a ${L(1)} shoplot or a window unit in an older flat near ${L(2)}.`,
        `Before any drilling, our ${name} installation crew checks the three things that go wrong most often here: whether your distribution board has a spare way for a dedicated circuit, the exact copper-pipe run between the indoor and outdoor positions, and — for high-rise work — the building management's lift and service-ledge rules. Getting these right on the first visit is why installations across ${name} and ${position} rarely need a callback.`,
      ],
      [
        `Installing an aircond in ${name} means planning around how the area is actually built. Around ${L(0)} and ${L(1)} the housing leans toward landed terraces and semi-D homes; elsewhere — ${L(2)}, ${L(3)} and ${L(4)} — high-rise condos and serviced apartments dominate. Each calls for a different HP sizing setup and drainage plan, which is why we survey before we quote on every ${name} job.`,
        `${name} (${population}, ${state}) is on our standing installation route, so confirmed jobs usually get a same-day or next-day slot rather than a week-long wait. We bring Type L copper for 1.0–2.5 HP units, vacuum pumps for proper commissioning, and the torque specs for all 20 brands — so whether your unit is a Daikin, Panasonic, Mitsubishi or something else, it is fitted to manufacturer standard the first time.`,
      ],
      [
        `From ${L(0)} to ${L(1)}, ${name} spans a range of properties — and the aircond installation detail that matters in one barely applies in another. A landed terrace near ${L(2)} needs wall penetration and bracket alignment; a unit going into a ${L(3)} high-rise needs loading-bay timing and management sign-off. Our ${name} team plans for both before the van leaves, ${position}.`,
        `We keep ${name} installation simple and transparent: the RM 199 wall-mounted price includes the first 7 ft of copper pipe, insulation, electrical wire and drain pipe, with anything beyond that quoted and approved on site. After commissioning we run a 15-minute cooling test and hand over a 1-month workmanship warranty card — valid whether you are in central ${name} or the ${position} fringe.`,
      ],
    ];
    return pick(area.slug, variants);
  }

  if (locale === "ms") {
    const variants: string[][] = [
      [
        `${name} terletak di ${position}, ${state}, rumah kepada kira-kira ${population} penduduk dan mercu tanda seperti ${joined}. Kepadatan dan campuran jenis bangunan ini menentukan cara pemasangan aircond dilakukan di sini — unit split dinding di kondominium ${L(0)} mengikut proses sangat berbeza daripada ceiling cassette di kedai ${L(1)} atau unit tingkap di flat lama berhampiran ${L(2)}.`,
        `Sebelum sebarang penggerudian, pasukan pemasangan ${name} kami menyemak tiga perkara yang paling kerap bermasalah di sini: sama ada kotak agihan anda ada ruang MCB ganti untuk litar khas, jarak paip tembaga antara kedudukan dalaman dan luar, dan — untuk kerja bangunan tinggi — peraturan lif dan service ledge pengurusan bangunan. Menyelesaikan ini pada lawatan pertama sebabkan pemasangan di ${name} dan ${position} jarang perlukan panggilan semula.`,
      ],
      [
        `Memasang aircond di ${name} bermakna merancang mengikut pembinaan sebenar kawasan ini. Sekitar ${L(0)} dan ${L(1)} perumahan condong kepada rumah teres dan semi-D landed; di tempat lain — ${L(2)}, ${L(3)} dan ${L(4)} — kondominium tinggi dan apartmen servis mendominasi. Setiap satu memerlukan saiz HP, susunan braket dan pelan saliran berbeza, sebab itulah kami tinjau sebelum sebut harga untuk setiap kerja di ${name}.`,
        `${name} (${population}, ${state}) berada dalam laluan pemasangan tetap kami, jadi kerja yang disahkan biasanya mendapat slot hari sama atau hari berikutnya bukannya menunggu seminggu. Kami membawa tembaga Type L untuk unit 1.0–2.5 HP, pam vakum untuk pentauliahan betul, dan spesifikasi tork untuk semua 20 jenama — jadi sama ada unit anda Daikin, Panasonic, Mitsubishi atau lain, ia dipasang mengikut standard pengeluar pada percubaan pertama.`,
      ],
      [
        `Dari ${L(0)} ke ${L(1)}, ${name} merangkumi pelbagai jenis hartanah — dan butiran pemasangan aircond yang penting di satu tempat hampir tidak relevan di tempat lain. Rumah teres berhampiran ${L(2)} perlukan tembusan dinding dan penjajaran braket; unit untuk bangunan tinggi ${L(3)} perlukan masa loading bay dan kelulusan pengurusan. Pasukan ${name} kami merancang kedua-duanya sebelum juruteknik bertolak, ${position}.`,
        `Kami kekalkan pemasangan di ${name} mudah dan telus: harga RM 199 untuk dinding termasuk 7 ft paip tembaga, wayar, paip saliran dan braket standard, dengan apa-apa selepas itu disebut dan diluluskan di tapak. Selepas pentauliahan kami jalankan ujian penyejukan 15 minit dan serahkan kad waranti kerja 1 bulan — sah sama ada anda di tengah ${name} atau pinggir ${position}.`,
      ],
    ];
    return pick(area.slug, variants);
  }

  const variants: string[][] = [
    [
      `${name}位于${state}${position}，约有${population}居民，地标包括${joined}。这样的人口密度与建筑类型组合决定了冷气安装方式——${L(0)}公寓的挂壁分体机、${L(1)}店屋的天花板卡式机、以及${L(2)}附近老旧组屋的窗式机，安装流程截然不同。`,
      `在钻孔之前，我们的${name}安装团队会先检查本地最容易出问题的三点：配电箱是否有备用MCB空位以接独立回路、室内外机之间的铜管实际走管长度，以及高层施工所需的物业电梯与服务阳台规定。首次上门就把这些处理好，正是${name}及${position}地区安装极少需要返工的原因。`,
    ],
    [
      `在${name}安装冷气意味着要按本区的实际建筑布局来规划。${L(0)}与${L(1)}周边以排屋和半独立式住宅为主；而在${L(2)}、${L(3)}、${L(4)}等地则以高层公寓和服务式住宅为主。两者所需的匹数匹配、支架方案与排水规划各不相同，因此我们在每单${name}工程中都会先勘察再报价。`,
      `${name}（${population}，${state}）位于我们的固定安装路线，确认的预约通常能当天或次日上门，无需苦等一周。我们为1.0–2.5匹机组配备Type L铜管、用于规范调试的真空泵，以及全部20个品牌的扭矩参数——无论您的机型是Daikin、Panasonic、Mitsubishi还是其他，都能一次到位按厂商标准安装。`,
    ],
    [
      `从${L(0)}到${L(1)}，${name}覆盖多种物业类型——而某处至关重要的安装细节在另一处几乎不适用。${L(2)}附近的排屋需要墙体开孔与支架对位；${L(3)}高层公寓的机组则需协调装卸时段与物业审批。我们的${name}团队在出车前就把这两种情况都规划好，位于${position}。`,
      `我们把${name}的安装做得简单透明：RM199挂壁价含7尺铜管、电线、排水管与标准支架，超出部分在现场报价并经您确认。调试后我们会运行15分钟制冷测试，并交付1个月工艺保修卡——无论您身处${name}中心还是${position}边缘均同样有效。`,
    ],
  ];
  return pick(area.slug, variants);
}

// Variant-rotated third paragraph — each angle uses distinct vocabulary so
// pages spread across different word sets (lowers family token overlap).
function getLocalContextExtra(
  area: (typeof siteConfig.areaPages)[number],
  locale: AreaInstallationLocale,
): string[] {
  const name = area.name;
  const position = getPosition(area, locale);
  const landmarks = (area.landmarks || []).filter(Boolean);
  const L = (n: number) => landmarks[(n + 1) % Math.max(landmarks.length, 1)] || landmarks[0] || name;

  if (locale === "en") {
    return [
      pick(area.slug, [
        `High-rise work is a big part of installing in ${name}: tower blocks around ${L(0)} and ${L(2)} usually need a booked service lift, a JMB or management permit, and a fixed window for the outdoor unit on a shared ledge. We arrange all of that before the crew sets off, so the day is not wasted at the guardhouse — a detail that matters most in dense ${position} developments.`,
        `Sizing the unit correctly is where most ${name} installs go right or wrong. Bedroom orientation, glass area, ceiling height and how many hours a day the room is occupied all feed the decision between 1.0, 1.5 and 2.0 HP. An over-sized inverter short-cycles and feels clammy; an under-sized one runs flat-out and wears early — which is why we calculate, never guess, on every ${name} job.`,
        `Drainage is the silent failure in humid ${name} homes. A drain line without enough fall backs up within months and stains the wall near ${L(1)}. We lay every condensate line to a measured gradient, water-test it before handover, and insulate the copper to stop the dripping that plagues badly-fitted units across ${position}.`,
      ]),
    ];
  }
  if (locale === "ms") {
    return [
      pick(area.slug, [
        `Kerja bangunan tinggi merupakan sebahagian besar pemasangan di ${name}: menara sekitar ${L(0)} dan ${L(2)} selalunya memerlukan lif servis ditempah, permit JMB atau pengurusan, dan waktu tetap untuk unit luar di ledge berkongsi. Kami uruskan semuanya sebelum pasukan bertolak, supaya hari tidak terbuang di pondok pengawal — butiran yang paling penting di pembangunan padat ${position}.`,
        `Saiz unit yang betul menentukan kejayaan pemasangan di ${name}. Orientasi bilik, kawasan kaca, ketinggian siling dan berapa jam bilik diduduki semuanya menentukan pilihan antara 1.0, 1.5 dan 2.0 HP. Inverter terlalu besar akan kitaran pendek dan terasa lembap; terlalu kecil berlarisan penuh dan cepat rosak — sebab itulah kami mengira, bukan meneka, pada setiap kerja di ${name}.`,
        `Saliran ialah kegagalan senyap di rumah ${name} yang lembap. Paip saliran tanpa kecerunan cukup akan tersumbat dalam beberapa bulan dan mengotorkan dinding berhampiran ${L(1)}. Kami memasang setiap paip kondensat pada kecerunan terukur, menguji dengan air sebelum serahan, dan memenebat tembaga untuk elak titisan yang menimpa unit terpasang buruk di ${position}.`,
      ]),
    ];
  }
  return [
    pick(area.slug, [
      `高层作业是${name}安装的重要部分：${L(0)}与${L(2)}周边的塔楼通常需要预约服务电梯、JMB或物业准证，并在共用阳台固定时段安装室外机。我们在出车前就把这些全部办好，避免当天在门岗浪费时间——这在${position}密集楼盘中尤为关键。`,
      `机型匹数的正确选择决定了${name}安装的成败。卧室朝向、玻璃面积、层高及房间每日使用时长都会影响1.0、1.5与2.0匹的取舍。过大的变频机会频繁短循环且感觉闷湿；过小则满负荷运转、过早磨损——因此我们在每单${name}工程中都计算而非估算。`,
      `排水是${name}潮湿住宅中的隐形杀手。坡度不足的排水管数月内就会堵塞，并在${L(1)}附近墙面留下水渍。我们按实测坡度铺设每条冷凝水管，交付前做注水测试，并为铜管保温，杜绝${position}地区安装不良机组常见的滴水问题。`,
    ]),
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
        a: `Wall-mounted installation in ${name} starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP, and RM 279–RM 329 for larger units. Ceiling cassette starts from RM 290, and window units from RM 180. Every quote includes the first 7 ft of copper pipe, insulation, electrical wire and drain pipe. If an outdoor bracket is required, it is quoted separately as a paid special charge before work begins.`,
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
        a: `Pemasangan dinding di ${name} bermula RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP, dan RM 279–RM 329 untuk unit lebih besar. Ceiling cassette bermula RM 290, dan unit tingkap dari RM 199. Setiap sebut harga termasuk 7 ft paip tembaga, wayar, paip saliran standard.`,
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
    "Outdoor bracket (paid special charge if required)",
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
    "Copper pipe beyond 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)",
      "Drain pipe beyond 7 ft: RM 5/ft",
    "Wire beyond 7 ft: RM 9/ft",
    "Small PVC casing (electrical wire): RM 6/ft; large PVC casing (copper pipe + wire + insulation): RM 12/ft",
    "Standard compressor / outdoor bracket: RM 45",
    "Heavy-duty compressor / outdoor bracket: RM 70",
    "New electrical plug point: RM 100",
    "Wall hacking / concealment: RM 6/ft",
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
    "Pecah dinding / penyembunyian: RM 6/ft",
    "Tinggi / akses sukar: RM 50–150",
  ],
  zh: [
    "超出7尺铜管：RM 17/尺 (1.0–1.5 匹), RM 23/尺 (2.0–2.5 匹), RM 27/尺 (3.0–3.5 匹)",
    "超出7尺排水管：RM 5/尺",
    "超出7尺电线：RM 9/尺 (1.0–1.5 匹), RM 13/尺 (2.0–2.5 匹), RM 17/尺 (3.0–4.0 匹)",
    "小型PVC线槽（电线）：RM 6/尺；大型PVC线槽（铜管+电线+保温层）：RM 12/尺",
    "标准室外压缩机/支架：RM 45",
    "重型室外压缩机/支架：RM 70",
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
  const metaTitle = buildInstallationMetaTitle(name, locale, { type: "area" });
  const metaDescription = buildInstallationMetaDesc(name, locale, {
    type: "area",
    landmarks: area.landmarks ? Array.from(area.landmarks) : [],
  });

  return {
    metaTitle,
    metaDescription,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
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
    localContextTitle:
      locale === "en"
        ? `Installing Airconds Across ${name}: Local Know-How`
        : locale === "ms"
          ? `Memasang Aircond di Seluruh ${name}: kepakaran tempatan`
          : `在${name}全区安装冷气：本地经验`,
    localContextParagraphs: [...getLocalContext(area, locale), ...getLocalContextExtra(area, locale)],
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
