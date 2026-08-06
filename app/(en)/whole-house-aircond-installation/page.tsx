import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaShield, FaClock, FaBolt, FaBuilding, FaCubes, FaTags, FaPhone, FaSnowflake } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "Whole-House Aircond Installation KL — Multi-Unit Packages",
  description: "Whole-house aircond installation in KL & Selangor — 3+ units. Volume discounts, room-by-room BTU guide, full-house cooling plan. From RM199/unit.",
  openGraph: {
    title: "Whole-House Aircond Installation KL — Multi-Unit Packages",
    description: "3+ aircond units? Volume discounts, BTU room guide, full-house cooling plan. From RM199/unit. Bulk quote via WhatsApp +60182983573",
    type: "website", locale: "en_MY",
    url: "https://www.klrenovator.com/whole-house-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp", width: 1200, height: 630, alt: "Whole-House Aircond Installation KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "Whole-House Aircond Installation KL & Selangor — Bulk Packages | KL Renovator", description: "Multi-unit aircond installation with volume discounts. BTU guide, project timeline, from RM199/unit. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-double-unit-kl.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/whole-house-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/whole-house-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-seluruh-rumah", "zh-MY": "https://www.klrenovator.com/zh/whole-house-aircond-installation", "x-default": "https://www.klrenovator.com/whole-house-aircond-installation" } },
};

const VOLUME_TIERS = [
  { units: "3 Units", price: "RM 597", save: "Save RM 0 vs individual", highlights: ["3× wall-mounted (mixed HP as needed)", "7 ft copper pipe, insulation, electrical wire and drain pipe ×3", "3× vacuum pump commissioning", "1-day completion"], badge: "Popular for 3-Bedroom Homes" },
  { units: "5 Units", price: "RM 945", save: "Save RM 50 vs individual", highlights: ["5× wall-mounted (mixed HP as needed)", "7 ft copper pipe, insulation, electrical wire and drain pipe ×5", "5× vacuum pump commissioning", "1-day priority completion", "Free DB box capacity assessment"], badge: "Best Value", highlight: true },
  { units: "10+ Units", price: "From RM 1,790", save: "Custom volume discount", highlights: ["10+× wall-mounted (mixed HP)", "7 ft copper pipe, insulation, electrical wire and drain pipe per unit", "Vacuum pump on every unit", "Dedicated project team", "Free DB box assessment + load balancing", "Priority scheduling — complete in 1–2 days", "Custom payment schedule available"], badge: "Bulk / Commercial" },
];

const ROOM_BTU_GUIDE = [
  { room: "Small Bedroom", size: "100–150 sq ft", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "Standard Malaysian bedroom. Single occupant. Low sun exposure." },
  { room: "Master Bedroom", size: "150–250 sq ft", btus: "12,000 – 18,000", hp: "1.0 – 1.5 HP", notes: "Attached bathroom adds heat load. May need 1.5 HP if west-facing." },
  { room: "Living Room", size: "250–400 sq ft", btus: "18,000 – 24,000", hp: "1.5 – 2.0 HP", notes: "Open-plan living with kitchen? Go 2.0 HP minimum. Consider 2.5 HP for double-volume ceilings." },
  { room: "Large Living / Family Hall", size: "400–600 sq ft", btus: "24,000 – 36,000", hp: "2.0 – 3.0 HP", notes: "Open-concept with dining + dry kitchen. Ceiling cassette may be better than wall-mounted for even cooling." },
  { room: "Home Office / Study", size: "80–120 sq ft", btus: "9,000 – 12,000", hp: "1.0 HP", notes: "Electronics (PC, monitors, printer) add heat. 1.0 HP usually sufficient." },
  { room: "Kitchen (Wet)", size: "100–200 sq ft", btus: "12,000+", hp: "1.0 – 1.5 HP", notes: "Not recommended unless heavy-duty kitchen-rated unit. Grease clogs coils fast — needs 6-month chemical wash cycle." },
  { room: "Shoplot / Retail", size: "300–800 sq ft", btus: "24,000 – 48,000", hp: "2.0 – 4.0 HP", notes: "High foot traffic, frequent door opening, glass frontage. May need multiple units or ceiling cassette." },
  { room: "Office / Meeting Room", size: "200–400 sq ft", btus: "18,000 – 30,000", hp: "1.5 – 2.5 HP", notes: "4–8 occupants add significant heat load. Ceiling cassette recommended for even distribution." },
];

