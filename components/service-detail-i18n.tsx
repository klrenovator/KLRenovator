import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { serviceI18n } from "@/config/services-i18n";
import { allPosts } from "@/config/blog-posts";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { title, subtitle, eyebrow } from "@/components/primitives";
import { SERVICE_PROBLEM_MAP, SERVICE_BLOG_MAP_V2 } from "@/config/topical-authority-map";

type Lang = "ms" | "zh";

type ServiceFaq = { q: string; a: string };

const SUPPLEMENTAL_SERVICE_FAQS_I18N: Record<string, { ms: ServiceFaq[]; zh: ServiceFaq[] }> = {
  "chemical-wash": {
    ms: [
      { q: "Adakah cuci kimia cukup jika aircond bocor air?", a: "Selalunya ya, jika puncanya paip saliran tersumbat, coil kotor atau lendir dalam tray. Jika bocor berulang, chemical overhaul mungkin lebih sesuai." },
      { q: "Boleh duduk di rumah semasa cuci kimia?", a: "Boleh. Juruteknik menggunakan kanvas pelindung dan menguji saliran sebelum pulang. Jauhkan kanak-kanak daripada kawasan kerja semasa cucian." },
    ],
    zh: [
      { q: "如果冷气漏水，化学清洗够吗？", a: "通常可以，如果原因是排水管堵塞、盘管脏或水盘有黏液。如果漏水反复出现，可能需要化学大清洗。" },
      { q: "化学清洗时我可以留在家吗？", a: "可以。技术员会使用保护帆布，并在离开前测试排水。清洗期间请让儿童远离施工区域。" },
    ],
  },
  "chemical-overhaul": {
    ms: [
      { q: "Bila perlu pilih chemical overhaul berbanding cuci kimia?", a: "Pilih chemical overhaul jika angin sangat lemah, bocor berulang, coil berais, bau kuat cepat kembali atau unit sudah lama tidak dibuka cuci." },
      { q: "Adakah unit dalam akan dibuka dari dinding?", a: "Untuk chemical overhaul yang betul, unit dinding biasanya dibuka supaya bahagian tersembunyi boleh dicuci dengan lebih menyeluruh." },
    ],
    zh: [
      { q: "什么时候应选择化学大清洗而不是普通化学清洗？", a: "如果风量很弱、漏水反复、盘管结冰、异味很快回来，或多年没有深洗，就更适合化学大清洗。" },
      { q: "室内机会从墙上拆下来吗？", a: "正确的壁挂式化学大清洗通常会拆下室内机，以便更彻底清洗隐藏部位。" },
    ],
  },
  "gas-topup": {
    ms: [
      { q: "Gas rendah semestinya perlu tambah gas?", a: "Gas rendah biasanya menandakan kemungkinan bocor. KL Renovator memeriksa tekanan dan menasihatkan sama ada leak check atau repair diperlukan." },
      { q: "Boleh kenal pasti unit saya guna R32, R410A atau R22?", a: "Boleh. WhatsApp gambar label unit luar atau juruteknik akan semak di lokasi sebelum tambah gas." },
    ],
    zh: [
      { q: "Gas低就一定要加Gas吗？", a: "Gas低通常代表可能有泄漏。KL Renovator 会检查压力，并建议是否需要查漏或维修，避免重复加Gas浪费钱。" },
      { q: "可以确认我的冷气用R32、R410A还是R22吗？", a: "可以。您可WhatsApp室外机标签照片，或由技术员现场确认后再加Gas。" },
    ],
  },
  "repair": {
    ms: [
      { q: "Jika aircond trip DB, patut matikan dulu?", a: "Ya. Hentikan penggunaan sehingga diperiksa kerana trip berulang boleh berpunca daripada short elektrik, kapasitor, kompressor atau air terkena komponen elektrik." },
      { q: "Adakah harga parts disahkan sebelum tukar?", a: "Ya. Juruteknik diagnosis dahulu dan sahkan kos sebelum menukar kapasitor, motor, PCB, sensor atau wiring." },
    ],
    zh: [
      { q: "冷气导致跳电时应先关掉吗？", a: "是。请停止使用直到检查，因为反复跳电可能是短路、电容、压缩机或水接触电气部件造成。" },
      { q: "更换零件前会先报价吗？", a: "会。技术员先诊断，再确认电容、马达、PCB、传感器或电线维修费用。" },
    ],
  },
  "installation": {
    ms: [
      { q: "Adakah pemasangan RM199 sesuai untuk semua rumah?", a: "RM199 meliputi pemasangan standard unit dinding 1.0–1.5HP dengan sehingga 7ft paip kuprum, wiring dan paip saliran. Bahan tambahan disebut harga dahulu." },
      { q: "Adakah sistem divakum semasa pemasangan?", a: "Ya. Vakum yang betul membuang udara dan lembapan daripada paip sebelum gas dilepaskan untuk melindungi kompressor." },
    ],
    zh: [
      { q: "RM199安装适合所有房子吗？", a: "RM199适用于标准1.0–1.5HP壁挂式安装，包含最多7ft铜管、电线和排水管。额外材料会先报价。" },
      { q: "安装时会抽真空吗？", a: "会。正确抽真空可在释放冷媒前去除管内空气和水分，保护压缩机。" },
    ],
  },
  "basic-servicing": {
    ms: [
      { q: "Berapa kerap perlu servis aircond di Malaysia?", a: "Bilik tidur dan pejabat yang digunakan setiap hari disyorkan servis setiap 3–4 bulan. Bilik jarang guna biasanya boleh setiap 6 bulan." },
      { q: "Bila servis asas tidak mencukupi?", a: "Jika ada bocor air, bau kuat, angin lemah atau kotoran dalaman tebal, cuci kimia atau chemical overhaul mungkin lebih sesuai." },
    ],
    zh: [
      { q: "马来西亚冷气多久保养一次？", a: "每天使用的卧室和办公室建议每3–4个月保养一次。少用的房间通常可每6个月一次。" },
      { q: "什么时候基本保养不够？", a: "如果有漏水、异味、风弱或内部污垢严重，化学清洗或化学大清洗会更适合。" },
    ],
  },
  "ceiling-cassette": {
    ms: [
      { q: "Adakah ceiling cassette perlu servis berbeza daripada unit dinding?", a: "Ya. Ceiling cassette mempunyai panel, drain tray dan akses siling yang lebih besar, jadi perlu juruteknik yang biasa dengan unit komersial/pejabat." },
      { q: "Boleh servis ceiling cassette pejabat selepas waktu kerja?", a: "Bergantung jadual juruteknik, tetapi KL Renovator boleh menyelaras slot yang sesuai untuk mengurangkan gangguan operasi." },
    ],
    zh: [
      { q: "天花卡式机和壁挂式保养不同吗？", a: "不同。天花卡式机有更大的面板、水盘和天花检修空间，需要熟悉办公室/商业机型的技术员。" },
      { q: "办公室天花卡式机可以下班后保养吗？", a: "视技术员时间而定，KL Renovator 可协调合适时段，尽量减少营业影响。" },
    ],
  },
  "dismantling-relocation": {
    ms: [
      { q: "Boleh guna semula aircond selepas dibuka?", a: "Boleh jika keadaan unit, kesesuaian paip dan aksesori masih baik. Juruteknik akan nasihat sama ada guna semula atau material baru lebih selamat." },
      { q: "Adakah gas dipulihkan sebelum unit dibuka?", a: "Jika sesuai, juruteknik ikut proses pump-down/recovery yang selamat sebelum unit diputuskan." },
    ],
    zh: [
      { q: "拆下来的冷气可以再用吗？", a: "可以，只要机器、铜管规格和配件状态适合。技术员会建议继续使用或更换材料哪一种更安全。" },
      { q: "拆机前会回收Gas吗？", a: "如条件适合，技术员会按安全pump-down/recovery流程再断开机器。" },
    ],
  },
  "emergency": {
    ms: [
      { q: "Apa dikira kecemasan aircond?", a: "Air bocor dekat elektrik, DB trip, bau hangit, unit langsung tidak hidup, kompressor tidak berjalan atau masalah cooling kritikal di premis komersial perlu diperiksa cepat." },
      { q: "Boleh buat servis kecemasan hari sama?", a: "Slot kecemasan hari sama biasanya tersedia bergantung laluan, masa dan parts. WhatsApp lokasi dan simptom untuk triage pantas." },
    ],
    zh: [
      { q: "什么情况算冷气紧急维修？", a: "漏水靠近电源、跳电、烧焦味、完全故障、压缩机不运作或商业场所制冷失效，都应尽快检查。" },
      { q: "紧急维修可以当天处理吗？", a: "通常可安排当天紧急时段，视路线、时间和零件而定。请WhatsApp位置和症状以便快速判断。" },
    ],
  },
};

