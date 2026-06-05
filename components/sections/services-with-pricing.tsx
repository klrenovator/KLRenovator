"use client";

import { useState } from "react";
import { FaWhatsapp, FaChevronDown, FaSnowflake } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { title, eyebrow } from "@/components/primitives";
import { useLang } from "@/context/language-context";

// ── Full price breakdown per service ─────────────────────────
const PRICE_DETAILS: Record<string, { label: string; price: string }[]> = {
  "chemical-wash": [
    { label: "Wall-Mounted · 1.0 HP", price: "RM 120" },
    { label: "Wall-Mounted · 1.5 HP", price: "RM 140" },
    { label: "Wall-Mounted · 2.0 HP", price: "RM 180" },
    { label: "Wall-Mounted · 2.5 HP", price: "RM 220" },
    { label: "Wall-Mounted · 3.0 HP", price: "RM 250" },
    { label: "Wall-Mounted · 4.0 HP", price: "RM 260" },
    { label: "Wall-Mounted · 5.0 HP", price: "RM 280" },
    { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 220" },
    { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 280" },
    { label: "Ceiling Cassette · 4.0–5.0 HP", price: "RM 350" },
    { label: "Floor Standing · 3.0–5.0 HP", price: "RM 320" },
    { label: "Window Unit · 1.0–2.0 HP", price: "RM 130" },
    { label: "Window Unit · 2.5–3.0 HP", price: "RM 160" },
  ],
  "chemical-overhaul": [
    { label: "Wall-Mounted · 1.0 HP", price: "RM 200" },
    { label: "Wall-Mounted · 1.5 HP", price: "RM 220" },
    { label: "Wall-Mounted · 2.0 HP", price: "RM 250" },
    { label: "Wall-Mounted · 2.5 HP", price: "RM 280" },
    { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
    { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 380" },
    { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 430" },
    { label: "Ceiling Cassette · 4.0–5.0 HP", price: "RM 480" },
  ],
  "basic-servicing": [
    { label: "Wall-Mounted · 1.0 HP", price: "RM 80" },
    { label: "Wall-Mounted · 1.5 HP", price: "RM 99" },
    { label: "Wall-Mounted · 2.0 HP", price: "RM 130" },
    { label: "Wall-Mounted · 2.5 HP", price: "RM 150" },
    { label: "Wall-Mounted · 3.0 HP", price: "RM 180" },
    { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 150" },
    { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 200" },
    { label: "Ceiling Cassette · 3.5–5.0 HP", price: "RM 250" },
  ],
  "gas-topup": [
    { label: "R22 Gas · 1.0 HP", price: "RM 80" },
    { label: "R22 Gas · 1.5 HP", price: "RM 100" },
    { label: "R22 Gas · 2.0 HP", price: "RM 120" },
    { label: "R22 Gas · 2.5–3.0 HP", price: "RM 140–160" },
    { label: "R410A Gas · 1.0 HP", price: "RM 100" },
    { label: "R410A Gas · 1.5 HP", price: "RM 120" },
    { label: "R410A Gas · 2.0 HP", price: "RM 140" },
    { label: "R410A Gas · 2.5–3.0 HP", price: "RM 160–180" },
    { label: "R32 Gas · 1.0 HP", price: "RM 130" },
    { label: "R32 Gas · 1.5 HP", price: "RM 150" },
    { label: "R32 Gas · 2.0 HP", price: "RM 165" },
    { label: "R32 Gas · 2.5–3.0 HP", price: "RM 180–200" },
  ],
  "repair": [
    { label: "Diagnostic / Troubleshoot Fee", price: "RM 88" },
    { label: "Copper Sensor Replacement", price: "RM 150" },
    { label: "Outdoor Capacitor Replacement", price: "RM 150" },
    { label: "Blower / Fan Motor Replacement", price: "RM 200–500" },
    { label: "PCB / Control Board Replacement", price: "RM 300–800" },
    { label: "Compressor Replacement", price: "RM 800–2,000" },
    { label: "Thermostat Control", price: "RM 120–200" },
    { label: "Internal Water Drain Pump", price: "RM 200–400" },
  ],
  "installation": [
    { label: "Wall-Mounted · 1.0 HP", price: "RM 199" },
    { label: "Wall-Mounted · 1.5 HP", price: "RM 230" },
    { label: "Wall-Mounted · 2.0 HP", price: "RM 250" },
    { label: "Wall-Mounted · 2.5 HP", price: "RM 280" },
    { label: "Wall-Mounted · 3.0 HP", price: "RM 350" },
    { label: "Wall-Mounted · 4.0 HP", price: "RM 450" },
    { label: "Wall-Mounted · 5.0 HP", price: "RM 550" },
    { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 250" },
    { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 350" },
    { label: "Ceiling Cassette · 3.5–6.0 HP", price: "RM 400" },
  ],
  "ceiling-cassette": [
    { label: "Chemical Wash · 1.0–1.5 HP", price: "RM 220" },
    { label: "Chemical Wash · 2.0–3.0 HP", price: "RM 280" },
    { label: "Chemical Wash · 4.0–5.0 HP", price: "RM 350" },
    { label: "Chemical Overhaul · 1.0–1.5 HP", price: "RM 380" },
    { label: "Chemical Overhaul · 2.0–3.0 HP", price: "RM 430" },
    { label: "Basic Service · 1.0–1.5 HP", price: "RM 150" },
    { label: "Basic Service · 2.0–3.0 HP", price: "RM 200" },
    { label: "Installation · 1.0–1.5 HP", price: "RM 250" },
  ],
  "dismantling-relocation": [
    { label: "Wall-Mounted Unit Dismantle", price: "RM 90" },
    { label: "Ceiling Cassette Dismantle", price: "RM 150" },
    { label: "Reinstall at New Location", price: "RM 150–250" },
    { label: "Gas Reclaim & Recharge", price: "RM 80–200" },
  ],
};

// ── Single Service Card with accordion ───────────────────────
function ServiceCard({
  service,
  bookLabel,
  fromLabel,
}: {
  service: typeof siteConfig.services[0];
  bookLabel: string;
  fromLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const prices = PRICE_DETAILS[service.slug] ?? [];

  return (
    <div className="flex flex-col bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 overflow-hidden group">

      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 flex flex-col flex-grow">
        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 shrink-0">
            <FaSnowflake className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-950 uppercase tracking-tight leading-snug">
              {service.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
              {service.short}
            </p>
          </div>
        </div>

        {/* Starting price */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-baseline gap-1.5">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{fromLabel}</span>
          <span className="text-2xl font-black text-slate-950">RM {service.startPrice}</span>
        </div>

        {/* Target problem */}
        <div className="mt-3 flex items-start gap-2 text-xs font-semibold text-slate-600">
          <FiCheck className="mt-0.5 h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>{service.targetProblem}</span>
        </div>

        {/* Accordion toggle */}
        {prices.length > 0 && (
          <div className="mt-5 flex-grow">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between gap-2 border border-slate-200 hover:border-sky-400 hover:bg-sky-50 px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-700 transition-all"
              aria-expanded={open}
            >
              <span>{open ? "Hide Pricing" : "View Full Pricing"}</span>
              <FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="border border-t-0 border-slate-200 overflow-hidden">
                <ul className="divide-y divide-slate-100">
                  {prices.map((row) => (
                    <li key={row.label}
                      className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-sky-50/50 transition-colors">
                      <span className="text-xs text-slate-600 font-medium">{row.label}</span>
                      <span className="text-xs font-black text-sky-700 whitespace-nowrap">{row.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-2">
                  <p className="text-[10px] text-slate-500 font-medium">
                    * Labour only. Materials quoted separately &amp; approved before work starts.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Book CTA */}
        <div className="mt-5">
          <a
            href={waLink(rfqMsgForService(service.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-slate-950 hover:bg-[#22c55e] text-white font-black uppercase tracking-widest text-xs py-3.5 transition-all duration-200 active:scale-[0.98]"
          >
            <FaWhatsapp className="h-4 w-4" />
            {bookLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export const ServicesWithPricing = () => {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const { t } = useLang();

  const filtered = siteConfig.services.filter(
    (s) => s.category === activeTab || s.category === "both"
  );

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className={eyebrow()}>{t("services_eyebrow")}</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>{t("services_title1")}</span>
              <span className={title({ size: "sm", color: "brand" })}>{t("services_title2")}</span>
            </h2>
            <p className="mt-4 text-slate-600 font-medium max-w-xl mx-auto">
              {t("services_desc")}
            </p>
          </Reveal>
        </div>

        {/* Tab Switcher */}
        <div className="mt-10 flex justify-center">
          <Reveal delay={80}>
            <div className="inline-flex bg-white border border-slate-200 shadow-sm overflow-hidden">
              {(["residential", "commercial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-7 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {tab === "residential" ? t("services_residential") : t("services_commercial")}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((service, i) => (
            <Reveal key={service.slug} delay={i * 40}>
              <ServiceCard
                service={service}
                bookLabel={t("services_book")}
                fromLabel={t("services_from")}
              />
            </Reveal>
          ))}
        </div>

        {/* Volume Discount Banner */}
        <Reveal>
          <div className="mt-12 bg-sky-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-1">
                Multi-Unit Discount
              </p>
              <h3 className="text-xl font-black uppercase text-white">
                Booking multiple units?
              </h3>
              <div className="mt-3 flex flex-wrap gap-4">
                {siteConfig.volumeDiscounts.map((d) => (
                  <span key={d.units} className="text-sm font-bold text-sky-100">
                    <span className="text-sky-400 font-black">{d.units}</span> — {d.off}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={waLink("Hi KL Renovator, I have multiple units and would like to get a volume discount quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-6 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all"
            >
              <FaWhatsapp className="h-4 w-4" /> Get Bulk Quote
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
