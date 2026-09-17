// ─────────────────────────────────────────────────────────────────────────
// Kampung INSTALLATION page depth — targeted uniqueness upgrade (Phase 2)
//
// CONTEXT:
//   The site GSC audit flags /areas/[slug]/[kampung]/installation EN pages
//   as averaging ~82% shared template text. Issue #71 already deepened the
//   kampung DETAIL pages; this module applies the same treatment to the
//   INSTALLATION landings, but only for kampungs in the major Klang Valley
//   service corridors (the "targeted upgrades" scope approved by the owner).
//   Long-tail kampung installation pages are intentionally left unchanged.
//
// APPROACH (mirrors config/kampung-depth.ts):
//   Two extra paragraphs appended to localContextParagraphs, composed ONLY
//   from data that already exists per kampung —
//     · housing profile detected by config/kampung-uniqueness-matrix.ts
//     · kampung.housingNote
//     · parent-area landmarks (real, already published)
//   plus officially published service facts (RM 199 wall-mounted scope,
//   vacuum commissioning, 1-month workmanship warranty).
//
//   No new local facts are manufactured. Wording is selected by a
//   deterministic per-slug hash so neighbouring pages read differently on
//   every rebuild. EN / MS / ZH copy is authored separately.
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/config/site";
import { detectKampungProfile, type KampungProfileKey } from "@/config/kampung-uniqueness-matrix";

export type KampungInstallationDepthLocale = "en" | "ms" | "zh";

// Major population corridors that justify the deeper installation copy.
const PRIORITY_PARENT_SLUGS: ReadonlySet<string> = new Set([
  "cheras",
  "kepong",
  "subang-jaya",
  "klang",
  "damansara",
  "ampang",
  "sentul",
  "puchong",
  "kajang",
  "petaling-jaya",
  "bangsar",
  "sri-petaling",
]);

type DepthKampung = {
  slug: string;
  parentSlug: string;
  name: string;
  housingNote?: string;
};

type DepthParent = {
  name: string;
  landmarks?: readonly string[];
};