const PROJECT_TIMELINE = [
  { phase: "Day 1 — AM", title: "Consultation & Site Survey", desc: "WhatsApp us your floor plan or room list. Our senior technician visits your property. We assess every room, measure BTU requirements, inspect DB box capacity, plan pipe routes, and select outdoor unit locations. Free — no obligation.", icon: <FaBuilding className="h-6 w-6" /> },
  { phase: "Day 1 — PM", title: "Final Quote & Scheduling", desc: "You receive an itemized quote: per-unit labour, total copper pipe length types, electrical work (if any), and total project cost. Once approved, we lock in your installation date — usually within 48 hours for landed homes.", icon: <FaTags className="h-6 w-6" /> },
  { phase: "Day 2 — Full Day", title: "Multi-Unit Installation", desc: "Our team arrives with all materials pre-staged. Units installed room by room in sequence. Drop sheets protect every area. Copper piping, vacuum (500 microns), electrical circuits, drain testing — every unit gets the full 7-step process.", icon: <FaBolt className="h-6 w-6" /> },
  { phase: "Day 2 — End", title: "Commissioning & Handover", desc: "All units run simultaneously for final testing. Cooling delta-T measured on every unit. Job cards signed room by room. Written 1-month workmanship warranty on all units. Remote controls paired. You walk through a fully cooled home.", icon: <FaShield className="h-6 w-6" /> },
];

const FAQS = [
  { q: "How much does whole-house aircond installation cost for a 3-bedroom home in KL?", a: "A 3-unit package starts from RM 597 for wall-mounted units (1.0–1.5 HP per room). 5-unit packages from RM 945. Each unit includes 7 ft copper pipe, insulation, electrical wire and drain pipe, vacuum pump commissioning, and 1-month workmanship warranty. Extra copper pipe beyond 7 ft is RM 17–27/ft. All pricing confirmed before any work starts." },
  { q: "Do you offer volume discounts for installing 5 or more aircond units?", a: "Yes — our 5-unit package saves RM 50 compared to individual bookings, and includes a free DB box capacity assessment. For 10+ units, we provide custom volume pricing with dedicated project management. WhatsApp us with your unit count and property type for an exact quote." },
  { q: "How do I know what HP size each room needs?", a: "Use our room-by-room BTU guide on this page. Small bedroom (100–150 sq ft): 1.0 HP. Master bedroom (150–250 sq ft): 1.0–1.5 HP. Living room (250–400 sq ft): 1.5–2.0 HP. Our technician confirms all sizes during the free site survey — no guesswork needed." },
  { q: "How long does it take to install 5 aircond units in one house?", a: "5 units typically complete in 1 full day (8 AM – 6 PM) with a dedicated 2–3 person team. 10+ units take 1–2 days. We pre-stage all materials the night before and work room-by-room in sequence. Landed homes are faster; condos may need an extra day for lift access windows." },
  { q: "Can my home's electrical panel handle 5 new aircond units?", a: "Our technician checks your DB box during the free site survey. Most homes built after 2015 have 2–4 spare MCB slots. If you need additional slots or a higher-capacity main breaker, we quote the electrical work upfront. Typical panel upgrades range from RM 100–300 depending on scope." },
  { q: "Do you install mixed types — wall-mounted in bedrooms plus ceiling cassette in the living room?", a: "Yes — this is actually very common for whole-house projects. Wall-mounted units in bedrooms (efficient, quieter) with a ceiling cassette in the open-plan living/dining area (better coverage, cleaner look). We install both types and coordinate the different mounting, drainage, and electrical requirements seamlessly." },
  { q: "What if I need additional copper pipe beyond the included 7 ft per unit?", a: "Copper pipe beyond 7 ft is charged per foot: RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP), RM 27/ft (3.0 HP+). During the site survey, we measure the exact pipe length for every unit and include it in your quote. You approve all extras before work starts — no surprises." },
  { q: "Who are the best aircond installation specialists near me for whole-house projects in KL & Selangor?", a: "KL Renovator is the most trusted multi-unit installation specialist across Klang Valley — with 500+ 5-star reviews, SSM registration, and a proven track record of whole-house projects in Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Klang, Kajang, and beyond. WhatsApp +60182983573 for your free site survey and bulk quote." },
];

