/**
 * Per-service job photos ("Real Work Proof" galleries).
 *
 * Every service page (EN / MS / ZH) renders AT LEAST 3 real job photos that
 * match the service being viewed — installation photos on the installation
 * page, chemical wash photos on the chemical wash page, and so on.
 *
 * Rules:
 *  - Use only real, company-owned photos registered in
 *    `config/gallery-items.ts` and present under `/public/hero`.
 *  - Photos listed here are not reused by another dedicated service gallery.
 *  - Each photo carries its own trilingual title + alt text so the same grid
 *    can be rendered on the EN, MS and ZH routes without duplicate alt text.
 *
 * Consumed by:
 *  - app/(en)/services/[slug]/page.tsx
 *  - components/service-detail-i18n.tsx        (MS + ZH dynamic service pages)
 *  - app/(en)/services/emergency/page.tsx
 *  - app/(en|ms|zh)/services/maintenance-contract/page.tsx
 */

export type ServiceGalleryLocale = "en" | "ms" | "zh";

type Trilingual = { en: string; ms: string; zh: string };

export type ServiceGalleryPhoto = {
  src: string;
  title: Trilingual;
  alt: Trilingual;
};

export type ResolvedServicePhoto = {
  src: string;
  title: string;
  alt: string;
};

export const SERVICE_GALLERY: Record<string, ServiceGalleryPhoto[]> = {
  // ── NEW UNIT INSTALLATION ──────────────────────────────────────────────
  installation: [
    {
      src: "/hero/generic-aircond-new-installation-subang-jaya-127.webp",
      title: {
        en: "Wall Bracket & Indoor Unit Mounting — Subang Jaya",
        ms: "Pemasangan Bracket & Unit Dalaman — Subang Jaya",
        zh: "室内机与墙架安装 — 梳邦再也",
      },
      alt: {
        en: "KL Renovator technician levelling the wall bracket before mounting a new indoor aircond unit in a Subang Jaya home",
        ms: "Juruteknik KL Renovator meratakan bracket dinding sebelum memasang unit aircond dalaman baharu di rumah Subang Jaya",
        zh: "KL Renovator 技术员在梳邦再也住宅安装新室内冷气机前校平墙架",
      },
    },
    {
      src: "/hero/generic-aircond-new-installation-puchong-139.webp",
      title: {
        en: "Copper Pipe & Drain Line Run — Puchong",
        ms: "Kerja Paip Kuprum & Paip Air — Puchong",
        zh: "铜管与排水管铺设 — 蒲种",
      },
      alt: {
        en: "Insulated copper pipe and drain line neatly routed through the wall during a new aircond installation in Puchong",
        ms: "Paip kuprum bertebat dan paip air disusun kemas menembusi dinding semasa pemasangan aircond baharu di Puchong",
        zh: "蒲种新冷气安装中，保温铜管与排水管整齐穿墙布线",
      },
    },
    {
      src: "/hero/generic-aircond-new-installation-rawang-159.webp",
      title: {
        en: "Outdoor Compressor Set-Up — Rawang",
        ms: "Pemasangan Kompresor Luaran — Rawang",
        zh: "室外压缩机安装 — 万挠",
      },
      alt: {
        en: "Outdoor compressor secured on a heavy-duty bracket and connected with flared copper joints in Rawang",
        ms: "Kompresor luaran dipasang pada bracket kukuh dan disambung dengan sambungan kuprum flare di Rawang",
        zh: "万挠室外压缩机固定于重型支架并以扩口铜管接头连接",
      },
    },
    {
      src: "/hero/generic-aircond-new-installation-kuala-lumpur-116.webp",
      title: {
        en: "Vacuum & Commissioning Test — Kuala Lumpur",
        ms: "Vakum & Ujian Commissioning — Kuala Lumpur",
        zh: "抽真空与试运行 — 吉隆坡",
      },
      alt: {
        en: "Vacuum pump and manifold gauges connected for commissioning after a wall-mounted aircond installation in Kuala Lumpur",
        ms: "Pam vakum dan gauge manifold disambung untuk commissioning selepas pemasangan aircond dinding di Kuala Lumpur",
        zh: "吉隆坡壁挂式冷气安装完成后接上真空泵与压力表进行调试",
      },
    },
  ],

  // ── INSTALLATION HUB (/installation) ───────────────────────────────────
  // Separate photo set so the hub page never duplicates the photos already
  // used on /services/installation.
  "installation-hub": [
    {
      src: "/hero/generic-aircond-new-installation-subang-jaya-118.webp",
      title: {
        en: "Indoor Unit Fitted & Levelled — Subang Jaya",
        ms: "Unit Dalaman Dipasang & Diratakan — Subang Jaya",
        zh: "室内机安装校平 — 梳邦再也",
      },
      alt: {
        en: "New wall-mounted indoor unit fitted and levelled on its bracket in a Subang Jaya home",
        ms: "Unit dalaman dinding baharu dipasang dan diratakan pada bracket di rumah Subang Jaya",
        zh: "梳邦再也住宅新壁挂式室内机装上支架并校平",
      },
    },
    {
      src: "/hero/generic-aircond-new-installation-petaling-jaya-117.webp",
      title: {
        en: "Concealed Piping & Trunking — Petaling Jaya",
        ms: "Paip Tersembunyi & Trunking — Petaling Jaya",
        zh: "隐藏式管线与线槽 — 八打灵再也",
      },
      alt: {
        en: "Copper pipe and drain line hidden inside neat PVC trunking after installation in Petaling Jaya",
        ms: "Paip kuprum dan paip air disembunyikan dalam trunking PVC kemas selepas pemasangan di Petaling Jaya",
        zh: "八打灵再也安装后铜管与排水管隐藏于整齐 PVC 线槽内",
      },
    },
    {
      src: "/hero/daikin-aircond-new-installation-klang-67.webp",
      title: {
        en: "Inverter Unit Commissioned — Klang",
        ms: "Unit Inverter Di-commission — Klang",
        zh: "变频机组调试完成 — 巴生",
      },
      alt: {
        en: "Daikin inverter aircond commissioned and cooling tested after installation in Klang",
        ms: "Aircond inverter Daikin di-commission dan diuji penyejukan selepas pemasangan di Klang",
        zh: "巴生 Daikin 变频冷气安装后完成调试与制冷测试",
      },
    },
    {
      src: "/hero/generic-aircond-new-installation-subang-jaya-145.webp",
      title: {
        en: "Handover & Clean-Up — Subang Jaya",
        ms: "Serahan & Pembersihan — Subang Jaya",
        zh: "交付与现场清理 — 梳邦再也",
      },
      alt: {
        en: "Completed installation handed over with the work area cleaned up in Subang Jaya, Selangor",
        ms: "Pemasangan siap diserahkan dengan kawasan kerja dibersihkan di Subang Jaya, Selangor",
        zh: "雪兰莪梳邦再也安装完成交付，施工区域已清理干净",
      },
    },
  ],

  // ── TOPIC HUB · PRICING (issue #66) ───────────────────────────────────
  "topic-hub-pricing": [
    {
      src: "/hero/aux-aircond-basic-servicing-shah-alam-53.webp",
      title: {
        en: "Basic Servicing in Shah Alam",
        ms: "Servis Asas di Shah Alam",
        zh: "莎阿南基本保养",
      },
      alt: {
        en: "KL Renovator technician carrying out a basic aircond service on a wall-mounted unit in Shah Alam",
        ms: "Juruteknik KL Renovator menjalankan servis asas aircond pada unit dinding di Shah Alam",
        zh: "KL Renovator 技术员在莎阿南为挂壁式冷气进行基本保养",
      },
    },
    {
      src: "/hero/generic-aircond-basic-servicing-cheras-124.webp",
      title: {
        en: "Filter Wash in Cheras",
        ms: "Cuci Penapis di Cheras",
        zh: "蕉赖滤网清洗",
      },
      alt: {
        en: "Aircond filter being removed and washed during a basic service in Cheras, Kuala Lumpur",
        ms: "Penapis aircond dibuka dan dicuci semasa servis asas di Cheras, Kuala Lumpur",
        zh: "吉隆坡蕉赖基本保养中拆下并清洗冷气滤网",
      },
    },
    {
      src: "/hero/midea-aircond-basic-servicing-petaling-jaya-17.webp",
      title: {
        en: "Drain Flush in Petaling Jaya",
        ms: "Bilas Saliran di Petaling Jaya",
        zh: "八打灵再也排水管冲洗",
      },
      alt: {
        en: "Drain pipe flushed with a wet-dry pump during basic servicing in Petaling Jaya",
        ms: "Paip saliran dibilas dengan pam basah-kering semasa servis asas di Petaling Jaya",
        zh: "八打灵再也基本保养中以干湿泵冲洗排水管",
      },
    },
  ],

  // ── TOPIC HUB · TROUBLESHOOTING (issue #66) ───────────────────────────
  "topic-hub-troubleshooting": [
    {
      src: "/hero/aux-aircond-troubleshooting-repair-puchong-42.webp",
      title: {
        en: "Diagnosis in Puchong",
        ms: "Diagnosis di Puchong",
        zh: "蒲种检测诊断",
      },
      alt: {
        en: "Technician testing an aircond with a multimeter during a fault diagnosis in Puchong",
        ms: "Juruteknik menguji aircond dengan multimeter semasa diagnosis kerosakan di Puchong",
        zh: "技术员在蒲种以万用表检测冷气故障",
      },
    },
    {
      src: "/hero/panasonic-aircond-pcb-board-repair-subang-jaya-35.webp",
      title: {
        en: "PCB Repair in Subang Jaya",
        ms: "Baiki PCB di Subang Jaya",
        zh: "梳邦再也电路板维修",
      },
      alt: {
        en: "Panasonic aircond PCB board being inspected and repaired on-site in Subang Jaya",
        ms: "Papan PCB aircond Panasonic diperiksa dan dibaiki di tapak di Subang Jaya",
        zh: "梳邦再也现场检查并维修 Panasonic 冷气电路板",
      },
    },
    {
      src: "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp",
      title: {
        en: "Leak Fix in Kuala Lumpur",
        ms: "Baiki Bocor di Kuala Lumpur",
        zh: "吉隆坡漏水维修",
      },
      alt: {
        en: "Daikin aircond drain issue being repaired to stop water leaking in Kuala Lumpur",
        ms: "Masalah saliran aircond Daikin dibaiki untuk menghentikan bocor air di Kuala Lumpur",
        zh: "吉隆坡维修 Daikin 冷气排水问题以止住漏水",
      },
    },
  ],

  // ── TOPIC HUB · MAINTENANCE (issue #66) ───────────────────────────────
  "topic-hub-maintenance": [
    {
      src: "/hero/daikin-aircond-chemical-wash-kuala-lumpur-1.webp",
      title: {
        en: "Chemical Wash in Kuala Lumpur",
        ms: "Cuci Kimia di Kuala Lumpur",
        zh: "吉隆坡化学清洗",
      },
      alt: {
        en: "Pressure chemical wash being applied to a Daikin aircond coil in Kuala Lumpur",
        ms: "Cuci kimia bertekanan disapu pada gegelung aircond Daikin di Kuala Lumpur",
        zh: "吉隆坡为 Daikin 冷气盘管进行高压化学清洗",
      },
    },
    {
      src: "/hero/generic-aircond-chemical-wash-petaling-jaya-99.webp",
      title: {
        en: "Deep Clean in Petaling Jaya",
        ms: "Cucian Mendalam di Petaling Jaya",
        zh: "八打灵再也深度清洗",
      },
      alt: {
        en: "Blower wheel and coil fins being deep-cleaned during a chemical wash in Petaling Jaya",
        ms: "Roda blower dan sirip gegelung dicuci mendalam semasa cuci kimia di Petaling Jaya",
        zh: "八打灵再也化学清洗中深度清洁风轮与盘管翅片",
      },
    },
    {
      src: "/hero/generic-aircond-chemical-wash-rawang-150.webp",
      title: {
        en: "Maintenance Visit in Rawang",
        ms: "Lawatan Penyelenggaraan di Rawang",
        zh: "万挠保养上门",
      },
      alt: {
        en: "Routine maintenance chemical wash carried out on a wall-mounted aircond in Rawang",
        ms: "Cuci kimia penyelenggaraan rutin dijalankan pada aircond dinding di Rawang",
        zh: "万挠为挂壁式冷气进行例行保养化学清洗",
      },
    },
  ],

  // ── PRESSURE CHEMICAL WASH ─────────────────────────────────────────────
  "chemical-wash": [
    {
      src: "/hero/generic-aircond-chemical-wash-klang-138.webp",
      title: {
        en: "Coil Foaming Stage — Klang",
        ms: "Peringkat Buih Kimia pada Coil — Klang",
        zh: "蒸发器泡沫清洗 — 巴生",
      },
      alt: {
        en: "Alkaline chemical foam applied across the evaporator coil to dissolve biofilm during a chemical wash in Klang",
        ms: "Buih kimia alkali disapu pada coil evaporator untuk melarutkan biofilm semasa cuci kimia di Klang",
        zh: "巴生化学清洗过程中，碱性化学泡沫覆盖蒸发器盘管以溶解生物膜",
      },
    },
    {
      src: "/hero/generic-aircond-chemical-wash-shah-alam-119.webp",
      title: {
        en: "High-Pressure Rinse — Shah Alam",
        ms: "Bilasan Tekanan Tinggi — Shah Alam",
        zh: "高压冲洗 — 莎阿南",
      },
      alt: {
        en: "80–120 PSI pressurised water rinse flushing loosened dirt out of the indoor unit in Shah Alam",
        ms: "Bilasan air bertekanan 80–120 PSI membuang kotoran yang telah dilonggarkan dari unit dalaman di Shah Alam",
        zh: "莎阿南室内机以 80–120 PSI 高压水冲洗，带走松脱污垢",
      },
    },
    {
      src: "/hero/generic-aircond-chemical-wash-puchong-121.webp",
      title: {
        en: "Canvas Protection & Drainage — Puchong",
        ms: "Perlindungan Kanvas & Saliran — Puchong",
        zh: "防水帆布与排水保护 — 蒲种",
      },
      alt: {
        en: "Waterproof canvas bag catching wash water so walls and furniture stay dry during a Puchong chemical wash",
        ms: "Beg kanvas kalis air menadah air cucian supaya dinding dan perabot kekal kering semasa cuci kimia di Puchong",
        zh: "蒲种化学清洗时使用防水帆布接住污水，保持墙面与家具干爽",
      },
    },
    {
      src: "/hero/hisense-aircond-chemical-wash-klang-111.webp",
      title: {
        en: "Blower Wheel Cleaning — Klang",
        ms: "Pembersihan Blower Wheel — Klang",
        zh: "风轮清洁 — 巴生",
      },
      alt: {
        en: "Blower wheel and air outlet cleaned to restore airflow after the chemical wash of a Hisense unit in Klang",
        ms: "Blower wheel dan salur keluar udara dibersihkan untuk memulihkan aliran udara selepas cuci kimia unit Hisense di Klang",
        zh: "巴生 Hisense 冷气化学清洗后清洁风轮与出风口以恢复风量",
      },
    },
  ],

  // ── CHEMICAL OVERHAUL ──────────────────────────────────────────────────
  "chemical-overhaul": [
    {
      src: "/hero/generic-aircond-chemical-overhaul-cheras-142.webp",
      title: {
        en: "Indoor Unit Fully Dismantled — Cheras",
        ms: "Unit Dalaman Dibuka Sepenuhnya — Cheras",
        zh: "室内机完全拆卸 — 蕉赖",
      },
      alt: {
        en: "Indoor aircond unit removed from the wall and stripped down for a full chemical overhaul in Cheras",
        ms: "Unit aircond dalaman diturunkan dari dinding dan dibuka sepenuhnya untuk chemical overhaul di Cheras",
        zh: "蕉赖住宅冷气室内机从墙上拆下并完全拆解进行化学大修",
      },
    },
    {
      src: "/hero/generic-aircond-chemical-overhaul-kuala-lumpur-143.webp",
      title: {
        en: "Back Tray & Drain Pan Soak — Kuala Lumpur",
        ms: "Rendaman Back Tray & Drain Pan — Kuala Lumpur",
        zh: "背板与接水盘浸洗 — 吉隆坡",
      },
      alt: {
        en: "Back tray, drain pan and blower soaked and scrubbed separately during a chemical overhaul in Kuala Lumpur",
        ms: "Back tray, drain pan dan blower direndam serta digosok berasingan semasa chemical overhaul di Kuala Lumpur",
        zh: "吉隆坡化学大修中，背板、接水盘与风轮分件浸泡刷洗",
      },
    },
    {
      src: "/hero/lg-aircond-chemical-overhaul-klang-62.webp",
      title: {
        en: "Component Deep Clean — Klang",
        ms: "Pembersihan Mendalam Komponen — Klang",
        zh: "部件深度清洁 — 巴生",
      },
      alt: {
        en: "LG aircond parts laid out and deep-cleaned piece by piece during an overhaul service in Klang",
        ms: "Bahagian aircond LG disusun dan dicuci sekeping demi sekeping semasa servis overhaul di Klang",
        zh: "巴生 LG 冷气大修服务中，各部件逐一摊开深度清洗",
      },
    },
    {
      src: "/hero/york-aircond-chemical-overhaul-subang-jaya-26.webp",
      title: {
        en: "Reassembly & Leak Test — Subang Jaya",
        ms: "Pemasangan Semula & Ujian Bocor — Subang Jaya",
        zh: "重新组装与漏水测试 — 梳邦再也",
      },
      alt: {
        en: "York indoor unit reassembled and water-tested after a chemical overhaul solved repeated leaking in Subang Jaya",
        ms: "Unit dalaman York dipasang semula dan diuji air selepas chemical overhaul menyelesaikan masalah bocor berulang di Subang Jaya",
        zh: "梳邦再也 York 室内机化学大修后重新组装并进行漏水测试",
      },
    },
  ],

  // ── GAS TOP-UP ─────────────────────────────────────────────────────────
  "gas-topup": [
    {
      src: "/hero/generic-aircond-gas-topup-ampang-122.webp",
      title: {
        en: "Manifold Gauge Pressure Reading — Ampang",
        ms: "Bacaan Tekanan Gauge Manifold — Ampang",
        zh: "压力表读数检查 — 安邦",
      },
      alt: {
        en: "Manifold gauge set connected to the service port to read suction pressure before topping up gas in Ampang",
        ms: "Set gauge manifold disambung ke service port untuk membaca tekanan sebelum tambah gas di Ampang",
        zh: "安邦加气前将压力表组接上维修阀读取低压侧压力",
      },
    },
    {
      src: "/hero/generic-aircond-gas-topup-cheras-151.webp",
      title: {
        en: "Precision R32 Charging — Cheras",
        ms: "Pengisian R32 Berpresisi — Cheras",
        zh: "R32 精准充注 — 蕉赖",
      },
      alt: {
        en: "R32 refrigerant charged incrementally against ambient temperature charts on a Cheras aircond system",
        ms: "Refrigeran R32 diisi sedikit demi sedikit mengikut carta suhu ambien pada sistem aircond di Cheras",
        zh: "蕉赖冷气系统依环境温度对照表分次充注 R32 冷媒",
      },
    },
    {
      src: "/hero/acson-aircond-gas-topup-r410a-petaling-jaya-16.webp",
      title: {
        en: "R410A Balancing — Petaling Jaya",
        ms: "Pengimbangan R410A — Petaling Jaya",
        zh: "R410A 冷媒平衡 — 八打灵再也",
      },
      alt: {
        en: "R410A pressure balanced on an Acson inverter outdoor unit after a full leak check in Petaling Jaya",
        ms: "Tekanan R410A diimbangi pada unit luar inverter Acson selepas pemeriksaan bocor penuh di Petaling Jaya",
        zh: "八打灵再也 Acson 变频室外机完成检漏后平衡 R410A 压力",
      },
    },
    {
      src: "/hero/aircond-gas-topup-r32-r410a-selangor.webp",
      title: {
        en: "Leak Check Before Refill — Selangor",
        ms: "Pemeriksaan Bocor Sebelum Isi Semula — Selangor",
        zh: "补气前检漏 — 雪兰莪",
      },
      alt: {
        en: "Technician inspecting flare joints and copper line for leaks before refilling refrigerant at a Selangor property",
        ms: "Juruteknik memeriksa sambungan flare dan paip kuprum untuk kebocoran sebelum mengisi semula gas di Selangor",
        zh: "技术员在雪兰莪补充冷媒前检查扩口接头与铜管是否泄漏",
      },
    },
  ],

  // ── TROUBLESHOOTING & REPAIRS ──────────────────────────────────────────
  repair: [
    {
      src: "/hero/generic-aircond-troubleshooting-repair-petaling-jaya-108.webp",
      title: {
        en: "Electrical Fault Diagnosis — Petaling Jaya",
        ms: "Diagnosis Kerosakan Elektrik — Petaling Jaya",
        zh: "电气故障诊断 — 八打灵再也",
      },
      alt: {
        en: "Multimeter used to trace an electrical fault on the aircond control board in Petaling Jaya before quoting the repair",
        ms: "Multimeter digunakan untuk mengesan kerosakan elektrik pada papan kawalan aircond di Petaling Jaya sebelum sebut harga",
        zh: "八打灵再也维修报价前，用万用表排查冷气控制板电气故障",
      },
    },
    {
      src: "/hero/generic-aircond-troubleshooting-repair-puchong-130.webp",
      title: {
        en: "Capacitor & Fan Motor Check — Puchong",
        ms: "Semakan Kapasitor & Motor Kipas — Puchong",
        zh: "电容与风机检查 — 蒲种",
      },
      alt: {
        en: "Outdoor unit opened to test the capacitor and fan motor after repeated auto shut-off in Puchong",
        ms: "Unit luar dibuka untuk menguji kapasitor dan motor kipas selepas unit kerap mati sendiri di Puchong",
        zh: "蒲种冷气频繁自动停机后拆开室外机检测电容与风机马达",
      },
    },
    {
      src: "/hero/lg-aircond-troubleshooting-repair-petaling-jaya-18.webp",
      title: {
        en: "Part Replacement On-Site — Petaling Jaya",
        ms: "Penggantian Bahagian di Lokasi — Petaling Jaya",
        zh: "现场更换零件 — 八打灵再也",
      },
      alt: {
        en: "Faulty LG aircond part replaced on-site with the customer-approved quote before work started in Petaling Jaya",
        ms: "Bahagian aircond LG yang rosak diganti di lokasi selepas sebut harga diluluskan pelanggan di Petaling Jaya",
        zh: "八打灵再也在客户确认报价后现场更换 LG 冷气故障零件",
      },
    },
    {
      src: "/hero/aircond-sensor-replacement-klang-valley.webp",
      title: {
        en: "Sensor Replacement — Klang Valley",
        ms: "Penggantian Sensor — Lembah Klang",
        zh: "感温头更换 — 巴生谷",
      },
      alt: {
        en: "Thermistor sensor replaced to stop incorrect temperature readings and short cycling on a Klang Valley aircond",
        ms: "Sensor thermistor diganti untuk menghentikan bacaan suhu salah dan short cycling pada aircond di Lembah Klang",
        zh: "更换巴生谷冷气热敏传感器，解决温度读数错误与频繁启停",
      },
    },
  ],

  // ── BASIC SERVICING ────────────────────────────────────────────────────
  "basic-servicing": [
    {
      src: "/hero/generic-aircond-basic-servicing-cheras-124.webp",
      title: {
        en: "Filter Wash & Refit — Cheras",
        ms: "Cuci & Pasang Semula Filter — Cheras",
        zh: "滤网清洗与复位 — 蕉赖",
      },
      alt: {
        en: "Aircond filters removed, washed and refitted during a routine servicing visit in Cheras",
        ms: "Filter aircond ditanggalkan, dicuci dan dipasang semula semasa servis rutin di Cheras",
        zh: "蕉赖例行保养中拆下冷气滤网清洗后重新装回",
      },
    },
    {
      src: "/hero/generic-aircond-basic-servicing-shah-alam-110.webp",
      title: {
        en: "Coil & Airflow Check — Shah Alam",
        ms: "Semakan Coil & Aliran Udara — Shah Alam",
        zh: "盘管与风量检查 — 莎阿南",
      },
      alt: {
        en: "Evaporator coil wiped down and airflow measured during a 3-monthly basic service in Shah Alam",
        ms: "Coil evaporator dilap dan aliran udara diukur semasa servis asas 3 bulanan di Shah Alam",
        zh: "莎阿南三个月一次基础保养中擦拭蒸发器盘管并测量风量",
      },
    },
    {
      src: "/hero/generic-aircond-basic-servicing-ampang-104.webp",
      title: {
        en: "Drain Line Flush — Ampang",
        ms: "Pembersihan Paip Air — Ampang",
        zh: "排水管疏通 — 安邦",
      },
      alt: {
        en: "Drain line flushed clear to prevent water dripping before the next service cycle in Ampang",
        ms: "Paip air dibersihkan supaya tidak menitis air sebelum kitaran servis seterusnya di Ampang",
        zh: "安邦保养时疏通排水管，避免下一个保养周期前滴水",
      },
    },
    {
      src: "/hero/lg-aircond-basic-servicing-subang-jaya-29.webp",
      title: {
        en: "Multi-Point Diagnostic — Subang Jaya",
        ms: "Diagnostik Pelbagai Titik — Subang Jaya",
        zh: "多点检测 — 梳邦再也",
      },
      alt: {
        en: "LG unit checked point by point — cooling temperature, gas pressure and electrical safety — in Subang Jaya",
        ms: "Unit LG disemak titik demi titik — suhu penyejukan, tekanan gas dan keselamatan elektrik — di Subang Jaya",
        zh: "梳邦再也 LG 冷气逐项检测：制冷温度、气压与电气安全",
      },
    },
  ],

  // ── CEILING CASSETTE ───────────────────────────────────────────────────
  "ceiling-cassette": [
    {
      src: "/hero/generic-aircond-ceiling-cassette-service-puchong-112.webp",
      title: {
        en: "Cassette Panel Removal — Puchong",
        ms: "Penanggalan Panel Cassette — Puchong",
        zh: "天花嵌入机面板拆卸 — 蒲种",
      },
      alt: {
        en: "Ceiling cassette front panel lowered for servicing above a shoplot ceiling in Puchong",
        ms: "Panel hadapan ceiling cassette diturunkan untuk servis di atas siling lot kedai di Puchong",
        zh: "蒲种店屋天花上方降下天花嵌入式冷气面板进行保养",
      },
    },
    {
      src: "/hero/daikin-aircond-ceiling-cassette-service-shah-alam-56.webp",
      title: {
        en: "Cassette Coil Chemical Clean — Shah Alam",
        ms: "Cuci Kimia Coil Cassette — Shah Alam",
        zh: "嵌入机盘管化学清洗 — 莎阿南",
      },
      alt: {
        en: "Daikin ceiling cassette coil chemically cleaned with the ceiling and floor sheeted off in Shah Alam",
        ms: "Coil ceiling cassette Daikin dicuci kimia dengan siling dan lantai dilindungi kanvas di Shah Alam",
        zh: "莎阿南 Daikin 天花嵌入机盘管化学清洗，天花与地面均已铺保护布",
      },
    },
    {
      src: "/hero/panasonic-aircond-ceiling-cassette-service-klang-68.webp",
      title: {
        en: "Drain Pump & Tray Service — Klang",
        ms: "Servis Drain Pump & Tray — Klang",
        zh: "排水泵与接水盘保养 — 巴生",
      },
      alt: {
        en: "Panasonic cassette drain pump and tray cleaned to stop ceiling water marks in a Klang office",
        ms: "Drain pump dan tray cassette Panasonic dibersihkan untuk menghentikan kesan air pada siling pejabat di Klang",
        zh: "清洁巴生办公室 Panasonic 嵌入机排水泵与接水盘，防止天花水渍",
      },
    },
  ],

  // ── DISMANTLE & RELOCATION ─────────────────────────────────────────────
  "dismantling-relocation": [
    {
      src: "/hero/generic-aircond-dismantle-relocation-ampang-158.webp",
      title: {
        en: "Pump-Down Before Removal — Ampang",
        ms: "Pump-Down Sebelum Ditanggalkan — Ampang",
        zh: "拆机前回收冷媒 — 安邦",
      },
      alt: {
        en: "Refrigerant pumped down into the outdoor unit before dismantling an aircond for relocation in Ampang",
        ms: "Refrigeran di-pump-down ke unit luar sebelum aircond ditanggalkan untuk pemindahan di Ampang",
        zh: "安邦拆卸搬迁前先将冷媒回收至室外机",
      },
    },
    {
      src: "/hero/daikin-aircond-dismantle-relocation-puchong-45.webp",
      title: {
        en: "Indoor Unit Taken Down Safely — Puchong",
        ms: "Unit Dalaman Diturunkan Dengan Selamat — Puchong",
        zh: "安全拆下室内机 — 蒲种",
      },
      alt: {
        en: "Daikin indoor unit lifted off the bracket and pipe ends sealed for a house move in Puchong",
        ms: "Unit dalaman Daikin diangkat dari bracket dan hujung paip ditutup untuk pindah rumah di Puchong",
        zh: "蒲种搬家时将 Daikin 室内机从支架取下并封好管口",
      },
    },
    {
      src: "/hero/aircond-installation-ampang-selangor.webp",
      title: {
        en: "Reinstallation At New Address — Ampang",
        ms: "Pemasangan Semula Di Alamat Baharu — Ampang",
        zh: "新住址重新安装 — 安邦",
      },
      alt: {
        en: "Relocated aircond reinstalled, vacuumed and tested at the customer's new unit in Ampang, Selangor",
        ms: "Aircond yang dipindahkan dipasang semula, divakum dan diuji di unit baharu pelanggan di Ampang, Selangor",
        zh: "搬迁的冷气在雪兰莪安邦新单位重新安装、抽真空并试运行",
      },
    },
    {
      src: "/hero/aircond-new-installation-rawang-selangor.webp",
      title: {
        en: "Fresh Pipe & Wiring Run — Rawang",
        ms: "Paip & Pendawaian Baharu — Rawang",
        zh: "全新管线与配线 — 万挠",
      },
      alt: {
        en: "New copper pipe, insulation and wiring run after relocating an existing aircond in Rawang, Selangor",
        ms: "Paip kuprum, tebatan dan pendawaian baharu dipasang selepas memindahkan aircond sedia ada di Rawang, Selangor",
        zh: "雪兰莪万挠冷气搬迁后重新铺设铜管、保温层与电线",
      },
    },
  ],

  // ── EMERGENCY REPAIR ───────────────────────────────────────────────────
  emergency: [
    {
      src: "/hero/generic-aircond-water-leak-fix-klang-102.webp",
      title: {
        en: "Heavy Water Leak Stopped — Klang",
        ms: "Bocor Air Teruk Dihentikan — Klang",
        zh: "严重漏水紧急处理 — 巴生",
      },
      alt: {
        en: "Same-day emergency call-out to stop a heavy indoor aircond water leak over electrical points in Klang",
        ms: "Panggilan kecemasan hari sama untuk menghentikan bocor air aircond yang teruk berhampiran titik elektrik di Klang",
        zh: "巴生当天紧急上门，处理室内冷气在电源附近的严重漏水",
      },
    },
    {
      src: "/hero/acson-aircond-water-leaking-fix-shah-alam-60.webp",
      title: {
        en: "Blocked Drain Cleared — Shah Alam",
        ms: "Paip Tersumbat Dibersihkan — Shah Alam",
        zh: "堵塞排水管疏通 — 莎阿南",
      },
      alt: {
        en: "Blocked drain pipe cleared on an Acson unit during an urgent leak call in Shah Alam",
        ms: "Paip air tersumbat dibersihkan pada unit Acson semasa panggilan bocor kecemasan di Shah Alam",
        zh: "莎阿南紧急漏水报修中疏通 Acson 冷气堵塞排水管",
      },
    },
    {
      src: "/hero/daikin-aircond-water-leaking-fix-kuala-lumpur-12.webp",
      title: {
        en: "Night Call Leak Repair — Kuala Lumpur",
        ms: "Baiki Bocor Panggilan Malam — Kuala Lumpur",
        zh: "夜间漏水抢修 — 吉隆坡",
      },
      alt: {
        en: "Daikin indoor unit leak traced and repaired on an after-hours emergency visit in Kuala Lumpur",
        ms: "Kebocoran unit dalaman Daikin dikesan dan dibaiki semasa lawatan kecemasan luar waktu di Kuala Lumpur",
        zh: "吉隆坡非营业时间紧急上门，排查并修复 Daikin 室内机漏水",
      },
    },
    {
      src: "/hero/isonic-aircond-troubleshooting-repair-klang-66.webp",
      title: {
        en: "Total Breakdown Triage — Klang",
        ms: "Triage Kerosakan Total — Klang",
        zh: "整机故障快速排查 — 巴生",
      },
      alt: {
        en: "Complete aircond breakdown diagnosed on arrival — power, compressor and board checks — in Klang",
        ms: "Kerosakan aircond sepenuhnya didiagnos sebaik tiba — semakan kuasa, kompresor dan papan — di Klang",
        zh: "巴生冷气完全故障，抵达后立即检查电源、压缩机与电路板",
      },
    },
  ],

  // ── MAINTENANCE CONTRACT (AMC) ─────────────────────────────────────────
  "maintenance-contract": [
    {
      src: "/hero/generic-aircond-basic-servicing-shah-alam-146.webp",
      title: {
        en: "Quarterly Scheduled Visit — Shah Alam",
        ms: "Lawatan Berjadual Suku Tahunan — Shah Alam",
        zh: "每季定期上门 — 莎阿南",
      },
      alt: {
        en: "Scheduled quarterly AMC service visit keeping a Shah Alam household unit running at peak efficiency",
        ms: "Lawatan servis AMC suku tahunan berjadual memastikan unit rumah di Shah Alam kekal cekap",
        zh: "莎阿南住宅每季 AMC 定期保养，维持冷气最佳效率",
      },
    },
    {
      src: "/hero/generic-aircond-basic-servicing-cheras-133.webp",
      title: {
        en: "Multi-Unit Contract Servicing — Cheras",
        ms: "Servis Kontrak Berbilang Unit — Cheras",
        zh: "多机合约保养 — 蕉赖",
      },
      alt: {
        en: "Multiple aircond units serviced in one contract visit at a Cheras home under an annual maintenance plan",
        ms: "Beberapa unit aircond diservis dalam satu lawatan kontrak di rumah Cheras di bawah pelan penyelenggaraan tahunan",
        zh: "蕉赖住宅按年度保养合约，一次上门保养多台冷气",
      },
    },
    {
      src: "/hero/generic-aircond-basic-servicing-puchong-103.webp",
      title: {
        en: "Preventive Check & Report — Puchong",
        ms: "Semakan Pencegahan & Laporan — Puchong",
        zh: "预防性检查与报告 — 蒲种",
      },
      alt: {
        en: "Preventive checks logged during a contract service so faults are caught before a breakdown in Puchong",
        ms: "Semakan pencegahan direkod semasa servis kontrak supaya kerosakan dikesan sebelum unit rosak di Puchong",
        zh: "蒲种合约保养中记录预防性检查项目，在故障前发现问题",
      },
    },
    {
      src: "/hero/hisense-aircond-basic-servicing-ampang-113.webp",
      title: {
        en: "Priority Response Visit — Ampang",
        ms: "Lawatan Respons Keutamaan — Ampang",
        zh: "优先响应上门 — 安邦",
      },
      alt: {
        en: "Priority AMC customer attended the same day for a Hisense unit check in Ampang, Selangor",
        ms: "Pelanggan AMC keutamaan dilayan pada hari sama untuk semakan unit Hisense di Ampang, Selangor",
        zh: "雪兰莪安邦 AMC 优先客户当天获安排 Hisense 冷气检查",
      },
    },
  ],
};