// Deterministic per-slug hash (same convention as kampungVariant()).
function depthVariant(slug: string, variants: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

// ── Profile-driven paragraph, EN ──────────────────────────────────────────
const PROFILE_PARAGRAPHS_EN: Record<KampungProfileKey, string[]> = {
  highRise: [
    "Most addresses here are condos or serviced apartments, so an aircond installation in {name} is planned around the building, not just the wall: service-ledge access, management lift booking and condensate routing to the nearest floor trap are confirmed with you before the van arrives. Quoted price, then drilled — never the other way round.",
    "High-rise installs in {name} live or die on access details. Our crew books the service lift window with your JMB, lays floor protection in the lobby route, and pressure-tests the drain line before handover — the three steps that separate a clean installation from a ceiling stain two weeks later.",
  ],
  shopOffice: [
    "With the shop-lot and small-office rows around {landmark}, installations here are usually fitted outside business hours or early morning so your shutters are never down during trading. The same RM 199 wall-mounted scope applies — 7 ft copper, wiring, drain pipe, vacuum commissioning and a 1-month workmanship warranty.",
    "Commercial-flavoured installs in {name} — shop lots, clinics, small offices near {landmark} — get a cooling-load sanity check before we quote, because an undersized unit in a heat-soaked shopfront is the most common complaint we get called back to fix. Right size, right breaker, right first time.",
  ],
  landed: [
    "Landed homes around {landmark} usually make installation straightforward — outdoor unit on the side passage or back wall, short copper run within the free 7 ft, and a clean gravity drain. What we still check: spare MCB way in the DB board and wall thickness at the penetration point, the two things older {name} houses most often get wrong.",
    "For terrace and semi-D houses in {name}, the pipe run is rarely the problem — the electrical side is. We carry spare MCBs and wire for the older boards common in this part of {parent}, so a same-visit fix is normal rather than a second appointment.",
  ],
  kampung: [
    "Older kampung-style and village housing around {landmark} often means longer pipe runs, exposed routing and sometimes a roof-mounted condenser. We quote the extra copper per foot before drilling (RM 17–27/ft by HP size), so the final bill is agreed, not discovered.",
    "Installations in the quieter pockets of {name} frequently need creative routing — high walls, zinc roofs, detached kitchens. Our crew surveys the run first, confirms the bracket and drain plan with you, and only then starts drilling. That survey-first habit is why installs here hold up through monsoon season.",
  ],
  hillside: [
    "Sloped and hillside plots around {landmark} change the installation maths: condenser placement for airflow and service access, longer drain runs against gravity, and occasional pump-assisted condensate removal. We plan all three on the survey visit so the quote you approve is the bill you pay.",
    "Hillside homes in {name} get their condensate and condenser placement engineered, not improvised. Gravity drains need consistent fall across the run, and retaining-wall mounts need the right anchors — details our crew confirms before installation day.",
  ],
  industrial: [
    "For workshop and light-industrial units around {landmark}, installations are sized for heat-soaked interiors and long operating hours — correct HP, dedicated circuit, and a condenser position with real airflow rather than a convenient corner. Same transparent RM 199 starting scope for standard wall-mounted units.",
    "Industrial-adjacent installs in {name} deal with dust and long run-hours, so we specify accessible filter access and serviceable condenser clearance up front. A unit you can actually maintain is a unit that lasts its full 10–15 year design life.",
  ],
  mixed: [
    "{name} mixes housing styles, so two installations on the same street can need completely different plans — one a clean 7-ft landed run, the next a high-rise ledge job with management booking. The site survey settles it: we confirm run length, access and electricals, then quote before any drilling.",
    "Because {name} has no single dominant housing type, we never quote blind from a photo alone. A quick site check around {landmark} tells us the pipe run, DB board condition and outdoor-unit position — and your price is confirmed before work starts, exactly as published.",
  ],
};

// ── Shared process-honesty paragraph, EN ──────────────────────────────────
const PROCESS_PARAGRAPHS_EN = [
  "Every {name} installation includes the steps cheaper quotes skip: two-stage vacuum pump down to 500 microns, torque-checked flares, a 15-minute cooling test and a written 1-month workmanship warranty card. If your address is near {landmark}, mention it when you WhatsApp — it helps us assign the crew that already works your street.",
  "Booking from the {landmark} side of {name}? Send the unit type and HP size on WhatsApp and you will get a confirmed price against the published rate card before anyone travels — RM 199 wall-mounted 1.0–1.5 HP including materials, vacuum commissioning and the 1-month workmanship warranty.",
];

// ── MS ────────────────────────────────────────────────────────────────────
const PROFILE_PARAGRAPHS_MS: Record<KampungProfileKey, string[]> = {
  highRise: [
    "Kebanyakan alamat di sini ialah kondominium atau pangsapuri servis, jadi pemasangan aircond di {name} dirancang mengikut bangunan, bukan sekadar dinding: akses service ledge, tempahan lif pengurusan dan laluan paip condensate ke floor trap terdekat dipastikan dengan anda sebelum van bergerak. Harga disahkan dahulu, kemudian ditebuk — bukan sebaliknya.",
    "Pemasangan high-rise di {name} menang atau kalah pada butiran akses. Pasukan kami menempah slot lif servis dengan JMB anda, melapik laluan lobbi dengan perlindungan lantai, dan menguji tekanan paip saliran sebelum serahan — tiga langkah yang membezakan pemasangan bersih dengan kesan lembap pada siling dua minggu kemudian.",
  ],
  shopOffice: [
    "Dengan barisan kedai dan pejabat kecil sekitar {landmark}, pemasangan di sini biasanya dibuat di luar waktu perniagaan atau awal pagi supaya kedai anda tidak tutup semasa waktu urus niaga. Skop RM 199 untuk unit dinding tetap sama — 7 kaki tembaga, pendawaian, paip saliran, pentauliahan vakum dan waranti kerja 1 bulan.",
    "Pemasangan bernilai komersial di {name} — kedai, klinik, pejabat kecil berdekatan {landmark} — melalui semakan beban penyejukan sebelum sebut harga, kerana unit terlalu kecil untuk kedai yang panas terik ialah aduan paling kerap kami terima. Saiz betul, pemutus betul, kali pertama betul.",
  ],
  landed: [
    "Rumah teres di sekitar {landmark} biasanya memudahkan pemasangan — unit luar di laluan sisi atau dinding belakang, laluan tembaga pendek dalam lingkungan 7 kaki percuma, dan saliran graviti bersih. Yang tetap kami semak: slot MCB kosong dalam papan DB dan ketebalan dinding di titik penembusan, dua perkara yang paling kerap terlepas pandang di rumah-rumah lama {name}.",
    "Untuk rumah teres dan semi-D di {name}, laluan paip jarang menjadi masalah — bahagian elektrik yang selalunya bermasalah. Kami bawa MCB dan wayar ganti untuk papan lama yang biasa di bahagian {parent} ini, jadi penyelesaian lawatan sama adalah perkara biasa.",
  ],
  kampung: [
    "Rumah gaya kampung yang lebih tua di sekitar {landmark} selalunya memerlukan laluan paip lebih panjang, penghalaman terbuka, dan kadangkala kondenser atas bumbung. Kami sebut harga tembaga tambahan setiap kaki sebelum menebuk (RM 17–27/kaki ikut saiz HP), jadi bil akhir bersetuju, bukan ditemui.",
    "Pemasangan di kawasan senyap {name} kerap memerlukan laluan kreatif — dinding tinggi, bumbung zink, dapur berasingan. Pasukan kami meninjau laluan dahulu, mengesahkan rancangan braket dan saliran dengan anda, barulah menebuk. Tabiat tinjau-dahulu inilah sebab pemasangan di sini tahan musim tengkujuh.",
  ],
  hillside: [
    "Plot berbukit di sekitar {landmark} mengubah kiraan pemasangan: kedudukan kondenser untuk aliran udara dan akses servis, laluan saliran lebih panjang melawan graviti, dan kadangkala pam bagi paip condensate. Ketiga-tiganya dirancang pada lawatan tinjau supaya sebut harga yang anda lulusi ialah bil yang anda bayar.",
    "Rumah lereng bukit di {name} mendapat kedudukan kondenser dan saliran condensate yang direka, bukan diagak-agak. Saliran graviti perlukan kecuraman konsisten sepanjang laluan, dan pelekat dinding penahan perlukan angkur yang betul — butiran yang pasukan kami sahkan sebelum hari pemasangan.",
  ],
  industrial: [
    "Untuk bengkel dan unit industri ringan di sekitar {landmark}, pemasangan disaiz untuk ruangan panas dan waktu operasi panjang — HP yang betul, litar berdedikasi, dan kedudukan kondenser dengan aliran udara sebenar, bukan sekadar sudut yang senang. Skop permulaan RM 199 yang sama telusnya untuk unit dinding piawai.",
    "Pemasangan berhampiran kawasan industri di {name} berdepan habuk dan waktu jangka panjang, jadi kami menetapkan akses penapis yang mudah dan jarak servis kondenser dari awal. Unit yang boleh diservis dengan mudah ialah unit yang bertahan sehingga 10–15 tahun jangka hayat reka bentuknya.",
  ],
  mixed: [
    "{name} mencampurkan pelbagai gaya rumah, jadi dua pemasangan di jalan yang sama boleh perlukan rancangan berbeza — satu laluan landed 7 kaki yang mudah, satu lagi kerja ledge high-rise dengan tempahan pengurusan. Tinjauan tapak yang menentukan: kami sahkan panjang laluan, akses dan elektrik, barulah sebut harga sebelum sebarang penebukan.",
    "Kerana {name} tiada satu jenis perumahan dominan, kami tidak sebut harga buta daripada foto sahaja. Semakan tapak ringkas berdekatan {landmark} memberitahu kami laluan paip, keadaan papan DB dan kedudukan unit luar — dan harga anda disahkan sebelum kerja bermula, tepat seperti kadar diterbitkan.",
  ],
};

const PROCESS_PARAGRAPHS_MS = [
  "Setiap pemasangan di {name} menyertakan langkah yang dilangkau sebut harga murah: pam vakum dua peringkat sehingga 500 mikron, flare dicerakinkan dengan tork betul, ujian penyejukan 15 minit dan kad waranti kerja 1 bulan bertulis. Jika alamat anda berdekatan {landmark}, sebutkan semasa WhatsApp — ia membantu kami tugaskan pasukan yang sudah biasa dengan jalan anda.",
  "Menempah dari bahagian {landmark} di {name}? Hantar jenis unit dan saiz HP melalui WhatsApp dan anda akan dapat harga disahkan berdasarkan kad kadar diterbitkan sebelum sesiapa bergerak — RM 199 unit dinding 1.0–1.5 HP termasuk bahan, pentauliahan vakum dan waranti kerja 1 bulan.",
];

// ── ZH ────────────────────────────────────────────────────────────────────
const PROFILE_PARAGRAPHS_ZH: Record<KampungProfileKey, string[]> = {
  highRise: [
    "这里大多是公寓或服务式住宅，因此在{name}安装冷气要围绕建筑本身规划：确认服务平台（service ledge）进出、向管理处预约升降机、冷凝水排至最近的地台排水口——这些都在开工前与您确认。先报价、后钻孔，绝不相反。",
    "{name}的高层安装成败取决于进出细节。我们的团队会替您向JMB预约服务升降机时段，在大堂路线铺设地面保护，并在交机前对排水管做压力测试——正是这三步，把干净完工与两周后天花板渗水区分开来。",
  ],
  shopOffice: [
    "由于{landmark}一带是店屋和小办公室排屋，这里的安装通常安排在非营业时间或清晨进行，营业时间绝不停业施工。挂壁式同样按RM 199标准范围——7尺铜管、电线、排水管、抽真空调试，附1个月工艺保修。",
    "{name}的商业类安装——店屋、诊所、{landmark}附近的小办公室——报价前都会先做制冷负荷复核，因为临街暴晒的店面装小机器是我们最常被召回处理的问题。合适的匹数、合适的断路器，一次装对。",
  ],
  landed: [
    "{landmark}一带的排屋通常让安装变得简单：外机装在侧巷或后墙，铜管在免费7尺以内，重力排水顺畅。我们仍会检查两件事：配电箱是否有多余MCB槽位、穿墙点的墙体厚度——这恰是{name}老房子最容易出问题的地方。",
    "对{name}的排屋和半独立房屋来说，铜管走向很少是难题，电气部分才是。我们会为这一带{parent}常见的旧配电箱携带备用MCB和电线，多数情况当天一次搞定，无需二次上门。",
  ],
  kampung: [
    "{landmark}附近较旧的甘榜式房屋常常需要更长的铜管、外露走管，有时还要把外机装上屋顶。我们会先按每尺报价加长铜管（按匹数RM 17–27/尺），最终账单是事先谈定的，不是事后才发现的。",
    "{name}安静路段的安装经常需要灵活走管——高墙、锌屋顶、独立厨房。我们的团队会先勘察走向，与您确认支架和排水方案后再开工。正是这种先勘察的习惯，让这里的安装经得起雨季考验。",
  ],
  hillside: [
    "{landmark}附近的斜坡地形会改变安装算法：外机位置要兼顾气流和日后检修，排水要长距离逆重力走管，有时需要泵辅助排水。三件事都在勘察当天规划好，因此您批准的报价就是最终账单。",
    "{name}的坡地住宅，冷凝水走向和外机位置是设计出来的，不是临场凑合的。重力排水全程需要稳定坡度，挡土墙安装则需要正确的锚固——这些细节我们在安装日前就会确认。",
  ],
  industrial: [
    "对于{landmark}附近的作坊和轻工业单位，安装按高热负荷和长时间运转来选型——正确的匹数、专用回路，以及外机位置要有真实气流而不是图方便的角落。标准挂壁式同样从RM 199起，价格透明。",
    "{name}近工业区的安装要应对粉尘和长时间运行，所以我们会提前规划易取的滤网检修位和外机散热间距。一台便于保养的机器，才能撑满10–15年的设计寿命。",
  ],
  mixed: [
    "{name}住宅类型混杂，同一条街上的两个安装可能需要完全不同的方案——一个是干净的7尺排屋走管，另一个是需要管理处预约的高层平台作业。一切由现场勘察决定：确认管长、进出条件和电气状况，然后才报价、才钻孔。",
    "因为{name}没有单一的房屋类型，我们从不仅凭照片盲报。在{landmark}附近快速看一眼现场，就能确定铜管走向、配电箱状况和外机位置——价格在开工前确认，与公布的价目一致。",
  ],
};

const PROCESS_PARAGRAPHS_ZH = [
  "{name}的每一次安装都包含低价报价常省略的步骤：两级真空泵抽至500 microns、扭矩校验的扩口、15分钟制冷测试，以及书面的1个月工艺保修卡。如果您的地址在{landmark}附近，WhatsApp时请提一句——方便我们派出已经熟悉您那条街的团队。",
  "从{name}靠{landmark}一侧预约？在WhatsApp上告知机型和匹数，出发前您就会收到按公布价目确认的报价——挂壁式1.0–1.5匹RM 199，含材料、抽真空调试和1个月工艺保修。",
];

function fill(
  template: string,
  vars: { name: string; parent: string; landmark: string },
): string {
  return template
    .replaceAll("{name}", vars.name)
    .replaceAll("{parent}", vars.parent)
    .replaceAll("{landmark}", vars.landmark);
}

/**
 * Extra depth paragraphs for kampung installation pages in priority parent
 * areas. Returns [] for every other kampung — long-tail pages unchanged.
 */
export function buildKampungInstallationDepth(
  kampung: DepthKampung,
  parent: DepthParent,
  locale: KampungInstallationDepthLocale,
): string[] {
  if (!PRIORITY_PARENT_SLUGS.has(kampung.parentSlug)) return [];

  const profile = detectKampungProfile({
    slug: kampung.slug,
    parentSlug: kampung.parentSlug,
    name: kampung.name,
    state: "",
    housingNote: kampung.housingNote,
  });

  const landmarks = (parent.landmarks || []).filter(Boolean);
  const offset = landmarks.length ? depthVariant(kampung.slug, landmarks.length) : 0;
  const landmark = landmarks.length ? landmarks[offset % landmarks.length] : parent.name;

  const profileSet =
    locale === "en"
      ? PROFILE_PARAGRAPHS_EN
      : locale === "ms"
        ? PROFILE_PARAGRAPHS_MS
        : PROFILE_PARAGRAPHS_ZH;
  const processSet =
    locale === "en"
      ? PROCESS_PARAGRAPHS_EN
      : locale === "ms"
        ? PROCESS_PARAGRAPHS_MS
        : PROCESS_PARAGRAPHS_ZH;

  const vars = { name: kampung.name, parent: parent.name, landmark };
  const profileParagraph = profileSet[profile][depthVariant(`${kampung.slug}:p`, profileSet[profile].length)];
  const processParagraph = processSet[depthVariant(`${kampung.slug}:q`, processSet.length)];

  return [fill(profileParagraph, vars), fill(processParagraph, vars)];
}

// Re-export for the sitemap/audit tooling if ever needed.
export const KAMPUNG_INSTALLATION_DEPTH_PRIORITY_AREAS = PRIORITY_PARENT_SLUGS;

// Keep the type import referenced for consumers using siteConfig shapes.
export type { KampungProfileKey };
void siteConfig;
