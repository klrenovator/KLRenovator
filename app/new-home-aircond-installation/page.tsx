import { Metadata } from "next";
import { FaWhatsapp, FaCheck, FaShield, FaClipboardList, FaBolt, FaKey, FaPhone, FaBuilding } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { title, eyebrow } from "@/components/primitives";
import { InstallationTrustSignals } from "@/components/installation-trust-signals";

export const metadata: Metadata = {
  title: "New Home Aircond Installation KL & Selangor — Whole-House Packages | KL Renovator",
  description: "Moving into a new home in KL or Selangor? Complete aircond installation packages for 1BR, 2BR, 3BR & 4BR homes. From RM199/unit. Same-day, transparent pricing, 1-month warranty. WhatsApp +60182983573",
  openGraph: {
    title: "New Home Aircond Installation KL & Selangor — Whole-House Packages | KL Renovator",
    description: "Moving into a new home? Complete aircond installation packages for 1BR–4BR homes. From RM199/unit, same-day, 1-month warranty. WhatsApp +60182983573",
    type: "website", locale: "en_MY",
    url: "https://www.klrenovator.com/new-home-aircond-installation",
    siteName: "KL Renovator",
    images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: "New Home Aircond Installation KL Selangor" }],
  },
  twitter: { card: "summary_large_image", title: "New Home Aircond Installation KL & Selangor — Whole-House Packages | KL Renovator", description: "Complete aircond installation for new homes. 1BR–4BR packages, condo & landed expertise, 48-hour timeline. WhatsApp +60182983573", images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"] },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.klrenovator.com/new-home-aircond-installation", languages: { "en-MY": "https://www.klrenovator.com/new-home-aircond-installation", "ms-MY": "https://www.klrenovator.com/ms/pemasangan-aircond-rumah-baru", "zh-MY": "https://www.klrenovator.com/zh/new-home-aircond-installation", "x-default": "https://www.klrenovator.com/new-home-aircond-installation" } },
};

const PACKAGES = [
  { name: "1 Bedroom (Studio / 1BR)", subtitle: "Perfect for studio apartments & 1-bedroom condos", price: "RM 199", includes: ["1× wall-mounted aircond (1.0–1.5 HP)", "7 ft copper pipe, wiring, drain pipe", "Standard outdoor bracket", "Vacuum pump commissioning", "1-month workmanship warranty"], badge: "Most Popular for Singles & Couples" },
  { name: "2 Bedroom (2BR)", subtitle: "Ideal for 2-bedroom condos & apartments", price: "RM 398", includes: ["2× wall-mounted aircond (1.0–1.5 HP each)", "7 ft copper pipe, wiring, drain pipe ×2", "Standard outdoor brackets ×2", "Vacuum pump commissioning ×2", "1-month workmanship warranty"], badge: "Best Value for Small Families", highlight: true },
  { name: "3 Bedroom (3BR)", subtitle: "Complete cooling for 3-bedroom landed homes & condos", price: "RM 597", includes: ["3× wall-mounted aircond (1.0–2.0 HP as needed)", "7 ft copper pipe, wiring, drain pipe ×3", "Standard outdoor brackets ×3", "Vacuum pump commissioning ×3", "1-month workmanship warranty", "Free site survey & electrical load check"], badge: "Whole-Home Coverage" },
  { name: "4 Bedroom (4BR+)", subtitle: "Full-house cooling for larger landed homes & semi-D", price: "From RM 796", includes: ["4+× wall-mounted aircond (mixed HP sizes)", "7 ft copper pipe, wiring, drain pipe per unit", "Heavy-duty brackets where needed", "Vacuum pump commissioning on every unit", "1-month workmanship warranty", "Free site survey + DB box assessment", "Priority scheduling — complete in 1 day"], badge: "Complete Home Solution" },
];

