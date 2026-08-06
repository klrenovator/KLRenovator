export type KampungMatrixLocale = "en" | "ms" | "zh";

type KampungPageRecord = {
  slug: string;
  parentSlug: string;
  name: string;
  state: string;
  lat?: number;
  lng?: number;
  housingNote?: string;
  description?: string;
  descriptionMS?: string;
  descriptionZH?: string;
};

type ParentAreaRecord = {
  name?: string;
  state?: string;
  landmarks?: readonly string[];
};

type ProfileKey =
  | "highRise"
  | "shopOffice"
  | "landed"
  | "kampung"
  | "hillside"
  | "industrial"
  | "mixed";

type MatrixCopy = {
  label: string;
  access: string;
  risk: string;
  kit: string;
  serviceReason: string;
};

export type KampungMatrixRow = {
  label: string;
  value: string;
  detail: string;
};

export type KampungMatrixServiceLink = {
  label: string;
  price: string;
  href: string;
  reason: string;
};

export type KampungUniquenessMatrix = {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  rows: KampungMatrixRow[];
  serviceHeading: string;
  serviceIntro: string;
  serviceLinks: KampungMatrixServiceLink[];
  bookingTip: string;
};

export const KAMPUNG_UNIQUENESS_MATRIX_RULE = {
  taskId: "20D.33",
  appliesTo: "All EN/MS/ZH sub-area and kampung landing pages generated from siteConfig.kampungPages",
  minimumRows: 6,
  minimumServiceLinks: 3,
} as const;

const PROFILE_KEYWORDS: Array<[ProfileKey, string[]]> = [
  ["industrial", ["industrial", "factory", "warehouse", "workshop", "kilang", "gudang", "工厂", "工业", "仓库"]],
  ["hillside", ["hillside", "hill", "sloping", "slope", "elevated", "bukit", "lereng", "山坡", "高地"]],
  ["highRise", ["condo", "condominium", "apartment", "flat", "high-rise", "serviced residence", "serviced apartment", "residence tower", "pangsa", "kondo", "公寓", "高楼", "组屋"]],
  ["shopOffice", ["shoplot", "shop-house", "shophouse", "shop office", "shop-office", "commercial", "office", "mall", "market", "restaurant", "business district", "soho", "kedai", "商业", "店屋", "办公室"]],
  ["kampung", ["kampung", "new village", "single-storey", "single storey", "traditional", "village", "kampung-style", "乡村", "甘榜", "单层"]],
  ["landed", ["terrace", "link house", "landed", "bungalow", "semi-detached", "semi d", "townhouse", "gated", "teres", "banglo", "排屋", "别墅", "半独立"]],
];

