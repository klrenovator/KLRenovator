import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import Image from "next/image";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { TikTokShowcase } from "@/components/sections/tiktok-showcase";
import { buildServiceSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: buildFreshMetaTitle("Aircond Installation Price Malaysia 2026 — From RM 199 | KL Renovator", "en"),
  description:
    "Complete 2026 aircond installation price guide for Kuala Lumpur & Selangor. RM 199 base install includes 7ft copper pipe, wiring, vacuum pump & leak test. 20 top brands. Same-day installation available.",
  openGraph: {
    title: buildFreshMetaTitle("Aircond Installation Price Malaysia 2026 — From RM 199 | KL Renovator", "en"),
    description: "Complete 2026 aircond installation price guide for KL & Selangor. RM 199 base install includes 7ft copper pipe, wiring, vacuum & leak test.",
    url: "https://www.klrenovator.com/installation-price-malaysia",
    images: getServiceOGImages("installation", "en"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("installation", "en"),
  },
  alternates: buildTrilingualHreflang("/installation-price-malaysia"),
};

const INSTALL_PRICES = [
  { label: "Wall-Mounted · 1.0 HP", price: "RM 199" },
  { label: "Wall-Mounted · 1.5 HP", price: "RM 199" },
  { label: "Wall-Mounted · 2.0 HP", price: "RM 249" },
  { label: "Wall-Mounted · 2.5 HP", price: "RM 279" },
  { label: "Wall-Mounted · 3.0 HP", price: "RM 329" },
  { label: "Wall-Mounted · 4.0 HP", price: "RM 399" },
  { label: "Wall-Mounted · 5.0 HP", price: "RM 449" },
  { label: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 290" },
  { label: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 350" },
  { label: "Ceiling Cassette · 3.5–6.0 HP", price: "RM 400" },
  { label: "Window Unit · 1.0–1.5 HP", price: "RM 199" },
  { label: "Window Unit · 2.0–2.5 HP", price: "RM 249" },
];

const MATERIAL_PRICES = [
  { label: "Copper Pipe 1.0–1.5 HP", price: "RM 17/ft" },
  { label: "Copper Pipe 2.0–2.5 HP", price: "RM 23/ft" },
  { label: "Copper Pipe 3.0–3.5 HP", price: "RM 27/ft" },
  { label: "Electrical Wire", price: "RM 9/ft" },
  { label: "Standard Outdoor Bracket", price: "RM 45" },
  { label: "Indoor Universal Bracket", price: "RM 35" },
  { label: "PVC Trunking for Wire/Pipe", price: "RM 6–12/ft" },
  { label: "Power Socket Installation", price: "RM 100" },
  { label: "Wall Hacking & Concealed", price: "RM 6/ft" },
  { label: "High-Rise/Difficult Access Fee", price: "RM 50–150" },
  { label: "Standard Metal Trunking", price: "RM 15/ft" },
];

const FAQS = [
  { q: "How much is aircond installation in KL & Selangor 2026?", a: "Wall-mounted 1.0–1.5 HP from RM 199. 2.0 HP from RM 249, 2.5 HP from RM 279, 3.0 HP from RM 329. Ceiling cassette from RM 290. Window unit from RM 199. Every price includes 7ft copper pipe, wiring, drainage, bracket, vacuum, leak test & commissioning — confirmed before we start." },
  { q: "What does the RM 199 base installation include?", a: "9-point package: (1) Site survey & wall assessment, (2) 7ft correctly-sized insulated copper pipe, (3) Electrical wiring through dedicated conduit, (4) PVC drainage with correct fall, (5) Bracket with rubber vibration pads, (6) Vacuum pump evacuation min 15 min, (7) Nitrogen pressure leak test, (8) Full commissioning — cooling, airflow, thermostat, (9) Written job card + 1-month workmanship warranty." },
  { q: "Why is extra copper pipe charged after 7ft?", a: "Standard 7ft covers most room layouts. Longer runs need more copper pipe, insulation and labour. We charge per foot transparently (RM 17–27/ft depending on HP). Technician measures actual pipe run needed, confirms extra cost before cutting any pipe." },
  { q: "What's the difference between RM 199 base and full copper pipe package?", a: "RM 199 covers standard straight-run install up to 7ft copper. 'Full copper package' usually means 10–20ft+ copper, concealed trunking, outdoor cable tray, extra brackets — common in high-rise condos where outdoor unit is further from indoor. Exact cost depends on actual pipe length & materials, we quote on-site after survey." },
  { q: "How long does installation take?", a: "Standard wall-mounted: 2–3 hours. Ceiling cassette: 3–4 hours. Two units same day: 5–6 hours. We never rush — proper vacuum evacuation alone takes minimum 15–20 minutes." },
  { q: "Do you supply the aircond unit or just install?", a: "KL Renovator provides professional installation only. You buy the unit from Harvey Norman, Senheng, AEON, Lazada, Shopee, etc. If you need brand & HP advice before buying, WhatsApp us — we advise based on actual Malaysian room conditions." },
  { q: "Can you install in strict high-rise condos?", a: "Yes — we install in KLCC, Mont Kiara, Bangsar, Damansara, Sentul etc. every week. We follow every building's rules: working hours, lift protection, noise limits, waste disposal. If management needs renovation permit, let us know early, we prepare documents." },
  { q: "What warranty comes with installation?", a: "Every install carries 1-month workmanship warranty. If our work causes gas leak, no cooling or drainage issues within that period, we return free. Our vacuum + pressure test catches 99% of issues before we leave." },
];

export default function EnInstallationPricePage() {
  const serviceSchema = buildServiceSchema({
    slug: "installation",
    name: "Aircond Installation",
    description: "Professional aircond installation from RM 199. 20 top brands, vacuum pump, pressure leak test, 1-month warranty.",
    startPrice: 199,
    locale: "en",
    priceTable: INSTALL_PRICES,
    pricingName: "Aircond Installation Price 2026",
    priceDescription: "From RM 199",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Installation Price Guide", item: "https://www.klrenovator.com/installation-price-malaysia" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Installation Price 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/hero/aircond-installation-kuala-lumpur.webp" alt="Malaysia aircond installation price 2026" fill sizes="100vw" className="object-cover" loading="eager" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-block bg-sky-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">2026 Price Guide</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900 speakable">
                Aircond Installation Price Malaysia 2026 — From RM 199
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
                Searching "aircond installation price" or "pasang aircond berapa"? KL Renovator's transparent guide covers every HP spec, every unit type & every material cost — no hidden fees. <strong>RM 199</strong> base install includes 7ft copper pipe, wiring, vacuum pump, leak test & 1-month warranty.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="bg-sky-500 text-white px-3 py-1.5 font-bold uppercase tracking-wider text-sm">From RM 199</span>
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">20 Top Brands · All KL & Selangor</span>
              </div>
              <div className="mt-8"><BookingButton serviceName="Aircond Installation" size="lg" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-slate-900 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 7ft Copper Pipe</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Mandatory Vacuum</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 1-Month Warranty</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 500+ 5-Star Reviews</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> SSM Registered</span>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Installation Price List</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 speakable">Complete 2026 Aircond Installation Price Table</h2>
            <p className="text-sm text-slate-500 mb-6">All prices include 7ft copper pipe, wiring, drainage, bracket, vacuum, leak test & commissioning. Confirmed before work begins.</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {INSTALL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs text-emerald-800 leading-relaxed">
                <span className="font-black">✓ Every installation includes FREE:</span> 7ft copper pipe (correctly sized for HP), wiring, PVC drainage, bracket, vacuum pump evacuation, nitrogen pressure leak test, commissioning, written job card.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9-Point */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">What's Included</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">What's Included in RM 199 Base Installation?</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: buildFreshMetaTitle("Site Survey & Wall Assessment", "en"), desc: "Technician checks wall strength, power capacity, drainage fall & outdoor unit position before drilling." },
              { title: buildFreshMetaTitle("7ft Copper Pipe (Correct Size)", "en"), desc: "Pipe diameter matched to your unit's HP — not universal thin pipe. Correct insulation prevents condensation drip." },
              { title: buildFreshMetaTitle("Wiring & Conduit", "en"), desc: "Dedicated wiring from isolator to indoor unit through proper conduit." },
              { title: buildFreshMetaTitle("PVC Drainage Pipe", "en"), desc: "Set with correct fall so water flows naturally, preventing future leaks." },
              { title: buildFreshMetaTitle("Bracket & Vibration Pads", "en"), desc: "Level-fixed bracket with rubber pads to reduce compressor vibration noise." },
              { title: buildFreshMetaTitle("Vacuum Pump Evacuation", "en"), desc: "Minimum 15–20 minutes. Removes all moisture & air from refrigerant lines — protects compressor." },
              { title: buildFreshMetaTitle("Nitrogen Pressure Leak Test", "en"), desc: "Confirms zero leaks before releasing refrigerant. Step cheap installers skip." },
              { title: buildFreshMetaTitle("Full Commissioning", "en"), desc: "Tests cooling output at all fan speeds, calibrates thermostat, verifies airflow. Logged on job card." },
              { title: buildFreshMetaTitle("1-Month Workmanship Warranty", "en"), desc: "If issues recur due to our work within 1 month, we return to fix free." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center bg-emerald-500 text-white mt-0.5"><FiCheck className="h-3 w-3" /></span>
                  <h3 className="font-black text-slate-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-14 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Extra Materials</p>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Extra Materials & Special Fees</h2>
            <p className="text-sm text-slate-500 mb-6">Only charged when your install exceeds the standard 7ft package. Quoted & confirmed before work starts.</p>
          </Reveal>
          <Reveal>
            <div className="border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {MATERIAL_PRICES.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-sm font-bold text-sky-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-14 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Package Comparison</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">RM 199 Base Install vs Full Copper Piping Package</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-white border-2 border-sky-200 rounded-2xl p-6">
                <span className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">Most Popular</span>
                <h3 className="font-black text-xl text-slate-900">Standard Install</h3>
                <p className="text-3xl font-black text-sky-600 mt-2">RM 199</p>
                <p className="text-xs text-slate-500 mt-1">Wall-mounted 1.0–1.5 HP</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 7ft copper pipe included</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Wiring + drainage + bracket</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Vacuum pump + leak test</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> Commissioning + job card</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">✓</span> 1-month workmanship warranty</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>Best for:</strong> Standard room layout where indoor & outdoor units are within 7ft. Most terrace houses, condos & ground-floor rooms.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">Long Pipe Runs</span>
                <h3 className="font-black text-xl text-slate-900">Full Copper Package</h3>
                <p className="text-3xl font-black text-slate-600 mt-2">RM 350–600+</p>
                <p className="text-xs text-slate-500 mt-1">Depends on pipe length & materials</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> 10–20ft+ copper pipe</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Concealed PVC trunking</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Outdoor cable tray (if needed)</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> Extra brackets</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">→</span> High-rise access fee</li>
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed"><strong>Best for:</strong> High-rise condos where outdoor unit is on balcony further away. Offices & shops with longer ceiling pipe runs. Quoted on-site after survey.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Common Questions · FAQ · Soalan Lazim</p>
            <h2 className="text-2xl font-black text-slate-900 mb-6 speakable">Aircond Installation FAQs</h2>
          </Reveal>
          <div className="border border-slate-200 divide-y divide-slate-200">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TikTok */}
      <TikTokShowcase locale="en" />

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">Book Your Installation Today</p>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">Get Your Exact Install Price — WhatsApp Us Now</h2>
          <p className="text-sky-100 text-sm mb-6 max-w-2xl mx-auto">Send your unit brand, HP & location. We confirm exact price & available slots in minutes. Mon–Sun across all KL & Selangor — same-day installs available.</p>
          <BookingButton serviceName="Aircond Installation" size="lg" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <NextLink href="/services/installation" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">View Full Installation Service <FiArrowRight className="h-3 w-3" /></NextLink>
            <NextLink href="/cuci-aircond-kl" className="inline-flex items-center gap-1 text-xs font-black text-sky-200 hover:text-white transition">Chemical Wash from RM 120 <FiArrowRight className="h-3 w-3" /></NextLink>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section className="py-6 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {["aircond installation price malaysia", "aircond installation price Malaysia", "Kuala Lumpur aircond installation", "aircond installation cost 2026", "pasang aircond berapa", "Selangor aircond installation"].map((kw) => (
              <span key={kw} className="inline-flex items-center bg-white text-slate-600 px-3 py-1.5 text-xs font-bold rounded-full border border-slate-200">{kw}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}