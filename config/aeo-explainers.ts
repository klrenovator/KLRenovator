/**
 * AEO explainers — hand-authored definition answers and comparison tables.
 *
 * Why this exists
 * ---------------
 * Part 2 of the audit (finding C9b / issue #72) measured that most editorial
 * pages never answer the two question shapes answer engines quote most:
 *
 *   1. "What is <term>?"            — a definition block
 *   2. "<A> vs <B>, which is X?"    — a comparison with a real table
 *
 * PR #77 covered the commercial templates (area / kampung / brand /
 * brand-area / *-installation). This file covers the editorial side: blog
 * posts, service pages, installation landings and calculators.
 *
 * Rules this file follows deliberately
 * ------------------------------------
 * - Every entry is written once per language. The MS and ZH versions are
 *   authored, not machine-mirrored — they differ in structure and wording,
 *   not just vocabulary, because the audit and Google both treat
 *   string-identical locales as untranslated.
 * - ZH question headings end in the full-width `？` so they register as
 *   questions.
 * - Nothing here is generic filler. A term is only ever rendered on a page
 *   whose own body already talks about that term (see
 *   `lib/aeo-explainer-select.ts`), so a post about drainage never gets a
 *   lecture about MEPS labels.
 * - All money comes from `lib/published-prices.ts`, never typed inline.
 */

import { publishedPrices } from "@/lib/published-prices";

export type ExplainerLocale = "en" | "ms" | "zh";

export type LocalizedText = Record<ExplainerLocale, string>;
export type LocalizedList = Record<ExplainerLocale, string[]>;

export type GlossaryTerm = {
  id: string;
  /** Short label used for the "in this guide" chip row. */
  label: LocalizedText;
  /** Lower-cased fragments; the term is only used if the page body contains one. */
  match: LocalizedList;
  /** Question-form heading. ZH must end with `？`. */
  question: LocalizedText;
  /** 40–90 word direct answer. */
  answer: LocalizedText;
  /** One extra practical line — what a homeowner should actually do about it. */
  practical: LocalizedText;
};

export type ComparisonRow = {
  factor: LocalizedText;
  a: LocalizedText;
  b: LocalizedText;
};

export type ComparisonSet = {
  id: string;
  /** Both sides must be discussed on the page for the block to appear. */
  matchA: LocalizedList;
  matchB: LocalizedList;
  /** Heading must contain a comparison cue (vs / perbandingan / 对比). */
  question: LocalizedText;
  intro: LocalizedText;
  optionA: LocalizedText;
  optionB: LocalizedText;
  rows: ComparisonRow[];
  /** Plain-language recommendation shown under the table. */
  verdict: LocalizedText;
};

