import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import { waLink } from "@/lib/whatsapp";

type Locale = "en" | "ms" | "zh";

const COPY: Record<Locale, {
  eyebrow: string;
  title1: string;
  title2: string;
  desc: string;
  unitType: string;
  size: string;
  from: string;
  extra: string;
  explore: string;
  quote: string;
  includes: string;
  rows: { type: string; hp: string; price: string }[];
  included: string[];
}> = {
  en: {
    eyebrow: "Our #1 Service",
    title1: "Aircond Installation",
    title2: "From RM 199",
    desc: "Wall-mounted, ceiling cassette and window units for all 20 brands across Kuala Lumpur and Selangor. Every job includes mandatory vacuum pump commissioning — the step most cheap installers skip, and the one that protects your compressor and manufacturer warranty.",
    unitType: "Unit Type",
    size: "Size",
    from: "From",
    extra: "Extra copper pipe beyond 7 ft is RM 17–27/ft depending on HP. All extras are quoted and approved on site before any drilling starts.",
    explore: "Explore Installation",
    quote: "Get a Quote",
    includes: "Every Installation Includes",
    rows: [
      { type: "Wall-Mounted", hp: "1.0 – 1.5 HP", price: "RM 199" },
      { type: "Wall-Mounted", hp: "2.0 HP", price: "RM 249" },
      { type: "Wall-Mounted", hp: "3.0 HP", price: "RM 329" },
      { type: "Ceiling Cassette", hp: "1.0 – 1.5 HP", price: "RM 290" },
      { type: "Window Unit", hp: "1.0 – 2.0 HP", price: "RM 180" },
    ],
    included: [
      "7 ft copper pipe + Armaflex insulation",
      "Electrical wiring & drain pipe",
      "Outdoor bracket (paid special charge if required)",
      "Vacuum pump commissioning (500 microns)",
      "15-minute run & cooling test",
      "1-month written workmanship warranty",
    ],
  },
  ms: {
    eyebrow: "Servis #1 Kami",
    title1: "Pemasangan Aircond",
    title2: "Dari RM 199",
    desc: "Unit dinding, ceiling cassette dan tingkap untuk semua 20 jenama di Kuala Lumpur dan Selangor. Setiap kerja termasuk vakum pam wajib — langkah yang sering dilangkau pemasang murah, dan yang melindungi kompresor serta waranti pengilang anda.",
    unitType: "Jenis Unit",
    size: "Saiz",
    from: "Dari",
    extra: "Paip tembaga tambahan melebihi 7 kaki adalah RM 17–27/kaki bergantung HP. Semua tambahan disahkan di tapak sebelum sebarang tebukan bermula.",
    explore: "Lihat Pemasangan",
    quote: "Dapatkan Sebut Harga",
    includes: "Setiap Pemasangan Termasuk",
    rows: [
      { type: "Dinding", hp: "1.0 – 1.5 HP", price: "RM 199" },
      { type: "Dinding", hp: "2.0 HP", price: "RM 249" },
      { type: "Dinding", hp: "3.0 HP", price: "RM 329" },
      { type: "Cassette Siling", hp: "1.0 – 1.5 HP", price: "RM 290" },
      { type: "Unit Tingkap", hp: "1.0 – 2.0 HP", price: "RM 180" },
    ],
    included: [
      "Paip kuprum 7 kaki + penebat Armaflex",
      "Pendawaian elektrik & paip saliran",
      "Pilihan braket luar berbayar jika diperlukan",
      "Vakum pam (500 mikron)",
      "Ujian jalan & penyejukan 15 minit",
      "Waranti kerja bertulis 1 bulan",
    ],
  },
  zh: {
    eyebrow: "我们的 #1 服务",
    title1: "冷气安装",
    title2: "低至 RM 199",
    desc: "吉隆坡与雪兰莪全覆盖，壁挂式、天花板卡式机与窗式机型，支持全部20个品牌。每项工程都包含强制性真空泵调试——这是许多廉价安装工跳过的步骤，却是保护压缩机与原厂保修的关键。",
    unitType: "机型",
    size: "匹数",
    from: "起价",
    extra: "7英尺以外铜管按匹数 RM 17–27/英尺计费。所有额外费用在钻孔前现场确认。",
    explore: "查看安装",
    quote: "获取报价",
    includes: "每次安装均包含",
    rows: [
      { type: "挂壁式", hp: "1.0 – 1.5 HP", price: "RM 199" },
      { type: "挂壁式", hp: "2.0 HP", price: "RM 249" },
      { type: "挂壁式", hp: "3.0 HP", price: "RM 329" },
      { type: "天花板卡式", hp: "1.0 – 1.5 HP", price: "RM 290" },
      { type: "窗式机", hp: "1.0 – 2.0 HP", price: "RM 180" },
    ],
    included: [
      "7英尺铜管 + Armaflex保温",
      "电线与排水管",
      "标准室外机支架",
      "真空泵调试 (500微米)",
      "15分钟运行与制冷测试",
      "1个月书面工艺保修",
    ],
  },
};

