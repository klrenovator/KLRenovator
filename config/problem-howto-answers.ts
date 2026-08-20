/**
 * Per-problem AEO packs: question-style direct answers + HowTo steps.
 *
 * Used by /problems/[slug] in EN, MS and ZH. Each pack is authored for that
 * fault — do not generate these by substituting the problem name into a
 * shared paragraph. Prices come from `lib/published-prices.ts` so they
 * cannot drift from config/site/pricing.ts.
 *
 * Detector contract (audit/extract.mjs):
 *   - a direct answer is an H2–H4 question immediately followed by a
 *     15–120 word <p>
 *   - HowTo schema is only valid when the same steps are visible as an <ol>
 *   - HowTo heading must match /how to|how do|step|langkah|cara|步骤|如何/
 */

import {
  publishedPrices as P,
  priceAmount,
} from "@/lib/published-prices";

export const PROBLEM_AEO_SLUGS = [
  "aircond-not-cold",
  "aircond-water-leaking",
  "aircond-making-noise",
  "aircond-bad-smell",
  "aircond-freezing-up",
  "aircond-low-gas",
  "aircond-gas-leak",
  "aircond-compressor-problem",
  "aircond-pcb-problem",
  "aircond-fan-not-working",
  "aircond-tripping-power",
  "aircond-remote-not-working",
  "aircond-indoor-unit-leaking",
  "aircond-outdoor-unit-not-running",
  "aircond-high-electricity-bill",
  "aircond-weak-airflow",
  "aircond-not-turning-on",
  "aircond-blinking-light",
  "aircond-water-dripping",
  "aircond-thermostat-problems",
] as const;

export type ProblemAeoSlug = (typeof PROBLEM_AEO_SLUGS)[number];
export type ProblemAeoLocale = "en" | "ms" | "zh";

export type ProblemHowToStep = { name: string; text: string };
export type ProblemDirectAnswer = { q: string; a: string };

export type ProblemAeoLocaleCopy = {
  howToHeading: string;
  howToName: string;
  howToDescription: string;
  totalTime: string;
  estimatedCostValue: string;
  supply: readonly string[];
  tool: readonly string[];
  steps: readonly ProblemHowToStep[];
  answers: readonly [ProblemDirectAnswer, ProblemDirectAnswer, ProblemDirectAnswer, ProblemDirectAnswer];
};

export type ProblemAeoPack = Record<ProblemAeoLocale, ProblemAeoLocaleCopy>;

const wash = P.chemicalWash15;
const overhaul = P.overhaul15;
const r22 = P.r22;
const r410 = P.r410a;
const r32 = P.r32;
const diag = P.diagnostic;
const cap = P.capacitor;
const motor = P.fanMotor;
const pcb = P.pcb;
const leak = P.gasLeakRepair;
const sensor = P.sensor;
const contactor = P.contactor;
const compressor = P.compressor;
const drainPump = P.drainPump;