const PROFILE_COPY: Record<KampungMatrixLocale, Record<ProfileKey, MatrixCopy>> = {
  en: {
    highRise: {
      label: "High-rise / condo access",
      access: "Confirm the building name, block, guard-house registration, service-lift window and outdoor-unit balcony position before dispatch.",
      risk: "The common pattern is blocked drain trays, weak fan airflow, mouldy indoor coils and water leaking from narrow balcony drain lines.",
      kit: "Technicians carry a canvas wash cover, drain-flush tools, compact ladder and small access kit suitable for apartment balconies.",
      serviceReason: "High-rise homes usually need clean indoor-coil washing, drain clearing and careful leak testing before handover.",
    },
    shopOffice: {
      label: "Shoplot / office operating hours",
      access: "We ask for the shop row, floor level, loading/parking point and preferred time window so work does not interrupt customers or tenants.",
      risk: "Grease, roadside dust, long operating hours and shared drainage lines make airflow loss and leaking more common than in normal houses.",
      kit: "The van is prepared with chemical wash canvas, commercial drain clearing tools and ceiling cassette checks where required.",
      serviceReason: "Commercial units benefit from stronger coil cleaning, scheduled maintenance and faster fault escalation for tenant comfort.",
    },
    landed: {
      label: "Landed terrace / family home route",
      access: "We plan for gate access, upstairs-to-downstairs copper runs, wall brackets and outdoor compressor position before quoting extras.",
      risk: "Older landed units often show dirty coils, low gas, capacitor wear and long drain lines that need a proper flow test after servicing.",
      kit: "Technicians bring ladder support, vacuum pump, gas gauges and standard copper/wiring allowances for installation or relocation checks.",
      serviceReason: "Landed homes normally need a practical mix of basic service, chemical wash and installation or gas checks across several rooms.",
    },
    kampung: {
      label: "Ground-level kampung / older-home access",
      access: "Most outdoor units are reachable at ground level, so we focus the visit on coil condition, wiring age and honest repair-or-replace advice.",
      risk: "Older R22/R410A systems, dusty outdoor coils, weak capacitors and clogged drains are the repeat issues in traditional low-rise homes.",
      kit: "The team carries drain hose tools, capacitor test gear, gas gauges and cleaning canvas for quick same-day residential work.",
      serviceReason: "These homes usually need preventive chemical wash, gas pressure checks and a clear decision on whether an old unit is still worth repairing.",
    },
    hillside: {
      label: "Hillside / larger-home installation check",
      access: "We check driveway access, compressor mounting angle, drain fall, long pipe runs and safe ladder placement before starting work.",
      risk: "Slope, greenery and longer pipe routes can create condensate pooling, leaf debris at outdoor coils and vibration from uneven brackets.",
      kit: "Technicians prepare bracket checks, drain-gradient tools, ladder support, gas gauges and chemical wash covers for larger properties.",
      serviceReason: "Hillside and larger homes need careful installation checks plus coil cleaning so drainage and compressor mounting stay stable.",
    },
    industrial: {
      label: "Light-commercial / industrial dust load",
      access: "We confirm operating hours, shutdown window, loading access and whether ceiling cassette or wall-mounted units are involved.",
      risk: "Dust-heavy operation, 10–12 hour runtime and blocked filters can reduce cooling faster than normal residential usage.",
      kit: "The van is prepared with stronger chemical wash coverage, cassette inspection tools, drain clearing gear and multi-unit reporting notes.",
      serviceReason: "Industrial and workshop units need scheduled deep cleaning and reporting so tenants or staff are not left with sudden breakdowns.",
    },
    mixed: {
      label: "Mixed residential neighbourhood",
      access: "We confirm whether your exact address is a landed home, apartment, shoplot unit or small office before assigning the right technician kit.",
      risk: "Mixed areas usually produce a blend of dirty coils, water leaking, low gas and ageing electrical components depending on unit type.",
      kit: "Technicians bring a balanced kit: wash cover, drain tools, gas gauges, capacitor tester and standard troubleshooting equipment.",
      serviceReason: "A mixed neighbourhood needs flexible servicing that can switch between home, shoplot and small-office aircond requirements.",
    },
  },
  ms: {
    highRise: {
      label: "Akses kondo / bangunan tinggi",
      access: "Sahkan nama bangunan, blok, pendaftaran pengawal, slot lif servis dan posisi unit luar di balkoni sebelum juruteknik bergerak.",
      risk: "Corak biasa ialah tray saliran tersumbat, aliran kipas lemah, coil dalaman berkulat dan air menitis dari saliran balkoni sempit.",
      kit: "Juruteknik membawa canvas cuci, alat flush drain, tangga kompak dan kit akses kecil yang sesuai untuk balkoni apartmen.",
      serviceReason: "Rumah bertingkat biasanya perlukan cuci coil dalaman, pembersihan saliran dan ujian kebocoran yang teliti sebelum serahan kerja.",
    },
    shopOffice: {
      label: "Kedai / pejabat dengan waktu operasi",
      access: "Kami minta barisan kedai, tingkat, lokasi loading atau parkir dan slot masa terbaik supaya kerja tidak mengganggu pelanggan atau penyewa.",
      risk: "Minyak, habuk jalan, operasi lama dan saliran berkongsi menjadikan aliran udara lemah serta kebocoran lebih kerap berbanding rumah biasa.",
      kit: "Van disediakan dengan canvas cuci kimia, alat saliran komersial dan semakan ceiling cassette jika diperlukan.",
      serviceReason: "Unit komersial lebih sesuai dengan cuci coil kuat, penyelenggaraan berjadual dan tindakan pantas jika ada masalah keselesaan penyewa.",
    },
    landed: {
      label: "Rumah teres / landed keluarga",
      access: "Kami rancang akses pagar, laluan paip tembaga dari tingkat atas ke bawah dinding dan posisi kompressor luar sebelum sebut harga tambahan.",
      risk: "Unit landed lama sering mengalami coil kotor, gas rendah, kapasitor lemah dan laluan drain panjang yang perlu diuji selepas servis.",
      kit: "Juruteknik membawa sokongan tangga, vacuum pump, gauge gas serta allowance paip dan wiring standard untuk semakan pemasangan atau pindah unit.",
      serviceReason: "Rumah landed biasanya perlukan gabungan servis asas, cuci kimia dan semakan pemasangan atau gas untuk beberapa bilik.",
    },
    kampung: {
      label: "Akses kampung / rumah lama paras tanah",
      access: "Kebanyakan unit luar mudah dicapai di paras tanah, jadi lawatan fokus pada keadaan coil, usia wiring dan nasihat jujur sama ada baiki atau ganti.",
      risk: "Sistem R22/R410A lama, coil luar berhabuk, kapasitor lemah dan saliran tersumbat ialah isu berulang di rumah rendah tradisional.",
      kit: "Pasukan membawa alat hose drain, tester kapasitor, gauge gas dan canvas cuci untuk kerja kediaman hari sama.",
      serviceReason: "Rumah begini biasanya perlukan cuci kimia pencegahan, semakan tekanan gas dan keputusan jelas sama ada unit lama masih berbaloi dibaiki.",
    },
    hillside: {
      label: "Bukit / rumah besar dengan semakan pemasangan",
      access: "Kami semak akses driveway, sudut pemasangan kompressor, kejatuhan drain, laluan paip panjang dan posisi tangga yang selamat sebelum kerja bermula.",
      risk: "Cerun, kawasan hijau dan laluan paip panjang boleh menyebabkan air bertakung, daun pada coil luar dan gegaran bracket tidak rata.",
      kit: "Juruteknik sediakan semakan bracket, alat gradient drain, sokongan tangga, gauge gas dan canvas cuci kimia untuk rumah lebih besar.",
      serviceReason: "Rumah di bukit dan rumah besar perlukan semakan pemasangan teliti bersama cuci coil supaya saliran dan mounting kompressor kekal stabil.",
    },
    industrial: {
      label: "Beban habuk komersial ringan / industri",
      access: "Kami sahkan waktu operasi, slot shutdown, akses loading dan sama ada unit ceiling cassette atau wall-mounted digunakan.",
      risk: "Operasi berhabuk, penggunaan 10–12 jam sehari dan filter tersumbat boleh menurunkan prestasi cooling lebih cepat daripada rumah biasa.",
      kit: "Van disediakan dengan perlindungan cuci kimia lebih kuat, alat semakan cassette, alat drain dan nota laporan multi-unit.",
      serviceReason: "Unit industri dan workshop perlukan deep cleaning berjadual serta laporan supaya staf atau penyewa tidak mengalami kerosakan mengejut.",
    },
    mixed: {
      label: "Kawasan kediaman bercampur",
      access: "Kami sahkan sama ada alamat tepat ialah rumah landed, apartmen, unit kedai atau pejabat kecil sebelum tetapkan kit juruteknik yang betul.",
      risk: "Kawasan bercampur biasanya ada gabungan coil kotor, air menitis, gas rendah dan komponen elektrik lama bergantung kepada jenis unit.",
      kit: "Juruteknik membawa kit seimbang: canvas cuci, alat drain, gauge gas, tester kapasitor dan peralatan troubleshooting standard.",
      serviceReason: "Kawasan bercampur perlukan servis fleksibel untuk keperluan rumah, kedai dan pejabat kecil.",
    },
  },
  zh: {
    highRise: {
      label: "高楼公寓通行",
      access: "出发前先确认大楼名称、座号、保安登记、服务电梯时段，以及室外机在阳台或服务台的位置。",
      risk: "常见情况是排水盘堵塞、风量变弱、室内盘管发霉，以及狭窄阳台排水线导致漏水。",
      kit: "技师会准备清洗防水布、排水疏通工具、小型梯子，以及适合公寓阳台的小型工具包。",
      serviceReason: "高楼住宅通常需要清洗室内盘管、疏通排水，并在交工前仔细测试是否漏水。",
    },
    shopOffice: {
      label: "店屋 / 办公室营业时间",
      access: "我们会先确认店排、楼层、上下货或停车点，以及合适施工时段，避免影响顾客或租户。",
      risk: "油烟、路边灰尘、长时间运转和共用排水线，会让风量下降和漏水问题比普通住宅更常见。",
      kit: "车辆会准备化学清洗防水布、商业排水工具，并在需要时检查天花板卡式机。",
      serviceReason: "商业单位更适合深度盘管清洗、定期保养，以及在租户舒适度受影响时快速处理故障。",
    },
    landed: {
      label: "排屋 / 有地住宅路线",
      access: "报价前会规划大门通行、楼上到楼下铜管距离、墙身支架，以及室外压缩机位置。",
      risk: "较旧有地住宅常见盘管肮脏、冷媒不足、电容老化和较长排水管，需要在保养后做水流测试。",
      kit: "技师会带梯子支援、真空泵、冷媒压力表，以及安装或移机检查所需的标准铜管和电线工具。",
      serviceReason: "有地住宅通常需要基础保养、化学清洗，以及多个房间的安装或充气检查组合。",
    },
    kampung: {
      label: "甘榜 / 旧屋地面通行",
      access: "多数室外机可在地面直接接触，因此重点检查盘管状况、电线年龄，并诚实建议维修或更换。",
      risk: "旧R22/R410A系统、室外盘管积尘、电容变弱和排水堵塞，是低层传统住宅常见问题。",
      kit: "团队会携带排水管工具、电容测试器、冷媒压力表和清洗防水布，适合当天住宅服务。",
      serviceReason: "这类住宅通常需要预防性化学清洗、冷媒压力检查，并清楚判断旧机是否还值得维修。",
    },
    hillside: {
      label: "山坡 / 大型住宅安装检查",
      access: "开工前检查车道通行、压缩机安装角度、排水坡度、较长铜管路线和安全架梯位置。",
      risk: "斜坡、绿化和较长管线可能造成冷凝水积聚、室外盘管落叶堵塞，以及支架不平产生震动。",
      kit: "技师会准备支架检查、排水坡度工具、梯子支援、冷媒压力表和大型住宅化学清洗防水布。",
      serviceReason: "山坡和大型住宅需要更仔细的安装检查配合盘管清洗，确保排水和压缩机固定稳定。",
    },
    industrial: {
      label: "轻商业 / 工业灰尘负荷",
      access: "先确认营业时间、可停机时段、上下货通道，以及使用的是天花板卡式机还是壁挂机。",
      risk: "灰尘较多、每天运转10–12小时和滤网堵塞，会比普通住宅更快降低制冷效果。",
      kit: "车辆会准备更强的化学清洗保护、卡式机检查工具、排水工具和多机报告记录。",
      serviceReason: "工业和车间单位需要定期深度清洗及报告，避免员工或租户突然遇到停机问题。",
    },
    mixed: {
      label: "混合型住宅区域",
      access: "派工前先确认准确地址是有地住宅、公寓、店屋单位还是小办公室，再安排合适工具。",
      risk: "混合区域通常会出现盘管脏、漏水、冷媒不足和电气部件老化等不同组合。",
      kit: "技师会准备综合工具：清洗防水布、排水工具、冷媒压力表、电容测试器和标准故障排查工具。",
      serviceReason: "混合型社区需要灵活服务，能够处理住宅、店屋和小办公室的不同冷气需求。",
    },
  },
};