/* ────────────────────────────── glossary ─────────────────────────────── */

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "chemical-wash",
    label: {
      en: "Pressure chemical wash",
      ms: "Cuci kimia tekanan",
      zh: "高压化学清洗",
    },
    match: {
      en: ["chemical wash", "chemical cleaning"],
      ms: ["cuci kimia", "pencucian kimia"],
      zh: ["化学清洗", "化学清洁"],
    },
    question: {
      en: "What is a pressure chemical wash?",
      ms: "Apa itu cuci kimia tekanan?",
      zh: "高压化学清洗是什么？",
    },
    answer: {
      en: `A pressure chemical wash is a deep clean done with the indoor unit still on the wall. The technician sheets the wall and floor, sprays a coil-safe chemical onto the evaporator fins and blower wheel, then flushes everything out with a pressurised water jet into a catch bag. It removes the mould film and dust mat that ordinary filter washing cannot reach. Published price starts at ${publishedPrices.chemicalWash15} for a 1.0–1.5 HP wall unit.`,
      ms: `Cuci kimia tekanan ialah pembersihan mendalam yang dibuat tanpa menurunkan unit indoor dari dinding. Juruteknik menutup dinding dan lantai, menyembur bahan kimia yang selamat untuk gegelung ke atas sirip evaporator dan blower, kemudian membilasnya dengan pancutan air bertekanan ke dalam beg tadahan. Lapisan kulat dan debu yang tidak dapat dicapai dengan basuh penapis biasa akan tanggal. Harga diterbitkan bermula ${publishedPrices.chemicalWash15} bagi unit dinding 1.0–1.5 HP.`,
      zh: `高压化学清洗是在室内机不拆下墙的情况下进行的深度清洁。技术员会先铺好防护布，把对铜管与铝翅片安全的清洗剂喷在蒸发器与贯流风轮上，再用高压水枪冲洗，污水直接流入接水袋。它能清掉普通洗滤网无法处理的霉膜和积尘层。1.0–1.5 匹挂壁机的公开价格由 ${publishedPrices.chemicalWash15} 起。`,
    },
    practical: {
      en: "Most Klang Valley homes need one every 10–12 months; every 6 months if the unit runs overnight or the room faces a construction site.",
      ms: "Kebanyakan rumah di Lembah Klang perlukan sekali setiap 10–12 bulan; setiap 6 bulan jika unit dipasang semalaman atau bilik menghadap tapak pembinaan.",
      zh: "巴生谷大多数家庭每 10–12 个月做一次即可；若冷气整晚运转或房间正对工地，建议缩短到 6 个月。",
    },
  },
  {
    id: "chemical-overhaul",
    label: {
      en: "Chemical overhaul",
      ms: "Overhaul kimia",
      zh: "化学大修",
    },
    match: {
      en: ["chemical overhaul", "overhaul"],
      ms: ["overhaul kimia", "overhaul"],
      zh: ["化学大修", "大修"],
    },
    question: {
      en: "What is a chemical overhaul?",
      ms: "Apa itu overhaul kimia?",
      zh: "化学大修是什么？",
    },
    answer: {
      en: `A chemical overhaul is the level above a chemical wash: the indoor unit is dismounted, dismantled into casing, blower wheel, drain tray and coil, and each part is soaked and scrubbed separately before reassembly and a leak test. It is the only way to clear a drain tray that has silted up or a blower wheel packed solid with mould. Published price starts at ${publishedPrices.overhaul15} for 1.0–1.5 HP.`,
      ms: `Overhaul kimia ialah tahap lebih tinggi daripada cuci kimia: unit indoor diturunkan, dileraikan kepada penutup, blower, dulang saliran dan gegelung, dan setiap bahagian direndam serta digosok berasingan sebelum dipasang semula dan diuji kebocoran. Inilah satu-satunya cara membersihkan dulang saliran yang tersumbat mendap atau blower yang padat dengan kulat. Harga diterbitkan bermula ${publishedPrices.overhaul15} untuk 1.0–1.5 HP.`,
      zh: `化学大修比化学清洗更彻底：技术员会把室内机整台拆下墙，分解成外壳、风轮、接水盘与蒸发器，逐件浸泡刷洗，装回后再做漏水测试。接水盘已经淤积、或风轮长满霉菌结块时，只有大修才处理得掉。1.0–1.5 匹的公开价格由 ${publishedPrices.overhaul15} 起。`,
    },
    practical: {
      en: "Ask for an overhaul instead of another wash if the unit still drips or smells within weeks of a chemical wash.",
      ms: "Minta overhaul dan bukan cuci kimia sekali lagi jika unit masih menitis atau berbau dalam beberapa minggu selepas cuci kimia.",
      zh: "若刚做完化学清洗几周内又滴水或有异味，直接要求做大修，而不是再洗一次。",
    },
  },
  {
    id: "basic-service",
    label: {
      en: "Basic servicing",
      ms: "Servis asas",
      zh: "基本保养",
    },
    match: {
      en: ["basic service", "basic servicing", "routine service"],
      ms: ["servis asas", "servis rutin"],
      zh: ["基本保养", "基本清洗", "常规保养"],
    },
    question: {
      en: "What is a basic aircond service?",
      ms: "Apa itu servis aircond asas?",
      zh: "基本冷气保养是什么？",
    },
    answer: {
      en: `Basic servicing is the maintenance visit: filters washed, front panel and louvres wiped, drain path flushed, outdoor coil brushed, and cooling temperature plus running current checked before the technician leaves. It keeps airflow and efficiency stable but does not strip mould off the coil. Published price starts at ${publishedPrices.basic15} per 1.0–1.5 HP unit.`,
      ms: `Servis asas ialah lawatan penyelenggaraan: penapis dibasuh, panel depan dan bilah udara dilap, laluan saliran dibilas, gegelung outdoor diberus, dan suhu penyejukan serta arus operasi disemak sebelum juruteknik pulang. Ia mengekalkan aliran udara dan kecekapan tetapi tidak menanggalkan kulat pada gegelung. Harga diterbitkan bermula ${publishedPrices.basic15} bagi setiap unit 1.0–1.5 HP.`,
      zh: `基本保养属于例行维护：清洗滤网、擦拭面板与导风叶片、疏通排水路径、刷洗室外机冷凝器，并在离开前测量出风温度与运行电流。它能维持风量与能效，但无法把蒸发器上的霉膜清掉。1.0–1.5 匹每台的公开价格由 ${publishedPrices.basic15} 起。`,
    },
    practical: {
      en: "Every 3–4 months is the realistic interval for a bedroom unit in KL; stretch it and the next chemical wash gets harder, not cheaper.",
      ms: "Setiap 3–4 bulan ialah jarak masa realistik untuk unit bilik tidur di KL; jika dilewatkan, cuci kimia seterusnya jadi lebih sukar, bukan lebih murah.",
      zh: "吉隆坡的卧室机建议每 3–4 个月一次；拖得越久，下一次化学清洗只会更难做，不会更省钱。",
    },
  },
  {
    id: "gas-topup",
    label: {
      en: "Gas top-up",
      ms: "Tambah gas",
      zh: "加雪种",
    },
    match: {
      en: ["gas top-up", "gas topup", "top up gas", "refrigerant top"],
      ms: ["tambah gas", "isi gas", "topup gas"],
      zh: ["加雪种", "加冷媒", "补充冷媒"],
    },
    question: {
      en: "What is an aircond gas top-up?",
      ms: "Apa itu tambah gas aircond?",
      zh: "冷气加雪种是什么？",
    },
    answer: {
      en: `A gas top-up restores refrigerant pressure in a system that has lost charge. The technician reads the outdoor unit sticker for the gas type, connects a manifold gauge, checks static and running pressure, then charges by PSI to the manufacturer's target. Refrigerant sits in a sealed loop, so a system that needs topping up has a leak somewhere — the charge is a symptom, not the cure. R32 is priced at ${publishedPrices.r32}.`,
      ms: `Tambah gas mengembalikan tekanan penyejuk dalam sistem yang kehilangan cas. Juruteknik membaca pelekat unit outdoor untuk jenis gas, menyambung tolok manifold, menyemak tekanan statik dan semasa beroperasi, kemudian mengisi mengikut PSI sehingga sasaran pengeluar. Penyejuk berada dalam gelung tertutup, jadi sistem yang perlu ditambah gas ada kebocoran — pengisian itu tanda, bukan penawar. R32 dikenakan ${publishedPrices.r32}.`,
      zh: `加雪种是为压力不足的系统补回冷媒。技术员先看室外机铭牌确认冷媒型号，接上压力表组，测量静态压力与运转压力，再按 PSI 充注到厂方标准值。冷媒本身在密闭回路里循环，会少就代表某处漏了——补气只是缓解症状，不是修好。R32 的收费为 ${publishedPrices.r32}。`,
    },
    practical: {
      en: `If the same unit needs gas twice in a year, pay for leak detection and repair (${publishedPrices.gasLeakRepair}) instead of a third top-up.`,
      ms: `Jika unit yang sama perlukan gas dua kali setahun, bayar untuk pengesanan dan pembaikan kebocoran (${publishedPrices.gasLeakRepair}) dan bukan tambah gas kali ketiga.`,
      zh: `同一台机一年内加两次雪种，就该做检漏与补漏（${publishedPrices.gasLeakRepair}），而不是再补第三次。`,
    },
  },
  {
    id: "refrigerant-types",
    label: {
      en: "R32 / R410A / R22",
      ms: "R32 / R410A / R22",
      zh: "R32 / R410A / R22",
    },
    match: {
      en: ["r32", "r410a", "r22", "refrigerant"],
      ms: ["r32", "r410a", "r22", "penyejuk"],
      zh: ["r32", "r410a", "r22", "冷媒", "雪种"],
    },
    question: {
      en: "What is refrigerant, and why does the type matter?",
      ms: "Apa itu refrigeran dan kenapa jenisnya penting?",
      zh: "冷媒是什么，型号为什么重要？",
    },
    answer: {
      en: "Refrigerant is the working fluid that carries heat out of your room. Malaysian homes run three types: R22 in older non-inverter units, R410A in mid-generation inverters and R32 in most units sold today. They operate at different pressures and use different compressor oils, so they can never be mixed or substituted — doing so damages the compressor and voids any warranty.",
      ms: "Refrigeran ialah bendalir kerja yang membawa haba keluar dari bilik anda. Rumah di Malaysia menggunakan tiga jenis: R22 pada unit non-inverter lama, R410A pada inverter generasi pertengahan dan R32 pada kebanyakan unit yang dijual hari ini. Tekanan operasi dan minyak kompresor berbeza, jadi ia tidak boleh dicampur atau digantikan — jika dibuat, kompresor rosak dan waranti terbatal.",
      zh: "冷媒是把室内热量搬到室外的工作介质。马来西亚家庭常见三种：旧式定频机用 R22，中期变频机用 R410A，现在新机大多是 R32。三者的运行压力与压缩机冷冻油都不同，绝对不能混充或互相替代，否则会伤压缩机，保修也随之失效。",
    },
    practical: {
      en: "Photograph the outdoor unit nameplate before you book — it tells the technician the gas type and charge weight, and stops a wrong-gas quote.",
      ms: "Ambil gambar plat nama unit outdoor sebelum menempah — ia memberitahu juruteknik jenis gas dan berat cas, dan mengelak sebut harga gas yang salah.",
      zh: "预约前先拍下室外机铭牌，上面写明冷媒型号与充注量，可避免报错气种的情况。",
    },
  },
  {
    id: "inverter",
    label: {
      en: "Inverter compressor",
      ms: "Kompresor inverter",
      zh: "变频压缩机",
    },
    match: {
      en: ["inverter"],
      ms: ["inverter"],
      zh: ["变频", "inverter"],
    },
    question: {
      en: "What is an inverter aircond?",
      ms: "Apa itu aircond inverter?",
      zh: "变频冷气是什么？",
    },
    answer: {
      en: "An inverter aircond varies compressor speed instead of switching it fully on and off. Once the room reaches the set temperature the compressor slows to a trickle rather than stopping, which holds the temperature steadier and avoids the heavy current spike of every restart. That is where the electricity saving comes from — it is a control difference, not a stronger cooling capacity.",
      ms: "Aircond inverter mengubah kelajuan kompresor dan bukan menghidup-matikannya sepenuhnya. Apabila bilik mencapai suhu ditetapkan, kompresor perlahan sedikit demi sedikit dan bukan berhenti terus, jadi suhu lebih stabil dan lonjakan arus setiap kali hidup semula dapat dielakkan. Di situlah penjimatan elektrik datang — perbezaan kawalan, bukan kuasa penyejukan yang lebih besar.",
      zh: "变频冷气靠调整压缩机转速运行，而不是整台开开停停。房间达到设定温度后，压缩机会降速维持，而不是完全停机，因此温度更稳定，也免去了每次重启的大电流冲击。省电正是来自这种控制方式，而不是制冷量更大。",
    },
    practical: {
      en: "Inverter savings only show up on units that run for hours at a time. A living-room unit switched on for 45 minutes will not pay back the price difference.",
      ms: "Penjimatan inverter hanya nyata pada unit yang berjalan berjam-jam. Unit ruang tamu yang dihidupkan 45 minit tidak akan membayar balik beza harga.",
      zh: "只有长时间连续运转的机器才看得到变频省电的效果。客厅机每次只开 45 分钟，省下的电费追不回差价。",
    },
  },
  {
    id: "btu",
    label: { en: "BTU", ms: "BTU", zh: "BTU（英热单位）" },
    match: {
      en: ["btu"],
      ms: ["btu"],
      zh: ["btu", "英热"],
    },
    question: {
      en: "What is a BTU in aircond sizing?",
      ms: "Apa itu BTU dalam saiz aircond?",
      zh: "冷气规格里的 BTU 是什么？",
    },
    answer: {
      en: "BTU per hour measures how much heat a unit removes from a room in an hour. A 1.0 HP wall unit is roughly 9,000 BTU/h and a 1.5 HP is roughly 12,000 BTU/h. Room area sets the baseline, then you add capacity for west-facing windows, a top-floor ceiling, high occupancy or kitchen heat.",
      ms: "BTU sejam mengukur berapa banyak haba dikeluarkan unit dari bilik dalam satu jam. Unit dinding 1.0 HP lebih kurang 9,000 BTU/j dan 1.5 HP lebih kurang 12,000 BTU/j. Luas bilik menetapkan asas, kemudian tambah kapasiti untuk tingkap menghadap barat, siling tingkat atas, ramai penghuni atau haba dapur.",
      zh: "BTU/小时衡量一台机器每小时能从房间带走多少热量。1.0 匹挂壁机约 9,000 BTU/h，1.5 匹约 12,000 BTU/h。先按房间面积定基准，再针对西晒窗、顶楼天花、人数多或靠近厨房的热源往上加。",
    },
    practical: {
      en: "Oversizing is a real mistake: an over-large unit hits temperature fast, short-cycles, and leaves the room cold but damp.",
      ms: "Saiz terlalu besar memang satu kesilapan: unit terlalu besar cepat mencapai suhu, kerap hidup-mati, dan meninggalkan bilik sejuk tetapi lembap.",
      zh: "选得过大是真实的错误：机器很快到温就频繁启停，房间变冷却依然潮湿。",
    },
  },
  {
    id: "horsepower",
    label: { en: "HP rating", ms: "Nilai HP", zh: "匹数" },
    match: {
      en: ["1.0hp", "1.5hp", "2.0hp", " hp ", "horsepower"],
      ms: ["1.0hp", "1.5hp", "2.0hp", " hp ", "kuasa kuda"],
      zh: ["匹", "hp"],
    },
    question: {
      en: "What does HP mean on an aircond?",
      ms: "Apa maksud HP pada aircond?",
      zh: "冷气上的 HP（匹）是什么意思？",
    },
    answer: {
      en: "HP is the informal Malaysian shorthand for cooling capacity, carried over from compressor horsepower. In practice 1.0 HP ≈ 9,000 BTU/h, 1.5 HP ≈ 12,000 BTU/h, 2.0 HP ≈ 18,000 BTU/h and 2.5 HP ≈ 24,000 BTU/h. Service, chemical wash and installation prices are all quoted against these bands, which is why the technician asks for HP before quoting.",
      ms: "HP ialah singkatan tidak rasmi di Malaysia untuk kapasiti penyejukan, diwarisi daripada kuasa kuda kompresor. Secara praktikal 1.0 HP ≈ 9,000 BTU/j, 1.5 HP ≈ 12,000 BTU/j, 2.0 HP ≈ 18,000 BTU/j dan 2.5 HP ≈ 24,000 BTU/j. Harga servis, cuci kimia dan pemasangan disebut mengikut jalur ini — sebab itulah juruteknik tanya HP sebelum memberi harga.",
      zh: "HP（匹）是马来西亚对制冷量的习惯说法，源自压缩机马力。实务上 1.0 匹约 9,000 BTU/h，1.5 匹约 12,000 BTU/h，2.0 匹约 18,000 BTU/h，2.5 匹约 24,000 BTU/h。保养、化学清洗与安装报价都按匹数分级，所以技术员报价前一定先问匹数。",
    },
    practical: {
      en: "HP is printed on the indoor unit's side label and on the outdoor nameplate — check there rather than guessing from room size.",
      ms: "HP tercetak pada label sisi unit indoor dan pada plat nama outdoor — semak di situ, jangan agak dari saiz bilik.",
      zh: "匹数印在室内机侧面标签和室外机铭牌上，直接查看即可，不必凭房间大小猜。",
    },
  },
  {
    id: "compressor",
    label: { en: "Compressor", ms: "Kompresor", zh: "压缩机" },
    match: {
      en: ["compressor"],
      ms: ["kompresor", "compressor"],
      zh: ["压缩机"],
    },
    question: {
      en: "What does the compressor actually do?",
      ms: "Apa sebenarnya tugas kompresor?",
      zh: "压缩机是什么，负责哪些工作？",
    },
    answer: {
      en: "The compressor sits in the outdoor unit and pumps refrigerant around the loop, raising its pressure so it can dump heat outside. It is the single most expensive component in the system. Most compressor failures are secondary — caused by running low on gas, a failed capacitor, a choked condenser coil or long-term voltage stress rather than by the compressor itself wearing out.",
      ms: "Kompresor terletak dalam unit outdoor dan mengepam refrigeran mengelilingi gelung, menaikkan tekanannya supaya haba dapat dibuang ke luar. Ia komponen paling mahal dalam sistem. Kebanyakan kegagalan kompresor adalah kesan sampingan — akibat gas rendah, kapasitor rosak, gegelung kondenser tersumbat atau tekanan voltan jangka panjang, bukan kerana kompresor itu haus sendiri.",
      zh: "压缩机装在室外机里，负责推动冷媒在回路中循环并提高压力，好把热量排到室外，也是整套系统里最贵的部件。多数压缩机损坏其实是连带后果：缺冷媒运转、电容失效、冷凝器堵塞或长期电压不稳，而不是它自己用坏。",
    },
    practical: {
      en: `Compressor replacement is quoted from ${publishedPrices.compressor} — on a unit past 8 years old, compare that against a new install before approving it.`,
      ms: `Penggantian kompresor disebut harga dari ${publishedPrices.compressor} — untuk unit melebihi 8 tahun, bandingkan dengan pemasangan baharu sebelum meluluskannya.`,
      zh: `更换压缩机的报价由 ${publishedPrices.compressor} 起；机龄超过 8 年时，先和换新机的费用比一比再决定。`,
    },
  },
  {
    id: "capacitor",
    label: { en: "Capacitor", ms: "Kapasitor", zh: "启动电容" },
    match: {
      en: ["capacitor"],
      ms: ["kapasitor", "capacitor"],
      zh: ["电容"],
    },
    question: {
      en: "What is the capacitor and why does it fail first?",
      ms: "Apa itu kapasitor dan kenapa ia rosak dahulu?",
      zh: "电容是什么，为什么它最先坏？",
    },
    answer: {
      en: "The capacitor is a small cylinder in the outdoor unit that gives the compressor and fan motor the starting kick they need. Heat ages it faster than any other part, so it is the most common single failure in Malaysian conditions. Typical symptoms: the outdoor fan hums but will not spin, the unit trips the breaker on start, or cooling works only intermittently.",
      ms: "Kapasitor ialah silinder kecil dalam unit outdoor yang memberi kompresor dan motor kipas tolakan permulaan. Haba menuakannya lebih cepat daripada bahagian lain, jadi ia kerosakan tunggal paling biasa dalam keadaan Malaysia. Gejala tipikal: kipas outdoor berdengung tetapi tidak berpusing, unit trip pemutus litar semasa mula, atau penyejukan hanya menjadi sekejap-sekejap.",
      zh: "电容是室外机里的小圆柱，负责给压缩机和风扇电机提供启动推力。高温会让它比其他部件老化得更快，因此在马来西亚气候下它是最常见的单点故障。典型症状：室外风扇嗡嗡响却不转、开机就跳电，或者时冷时不冷。",
    },
    practical: {
      en: `A capacitor swap is quoted from ${publishedPrices.capacitor} and takes minutes — always rule it out before anyone quotes you a compressor.`,
      ms: `Tukar kapasitor disebut harga dari ${publishedPrices.capacitor} dan mengambil masa beberapa minit — pastikan ia diperiksa sebelum sesiapa menyebut harga kompresor.`,
      zh: `更换电容的报价由 ${publishedPrices.capacitor} 起，几分钟就能换好；有人报价换压缩机之前，先排除电容问题。`,
    },
  },
  {
    id: "outdoor-condenser",
    label: { en: "Outdoor condenser", ms: "Kondenser outdoor", zh: "室外冷凝器" },
    match: {
      en: ["outdoor unit", "condenser"],
      ms: ["unit outdoor", "kondenser"],
      zh: ["室外机", "冷凝器"],
    },
    question: {
      en: "What is the outdoor condenser unit?",
      ms: "Apa itu unit kondenser outdoor?",
      zh: "室外冷凝机组是什么？",
    },
    answer: {
      en: "The outdoor unit holds the compressor, the condenser coil and the fan that blows heat away from the coil. It can only reject heat if air moves freely through the fins, so a coil packed with dust, a unit boxed into a tight service yard, or a hot wall right behind it all raise running pressure and electricity use.",
      ms: "Unit outdoor mengandungi kompresor, gegelung kondenser dan kipas yang menghembus haba dari gegelung itu. Ia hanya boleh membuang haba jika udara bergerak bebas melalui sirip, jadi gegelung penuh habuk, unit terkurung dalam ruang servis sempit, atau dinding panas tepat di belakangnya semuanya menaikkan tekanan operasi dan penggunaan elektrik.",
      zh: "室外机里装着压缩机、冷凝器盘管，以及把热量吹散的风扇。只有空气能顺畅通过翅片，它才排得掉热量；因此翅片积尘、机器被塞在狭小的洗衣阳台，或背后紧贴一面被晒热的墙，都会推高运行压力和耗电。",
    },
    practical: {
      en: "Leave at least 30 cm of clear air behind the condenser and never enclose it in a sealed cabinet or grille box.",
      ms: "Sediakan sekurang-kurangnya 30 cm ruang udara lapang di belakang kondenser dan jangan sesekali menutupnya dalam kabinet atau kotak grill tertutup.",
      zh: "冷凝器背后至少留 30 公分通风空间，切勿用密闭柜体或封闭格栅把它罩起来。",
    },
  },
  {
    id: "evaporator-coil",
    label: { en: "Evaporator coil", ms: "Gegelung evaporator", zh: "蒸发器" },
    match: {
      en: ["evaporator", "indoor coil", "cooling coil"],
      ms: ["evaporator", "gegelung indoor", "gegelung penyejuk"],
      zh: ["蒸发器", "室内盘管"],
    },
    question: {
      en: "What is the evaporator coil?",
      ms: "Apa itu gegelung evaporator?",
      zh: "蒸发器是什么？",
    },
    answer: {
      en: "The evaporator is the finned coil inside the indoor unit where cold refrigerant absorbs heat and moisture from the room air. Because it is permanently wet during operation, it is where mould, bacteria and dust bind together into the grey film that causes the sour smell and the drop in airflow. Filters catch the coarse dust; the coil holds the rest.",
      ms: "Evaporator ialah gegelung bersirip di dalam unit indoor tempat refrigeran sejuk menyerap haba dan lembapan dari udara bilik. Kerana ia sentiasa basah semasa beroperasi, di situlah kulat, bakteria dan habuk terikat menjadi lapisan kelabu yang menyebabkan bau masam dan aliran udara berkurangan. Penapis menangkap habuk kasar; gegelung menyimpan selebihnya.",
      zh: "蒸发器是室内机里的翅片盘管，低温冷媒在这里吸走室内空气的热量与水分。运行时它长期处于潮湿状态，霉菌、细菌与灰尘就在上面结成灰色黏膜，异味和风量下降多半由此而来。滤网只挡得住粗灰，其余都留在盘管上。",
    },
    practical: {
      en: "If the airflow feels weak right after a filter wash, the coil — not the filter — is the blockage, and that needs a chemical wash.",
      ms: "Jika aliran udara masih lemah sebaik sahaja penapis dibasuh, gegelung — bukan penapis — puncanya, dan itu perlukan cuci kimia.",
      zh: "刚洗完滤网风量仍然很弱，堵的是盘管而不是滤网，这就需要化学清洗。",
    },
  },
  {
    id: "drain-pipe",
    label: { en: "Condensate drain", ms: "Saliran kondensat", zh: "冷凝排水" },
    match: {
      en: ["drain pipe", "drainage", "water leak", "condensate"],
      ms: ["paip saliran", "saliran", "bocor air", "kondensat"],
      zh: ["排水管", "排水", "滴水", "冷凝水"],
    },
    question: {
      en: "What is the condensate drain, and why does it block?",
      ms: "Apa itu saliran kondensat dan kenapa ia tersumbat?",
      zh: "冷凝排水管是什么，为什么会堵？",
    },
    answer: {
      en: "Every cooling coil pulls litres of water out of humid Malaysian air each day. That water collects in the drain tray and leaves through a gravity drain pipe. Slime from the coil, dust and insects gradually narrow the pipe until water backs up over the tray lip and drips down your wall. Nine out of ten indoor water leaks are a blocked drain, not a refrigerant fault.",
      ms: "Setiap gegelung penyejuk menarik beberapa liter air dari udara lembap Malaysia setiap hari. Air itu terkumpul dalam dulang saliran dan keluar melalui paip saliran graviti. Lendir dari gegelung, habuk dan serangga menyempitkan paip sedikit demi sedikit sehingga air melimpah bibir dulang dan menitis di dinding anda. Sembilan daripada sepuluh kebocoran air indoor ialah saliran tersumbat, bukan masalah refrigeran.",
      zh: "在马来西亚的潮湿空气里，蒸发器每天会凝出好几公升水，这些水流进接水盘，再靠重力经排水管排走。盘管上的黏泥、灰尘和虫体会一点点把管径缩窄，水最后从接水盘边缘溢出，顺着墙面滴下来。十次室内滴水有九次是排水堵塞，与冷媒无关。",
    },
    practical: {
      en: "Before booking a repair, check whether the outdoor end of the drain pipe is still dripping while the unit runs — no drip means a blockage.",
      ms: "Sebelum menempah pembaikan, periksa sama ada hujung luar paip saliran masih menitis semasa unit beroperasi — jika tiada titisan, ia tersumbat.",
      zh: "叫维修之前，先看开机时室外那端排水管有没有在滴水；完全不滴就是堵了。",
    },
  },
  {
    id: "blower-wheel",
    label: { en: "Blower wheel", ms: "Roda blower", zh: "贯流风轮" },
    match: {
      en: ["blower", "fan wheel"],
      ms: ["blower", "roda kipas"],
      zh: ["风轮", "贯流风扇"],
    },
    question: {
      en: "What is the blower wheel inside an aircond?",
      ms: "Apa itu roda blower dalam aircond?",
      zh: "冷气里的贯流风轮是什么？",
    },
    answer: {
      en: "The blower wheel is the long barrel-shaped fan behind the indoor coil that pushes cooled air into the room. Each of its blades is a small scoop, and each scoop slowly fills with a felt of damp dust. A loaded wheel moves far less air, whistles, and throws dust specks across the room when it starts.",
      ms: "Roda blower ialah kipas panjang berbentuk tong di belakang gegelung indoor yang menolak udara sejuk ke dalam bilik. Setiap bilahnya seperti senduk kecil, dan setiap senduk perlahan-lahan dipenuhi habuk lembap yang melekat. Roda yang sarat menggerakkan jauh lebih sedikit udara, berbunyi bersiul, dan menyembur bintik habuk ke dalam bilik ketika mula.",
      zh: "贯流风轮是室内机盘管后方那根长筒状风扇，负责把冷风送进房间。它的每一片扇叶都是一个小勺，会慢慢积满带湿气的绒状灰尘。风轮一旦积满，风量大幅下降、运转时发出啸声，刚启动时还会把灰点吹得满屋都是。",
    },
    practical: {
      en: "A torch shone into the air outlet shows the blades: grey fur on the blades means a chemical wash is overdue.",
      ms: "Sinarkan lampu suluh ke dalam saluran keluar udara untuk melihat bilahnya: bulu kelabu pada bilah bermakna cuci kimia sudah terlewat.",
      zh: "用手电筒照出风口就能看见扇叶：叶片上有一层灰色绒毛，代表化学清洗早该做了。",
    },
  },
  {
    id: "ceiling-cassette",
    label: { en: "Ceiling cassette", ms: "Ceiling cassette", zh: "天花卡式机" },
    match: {
      en: ["cassette"],
      ms: ["cassette", "kaset"],
      zh: ["卡式", "天花机"],
    },
    question: {
      en: "What is a ceiling cassette unit?",
      ms: "Apa itu unit ceiling cassette?",
      zh: "天花卡式冷气是什么？",
    },
    answer: {
      en: "A ceiling cassette is recessed into the ceiling and blows air out of two or four sides, which suits square shoplots, meeting rooms and open-plan offices better than a wall unit. Servicing it is a different job: the technician works overhead off a ladder, drops the face panel, and often has to deal with a condensate pump rather than a gravity drain.",
      ms: "Ceiling cassette dipasang tersembunyi dalam siling dan menghembus udara ke dua atau empat arah, sesuai untuk kedai berbentuk segi empat, bilik mesyuarat dan pejabat pelan terbuka berbanding unit dinding. Servisnya kerja berbeza: juruteknik bekerja di atas kepala menggunakan tangga, menurunkan panel muka, dan selalunya berdepan pam kondensat dan bukan saliran graviti.",
      zh: "天花卡式机嵌入天花板内，从两面或四面出风，比挂壁机更适合方正的店铺、会议室和开放式办公室。它的保养属于另一类作业：技术员要站梯子在头顶施工，先卸下面板，而且通常要处理排水泵，而不是自然重力排水。",
    },
    practical: {
      en: `Cassette work is priced separately from wall units — chemical wash for a 1.0–1.5 HP cassette starts at ${publishedPrices.chemicalWashCassette15}.`,
      ms: `Kerja cassette dihargakan berasingan daripada unit dinding — cuci kimia cassette 1.0–1.5 HP bermula ${publishedPrices.chemicalWashCassette15}.`,
      zh: `卡式机的收费与挂壁机分开计算——1.0–1.5 匹卡式机化学清洗由 ${publishedPrices.chemicalWashCassette15} 起。`,
    },
  },
  {
    id: "vacuum-install",
    label: { en: "Vacuuming", ms: "Vakum", zh: "抽真空" },
    match: {
      en: ["vacuum", "nitrogen"],
      ms: ["vakum", "nitrogen"],
      zh: ["抽真空", "真空", "氮气"],
    },
    question: {
      en: "What is vacuuming during an aircond installation?",
      ms: "Apa itu proses vakum semasa pemasangan aircond?",
      zh: "冷气安装时的抽真空是什么？",
    },
    answer: {
      en: "Before the refrigerant valves are opened, the installer connects a vacuum pump to the service port and pulls the air and moisture out of the new copper line set. Air left in the pipe carries water vapour, which reacts with compressor oil and forms acid that eats the windings from inside. It is the step most often skipped on a rushed installation because nothing looks different afterwards.",
      ms: "Sebelum injap refrigeran dibuka, pemasang menyambung pam vakum ke port servis dan menyedut udara serta lembapan keluar dari set paip tembaga baharu. Udara yang tertinggal dalam paip membawa wap air, yang bertindak balas dengan minyak kompresor dan membentuk asid yang memakan belitan dari dalam. Inilah langkah paling kerap dilangkau pada pemasangan tergesa-gesa kerana tiada apa yang kelihatan berbeza selepasnya.",
      zh: "在打开冷媒阀之前，安装师傅要把真空泵接到检修口，把新铜管里的空气和水分抽干净。管内残留的空气带着水汽，会与压缩机冷冻油反应生成酸性物质，从内部腐蚀绕组。因为做完外观看不出差别，赶工的安装最常省掉这一步。",
    },
    practical: {
      en: "Ask to see the gauge during vacuum-down; a proper job holds the vacuum for several minutes after the pump stops.",
      ms: "Minta lihat tolok semasa proses vakum; kerja yang betul mengekalkan vakum beberapa minit selepas pam dimatikan.",
      zh: "抽真空时可以要求看压力表；做得到位的话，停泵后真空能维持好几分钟不回升。",
    },
  },
  {
    id: "flare-joint",
    label: { en: "Flare joint", ms: "Sambungan flare", zh: "喇叭口接头" },
    match: {
      en: ["flare", "copper pipe", "copper piping"],
      ms: ["flare", "paip tembaga"],
      zh: ["喇叭口", "铜管"],
    },
    question: {
      en: "What is a flare joint on copper piping?",
      ms: "Apa itu sambungan flare pada paip tembaga?",
      zh: "铜管上的喇叭口接头是什么？",
    },
    answer: {
      en: "A flare joint is the cone-shaped end formed on soft copper tubing so it can seal metal-to-metal against the unit's service valve under a flare nut. The cone must be cut square, deburred and torqued to spec. Over-tightening cracks it, under-tightening leaks slowly — which is why most refrigerant loss on a young system is found at a flare, not in the coil.",
      ms: "Sambungan flare ialah hujung berbentuk kon yang dibentuk pada paip tembaga lembut supaya ia boleh mengedap logam-ke-logam pada injap servis unit di bawah nat flare. Kon itu mesti dipotong tegak, dibuang serpihan dan diketatkan mengikut tork ditetapkan. Terlalu ketat menyebabkan retak, kurang ketat bocor perlahan — sebab itulah kehilangan refrigeran pada sistem baharu biasanya ditemui di flare, bukan pada gegelung.",
      zh: "喇叭口接头是把软铜管末端扩成锥形，靠喇叭螺母压紧后与机器检修阀形成金属对金属的密封。锥口必须切得平整、去除毛刺，并按规定扭力拧紧。拧过头会裂，拧不足会慢漏——所以新机漏冷媒，问题通常出在喇叭口而不是盘管。",
    },
    practical: {
      en: "A soap-bubble test on every flare after commissioning takes two minutes and catches the leak before it costs you a top-up.",
      ms: "Ujian buih sabun pada setiap flare selepas pentauliahan mengambil masa dua minit dan menangkap kebocoran sebelum ia membebankan anda dengan tambah gas.",
      zh: "调试完成后对每个喇叭口做一次肥皂泡测试只要两分钟，就能在你花钱补气之前找出泄漏。",
    },
  },
  {
    id: "isolator-mcb",
    label: { en: "Isolator / MCB", ms: "Isolator / MCB", zh: "隔离开关 / MCB" },
    match: {
      en: ["isolator", "mcb", "breaker", "wiring", "db box"],
      ms: ["isolator", "mcb", "pemutus litar", "pendawaian"],
      zh: ["隔离开关", "mcb", "跳电", "配电", "布线"],
    },
    question: {
      en: "What is an aircond isolator and MCB?",
      ms: "Apa itu isolator dan MCB aircond?",
      zh: "冷气的隔离开关与 MCB 是什么？",
    },
    answer: {
      en: "The isolator is the local switch that cuts power to one aircond so a technician can work on it safely; the MCB is the circuit breaker in the distribution board that protects that circuit against overload and short circuit. Each unit should sit on a correctly rated circuit — sharing a lighting circuit or running off an extension lead is both a nuisance-trip and a fire risk.",
      ms: "Isolator ialah suis setempat yang memutuskan bekalan kepada satu aircond supaya juruteknik boleh bekerja dengan selamat; MCB pula pemutus litar dalam papan agihan yang melindungi litar itu daripada beban lampau dan litar pintas. Setiap unit patut berada pada litar dengan kadaran betul — berkongsi litar lampu atau menggunakan wayar sambungan ialah punca trip berulang dan risiko kebakaran.",
      zh: "隔离开关是就近切断单台冷气电源的开关，方便技术员安全施工；MCB 则是配电箱里的断路器，负责保护该回路免于过载和短路。每台机都应接在容量匹配的专用回路上——与照明共用回路或靠插座延长线供电，既容易跳电也有火灾风险。",
    },
    practical: {
      en: "Repeated tripping is a wiring or capacity problem to investigate, never something to fix by resetting the breaker harder.",
      ms: "Trip berulang ialah masalah pendawaian atau kapasiti yang perlu disiasat, bukan sesuatu yang diselesaikan dengan menghidupkan semula pemutus litar berkali-kali.",
      zh: "反复跳电是布线或容量问题，必须查清楚，绝不是靠不断复位断路器就能解决的。",
    },
  },
  {
    id: "meps-label",
    label: { en: "MEPS energy label", ms: "Label tenaga MEPS", zh: "MEPS 能效标签" },
    match: {
      en: ["energy label", "star rating", "meps", "energy efficiency", "electricity bill"],
      ms: ["label tenaga", "bintang tenaga", "meps", "kecekapan tenaga", "bil elektrik"],
      zh: ["能效", "星级", "meps", "电费"],
    },
    question: {
      en: "What is the MEPS energy label on a new aircond?",
      ms: "Apa itu label tenaga MEPS pada aircond baharu?",
      zh: "新冷气上的 MEPS 能效标签是什么？",
    },
    answer: {
      en: "MEPS is Malaysia's Minimum Energy Performance Standards scheme, administered by the Energy Commission. Air conditioners sold here carry a star label — more stars means less electricity for the same cooling. The label is a comparison tool between models of the same capacity; it says nothing about how your unit performs once the coil is dirty or the room is oversized.",
      ms: "MEPS ialah skim Standard Prestasi Tenaga Minimum Malaysia yang dikendalikan Suruhanjaya Tenaga. Penghawa dingin yang dijual di sini membawa label bintang — lebih banyak bintang bermaksud kurang elektrik untuk penyejukan yang sama. Label itu alat perbandingan antara model berkapasiti sama; ia tidak memberitahu prestasi unit anda apabila gegelung kotor atau bilik tersalah saiz.",
      zh: "MEPS 是马来西亚能源委员会推行的最低能源效率标准，本地销售的冷气都会贴上星级标签，星越多代表达到相同制冷所耗的电越少。这个标签只用于同容量机型之间的比较；盘管脏了或房间选型过大之后的实际表现，它并不能反映。",
    },
    practical: {
      en: "Read the star label together with the annual kWh figure printed on it — that number is what turns into ringgit on your TNB bill.",
      ms: "Baca label bintang bersama angka kWh tahunan yang tercetak padanya — angka itulah yang bertukar menjadi ringgit pada bil TNB anda.",
      zh: "看星级时要连同标签上的年耗电量 kWh 一起看，那个数字才会变成 TNB 账单上的令吉。",
    },
  },
  {
    id: "dry-mode",
    label: { en: "Dry mode", ms: "Mod kering", zh: "除湿模式" },
    match: {
      en: ["dry mode", "dehumidif"],
      ms: ["mod kering", "nyahlembap"],
      zh: ["除湿", "抽湿"],
    },
    question: {
      en: "What is dry mode on an aircond remote?",
      ms: "Apa itu mod kering pada alat kawalan aircond?",
      zh: "冷气遥控上的除湿模式是什么？",
    },
    answer: {
      en: "Dry mode runs the compressor in short low-fan cycles so the coil keeps condensing moisture without over-chilling the room. On a wet Klang Valley evening it can make a 25 °C room feel more comfortable than 22 °C on cool mode, at lower power. It is not a substitute for a dehumidifier in a damp store room, because the unit still stops once the temperature target is met.",
      ms: "Mod kering menjalankan kompresor dalam kitaran pendek dengan kipas perlahan supaya gegelung terus memeluwap lembapan tanpa menyejukkan bilik berlebihan. Pada petang lembap di Lembah Klang, bilik 25 °C boleh terasa lebih selesa berbanding 22 °C mod sejuk, dengan kuasa lebih rendah. Ia bukan pengganti penyahlembap untuk stor lembap, kerana unit tetap berhenti apabila sasaran suhu dicapai.",
      zh: "除湿模式让压缩机以低风量短周期运行，使盘管持续凝结水汽而不会把房间吹得过冷。巴生谷潮湿的傍晚，除湿模式下的 25 °C 往往比制冷模式的 22 °C 更舒适，耗电也更低。但它替代不了储藏室里的除湿机，因为一到设定温度机器仍会停。",
    },
    practical: {
      en: "Use dry mode on rainy evenings and keep cool mode for the hot afternoon — the switch alone shaves running hours off the compressor.",
      ms: "Guna mod kering pada petang hujan dan simpan mod sejuk untuk tengah hari panas — pertukaran itu sahaja mengurangkan jam operasi kompresor.",
      zh: "下雨的傍晚用除湿模式，炎热的午后再用制冷模式，光是这样切换就能减少压缩机的运行时数。",
    },
  },
  {
    id: "workmanship-warranty",
    label: { en: "Workmanship warranty", ms: "Waranti kerja", zh: "工艺保修" },
    match: {
      en: ["warranty", "guarantee"],
      ms: ["waranti", "jaminan"],
      zh: ["保修", "保固", "保障"],
    },
    question: {
      en: "What is a workmanship warranty, and how is it different from the brand warranty?",
      ms: "Apa itu waranti kerjatangan dan apa bezanya dengan waranti jenama?",
      zh: "工艺保修是什么？与品牌保修有何不同？",
    },
    answer: {
      en: "A workmanship warranty covers the labour: if the fault comes back because of how the job was done — a joint that leaks, a drain that was not cleared, a bracket that was not levelled — the contractor returns and fixes it at no charge. The brand warranty is separate and covers manufactured parts such as the compressor or PCB, and it survives only if the unit was installed and serviced correctly.",
      ms: "Waranti kerjatangan melindungi kerja: jika kerosakan berulang disebabkan cara kerja dibuat — sambungan bocor, saliran tidak dibersihkan, braket tidak rata — kontraktor kembali membaikinya tanpa bayaran. Waranti jenama pula berasingan dan melindungi bahagian kilang seperti kompresor atau PCB, dan ia hanya kekal jika unit dipasang serta diservis dengan betul.",
      zh: "工艺保修保的是施工本身：如果故障是施工方式造成的——接头漏、排水没疏通、支架没调平——承包商要免费回来处理。品牌保修则是另一回事，保的是压缩机、电路板等原厂部件，而且只有在安装与保养都做对的前提下才继续有效。",
    },
    practical: {
      en: "Get the scope, price and warranty period in one written WhatsApp message before work starts — a verbal promise is not a warranty.",
      ms: "Dapatkan skop, harga dan tempoh waranti dalam satu mesej WhatsApp bertulis sebelum kerja bermula — janji lisan bukan waranti.",
      zh: "开工前用一条 WhatsApp 讯息把施工范围、价格和保修期写清楚；口头承诺不算保修。",
    },
  },
  {
    id: "pump-down",
    label: { en: "Pump-down", ms: "Pump-down", zh: "回收冷媒（pump-down）" },
    match: {
      en: ["pump down", "pump-down", "relocation", "dismantl"],
      ms: ["pump down", "pump-down", "pemindahan", "tanggal"],
      zh: ["回收冷媒", "拆机", "移机"],
    },
    question: {
      en: "What is pump-down when relocating an aircond?",
      ms: "Apa itu pump-down semasa memindahkan aircond?",
      zh: "移机时的回收冷媒（pump-down）是什么？",
    },
    answer: {
      en: "Pump-down is how refrigerant is saved before a unit is taken off the wall: the technician closes the liquid valve, runs the compressor briefly so the gas collects in the outdoor unit, then closes the suction valve and disconnects the pipes. Skip it and the whole charge vents to atmosphere, so the reinstall needs a full recharge you then pay for.",
      ms: "Pump-down ialah cara refrigeran diselamatkan sebelum unit diturunkan dari dinding: juruteknik menutup injap cecair, menjalankan kompresor seketika supaya gas berkumpul dalam unit outdoor, kemudian menutup injap sedutan dan menanggalkan paip. Jika dilangkau, keseluruhan cas terlepas ke udara, jadi pemasangan semula perlukan pengisian penuh yang anda bayar kemudian.",
      zh: "回收冷媒是拆机前把冷媒保存下来的做法：技术员先关闭液管阀，让压缩机短暂运行把冷媒集中到室外机，再关气管阀并拆管。若省略这一步，整机冷媒会全部排入大气，复装时就得重新充注，费用要你自己承担。",
    },
    practical: {
      en: "Ask whether the quote for dismantling includes pump-down and a new flare set; those two items decide whether the reinstall cools properly.",
      ms: "Tanya sama ada sebut harga penanggalan termasuk pump-down dan set flare baharu; dua perkara itu menentukan sama ada pemasangan semula menyejuk dengan betul.",
      zh: "问清楚拆机报价是否包含回收冷媒和重新扩喇叭口，这两项决定了复装后能不能正常制冷。",
    },
  },
  {
    id: "psi",
    label: { en: "PSI charge pressure", ms: "Tekanan PSI", zh: "PSI 充注压力" },
    match: {
      en: ["psi", "pressure gauge", "manifold"],
      ms: ["psi", "tolok tekanan", "manifold"],
      zh: ["psi", "压力表", "压力"],
    },
    question: {
      en: "What does PSI mean when charging aircond gas?",
      ms: "Apa maksud PSI semasa mengisi gas aircond?",
      zh: "加冷媒时讲的 PSI 是什么意思？",
    },
    answer: {
      en: "PSI is pounds per square inch, the pressure reading the technician works to when charging. Each refrigerant has its own running-pressure window — roughly 60–70 PSI for R22, 120–140 for R410A and 130–150 for R32 on the suction side at Malaysian ambient temperatures. Charging by PSI is why gas top-up is billed per PSI rather than as a flat fee.",
      ms: "PSI ialah paun setiap inci persegi, bacaan tekanan yang menjadi rujukan juruteknik semasa mengisi. Setiap refrigeran ada julat tekanan operasinya sendiri — lebih kurang 60–70 PSI untuk R22, 120–140 untuk R410A dan 130–150 untuk R32 di bahagian sedutan pada suhu persekitaran Malaysia. Kerana pengisian dibuat mengikut PSI, tambah gas dibilkan setiap PSI dan bukan harga rata.",
      zh: "PSI 是磅每平方英寸，也就是技术员充注时依据的压力读数。每种冷媒都有自己的运行压力区间：在马来西亚环境温度下，低压侧 R22 约 60–70 PSI，R410A 约 120–140，R32 约 130–150。正因为按 PSI 充注，加雪种才按 PSI 计费而不是收统一价。",
    },
    practical: {
      en: "Ask for the before-and-after pressure readings on the invoice; that single line makes an over-charge or an invented top-up obvious.",
      ms: "Minta bacaan tekanan sebelum dan selepas dicatat pada invois; satu baris itu mendedahkan pengisian berlebihan atau tambah gas yang direka-reka.",
      zh: "要求把充注前后的压力读数写在单据上；就这一行，就能看出是否充过量或根本没必要加。",
    },
  },
];

