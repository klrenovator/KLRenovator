import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FiCheck, FiArrowRight, FiChevronRight, FiAlertTriangle, FiTool } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return siteConfig.problemPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = siteConfig.problemPages.find((p) => p.slug === slug);
  if (!problem) return { title: "Not found" };

  return {
    title: problem.metaTitle,
    description: problem.metaDesc,
    keywords: [
      problem.name + " KL",
      problem.name + " Selangor",
      problem.name + " repair KL",
      problem.name + " fix KL",
      problem.nameMS + " KL",
      problem.nameZH + " 吉隆坡",
      "aircond problem KL",
      "aircond repair KL",
      "KL Renovator aircond",
    ].join(", "),
    openGraph: {
      title: problem.metaTitle,
      description: problem.metaDesc,
      url: `https://www.klrenovator.com/problems/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.klrenovator.com/problems/${slug}`,
    },
    other: {
      "title:ms": problem.metaTitleMS,
      "description:ms": problem.metaDescMS,
      "title:zh": problem.metaTitleZH,
      "description:zh": problem.metaDescZH,
    },
  };
}

// ─── Detailed content map ─────────────────────────────────────────────────────
const problemContent: Record<
  string,
  {
    causesEN: string[];
    causesBM: string[];
    causesZH: string[];
    solutionEN: string;
    solutionBM: string;
    solutionZH: string;
    warningEN: string;
    warningBM: string;
    warningZH: string;
    faqs: { q: string; a: string }[];
    faqsBM: { q: string; a: string }[];
    faqsZH: { q: string; a: string }[];
  }
