import {
  ShieldCheck,
  Clock,
  Star,
  Wrench,
  Award,
  CheckCircle2,
  MessageCircle,
  Phone,
  Snowflake,
  ThumbsUp,
  Users,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

/**
 * Hero v3 — conversion-focused, centred, solid-color layout.
 * Strategy: one strong headline, one price anchor, two big CTAs,
 * trust strip, and a full-width stat band. No gradients, no SVG
 * illustrations; every piece renders cleanly on any device.
 */
export const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle dot pattern — adds depth without colour gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(37 99 235 / 0.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 sm:pb-24">
        {/* Top social-proof badge */}
        <Reveal>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-1.5 shadow-sm">
              <div className="flex -space-x-2">
                {["A", "M", "L"].map((l, i) => (
                  <span
                    key={l}
                    className={
                      "inline-flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 text-[10px] font-bold text-white " +
                      ["bg-brand-600", "bg-brand-700", "bg-sky-500"][i]
                    }
                  >
                    {l}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Trusted by <span className="text-brand-600 dark:text-brand-400">5,000+</span> homes in KL &amp; Selangor
              </span>
            </div>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={80}>
          <h1 className="mt-6 text-center mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
            Aircon service you can{" "}
            <span className="relative whitespace-nowrap text-brand-600 dark:text-brand-400">
              trust today
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-2 bg-brand-200/70 dark:bg-brand-700/50 -z-10 rounded"
              />
            </span>
            <br />
            at transparent prices.
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal delay={140}>
          <p className="mt-5 text-center mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Licensed technicians for chemical wash, installation, repair &amp;
            gas top-up — across Kuala Lumpur &amp; Selangor. Get a firm quote on
            WhatsApp in 30 seconds.
          </p>
        </Reveal>

        {/* CTAs — BOTH BLUE */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href={waLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/30 hover:scale-[1.02] active:scale-95 transition"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" />
              Get WhatsApp Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-slate-900/20 active:scale-95 transition"
            >
              <Phone className="h-5 w-5" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        {/* Reassurance row */}
        <Reveal delay={260}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-700 dark:text-slate-300">
            {[
              { icon: CheckCircle2, t: "Same-day booking" },
              { icon: CheckCircle2, t: "No hidden fees" },
              { icon: CheckCircle2, t: "1-year workmanship warranty" },
            ].map(({ icon: Icon, t }) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span className="font-medium">{t}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Feature card row (4 big white cards) */}
        <Reveal delay={340}>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: Snowflake,
                title: "Chemical Wash",
                sub: "from RM 130",
              },
              {
                icon: Wrench,
                title: "Repair",
                sub: "from RM 88",
              },
              {
                icon: ShieldCheck,
                title: "Installation",
                sub: "from RM 250",
              },
              {
                icon: Clock,
                title: "Gas Top-Up",
                sub: "from RM 80",
              },
            ].map(({ icon: Icon, title, sub }) => (
              <a
                key={title}
                href="#services"
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 text-left hover:border-brand-500 hover:shadow-lg hover:shadow-brand-600/10 transition-all"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30 group-hover:scale-110 transition">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400">
                  {sub}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Trust band — stats + reviews */}
        <Reveal delay={400}>
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
              {[
                {
                  icon: Users,
                  value: "5,000+",
                  label: "Happy customers",
                },
                {
                  icon: Award,
                  value: "10+",
                  label: "Years experience",
                },
                {
                  icon: ThumbsUp,
                  value: "4.9★",
                  label: "Google rating",
                },
                {
                  icon: Clock,
                  value: "< 30 min",
                  label: "Response time",
                },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-5 sm:p-6"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 ring-1 ring-brand-100 dark:ring-brand-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google verified strip */}
            <a
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-5 py-3 text-xs sm:text-sm"
            >
              <FaGoogle className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span className="font-semibold text-slate-900 dark:text-white">
                Verified on Google
              </span>
              <span className="inline-flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                ))}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                500+ reviews · 4.9/5
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
