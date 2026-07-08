export type ServiceVisualSXOLocale = "en" | "ms" | "zh";

export type ServiceDecisionPath = {
  trigger: string;
  action: string;
  outcome: string;
};

export type ServiceComparisonRow = {
  criterion: string;
  thisService: string;
  compareOption: string;
  decision: string;
};

export type ServiceVisualSXOModule = {
  taskId: "8.9";
  eyebrow: string;
  heading: string;
  intro: string;
  decisionTitle: string;
  comparisonTitle: string;
  compareAgainstLabel: string;
  decisionPaths: ServiceDecisionPath[];
  comparisonRows: ServiceComparisonRow[];
  note: string;
};

type VisualCopy = {
  fit: string;
  lighter: string;
  escalate: string;
  bestScope: string;
  compareOption: string;
  compareScope: string;
  notEnough: string;
  bookingDecision: string;
};

const VISUAL_COPY: Record<string, Record<ServiceVisualSXOLocale, VisualCopy>> = {
  "chemical-wash": {
    en: {
      fit: "Weak airflow, mouldy smell or dirty indoor coil, but no repeated leaking or ice.",
      lighter: "Only light dust, washable filters and routine 3–6 month maintenance are needed.",
      escalate: "Water leaking returns, ice forms, or the blower/back tray is heavily blocked.",
      bestScope: "On-wall 80–120 PSI chemical cleaning for coil, blower face and drain tray.",
      compareOption: "Basic Servicing / Chemical Overhaul",
      compareScope: "Basic service is lighter; chemical overhaul is a full dismantle deep-clean.",
      notEnough: "Not enough when hidden drain tray sludge or cracked parts require dismantling.",
      bookingDecision: "Book chemical wash when the unit still runs but airflow and hygiene have dropped.",
    },
    ms: {
      fit: "Airflow lemah, bau hapak atau coil dalaman kotor, tetapi tiada bocor berulang atau ais.",
      lighter: "Hanya habuk ringan, filter boleh dibasuh dan maintenance rutin 3–6 bulan diperlukan.",
      escalate: "Air bocor kembali, coil berais atau blower/back tray tersumbat berat.",
      bestScope: "Cuci kimia on-wall 80–120 PSI untuk coil, muka blower dan tray drain.",
      compareOption: "Servis Asas / Chemical Overhaul",
      compareScope: "Servis asas lebih ringan; chemical overhaul ialah deep-clean buka penuh.",
      notEnough: "Tidak cukup jika sludge drain tray tersembunyi atau parts retak perlu dibuka.",
      bookingDecision: "Tempah cuci kimia apabila unit masih berjalan tetapi airflow dan kebersihan menurun.",
    },
    zh: {
      fit: "风量弱、有霉味或室内盘管肮脏，但没有反复漏水或结冰。",
      lighter: "只有轻微灰尘、滤网可清洗，并需要3–6个月例行保养。",
      escalate: "漏水复发、盘管结冰，或风轮/后托盘严重堵塞。",
      bestScope: "挂墙80–120 PSI化学清洗，处理盘管、风轮表面和排水盘。",
      compareOption: "基础保养 / 化学大修",
      compareScope: "基础保养较轻；化学大修是完整拆机深层清洗。",
      notEnough: "若隐藏排水盘污泥或部件裂开需要拆机，则不够。",
      bookingDecision: "机器仍可运行但风量和卫生下降时，预约化学清洗。",
    },
  },
  "chemical-overhaul": {
    en: {
      fit: "Persistent water leaking, ice formation, severe sludge or years without deep cleaning.",
      lighter: "Symptoms are mild and the unit only needs on-wall coil and drain cleaning.",
      escalate: "A cracked drain pan, compressor fault or PCB problem appears during diagnosis.",
      bestScope: "Full dismantle cleaning of coil, blower wheel, drain pan, back tray and housing.",
      compareOption: "Chemical Wash / Repair",
      compareScope: "Chemical wash stays mounted; repair is for failed parts after diagnosis.",
      notEnough: "Not enough when the issue is electrical, compressor-related or caused by broken parts.",
      bookingDecision: "Book overhaul when cleaning must reach hidden internal parts to stop leak or ice issues.",
    },
    ms: {
      fit: "Bocor air berulang, ais pada coil, sludge berat atau bertahun-tahun tidak deep clean.",
      lighter: "Simptom ringan dan unit hanya perlu cuci coil serta drain secara on-wall.",
      escalate: "Drain pan retak, compressor fault atau masalah PCB ditemui semasa diagnosis.",
      bestScope: "Cuci buka penuh untuk coil, blower wheel, drain pan, back tray dan housing.",
      compareOption: "Cuci Kimia / Repair",
      compareScope: "Cuci kimia kekal terpasang; repair untuk parts rosak selepas diagnosis.",
      notEnough: "Tidak cukup jika masalah elektrik, compressor atau parts patah/rosak.",
      bookingDecision: "Tempah overhaul bila cucian perlu sampai ke bahagian dalaman tersembunyi untuk hentikan bocor atau ais.",
    },
    zh: {
      fit: "反复漏水、盘管结冰、严重污泥或多年未深层清洗。",
      lighter: "症状轻微，只需挂墙清洗盘管和排水。",
      escalate: "诊断中发现排水盘裂、压缩机故障或PCB问题。",
      bestScope: "完整拆洗盘管、风轮、排水盘、后托盘和外壳。",
      compareOption: "化学清洗 / 维修",
      compareScope: "化学清洗保持挂墙；维修用于诊断后的零件故障。",
      notEnough: "若是电气、压缩机或破损零件导致，则不够。",
      bookingDecision: "需要清到隐藏内部部件以解决漏水或结冰时，预约化学大修。",
    },
  },
  "gas-topup": {
    en: {
      fit: "Cooling is weak after pressure diagnosis confirms low refrigerant.",
      lighter: "Airflow is blocked by dirt but pressure is normal.",
      escalate: "Pressure drops again or leak signs appear at copper, coil or flare joints.",
      bestScope: "R32, R410A or R22 refrigerant balancing with manifold pressure checks.",
      compareOption: "Chemical Wash / Leak Repair",
      compareScope: "Chemical wash fixes airflow; leak repair fixes refrigerant loss.",
      notEnough: "Not enough when refrigerant is escaping through a leak.",
      bookingDecision: "Book gas top-up only after pressure readings show the unit is genuinely undercharged.",
    },
    ms: {
      fit: "Cooling lemah selepas diagnosis tekanan mengesahkan refrigerant rendah.",
      lighter: "Airflow tersumbat oleh kotoran tetapi tekanan normal.",
      escalate: "Tekanan turun semula atau tanda bocor muncul pada kuprum, coil atau flare joint.",
      bestScope: "Balancing refrigerant R32, R410A atau R22 dengan bacaan manifold gauge.",
      compareOption: "Cuci Kimia / Repair Bocor",
      compareScope: "Cuci kimia baiki airflow; repair bocor baiki kehilangan refrigerant.",
      notEnough: "Tidak cukup jika refrigerant keluar melalui kebocoran.",
      bookingDecision: "Tempah top-up gas hanya selepas bacaan tekanan menunjukkan unit benar-benar kurang gas.",
    },
    zh: {
      fit: "压力诊断确认冷媒不足后制冷弱。",
      lighter: "风量因污垢堵塞，但压力正常。",
      escalate: "压力再次下降，或铜管、盘管、喇叭口出现漏气迹象。",
      bestScope: "使用歧管压力表平衡R32、R410A或R22冷媒。",
      compareOption: "化学清洗 / 查漏维修",
      compareScope: "化学清洗解决风量；查漏维修解决冷媒流失。",
      notEnough: "若冷媒通过漏点流失，则不够。",
      bookingDecision: "只有压力读数显示确实缺冷媒时才预约补气。",
    },
  },
  repair: {
    en: {
      fit: "Blinking light, tripping, noisy fan, PCB, capacitor or compressor symptoms.",
      lighter: "The unit is dirty but still runs normally without fault codes or electrical symptoms.",
      escalate: "Repair cost is too close to replacement value or compressor is end-of-life.",
      bestScope: "Diagnostic-led part testing before replacing capacitor, motor, sensor, PCB or wiring.",
      compareOption: "Basic Service / New Installation",
      compareScope: "Basic service is preventive; installation is better when the unit is beyond economical repair.",
      notEnough: "Not enough when the problem is only dirt, smell or routine maintenance.",
      bookingDecision: "Book repair when a real mechanical or electrical fault must be isolated first.",
    },
    ms: {
      fit: "Lampu blinking, trip, kipas berbunyi, PCB, kapasitor atau simptom compressor.",
      lighter: "Unit kotor tetapi masih berjalan normal tanpa kod error atau simptom elektrik.",
      escalate: "Kos repair terlalu hampir dengan nilai ganti atau compressor sudah hujung hayat.",
      bestScope: "Diagnosis parts sebelum ganti kapasitor, motor, sensor, PCB atau wiring.",
      compareOption: "Servis Asas / Pemasangan Baru",
      compareScope: "Servis asas untuk pencegahan; pemasangan lebih baik jika unit tidak ekonomik dibaiki.",
      notEnough: "Tidak sesuai jika masalah hanya kotoran, bau atau maintenance rutin.",
      bookingDecision: "Tempah repair apabila fault mekanikal atau elektrik sebenar perlu diasingkan dahulu.",
    },
    zh: {
      fit: "闪灯、跳电、风扇噪音、PCB、电容或压缩机症状。",
      lighter: "机器只是脏，但无故障码或电气症状，仍正常运行。",
      escalate: "维修费用接近更换价值，或压缩机已接近寿命终点。",
      bestScope: "更换电容、马达、传感器、PCB或电线前先做诊断测试。",
      compareOption: "基础保养 / 新机安装",
      compareScope: "基础保养用于预防；若已不值得维修，则安装更合适。",
      notEnough: "如果只是灰尘、异味或例行保养，则不适合。",
      bookingDecision: "出现真正机械或电气故障，需要先隔离原因时预约维修。",
    },
  },
  installation: {
    en: {
      fit: "New unit setup, old unit replacement, renovation or first-time aircond point.",
      lighter: "Existing unit is repairable and the room does not need a new system.",
      escalate: "Concealed piping, new power point, long copper run or difficult high-rise access is required.",
      bestScope: "Mounting, copper/drain routing, vacuuming, commissioning and cooling test.",
      compareOption: "Repair / Full Piping Package",
      compareScope: "Repair keeps an existing unit; full package covers longer materials and complex routes.",
      notEnough: "Not enough when building work, electrical upgrades or concealed routing are needed.",
      bookingDecision: "Book installation when a new or replacement split unit must be commissioned correctly.",
    },
    ms: {
      fit: "Pasang unit baharu, ganti unit lama, renovation atau point aircond pertama.",
      lighter: "Unit sedia ada masih boleh dibaiki dan bilik tidak perlukan sistem baharu.",
      escalate: "Perlu piping tersembunyi, power point baru, laluan kuprum panjang atau akses high-rise sukar.",
      bestScope: "Mounting, laluan kuprum/drain, vacuum, commissioning dan ujian cooling.",
      compareOption: "Repair / Pakej Piping Penuh",
      compareScope: "Repair kekalkan unit sedia ada; pakej penuh meliputi material panjang dan laluan kompleks.",
      notEnough: "Tidak cukup jika kerja bangunan, naik taraf elektrik atau routing tersembunyi diperlukan.",
      bookingDecision: "Tempah pemasangan bila split unit baharu atau ganti perlu commissioning dengan betul.",
    },
    zh: {
      fit: "新机安装、更换旧机、装修或首次安装冷气点。",
      lighter: "现有机器可维修，房间不需要新系统。",
      escalate: "需要隐藏管路、新电源点、长铜管路线或高楼困难通行。",
      bestScope: "挂装、铜管/排水路线、抽真空、调试和制冷测试。",
      compareOption: "维修 / 完整管路套餐",
      compareScope: "维修保留现有机器；完整套餐处理较长材料和复杂路线。",
      notEnough: "若需要建筑、电气升级或隐藏走线，则基础安装不够。",
      bookingDecision: "新机或替换机需要正确调试时预约安装。",
    },
  },
  "basic-servicing": {
    en: {
      fit: "Routine maintenance, light dust, normal cooling and preventive care.",
      lighter: "Filters were recently cleaned and the unit is rarely used.",
      escalate: "Smell, weak airflow, leaking or thick coil dirt is already present.",
      bestScope: "Filter cleaning, accessible coil check, drain check and operating test.",
      compareOption: "Chemical Wash / Repair",
      compareScope: "Chemical wash is deeper; repair is for actual part failure.",
      notEnough: "Not enough for heavy biofilm, persistent leak or electrical faults.",
      bookingDecision: "Book basic service as the lowest-cost preventive maintenance before problems start.",
    },
    ms: {
      fit: "Maintenance rutin, habuk ringan, cooling normal dan penjagaan pencegahan.",
      lighter: "Filter baru dibersihkan dan unit jarang digunakan.",
      escalate: "Bau, airflow lemah, bocor atau coil sudah tebal kotor.",
      bestScope: "Cuci filter, semak coil yang boleh dicapai, semak drain dan ujian operasi.",
      compareOption: "Cuci Kimia / Repair",
      compareScope: "Cuci kimia lebih mendalam; repair untuk kerosakan parts sebenar.",
      notEnough: "Tidak cukup untuk biofilm berat, bocor berulang atau masalah elektrik.",
      bookingDecision: "Tempah servis asas sebagai maintenance pencegahan paling jimat sebelum masalah bermula.",
    },
    zh: {
      fit: "例行保养、轻微灰尘、制冷正常和预防性维护。",
      lighter: "滤网刚清洗，机器很少使用。",
      escalate: "已经有异味、风量弱、漏水或盘管厚污。",
      bestScope: "清洗滤网、检查可接触盘管、检查排水和运行测试。",
      compareOption: "化学清洗 / 维修",
      compareScope: "化学清洗更深；维修用于实际零件故障。",
      notEnough: "对于严重生物膜、反复漏水或电气故障不够。",
      bookingDecision: "在问题出现前，以最低成本预约基础保养做预防。",
    },
  },
  "ceiling-cassette": {
    en: {
      fit: "Office, retail, F&B or commercial ceiling cassette units need service.",
      lighter: "The unit is a normal wall-mounted split system.",
      escalate: "Many commercial units need scheduled AMC or after-hours coordination.",
      bestScope: "Cassette panel, filters, drain pump, float switch and 4-way airflow check.",
      compareOption: "Wall Unit Service / Maintenance Contract",
      compareScope: "Wall service is for split units; AMC is better for multiple recurring commercial units.",
      notEnough: "Not enough when the business needs scheduled reporting or many units maintained together.",
      bookingDecision: "Book ceiling cassette service when ceiling access, drain pump and 4-way air throw must be handled properly.",
    },
    ms: {
      fit: "Unit ceiling cassette pejabat, retail, F&B atau komersial perlukan servis.",
      lighter: "Unit ialah split wall-mounted biasa.",
      escalate: "Banyak unit komersial perlukan AMC berjadual atau koordinasi selepas waktu kerja.",
      bestScope: "Semak panel cassette, filter, pam drain, float switch dan airflow 4-way.",
      compareOption: "Servis Unit Dinding / Kontrak Maintenance",
      compareScope: "Servis dinding untuk split unit; AMC lebih baik untuk banyak unit komersial berulang.",
      notEnough: "Tidak cukup jika bisnes perlukan laporan berjadual atau banyak unit dijaga bersama.",
      bookingDecision: "Tempah servis cassette bila akses siling, pam drain dan tiupan 4-way perlu dikendalikan betul.",
    },
    zh: {
      fit: "办公室、零售、餐饮或商业天花板卡式机需要服务。",
      lighter: "机器是普通挂壁式分体机。",
      escalate: "多台商业机需要定期AMC或下班后协调。",
      bestScope: "检查卡式面板、滤网、排水泵、浮球开关和四向送风。",
      compareOption: "挂壁机服务 / 保养合约",
      compareScope: "挂壁机服务适合分体机；多台商业机更适合AMC。",
      notEnough: "若企业需要定期报告或多台机共同维护，则不够。",
      bookingDecision: "需要正确处理天花板通行、排水泵和四向送风时预约卡式机服务。",
    },
  },
  "dismantling-relocation": {
    en: {
      fit: "Moving house, shop shifting, office relocation or safe unit removal is needed.",
      lighter: "Only a new installation is needed and no old unit must be removed.",
      escalate: "Old copper is unsafe, gas type is incompatible or the unit is not worth reinstalling.",
      bestScope: "Pump-down, safe disconnection, sealing, transport planning and reinstall checks.",
      compareOption: "Installation / Dismantle Only",
      compareScope: "Installation focuses on new setup; dismantle only excludes recommissioning.",
      notEnough: "Not enough if the old system should be replaced instead of relocated.",
      bookingDecision: "Book relocation when preserving the unit and moving it safely is the main goal.",
    },
    ms: {
      fit: "Pindah rumah, pindah kedai, relocation pejabat atau buka unit dengan selamat diperlukan.",
      lighter: "Hanya perlu pemasangan baharu dan tiada unit lama perlu dibuka.",
      escalate: "Paip lama tidak selamat, jenis gas tidak serasi atau unit tidak berbaloi dipasang semula.",
      bestScope: "Pump-down, putus sambungan selamat, seal, rancang transport dan semakan reinstall.",
      compareOption: "Pemasangan / Buka Sahaja",
      compareScope: "Pemasangan fokus setup baharu; buka sahaja tidak termasuk recommissioning.",
      notEnough: "Tidak cukup jika sistem lama patut diganti, bukan dipindahkan.",
      bookingDecision: "Tempah relocation apabila matlamat utama ialah simpan unit dan pindah dengan selamat.",
    },
    zh: {
      fit: "搬家、店铺迁移、办公室搬迁或需要安全拆除机器。",
      lighter: "只需要新安装，没有旧机需要拆除。",
      escalate: "旧铜管不安全、冷媒类型不兼容，或机器不值得重装。",
      bestScope: "回收冷媒、安全断开、封管、运输规划和重装检查。",
      compareOption: "安装 / 仅拆除",
      compareScope: "安装重点是新设置；仅拆除不包括重新调试。",
      notEnough: "若旧系统应更换而不是搬迁，则不够。",
      bookingDecision: "主要目标是保留机器并安全搬迁时预约移机。",
    },
  },
  emergency: {
    en: {
      fit: "Total breakdown, heavy leaking, tripping, burning smell or commercial no-cooling.",
      lighter: "The issue is non-urgent and can wait for standard repair or normal servicing.",
      escalate: "Water is near electrical points or there is burning smell; switch off power and WhatsApp immediately.",
      bestScope: "Fast safety triage, diagnostic visit, quote-before-parts and same-day repair where possible.",
      compareOption: "Standard Repair / Safety Shutdown",
      compareScope: "Standard repair is for non-urgent faults; shutdown is required when safety risk is present.",
      notEnough: "Not enough if the site is unsafe to operate before a technician arrives.",
      bookingDecision: "Book emergency service when safety, business operation or vulnerable occupants are affected.",
    },
    ms: {
      fit: "Rosak total, bocor teruk, trip, bau terbakar atau premis komersial tiada cooling.",
      lighter: "Isu tidak urgent dan boleh tunggu repair standard atau servis biasa.",
      escalate: "Air dekat point elektrik atau ada bau terbakar; matikan kuasa dan WhatsApp segera.",
      bestScope: "Triage keselamatan pantas, lawatan diagnosis, harga sebelum parts dan repair hari sama jika boleh.",
      compareOption: "Repair Standard / Tutup Kuasa Keselamatan",
      compareScope: "Repair standard untuk fault tidak urgent; shutdown perlu jika ada risiko keselamatan.",
      notEnough: "Tidak cukup jika tapak tidak selamat digunakan sebelum juruteknik tiba.",
      bookingDecision: "Tempah emergency apabila keselamatan, operasi bisnes atau penghuni rentan terjejas.",
    },
    zh: {
      fit: "完全故障、严重漏水、跳电、烧焦味或商业空间无制冷。",
      lighter: "问题不紧急，可等标准维修或普通保养。",
      escalate: "水靠近电源点或有烧焦味；请关电并立即WhatsApp。",
      bestScope: "快速安全判断、诊断上门、换件前报价，并尽量当天维修。",
      compareOption: "标准维修 / 安全断电",
      compareScope: "标准维修适合非紧急故障；有安全风险时必须先断电。",
      notEnough: "若技师到达前现场不安全，则普通处理不够。",
      bookingDecision: "安全、商业运作或老人小孩受影响时预约紧急服务。",
    },
  },
};

