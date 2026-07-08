export type ServiceHVACEntityLocale = "en" | "ms" | "zh";

export type ServiceHVACEntityGroup = {
  title: string;
  description: string;
  terms: string[];
};

export type ServiceHVACEntityModule = {
  taskId: "8.7";
  eyebrow: string;
  heading: string;
  intro: string;
  groups: ServiceHVACEntityGroup[];
  validationTitle: string;
  validationPoints: string[];
  note: string;
};

type LocalizedEntityCopy = {
  intro: string;
  groups: ServiceHVACEntityGroup[];
  validationPoints: string[];
};

const ENTITY_COPY: Record<string, Record<ServiceHVACEntityLocale, LocalizedEntityCopy>> = {
  "chemical-wash": {
    en: {
      intro: "This service is described around the real HVAC parts cleaned during an on-wall pressure chemical wash, not generic cleaning copy.",
      groups: [
        { title: "Indoor air path", description: "Parts that directly affect airflow and smell.", terms: ["evaporator coil", "aluminium fins", "blower wheel", "fan barrel", "return-air filter", "front air louvre"] },
        { title: "Drainage system", description: "Parts checked so dissolved biofilm exits cleanly.", terms: ["condensate drain tray", "drain outlet", "drain hose", "biofilm sludge", "water flow test"] },
        { title: "Cleaning method", description: "Process signals that distinguish this from basic servicing.", terms: ["80–120 PSI rinse", "alkaline coil cleaner", "wash canvas", "controlled water flushing", "airflow restoration"] },
      ],
      validationPoints: ["Airflow is checked after rinsing.", "Drain flow is tested before handover.", "Walls and furniture are protected with a wash canvas."],
    },
    ms: {
      intro: "Servis ini diterangkan berdasarkan komponen HVAC sebenar yang dicuci semasa cuci kimia on-wall, bukan ayat pembersihan generik.",
      groups: [
        { title: "Laluan udara dalaman", description: "Komponen yang terus mempengaruhi airflow dan bau.", terms: ["evaporator coil", "sirip aluminium", "blower wheel", "barrel kipas", "filter udara balik", "louvre depan"] },
        { title: "Sistem saliran", description: "Bahagian yang disemak supaya biofilm yang larut keluar dengan bersih.", terms: ["tray kondensat", "outlet drain", "hos drain", "sludge biofilm", "ujian aliran air"] },
        { title: "Kaedah cucian", description: "Signal proses yang membezakan servis ini daripada servis asas.", terms: ["bilasan 80–120 PSI", "chemical coil alkaline", "canvas cuci", "flush air terkawal", "pemulihan airflow"] },
      ],
      validationPoints: ["Airflow disemak selepas bilasan.", "Aliran drain diuji sebelum serahan.", "Dinding dan perabot dilindungi dengan canvas cuci."],
    },
    zh: {
      intro: "此服务围绕挂墙高压化学清洗中真正处理的HVAC部件说明，而不是通用清洁文案。",
      groups: [
        { title: "室内送风路径", description: "直接影响风量和异味的部件。", terms: ["蒸发器盘管", "铝翅片", "风轮", "风筒", "回风滤网", "前导风叶"] },
        { title: "排水系统", description: "确保溶解后的生物膜能顺利排出的部件。", terms: ["冷凝水盘", "排水出口", "排水管", "生物膜污泥", "水流测试"] },
        { title: "清洗方式", description: "区分化学清洗与基础保养的流程信号。", terms: ["80–120 PSI冲洗", "碱性盘管清洁剂", "清洗防水布", "受控冲水", "风量恢复"] },
      ],
      validationPoints: ["冲洗后检查风量。", "交工前测试排水。", "使用清洗防水布保护墙面和家具。"],
    },
  },
  "chemical-overhaul": {
    en: {
      intro: "This page now clarifies the full dismantle entities involved when a normal wash cannot reach hidden sludge or leak points.",
      groups: [
        { title: "Dismantled components", description: "Parts removed or exposed for deep cleaning.", terms: ["indoor fan coil unit", "blower wheel removal", "drain pan", "back tray", "cross-flow fan", "coil housing"] },
        { title: "Leak and ice causes", description: "Entities linked to persistent leaking or freezing.", terms: ["condensate blockage", "biofilm build-up", "cracked drain tray", "iced evaporator coil", "restricted heat exchange"] },
        { title: "Recommissioning checks", description: "What is checked after reassembly.", terms: ["pump-down procedure", "flare joint check", "water test", "cooling delta", "vibration check"] },
      ],
      validationPoints: ["Drain tray condition is shown if cracked or blocked.", "Unit is reassembled and run-tested.", "Cooling and drainage are verified together."],
    },
    ms: {
      intro: "Halaman ini menjelaskan entiti dismantle penuh apabila cuci biasa tidak mencapai sludge tersembunyi atau punca bocor.",
      groups: [
        { title: "Komponen dibuka", description: "Bahagian yang dibuka atau didedahkan untuk deep cleaning.", terms: ["indoor fan coil unit", "buka blower wheel", "drain pan", "back tray", "cross-flow fan", "housing coil"] },
        { title: "Punca bocor dan ais", description: "Entiti berkaitan kebocoran berulang atau pembekuan.", terms: ["condensate tersumbat", "biofilm build-up", "drain tray retak", "evaporator coil berais", "heat exchange terhad"] },
        { title: "Semakan recommissioning", description: "Apa yang diuji selepas pemasangan semula.", terms: ["prosedur pump-down", "semakan flare joint", "ujian air", "cooling delta", "semakan getaran"] },
      ],
      validationPoints: ["Keadaan drain tray ditunjukkan jika retak atau tersumbat.", "Unit dipasang semula dan diuji.", "Cooling dan drainage disahkan bersama."],
    },
    zh: {
      intro: "当普通清洗无法触及隐藏污泥或漏水点时，本页明确说明完整拆机涉及的HVAC实体。",
      groups: [
        { title: "拆卸部件", description: "为深层清洗而拆下或暴露的部件。", terms: ["室内风机盘管", "拆卸风轮", "排水盘", "后托盘", "贯流风扇", "盘管外壳"] },
        { title: "漏水与结冰原因", description: "与反复漏水或结冰有关的实体。", terms: ["冷凝水堵塞", "生物膜堆积", "排水盘裂纹", "蒸发器结冰", "换热受阻"] },
        { title: "重新调试检查", description: "重新组装后的检查项目。", terms: ["抽回冷媒流程", "喇叭口接头检查", "通水测试", "制冷温差", "震动检查"] },
      ],
      validationPoints: ["若排水盘裂或堵，会向客户说明。", "重新组装后会运行测试。", "同时确认制冷和排水。"],
    },
  },
  "gas-topup": {
    en: {
      intro: "This service is framed around refrigerant diagnosis, pressure readings and leak-risk explanation before any gas is added.",
      groups: [
        { title: "Refrigerant types", description: "Gas systems handled by KL Renovator technicians.", terms: ["R32 refrigerant", "R410A refrigerant", "R22 refrigerant", "low-pressure side", "high-pressure side"] },
        { title: "Diagnostic tools", description: "Tools used before recommending a top-up.", terms: ["manifold gauge", "pressure reading", "temperature drop", "service valve", "outdoor unit label"] },
        { title: "Leak-risk entities", description: "Common points that can make repeated top-ups wasteful.", terms: ["flare joint", "copper pipe run", "Schrader valve", "coil leak", "compressor suction line"] },
      ],
      validationPoints: ["Gas type is confirmed before charging.", "Pressure is read before quotation.", "Leak risk is explained if pressure is abnormally low."],
    },
    ms: {
      intro: "Servis ini difokuskan pada diagnosis refrigerant, bacaan tekanan dan penerangan risiko bocor sebelum gas ditambah.",
      groups: [
        { title: "Jenis refrigerant", description: "Sistem gas yang dikendalikan juruteknik KL Renovator.", terms: ["refrigerant R32", "refrigerant R410A", "refrigerant R22", "low-pressure side", "high-pressure side"] },
        { title: "Alat diagnosis", description: "Alat digunakan sebelum top-up dicadangkan.", terms: ["manifold gauge", "bacaan tekanan", "temperature drop", "service valve", "label unit luar"] },
        { title: "Entiti risiko bocor", description: "Titik biasa yang menyebabkan top-up berulang membazir.", terms: ["flare joint", "laluan paip kuprum", "Schrader valve", "coil leak", "suction line compressor"] },
      ],
      validationPoints: ["Jenis gas disahkan sebelum charging.", "Tekanan dibaca sebelum sebut harga.", "Risiko bocor diterangkan jika tekanan terlalu rendah."],
    },
    zh: {
      intro: "此服务以冷媒诊断、压力读数和漏气风险说明为核心，补气前先确认原因。",
      groups: [
        { title: "冷媒类型", description: "KL Renovator技师处理的冷媒系统。", terms: ["R32冷媒", "R410A冷媒", "R22冷媒", "低压侧", "高压侧"] },
        { title: "诊断工具", description: "建议补气前使用的工具。", terms: ["歧管压力表", "压力读数", "温差", "维修阀", "室外机标签"] },
        { title: "漏气风险实体", description: "导致反复补气浪费的常见点。", terms: ["喇叭口接头", "铜管路线", "Schrader阀", "盘管漏", "压缩机吸气管"] },
      ],
      validationPoints: ["充气前确认冷媒类型。", "报价前读取压力。", "若压力异常低，会解释漏气风险。"],
    },
  },
  repair: {
    en: {
      intro: "Repair content is mapped to diagnostic entities so users understand which part is being tested before replacement.",
      groups: [
        { title: "Electrical entities", description: "Parts checked when the unit trips, blinks or will not start.", terms: ["capacitor", "PCB board", "thermistor", "terminal block", "MCB trip", "wiring insulation"] },
        { title: "Mechanical entities", description: "Parts checked when noise, fan failure or poor cooling appears.", terms: ["fan motor", "compressor", "outdoor fan blade", "bearing vibration", "contactor", "relay"] },
        { title: "Diagnostic workflow", description: "How the fault is narrowed before quoting.", terms: ["error code reading", "amp draw", "continuity test", "voltage check", "load test"] },
      ],
      validationPoints: ["Part cost is confirmed before replacement.", "Electrical faults are isolated before reset.", "The unit is run-tested after repair."],
    },
    ms: {
      intro: "Kandungan repair dipetakan kepada entiti diagnosis supaya pengguna faham part mana diuji sebelum diganti.",
      groups: [
        { title: "Entiti elektrik", description: "Parts disemak apabila unit trip, blinking atau tidak hidup.", terms: ["kapasitor", "papan PCB", "thermistor", "terminal block", "MCB trip", "insulasi wiring"] },
        { title: "Entiti mekanikal", description: "Parts disemak apabila ada bunyi, kipas gagal atau cooling lemah.", terms: ["fan motor", "compressor", "bilah kipas luar", "getaran bearing", "contactor", "relay"] },
        { title: "Aliran diagnosis", description: "Cara punca dikecilkan sebelum harga diberi.", terms: ["bacaan kod error", "amp draw", "continuity test", "voltage check", "load test"] },
      ],
      validationPoints: ["Kos parts disahkan sebelum ganti.", "Masalah elektrik diasingkan sebelum reset.", "Unit diuji selepas repair."],
    },
    zh: {
      intro: "维修内容按诊断实体整理，让用户知道更换前会测试哪些部件。",
      groups: [
        { title: "电气实体", description: "机器跳电、闪灯或无法启动时检查的部件。", terms: ["电容", "PCB板", "热敏电阻", "端子排", "MCB跳闸", "电线绝缘"] },
        { title: "机械实体", description: "出现噪音、风扇故障或制冷弱时检查的部件。", terms: ["风扇马达", "压缩机", "室外风叶", "轴承震动", "接触器", "继电器"] },
        { title: "诊断流程", description: "报价前如何缩小故障范围。", terms: ["故障码读取", "电流读取", "连续性测试", "电压检查", "负载测试"] },
      ],
      validationPoints: ["更换前确认零件费用。", "重置前先隔离电气故障。", "维修后进行运行测试。"],
    },
  },
  installation: {
    en: {
      intro: "Installation content now names the HVAC commissioning entities that protect cooling performance and compressor life.",
      groups: [
        { title: "Pipe and drain route", description: "Physical installation entities planned before drilling.", terms: ["copper pipe run", "drain gradient", "PVC trunking", "wall sleeve", "outdoor bracket", "flaring joint"] },
        { title: "Commissioning workflow", description: "Start-up steps that prevent moisture and air contamination.", terms: ["vacuum pump", "micron evacuation", "refrigerant release", "leak test", "insulation wrap"] },
        { title: "Electrical and placement", description: "Safety and usability entities checked on site.", terms: ["power point", "isolator", "indoor airflow clearance", "outdoor condenser clearance", "vibration pad"] },
      ],
      validationPoints: ["Pipe route is confirmed before drilling.", "Vacuuming is performed before refrigerant release.", "Drainage and cooling are tested before handover."],
    },
    ms: {
      intro: "Kandungan pemasangan kini menyebut entiti commissioning HVAC yang melindungi prestasi cooling dan hayat compressor.",
      groups: [
        { title: "Laluan paip dan drain", description: "Entiti fizikal dirancang sebelum drilling.", terms: ["laluan paip kuprum", "gradient drain", "PVC trunking", "wall sleeve", "bracket luar", "flaring joint"] },
        { title: "Workflow commissioning", description: "Langkah start-up yang mengelak moisture dan udara dalam sistem.", terms: ["vacuum pump", "micron evacuation", "refrigerant release", "leak test", "balutan insulation"] },
        { title: "Elektrik dan posisi", description: "Entiti keselamatan dan penggunaan disemak di tapak.", terms: ["power point", "isolator", "clearance airflow dalaman", "clearance condenser luar", "vibration pad"] },
      ],
      validationPoints: ["Laluan paip disahkan sebelum drilling.", "Vacuum dibuat sebelum refrigerant dilepaskan.", "Drainage dan cooling diuji sebelum serahan."],
    },
    zh: {
      intro: "安装内容现在明确说明保护制冷表现和压缩机寿命的HVAC调试实体。",
      groups: [
        { title: "铜管与排水路线", description: "钻孔前规划的实体安装项目。", terms: ["铜管路线", "排水坡度", "PVC线槽", "墙套", "室外支架", "喇叭口接头"] },
        { title: "调试流程", description: "防止水分和空气污染系统的启动步骤。", terms: ["真空泵", "微米级抽空", "释放冷媒", "查漏", "保温包扎"] },
        { title: "电源与位置", description: "现场检查的安全和使用实体。", terms: ["电源点", "隔离开关", "室内出风距离", "室外冷凝器距离", "减震垫"] },
      ],
      validationPoints: ["钻孔前确认管路。", "释放冷媒前先抽真空。", "交工前测试排水和制冷。"],
    },
  },
  "basic-servicing": {
    en: {
      intro: "Routine servicing is mapped to preventive HVAC entities so users know what is checked before dirt becomes a breakdown.",
      groups: [
        { title: "Airflow maintenance", description: "Parts cleaned during routine care.", terms: ["return-air filter", "front evaporator face", "blower inlet", "louvre swing", "room temperature sensor"] },
        { title: "Drain and safety", description: "Preventive checks that catch early issues.", terms: ["condensate line", "drain flow", "electrical terminal", "remote setting", "fan speed response"] },
        { title: "Efficiency signals", description: "Signs monitored to protect electricity usage.", terms: ["airflow restriction", "temperature drop", "dust loading", "short cycling", "energy efficiency"] },
      ],
      validationPoints: ["Filters and accessible coil faces are cleaned.", "Drain flow is checked.", "Cooling response is tested before leaving."],
    },
    ms: {
      intro: "Servis rutin dipetakan kepada entiti HVAC pencegahan supaya pengguna tahu apa disemak sebelum kotoran menjadi kerosakan.",
      groups: [
        { title: "Maintenance airflow", description: "Bahagian yang dibersihkan semasa rutin.", terms: ["return-air filter", "muka evaporator depan", "inlet blower", "louvre swing", "sensor suhu bilik"] },
        { title: "Drain dan keselamatan", description: "Semakan pencegahan yang mengesan isu awal.", terms: ["condensate line", "aliran drain", "terminal elektrik", "setting remote", "respon fan speed"] },
        { title: "Signal kecekapan", description: "Tanda dipantau untuk menjaga penggunaan elektrik.", terms: ["airflow restriction", "temperature drop", "beban habuk", "short cycling", "kecekapan tenaga"] },
      ],
      validationPoints: ["Filter dan muka coil yang boleh dicapai dibersihkan.", "Aliran drain disemak.", "Respon cooling diuji sebelum keluar."],
    },
    zh: {
      intro: "例行保养按预防性HVAC实体整理，让用户知道污垢变成故障前会检查什么。",
      groups: [
        { title: "风量保养", description: "例行保养中清洁的部件。", terms: ["回风滤网", "前蒸发器表面", "风轮入口", "导风摆叶", "室温传感器"] },
        { title: "排水与安全", description: "发现早期问题的预防检查。", terms: ["冷凝水管", "排水流量", "电气端子", "遥控设置", "风速反应"] },
        { title: "效率信号", description: "用于保护电费表现的监测信号。", terms: ["风量受阻", "温差", "积尘负荷", "短循环", "能源效率"] },
      ],
      validationPoints: ["清洁滤网和可接触盘管表面。", "检查排水流量。", "离开前测试制冷反应。"],
    },
  },
  "ceiling-cassette": {
    en: {
      intro: "Ceiling cassette copy now includes commercial HVAC entities that matter for offices, shops and F&B premises.",
      groups: [
        { title: "Cassette components", description: "Commercial parts checked during service.", terms: ["4-way cassette panel", "cassette filter", "turbo fan", "drain pump", "float switch", "ceiling access panel"] },
        { title: "Commercial drainage", description: "Water-control entities that prevent ceiling stains.", terms: ["condensate lift", "drain riser", "pump discharge", "drain pan sludge", "ceiling drip mark"] },
        { title: "Comfort balancing", description: "Air distribution entities for workspaces.", terms: ["4-way throw", "airflow balance", "return-air path", "hot spot", "office zoning"] },
      ],
      validationPoints: ["Drain pump operation is verified.", "Panel and filters are reseated correctly.", "Air throw is checked before handover."],
    },
    ms: {
      intro: "Copy ceiling cassette kini memasukkan entiti HVAC komersial yang penting untuk pejabat, kedai dan premis F&B.",
      groups: [
        { title: "Komponen cassette", description: "Parts komersial disemak semasa servis.", terms: ["panel cassette 4-way", "filter cassette", "turbo fan", "pam drain", "float switch", "panel akses siling"] },
        { title: "Drainage komersial", description: "Entiti kawalan air yang mencegah kesan bocor siling.", terms: ["condensate lift", "drain riser", "pump discharge", "sludge drain pan", "tanda titisan siling"] },
        { title: "Imbangan keselesaan", description: "Entiti edaran udara untuk ruang kerja.", terms: ["tiupan 4-way", "airflow balance", "laluan return-air", "hot spot", "zoning pejabat"] },
      ],
      validationPoints: ["Operasi pam drain disahkan.", "Panel dan filter dipasang semula dengan betul.", "Tiupan udara disemak sebelum serahan."],
    },
    zh: {
      intro: "天花板卡式机内容加入办公室、店铺和餐饮场所重要的商业HVAC实体。",
      groups: [
        { title: "卡式机部件", description: "服务时检查的商业部件。", terms: ["四向卡式面板", "卡式滤网", "涡轮风扇", "排水泵", "浮球开关", "天花板检修口"] },
        { title: "商业排水", description: "防止天花板水迹的控水实体。", terms: ["冷凝水提升", "排水立管", "泵出水口", "排水盘污泥", "天花板滴水痕"] },
        { title: "舒适度平衡", description: "工作空间空气分布实体。", terms: ["四向送风", "风量平衡", "回风路径", "热区", "办公室分区"] },
      ],
      validationPoints: ["确认排水泵运作。", "面板和滤网正确复位。", "交工前检查送风范围。"],
    },
  },
  "dismantling-relocation": {
    en: {
      intro: "Relocation copy now names the refrigerant, pipe and recommissioning entities needed to move a unit safely.",
      groups: [
        { title: "Safe removal", description: "Entities involved before the unit is disconnected.", terms: ["refrigerant pump-down", "service valve closure", "indoor bracket", "outdoor condenser", "pipe sealing"] },
        { title: "Transport and reuse", description: "What is inspected before reinstalling old equipment.", terms: ["copper compatibility", "insulation condition", "flare nut", "drain hose reuse", "mounting hardware"] },
        { title: "Reinstallation checks", description: "Commissioning entities at the new site.", terms: ["vacuum cycle", "leak test", "new copper run", "drain fall", "cooling test"] },
      ],
      validationPoints: ["Gas is pumped down where suitable.", "Reusable materials are inspected.", "Reinstalled units are vacuumed and tested."],
    },
    ms: {
      intro: "Copy relocation kini menyebut entiti refrigerant, paip dan recommissioning yang diperlukan untuk pindah unit dengan selamat.",
      groups: [
        { title: "Buka dengan selamat", description: "Entiti sebelum unit diputuskan sambungan.", terms: ["pump-down refrigerant", "tutup service valve", "bracket dalaman", "condenser luar", "seal paip"] },
        { title: "Transport dan guna semula", description: "Apa disemak sebelum pasang semula equipment lama.", terms: ["keserasian kuprum", "keadaan insulation", "flare nut", "guna semula hos drain", "hardware mounting"] },
        { title: "Semakan pasang semula", description: "Entiti commissioning di lokasi baharu.", terms: ["kitaran vacuum", "leak test", "laluan kuprum baharu", "kejatuhan drain", "ujian cooling"] },
      ],
      validationPoints: ["Gas dipump-down jika sesuai.", "Material boleh guna semula diperiksa.", "Unit dipasang semula divacuum dan diuji."],
    },
    zh: {
      intro: "搬迁内容现在明确安全移机所需的冷媒、管路和重新调试实体。",
      groups: [
        { title: "安全拆除", description: "断开机器前涉及的实体。", terms: ["冷媒回收", "关闭维修阀", "室内支架", "室外冷凝器", "封管"] },
        { title: "运输与复用", description: "重新安装旧设备前检查的项目。", terms: ["铜管兼容性", "保温状态", "喇叭螺母", "排水管复用", "安装五金"] },
        { title: "重新安装检查", description: "新地点的调试实体。", terms: ["抽真空循环", "查漏", "新铜管路线", "排水坡度", "制冷测试"] },
      ],
      validationPoints: ["适合时先回收冷媒。", "检查可复用材料。", "重新安装后抽真空并测试。"],
    },
  },
  emergency: {
    en: {
      intro: "Emergency repair content is mapped to safety and failure entities so urgent users know what we triage first.",
      groups: [
        { title: "Safety signals", description: "Issues prioritized before normal troubleshooting.", terms: ["burning smell", "MCB tripping", "water near electrical point", "short circuit risk", "live location"] },
        { title: "Critical failures", description: "Entities checked when cooling stops suddenly.", terms: ["compressor lockout", "capacitor failure", "PCB fault", "outdoor fan failure", "refrigerant leak"] },
        { title: "Triage workflow", description: "What helps us decide the fastest response.", terms: ["symptom video", "error light pattern", "unit count", "server room", "infant or elderly room"] },
      ],
      validationPoints: ["Safety risk is triaged first.", "Diagnostic fee is confirmed before dispatch.", "Temporary safety steps are explained if parts are needed."],
    },
    ms: {
      intro: "Kandungan emergency repair dipetakan kepada entiti keselamatan dan kegagalan supaya pengguna urgent tahu apa ditriage dahulu.",
      groups: [
        { title: "Signal keselamatan", description: "Isu diutamakan sebelum troubleshooting biasa.", terms: ["bau terbakar", "MCB trip", "air dekat point elektrik", "risiko short circuit", "lokasi live"] },
        { title: "Kegagalan kritikal", description: "Entiti disemak apabila cooling berhenti tiba-tiba.", terms: ["compressor lockout", "kapasitor rosak", "PCB fault", "kipas luar gagal", "refrigerant leak"] },
        { title: "Workflow triage", description: "Apa yang membantu kami tentukan respon terpantas.", terms: ["video simptom", "corak lampu error", "bilangan unit", "bilik server", "bilik bayi atau warga emas"] },
      ],
      validationPoints: ["Risiko keselamatan ditriage dahulu.", "Caj diagnostik disahkan sebelum dispatch.", "Langkah keselamatan sementara dijelaskan jika parts diperlukan."],
    },
    zh: {
      intro: "紧急维修内容按安全和故障实体整理，让紧急用户知道我们会先判断什么。",
      groups: [
        { title: "安全信号", description: "普通排查前优先处理的问题。", terms: ["烧焦味", "MCB跳闸", "电源点附近有水", "短路风险", "实时位置"] },
        { title: "关键故障", description: "制冷突然停止时检查的实体。", terms: ["压缩机锁定", "电容故障", "PCB故障", "室外风扇故障", "冷媒泄漏"] },
        { title: "判断流程", description: "帮助我们决定最快响应的信息。", terms: ["症状视频", "故障灯模式", "机器数量", "服务器房", "婴儿或老人房"] },
      ],
      validationPoints: ["先判断安全风险。", "派工前确认诊断费。", "如需零件，会说明临时安全措施。"],
    },
  },
};

