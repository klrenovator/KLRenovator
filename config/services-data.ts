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
};

export const servicesData: Record<string, ServiceDetail> = {

  // ── 1. PRESSURE CHEMICAL WASH ─────────────────────────────────────────────
  "chemical-wash": {
    slug: "chemical-wash",
    title: "Pressure Chemical Wash",
    tagline: "Deep high-pressure chemical clean — removes mould, dust, bacteria and restores cooling power.",
    description:
      "A pressure chemical wash uses a food-safe chemical solution sprayed at high pressure onto the evaporator coil and blower wheel while the unit stays mounted on the wall. It dissolves stubborn mould, bacteria, dust and allergens that a basic service cannot remove. Recommended every 12 months, or sooner if your unit smells, blows warm air, or has low airflow.",
    startPrice: "RM 120",
    heroImage: "/hero/aircond-pressure-chemical-wash-selangor.jpg",
    highlights: [
      "High-pressure food-safe chemical spray",
      "Full evaporator coil + blower wheel treatment",
      "Kills mould, bacteria & allergens",
      "Drain pipe flush included",
      "Restores original cooling power & airflow",
      "Unit stays mounted — no dismantle needed",
      "Filter cleaned & reinstalled",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Cover & Protect", desc: "Drop sheets protect your floor, wall and furniture before we start." },
      { step: "Apply Chemical", desc: "Food-safe chemical solution sprayed onto coil, blower wheel and all internal surfaces." },
      { step: "High-Pressure Rinse", desc: "High-pressure water rinse flushes out dissolved dirt, mould and bacteria through the drain." },
      { step: "Test & Handover", desc: "Cooling output tested, area cleaned, and job card handed to you." },
    ],
    faqs: [
      {
        q: "How much does a chemical wash cost in KL & Selangor?",
        a: "Chemical wash starts from RM 120 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette starts from RM 220. All prices confirmed before work begins — no hidden charges.",
      },
      {
        q: "How often should I get a chemical wash?",
        a: "Every 12 months for most homes. Every 8–10 months if you're near a main road, construction, or high-humidity area. Every 6 months for units running 8+ hours daily.",
      },
      {
        q: "What is the difference between chemical wash and basic servicing?",
        a: "Basic servicing is a surface filter and drain clean. Chemical wash uses a high-pressure chemical spray to dissolve mould and dirt deep inside the coil and blower wheel — areas basic servicing cannot reach.",
      },
      {
        q: "What is the difference between chemical wash and chemical overhaul?",
        a: "Chemical wash is done with the unit still mounted on the wall. Chemical overhaul fully dismantles the indoor unit for a complete deep clean of every internal component. Overhaul is recommended when the unit is leaking, icing up, or hasn't been opened in 3+ years.",
      },
      {
        q: "Does chemical wash fix water leaking?",
        a: "It often does — if the cause is a blocked drain pipe. If leaking continues after a chemical wash, a chemical overhaul is likely needed to clean the drain pan and tray properly.",
      },
      {
        q: "Can I use my aircond immediately after a chemical wash?",
        a: "Yes. KL Renovator tests cooling output and checks for leaks before leaving. Your unit is ready to use immediately.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga cuci kimia aircond di KL & Selangor?",
        a: "Cuci kimia bermula dari RM 120 untuk unit dinding 1.0–1.5 HP. Ceiling cassette bermula dari RM 220. Semua harga disahkan sebelum kerja dimulakan — tiada caj tersembunyi.",
      },
      {
        q: "Berapa kerap saya perlu buat cuci kimia?",
        a: "Setiap 12 bulan untuk kebanyakan rumah. Setiap 8–10 bulan jika berdekatan jalan utama atau kawasan pembinaan. Setiap 6 bulan untuk unit yang beroperasi 8+ jam sehari.",
      },
      {
        q: "Apa perbezaan cuci kimia dan servis biasa?",
        a: "Servis biasa hanya membersihkan penapis dan longkang. Cuci kimia menggunakan semburan kimia tekanan tinggi untuk melarutkan kulat dan habuk di dalam gegelung dan kipas — kawasan yang tidak dapat dicapai dengan servis biasa.",
      },
      {
        q: "Adakah cuci kimia boleh membaiki aircond bocor air?",
        a: "Ya, kerap kali — jika punca adalah paip longkang tersumbat. Jika bocor berterusan selepas cuci kimia, overhaul kimia diperlukan untuk membersihkan dulang longkang dengan lebih teliti.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪的冷气化学清洗价格是多少？",
        a: "挂壁式1.0–1.5 HP化学清洗从RM 120起。天花板卡式机从RM 220起。所有价格在开始工作前确认——无隐藏费用。",
      },
      {
        q: "化学清洗应该多久做一次？",
        a: "一般家庭每12个月一次。靠近主干道或建筑工地的每8–10个月一次。每天使用8小时以上的每6个月一次。",
      },
      {
        q: "化学清洗和基本保养有什么区别？",
        a: "基本保养只清洁过滤网和排水管。化学清洗使用高压化学喷雾溶解蒸发器盘管和风轮内的霉菌和污垢——基本保养无法触及这些区域。",
      },
      {
        q: "化学清洗能修复冷气漏水吗？",
        a: "通常可以——如果原因是排水管堵塞。如果清洗后仍然漏水，则需要化学大修来彻底清洁排水盘和托盘。",
      },
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
    title: "Chemical Overhaul",
    tagline: "Full dismantle deep clean — the permanent fix for water leaking, ice formation and extreme blockage.",
    description:
      "A chemical overhaul is the most thorough aircond cleaning available. The entire indoor unit is carefully dismantled — coil, blower wheel, housing, drain pan, tray and all internal parts are removed and individually deep-cleaned with chemical solution. Recommended when the unit has persistent water leaking, ice formation, extremely bad smell, or has not been serviced in 3+ years.",
    startPrice: "RM 220",
    heroImage: "/hero/aircond-chemical-overhaul-ampang-selangor.jpg",
    highlights: [
      "Full indoor unit dismantled",
      "Every component chemically deep-cleaned",
      "Drain pan & tray individually cleaned",
      "Blower wheel removed and soaked",
      "Eliminates persistent water leaking",
      "Fixes ice formation at root cause",
      "Removes severe mould & bacteria",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Protect & Dismantle", desc: "Drop sheets laid, then the full indoor unit is carefully removed from the wall bracket." },
      { step: "Component Soak", desc: "Every internal part — coil, blower wheel, housing, drain pan — soaked in food-safe chemical solution." },
      { step: "Deep Clean & Rinse", desc: "High-pressure rinse of each component until completely clean." },
      { step: "Reassemble & Test", desc: "Unit reassembled, remounted, and cooling output tested before handover." },
    ],
    faqs: [
      {
        q: "How much does a chemical overhaul cost in KL & Selangor?",
        a: "Chemical overhaul starts from RM 220 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette from RM 380. All prices confirmed before work begins.",
      },
      {
        q: "What is the difference between chemical wash and chemical overhaul?",
        a: "Chemical wash is done with the unit mounted — high-pressure spray cleans the coil and blower in place. Chemical overhaul fully dismantles the unit so every component is individually deep-cleaned. Overhaul is for units that are leaking, icing up, or have not been opened in years.",
      },
      {
        q: "My aircond is leaking water — will overhaul fix it?",
        a: "Yes, in most cases. Persistent water leaking is usually caused by a blocked or dirty drain pan and tray — components only accessible during a full overhaul.",
      },
      {
        q: "How long does a chemical overhaul take?",
        a: "2–3 hours per unit depending on the degree of blockage and the HP size.",
      },
      {
        q: "How often do I need a chemical overhaul?",
        a: "Most units benefit from a chemical overhaul every 2–3 years. Annual chemical wash in between maintains cleanliness without full dismantle.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga chemical overhaul di KL & Selangor?",
        a: "Chemical overhaul bermula dari RM 220 untuk unit dinding 1.0–1.5 HP. Ceiling cassette dari RM 380. Semua harga disahkan sebelum kerja dimulakan.",
      },
      {
        q: "Apa perbezaan cuci kimia dan chemical overhaul?",
        a: "Cuci kimia dilakukan dengan unit terpasang — semburan tekanan tinggi membersihkan gegelung dan kipas. Chemical overhaul membongkar sepenuhnya unit supaya setiap komponen dibersihkan secara individu. Overhaul sesuai untuk unit yang bocor, membeku atau sudah lama tidak dibersihkan.",
      },
      {
        q: "Aircond saya bocor air — adakah overhaul boleh membaikinya?",
        a: "Ya, dalam kebanyakan kes. Kebocoran berterusan biasanya disebabkan dulang longkang yang tersumbat atau kotor — komponen yang hanya boleh diakses semasa overhaul penuh.",
      },
      {
        q: "Berapa lama masa diperlukan untuk chemical overhaul?",
        a: "2–3 jam seunit bergantung kepada tahap kekotoran dan saiz HP.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪的化学大修价格是多少？",
        a: "挂壁式1.0–1.5 HP化学大修从RM 220起。天花板卡式机从RM 380起。所有价格在开始工作前确认。",
      },
      {
        q: "化学清洗和化学大修有什么区别？",
        a: "化学清洗在机器挂墙状态下进行——高压喷雾原位清洁盘管和风轮。化学大修完全拆卸机器，每个零件单独深度清洁。大修适用于漏水、结冰或长期未清洗的机器。",
      },
      {
        q: "冷气漏水——大修能修好吗？",
        a: "大多数情况下可以。持续漏水通常是因为排水盘和托盘堵塞或脏污——这些部件只有在完全大修时才能清洁。",
      },
      {
        q: "化学大修需要多长时间？",
        a: "根据堵塞程度和HP大小，每台机器需要2–3小时。",
      },
    ],
    priceTable: [
      { label: "Wall-Mounted · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Wall-Mounted · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Wall-Mounted · 3.0 – 3.5 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 500" },
    ],
  },

  // ── 3. GAS TOP-UP ────────────────────────────────────────────────────────
  "gas-topup": {
    slug: "gas-topup",
    title: "Gas Top-Up / Precision Balancing",
    tagline: "Restore cooling power with a precision refrigerant top-up — leak check included.",
    description:
      "Refrigerant gas is the lifeblood of your aircond. When levels are low — from a slow leak or gradual depletion — your unit cannot cool effectively regardless of how clean it is. KL Renovator uses precision manifold gauges to measure exact gas pressure before and after top-up, ensuring balanced refrigerant levels. R22, R410A and R32 all handled. Leak check included on every job.",
    startPrice: "RM 120",
    heroImage: "/hero/aircond-gas-topup-r32-r410a-selangor.jpg",
    highlights: [
      "R22, R410A and R32 refrigerants",
      "Precision manifold gauge measurement",
      "Exact gas level balancing",
      "Leak point inspection included",
      "Outdoor unit visual check",
      "Immediate cooling improvement",
      "Certified refrigerant handling",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Diagnose Low Gas", desc: "Technician checks for low-cooling symptoms, checks outdoor unit operation and inspects for visible leaks." },
      { step: "Connect Manifold Gauges", desc: "Precision manifold gauges connected to measure current refrigerant pressure accurately." },
      { step: "Top-Up to Spec", desc: "Correct refrigerant type added to manufacturer specification — not over or under filled." },
      { step: "Leak Check & Test", desc: "All service valves and connections checked for leaks. Cooling tested and confirmed before leaving." },
    ],
    faqs: [
      {
        q: "How much does aircond gas top-up cost in KL & Selangor?",
        a: "Gas top-up starts from RM 120 for R22. R410A from RM 150. R32 from RM 180. Leak check included. Prices vary slightly by HP size and extent of refill needed.",
      },
      {
        q: "How do I know if my aircond needs a gas top-up?",
        a: "Common signs: unit blowing warm or barely cool air despite being clean, ice forming on the copper pipe or coil, outdoor compressor running continuously without cooling the room, or the unit takes much longer than usual to reach set temperature.",
      },
      {
        q: "What is the difference between R22, R410A and R32?",
        a: "R22 is the old refrigerant (pre-2010 units). R410A replaced it (2010–2018). R32 is the newest and most eco-friendly refrigerant used in most units from 2019 onwards. Never mix refrigerant types — only the correct gas for your model should be used.",
      },
      {
        q: "Why does my aircond keep running out of gas?",
        a: "Refrigerant gas does not deplete on its own — if your unit keeps losing gas, there is a leak somewhere. KL Renovator checks for leaks on every gas top-up. If a leak is found, we repair it before topping up.",
      },
      {
        q: "Can I top up gas myself?",
        a: "No — refrigerant handling requires certified equipment and training. Overfilling is as damaging as underfilling. Incorrect refrigerant type can permanently damage the compressor.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga tambah gas aircond di KL & Selangor?",
        a: "Gas R22 bermula dari RM 120. R410A dari RM 150. R32 dari RM 180. Pemeriksaan kebocoran disertakan. Harga berbeza mengikut saiz HP dan jumlah gas diperlukan.",
      },
      {
        q: "Bagaimana saya tahu aircond perlu tambah gas?",
        a: "Tanda biasa: unit meniup udara suam walaupun bersih, ais terbentuk pada paip kuprum, penyamaan luar beroperasi tanpa menyejukkan bilik, atau unit mengambil masa lebih lama untuk mencapai suhu yang ditetapkan.",
      },
      {
        q: "Apa perbezaan R22, R410A dan R32?",
        a: "R22 adalah penyejuk lama (unit sebelum 2010). R410A menggantikannya (2010–2018). R32 adalah yang terbaru dan mesra alam digunakan dalam kebanyakan unit dari 2019 dan seterusnya. Jangan sesekali mencampur jenis penyejuk — hanya gas yang betul untuk model anda boleh digunakan.",
      },
      {
        q: "Mengapa aircond saya terus kehabisan gas?",
        a: "Gas penyejuk tidak berkurangan dengan sendirinya — jika unit anda terus kehilangan gas, ada kebocoran di suatu tempat. KL Renovator memeriksa kebocoran pada setiap tambahan gas.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪冷气充气费用是多少？",
        a: "R22充气从RM 120起。R410A从RM 150起。R32从RM 180起。含泄漏检查。价格因HP大小和充气量略有不同。",
      },
      {
        q: "怎么知道冷气需要充气？",
        a: "常见症状：即使清洁后仍吹温风、铜管或盘管结冰、室外压缩机持续运转但无法制冷，或达到设定温度的时间比平时长得多。",
      },
      {
        q: "R22、R410A和R32有什么区别？",
        a: "R22是旧型冷媒（2010年前的机器）。R410A取代了它（2010–2018年）。R32是最新的环保冷媒，用于2019年以后的大多数机器。切勿混合不同类型的冷媒——只能使用您机器指定的冷媒。",
      },
      {
        q: "为什么我的冷气一直缺气？",
        a: "冷媒不会自然减少——如果您的机器一直缺气，说明某处有泄漏。KL Renovator在每次充气时都会检查泄漏情况。",
      },
    ],
    priceTable: [
      { label: "R22 Gas · 1.0 HP", price: "RM 120" },
      { label: "R22 Gas · 1.5 – 2.0 HP", price: "RM 150" },
      { label: "R22 Gas · 2.5 – 3.0 HP", price: "RM 180" },
      { label: "R410A Gas · 1.0 HP", price: "RM 150" },
      { label: "R410A Gas · 1.5 – 2.0 HP", price: "RM 180" },
      { label: "R410A Gas · 2.5 – 3.0 HP", price: "RM 200" },
      { label: "R32 Gas · 1.0 HP", price: "RM 180" },
      { label: "R32 Gas · 1.5 – 2.0 HP", price: "RM 200" },
      { label: "R32 Gas · 2.5 – 3.0 HP", price: "RM 220" },
    ],
  },

  // ── 4. REPAIR & TROUBLESHOOTING ──────────────────────────────────────────
  "repair": {
    slug: "repair",
    title: "Troubleshooting & Repairs",
    tagline: "Diagnose and fix any aircond fault — capacitors, fan motors, PCB boards, sensors and more.",
    description:
      "When your aircond has an electrical fault, strange noise, blinking error code, or stops working entirely, KL Renovator's trained technicians will diagnose the exact problem and give you a transparent repair quote before any work begins. Parts carried on the van include capacitors, fan motors, contactors, sensors and PCB boards for all major brands.",
    startPrice: "RM 88",
    heroImage: "/hero/aircond-repair-technician-klang-valley.jpg",
    highlights: [
      "RM 88 diagnostic fee (waived if repair done same visit)",
      "All electrical faults diagnosed",
      "Capacitors, fan motors, contactors",
      "PCB board diagnosis & replacement",
      "Sensor & thermostat replacement",
      "Error code reading — all brands",
      "Transparent quote before repair",
      "3-month parts warranty",
    ],
    process: [
      { step: "Diagnose Fault", desc: "Technician inspects indoor and outdoor units, reads error codes and performs electrical tests." },
      { step: "Quote & Confirm", desc: "Clear repair quote given. Work only begins after your approval." },
      { step: "Repair", desc: "Faulty component replaced using correct OEM-spec parts." },
      { step: "Test & Verify", desc: "Full test run to confirm repair successful before technician leaves." },
    ],
    faqs: [
      {
        q: "How much does aircond repair cost in KL & Selangor?",
        a: "Diagnostic fee is RM 88 — this is waived if the repair is completed on the same visit. Common repairs: capacitor replacement RM 100–150, fan motor RM 220–380, PCB board RM 280–600, sensor RM 80–150.",
      },
      {
        q: "My aircond is blinking and won't turn on — what's wrong?",
        a: "Blinking lights are error codes. Common causes include a faulty temperature sensor, dirty coil causing overheating, low gas pressure, PCB fault, or communication error between indoor and outdoor units. KL Renovator reads and resolves all error codes.",
      },
      {
        q: "My aircond trips the MCB — what is causing it?",
        a: "MCB tripping is usually caused by a shorted compressor, faulty capacitor, wiring issue, or earth leakage. This is a serious electrical fault — do not reset and continue using the unit. Call KL Renovator for a same-day diagnosis.",
      },
      {
        q: "Is a diagnosis fee charged even if you can't fix it?",
        a: "The RM 88 diagnostic fee covers the technician's time to identify the fault. If the repair requires a part that needs to be ordered, we quote the part and labour separately and only proceed with your approval.",
      },
      {
        q: "Do you carry spare parts on the van?",
        a: "Yes — our vans carry the most common parts: capacitors, contactors, fan motor capacitors, sensors, drain pumps and minor electrical components for Daikin, Panasonic, Mitsubishi, York, Acson, Midea and more.",
      },
      {
        q: "What warranty do you give on repairs?",
        a: "3-month warranty on all replaced parts. 1-month workmanship warranty. If the same fault recurs within the warranty period, KL Renovator returns at no charge.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga pembaikan aircond di KL & Selangor?",
        a: "Yuran diagnostik adalah RM 88 — ini dikecualikan jika pembaikan diselesaikan pada lawatan yang sama. Pembaikan biasa: penggantian kapasitor RM 100–150, motor kipas RM 220–380, PCB RM 280–600, penderia RM 80–150.",
      },
      {
        q: "Aircond saya berkelip dan tidak mahu hidup — apa masalahnya?",
        a: "Lampu berkelip adalah kod ralat. Punca biasa termasuk penderia suhu rosak, gegelung kotor yang menyebabkan kepanasan berlebihan, tekanan gas rendah, kerosakan PCB, atau ralat komunikasi antara unit dalam dan luar. KL Renovator membaca dan menyelesaikan semua kod ralat.",
      },
      {
        q: "Aircond saya menjatuhkan MCB — apa puncanya?",
        a: "MCB yang jatuh biasanya disebabkan oleh kompresor yang terlitar pintas, kapasitor rosak, masalah pendawaian, atau kebocoran bumi. Ini adalah kerosakan elektrik yang serius — jangan set semula dan teruskan menggunakan unit. Hubungi KL Renovator untuk diagnosis pada hari yang sama.",
      },
      {
        q: "Berapa lama jaminan selepas pembaikan?",
        a: "Jaminan 3 bulan untuk semua bahagian yang diganti. Jaminan 1 bulan untuk kerjatangan. Jika kerosakan yang sama berulang dalam tempoh jaminan, KL Renovator akan kembali tanpa caj.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪冷气维修费用是多少？",
        a: "诊断费为RM 88——如果当次完成维修则免收。常见维修：电容器更换RM 100–150，风扇电机RM 220–380，PCB板RM 280–600，传感器RM 80–150。",
      },
      {
        q: "冷气灯闪烁无法开机——是什么问题？",
        a: "闪烁的指示灯是错误代码。常见原因包括温度传感器故障、盘管脏污导致过热、气压过低、PCB故障，或室内机与室外机之间的通信错误。KL Renovator读取并解决所有错误代码。",
      },
      {
        q: "冷气跳闸——什么原因？",
        a: "跳闸通常由压缩机短路、电容器故障、接线问题或漏电引起。这是严重的电气故障——不要重置后继续使用。请立即联系KL Renovator进行当天诊断。",
      },
      {
        q: "维修后有多长的保修期？",
        a: "所有更换零件提供3个月保修。工艺保修1个月。如果在保修期内出现相同故障，KL Renovator将免费上门。",
      },
    ],
    priceTable: [
      { label: "Diagnostic Fee (waived with repair)", price: "RM 88" },
      { label: "Capacitor Replacement", price: "RM 150 – 250" },
      { label: "Fan Motor Replacement", price: "RM 250 – 380" },
      { label: "PCB Board Replacement", price: "RM 280 – 600" },
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
    tagline: "Professional aircond installation for all brands — clean cable routing, same-day available.",
    description:
      "KL Renovator installs all wall-mounted and ceiling cassette aircond units for residential and commercial properties across KL and Selangor. Every installation includes 7ft copper pipe, wiring, drainage pipe and bracket mounting. Our technicians ensure clean cable routing, correct refrigerant line sizing, and a full commissioning test before handover.",
    startPrice: "RM 199",
    heroImage: "/hero/aircond-installation-kuala-lumpur.jpg",
    highlights: [
      "All brands — Daikin, Panasonic, Mitsubishi, York, Acson & more",
      "Wall-mounted and ceiling cassette",
      "7ft copper pipe included",
      "Wiring and drainage included",
      "Bracket mounting and levelling",
      "Vacuum pump commissioning",
      "Leak test before startup",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Survey & Plan", desc: "Technician surveys wall, electrical supply and drainage route before drilling." },
      { step: "Bracket & Pipe", desc: "Wall bracket mounted, copper pipe and drainage pipe routed and insulated." },
      { step: "Electrical & Outdoor", desc: "Wiring connected, outdoor compressor unit mounted on bracket." },
      { step: "Vacuum & Commission", desc: "System vacuumed to remove moisture, refrigerant released and cooling tested." },
    ],
    faqs: [
      {
        q: "How much does aircond installation cost in KL & Selangor?",
        a: "Wall-mounted installation starts from RM 199 (includes 7ft copper pipe, wiring, drainage and bracket). Ceiling cassette installation from RM 290. Additional copper pipe at RM 25/ft.",
      },
      {
        q: "How long does installation take?",
        a: "A standard wall-mounted installation takes 2–3 hours. Ceiling cassette takes 3–4 hours. Multiple units on the same visit will be done sequentially.",
      },
      {
        q: "Do you supply the aircond unit?",
        a: "KL Renovator provides installation services. You purchase the unit from your preferred retailer (Harvey Norman, AEON, Senheng, etc.) and we handle the professional installation.",
      },
      {
        q: "What is included in the installation package?",
        a: "Standard package includes: 7ft copper pipe (insulated), electrical wiring, drainage pipe, wall bracket, vacuum commissioning, and a full test before handover. Extra copper pipe at RM 25/ft.",
      },
      {
        q: "Can you install any brand?",
        a: "Yes — KL Renovator installs all brands including Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, LG, Samsung, Sharp, Haier and all others.",
      },
      {
        q: "Do I need to buy the compressor bracket separately?",
        a: "Outdoor compressor brackets are included for standard ground or wall-mount installations. Roof-mount or high-rise external wall mounting may have additional bracket fees.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga pasang aircond di KL & Selangor?",
        a: "Pemasangan dinding bermula dari RM 199 (termasuk 7ft paip kuprum, pendawaian, paip longkang dan braket). Ceiling cassette dari RM 290. Paip kuprum tambahan pada RM 25/kaki.",
      },
      {
        q: "Berapa lama masa pemasangan aircond?",
        a: "Pemasangan dinding standard mengambil 2–3 jam. Ceiling cassette mengambil 3–4 jam.",
      },
      {
        q: "Apa yang disertakan dalam pakej pemasangan?",
        a: "Pakej standard merangkumi: 7ft paip kuprum (berpenebat), pendawaian elektrik, paip longkang, braket dinding, commissioning vakum, dan ujian penuh sebelum penyerahan. Paip kuprum tambahan pada RM 25/kaki.",
      },
      {
        q: "Boleh pasang semua jenama?",
        a: "Ya — KL Renovator memasang semua jenama termasuk Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, LG, Samsung, Sharp, Haier dan semua jenama lain.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪安装冷气费用是多少？",
        a: "挂壁式安装从RM 199起（含7尺铜管、电线、排水管和支架）。天花板卡式机从RM 290起。额外铜管每尺RM 25。",
      },
      {
        q: "安装冷气需要多长时间？",
        a: "标准挂壁式安装需要2–3小时。天花板卡式机需要3–4小时。",
      },
      {
        q: "安装套餐包含什么？",
        a: "标准套餐包括：7尺铜管（含隔热层）、电线、排水管、墙壁支架、真空调试和交付前的全面测试。额外铜管每尺RM 25。",
      },
      {
        q: "可以安装所有品牌吗？",
        a: "是的——KL Renovator安装所有品牌，包括大金、松下、三菱、York、Acson、Carrier、美的、LG、三星、夏普、海尔及所有其他品牌。",
      },
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
    priceTableNote: "Standard installation includes 7ft copper pipe, wire, and drain pipe free. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 6. BASIC SERVICING ───────────────────────────────────────────────────
  "basic-servicing": {
    slug: "basic-servicing",
    title: "Basic Servicing",
    tagline: "Essential routine maintenance — filter clean, drain flush, and full diagnostic check.",
    description:
      "Basic servicing is the essential routine maintenance your aircond needs every 3–6 months. The technician cleans the filter and front panel, flushes the drain pipe, sprays the coil with a mild cleaner, checks electrical connections, and tests cooling output. It keeps your unit running efficiently and extends its lifespan. Not a substitute for a chemical wash when deep cleaning is needed.",
    startPrice: "RM 99",
    heroImage: "/hero/aircond-chemical-service-canvas-wrap-kl.jpg",
    highlights: [
      "Filter removal, wash and reinstall",
      "Front panel and casing wipe-down",
      "Drain pipe flush",
      "Coil spray with mild cleaner",
      "Electrical connection check",
      "Cooling output test",
      "Recommended every 3–6 months",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Filter & Panel", desc: "Filter removed, washed and dried. Front panel and casing wiped down." },
      { step: "Coil & Drain", desc: "Evaporator coil sprayed with mild cleaner, drain pipe flushed." },
      { step: "Electrical Check", desc: "Electrical connections and contactors checked for tightness and signs of burning." },
      { step: "Cooling Test", desc: "Cooling output measured and confirmed before handover." },
    ],
    faqs: [
      {
        q: "How much does basic aircond servicing cost in KL & Selangor?",
        a: "Basic servicing starts from RM 99 for a wall-mounted 1.0–1.5 HP unit. RM 120 for 2.0–2.5 HP. All prices confirmed before work begins.",
      },
      {
        q: "How often should I service my aircond?",
        a: "Every 3–4 months for units running 8+ hours daily. Every 6 months for moderate users (4–6 hours/day). Regardless of usage, an annual chemical wash is recommended.",
      },
      {
        q: "What is the difference between basic servicing and chemical wash?",
        a: "Basic servicing cleans the filter, flushes the drain and does a surface coil spray. Chemical wash uses high-pressure chemical spray to deeply clean inside the coil and blower wheel — areas that basic servicing cannot reach.",
      },
      {
        q: "My aircond smells after basic service — why?",
        a: "If the smell persists after basic servicing, it means mould and bacteria are embedded deep inside the coil and blower wheel. A pressure chemical wash or chemical overhaul is needed to eliminate the smell completely.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga servis aircond asas di KL & Selangor?",
        a: "Servis asas bermula dari RM 99 untuk unit dinding 1.0–1.5 HP. RM 120 untuk 2.0–2.5 HP. Semua harga disahkan sebelum kerja dimulakan.",
      },
      {
        q: "Berapa kerap saya perlu servis aircond?",
        a: "Setiap 3–4 bulan untuk unit yang beroperasi 8+ jam sehari. Setiap 6 bulan untuk pengguna sederhana (4–6 jam/hari). Tanpa mengira penggunaan, cucian kimia tahunan adalah disyorkan.",
      },
      {
        q: "Apa perbezaan servis asas dan cuci kimia?",
        a: "Servis asas membersihkan penapis, membilas longkang dan menyembur gegelung secara permukaan. Cuci kimia menggunakan semburan kimia tekanan tinggi untuk membersihkan bahagian dalam gegelung dan kipas — kawasan yang tidak dapat dicapai dengan servis asas.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪基本冷气保养费用是多少？",
        a: "挂壁式1.0–1.5 HP基本保养从RM 99起。2.0–2.5 HP为RM 120。所有价格在开始工作前确认。",
      },
      {
        q: "冷气应该多久保养一次？",
        a: "每天使用8小时以上的每3–4个月保养一次。中度使用者（每天4–6小时）每6个月保养一次。无论使用频率如何，建议每年进行一次化学清洗。",
      },
      {
        q: "基本保养和化学清洗有什么区别？",
        a: "基本保养清洁过滤网、冲洗排水管并对盘管进行表面喷雾。化学清洗使用高压化学喷雾深度清洁盘管内部和风轮——基本保养无法触及这些区域。",
      },
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
    tagline: "Specialist commercial ceiling cassette servicing — chemical wash, overhaul and repair for all brands.",
    description:
      "Ceiling cassette aircond units are the standard for offices, retail shops, restaurants and commercial spaces across KL and Selangor. KL Renovator specialises in ceiling cassette servicing, chemical wash and chemical overhaul, including VRF/VRV multi-zone systems. Technicians are trained to access and service ceiling-mounted units safely and efficiently.",
    startPrice: "RM 150",
    heroImage: "/hero/aircond-ceiling-cassette-installation-commercial.jpg",
    highlights: [
      "Specialist ceiling cassette technicians",
      "Chemical wash from RM 220",
      "Chemical overhaul from RM 380",
      "VRF / VRV multi-zone systems",
      "All brands — Daikin, Mitsubishi, York, Carrier",
      "Drain pan and tray deep clean",
      "Blower wheel removal and wash",
      "Commercial scheduling — off-hours available",
    ],
    process: [
      { step: "Access & Protect", desc: "Technician safely accesses ceiling unit. Drop sheets protect floor and furniture below." },
      { step: "Dismantle & Clean", desc: "Ceiling panel, filter, coil, drain pan and blower wheel removed and chemically cleaned." },
      { step: "Drain Flush", desc: "Drain pipe and tray flushed and cleared. Blockage is the most common cause of ceiling cassette leaking." },
      { step: "Reassemble & Test", desc: "Unit reassembled, cooling and drainage tested, ceiling panel replaced." },
    ],
    faqs: [
      {
        q: "How much does ceiling cassette servicing cost in KL?",
        a: "Basic servicing from RM 150. Chemical wash from RM 220. Chemical overhaul from RM 380. Exact price confirmed on-site before work begins.",
      },
      {
        q: "My ceiling cassette is dripping water — what should I do?",
        a: "Stop using the unit immediately to prevent ceiling damage. This is almost always caused by a blocked drain pipe or dirty drain pan. KL Renovator can diagnose and fix same-day.",
      },
      {
        q: "How often should a ceiling cassette be serviced?",
        a: "Every 3–6 months for commercial premises with regular use. Quarterly servicing is recommended for food & beverage outlets or high-humidity environments.",
      },
      {
        q: "Do you service VRF / VRV multi-zone commercial systems?",
        a: "Yes. KL Renovator services VRF/VRV systems by Daikin, Mitsubishi, Panasonic and other brands in commercial settings.",
      },
      {
        q: "Can you service after business hours?",
        a: "Yes — KL Renovator offers off-hours commercial servicing (evenings and weekends) to minimise disruption to your business. Contact us to arrange.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga servis ceiling cassette di KL?",
        a: "Servis asas dari RM 150. Cuci kimia dari RM 220. Chemical overhaul dari RM 380. Harga tepat disahkan di tapak sebelum kerja dimulakan.",
      },
      {
        q: "Ceiling cassette saya menitis air — apa yang perlu dilakukan?",
        a: "Hentikan penggunaan unit segera untuk mengelakkan kerosakan siling. Ini hampir selalu disebabkan oleh paip longkang tersumbat atau dulang longkang kotor. KL Renovator boleh mendiagnosis dan membaiki pada hari yang sama.",
      },
      {
        q: "Berapa kerap ceiling cassette perlu diservis?",
        a: "Setiap 3–6 bulan untuk premis komersial dengan penggunaan biasa. Servis suku tahunan disyorkan untuk tempat makan atau persekitaran kelembapan tinggi.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡天花板卡式机保养费用是多少？",
        a: "基本保养从RM 150起。化学清洗从RM 220起。化学大修从RM 380起。确切价格在现场开工前确认。",
      },
      {
        q: "我的天花板卡式机滴水——该怎么办？",
        a: "立即停止使用，以防损坏天花板。这几乎总是由排水管堵塞或排水盘脏污引起的。KL Renovator可以当天诊断和修复。",
      },
      {
        q: "天花板卡式机应该多久保养一次？",
        a: "定期使用的商业场所每3–6个月一次。餐饮场所或高湿度环境建议每季度保养一次。",
      },
    ],
    priceTable: [
      { label: "Basic Service · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Basic Service · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Basic Service · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Chemical Wash · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Chemical Wash · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Chemical Wash · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Chemical Overhaul · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "Chemical Overhaul · 3.5 – 5.0 HP", price: "RM 500" },
    ],
  },

  // ── 8. DISMANTLE & RELOCATION ────────────────────────────────────────────
  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantle & Relocation",
    tagline: "Safe aircond extraction and professional reinstallation at your new location.",
    description:
      "Moving home or office? KL Renovator safely dismantles your existing aircond unit, recovers the refrigerant gas, and professionally reinstalls it at your new location. The process includes removal of the indoor unit, outdoor compressor, copper pipe and wiring — and full recommissioning at the new site.",
    startPrice: "RM 90",
    heroImage: "/hero/aircond-compressor-bracket-installation-kl.jpg",
    highlights: [
      "Safe dismantle of indoor and outdoor units",
      "Refrigerant recovery (no gas wasted)",
      "Full reinstall at new location",
      "New copper pipe if required",
      "Vacuum commissioning at new site",
      "All brands handled",
      "Same-day available",
      "1-month workmanship warranty",
    ],
    process: [
      { step: "Recover Gas", desc: "Refrigerant gas safely recovered from the system before dismantle." },
      { step: "Dismantle", desc: "Indoor unit, outdoor unit, copper pipe and wiring carefully removed." },
      { step: "Transport & Protect", desc: "Units transported safely and protected from damage during transit." },
      { step: "Reinstall & Commission", desc: "Full reinstallation at new location, vacuum, gas released and cooling tested." },
    ],
    faqs: [
      {
        q: "How much does aircond dismantle and relocation cost in KL?",
        a: "Dismantle only starts from RM 90. Dismantle and full reinstall from RM 250 (includes refrigerant recovery, new installation at new location, 7ft copper pipe). Additional copper pipe at RM 25/ft.",
      },
      {
        q: "Will my aircond gas be lost during relocation?",
        a: "No — KL Renovator safely recovers the refrigerant gas before dismantling. The recovered gas is reused at the new installation, so you do not need to top up unless there is a leak.",
      },
      {
        q: "How long does dismantle and relocation take?",
        a: "Approximately 3–4 hours for a single unit including dismantle, transport and full reinstall.",
      },
      {
        q: "Can I reuse my existing copper pipe at the new location?",
        a: "Copper pipe is fixed to the wall and cannot be reused. New copper pipe is included in the relocation package.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga tanggal dan pindah aircond di KL?",
        a: "Tanggal sahaja bermula dari RM 90. Tanggal dan pasang semula dari RM 250 (termasuk pemulihan penyejuk, pemasangan baru di lokasi baru, 7ft paip kuprum). Paip kuprum tambahan pada RM 25/kaki.",
      },
      {
        q: "Adakah gas aircond saya akan hilang semasa pindah?",
        a: "Tidak — KL Renovator memulihkan gas penyejuk dengan selamat sebelum menanggal. Gas yang dipulihkan digunakan semula di pemasangan baru.",
      },
      {
        q: "Berapa lama masa yang diperlukan untuk tanggal dan pindah?",
        a: "Lebih kurang 3–4 jam untuk satu unit termasuk tanggal, pengangkutan dan pasang semula penuh.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡冷气拆机和搬迁费用是多少？",
        a: "仅拆机从RM 90起。拆机加完整重装从RM 250起（含冷媒回收、在新地点重新安装、7尺铜管）。额外铜管每尺RM 25。",
      },
      {
        q: "搬迁时冷气的气体会损失吗？",
        a: "不会——KL Renovator在拆机前会安全回收冷媒气体。回收的气体在新安装时重复使用。",
      },
      {
        q: "拆机和搬迁需要多长时间？",
        a: "单台机器包括拆机、运输和完整重装大约需要3–4小时。",
      },
    ],
    priceTable: [
      { label: "Dismantle Only (indoor + outdoor)", price: "RM 90" },
      { label: "Dismantle + Reinstall Same Place (standard)", price: "RM 250" },
      { label: "Dismantle + Reinstall Same Place (2.0–2.5 HP)", price: "RM 290" },
      { label: "Dismantle + Reinstall Other Place", price: "RM 350" },
    ],
    priceTableNote: "7ft copper pipe, wire, and drain pipe are free with reinstallation. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 9. EMERGENCY AIRCOND REPAIR ──────────────────────────────────────────
  "emergency": {
    slug: "emergency",
    title: "Emergency Aircond Repair",
    tagline: "Same-day emergency response for complete breakdowns, heavy water leaks, outdoor unit failure, and urgent repairs across KL & Selangor.",
    description:
      "When your aircond suddenly stops working, leaks heavily, or trips the MCB, you need help today — not tomorrow. KL Renovator dispatches trained technicians across all of Kuala Lumpur and Selangor for same-day emergency diagnosis and repair. Diagnostic fee RM 88, waived if repair completed same visit. Most emergency jobs dispatched within 30–60 minutes of WhatsApp confirmation.",
    startPrice: "RM 88",
    heroImage: "/hero/aircond-repair-technician-klang-valley.jpg",
    highlights: [
      "Same-day dispatch across all KL & Selangor",
      "30–60 min response after confirmation",
      "Diagnostic RM 88 — waived if repaired same visit",
      "All brands serviced",
      "Capacitor, fan motor, PCB repairs same-day",
      "Emergency drain clearing same-day",
      "After-hours until 10pm (RM 50 surcharge)",
      "Transparent quote before work begins",
    ],
    process: [
      { step: "WhatsApp Now", desc: "Send your location, unit count and problem to +60182983573. We respond in minutes." },
      { step: "Confirm Quote", desc: "Diagnostic fee and estimated repair cost confirmed before dispatch. No surprises." },
      { step: "Technician Dispatched", desc: "Nearest trained technician dispatched immediately. Most arrivals within 30–60 minutes." },
      { step: "Diagnose & Fix", desc: "Full on-site diagnosis, repair quoted and completed same visit where possible." },
    ],
    faqs: [
      {
        q: "Does KL Renovator offer same-day emergency aircond repair in KL?",
        a: "Yes — KL Renovator provides same-day emergency repair across all KL and Selangor areas. WhatsApp +60182983573 for fastest response. Most emergency jobs dispatched within 30–60 minutes of confirmation.",
      },
      {
        q: "How much is the emergency aircond repair diagnostic fee?",
        a: "Diagnostic fee is RM 88 during standard hours (9am–6pm). This is waived if the repair is completed on the same visit. After-hours jobs (6pm–10pm) carry a RM 50 overtime surcharge, making the diagnostic RM 138 (also waived if repaired).",
      },
      {
        q: "What counts as an aircond emergency?",
        a: "Complete breakdown with no cooling, heavy water leak near furniture or electrics, sparks or burning smell, outdoor unit completely stopped, or any situation affecting a server room, medical space, or home with elderly or infant.",
      },
      {
        q: "My aircond suddenly stopped working — what should I do first?",
        a: "Step 1: Check your MCB panel — it may have tripped. Step 2: Replace the remote battery. If still not working, WhatsApp KL Renovator at +60182983573 immediately for same-day emergency diagnosis.",
      },
      {
        q: "Does KL Renovator cover emergency service in Selangor?",
        a: "Yes — KL Renovator covers all of Selangor for emergency service including Petaling Jaya, Subang Jaya, Shah Alam, Klang, Kajang, Puchong, Ampang, Damansara, Batu Caves, Selayang and all surrounding areas.",
      },
      {
        q: "Can KL Renovator come after working hours for an emergency?",
        a: "Yes — KL Renovator accepts emergency bookings until 10pm. Jobs confirmed after 6pm carry a RM 50 overtime surcharge. WhatsApp +60182983573 even after hours — we will respond.",
      },
    ],
    faqsBM: [
      {
        q: "Adakah KL Renovator menawarkan pembaikan aircond kecemasan hari sama di KL?",
        a: "Ya — KL Renovator menyediakan pembaikan kecemasan hari sama merentasi semua kawasan KL dan Selangor. WhatsApp +60182983573 untuk respons terpantas. Kebanyakan kerja kecemasan dihantar dalam 30–60 minit selepas pengesahan.",
      },
      {
        q: "Berapa caj diagnostik pembaikan aircond kecemasan?",
        a: "Caj diagnostik ialah RM 88 semasa waktu standard (9am–6pm). Ini dikecualikan jika pembaikan diselesaikan dalam lawatan yang sama. Kerja luar waktu (6pm–10pm) dikenakan tambahan RM 50.",
      },
      {
        q: "Aircond saya tiba-tiba rosak — apa yang perlu saya buat dahulu?",
        a: "Langkah 1: Periksa panel MCB anda — mungkin telah jatuh. Langkah 2: Tukar bateri remote. Jika masih tidak berfungsi, WhatsApp KL Renovator di +60182983573 segera.",
      },
    ],
    faqsZH: [
      {
        q: "KL Renovator是否提供吉隆坡当天紧急冷气维修？",
        a: "是的——KL Renovator在吉隆坡和雪兰莪所有地区提供当天紧急维修。WhatsApp +60182983573获得最快响应。大多数紧急工作在确认后30-60分钟内派遣技术员。",
      },
      {
        q: "紧急冷气维修诊断费是多少？",
        a: "标准时间（上午9点至下午6点）诊断费为RM 88。如果在同次上门完成维修则免收。下午6点至晚上10点的工作加收RM 50加班费。",
      },
      {
        q: "冷气突然停止工作——我应该先做什么？",
        a: "第1步：检查MCB面板——可能已跳闸。第2步：更换遥控器电池。如果仍不工作，立即WhatsApp KL Renovator至+60182983573。",
      },
    ],
    priceTable: [
      { label: "Diagnostic Fee (Standard Hours 9am–6pm)", price: "RM 88" },
      { label: "Diagnostic Fee (waived if repaired same visit)", price: "FREE" },
      { label: "After-Hours Surcharge (6pm–10pm)", price: "RM 50" },
      { label: "Capacitor Replacement (most common emergency)", price: "RM 180" },
      { label: "Fan Motor Replacement (indoor)", price: "RM 250–350" },
      { label: "Fan Motor Replacement (outdoor)", price: "RM 300–450" },
      { label: "PCB Board Replacement", price: "RM 300–600" },
      { label: "Emergency Drain Pipe Clearing", price: "RM 120" },
      { label: "Compressor Replacement (quoted before work)", price: "RM 600–2,000" },
    ],
  },
};
