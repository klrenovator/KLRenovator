import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import NextLink from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiUsers, FiZap, FiShield } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";
import { PriceComparisonUI } from "@/components/price-comparison";
import { InstagramFeed } from "@/components/sections/instagram-feed";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Service by Brand KL & Selangor — One Team, 20 Brands | KL Renovator"),
  description:
    "One certified team services all 20 major aircond brands — Daikin, Panasonic, Mitsubishi, York, LG, Samsung, Midea & more. Same-day across KL & Selangor. SSM registered, 1-month warranty, 500+ reviews.",
  openGraph: {
    title: clampMetaTitle("One Team, 20 Brands — Aircond Service KL & Selangor | KL Renovator"),
    description:
      "Same certified technicians service every major aircond brand. Transparent pricing, same-day booking, 1-month warranty. Call +60182983573.",
    url: "https://www.klrenovator.com/brands",
    type: "website",
    locale: "en_MY",
    alternateLocale: ["ms_MY", "zh_MY"],
  },
  alternates: buildTrilingualHreflang("/brands"),
};

const waMsg =
  "Hi KL Renovator, I need help with my aircond. Please advise on service and pricing.";

// ─── Brand Category Groups (for "Brand Universe" section) ────────────
const BRAND_CATEGORIES = [
  {
    name: "Japanese Brands",
    flag: "🇯🇵",
    brands: ["Daikin", "Panasonic", "Mitsubishi", "Toshiba", "Hitachi", "Fujitsu", "Sharp"],
    note: "Inverter leaders — R32, PCB diagnostics, precision balancing",
  },
  {
    name: "Korean Brands",
    flag: "🇰🇷",
    brands: ["Samsung", "LG"],
    note: "Smart inverter tech — WiFi modules, AI cooling, low-noise design",
  },
  {
    name: "Chinese Brands",
    flag: "🇨🇳",
    brands: ["Midea", "Haier", "Gree", "Hisense", "Aux", "TCL", "Chigo"],
    note: "Value & mid-range — R410A/R32, fast parts availability in Malaysia",
  },
  {
    name: "Malaysian & International",
    flag: "🇲🇾",
    brands: ["Acson", "York", "Carrier", "McQuay", "National", "Isonic", "Trane", "Fujiaire"],
    note: "Trusted local & global names — ceiling cassette, commercial, residential",
  },
];

// ─── Stats Band data ────────────────────────────────────────────────
const STATS = [
  { icon: FiUsers, value: "20", label: "Brands Serviced", sub: "All major makes & models" },
  { icon: FiZap, value: "30–60", label: "Min Dispatch", sub: "Same-day across Klang Valley" },
  { icon: FiClock, value: "10+", label: "Years Experience", sub: "Residential & light commercial" },
  { icon: FiShield, value: "1-Month", label: "Warranty", sub: "Written workmanship guarantee" },
];