const CONDO_VS_LANDED = [
  { aspect: "Outdoor Unit Placement", condo: "Service ledge or balcony — building management rules apply. May require JMB approval for drilling locations.", landed: "Ground-level bracket or wall-mounted. More flexibility in placement — fewer access restrictions." },
  { aspect: "Copper Pipe Length", condo: "Typically 7–15 ft depending on indoor-outdoor distance. Longer runs charged at RM 17–27/ft.", landed: "Usually 7–12 ft for wall-mounted. Longer runs only if indoor unit is upstairs from ground-level compressor." },
  { aspect: "Electrical Circuit", condo: "Existing DB box checked. Some older condos may need circuit upgrade (quoted upfront before work).", landed: "Newer homes usually have spare MCB slots. Older landed homes may need DB box assessment for additional circuits." },
  { aspect: "Access & Timing", condo: "Lift booking, security registration, loading bay reservation needed. We coordinate — recommend weekday morning slots.", landed: "Direct access. More flexible scheduling. Weekend slots available. Faster overall timeline." },
  { aspect: "JMB/Management Approval", condo: "Required for most condos. We prepare installation plan for JMB review. Approval typically takes 3–7 working days.", landed: "No JMB approval needed for individual landed properties. Immediate installation possible." },
];

const JMB_STEPS = [
  { step: 1, title: "Submit Installation Plan", desc: "We prepare a simple diagram showing outdoor unit location, bracket type, and pipe route. You submit to JMB/management office (or we help coordinate directly)." },
  { step: 2, title: "JMB Review (3–7 Working Days)", desc: "Management reviews against building bylaws. Most standard wall-mounted installations are approved without issues. Ceiling cassette may need additional structural sign-off." },
  { step: 3, title: "Approval & Scheduling", desc: "Once approved, we book lift/loading bay access and confirm installation date. We handle all building coordination on your behalf so you don't have to." },
];

const FAQS = [
  { q: "How much does whole-house aircond installation cost for a new home in KL?", a: "A 2BR condo package (2 units) costs RM 398, a 3BR package (3 units) costs RM 597, and a 4BR+ package starts from RM 796. Each unit includes 7 ft copper pipe, wiring, drain pipe, bracket, vacuum pump commissioning, and 1-month workmanship warranty. Extra materials beyond 7 ft are quoted and approved on-site before work starts. All prices confirmed upfront — no hidden fees." },
  { q: "How long does new home aircond installation take?", a: "1BR (1 unit): 3–5 hours. 2BR (2 units): 5–8 hours. 3BR (3 units): 1 day. 4BR+ (4+ units): 1–2 days. We can often complete same-day for 1–3 unit installations when booked before 11 AM. Whole-house installations are scheduled in advance with priority timing." },
  { q: "Do I need JMB approval for condo aircond installation?", a: "Yes — most condos in KL & Selangor require JMB/management approval before drilling or mounting outdoor units. We prepare a simple installation plan that you submit. Approval typically takes 3–7 working days. Our team can help coordinate with building management directly." },
  { q: "What's the difference between condo and landed house installation?", a: "Condos need JMB approval, lift/loading bay booking, and may have service-ledge restrictions. Landed homes have more flexibility in outdoor unit placement and typically faster scheduling. Both use the same quality materials (Type L copper, Armaflex insulation, dedicated circuit). Pricing is the same for wall-mounted units." },
  { q: "Can you install before I move in — the house is empty?", a: "Yes — this is actually ideal. Empty homes allow unrestricted access for piping, drilling, and outdoor unit placement. Many new homeowners book us 1–2 weeks before moving in. We will coordinate with your contractor or renovation schedule if renovations are still ongoing." },
  { q: "What if my new home's electrical panel can't handle extra aircond units?", a: "Our technician checks your DB box capacity during the free site survey. If upgrades are needed, we quote the electrical work upfront. Most newer homes (post-2015) have spare capacity. Older homes may need a minor panel upgrade — typically RM 100–300 depending on scope." },
  { q: "Do you offer volume discounts for multiple units?", a: "Yes — our package pricing bundles multiple units into one convenient booking. For 5+ units or commercial projects, WhatsApp us for a custom quote — additional discounts available for larger installations across KL & Selangor." },
  { q: "Which aircond brands do you recommend for new homes near me in KL?", a: "Daikin and Panasonic are the most trusted for new homes in Malaysia — reliable, energy-efficient, with strong local parts availability. Mitsubishi and Midea offer great value. As installation specialists near you, we install all 20 brands and can recommend based on your room sizes, budget, and energy-saving preferences during the free site survey." },
];

