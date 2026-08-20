// ─────────────────────────────────────────────────────────────────────────
// Topic-cluster hub page renderer — shared by /pricing, /troubleshooting
// and /maintenance (EN/MS/ZH). Modelled on InstallationHubPage.
//
// Server component: all schema and content render in the initial HTML.
// The hub is a real editorial destination, not a link dump — hero copy,
// curated group cards, a comparison table, an authored editorial section
// with a direct-answer block, the full cluster-member index, FAQs with
// schema, cross-hub links, photo proof, and a closing CTA.
// ─────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import { FiArrowRight, FiPhone } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { ServiceWorkPhotos } from "@/components/service-work-photos";
import { ToolLinks } from "@/components/calculators/tool-links";
import { PageExplainers } from "@/components/aeo-explainer-blocks";
import {
  TOPIC_HUBS,
  TOPIC_HUB_IDS,
  HUB_SHORT_LABEL,
  HUB_SHORT_BLURB,
  hubPath,
  resolveHubMembers,
  type HubLocale,
  type TopicHubId,
} from "@/config/topic-hubs";

const ACCENT: Record<
  string,
  { border: string; bg: string; text: string; dot: string }
> = {
  sky: { border: "border-sky-200", bg: "bg-sky-50/60", text: "text-sky-700", dot: "bg-sky-500" },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
};

const HUB_HERO_IMAGE: Record<TopicHubId, string> = {
  pricing: "/hero/acson-aircond-basic-servicing-kuala-lumpur-5.webp",
  troubleshooting: "/hero/daikin-aircond-pcb-board-repair-petaling-jaya-23.webp",
  maintenance: "/hero/acson-aircond-chemical-wash-shah-alam-49.webp",
};

const CROSS_HUB_COPY = {
  en: {
    eyebrow: "Topic Hubs",
    title: "Explore the Other Guides",
    sub: "Three organised libraries — pick the one that matches what you're looking for.",
  },
  ms: {
    eyebrow: "Hab Topik",
    title: "Terokai Panduan Lain",
    sub: "Tiga perpustakaan tersusun — pilih yang sepadan dengan apa yang anda cari.",
  },
  zh: {
    eyebrow: "主题总览",
    title: "浏览其他指南",
    sub: "三个整理好的指南库 — 选择符合您需求的一个。",
  },
} as const;

