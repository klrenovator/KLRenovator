import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { title, eyebrow } from "@/components/primitives";

type Locale = "en" | "ms" | "zh";

const COPY: Record<Locale, { eyebrow: string; title1: string; title2: string; desc: string; trust: string }> = {
  en: {
    eyebrow: "Local Servicing Network",
    title1: "Our Core ",
    title2: "Coverage Areas",
    desc: "We dispatch professional HVAC teams daily across Kuala Lumpur and Selangor. Click any area to see local pricing and service details.",
    trust: "Rapid Response Dispatch Guaranteed Across All Listed Regions",
  },
  ms: {
    eyebrow: "Rangkaian Servis Tempatan",
    title1: "Kawasan ",
    title2: "Liputan Utama Kami",
    desc: "Kami menghantar pasukan HVAC profesional setiap hari di seluruh Kuala Lumpur dan Selangor. Klik mana-mana kawasan untuk harga dan butiran servis setempat.",
    trust: "Jaminan Penghantaran Respons Pantas di Semua Kawasan Tersenarai",
  },
  zh: {
    eyebrow: "本地服务网络",
    title1: "核心 ",
    title2: "服务区域",
    desc: "我们每天在吉隆坡和雪兰莪派遣专业HVAC团队。点击任意区域查看本地价格与服务详情。",
    trust: "保证在所有列出区域快速响应派遣",
  },
};

const FEATURED_KAMPUNGS = [
  { name: "Pandan Indah", parentSlug: "ampang", slug: "pandan-indah" },
  { name: "Bukit Jalil", parentSlug: "sri-petaling", slug: "bukit-jalil" },
  { name: "USJ", parentSlug: "subang-jaya", slug: "usj" },
  { name: "Meru", parentSlug: "klang", slug: "meru" },
  { name: "Port Klang", parentSlug: "klang", slug: "port-klang" },
  { name: "Kundang", parentSlug: "rawang", slug: "kundang" },
  { name: "Dengkil", parentSlug: "putrajaya", slug: "dengkil" },
];

export const CoverageAreas = ({ locale = "en" }: { locale?: Locale }) => {
  const t = COPY[locale] || COPY.en;
  const href = (path: string) =>
    locale === "ms" ? `/ms${path}` : locale === "zh" ? `/zh${path}` : path;

  return (
    <section id="coverage" className="py-20 bg-white relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className={eyebrow()}>{t.eyebrow}</p>
          <h2 className="mt-3">
            <span className={title({ size: "sm" })}>{t.title1}</span>
            <span className={title({ size: "sm", color: "brand" })}>{t.title2}</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium">{t.desc}</p>
        </div>

        {/* Compact pill grid — the previous version wrapped all 39 areas in
            reveal divs with per-item SVG icons (~35 KB of HTML). */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {siteConfig.areaPages.map((area) => (
            <NextLink
              key={area.slug}
              href={href(`/areas/${area.slug}`)}
              title={`Aircond Service ${area.name}`}
              className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-50 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-white transition-colors px-3.5 py-2 rounded-xl"
            >
              {area.name}
            </NextLink>
          ))}
          {FEATURED_KAMPUNGS.map((area) => (
            <NextLink
              key={area.slug}
              href={href(`/areas/${area.parentSlug}/${area.slug}`)}
              title={`Aircond Service ${area.name}`}
              className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-white transition-colors px-2.5 py-1 rounded-full"
            >
              {area.name}
            </NextLink>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="inline-flex items-center gap-2 border border-[#25D366]/20 bg-[#25D366]/5 px-4 py-2.5 rounded-full text-xs font-bold text-[#1ebe5d] uppercase tracking-wider">
            ✓ {t.trust}
          </p>
        </div>
      </div>
    </section>
  );
};