const TEXT = {
  en: {
    eyebrow: "8.9 Visual & SXO Polish",
    heading: (title: string) => `${title}: decision tree and comparison table`,
    intro: (title: string) => `Use this visual guide to decide whether ${title} is the right service, whether a lighter option is enough, or whether the job should be escalated before booking.`,
    decisionTitle: "Fast decision tree",
    comparisonTitle: "Service comparison table",
    compareAgainstLabel: "Compare against",
    note: "This visual SXO block supports faster decision-making without replacing technician diagnosis or quote confirmation.",
    triggers: ["Choose this service if", "Consider a lighter option if", "Escalate first if"],
    outcomes: ["Recommended path", "Lower-scope path", "Escalation path"],
    criteria: ["Best scope", "Compare scope", "When this is not enough", "Booking decision"],
  },
  ms: {
    eyebrow: "8.9 Visual & SXO Polish",
    heading: (title: string) => `${title}: decision tree dan jadual perbandingan`,
    intro: (title: string) => `Gunakan panduan visual ini untuk tentukan sama ada ${title} ialah servis yang tepat, pilihan lebih ringan sudah mencukupi, atau kerja perlu dinaikkan skop sebelum tempahan.`,
    decisionTitle: "Decision tree pantas",
    comparisonTitle: "Jadual perbandingan servis",
    compareAgainstLabel: "Bandingkan dengan",
    note: "Blok visual SXO ini membantu keputusan lebih cepat tanpa menggantikan diagnosis juruteknik atau pengesahan harga.",
    triggers: ["Pilih servis ini jika", "Pertimbangkan pilihan ringan jika", "Naikkan skop dahulu jika"],
    outcomes: ["Laluan disyorkan", "Laluan skop ringan", "Laluan escalation"],
    criteria: ["Skop terbaik", "Skop perbandingan", "Bila ini tidak cukup", "Keputusan tempahan"],
  },
  zh: {
    eyebrow: "8.9 视觉与SXO优化",
    heading: (title: string) => `${title}：决策树与对比表`,
    intro: (title: string) => `使用此视觉指南判断${title}是否合适，是否较轻服务已足够，或预约前是否应先升级处理范围。`,
    decisionTitle: "快速决策树",
    comparisonTitle: "服务对比表",
    compareAgainstLabel: "对比服务",
    note: "此视觉SXO区块帮助用户更快决策，但不取代技师现场诊断或报价确认。",
    triggers: ["选择此服务，如果", "考虑较轻选择，如果", "先升级处理，如果"],
    outcomes: ["推荐路径", "低范围路径", "升级路径"],
    criteria: ["最佳范围", "对比范围", "何时不够", "预约决策"],
  },
} as const;

