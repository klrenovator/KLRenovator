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
    heroImage: "/hero/aircond-pressure-chemical-wash-selangor.webp",
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
    heroImage: "/hero/aircond-chemical-overhaul-ampang-selangor.webp",
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
        a: "Chemical overhaul starts from RM 220 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette from RM 430. All prices confirmed before work begins.",
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
        a: "Chemical overhaul bermula dari RM 220 untuk unit dinding 1.0–1.5 HP. Ceiling cassette dari RM 430. Semua harga disahkan sebelum kerja dimulakan.",
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
        a: "挂壁式1.0–1.5 HP化学大修从RM 220起。天花板卡式机从RM 430起。所有价格在开始工作前确认。",
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
    heroImage: "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
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
    heroImage: "/hero/aircond-repair-technician-klang-valley.webp",
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
        a: "Diagnostic fee is RM 88 — this is waived if the repair is completed on the same visit. Common repairs: capacitor replacement RM 150–250, fan motor RM 250–380, PCB board RM 280–600, sensor RM 150–250.",
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
        a: "Yuran diagnostik adalah RM 88 — ini dikecualikan jika pembaikan diselesaikan pada lawatan yang sama. Pembaikan biasa: penggantian kapasitor RM 150–250, motor kipas RM 250–380, PCB RM 280–600, penderia RM 150–250.",
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
        a: "诊断费为RM 88——如果当次完成维修则免收。常见维修：电容器更换RM 150–250，风扇电机RM 250–380，PCB板RM 280–600，传感器RM 150–250。",
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
    tagline: "Professional aircond installation for all brands — clean cable routing, correct pipe sizing, and full vacuum commissioning. Same-day available.",
    description:
      "A poorly installed aircond can lose 20–30% of its efficiency before it even runs its first hour. Incorrect copper pipe sizing, skipped vacuum evacuation, loose flare connections, or sloppy cable routing will cause gas leaks, premature compressor failure, and electricity bills higher than they should be. KL Renovator installs wall-mounted, ceiling cassette, and window units for homes, condos, shoplots, and offices across KL and Selangor — and we bring genuine HVAC training to every job. Every installation includes: 7ft of correctly sized copper pipe (insulated), electrical wiring, drainage pipe, wall/floor bracket, full vacuum pump evacuation, pressure leak test, and a commissioning run that verifies cooling output, airflow, and thermostat calibration. RM 199 for a standard wall-mounted 1.0–1.5 HP unit — price confirmed before we drill a single hole.",
    startPrice: "RM 199",
    heroImage: "/hero/aircond-installation-kuala-lumpur.webp",
    highlights: [
      "All 20 brands — Daikin, Panasonic, Mitsubishi, York, Acson, Midea & more",
      "Wall-mounted, ceiling cassette & window units",
      "7ft copper pipe included — correctly sized to HP, not universal thin-gauge",
      "Electrical wiring + drainage pipe + bracket all included",
      "Vacuum pump evacuation mandatory — we never skip this step",
      "Pressure leak test with nitrogen before releasing refrigerant",
      "Clean cable trunking — no visible loose wires along your wall",
      "1-month workmanship warranty + written installation checklist",
    ],
    process: [
      { step: "Pre-Installation Survey", desc: "Technician checks wall strength, electrical supply capacity, drainage fall, and outdoor condenser placement. Measurements confirmed before any drilling. Condo rules checked — we coordinate with management if needed." },
      { step: "Bracket, Pipe & Cable Run", desc: "Wall bracket levelled and anchored. Copper pipes cut to exact length, flared, insulated, and routed neatly through wall penetration. Drainage pipe set with correct downward gradient so water flows naturally." },
      { step: "Outdoor Unit & Electrical", desc: "Condenser unit mounted on bracket with rubber vibration pads. Electrical isolator switch installed near outdoor unit (required by Malaysian regulations). Wiring routed through dedicated conduit, not shared with other circuits." },
      { step: "Vacuum, Leak Test & Commission", desc: "System evacuated with vacuum pump for minimum 15–20 minutes to remove all moisture and air. Nitrogen pressure test confirms no leaks. Refrigerant released, cooling tested across all fan speeds, thermostat calibrated, and job card signed." },
    ],
    faqs: [
      {
        q: "How much does aircond installation cost in KL & Selangor?",
        a: "Wall-mounted 1.0–1.5 HP installation starts from RM 199 (includes 7ft copper pipe, wiring, drainage, and bracket). 2.0 HP from RM 249, 2.5 HP from RM 279. Ceiling cassette from RM 290. Window unit from RM 199. Additional copper pipe above 7ft: RM 25/ft. These are the prices you pay — confirmed before we start.",
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
        a: "The RM 199 standard wall-mounted package includes: (1) Site survey and wall assessment, (2) 7ft copper pipe correctly sized to your unit's HP with proper insulation, (3) Electrical wiring from isolator to indoor unit through dedicated conduit, (4) PVC drainage pipe with proper fall gradient, (5) Wall bracket with rubber vibration pads, (6) Vacuum pump evacuation (minimum 15 min), (7) Nitrogen pressure leak test, (8) Full commissioning — cooling, airflow, thermostat calibration, (9) Written job card and 1-month workmanship warranty. Extra copper pipe beyond 7ft: RM 25/ft.",
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
    ],
    faqsBM: [
      {
        q: "Berapa harga pemasangan aircond di KL & Selangor?",
        a: "Pemasangan dinding 1.0–1.5 HP bermula dari RM 199 (termasuk 7 kaki paip kuprum, pendawaian, paip longkang, dan braket). 2.0 HP dari RM 249, 2.5 HP dari RM 279. Ceiling cassette dari RM 290. Unit tingkap dari RM 199. Paip kuprum tambahan melebihi 7 kaki: RM 25/kaki. Ini harga yang anda bayar — disahkan sebelum kami mula.",
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
        a: "Pakej standard dinding RM 199 merangkumi: (1) Tinjauan tapak dan penilaian dinding, (2) 7 kaki paip kuprum bersaiz betul mengikut HP unit anda dengan penebat yang betul, (3) Pendawaian elektrik dari pengasing ke unit dalaman melalui konduit khusus, (4) Paip longkang PVC dengan kecerunan jatuh yang betul, (5) Braket dinding dengan pad getah getaran, (6) Evakuasi pam vakum (minimum 15 min), (7) Ujian kebocoran tekanan nitrogen, (8) Pentauliahan penuh — penyejukan, aliran udara, penentukuran termostat, (9) Kad kerja bertulis dan waranti mutu kerja 1 bulan. Paip kuprum tambahan melebihi 7 kaki: RM 25/kaki.",
      },
      {
        q: "Bolehkah anda memasang semua jenama aircond?",
        a: "Ya — kami memasang semua 20 jenama utama yang dijual di Malaysia: Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, dan Isonic. Jenis inverter dan bukan inverter, bahan pendingin R32 dan R410A. Kami memadankan diameter paip dan spesifikasi pemasangan mengikut keperluan pengeluar, bukan pendekatan satu saiz untuk semua.",
      },
      {
        q: "Pihak pengurusan kondo saya ada peraturan renovasi yang ketat — bolehkah anda mematuhinya?",
        a: "Kami memasang di kondo tinggi di seluruh KL dan Selangor setiap minggu — KLCC, Mont Kiara, Bangsar, Damansara, Sentul, dan banyak lagi. Kami mematuhi peraturan khusus setiap bangunan: waktu bekerja, penutup lantai pelindung di lif dan koridor, had bunyi, dan prosedur pelupusan sisa. Jika pihak pengurusan memerlukan permit renovasi atau borang indemniti, beritahu kami lebih awal dan kami akan sediakan dokumen yang diperlukan. Kawasan umum mesti ditinggalkan seperti keadaan asal.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪安装冷气费用是多少？",
        a: "挂壁式1.0–1.5 HP安装从RM 199起（含7尺铜管、电线、排水管和支架）。2.0 HP从RM 249起，2.5 HP从RM 279起。天花板卡式机从RM 290起。窗式机从RM 199起。超出7尺的额外铜管：RM 25/尺。这是您支付的价格——开工前确认。",
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
        a: "RM 199标准挂壁式套餐包括：（1）现场勘查和墙体评估，（2）7尺铜管按您机器的HP正确配管并带正确隔热，（3）从隔离开关到室内机通过专用线管的电线，（4）带正确下坡度的PVC排水管，（5）带橡胶减震垫的墙壁支架，（6）真空泵抽真空（最少15分钟），（7）氮气压力泄漏测试，（8）全面调试——制冷、风量、温控器校准，（9）书面工作卡和1个月工艺保修。超出7尺的额外铜管：RM 25/尺。",
      },
      {
        q: "可以安装所有冷气品牌吗？",
        a: "可以——我们安装马来西亚销售的所有20个主要品牌：大金、松下、三菱、Acson、York、Carrier、美的、海尔、东芝、日立、三星、LG、夏普、富士通、格力、National、海信、Aux、TCL和Isonic。变频和非变频，R32和R410A制冷剂类型。我们根据制造商要求匹配管道直径和安装规格，而非一刀切的做法。",
      },
      {
        q: "我的公寓管理处有严格的装修规定——你们能遵守吗？",
        a: "我们每周在吉隆坡和雪兰莪的高层公寓安装——KLCC、Mont Kiara、Bangsar、Damansara、Sentul等等。我们遵守每栋大楼的具体规定：工作时间、电梯和走廊的保护地板覆盖、噪音限制和废物处理程序。如果管理处需要装修许可或赔偿表格，请提前告知我们，我们会准备所需文件。公共区域必须保持原样。",
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
    tagline: "Essential routine maintenance — filter clean, drain flush, and full diagnostic check. RM 99, 45 minutes, keeps your unit healthy between deep cleans.",
    description:
      "Basic servicing is what keeps your aircond running smoothly between chemical washes — like changing your car's engine oil, not rebuilding the engine. In about 45 minutes per unit, our technician removes and washes the filters, flushes the drain pipe to prevent water leaks before they start, sprays the evaporator coil with a mild anti-bacterial cleaner, checks every electrical connection and contactor for tightness and burning, measures the actual cooling output temperature, and confirms the thermostat is calibrated correctly. For units running 8+ hours a day in Malaysian heat and humidity, we recommend this every 3–4 months. For moderate users, every 6 months is enough. It is affordable preventive maintenance that catches small problems — loose wiring, early drain clogs, refrigerant pressure trending low — before they become expensive repairs. RM 99 for a wall-mounted 1.0–1.5 HP unit, price confirmed before we start.",
    startPrice: "RM 99",
    heroImage: "/hero/aircond-chemical-service-canvas-wrap-kl.webp",
    highlights: [
      "Filter removal, deep wash, dry & reinstall — not just a quick rinse",
      "Front panel, casing & louvres wiped down completely",
      "Drain pipe flushed with water pressure — prevents future water leaks",
      "Evaporator coil sprayed with anti-bacterial mild cleaner",
      "Electrical connections & contactors checked for tightness and heat damage",
      "Cooling output temperature measured with digital thermometer",
      "Thermostat calibration verified — unit stops/starts at the right temperature",
      "Recommended every 3–4 months for heavy use, every 6 months for normal use",
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
        a: "Wall-mounted 1.0–1.5 HP: RM 99. Wall-mounted 2.0–2.5 HP: RM 120. Wall-mounted 3.0–3.5 HP: RM 150. Ceiling cassette: RM 150–250 depending on HP. Window unit: RM 99–120. Every price is confirmed with you before the technician begins work. Multi-unit discounts: 5% off for 2–3 units, 10% off for 4–8 units, 15% off for 8+ units on the same visit.",
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
        a: "No — basic servicing is a cleaning and inspection service. If our technician's cooling test shows the refrigerant pressure is low (temperature drop less than 8°C after cleaning), they will inform you and quote a gas top-up separately (from RM 120). Aircond systems do not consume refrigerant — if the gas is low, there is a leak somewhere. We will check for obvious leak points (flare connections, service valves) and advise whether a top-up is enough or a leak repair is needed.",
      },
      {
        q: "Can I do basic servicing myself?",
        a: "You can wash the filters yourself every month — pop them out, rinse with water, let them dry, reinstall. That takes 5 minutes and genuinely helps airflow between professional services. But the drain flush, electrical check, coil spray, and cooling performance test require opening the unit, accessing internal components, and using a digital thermometer and multimeter. These steps catch problems you cannot see from the outside. At RM 99, professional basic servicing is cheaper than a water-damaged ceiling or a burnt compressor.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga servis asas aircond di KL & Selangor?",
        a: "Dinding 1.0–1.5 HP: RM 99. Dinding 2.0–2.5 HP: RM 120. Dinding 3.0–3.5 HP: RM 150. Ceiling cassette: RM 150–250 bergantung pada HP. Unit tingkap: RM 99–120. Setiap harga disahkan dengan anda sebelum juruteknik memulakan kerja. Diskaun pelbagai unit: 5% diskaun untuk 2–3 unit, 10% untuk 4–8 unit, 15% untuk 8+ unit pada lawatan yang sama.",
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
        a: "Tidak — servis asas adalah perkhidmatan pembersihan dan pemeriksaan. Jika ujian penyejukan juruteknik kami menunjukkan tekanan bahan pendingin rendah (penurunan suhu kurang daripada 8°C selepas pembersihan), mereka akan memaklumkan anda dan mengkuotakan tambah gas secara berasingan (dari RM 120). Sistem aircond tidak menggunakan bahan pendingin — jika gas rendah, ada kebocoran di suatu tempat. Kami akan memeriksa titik kebocoran yang jelas (sambungan flare, injap servis) dan menasihatkan sama ada tambah gas sahaja mencukupi atau pembaikan kebocoran diperlukan.",
      },
    ],
    faqsZH: [
      {
        q: "吉隆坡和雪兰莪基本冷气保养费用是多少？",
        a: "挂壁式1.0–1.5 HP：RM 99。挂壁式2.0–2.5 HP：RM 120。挂壁式3.0–3.5 HP：RM 150。天花板卡式：RM 150–250视HP而定。窗式：RM 99–120。每项价格在技术员开始工作前与您确认。多台折扣：2-3台享5%折扣，4-8台享10%折扣，8台以上同次上门享15%折扣。",
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
        a: "不包含——基本保养是清洁和检查服务。如果我们技术员的制冷测试显示冷媒压力低（清洁后温差低于8°C），他们会通知您并单独报价加气服务（从RM 120起）。冷气系统不会消耗制冷剂——如果气体不足，说明某处有泄漏。我们会检查明显的泄漏点（喇叭口接头、检修阀）并建议仅加气是否足够还是需要修复泄漏。",
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
      "Ceiling cassette aircond units are the standard for offices, retail shops, restaurants and commercial spaces across KL and Selangor. KL Renovator specialises in ceiling cassette servicing, chemical wash and chemical overhaul for shops, offices, and multi-unit commercial premises. Technicians are trained to access and service ceiling-mounted units safely and efficiently.",
    startPrice: "RM 150",
    heroImage: "/hero/aircond-ceiling-cassette-installation-commercial.webp",
    highlights: [
      "Specialist ceiling cassette technicians",
      "Chemical wash from RM 220",
      "Chemical overhaul from RM 430",
      "Multi-unit commercial servicing",
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
        a: "Basic servicing from RM 150. Chemical wash from RM 220. Chemical overhaul from RM 430. Installation from RM 290. Exact price confirmed on-site before work begins.",
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
        q: "Do you service multiple ceiling cassette units across a commercial premise?",
        a: "Yes. KL Renovator services multiple ceiling cassette and wall-mounted units across shops, offices, restaurants, and larger commercial premises by Daikin, Mitsubishi, Panasonic and other brands, with coordinated scheduling for the whole site.",
      },
      {
        q: "Can you service after business hours?",
        a: "Yes — KL Renovator offers off-hours commercial servicing (evenings and weekends) to minimise disruption to your business. Contact us to arrange.",
      },
    ],
    faqsBM: [
      {
        q: "Berapa harga servis ceiling cassette di KL?",
        a: "Servis asas dari RM 150. Cuci kimia dari RM 220. Chemical overhaul dari RM 430. Pemasangan dari RM 290. Harga tepat disahkan di tapak sebelum kerja dimulakan.",
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
        a: "基本保养从RM 150起。化学清洗从RM 220起。化学大修从RM 430起。安装从RM 290起。确切价格在现场开工前确认。",
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
      { label: "Installation · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Installation · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Installation · 3.5 – 6.0 HP", price: "RM 400" },
    ],
    priceTableNote: "Installation includes 7ft copper pipe, wire, and drain pipe free. Anything beyond 7ft, or any bracket / casing / electrical / access work, is charged per the Additional Materials & Special Charges rates below.",
  },

  // ── 8. DISMANTLE & RELOCATION ────────────────────────────────────────────
  "dismantling-relocation": {
    slug: "dismantling-relocation",
    title: "Dismantle & Relocation",
    tagline: "Safe aircond extraction and professional reinstallation at your new location.",
    description:
      "Moving home or office? KL Renovator safely dismantles your existing aircond unit, recovers the refrigerant gas, and professionally reinstalls it at your new location. The process includes removal of the indoor unit, outdoor compressor, copper pipe and wiring — and full recommissioning at the new site.",
    startPrice: "RM 90",
    heroImage: "/hero/aircond-compressor-bracket-installation-kl.webp",
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
      "Your aircond just died at 11pm, the room is 32°C, and you have a presentation at 8am. Or water is dripping onto your TV cabinet and you cannot switch off the unit because the house has no other cooling. This is not a \"book for next Tuesday\" situation — this is when you WhatsApp KL Renovator immediately. We dispatch trained HVAC technicians same-day across all 50+ Klang Valley suburbs within 30–60 minutes of confirmation. The RM 88 diagnostic fee is fully waived if the repair is completed same visit. Our vans carry common spare parts — capacitors, fan motors, PCB boards, sensors, contactors, drain hoses, refrigerant — so most emergencies are fully resolved in the first visit, not just patched temporarily.",
    startPrice: "RM 88",
    heroImage: "/hero/aircond-repair-technician-klang-valley.webp",
    highlights: [
      "Same-day dispatch — 30–60 min arrival after WhatsApp confirmation",
      "Diagnostic RM 88 — fully waived if repaired same visit",
      "After-hours until 10pm (RM 50 overtime surcharge, also waived if repaired)",
      "All 20 brands — Daikin, Panasonic, Mitsubishi, York, Midea & more",
      "Most common parts stocked in every van — capacitor, fan motor, PCB, sensor, drain hose",
      "Emergency drain clearing — indoor water leak stopped same-day",
      "Server room / office / shoplot commercial emergency covered",
      "Elderly / infant at home? Tell us — we prioritise vulnerable households",
    ],
    process: [
      { step: "WhatsApp Your Emergency", desc: "Tell us your location, brand, unit count, and what happened. Photos of the unit and outdoor condenser help speed diagnosis. We reply within minutes." },
      { step: "Get Confirmed Price", desc: "Diagnostic fee quoted upfront. Estimated repair range shared based on your description — capacitor ~RM 180, fan motor RM 250–350, PCB RM 300–600. No surprise bills." },
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
        a: "Diagnostic fee is RM 88 during standard hours (9am–6pm), fully waived if the repair is completed on the same visit. After-hours (6pm–10pm) adds a RM 50 surcharge — so RM 138 diagnostic total, also waived if repaired. Most common emergency repairs: capacitor replacement ~RM 180, indoor fan motor ~RM 250–350, PCB board ~RM 300–600, drain clearing ~RM 120. Every repair price is confirmed with you BEFORE any work starts.",
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
    ],
    faqsBM: [
      {
        q: "Aircond saya tiba-tiba rosak — apa yang perlu saya buat dahulu?",
        a: "Tiga langkah pantas sebelum WhatsApp kami: (1) Periksa papan MCB/agihan — jika pemutus litar aircond telah jatuh, set semula sekali. Jika jatuh lagi, JANGAN set semula — hubungi kami, ada risiko litar pintas. (2) Tukar bateri alat kawalan jauh — bateri lemah menyebabkan simptom 'mati' sekejap-sekejap. (3) Periksa sama ada peralatan lain di litar yang sama berfungsi — kadangkala hanya satu fasa yang terputus. Jika ketiga-tiganya baik dan unit masih mati, WhatsApp +60182983573 segera.",
      },
      {
        q: "Berapa caj pembaikan aircond kecemasan di KL & Selangor?",
        a: "Caj diagnostik RM 88 untuk waktu standard (9am–6pm), dikecualikan sepenuhnya jika pembaikan diselesaikan pada lawatan yang sama. Waktu luar (6pm–10pm) dikenakan surcaj RM 50 — jadi jumlah RM 138, juga dikecualikan jika dibaiki. Pembaikan kecemasan paling biasa: penggantian kapasitor ~RM 180, motor kipas dalaman ~RM 250–350, papan PCB ~RM 300–600, pembersihan longkang ~RM 120. Setiap harga pembaikan disahkan dengan anda SEBELUM sebarang kerja dimulakan.",
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
    ],
    faqsZH: [
      {
        q: "冷气突然停止工作——联系你们之前我该做什么？",
        a: "联系我们之前请做三个快速检查：（1）检查MCB/配电板——如果冷气断路器跳闸，复位一次。如果再次跳闸，请勿再复位——联系我们有短路风险。（2）更换遥控器电池——电量不足会导致间歇性“死机”症状。（3）检查同一电路的其他电器是否工作——有时只是缺相。如果三个检查都正常但机器仍不工作，请立即WhatsApp +60182983573。",
      },
      {
        q: "吉隆坡和雪兰莠紧急冷气维修费用是多少？",
        a: "标准时间（上午9点至下卡6点）诊断费RM 88，如果同次上门完成维修则全免。非工作时间（下卡6点至晚上10点）加收RM 50——合计RM 138，如果维修也一样免除。最常见紧急维修：电容更换约RM 180，室内风扇电机约RM 250-350，PCB电路板约RM 300-600，排水管疏通约RM 120。每项维修价格在开始任何工作之前与您确认。",
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
