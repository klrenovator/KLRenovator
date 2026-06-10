"use client";

import NextLink from "next/link";
import { FiMapPin, FiArrowRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { useLang } from "@/context/language-context";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  en: {
    badge: "Service Coverage",
    h1a: "Aircond Service Areas —",
    h1b: "KL & Selangor",
    desc: "KL Renovator dispatches trained HVAC technicians across all of Kuala Lumpur and Selangor. Same-day service available. Click your area to see pricing, services and availability.",
    kl: "Kuala Lumpur",
    selangor: "Selangor",
    putrajaya: "Putrajaya / Cyberjaya",
    view: "View Services →",
    waBtn: "WhatsApp to Book",
    callBtn: "Call Us",
    ctaTitle: "Don't See Your Area?",
    ctaDesc: "We cover all of Klang Valley. WhatsApp us your location and we'll confirm availability within 30 minutes.",
    stat1: "38 Service Areas",
    stat2: "Same-Day Available",
    stat3: "4.9★ Google Rating",
    stat4: "Mon–Sun 9AM–6PM",
    seoP1: "KL Renovator provides professional aircond servicing, chemical wash, chemical overhaul, gas top-up, repairs and new installations across all areas of Kuala Lumpur and Selangor. Our technicians are dispatched daily to residential and commercial properties throughout the Klang Valley.",
    seoP2: "Whether you need a basic service for a single wall-mounted unit or a full chemical overhaul for a commercial ceiling cassette system, our teams are ready. All services come with transparent pricing confirmed before work begins, and a 1-month workmanship warranty.",
  },
  ms: {
    badge: "Kawasan Liputan",
    h1a: "Kawasan Servis Aircond —",
    h1b: "KL & Selangor",
    desc: "KL Renovator menghantar juruteknik HVAC terlatih ke seluruh Kuala Lumpur dan Selangor. Servis hari sama tersedia. Klik kawasan anda untuk melihat harga, perkhidmatan dan ketersediaan.",
    kl: "Kuala Lumpur",
    selangor: "Selangor",
    putrajaya: "Putrajaya / Cyberjaya",
    view: "Lihat Perkhidmatan →",
    waBtn: "WhatsApp untuk Tempah",
    callBtn: "Hubungi Kami",
    ctaTitle: "Tak Jumpa Kawasan Anda?",
    ctaDesc: "Kami meliputi seluruh Lembah Klang. WhatsApp lokasi anda dan kami akan sahkan ketersediaan dalam 30 minit.",
    stat1: "38 Kawasan Servis",
    stat2: "Servis Hari Sama",
    stat3: "4.9★ Rating Google",
    stat4: "Isnin–Ahad 9PG–6PTG",
    seoP1: "KL Renovator menyediakan servis aircond profesional, cuci kimia, overhaul kimia, tambah gas, pembaikan dan pemasangan baru merentasi semua kawasan Kuala Lumpur dan Selangor. Juruteknik kami dihantar setiap hari ke hartanah kediaman dan komersial di seluruh Lembah Klang.",
    seoP2: "Sama ada anda memerlukan servis asas untuk unit tunggal atau overhaul kimia penuh untuk sistem ceiling cassette komersial, pasukan kami sedia membantu. Semua perkhidmatan disertakan harga telus yang disahkan sebelum kerja bermula, dan waranti kerja 1 bulan.",
  },
  zh: {
    badge: "服务范围",
    h1a: "冷气服务地区 —",
    h1b: "吉隆坡及雪兰莪",
    desc: "KL Renovator 在整个吉隆坡和雪兰莪派遣经过专业培训的HVAC技术人员。提供当天服务。点击您所在地区查看价格、服务和可用时间。",
    kl: "吉隆坡",
    selangor: "雪兰莪",
    putrajaya: "布城 / 赛博再也",
    view: "查看服务 →",
    waBtn: "WhatsApp 预约",
    callBtn: "立即致电",
    ctaTitle: "没有找到您的地区？",
    ctaDesc: "我们覆盖巴生谷全区。通过WhatsApp告诉我们您的位置，我们将在30分钟内确认可用性。",
    stat1: "38个服务地区",
    stat2: "当天服务",
    stat3: "Google评分 4.9★",
    stat4: "周一至周日 上午9时–下午6时",
    seoP1: "KL Renovator 在吉隆坡和雪兰莪所有地区提供专业冷气服务、化学清洗、化学大修、充冷媒、维修和新安装。我们的技术人员每天被派遣到巴生谷各地的住宅和商业物业。",
    seoP2: "无论您是需要单台挂壁式冷气的基本服务，还是商用天花板卡式机的完整化学大修，我们的团队随时待命。所有服务在开始工作前确认透明价格，并附一个月工艺保修。",
  },
};

// Classify areas by state
const KL_SLUGS = [
  "cheras","ampang","setapak","wangsa-maju","kepong","sentul","bangsar",
  "mont-kiara","sri-petaling","desa-parkcity","taman-melawati","hulu-kelang",
];
const PUTRAJAYA_SLUGS = ["putrajaya","cyberjaya"];