/* ───────────────────────────── comparisons ───────────────────────────── */

export const COMPARISON_SETS: ComparisonSet[] = [
  {
    id: "wash-vs-basic",
    matchA: {
      en: ["chemical wash"],
      ms: ["cuci kimia"],
      zh: ["化学清洗"],
    },
    matchB: {
      en: ["basic service", "basic servicing", "normal service"],
      ms: ["servis asas", "servis biasa"],
      zh: ["基本保养", "基本清洗", "常规保养"],
    },
    question: {
      en: "Chemical wash vs basic servicing: which one do you actually need?",
      ms: "Cuci kimia vs servis asas: mana satu yang anda perlukan?",
      zh: "化学清洗与基本保养对比：您该选哪一种？",
    },
    intro: {
      en: "Both are cleaning visits, but they clean different parts of the unit and are not interchangeable.",
      ms: "Kedua-duanya lawatan pembersihan, tetapi membersihkan bahagian berbeza dan tidak boleh saling menggantikan.",
      zh: "两者都是清洁服务，但处理的部位不同，不能互相替代。",
    },
    optionA: { en: "Pressure chemical wash", ms: "Cuci kimia tekanan", zh: "高压化学清洗" },
    optionB: { en: "Basic servicing", ms: "Servis asas", zh: "基本保养" },
    rows: [
      {
        factor: { en: "What gets cleaned", ms: "Apa yang dibersihkan", zh: "清洁范围" },
        a: { en: "Coil, blower wheel, drain tray, filters", ms: "Gegelung, blower, dulang saliran, penapis", zh: "蒸发器、风轮、接水盘、滤网" },
        b: { en: "Filters, panel, drain flush, outdoor coil brush-down", ms: "Penapis, panel, bilas saliran, berus gegelung outdoor", zh: "滤网、面板、排水疏通、室外盘管刷洗" },
      },
      {
        factor: { en: "Fixes smell and weak airflow", ms: "Atasi bau dan angin lemah", zh: "能否解决异味与风弱" },
        a: { en: "Yes — that is the point of it", ms: "Ya — itulah tujuannya", zh: "可以，这正是它的用途" },
        b: { en: "Only if the filter was the blockage", ms: "Hanya jika penapis puncanya", zh: "仅当堵的是滤网时有效" },
      },
      {
        factor: { en: "Time on site", ms: "Masa di lokasi", zh: "现场时长" },
        a: { en: "45–90 minutes per unit", ms: "45–90 minit setiap unit", zh: "每台 45–90 分钟" },
        b: { en: "20–30 minutes per unit", ms: "20–30 minit setiap unit", zh: "每台 20–30 分钟" },
      },
      {
        factor: { en: "Published price (1.0–1.5 HP)", ms: "Harga diterbitkan (1.0–1.5 HP)", zh: "公开价格（1.0–1.5 匹）" },
        a: { en: publishedPrices.chemicalWash15, ms: publishedPrices.chemicalWash15, zh: publishedPrices.chemicalWash15 },
        b: { en: publishedPrices.basic15, ms: publishedPrices.basic15, zh: publishedPrices.basic15 },
      },
    ],
    verdict: {
      en: "Book basic servicing on a 3–4 month rhythm; book a chemical wash when the smell, the airflow or the water dripping tells you the coil itself is loaded.",
      ms: "Tempah servis asas mengikut rentak 3–4 bulan; tempah cuci kimia apabila bau, aliran udara atau titisan air menunjukkan gegelung itu sendiri sudah sarat.",
      zh: "基本保养按 3–4 个月的节奏做；一旦出现异味、风量下降或滴水，说明盘管本身脏了，就该做化学清洗。",
    },
  },
  {
    id: "wash-vs-overhaul",
    matchA: {
      en: ["chemical wash"],
      ms: ["cuci kimia"],
      zh: ["化学清洗"],
    },
    matchB: {
      en: ["overhaul"],
      ms: ["overhaul"],
      zh: ["大修"],
    },
    question: {
      en: "Chemical wash vs chemical overhaul: what is the difference?",
      ms: "Cuci kimia vs overhaul kimia: apa bezanya?",
      zh: "化学清洗与化学大修对比：差别在哪里？",
    },
    intro: {
      en: "Same chemicals, different depth. The dividing line is whether the indoor unit comes off the wall.",
      ms: "Bahan kimia sama, kedalaman berbeza. Garis pemisahnya ialah sama ada unit indoor diturunkan dari dinding.",
      zh: "药剂相同，深度不同。分界线在于室内机是否要从墙上拆下来。",
    },
    optionA: { en: "Chemical wash (on the wall)", ms: "Cuci kimia (atas dinding)", zh: "化学清洗（不拆机）" },
    optionB: { en: "Chemical overhaul (dismantled)", ms: "Overhaul kimia (dileraikan)", zh: "化学大修（拆机分解）" },
    rows: [
      {
        factor: { en: "Unit removed from wall", ms: "Unit diturunkan dari dinding", zh: "是否拆下室内机" },
        a: { en: "No", ms: "Tidak", zh: "否" },
        b: { en: "Yes, dismantled into parts", ms: "Ya, dileraikan kepada bahagian", zh: "是，整机分解清洗" },
      },
      {
        factor: { en: "Drain tray and casing", ms: "Dulang saliran dan penutup", zh: "接水盘与外壳" },
        a: { en: "Flushed in place", ms: "Dibilas di tempatnya", zh: "原位冲洗" },
        b: { en: "Soaked and scrubbed separately", ms: "Direndam dan digosok berasingan", zh: "拆下后单独浸泡刷洗" },
      },
      {
        factor: { en: "Typical trigger", ms: "Pencetus biasa", zh: "常见触发情况" },
        a: { en: "Annual maintenance, mild smell", ms: "Penyelenggaraan tahunan, bau ringan", zh: "年度保养、轻微异味" },
        b: { en: "Recurring leak, heavy mould, years without service", ms: "Bocor berulang, kulat tebal, lama tidak diservis", zh: "反复滴水、霉菌严重、多年未保养" },
      },
      {
        factor: { en: "Published price (1.0–1.5 HP)", ms: "Harga diterbitkan (1.0–1.5 HP)", zh: "公开价格（1.0–1.5 匹）" },
        a: { en: publishedPrices.chemicalWash15, ms: publishedPrices.chemicalWash15, zh: publishedPrices.chemicalWash15 },
        b: { en: publishedPrices.overhaul15, ms: publishedPrices.overhaul15, zh: publishedPrices.overhaul15 },
      },
    ],
    verdict: {
      en: "If a wash was done recently and the symptom returned, paying for a second wash is throwing money at the wrong depth — go to overhaul.",
      ms: "Jika cuci kimia baru dibuat dan masalah kembali, membayar cuci kedua ialah membuang wang pada kedalaman yang salah — teruskan ke overhaul.",
      zh: "若刚洗过不久症状又出现，再洗一次只是把钱花在不够深的层面上，应该直接做大修。",
    },
  },
  {
    id: "inverter-vs-non",
    matchA: { en: ["inverter"], ms: ["inverter"], zh: ["变频"] },
    matchB: {
      en: ["non-inverter", "non inverter", "conventional"],
      ms: ["non-inverter", "bukan inverter", "konvensional"],
      zh: ["定频", "非变频"],
    },
    question: {
      en: "Inverter vs non-inverter: which is better for a Malaysian home?",
      ms: "Inverter vs non-inverter: mana lebih baik untuk rumah di Malaysia?",
      zh: "变频与定频对比：马来西亚家庭该选哪种？",
    },
    intro: {
      en: "The honest answer depends on how many hours a day that particular unit runs.",
      ms: "Jawapan jujurnya bergantung pada berapa jam sehari unit tersebut beroperasi.",
      zh: "老实说，答案取决于这台机每天开多久。",
    },
    optionA: { en: "Inverter", ms: "Inverter", zh: "变频" },
    optionB: { en: "Non-inverter", ms: "Non-inverter", zh: "定频" },
    rows: [
      {
        factor: { en: "Running cost, 8 h/night", ms: "Kos operasi, 8 j/malam", zh: "每晚 8 小时的电费" },
        a: { en: "Noticeably lower once the room is at temperature", ms: "Jelas lebih rendah setelah bilik mencapai suhu", zh: "到温后明显更低" },
        b: { en: "Higher — full-power restarts all night", ms: "Lebih tinggi — hidup semula kuasa penuh sepanjang malam", zh: "较高，整夜反复全功率启动" },
      },
      {
        factor: { en: "Short 30–60 min use", ms: "Guna singkat 30–60 minit", zh: "短时使用 30–60 分钟" },
        a: { en: "Little advantage", ms: "Tidak banyak kelebihan", zh: "优势不明显" },
        b: { en: "Perfectly adequate", ms: "Memadai sepenuhnya", zh: "完全够用" },
      },
      {
        factor: { en: "Repair parts", ms: "Alat ganti", zh: "维修配件" },
        a: { en: "PCB-dependent, dearer boards", ms: "Bergantung PCB, papan lebih mahal", zh: "依赖电路板，板件较贵" },
        b: { en: "Simple, cheap, widely stocked", ms: "Ringkas, murah, mudah didapati", zh: "结构简单、便宜、货源多" },
      },
      {
        factor: { en: "Voltage-fluctuation tolerance", ms: "Toleransi turun naik voltan", zh: "对电压波动的耐受" },
        a: { en: "Sensitive — surge protection matters", ms: "Sensitif — perlindungan pelonjakan penting", zh: "较敏感，需重视防浪涌" },
        b: { en: "More tolerant", ms: "Lebih tahan", zh: "相对耐受" },
      },
    ],
    verdict: {
      en: "Inverter for bedrooms that run all night; non-inverter is still the rational choice for a guest room or a shop that cools in short bursts.",
      ms: "Inverter untuk bilik tidur yang berjalan sepanjang malam; non-inverter masih pilihan rasional untuk bilik tetamu atau kedai yang menyejuk secara singkat.",
      zh: "整夜运转的卧室选变频；客房或只短时开冷的店面，定频仍是理性的选择。",
    },
  },
  {
    id: "r32-vs-r410a",
    matchA: { en: ["r32"], ms: ["r32"], zh: ["r32"] },
    matchB: { en: ["r410a"], ms: ["r410a"], zh: ["r410a"] },
    question: {
      en: "R32 vs R410A: how do the two refrigerants compare?",
      ms: "R32 vs R410A: bagaimana perbandingan dua refrigeran ini?",
      zh: "R32 与 R410A 对比：两种冷媒差在哪？",
    },
    intro: {
      en: "You do not choose the refrigerant — the unit does. What matters is knowing which one you have before anyone opens a valve.",
      ms: "Anda tidak memilih refrigeran — unit yang menentukan. Yang penting ialah tahu jenis mana yang ada sebelum sesiapa membuka injap.",
      zh: "冷媒不是你选的，是机器决定的。关键在于有人动阀门之前，先弄清楚你这台用的是哪一种。",
    },
    optionA: { en: "R32", ms: "R32", zh: "R32" },
    optionB: { en: "R410A", ms: "R410A", zh: "R410A" },
    rows: [
      {
        factor: { en: "Found in", ms: "Terdapat pada", zh: "常见机型" },
        a: { en: "Most units sold in Malaysia today", ms: "Kebanyakan unit dijual di Malaysia kini", zh: "目前马来西亚在售的多数机型" },
        b: { en: "Mid-generation inverters, roughly 2010–2018", ms: "Inverter generasi pertengahan, lebih kurang 2010–2018", zh: "约 2010–2018 年的中期变频机" },
      },
      {
        factor: { en: "Composition", ms: "Komposisi", zh: "成分" },
        a: { en: "Single component — can be topped up", ms: "Satu komponen — boleh ditambah", zh: "单一成分，可以补充" },
        b: { en: "Blend — a big leak is better recovered and recharged", ms: "Campuran — kebocoran besar lebih baik dikitar dan diisi semula", zh: "混合物，大量泄漏后最好回收再重新充注" },
      },
      {
        factor: { en: "Global warming potential", ms: "Potensi pemanasan global", zh: "全球暖化潜势" },
        a: { en: "About a third of R410A", ms: "Kira-kira satu pertiga R410A", zh: "约为 R410A 的三分之一" },
        b: { en: "Higher", ms: "Lebih tinggi", zh: "较高" },
      },
      {
        factor: { en: "Published top-up price", ms: "Harga tambah gas diterbitkan", zh: "公开加气价格" },
        a: { en: publishedPrices.r32, ms: publishedPrices.r32, zh: publishedPrices.r32 },
        b: { en: publishedPrices.r410a, ms: publishedPrices.r410a, zh: publishedPrices.r410a },
      },
    ],
    verdict: {
      en: "Never let anyone substitute one for the other in an existing system; retrofitting the wrong gas costs a compressor, not a top-up.",
      ms: "Jangan sesekali benarkan sesiapa menggantikan satu dengan yang lain dalam sistem sedia ada; menukar gas yang salah membebankan kompresor, bukan sekadar tambah gas.",
      zh: "绝不要让任何人在现有系统里用其中一种替代另一种；换错气种赔上的是压缩机，不是一次加气的钱。",
    },
  },
  {
    id: "repair-vs-replace",
    matchA: {
      en: ["repair", "fix"],
      ms: ["baiki", "pembaikan"],
      zh: ["维修", "修理"],
    },
    matchB: {
      en: ["replace", "new unit", "buy new"],
      ms: ["ganti", "unit baharu", "beli baharu"],
      zh: ["换新", "更换", "买新"],
    },
    question: {
      en: "Repair vs replace: when is a new unit the cheaper decision?",
      ms: "Baiki vs ganti: bila unit baharu keputusan lebih murah?",
      zh: "维修与换新对比：什么时候换新反而更划算？",
    },
    intro: {
      en: "Use age, the part that failed and the repair-to-replacement ratio — not how the unit looks.",
      ms: "Gunakan umur, bahagian yang rosak dan nisbah kos baiki berbanding ganti — bukan rupa unit itu.",
      zh: "判断依据是机龄、坏的是哪个部件，以及维修费与换新费的比例，而不是外观新旧。",
    },
    optionA: { en: "Repair the existing unit", ms: "Baiki unit sedia ada", zh: "维修现有机器" },
    optionB: { en: "Replace with a new unit", ms: "Ganti dengan unit baharu", zh: "更换新机" },
    rows: [
      {
        factor: { en: "Unit age", ms: "Umur unit", zh: "机龄" },
        a: { en: "Under 7 years", ms: "Bawah 7 tahun", zh: "7 年以内" },
        b: { en: "Over 10 years, or R22", ms: "Melebihi 10 tahun, atau R22", zh: "超过 10 年，或使用 R22" },
      },
      {
        factor: { en: "Failed part", ms: "Bahagian rosak", zh: "损坏部件" },
        a: { en: "Capacitor, sensor, fan motor, drain pump", ms: "Kapasitor, sensor, motor kipas, pam saliran", zh: "电容、传感器、风扇电机、排水泵" },
        b: { en: "Compressor or corroded coil", ms: "Kompresor atau gegelung berkarat", zh: "压缩机或盘管腐蚀" },
      },
      {
        factor: { en: "Cost signal", ms: "Isyarat kos", zh: "费用信号" },
        a: { en: "Repair under about half a new install", ms: "Kos baiki bawah kira-kira separuh pemasangan baharu", zh: "维修费低于换新总价的一半" },
        b: { en: "Repair approaching a new install", ms: "Kos baiki menghampiri pemasangan baharu", zh: "维修费接近换新总价" },
      },
      {
        factor: { en: "Electricity", ms: "Elektrik", zh: "耗电" },
        a: { en: "Unchanged", ms: "Tidak berubah", zh: "维持原状" },
        b: { en: "Modern inverter cuts long-run consumption", ms: "Inverter moden mengurangkan penggunaan jangka panjang", zh: "新款变频机可降低长期耗电" },
      },
    ],
    verdict: {
      en: `Get a diagnostic first (${publishedPrices.diagnostic}) so the decision rests on a measured fault instead of a guess — the fee is trivial next to a wrong replacement.`,
      ms: `Buat diagnostik dahulu (${publishedPrices.diagnostic}) supaya keputusan berdasarkan kerosakan yang diukur dan bukan tekaan — yurannya kecil berbanding penggantian yang salah.`,
      zh: `先做一次故障诊断（${publishedPrices.diagnostic}），让决定建立在实测结果而不是猜测上；这点费用远低于换错机的代价。`,
    },
  },
  {
    id: "wall-vs-cassette",
    matchA: {
      en: ["wall-mounted", "wall mounted"],
      ms: ["unit dinding", "wall-mounted"],
      zh: ["挂壁", "壁挂"],
    },
    matchB: { en: ["cassette"], ms: ["cassette", "kaset"], zh: ["卡式", "天花机"] },
    question: {
      en: "Wall-mounted vs ceiling cassette: which suits the space?",
      ms: "Unit dinding vs ceiling cassette: mana sesuai untuk ruang anda?",
      zh: "挂壁机与天花卡式机对比：哪种更适合你的空间？",
    },
    intro: {
      en: "Airflow shape and access for future servicing decide this more than looks do.",
      ms: "Bentuk aliran udara dan akses untuk servis kelak lebih menentukan berbanding rupa.",
      zh: "决定因素是出风形态和日后保养的可达性，而不是外观好不好看。",
    },
    optionA: { en: "Wall-mounted split", ms: "Split dinding", zh: "挂壁分体机" },
    optionB: { en: "Ceiling cassette", ms: "Ceiling cassette", zh: "天花卡式机" },
    rows: [
      {
        factor: { en: "Air distribution", ms: "Pengagihan udara", zh: "送风分布" },
        a: { en: "One direction, best in rectangular rooms", ms: "Satu arah, terbaik untuk bilik segi empat tepat", zh: "单向出风，长方形房间最合适" },
        b: { en: "2- or 4-way, better for square or open areas", ms: "2 atau 4 arah, lebih baik untuk ruang segi empat sama atau terbuka", zh: "两向或四向出风，方正或开放空间更好" },
      },
      {
        factor: { en: "Ceiling requirement", ms: "Keperluan siling", zh: "天花要求" },
        a: { en: "None", ms: "Tiada", zh: "无" },
        b: { en: "Needs plenum depth above the ceiling", ms: "Perlukan ruang di atas siling", zh: "天花上方需有足够安装空间" },
      },
      {
        factor: { en: "Drainage", ms: "Saliran", zh: "排水方式" },
        a: { en: "Gravity drain", ms: "Saliran graviti", zh: "重力排水" },
        b: { en: "Usually a condensate pump — an extra failure point", ms: "Biasanya pam kondensat — satu lagi titik kerosakan", zh: "多半配排水泵，多一个故障点" },
      },
      {
        factor: { en: "Service access", ms: "Akses servis", zh: "保养可达性" },
        a: { en: "Straightforward", ms: "Mudah", zh: "较简单" },
        b: { en: "Ladder work, longer visit, separate pricing", ms: "Kerja tangga, lawatan lebih lama, harga berasingan", zh: "需登高作业，时间更长，单独计价" },
      },
    ],
    verdict: {
      en: "Choose cassette for square shoplots and offices where ducting a wall unit would leave dead corners; keep wall-mounted for bedrooms, where servicing is cheaper and simpler.",
      ms: "Pilih cassette untuk kedai dan pejabat segi empat sama yang akan meninggalkan sudut mati jika guna unit dinding; kekalkan unit dinding untuk bilik tidur, di mana servis lebih murah dan mudah.",
      zh: "方正的店面和办公室若用挂壁机会留下死角，就选卡式机；卧室仍用挂壁机，保养更便宜也更简单。",
    },
  },
  {
    id: "topup-vs-leak-repair",
    matchA: {
      en: ["gas top-up", "gas topup", "top up"],
      ms: ["tambah gas", "isi gas"],
      zh: ["加雪种", "加冷媒"],
    },
    matchB: {
      en: ["leak repair", "leak detection", "leak test"],
      ms: ["baiki kebocoran", "kesan kebocoran", "ujian bocor"],
      zh: ["补漏", "检漏", "漏点"],
    },
    question: {
      en: "Gas top-up vs leak repair: which should you pay for?",
      ms: "Tambah gas vs baiki kebocoran: yang mana patut anda bayar?",
      zh: "加雪种与补漏对比：钱该花在哪一边？",
    },
    intro: {
      en: "Refrigerant is not consumed by running the unit, so a top-up is only ever a temporary answer.",
      ms: "Refrigeran tidak habis kerana unit beroperasi, jadi tambah gas hanya jawapan sementara.",
      zh: "冷媒不会因为机器运转而消耗，所以加雪种永远只是暂时的处理。",
    },
    optionA: { en: "Top-up only", ms: "Tambah gas sahaja", zh: "只加冷媒" },
    optionB: { en: "Find and repair the leak", ms: "Cari dan baiki kebocoran", zh: "找出并修补漏点" },
    rows: [
      {
        factor: { en: "How long cooling lasts", ms: "Berapa lama penyejukan bertahan", zh: "制冷能维持多久" },
        a: { en: "Weeks to months, depending on leak size", ms: "Beberapa minggu hingga bulan, ikut saiz kebocoran", zh: "视漏点大小，几周到几个月" },
        b: { en: "Years, if the joint is properly remade", ms: "Bertahun, jika sambungan dibaiki dengan betul", zh: "接头处理得当可维持数年" },
      },
      {
        factor: { en: "Time on site", ms: "Masa di lokasi", zh: "现场时长" },
        a: { en: "Under an hour", ms: "Kurang sejam", zh: "一小时以内" },
        b: { en: "Longer — pressure test, then repair and recharge", ms: "Lebih lama — ujian tekanan, baiki dan isi semula", zh: "较长：先打压检测，再补漏并重新充注" },
      },
      {
        factor: { en: "Published price", ms: "Harga diterbitkan", zh: "公开价格" },
        a: { en: `${publishedPrices.r32} (R32)`, ms: `${publishedPrices.r32} (R32)`, zh: `${publishedPrices.r32}（R32）` },
        b: { en: publishedPrices.gasLeakRepair, ms: publishedPrices.gasLeakRepair, zh: publishedPrices.gasLeakRepair },
      },
      {
        factor: { en: "Risk if ignored", ms: "Risiko jika diabaikan", zh: "放着不管的风险" },
        a: { en: "Compressor runs hot and under-lubricated", ms: "Kompresor menjadi panas dan kurang pelinciran", zh: "压缩机过热、润滑不足" },
        b: { en: "Removes the cause", ms: "Menghapuskan puncanya", zh: "从根源解决" },
      },
    ],
    verdict: {
      en: "One top-up on an old unit is reasonable. A second within twelve months means you are paying rent on a leak you have not fixed.",
      ms: "Satu kali tambah gas pada unit lama munasabah. Kali kedua dalam dua belas bulan bermakna anda membayar sewa untuk kebocoran yang belum dibaiki.",
      zh: "老机器加一次雪种是合理的。十二个月内加第二次，等于在为一个没修的漏点持续付租金。",
    },
  },
  {
    id: "diy-vs-professional",
    matchA: {
      en: ["diy", "yourself", "self-clean", "self clean"],
      ms: ["diy", "sendiri", "cuci sendiri"],
      zh: ["自己", "diy", "自行清洗"],
    },
    matchB: {
      en: ["technician", "professional"],
      ms: ["juruteknik", "profesional"],
      zh: ["技术员", "专业"],
    },
    question: {
      en: "DIY cleaning vs professional servicing: where is the line?",
      ms: "Cuci sendiri vs servis profesional: di mana garisannya?",
      zh: "自己清洗与专业保养对比：界线在哪里？",
    },
    intro: {
      en: "Some maintenance genuinely belongs to the owner. The rest needs pressure equipment, gauges and an electrical isolation step.",
      ms: "Sebahagian penyelenggaraan memang tugas pemilik. Selebihnya perlukan peralatan tekanan, tolok dan langkah pengasingan elektrik.",
      zh: "有些维护本来就该由屋主自己做，其余的则需要高压设备、压力表和电源隔离步骤。",
    },
    optionA: { en: "Do it yourself", ms: "Buat sendiri", zh: "自己动手" },
    optionB: { en: "Book a technician", ms: "Tempah juruteknik", zh: "预约技术员" },
    rows: [
      {
        factor: { en: "Filter washing", ms: "Basuh penapis", zh: "清洗滤网" },
        a: { en: "Yes — every 2–4 weeks", ms: "Ya — setiap 2–4 minggu", zh: "可以，每 2–4 周一次" },
        b: { en: "Included in every visit", ms: "Termasuk dalam setiap lawatan", zh: "每次上门都会做" },
      },
      {
        factor: { en: "Coil and blower cleaning", ms: "Cuci gegelung dan blower", zh: "清洗盘管与风轮" },
        a: { en: "No — spray cans push dirt deeper", ms: "Tidak — semburan tin menolak kotoran lebih dalam", zh: "不建议，喷罐只会把脏污推得更深" },
        b: { en: "Pressure wash with a proper catch bag", ms: "Cuci tekanan dengan beg tadahan betul", zh: "配接水袋做高压冲洗" },
      },
      {
        factor: { en: "Anything involving gas or wiring", ms: "Apa-apa melibatkan gas atau pendawaian", zh: "涉及冷媒或电路的作业" },
        a: { en: "No", ms: "Tidak", zh: "不可以" },
        b: { en: "Gauges, isolation, current readings", ms: "Tolok, pengasingan, bacaan arus", zh: "使用压力表、断电隔离、测量电流" },
      },
      {
        factor: { en: "Warranty effect", ms: "Kesan waranti", zh: "对保修的影响" },
        a: { en: "Damage from DIY is not covered", ms: "Kerosakan akibat DIY tidak dilindungi", zh: "自行操作造成的损坏不在保修内" },
        b: { en: "Workmanship warranty applies", ms: "Waranti kerjatangan terpakai", zh: "享有工艺保修" },
      },
    ],
    verdict: {
      en: "Wash the filters yourself and check the outdoor unit has clear air; leave anything behind the front panel to someone with gauges.",
      ms: "Basuh penapis sendiri dan pastikan unit outdoor mendapat udara lapang; serahkan apa-apa di sebalik panel depan kepada orang yang ada tolok.",
      zh: "滤网自己洗，顺便确认室外机通风良好；面板后面的部分交给有专业仪表的人处理。",
    },
  },
  {
    id: "hp-sizing",
    matchA: {
      en: ["1.0hp", "1hp", "1.0 hp"],
      ms: ["1.0hp", "1hp", "1.0 hp"],
      zh: ["1匹", "1.0匹", "1 匹"],
    },
    matchB: {
      en: ["1.5hp", "1.5 hp"],
      ms: ["1.5hp", "1.5 hp"],
      zh: ["1.5匹", "1.5 匹"],
    },
    question: {
      en: "1.0 HP vs 1.5 HP: which size fits the room?",
      ms: "1.0 HP vs 1.5 HP: saiz mana sesuai untuk bilik anda?",
      zh: "1.0 匹与 1.5 匹对比：房间该配多大？",
    },
    intro: {
      en: "Floor area is the starting point; heat load from sun, ceiling height and occupancy moves the answer up a size.",
      ms: "Luas lantai titik permulaan; beban haba dari matahari, ketinggian siling dan bilangan penghuni menaikkan jawapan satu saiz.",
      zh: "先看面积，再按日晒、层高和人数等热负荷决定要不要往上加一档。",
    },
    optionA: { en: "1.0 HP (≈ 9,000 BTU/h)", ms: "1.0 HP (≈ 9,000 BTU/j)", zh: "1.0 匹（约 9,000 BTU/h）" },
    optionB: { en: "1.5 HP (≈ 12,000 BTU/h)", ms: "1.5 HP (≈ 12,000 BTU/j)", zh: "1.5 匹（约 12,000 BTU/h）" },
    rows: [
      {
        factor: { en: "Typical room", ms: "Bilik tipikal", zh: "适用房间" },
        a: { en: "Small bedroom up to about 120 sq ft", ms: "Bilik tidur kecil sehingga kira-kira 120 kaki persegi", zh: "约 120 平方英尺以内的小卧室" },
        b: { en: "Master bedroom or small hall, 120–180 sq ft", ms: "Bilik utama atau ruang tamu kecil, 120–180 kaki persegi", zh: "主卧或小客厅，120–180 平方英尺" },
      },
      {
        factor: { en: "Afternoon sun on the wall", ms: "Matahari petang pada dinding", zh: "午后西晒" },
        a: { en: "Struggles — size up", ms: "Bergelut — naikkan saiz", zh: "偏吃力，建议加大" },
        b: { en: "Copes", ms: "Mampu tampung", zh: "应付得来" },
      },
      {
        factor: { en: "If oversized", ms: "Jika terlalu besar", zh: "选得过大时" },
        a: { en: "Rarely a problem", ms: "Jarang jadi masalah", zh: "很少出问题" },
        b: { en: "Short-cycles, room cold but clammy", ms: "Kerap hidup-mati, bilik sejuk tetapi lembap", zh: "频繁启停，房间冷却发闷" },
      },
      {
        factor: { en: "Published installation price", ms: "Harga pemasangan diterbitkan", zh: "公开安装价格" },
        a: { en: publishedPrices.installWall15, ms: publishedPrices.installWall15, zh: publishedPrices.installWall15 },
        b: { en: publishedPrices.installWall15, ms: publishedPrices.installWall15, zh: publishedPrices.installWall15 },
      },
    ],
    verdict: {
      en: "Measure the room and count the west-facing glass before choosing; the two sizes cost the same to install, so pick on heat load, not on price.",
      ms: "Ukur bilik dan kira kaca menghadap barat sebelum memilih; kos pemasangan kedua-dua saiz sama, jadi pilih ikut beban haba, bukan harga.",
      zh: "先量房间、数一数西向玻璃再决定；两种尺寸的安装费一样，所以按热负荷选，而不是按价格选。",
    },
  },
  {
    id: "frequency",
    matchA: {
      en: ["every 3 month", "3-4 month", "quarterly", "three months"],
      ms: ["setiap 3 bulan", "3-4 bulan", "tiga bulan"],
      zh: ["3个月", "三个月", "每季"],
    },
    matchB: {
      en: ["every 6 month", "six months", "twice a year", "annual"],
      ms: ["setiap 6 bulan", "enam bulan", "dua kali setahun", "tahunan"],
      zh: ["6个月", "半年", "一年一次", "每年"],
    },
    question: {
      en: "Servicing every 3 months vs every 6 months: which schedule is right?",
      ms: "Servis setiap 3 bulan vs setiap 6 bulan: jadual mana betul?",
      zh: "每 3 个月与每 6 个月保养对比：该按哪个周期？",
    },
    intro: {
      en: "Usage hours and air quality set the interval, not a number copied from a manual written for a temperate country.",
      ms: "Jam penggunaan dan kualiti udara menetapkan jarak masa, bukan angka yang disalin daripada manual negara iklim sederhana.",
      zh: "决定周期的是使用时数和空气环境，而不是照抄温带国家说明书上的数字。",
    },
    optionA: { en: "Every 3 months", ms: "Setiap 3 bulan", zh: "每 3 个月" },
    optionB: { en: "Every 6 months", ms: "Setiap 6 bulan", zh: "每 6 个月" },
    rows: [
      {
        factor: { en: "Daily running hours", ms: "Jam operasi harian", zh: "每日运行时数" },
        a: { en: "8 hours or more, or 24/7 office use", ms: "8 jam ke atas, atau pejabat 24/7", zh: "8 小时以上，或办公室全天运行" },
        b: { en: "Occasional, a few hours a week", ms: "Sekali-sekala, beberapa jam seminggu", zh: "偶尔使用，每周数小时" },
      },
      {
        factor: { en: "Environment", ms: "Persekitaran", zh: "环境" },
        a: { en: "Roadside, construction dust, pets, smoking", ms: "Tepi jalan, habuk pembinaan, haiwan peliharaan, merokok", zh: "临街、工地扬尘、养宠物、有人吸烟" },
        b: { en: "High floor, closed windows, low dust", ms: "Tingkat tinggi, tingkap tertutup, habuk rendah", zh: "高楼层、常闭窗、灰尘少" },
      },
      {
        factor: { en: "Risk of skipping", ms: "Risiko melewatkan", zh: "拖延的风险" },
        a: { en: "Filters choke fast, airflow drops within weeks", ms: "Penapis cepat tersumbat, aliran udara jatuh dalam beberapa minggu", zh: "滤网很快堵塞，几周内风量下降" },
        b: { en: "Slower, but the coil still loads up", ms: "Lebih perlahan, tetapi gegelung tetap kotor", zh: "较慢，但盘管仍会积脏" },
      },
      {
        factor: { en: "Cost over a year", ms: "Kos setahun", zh: "全年成本" },
        a: { en: "Four basic visits", ms: "Empat lawatan asas", zh: "四次基本保养" },
        b: { en: "Two basic visits", ms: "Dua lawatan asas", zh: "两次基本保养" },
      },
    ],
    verdict: {
      en: "Bedrooms running every night belong on the 3-month rhythm; a rarely used guest room is fine at 6 months with one chemical wash a year.",
      ms: "Bilik tidur yang digunakan setiap malam patut ikut rentak 3 bulan; bilik tetamu yang jarang digunakan memadai 6 bulan dengan satu cuci kimia setahun.",
      zh: "每晚都开的卧室按 3 个月一次；很少用的客房 6 个月一次即可，一年配一次化学清洗。",
    },
  },
  {
    id: "brand-centre-vs-independent",
    matchA: {
      en: ["service centre", "service center", "authorised", "authorized"],
      ms: ["pusat servis", "sah", "bertauliah"],
      zh: ["原厂", "特约", "服务中心"],
    },
    matchB: {
      en: ["independent", "contractor", "kl renovator"],
      ms: ["bebas", "kontraktor", "kl renovator"],
      zh: ["独立", "承包", "kl renovator"],
    },
    question: {
      en: "Brand service centre vs independent contractor: which to call?",
      ms: "Pusat servis jenama vs kontraktor bebas: mana perlu dihubungi?",
      zh: "品牌服务中心与独立承包商对比：该找谁？",
    },
    intro: {
      en: "The right answer changes with warranty status and how urgent the job is.",
      ms: "Jawapan yang betul berubah mengikut status waranti dan tahap kesegeraan kerja.",
      zh: "答案取决于机器是否还在保修期内，以及事情有多急。",
    },
    optionA: { en: "Brand service centre", ms: "Pusat servis jenama", zh: "品牌服务中心" },
    optionB: { en: "Independent HVAC contractor", ms: "Kontraktor HVAC bebas", zh: "独立冷气承包商" },
    rows: [
      {
        factor: { en: "Unit still under parts warranty", ms: "Unit masih dalam waranti alat ganti", zh: "仍在零件保修期内" },
        a: { en: "Yes — go here first", ms: "Ya — pergi ke sini dahulu", zh: "优先选这里" },
        b: { en: "May affect a parts claim", ms: "Boleh menjejaskan tuntutan alat ganti", zh: "可能影响零件索赔" },
      },
      {
        factor: { en: "Response time", ms: "Masa tindak balas", zh: "响应速度" },
        a: { en: "Queue-based, often days", ms: "Ikut giliran, selalunya beberapa hari", zh: "排期制，常需数天" },
        b: { en: "Same-day slots are realistic", ms: "Slot hari sama memang realistik", zh: "当天上门是可行的" },
      },
      {
        factor: { en: "Multi-brand homes", ms: "Rumah pelbagai jenama", zh: "家中多品牌混装" },
        a: { en: "One brand per visit", ms: "Satu jenama setiap lawatan", zh: "一次只处理一个品牌" },
        b: { en: "All units in one visit", ms: "Semua unit dalam satu lawatan", zh: "一次上门全部处理" },
      },
      {
        factor: { en: "Routine cleaning cost", ms: "Kos pembersihan rutin", zh: "常规清洗费用" },
        a: { en: "Usually higher", ms: "Biasanya lebih tinggi", zh: "通常较高" },
        b: { en: `Published list, from ${publishedPrices.basic15}`, ms: `Senarai diterbitkan, dari ${publishedPrices.basic15}`, zh: `公开价目，由 ${publishedPrices.basic15} 起` },
      },
    ],
    verdict: {
      en: "In-warranty compressor or PCB failure: call the brand. Cleaning, drainage, gas and installation work on out-of-warranty units: an independent contractor is faster and cheaper.",
      ms: "Kerosakan kompresor atau PCB dalam waranti: hubungi jenama. Pembersihan, saliran, gas dan pemasangan untuk unit luar waranti: kontraktor bebas lebih pantas dan murah.",
      zh: "保修期内的压缩机或电路板故障找品牌；过保后的清洗、排水、冷媒和安装作业，找独立承包商更快也更省。",
    },
  },
  {
    id: "workmanship-vs-manufacturer-warranty",
    matchA: {
      en: ["workmanship warranty", "installer warranty", "installation warranty"],
      ms: ["waranti kerjatangan", "waranti kerja", "waranti pemasangan"],
      zh: ["工艺保修", "施工保修", "安装保修"],
    },
    matchB: {
      en: ["manufacturer warranty", "brand warranty", "manufacturer's warranty", "parts warranty"],
      ms: ["waranti pengeluar", "waranti jenama", "waranti kilang", "waranti alat ganti"],
      zh: ["原厂保修", "品牌保修", "厂家保修", "零件保修"],
    },
    question: {
      en: "Workmanship warranty vs manufacturer warranty: what does each one actually cover?",
      ms: "Waranti kerjatangan vs waranti pengeluar: apa yang dilindungi setiap satu?",
      zh: "工艺保修与原厂保修对比：各自到底保什么？",
    },
    intro: {
      en: "Two separate promises from two separate parties. Knowing which one applies decides who you call when something goes wrong.",
      ms: "Dua janji berasingan daripada dua pihak berbeza. Mengetahui yang mana terpakai menentukan siapa yang perlu dihubungi apabila ada masalah.",
      zh: "这是两方各自给出的两种承诺。搞清楚归哪一边管，才知道出问题时该找谁。",
    },
    optionA: { en: "Workmanship warranty", ms: "Waranti kerjatangan", zh: "工艺保修" },
    optionB: { en: "Manufacturer warranty", ms: "Waranti pengeluar", zh: "原厂保修" },
    rows: [
      {
        factor: { en: "Given by", ms: "Diberi oleh", zh: "提供方" },
        a: { en: "The contractor who did the job", ms: "Kontraktor yang membuat kerja", zh: "施工的承包商" },
        b: { en: "The brand that made the unit", ms: "Jenama yang membuat unit", zh: "机器的品牌厂商" },
      },
      {
        factor: { en: "Covers", ms: "Melindungi", zh: "覆盖范围" },
        a: { en: "Leaking joints, drainage, brackets, wiring done on site", ms: "Sambungan bocor, saliran, braket, pendawaian di tapak", zh: "接头漏、排水、支架、现场布线" },
        b: { en: "Compressor, PCB and other factory parts", ms: "Kompresor, PCB dan bahagian kilang lain", zh: "压缩机、电路板等原厂部件" },
      },
      {
        factor: { en: "Typical period", ms: "Tempoh tipikal", zh: "常见期限" },
        a: { en: "Weeks to months, stated on the job card", ms: "Beberapa minggu hingga bulan, dinyatakan pada kad kerja", zh: "数周至数月，写在工单上" },
        b: { en: "1–5 years depending on brand and part", ms: "1–5 tahun bergantung jenama dan bahagian", zh: "视品牌与部件 1–5 年" },
      },
      {
        factor: { en: "Voided by", ms: "Terbatal jika", zh: "失效情形" },
        a: { en: "Someone else re-opening the same work", ms: "Orang lain membuka semula kerja yang sama", zh: "他人重新拆动同一处施工" },
        b: { en: "Incorrect installation or no servicing record", ms: "Pemasangan salah atau tiada rekod servis", zh: "安装不当或没有保养记录" },
      },
    ],
    verdict: {
      en: "Water on the wall a week after installation is a workmanship claim; a compressor that dies in year three is a brand claim. Keep the job card and the receipt together — you will need both.",
      ms: "Air di dinding seminggu selepas pemasangan ialah tuntutan kerjatangan; kompresor mati pada tahun ketiga ialah tuntutan jenama. Simpan kad kerja dan resit bersama — kedua-duanya diperlukan.",
      zh: "装好一周后墙上渗水，属于工艺保修；第三年压缩机坏了，属于原厂保修。工单和收据要一起留好，两样都用得上。",
    },
  },
  {
    id: "condo-vs-landed",
    matchA: {
      en: ["condo", "condominium", "high-rise", "apartment"],
      ms: ["kondo", "kondominium", "pangsapuri"],
      zh: ["公寓", "高楼", "组屋"],
    },
    matchB: {
      en: ["landed", "terrace house", "bungalow", "double-storey", "semi-d"],
      ms: ["rumah teres", "banglo", "berkembar", "rumah landed"],
      zh: ["排屋", "有地", "独立式", "洋房"],
    },
    question: {
      en: "Condo vs landed house installation: how does the job differ?",
      ms: "Pemasangan kondo vs rumah teres: apa bezanya kerja itu?",
      zh: "公寓与有地房屋安装对比：施工差别在哪？",
    },
    intro: {
      en: "The equipment is the same. Access, approvals and pipe runs are what change the day — and the price.",
      ms: "Peralatannya sama. Akses, kelulusan dan panjang paip yang mengubah hari kerja — dan harganya.",
      zh: "设备是一样的，真正影响工期和价格的是进出通道、管理层审批与铜管走线。",
    },
    optionA: { en: "Condominium / high-rise", ms: "Kondominium / bangunan tinggi", zh: "公寓 / 高楼" },
    optionB: { en: "Landed house", ms: "Rumah landed", zh: "有地房屋" },
    rows: [
      {
        factor: { en: "Approval needed", ms: "Kelulusan diperlukan", zh: "是否需要审批" },
        a: { en: "JMB / management permit, often a deposit", ms: "Permit JMB / pengurusan, selalunya deposit", zh: "需管理层／JMB 批准，常要押金" },
        b: { en: "None beyond the owner's consent", ms: "Tiada selain persetujuan pemilik", zh: "屋主同意即可" },
      },
      {
        factor: { en: "Outdoor unit position", ms: "Kedudukan unit outdoor", zh: "室外机位置" },
        a: { en: "Fixed ledge or designated aircond bay", ms: "Ledge tetap atau ruang aircond ditetapkan", zh: "固定平台或指定冷气位" },
        b: { en: "Flexible — shaded side wall or ground frame", ms: "Fleksibel — dinding teduh atau rangka atas tanah", zh: "灵活，可选阴面外墙或落地支架" },
      },
      {
        factor: { en: "Typical pipe run", ms: "Panjang paip tipikal", zh: "常见管长" },
        a: { en: "Longer, sometimes across a corridor", ms: "Lebih panjang, kadang merentas koridor", zh: "较长，有时要穿过走廊" },
        b: { en: "Short and direct", ms: "Pendek dan terus", zh: "较短且直接" },
      },
      {
        factor: { en: "Working-hour limits", ms: "Had waktu kerja", zh: "施工时段限制" },
        a: { en: "Drilling windows set by management", ms: "Waktu menggerudi ditetapkan pengurusan", zh: "钻孔时间由管理层规定" },
        b: { en: "Neighbour courtesy only", ms: "Hanya menjaga hal jiran", zh: "只需顾及邻居" },
      },
    ],
    verdict: {
      en: "In a condo, secure the management permit and the service-lift booking before the technician is dispatched; in a landed house, spend that effort on choosing a shaded, serviceable outdoor position instead.",
      ms: "Di kondo, dapatkan permit pengurusan dan tempahan lif servis sebelum juruteknik dihantar; di rumah landed, gunakan usaha itu untuk memilih kedudukan outdoor yang teduh dan mudah diservis.",
      zh: "住公寓的，先把管理层批准和货梯预约办妥再约技术员；有地房屋则把这份心思花在挑一个阴凉又好保养的室外机位置上。",
    },
  },
  {
    id: "standard-vs-extended-piping",
    matchA: {
      en: ["standard length", "3 metre", "3 meter", "included piping", "standard piping"],
      ms: ["panjang standard", "3 meter", "paip disertakan", "paip standard"],
      zh: ["标准长度", "标准配管", "3米", "3 米"],
    },
    matchB: {
      en: ["additional piping", "extra piping", "extended pipe", "longer pipe", "per metre"],
      ms: ["paip tambahan", "paip lanjutan", "paip lebih panjang", "setiap meter"],
      zh: ["加长", "额外铜管", "超出标准", "每米"],
    },
    question: {
      en: "Standard piping vs extended pipe run: what changes beyond the price?",
      ms: "Paip standard vs larian paip lanjutan: apa berubah selain harga?",
      zh: "标准配管与加长走管对比：除了价格还有什么不同？",
    },
    intro: {
      en: "Every installation quote includes a standard copper run. Going past it is not only a cost line — it changes how the system performs.",
      ms: "Setiap sebut harga pemasangan termasuk larian tembaga standard. Melebihinya bukan sekadar kos — ia mengubah prestasi sistem.",
      zh: "每份安装报价都含一段标准铜管。超出这段长度不只是加钱，系统表现也会跟着改变。",
    },
    optionA: { en: "Standard included run", ms: "Larian standard disertakan", zh: "标准含配管" },
    optionB: { en: "Extended run", ms: "Larian lanjutan", zh: "加长走管" },
    rows: [
      {
        factor: { en: "Cost", ms: "Kos", zh: "费用" },
        a: { en: "Inside the quoted installation price", ms: "Termasuk dalam harga pemasangan disebut", zh: "包含在安装报价内" },
        b: { en: "Charged per additional metre of copper and insulation", ms: "Dicaj setiap meter tambahan tembaga dan penebat", zh: "按每米铜管与保温另计" },
      },
      {
        factor: { en: "Refrigerant charge", ms: "Cas refrigeran", zh: "冷媒充注" },
        a: { en: "Factory pre-charge is enough", ms: "Cas kilang memadai", zh: "出厂预充量足够" },
        b: { en: "Needs top-up beyond the maker's free length", ms: "Perlu tambahan melebihi panjang percuma pengeluar", zh: "超过厂方免费长度后须补充" },
      },
      {
        factor: { en: "Cooling performance", ms: "Prestasi penyejukan", zh: "制冷表现" },
        a: { en: "As rated", ms: "Seperti kadaran", zh: "与标称一致" },
        b: { en: "Slight loss; oil return matters on tall vertical drops", ms: "Sedikit kerugian; pulangan minyak penting pada jatuh menegak tinggi", zh: "略有衰减；落差大时要注意回油" },
      },
      {
        factor: { en: "Future servicing", ms: "Servis masa depan", zh: "日后保养" },
        a: { en: "Straightforward", ms: "Mudah", zh: "较简单" },
        b: { en: "Leak-hunting takes longer on a long concealed run", ms: "Mencari kebocoran lebih lama pada larian tersembunyi panjang", zh: "长距离暗管检漏更费时" },
      },
    ],
    verdict: {
      en: "Ask for the included length in metres and the rate per extra metre in the same message — that one question removes the most common installation-day surprise.",
      ms: "Tanya panjang disertakan dalam meter dan kadar setiap meter tambahan dalam mesej yang sama — satu soalan itu menghapuskan kejutan hari pemasangan yang paling biasa.",
      zh: "在同一条讯息里问清楚含多少米、每加一米多少钱；这一个问题就能避免安装当天最常见的意外加价。",
    },
  },
  {
    id: "install-now-vs-postpone-rain",
    matchA: {
      en: ["rain", "rainy season", "monsoon"],
      ms: ["hujan", "musim hujan", "monsun"],
      zh: ["雨", "雨季"],
    },
    matchB: {
      en: ["reschedule", "postpone", "delay the install", "wait for dry"],
      ms: ["jadual semula", "tunda", "tangguh", "tunggu cuaca kering"],
      zh: ["改期", "延期", "推迟", "等天晴"],
    },
    question: {
      en: "Installing during the rain vs rescheduling: which is the right call?",
      ms: "Memasang ketika hujan vs menjadualkan semula: mana keputusan betul?",
      zh: "雨天照常安装与改期对比：该怎么决定？",
    },
    intro: {
      en: "Most of an installation is indoor work. Only a few outdoor steps are genuinely weather-sensitive.",
      ms: "Kebanyakan kerja pemasangan di dalam rumah. Hanya beberapa langkah luar yang benar-benar sensitif cuaca.",
      zh: "安装的大部分工序都在室内，真正受天气影响的只有少数室外步骤。",
    },
    optionA: { en: "Proceed in wet weather", ms: "Teruskan dalam cuaca hujan", zh: "雨天照常施工" },
    optionB: { en: "Reschedule to a dry slot", ms: "Jadual semula ke slot kering", zh: "改期到晴天" },
    rows: [
      {
        factor: { en: "Indoor bracket, drilling, piping", ms: "Braket dalam, menggerudi, paip", zh: "室内支架、钻孔、配管" },
        a: { en: "Unaffected", ms: "Tidak terjejas", zh: "不受影响" },
        b: { en: "No benefit in waiting", ms: "Tiada faedah menunggu", zh: "等待没有好处" },
      },
      {
        factor: { en: "Outdoor bracket on an exposed wall", ms: "Braket luar pada dinding terdedah", zh: "外墙外机支架" },
        a: { en: "Possible with sheeting if there is no lightning", ms: "Boleh dengan penutup jika tiada kilat", zh: "无雷电时可加防雨遮挡进行" },
        b: { en: "Safer during a thunderstorm", ms: "Lebih selamat semasa ribut petir", zh: "雷雨时更安全" },
      },
      {
        factor: { en: "Vacuum and pressure test", ms: "Vakum dan ujian tekanan", zh: "抽真空与压力测试" },
        a: { en: "Fine — the system is sealed", ms: "Baik — sistem tertutup", zh: "没问题，系统是密闭的" },
        b: { en: "No advantage", ms: "Tiada kelebihan", zh: "没有额外好处" },
      },
      {
        factor: { en: "Sealing the wall penetration", ms: "Mengedap lubang dinding", zh: "墙孔密封" },
        a: { en: "Needs a dry surface for a proper seal", ms: "Perlukan permukaan kering untuk kedap sempurna", zh: "需要干燥表面才能封好" },
        b: { en: "Cleaner result", ms: "Hasil lebih kemas", zh: "完成度更好" },
      },
    ],
    verdict: {
      en: "A passing shower is not a reason to lose the slot; a thunderstorm or working at height in wind is. Ask the technician to judge on arrival rather than cancelling in advance.",
      ms: "Hujan renyai bukan alasan melepaskan slot; ribut petir atau kerja di tempat tinggi dalam angin ya. Minta juruteknik menilai semasa tiba dan bukan membatalkan awal-awal.",
      zh: "一阵过云雨不值得放弃预约档期，雷雨或大风中的高处作业才值得。让技术员到场再判断，不必提前取消。",
    },
  },
  {
    id: "single-vs-multiple-units",
    matchA: {
      en: ["one unit", "single unit"],
      ms: ["satu unit", "unit tunggal"],
      zh: ["一台", "单台"],
    },
    matchB: {
      en: ["multiple units", "several units", "two units", "3 units", "whole house"],
      ms: ["beberapa unit", "dua unit", "3 unit", "seluruh rumah"],
      zh: ["多台", "两台", "三台", "整间屋"],
    },
    question: {
      en: "One unit at a time vs all units in a single visit: which works out better?",
      ms: "Satu unit setiap kali vs semua unit dalam satu lawatan: mana lebih baik?",
      zh: "一次一台与一次全做对比：哪种更划算？",
    },
    intro: {
      en: "Travel and setup are fixed costs on every visit, so batching units changes both the price and the day's schedule.",
      ms: "Perjalanan dan persediaan ialah kos tetap setiap lawatan, jadi menggabungkan unit mengubah harga dan jadual hari itu.",
      zh: "每次上门的车程与铺设都是固定成本，把几台一起做会同时改变价格和当天的时间安排。",
    },
    optionA: { en: "One unit per visit", ms: "Satu unit setiap lawatan", zh: "每次只做一台" },
    optionB: { en: "All units in one visit", ms: "Semua unit dalam satu lawatan", zh: "一次全部做完" },
    rows: [
      {
        factor: { en: "Cost per unit", ms: "Kos setiap unit", zh: "每台成本" },
        a: { en: "Full published rate", ms: "Kadar penuh diterbitkan", zh: "按公开价目全价" },
        b: { en: "Volume discount applies from 5 units", ms: "Diskaun kuantiti bermula 5 unit", zh: "满 5 台起可享数量折扣" },
      },
      {
        factor: { en: "Time you need to be home", ms: "Masa anda perlu berada di rumah", zh: "你需在家的时间" },
        a: { en: "Repeated short visits", ms: "Lawatan pendek berulang", zh: "多次短时间上门" },
        b: { en: "One longer block", ms: "Satu blok masa lebih panjang", zh: "一次较长的时段" },
      },
      {
        factor: { en: "Consistency of results", ms: "Konsistensi hasil", zh: "结果一致性" },
        a: { en: "Different technicians on different days", ms: "Juruteknik berbeza pada hari berbeza", zh: "不同日期可能不同师傅" },
        b: { en: "Same team, same standard across the house", ms: "Pasukan sama, standard sama seluruh rumah", zh: "同一组人，全屋同一标准" },
      },
      {
        factor: { en: "Best for", ms: "Sesuai untuk", zh: "适合情况" },
        a: { en: "One unit with an urgent fault", ms: "Satu unit dengan kerosakan mendesak", zh: "某一台出现急需处理的故障" },
        b: { en: "Annual maintenance or a move-in", ms: "Penyelenggaraan tahunan atau pindah masuk", zh: "年度保养或入伙前整理" },
      },
    ],
    verdict: {
      en: "Fix the broken unit today if it is urgent, but put the rest of the house on one scheduled visit — the saving comes from the trip, not from cutting the work.",
      ms: "Baiki unit rosak hari ini jika mendesak, tetapi letakkan unit lain dalam satu lawatan berjadual — penjimatan datang daripada perjalanan, bukan daripada memotong kerja.",
      zh: "急坏的那台今天先修，其余的安排在同一次上门；省下来的是车程成本，而不是偷工。",
    },
  },
  {
    id: "galvanised-vs-stainless-bracket",
    matchA: {
      en: ["galvanised", "galvanized", "powder-coated bracket", "mild steel"],
      ms: ["galvani", "besi bersalut", "keluli lembut"],
      zh: ["镀锌", "喷塑支架", "普通钢"],
    },
    matchB: {
      en: ["stainless"],
      ms: ["stainless", "keluli tahan karat"],
      zh: ["不锈钢"],
    },
    question: {
      en: "Galvanised vs stainless outdoor bracket: which is worth paying for?",
      ms: "Braket luar galvani vs stainless: mana berbaloi dibayar?",
      zh: "镀锌支架与不锈钢支架对比：多花的钱值不值？",
    },
    intro: {
      en: "Bracket choice is a corrosion decision, and in Malaysia it depends on how much salt and rain the wall actually sees.",
      ms: "Pemilihan braket ialah keputusan kakisan, dan di Malaysia ia bergantung pada berapa banyak garam dan hujan yang mengenai dinding itu.",
      zh: "选支架其实是在选防锈等级，在马来西亚要看那面墙实际承受多少盐分和雨水。",
    },
    optionA: { en: "Galvanised steel", ms: "Keluli galvani", zh: "镀锌钢" },
    optionB: { en: "Stainless steel", ms: "Keluli tahan karat", zh: "不锈钢" },
    rows: [
      {
        factor: { en: "Inland KL condo ledge", ms: "Ledge kondo pedalaman KL", zh: "内陆吉隆坡公寓平台" },
        a: { en: "Adequate for years if kept painted", ms: "Memadai bertahun jika dicat", zh: "保持涂层可用多年" },
        b: { en: "Overspecified", ms: "Melebihi keperluan", zh: "略显过度" },
      },
      {
        factor: { en: "Coastal Klang / Port area", ms: "Kawasan pantai Klang / Pelabuhan", zh: "巴生／港口沿海一带" },
        a: { en: "Rusts noticeably faster", ms: "Berkarat jauh lebih cepat", zh: "明显锈得更快" },
        b: { en: "Worth the premium", ms: "Berbaloi harga tambahan", zh: "值得多花这笔钱" },
      },
      {
        factor: { en: "Warning sign", ms: "Tanda amaran", zh: "预警信号" },
        a: { en: "Orange streaks below the bolt heads", ms: "Kesan jingga di bawah kepala bolt", zh: "螺栓下方出现橙色锈痕" },
        b: { en: "Rare, usually at welded joints", ms: "Jarang, biasanya pada sambungan kimpalan", zh: "少见，多在焊点处" },
      },
      {
        factor: { en: "Replacement trigger", ms: "Pencetus penggantian", zh: "更换时机" },
        a: { en: "Flaking metal or a visible tilt", ms: "Logam mengelupas atau condong ketara", zh: "金属起层剥落或明显倾斜" },
        b: { en: "Physical damage only", ms: "Kerosakan fizikal sahaja", zh: "仅在受到外力损坏时" },
      },
    ],
    verdict: {
      en: "Painting over rust hides the problem without restoring strength. If the bracket is flaking or the outdoor unit has started to vibrate on it, replace the bracket — coastal addresses should go stainless.",
      ms: "Mengecat atas karat menyembunyikan masalah tanpa memulihkan kekuatan. Jika braket mengelupas atau unit outdoor mula bergetar, ganti braket — alamat pantai patut guna stainless.",
      zh: "在锈层上刷漆只是遮住问题，强度并不会回来。支架已起皮剥落、或室外机开始在上面震动，就该换新；靠海的地址直接上不锈钢。",
    },
  },
  {
    id: "window-vs-split",
    matchA: { en: ["window unit", "window air"], ms: ["unit window", "window"], zh: ["窗口式", "窗机"] },
    matchB: { en: ["split unit", "split system", "wall-mounted"], ms: ["unit split", "split", "unit dinding"], zh: ["分体机", "挂壁"] },
    question: {
      en: "Window unit vs split system: what is the practical difference?",
      ms: "Unit window vs sistem split: apa beza praktikalnya?",
      zh: "窗口机与分体机对比：实际差别在哪？",
    },
    intro: {
      en: "Window units still make sense in older walk-ups and rentals where no outdoor bracket is allowed.",
      ms: "Unit window masih munasabah di rumah pangsa lama dan rumah sewa yang tidak membenarkan braket luar.",
      zh: "在不允许装室外机支架的老式组屋和租屋里，窗口机仍然有它的道理。",
    },
    optionA: { en: "Window unit", ms: "Unit window", zh: "窗口机" },
    optionB: { en: "Split system", ms: "Sistem split", zh: "分体机" },
    rows: [
      {
        factor: { en: "Installation", ms: "Pemasangan", zh: "安装" },
        a: { en: "Single opening, no copper run", ms: "Satu bukaan, tiada paip tembaga", zh: "单个开孔，不需铺铜管" },
        b: { en: "Indoor + outdoor, piping and drainage route", ms: "Indoor + outdoor, laluan paip dan saliran", zh: "室内外两机，需走管与排水" },
      },
      {
        factor: { en: "Noise in the room", ms: "Bunyi dalam bilik", zh: "室内噪音" },
        a: { en: "Compressor sits in the room opening", ms: "Kompresor berada pada bukaan bilik", zh: "压缩机就在房间开口处" },
        b: { en: "Compressor is outside", ms: "Kompresor di luar", zh: "压缩机在室外" },
      },
      {
        factor: { en: "Efficiency options", ms: "Pilihan kecekapan", zh: "能效选择" },
        a: { en: "Limited, mostly fixed speed", ms: "Terhad, kebanyakannya kelajuan tetap", zh: "较少，多为定速机型" },
        b: { en: "Full inverter range", ms: "Julat inverter penuh", zh: "变频机型齐全" },
      },
      {
        factor: { en: "Published chemical wash", ms: "Cuci kimia diterbitkan", zh: "化学清洗公开价" },
        a: { en: publishedPrices.chemicalWashWindow, ms: publishedPrices.chemicalWashWindow, zh: publishedPrices.chemicalWashWindow },
        b: { en: publishedPrices.chemicalWash15, ms: publishedPrices.chemicalWash15, zh: publishedPrices.chemicalWash15 },
      },
    ],
    verdict: {
      en: "If the building allows an outdoor unit, split wins on noise and efficiency. If it does not, a window unit properly sealed into the opening is still a valid answer.",
      ms: "Jika bangunan membenarkan unit outdoor, split menang dari segi bunyi dan kecekapan. Jika tidak, unit window yang dikedap kemas pada bukaan masih jawapan yang sah.",
      zh: "楼宇允许装室外机的话，分体机在噪音和能效上更胜一筹；若不允许，把窗口机在开口处密封好，依然是可行的方案。",
    },
  },
];