> = {
  "aircond-not-cold": {
    causesEN: [
      "Low refrigerant gas (R22, R410A or R32) — most common cause",
      "Dirty or blocked evaporator coil reducing heat exchange",
      "Faulty capacitor preventing compressor from running at full speed",
      "Dirty air filter blocking airflow to the evaporator",
      "Refrigerant gas leak from a damaged copper pipe or valve",
      "Failing compressor that cannot maintain correct pressure",
    ],
    causesBM: [
      "Gas penyejuk rendah (R22, R410A atau R32) — punca paling biasa",
      "Gegelung penyejat kotor atau tersumbat mengurangkan pertukaran haba",
      "Kapasitor rosak menghalang pekali dari berjalan pada kelajuan penuh",
      "Penapis udara kotor menyekat aliran udara ke penyejat",
      "Kebocoran gas penyejuk dari paip tembaga atau injap yang rosak",
      "Pekali yang gagal tidak dapat mengekalkan tekanan yang betul",
    ],
    causesZH: [
      "制冷剂不足（R22、R410A或R32）——最常见的原因",
      "蒸发盘管脏污或堵塞，导致热交换效率降低",
      "电容器故障，导致压缩机无法全速运转",
      "空气过滤网脏污，阻碍气流流向蒸发器",
      "铜管或阀门损坏导致制冷剂泄漏",
      "压缩机老化，无法维持正确压力",
    ],
    solutionEN: "KL Renovator technicians first run a full system check — measuring discharge pressure, suction pressure, and temperature difference across the coil. If gas is low, the leak is located and repaired before topping up to the correct operating pressure. If the coil is dirty, a chemical wash restores heat exchange. If the capacitor is failing, it is replaced on the spot. You receive a transparent quote before any work starts.",
    solutionBM: "Juruteknik KL Renovator menjalankan pemeriksaan sistem penuh — mengukur tekanan pelepasan, tekanan sedutan dan perbezaan suhu. Jika gas rendah, kebocoran dikesan dan diperbaiki sebelum top-up ke tekanan operasi yang betul. Jika gegelung kotor, cuci kimia memulihkan pertukaran haba. Jika kapasitor rosak, ia diganti di tempat. Sebut harga telus diberikan sebelum kerja bermula.",
    solutionZH: "KL Renovator技术员进行全面系统检查——测量排放压力、吸入压力和盘管两端的温差。如果制冷剂不足，先找出并修复泄漏，然后充气至正确工作压力。如果盘管脏污，化学清洗可恢复热交换效率。如果电容器故障，当场更换。所有工作开始前提供透明报价。",
    warningEN: "Do not ignore an aircond that is not cold. A running but ineffective unit consumes full electricity while delivering no comfort — and low gas pressure damages the compressor over time.",
    warningBM: "Jangan abaikan aircond yang tidak sejuk. Unit yang berjalan tetapi tidak berkesan menggunakan elektrik penuh tanpa memberikan keselesaan — dan tekanan gas rendah merosakkan pekali dari masa ke masa.",
    warningZH: "不要忽视不冷的冷气。运转但无效的机组消耗全额电力却毫无舒适感——长期低气压还会损坏压缩机。",
    faqs: [
      { q: "My aircond is blowing air but it's warm. Is it low gas?", a: "Low gas is the most common cause, but a dirty coil or faulty capacitor can produce the same symptom. KL Renovator diagnoses all three before recommending a solution — you pay for what you actually need." },
      { q: "How much does it cost to fix an aircond that is not cold?", a: "If it is low gas: gas top-up from RM 120 (R22), RM 150 (R410A), RM 180 (R32). If it is a dirty coil: chemical wash from RM 120. If it is a faulty capacitor: RM 180 replacement. Diagnostic fee RM 88 (waived if repair done same visit)." },
      { q: "Can the aircond be fixed the same day?", a: "Yes. Most causes of an aircond not being cold — gas top-up, chemical wash, capacitor replacement — are done in one visit. KL Renovator carries common parts on the van." },
    ],
    faqsBM: [
      { q: "Aircond saya menghembus udara tetapi panas. Adakah gas rendah?", a: "Gas rendah adalah punca paling biasa, tetapi gegelung kotor atau kapasitor rosak boleh menghasilkan gejala yang sama. KL Renovator mendiagnosis ketiga-tiganya sebelum mencadangkan penyelesaian." },
      { q: "Berapa kos untuk membaiki aircond yang tidak sejuk?", a: "Jika gas rendah: top-up gas dari RM 120 (R22), RM 150 (R410A), RM 180 (R32). Jika gegelung kotor: cuci kimia dari RM 120. Jika kapasitor rosak: penggantian RM 180." },
    ],
    faqsZH: [
      { q: "我的冷气在吹风，但是是暖风。是气体不足吗？", a: "气体不足是最常见的原因，但脏污的盘管或故障的电容器也会产生相同症状。KL Renovator会先诊断全部三项，再提供建议。" },
      { q: "修理不冷的冷气需要多少费用？", a: "如果是气体不足：充气从RM 120（R22）、RM 150（R410A）、RM 180（R32）起。如果是盘管脏污：化学清洗从RM 120起。如果是电容器故障：更换RM 180。" },
    ],
  },
  "aircond-water-leaking": {
    causesEN: [
      "Blocked drain pipe — the most common cause in Malaysia's humid climate",
      "Dirty drain pan with mould and slime buildup preventing drainage",
      "Frozen evaporator coil that melts and overflows the drain pan",
      "Incorrect drain pipe slope installed during original installation",
      "Cracked or disconnected drain pipe inside the wall",
      "Severely dirty coil causing condensation overflow",
    ],
    causesBM: [
      "Paip longkang tersumbat — punca paling biasa dalam iklim lembap Malaysia",
      "Dulang longkang kotor dengan penumpukan kulat dan lendir menghalang saliran",
      "Gegelung penyejat beku yang cair dan melimpahi dulang longkang",
      "Kecerunan paip longkang yang salah semasa pemasangan asal",
      "Paip longkang retak atau terputus di dalam dinding",
      "Gegelung yang sangat kotor menyebabkan limpahan kondensasi",
    ],
    causesZH: [
      "排水管堵塞——马来西亚潮湿气候中最常见的原因",
      "排水盘内霉菌和粘液堆积，阻碍排水",
      "蒸发盘管结冰后融化，溢出排水盘",
      "原始安装时排水管坡度不正确",
      "墙内排水管破裂或断开",
      "盘管严重脏污导致冷凝水溢出",
    ],
    solutionEN: "KL Renovator technicians clear the blocked drain pipe using pressurised water flush, clean the drain pan, and inspect the full drainage path. For severe cases — cracked drain pan, disconnected pipe, or heavily soiled coil — a chemical overhaul permanently resolves the leaking. Drain pump installation is available for units where gravity drainage is not possible.",
    solutionBM: "Juruteknik KL Renovator membersihkan paip longkang yang tersumbat menggunakan semburan air bertekanan, membersihkan dulang longkang, dan memeriksa laluan saliran penuh. Untuk kes teruk — dulang longkang retak, paip terputus, atau gegelung sangat kotor — overhaul kimia menyelesaikan kebocoran secara kekal.",
    solutionZH: "KL Renovator技术员使用加压水冲洗清通堵塞的排水管，清洁排水盘，并检查完整排水路径。对于严重情况——排水盘破裂、管道断开或盘管严重脏污——化学大修可永久解决漏水问题。",
    warningEN: "A leaking aircond left unattended causes mould growth on walls and ceilings, water damage to furniture, electrical short circuit risk, and structural damage over time. Fix it immediately.",
    warningBM: "Aircond yang bocor dan dibiarkan menyebabkan pertumbuhan kulat di dinding dan siling, kerosakan air pada perabot, risiko litar pintas elektrik, dan kerosakan struktur dari masa ke masa.",
    warningZH: "长期不处理的漏水冷气会导致墙壁和天花板发霉、家具受水损坏、电气短路风险以及长期结构损坏。请立即修复。",
    faqs: [
      { q: "Why is my aircond dripping water inside the room?", a: "The indoor unit drips water when the drain pipe is blocked and the drain pan overflows. KL Renovator clears the blockage in one visit — starting from RM 120 for a drain clear and chemical wash." },
      { q: "How much does it cost to fix a leaking aircond in KL?", a: "Drain pipe clearing starts from RM 120. Chemical wash (recommended to prevent recurrence) from RM 120. Chemical overhaul for severe or recurring leaks from RM 220. Drain pump installation RM 300–400." },
      { q: "My aircond has been leaking for weeks. Is it serious?", a: "Yes. Prolonged leaking causes mould growth, ceiling damage and potential electrical risks. Book KL Renovator immediately via WhatsApp +60182983573 for same-day assessment." },
    ],
    faqsBM: [
      { q: "Mengapa aircond saya menitis air di dalam bilik?", a: "Unit dalaman menitis apabila paip longkang tersumbat dan dulang longkang melimpah. KL Renovator membersihkan halangan dalam satu lawatan — bermula dari RM 120." },
      { q: "Berapa kos untuk membaiki aircond bocor di KL?", a: "Pembersihan paip longkang bermula dari RM 120. Cuci kimia dari RM 120. Overhaul kimia untuk kebocoran teruk dari RM 220." },
    ],
    faqsZH: [
      { q: "为什么我的冷气在室内滴水？", a: "当排水管堵塞、排水盘溢水时，室内机就会滴水。KL Renovator一次上门即可清通堵塞，化学清洗从RM 120起。" },
      { q: "在KL修理漏水冷气需要多少费用？", a: "排水管清通从RM 120起。化学清洗从RM 120起。严重漏水的化学大修从RM 220起。排水泵安装RM 300–400。" },
    ],
  },
  "aircond-bad-smell": {
    causesEN: [
      "Mould and bacteria growing on the evaporator coil and blower wheel",
      "Dirty drain pan where stagnant water breeds bacteria and mildew",
      "Cigarette smoke, cooking odours or pet smells absorbed into the coil",
      "Dead insects or debris inside the unit decomposing over time",
      "Electrical burning smell — wiring insulation or component failure (urgent)",
      "Chemical smell — refrigerant gas leak (stop unit immediately)",
    ],
    causesBM: [
      "Kulat dan bakteria tumbuh pada gegelung penyejat dan roda penghembus",
      "Dulang longkang kotor tempat air bertakung membiak bakteria dan kulat",
      "Asap rokok, bau memasak atau bau haiwan peliharaan diserap ke dalam gegelung",
      "Serangga mati atau serpihan di dalam unit reput dari masa ke masa",
      "Bau elektrik terbakar — penebat wayar atau kegagalan komponen (segera)",
      "Bau kimia — kebocoran gas penyejuk (matikan unit serta-merta)",
    ],
    causesZH: [
      "霉菌和细菌在蒸发盘管和鼓风机叶轮上生长",
      "排水盘内积水滋生细菌和霉菌",
      "香烟烟雾、烹饪气味或宠物气味被盘管吸收",
      "机内死虫或异物随时间分解腐烂",
      "电气焦糊味——线路绝缘层或部件故障（紧急情况）",
      "化学气味——制冷剂泄漏（立即关机）",
    ],
    solutionEN: "A chemical wash (from RM 120) uses a food-safe chemical solution to kill mould and bacteria on the evaporator coil and blower wheel, permanently eliminating the smell. For severe mould infestation, a chemical overhaul (from RM 220) fully dismantles and sterilises every component.",
    solutionBM: "Cuci kimia (dari RM 120) menggunakan larutan kimia selamat makanan untuk membunuh kulat dan bakteria pada gegelung dan roda penghembus, menghapuskan bau secara kekal. Untuk serangan kulat teruk, overhaul kimia (dari RM 220) membongkar dan mensterilkan setiap komponen.",
    solutionZH: "化学清洗（从RM 120起）使用食品级化学溶液杀死蒸发盘管和鼓风机叶轮上的霉菌和细菌，永久消除异味。对于严重的霉菌侵扰，化学大修（从RM 220起）完全拆卸并消毒每个部件。",
    warningEN: "If you smell burning plastic or a sweet chemical/gas odour from the aircond, switch it off immediately and do not restart it. These smells indicate electrical failure or refrigerant leak.",
    warningBM: "Jika anda menghidu bau plastik terbakar atau bau kimia/gas yang manis dari aircond, matikannya serta-merta dan jangan hidupkan semula.",
    warningZH: "如果您闻到冷气机发出塑料燃烧气味或甜味化学/气体气味，请立即关机，不要重新启动。",
    faqs: [
      { q: "Why does my aircond smell musty or like dirty socks?", a: "A musty smell is caused by mould and bacteria growing on the evaporator coil. A chemical wash with food-safe solution kills the mould and eliminates the smell permanently. Starts from RM 120." },
      { q: "How long does it take to remove the smell from an aircond?", a: "After a chemical wash, most smells are eliminated on the same visit. For severe mould cases requiring a chemical overhaul, the unit is fully deodorised within one service session." },
      { q: "My aircond smells like something is burning. Is it dangerous?", a: "Yes. A burning smell from an aircond indicates an electrical fault. Switch off the unit immediately and call KL Renovator at +60182983573 for an emergency diagnostic." },
    ],
    faqsBM: [
      { q: "Mengapa aircond saya berbau hapak?", a: "Bau hapak disebabkan kulat dan bakteria yang tumbuh pada gegelung penyejat. Cuci kimia membunuh kulat dan menghapuskan bau secara kekal. Bermula dari RM 120." },
      { q: "Aircond saya berbau seperti sesuatu terbakar. Berbahayakah?", a: "Ya. Bau terbakar dari aircond menunjukkan kerosakan elektrik. Matikan unit serta-merta dan hubungi KL Renovator di +60182983573." },
    ],
    faqsZH: [
      { q: "为什么我的冷气有霉味？", a: "霉味是由蒸发盘管上生长的霉菌和细菌引起的。化学清洗用食品级溶液杀死霉菌，永久消除异味，从RM 120起。" },
      { q: "我的冷气有焦糊味。危险吗？", a: "是的。冷气焦糊味表示电气故障。请立即关机，拨打+60182983573联系KL Renovator紧急诊断。" },
    ],
  },
  "aircond-making-noise": {
    causesEN: [
      "Loose fan blade rattling against the housing at high speed",
      "Worn or seized fan motor bearings producing grinding or screeching",
      "Debris — leaves, insects or dirt — trapped in the outdoor unit fan",
      "Loose screws or panels vibrating during operation",
      "Failing capacitor causing the compressor to struggle and buzz loudly",
      "Refrigerant gas flow noise — hissing from a leak in the copper pipe",
    ],
    causesBM: [
      "Bilah kipas longgar bergetar pada kelajuan tinggi",
      "Galas motor kipas haus atau terkunci menghasilkan bunyi menggiling atau melengking",
      "Serpihan — daun, serangga atau kotoran — terperangkap dalam kipas unit luar",
      "Skru atau panel longgar bergetar semasa operasi",
      "Kapasitor gagal menyebabkan pekali bergelut dan berdengung kuat",
      "Bunyi aliran gas penyejuk — mendesis dari kebocoran dalam paip tembaga",
    ],
    causesZH: [
      "风扇叶片松动，高速旋转时撞击外壳",
      "风扇电机轴承磨损或卡死，产生研磨或尖叫声",
      "树叶、昆虫或污垢等杂物卡在室外机风扇中",
      "运行时螺丝或面板松动振动",
      "电容器故障导致压缩机运转困难并发出嗡嗡声",
      "制冷剂气流噪音——铜管泄漏处发出嘶嘶声",
    ],
    solutionEN: "KL Renovator technicians identify the exact source of the noise by running the unit and isolating indoor vs outdoor components. Loose blades and screws are tightened, debris is removed, worn fan motors are replaced, and failing capacitors are swapped out. A quote is provided before any parts replacement.",
    solutionBM: "Juruteknik KL Renovator mengenal pasti sumber bunyi tepat dengan menjalankan unit dan mengasingkan komponen dalaman berbanding luar. Bilah dan skru longgar dikencangkan, serpihan dibuang, motor kipas haus diganti, dan kapasitor gagal ditukar.",
    solutionZH: "KL Renovator技术员通过运行机组并隔离室内外部件来精确定位噪音来源。紧固松动的叶片和螺丝，清除异物，更换磨损的风扇电机，更换故障电容器。零件更换前提供报价。",
    warningEN: "Grinding or screeching noises from the outdoor unit indicate the fan motor bearings are failing. If ignored, the motor seizes completely and compressor damage can follow — a much more expensive repair.",
    warningBM: "Bunyi menggiling atau melengking dari unit luar menunjukkan galas motor kipas sedang gagal. Jika diabaikan, motor akan terkunci sepenuhnya dan kerosakan pekali boleh berlaku.",
    warningZH: "室外机发出研磨或尖叫声表明风扇电机轴承正在失效。如果忽视，电机将完全卡死，随后可能损坏压缩机——修理费用会贵得多。",
    faqs: [
      { q: "My aircond outdoor unit is making a loud rattling noise. What is causing it?", a: "Rattling from the outdoor unit is usually a loose fan blade, debris inside the unit, or loose screws on the casing. KL Renovator diagnoses and fixes the root cause in one visit." },
      { q: "My aircond indoor unit makes a squeaking noise when cooling. What is it?", a: "A squeaking indoor unit often indicates a dirty blower wheel rubbing against its housing, or a failing blower motor bearing. A chemical wash or blower motor replacement resolves this." },
      { q: "How much does aircond noise repair cost in KL?", a: "Diagnostic fee is RM 88 (waived with repair). Fan motor replacement RM 250–450. Capacitor replacement RM 180." },
    ],
    faqsBM: [
      { q: "Unit luar aircond saya membuat bunyi bising. Apakah penyebabnya?", a: "Bunyi bergetar dari unit luar biasanya disebabkan bilah kipas longgar, serpihan di dalam unit, atau skru longgar. KL Renovator mendiagnosis dan membaiki punca sebenar." },
      { q: "Berapa kos pembaikan bunyi bising aircond di KL?", a: "Yuran diagnostik RM 88 (dilepaskan dengan pembaikan). Penggantian motor kipas RM 250–450. Penggantian kapasitor RM 180." },
    ],
    faqsZH: [
      { q: "我的冷气室外机发出很大的嘎嘎声。是什么原因？", a: "室外机嘎嘎声通常是风扇叶片松动、机内有异物或外壳螺丝松动所致。KL Renovator诊断并修复根本原因。" },
      { q: "KL的冷气噪音维修费用是多少？", a: "诊断费RM 88（维修时免除）。风扇电机更换RM 250–450。电容器更换RM 180。" },
    ],
  },
  "aircond-low-gas": {
    causesEN: [
      "Natural slow gas loss over many years of operation",
      "Refrigerant leak from a pinhole in the copper pipe caused by corrosion",
      "Leak at the flare joint connection between the indoor and outdoor unit",
      "Leak at the service valve or Schrader valve on the outdoor unit",
      "Poor original installation where joints were not properly tightened",
      "Vibration-induced fatigue crack in the copper pipe over time",
    ],
    causesBM: [
      "Kehilangan gas semula jadi yang perlahan selepas bertahun-tahun operasi",
      "Kebocoran penyejuk dari lubang jarum dalam paip tembaga akibat kakisan",
      "Kebocoran di sambungan flare antara unit dalaman dan luaran",
      "Kebocoran di injap servis atau injap Schrader pada unit luar",
      "Pemasangan asal yang lemah di mana sambungan tidak dikencangkan dengan betul",
      "Retak keletihan akibat getaran pada paip tembaga dari masa ke masa",
    ],
    causesZH: [
      "多年运行后气体自然缓慢流失",
      "铜管腐蚀产生针孔导致制冷剂泄漏",
      "室内机和室外机之间喇叭口接头处泄漏",
      "室外机维修阀或Schrader阀处泄漏",
      "原始安装不良，接头未正确紧固",
      "随时间推移，铜管因振动产生疲劳裂纹",
    ],
    solutionEN: "KL Renovator performs a leak check before every gas top-up. If a leak is found, it is repaired first. Refrigerant is then added using a manifold gauge to achieve the exact operating pressure specified for the unit — not simply filled until the gauge looks right.",
    solutionBM: "KL Renovator melakukan pemeriksaan kebocoran sebelum setiap top-up gas. Jika kebocoran dijumpai, ia diperbaiki dahulu. Penyejuk kemudian ditambah menggunakan tolok manifold untuk mencapai tekanan operasi tepat.",
    solutionZH: "KL Renovator在每次充气前都进行泄漏检查。如果发现泄漏，先行修复。然后使用歧管表将制冷剂充至该机型规定的精确工作压力。",
    warningEN: "Running an aircond with low gas causes the compressor to overwork, overheat, and eventually fail permanently. Gas top-up from RM 120 is far cheaper than compressor replacement at RM 600–2,000.",
    warningBM: "Menjalankan aircond dengan gas rendah menyebabkan pekali bekerja terlalu keras, terlalu panas, dan akhirnya gagal sepenuhnya. Top-up gas dari RM 120 jauh lebih murah daripada penggantian pekali pada RM 600–2,000.",
    warningZH: "在制冷剂不足的情况下运行冷气会导致压缩机过度工作、过热，最终永久损坏。充气从RM 120起，远比更换压缩机（RM 600–2,000）便宜得多。",
    faqs: [
      { q: "How do I know if my aircond is low on gas?", a: "Symptoms include: not cold or barely cool air, longer cooling time, ice forming on the indoor coil, condensation on the outdoor unit pipes, and higher electricity bills." },
      { q: "How much does aircond gas top-up cost in KL?", a: "R22 from RM 120, R410A from RM 150, R32 from RM 180. Prices vary by HP size. Leak check is included with every gas top-up at KL Renovator." },
      { q: "How often does an aircond need gas top-up?", a: "A well-installed, leak-free aircond should not need gas top-up for many years. If you need gas top-up every year, there is a leak that needs to be found and repaired first." },
    ],
    faqsBM: [
      { q: "Bagaimana saya tahu jika aircond saya rendah gas?", a: "Gejala termasuk: udara tidak sejuk, masa penyejukan lebih lama, ais terbentuk pada gegelung dalaman, dan bil elektrik lebih tinggi." },
      { q: "Berapa kos top-up gas aircond di KL?", a: "R22 dari RM 120, R410A dari RM 150, R32 dari RM 180. Pemeriksaan kebocoran disertakan dengan setiap top-up gas." },
    ],
    faqsZH: [
      { q: "如何判断我的冷气是否气体不足？", a: "症状包括：空气不冷、冷却时间更长、室内盘管结冰以及电费更高。" },
      { q: "KL冷气充气费用是多少？", a: "R22从RM 120起，R410A从RM 150起，R32从RM 180起。每次充气包含泄漏检查。" },
    ],
  },
};

