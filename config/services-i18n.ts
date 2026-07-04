/**
 * Bahasa Malaysia (ms) + Mandarin (zh) translations for every Service Detail
 * page (config/services-data.ts), Round 18.3 — trilingual full-URL routes.
 *
 * Each field mirrors the English source field-for-field so the shared
 * ServiceDetailI18n component can swap languages 1:1:
 *   - titleMS / titleZH
 *   - taglineMS / taglineZH
 *   - descriptionMS / descriptionZH
 *   - highlightsMS / highlightsZH        (same length as English highlights)
 *   - processMS / processZH              (same step count, same order)
 *   - priceTableMS / priceTableZH        (same row count/order; prices copied)
 *
 * Price values are intentionally copied verbatim from services-data.ts and
 * must NOT be re-translated. Only the human-readable label is translated.
 */

export type ServiceI18n = {
  titleMS: string;
  titleZH: string;
  taglineMS: string;
  taglineZH: string;
  descriptionMS: string;
  descriptionZH: string;
  highlightsMS: string[];
  highlightsZH: string[];
  processMS: { step: string; desc: string }[];
  processZH: { step: string; desc: string }[];
  priceTableMS: { label: string; price: string }[];
  priceTableZH: { label: string; price: string }[];
};

export const serviceI18n: Record<string, ServiceI18n> = {
  // ── 1. PRESSURE CHEMICAL WASH ──────────────────────────────────────────
  "chemical-wash": {
    titleMS: "Cuci Kimia Bertekanan",
    titleZH: "高压化学清洗",
    taglineMS:
      "Pembersihan kimia bertekanan tinggi — menghapuskan kulat, habuk, bakteria dan memulihkan kuasa penyejukan.",
    taglineZH:
      "高压化学深度清洁——去除霉菌、灰尘、细菌，恢复制冷效果。",
    descriptionMS:
      "Cuci kimia bertekanan menggunakan penyelesaian kimia selamat dimakan yang disembur pada tekanan tinggi ke atas gegelung penyejat dan roda kipas semasa unit masih dipasang di dinding. Ia melarutkan kulat, bakteria, habuk dan alergen degil yang tidak dapat dibuang oleh servis asas. Disyorkan setiap 12 bulan, atau lebih awal jika unit anda berbau, meniup udara panas, atau aliran udara rendah.",
    descriptionZH:
      "高压化学清洗使用食品级安全化学溶液，在机器仍挂在墙上的状态下以高压喷涂到蒸发器盘管和风轮上。它能溶解基本保养无法清除的顽固霉菌、细菌、灰尘和过敏原。建议每12个月进行一次，如果机器有异味、吹热风或风量低，则应提前进行。",
    highlightsMS: [
      "Semburan kimia bertekanan tinggi selamat dimakan",
      "Rawatan penuh gegelung penyejat + roda kipas",
      "Membunuh kulat, bakteria & alergen",
      "Termasuk bilas paip longkang",
      "Memulihkan kuasa penyejukan & aliran udara asal",
      "Unit kekal terpasang — tiada pembongkaran diperlukan",
      "Penapis dibersihkan & dipasang semula",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "高压食品级安全化学喷雾",
      "蒸发器盘管 + 风轮全面处理",
      "杀灭霉菌、细菌和过敏原",
      "含排水管冲洗",
      "恢复原有制冷效果和风量",
      "机器保持挂墙——无需拆卸",
      "滤网清洁并重新安装",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Lindung & Proteksi", desc: "Kain penutup melindungi lantai, dinding dan perabot anda sebelum kami mula." },
      { step: "Sembur Kimia", desc: "Penyelesaian kimia selamat dimakan disembur pada gegelung, roda kipas dan semua permukaan dalaman." },
      { step: "Bilas Bertekanan Tinggi", desc: "Bilasan air bertekanan tinggi menghanyutkan habuk, kulat dan bakteria yang larut melalui longkang." },
      { step: "Uji & Serah", desc: "Keluaran penyejukan diuji, kawasan dibersihkan, dan kad kerja diserahkan kepada anda." },
    ],
    processZH: [
      { step: "遮盖保护", desc: "开始之前，用防尘布保护您的地板、墙壁和家具。" },
      { step: "喷涂化学剂", desc: "将食品级安全化学溶液喷涂到盘管、风轮和所有内部表面上。" },
      { step: "高压冲洗", desc: "高压水冲洗通过排水管冲走已溶解的污垢、霉菌和细菌。" },
      { step: "测试与交付", desc: "测试制冷效果，清洁现场，并向您交付工单。" },
    ],
    priceTableMS: [
      { label: "Dinding · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "Dinding · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "Dinding · 3.0 HP", price: "RM 180" },
      { label: "Dinding · 4.0 – 5.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Ceiling Cassette · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Unit Tingkap · 1.0 – 2.0 HP", price: "RM 130" },
      { label: "Unit Tingkap · 2.5 – 3.0 HP", price: "RM 160" },
    ],
    priceTableZH: [
      { label: "挂壁式 · 1.0 – 1.5 HP", price: "RM 120" },
      { label: "挂壁式 · 2.0 – 2.5 HP", price: "RM 150" },
      { label: "挂壁式 · 3.0 HP", price: "RM 180" },
      { label: "挂壁式 · 4.0 – 5.0 HP", price: "RM 200" },
      { label: "天花板卡式 · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "天花板卡式 · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "天花板卡式 · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "窗式 · 1.0 – 2.0 HP", price: "RM 130" },
      { label: "窗式 · 2.5 – 3.0 HP", price: "RM 160" },
    ],
  },

  // ── 2. CHEMICAL OVERHAUL ───────────────────────────────────────────────
  "chemical-overhaul": {
    titleMS: "Overhaul Kimia",
    titleZH: "化学大修",
    taglineMS:
      "Pembersihan mendalam dengan pembongkaran penuh — penyelesaian kekal untuk kebocoran air, pembentukan ais dan sekatan teruk.",
    taglineZH:
      "完全拆卸深度清洁——永久解决漏水、结冰和严重堵塞问题。",
    descriptionMS:
      "Overhaul kimia adalah pembersihan aircond paling menyeluruh yang ada. Keseluruhan unit dalaman dibongkar dengan berhati-hati — gegelung, roda kipas, perumah, dulang longkang dan semua bahagian dalaman dikeluarkan dan dibersihkan secara individu dengan penyelesaian kimia. Disyorkan apabila unit mengalami kebocoran air berterusan, pembentukan ais, bau yang sangat busuk, atau tidak diservis selama 3 tahun atau lebih.",
    descriptionZH:
      "化学大修是最彻底的冷气清洁方式。整个室内机被小心拆卸——盘管、风轮、外壳、排水盘和所有内部零件被取出并分别用化学溶液深度清洁。当机器持续漏水、结冰、有严重异味，或已3年以上未清洁时，建议进行大修。",
    highlightsMS: [
      "Keseluruhan unit dalaman dibongkar",
      "Setiap komponen dibersihkan secara mendalam secara kimia",
      "Dulang longkang dibersihkan secara individu",
      "Roda kipas dikeluarkan dan direndam",
      "Menghapuskan kebocoran air berterusan",
      "Membaiki pembentukan ais dari punca",
      "Menghilangkan kulat & bakteria teruk",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "室内机完全拆卸",
      "每个部件都进行化学深度清洁",
      "排水盘单独清洁",
      "风轮拆下浸泡",
      "消除持续漏水",
      "从根源解决结冰问题",
      "清除严重霉菌和细菌",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Lindung & Bongkar", desc: "Kain penutup diletakkan, kemudian keseluruhan unit dalaman dikeluarkan dengan berhati-hati dari braket dinding." },
      { step: "Rendaman Komponen", desc: "Setiap bahagian dalaman — gegelung, roda kipas, perumah, dulang longkang — direndam dalam penyelesaian kimia selamat dimakan." },
      { step: "Pembersihan Mendalam & Bilas", desc: "Bilasan bertekanan tinggi setiap komponen sehingga benar-benar bersih." },
      { step: "Pasang Semula & Uji", desc: "Unit dipasang semula, dipasang pada dinding, dan keluaran penyejukan diuji sebelum diserahkan." },
    ],
    processZH: [
      { step: "保护与拆卸", desc: "铺好防尘布，然后将整个室内机从墙壁支架上小心拆下。" },
      { step: "部件浸泡", desc: "每个内部部件——盘管、风轮、外壳、排水盘——浸泡在食品级安全化学溶液中。" },
      { step: "深度清洁与冲洗", desc: "对每个部件进行高压冲洗，直到完全干净。" },
      { step: "重新组装与测试", desc: "重新组装并装回墙上，在交付前测试制冷效果。" },
    ],
    priceTableMS: [
      { label: "Dinding · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Dinding · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "Dinding · 3.0 – 3.5 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 500" },
    ],
    priceTableZH: [
      { label: "挂壁式 · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "挂壁式 · 2.0 – 2.5 HP", price: "RM 280" },
      { label: "挂壁式 · 3.0 – 3.5 HP", price: "RM 350" },
      { label: "天花板卡式 · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "天花板卡式 · 3.5 – 5.0 HP", price: "RM 500" },
    ],
  },

  // ── 3. GAS TOP-UP ──────────────────────────────────────────────────────
  "gas-topup": {
    titleMS: "Tambah Gas / Pengimbangan Tepat",
    titleZH: "充气 / 精准平衡",
    taglineMS:
      "Pulihkan kuasa penyejukan dengan tambahan refrigerant tepat — pemeriksaan kebocoran disertakan.",
    taglineZH:
      "通过精准冷媒补充恢复制冷效果——含泄漏检查。",
    descriptionMS:
      "Gas refrigerant adalah nadi kepada aircond anda. Apabila parasnya rendah — sama ada disebabkan kebocoran perlahan atau pengurangan beransur-ansur — unit anda tidak dapat menyejuk dengan berkesan tidak kira betapa bersihnya. KL Renovator menggunakan tolok manifold tepat untuk mengukur tekanan gas sebenar sebelum dan selepas tambahan, memastikan paras refrigerant seimbang. R22, R410A dan R32 kesemuanya dikendalikan. Pemeriksaan kebocoran disertakan dalam setiap kerja.",
    descriptionZH:
      "制冷剂气体是冷气的命脉。当含量偏低——无论是缓慢泄漏还是逐渐消耗——无论机器多干净，都无法有效制冷。KL Renovator使用精密复合压力表测量充气前后的确切气压，确保冷媒量平衡。可处理R22、R410A和R32。每次服务均含泄漏检查。",
    highlightsMS: [
      "Refrigerant R22, R410A dan R32",
      "Pengukuran tolok manifold tepat",
      "Pengimbangan paras gas tepat",
      "Pemeriksaan titik kebocoran disertakan",
      "Pemeriksaan visual unit luar",
      "Penambahbaikan penyejukan segera",
      "Pengendalian refrigerant bertauliah",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "R22、R410A和R32冷媒",
      "精密复合压力表测量",
      "精确平衡气体量",
      "含泄漏点检查",
      "室外机外观检查",
      "立即改善制冷",
      "持证冷媒操作",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Diagnos Gas Rendah", desc: "Juruteknik menyemak simptom penyejukan rendah, menyemak operasi unit luar dan memeriksa kebocoran yang kelihatan." },
      { step: "Sambung Tolok Manifold", desc: "Tolok manifold tepat disambungkan untuk mengukur tekanan refrigerant semasa dengan tepat." },
      { step: "Tambah Mengikut Spesifikasi", desc: "Jenis refrigerant yang betul ditambah mengikut spesifikasi pengeluar — tidak terlebih atau terkurang." },
      { step: "Periksa Kebocoran & Uji", desc: "Semua injap servis dan sambungan diperiksa untuk kebocoran. Penyejukan diuji dan disahkan sebelum beredar." },
    ],
    processZH: [
      { step: "诊断缺气", desc: "技术员检查制冷不足的迹象，检查室外机运行状况，并查看是否有可见泄漏。" },
      { step: "连接复合压力表", desc: "连接精密复合压力表以准确测量当前冷媒压力。" },
      { step: "按规格充气", desc: "按制造商规格添加正确类型的冷媒——不过量也不不足。" },
      { step: "泄漏检查与测试", desc: "检查所有维修阀和连接处是否有泄漏。离开前测试并确认制冷效果。" },
    ],
    priceTableMS: [
      { label: "Gas R22 · 1.0 HP", price: "RM 120" },
      { label: "Gas R22 · 1.5 – 2.0 HP", price: "RM 150" },
      { label: "Gas R22 · 2.5 – 3.0 HP", price: "RM 180" },
      { label: "Gas R410A · 1.0 HP", price: "RM 150" },
      { label: "Gas R410A · 1.5 – 2.0 HP", price: "RM 180" },
      { label: "Gas R410A · 2.5 – 3.0 HP", price: "RM 200" },
      { label: "Gas R32 · 1.0 HP", price: "RM 180" },
      { label: "Gas R32 · 1.5 – 2.0 HP", price: "RM 200" },
      { label: "Gas R32 · 2.5 – 3.0 HP", price: "RM 220" },
    ],
    priceTableZH: [
      { label: "R22 冷媒 · 1.0 HP", price: "RM 120" },
      { label: "R22 冷媒 · 1.5 – 2.0 HP", price: "RM 150" },
      { label: "R22 冷媒 · 2.5 – 3.0 HP", price: "RM 180" },
      { label: "R410A 冷媒 · 1.0 HP", price: "RM 150" },
      { label: "R410A 冷媒 · 1.5 – 2.0 HP", price: "RM 180" },
      { label: "R410A 冷媒 · 2.5 – 3.0 HP", price: "RM 200" },
      { label: "R32 冷媒 · 1.0 HP", price: "RM 180" },
      { label: "R32 冷媒 · 1.5 – 2.0 HP", price: "RM 200" },
      { label: "R32 冷媒 · 2.5 – 3.0 HP", price: "RM 220" },
    ],
  },

  // ── 4. REPAIR & TROUBLESHOOTING ────────────────────────────────────────
  repair: {
    titleMS: "Penyelesaian Masalah & Pembaikan",
    titleZH: "故障排查与维修",
    taglineMS:
      "Diagnos dan baiki sebarang kerosakan aircond — kapasitor, motor kipas, papan PCB, penderia dan banyak lagi.",
    taglineZH:
      "诊断和修复任何冷气故障——电容器、风扇电机、PCB板、传感器等。",
    descriptionMS:
      "Apabila aircond anda mengalami kerosakan elektrik, bunyi pelik, kod ralat berkelip, atau berhenti berfungsi sepenuhnya, juruteknik terlatih KL Renovator akan mendiagnosis masalah sebenar dan memberi anda sebut harga pembaikan yang telus sebelum sebarang kerja dimulakan. Alat ganti yang dibawa dalam van termasuk kapasitor, motor kipas, penyentuh, penderia dan papan PCB untuk semua jenama utama.",
    descriptionZH:
      "当您的冷气出现电气故障、异常噪音、闪烁错误代码，或完全停止工作时，KL Renovator训练有素的技术员会准确诊断问题，并在开始任何工作前为您提供透明的维修报价。车上携带的零件包括电容器、风扇电机、接触器、传感器和PCB板，适用于所有主要品牌。",
    highlightsMS: [
      "Caj diagnostik RM 88 (dikecualikan jika pembaikan pada lawatan yang sama)",
      "Semua kerosakan elektrik didiagnosis",
      "Kapasitor, motor kipas, penyentuh",
      "Diagnos & penggantian papan PCB",
      "Penggantian penderia & termostat",
      "Pembacaan kod ralat — semua jenama",
      "Sebut harga telus sebelum pembaikan",
      "Jaminan alat ganti 3 bulan",
    ],
    highlightsZH: [
      "RM 88 诊断费（同次完成维修则免收）",
      "诊断所有电气故障",
      "电容器、风扇电机、接触器",
      "PCB板诊断与更换",
      "传感器和温控器更换",
      "错误代码读取——所有品牌",
      "维修前提供透明报价",
      "零件保修3个月",
    ],
    processMS: [
      { step: "Diagnos Kerosakan", desc: "Juruteknik memeriksa unit dalam dan luar, membaca kod ralat dan melakukan ujian elektrik." },
      { step: "Sebut Harga & Sahkan", desc: "Sebut harga pembaikan yang jelas diberikan. Kerja hanya dimulakan selepas kelulusan anda." },
      { step: "Baiki", desc: "Komponen yang rosak diganti menggunakan alat ganti spesifikasi OEM yang betul." },
      { step: "Uji & Sahkan", desc: "Ujian larian penuh untuk mengesahkan pembaikan berjaya sebelum juruteknik beredar." },
    ],
    processZH: [
      { step: "诊断故障", desc: "技术员检查室内机和室外机，读取错误代码并进行电气测试。" },
      { step: "报价与确认", desc: "提供明确的维修报价。只有在您同意后才会开始工作。" },
      { step: "维修", desc: "使用正确的OEM规格零件更换故障部件。" },
      { step: "测试与验证", desc: "在技术人员离开前，进行全面试运行以确认维修成功。" },
    ],
    priceTableMS: [
      { label: "Caj Diagnostik (dikecualikan dengan pembaikan)", price: "RM 88" },
      { label: "Penggantian Kapasitor", price: "RM 150 – 250" },
      { label: "Penggantian Motor Kipas", price: "RM 250 – 380" },
      { label: "Penggantian Papan PCB", price: "RM 280 – 600" },
      { label: "Penggantian Penderia Suhu", price: "RM 150 – 250" },
      { label: "Penggantian Penyentuh", price: "RM 150 – 200" },
      { label: "Penggantian Pam Longkang", price: "RM 350 – 550" },
      { label: "Penggantian Kompresor", price: "RM 800 – 2,000" },
    ],
    priceTableZH: [
      { label: "诊断费（维修则免收）", price: "RM 88" },
      { label: "电容器更换", price: "RM 150 – 250" },
      { label: "风扇电机更换", price: "RM 250 – 380" },
      { label: "PCB板更换", price: "RM 280 – 600" },
      { label: "温度传感器更换", price: "RM 150 – 250" },
      { label: "接触器更换", price: "RM 150 – 200" },
      { label: "排水泵更换", price: "RM 350 – 550" },
      { label: "压缩机更换", price: "RM 800 – 2,000" },
    ],
  },

  // ── 5. NEW UNIT INSTALLATION ───────────────────────────────────────────
  installation: {
    titleMS: "Pemasangan Unit Baharu",
    titleZH: "新机安装",
    taglineMS:
      "Pemasangan aircond profesional untuk semua jenama — laluan kabel yang kemas, saiz paip yang betul, dan pentauliahan vakum penuh. Hari sama tersedia.",
    taglineZH:
      "所有品牌专业冷气安装——整洁的电缆布线、正确的管道尺寸和全面的真空调试。可当天安装。",
    descriptionMS:
      "Aircond yang dipasang dengan buruk boleh kehilangan 20–30% kecekapannya sebelum ia beroperasi sejam pertama. Saiz paip kuprum yang tidak betul, evakuasi vakum yang dilangkau, sambungan flare yang longgar, atau laluan kabel yang tidak kemas akan menyebabkan kebocoran gas, kegagalan kompresor pramatang, dan bil elektrik yang lebih tinggi dari sepatutnya. KL Renovator memasang unit dinding, ceiling cassette, dan tingkap untuk rumah, kondo, shoplot, dan pejabat di seluruh KL dan Selangor — dan kami membawa latihan HVAC yang tulen ke setiap kerja. Setiap pemasangan merangkumi: 7 kaki paip kuprum bersaiz betul (berpenebat), pendawaian elektrik, paip longkang, braket dinding/lantai, evakuasi pam vakum penuh, ujian kebocoran tekanan, dan ujian pentauliahan yang mengesahkan output penyejukan, aliran udara, dan penentukuran termostat. RM 199 untuk unit dinding standard 1.0–1.5 HP — harga disahkan sebelum kami menggerudi satu lubang pun.",
    descriptionZH:
      "安装不当的冷气在运行第一个小时之前就可能损失20-30%的效率。铜管尺寸不正确、跳过真空调试、喇叭口连接松动或电缆布线混乱将导致气体泄漏、压缩机过早损坏和电费高于应有水平。KL Renovator为吉隆坡和雪兰莪的家庭、公寓、店屋和办公室安装挂壁式、天花板卡式和窗式机器——每次作业都带着真正的HVAC专业培训。每次安装包括：7尺正确尺寸的铜管（带隔热）、电线、排水管、墙壁/地面支架、全真空泵抽真空、压力泄漏测试以及验证制冷输出、风量和温控器校准的调试运行。标准挂壁式1.0-1.5 HP机器RM 199——在我们钻任何一个孔之前价格已确认。",
    highlightsMS: [
      "Semua 20 jenama — Daikin, Panasonic, Mitsubishi, York, Acson, Midea & banyak lagi",
      "Unit dinding, ceiling cassette & tingkap",
      "7 kaki paip kuprum disertakan — bersaiz betul mengikut HP, bukan tolok nipis universal",
      "Pendawaian elektrik + paip longkang + braket semuanya disertakan",
      "Evakuasi pam vakum wajib — kami tidak pernah melangkau langkah ini",
      "Ujian kebocoran tekanan dengan nitrogen sebelum melepaskan bahan pendingin",
      "Trunking kabel yang kemas — tiada wayar longgar yang kelihatan di sepanjang dinding anda",
      "Waranti mutu kerja 1 bulan + senarai semak pemasangan bertulis",
    ],
    highlightsZH: [
      "所有20个品牌——大金、松下、三菱、York、Acson、Midea等",
      "挂壁式、天花板卡式和窗式机器",
      "含7尺铜管——按HP正确配管，非通用薄规格",
      "电线+排水管+支架全部包含",
      "真空泵抽真空为强制步骤——我们从不跳过",
      "释放制冷剂前用氮气进行压力泄漏测试",
      "整洁的线槽——墙壁上看不到松散的线缆",
      "1个月工艺保修+书面安装检查清单",
    ],
    processMS: [
      { step: "Tinjauan Pra-Pemasangan", desc: "Juruteknik memeriksa kekuatan dinding, kapasiti bekalan elektrik, kejatuhan longkang, dan penempatan kondenser luar. Ukuran disahkan sebelum sebarang penggerudian. Peraturan kondo diperiksa — kami berkoordinasi dengan pihak pengurusan jika perlu." },
      { step: "Braket, Paip & Laluan Kabel", desc: "Braket dinding diratakan dan dipasang. Paip kuprum dipotong mengikut panjang tepat, diflare, ditebat, dan dihalakan dengan kemas melalui penembusan dinding. Paip longkang ditetapkan dengan kecerunan jatuh yang betul supaya air mengalir secara semula jadi." },
      { step: "Unit Luar & Elektrik", desc: "Unit kondenser dipasang pada braket dengan pad getah getaran. Suis pengasing elektrik dipasang berhampiran unit luar (diperlukan oleh peraturan Malaysia). Pendawaian dihalakan melalui konduit khusus, bukan dikongsi dengan litar lain." },
      { step: "Vakum, Ujian Kebocoran & Pentauliahan", desc: "Sistem divakum dengan pam vakum selama minimum 15–20 minit untuk mengeluarkan semua kelembapan dan udara. Ujian tekanan nitrogen mengesahkan tiada kebocoran. Bahan pendingin dilepaskan, penyejukan diuji pada semua kelajuan kipas, termostat dikalibrasi, dan kad kerja ditandatangani." },
    ],
    processZH: [
      { step: "安装前勘查", desc: "技术员检查墙体强度、电力供应容量、排水坡度和室外冷凝器位置。在钻孔前确认所有尺寸。检查公寓规定——如有需要我们与管理处协调。" },
      { step: "支架、管道和电缆铺设", desc: "墙壁支架调平并固定。铜管按精确长度切割、喇叭口处理、隔热处理，整齐穿过墙孔。排水管按正确下坡设置，让水自然流出。" },
      { step: "室外机和电气", desc: "冷凝器安装在带橡胶减震垫的支架上。电气隔离开关安装在室外机附近（马来西亚法规要求）。电线通过专用线管布线，不与其他电路共用。" },
      { step: "抽真空、检漏和调试", desc: "系统用真空泵抽真空至少15-20分钟，排除所有水分和空气。氮气压力测试确认无泄漏。释放制冷剂，在所有风速下测试制冷效果，校准温控器，签署工作卡。" },
    ],
    priceTableMS: [
      { label: "Dinding · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "Dinding · 2.0 HP", price: "RM 249" },
      { label: "Dinding · 2.5 HP", price: "RM 279" },
      { label: "Dinding · 3.0 HP", price: "RM 329" },
      { label: "Dinding · 4.0 HP", price: "RM 399" },
      { label: "Dinding · 5.0 HP", price: "RM 449" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Ceiling Cassette · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "Unit Tingkap · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "Unit Tingkap · 2.0 – 2.5 HP", price: "RM 249" },
    ],
    priceTableZH: [
      { label: "挂壁式 · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "挂壁式 · 2.0 HP", price: "RM 249" },
      { label: "挂壁式 · 2.5 HP", price: "RM 279" },
      { label: "挂壁式 · 3.0 HP", price: "RM 329" },
      { label: "挂壁式 · 4.0 HP", price: "RM 399" },
      { label: "挂壁式 · 5.0 HP", price: "RM 449" },
      { label: "天花板卡式 · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "天花板卡式 · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "天花板卡式 · 3.5 – 6.0 HP", price: "RM 400" },
      { label: "窗式 · 1.0 – 1.5 HP", price: "RM 199" },
      { label: "窗式 · 2.0 – 2.5 HP", price: "RM 249" },
    ],
  },

  // ── 6. BASIC SERVICING ─────────────────────────────────────────────────
  "basic-servicing": {
    titleMS: "Servis Asas",
    titleZH: "基本保养",
    taglineMS:
      "Penyelenggaraan rutin penting — cucian penapis, bilasan longkang, dan pemeriksaan diagnostik penuh. RM 99, 45 minit, memastikan unit anda sihat antara cucian mendalam.",
    taglineZH:
      "必要的常规保养——清洗过滤网、冲洗排水管和全面诊断检查。RM 99，45分钟，在深层清洁之间保持机器健康。",
    descriptionMS:
      "Servis asas adalah apa yang memastikan aircond anda berjalan lancar antara cuci kimia — seperti menukar minyak enjin kereta anda, bukan membina semula enjin. Dalam kira-kira 45 minit setiap unit, juruteknik kami mengeluarkan dan mencuci penapis, membilas paip longkang untuk mencegah kebocoran air sebelum ia bermula, menyembur gegelung penyejat dengan pembersih anti-bakteria ringan, memeriksa setiap sambungan elektrik dan kontaktor untuk ketat dan kesan terbakar, mengukur suhu output penyejukan sebenar, dan mengesahkan termostat dikalibrasi dengan betul. Bagi unit yang beroperasi 8+ jam sehari dalam kepanasan dan kelembapan Malaysia, kami mengesyorkan ini setiap 3–4 bulan. Untuk pengguna sederhana, setiap 6 bulan sudah mencukupi. Ia adalah penyelenggaraan pencegahan yang berpatutan yang mengesan masalah kecil — pendawaian longgar, penyumbatan longkang awal, tekanan bahan pendingin yang menurun — sebelum menjadi pembaikan yang mahal. RM 99 untuk unit dinding 1.0–1.5 HP, harga disahkan sebelum kami mula.",
    descriptionZH:
      "基本保养是在化学清洗之间保持冷气平稳运行的方法——就像换汽车的机油，而不是重建发动机。每台机器约45分钟，我们的技术员取出并清洗过滤网，冲洗排水管防止漏水，用温和抗菌清洁剂喷涂蒸发器盘管，检查每个电气接头和接触器是否紧固及有无烧痕，测量实际制冷输出温度，并确认温控器校准正确。对于在马来西亚高温潮湿环境下每天运行8小时以上的机器，我们建议每3-4个月保养一次。对于中度使用者，每6个月就足够了。这是一种负担得起的预防性保养，可以在小问题——接线松动、排水早期堵塞、制冷剂压力下降——变成昂贵的维修之前发现它们。挂壁式1.0-1.5 HP机器RM 99，价格在开工前确认。",
    highlightsMS: [
      "Penapis dikeluarkan, dicuci dalam, dikeringkan & dipasang semula — bukan sekadar bilasan cepat",
      "Panel hadapan, selongsong & louvre dilap sepenuhnya",
      "Paip longkang dibilas dengan tekanan air — mencegah kebocoran air masa depan",
      "Gegelung penyejat disembur dengan pembersih anti-bakteria ringan",
      "Sambungan elektrik & kontaktor diperiksa untuk ketat dan kerosakan haba",
      "Suhu output penyejukan diukur dengan termometer digital",
      "Penentukuran termostat disahkan — unit berhenti/mula pada suhu yang betul",
      "Disyorkan setiap 3–4 bulan untuk penggunaan berat, setiap 6 bulan untuk penggunaan biasa",
    ],
    highlightsZH: [
      "过滤网取出、深度清洗、晾干并重装——不仅是快速冲洗",
      "前面板、外壳和百叶窗彻底擦拭",
      "排水管用水压冲洗——预防未来的漏水问题",
      "蒸发器盘管用抗菌温和清洁剂喷涂",
      "电气接头和接触器检查紧固性和热损伤",
      "用数字温度计测量制冷输出温度",
      "温控器校准验证——机器在正确温度停止/启动",
      "建议重度使用每3-4个月一次，正常使用每6个月一次",
    ],
    processMS: [
      { step: "Buka & Cuci", desc: "Panel hadapan dibuka. Penapis dikeluarkan, dicuci dengan air, dan dibiarkan kering. Selongsong, louvre, dan permukaan yang boleh diakses dilap dengan larutan anti-bakteria." },
      { step: "Servis Longkang & Gegelung", desc: "Paip longkang dibilas dengan air bertekanan untuk membersihkan pengumpulan enap cemar awal sebelum menjadi penyumbatan. Gegelung penyejat disembur dengan pembersih ringan untuk melonggarkan habuk permukaan dan kulat ringan." },
      { step: "Pemeriksaan Keselamatan Elektrik", desc: "Semua sambungan pendawaian, kontaktor, dan terminal kapasitor diperiksa untuk ketat, kakisan, atau tanda terbakar. Sambungan longgar diketatkan. Sebarang tanda yang mencurigakan dicatat dan ditunjukkan kepada anda." },
      { step: "Ujian Prestasi Penyejukan", desc: "Unit dijalankan selama 10–15 minit. Suhu udara bekalan diukur di saluran keluar dan dibandingkan dengan udara balik bilik. Penurunan suhu yang sihat: 8–12°C. Keputusan direkodkan pada kad kerja anda. Kitaran hidup/mati termostat disahkan." },
    ],
    processZH: [
      { step: "拆卸与清洗", desc: "打开前面板。取出过滤网，用水清洗，晾干。外壳、百叶窗和可触及表面用抗菌溶液擦拭。" },
      { step: "排水管和盘管维护", desc: "用压力水冲洗排水管，在淤塞物变成堵塞前清除早期的淤泥积聚。用温和清洁剂喷涂蒸发器盘管，松动表面灰尘和轻度霉菌。" },
      { step: "电气安全检查", desc: "检查所有接线、接触器和电容端子是否紧固、有腐蚀或烧痕。松动的连接被拧紧。任何可疑迹象都会被记录并向您展示。" },
      { step: "制冷性能测试", desc: "机器运行10-15分钟。在出风口测量送风温度，与房间回风温度对比。健康的温差：8-12°C。结果记录在您的工作卡上。验证温控器的启停周期。" },
    ],
    priceTableMS: [
      { label: "Dinding · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Dinding · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "Dinding · 3.0 – 3.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Ceiling Cassette · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Ceiling Cassette · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Unit Tingkap · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "Unit Tingkap · 2.0 – 2.5 HP", price: "RM 120" },
    ],
    priceTableZH: [
      { label: "挂壁式 · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "挂壁式 · 2.0 – 2.5 HP", price: "RM 120" },
      { label: "挂壁式 · 3.0 – 3.5 HP", price: "RM 150" },
      { label: "天花板卡式 · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "天花板卡式 · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "天花板卡式 · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "窗式 · 1.0 – 1.5 HP", price: "RM 99" },
      { label: "窗式 · 2.0 – 2.5 HP", price: "RM 120" },
    ],
  },

  // ── 7. CEILING CASSETTE SERVICE ────────────────────────────────────────
  "ceiling-cassette": {
    titleMS: "Servis Ceiling Cassette",
    titleZH: "天花板卡式机服务",
    taglineMS:
      "Servis ceiling cassette komersial pakar — cuci kimia, overhaul dan pembaikan untuk semua jenama.",
    taglineZH:
      "专业商用天花板卡式机服务——化学清洗、大修和维修，适用于所有品牌。",
    descriptionMS:
      "Unit aircond ceiling cassette adalah standard untuk pejabat, kedai runcit, restoran dan ruang komersial di seluruh KL dan Selangor. KL Renovator pakar dalam servis ceiling cassette, cuci kimia dan overhaul kimia untuk kedai, pejabat dan premis komersial pelbagai unit. Juruteknik dilatih untuk mengakses dan mengservis unit yang dipasang di siling dengan selamat dan cekap.",
    descriptionZH:
      "天花板卡式冷气是吉隆坡和雪兰莪各地办公室、零售店、餐厅和商业场所的标准配置。KL Renovator专门从事商店、办公室和多机组商业场所的天花板卡式机服务、化学清洗和化学大修。技术员经过培训，可以安全高效地检修安装在天花板上的机组。",
    highlightsMS: [
      "Juruteknik ceiling cassette pakar",
      "Cuci kimia dari RM 220",
      "Overhaul kimia dari RM 430",
      "Servis komersial pelbagai unit",
      "Semua jenama — Daikin, Mitsubishi, York, Carrier",
      "Pembersihan mendalam dulang longkang",
      "Roda kipas dikeluarkan dan dibasuh",
      "Penjadualan komersial — waktu luar tersedia",
    ],
    highlightsZH: [
      "专业天花板卡式机技术员",
      "化学清洗从RM 220起",
      "化学大修从RM 430起",
      "多机组商业服务",
      "所有品牌——大金、三菱、York、Carrier",
      "排水盘深度清洁",
      "风轮拆下清洗",
      "商业预约——可提供非工作时间服务",
    ],
    processMS: [
      { step: "Akses & Lindung", desc: "Juruteknik mengakses unit siling dengan selamat. Kain penutup melindungi lantai dan perabot di bawah." },
      { step: "Bongkar & Bersih", desc: "Panel siling, penapis, gegelung, dulang longkang dan roda kipas dikeluarkan dan dibersihkan secara kimia." },
      { step: "Bilas Longkang", desc: "Paip dan dulang longkang dibilas dan dibersihkan. Sekatan adalah punca paling biasa ceiling cassette bocor." },
      { step: "Pasang Semula & Uji", desc: "Unit dipasang semula, penyejukan dan longkang diuji, panel siling diganti." },
    ],
    processZH: [
      { step: "进入与保护", desc: "技术员安全进入天花板机组。防尘布保护下方的地板和家具。" },
      { step: "拆卸与清洁", desc: "拆卸天花板面板、滤网、盘管、排水盘和风轮，并进行化学清洁。" },
      { step: "冲洗排水", desc: "冲洗并疏通排水管和托盘。堵塞是天花板卡式机漏水最常见的原因。" },
      { step: "重新组装与测试", desc: "重新组装机组，测试制冷和排水，装回天花板面板。" },
    ],
    priceTableMS: [
      { label: "Servis Asas · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "Servis Asas · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "Servis Asas · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "Cuci Kimia · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "Cuci Kimia · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "Cuci Kimia · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "Overhaul Kimia · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "Overhaul Kimia · 3.5 – 5.0 HP", price: "RM 500" },
      { label: "Pemasangan · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "Pemasangan · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "Pemasangan · 3.5 – 6.0 HP", price: "RM 400" },
    ],
    priceTableZH: [
      { label: "基本服务 · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "基本服务 · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "基本服务 · 3.5 – 5.0 HP", price: "RM 250" },
      { label: "化学清洗 · 1.0 – 1.5 HP", price: "RM 220" },
      { label: "化学清洗 · 2.0 – 3.0 HP", price: "RM 280" },
      { label: "化学清洗 · 4.0 – 5.0 HP", price: "RM 350" },
      { label: "化学大修 · 1.0 – 3.0 HP", price: "RM 430" },
      { label: "化学大修 · 3.5 – 5.0 HP", price: "RM 500" },
      { label: "安装 · 1.0 – 1.5 HP", price: "RM 290" },
      { label: "安装 · 2.0 – 3.0 HP", price: "RM 350" },
      { label: "安装 · 3.5 – 6.0 HP", price: "RM 400" },
    ],
  },

  // ── 8. DISMANTLE & RELOCATION ──────────────────────────────────────────
  "dismantling-relocation": {
    titleMS: "Cabut & Pindah",
    titleZH: "拆卸与搬迁",
    taglineMS:
      "Pengekstrakan aircond yang selamat dan pemasangan semula profesional di lokasi baharu anda.",
    taglineZH:
      "安全拆卸冷气，并在您的新地点专业重新安装。",
    descriptionMS:
      "Berpindah rumah atau pejabat? KL Renovator dengan selamat membongkar unit aircond sedia ada anda, memulihkan gas refrigerant, dan memasang semula secara profesional di lokasi baharu anda. Proses ini termasuk pengeluaran unit dalaman, pemampat luar, paip kuprum dan pendawaian — serta pentauliahan penuh di tapak baharu.",
    descriptionZH:
      "搬家或搬办公室？KL Renovator安全拆卸您现有的冷气机组，回收制冷剂气体，并在您的新地点专业重新安装。整个过程包括拆卸室内机、室外压缩机、铜管和电线——并在新址进行全面重新调试。",
    highlightsMS: [
      "Pembongkaran selamat unit dalam dan luar",
      "Pemulihan refrigerant (tiada gas dibazirkan)",
      "Pemasangan semula penuh di lokasi baharu",
      "Paip kuprum baharu jika diperlukan",
      "Pentauliahan vakum di tapak baharu",
      "Semua jenama dikendalikan",
      "Hari sama tersedia",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "室内机和室外机安全拆卸",
      "冷媒回收（不浪费气体）",
      "在新地点完整重新安装",
      "如需要则提供新铜管",
      "在新址进行真空调试",
      "可处理所有品牌",
      "可提供当天服务",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Pulih Gas", desc: "Gas refrigerant dipulihkan dengan selamat daripada sistem sebelum dibongkar." },
      { step: "Bongkar", desc: "Unit dalam, unit luar, paip kuprum dan pendawaian dikeluarkan dengan berhati-hati." },
      { step: "Angkut & Lindung", desc: "Unit diangkut dengan selamat dan dilindungi daripada kerosakan semasa perjalanan." },
      { step: "Pasang Semula & Tauliah", desc: "Pemasangan semula penuh di lokasi baharu, divakum, gas dilepaskan dan penyejukan diuji." },
    ],
    processZH: [
      { step: "回收冷媒", desc: "拆卸前从系统中安全回收制冷剂气体。" },
      { step: "拆卸", desc: "小心拆下室内机、室外机、铜管和电线。" },
      { step: "运输与保护", desc: "安全运输机组，并在运输途中防止损坏。" },
      { step: "重新安装与调试", desc: "在新地点完整重新安装，抽真空，释放气体并测试制冷。" },
    ],
    priceTableMS: [
      { label: "Cabut Sahaja (dalaman + luar)", price: "RM 90" },
      { label: "Cabut + Pasang Semula Tempat Sama (standard)", price: "RM 250" },
      { label: "Cabut + Pasang Semula Tempat Sama (2.0–2.5 HP)", price: "RM 290" },
      { label: "Cabut + Pasang Semula Tempat Lain", price: "RM 350" },
    ],
    priceTableZH: [
      { label: "仅拆卸（室内+室外）", price: "RM 90" },
      { label: "拆卸+同地重装（标准）", price: "RM 250" },
      { label: "拆卸+同地重装（2.0–2.5 HP）", price: "RM 290" },
      { label: "拆卸+异地重装", price: "RM 350" },
    ],
  },

  // ── 9. EMERGENCY AIRCOND REPAIR ────────────────────────────────────────
  emergency: {
    titleMS: "Pembaikan Aircond Kecemasan",
    titleZH: "紧急冷气维修",
    taglineMS:
      "Tindak balas kecemasan hari sama untuk kerosakan sepenuhnya, kebocoran air teruk, kegagalan unit luar, dan pembaikan segera di seluruh KL & Selangor.",
    taglineZH:
      "全天紧急响应，涵盖完全故障、严重漏水、室外机故障及吉隆坡和雪兰莪各地的紧急维修。",
    descriptionMS:
      "Aircond anda baru sahaja rosak jam 11 malam, suhu bilik 32°C, dan anda ada pembentangan jam 8 pagi. Atau air menitis ke atas kabinet TV dan anda tidak boleh mematikan unit kerana tiada penyejukan lain di rumah. Ini bukan situasi \"tempah untuk Selasa depan\" — ini masa untuk WhatsApp KL Renovator serta-merta. Kami menghantar juruteknik HVAC terlatih hari sama ke semua 50+ subbandar Klang Valley dalam masa 30–60 minit selepas pengesahan. Caj diagnostik RM 88 dikecualikan sepenuhnya jika pembaikan diselesaikan pada lawatan yang sama. Van kami membawa alat ganti biasa — kapasitor, motor kipas, papan PCB, sensor, kontaktor, hos longkang, bahan pendingin — jadi kebanyakan kecemasan diselesaikan sepenuhnya dalam lawatan pertama, bukan hanya ditampal sementara.",
    descriptionZH:
      "您的冷气晚上11点突然坏了，房间温度32°C，而您早上8点还有演示。或者水滴到电视柜上，您无法关闭机器因为家里没有其他制冷设备。这不是“预约下周二”的情况——这是您应该立即WhatsApp KL Renovator的时刻。我们在确认后30-60分钟内向所有50多个巴生谷住宅区派遣训练有素的HVAC技术员。RM 88诊断费在同次上门完成维修时全额免除。我们的车辆携带常见备件——电容、风扇电机、PCB板、传感器、接触器、排水管、制冷剂——因此大多数紧急情况在第一次上门就能彻底解决，而不是临时应付。",
    highlightsMS: [
      "Penghantaran hari sama — ketibaan 30–60 minit selepas pengesahan WhatsApp",
      "Diagnostik RM 88 — dikecualikan sepenuhnya jika dibaiki dalam lawatan yang sama",
      "Waktu luar sehingga 10 malam (surcaj RM 50, juga dikecualikan jika dibaiki)",
      "Semua 20 jenama — Daikin, Panasonic, Mitsubishi, York, Midea & banyak lagi",
      "Alat ganti paling biasa tersedia dalam setiap van — kapasitor, motor kipas, PCB, sensor, hos longkang",
      "Pembersihan longkang kecemasan — kebocoran air dalaman dihentikan hari sama",
      "Kecemasan komersial bilik pelayan / pejabat / shoplot dilindungi",
      "Warga emas / bayi di rumah? Beritahu kami — kami utamakan isi rumah rentan",
    ],
    highlightsZH: [
      "当天派遣 — WhatsApp确认后30-60分钟到达",
      "诊断费RM 88 — 同次上门完成维修则全免",
      "非工作时间至晚上10点（RM 50加班费，维修完成也免除）",
      "所有20个品牌 — 大金、松下、三菱、York、Midea等",
      "每辆车均备最常见零件 — 电容、风扇电机、PCB、传感器、排水管",
      "紧急排水疏通 — 室内漏水问题当天解决",
      "涵盖服务器机房/办公室/店屋商业紧急情况",
      "家中有老人/婴儿？告诉我们 — 我们优先处理弱势家庭",
    ],
    processMS: [
      { step: "WhatsApp Kecemasan Anda", desc: "Beritahu kami lokasi, jenama, bilangan unit, dan apa yang berlaku. Foto unit dan kondenser luar membantu mempercepatkan diagnosis. Kami membalas dalam beberapa minit." },
      { step: "Dapatkan Harga Disahkan", desc: "Caj diagnostik dikuotakan terlebih dahulu. Anggaran julat pembaikan dikongsi berdasarkan penerangan anda — kapasitor ~RM 180, motor kipas RM 250–350, PCB RM 300–600. Tiada bil kejutan." },
      { step: "Juruteknik Tiba", desc: "Juruteknik terdekat yang tersedia dihantar serta-merta dari rangkaian Klang Valley kami. Kebanyakan ketibaan dalam 30–60 minit. Juruteknik menghubungi apabila hampir tiba." },
      { step: "Diagnos & Baiki", desc: "Diagnostik elektrik + bahan pendingin penuh di tapak. Pembaikan biasa diselesaikan dalam lawatan yang sama. Alat ganti yang jarang ditempah semalaman dengan pulangan keutamaan pada hari perniagaan berikutnya." },
    ],
    processZH: [
      { step: "发WhatsApp描述紧急情况", desc: "告诉我们您的位置、品牌、机器数量以及发生了什么。室内机和室外冷凝器的照片有助于加快诊断。我们几分钟内回复。" },
      { step: "获取确认报价", desc: "诊断费提前报价。根据您的描述分享预估维修范围 — 电容器约RM 180，风扇电机RM 250-350，PCB RM 300-600。无意外费用。" },
      { step: "技术员到达", desc: "最近的可用的技术员立即从我们的巴生谷网络派遣。大多数在30-60分钟内到达。技术员快到时会致电。" },
      { step: "诊断与维修", desc: "现场全面电气+制冷剂诊断。常见维修当天完成。稀有零件隔夜订购，次日优先返回完成。" },
    ],
    priceTableMS: [
      { label: "Caj Diagnostik (Waktu Standard 9pgi–6ptg)", price: "RM 88" },
      { label: "Caj Diagnostik (dikecualikan jika dibaiki lawatan sama)", price: "PERCUMA" },
      { label: "Surcaj Waktu Luar (6ptg–10mlm)", price: "RM 50" },
      { label: "Penggantian Kapasitor (kecemasan paling biasa)", price: "RM 180" },
      { label: "Penggantian Motor Kipas (dalaman)", price: "RM 250–350" },
      { label: "Penggantian Motor Kipas (luar)", price: "RM 300–450" },
      { label: "Penggantian Papan PCB", price: "RM 300–600" },
      { label: "Pembersihan Paip Longkang Kecemasan", price: "RM 120" },
      { label: "Penggantian Kompresor (dikuotakan sebelum kerja)", price: "RM 600–2,000" },
    ],
    priceTableZH: [
      { label: "诊断费（标准时间 上午9点–下午6点）", price: "RM 88" },
      { label: "诊断费（同次维修则免收）", price: "免费" },
      { label: "非工作时间加收（下午6点–晚上10点）", price: "RM 50" },
      { label: "电容器更换（最常见的紧急情况）", price: "RM 180" },
      { label: "风扇电机更换（室内）", price: "RM 250–350" },
      { label: "风扇电机更换（室外）", price: "RM 300–450" },
      { label: "PCB板更换", price: "RM 300–600" },
      { label: "紧急疏通排水管", price: "RM 120" },
      { label: "压缩机更换（开工前报价）", price: "RM 600–2,000" },
    ],
  },
};