/* ───────────────────── curated presets (non-blog pages) ───────────────────── */

/**
 * Blog posts pick their own terms from their body text. Template pages —
 * problems, services, calculators, installation landings — have a fixed,
 * known subject, so their blocks are curated by hand instead: an editor
 * chose which two or three terms a reader of THAT page actually needs, and
 * which comparison genuinely belongs there.
 *
 * A page with no honest match simply gets no preset and renders nothing.
 */
export type ExplainerPreset = {
  terms: string[];
  comparison?: string;
};

export const EXPLAINER_PRESETS: Record<string, ExplainerPreset> = {
  /* ── problem pages: define the parts named in the diagnosis ── */
  "problem:aircond-not-cold": { terms: ["refrigerant-types", "evaporator-coil", "capacitor"], comparison: "topup-vs-leak-repair" },
  "problem:aircond-water-leaking": { terms: ["drain-pipe", "evaporator-coil", "chemical-overhaul"], comparison: "wash-vs-overhaul" },
  "problem:aircond-water-dripping": { terms: ["drain-pipe", "blower-wheel", "basic-service"], comparison: "wash-vs-basic" },
  "problem:aircond-indoor-unit-leaking": { terms: ["drain-pipe", "chemical-overhaul", "evaporator-coil"], comparison: "wash-vs-overhaul" },
  "problem:aircond-making-noise": { terms: ["blower-wheel", "compressor", "outdoor-condenser"], comparison: "diy-vs-professional" },
  "problem:aircond-bad-smell": { terms: ["evaporator-coil", "blower-wheel", "chemical-wash"], comparison: "wash-vs-overhaul" },
  "problem:aircond-freezing-up": { terms: ["evaporator-coil", "refrigerant-types", "psi"], comparison: "topup-vs-leak-repair" },
  "problem:aircond-low-gas": { terms: ["gas-topup", "psi", "refrigerant-types"], comparison: "topup-vs-leak-repair" },
  "problem:aircond-gas-leak": { terms: ["flare-joint", "gas-topup", "psi"], comparison: "topup-vs-leak-repair" },
  "problem:aircond-compressor-problem": { terms: ["compressor", "capacitor", "refrigerant-types"], comparison: "repair-vs-replace" },
  "problem:aircond-outdoor-unit-not-running": { terms: ["capacitor", "outdoor-condenser", "compressor"], comparison: "repair-vs-replace" },
  "problem:aircond-high-electricity-bill": { terms: ["meps-label", "inverter", "evaporator-coil"], comparison: "inverter-vs-non" },
  "problem:aircond-weak-airflow": { terms: ["blower-wheel", "evaporator-coil", "basic-service"], comparison: "wash-vs-basic" },
  "problem:aircond-not-turning-on": { terms: ["isolator-mcb", "capacitor", "workmanship-warranty"], comparison: "diy-vs-professional" },
  "problem:aircond-blinking-light": { terms: ["isolator-mcb", "capacitor", "compressor"], comparison: "brand-centre-vs-independent" },
  "problem:aircond-thermostat-problems": { terms: ["dry-mode", "inverter", "isolator-mcb"], comparison: "inverter-vs-non" },
  "problem:aircond-fan-not-working": { terms: ["capacitor", "blower-wheel", "outdoor-condenser"], comparison: "repair-vs-replace" },
  "problem:aircond-pcb-problem": { terms: ["inverter", "isolator-mcb", "workmanship-warranty"], comparison: "brand-centre-vs-independent" },
  "problem:aircond-remote-not-working": { terms: ["dry-mode", "isolator-mcb", "workmanship-warranty"], comparison: "diy-vs-professional" },
  "problem:aircond-tripping-power": { terms: ["isolator-mcb", "capacitor", "compressor"], comparison: "diy-vs-professional" },

  /* ── service pages: define what the service physically does ── */
  "service:chemical-wash": { terms: ["chemical-wash", "evaporator-coil", "blower-wheel"], comparison: "wash-vs-basic" },
  "service:chemical-overhaul": { terms: ["chemical-overhaul", "drain-pipe", "blower-wheel"], comparison: "wash-vs-overhaul" },
  "service:gas-topup": { terms: ["gas-topup", "refrigerant-types", "psi"], comparison: "topup-vs-leak-repair" },
  "service:repair": { terms: ["capacitor", "compressor", "isolator-mcb"], comparison: "repair-vs-replace" },
  "service:installation": { terms: ["vacuum-install", "flare-joint", "isolator-mcb"], comparison: "standard-vs-extended-piping" },
  "service:basic-servicing": { terms: ["basic-service", "evaporator-coil", "dry-mode"], comparison: "wash-vs-basic" },
  "service:ceiling-cassette": { terms: ["ceiling-cassette", "drain-pipe", "blower-wheel"], comparison: "wall-vs-cassette" },
  "service:dismantling-relocation": { terms: ["pump-down", "flare-joint", "vacuum-install"], comparison: "single-vs-multiple-units" },
  "service:emergency": { terms: ["capacitor", "isolator-mcb", "drain-pipe"], comparison: "repair-vs-replace" },
  "service:maintenance-contract": { terms: ["basic-service", "chemical-wash", "workmanship-warranty"], comparison: "frequency" },

  /* ── calculators: define the units the calculator asks for ── */
  "tool:installation": { terms: ["horsepower", "vacuum-install", "flare-joint"], comparison: "standard-vs-extended-piping" },
  "tool:gas": { terms: ["psi", "refrigerant-types", "gas-topup"], comparison: "topup-vs-leak-repair" },
  "tool:service": { terms: ["chemical-wash", "basic-service", "chemical-overhaul"], comparison: "wash-vs-basic" },
  "tool:size": { terms: ["btu", "horsepower", "evaporator-coil"], comparison: "hp-sizing" },
  "tool:electricity": { terms: ["meps-label", "inverter", "dry-mode"], comparison: "inverter-vs-non" },
  "tool:savings": { terms: ["inverter", "meps-label", "basic-service"], comparison: "inverter-vs-non" },
  "tool:btu": { terms: ["btu", "horsepower", "ceiling-cassette"], comparison: "hp-sizing" },

  /* ── installation landings: define the install steps being priced ── */
  "install:1hp": { terms: ["horsepower", "btu", "vacuum-install"], comparison: "hp-sizing" },
  "install:1.5hp": { terms: ["horsepower", "btu", "flare-joint"], comparison: "hp-sizing" },
  "install:2hp": { terms: ["horsepower", "isolator-mcb", "vacuum-install"], comparison: "standard-vs-extended-piping" },
  "install:wall-mounted": { terms: ["flare-joint", "vacuum-install", "drain-pipe"], comparison: "wall-vs-cassette" },
  "install:ceiling-cassette": { terms: ["ceiling-cassette", "drain-pipe", "vacuum-install"], comparison: "wall-vs-cassette" },
  "install:window-unit": { terms: ["outdoor-condenser", "isolator-mcb", "drain-pipe"], comparison: "window-vs-split" },
  "install:hub": { terms: ["vacuum-install", "flare-joint", "workmanship-warranty"], comparison: "condo-vs-landed" },
  "install:kl": { terms: ["vacuum-install", "isolator-mcb", "flare-joint"], comparison: "condo-vs-landed" },
  "install:commercial": { terms: ["ceiling-cassette", "outdoor-condenser", "workmanship-warranty"], comparison: "wall-vs-cassette" },
  "install:whole-house": { terms: ["horsepower", "btu", "isolator-mcb"], comparison: "single-vs-multiple-units" },
  "install:new-home": { terms: ["flare-joint", "drain-pipe", "vacuum-install"], comparison: "standard-vs-extended-piping" },
  "install:price": { terms: ["horsepower", "workmanship-warranty", "flare-joint"], comparison: "standard-vs-extended-piping" },

  /* ── price / service landing pages outside the /services tree ── */
  "service:price-guide": { terms: ["chemical-wash", "basic-service", "gas-topup"], comparison: "wash-vs-basic" },
  "service:cuci-aircond": { terms: ["chemical-wash", "blower-wheel", "evaporator-coil"], comparison: "wash-vs-overhaul" },

  /* ── commercial + IAQ hubs (issue #75) ── */
  "service:commercial": { terms: ["ceiling-cassette", "chemical-wash", "workmanship-warranty"], comparison: "frequency" },
  "service:iaq": { terms: ["chemical-wash", "evaporator-coil", "blower-wheel"], comparison: "wash-vs-overhaul" },

  /* ── topic-cluster hubs (issue #66) — one preset per hub ── */
  "pricing:hub": { terms: ["basic-service", "chemical-wash", "gas-topup"], comparison: "wash-vs-basic" },
  "troubleshooting:hub": { terms: ["compressor", "capacitor", "refrigerant-types"], comparison: "repair-vs-replace" },
  "maintenance:hub": { terms: ["basic-service", "blower-wheel", "evaporator-coil"], comparison: "frequency" },
};

