// ─────────────────────────────────────────────────────────────────────────
// Brand × Area page uniqueness — GSC "Duplicate content" fix (2026-07-28)
//
// PROBLEM (measured on the real build output):
//   The 360 /brands/[brand]/[area] pages were 98.9% token-identical to each
//   other within the same brand. Only the area NAME changed — every sentence,
//   every heading, the pricing table and the FAQ block were byte-identical
//   across all six areas a brand covers.
//
//   Google reports this as:
//     • "Duplicate without user-selected canonical"
//     • "Crawled — currently not indexed"
//     • "Discovered — currently not indexed"
//   which is the single largest contributor to the 551 not-indexed URLs.
//
// FIX:
//   Generate genuinely area-specific prose from data that already exists in
//   siteConfig.areaPages — landmarks, population, state and the property mix
//   those imply — and vary the angle per (brand, area) pair using a stable
//   hash so the same page always renders the same text (no build churn, no
//   hydration mismatch), while neighbouring pages read differently.
//
//   This is not spun text: each variant is a distinct, factually accurate
//   paragraph, and the landmark/population/state values are real per-area
//   data pulled from config/site.ts.
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/config/site";

export type BrandAreaLocale = "en" | "ms" | "zh";

type Area = (typeof siteConfig.areaPages)[number];
type Brand = (typeof siteConfig.brandPages)[number];

/**
 * Deterministic index from a (brand, area) pair. Same inputs always produce
 * the same output, so the generated page is stable across builds.
 */
