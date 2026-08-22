"use client";

import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { translations, useLang, type Lang } from "@/context/language-context";

// ─────────────────────────────────────────────────────────────────────────
// Homepage lazy islands (document-size optimization).
//
// The homepage used to server-render every below-the-fold section, which
// pushed the HTML document past 600 KB (content + RSC flight payload).
// These islands render a tiny placeholder on the server and hydrate the
// real section only when it approaches the viewport. All heavy sections
// were already Client Components, so they load via next/dynamic ssr:false
// with zero visual regressions.
//
// SEO note: every piece of content that moves into an island has a
// dedicated crawlable route (/services, /areas, /brands, /problems, /blog,
// /review) and the sitemap + llms.txt expose the full URL graph.
// ─────────────────────────────────────────────────────────────────────────

type HomepageData = {
  areas: { slug: string; name: string }[];
  kampungs: { name: string; parentSlug: string; slug: string }[];
  silo: Record<
    "problems" | "brands" | "areas" | "blog" | "installation",
    { slug: string; anchor: string }[]
  >;
};

let dataPromise: Promise<HomepageData | null> | null = null;
function loadHomepageData(): Promise<HomepageData | null> {
  if (!dataPromise) {
    dataPromise = fetch("/homepage-data.json", { cache: "force-cache" })
      .then((r) => (r.ok ? (r.json() as Promise<HomepageData>) : null))
      .catch(() => null);
  }
  return dataPromise;
}

/** Renders `children` once the wrapper scrolls near the viewport. */
function Island({
  children,
  minHeight = 220,
  label,
}: {
  children: ReactNode;
  minHeight?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }} aria-busy={!visible}>
      {visible ? children : <span className="sr-only">{label}</span>}
    </div>
  );
}

const SectionSkeleton = () => (
  <div className="py-16" role="status" aria-live="polite">
    <div className="mx-auto max-w-7xl px-4">
      <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  </div>
);

// ── Services grid island ─────────────────────────────────────────────────
const ServicesIslandImpl = dynamic(
  () =>
    import("@/components/sections/services-with-pricing").then(
      (m) => m.ServicesWithPricing,
    ),
  { ssr: false, loading: SectionSkeleton },
);
export function ServicesIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={560} label="Aircond services with pricing">
      <ServicesIslandImpl locale={locale} />
    </Island>
  );
}

// ── Why-choose-us island ─────────────────────────────────────────────────
const WhyChooseUsIslandImpl = dynamic(
  () => import("@/components/sections/why-choose-us").then((m) => m.WhyChooseUs),
  { ssr: false, loading: SectionSkeleton },
);
export function WhyChooseUsIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={480} label="Why choose KL Renovator">
      <WhyChooseUsIslandImpl locale={locale} />
    </Island>
  );
}

// ── Reviews island ───────────────────────────────────────────────────────
const ReviewsIslandImpl = dynamic(
  () => import("@/components/sections/google-reviews").then((m) => m.GoogleReviews),
  { ssr: false, loading: SectionSkeleton },
);
export function ReviewsIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={420} label="Customer reviews">
      <ReviewsIslandImpl locale={locale} />
    </Island>
  );
}

// ── Trust strip island (review widget + price comparison) ───────────────
const ReviewTrustWidgetImpl = dynamic(
  () =>
    import("@/components/review-trust-widget").then((m) => m.ReviewTrustWidget),
  { ssr: false },
);
const PriceComparisonImpl = dynamic(
  () => import("@/components/price-comparison").then((m) => m.PriceComparisonUI),
  { ssr: false },
);
export function TrustStripIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={360} label="Trust signals and price comparison">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ReviewTrustWidgetImpl locale={locale} />
      </div>
      <PriceComparisonImpl locale={locale} />
    </Island>
  );
}

// ── Coverage areas island (data-driven, lightweight) ────────────────────
const COVERAGE_COPY: Record<Lang, { eyebrow: string; title1: string; title2: string; desc: string; trust: string }> = {
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

function CoverageIslandInner({ locale = "en" }: { locale?: Lang }) {
  const [data, setData] = useState<HomepageData | null>(null);
  useEffect(() => {
    let alive = true;
    void loadHomepageData().then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
  }, []);

  const t = COVERAGE_COPY[locale] || COVERAGE_COPY.en;
  const href = (path: string) =>
    locale === "ms" ? `/ms${path}` : locale === "zh" ? `/zh${path}` : path;

  if (!data) return <SectionSkeleton />;

  return (
    <section id="coverage" className="py-20 bg-white relative isolate">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">{t.eyebrow}</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
            {t.title1}
            <span className="text-sky-500">{t.title2}</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium">{t.desc}</p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {data.areas.map((area) => (
            <NextLink
              key={area.slug}
              href={href(`/areas/${area.slug}`)}
              title={`Aircond Service ${area.name}`}
              className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-50 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-white transition-colors px-3.5 py-2 rounded-xl"
            >
              {area.name}
            </NextLink>
          ))}
          {data.kampungs.map((area) => (
            <NextLink
              key={area.slug}
              href={href(`/areas/${area.parentSlug}/${area.slug}`)}
              title={`Aircond Service ${area.name}`}
              className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-white transition-colors px-2.5 py-1 rounded-full"
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
}
export function CoverageIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={380} label="Coverage areas">
      <CoverageIslandInner locale={locale} />
    </Island>
  );
}