export default function AreasPage() {
  const { lang } = useLang();
  const t = T[lang];

  const klAreas       = siteConfig.areaPages.filter((a) => KL_SLUGS.includes(a.slug));
  const putrajayaAreas = siteConfig.areaPages.filter((a) => PUTRAJAYA_SLUGS.includes(a.slug));
  const selangorAreas = siteConfig.areaPages.filter(
    (a) => !KL_SLUGS.includes(a.slug) && !PUTRAJAYA_SLUGS.includes(a.slug),
  );

  const waMsg =
    lang === "ms" ? "Hai KL Renovator, saya perlukan servis aircond. Boleh sahkan kawasan saya?"
    : lang === "zh" ? "你好 KL Renovator，我需要冷气服务。请确认我的地区是否在服务范围内。"
    : "Hi KL Renovator, I need aircond service. Can you confirm my area is covered?";

  const areaCardClasses =
    "group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm hover:border-sky-400 hover:bg-sky-50 hover:shadow-md transition-all duration-200";

  const renderAreaGroup = (areas: typeof siteConfig.areaPages, heading: string) => (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="flex items-center gap-1.5">
          <FiMapPin className="h-3.5 w-3.5 text-sky-500" />
          {heading}
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {areas.map((area, i) => (
          <Reveal key={area.slug} delay={i * 30}>
            <NextLink href={`/areas/${area.slug}`} className={areaCardClasses}>
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 border border-sky-100">
                  <FiMapPin className="h-3.5 w-3.5 text-sky-500" />
                </span>
                <span className="truncate text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                  {area.name}
                </span>
              </div>
              <FiArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
            </NextLink>
          </Reveal>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition">
              {lang === "zh" ? "首页" : lang === "ms" ? "Utama" : "Home"}
            </NextLink>
            <FiArrowRight className="h-3 w-3" />
            <span className="font-semibold text-slate-800">
              {lang === "zh" ? "服务地区" : lang === "ms" ? "Kawasan Servis" : "Service Areas"}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-sky-700">
                <FiMapPin className="h-3 w-3" /> {t.badge}
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {t.h1a}{" "}
                <span className="text-sky-500">{t.h1b}</span>
              </h1>
              <p className="mt-4 text-base text-slate-500 leading-relaxed sm:text-lg">
                {t.desc}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={waLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-md transition-all"
                >
                  <FaWhatsapp className="h-4 w-4" /> {t.waBtn}
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                >
                  <FiPhone className="h-4 w-4" /> {t.callBtn}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={80}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[t.stat1, t.stat2, t.stat3, t.stat4].map((s) => (
                <div
                  key={s}
                  className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-center"
                >
                  <span className="text-xs font-black uppercase tracking-widest text-sky-600">{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Area Grid ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {renderAreaGroup(klAreas, t.kl)}
          {renderAreaGroup(selangorAreas, t.selangor)}
          {renderAreaGroup(putrajayaAreas, t.putrajaya)}
        </div>
      </section>

      {/* ── SEO Text Block ────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-4 text-sm text-slate-600 leading-relaxed">
          <Reveal><p>{t.seoP1}</p></Reveal>
          <Reveal><p>{t.seoP2}</p></Reveal>
          <Reveal>
            <p>
              {lang === "en" && (
                <>Explore our <NextLink href="/services" className="text-sky-600 font-semibold hover:underline">full services list</NextLink>, learn about <NextLink href="/brands/daikin" className="text-sky-600 font-semibold hover:underline">Daikin servicing</NextLink>, <NextLink href="/brands/panasonic" className="text-sky-600 font-semibold hover:underline">Panasonic servicing</NextLink>, or read our <NextLink href="/blog" className="text-sky-600 font-semibold hover:underline">blog</NextLink> for HVAC tips.</>
              )}
              {lang === "ms" && (
                <>Terokai <NextLink href="/services" className="text-sky-600 font-semibold hover:underline">senarai perkhidmatan penuh</NextLink> kami, ketahui tentang <NextLink href="/brands/daikin" className="text-sky-600 font-semibold hover:underline">servis Daikin</NextLink>, <NextLink href="/brands/panasonic" className="text-sky-600 font-semibold hover:underline">servis Panasonic</NextLink>, atau baca <NextLink href="/blog" className="text-sky-600 font-semibold hover:underline">blog</NextLink> kami untuk tips HVAC.</>
              )}
              {lang === "zh" && (
                <>探索我们的<NextLink href="/services" className="text-sky-600 font-semibold hover:underline">完整服务列表</NextLink>，了解<NextLink href="/brands/daikin" className="text-sky-600 font-semibold hover:underline">Daikin 服务</NextLink>、<NextLink href="/brands/panasonic" className="text-sky-600 font-semibold hover:underline">Panasonic 服务</NextLink>，或阅读我们的<NextLink href="/blog" className="text-sky-600 font-semibold hover:underline">博客</NextLink>获取HVAC技巧。</>
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA — Area Not Found ──────────────────────────────────────────── */}
      <section className="bg-sky-600 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{t.ctaTitle}</h2>
            <p className="mt-3 text-sky-100 text-base leading-relaxed">{t.ctaDesc}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black uppercase tracking-wider text-sky-700 shadow-md hover:bg-sky-50 transition-all"
              >
                <FaWhatsapp className="h-4 w-4" /> {t.waBtn}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-7 py-3.5 text-sm font-black uppercase tracking-wider text-white hover:bg-white hover:text-sky-700 transition-all"
              >
                <FiPhone className="h-4 w-4" /> {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services Cross-link ───────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
              {lang === "zh" ? "我们的服务" : lang === "ms" ? "Perkhidmatan Kami" : "Our Services"}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.services.map((s) => (
                <NextLink
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 transition"
                >
                  {s.title} <FiArrowRight className="h-3 w-3" />
                </NextLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