const PARENT_ROUTE_COPY: Record<string, Record<KampungMatrixLocale, string>> = {
  "kuala-lumpur-city-centre": {
    en: "KL city route via Jalan Ampang, Pudu, Tun Razak and inner-city parking windows.",
    ms: "Laluan KL city melalui Jalan Ampang, Pudu, Tun Razak dan slot parkir bandar.",
    zh: "吉隆坡市中心路线经过Jalan Ampang、Pudu、Tun Razak及市区停车时段。",
  },
  cheras: {
    en: "Cheras dispatch uses MRR2, Jalan Cheras, Connaught and Maluri routing depending on traffic.",
    ms: "Dispatch Cheras menggunakan MRR2, Jalan Cheras, Connaught dan Maluri mengikut trafik.",
    zh: "蕉赖派工会根据交通使用MRR2、Jalan Cheras、Connaught和Maluri路线。",
  },
  ampang: {
    en: "Ampang route coverage runs through Jalan Ampang, Pandan Indah and the Ampang Jaya corridor.",
    ms: "Liputan Ampang melalui Jalan Ampang, Pandan Indah dan koridor Ampang Jaya.",
    zh: "安邦路线覆盖Jalan Ampang、Pandan Indah和Ampang Jaya走廊。",
  },
  "mont-kiara": {
    en: "Mont Kiara route planning accounts for condo guardhouses, Solaris/Dutamas traffic and service-lift booking windows.",
    ms: "Laluan Mont Kiara mengambil kira pengawal kondo, trafik Solaris/Dutamas dan slot lif servis.",
    zh: "Mont Kiara路线会考虑公寓保安、Solaris/Dutamas交通和服务电梯预约时段。",
  },
  setapak: {
    en: "Setapak dispatch usually follows Jalan Genting Klang, Danau Kota and the Wangsa Maju border roads.",
    ms: "Dispatch Setapak biasanya melalui Jalan Genting Klang, Danau Kota dan jalan sempadan Wangsa Maju.",
    zh: "文良港派工通常经过Jalan Genting Klang、Danau Kota及Wangsa Maju边界道路。",
  },
  sentul: {
    en: "Sentul routing uses Jalan Ipoh, Sentul Timur/Barat and KTM/LRT traffic conditions.",
    ms: "Laluan Sentul menggunakan Jalan Ipoh, Sentul Timur/Barat serta keadaan trafik KTM/LRT.",
    zh: "冼都路线会使用Jalan Ipoh、Sentul Timur/Barat，并考虑KTM/LRT附近交通。",
  },
  kepong: {
    en: "Kepong dispatch is planned around MRR2, Jalan Kepong, Metro Prima and Jinjang access.",
    ms: "Dispatch Kepong dirancang sekitar MRR2, Jalan Kepong, Metro Prima dan akses Jinjang.",
    zh: "甲洞派工围绕MRR2、Jalan Kepong、Metro Prima和Jinjang通行安排。",
  },
  "sri-petaling": {
    en: "Sri Petaling route coverage connects Bukit Jalil, OUG, Kuchai Lama and Old Klang Road.",
    ms: "Liputan Sri Petaling menghubungkan Bukit Jalil, OUG, Kuchai Lama dan Old Klang Road.",
    zh: "Sri Petaling路线连接Bukit Jalil、OUG、Kuchai Lama和Old Klang Road。",
  },
  bangsar: {
    en: "Bangsar dispatch accounts for hill roads, Bangsar South condos, Lucky Garden shoplots and KL Sentral traffic.",
    ms: "Dispatch Bangsar mengambil kira jalan bukit, kondo Bangsar South, shoplot Lucky Garden dan trafik KL Sentral.",
    zh: "孟沙派工会考虑山路、Bangsar South公寓、Lucky Garden店屋及KL Sentral交通。",
  },
  "desa-parkcity": {
    en: "Desa ParkCity route planning uses Kepong, Menjalara and Penchala-side access depending on the exact address.",
    ms: "Laluan Desa ParkCity menggunakan akses Kepong, Menjalara dan sebelah Penchala mengikut alamat tepat.",
    zh: "Desa ParkCity路线会按地址使用Kepong、Menjalara或Penchala方向进入。",
  },
  "taman-melawati": {
    en: "Taman Melawati dispatch follows MRR2, Zoo Negara, Wangsa Melawati and Klang Gate approaches.",
    ms: "Dispatch Taman Melawati melalui MRR2, Zoo Negara, Wangsa Melawati dan Klang Gate.",
    zh: "Taman Melawati派工经过MRR2、Zoo Negara、Wangsa Melawati和Klang Gate方向。",
  },
  "hulu-kelang": {
    en: "Hulu Kelang routing plans for hillside access through Ukay Perdana, Keramat and Bukit Antarabangsa.",
    ms: "Laluan Hulu Kelang dirancang untuk akses bukit melalui Ukay Perdana, Keramat dan Bukit Antarabangsa.",
    zh: "Hulu Kelang路线会规划Ukay Perdana、Keramat和Bukit Antarabangsa的山坡通行。",
  },
  "wangsa-maju": {
    en: "Wangsa Maju dispatch uses Setiawangsa, Sri Rampai and Section 1–10 internal roads.",
    ms: "Dispatch Wangsa Maju menggunakan Setiawangsa, Sri Rampai dan jalan dalaman Seksyen 1–10.",
    zh: "旺沙玛珠派工使用Setiawangsa、Sri Rampai及第1至第10区内部道路。",
  },
  "petaling-jaya": {
    en: "Petaling Jaya routing connects Old Town, Section 14, Kelana Jaya and the Federal Highway corridor.",
    ms: "Laluan Petaling Jaya menghubungkan Old Town, Seksyen 14, Kelana Jaya dan koridor Federal Highway.",
    zh: "八打灵再也路线连接Old Town、Section 14、Kelana Jaya和Federal Highway走廊。",
  },
  "shah-alam": {
    en: "Shah Alam dispatch is planned around Subang, Section 7/13, Glenmarie and airport-side routes.",
    ms: "Dispatch Shah Alam dirancang sekitar Subang, Seksyen 7/13, Glenmarie dan laluan sebelah airport.",
    zh: "莎阿南派工围绕Subang、第7/13区、Glenmarie和机场方向路线安排。",
  },
  "subang-jaya": {
    en: "Subang Jaya routing uses SS15, USJ, Taipan and Federal Highway/NKVE access points.",
    ms: "Laluan Subang Jaya menggunakan SS15, USJ, Taipan dan akses Federal Highway/NKVE.",
    zh: "梳邦再也路线使用SS15、USJ、Taipan以及Federal Highway/NKVE入口。",
  },
  puchong: {
    en: "Puchong dispatch follows LDP, IOI/Pusat Bandar Puchong, Kinrara and Bukit Puchong access.",
    ms: "Dispatch Puchong melalui LDP, IOI/Pusat Bandar Puchong, Kinrara dan akses Bukit Puchong.",
    zh: "蒲种派工经过LDP、IOI/Pusat Bandar Puchong、Kinrara和Bukit Puchong入口。",
  },
  klang: {
    en: "Klang routing plans around Federal Highway, Bukit Tinggi, Meru, Port Klang and town-centre traffic.",
    ms: "Laluan Klang dirancang sekitar Federal Highway, Bukit Tinggi, Meru, Port Klang dan trafik pusat bandar.",
    zh: "巴生路线围绕Federal Highway、Bukit Tinggi、Meru、Port Klang和市中心交通安排。",
  },
  kajang: {
    en: "Kajang dispatch uses SILK, Cheras-Kajang, Sungai Chua and town-centre access.",
    ms: "Dispatch Kajang menggunakan SILK, Cheras-Kajang, Sungai Chua dan akses pusat bandar.",
    zh: "加影派工使用SILK、Cheras-Kajang、Sungai Chua和市中心入口。",
  },
  "batu-caves": {
    en: "Batu Caves routing uses MRR2, Selayang, Sri Gombak and Jalan Ipoh connection points.",
    ms: "Laluan Batu Caves menggunakan MRR2, Selayang, Sri Gombak dan sambungan Jalan Ipoh.",
    zh: "黑风洞路线使用MRR2、Selayang、Sri Gombak和Jalan Ipoh连接点。",
  },
  damansara: {
    en: "Damansara dispatch connects Kota Damansara, Damai, Damansara Jaya and Sprint/LDP access.",
    ms: "Dispatch Damansara menghubungkan Kota Damansara, Damai, Damansara Jaya dan akses Sprint/LDP.",
    zh: "白沙罗派工连接Kota Damansara、Damai、Damansara Jaya和Sprint/LDP入口。",
  },
  sunway: {
    en: "Sunway routing accounts for Bandar Sunway, Sunway Mentari, hospital/university traffic and BRT access.",
    ms: "Laluan Sunway mengambil kira Bandar Sunway, Sunway Mentari, trafik hospital/universiti dan akses BRT.",
    zh: "双威路线会考虑Bandar Sunway、Sunway Mentari、医院/大学交通和BRT通行。",
  },
  rawang: {
    en: "Rawang dispatch uses PLUS/LATAR links, town-centre access and Bandar Country Homes routing.",
    ms: "Dispatch Rawang menggunakan pautan PLUS/LATAR, akses pusat bandar dan laluan Bandar Country Homes.",
    zh: "万挠派工使用PLUS/LATAR连接、市中心入口和Bandar Country Homes路线。",
  },
  "kajang-semenyih": {
    en: "Semenyih-side routing uses SILK, Jalan Semenyih, Rinching and Kajang town connections.",
    ms: "Laluan sebelah Semenyih menggunakan SILK, Jalan Semenyih, Rinching dan sambungan bandar Kajang.",
    zh: "士毛月方向路线使用SILK、Jalan Semenyih、Rinching和加影市区连接。",
  },
  putrajaya: {
    en: "Putrajaya dispatch plans around Presint security, government complex access and Cyberjaya links.",
    ms: "Dispatch Putrajaya dirancang sekitar sekuriti Presint, akses kompleks kerajaan dan pautan Cyberjaya.",
    zh: "布城派工会规划各Precinct保安、政府建筑通行和Cyberjaya连接。",
  },
  "kota-kemuning": {
    en: "Kota Kemuning routing uses LKSA, Bukit Rimau, Kemuning Utama and Shah Alam-side access.",
    ms: "Laluan Kota Kemuning menggunakan LKSA, Bukit Rimau, Kemuning Utama dan akses sebelah Shah Alam.",
    zh: "Kota Kemuning路线使用LKSA、Bukit Rimau、Kemuning Utama和Shah Alam方向入口。",
  },
  "seri-kembangan": {
    en: "Seri Kembangan dispatch uses Mines, UPM, Balakong and South Klang Valley access roads.",
    ms: "Dispatch Seri Kembangan menggunakan Mines, UPM, Balakong dan jalan akses Selatan Klang Valley.",
    zh: "沙登派工使用Mines、UPM、Balakong和南巴生谷道路。",
  },
  cyberjaya: {
    en: "Cyberjaya routing plans for tech-office towers, condo management rules and Persiaran Multimedia access.",
    ms: "Laluan Cyberjaya mengambil kira menara pejabat teknologi, peraturan pengurusan kondo dan akses Persiaran Multimedia.",
    zh: "Cyberjaya路线会考虑科技办公楼、公寓管理规则和Persiaran Multimedia入口。",
  },
  "bandar-utama": {
    en: "Bandar Utama routing uses 1 Utama, BU sections, TTDI and Sprint/LDP access windows.",
    ms: "Laluan Bandar Utama menggunakan 1 Utama, seksyen BU, TTDI dan slot akses Sprint/LDP.",
    zh: "Bandar Utama路线使用1 Utama、BU分区、TTDI和Sprint/LDP入口时段。",
  },
  "sungai-buloh": {
    en: "Sungai Buloh dispatch uses hospital, railway and Guthrie/NKVE-side routing.",
    ms: "Dispatch Sungai Buloh menggunakan laluan hospital, railway dan sebelah Guthrie/NKVE.",
    zh: "双溪毛糯派工使用医院、铁路及Guthrie/NKVE方向路线。",
  },
  "setia-alam": {
    en: "Setia Alam routing plans through NKVE, Setia City and newer guarded residential access.",
    ms: "Laluan Setia Alam melalui NKVE, Setia City dan akses kediaman berpagar baharu.",
    zh: "Setia Alam路线经过NKVE、Setia City和较新有保安住宅入口。",
  },
  selayang: {
    en: "Selayang dispatch connects Batu Caves, Jalan Ipoh, MRR2 and market-area traffic windows.",
    ms: "Dispatch Selayang menghubungkan Batu Caves, Jalan Ipoh, MRR2 dan slot trafik kawasan pasar.",
    zh: "士拉央派工连接Batu Caves、Jalan Ipoh、MRR2和市场区交通时段。",
  },
  balakong: {
    en: "Balakong routing uses Cheras Selatan, Mines, SILK and light-industrial access roads.",
    ms: "Laluan Balakong menggunakan Cheras Selatan, Mines, SILK dan jalan akses industri ringan.",
    zh: "Balakong路线使用Cheras Selatan、Mines、SILK和轻工业道路。",
  },
  "bandar-botanic": {
    en: "Bandar Botanic dispatch connects Bukit Tinggi, Klang town and Kesas/Federal Highway access.",
    ms: "Dispatch Bandar Botanic menghubungkan Bukit Tinggi, bandar Klang dan akses Kesas/Federal Highway.",
    zh: "Bandar Botanic派工连接Bukit Tinggi、巴生市区和Kesas/Federal Highway入口。",
  },
  glenmarie: {
    en: "Glenmarie routing plans around industrial parks, NKVE/Federal access and Shah Alam-Subang traffic.",
    ms: "Laluan Glenmarie dirancang sekitar taman industri, akses NKVE/Federal dan trafik Shah Alam-Subang.",
    zh: "Glenmarie路线围绕工业园、NKVE/Federal入口及Shah Alam-Subang交通安排。",
  },
};