// Generic content for problems not in the detailed map
function getGenericContent(problem: (typeof siteConfig.problemPages)[0]) {
  return {
    causesEN: [
      "Component wear and tear from extended use",
      "Lack of regular maintenance and servicing",
      "Electrical or mechanical fault in the unit",
      "Environmental factors — dust, humidity, insects",
    ],
    causesBM: [
      "Keausan komponen dari penggunaan lanjutan",
      "Kekurangan penyelenggaraan dan servis tetap",
      "Kerosakan elektrik atau mekanikal dalam unit",
      "Faktor persekitaran — habuk, kelembapan, serangga",
    ],
    causesZH: [
      "部件长期使用磨损",
      "缺乏定期维护和保养",
      "机组电气或机械故障",
      "环境因素——灰尘、湿度、昆虫",
    ],
    solutionEN: `KL Renovator technicians diagnose the exact cause of ${problem.name.toLowerCase()} and provide a transparent quote before any repair work begins. Most issues are resolved in a single visit. Diagnostic fee is RM 88, waived if repair is done on the same visit.`,
    solutionBM: `Juruteknik KL Renovator mendiagnosis punca tepat dan memberikan sebut harga telus sebelum kerja pembaikan bermula. Kebanyakan masalah diselesaikan dalam satu lawatan. Yuran diagnostik RM 88, dilepaskan jika pembaikan dilakukan pada lawatan yang sama.`,
    solutionZH: `KL Renovator技术员诊断确切原因，并在开始任何维修工作前提供透明报价。大多数问题一次上门即可解决。诊断费RM 88，如当次进行维修则免除。`,
    warningEN: `Do not ignore ${problem.name.toLowerCase()}. Early diagnosis prevents minor faults from becoming expensive repairs.`,
    warningBM: `Jangan abaikan masalah ini. Diagnosis awal mencegah kerosakan kecil menjadi pembaikan mahal.`,
    warningZH: `不要忽视此问题。早期诊断可防止小故障演变为昂贵的维修。`,
    faqs: [
      { q: `How much does it cost to fix ${problem.name.toLowerCase()} in KL?`, a: `Diagnostic fee is RM 88 (waived if repair is done same visit). Most common repairs range from RM 120–600 depending on the faulty component. KL Renovator provides a full quote before starting.` },
      { q: `Can ${problem.name.toLowerCase()} be fixed the same day?`, a: `Yes. KL Renovator carries common parts on the van for same-day repair. WhatsApp +60182983573 to confirm a slot.` },
    ],
    faqsBM: [
      { q: `Berapa kos untuk membaiki masalah ini di KL?`, a: `Yuran diagnostik RM 88 (dilepaskan dengan pembaikan). KL Renovator memberikan sebut harga penuh sebelum bermula.` },
    ],
    faqsZH: [
      { q: `在KL修理此问题需要多少费用？`, a: `诊断费RM 88（维修时免除）。KL Renovator在开始前提供完整报价。` },
    ],
  };
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = siteConfig.problemPages.find((p) => p.slug === slug);
  if (!problem) notFound();

  const content = problemContent[slug] ?? getGenericContent(problem);
  const relatedService = problem.relatedService ? servicesData[problem.relatedService] : null;
  const waMsg = `Hi KL Renovator, my aircond has this problem: ${problem.name}. Please help me fix it. My location is:`;
  const relatedProblems = siteConfig.problemPages.filter((p) => p.slug !== slug).slice(0, 6);

  // ── Schema ────────────────────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com/" },
      { "@type": "ListItem", position: 2, name: "Aircond Problems", item: "https://www.klrenovator.com/problems" },
      { "@type": "ListItem", position: 3, name: problem.name, item: `https://www.klrenovator.com/problems/${slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.klrenovator.com/problems/${slug}#article`,
    headline: problem.h1,
    description: problem.description,
    datePublished: "2026-01-01",
    author: {
      "@type": "Organization",
      name: "KL Renovator",
      "@id": "https://www.klrenovator.com/#business",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.klrenovator.com/#business",
      name: "KL Renovator",
      logo: { "@type": "ImageObject", url: "https://www.klrenovator.com/logo/image.png" },
    },
    mainEntityOfPage: `https://www.klrenovator.com/problems/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <li><NextLink href="/" className="hover:text-sky-600 font-medium">Home</NextLink></li>
            <li><FiChevronRight className="h-3 w-3" /></li>
            <li><NextLink href="/problems" className="hover:text-sky-600 font-medium">Problems</NextLink></li>
            <li><FiChevronRight className="h-3 w-3" /></li>
            <li className="text-slate-900 font-bold">{problem.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero — trilingual name */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.04),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <FiAlertTriangle className="h-3.5 w-3.5" />
                Aircond Problem Guide
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                {problem.h1}
              </h1>
              {/* Trilingual names */}
              <p className="mt-2 text-sm font-bold text-slate-500">
                🇲🇾 {problem.nameMS} &nbsp;·&nbsp; 🇨🇳 {problem.nameZH}
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                {problem.description}
              </p>
              {/* Trilingual descriptions */}
              <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed max-w-2xl border-l-2 border-sky-200 pl-3">
                {problem.descriptionMS}
              </p>
              <p className="mt-2 text-sm text-slate-400 font-medium leading-relaxed max-w-2xl border-l-2 border-slate-200 pl-3">
                {problem.descriptionZH}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Get This Fixed Now
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-8 bg-red-50 border-b border-red-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex gap-3 items-start max-w-3xl">
              <FiAlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-red-700 mb-1">Important</p>
                <p className="text-sm text-red-700 font-medium leading-relaxed">{content.warningEN}</p>
                <p className="mt-2 text-xs text-red-600 font-medium">{content.warningBM}</p>
                <p className="mt-1 text-xs text-red-500 font-medium">{content.warningZH}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Causes */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">
            <Reveal>
              <div>
                <p className={eyebrow()}>Root Causes — English</p>
                <h2 className="mt-3 text-xl font-black text-slate-900 uppercase mb-6">
                  What Causes {problem.name}?
                </h2>
                <ul className="space-y-3">
                  {content.causesEN.map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div>
                <p className={eyebrow()}>Punca Masalah — Bahasa Malaysia</p>
                <h2 className="mt-3 text-xl font-black text-slate-900 uppercase mb-6">
                  Apakah Punca {problem.nameMS}?
                </h2>
                <ul className="space-y-3">
                  {content.causesBM.map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <span className="w-5 h-5 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ZH Causes */}
          <Reveal delay={80}>
            <div className="mt-10 max-w-5xl">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">原因分析 — {problem.nameZH}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.causesZH.map((cause, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <span className="w-5 h-5 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                    {cause}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solution */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl">
              <p className={eyebrow()}>The Fix</p>
              <h2 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 uppercase mb-6 flex items-center gap-2">
                <FiTool className="h-5 w-5 text-sky-600" />
                How KL Renovator Fixes {problem.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-sky-600 mb-2">🇬🇧 English</p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{content.solutionEN}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-sky-600 mb-2">🇲🇾 Bahasa Malaysia</p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{content.solutionBM}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-sky-600 mb-2">🇨🇳 中文</p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{content.solutionZH}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-sky-600 text-white rounded-2xl p-5">
                    <p className="text-xs font-black uppercase tracking-wider text-sky-200 mb-3">Typical Pricing</p>
                    <div className="space-y-2">
                      {[
                        ["Diagnostic", "RM 88*"],
                        ["Chemical Wash", "From RM 120"],
                        ["Gas Top-Up", "From RM 120"],
                        ["Chemical Overhaul", "From RM 220"],
                        ["Repairs / Parts", "RM 150–600"],
                      ].map(([label, price]) => (
                        <div key={label} className="flex justify-between items-center text-xs font-bold border-b border-sky-500 pb-2 last:border-0 last:pb-0">
                          <span>{label}</span><span>{price}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-sky-200 mt-3">*Waived if repair done same visit</p>
                  </div>
                  <a
                    href={waLink(waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] w-full py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
                  >
                    <FaWhatsapp className="h-4 w-4" /> Book Now
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Service */}
      {relatedService && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-2xl">
                <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Recommended Service</p>
                <h3 className="font-black text-lg text-slate-900 mb-2">{relatedService.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">{relatedService.tagline}</p>
                <div className="flex flex-wrap gap-3">
                  <NextLink
                    href={`/services/${relatedService.slug}`}
                    className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                  >
                    <FiArrowRight className="h-3.5 w-3.5" />
                    View {relatedService.title} →
                  </NextLink>
                  <span className="inline-flex items-center text-xs font-black text-sky-700 bg-sky-50 border border-sky-100 px-3 py-2 rounded-xl">
                    From {relatedService.startPrice}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQs — EN + BM + ZH */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>FAQs · Soalan Lazim · 常见问答</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>{problem.name} </span>
                <span className={title({ size: "sm", color: "brand" })}>Questions Answered</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 30}>
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {content.faqsBM.length > 0 && (
            <Reveal>
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇲🇾 Bahasa Malaysia</p>
                {content.faqsBM.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {content.faqsZH.length > 0 && (
            <Reveal>
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇨🇳 中文</p>
                {content.faqsZH.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-black text-sm text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Related Problems */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-5">
              Other Common Aircond Problems
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedProblems.map((p) => (
                <NextLink
                  key={p.slug}
                  href={`/problems/${p.slug}`}
                  className="flex items-center gap-2.5 border border-slate-200 bg-slate-50 hover:border-sky-200 hover:bg-sky-50 px-4 py-3 text-sm font-bold text-slate-700 rounded-xl transition-all"
                >
                  <FiArrowRight className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  <span>{p.name}</span>
                  <span className="ml-auto text-xs text-slate-400">{p.nameMS}</span>
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Areas */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
              Fix {problem.name} by Area
            </h2>
            <div className="flex flex-wrap gap-2">
              {siteConfig.areaPages.slice(0, 12).map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center gap-1 border border-slate-200 bg-white hover:border-sky-200 px-3 py-1.5 text-xs font-bold text-slate-600 rounded-lg transition-all"
                >
                  {area.name}
                </NextLink>
              ))}
              <NextLink
                href="/areas"
                className="inline-flex items-center gap-1 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-600 rounded-lg transition-all"
              >
                All Areas →
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Fix {problem.name} Today
            </h2>
            <p className="mt-1 text-sky-200 text-sm font-medium">
              {problem.nameMS} · {problem.nameZH}
            </p>
            <p className="mt-3 text-sky-100 font-medium max-w-lg mx-auto">
              Same-day service across KL & Selangor. Transparent pricing — quote before work starts. All brands serviced.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> WhatsApp Us Now
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
