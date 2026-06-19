import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FiArrowRight, FiChevronRight, FiAlertTriangle, FiTool, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { allPosts } from "@/config/blog-posts";
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
  "aircond-freezing-up": {
    causesEN: [
      "Low refrigerant gas causing evaporator coil temperature to drop below freezing",
      "Severely blocked evaporator coil restricting airflow and causing ice buildup",
      "Dirty air filter blocking return air — forces coil to work below dew point",
      "Fan motor running too slowly or failing — insufficient airflow over coil",
      "Refrigerant overcharge (too much gas) causing abnormally low evaporator pressure",
    ],
    causesBM: [
      "Gas penyejuk rendah menyebabkan suhu gegelung evaporator jatuh di bawah takat beku",
      "Gegelung evaporator tersumbat teruk menyekat aliran udara dan menyebabkan pembentukan ais",
      "Penapis udara kotor menyekat udara balik — memaksa gegelung bekerja di bawah takat embun",
      "Motor kipas berjalan terlalu perlahan atau gagal — aliran udara tidak mencukupi",
      "Pengecasan berlebihan refrigeran — menyebabkan tekanan evaporator terlalu rendah",
    ],
    causesZH: [
      "制冷剂不足，导致蒸发器盘管温度降至冰点以下",
      "蒸发器盘管严重堵塞，限制气流并导致积冰",
      "空气过滤网脏污，阻碍回风，迫使盘管在露点以下工作",
      "风扇电机转速过慢或故障，气流量不足",
      "制冷剂充入过量，导致蒸发器压力异常偏低",
    ],
    solutionEN: "Switch off the aircond immediately and let it defrost for 2 hours with the fan running on a separate setting if available. Do not chip or scrape the ice. Once defrosted, KL Renovator will perform a gas pressure check — if low, the leak is found and sealed before recharging. If the coil is blocked, a chemical overhaul clears it completely. Both causes are fixed in one visit.",
    solutionBM: "Matikan aircond segera dan biarkan ia cair beku selama 2 jam. Jangan kikis ais. Setelah cair beku, KL Renovator akan memeriksa tekanan gas — jika rendah, kebocoran ditemui dan ditutup sebelum mengecas semula. Jika gegelung tersumbat, overhaul kimia membersihkannya sepenuhnya.",
    solutionZH: "立即关闭冷气，让其自然化冻2小时（如果风扇可单独开启则保持运转）。不要刮除冰块。化冻后，KL Renovator进行气压检查——如不足则先找漏并修复再充气。若盘管堵塞则进行化学大修彻底清洁。两种原因均可一次上门解决。",
    warningEN: "A freezing aircond will eventually stop cooling completely — and running it in this condition damages the compressor. Switch off and get it inspected before the damage worsens.",
    warningBM: "Aircond yang membeku akhirnya akan berhenti menyejuk sepenuhnya — dan menggunakannya dalam keadaan ini merosakkan pekali. Matikan dan dapatkan pemeriksaan sebelum kerosakan bertambah teruk.",
    warningZH: "结冰的冷气最终会完全停止制冷——在此状态下运行会损坏压缩机。请关机并检查，以防损坏加剧。",
    faqs: [
      { q: "Why is there ice forming on my aircond?", a: "Ice on the indoor unit (evaporator coil or copper pipes) means either the refrigerant gas is low, the coil is severely blocked, or the fan is not moving enough air. Switch off the unit and WhatsApp KL Renovator — +60182983573. Most cases fixed same-day." },
      { q: "What should I do if my aircond is frozen?", a: "Step 1: Switch off the aircond from the remote or MCB. Step 2: If your unit has a fan-only mode, run it to help defrost. Step 3: Wait 1–2 hours until all ice melts. Step 4: WhatsApp KL Renovator at +60182983573 for a gas check + chemical overhaul." },
      { q: "How much does it cost to fix an aircond that keeps freezing?", a: "Gas top-up from RM 120 (R22), RM 150 (R410A), RM 180 (R32). Chemical overhaul (if coil blocked) from RM 220. Often both are needed — KL Renovator checks and quotes before work. Diagnostic RM 88 (waived with repair)." },
    ],
    faqsBM: [
      { q: "Kenapa ais terbentuk pada aircond saya?", a: "Ais pada unit dalam bermakna gas penyejuk rendah, gegelung tersumbat teruk, atau kipas tidak cukup mengalirkan udara. Matikan unit dan WhatsApp KL Renovator — +60182983573." },
      { q: "Apa yang perlu saya buat jika aircond membeku?", a: "Langkah 1: Matikan aircond. Langkah 2: Tunggu 1–2 jam sehingga semua ais cair. Langkah 3: WhatsApp KL Renovator +60182983573 untuk semak gas + overhaul kimia." },
    ],
    faqsZH: [
      { q: "为什么我的冷气会结冰？", a: "室内机（蒸发器盘管或铜管）结冰表示制冷剂不足、盘管严重堵塞或风扇气流量不足。关机并WhatsApp KL Renovator——+60182983573。大多数情况当天可修复。" },
      { q: "冷气结冰了该怎么办？", a: "第1步：关闭冷气。第2步：等待1-2小时直到所有冰融化。第3步：WhatsApp KL Renovator +60182983573进行气压检查+化学大修。" },
    ],
  },
  "aircond-gas-leak": {
    causesEN: [
      "Pinhole corrosion on copper evaporator coil — caused by formicary corrosion (formic acid from household chemicals)",
      "Damaged or poorly flared copper pipe joints from previous installation",
      "Vibration-induced micro-cracks in copper piping over years of operation",
      "Schrader valve (service port) failure — leaks during gas top-up operations",
      "Deteriorated brazed joints on the outdoor unit heat exchanger",
    ],
    causesBM: [
      "Kakisan lubang jarum pada gegelung tembaga penyejat — disebabkan kakisan formikari (asid formik dari bahan kimia rumah)",
      "Paip tembaga rosak atau tidak terkelip dengan baik dari pemasangan sebelumnya",
      "Rekahan mikro akibat getaran dalam paip tembaga selepas bertahun-tahun beroperasi",
      "Kegagalan injap Schrader (port servis) — bocor semasa operasi tambah gas",
      "Sambungan pateri teroksida pada penukar haba unit luar",
    ],
    causesZH: [
      "蒸发器铜盘管针孔腐蚀——由甲酸腐蚀（来自家用化学品的甲酸）引起",
      "上次安装时铜管接头损坏或胀管不良",
      "多年运行中因振动导致铜管微裂纹",
      "充气维修口（Schrader阀）失效——充气操作时泄漏",
      "室外机热交换器焊接接头老化",
    ],
    solutionEN: "KL Renovator uses an electronic refrigerant leak detector and manifold pressure gauges to pinpoint the exact leak location. The leak is sealed — either by re-flaring the joint, brazing the pinhole, or replacing the damaged section. After sealing, the system is evacuated with a vacuum pump and recharged to the correct operating pressure. A post-repair pressure test confirms the seal before the job is complete.",
    solutionBM: "KL Renovator menggunakan pengesan kebocoran refrigeran elektronik dan tolok tekanan manifold untuk mengesan lokasi kebocoran tepat. Kebocoran ditutup — sama ada dengan menekan semula sambungan, mematri lubang jarum, atau menggantikan bahagian yang rosak. Selepas menutup, sistem dilucut dengan pam vakum dan dicas semula.",
    solutionZH: "KL Renovator使用电子制冷剂泄漏检测仪和压力表精确定位泄漏位置。修复泄漏——重新胀管、钎焊针孔或更换损坏段落。修复后，系统通过真空泵抽真空并充气至正确工作压力。维修后进行压力测试确认密封。",
    warningEN: "A refrigerant gas leak will not fix itself. The unit will progressively lose cooling, eventually stop working, and the compressor will be damaged by running at low pressure. Early detection is much cheaper than compressor replacement.",
    warningBM: "Kebocoran gas penyejuk tidak akan pulih sendiri. Unit akan kehilangan penyejukan secara beransur-ansur dan pekali akan rosak. Pengesanan awal jauh lebih murah daripada penggantian pekali.",
    warningZH: "制冷剂泄漏不会自行修复。机组将逐渐失去制冷能力，最终停止工作，压缩机因低压运行而损坏。早期检测比更换压缩机便宜得多。",
    faqs: [
      { q: "How do I know if my aircond has a gas leak?", a: "Signs include: unit blows air but not cold, gradual loss of cooling over weeks, ice forming on copper pipes, hissing sound near outdoor unit, or visible oily residue on copper connections. WhatsApp KL Renovator at +60182983573 for same-day leak detection." },
      { q: "How much does aircond gas leak repair cost in KL?", a: "Leak detection and diagnosis: RM 88 (waived if repaired same visit). Leak sealing + gas recharge: RM 150–350 depending on leak location and gas type. Full breakdown quoted before work starts." },
      { q: "Can a gas leak be repaired without replacing the whole unit?", a: "Yes — in most cases the leak can be sealed and the system recharged. Only extensive corrosion affecting large sections of the coil would require indoor unit replacement. KL Renovator advises honestly — we do not recommend replacement unless necessary." },
    ],
    faqsBM: [
      { q: "Bagaimana saya tahu aircond saya bocor gas?", a: "Tanda-tanda: unit tidak sejuk, kehilangan penyejukan beransur-ansur, ais pada paip tembaga, bunyi mendesis berhampiran unit luar, atau residu berminyak pada sambungan tembaga. WhatsApp KL Renovator +60182983573." },
      { q: "Berapa kos membaiki kebocoran gas aircond di KL?", a: "Pengesanan dan diagnosis kebocoran: RM 88. Penutupan kebocoran + pengecasan semula gas: RM 150–350 bergantung pada lokasi kebocoran dan jenis gas. Sebut harga penuh sebelum kerja bermula." },
    ],
    faqsZH: [
      { q: "如何知道我的冷气是否漏气？", a: "迹象包括：机器吹风但不冷、几周内制冷能力逐渐下降、铜管结冰、室外机附近有嘶嘶声、铜接头处有油状残留物。WhatsApp KL Renovator +60182983573当天检测。" },
      { q: "吉隆坡冷气漏气维修费用是多少？", a: "泄漏检测诊断：RM 88（维修则免收）。修漏+充气：RM 150-350，视泄漏位置和气体类型而定。施工前提供完整报价。" },
    ],
  },
  "aircond-compressor-problem": {
    causesEN: [
      "Failed start capacitor — most common cause, compressor hums but does not start",
      "Compressor overheating due to low refrigerant gas or blocked condenser coil",
      "Electrical winding failure inside compressor motor",
      "Contactor failure — compressor receives no power signal from PCB",
      "Seized compressor from extended operation without refrigerant gas",
    ],
    causesBM: [
      "Kapasitor permulaan gagal — punca paling biasa, pekali berdengung tetapi tidak bermula",
      "Pekali terlampau panas akibat gas penyejuk rendah atau gegelung kondenser tersumbat",
      "Kegagalan belitan elektrik di dalam motor pekali",
      "Kegagalan kontraktor — pekali tidak menerima isyarat kuasa dari PCB",
      "Pekali macet dari operasi berpanjangan tanpa gas penyejuk",
    ],
    causesZH: [
      "启动电容器故障——最常见原因，压缩机嗡嗡响但不启动",
      "制冷剂不足或冷凝器盘管堵塞导致压缩机过热",
      "压缩机电机内部绕组故障",
      "接触器故障——压缩机无法从PCB接收电源信号",
      "长期在无制冷剂状态下运行导致压缩机卡死",
    ],
    solutionEN: "KL Renovator diagnoses compressor faults by testing the capacitor, measuring compressor amperage, checking contactor continuity, and reading refrigerant pressures. If the capacitor is the issue, it is replaced on-site (RM 180 — most affordable fix). If the compressor winding is burnt, a replacement compressor is quoted (RM 600–2,000). We always advise whether repair or unit replacement is the more economical choice.",
    solutionBM: "KL Renovator mendiagnosis kerosakan pekali dengan menguji kapasitor, mengukur ampere pekali, memeriksa kekuatan kontraktor, dan membaca tekanan refrigeran. Jika kapasitor bermasalah, ia diganti di tempat (RM 180). Jika belitan pekali terbakar, pekali ganti dikuotakan (RM 600–2,000).",
    solutionZH: "KL Renovator通过测试电容器、测量压缩机电流、检查接触器连续性和读取制冷剂压力来诊断压缩机故障。如果是电容器问题，当场更换（RM 180——最经济的修复）。如果压缩机绕组烧毁，提供更换压缩机报价（RM 600-2,000）。我们始终建议维修还是换机更经济。",
    warningEN: "If your outdoor unit is humming but the compressor is not running, do not keep turning the unit on and off — repeated restart attempts can damage the compressor windings further. Switch off and call KL Renovator.",
    warningBM: "Jika unit luar anda berdengung tetapi pekali tidak berjalan, jangan terus menghidupkan dan mematikan unit — percubaan memulakan semula berulang boleh merosakkan belitan pekali. Matikan dan hubungi KL Renovator.",
    warningZH: "如果室外机嗡嗡响但压缩机不运转，请勿反复开关机——多次重启尝试会进一步损坏压缩机绕组。关机并致电KL Renovator。",
    faqs: [
      { q: "My outdoor unit is running but the compressor is not — what is wrong?", a: "The most likely cause is a failed start capacitor (RM 180 to replace — very common). Other causes include a tripped thermal protector (needs cooling down), contactor failure, or PCB fault. KL Renovator diagnoses on-site. Diagnostic RM 88 (waived with repair)." },
      { q: "How much does aircond compressor replacement cost in KL?", a: "Compressor replacement in KL ranges from RM 600–2,000 depending on brand, HP size and compressor type (rotary vs scroll). KL Renovator sources genuine and quality-equivalent units. Full quote before work begins." },
      { q: "Is it worth replacing the compressor or buying a new aircond?", a: "Rule of thumb: if the compressor replacement costs more than 60% of a new unit, replacement is often better value. KL Renovator gives an honest recommendation — we do not push unnecessary repairs." },
    ],
    faqsBM: [
      { q: "Unit luar berjalan tetapi pekali tidak — apa yang salah?", a: "Punca paling mungkin adalah kapasitor permulaan gagal (RM 180 untuk ganti — sangat biasa). Punca lain termasuk pelindung terma terjatuh, kegagalan kontraktor, atau kerosakan PCB. KL Renovator mendiagnosis di tempat." },
      { q: "Berapa kos ganti pekali aircond di KL?", a: "Penggantian pekali di KL antara RM 600–2,000 bergantung pada jenama, saiz HP dan jenis pekali. Sebut harga penuh sebelum kerja bermula." },
    ],
    faqsZH: [
      { q: "室外机运转但压缩机不启动——是什么问题？", a: "最可能的原因是启动电容器故障（更换RM 180——非常常见）。其他原因包括热保护器跳停、接触器故障或PCB问题。KL Renovator上门诊断。" },
      { q: "吉隆坡更换冷气压缩机需要多少钱？", a: "KL更换压缩机费用为RM 600-2,000，取决于品牌、HP大小和压缩机类型（旋转式vs涡旋式）。施工前提供完整报价。" },
    ],
  },
  "aircond-pcb-problem": {
    causesEN: [
      "Power surge or voltage spike damaging onboard capacitors and ICs on the PCB",
      "Water ingress from a leaking indoor unit dripping onto the PCB",
      "Overheating due to poor ventilation around the PCB compartment",
      "Age-related component failure — electrolytic capacitors degrade after 8–10 years",
      "Insect damage — ants and cockroaches causing short circuits on the board",
    ],
    causesBM: [
      "Lonjakan kuasa atau gelombang voltan merosakkan kapasitor dan IC pada papan PCB",
      "Peresapan air dari unit dalam yang bocor menitis ke papan PCB",
      "Terlampau panas akibat pengudaraan yang buruk di sekitar ruang PCB",
      "Kegagalan komponen berkaitan usia — kapasitor elektrolitik merosot selepas 8–10 tahun",
      "Kerosakan serangga — semut dan lipas menyebabkan litar pintas pada papan",
    ],
    causesZH: [
      "电涌或电压峰值损坏PCB板上的电容器和IC",
      "室内机漏水滴落到PCB板导致进水",
      "PCB仓通风不良导致过热",
      "与年龄相关的元件故障——电解电容器8-10年后退化",
      "昆虫损坏——蚂蚁和蟑螂在电路板上造成短路",
    ],
    solutionEN: "KL Renovator reads the PCB error code first (via diagnostic mode or error blinking pattern). This identifies which circuit has failed. In some cases, a single faulty component on the PCB can be replaced (capacitor, relay, transistor). Where the board is beyond repair, a replacement PCB is sourced — OEM or high-quality compatible. All PCB work is tested under operation before job completion.",
    solutionBM: "KL Renovator membaca kod ralat PCB dahulu (melalui mod diagnostik atau corak berkelip). Ini mengenal pasti litar yang gagal. Dalam sesetengah kes, komponen tunggal yang rosak pada PCB boleh diganti. Di mana papan tidak dapat diperbaiki, PCB ganti dipastikan — OEM atau serasi berkualiti tinggi.",
    solutionZH: "KL Renovator首先读取PCB错误代码（通过诊断模式或闪烁模式）。这确定哪个电路出现故障。某些情况下，PCB上单个故障元件（电容器、继电器、晶体管）可以更换。如果电路板无法修复，则采购替换PCB——OEM或高质量兼容品。",
    warningEN: "A PCB fault can cause erratic behaviour — random shutdowns, incorrect temperature display, or failure to respond to the remote. Do not keep resetting the unit — continued operation with a faulty PCB can cause secondary damage to the compressor or fan motor.",
    warningBM: "Kerosakan PCB boleh menyebabkan tingkah laku tidak menentu — penutupan rawak, paparan suhu tidak betul, atau kegagalan bertindak balas kepada kawalan jauh. Jangan terus menetapkan semula unit.",
    warningZH: "PCB故障可能导致不规律行为——随机关机、温度显示错误或无法响应遥控。不要反复重置机器——继续使用有故障PCB的机器可能对压缩机或风扇电机造成二次损坏。",
    faqs: [
      { q: "How do I know if my aircond PCB is faulty?", a: "Symptoms include: error code blinking lights, unit turns on but immediately shuts off, erratic temperature control, remote not responding (even after battery change), or unit powers up but fan does not run. WhatsApp KL Renovator the error code + brand for fast diagnosis." },
      { q: "How much does aircond PCB replacement cost in KL?", a: "PCB board replacement in KL ranges from RM 300–600 depending on brand and model. KL Renovator sources OEM and quality compatible boards. Diagnostic RM 88 (waived if repaired same visit)." },
      { q: "Can a PCB board be repaired instead of replaced?", a: "Sometimes yes — if a single component (capacitor, relay, fuse) has failed, it can be repaired at lower cost. KL Renovator evaluates each case and recommends the most economical option." },
    ],
    faqsBM: [
      { q: "Bagaimana saya tahu papan PCB aircond saya rosak?", a: "Gejala termasuk: lampu berkelip kod ralat, unit hidup tetapi terus mati, kawalan suhu tidak menentu, kawalan jauh tidak bertindak balas. WhatsApp KL Renovator kod ralat + jenama untuk diagnosis cepat." },
      { q: "Berapa kos ganti papan PCB aircond di KL?", a: "Penggantian papan PCB di KL antara RM 300–600 bergantung pada jenama dan model. Diagnostik RM 88 (dikecualikan dengan pembaikan)." },
    ],
    faqsZH: [
      { q: "如何知道我的冷气PCB板是否有问题？", a: "症状包括：闪烁错误代码灯、开机后立即关机、温度控制不稳、遥控无响应（换电池后仍无效）。WhatsApp KL Renovator错误代码+品牌以快速诊断。" },
      { q: "吉隆坡更换冷气PCB板需要多少钱？", a: "KL更换PCB板费用为RM 300-600，取决于品牌和型号。诊断费RM 88（维修则免收）。" },
    ],
  },
  "aircond-fan-not-working": {
    causesEN: [
      "Burnt indoor fan motor — most common cause of no airflow from indoor unit",
      "Burnt outdoor fan motor — prevents condenser heat dissipation, compressor overheats",
      "Failed run capacitor — motor hums but does not spin",
      "PCB fault cutting power to the fan motor circuit",
      "Seized motor bearing from lack of lubrication or water ingress",
    ],
    causesBM: [
      "Motor kipas dalam terbakar — punca paling biasa tiada aliran udara dari unit dalam",
      "Motor kipas luar terbakar — menghalang penyebaran haba kondenser, pekali terlampau panas",
      "Kapasitor pengoperasian gagal — motor berdengung tetapi tidak berputar",
      "Kerosakan PCB memutuskan kuasa ke litar motor kipas",
      "Galas motor macet akibat kekurangan pelinciran atau peresapan air",
    ],
    causesZH: [
      "室内风扇电机烧毁——室内机无气流的最常见原因",
      "室外风扇电机烧毁——阻碍冷凝器散热，压缩机过热",
      "运行电容器失效——电机嗡嗡响但不转",
      "PCB故障切断了风扇电机电路的电源",
      "因缺乏润滑或进水导致电机轴承卡死",
    ],
    solutionEN: "KL Renovator tests the fan motor directly with a clamp meter to determine if it is burnt, seized, or losing power from the PCB. If the capacitor has failed, it is replaced first (lower cost fix). If the motor is burnt, KL Renovator stocks common indoor and outdoor fan motor sizes for same-day replacement. Motor replacement includes a post-repair operational test before leaving.",
    solutionBM: "KL Renovator menguji motor kipas secara langsung dengan meter pengapit untuk menentukan sama ada ia terbakar, macet, atau kehilangan kuasa dari PCB. Jika kapasitor gagal, ia diganti dahulu. Jika motor terbakar, KL Renovator menyimpan saiz motor biasa untuk penggantian hari sama.",
    solutionZH: "KL Renovator使用钳形电流表直接测试风扇电机，确定是否烧毁、卡死或PCB断电。如果电容器失效，先更换（费用较低）。如果电机烧毁，KL Renovator备有常见室内外风扇电机规格可当天更换。",
    warningEN: "An outdoor unit with a non-running fan will cause the compressor to overheat and trip within minutes. If left unresolved, this causes compressor damage. Do not keep trying to run the unit — call KL Renovator immediately.",
    warningBM: "Unit luar dengan kipas tidak berjalan akan menyebabkan pekali terlampau panas dan terjatuh dalam beberapa minit. Ini merosakkan pekali. Jangan cuba menjalankan unit — hubungi KL Renovator segera.",
    warningZH: "室外机风扇不运转会导致压缩机在几分钟内过热跳停。若不解决，将损坏压缩机。请勿继续尝试开机——立即联系KL Renovator。",
    faqs: [
      { q: "My aircond is on but no air is coming out — what is wrong?", a: "The indoor fan motor has most likely failed. Other causes include PCB fault or capacitor failure. KL Renovator diagnoses on-site and replaces the motor same-day if needed. Indoor motor from RM 250." },
      { q: "How much does aircond fan motor replacement cost in KL?", a: "Indoor fan motor: RM 250–350. Outdoor fan motor: RM 300–450. Exact cost depends on brand, HP size and motor type. All quoted before work begins." },
      { q: "Can a seized fan motor be repaired or does it need replacement?", a: "A seized motor from dust and dry bearing can sometimes be freed and re-lubricated. A burnt motor must be replaced. KL Renovator checks first and replaces only if necessary." },
    ],
    faqsBM: [
      { q: "Aircond hidup tetapi tiada udara keluar — apa yang salah?", a: "Motor kipas dalam kemungkinan besar telah gagal. KL Renovator mendiagnosis di tempat dan mengganti motor hari sama jika perlu. Motor dalam dari RM 250." },
      { q: "Berapa kos ganti motor kipas aircond di KL?", a: "Motor kipas dalam: RM 250–350. Motor kipas luar: RM 300–450. Sebut harga tepat sebelum kerja bermula." },
    ],
    faqsZH: [
      { q: "冷气开着但没有气流——是什么问题？", a: "室内风扇电机极有可能已经损坏。KL Renovator上门诊断，如需要当天更换电机。室内电机从RM 250起。" },
      { q: "吉隆坡更换冷气风扇电机需要多少钱？", a: "室内风扇电机：RM 250-350。室外风扇电机：RM 300-450。施工前提供确切报价。" },
    ],
  },
  "aircond-tripping-power": {
    causesEN: [
      "Shorted or grounded compressor winding — causes immediate MCB trip on startup",
      "Failed capacitor drawing excessive current on startup",
      "Earth leakage from water-damaged wiring inside the indoor or outdoor unit",
      "Undersized MCB — existing breaker cannot handle startup current of a new or larger unit",
      "Short circuit in PCB board or wiring harness",
    ],
    causesBM: [
      "Belitan pekali terlitar pintas atau membumi — menyebabkan MCB jatuh segera semasa permulaan",
      "Kapasitor gagal menarik arus berlebihan semasa permulaan",
      "Kebocoran bumi dari pendawaian rosak air di dalam unit dalam atau luar",
      "MCB terlalu kecil — pemutus litar sedia ada tidak dapat menampung arus permulaan",
      "Litar pintas dalam papan PCB atau harnes pendawaian",
    ],
    causesZH: [
      "压缩机绕组短路或接地——启动时立即跳闸MCB",
      "电容器失效在启动时汲取过大电流",
      "室内或室外机内部接线受水损坏导致漏电",
      "MCB规格过小——现有断路器无法承受新机或大型机的启动电流",
      "PCB板或线束短路",
    ],
    solutionEN: "SAFETY FIRST: Do not keep resetting the MCB. KL Renovator tests the compressor resistance (Megger test), checks the capacitor, inspects wiring for earth faults, and reads PCB error codes to pinpoint the cause. Most electrical faults are diagnosed and repaired in one visit. If the MCB itself is undersized, we advise on the correct rated breaker before recommending an electrician.",
    solutionBM: "KESELAMATAN DAHULU: Jangan terus menetapkan semula MCB. KL Renovator menguji rintangan pekali (ujian Megger), memeriksa kapasitor, memeriksa pendawaian untuk kesalahan bumi, dan membaca kod ralat PCB. Kebanyakan kerosakan elektrik didiagnosis dan dibaiki dalam satu lawatan.",
    solutionZH: "安全第一：请勿反复重置MCB。KL Renovator测试压缩机电阻（Megger测试）、检查电容器、检查接线漏电故障，并读取PCB错误代码以确定原因。大多数电气故障可在一次上门中诊断和修复。",
    warningEN: "An MCB that trips repeatedly is a serious safety warning. Repeatedly resetting it without finding the cause risks electrical fire or equipment damage. Switch off the aircond and do not turn it back on until it has been inspected.",
    warningBM: "MCB yang berulang kali jatuh adalah amaran keselamatan serius. Menetapkan semula berulang kali tanpa mencari punca berisiko kebakaran elektrik atau kerosakan peralatan. Matikan aircond dan jangan hidupkan semula sehingga diperiksa.",
    warningZH: "反复跳闸的MCB是严重的安全警告。在未找到原因前反复重置会有电气火灾或设备损坏的风险。关闭冷气，在检查前不要重新开启。",
    faqs: [
      { q: "My aircond keeps tripping the MCB every time I turn it on — what is causing it?", a: "Most likely cause: failed capacitor (RM 180 to fix) or shorted compressor winding (RM 600–2,000). Other causes: earth leakage from damaged wiring or undersized MCB. KL Renovator diagnoses safely. Do NOT keep resetting the MCB." },
      { q: "Is it safe to keep resetting the MCB when the aircond trips it?", a: "No — this is dangerous. A tripping MCB is a safety circuit protecting you from electrical fire or equipment damage. Call KL Renovator at +60182983573 immediately for a safety inspection." },
      { q: "How much does it cost to fix an aircond that trips the MCB?", a: "Capacitor replacement (most common): RM 180. Wiring repair: RM 100–300. PCB replacement: RM 300–600. Compressor (worst case): RM 600–2,000. Diagnostic RM 88 (waived with repair)." },
    ],
    faqsBM: [
      { q: "Aircond saya terus menjatuhkan MCB — apa yang menyebabkannya?", a: "Punca paling mungkin: kapasitor gagal (RM 180 untuk baiki) atau belitan pekali terlitar pintas (RM 600–2,000). JANGAN terus menetapkan semula MCB. Hubungi KL Renovator +60182983573." },
      { q: "Adakah selamat untuk terus menetapkan semula MCB?", a: "Tidak — ini berbahaya. MCB yang jatuh melindungi anda dari kebakaran elektrik. Hubungi KL Renovator +60182983573 segera untuk pemeriksaan keselamatan." },
    ],
    faqsZH: [
      { q: "我的冷气每次开机都跳闸MCB——是什么原因？", a: "最可能的原因：电容器失效（修复RM 180）或压缩机绕组短路（RM 600-2,000）。请勿反复重置MCB。致电KL Renovator +60182983573。" },
      { q: "反复重置MCB安全吗？", a: "不安全——这很危险。跳闸的MCB是保护您免受电气火灾的安全电路。立即致电KL Renovator +60182983573进行安全检查。" },
    ],
  },
  "aircond-remote-not-working": {
    causesEN: [
      "Dead remote batteries — most common and most overlooked cause",
      "Faulty IR receiver on the indoor unit — damaged by moisture or insects",
      "PCB fault affecting the IR signal processing circuit",
      "Remote control internal circuit damage from water or physical drop",
      "Signal obstruction — furniture blocking the IR receiver window on the indoor unit",
    ],
    causesBM: [
      "Bateri kawalan jauh habis — punca paling biasa dan paling diabaikan",
      "Penerima IR rosak pada unit dalam — rosak oleh kelembapan atau serangga",
      "Kerosakan PCB mempengaruhi litar pemprosesan isyarat IR",
      "Kerosakan litar dalaman kawalan jauh dari air atau jatuh",
      "Halangan isyarat — perabot menyekat tetingkap penerima IR pada unit dalam",
    ],
    causesZH: [
      "遥控器电池耗尽——最常见且最容易被忽视的原因",
      "室内机红外接收器故障——因潮湿或昆虫损坏",
      "PCB故障影响红外信号处理电路",
      "遥控器内部电路因进水或摔落而损坏",
      "信号遮挡——家具遮挡室内机上的红外接收窗口",
    ],
    solutionEN: "Step 1: Replace the remote batteries with new ones — alkaline AA or AAA, not rechargeable. Step 2: Test the remote IR signal with a phone camera (point remote at camera, press button — if you see a purple flash, the remote is working). If the remote is fine but unit does not respond, the IR receiver or PCB needs replacement. KL Renovator diagnoses and repairs on-site.",
    solutionBM: "Langkah 1: Ganti bateri kawalan jauh dengan yang baharu — AA atau AAA alkali, bukan boleh dicas semula. Langkah 2: Uji isyarat IR kawalan jauh dengan kamera telefon (hala kawalan jauh ke kamera, tekan butang — jika anda melihat cahaya ungu, kawalan jauh berfungsi). Jika kawalan jauh baik tetapi unit tidak bertindak balas, penerima IR atau PCB memerlukan penggantian.",
    solutionZH: "第1步：用新电池更换遥控器电池——碱性AA或AAA，不要使用可充电电池。第2步：用手机摄像头测试遥控器红外信号（将遥控器对准摄像头，按下按钮——如果看到紫光闪烁，说明遥控器正常）。如果遥控器正常但机器无响应，则红外接收器或PCB需要更换。",
    warningEN: "Do not assume the unit is broken if the remote stops working. Always test the remote first with a phone camera before calling for a technician — it may simply be dead batteries.",
    warningBM: "Jangan anggap unit rosak jika kawalan jauh berhenti berfungsi. Sentiasa uji kawalan jauh dahulu dengan kamera telefon — mungkin hanya bateri habis.",
    warningZH: "如果遥控器停止工作，不要假设机器坏了。在致电技术员之前，始终用手机摄像头先测试遥控器——可能只是电池耗尽。",
    faqs: [
      { q: "How do I test if my aircond remote is working?", a: "Point the remote at your phone's front or back camera and press any button. If you see a purple or white light flash on the camera screen, the remote IR emitter is working. If you see nothing, the remote itself is faulty — try replacing the batteries first." },
      { q: "My remote works (I can see the IR light) but the aircond does not respond — why?", a: "The indoor unit's IR receiver is likely faulty or blocked. Clean the receiver window (small black panel on the unit). If still no response, the IR receiver or the PCB needs replacement. KL Renovator diagnoses on-site." },
      { q: "How much does it cost to fix an aircond remote problem?", a: "If it's just batteries: RM 5. If the remote itself is faulty: replacement remote RM 50–120. If the IR receiver is faulty: RM 150–250. If the PCB is causing the issue: RM 300–600. KL Renovator diagnoses the exact cause first." },
    ],
    faqsBM: [
      { q: "Bagaimana saya menguji sama ada kawalan jauh aircond berfungsi?", a: "Hala kawalan jauh ke kamera telefon anda dan tekan mana-mana butang. Jika anda melihat cahaya ungu atau putih berkelip pada skrin kamera, IR kawalan jauh berfungsi. Jika tidak ada cahaya, cuba ganti bateri dahulu." },
      { q: "Kawalan jauh berfungsi tetapi aircond tidak bertindak balas — kenapa?", a: "Penerima IR unit dalam kemungkinan rosak atau tersekat. Bersihkan tetingkap penerima. Jika masih tidak bertindak balas, penerima IR atau PCB perlu diganti. KL Renovator mendiagnosis di tempat." },
    ],
    faqsZH: [
      { q: "如何测试冷气遥控器是否正常？", a: "将遥控器对准手机摄像头并按任意按钮。如果摄像头屏幕上看到紫色或白色闪光，说明遥控器红外发射器正常。如果没有光，先尝试更换电池。" },
      { q: "遥控器正常（看到红外光）但冷气不响应——为什么？", a: "室内机的红外接收器可能有故障或被遮挡。清洁接收器窗口（机器上的小黑面板）。如仍无响应，则红外接收器或PCB需要更换。" },
    ],
  },
  "aircond-indoor-unit-leaking": {
    causesEN: [
      "Blocked drain pipe — most common cause, water backs up and overflows the drain pan",
      "Dirty and overflowing drain pan — years of sludge accumulation blocks internal drainage",
      "Incorrect drain pipe slope during installation — water cannot flow by gravity",
      "Cracked or disconnected drain pipe joint — water leaks before reaching the condensate pump or outlet",
      "Ice forming on evaporator coil and melting faster than drain capacity",
    ],
    causesBM: [
      "Paip saliran tersumbat — punca paling biasa, air menghimpun dan melimpah dari dulang saliran",
      "Dulang saliran kotor dan melimpah — penumpukan enapan bertahun-tahun menyekat saliran dalaman",
      "Cerun paip saliran salah semasa pemasangan — air tidak dapat mengalir secara graviti",
      "Sambungan paip saliran retak atau terputus — air bocor sebelum sampai ke pam kondensat atau salur keluar",
      "Ais terbentuk pada gegelung penyejat dan cair lebih cepat dari kapasiti saliran",
    ],
    causesZH: [
      "排水管堵塞——最常见原因，水积聚并从排水盘溢出",
      "排水盘脏污并溢出——多年污泥积聚堵塞内部排水",
      "安装时排水管坡度不正确——水无法靠重力流动",
      "排水管接头破裂或断开——水在到达排水泵或出口前泄漏",
      "蒸发器盘管结冰融化速度超过排水能力",
    ],
    solutionEN: "KL Renovator clears the drain pipe with a wet vacuum and chemical flush, cleans the drain pan, and checks the drain pipe slope and all joints. For severe blockage and overflowing drain pan, a chemical overhaul fully dismantles the indoor unit, deep-cleans the drain pan, and checks the drain outlet path. Most water leak issues are resolved same-day.",
    solutionBM: "KL Renovator membersihkan paip saliran dengan vakum basah dan pembersihan kimia, membersihkan dulang saliran, dan memeriksa cerun paip saliran dan semua sambungan. Untuk sekatan teruk dan dulang saliran melimpah, overhaul kimia menanggalkan unit dalam sepenuhnya dan membersihkan secara mendalam.",
    solutionZH: "KL Renovator使用湿吸尘器和化学冲洗清通排水管，清洁排水盘，检查排水管坡度和所有接头。对于严重堵塞和溢出的排水盘，化学大修完全拆卸室内机，深度清洁排水盘。大多数漏水问题当天即可解决。",
    warningEN: "Water leaking from the indoor unit onto furniture, walls, or electrical points is a safety hazard. If water is near any electrical socket or light fitting, switch off the aircond MCB immediately and call KL Renovator for emergency service.",
    warningBM: "Air yang bocor dari unit dalam ke perabot, dinding, atau titik elektrik adalah bahaya keselamatan. Jika air berhampiran mana-mana soket elektrik, matikan MCB aircond segera dan hubungi KL Renovator untuk servis kecemasan.",
    warningZH: "室内机漏水到家具、墙壁或电源插座是安全隐患。如果水靠近任何电源插座或灯具，立即关闭冷气MCB并致电KL Renovator进行紧急服务。",
    faqs: [
      { q: "Water is dripping from the front of my aircond — what is causing it?", a: "The drain pipe is almost certainly blocked. Chemical wash with drain flush (from RM 120) fixes minor dripping. If water is flowing heavily, a chemical overhaul (from RM 220) is needed to deep-clean the drain pan." },
      { q: "Is water leaking from an aircond dangerous?", a: "Minor dripping is not immediately dangerous but will damage walls, ceilings and furniture. Heavy leaking near electrical points is a safety emergency — switch off the MCB and call KL Renovator immediately: +60182983573." },
      { q: "How much does it cost to fix an aircond leaking water from the indoor unit?", a: "Chemical wash with drain flush: from RM 120. Chemical overhaul (for severe/persistent leaks): from RM 220. Emergency same-day service available. All prices confirmed before work." },
    ],
    faqsBM: [
      { q: "Air menitis dari bahagian depan aircond saya — apa puncanya?", a: "Paip saliran hampir pasti tersumbat. Cuci kimia dengan pembilasan saliran (dari RM 120) membaiki titisan kecil. Jika air mengalir teruk, overhaul kimia (dari RM 220) diperlukan." },
      { q: "Adakah bocor air dari aircond berbahaya?", a: "Titisan kecil tidak berbahaya segera tetapi akan merosakkan dinding dan perabot. Bocoran teruk berhampiran titik elektrik adalah kecemasan keselamatan — matikan MCB dan hubungi KL Renovator: +60182983573." },
    ],
    faqsZH: [
      { q: "水从冷气前方滴落——是什么原因？", a: "排水管几乎肯定堵塞了。含排水冲洗的化学清洗（从RM 120起）可修复轻微滴水。如果水流量大，则需要化学大修（从RM 220起）深度清洁排水盘。" },
      { q: "冷气漏水危险吗？", a: "轻微滴水不会立即危险，但会损坏墙壁和家具。靠近电源插座的大量漏水是安全紧急情况——立即关闭MCB并致电KL Renovator：+60182983573。" },
    ],
  },
  "aircond-outdoor-unit-not-running": {
    causesEN: [
      "Failed outdoor fan motor — outdoor unit does not run, compressor overheats quickly",
      "Tripped thermal overload protector on the compressor — needs to cool down before restarting",
      "Failed compressor start capacitor — compressor hums but outdoor unit does not start",
      "PCB fault — outdoor unit receives no start signal from indoor PCB",
      "Contactor failure — compressor does not receive electrical power despite PCB command",
    ],
    causesBM: [
      "Motor kipas luar gagal — unit luar tidak berjalan, pekali cepat terlampau panas",
      "Pelindung bebanan terma pekali terjatuh — perlu sejuk sebelum memulakan semula",
      "Kapasitor permulaan pekali gagal — pekali berdengung tetapi unit luar tidak bermula",
      "Kerosakan PCB — unit luar tidak menerima isyarat permulaan dari PCB dalam",
      "Kegagalan kontraktor — pekali tidak menerima kuasa elektrik walaupun ada arahan PCB",
    ],
    causesZH: [
      "室外风扇电机故障——室外机不运转，压缩机迅速过热",
      "压缩机热过载保护器跳停——需要冷却后再重启",
      "压缩机启动电容器失效——压缩机嗡嗡响但室外机不启动",
      "PCB故障——室外机未收到室内PCB的启动信号",
      "接触器故障——尽管PCB发出指令，压缩机仍未收到电力",
    ],
    solutionEN: "KL Renovator checks whether the outdoor fan motor runs, tests the compressor capacitor, measures compressor amperage, and tests contactor continuity. If the thermal overload has tripped, we let the unit cool and retest. Most causes — capacitor, contactor, fan motor — are repaired same-day. Compressor failure is quoted separately before work begins.",
    solutionBM: "KL Renovator memeriksa sama ada motor kipas luar berjalan, menguji kapasitor pekali, mengukur ampere pekali, dan menguji kekuatan kontraktor. Kebanyakan punca — kapasitor, kontraktor, motor kipas — dibaiki hari sama.",
    solutionZH: "KL Renovator检查室外风扇电机是否运转，测试压缩机电容器，测量压缩机电流，并测试接触器连续性。大多数原因——电容器、接触器、风扇电机——当天可修复。压缩机故障另行报价。",
    warningEN: "If the indoor unit is on but the outdoor unit is not running, the system is not cooling at all. Running the indoor unit alone wastes electricity and does not cool the room. Switch off the system and call KL Renovator.",
    warningBM: "Jika unit dalam hidup tetapi unit luar tidak berjalan, sistem tidak menyejuk sama sekali. Menjalankan unit dalam sahaja membuang elektrik. Matikan sistem dan hubungi KL Renovator.",
    warningZH: "如果室内机开着但室外机不运转，系统完全无法制冷。单独运行室内机会浪费电力。关闭系统并联系KL Renovator。",
    faqs: [
      { q: "My aircond indoor unit is on but the outdoor unit is not running — what is wrong?", a: "Most likely: failed capacitor (RM 180), tripped thermal overload (let cool 30 min then retry), contactor failure (RM 150–250), or PCB fault. KL Renovator diagnoses on-site. Do not keep running the indoor unit alone." },
      { q: "How much does it cost to fix an outdoor unit that is not running?", a: "Capacitor: RM 180. Contactor: RM 150–250. Fan motor: RM 300–450. PCB: RM 300–600. Compressor: RM 600–2,000. KL Renovator diagnoses first and quotes before work." },
      { q: "Can KL Renovator fix outdoor unit problems same-day?", a: "Yes — KL Renovator carries capacitors, contactors and common fan motor sizes for same-day repair. WhatsApp +60182983573 with your brand and HP size for fastest dispatch." },
    ],
    faqsBM: [
      { q: "Unit dalam aircond hidup tetapi unit luar tidak berjalan — apa yang salah?", a: "Kemungkinan besar: kapasitor gagal (RM 180), pelindung terma terjatuh (biar sejuk 30 minit), kegagalan kontraktor (RM 150–250), atau kerosakan PCB. KL Renovator mendiagnosis di tempat." },
      { q: "Berapa kos membaiki unit luar yang tidak berjalan?", a: "Kapasitor: RM 180. Kontraktor: RM 150–250. Motor kipas: RM 300–450. PCB: RM 300–600. KL Renovator mendiagnosis dahulu dan mengutip sebelum kerja." },
    ],
    faqsZH: [
      { q: "室内机开着但室外机不运转——是什么问题？", a: "最有可能：电容器失效（RM 180）、热过载保护器跳停（冷却30分钟后重试）、接触器故障（RM 150-250）或PCB故障。KL Renovator上门诊断。" },
      { q: "修复不运转的室外机需要多少费用？", a: "电容器：RM 180。接触器：RM 150-250。风扇电机：RM 300-450。PCB：RM 300-600。KL Renovator先诊断后报价。" },
    ],
  },
  "aircond-high-electricity-bill": {
    causesEN: [
      "Dirty evaporator coil forcing the compressor to run longer to achieve the same cooling",
      "Low refrigerant gas — compressor runs continuously at full load without reaching set temperature",
      "Non-inverter unit running at full speed regardless of room temperature",
      "Thermostat set too low (16°C) causing continuous compressor operation",
      "Oversized unit short-cycling in a small room — starts and stops too frequently",
    ],
    causesBM: [
      "Gegelung evaporator kotor memaksa pekali berjalan lebih lama untuk mencapai penyejukan yang sama",
      "Gas penyejuk rendah — pekali berjalan berterusan pada beban penuh tanpa mencapai suhu yang ditetapkan",
      "Unit bukan penyongsang berjalan pada kelajuan penuh tanpa mengira suhu bilik",
      "Termostat ditetapkan terlalu rendah (16°C) menyebabkan operasi pekali berterusan",
      "Unit terlalu besar dalam bilik kecil — terlalu kerap bermula dan berhenti",
    ],
    causesZH: [
      "蒸发器盘管脏污，迫使压缩机运行更长时间才能达到同等制冷效果",
      "制冷剂不足——压缩机在满负荷下持续运行，无法达到设定温度",
      "非变频机无论室温如何都以全速运行",
      "温控器设置过低（16°C）导致压缩机持续运行",
      "小房间安装过大型号机器——频繁启停",
    ],
    solutionEN: "A dirty coil can increase electricity consumption by 20–35%. KL Renovator's chemical wash restores full heat exchange efficiency — most customers see a noticeable bill reduction within one billing cycle. If low gas is contributing, a gas top-up with precision pressure balancing ensures the compressor runs efficiently. Setting the thermostat to 24–26°C also significantly reduces consumption.",
    solutionBM: "Gegelung kotor boleh meningkatkan penggunaan elektrik sebanyak 20–35%. Cuci kimia KL Renovator memulihkan kecekapan pertukaran haba penuh. Jika gas rendah menyumbang, tambah gas dengan pengimbangan tekanan tepat memastikan pekali berjalan dengan cekap.",
    solutionZH: "脏污的盘管可使耗电量增加20-35%。KL Renovator的化学清洗恢复完整的热交换效率——大多数客户在一个账单周期内即可看到明显的电费下降。如果气体不足，精确压力平衡充气确保压缩机高效运行。将温控器设置在24-26°C也能显著降低耗电量。",
    warningEN: "A sudden spike in electricity bill from an aircond is often a sign of low gas or a dirty coil — not just a rate increase. Annual servicing is the most effective way to keep running costs low.",
    warningBM: "Lonjakan mendadak dalam bil elektrik dari aircond sering merupakan tanda gas rendah atau gegelung kotor. Servis tahunan adalah cara paling berkesan untuk mengekalkan kos operasi yang rendah.",
    warningZH: "冷气电费突然上涨通常是制冷剂不足或盘管脏污的迹象，而不仅仅是电价上涨。年度保养是保持运营成本低廉的最有效方式。",
    faqs: [
      { q: "Why is my aircond using so much electricity?", a: "Top causes: dirty evaporator coil (reduces efficiency 20–35%), low refrigerant gas (compressor overworks), thermostat set too low, or non-inverter unit. KL Renovator's chemical wash + gas check restores efficiency. From RM 120." },
      { q: "How much electricity can I save by servicing my aircond?", a: "A well-maintained inverter aircond running at 24°C uses 30–50% less electricity than a dirty non-inverter at 16°C. Annual chemical wash typically saves RM 30–80/month per unit on a typical Malaysian electricity bill." },
      { q: "Should I upgrade to inverter to reduce my electricity bill?", a: "If your current unit is over 8 years old and non-inverter, upgrading to an inverter model typically pays back in 18–24 months via electricity savings. KL Renovator provides honest advice on whether servicing or upgrading makes more financial sense." },
    ],
    faqsBM: [
      { q: "Kenapa aircond saya menggunakan banyak elektrik?", a: "Punca utama: gegelung evaporator kotor (mengurangkan kecekapan 20–35%), gas penyejuk rendah, termostat ditetapkan terlalu rendah, atau unit bukan penyongsang. Cuci kimia KL Renovator memulihkan kecekapan. Dari RM 120." },
      { q: "Berapa banyak elektrik yang boleh saya jimat dengan menservis aircond?", a: "Aircond penyongsang yang diselenggara dengan baik pada 24°C menggunakan 30–50% kurang elektrik berbanding unit bukan penyongsang yang kotor pada 16°C. Cuci kimia tahunan biasanya menjimatkan RM 30–80/bulan setiap unit." },
    ],
    faqsZH: [
      { q: "为什么我的冷气耗电量这么大？", a: "主要原因：蒸发器盘管脏污（效率下降20-35%）、制冷剂不足（压缩机过度工作）、温控器设置过低或非变频机型。KL Renovator的化学清洗+气体检查可恢复效率。从RM 120起。" },
      { q: "保养冷气可以节省多少电费？", a: "维护良好的变频冷气在24°C运行比脏污的非变频机在16°C少用30-50%的电。年度化学清洗通常每台机器每月节省RM 30-80的电费。" },
    ],
  },
  "aircond-weak-airflow": {
    causesEN: [
      "Dirty blower wheel — most common cause, dust accumulation reduces blade efficiency by 40%",
      "Blocked air filter — restricts return air entering the unit",
      "Dirty evaporator coil with ice formation narrowing the airpath",
      "Failing indoor fan motor running below rated speed",
      "Blocked or crimped flexible ductwork (in ducted systems)",
    ],
    causesBM: [
      "Roda blower kotor — punca paling biasa, penumpukan habuk mengurangkan kecekapan bilah sebanyak 40%",
      "Penapis udara tersumbat — menyekat udara balik yang memasuki unit",
      "Gegelung evaporator kotor dengan pembentukan ais menyempitkan laluan udara",
      "Motor kipas dalam yang gagal berjalan di bawah kelajuan yang dinilai",
      "Saluran fleksibel tersumbat atau terjepit (dalam sistem saluran)",
    ],
    causesZH: [
      "风轮脏污——最常见原因，灰尘积累使风叶效率降低40%",
      "空气过滤网堵塞——限制进入机组的回风",
      "蒸发器盘管脏污并结冰，缩窄气流通道",
      "室内风扇电机老化，转速低于额定值",
      "软管风道堵塞或压折（在风管系统中）",
    ],
    solutionEN: "A pressure chemical wash with blower wheel cleaning restores full airflow in most cases. KL Renovator removes the front panel, sprays high-pressure chemical solution through the evaporator coil and blower, flushes the drain, and tests airflow at the vents before finishing. Most customers report significantly stronger airflow immediately after service.",
    solutionBM: "Cuci kimia bertekanan dengan pembersihan roda blower memulihkan aliran udara penuh dalam kebanyakan kes. KL Renovator menanggalkan panel depan, menyembur larutan kimia bertekanan tinggi melalui gegelung penyejat dan blower, membersihkan saliran, dan menguji aliran udara.",
    solutionZH: "含风轮清洁的压力化学清洗在大多数情况下可恢复完整气流。KL Renovator拆下前面板，通过蒸发器盘管和风轮喷洒高压化学溶液，冲洗排水，并在完成前测试出风口气流。大多数客户在保养后立即感受到明显更强的气流。",
    warningEN: "Weak airflow is often dismissed as normal but it is not — it means the unit is working harder than it should, using more electricity and cooling the room more slowly. A chemical wash restores performance and reduces your electricity bill.",
    warningBM: "Aliran udara lemah sering diabaikan sebagai normal tetapi ia tidak — bermakna unit bekerja lebih keras dari sepatutnya, menggunakan lebih banyak elektrik dan menyejukkan bilik dengan lebih perlahan. Cuci kimia memulihkan prestasi.",
    warningZH: "弱气流通常被视为正常，但实际上不是——这意味着机组比应该的工作更努力，消耗更多电力，冷却房间更慢。化学清洗可恢复性能并降低您的电费。",
    faqs: [
      { q: "Why is my aircond blowing weak air even though it is cold?", a: "A dirty blower wheel is the most likely cause — it can reduce airflow by 40% while still producing cold air. Chemical wash (from RM 120) cleans the blower wheel and restores full airflow. Most customers notice the difference immediately." },
      { q: "How much does chemical wash cost to fix weak airflow?", a: "Pressure chemical wash from RM 120 (1.0–1.5 HP), RM 150 (2.0–2.5 HP), RM 180 (3.0 HP). Ceiling cassette from RM 220. Chemical overhaul (for severely blocked units) from RM 220. All confirmed before work." },
      { q: "How long does it take to fix weak airflow from an aircond?", a: "A chemical wash takes 30–45 minutes per unit. KL Renovator tests airflow at the vents after service to confirm the improvement. Same-day service available." },
    ],
    faqsBM: [
      { q: "Kenapa aircond saya menghembus udara lemah walaupun sejuk?", a: "Roda blower kotor adalah punca paling mungkin — boleh mengurangkan aliran udara sebanyak 40% sambil masih menghasilkan udara sejuk. Cuci kimia (dari RM 120) membersihkan roda blower dan memulihkan aliran udara penuh." },
      { q: "Berapa kos cuci kimia untuk membaiki aliran udara lemah?", a: "Cuci kimia bertekanan dari RM 120 (1.0–1.5 HP), RM 150 (2.0–2.5 HP), RM 180 (3.0 HP). Ceiling cassette dari RM 220. Semua disahkan sebelum kerja." },
    ],
    faqsZH: [
      { q: "为什么我的冷气出风虽然凉但风量很小？", a: "风轮脏污是最可能的原因——在仍然出冷风的情况下，气流量可减少40%。化学清洗（从RM 120起）清洁风轮并恢复完整气流。大多数客户立即感受到改善。" },
      { q: "化学清洗修复弱气流需要多少钱？", a: "压力化学清洗从RM 120（1.0-1.5 HP）、RM 150（2.0-2.5 HP）、RM 180（3.0 HP）起。天花板卡式机从RM 220起。施工前全部确认。" },
    ],
  },
  "aircond-not-turning-on": {
    causesEN: [
      "Tripped MCB — most common and most easily overlooked cause",
      "Dead remote control batteries",
      "Failed capacitor — unit gets power but compressor cannot start",
      "PCB fault — control board not initialising on power-on",
      "Burnt indoor or outdoor unit wiring from electrical fault or insect damage",
    ],
    causesBM: [
      "MCB terjatuh — punca paling biasa dan paling mudah diabaikan",
      "Bateri kawalan jauh habis",
      "Kapasitor gagal — unit mendapat kuasa tetapi pekali tidak dapat bermula",
      "Kerosakan PCB — papan kawalan tidak dimulakan semasa menghidupkan",
      "Pendawaian unit dalam atau luar terbakar dari kerosakan elektrik atau serangga",
    ],
    causesZH: [
      "MCB跳闸——最常见且最容易被忽视的原因",
      "遥控器电池耗尽",
      "电容器失效——机器有电但压缩机无法启动",
      "PCB故障——控制板在开机时无法初始化",
      "室内或室外机接线因电气故障或昆虫损坏而烧毁",
    ],
    solutionEN: "Step 1: Check the MCB panel — if tripped, reset once. Step 2: Replace remote batteries. Step 3: Check the power socket with another device. If all are fine and the unit still does not turn on, the issue is internal — PCB, capacitor, or wiring. KL Renovator diagnoses on-site with a full electrical and mechanical check. Diagnostic RM 88 (waived if repaired same visit).",
    solutionBM: "Langkah 1: Periksa panel MCB — jika terjatuh, tetapkan semula sekali. Langkah 2: Ganti bateri kawalan jauh. Langkah 3: Periksa soket kuasa. Jika semua baik dan unit masih tidak hidup, masalahnya dalaman — PCB, kapasitor, atau pendawaian. KL Renovator mendiagnosis di tempat.",
    solutionZH: "第1步：检查MCB面板——如果跳闸，重置一次。第2步：更换遥控器电池。第3步：用其他设备检查电源插座。如果一切正常但机器仍不开机，问题是内部的——PCB、电容器或接线。KL Renovator上门进行全面电气和机械检查。诊断费RM 88（维修则免收）。",
    warningEN: "If the MCB trips again immediately after resetting, do not keep resetting it — there is an active electrical fault. Call KL Renovator for a safety inspection before the unit is turned on again.",
    warningBM: "Jika MCB jatuh semula selepas menetapkan semula, jangan terus menetapkannya — terdapat kerosakan elektrik aktif. Hubungi KL Renovator untuk pemeriksaan keselamatan.",
    warningZH: "如果MCB在重置后立即再次跳闸，请勿继续重置——存在活跃的电气故障。在再次开机前致电KL Renovator进行安全检查。",
    faqs: [
      { q: "My aircond will not turn on at all — what should I check first?", a: "Check in this order: (1) MCB panel — is the aircond breaker tripped? Reset once. (2) Remote battery — replace with fresh alkaline. (3) Power socket — plug something else in to test. If all fine and unit still dead, WhatsApp KL Renovator at +60182983573." },
      { q: "My aircond makes a click sound but does not start — what is wrong?", a: "A clicking sound with no startup usually means a failed capacitor. The unit is receiving power and the PCB is attempting to start, but the capacitor cannot boost the compressor. Capacitor replacement: RM 180. KL Renovator diagnoses and fixes same-day." },
      { q: "How much does it cost to fix an aircond that will not turn on?", a: "MCB reset: free. Battery: RM 5. Capacitor: RM 180. PCB: RM 300–600. Wiring: RM 100–300. Diagnostic RM 88 (waived with repair). KL Renovator diagnoses exact cause first." },
    ],
    faqsBM: [
      { q: "Aircond saya langsung tidak hidup — apa yang perlu saya periksa dahulu?", a: "Periksa mengikut urutan: (1) Panel MCB — adakah pemutus litar aircond terjatuh? Tetapkan semula sekali. (2) Bateri kawalan jauh — ganti dengan alkali baharu. (3) Soket kuasa. Jika semua baik dan unit masih mati, WhatsApp KL Renovator +60182983573." },
      { q: "Aircond saya berbunyi klik tetapi tidak bermula — apa yang salah?", a: "Bunyi klik tanpa permulaan biasanya bermakna kapasitor gagal. Penggantian kapasitor: RM 180. KL Renovator mendiagnosis dan membaiki hari sama." },
    ],
    faqsZH: [
      { q: "我的冷气完全不开机——应该先检查什么？", a: "按此顺序检查：(1) MCB面板——冷气断路器是否跳闸？重置一次。(2) 遥控器电池——更换新碱性电池。(3) 电源插座。如果一切正常但机器仍不开机，WhatsApp KL Renovator +60182983573。" },
      { q: "我的冷气发出咔哒声但不启动——是什么问题？", a: "有咔哒声但不启动通常意味着电容器故障。电容器更换：RM 180。KL Renovator当天诊断并修复。" },
    ],
  },
  "aircond-blinking-light": {
    causesEN: [
      "Low refrigerant gas triggering low-pressure protection mode with error blink code",
      "Dirty thermistor (temperature sensor) giving incorrect readings to PCB",
      "Communication error between indoor and outdoor PCB boards",
      "Compressor protection trip from overheating or overcurrent",
      "PCB component failure causing a stored fault code to activate",
    ],
    causesBM: [
      "Gas penyejuk rendah mencetuskan mod perlindungan tekanan rendah dengan kod berkelip",
      "Termistor (sensor suhu) kotor memberikan bacaan tidak betul kepada PCB",
      "Ralat komunikasi antara papan PCB dalam dan luar",
      "Perlindungan pekali terjatuh dari terlampau panas atau arus berlebihan",
      "Kegagalan komponen PCB menyebabkan kod kerosakan tersimpan diaktifkan",
    ],
    causesZH: [
      "制冷剂不足触发低压保护模式，产生闪烁错误代码",
      "温度传感器（热敏电阻）脏污，向PCB传送错误读数",
      "室内外PCB板之间通信错误",
      "压缩机因过热或过流跳停保护",
      "PCB元件故障导致存储故障代码激活",
    ],
    solutionEN: "KL Renovator reads the blink pattern (or connects a diagnostic tool for newer models) to identify the exact error code. Most brands use a standardized blink count system — e.g. Daikin A1 = 1 blink, L5 = 5 blinks. Once identified, the specific fault is repaired. Do not reset the unit repeatedly — the blink code is a diagnostic tool, not a glitch.",
    solutionBM: "KL Renovator membaca corak berkelip (atau menghubungkan alat diagnostik untuk model baharu) untuk mengenal pasti kod ralat tepat. Kebanyakan jenama menggunakan sistem kiraan berkelip piawai. Setelah dikenal pasti, kerosakan khusus dibaiki.",
    solutionZH: "KL Renovator读取闪烁模式（或为较新型号连接诊断工具）以确定确切的错误代码。大多数品牌使用标准化的闪烁次数系统——例如大金A1=闪1次，L5=闪5次。确定后，修复具体故障。不要反复重置机器——闪烁代码是诊断工具，不是故障。",
    warningEN: "Error blink codes are your aircond's built-in diagnostic system. Ignoring them or repeatedly resetting the unit without fixing the underlying fault can cause the issue to worsen — especially if it is a low gas or compressor protection code.",
    warningBM: "Kod berkelip ralat adalah sistem diagnostik terbina dalam aircond anda. Mengabaikannya atau menetapkan semula unit berulang kali tanpa membaiki kerosakan asas boleh memburukkan keadaan.",
    warningZH: "错误闪烁代码是冷气内置的诊断系统。忽视它们或在未修复根本故障的情况下反复重置机器可能导致问题恶化——尤其是气体不足或压缩机保护代码。",
    faqs: [
      { q: "How do I know what my aircond error blink code means?", a: "Count the number of blinks, then look up your brand's error code chart (available on KL Renovator's brand pages or WhatsApp us the blink pattern + brand + model). KL Renovator diagnoses all brands remotely via WhatsApp for common codes." },
      { q: "My aircond shows a blinking light and will not cool — how much will it cost to fix?", a: "Depends on the fault: Low gas: RM 120–220 (by HP/gas type). Sensor replacement: RM 150–250. PCB fault: RM 280–600. Capacitor: RM 150–250. Diagnostic RM 88 (waived with repair). WhatsApp KL Renovator the error code for a remote estimate." },
      { q: "Can I reset the error code myself?", a: "You can reset the unit by switching off the MCB for 10 minutes then restoring power. However, if the underlying fault is not fixed, the code will return. KL Renovator repairs the cause, not just resets the code." },
    ],
    faqsBM: [
      { q: "Bagaimana saya tahu apa maksud kod berkelip ralat aircond saya?", a: "Kira bilangan berkelip, kemudian cari carta kod ralat jenama anda (tersedia di halaman jenama KL Renovator atau WhatsApp kami corak berkelip + jenama + model). KL Renovator mendiagnosis semua jenama dari jauh melalui WhatsApp." },
      { q: "Aircond saya menunjukkan lampu berkelip dan tidak menyejuk — berapa kos untuk membaiki?", a: "Bergantung pada kerosakan: Gas rendah: RM 120–220. Penggantian sensor: RM 150–250. Kerosakan PCB: RM 280–600. Kapasitor: RM 150–250. Diagnostik RM 88 (dikecualikan dengan pembaikan)." },
    ],
    faqsZH: [
      { q: "我如何知道冷气闪烁错误代码的含义？", a: "数闪烁次数，然后查找您品牌的错误代码表（可在KL Renovator的品牌页面查看，或WhatsApp我们闪烁模式+品牌+型号）。KL Renovator通过WhatsApp远程诊断所有品牌的常见代码。" },
      { q: "冷气显示闪烁灯且不制冷——修复需要多少钱？", a: "取决于故障：气体不足：RM 120-220。传感器更换：RM 150-250。PCB故障：RM 280-600。电容器：RM 150-250。诊断费RM 88（维修则免收）。" },
    ],
  },
  "aircond-water-dripping": {
    causesEN: [
      "Partially blocked drain pipe — water overflows slowly rather than all at once",
      "Dirty evaporator coil causing excess condensation running off the coil faster than the drain can handle",
      "Cracked or misaligned drain pan directing water to the wrong outlet",
      "Condensation on the cold supply pipe outside the unit dripping onto the ceiling or wall",
      "Drain pipe disconnected at the indoor unit connection point",
    ],
    causesBM: [
      "Paip saliran tersumbat sebahagian — air melimpah perlahan-lahan",
      "Gegelung evaporator kotor menyebabkan kondensasi berlebihan mengalir dari gegelung lebih cepat dari kapasiti saliran",
      "Dulang saliran retak atau tidak sejajar mengarahkan air ke salur keluar yang salah",
      "Kondensasi pada paip bekalan sejuk di luar unit menitis ke siling atau dinding",
      "Paip saliran terputus di titik sambungan unit dalam",
    ],
    causesZH: [
      "排水管部分堵塞——水缓慢溢出而非一次性大量漏出",
      "蒸发器盘管脏污导致过多凝结水从盘管流下，超过排水能力",
      "排水盘破裂或错位，将水导向错误的出口",
      "机器外部冷供水管上的凝结水滴落到天花板或墙壁",
      "室内机连接处排水管脱落",
    ],
    solutionEN: "A chemical wash with drain flush resolves most dripping issues — it clears the partial blockage and removes the algae and sludge that caused it. For persistent dripping or a cracked drain pan, a chemical overhaul is required to fully dismantle, inspect and replace the drain pan if needed. KL Renovator fixes most dripping issues same-day.",
    solutionBM: "Cuci kimia dengan pembilasan saliran menyelesaikan kebanyakan masalah titisan — ia membersihkan sekatan separa dan mengeluarkan alga dan enapan yang menyebabkannya. Untuk titisan berterusan atau dulang saliran retak, overhaul kimia diperlukan.",
    solutionZH: "含排水冲洗的化学清洗可解决大多数滴水问题——清除部分堵塞并去除引起堵塞的藻类和污泥。对于持续滴水或破裂的排水盘，需要化学大修来完全拆卸、检查并在需要时更换排水盘。",
    warningEN: "Small drips that are ignored become large leaks. A blocked drain pan that overflows can stain ceilings, damage drywall, and eventually cause mould growth in the wall cavity. Fix dripping early — it is a quick and inexpensive service.",
    warningBM: "Titisan kecil yang diabaikan menjadi kebocoran besar. Dulang saliran yang tersumbat dan melimpah boleh menodai siling dan menyebabkan pertumbuhan kulat. Baiki titisan awal — ia adalah servis yang cepat dan murah.",
    warningZH: "忽视的小滴水会变成大漏水。溢出的堵塞排水盘会污染天花板、损坏石膏板，并最终导致墙腔内发霉。及早修复滴水——这是一项快速且价格合理的服务。",
    faqs: [
      { q: "Why is water dripping from my aircond?", a: "The most common cause is a partially blocked drain pipe. Chemical wash with drain flush (from RM 120) fixes it in 30–45 minutes. If dripping persists, a chemical overhaul (from RM 220) deep-cleans the drain pan." },
      { q: "Is water dripping from an aircond serious?", a: "Minor dripping is not immediately dangerous but should be fixed promptly to avoid ceiling stains, wall damage and mould. If water is dripping near electrical points, switch off the MCB immediately and call KL Renovator: +60182983573." },
      { q: "How much does it cost to fix aircond water dripping?", a: "Chemical wash (fixes most dripping): from RM 120. Chemical overhaul (for severe or persistent dripping): from RM 220. Both include drain flush and are confirmed before work starts." },
    ],
    faqsBM: [
      { q: "Kenapa air menitis dari aircond saya?", a: "Punca paling biasa adalah paip saliran tersumbat sebahagian. Cuci kimia dengan pembilasan saliran (dari RM 120) membaikinya dalam 30–45 minit. Jika titisan berterusan, overhaul kimia (dari RM 220) membersihkan dulang saliran secara mendalam." },
      { q: "Berapa kos membaiki aircond yang menitis air?", a: "Cuci kimia (membaiki kebanyakan titisan): dari RM 120. Overhaul kimia (untuk titisan teruk): dari RM 220. Kedua-duanya termasuk pembilasan saliran dan disahkan sebelum kerja bermula." },
    ],
    faqsZH: [
      { q: "为什么我的冷气在滴水？", a: "最常见的原因是排水管部分堵塞。含排水冲洗的化学清洗（从RM 120起）可在30-45分钟内修复。如果持续滴水，则需要化学大修（从RM 220起）深度清洁排水盘。" },
      { q: "修复冷气滴水需要多少钱？", a: "化学清洗（修复大多数滴水）：从RM 120起。化学大修（严重或持续滴水）：从RM 220起。两者均含排水冲洗，施工前确认价格。" },
    ],
  },
  "aircond-thermostat-problems": {
    causesEN: [
      "Faulty room temperature thermistor giving incorrect ambient readings to PCB",
      "Incorrect thermostat calibration — unit reaches set temperature but sensor reads differently",
      "PCB fault affecting the temperature regulation circuit",
      "Remote control thermostat setting locked at incorrect temperature",
      "Poor airflow causing hot spots in the room — unit never achieves the displayed set temperature",
    ],
    causesBM: [
      "Termistor suhu bilik rosak memberikan bacaan ambien tidak betul kepada PCB",
      "Kalibrasi termostat tidak betul — unit mencapai suhu yang ditetapkan tetapi sensor membaca secara berbeza",
      "Kerosakan PCB mempengaruhi litar pengawalan suhu",
      "Tetapan termostat kawalan jauh dikunci pada suhu yang salah",
      "Aliran udara yang lemah menyebabkan titik panas dalam bilik",
    ],
    causesZH: [
      "室温热敏电阻故障，向PCB传送错误的环境温度读数",
      "温控器校准不正确——机组达到设定温度但传感器读数不同",
      "PCB故障影响温度调节电路",
      "遥控器温控器设置被锁定在错误温度",
      "气流不良导致房间内出现热点——机组从未达到显示的设定温度",
    ],
    solutionEN: "KL Renovator tests the thermistor resistance with a multimeter to determine if it is giving correct readings for the ambient temperature. A faulty thermistor is replaced (RM 150–250). If the PCB's temperature regulation circuit is at fault, PCB repair or replacement is recommended. If the issue is poor airflow, a chemical wash resolves it.",
    solutionBM: "KL Renovator menguji rintangan termistor dengan multimeter untuk menentukan sama ada ia memberikan bacaan yang betul untuk suhu ambien. Termistor yang rosak diganti (RM 150–250). Jika litar pengawalan suhu PCB bermasalah, pembaikan atau penggantian PCB disyorkan.",
    solutionZH: "KL Renovator使用万用表测试热敏电阻阻值，确定其是否在环境温度下给出正确读数。有故障的热敏电阻予以更换（RM 150-250）。如果是PCB的温度调节电路有问题，建议修复或更换PCB。如果是气流问题，化学清洗可解决。",
    warningEN: "A malfunctioning thermostat causes the compressor to run continuously without cycling off — significantly increasing electricity consumption. If your room feels cold but the unit never seems to stop, get the thermistor checked.",
    warningBM: "Termostat yang tidak berfungsi menyebabkan pekali berjalan berterusan tanpa berhenti — meningkatkan penggunaan elektrik dengan ketara. Jika bilik terasa sejuk tetapi unit nampaknya tidak pernah berhenti, periksa termistor.",
    warningZH: "故障的温控器导致压缩机持续运行而不循环停机——显著增加耗电量。如果您的房间感觉很冷但机器似乎从不停止，请检查热敏电阻。",
    faqs: [
      { q: "My aircond does not stop running even when the room is cold — is the thermostat broken?", a: "Possibly — the thermistor may be giving incorrect readings, causing the PCB to think the room is still warm. Other causes: set temperature too low, remote control calibration issue, or PCB fault. KL Renovator diagnoses with a multimeter." },
      { q: "My aircond cannot maintain a steady temperature — keeps cycling on and off too quickly. What is wrong?", a: "Short cycling usually means the unit is oversized for the room, refrigerant is overcharged, or the thermostat sensor is faulty. KL Renovator diagnoses the exact cause and advises the most economical solution." },
      { q: "How much does thermistor replacement cost for an aircond?", a: "Thermistor (temperature sensor) replacement: RM 150–250 depending on brand and sensor type. Diagnostic RM 88 (waived with repair). KL Renovator carries common thermistor types for same-day replacement." },
    ],
    faqsBM: [
      { q: "Aircond saya tidak berhenti berjalan walaupun bilik sejuk — adakah termostat rosak?", a: "Mungkin — termistor mungkin memberikan bacaan yang salah. KL Renovator mendiagnosis dengan multimeter." },
      { q: "Berapa kos ganti termistor aircond?", a: "Penggantian termistor: RM 150–250 bergantung pada jenama. Diagnostik RM 88 (dikecualikan dengan pembaikan). KL Renovator membawa jenis termistor biasa untuk penggantian hari sama." },
    ],
    faqsZH: [
      { q: "我的冷气即使房间很冷也不停止运行——是温控器坏了吗？", a: "可能——热敏电阻可能在给出错误读数。KL Renovator使用万用表进行诊断。" },
      { q: "更换冷气热敏电阻需要多少钱？", a: "热敏电阻（温度传感器）更换：RM 150-250，取决于品牌。诊断费RM 88（维修则免收）。KL Renovator备有常见热敏电阻类型可当天更换。" },
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

// ── Emergency-urgency problems (get red emergency CTA) ────────────────────────
const EMERGENCY_PROBLEMS = [
  "aircond-tripping-power",
  "aircond-outdoor-unit-not-running",
  "aircond-not-turning-on",
  "aircond-compressor-problem",
  "aircond-indoor-unit-leaking",
];

// ── Problem → Blog relevance map ─────────────────────────────────────────────
import { PROBLEM_BLOG_MAP_V2, PROBLEM_SERVICE_MAP } from "@/config/topical-authority-map";

const PROBLEM_BLOG_MAP: Record<string, string[]> = {
  "aircond-not-cold": ["aircond-not-cold-reasons", "r32-r410a-r22-gas-difference", "aircond-troubleshooting-guide-malaysia"],
  "aircond-water-leaking": ["aircond-water-leaking-causes", "chemical-wash-vs-chemical-overhaul", "signs-your-aircond-needs-chemical-overhaul-malaysia"],
  "aircond-making-noise": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-bad-smell": ["how-often-service-aircond-malaysia", "aircond-chemical-wash-price-malaysia-2026", "chemical-wash-vs-chemical-overhaul"],
  "aircond-freezing-up": ["aircond-not-cold-reasons", "r32-r410a-r22-gas-difference", "aircond-water-leaking-causes"],
  "aircond-low-gas": ["r32-r410a-r22-gas-difference", "aircond-not-cold-reasons", "aircond-gas-topup-myths-malaysia"],
  "aircond-gas-leak": ["r32-r410a-r22-gas-difference", "aircond-gas-topup-myths-malaysia", "aircond-troubleshooting-guide-malaysia"],
  "aircond-compressor-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia", "best-aircond-brands-malaysia-2025"],
  "aircond-pcb-problem": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-high-electricity-bill": ["how-to-reduce-aircond-electricity-bill-malaysia", "inverter-vs-non-inverter-aircond-malaysia", "how-often-service-aircond-malaysia"],
  "aircond-weak-airflow": ["aircond-chemical-wash-price-malaysia-2026", "how-often-service-aircond-malaysia"],
  "aircond-fan-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-tripping-power": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-remote-not-working": ["aircond-troubleshooting-guide-malaysia", "aircond-maintenance-checklist-malaysia"],
  "aircond-indoor-unit-leaking": ["aircond-water-leaking-causes", "signs-your-aircond-needs-chemical-overhaul-malaysia"],
  "aircond-outdoor-unit-not-running": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
  "aircond-blinking-light": ["aircond-troubleshooting-guide-malaysia"],
  "aircond-water-dripping": ["aircond-water-leaking-causes", "aircond-chemical-wash-price-malaysia-2026"],
  "aircond-thermostat-problems": ["aircond-troubleshooting-guide-malaysia", "how-often-service-aircond-malaysia"],
  "aircond-not-turning-on": ["aircond-troubleshooting-guide-malaysia", "aircond-lifespan-malaysia"],
};

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
  const secondaryServiceSlug = PROBLEM_SERVICE_MAP[slug]?.secondary;
  const secondaryService = secondaryServiceSlug ? servicesData[secondaryServiceSlug] : null;
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://www.klrenovator.com/problems/${slug}#webpage`,
    name: problem.metaTitle,
    description: problem.metaDesc,
    url: `https://www.klrenovator.com/problems/${slug}`,
    inLanguage: "en-MY",
    isPartOf: { "@id": "https://www.klrenovator.com/#website" },
    about: { "@id": "https://www.klrenovator.com/#business" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".speakable"] },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

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

      {/* Trust Signal Strip */}
      <section className="bg-slate-900 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Diagnostic RM 88 — Waived With Repair</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Same-Day Service Available</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1-Month Workmanship Warranty</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Price Confirmed Before Work</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> All Brands Serviced</span>
        </div>
      </section>

      {/* Emergency CTA — only for high-urgency problems */}
      {EMERGENCY_PROBLEMS.includes(slug) && (
        <section className="bg-gradient-to-r from-red-700 to-rose-600 text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-black text-sm uppercase tracking-wider">This is an Emergency-Level Problem</p>
                <p className="text-red-100 text-xs mt-0.5">Do NOT delay — switch off your unit and call KL Renovator now.</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://wa.me/60182983573?text=%F0%9F%9A%A8%20URGENT%20%E2%80%94%20Emergency%20Aircond%20Service%20Needed%0A%0AHi%20KL%20Renovator%2C%20I%20need%20EMERGENCY%20aircond%20help%20right%20now.%0A%0A%F0%9F%93%8D%20Location%3A%0A%E2%9D%84%EF%B8%8F%20Problem%3A%0A%0APlease%20send%20a%20technician%20ASAP."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 font-black uppercase tracking-wider px-4 py-2 rounded-xl text-xs transition-all"
              >
                🚨 WhatsApp Emergency Now
              </a>
              <NextLink
                href="/services/emergency"
                className="inline-flex items-center gap-1 border border-white/40 text-white hover:bg-white/10 font-bold px-4 py-2 rounded-xl text-xs transition-all"
              >
                Emergency Service →
              </NextLink>
            </div>
          </div>
        </section>
      )}

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

      {/* Related Services — primary + secondary from topical map */}
      {relatedService && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-4">
                Recommended Services · Perkhidmatan Disyorkan · 推荐服务
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
                {/* Primary service */}
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">Best Fix</p>
                  <h3 className="font-black text-base text-slate-900 mb-1">{relatedService.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{relatedService.tagline}</p>
                  <div className="flex items-center gap-2">
                    <NextLink
                      href={`/services/${relatedService.slug}`}
                      className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                    >
                      <FiArrowRight className="h-3.5 w-3.5" />
                      View Service →
                    </NextLink>
                    <span className="text-xs font-black text-sky-700">from RM {relatedService.startPrice}</span>
                  </div>
                </div>
                {/* Secondary service */}
                {secondaryService && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Also Consider</p>
                    <h3 className="font-black text-base text-slate-900 mb-1">{secondaryService.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{secondaryService.tagline}</p>
                    <div className="flex items-center gap-2">
                      <NextLink
                        href={`/services/${secondaryService.slug}`}
                        className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-sky-400 text-slate-700 hover:text-sky-700 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                      >
                        View Service →
                      </NextLink>
                      <span className="text-xs font-black text-slate-500">from RM {secondaryService.startPrice}</span>
                    </div>
                  </div>
                )}
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
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Related Problems · Masalah Berkaitan · 相关问题
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              Other Common Aircond Problems We Fix
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedProblems.map((p) => (
                <NextLink
                  key={p.slug}
                  href={`/problems/${p.slug}`}
                  className="flex items-start gap-2.5 border border-slate-200 bg-slate-50 hover:border-red-200 hover:bg-red-50 px-4 py-3 text-sm font-bold text-slate-700 hover:text-red-700 rounded-xl transition-all group"
                >
                  <FiArrowRight className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <span className="block">{p.name}</span>
                    <span className="text-xs text-slate-400 font-normal group-hover:text-red-400">{p.nameMS} · {p.nameZH}</span>
                  </span>
                </NextLink>
              ))}
            </div>
            <NextLink href="/problems" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-red-600 hover:text-red-800 transition">
              All Aircond Problems → <FiArrowRight className="h-3 w-3" />
            </NextLink>
          </Reveal>
        </div>
      </section>

      {/* Areas */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
              Fix By Location · Baiki Mengikut Lokasi · 按地区修复
            </p>
            <h2 className="text-base font-black text-slate-900 mb-4">
              {problem.name} Repair — KL & Selangor Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {siteConfig.areaPages.slice(0, 14).map((area) => (
                <NextLink
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-sky-700 rounded-xl transition-all"
                >
                  <FiMapPin className="h-3 w-3 text-sky-400 shrink-0" />
                  {problem.name} {area.name}
                </NextLink>
              ))}
              <NextLink
                href="/areas"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 text-xs font-black text-sky-700 rounded-xl transition-all"
              >
                All 35+ Areas <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      {/* Related Blog Articles */}
      {(() => {
        const relatedSlugs = (PROBLEM_BLOG_MAP_V2[slug] ?? PROBLEM_BLOG_MAP[slug] ?? []);
        const relatedPosts = allPosts.filter((p) => relatedSlugs.includes(p.slug)).slice(0, 3);
        if (relatedPosts.length === 0) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Expert Guides · Panduan · 指南</p>
              <h2 className="text-base font-black text-slate-900 mb-4">Related Aircond Guides</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((post) => (
                  <NextLink
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-md transition"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{post.category}</span>
                    <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition leading-snug mb-2">{post.title}</span>
                    <span className="text-xs text-slate-500 mt-auto">{post.readTime} min read</span>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related Aircond Problems */}
      <section className="py-10 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Also See · Lihat Juga · 另见</p>
          <h2 className="text-base font-black text-slate-900 mb-4">Other Common Aircond Problems</h2>
          <div className="flex flex-wrap gap-2">
            {siteConfig.problemPages
              .filter((p) => p.slug !== slug)
              .slice(0, 10)
              .map((p) => (
                <NextLink
                  key={p.slug}
                  href={`/problems/${p.slug}`}
                  className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 rounded-full hover:border-sky-500 hover:text-sky-600 transition"
                >
                  {p.name}
                </NextLink>
              ))}
            <NextLink href="/problems" className="inline-flex items-center gap-1 border border-sky-400 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 rounded-full hover:bg-sky-100 transition">
              All Problems →
            </NextLink>
          </div>
        </div>
      </section>

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
