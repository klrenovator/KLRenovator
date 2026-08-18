import { Metadata } from "next";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { FaWhatsapp, FaCheck, FaShield, FaBuilding, FaStore, FaUtensils, FaHospital, FaServer, FaPhone, FaBolt, FaCalendarCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "Commercial Aircond Installation KL — Office & Shoplot",
  description: padMetaDescription("Commercial aircond installation for offices, shoplots, restaurants, clinics & server rooms across KL & Selangor. Ceiling cassette & multi-split. AMC."),
  openGraph: {
    title: "Commercial Aircond Installation KL — Office & Shoplot",
    description: "Commercial aircond installation for offices, shoplots, restaurants, clinics & server rooms. Ceiling cassette, ducted, multi-split. AMC available. WhatsApp +60182983573",
    type: "website", locale: "en_MY",
    url: "https://www.klrenovator.com/commercial-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 1200, height: 630, alt: "Commercial Aircond Installation KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Commercial Aircond Installation KL & Selangor — B2B | KL Renovator", description: "Office, shoplot, restaurant, clinic & server room aircond installation. Ceiling cassette, ducted, multi-split systems. AMC available. WhatsApp +60182983573", images: ["https://www.klrenovator.com/logo/image.png"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/commercial-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/commercial-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-komersial", "zh-MY": "https://www.klrenovator.com/zh/commercial-aircond-installation", "x-default": "https://www.klrenovator.com/commercial-aircond-installation" } },
};

const BUSINESS_TYPES = [
  { icon: <FaBuilding className="h-6 w-6" />, title: "Office Buildings", desc: "Ceiling cassette or ducted systems for open-plan offices. After-hours installation to avoid disrupting operations. Multi-zone cooling with individual thermostat control per floor or department. AMC plans start from RM 299/year per unit.", features: ["Ceiling cassette 2.0–6.0 HP", "Multi-split configurations", "After-hours/weekend installation", "Zone-based cooling design", "AMC with quarterly servicing"] },
  { icon: <FaStore className="h-6 w-6" />, title: "Shoplots & Retail", desc: "Wall-mounted or ceiling cassette units for shopfronts, boutiques, and retail spaces. High-cooling-capacity units for glass-front shops with high foot traffic. Discreet installation that doesn't interfere with displays or customer flow.", features: ["Wall-mounted 1.5–3.0 HP", "Ceiling cassette for larger spaces", "Condensate pump for concealed drainage", "Quick installation — minimal downtime", "Energy-efficient inverter options"] },
  { icon: <FaUtensils className="h-6 w-6" />, title: "Restaurants & F&B", desc: "Heavy-duty kitchen-rated and dining-area aircond systems. Grease-resistant coil coatings available. High-airflow units for open-kitchen heat load. Compliance with local health department ventilation requirements.", features: ["Kitchen-rated units with coated coils", "High-static pressure for long duct runs", "Grease filter compatibility", "Dining area: ceiling cassette or ducted", "6-month chemical wash cycle recommended"] },
  { icon: <FaHospital className="h-6 w-6" />, title: "Clinics & Medical", desc: "Temperature-stable cooling for consultation rooms, waiting areas, and pharmacies. HEPA/UV filtration options available. Low-noise units for patient comfort. Compliance with KKM facility guidelines.", features: ["Wall-mounted or ceiling cassette", "HEPA/UV filter add-on available", "Ultra-quiet inverter models", "Reliable 24/7 operation capable", "Emergency repair priority SLA"] },
  { icon: <FaServer className="h-6 w-6" />, title: "Server Rooms", desc: "Precision cooling for small-to-medium server rooms and IT closets. 24/7-rated inverter compressors. Redundancy options (N+1 configuration). Temperature and humidity monitoring integration.", features: ["High-sensible cooling ratio units", "24/7 continuous operation rated", "Inverter for precise temperature control", "Condensate pump with overflow alarm", "Redundant unit configuration available"] },
];

const PRICING = [
  { type: "Wall-Mounted · 1.5 HP", price: "RM 199", suitable: "Small office, consultation room, retail counter" },
  { type: "Wall-Mounted · 2.0–2.5 HP", price: "RM 249–279", suitable: "Medium office, shoplot, waiting area" },
  { type: "Wall-Mounted · 3.0 HP", price: "RM 329", suitable: "Large office, restaurant dining area" },
  { type: "Ceiling Cassette · 1.0–1.5 HP", price: "RM 290", suitable: "Small meeting room, private office" },
  { type: "Ceiling Cassette · 2.0–3.0 HP", price: "RM 350", suitable: "Open-plan office, shoplot, clinic waiting" },
  { type: "Ceiling Cassette · 3.5–6.0 HP", price: "RM 400", suitable: "Large commercial space, restaurant" },
];

const AMC_BENEFITS = [
  { icon: <FaCalendarCheck className="h-5 w-5" />, title: "Quarterly Preventive Maintenance", desc: "Scheduled servicing every 3 months — filter cleaning, coil check, gas pressure, electrical inspection. Keeps units at peak efficiency, reduces breakdowns by 60%+." },
  { icon: <FaBolt className="h-5 w-5" />, title: "Priority Emergency Response", desc: "AMC clients get priority dispatch within 2 hours during business hours. Dedicated commercial support line. Same-day technician for critical breakdowns." },
  { icon: <FaShield className="h-5 w-5" />, title: "Discounted Repair Rates", desc: "AMC members save 15–25% on all repair parts and labour. Free diagnostic checks. No call-out fees for contract clients." },
];

const FAQS = [
  { q: "How much does commercial aircond installation cost in KL for an office?", a: "Wall-mounted commercial installation starts from RM 199 (1.5 HP) for small offices. Ceiling cassette installation from RM 290 (1.0–1.5 HP) up to RM 400 (3.5–6.0 HP). Each price includes 7 ft copper pipe, insulation, electrical wire and drain pipes/suspension kit, vacuum pump commissioning, and 1-month workmanship warranty. Extra materials quoted and approved on-site." },
  { q: "Can you install aircond outside business hours to avoid disrupting my operations?", a: "Yes — we specialise in after-hours commercial installation. Evening slots (6 PM–10 PM), weekends, and public holidays available. For restaurants, we can work between closing and opening hours. Office installations typically scheduled weekends. After-hours work (6 PM-10 PM) carries a flat RM 50 surcharge; weekend slots at standard rates." },
  { q: "What type of aircond is best for my shoplot or office?", a: "For open-plan offices and shoplots: ceiling cassette (even cooling, hidden installation, fits standard ceiling grid). For individual offices and consultation rooms: wall-mounted (lower cost, individual control). For server rooms: dedicated high-sensible units with 24/7 rating. Our site survey determines the optimal type for your specific space." },
  { q: "Do you offer Annual Maintenance Contracts (AMC) for commercial clients?", a: "Yes — AMC plans start from RM 299/year per unit for quarterly preventive maintenance. Includes priority emergency response (2-hour dispatch), 15–25% discounted repair rates, free diagnostic checks, and scheduled servicing. Multi-unit commercial discounts quoted on enquiry." },
  { q: "How quickly can you install aircond in my new shoplot or office before we open?", a: "Standard 1–3 unit commercial installation: 1–2 days. Larger fit-outs (5+ ceiling cassette units): 3–5 days with dedicated project team. We recommend booking 2 weeks before your target opening date. Rush/express installation available — WhatsApp us for availability." },
  { q: "Do you install ducted or concealed aircond systems for commercial spaces?", a: "Yes — we install concealed ducted split systems for commercial spaces that require hidden indoor units with distributed airflow through ceiling grilles. This is common for high-end offices, boutiques, and restaurants wanting a clean ceiling look. Ducted systems quoted on a per-project basis after site survey." },
  { q: "Can you handle multi-floor office aircond installation in KL commercial buildings?", a: "Yes — we coordinate with building management for multi-floor installations, including lift/loading bay scheduling, after-hours access permits, and structural mounting approvals. Our project team manages the entire coordination. We have experience in major KL commercial buildings including KLCC area, Bangsar South, Damansara Perdana, and Mont Kiara." },
  { q: "What commercial aircond brands do you install and service?", a: "All 20 major brands — Daikin, Panasonic, Mitsubishi, York, Carrier, Midea, LG, Samsung, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Haier, Hisense, Aux, TCL, Isonic and National. We carry commercial-grade models (higher static pressure, longer pipe runs, 24/7 duty cycle rated) from all major distributors in Klang Valley." },
];

export default function CommercialInstallationPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.klrenovator.com" },
    { name: "Aircond Installation KL & Selangor", url: "https://www.klrenovator.com/aircond-installation-kl" },
    { name: "Commercial Aircond Installation", url: "https://www.klrenovator.com/commercial-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/logo/image.png" alt="Commercial aircond installation office shoplot restaurant KL Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">B2B Commercial Installation Specialists</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Commercial Aircond Installation<br /><span className="text-indigo-400">Office · Shoplot · Restaurant · B2B</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Ceiling cassette, ducted, multi-split, and wall-mounted commercial aircond installation across KL & Selangor. After-hours installation, AMC maintenance contracts, dedicated project management. All 20 brands.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />After-Hours Available</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />AMC Plans from RM 299/yr</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />Dedicated Project Team</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏢 Commercial Installation Enquiry\n\nHi KL Renovator, I need commercial aircond installation for my business.\n\n📍 Location:\n🏢 Business Type: Office / Shoplot / Restaurant / Clinic / Other\n📏 Space Size (sq ft):\n🔢 Units Needed:\n\nPlease send commercial pricing & timeline.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Get Commercial Quote</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Call +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-20 sm:py-28 bg-slate-50" id="business-types">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Commercial Solutions by Business Type</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Tailored Installation for </span><span className={title({ size: "sm", color: "brand" })}>Every Commercial Space</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Each business type has unique cooling requirements. We design around your operations — not the other way.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_TYPES.map((bt, i) => (
              <Reveal key={bt.title} delay={i * 80}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{bt.icon}</div>
                  <h3 className="font-black text-lg text-slate-900 mb-2">{bt.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{bt.desc}</p>
                  <div className="bg-slate-50 rounded-xl p-4"><ul className="space-y-1.5">{bt.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-xs text-slate-600"><FaCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" /><span>{f}</span></li>))}</ul></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Pricing */}
      <section className="py-20 sm:py-28 bg-white" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Commercial Installation Pricing</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Transparent Pricing for </span><span className={title({ size: "sm", color: "brand" })}>Businesses</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Same transparent per-unit pricing as residential — with commercial-grade service standards.</p>
          </div></Reveal>
          <Reveal delay={100}><div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider"><div>Unit Type</div><div>Labour Price</div><div>Best For</div></div>
              {PRICING.map((p, i) => (<div key={i} className={`grid grid-cols-[1.5fr_0.8fr_2fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}><div className="font-black text-slate-900">{p.type}</div><div className="text-indigo-600 font-black">{p.price}</div><div className="text-slate-500">{p.suitable}</div></div>))}
            </div>
          </div></Reveal>
          <Reveal delay={200}><div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="font-black text-amber-800 text-sm mb-2">Custom Commercial Quote?</p>
            <p className="text-amber-700 text-sm mb-3">Multi-unit, ducted systems, or complex layouts — WhatsApp us with your floor plan for a detailed project quote.</p>
            <a href={waLink("🏢 Custom Commercial Quote\n\nHi KL Renovator, I need a custom commercial installation quote.\n\n📍 Location:\n🏢 Business Type:\n📏 Total Area (sq ft):\n🔢 Units Needed:\n\nPlease send detailed project pricing.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Request Custom Commercial Quote</a>
          </div></Reveal>
        </div>
      </section>

      {/* AMC Section */}
      <section className="py-20 sm:py-28 bg-slate-50" id="amc">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Annual Maintenance Contracts (AMC)</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Keep Your Commercial Units </span><span className={title({ size: "sm", color: "brand" })}>Running 24/7</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Preventive maintenance beats emergency repairs. AMC plans from RM 299/year per unit — save up to 30% vs one-off bookings.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {AMC_BENEFITS.map((b, i) => (<Reveal key={b.title} delay={i * 100}><div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all h-full"><div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-4">{b.icon}</div><h3 className="font-black text-slate-900 mb-2">{b.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p></div></Reveal>))}
          </div>
          <Reveal delay={300}><div className="max-w-2xl mx-auto bg-indigo-600 text-white rounded-2xl p-8 text-center">
            <h3 className="font-black text-xl mb-2">Commercial AMC Packages</h3>
            <div className="grid grid-cols-2 gap-4 mt-6 text-left">
              <div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">Basic · per unit</p><p className="font-black text-2xl">RM 299<span className="text-sm font-normal text-indigo-200">/year</span></p></div>
              <div className="bg-white/10 rounded-xl p-4"><p className="text-xs text-indigo-200 mb-1">Premium · per unit</p><p className="font-black text-2xl">RM 899<span className="text-sm font-normal text-indigo-200">/year</span></p></div>
            </div>
            <a href={waLink("📋 AMC Contract Enquiry\n\nHi KL Renovator, I'm interested in a commercial AMC plan.\n\n🏢 Business Type:\n🔢 Number of Units:\n📍 Location:\n\nPlease send AMC details & pricing.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-white hover:bg-indigo-50 text-indigo-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Enquire About AMC</a>
          </div></Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12"><p className={eyebrow()}>Commercial Installation FAQs</p><h2 className="mt-3"><span className={title({ size: "sm" })}>Business Owner Questions </span><span className={title({ size: "sm", color: "brand" })}>Answered</span></h2></div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">{FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Ready to Cool Your Business?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Free commercial site survey. Transparent pricing. After-hours installation. AMC plans from RM 299/yr. All 20 brands.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏢 Commercial Installation — Final Booking\n\nHi KL Renovator, I want to proceed with commercial installation.\n\n📍 Location:\n🏢 Business Type:\n🔢 Units:\n📅 Preferred Date:\n\nPlease confirm pricing & schedule.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Book Commercial Installation</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Call +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Serving commercial properties across all KL & Selangor areas — KLCC, Bangsar South, Damansara Perdana, Mont Kiara, PJ, Subang Jaya, Shah Alam, Klang, Puchong, Cheras & more.</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/aircond-installation-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← All Installation Services</Link>
              <Link href="/services/maintenance-contract" className="text-sm text-slate-500 hover:text-white transition-colors">AMC Details</Link>
              <Link href="/faq" className="text-sm text-slate-500 hover:text-white transition-colors">More FAQs</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
