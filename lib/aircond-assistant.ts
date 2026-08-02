// ─────────────────────────────────────────────────────────────────────────
// KL Renovator — Aircond Expert Assistant engine (trilingual EN/MS/ZH).
//
// Deterministic, knowledge-based assistant. It is "trained" exclusively on
// the website's own content (config/site-public.ts + the curated knowledge
// base below) so the website remains the single source of truth:
//   • All prices are read from sitePublic.pricing at answer time — the
//     assistant can never drift from the published price list.
//   • It never invents prices: anything that requires an on-site inspection
//     (exact gas PSI, drain routing, water pump sizing) is always returned
//     as a range or with the on-site confirmation disclaimer.
//   • Every recommendation links back to the relevant page or calculator.
//
// Client-safe (imports only site-public + aircond-math). Pure functions —
// the React component in components/ai-assistant.tsx handles UI only.
// ─────────────────────────────────────────────────────────────────────────

import { sitePublic } from "@/config/site-public";
import {
  calculateBtu,
  calculateGasEstimate,
  calculateInstallationEstimate,
  copperPipeRate,
  DRAIN_PIPE_RATE,
  electricalWireRate,
  formatRM,
  FREE_RUN_FEET,
  GAS_LABELS,
  peopleBtu,
  recommendHpFromBtu,
  ROOM_TYPE_MULTIPLIERS,
  SUN_MULTIPLIERS,
  heightMultiplier,
  windowsBtu,
  type GasType,
  type HpSize,
  type UnitType,
} from "@/lib/aircond-math";

// ── Types ─────────────────────────────────────────────────────────────────

export type AssistantLang = "en" | "ms" | "zh";

export type AssistantCard =
  | {
      type: "pricing";
      title: string;
      rows: { label: string; price: string }[];
      note?: string;
    }
  | {
      type: "quote";
      title: string;
      lines: { label: string; detail: string; amount: string }[];
      total: string;
      discount?: string;
      note: string;
    }
  | {
      type: "hp";
      title: string;
      btu: number;
      hp: string;
      installFrom: number;
      note: string;
    }
  | {
      type: "service";
      title: string;
      service: string;
      price: string;
      why: string;
      href: string;
    }
  | {
      type: "links";
      title: string;
      links: { label: string; href: string }[];
    };

export interface AssistantMessage {
  role: "user" | "assistant";
  text: string;
  cards?: AssistantCard[];
  suggested?: string[];
}

export interface AssistantContext {
  hp?: HpSize;
  unitType?: UnitType;
  gasType?: GasType;
  units?: number;
  roomSqft?: number;
  service?: string;
  lastIntent?: string;
}

export interface AssistantReply {
  /** Assistant message — the UI adds `role: "assistant"` when rendering. */
  message: Omit<AssistantMessage, "role">;
  context: AssistantContext;
  intent: string;
}

// ── Small helpers ─────────────────────────────────────────────────────────

/** Pick the right language string from a trilingual tuple. */
export function tt(lang: AssistantLang, t: { en: string; ms: string; zh: string }): string {
  return t[lang];
}

const SUGGESTIONS: Record<AssistantLang, string[]> = {
  en: [
    "How much is aircond installation?",
    "How much is gas top-up for 1.5 HP R32?",
    "What HP do I need for a 12x10 room?",
    "My aircond smells bad — what service?",
    "Which gas — R22 or R32?",
    "How do I book a service?",
    "Do you cover Cheras?",
    "What warranty do you give?",
  ],
  ms: [
    "Berapa harga pemasangan aircond?",
    "Berapa kos tambah gas untuk 1.5 HP R32?",
    "HP apa untuk bilik 12x10?",
    "Aircond saya berbau — servis apa?",
    "Gas mana — R22 atau R32?",
    "Macam mana nak tempah servis?",
    "Adakah anda liput Cheras?",
    "Apa waranti yang anda beri?",
  ],
  zh: [
    "冷气安装多少钱？",
    "1.5匹R32加气多少钱？",
    "12x10的房间需要几匹？",
    "冷气有异味 — 需要什么服务？",
    "用R22还是R32？",
    "怎么预约服务？",
    "你们覆盖蕉赖吗？",
    "你们提供什么保修？",
  ],
};

function normalize(input: string): string {
  // ES5-safe normalizer: keep ASCII alnum, spaces, common punctuation and
  // ALL non-ASCII (Malay/Chinese characters, ×, emoji); replace everything
  // else with a space so keyword regexes still match across languages.
  let out = "";
  for (const ch of input.toLowerCase()) {
    const code = ch.codePointAt(0) ?? 0;
    const keep =
      (code >= 48 && code <= 57) ||
      (code >= 97 && code <= 122) ||
      code >= 128 ||
      " x*×.%/,:-".includes(ch);
    out += keep ? ch : " ";
  }
  return out.replace(/\s+/g, " ").trim();
}

function hpFromText(n: string): HpSize | undefined {
  const m = n.match(/(\d(?:\.\d)?)\s*(?:hp|horsepower|匹|pk|hp)/i);
  if (!m) return undefined;
  const v = parseFloat(m[1]);
  const valid: HpSize[] = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "5.0"];
  return valid.find((h) => parseFloat(h) === v) ?? undefined;
}

function roomDimsFromText(n: string): { length: number; width: number } | null {
  const m = n.match(/(\d+(?:\.\d)?)\s*[x×*]\s*(\d+(?:\.\d)?)/);
  if (m) return { length: parseFloat(m[1]), width: parseFloat(m[2]) };
  return null;
}

function sqftFromText(n: string): number | null {
  const m = n.match(/(\d+(?:\.\d)?)\s*(?:sq\s*ft|sqft|square\s*feet|kaki\s*persegi|平方英尺)/i);
  return m ? parseFloat(m[1]) : null;
}

function unitTypeFromText(n: string): UnitType | null {
  if (/\b(cassette|ceiling)\b/.test(n)) return "cassette";
  if (/\bwindow\b/.test(n)) return "window";
  if (/\bwall|dinding|挂壁|掛壁\b/.test(n)) return "wall";
  return null;
}

function gasFromText(n: string): GasType | null {
  if (/r\s?22|\br22\b/.test(n)) return "r22";
  if (/r\s?410a?|\br410a\b|\b410a\b/.test(n)) return "r410a";
  if (/r\s?32|\br32\b/.test(n)) return "r32";
  return null;
}

const SERVICE_SLUGS: { slug: string; keywords: RegExp; title: string }[] = [
  { slug: "basic-servicing", keywords: /basic service|basic servicing|routine|regular service|filter cleaning|servis asas|普通保养|基本保养|routine maintenance/, title: "Basic Servicing" },
  { slug: "chemical-wash", keywords: /chemical wash|pressure wash|cuci kimia|cuci aircond|chemical cleaning|化学清洗|清洗/, title: "Pressure Chemical Wash" },
  { slug: "chemical-overhaul", keywords: /chemical overhaul|overhaul|top overhaul|overhaul kimia|化学大修|大修/, title: "Chemical Overhaul" },
  { slug: "gas-topup", keywords: /gas top|top.?up|tambah gas|gas refill|gas charge|refrigerant|加气|充气|加gas/, title: "Gas Top-Up" },
  { slug: "repair", keywords: /repair|baiki|troubleshoot|diagnostic|维修|修理|fix/, title: "Troubleshooting & Repair" },
  { slug: "installation", keywords: /install|pemasangan|安装|setup|new unit/, title: "New Unit Installation" },
  { slug: "dismantling-relocation", keywords: /dismantle|relocat|pindah|拆除|搬迁/, title: "Dismantle & Relocation" },
  { slug: "maintenance-contract", keywords: /contract|amc|maintenance plan|yearly plan|annual plan/, title: "Maintenance Contract (AMC)" },
];

function detectService(n: string): { slug: string; title: string } | null {
  for (const s of SERVICE_SLUGS) if (s.keywords.test(n)) return s;
  return null;
}

// ── UI / chrome strings ─────────────────────────────────────────────────────