export function TopicHubPage({
  hubId,
  locale,
}: {
  hubId: TopicHubId;
  locale: HubLocale;
}) {
  const hub = TOPIC_HUBS[hubId];
  const t = hub.copy[locale];
  const base = "https://www.klrenovator.com";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const canonical = `${base}${hubPath(hubId, locale)}`;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: `${base}${prefix || "/"}` },
    { name: t.h1, url: canonical },
  ]);

  const faqSchema = buildFaqSchema(t.faqs);

  const members = resolveHubMembers(hub, locale);

  // CollectionPage + ItemList enumerates every cluster member so search
  // engines and AI crawlers can follow the whole topic cluster from its hub.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    url: canonical,
    name: t.h1,
    description: t.metaDescription,
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#business` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: members.map((link, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: link.label[locale],
        url: `${base}${link.href[locale]}`,
      })),
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: t.h1,
    serviceType:
      hubId === "pricing"
        ? "Air Conditioner Service Pricing"
        : hubId === "troubleshooting"
          ? "Air Conditioner Troubleshooting & Repair"
          : "Air Conditioner Maintenance & Servicing",
    category:
      hubId === "pricing"
        ? "Air conditioning pricing guides"
        : hubId === "troubleshooting"
          ? "Air conditioning repair"
          : "Air conditioning maintenance",
    url: canonical,
    provider: { "@type": "HVACBusiness", "@id": `${base}/#business` },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
  };

  const wa = waLink(
    `Hi KL Renovator, I found your ${HUB_SHORT_LABEL[hubId].en.toLowerCase()} guides and I'd like a confirmed quote.\n\n📍 Area:\n❄️ Unit type:\n📏 HP size:\n🔧 What I need:\n\nThank you!`,
  );

  const cross = CROSS_HUB_COPY[locale];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 px-4 py-16 sm:py-20">
        <Image
          src={HUB_HERO_IMAGE[hubId]}
          alt={t.photos.heroAlt}
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-center opacity-25"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-widest text-sky-400">
            {t.eyebrow}
          </p>
          <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {t.intro}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {t.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-black uppercase tracking-wider text-white/90 backdrop-blur-sm"
              >
                <FaCheck className="h-3 w-3 text-emerald-400" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 bg-[#22c55e] px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#16a34a] active:scale-[0.97]"
            >
              <FaWhatsapp className="h-5 w-5" />
              {locale === "ms"
                ? "WhatsApp untuk Sebut Harga"
                : locale === "zh"
                  ? "WhatsApp 索取报价"
                  : "WhatsApp for a Quote"}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 border border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <FiPhone className="h-4 w-4 text-sky-300" />
              {locale === "ms"
                ? "Hubungi +60 18-298 3573"
                : locale === "zh"
                  ? "致电 +60 18-298 3573"
                  : "Call +60 18-298 3573"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Curated group cards ──────────────────────────────────────── */}
      {hub.groups.map((group, gi) => {
        const a = ACCENT[group.accent];
        return (
          <section
            key={group.id}
            id={group.id}
            className={`border-t border-slate-100 px-4 py-14 ${gi % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-8">
                <p className={`mb-1.5 text-xs font-black uppercase tracking-widest ${a.text}`}>
                  {group.eyebrow[locale]}
                </p>
                <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                  {group.title[locale]}
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.links.map((link) => (
                  <NextLink
                    key={link.href[locale]}
                    href={link.href[locale]}
                    className={`group flex flex-col rounded-2xl border ${a.border} ${a.bg} p-6 transition-all hover:shadow-md`}
                  >
                    <h3 className="text-base font-black text-slate-900">{link.label[locale]}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {link.blurb[locale]}
                    </p>
                    <span className="mt-4 flex items-center justify-between">
                      {link.price ? (
                        <span className={`text-sm font-black ${a.text}`}>{link.price}</span>
                      ) : (
                        <span />
                      )}
                      <FiArrowRight
                        className={`h-4 w-4 ${a.text} transition-transform group-hover:translate-x-1`}
                      />
                    </span>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Comparison / price table ─────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {t.tableTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {t.tableIntro}
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-white">
                  {hub.table.headers[locale].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-5 py-3.5 text-xs font-black uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hub.table.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`border-b border-slate-100 last:border-0 ${ri % 2 === 1 ? "bg-slate-50/60" : "bg-white"}`}
                  >
                    {row.cells[locale].map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-3.5 align-top ${
                          ci === 0
                            ? "font-black text-slate-900"
                            : ci === row.cells[locale].length - 1
                              ? "whitespace-nowrap font-black text-sky-700"
                              : "font-medium text-slate-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Editorial (authored, with a direct-answer block) ─────────── */}
      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            {t.editorialTitle}
          </h2>
          {t.editorialBody.map((p, i) => (
            <p key={i} className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {p}
            </p>
          ))}
          <h2 className="mt-10 text-xl font-black leading-tight text-slate-900 sm:text-2xl">
            {t.directQuestion}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t.directAnswer}
          </p>
        </div>
      </section>

      {/* ── Full cluster-member index (hub → every member) ───────────── */}
      <section className="border-t border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {t.fullIndexTitle}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              {locale === "ms"
                ? "Semua panduan, alat dan halaman perkhidmatan dalam kluster ini."
                : locale === "zh"
                  ? "此主题下的全部指南、工具与服务页面。"
                  : "Every guide, tool and service page in this cluster."}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((link) => (
              <NextLink
                key={link.href[locale]}
                href={link.href[locale]}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-sky-400 hover:shadow-md"
              >
                <h3 className="text-sm font-black leading-snug text-slate-900 group-hover:text-sky-700 transition-colors">
                  {link.label[locale]}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {link.blurb[locale]}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-sky-600">
                  {locale === "ms"
                    ? "Baca Panduan"
                    : locale === "zh"
                      ? "阅读指南"
                      : "Read Guide"}
                  <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real photos ──────────────────────────────────────────────── */}
      <ServiceWorkPhotos
        slug={`topic-hub-${hubId}`}
        lang={locale}
        eyebrow={t.photos.eyebrow}
        heading={t.photos.heading}
        intro={t.photos.intro}
        heroImage={HUB_HERO_IMAGE[hubId]}
        heroTitle={t.photos.heroTitle}
        heroAlt={t.photos.heroAlt}
        className="border-t border-slate-100 bg-white px-4 py-14"
      />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-7 text-center text-2xl font-black text-slate-900 sm:text-3xl">
            {locale === "ms" ? "Soalan Lazim" : locale === "zh" ? "常见问题" : "Frequently Asked Questions"}
          </h2>
          <div className="divide-y divide-slate-100">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="mb-2 text-base font-black text-slate-900">{faq.q}</h3>
                <p className="leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-hub links ──────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="mb-1.5 text-xs font-black uppercase tracking-widest text-sky-600">
              {cross.eyebrow}
            </p>
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {cross.title}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">{cross.sub}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {TOPIC_HUB_IDS.map((otherId) => {
              const other = TOPIC_HUBS[otherId];
              const a = ACCENT[other.groups[0]?.accent ?? "sky"];
              const isSelf = otherId === hubId;
              return (
                <NextLink
                  key={otherId}
                  href={hubPath(otherId, locale)}
                  aria-current={isSelf ? "page" : undefined}
                  className={`flex flex-col rounded-2xl border ${a.border} ${a.bg} p-6 transition-all hover:shadow-md ${
                    isSelf ? "ring-2 ring-sky-300" : ""
                  }`}
                >
                  <h3 className="text-base font-black text-slate-900">
                    {other.copy[locale].h1}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {HUB_SHORT_BLURB[otherId][locale]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-sky-600">
                    {isSelf
                      ? locale === "ms"
                        ? "Anda Di Sini"
                        : locale === "zh"
                          ? "当前页面"
                          : "You Are Here"
                      : locale === "ms"
                        ? "Terokai"
                        : locale === "zh"
                          ? "前往"
                          : "Explore"}
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </span>
                </NextLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 px-4 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <div>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
              {t.ctaBody}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2.5 bg-[#22c55e] px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#16a34a] active:scale-[0.97]"
            >
              <FaWhatsapp className="h-5 w-5" />
              {locale === "ms"
                ? "WhatsApp untuk Sebut Harga"
                : locale === "zh"
                  ? "WhatsApp 索取报价"
                  : "WhatsApp for a Quote"}
            </a>
            <NextLink
              href={prefix + "/book"}
              className="inline-flex flex-1 items-center justify-center gap-2.5 border border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              {locale === "ms" ? "Tempah Slot" : locale === "zh" ? "预约时段" : "Book a Slot"}
            </NextLink>
          </div>
        </div>
      </section>

      {/* Definition + comparison blocks (issue #72) — one preset per hub. */}
      <PageExplainers
        locale={locale}
        presetId={hubId === "pricing" ? "pricing:hub" : hubId === "troubleshooting" ? "troubleshooting:hub" : "maintenance:hub"}
      />

      {/* Free calculator tools — most relevant on the pricing hub. */}
      {hubId === "pricing" && (
        <section className="border-t border-slate-100 bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ToolLinks
              lang={locale}
              heading={
                locale === "ms"
                  ? "Kalkulator Aircond Percuma"
                  : locale === "zh"
                    ? "免费冷气计算工具"
                    : "Free Aircond Calculators"
              }
            />
          </div>
        </section>
      )}
    </>
  );
}
