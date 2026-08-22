import Link from "next/link";

import { publishedPrices } from "@/lib/published-prices";
import { reviewDateDisplay, type ContentCollection } from "@/config/content-review-dates";

type Locale = "en" | "ms" | "zh";
type CommercialContext = "area" | "kampung" | "brand" | "brand-area" | "installation";

type Citation = {
  label: string;
  href: string;
  en: string;
  ms: string;
  zh: string;
};

const CITATIONS: Citation[] = [
  {
    label: "Energy Commission Malaysia MEPS air-conditioner guide",
    href: "https://www.st.gov.my/contents/2021/MEPS/20210108%20-Guide%20on%20MEPS%20for%20AC%20(UPDATED).pdf",
    en: "Energy Commission guidance on MEPS and air-conditioner efficiency labels",
    ms: "panduan Suruhanjaya Tenaga tentang MEPS dan label kecekapan pendingin hawa",
    zh: "马来西亚能源委员会关于冷气 MEPS 与能效标签的指南",
  },
  {
    label: "TNB guide to electricity usage and tariffs",
    href: "https://www.mytnb.com.my/residential/understand-your-bill/online-bill-layout",
    en: "TNB guidance on kWh usage, tariff blocks and electricity-bill readings",
    ms: "panduan TNB tentang penggunaan kWh, blok tarif dan bacaan bil elektrik",
    zh: "TNB 关于 kWh 用量、电费结构与账单阅读的说明",
  },
  {
    label: "SIRIM QAS product certification scheme",
    href: "https://www.sirim-qas.com.my/service/product-certification-scheme/",
    en: "SIRIM QAS product certification information for compliant electrical products",
    ms: "maklumat pensijilan produk SIRIM QAS untuk produk elektrik patuh piawaian",
    zh: "SIRIM QAS 关于合规电器产品认证的资料",
  },
  {
    label: "DOSH Malaysia work-at-height guidance",
    href: "https://www.dosh.gov.my/index.php/construction-safety-v/work-at-height",
    en: "DOSH work-at-height guidance for safe access and fall-risk control",
    ms: "panduan JKKP/DOSH kerja di tempat tinggi untuk akses selamat dan kawalan risiko jatuh",
    zh: "马来西亚职业安全卫生局关于高处作业安全通道与防坠风险控制的指引",
  },
];

const TECHNICIANS = [
  { name: "Muhammad", role: { en: "Owner & Founder", ms: "Pemilik & Pengasas", zh: "创办人兼负责人" } },
  { name: "Shahzaib", role: { en: "Senior Installation Technician", ms: "Juruteknik Pemasangan Kanan", zh: "资深安装技术员" } },
  { name: "Mudassar", role: { en: "Service & Chemical Wash Technician", ms: "服务与化学清洗技术员", zh: "服务与化学清洗技术员" } },
  { name: "Hamzah", role: { en: "Service Technician", ms: "Juruteknik Servis", zh: "维修保养技术员" } },
] as const;

