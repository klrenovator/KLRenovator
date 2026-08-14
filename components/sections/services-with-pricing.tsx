"use client";
import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp, FaBuilding, FaArrowRight } from "react-icons/fa6";
import { sitePublic } from "@/config/site-public";
import { waLink } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";
import { translations, useLang, type Lang } from "@/context/language-context";

// ─── Service benefit highlights per tab ─────────────────────────────────────
const residentialHighlights = [
  "Homes, Condos & Apartments",
  "All residential AC brands",
  "Same-day appointments",
  "Transparent fixed pricing",
];
const commercialHighlights = [
  "Offices, Retail & F&B outlets",
  "Ceiling cassette & wall-mounted specialists",
  "Scheduled maintenance contracts",
  "Multi-unit commercial pricing",
];

// ─── Commercial-specific services that don't appear in residential ───────────
const commercialExtraInfo = [
  {
    title: "Multi-Unit Commercial Servicing",
    desc: "We service multiple wall-mounted and ceiling cassette units across factories, warehouses, and larger commercial premises — coordinated scheduling for the whole site.",
  },
  {
    title: "Annual Maintenance Contracts",
    desc: "Fixed-rate AMC packages for offices — scheduled visits, priority response, and detailed service reports.",
  },
  {
    title: "Ceiling Cassette Specialists",
    desc: "From supply-and-install to chemical wash, we handle all ceiling cassette brands across KL & Selangor.",
  },
];

// Lightweight service card. The earlier card had ~1.2 KB of decorative
// markup per service and both tabs rendered near-identical full grids
// (18 cards for 10 unique services, ~93 KB of HTML on the homepage).
// Cards are now one flat grid — every service page stays linked and
// crawlable, at roughly a tenth of the markup.
const ServiceCard = ({ slug, name, short, problem, href }: {
  slug: string;
  name: string;
  short: string;
  problem: string;
  href: string;
}) => (
  <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300">
    <div className="flex-grow">
      <h3 className="text-base font-black text-slate-950 tracking-tight leading-snug">❄️ {name}</h3>
      <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">{short}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-bold text-slate-600 bg-green-50 border border-green-100 rounded-lg p-2.5">
        <span className="mt-0.5 shrink-0 text-[#22c55e]" aria-hidden="true">✓</span>
        <span>{problem}</span>
      </p>
    </div>
    <Link
      href={href}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
    >
      View Details & Pricing
      <FaArrowRight className="h-3 w-3" />
    </Link>
  </div>
);

export const ServicesWithPricing = ({ locale }: { locale?: Lang } = {}) => {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const { lang: ctxLang, t: ctxT } = useLang();
  const lang: Lang = locale ?? ctxLang;
  const t = (key: keyof typeof translations["en"]): string =>
    ((translations[lang] as Record<string, string>)[key]) ?? ctxT(key);

  const localeHref = (slug: string) =>
    lang === "ms" ? `/ms/services/${slug}` : lang === "zh" ? `/zh/services/${slug}` : `/services/${slug}`;

  // One deduplicated grid: every service (except emergency, which has its
  // own banner + landing page) appears exactly once.
  const allServices = sitePublic.services.filter((s) => s.slug !== "emergency");
  const isCommercial = activeTab === "commercial";

  return (
    <section id="services" className="py-20 sm:py-28 bg-slate-50 relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className={eyebrow()}>{t("services_eyebrow")}</p>
          <h2 className="mt-3">
            <span className={title({ size: "sm" })}>{t("services_title1")}</span>
            <span className={title({ size: "sm", color: "brand" })}>{t("services_title2")}</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium">{t("services_desc")}</p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-sm border border-slate-300/30 shadow-inner rounded-xl">
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-lg ${
                activeTab === "residential"
                  ? "bg-white text-slate-950 shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              🏠 {t("services_residential")}
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-lg ${
                activeTab === "commercial"
                  ? "bg-white text-slate-950 shadow-md"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              🏢 {t("services_commercial")}
            </button>
          </div>
        </div>

        {/* Tab Context Banner */}
        <div className="mt-8 mx-auto max-w-3xl rounded-xl p-4 border border-slate-100 bg-white">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {(isCommercial ? commercialHighlights : residentialHighlights).map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className={isCommercial ? "text-blue-500" : "text-sky-500"} aria-hidden="true">✓</span>
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Service cards — one deduplicated grid for both audiences */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {allServices.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              name={service.title}
              short={service.short}
              problem={service.targetProblem}
              href={localeHref(service.slug)}
            />
          ))}
        </div>

        {/* Single WhatsApp booking CTA for the whole section (replaces the
            per-card WhatsApp buttons that doubled this section's markup). */}
        <div className="mt-10 text-center">
          <a
            href={waLink("Hi KL Renovator, I want to book an aircond service. Please advise pricing.")}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-md hover:shadow-green-200 transition-all duration-200"
          >
            <FaWhatsapp className="h-5 w-5" />
            {t("services_book")}
          </a>
        </div>

        {/* Commercial specialisations — only relevant to the commercial tab */}
        {isCommercial && (
          <div className="mt-16">
            <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-8">
              Commercial HVAC Specialisations
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {commercialExtraInfo.map((item) => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="inline-flex p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg mb-4">
                    <FaBuilding className="h-5 w-5" />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href={waLink("Hi KL Renovator, I need a commercial HVAC quote for my business.")}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-200"
              >
                <FaWhatsapp className="h-5 w-5" />
                Get Commercial Quote via WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