export default function BrandsPage() {
  const brands = siteConfig.brandPages;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Aircond Service by Brand", item: "https://www.klrenovator.com/brands" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO: "One Team, All 20 Brands" ─────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-700 mb-4">
              <FiUsers className="h-3 w-3" /> One Team Services All
            </span>
            <h1 className="mt-4">
              <span className={title({ size: "lg" })}>The Same Certified Technicians{" "}</span>
              <span className={title({ size: "lg", color: "brand" })}>Service Every Brand</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Unlike brand-exclusive agents, KL Renovator&apos;s HVAC team is cross-trained on all 20
              major aircond brands in Malaysia — from Daikin inverter PCBs to York commercial
              cassettes. One team. One standard. Every brand.<br />
              <strong className="text-slate-900">SSM registered · 1-month warranty · 500+ Google reviews.</strong>
            </p>

            {/* Stats Band */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <s.icon className="mx-auto h-4 w-4 text-sky-600 mb-1" />
                  <p className="text-lg font-black text-sky-700">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">{s.label}</p>
                  <p className="text-[9px] text-sky-500">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Chemical Wash", "Gas Top-Up", "Repairs", "Installation", "Chemical Overhaul", "Basic Servicing"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider rounded-full">
                  <FiCheck className="h-2.5 w-2.5 text-sky-500" />{tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp for Booking</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-sky-300 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-slate-700 rounded-xl transition-all">Call {siteConfig.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BRAND UNIVERSE: Grouped by Region ───────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>All 20 Brands</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Select Your </span>
                <span className={title({ size: "sm", color: "brand" })}>Aircond Brand</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto">
                Every brand below is serviced by the same KL Renovator team — same transparent pricing,
                same 1-month warranty, same-day dispatch.
              </p>
            </div>
          </Reveal>

          {/* Brand Category Groups */}
          <div className="space-y-8">
            {BRAND_CATEGORIES.map((cat) => {
              const catBrands = brands.filter((b) => cat.brands.includes(b.name));
              if (catBrands.length === 0) return null;
              return (
                <div key={cat.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{cat.flag}</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">{cat.name}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">— {cat.note}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {catBrands.map((brand) => (
                      <NextLink key={brand.slug} href={`/brands/${brand.slug}`}
                        className="group flex flex-col bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md rounded-2xl p-4 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-black text-sm text-slate-900 group-hover:text-sky-700 transition-colors">{brand.name}</h3>
                          <FiArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-sky-500 transition-colors" />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {brand.gasTypes.slice(0, 2).map((gas) => (
                            <span key={gas} className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">{gas}</span>
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider mt-auto">View {brand.name} Service →</span>
                      </NextLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY ONE TEAM MATTERS ────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Why One Team Matters</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Brand-Agnostic ={" "}</span>
                <span className={title({ size: "sm", color: "brand" })}>Better Service</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-2xl mx-auto">
                Brand-exclusive agents only know one brand. Our technicians diagnose across all 20 —
                they know when a &quot;Daikin problem&quot; is really a universal capacitor issue,
                saving you unnecessary part replacements.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Cross-Brand Diagnosis", desc: "A technician who services all 20 brands can spot that a 'Panasonic noise' has the same root cause as a 'York vibration' — a loose mounting bracket. No brand tunnel vision.", icon: FiZap },
                { title: "One Standard, Every Job", desc: "Same 8-point inspection checklist, same chemical wash pressure (80–120 PSI), same post-service velocity test — regardless of what badge is on your unit.", icon: FiShield },
                { title: "Faster Parts Access", desc: "We stock common parts (capacitors, contactors, drain pumps) that fit 15+ brands. No waiting for 'Daikin-authorised-only' delivery delays.", icon: FiClock },
              ].map((item, i) => (
                <div key={item.title} className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
                  <item.icon className="h-5 w-5 text-sky-600 mb-3" />
                  <h3 className="font-black text-sm text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING: All Brands Same Rate ──────────────────────────── */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">Same Price — Every Brand</p>
              <h2 className="text-2xl font-black uppercase text-white">Transparent Brand-Agnostic Pricing</h2>
              <p className="mt-2 text-slate-400 text-sm font-medium">Same rate for Daikin, Panasonic, Mitsubishi — all 20 brands. Confirmed before work starts.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { service: "Basic Servicing", price: "From RM 99", note: "Wall-mounted 1–1.5 HP" },
                { service: "Chemical Wash", price: "From RM 120", note: "Wall-mounted 1–1.5 HP" },
                { service: "Chemical Overhaul", price: "From RM 220", note: "Wall-mounted 1–1.5 HP" },
                { service: "Gas Top-Up R22", price: "From RM 120", note: "Leak check included" },
                { service: "Gas Top-Up R410A", price: "From RM 150", note: "Leak check included" },
                { service: "Gas Top-Up R32", price: "From RM 180", note: "Leak check included" },
                { service: "Repair Diagnostic", price: "From RM 88", note: "Waived if repaired same visit" },
                { service: "Installation", price: "From RM 199", note: "Wall-mounted 1–1.5 HP" },
              ].map((item) => (
                <div key={item.service} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-slate-400 mb-1">{item.service}</p>
                  <p className="text-lg font-black text-sky-400">{item.price}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className={eyebrow()}>Why Choose KL Renovator</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>The Full </span><span className={title({ size: "sm", color: "brand" })}>Service Promise</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "All 20 Major Brands", desc: "Daikin, Panasonic, Mitsubishi, Acson, York, Carrier, Midea, Haier, Toshiba, Hitachi, Samsung, LG, Sharp, Fujitsu, Gree, National, Hisense, Aux, TCL, Isonic — every major residential and commercial brand in Malaysia." },
                { title: "All Gas Types: R22, R410A, R32", desc: "Whether your unit uses older R22, common R410A, or the latest eco-friendly R32 refrigerant, KL Renovator handles all gas types with precision manifold balancing." },
                { title: "Inverter & Non-Inverter", desc: "Both inverter and non-inverter models serviced. Wall-mounted, ceiling cassette, floor standing, window unit and multi-split systems all covered." },
                { title: "Transparent Quote Before Work", desc: "No matter which brand you have, you receive a confirmed quote before any work starts. No hidden charges, no surprises on the invoice." },
                { title: "Same-Day Service Available", desc: "Most brand service jobs can be booked same-day across KL and Selangor. WhatsApp +60182983573 to confirm availability." },
                { title: "1-Month Workmanship Warranty", desc: "All service and repair work carries a 1-month workmanship warranty regardless of brand. If the same issue recurs, we return at no extra charge." },
              ].map((item, i) => (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="w-8 h-8 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center mb-3"><FiCheck className="h-4 w-4 text-sky-600" /></div>
                  <h3 className="font-black text-sm text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MULTILINGUAL ────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇬🇧 English</p>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                KL Renovator services all major aircond brands in KL & Selangor. Not an authorized dealer — an independent professional HVAC service company experienced with all brands. Same-day available. Call <strong>+60182983573</strong>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇲🇾 Bahasa Malaysia</p>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                KL Renovator menservis semua jenama aircond utama di KL & Selangor. Kami adalah syarikat servis HVAC profesional bebas yang berpengalaman dengan semua jenama. Slot hari yang sama tersedia. Hubungi <strong>+60182983573</strong>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">🇨🇳 中文</p>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                KL Renovator为吉隆坡和雪兰莪所有主要冷气品牌提供服务。我们是经验丰富的独立专业HVAC服务公司。提供当天服务。请联系 <strong>+60182983573</strong>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ──────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Our Services</h3>
              <ul className="space-y-2">
                {siteConfig.services.map((s) => (
                  <li key={s.slug}><NextLink href={`/services/${s.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />{s.title}</NextLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Areas We Cover</h3>
              <div className="flex flex-wrap gap-2">
                {siteConfig.areaPages.slice(0, 12).map((area) => (
                  <NextLink key={area.slug} href={`/areas/${area.slug}`} className="text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:border-sky-200 px-3 py-1.5 rounded-lg transition-all">{area.name}</NextLink>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Common Problems</h3>
              <ul className="space-y-2">
                {siteConfig.problemPages.slice(0, 8).map((p) => (
                  <li key={p.slug}><NextLink href={`/problems/${p.slug}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors"><FiArrowRight className="h-3 w-3 text-sky-400 shrink-0" />{p.name}</NextLink></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE COMPARISON + INSTAGRAM ────────────────────────────── */}
      <PriceComparisonUI locale="en" />
      <InstagramFeed locale="en" compact />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-sky-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">One Team, 20 Brands — Ready Today</h2>
          <p className="mt-3 text-sky-100 font-medium">Same certified technicians. Same transparent pricing. All 20 major brands.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={waLink(waMsg)} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" />WhatsApp Us Now</a>
            <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white px-8 py-4 text-sm font-black uppercase tracking-widest text-white rounded-xl transition-all">Call {siteConfig.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  );
}
