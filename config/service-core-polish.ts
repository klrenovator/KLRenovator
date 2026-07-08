export type ServiceCorePolishLocale = "en" | "ms" | "zh";

export type ServiceCorePolishStep = {
  title: string;
  detail: string;
};

export type ServiceCorePolishModule = {
  taskId: "8.1";
  eyebrow: string;
  heading: string;
  intro: string;
  quickFitTitle: string;
  quickFit: string[];
  stepsTitle: string;
  steps: ServiceCorePolishStep[];
  handoverTitle: string;
  handover: string;
  priceBadge: string;
  warrantyBadge: string;
};

type CoreCopy = {
  fit: string[];
  before: string;
  inspect: string;
  execute: string;
  test: string;
  handover: string;
};

export const CORE_SERVICE_POLISH_SLUGS = [
  "chemical-wash",
  "chemical-overhaul",
  "gas-topup",
  "repair",
  "installation",
  "basic-servicing",
  "ceiling-cassette",
  "dismantling-relocation",
  "emergency",
] as const;

const CORE_COPY: Record<string, Record<ServiceCorePolishLocale, CoreCopy>> = {
  "chemical-wash": {
    en: {
      fit: ["Ready-to-book deep cleaning", "Mounted wall unit stays in place", "Best for airflow restoration and hygienic coil cleaning"],
      before: "Tell us the horsepower, wall-unit location, last wash date and whether parking or condo access approval is needed.",
      inspect: "Technician checks airflow, drain condition, coil dirt level and safe canvas placement before mixing chemical solution.",
      execute: "Food-safe chemical is applied at 80–120 PSI, then the coil, blower face and drain tray are rinsed through a protected wash bag.",
      test: "Cooling temperature drop, airflow strength and drain flow are tested for at least 15 minutes before handover.",
      handover: "You receive a clear before/after explanation, warranty reminder and the next recommended maintenance date.",
    },
    ms: {
      fit: ["Deep cleaning yang sedia ditempah", "Unit dinding kekal di tempat asal", "Sesuai untuk pulihkan airflow dan kebersihan coil"],
      before: "Beritahu HP unit, lokasi unit dinding, tarikh cuci terakhir dan sama ada perlu approval parkir atau pengurusan kondo.",
      inspect: "Juruteknik semak airflow, keadaan drain, tahap kotoran coil dan posisi canvas sebelum bancuh chemical.",
      execute: "Chemical selamat digunakan pada tekanan 80–120 PSI, kemudian coil, muka blower dan tray drain dibilas melalui beg perlindungan.",
      test: "Suhu keluar, kekuatan airflow dan aliran drain diuji sekurang-kurangnya 15 minit sebelum serahan.",
      handover: "Anda terima penerangan sebelum/selepas, peringatan waranti dan cadangan tarikh maintenance seterusnya.",
    },
    zh: {
      fit: ["适合直接预约的深层清洗", "挂壁机无需拆离墙面", "适合恢复风量和盘管卫生"],
      before: "请告知匹数、室内机位置、上次清洗日期，以及是否需要停车或公寓管理批准。",
      inspect: "技师先检查风量、排水状况、盘管污垢程度和防水布位置，再调配药水。",
      execute: "使用安全清洁药水，以80–120 PSI清洗，并通过保护清洗袋冲洗盘管、风轮表面和排水盘。",
      test: "交工前至少测试15分钟，确认出风温差、风量和排水流畅。",
      handover: "您会收到施工前后说明、保修提醒和下一次建议保养日期。",
    },
  },
  "chemical-overhaul": {
    en: {
      fit: ["Full dismantle deep-clean", "Best for repeated leaking or ice formation", "Useful when a normal chemical wash is no longer enough"],
      before: "Send photos of leaking marks, ice formation, unit age and the exact indoor/outdoor access points.",
      inspect: "Technician verifies whether the drain pan, blower wheel, back tray and coil need full removal before quoting final scope.",
      execute: "Indoor unit is safely dismantled, components are soaked/scrubbed individually, then reassembled with careful electrical protection.",
      test: "Drain path, cooling drop, refrigerant connection and vibration/noise are checked after reinstallation.",
      handover: "We explain whether the root cause was drain blockage, heavy biofilm, cracked tray, low gas or an ageing component.",
    },
    ms: {
      fit: ["Deep-clean dengan dismantle penuh", "Sesuai untuk bocor berulang atau ais pada coil", "Pilihan apabila cuci kimia biasa tidak mencukupi"],
      before: "Hantar foto kesan bocor, ais, usia unit dan akses tepat unit dalam/luar.",
      inspect: "Juruteknik sahkan sama ada drain pan, blower wheel, back tray dan coil perlu dibuka penuh sebelum skop akhir disahkan.",
      execute: "Unit dalaman dibuka dengan selamat, komponen direndam/digosok satu per satu, kemudian dipasang semula dengan perlindungan elektrik.",
      test: "Laluan drain, suhu cooling, sambungan refrigerant dan bunyi/getaran diuji selepas pemasangan semula.",
      handover: "Kami terangkan punca sebenar sama ada drain tersumbat, biofilm berat, tray retak, gas rendah atau komponen lama.",
    },
    zh: {
      fit: ["完整拆机深层清洗", "适合反复漏水或结冰", "普通化学清洗已不足时使用"],
      before: "请发送漏水痕迹、结冰情况、机器年龄，以及室内/室外机准确通行位置。",
      inspect: "技师会确认排水盘、风轮、后托盘和盘管是否需要完整拆卸，再确认最终施工范围。",
      execute: "安全拆下室内机，逐件浸泡和刷洗部件，再在保护电气部分后重新组装。",
      test: "重新安装后测试排水路线、制冷温差、冷媒连接和震动/噪音。",
      handover: "我们会说明根本原因是排水堵塞、严重生物膜、托盘裂、冷媒不足还是部件老化。",
    },
  },
  "gas-topup": {
    en: {
      fit: ["Low-cooling diagnosis", "R32 / R410A / R22 supported", "Best when pressure testing comes before refilling"],
      before: "Send a photo of the outdoor unit label and explain whether cooling dropped suddenly or gradually.",
      inspect: "Technician identifies refrigerant type, connects gauges and checks whether low pressure points to a possible leak.",
      execute: "Gas is topped up only after pressure reading, leak risk explanation and customer approval.",
      test: "We verify running pressure, cooling temperature and compressor stability after balancing.",
      handover: "You receive advice on whether a leak check, chemical wash or repair should be done before any future top-up.",
    },
    ms: {
      fit: ["Diagnosis cooling lemah", "Sokong R32 / R410A / R22", "Sesuai apabila pressure test dibuat sebelum isi gas"],
      before: "Hantar foto label unit luar dan terangkan sama ada cooling turun secara tiba-tiba atau perlahan.",
      inspect: "Juruteknik kenal pasti jenis refrigerant, sambung gauge dan semak sama ada tekanan rendah menunjukkan risiko bocor.",
      execute: "Gas hanya ditambah selepas bacaan tekanan, penerangan risiko bocor dan persetujuan pelanggan.",
      test: "Kami sahkan tekanan operasi, suhu cooling dan kestabilan compressor selepas balancing.",
      handover: "Anda dapat nasihat sama ada perlu leak check, cuci kimia atau repair sebelum top-up seterusnya.",
    },
    zh: {
      fit: ["制冷弱诊断", "支持R32 / R410A / R22", "适合先测压力再补冷媒"],
      before: "请发送室外机标签照片，并说明制冷是突然变差还是慢慢变差。",
      inspect: "技师确认冷媒类型，连接压力表，并判断低压是否代表可能泄漏。",
      execute: "只有在读取压力、解释漏气风险并获得同意后才补充冷媒。",
      test: "平衡后检查运行压力、出风温度和压缩机稳定性。",
      handover: "我们会建议下次补气前是否需要查漏、化学清洗或维修。",
    },
  },
  repair: {
    en: {
      fit: ["Fault diagnosis before parts replacement", "Best for blinking light, tripping, noise or fan/compressor faults", "Quote confirmed before repair"],
      before: "Send the error light pattern, sound/video clip, brand, model and whether the DB/MCB is tripping.",
      inspect: "Technician isolates the likely fault: capacitor, fan motor, PCB, sensor, compressor, drain pump or wiring.",
      execute: "Repair or replacement is done only after the part cost, labour and warranty terms are confirmed.",
      test: "The unit is run-tested under load to confirm cooling, electrical stability and no repeated fault code.",
      handover: "You receive the fault explanation, replaced-part note and prevention advice to reduce repeat breakdowns.",
    },
    ms: {
      fit: ["Diagnosis sebelum tukar parts", "Sesuai untuk lampu blinking, trip, bunyi atau masalah kipas/compressor", "Harga disahkan sebelum repair"],
      before: "Hantar corak lampu error, video bunyi, jenama, model dan sama ada DB/MCB trip.",
      inspect: "Juruteknik asingkan punca: kapasitor, fan motor, PCB, sensor, compressor, pam drain atau wiring.",
      execute: "Repair atau ganti parts hanya dibuat selepas kos parts, labour dan terma waranti disahkan.",
      test: "Unit diuji ketika berjalan untuk sahkan cooling, kestabilan elektrik dan tiada kod error berulang.",
      handover: "Anda terima penerangan punca, nota parts diganti dan nasihat pencegahan supaya masalah tidak berulang.",
    },
    zh: {
      fit: ["先诊断再换零件", "适合闪灯、跳电、噪音或风扇/压缩机问题", "维修前确认报价"],
      before: "请发送故障灯模式、声音/视频、品牌、型号，以及DB/MCB是否跳闸。",
      inspect: "技师隔离可能故障：电容、风扇马达、PCB、传感器、压缩机、排水泵或电线。",
      execute: "只有在确认零件费、人工费和保修条款后才维修或更换。",
      test: "在负载运行下测试机器，确认制冷、电气稳定和故障码不再重复。",
      handover: "您会收到故障说明、更换零件记录和预防建议，减少再次故障。",
    },
  },
  installation: {
    en: {
      fit: ["New split-unit installation", "Best for correct pipe routing and vacuuming", "Materials quoted before work"],
      before: "Send indoor/outdoor placement photos, horsepower, wall type, copper length estimate and condo management rules if any.",
      inspect: "Technician confirms pipe route, drain fall, electrical point, bracket requirement and safe outdoor-unit location.",
      execute: "Unit is mounted, copper/wiring/drain are routed cleanly, vacuum pump is used and refrigerant is released correctly.",
      test: "Cooling, drainage, vibration, remote control and pipe insulation are checked before handover.",
      handover: "You receive operating advice, warranty reminder and maintenance schedule for the first chemical wash/basic service.",
    },
    ms: {
      fit: ["Pemasangan split-unit baharu", "Sesuai untuk laluan paip dan vacuum yang betul", "Material disebut sebelum kerja"],
      before: "Hantar foto lokasi unit dalam/luar, HP, jenis dinding, anggaran panjang paip dan peraturan pengurusan kondo jika ada.",
      inspect: "Juruteknik sahkan laluan paip, kejatuhan drain, point elektrik, keperluan bracket dan lokasi unit luar yang selamat.",
      execute: "Unit dipasang, paip/wiring/drain disusun kemas, vacuum pump digunakan dan refrigerant dilepaskan dengan betul.",
      test: "Cooling, drainage, getaran, remote control dan insulation paip diuji sebelum serahan.",
      handover: "Anda terima nasihat penggunaan, peringatan waranti dan jadual maintenance pertama.",
    },
    zh: {
      fit: ["新分体式冷气安装", "适合正确铜管路线和抽真空", "材料先报价再施工"],
      before: "请发送室内/室外机位置照片、匹数、墙体类型、预估铜管长度，以及公寓管理规则。",
      inspect: "技师确认铜管路线、排水坡度、电源点、支架需求和安全室外机位置。",
      execute: "安装机器，整齐布置铜管/电线/排水管，使用真空泵并正确释放冷媒。",
      test: "交工前检查制冷、排水、震动、遥控器和铜管保温。",
      handover: "您会收到使用建议、保修提醒和第一次保养/化学清洗建议时间。",
    },
  },
  "basic-servicing": {
    en: {
      fit: ["Routine 3–6 month maintenance", "Best for light dust and preventive care", "Affordable RM99 entry service"],
      before: "Tell us how many units, room type, last service date and whether any unit has weak cooling or leaking.",
      inspect: "Technician checks filters, front coil, blower condition, drainage, remote settings and basic electrical response.",
      execute: "Filters and accessible parts are cleaned, drainage is checked and the unit is reset for normal operation.",
      test: "Airflow, temperature drop, drainage and remote-control response are tested before leaving.",
      handover: "If basic service is not enough, we explain whether chemical wash, gas top-up or repair is the better next step.",
    },
    ms: {
      fit: ["Maintenance rutin 3–6 bulan", "Sesuai untuk habuk ringan dan pencegahan", "Servis permulaan mampu milik RM99"],
      before: "Beritahu bilangan unit, jenis bilik, tarikh servis terakhir dan sama ada ada unit cooling lemah atau bocor.",
      inspect: "Juruteknik semak filter, coil depan, keadaan blower, drainage, setting remote dan respon elektrik asas.",
      execute: "Filter dan bahagian yang mudah dicapai dibersihkan, drainage disemak dan unit diset semula untuk operasi biasa.",
      test: "Airflow, suhu keluar, drainage dan respon remote diuji sebelum juruteknik keluar.",
      handover: "Jika servis asas tidak cukup, kami jelaskan sama ada cuci kimia, tambah gas atau repair ialah langkah seterusnya.",
    },
    zh: {
      fit: ["3–6个月例行保养", "适合轻微灰尘和预防性维护", "RM99经济入门服务"],
      before: "请告知机器数量、房间类型、上次保养日期，以及是否有制冷弱或漏水。",
      inspect: "技师检查滤网、前盘管、风轮状况、排水、遥控设置和基本电气反应。",
      execute: "清洁滤网和可接触部件，检查排水，并将机器恢复正常运行设置。",
      test: "离开前测试风量、出风温差、排水和遥控反应。",
      handover: "若基础保养不足，我们会说明下一步应做化学清洗、补冷媒还是维修。",
    },
  },
  "ceiling-cassette": {
    en: {
      fit: ["Commercial ceiling cassette units", "Best for offices, shops and shared spaces", "Drain pump and cassette panel checks included"],
      before: "Send ceiling height, unit count, access hours, lift/loading rules and whether business must continue during work.",
      inspect: "Technician checks cassette panel, filters, drain pump, ceiling access, airflow direction and water discharge route.",
      execute: "Cassette components are cleaned according to site access, with drain clearing and commercial-safe floor protection.",
      test: "Drain pump, airflow direction, cooling output and panel closure are tested before the space is reopened.",
      handover: "We advise whether quarterly servicing or an AMC schedule is safer for high run-hour commercial units.",
    },
    ms: {
      fit: ["Unit ceiling cassette komersial", "Sesuai untuk pejabat, kedai dan ruang berkongsi", "Termasuk semakan pam drain dan panel cassette"],
      before: "Hantar tinggi siling, bilangan unit, waktu akses, peraturan lift/loading dan sama ada operasi bisnes perlu diteruskan.",
      inspect: "Juruteknik semak panel cassette, filter, pam drain, akses siling, arah airflow dan laluan buangan air.",
      execute: "Komponen cassette dibersihkan ikut akses tapak, dengan pembersihan drain dan perlindungan lantai komersial.",
      test: "Pam drain, arah airflow, cooling output dan penutupan panel diuji sebelum ruang dibuka semula.",
      handover: "Kami nasihatkan sama ada servis suku tahunan atau jadual AMC lebih selamat untuk unit komersial yang lama beroperasi.",
    },
    zh: {
      fit: ["商业天花板卡式机", "适合办公室、店铺和共享空间", "包含排水泵和卡式面板检查"],
      before: "请发送天花板高度、机器数量、可施工时间、电梯/上下货规则，以及营业是否需继续。",
      inspect: "技师检查卡式面板、滤网、排水泵、天花板通行、风向和排水路线。",
      execute: "根据现场通行清洗卡式机部件，同时疏通排水并保护商业地面。",
      test: "重新开放空间前测试排水泵、风向、制冷输出和面板闭合。",
      handover: "我们会建议高运行时间商业机是否更适合季度保养或AMC合约。",
    },
  },
  "dismantling-relocation": {
    en: {
      fit: ["Safe removal and relocation", "Best for moving house, shop or office", "Pump-down and pipe sealing workflow"],
      before: "Send old and new site photos, unit horsepower, floor level, outdoor-unit access and whether reinstallation is same day.",
      inspect: "Technician checks unit condition, existing copper compatibility, gas type and whether parts can be reused safely.",
      execute: "Unit is pumped down where suitable, disconnected, sealed, labelled and prepared for safe transport or reinstallation.",
      test: "For reinstall jobs, vacuuming, cooling, drainage, vibration and pipe insulation are checked at the new location.",
      handover: "We advise whether reusing old copper is safe or whether new materials are better for long-term compressor protection.",
    },
    ms: {
      fit: ["Buka dan pindah unit dengan selamat", "Sesuai untuk pindah rumah, kedai atau pejabat", "Workflow pump-down dan seal paip"],
      before: "Hantar foto lokasi lama dan baharu, HP unit, tingkat, akses unit luar dan sama ada pemasangan semula hari sama.",
      inspect: "Juruteknik semak keadaan unit, keserasian paip lama, jenis gas dan sama ada parts boleh digunakan semula dengan selamat.",
      execute: "Unit dipump-down jika sesuai, diputuskan sambungan, diseal, dilabel dan disediakan untuk pengangkutan atau pasang semula.",
      test: "Untuk kerja reinstall, vacuum, cooling, drainage, getaran dan insulation paip diuji di lokasi baharu.",
      handover: "Kami nasihatkan sama ada paip lama selamat digunakan semula atau material baharu lebih baik untuk lindungi compressor.",
    },
    zh: {
      fit: ["安全拆除和搬迁", "适合搬家、店铺或办公室迁移", "抽回冷媒和封管流程"],
      before: "请发送旧址和新址照片、机器匹数、楼层、室外机通行，以及是否同日重新安装。",
      inspect: "技师检查机器状况、旧铜管兼容性、冷媒类型，以及部件是否可安全重复使用。",
      execute: "适合时先抽回冷媒，再断开、封管、标记，并准备安全运输或重新安装。",
      test: "重新安装时，在新地点检查抽真空、制冷、排水、震动和管路保温。",
      handover: "我们会建议旧铜管是否可安全使用，或新材料是否更能长期保护压缩机。",
    },
  },
  emergency: {
    en: {
      fit: ["Urgent same-day triage", "Best for breakdown, heavy leaking, tripping or burning smell", "Diagnostic from RM88"],
      before: "Send your live location, symptom video, number of affected units and whether water or electrical risk is present.",
      inspect: "Technician prioritizes safety first, then isolates electrical, compressor, fan, drain or PCB causes.",
      execute: "Emergency repair is performed same visit where parts and site conditions allow, with quote confirmed before any part replacement.",
      test: "Unit is run-tested for safe cooling, no tripping, no active leak and no burning smell before handover.",
      handover: "If a permanent repair needs parts ordering, we explain the temporary safety measure and next confirmed repair slot.",
    },
    ms: {
      fit: ["Triage kecemasan hari sama", "Sesuai untuk rosak total, bocor teruk, trip atau bau terbakar", "Diagnostik dari RM88"],
      before: "Hantar lokasi live, video simptom, bilangan unit terjejas dan sama ada ada risiko air atau elektrik.",
      inspect: "Juruteknik utamakan keselamatan, kemudian asingkan punca elektrik, compressor, kipas, drain atau PCB.",
      execute: "Repair kecemasan dibuat lawatan sama jika parts dan keadaan tapak mengizinkan, dengan harga disahkan sebelum tukar parts.",
      test: "Unit diuji untuk cooling selamat, tiada trip, tiada bocor aktif dan tiada bau terbakar sebelum serahan.",
      handover: "Jika repair kekal perlukan order parts, kami terangkan langkah keselamatan sementara dan slot repair seterusnya.",
    },
    zh: {
      fit: ["当天紧急判断", "适合完全故障、严重漏水、跳电或烧焦味", "诊断RM88起"],
      before: "请发送实时位置、症状视频、受影响机器数量，以及是否有水或电气风险。",
      inspect: "技师先处理安全风险，再隔离电气、压缩机、风扇、排水或PCB原因。",
      execute: "若零件和现场条件允许，当次完成紧急维修；更换任何零件前先确认报价。",
      test: "交工前测试安全制冷、不跳电、无活动漏水和无烧焦味。",
      handover: "若永久维修需订零件，我们会说明临时安全措施和下一次确认维修时段。",
    },
  },
};

