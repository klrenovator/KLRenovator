import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";

export const dynamic = "force-static";
import NextLink from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FiCheck, FiShield, FiCalendar, FiDroplet, FiTool, FiZap, FiClock, FiStar, FiChevronRight } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

const amcMsg = [
  "Hi KL Renovator, I am interested in an Annual Maintenance Contract (AMC) for my aircond unit(s).",
  "",
  "Number of units:",
  "Type: Wall-mounted / Ceiling Cassette / Window",
  "Location:",
  "",
  "Please share AMC pricing and available plans. Thank you!",
].join("\n");
const amcWaLink = waLink(amcMsg);

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Maintenance Contract (AMC) KL & Selangor — Yearly Plans from RM 299 | KL Renovator"),
  description: padMetaDescription("Annual aircond maintenance contract in KL & Selangor. Save 30% vs one-off. Quarterly servicing, priority scheduling, free checks. From RM 299/yr."),
  openGraph: {
    title: clampMetaTitle("Aircond Maintenance Contract (AMC) KL & Selangor | KL Renovator"),
    description: "Save up to 30% with annual aircond maintenance plans. Quarterly servicing, priority response, free diagnostics. From RM 299/year.",
    url: "https://www.klrenovator.com/services/maintenance-contract",
    type: "website", locale: "en_MY", alternateLocale: ["ms_MY", "zh_MY"],
    images: getServiceOGImages("maintenance-contract", "en"),
  },
  twitter: { card: "summary_large_image", title: clampMetaTitle("Aircond Maintenance Contract KL & Selangor | KL Renovator"), description: "Save up to 30% with annual plans. From RM 299/year.", images: ["https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp"] },
  alternates: {
    canonical: "https://www.klrenovator.com/services/maintenance-contract",
    languages: { "en-MY": "https://www.klrenovator.com/services/maintenance-contract", "ms-MY": "https://www.klrenovator.com/ms/services/maintenance-contract", "zh-MY": "https://www.klrenovator.com/zh/services/maintenance-contract", "x-default": "https://www.klrenovator.com/services/maintenance-contract" },
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.klrenovator.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.klrenovator.com/services" },
    { "@type": "ListItem", position: 3, name: "Aircond Maintenance Contract", item: "https://www.klrenovator.com/services/maintenance-contract" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Aircond Annual Maintenance Contract (AMC) KL & Selangor",
  description: padMetaDescription("Yearly maintenance plans with quarterly servicing, priority scheduling, and free diagnostics for residential and commercial aircond units across Klang Valley."),
  url: "https://www.klrenovator.com/services/maintenance-contract",
  provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: "KL Renovator", telephone: siteConfig.phone },
  areaServed: [{ "@type": "City", name: "Kuala Lumpur" }, { "@type": "State", name: "Selangor" }],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: 299, highPrice: 899, priceCurrency: "MYR",
    offerCount: 3,
    description: "Three AMC plans: Basic (RM 299/yr), Standard (RM 499/yr), Premium (RM 899/yr)",
    availability: "https://schema.org/InStock",
  },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is an aircond maintenance contract (AMC)?", acceptedAnswer: { "@type": "Answer", text: "An Annual Maintenance Contract (AMC) is a pre-paid yearly plan that covers scheduled aircond servicing at regular intervals. Instead of booking and paying each time, you pay once a year and we handle the rest — quarterly servicing, priority scheduling, free emergency checks, and discounted repairs. KL Renovator offers three AMC plans starting from RM 299/year for one wall-mounted unit." } },
    { "@type": "Question", name: "How much does an aircond AMC cost in KL & Selangor?", acceptedAnswer: { "@type": "Answer", text: "KL Renovator offers three AMC tiers: Basic (RM 299/year — 2 basic services + 1 chemical wash), Standard (RM 499/year — 2 basic services + 2 chemical washes + free emergency check), Premium (RM 899/year — 4 services + 2 chemical washes + 1 chemical overhaul + free emergency check + 15% repair discount). Multi-unit discounts available. All prices per wall-mounted 1.0–1.5 HP unit." } },
    { "@type": "Question", name: "Is an AMC worth it vs booking individually?", acceptedAnswer: { "@type": "Answer", text: "For most KL/Selangor homes running aircond 6+ hours daily: Yes. Individual bookings at standard prices would cost RM 288–384 for 2 basic services + RM 120 for a chemical wash = RM 408–504 total. The Basic AMC plan is RM 299 for the same — a 27–41% saving. Plus you get priority scheduling, free emergency checks, and locked-in pricing for the whole year." } },
    { "@type": "Question", name: "What happens if I have an emergency and I am on an AMC plan?", acceptedAnswer: { "@type": "Answer", text: "AMC customers get priority dispatch for emergencies. Standard and Premium plan holders also get one free emergency diagnostic check per year (normally RM 88). Even on the Basic plan, you jump the queue ahead of non-AMC bookings. WhatsApp your dedicated AMC contact number and we will dispatch the nearest technician." } },
    { "@type": "Question", name: "Can I cancel or transfer my AMC if I move?", acceptedAnswer: { "@type": "Answer", text: "Yes — if you move within our Klang Valley service area, the AMC transfers to your new address at no charge. If you move outside our coverage or sell the property, unused services can be refunded on a pro-rata basis. No lock-in penalty. We want long-term relationships, not trapped customers." } },
    { "@type": "Question", name: "Do you offer AMC for commercial premises with multiple units?", acceptedAnswer: { "@type": "Answer", text: "Yes — KL Renovator provides custom AMC plans for offices, retail shops, restaurants, clinics, and other commercial premises with 2–50+ aircond units. Volume discounts apply: 5% OFF Instant Booking Discount for 4–10 units, 10% OFF Instant Booking Discount for 10+ units. WhatsApp us your unit count and type for a custom commercial AMC proposal." } },
  ],
};