const I18N = {
  greeting: {
    en: "Hello! 👋 I'm KL Renovator's Aircond Expert Assistant. I can help you with pricing (using our published 2026 rates), HP recommendations, installation estimates, gas type advice, service recommendations and booking. What would you like to know?",
    ms: "Helo! 👋 Saya Pembantu Pakar Aircond KL Renovator. Saya boleh bantu anda dengan harga (menggunakan kadar 2026 yang diterbitkan), cadangan HP, anggaran pemasangan, nasihat jenis gas, cadangan servis dan tempahan. Apa yang anda ingin tahu?",
    zh: "您好！👋 我是KL Renovator的冷气专家助手。我可以帮您查询价格（使用已公布的2026年费率）、推荐匹数、估算安装费用、提供气体类型建议、服务推荐和预约帮助。您想了解什么？",
  },
  thanks: {
    en: "You're very welcome! 😊 If you need a confirmed price or a same-day slot, just WhatsApp +60182983573 or book online at klrenovator.com/book — mention this chat and we'll pick up right where we left off.",
    ms: "Sama-sama! 😊 Jika anda perlukan harga disahkan atau slot hari sama, WhatsApp +60182983573 atau tempah dalam talian di klrenovator.com/book — sebutkan chat ini dan kami akan sambung dari situ.",
    zh: "不客气！😊 如果您需要确认价格或当天时段，请WhatsApp +60182983573或在线预约klrenovator.com/book — 提及本次对话，我们将无缝衔接。",
  },
  bye: {
    en: "Goodbye! Thanks for chatting with KL Renovator. If anything comes up — a leak, strange noise, or a new installation — we're open 9 AM–6 PM every day, including weekends. WhatsApp +60182983573 anytime. 👋",
    ms: "Selamat tinggal! Terima kasih kerana berbual dengan KL Renovator. Jika ada sebarang masalah — bocor, bunyi pelik, atau pemasangan baharu — kami buka 9 pagi–6 petang setiap hari, termasuk hujung minggu. WhatsApp +60182983573 bila-bila masa. 👋",
    zh: "再见！感谢与KL Renovator交流。如有任何问题 — 漏水、异响或新安装 — 我们每天上午9点至下午6点营业，包括周末。随时WhatsApp +60182983573。👋",
  },
  helpIntro: {
    en: "I'm trained on KL Renovator's full service information — the same content as our website. I can: 1) Quote published service & material prices, 2) Recommend the right HP for your room, 3) Generate an installation quotation, 4) Estimate materials (copper pipe, wire, drain, casing, bracket), 5) Advise on gas type (R22/R410A/R32) and gas top-up costs, 6) Recommend the right service from your symptoms, 7) Answer FAQs (warranty, hours, coverage, brands), 8) Guide you through booking, 9) Troubleshoot common problems. Try one of these:",
    ms: "Saya dilatih dengan maklumat servis penuh KL Renovator — kandungan yang sama seperti laman web kami. Saya boleh: 1) Memetik harga servis & bahan yang diterbitkan, 2) Mencadangkan HP yang betul untuk bilik anda, 3) Menjana sebut harga pemasangan, 4) Menganggarkan bahan (paip tembaga, wayar, saliran, casing, pendakap), 5) Menasihati jenis gas (R22/R410A/R32) dan kos tambah gas, 6) Mencadangkan servis yang betul dari gejala anda, 7) Menjawab FAQ (waranti, waktu, liputan, jenama), 8) Membimbing anda melalui tempahan, 9) Menyelesaikan masalah biasa. Cuba salah satu daripadanya:",
    zh: "我经过KL Renovator完整服务信息的训练 — 与网站内容一致。我可以：1）提供已公布的服务和材料价格，2）为您的房间推荐正确的匹数，3）生成安装报价，4）估算材料（铜管、电线、排水管、线槽、支架），5）提供气体类型（R22/R410A/R32）和加气费用建议，6）根据您的症状推荐正确的服务，7）回答常见问题（保修、时间、覆盖范围、品牌），8）指导您完成预约，9）排除常见故障。试试以下问题：",
  },
  calculatorsIntro: {
    en: "Here are KL Renovator's free calculators — all built on our published pricing and fully mobile-friendly:",
    ms: "Ini kalkulator percuma KL Renovator — semuanya dibina berdasarkan harga diterbitkan dan mesra mudah alih sepenuhnya:",
    zh: "以下是KL Renovator的免费计算器 — 全部基于已公布定价构建，完全支持移动端：",
  },
  calcLinksTitle: {
    en: "Free Aircond Calculators",
    ms: "Kalkulator Aircond Percuma",
    zh: "免费冷气计算器",
  },
  hpAskRoom: {
    en: "I'd be happy to recommend the right HP! Just tell me your room size — for example \"12 x 10 ft\" or \"200 sqft\" — and if you know it, the room type (bedroom, living room, kitchen) and sun exposure (west-facing or top floor need more power).",
    ms: "Saya dengan senang hati mencadangkan HP yang betul! Beritahu saya saiz bilik anda — contohnya \"12 x 10 kaki\" atau \"200 kaki persegi\" — dan jika anda tahu, jenis bilik (bilik tidur, ruang tamu, dapur) dan pendedahan matahari (menghadap barat atau tingkat atas perlukan lebih kuasa).",
    zh: "我很乐意为您推荐合适的匹数！请告诉我您的房间尺寸 — 例如\"12 x 10英尺\"或\"200平方英尺\" — 如果知道的话，还有房间类型（卧室、客厅、厨房）和日照情况（朝西或顶楼需要更大功率）。",
  },
  hpRecoText: {
    en: "For a room of about {area} sqft (with standard bedroom conditions: medium sun, 2 people, 1 window, 10 ft ceiling), you need roughly {btu} BTU — a {hp} HP aircond. Installation for this size starts from {price}.",
    ms: "Untuk bilik kira-kira {area} kaki persegi (dengan keadaan bilik tidur standard: matahari sederhana, 2 orang, 1 tingkap, siling 10 kaki), anda perlukan lebih kurang {btu} BTU — aircond {hp} HP. Pemasangan untuk saiz ini bermula dari {price}.",
    zh: "对于约{area}平方英尺的房间（标准卧室条件：中等日照、2人、1扇窗、10英尺天花板），您大约需要{btu} BTU — {hp}匹冷气。该规格的安装起价为{price}。",
  },
  hpCardTitle: {
    en: "Recommended Aircond Size",
    ms: "Saiz Aircond Disyorkan",
    zh: "推荐冷气尺寸",
  },
  hpCardNote: {
    en: "For precise sizing with room type, sun exposure, people and windows, use the BTU Calculator.",
    ms: "Untuk saiz tepat dengan jenis bilik, pendedahan matahari, orang dan tingkap, gunakan Kalkulator BTU.",
    zh: "如需结合房间类型、日照、人数和窗户精确计算，请使用BTU计算器。",
  },
  quoteTitle: {
    en: "Estimated Quotation",
    ms: "Sebut Harga Anggaran",
    zh: "预估报价单",
  },
  quoteIntro: {
    en: "Here is a professional estimated quotation for {units} × {hp} HP {type} aircond installation, based on our published pricing. The standard package includes 7 ft of copper pipe, wire and drain pipe, bracket, vacuum pump commissioning and a 1-month workmanship warranty.",
    ms: "Ini sebut harga anggaran profesional untuk pemasangan aircond {units} × {hp} HP {type}, berdasarkan harga diterbitkan kami. Pakej standard termasuk 7 kaki paip tembaga, wayar dan paip saliran, pendakap, commissioning pam vakum dan waranti mutu kerja 1 bulan.",
    zh: "这是{units}台{hp}匹{type}冷气安装的专业预估报价，基于我们已公布的定价。标准配套包含7英尺铜管、电线和排水管、支架、真空泵调试和1个月工艺保修。",
  },
  quoteNote: {
    en: "Extras like longer pipe runs, PVC casing, switch or water pump are added per the published material rates. Final price is confirmed before work begins.",
    ms: "Tambahan seperti paip lebih panjang, casing PVC, suis atau pam air dikenakan mengikut kadar bahan yang diterbitkan. Harga akhir disahkan sebelum kerja bermula.",
    zh: "较长的管道、PVC线槽、开关或水泵等附加项目按已公布的材料费率计费。最终价格在动工前确认。",
  },
  quoteRefine: {
    en: "Refine or book",
    ms: "Perhalusi atau tempah",
    zh: "细化或预约",
  },
  quoteCalcLink: {
    en: "Installation Cost Calculator — add pipe runs & add-ons",
    ms: "Kalkulator Kos Pemasangan — tambah paip & item tambahan",
    zh: "安装费用计算器 — 添加管道长度与附加项",
  },
  quoteBookLink: {
    en: "Book installation",
    ms: "Tempah pemasangan",
    zh: "预约安装",
  },
  quotePriceLink: {
    en: "Installation price guide",
    ms: "Panduan harga pemasangan",
    zh: "安装价格指南",
  },
  gasRecoText: {
    en: "Here's how to choose your refrigerant: 1) R22 — used in units made before ~2015; older systems. RM 2.50/PSI. 2) R410A — the standard for most 2015–2021 units. RM 3.00/PSI. 3) R32 — used in newer inverter models (2021+); more efficient and lower charge volume. RM 3.00/PSI. The gas type is printed on the sticker on your outdoor unit — never mix refrigerants. If you're unsure, our technician identifies the gas type during inspection and confirms the price before refilling. ⚠️ The final gas quantity and charges are confirmed after on-site inspection.",
    ms: "Begini cara memilih penyejuk anda: 1) R22 — digunakan pada unit sebelum ~2015; sistem lama. RM 2.50/PSI. 2) R410A — standard untuk kebanyakan unit 2015–2021. RM 3.00/PSI. 3) R32 — digunakan pada model inverter baharu (2021+); lebih cekap dan volum cas lebih rendah. RM 3.00/PSI. Jenis gas dicetak pada pelekat unit luar anda — jangan sesekali campurkan penyejuk. Jika tidak pasti, juruteknik kami mengenal pasti jenis gas semasa pemeriksaan dan mengesahkan harga sebelum mengisi. ⚠️ Kuantiti dan caj gas akhir disahkan selepas pemeriksaan di tapak.",
    zh: "如何选择冷媒：1）R22 — 用于约2015年前生产的旧机型；每PSI RM 2.50。2）R410A — 2015–2021年多数机型的标准；每PSI RM 3.00。3）R32 — 用于新型变频机型（2021年后）；效率更高、充注量更少；每PSI RM 3.00。气体类型印在室外机的标签上 — 切勿混用冷媒。如果不确定，技术员会在检查时识别气体类型并在加气前确认价格。⚠️ 最终加气量和费用由技术员现场检查后确认。",
  },
  gasRatesTitle: {
    en: "Gas Rates (published)",
    ms: "Kadar Gas (diterbitkan)",
    zh: "气体费率（已公布）",
  },
  gasLeakNote: {
    en: "Every top-up includes a leak check — refrigerant never 'runs out', so if it's low, it leaked.",
    ms: "Setiap tambah gas termasuk semakan kebocoran — gas penyejuk tidak pernah 'habis', jadi jika rendah, ia bocor.",
    zh: "每次加气都附带检漏 — 冷媒不会\"用完\"，如果不足就是泄漏了。",
  },
  symptomIntro: {
    en: "Sounds like you're dealing with: {title}. Here's what I recommend and why:",
    ms: "Nampaknya anda menghadapi: {title}. Ini cadangan saya dan sebabnya:",
    zh: "听起来您遇到的问题是：{title}。以下是我的建议及理由：",
  },
  recoServiceTitle: {
    en: "Recommended service",
    ms: "Servis Disyorkan",
    zh: "推荐服务",
  },
  immediateSteps: {
    en: "Immediate steps",
    ms: "Langkah Segera",
    zh: "即时措施",
  },
  fallback: {
    en: "I want to make sure you get the right answer, and I never guess prices or information. Could you rephrase, or try one of these common questions? You can also WhatsApp +60182983573 — a real KL Renovator technician will reply with a confirmed price.",
    ms: "Saya mahu pastikan anda mendapat jawapan yang betul, dan saya tidak pernah meneka harga atau maklumat. Bolehkah anda nyatakan semula, atau cuba salah satu soalan biasa ini? Anda juga boleh WhatsApp +60182983573 — juruteknik KL Renovator sebenar akan membalas dengan harga disahkan.",
    zh: "我希望确保您得到正确的答案，我从不猜测价格或信息。请换个说法，或尝试以下常见问题？您也可以WhatsApp +60182983573 — 真正的KL Renovator技术员会回复确认价格。",
  },
  welcome: {
    en: "Hi! 👋 I'm the KL Renovator Aircond Expert Assistant — trained on our real 2026 service information and pricing. Ask me about installation costs, gas top-up prices, the right HP for your room, which service you need, or how to book. What can I help you with?",
    ms: "Helo! 👋 Saya Pembantu Pakar Aircond KL Renovator — dilatih dengan maklumat dan harga servis 2026 sebenar kami. Tanya saya tentang kos pemasangan, harga tambah gas, HP yang betul untuk bilik anda, servis yang anda perlukan, atau cara tempah. Apa yang boleh saya bantu?",
    zh: "您好！👋 我是KL Renovator冷气专家助手 — 基于我们真实的2026年服务信息和定价训练。可以问我安装费用、加气价格、适合您房间的匹数、需要哪种服务，或如何预约。有什么可以帮您？",
  },
  copperTitle: {
    en: "Copper Pipe Rates (published)",
    ms: "Kadar Paip Tembaga (diterbitkan)",
    zh: "铜管费率（已公布）",
  },
  copperText: {
    en: "Copper pipe is charged per foot beyond the free 7 ft included with installation. The published rates are:",
    ms: "Paip tembaga dicaj sekaki melebihi 7 kaki percuma yang disertakan dengan pemasangan. Kadar diterbitkan ialah:",
    zh: "铜管按超出安装所含免费7英尺的部分每英尺收费。已公布费率如下：",
  },
  copperFree: {
    en: "First 7 ft free with every installation.",
    ms: "7 kaki pertama percuma dengan setiap pemasangan.",
    zh: "每次安装前7英尺免费。",
  },
  wireTitle: {
    en: "Electrical Wire Rates (published)",
    ms: "Kadar Wayar Elektrik (diterbitkan)",
    zh: "电线费率（已公布）",
  },
  wireText: {
    en: "Electrical wire is charged per foot beyond the free 7 ft. Published rates:",
    ms: "Wayar elektrik dicaj sekaki melebihi 7 kaki percuma. Kadar diterbitkan:",
    zh: "电线按超出免费7英尺的部分每英尺收费。已公布费率：",
  },
  drainText: {
    en: "Drain pipe is included free for the first 7 ft with installation. Beyond that, the standard rate is approximately RM 5/ft — this is an estimate and is confirmed by the technician on-site. If you are asking about drain cleaning, a chemical wash (from RM 120) includes a full drain-line flush.",
    ms: "Paip saliran disertakan percuma untuk 7 kaki pertama dengan pemasangan. Selepas itu, kadar standard kira-kira RM 5/kaki — ini anggaran dan disahkan oleh juruteknik di tapak. Jika anda bertanya tentang pembersihan saliran, cuci kimia (dari RM 120) termasuk pembersihan penuh paip saliran.",
    zh: "安装包含前7英尺排水管免费。超出部分的标准费率约为每英尺RM 5 — 这是估算，由技术员现场确认。如果您问的是排水清洗，化学清洗（从RM 120起）包含完整的排水管冲洗。",
  },
  pvcTitle: {
    en: "PVC Casing Rates (published)",
    ms: "Kadar Casing PVC (diterbitkan)",
    zh: "PVC线槽费率（已公布）",
  },
  pvcText: {
    en: "PVC casing for concealing wire and copper pipe runs is published at:",
    ms: "Casing PVC untuk menyembunyikan wayar dan paip tembaga diterbitkan pada:",
    zh: "用于隐藏电线和铜管的PVC线槽已公布费率如下：",
  },
  pvcNote: {
    en: "Charged per foot of casing installed.",
    ms: "Dicaj sekaki casing dipasang.",
    zh: "按安装线槽的每英尺计费。",
  },
  bracketTitle: {
    en: "Bracket Prices (published)",
    ms: "Harga Pendakap (diterbitkan)",
    zh: "支架价格（已公布）",
  },
  bracketText: {
    en: "Outdoor and indoor brackets are published as:",
    ms: "Pendakap luar dan dalam diterbitkan sebagai:",
    zh: "室外和室内支架的已公布价格如下：",
  },
  bracketNote: {
    en: "Standard brackets are included with most installation packages — check your quote.",
    ms: "Pendakap standard disertakan dengan kebanyakan pakej pemasangan — semak sebut harga anda.",
    zh: "标准支架包含在多数安装配套中 — 请查看您的报价。",
  },
  switchTitle: {
    en: "Electrical (published)",
    ms: "Elektrik (diterbitkan)",
    zh: "电气（已公布）",
  },
  switchText: {
    en: "An aircond switch / plug point installation is published at:",
    ms: "Pemasangan suis / plug point aircond diterbitkan pada:",
    zh: "冷气开关/插座安装的已公布价格如下：",
  },
  pumpText: {
    en: "A condensate drain/water pump is usually included with ceiling cassette installations. For concealed wall-mounted installs it is an add-on; the published repair-table range for a drain pump is RM 350–550 (supply + installation). The exact model and price are confirmed on-site.",
    ms: "Pam saliran/pam air kondensat biasanya disertakan dengan pemasangan ceiling cassette. Untuk pemasangan dinding tersembunyi ia item tambahan; julat jadual pembaikan yang diterbitkan untuk pam saliran ialah RM 350–550 (bekalan + pemasangan). Model dan harga tepat disahkan di tapak.",
    zh: "冷凝排水泵/水泵通常包含在天花板卡式安装中。挂壁式隐藏安装则为附加项目；已公布维修表中排水泵的范围为RM 350–550（含供应+安装）。确切型号和价格现场确认。",
  },
  gasPriceText: {
    en: "Here are the published gas rates, plus an estimate for {hp} HP {gas}: roughly {psi} PSI needed ≈ {total} per unit.",
    ms: "Ini kadar gas yang diterbitkan, serta anggaran untuk {hp} HP {gas}: lebih kurang {psi} PSI diperlukan ≈ {total} setiap unit.",
    zh: "这是已公布的气体费率，以及{hp}匹{gas}的估算：大约需要{psi} PSI ≈ 每台{total}。",
  },
  gasRateCardTitle: {
    en: "Gas Top-Up Rates (published)",
    ms: "Kadar Tambah Gas (diterbitkan)",
    zh: "加气费率（已公布）",
  },
  gasRateCardNote: {
    en: "Gas is charged per actual PSI measured during inspection — the estimate assumes a typical medium shortfall for the selected HP. Final quantity and charges are confirmed by the technician after on-site inspection.",
    ms: "Gas dicaj mengikut PSI sebenar yang diukur semasa pemeriksaan — anggaran mengandaikan kekurangan sederhana biasa untuk HP dipilih. Kuantiti dan caj akhir disahkan oleh juruteknik selepas pemeriksaan di tapak.",
    zh: "气体按检查时实测的实际PSI收费 — 估算假设所选匹数存在典型的中度缺口。最终加气量和费用由技术员现场检查后确认。",
  },
  recoGasService: {
    en: "Recommended service",
    ms: "Servis Disyorkan",
    zh: "推荐服务",
  },
  gasServiceWhy: {
    en: "Precision manifold gauge measurement balances the system to the manufacturer's spec, with a full physical leak inspection included.",
    ms: "Pengukuran tolok manifold tepat mengimbangkan sistem kepada spesifikasi pengilang, dengan pemeriksaan fizikal kebocoran penuh disertakan.",
    zh: "精密压力表测量使系统达到制造商规格平衡，并包含完整的物理检漏。",
  },
  priceSummaryText: {
    en: "Here is KL Renovator's published 2026 price summary. Every price is confirmed before work begins — no hidden charges:",
    ms: "Ini ringkasan harga 2026 yang diterbitkan oleh KL Renovator. Setiap harga disahkan sebelum kerja bermula — tiada caj tersembunyi:",
    zh: "以下是KL Renovator已公布的2026年价格摘要。每项价格在动工前确认 — 无隐藏费用：",
  },
  priceSummaryTitle: {
    en: "Aircond Service Prices (published 2026)",
    ms: "Harga Servis Aircond (diterbitkan 2026)",
    zh: "冷气服务价格（2026已公布）",
  },
  priceSummaryNote: {
    en: "Full tables on the price page. Multi-unit: 4–10 units 5% OFF, 10+ units 10% OFF.",
    ms: "Jadual penuh pada halaman harga. Berbilang unit: 4–10 unit 5% OFF, 10+ unit 10% OFF.",
    zh: "完整价格表请查看价格页面。多台：4–10台享5%折扣，10台以上享10%折扣。",
  },
  fullPriceLists: {
    en: "Full published price lists",
    ms: "Senarai harga penuh diterbitkan",
    zh: "完整已公布价目表",
  },
  pricePageLink: {
    en: "Aircond Service Price 2026 — Malaysia",
    ms: "Harga Servis Aircond 2026 — Malaysia",
    zh: "2026年冷气服务价格 — 马来西亚",
  },
  installGuideLink: {
    en: "Installation Price Guide",
    ms: "Panduan Harga Pemasangan",
    zh: "安装价格指南",
  },
  useCalcLink: {
    en: "Use the Installation Cost Calculator",
    ms: "Gunakan Kalkulator Kos Pemasangan",
    zh: "使用安装费用计算器",
  },
  materialEstimateTitle: {
    en: "Material Estimate",
    ms: "Anggaran Bahan",
    zh: "材料估算",
  },
  materialEstimateText: {
    en: "Here is your material estimate for a {len} ft run ({hp} HP, {units} unit{s}). The first {free} ft of pipe, wire and drain is free with installation, so only {extra} ft is chargeable per unit:",
    ms: "Ini anggaran bahan anda untuk {len} kaki ({hp} HP, {units} unit). {free} kaki pertama paip, wayar dan saliran percuma dengan pemasangan, jadi hanya {extra} kaki dicaj setiap unit:",
    zh: "这是{len}英尺管线的材料估算（{hp}匹，{units}台）。安装包含前{free}英尺管道、电线和排水管免费，因此每台仅{extra}英尺计费：",
  },
  materialEstimateNote: {
    en: "Published rates for copper and wire; drain pipe at the standard estimate rate. Final pricing confirmed on-site.",
    ms: "Kadar diterbitkan untuk tembaga dan wayar; paip saliran pada kadar anggaran standard. Harga akhir disahkan di tapak.",
    zh: "铜管和电线按已公布费率；排水管按标准估算费率。最终价格现场确认。",
  },
  fullBreakdown: {
    en: "Full breakdown",
    ms: "Pecahan penuh",
    zh: "完整明细",
  },
  nextSteps: {
    en: "Next steps",
    ms: "Langkah seterusnya",
    zh: "下一步",
  },
  btuCalcLink: {
    en: "BTU / HP Calculator",
    ms: "Kalkulator BTU / HP",
    zh: "BTU/匹数计算器",
  },
  installCostLink: {
    en: "Installation cost calculator",
    ms: "Kalkulator kos pemasangan",
    zh: "安装费用计算器",
  },
  usefulLinks: {
    en: "Useful links",
    ms: "Pautan berguna",
    zh: "相关链接",
  },
  moreInfo: {
    en: "More information",
    ms: "Maklumat lanjut",
    zh: "更多信息",
  },
  servicePageLink: {
    en: "service page",
    ms: "halaman servis",
    zh: "服务页面",
  },
  priceListLink: {
    en: "Full 2026 price list",
    ms: "Senarai harga 2026 penuh",
    zh: "2026年完整价目表",
  },
  installFromText: {
    en: "Installation starts from RM 199 for 1.0–1.5 HP wall-mounted, including 7 ft of copper pipe, wire and drain pipe, bracket, vacuum pump commissioning and a 1-month workmanship warranty. Here is the full published table:",
    ms: "Pemasangan bermula dari RM 199 untuk 1.0–1.5 HP dinding, termasuk 7 kaki paip tembaga, wayar dan paip saliran, pendakap, commissioning pam vakum dan waranti mutu kerja 1 bulan. Ini jadual penuh yang diterbitkan:",
    zh: "1.0–1.5匹挂壁式安装从RM 199起，包含7英尺铜管、电线和排水管、支架、真空泵调试和1个月工艺保修。以下是完整已公布价格表：",
  },
  serviceStartText: {
    en: "{title} starts from {price}. Here is the full published price table:",
    ms: "{title} bermula dari {price}. Ini jadual harga penuh yang diterbitkan:",
    zh: "{title}从{price}起。以下是完整已公布价格表：",
  },
  publishedPricesTitle: {
    en: "Published Prices",
    ms: "Harga Diterbitkan",
    zh: "已公布价格",
  },
} as const;