/**
 * Returns the job photos for a service in the requested language.
 * Falls back to an empty array for slugs without a dedicated photo set —
 * callers should always merge with the service hero image so every page keeps
 * showing at least three photos.
 */
export function getServiceGallery(
  slug: string,
  lang: ServiceGalleryLocale,
): ResolvedServicePhoto[] {
  return (SERVICE_GALLERY[slug] ?? []).map((photo) => ({
    src: photo.src,
    title: photo.title[lang],
    alt: photo.alt[lang],
  }));
}

/**
 * Service hero photo + the dedicated gallery, de-duplicated.
 * `heroTitle` / `heroAlt` describe the hero photo in the page language.
 */
export function buildServiceProofPhotos({
  slug,
  lang,
  heroImage,
  heroTitle,
  heroAlt,
}: {
  slug: string;
  lang: ServiceGalleryLocale;
  heroImage?: string;
  heroTitle: string;
  heroAlt: string;
}): ResolvedServicePhoto[] {
  const photos: ResolvedServicePhoto[] = heroImage
    ? [{ src: heroImage, title: heroTitle, alt: heroAlt }]
    : [];

  for (const photo of getServiceGallery(slug, lang)) {
    if (photos.some((p) => p.src === photo.src)) continue;
    photos.push(photo);
  }

  return photos;
}
