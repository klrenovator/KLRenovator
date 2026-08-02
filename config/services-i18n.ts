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
      "Pembersihan kimia tekanan tinggi 80–120 PSI semasa unit kekal terpasang — melarutkan biofilm degil, membersihkan paip tersumbat, dan memulihkan aliran udara. Dari RM 2.50/PSI.",
    taglineZH:
      "机器保持挂墙状态进行80–120 PSI高压化学深度清洁——高效溶解顽固生物膜、清理疏通管路并全面恢复强劲风量。从 RM 2.50/PSI 起。",
    descriptionMS:
      "Perkhidmatan Cuci Kimia Bertekanan kami direka khas untuk penghawa dingin yang memerlukan pembersihan mendalam melebihi penyelenggaraan rutin penapis. Selepas 12 hingga 18 bulan operasi harian, sirip gegelung penyejat, roda kipas, dan barrel dalaman mengumpul biofilm padat, hama habuk, dan enap cemar degil yang tidak dapat ditembus oleh servis asas. Semasa cuci kimia bertekanan, juruteknik KL Renovator menyembur larutan kimia alkali selamat dimakan pada 80–120 PSI terus ke dalam unit dalaman yang kekal terpasang di dinding. Kimia berbuih melarutkan sisa berminyak dan biofilm dalam beberapa minit tanpa merosakkan gegelung atau sirip kuprum yang sensitif. Seterusnya, bilasan air bertekanan tinggi membilas setiap kotoran terlarut keluar melalui dulang dan paip saliran untuk mencegah penyumbatan masa depan. Keseluruhan proses mengambil masa kira-kira 60 hingga 75 minit setiap unit tanpa mengotorkan ruang anda, kerana pasukan kami memasang kanvas kalis air dan alas pelindung tugas berat untuk melindungi dinding, lantai dan perabot anda. Dengan harga telus bermula dari RM 120 untuk unit dinding 1.0–1.5 HP, servis ini memulihkan kecekapan penyejukan ke tahap hampir baharu.",
    descriptionZH:
      "我们的高压化学清洗服务专为需要超越日常过滤网清洁的冷气深度保养而设计。经过12至18个月的日常运转，冷气蒸发器盘管翅片、风轮及内部滚筒会积累厚重的生物膜、尘螨及顽固菌泥，这是普通基本保养无法触及深层的。在高压化学清洗过程中，KL Renovator技术员将食品级安全碱性化学溶液以80至120 PSI高压直接喷入挂壁室内机内部。起泡化学液在数分钟内迅速分解油性污垢与生物膜，且不损伤敏感的铜盘管或翅片。紧接着，使用高压清水冲洗将所有彻底溶解的污染物经过排水盘与排水管冲离，从而有效预防未雨绸缪的生物管路堵塞。整套作业每台约需60至75分钟，且全程零脏乱——我们的团队会严密铺设重型防水罩和保护帆布，确保您的墙面、地板与周边家具完好无损。挂壁式1.0–1.5马力透明明码实价从 RM 2.50/PSI 起，本服务能够全面恢复冷气的高效制冷表现与室内清新洁净送风。",
    highlightsMS: [
      "Semburan tekanan tinggi 80–120 PSI mencapai jauh ke dalam sirip gegelung & roda kipas",
      "Kimia alkali selamat dimakan — melarutkan kulat & biofilm, bukan sekadar habuk permukaan",
      "Unit kekal terpasang — tiada pembongkaran, tiada kerosakan dinding, tiada kucar-kacir",
      "Bilas paip longkang penuh disertakan — membersihkan biofilm dari longkang sebelum tersumbat",
      "Membunuh bakteria, hama habuk & alergen yang menyebabkan kerengsaan pernafasan",
      "Output penyejukan biasanya dipulihkan kepada 90–95% prestasi unit baharu",
      "Mengambil masa 60–75 minit — anda boleh guna AC serta-merta selepas siap",
      "Disyorkan setiap 12 bulan (setiap 6–8 bulan untuk tingkat bawah/berhampiran jalan)",
    ],
    highlightsZH: [
      "80-120 PSI高压喷雾深入盘管翅片和风轮",
      "食品级碱性化学液——溶解霉菌和生物膜，不仅是表面灰尘",
      "机器保持挂墙——无需拆卸、无墙面损坏、无脏乱",
      "含全排水管冲洗——在堵塞前清除排水管中的生物膜",
      "杀灭引起呼吸道刺激的细菌、尘螨和过敏原",
      "制冷输出通常恢复到新机性能的90-95%",
      "耗时60-75分钟——完成后可立即使用冷气",
      "建议每12个月一次（底层/近路面每6-8个月）",
    ],
    processMS: [
      { step: "Lindungi Ruang Anda", desc: "Kain pelindung kalis air tugas berat menutup lantai, dinding di bawah unit, dan perabot berdekatan. Kimia selamat dimakan tetapi kami melindungi semuanya tanpa mengira." },
      { step: "Aplikasi Kimia", desc: "Larutan kimia alkali disembur pada tekanan ke dalam sirip gegelung, roda kipas, barrel kipas, dan perumahan dalaman. Kimia berbuih apabila terkena biofilm — anda akan melihat enap cemar coklat/hitam mula larut dalam beberapa minit." },
      { step: "Bilas Tekanan Tinggi", desc: "Jet air bertekanan membilas bahan cemar terlarut melalui paip longkang. Kami terus membilas sehingga air menjadi jernih — tanda gegelung dan laluan longkang bersih sepenuhnya. Paip longkang kemudian dibilas dengan air bersih untuk mengelakkan penyumbatan masa depan." },
      { step: "Pasang Semula, Uji & Serah", desc: "Penapis dipasang semula, panel hadapan diklip kembali. Unit dijalankan selama 10–15 minit. Suhu udara bekalan diukur — anda akan rasai perbezaannya dengan serta-merta. Kawasan dilap bersih, kad kerja ditandatangani." },
    ],
    processZH: [
      { step: "保护您的空间", desc: "重型防水布覆盖地板、机器下方墙面和附近家具。化学液是食品安全的，但我们仍保护一切。" },
      { step: "化学液喷涂", desc: "碱性化学溶液以压力喷入盘管翅片、风轮、风扇桶和内部壳体。化学液接触生物膜时起泡——您会看到棕色/黑色淤泥在几分钟内开始溶解。" },
      { step: "高压冲洗", desc: "加压水柱将溶解的污染物通过排水管冲出。我们持续冲洗直到水流清澈——表明盘管和排水通道已完全清洁。然后用清水冲洗排水管以防将来堵塞。" },
      { step: "重装、测试与交付", desc: "过滤网重装，前面板卡回。机器运行10-15分钟。测量送风温度——您会立即感受到差异。区域擦拭干净，签署工作卡。" },
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
      "Pembongkaran lengkap dan cucian mendalam setiap komponen dalaman — penyelesaian muktamad untuk kebocoran air berterusan, pembentukan ais, dan pengabaian bertahun-tahun. Dari RM 220.",
    taglineZH:
      "每个内部零件的完全拆卸和深度清洁——持续漏水、结冰和多年未维护的终极解决方案。从RM 220起。",
    descriptionMS:
      "Apabila cuci kimia tidak mencukupi — apabila air telah menitis ke dinding anda selama berminggu-minggu, apabila anda boleh melihat ais terbentuk pada paip kuprum, apabila bau dari unit membuat seluruh bilik tidak selesa — masalahnya telah melampaui apa yang boleh dibaiki oleh cucian terpasang. Overhaul kimia adalah servis aircond paling teliti yang kami lakukan. Kami mengeluarkan seluruh unit dalaman dari dinding, membukanya sekeping demi sekeping, dan mencuci mendalam setiap komponen: gegelung penyejat, roda kipas, barrel kipas, dulang longkang, dulang titisan, perumahan dalaman, louvre, dan semua penutup plastik. Setiap bahagian direndam dalam larutan kimia selamat dimakan, digosok jika perlu, kemudian dibilas pada tekanan tinggi sehingga bersih seperti kilang. Dulang longkang — hampir selalu punca utama kebocoran berterusan — mendapat perhatian individu dan disahkan kalis air sebelum pemasangan semula. Ini adalah servis yang menghidupkan semula unit yang terabai. RM 220 untuk dinding 1.0–1.5 HP.",
    descriptionZH:
      "当化学清洗不够用时——当水滴在墙上流了好几周，当您能看到铜管上结冰，当机器的气味让整个房间都不舒服——问题已经超出了挂墙清洗能解决的范围。化学大修是我们提供的最彻底的冷气服务。我们将整个室内机从墙上取下，逐件拆开，深度清洁每一个零件：蒸发器盘管、风轮、风扇桶、排水盘、滴水盘、内部壳体、百叶窗和所有塑料罩。每个零件浸泡在食品级安全化学溶液中，需要时刷洗，然后高压冲洗至工厂般干净。排水盘——几乎总是持续漏水的根本原因——得到单独关注并在重装前确认防水。这就是让被忽视的机器重获新生的服务。挂壁式1.0-1.5 HP RM 220。耗时2-3小时。",
    highlightsMS: [
      "Unit dalaman penuh dikeluarkan dari dinding dan dibongkar sepenuhnya",
      "Setiap komponen direndam & dicuci mendalam: gegelung, kipas, dulang longkang, perumahan, louvre",
      "Dulang longkang digosok secara individu — punca #1 kebocoran air berterusan",
      "Roda kipas dikeluarkan dari aci motor dan direndam — memulihkan aliran udara penuh",
      "Perumahan dalaman dan saluran udara digosok — menghapuskan pembentukan kulat bertahun-tahun",
      "Dipasang semula dengan tork yang betul pada semua skru, gasket diperiksa, laluan longkang disahkan",
      "Prestasi penyejukan biasanya dipulihkan ke spesifikasi kilang asal",
      "Waranti mutu kerja 1 bulan — kad kerja servis penuh dengan nota sebelum/selepas",
    ],
    highlightsZH: [
      "室内机完全从墙上取下并彻底拆解",
      "每个零件浸泡和深度清洁：盘管、风轮、排水盘、外壳、百叶窗",
      "排水盘单独刷洗——持续漏水的头号原因",
      "风轮从电机轴上取下浸泡——恢复全风量",
      "内部壳体和风道刷洗——消除多年霉菌积聚",
      "按正确扭矩重装所有螺丝，检查密封圈，验证排水通道",
      "制冷性能通常恢复到原厂规格",
      "1个月工艺保修——附前后对比记录的完整服务工作卡",
    ],
    processMS: [
      { step: "Lindung & Keluarkan", desc: "Kain pelindung kalis air dibentangkan. Bahan pendingin dipam turun ke unit luar (tiada gas hilang). Unit dalaman dibuka dengan berhati-hati dari braket dinding dan dibawa ke kawasan pembersihan yang disediakan di tapak." },
      { step: "Pembongkaran Penuh", desc: "Unit dibuka sepenuhnya. Gegelung dikeluarkan, roda kipas ditarik dari aci motor, dulang longkang dibuka skru, perumahan dalaman diasingkan, louvre dan penutup ditanggalkan. Setiap bahagian disusun untuk pembersihan individu." },
      { step: "Rendaman Kimia & Gosok", desc: "Setiap komponen direndam atau disembur dengan larutan kimia selamat dimakan dan dibiarkan meresap. Biofilm degil dan mendapan mineral digosok dengan berus lembut — tidak pernah menggunakan berus dawai yang akan merosakkan sirip. Dulang longkang diperiksa untuk keretakan di bawah cahaya terang." },
      { step: "Bilas Tekanan Tinggi & Pasang Semula", desc: "Setiap bahagian dibilas pada tekanan sehingga air menjadi jernih sepenuhnya. Komponen dikeringkan, kemudian unit dipasang semula dengan berhati-hati mengikut urutan terbalik. Semua tork skru diperiksa. Unit dipasang semula pada braket dinding, bahan pendingin dilepaskan, penyejukan diuji selama 15–20 minit, laluan longkang diuji dengan air." },
    ],
    processZH: [
      { step: "保护与拆卸", desc: "铺好防水布。制冷剂泵入室外机（不损失气体）。小心地从墙支架上卸下室内机，带到现场准备好的清洁区域。" },
      { step: "完全拆解", desc: "机器完全打开。取出盘管，从电机轴上拉出风轮，拧下排水盘，分离内部壳体，取下百叶窗和面板。每个零件摆放好进行单独清洁。" },
      { step: "化学浸泡与刷洗", desc: "每个零件浸入或喷涂食品级安全化学溶液并静置浸泡。顽固的生物膜和矿物沉积物用软刷轻轻刷洗——绝不用会损坏翅片的钢丝刷。在强光下检查排水盘是否有裂缝。" },
      { step: "高压冲洗与重装", desc: "每个零件在高压下冲洗至水流完全清澈。零件晾干，然后按相反顺序小心重装。检查所有螺丝扭矩。机器重新安装到墙支架上，释放制冷剂，运行15-20分钟测试制冷，用水测试排水通道。" },
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
    titleZH: "精准充气/冷媒平衡",
    taglineMS:
      "Tambahan gas bahan pendingin tepat dengan pengukuran tolok manifold. R22, R410A & R32. Pemeriksaan kebocoran disertakan setiap kerja. Dari RM 2.50/PSI.",
    taglineZH:
      "使用歧管压力表精准测量充注制冷剂。R22、R410A和R32。每次作业含泄漏检查。从 RM 2.50/PSI 起。",
    descriptionMS:
      "Aircond anda bersih. Penapis baru dicuci. Gegelung baru sahaja diservis. Tetapi udara yang keluar hampir tidak sejuk dan kompressor luar berjalan tanpa henti tanpa mencapai suhu. Ini adalah petanda klasik bahan pendingin rendah — 'darah' sistem penghawa dingin anda. Tanpa cas bahan pendingin yang betul beredar melalui talian kuprum, sistem secara fizikal tidak dapat memindahkan haba dari dalam ke luar, tidak kira sekeras mana kompressor bekerja. KL Renovator menggunakan tolok manifold digital ketepatan untuk mengukur tekanan statik, tekanan sedutan, dan tekanan pelepasan sistem anda terhadap spesifikasi pengeluar untuk model dan jenis bahan pendingin tepat anda — R22, R410A, atau R32. Kami kemudian menambah bahan pendingin dalam kenaikan terkawal sambil memantau bacaan tolok sehingga sistem seimbang mengikut spesifikasi. Setiap tambahan gas termasuk pemeriksaan kebocoran fizikal menyeluruh di semua sambungan flare yang boleh diakses, injap servis, dan permukaan gegelung penyejat dan kondenser. Kerana bahan pendingin tidak 'digunakan' — jika rendah, ia bocor keluar di suatu tempat. Dari RM 2.50/PSI.",
    descriptionZH:
      "您的冷气是干净的。过滤网刚洗过。盘管刚保养过。但吹出来的风几乎没有凉意，室外压缩机不停运转却达不到温度。这是制冷剂不足的典型信号——冷气系统的‘血液’。没有正确充注量的制冷剂在铜管中循环，系统物理上无法将热量从室内转移到室外，无论压缩机如何努力运转。KL Renovator使用精密数字歧管压力表，对照制造商为您机器型号和制冷剂类型（R22、R410A或R32）制定的规格来测量系统静压、吸气压力和排气压力。然后我们在监控压力表读数的同时以受控增量添加制冷剂，直到系统平衡到规格要求。每次充气都包括对所有可触及的喇叭口接头、检修阀以及蒸发器和冷凝器盘管表面进行彻底的物理泄漏检查。因为制冷剂不会‘消耗’——如果水平低，就是某处泄漏了。从 RM 2.50/PSI 起。",
    highlightsMS: [
      "Tolok manifold digital — pengukuran tekanan tepat, bukan tekaan",
      "R22, R410A & R32 — jenis bahan pendingin betul dipadankan dengan papan nama unit anda",
      "Tambahan berperingkat dengan pemantauan tolok berterusan — tidak pernah terlebih isi",
      "Pemeriksaan kebocoran penuh di semua sambungan flare, injap servis & kedua-dua gegelung",
      "Pemeriksaan amp-draw kompressor luar — mengesahkan beban elektrik yang sihat",
      "Penurunan suhu diukur sebelum & selepas — anda lihat peningkatan pada termometer",
      "Pengendalian bahan pendingin bertauliah — tiada pelepasan, mesin pemulihan digunakan jika perlu",
      "Waranti mutu kerja 1 bulan untuk tambahan gas dan pemeriksaan kebocoran",
    ],
    highlightsZH: [
      "数字歧管压力表——精确压力测量，而非猜测",
      "R22、R410A和R32——匹配您机器铭牌的正确制冷剂类型",
      "持续监控压力表的渐进式充注——绝不充注过量",
      "所有喇叭口接头、检修阀和两个盘管的全面泄漏检查",
      "室外压缩机电流检测——验证健康的电气负载",
      "测量前后温差——您在温度计上看到改善",
      "认证制冷剂操作——不排放，需要时使用回收机",
      "充气和泄漏检查享1个月工艺保修",
    ],
    processMS: [
      { step: "Pemeriksaan Simptom & Visual", desc: "Juruteknik memeriksa aduan anda, memeriksa kondenser luar untuk kesan minyak (penunjuk kebocoran), memeriksa gegelung dalaman untuk ais, mengukur perbezaan suhu bilik-ke-bekalan dengan termometer digital." },
      { step: "Sambungan Tolok & Diagnosis", desc: "Tolok manifold digital disambungkan ke port servis sedutan dan pelepasan. Tekanan statik, tekanan sedutan semasa berjalan, dan tekanan pelepasan semuanya direkodkan. Bacaan dibandingkan dengan spesifikasi pengeluar untuk jenis bahan pendingin dan suhu ambien unit anda." },
      { step: "Pemeriksaan Kebocoran", desc: "Semua sambungan flare yang boleh diakses di unit dalaman dan luaran diperiksa dengan pengesan kebocoran elektronik atau larutan gelembung sabun. Penutup injap servis, teras injap Schrader, dan permukaan gegelung yang kelihatan diperiksa. Sebarang kebocoran yang ditemui dilaporkan dan pembaikan dikuotakan sebelum gas ditambah." },
      { step: "Tambahan Tepat & Sahkan", desc: "Bahan pendingin ditambah dalam kenaikan terkawal sambil memantau tolok. Sasaran: tekanan sedutan dalam julat pengeluar untuk suhu ambien semasa. Penurunan suhu diukur semula — sasaran perbezaan 8–12°C. Amp-draw kompressor diperiksa. Keputusan direkodkan pada kad kerja anda." },
    ],
    processZH: [
      { step: "症状与目视检查", desc: "技术员检查您的投诉，检查室外冷凝器是否有油渍（泄漏指示），检查室内盘管是否结冰，用数字温度计测量室温与送风温差。" },
      { step: "连接压力表与诊断", desc: "数字歧管压力表连接到吸气和排气检修口。记录静压、运行吸气压力和排气压力。读数与您机器制冷剂类型和环境温度的制造商规格进行对比。" },
      { step: "泄漏检查", desc: "所有室内外机可触及的喇叭口接头用电子检漏仪或肥皂泡溶液检查。检查检修阀帽、Schrader阀芯和可见盘管表面。发现的任何泄漏都会被报告并在加气前报价维修。" },
      { step: "精准充注与验证", desc: "在监控压力表的同时以受控增量添加制冷剂。目标：吸气压力在当前环境温度下处于制造商范围内。重新测量温差——目标8-12°C差异。检查压缩机电流。结果记录在您的工作卡上。" },
    ],
    priceTableMS: [
      { label: "Isi Semula Gas R22", price: "RM 2.50 / PSI" },
      { label: "Isi Semula Gas R410A", price: "RM 3.00 / PSI" },
      { label: "Isi Semula Gas R32", price: "RM 3.00 / PSI" },
      { label: "Pemeriksaan Kebocoran", price: "RM 88" },
    ],
    priceTableZH: [
      { label: "R22 冷媒充注", price: "RM 2.50 / PSI" },
      { label: "R410A 冷媒充注", price: "RM 3.00 / PSI" },
      { label: "R32 冷媒充注", price: "RM 3.00 / PSI" },
      { label: "泄漏检查", price: "RM 88" },
    ],
  },

  // ── 4. REPAIR & TROUBLESHOOTING ────────────────────────────────────────
  repair: {
    titleMS: "Penyelesaian Masalah & Pembaikan",
    titleZH: "故障排查与维修",
    taglineMS:
      "Diagnosis elektrik dan mekanikal sistematik untuk sebarang kerosakan aircond. Kod ralat dinyahkod, kerosakan dikenal pasti, sebut harga telus. Diagnostik RM 88 dikecualikan dengan pembaikan.",
    taglineZH:
      "系统性的电气和机械诊断处理任何冷气故障。解码错误代码，精确定位故障，透明报价。RM 88诊断费随维修免除。",
    descriptionMS:
      "Aircond anda mengeluarkan bunyi mengisar pada jam 2 pagi. Lampu pemasa berkelip 5 kali dan unit tidak mahu hidup. MCB jatuh setiap kali kompressor cuba beroperasi. Ini bukan masalah 'pembersihan' — ini adalah kerosakan elektrik atau mekanikal yang memerlukan juruteknik terlatih dengan multimeter, tolok manifold, dan pengetahuan kod ralat khusus jenama. KL Renovator mendiagnosis dan membaiki setiap kerosakan aircond biasa: kapasitor rosak (punca #1 'unit berdengung tetapi kipas tidak berputar'), motor kipas tersekat, kontaktor terbakar, papan kawalan PCB rosak, penderia suhu dan termistor rosak, pam longkang rosak, kerosakan elektrik kompressor, dan isu litar bahan pendingin. Kami membawa kapasitor, kontaktor, motor kipas, penderia, pam longkang, dan papan PCB universal dalam setiap van. Yuran diagnostik RM 88, dikecualikan jika pembaikan dilakukan pada lawatan yang sama. Jaminan alat ganti 3 bulan untuk setiap penggantian. Sebelum kami menyentuh sebarang wayar, anda mendapat harga yang jelas — dan hak untuk menolak tanpa rasa bersalah.",
    descriptionZH:
      "您的冷气在凌晨2点发出磨擦声。定时器灯闪烁5次，机器无法启动。每次压缩机启动时MCB都跳闸。这些不是‘清洁’问题——它们是需要训练有素的技术员用万用表、歧管压力表和品牌专用错误代码知识来诊断的电气或机械故障。KL Renovator诊断和维修所有常见冷气故障：故障电容（#1原因导致‘机器嗡嗡响但风扇不转’）、卡死风扇电机、烧毁接触器、故障PCB控制板、损坏温度传感器和热敏电阻、损坏排水泵、压缩机电气故障和制冷剂回路问题。我们每辆车上都携带电容、接触器、风扇电机、传感器、排水泵和通用PCB板。RM 88诊断费，同次维修则免收。每个更换件享3个月零件保修。在我们触碰任何一根电线之前，您会得到明确的价格——以及不勉强的拒绝权利。",
    highlightsMS: [
      "Yuran diagnostik RM 88 — dikecualikan sepenuhnya jika pembaikan selesai lawatan sama",
      "Diagnosis multimeter + tolok manifold — bukan tekaan",
      "Penyahkodan kod ralat untuk semua 20 jenama — Daikin, Panasonic, Mitsubishi & banyak lagi",
      "Kapasitor, motor kipas, kontaktor, penderia, PCB tersedia dalam setiap van",
      "Ujian elektrik kompressor — rintangan belitan, penebatan, amp-draw",
      "Diagnosis tekanan bahan pendingin — membezakan isu gas dari kerosakan elektrik",
      "Pembaikan hari sama ~85% kerja — alat ganti jarang ditempah semalaman jika perlu",
      "Jaminan alat ganti 3 bulan + jaminan mutu kerja 1 bulan",
    ],
    highlightsZH: [
      "诊断费RM 88——同次完成维修则全免",
      "万用表+歧管压力表诊断——而非猜测",
      "所有20个品牌的错误代码解码——大金、松下、三菱等",
      "电容、风扇电机、接触器、传感器、PCB每车配备",
      "压缩机电气测试——绕组电阻、绝缘、电流",
      "制冷剂压力诊断——区分气体问题和电气故障",
      "约85%工作当天修复——稀有零件隔夜订购",
      "3个月零件保修+1个月工艺保修",
    ],
    processMS: [
      { step: "Dengar & Ukur", desc: "Anda menerangkan apa yang berlaku dan bila. Juruteknik memeriksa corak kelipan kod ralat, mendengar bunyi luar biasa, mengukur voltan di pengasing, memeriksa status MCB, dan menguji isyarat alat kawalan jauh/termostat." },
      { step: "Diagnosis Sistematik", desc: "Ujian multimeter: bacaan mikrofarad kapasitor, rintangan belitan motor kipas, rintangan terminal kompressor dan penebatan, rintangan termistor penderia pada suhu ambien. Tolok manifold memeriksa tekanan statik bahan pendingin jika penyejukan lemah. Setiap bacaan dibandingkan dengan spesifikasi pengeluar." },
      { step: "Sebut Harga Telus", desc: "Kerosakan diterangkan dalam bahasa mudah. Harga alat ganti dan buruh yang tepat dikuotakan. Jika kerosakan mempunyai pelbagai punca yang mungkin, kami menerangkan pendekatan paling-mungkin-dulu supaya anda faham apa yang anda bayar. Tiada kerja dimulakan tanpa kelulusan lisan atau WhatsApp anda." },
      { step: "Ganti & Sahkan", desc: "Komponen rosak diganti dengan alat ganti spesifikasi OEM atau kualiti setara. Semua sambungan ditorque dan ditebat. Unit dijalankan melalui kitaran penuh — penyejukan, kelajuan kipas, hidup/mati termostat, fungsi longkang. Bacaan sebelum/selepas direkodkan pada kad kerja anda." },
    ],
    processZH: [
      { step: "倾听与测量", desc: "您描述发生了什么以及何时发生。技术员检查错误代码闪烁模式，倾听异常声音，在隔离开关处测量电压，检查MCB状态，测试遥控器/温控器信号。" },
      { step: "系统诊断", desc: "万用表测试：电容微法读数、风扇电机绕组电阻、压缩机端子电阻和绝缘、传感器热敏电阻在环境温度下的阻值。如果制冷弱，歧管压力表检查制冷剂静态压力。每个读数与制造商规格对比。" },
      { step: "透明报价", desc: "故障用通俗语言解释。精确的替换零件和人工价格报价。如果故障有多个可能原因，我们解释最可能优先法，让您了解您的花费。未经您口头或WhatsApp批准，不开始任何工作。" },
      { step: "更换与验证", desc: "故障零件用OEM规格或同等质量零件更换。所有连接拧紧并绝缘。机器运行完整周期——制冷、风速、温控器启停、排水功能。前后读数记录在您的工作卡上。" },
    ],
    priceTableMS: [
      { label: "Yuran Diagnostik (dikecualikan dengan pembaikan)", price: "RM 88" },
      { label: "Penggantian Kapasitor", price: "RM 150 – 250" },
      { label: "Penggantian Motor Kipas", price: "RM 250 – 380" },
      { label: "Penggantian Papan PCB", price: "RM 280 – 600" },
      { label: "Penggantian Penderia Suhu", price: "RM 150 – 250" },
      { label: "Penggantian Kontaktor", price: "RM 150 – 200" },
      { label: "Penggantian Pam Longkang", price: "RM 350 – 550" },
      { label: "Penggantian Kompresor", price: "RM 800 – 2,000" },
    ],
    priceTableZH: [
      { label: "诊断费（随维修免除）", price: "RM 88" },
      { label: "电容更换", price: "RM 150 – 250" },
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
      "Servis pakar untuk unit ceiling cassette komersial — pejabat, kedai, restoran. Cuci kimia, overhaul, dan pembaikan. Penjadualan luar waktu tersedia.",
    taglineZH:
      "商业天花板卡式机专业服务——办公室、商店、餐厅。化学清洗、大修和维修。可安排非工作时间。",
    descriptionMS:
      "Ceiling cassette adalah tunjang utama ruang komersial Malaysia: unit 4-hala yang dipasang ke dalam grid siling pejabat, kedai runcit, restoran, klinik, atau salon anda. Ia lebih kompleks daripada unit dinding — kipas lebih besar, dulang longkang disepadukan ke dalam panel siling, dan longkang tersumbat tidak menitis ke lantai (di mana anda boleh melihatnya) tetapi ke dalam ruang siling (di mana ia merosakkan papan gipsum anda secara senyap selama berminggu-minggu sebelum anda perasan kesan kotoran). KL Renovator pakar dalam servis ceiling cassette untuk premis komersial di seluruh Lembah Klang. Juruteknik kami terlatih untuk mengakses unit siling dengan selamat, mengeluarkan panel kaset berat, mencuci kipas dan gegelung secara kimia, mencuci mendalam dulang longkang (punca #1 kebocoran siling tersembunyi), dan menguji semuanya sebelum menutup. Kami juga mengendalikan tapak komersial berbilang unit — restoran dengan 3–4 kaset, pejabat dengan 6–10, lantai runcit dengan unit kaset dan dinding bercampur. Penjadualan selaras, ketersediaan luar waktu (petang/hujung minggu), dan diskaun volum untuk kontrak komersial tetap.",
    descriptionZH:
      "天花板卡式机是马来西亚商业空间的主力：嵌入办公室、零售店、餐厅、诊所或沙龙天花板网格的四面出风机器。它们比挂壁式更复杂——风扇更大，排水盘集成在天花板面板中，堵塞的排水管不会滴到地板上（您能看到的地方）而是滴入天花板空隙中（在您注意到污渍之前默默损坏石膏板数周）。KL Renovator专精于巴生谷各地商业场所的天花板卡式机服务。我们的技术员经过培训，能安全接触吊顶机器、拆卸沉重的卡式面板、化学清洗风扇和盘管、深度清洁排水盘（隐藏天花板泄漏的#1源头），并在合上之前测试一切。我们还处理多台商业场所——有3-4台卡式机的餐厅、6-10台的办公室、卡式和挂壁混合的零售楼层。协调排程、非工作时间（晚上/周末）可用、定期商业合同享批量折扣。",
    highlightsMS: [
      "Juruteknik ceiling cassette pakar — terlatih untuk akses siling selamat & pengendalian panel berat",
      "Cuci kimia dari RM 220 — rawatan kimia gegelung, kipas & dulang longkang",
      "Overhaul kimia dari RM 430 — pembongkaran penuh kaset, setiap komponen dicuci mendalam",
      "Cucian mendalam dulang longkang wajib pada setiap servis — kebocoran siling tersembunyi dihentikan",
      "Penjadualan komersial berbilang unit — restoran, pejabat, lantai runcit, klinik",
      "Semua jenama komersial — Daikin, Mitsubishi, Panasonic, York, Carrier, Acson, Midea & banyak lagi",
      "Servis luar waktu — petang & hujung minggu supaya perniagaan anda tidak terganggu",
      "Diskaun volum untuk kontrak penyelenggaraan komersial tetap — minta sebut harga khas",
    ],
    highlightsZH: [
      "专业天花板卡式机技术员——训练有素的安全吊顶作业和重型面板操作",
      "化学清洗从RM 220起——盘管、风扇和排水盘化学处理",
      "化学大修从RM 430起——卡式机完全拆卸，每个零件深度清洁",
      "每次服务强制深度清洁排水盘——从源头阻止隐藏天花板漏水",
      "多台商业排程——餐厅、办公室、零售楼层、诊所",
      "所有商业品牌——大金、三菱、松下、York、Carrier、Acson、Midea等",
      "非工作时间服务——晚上和周末，您的业务不受打扰",
      "定期商业维护合同享批量折扣——联系我们获取定制报价",
    ],
    processMS: [
      { step: "Akses Siling Selamat", desc: "Juruteknik menyediakan tangga atau perancah dengan penstabil. Kain pelindung menutup lantai, perabot, dan stesen kerja di bawah. Panel ceiling cassette diturunkan dengan berhati-hati — panel ini berat (10–15 kg) dan memerlukan pengendalian yang betul untuk mengelakkan kerosakan grid siling." },
      { step: "Servis Penapis, Gegelung & Kipas", desc: "Penapis dikeluarkan, dicuci, dan dikeringkan. Gegelung diperiksa untuk corak pembentukan kotoran (menunjukkan isu aliran udara). Larutan kimia disapu pada gegelung dan roda kipas sentrifugal. Roda kipas dikeluarkan dari aci motor untuk pembersihan menyeluruh jika melakukan cuci kimia atau overhaul." },
      { step: "Pemeriksaan Dulang Longkang & Laluan", desc: "Dulang longkang diperiksa di bawah cahaya terang untuk enap cemar, biofilm, dan keretakan halus. Saluran longkang dibersihkan dengan bilasan bertekanan. Laluan longkang diuji dengan air — tuang air ke dalam dulang dan sahkan ia mengalir bebas ke titik longkang. Langkah ini menghalang kebocoran siling tersembunyi yang menyebabkan kerosakan papan gipsum." },
      { step: "Pasang Semula, Uji & Bersihkan", desc: "Komponen dipasang semula. Unit dijalankan selama 15–20 minit melalui kitaran penuh. Output penyejukan, penentukuran termostat, dan fungsi longkang disahkan. Panel kaset diklip kembali ke grid siling. Kawasan kerja divakum. Kad kerja ditandatangani dengan bacaan dan nota." },
    ],
    processZH: [
      { step: "安全吊顶作业", desc: "技术员架设带稳定器的梯子或脚手架。防水布覆盖下方地板、家具和工作站。天花板卡式面板小心地松开并放下——这些面板很重（10-15公斤），需要正确处理以避免损坏天花板网格。" },
      { step: "过滤网、盘管和风扇维护", desc: "取出过滤网，清洗并晾干。检查盘管的积尘模式（指示气流问题）。化学溶液施加到盘管和离心风轮上。如果做化学清洗或大修，风轮从电机轴上取下彻底清洁。" },
      { step: "排水盘和通道检查", desc: "在强光下检查排水盘的淤泥、生物膜和细微裂缝。用加压冲洗清理排水出口。用水测试排水通道——倒入水到盘里，验证水能否自由流到排水点。这一步防止导致石膏板损坏的隐藏天花板漏水。" },
      { step: "重装、测试和清洁", desc: "零件重装。机器运行15-20分钟全周期。验证制冷输出、温控器校准和排水功能。卡式面板卡回天花板网格。工作区域吸尘。签署带读数和备注的工作卡。" },
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
      { label: "基本保养 · 1.0 – 1.5 HP", price: "RM 150" },
      { label: "基本保养 · 2.0 – 3.0 HP", price: "RM 200" },
      { label: "基本保养 · 3.5 – 5.0 HP", price: "RM 250" },
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
    titleMS: "Tanggal & Pindah",
    titleZH: "拆机与搬迁",
    taglineMS:
      "Pam-turun selamat, tanggal profesional, dan pentauliahan semula penuh di alamat baharu anda. Pemasangan hari pindah masuk yang sama tersedia. Dari RM 250 lengkap.",
    taglineZH:
      "安全泵送回收、专业拆机和在新地址完全重新调试。可当天搬入即安装。全套从RM 250起。",
    descriptionMS:
      "Anda berpindah ke kondominium baharu di Petaling Jaya, atau pejabat anda berpindah dari Bangsar ke Damansara. Anda mempunyai unit inverter Daikin yang sempurna dan baru berusia 3 tahun — menggantikannya akan menelan kos RM 1,500+. Menanggal dan memindahkannya adalah keputusan kewangan yang bijak. Tetapi ini bukan kerja untuk penggerak am atau tukang dengan sepana. Pemindahan aircond melibatkan: mengepam turun bahan pendingin ke dalam kondenser luar dengan selamat (supaya tiada gas hilang), memutuskan pengasing elektrik, menanggal unit dalaman dari braket dinding, mengeluarkan kondenser luar dari braket atau pelantar, mengeluarkan paip kuprum dan pendawaian melalui penembusan dinding, mengangkut kedua-dua unit dengan selamat ke lokasi baharu, dan kemudian melakukan pemasangan baharu sepenuhnya: paip kuprum baharu, longkang baharu, laluan pendawaian baharu, evakuasi vakum, dan pentauliahan semula. KL Renovator melakukan ini dari mula hingga akhir. Pindah lengkap dan pasang semula dari RM 250 (1.0–1.5 HP, bangunan sama atau berdekatan). RM 350 untuk pemindahan lokasi berbeza. Termasuk pemulihan bahan pendingin, 7 kaki paip kuprum baharu, pendawaian, longkang, braket, vakum, dan ujian.",
    descriptionZH:
      "您要搬到八打灵再也的新公寓，或者您的办公室要从Bangsar搬到Damansara。您有一台用了3年状况完好的大金变频机——更换它将花费RM 1,500以上。拆机搬迁是明智的财务决策。但这绝非普通搬运工或拿扳手的杂工能做的工作。冷气搬迁包括：将制冷剂安全泵入室外冷凝器（不损失气体）、断开电气隔离开关、从墙支架上卸下室内机、从支架或平台上取下室外冷凝器、通过墙孔拔出铜管和电线、将两台机器安全运输到新地点、然后进行全套新安装：新铜管、新排水管、新电线铺设、真空抽气并重新调试。KL Renovator从头到尾完成这一切。完整搬迁重装从RM 250起（1.0-1.5 HP，同楼或附近）。不同地点搬迁RM 350。含制冷剂回收、7尺新铜管、电线、排水管、支架、真空和测试。",
    highlightsMS: [
      "Pam-turun bahan pendingin sebelum tanggal — sifar gas hilang, sifar pelepasan alam sekitar",
      "Penanggalan selamat unit dalaman, kondenser luar, dan semua bahan penembusan dinding",
      "Pemasangan semula penuh di lokasi baharu — paip kuprum, pendawaian, longkang, braket baharu disertakan",
      "Evakuasi pam vakum di tapak baharu — standard pentauliahan sama seperti pemasangan baharu",
      "Semua 20 jenama dikendalikan — inverter dan bukan inverter, R32 dan R410A",
      "Tanggal + pasang semula hari sama untuk kebanyakan pindah tempatan — pindah masuk dengan AC berfungsi",
      "Braket dinding dan pad getah baharu di lokasi baharu — braket lama kekal dengan hartanah lama",
      "Jaminan mutu kerja 1 bulan untuk keseluruhan pemindahan",
    ],
    highlightsZH: [
      "拆机前制冷剂泵送回收——零气体损失，零环境排放",
      "安全拆卸室内机、室外冷凝器和所有穿墙材料",
      "新地点完整重装——含新铜管、电线、排水管、支架",
      "新地点真空泵抽真空——与新安装相同的调试标准",
      "涵盖所有20个品牌——变频和非变频，R32和R410A",
      "大多数本地搬迁当天拆卸+重装——搬入即有冷气",
      "新地点的新墙支架和橡胶垫——旧支架留在旧物业",
      "整个搬迁享1个月工艺保修",
    ],
    processMS: [
      { step: "Pam-Turun & Putus Sambungan Elektrik", desc: "Juruteknik menjalankan unit dalam mod penyejukan, menutup injap servis cecair pada unit luar untuk mengepam semua bahan pendingin ke dalam kondenser, kemudian menutup injap sedutan. Bahan pendingin kini disimpan dengan selamat dalam unit luar. Pengasing elektrik dimatikan dan disahkan mati. Unit dimatikan kuasa sepenuhnya." },
      { step: "Tanggal Dengan Berhati-hati", desc: "Unit dalaman ditanggal dari braket dinding. Kondenser luar dibuka bolt dari braket atau pelantar. Paip kuprum dipotong di titik penembusan dinding (tidak boleh digunakan semula — ia terpasang tetap di dinding). Pendawaian diputuskan dan dilabel untuk penyambungan semula yang mudah. Semua komponen dibalut dengan selimut pelindung untuk pengangkutan." },
      { step: "Angkut ke Lokasi Baharu", desc: "Unit diangkut dalam kenderaan juruteknik dengan pelapik yang betul. Tiada unit disusun di atas satu sama lain. Kondenser luar diangkut secara menegak (jangan sesekali dibaringkan — minyak kompressor boleh membanjiri talian bahan pendingin). Ketibaan di lokasi baharu diselaraskan dengan jadual masuk rumah anda." },
      { step: "Pasang Semula Penuh & Pentauliahan", desc: "Braket dinding baharu dipasang. Paip kuprum baharu dipotong, diflare, ditebat, dan dihalakan. Paip longkang baharu ditetapkan dengan kejatuhan yang betul. Elektrik didawai dari pengasing melalui konduit khusus. Unit luar dipasang pada braket baharu dengan pad getah. Sistem divakum (minimum 15–20 min). Injap servis dibuka untuk melepaskan bahan pendingin yang disimpan. Penyejukan diuji, termostat dikalibrasi, kad kerja ditandatangani." },
    ],
    processZH: [
      { step: "泵送回收和断电", desc: "技术员在制冷模式下运行机器，关闭室外机上的液体检修阀将所有制冷剂泵入冷凝器，然后关闭吸气阀。制冷剂现在安全储存在室外机中。电气隔离开关关闭并验证断电。机器完全断电。" },
      { step: "小心拆卸", desc: "室内机从墙支架上松开。室外冷凝器从支架或平台上卸下螺栓。铜管在穿墙点切断（无法重复使用——它们固定在墙内）。电线断开并标记以便轻松重接。所有零件用保护毯包裹运输。" },
      { step: "运至新地点", desc: "机器在技术员车内用适当的垫料运输。没有机器叠放。室外冷凝器直立运输（绝不可侧放——压缩机油会淹没制冷剂管路）。到达新地点的时间配合您的搬家日程。" },
      { step: "全面重装和调试", desc: "安装新墙支架。新铜管切割、喇叭口处理、隔热处理并铺设。新排水管设置正确的下坡度。电线从隔离开关通过专用线管铺设。室外机安装在新支架上，配橡胶垫。系统抽真空（至少15-20分钟）。打开检修阀释放储存的制冷剂。测试制冷，校准温控器，签署工作卡。" },
    ],
    priceTableMS: [
      { label: "Tanggal Sahaja (dalaman + luaran)", price: "RM 90" },
      { label: "Tanggal + Pasang Semula Tempat Sama (standard)", price: "RM 250" },
      { label: "Tanggal + Pasang Semula Tempat Sama (2.0–2.5 HP)", price: "RM 290" },
      { label: "Tanggal + Pasang Semula Tempat Lain", price: "RM 350" },
    ],
    priceTableZH: [
      { label: "仅拆机（室内+室外）", price: "RM 90" },
      { label: "拆机+同地重装（标准）", price: "RM 250" },
      { label: "拆机+同地重装（2.0–2.5 HP）", price: "RM 290" },
      { label: "拆机+异地重装", price: "RM 350" },
    ],
  },

  // ── 9. EMERGENCY AIRCOND REPAIR ────────────────────────────────────────
  emergency: {
    titleMS: "Pembaikan Aircond Kecemasan",
    titleZH: "紧急冷气维修",
    taglineMS:
      "Tindak balas kecemasan pantas hari sama untuk kerosakan aircond sepenuhnya, kebocoran air teruk, kegagalan unit luar, litar pintas elektrik, dan pembaikan segera di seluruh KL & Selangor.",
    taglineZH:
      "全天快速紧急响应服务，涵盖冷气完全故障、严重漏水、室外机故障、电路跳闸及吉隆坡和雪兰莪各地的即时上门维修。",
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