function hashText(value: string): number {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function technicianFor(seed: string) {
  return TECHNICIANS[hashText(seed) % TECHNICIANS.length];
}

function citationsFor(seed: string, context: CommercialContext): Citation[] {
  const offset = hashText(seed) % CITATIONS.length;
  const first = CITATIONS[offset];
  const second = context === "installation" || context === "brand-area" ? CITATIONS[(offset + 2) % CITATIONS.length] : undefined;
  return second && second.href !== first.href ? [first, second] : [first];
}

function collectionFor(context: CommercialContext): ContentCollection {
  if (context === "kampung") return "kampungs";
  if (context === "brand" || context === "brand-area") return "brands";
  return "areas";
}

const copy = {
  en: {
    priceEyebrow: "Published pricing · comparison table",
    priceTitle: "What does aircond service cost compared with repair or installation?",
    priceIntro: (name: string) => `Use this table as a starting point before booking in ${name}. These are KL Renovator's published prices; the technician confirms the final scope on-site before work starts.`,
    definitionTitle: (name: string) => `What is aircond service for ${name}?`,
    definitionBody: (name: string) => `Aircond service for ${name} means a technician checks cooling performance, airflow, drainage, electrical safety and visible wear before recommending basic cleaning, chemical wash, troubleshooting or replacement. The goal is to solve the actual fault without selling unnecessary work.`,
    service: "Service option",
    price: "Published price",
    use: "Best for",
    rows: [
      ["Basic service / cleaning", publishedPrices.basic15, "Routine maintenance when cooling is still acceptable"],
      ["Pressure chemical wash", publishedPrices.chemicalWash15, "Weak airflow, odour, dusty blower wheel or indoor coil grime"],
      ["Chemical overhaul", publishedPrices.overhaul15, "Severe blockage or water leaking after normal servicing"],
      ["Diagnostic / troubleshooting", publishedPrices.diagnostic, "Unknown fault, tripping, blinking light or noisy outdoor unit"],
      ["New wall-mounted installation", publishedPrices.installWall15, "Replacing an old unit or fitting a new room"],
    ],
    note: `Gas top-up is charged by refrigerant: R22 ${publishedPrices.r22}, R410A ${publishedPrices.r410a}, R32 ${publishedPrices.r32}. Extra copper pipe, wiring or access work follows the published material list.`,
    expertEyebrow: "Expert review",
    reviewedBy: "Reviewed by",
    lastReviewed: "Last reviewed",
    aboutTeam: "About the KL Renovator technician team",
    expertBody: (name: string) => `This ${name} page was checked by KL Renovator's licensed and certified aircond technicians against the current service scope, warranty wording and published price list. The review focuses on realistic dispatch, safe electrical practice, transparent quotations and when a repair is more sensible than replacement.`,
    sourceTitle: "External reference notes",
    sourceIntro: "Relevant public references used when we discuss efficiency labels, electricity use, product compliance or work-at-height safety:",
  },
  ms: {
    priceEyebrow: "Harga diterbitkan · jadual perbandingan",
    priceTitle: "Berapa kos servis aircond berbanding baiki atau pemasangan?",
    priceIntro: (name: string) => `Gunakan jadual ini sebagai rujukan awal sebelum menempah di ${name}. Ini harga diterbitkan KL Renovator; juruteknik mengesahkan skop akhir di lokasi sebelum kerja bermula.`,
    definitionTitle: (name: string) => `Apa itu servis aircond untuk ${name}?`,
    definitionBody: (name: string) => `Servis aircond untuk ${name} bermaksud juruteknik memeriksa prestasi sejuk, aliran udara, saliran, keselamatan elektrik dan tanda haus sebelum mencadangkan cuci asas, cuci kimia, troubleshooting atau penggantian. Matlamatnya menyelesaikan punca sebenar tanpa kerja yang tidak perlu.`,
    service: "Pilihan servis",
    price: "Harga diterbitkan",
    use: "Sesuai untuk",
    rows: [
      ["Servis asas / pembersihan", publishedPrices.basic15, "Penyelenggaraan rutin apabila penyejukan masih memadai"],
      ["Cuci kimia tekanan", publishedPrices.chemicalWash15, "Angin lemah, bau, blower berdebu atau gegelung indoor kotor"],
      ["Overhaul kimia", publishedPrices.overhaul15, "Sumbatan teruk atau air bocor selepas servis biasa"],
      ["Diagnostik / troubleshooting", publishedPrices.diagnostic, "Kerosakan tidak pasti, trip elektrik, lampu berkelip atau outdoor bising"],
      ["Pemasangan unit dinding baharu", publishedPrices.installWall15, "Ganti unit lama atau pasang untuk bilik baharu"],
    ],
    note: `Tambah gas dicaj mengikut refrigeran: R22 ${publishedPrices.r22}, R410A ${publishedPrices.r410a}, R32 ${publishedPrices.r32}. Paip tembaga, wayar tambahan atau kerja akses ikut senarai bahan diterbitkan.`,
    expertEyebrow: "Semakan pakar",
    reviewedBy: "Disemak oleh",
    lastReviewed: "Terakhir disemak",
    aboutTeam: "Tentang pasukan juruteknik KL Renovator",
    expertBody: (name: string) => `Halaman ${name} ini disemak oleh juruteknik aircond KL Renovator yang berlesen dan bersijil terhadap skop servis semasa, ayat waranti dan senarai harga diterbitkan. Semakan menumpukan realiti dispatch, amalan elektrik selamat, sebut harga telus dan bila baiki lebih munasabah daripada ganti.`,
    sourceTitle: "Nota rujukan luaran",
    sourceIntro: "Rujukan awam yang relevan apabila kami menerangkan label kecekapan, penggunaan elektrik, pematuhan produk atau keselamatan kerja tinggi:",
  },
  zh: {
    priceEyebrow: "公开价格 · 对比表",
    priceTitle: "冷气保养、维修和安装费用如何比较？",
    priceIntro: (name: string) => `在 ${name} 预约前，可先参考这张表。以下为 KL Renovator 公开价格；技术员会在现场开工前确认最终范围。`,
    definitionTitle: (name: string) => `${name} 的冷气服务是什么？`,
    definitionBody: (name: string) => `${name} 的冷气服务，是技术员先检查制冷、风量、排水、电气安全和明显损耗，再建议基本清洗、化学清洗、故障排查或更换。重点是解决真正原因，而不是推销不需要的工程。`,
    service: "服务选项",
    price: "公开价格",
    use: "适合情况",
    rows: [
      ["基本保养 / 清洗", publishedPrices.basic15, "冷度尚可、需要例行保养时"],
      ["压力化学清洗", publishedPrices.chemicalWash15, "风量弱、有异味、风轮积尘或室内盘管污垢"],
      ["化学大修", publishedPrices.overhaul15, "严重堵塞，或普通保养后仍然漏水"],
      ["故障检测 / 排查", publishedPrices.diagnostic, "原因不明、跳电、指示灯闪烁或室外机噪音"],
      ["壁挂机新安装", publishedPrices.installWall15, "更换旧机或为新房间安装"],
    ],
    note: `补充冷媒按种类计费：R22 ${publishedPrices.r22}，R410A ${publishedPrices.r410a}，R32 ${publishedPrices.r32}。额外铜管、电线或高空/通道工程按公开材料价计算。`,
    expertEyebrow: "专家审核",
    reviewedBy: "审核人",
    lastReviewed: "最后审核",
    aboutTeam: "了解 KL Renovator 技术团队",
    expertBody: (name: string) => `此 ${name} 页面已由 KL Renovator 持牌并认证的冷气技术员，根据目前服务范围、保修说明和公开价目表审核。审核重点包括实际派工、安全用电、透明报价，以及什么时候维修比更换更合理。`,
    sourceTitle: "外部参考说明",
    sourceIntro: "当我们说明能效标签、用电量、产品合规或高处作业安全时，会参考以下相关公开资料：",
  },
} as const;

export function LocalPriceComparisonTable({ locale, name }: { locale: Locale; name: string }) {
  const t = copy[locale];
  const rowOffset = hashText(`${locale}-${name}`) % t.rows.length;
  const rows = [...t.rows.slice(rowOffset), ...t.rows.slice(0, rowOffset)];
  const localUse = (use: string) => {
    if (locale === "ms") return `Untuk ${name}: ${use.charAt(0).toLowerCase()}${use.slice(1)}`;
    if (locale === "zh") return `${name}：${use}`;
    return `For ${name}: ${use.charAt(0).toLowerCase()}${use.slice(1)}`;
  };
  return (
    <section className="py-10 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-widest text-sky-700">{t.priceEyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{t.priceTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">{t.priceIntro(name)}</p>
        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
          <h3 className="text-lg font-black text-slate-950">{t.definitionTitle(name)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.definitionBody(name)}</p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
            <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-widest text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3">{t.service}</th>
                <th scope="col" className="px-4 py-3">{t.price}</th>
                <th scope="col" className="px-4 py-3">{t.use}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(([service, price, use]) => (
                <tr key={service} className="odd:bg-white even:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold text-slate-900">{service}</td>
                  <td className="px-4 py-3 font-black text-sky-700 whitespace-nowrap">{price}</td>
                  <td className="px-4 py-3 text-slate-700">{localUse(use)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-600">{t.note}</p>
      </div>
    </section>
  );
}

export function ExpertReviewBlock({
  locale,
  name,
  context,
  seed,
}: {
  locale: Locale;
  name: string;
  context: CommercialContext;
  seed: string;
}) {
  const t = copy[locale];
  const tech = technicianFor(seed);
  const citations = citationsFor(seed, context);
  const reviewDate = reviewDateDisplay(collectionFor(context), locale);
  const aboutHref = locale === "en" ? "/about" : `/${locale}/about`;

  return (
    <section className="py-10 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">{t.expertEyebrow}</p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
              {t.reviewedBy} {tech.name}, {tech.role[locale]}
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-600">
              {t.lastReviewed}: {reviewDate}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{t.expertBody(name)}</p>
            <Link href={aboutHref} className="mt-4 inline-flex text-sm font-black text-sky-700 hover:text-sky-900">
              {t.aboutTeam} →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-950">{t.sourceTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.sourceIntro}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {citations.map((citation) => (
                <li key={citation.href} className="flex gap-2 text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                  <a href={citation.href} target="_blank" rel="noopener noreferrer" className="font-bold text-sky-700 underline decoration-sky-200 underline-offset-2 hover:text-sky-900">
                    {citation[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