// ── Curated knowledge base (all facts from the live website) ──────────────

const KNOWLEDGE: { keywords: RegExp; answer: { en: string; ms: string; zh: string }; links?: { label: string; href: string }[] }[] = [
  {
    keywords: /warranty|waranti|guarantee|保证|保修/,
    answer: {
      en: "Every KL Renovator visit comes with a 1-month written workmanship warranty. If any issue related to our work arises within 30 days — leaks, vibration, electrical fault, poor cooling after installation — we return and rectify it at zero cost. Manufacturer warranty on the unit itself remains fully protected. All our work is SSM-registered (003765188-T) and invoiced.",
      ms: "Setiap lawatan KL Renovator disertakan waranti mutu kerja bertulis 1 bulan. Jika sebarang isu berkaitan kerja kami timbul dalam 30 hari — bocor, getaran, kerosakan elektrik, penyejukan lemah selepas pemasangan — kami kembali dan membetulkannya tanpa kos. Waranti pengilang pada unit itu sendiri kekal dilindungi sepenuhnya. Semua kerja kami berdaftar SSM (003765188-T) dan berinvois.",
      zh: "KL Renovator每次上门服务都提供1个月书面工艺保修。如果在30天内出现与我们工作相关的问题 — 漏水、震动、电气故障、安装后制冷不佳 — 我们免费上门修复。机器本身的制造商保修完全不受影响。我们所有工作均经SSM注册（003765188-T）并开具发票。",
    },
  },
  {
    keywords: /what time|operating hour|open (at|from)|opening hour|business hour|working hour|\bbuka\b|waktu|几点|营业时间/,
    answer: {
      en: `KL Renovator operates every day, Monday to Sunday, from 9:00 AM to 6:00 PM (${sitePublic.hours}). Most emergency calls for leaks or breakdowns are assigned a technician within 30–60 minutes. WhatsApp ${sitePublic.phoneDisplay} for the fastest response.`,
      ms: `KL Renovator beroperasi setiap hari, Isnin hingga Ahad, dari 9:00 pagi hingga 6:00 petang (${sitePublic.hours}). Kebanyakan panggilan kecemasan untuk bocor atau rosak ditugaskan juruteknik dalam 30–60 minit. WhatsApp ${sitePublic.phoneDisplay} untuk respons terpantas.`,
      zh: `KL Renovator每天营业，周一至周日上午9点至下午6点（${sitePublic.hours}）。多数漏水或故障的紧急来电会在30–60分钟内安排技术员。WhatsApp ${sitePublic.phoneDisplay}获取最快响应。`,
    },
  },
  {
    keywords: /same.?day|hari sama|当天|today( service)?/,
    answer: {
      en: "Yes — same-day service is available across KL & Selangor for bookings made early in the day (installation before ~11 AM for same-day completion). We keep same-day slots for emergencies like water leaks and breakdowns. WhatsApp +60182983573 with your location and the problem for the fastest routing.",
      ms: "Ya — servis hari sama tersedia di seluruh KL & Selangor untuk tempahan awal hari (pemasangan sebelum ~11 pagi untuk siap hari sama). Kami menyimpan slot hari sama untuk kecemasan seperti bocor air dan kerosakan. WhatsApp +60182983573 dengan lokasi dan masalah anda untuk penghalaan terpantas.",
      zh: "可以 — 吉隆坡和雪兰莪提供当天服务，当天早些时候预约即可（上午11点前预约安装可当天完成）。我们为漏水、故障等紧急情况预留当天时段。WhatsApp +60182983573告知地点和问题，可最快安排。",
    },
  },
  {
    keywords: /cover|service area|coverage|kawasan|area|where (do|are)|location|地区|覆盖/,
    answer: {
      en: `KL Renovator serves the whole Klang Valley — Kuala Lumpur and Selangor only. That includes ${sitePublic.areas.slice(0, 18).join(", ")}, and more than 40 main areas plus 150+ named neighbourhoods. If you tell me your area, I can confirm coverage. We do not serve other Malaysian states.`,
      ms: `KL Renovator meliputi seluruh Lembah Klang — Kuala Lumpur dan Selangor sahaja. Termasuk ${sitePublic.areas.slice(0, 18).join(", ")}, serta lebih 40 kawasan utama dan 150+ kawasan kejiranan bernama. Jika anda beritahu kawasan anda, saya boleh sahkan liputan. Kami tidak berkhidmat di negeri Malaysia lain.`,
      zh: `KL Renovator服务整个巴生谷 — 仅限吉隆坡和雪兰莪。包括${sitePublic.areas.slice(0, 18).join("、")}等40多个主要地区以及150多个具名社区。告诉我您的地区，我可以确认是否覆盖。我们不服务其他州属。`,
    },
  },
  {
    keywords: /brand|jenama|牌子|品牌/,
    answer: {
      en: `KL Renovator services and installs all 20 major brands: ${sitePublic.brandsSupported.join(", ")}. Inverter and non-inverter, wall-mounted, ceiling cassette and window units. We are an independent HVAC service company — not an authorized dealer — which means we work on every brand equally.`,
      ms: `KL Renovator menservis dan memasang semua 20 jenama utama: ${sitePublic.brandsSupported.join(", ")}. Inverter dan bukan inverter, dinding, ceiling cassette dan tingkap. Kami syarikat servis HVAC bebas — bukan peniaga sah — yang bermakna kami bekerja pada setiap jenama secara sama rata.`,
      zh: `KL Renovator可维修和安装全部20个主要品牌：${sitePublic.brandsSupported.join("、")}。变频和非变频、挂壁式、天花板卡式和窗式均可。我们是独立的HVAC服务公司 — 非授权经销商 — 对每个品牌一视同仁。`,
    },
  },
  {
    keywords: /diagnostic fee|diagnostic|检查费|rm ?88|diagnosis/,
    answer: {
      en: "The diagnostic / troubleshooting fee is RM 88 and it is WAIVED if we repair the unit in the same visit. It covers a full system check — gauges, capacitors, sensors, PCB error codes — and you receive a transparent quote before any repair starts.",
      ms: "Yuran diagnostik / penyelesaian masalah ialah RM 88 dan ia DITAWARKAN jika kami membaiki unit dalam lawatan yang sama. Ia merangkumi pemeriksaan penuh sistem — tolok, kapasitor, sensor, kod ralat PCB — dan anda menerima sebut harga telus sebelum sebarang pembaikan bermula.",
      zh: "检测/故障排除费为RM 88，如果我们在同次上门时维修机器，该费用可免除。它涵盖全面系统检查 — 压力表、电容、传感器、电路板错误代码 — 任何维修开始前您都会收到透明报价。",
    },
  },
  {
    keywords: /payment|bayar|deposit|how (do i )?pay|payment method|付款|支付/,
    answer: {
      en: "Payment is straightforward: KL Renovator confirms the total price with you BEFORE any work begins, and you pay after the job is done and you are satisfied — cash or bank transfer (online banking). No deposit is required for standard servicing and repairs. Multi-unit commercial jobs may be quoted with agreed payment terms.",
      ms: "Bayaran mudah: KL Renovator mengesahkan jumlah harga dengan anda SEBELUM sebarang kerja bermula, dan anda membayar selepas kerja siap dan anda berpuas hati — tunai atau pindahan bank (perbankan dalam talian). Tiada deposit diperlukan untuk servis dan pembaikan standard. Kerja komersial berbilang unit mungkin dipetik dengan terma pembayaran yang dipersetujui.",
      zh: "付款简单明了：KL Renovator在任何工作开始前与您确认总价，工作完成且您满意后才付款 — 现金或银行转账（网上银行）。标准保养和维修无需押金。多台商用项目可按双方同意的付款条款报价。",
    },
  },
  {
    keywords: /emergency|kecemasan|紧急|urgent|breakdown/,
    answer: {
      en: "For emergencies — heavy water leak near electrical points, complete breakdown, MCB tripping, burning smell — switch off the unit at the MCB first. KL Renovator operates 9 AM–6 PM daily and typically assigns a technician within 30–60 minutes for urgent calls. WhatsApp +60182983573 with 'EMERGENCY' and your location, or call directly.",
      ms: "Untuk kecemasan — bocor air teruk berhampiran titik elektrik, kerosakan sepenuhnya, MCB jatuh, bau terbakar — matikan unit di MCB dahulu. KL Renovator beroperasi 9 pagi–6 petang setiap hari dan biasanya menugaskan juruteknik dalam 30–60 minit untuk panggilan segera. WhatsApp +60182983573 dengan 'KECEMASAN' dan lokasi anda, atau hubungi terus.",
      zh: "紧急情况 — 电源附近严重漏水、完全故障、跳闸、烧焦味 — 请先关闭MCB。KL Renovator每天上午9点至下午6点营业，紧急来电通常在30–60分钟内安排技术员。WhatsApp +60182983573并注明\"紧急\"和您的地点，或直接致电。",
    },
  },
  {
    keywords: /how (do i )?book|booking|book a|tempah|预约|reserve|slot|schedule/,
    answer: {
      en: "Booking with KL Renovator takes about 2 minutes: 1) Choose your service (installation, chemical wash, overhaul, gas top-up, repair, or maintenance contract). 2) Tell us the unit type, HP and quantity. 3) Pick a date and time — we confirm live availability. 4) We confirm the price upfront on WhatsApp or via the online booking form. You can book online at klrenovator.com/book, or WhatsApp +60182983573 with your service and location for same-day slots.",
      ms: "Tempahan dengan KL Renovator mengambil kira-kira 2 minit: 1) Pilih servis anda (pemasangan, cuci kimia, overhaul, tambah gas, pembaikan, atau kontrak penyelenggaraan). 2) Beritahu kami jenis unit, HP dan kuantiti. 3) Pilih tarikh dan masa — kami sahkan ketersediaan langsung. 4) Kami sahkan harga di awal melalui WhatsApp atau borang tempahan dalam talian. Anda boleh tempah dalam talian di klrenovator.com/book, atau WhatsApp +60182983573 dengan servis dan lokasi anda untuk slot hari sama.",
      zh: "预约KL Renovator服务只需约2分钟：1）选择服务（安装、化学清洗、大修、加气、维修或保养合约）。2）告知机型、匹数和数量。3）选择日期和时间 — 我们实时确认空档。4）通过WhatsApp或在线预约表预先确认价格。可在线预约klrenovator.com/book，或WhatsApp +60182983573告知服务和地点以获取当天时段。",
    },
    links: [
      { label: "Book a slot online", href: "/book" },
      { label: "All services & prices", href: "/services" },
    ],
  },
  {
    keywords: /installation (process|step|take|time|how long)|how long.*install|install.*how long|pemasangan.*lama|安装.*时间|安装.*多久/,
    answer: {
      en: "A standard wall-mounted installation takes 3–5 hours for one unit (includes mounting, 7 ft piping, vacuum pump commissioning and testing). Ceiling cassette takes 5–8 hours. Multi-unit whole-house installations usually complete in 1–2 days. Same-day installation is available for bookings made before 11 AM.",
      ms: "Pemasangan dinding standard mengambil 3–5 jam untuk satu unit (termasuk pemasangan, paip 7 kaki, commissioning pam vakum dan ujian). Ceiling cassette mengambil 5–8 jam. Pemasangan berbilang unit seluruh rumah biasanya siap dalam 1–2 hari. Pemasangan hari sama tersedia untuk tempahan sebelum 11 pagi.",
      zh: "标准挂壁式安装单台需3–5小时（含安装、7英尺管道、真空泵调试和测试）。天花板卡式需5–8小时。多台全屋安装通常1–2天完成。上午11点前预约可安排当天安装。",
    },
  },
  {
    keywords: /maintenance contract|amc|service contract|annual maintenance/,
    answer: {
      en: "KL Renovator's Maintenance Contract (AMC) gives you quarterly servicing, priority scheduling and free emergency checks — saving up to 30% vs one-off bookings. Residential: RM 499/year (2–4 units) or RM 999/year (5+ units). Commercial: RM 1,999/year (5–10 units) or RM 3,499/year (10+ units).",
      ms: "Kontrak Penyelenggaraan (AMC) KL Renovator memberi servis suku tahunan, penjadualan keutamaan dan pemeriksaan kecemasan percuma — jimat sehingga 30% berbanding tempahan sekali. Kediaman: RM 499/tahun (2–4 unit) atau RM 999/tahun (5+ unit). Komersial: RM 1,999/tahun (5–10 unit) atau RM 3,499/tahun (10+ unit).",
      zh: "KL Renovator的保养合约（AMC）提供季度保养、优先排期和免费紧急检查 — 比单次预约节省多达30%。住宅：每年RM 499（2–4台）或RM 999（5台以上）。商用：每年RM 1,999（5–10台）或RM 3,499（10台以上）。",
    },
  },
  {
    keywords: /high.?rise|condo|apartment|jmb|management approval/,
    answer: {
      en: "Yes — we regularly work in high-rise condos and apartments across KL & Selangor (KLCC, Mont Kiara, Bangsar, Sentul, PJ, Subang Jaya and more). We follow each building's access procedure, coordinate with management for lifts/loading bay, and confirm outdoor-unit placement per JMB rules. High-rise or difficult access carries a published surcharge of RM 50–150, confirmed before work.",
      ms: "Ya — kami kerap bekerja di kondominium dan apartmen bertingkat di seluruh KL & Selangor (KLCC, Mont Kiara, Bangsar, Sentul, PJ, Subang Jaya dan lain-lain). Kami mengikuti prosedur akses setiap bangunan, berkoordinasi dengan pengurusan untuk lif/kawasan muatan, dan mengesahkan penempatan unit luar mengikut peraturan JMB. Akses bertingkat atau sukar dikenakan surcaj diterbitkan RM 50–150, disahkan sebelum kerja.",
      zh: "可以 — 我们经常在吉隆坡和雪兰莪的高层公寓工作（KLCC、Mont Kiara、Bangsar、Sentul、八打灵再也、梳邦再也等）。我们遵守每栋大楼的进出程序，与管理处协调电梯/装卸区，并按JMB规定确认室外机位置。高层或通行困难地区有已公布的RM 50–150附加费，动工前确认。",
    },
  },
  {
    keywords: /old unit|replace.*unit|compressor replace|换新|old aircond|unit too old|replace my aircond/,
    answer: {
      en: "For units 10+ years old, weigh repair vs replacement: capacitor, sensor, drain and contactor faults are worth repairing (RM 50–300). Fan motor and PCB faults (RM 250–600) depend on the unit's age and value. Compressor failure (RM 800–2,000) is usually only worth it for 2.0 HP+ units — for 1.0–1.5 HP units, a new unit often makes more sense. We always give you both options with transparent quotes and let you decide.",
      ms: "Untuk unit 10+ tahun, pertimbangkan baiki vs ganti: kerosakan kapasitor, sensor, saliran dan kontaktor berbaloi dibaiki (RM 50–300). Kerosakan motor kipas dan PCB (RM 250–600) bergantung pada usia dan nilai unit. Kegagalan kompressor (RM 800–2,000) biasanya hanya berbaloi untuk unit 2.0 HP+ — untuk unit 1.0–1.5 HP, unit baharu selalunya lebih masuk akal. Kami sentiasa memberi kedua-dua pilihan dengan sebut harga telus dan biar anda memutuskan.",
      zh: "对于10年以上的机器，权衡维修与更换：电容、传感器、排水和接触器故障值得维修（RM 50–300）。风扇电机和电路板故障（RM 250–600）取决于机器年龄和价值。压缩机故障（RM 800–2,000）通常只有2.0匹以上机器才值得修 — 1.0–1.5匹机器换新往往更划算。我们总是提供两个选项和透明报价，由您决定。",
    },
  },
];