const GLOBAL_SERVICE_FAQS_I18N: Record<Lang, ServiceFaq[]> = {
  ms: [
    { q: "Adakah harga disahkan sebelum kerja bermula?", a: "Ya. KL Renovator mengesahkan skop servis, harga permulaan dan sebarang kos bahan atau repair tambahan sebelum kerja bermula." },
    { q: "Adakah terdapat waranti kerja?", a: "Ya. Kerja yang layak dilindungi waranti kerja 1 bulan. Terma waranti diterangkan dengan jelas sebelum serahan kerja." },
    { q: "Ada diskaun untuk banyak unit?", a: "Ya. Tempahan banyak unit yang layak boleh menerima 5% untuk 2–3 unit, 10% untuk 4–8 unit dan 15% untuk 8+ unit, disahkan sebelum tempahan." },
  ],
  zh: [
    { q: "施工前会确认价格吗？", a: "会。KL Renovator 会在开工前确认服务范围、起步价，以及任何额外材料或维修费用。" },
    { q: "是否有工艺保修？", a: "有。符合条件的施工享有1个月工艺保修，保修条款会在交付前清楚说明。" },
    { q: "多台冷气有折扣吗？", a: "有。符合条件的多台预约可享2–3台5%、4–8台10%、8台以上15%折扣，预约前确认。" },
  ],
};

