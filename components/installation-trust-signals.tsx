"use client";

import { FaCheck, FaShield, FaClock, FaTruck, FaWrench, FaBolt, FaSnowflake, FaBuilding, FaLocationDot, FaAward, FaCertificate, FaUserCheck, FaHandshake, FaMagnifyingGlass, FaHouse } from "react-icons/fa6";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import NextLink from "next/link";
import { sitePublic } from "@/config/site-public";
import { waLink } from "@/lib/whatsapp";

interface InstallationTrustSignalsProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export function InstallationTrustSignals({
  variant = "default",
  className = "",
}: InstallationTrustSignalsProps) {

  const trustBadges = [
    { 
      icon: <FaShield className="h-5 w-5" />, 
      label: "1-Month Workmanship Warranty", 
      description: "Written job card with checklist. Any install-related issue in 30 days — we return free.",
      color: "emerald"
    },
    { 
      icon: <FaClock className="h-5 w-5" />, 
      label: "Same-Day Installation Available", 
      description: "Book before 11 AM for same-day service across KL & Selangor.",
      color: "sky"
    },
    { 
      icon: <FaAward className="h-5 w-5" />, 
      label: "Price Confirmed Before We Drill", 
      description: "Every extra material quoted & approved on-site BEFORE work starts. No surprises.",
      color: "amber"
    },
    { 
      icon: <FaCertificate className="h-5 w-5" />, 
      label: "Vacuum Pump Commissioning (Mandatory)", 
      description: "500-micron deep vacuum on every install. Protects compressor, prevents acid formation.",
      color: "violet"
    },
    { 
      icon: <FaWrench className="h-5 w-5" />, 
      label: "Type L Copper & Armaflex Insulation", 
      description: "Premium piping with 9-13mm closed-cell insulation. No cheap thin-wall substitutes.",
      color: "blue"
    },
    { 
      icon: <FaBolt className="h-5 w-5" />, 
      label: "Dedicated Circuit & Correct MCB", 
      description: "MS IEC 60364 compliant electrical. 16A/20A/32A breakers, earth leakage, isolator included.",
      color: "yellow"
    },
    { 
      icon: <FaBuilding className="h-5 w-5" />, 
      label: "Condo & JMB Experts", 
      description: "We handle building approvals, lift booking, service-ledge access, after-hours rules seamlessly.",
      color: "indigo"
    },
    { 
      icon: <FaSnowflake className="h-5 w-5" />, 
      label: "All 20 Major Brands Supported", 
      description: "Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Gree, Toshiba, Hisense, Aux, TCL, Isonic, National, Sanyo.",
      color: "cyan"
    },
    { 
      icon: <FaLocationDot className="h-5 w-5" />, 
      label: "Full KL & Selangor Coverage", 
      description: "Petaling Jaya, Cheras, Ampang, Subang, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Batu Caves, Putrajaya, Cyberjaya & more.",
      color: "emerald"
    },
    { 
      icon: <FaUserCheck className="h-5 w-5" />, 
      label: "500+ 5-Star Google Reviews", 
      description: "Trusted by 5,000+ Klang Valley customers. Real reviews from real installation jobs.",
      color: "amber"
    },
    { 
      icon: <FaHandshake className="h-5 w-5" />, 
      label: "SSM Registered Business", 
      description: "Multicore Dynamics Resources (003765188-T). Licensed, insured, professional HVAC contractors.",
      color: "blue"
    },
  ];

  const colorClasses = {
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    sky: "bg-sky-50 border-sky-100 text-sky-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    violet: "bg-violet-50 border-violet-100 text-violet-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-700",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    cyan: "bg-cyan-50 border-cyan-100 text-cyan-700",
  };

  const colorTextClasses = {
    emerald: "text-emerald-600",
    sky: "text-sky-600",
    amber: "text-amber-600",
    violet: "text-violet-600",
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    indigo: "text-indigo-600",
    cyan: "text-cyan-600",
  };

  if (variant === "compact") {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {trustBadges.slice(0, 8).map((badge, i) => (
          <div key={i} className={`p-4 rounded-xl border ${colorClasses[badge.color as keyof typeof colorClasses]} hover:shadow-md transition-all`}>
            <div className="flex items-start gap-3">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[badge.color as keyof typeof colorClasses].replace("bg-", "bg-").replace("text-", "text-")}`}>
                {badge.icon}
              </div>
              <div>
                <h4 className={`font-black text-sm ${colorTextClasses[badge.color as keyof typeof colorTextClasses]}`}>{badge.label}</h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{badge.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {trustBadges.map((badge, i) => (
          <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-full ${colorClasses[badge.color as keyof typeof colorClasses]} hover:shadow-md transition-all`}>
            <span className="h-3 w-3">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <section className={`py-16 sm:py-20 bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">Why Trust KL Renovator for Installation?</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            12 Reasons Customers Choose Us as Their <span className="text-sky-500">Installation Specialists</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto">
            From vacuum pump commissioning to condo JMB coordination — every detail handled professionally.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trustBadges.map((badge, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className={`p-6 rounded-2xl border ${colorClasses[badge.color as keyof typeof colorClasses]} hover:shadow-xl hover:border-transparent transition-all duration-300 h-full`}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4">
                  {badge.icon}
                </div>
                <h3 className={`font-black text-lg ${colorTextClasses[badge.color as keyof typeof colorTextClasses]} mb-2`}>{badge.label}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{badge.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Reveal delay={200}>
            <h3 className="font-black text-xl mb-4">Ready for Professional Installation?</h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">Same-day slots available across KL & Selangor. Transparent pricing from RM 199. 1-month workmanship warranty. All 20 brands.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={waLink("🔧 Installation Quote Request\n\nHi KL Renovator, I want a confirmed price for aircond installation.\n\n📍 Area:\n❄️ Unit Type:\n📏 HP Size:\n🏠 Property Type:\n\nPlease send full breakdown.")} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FiArrowRight className="h-4 w-4" /> Get Confirmed Price on WhatsApp
              </a>
              <a href={`tel:${sitePublic.phone}`} className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl">
                <FiPhone className="h-4 w-4" /> Call +60 18-298 3573
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="animate-[fade-up_0.6s_ease-out_both]">
      {children}
    </div>
  );
}

export default InstallationTrustSignals;