const SERVICE_LABELS: Record<
  KampungMatrixLocale,
  Record<string, { label: string; price: string; reason: string }>
> = {
  en: {
    "basic-servicing": { label: "Basic Servicing", price: "from RM 99", reason: "routine cleaning, airflow checks and preventive maintenance" },
    "chemical-wash": { label: "Chemical Wash", price: "from RM 120", reason: "deep coil cleaning when dust, mould or weak cooling is present" },
    "gas-topup": { label: "Gas Top-Up", price: "from RM 2.50/PSI", reason: "pressure diagnosis for low cooling or suspected refrigerant loss" },
    repair: { label: "Aircond Repair", price: "from RM 150", reason: "fault isolation for leaking, tripping, noisy or non-cooling units" },
    installation: { label: "Installation", price: "from RM 199", reason: "new unit setup, pipe routing and commissioning work" },
    "ceiling-cassette": { label: "Ceiling Cassette", price: "from RM 220", reason: "commercial cassette cleaning, drain and airflow checks" },
    "maintenance-contract": { label: "Maintenance Contract", price: "from RM 299/year", reason: "scheduled servicing for multi-unit homes, shops and offices" },
  },
  ms: {
    "basic-servicing": { label: "Servis Asas", price: "dari RM 99", reason: "pembersihan rutin, semakan airflow dan penyelenggaraan pencegahan" },
    "chemical-wash": { label: "Cuci Kimia", price: "dari RM 120", reason: "cuci coil mendalam apabila ada habuk, kulat atau cooling lemah" },
    "gas-topup": { label: "Tambah Gas", price: "dari RM 2.50/PSI", reason: "diagnosis tekanan untuk cooling rendah atau disyaki kurang refrigerant" },
    repair: { label: "Baiki Aircond", price: "dari RM 150", reason: "semakan punca air menitis, trip, bunyi kuat atau tidak sejuk" },
    installation: { label: "Pemasangan", price: "dari RM 199", reason: "pasang unit baharu, laluan paip dan commissioning" },
    "ceiling-cassette": { label: "Ceiling Cassette", price: "dari RM 220", reason: "cuci cassette komersial, saliran dan semakan airflow" },
    "maintenance-contract": { label: "Kontrak Maintenance", price: "dari RM 299/tahun", reason: "servis berjadual untuk rumah multi-unit, kedai dan pejabat" },
  },
  zh: {
    "basic-servicing": { label: "基础保养", price: "RM 99起", reason: "例行清洁、风量检查和预防性保养" },
    "chemical-wash": { label: "化学清洗", price: "RM 120起", reason: "灰尘、霉味或制冷弱时进行深度盘管清洗" },
    "gas-topup": { label: "补充冷媒", price: "RM 2.50/PSI起", reason: "针对制冷不足或疑似冷媒流失进行压力诊断" },
    repair: { label: "冷气维修", price: "RM 150起", reason: "排查漏水、跳电、噪音或不制冷问题" },
    installation: { label: "冷气安装", price: "RM 199起", reason: "新机安装、铜管路线、支架和调试" },
    "ceiling-cassette": { label: "天花板卡式机", price: "RM 220起", reason: "商业卡式机清洗、排水和风量检查" },
    "maintenance-contract": { label: "保养合约", price: "RM 299/年起", reason: "适合多机住宅、店铺和办公室的定期服务" },
  },
};