// ── Troubleshooting map (mirrors the site's problem pages) ────────────────

const TROUBLESHOOTING: {
  keywords: RegExp;
  title: { en: string; ms: string; zh: string };
  steps: { en: string[]; ms: string[]; zh: string[] };
  service: string;
  price: { en: string; ms: string; zh: string };
  why: { en: string; ms: string; zh: string };
  href: string;
}[] = [
  {
    keywords: /not cool|not cold|warm air|tidak sejuk|不冷|吹热风|not cooling|less cool/,
    title: { en: "Not Cooling / Warm Air", ms: "Tidak Sejuk / Udara Panas", zh: "不制冷/吹热风" },
    steps: {
      en: [
        "Check the filter — a clogged filter can cut cooling by up to 40%. Clean it and see if airflow improves.",
        "Check the outdoor unit — is the fan spinning? If it runs but air is warm, it is usually low refrigerant gas or a failing capacitor.",
        "If cooling has dropped gradually over weeks, the refrigerant is likely low — refrigerant never 'runs out', it leaks.",
      ],
      ms: [
        "Semak penapis — penapis tersumbat boleh mengurangkan penyejukan sehingga 40%. Cuci dan lihat sama ada aliran udara bertambah baik.",
        "Semak unit luar — adakah kipas berpusing? Jika berjalan tetapi udara panas, selalunya gas penyejuk rendah atau kapasitor gagal.",
        "Jika penyejukan menurun beransur selama beberapa minggu, gas penyejuk mungkin rendah — gas tidak pernah 'habis', ia bocor.",
      ],
      zh: [
        "检查滤网 — 堵塞的滤网可使制冷下降多达40%。清洗后看风量是否改善。",
        "检查室外机 — 风扇在转吗？如果运转但吹热风，通常是冷媒不足或电容故障。",
        "如果制冷在数周内逐渐变差，冷媒很可能不足 — 冷媒不会\"用完\"，而是泄漏。",
      ],
    },
    service: "Gas Top-Up / Diagnostic + Repair",
    price: { en: "From RM 2.50/PSI · Diagnostic RM 88 (waived with repair)", ms: "Dari RM 2.50/PSI · Diagnostik RM 88 (dikecualikan dengan pembaikan)", zh: "每PSI RM 2.50起 · 检测费RM 88（同次维修可免）" },
    why: {
      en: "Gradual cooling loss = low gas (leak check included with every top-up). Sudden warm air with the outdoor unit running = capacitor or gas. Sudden warm air with the outdoor unit off = compressor/PCB fault.",
      ms: "Kehilangan penyejukan beransur = gas rendah (semakan kebocoran disertakan dengan setiap tambah gas). Udara panas tiba-tiba dengan unit luar berjalan = kapasitor atau gas. Udara panas tiba-tiba dengan unit luar mati = kerosakan kompressor/PCB.",
      zh: "制冷逐渐变差 = 气体不足（每次加气附带检漏）。室外机运转但突然吹热风 = 电容或气体问题。室外机不转且吹热风 = 压缩机/电路板故障。",
    },
    href: "/problems/aircond-not-cold",
  },
  {
    keywords: /leak|bocor|漏水|滴水|dripping|water (leaking|drip)/,
    title: { en: "Water Leakage", ms: "Bocor Air", zh: "漏水" },
    steps: {
      en: [
        "A small occasional drip is usually a partially blocked drain pipe — a chemical wash with drain flush clears it.",
        "Continuous heavy leaking means the drain pipe is fully blocked or the drain pan is overflowing — switch off the unit.",
        "If water is near electrical points or damaging the ceiling, switch off the MCB now and call for emergency service.",
      ],
      ms: [
        "Titisan kecil sekali-sekala biasanya paip saliran tersumbat sebahagian — cuci kimia dengan pembersihan saliran menyelesaikannya.",
        "Bocor teruk berterusan bermakna paip saliran tersumbat sepenuhnya atau dulang saliran melimpah — matikan unit.",
        "Jika air berhampiran titik elektrik atau merosakkan siling, matikan MCB sekarang dan panggil servis kecemasan.",
      ],
      zh: [
        "偶尔的小滴水通常是排水管部分堵塞 — 带排水冲洗的化学清洗即可解决。",
        "持续大量漏水意味着排水管完全堵塞或接水盘溢出 — 请关闭机器。",
        "如果水靠近电源或损坏天花板，请立即关闭MCB并致电紧急服务。",
      ],
    },
    service: "Chemical Wash / Chemical Overhaul",
    price: { en: "From RM 120 (wash) · RM 220 (overhaul)", ms: "Dari RM 120 (cuci) · RM 220 (overhaul)", zh: "从RM 120起（清洗）· RM 220（大修）" },
    why: {
      en: "Leaks come from blocked drains and dirty drain pans. A wash flushes the line; an overhaul dismantles and permanently clears the drain system — recommended for heavy leaks and ice buildup.",
      ms: "Bocor datang dari saliran tersumbat dan dulang saliran kotor. Cuci membilas saluran; overhaul membongkar dan membersihkan sistem saliran secara kekal — disyorkan untuk bocor teruk dan pembentukan ais.",
      zh: "漏水源于排水管堵塞和接水盘脏污。清洗可冲洗管路；大修可拆解并彻底清除排水系统 — 推荐用于严重漏水和结冰情况。",
    },
    href: "/problems/aircond-water-leaking",
  },
  {
    keywords: /smell|bau|smelly|musty|odor|odour|异味|臭味|发臭/,
    title: { en: "Bad Smell / Mouldy Odour", ms: "Bau Busuk / Bau Hapak", zh: "异味/霉味" },
    steps: {
      en: [
        "A musty smell means mould and bacteria on the evaporator coil and blower wheel — extremely common in KL's humidity.",
        "If the smell appears only when the unit first starts, a chemical wash will usually fix it completely.",
        "If the smell persists after washing, the unit needs an overhaul to access the deep drain pan and back tray.",
      ],
      ms: [
        "Bau hapak bermakna kulat dan bakteria pada gegelung evaporator dan roda blower — sangat biasa dalam kelembapan KL.",
        "Jika bau hanya muncul apabila unit mula berjalan, cuci kimia biasanya menyelesaikannya sepenuhnya.",
        "Jika bau berterusan selepas cuci, unit perlukan overhaul untuk mencapai dulang saliran dalam dan dulang belakang.",
      ],
      zh: [
        "霉味意味着蒸发器盘管和风轮上有霉菌和细菌 — 在吉隆坡潮湿气候中极为常见。",
        "如果异味仅在机器启动时出现，化学清洗通常能彻底解决。",
        "如果清洗后异味仍在，需要大修才能清洁深处接水盘和后托盘。",
      ],
    },
    service: "Pressure Chemical Wash",
    price: { en: "From RM 120 (1.0–1.5 HP wall-mounted)", ms: "Dari RM 120 (1.0–1.5 HP dinding)", zh: "从RM 120起（1.0–1.5匹挂壁式）" },
    why: {
      en: "The 80–120 PSI alkaline chemical dissolves the biofilm causing the smell and sanitizes the coil — recommended every 12 months (6–8 months for units running 8+ hours a day).",
      ms: "Bahan kimia alkali 80–120 PSI melarutkan biofilem yang menyebabkan bau dan mensanitasi gegelung — disyorkan setiap 12 bulan (6–8 bulan untuk unit berjalan 8+ jam sehari).",
      zh: "80–120 PSI碱性化学剂可溶解产生异味的生物膜并消毒盘管 — 建议每12个月一次（每天运行8小时以上的机器每6–8个月一次）。",
    },
    href: "/problems/aircond-bad-smell",
  },
  {
    keywords: /noise|bising|noisy|loud|吵|噪音|bunyi/,
    title: { en: "Noise from the Aircond", ms: "Bunyi dari Aircond", zh: "冷气噪音" },
    steps: {
      en: [
        "Rattling or vibration is usually a loose fan blade, dirty blower wheel or loose panel screw — a chemical wash lets the technician check and tighten everything.",
        "A loud humming or buzzing from the outdoor unit often points to a failing capacitor, contactor or compressor.",
        "A hissing sound can indicate a refrigerant leak — book a gas check with leak inspection.",
      ],
      ms: [
        "Bunyi gemeretak atau getaran biasanya bilah kipas longgar, roda blower kotor atau skru panel longgar — cuci kimia membolehkan juruteknik memeriksa dan mengetatkan semua.",
        "Dengungan kuat dari unit luar selalunya menunjukkan kapasitor, kontaktor atau kompressor gagal.",
        "Bunyi desisan boleh menunjukkan kebocoran penyejuk — tempah semakan gas dengan pemeriksaan kebocoran.",
      ],
      zh: [
        "嘎嘎声或震动通常是风扇叶片松动、风轮脏或面板螺丝松动 — 化学清洗时技术员会检查并拧紧所有部件。",
        "室外机发出响亮嗡嗡声通常意味着电容、接触器或压缩机故障。",
        "嘶嘶声可能表示冷媒泄漏 — 预约带检漏的气体检查。",
      ],
    },
    service: "Chemical Wash / Troubleshooting & Repair",
    price: { en: "From RM 120 (wash) · Diagnostic RM 88 (waived with repair)", ms: "Dari RM 120 (cuci) · Diagnostik RM 88 (dikecualikan dengan pembaikan)", zh: "从RM 120起（清洗）· 检测费RM 88（同次维修可免）" },
    why: {
      en: "Most indoor noise is fixed by cleaning + tightening during a wash. Outdoor or electrical noise needs a diagnostic to identify the failing component and quote before repair.",
      ms: "Kebanyakan bunyi dalaman diselesaikan dengan cucian + pengetatan semasa cuci. Bunyi luar atau elektrik perlukan diagnostik untuk mengenal pasti komponen gagal dan sebut harga sebelum pembaikan.",
      zh: "多数室内噪音可通过清洗+紧固解决。室外或电气噪音需要检测以确定故障部件，并在维修前报价。",
    },
    href: "/problems/aircond-making-noise",
  },
  {
    keywords: /\bice\b|\bais\b|结冰|freezing|frost/,
    title: { en: "Ice Formation", ms: "Pembentukan Ais", zh: "结冰" },
    steps: {
      en: [
        "Switch off the unit and let it defrost for about 2 hours.",
        "Ice on the coil is caused by low refrigerant gas, a severely blocked evaporator coil, or both — the unit will eventually stop cooling completely.",
        "Book a gas check + chemical overhaul so both causes are fixed in one visit.",
      ],
      ms: [
        "Matikan unit dan biarkan ia nyahbeku selama kira-kira 2 jam.",
        "Ais pada gegelung disebabkan gas penyejuk rendah, gegelung evaporator tersumbat teruk, atau kedua-duanya — unit akhirnya akan berhenti menyejuk sepenuhnya.",
        "Tempah semakan gas + overhaul kimia supaya kedua-dua punca diselesaikan dalam satu lawatan.",
      ],
      zh: [
        "关闭机器，让其自然化冻约2小时。",
        "盘管结冰由冷媒不足、蒸发器盘管严重堵塞或两者共同导致 — 机器最终会完全停止制冷。",
        "预约气体检查+化学大修，一次上门解决两个原因。",
      ],
    },
    service: "Chemical Overhaul + Gas Check",
    price: { en: "From RM 220 (overhaul) · Gas RM 2.50–3.00/PSI", ms: "Dari RM 220 (overhaul) · Gas RM 2.50–3.00/PSI", zh: "从RM 220起（大修）· 气体每PSI RM 2.50–3.00" },
    why: {
      en: "Ice forms when the coil temperature drops too low — low gas or blocked airflow. The overhaul cleans the coil; the gas check restores the correct charge with a leak inspection.",
      ms: "Ais terbentuk apabila suhu gegelung turun terlalu rendah — gas rendah atau aliran udara tersekat. Overhaul membersihkan gegelung; semakan gas memulihkan cas betul dengan pemeriksaan kebocoran.",
      zh: "盘管温度过低时就会结冰 — 气体不足或气流受阻。大修清洁盘管；气体检查配合检漏恢复正确的充注量。",
    },
    href: "/problems/aircond-freezing-up",
  },
  {
    keywords: /airflow|air flow|weak.*air|aliran|风量|风力弱|not blowing|blower/,
    title: { en: "Weak Airflow", ms: "Aliran Udara Lemah", zh: "风量弱" },
    steps: {
      en: [
        "Check and clean the air filter first — a clogged filter is the #1 cause of weak airflow.",
        "If airflow is weak even with a clean filter, the blower wheel is coated with dust and biofilm, reducing volume.",
        "A pressure chemical wash restores the blower wheel and coil to near-new airflow.",
      ],
      ms: [
        "Semak dan cuci penapis udara dahulu — penapis tersumbat ialah punca #1 aliran udara lemah.",
        "Jika aliran udara lemah walaupun penapis bersih, roda blower disaluti habuk dan biofilem, mengurangkan isi padu.",
        "Cuci kimia tekanan memulihkan roda blower dan gegelung kepada aliran udara hampir baharu.",
      ],
      zh: [
        "先检查并清洗空气滤网 — 滤网堵塞是风量弱的第一大原因。",
        "如果滤网干净但风量仍弱，说明风轮被灰尘和生物膜覆盖，风量减少。",
        "压力化学清洗可使风轮和盘管恢复接近全新的风量。",
      ],
    },
    service: "Pressure Chemical Wash",
    price: { en: "From RM 120 (1.0–1.5 HP wall-mounted)", ms: "Dari RM 120 (1.0–1.5 HP dinding)", zh: "从RM 120起（1.0–1.5匹挂壁式）" },
    why: {
      en: "Dust and mould on the blower wheel physically block airflow. The high-pressure wash removes the buildup and restores volumetric airflow.",
      ms: "Habuk dan kulat pada roda blower secara fizikal menyekat aliran udara. Cucian tekanan tinggi membuang pengumpulan dan memulihkan aliran udara volumetrik.",
      zh: "风轮上的灰尘和霉菌会物理性地阻碍气流。高压清洗去除积聚物并恢复风量。",
    },
    href: "/problems/aircond-weak-airflow",
  },
  {
    keywords: /bill|electric|electricity|tenaga|电费|电力|energy/,
    title: { en: "High Electricity Bill", ms: "Bil Elektrik Tinggi", zh: "电费过高" },
    steps: {
      en: [
        "A dirty coil and filter make the unit run 30–40% longer to reach temperature — the cheapest fix is a chemical wash (from RM 120).",
        "Low refrigerant gas makes the compressor run non-stop without reaching the set temperature.",
        "An old non-inverter unit running 8+ hours a day typically uses ~35% more electricity than an inverter unit.",
      ],
      ms: [
        "Gegelung dan penapis kotor membuat unit berjalan 30–40% lebih lama untuk mencapai suhu — penyelesaian paling murah ialah cuci kimia (dari RM 120).",
        "Gas penyejuk rendah membuat kompressor berjalan tanpa henti tanpa mencapai suhu ditetapkan.",
        "Unit bukan inverter lama berjalan 8+ jam sehari biasanya menggunakan ~35% lebih elektrik daripada unit inverter.",
      ],
      zh: [
        "盘管和滤网脏污使机器需多运行30–40%才能达到设定温度 — 最便宜的解决方案是化学清洗（从RM 120起）。",
        "冷媒不足使压缩机不停运转却达不到设定温度。",
        "每天运行8小时以上的旧非变频机通常比变频机多耗约35%的电。",
      ],
    },
    service: "Chemical Wash / Gas Check / Inverter Upgrade",
    price: { en: "Wash from RM 120 · Gas RM 2.50–3.00/PSI · Installation from RM 199", ms: "Cuci dari RM 120 · Gas RM 2.50–3.00/PSI · Pemasangan dari RM 199", zh: "清洗从RM 120起 · 气体每PSI RM 2.50–3.00 · 安装从RM 199起" },
    why: {
      en: "High bills are almost always efficiency losses: dirt, low gas, or an outdated compressor. The savings calculator can show you the payback period for an inverter upgrade.",
      ms: "Bil tinggi hampir selalu kerugian kecekapan: kotoran, gas rendah, atau kompressor lapuk. Kalkulator penjimatan boleh menunjukkan tempoh pulangan untuk naik taraf inverter.",
      zh: "电费高几乎都是效率损失：脏污、缺气或压缩机老旧。节省计算器可显示变频升级的回本周期。",
    },
    href: "/aircond-savings-calculator",
  },
];

