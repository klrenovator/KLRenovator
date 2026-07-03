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
      "Pemasangan aircond profesional untuk semua jenama — penyambungan kabel yang kemas, hari sama tersedia.",
    taglineZH:
      "为所有品牌提供专业冷气安装——布线整洁，可提供当天服务。",
    descriptionMS:
      "KL Renovator memasang semua unit aircond dinding dan ceiling cassette untuk kediaman dan komersial di seluruh KL dan Selangor. Setiap pemasangan termasuk paip kuprum 7 kaki, pendawaian, paip longkang dan pemasangan braket. Juruteknik kami memastikan penyambungan kabel yang kemas, saiz saluran refrigerant yang betul, dan ujian pentauliahan penuh sebelum penyerahan.",
    descriptionZH:
      "KL Renovator在吉隆坡和雪兰莪各地为住宅和商业场所安装所有挂壁式和天花板卡式冷气。每次安装包含7尺铜管、电线、排水管和支架安装。我们的技术员确保布线整洁、冷媒管路尺寸正确，并在交付前进行全面的调试测试。",
    highlightsMS: [
      "Semua jenama — Daikin, Panasonic, Mitsubishi, York, Acson & lagi",
      "Dinding dan ceiling cassette",
      "Termasuk paip kuprum 7 kaki",
      "Termasuk pendawaian dan longkang",
      "Pemasangan braket dan pelaras rata",
      "Pentauliahan pam vakum",
      "Ujian kebocoran sebelum dimulakan",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "所有品牌——大金、松下、三菱、York、Acson等",
      "挂壁式和天花板卡式",
      "含7尺铜管",
      "含布线和排水",
      "支架安装与调平",
      "真空泵调试",
      "启动前泄漏测试",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Tinjau & Rancang", desc: "Juruteknik meninjau dinding, bekalan elektrik dan laluan longkang sebelum menebuk." },
      { step: "Braket & Paip", desc: "Braket dinding dipasang, paip kuprum dan paip longkang disalurkan dan dipasang penyenyap." },
      { step: "Elektrik & Unit Luar", desc: "Pendawaian disambungkan, unit pemampat luar dipasang pada braket." },
      { step: "Vakum & Pentauliahan", desc: "Sistem divakum untuk mengeluarkan kelembapan, refrigerant dilepaskan dan penyejukan diuji." },
    ],
    processZH: [
      { step: "勘测与规划", desc: "技术员在钻孔前勘测墙壁、电源和排水路线。" },
      { step: "支架与管路", desc: "安装墙壁支架，布设并包裹铜管和排水管。" },
      { step: "电气与室外机", desc: "连接电线，将室外压缩机单元安装在支架上。" },
      { step: "抽真空与调试", desc: "对系统抽真空以去除湿气，释放冷媒并测试制冷。" },
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
      "Penyelenggaraan rutin penting — penapis dibersihkan, longkang dibilas, dan pemeriksaan diagnostik penuh.",
    taglineZH:
      "必要的日常维护——清洁滤网、冲洗排水管，以及全面诊断检查。",
    descriptionMS:
      "Servis asas adalah penyelenggaraan rutin penting yang diperlukan oleh aircond anda setiap 3–6 bulan. Juruteknik membersihkan penapis dan panel hadapan, membilas paip longkang, menyembur gegelung dengan pembersih lembut, menyemak sambungan elektrik, dan menguji keluaran penyejukan. Ia memastikan unit anda beroperasi dengan cekap dan memanjangkan jangka hayatnya. Ia bukan pengganti cuci kimia apabila pembersihan mendalam diperlukan.",
    descriptionZH:
      "基本保养是冷气每3–6个月所需的重要日常维护。技术员清洁滤网和前面板，冲洗排水管，用温和清洁剂喷洒盘管，检查电气连接，并测试制冷效果。它能让机器高效运行并延长使用寿命。当需要深度清洁时，它不能替代化学清洗。",
    highlightsMS: [
      "Penapis dibuka, dibasuh dan dipasang semula",
      "Panel hadapan dan sarung dilap",
      "Bilas paip longkang",
      "Gegelung disembur dengan pembersih lembut",
      "Pemeriksaan sambungan elektrik",
      "Ujian keluaran penyejukan",
      "Disyorkan setiap 3–6 bulan",
      "Jaminan kerjatangan 1 bulan",
    ],
    highlightsZH: [
      "滤网拆卸、清洗并重新安装",
      "前面板和外壳擦拭",
      "冲洗排水管",
      "用温和清洁剂喷洒盘管",
      "电气连接检查",
      "制冷效果测试",
      "建议每3–6个月进行一次",
      "工艺保修1个月",
    ],
    processMS: [
      { step: "Penapis & Panel", desc: "Penapis dikeluarkan, dibasuh dan dikeringkan. Panel hadapan dan sarung dilap." },
      { step: "Gegelung & Longkang", desc: "Gegelung penyejat disembur dengan pembersih lembut, paip longkang dibilas." },
      { step: "Pemeriksaan Elektrik", desc: "Sambungan elektrik dan penyentuh diperiksa untuk keketatan dan tanda pembakaran." },
      { step: "Ujian Penyejukan", desc: "Keluaran penyejukan diukur dan disahkan sebelum penyerahan." },
    ],
    processZH: [
      { step: "滤网与面板", desc: "滤网拆下、清洗并晾干。前面板和外壳擦拭干净。" },
      { step: "盘管与排水", desc: "用温和清洁剂喷洒蒸发器盘管，冲洗排水管。" },
      { step: "电气检查", desc: "检查电气连接和接触器是否紧固，有无烧焦迹象。" },
      { step: "制冷测试", desc: "在交付前测量并确认制冷效果。" },
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
      "为吉隆坡和雪兰莪各地的完全故障、严重漏水、室外机故障和紧急维修提供当天应急响应。",
    descriptionMS:
      "Apabila aircond anda tiba-tiba berhenti berfungsi, bocor teruk, atau menjatuhkan MCB, anda memerlukan bantuan hari ini — bukan esok. KL Renovator menghantar juruteknik terlatih ke seluruh Kuala Lumpur dan Selangor untuk diagnosis dan pembaikan kecemasan hari sama. Caj diagnostik RM 88, dikecualikan jika pembaikan diselesaikan dalam lawatan yang sama. Kebanyakan kerja kecemasan dihantar dalam 30–60 minit selepas pengesahan WhatsApp.",
    descriptionZH:
      "当您的冷气突然停止工作、严重漏水或跳闸时，您需要今天就得到帮助——而不是明天。KL Renovator在吉隆坡和雪兰莪各地派遣训练有素的技术员提供当天紧急诊断和维修。诊断费RM 88，若在同次上门完成维修则免收。大多数紧急工作在WhatsApp确认后30-60分钟内派遣。",
    highlightsMS: [
      "Penghantaran hari sama ke seluruh KL & Selangor",
      "Respons 30–60 minit selepas pengesahan",
      "Diagnostik RM 88 — dikecualikan jika dibaiki dalam lawatan yang sama",
      "Semua jenama diservis",
      "Pembaikan kapasitor, motor kipas, PCB hari sama",
      "Pembersihan longkang kecemasan hari sama",
      "Waktu luar sehingga 10 malam (caj lebih RM 50)",
      "Sebut harga telus sebelum kerja dimulakan",
    ],
    highlightsZH: [
      "吉隆坡和雪兰莪各地当天派遣",
      "确认后30–60分钟响应",
      "诊断费RM 88——同次维修则免收",
      "可维修所有品牌",
      "当天修复电容器、风扇电机、PCB",
      "当天紧急疏通排水",
      "非工作时间至晚上10点（加收RM 50）",
      "开始工作前提供透明报价",
    ],
    processMS: [
      { step: "WhatsApp Sekarang", desc: "Hantar lokasi, bilangan unit dan masalah anda ke +60182983573. Kami membalas dalam beberapa minit." },
      { step: "Sahkan Sebut Harga", desc: "Caj diagnostik dan anggaran kos pembaikan disahkan sebelum penghantaran. Tiada kejutan." },
      { step: "Juruteknik Dihantar", desc: "Juruteknik terlatih terdekat dihantar dengan segera. Kebanyakan ketibaan dalam 30–60 minit." },
      { step: "Diagnos & Baiki", desc: "Diagnostik penuh di tapak, pembaikan dikuotakan dan diselesaikan dalam lawatan yang sama jika boleh." },
    ],
    processZH: [
      { step: "立即WhatsApp", desc: "将您的位置、机器数量和问题描述发送至 +60182983573。我们几分钟内回复。" },
      { step: "确认报价", desc: "派遣前确认诊断费和预估维修费用。无隐藏收费。" },
      { step: "派遣技术员", desc: "最近的训练有素的技术员立即派遣。大多数30-60分钟内到达。" },
      { step: "诊断与修复", desc: "现场全面诊断，尽可能在同次上门完成报价和维修。" },
    ],
    priceTableMS: [
      { label: "Caj Diagnostik (Waktu Standard 9pgi–6ptg)", price: "RM 88" },
      { label: "Caj Diagnostik (dikecualikan jika dibaiki lawatan sama)", price: "PERCUMA" },
      { label: "Caj Lebih Waktu Luar (6ptg–10mlm)", price: "RM 50" },
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