const SERVICE_BUNDLES: Record<ProfileKey, string[]> = {
  highRise: ["basic-servicing", "chemical-wash", "repair"],
  shopOffice: ["chemical-wash", "ceiling-cassette", "maintenance-contract"],
  landed: ["basic-servicing", "chemical-wash", "installation"],
  kampung: ["basic-servicing", "chemical-wash", "gas-topup"],
  hillside: ["installation", "chemical-wash", "repair"],
  industrial: ["chemical-wash", "ceiling-cassette", "maintenance-contract"],
  mixed: ["basic-servicing", "chemical-wash", "repair"],
};

const TEXT = {
  en: {
    eyebrow: "20D.33 Area Uniqueness Matrix · Sub-area de-templating",
    heading: (name: string) => `${name} Aircond Service Uniqueness Matrix`,
    intro: (name: string, parentName: string, state: string, profile: string, route: string) =>
      `Every neighbourhood inside ${parentName} has a different cooling, access and dispatch pattern. For ${name}, KL Renovator treats this as a ${profile.toLowerCase()} job in ${state}, not a generic ${parentName} copy. The matrix below fixes the service angle for this exact sub-area: property type, access constraint, likely aircond fault, technician kit, route planning and the best internal service pages to check before booking. ${route}`,
    rowLabels: {
      profile: "Local property profile",
      access: "Access and site-prep rule",
      risk: "Most likely cooling issue",
      kit: "Technician kit prepared",
      dispatch: "Dispatch route signal",
      booking: "Booking proof to send",
    },
    serviceHeading: "Best-fit service pages for this neighbourhood",
    serviceIntro: (name: string) => `These links are selected for ${name}'s property/access pattern so users do not land on a generic area page first.`,
    bookingTip: (name: string, parentName: string) =>
      `For fastest dispatch, WhatsApp your exact road, building or house type in ${name}, plus a photo of the indoor unit and outdoor compressor. We confirm pricing before work and keep the booking linked to the correct ${parentName} route.`,
    coords: (lat?: number, lng?: number) =>
      lat && lng ? `Local GPS anchor: ${lat.toFixed(4)}, ${lng.toFixed(4)}.` : "Local GPS anchor is checked from the confirmed WhatsApp pin.",
  },
  ms: {
    eyebrow: "20D.33 Matriks Keunikan Kawasan · Elak salinan generik",
    heading: (name: string) => `Matriks Servis Aircond ${name}`,
    intro: (name: string, parentName: string, state: string, profile: string, route: string) =>
      `Setiap sub-kawasan dalam ${parentName} mempunyai corak cooling, akses dan dispatch yang berbeza. Untuk ${name}, KL Renovator menganggap kerja ini sebagai profil ${profile.toLowerCase()} di ${state}, bukan salinan generik ${parentName}. Matriks di bawah menetapkan sudut servis untuk kawasan tepat ini: jenis hartanah, kekangan akses, risiko kerosakan aircond, kit juruteknik, laluan dispatch dan halaman servis dalaman terbaik sebelum tempahan. ${route}`,
    rowLabels: {
      profile: "Profil hartanah setempat",
      access: "Peraturan akses dan persediaan tapak",
      risk: "Isu cooling paling mungkin",
      kit: "Kit juruteknik disediakan",
      dispatch: "Isyarat laluan dispatch",
      booking: "Bukti tempahan untuk dihantar",
    },
    serviceHeading: "Halaman servis terbaik untuk kawasan ini",
    serviceIntro: (name: string) => `Pautan ini dipilih mengikut corak hartanah dan akses ${name}, supaya pengguna tidak bergantung pada halaman kawasan generik sahaja.`,
    bookingTip: (name: string, parentName: string) =>
      `Untuk dispatch paling pantas, WhatsApp jalan tepat, nama bangunan atau jenis rumah di ${name}, bersama foto unit dalam dan kompressor luar. Harga disahkan sebelum kerja dan tempahan dikaitkan dengan laluan ${parentName} yang betul.`,
    coords: (lat?: number, lng?: number) =>
      lat && lng ? `Anchor GPS setempat: ${lat.toFixed(4)}, ${lng.toFixed(4)}.` : "Anchor GPS setempat disemak melalui pin WhatsApp yang disahkan.",
  },
  zh: {
    eyebrow: "20D.33 区域独特矩阵 · 避免通用复制内容",
    heading: (name: string) => `${name}冷气服务独特矩阵`,
    intro: (name: string, parentName: string, state: string, profile: string, route: string) =>
      `${parentName}内每个社区的制冷问题、通行方式和派工路线都不同。对于${name}，KL Renovator会把它视为${state}的「${profile}」服务，不使用通用${parentName}文案。下面的矩阵固定此子区域的服务角度：物业类型、通行限制、常见冷气故障、技师工具、派工路线，以及预约前最适合查看的内部服务页面。${route}`,
    rowLabels: {
      profile: "本地物业类型",
      access: "通行与现场准备规则",
      risk: "最可能的制冷问题",
      kit: "技师准备工具",
      dispatch: "派工路线信号",
      booking: "预约时建议发送资料",
    },
    serviceHeading: "此区域最适合的服务页面",
    serviceIntro: (name: string) => `这些链接按${name}的物业和通行模式选择，避免用户只停留在通用区域页面。`,
    bookingTip: (name: string, parentName: string) =>
      `为了最快派工，请WhatsApp发送${name}的准确道路、大楼名称或房屋类型，并附上室内机和室外压缩机照片。施工前确认价格，并把预约归入正确的${parentName}路线。`,
    coords: (lat?: number, lng?: number) =>
      lat && lng ? `本地GPS锚点：${lat.toFixed(4)}, ${lng.toFixed(4)}。` : "本地GPS锚点会根据确认后的WhatsApp定位检查。",
  },
} as const;