export const problemHowtoAnswers: Record<ProblemAeoSlug, ProblemAeoPack> = {
  "aircond-not-cold": {
    en: {
      howToHeading: "How to diagnose an aircond that is not cold",
      howToName: "How to diagnose and fix an aircond that is not cold",
      howToDescription:
        "Step-by-step check KL Renovator uses when an aircond in KL or Selangor runs but blows warm air — from remote settings to gas pressure and coil inspection.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Washable air filter", "Food-safe coil chemical", "Correct refrigerant (R22, R410A or R32)"],
      tool: ["Manifold gauge set", "Capacitor meter", "Thermometer"],
      steps: [
        { name: "Confirm Cool mode and set-point", text: "Set the remote to Cool, not Fan or Dry, and 24–26°C. A unit left on Fan will blow room-temperature air even when the compressor is healthy." },
        { name: "Rinse the indoor filter", text: "A clogged washable filter starves the evaporator of air and makes the supply feel weak and warm. Rinse it, dry it, and refit it before calling a technician." },
        { name: "Clear the outdoor coil face", text: "Leaves, boxes or a closed service-ledge door choke condenser airflow. Give the outdoor unit 30 cm of clear space on the discharge side." },
        { name: "Read refrigerant pressure", text: `KL Renovator connects a manifold gauge and compares suction and discharge against the nameplate. Low pressure is the most common not-cold finding; we leak-check before any top-up (${r22} for R22, ${r410} for R410A, ${r32} for R32).` },
        { name: "Test capacitor and wash the coil if needed", text: `A weak run capacitor can mimic low gas. If the coil is blocked we do a pressure chemical wash from ${wash}. You get a confirmed quote before any part is replaced.` },
      ],
      answers: [
        { q: "Why is my aircond running but not cold?", a: `Low refrigerant is the cause in more than half of the not-cold calls KL Renovator takes in KL and Selangor. A dirty evaporator coil or a weak capacitor produce the same warm airflow. The usual same-day fix is a leak-checked gas top-up (${r22} for R22) or a chemical wash from ${wash}. Do not keep a warm unit running for weeks — the compressor still draws full power and can seize.` },
        { q: "How do I fix an aircond that is not cold?", a: `Start with Cool mode, a rinsed filter and a clear outdoor unit. If supply air is still warm, the next checks need gauges: refrigerant pressure, capacitor microfarads, and coil condition. WhatsApp KL Renovator the brand, HP and a photo of the outdoor nameplate. Most not-cold jobs finish in one visit once the leak, wash or capacitor is confirmed.` },
        { q: "How much does it cost to fix an aircond that is not cold?", a: `Diagnostic is ${diag} and is waived if we repair on the same visit. Gas top-up is ${r22} for R22 and ${r32} for R32 or R410A, charged on the actual PSI added. A wall-mounted chemical wash starts from ${wash}. Capacitor replacement is ${cap}. Every figure is confirmed before work starts.` },
        { q: "Can an aircond that is not cold be fixed the same day?", a: `Yes for the common causes. KL Renovator vans carry R22, R410A and R32, wash chemicals, and the usual capacitor sizes. Same-day slots run across KL and Selangor. If a hidden copper leak needs brazing we still diagnose on the first visit and book the follow-up with the quote already agreed.` },
      ],
    },
    ms: {
      howToHeading: "Langkah diagnosis aircond yang tidak sejuk",
      howToName: "Cara mendiagnosis aircond yang berjalan tetapi tidak sejuk",
      howToDescription:
        "Langkah semakan KL Renovator apabila aircond di KL atau Selangor beroperasi tetapi angin suam — dari tetapan remote hingga tekanan gas dan gegelung.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Penapis udara boleh basuh", "Kimia gegelung selamat makanan", "Penyejuk R22, R410A atau R32"],
      tool: ["Set manifold gauge", "Meter kapasitor", "Termometer"],
      steps: [
        { name: "Sahkan mod Cool dan suhu", text: "Tetapkan remote ke Cool, bukan Fan atau Dry, pada 24–26°C. Mod Fan akan meniup angin suhu bilik walaupun pekali sihat." },
        { name: "Bilas penapis dalaman", text: "Penapis tersumbat menyekat udara ke gegelung penyejat dan menjadikan angin lemah serta suam. Bilas, keringkan, pasang semula sebelum memanggil juruteknik." },
        { name: "Kosongkan muka unit luar", text: "Daun, kotak atau pintu service ledge yang tertutup menyekat aliran kondenser. Beri sekurang-kurangnya 30 cm ruang di bahagian hembusan." },
        { name: "Baca tekanan penyejuk", text: `KL Renovator menyambung manifold gauge dan bandingkan tekanan dengan plat nama. Tekanan rendah paling biasa; kami semak bocor sebelum top-up (${r22} untuk R22, ${r410} untuk R410A, ${r32} untuk R32).` },
        { name: "Uji kapasitor dan cuci gegelung jika perlu", text: `Kapasitor lemah meniru gejala gas rendah. Jika gegelung tersumbat, cuci kimia bertekanan dari ${wash}. Sebut harga disahkan sebelum alat ganti ditukar.` },
      ],
      answers: [
        { q: "Kenapa aircond saya berjalan tetapi tidak sejuk?", a: `Gas penyejuk rendah menyebabkan lebih separuh panggilan “tidak sejuk” yang KL Renovator terima di KL dan Selangor. Gegelung kotor atau kapasitor lemah menghasilkan angin suam yang sama. Baiki hari sama biasanya top-up gas selepas semak bocor (${r22} untuk R22) atau cuci kimia dari ${wash}. Jangan biarkan unit suam berjalan berminggu-minggu — pekali masih makan kuasa penuh dan boleh macet.` },
        { q: "Bagaimana saya baiki aircond yang tidak sejuk?", a: `Mulakan dengan mod Cool, penapis dibasuh dan unit luar tidak terhalang. Jika angin masih suam, semakan seterusnya perlukan tolok: tekanan penyejuk, mikrofarad kapasitor, dan keadaan gegelung. WhatsApp KL Renovator jenama, HP dan foto plat nama unit luar. Kebanyakan kerja siap dalam satu lawatan selepas bocor, cucian atau kapasitor disahkan.` },
        { q: "Berapa kos membaiki aircond yang tidak sejuk?", a: `Diagnostik ${diag} dan dilepaskan jika pembaikan dibuat lawatan sama. Top-up gas ${r22} untuk R22 dan ${r32} untuk R32 atau R410A, dikira mengikut PSI sebenar. Cuci kimia unit dinding dari ${wash}. Kapasitor ${cap}. Setiap angka disahkan sebelum kerja bermula. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bolehkah aircond yang tidak sejuk dibaiki hari sama?", a: `Boleh untuk punca biasa. Van KL Renovator membawa R22, R410A dan R32, kimia cucian, dan saiz kapasitor lazim. Slot hari sama merangkumi KL dan Selangor. Jika paip tembaga perlu dipateri, kami tetap diagnosis pada lawatan pertama dan tetapkan lawatan susulan dengan harga yang sudah dipersetujui.` },
      ],
    },
    zh: {
      howToHeading: "如何诊断冷气开着但不冷",
      howToName: "如何诊断并修复冷气运行但不冷",
      howToDescription:
        "KL Renovator 在吉隆坡与雪兰莪处理“开机但不冷”时的步骤：从遥控设置、过滤网到气压与盘管检查。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["可水洗过滤网", "食品级盘管清洗剂", "对应冷媒 R22、R410A 或 R32"],
      tool: ["歧管压力表", "电容表", "温度计"],
      steps: [
        { name: "确认制冷模式与设定温度", text: "遥控器调到制冷，不要停在送风或除湿，温度设在 24–26°C。送风模式即使用压缩机正常，吹出的也是室温风。" },
        { name: "冲洗室内机过滤网", text: "堵塞的过滤网让蒸发器吃不到风，出风又弱又暖。先冲洗、晾干、装回，再决定是否叫技师。" },
        { name: "清理室外机出风面", text: "树叶、杂物或关上的检修门会堵住冷凝器。出风侧至少留 30 厘米空间。" },
        { name: "读取制冷剂压力", text: `KL Renovator 接上歧管表，对照铭牌核对吸排气压力。低压是最常见原因；充气前先检漏（R22 ${r22}，R410A ${r410}，R32 ${r32}）。` },
        { name: "测试电容，必要时化学清洗", text: `老化运行电容会表现得像缺气。盘管堵塞则做压力化学清洗，挂壁式从 ${wash} 起。更换零件前先确认报价。` },
      ],
      answers: [
        { q: "为什么冷气在转但不冷？", a: `吉隆坡与雪兰莪“不冷”报修里，超过一半是制冷剂不足。蒸发器脏或电容变弱，出风同样是暖的。当天常见处理是检漏后按 PSI 充气（R22 ${r22}），或从 ${wash} 起做化学清洗。不要让暖风机器连续开几周——压缩机仍在满负荷耗电，时间一长会卡死。` },
        { q: "冷气不冷应该怎么处理？", a: `先确认制冷模式、冲洗过滤网、清开室外机。若出风仍暖，下一步必须用表：制冷剂压力、电容微法值和盘管状况。把品牌、匹数和室外机铭牌照片 WhatsApp 给 KL Renovator。多数不冷故障在确认漏点、清洗或电容后，一次上门就能做完。` },
        { q: "修理不冷的冷气要多少钱？", a: `诊断费 ${diag}，同次维修则免除。充气按实际 PSI：R22 ${r22}，R32 与 R410A ${r32}。挂壁式化学清洗从 ${wash} 起。电容更换 ${cap}。每一项都在开工前确认。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "不冷的冷气当天修得好吗？", a: `常见原因可以当天处理。KL Renovator 车上备有 R22、R410A、R32、清洗剂和常用电容。吉隆坡与雪兰莪都有当天档期。若铜管要钎焊，我们仍在第一次上门完成诊断，并按已同意的报价安排回访。` },
      ],
    },
  },

  "aircond-water-leaking": {
    en: {
      howToHeading: "How to stop an aircond leaking water",
      howToName: "How to diagnose and stop an indoor aircond water leak",
      howToDescription:
        "The drain-first sequence KL Renovator uses for indoor leaks in Malaysia's humidity — towel, tilt check, flush, then overhaul only if the pan is cracked.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Towel or basin", "Food-safe drain chemical", "Replacement drain pan if cracked"],
      tool: ["Wet vacuum", "Pressure flush pump", "Inspection camera"],
      steps: [
        { name: "Catch the water and switch off if it is near electrics", text: "Put a basin under the drip. If water is running toward a socket or the indoor PCB, isolate the aircond MCB before anything else." },
        { name: "See whether the indoor unit is tilted the wrong way", text: "The indoor chassis should fall a few degrees toward the drain stub. A level unit or a backward tilt is a common original-install fault in condos." },
        { name: "Pressure-flush the drain", text: `Most Malaysian leaks are slime in the drain pipe. KL Renovator wet-vacs and chemically flushes the full run, then tests flow. A chemical wash from ${wash} usually clears a first-time leak.` },
        { name: "Inspect the drain pan and pump", text: `If the leak returns, we open the pan for cracks or mould dams and test any cassette drain pump. A cracked wall-mounted pan needs a chemical overhaul from ${overhaul}, not another surface wash.` },
        { name: "Confirm dry running before leaving", text: "We run the unit in Cool until condensate is moving and the fascia is dry. Quote is confirmed before any pan, pump or pipe is replaced." },
      ],
      answers: [
        { q: "Why is water leaking from my aircond?", a: `In about seven of ten KL Renovator leak calls the indoor drain pipe is blocked by mould slime. Malaysia's year-round humidity makes that buildup faster than in drier climates. A chemical wash from ${wash} usually clears a first leak. Recurring leaks point to a cracked pan or a wrong pipe slope, which needs a wall-mounted overhaul from ${overhaul}.` },
        { q: "How do I stop an aircond leaking water?", a: `Catch the drip, kill power if water is near a socket, and do not tilt the indoor unit yourself — that can stress the flare joints. WhatsApp a photo of the drip point. KL Renovator flushes the drain, cleans the pan and only opens the chassis if the leak is heavy or repeating. Most first-time leaks finish the same visit.` },
        { q: "How much does aircond leak repair cost in KL?", a: `A chemical wash with drain flush starts from ${wash}. Wall-mounted chemical overhaul, used when the pan is packed or cracked, starts from ${overhaul}. Cassette drain-pump replacement is ${drainPump}. Diagnostic is ${diag} and waived with same-visit repair. Prices are confirmed before we open the unit.` },
        { q: "Is a leaking aircond dangerous?", a: `A slow drip stains paint and feeds mould in the wall cavity. A heavy leak onto a socket or the indoor PCB is an electrical hazard — switch the MCB off and do not reset it. WhatsApp KL Renovator at +60182983573 for same-day leak work across KL and Selangor.` },
      ],
    },
    ms: {
      howToHeading: "Langkah hentikan aircond yang bocor air",
      howToName: "Cara mendiagnosis dan hentikan kebocoran air unit dalam",
      howToDescription:
        "Urutan longkang dahulu yang KL Renovator guna untuk kebocoran dalaman dalam kelembapan Malaysia.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Tuala atau bekas", "Kimia longkang selamat makanan", "Dulang longkang ganti jika retak"],
      tool: ["Vakum basah", "Pam basuh bertekanan", "Kamera pemeriksaan"],
      steps: [
        { name: "Tampung air dan matikan jika dekat elektrik", text: "Letak bekas di bawah titisan. Jika air menghala ke soket atau PCB dalam, asingkan MCB aircond dahulu." },
        { name: "Semak kecondongan unit dalam", text: "Casis dalam patut condong sedikit ke arah paip longkang. Unit rata atau condong ke belakang ialah kesalahan pemasangan biasa di kondo." },
        { name: "Basuh paip longkang bertekanan", text: `Kebanyakan bocor di Malaysia ialah lendir dalam paip. KL Renovator vakum basah dan basuh kimia sepanjang laluan. Cuci kimia dari ${wash} biasanya selesai bocor kali pertama.` },
        { name: "Periksa dulang dan pam", text: `Jika bocor berulang, kami buka dulang cari retak atau empangan kulat, dan uji pam cassette. Dulang dinding retak perlu overhaul dari ${overhaul}, bukan cucian permukaan lagi.` },
        { name: "Sahkan unit kering sebelum pulang", text: "Kami jalankan mod Cool sampai kondensat mengalir dan fascia kering. Harga disahkan sebelum dulang, pam atau paip ditukar." },
      ],
      answers: [
        { q: "Kenapa aircond saya bocor air?", a: `Dalam kira-kira tujuh daripada sepuluh panggilan bocor KL Renovator, paip longkang dalam tersumbat lendir kulat. Kelembapan Malaysia mempercepat penumpukan itu. Cuci kimia dari ${wash} biasanya selesai bocor pertama. Bocor berulang menunjuk dulang retak atau cerun paip salah, yang perlukan overhaul unit dinding dari ${overhaul}.` },
        { q: "Bagaimana saya hentikan aircond yang bocor?", a: `Tampung titisan, putuskan kuasa jika air dekat soket, dan jangan condongkan unit dalam sendiri — sambungan flare boleh tertekan. WhatsApp foto titik bocor. KL Renovator basuh longkang, bersih dulang, dan hanya bongkar casis jika bocor teruk atau berulang. Kebanyakan bocor kali pertama siap lawatan sama.` },
        { q: "Berapa kos membaiki aircond bocor di KL?", a: `Cuci kimia dengan basuh longkang dari ${wash}. Overhaul kimia unit dinding, bila dulang penuh atau retak, dari ${overhaul}. Pam longkang cassette ${drainPump}. Diagnostik ${diag} dilepaskan dengan pembaikan lawatan sama. Harga disahkan sebelum unit dibuka. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Adakah aircond bocor berbahaya?", a: `Titisan perlahan menodai cat dan menyuburkan kulat dalam rongga dinding. Bocor deras ke soket atau PCB dalam ialah bahaya elektrik — matikan MCB dan jangan reset. WhatsApp KL Renovator di +60182983573 untuk kerja bocor hari sama di KL dan Selangor. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
      ],
    },
    zh: {
      howToHeading: "如何处理冷气漏水",
      howToName: "如何诊断并止住室内机漏水",
      howToDescription:
        "KL Renovator 在马来西亚高湿环境下处理室内机漏水的顺序：先排水，再决定是否大修。",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["毛巾或盆", "食品级排水清洗剂", "破裂时更换的排水盘"],
      tool: ["湿吸尘器", "加压冲洗泵", "内窥镜"],
      steps: [
        { name: "接住滴水，靠近电源则关机", text: "在滴水下方放盆。若水流向插座或室内 PCB，先断开冷气 MCB。" },
        { name: "检查室内机是否装反坡度", text: "室内机应略向排水口倾斜。完全水平或反向倾斜，是公寓原装常见问题。" },
        { name: "加压冲洗排水管", text: `马来西亚多数漏水是管内黏液。KL Renovator 先湿吸再化学冲洗整段管路。化学清洗从 ${wash} 起，通常能处理第一次漏水。` },
        { name: "检查水盘与排水泵", text: `若再次漏水，我们打开水盘查裂缝或霉坝，并测试卡式机排水泵。挂壁式水盘破裂需要从 ${overhaul} 起的化学大修，而不是再做表面清洗。` },
        { name: "确认运行后不再滴水", text: "以制冷模式运行，直到冷凝水顺畅、面板干燥。更换水盘、泵或水管前先确认报价。" },
      ],
      answers: [
        { q: "为什么冷气会漏水？", a: `KL Renovator 接到的漏水里，大约七成是室内排水管被霉菌黏液堵住。马来西亚全年潮湿，积垢比干燥地区更快。化学清洗从 ${wash} 起，通常能止住第一次漏水。反复漏水多半是水盘裂了或排水坡度装反，挂壁式要做从 ${overhaul} 起的化学大修。` },
        { q: "冷气漏水应该怎么停？", a: `先接住水，水靠近插座就断电。不要自己扳室内机角度——喇叭口接头会受力。把滴水位置的照片发到 WhatsApp。KL Renovator 冲洗排水、清洁水盘，只有漏得厉害或反复发生才拆机。多数第一次漏水当天做完。` },
        { q: "吉隆坡修冷气漏水要多少钱？", a: `含排水冲洗的化学清洗从 ${wash} 起。水盘积垢或破裂时，挂壁式化学大修从 ${overhaul} 起。卡式机排水泵 ${drainPump}。诊断费 ${diag}，同次维修免除。开壳前先确认价格。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "冷气漏水危险吗？", a: `细滴会污墙、在墙腔内养霉。大量漏到插座或室内 PCB 是电气危险——关掉 MCB，不要反复复位。WhatsApp KL Renovator +60182983573，吉隆坡与雪兰莪可安排当天漏水处理。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-making-noise": {
    en: {
      howToHeading: "How to find the source of aircond noise",
      howToName: "How to diagnose rattling, grinding or buzzing aircond noise",
      howToDescription:
        "Indoor-versus-outdoor isolation, then bearing, blade and capacitor checks — the sequence KL Renovator uses before quoting a motor.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["Mounting screws and vibration pads", "Replacement fan motor if seized", "Run capacitor"],
      tool: ["Clamp meter", "Screwdriver set", "Stethoscope or listening rod"],
      steps: [
        { name: "Say whether the noise is indoor, outdoor or both", text: "Rattle from the fascia is usually a loose panel. Grinding from the outdoor cage is almost always a fan bearing. Hiss at the copper is gas, not mechanical." },
        { name: "Check the outdoor stand and loose objects", text: "A rocking bracket or a broom leaning on the cage will buzz at compressor speed. Tighten what you can reach; leave the cage closed." },
        { name: "Run the unit and isolate the fan", text: "KL Renovator runs Cool, then Fan-only, to separate blade rattle from compressor growl. A humming outdoor fan that will not spin is usually the capacitor, not the motor." },
        { name: "Inspect bearings and the capacitor", text: `A grinding bearing is replaced, not oiled. Capacitor swap is ${cap}. Indoor or outdoor fan motor replacement is ${motor}.` },
        { name: "Retest at high fan speed", text: "We run high cool for several minutes and listen at the fascia, the copper and the outdoor cage before signing the job card." },
      ],
      answers: [
        { q: "Why is my aircond making a loud noise?", a: `Rattle is usually a loose panel or a blade kissing the housing. Grinding or screeching is a dying fan bearing and should not be ignored — the motor will seize and can take the blade with it. Buzzing on start is often a weak capacitor (${cap}). KL Renovator isolates indoor versus outdoor before quoting, so you do not pay for a compressor you do not need.` },
        { q: "How do I stop my aircond making noise?", a: `Note which cabinet the sound comes from and whether it happens on start, on cool, or all the time. You can tighten an indoor fascia screw; do not open the outdoor cage. Send KL Renovator a short video. Most rattles and capacitor buzzes are same-day. A seized outdoor motor is quoted from ${motor} before we cut the old one out.` },
        { q: "How much does aircond noise repair cost?", a: `Diagnostic is ${diag}, waived with repair. Capacitor ${cap}. Fan motor ${motor}. Contactor ${contactor}. We never jump to compressor replacement (${compressor}) until the cheap start-gear has been ruled out. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Is a grinding outdoor unit an emergency?", a: `Treat grinding as urgent, not optional. A bearing that locks will overheat the compressor. Switch the unit off if the sound is metallic and book KL Renovator the same day. A click once on start or stop is normal relay noise and can wait.` },
      ],
    },
    ms: {
      howToHeading: "Langkah cari punca bunyi bising aircond",
      howToName: "Cara mendiagnosis bunyi gemetar, mengisar atau berdengung",
      howToDescription:
        "Asingkan unit dalam dan luar, kemudian semak galas, bilah dan kapasitor sebelum mengutip motor.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["Skru dan pad getaran", "Motor kipas ganti jika macet", "Kapasitor jalan"],
      tool: ["Clamp meter", "Set pemutar skru", "Rod pendengar"],
      steps: [
        { name: "Nyatakan bunyi dalam, luar atau kedua-duanya", text: "Gemetar pada fascia biasanya panel longgar. Bunyi mengisar dari sangkar luar hampir selalu galas kipas. Desisan pada tembaga ialah gas, bukan mekanikal." },
        { name: "Semak stand luar dan barang longgar", text: "Braket goyang atau penyapu tersandar pada sangkar akan berdengung pada kelajuan pekali. Ketatkan yang mampu dicapai; biarkan sangkar tertutup." },
        { name: "Jalankan unit dan asingkan kipas", text: "KL Renovator jalankan Cool, kemudian Fan sahaja, untuk asingkan bilah daripada geraman pekali. Kipas luar berdengung tetapi tidak berpusing biasanya kapasitor, bukan motor." },
        { name: "Periksa galas dan kapasitor", text: `Galas mengisar diganti, bukan diminyakkan. Kapasitor ${cap}. Motor kipas dalam atau luar ${motor}.` },
        { name: "Uji semula pada kipas tinggi", text: "Kami jalankan sejuk tinggi beberapa minit dan dengar di fascia, paip tembaga dan sangkar luar sebelum menandatangani kad kerja." },
      ],
      answers: [
        { q: "Kenapa aircond saya berbunyi kuat?", a: `Gemetar biasanya panel longgar atau bilah menggeser perumah. Bunyi mengisar atau menjerit ialah galas kipas yang hampir mati — jangan abaikan, motor akan macet dan boleh bawa bilah sekali. Dengungan semasa mula sering kapasitor lemah (${cap}). KL Renovator asingkan dalam berbanding luar sebelum sebut harga, supaya anda tidak bayar pekali yang tidak perlu.` },
        { q: "Bagaimana saya hentikan bunyi bising aircond?", a: `Catat kabinet mana bunyi datang dan sama ada ia berlaku semasa mula, semasa sejuk, atau sepanjang masa. Anda boleh ketatkan skru fascia dalam; jangan buka sangkar luar. Hantar video ringkas kepada KL Renovator. Kebanyakan gemetar dan dengungan kapasitor siap hari sama. Motor luar macet dikutip dari ${motor} sebelum kami potong yang lama.` },
        { q: "Berapa kos membaiki bunyi bising aircond?", a: `Diagnostik ${diag}, dilepaskan dengan pembaikan. Kapasitor ${cap}. Motor kipas ${motor}. Kontaktor ${contactor}. Kami tidak melonjak ke ganti pekali (${compressor}) sebelum gear mula yang murah disingkirkan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Adakah bunyi mengisar unit luar kecemasan?", a: `Anggap bunyi mengisar sebagai segera, bukan pilihan. Galas yang kunci akan terlebih panas kan pekali. Matikan unit jika bunyi berlogam dan tempah KL Renovator hari sama. Satu klik semasa hidup atau mati ialah bunyi geganti biasa dan boleh menunggu. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何找出冷气噪音来源",
      howToName: "如何诊断冷气的嘎嘎声、研磨声或嗡嗡声",
      howToDescription:
        "先分清室内还是室外，再查轴承、风叶和电容。KL Renovator 在报价换电机前按此顺序检查。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["螺丝与减震垫", "卡死时更换的风扇电机", "运行电容"],
      tool: ["钳形表", "螺丝刀组", "听音棒"],
      steps: [
        { name: "分清噪音来自室内、室外还是两边", text: "面板嘎嘎多半是螺丝松。室外罩里的研磨声几乎一定是风扇轴承。铜管嘶嘶声是气体，不是机械。" },
        { name: "检查室外支架和靠着的杂物", text: "晃动的支架或靠在罩上的扫帚会按压缩机转速共振。能拧紧的先拧，不要自己开室外罩。" },
        { name: "分别以制冷和送风运行", text: "KL Renovator 先制冷再单独送风，区分风叶碰壳和压缩机低吼。室外风扇嗡嗡不转，多半是电容而不是电机。" },
        { name: "检查轴承与电容", text: `研磨的轴承要换，不要加油应付。电容 ${cap}。室内或室外风扇电机 ${motor}。` },
        { name: "高风档复测", text: "高风制冷运行数分钟，分别在面板、铜管和室外罩旁听声，再签工单。" },
      ],
      answers: [
        { q: "为什么冷气噪音很大？", a: `嘎嘎声通常是面板松或风叶擦壳。研磨或尖啸是风扇轴承快坏了，不能拖——电机会卡死并打坏风叶。开机嗡嗡常是电容变弱（${cap}）。KL Renovator 先分清室内外再报价，避免你为不需要的压缩机买单。` },
        { q: "冷气吵应该怎么处理？", a: `记下声音来自哪一台、是开机时、制冷时还是一直响。室内面板螺丝可以自己拧；不要打开室外罩。给 KL Renovator 发一段短视频。多数松动和电容嗡嗡当天能处理好。室外电机卡死按 ${motor} 报价后再拆旧件。` },
        { q: "冷气噪音维修要多少钱？", a: `诊断费 ${diag}，维修则免。电容 ${cap}。风扇电机 ${motor}。接触器 ${contactor}。在排除便宜的启动件之前，我们不会直接换成压缩机（${compressor}）。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "室外机研磨声算紧急吗？", a: `研磨声应当天处理，不是可选项。轴承抱死会让压缩机过热。声音发金属感就关机，预约 KL Renovator 当天上门。开关机各一声轻响是继电器，可以等。 签字工单会写明零件和价格，不靠口头约定。` },
      ],
    },
  },

  "aircond-bad-smell": {
    en: {
      howToHeading: "How to remove a musty smell from an aircond",
      howToName: "How to diagnose and remove aircond mould smell",
      howToDescription:
        "Filter, fan-dry, then coil and blower sterilisation — the wash-first path KL Renovator uses before recommending a wall-mounted overhaul.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Washable filter", "Food-safe alkaline coil chemical", "Anti-bacterial coil spray"],
      tool: ["Pressure wash pump", "Blower-wheel puller", "Moisture meter"],
      steps: [
        { name: "Separate musty from burning or chemical", text: "Musty or sour is mould. Burning plastic is electrical — switch off. Sweet chemical odour can be refrigerant — switch off and ventilate." },
        { name: "Wash the filter and fan-dry the coil", text: "Run Fan-only for 30 minutes with a window open after you rinse the filter. That dries the coil face and tells you if the smell is only surface dust." },
        { name: "Pressure-wash coil and blower", text: `Mould lives on the blower blades where a filter rinse cannot reach. A chemical wash from ${wash} kills it in one visit for most homes.` },
        { name: "Open a neglected wall-mounted unit if the smell returns", text: `If the odour is back within weeks, biofilm is behind the coil. Wall-mounted chemical overhaul from ${overhaul} soaks every part. Cassette and other types are quoted on site.` },
        { name: "Hand over a dry, odour-free run", text: "We run Cool and Fan after reassembly and only leave when the supply air smells clean." },
      ],
      answers: [
        { q: "Why does my aircond smell musty or like dirty socks?", a: `That smell is mould and bacteria on the evaporator and blower, not a broken part. Daily tropical runtime keeps the coil wet, so the colony grows between services. A pressure chemical wash from ${wash} removes it in most KL homes. An air purifier will not, because it never touches the blower wheel.` },
        { q: "How do I get rid of aircond smell?", a: `Wash the filter, then run Fan-only to dry the coil. If the smell is still there on the next Cool cycle, book a chemical wash. WhatsApp KL Renovator a 10-second clip of the smell-on-start moment. Burning or sweet-gas smells are a different job — switch off and say so in the message.` },
        { q: "How much does aircond smell removal cost?", a: `Chemical wash from ${wash} for 1.0–1.5 HP wall-mounted, ${P.chemicalWash25} for 2.0–2.5 HP, ${P.chemicalWashCassette15} for a 1.0–1.5 HP cassette. Wall-mounted overhaul from ${overhaul} when the smell returns in weeks. Diagnostic ${diag} is waived with the wash.` },
        { q: "Is mould smell from an aircond harmful?", a: `Spores circulated all day aggravate asthma and allergies, especially for children and older adults. It is not a reason to panic, but it is a reason not to wait another season. A wash is cheaper than a medical flare-up and cheaper than an overhaul later.` },
      ],
    },
    ms: {
      howToHeading: "Langkah buang bau hapak aircond",
      howToName: "Cara diagnosis dan buang bau kulat aircond",
      howToDescription:
        "Penapis, kering kipas, kemudian steril gegelung dan blower — cucian dahulu sebelum overhaul unit dinding.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Penapis boleh basuh", "Kimia alkali selamat makanan", "Semburan anti-bakteria"],
      tool: ["Pam cuci bertekanan", "Penarik roda blower", "Meter kelembapan"],
      steps: [
        { name: "Bezakan hapak daripada terbakar atau kimia", text: "Hapak atau masam ialah kulat. Plastik terbakar ialah elektrik — matikan. Bau kimia manis mungkin penyejuk — matikan dan buka tingkap." },
        { name: "Basuh penapis dan keringkan gegelung", text: "Jalankan Fan sahaja 30 minit dengan tingkap terbuka selepas penapis dibilas. Ini mengeringkan muka gegelung dan memberitahu sama ada bau hanya habuk permukaan." },
        { name: "Cuci gegelung dan blower bertekanan", text: `Kulat hidup pada bilah blower yang bilasan penapis tidak sampai. Cuci kimia dari ${wash} membunuhnya dalam satu lawatan untuk kebanyakan rumah.` },
        { name: "Bongkar unit dinding yang diabaikan jika bau kembali", text: `Jika bau kembali dalam beberapa minggu, biofilem di belakang gegelung. Overhaul kimia unit dinding dari ${overhaul}. Cassette dan jenis lain dikutip di tapak.` },
        { name: "Serah unit kering tanpa bau", text: "Kami jalankan Cool dan Fan selepas pasang semula dan hanya pulang bila angin bekalan berbau bersih." },
      ],
      answers: [
        { q: "Kenapa aircond saya berbau hapak atau stokin kotor?", a: `Bau itu kulat dan bakteria pada gegelung serta blower, bukan alat ganti rosak. Operasi harian tropika mengekalkan gegelung basah, jadi koloni membesar antara servis. Cuci kimia bertekanan dari ${wash} menghapusnya di kebanyakan rumah KL. Pembersih udara tidak merawat roda blower, jadi bau akan kembali.` },
        { q: "Bagaimana saya buang bau aircond?", a: `Basuh penapis, kemudian jalankan Fan sahaja untuk keringkan gegelung. Jika bau masih ada pada kitaran Cool seterusnya, tempah cuci kimia. WhatsApp KL Renovator klip 10 saat saat bau keluar. Bau terbakar atau gas manis ialah kerja berbeza — matikan dan nyatakan dalam mesej.` },
        { q: "Berapa kos buang bau aircond?", a: `Cuci kimia dari ${wash} untuk dinding 1.0–1.5 HP, ${P.chemicalWash25} untuk 2.0–2.5 HP, ${P.chemicalWashCassette15} untuk cassette 1.0–1.5 HP. Overhaul unit dinding dari ${overhaul} jika bau kembali dalam beberapa minggu. Diagnostik ${diag} dilepaskan bersama cucian.` },
        { q: "Adakah bau kulat aircond berbahaya?", a: `Spora yang beredar sepanjang hari memburukkan asma dan alergi, terutamanya kanak-kanak dan warga emas. Bukan alasan panik, tetapi jangan tunggu musim seterusnya. Cucian lebih murah daripada flare-up perubatan dan lebih murah daripada overhaul kemudian. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
      ],
    },
    zh: {
      howToHeading: "如何去除冷气霉味",
      howToName: "如何诊断并去除冷气霉味",
      howToDescription:
        "先洗过滤网、送风吹干，再消毒盘管与风轮。KL Renovator 在建议挂壁式大修前按此顺序处理。",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(wash),
      supply: ["可水洗过滤网", "食品级碱性清洗剂", "盘管抗菌喷剂"],
      tool: ["高压清洗泵", "风轮拉拔器", "湿度计"],
      steps: [
        { name: "分清霉味、焦味和化学味", text: "霉或酸是霉菌。塑料焦味是电气——关机。甜化学味可能是冷媒——关机并开窗。" },
        { name: "洗过滤网并用送风吹干盘管", text: "冲洗过滤网后，开窗以送风运行 30 分钟。这能吹干盘管表面，判断异味是否只是浮尘。" },
        { name: "高压清洗盘管与风轮", text: `霉长在过滤网冲不到的风叶上。化学清洗从 ${wash} 起，多数住宅一次上门就能去掉。` },
        { name: "异味很快回来再拆挂壁式", text: `若几周内味道回来，生物膜在盘管背面。挂壁式化学大修从 ${overhaul} 起，零件单独浸泡。卡式机和其他机型现场报价。` },
        { name: "交付无味、干燥的运行", text: "重装后先制冷再送风，出风无味才离开。" },
      ],
      answers: [
        { q: "为什么冷气有霉味或臭袜味？", a: `那是蒸发器和风轮上的霉菌与细菌，不是零件坏了。热带每天开机让盘管一直湿，两次保养之间菌落会长大。压力化学清洗从 ${wash} 起，吉隆坡多数家庭一次能去除。空气净化器碰不到风轮，味道还会回来。` },
        { q: "冷气异味怎么去掉？", a: `先洗过滤网，再用送风吹干盘管。下一次制冷仍有味道，就预约化学清洗。把开机出味的十秒视频发给 KL Renovator。焦味或甜气体味是另一类故障——先关机，并在消息里写清楚。` },
        { q: "去除冷气异味要多少钱？", a: `挂壁 1.0–1.5 HP 化学清洗从 ${wash} 起，2.0–2.5 HP 为 ${P.chemicalWash25}，1.0–1.5 HP 卡式机 ${P.chemicalWashCassette15}。几周内回味的挂壁式大修从 ${overhaul} 起。诊断费 ${diag}，连清洗一起做则免。` },
        { q: "冷气霉味对健康有害吗？", a: `全天循环的孢子会加重哮喘和过敏，小孩与老人更明显。不必惊慌，但不要再拖一个季节。清洗比一次发病便宜，也比日后大修便宜。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
      ],
    },
  },

  "aircond-freezing-up": {
    en: {
      howToHeading: "How to thaw a frozen aircond safely",
      howToName: "How to defrost and diagnose an aircond that is freezing up",
      howToDescription:
        "Fan-thaw first, never chip ice, then pressure and airflow checks — the sequence that protects the compressor.",
      totalTime: "PT2H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Towels for melt water", "Replacement filter if shredded", "Refrigerant if pressure is low"],
      tool: ["Manifold gauges", "Anemometer", "Leak detector"],
      steps: [
        { name: "Switch to Fan and catch the melt", text: "Do not chip ice. Fan-only for one to three hours melts the coil without thermal shock. Towels under the fascia catch the water." },
        { name: "Wash the filter once the ice is gone", text: "A blocked filter is the cheapest freeze cause. If the mesh is torn, replace it before restarting Cool." },
        { name: "Measure pressure after a full thaw", text: `Gauges on a frozen coil lie. After thaw, low pressure means a leak-checked top-up (${r22} / ${r32}). Normal pressure plus weak airflow means the coil or blower is blocked.` },
        { name: "Restore airflow or seal the leak", text: `Blocked coil: chemical wash from ${wash}, or wall-mounted overhaul from ${overhaul} if ice was thick. Leak: repair then charge. Never charge a still-icy system.` },
        { name: "Watch the first Cool cycle", text: "We restart Cool and watch the suction line for twenty minutes. Frost returning immediately means the root cause is still open." },
      ],
      answers: [
        { q: "Why is there ice on my aircond?", a: `Ice on the indoor coil means the surface is below freezing — either gas is low or almost no air is moving across the fins. Both starve the compressor of superheat. Switch to Fan, never scrape the ice, then book a diagnosis. Running Cool on a frozen coil can slug liquid back to the compressor.` },
        { q: "How do I fix an aircond that keeps freezing?", a: `Thaw on Fan for one to three hours, rinse the filter, then stop. The next step is a gauge reading on a fully clear coil. KL Renovator either leak-checks and tops up or washes the coil. WhatsApp a photo of the iced pipe before you thaw if you can — it helps us bring the right gas.` },
        { q: "How much does it cost to fix a freezing aircond?", a: `Thaw advice is free. After thaw, gas is ${r22} or ${r32} per PSI actually added. Chemical wash from ${wash}. Wall-mounted overhaul from ${overhaul} when the coil is packed solid. Diagnostic ${diag} waived with the repair. Same-day slots run across KL and Selangor once the part is on the van.` },
        { q: "Can I keep using a frozen aircond?", a: `No. Ice means liquid refrigerant is not finishing its job in the evaporator. That liquid can wreck the compressor, which costs ${compressor}. Fan-thaw, then call. A few hours without Cool is cheaper than a compressor. The signed job card lists the part and the price so nothing is left verbal.` },
      ],
    },
    ms: {
      howToHeading: "Langkah cairkan aircond beku dengan selamat",
      howToName: "Cara cair beku dan diagnosis aircond yang membeku",
      howToDescription:
        "Cair dengan kipas dahulu, jangan kikis ais, kemudian semak tekanan dan aliran udara.",
      totalTime: "PT2H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Tuala untuk air cair", "Penapis ganti jika koyak", "Penyejuk jika tekanan rendah"],
      tool: ["Manifold gauge", "Anemometer", "Pengesan bocor"],
      steps: [
        { name: "Tukar ke Fan dan tampung air cair", text: "Jangan kikis ais. Fan sahaja satu hingga tiga jam mencairkan gegelung tanpa kejutan haba. Tuala di bawah fascia menampung air." },
        { name: "Basuh penapis selepas ais hilang", text: "Penapis tersumbat ialah punca beku paling murah. Jika mesh koyak, ganti sebelum hidupkan Cool semula." },
        { name: "Ukur tekanan selepas cair sepenuhnya", text: `Tolok pada gegelung beku menipu. Selepas cair, tekanan rendah bermakna top-up selepas semak bocor (${r22} / ${r32}). Tekanan normal tetapi angin lemah bermakna gegelung atau blower tersumbat.` },
        { name: "Pulihkan aliran atau tutup bocor", text: `Gegelung tersumbat: cuci kimia dari ${wash}, atau overhaul dinding dari ${overhaul} jika ais tebal. Bocor: baiki kemudian cas. Jangan cas sistem yang masih berais.` },
        { name: "Pantau kitaran Cool pertama", text: "Kami hidupkan Cool dan pantau paip sedutan dua puluh minit. Fros kembali serta-merta bermakna punca masih terbuka." },
      ],
      answers: [
        { q: "Kenapa ada ais pada aircond saya?", a: `Ais pada gegelung dalam bermakna permukaan di bawah takat beku — sama ada gas rendah atau hampir tiada udara merentas sirip. Kedua-duanya merampas superheat pekali. Tukar ke Fan, jangan kikis ais, kemudian tempah diagnosis. Menjalankan Cool pada gegelung beku boleh menolak cecair kembali ke pekali.` },
        { q: "Bagaimana saya baiki aircond yang selalu membeku?", a: `Cairkan dengan Fan satu hingga tiga jam, bilas penapis, kemudian berhenti. Langkah seterusnya ialah bacaan tolok pada gegelung yang sudah jelas. KL Renovator sama ada semak bocor dan top-up, atau cuci gegelung. WhatsApp foto paip berais sebelum cair jika sempat — kami bawa gas yang betul.` },
        { q: "Berapa kos membaiki aircond yang membeku?", a: `Nasihat cair percuma. Selepas cair, gas ${r22} atau ${r32} seunit PSI yang ditambah. Cuci kimia dari ${wash}. Overhaul unit dinding dari ${overhaul} bila gegelung padat. Diagnostik ${diag} dilepaskan dengan pembaikan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bolehkah saya terus guna aircond yang beku?", a: `Tidak. Ais bermakna penyejuk cecair belum siap kerja dalam penyejat. Cecair itu boleh merosakkan pekali, yang berharga ${compressor}. Cair dengan Fan, kemudian telefon. Beberapa jam tanpa sejuk lebih murah daripada pekali. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何安全化解冷气结冰",
      howToName: "如何化冻并诊断结冰的冷气",
      howToDescription:
        "先送风化冻，不要铲冰，再测压力与风量。这个顺序保护压缩机。",
      totalTime: "PT2H",
      estimatedCostValue: priceAmount(wash),
      supply: ["接化冻水的毛巾", "破损时更换的过滤网", "压力低时的制冷剂"],
      tool: ["歧管表", "风速仪", "检漏仪"],
      steps: [
        { name: "改送风并接住化冻水", text: "不要铲冰。单独送风一到三小时可化开盘管，避免热冲击。面板下垫毛巾。" },
        { name: "冰化完再洗过滤网", text: "过滤网堵是最便宜的结冰原因。网破了先换，再开制冷。" },
        { name: "完全化冻后再测压力", text: `结冰盘管上的表不可信。化冻后低压就要检漏再充（${r22} / ${r32}）。压力正常但风弱，是盘管或风轮堵了。` },
        { name: "恢复风量或修好漏点", text: `盘管堵：化学清洗从 ${wash} 起；冰很厚的挂壁式大修从 ${overhaul} 起。泄漏：先修再充。不要给还结着冰的系统充气。` },
        { name: "观察第一次制冷", text: "重新制冷并看吸气管二十分钟。霜马上回来，说明根因还在。" },
      ],
      answers: [
        { q: "为什么冷气会结冰？", a: `室内盘管结冰，说明表面低于冰点——不是气少，就是翅片几乎没有风。两种情况都让压缩机吃不到过热蒸汽。改送风，不要铲冰，然后预约诊断。对着结冰盘管继续制冷，液态冷媒可能打回压缩机。` },
        { q: "冷气反复结冰怎么办？", a: `先送风化一到三小时，冲洗过滤网，然后停机。下一步是在盘管完全干净后读表。KL Renovator 要么检漏充气，要么清洗盘管。若来得及，化冻前把结冰铜管照片发过来——我们好带对气体。` },
        { q: "修结冰冷气要多少钱？", a: `化冻建议免费。化冻后按实际增加的 PSI 计：${r22} 或 ${r32}。化学清洗从 ${wash} 起。盘管冻实的挂壁式大修从 ${overhaul} 起。诊断费 ${diag}，维修则免。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "结冰的冷气还能继续开吗？", a: `不能。结冰表示液态冷媒没在蒸发器里走完流程，可能打坏压缩机，费用是 ${compressor}。先送风化开，再打电话。少吹几小时冷气，比换压缩机便宜。 签字工单会写明零件和价格，不靠口头约定。` },
      ],
    },
  },

  "aircond-low-gas": {
    en: {
      howToHeading: "How to tell if an aircond is low on gas",
      howToName: "How to confirm low refrigerant and top up correctly",
      howToDescription:
        "Symptom check, oil-stain scan, then manifold reading and leak test before any gram of gas is added.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(r32),
      supply: ["Correct refrigerant cylinder", "Valve cores", "Flare nuts if the joint is weeping"],
      tool: ["Manifold gauges", "Electronic leak detector", "Vacuum pump"],
      steps: [
        { name: "List the cooling symptoms", text: "Warm air, longer pull-down, ice on the indoor pipe and a climbing TNB bill together point at low charge. Sudden failure after years of good cooling points at a new leak." },
        { name: "Look for oil at the flares", text: "Oily dust on a flare or Schrader is a leak marker. Photograph it before anyone wipes the joint." },
        { name: "Read standing and running pressures", text: `KL Renovator compares both against the nameplate for that HP and gas type. We do not add gas by 'feel'.` },
        { name: "Find the leak before charging", text: `Electronic sniffer plus bubble test. A repeat annual top-up without a leak repair is wasted money. Leak repair is ${leak}; gas remains ${r22}, ${r410} or ${r32} per PSI.` },
        { name: "Charge to spec and hold vacuum if the circuit was opened", text: "After a joint is remade we evacuate to 500 microns, then weigh or pressure-charge to the manufacturer's figure and retest cooling delta-T." },
      ],
      answers: [
        { q: "How do I know if my aircond is low on gas?", a: `Warm supply, ice on the small copper, and a unit that never quite reaches set-point are the classic trio. A one-off loss after many quiet years can be slow permeation; needing gas every season is a leak. Only a manifold reading proves it — you cannot see charge level from the airflow alone.` },
        { q: "How do you top up aircond gas in KL?", a: `We leak-check first, repair if needed, then add the matching refrigerant to the nameplate pressure. R22, R410A and R32 are not interchangeable. DIY kits routinely overcharge and wash oil out of the compressor. Book KL Renovator and send the outdoor nameplate photo so the van carries the right cylinder.` },
        { q: "How much is aircond gas top-up?", a: `${r22} for R22, ${r410} for R410A, ${r32} for R32, billed on the PSI actually added after inspection. Leak repair is ${leak} per leak. Diagnostic ${diag} is waived when we charge or repair the same visit. Diagnostic is waived when the repair is completed on the same visit.` },
        { q: "How often should an aircond need gas?", a: `A tight system should not need a seasonal top-up. Refrigerant is not a consumable. If you have paid for gas two years running, insist on a leak search before anyone opens a cylinder again. Ask for the confirmed figure on WhatsApp before anyone opens the cabinet.` },
      ],
    },
    ms: {
      howToHeading: "Langkah kenal pasti aircond rendah gas",
      howToName: "Cara sahkan penyejuk rendah dan top-up dengan betul",
      howToDescription:
        "Semak gejala, kesan minyak, bacaan manifold dan ujian bocor sebelum sebarang gram gas ditambah.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(r32),
      supply: ["Silinder penyejuk yang betul", "Teras injap", "Nat flare jika sendi menangis"],
      tool: ["Manifold gauge", "Pengesan bocor elektronik", "Pam vakum"],
      steps: [
        { name: "Senaraikan gejala penyejukan", text: "Angin suam, masa sejuk lebih lama, ais pada paip dalam dan bil TNB menaik bersama menunjuk cas rendah. Gagal tiba-tiba selepas bertahun sejuk elok menunjuk bocor baru." },
        { name: "Cari minyak pada flare", text: "Habuk berminyak pada flare atau Schrader ialah penanda bocor. Gambar sebelum sesiapa sapu sendi." },
        { name: "Baca tekanan statik dan berjalan", text: "KL Renovator bandingkan kedua-duanya dengan plat nama untuk HP dan jenis gas itu. Kami tidak menambah gas ikut 'rasa'." },
        { name: "Cari bocor sebelum mengecas", text: `Penghidu elektronik plus ujian buih. Top-up tahunan berulang tanpa baiki bocor membuang wang. Baiki bocor ${leak}; gas kekal ${r22}, ${r410} atau ${r32} seunit PSI.` },
        { name: "Cas mengikut spesifikasi dan tahan vakum jika litar dibuka", text: "Selepas sendi dibuat semula kami evakuasi ke 500 mikron, kemudian timbang atau tekan cas ke angka pengeluar dan uji semula delta-T." },
      ],
      answers: [
        { q: "Bagaimana saya tahu aircond rendah gas?", a: `Angin suam, ais pada paip tembaga kecil, dan unit yang tidak pernah benar-benar sampai set-point ialah trio klasik. Kehilangan sekali selepas bertahun senyap boleh jadi resapan perlahan; perlukan gas setiap musim ialah bocor. Hanya bacaan manifold membuktikannya — anda tidak nampak paras cas daripada aliran udara semata-mata.` },
        { q: "Bagaimana KL Renovator top-up gas aircond?", a: `Kami semak bocor dahulu, baiki jika perlu, kemudian tambah penyejuk sepadan ke tekanan plat nama. R22, R410A dan R32 tidak boleh ditukar ganti. Kit DIY kerap terlebih cas dan basuh minyak keluar dari pekali. Tempah KL Renovator dan hantar foto plat nama luar supaya van bawa silinder yang betul.` },
        { q: "Berapa harga top-up gas aircond?", a: `${r22} untuk R22, ${r410} untuk R410A, ${r32} untuk R32, dibilkan pada PSI yang benar-benar ditambah selepas pemeriksaan. Baiki bocor ${leak} setiap bocor. Diagnostik ${diag} dilepaskan bila kami cas atau baiki lawatan sama. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kerap aircond patut perlu gas?", a: `Sistem ketat tidak patut perlu top-up bermusim. Penyejuk bukan bahan habis. Jika anda sudah bayar gas dua tahun berturut-turut, desak carian bocor sebelum sesiapa buka silinder lagi. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan, termasuk PSI sebenar yang ditambah.` },
      ],
    },
    zh: {
      howToHeading: "如何判断冷气是否缺气",
      howToName: "如何确认制冷剂不足并正确充气",
      howToDescription:
        "先看症状和油渍，再读表、检漏，最后才加任何一克气体。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(r32),
      supply: ["对应冷媒钢瓶", "气门芯", "渗漏时的喇叭口螺母"],
      tool: ["歧管表", "电子检漏仪", "真空泵"],
      steps: [
        { name: "列出制冷症状", text: "出风暖、降温变慢、室内小管结冰、电费往上走，合在一起指向缺气。多年正常后突然不行，多半是新漏点。" },
        { name: "看喇叭口是否有油", text: "喇叭口或气门芯上的油灰是漏点标记。擦掉之前先拍照。" },
        { name: "读取静止与运行压力", text: "KL Renovator 对照该匹数和气体的铭牌，不凭手感加气。" },
        { name: "充气前先找到漏点", text: `电子嗅探加肥皂泡。每年加气却不修漏是浪费。修漏 ${leak}；气体仍按 PSI 计，${r22}、${r410} 或 ${r32}。` },
        { name: "按规范充注，开过系统则抽真空", text: "接头重做后抽到 500 微米，再按厂家数据称重或定压充注，并复测送回风温差。" },
      ],
      answers: [
        { q: "怎么知道冷气是不是缺气？", a: `出风偏暖、细铜管结冰、温度总差一点到设定值，是最典型的组合。安静多年后偶尔掉一点，可能是缓慢渗透；每个季节都要加气，就是泄漏。只有歧管表能证实——单看出风感觉不到真实充注量。` },
        { q: "吉隆坡怎样给冷气充气？", a: `我们先检漏，该修先修，再按铭牌压力加对应冷媒。R22、R410A、R32 不能混用。自制充气罐经常加过头，把压缩机油冲走。预约 KL Renovator，并发送室外机铭牌照片，车上好带对钢瓶。` },
        { q: "冷气充气多少钱？", a: `R22 ${r22}，R410A ${r410}，R32 ${r32}，按检查后实际增加的 PSI 计。修漏每个漏点 ${leak}。同次充气或维修则免收诊断费 ${diag}。 同一次上门做完维修，诊断费就免除。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "冷气多久需要加一次气？", a: `密封良好的系统不该季节性补气。制冷剂不是耗材。若连续两年都在加气，下一次开瓶前必须先查漏。 开工前先在 WhatsApp 确认数字，再打开机壳。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-gas-leak": {
    en: {
      howToHeading: "How to find an aircond gas leak",
      howToName: "How to locate and seal an aircond refrigerant leak",
      howToDescription:
        "Repeat-failure pattern, oil-stain map, electronic sniff and pressure-decay — then repair and vacuum before recharge.",
      totalTime: "PT1H30M",
      estimatedCostValue: priceAmount(leak),
      supply: ["Flare nuts and valve cores", "Brazing rod if a pinhole is found", "Matching refrigerant"],
      tool: ["Electronic leak detector", "Soap solution", "Vacuum pump and micron gauge"],
      steps: [
        { name: "Confirm the repeat pattern", text: "Cooling that dies weeks after a top-up is a leak, not 'used-up' gas. Bring the last job card if you have one." },
        { name: "Map oil stains along the copper", text: "Oil travels with refrigerant. Stains at indoor flares, outdoor valves or mid-wall copper mark the search start." },
        { name: "Sniff and bubble-test every joint", text: "KL Renovator walks the loop with an electronic detector, then confirms suspects with soap. Hidden micro-leaks get a pressure-decay hold." },
        { name: "Seal, evacuate, then charge", text: `We re-flare, replace a core, or braze the pinhole, pull 500 microns, then recharge. Leak repair is ${leak}; gas is billed separately at ${r22}, ${r410} or ${r32}.` },
        { name: "Hold a post-repair pressure test", text: "The job is not done until standing pressure holds and Cool produces a normal supply-return split." },
      ],
      answers: [
        { q: "How do I know my aircond has a gas leak?", a: `The giveaway is cooling that fades again a few weeks after a top-up. Ice on the copper, a hiss at the outdoor valves, or oily dust on a flare are the other tells. Natural loss over a decade looks different from a seasonal refill habit. Treat repeat top-ups as a leak until a detector says otherwise.` },
        { q: "How do you repair an aircond gas leak?", a: `Find the point, seal it, vacuum, then charge. Skipping the first two steps is how customers pay for gas twice. KL Renovator uses an electronic sniffer and a bubble test, then quotes the joint before lighting a torch. Most flare and valve leaks finish the same day.` },
        { q: "How much does aircond leak repair cost?", a: `Finding the leak is included in the ${diag} diagnostic, waived with repair. Sealing is ${leak} per leak. Recharge is extra at ${r22}, ${r410} or ${r32} per PSI. Extensive coil corrosion may need an indoor-unit discussion, not another patch — we say so before work.` },
        { q: "Can a gas leak be fixed without replacing the whole aircond?", a: `Usually yes. Flare joints, Schrader cores and short copper runs are everyday seals. We only talk replacement when formicary corrosion has peppered a large coil. You get that recommendation in writing with the quote, not after the old unit is already on the van.` },
      ],
    },
    ms: {
      howToHeading: "Langkah cari kebocoran gas aircond",
      howToName: "Cara kesan dan tutup kebocoran penyejuk aircond",
      howToDescription:
        "Corak gagal berulang, peta kesan minyak, penghidu elektronik dan ujian reput tekanan — kemudian baiki dan vakum sebelum cas semula.",
      totalTime: "PT1H30M",
      estimatedCostValue: priceAmount(leak),
      supply: ["Nat flare dan teras injap", "Rod pateri jika lubang jarum dijumpai", "Penyejuk sepadan"],
      tool: ["Pengesan bocor elektronik", "Larutan sabun", "Pam vakum dan tolok mikron"],
      steps: [
        { name: "Sahkan corak berulang", text: "Penyejukan yang mati semula beberapa minggu selepas top-up ialah bocor, bukan gas 'habis digunakan'. Bawa kad kerja lama jika ada." },
        { name: "Peta kesan minyak sepanjang tembaga", text: "Minyak bergerak bersama penyejuk. Kesan pada flare dalam, injap luar atau tembaga tengah dinding menanda permulaan carian." },
        { name: "Hidu dan uji buih setiap sendi", text: "KL Renovator jalan gelung dengan pengesan elektronik, kemudian sahkan dengan sabun. Bocor mikro tersembunyi dapat ujian tahan reput tekanan." },
        { name: "Tutup, evakuasi, kemudian cas", text: `Kami flare semula, ganti teras, atau pateri lubang jarum, tarik 500 mikron, kemudian cas. Baiki bocor ${leak}; gas dibil berasingan pada ${r22}, ${r410} atau ${r32}.` },
        { name: "Tahan ujian tekanan selepas baiki", text: "Kerja belum siap sehingga tekanan statik tahan dan Cool menghasilkan beza bekalan-pulangan yang normal." },
      ],
      answers: [
        { q: "Bagaimana saya tahu aircond bocor gas?", a: `Tanda paling jelas ialah penyejukan yang pudar semula beberapa minggu selepas top-up. Ais pada tembaga, desisan di injap luar, atau habuk berminyak pada flare ialah petunjuk lain. Kehilangan semula jadi selepas sedekad nampak berbeza daripada tabiat isi semula setiap musim. Anggap top-up berulang sebagai bocor sehingga pengesan kata sebaliknya.` },
        { q: "Bagaimana KL Renovator baiki kebocoran gas?", a: `Cari titik, tutup, vakum, kemudian cas. Melangkau dua langkah pertama sebab pelanggan bayar gas dua kali. Kami guna penghidu elektronik dan ujian buih, kemudian sebut harga sendi sebelum nyalakan torch. Kebanyakan bocor flare dan injap siap hari sama. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos membaiki kebocoran gas aircond?", a: `Mencari bocor termasuk dalam diagnostik ${diag}, dilepaskan dengan pembaikan. Penutupan ${leak} setiap bocor. Cas semula tambahan pada ${r22}, ${r410} atau ${r32} seunit PSI. Kakisan gegelung meluas mungkin perlu perbincangan unit dalam, bukan tampalan lagi — kami kata sebelum kerja. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Bolehkah bocor gas dibaiki tanpa ganti seluruh aircond?", a: `Biasanya boleh. Sendi flare, teras Schrader dan paip tembaga pendek ialah tutupan harian. Kami hanya cakap ganti unit bila kakisan formikari sudah merintang gegelung besar. Cadangan itu diberi bertulis bersama sebut harga, bukan selepas unit lama sudah di van. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
      ],
    },
    zh: {
      howToHeading: "如何查找冷气漏气点",
      howToName: "如何定位并封住冷气制冷剂泄漏",
      howToDescription:
        "先看反复失效、油渍位置，再用电子检漏和保压，最后抽真空再充气。",
      totalTime: "PT1H30M",
      estimatedCostValue: priceAmount(leak),
      supply: ["喇叭口螺母与气门芯", "针孔时的焊条", "对应冷媒"],
      tool: ["电子检漏仪", "肥皂水", "真空泵与微米表"],
      steps: [
        { name: "确认反复失效的规律", text: "充气后几周又不行，是泄漏，不是气体被“用完”。有旧工单请带上。" },
        { name: "沿铜管标出油渍", text: "油会跟着冷媒走。室内喇叭口、室外阀门或墙内铜管上的油渍，就是搜查起点。" },
        { name: "对每个接头嗅探并做肥皂泡", text: "KL Renovator 用电子仪走完整圈，可疑点再用肥皂确认。隐蔽微漏做保压。" },
        { name: "密封、抽真空，再充注", text: `重做喇叭口、换气门芯或钎焊针孔，抽到 500 微米再充。修漏 ${leak}；气体另按 ${r22}、${r410} 或 ${r32} 计。` },
        { name: "维修后保压", text: "静止压力稳住、制冷温差正常，工单才算完成。" },
      ],
      answers: [
        { q: "怎么判断冷气在漏气？", a: `最明显的是加气后几周制冷又掉下去。铜管结冰、室外阀嘶嘶响、喇叭口油灰，都是旁证。用了十年才慢慢变弱，和每个季节都要加气，不是一回事。在检漏仪说“没有”之前，把反复加气都当成泄漏。` },
        { q: "冷气漏气怎么修？", a: `找到点、封住、抽真空、再充气。跳过前两步，就是让客户付两次气钱。KL Renovator 用电子嗅探和肥皂泡，点火之前先报这个接头的价。多数喇叭口和气门芯当天能做完。` },
        { q: "修冷气漏气要多少钱？", a: `找漏包含在诊断费 ${diag} 里，维修则免。封漏每个点 ${leak}。再充气另计，${r22}、${r410} 或 ${r32} 每 PSI。盘管大面积蚁巢腐蚀会讨论换室内机，而不是再打补丁——开工前说明。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "漏气一定要换整机吗？", a: `通常不用。喇叭口、气门芯和短铜管是日常可修的。只有蚁巢腐蚀把大片盘管打出许多针孔时，我们才谈换机。这个建议会写在报价上，不会等旧机器已经搬上车才说。` },
      ],
    },
  },

  "aircond-compressor-problem": {
    en: {
      howToHeading: "How to check an aircond compressor that will not start",
      howToName: "How to diagnose a humming or silent aircond compressor",
      howToDescription:
        "Capacitor first, then windings and contactor — the cheap-to-dear sequence that stops unnecessary compressor quotes.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["Start/run capacitor", "Contactor if burnt", "Compressor only after windings fail"],
      tool: ["Multimeter", "Clamp meter", "Capacitance meter"],
      steps: [
        { name: "Listen: hum, click, or silence", text: "A hum without spin is the classic dead capacitor. Total silence with a live indoor display is often the contactor or a tripped overload." },
        { name: "Stop cycling the breaker", text: "Repeated on/off on a locked rotor cooks the windings. Isolate the outdoor isolator and wait for the visit." },
        { name: "Measure the capacitor and current", text: `KL Renovator checks microfarads against the printed rating and reads start amps. Out-of-spec capacitor: ${cap}, usually same-day.` },
        { name: "Megger the windings before condemning the shell", text: `Open or shorted windings mean a compressor quote (${compressor}). We put that number next to a new-unit price so you can choose.` },
        { name: "Test-run and recheck amps", text: "After any swap we run Cool and confirm the outdoor fan and compressor current sit inside the nameplate band." },
      ],
      answers: [
        { q: "Why is my aircond compressor not starting?", a: `The most common reason is a failed start capacitor, not a dead compressor. The outdoor unit hums, the fan may twitch, and nothing spins. A burnt contactor or a hot overload can look the same from the living room. KL Renovator tests the cheap parts first so you are not sold a ${compressor} job you do not need.` },
        { q: "How do you diagnose a compressor fault?", a: `Capacitor microfarads, winding resistance, contactor continuity, then running amps. That order takes minutes and saves thousands. WhatsApp the brand, HP and whether you hear a hum. Bring the outdoor isolator off if the unit has been tripping. Same-day slots run across KL and Selangor once the part is on the van.` },
        { q: "How much is compressor repair versus replacement?", a: `Capacitor ${cap}. Contactor ${contactor}. A full compressor is ${compressor} and is quoted only after the windings fail the test. On units older than eight years we also show a new installation from ${P.installWall15} so the maths is honest. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Should I replace the compressor or the whole aircond?", a: `If the compressor quote is more than about 60 percent of a new installed unit, replacement usually wins. We put both numbers on the same WhatsApp thread. No one is paid extra to push the bigger ticket. Diagnostic is waived when the repair is completed on the same visit.` },
      ],
    },
    ms: {
      howToHeading: "Langkah semak pekali aircond yang tidak mahu hidup",
      howToName: "Cara diagnosis pekali yang berdengung atau senyap",
      howToDescription:
        "Kapasitor dahulu, kemudian belitan dan kontaktor — urutan murah ke mahal yang menghalang sebut harga pekali yang tidak perlu.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["Kapasitor mula/jalan", "Kontaktor jika terbakar", "Pekali hanya selepas belitan gagal"],
      tool: ["Multimeter", "Clamp meter", "Meter kapasitans"],
      steps: [
        { name: "Dengar: dengung, klik, atau senyap", text: "Dengung tanpa pusing ialah kapasitor mati klasik. Senyap sepenuhnya dengan paparan dalam hidup sering kontaktor atau overload terjatuh." },
        { name: "Berhenti kitar breaker", text: "Hidup-mati berulang pada rotor terkunci memasak belitan. Asingkan isolator luar dan tunggu lawatan." },
        { name: "Ukur kapasitor dan arus", text: `KL Renovator semak mikrofarad berbanding rating tercetak dan baca amp mula. Kapasitor luar spesifikasi: ${cap}, biasanya hari sama.` },
        { name: "Megger belitan sebelum hukum casis", text: `Belitan terbuka atau pintas bermakna sebut harga pekali (${compressor}). Kami letak nombor itu di sebelah harga unit baru supaya anda boleh pilih.` },
        { name: "Uji jalan dan semak semula amp", text: "Selepas sebarang tukaran kami jalankan Cool dan sahkan kipas luar serta arus pekali duduk dalam jalur plat nama." },
      ],
      answers: [
        { q: "Kenapa pekali aircond saya tidak mahu hidup?", a: `Sebab paling biasa ialah kapasitor mula rosak, bukan pekali mati. Unit luar berdengung, kipas mungkin tersentak, dan tiada yang berpusing. Kontaktor terbakar atau overload panas nampak sama dari ruang tamu. KL Renovator uji alat murah dahulu supaya anda tidak dijual kerja ${compressor} yang tidak perlu.` },
        { q: "Bagaimana KL Renovator diagnosis kerosakan pekali?", a: `Mikrofarad kapasitor, rintangan belitan, kesinambungan kontaktor, kemudian amp berjalan. Tertib itu mengambil minit dan menjimatkan ribuan. WhatsApp jenama, HP dan sama ada anda dengar dengung. Matikan isolator luar jika unit sudah trip. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Berapa beza baiki pekali dengan ganti?", a: `Kapasitor ${cap}. Kontaktor ${contactor}. Pekali penuh ${compressor} dan hanya dikutip selepas belitan gagal ujian. Pada unit lebih delapan tahun kami juga tunjuk pemasangan baru dari ${P.installWall15} supaya kira-kira jujur. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Patutkah saya ganti pekali atau seluruh aircond?", a: `Jika sebut harga pekali lebih kurang 60 peratus daripada unit baru terpasang, ganti unit biasanya menang. Kami letak kedua-dua nombor dalam thread WhatsApp yang sama. Tiada siapa dibayar lebih untuk menolak tiket lebih besar. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
      ],
    },
    zh: {
      howToHeading: "如何检查不启动的冷气压缩机",
      howToName: "如何诊断嗡嗡响或完全无声的压缩机",
      howToDescription:
        "先电容，再绕组和接触器。这个由便宜到贵的顺序，避免不必要的压缩机报价。",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["启动/运行电容", "烧蚀时的接触器", "绕组损坏才换的压缩机"],
      tool: ["万用表", "钳形表", "电容表"],
      steps: [
        { name: "听：嗡嗡、咔嗒还是全静", text: "嗡嗡不转是典型电容死亡。室内屏亮着而室外全静，多半是接触器或过载跳了。" },
        { name: "不要反复跳闸复位", text: "转子抱死时反复开关会煮坏绕组。先拉室外隔离开关，等技师。" },
        { name: "测量电容和电流", text: `KL Renovator 对照印刷额定值查微法，并读启动电流。电容超差：${cap}，通常当天能换。` },
        { name: "给绕组做绝缘测试再定罪", text: `开路或短路才报压缩机（${compressor}）。我们会把这个数字和新机安装价放在一起，让你选。` },
        { name: "试运行并复查电流", text: "任何更换后都开制冷，确认室外风扇和压缩机电流落在铭牌范围内。" },
      ],
      answers: [
        { q: "为什么冷气压缩机不启动？", a: `最常见的是启动电容坏了，不是压缩机报废。室外机嗡嗡、风扇可能抖一下，然后什么都不转。烧蚀的接触器或过热保护，在客厅听起来也一样。KL Renovator 先测便宜件，避免把你卖进不需要的 ${compressor} 工程。` },
        { q: "怎样判断是不是压缩机坏了？", a: `电容微法、绕组电阻、接触器通断，再看运行电流。这套顺序只要几分钟，能省下几千。把品牌、匹数和是否有嗡嗡声发到 WhatsApp。若一直跳闸，先关掉室外隔离开关。 同一次上门做完维修，诊断费就免除。` },
        { q: "修压缩机和换压缩机差多少钱？", a: `电容 ${cap}。接触器 ${contactor}。整只压缩机 ${compressor}，只有绕组测试失败才报价。八年以上的机器，我们同时给出从 ${P.installWall15} 起的新机安装，让账算得明白。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "该换压缩机还是换整机？", a: `压缩机报价超过新机安装价大约六成，通常换整机更划算。两个数字会出现在同一条 WhatsApp 里。没有人因为推大单而多拿钱。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-pcb-problem": {
    en: {
      howToHeading: "How to read an aircond PCB fault",
      howToName: "How to diagnose a faulty aircond control board",
      howToDescription:
        "Blink count, sensor check, then board voltages — so a $15 sensor is not sold as a $500 PCB.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(pcb),
      supply: ["OEM or quality-compatible PCB", "Sensors and relays if the board is healthy", "Insect-proof board cover"],
      tool: ["Multimeter", "Brand error-code chart", "Hot-air station for single-component repair"],
      steps: [
        { name: "Count the blinks and note the colour", text: "Daikin, Panasonic and Mitsubishi all speak different blink languages. A ten-second video is enough for a remote first pass." },
        { name: "Rule out the remote and a dirty thermistor", text: `Fresh batteries and a clean sensor bead fix a surprising number of 'dead PCB' calls. Sensor replacement is ${sensor}.` },
        { name: "Read board voltages and the stored code", text: "KL Renovator puts the unit in diagnostic mode or decodes the LED. We then probe rails and relays, not the whole board at once." },
        { name: "Repair a single part or replace the board", text: `A cooked relay or capacitor on the PCB can be cheaper than a full board. A burnt outdoor inverter board is ${pcb} and is sourced before we pull the old one.` },
        { name: "Surge-protect and insect-proof on the way out", text: "Malaysian storms and ants kill boards. We refit covers and mention a surge device when the history matches." },
      ],
      answers: [
        { q: "How do I know if my aircond PCB is faulty?", a: `Random shutdowns, a remote that works on camera but not on the unit, or a blink code that returns after a ten-minute power cut all point at the board or a sensor feeding it. The board is guilty only after those sensors and the loom have been checked. Guessing PCB first is how bills jump to ${pcb} for a ${sensor} fault.` },
        { q: "How do you fix an aircond PCB problem?", a: `Read the code, test the thermistors, then the rails. Sometimes one relay is enough. When the inverter section is burnt we quote a matching board and only then disconnect the old one. Same-day is common for indoor boards we stock; outdoor inverter boards may be next-day.` },
        { q: "How much does PCB replacement cost?", a: `Boards run ${pcb} depending on brand and indoor versus outdoor. Sensor-only jobs are ${sensor}. Diagnostic ${diag} is waived with the repair. You see the part number and the price before we order. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Can a power surge damage the PCB?", a: `Yes. Afternoon thunderstorms are a regular PCB killer in the Klang Valley. If the board has died after a storm we talk about a surge device as well as the replacement, so the new board is not the next casualty.` },
      ],
    },
    ms: {
      howToHeading: "Langkah baca kerosakan PCB aircond",
      howToName: "Cara diagnosis papan kawalan aircond yang rosak",
      howToDescription:
        "Kira kelip, semak sensor, kemudian voltan papan — supaya sensor murah tidak dijual sebagai PCB mahal.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(pcb),
      supply: ["PCB OEM atau serasi berkualiti", "Sensor dan geganti jika papan sihat", "Penutup papan kalis semut"],
      tool: ["Multimeter", "Carta kod ralat jenama", "Stesen udara panas untuk baiki komponen tunggal"],
      steps: [
        { name: "Kira kelip dan catat warna", text: "Daikin, Panasonic dan Mitsubishi cakap bahasa kelip berbeza. Video sepuluh saat cukup untuk semakan jauh pertama." },
        { name: "Singkir remote dan termistor kotor", text: `Bateri baharu dan manik sensor bersih menyelesaikan ramai panggilan 'PCB mati'. Ganti sensor ${sensor}.` },
        { name: "Baca voltan papan dan kod tersimpan", text: "KL Renovator masukkan unit ke mod diagnostik atau nyahkod LED. Kami kemudian usik rel dan geganti, bukan seluruh papan sekali gus." },
        { name: "Baiki satu bahagian atau ganti papan", text: `Geganti atau kapasitor terbakar pada PCB boleh lebih murah daripada papan penuh. Papan inverter luar terbakar ialah ${pcb} dan dipesan sebelum kami cabut yang lama.` },
        { name: "Lindungi lonjakan dan semut sebelum pulang", text: "Ribut Malaysia dan semut membunuh papan. Kami pasang semula penutup dan sebut peranti lonjakan bila sejarah sepadan." },
      ],
      answers: [
        { q: "Bagaimana saya tahu PCB aircond rosak?", a: `Mati rawak, remote yang hidup pada kamera tetapi tidak pada unit, atau kod kelip yang kembali selepas potong kuasa sepuluh minit semuanya menunjuk papan atau sensor yang memberinya makan. Papan bersalah hanya selepas sensor dan loom disemak. Meneka PCB dahulu sebab bil melonjak ke ${pcb} untuk kerosakan ${sensor}.` },
        { q: "Bagaimana KL Renovator baiki masalah PCB?", a: `Baca kod, uji termistor, kemudian rel. Kadang-kadang satu geganti sudah cukup. Bila bahagian inverter terbakar kami sebut harga papan sepadan dan hanya kemudian cabut yang lama. Hari sama biasa untuk papan dalam yang kami stok; papan inverter luar mungkin esok.` },
        { q: "Berapa kos ganti PCB?", a: `Papan dalam julat ${pcb} bergantung jenama dan dalam berbanding luar. Kerja sensor sahaja ${sensor}. Diagnostik ${diag} dilepaskan dengan pembaikan. Anda nampak nombor bahagian dan harga sebelum kami pesan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bolehkah lonjakan kuasa rosakkan PCB?", a: `Ya. Ribut petir petang pembunuh PCB biasa di Lembah Klang. Jika papan mati selepas ribut kami cakap tentang peranti lonjakan bersama gantian, supaya papan baru bukan mangsa seterusnya. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何判断冷气电路板故障",
      howToName: "如何诊断冷气控制板故障",
      howToDescription:
        "先数闪灯、查传感器，再测板电压，避免把一只传感器卖成一块贵电路板。",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(pcb),
      supply: ["原厂或优质兼容 PCB", "主板正常时的传感器与继电器", "防蚁盖板"],
      tool: ["万用表", "品牌故障代码表", "单件维修用热风台"],
      steps: [
        { name: "数闪烁次数并记下颜色", text: "大金、松下、三菱的闪灯语言不同。十秒视频就够做第一次远程判断。" },
        { name: "先排除遥控和脏热敏电阻", text: `换新电池、擦干净探头，能解决不少“主板死了”的电话。传感器更换 ${sensor}。` },
        { name: "读板电压和存储代码", text: "KL Renovator 进诊断模式或解读 LED，再测电源轨和继电器，不会整板一起猜。" },
        { name: "修单个元件或换板", text: `板上烧蚀的继电器或电容，往往比整板便宜。室外变频板烧了是 ${pcb}，先订货再拆旧板。` },
        { name: "出门前做好防浪涌和防蚁", text: "马来西亚雷雨和蚂蚁都会杀板。我们装回盖板，病史对得上就建议加浪涌保护。" },
      ],
      answers: [
        { q: "怎么知道是冷气电路板坏了？", a: `随机关机、遥控在摄像头里会亮但机器不理、断电十分钟代码又回来，都指向主板或给它信号的传感器。只有查过探头和线束，才能给主板定罪。先猜 PCB，账单就会从 ${sensor} 的故障跳到 ${pcb}。` },
        { q: "电路板问题怎么修？", a: `读代码、测热敏电阻，再测电源轨。有时换一只继电器就够。变频部分烧了，先报对应板价，再拆旧板。库存室内板常能当天换；室外变频板可能次日到。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "换冷气电路板多少钱？", a: `视品牌和室内外，主板在 ${pcb}。只换传感器是 ${sensor}。诊断费 ${diag}，维修则免。订货前你会看到料号和价格。 签字工单会写明零件和价格，不靠口头约定。 同一次上门做完维修，诊断费就免除。` },
        { q: "电涌会打坏电路板吗？", a: `会。吉隆坡谷下午雷雨是电路板的常客。若板子是雷雨后死的，我们会连浪涌保护和换板一起谈，免得新板成为下一个牺牲品。 同一次上门做完维修，诊断费就免除。` },
      ],
    },
  },

  "aircond-fan-not-working": {
    en: {
      howToHeading: "How to fix an aircond fan that is not spinning",
      howToName: "How to diagnose a dead indoor or outdoor aircond fan",
      howToDescription:
        `Which fan, then capacitor, then windings — the order that keeps a ${motor} motor from being swapped for a ${cap} capacitor fault.`,
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(motor),
      supply: ["Indoor or outdoor fan motor", "Matching run capacitor", "Blade if warped"],
      tool: ["Clamp meter", "Multimeter", "Bearing puller"],
      steps: [
        { name: "Name the silent fan", text: "Indoor silence with a live display is the blower. Outdoor silence with indoor air moving is the condenser fan — and the compressor will overheat if you keep running it." },
        { name: "Listen for a hum", text: "Hum without rotation is capacitor until proven otherwise. No hum at all is power, PCB or a burnt winding." },
        { name: "Free the blade by hand with power off", text: "A blade that will not turn by finger is seized. Do not force it. Leaves packed in the outdoor cage are a free fix if they come out cleanly." },
        { name: "Test capacitor then motor", text: `KL Renovator meters the fan capacitor first (${cap}), then winding resistance. Burnt motors are ${motor} and we carry common sizes for same-day swap.` },
        { name: "Balance and run-test", text: "A replacement motor is run at all speeds. Vibration means a bent blade, not a second motor." },
      ],
      answers: [
        { q: "Why has my aircond fan stopped working?", a: `About six in ten silent fans are a burnt motor; about three in ten are the capacitor. The last slice is PCB power or a seized bearing. An outdoor fan that has stopped is the urgent one — the compressor cannot dump heat and will trip or die. Switch Cool off until it is seen.` },
        { q: "How do you repair an aircond fan?", a: `Power off, spin the blade by hand, meter the capacitor, then the windings. Capacitor jobs finish in under an hour. Motor jobs need the matching shaft and speed tap; we stock the usual wall-mounted sizes and quote ${motor} before cutting wires.` },
        { q: "How much does fan motor replacement cost?", a: `Fan motors are ${motor}. The capacitor that often impersonates a dead motor is ${cap}. Diagnostic ${diag} is waived with either repair. Outdoor motors sit at the top of that band because of weather sealing. Ask for the confirmed figure on WhatsApp before anyone opens the cabinet.` },
        { q: "Can I run the aircond if the outdoor fan is dead?", a: `No. The condenser needs that airflow. A few minutes of locked-fan running is how compressors get written off. Indoor-fan-only is also a no — you are circulating uncooled air and still paying for the electronics. Same-day slots run across KL and Selangor once the part is on the van.` },
      ],
    },
    ms: {
      howToHeading: "Langkah baiki kipas aircond yang tidak berpusing",
      howToName: "Cara diagnosis kipas dalam atau luar yang mati",
      howToDescription:
        "Kipas mana, kemudian kapasitor, kemudian belitan — tertib yang menghalang motor mahal ditukar untuk kerosakan kapasitor.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(motor),
      supply: ["Motor kipas dalam atau luar", "Kapasitor jalan sepadan", "Bilah jika herot"],
      tool: ["Clamp meter", "Multimeter", "Penarik galas"],
      steps: [
        { name: "Namakan kipas yang senyap", text: "Senyap dalam dengan paparan hidup ialah blower. Senyap luar dengan angin dalam bergerak ialah kipas kondenser — dan pekali akan terlebih panas jika anda terus jalankan." },
        { name: "Dengar dengungan", text: "Dengung tanpa putaran ialah kapasitor sehingga dibuktikan sebaliknya. Tiada dengung langsung ialah kuasa, PCB atau belitan terbakar." },
        { name: "Pusing bilah dengan tangan semasa kuasa mati", text: "Bilah yang tidak berganjak dengan jari ialah macet. Jangan paksa. Daun dalam sangkar luar ialah baiki percuma jika keluar bersih." },
        { name: "Uji kapasitor kemudian motor", text: `KL Renovator ukur kapasitor kipas dahulu (${cap}), kemudian rintangan belitan. Motor terbakar ${motor} dan kami bawa saiz biasa untuk tukar hari sama.` },
        { name: "Imbang dan uji jalan", text: "Motor ganti dijalankan pada semua kelajuan. Getaran bermakna bilah bengkok, bukan motor kedua." },
      ],
      answers: [
        { q: "Kenapa kipas aircond saya berhenti?", a: `Kira-kira enam daripada sepuluh kipas senyap ialah motor terbakar; kira-kira tiga ialah kapasitor. Bahagian terakhir ialah kuasa PCB atau galas macet. Kipas luar yang berhenti ialah yang segera — pekali tidak dapat buang haba dan akan trip atau mati. Matikan Cool sehingga diperiksa.` },
        { q: "Bagaimana KL Renovator baiki kipas aircond?", a: `Putuskan kuasa, pusing bilah dengan tangan, ukur kapasitor, kemudian belitan. Kerja kapasitor siap dalam sejam. Kerja motor perlukan aci dan tap kelajuan sepadan; kami stok saiz dinding biasa dan sebut ${motor} sebelum potong wayar. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Berapa kos ganti motor kipas?", a: `Motor kipas ${motor}. Kapasitor yang kerap menyamar sebagai motor mati ialah ${cap}. Diagnostik ${diag} dilepaskan dengan mana-mana pembaikan. Motor luar duduk di puncak jalur itu kerana pengedap cuaca. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bolehkah saya jalankan aircond jika kipas luar mati?", a: `Tidak. Kondenser perlukan aliran itu. Beberapa minit kipas terkunci ialah cara pekali dihapuskan. Kipas dalam sahaja juga tidak — anda mengedarkan udara tidak sejuk dan masih bayar elektronik. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
      ],
    },
    zh: {
      howToHeading: "如何处理不转的冷气风扇",
      howToName: "如何诊断室内或室外风扇停转",
      howToDescription:
        "先分清哪一只风扇，再测电容，最后测绕组，避免把电容故障换成贵电机。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(motor),
      supply: ["室内或室外风扇电机", "对应运行电容", "变形时的风叶"],
      tool: ["钳形表", "万用表", "轴承拉马"],
      steps: [
        { name: "指出是哪一只风扇不转", text: "室内屏亮着但没风，是室内风轮。室内有风而室外静，是冷凝风扇——继续开机会让压缩机过热。" },
        { name: "听有没有嗡嗡声", text: "嗡嗡不转先当电容。完全无声，才是电源、PCB 或绕组烧了。" },
        { name: "断电后用手拨风叶", text: "手指拨不动就是卡死，不要硬扳。室外罩里的树叶如果能干净取出，等于免费修好。" },
        { name: "先测电容再测电机", text: `KL Renovator 先量风扇电容（${cap}），再量绕组。烧坏的电机是 ${motor}，常用规格当天可换。` },
        { name: "校平衡并试运行", text: "新电机要跑完全部风速。还有振动，多半是风叶弯了，不是第二只电机。" },
      ],
      answers: [
        { q: "为什么冷气风扇不转了？", a: `大约六成是电机烧了，三成是电容。剩下的是 PCB 没电或轴承卡死。室外风扇停转最急——压缩机散不了热，会跳停或烧掉。在技师看过之前先关制冷。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "风扇不转怎么修？", a: `断电、手拨风叶、量电容、再量绕组。换电容通常一小时内。换电机要对轴和调速抽头；常用挂壁规格我们有库存，剪线前按 ${motor} 报价。 签字工单会写明零件和价格，不靠口头约定。` },
        { q: "换风扇电机多少钱？", a: `风扇电机 ${motor}。经常假扮电机死亡的电容是 ${cap}。诊断费 ${diag}，做其中一项维修就免。室外电机因为要防水，落在价位上沿。 同一次上门做完维修，诊断费就免除。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "室外风扇不转还能开冷气吗？", a: `不能。冷凝器靠那股风散热。风扇抱死开几分钟，就是压缩机报废的典型路径。只开室内风也不行——房间没有冷，电器还在耗电。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
      ],
    },
  },

  "aircond-tripping-power": {
    en: {
      howToHeading: "How to respond when an aircond trips the MCB",
      howToName: "How to diagnose an aircond that trips the breaker",
      howToDescription:
        "Do not keep resetting. Insulation test, capacitor, then wiring — the electrical-safety sequence.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["Correct-rated MCB if undersized", "Capacitor or wiring loom", "Heat-shrink and earth tails"],
      tool: ["Insulation tester (megger)", "Clamp meter", "Socket tester"],
      steps: [
        { name: "Leave the breaker off", text: "A second or third reset on a genuine short is how wiring burns. The aircond stays isolated until it is tested." },
        { name: "Note instant trip versus delayed trip", text: "Instant on start is windings or a dead short. Trip after minutes is overload, a weak capacitor drawing locked-rotor current, or an undersized MCB." },
        { name: "Megger the compressor and inspect the loom", text: "KL Renovator measures insulation to earth and looks for water-tracked wires inside both cabinets." },
        { name: "Fix the cheap electrical fault first", text: `Capacitor ${cap}, wiring repairs quoted on length, PCB ${pcb}, compressor only if the megger fails (${compressor}).` },
        { name: "Verify breaker rating against HP", text: "A 1.5 HP unit on a lighting breaker will nuisance-trip forever. We tell you the correct MCB and leave the electrical change to a licensed wireman if the DB needs work." },
      ],
      answers: [
        { q: "Why does my aircond keep tripping the MCB?", a: `Either the unit is pulling a short or the breaker is too small for the start surge. Failed capacitors and wet wiring are the everyday causes; a shorted compressor is the expensive one. The breaker is doing its job. Resetting it in a loop is the fire risk, not the first trip.` },
        { q: "What should I do if the aircond trips the power?", a: `Leave the MCB off. Check whether kitchen sockets on the same way also died — that is a house-wiring clue. WhatsApp KL Renovator the HP, the breaker size if you can read it, and whether the trip is instant. Do not keep resetting while you wait.` },
        { q: "How much does it cost to fix a tripping aircond?", a: `Capacitor ${cap} is the common win. Wiring repairs are quoted by damage. PCB ${pcb}. Compressor ${compressor} only after a failed insulation test. Diagnostic ${diag} waived with the repair. We confirm the number before any live work. Same-day slots run across KL and Selangor once the part is on the van.` },
        { q: "Is a tripping aircond a fire hazard?", a: `It can be, if the cause is damaged insulation or water on a live terminal. Treat it as safety work, not a comfort inconvenience. Same-day electrical diagnosis runs across KL and Selangor for this reason. The signed job card lists the part and the price so nothing is left verbal.` },
      ],
    },
    ms: {
      howToHeading: "Langkah bila aircond menjatuhkan MCB",
      howToName: "Cara diagnosis aircond yang trip pemutus",
      howToDescription:
        "Jangan terus reset. Ujian penebat, kapasitor, kemudian pendawaian — urutan keselamatan elektrik.",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["MCB rating betul jika terlalu kecil", "Kapasitor atau loom wayar", "Heat-shrink dan ekor bumi"],
      tool: ["Penguji penebat (megger)", "Clamp meter", "Penguji soket"],
      steps: [
        { name: "Biarkan pemutus mati", text: "Reset kedua atau ketiga pada pintas sebenar ialah cara wayar terbakar. Aircond kekal terasing sehingga diuji." },
        { name: "Bezakan trip segera dengan trip tertunda", text: "Segera semasa mula ialah belitan atau pintas mati. Trip selepas beberapa minit ialah beban lampau, kapasitor lemah menarik arus rotor terkunci, atau MCB terlalu kecil." },
        { name: "Megger pekali dan periksa loom", text: "KL Renovator ukur penebat ke bumi dan cari wayar berjejak air dalam kedua-dua kabinet." },
        { name: "Baiki kerosakan elektrik murah dahulu", text: `Kapasitor ${cap}, baiki pendawaian dikutip mengikut panjang, PCB ${pcb}, pekali hanya jika megger gagal (${compressor}).` },
        { name: "Sahkan rating pemutus berbanding HP", text: "Unit 1.5 HP pada pemutus lampu akan trip gangguan selama-lamanya. Kami beritahu MCB yang betul dan serah perubahan elektrik kepada wireman berlesen jika DB perlu kerja." },
      ],
      answers: [
        { q: "Kenapa aircond saya selalu trip MCB?", a: `Sama ada unit menarik pintas atau pemutus terlalu kecil untuk lonjakan mula. Kapasitor gagal dan pendawaian basah ialah punca harian; pekali terpintas ialah yang mahal. Pemutus sedang buat kerjanya. Mereset dalam gelung ialah risiko kebakaran, bukan trip pertama. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Apa patut saya buat jika aircond trip kuasa?", a: `Biarkan MCB mati. Semak sama ada soket dapur pada laluan sama juga mati — itu petunjuk pendawaian rumah. WhatsApp KL Renovator HP, saiz pemutus jika anda dapat baca, dan sama ada trip segera. Jangan terus reset sambil menunggu. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Berapa kos membaiki aircond yang trip?", a: `Kapasitor ${cap} ialah kemenangan biasa. Baiki pendawaian dikutip mengikut kerosakan. PCB ${pcb}. Pekali ${compressor} hanya selepas ujian penebat gagal. Diagnostik ${diag} dilepaskan dengan pembaikan. Kami sahkan nombor sebelum kerja hidup. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Adakah aircond yang trip risiko kebakaran?", a: `Boleh, jika puncanya penebat rosak atau air pada terminal hidup. Anggap ini kerja keselamatan, bukan ketidakselesaan. Diagnosis elektrik hari sama berjalan di KL dan Selangor atas sebab ini. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan, termasuk MCB jika perlu ditukar.` },
      ],
    },
    zh: {
      howToHeading: "如何应对冷气跳闸",
      howToName: "如何诊断导致跳闸的冷气",
      howToDescription:
        "不要反复复位。先绝缘测试，再电容，再查线——这是电气安全顺序。",
      totalTime: "PT1H15M",
      estimatedCostValue: priceAmount(cap),
      supply: ["规格过小时的正确 MCB", "电容或线束", "热缩管与接地线"],
      tool: ["绝缘摇表", "钳形表", "插座测试器"],
      steps: [
        { name: "让断路器保持断开", text: "真正短路时第二次、第三次复位，就是电线起火的路径。冷气保持隔离，直到测完。" },
        { name: "分清立刻跳还是过几分钟才跳", text: "一启动就跳，是绕组或死短路。跑几分钟才跳，是过载、电容变弱拉死转子电流，或 MCB 太小。" },
        { name: "给压缩机做绝缘并检查线束", text: "KL Renovator 测对地绝缘，并在室内外机里找被水爬过的线。" },
        { name: "先修便宜的电气件", text: `电容 ${cap}，接线按损坏长度报价，PCB ${pcb}，摇表失败才报压缩机（${compressor}）。` },
        { name: "按匹数核对断路器规格", text: "1.5 匹挂在照明回路上会永远误跳。我们告知正确 MCB；配电箱要改线则交给持证电工。" },
      ],
      answers: [
        { q: "为什么冷气一直跳 MCB？", a: `要么机器在拉短路，要么断路器吃不住启动浪涌。坏电容和受潮接线是日常原因；压缩机短路才是贵的那种。断路器在做它的工作。循环复位才是火灾风险，不是第一次跳闸。` },
        { q: "冷气跳电我该怎么办？", a: `让 MCB 保持关。看看同一路的厨房插座是不是也没电——那是家里线路的线索。把匹数、能读到的断路器规格、以及是否一开就跳，发给 KL Renovator。等的时候不要反复复位。` },
        { q: "修跳闸冷气要多少钱？", a: `电容 ${cap} 是最常见的赢家。接线按损坏报价。PCB ${pcb}。绝缘测试失败才报压缩机 ${compressor}。诊断费 ${diag}，维修则免。带电作业前先确认数字。 同一次上门做完维修，诊断费就免除。` },
        { q: "跳闸的冷气有火灾危险吗？", a: `如果是绝缘破损或带电端子进水，就有。把它当安全工作，而不是少吹一点冷风。正因为如此，吉隆坡与雪兰莪才提供当天电气诊断。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
      ],
    },
  },

  "aircond-remote-not-working": {
    en: {
      howToHeading: "How to test an aircond remote that is not working",
      howToName: "How to diagnose a dead aircond remote or IR receiver",
      howToDescription:
        "Batteries, camera IR test, then receiver and PCB — so a five-ringgit battery is not a two-hundred-ringgit callout.",
      totalTime: "PT30M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Alkaline AA or AAA cells", "Universal or OEM remote", "IR receiver module"],
      tool: ["Phone camera", "Multimeter", "IR tester"],
      steps: [
        { name: "Fit new alkaline cells", text: "Rechargeables sag under IR load. Fresh alkaline AA or AAA is the first swap, even if the old pair 'still has some charge'." },
        { name: "Watch the IR LED through a phone camera", text: "A purple flash means the remote is transmitting. No flash after new cells means the remote itself is dead." },
        { name: "Clean the indoor receiver window", text: "The small dark pane on the fascia collects grease. A blocked window looks exactly like a dead remote." },
        { name: "Use the hidden manual button", text: "Most indoor units have an emergency run switch behind the flap. If that starts Cool, the chassis is alive and the fault is IR-side." },
        { name: "Replace receiver or remote", text: `A dead remote is usually cheaper than a receiver. Receiver or board work is ${sensor} to ${pcb}. We quote before opening the fascia.` },
      ],
      answers: [
        { q: "Why is my aircond remote not working?", a: `Flat batteries cause most of these calls. Next is a worn keypad or a receiver window filmed with kitchen grease. A remote that flashes on camera while the unit ignores it is an indoor IR or PCB job, not another trip to the convenience store.` },
        { q: "How do I test if the remote is sending a signal?", a: `Point it at your phone camera and press Cool. A purple or white blink means the LED is alive. No blink after new alkalines: replace the remote. Blink but no response: clean the receiver, then book KL Renovator for the indoor side.` },
        { q: "How much does remote or receiver repair cost?", a: `Batteries are yours. A replacement remote is typically a small parts job we quote on brand. IR receiver work sits around ${sensor}. If the indoor PCB is the reason, see ${pcb}. Diagnostic ${diag} waived with the repair. Same-day slots run across KL and Selangor once the part is on the van.` },
        { q: "Can I turn the aircond on without the remote?", a: `Yes. Look for a small AUTO or MANUAL button behind the front flap. It starts a default Cool cycle so you are not stuck overnight. It will not give you temperature control — that still needs a working remote or receiver.` },
      ],
    },
    ms: {
      howToHeading: "Langkah uji remote aircond yang tidak berfungsi",
      howToName: "Cara diagnosis remote mati atau penerima IR rosak",
      howToDescription:
        "Bateri, ujian IR kamera, kemudian penerima dan PCB — supaya bateri lima ringgit bukan panggilan dua ratus.",
      totalTime: "PT30M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Sel alkali AA atau AAA", "Remote universal atau OEM", "Modul penerima IR"],
      tool: ["Kamera telefon", "Multimeter", "Penguji IR"],
      steps: [
        { name: "Pasang sel alkali baharu", text: "Bateri boleh cas jatuh di bawah beban IR. Alkali AA atau AAA baharu ialah tukaran pertama, walaupun pasangan lama 'masih ada cas'." },
        { name: "Tengok LED IR melalui kamera telefon", text: "Kilat ungu bermakna remote sedang menghantar. Tiada kilat selepas sel baharu bermakna remote itu sendiri mati." },
        { name: "Bersihkan tetingkap penerima dalam", text: "Panel gelap kecil pada fascia mengumpul gris. Tetingkap tersumbat nampak tepat seperti remote mati." },
        { name: "Guna butang manual tersembunyi", text: "Kebanyakan unit dalam ada suis kecemasan di sebalik flap. Jika itu mulakan Cool, casis hidup dan kerosakan di bahagian IR." },
        { name: "Ganti penerima atau remote", text: `Remote mati biasanya lebih murah daripada penerima. Kerja penerima atau papan ${sensor} hingga ${pcb}. Kami sebut harga sebelum buka fascia.` },
      ],
      answers: [
        { q: "Kenapa remote aircond saya tidak berfungsi?", a: `Bateri habis menyebabkan kebanyakan panggilan ini. Seterusnya kekunci haus atau tetingkap penerima bersalut gris dapur. Remote yang berkelip pada kamera tetapi unit abaikan ialah kerja IR dalam atau PCB, bukan trip lagi ke kedai runcit. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Bagaimana saya uji sama ada remote menghantar isyarat?", a: `Hala ke kamera telefon dan tekan Cool. Kelip ungu atau putih bermakna LED hidup. Tiada kelip selepas alkali baharu: ganti remote. Kelip tetapi tiada tindak balas: bersih penerima, kemudian tempah KL Renovator untuk bahagian dalam. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Berapa kos baiki remote atau penerima?", a: `Bateri tanggung sendiri. Remote ganti biasanya kerja alat kecil yang kami sebut ikut jenama. Kerja penerima IR sekitar ${sensor}. Jika PCB dalam puncanya, lihat ${pcb}. Diagnostik ${diag} dilepaskan dengan pembaikan. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Bolehkah saya hidupkan aircond tanpa remote?", a: `Boleh. Cari butang AUTO atau MANUAL kecil di sebalik flap depan. Ia memulakan kitaran Cool lalai supaya anda tidak tersekat semalaman. Ia tidak beri kawalan suhu — itu masih perlukan remote atau penerima yang hidup. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
      ],
    },
    zh: {
      howToHeading: "如何测试失灵的冷气遥控",
      howToName: "如何诊断遥控或红外接收器故障",
      howToDescription:
        "先电池、再摄像头测红外，然后接收器和主板，避免五令吉电池变成两百令吉上门。",
      totalTime: "PT30M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["碱性 5 号或 7 号电池", "通用或原厂遥控", "红外接收模块"],
      tool: ["手机摄像头", "万用表", "红外测试器"],
      steps: [
        { name: "换上新的碱性电池", text: "充电电池在红外负载下电压掉得快。即使旧电池“好像还有电”，也先换碱性 AA 或 AAA。" },
        { name: "用手机摄像头看红外灯", text: "有紫光闪就是遥控在发射。新电池仍不闪，就是遥控本身坏了。" },
        { name: "擦干净室内接收窗", text: "面板上那块小黑窗会积油烟。挡住以后，看起来完全像遥控坏了。" },
        { name: "用隐藏的手动键", text: "多数室内机盖板后有应急键。能启动制冷，说明机器活着，问题在红外一侧。" },
        { name: "换接收器或遥控", text: `坏遥控通常比换接收器便宜。接收器或主板在 ${sensor} 到 ${pcb}。打开面板前先报价。` },
      ],
      answers: [
        { q: "为什么冷气遥控没反应？", a: `大多数是电池没电。其次是按键老化，或接收窗蒙了厨房油膜。遥控在摄像头里会闪、机器却不理，就是室内红外或主板的事，不是再跑一趟便利店。 签字工单会写明零件和价格，不靠口头约定。` },
        { q: "怎么测遥控有没有在发射？", a: `对准手机摄像头按制冷。有紫或白闪，灯是好的。换过碱性仍不闪：换遥控。有闪没反应：先擦接收窗，再约 KL Renovator 查室内侧。 同一次上门做完维修，诊断费就免除。` },
        { q: "修遥控或接收器多少钱？", a: `电池自备。替换遥控按品牌报一个小零件价。红外接收大约 ${sensor}。若是室内主板，见 ${pcb}。诊断费 ${diag}，维修则免。 开工前先在 WhatsApp 确认数字，再打开机壳。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "没有遥控能开冷气吗？", a: `能。前面板后面找 AUTO 或 MANUAL 小键，会走默认制冷，不至于整晚热着。它不能调温度——那仍需要好的遥控或接收器。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-indoor-unit-leaking": {
    en: {
      howToHeading: "How to stop water dripping from the indoor unit",
      howToName: "How to diagnose an indoor unit overflowing the drain pan",
      howToDescription:
        "Catch, isolate if electrical, flush the full drain run, then overhaul a cracked pan — the indoor-specific leak path.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Basin and towels", "Drain-pan cleaner", "Replacement pan on wall-mounted units"],
      tool: ["Wet vacuum", "Chemical flush pump", "Spirit level"],
      steps: [
        { name: "Protect the floor and kill power if water meets electrics", text: "Indoor fascia drips land on beds and TV consoles. A basin first. Water tracking to the socket: MCB off." },
        { name: "Watch where the drop leaves the chassis", text: "Front-lip drip is almost always a full pan. Side or rear drip can be a disconnected stub inside the wall." },
        { name: "Flush the entire drain, not just the visible elbow", text: `KL Renovator pressure-flushes to the outdoor outlet. A first indoor leak usually ends with a wash from ${wash}.` },
        { name: "Open the pan if the leak is heavy or repeating", text: `Cracks and slime dams hide under the coil. Wall-mounted overhaul from ${overhaul}. Cassette pump faults are ${drainPump}.` },
        { name: "Level-check the chassis before leaving", text: "A unit hung dead-level will overflow again. We correct the fall toward the stub when the bracket allows." },
      ],
      answers: [
        { q: "Why is my indoor unit dripping water?", a: `The drain pan has nowhere left to send condensate, so it spills over the front lip. In Malaysian condos that is usually slime in the pipe, not a mysterious crack. First-time drips clear with a wash from ${wash}. A second drip in the same season means the pan or the slope needs opening.` },
        { q: "How do I stop the indoor unit leaking tonight?", a: `Basin under the lip, Cool off if the drip is heavy, MCB off if water is near a socket. Do not tilt the chassis on the bracket. WhatsApp a photo of the drip line. Same-day indoor leak slots are the calls we prioritise after electrical trips.` },
        { q: "How much to fix an indoor unit leak?", a: `Wash and flush from ${wash}. Wall-mounted overhaul from ${overhaul} when the pan is packed or split. Cassette drain pump ${drainPump}. Diagnostic ${diag} waived with the repair. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Will dripping ruin my ceiling or wardrobe?", a: `Yes, if you wait. Condensate is not clean water — it stains fabric and grows mould in chipboard. Catch it tonight and book tomorrow at the latest. Furniture is more expensive than the wash. Diagnostic is waived when the repair is completed on the same visit.` },
      ],
    },
    ms: {
      howToHeading: "Langkah hentikan unit dalam yang menitis",
      howToName: "Cara diagnosis unit dalam yang melimpah dulang longkang",
      howToDescription:
        "Tampung, asingkan jika elektrik, basuh seluruh laluan longkang, kemudian overhaul dulang retak.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Bekas dan tuala", "Pembersih dulang", "Dulang ganti pada unit dinding"],
      tool: ["Vakum basah", "Pam basuh kimia", "Penyiku semangat"],
      steps: [
        { name: "Lindungi lantai dan putuskan kuasa jika air jumpa elektrik", text: "Titisan fascia dalam jatuh pada katil dan rak TV. Bekas dahulu. Air meresap ke soket: MCB mati." },
        { name: "Tengok di mana titis meninggalkan casis", text: "Titis bibir depan hampir selalu dulang penuh. Titis sisi atau belakang boleh jadi stub terputus dalam dinding." },
        { name: "Basuh seluruh longkang, bukan siku nampak sahaja", text: `KL Renovator basuh bertekanan sampai ke outlet luar. Bocor dalam kali pertama biasanya tamat dengan cucian dari ${wash}.` },
        { name: "Buka dulang jika bocor deras atau berulang", text: `Retak dan empangan lendir bersembunyi di bawah gegelung. Overhaul dinding dari ${overhaul}. Kerosakan pam cassette ${drainPump}.` },
        { name: "Semak aras casis sebelum pulang", text: "Unit tergantung rata akan melimpah semula. Kami betulkan jatuhan ke arah stub bila braket mengizinkan." },
      ],
      answers: [
        { q: "Kenapa unit dalam saya menitis air?", a: `Dulang longkang tiada tempat hantar kondensat, jadi ia tumpah di bibir depan. Di kondo Malaysia itu biasanya lendir dalam paip, bukan retak misteri. Titis kali pertama siap dengan cucian dari ${wash}. Titis kedua dalam musim sama bermakna dulang atau cerun perlu dibuka.` },
        { q: "Bagaimana saya hentikan unit dalam bocor malam ini?", a: `Bekas di bawah bibir, Cool mati jika titis deras, MCB mati jika air dekat soket. Jangan condongkan casis pada braket. WhatsApp foto garis titis. Slot bocor dalam hari sama ialah panggilan yang kami utamakan selepas trip elektrik. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Berapa kos membaiki bocor unit dalam?", a: `Cuci dan basuh dari ${wash}. Overhaul unit dinding dari ${overhaul} bila dulang padat atau belah. Pam longkang cassette ${drainPump}. Diagnostik ${diag} dilepaskan dengan pembaikan. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Adakah titisan merosakkan siling atau almari?", a: `Ya, jika anda tunggu. Kondensat bukan air bersih — ia menodai fabrik dan menumbuhkan kulat dalam papan serpai. Tampung malam ini dan tempah esok paling lewat. Perabot lebih mahal daripada cucian. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
      ],
    },
    zh: {
      howToHeading: "如何止住室内机滴水",
      howToName: "如何诊断室内机排水盘溢水",
      howToDescription:
        "先接水，靠近电源则断电，冲洗整段排水，水盘破裂再大修。",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(wash),
      supply: ["盆和毛巾", "水盘清洁剂", "挂壁式更换用水盘"],
      tool: ["湿吸尘器", "化学冲洗泵", "水平尺"],
      steps: [
        { name: "保护地面，水碰电就断电", text: "室内面板的水会滴到床和电视柜。先放盆。水爬向插座：关 MCB。" },
        { name: "看水从机壳哪一边出来", text: "前唇滴水几乎一定是水盘满了。侧面或后面滴，可能是墙内接头脱落。" },
        { name: "冲洗整段排水，不只看得见的弯头", text: `KL Renovator 加压冲到室外出口。第一次室内漏水，通常做到从 ${wash} 起的清洗就结束。` },
        { name: "漏得凶或反复再开水盘", text: `裂缝和黏液坝藏在盘管下面。挂壁式大修从 ${overhaul} 起。卡式机排水泵 ${drainPump}。` },
        { name: "离开前校正机身坡度", text: "完全水平吊着的室内机会再溢。支架允许时，我们把坡度改回排水口。" },
      ],
      answers: [
        { q: "为什么室内机会滴水？", a: `排水盘已经没地方送冷凝水，只能从前唇溢出来。马来西亚公寓里，这通常是管内黏液，不是神秘裂缝。第一次滴水用从 ${wash} 起的清洗就能清掉。同一季节第二次滴，就要打开水盘或坡度。` },
        { q: "今晚怎样先止住室内机漏水？", a: `前唇下放盆，滴得凶就关制冷，水靠近插座就关 MCB。不要在支架上扳机身。把滴水路线的照片发到 WhatsApp。除了跳电，室内漏水是我们优先插当天档的单。 同一次上门做完维修，诊断费就免除。` },
        { q: "修室内机漏水多少钱？", a: `清洗加冲洗从 ${wash} 起。水盘积满或裂开时，挂壁式大修从 ${overhaul} 起。卡式机排水泵 ${drainPump}。诊断费 ${diag}，维修则免。 开工前先在 WhatsApp 确认数字，再打开机壳。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "滴水会毁天花板或衣柜吗？", a: `会，如果你等。冷凝水不是干净水——它污布料，也在刨花板里长霉。今晚先接住，最迟明天预约。家具比一次清洗贵。 零件在车上时，吉隆坡与雪兰莪都有当天档期。 签字工单会写明零件和价格，不靠口头约定。` },
      ],
    },
  },

  "aircond-outdoor-unit-not-running": {
    en: {
      howToHeading: "How to check an outdoor unit that is not running",
      howToName: "How to diagnose a silent outdoor aircond unit",
      howToDescription:
        "Isolator, overload, capacitor, contactor — the outdoor-side order that keeps a silent cage from being called a dead compressor.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["Start capacitor", "Contactor", "Outdoor fan motor if seized"],
      tool: ["Multimeter", "Clamp meter", "Insulated screwdriver"],
      steps: [
        { name: "Confirm the outdoor isolator is on", text: "Condo service ledges get switched off by contractors. The indoor display can still glow on a dead outdoor isolator." },
        { name: "Listen at the cage for hum or click", text: "A click then silence is often the contactor dropping. A hum is capacitor or locked rotor. Total silence is power or PCB." },
        { name: "Give a hot overload ten minutes", text: "After a long afternoon run the thermal protector opens. If it restarts once cool and then dies again, we look at airflow and charge, not just the protector." },
        { name: "Test capacitor and contactor on the pad", text: `Those two parts are ${cap} and ${contactor} and they live in the outdoor electrical box. Most silent outdoor units end here.` },
        { name: "Only then test the compressor", text: `Windings and amps come last. A failed compressor is ${compressor} and is quoted beside a new unit, never sprung as a surprise.` },
      ],
      answers: [
        { q: "Why is my outdoor unit not running?", a: `The indoor fan can blow while the outdoor cage sits dead. Usual causes: off isolator, open overload, dead capacitor, burnt contactor. A silent outdoor unit is not automatically a compressor. Keep Cool off — you are not cooling the room and you may be heating the compressor.` },
        { q: "How do you get an outdoor unit running again?", a: `Isolator, then capacitor and contactor, then windings. That walk takes one visit for stocked parts. WhatsApp the brand and whether you hear a hum at the cage. Same-day outdoor electrical work is routine across Petaling, Cheras and Shah Alam routes.` },
        { q: "How much to repair a silent outdoor unit?", a: `Capacitor ${cap}. Contactor ${contactor}. Outdoor fan motor ${motor}. PCB ${pcb}. Compressor ${compressor} only after the electrical box is cleared. Diagnostic ${diag} waived with the repair. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Can I run just the indoor unit?", a: `It will move air and use power without lowering the room temperature. Switch the system off until the outdoor side is diagnosed. A silent cage plus a running indoor is a common way people rack up a high bill for no comfort.` },
      ],
    },
    ms: {
      howToHeading: "Langkah semak unit luar yang tidak berjalan",
      howToName: "Cara diagnosis unit luar aircond yang senyap",
      howToDescription:
        "Isolator, overload, kapasitor, kontaktor — tertib sisi luar yang menghalang sangkar senyap dipanggil pekali mati.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["Kapasitor mula", "Kontaktor", "Motor kipas luar jika macet"],
      tool: ["Multimeter", "Clamp meter", "Pemutar skru bertebat"],
      steps: [
        { name: "Sahkan isolator luar hidup", text: "Service ledge kondo kerap dimatikan kontraktor. Paparan dalam masih boleh menyala pada isolator luar mati." },
        { name: "Dengar di sangkar untuk dengung atau klik", text: "Klik kemudian senyap sering kontaktor jatuh. Dengung ialah kapasitor atau rotor terkunci. Senyap sepenuhnya ialah kuasa atau PCB." },
        { name: "Beri overload panas sepuluh minit", text: "Selepas jalan petang panjang pelindung terma terbuka. Jika ia hidup semula sekali sejuk kemudian mati lagi, kami tengok aliran dan cas, bukan pelindung semata-mata." },
        { name: "Uji kapasitor dan kontaktor di pad", text: `Dua bahagian itu ${cap} dan ${contactor} dan tinggal dalam kotak elektrik luar. Kebanyakan unit luar senyap tamat di sini.` },
        { name: "Baru kemudian uji pekali", text: `Belitan dan amp datang akhir. Pekali gagal ialah ${compressor} dan dikutip di sebelah unit baru, tidak pernah dilontar sebagai kejutan.` },
      ],
      answers: [
        { q: "Kenapa unit luar saya tidak berjalan?", a: `Kipas dalam boleh meniup sementara sangkar luar duduk mati. Punca biasa: isolator mati, overload terbuka, kapasitor mati, kontaktor terbakar. Unit luar senyap bukan automatik pekali. Biarkan Cool mati — anda tidak menyejukkan bilik dan mungkin memanaskan pekali. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Bagaimana KL Renovator hidupkan semula unit luar?", a: `Isolator, kemudian kapasitor dan kontaktor, kemudian belitan. Jalan itu mengambil satu lawatan untuk alat stok. WhatsApp jenama dan sama ada anda dengar dengung di sangkar. Kerja elektrik luar hari sama rutin di laluan Petaling, Cheras dan Shah Alam. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Berapa kos membaiki unit luar senyap?", a: `Kapasitor ${cap}. Kontaktor ${contactor}. Motor kipas luar ${motor}. PCB ${pcb}. Pekali ${compressor} hanya selepas kotak elektrik dikosongkan. Diagnostik ${diag} dilepaskan dengan pembaikan. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Bolehkah saya jalankan unit dalam sahaja?", a: `Ia akan gerakkan udara dan guna kuasa tanpa menurunkan suhu bilik. Matikan sistem sehingga sisi luar didiagnosis. Sangkar senyap plus dalam berjalan ialah cara biasa orang kumpul bil tinggi tanpa keselesaan. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
      ],
    },
    zh: {
      howToHeading: "如何检查不运转的室外机",
      howToName: "如何诊断完全无声的室外机",
      howToDescription:
        "隔离开关、过载、电容、接触器——这个室外顺序，避免把静音外机直接叫做压缩机报废。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(cap),
      supply: ["启动电容", "接触器", "卡死时的室外风扇电机"],
      tool: ["万用表", "钳形表", "绝缘螺丝刀"],
      steps: [
        { name: "确认室外隔离开关是开的", text: "公寓检修台常被装修关掉。室外隔离断开时，室内屏仍可能亮。" },
        { name: "在罩边听嗡嗡或咔嗒", text: "咔嗒一声后安静，多半是接触器落下。嗡嗡是电容或转子抱死。全静是电源或 PCB。" },
        { name: "过热保护先给十分钟", text: "下午长时间运行后热保护会打开。凉下来能再启动、随后又死，我们看风量和充注，不只看保护器。" },
        { name: "在电气盒里测电容和接触器", text: `这两样是 ${cap} 和 ${contactor}，就在室外电气盒。多数静音外机到此结束。` },
        { name: "最后才测压缩机", text: `绕组和电流放在最后。压缩机失败是 ${compressor}，会和新机报价放一起，绝不当惊喜甩出来。` },
      ],
      answers: [
        { q: "为什么室外机不转？", a: `室内风扇可以吹着，室外罩却完全不动。常见原因：隔离开关关了、过载跳了、电容死了、接触器烧了。静音外机不等于压缩机报废。先关制冷——房间没在变冷，压缩机却可能在发热。` },
        { q: "怎样让室外机重新转起来？", a: `隔离开关，再电容和接触器，最后绕组。库存件一次上门能走完。把品牌和罩边是否有嗡嗡声发到 WhatsApp。八打灵、蕉赖、莎阿南线路上，当天室外电气作业很常见。 同一次上门做完维修，诊断费就免除。` },
        { q: "修不转的室外机多少钱？", a: `电容 ${cap}。接触器 ${contactor}。室外风扇电机 ${motor}。PCB ${pcb}。电气盒查清后才报压缩机 ${compressor}。诊断费 ${diag}，维修则免。 开工前先在 WhatsApp 确认数字，再打开机壳。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "可以只开室内机吗？", a: `它会送风、耗电，却不降低室温。在室外侧查清之前关掉整机。外机静、内机转，是很多人电费升高却毫无凉爽的典型走法。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-high-electricity-bill": {
    en: {
      howToHeading: "How to cut an aircond electricity bill",
      howToName: "How to diagnose why an aircond is using too much power",
      howToDescription:
        "Compare the same month last year, then coil, charge and set-point — the efficiency sequence.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Coil chemical", "Correct refrigerant if low", "Clean filter"],
      tool: ["Clamp meter", "Manifold gauges", "Thermometer"],
      steps: [
        { name: "Compare this month to the same month last year", text: "TNB tariff steps and hotter months confuse month-on-month reads. A jump versus last April is the useful number." },
        { name: "Set 24–26°C and time the cycle", text: "A unit parked at 16°C never off-cycles. That alone can dwarf a dirty-coil penalty." },
        { name: "Wash a coil that has gone a year unwashed", text: `A packed evaporator makes the compressor run 20–35 percent longer. Chemical wash from ${wash} is the usual first win.` },
        { name: "Check charge if the wash does not drop amps", text: `Low gas keeps the compressor at full load without reaching set-point. Top-up after leak check at ${r22} or ${r32}.` },
        { name: "Talk inverter versus replacement only after the cheap wins", text: "An eight-year non-inverter can be worth replacing. A three-year inverter usually just needs a wash and a sane set-point." },
      ],
      answers: [
        { q: "Why is my aircond electricity bill so high?", a: `A dirty coil or low gas forces the compressor to stay on. That is a bigger swing than most tariff changes. Setting 16°C 'to cool faster' does the same thing on purpose. KL Renovator measures running amps against the nameplate, then washes or leak-checks. Most bills ease on the next TNB cycle.` },
        { q: "How do I reduce aircond power use this week?", a: `Set 24–26°C, rinse the filter, shade the outdoor unit, and stop using Cool as a dehumidify-all-night setting. If the unit still never cycles off, book a wash. Bring last year's bill for the same month when you WhatsApp — it tells us whether this is weather or a fault.` },
        { q: "How much does an efficiency visit cost?", a: `Chemical wash from ${wash}. Gas after leak check at ${r22} or ${r32} per PSI. Basic service from ${P.basic15} if the coil is only dusty. Diagnostic ${diag} waived with the work. We do not sell a new inverter until the existing unit has been cleaned and charged.` },
        { q: "Will servicing really lower my TNB bill?", a: `A heavily fouled coil commonly gives back 15–30 percent of the cooling it had lost. On a unit that runs eight hours a day that is real ringgit, often more than the wash, inside one or two billing cycles. We measure supply temperature before and after so the change is visible.` },
      ],
    },
    ms: {
      howToHeading: "Langkah turunkan bil elektrik aircond",
      howToName: "Cara diagnosis kenapa aircond makan terlalu banyak kuasa",
      howToDescription:
        "Banding bulan sama tahun lepas, kemudian gegelung, cas dan set-point — urutan kecekapan.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Kimia gegelung", "Penyejuk betul jika rendah", "Penapis bersih"],
      tool: ["Clamp meter", "Manifold gauge", "Termometer"],
      steps: [
        { name: "Banding bulan ini dengan bulan sama tahun lepas", text: "Tangga tarif TNB dan bulan lebih panas mengelirukan bacaan bulan ke bulan. Lonjakan berbanding April lepas ialah nombor berguna." },
        { name: "Tetapkan 24–26°C dan masa kitaran", text: "Unit yang diparkir pada 16°C tidak pernah off-cycle. Itu sahaja boleh menenggelamkan penalti gegelung kotor." },
        { name: "Cuci gegelung yang setahun tidak dicuci", text: `Penyejat padat membuat pekali berjalan 20–35 peratus lebih lama. Cuci kimia dari ${wash} ialah kemenangan pertama biasa.` },
        { name: "Semak cas jika cucian tidak turunkan amp", text: `Gas rendah mengekalkan pekali pada beban penuh tanpa sampai set-point. Top-up selepas semak bocor pada ${r22} atau ${r32}.` },
        { name: "Cakap inverter berbanding ganti hanya selepas kemenangan murah", text: "Bukan inverter lapan tahun mungkin berbaloi diganti. Inverter tiga tahun biasanya hanya perlu cucian dan set-point waras." },
      ],
      answers: [
        { q: "Kenapa bil elektrik aircond saya tinggi?", a: `Gegelung kotor atau gas rendah memaksa pekali kekal hidup. Itu ayunan lebih besar daripada kebanyakan perubahan tarif. Menetapkan 16°C 'supaya cepat sejuk' buat perkara sama dengan sengaja. KL Renovator ukur amp berjalan berbanding plat nama, kemudian cuci atau semak bocor. Kebanyakan bil mereda pada kitaran TNB seterusnya.` },
        { q: "Bagaimana saya kurangkan kuasa aircond minggu ini?", a: `Tetapkan 24–26°C, bilas penapis, teduh unit luar, dan berhenti guna Cool sebagai tetapan nyahlembapan semalaman. Jika unit masih tidak pernah berhenti kitar, tempah cucian. Bawa bil tahun lepas untuk bulan sama bila WhatsApp — ia beritahu ini cuaca atau kerosakan.` },
        { q: "Berapa kos lawatan kecekapan?", a: `Cuci kimia dari ${wash}. Gas selepas semak bocor pada ${r22} atau ${r32} seunit PSI. Servis asas dari ${P.basic15} jika gegelung hanya berhabuk. Diagnostik ${diag} dilepaskan dengan kerja. Kami tidak jual inverter baru sehingga unit sedia ada dibersih dan dicas.` },
        { q: "Adakah servis benar-benar turunkan bil TNB?", a: `Gegelung yang sangat kotor biasa memulangkan 15–30 peratus penyejukan yang hilang. Pada unit yang jalan lapan jam sehari itu ringgit sebenar, kerap lebih daripada cucian, dalam satu atau dua kitaran bil. Kami ukur suhu bekalan sebelum dan selepas supaya perubahan nampak.` },
      ],
    },
    zh: {
      howToHeading: "如何降低冷气电费",
      howToName: "如何诊断冷气为什么特别耗电",
      howToDescription:
        "先对比去年同月，再查盘管、充注和设定温度。这是能效顺序。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["盘管清洗剂", "缺气时的对应冷媒", "干净过滤网"],
      tool: ["钳形表", "歧管表", "温度计"],
      steps: [
        { name: "和去年同一个月比，不要只和上个月比", text: "TNB 阶梯电价和更热的月份会搅乱环比。相对去年四月的跳升，才是有用的数字。" },
        { name: "设到 24–26°C 并看循环", text: "停在 16°C 的机器几乎不停机。单这一项就能盖过脏盘管的惩罚。" },
        { name: "一年没洗的盘管先洗", text: `堵实的蒸发器会让压缩机多跑 20–35%。化学清洗从 ${wash} 起，通常是第一场胜仗。` },
        { name: "洗完电流仍高再查充注", text: `气少会让压缩机满负荷却到不了设定温度。检漏后按 ${r22} 或 ${r32} 充。` },
        { name: "便宜手段用完再谈变频或换机", text: "八年定频可能值得换。三年变频通常只需要清洗和一个正常设定温度。" },
      ],
      answers: [
        { q: "为什么冷气电费这么高？", a: `脏盘管或缺气会让压缩机一直转。这个波动往往大于电价调整。把温度锁在 16°C“好冷得快”，等于故意做同一件事。KL Renovator 对照铭牌测运行电流，再清洗或检漏。多数账单会在下一个 TNB 周期回落。` },
        { q: "这周怎样先把冷气用电压下来？", a: `设 24–26°C，冲洗过滤网，给室外机遮荫，不要整晚用制冷当除湿机。若机器仍然从不循环停机，就预约清洗。WhatsApp 时带上去年同月账单——能分清是天气还是故障。` },
        { q: "能效检查要多少钱？", a: `化学清洗从 ${wash} 起。检漏后充气按 ${r22} 或 ${r32} 每 PSI。盘管只是积灰，基本保养从 ${P.basic15} 起。诊断费 ${diag}，干活则免。现有机器没洗、没补气之前，我们不卖新变频。 签字工单会写明零件和价格，不靠口头约定。` },
        { q: "保养真的能降低 TNB 账单吗？", a: `盘管很脏时，通常能讨回失去的 15–30% 制冷。一天开八小时的机器，这是真金令吉，常常在一两个账单周期里就超过清洗费。我们会测清洗前后的出风温度，让变化看得见。` },
      ],
    },
  },

  "aircond-weak-airflow": {
    en: {
      howToHeading: "How to restore weak aircond airflow",
      howToName: "How to diagnose and restore weak indoor airflow",
      howToDescription:
        "Filter, remote speed, then blower wheel and coil — the volume sequence, not a gas sequence.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Clean filter", "Coil and blower chemical", "Blower wheel if caked beyond wash"],
      tool: ["Anemometer", "Pressure wash pump", "Blower puller"],
      steps: [
        { name: "Check remote speed and Quiet mode", text: "Quiet or Low halves volume on purpose. Switch to High Cool before assuming a fault." },
        { name: "Wash the filter and look down the fascia", text: "A grey filter and a furry coil face are the same problem at two depths. If High still feels anaemic, the blower is next." },
        { name: "Measure supply at the vanes", text: "KL Renovator uses an anemometer so 'weak' is a number, not a feeling. That reading is what we compare after the wash." },
        { name: "Wash coil and blower wheel", text: `Dust on the wheel can cut volume by around 40 percent while the air stays cold. Chemical wash from ${wash} is the standard restore.` },
        { name: "Check the motor if volume stays low", text: `A slow blower motor is ${motor}. Ducted systems get a duct inspection instead of another indoor wash.` },
      ],
      answers: [
        { q: "Why is my aircond blowing weak air?", a: `Volume is a blockage or a slow wheel, not a gas problem. Cold-but-weak almost always means a dirty blower or coil. Warm-and-weak can be both blockage and charge. Start with High Cool and a rinsed filter. If it is still soft, book the wash rather than another top-up.` },
        { q: "How do you fix weak airflow?", a: `We wash the filter, chemically clean the coil and pull the blower if the felt of dust is thick. Most wall-mounted units come back to a strong vane reading in under an hour. WhatsApp a photo of the filter and the coil face — it tells us wash versus overhaul.` },
        { q: "How much to restore airflow?", a: `Chemical wash from ${wash} for 1.0–1.5 HP, ${P.chemicalWash25} for 2.0–2.5 HP, ${P.chemicalWashCassette15} for cassette. Overhaul from ${overhaul} when the wheel will not come clean on the wall. Motor ${motor} if speed is down after the wash.` },
        { q: "Is weak airflow the same as not cold?", a: `No. Weak is less cubic metres per minute. Not cold is normal volume at the wrong temperature. They meet when a frozen coil blocks the path, but the first checks are different and so are the invoices. Diagnostic is waived when the repair is completed on the same visit.` },
      ],
    },
    ms: {
      howToHeading: "Langkah pulihkan aliran udara aircond yang lemah",
      howToName: "Cara diagnosis dan pulihkan angin dalam yang lemah",
      howToDescription:
        "Penapis, kelajuan remote, kemudian roda blower dan gegelung — urutan isipadu, bukan urutan gas.",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["Penapis bersih", "Kimia gegelung dan blower", "Roda blower jika terlalu berkulit"],
      tool: ["Anemometer", "Pam cuci bertekanan", "Penarik blower"],
      steps: [
        { name: "Semak kelajuan remote dan mod Quiet", text: "Quiet atau Low mengurangkan isipadu dengan sengaja. Tukar ke High Cool sebelum anggap kerosakan." },
        { name: "Basuh penapis dan tengok masuk fascia", text: "Penapis kelabu dan muka gegelung berbulu ialah masalah sama pada dua kedalaman. Jika High masih lesu, blower seterusnya." },
        { name: "Ukur bekalan di sirip", text: "KL Renovator guna anemometer supaya 'lemah' jadi nombor, bukan rasa. Bacaan itu yang kami banding selepas cucian." },
        { name: "Cuci gegelung dan roda blower", text: `Habuk pada roda boleh potong isipadu kira-kira 40 peratus sementara udara kekal sejuk. Cuci kimia dari ${wash} ialah pemulihan piawai.` },
        { name: "Semak motor jika isipadu kekal rendah", text: `Motor blower perlahan ialah ${motor}. Sistem saluran mendapat pemeriksaan saluran, bukan cucian dalam lagi.` },
      ],
      answers: [
        { q: "Kenapa aircond saya meniup angin lemah?", a: `Isipadu ialah sekatan atau roda perlahan, bukan masalah gas. Sejuk-tetapi-lemah hampir selalu bermakna blower atau gegelung kotor. Suam-dan-lemah boleh jadi kedua-dua sekatan dan cas. Mulakan dengan High Cool dan penapis dibilas. Jika masih lembut, tempah cucian bukan top-up lagi. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bagaimana KL Renovator baiki aliran lemah?", a: `Kami basuh penapis, cuci kimia gegelung dan tarik blower jika habuk tebal seperti felt. Kebanyakan unit dinding kembali ke bacaan sirip kuat dalam sejam. WhatsApp foto penapis dan muka gegelung — ia beritahu cucian berbanding overhaul. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos pulihkan aliran udara?", a: `Cuci kimia dari ${wash} untuk 1.0–1.5 HP, ${P.chemicalWash25} untuk 2.0–2.5 HP, ${P.chemicalWashCassette15} untuk cassette. Overhaul dari ${overhaul} bila roda tidak bersih pada dinding. Motor ${motor} jika kelajuan turun selepas cucian. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Adakah aliran lemah sama dengan tidak sejuk?", a: `Tidak. Lemah ialah kurang meter padu seminit. Tidak sejuk ialah isipadu normal pada suhu salah. Mereka bertemu bila gegelung beku menyekat laluan, tetapi semakan pertama berbeza dan begitu juga invois. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何恢复冷气弱风",
      howToName: "如何诊断并恢复室内弱风",
      howToDescription:
        "过滤网、遥控风速，再风轮和盘管。这是风量顺序，不是加气顺序。",
      totalTime: "PT1H",
      estimatedCostValue: priceAmount(wash),
      supply: ["干净过滤网", "盘管与风轮清洗剂", "结垢无法洗净时的风轮"],
      tool: ["风速仪", "高压清洗泵", "风轮拉马"],
      steps: [
        { name: "先看遥控风速和静音", text: "静音或低风是故意减量。先改高风制冷，再谈故障。" },
        { name: "洗过滤网并看面板里面", text: "灰过滤网和长毛的盘管表面，是同一问题的两个深度。高风仍然虚，下一步就是风轮。" },
        { name: "在出风叶上测风速", text: "KL Renovator 用风速仪，让“弱”变成数字。清洗后对比的就是这个读数。" },
        { name: "清洗盘管和风轮", text: `风轮积灰可在出风仍然冷的情况下把风量砍掉约四成。化学清洗从 ${wash} 起，是标准恢复手段。` },
        { name: "风量仍低再查电机", text: `风轮电机变慢是 ${motor}。风管机查风管，而不是再洗一次室内机。` },
      ],
      answers: [
        { q: "为什么冷气出风很弱？", a: `风量是堵塞或风轮变慢，不是气体问题。又冷又弱，几乎一定是风轮或盘管脏。又暖又弱，可能堵塞加缺气。先开高风制冷并冲洗过滤网。仍然软，就预约清洗，而不是再加一次气。` },
        { q: "弱风怎么修？", a: `我们洗过滤网、化学洗盘管，积尘像毛毡一样厚就拆风轮。多数挂壁式一小时内能回到有力的出风读数。把过滤网和盘管表面的照片发过来——能分清洗还是大修。` },
        { q: "恢复风量要多少钱？", a: `1.0–1.5 HP 化学清洗从 ${wash} 起，2.0–2.5 HP ${P.chemicalWash25}，卡式机 ${P.chemicalWashCassette15}。墙上洗不净风轮时，大修从 ${overhaul} 起。清洗后转速仍低，电机 ${motor}。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "弱风和不冷是一回事吗？", a: `不是。弱是每分钟立方米少。不冷是风量正常但温度不对。盘管结冰挡住风道时两者会碰头，但第一项检查不同，账单也不同。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
      ],
    },
  },

  "aircond-not-turning-on": {
    en: {
      howToHeading: "How to check an aircond that will not turn on",
      howToName: "How to diagnose a completely dead aircond",
      howToDescription:
        "MCB, remote, socket, then capacitor and PCB — the dead-unit ladder.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(cap),
      supply: ["Alkaline remote cells", "Start capacitor", "Indoor fuse or PCB"],
      tool: ["Socket tester", "Multimeter", "Clamp meter"],
      steps: [
        { name: "Read the aircond MCB", text: "A tripped breaker is the free fix. If it retrips instantly, stop — that is the electrical-fault path, not another reset." },
        { name: "Prove the remote and the socket", text: "New alkalines, camera IR test, then plug a lamp into the same outlet. A dead socket is a house problem." },
        { name: "Try the indoor manual button", text: "If the hidden AUTO key starts the unit, the chassis has power and the remote side is the job." },
        { name: "Open the electrical box", text: `Click-but-no-start is capacitor (${cap}). Live indoor, dead outdoor is contactor or isolator. No lights at all is loom or PCB (${pcb}).` },
        { name: "Quote before any board or compressor talk", text: "A completely dark unit is usually power, not a ${compressor} event. We say so before anyone mentions replacement." },
      ],
      answers: [
        { q: "Why will my aircond not turn on at all?", a: `Start at the MCB, then the remote, then the socket. Those three free checks close a large share of 'dead unit' calls. What remains is capacitor, wiring or PCB. A dark indoor display is almost never a compressor — the compressor cannot run if the indoor board never woke up.` },
        { q: "What should I check before calling a technician?", a: `Breaker, batteries, socket, isolator, manual button. Photograph the breaker position and the indoor display (or the lack of one). WhatsApp those two pictures. If the breaker retrips, leave it off and say so — that changes who we send. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "How much to fix an aircond that will not start?", a: `Capacitor ${cap}. Wiring by damage. PCB ${pcb}. Diagnostic ${diag} waived with the repair. Compressor ${compressor} is rare on a unit that never lights up and is only quoted after the electrical ladder is finished. Diagnostic is waived when the repair is completed on the same visit.` },
        { q: "The unit clicks but never starts — is that the same fault?", a: `A click is the board trying. The capacitor usually cannot boost the compressor. That is a same-day ${cap} job, not a new aircond. Do not keep sending the click — it heats the windings. Ask for the confirmed figure on WhatsApp before anyone opens the cabinet.` },
      ],
    },
    ms: {
      howToHeading: "Langkah semak aircond yang langsung tidak hidup",
      howToName: "Cara diagnosis aircond yang mati sepenuhnya",
      howToDescription:
        "MCB, remote, soket, kemudian kapasitor dan PCB — tangga unit mati.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(cap),
      supply: ["Sel alkali remote", "Kapasitor mula", "Fius dalam atau PCB"],
      tool: ["Penguji soket", "Multimeter", "Clamp meter"],
      steps: [
        { name: "Baca MCB aircond", text: "Pemutus terjatuh ialah baiki percuma. Jika ia trip semula serta-merta, berhenti — itu laluan kerosakan elektrik, bukan reset lagi." },
        { name: "Buktikan remote dan soket", text: "Alkali baharu, ujian IR kamera, kemudian colok lampu ke outlet sama. Soket mati ialah masalah rumah." },
        { name: "Cuba butang manual dalam", text: "Jika kekunci AUTO tersembunyi hidupkan unit, casis ada kuasa dan kerja di bahagian remote." },
        { name: "Buka kotak elektrik", text: `Klik-tetapi-tidak-mula ialah kapasitor (${cap}). Dalam hidup, luar mati ialah kontaktor atau isolator. Tiada lampu langsung ialah loom atau PCB (${pcb}).` },
        { name: "Sebut harga sebelum cakap papan atau pekali", text: "Unit gelap sepenuhnya biasanya kuasa, bukan peristiwa ${compressor}. Kami kata begitu sebelum sesiapa sebut ganti." },
      ],
      answers: [
        { q: "Kenapa aircond saya langsung tidak hidup?", a: `Mulakan di MCB, kemudian remote, kemudian soket. Tiga semakan percuma itu menutup bahagian besar panggilan 'unit mati'. Yang tinggal ialah kapasitor, pendawaian atau PCB. Paparan dalam gelap hampir tidak pernah pekali — pekali tidak boleh jalan jika papan dalam tidak pernah jaga.` },
        { q: "Apa patut saya semak sebelum panggil juruteknik?", a: `Pemutus, bateri, soket, isolator, butang manual. Gambar kedudukan pemutus dan paparan dalam (atau ketiadaannya). WhatsApp dua gambar itu. Jika pemutus trip semula, biarkan mati dan nyatakan — itu tukar siapa kami hantar. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos membaiki aircond yang tidak mahu hidup?", a: `Kapasitor ${cap}. Pendawaian mengikut kerosakan. PCB ${pcb}. Diagnostik ${diag} dilepaskan dengan pembaikan. Pekali ${compressor} jarang pada unit yang tidak pernah menyala dan hanya dikutip selepas tangga elektrik siap. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Unit berbunyi klik tetapi tidak mula — adakah kerosakan sama?", a: `Klik bermakna papan sedang cuba. Kapasitor biasanya tidak dapat menolak pekali. Itu kerja ${cap} hari sama, bukan aircond baru. Jangan terus hantar klik — ia memanaskan belitan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何检查完全不开机的冷气",
      howToName: "如何诊断彻底没反应的冷气",
      howToDescription:
        "MCB、遥控、插座，再电容和主板。这是死机阶梯。",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(cap),
      supply: ["遥控碱性电池", "启动电容", "室内保险丝或 PCB"],
      tool: ["插座测试器", "万用表", "钳形表"],
      steps: [
        { name: "看冷气回路的 MCB", text: "跳闸是免费修复。若立刻再跳，停下——那是电气故障路径，不是再复位一次。" },
        { name: "证明遥控和插座是好的", text: "新碱性电池、摄像头测红外，再把台灯插进同一插座。插座没电是家里的事。" },
        { name: "试室内手动键", text: "隐藏 AUTO 键能开机，说明机身有电，问题在遥控一侧。" },
        { name: "打开电气盒", text: `有咔嗒不启动是电容（${cap}）。室内亮、室外死，是接触器或隔离开关。灯全不亮，是线束或 PCB（${pcb}）。` },
        { name: "谈主板或压缩机之前先报价", text: `完全黑屏的机器通常是电源，不是 ${compressor} 事件。在有人提换机之前我们就说明。` },
      ],
      answers: [
        { q: "为什么冷气完全不开机？", a: `从 MCB 开始，再到遥控和插座。这三项免费检查能关掉很大一部分“死机”电话。剩下的才是电容、接线或主板。室内屏全黑，几乎不会是压缩机——室内板没醒来，压缩机根本转不了。` },
        { q: "叫技师之前该查什么？", a: `断路器、电池、插座、隔离开关、手动键。拍下断路器位置和室内屏（或没有屏）。把两张照片发到 WhatsApp。若断路器再次跳开，保持断开并写明——这会改变我们派谁。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "不开机的冷气修多少钱？", a: `电容 ${cap}。接线按损坏。PCB ${pcb}。诊断费 ${diag}，维修则免。从不亮灯的机器很少需要 ${compressor} 的压缩机，只有电气阶梯走完才报价。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "机器咔嗒一声却不启动，是同一类故障吗？", a: `咔嗒说明主板在试。电容通常推不动压缩机。这是当天 ${cap} 的活，不是新冷气。不要连续送出咔嗒——那会加热绕组。 签字工单会写明零件和价格，不靠口头约定。 同一次上门做完维修，诊断费就免除。` },
      ],
    },
  },

  "aircond-blinking-light": {
    en: {
      howToHeading: "How to read an aircond blinking error light",
      howToName: "How to decode and clear an aircond blink code",
      howToDescription:
        "Count, identify the brand chart, then test the sensor or pressure the code actually names.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Replacement thermistor if the code names it", "Refrigerant if it is a low-pressure code", "PCB if the code is internal"],
      tool: ["Phone for blink video", "Brand code chart", "Multimeter"],
      steps: [
        { name: "Count blinks before the pause", text: "Three flashes, pause, repeat is not the same as a steady flicker. Record ten seconds. Colour matters on dual-LED brands." },
        { name: "Name the brand and model", text: "Daikin A1 is not Panasonic's three-blink timer. Without the brand the count is trivia." },
        { name: "Match the chart, then test that part", text: `A sensor code gets a resistance check (${sensor}). A low-pressure code gets gauges, not a new board. A communication code gets the interconnect loom.` },
        { name: "Reset only after the cause is fixed", text: "A ten-minute MCB rest clears a stored latch. If the blink returns, the fault is still live — we repair, we do not just reset." },
        { name: "Hand over the decoded meaning", text: "You leave with the code name in plain language and the part that actually failed, written on the job card." },
      ],
      answers: [
        { q: "What does a blinking light on my aircond mean?", a: `It is the unit's own error language, not a random glitch. Count, colour and brand map to a sensor, a pressure trip, a comms fault or a board. Some codes are a dirty-filter reminder. Others are compressor protection. Guessing from a generic chart online is how people order the wrong part.` },
        { q: "How do I tell KL Renovator which code I have?", a: `WhatsApp a video of the blink, plus brand and model from the indoor sticker. We answer common Daikin, Panasonic, Mitsubishi, York and Midea patterns before the van moves. Do not keep power-cycling to 'clear' it — that can hide a protection code we need.` },
        { q: "How much to fix a blinking-light fault?", a: `It follows the part the code names. Sensor ${sensor}. Gas after leak check at ${r22} or ${r32}. Capacitor ${cap}. PCB ${pcb}. Diagnostic ${diag} waived with the repair. The video usually lets us quote a band before arrival. Diagnostic is waived when the repair is completed on the same visit.` },
        { q: "Can I reset the blink code myself?", a: `Yes: MCB off for ten minutes. If the light comes back, the cause is still there. A reset is a diagnostic tool, not a repair. Repeated resets on a low-pressure or overcurrent code stress the compressor. Ask for the confirmed figure on WhatsApp before anyone opens the cabinet.` },
      ],
    },
    ms: {
      howToHeading: "Langkah baca lampu ralat berkelip aircond",
      howToName: "Cara nyahkod dan bersih kod kelip aircond",
      howToDescription:
        "Kira, kenal carta jenama, kemudian uji sensor atau tekanan yang dinamakan kod itu.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Termistor ganti jika kod menamainya", "Penyejuk jika kod tekanan rendah", "PCB jika kod dalaman"],
      tool: ["Telefon untuk video kelip", "Carta kod jenama", "Multimeter"],
      steps: [
        { name: "Kira kelip sebelum jeda", text: "Tiga kelip, jeda, ulang bukan sama dengan kelip tetap. Rakam sepuluh saat. Warna penting pada jenama LED berkembar." },
        { name: "Namakan jenama dan model", text: "Daikin A1 bukan pemasa tiga kelip Panasonic. Tanpa jenama kiraan itu trivia." },
        { name: "Padankan carta, kemudian uji bahagian itu", text: `Kod sensor dapat semakan rintangan (${sensor}). Kod tekanan rendah dapat tolok, bukan papan baru. Kod komunikasi dapat loom penghubung.` },
        { name: "Reset hanya selepas punca dibaiki", text: "Rehat MCB sepuluh minit membersihkan selak tersimpan. Jika kelip kembali, kerosakan masih hidup — kami baiki, bukan sekadar reset." },
        { name: "Serah makna yang dinyahkod", text: "Anda pulang dengan nama kod dalam bahasa biasa dan bahagian yang benar-benar gagal, ditulis pada kad kerja." },
      ],
      answers: [
        { q: "Apa maksud lampu berkelip pada aircond saya?", a: `Ia bahasa ralat unit itu sendiri, bukan gangguan rawak. Kiraan, warna dan jenama memeta ke sensor, trip tekanan, kerosakan comms atau papan. Sesetengah kod peringatan penapis kotor. Yang lain perlindungan pekali. Meneka dari carta generik dalam talian ialah cara orang pesan bahagian salah.` },
        { q: "Bagaimana saya beritahu KL Renovator kod mana yang saya ada?", a: `WhatsApp video kelip, plus jenama dan model dari pelekat dalam. Kami jawab corak Daikin, Panasonic, Mitsubishi, York dan Midea biasa sebelum van bergerak. Jangan terus kitar kuasa untuk 'bersihkannya' — itu boleh sorok kod perlindungan yang kami perlukan. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos membaiki kerosakan lampu berkelip?", a: `Ia mengikut bahagian yang dinamakan kod. Sensor ${sensor}. Gas selepas semak bocor pada ${r22} atau ${r32}. Kapasitor ${cap}. PCB ${pcb}. Diagnostik ${diag} dilepaskan dengan pembaikan. Video biasanya benarkan kami sebut jalur sebelum tiba. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Bolehkah saya reset kod kelip sendiri?", a: `Boleh: MCB mati sepuluh minit. Jika lampu kembali, punca masih ada. Reset ialah alat diagnostik, bukan pembaikan. Reset berulang pada kod tekanan rendah atau arus lampau menekan pekali. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何读取冷气闪灯故障码",
      howToName: "如何解读并清除冷气闪灯代码",
      howToDescription:
        "先数次数，对照该品牌图表，再测代码真正点名的传感器或压力。",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["代码点名时的热敏电阻", "低压代码时的制冷剂", "内部代码时的 PCB"],
      tool: ["拍闪灯的手机", "品牌代码表", "万用表"],
      steps: [
        { name: "数暂停前的闪烁次数", text: "闪三下停一下，和常亮闪烁不是一回事。录十秒。双色灯品牌还要看颜色。" },
        { name: "报出品牌和型号", text: "大金 A1 不是松下的三闪定时灯。没有品牌，次数只是 trivia。" },
        { name: "对照图表，再测那个零件", text: `传感器代码做电阻检查（${sensor}）。低压代码用表，不要换新板。通讯代码查连接线。` },
        { name: "修好原因再复位", text: "MCB 休息十分钟能清掉锁存。灯又回来，故障还在——我们修，不只复位。" },
        { name: "用白话交出解码结果", text: "离开时工单上会写代码的普通人含义，以及真正坏掉的零件。" },
      ],
      answers: [
        { q: "冷气灯闪是什么意思？", a: `那是机器自己的故障语言，不是随便乱闪。次数、颜色和品牌会指向传感器、压力保护、通讯或主板。有的只是提醒洗过滤网，有的是压缩机保护。对着网上通用表猜，就会订错件。` },
        { q: "怎样告诉 KL Renovator 是哪一个代码？", a: `把闪灯视频，加上室内贴纸上的品牌型号，发到 WhatsApp。常见大金、松下、三菱、约克、美的图案，车没动就能先答。不要靠反复断电来“清除”——那会藏起我们需要的保护码。` },
        { q: "修闪灯故障多少钱？", a: `跟着代码点名的零件走。传感器 ${sensor}。检漏后充气 ${r22} 或 ${r32}。电容 ${cap}。PCB ${pcb}。诊断费 ${diag}，维修则免。视频通常让我们在到达前报一个区间。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "我能自己复位闪灯吗？", a: `能：MCB 关十分钟。灯再亮，原因还在。复位是诊断工具，不是修理。在低压或过流代码上反复复位，会折腾压缩机。 零件在车上时，吉隆坡与雪兰莪都有当天档期。 签字工单会写明零件和价格，不靠口头约定。` },
      ],
    },
  },

  "aircond-water-dripping": {
    en: {
      howToHeading: "How to stop aircond water dripping early",
      howToName: "How to diagnose early-stage aircond dripping",
      howToDescription:
        "Catch the rate, flush a partial blockage, overhaul only if the drip survives a wash.",
      totalTime: "PT40M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Small container to measure drip rate", "Drain chemical", "Insulation tape for sweating pipes"],
      tool: ["Wet vacuum", "Flush pump", "Moisture meter"],
      steps: [
        { name: "Time the drip", text: "A drop every few minutes after start-up can be extra condensate on a humid day. A steady cadence is a partial blockage." },
        { name: "See whether it is fascia or pipe-sweat", text: "Sweating on the exposed copper is insulation, not a drain. We wrap that; we do not wash it." },
        { name: "Flush while the blockage is still partial", text: `This is the cheap moment. Chemical wash from ${wash} clears most early drips in 30–45 minutes.` },
        { name: "Escalate if the drip is back next week", text: `A surviving drip is a pan or slope job. Wall-mounted overhaul from ${overhaul}.` },
        { name: "Show a dry fascia on Cool", text: "We leave only after a Cool run produces condensate at the outdoor outlet, not on the floor." },
      ],
      answers: [
        { q: "Why is my aircond dripping water?", a: `Early dripping is a drain starting to clog, not a unit dying. Humidity makes extra condensate; slime makes it overflow. Catch it at the drip stage and a wash from ${wash} is usually enough. Wait until it streams and you are in overhaul territory.` },
        { q: "How do I stop a small drip becoming a leak?", a: `Put a cup under it, note if the rate rises over two days, and book the wash. Do not ignore a drip that only happens on Cool — that is condensate, not rain. WhatsApp a 20-second clip of the drip cadence.` },
        { q: "How much to fix aircond dripping?", a: `Most drips: chemical wash from ${wash}. Persistent or heavy: wall-mounted overhaul from ${overhaul}. Sweating copper is an insulation wrap, quoted on length. Diagnostic ${diag} waived with the work. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Is occasional dripping normal?", a: `A single drop on a very wet afternoon can be extra condensate clearing. A regular pattern — every evening, same corner of the fascia — is a blockage rehearsing. Treat regular as a booking, not as weather. Diagnostic is waived when the repair is completed on the same visit.` },
      ],
    },
    ms: {
      howToHeading: "Langkah hentikan aircond menitis di peringkat awal",
      howToName: "Cara diagnosis titisan aircond peringkat awal",
      howToDescription:
        "Tampung kadar, basuh sekatan separa, overhaul hanya jika titisan selamat selepas cucian.",
      totalTime: "PT40M",
      estimatedCostValue: priceAmount(wash),
      supply: ["Bekas kecil untuk ukur kadar titis", "Kimia longkang", "Pita penebat untuk paip berpeluh"],
      tool: ["Vakum basah", "Pam basuh", "Meter kelembapan"],
      steps: [
        { name: "Masa titisan", text: "Satu titis setiap beberapa minit selepas mula boleh jadi kondensat tambahan pada hari lembap. Irama tetap ialah sekatan separa." },
        { name: "Tengok sama ada fascia atau peluh paip", text: "Peluh pada tembaga terdedah ialah penebat, bukan longkang. Kami balut itu; kami tidak mencucinya." },
        { name: "Basuh semasa sekatan masih separa", text: `Ini saat murah. Cuci kimia dari ${wash} membersihkan kebanyakan titis awal dalam 30–45 minit.` },
        { name: "Eskalasi jika titis kembali minggu depan", text: `Titis yang selamat ialah kerja dulang atau cerun. Overhaul dinding dari ${overhaul}.` },
        { name: "Tunjuk fascia kering pada Cool", text: "Kami pulang hanya selepas jalan Cool menghasilkan kondensat di outlet luar, bukan di lantai." },
      ],
      answers: [
        { q: "Kenapa aircond saya menitis air?", a: `Titis awal ialah longkang mula tersumbat, bukan unit mati. Kelembapan membuat kondensat tambahan; lendir membuatnya melimpah. Tangkap pada peringkat titis dan cucian dari ${wash} biasanya cukup. Tunggu sehingga ia mengalir dan anda dalam wilayah overhaul. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
        { q: "Bagaimana saya halang titis kecil jadi bocor?", a: `Letak cawan di bawah, catat jika kadar naik dalam dua hari, dan tempah cucian. Jangan abaikan titis yang hanya berlaku pada Cool — itu kondensat, bukan hujan. WhatsApp klip 20 saat irama titis. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos membaiki aircond menitis?", a: `Kebanyakan titis: cuci kimia dari ${wash}. Berterusan atau deras: overhaul unit dinding dari ${overhaul}. Tembaga berpeluh ialah balutan penebat, dikutip mengikut panjang. Diagnostik ${diag} dilepaskan dengan kerja. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Adakah titisan sekali-sekala normal?", a: `Satu titis pada petang sangat basah boleh jadi kondensat tambahan sedang keluar. Corak tetap — setiap petang, sudut fascia sama — ialah sekatan sedang berlatih. Anggap yang tetap sebagai tempahan, bukan cuaca. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet.` },
      ],
    },
    zh: {
      howToHeading: "如何在早期止住冷气滴水",
      howToName: "如何诊断早期冷气滴水",
      howToDescription:
        "先记下滴速，冲洗部分堵塞，清洗后还滴才大修。",
      totalTime: "PT40M",
      estimatedCostValue: priceAmount(wash),
      supply: ["量滴速的小杯", "排水清洗剂", "出汗铜管用的保温胶带"],
      tool: ["湿吸尘器", "冲洗泵", "湿度计"],
      steps: [
        { name: "给滴水计时", text: "开机后隔几分钟一滴，潮湿天可能是多余冷凝。稳定节奏就是部分堵塞。" },
        { name: "分清是面板滴还是管子出汗", text: "外露铜管出汗是保温问题，不是排水。我们包它，不洗它。" },
        { name: "趁堵塞还只是部分时冲洗", text: `这是便宜窗口。化学清洗从 ${wash} 起，多数早期滴水 30–45 分钟能清掉。` },
        { name: "下周还滴就升级", text: `洗完还在的滴水，是水盘或坡度的活。挂壁式大修从 ${overhaul} 起。` },
        { name: "制冷时面板必须是干的", text: "只有制冷运行后冷凝水从室外出口走、而不是落在地板上，我们才离开。" },
      ],
      answers: [
        { q: "为什么冷气在滴水？", a: `早期滴水是排水开始堵，不是机器要死。湿度制造多余冷凝，黏液让它溢出来。停在滴水阶段，从 ${wash} 起的清洗通常够了。等到成股流，就进入大修区间。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "怎样不让小滴变成大漏？", a: `下面放杯子，看两天内皮速有没有加快，并预约清洗。不要忽略只在制冷时出现的滴——那是冷凝，不是雨。发一段二十秒滴速视频过来。 零件在车上时，吉隆坡与雪兰莪都有当天档期。` },
        { q: "修滴水多少钱？", a: `多数滴水：化学清洗从 ${wash} 起。持续或很凶：挂壁式大修从 ${overhaul} 起。铜管出汗是包保温，按长度报价。诊断费 ${diag}，干活则免。 签字工单会写明零件和价格，不靠口头约定。` },
        { q: "偶尔滴一下正常吗？", a: `很湿的下午偶然一滴，可能是多余冷凝在排出。固定规律——每天晚上、同一块面板角——就是堵塞在彩排。把规律当成预约，而不是天气。 同一次上门做完维修，诊断费就免除。` },
      ],
    },
  },

  "aircond-thermostat-problems": {
    en: {
      howToHeading: "How to tell if an aircond thermostat is faulty",
      howToName: "How to diagnose aircond thermostat and thermistor faults",
      howToDescription:
        "Set-point check, room feel, then thermistor resistance versus a reference thermometer.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Replacement thermistor", "Remote if the set-point is locked", "Coil clean if airflow fools the bead"],
      tool: ["Reference thermometer", "Multimeter", "Anemometer"],
      steps: [
        { name: "Confirm the remote set-point", text: "A locked 16°C or a child-lock Cool will look like a runaway thermostat. Photograph the display." },
        { name: "Feel whether the room ever matches the number", text: "Room colder than the set-point and the compressor still on is a lying sensor. Room never gets there is charge, size or airflow." },
        { name: "Measure the bead against a real thermometer", text: `KL Renovator checks thermistor resistance at ambient. Out of table: ${sensor}, usually same-day.` },
        { name: "Wash if the bead is only seeing dead air", text: `A dirty coil next to the sensor gives a false 'room cold' reading and short-cycles. Wash from ${wash} before another sensor is condemned.` },
        { name: "Board last", text: `If the bead is honest and the board still ignores it, the regulation circuit is ${pcb} territory.` },
      ],
      answers: [
        { q: "Why does my aircond ignore the set temperature?", a: `Usually the thermistor is reporting the wrong ambient, so the board thinks the room is still warm — or already cold. A locked remote and a dirty coil next to the bead impersonate the same fault. We meter the sensor before we touch the board.` },
        { q: "How do you fix thermostat problems?", a: `Prove the set-point, compare room feel to a thermometer, then read the thermistor table. Most jobs are a ${sensor} bead or a wash. Short-cycling on an oversized unit is a sizing conversation, not another part. Ask for the confirmed figure on WhatsApp before anyone opens the cabinet.` },
        { q: "How much is thermistor replacement?", a: `Temperature sensors are ${sensor}. PCB regulation faults are ${pcb}. Diagnostic ${diag} waived with the repair. We carry the common wall-mounted beads for same-day swap. Same-day slots run across KL and Selangor once the part is on the van. The signed job card lists the part and the price so nothing is left verbal.` },
        { q: "Can a dirty filter look like a thermostat fault?", a: `Yes. Restricted air over the bead reads warmer or colder than the room, so the compressor never sits still. Wash the filter and, if the lie continues, the coil. Only then replace the sensor. The signed job card lists the part and the price so nothing is left verbal.` },
      ],
    },
    ms: {
      howToHeading: "Langkah kenal pasti termostat aircond yang rosak",
      howToName: "Cara diagnosis kerosakan termostat dan termistor aircond",
      howToDescription:
        "Semak set-point, rasa bilik, kemudian rintangan termistor berbanding termometer rujukan.",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["Termistor ganti", "Remote jika set-point dikunci", "Cuci gegelung jika aliran menipu manik"],
      tool: ["Termometer rujukan", "Multimeter", "Anemometer"],
      steps: [
        { name: "Sahkan set-point remote", text: "16°C terkunci atau Cool kunci kanak-kanak nampak seperti termostat lari. Gambar paparan." },
        { name: "Rasa sama ada bilik pernah sepadan nombor", text: "Bilik lebih sejuk daripada set-point dan pekali masih hidup ialah sensor menipu. Bilik tidak pernah sampai ialah cas, saiz atau aliran." },
        { name: "Ukur manik berbanding termometer sebenar", text: `KL Renovator semak rintangan termistor pada ambien. Luar jadual: ${sensor}, biasanya hari sama.` },
        { name: "Cuci jika manik hanya nampak udara mati", text: `Gegelung kotor di sebelah sensor memberi bacaan 'bilik sejuk' palsu dan short-cycle. Cuci dari ${wash} sebelum sensor lain dihukum.` },
        { name: "Papan akhir sekali", text: `Jika manik jujur dan papan masih abaikan, litar pengawalan ialah wilayah ${pcb}.` },
      ],
      answers: [
        { q: "Kenapa aircond saya abaikan suhu tetapan?", a: `Biasanya termistor laporkan ambien salah, jadi papan fikir bilik masih panas — atau sudah sejuk. Remote terkunci dan gegelung kotor di sebelah manik menyamar kerosakan sama. Kami ukur sensor sebelum sentuh papan. Diagnostik dilepaskan jika pembaikan disiapkan pada lawatan yang sama.` },
        { q: "Bagaimana KL Renovator baiki masalah termostat?", a: `Buktikan set-point, banding rasa bilik dengan termometer, kemudian baca jadual termistor. Kebanyakan kerja ialah manik ${sensor} atau cucian. Short-cycle pada unit terlalu besar ialah perbualan saiz, bukan alat ganti lagi. Minta angka disahkan di WhatsApp sebelum sesiapa buka kabinet. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van.` },
        { q: "Berapa kos ganti termistor?", a: `Sensor suhu ${sensor}. Kerosakan pengawalan PCB ${pcb}. Diagnostik ${diag} dilepaskan dengan pembaikan. Kami bawa manik dinding biasa untuk tukar hari sama. Slot hari sama merangkumi KL dan Selangor bila alat ganti ada di van. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
        { q: "Bolehkah penapis kotor nampak seperti kerosakan termostat?", a: `Ya. Udara tersekat pada manik membaca lebih panas atau lebih sejuk daripada bilik, jadi pekali tidak pernah diam. Basuh penapis dan, jika pembohongan berterusan, gegelung. Baru kemudian ganti sensor. Kad kerja bertandatangan menyenaraikan bahagian dan harga supaya tiada yang lisan.` },
      ],
    },
    zh: {
      howToHeading: "如何判断冷气温控是否故障",
      howToName: "如何诊断冷气温控器与热敏电阻故障",
      howToDescription:
        "先核对设定温度和房间体感，再把热敏电阻阻值对照参考温度计。",
      totalTime: "PT45M",
      estimatedCostValue: priceAmount(sensor),
      supply: ["替换热敏电阻", "设定被锁时的遥控", "气流欺骗探头时的盘管清洗"],
      tool: ["参考温度计", "万用表", "风速仪"],
      steps: [
        { name: "确认遥控设定值", text: "锁在 16°C 或童锁制冷，看起来会像温控失控。先拍显示屏。" },
        { name: "感受房间是否曾达到那个数字", text: "房间比设定更冷压缩机还在转，是传感器在撒谎。房间永远到不了，是充注、匹数或风量。" },
        { name: "用真温度计对照探头", text: `KL Renovator 在环境温度下测热敏电阻。不在表内：${sensor}，通常当天能换。` },
        { name: "探头只吹到死空气就先洗", text: `探头旁边的脏盘管会给出假的“房间已冷”，造成短循环。先从 ${wash} 起清洗，再给另一只传感器定罪。` },
        { name: "主板放最后", text: `探头老实、主板仍不理，调节电路才进入 ${pcb} 范围。` },
      ],
      answers: [
        { q: "为什么冷气不理设定温度？", a: `通常是热敏电阻报错了环境温度，主板以为房间还热——或已经够冷。锁定的遥控，以及探头旁的脏盘管，会装成同一故障。我们先量传感器，再动主板。 同一次上门做完维修，诊断费就免除。` },
        { q: "温控问题怎么修？", a: `证明设定值，用温度计对照体感，再读热敏电阻对照表。多数活是 ${sensor} 的探头或一次清洗。匹数过大造成的短循环，是选型对话，不是再换一个零件。 开工前先在 WhatsApp 确认数字，再打开机壳。` },
        { q: "换热敏电阻多少钱？", a: `温度传感器 ${sensor}。PCB 调节故障 ${pcb}。诊断费 ${diag}，维修则免。常用挂壁探头当天可换。 零件在车上时，吉隆坡与雪兰莪都有当天档期。 签字工单会写明零件和价格，不靠口头约定。` },
        { q: "脏过滤网会看起来像温控坏了吗？", a: `会。探头上的气流被挡住，读数就会比房间更热或更冷，压缩机停不住。先洗过滤网，还在撒谎就洗盘管。最后才换传感器。 签字工单会写明零件和价格，不靠口头约定。` },
      ],
    },
  },
};

export function getProblemAeoPack(slug: string): ProblemAeoPack | undefined {
  return problemHowtoAnswers[slug as ProblemAeoSlug];
}

export function getProblemAeoCopy(
  slug: string,
  locale: ProblemAeoLocale,
): ProblemAeoLocaleCopy | undefined {
  return getProblemAeoPack(slug)?.[locale];
}