const TEXT = {
  en: {
    eyebrow: "Parts and on-site checks",
    heading: (title: string) => `${title}: aircond parts we check and explain`,
    validationTitle: "How we confirm the issue on-site",
    note: "We only list the parts, tools and checks that are relevant to this service, so you know what the technician will look at.",
  },
  ms: {
    eyebrow: "Parts and on-site checks",
    heading: (title: string) => `${title}: komponen aircond yang kami semak dan jelaskan`,
    validationTitle: "Cara kami sahkan isu di tapak",
    note: "Kami hanya menyenaraikan komponen, alat dan semakan yang relevan dengan servis ini supaya anda tahu apa yang juruteknik akan periksa.",
  },
  zh: {
    eyebrow: "冷气部件与现场检查",
    heading: (title: string) => `${title}：我们检查并说明的冷气部件`,
    validationTitle: "现场如何确认问题",
    note: "我们只列出与此服务相关的部件、工具和检查项目，让您清楚技师会检查什么。",
  },
} as const;

export function buildServiceHVACEntityModule(
  slug: string,
  locale: ServiceHVACEntityLocale,
  title: string
): ServiceHVACEntityModule {
  const serviceCopy = ENTITY_COPY[slug]?.[locale] ?? ENTITY_COPY["basic-servicing"][locale];
  const t = TEXT[locale];

  return {
    taskId: "8.7",
    eyebrow: t.eyebrow,
    heading: t.heading(title),
    intro: serviceCopy.intro,
    groups: serviceCopy.groups,
    validationTitle: t.validationTitle,
    validationPoints: serviceCopy.validationPoints,
    note: t.note,
  };
}