const plans = [
  { name: "Basic", price: "299", period: "/year", color: "bg-slate-700", border: "border-slate-300", badging: "Most Affordable", services: "3 visits/year", includes: ["2 Basic Servicing visits (RM 99 each value)", "1 Pressure Chemical Wash (RM 120 value)", "Priority scheduling over non-AMC", "Locked-in pricing for 12 months", "WhatsApp direct line for AMC customers"], icon: "\ud83d\udee1\ufe0f" },
  { name: "Standard", price: "499", period: "/year", color: "bg-sky-600", border: "border-sky-300", badging: "Best Value", services: "4 visits/year", includes: ["2 Basic Servicing visits", "2 Pressure Chemical Washes", "1 Free Emergency Diagnostic (RM 88 value)", "Priority scheduling + same-day response", "Locked-in pricing for 12 months", "10% off any additional repair labour"], icon: "\u2b50" },
  { name: "Premium", price: "899", period: "/year", color: "bg-amber-600", border: "border-amber-300", badging: "Maximum Protection", services: "7 visits/year", includes: ["4 Basic Servicing visits (quarterly)", "2 Pressure Chemical Washes", "1 Chemical Overhaul (RM 220 value)", "2 Free Emergency Diagnostics (RM 176 value)", "Priority + same-day + after-hours response", "15% off any additional repair labour", "Free gas pressure check on every visit"], icon: "\ud83d\udc51" },
];

const benefits = [
  { icon: "FiCalendar", title: clampMetaTitle("Never Forget a Service Again"), desc: "We schedule and remind you. Quarterly or biannual visits happen automatically — no need to track when your last service was." },
  { icon: "FiDroplet", title: clampMetaTitle("Save 27\u201341% vs One-Off Bookings"), desc: "AMC plans bundle services at a discounted rate. A Basic plan costs RM 299 vs RM 408+ if booked individually — you save RM 109+ per unit per year." },
  { icon: "FiShield", title: clampMetaTitle("Priority Emergency Response"), desc: "AMC customers skip the queue. Standard and Premium plans include free emergency diagnostics. All plans get priority dispatch over non-AMC callers." },
  { icon: "FiClock", title: clampMetaTitle("Locked-In Pricing for 12 Months"), desc: "Your price does not change for the contract year — even if our standard rates increase. Budget your aircond maintenance with certainty." },
  { icon: "FiStar", title: clampMetaTitle("Extended Equipment Lifespan"), desc: "Regular professional servicing extends your aircond lifespan by 3\u20135 years. An AMC ensures the servicing actually happens on schedule." },
  { icon: "FiZap", title: clampMetaTitle("Lower Electricity Bills"), desc: "A well-maintained aircond uses 15\u201325% less electricity. The AMC pays for itself partly through lower TNB bills, especially for units running 8+ hours daily." },
];

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  FiCalendar, FiDroplet, FiShield, FiClock, FiStar, FiZap,
};

