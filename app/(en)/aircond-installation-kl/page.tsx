import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaTruck, FaWrench, FaGauge, FaShield, FaClock, FaLocationDot, FaBuilding, FaPlug, FaSnowflake, FaMagnifyingGlass, FaBolt, FaTemperatureHalf } from "react-icons/fa6";
import { FiArrowRight, FiMapPin, FiPhone, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildInstallationServiceSchema, buildInstallationHowToSchema, buildInstallationFAQSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationCROModule } from "@/components/installation-cro-module";
import { ToolLinks } from "@/components/calculators/tool-links";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";
import { InstallationProof } from "@/components/installation-proof";

export const metadata: Metadata = {
  title: "Aircond Installation KL & Selangor — From RM199, Same-Day",
  description: "Aircond installation KL & Selangor from RM199. Wall-mounted, ceiling cassette & window units, all 20 brands. Vacuum pump, 1-month warranty. Same-day.",
  openGraph: {
    title: "Aircond Installation KL & Selangor — From RM199 | KL Renovator",
    description: "Expert aircond installation from RM199. Wall-mounted, ceiling cassette, all brands. Vacuum pump, copper pipe, 1-month warranty. WhatsApp +60182983573",
    type: "website",
    locale: "en_MY",
    url: "https://www.klrenovator.com/aircond-installation-kl",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "Aircond Installation KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Aircond Installation KL & Selangor — From RM199 | KL Renovator", description: "Professional aircond installation from RM199. Same-day, all brands, 1-month warranty. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/aircond-installation-kl", languages: { "en-MY": "https://www.klrenovator.com/aircond-installation-kl", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-kl", "zh-MY": "https://www.klrenovator.com/zh/aircond-installation-kl", "x-default": "https://www.klrenovator.com/aircond-installation-kl" } },
};

const INSTALLATION_PROCESS = [
  { step: 1, title: "WhatsApp Booking & Site Survey", desc: "Contact us via WhatsApp at +60182983573 with your area, unit type (wall-mounted, ceiling cassette, window), and HP size. We confirm pricing and schedule a same-day or next-day site survey. Our technician assesses piping route, outdoor unit placement, and electrical requirements.", icon: <FiMessageSquare className="h-5 w-5" /> },
  { step: 2, title: "Technician Dispatch & Preparation", desc: "Our certified HVAC technician arrives with all tools, materials (copper pipe, insulations, wiring), and safety equipment. Drop sheets protect your floors and furniture. We confirm the exact installation plan with you before starting.", icon: <FaTruck className="h-5 w-5" /> },
  { step: 3, title: "Copper Piping & Insulation Installation", desc: "Type L or Type M copper pipes (based on HP size) are cut, flared, and routed neatly. Armaflex insulation (minimum 9mm) prevents condensation and energy loss. Pipes are secured with proper brackets — no sagging, no sharp bends that restrict refrigerant flow.", icon: <FaWrench className="h-5 w-5" /> },
  { step: 4, title: "Drain Pipe Installation with Gradient", desc: "PVC drain pipe installed with minimum 1:50 gradient for gravity drainage. Anti-siphon trap prevents backflow. Condensate tested before closing up. For high-rise condos, we route to nearest floor trap or balcony drain per building management rules.", icon: <FaWrench className="h-5 w-5" /> },
  { step: 5, title: "Electrical Connection & Breaker Check", desc: "Dedicated circuit with correct MCB rating (16A for 1.0–1.5HP, 20A for 2.0–2.5HP, 32A for 3.0HP+). Wiring sized per Malaysian standards. Earth leakage protection verified. Outdoor unit isolator installed for safety and maintenance access.", icon: <FaBolt className="h-5 w-5" /> },
  { step: 6, title: "Vacuum Pump Commissioning (Mandatory)", desc: "Two-stage vacuum pump pulls system down to 500 microns or below — removing all moisture and non-condensables. This step is NON-NEGOTIABLE. Skipping vacuuming causes compressor failure, acid formation, and voids manufacturer warranty. We hold vacuum for 15+ minutes to confirm no leaks.", icon: <FaGauge className="h-5 w-5" /> },
  { step: 7, title: "Refrigerant Release, Testing & Handover", desc: "Factory charge released. System runs for 15+ minutes. We verify: cooling output (thermometer at supply/return), running pressures, amp draw, thermostat calibration, zero vibration, zero leaks. Written 1-month workmanship warranty card handed over. Job card with checklist signed.", icon: <FaTemperatureHalf className="h-5 w-5" /> },
];

const PRICING_TABLE = [
  { type: "Wall-Mounted", hp: "1.0 HP", price: "RM 199", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "1.5 HP", price: "RM 199", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "2.0 HP", price: "RM 249", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "2.5 HP", price: "RM 279", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "3.0 HP", price: "RM 329", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "4.0 HP", price: "RM 399", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Wall-Mounted", hp: "5.0 HP", price: "RM 449", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe included" },
  { type: "Ceiling Cassette", hp: "1.0–1.5 HP", price: "RM 290", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe + pump included" },
  { type: "Ceiling Cassette", hp: "2.0–3.0 HP", price: "RM 350", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe + pump included" },
  { type: "Ceiling Cassette", hp: "3.5–6.0 HP", price: "RM 400", pipe: "7 ft copper pipe included", wire: "Wiring included", drain: "Drain pipe + pump included" },
  { type: "Window Unit", hp: "1.0–2.0 HP", price: "RM 180", pipe: "N/A (self-contained)", wire: "Wiring included", drain: "Built-in drain" },
];

const BRANDS = siteConfig.brandsSupported;

const FAQS = [
  { q: "How much does aircond installation cost in KL & Selangor?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft copper pipe, insulation, electrical wire and drain pipe. Ceiling cassette from RM 290. Window unit from RM 180. Extra materials beyond 7 ft are charged per foot using HP-wise rates: Copper pipe RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP). Wire RM 9/ft. Small PVC casing RM 6/ft; large PVC casing RM 12/ft. All prices confirmed before work begins. Drain pipe beyond the included 7 ft is RM 5/ft. All prices confirmed before work begins." },
  { q: "How long does aircond installation take?", a: "Standard wall-mounted installation takes 3–5 hours for a single unit. Ceiling cassette takes 5–8 hours due to ceiling suspension and drain pump wiring. Multi-unit whole-house installations typically complete in 1–2 days. Same-day installation available for bookings made before 11 AM." },
  { q: "Do you install aircond in high-rise condos in KL?", a: "Yes — we regularly install in condos across KLCC, Mont Kiara, Bangsar, Sentul, PJ, and Subang Jaya. We coordinate with building management for lift/loading bay access, follow security procedures, and ensure outdoor unit placement complies with JMB rules. Our technicians are experienced with service-ledge and balcony installations." },
  { q: "What copper pipe grade do you use for installation?", a: "We use Type L copper pipe for 1.0–2.5 HP wall-mounted units and Type M for 3.0 HP+ where wall thickness permits. All pipes are cleanly prepared during brazing to prevent oxidation. Armaflex insulation (9–13mm) is standard. This exceeds the minimum Malaysian standard and ensures long-term reliability." },
  { q: "Why is vacuum pump commissioning mandatory?", a: "Vacuuming removes moisture and air from the refrigerant lines. Moisture + refrigerant = acid, which destroys compressor windings and clogs capillary tubes. Non-condensables raise head pressure and kill efficiency. We pull to 500 microns and hold for 15+ minutes. No vacuum = no warranty. This is standard HVAC best practice worldwide." },
  { q: "Can you install during rainy season in Malaysia?", a: "Yes — we install year-round. For outdoor work during rain, we use pop-up canopies and waterproof covers. Indoor unit mounting and piping continue unaffected. Only heavy lightning storms pause outdoor compressor placement for safety. Same-day slots may be slightly tighter during monsoon — book early." },
  { q: "Do I need a dedicated electrical circuit for my new aircond?", a: "Yes — Malaysian regulations (MS IEC 60364) require a dedicated circuit with its own MCB for each aircond unit. We install a new circuit from your DB box if one doesn't exist, or verify the existing circuit's capacity. Plug-in units still need a dedicated socket on a protected circuit. Electrical work is included in our installation quote." },
  { q: "What warranty do you provide on installation?", a: "1-month written workmanship warranty on all installation labour. If any installation-related issue arises (leaks, vibration, electrical fault, poor cooling) within 30 days, we return and rectify at zero cost. Manufacturer warranty on the unit itself (typically 5 years compressor, 1 year parts) is separate and requires proof of professional installation — which our job card provides." },
  { q: "How do I book an aircond installation near me in KL or Selangor?", a: "WhatsApp +60182983573 with your area, unit type (wall-mounted/ceiling cassette/window), HP size, and preferred date. We confirm price and schedule within 30 minutes. Same-day installation available for early bookings. We cover all KL & Selangor areas including Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, and Cyberjaya." },
];

function TrustBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90">
      <Icon className="h-4 w-4 text-emerald-400" />
      {label}
    </span>
  );
}

function ProcessStep({ step, title, desc, icon }: { step: number; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="relative flex gap-6 group">
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-xl z-10 relative border-4 border-white">{step}</div>
        {step < 7 && <div className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-transparent" />}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex p-2 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl">{icon}</div>
          <h3 className="font-black text-slate-900 text-lg">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed ml-10">{desc}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-5">
      <h3 className="font-black text-slate-900 mb-2 text-base">{q}</h3>
      <p className="text-slate-600 leading-relaxed">{a}</p>
    </div>
  );
}

function PricingRow({ type, hp, price, pipe, wire, drain, isHeader = false }: { type: string; hp: string; price: string; pipe: string; wire: string; drain: string; isHeader?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_80px_repeat(3,1fr)] gap-4 px-4 py-3 ${isHeader ? "bg-slate-50 font-black text-slate-700 text-xs uppercase tracking-wider border-b border-slate-200" : "border-b border-slate-50 hover:bg-sky-50/30 transition-colors text-sm"}`}>
      <span className={`font-${isHeader ? "black" : "medium"} text-${isHeader ? "slate-700" : "slate-900"}`}>{type}</span>
      <span className="text-center">{hp}</span>
      <span className="text-center text-sky-600 font-black">{price}</span>
      <span className="text-center text-xs text-slate-500">{pipe}</span>
      <span className="text-center text-xs text-slate-500">{wire}</span>
      <span className="text-center text-xs text-slate-500">{drain}</span>
    </div>
  );
}

export default function AircondInstallationKLPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.klrenovator.com" },
    { name: "Aircond Installation KL & Selangor", url: "https://www.klrenovator.com/aircond-installation-kl" },
  ]);

  const serviceSchema = buildInstallationServiceSchema();
  const howToSchema = buildInstallationHowToSchema();
  const faqSchema = buildInstallationFAQSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image
          src="/hero/aircond-installation-kuala-lumpur.webp"
          alt="KL Renovator technician performing professional aircond installation Kuala Lumpur"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">KL & Selangor's Most Trusted Installation Specialists</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">
              Aircond Installation KL & Selangor
              <br />
              <span className="text-sky-400">From RM 199 · Same-Day · All Brands</span>
            </h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">
              Expert wall-mounted, ceiling cassette & window unit installation across Kuala Lumpur and Selangor.
              Vacuum pump commissioning, Type L copper piping, Armaflex insulation, 1-month workmanship warranty.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrustBadge icon={FaCheck} label="Installation From RM 199" />
              <TrustBadge icon={FaClock} label="Same-Day Available" />
              <TrustBadge icon={FaShield} label="1-Month Workmanship Warranty" />
              <TrustBadge icon={FaTruck} label="All 20 Brands Supported" />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I need a new aircond installed.\n\n📍 My Area:\n❄️ Unit Type: Wall-Mounted / Ceiling Cassette / Window\n📏 HP Size (if known):\n🏠 Property: Condo / Landed / Office / Shoplot\n\nPlease send quote & available slots.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all">
                <FaWhatsapp className="h-5 w-5" /> Book Installation via WhatsApp
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all">
                <FiPhone className="h-4 w-4 text-sky-300" /> Call +60 18-298 3573
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Transparency Table */}
      <section className="py-20 sm:py-28 bg-slate-50" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className={eyebrow()}>Transparent Installation Pricing</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>No Hidden Fees — </span><span className={title({ size: "sm", color: "brand" })}>Price Confirmed Before We Drill</span></h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[900px]">
                <PricingRow type="Type" hp="HP" price="Labour" pipe="Copper Pipe" wire="Wiring" drain="Drain Pipe" isHeader />
                {PRICING_TABLE.map((row) => (
                  <PricingRow key={`${row.type}-${row.hp}`} {...row} />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="font-black text-emerald-800 mb-3 flex items-center gap-2"><FaCheck className="h-5 w-5" /> What's Included in the Labour Price</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Site survey & quotation (free)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 ft copper pipe (liquid + gas lines)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 ft electrical wiring</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 7 ft PVC drain pipe</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Outdoor bracket (paid special charge if required)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Vacuum pump commissioning</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Refrigerant release & testing</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> 1-month workmanship warranty card</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2"><FaMagnifyingGlass className="h-5 w-5" /> Additional Charges (Only If Needed)</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-700">
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Copper pipe beyond 7 ft: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0–3.5 HP)</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Wire beyond 7 ft: RM 9/ft</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Small PVC casing (electrical wire): RM 6/ft; large PVC casing (copper pipe + wire + insulation): RM 12/ft</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Standard compressor / outdoor bracket: RM 45</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Heavy-duty compressor / outdoor bracket: RM 70</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> New electrical plug point: RM 100</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> Wall hacking/concealment: RM 6/ft</li>
                <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 shrink-0" /> High-rise/difficult access: RM 50–150</li>
              </ul>
              <p className="mt-4 text-xs text-amber-600">All extras quoted & approved on-site BEFORE work starts. No surprises.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose KL Renovator for Installation */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>Why KL Renovator for Installation?</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Expert Installation by </span><span className={title({ size: "sm", color: "brand" })}>Certified HVAC Technicians</span></h2>
              <p className="mt-4 text-slate-600 font-medium">We don't just mount units — we engineer complete cooling systems that last.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FaWrench className="h-6 w-6" />, title: "Vacuum Pump Every Job", desc: "Mandatory 500-micron vacuum on every install. No exceptions. Protects your compressor for years." },
              { icon: <FaPlug className="h-6 w-6" />, title: "Type L Copper & Armaflex", desc: "Premium copper piping with 9–13mm Armaflex insulation. No cheap thin-wall substitutes." },
              { icon: <FaBolt className="h-6 w-6" />, title: "Dedicated Circuit & MCB", desc: "Proper electrical per MS IEC 60364. Correct breaker sizing, earth leakage, isolator included." },
              { icon: <FaGauge className="h-6 w-6" />, title: "Precision Commissioning", desc: "15-min run test: pressures, amp draw, thermostat calibration, cooling delta-T verified." },
              { icon: <FaShield className="h-6 w-6" />, title: "Written 1-Month Warranty", desc: "Job card with checklist signed. Any install-related issue in 30 days — we return free." },
              { icon: <FaBuilding className="h-6 w-6" />, title: "Condo & JMB Experts", desc: "We handle building approvals, lift booking, service-ledge access, after-hours rules seamlessly." },
              { icon: <FaSnowflake className="h-6 w-6" />, title: "All 20 Major Brands", desc: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Hisense, Aux, TCL, Isonic, National, Sanyo." },
              { icon: <FaLocationDot className="h-6 w-6" />, title: "KL & Selangor Coverage", desc: "Petaling Jaya, Cheras, Ampang, Subang, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process - 7 Steps */}
      <section className="py-20 sm:py-28 bg-slate-50" id="process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={eyebrow()}>Our 7-Step Installation Process</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>From Booking to </span><span className={title({ size: "sm", color: "brand" })}>Cool Comfort</span></h2>
              <p className="mt-4 text-slate-600 font-medium">Every installation follows this exact sequence — no shortcuts, no surprises.</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {INSTALLATION_PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <ProcessStep {...step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Technical Details */}
      <section className="py-20 sm:py-28 bg-white" id="materials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>Materials & Technical Standards</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>What Goes Into Every </span><span className={title({ size: "sm", color: "brand" })}>Quality Installation</span></h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaPlug className="h-5 w-5 text-sky-600" /> 铜管</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Type L copper (1.0–2.5 HP) — thicker walls, better corrosion resistance</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-5 text-emerald-500 shrink-0" /> Type M copper (3.0 HP+) — approved for larger capacity</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> purged during brazing — prevents internal oxidation</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Proper flare connections — torque-wrench tightened to spec</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> No kinks, sharp bends, or undersized pipe runs</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaTemperatureHalf className="h-5 w-5 text-sky-600" /> Insulation</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Armaflex (closed-cell elastomeric) — minimum 9mm thickness</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 13mm for ceiling cassette &amp; long pipe runs (&gt;15 ft)</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Prevents condensation drips & energy loss</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> UV-resistant tape on all joints & terminations</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Full coverage — no exposed copper anywhere</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><FaBolt className="h-5 w-5 text-sky-600" /> Electrical & Brackets</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Dedicated circuit from DB — correct MCB rating per HP</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> 2.5mm² cable (1.0–2.5 HP), 4mm² (3.0–5.0 HP)</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Outdoor isolator switch — safety & maintenance access</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Heavy-duty outdoor bracket (paid special charge if required)s — vibration-damped, powder-coated</li>
                  <li className="flex items-center gap-2"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Cable trunking — neat, protected, paintable</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand Expertise */}
      <section className="py-20 sm:py-28 bg-white" id="brands">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow()}>Brand Installation Expertise</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>We Install All </span><span className={title({ size: "sm", color: "brand" })}>20 Major Brands</span></h2>
              <p className="mt-4 text-slate-600 font-medium">From Daikin inverter multi-split systems to Midea wall-mounted units — our technicians know every brand's quirks, torque specs, and commissioning procedures.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {BRANDS.map((brand) => (
                <Link key={brand} href={`/brands/${brand.toLowerCase()}/installation`} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center hover:border-sky-300 hover:shadow-md transition-all group">
                  <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors">{brand}</p>
                  <p className="text-xs text-slate-400 mt-1">Expert Installation</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warranty & Trust Signals */}
      <section className="py-20 sm:py-28 bg-sky-600 text-white" id="warranty">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-100 mb-4">Our Promise</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Written 1-Month Workmanship Warranty</h2>
              <p className="mt-4 text-sky-100 font-medium">Not verbal. Not implied. A signed job card with checklist — your proof of professional installation.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">1</div>
                <h3 className="font-black text-lg mb-2">Month Workmanship Warranty</h3>
                <p className="text-sky-100 text-sm">Any installation-related issue — leaks, vibration, electrical, cooling — we return free.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">3</div>
                <h3 className="font-black text-lg mb-2">Month Parts Warranty</h3>
                <p className="text-sky-100 text-sm">On any component we supply (brackets, piping, wiring, fittings).</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black mb-2">✓</div>
                <h3 className="font-black text-lg mb-2">Manufacturer Warranty Protected</h3>
                <p className="text-sky-100 text-sm">Our job card proves professional install — keeps your 5-year compressor warranty valid.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="mt-12 text-center">
              <h3 className="font-black text-xl mb-4">Price Confirmed Before We Drill — Guaranteed</h3>
              <p className="text-sky-100 mb-6 max-w-2xl mx-auto">No hidden fees. No "while we're here" surprises. Every extra material is quoted and approved by you on-site before any drilling or cutting begins.</p>
              <a href={waLink("🔧 Installation Quote Request\n\nHi KL Renovator, I want a confirmed price for aircond installation.\n\n📍 Area:\n❄️ Unit Type:\n📏 HP Size:\n🏠 Property Type:\n\nPlease send full breakdown.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> Get Confirmed Price on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRO Module — Installation Page Conversion Optimization */}
      <InstallationCROModule 
        title="Why Choose KL Renovator for Installation?"
        subtitle="Professional aircond installation from RM199 — same-day available, all 20 brands, 1-month workmanship warranty."
        showObjectionHandling={true}
        showTrustSignals={true}
        showPricingGuarantee={true}
        showUSPBlock={true}
      />

      {/* Installation Trust Signals — INS-17 */}
      <InstallationTrustSignals variant="default" />

      {/* Real project photos + verified Google reviews.
          This pillar page previously rendered only two images (logo + hero)
          and carried no reviews at all, despite 93 real project photos
          being available in the repo. */}
      <InstallationProof locale="en" />

      {/* FAQ Section */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className={eyebrow()}>Frequently Asked Questions</p>
              <h2 className="mt-3"><span className={title({ size: "sm" })}>Installation Questions </span><span className={title({ size: "sm", color: "brand" })}>Answered Honestly</span></h2>
            </div>
          </Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FAQItem {...faq} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Ready for Professional Installation?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Same-day slots available across KL & Selangor. Transparent pricing from RM 199. 1-month workmanship warranty. All 20 brands.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🔧 Aircond Installation Booking\n\nHi KL Renovator, I want to book installation.\n\n📍 My Area:\n❄️ Unit Type: Wall-Mounted / Ceiling Cassette / Window\n📏 HP Size:\n🏠 Property: Condo / Landed / Office\n\nPreferred date:\n\nPlease confirm price & slot.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FaWhatsapp className="h-5 w-5" /> Book via WhatsApp
              </a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FiPhone className="h-4 w-4" /> Call +60 18-298 3573
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">We serve all KL & Selangor areas — Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & more.</p>
          </Reveal>
        </div>
      </section>

      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
    </>
  );
}