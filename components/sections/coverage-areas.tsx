import NextLink from "next/link";
import { FaLocationDot, FaCheck } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
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

export const CoverageAreas = ({ locale = "en" }: { locale?: Locale }) => {
  const t = COPY[locale] || COPY.en;
  return (
    <section id="coverage" className="py-20 bg-white relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className={eyebrow()}>{t.eyebrow}</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>{t.title1}</span>
              <span className={title({ size: "sm", color: "brand" })}>{t.title2}</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium">{t.desc}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {siteConfig.areaPages.map((area, idx) => (
            <Reveal key={area.slug} delay={idx * 25}>
              <NextLink href={`/areas/${area.slug}`} title={`Aircond Service ${area.name}`} className="flex items-center gap-2.5 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-sky-500 hover:shadow-md transition-all duration-200 group">
                <FaLocationDot className="h-3.5 w-3.5 text-slate-500 group-hover:text-sky-500 transition-colors shrink-0" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide group-hover:text-sky-600 transition-colors">{area.name}</span>
              </NextLink>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {[
              { name: "Pandan Indah", parentSlug: "ampang", slug: "pandan-indah" },
              { name: "Bukit Jalil", parentSlug: "sri-petaling", slug: "bukit-jalil" },
              { name: "USJ", parentSlug: "subang-jaya", slug: "usj" },
              { name: "Meru", parentSlug: "klang", slug: "meru" },
              { name: "Port Klang", parentSlug: "klang", slug: "port-klang" },
              { name: "Kundang", parentSlug: "rawang", slug: "kundang" },
              { name: "Dengkil", parentSlug: "putrajaya", slug: "dengkil" },
            ].map((area) => (
              <NextLink key={area.slug} href={`/areas/${area.parentSlug}/${area.slug}`} title={`Aircond Service ${area.name}`} className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-white transition-colors px-2.5 py-1 rounded-full">{area.name}</NextLink>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Reveal delay={200}>
            <div className="inline-flex items-center gap-2 border border-[#25D366]/20 bg-[#25D366]/5 px-4 py-2.5 rounded-full text-xs font-bold text-[#1ebe5d] uppercase tracking-wider">
              <FaCheck className="h-3.5 w-3.5" /> {t.trust}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