export default function NewHomeInstallationPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.klrenovator.com" },
    { name: "Aircond Installation KL & Selangor", url: "https://www.klrenovator.com/aircond-installation-kl" },
    { name: "New Home Aircond Installation", url: "https://www.klrenovator.com/new-home-aircond-installation" },
  ]);
  const faqSchema = buildFaqSchema(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image src="/hero/aircond-installation-kuala-lumpur.webp" alt="New home aircond installation package Kuala Lumpur Selangor" fill priority sizes="100vw" className="object-cover object-center opacity-40" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">New Homeowner Installation Specialists</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] max-w-3xl">Moving Into a New Home?<br /><span className="text-emerald-400">Complete Aircond Installation Package</span></h1>
            <p className="mt-5 text-slate-300 font-medium text-base sm:text-lg leading-relaxed max-w-2xl">Whole-house aircond installation for new homes, condos, and landed properties across KL & Selangor. Package pricing, same-day available, 1-month workmanship warranty. From booking to cool comfort in 48 hours.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Package Pricing from RM 199/unit</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />48-Hour Timeline Available</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-sm font-black uppercase tracking-wider text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Free Site Survey</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
              <a href={waLink("🏠 New Home Installation Enquiry\n\nHi KL Renovator, I'm moving into a new home and need aircond installation.\n\n📍 Area:\n🏠 Home Type: Condo / Landed\n🛏️ Bedrooms:\n📅 Move-In Date:\n\nPlease send package pricing & available slots.")} target="_blank" rel="nofollow noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase text-sm tracking-widest h-14 px-6 shadow-lg shadow-green-900/40 transition-all"><FaWhatsapp className="h-5 w-5" /> Get Package Quote on WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className="flex-1 inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white font-black uppercase text-sm tracking-widest h-14 px-6 transition-all"><FaPhone className="h-4 w-4 text-sky-300" /> Call +60 18-298 3573</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Package Pricing */}
      <section className="py-20 sm:py-28 bg-slate-50" id="packages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>New Home Installation Packages</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Whole-House Pricing — </span><span className={title({ size: "sm", color: "brand" })}>Bundle & Save</span></h2>
            <p className="mt-4 text-slate-600 font-medium">One booking covers your entire home. Transparent per-unit pricing, no hidden fees.</p>
          </div></Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div className={`relative bg-white border-2 rounded-2xl p-6 sm:p-8 h-full flex flex-col ${pkg.highlight ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-slate-200 hover:border-sky-300 hover:shadow-md"} transition-all`}>
                  {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">Best Value</div>}
                  {pkg.badge && !pkg.highlight && <div className="inline-flex self-start bg-sky-50 border border-sky-100 text-sky-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">{pkg.badge}</div>}
                  <div className="mb-4"><h3 className="font-black text-xl text-slate-900 mb-1">{pkg.name}</h3><p className="text-slate-500 text-sm">{pkg.subtitle}</p></div>
                  <div className="mb-4"><span className="text-3xl font-black text-sky-600">{pkg.price}</span><span className="text-slate-400 text-sm ml-1">total labour</span></div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-5 flex-1">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">What's Included</p>
                    <ul className="space-y-2">{pkg.includes.map((item: string, j: number) => (<li key={j} className="flex items-start gap-2 text-sm text-slate-700"><FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
                  </div>
                  <a href={waLink("🏠 Package Enquiry\n\nHi KL Renovator, I want the " + pkg.name + " installation package.\n\n📍 My Area:\n🏠 Home Type: Condo / Landed\n📅 Preferred Date:\n\nPlease confirm pricing & availability.")} target="_blank" rel="nofollow noopener noreferrer" className={`inline-flex items-center justify-center gap-2 w-full font-black uppercase text-sm tracking-widest h-12 px-6 rounded-xl transition-all ${pkg.highlight ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-sky-600 hover:bg-sky-700 text-white"}`}><FaWhatsapp className="h-4 w-4" /> Select {pkg.name.split(" ")[0]} Package</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
              <p className="font-black text-amber-800 text-sm mb-1">5+ Units? Commercial Project?</p>
              <p className="text-amber-700 text-sm">WhatsApp us for a custom multi-unit quote — additional volume discounts available for larger installations across KL & Selangor.</p>
              <a href={waLink("🏢 Multi-Unit Enquiry\n\nHi KL Renovator, I need a custom quote for multiple aircond units.\n\n📍 Location:\n🔢 Number of Units:\n🏠 Property Type:\n\nPlease send custom pricing & timeline.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 mt-3 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl transition-all"><FaWhatsapp className="h-4 w-4" /> Request Custom Quote</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 bg-white" id="whats-included">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>What's Included in Every Package</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Professional Installation — </span><span className={title({ size: "sm", color: "brand" })}>No Shortcuts</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Every package includes these five steps as standard. No hidden charges, no skipped procedures.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaCheck className="h-5 w-5" />, title: "Site Survey & Consultation", desc: "Our technician visits your new home to assess room sizes, BTU requirements, piping routes, outdoor unit placement, and electrical capacity. Free — no obligation." },
              { icon: <FaBolt className="h-5 w-5" />, title: "Electrical Load Check", desc: "We verify your DB box can handle additional aircond circuits. If upgrades needed, we quote upfront before any work starts." },
              { icon: <FaClipboardList className="h-5 w-5" />, title: "Material Specification", desc: "Type L copper piping, Armaflex 9–13mm insulation, 2.5mm²/4mm² wiring per Malaysian standards. Every material confirmed with you before work." },
              { icon: <FaShield className="h-5 w-5" />, title: "Vacuum Pump Commissioning", desc: "500-micron deep vacuum on every single unit. Mandatory — protects compressor, prevents acid formation, keeps manufacturer warranty valid." },
              { icon: <FaKey className="h-5 w-5" />, title: "Handover & Warranty Card", desc: "Signed job card with installation checklist. Written 1-month workmanship warranty. All manufacturer warranties protected with proof of professional install." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all h-full">
                  <div className="inline-flex p-3 bg-sky-50 border border-sky-100 text-sky-600 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condo vs Landed */}
      <section className="py-20 sm:py-28 bg-slate-50" id="condo-vs-landed">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Condo vs Landed — What's Different?</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Installation Specialists for </span><span className={title({ size: "sm", color: "brand" })}>Both Property Types</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Different rules, same quality. Our technicians are experienced in both high-rise condos and landed homes across KL & Selangor.</p>
          </div></Reveal>
          <Reveal delay={100}>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-0">
                  <div className="bg-slate-50 px-6 py-4 font-black text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Aspect</div>
                  <div className="bg-sky-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-sky-500">🏢 Condo / Apartment</div>
                  <div className="bg-emerald-600 text-white px-6 py-4 font-black text-sm uppercase tracking-wider border-b border-emerald-500">🏠 Landed Home</div>
                  {CONDO_VS_LANDED.map((row, i) => (
                    <div key={i} className="contents">
                      <div className={`px-6 py-4 font-black text-slate-700 text-sm border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.aspect}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.condo}</div>
                      <div className={`px-6 py-4 text-sm text-slate-600 leading-relaxed border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>{row.landed}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JMB Approval Guide */}
      <section className="py-20 sm:py-28 bg-white" id="jmb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow()}>Condo Installation — JMB Approval Guide</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>We Handle Building </span><span className={title({ size: "sm", color: "brand" })}>Coordination for You</span></h2>
            <p className="mt-4 text-slate-600 font-medium">Most condos in KL & Selangor require JMB/management approval. Our team navigates this smoothly.</p>
          </div></Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {JMB_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 pt-10 h-full">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-lg">{step.step}</div>
                  <h3 className="font-black text-slate-900 mb-2 mt-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <h3 className="font-black text-sky-800 mb-3 flex items-center gap-2"><FaBuilding className="h-5 w-5" /> Condo Installation Experts Near You</h3>
              <p className="text-sky-700 text-sm leading-relaxed mb-4">As the most trusted installation specialists for condos across KLCC, Mont Kiara, Bangsar, Sentul, PJ, Subang Jaya, and beyond — we've navigated JMB approvals for hundreds of units across Klang Valley.</p>
              <p className="text-sky-700 text-sm leading-relaxed">Tip: Book your site survey <strong>2 weeks before moving in</strong> to allow time for JMB approval + installation. For landed homes, 48 hours is typically enough.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-emerald-600 text-white" id="timeline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100 mb-4">From Booking to Cool Comfort</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Cool Air in 48 Hours — Guaranteed</h2>
            <p className="mt-4 text-emerald-100 font-medium">Our streamlined new-home process gets you from booking to fully installed cooling in just 2 days.</p>
          </div></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { step: "Day 1 AM", icon: <FaWhatsapp className="h-6 w-6" />, title: "WhatsApp Booking", desc: "Send your new home details — area, home type, number of rooms. We confirm package price and schedule site survey within hours." },
              { step: "Day 1 PM", icon: <FaClipboardList className="h-6 w-6" />, title: "Site Survey & Quote", desc: "Technician visits your new home. Assesses BTU needs, piping routes, electrical. Final quote confirmed on-site — free, no obligation." },
              { step: "Day 2 AM", icon: <FaBolt className="h-6 w-6" />, title: "Installation Day", desc: "Team arrives with all materials. Multiple units installed in sequence. Drop sheets protect your floors. Copper piping, vacuum, testing per unit." },
              { step: "Day 2 PM", icon: <FaShield className="h-6 w-6" />, title: "Handover & Warranty", desc: "All units tested. Cooling confirmed. Job cards signed. 1-month written workmanship warranty handed over. You walk into a cool new home." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">{item.icon}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-200 mb-2">{item.step}</p>
                  <h3 className="font-black text-lg mb-2">{item.title}</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={500}>
            <div className="mt-12 text-center">
              <p className="text-emerald-100 text-sm mb-4">*48-hour timeline applies to landed homes and condos with pre-approved JMB. Condos needing new JMB approval: add 3–7 working days.</p>
              <a href={waLink("🏠 Book New Home Installation — 48 Hour Timeline\n\nHi KL Renovator, I want to book new home installation with the 48-hour timeline.\n\n📍 Area:\n🏠 Home Type:\n🛏️ Bedrooms:\n📅 Preferred Start Date:\n\nPlease confirm availability & pricing.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-black uppercase text-sm tracking-widest px-8 py-4 rounded-xl transition-all"><FaWhatsapp className="h-5 w-5" /> Start My 48-Hour Timeline</a>
            </div>
          </Reveal>
        </div>
      </section>

      <InstallationTrustSignals variant="default" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal><div className="text-center mb-12">
            <p className={eyebrow()}>New Home Installation FAQs</p>
            <h2 className="mt-3"><span className={title({ size: "sm" })}>Common Questions </span><span className={title({ size: "sm", color: "brand" })}>Answered Honestly</span></h2>
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
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">Moving In Soon? Let's Get Your Aircond Sorted.</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">Free site survey. Package pricing from RM 199/unit. 48-hour timeline available. 1-month workmanship warranty. All 20 brands.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🏠 New Home Installation — Final Booking\n\nHi KL Renovator, I'm ready to book new home installation.\n\n📍 Area:\n🏠 Home Type: Condo / Landed\n🛏️ Bedrooms:\n📅 Preferred Date:\n\nPlease confirm my package & slot.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaWhatsapp className="h-5 w-5" /> Book via WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"><FaPhone className="h-4 w-4" /> Call +60 18-298 3573</a>
            </div>
            <p className="mt-6 text-slate-500 text-sm">Serving all KL & Selangor areas — Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Puchong, Klang, Damansara, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & more.</p>
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center gap-4">
              <Link href="/aircond-installation-kl" className="text-sm text-slate-400 hover:text-white transition-colors">← All Installation Services</Link>
              <Link href="/installation-price-malaysia" className="text-sm text-slate-400 hover:text-white transition-colors">Full Price Guide</Link>
              <Link href="/faq" className="text-sm text-slate-400 hover:text-white transition-colors">More FAQs</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
