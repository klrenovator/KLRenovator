import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFreshMetaTitle } from "@/lib/seo-title-optimizer";
import { buildTrilingualHreflang } from "@/lib/hreflang-canonical";
import { getServiceOGImages } from "@/config/service-og-images";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import NextLink from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { buildServiceSchema } from "@/lib/seo";
import { PriceComparisonUI } from "@/components/price-comparison";
import { ToolLinks } from "@/components/calculators/tool-links";

export const dynamic = "force-static";

const waMsg = "Hi KL Renovator, I'd like to book Aircond Chemical Wash KL. My location KL/Selangor. Thanks!";
const waHref = waLink(waMsg);

export const metadata: Metadata = {
  title: buildFreshMetaTitle("Cuci Aircond KL & Selangor 2026 — Chemical Wash RM120 | KL Renovator", "en"),
  // This is the ENGLISH page — it previously shipped the identical Malay
  // description as /ms/cuci-aircond-kl, so Google saw two URLs with the same
  // snippet and had to pick one. The page body is already English; only the
  // meta description was copied from the Malay twin.
  description:
    padMetaDescription("Aircond chemical wash KL & Selangor from RM120. Same-day slots, 80–120 PSI deep coil clean, 500+ 5★ Google reviews. Fixes musty smell, leaks & weak cooling."),
  alternates: buildTrilingualHreflang("/cuci-aircond-kl"),
  openGraph: {
    title: buildFreshMetaTitle("Cuci Aircond KL — RM120 | KL Renovator", "en"),
    url: "https://www.klrenovator.com/cuci-aircond-kl",
    images: getServiceOGImages("chemical-wash", "en"),
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: getServiceOGImages("chemical-wash", "en"),
  },
};

const pricing = [
  { label: "Wall-Mounted 1.0–1.5 HP", price: "RM 120" },
  { label: "Wall-Mounted 2.0–2.5 HP", price: "RM 150" },
  { label: "Wall-Mounted 3.0 HP", price: "RM 180" },
  { label: "Ceiling Cassette 1.0–1.5 HP", price: "RM 220" },
  { label: "Ceiling Cassette 2.0–3.0 HP", price: "RM 280" },
];

const faqs = [
  { q: "How much is aircond chemical wash in KL 2026?", a: "RM120 for wall-mounted 1.0–1.5 HP. 2.0–2.5 HP RM150. 3.0 HP RM180. Cassette from RM220. Price confirmed before work. Multi-unit: 5% OFF Instant Booking Discount for 4–10 units, 10% OFF Instant Booking Discount for 10+ units." },
  { q: "Do you cover all KL & Selangor?", a: "Yes — entire Klang Valley: Kuala Lumpur, Petaling Jaya, Subang Jaya, Shah Alam, Klang, Puchong, Cheras, Ampang, Kajang, Damansara, Bangsar, Mont Kiara, Kepong, Setapak, Gombak, Selayang, Rawang, Seri Kembangan. Same-day Mon–Sun." },
  { q: "Chemical wash vs basic service?", a: "Basic RM99 = surface clean. Chemical wash RM120 = 80–120 PSI pressure chemical penetrates coil fins & blower, dissolves mould/biofilm. Smell / weak airflow / 12+ months no deep clean = chemical wash." },
  { q: "Will chemical wash stop water leaking?", a: "Usually yes if drain is biofilm-clogged. If leak persists, drain pan may be cracked — needs chemical overhaul RM220. We check honestly on site." },
  { q: "How long per unit?", a: "60–75 minutes wall-mounted 1.0–1.5 HP. Unit stays mounted. Use immediately after." },
  { q: "Is the chemical safe?", a: "Yes. Food-grade alkaline, biodegradable, phosphate-free. No toxic fumes. Fully rinsed. Safe immediately." },
  { q: "Same-day booking available?", a: "Yes. WhatsApp +60182983573. We confirm nearest slot in minutes. Mon–Sun 9am–10pm." },
];