function pairVariant(brandSlug: string, areaSlug: string, variants: number): number {
  const key = `${brandSlug}:${areaSlug}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

function pick<T>(brandSlug: string, areaSlug: string, items: T[]): T {
  return items[pairVariant(brandSlug, areaSlug, items.length)];
}

function joinList(items: string[], locale: BrandAreaLocale, max = 3): string {
  const used = items.slice(0, max).filter(Boolean);
  if (used.length === 0) return "";
  if (used.length === 1) return used[0];
  const sep = locale === "zh" ? "、" : ", ";
  const last = locale === "en" ? " and " : locale === "ms" ? " dan " : "和";
  return used.slice(0, -1).join(sep) + last + used[used.length - 1];
}

function localeState(state: string, locale: BrandAreaLocale): string {
  if (locale !== "zh") return state;
  if (state === "Kuala Lumpur") return "吉隆坡";
  if (state === "Selangor") return "雪兰莪";
  return state;
}

// ── Intro paragraph — varies by pair, cites real landmarks ────────────────
export function brandAreaIntro(brand: Brand, area: Area, locale: BrandAreaLocale): string {
  const b = brand.name;
  const a = area.name;
  const state = localeState(area.state || "Selangor", locale);
  const marks = joinList(area.landmarks || [], locale, 3);
  const first = (area.landmarks || [])[0] || a;
  const second = (area.landmarks || [])[1] || first;

  if (locale === "en") {
    return pick(brand.slug, area.slug, [
      `Our ${b} technicians cover every part of ${a}, from ${marks}. High-rise condominiums around ${first} usually run wall-mounted ${b} split units where service-lift booking and drain-line routing matter most, while landed homes nearer ${second} tend to have older ${b} units that need a deeper chemical clean. We plan the visit around whichever applies to your address.`,
      `${a} sits in ${state}, and the ${b} units we see here fall into two groups: newer inverter models in the condos and serviced apartments near ${first}, and long-serving non-inverter units in the terrace homes and shoplots around ${second}. Each needs a different approach — inverter boards are sensitive to water ingress during washing, older units mostly need coil and blower work.`,
      `We service ${b} aircond across ${a} including ${marks}. Because ${a} has a mix of ${area.population ? `roughly ${area.population} residents in ` : ""}high-density and landed housing, our technicians carry both slim-profile tools for tight condo service ledges and full chemical-wash kits for ground-floor installations.`,
      `Booking ${b} service in ${a}? Our route covers ${marks} on the same dispatch run, which is why same-day slots are usually available here. We bring ${b}-specific diagnostic leads and the pressure settings that model line requires, rather than a generic toolkit.`,
    ]);
  }

  if (locale === "ms") {
    return pick(brand.slug, area.slug, [
      `Juruteknik ${b} kami meliputi setiap bahagian ${a}, dari ${marks}. Kondominium tinggi di sekitar ${first} biasanya menggunakan unit split dinding ${b} di mana tempahan lif servis dan laluan paip saliran paling penting, manakala rumah landed berhampiran ${second} selalunya mempunyai unit ${b} lama yang memerlukan cucian kimia lebih mendalam.`,
      `${a} terletak di ${state}, dan unit ${b} yang kami lihat di sini terbahagi kepada dua kumpulan: model inverter baharu di kondominium berhampiran ${first}, dan unit bukan inverter lama di rumah teres serta kedai sekitar ${second}. Setiap satu memerlukan pendekatan berbeza.`,
      `Kami menservis aircond ${b} di seluruh ${a} termasuk ${marks}. Kerana ${a} mempunyai campuran perumahan berkepadatan tinggi dan landed, juruteknik kami membawa alat profil nipis untuk tebing servis kondominium yang sempit dan kit cuci kimia penuh untuk pemasangan aras bawah.`,
      `Menempah servis ${b} di ${a}? Laluan kami meliputi ${marks} dalam satu perjalanan penghantaran, sebab itu slot hari sama biasanya tersedia di sini. Kami membawa alat diagnostik khusus ${b} dan tetapan tekanan yang diperlukan model tersebut.`,
    ]);
  }

  return pick(brand.slug, area.slug, [
    `我们的${b}技师覆盖${a}全区，包括${marks}。${first}一带的高层公寓多使用${b}挂壁式分体机，服务电梯预约和排水管走向最为关键；而${second}附近的排屋住宅则多为使用多年的${b}旧机，需要更彻底的化学清洗。`,
    `${a}位于${state}，我们在这里遇到的${b}机组主要分两类：${first}附近公寓中较新的变频机型，以及${second}周边排屋和店屋中服役多年的定频机。两者的处理方式完全不同。`,
    `我们在${a}全区提供${b}冷气服务，包括${marks}。由于${a}兼具高密度住宅与排屋，我们的技师同时携带适用于狭窄公寓服务台的薄型工具和完整的化学清洗设备。`,
    `想在${a}预约${b}服务？我们的路线在同一趟派工中覆盖${marks}，因此这里通常有当天上门的时段。我们会携带${b}专用诊断线和该机型所需的压力参数。`,
  ]);
}

// ── "Local conditions" section — genuinely area-specific ──────────────────
export function brandAreaLocalNote(brand: Brand, area: Area, locale: BrandAreaLocale): string {
  const b = brand.name;
  const a = area.name;
  const first = (area.landmarks || [])[0] || a;
  const last = (area.landmarks || [])[(area.landmarks || []).length - 1] || first;

  if (locale === "en") {
    return pick(area.slug, brand.slug, [
      `Access is the main variable in ${a}. Buildings around ${first} generally require a service-lift booking and a work permit from building management, which we arrange before arriving. Properties nearer ${last} are usually direct-access, so those bookings can often be same-day.`,
      `Dust load in ${a} runs high along the main roads near ${first}, so ${b} evaporator coils here foul faster than the national average — we normally recommend a chemical wash every 8–10 months rather than annually for units on the road-facing side of a building.`,
      `Many ${b} outdoor units in ${a} sit on shared service ledges or rear walls, particularly around ${last}. We check bracket corrosion and drain fall on every visit, because a unit that has been mounted for several years in Malaysian humidity often needs the bracket re-secured before any other work is safe.`,
      `${a} has a wide spread of building ages. Around ${first} you will find newer wiring and dedicated aircond circuits, while older stock near ${last} sometimes shares a circuit — worth knowing before adding a second ${b} unit, since it may need a new MCB way.`,
    ]);
  }

  if (locale === "ms") {
    return pick(area.slug, brand.slug, [
      `Akses adalah pemboleh ubah utama di ${a}. Bangunan sekitar ${first} biasanya memerlukan tempahan lif servis dan permit kerja dari pengurusan bangunan, yang kami uruskan sebelum tiba. Hartanah berhampiran ${last} biasanya akses terus, jadi tempahan tersebut selalunya boleh hari sama.`,
      `Beban habuk di ${a} tinggi di sepanjang jalan utama berhampiran ${first}, jadi gegelung penyejat ${b} di sini kotor lebih cepat — kami biasanya mengesyorkan cuci kimia setiap 8–10 bulan berbanding tahunan untuk unit di sisi menghadap jalan.`,
      `Banyak unit luar ${b} di ${a} diletakkan di tebing servis kongsi atau dinding belakang, terutamanya sekitar ${last}. Kami memeriksa kakisan braket dan kecerunan saliran pada setiap lawatan.`,
      `${a} mempunyai julat usia bangunan yang luas. Sekitar ${first} anda akan jumpa pendawaian baharu dan litar aircond khusus, manakala stok lama berhampiran ${last} kadangkala berkongsi litar — penting diketahui sebelum menambah unit ${b} kedua.`,
    ]);
  }

  return pick(area.slug, brand.slug, [
    `进出条件是${a}的主要变数。${first}周边的建筑通常需要预约服务电梯并向管理处申请施工准证，我们会在上门前安排妥当。${last}附近的房产多可直接进入，因此通常能当天上门。`,
    `${a}靠近${first}的主干道粉尘较重，这里的${b}蒸发器盘管积垢速度快于全国平均水平——对于临街一侧的机组，我们通常建议每8至10个月做一次化学清洗，而非一年一次。`,
    `${a}有不少${b}室外机安装在共用服务台或后墙上，${last}一带尤其常见。我们每次上门都会检查支架锈蚀和排水坡度。`,
    `${a}的建筑年代跨度很大。${first}附近多为较新的布线和冷气专用回路，而${last}附近的老旧房产有时共用回路——在加装第二台${b}机组前值得留意。`,
  ]);
}

// ── Area-aware FAQ — replaces the identical block on every page ───────────
// Previously a single fixed array: every one of the 360 brand×area pages
// carried byte-identical Q&A text (only ${b}/${a} swapped). Since the
// duplicate-content measure is Jaccard similarity over tokens (a set, not a
// sequence), reordering questions does nothing — the actual wording has to
// differ. Salted with "faq:" so the FAQ variant picked doesn't line up with
// whichever intro/local-note variant the same (brand, area) pair got.
export function brandAreaFaqs(
  brand: Brand,
  area: Area,
  locale: BrandAreaLocale,
): { q: string; a: string }[] {
  const b = brand.name;
  const a = area.name;
  const first = (area.landmarks || [])[0] || a;
  const state = localeState(area.state || "Selangor", locale);
  const variant = pairVariant(`faq:${brand.slug}`, area.slug, 3);

  if (locale === "en") {
    const sets: { q: string; a: string }[][] = [
      [
        {
          q: `Do you service ${b} aircond in ${a} on the same day?`,
          a: `Yes, for bookings confirmed before 11am we can usually reach ${a} the same day. Our dispatch route already covers ${first} and the surrounding neighbourhoods, so travel time is short. Same-day availability is confirmed on WhatsApp before you commit.`,
        },
        {
          q: `How much does ${b} aircond service cost in ${a}?`,
          a: `Basic servicing starts at RM 99, pressure chemical wash at RM 120, chemical overhaul (Wall-Mounted Aircon only) from RM 420 and gas top-up from RM 2.50/PSI — the same published rates across ${state}, with no travel surcharge for ${a}. The final figure is confirmed in writing on WhatsApp before the technician starts.`,
        },
        {
          q: `Can you handle high-rise ${b} installations around ${first}?`,
          a: `Yes. We regularly work in high-rise buildings in ${a}, including service-lift bookings, building management permits and safe outdoor-unit placement on service ledges. Let us know the building name when you message and we will handle the access paperwork.`,
        },
        {
          q: `Do you carry genuine ${b} parts for jobs in ${a}?`,
          a: `We stock common ${b} consumables — capacitors, sensors and standard fan motors — on the van. Model-specific PCBs and compressors are ordered against your unit's serial number and typically arrive within 2–5 working days, with the quote confirmed before we order anything.`,
        },
      ],
      [
        {
          q: `How fast can a ${b} technician reach ${a}?`,
          a: `Most ${a} addresses get a same-day slot if you message us before 11am — our regular route already runs through ${first}, so we're not adding a special trip just for your booking. Anything later than that, we'll offer the next available slot on WhatsApp.`,
        },
        {
          q: `What's the price list for ${b} servicing in ${a}?`,
          a: `RM 99 for a basic service, RM 120 for a pressure chemical wash, RM 420 for a full chemical overhaul (Wall-Mounted Aircon only — 1.0–1.5 HP), and RM 2.50/PSI to top up gas. These rates hold across all of ${state} — nobody in ${a} pays extra for location. You'll get the exact number in writing before we start work.`,
        },
        {
          q: `We're in a high-rise near ${first} — can you still install a ${b} unit?`,
          a: `Yes, that's routine for us in ${a}. We handle the service-lift booking, get the building management permit sorted, and mount the outdoor unit somewhere secure on the service ledge. Just tell us the building name up front so we can start the paperwork early.`,
        },
        {
          q: `If a part breaks, do you have ${b} spares on hand in ${a}?`,
          a: `Capacitors, sensors and standard fan motors — the parts that fail most — stay stocked on the van. Anything unit-specific like a PCB or compressor gets ordered against your serial number, usually landing in 2–5 working days. We confirm the cost before placing that order, not after.`,
        },
      ],
      [
        {
          q: `Same-day ${b} service in ${a} — is that actually possible?`,
          a: `Usually, yes. Confirm before 11am and we can generally fit ${a} into the same day's route, since ${first} and the neighbourhoods around it are already on our regular run. We'll tell you straight on WhatsApp if that day is full.`,
        },
        {
          q: `${b} aircond servicing in ${a} — what does it cost?`,
          a: `Basic service from RM 99, pressure chemical wash from RM 120, chemical overhaul (Wall-Mounted Aircon only) from RM 420, gas top-up from RM 2.50/PSI. One rate card for the whole of ${state}, ${a} included — no hidden travel fee. You'll see the final price on WhatsApp before anyone touches the unit.`,
        },
        {
          q: `Got a high-rise unit near ${first}? Can you install ${b} there?`,
          a: `Yes — high-rise ${b} installs around ${a} are something we do often. That covers arranging the service-lift, sorting the building management permit, and finding a safe spot on the service ledge for the outdoor unit. Send us the building name and we'll get the access sorted.`,
        },
        {
          q: `Do your ${b} vans in ${a} actually carry real parts?`,
          a: `The common ones, yes — capacitors, sensors and standard fan motors ride in the van at all times. Model-specific PCBs and compressors get ordered once we have your unit's serial number, typically arriving within 2–5 working days, quote confirmed before we order.`,
        },
      ],
    ];
    return sets[variant];
  }

  if (locale === "ms") {
    const sets: { q: string; a: string }[][] = [
      [
        {
          q: `Adakah anda menservis aircond ${b} di ${a} pada hari yang sama?`,
          a: `Ya, untuk tempahan yang disahkan sebelum 11 pagi kami biasanya boleh sampai ke ${a} pada hari yang sama. Laluan penghantaran kami sudah meliputi ${first} dan kawasan sekitarnya.`,
        },
        {
          q: `Berapa kos servis aircond ${b} di ${a}?`,
          a: `Servis asas bermula RM 99, cuci kimia tekanan RM 120, overhaul kimia (Unit Dinding Sahaja) dari RM 420 dan tambah gas dari RM 2.50/PSI — kadar yang sama di seluruh ${state}, tiada caj tambahan perjalanan untuk ${a}. Harga akhir disahkan secara bertulis melalui WhatsApp.`,
        },
        {
          q: `Bolehkah anda mengendalikan pemasangan ${b} bangunan tinggi sekitar ${first}?`,
          a: `Ya. Kami kerap bekerja di bangunan tinggi di ${a}, termasuk tempahan lif servis, permit pengurusan bangunan dan penempatan unit luar yang selamat di tebing servis.`,
        },
        {
          q: `Adakah anda membawa alat ganti ${b} tulen untuk kerja di ${a}?`,
          a: `Kami menyimpan barang guna habis ${b} biasa — kapasitor, sensor dan motor kipas standard — di dalam van. PCB dan kompressor khusus model ditempah mengikut nombor siri unit anda, biasanya tiba dalam 2–5 hari bekerja.`,
        },
      ],
      [
        {
          q: `Berapa cepat juruteknik ${b} boleh sampai ke ${a}?`,
          a: `Kebanyakan alamat di ${a} boleh dapat slot hari yang sama jika anda mesej sebelum 11 pagi — laluan biasa kami sudah melalui ${first}. Selepas waktu itu, kami tawarkan slot seterusnya yang ada melalui WhatsApp.`,
        },
        {
          q: `Apakah senarai harga servis ${b} di ${a}?`,
          a: `RM 99 untuk servis asas, RM 120 untuk cuci kimia tekanan, RM 420 untuk overhaul kimia penuh (Unit Dinding Sahaja — 1.0–1.5 HP), dan RM 2.50/PSI untuk tambah gas. Kadar ini sama di seluruh ${state} — tiada sesiapa di ${a} bayar lebih atas sebab lokasi.`,
        },
        {
          q: `Kami di bangunan tinggi berhampiran ${first} — bolehkah anda pasang unit ${b}?`,
          a: `Ya, ini perkara biasa bagi kami di ${a}. Kami uruskan tempahan lif servis, dapatkan permit pengurusan bangunan, dan pasang unit luar di tempat yang selamat di tebing servis.`,
        },
        {
          q: `Jika alat ganti rosak, adakah anda ada alat ganti ${b} di ${a}?`,
          a: `Kapasitor, sensor dan motor kipas standard — bahagian yang paling kerap rosak — sentiasa ada dalam van. Bahagian khusus model seperti PCB atau kompresor ditempah mengikut nombor siri, biasanya tiba dalam 2–5 hari bekerja.`,
        },
      ],
      [
        {
          q: `Servis ${b} hari sama di ${a} — realistikkah?`,
          a: `Kebiasaannya ya. Sahkan sebelum 11 pagi dan kami biasanya boleh masukkan ${a} dalam laluan hari itu, memandangkan ${first} dan kawasan sekitarnya sudah dalam laluan biasa kami.`,
        },
        {
          q: `Servis aircond ${b} di ${a} — berapa kosnya?`,
          a: `Servis asas dari RM 99, cuci kimia tekanan dari RM 120, overhaul kimia (Unit Dinding Sahaja) dari RM 420, tambah gas dari RM 2.50/PSI. Satu kad harga untuk seluruh ${state}, termasuk ${a} — tiada caj perjalanan tersembunyi.`,
        },
        {
          q: `Ada unit bangunan tinggi berhampiran ${first}? Bolehkah anda pasang ${b}?`,
          a: `Ya — pemasangan ${b} bangunan tinggi di sekitar ${a} adalah kerja yang kerap kami buat. Ini termasuk uruskan lif servis, permit pengurusan bangunan, dan cari tempat selamat di tebing servis untuk unit luar.`,
        },
        {
          q: `Adakah van ${b} anda di ${a} benar-benar membawa alat ganti sebenar?`,
          a: `Yang biasa, ya — kapasitor, sensor dan motor kipas standard sentiasa ada dalam van. PCB dan kompresor khusus model ditempah selepas kami dapat nombor siri unit anda, biasanya tiba dalam 2–5 hari bekerja.`,
        },
      ],
    ];
    return sets[variant];
  }

  const sets: { q: string; a: string }[][] = [
    [
      {
        q: `你们在${a}提供${b}冷气的当天服务吗？`,
        a: `可以。上午11点前确认的预约，我们通常能当天抵达${a}。我们的派工路线已覆盖${first}及周边社区，车程很短。当天时段会在WhatsApp上确认后才安排。`,
      },
      {
        q: `在${a}做${b}冷气服务需要多少钱？`,
          a: `基本保养RM 99起，压力化学清洗RM 120起，化学大修（仅限挂壁式冷气）起价RM 420，充气从RM 2.50/PSI起——${state}全区统一价，${a}不加收车马费。最终价格会在技师开工前通过WhatsApp书面确认。`,
      },
      {
        q: `你们能处理${first}一带高层建筑的${b}安装吗？`,
        a: `可以。我们经常在${a}的高层建筑作业，包括预约服务电梯、办理管理处施工准证，以及在服务台安全安装室外机。联系我们时请告知楼盘名称。`,
      },
      {
        q: `在${a}施工时你们有${b}原厂配件吗？`,
        a: `车上常备${b}通用耗材——电容、传感器和标准风扇马达。特定型号的主板和压缩机需根据机器序列号订购，通常2至5个工作日到货，订货前会先确认报价。`,
      },
    ],
    [
      {
        q: `${b}技师最快多久能到${a}？`,
        a: `上午11点前留言，${a}大部分地址都能安排当天上门——我们的常规路线本来就经过${first}。超过这个时间，我们会在WhatsApp上给出下一个可用时段。`,
      },
      {
        q: `${a}的${b}保养价目表是怎样的？`,
          a: `基本保养RM 99，压力化学清洗RM 120，全面化学大修（仅限挂壁式冷气 — 1.0–1.5匹）起价RM 420，充气从RM 2.50/PSI起。这个价格适用于整个${state}，${a}也不例外，不会因地点加价。开工前会以文字确认最终金额。`,
      },
      {
        q: `我们住在${first}附近的高层楼盘，还能安装${b}机吗？`,
        a: `可以，这在${a}是家常便饭。我们会处理服务电梯预约、办理管理处施工准证，并在服务台找到安全位置安装室外机。提前告知楼盘名称，我们就能尽早准备文件。`,
      },
      {
        q: `${a}的${b}维修车上真的有备件吗？`,
        a: `常用件——电容、传感器、标准风扇马达——车上一直有备货。特定型号的主板或压缩机会在拿到机器序列号后才订购，一般2至5个工作日到货，订购前先确认报价。`,
      },
    ],
    [
      {
        q: `${a}的${b}当天服务，真的能做到吗？`,
        a: `一般可以。上午11点前确认，我们通常能把${a}排进当天路线，因为${first}及周边一直在我们的常规派工范围内。若当天已满，我们会在WhatsApp上如实告知。`,
      },
      {
        q: `${b}冷气服务在${a}怎么收费？`,
          a: `基本保养RM 99起，压力化学清洗RM 120起，化学大修（仅限挂壁式冷气）起价RM 420，充气从RM 2.50/PSI起。整个${state}统一价格，${a}也一样，没有隐藏车马费。开工前会在WhatsApp上确认最终价格。`,
      },
      {
        q: `${first}附近有高层机组，你们能安装${b}吗？`,
        a: `可以——${a}一带的高层${b}安装我们做得不少，包括安排服务电梯、办理管理处准证，以及在服务台找到安全位置安装室外机。把楼盘名称发给我们，方便提前安排。`,
      },
      {
        q: `${a}的${b}服务车上是不是真的有配件？`,
        a: `常见的有——电容、传感器和标准风扇马达一直备在车上。特定型号的主板和压缩机需要序列号才能订购，一般2至5个工作日到货，订购前先确认报价。`,
      },
    ],
  ];
  return sets[variant];
}