export function InstallationSpotlight({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale] || COPY.en;
  const wa = waLink(
    locale === "ms"
      ? "🔧 Pertanyaan Pemasangan Aircond\n\nHai KL Renovator, saya mahu harga pemasangan yang disahkan.\n\n📍 Kawasan:\n❄️ Jenis unit:\n📏 Saiz HP:\n🏠 Hartanah:\n🔢 Bil unit:\n\nTerima kasih!"
      : locale === "zh"
        ? "🔧 冷气安装咨询\n\n你好 KL Renovator，我想确认安装价格。\n\n📍 地区:\n❄️ 机型:\n📏 匹数:\n🏠 物业类型:\n🔢 台数:\n\n谢谢！"
        : "🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I'd like a confirmed installation price.\n\n📍 Area:\n❄️ Unit type (wall-mounted / cassette / window):\n📏 HP size:\n🏠 Property (condo / landed / office):\n🔢 Number of units:\n\nThank you!",
  );

  return (
    <section id="installation" className="relative overflow-hidden border-y border-slate-100 bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">{t.eyebrow}</p>
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t.title1} <span className="text-sky-600">{t.title2}</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{t.desc}</p>

            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-[1.4fr_1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-600">
                <span>{t.unitType}</span>
                <span>{t.size}</span>
                <span className="text-right">{t.from}</span>
              </div>
              {t.rows.map((row) => (
                <div key={`${row.type}-${row.hp}`} className="grid grid-cols-[1.4fr_1fr_auto] gap-3 border-b border-slate-50 px-4 py-2.5 text-sm last:border-0">
                  <span className="font-semibold text-slate-900">{row.type}</span>
                  <span className="text-slate-500">{row.hp}</span>
                  <span className="text-right font-black text-sky-600">{row.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{t.extra}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NextLink href="/installation" className="inline-flex flex-1 items-center justify-center gap-2 bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-[0.97]">
                {t.explore} <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
              <a href={wa} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 bg-[#22c55e] px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#16a34a] active:scale-[0.97]">
                <FaWhatsapp className="h-4 w-4" /> {t.quote}
              </a>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
              <Image src="/hero/aircond-installation-wall-mounted-kl.webp" alt="Professional wall-mounted aircond installation by KL Renovator in Kuala Lumpur" fill sizes="(max-width: 1024px) 100vw, 600px" loading="lazy" decoding="async" quality={74} className="object-cover" />
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-emerald-700">{t.includes}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {t.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="mt-1 h-3 w-3 shrink-0 text-emerald-500" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/1hp-aircond-installation-kl", label: "1 HP" },
                { href: "/1.5hp-aircond-installation-kl", label: "1.5 HP" },
                { href: "/2hp-aircond-installation-kl", label: "2 HP" },
                { href: "/ceiling-cassette-aircond-installation-kl", label: locale === "ms" ? "Cassette" : locale === "zh" ? "卡式" : "Cassette" },
                { href: "/commercial-aircond-installation", label: locale === "ms" ? "Komersial" : locale === "zh" ? "商业" : "Commercial" },
                { href: "/btu-calculator", label: "BTU" },
              ].map((link) => (
                <NextLink key={link.href} href={link.href} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600">{link.label}</NextLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