// ── Pricing answer builder ────────────────────────────────────────────────

function pricingAnswerFor(serviceSlug: string | null, hp: HpSize | undefined, n: string, lang: AssistantLang): AssistantReply | null {
  const p = sitePublic.pricing;
  const t = I18N;
  const l = lang;

  // Material pricing questions
  if (/copper|paip tembaga|铜管|pipe rate|铜/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("copper"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.copperText[l],
        cards: [{ type: "pricing", title: t.copperTitle[l], rows: rows.map((r) => ({ label: r.label, price: r.price })), note: t.copperFree[l] }],
        suggested: l === "en" ? ["How much for a 30 ft run?", "Full installation cost"] : l === "ms" ? ["Berapa untuk 30 kaki?", "Kos pemasangan penuh"] : ["30英尺要多少钱？", "完整安装费用"],
      },
    };
  }
  if (/wire|wayar|电线|electrical cable/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("wire"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.wireText[l],
        cards: [{ type: "pricing", title: t.wireTitle[l], rows: rows.map((r) => ({ label: r.label, price: r.price })) }],
      },
    };
  }
  if (/drain|longkang|排水/.test(n)) {
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.drainText[l],
        suggested: l === "en" ? ["Chemical wash price", "Water leaking — what service?"] : l === "ms" ? ["Harga cuci kimia", "Bocor air — servis apa?"] : ["化学清洗价格", "漏水 — 需要什么服务？"],
      },
    };
  }
  if (/pvc|casing|trunking/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("pvc"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.pvcText[l],
        cards: [{ type: "pricing", title: t.pvcTitle[l], rows: rows.map((r) => ({ label: r.label, price: r.price })), note: t.pvcNote[l] }],
      },
    };
  }
  if (/bracket|支架|compressor stand/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("bracket"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.bracketText[l],
        cards: [{ type: "pricing", title: t.bracketTitle[l], rows: rows.map((r) => ({ label: r.label, price: r.price })), note: t.bracketNote[l] }],
      },
    };
  }
  if (/switch|plug point|socket/.test(n)) {
    const rows = p.materials.rows.filter((r) => r.label.toLowerCase().includes("plug"));
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.switchText[l],
        cards: [{ type: "pricing", title: t.switchTitle[l], rows: rows.map((r) => ({ label: r.label, price: r.price })) }],
      },
    };
  }
  if (/water pump|drain pump|pam|水泵/.test(n)) {
    return {
      intent: "material-pricing",
      context: { hp },
      message: {
        text: t.pumpText[l],
        suggested: l === "en" ? ["Ceiling cassette installation cost", "Installation cost calculator"] : l === "ms" ? ["Kos pemasangan ceiling cassette", "Kalkulator kos pemasangan"] : ["天花板卡式安装费用", "安装费用计算器"],
      },
    };
  }

  // Gas top-up pricing
  if (/gas|top.?up|refill|tambah gas|冷媒|充气|加气|r22|r32|r410a/.test(n)) {
    const gasType = gasFromText(n) ?? "r32";
    const g = calculateGasEstimate({ hp: hp ?? "1.5", gasType, condition: "medium", units: 1 });
    const rows = p.gasTopup.rows.map((r) => ({ label: r.label, price: r.price }));
    return {
      intent: "gas-pricing",
      context: { hp, gasType },
      message: {
        text: t.gasPriceText[l]
          .replace("{hp}", hp ?? "1.5")
          .replace("{gas}", GAS_LABELS[gasType])
          .replace("{psi}", `${g.psiMin}–${g.psiMax}`)
          .replace("{total}", `${formatRM(g.totalMin)}–${formatRM(g.totalMax)}`),
        cards: [
          { type: "pricing", title: t.gasRateCardTitle[l], rows, note: t.gasRateCardNote[l] },
          { type: "service", title: t.recoGasService[l], service: "Gas Top-Up / Precision Balancing", price: "Per actual PSI · leak check included / Per PSI sebenar · semakan kebocoran disertakan / 按实际PSI · 附带检漏", why: t.gasServiceWhy[l], href: "/services/gas-topup" },
        ],
        suggested: l === "en" ? ["Book gas top-up", "Which gas — R22 or R32?"] : l === "ms" ? ["Tempah tambah gas", "Gas mana — R22 atau R32?"] : ["预约加气", "用R22还是R32？"],
      },
    };
  }

  // Service pricing (chemical wash, overhaul, basic, repair, installation)
  if (serviceSlug) {
    const detail = sitePublic.services.find((s) => s.slug === serviceSlug);
    const table = p[serviceSlug as keyof typeof p] as { rows: { label: string; price: string }[]; note?: string } | undefined;
    if (detail && table && "rows" in table) {
      const text =
        serviceSlug === "installation"
          ? t.installFromText[l]
          : t.serviceStartText[l].replace("{title}", detail.title).replace("{price}", detail.short.match(/from RM [\d.]+/)?.[0] ?? "RM 99");
      return {
        intent: "service-pricing",
        context: { hp, service: serviceSlug },
        message: {
          text,
          cards: [
            { type: "pricing", title: `${detail.title} — ${t.publishedPricesTitle[l]}`, rows: table.rows.map((r) => ({ label: r.label, price: r.price })), note: table.note },
            { type: "links", title: t.moreInfo[l], links: [{ label: `${detail.title} — ${t.servicePageLink[l]}`, href: `/services/${serviceSlug}` }, { label: t.priceListLink[l], href: "/aircond-service-price-malaysia" }] },
          ],
          suggested: l === "en" ? ["Book this service", "Which aircond service do I need?"] : l === "ms" ? ["Tempah servis ini", "Servis aircond mana yang saya perlukan?"] : ["预约此服务", "我需要哪种冷气服务？"],
        },
      };
    }
  }

  // General "how much is service/price" — full price list
  return {
    intent: "pricing",
    context: { hp },
    message: {
      text: t.priceSummaryText[l],
      cards: [
        {
          type: "pricing",
          title: t.priceSummaryTitle[l],
          rows: [
            { label: "Basic Servicing · 1.0–1.5 HP / Servis Asas / 基本保养", price: "RM 99" },
            { label: "Pressure Chemical Wash · 1.0–1.5 HP / Cuci Kimia / 化学清洗", price: "RM 120" },
            { label: "Chemical Overhaul · 1.0–1.5 HP / Overhaul Kimia / 化学大修", price: "RM 220" },
            { label: "Gas Top-Up / Tambah Gas / 加气", price: "R22 RM 2.50/PSI · R410A/R32 RM 3.00/PSI" },
            { label: "Diagnostic (waived with repair) / Diagnostik / 检测费", price: "RM 88" },
            { label: "Installation · Wall-Mounted 1.0–1.5 HP / Pemasangan Dinding / 挂壁式安装", price: "RM 199" },
            { label: "Installation · Ceiling Cassette / Pemasangan Cassette / 卡式安装", price: "From RM 290 / Dari RM 290 / 从RM 290起" },
          ],
          note: t.priceSummaryNote[l],
        },
        {
          type: "links",
          title: t.fullPriceLists[l],
          links: [
            { label: t.pricePageLink[l], href: "/aircond-service-price-malaysia" },
            { label: t.installGuideLink[l], href: "/installation-price-malaysia" },
            { label: t.useCalcLink[l], href: "/aircond-installation-cost-calculator" },
          ],
        },
      ],
      suggested: l === "en" ? ["How much is chemical wash?", "How much is installation for 2 HP?", "Gas top-up cost"] : l === "ms" ? ["Berapa harga cuci kimia?", "Berapa harga pemasangan 2 HP?", "Kos tambah gas"] : ["化学清洗多少钱？", "2匹安装多少钱？", "加气费用"],
    },
  };
}