/** Resolve a curated preset into the actual entries, dropping unknown ids. */
export function resolveExplainerPreset(presetId: string): {
  terms: GlossaryTerm[];
  comparison: ComparisonSet | null;
} {
  const preset = EXPLAINER_PRESETS[presetId];
  if (!preset) return { terms: [], comparison: null };

  const terms = preset.terms
    .map((id) => GLOSSARY_TERMS.find((term) => term.id === id))
    .filter((term): term is GlossaryTerm => Boolean(term));

  const comparison = preset.comparison
    ? COMPARISON_SETS.find((set) => set.id === preset.comparison) || null
    : null;

  return { terms, comparison };
}

/* ─────────────────── heading variants (anti-boilerplate) ─────────────────── */

/**
 * Alternate phrasings for each definition and comparison heading.
 *
 * A glossary entry can legitimately appear on dozens of pages, but publishing
 * the identical H3 on all of them reads like boilerplate to a human and
 * registers as a duplicated question in the audit's FAQ check. Each entry
 * below is a genuine rewrite of the same question, so a reader who lands on
 * two pages does not feel they have hit the same template twice.
 *
 * Selection is deterministic per page seed — see `pickTermQuestion`.
 * Every variant keeps the question cue its language needs: "what is/what
 * are" in English, "apa itu/apakah" in Malay, "是什么/定义" plus the
 * full-width "？" in Chinese.
 */