function mergeFaqs(...groups: ServiceFaq[][]): ServiceFaq[] {
  const seen = new Set<string>();
  return groups.flat().filter((faq) => {
    const key = faq.q.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function ServiceDetailI18n({
  lang,
  slug,
}: {
  lang: Lang;
  slug: string;
}) {
  const data = servicesData[slug];
  const i18 = serviceI18n[slug];
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!data || !i18) notFound();

  const langPrefix = lang === "ms" ? "/ms" : "/zh";
  const iconName = service?.icon ?? "sparkles";

  // ── Chrome label maps (page language is always first in the eyebrow) ──
  const LABELS: Record<string, { en: string; ms: string; zh: string }> = {
    overview: { en: "Overview", ms: "Gambaran Keseluruhan", zh: "概述" },
    whatsIncluded: { en: "What's included", ms: "Apa yang disertakan", zh: "包含内容" },
    pricing: { en: "Pricing", ms: "Harga", zh: "收费" },
    process: { en: "Process", ms: "Proses", zh: "流程" },
    faq: { en: "FAQ", ms: "Soalan Lazim", zh: "常见问答" },
    alsoConsider: { en: "Also Consider", ms: "Pertimbangkan Juga", zh: "也考虑" },
    problemsFixed: { en: "Common Problems This Service Fixes", ms: "Masalah Biasa yang Diselesaikan Perkhidmatan Ini", zh: "此服务解决的常见问题" },
    expertGuides: { en: "Expert Guides", ms: "Panduan Pakar", zh: "专家指南" },
    bookIt: { en: "Book it", ms: "Tempah", zh: "预约" },
    otherServices: { en: "Other Services", ms: "Perkhidmatan Lain", zh: "其他服务" },
    whyChoose: { en: "Why KL Renovator", ms: "Mengapa KL Renovator", zh: "为什么选择KL Renovator" },
    relatedServices: { en: "Related Services You May Need", ms: "Perkhidmatan Berkaitan yang Mungkin Anda Perlukan", zh: "您可能需要的其他服务" },
    problemsFixes: { en: "Problems This Service Fixes", ms: "Masalah yang Diselesaikan Perkhidmatan Ini", zh: "此服务解决的问题" },
    whyChooseSub: { en: "Why Customers Choose Us Over Others", ms: "Mengapa Pelanggan Memilih Kami Berbanding Yang Lain", zh: "为什么客户选择我们而非他人" },
    relatedGuides: { en: "Related Aircond Guides & Articles", ms: "Panduan & Artikel Aircond Berkaitan", zh: "相关冷气指南与文章" },
    needTodaySub: {
      en: "Same-day slots available Mon–Sun across all KL & Selangor. WhatsApp for fastest dispatch.",
      ms: "Slot hari sama tersedia Isnin–Ahad di seluruh KL & Selangor. WhatsApp untuk penghantaran terpantas.",
      zh: "周一至周日，吉隆坡及雪兰莪全区均可安排当天上门。WhatsApp 联系可获得最快派单。",
    },
    sendMessage: {
      en: "Send us a message now — we'll reply with availability and a firm quote within 30 minutes.",
      ms: "Hantar mesej kepada kami sekarang — kami akan membalas dengan ketersediaan dan sebut harga tepat dalam 30 minit.",
      zh: "立即发送消息——我们将在 30 分钟内回复可预约时间并提供确定报价。",
    },
    availableToday: { en: "Available Today", ms: "Tersedia Hari Ini", zh: "今日可上门" },
    pricingNote: {
      en: "Starting prices. Material costs (gas, copper, trunking) quoted separately.",
      ms: "Harga permulaan. Kos bahan (gas, kuprum, trunking) dikira berasingan.",
      zh: "起步价格。材料费用（气体、铜管等）另行报价。",
    },
    materialsTitle: { en: "Additional Materials & Special Charges", ms: "Bahan Tambahan & Caj Khas", zh: "额外材料与特殊费用" },
    materialsSectionTitle: { en: "Additional Materials Pricing", ms: "Harga Bahan Tambahan", zh: "额外材料收费" },
    materialsNote: {
      en: "All material costs are quoted and confirmed with you before work begins. No surprises.",
      ms: "Semua kos bahan disebut harga dan disahkan dengan anda sebelum kerja dimulakan. Tiada kejutan.",
      zh: "所有材料费用都会在工作开始前向您报价并确认，绝无意外。",
    },
    includedFree: { en: "✓ Included free: ", ms: "✓ Termasuk percuma: ", zh: "✓ 免费包含：" },
    viewFullMaterials: { en: "View Full Materials Pricing & Special Charges →", ms: "Lihat Harga Bahan Penuh & Caj Khas →", zh: "查看完整材料收费与特殊费用 →" },
    allProblems: { en: "All Aircond Problems →", ms: "Semua Masalah Aircond →", zh: "全部冷气问题 →" },
    fromWord: { en: "From", ms: "Dari", zh: "从" },
    allKlSelangorTag: { en: "All KL & Selangor", ms: "Seluruh KL & Selangor", zh: "全区KL &雪兰莪" },
    availableAreas: { en: "Available in These Areas", ms: "Tersedia di Kawasan Ini", zh: "覆盖地区" },
    allBrands: { en: "All Brands We Service", ms: "Semua Jenama yang Kami Servis", zh: "我们服务的所有品牌" },
    home: { en: "Home", ms: "Utama", zh: "首页" },
    services: { en: "Services", ms: "Perkhidmatan", zh: "服务" },
    nearMeTitle: { en: "Near Me", ms: "Berhampiran Saya", zh: "附近服务" },
    nearMeSub: {
      en: "Searching for \"{service}\" near me? KL Renovator operates across all KL and Selangor areas with same-day dispatch. Whether you're in Kuala Lumpur city, Petaling Jaya, Shah Alam, Subang Jaya, Klang, or any Klang Valley suburb, our technicians are already in your area today. WhatsApp your location and we'll confirm the nearest available slot.",
      ms: "Mencari \"{service}\" berhampiran saya? KL Renovator beroperasi di seluruh kawasan KL dan Selangor dengan penghantaran hari sama. Sama ada anda di bandar Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Klang, atau mana-mana suburb Lembah Klang, juruteknik kami sudah berada di kawasan anda hari ini. WhatsApp lokasi anda dan kami akan sahkan slot terdekat yang tersedia.",
      zh: "搜索\"{service}附近\"？KL Renovator 在吉隆坡和雪兰莪所有地区提供当天派遣服务。无论您在吉隆坡市区、Petaling Jaya、Shah Alam、Subang Jaya、Klang 或任何吉隆坡谷郊区，我们的技术员今天已经在您的区域。WhatsApp 您的位置，我们将确认最近的可用时段。",
    },
    geoCoverageTitle: {
      en: "Aircond Service Kuala Lumpur & Selangor — Klang Valley Coverage",
      ms: "Servis Aircond Kuala Lumpur & Selangor — Liputan Lembah Klang",
      zh: "吉隆坡和雪兰莪冷气服务 — 吉隆坡谷覆盖范围",
    },
    geoCoverageSub: {
      en: "We provide {service} across the entire Klang Valley metropolitan area. From Kuala Lumpur's CBD to every Selangor township, our mobile technicians carry the tools, parts, and refrigerant gas needed to complete most jobs in a single visit. No travel charges — you pay only for the service.",
      ms: "Kami menyediakan {service} merentasi seluruh kawasan metropolitan Lembah Klang. Dari pusat bandar Kuala Lumpur hingga ke setiap bandaraya Selangor, juruteknik mudah alih kami membawa alat, alat ganti, dan gas penyejuk yang diperlukan untuk menyelesaikan kebanyakan kerja dalam satu lawatan. Tiada caj perjalanan — anda hanya bayar untuk servis.",
      zh: "我们在整个大吉隆坡谷都市区提供{service}。从吉隆坡中央商务区到每个雪兰莪市镇，我们的移动技术员携带完成大多数工作所需的工具、零件和制冷剂。无差旅费——您只需支付服务费。",
    },
    problemAwareTitle: {
      en: "Does Your Aircond Have Any of These Problems? This Service Fixes Them.",
      ms: "Adakah Aircond Anda Mengalami Mana-mana Masalah Ini? Perkhidmatan Ini Membaikinya.",
      zh: "您的冷气有这些问题吗？此服务可修复它们。",
    },
    problemAwareSub: {
      en: "Most customers find this page after searching for the exact symptoms below. If any of these sound like your unit, {service} is likely the right solution.",
      ms: "Kebanyakan pelanggan menjumpai halaman ini selepas mencari simptom tepat di bawah. Jika mana-mana ini kedengaran seperti unit anda, {service} mungkin adalah penyelesaian yang betul.",
      zh: "大多数客户在搜索以下确切症状后找到此页面。如果您的机器有任何这些症状，{service}很可能是正确的解决方案。",
    },
    klCoverage: { en: "Aircond Service Kuala Lumpur", ms: "Servis Aircond Kuala Lumpur", zh: "吉隆坡冷气服务" },
    klCoverageDesc: { en: "Full KL coverage — all townships and condo districts. Same-day slots available.", ms: "Liputan penuh KL — semua bandaraya dan kawasan kondominium. Slot hari sama tersedia.", zh: "覆盖整个吉隆坡——所有市镇和公寓区。可提供当天时段。" },
    klangValleyCoverage: { en: "Aircond Repair Klang Valley", ms: "Baiki Aircond Lembah Klang", zh: "吉隆坡谷冷气维修" },
    klangValleyCoverageDesc: { en: "Emergency repair dispatch across the entire Klang Valley. 30–60 min response.", ms: "Penghantaran pembaikan kecemasan merentasi seluruh Lembah Klang. Respons 30–60 minit.", zh: "整个吉隆坡谷的紧急维修派遣。30-60分钟响应。" },
    selangorCoverage: { en: "Aircond Service Selangor", ms: "Servis Aircond Selangor", zh: "雪兰莪冷气服务" },
    selangorCoverageDesc: { en: "All Selangor districts covered — Petaling, Gombak, Hulu Langat, Klang, Sepang.", ms: "Semua daerah Selangor diliputi — Petaling, Gombak, Hulu Langat, Klang, Sepang.", zh: "覆盖所有雪兰莪地区——Petaling、Gombak、Hulu Langat、Klang、Sepang。" },
  };

  const pick = (key: keyof typeof LABELS) => LABELS[key][lang];
  const tri = (key: keyof typeof LABELS) => {
    const v = LABELS[key];
    return lang === "ms" ? `${v.ms} · ${v.en} · ${v.zh}` : `${v.zh} · ${v.en} · ${v.ms}`;
  };

  // Two-span title() headings (first part plain, second part brand-coloured)
  const SPLIT: Record<string, { en: [string, string]; ms: [string, string]; zh: [string, string] }> = {
    everything: { en: ["Everything you ", "get with us."], ms: ["Semua yang anda ", "dapat bersama kami."], zh: ["您将", "获得的一切。"] },
    pricing: { en: ["Transparent ", "pricing."], ms: ["Harga yang ", "telus."], zh: ["透明", "收费。"] },
    howItWorks: { en: ["How it ", "works."], ms: ["Bagaimana ia ", "berfungsi."], zh: ["工作", "方式。"] },
    commonQuestions: { en: ["Common ", "questions."], ms: ["Soalan-soalan ", "biasa."], zh: ["常见", "问题。"] },
  };

  // ── Trust strip ────────────────────────────────────────────────────────
  const TRUST: Record<Lang, string[]> = {
    ms: ["Jaminan Kerjatangan 1 Bulan", "Harga Disahkan Sebelum Kerja", "500+ Ulasan Google 5 Bintang", "Hari Sama Tersedia", "Berdaftar SSM"],
    zh: ["工艺保修1个月", "工作前确认价格", "500+ 谷歌五星好评", "可提供当天服务", "SSM注册"],
  };

  // ── Why choose us (generic, translated) ────────────────────────────────
  const WHY_ITEMS: { icon: string; en: string; ms: string; zh: string; descMS: string; descZH: string }[] = [
    {
      icon: "💰",
      en: "Transparent Pricing", ms: "Harga Telus", zh: "价格透明",
      descMS: "Harga penuh disahkan sebelum kerja dimulakan. Tiada caj tersembunyi, tiada tambahan mengejut. Apa yang kami sebut adalah apa yang anda bayar.",
      descZH: "开始工作前确认全部价格。无隐藏费用，无意外加价。我们报价多少，您就付多少。",
    },
    {
      icon: "📋",
      en: "Quote Before Work", ms: "Sebut Harga Dahulu", zh: "施工前报价",
      descMS: "Kami diagnos dahulu, sebut kemudian, kerja akhirnya. Anda meluluskan setiap kos sebelum spanar kami menyentuh unit anda.",
      descZH: "我们先诊断，再报价，最后施工。在我们的工具碰到您的机器之前，您先批准每一项费用。",
    },
    {
      icon: "🔧",
      en: "Trained Technicians", ms: "Juruteknik Terlatih", zh: "训练有素的技术员",
      descMS: "Setiap juruteknik terlatih dan berpengalaman dengan semua jenama dan jenis unit. Kami membawa alat dan alat ganti yang betul.",
      descZH: "每位技术员都经过培训，熟悉所有品牌和机型。我们携带正确的工具和零件。",
    },
    {
      icon: "⭐",
      en: "500+ 5-Star Reviews", ms: "500+ Ulasan Bintang 5", zh: "500+五星好评",
      descMS: "Rekod prestasi kami bercakap sendiri. 5,000+ pelanggan dilayan di seluruh KL dan Selangor dengan keputusan 5 bintang yang konsisten.",
      descZH: "我们的业绩说明一切。已在吉隆坡和雪兰莪服务 5,000 多名客户，始终如一的五星好评。",
    },
    {
      icon: "🛡️",
      en: "1-Month Warranty", ms: "Waranti 1 Bulan", zh: "一个月保修",
      descMS: "Semua kerjatangan dilindungi selama 1 bulan. Alat ganti dilindungi selama 3 bulan. Jika masalah berulang dalam tempoh jaminan, kami kembali secara percuma.",
      descZH: "所有工艺保修1个月，零件保修3个月。如果在保修期内问题再次出现，我们免费上门。",
    },
    {
      icon: "🚀",
      en: "Same-Day Service", ms: "Servis Hari Sama", zh: "当天服务",
      descMS: "WhatsApp kami lokasi dan masalah anda. Kami mengesahkan slot hari sama dalam beberapa minit untuk kebanyakan kawasan di Lembah Klang.",
      descZH: "通过 WhatsApp 告诉我们您的位置和问题。对于吉隆坡河谷大部分地区，我们几分钟内即可确认当天服务时段。",
    },
  ];

  // ── Material label translation (siteConfig.pricing.materials.rows) ─────
  const MATERIAL_LABELS: Record<string, { ms: string; zh: string }> = {
    "Copper Pipe 1.0 – 1.5 HP": { ms: "Paip Kuprum 1.0 – 1.5 HP", zh: "铜管 1.0 – 1.5 HP" },
    "Copper Pipe 2.0 – 2.5 HP": { ms: "Paip Kuprum 2.0 – 2.5 HP", zh: "铜管 2.0 – 2.5 HP" },
    "Copper Pipe 3.0 – 3.5 HP": { ms: "Paip Kuprum 3.0 – 3.5 HP", zh: "铜管 3.0 – 3.5 HP" },
    "Wire": { ms: "Wayar", zh: "电线" },
    "Standard Outdoor Bracket": { ms: "Braket Luaran Standard", zh: "标准室外支架" },
    "Indoor Universal Bracket": { ms: "Braket Universal Dalaman", zh: "室内通用支架" },
    "PVC Casing Wire/Copper Pipe": { ms: "Sarung PVC Wayar/Paip Kuprum", zh: "PVC电线/铜管槽" },
    "Electrical Plug Point Installation": { ms: "Pemasangan Titik Plag Elektrik", zh: "电源插座安装" },
    "Wall Hacking & Concealment Work": { ms: "Kerja Pecah Dinding & Pendam", zh: "墙体开槽与暗装工程" },
    "High-Rise / Difficult Access Charge": { ms: "Caj Akses Bangunan Tinggi / Sukar", zh: "高层/难进入作业费" },
    "Standard Metal Cable Tray": { ms: "Dulang Kabel Logam Standard", zh: "标准金属线槽" },
  };
  const matLabel = (enLabel: string) => MATERIAL_LABELS[enLabel]?.[lang] ?? enLabel;

  // ── Resolved localized content ──────────────────────────────────────────
  const tTitle = lang === "ms" ? i18.titleMS : i18.titleZH;
  const tTagline = lang === "ms" ? i18.taglineMS : i18.taglineZH;
  const tDescription = lang === "ms" ? i18.descriptionMS : i18.descriptionZH;
  const tHighlights = lang === "ms" ? i18.highlightsMS : i18.highlightsZH;
  const tProcess = lang === "ms" ? i18.processMS : i18.processZH;
  const tPriceTable = lang === "ms" ? i18.priceTableMS : i18.priceTableZH;
  const inLang = lang === "ms" ? "ms-MY" : "zh-MY";

  // FAQ selection: page language is primary, the other two are secondary.
  const basePrimaryFaqs = lang === "ms" ? data.faqsBM : data.faqsZH;
  const faqsPrimary = mergeFaqs(
    basePrimaryFaqs ?? [],
    SUPPLEMENTAL_SERVICE_FAQS_I18N[slug]?.[lang] ?? [],
    GLOBAL_SERVICE_FAQS_I18N[lang],
  );
  const faqsSecondary: { langTag: string; label: string; items: { q: string; a: string }[] }[] =
    lang === "ms"
      ? [
          { langTag: "🇬🇧 EN", label: "English", items: data.faqs },
          { langTag: "🇨🇳 中文", label: "中文", items: data.faqsZH },
        ]
      : [
          { langTag: "🇬🇧 EN", label: "English", items: data.faqs },
          { langTag: "🇲🇾 BM", label: "Bahasa Malaysia", items: data.faqsBM },
        ];

  // ── Cross-service recommendations ───────────────────────────────────────
  const CROSS_SERVICE_MAP: Record<string, string[]> = {
    "chemical-wash": ["chemical-overhaul", "basic-servicing", "gas-topup"],
    "chemical-overhaul": ["chemical-wash", "gas-topup", "repair"],
    "gas-topup": ["chemical-wash", "repair", "chemical-overhaul"],
    repair: ["chemical-wash", "chemical-overhaul", "gas-topup"],
    installation: ["basic-servicing", "chemical-wash"],
    "ceiling-cassette": ["chemical-overhaul", "repair", "gas-topup"],
    "dismantling-relocation": ["installation", "chemical-wash"],
    "basic-servicing": ["chemical-wash", "chemical-overhaul"],
    emergency: ["repair", "chemical-overhaul", "gas-topup"],
  };
  const crossSlugs = CROSS_SERVICE_MAP[slug] ?? [];
  const crossServices = siteConfig.services.filter((s) => crossSlugs.includes(s.slug));
  const svcTitle = (s: (typeof siteConfig.services)[number]) =>
    (lang === "ms" ? serviceI18n[s.slug]?.titleMS : serviceI18n[s.slug]?.titleZH) ?? s.title;
  const svcShort = (s: (typeof siteConfig.services)[number]) =>
    (lang === "ms" ? serviceI18n[s.slug]?.taglineMS : serviceI18n[s.slug]?.taglineZH) ?? s.short;

  const SERVICE_BLOG_MAP: Record<string, string[]> = {
    "chemical-wash": ["aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "how-often-service-aircond-malaysia"],
    "chemical-overhaul": ["chemical-wash-vs-chemical-overhaul", "signs-your-aircon-needs-chemical-overhaul-malaysia", "aircond-water-leaking-causes", "how-often-service-aircond-malaysia"],
    "gas-topup": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
    repair: ["aircond-not-cold-reasons", "aircond-water-leaking-causes", "aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
    installation: ["aircond-installation-guide-malaysia", "best-aircond-brands-malaysia-2026", "inverter-vs-non-inverter-aircond-malaysia", "daikin-vs-panasonic-aircond-malaysia"],
    "basic-servicing": ["how-often-service-aircond-malaysia", "aircond-maintenance-checklist-malaysia", "how-to-reduce-aircond-electricity-bill-malaysia", "aircond-service-price-guide-kl-2026"],
    "ceiling-cassette": ["commercial-hvac-maintenance-kl", "aircond-service-price-guide-kl-2026"],
    "dismantling-relocation": ["aircond-installation-guide-malaysia", "aircond-lifespan-malaysia"],
  };
  const relatedSlugs = SERVICE_BLOG_MAP_V2[slug] ?? SERVICE_BLOG_MAP[slug] ?? [];
  const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 4);
  const blogHref = (p: (typeof allPosts)[number]) => {
    const has = lang === "ms" ? p.contentMS : p.contentZH;
    return has ? `${langPrefix}/blog/${p.slug}` : `/blog/${p.slug}`;
  };

  // ── Schemas ─────────────────────────────────────────────────────────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tTitle,
    description: tTagline,
    url: `https://www.klrenovator.com${langPrefix}/services/${slug}`,
    provider: {
      "@type": "HVACBusiness",
      "@id": "https://www.klrenovator.com/#business",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: "https://www.klrenovator.com",
    },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: {
      "@type": "Offer",
      price: service?.startPrice ?? 88,
      priceCurrency: "MYR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: service?.startPrice ?? 88,
        priceCurrency: "MYR",
        description: `${pick("fromWord")} RM ${service?.startPrice ?? 88}`,
      },
      availability: "https://schema.org/InStock",
      areaServed: "Kuala Lumpur and Selangor, Malaysia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${tTitle} ${pick("pricing")}`,
      itemListElement: tPriceTable.map((row: { label: string; price: string }, i: number) => ({
        "@type": "Offer",
        position: i + 1,
        name: row.label,
        description: row.price,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pick("home"), item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: pick("services"), item: `https://www.klrenovator.com${langPrefix}/services` },
      { "@type": "ListItem", position: 3, name: tTitle, item: `https://www.klrenovator.com${langPrefix}/services/${slug}` },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${lang === "ms" ? "Cara Tempah" : "如何预约"} ${tTitle} ${lang === "ms" ? "di KL & Selangor" : "（吉隆坡及雪兰莪）"}`,
    description: `${lang === "ms" ? "Langkah demi langkah untuk" : "预约"} ${tTitle} ${lang === "ms" ? "oleh KL Renovator di Kuala Lumpur dan Selangor" : "——KL Renovator 在吉隆坡与雪兰莪的服务流程"}`,
    estimatedCost: { "@type": "MonetaryAmount", currency: "MYR", value: service?.startPrice ?? "99" },
    step: tProcess.map((p: { step: string; desc: string }, i: number) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.step,
      text: p.desc,
    })),
  };

  const faqSchema =
    faqsPrimary && faqsPrimary.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsPrimary.map((f: { q: string; a: string }) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com${langPrefix}/services/${slug}#webpage`,
    name: `${tTitle} KL & Selangor — KL Renovator`,
    description: tTagline,
    url: `https://www.klrenovator.com${langPrefix}/services/${slug}`,
    inLanguage: inLang,
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  const stepColors = ["bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-teal-500"];
  const highlightColors = ["bg-sky-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-teal-500", "bg-indigo-500", "bg-orange-500"];
  const SERVICE_PROOF_IMAGES: Record<string, { src: string; alt: string; title: string }[]> = {
    "chemical-wash": [
      { src: "/hero/aircond-pressure-chemical-wash-selangor.webp", alt: lang === "zh" ? "雪兰莪壁挂式冷气高压化学清洗" : "Cuci kimia tekanan tinggi untuk unit dinding di Selangor", title: lang === "zh" ? "高压化学清洗" : "Cuci kimia bertekanan" },
      { src: "/hero/aircond-chemical-wash-canvas-kepong-kl.webp", alt: lang === "zh" ? "吉隆坡甲洞冷气清洗保护帆布设置" : "Set kanvas perlindungan semasa cuci kimia aircond di Kepong KL", title: lang === "zh" ? "室内保护流程" : "Kerja dalaman terlindung" },
      { src: "/hero/aircond-chemical-service-canvas-wrap-kl.webp", alt: lang === "zh" ? "吉隆坡冷气化学服务帆布包覆" : "Balutan kanvas servis kimia aircond di Kuala Lumpur", title: lang === "zh" ? "干净施工" : "Aliran kerja bersih" },
    ],
    "chemical-overhaul": [
      { src: "/hero/aircond-chemical-overhaul-ampang-selangor.webp", alt: lang === "zh" ? "安邦雪兰莪冷气拆开进行化学大清洗" : "Unit aircond dibuka untuk chemical overhaul di Ampang Selangor", title: lang === "zh" ? "完整拆洗" : "Overhaul buka penuh" },
      { src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp", alt: lang === "zh" ? "巴生LG冷气化学大清洗" : "Chemical overhaul aircond LG di Klang", title: lang === "zh" ? "深层内部清洗" : "Cucian dalaman mendalam" },
      { src: "/hero/mitsubishi-aircond-chemical-overhaul-petaling-jaya-14.webp", alt: lang === "zh" ? "八打灵再也Mitsubishi冷气化学大清洗" : "Chemical overhaul aircond Mitsubishi di Petaling Jaya", title: lang === "zh" ? "品牌安全重装" : "Pemasangan semula selamat" },
    ],
    "gas-topup": [
      { src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp", alt: lang === "zh" ? "雪兰莪R32与R410A冷气加Gas压力平衡" : "Tambah gas R32 dan R410A dengan imbangan tekanan di Selangor", title: lang === "zh" ? "压力平衡加Gas" : "Tambah gas tepat" },
      { src: "/hero/york-aircond-gas-topup-r410a-kuala-lumpur-4.webp", alt: lang === "zh" ? "吉隆坡York冷气R410A加Gas" : "Tambah gas R410A York di Kuala Lumpur", title: lang === "zh" ? "R410A服务" : "Servis R410A" },
      { src: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp", alt: lang === "zh" ? "梳邦再也Acson R32冷气加Gas" : "Tambah gas R32 Acson di Subang Jaya", title: lang === "zh" ? "R32变频支持" : "Sokongan inverter R32" },
    ],
    "repair": [
      { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: lang === "zh" ? "巴生谷冷气维修诊断技术员" : "Juruteknik membaiki dan mendiagnosis aircond di Klang Valley", title: lang === "zh" ? "现场诊断" : "Diagnosis di lokasi" },
      { src: "/hero/aircond-pcb-board-replacement-kl.webp", alt: lang === "zh" ? "吉隆坡冷气PCB电板维修更换" : "Penggantian dan pembaikan papan PCB aircond di KL", title: lang === "zh" ? "PCB维修" : "Pembaikan PCB" },
      { src: "/hero/tcl-aircond-troubleshooting-repair-shah-alam-54.webp", alt: lang === "zh" ? "莎阿南TCL冷气故障诊断" : "Troubleshooting aircond TCL di Shah Alam", title: lang === "zh" ? "电气故障排查" : "Troubleshooting elektrik" },
    ],
    "installation": [
      { src: "/hero/aircond-installation-wall-mounted-kl.webp", alt: lang === "zh" ? "吉隆坡壁挂式冷气安装与铜管布线" : "Pemasangan aircond dinding dengan paip tembaga di KL", title: lang === "zh" ? "壁挂式安装" : "Pemasangan dinding" },
      { src: "/hero/aircond-installation-double-unit-kl.webp", alt: lang === "zh" ? "吉隆坡双冷气安装项目" : "Pemasangan dua unit aircond di KL", title: lang === "zh" ? "多台安装" : "Pemasangan banyak unit" },
      { src: "/hero/aircond-compressor-bracket-installation-kl.webp", alt: lang === "zh" ? "吉隆坡室外机支架安装" : "Pemasangan bracket kompressor luar di KL", title: lang === "zh" ? "室外支架" : "Set bracket luar" },
    ],
    "basic-servicing": [
      { src: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp", alt: lang === "zh" ? "吉隆坡Acson冷气基本保养" : "Servis asas aircond Acson di Kuala Lumpur", title: lang === "zh" ? "例行保养" : "Servis asas berkala" },
      { src: "/hero/samsung-aircond-basic-servicing-puchong-41.webp", alt: lang === "zh" ? "蒲种Samsung冷气滤网清洗" : "Servis asas aircond Samsung di Puchong", title: lang === "zh" ? "滤网和风量检查" : "Filter dan aliran angin" },
      { src: "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp", alt: lang === "zh" ? "八打灵再也Midea冷气基本保养" : "Servis asas aircond Midea di Petaling Jaya", title: lang === "zh" ? "预防性保养" : "Penyelenggaraan pencegahan" },
    ],
    "ceiling-cassette": [
      { src: "/hero/aircond-ceiling-cassette-installation-commercial.webp", alt: lang === "zh" ? "巴生谷商用天花卡式冷气安装" : "Pemasangan ceiling cassette komersial di Klang Valley", title: lang === "zh" ? "天花卡式工程" : "Kerja ceiling cassette" },
      { src: "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp", alt: lang === "zh" ? "巴生Panasonic天花卡式冷气保养" : "Servis ceiling cassette Panasonic di Klang", title: lang === "zh" ? "商业保养" : "Servis komersial" },
      { src: "/hero/tcl-aircond-ceiling-cassette-service-subang-jaya-32.webp", alt: lang === "zh" ? "梳邦再也办公室TCL天花卡式冷气深层保养" : "Servis mendalam ceiling cassette TCL di pejabat Subang Jaya", title: lang === "zh" ? "办公室卡式机服务" : "Servis cassette pejabat" },
    ],
    "dismantling-relocation": [
      { src: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp", alt: lang === "zh" ? "蒲种Daikin冷气拆除搬迁" : "Buka dan pindah aircond Daikin di Puchong", title: lang === "zh" ? "谨慎拆除" : "Buka dengan cermat" },
      { src: "/hero/panasonic-aircond-dismantle-relocation-shah-alam-57.webp", alt: lang === "zh" ? "莎阿南Panasonic冷气搬迁拆除" : "Buka aircond Panasonic untuk pindah di Shah Alam", title: lang === "zh" ? "安全搬迁" : "Relokasi selamat" },
      { src: "/hero/tcl-aircond-dismantle-relocation-petaling-jaya-21.webp", alt: lang === "zh" ? "八打灵再也TCL冷气拆除" : "Buka aircond TCL untuk pindah di Petaling Jaya", title: lang === "zh" ? "搬家支援" : "Sokongan pindah" },
    ],
    "emergency": [
      { src: "/hero/aircond-repair-technician-klang-valley.webp", alt: lang === "zh" ? "巴生谷紧急冷气维修技术员" : "Juruteknik kecemasan aircond di Klang Valley", title: lang === "zh" ? "紧急诊断" : "Diagnosis kecemasan" },
      { src: "/hero/aircond-pcb-board-replacement-2-klang-valley.webp", alt: lang === "zh" ? "巴生谷紧急冷气PCB更换" : "Penggantian PCB aircond kecemasan di Klang Valley", title: lang === "zh" ? "关键维修" : "Pembaikan kritikal" },
      { src: "/hero/aircond-sensor-replacement-klang-valley.webp", alt: lang === "zh" ? "巴生谷冷气温度传感器更换" : "Penggantian sensor suhu aircond di Klang Valley", title: lang === "zh" ? "快速故障定位" : "Kenal pasti rosak cepat" },
    ],
  };
  const proofImages = SERVICE_PROOF_IMAGES[slug] ?? SERVICE_PROOF_IMAGES["installation"];

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href={`${langPrefix}/`} className="hover:text-sky-600 transition">{pick("home")}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href={`${langPrefix}/services`} className="hover:text-sky-600 transition">{pick("services")}</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">{tTitle}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src={data.heroImage || "/hero/aircond-installation-kuala-lumpur.webp"}
            alt={`KL Renovator ${tTitle} — KL & Selangor`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center bg-sky-500 text-white shadow-md">
                  <ServiceIcon name={iconName} className="h-7 w-7" />
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">{tTitle}</h1>

                <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">{tTagline}</p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider">
                    {pick("fromWord")} {data.startPrice}
                  </span>
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">{pick("allKlSelangorTag")}</span>
                </div>
                <div className="mt-8">
                  <BookingButton serviceName={tTitle} size="lg" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white text-slate-900 p-6 sm:p-8 border-2 border-sky-100 shadow-sm">
                <p className={eyebrow()}>{pick("overview")}</p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">{tDescription}</p>
                <ul className="mt-6 space-y-2.5">
                  {tHighlights.slice(0, 4).map((h: string, i: number) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center ${highlightColors[i % highlightColors.length]} text-white mt-0.5`}>
                        <FiCheck className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Near Me Section ─────────────────────────────────────────────── */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
              {tTitle} {pick("nearMeTitle")} — KL &amp; Selangor
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {LABELS.nearMeSub[lang].replace("{service}", tTitle.toLowerCase())}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">{tTitle.toLowerCase()} {pick("nearMeTitle")}</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">same day {tTitle.toLowerCase()} {pick("nearMeTitle")}</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">best aircond technician {pick("nearMeTitle")}</span>
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 text-xs font-bold rounded-full border border-sky-200">aircond service {pick("nearMeTitle")} klang valley</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expert Review / AEO Direct Answer */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-widest text-sky-700">
                  {lang === "zh" ? "直接答案" : "Jawapan Ringkas"}
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  {lang === "zh" ? `${tTitle} 适合我的冷气问题吗？` : `Adakah ${tTitle} sesuai untuk masalah aircond saya?`}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {lang === "zh"
                    ? `如果您的冷气症状与本页说明和价格表相符，${tTitle} 通常就是合适的服务。KL Renovator 会先确认实际问题、价格和任何材料费用，再开始施工。`
                    : `Ya — jika simptom unit anda sepadan dengan penerangan dan jadual harga di halaman ini, ${tTitle} biasanya ialah servis yang sesuai. KL Renovator mengesahkan masalah sebenar, harga dan sebarang kos bahan sebelum kerja bermula.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-sky-800">
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">{lang === "zh" ? "吉隆坡与雪兰莪当天服务" : "Slot hari sama KL & Selangor"}</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">{lang === "zh" ? "先确认价格" : "Harga disahkan dahulu"}</span>
                  <span className="rounded-full border border-sky-200 bg-white px-3 py-1.5">{lang === "zh" ? "1个月工艺保修" : "Waranti kerja 1 bulan"}</span>
                </div>
              </div>
              <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  {lang === "zh" ? "专家审核" : "Disemak Pakar"}
                </p>
                <p className="mt-2 text-base font-black text-slate-950">
                  {lang === "zh" ? "KL Renovator HVAC专家团队" : "Pasukan Pakar HVAC KL Renovator"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {lang === "zh"
                    ? "已根据吉隆坡与雪兰莪当前价格、服务范围、支持品牌和工艺保修详情审核。"
                    : "Disemak berdasarkan harga semasa KL & Selangor, skop servis aktif, jenama disokong dan butiran waranti kerja."}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="font-bold uppercase tracking-wider text-slate-400">{lang === "zh" ? "最后审核" : "Disemak terakhir"}</dt>
                    <dd className="mt-1 font-black text-slate-900">3 July 2026</dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="font-bold uppercase tracking-wider text-slate-400">{lang === "zh" ? "企业" : "Perniagaan"}</dt>
                    <dd className="mt-1 font-black text-slate-900">SSM Registered</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trust Signal Strip ─────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          {TRUST[lang].map((t: string) => (
            <span key={t} className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> {t}</span>
          ))}
        </div>
      </section>

      {/* ── Problem-Aware Block — exact symptoms this service fixes ─────── */}
      {(() => {
        const problemSlugs = SERVICE_PROBLEM_MAP[slug] ?? [];
        const problems = problemSlugs.length > 0
          ? siteConfig.problemPages.filter((p) => problemSlugs.includes(p.slug))
          : [];
        if (problems.length === 0) return null;
        return (
          <section className="py-14 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">{pick("problemsFixed")}</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                  {LABELS.problemAwareTitle[lang]}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
                  {LABELS.problemAwareSub[lang].replace("{service}", tTitle)}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {problems.map((problem) => (
                    <NextLink
                      key={problem.slug}
                      href={`${langPrefix}/problems/${problem.slug}`}
                      className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50 transition"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center bg-red-100 text-red-600 rounded-full text-xs font-black">!</span>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-700 transition">
                          {lang === "ms" ? (problem.nameMS ?? problem.name) : lang === "zh" ? (problem.nameZH ?? problem.name) : problem.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lang === "ms" ? (problem.descriptionMS ? `${problem.descriptionMS.slice(0, 120)}...` : problem.nameMS ?? problem.name)
                          : lang === "zh" ? (problem.descriptionZH ? `${problem.descriptionZH.slice(0, 120)}...` : problem.nameZH ?? problem.name)
                          : (problem.description ? `${problem.description.slice(0, 120)}...` : `Learn what causes ${problem.name.toLowerCase()} and how ${tTitle} fixes it.`)}
                      </p>
                    </NextLink>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* Highlights */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>{tri("whatsIncluded")}</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>{SPLIT.everything[lang][0]}</span>
              <span className={title({ size: "sm", color: "brand" })}>{SPLIT.everything[lang][1]}</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {tHighlights.map((h: string, i: number) => (
              <Reveal key={h} delay={i * 60}>
                <div className="flex items-start gap-3 bg-white p-5 h-full">
                  <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center ${highlightColors[i % highlightColors.length]} text-white`}>
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real Work Proof */}
      <section className="py-14 sm:py-16 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className={eyebrow()}>{lang === "zh" ? "真实施工" : "Bukti Kerja Sebenar"}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{lang === "zh" ? "查看我们的" : "Lihat Cara "}</span>
                <span className={title({ size: "sm", color: "brand" })}>{lang === "zh" ? "技术员施工" : "Juruteknik Bekerja"}</span>
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {lang === "zh"
                  ? "真实KL Renovator施工照片让客户在预约前了解我们的工艺标准：保护室内环境、使用正确工具、处理干净，并展示吉隆坡与雪兰莪住宅、公寓、办公室和店铺的服务证明。"
                  : "Foto kerja sebenar KL Renovator membantu pelanggan melihat standard kerja sebelum membuat tempahan: kerja dalaman dilindungi, alat yang betul digunakan, pengendalian bersih dan bukti servis dari rumah, kondominium, pejabat dan lot kedai sekitar KL & Selangor."}
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {proofImages.map((img, i) => (
              <Reveal key={img.src} delay={i * 80}>
                <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="p-4">
                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{img.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{img.alt}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-emerald-600">1 Bulan</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">{lang === "zh" ? "工艺保修" : "Waranti kerja"}</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-sky-600">500+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">{lang === "zh" ? "Google五星好评" : "Ulasan Google 5 bintang"}</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-white p-5 text-center">
                <p className="text-2xl font-black text-amber-600">SSM</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-600">{lang === "zh" ? "马来西亚注册企业" : "Perniagaan Malaysia berdaftar"}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("pricing")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.pricing[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.pricing[lang][1]}</span>
              </h2>
              <p className="mt-2 text-xs text-slate-500">{pick("pricingNote")}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {tPriceTable.map((p: { label: string; price: string }) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {data.priceTableNote && (
            <Reveal>
              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-black">{pick("includedFree")}</span>
                  {data.priceTableNote}
                </p>
                <NextLink
                  href={`${langPrefix}/services#materials`}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-black text-sky-600 hover:text-sky-800 transition-colors"
                >
                  {pick("viewFullMaterials")}
                </NextLink>
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-300">
                    {lang === "zh" ? "多台优惠" : lang === "ms" ? "Diskaun Banyak Unit" : "Multi-Unit Bundle Savings"}
                  </p>
                  <h3 className="mt-1 text-lg font-black uppercase tracking-tight">
                    {lang === "zh" ? "一次预约多台，费用更划算" : lang === "ms" ? "Tempah lebih banyak unit dalam satu lawatan dan bayar lebih jimat" : "Book more units in one visit and pay less"}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300">
                    {lang === "zh"
                      ? "适合拥有多台冷气的公寓、排屋、办公室和店铺。优惠适用于符合条件的人工/服务费，并会在施工前确认。"
                      : lang === "ms"
                        ? "Sesuai untuk kondominium, rumah teres, pejabat dan lot kedai dengan banyak unit aircond. Diskaun terpakai untuk caj kerja/servis yang layak dan disahkan sebelum kerja bermula."
                        : "Perfect for condominiums, terrace houses, offices and shoplots with multiple aircond units. Discounts apply to eligible labour/service charges and are confirmed before work starts."}
                  </p>
                </div>
                <NextLink
                  href={`${langPrefix}/services#materials`}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white/20"
                >
                  {lang === "zh" ? "查看完整收费 →" : lang === "ms" ? "Lihat semua harga →" : "View all pricing →"}
                </NextLink>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {siteConfig.volumeDiscounts.map((discount) => (
                  <div key={discount.units} className="rounded-xl border border-white/15 bg-white/10 p-4 text-center">
                    <p className="text-2xl font-black text-white">{discount.units}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-sky-200">{discount.off}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Inline Materials Pricing — installation, dismantling, ceiling-cassette */}
          {(slug === "installation" || slug === "dismantling-relocation" || slug === "ceiling-cassette") && (
            <Reveal>
              <div className="mt-10">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{pick("materialsSectionTitle")}</p>
                <h3 className="text-base font-black text-slate-900 mb-4">{pick("materialsTitle")}</h3>
                <div className="border border-slate-200 bg-white">
                  <ul className="divide-y divide-slate-200">
                    {siteConfig.pricing.materials.rows.map((row: { label: string; price: string }) => (
                      <li key={row.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                        <span className="text-sm text-slate-700">{matLabel(row.label)}</span>
                        <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{row.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-400 mt-3">{pick("materialsNote")}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("process")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.howItWorks[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.howItWorks[lang][1]}</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {tProcess.map((p: { step: string; desc: string }, i: number) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="bg-white p-6 h-full">
                  <span className={`inline-flex h-10 w-10 items-center justify-center ${stepColors[i % stepColors.length]} text-white font-extrabold text-sm`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 uppercase tracking-tight">{p.step}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs — page language primary, then the other two as secondary */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>{tri("faq")}</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{SPLIT.commonQuestions[lang][0]}</span>
                <span className={title({ size: "sm", color: "brand" })}>{SPLIT.commonQuestions[lang][1]}</span>
              </h2>
            </div>
          </Reveal>

          {/* Primary language FAQs */}
          <div className="mt-8 border border-slate-200 divide-y divide-slate-200">
            {faqsPrimary.map((f: { q: string; a: string }, i: number) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Secondary language FAQ blocks */}
          {faqsSecondary.map((block) => (
            <Reveal key={block.label}>
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{block.langTag} {block.label}</p>
                <div className="space-y-3">
                  {block.items.map((f, i: number) => (
                    <div key={i} className="bg-white border border-slate-200 p-4">
                      <h3 className="font-black text-sm text-slate-900 mb-2">{f.q}</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Area Links */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{tTitle} {pick("availableAreas")}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.areaPages.map((area) => (
                <NextLink
                  key={area.slug}
                  href={`${langPrefix}/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  {area.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Geographic Coverage — KL, Selangor, Klang Valley ─────────────── */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
              {LABELS.geoCoverageTitle[lang]}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {LABELS.geoCoverageSub[lang].replace("{service}", tTitle.toLowerCase())}
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{LABELS.klCoverage[lang]}</h3>
                <p className="text-xs text-slate-500">{LABELS.klCoverageDesc[lang]}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{LABELS.klangValleyCoverage[lang]}</h3>
                <p className="text-xs text-slate-500">{LABELS.klangValleyCoverageDesc[lang]}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{LABELS.selangorCoverage[lang]}</h3>
                <p className="text-xs text-slate-500">{LABELS.selangorCoverageDesc[lang]}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brands Internal Links */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{tTitle} {pick("allBrands")}</p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.brandPages.map((brand) => (
                <NextLink
                  key={brand.slug}
                  href={`${langPrefix}/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition rounded-full"
                >
                  {brand.name} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Same-Day Urgency Banner ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-1">{pick("availableToday")}</p>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              {lang === "ms" ? `Perlukan ${tTitle} Hari Ini?` : `今天需要${tTitle}？`}
            </h2>
            <p className="text-sky-100 text-sm mt-1">{pick("needTodaySub")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <BookingButton serviceName={tTitle} size="md" />
          </div>
        </div>
      </section>

      {/* ── Competitor Differentiator ─────────────────────────────────────── */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">{pick("whyChoose")}</p>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{pick("whyChooseSub")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ITEMS.map((item) => (
              <div key={item.icon} className="bg-white border border-slate-200 rounded-2xl p-5">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-black text-slate-900 text-sm mb-0.5">{lang === "ms" ? item.ms : item.zh}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mb-2">{item.en} · {lang === "ms" ? item.zh : item.ms}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{lang === "ms" ? item.descMS : item.descZH}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Also Consider — Cross-Service Links ──────────────────────────── */}
      {(() => {
        if (crossServices.length === 0) return null;
        return (
          <section className="py-10 px-4 bg-white border-t border-slate-100">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{tri("alsoConsider")}</p>
              <h2 className="text-base font-black text-slate-900 mb-4">{pick("relatedServices")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crossServices.map((s) => (
                  <NextLink
                    key={s.slug}
                    href={`${langPrefix}/services/${s.slug}`}
                    className="group bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-sm rounded-2xl p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors">{svcTitle(s)}</h3>
                      <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-sky-700 font-black">{pick("fromWord")} RM {s.startPrice}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{svcShort(s)}</p>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related Problems — service-specific from topical authority map */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{tri("problemsFixed")}</p>
            <h2 className="text-base font-black text-slate-900 mb-4">{pick("problemsFixes")}</h2>
            <div className="flex flex-wrap gap-2">
              {(() => {
                const specificSlugs = SERVICE_PROBLEM_MAP[slug] ?? [];
                const specificProblems = specificSlugs.length > 0
                  ? siteConfig.problemPages.filter((p) => specificSlugs.includes(p.slug))
                  : siteConfig.problemPages.slice(0, 8);
                return specificProblems.map((problem) => (
                  <NextLink
                    key={problem.slug}
                    href={`${langPrefix}/problems/${problem.slug}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition rounded-xl"
                  >
                    <FiArrowRight className="h-3 w-3 text-red-400 shrink-0" />
                    {problem.name}
                    <span className="text-slate-400 font-normal"> · {problem.nameMS}</span>
                  </NextLink>
                ));
              })()}
              <NextLink
                href={`${langPrefix}/problems`}
                className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-red-100 transition rounded-xl"
              >
                {pick("allProblems")}
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Blog Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{tri("expertGuides")}</p>
            <h2 className="text-lg font-black text-slate-900 mb-6">{pick("relatedGuides")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((post) => (
                <NextLink
                  key={post.slug}
                  href={blogHref(post)}
                  className="group flex flex-col bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-2">{post.category}</span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                  <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                </NextLink>
              ))}
            </div>
            <NextLink href={`${langPrefix}/blog`} className="inline-flex items-center gap-1 mt-6 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition">
              {lang === "ms" ? "Semua Panduan Aircond" : "全部冷气指南"} <FiArrowRight className="h-3 w-3" />
            </NextLink>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className={eyebrow()}>{tri("bookIt")}</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>{lang === "ms" ? "Tempah " : "预约"}</span>
                  <span className={title({ size: "md", color: "brand" })}>{tTitle}{lang === "ms" ? "." : "。"}</span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>{pick("sendMessage")}</p>
                <div className="mt-6">
                  <BookingButton serviceName={tTitle} size="lg" />
                </div>

                <div className="mt-10">
                  <p className={eyebrow()}>{tri("otherServices")}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.services
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <NextLink
                          key={s.slug}
                          href={`${langPrefix}/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-sky-500 hover:text-sky-600 transition"
                        >
                          {svcTitle(s)} <FiArrowRight className="h-3 w-3" />
                        </NextLink>
                      ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