// ── Topical hub island (data-driven) ─────────────────────────────────────
const HUB_META: { key: "problems" | "brands" | "areas" | "blog" | "installation"; color: string; href: (slug: string) => string; all: string }[] = [
  { key: "problems", color: "red", href: (s) => `/problems/${s}`, all: "/problems" },
  { key: "brands", color: "sky", href: (s) => `/brands/${s}`, all: "/brands" },
  { key: "areas", color: "emerald", href: (s) => `/areas/${s}`, all: "/areas" },
  { key: "blog", color: "violet", href: (s) => `/blog/${s}`, all: "/blog" },
  { key: "installation", color: "sky", href: (s) => `/blog/${s}`, all: "/aircond-installation-kl" },
];

// Local labels (these keys are not in the shared language context).
const HUB_TXT: Record<Lang, Record<string, string>> = {
  en: {
    resourceEyebrow: "Complete Resource Hub", resourceTitle: "Everything You Need — All In One Place",
    resourceSub: "Semua Dalam Satu Tempat | 所有资源一站式",
    problemsEyebrow: "Aircond Problems · Masalah", problemsFix: "Fix By Problem Type", allProblems: "All Problems →",
    brandsEyebrow: "Brands We Service · Jenama", brandsBy: "Service By Brand", allBrands: "All Brands →",
    areasEyebrow: "Service Areas · Kawasan", areasFind: "Find Your Area", allAreas: "All Areas →",
    guidesEyebrow: "Expert Guides · Panduan", guidesLearn: "Learn & Decide", allGuides: "All Guides →",
    installEyebrow: "Installation", installPro: "Install Like A Pro", installGuideLink: "Installation Guide →",
  },
  ms: {
    resourceEyebrow: "Hab Sumber Lengkap", resourceTitle: "Semua Yang Anda Perlukan — Di Satu Tempat",
    resourceSub: "Everything You Need — All In One Place | 所有资源一站式",
    problemsEyebrow: "Masalah Aircond", problemsFix: "Baiki Mengikut Jenis Masalah", allProblems: "Semua Masalah →",
    brandsEyebrow: "Jenama Kami Servis", brandsBy: "Servis Mengikut Jenama", allBrands: "Semua Jenama →",
    areasEyebrow: "Kawasan Servis", areasFind: "Cari Kawasan Anda", allAreas: "Semua Kawasan →",
    guidesEyebrow: "Panduan Pakar", guidesLearn: "Belajar & Buat Keputusan", allGuides: "Semua Panduan →",
    installEyebrow: "Pemasangan", installPro: "Pasang Seperti Pakar", installGuideLink: "Panduan Pemasangan →",
  },
  zh: {
    resourceEyebrow: "完整资源中心", resourceTitle: "您所需的一切 — 尽在一处",
    resourceSub: "Everything You Need — All In One Place | Semua Dalam Satu Tempat",
    problemsEyebrow: "冷气问题", problemsFix: "按问题类型维修", allProblems: "所有问题 →",
    brandsEyebrow: "我们服务的品牌", brandsBy: "按品牌服务", allBrands: "所有品牌 →",
    areasEyebrow: "服务区域", areasFind: "查找您的区域", allAreas: "所有区域 →",
    guidesEyebrow: "专家指南", guidesLearn: "学习与决策", allGuides: "所有指南 →",
    installEyebrow: "安装", installPro: "像专家一样安装", installGuideLink: "安装指南 →",
  },
};

function HubIslandInner({ locale = "en" }: { locale?: Lang }) {
  const [data, setData] = useState<HomepageData | null>(null);
  useEffect(() => {
    let alive = true;
    void loadHomepageData().then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
  }, []);

  const { lang: ctxLang } = useLang();
  const lang: Lang = locale ?? ctxLang;
  const t = HUB_TXT[lang] ?? HUB_TXT.en;

  if (!data) return <SectionSkeleton />;

  const labels: Record<string, { eyebrow: string; title: string; all: string }> = {
    problems: { eyebrow: t.problemsEyebrow, title: t.problemsFix, all: t.allProblems },
    brands: { eyebrow: t.brandsEyebrow, title: t.brandsBy, all: t.allBrands },
    areas: { eyebrow: t.areasEyebrow, title: t.areasFind, all: t.allAreas },
    blog: { eyebrow: t.guidesEyebrow, title: t.guidesLearn, all: t.allGuides },
    installation: { eyebrow: t.installEyebrow, title: t.installPro, all: t.installGuideLink },
  };
  const prefix = lang === "ms" ? "/ms" : lang === "zh" ? "/zh" : "";

  return (
    <section className="py-16 px-4 bg-white border-t border-slate-100" id="topical-hub">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">{t.resourceEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{t.resourceTitle}</h2>
          <p className="text-slate-600 text-sm mt-2">{t.resourceSub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HUB_META.map(({ key, href, all }) => (
            <div key={key} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{labels[key].eyebrow}</p>
              <h3 className="font-black text-slate-900 text-sm mb-3">{labels[key].title}</h3>
              <div className="space-y-1.5">
                {(data.silo[key] ?? []).map((item) => (
                  <NextLink
                    key={item.slug}
                    href={prefix + href(item.slug)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400 shrink-0" />
                    {item.anchor}
                  </NextLink>
                ))}
              </div>
              <NextLink href={prefix + all} className="inline-flex items-center gap-1 mt-3 text-xs font-black text-sky-600 hover:text-sky-800">
                {labels[key].all}
              </NextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function HubIsland({ locale }: { locale?: Lang }) {
  return (
    <Island minHeight={340} label="Resource hub links">
      <HubIslandInner locale={locale} />
    </Island>
  );
}