export const TERM_QUESTION_VARIANTS: Record<string, LocalizedList> = {
  "chemical-wash": {
    en: [
      "What is included in a pressure chemical wash?",
      "Chemical wash — what is actually done to the unit?",
      "What is a chemical wash, and what does it remove?",
    ],
    ms: [
      "Apa itu cuci kimia dan apa yang dibersihkan?",
      "Apakah kerja yang dibuat semasa cuci kimia tekanan?",
      "Apa itu cuci kimia bertekanan untuk unit dinding?",
    ],
    zh: [
      "高压化学清洗包含哪些工序，定义是什么？",
      "化学清洗到底洗的是什么？",
      "所谓化学清洗，是什么样的清洁方式？",
    ],
  },
  "chemical-overhaul": {
    en: [
      "What is a chemical overhaul, and when is it needed?",
      "Chemical overhaul — what is dismantled?",
      "What is the difference an overhaul makes to a blocked unit?",
    ],
    ms: [
      "Apa itu overhaul kimia dan bila ia diperlukan?",
      "Apakah yang dileraikan semasa overhaul kimia?",
      "Apa itu overhaul kimia untuk unit tersumbat teruk?",
    ],
    zh: [
      "化学大修是什么，什么时候才需要做？",
      "化学大修要拆到什么程度，定义为何？",
      "堵得很严重时做的化学大修是什么？",
    ],
  },
  "basic-service": {
    en: [
      "What is covered in a basic aircond service?",
      "Basic servicing — what is the technician checking?",
      "What is routine aircond maintenance in practice?",
    ],
    ms: [
      "Apa itu servis asas dan apa yang disemak?",
      "Apakah yang termasuk dalam servis aircond asas?",
      "Apa itu penyelenggaraan rutin aircond sebenarnya?",
    ],
    zh: [
      "基本保养包含什么，定义是什么？",
      "例行保养时技术员检查的是什么？",
      "所谓常规冷气保养，具体是什么？",
    ],
  },
  "gas-topup": {
    en: [
      "What is a gas top-up, and does it fix the fault?",
      "Aircond gas top-up — what is being measured?",
      "What is refrigerant top-up work on a home aircond?",
    ],
    ms: [
      "Apa itu tambah gas dan adakah ia menyelesaikan punca?",
      "Apakah yang diukur semasa kerja tambah gas?",
      "Apa itu pengisian semula refrigeran untuk aircond rumah?",
    ],
    zh: [
      "加雪种是什么，能真正解决问题吗？",
      "补充冷媒时测的是什么？",
      "家用冷气的加冷媒作业是什么？",
    ],
  },
  "refrigerant-types": {
    en: [
      "What are the refrigerant types used in Malaysian homes?",
      "Refrigerant — what is it, and why can types never be mixed?",
      "What is inside the copper line, and does the gas type matter?",
    ],
    ms: [
      "Apakah jenis refrigeran yang digunakan di rumah Malaysia?",
      "Apa itu refrigeran dan kenapa jenisnya tidak boleh dicampur?",
      "Apa itu gas dalam paip tembaga dan adakah jenisnya penting?",
    ],
    zh: [
      "马来西亚家用冷气用的冷媒有哪些，分别是什么？",
      "冷媒是什么，为什么不同型号绝不能混用？",
      "铜管里跑的是什么，气种的定义有多重要？",
    ],
  },
  inverter: {
    en: [
      "What is an inverter compressor doing differently?",
      "Inverter aircond — what is the actual saving mechanism?",
      "What is the difference an inverter makes overnight?",
    ],
    ms: [
      "Apa itu kompresor inverter dan apa bezanya?",
      "Apakah mekanisme penjimatan aircond inverter?",
      "Apa itu inverter dan apa kesannya sepanjang malam?",
    ],
    zh: [
      "变频压缩机的运行方式是什么？",
      "变频省电的原理定义是什么？",
      "整夜运转时，变频带来的差别是什么？",
    ],
  },
  btu: {
    en: [
      "What is BTU/h, and how does it map to room size?",
      "BTU — what is the number telling you?",
      "What are BTU ratings used for when sizing a unit?",
    ],
    ms: [
      "Apa itu BTU/j dan bagaimana ia dipadankan dengan saiz bilik?",
      "Apakah maksud angka BTU pada spesifikasi?",
      "Apa itu penarafan BTU semasa memilih saiz unit?",
    ],
    zh: [
      "BTU/小时是什么，和房间面积怎么对应？",
      "规格上的 BTU 数字，含义是什么？",
      "选机时看的 BTU 定义是什么？",
    ],
  },
  horsepower: {
    en: [
      "What is the HP rating on an aircond?",
      "HP — what is it measuring, and why do quotes ask for it?",
      "What are the common HP sizes in Malaysian homes?",
    ],
    ms: [
      "Apa itu penarafan HP pada aircond?",
      "Apakah yang diukur oleh HP dan kenapa sebut harga memerlukannya?",
      "Apakah saiz HP biasa di rumah Malaysia?",
    ],
    zh: [
      "冷气的匹数（HP）定义是什么？",
      "报价时问的匹数，衡量的是什么？",
      "马来西亚家庭常见的匹数分别是什么？",
    ],
  },
  compressor: {
    en: [
      "What is the compressor's job in the system?",
      "Compressor — what is it, and why is it the costly part?",
      "What are the usual reasons a compressor fails?",
    ],
    ms: [
      "Apa itu tugas kompresor dalam sistem?",
      "Apa itu kompresor dan kenapa ia bahagian paling mahal?",
      "Apakah punca biasa kompresor rosak?",
    ],
    zh: [
      "压缩机在系统里的职责是什么？",
      "压缩机是什么，为什么它最贵？",
      "压缩机损坏的常见原因是什么？",
    ],
  },
  capacitor: {
    en: [
      "What is the capacitor, and what happens when it weakens?",
      "Capacitor — what is it doing at start-up?",
      "What are the signs of a failing aircond capacitor?",
    ],
    ms: [
      "Apa itu kapasitor dan apa berlaku apabila ia lemah?",
      "Apakah peranan kapasitor semasa unit dihidupkan?",
      "Apakah tanda kapasitor aircond hampir rosak?",
    ],
    zh: [
      "电容是什么，性能下降后会怎样？",
      "启动瞬间电容负责的是什么？",
      "电容快坏时的征兆是什么？",
    ],
  },
  "outdoor-condenser": {
    en: [
      "What is inside the outdoor unit?",
      "Outdoor condenser — what is it rejecting, and what blocks it?",
      "What are the clearance rules for an outdoor unit?",
    ],
    ms: [
      "Apa itu yang ada di dalam unit outdoor?",
      "Apa itu kondenser luar dan apa yang menyekatnya?",
      "Apakah peraturan ruang lapang untuk unit outdoor?",
    ],
    zh: [
      "室外机里面装的是什么？",
      "室外冷凝器排的是什么，什么会挡住它？",
      "室外机的通风间距要求是什么？",
    ],
  },
  "evaporator-coil": {
    en: [
      "What is the indoor coil, and why does it get dirty?",
      "Evaporator coil — what is happening on those fins?",
      "What are filters catching, and what stays on the coil?",
    ],
    ms: [
      "Apa itu gegelung indoor dan kenapa ia menjadi kotor?",
      "Apa itu evaporator dan apa berlaku pada siripnya?",
      "Apakah yang ditangkap penapis dan apa yang kekal pada gegelung?",
    ],
    zh: [
      "室内盘管是什么，为什么会变脏？",
      "蒸发器翅片上发生的是什么？",
      "滤网挡下的是什么，留在盘管上的又是什么？",
    ],
  },
  "drain-pipe": {
    en: [
      "What is the drain pipe doing while the unit runs?",
      "Condensate drainage — what is it, and what blocks it?",
      "What are the usual causes of water dripping indoors?",
    ],
    ms: [
      "Apa itu tugas paip saliran semasa unit beroperasi?",
      "Apa itu saliran kondensat dan apa yang menyumbatnya?",
      "Apakah punca biasa air menitis di dalam rumah?",
    ],
    zh: [
      "运转时排水管在做的是什么？",
      "冷凝排水是什么，什么会把它堵住？",
      "室内滴水的常见原因是什么？",
    ],
  },
  "blower-wheel": {
    en: [
      "What is the blower wheel, and how does it lose airflow?",
      "Blower wheel — what is collecting on the blades?",
      "What are the signs of a loaded blower wheel?",
    ],
    ms: [
      "Apa itu roda blower dan bagaimana aliran udara hilang?",
      "Apa itu yang terkumpul pada bilah blower?",
      "Apakah tanda roda blower sudah sarat kotoran?",
    ],
    zh: [
      "贯流风轮是什么，风量为何会变小？",
      "风轮叶片上积的是什么？",
      "风轮积脏的征兆是什么？",
    ],
  },
  "ceiling-cassette": {
    en: [
      "What is a ceiling cassette, and where does it suit?",
      "Cassette unit — what is different about servicing it?",
      "What are the drainage differences on a cassette?",
    ],
    ms: [
      "Apa itu ceiling cassette dan di mana ia sesuai?",
      "Apa itu unit cassette dan apa bezanya semasa servis?",
      "Apakah perbezaan saliran pada unit cassette?",
    ],
    zh: [
      "天花卡式机是什么，适合什么空间？",
      "卡式机保养上的不同点是什么？",
      "卡式机排水方式的差别是什么？",
    ],
  },
  "vacuum-install": {
    en: [
      "What is vacuum-down, and why is it skipped?",
      "Vacuuming a new line set — what is being removed?",
      "What are the consequences of installing without vacuuming?",
    ],
    ms: [
      "Apa itu proses vakum dan kenapa ia sering dilangkau?",
      "Apa itu yang dikeluarkan semasa vakum paip baharu?",
      "Apakah akibat memasang tanpa proses vakum?",
    ],
    zh: [
      "抽真空是什么，为什么常被省略？",
      "新管路抽真空要抽掉的是什么？",
      "不抽真空就安装的后果是什么？",
    ],
  },
  "flare-joint": {
    en: [
      "What is a flare joint, and why does it leak?",
      "Flare connection — what is sealing the refrigerant in?",
      "What are the torque rules for a copper flare?",
    ],
    ms: [
      "Apa itu sambungan flare dan kenapa ia bocor?",
      "Apa itu yang mengedap refrigeran pada sambungan flare?",
      "Apakah peraturan tork untuk flare tembaga?",
    ],
    zh: [
      "喇叭口接头是什么，为什么会漏？",
      "喇叭口靠什么密封冷媒，原理是什么？",
      "铜管喇叭口的扭力要求是什么？",
    ],
  },
  "isolator-mcb": {
    en: [
      "What is the isolator switch for?",
      "MCB and isolator — what are they protecting?",
      "What is the correct electrical setup for one aircond?",
    ],
    ms: [
      "Apa itu suis isolator dan untuk apa ia dipasang?",
      "Apa itu MCB dan isolator serta apa yang dilindunginya?",
      "Apakah susunan elektrik yang betul untuk satu aircond?",
    ],
    zh: [
      "隔离开关是什么，装它做什么？",
      "MCB 与隔离开关保护的是什么？",
      "一台冷气正确的电路配置是什么？",
    ],
  },
  "meps-label": {
    en: [
      "What is the star energy label telling you?",
      "MEPS — what is the scheme, and who runs it?",
      "What are the numbers on the energy label worth in practice?",
    ],
    ms: [
      "Apa itu label bintang tenaga dan apa maksudnya?",
      "Apa itu skim MEPS dan siapa mengendalikannya?",
      "Apakah nilai sebenar angka pada label tenaga?",
    ],
    zh: [
      "能效星级标签说明的是什么？",
      "MEPS 制度是什么，由谁管理？",
      "能效标签上的数字实际意义是什么？",
    ],
  },
  "dry-mode": {
    en: [
      "What is dry mode good for in Malaysian humidity?",
      "Dry mode — what is the compressor doing?",
      "What is the difference between dry mode and cool mode?",
    ],
    ms: [
      "Apa itu mod kering dan bila ia berguna di Malaysia?",
      "Apa itu yang dilakukan kompresor dalam mod kering?",
      "Apakah beza mod kering dengan mod sejuk?",
    ],
    zh: [
      "在马来西亚的潮湿天气里，除湿模式的作用是什么？",
      "除湿模式下压缩机的运行方式是什么？",
      "除湿模式与制冷模式的区别是什么？",
    ],
  },
  "workmanship-warranty": {
    en: [
      "What is a workmanship warranty worth?",
      "Workmanship cover — what is included, and what is not?",
      "What are the two warranties on a new installation?",
    ],
    ms: [
      "Apa itu waranti kerjatangan dan apa nilainya?",
      "Apa itu yang dilindungi waranti kerja dan apa yang tidak?",
      "Apakah dua waranti yang ada pada pemasangan baharu?",
    ],
    zh: [
      "工艺保修的价值是什么？",
      "工艺保修保的是什么，不保的又是什么？",
      "一次新安装涉及的两种保修分别是什么？",
    ],
  },
  "pump-down": {
    en: [
      "What is pump-down, and who pays if it is skipped?",
      "Relocation pump-down — what is saved?",
      "What are the steps before an indoor unit comes off the wall?",
    ],
    ms: [
      "Apa itu pump-down dan siapa menanggung kos jika dilangkau?",
      "Apa itu yang diselamatkan semasa pump-down pemindahan?",
      "Apakah langkah sebelum unit indoor diturunkan?",
    ],
    zh: [
      "回收冷媒是什么，省略了由谁买单？",
      "移机时回收冷媒保住的是什么？",
      "室内机拆下墙之前的步骤是什么？",
    ],
  },
  psi: {
    en: [
      "What is PSI, and what should the reading be?",
      "Charge pressure — what is the technician aiming for?",
      "What are the normal running pressures for each gas?",
    ],
    ms: [
      "Apa itu PSI dan berapa bacaan yang sepatutnya?",
      "Apa itu tekanan sasaran yang dituju juruteknik?",
      "Apakah tekanan operasi normal bagi setiap jenis gas?",
    ],
    zh: [
      "PSI 是什么，读数应该在多少？",
      "技术员充注时的目标压力是什么？",
      "各种冷媒的正常运行压力分别是什么？",
    ],
  },
};

