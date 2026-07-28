import Image from "next/image";
import NextLink from "next/link";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

import { waLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────
// Homepage installation spotlight.
//
// Audit finding: installation is the primary revenue service, but on the
// homepage it appeared only as one small card inside a "Popular Price
// Guides" strip roughly eight sections down the page. This block sits
// directly under the hero/stats so the highest-value service is visible
// without scrolling far, and links straight into the /installation hub.
//
// Server component — static content only.
// ─────────────────────────────────────────────────────────────────────────

const PRICE_ROWS = [
  { type: "Wall-Mounted", hp: "1.0 – 1.5 HP", price: "RM 199" },
  { type: "Wall-Mounted", hp: "2.0 HP", price: "RM 249" },
  { type: "Wall-Mounted", hp: "3.0 HP", price: "RM 329" },
  { type: "Ceiling Cassette", hp: "1.0 – 1.5 HP", price: "RM 290" },
  { type: "Window Unit", hp: "1.0 – 2.0 HP", price: "RM 180" },
] as const;

const INCLUDED = [
  "7 ft copper pipe + Armaflex insulation",
  "Electrical wiring & drain pipe",
  "Standard outdoor bracket",
  "Vacuum pump commissioning (500 microns)",
  "15-minute run & cooling test",
  "1-month written workmanship warranty",
] as const;

export function InstallationSpotlight() {
  const wa = waLink(
    "🔧 Aircond Installation Enquiry\n\nHi KL Renovator, I'd like a confirmed installation price.\n\n📍 Area:\n❄️ Unit type (wall-mounted / cassette / window):\n📏 HP size:\n🏠 Property (condo / landed / office):\n🔢 Number of units:\n\nThank you!",
  );

  return (
    <section
      id="installation"
      className="relative overflow-hidden border-y border-slate-100 bg-white px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Left: pitch + pricing ─────────────────────────────────── */}
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-sky-600">
              Our #1 Service
            </p>
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Aircond Installation <span className="text-sky-600">From RM 199</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Wall-mounted, ceiling cassette and window units for all 20 brands across Kuala Lumpur
              and Selangor. Every job includes mandatory vacuum pump commissioning — the step most
              cheap installers skip, and the one that protects your compressor and manufacturer
              warranty.
            </p>

            {/* Pricing table */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-[1.4fr_1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-600">
                <span>Unit Type</span>
                <span>Size</span>
                <span className="text-right">From</span>
              </div>
              {PRICE_ROWS.map((row) => (
                <div
                  key={`${row.type}-${row.hp}`}
                  className="grid grid-cols-[1.4fr_1fr_auto] gap-3 border-b border-slate-50 px-4 py-2.5 text-sm last:border-0"
                >
                  <span className="font-semibold text-slate-900">{row.type}</span>
                  <span className="text-slate-500">{row.hp}</span>
                  <span className="text-right font-black text-sky-600">{row.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Extra copper pipe beyond 7 ft is RM 17–27/ft depending on HP. All extras are quoted
              and approved on site before any drilling starts.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NextLink
                href="/installation"
                className="inline-flex flex-1 items-center justify-center gap-2 bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-[0.97]"
              >
                Explore Installation <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
              <a
                href={wa}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 bg-[#22c55e] px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#16a34a] active:scale-[0.97]"
              >
                <FaWhatsapp className="h-4 w-4" /> Get a Quote
              </a>
            </div>
          </div>

          {/* ── Right: photo + what's included ────────────────────────── */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/hero/aircond-installation-wall-mounted-kl.webp"
                alt="Professional wall-mounted aircond installation by KL Renovator in Kuala Lumpur"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                loading="lazy"
                decoding="async"
                quality={74}
                className="object-cover"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-emerald-700">
                Every Installation Includes
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <FaCheck className="mt-1 h-3 w-3 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links into the cluster */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/1hp-aircond-installation-kl", label: "1 HP" },
                { href: "/1.5hp-aircond-installation-kl", label: "1.5 HP" },
                { href: "/2hp-aircond-installation-kl", label: "2 HP" },
                { href: "/ceiling-cassette-aircond-installation-kl", label: "Cassette" },
                { href: "/commercial-aircond-installation", label: "Commercial" },
                { href: "/btu-calculator", label: "BTU Calculator" },
              ].map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600"
                >
                  {link.label}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