export default function AMCPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <NextLink href="/" className="hover:text-sky-600 transition">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/services" className="hover:text-sky-600 transition">Services</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-semibold">Aircond Maintenance Contract</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 text-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Annual Maintenance Contract (AMC)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Save Up to 30% With an Annual Aircond Maintenance Plan
          </h1>
          <p className="text-sky-200 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            One yearly payment. Scheduled quarterly servicing. Priority emergency response. Never worry about your aircond again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
              <FaWhatsapp className="h-5 w-5" /> Get AMC Pricing
            </a>
            <a href={"tel:" + siteConfig.phone} className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm border border-white/20 transition-all">
              <FaPhone className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-sky-300">
            <span>\u2713 From RM 299/year</span><span>\u2713 All 20 Brands</span><span>\u2713 KL & Selangor</span><span>\u2713 No Lock-In Penalty</span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">AMC Plans</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Choose Your Maintenance Plan</h2>
            <p className="text-slate-500 text-sm mt-2">All prices per wall-mounted 1.0–1.5 HP unit. Multi-unit discounts available.</p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={"relative bg-white border-2 " + plan.border + " rounded-2xl p-6 sm:p-8 flex flex-col"}>
                {plan.badging && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">{plan.badging}</span>}
                <div className="text-center mb-6">
                  <span className="text-3xl mb-2 block">{plan.icon}</span>
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <div className="mt-3"><span className="text-4xl font-black text-slate-900">RM {plan.price}</span><span className="text-slate-500 text-sm">{plan.period}</span></div>
                  <p className="text-xs text-slate-500 mt-1 font-bold">{plan.services}</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm"><FiCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-600">{item}</span></li>
                  ))}
                </ul>
                <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className={"mt-6 block text-center " + plan.color + " hover:opacity-90 text-white font-black uppercase tracking-wider text-sm py-3.5 rounded-xl transition-all"}>
                  Choose {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">Why Choose an AMC</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">6 Reasons to Get a Maintenance Contract</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => {
              const IconComponent = iconMap[b.icon];
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  {IconComponent && <IconComponent className="h-8 w-8 text-sky-600 mb-3" />}
                  <h3 className="font-black text-slate-900 mb-1.5">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">How It Works</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-10">Get Covered in 3 Simple Steps</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: clampMetaTitle("Choose Your Plan"), desc: "Pick Basic, Standard, or Premium based on your unit count and usage. WhatsApp us if you need help choosing — we will recommend honestly based on your situation." },
              { step: "2", title: clampMetaTitle("We Schedule Your First Visit"), desc: "First service visit confirmed within 3–5 working days. We inspect your unit(s), perform the first service, and set the quarterly schedule for the year." },
              { step: "3", title: clampMetaTitle("Relax — We Handle the Rest"), desc: "Automatic reminders before each scheduled visit. Priority emergency response if anything goes wrong between visits. Annual renewal reminder 30 days before expiry." },
            ].map((s, i) => (
              <div key={i} className="flex gap-5 text-left items-start">
                <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white font-black text-lg">{s.step}</span>
                <div><h3 className="font-black text-slate-900 text-lg">{s.title}</h3><p className="text-slate-500 text-sm mt-1">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Maintenance Contract Questions</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-black text-slate-900 text-sm mb-2">{faq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-sky-700 to-slate-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Ready to Never Worry About Your Aircond Again?</h2>
          <p className="text-sky-200 mb-8 text-sm max-w-md mx-auto">Join 500+ Klang Valley customers who trust KL Renovator with their aircond maintenance. WhatsApp us now — we will recommend the right plan for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={amcWaLink} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider px-8 py-4 rounded-2xl text-sm shadow-xl transition-all">
              <FaWhatsapp className="h-5 w-5" /> Get My AMC Plan
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-sky-300">
            <span>\u2713 From RM 299/yr</span><span>\u2713 All Brands</span><span>\u2713 KL & Selangor</span><span>\u2713 No Lock-In</span>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-10 px-4 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Related Services</p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.services.filter((s: {slug: string}) => s.slug !== "maintenance-contract").map((s: {slug: string; title: string; startPrice: number}) => (
              <NextLink key={s.slug} href={"/services/" + s.slug} className="bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                {s.title} — from RM {s.startPrice}
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