/** Alternate phrasings for comparison headings — same anti-boilerplate reason. */
export const COMPARISON_QUESTION_VARIANTS: Record<string, LocalizedList> = {
  "wash-vs-basic": {
    en: [
      "Chemical wash vs basic servicing: what does each one clean?",
      "Basic service vs chemical wash — which is worth booking now?",
    ],
    ms: [
      "Cuci kimia vs servis asas: apa yang dibersihkan setiap satu?",
      "Servis asas vs cuci kimia — mana patut ditempah sekarang?",
    ],
    zh: [
      "化学清洗与基本保养对比：各自清的是哪些部位？",
      "基本保养与化学清洗对比：现在该约哪一种？",
    ],
  },
  "wash-vs-overhaul": {
    en: [
      "Chemical wash vs overhaul: how deep does each go?",
      "Overhaul vs wash — which one stops a recurring leak?",
    ],
    ms: [
      "Cuci kimia vs overhaul: sedalam mana setiap satu?",
      "Overhaul vs cuci kimia — mana menghentikan bocor berulang?",
    ],
    zh: [
      "化学清洗与化学大修对比：清洁深度差在哪？",
      "大修与清洗对比：哪一种能止住反复漏水？",
    ],
  },
  "inverter-vs-non": {
    en: [
      "Inverter vs non-inverter: which pays back in your home?",
      "Non-inverter vs inverter — where does the saving really come from?",
    ],
    ms: [
      "Inverter vs non-inverter: mana berbaloi untuk rumah anda?",
      "Non-inverter vs inverter — dari mana datangnya penjimatan?",
    ],
    zh: [
      "变频与定频对比：哪一种在你家更划算？",
      "定频与变频对比：省下的电究竟从哪来？",
    ],
  },
  "r32-vs-r410a": {
    en: [
      "R32 vs R410A: what changes for servicing and cost?",
      "R410A vs R32 — which gas is in your unit?",
    ],
    ms: [
      "R32 vs R410A: apa berubah dari segi servis dan kos?",
      "R410A vs R32 — gas mana yang ada dalam unit anda?",
    ],
    zh: [
      "R32 与 R410A 对比：保养和费用有何不同？",
      "R410A 与 R32 对比：你那台用的是哪一种？",
    ],
  },
  "repair-vs-replace": {
    en: [
      "Repair vs replace: which decision costs less over three years?",
      "Replace vs repair — what should decide it?",
    ],
    ms: [
      "Baiki vs ganti: keputusan mana lebih murah dalam tiga tahun?",
      "Ganti vs baiki — apa yang patut menentukannya?",
    ],
    zh: [
      "维修与换新对比：三年下来哪种更省？",
      "换新与维修对比：判断标准是什么？",
    ],
  },
  "wall-vs-cassette": {
    en: [
      "Wall-mounted vs cassette: which fits your ceiling and budget?",
      "Cassette vs wall unit — what changes at service time?",
    ],
    ms: [
      "Unit dinding vs cassette: mana sesuai dengan siling dan bajet anda?",
      "Cassette vs unit dinding — apa berubah semasa servis?",
    ],
    zh: [
      "挂壁机与卡式机对比：天花条件和预算怎么选？",
      "卡式机与挂壁机对比：保养时的差别是什么？",
    ],
  },
  "topup-vs-leak-repair": {
    en: [
      "Top-up vs leak repair: which one lasts?",
      "Leak repair vs another top-up — where should the money go?",
    ],
    ms: [
      "Tambah gas vs baiki kebocoran: mana bertahan lebih lama?",
      "Baiki kebocoran vs tambah gas lagi — di mana wang patut pergi?",
    ],
    zh: [
      "加冷媒与补漏对比：哪种撑得久？",
      "补漏与再加一次气对比：钱该花在哪？",
    ],
  },
  "diy-vs-professional": {
    en: [
      "DIY vs technician: which tasks are safely yours?",
      "Technician vs DIY — where does the line sit?",
    ],
    ms: [
      "Buat sendiri vs juruteknik: kerja mana selamat untuk anda?",
      "Juruteknik vs DIY — di mana garisannya?",
    ],
    zh: [
      "自己动手与找技术员对比：哪些活你可以安全处理？",
      "技术员与自行处理对比：界线在哪？",
    ],
  },
  "hp-sizing": {
    en: [
      "1.0 HP vs 1.5 HP: which suits your room's heat load?",
      "1.5 HP vs 1.0 HP — when is the bigger unit the wrong answer?",
    ],
    ms: [
      "1.0 HP vs 1.5 HP: mana sesuai dengan beban haba bilik anda?",
      "1.5 HP vs 1.0 HP — bila unit lebih besar jawapan yang salah?",
    ],
    zh: [
      "1.0 匹与 1.5 匹对比：房间热负荷该配哪一档？",
      "1.5 匹与 1.0 匹对比：什么时候大一档反而是错的？",
    ],
  },
  frequency: {
    en: [
      "3-monthly vs 6-monthly servicing: which schedule fits your usage?",
      "Six-month vs three-month servicing — what does skipping cost?",
    ],
    ms: [
      "Servis 3 bulan vs 6 bulan: jadual mana sesuai dengan penggunaan anda?",
      "Servis enam bulan vs tiga bulan — apa kos jika dilewatkan?",
    ],
    zh: [
      "每 3 个月与每 6 个月保养对比：你的使用方式适合哪种？",
      "半年一次与三个月一次对比：拖延的代价是什么？",
    ],
  },
  "brand-centre-vs-independent": {
    en: [
      "Brand centre vs independent contractor: who should take this job?",
      "Independent vs authorised service centre — which is faster and cheaper?",
    ],
    ms: [
      "Pusat jenama vs kontraktor bebas: siapa patut buat kerja ini?",
      "Kontraktor bebas vs pusat servis sah — mana lebih pantas dan murah?",
    ],
    zh: [
      "品牌中心与独立承包商对比：这活该交给谁？",
      "独立承包商与特约服务中心对比：谁更快更省？",
    ],
  },
  "window-vs-split": {
    en: [
      "Window unit vs split: which one can your building take?",
      "Split vs window unit — what do you gain and lose?",
    ],
    ms: [
      "Unit window vs split: mana yang dibenarkan bangunan anda?",
      "Split vs unit window — apa untung ruginya?",
    ],
    zh: [
      "窗口机与分体机对比：你的楼宇能装哪一种？",
      "分体机与窗口机对比：各有什么得失？",
    ],
  },
  "workmanship-vs-manufacturer-warranty": {
    en: [
      "Workmanship vs manufacturer warranty: who do you call?",
      "Brand warranty vs installer warranty — which claim is which?",
    ],
    ms: [
      "Waranti kerjatangan vs waranti pengeluar: siapa perlu dihubungi?",
      "Waranti jenama vs waranti pemasang — tuntutan mana yang mana?",
    ],
    zh: [
      "工艺保修与原厂保修对比：出事该找谁？",
      "品牌保修与安装保修对比：哪种情况归哪边？",
    ],
  },
  "condo-vs-landed": {
    en: [
      "Condo vs landed installation: what does access change?",
      "Landed vs high-rise installation — where does the extra cost come from?",
    ],
    ms: [
      "Pemasangan kondo vs landed: apa yang diubah oleh akses?",
      "Rumah landed vs bangunan tinggi — dari mana datang kos tambahan?",
    ],
    zh: [
      "公寓与有地房屋安装对比：通道条件改变了什么？",
      "有地房屋与高楼安装对比：多出来的费用从哪来？",
    ],
  },
  "standard-vs-extended-piping": {
    en: [
      "Included piping vs extended run: what should you ask before booking?",
      "Extended pipe run vs standard length — what does it do to cooling?",
    ],
    ms: [
      "Paip disertakan vs larian lanjutan: apa perlu ditanya sebelum menempah?",
      "Larian paip lanjutan vs panjang standard — apa kesannya pada penyejukan?",
    ],
    zh: [
      "含配管与加长走管对比：预约前该问清楚什么？",
      "加长走管与标准长度对比：对制冷有什么影响？",
    ],
  },
  "install-now-vs-postpone-rain": {
    en: [
      "Install in the rain vs wait for a dry day: what actually stops work?",
      "Rescheduling vs proceeding in wet weather — which steps care?",
    ],
    ms: [
      "Pasang ketika hujan vs tunggu hari kering: apa sebenarnya menghentikan kerja?",
      "Jadual semula vs teruskan dalam hujan — langkah mana yang terjejas?",
    ],
    zh: [
      "雨天施工与等晴天对比：真正会中断的是哪一步？",
      "改期与雨中照做对比：哪些工序真的受影响？",
    ],
  },
  "single-vs-multiple-units": {
    en: [
      "One unit vs the whole house: which booking saves more?",
      "Whole-house visit vs single unit — what changes besides price?",
    ],
    ms: [
      "Satu unit vs seluruh rumah: tempahan mana lebih menjimatkan?",
      "Lawatan seluruh rumah vs satu unit — apa berubah selain harga?",
    ],
    zh: [
      "只做一台与全屋一起做对比：哪种更省？",
      "全屋一次做与单台处理对比：除了价格还差在哪？",
    ],
  },
  "galvanised-vs-stainless-bracket": {
    en: [
      "Galvanised vs stainless bracket: which does your address need?",
      "Stainless vs galvanised outdoor bracket — when is the upgrade justified?",
    ],
    ms: [
      "Braket galvani vs stainless: mana diperlukan alamat anda?",
      "Braket stainless vs galvani — bila naik taraf itu berbaloi?",
    ],
    zh: [
      "镀锌与不锈钢支架对比：你家地点该用哪种？",
      "不锈钢与镀锌支架对比：什么情况值得升级？",
    ],
  },
};

/** Stable 32-bit hash — identical to the selector's, kept local to avoid a cycle. */
function variantHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash >>> 0;
}

/** Deterministically choose one phrasing of a definition heading for a page. */
export function pickTermQuestion(
  term: GlossaryTerm,
  locale: ExplainerLocale,
  seed: string,
): string {
  const options = [term.question[locale], ...(TERM_QUESTION_VARIANTS[term.id]?.[locale] || [])];
  return options[variantHash(`${seed}|${term.id}|${locale}`) % options.length];
}

/** Deterministically choose one phrasing of a comparison heading for a page. */
export function pickComparisonQuestion(
  set: ComparisonSet,
  locale: ExplainerLocale,
  seed: string,
): string {
  const options = [
    set.question[locale],
    ...(COMPARISON_QUESTION_VARIANTS[set.id]?.[locale] || []),
  ];
  return options[variantHash(`${seed}|${set.id}|${locale}`) % options.length];
}