export default function WholeHouseInstallationPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.klrenovator.com" },
    { name: "Aircond Installation KL & Selangor", url: "https://www.klrenovator.com/aircond-installation-kl" },
    { name: "Whole-House Aircond Installation", url: "https://www.klrenovator.com/whole-house-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-double-unit-kl.webp" alt="Whole-house multi-unit aircond installation Kuala Lumpur Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-4">Multi-Unit Installation Specialists</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Whole-House Aircond Installation<br /><span className="text-amber-400">Volume Pricing · Multi-Unit Experts</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Installing 3, 5, or 10+ aircond units in your KL or Selangor home? Volume discount tiers, room-by-room BTU guide, full-house cooling plan, dedicated project team. From RM 199/unit.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Volume Discounts Available</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Free DB Box Assessment</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Dedicated Project Team</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 Whole-House Installation Enquiry\n\nHi KL Renovator, I need a bulk quote for multiple aircond units.\n\n📍 Area:\n🏠 Property Type: Condo / Landed / Office\n🔢 Number of Units:\n🛏️ Room Types (bedrooms, living, etc):\n\nPlease send volume pricing & timeline.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Get Bulk Quote on WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Call +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volume Discount Tiers */}
      <section className="py-20 sm:py-28 bg-slate-50" id="tiers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Volume Discount Tiers</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>The More You Install, </span><span className={title({ size: "sm", color: "brand" })}>The More You Save</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Transparent bundled pricing for multi-unit projects. One team, one timeline, one warranty — zero coordination headaches.</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {VOLUME_TIERS.map((tier, i) => (
              <Reveal key={tier.units} delay={i * 120}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${tier.highlight ? "border-amber-400 shadow-lg shadow-amber-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Best Value</div>}
                  <div className="mb-4"><div className="inline-flex bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{tier.badge}</div><h3 className="font-black text-2xl text-slate-900">{tier.units}</h3></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{tier.price}</span><span className="text-slate-500 text-sm ml-1">total labour</span></div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5 inline-flex self-start mb-5"><span className="text-xs font-black text-emerald-700">{tier.save}</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1">
                    <ul className="space-y-2">{tier.highlights.map((h: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{h}</span></li>))}</ul>
                  </div>
                  <a href={waLink("🏠 " + tier.units + " Bulk Quote\n\nHi KL Renovator, I want the " + tier.units + " installation package.\n\n📍 Area:\n🏠 Property Type:\n\nPlease confirm pricing & availability.")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${tier.highlight ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> Get {tier.units} Quote</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <p className="font-black text-sky-800 text-sm mb-1"><FaCubes className="h-4 w-4 inline mr-1" /> Custom Project? 15+ Units? Commercial Buildings?</p>
              <p className="text-sky-700 text-sm">WhatsApp us for a dedicated project quote with custom payment schedule and project timeline.</p>
              <a href={waLink("🏢 Large Project Enquiry — 15+ Units\n\nHi KL Renovator, I have a large project with 15+ aircond units.\n\n📍 Location:\n🔢 Number of Units:\n🏠 Property Type:\n📅 Target Completion Date:\n\nPlease send custom project pricing & timeline.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Request Project Quote</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BTU Room Guide */}
      <section className="py-20 sm:py-28 bg-white" id="btu-guide">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Full House Cooling Plan</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Room-by-Room </span><span className={title({ size: "sm", color: "brand" })}>BTU & HP Guide</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Not sure what HP each room needs? Use this guide — our technicians verify and confirm during the free site survey.</p>
          </div></Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 bg-slate-50 border-b border-slate-200 px-6 py-3 font-black text-slate-700 text-xs uppercase tracking-wider">
                  <div>Room Type</div><div>Size (sq ft)</div><div>BTUs Needed</div><div>HP</div><div>Installation Notes</div>
                </div>
                {ROOM_BTU_GUIDE.map((row, i) => (
                  <div key={i} className={`grid grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_1.5fr] gap-0 px-6 py-4 border-b border-slate-50 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                    <div className="font-black text-slate-900">{row.room}</div><div className="text-slate-600">{row.size}</div><div className="text-sky-600 font-bold">{row.btus}</div><div className="text-slate-900 font-black">{row.hp}</div><div className="text-slate-500 text-xs leading-relaxed">{row.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 max-w-3xl mx-auto">
              <h3 className="font-black text-sky-800 mb-2 flex items-center gap-2"><FaSnowflake className="h-5 w-5" /> Quick Rule of Thumb</h3>
              <p className="text-sky-700 text-sm leading-relaxed">For Malaysian homes: <strong>60–65 BTU per square foot</strong> is the standard baseline. Add 10% for west-facing rooms, 10% for rooms above kitchen heat, and 600 BTU per additional occupant beyond 2 people. Our technicians calculate exact loads during the free survey — but this guide gets you 90% of the way there before we even arrive.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-20 sm:py-28 bg-slate-50" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Project Timeline</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>From Empty Rooms to </span><span className={title({ size: "sm", color: "brand" })}>Fully Cooled Home</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Our streamlined multi-unit process — managed by a dedicated project team from quote to handover.</p>
          </div></Reveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {PROJECT_TIMELINE.map((phase, i) => (
              <Reveal key={phase.phase} delay={i * 120}>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-sky-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl shrink-0">{phase.icon}</div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-sky-500 mb-1">{phase.phase}</p>
                      <h3 className="font-black text-lg text-slate-900 mb-2">{phase.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12">
            <p className={eyebrow()}>Whole-House Installation FAQs</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Multi-Unit Questions </span><span className={title({ size: "sm", color: "brand" })}>Answered Clearly</span></h2>
          </div></Reveal>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {FAQS.map((faq, i) => (<Reveal key={i} delay={i * 50}><div className="px-6 py-6 sm:px-8"><h3 className="font-black text-slate-900 mb-2 text-base">{faq.q}</h3><p className="text-slate-600 leading-relaxed">{faq.a}</p></div></Reveal>))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Ready to Cool Your Entire Home?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Free site survey. Room-by-room BTU assessment. Volume pricing from RM 199/unit. Dedicated project team. 1-month warranty on every unit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 Whole-House — Final Booking\n\nHi KL Renovator, I want to book whole-house installation.\n\n📍 Area:\n🏠 Property Type:\n🔢 Number of Units:\n📅 Preferred Date:\n\nPlease confirm volume pricing & timeline.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Get Your Bulk Quote</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Call +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Serving all KL & Selangor areas — Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong, Klang, Damansara, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & more.</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/aircond-installation-kl" className="text-sm text-slate-500 hover:text-white transition-colors">← All Installation Services</Link>
              <Link href="/new-home-aircond-installation" className="text-sm text-slate-500 hover:text-white transition-colors">New Home Packages</Link>
              <Link href="/installation-price-malaysia" className="text-sm text-slate-500 hover:text-white transition-colors">Full Price Guide</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