const TEXT = {
  en: {
    eyebrow: "8.1 Service Core Polish · Scope clarity",
    heading: (title: string) => `${title}: What happens before, during and after service`,
    intro: (title: string) =>
      `This ${title} page is structured for ready-to-book users: first confirm fit, then understand our site check, actual work, testing and handover. No hidden step is left unclear before you WhatsApp KL Renovator.`,
    quickFitTitle: "Use this service when",
    stepsTitle: "Clean service flow",
    handoverTitle: "After-service handover",
    priceBadge: (price: string) => `From RM ${price}`,
    warrantyBadge: "1-month workmanship warranty",
    stepTitles: ["Before booking", "On-site inspection", "Service execution", "Testing before handover"],
  },
  ms: {
    eyebrow: "8.1 Core Polish Servis · Skop jelas",
    heading: (title: string) => `${title}: Apa berlaku sebelum, semasa dan selepas servis`,
    intro: (title: string) =>
      `Halaman ${title} ini disusun untuk pelanggan yang sedia menempah: sahkan kesesuaian servis, faham semakan tapak, kerja sebenar, ujian dan serahan. Tiada langkah penting dibiarkan kabur sebelum anda WhatsApp KL Renovator.`,
    quickFitTitle: "Guna servis ini apabila",
    stepsTitle: "Aliran servis yang jelas",
    handoverTitle: "Serahan selepas servis",
    priceBadge: (price: string) => `Dari RM ${price}`,
    warrantyBadge: "Waranti kerja 1 bulan",
    stepTitles: ["Sebelum tempahan", "Semakan di tapak", "Pelaksanaan servis", "Ujian sebelum serahan"],
  },
  zh: {
    eyebrow: "8.1 服务核心优化 · 范围清楚",
    heading: (title: string) => `${title}：预约前、施工中与交工后的流程`,
    intro: (title: string) =>
      `此${title}页面面向准备预约的用户：先确认是否适合，再了解现场检查、实际施工、测试和交工。WhatsApp KL Renovator前，每个关键步骤都清楚说明。`,
    quickFitTitle: "以下情况适合此服务",
    stepsTitle: "清晰服务流程",
    handoverTitle: "服务后交工说明",
    priceBadge: (price: string) => `RM ${price}起`,
    warrantyBadge: "1个月工艺保修",
    stepTitles: ["预约前", "现场检查", "执行服务", "交工前测试"],
  },
} as const;

export function buildServiceCorePolishModule(
  slug: string,
  locale: ServiceCorePolishLocale,
  title: string,
  startPrice: string | number
): ServiceCorePolishModule {
  const copy = CORE_COPY[slug]?.[locale] ?? CORE_COPY["basic-servicing"][locale];
  const t = TEXT[locale];
  const price = String(startPrice).replace(/^RM\s*/i, "");

  return {
    taskId: "8.1",
    eyebrow: t.eyebrow,
    heading: t.heading(title),
    intro: t.intro(title),
    quickFitTitle: t.quickFitTitle,
    quickFit: copy.fit,
    stepsTitle: t.stepsTitle,
    steps: [
      { title: t.stepTitles[0], detail: copy.before },
      { title: t.stepTitles[1], detail: copy.inspect },
      { title: t.stepTitles[2], detail: copy.execute },
      { title: t.stepTitles[3], detail: copy.test },
    ],
    handoverTitle: t.handoverTitle,
    handover: copy.handover,
    priceBadge: t.priceBadge(price),
    warrantyBadge: t.warrantyBadge,
  };
}