function detectProfile(k: KampungPageRecord): ProfileKey {
  const haystack = [
    k.slug,
    k.name,
    k.parentSlug,
    k.housingNote,
    k.description,
    k.descriptionMS,
    k.descriptionZH,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const [profile, keywords] of PROFILE_KEYWORDS) {
    if (keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))) {
      return profile;
    }
  }

  return "mixed";
}

function serviceHref(locale: KampungMatrixLocale, slug: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/services/${slug}`;
}

function parentRoute(k: KampungPageRecord, parentArea: ParentAreaRecord | undefined, locale: KampungMatrixLocale) {
  const exact = PARENT_ROUTE_COPY[k.parentSlug]?.[locale];
  if (exact) return exact;

  const parentName = parentArea?.name || k.parentSlug.replace(/-/g, " ");
  const landmarks = parentArea?.landmarks?.slice(0, 3).join(" / ");

  if (locale === "ms") {
    return landmarks
      ? `Laluan ${parentName} disemak melalui ${landmarks} mengikut trafik semasa.`
      : `Laluan ${parentName} disemak berdasarkan pin WhatsApp dan trafik semasa.`;
  }

  if (locale === "zh") {
    return landmarks
      ? `${parentName}路线会通过${landmarks}并按实时交通调整。`
      : `${parentName}路线会根据WhatsApp定位和实时交通调整。`;
  }

  return landmarks
    ? `${parentName} route planning uses ${landmarks} and current traffic conditions.`
    : `${parentName} route planning is confirmed from the WhatsApp pin and live traffic.`;
}

function buildServiceLinks(profile: ProfileKey, locale: KampungMatrixLocale): KampungMatrixServiceLink[] {
  return SERVICE_BUNDLES[profile].map((slug) => {
    const service = SERVICE_LABELS[locale][slug];

    return {
      label: service.label,
      price: service.price,
      href: serviceHref(locale, slug),
      reason: service.reason,
    };
  });
}

export function buildKampungUniquenessMatrix(
  k: KampungPageRecord,
  parentArea: ParentAreaRecord | undefined,
  locale: KampungMatrixLocale
): KampungUniquenessMatrix {
  const profile = detectProfile(k);
  const copy = PROFILE_COPY[locale][profile];
  const t = TEXT[locale];
  const parentName = parentArea?.name || k.parentSlug.replace(/-/g, " ");
  const route = parentRoute(k, parentArea, locale);
  const serviceLinks = buildServiceLinks(profile, locale);
  const coords = t.coords(k.lat, k.lng);

  const rows: KampungMatrixRow[] = [
    {
      label: t.rowLabels.profile,
      value: copy.label,
      detail:
        locale === "en"
          ? `${k.name} is mapped as ${copy.label.toLowerCase()} within ${parentName}. This gives the page a fixed local angle instead of repeating the parent-area paragraph.`
          : locale === "ms"
            ? `${k.name} dipetakan sebagai ${copy.label.toLowerCase()} dalam ${parentName}. Ini memberi sudut setempat yang jelas, bukan ulang ayat kawasan induk.`
            : `${k.name}在${parentName}内归类为${copy.label}，让页面拥有明确本地角度，而不是重复父区域文案。`,
    },
    {
      label: t.rowLabels.access,
      value: locale === "en" ? "Before technician dispatch" : locale === "ms" ? "Sebelum juruteknik bergerak" : "技师出发前",
      detail: copy.access,
    },
    {
      label: t.rowLabels.risk,
      value: locale === "en" ? "Likely fault pattern" : locale === "ms" ? "Corak masalah biasa" : "常见故障模式",
      detail: copy.risk,
    },
    {
      label: t.rowLabels.kit,
      value: locale === "en" ? "Prepared from the profile" : locale === "ms" ? "Disediakan ikut profil" : "按类型准备",
      detail: copy.kit,
    },
    {
      label: t.rowLabels.dispatch,
      value: parentName,
      detail: `${route} ${coords}`,
    },
    {
      label: t.rowLabels.booking,
      value: locale === "en" ? "WhatsApp proof" : locale === "ms" ? "Bukti WhatsApp" : "WhatsApp资料",
      detail: t.bookingTip(k.name, parentName),
    },
  ];

  return {
    id: "area-uniqueness-matrix",
    eyebrow: t.eyebrow,
    heading: t.heading(k.name),
    intro: t.intro(k.name, parentName, k.state, copy.label, route),
    rows,
    serviceHeading: t.serviceHeading,
    serviceIntro: `${t.serviceIntro(k.name)} ${copy.serviceReason}`,
    serviceLinks,
    bookingTip: t.bookingTip(k.name, parentName),
  };
}