export default function Page() {
  const schema = buildServiceSchema({
    slug: "chemical-wash",
    name: "Aircond Chemical Wash KL & Selangor",
    description: "Aircond chemical wash KL RM120. Same-day Klang Valley. 500+ 5-star reviews.",
    startPrice: 120,
    locale: "en",
    priceTable: pricing,
    pricingName: "Aircond Chemical Wash KL Pricing",
    priceDescription: "From RM120"
  });
  const serviceSchema = { ...schema, "@id": "https://www.klrenovator.com/cuci-aircond-kl#service", url: "https://www.klrenovator.com/cuci-aircond-kl", inLanguage: "en-MY" };
  const faqSchema = { "@context":"https://schema.org","@type":"FAQPage", mainEntity: faqs.map(f=>({ "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a }})) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}/>

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1">
          <NextLink href="/" className="hover:text-sky-600">Home</NextLink><FiChevronRight className="h-3 w-3"/>
          <span className="text-slate-900 font-bold">Aircond Chemical Wash KL</span>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-sky-700">Aircond Chemical Wash KL • 2026</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">Aircond Chemical Wash KL &amp; Selangor — <span className="text-sky-600">RM120</span></h1>
            <p className="mt-4 text-lg text-slate-700 max-w-xl">High-pressure 80–120 PSI chemical wash. Eliminate smell, leaking, weak airflow. Same-day Klang Valley. <strong>500+ 5★ Google</strong>. 1-month workmanship warranty.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22c55e] px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"><FaWhatsapp className="h-5 w-5"/> WhatsApp Book Now</a>
              <a href="tel:+60182983573" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 px-7 py-4 text-sm font-black uppercase tracking-wider text-slate-900 hover:bg-slate-900 hover:text-white"><FaPhone className="h-4 w-4"/> +60182983573</a>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-widest text-sky-600">Pricing 2026</p>
            <h2 className="mt-1 text-xl font-black">Aircond Chemical Wash KL</h2>
            <ul className="mt-4 divide-y divide-slate-100 border rounded-2xl overflow-hidden">
              {pricing.map(p=><li key={p.label} className="flex justify-between px-4 py-3 text-sm"><span className="text-slate-700">{p.label}</span><span className="font-black text-sky-700">{p.price}</span></li>)}
            </ul>
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="mt-4 block text-center rounded-xl bg-slate-950 text-white py-3 text-xs font-black uppercase tracking-wider">Get Same-Day Slot →</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-[15px] leading-relaxed text-slate-700 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">Aircond Chemical Wash KL — Klang Valley’s #1</h2>
          <p>Searching <strong>“aircond chemical wash KL”</strong>, <strong>“aircond service KL”</strong>, <strong>“cuci aircond KL”</strong>? You’re in the right place. KL Renovator — <strong>500+ 5-star Google reviews</strong>, SSM registered, transparent pricing from <strong>RM120</strong>. We deliver true <strong>80–120 PSI high-pressure chemical wash</strong> — food-grade alkaline dissolves biofilm, mould, and KL road dust deep inside your coil & blower wheel.</p>
          <p>Daily KL issues we fix: <em>not cold</em>, <em>water leaking</em>, <em>musty smell</em>, <em>weak airflow</em>, <em>high TNB bill</em>. 60–75 min per unit, stays mounted, use immediately. Full coverage: <strong>KLCC, Bangsar, Mont Kiara, Damansara, PJ, Subang Jaya, Shah Alam, Klang, Puchong, Cheras, Ampang, Kajang, Kepong, Setapak, Gombak, Rawang</strong> — all Klang Valley. WhatsApp now — <strong>same-day</strong> slots.</p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-950">Aircond Chemical Wash KL — FAQ</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f,i)=>(
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">{f.q}<FiChevronRight className="h-4 w-4 text-sky-600 transition group-open:rotate-90"/></summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={waHref} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#22c55e] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg hover:bg-[#16a34a]"><FaWhatsapp className="h-5 w-5"/> Book Chemical Wash KL Now</a>
          </div>
        </div>
      </section>
      {/* Free calculator tools — internal linking */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ToolLinks />
        </div>
      </section>
      <PriceComparisonUI locale="en" />
    </>
  );
}
