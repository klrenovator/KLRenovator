/**
 * Detailed content for each service page.
 * Keyed by slug (matches config/site.ts services).
 * ALL prices synced with site.ts — June 2026
 * Phase 6: heroImage fixed + faqsBM + faqsZH added + HowTo steps expanded
 */

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  startPrice: string;
  highlights: string[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
  faqsBM: { q: string; a: string }[];
  faqsZH: { q: string; a: string }[];
  priceTable: { label: string; price: string }[];
  priceTableNote?: string;
  heroImage: string;
  ogImage: string;
  aioSummary: string;
  aioSummaryMS: string;
  aioSummaryZH: string;
  compareTable?: { title: string; subtitle: string; columns: string[]; rows: string[][] };
  compareTableMS?: { title: string; subtitle: string; columns: string[]; rows: string[][] };
  compareTableZH?: { title: string; subtitle: string; columns: string[]; rows: string[][] };
};

export const servicesData: Record<string, ServiceDetail> = {

  // ── 1. PRESSURE CHEMICAL WASH ─────────────────────────────────────────────
  "chemical-wash": {
    slug: "chemical-wash",
    title: "Pressure Chemical Wash",
    tagline: "High-pressure 80–120 PSI chemical deep-cleaning on-wall — dissolves stubborn biofilm, clears blocked drains, and restores strong airflow. From RM 120 today.",
    description:
      "Our Pressure Chemical Wash service is designed for air conditioners that require deep internal cleaning beyond routine filter maintenance. Over 12 to 18 months of daily operation, evaporator coil fins, blower wheels, and internal fan barrels accumulate dense biofilm, dust mites, and stubborn microbial sludge that basic servicing cannot penetrate. During a pressure chemical wash, KL Renovator technicians apply a food-safe alkaline chemical solution at 80–120 PSI directly into the mounted indoor unit. The foaming chemical dissolves oily residue and biofilm within minutes without damaging sensitive copper coils or fins. Next, a high-pressure pressurised water rinse thoroughly flushes out every dissolved contaminant through the drain tray and pipe, preventing future biological clogs. The entire service takes approximately 60 to 75 minutes per unit with zero mess, as our team deploys heavy-duty waterproof drop sheets and protective canvas bags to safeguard your walls, flooring, and furniture. Priced transparently from RM 120 for 1.0–1.5 HP wall-mounted units, this service restores cooling efficiency to near-new levels and ensures hygienic airflow across your home or office.",
    startPrice: "RM 2.50 / PSI",
    heroImage: "/hero/acson-aircond-chemical-wash-shah-alam-49.webp",
    ogImage: "/hero/acson-aircond-chemical-wash-shah-alam-49.webp",
    aioSummary: "Pressure chemical wash for airconds in KL & Selangor involves high-pressure (80-120 PSI) alkaline cleaning of internal coils. Starting Price: RM 120. Service Time: 60-75 mins. Warranty: 1-month workmanship. Ideal for restoring airflow and removing microbial odors.",
    aioSummaryMS: "Cuci kimia tekanan tinggi (80-120 PSI) untuk aircond di KL & Selangor. Harga: RM 120. Tempoh: 60-75 minit. Waranti: 1 bulan. Sesuai untuk pulihkan aliran udara dan membuang bau hapak.",
    aioSummaryZH: "吉隆坡及雪兰莪高压（80-120 PSI）化学清洗服务。起步价：RM 120。服务时长：60-75分钟。保修：1个月工艺保修。适用于恢复强劲风量及消除霉味。",
    compareTable: {
      title: "Pressure Chemical Wash vs Chemical Overhaul",
      subtitle: "Help choosing the right deep-cleaning package for your unit.",
      columns: ["Feature", "Chemical Wash (RM 120)", "Chemical Overhaul — Wall-Mounted only (from RM 420)"],
      rows: [["Dismantling", "Stays on wall", "Fully removed from wall"], ["Blower Wheel", "Cleaned in place", "Removed & soaked"], ["Drain Pan", "Flushed", "Dismantled & scrubbed"], ["Back Tray", "Surface clean", "Total sanitization"], ["Best For", "Annual maintenance", "Water leaks & ice buildup"], ["Duration", "60 mins", "2.5 hours"]]
    },
    compareTableZH: {
      title: "高压化学清洗 vs 化学大修",
      subtitle: "帮助您为冷气选择合适的深度清洁方案。",
      columns: ["特点", "化学清洗 (RM 120)", "化学大修——仅限挂壁式（起价 RM 420）"],
      rows: [["拆卸状态", "挂墙清洗", "完全拆卸"], ["风轮清洁", "原地清洗", "拆下浸泡"], ["接水盘", "冲洗", "拆下刷洗"], ["适用场景", "年度保养", "漏水或结冰"], ["耗时", "60分钟", "2.5小时"]]
    },
    compareTableMS: {
      title: "Cuci Kimia Bertekanan vs Chemical Overhaul",
      subtitle: "Bantuan memilih pakej pembersihan mendalam yang sesuai untuk unit anda.",
      columns: ["Ciri", "Cuci Kimia (RM 120)", "Overhaul — Unit Dinding Sahaja (dari RM 420)"],
      rows: [["Pemasangan", "Kekal di dinding", "Dibuka sepenuhnya"], ["Roda Kipas", "Cuci di tempat", "Dibuka & direndam"], ["Dulang Saliran", "Bilas sahaja", "Dibuka & disental"], ["Sesuai Untuk", "Servis tahunan", "Bocor air & ais"], ["Tempoh", "60 minit", "2.5 jam"]]
    },
    highlights: [
      "Industrial-grade 80–120 PSI high-pressure flushing of the internal coil & blower wheel",
      "Non-corrosive, food-safe alkaline cleaning agents — safe for families & pets",
      "Restores volumetric airflow by removing microbial sludge and biofilm buildup",
      "Full-system sanitization — kills bacteria & mould colonies at the source",
      "Mess-free execution with heavy-duty waterproof canvas protection for walls & floors",
      "Significantly reduces TNB electricity consumption by optimizing compressor cycles",
      "Complete drain line pressure-flush included to prevent future condensate leaks",
      "Ideal for heavy-use units or homes near high-traffic roads and construction zones",
    ],
    process: [
      { step: "Protect Your Space", desc: "Heavy-duty waterproof drop sheets cover your floor, wall below the unit, and nearby furniture. The chemical is food-safe but we protect everything regardless." },
      { step: "Chemical Application", desc: "Alkaline chemical solution sprayed at pressure into the coil fins, blower wheel, fan barrel, and internal housing. The chemical foams on contact with biofilm — you will see brown/black sludge start to dissolve within minutes." },
      { step: "High-Pressure Flush", desc: "Pressurised water jet flushes dissolved contaminants through the drain pipe. We continue flushing until the water runs clear — a sign the coil and drain path are fully clean. Drain pipe is then flushed with clean water to prevent future clogs." },
      { step: "Reassemble, Test & Handover", desc: "Filters reinstalled, front panel clipped back. Unit run for 10–15 minutes. Supply air temperature measured — you will feel the difference immediately. Area wiped clean, job card signed." },
    ],
    faqs: [
      {
        q: "How much does a pressure chemical wash cost in KL & Selangor?",
        a: "Wall-mounted 1.0–1.5 HP: RM 120. Wall-mounted 2.0–2.5 HP: RM 150. Wall-mounted 3.0 HP: RM 180. Ceiling cassette 1.0–1.5 HP: RM 220. Cassette 2.0–3.0 HP: RM 280. Window unit: RM 130–160. Every price confirmed before the technician begins. Multi-unit discount: 5% OFF Instant Booking Discount for 5+ units, 10% OFF Instant Booking Discount for 10+ units, same visit.",
      },
      {
        q: "How often should I get a chemical wash?",
        a: "Three scenarios based on real Klang Valley conditions: (1) Standard — mid-floor condo, moderate use, no road dust → every 12 months. (2) Accelerated — ground floor, near LDP/MRR2/NKVE/main road, construction nearby, or pet owners → every 6–8 months. (3) Heavy — 8+ hours daily, home office in use all day, or smoker in the house → every 6 months basic + annual chemical. If you are unsure, WhatsApp us a photo of your unit's location and we will give you an honest recommendation.",
      },
      {
        q: "What is the difference between chemical wash and basic servicing?",
        a: "Basic servicing: filter wash, drain flush, mild surface coil spray, electrical check — surface-level maintenance, RM 99. Chemical wash: high-pressure chemical penetrates deep into coil fins and blower wheel where biofilm and sludge live — areas basic servicing physically cannot reach without chemical and pressure. If your unit smells, blows weak air, or has not had a deep clean in 12+ months, basic servicing alone will not solve it.",
      },
      {
        q: "What is the technical difference between a pressure chemical wash and a chemical overhaul?",
        a: "A Pressure Chemical Wash (RM 120) is performed while the air conditioner remains mounted on your wall; high-pressure chemical spray penetrates the evaporator coil fins and blower wheel to flush out microbial buildup and restore cooling efficiency. A Chemical Overhaul (RM 220) involves completely dismantling the indoor unit from the wall so that every individual part—including the back drain tray, fan motor housing, and internal evaporator coils—is removed, chemical-soaked, and inspected separately before reassembly. If you are uncertain which service package suits your unit's condition, WhatsApp our technical team for an honest evaluation.",
      },
      {
        q: "What preparation is required before the technician arrives for a chemical wash?",
        a: "Minimal preparation is needed. Simply ensure there is clear walking space below the indoor air conditioner unit and move any fragile or valuable items slightly aside. Our technician arrives equipped with heavy-duty waterproof protective canvas bags and drop sheets to cover your wall, flooring, and surrounding furniture completely during the 80–120 PSI high-pressure cleaning.",
      },
      {
        q: "Is the chemical safe for my family, pets, and furniture?",
        a: "Yes. We use a food-grade alkaline degreaser that is biodegradable and phosphate-free. It does not produce toxic fumes. We cover your floor, wall, and furniture with waterproof drop sheets as an extra precaution. The chemical is rinsed away completely during the high-pressure flush — nothing is left on the coil. The unit is safe to use immediately after we finish.",
      },
      { q: "Is the chemical wash process safe for the environment?", a: "Yes. KL Renovator uses biodegradable, eco-friendly cleaning agents that effectively break down biological matter without harmful environmental impact or toxic residue." }
    ],
    faqsBM: [
      {
        q: "Berapa harga cuci kimia tekanan di KL & Selangor?",
        a: "Dinding 1.0–1.5 HP: RM 120. Dinding 2.0–2.5 HP: RM 150. Dinding 3.0 HP: RM 180. Ceiling cassette 1.0–1.5 HP: RM 220. Cassette 2.0–3.0 HP: RM 280. Unit tingkap: RM 130–160. Setiap harga disahkan sebelum juruteknik bermula. Diskaun pelbagai unit: Diskaun Tempahan Segera 5% untuk 5+ unit, Diskaun Tempahan Segera 10% untuk 10+ unit, lawatan sama.",
      },
      {
        q: "Berapa kerap saya perlu buat cuci kimia?",
        a: "Tiga senario berdasarkan keadaan sebenar Klang Valley: (1) Standard — kondo tingkat pertengahan, penggunaan sederhana, tiada habuk jalan → setiap 12 bulan. (2) Dipercepatkan — tingkat bawah, berhampiran LDP/MRR2/NKVE/jalan utama, tapak pembinaan berdekatan, atau pemilik haiwan peliharaan → setiap 6–8 bulan. (3) Berat — 8+ jam sehari, pejabat rumah digunakan sepanjang hari, atau perokok dalam rumah → setiap 6 bulan servis asas + cuci kimia tahunan. Jika tidak pasti, WhatsApp kami foto lokasi unit anda dan kami akan berikan cadangan yang jujur.",
      },
      {
        q: "Apa perbezaan cuci kimia dan servis asas?",
        a: "Servis asas: cuci penapis, bilas longkang, semburan gegelung permukaan ringan, pemeriksaan elektrik — penyelenggaraan peringkat permukaan, RM 99. Cuci kimia: kimia tekanan tinggi menembusi jauh ke dalam sirip gegelung dan roda kipas di tempat biofilm dan enap cemar tinggal — kawasan yang tidak boleh dicapai oleh servis asas secara fizikal tanpa kimia dan tekanan. Jika unit anda berbau, meniup udara lemah, atau tidak pernah dicuci dalam 12+ bulan, servis asas sahaja tidak akan menyelesaikannya.",
      },
      {
        q: "Apakah perbezaan teknikal antara cuci kimia dan overhaul kimia?",
        a: "Cuci Kimia Bertekanan (RM 120) dilakukan semasa penghawa dingin kekal terpasang di dinding anda; semburan kimia tekanan tinggi menembusi sirip gegelung dan roda kipas untuk membersihkan penumpukan mikroorganisma dan memulihkan kecekapan penyejukan. Overhaul Kimia (RM 220) melibatkan pembongkaran lengkap unit dalaman dari dinding supaya setiap bahagian—termasuk dulang saliran belakang, perumahan motor kipas, dan gegelung penyejat—dikeluarkan, direndam kimia, dan diperiksa secara berasingan sebelum dipasang semula. Jika tidak pasti pakej mana yang sesuai, WhatsApp pasukan teknikal kami.",
      },
      {
        q: "Apakah persediaan yang diperlukan sebelum juruteknik tiba untuk cuci kimia?",
        a: "Persediaan minimum sahaja diperlukan. Pastikan terdapat ruang berjalan yang lapang di bawah unit penghawa dingin dalaman dan alihkan barang berharga atau mudah pecah ke tepi. Juruteknik kami tiba lengkap dengan beg kanvas pelindung kalis air dan alas pelindung tugas berat untuk melindungi dinding, lantai dan perabot sekeliling anda sepenuhnya semasa cucian bertekanan tinggi 80–120 PSI.",
      },
      { q: "Adakah proses cuci kimia selamat untuk alam sekitar?", a: "Ya. KL Renovator menggunakan agen pembersih biodegradasi yang mesra alam untuk memecahkan bahan biologi tanpa kesan buruk atau sisa toksik." },
      { q: "Bolehkah saya menempah cuci kimia pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama tersedia untuk cuci kimia di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik mendapatkan slot hari yang sama." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪的高压化学清洗费用是多少？",
        a: "挂壁式1.0–1.5 HP：RM 120。挂壁式2.0–2.5 HP：RM 150。挂壁式3.0 HP：RM 180。天花板卡式1.0–1.5 HP：RM 220。卡式2.0–3.0 HP：RM 280。窗式：RM 130–160。每项价格在技术员开始工作前确认。多台折扣：5+台享5%即时预订折扣（5% OFF Instant Booking Discount），10台以上享10%即时预订折扣（10% OFF Instant Booking Discount），同次上门。",
      },
      {
        q: "化学清洗应该多久做一次？",
        a: "基于巴生谷实际情况的三种场景：（1）标准——中层公寓，中度使用，无道路灰尘→每12个月。（2）加速——底层，靠近LDP/MRR2/NKVE/主干道，附近有工地，或养宠物→每6-8个月。（3）重度——每天8小时以上，全天在家办公，或家中有吸烟者→每6个月基本保养+每年化学清洗。如果不确定，WhatsApp我们您机器所在位置的照片，我们将给出诚实的建议。",
      },
      {
        q: "化学清洗和基本保养有什么区别？",
        a: "基本保养：清洗过滤网、冲洗排水管、轻度表面盘管喷雾、电气检查——表面级保养，RM 99。化学清洗：高压化学深入盘管翅片和风轮，溶解生物膜和淤泥——这些是基本保养单靠物理手段无法触及的区域。如果您的机器有异味、风量弱或12个月以上未深度清洁，仅靠基本保养无法解决。",
      },
      {
        q: "高压化学清洗与化学大修在技术上有何不同？",
        a: "高压化学清洗（RM 120）是在冷气挂在墙上的状态下进行的；高压化学喷雾深入蒸发器盘管翅片和风轮，冲洗掉微生物污垢并恢复制冷效率。化学大修（RM 220）则将室内机从墙上完全拆卸下来，每个独立部件——包括接水盘后部、风扇马达外壳及蒸发器盘管——都单独取出、化学浸泡并全面检查后再重装。如果您不确定哪种服务套餐适合您的机器状况，欢迎WhatsApp咨询我们的技术团队。",
      },
      {
        q: "技术员上门进行化学清洗前，我需要做哪些准备工作？",
        a: "仅需简易准备。只需确保室内冷气机正下方有足够的操作及走动空间，并稍微移开易碎品或贵重物品。技术员上门时均配备重型防水保护帆布袋和防污垫布，在整个80–120 PSI高压清洗过程中全方位保护您的墙面、地板与周围家具。",
      },
      { q: "化学清洗过程对环境安全吗？", a: "是的。KL Renovator 使用可生物降解的环保清洁剂，能有效分解生物污染物，无有害环境影响或毒性残留。" },
      { q: "能否当天预约化学清洗？", a: "可以 — KL Renovator 经常有当天预约名额用于化学清洗。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" }
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 180" },
      { label: "Wall-Mounted · 4.0 – 5.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Ceiling Cassette · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Window Unit · 1.0 – 2.0 HP", price: "RM 130" },
      { label: "Window Unit · 2.5 – 3.0 HP", price: "RM 160" },
    ],
  },

  // ── 2. CHEMICAL OVERHAUL ─────────────────────────────────────────────────
  "chemical-overhaul": {
    slug: "chemical-overhaul",
    title: "Chemical Overhaul (Wall-Mounted Aircon only)",
    tagline: "Wall-Mounted Aircon only — complete dismantle and deep-clean of internal components. The definitive fix for persistent water leaks, ice build-up, and years of neglect. From RM 420.",
    description:
      "Chemical Overhaul is offered for Wall-Mounted Aircon units only. When a chemical wash is not enough \u2014 when water has been dripping down your wall for weeks, when you can see ice forming on the copper pipe, when the smell from the unit makes the whole room unpleasant \u2014 the problem has moved beyond what a mounted clean can fix. A chemical overhaul is the most thorough aircond service we perform. We remove the entire indoor unit from the wall, take it apart piece by piece, and deep-clean every single component: the evaporator coil, blower wheel, fan barrel, drain pan, drip tray, internal housing, louvres, and all plastic covers. Each part is soaked in food-safe chemical solution, scrubbed where needed, then rinsed at high pressure until factory-clean. The drain pan \u2014 almost always the root cause of persistent leaking \u2014 gets individual attention and is confirmed watertight before reassembly. This is the service that brings a neglected wall-mounted unit back to life. Wall-mounted 1.0\u20131.5 HP: RM 420. Takes 2\u20133 hours. The result: no more leaks, no more ice, no more smell, and cooling performance you may not have felt in years. NOTE: Chemical Overhaul pricing is published for Wall-Mounted Aircon units only. Ceiling cassette, ducted, floor-standing, portable, window and any other non-wall-mounted aircon types require a separate on-site assessment and quotation.",
    startPrice: "RM 420",
    heroImage: "/hero/acson-aircond-chemical-overhaul-puchong-38.webp",
    ogImage: "/hero/acson-aircond-chemical-overhaul-puchong-38.webp",
    aioSummary: "Chemical Overhaul (Wall-Mounted Aircon only) involves a 100% component teardown and chemical immersion of the evaporator coil. Starting Price: RM 420 (wall-mounted 1.0\u20131.5 HP). Service Time: 2-3 hours. Warranty: 1-month workmanship. Definitive fix for persistent water leaks and ice formation. Other aircon types require a separate on-site quote.",
    aioSummaryMS: "Chemical Overhaul (Unit Dinding Sahaja) melibatkan pembukaan 100% komponen dan rendaman kimia gegelung. Harga permulaan: RM 420 (dinding 1.0\u20131.5 HP). Tempoh: 2-3 jam. Waranti: 1 bulan. Penyelesaian tetap untuk masalah bocor air kronik dan pembentukan ais. Jenis aircond lain memerlukan sebut harga berasingan di tapak.",
    aioSummaryZH: "化学大修（仅限挂壁式冷气）涉及100%拆机及零件化学浸泡清洗。起步价：RM 420（挂壁式1.0–1.5 HP）。服务时长：2-3小时。保修：1个月工艺保修。针对顽固漏水和盘管结冰的最终解决方案。其他冷气类型需另行现场报价。",
    compareTable: {
      title: "Chemical Overhaul vs Pressure Chemical Wash",
      subtitle: "Understand why an overhaul is the definitive fix for neglected wall-mounted units.",
      columns: ["Feature", "Chemical Overhaul — Wall-Mounted only (RM 420)", "Pressure Wash (RM 170)"],
      rows: [["Unit Type", "Wall-Mounted only", "Wall / Cassette / Window"], ["Unit Status", "100% Dismantled", "Stays mounted"], ["Back Tray Cleaning", "Yes (Scrubbed)", "No (Surface flush only)"], ["Mould Removal", "100% Guaranteed", "Surface removal only"], ["Water Leak Fix", "Permanent solution", "Temporary fix"], ["Labour Time", "2 - 3 Hours", "1 Hour"], ["Warranty", "1-Month Workmanship", "1-Month Workmanship"]]
    },
    highlights: [
      "Complete 100% system teardown — zero components left uncleaned",
      "Immersion chemical soak for the evaporator coil — removes deep-seated oxidation",
      "Blower wheel extraction & manual scrubbing — restores maximum throw distance",
      "Precision cleaning of the back drain pan — eliminates the #1 cause of wall leaks",
      "Mechanical inspection of all fan motor bearings and mounting gaskets",
      "Full-unit re-commissioning including vacuum pump evacuation and leak testing",
      "The definitive solution for 'ice formation' and foul, neglected odors",
      "Extends unit lifespan by 3–5 years compared to standard cleaning methods",
    ],
    process: [
      { step: "Protect & Remove", desc: "Waterproof drop sheets laid. Refrigerant pumped down into outdoor unit (no gas lost). Indoor unit carefully unbolted from wall bracket and brought to a prepared cleaning area on-site." },
      { step: "Full Disassembly", desc: "Unit opened completely. Coil removed, blower wheel pulled from motor shaft, drain pan and tray unscrewed, internal housing separated, louvres and covers taken off. Every part laid out for individual cleaning." },
      { step: "Chemical Soak & Scrub", desc: "Each component submerged or sprayed with food-safe chemical solution and left to soak. Stubborn biofilm and mineral deposits scrubbed with soft brushes \u2014 never wire brushes that would damage fins. Drain pan inspected for cracks under bright light." },
      { step: "High-Pressure Rinse & Reassemble", desc: "Every part rinsed at pressure until water runs completely clear. Components dried, then unit carefully reassembled in reverse order. All screw torques checked. Unit re-mounted on wall bracket, refrigerant released, cooling tested for 15\u201320 minutes, drain path water-tested." },
    ],
    faqs: [
      {
        q: "How much does a chemical overhaul cost in KL & Selangor?",
        a: "Chemical Overhaul pricing is published exclusively for Wall-Mounted Aircon units. Wall-mounted 1.0\u20131.5 HP: RM 420. Wall-mounted 2.0\u20132.5 HP: RM 490. Wall-mounted 3.0\u20133.5 HP: RM 560. All prices confirmed before technician begins. Multi-unit discount applies: 5% OFF Instant Booking Discount for 4\u201310 units, 10% OFF Instant Booking Discount for 10+ units. Ceiling cassette, ducted, floor-standing, portable, window and any other non-wall-mounted aircon types require a separate on-site assessment and quotation \u2014 these published prices do not apply to non-wall-mounted units.",
      },
      {
        q: "When do I need a chemical overhaul vs a chemical wash?",
        a: "Use this decision guide: (1) Water leaking from the indoor unit \u2192 likely overhaul (drain pan/tray blocked or cracked). (2) Ice visible on the coil or copper pipe \u2192 overhaul (coil is so dirty that refrigerant cannot absorb heat, causing freezing). (3) Extremely foul, rotten smell even after cleaning \u2192 overhaul (biofilm deep inside blower barrel and housing). (4) Unit not opened/cleaned in 3+ years \u2192 overhaul. (5) Chemical wash done 6 months ago and problem is back \u2192 overhaul (surface clean not enough). If symptoms are mild \u2014 slightly weak cooling, light musty smell, no leaks \u2014 a chemical wash (RM 170) is likely sufficient. WhatsApp us your symptoms and we will advise honestly.",
      },
      {
        q: "My aircond has been leaking water for weeks. Will overhaul stop it permanently?",
        a: "In approximately 90\u201395% of persistent leak cases, yes. The root cause is almost always a drain pan caked with biofilm and mineral deposits, a clogged drain outlet, or a cracked drain tray \u2014 all of which are fully accessible only during a complete overhaul. During the service, we individually clean the drain pan and tray, verify the drain path with a water test, and inspect for hairline cracks. If a crack is found (rare, usually on 8+ year old units), we will show you and discuss replacement options. But in most cases, a thorough chemical overhaul stops the leaking for good.",
      },
      {
        q: "How long does a chemical overhaul take?",
        a: "Wall-mounted 1.0\u20131.5 HP: 2\u20132.5 hours. Wall-mounted 2.0\u20133.5 HP: 2.5\u20133 hours. We do not rush \u2014 proper drying of components before reassembly is critical to prevent electrical shorts. If you have multiple wall-mounted units needing overhaul, we can schedule them on the same day and complete them sequentially.",
      },
      {
        q: "My aircond has ice forming on the indoor coil \u2014 is an overhaul needed?",
        a: "Ice on the indoor coil is a serious symptom. It means the coil is so dirty or blocked that refrigerant cannot absorb enough heat, causing the coil temperature to drop below freezing. If you see ice, turn the unit OFF immediately and run the fan only to defrost it \u2014 continuing to run with ice can damage the compressor. Once defrosted, a chemical overhaul is almost always required because the blockage is deep inside the coil. A chemical wash may help short-term but the ice will return within weeks if the coil is severely clogged. WhatsApp us immediately if you see ice \u2014 we can often dispatch same-day.",
      },
      {
        q: "Will I lose refrigerant gas during the overhaul?",
        a: "No. Our technician performs a \u2018pump-down\u2019 procedure before removing the indoor unit: the refrigerant is pumped back into the outdoor condenser unit and the service valves are closed, so no gas is lost. The unit is reconnected to the same refrigerant charge after reassembly. If your refrigerant level was already low before the overhaul (which we check during the initial diagnostic), we will inform you and quote a top-up separately. The overhaul itself does not consume or release any refrigerant.",
      },
      { q: "Does a chemical overhaul include checking for refrigerant leaks?", a: "Yes. Every chemical overhaul includes a mandatory high-pressure test or electronic leak sweep after reassembly to ensure the sealed system is 100% airtight." },
      { q: "Will my aircond be quieter after an overhaul?", a: "Significantly. By removing heavy sludge from the blower wheel and lubricating fan motor mounts, we eliminate the imbalances that cause vibration and high-frequency noise." }
    ],
    faqsBM: [
      {
        q: "Berapa harga chemical overhaul di KL & Selangor?",
        a: "Harga Chemical Overhaul diterbitkan secara eksklusif untuk unit dinding sahaja. Dinding 1.0\u20131.5 HP: RM 420. Dinding 2.0\u20132.5 HP: RM 490. Dinding 3.0\u20133.5 HP: RM 560. Semua harga disahkan sebelum juruteknik bermula. Diskaun pelbagai unit: 5% untuk 2\u20133 unit, 10% untuk 4\u20138 unit. Ceiling cassette, ducted, floor-standing, portable, window dan mana-mana jenis aircond bukan-dinding yang lain memerlukan sebut harga dan penilaian berasingan di tapak \u2014 harga yang diterbitkan ini tidak terpakai untuk unit bukan-dinding.",
      },
      {
        q: "Bilakah saya memerlukan overhaul kimia vs cuci kimia?",
        a: "Gunakan panduan ini: (1) Air bocor dari unit dalaman \u2192 overhaul (dulang longkang tersumbat atau retak). (2) Ais kelihatan pada gegelung atau paip kuprum \u2192 overhaul (gegelung terlalu kotor, bahan pendingin tidak dapat menyerap haba). (3) Bau sangat busuk walaupun selepas dibersihkan \u2192 overhaul (biofilm jauh di dalam barrel kipas). (4) Unit tidak dibuka/dibersihkan 3+ tahun \u2192 overhaul. (5) Cuci kimia 6 bulan lepas dan masalah kembali \u2192 overhaul. Jika simptom ringan \u2014 penyejukan sedikit lemah, bau hapak ringan, tiada bocor \u2014 cuci kimia (RM 170) mungkin mencukupi. WhatsApp kami simptom anda dan kami akan menasihatkan dengan jujur.",
      },
      {
        q: "Aircond saya telah bocor air berminggu-minggu. Adakah overhaul akan menghentikannya?",
        a: "Dalam kira-kira 90\u201395% kes kebocoran berterusan, ya. Punca utama hampir selalu adalah dulang longkang yang dipenuhi biofilm dan mendapan mineral, saluran longkang tersumbat, atau dulang longkang retak \u2014 semuanya hanya boleh diakses sepenuhnya semasa overhaul lengkap. Semasa servis, kami membersihkan dulang longkang secara individu, mengesahkan laluan longkang dengan ujian air, dan memeriksa keretakan halus. Jika keretakan ditemui (jarang, biasanya pada unit berusia 8+ tahun), kami akan tunjukkan kepada anda dan bincangkan pilihan penggantian.",
      },
      {
        q: "Berapa lama masa chemical overhaul?",
        a: "Dinding 1.0\u20131.5 HP: 2\u20132.5 jam. Dinding 2.0\u20133.5 HP: 2.5\u20133 jam. Kami tidak tergesa-gesa \u2014 pengeringan komponen yang betul sebelum pemasangan semula adalah kritikal untuk mengelakkan litar pintas elektrik. Jika anda mempunyai berbilang unit dinding yang memerlukan overhaul, kami boleh menjadualkannya pada hari yang sama.",
      },
      {
        q: "Adakah saya akan kehilangan gas bahan pendingin semasa overhaul?",
        a: "Tidak. Juruteknik kami melakukan prosedur 'pump-down' sebelum mengeluarkan unit dalaman: bahan pendingin dipam kembali ke dalam unit kondenser luar dan injap servis ditutup, jadi tiada gas hilang. Unit disambungkan semula ke cas bahan pendingin yang sama selepas pemasangan semula. Jika tahap bahan pendingin anda sudah rendah sebelum overhaul, kami akan memaklumkan anda.",
      },
      { q: "Adakah overhaul kimia termasuk pemeriksaan kebocoran gas?", a: "Ya. Setiap overhaul kimia termasuk ujian tekanan imbasan kebocoran elektronik jika diperlukan selepas pemasangan semula untuk memastikan sistem kedap udara 100%." },
      { q: "Adakah aircond saya akan menjadi lebih senyap selepas overhaul?", a: "Ya, secara ketara. Dengan membuang kotoran berat dari roda kipas dan melincirkan motor, kami menghapuskan ketidakseimbangan yang menyebabkan getaran dan bunyi bising." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪的化学大修费用是多少？",
        a: "化学大修价格仅针对挂壁式冷气公布。挂壁式1.0–1.5 HP：RM 420。挂壁式2.0–2.5 HP：RM 490。挂壁式3.0–3.5 HP：RM 560。所有价格在技术员开始工作前确认。多台折扣适用：5+台享5%即时预订折扣，10台以上享10%即时预订折扣。天花板卡式、风管机、落地式、移动式、窗式及其他任何非挂壁式冷气类型需要另行现场评估和报价——以上公布价格不适用于非挂壁式机型。",
      },
      {
        q: "何时需要化学大修而非化学清洗？",
        a: "使用此决策指南：（1）室内机漏水\u2192可能需要大修（排水盘堵塞或破裂）。（2）盘管或铜管可见结冰\u2192大修（盘管太脏导致冷媒无法吸热）。（3）即使清洗后仍有极臭气味\u2192大修（生物膜深入风轮桶和外壳内部）。（4）3年以上未打开/清洗\u2192大修。（5）6个月前做了化学清洗但问题复发\u2192大修（表面清洁不够）。如果症状轻微\u2014\u2014冷气稍弱、轻微霉味、无漏水\u2014\u2014化学清洗（RM 170）可能就足够了。WhatsApp我们您的症状，我们会诚实建议。",
      },
      {
        q: "冷气漏水好几周了\u2014\u2014大修能永久解决吗？",
        a: "约90-95%的持续漏水案例可以。根本原因几乎总是排水盘被生物膜和矿物沉积物覆盖、排水出口堵塞或排水盘破裂\u2014\u2014这些都只能在完全大修时彻底处理。在服务过程中，我们会单独清洗排水盘、用水测试验证排水通道、检查细微裂缝。如果发现裂缝（罕见，通常出现在8年以上旧机器上），我们会向您展示并讨论更换方案。但大多数情况下，彻底的化学大修可以永久解决漏水问题。",
      },
      {
        q: "化学大修需要多长时间？",
        a: "挂壁式1.0\u20131.5 HP：2\u20132.5小时。挂壁式2.0\u20133.5 HP：2.5\u20133小时。天花板卡式：3\u20134小时（因天花板网格集成需要更多拆卸工作）。我们不赶工\u2014\u2014重新组装前正确干燥零件对防止电气短路至关重要。如果您有多台机器需要大修，我们可以安排在同一天依次完成。",
      },
      {
        q: "大修过程中会损失制冷剂吗？",
        a: "不会。我们的技术员在拆卸室内机前执行\u2018泵送\u2019程序：制冷剂被泵回室外冷凝器，检修阀关闭，因此不会损失气体。重新组装后机器重新连接到相同的制冷剂充注量。如果大修前您的制冷剂水平已经偏低（我们会在初步诊断时检查），我们会通知您并另行报价充气服务。大修本身不会消耗或释放任何制冷剂。",
      },
      { q: "化学大修包含冷媒查漏吗？", a: "是的。每次化学大修都包含强制性的高压氮气测试或电子检漏，确保重装后的密封系统100%气密。" },
      { q: "大修后我的冷气会更安静吗？", a: "显著改善。通过清除风轮上的重度淤泥并润滑风扇电机支架，我们消除了导致震动和高频噪音的不平衡因素。" }
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 420" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 490" },
      { label: "Wall-Mounted · 3.0 – 3.5 HP", price: "RM 560" },
    ],
    priceTableNote: "Chemical Overhaul pricing is published exclusively for Wall-Mounted Aircon units. Ceiling cassette, ducted, floor-standing, portable, window and any other non-wall-mounted aircon types require a separate on-site assessment and quotation.",
  },

  // ── 3. GAS TOP-UP ────────────────────────────────────────────────────────
  "gas-topup": {
    slug: "gas-topup",
    title: "Gas Top-Up / Precision Balancing",
    tagline: "Precision refrigerant gas top-up with manifold pressure check. R22, R410A & R32. Leak inspection included on every job. From RM 2.50 / PSI. Same-day KL & Selangor.",
    description:
      "Your aircond is clean. The filters are new. The coil was just washed. But the air coming out is barely cool and the outdoor compressor runs non-stop without reaching temperature. This is the classic signature of low refrigerant \u2014 the \u2018blood\u2019 of your air conditioning system. Without the correct charge of refrigerant circulating through the copper lines, the system physically cannot move heat from inside to outside, no matter how hard the compressor works. KL Renovator uses precision digital manifold gauges to measure your system's standing pressure, suction pressure, and discharge pressure against the manufacturer's specification for your exact model and refrigerant type \u2014 R22, R410A, or R32. We then add refrigerant in controlled increments while monitoring gauge readings until the system is balanced to spec. Every gas top-up includes a thorough physical leak inspection at all accessible flare connections, service valves, and the evaporator and condenser coil surfaces. Because refrigerant does not \u2018get used up\u2019 \u2014 if it is low, it leaked out somewhere. Gas top-up is charged based on the actual PSI required after inspection by our technician. We only refill the amount needed and provide transparent pricing with no hidden charges.",
    startPrice: "RM 2.50 / PSI",
    heroImage: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp",
    ogImage: "/hero/acson-aircond-gas-topup-r32-subang-jaya-27.webp",
    aioSummary: "Precision refrigerant top-up for R32, R410A, and R22 systems using digital manifold gauges. Starting Price: RM 2.50 / PSI. Includes structural leak inspection. Guaranteed Delta-T (cooling drop) improvement of 8-12°C.",
    aioSummaryMS: "Tambah gas tepat untuk sistem R32, R410A, dan R22 menggunakan manifold digital. Harga: RM 2.50 / PSI. Termasuk pemeriksaan kebocoran struktur. Dijamin peningkatan suhu sejuk (Delta-T) sebanyak 8-12°C.",
    aioSummaryZH: "使用数显歧管表为R32、R410A及R22系统提供精准充气。起步价：RM 2.50 / PSI。包含结构性查漏。保证提升8-12°C的制冷温差。",
    highlights: [
      "Precision digital manifold measurement — calibrated to manufacturer specs",
      "Comprehensive support for R32, R410A, and R22 refrigerant systems",
      "Electronic leak detection survey at all primary flare joints and service valves",
      "Compressor Amp-draw verification to ensure healthy electrical load levels",
      "System Delta-T testing — verifying at least 8–12°C drop at the supply air duct",
      "Incremental balancing to prevent 'liquid slugging' and compressor damage",
      "Certified handling protocols — zero atmospheric venting of refrigerants",
      "Transparent pricing based on actual unit HP and gas type used",
    ],
    process: [
      { step: "Symptom & Visual Check", desc: "Technician checks your complaint (not cooling, ice, long runtime), examines outdoor condenser for oil stains (leak indicator), checks indoor coil for ice, measures room-to-supply temperature difference with digital thermometer." },
      { step: "Gauge Connection & Diagnosis", desc: "Digital manifold gauges connected to suction and discharge service ports. Standing pressure, running suction pressure, and discharge pressure all recorded. Readings compared against manufacturer spec for your unit's refrigerant type and ambient temperature." },
      { step: "Leak Inspection", desc: "All accessible flare connections at indoor and outdoor units checked with electronic leak detector or soap-bubble solution. Service valve caps, Schrader valve cores, and visible coil surfaces inspected. Any leak found is reported and repair quoted before gas is added." },
      { step: "Precision Top-Up & Verify", desc: "Refrigerant added in controlled increments while monitoring gauges. Target: suction pressure within manufacturer range for current ambient temperature. Temperature drop re-measured \u2014 target 8\u201312\u00b0C difference. Compressor amp-draw checked. Results recorded on your job card." },
    ],
    faqs: [
      {
        q: "How much does aircond gas top-up cost in KL & Selangor?",
        a: "Gas top-up is charged per PSI: R22 is RM 2.50/PSI, while R410A and R32 are RM 3.00/PSI. Final cost depends on the actual PSI required after inspection by our technician. We only refill the amount needed and provide transparent pricing with no hidden charges. Leak inspection is included with every top-up.",
      },
      {
        q: "How do I know if my aircond needs a gas top-up, not just a clean?",
        a: "The key differentiator: if your unit is CLEAN (filters washed, basic service done recently) but still has these symptoms, it is almost certainly low on refrigerant: (1) Air from the unit is cool but not cold \u2014 temperature at the outlet is only 2\u20134\u00b0C cooler than room air, not the expected 8\u201312\u00b0C. (2) The outdoor compressor runs continuously but the room never reaches set temperature. (3) Ice or frost visible on the copper pipes near the outdoor unit or on the indoor coil. (4) The outdoor unit's fan is blowing room-temperature air instead of hot air. If you notice any of these, WhatsApp us \u2014 we can often diagnose over the phone with a few quick tests.",
      },
      {
        q: "What is the difference between R22, R410A and R32 gas?",
        a: "R22 (Freon/HCFC-22): Old refrigerant phased out in new units from 2010. Still found in units 10\u201315+ years old. Being phased out globally \u2014 becoming more expensive and harder to source. R410A (HFC): Replaced R22, used in most units manufactured 2010\u20132018. Higher pressure than R22 \u2014 requires thicker copper pipe. Not eco-friendly but still widely available. R32 (HFC-32): The current standard from ~2019 onwards. Lower global warming potential than R410A, better energy efficiency, requires less refrigerant charge. Most new Daikin, Panasonic, and Mitsubishi units use R32. CRITICAL: Never mix gases. Check the nameplate on your outdoor unit to confirm. Adding the wrong gas can destroy the compressor.",
      },
      {
        q: "Why does my aircond keep losing gas? Shouldn't refrigerant last forever?",
        a: "Correct \u2014 refrigerant does not get \u2018consumed\u2019. It circulates in a sealed closed loop. If the level is low, there is a leak somewhere. Common leak points: (1) Flare connections at indoor and outdoor units \u2014 these are the most common, usually fixable by re-flaring or tightening. (2) Evaporator or condenser coil \u2014 micro-leaks from corrosion, especially in units 8+ years old near the coast (Klang, Port Klang). (3) Service valve Schrader cores \u2014 simple fix, often overlooked. If your unit needs gas every 6\u201312 months, the leak needs to be found and repaired. A top-up without fixing the leak is a temporary patch. We will honestly tell you whether the leak is minor (manageable with annual top-up) or major (repair or replace decision needed).",
      },
      {
        q: "Can I use my aircond while waiting for a gas top-up appointment?",
        a: "If the unit is still blowing cool (not cold) air with no ice: yes, you can use it, but it is running inefficiently and your electricity bill is higher than normal for the cooling you are getting. If ice is forming on the indoor coil or copper pipe: turn the unit OFF immediately and run only the fan to defrost it. Running with ice can damage the compressor (liquid refrigerant slugging) \u2014 that turns a RM 170 top-up into a RM 800+ compressor replacement. If you see ice, WhatsApp us \u2014 we can often prioritise your appointment.",
      },
      {
        q: "Can I top up the gas myself?",
        a: "No. Refrigerant handling in Malaysia requires certified technicians under the Environmental Quality (Refrigerant Management) Regulations. You need: (a) a manifold gauge set, (b) the correct refrigerant cylinder, (c) a weighing scale, (d) training to read pressures correctly against ambient temperature charts, and (e) an electronic leak detector for safety. Overfilling by even 10\u201315% can cause liquid slugging that destroys the compressor. Using the wrong refrigerant type can cause a chemical reaction that corrodes the system internally. This is not a DIY job \u2014 at RM 170\u2013180 including professional leak check, it is also not expensive.",
      },
      { q: "How can I tell if a leak is 'slow' or 'fast'?", a: "A slow leak takes 6-12 months to affect cooling; a fast leak results in warm air within days. KL Renovator's electronic sniffers can detect even the smallest micro-leaks in copper flare joints." }
    ],
    faqsBM: [
      {
        q: "Berapa harga tambah gas aircond di KL & Selangor?",
        a: "Tambah gas dikenakan bayaran per PSI: R22 ialah RM 2.50/PSI, manakala R410A dan R32 ialah RM 3.00/PSI. Kos akhir bergantung kepada PSI sebenar yang diperlukan selepas pemeriksaan oleh juruteknik kami. Kami hanya mengisi jumlah yang diperlukan dan menyediakan harga telus tanpa caj tersembunyi.",
      },
      {
        q: "Bagaimana saya tahu aircond perlu tambah gas, bukan sekadar cuci?",
        a: "Pembeza utama: jika unit anda BERSIH (penapis dicuci, servis asas baru dilakukan) tetapi masih mempunyai simptom ini, hampir pasti gas rendah: (1) Udara dari unit sejuk tetapi tidak sejuk betul \u2014 suhu di saluran keluar hanya 2\u20134\u00b0C lebih sejuk daripada udara bilik, bukan 8\u201312\u00b0C yang dijangkakan. (2) Kompressor luar berjalan tanpa henti tetapi bilik tidak mencapai suhu yang ditetapkan. (3) Ais atau fros kelihatan pada paip kuprum berhampiran unit luar atau pada gegelung dalaman. (4) Kipas unit luar meniup udara suhu bilik dan bukannya udara panas. WhatsApp kami jika anda perasan mana-mana simptom ini.",
      },
      {
        q: "Apa perbezaan antara gas R22, R410A dan R32?",
        a: "R22: Gas lama yang dihentikan dalam unit baharu dari 2010. Masih ditemui dalam unit berusia 10\u201315+ tahun. Semakin mahal dan sukar diperoleh. R410A: Menggantikan R22, digunakan dalam kebanyakan unit 2010\u20132018. Tekanan lebih tinggi daripada R22. R32: Standard semasa dari ~2019. Potensi pemanasan global lebih rendah, kecekapan tenaga lebih baik. Kebanyakan unit Daikin, Panasonic, dan Mitsubishi baharu menggunakan R32. PENTING: Jangan campur gas. Semak papan nama pada unit luar anda. Menambah gas yang salah boleh memusnahkan kompresor.",
      },
      {
        q: "Mengapa aircond saya terus kehilangan gas?",
        a: "Betul \u2014 gas penyejuk tidak 'digunakan'. Ia beredar dalam gelung tertutup. Jika paras rendah, ada kebocoran di suatu tempat. Titik kebocoran biasa: (1) Sambungan flare di unit dalam dan luar \u2014 paling biasa, boleh dibaiki dengan flare semula. (2) Gegelung penyejat atau kondenser \u2014 kebocoran mikro dari kakisan, terutama unit berusia 8+ tahun berhampiran pantai (Klang, Pelabuhan Klang). (3) Teras injap Schrader \u2014 pembaikan mudah, sering terlepas pandang. Jika unit anda memerlukan gas setiap 6\u201312 bulan, kebocoran perlu ditemui dan dibaiki. Gas Leak Repair ialah RM 120 bagi setiap kebocoran; harga gas top-up kekal berasingan mengikut PSI yang diperlukan.",
      },
      {
        q: "Bolehkah saya menambah gas sendiri?",
        a: "Tidak. Pengendalian bahan pendingin di Malaysia memerlukan juruteknik bertauliah di bawah Peraturan Pengurusan Bahan Pendingin (Kualiti Alam Sekitar). Anda memerlukan peralatan khusus dan latihan profesional. Pengisian berlebihan walaupun 10\u201315% boleh menyebabkan kerosakan kompresor. Ini bukan kerja DIY.",
      },
      { q: "Bagaimana saya tahu jika kebocoran itu 'perlahan' atau 'cepat'?", a: "Kebocoran perlahan mengambil masa 6-12 bulan untuk menjejaskan penyejukan; kebocoran cepat mengakibatkan angin panas dalam masa beberapa hari. Pengesan elektronik kami boleh mengesan kebocoran mikro paling kecil." },
      { q: "Bolehkah saya menempah tambah gas pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama untuk tambah gas di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪冷气充气费用是多少？",
        a: "加气按 PSI 收费：R22 为 RM 2.50/PSI，R410A 和 R32 为 RM 3.00/PSI。最终费用取决于技师检查后所需的实际 PSI。我们仅填充所需的量，并提供透明的价格，无隐藏收费。每次加气均包含漏气检查。",
      },
      {
        q: "如何判断冷气需要充气而不是仅仅清洗？",
        a: "关键区分：如果您的机器是干净的（过滤网已清洗，近期做过基本保养）但仍出现以下症状，几乎可以肯定是制冷剂不足：（1）出风凉爽但不冷\u2014\u2014出风口温度仅比室温低2-4\u00b0C，而非预期的8-12\u00b0C。（2）室外压缩机不停运转但房间从未达到设定温度。（3）室外机附近铜管或室内盘管可见结冰或结霜。（4）室外机风扇吹出的是室温空气而非热风。如果您注意到以上任何症状，请WhatsApp我们\u2014\u2014我们通常可以通过几个快速测试在电话中诊断。",
      },
      {
        q: "R22、R410A和R32气体有什么区别？",
        a: "R22：2010年新机器停用的老式气体。仍存在于10-15年以上的旧机器中。全球正在淘汰\u2014\u2014越来越贵且难以获取。R410A：取代R22，用于2010-2018年生产的大多数机器。压力比R22高。R32：从约2019年起的现行标准。全球变暖潜能值低于R410A，能效更佳。大多数新的大金、松下和三菱机器使用R32。关键：切勿混合气体。查看室外机铭牌确认。加错气体可能损坏压缩机。",
      },
      {
        q: "为什么冷气一直漏气？制冷剂不应该永久使用吗？",
        a: "没错\u2014\u2014制冷剂不会被\u2018消耗\u2019。它在密封闭环中循环。如果水平低，某处有泄漏。常见泄漏点：（1）室内外机的喇叭口接头\u2014\u2014最常见，通常可通过重新扩口或紧固修复。（2）蒸发器或冷凝器盘管\u2014\u2014腐蚀导致的微漏，尤其是靠近海岸（巴生、巴生港）的8年以上机器。（3）检修阀Schrader阀芯\u2014\u2014简单修复，常被忽视。如果您的机器每6-12个月就需要充气，泄漏必须找到并修复。",
      },
      {
        q: "我可以自己充气吗？",
        a: "不可以。在马来西亚，制冷剂处理根据《环境质量（制冷剂管理）法规》需要认证技术员。充气过量即使10-15%也可能导致压缩机损坏。使用错误类型的制冷剂可能导致系统内部腐蚀的化学反应。这绝非DIY工作\u2014\u2014以RM 170-180的价格（含专业泄漏检查）也并不昂贵。",
      },
      { q: "如何判断漏气是“慢漏”还是“快漏”？", a: "慢漏通常需要6-12个月才影响制冷；快漏则会在几天内排空冷媒。KL Renovator 的电子检漏仪可以检测到铜管接头中最微小的渗漏。" },
      { q: "能否当天预约冷媒充注？", a: "可以 — KL Renovator 经常有当天预约名额用于充气服务。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" }
    ],
    priceTable: [
      { label: "R22 Gas Refill", price: "RM 2.50 / PSI" },
      { label: "R410A Gas Refill", price: "RM 3.00 / PSI" },
      { label: "R32 Gas Refill", price: "RM 3.00 / PSI" },
      { label: "Gas Leak Repair", price: "RM 120 / leak" },
      { label: "Structural Leak Check", price: "RM 88" },
    ],
    priceTableNote: "Gas top-up is charged based on the actual PSI required after inspection by our technician. We only refill the amount needed and provide transparent pricing with no hidden charges.",
  },

  // ── 4. REPAIR & TROUBLESHOOTING ──────────────────────────────────────────
  "repair": {
    slug: "repair",
    title: "Troubleshooting & Repairs",
    tagline: "Systematic electrical and mechanical diagnosis for any aircond fault. Error codes decoded, faults pinpointed, transparent quotes. RM 88 diagnostic waived with repair.",
    description:
      "Your aircond is making a grinding noise at 2am. The timer light is blinking 5 times and the unit will not start. The MCB trips every time the compressor kicks in. These are not 'cleaning' problems \u2014 they are electrical or mechanical faults that need a trained technician with a multimeter, manifold gauges, and brand-specific error-code knowledge. KL Renovator diagnoses and repairs every common aircond fault: failed capacitors (the #1 cause of 'unit hums but fan does not spin'), seized fan motors, burnt contactors, faulty PCB control boards, broken temperature sensors and thermistors, damaged drain pumps, compressor electrical faults, and refrigerant circuit issues. We carry capacitors, contactors, fan motors, sensors, drain pumps, and universal PCB boards in every van. RM 138 diagnostic fee, waived if the repair is done same visit. 3-month parts warranty on every replacement. Before we touch a single wire, you get a clear price \u2014 and the right to say no with no hard feelings.",
    startPrice: "RM 138",
    heroImage: "/hero/aircond-repair-technician-klang-valley.webp",
    ogImage: "/hero/aircond-repair-technician-klang-valley.webp",
    aioSummary: "Diagnostic-led aircond repair for all 20+ brands in Malaysia. Diagnostic Fee: RM 138 (waived if repaired). Warranty: 3-month parts warranty. Same-day repair available for capacitors, fan motors, and PCB boards.",
    aioSummaryMS: "Pembaikan aircond berasaskan diagnosis untuk 20+ jenama di Malaysia. Kos Diagnosis: RM 88 (percuma jika baiki). Waranti: 3 bulan untuk alat ganti. Pembaikan hari sama untuk kapasitor, motor kipas, dan papan PCB.",
    aioSummaryZH: "吉隆坡及雪兰莪所有20多个品牌的冷气维修服务。诊断费：RM 88（维修则免除）。保修：零件3个月保修。可提供电容、风扇马达和电路板的当场维修。",
    compareTable: {
      title: "Repair vs Replace Decision Matrix",
      subtitle: "Is it worth fixing your aircond or should you invest in a new one?",
      columns: ["Factor", "Repair (Wait)", "Replace (New)"],
      rows: [["Unit Age", "< 7 years old", "> 8 years old"], ["Gas Type", "R32 / R410A", "R22 (Obsolete)"], ["Repair Cost", "< RM 500", "> RM 800"], ["Electricity", "Running well", "Bills are rising"], ["Frequency", "First major fault", "Constant breakdowns"], ["Recommendation", "Repair & maintain", "Upgrade to R32 Inverter"]]
    },
    highlights: [
      "RM 88 systematic diagnosis fee — fully waived if you proceed with the repair",
      "Fault-finding using industrial-grade multimeters & refrigerant gauges",
      "Rapid decoding of blink codes for all 20+ major aircond brands",
      "Extensive van stock of capacitors, fan motors, contactors, and PCB boards",
      "Electrical safety audits — identifying burnt wiring and loose isolator connections",
      "Compressor winding resistance and insulation testing (Megger test)",
      "3-month warranty on all replacement components for peace of mind",
      "Honest 'Repair vs Replace' advice based on unit age and repair ROI",
    ],
    process: [
      { step: "Listen & Measure", desc: "You describe exactly what happened and when. Technician checks error code blink pattern, listens for unusual sounds, measures voltage at the isolator, checks MCB status, and tests the remote/thermostat signal." },
      { step: "Systematic Diagnosis", desc: "Multimeter tests: capacitor microfarad reading, fan motor winding resistance, compressor terminal resistance and insulation, sensor thermistor resistance at ambient temperature. Manifold gauges check refrigerant standing pressure if cooling is weak. Every reading compared to manufacturer spec." },
      { step: "Transparent Quote", desc: "Fault explained in plain language. Exact replacement part and labour price quoted. If the fault has multiple possible causes, we explain the most-likely-first approach so you understand what you are paying for. No work begins without your verbal or WhatsApp approval." },
      { step: "Replace & Verify", desc: "Faulty component replaced with OEM-spec or equivalent-quality part. All connections torqued and insulated. Unit run through full cycle \u2014 cooling, heating (if heat pump), fan speeds, thermostat on/off, drain function. Before/after readings recorded on your job card." },
    ],
    faqs: [
      {
        q: "How much does aircond repair cost in KL & Selangor?",
        a: "Diagnostic fee: RM 88 (waived if repaired same visit). Capacitor replacement: RM 150\u2013250. Indoor fan motor: RM 250\u2013380. Outdoor fan motor: RM 300\u2013450. PCB board: RM 280\u2013600. Temperature sensor/thermistor: RM 150\u2013250. Contactor: RM 150\u2013200. Drain pump: RM 350\u2013550. Compressor: RM 800\u20132,000 (quoted after diagnosis). All prices confirmed before any work starts. Multi-unit discount applies.",
      },
      {
        q: "My aircond lights are blinking and it will not turn on \u2014 what does that mean?",
        a: "Blinking lights are the unit's self-diagnostic error code. Each brand uses a different blink pattern: Daikin (green/red flash count), Panasonic (timer light blink sequence), Mitsubishi (operation indicator flash pattern), etc. Common error codes: temperature sensor open/short circuit, coil temperature too high (overheating), communication error between indoor and outdoor units, low refrigerant pressure detected, compressor overcurrent, or PCB internal fault. Tell us your brand and the blink pattern (e.g., 'timer light blinks 3 times, pauses, repeats') and we can often tell you the likely fault before we even arrive.",
      },
      {
        q: "My aircond keeps tripping the MCB \u2014 is it dangerous?",
        a: "Yes. An MCB/RCCB that trips repeatedly is protecting you from a potentially serious electrical fault. Common causes, in order of likelihood: (1) Compressor winding short to earth \u2014 the most serious, may need compressor replacement. (2) Failed capacitor shorting internally. (3) Damaged wiring with exposed conductor touching metal casing or earth. (4) Accumulated moisture in the outdoor unit causing earth leakage (especially after heavy rain). Do NOT keep resetting the breaker \u2014 each trip creates an arc that damages the breaker contacts and increases fire risk. WhatsApp us immediately. We can usually diagnose and fix the same day.",
      },
      {
        q: "Do I have to pay the diagnostic fee even if the repair cannot be done same-day?",
        a: "The RM 138 diagnostic fee covers the technician's time, equipment, and expertise to identify the exact fault. If we find the fault but the part is not on the van (e.g., a specific Daikin PCB for a 2018 model), we: (a) explain exactly what is needed, (b) quote the part + labour, (c) order the part (usually overnight), (d) return to complete the repair. You only pay the diagnostic fee once \u2014 we do not charge it again on the return visit. If you decide not to proceed with the repair after diagnosis, the RM 88 fee stands (it paid for the diagnosis you received). But approximately 85% of our repair jobs are completed same-visit because our vans are well-stocked.",
      },
      {
        q: "My unit makes a loud buzzing/humming noise but the fan does not spin \u2014 what is wrong?",
        a: "This is almost certainly a failed capacitor. The capacitor provides the electrical 'kick' needed to start the fan motor (and sometimes the compressor). When it fails, the motor hums because it is getting power but cannot start turning. Continuing to run the unit with a failed capacitor will burn out the motor within hours \u2014 turning a RM 150 capacitor replacement into a RM 300+ motor replacement. If you hear humming but no spinning, turn the unit OFF at the isolator immediately and WhatsApp us. Capacitor replacement is one of the fastest and most common repairs we do.",
      },
      {
        q: "What warranty do you provide on repairs?",
        a: "3-month warranty on all replaced parts (covers manufacturing defects and premature failure). 1-month warranty on workmanship (covers installation errors, loose connections, etc.). If the same fault recurs within the warranty period, we return at no charge. If the fault is different or unrelated, a new diagnostic applies. All warranty terms are written clearly on your job card.",
      },
      { q: "Can you repair airconds that are over 15 years old?", a: "We can diagnose them, but parts availability for R22-era units is declining. If parts are obsolete, we provide honest advice on whether repair is safer than an R32 upgrade." }
    ],
    faqsBM: [
      {
        q: "Berapa harga pembaikan aircond di KL & Selangor?",
        a: "Yuran diagnostik: RM 88 (dikecualikan jika dibaiki lawatan sama). Penggantian kapasitor: RM 150\u2013250. Motor kipas dalaman: RM 250\u2013380. Motor kipas luaran: RM 300\u2013450. Papan PCB: RM 280\u2013600. Penderia suhu/termistor: RM 150\u2013250. Kontaktor: RM 150\u2013200. Pam longkang: RM 350\u2013550. Kompressor: RM 800\u20132,000 (dikuotakan selepas diagnosis). Semua harga disahkan sebelum sebarang kerja dimulakan.",
      },
      {
        q: "Aircond saya berkelip lampu dan tidak mahu hidup \u2014 apa maksudnya?",
        a: "Lampu berkelip adalah kod ralat diagnostik sendiri unit. Setiap jenama menggunakan corak berbeza: Daikin (kiraan kilat hijau/merah), Panasonic (urutan lampu pemasa), Mitsubishi (corak penunjuk operasi), dll. Kod ralat biasa: litar terbuka/pintas penderia suhu, suhu gegelung terlalu tinggi, ralat komunikasi antara unit dalam dan luar, tekanan bahan pendingin rendah dikesan, arus lebih kompressor, atau kerosakan dalaman PCB. Beritahu kami jenama dan corak kelipan anda dan kami selalunya boleh memberitahu kerosakan yang mungkin sebelum kami tiba.",
      },
      {
        q: "Aircond saya asyik menjatuhkan MCB \u2014 adakah ia berbahaya?",
        a: "Ya. MCB/RCCB yang jatuh berulang kali melindungi anda daripada kerosakan elektrik yang mungkin serius. Punca biasa: (1) Litar pintas belitan kompressor ke bumi \u2014 paling serius. (2) Kapasitor rosak melitar pintas secara dalaman. (3) Pendawaian rosak dengan konduktor terdedah menyentuh selongsong logam. (4) Kelembapan terkumpul dalam unit luar menyebabkan kebocoran bumi. JANGAN set semula pemutus litar berulang kali \u2014 setiap jatuhan menghasilkan arka yang merosakkan sesentuh pemutus. WhatsApp kami segera.",
      },
      {
        q: "Unit saya mengeluarkan bunyi berdengung tetapi kipas tidak berputar \u2014 apa masalahnya?",
        a: "Ini hampir pasti kapasitor yang rosak. Kapasitor memberikan 'tolakan' elektrik untuk memulakan motor kipas. Apabila ia rosak, motor berdengung kerana mendapat kuasa tetapi tidak boleh mula berputar. Terus mengendalikan unit dengan kapasitor rosak akan membakar motor dalam masa beberapa jam \u2014 menukar penggantian kapasitor RM 150 kepada penggantian motor RM 300+. Jika anda mendengar dengungan tetapi tiada putaran, matikan unit di pengasing SEGERA dan WhatsApp kami.",
      },
      {
        q: "Apa jaminan yang anda berikan untuk pembaikan?",
        a: "Jaminan 3 bulan untuk semua bahagian yang diganti (melindungi kecacatan pembuatan dan kegagalan pramatang). Jaminan 1 bulan untuk mutu kerja (melindungi ralat pemasangan, sambungan longgar, dll.). Jika kerosakan sama berulang dalam tempoh jaminan, kami kembali tanpa caj. Semua terma jaminan ditulis dengan jelas pada kad kerja anda.",
      },
      { q: "Bolehkah anda membaiki aircond yang berusia lebih 15 tahun?", a: "Kami boleh mendiagnosisnya, tetapi ketersediaan alat ganti untuk unit era R22 semakin berkurangan. Jika alat ganti sudah tiada, kami akan berikan nasihat jujur sama ada naik taraf ke R32 lebih selamat." },
      { q: "Bolehkah saya menempah pembaikan pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama untuk pembaikan di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik." },
      { q: "Adakah juruteknik anda membawa alat ganti biasa ke van?", a: "Ya — van kami membawa kapasitor, motor kipas, papan PCB, sensor, kontaktors, paip longkang, dan refrigerant untuk kebanyakan pembaikan biasa." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪冷气维修费用是多少？",
        a: "诊断费：RM 88（同次维修则免收）。电容更换：RM 150-250。室内风扇电机：RM 350-480。室外风扇电机：RM 300-450。PCB板：RM 350-600。温度传感器/热敏电阻：RM 150-250。接触器：RM 150-200。排水泵：RM 350-550。压缩机：RM 800-2,000（诊断后报价）。所有价格在开始任何工作前确认。",
      },
      {
        q: "冷气指示灯闪烁无法开机\u2014\u2014什么意思？",
        a: "闪烁灯是机器的自诊断错误代码。每个品牌使用不同的闪烁模式：大金（绿/红灯闪烁次数）、松下（定时器灯闪烁序列）、三菱（运行指示灯闪烁模式）等。常见错误代码：温度传感器开路/短路、盘管温度过高、室内外机通信错误、检测到低制冷剂压力、压缩机过电流或PCB内部故障。告诉我们您的品牌和闪烁模式，我们通常可以在到达前就告诉您可能的故障。",
      },
      {
        q: "冷气总是跳闸\u2014\u2014危险吗？",
        a: "是的。MCB/RCCB反复跳闸是在保护您免受潜在的严重电气故障。常见原因按可能性排序：(1) 压缩机绕组对地短路\u2014\u2014最严重。(2) 电容内部短路损坏。(3) 损坏的电线裸露导体接触金属外壳。(4) 室外机积水导致漏电（尤其是大雨后）。请勿反复重置断路器\u2014\u2014每次跳闸产生电弧会损坏断路器触点并增加火灾风险。立即WhatsApp联系我们。",
      },
      {
        q: "机器发出嗡嗡声但风扇不转\u2014\u2014什么问题？",
        a: "这几乎肯定是电容损坏。电容为风扇电机提供启动所需的\u2018推力\u2019。当它损坏时，电机因供电而嗡嗡响但无法启动旋转。在电容损坏的情况下继续运行机器，会在几小时内烧毁电机\u2014\u2014把RM 150的电容更换变成RM 300+的电机更换。如果听到嗡嗡声但没有转动，立即在隔离开关处关闭机器并WhatsApp联系我们。",
      },
      { q: "你们能维修超过15年的老冷气吗？", a: "我们可以进行诊断，但R22时代机器的零件供应正在减少。如果零件已停产，我们会诚实建议升级至R32机型是否更明智。" },
      { q: "能否当天预约维修？", a: "可以 — KL Renovator 经常有当天预约名额用于维修服务。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" },
      { q: "技师上门时会带常用备件吗？", a: "会 — 我们的车辆携带电容器、风扇马达、PCB板、传感器、接触器、排水管和制冷剂，可现场完成大多数常见维修。" }
    ],
    priceTable: [
      { label: "Diagnostic Fee (waived with repair)", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 150 – 250" },
      { label: "Fan Motor Replacement", price: "RM 350 – 480" },
      { label: "PCB Board Replacement", price: "RM 350 – 600" },
      { label: "Gas Leak Repair", price: "RM 120 / leak" },
      { label: "Temperature Sensor Replacement", price: "RM 150 – 250" },
      { label: "Contactor Replacement", price: "RM 150 – 200" },
      { label: "Drain Pump Replacement", price: "RM 350 – 550" },
      { label: "Compressor Replacement", price: "RM 800 – 2,000" },
    ],
  },

  // ── 5. NEW UNIT INSTALLATION ─────────────────────────────────────────────
  "installation": {
    slug: "installation",
    title: "New Unit Installation",
    tagline: "Professional aircond installation for all brands — clean cable routing, correct pipe sizing, and full vacuum commissioning. Same-day available.",
    description:
      "A poorly installed aircond can lose 20–30% of its efficiency before it even runs its first hour. Incorrect copper pipe sizing, skipped vacuum evacuation, loose flare connections, or sloppy cable routing will cause gas leaks, premature compressor failure, and electricity bills higher than they should be. KL Renovator installs wall-mounted, ceiling cassette, and window units for homes, condos, shoplots, and offices across KL and Selangor — and we bring genuine HVAC training to every job. Every installation includes the first 7ft of correctly sized copper pipe, insulation, electrical wiring, and drainage pipe, plus full vacuum pump evacuation, vacuum pump commissioning (500 microns), and a commissioning run. Outdoor brackets are paid special-charge items when required and are confirmed before work begins that verifies cooling output, airflow, and thermostat calibration. RM 199 for a standard wall-mounted 1.0–1.5 HP unit — price confirmed before we drill a single hole.",
    startPrice: "RM 199",
    heroImage: "/hero/aircond-bracket-installation-kl-renovator.webp",
    ogImage: "/hero/aircond-bracket-installation-kl-renovator.webp",
    aioSummary: "Professional installation for wall-mounted and ceiling units using vacuum commissioning protocols. Starting Price: RM 199. Includes: 7ft copper pipe, wiring. Warranty: 1-month workmanship checklist provided.",
    aioSummaryMS: "Pemasangan profesional unit dinding dan siling menggunakan protokol komisen vakum. Harga: RM 199. Termasuk: 7 kaki paip kuprum, pendawaian. Waranti: Senarai semak kerjatangan 1 bulan disediakan.",
    aioSummaryZH: "采用抽真空调试标准的专业冷气安装服务。起步价：RM 199。包含：7尺铜管、电线及排水管。保修：提供1个月工艺保修清单。",
    highlights: [
      "Expert installation for wall-mounted, ceiling cassette, and window units",
      "Correct-gauge copper piping (7ft included) — no thin-walled 'universal' pipes",
      "Mandatory vacuum pump commissioning — removes air & moisture from the circuit",
      "Vacuum pump commissioning (500 microns) completed before commissioning",
      "Clean, professional cable trunking and aesthetic indoor unit mounting",
      "Proper condensate drainage fall-gradient to prevent internal water leaks",
      "Condo management & JMB coordination — we follow all site access rules",
      "Full 1-month workmanship warranty with written commissioning checklist",
    ],
    process: [
      { step: "Pre-Installation Survey", desc: "Technician checks wall strength, electrical supply capacity, drainage fall, and outdoor condenser placement. Measurements confirmed before any drilling. Condo rules checked — we coordinate with management if needed." },
      { step: "Bracket, Pipe & Cable Run", desc: "Wall bracket levelled and anchored. Copper pipes cut to exact length, flared, insulated, and routed neatly through wall penetration. Drainage pipe set with correct downward gradient so water flows naturally." },
      { step: "Outdoor Unit & Electrical", desc: "Condenser unit mounted on bracket with rubber vibration pads. Electrical isolator switch installed near outdoor unit (required by Malaysian regulations). Wiring routed through dedicated conduit, not shared with other circuits." },
      { step: "Vacuum, Leak Test & Commission", desc: "System evacuated with vacuum pump for minimum 15–20 minutes to remove all moisture and air. Vacuum pump commissioning (500 microns) is completed before commissioning. Refrigerant released, cooling tested across all fan speeds, thermostat calibrated, and job card signed." },
    ],
    faqs: [
      {
        q: "How much does aircond installation cost in KL & Selangor?",
        a: "Wall-mounted 1.0–1.5 HP installation starts from RM 199 (includes 7ft copper pipe, insulation, electrical wire and drainage). 2.0 HP from RM 249, 2.5 HP from RM 279. Ceiling cassette from RM 290. Window unit from RM 199. Additional copper pipe above 7ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP). Electrical wire above 7ft: RM 9/ft. These are the prices you pay — confirmed before we start.",
      },
      {
        q: "How long does a professional installation take?",
        a: "A standard wall-mounted unit takes 2–3 hours from arrival to handover. Ceiling cassette takes 3–4 hours because it involves ceiling grid work. Two units installed back-to-back on the same day: approximately 5–6 hours total. We never rush a job — proper vacuum evacuation alone needs 15–20 minutes.",
      },
      {
        q: "Do you supply the aircond unit or just install?",
        a: "KL Renovator provides professional installation. You purchase the unit from your preferred retailer (Harvey Norman, Senheng, AEON, Lazada, Shopee, etc.) and we handle everything else. If you need guidance on which brand and HP rating suits your room size, WhatsApp us before buying — our technicians can advise based on actual Malaysian room conditions, not just showroom specs.",
      },
      {
        q: "What exactly is included in the RM 199 installation?",
        a: "The RM 199 standard wall-mounted package includes: (1) Site survey and wall assessment, (2) 7ft copper pipe correctly sized to your unit's HP with proper insulation, (3) Electrical wiring from isolator to indoor unit through dedicated conduit, (4) PVC drainage pipe with proper fall gradient, (5) Wall bracket with rubber vibration pads, (6) Vacuum pump evacuation (minimum 15 min), (7) Vacuum pump commissioning (500 microns), (8) Full commissioning — cooling, airflow, thermostat calibration, (9) Written job card and 1-month workmanship warranty. Extra copper pipe beyond 7ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP). Extra electrical wire beyond 7ft: RM 9/ft.",
      },
      {
        q: "Can you install any aircond brand?",
        a: "Yes — we install all 20 major brands sold in Malaysia: Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, and Isonic. Inverter and non-inverter, R32 and R410A refrigerant types. We match the pipe diameter and installation spec to the manufacturer's requirements, not a one-size-fits-all approach.",
      },
      {
        q: "My condo management has strict renovation rules — can you comply?",
        a: "We install in high-rise condos across KL and Selangor every week — KLCC, Mont Kiara, Bangsar, Damansara, Sentul, and more. We follow each building's specific rules: working hours, protective floor covering in lifts and corridors, noise limits, and waste disposal procedures. If management requires a renovation permit or indemnity form, let us know in advance and we will prepare the documents. Common areas must be left exactly as found.",
      },
      {
        q: "What happens if my unit leaks gas or stops working after installation?",
        a: "All installations carry a 1-month workmanship warranty. If the unit leaks refrigerant, stops cooling, or has water drainage issues within that period and the fault is due to our installation work, we return to fix it at no charge. Most installation problems show up within the first week if something was missed — but our vacuum + pressure test process catches 99% of issues before we leave.",
      },
      { q: "Do you provide a warranty for AC installation?", a: "Yes. We provide a 1-month workmanship warranty. This covers the structural integrity of the mounting, pipe flares, and condensate drainage efficiency." }
    ],
    faqsBM: [
      {
        q: "Berapa harga pemasangan aircond di KL & Selangor?",
        a: "Pemasangan dinding 1.0–1.5 HP bermula dari RM 199 (termasuk 7 kaki paip kuprum, penebat, wayar elektrik dan paip longkang). 2.0 HP dari RM 249, 2.5 HP dari RM 279. Ceiling cassette dari RM 290. Unit tingkap dari RM 199. Paip kuprum tambahan melebihi 7 kaki: RM 17/kaki (1.0–1.5 HP), RM 23/kaki (2.0–2.5 HP), RM 27/kaki (3.0–3.5 HP). Wayar elektrik tambahan melebihi 7 kaki: RM 9/kaki. Ini harga yang anda bayar — disahkan sebelum kami mula.",
      },
      {
        q: "Berapa lama masa pemasangan profesional?",
        a: "Unit dinding standard mengambil 2–3 jam dari ketibaan hingga penyerahan. Ceiling cassette mengambil 3–4 jam kerana melibatkan kerja grid siling. Dua unit dipasang berturut-turut pada hari yang sama: kira-kira 5–6 jam keseluruhan. Kami tidak pernah tergesa-gesa — evakuasi vakum yang betul sahaja memerlukan 15–20 minit.",
      },
      {
        q: "Adakah anda membekalkan unit aircond atau hanya memasang?",
        a: "KL Renovator menyediakan perkhidmatan pemasangan profesional. Anda membeli unit dari peruncit pilihan anda (Harvey Norman, Senheng, AEON, Lazada, Shopee, dll.) dan kami mengendalikan segala-galanya. Jika anda perlukan panduan tentang jenama dan HP yang sesuai untuk saiz bilik anda, WhatsApp kami sebelum membeli — juruteknik kami boleh menasihatkan berdasarkan keadaan bilik sebenar di Malaysia, bukan hanya spesifikasi bilik pameran.",
      },
      {
        q: "Apa sebenarnya yang termasuk dalam pemasangan RM 199?",
        a: "Pakej standard dinding RM 199 merangkumi: (1) Tinjauan tapak dan penilaian dinding, (2) 7 kaki paip kuprum bersaiz betul mengikut HP unit anda dengan penebat yang betul, (3) Pendawaian elektrik dari pengasing ke unit dalaman melalui konduit khusus, (4) Paip longkang PVC dengan kecerunan jatuh yang betul, (5) Braket dinding dengan pad getah getaran, (6) Evakuasi pam vakum (minimum 15 min), (7) Pentauliahan pam vakum (500 mikron), (8) Pentauliahan penuh — penyejukan, aliran udara, penentukuran termostat, (9) Kad kerja bertulis dan waranti mutu kerja 1 bulan. Paip kuprum tambahan melebihi 7 kaki: RM 17/kaki (1.0–1.5 HP), RM 23/kaki (2.0–2.5 HP), RM 27/kaki (3.0–3.5 HP). Wayar elektrik tambahan melebihi 7 kaki: RM 9/kaki.",
      },
      {
        q: "Bolehkah anda memasang semua jenama aircond?",
        a: "Ya — kami memasang semua 20 jenama utama yang dijual di Malaysia: Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, dan Isonic. Jenis inverter dan bukan inverter, bahan pendingin R32 dan R410A. Kami memadankan diameter paip dan spesifikasi pemasangan mengikut keperluan pengeluar, bukan pendekatan satu saiz untuk semua.",
      },
      {
        q: "Pihak pengurusan kondo saya ada peraturan renovasi yang ketat — bolehkah anda mematuhinya?",
        a: "Kami memasang di kondo tinggi di seluruh KL dan Selangor setiap minggu — KLCC, Mont Kiara, Bangsar, Damansara, Sentul, dan banyak lagi. Kami mematuhi peraturan khusus setiap bangunan: waktu bekerja, penutup lantai pelindung di lif dan koridor, had bunyi, dan prosedur pelupusan sisa. Jika pihak pengurusan memerlukan permit renovasi atau borang indemniti, beritahu kami lebih awal dan kami akan sediakan dokumen yang diperlukan. Kawasan umum mesti ditinggalkan seperti keadaan asal.",
      },
      { q: "Adakah anda menyediakan waranti untuk pemasangan aircond?", a: "Ya. Kami menyediakan waranti kerja selama 1 bulan. Ini meliputi integriti struktur pemasangan, flare paip, dan kecekapan saliran air." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪安装冷气费用是多少？",
        a: "挂壁式1.0–1.5 HP安装从RM 199起（含7尺铜管、电线、排水管和支架）。2.0 HP从RM 249起，2.5 HP从RM 279起。天花板卡式机从RM 290起。窗式机从RM 199起。超出7尺的额外铜管：RM 17/尺（1.0–1.5 HP），RM 23/尺（2.0–2.5 HP），RM 27/尺（3.0–3.5 HP）。超出7尺的额外电线：RM 9/尺。这是您支付的价格——开工前确认。",
      },
      {
        q: "专业安装需要多长时间？",
        a: "标准挂壁式机器从到达到交付需要2–3小时。天花板卡式机需要3–4小时，因为涉及天花板格栅工作。同一天连续安装两台机器：总共约5–6小时。我们从不赶工——仅正确的真空调试就需要15–20分钟。",
      },
      {
        q: "你们提供冷气机器还是只安装？",
        a: "KL Renovator提供专业安装服务。您从您喜欢的零售商（Harvey Norman、Senheng、AEON、Lazada、Shopee等）购买机器，我们处理其他一切。如果您需要关于哪个品牌和HP适合您房间大小的指导，请在购买前WhatsApp我们——我们的技术员可以根据马来西亚实际房间条件提供建议，而不仅仅是展厅规格。",
      },
      {
        q: "RM 199安装套餐具体包含什么？",
        a: "RM 199标准挂壁式套餐包括：（1）现场勘查和墙体评估，（2）7尺铜管按您机器的HP正确配管并带正确隔热，（3）从隔离开关到室内机通过专用线管的电线，（4）带正确下坡度的PVC排水管，（5）带橡胶减震垫的墙壁支架，（6）真空泵抽真空（最少15分钟），（7）氮气压力泄漏测试，（8）全面调试——制冷、风量、温控器校准，（9）书面工作卡和1个月工艺保修。超出7尺的额外铜管：RM 17/尺（1.0–1.5 HP），RM 23/尺（2.0–2.5 HP），RM 27/尺（3.0–3.5 HP）。超出7尺的额外电线：RM 9/尺。",
      },
      {
        q: "可以安装所有冷气品牌吗？",
        a: "可以——我们安装马来西亚销售的所有20个主要品牌：大金、松下、三菱、Acson、York、Carrier、美的、海尔、东芝、日立、三星、LG、夏普、富士通、格力、National、海信、Aux、TCL和Isonic。变频和非变频，R32和R410A制冷剂类型。我们根据制造商要求匹配管道直径和安装规格，而非一刀切的做法。",
      },
      {
        q: "我的公寓管理处有严格的装修规定——你们能遵守吗？",
        a: "我们每周在吉隆坡和雪兰莪的高层公寓安装——KLCC、Mont Kiara、Bangsar、Damansara、Sentul等等。我们遵守每栋大楼的具体规定：工作时间、电梯和走廊的保护地板覆盖、噪音限制和废物处理程序。如果管理处需要装修许可或赔偿表格，请提前告知我们，我们会准备所需文件。公共区域必须保持原样。",
      },
      { q: "安装冷气有保修吗？", a: "有的。我们提供1个月工艺保修，涵盖安装稳固性、管道扩口密封性以及排水效率。" }
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "Wall-Mounted · 2.0 HP", price: "RM 249" },
      { label: "Wall-Mounted · 2.5 HP", price: "RM 279" },
      { label: "Wall-Mounted · 3.0 HP", price: "RM 329" },
      { label: "Wall-Mounted · 4.0 HP", price: "RM 399" },
      { label: "Wall-Mounted · 5.0 HP", price: "RM 449" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "Window Unit · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "Window Unit · 2.0 – 2.5 HP", price: "RM 249" },
    ],
    priceTableNote: "Standard installation includes 7ft copper pipe, insulation, electrical wire, and drain pipe free. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 6. BASIC SERVICING ───────────────────────────────────────────────────
  "basic-servicing": {
    slug: "basic-servicing",
    title: "Basic Servicing",
    tagline: "Essential routine aircond maintenance — filter clean, drain flush, and full diagnostic check. RM 99, 45 mins, keeps your unit healthy between deep cleans.",
    description:
      "Basic servicing is what keeps your aircond running smoothly between chemical washes — like changing your car's engine oil, not rebuilding the engine. In about 45 minutes per unit, our technician removes and washes the filters, flushes the drain pipe to prevent water leaks before they start, sprays the evaporator coil with a mild anti-bacterial cleaner, checks every electrical connection and contactor for tightness and burning, measures the actual cooling output temperature, and confirms the thermostat is calibrated correctly. For units running 8+ hours a day in Malaysian heat and humidity, we recommend this every 3–4 months. For moderate users, every 6 months is enough. It is affordable preventive maintenance that catches small problems — loose wiring, early drain clogs, refrigerant pressure trending low — before they become expensive repairs. RM 99 for a wall-mounted 1.0–1.5 HP unit, price confirmed before we start.",
    startPrice: "RM 99",
    heroImage: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
    ogImage: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
    aioSummary: "Essential 8-point routine maintenance check. Price: RM 99 per unit. Service Time: 45 mins. Includes: Filter sanitization, drain flush, and electrical safety audit. Recommended every 3-6 months to maintain energy efficiency.",
    aioSummaryMS: "Pemeriksaan penyelenggaraan rutin 8-titik yang penting. Harga: RM 99 seunit. Tempoh: 45 minit. Termasuk: Sanitasi penapis, bilas longkang, dan audit keselamatan elektrik. Disyorkan setiap 3-6 bulan.",
    aioSummaryZH: "核心8项例行保养检查。价格：每台 RM 99。服务时长：45分钟。包含：滤网消毒、排水管冲洗及电气安全审计。建议每3-6个月进行一次以保持节能。",
    highlights: [
      "Comprehensive 8-point system inspection and hygiene maintenance",
      "Filter extraction, multi-stage wash, and anti-bacterial treatment",
      "Internal housing and louvre wipe-down — removes surface dust and allergens",
      "High-pressure drainage line flush — stops leaks before they start",
      "Electrical terminal check — ensuring all contactors & connections are tight",
      "Supply air temperature measurement — verifying the 'Delta-T' cooling baseline",
      "Fan motor noise audit — identifying early bearing wear or imbalances",
      "The perfect quarterly maintenance for high-use residential & rental units",
    ],
    process: [
      { step: "Dismantle & Clean", desc: "Front panel opened. Filters removed, washed with water, and left to dry. Casing, louvres, and accessible surfaces wiped down with anti-bacterial solution." },
      { step: "Drain & Coil Service", desc: "Drain pipe flushed with pressurised water to clear early sludge build-up before it becomes a blockage. Evaporator coil sprayed with mild cleaner to loosen surface dust and light mould." },
      { step: "Electrical Safety Check", desc: "All wiring connections, contactors, and capacitor terminals examined for tightness, corrosion, or burn marks. Loose connections are tightened. Any concerning signs are noted and shown to you." },
      { step: "Cooling Performance Test", desc: "Unit run for 10–15 minutes. Supply air temperature measured at the outlet and compared against room return air. Healthy temperature drop: 8–12°C. Results recorded on your job card. Thermostat on/off cycle verified." },
    ],
    faqs: [
      {
        q: "How much does basic aircond servicing cost in KL & Selangor?",
        a: "Wall-mounted 1.0–1.5 HP: RM 99. Wall-mounted 2.0–2.5 HP: RM 120. Wall-mounted 3.0–3.5 HP: RM 150. Ceiling cassette: RM 150–250 depending on HP. Window unit: RM 99–120. Every price is confirmed with you before the technician begins work. Multi-unit discounts: 5% OFF Instant Booking Discount for 5+ units, 10% OFF Instant Booking Discount for 10+ units on the same visit.",
      },
      {
        q: "How often should I service my aircond?",
        a: "Three tiers based on real Malaysian usage: (1) Heavy use — 8+ hours daily, home office, ground floor near road → every 3–4 months basic + annual chemical wash. (2) Normal use — 4–6 hours daily, bedroom only, mid-floor condo → every 6 months basic + annual chemical wash. (3) Light use — occasional, guest room, holiday home → every 12 months (can combine with chemical wash). If you are unsure, WhatsApp us your usage pattern and we will recommend honestly.",
      },
      {
        q: "What is the difference between basic servicing and chemical wash?",
        a: "Basic servicing is a surface-level maintenance routine: filter wash, drain flush, mild coil spray, electrical check, cooling test. Chemical wash goes deeper: a high-pressure chemical spray dissolves mould, bacteria and dirt embedded inside the coil fins and around the blower wheel — areas basic servicing physically cannot reach without dismantling the unit. Think: basic = brushing your teeth, chemical wash = scaling at the dentist.",
      },
      {
        q: "My aircond still smells or blows weak air after basic servicing — why?",
        a: "If the smell or weak airflow persists after basic servicing, the issue is deeper than surface-level cleaning can fix. Mould and biofilm have likely colonised the blower wheel and the inner coil layers. At this point, you need a pressure chemical wash (RM 120) or, for units that have not been deep-cleaned in 3+ years or are already leaking water, a full chemical overhaul (RM 220). WhatsApp us after your basic service if the problem returns — we will advise whether the unit needs the next level of cleaning and we will not charge you for advice.",
      },
      {
        q: "Does basic servicing include gas top-up?",
        a: "No — basic servicing is a cleaning and inspection service. If our technician's cooling test shows the refrigerant pressure is low (temperature drop less than 8°C after cleaning), they will inform you and quote a gas top-up separately (from RM 2.50 / PSI). Aircond systems do not consume refrigerant — if the gas is low, there is a leak somewhere. We will check for obvious leak points (flare connections, service valves) and advise whether a top-up is enough or a leak repair is needed.",
      },
      {
        q: "Can I do basic servicing myself?",
        a: "You can wash the filters yourself every month — pop them out, rinse with water, let them dry, reinstall. That takes 5 minutes and genuinely helps airflow between professional services. But the drain flush, electrical check, coil spray, and cooling performance test require opening the unit, accessing internal components, and using a digital thermometer and multimeter. These steps catch problems you cannot see from the outside. At RM 99, professional basic servicing is cheaper than a water-damaged ceiling or a burnt compressor.",
      },
      { q: "What happens if you find a fault during a basic service?", a: "If our 8-point check reveals a faulty capacitor or sensor, we inform you immediately and provide a firm quote. Most repairs can be completed instantly during the same visit." }
    ],
    faqsBM: [
      {
        q: "Berapa harga servis asas aircond di KL & Selangor?",
        a: "Dinding 1.0–1.5 HP: RM 99. Dinding 2.0–2.5 HP: RM 120. Dinding 3.0–3.5 HP: RM 150. Ceiling cassette: RM 150–250 bergantung pada HP. Unit tingkap: RM 99–120. Setiap harga disahkan dengan anda sebelum juruteknik memulakan kerja. Diskaun pelbagai unit: Diskaun Tempahan Segera 5% untuk 5+ unit, Diskaun Tempahan Segera 10% untuk 10+ unit pada lawatan yang sama.",
      },
      {
        q: "Berapa kerap saya perlu servis aircond?",
        a: "Tiga peringkat berdasarkan penggunaan sebenar di Malaysia: (1) Penggunaan berat — 8+ jam sehari, pejabat rumah, tingkat bawah berhampiran jalan → setiap 3–4 bulan servis asas + cuci kimia tahunan. (2) Penggunaan biasa — 4–6 jam sehari, bilik tidur sahaja, kondo tingkat pertengahan → setiap 6 bulan servis asas + cuci kimia tahunan. (3) Penggunaan ringan — sekali-sekala, bilik tetamu, rumah percutian → setiap 12 bulan (boleh digabungkan dengan cuci kimia). Jika tidak pasti, WhatsApp kami corak penggunaan anda dan kami akan menasihatkan dengan jujur.",
      },
      {
        q: "Apa perbezaan antara servis asas dan cuci kimia?",
        a: "Servis asas adalah rutin penyelenggaraan peringkat permukaan: cuci penapis, bilas longkang, semburan gegelung ringan, pemeriksaan elektrik, ujian penyejukan. Cuci kimia pergi lebih dalam: semburan kimia tekanan tinggi melarutkan kulat, bakteria dan kotoran yang tertanam di dalam sirip gegelung dan sekitar roda kipas — kawasan yang tidak boleh dicapai oleh servis asas secara fizikal tanpa membuka unit. Ibarat: servis asas = memberus gigi, cuci kimia = scaling di doktor gigi.",
      },
      {
        q: "Aircond saya masih berbau atau angin lemah selepas servis asas — kenapa?",
        a: "Jika bau atau aliran udara lemah berterusan selepas servis asas, masalahnya lebih dalam daripada yang boleh dibaiki oleh pembersihan permukaan. Kulat dan biofilm berkemungkinan telah menjajah roda kipas dan lapisan dalam gegelung. Pada tahap ini, anda memerlukan cuci kimia tekanan (RM 120) atau, untuk unit yang tidak pernah dibersihkan secara mendalam selama 3+ tahun atau sudah bocor air, overhaul kimia penuh (RM 220). WhatsApp kami selepas servis asas anda jika masalah berulang — kami akan menasihatkan sama ada unit memerlukan tahap pembersihan seterusnya dan kami tidak akan mengenakan caj untuk nasihat.",
      },
      {
        q: "Adakah servis asas termasuk tambah gas?",
        a: "Tidak — servis asas adalah perkhidmatan pembersihan dan pemeriksaan. Jika ujian penyejukan juruteknik kami menunjukkan tekanan bahan pendingin rendah (penurunan suhu kurang daripada 8°C selepas pembersihan), mereka akan memaklumkan anda dan mengkuotakan tambah gas secara berasingan (dari RM 2.50 / PSI). Sistem aircond tidak menggunakan bahan pendingin — jika gas rendah, ada kebocoran di suatu tempat. Kami akan memeriksa titik kebocoran yang jelas (sambungan flare, injap servis) dan menasihatkan sama ada tambah gas sahaja mencukupi atau pembaikan kebocoran diperlukan.",
      },
      { q: "Apa yang berlaku jika anda menemui kerosakan semasa servis asas?", a: "Jika pemeriksaan 8-titik kami menemui kapasitor atau sensor yang rosak, kami akan maklumkan segera dan berikan sebut harga tetap. Kebanyakan pembaikan boleh diselesaikan terus pada lawatan yang sama." },
      { q: "Bolehkah saya menempah servis asas pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama untuk servis asas di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪基本冷气保养费用是多少？",
        a: "挂壁式1.0–1.5 HP：RM 99。挂壁式2.0–2.5 HP：RM 120。挂壁式3.0–3.5 HP：RM 150。天花板卡式：RM 150–250视HP而定。窗式：RM 99–120。每项价格在技术员开始工作前与您确认。多台折扣：5+台享5%即时预订折扣（5% OFF Instant Booking Discount），10台以上享10%即时预订折扣（10% OFF Instant Booking Discount），同次上门。",
      },
      {
        q: "冷气应该多久保养一次？",
        a: "根据马来西亚实际使用情况分三个层级：（1）重度使用——每天8小时以上，家庭办公室，靠近马路的底层→每3-4个月基本保养+每年化学清洗。（2）正常使用——每天4-6小时，仅卧室，中层公寓→每6个月基本保养+每年化学清洗。（3）轻度使用——偶尔使用，客房，度假屋→每12个月（可与化学清洗合并）。如果不确定，WhatsApp我们您的使用模式，我们会诚实建议。",
      },
      {
        q: "基本保养和化学清洗有什么区别？",
        a: "基本保养是表面级别的保养流程：清洗过滤网、冲洗排水管、轻度盘管喷雾、电气检查、制冷测试。化学清洗更深入：高压化学喷雾溶解嵌入盘管翅片和风轮周围的霉菌、细菌和污垢——这些是基本保养在不拆卸机器的情况下物理上无法触及的区域。打个比方：基本保养=刷牙，化学清洗=牙医洗牙。",
      },
      {
        q: "基本保养后冷气仍有异味或风量弱——为什么？",
        a: "如果基本保养后异味或弱风量持续存在，问题比表面清洁能解决的更深。霉菌和生物膜可能已经在风轮和盘管内层滋生。此时您需要进行压力化学清洗（RM 120），或者对于3年以上未深度清洁或已漏水的机器，需要进行全面化学大修（RM 220）。基本保养后如果问题再次出现，请WhatsApp我们——我们会建议机器是否需要下一级别的清洁，且不收取咨询费。",
      },
      {
        q: "基本保养包含加气吗？",
        a: "不包含——基本保养是清洁和检查服务。如果我们技术员的制冷测试显示冷媒压力低（清洁后温差低于8°C），他们会通知您并单独报价加气服务（从RM 2.50 / PSI起）。冷气系统不会消耗制冷剂——如果气体不足，说明某处有泄漏。我们会检查明显的泄漏点（喇叭口接头、检修阀）并建议仅加气是否足够还是需要修复泄漏。",
      },
      { q: "如果在基本保养期间发现故障怎么办？", a: "如果我们的8项检查发现电容或传感器故障，我们会立即通知您并提供确定报价。大多数维修可以在同一次上门中当场完成。" },
      { q: "能否当天预约基本保养？", a: "可以 — KL Renovator 经常有当天预约名额用于基本保养。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" }
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Wall-Mounted · 3.0 – 3.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Window Unit · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Window Unit · 2.0 – 2.5 HP", price: "RM 120" },
    ],
  },

  // ── 7. CEILING CASSETTE SERVICE ──────────────────────────────────────────
  "ceiling-cassette": {
    slug: "ceiling-cassette",
    title: "Ceiling Cassette Service",
    tagline: "Specialist service for commercial ceiling cassette units — offices, shops & restaurants. Chemical wash and repair. Off-hours scheduling in KL.",
    description:
      "Ceiling cassettes are the workhorses of Malaysian commercial spaces: the 4-way unit recessed into the ceiling grid of your office, retail shop, restaurant, clinic, or salon. They are more complex than wall-mounted units \u2014 the blower is larger, the drain pan is integrated into the ceiling panel, and a clogged drain does not drip onto the floor (where you see it) but into the ceiling void (where it silently damages your gypsum board for weeks before you notice the stain). KL Renovator specialises in ceiling cassette servicing for commercial premises across the Klang Valley. Our technicians are trained to safely access ceiling-mounted units, remove the heavy cassette panel, chemically clean the blower and coil, deep-clean the drain pan (the #1 source of hidden ceiling leaks), and test everything before closing. We also handle multi-unit commercial sites \u2014 restaurants with 3\u20134 cassettes, offices with 6\u201310, retail floors with mixed cassette and wall-mounted units. Coordinated scheduling, off-hours (evening/weekend) availability, and volume discounts for regular commercial contracts. Pricing is confirmed according to the selected service and unit configuration.",
    startPrice: "RM 150",
    heroImage: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    ogImage: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    aioSummary: "Specialist service for commercial 4-way ceiling cassette units. Starting Price: RM 150. Focus: Condensate pump verification and 4-way throw balancing. Available for offices, retail, and F&B premises across Klang Valley.",
    aioSummaryMS: "Servis pakar untuk unit ceiling cassette komersial 4-hala. Harga: RM 150. Fokus: Pengesahan pam kondensat dan imbangan tiupan 4-hala. Tersedia untuk pejabat dan kedai di seluruh Lembah Klang.",
    aioSummaryZH: "商用四向天花板卡式机专业服务。起步价：RM 150。重点：冷凝泵校验及四向出风平衡。适用于巴生谷各地的办公室、零售及餐饮场所。",
    highlights: [
      "Specialized commercial HVAC team for high-capacity ceiling-mounted systems",
      "Mandatory deep-clean of the integrated drain pan and condensate pump",
      "Chemical treatment of the centrifugal blower wheel for maximum air throw",
      "4-Way directional louvre calibration to eliminate 'hot spots' in your office",
      "Safe, scaffold-assisted access for high-ceiling retail & warehouse units",
      "Night & Weekend scheduling available to avoid business hour disruption",
      "Volume-based pricing for multi-unit corporate maintenance contracts",
      "Expertise across Daikin commercial multi-split, Mitsubishi Electric, and York commercial lines",
    ],
    process: [
      { step: "Safe Ceiling Access", desc: "Technician sets up ladder or scaffold with stabiliser. Drop sheets cover floor, furniture, and workstations below. Ceiling cassette panel carefully unclipped and lowered \u2014 these panels are heavy (10\u201315 kg) and require proper handling to avoid damaging the ceiling grid." },
      { step: "Filter, Coil & Blower Service", desc: "Filters removed, washed, and dried. Coil inspected for dirt build-up pattern (indicates airflow issues). Chemical solution applied to coil and centrifugal blower wheel. Blower wheel removed from motor shaft for thorough cleaning if doing chemical wash or overhaul." },
      { step: "Drain Pan & Path Inspection", desc: "Drain pan inspected under bright light for sludge, biofilm, and hairline cracks. Drain outlet cleared with pressurised flush. Drain path water-tested \u2014 pour water into pan and verify it flows freely to the drain point. This step prevents the hidden ceiling leaks that cause gypsum board damage." },
      { step: "Reassemble, Test & Clean", desc: "Components reassembled. Unit run for 15\u201320 minutes through full cycle. Cooling output, thermostat calibration, and drain function verified. Cassette panel clipped back into ceiling grid. Work area vacuumed. Job card signed with readings and notes." },
    ],
    faqs: [
      {
        q: "How much does ceiling cassette servicing cost in KL & Selangor?",
        a: "Basic service: RM 150 (1.0\u20131.5 HP), RM 200 (2.0\u20133.0 HP), RM 250 (3.5\u20135.0 HP). Chemical wash: RM 220 (1.0\u20131.5 HP), RM 280 (2.0\u20133.0 HP), RM 350 (4.0\u20135.0 HP). Chemical overhaul pricing is available for wall-mounted units only and is confirmed by HP. Installation: RM 290 (1.0\u20131.5 HP), RM 350 (2.0\u20133.0 HP), RM 400 (3.5\u20136.0 HP). Multi-unit discounts available for commercial premises \u2014 WhatsApp us your unit count for a custom quote.",
      },
      {
        q: "My ceiling cassette is dripping water \u2014 what should I do immediately?",
        a: "Turn the unit OFF at the thermostat or isolator immediately. Place a bucket or container under the drip point. If water is pooling on the ceiling board, poke a small hole at the lowest point of the bulge to let water drain in a controlled way (this prevents a larger ceiling collapse). Then WhatsApp us. The most common cause is a blocked drain pipe or dirty drain pan \u2014 both are fixable same-day. Continuing to run the unit while it leaks will soak the gypsum ceiling board, leading to sagging, staining, and eventual replacement (RM 500\u20131,500 depending on size).",
      },
      {
        q: "How often should a commercial ceiling cassette be serviced?",
        a: "Standard office: every 4\u20136 months basic + annual chemical wash. Retail/shop: every 3\u20134 months basic + annual chemical wash (higher foot traffic = more dust). F&B/restaurant/kitchen-adjacent: every 3 months minimum (grease and flour dust clog coils 2\u20133x faster). Medical clinic/pharmacy: every 3\u20134 months (hygiene-critical environment). If your unit runs 10+ hours daily (common in retail), basic service every 3 months is recommended to maintain cooling efficiency and prevent mid-shift breakdowns that cost you sales.",
      },
      {
        q: "Can you service multiple ceiling cassette units across our entire premises in one visit?",
        a: "Yes \u2014 this is what we do regularly for commercial clients. We can schedule 2\u20133 technicians on the same day for larger sites (restaurants with 4\u20136 units, offices with 8\u201312 units, retail floors). All units serviced, drain paths tested, and cooling verified before we leave. Volume discounts: 5% OFF Instant Booking Discount for 4\u201310 units, 10% OFF Instant Booking Discount for 10+ units on the same visit. Custom annual maintenance contracts (AMC) also available for quarterly or biannual scheduled servicing \u2014 WhatsApp us for a site-specific proposal.",
      },
      {
        q: "Can you service our ceiling cassette units after business hours?",
        a: "Yes \u2014 off-hours servicing (evenings from 6pm\u201310pm, weekends, and public holidays) is available for commercial clients. We understand that a restaurant cannot have technicians working above diners during lunch service, and a retail store cannot close during peak hours for AC maintenance. There is a modest surcharge for off-hours work (RM 50 for evening, varies for weekend/holiday). WhatsApp us with your preferred schedule and we will make it work.",
      },
      {
        q: "What is the difference between servicing a wall-mounted and a ceiling cassette unit?",
        a: "Ceiling cassettes are significantly more complex: (1) The unit is recessed into the ceiling \u2014 access requires a ladder/scaffold and careful panel handling (10\u201315 kg). (2) The blower is a large centrifugal fan, not a small cross-flow fan \u2014 dirt accumulates on the back of the blades where you cannot see it. (3) The drain pan surrounds the entire unit and includes a built-in condensate pump on many models \u2014 if the pump fails, water overflows inside the ceiling. (4) The ceiling void itself can be a source of contaminants (insulation fibres, pest droppings, construction dust) that enter the unit from above. This is why we recommend specialist ceiling cassette technicians, not general aircond servicers who only do wall-mounted units.",
      },
      { q: "Why is my office ceiling cassette leaking into the ceiling board?", a: "This is often a failure of the internal condensate lift pump or a sludged-up internal drain pan. We perform a 'Flow Test' during service to ensure the pump is working at full capacity." }
    ],
    faqsBM: [
      {
        q: "Berapa harga servis ceiling cassette di KL & Selangor?",
        a: "Servis asas: RM 150 (1.0–1.5 HP), RM 200 (2.0–3.0 HP), RM 250 (3.5–5.0 HP). Cuci kimia: RM 220 (1.0–1.5 HP), RM 280 (2.0–3.0 HP), RM 350 (4.0–5.0 HP). Harga overhaul kimia hanya tersedia untuk unit dinding dan disahkan oleh HP. Pemasangan: RM 290 (1.0–1.5 HP), RM 350 (2.0–3.0 HP), RM 400 (3.5–6.0 HP). Diskaun pelbagai unit tersedia untuk premis komersial — WhatsApp kami jumlah unit anda untuk sebut harga khas.",
      },
      {
        q: "Ceiling cassette saya menitis air \u2014 apa yang perlu saya lakukan dengan segera?",
        a: "Matikan unit di termostat atau pengasing SEGERA. Letakkan baldi di bawah titik titisan. Jika air berkumpul pada papan siling, tebuk lubang kecil di titik paling rendah untuk membiarkan air mengalir secara terkawal (ini mengelakkan siling runtuh yang lebih besar). Kemudian WhatsApp kami. Punca paling biasa adalah paip longkang tersumbat atau dulang longkang kotor \u2014 kedua-duanya boleh dibaiki pada hari yang sama. Meneruskan penggunaan unit semasa bocor akan merosakkan papan siling gipsum, membawa kepada penggantian (RM 500\u20131,500 bergantung pada saiz).",
      },
      {
        q: "Berapa kerap ceiling cassette komersial perlu diservis?",
        a: "Pejabat standard: setiap 4\u20136 bulan servis asas + cuci kimia tahunan. Kedai runcit: setiap 3\u20134 bulan servis asas + cuci kimia tahunan (lebih banyak trafik = lebih banyak habuk). Restoran/F&B: setiap 3 bulan minimum (minyak dan habuk tepung menyumbat gegelung 2\u20133x lebih cepat). Klinik perubatan: setiap 3\u20134 bulan (persekitaran kritikal kebersihan). Jika unit anda beroperasi 10+ jam sehari, servis asas setiap 3 bulan disyorkan.",
      },
      {
        q: "Bolehkah anda servis berbilang unit ceiling cassette di seluruh premis kami dalam satu lawatan?",
        a: "Ya \u2014 ini yang kami lakukan secara berkala untuk pelanggan komersial. Kami boleh menjadualkan 2\u20133 juruteknik pada hari yang sama untuk tapak yang lebih besar. Semua unit diservis, laluan longkang diuji, dan penyejukan disahkan sebelum kami bertolak. Diskaun volum: Diskaun Tempahan Segera 5% untuk 4\u201310 unit, Diskaun Tempahan Segera 10% untuk 10+ unit pada lawatan yang sama. Kontrak penyelenggaraan tahunan (AMC) juga tersedia.",
      },
      {
        q: "Bolehkah anda servis unit ceiling cassette kami selepas waktu perniagaan?",
        a: "Ya \u2014 servis luar waktu (petang dari 6pm\u201310pm, hujung minggu, dan cuti umum) tersedia untuk pelanggan komersial. Kami faham bahawa restoran tidak boleh mempunyai juruteknik bekerja di atas pelanggan semasa waktu makan tengah hari. Terdapat surcaj sederhana untuk kerja luar waktu (RM 50 untuk petang). WhatsApp kami dengan jadual pilihan anda.",
      },
      { q: "Kenapa unit ceiling cassette pejabat saya bocor ke atas siling?", a: "Ini selalunya disebabkan kegagalan pam air dalaman atau dulang longkang yang terlalu kotor. Kami melakukan 'Ujian Aliran' semasa servis untuk memastikan pam berfungsi pada kapasiti penuh." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪天花板卡式机保养费用是多少？",
        a: "基本保养：RM 150（1.0–1.5 HP），RM 200（2.0–3.0 HP），RM 250（3.5–5.0 HP）。化学清洗：RM 220（1.0–1.5 HP），RM 280（2.0–3.0 HP），RM 350（4.0–5.0 HP）。化学大修价格仅适用于挂壁式，按HP确认。安装：RM 290（1.0–1.5 HP），RM 350（2.0–3.0 HP），RM 400（3.5–6.0 HP）。商业场所享有多台折扣——WhatsApp告诉我们您的机器数量以获取定制报价。",
      },
      {
        q: "天花板卡式机滴水\u2014\u2014我该怎么办？",
        a: "立即在温控器或隔离开关处关闭机器。在水滴下方放置水桶。如果水积聚在天花板上，在最低点戳一个小孔让水可控地排出（这能防止更大的天花板坍塌）。然后WhatsApp联系我们。最常见原因是排水管堵塞或排水盘脏污\u2014\u2014两者都可以当天修复。在漏水时继续运行机器会浸湿石膏天花板，导致下陷、污渍和最终更换（费用RM 500-1,500不等）。",
      },
      {
        q: "商业天花板卡式机应该多久保养一次？",
        a: "标准办公室：每4-6个月基本保养+年度化学清洗。零售店：每3-4个月基本保养+年度化学清洗（人流量大=灰尘多）。餐饮店：至少每3个月（油脂和面粉灰尘堵塞盘管速度加快2-3倍）。诊所/药房：每3-4个月（卫生关键环境）。如果机器每天运行10小时以上，建议每3个月基本保养一次。",
      },
      {
        q: "你们能在一次上门中服务我们整个场所的多台卡式机吗？",
        a: "可以\u2014\u2014这是我们为商业客户定期做的。我们可以在同一天安排2-3名技术员服务更大的场所。所有机器保养完成，排水通道测试完毕，制冷验证完毕再离开。批量折扣：同次上门2-3台5%折扣，4-8台10%折扣，8台以上15%折扣。也可提供定制年度维护合同（AMC）\u2014\u2014WhatsApp联系我们获取场地专属方案。",
      },
      {
        q: "能在营业时间之后维修天花板卡式机吗？",
        a: "可以\u2014\u2014我们为商业客户提供非工作时间服务（晚上6点-10点、周末和公共假日）。我们理解餐厅不能在午餐高峰期让技术员在顾客上方作业，零售店不能在客流高峰时段关闭空调维修。非工作时间有少量附加费（晚上RM 50）。WhatsApp我们您的首选时间安排。",
      },
      { q: "为什么我办公室的天花板卡式机会漏水到吊顶板上？", a: "这通常是由于内置冷凝水泵故障或内部接水盘积满淤泥。我们在保养时会进行“流量测试”以确保水泵满负荷正常运行。" },
      { q: "Bolehkah saya menempah servis ceiling cassette pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama untuk servis ceiling cassette di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik." },
      { q: "能否当天预约天花板卡式机保养？", a: "可以 — KL Renovator 经常有当天预约名额用于卡式机保养。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" }
    ],
    priceTable: [
      { label: "Basic Service · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Basic Service · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Basic Service · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Chemical Wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Wash · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Chemical Wash · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Installation · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Installation · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Installation · 3.5 – 6.0 HP", price: "RM 400" },
    ],
    priceTableNote: "Installation includes 7ft copper pipe, insulation, electrical wire, and drain pipe free. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 8. DISMANTLE & RELOCATION ────────────────────────────────────────────
  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantle & Relocation",
    tagline: "Safe pump-down, professional dismantle, and full recommissioning at your new address. Same move-in day installation available. From RM 250 complete.",
    description:
      "You are moving to a new condo in Petaling Jaya, or your office is relocating from Bangsar to Damansara. You have a perfectly good Daikin inverter unit that is only 3 years old \u2014 replacing it would cost RM 1,500+. Dismantling and relocating it makes financial sense. But this is not a job for general movers or a handyman with a spanner. An aircond relocation involves: safely pumping down the refrigerant into the outdoor condenser (so no gas is lost), disconnecting the electrical isolator, unbolting the indoor unit from the wall bracket, removing the outdoor condenser from its bracket or platform, extracting the copper pipes and wiring through the wall penetration, transporting both units securely to the new location, and then performing a full new installation: new copper pipes, new drainage, new wiring run, vacuum evacuation, and recommissioning. KL Renovator does this start to finish. Complete relocate and reinstall from RM 250 (1.0\u20131.5 HP, same building or nearby). RM 350 for a different-location relocation. Includes refrigerant recovery, 7ft new copper pipe, wiring, drainage, vacuum, and test. Same-day completion on most moves.",
    startPrice: "RM 90",
    heroImage: "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp",
    ogImage: "/hero/aux-aircond-dismantle-relocation-kuala-lumpur-9.webp",
    aioSummary: "Safe aircond relocation involving refrigerant pump-down and re-commissioning. Starting Price: RM 250 (Full package). Includes: New 7ft copper piping and vacuum cycle at the new location. Preserves 100% compressor integrity.",
    aioSummaryMS: "Relokasi aircond yang selamat melibatkan 'pump-down' gas dan komisen semula. Harga: RM 250 (Pakej penuh). Termasuk: Paip kuprum 7 kaki baru dan kitaran vakum di lokasi baru. Melindungi integriti kompressor.",
    aioSummaryZH: "涉及冷媒泵送回收和重新调试的安全移机服务。起步价：RM 250（全包）。包含：新地点7尺新铜管及抽真空流程。100%保护压缩机寿命。",
    highlights: [
      "Professional Refrigerant Pump-Down — preserves 100% of the existing gas",
      "Safe extraction of indoor & outdoor units to prevent frame damage",
      "Full re-installation at new site — includes new copper pipe & wiring",
      "Vacuum pump commissioning at new location to ensure moisture-free lines",
      "Outdoor unit upright transport policy — protects compressor oil integrity",
      "Support for same-day 'Tear Down & Reinstall' for local Klang Valley moves",
      "New mounting brackets and vibration dampeners provided at the new address",
      "1-month warranty covering the entire dismantling and re-installation work",
    ],
    process: [
      { step: "Pump-Down & Electrical Disconnect", desc: "Technician runs the unit in cooling mode, closes the liquid service valve on the outdoor unit to pump all refrigerant into the condenser, then closes the suction valve. Refrigerant is now safely stored in the outdoor unit. Electrical isolator switched off and verified dead. Unit fully powered down." },
      { step: "Careful Dismantle", desc: "Indoor unit unclipped from wall bracket. Outdoor condenser unbolted from bracket or platform. Copper pipes cut at wall penetration point (cannot be reused \u2014 they are fixed in the wall). Wiring disconnected and labelled for easy reconnection. All components wrapped in protective blankets for transport." },
      { step: "Transport to New Location", desc: "Units transported in the technician's vehicle with proper padding. No units stacked on top of each other. Outdoor condenser transported upright (never on its side \u2014 compressor oil can flood the refrigerant lines). Arrival at new location coordinated with your move-in schedule." },
      { step: "Full Reinstall & Commission", desc: "New wall bracket mounted. New copper pipes cut, flared, insulated, and routed. New drainage pipe set with correct fall. Electrical wired from isolator through dedicated conduit. Outdoor unit mounted on new bracket with rubber pads. System vacuumed (minimum 15\u201320 min). Service valves opened to release stored refrigerant. Cooling tested, thermostat calibrated, job card signed." },
    ],
    faqs: [
      {
        q: "How much does aircond dismantle and relocation cost in KL & Selangor?",
        a: "Dismantle only (without reinstall): RM 90. Full dismantle + reinstall same building/nearby: RM 250 (1.0\u20131.5 HP), RM 290 (2.0\u20132.5 HP). Full dismantle + reinstall different location: RM 350 (1.0\u20131.5 HP). All full-relocation packages include: refrigerant pump-down, safe dismantle, transport, new 7ft copper pipe, new wiring, new drainage,  vacuum commissioning, and full test. Additional copper pipe beyond 7ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP). Additional wire beyond 7ft: RM 9/ft. If the new location requires roof-mount or high-rise external condenser mounting, additional bracket fees may apply \u2014 confirmed before work.",
      },
      {
        q: "Will my aircond refrigerant gas be lost during the relocation?",
        a: "No \u2014 we perform a 'pump-down' procedure before dismantling. The refrigerant is compressed back into the outdoor condenser unit where it is stored during transport. When we reconnect at the new location, the same refrigerant is released back into the system. You do not lose any gas and do not need a top-up (unless your unit already had a slow leak before the move, which we check during the initial diagnostic). This is the correct, professional method \u2014 anyone who says 'gas will be lost during relocation' is either not doing it properly or is trying to sell you an unnecessary gas top-up.",
      },
      {
        q: "How long does dismantle and relocation take?",
        a: "Single unit, same-building move: approximately 3\u20134 hours door-to-door (1 hour dismantle + transport + 2\u20133 hours reinstall). Single unit, different-location move (within Klang Valley): plan for 4\u20135 hours including travel between locations. Two-unit relocation: approximately 6\u20138 hours, usually scheduled as a single full-day job. We can coordinate the timing with your move-in schedule \u2014 the reinstallation can happen the same day you get your keys.",
      },
      {
        q: "Can I reuse my existing copper pipes and bracket at the new location?",
        a: "Copper pipes: No. They are embedded in the wall, cut during removal, and cannot be extracted intact. New copper pipe (7ft included in the relocation package, RM 17/ft for 1.0–1.5 HP beyond) is always used at the new location. Wall bracket: No. The bracket stays on the old wall (it is screwed/bolted in). If a new outdoor bracket is required at the new location, it is quoted separately as a paid special charge before work begins. The only components that move with you are the indoor unit, outdoor condenser, and remote control. Everything else \u2014 pipes, wiring, drainage \u2014 is new at the new site.",
      },
      {
        q: "My new condo has different wall type or ceiling height \u2014 can you still install?",
        a: "We do a quick survey when we arrive at the new location (included in the price). Brick wall, concrete wall, plasterboard partition \u2014 we carry the correct anchors and brackets for each. High ceiling units (above 10ft): standard 7ft copper and drain pipe may not be enough \u2014 we will measure and quote any extra pipe before work. If the outdoor condenser needs to go on a roof or a high external wall that requires special access (scissor lift, boom lift), let us know BEFORE move day so we can coordinate. Standard ground-level or apartment-ledge mounting is included.",
      },
      {
        q: "Is it worth relocating an older unit, or should I buy a new one?",
        a: "Our honest guidance: (1) Unit is under 5 years old, inverter, working perfectly \u2192 relocate. It will cost you RM 250\u2013350 vs RM 1,500+ for a new unit + installation. (2) Unit is 5\u20138 years old, working well, non-inverter \u2192 relocate is still worth it if the unit has been regularly serviced. An older but well-maintained unit can serve another 3\u20135 years. (3) Unit is 8+ years old, uses R22 gas, has needed repairs \u2192 strongly consider replacing. R22 is being phased out and getting expensive. A new R32 inverter unit will cut your electricity bill by 30\u201350% and pay for itself within 2\u20133 years. If you are unsure, WhatsApp us your unit's brand, model, and age, and we will give you an honest recommendation \u2014 we do both relocation and new installation, so there is no incentive to push one over the other.",
      },
      { q: "Will the relocation process damage my unit's internal seals?", a: "Not when performed by KL Renovator. We use calibrated torque wrenches on all flare connections to ensure a factory-tight seal that prevents future gas loss at the new location." }
    ],
    faqsBM: [
      {
        q: "Berapa harga tanggal dan pindah aircond di KL & Selangor?",
        a: "Tanggal sahaja (tanpa pasang semula): RM 90. Tanggal + pasang semula bangunan sama/berdekatan: RM 250 (1.0\u20131.5 HP), RM 290 (2.0\u20132.5 HP). Tanggal + pasang semula lokasi berbeza: RM 350 (1.0\u20131.5 HP). Semua pakej penuh termasuk: pam-turun bahan pendingin, tanggal selamat, pengangkutan, 7 kaki paip kuprum baharu, pendawaian baharu, longkang baharu dinding baharu, pentauliahan vakum, dan ujian penuh. Paip kuprum tambahan melebihi 7 kaki: RM 17/kaki (1.0–1.5 HP), RM 23/kaki (2.0–2.5 HP), RM 27/kaki (3.0–3.5 HP). Wayar elektrik tambahan: RM 9/kaki.",
      },
      {
        q: "Adakah gas aircond saya akan hilang semasa pemindahan?",
        a: "Tidak \u2014 kami melakukan prosedur 'pam-turun' sebelum menanggal. Bahan pendingin dimampatkan kembali ke dalam unit kondenser luar di mana ia disimpan semasa pengangkutan. Apabila kami menyambung semula di lokasi baru, bahan pendingin yang sama dilepaskan kembali ke dalam sistem. Anda tidak kehilangan sebarang gas dan tidak memerlukan tambahan (melainkan unit anda sudah mempunyai kebocoran perlahan sebelum pemindahan, yang kami periksa semasa diagnostik awal).",
      },
      {
        q: "Berapa lama masa yang diperlukan untuk tanggal dan pindah?",
        a: "Satu unit, pindah bangunan sama: kira-kira 3\u20134 jam dari mula hingga selesai. Satu unit, pindah lokasi berbeza (dalam Lembah Klang): rancang 4\u20135 jam termasuk perjalanan antara lokasi. Dua unit: kira-kira 6\u20138 jam, biasanya dijadualkan sebagai satu kerja sehari penuh. Kami boleh selaraskan masa dengan jadual masuk rumah anda.",
      },
      {
        q: "Bolehkah saya menggunakan semula paip kuprum dan braket lama di lokasi baharu?",
        a: "Paip kuprum: Tidak. Ia tertanam di dinding, dipotong semasa penanggalan, dan tidak boleh dikeluarkan secara utuh. Paip kuprum baharu (7 kaki termasuk dalam pakej, RM 17/kaki (1.0–1.5 HP) tambahan) sentiasa digunakan di lokasi baharu. Braket dinding: Tidak. Braket kekal di dinding lama. Jika braket luar baharu diperlukan di lokasi baharu, ia disebut sebagai caj khas berbayar sebelum kerja bermula. Satu-satunya komponen yang berpindah dengan anda adalah unit dalaman, kondenser luar, dan alat kawalan jauh.",
      },
      {
        q: "Adakah berbaloi memindahkan unit lama, atau beli yang baharu?",
        a: "Panduan jujur kami: (1) Unit bawah 5 tahun, inverter, berfungsi sempurna \u2192 pindahkan. Kos RM 250\u2013350 vs RM 1,500+ untuk unit baharu + pemasangan. (2) Unit 5\u20138 tahun, berfungsi baik, bukan inverter \u2192 masih berbaloi jika diservis secara berkala. (3) Unit 8+ tahun, gunakan gas R22, pernah dibaiki \u2192 pertimbangkan untuk ganti. R22 sedang dihentikan dan semakin mahal. Unit inverter R32 baharu akan mengurangkan bil elektrik 30\u201350%. Jika tidak pasti, WhatsApp kami jenama, model, dan umur unit anda.",
      },
      { q: "Adakah proses pemindahan akan merosakkan seal dalaman unit saya?", a: "Tidak jika dilakukan oleh KL Renovator. Kami menggunakan kunci tork bertauliah pada semua sambungan untuk memastikan kedap udara standard kilang yang menghalang kebocoran gas di lokasi baru." },
      { q: "Bolehkah saya menempah pemindahan pada hari yang sama?", a: "Ya — KL Renovator kerap mempunyai slot hari sama untuk pemindahan di seluruh KL & Selangor. WhatsApp +60182983573 awal pagi untuk peluang terbaik." }
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪冷气拆机和搬迁费用是多少？",
        a: "仅拆机（不重装）：RM 90。拆机+同楼/就近重装：RM 250（1.0-1.5 HP），RM 290（2.0-2.5 HP）。拆机+不同地点重装：RM 350（1.0-1.5 HP）。所有完整搬迁套餐包括：制冷剂泵送回收、安全拆机、运输、7尺新铜管、新电线、新排水管、新墙支架、真空调试和全面测试。超出7尺的额外铜管：RM 17/尺（1.0–1.5 HP），RM 23/尺（2.0–2.5 HP），RM 27/尺（3.0–3.5 HP）。超出7尺的额外电线：RM 9/尺。",
      },
      {
        q: "搬迁过程中冷媒气体会有损失吗？",
        a: "不会\u2014\u2014我们在拆机前执行\u2018泵送\u2019程序。制冷剂被压缩回室外冷凝器中，在运输过程中安全储存。在新地点重新连接时，同一批制冷剂被释放回系统中。您不会有任何气体损失，也不需要充气（除非您的机器在搬迁前就已存在缓慢泄漏，我们会在初步诊断时检查）。这是正确、专业的方法\u2014\u2014任何说\u2018搬迁会损失气体\u2019的人要么没有正确操作，要么想向您推销不必要的充气服务。",
      },
      {
        q: "拆机和搬迁需要多长时间？",
        a: "单台机器，同楼搬迁：从开始到结束约3-4小时。单台机器，不同地点搬迁（巴生谷内）：包括地点间路程约4-5小时。两台机器：约6-8小时，通常安排为全天的单一工作。我们可以配合您的搬家时间表\u2014\u2014重装可以在您拿到钥匙的当天完成。",
      },
      {
        q: "可以在新地点重复使用旧的铜管和支架吗？",
        a: "铜管：不能。它们嵌入在墙壁中，拆机时被切断，无法完整取出。新铜管（搬迁套餐含7尺，超出RM 17/尺（1.0–1.5 HP），RM 23/尺（2.0–2.5 HP），RM 27/尺（3.0–3.5 HP））始终在新地点使用。墙支架：不能。支架留在旧墙上。如需要新室外支架，将在开工前作为付费附加项目另行报价。唯一随您移动的部件是室内机、室外冷凝器和遥控器。其他一切\u2014\u2014管道、电线、排水管、支架\u2014\u2014在新地点都是全新的。",
      },
      {
        q: "搬迁旧机器值得吗，还是应该买新的？",
        a: "我们的诚实建议：（1）机器5年以下、变频、工作正常\u2192搬迁。费用RM 250-350 vs 新机+安装RM 1,500+。（2）机器5-8年、工作正常、非变频\u2192如果定期保养仍值得搬迁。保养良好的旧机器还可以再用3-5年。（3）机器8年以上、使用R22气体、曾维修过\u2192强烈建议更换。R22正在淘汰且越来越贵。新的R32变频机可降低电费30-50%。如果您不确定，WhatsApp我们机器的品牌、型号和使用年限。",
      },
      { q: "移机会损坏机器的内部密封吗？", a: "由 KL Renovator 操作则不会。我们在所有接口处使用定标扭矩扳手，确保达到出厂级密封标准，防止在新地点发生冷媒泄漏。" },
      { q: "能否当天预约移机服务？", a: "可以 — KL Renovator 经常有当天预约名额用于移机服务。请尽早 WhatsApp +60182983573 以获得最佳的当天时段。" }
    ],
    priceTable: [
      { label: "Dismantle Only (indoor + outdoor)", price: "RM 90" },
      { label: "Dismantle + Reinstall Same Place (standard)", price: "RM 250" },
      { label: "Dismantle + Reinstall Same Place (2.0–2.5 HP)", price: "RM 290" },
      { label: "Dismantle + Reinstall Other Place", price: "RM 350" },
    ],
    priceTableNote: "7ft copper pipe, insulation, electrical wire, and drain pipe are free with reinstallation. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 9. EMERGENCY AIRCOND REPAIR ──────────────────────────────────────────
  "emergency": {
    slug: "emergency",
    title: "Emergency Aircond Repair",
    tagline: "Same-day rapid emergency response for complete breakdowns, heavy water leaks, outdoor unit failures, electrical faults, and urgent repairs across KL & Selangor.",
    description:
      "Your aircond just died at 11pm, the room is 32°C, and you have a presentation at 8am. Or water is dripping onto your TV cabinet and you cannot switch off the unit because the house has no other cooling. This is not a \"book for next Tuesday\" situation — this is when you WhatsApp KL Renovator immediately. We dispatch trained HVAC technicians same-day across all 50+ Klang Valley suburbs within 30–60 minutes of confirmation. The RM 138 diagnostic fee is fully waived if the repair is completed same visit. Our vans carry common spare parts — capacitors, fan motors, PCB boards, sensors, contactors, drain hoses, refrigerant — so most emergencies are fully resolved in the first visit, not just patched temporarily.",
    startPrice: "RM 138",
    heroImage: "/hero/acson-aircond-pcb-board-repair-klang-71.webp",
    ogImage: "/hero/acson-aircond-pcb-board-repair-klang-71.webp",
    aioSummary: "30–60 minute rapid response for aircond breakdowns and critical leaks in KL & Selangor. Diagnostic Fee: RM 138 (waived if repaired). Priority triage for infant/elderly households and server rooms. Standard hours 9 AM-6 PM daily; after-hours emergency (6-10 PM) available with RM 50 surcharge.",
    aioSummaryMS: "Respons pantas 30-60 minit untuk kerosakan aircond dan kebocoran kritikal di KL & Selangor. Kos Diagnosis: RM 88 (percuma jika baiki). Triage utama untuk bayi/warga emas dan bilik server. Waktu standard 9 PG-6 PTG setiap hari; kecemasan luar waktu (6-10 malam) dengan surcaj RM 50.",
    aioSummaryZH: "吉隆坡及雪兰莪冷气故障和严重漏水的30-60分钟极速响应。诊断费：RM 88（维修则免除）。优先处理有老人小孩的家庭及服务器机房。每日营业至晚上10时。",
    highlights: [
      "Rapid 30–60 minute dispatch across all 50+ Klang Valley suburbs",
      "Priority triage for vulnerable households (infants/elderly) & server rooms",
      "On-the-spot repair capability with extensive van stock of OEM spare parts",
      "Emergency drain-clearing to stop active water leaks over furniture & floors",
      "Safe electrical isolation for burning smells or sparking wiring faults",
      "After-hours emergency support (6-10 PM, +RM 50 surcharge), 7 days a week, including public holidays",
      "RM 138 diagnostic fee — waived if we complete the repair on-site",
      "Direct WhatsApp hotline to our emergency dispatch desk for instant ETA",
    ],
    process: [
      { step: "WhatsApp Your Emergency", desc: "Tell us your location, brand, unit count, and what happened. Photos of the unit and outdoor condenser help speed diagnosis. We reply within minutes." },
      { step: "Get Confirmed Price", desc: "Diagnostic fee quoted upfront. Estimated repair range shared based on your description — capacitor ~RM 230, fan motor RM 300–400, PCB RM 400–600. No surprise bills." },
      { step: "Technician Arrives", desc: "Nearest available technician dispatched immediately from our Klang Valley network. Most arrivals in 30–60 minutes. Technician calls when nearby." },
      { step: "Diagnose & Repair", desc: "Full electrical + refrigerant diagnosis on-site. Common repairs completed same visit. Rare parts ordered overnight with priority return the next business day." },
    ],
    faqs: [
      {
        q: "My aircond suddenly stopped working — what should I do before calling?",
        a: "Three quick checks before you WhatsApp us: (1) Check your MCB/distribution board — if the aircond breaker has tripped, reset it once. If it trips again, do NOT reset — call us, there is a short circuit risk. (2) Replace the remote control batteries — weak batteries cause intermittent \"dead\" symptoms. (3) Check if other appliances on the same circuit work — sometimes only one phase is down. If all three are fine and the unit is still dead, WhatsApp +60182983573 immediately.",
      },
      {
        q: "How much does emergency aircond repair cost in KL & Selangor?",
        a: "Diagnostic fee is RM 88 during standard hours (9am–6pm), fully waived if the repair is completed on the same visit. After-hours (6pm–10pm) adds a RM 50 surcharge — so RM 138 diagnostic total, also waived if repaired. Most common emergency repairs: capacitor replacement ~RM 230, indoor fan motor ~RM 300–400, PCB board ~RM 400–600, drain clearing ~RM 170. Every repair price is confirmed with you BEFORE any work starts.",
      },
      {
        q: "What qualifies as a genuine aircond emergency?",
        a: "Complete breakdown with zero cooling during hot weather, heavy water leak threatening furniture/electronics/flooring, burning smell or visible sparks from the unit, outdoor compressor making loud grinding noise and stopped, server room or medical equipment space with temperature-sensitive equipment, or home with elderly, infant, or person with medical condition relying on cooling. If it is simply weak cooling or mild smell, a same-day standard service (not emergency) may be faster and cheaper — WhatsApp us and we will help you decide honestly.",
      },
      {
        q: "Does KL Renovator cover emergency repair in all Selangor areas?",
        a: "Yes — our technician network spans every major Klang Valley suburb: Petaling Jaya, Subang Jaya, Shah Alam, Klang, Puchong, Kajang, Ampang, Cheras, Damansara, Batu Caves, Selayang, Rawang, Setapak, Kepong, Bangsar, Mont Kiara, and all surrounding areas. For locations beyond 35km from our Batu Caves base (e.g., far ends of Rawang/Kundang/Semenyih), arrival may take slightly longer but we will give you an honest ETA upfront.",
      },
      {
        q: "Can KL Renovator come after working hours?",
        a: "Yes — we accept emergency bookings until 10pm, 7 days a week. Jobs confirmed after 6pm carry a RM 50 overtime surcharge (also waived if repair completed). WhatsApp +60182983573 any time — if it is past 10pm, we will still read your message and schedule the earliest possible slot the next morning, often 9am.",
      },
      {
        q: "What if my aircond cannot be repaired same-day?",
        a: "About 85% of emergencies are resolved in the first visit because our vans carry the most commonly failing parts. If your unit needs a rare PCB for a 10-year-old model or a specific compressor that is not in van stock, we will: (a) waive the diagnostic fee, (b) order the part overnight, (c) return the next business day to complete the repair. You only pay the full repair price when the job is done. No upfront booking fees and no deposits.",
      },
      { q: "What is the fastest way to get an emergency slot?", a: "WhatsApp +60182983573 with your GPS location and a short video of the symptom. This allows our dispatch desk to assign the nearest van immediately." }
    ],
    faqsBM: [
      {
        q: "Aircond saya tiba-tiba rosak — apa yang perlu saya buat dahulu?",
        a: "Tiga langkah pantas sebelum WhatsApp kami: (1) Periksa papan MCB/agihan — jika pemutus litar aircond telah jatuh, set semula sekali. Jika jatuh lagi, JANGAN set semula — hubungi kami, ada risiko litar pintas. (2) Tukar bateri alat kawalan jauh — bateri lemah menyebabkan simptom 'mati' sekejap-sekejap. (3) Periksa sama ada peralatan lain di litar yang sama berfungsi — kadangkala hanya satu fasa yang terputus. Jika ketiga-tiganya baik dan unit masih mati, WhatsApp +60182983573 segera.",
      },
      {
        q: "Berapa caj pembaikan aircond kecemasan di KL & Selangor?",
        a: "Caj diagnostik RM 88 untuk waktu standard (9am–6pm), dikecualikan sepenuhnya jika pembaikan diselesaikan pada lawatan yang sama. Waktu luar (6pm–10pm) dikenakan surcaj RM 50 — jadi jumlah RM 138, juga dikecualikan jika dibaiki. Pembaikan kecemasan paling biasa: penggantian kapasitor ~RM 230, motor kipas dalaman ~RM 300–400, papan PCB ~RM 400–600, pembersihan longkang ~RM 170. Setiap harga pembaikan disahkan dengan anda SEBELUM sebarang kerja dimulakan.",
      },
      {
        q: "Apakah yang dikira sebagai kecemasan aircond sebenar?",
        a: "Kerosakan sepenuhnya dengan tiada penyejukan semasa cuaca panas, kebocoran air teruk mengancam perabot/elektronik/lantai, bau terbakar atau percikan api dari unit, kompressor luar mengeluarkan bunyi mengisar kuat dan terhenti, bilik pelayan atau ruang peralatan perubatan dengan peralatan sensitif suhu, atau rumah dengan warga emas, bayi, atau individu dengan keadaan perubatan yang bergantung pada penyejukan. Jika hanya penyejukan lemah atau bau ringan, servis standard hari sama (bukan kecemasan) mungkin lebih cepat dan murah — WhatsApp kami dan kami akan bantu anda membuat keputusan dengan jujur.",
      },
      {
        q: "Adakah KL Renovator meliputi semua kawasan Selangor?",
        a: "Ya — rangkaian juruteknik kami merangkumi setiap subbandar utama Klang Valley: Petaling Jaya, Subang Jaya, Shah Alam, Klang, Puchong, Kajang, Ampang, Cheras, Damansara, Batu Caves, Selayang, Rawang, Setapak, Kepong, Bangsar, Mont Kiara, dan semua kawasan sekitar. Untuk lokasi melebihi 35km dari pangkalan kami di Batu Caves (cth. hujung Rawang/Kundang/Semenyih), ketibaan mungkin mengambil masa lebih lama tetapi kami akan berikan ETA yang jujur terlebih dahulu.",
      },
      {
        q: "Bolehkah KL Renovator datang selepas waktu kerja?",
        a: "Ya — kami menerima tempahan kecemasan sehingga 10 malam, 7 hari seminggu. Kerja yang disahkan selepas 6 petang dikenakan surcaj RM 50 (juga dikecualikan jika pembaikan selesai). WhatsApp +60182983573 pada bila-bila masa — jika sudah melebihi 10 malam, kami tetap akan membaca mesej anda dan menjadualkan slot seawal mungkin keesokan paginya, selalunya jam 9 pagi.",
      },
      {
        q: "Bagaimana jika aircond saya tidak dapat dibaiki pada hari yang sama?",
        a: "Kira-kira 85% kecemasan diselesaikan dalam lawatan pertama kerana van kami membawa alat ganti yang paling kerap rosak. Jika unit anda memerlukan PCB yang jarang untuk model berusia 10 tahun atau kompressor tertentu yang tiada dalam stok van, kami akan: (a) mengecualikan caj diagnostik, (b) memesan alat ganti semalaman, (c) kembali pada hari perniagaan berikutnya untuk menyelesaikan pembaikan. Anda hanya membayar harga penuh pembaikan apabila kerja selesai. Tiada yuran tempahan pendahuluan dan tiada deposit.",
      },
      { q: "Apakah cara terpantas untuk mendapatkan slot kecemasan?", a: "WhatsApp +60182983573 dengan lokasi GPS anda dan video pendek simptom tersebut. Ini membolehkan pusat panggilan kami menugaskan van terdekat dengan segera." }
    ],
    faqsZH: [
      {
        q: "冷气突然停止工作——联系你们之前我该做什么？",
        a: "联系我们之前请做三个快速检查：（1）检查MCB/配电板——如果冷气断路器跳闸，复位一次。如果再次跳闸，请勿再复位——联系我们有短路风险。（2）更换遥控器电池——电量不足会导致间歇性“死机”症状。（3）检查同一电路的其他电器是否工作——有时只是缺相。如果三个检查都正常但机器仍不工作，请立即WhatsApp +60182983573。",
      },
      {
        q: "吉隆坡和雪兰莠紧急冷气维修费用是多少？",
        a: "标准时间（上午9点至下卡6点）诊断费RM 88，如果同次上门完成维修则全免。非工作时间（下卡6点至晚上10点）加收RM 50——合计RM 138，如果维修也一样免除。最常见紧急维修：电容更换约RM 230，室内风扇电机约RM 250-350，PCB电路板约RM 300-600，排水管疏通约RM 170。每项维修价格在开始任何工作之前与您确认。",
      },
      {
        q: "什么情况算真正的冷气紧急情况？",
        a: "炎热天气中完全停机无冷气、严重漏水威胁家具/电器/地板、机器有烧焦味或可见火花、室外压缩机发出巨大磨擦声并停止运转、服务器机房或医疗设备空间的温度敏感设备、或家中有老人/婴儿/病患依赖冷气。如果仅是冷气不够冷或有轻微异味，当天标准服务（非紧急）可能更快更便宜——WhatsApp我们，我们会帮您诚实判断。",
      },
      {
        q: "KL Renovator覆盖雪兰莠所有地区吗？",
        a: "是的——我们的技术员网络覆盖所有主要巴生谷住宅区：八打灵再也、梳邦再也、莎阿南、巴生、蒲种、加影、安邦、蕉赖、白沙罗、黑风洞、士拉央、万挠、文良港、甲洞、Bangsar、Mont Kiara及所有周边地区。对于距离我们黑风洞基地超过35公里的地点（如万挠/昆当/士毛月远端），到达时间可能稍长，但我们会提前给您诚实的预计到达时间。",
      },
      {
        q: "KL Renovator可以在工作时间之外上門嗎？",
        a: "可以——我们接受紧急预订至晚上10点，每周7天。下卡6点后确认的工作加收RM 50加班费（维修完成同样免除）。随时WhatsApp +60182983573——如果超过晚上10点，我们仍会阅读您的信息并安排次日最早的时间段，通常是上午9点。",
      },
      {
        q: "如果我的冷气当天无法修好怎么办？",
        a: "约85%的紧急情况在第一次上门就能解决，因为我们的车辆携带最常见的故障部件。如果您的机器需要一个稀有的PCB电路板（适配10年前的型号）或特定压缩机，而车上没有库存，我们将：(a)免除诊断费，(b)隔夜订购部件，(c)次日返回完成维修。您只在工作完成时支付全额维修费用。没有预付预订费也没有押金。",
      },
      { q: "获得紧急维修时段最快的方法是什么？", a: "请 WhatsApp +60182983573 并发送您的 GPS 定位和故障短视频。这能让我们的调度中心立即指派最近的服务车前往。" }
    ],
    priceTable: [
      { label: "Diagnostic Fee (Standard Hours 9am–6pm)", price: "RM 88" },
      { label: "Diagnostic Fee (waived if repaired same visit)", price: "FREE" },
      { label: "After-Hours Surcharge (6pm–10pm)", price: "RM 50" },
      { label: "Capacitor Replacement (most common emergency)", price: "RM 230" },
      { label: "Fan Motor Replacement (indoor)", price: "RM 300–400" },
      { label: "Fan Motor Replacement (outdoor)", price: "RM 300–450" },
      { label: "PCB Board Replacement", price: "RM 400–600" },
      { label: "Emergency Drain Pipe Clearing", price: "RM 170" },
      { label: "Compressor Replacement (quoted before work)", price: "RM 850–2,000" },
    ],
  },
};
