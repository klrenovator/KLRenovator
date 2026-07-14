"use client";

import { FaCheck, FaShield, FaClock, FaTruck, FaWrench, FaBolt, FaSnowflake, FaBuilding, FaLocationDot, FaPhone, FaCommentDots } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

interface InstallationCROModuleProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: "default" | "compact" | "sticky";
  showObjectionHandling?: boolean;
  showTrustSignals?: boolean;
  showPricingGuarantee?: boolean;
  showUSPBlock?: boolean;
  className?: string;
}

export function InstallationCROModule({
  title = "Why Choose KL Renovator for Installation?",
  subtitle = "Professional aircond installation from RM199 — same-day available, all 20 brands, 1-month workmanship warranty.",
  ctaText = "Get Confirmed Price on WhatsApp",
  ctaHref,
  variant = "default",
  showObjectionHandling = true,
  showTrustSignals = true,
  showPricingGuarantee = true,
  showUSPBlock = true,
  className = "",
}: InstallationCROModuleProps) {

  const defaultCtaHref = ctaHref || waLink(
    "🔧 Installation Quote Request\n\nHi KL Renovator, I want a confirmed price for aircond installation.\n\n📍 Area:\n❄️ Unit Type: Wall-Mounted / Ceiling Cassette / Window\n📏 HP Size:\n🏠 Property Type: Condo / Landed / Office / Shoplot\n\nPlease send full breakdown."
  );

  const trustSignals = [
    { icon: <FaCheck className="h-5 w-5" />, label: "Installation From RM 199", description: "Transparent pricing — no hidden fees" },
    { icon: <FaClock className="h-5 w-5" />, label: "Same-Day Available", description: "Book before 11 AM for same-day install" },
    { icon: <FaShield className="h-5 w-5" />, label: "1-Month Workmanship Warranty", description: "Written job card with checklist signed" },
    { icon: <FaTruck className="h-5 w-5" />, label: "All 20 Brands Supported", description: "Daikin, Panasonic, Mitsubishi & more" },
  ];

  const uspPoints = [
    { icon: <FaWrench className="h-5 w-5" />, title: "Vacuum Pump Every Job", description: "Mandatory 500-micron vacuum on every install. No exceptions. Protects your compressor for years." },
    { icon: <FaBolt className="h-5 w-5" />, title: "Type L Copper & Armaflex", description: "Premium copper piping with 9–13mm Armaflex insulation. No cheap thin-wall substitutes." },
    { icon: <FaShield className="h-5 w-5" />, title: "Dedicated Circuit & MCB", description: "Proper electrical per MS IEC 60364. Correct breaker sizing, earth leakage, isolator included." },
    { icon: <FaSnowflake className="h-5 w-5" />, title: "Precision Commissioning", description: "15-min run test: pressures, amp draw, thermostat calibration, cooling delta-T verified." },
    { icon: <FaBuilding className="h-5 w-5" />, title: "Written 1-Month Warranty", description: "Job card with checklist signed. Any install-related issue in 30 days — we return free." },
    { icon: <FaLocationDot className="h-5 w-5" />, title: "Condo & JMB Experts", description: "We handle building approvals, lift booking, service-ledge access, after-hours rules seamlessly." },
  ];

  const objectionHandling = [
    { 
      question: "What if my condo doesn't allow drilling?", 
      answer: "We coordinate with building management for JMB approval, use non-drill mounting brackets where permitted, and follow all building rules. 95% of condos we work with have approved installation methods." 
    },
    { 
      question: "What if the price changes after you arrive?", 
      answer: "Price is confirmed BEFORE we drill. Every extra material (copper pipe beyond 7ft, trunking, brackets) is quoted and approved by you on-site. No surprises — written guarantee." 
    },
    { 
      question: "What if there's a leak after installation?", 
      answer: "1-month workmanship warranty covers all installation-related leaks. Our vacuum pump + nitrogen pressure test catches 99% of issues before we leave. If a leak appears within 30 days, we return free." 
    },
    { 
      question: "What if my electrical panel can't handle a new AC?", 
      answer: "Our technician checks your DB capacity during the site survey. If a panel upgrade is needed, we quote it upfront — you decide before any work starts." 
    },
  ];

  const pricingGuarantee = [
    "✓ Site survey & quotation — FREE",
    "✓ 7 ft copper pipe (liquid + gas lines) — INCLUDED",
    "✓ 7 ft electrical wiring — INCLUDED", 
    "✓ 7 ft PVC drain pipe — INCLUDED",
    "✓ Standard outdoor bracket — INCLUDED",
    "✓ Vacuum pump commissioning — INCLUDED",
    "✓ Refrigerant release & testing — INCLUDED",
    "✓ 1-month workmanship warranty card — INCLUDED",
  ];

  const baseClass = "rounded-2xl bg-white border border-slate-200 shadow-sm";
  const variantClasses = {
    default: "p-6 sm:p-8",
    compact: "p-4",
    sticky: "p-4 sticky bottom-20 z-40 max-w-md mx-auto",
  };

  if (variant === "sticky") {
    return (
      <div className={`${baseClass} ${variantClasses[variant]} ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-lg text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">{subtitle}</p>
        <a
          href={defaultCtaHref}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="block w-full text-center bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-all"
        >
          <FaCommentDots className="h-4 w-4 inline-block mr-2" /> {ctaText}
        </a>
      </div>
    );
  }

  return (
    <section className={`${baseClass} ${variantClasses[variant]} ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 font-medium">{subtitle}</p>
        </div>

        {showTrustSignals && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {trustSignals.map((signal, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center group">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-500 text-white rounded-xl mx-auto mb-3 group-hover:bg-sky-600 transition-colors">
                  {signal.icon}
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">{signal.label}</h4>
                <p className="text-xs text-slate-500">{signal.description}</p>
              </div>
            ))}
          </div>
        )}

        {showPricingGuarantee && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
            <h3 className="font-black text-emerald-800 mb-4 flex items-center gap-2">
              <FaShield className="h-5 w-5" /> What's Included in the Labour Price
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-emerald-700">
              {pricingGuarantee.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheck className="h-4 w-4 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-emerald-600">All extras quoted & approved on-site BEFORE work starts. No surprises.</p>
          </div>
        )}

        {showObjectionHandling && (
          <div className="mb-8">
            <h3 className="font-black text-lg text-slate-900 mb-4 text-center">Common Questions — Answered Honestly</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {objectionHandling.map((obj, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                  <h4 className="font-black text-slate-900 mb-2">{obj.question}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{obj.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showUSPBlock && (
          <div className="mb-8">
            <h3 className="font-black text-lg text-slate-900 mb-6 text-center">Why KL Renovator for Installation?</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {uspPoints.map((usp, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center bg-sky-500 text-white rounded-xl mb-3">
                    {usp.icon}
                  </div>
                  <h4 className="font-black text-slate-900 mb-2">{usp.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{usp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-6 border-t border-slate-200">
          <a
            href={defaultCtaHref}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
          >
            <FaCommentDots className="h-5 w-5" /> {ctaText}
          </a>
          <p className="mt-4 text-xs text-slate-500">
            We serve all KL & Selangor areas — Petaling Jaya, Cheras, Ampang, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & more.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InstallationCROModule;