// ── Main entry ─────────────────────────────────────────────────────────────

export function answer(input: string, prev: AssistantContext, lang: AssistantLang = "en"): AssistantReply {
  const n = normalize(input);
  const t = I18N;
  const l = lang;
  const sug = SUGGESTIONS[l];
  const ctx: AssistantContext = { ...prev };

  // Extract structured facts from the message for follow-up context
  const hp = hpFromText(n) ?? prev.hp ?? undefined;
  const unitType = unitTypeFromText(n) ?? prev.unitType ?? undefined;
  const gasType = gasFromText(n) ?? prev.gasType ?? undefined;
  const dims = roomDimsFromText(n);
  const sqft = sqftFromText(n);
  const roomSqft = sqft ?? (dims ? dims.length * dims.width : prev.roomSqft);
  const units = n.match(/(\d+)\s*(units?|unit|台|架)/)?.[1] ? parseInt(n.match(/(\d+)\s*(units?|unit|台|架)/)![1], 10) : prev.units ?? undefined;
  const nextCtx: AssistantContext = { ...ctx, hp, unitType, gasType, units, roomSqft };

  // 1. Greetings / pleasantries
  if (/^(hi|hii+|hello|helo|hey|halo|hai|selamat (pagi|petang|tengah)|good (morning|afternoon|evening)|yo|assalam|你好|您好|嗨|哈喽|哈啰)/.test(n) && n.length < 40) {
    return {
      intent: "greeting",
      context: nextCtx,
      message: {
        text: t.greeting[l],
        suggested: sug.slice(0, 4),
      },
    };
  }
  if (/thank|thanks|terima kasih|tq|thx|cheers|谢谢|多谢/.test(n)) {
    return {
      intent: "thanks",
      context: nextCtx,
      message: {
        text: t.thanks[l],
        suggested: l === "en" ? ["How much is chemical wash?", "How do I book a service?"] : l === "ms" ? ["Berapa harga cuci kimia?", "Macam mana nak tempah servis?"] : ["化学清洗多少钱？", "怎么预约服务？"],
      },
    };
  }
  if (/bye|goodbye|see you|selamat tinggal|再见|下次/.test(n)) {
    return {
      intent: "bye",
      context: nextCtx,
      message: {
        text: t.bye[l],
        suggested: l === "en" ? ["Installation cost", "Gas top-up price"] : l === "ms" ? ["Kos pemasangan", "Harga tambah gas"] : ["安装费用", "加气价格"],
      },
    };
  }
  if (/what can you do|help me|bantuan|capabilit|what do you know|who are you|help\b|能做什么|帮助|帮我/.test(n)) {
    return {
      intent: "help",
      context: nextCtx,
      message: {
        text: t.helpIntro[l],
        suggested: sug,
      },
    };
  }
  if (/calculator|kalkulator|tool\b|tools|use the (calculator|tool)|计算器|工具/.test(n)) {
    return {
      intent: "calculators",
      context: nextCtx,
      message: {
        text: t.calculatorsIntro[l],
        cards: [
          {
            type: "links",
            title: t.calcLinksTitle[l],
            links: [
              { label: l === "en" ? "Installation Cost Calculator" : l === "ms" ? "Kalkulator Kos Pemasangan" : "安装费用计算器", href: "/aircond-installation-cost-calculator" },
              { label: l === "en" ? "Gas Top-up Cost Estimator" : l === "ms" ? "Anggaran Kos Tambah Gas" : "加气费用估算器", href: "/aircond-gas-topup-cost-calculator" },
              { label: t.btuCalcLink[l], href: "/btu-calculator" },
              { label: l === "en" ? "Aircond Size Calculator" : l === "ms" ? "Kalkulator Saiz Aircond" : "冷气尺寸计算器", href: "/aircond-size-calculator" },
              { label: l === "en" ? "Electricity Cost Calculator" : l === "ms" ? "Kalkulator Kos Elektrik" : "电费计算器", href: "/aircond-electricity-cost-calculator" },
              { label: l === "en" ? "Inverter Savings Calculator" : l === "ms" ? "Kalkulator Penjimatan Inverter" : "变频节省计算器", href: "/aircond-savings-calculator" },
              { label: l === "en" ? "Service Recommendation Tool" : l === "ms" ? "Alat Cadangan Servis" : "服务推荐工具", href: "/which-aircond-service-do-i-need" },
            ],
          },
        ],
        suggested: l === "en" ? ["How much is installation?", "What HP do I need for 12x10?"] : l === "ms" ? ["Berapa harga pemasangan?", "HP apa untuk bilik 12x10?"] : ["安装多少钱？", "12x10的房间需要几匹？"],
      },
    };
  }

  // 2. Intent classification helpers
  const sizingWords = /what hp|which hp|hp do i need|hp (for|utk|untuk|yang|sesuai|patut)|berapa hp|what size|what capacity|aircond size|aircon size|saiz aircond|匹数|几匹|多大匹|size aircond/;
  const roomMention = /room|bilik|space|sqft|square feet|kaki persegi|\bft\b|\d+\s*[x×*]\s*\d+|房间|室/;
  const hasRoomInfo = roomSqft !== undefined && roomSqft > 0 && roomMention.test(n);
  const wantsHp = sizingWords.test(n) || hasRoomInfo;
  const priceWords = /price|cost|how much|harga|berapa|kos|charge|fee|rate|收费|多少钱/;
  const wantsQuote = /quote|quotation|estimate|anggaran|估算|估计/.test(n) && !/gas|top.?up|refill|加气|充气/.test(n);
  const service = detectService(n);

  // 2b. Material run estimate — "20 ft copper pipe", "30 ft run", "10 ft wire",
  //     "tambah 20 kaki paip tembaga", "增加20英尺铜管"
  const ftRun = n.match(/(\d+(?:\.\d)?)\s*(?:ft|feet|kaki|英尺)/);
  const materialWord = /copper|wire|drain|pvc|casing|pipe run|\brun\b|tembaga|wayar|saliran|铜管|铜|电线|排水/.test(n);
  if (ftRun && materialWord) {
    const runLen = Math.max(0, parseFloat(ftRun[1]) - FREE_RUN_FEET);
    const h = hp ?? "1.5";
    const copper = copperPipeRate(h);
    const wire = electricalWireRate(h);
    const u = units ?? 1;
    const copperAmt = Math.round(runLen * copper * u);
    const wireAmt = Math.round(runLen * wire * u);
    const drainAmt = Math.round(runLen * DRAIN_PIPE_RATE * u);
    const isCopper = /copper|tembaga|铜/.test(n);
    const isWire = /wire|wayar|电线/.test(n);
    const isDrain = /drain|saliran|排水/.test(n) || (!isCopper && !isWire && /run/.test(n));
    const total = (isCopper ? copperAmt : 0) + (isWire ? wireAmt : 0) + (isDrain ? drainAmt : 0);
    return {
      intent: "material-estimate",
      context: nextCtx,
      message: {
        text: t.materialEstimateText[l]
          .replace("{len}", ftRun[1])
          .replace("{hp}", h)
          .replace("{units}", String(u))
          .replace("{s}", u > 1 ? "s" : "")
          .replace("{free}", String(FREE_RUN_FEET))
          .replace("{extra}", String(runLen)),
        cards: [
          {
            type: "quote",
            title: t.materialEstimateTitle[l],
            lines: [
              { label: "Copper pipe (extra) / Paip tembaga / 铜管（额外）", detail: `${runLen} ft × RM ${copper}/ft × ${u}`, amount: copperAmt.toLocaleString() },
              { label: "Electrical wire (extra) / Wayar / 电线（额外）", detail: `${runLen} ft × RM ${wire}/ft × ${u}`, amount: wireAmt.toLocaleString() },
              { label: "Drain pipe (extra) / Paip saliran / 排水管（额外）", detail: `${runLen} ft × RM ${DRAIN_PIPE_RATE}/ft × ${u}`, amount: drainAmt.toLocaleString() },
            ],
            total: total.toLocaleString(),
            note: t.materialEstimateNote[l],
          },
          {
            type: "links",
            title: t.fullBreakdown[l],
            links: [{ label: t.useCalcLink[l], href: "/aircond-installation-cost-calculator" }],
          },
        ],
        suggested: l === "en" ? ["Full installation cost", "How much is PVC casing?"] : l === "ms" ? ["Kos pemasangan penuh", "Berapa harga casing PVC?"] : ["完整安装费用", "PVC线槽多少钱？"],
      },
    };
  }

  // 2c. Gas pricing — catches "gas quotation", "gas estimate for r32", etc.
  if (/gas|top.?up|refill|r22|r32|r410a|加气|充气/.test(n) && /price|cost|how much|harga|berapa|kos|charge|quote|quotation|estimate|anggaran|费用|多少钱/.test(n)) {
    const gasReply = pricingAnswerFor(null, hp, n, l);
    if (gasReply) return { ...gasReply, context: nextCtx };
  }

  // 2d. General pricing
  if ((priceWords.test(n) || service) && !wantsQuote && !wantsHp) {
    const pricingReply = pricingAnswerFor(service?.slug ?? null, hp, n, l);
    if (pricingReply) return { ...pricingReply, context: nextCtx };
  }

  // 3. HP recommendation
  if (wantsHp && (roomSqft || dims || /sqft|square feet|kaki persegi/.test(n) || /\d+\s*[x×*]\s*\d+/.test(n))) {
    const area = roomSqft ?? (dims ? dims.length * dims.width : 0);
    const btu = calculateBtu({
      areaSqft: area,
      roomTypeMultiplier: ROOM_TYPE_MULTIPLIERS["bedroom"],
      sunMultiplier: SUN_MULTIPLIERS["medium"],
      heightMultiplier: heightMultiplier(10),
      peopleBTU: peopleBtu(2),
      windowsBTU: windowsBtu(1),
    });
    const rec = recommendHpFromBtu(btu);
    return {
      intent: "hp-recommendation",
      context: { ...nextCtx, hp: rec.hp as HpSize },
      message: {
        text: t.hpRecoText[l]
          .replace("{area}", String(Math.round(area)))
          .replace("{btu}", btu.toLocaleString())
          .replace("{hp}", rec.hp)
          .replace("{price}", formatRM(rec.installFrom)),
        cards: [
          { type: "hp", title: t.hpCardTitle[l], btu, hp: rec.hp, installFrom: rec.installFrom, note: t.hpCardNote[l] },
          { type: "links", title: t.nextSteps[l], links: [{ label: t.btuCalcLink[l], href: "/btu-calculator" }, { label: t.installCostLink[l], href: "/aircond-installation-cost-calculator" }] },
        ],
        suggested: l === "en" ? ["How much to install this size?", "Estimate my installation cost"] : l === "ms" ? ["Berapa harga pemasangan saiz ini?", "Anggaran kos pemasangan saya"] : ["这个规格安装多少钱？", "估算我的安装费用"],
      },
    };
  }
  if (wantsHp) {
    return {
      intent: "hp-ask-room",
      context: nextCtx,
      message: {
        text: t.hpAskRoom[l],
        suggested: l === "en" ? ["12 x 10 ft", "200 sqft living room", "Use the BTU calculator"] : l === "ms" ? ["12 x 10 kaki", "Ruang tamu 200 kaki persegi", "Guna kalkulator BTU"] : ["12 x 10英尺", "200平方英尺客厅", "使用BTU计算器"],
      },
    };
  }

  // 4. Installation estimate / quotation
  if (/install|pemasangan|安装|quote|quotation|estimate/.test(n) || (nextCtx.lastIntent === "install-estimate" && /yes|ya|ok|确认|好的/.test(n))) {
    const estimateHp = hp ?? "1.5";
    const estimate = calculateInstallationEstimate({
      units: units ?? 1,
      hp: estimateHp,
      unitType: unitType ?? "wall",
      extraCopperFeet: 0,
      extraWireFeet: 0,
      extraDrainFeet: 0,
      pvcFeet: 0,
      needsOutdoorBracket: true,
      heavyDutyBracket: false,
      needsIndoorBracket: false,
      needsSwitch: false,
      needsWaterPump: false,
    });
    const typeLabel = unitType === "cassette"
      ? l === "ms" ? "Ceiling Cassette" : l === "zh" ? "天花板卡式" : "wall-mounted"
      : unitType === "window"
        ? l === "ms" ? "tingkap" : l === "zh" ? "窗式" : "window"
        : l === "ms" ? "dinding" : l === "zh" ? "挂壁式" : "wall-mounted";
    return {
      intent: "install-estimate",
      context: { ...nextCtx, hp: estimateHp, lastIntent: "install-estimate" },
      message: {
        text: t.quoteIntro[l]
          .replace("{units}", String(units ?? 1))
          .replace("{hp}", estimateHp)
          .replace("{type}", typeLabel),
        cards: [
          {
            type: "quote",
            title: t.quoteTitle[l],
            lines: estimate.lineItems.map((li) => ({ label: li.label, detail: li.detail, amount: li.amount.toLocaleString() })),
            total: estimate.grandTotal.toLocaleString(),
            discount: estimate.discountAmount > 0 ? `${l === "ms" ? "Diskaun" : l === "zh" ? "折扣" : "Discount"}: ${estimate.discount.pct}% OFF (−${formatRM(estimate.discountAmount)})` : undefined,
            note: t.quoteNote[l],
          },
          {
            type: "links",
            title: t.quoteRefine[l],
            links: [
              { label: t.quoteCalcLink[l], href: "/aircond-installation-cost-calculator" },
              { label: t.quoteBookLink[l], href: "/book" },
              { label: t.quotePriceLink[l], href: "/installation-price-malaysia" },
            ],
          },
        ],
        suggested: l === "en" ? ["Add 20 ft copper pipe", "How much for 3 units?", "Book this installation"] : l === "ms" ? ["Tambah 20 kaki paip tembaga", "Berapa untuk 3 unit?", "Tempah pemasangan ini"] : ["增加20英尺铜管", "3台多少钱？", "预约此安装"],
      },
    };
  }

  // 5. Gas recommendation
  if (/which gas|gas (type|apa)|r22 or|r32 or|r410a or|gas mana|用什么gas|选.*gas|gas untuk/.test(n) || (/gas/.test(n) && /recommend|suggest|sesuai|适合/.test(n))) {
    return {
      intent: "gas-recommendation",
      context: nextCtx,
      message: {
        text: t.gasRecoText[l],
        cards: [
          {
            type: "pricing",
            title: t.gasRatesTitle[l],
            rows: sitePublic.pricing.gasTopup.rows.map((r) => ({ label: r.label, price: r.price })),
            note: t.gasLeakNote[l],
          },
        ],
        suggested: l === "en" ? ["How much is gas top-up for 1.5 HP?", "My unit is from 2012 — which gas?"] : l === "ms" ? ["Berapa kos tambah gas untuk 1.5 HP?", "Unit saya dari 2012 — gas apa?"] : ["1.5匹加气多少钱？", "我的机器是2012年的 — 用什么气体？"],
      },
    };
  }

  // 6. Service recommendation from symptoms
  const symptom = TROUBLESHOOTING.find((x) => x.keywords.test(n));
  if (symptom && !/price|cost|how much|harga/.test(n)) {
    return {
      intent: "service-recommendation",
      context: nextCtx,
      message: {
        text: t.symptomIntro[l].replace("{title}", symptom.title[l]),
        cards: [
          {
            type: "service",
            title: t.recoServiceTitle[l],
            service: symptom.service,
            price: symptom.price[l],
            why: symptom.why[l],
            href: symptom.href,
          },
          {
            type: "links",
            title: t.immediateSteps[l],
            links: symptom.steps[l].map((s, i) => ({ label: `${i + 1}. ${s}`, href: symptom.href })),
          },
        ],
        suggested: l === "en" ? ["How much is this service?", "Book this service", "Use the service recommendation tool"] : l === "ms" ? ["Berapa harga servis ini?", "Tempah servis ini", "Guna alat cadangan servis"] : ["这项服务多少钱？", "预约此服务", "使用服务推荐工具"],
      },
    };
  }

  // 7. Curated knowledge base
  for (const k of KNOWLEDGE) {
    if (k.keywords.test(n)) {
      return {
        intent: "knowledge",
        context: nextCtx,
        message: {
          text: k.answer[l],
          cards: k.links ? [{ type: "links", title: t.usefulLinks[l], links: k.links }] : undefined,
          suggested: l === "en" ? ["How much is chemical wash?", "What HP do I need?", "Book a service"] : l === "ms" ? ["Berapa harga cuci kimia?", "HP apa yang saya perlukan?", "Tempah servis"] : ["化学清洗多少钱？", "我需要几匹？", "预约服务"],
        },
      };
    }
  }

  // 8. Fallback — never invent, always offer a path forward
  return {
    intent: "fallback",
    context: nextCtx,
    message: {
      text: t.fallback[l],
      suggested: sug,
    },
  };
}

/** Opening message shown when the chat first loads. */
export function welcomeMessage(lang: AssistantLang = "en"): AssistantMessage {
  return {
    role: "assistant",
    text: I18N.welcome[lang],
    suggested: SUGGESTIONS[lang].slice(0, 6),
  };
}
