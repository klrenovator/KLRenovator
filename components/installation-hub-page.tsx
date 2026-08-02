import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import { FiArrowRight, FiPhone } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { InstallationProof } from "@/components/installation-proof";
import { ToolLinks } from "@/components/calculators/tool-links";
import {
  INSTALLATION_HUB_GROUPS,
  HUB_COPY,
  type HubLocale,
} from "@/config/installation-hub";

// Server component — the hub is entirely static content plus JSON-LD.

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

function prefix(locale: HubLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export function InstallationHubPage({ locale }: { locale: HubLocale }) {
  const t = HUB_COPY[locale];
  const base = "https://www.klrenovator.com";
  const canonical = `${base}${prefix(locale)}/installation`;

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: `${base}${prefix(locale) || "/"}` },
    { name: t.h1, url: canonical },
  ]);

  const faqSchema = buildFaqSchema(t.faqs);

  // CollectionPage + ItemList tells Google this is the parent node of the
  // installation cluster, and enumerates its children in priority order.
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
      itemListElement: INSTALLATION_HUB_GROUPS.flatMap((g) => g.links).map((link, i) => ({
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
    serviceType: "Air Conditioner Installation",
    category: "Air conditioning installation",
    url: canonical,
    provider: { "@type": "HVACBusiness", "@id": `${base}/#business` },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "State", name: "Selangor" },
    ],
    offers: {
      "@type": "Offer",
      price: 199,
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      description: "Wall-mounted aircond installation from RM 199 (1.0–1.5 HP)",
    },
  };

  const wa = waLink(
    "🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I'd like a confirmed installation price.\n\n📍 Area:\n❄️ Unit type (wall-mounted / cassette / window):\n📏 HP size:\n🏠 Property (condo / landed / office):\n🔢 Number of units:\n\nThank you!",
  );

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
          src="/hero/aircond-installation-kuala-lumpur.webp"
          alt="KL Renovator technician installing a wall-mounted aircond unit in Kuala Lumpur"
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
              {t.whatsapp}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 border border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <FiPhone className="h-4 w-4 text-sky-300" />
              {t.call}
            </a>
          </div>
        </div>
      </section>

      {/* ── Cluster groups ───────────────────────────────────────────── */}
      {INSTALLATION_HUB_GROUPS.map((group, gi) => {
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

      {/* ── Real photos + reviews ────────────────────────────────────── */}
      <InstallationProof locale={locale} />

      {/* ── Areas ────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">{t.areasTitle}</h2>
            <p className="mt-1.5 text-sm text-slate-600">{t.areasSub}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            {siteConfig.areaPages.slice(0, 20).map((area) => (
              <NextLink
                key={area.slug}
                href={`${prefix(locale)}/areas/${area.slug}/installation`}
                className="flex items-center gap-1.5 py-1 text-sm font-medium text-slate-700 transition-colors hover:text-sky-600"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                {area.name}
              </NextLink>
            ))}
          </div>
          <NextLink
            href={`${prefix(locale)}/areas`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800"
          >
            {t.areasCta} <FiArrowRight className="h-3.5 w-3.5" />
          </NextLink>
        </div>
      </section>

      {/* ── Brands ───────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">{t.brandsTitle}</h2>
            <p className="mt-1.5 text-sm text-slate-600">{t.brandsSub}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
            {siteConfig.brandPages.slice(0, 15).map((brand) => (
              <NextLink
                key={brand.slug}
                href={`${prefix(locale)}/brands/${brand.slug}/installation`}
                className="flex items-center gap-1.5 py-1 text-sm font-medium text-slate-700 transition-colors hover:text-sky-600"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                {brand.name}
              </NextLink>
            ))}
          </div>
          <NextLink
            href={`${prefix(locale)}/brands`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800"
          >
            {t.brandsCta} <FiArrowRight className="h-3.5 w-3.5" />
          </NextLink>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-7 text-center text-2xl font-black text-slate-900 sm:text-3xl">
            {t.faqTitle}
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
              {t.whatsapp}
            </a>
            <NextLink
              href="/book"
              className="inline-flex flex-1 items-center justify-center gap-2.5 border border-white/30 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              {locale === "ms" ? "Tempah Slot" : locale === "zh" ? "预约时段" : "Book a Slot"}
            </NextLink>
          </div>
        </div>
      </section>

      {/* Free calculator tools */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks
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
    </>
  );
}
