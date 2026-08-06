// ─────────────────────────────────────────────────────────────────────────
// Trilingual content for every calculator tool page (EN / MS / ZH).
// The EN/MS/ZH page files are thin wrappers that pull their content from
// here, so SEO copy stays in ONE place per tool. The /tools hub and

// ─────────────────────────────────────────────────────────────────────────

export type ToolLang = "en" | "ms" | "zh";

export interface ToolContent {
  eyebrow: string;
  h1: string;
  intro: string;
  howItWorksTitle: string;
  howItWorks: string[];
  factors: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  webAppName: string;
  howToName: string;
}

type ToolKey = "installation" | "gas" | "service" | "size" | "electricity" | "savings";

export const TOOL_CONTENT: Record<ToolKey, Record<ToolLang, ToolContent>> = {
  // ── 1. Installation cost calculator ────────────────────────────────────
  installation: {
    en: {
      eyebrow: "Free Instant Estimate",
      h1: "Aircond Installation Cost Calculator",
      intro:
        "Get an instant aircond installation cost estimate in Malaysia — labour, copper pipe, electrical wire, drain pipe, PVC casing, outdoor bracket, aircond switch and water pump, with multi-unit bundle discounts applied automatically. Every published KL Renovator price is used as-is; anything that needs on-site confirmation is clearly marked.",
      howItWorksTitle: "How This Calculator Works",
      howItWorks: [
        "Select the number of units you need installed and the aircond type — wall-mounted, ceiling cassette or window unit.",
        "Choose the horsepower (HP) of each unit — installation labour is charged per HP exactly as published (RM 199 for 1.0–1.5 HP wall-mounted, RM 249 for 2.0 HP, RM 329 for 3.0 HP, and so on).",
        "Enter the copper pipe, electrical wire and drain pipe run lengths. The first 7 ft of each is free with every installation; anything beyond is charged per foot using the published HP-wise rates.",
        "Add optional items: Small PVC casing (electrical wire) RM 6/ft or large PVC casing (copper pipe + wire + insulation) RM 12/ft, outdoor bracket (standard RM 45 or heavy duty RM 70), aircond switch / plug point (RM 100) and a condensate water pump for concealed installs.",
        "The calculator applies the instant booking bundle discount — 5% OFF for 4–10 units and 10% OFF for 10+ units — and shows your full line-item breakdown.",
        "Send the estimate to KL Renovator on WhatsApp for a confirmed quotation, or book a slot online. Final pricing is confirmed before any work begins.",
      ],
      factors: [
        { title: "Horsepower (HP)", desc: "Bigger units cost more to install: 1.0–1.5 HP wall-mounted is RM 199, 2.0 HP RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399, 5.0 HP RM 449. Ceiling cassette starts from RM 290." },
        { title: "Copper pipe length", desc: "7 ft is free. Extra copper pipe is RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP) and RM 27/ft (3.0 HP and above) — the single biggest price variable on most installs." },
        { title: "Electrical wire length", desc: "7 ft is free. Extra wire is RM 9/ft." },
        { title: "Drain pipe & PVC casing", desc: "7 ft of drain pipe is free; extra run is estimated at RM 5/ft and confirmed on-site. Small PVC casing for electrical wire is RM 6/ft; large PVC casing for copper pipe + wire + insulation is RM 12/ft." },
        { title: "Bracket & switch", desc: "Outdoor bracket (paid special charge if required) RM 45, heavy duty RM 70, indoor universal bracket RM 35, aircond switch / plug point RM 100 — all published prices." },
        { title: "Bundle discount", desc: "Install 4–10 units and get 5% OFF; 10+ units get 10% OFF. The discount applies to the whole installation package." },
      ],
      faqs: [
        { q: "How much does aircond installation cost in Malaysia?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft of copper pipe, wiring and drain pipe, vacuum pump commissioning and a 1-month workmanship warranty. Ceiling cassette from RM 290, window unit from RM 199. 2.0 HP is RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399 and 5.0 HP RM 449." },
        { q: "How much does copper pipe cost for aircond installation?", a: "The first 7 ft of copper pipe is free with installation. Beyond that, copper pipe is charged per foot by HP: RM 17/ft for 1.0–1.5 HP, RM 23/ft for 2.0–2.5 HP and RM 27/ft for 3.0 HP and above." },
        { q: "How much does aircond electrical wire cost per foot?", a: "The first 7 ft of electrical wire is free. Extra wire is RM 9/ft for every HP size." },
        { q: "Is there a discount for installing multiple aircond units?", a: "Yes — KL Renovator gives an instant booking discount on multi-unit installations: 5% OFF for 4–10 units and 10% OFF for 10+ units. This is applied automatically in the calculator and on your final quotation." },
        { q: "What is included in the RM 199 installation package?", a: "The RM 199 package (1.0–1.5 HP wall-mounted) includes the first 7 ft of copper pipe, insulation, electrical wire and drain pipe, vacuum pump commissioning, full installation labour and a 1-month written workmanship warranty. Beyond 7 ft, copper pipe is RM17–27/ft by HP, electrical wire RM9/ft, insulation RM7/ft and drain pipe RM5/ft. Small PVC casing is RM6/ft, large PVC casing RM12/ft, and any outdoor bracket required is quoted separately as a paid special charge." },
        { q: "Do ceiling cassette installations include a water pump?", a: "Yes — ceiling cassette installation packages (from RM 290) include the drain pipe and condensate pump. For wall-mounted units in concealed or low-ceiling layouts, a water pump is an optional add-on estimated from the published RM 350–550 drain pump range and confirmed on-site." },
      ],
      webAppName: "KL Renovator Aircond Installation Cost Calculator",
      howToName: "How to Calculate Your Aircond Installation Cost in Malaysia",
    },
    ms: {
      eyebrow: "Anggaran Percuma Segera",
      h1: "Kalkulator Kos Pemasangan Aircond",
      intro:
        "Dapatkan anggaran kos pemasangan aircond dengan serta-merta di Malaysia — buruh, paip tembaga, wayar elektrik, paip saliran, casing PVC, pendakap luar, suis aircond dan pam air, dengan diskaun pakej unit berbilang dikira automatik. Semua harga KL Renovator yang diterbitkan digunakan seadanya; apa-apa yang memerlukan pengesahan di tapak ditanda dengan jelas.",
      howItWorksTitle: "Cara Kalkulator Ini Berfungsi",
      howItWorks: [
        "Pilih bilangan unit yang ingin dipasang dan jenis aircond — dinding, ceiling cassette atau tingkap.",
        "Pilih kuasa kuda (HP) setiap unit — buruh pemasangan dicaj mengikut HP seperti yang diterbitkan (RM 199 untuk 1.0–1.5 HP dinding, RM 249 untuk 2.0 HP, RM 329 untuk 3.0 HP, dan seterusnya).",
        "Masukkan panjang paip tembaga, wayar elektrik dan paip saliran. 7 kaki pertama setiap satu adalah percuma; lebihan dicaj sekaki mengikut kadar HP yang diterbitkan.",
        "Tambah item pilihan: casing PVC kecil (wayar elektrik) RM 6/kaki atau casing PVC besar (paip kuprum + wayar + penebat) RM 12/kaki, pendakap luar (standard RM 45 atau heavy duty RM 70), suis / plug point aircond (RM 100) dan pam air untuk pemasangan tersembunyi.",
        "Kalkulator menggunakan diskaun tempahan segera — 5% OFF untuk 4–10 unit dan 10% OFF untuk 10+ unit — serta menunjukkan pecahan penuh setiap item.",
        "Hantar anggaran ini kepada KL Renovator melalui WhatsApp untuk sebut harga sah, atau tempah slot dalam talian. Harga akhir disahkan sebelum kerja bermula.",
      ],
      factors: [
        { title: "Kuasa Kuda (HP)", desc: "Unit lebih besar lebih mahal dipasang: 1.0–1.5 HP dinding RM 199, 2.0 HP RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399, 5.0 HP RM 449. Ceiling cassette dari RM 290." },
        { title: "Panjang paip tembaga", desc: "7 kaki percuma. Paip tembaga tambahan RM 17/kaki (1.0–1.5 HP), RM 23/kaki (2.0–2.5 HP) dan RM 27/kaki (3.0 HP ke atas) — pemboleh ubah harga terbesar pada kebanyakan pemasangan." },
        { title: "Panjang wayar elektrik", desc: "7 kaki percuma. Wayar tambahan RM 9/kaki." },
        { title: "Paip saliran & casing PVC", desc: "7 kaki paip saliran percuma; lebihan dianggarkan RM 5/kaki dan disahkan di tapak. Casing PVC kecil untuk wayar elektrik RM 6/kaki; casing PVC besar untuk paip kuprum + wayar + penebat RM 12/kaki." },
        { title: "Pendakap & suis", desc: "Pendakap luar standard RM 45, heavy duty RM 70, pendakap universal dalaman RM 35, suis / plug point aircond RM 100 — semua harga diterbitkan." },
        { title: "Diskaun pakej", desc: "Pasang 4–10 unit dan dapat 5% OFF; 10+ unit dapat 10% OFF. Diskaun dikenakan pada keseluruhan pakej pemasangan." },
      ],
      faqs: [
        { q: "Berapakah kos pemasangan aircond di Malaysia?", a: "Pemasangan dinding bermula dari RM 199 untuk 1.0–1.5 HP termasuk 7 kaki paip tembaga, wayar dan paip saliran, pendakap standard, commissioning pam vakum dan waranti mutu kerja 1 bulan. Ceiling cassette dari RM 290, unit tingkap dari RM 199. 2.0 HP RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399 dan 5.0 HP RM 449." },
        { q: "Berapakah kos paip tembaga untuk pemasangan aircond?", a: "7 kaki pertama paip tembaga adalah percuma. Lebihan dicaj sekaki mengikut HP: RM 17/kaki untuk 1.0–1.5 HP, RM 23/kaki untuk 2.0–2.5 HP dan RM 27/kaki untuk 3.0 HP ke atas." },
        { q: "Berapakah kos wayar elektrik aircond sekaki?", a: "7 kaki pertama wayar elektrik adalah percuma. Wayar tambahan ialah RM 9/kaki untuk setiap saiz HP." },
        { q: "Adakah diskaun untuk pemasangan berbilang unit aircond?", a: "Ya — KL Renovator memberi diskaun tempahan segera untuk pemasangan berbilang unit: 5% OFF untuk 4–10 unit dan 10% OFF untuk 10+ unit. Ini dikira automatik dalam kalkulator dan pada sebut harga akhir anda." },
        { q: "Apa yang termasuk dalam pakej RM 199?", a: "Pakej RM 199 (1.0–1.5 HP dinding) termasuk 7 kaki paip tembaga, 7 kaki wayar, 7 kaki paip saliran, pendakap luar standard, commissioning pam vakum, buruh pemasangan penuh dan waranti mutu kerja bertulis 1 bulan. Apa-apa melebihi 7 kaki, atau item tambahan seperti casing PVC, suis aircond atau pam air, dicaj berasingan mengikut kadar yang diterbitkan." },
        { q: "Adakah pemasangan ceiling cassette termasuk pam air?", a: "Ya — pakej pemasangan ceiling cassette (dari RM 290) termasuk paip saliran dan pam kondensat. Untuk unit dinding di ruang tersembunyi atau siling rendah, pam air ialah item tambahan yang dianggarkan dari julat pam saliran RM 350–550 yang diterbitkan dan disahkan di tapak." },
      ],
      webAppName: "Kalkulator Kos Pemasangan Aircond KL Renovator",
      howToName: "Cara Kira Kos Pemasangan Aircond di Malaysia",
    },
    zh: {
      eyebrow: "免费即时估价",
      h1: "冷气安装费用计算器",
      intro:
        "立即估算马来西亚冷气安装费用 — 人工、铜管、电线、排水管、PVC线槽、室外支架、冷气开关和水泵，多台安装折扣自动计算。所有KL Renovator已公布的定价原样使用；任何需要现场确认的项目都会清楚标注。",
      howItWorksTitle: "计算器使用方法",
      howItWorks: [
        "选择需要安装的台数和冷气类型 — 挂壁式、天花板卡式或窗式。",
        "选择每台的匹数（HP）— 安装人工按已公布的匹数收费（1.0–1.5匹挂壁式RM 199，2.0匹RM 249，3.0匹RM 329，依此类推）。",
        "输入铜管、电线和排水管的长度。每项前7英尺免费；超出部分按已公布的匹数费率每英尺收费。",
        "添加可选项目：小型PVC线槽（电线，每英尺RM 6）或大型PVC线槽（铜管+电线+保温层，每英尺RM 12）、室外支架（标准RM 45或重型RM 70）、冷气开关/插座（RM 100）以及隐藏式安装用的排水泵。",
        "计算器自动套用即时预约折扣 — 4–10台享5%折扣，10台以上享10%折扣 — 并显示完整的逐项明细。",
        "将估价通过WhatsApp发送给KL Renovator获取正式报价，或在线预约。最终价格在动工前确认。",
      ],
      factors: [
        { title: "匹数（HP）", desc: "匹数越大安装费越高：1.0–1.5匹挂壁式RM 199，2.0匹RM 249，2.5匹RM 279，3.0匹RM 329，4.0匹RM 399，5.0匹RM 449。天花板卡式从RM 290起。" },
        { title: "铜管长度", desc: "前7英尺免费。额外铜管每英尺RM 17（1.0–1.5匹）、RM 23（2.0–2.5匹）、RM 27（3.0匹及以上）— 多数安装中最大的价格变量。" },
        { title: "电线长度", desc: "前7英尺免费。额外电线每英尺RM 9（1.0–1.5匹）、RM 13（2.0–2.5匹）、RM 17（3.0–4.0匹）。" },
        { title: "排水管与PVC线槽", desc: "7英尺排水管免费；超出部分按每英尺RM 5估算并现场确认。小型PVC线槽（电线）每英尺RM 6；大型PVC线槽（铜管+电线+保温层）每英尺RM 12。" },
        { title: "支架与开关", desc: "标准室外支架RM 45、重型RM 70、室内通用支架RM 35、冷气开关/插座RM 100 — 全部为已公布价格。" },
        { title: "多台折扣", desc: "安装4–10台享5%折扣；10台以上享10%折扣。折扣适用于整个安装配套。" },
      ],
      faqs: [
        { q: "马来西亚冷气安装费用是多少？", a: "挂壁式安装1.0–1.5匹从RM 199起，包含7英尺铜管、电线、排水管、标准支架、真空泵调试和1个月工艺保修。天花板卡式从RM 290起，窗式从RM 199起。2.0匹RM 249，2.5匹RM 279，3.0匹RM 329，4.0匹RM 399，5.0匹RM 449。" },
        { q: "冷气安装的铜管多少钱一英尺？", a: "安装包含前7英尺铜管免费。超出部分按匹数每英尺收费：1.0–1.5匹RM 17，2.0–2.5匹RM 23，3.0匹及以上RM 27。" },
        { q: "冷气电线每英尺多少钱？", a: "前7英尺电线免费。额外电线：1.0–1.5匹每英尺RM 9，2.0–2.5匹RM 13，3.0–4.0匹RM 17。" },
        { q: "安装多台冷气有折扣吗？", a: "有 — KL Renovator为多台安装提供即时预约折扣：4–10台享5%折扣，10台以上享10%折扣。计算器和最终报价都会自动套用。" },
        { q: "RM 199安装配套包含什么？", a: "RM 199配套（1.0–1.5匹挂壁式）包含7英尺铜管、7英尺电线、7英尺排水管、标准室外支架、真空泵调试、全部安装人工和1个月书面工艺保修。超出7英尺的部分或额外项目（如PVC线槽、冷气开关或水泵）按已公布费率另行收费。" },
        { q: "天花板卡式安装包含水泵吗？", a: "包含 — 天花板卡式安装配套（从RM 290起）包括排水管和冷凝水泵。挂壁式隐藏式或低吊顶安装如需水泵，则按已公布的RM 350–550排水泵范围估算，并现场确认。" },
      ],
      webAppName: "KL Renovator 冷气安装费用计算器",
      howToName: "如何计算马来西亚冷气安装费用",
    },
  },

  // ── 2. Gas top-up cost estimator ────────────────────────────────────────
  gas: {
    en: {
      eyebrow: "Free Instant Estimate",
      h1: "Aircond Gas Top-up Cost Calculator",
      intro:
        "Estimate your aircond gas top-up cost in Malaysia instantly. Choose your HP, gas type (R22, R410A or R32) and estimated gas condition, and get a realistic cost range based on KL Renovator's published per-PSI rates. The final gas quantity and charges are confirmed by the technician after on-site inspection.",
      howItWorksTitle: "How This Calculator Works",
      howItWorks: [
        "Select your aircond horsepower (HP) — 1.0 HP to 3.0 HP are the most common sizes for gas top-ups.",
        "Choose your gas type. KL Renovator tops up all three: R22 at RM 2.50/PSI (older units), R410A at RM 3.00/PSI (standard) and R32 at RM 3.00/PSI (newer inverter units).",
        "Estimate how low the refrigerant is — slightly low, moderately low or very low. This sets the typical PSI shortfall range for your HP.",
        "Enter the number of units that need topping up.",
        "The calculator returns a cost RANGE (never a false-precision single number) based on the published per-PSI rates.",
        "Book a gas top-up with KL Renovator — a precision manifold gauge check measures the actual PSI, a leak check is included, and you only pay for the PSI actually refilled.",
      ],
      factors: [
        { title: "Gas type & published rate", desc: "R22 is RM 2.50/PSI (older R22 systems), R410A and R32 are RM 3.00/PSI. These are KL Renovator's published rates — the calculator uses them directly." },
        { title: "Horsepower (HP)", desc: "Larger systems hold more refrigerant and typically need more PSI restored: 1.0 HP usually needs the least, 2.5–3.0 HP the most." },
        { title: "How low the gas is", desc: "A unit that barely cools needs more PSI than one that is only slightly weak. The estimate uses typical shortfall bands for each condition." },
        { title: "Leak check is included", desc: "Refrigerant never 'runs out' — if it is low, it leaked. Every KL Renovator gas top-up includes a physical leak inspection at all flare connections, service valves and coil surfaces." },
      ],
      faqs: [
        { q: "How much does aircond gas top-up cost in Malaysia?", a: "KL Renovator charges per PSI: R22 at RM 2.50/PSI, R410A and R32 at RM 3.00/PSI. A typical 1.5 HP top-up ranges from roughly RM 105–270 depending on how much gas is missing. The exact PSI is measured with a manifold gauge during inspection and you only pay for what is refilled — no hidden charges." },
        { q: "Which gas does my aircond use — R22, R410A or R32?", a: "Units made before ~2015 usually use R22. Most units from 2015–2021 use R410A. Newer inverter models (2021+) use R32. Check the sticker on the outdoor unit — it states the refrigerant type. KL Renovator tops up all three." },
        { q: "Why is my aircond gas low every year?", a: "Because refrigerant does not get 'used up' — if it is low, it leaked out somewhere. A proper gas top-up always includes a leak check. KL Renovator inspects all accessible flare connections, service valves and coil surfaces with every top-up." },
        { q: "Is gas top-up charged per PSI or per unit?", a: "KL Renovator charges per actual PSI required after inspection: RM 2.50/PSI for R22 and RM 3.00/PSI for R410A and R32. We only refill the amount needed and confirm the total with you before refilling." },
        { q: "Does gas top-up include the labour or diagnostic fee?", a: "The per-PSI charge covers the gas itself and the precision balancing. Every top-up includes a leak check. If a leak or other fault is found, you will receive a separate transparent quote before any repair work begins." },
      ],
      webAppName: "KL Renovator Aircond Gas Top-up Cost Calculator",
      howToName: "How to Estimate Aircond Gas Top-up Cost in Malaysia",
    },
    ms: {
      eyebrow: "Anggaran Percuma Segera",
      h1: "Kalkulator Kos Tambah Gas Aircond",
      intro:
        "Anggarkan kos tambah gas aircond anda di Malaysia dengan serta-merta. Pilih HP, jenis gas (R22, R410A atau R32) dan anggaran keadaan gas, dan dapatkan julat kos yang realistik berdasarkan kadar per-PSI yang diterbitkan oleh KL Renovator. Kuantiti dan caj gas akhir akan disahkan oleh juruteknik selepas pemeriksaan di tapak.",
      howItWorksTitle: "Cara Kalkulator Ini Berfungsi",
      howItWorks: [
        "Pilih kuasa kuda (HP) aircond anda — 1.0 HP hingga 3.0 HP adalah saiz paling biasa untuk tambah gas.",
        "Pilih jenis gas. KL Renovator menambah ketiga-tiganya: R22 pada RM 2.50/PSI (unit lama), R410A pada RM 3.00/PSI (standard) dan R32 pada RM 3.00/PSI (unit inverter baharu).",
        "Anggarkan betapa rendah gas penyejuk — sedikit rendah, sederhana rendah atau sangat rendah. Ini menetapkan julat kekurangan PSI untuk HP anda.",
        "Masukkan bilangan unit yang perlu ditambah gas.",
        "Kalkulator memberi julat kos (bukan angka tunggal yang palsu tepat) berdasarkan kadar per-PSI yang diterbitkan.",
        "Tempah tambah gas dengan KL Renovator — semakan tolok manifold mengukur PSI sebenar, semakan kebocoran disertakan, dan anda hanya membayar PSI yang sebenarnya diisi.",
      ],
      factors: [
        { title: "Jenis gas & kadar diterbitkan", desc: "R22 ialah RM 2.50/PSI (sistem R22 lama), R410A dan R32 ialah RM 3.00/PSI. Ini kadar yang diterbitkan oleh KL Renovator — kalkulator menggunakannya terus." },
        { title: "Kuasa kuda (HP)", desc: "Sistem lebih besar menyimpan lebih banyak penyejuk dan biasanya perlu lebih banyak PSI: 1.0 HP paling sedikit, 2.5–3.0 HP paling banyak." },
        { title: "Betapa rendah gas", desc: "Unit yang hampir tidak sejuk perlu lebih banyak PSI daripada unit yang hanya sedikit lemah. Anggaran menggunakan julat kekurangan biasa untuk setiap keadaan." },
        { title: "Semakan kebocoran disertakan", desc: "Gas penyejuk tidak pernah 'habis' — jika rendah, ia bocor. Setiap tambah gas KL Renovator termasuk pemeriksaan fizikal kebocoran di semua sambungan flare, injap servis dan permukaan gegelung." },
      ],
      faqs: [
        { q: "Berapakah kos tambah gas aircond di Malaysia?", a: "KL Renovator mengenakan caj per PSI: R22 pada RM 2.50/PSI, R410A dan R32 pada RM 3.00/PSI. Tambah gas biasa untuk 1.5 HP berjulat kira-kira RM 105–270 bergantung pada jumlah gas yang hilang. PSI tepat diukur dengan tolok manifold semasa pemeriksaan dan anda hanya membayar yang diisi — tiada caj tersembunyi." },
        { q: "Gas apa yang digunakan aircond saya — R22, R410A atau R32?", a: "Unit sebelum ~2015 biasanya menggunakan R22. Kebanyakan unit 2015–2021 menggunakan R410A. Model inverter baharu (2021+) menggunakan R32. Semak pelekat pada unit luar — ia menyatakan jenis penyejuk. KL Renovator menambah ketiga-tiganya." },
        { q: "Kenapa gas aircond saya rendah setiap tahun?", a: "Kerana gas penyejuk tidak 'habis' — jika rendah, ia bocor di suatu tempat. Tambah gas yang betul sentiasa termasuk semakan kebocoran. KL Renovator memeriksa semua sambungan flare, injap servis dan permukaan gegelung dengan setiap tambah gas." },
        { q: "Adakah tambah gas dicaj per PSI atau per unit?", a: "KL Renovator mengenakan caj mengikut PSI sebenar yang diperlukan selepas pemeriksaan: RM 2.50/PSI untuk R22 dan RM 3.00/PSI untuk R410A dan R32. Kami hanya mengisi jumlah yang diperlukan dan mengesahkan jumlah dengan anda sebelum mengisi." },
        { q: "Adakah tambah gas termasuk yuran buruh atau diagnostik?", a: "Caj per PSI meliputi gas itu sendiri dan penyeimbangan tepat. Setiap tambah gas termasuk semakan kebocoran. Jika kebocoran atau kerosakan lain dijumpai, anda akan menerima sebut harga berasingan yang telus sebelum kerja pembaikan bermula." },
      ],
      webAppName: "Kalkulator Kos Tambah Gas Aircond KL Renovator",
      howToName: "Cara Anggarkan Kos Tambah Gas Aircond di Malaysia",
    },
    zh: {
      eyebrow: "免费即时估价",
      h1: "冷气加气费用计算器",
      intro:
        "立即估算马来西亚冷气加气（Gas）费用。选择匹数、气体类型（R22、R410A或R32）和预估气体状况，即可根据KL Renovator已公布的每PSI费率获得实际费用范围。最终加气量和费用将由技术员现场检查后确认。",
      howItWorksTitle: "计算器使用方法",
      howItWorks: [
        "选择冷气匹数（HP）— 1.0匹至3.0匹是加气最常见的规格。",
        "选择气体类型。KL Renovator可加三种气体：R22每PSI RM 2.50（旧机型）、R410A每PSI RM 3.00（标准机型）、R32每PSI RM 3.00（新型变频机型）。",
        "预估冷媒短缺程度 — 轻微不足、中度不足或严重不足。这决定该匹数的典型PSI缺口范围。",
        "输入需要加气的台数。",
        "计算器根据已公布的每PSI费率给出费用范围（绝不给出虚假的精确数字）。",
        "预约KL Renovator加气服务 — 技术员用精密压力表测量实际PSI，附带检漏，且只按实际补充的PSI收费。",
      ],
      factors: [
        { title: "气体类型与公布费率", desc: "R22每PSI RM 2.50（旧式R22系统），R410A和R32每PSI RM 3.00。这些是KL Renovator公布的费率 — 计算器直接使用。" },
        { title: "匹数（HP）", desc: "系统越大容纳的冷媒越多，通常需要补充的PSI也越多：1.0匹通常最少，2.5–3.0匹最多。" },
        { title: "气体不足程度", desc: "几乎不制冷的机器比仅轻微变弱的机器需要更多PSI。估算按每种状况使用典型缺口范围。" },
        { title: "附带检漏", desc: "冷媒不会\"用完\" — 如果不足，就是泄漏了。KL Renovator每次加气都包含对所有喇叭口接口、维修阀和盘管表面的物理检漏。" },
      ],
      faqs: [
        { q: "马来西亚冷气加气费用是多少？", a: "KL Renovator按PSI收费：R22每PSI RM 2.50，R410A和R32每PSI RM 3.00。典型1.5匹加气约RM 105–270，视缺气量而定。实际PSI由技术员现场用压力表测量，只按实际补充量收费 — 无隐藏费用。" },
        { q: "我的冷气用什么气体 — R22、R410A还是R32？", a: "约2015年以前生产的机型通常用R22；2015–2021年多数机型用R410A；新型变频机型（2021年后）用R32。请查看室外机上的标签，上面标明冷媒类型。KL Renovator三种气体都能加。" },
        { q: "为什么我的冷气每年都缺气？", a: "因为冷媒不会\"用完\" — 如果不足，就是哪里泄漏了。正确的加气服务一定包含检漏。KL Renovator每次加气都会检查所有可触及的喇叭口接口、维修阀和盘管表面。" },
        { q: "加气是按PSI收费还是按台收费？", a: "KL Renovator按检查后实际所需的PSI收费：R22每PSI RM 2.50，R410A和R32每PSI RM 3.00。我们只补充所需的量，并在加气前与您确认总额。" },
        { q: "加气包含人工或检测费吗？", a: "每PSI费用涵盖气体本身和精密平衡。每次加气都附带检漏。若发现泄漏或其他故障，会在任何维修开始前另行提供透明报价。" },
      ],
      webAppName: "KL Renovator 冷气加气费用计算器",
      howToName: "如何估算马来西亚冷气加气费用",
    },
  },

  // ── 3. Which service do I need ──────────────────────────────────────────
  service: {
    en: {
      eyebrow: "Free Smart Diagnosis",
      h1: "Which Aircond Service Do I Need?",
      intro:
        "Is your aircond cooling properly? Water leaking? Bad smell? Noisy? Weak airflow? Answer a few quick questions and this tool tells you whether you need a basic service, chemical wash, chemical overhaul, gas top-up, repair or inspection — with the reason for each recommendation and the published starting price.",
      howItWorksTitle: "How This Tool Works",
      howItWorks: [
        "Choose the main problem you are experiencing — not cold, water leaking, noise, bad smell, weak airflow, not turning on, tripping MCB, ice formation or remote issues.",
        "Answer one or two follow-up questions about severity and timing — e.g. did cooling stop suddenly or gradually, is the leak a drip or continuous flow.",
        "The tool matches your answers against common HVAC failure patterns and recommends the correct service: basic servicing (from RM 99), chemical wash (from RM 120), chemical overhaul (from RM 220), gas top-up (from RM 2.50/PSI), repair (diagnostic RM 88, waived with repair).",
        "Each recommendation explains WHY it was made — the likely cause, the fix and how urgent it is.",
        "Send the diagnosis to KL Renovator on WhatsApp with one tap, or read the full problem guide linked in the result.",
        "A technician confirms the diagnosis on-site and gives you a fixed price before any work begins.",
      ],
      factors: [
        { title: "Basic Service — RM 99", desc: "Filter cleaning and multi-point check. Right for routine 3–6 month maintenance when the unit cools fine, no smells, no leaks." },
        { title: "Chemical Wash — RM 120+", desc: "High-pressure internal coil cleaning. Right for weak airflow, musty smell, gradual cooling loss, or units not serviced in 12+ months." },
        { title: "Chemical Overhaul — RM 220+", desc: "Full dismantle and deep clean. Right for water leaking, ice formation, severe blockage — the permanent fix for drain problems." },
        { title: "Gas Top-up — RM 2.50/PSI", desc: "Precision refrigerant balancing with leak check. Right when cooling drops gradually over weeks or the outdoor unit runs but air stays warm." },
        { title: "Repair — Diagnostic RM 138", desc: "Component faults: capacitor, fan motor, PCB, sensor. Right for sudden failure, loud noise from the outdoor unit, or error codes. Diagnostic fee is waived if repaired same visit." },
        { title: "Inspection", desc: "When the problem is unclear or a unit has been untouched for years, an inspection gives a written quote for everything needed — no pressure to proceed." },
      ],
      faqs: [
        { q: "How do I know if my aircond needs chemical wash or chemical overhaul?", a: "Chemical wash (RM 120+) cleans the coil in place — right for weak cooling, smells and slow airflow. Chemical overhaul (RM 220+) fully removes and dismantles the indoor unit — right when water is leaking, ice forms, or the unit has not been deep-cleaned in 2+ years. As a rule: wash for performance, overhaul for leaks and ice." },
        { q: "How often should an aircond be serviced in Malaysia?", a: "Basic servicing every 3–6 months, and a pressure chemical wash every 12 months — or every 6–8 months if the unit runs 8+ hours a day. Units near busy roads or construction sites need more frequent cleaning due to dust." },
        { q: "My aircond is not cold but the outdoor unit runs. What service do I need?", a: "This is most often low refrigerant gas or a failing capacitor. Book a diagnostic (RM 88, waived if repaired same visit) or a gas top-up with leak check. KL Renovator measures the pressure with a manifold gauge and confirms the cause on-site." },
        { q: "Why does my aircond smell bad?", a: "A musty smell means mould, bacteria and biofilm have built up on the evaporator coil and blower wheel — very common in KL's humidity. A pressure chemical wash (from RM 120) dissolves the biofilm and restores clean airflow. If the smell persists after washing, an overhaul may be needed." },
        { q: "How much does it cost to service an aircond in KL & Selangor?", a: "Basic service from RM 99, pressure chemical wash from RM 120 (1.0–1.5 HP wall-mounted), chemical overhaul from RM 220, gas top-up from RM 2.50/PSI (R22) or RM 3.00/PSI (R410A/R32). Ceiling cassette and commercial units are priced separately. Every price is confirmed before work begins." },
        { q: "Can you recommend the right aircond service for me?", a: "Yes — use this tool to get an instant recommendation, or WhatsApp +60182983573 with your symptoms (not cold, leaking, noise, smell, error code) and KL Renovator will advise the right service and a transparent price, same-day." },
      ],
      webAppName: "KL Renovator Aircond Service Recommendation Tool",
      howToName: "How to Find the Right Aircond Service in Malaysia",
    },
    ms: {
      eyebrow: "Diagnosis Pintar Percuma",
      h1: "Servis Aircond Mana Yang Saya Perlukan?",
      intro:
        "Adakah aircond anda sejuk dengan baik? Bocor air? Bau busuk? Bising? Aliran udara lemah? Jawab beberapa soalan pantas dan alat ini memberitahu anda sama ada anda memerlukan servis asas, cuci kimia, overhaul kimia, tambah gas, pembaikan atau pemeriksaan — dengan sebab setiap cadangan dan harga permulaan yang diterbitkan.",
      howItWorksTitle: "Cara Alat Ini Berfungsi",
      howItWorks: [
        "Pilih masalah utama yang anda alami — tidak sejuk, bocor air, bising, bau busuk, aliran udara lemah, tidak hidup, MCB jatuh, pembentukan ais atau isu remote.",
        "Jawab satu atau dua soalan lanjutan tentang tahap dan masa — contohnya, adakah penyejukan berhenti secara tiba-tiba atau beransur, adakah bocor menitis atau mengalir berterusan.",
        "Alat memadankan jawapan anda dengan corak kegagalan HVAC biasa dan mencadangkan servis yang betul: servis asas (dari RM 99), cuci kimia (dari RM 120), overhaul kimia (dari RM 220), tambah gas (dari RM 2.50/PSI), pembaikan (diagnostik RM 88, dikecualikan jika dibaiki).",
        "Setiap cadangan menerangkan MENGAPA ia dibuat — punca kemungkinan, penyelesaian dan tahap kecemasan.",
        "Hantar diagnosis kepada KL Renovator melalui WhatsApp dengan satu ketukan, atau baca panduan penuh masalah yang dipautkan dalam keputusan.",
        "Juruteknik mengesahkan diagnosis di tapak dan memberi harga tetap sebelum sebarang kerja bermula.",
      ],
      factors: [
        { title: "Servis Asas — RM 99", desc: "Cuci penapis dan pemeriksaan berbilang titik. Sesuai untuk penyelenggaraan rutin 3–6 bulan apabila unit menyejuk dengan baik, tiada bau, tiada bocor." },
        { title: "Cuci Kimia — RM 120+", desc: "Pembersihan gegelung dalaman tekanan tinggi. Sesuai untuk aliran udara lemah, bau hapak, penyejukan menurun beransur, atau unit yang tidak diservis 12+ bulan." },
        { title: "Overhaul Kimia — RM 220+", desc: "Pembongkaran penuh dan cucian menyeluruh. Sesuai untuk bocor air, pembentukan ais, sekatan teruk — penyelesaian kekal untuk masalah saliran." },
        { title: "Tambah Gas — RM 2.50/PSI", desc: "Penyeimbangan penyejuk tepat dengan semakan kebocoran. Sesuai apabila penyejukan menurun beransur selama beberapa minggu atau unit luar berjalan tetapi udara kekal panas." },
        { title: "Pembaikan — Diagnostik RM 88", desc: "Kerosakan komponen: kapasitor, motor kipas, PCB, sensor. Sesuai untuk kegagalan tiba-tiba, bunyi kuat dari unit luar, atau kod ralat. Yuran diagnostik dikecualikan jika dibaiki dalam lawatan sama." },
        { title: "Pemeriksaan", desc: "Apabila masalah tidak jelas atau unit tidak disentuh bertahun-tahun, pemeriksaan memberi sebut harga bertulis untuk semua yang diperlukan — tanpa tekanan untuk meneruskan." },
      ],
      faqs: [
        { q: "Macam mana saya tahu aircond saya perlu cuci kimia atau overhaul kimia?", a: "Cuci kimia (RM 120+) membersihkan gegelung di tempat — sesuai untuk penyejukan lemah, bau dan aliran udara perlahan. Overhaul kimia (RM 220+) membongkar sepenuhnya unit dalaman — sesuai apabila bocor air, ais terbentuk, atau unit tidak dicuci mendalam 2+ tahun. Peraturan asas: cuci untuk prestasi, overhaul untuk bocor dan ais." },
        { q: "Berapa kerap aircond perlu diservis di Malaysia?", a: "Servis asas setiap 3–6 bulan, dan cuci kimia tekanan setiap 12 bulan — atau setiap 6–8 bulan jika unit berjalan 8+ jam sehari. Unit berhampiran jalan raya sibuk atau tapak pembinaan perlu cucian lebih kerap kerana habuk." },
        { q: "Aircond saya tidak sejuk tetapi unit luar berjalan. Servis apa yang saya perlukan?", a: "Ini selalunya gas penyejuk rendah atau kapasitor gagal. Tempah diagnostik (RM 88, dikecualikan jika dibaiki dalam lawatan sama) atau tambah gas dengan semakan kebocoran. KL Renovator mengukur tekanan dengan tolok manifold dan mengesahkan punca di tapak." },
        { q: "Kenapa aircond saya berbau busuk?", a: "Bau hapak bermakna kulat, bakteria dan biofilem terkumpul pada gegelung evaporator dan roda blower — sangat biasa dalam kelembapan KL. Cuci kimia tekanan (dari RM 120) melarutkan biofilem dan memulihkan aliran udara bersih. Jika bau berterusan selepas cuci, overhaul mungkin diperlukan." },
        { q: "Berapakah kos servis aircond di KL & Selangor?", a: "Servis asas dari RM 99, cuci kimia tekanan dari RM 120 (1.0–1.5 HP dinding), overhaul kimia dari RM 220, tambah gas dari RM 2.50/PSI (R22) atau RM 3.00/PSI (R410A/R32). Ceiling cassette dan unit komersial dicaj berasingan. Setiap harga disahkan sebelum kerja bermula." },
        { q: "Bolehkah anda cadangkan servis aircond yang betul untuk saya?", a: "Ya — gunakan alat ini untuk cadangan segera, atau WhatsApp +60182983573 dengan gejala anda (tidak sejuk, bocor, bising, bau, kod ralat) dan KL Renovator akan menasihati servis yang betul dengan harga telus, pada hari yang sama." },
      ],
      webAppName: "Alat Cadangan Servis Aircond KL Renovator",
      howToName: "Cara Mencari Servis Aircond yang Tepat di Malaysia",
    },
    zh: {
      eyebrow: "免费智能诊断",
      h1: "我需要哪种冷气服务？",
      intro:
        "您的冷气制冷正常吗？漏水？有异味？有噪音？风量弱？回答几个快速问题，此工具会告诉您需要基本保养、化学清洗、化学大修、加气、维修还是检测 — 并解释每项建议的理由和已公布的起价。",
      howItWorksTitle: "工具使用方法",
      howItWorks: [
        "选择您遇到的主要问题 — 不冷、漏水、噪音、异味、风量弱、无法开机、跳闸、结冰或遥控问题。",
        "回答一两个关于严重程度和时间的问题 — 例如制冷是突然变差还是逐渐变差，漏水是滴漏还是持续流淌。",
        "工具将您的答案与常见HVAC故障模式匹配，并推荐正确的服务：基本保养（从RM 99起）、化学清洗（从RM 120起）、化学大修（从RM 220起）、加气（每PSI RM 2.50起）、维修（检测费RM 88，同次维修可免）。",
        "每项建议都会解释原因 — 可能的原因、解决方法以及紧急程度。",
        "一键将诊断结果通过WhatsApp发送给KL Renovator，或阅读结果中链接的完整问题指南。",
        "技术员现场确认诊断，并在动工前给出固定价格。",
      ],
      factors: [
        { title: "基本保养 — RM 99", desc: "滤网清洗和多点检查。适合每3–6个月的例行保养，制冷正常、无异味、无漏水时。" },
        { title: "化学清洗 — RM 120起", desc: "高压内部盘管清洗。适合风量弱、霉味、制冷逐渐变差，或超过12个月未保养的机器。" },
        { title: "化学大修 — RM 220起", desc: "完全拆机深度清洗。适合漏水、结冰、严重堵塞 — 排水问题的永久解决方案。" },
        { title: "加气 — 每PSI RM 2.50起", desc: "精密冷媒平衡并附带检漏。适合制冷数周内逐渐变差，或室外机运转但吹出热风的情况。" },
        { title: "维修 — 检测费RM 88", desc: "部件故障：电容、风扇电机、电路板、传感器。适合突然故障、室外机噪音大或显示错误代码。同次上门维修可免检测费。" },
        { title: "检测", desc: "当问题不明确或机器多年未保养时，检测会提供所需项目的书面报价 — 无任何推销压力。" },
      ],
      faqs: [
        { q: "怎么知道我的冷气需要化学清洗还是化学大修？", a: "化学清洗（RM 120起）在墙上直接清洗盘管 — 适合制冷变弱、异味、风量慢。化学大修（RM 220起）完全拆下室内机深度清洁 — 适合漏水、结冰或2年以上未深度清洗的机器。基本原则：性能问题用清洗，漏水结冰用大修。" },
        { q: "马来西亚的冷气应该多久保养一次？", a: "基本保养每3–6个月一次，压力化学清洗每12个月一次 — 如果每天运行8小时以上则每6–8个月一次。靠近繁忙道路或建筑工地的机器因灰尘多需要更频繁清洗。" },
        { q: "我的冷气不冷但室外机在运转，需要什么服务？", a: "这通常是冷媒不足或电容故障。预约检测（RM 88，同次维修可免）或加气并附带检漏。KL Renovator用压力表测量压力并在现场确认原因。" },
        { q: "为什么我的冷气有异味？", a: "霉味意味着蒸发器盘管和风轮上积累了霉菌、细菌和生物膜 — 在吉隆坡潮湿气候中非常常见。压力化学清洗（从RM 120起）可溶解生物膜并恢复洁净气流。若清洗后异味仍在，可能需要大修。" },
        { q: "在吉隆坡和雪兰莪保养冷气要多少钱？", a: "基本保养从RM 99起，压力化学清洗从RM 120起（1.0–1.5匹挂壁式），化学大修从RM 220起，加气每PSI RM 2.50（R22）或RM 3.00（R410A/R32）。天花板卡式和商用机单独计价。每项价格在动工前确认。" },
        { q: "你能为我推荐正确的冷气服务吗？", a: "可以 — 使用此工具立即获得建议，或将您的症状（不冷、漏水、噪音、异味、错误代码）通过WhatsApp +60182983573发送，KL Renovator当天就会给出正确服务和透明价格。" },
      ],
      webAppName: "KL Renovator 冷气服务推荐工具",
      howToName: "如何选择正确的冷气服务",
    },
  },

  // ── 4. Aircond size calculator ──────────────────────────────────────────
  size: {
    en: {
      eyebrow: "Free Instant Estimate",
      h1: "Aircond Size Calculator",
      intro:
        "Find the right aircond capacity for your room in Malaysia. Enter your room size, room type, usage intensity and heat exposure — the calculator recommends the exact HP, BTU and suitable aircond capacity, using the standard Malaysian sizing formula (~25 BTU per square foot with adjustments).",
      howItWorksTitle: "How This Calculator Works",
      howItWorks: [
        "Enter your room length and width in feet — the calculator works out the area in square feet automatically.",
        "Choose the room type: bedroom, master bedroom, living room, home office, kitchen or shop/retail. Kitchens and shops need more cooling power.",
        "Select the usage intensity — light, standard or heavy (12+ hours a day or unusually hot rooms).",
        "Select the heat exposure — low (shaded/north-facing), medium (partial sun) or high (west-facing or top floor).",
        "The calculator applies the standard formula: area × 25 BTU, adjusted by room type, usage and heat exposure multipliers.",
        "The result shows the recommended HP, BTU and suitable aircond capacity — plus the installation starting price for that size.",
      ],
      factors: [
        { title: "Room size (sqft)", desc: "The base rule: ~25 BTU per square foot. A 120 sqft bedroom needs about 9,000 BTU (1.0 HP); a 250 sqft living room needs about 12,000–18,000 BTU (1.5–2.0 HP)." },
        { title: "Room type", desc: "Master bedrooms (+10%), living rooms (+15%), kitchens (+30%) and shops/retail (+25%) need more cooling than standard bedrooms." },
        { title: "Usage intensity", desc: "Rooms used 12+ hours a day, or rooms with lots of electronics and appliances, need ~15% more capacity (heavy usage multiplier)." },
        { title: "Heat exposure", desc: "West-facing rooms and top-floor units absorb much more heat — up to 25% more capacity is needed (high exposure multiplier)." },
        { title: "Ceiling height", desc: "Rooms with ceilings above 10 ft need extra capacity — about 10% more per extra foot. Use the BTU calculator for a detailed height-adjusted estimate." },
        { title: "People & windows", desc: "Each person beyond two adds about 600 BTU, and each large window beyond the first adds about 600 BTU. The detailed BTU calculator includes both." },
      ],
      faqs: [
        { q: "What size aircond do I need for a 12x10 room?", a: "A 12×10 ft room is 120 sqft. Using the standard formula it needs about 9,000 BTU — a 1.0 HP aircond is the right size for a normal bedroom with standard sun exposure." },
        { q: "How many square feet does a 1.5 HP aircond cool?", a: "A 1.5 HP aircond (12,000 BTU) typically cools 150–250 sqft. It suits larger master bedrooms, small living rooms and home offices. For rooms above 250 sqft, consider 2.0 HP (up to 380 sqft)." },
        { q: "What HP aircond do I need for a living room in Malaysia?", a: "A typical Malaysian living room of 200–300 sqft needs 1.5–2.0 HP. West-facing or open-concept living rooms with high heat exposure should go up a size — 2.0–2.5 HP — to avoid long cooling times and high electricity bills." },
        { q: "How many BTU do I need per square foot?", a: "The Malaysian standard is about 25 BTU per square foot, adjusted for room type, sun exposure, ceiling height, occupants and windows. A 100 sqft bedroom ≈ 2,500 BTU base before adjustments ≈ 1.0 HP (9,000 BTU)." },
        { q: "What happens if my aircond is the wrong size?", a: "An undersized unit runs non-stop, never cools properly and wastes electricity. An oversized unit short-cycles — it cools the air quickly but never dehumidifies properly, which makes the room feel cold and damp, and it wears out faster. Getting the size right matters as much as the brand." },
        { q: "Is 1.5 HP enough for a master bedroom?", a: "Usually yes — most Malaysian master bedrooms are 150–250 sqft, which is exactly the 1.5 HP sweet spot. If your master bedroom is west-facing, has high ceilings or large windows, check the detailed BTU calculator — you may need 2.0 HP." },
      ],
      webAppName: "KL Renovator Aircond Size Calculator",
      howToName: "How to Choose the Right Aircond Size for Your Room",
    },
    ms: {
      eyebrow: "Anggaran Percuma Segera",
      h1: "Kalkulator Saiz Aircond",
      intro:
        "Cari kapasiti aircond yang betul untuk bilik anda di Malaysia. Masukkan saiz bilik, jenis bilik, intensiti penggunaan dan pendedahan haba — kalkulator mencadangkan HP, BTU dan kapasiti aircond yang sesuai, menggunakan formula saiz standard Malaysia (~25 BTU per kaki persegi dengan pelarasan).",
      howItWorksTitle: "Cara Kalkulator Ini Berfungsi",
      howItWorks: [
        "Masukkan panjang dan lebar bilik dalam kaki — kalkulator mengira luas dalam kaki persegi secara automatik.",
        "Pilih jenis bilik: bilik tidur, bilik tidur utama, ruang tamu, pejabat rumah, dapur atau kedai/runcit. Dapur dan kedai perlukan kuasa penyejukan lebih.",
        "Pilih intensiti penggunaan — ringan, standard atau berat (12+ jam sehari atau bilik yang luar biasa panas).",
        "Pilih pendedahan haba — rendah (teduh/menghadap utara), sederhana (separa matahari) atau tinggi (menghadap barat atau tingkat atas).",
        "Kalkulator menggunakan formula standard: luas × 25 BTU, dilaraskan dengan pengganda jenis bilik, penggunaan dan pendedahan haba.",
        "Keputusan menunjukkan HP, BTU dan kapasiti aircond yang disyorkan — serta harga permulaan pemasangan untuk saiz tersebut.",
      ],
      factors: [
        { title: "Saiz bilik (kaki persegi)", desc: "Peraturan asas: ~25 BTU per kaki persegi. Bilik tidur 120 kaki persegi perlukan kira-kira 9,000 BTU (1.0 HP); ruang tamu 250 kaki persegi perlukan kira-kira 12,000–18,000 BTU (1.5–2.0 HP)." },
        { title: "Jenis bilik", desc: "Bilik tidur utama (+10%), ruang tamu (+15%), dapur (+30%) dan kedai/runcit (+25%) perlukan lebih penyejukan daripada bilik tidur standard." },
        { title: "Intensiti penggunaan", desc: "Bilik digunakan 12+ jam sehari, atau bilik dengan banyak elektronik dan peralatan, perlukan ~15% lebih kapasiti (pengganda penggunaan berat)." },
        { title: "Pendedahan haba", desc: "Bilik menghadap barat dan unit tingkat atas menyerap lebih banyak haba — sehingga 25% lebih kapasiti diperlukan (pengganda pendedahan tinggi)." },
        { title: "Tinggi siling", desc: "Bilik dengan siling melebihi 10 kaki perlukan kapasiti tambahan — kira-kira 10% lebih setiap kaki tambahan. Gunakan kalkulator BTU untuk anggaran terperinci." },
        { title: "Orang & tingkap", desc: "Setiap orang melebihi dua menambah kira-kira 600 BTU, dan setiap tingkap besar melebihi yang pertama menambah kira-kira 600 BTU. Kalkulator BTU terperinci merangkumi kedua-duanya." },
      ],
      faqs: [
        { q: "Saiz aircond apa yang saya perlukan untuk bilik 12x10?", a: "Bilik 12×10 kaki ialah 120 kaki persegi. Menggunakan formula standard ia perlukan kira-kira 9,000 BTU — aircond 1.0 HP adalah saiz yang tepat untuk bilik tidur biasa dengan pendedahan matahari standard." },
        { q: "Berapa kaki persegi yang disejukkan oleh aircond 1.5 HP?", a: "Aircond 1.5 HP (12,000 BTU) biasanya menyejukkan 150–250 kaki persegi. Ia sesuai untuk bilik tidur utama yang lebih besar, ruang tamu kecil dan pejabat rumah. Untuk bilik melebihi 250 kaki persegi, pertimbangkan 2.0 HP (sehingga 380 kaki persegi)." },
        { q: "HP apa yang saya perlukan untuk ruang tamu di Malaysia?", a: "Ruang tamu Malaysia biasa 200–300 kaki persegi perlukan 1.5–2.0 HP. Ruang tamu menghadap barat atau konsep terbuka dengan pendedahan haba tinggi patut naik satu saiz — 2.0–2.5 HP — untuk elak masa penyejukan lama dan bil elektrik tinggi." },
        { q: "Berapa BTU yang saya perlukan setiap kaki persegi?", a: "Standard Malaysia ialah kira-kira 25 BTU per kaki persegi, dilaraskan untuk jenis bilik, pendedahan matahari, tinggi siling, penghuni dan tingkap. Bilik tidur 100 kaki persegi ≈ 2,500 BTU asas sebelum pelarasan ≈ 1.0 HP (9,000 BTU)." },
        { q: "Apa yang berlaku jika aircond saya saiz yang salah?", a: "Unit terlalu kecil berjalan tanpa henti, tidak pernah menyejuk dengan betul dan membazir elektrik. Unit terlalu besar kitar pendek — menyejuk udara dengan cepat tetapi tidak menyahlembap dengan betul, menyebabkan bilik terasa sejuk dan lembap, dan haus lebih cepat. Saiz yang betul sama pentingnya dengan jenama." },
        { q: "Adakah 1.5 HP cukup untuk bilik tidur utama?", a: "Biasanya ya — kebanyakan bilik tidur utama Malaysia ialah 150–250 kaki persegi, tepat di zon ideal 1.5 HP. Jika bilik tidur utama anda menghadap barat, siling tinggi atau tingkap besar, semak kalkulator BTU terperinci — anda mungkin perlukan 2.0 HP." },
      ],
      webAppName: "Kalkulator Saiz Aircond KL Renovator",
      howToName: "Cara Pilih Saiz Aircond yang Tepat untuk Bilik Anda",
    },
    zh: {
      eyebrow: "免费即时估价",
      h1: "冷气尺寸计算器",
      intro:
        "为您的房间找到合适的冷气容量。输入房间尺寸、房间类型、使用强度和受热情况 — 计算器根据马来西亚标准尺寸公式（每平方英尺约25 BTU并进行调整）推荐精确的匹数、BTU和合适的冷气容量。",
      howItWorksTitle: "计算器使用方法",
      howItWorks: [
        "输入房间的长和宽（英尺）— 计算器自动算出面积（平方英尺）。",
        "选择房间类型：卧室、主卧室、客厅、家庭办公室、厨房或店铺/零售。厨房和店铺需要更大制冷量。",
        "选择使用强度 — 轻度、标准或重度（每天12小时以上或异常热的房间）。",
        "选择受热情况 — 低（阴凉/朝北）、中（部分日照）或高（朝西或顶楼）。",
        "计算器应用标准公式：面积 × 25 BTU，并按房间类型、使用强度和受热倍数调整。",
        "结果显示推荐的匹数、BTU和合适的冷气容量 — 以及该规格的安装起价。",
      ],
      factors: [
        { title: "房间面积（平方英尺）", desc: "基本规则：每平方英尺约25 BTU。120平方英尺的卧室约需9,000 BTU（1.0匹）；250平方英尺的客厅约需12,000–18,000 BTU（1.5–2.0匹）。" },
        { title: "房间类型", desc: "主卧室（+10%）、客厅（+15%）、厨房（+30%）和店铺/零售（+25%）比标准卧室需要更大制冷量。" },
        { title: "使用强度", desc: "每天使用12小时以上的房间，或电子产品、电器多的房间，需要约15%更大容量（重度使用倍数）。" },
        { title: "受热情况", desc: "朝西的房间和顶楼单位吸收更多热量 — 需要多达25%的额外容量（高受热倍数）。" },
        { title: "天花板高度", desc: "天花板超过10英尺的房间需要额外容量 — 每多一英尺约增加10%。详细估算请使用BTU计算器。" },
        { title: "人数与窗户", desc: "超过两人每人增加约600 BTU，超过第一扇的每扇大窗户增加约600 BTU。详细的BTU计算器包含这两项。" },
      ],
      faqs: [
        { q: "12x10英尺的房间需要多大冷气？", a: "12×10英尺的房间是120平方英尺。按标准公式约需9,000 BTU — 普通卧室在标准日照下选择1.0匹冷气正好合适。" },
        { q: "1.5匹冷气能冷却多少平方英尺？", a: "1.5匹冷气（12,000 BTU）通常可冷却150–250平方英尺。适合较大的主卧室、小型客厅和家庭办公室。超过250平方英尺的房间考虑2.0匹（可达380平方英尺）。" },
        { q: "马来西亚的客厅需要多大匹数？", a: "典型马来西亚客厅200–300平方英尺需要1.5–2.0匹。朝西或开放式高受热的客厅应加大一档 — 2.0–2.5匹 — 以免制冷时间长、电费高。" },
        { q: "每平方英尺需要多少BTU？", a: "马来西亚标准约为每平方英尺25 BTU，并根据房间类型、日照、天花板高度、人数和窗户调整。100平方英尺卧室基础约2,500 BTU ≈ 1.0匹（9,000 BTU）。" },
        { q: "如果冷气尺寸选错会怎样？", a: "尺寸过小的机器不停运转、永远无法正常制冷并浪费电。尺寸过大的机器频繁启停 — 空气很快变冷但除湿不足，房间感觉又冷又潮湿，而且磨损更快。选对尺寸和选对品牌同样重要。" },
        { q: "主卧室用1.5匹够吗？", a: "通常够 — 多数马来西亚主卧室为150–250平方英尺，正是1.5匹的最佳区间。如果主卧室朝西、天花板高或窗户大，请使用详细BTU计算器 — 可能需要2.0匹。" },
      ],
      webAppName: "KL Renovator 冷气尺寸计算器",
      howToName: "如何为您的房间选择正确的冷气尺寸",
    },
  },

  // ── 5. Electricity cost calculator ───────────────────────────────────────
  electricity: {
    en: {
      eyebrow: "Free Instant Estimate",
      h1: "Aircond Electricity Cost Calculator",
      intro:
        "Estimate how much your aircond adds to your monthly TNB bill. Enter your HP, daily usage hours, days per month and your electricity rate (editable), and the calculator shows the estimated monthly cost in RM, energy used in kWh, and how much an inverter upgrade could save.",
      howItWorksTitle: "How This Calculator Works",
      howItWorks: [
        "Select your aircond horsepower (HP) — the calculator uses the typical running power draw for each size (e.g. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW).",
        "Enter how many hours per day the aircond runs and how many days per month.",
        "Enter your electricity rate. The default is the TNB domestic average of RM 0.509/kWh — check your bill and edit it for accuracy.",
        "The calculator multiplies power (kW) × hours × days × rate to get the estimated monthly cost in RM and kWh.",
        "The result includes a comparison tip: a dirty coil makes the unit run longer, and an inverter model typically cuts cooling electricity by ~35%.",
        "Send the result to KL Renovator on WhatsApp if your bill seems high — a chemical wash or service often restores efficiency.",
      ],
      factors: [
        { title: "Horsepower (HP)", desc: "A 1.0 HP unit draws about 0.9 kW, 1.5 HP about 1.2 kW, 2.0 HP about 1.7 kW, 2.5 HP about 2.1 kW and 3.0 HP about 2.5 kW while running." },
        { title: "Usage hours", desc: "Airconds running 8 hours a day cost roughly twice as much as those running 4 hours. Thermostat setting also matters — every degree lower adds about 5–8% consumption." },
        { title: "Electricity rate (editable)", desc: "TNB domestic tariffs are tiered from 21.8 sen to 57.1 sen per kWh. The RM 0.509/kWh default is a blended average; use the rate from your actual bill for precision." },
        { title: "Maintenance condition", desc: "A dirty evaporator coil and clogged filter reduce cooling efficiency by up to 40% — the unit runs longer to reach the same temperature. Regular chemical wash (from RM 120) keeps consumption at the rated level." },
        { title: "Inverter vs non-inverter", desc: "Inverter units typically use ~35% less electricity than non-inverter units. See the inverter savings calculator for monthly savings and payback period." },
      ],
      faqs: [
        { q: "How much electricity does an aircond use per month in Malaysia?", a: "A 1.0–1.5 HP aircond running 8 hours a day typically uses 200–290 kWh per month, costing roughly RM 100–180 at TNB domestic rates. A 2.0–2.5 HP unit running the same hours costs around RM 200–350. Actual usage depends on the model, thermostat setting, room size and how clean the unit is." },
        { q: "How do I calculate my aircond electricity cost?", a: "Multiply the unit's power draw in kW (e.g. 1.5 HP ≈ 1.2 kW) by daily usage hours, then by days per month to get kWh, then by your electricity rate (RM/kWh). Example: 1.2 kW × 8 hrs × 30 days = 288 kWh × RM 0.509 = about RM 147/month." },
        { q: "Why is my aircond electricity bill so high?", a: "The most common causes: a dirty coil or filter forcing longer runtimes, a low-refrigerant system that never reaches temperature, thermostat set very low, an oversized or undersized unit, or an old non-inverter unit. A chemical wash (from RM 120) and service restore efficiency; upgrading to inverter saves ~35%." },
        { q: "Does an inverter aircond really save electricity?", a: "Yes — inverter compressors run at variable speed instead of stop-start, which typically cuts cooling electricity by 30–40% in Malaysian conditions. For an 8-hour daily usage, a 1.5 HP inverter often saves RM 50–70 per month compared with an equivalent non-inverter unit." },
        { q: "What is the TNB electricity rate for aircond use?", a: "TNB domestic (Residential) tariffs in 2026 are tiered: 21.8 sen/kWh for the first 200 kWh, 33.4 sen for 201–300 kWh, 51.6 sen for 301–600 kWh, 54.6 sen for 601–900 kWh and 57.1 sen above 900 kWh. Use your bill's effective rate (total RM ÷ total kWh) for the most accurate estimate." },
      ],
      webAppName: "KL Renovator Aircond Electricity Cost Calculator",
      howToName: "How to Calculate Your Aircond Electricity Cost in Malaysia",
    },
    ms: {
      eyebrow: "Anggaran Percuma Segera",
      h1: "Kalkulator Kos Elektrik Aircond",
      intro:
        "Anggarkan berapa banyak aircond anda menambah bil TNB bulanan. Masukkan HP, jam penggunaan harian, hari sebulan dan kadar elektrik anda (boleh sunting), dan kalkulator menunjukkan anggaran kos bulanan dalam RM, tenaga dalam kWh, dan berapa banyak penjimatan yang boleh diberikan oleh naik taraf inverter.",
      howItWorksTitle: "Cara Kalkulator Ini Berfungsi",
      howItWorks: [
        "Pilih kuasa kuda (HP) aircond anda — kalkulator menggunakan penggunaan kuasa biasa untuk setiap saiz (cth. 1.0 HP ≈ 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW).",
        "Masukkan berapa jam sehari aircond berjalan dan berapa hari sebulan.",
        "Masukkan kadar elektrik anda. Lalai ialah purata domestik TNB RM 0.509/kWh — semak bil anda dan sunting untuk ketepatan.",
        "Kalkulator mendarab kuasa (kW) × jam × hari × kadar untuk mendapat anggaran kos bulanan dalam RM dan kWh.",
        "Keputusan termasuk tip perbandingan: gegelung kotor membuat unit berjalan lebih lama, dan model inverter biasanya menjimatkan ~35% elektrik penyejukan.",
        "Hantar keputusan kepada KL Renovator melalui WhatsApp jika bil anda kelihatan tinggi — cuci kimia atau servis selalunya memulihkan kecekapan.",
      ],
      factors: [
        { title: "Kuasa Kuda (HP)", desc: "Unit 1.0 HP menggunakan kira-kira 0.9 kW, 1.5 HP ≈ 1.2 kW, 2.0 HP ≈ 1.7 kW, 2.5 HP ≈ 2.1 kW dan 3.0 HP ≈ 2.5 kW semasa berjalan." },
        { title: "Jam penggunaan", desc: "Aircond berjalan 8 jam sehari kosnya lebih kurang dua kali ganda daripada 4 jam sehari. Tetapan termostat juga penting — setiap darjah lebih rendah menambah kira-kira 5–8% penggunaan." },
        { title: "Kadar elektrik (boleh sunting)", desc: "Tarif domestik TNB berperingkat dari 21.8 sen hingga 57.1 sen per kWh. Lalai RM 0.509/kWh ialah purata gabungan; gunakan kadar dari bil sebenar anda untuk ketepatan." },
        { title: "Keadaan penyelenggaraan", desc: "Gegelung evaporator kotor dan penapis tersumbat mengurangkan kecekapan penyejukan sehingga 40% — unit berjalan lebih lama untuk mencapai suhu sama. Cuci kimia berkala (dari RM 120) mengekalkan penggunaan pada tahap kadar." },
        { title: "Inverter vs bukan inverter", desc: "Unit inverter biasanya menggunakan ~35% kurang elektrik daripada unit bukan inverter. Lihat kalkulator penjimatan inverter untuk penjimatan bulanan dan tempoh pulangan." },
      ],
      faqs: [
        { q: "Berapa banyak elektrik yang digunakan aircond sebulan di Malaysia?", a: "Aircond 1.0–1.5 HP berjalan 8 jam sehari biasanya menggunakan 200–290 kWh sebulan, berharga kira-kira RM 100–180 pada kadar domestik TNB. Unit 2.0–2.5 HP dengan jam sama berharga sekitar RM 200–350. Penggunaan sebenar bergantung pada model, tetapan termostat, saiz bilik dan kebersihan unit." },
        { q: "Macam mana saya kira kos elektrik aircond?", a: "Darabkan penggunaan kuasa unit dalam kW (cth. 1.5 HP ≈ 1.2 kW) dengan jam penggunaan harian, kemudian hari sebulan untuk dapat kWh, kemudian kadar elektrik anda (RM/kWh). Contoh: 1.2 kW × 8 jam × 30 hari = 288 kWh × RM 0.509 = kira-kira RM 147/bulan." },
        { q: "Kenapa bil elektrik aircond saya tinggi?", a: "Punca paling biasa: gegelung atau penapis kotor memaksa jangka masa lebih lama, sistem gas rendah yang tidak pernah mencapai suhu, termostat ditetapkan sangat rendah, unit terlalu besar atau kecil, atau unit bukan inverter lama. Cuci kimia (dari RM 120) dan servis memulihkan kecekapan; naik taraf inverter menjimatkan ~35%." },
        { q: "Adakah aircond inverter benar-benar menjimatkan elektrik?", a: "Ya — pemampat inverter berjalan pada kelajuan berubah dan bukannya henti-mula, yang biasanya mengurangkan elektrik penyejukan 30–40% dalam keadaan Malaysia. Untuk penggunaan 8 jam sehari, inverter 1.5 HP sering menjimatkan RM 50–70 sebulan berbanding unit bukan inverter setara." },
        { q: "Apakah kadar elektrik TNB untuk penggunaan aircond?", a: "Tarif domestik (Kediaman) TNB 2026 berperingkat: 21.8 sen/kWh untuk 200 kWh pertama, 33.4 sen untuk 201–300 kWh, 51.6 sen untuk 301–600 kWh, 54.6 sen untuk 601–900 kWh dan 57.1 sen melebihi 900 kWh. Gunakan kadar efektif bil anda (jumlah RM ÷ jumlah kWh) untuk anggaran paling tepat." },
      ],
      webAppName: "Kalkulator Kos Elektrik Aircond KL Renovator",
      howToName: "Cara Kira Kos Elektrik Aircond di Malaysia",
    },
    zh: {
      eyebrow: "免费即时估价",
      h1: "冷气电费计算器",
      intro:
        "估算您的冷气每月为国能（TNB）账单增加多少费用。输入匹数、每日使用小时数、每月天数和您的电费费率（可编辑），计算器将显示每月预计费用（RM）、用电量（kWh），以及升级变频机能节省多少。",
      howItWorksTitle: "计算器使用方法",
      howItWorks: [
        "选择冷气匹数（HP）— 计算器使用各规格的典型运行功率（例如1.0匹≈0.9千瓦，1.5匹≈1.2千瓦，2.0匹≈1.7千瓦）。",
        "输入冷气每天运行几小时、每月运行几天。",
        "输入您的电费费率。默认值为TNB家庭平均RM 0.509/kWh — 请查看您的账单并修改以获得准确结果。",
        "计算器将功率（千瓦）× 小时 × 天数 × 费率相乘，得出每月预计费用（RM）和用电量（kWh）。",
        "结果包含对比提示：盘管脏污会让机器运行更久，而变频机型通常可节省约35%的制冷用电。",
        "如果您的账单偏高，可通过WhatsApp将结果发送给KL Renovator — 化学清洗或保养通常能恢复效率。",
      ],
      factors: [
        { title: "匹数（HP）", desc: "运行中1.0匹约0.9千瓦、1.5匹约1.2千瓦、2.0匹约1.7千瓦、2.5匹约2.1千瓦、3.0匹约2.5千瓦。" },
        { title: "使用小时数", desc: "每天运行8小时的冷气费用约为4小时的两倍。恒温器设置也很重要 — 每调低一度约增加5–8%用电。" },
        { title: "电费费率（可编辑）", desc: "TNB家庭电价分层为每千瓦时21.8仙至57.1仙。默认RM 0.509/kWh是混合平均值；使用实际账单中的费率更精确。" },
        { title: "保养状况", desc: "蒸发器盘管脏污和滤网堵塞会使制冷效率下降多达40% — 机器需要运行更久才能达到相同温度。定期化学清洗（从RM 120起）可让耗电保持额定水平。" },
        { title: "变频与非变频", desc: "变频机型通常比非变频机型节省约35%用电。请参阅变频节省计算器了解每月节省和回本周期。" },
      ],
      faqs: [
        { q: "马来西亚的冷气每月耗电多少？", a: "1.0–1.5匹冷气每天运行8小时，每月约耗电200–290千瓦时，按TNB家庭电价约RM 100–180。2.0–2.5匹同小时数约RM 200–350。实际耗电取决于型号、恒温器设置、房间大小和机器清洁度。" },
        { q: "如何计算冷气电费？", a: "将机器功率（千瓦，如1.5匹≈1.2千瓦）乘以每日使用小时数，再乘以每月天数得到千瓦时，再乘以电费费率（RM/千瓦时）。例如：1.2千瓦×8小时×30天=288千瓦时×RM 0.509≈每月RM 147。" },
        { q: "为什么我的冷气电费这么高？", a: "最常见的原因：盘管或滤网脏导致运行时间更长、冷媒不足无法达到设定温度、恒温器设置过低、机器尺寸不当、或是老旧非变频机型。化学清洗（从RM 120起）和保养可恢复效率；升级变频可节省约35%。" },
        { q: "变频冷气真的省电吗？", a: "是的 — 变频压缩机以变速运行而非启停，在马来西亚条件下通常可节省30–40%的制冷用电。每天使用8小时的情况下，1.5匹变频机每月通常可比同等非变频机节省RM 50–70。" },
        { q: "TNB冷气用电费率是多少？", a: "2026年TNB家庭（住宅）电价分层：前200千瓦时21.8仙/千瓦时，201–300千瓦时33.4仙，301–600千瓦时51.6仙，601–900千瓦时54.6仙，900千瓦时以上57.1仙。使用账单的有效费率（总额RM÷总千瓦时）估算最准确。" },
      ],
      webAppName: "KL Renovator 冷气电费计算器",
      howToName: "如何计算马来西亚冷气电费",
    },
  },

  // ── 6. Inverter savings calculator ───────────────────────────────────────
  savings: {
    en: {
      eyebrow: "Free Instant Estimate",
      h1: "Inverter Aircond Savings Calculator",
      intro:
        "Wondering whether upgrading from your old non-inverter aircond to a new inverter unit is worth it? Enter your HP, usage and electricity rate, and the calculator estimates your monthly savings, yearly savings and the payback period for the inverter price difference — with a clean visual comparison.",
      howItWorksTitle: "How This Calculator Works",
      howItWorks: [
        "Select the horsepower (HP) of your current aircond.",
        "Enter your daily usage hours and days per month — inverter savings grow with runtime, so 8+ hours a day makes the upgrade far more attractive.",
        "Set your electricity rate (default RM 0.509/kWh, the TNB domestic average — edit to match your bill).",
        "Enter the inverter price difference for the same HP — the typical market premium is pre-filled and fully editable.",
        "The calculator compares the electricity used by a non-inverter unit against an inverter unit (which uses ~35% less) and computes monthly savings, yearly savings and the payback period.",
        "The result shows a visual kWh comparison bar, and you can send the numbers to KL Renovator on WhatsApp to discuss the installation.",
      ],
      factors: [
        { title: "Runtime matters most", desc: "Inverter savings are proportional to usage. A unit running 8+ hours a day can save RM 50–150/month; a unit used 2 hours a day will take much longer to pay back the premium." },
        { title: "HP size", desc: "Bigger units use more electricity, so the absolute savings (and the price premium) are higher for 2.0 HP+ units." },
        { title: "Your electricity rate", desc: "TNB rates are tiered. Use the effective rate from your bill (total RM ÷ total kWh) for the most accurate savings figure." },
        { title: "Price premium", desc: "Inverter units typically cost RM 500–1,200 more than equivalent non-inverter units depending on HP and brand. The calculator lets you enter the exact quote you received." },
        { title: "Maintenance condition", desc: "A dirty non-inverter unit wastes even more electricity — servicing it (chemical wash from RM 120) is the cheapest efficiency fix and can be combined with an inverter upgrade decision." },
      ],
      faqs: [
        { q: "How much can I save with an inverter aircond in Malaysia?", a: "Inverter airconds typically use about 35% less electricity than non-inverter units. For a 1.5 HP unit running 8 hours/day at RM 0.509/kWh, that is roughly RM 50–60/month or RM 600–700/year in electricity savings alone." },
        { q: "How long does an inverter aircond take to pay back?", a: "With typical 8-hour daily usage, the inverter price premium (usually RM 500–1,200) pays back in about 1–2 years. After that, the savings are pure gain — and inverter units also cool more quietly and hold temperature more steadily." },
        { q: "Is it worth changing from non-inverter to inverter aircond?", a: "If your unit runs 6+ hours a day, yes — the electricity savings usually cover the price difference within 1–3 years, and inverter units last longer because the compressor does not stop-start. For light usage under 3 hours a day, the payback is slower and a well-maintained non-inverter may make more sense." },
        { q: "Does an inverter aircond save 50% on electricity?", a: "Not exactly — 30–40% is the realistic range for cooling electricity in Malaysian conditions. The exact saving depends on runtime pattern, room heat load and temperature setting. KL Renovator's calculator uses a conservative 35%." },
        { q: "Can KL Renovator install the inverter aircond I buy?", a: "Yes — KL Renovator installs all 20 major brands, inverter and non-inverter, wall-mounted, ceiling cassette and window units. Installation starts from RM 199 (1.0–1.5 HP wall-mounted) including 7 ft of copper pipe, wire and drain pipe, vacuum pump commissioning and a 1-month workmanship warranty." },
      ],
      webAppName: "KL Renovator Inverter Aircond Savings Calculator",
      howToName: "How to Calculate Inverter Aircond Savings in Malaysia",
    },
    ms: {
      eyebrow: "Anggaran Percuma Segera",
      h1: "Kalkulator Penjimatan Aircond Inverter",
      intro:
        "Tertanya-tanya sama ada naik taraf dari aircond bukan inverter lama kepada unit inverter baharu berbaloi? Masukkan HP, penggunaan dan kadar elektrik anda, dan kalkulator menganggarkan penjimatan bulanan, penjimatan tahunan dan tempoh pulangan untuk perbezaan harga inverter — dengan perbandingan visual yang jelas.",
      howItWorksTitle: "Cara Kalkulator Ini Berfungsi",
      howItWorks: [
        "Pilih kuasa kuda (HP) aircond semasa anda.",
        "Masukkan jam penggunaan harian dan hari sebulan — penjimatan inverter meningkat dengan masa penggunaan, jadi 8+ jam sehari menjadikan naik taraf jauh lebih menarik.",
        "Tetapkan kadar elektrik anda (lalai RM 0.509/kWh, purata domestik TNB — sunting mengikut bil anda).",
        "Masukkan perbezaan harga inverter untuk HP yang sama — premium pasaran biasa diisi awal dan boleh disunting sepenuhnya.",
        "Kalkulator membandingkan elektrik yang digunakan unit bukan inverter dengan unit inverter (yang menggunakan ~35% kurang) dan mengira penjimatan bulanan, penjimatan tahunan dan tempoh pulangan.",
        "Keputusan menunjukkan bar perbandingan kWh visual, dan anda boleh hantar nombor kepada KL Renovator melalui WhatsApp untuk membincangkan pemasangan.",
      ],
      factors: [
        { title: "Masa penggunaan paling penting", desc: "Penjimatan inverter berkadar dengan penggunaan. Unit berjalan 8+ jam sehari boleh jimat RM 50–150/bulan; unit digunakan 2 jam sehari mengambil masa lebih lama untuk pulangan premium." },
        { title: "Saiz HP", desc: "Unit lebih besar menggunakan lebih elektrik, jadi penjimatan mutlak (dan premium harga) lebih tinggi untuk unit 2.0 HP+." },
        { title: "Kadar elektrik anda", desc: "Kadar TNB berperingkat. Gunakan kadar efektif dari bil anda (jumlah RM ÷ jumlah kWh) untuk angka penjimatan paling tepat." },
        { title: "Premium harga", desc: "Unit inverter biasanya berharga RM 500–1,200 lebih daripada unit bukan inverter setara bergantung pada HP dan jenama. Kalkulator membolehkan anda memasukkan sebut harga tepat yang anda terima." },
        { title: "Keadaan penyelenggaraan", desc: "Unit bukan inverter yang kotor membazir lebih elektrik — servisnya (cuci kimia dari RM 120) ialah penyelesaian kecekapan paling murah dan boleh digabungkan dengan keputusan naik taraf inverter." },
      ],
      faqs: [
        { q: "Berapa banyak saya boleh jimat dengan aircond inverter di Malaysia?", a: "Aircond inverter biasanya menggunakan kira-kira 35% kurang elektrik daripada unit bukan inverter. Untuk unit 1.5 HP berjalan 8 jam/hari pada RM 0.509/kWh, itu kira-kira RM 50–60/bulan atau RM 600–700/tahun dalam penjimatan elektrik sahaja." },
        { q: "Berapa lama aircond inverter mengambil masa untuk pulangan modal?", a: "Dengan penggunaan 8 jam sehari yang biasa, premium harga inverter (biasanya RM 500–1,200) pulang dalam kira-kira 1–2 tahun. Selepas itu, penjimatan adalah untung penuh — dan unit inverter juga menyejuk lebih senyap dan mengekalkan suhu lebih stabil." },
        { q: "Adakah berbaloi menukar dari bukan inverter kepada inverter?", a: "Jika unit anda berjalan 6+ jam sehari, ya — penjimatan elektrik biasanya menampung perbezaan harga dalam 1–3 tahun, dan unit inverter tahan lebih lama kerana pemampat tidak henti-mula. Untuk penggunaan ringan di bawah 3 jam sehari, pulangan lebih perlahan dan bukan inverter yang diselenggara baik mungkin lebih masuk akal." },
        { q: "Adakah aircond inverter menjimatkan 50% elektrik?", a: "Tidak tepat — 30–40% ialah julat realistik untuk elektrik penyejukan dalam keadaan Malaysia. Penjimatan tepat bergantung pada corak penggunaan, beban haba bilik dan tetapan suhu. Kalkulator KL Renovator menggunakan 35% yang konservatif." },
        { q: "Bolehkah KL Renovator memasang inverter yang saya beli?", a: "Ya — KL Renovator memasang semua 20 jenama utama, inverter dan bukan inverter, dinding, ceiling cassette dan tingkap. Pemasangan bermula dari RM 199 (1.0–1.5 HP dinding) termasuk 7 kaki paip tembaga, wayar dan paip saliran, pendakap, commissioning pam vakum dan waranti mutu kerja 1 bulan." },
      ],
      webAppName: "Kalkulator Penjimatan Aircond Inverter KL Renovator",
      howToName: "Cara Kira Penjimatan Aircond Inverter di Malaysia",
    },
    zh: {
      eyebrow: "免费即时估价",
      h1: "变频冷气节省计算器",
      intro:
        "想知道把旧的非变频冷气升级为新型变频机是否值得？输入匹数、使用情况和电费费率，计算器将估算每月节省、每年节省以及变频差价的回本周期 — 并配有清晰的直观对比。",
      howItWorksTitle: "计算器使用方法",
      howItWorks: [
        "选择您现有冷气的匹数（HP）。",
        "输入每日使用小时数和每月天数 — 变频节省随运行时间增长，每天8小时以上升级更划算。",
        "设置电费费率（默认RM 0.509/kWh，TNB家庭平均值 — 按您的账单修改）。",
        "输入同匹数变频机的差价 — 典型市场溢价已预填，完全可编辑。",
        "计算器对比非变频机和变频机（节省约35%）的用电量，并计算每月节省、每年节省和回本周期。",
        "结果显示直观的千瓦时对比条，您还可以通过WhatsApp将数据发送给KL Renovator讨论安装。",
      ],
      factors: [
        { title: "运行时间最重要", desc: "变频节省与使用量成正比。每天运行8小时以上的机器每月可省RM 50–150；每天仅用2小时的机器回本要慢得多。" },
        { title: "匹数大小", desc: "匹数越大用电越多，因此2.0匹以上机型的绝对节省（和价格溢价）更高。" },
        { title: "您的电费费率", desc: "TNB费率分层。使用账单中的有效费率（总额RM÷总千瓦时）计算最准确。" },
        { title: "价格溢价", desc: "变频机通常比同匹数非变频机贵RM 500–1,200，视匹数和品牌而定。计算器允许您输入收到的确切报价。" },
        { title: "保养状况", desc: "脏污的非变频机更费电 — 保养它（化学清洗从RM 120起）是最便宜的效率修复，也可与变频升级决策结合。" },
      ],
      faqs: [
        { q: "在马来西亚用变频冷气能省多少钱？", a: "变频冷气通常比非变频机节省约35%用电。以1.5匹每天运行8小时、RM 0.509/kWh计算，仅电费每月约省RM 50–60，每年RM 600–700。" },
        { q: "变频冷气多久能回本？", a: "按典型的每天8小时使用，变频差价（通常RM 500–1,200）约1–2年回本。之后节省就是纯收益 — 而且变频机运行更安静、温度更稳定。" },
        { q: "从非变频换成变频值得吗？", a: "如果机器每天运行6小时以上，值得 — 电费节省通常在1–3年内覆盖差价，而且变频机因压缩机不频繁启停而更耐用。每天使用不足3小时则回本较慢，保养良好的非变频机可能更划算。" },
        { q: "变频冷气能省50%电吗？", a: "不完全是 — 马来西亚条件下30–40%是现实范围。确切节省取决于运行模式、房间热负荷和温度设置。KL Renovator计算器采用保守的35%。" },
        { q: "KL Renovator能安装我买的变频冷气吗？", a: "可以 — KL Renovator安装全部20个主要品牌，变频和非变频，挂壁式、天花板卡式和窗式。安装从RM 199起（1.0–1.5匹挂壁式），包含7英尺铜管、电线和排水管、支架、真空泵调试和1个月工艺保修。" },
      ],
      webAppName: "KL Renovator 变频冷气节省计算器",
      howToName: "如何计算马来西亚变频冷气节省",
    },
  },
};

export function getToolContent(key: ToolKey, lang: ToolLang): ToolContent {
  return TOOL_CONTENT[key][lang];
}