export function buildServiceVisualSXOModule(
  slug: string,
  locale: ServiceVisualSXOLocale,
  title: string
): ServiceVisualSXOModule {
  const copy = VISUAL_COPY[slug]?.[locale] ?? VISUAL_COPY["basic-servicing"][locale];
  const t = TEXT[locale];

  return {
    taskId: "8.9",
    eyebrow: t.eyebrow,
    heading: t.heading(title),
    intro: t.intro(title),
    decisionTitle: t.decisionTitle,
    comparisonTitle: t.comparisonTitle,
    compareAgainstLabel: t.compareAgainstLabel,
    decisionPaths: [
      { trigger: `${t.triggers[0]} ${copy.fit}`, action: title, outcome: t.outcomes[0] },
      { trigger: `${t.triggers[1]} ${copy.lighter}`, action: copy.compareOption, outcome: t.outcomes[1] },
      { trigger: `${t.triggers[2]} ${copy.escalate}`, action: copy.compareOption, outcome: t.outcomes[2] },
    ],
    comparisonRows: [
      { criterion: t.criteria[0], thisService: copy.bestScope, compareOption: copy.compareOption, decision: copy.bookingDecision },
      { criterion: t.criteria[1], thisService: title, compareOption: copy.compareScope, decision: copy.bookingDecision },
      { criterion: t.criteria[2], thisService: copy.notEnough, compareOption: copy.compareOption, decision: copy.escalate },
      { criterion: t.criteria[3], thisService: copy.bookingDecision, compareOption: copy.compareOption, decision: copy.fit },
    ],
    note: t.note,
  };
}
