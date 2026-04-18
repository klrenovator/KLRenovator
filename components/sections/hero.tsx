import { ShieldCheck, Clock, Star, Zap, Snowflake } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, subtitle } from "@/components/primitives";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[rgb(var(--color-accent-300))]/40 dark:bg-[rgb(var(--color-accent-500))]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-300/40 dark:bg-brand-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
                <Star className="h-3.5 w-3.5" fill="currentColor" />
                Trusted by 1,000+ homes &amp; offices in KL &amp; Selangor
              </span>

              <h1 className="mt-5 leading-[1.05]">
                <span className={title({ size: "lg" })}>
                  Keep your home
                </span>{" "}
                <span className={title({ size: "lg", color: "brand" })}>
                  icy cold
                </span>
                <br />
                <span className={title({ size: "lg" })}>
                  with trusted aircon experts.
                </span>
              </h1>

              <p className={subtitle({ class: "mt-4 max-w-xl" })}>
                Installation, chemical wash, servicing, gas top-up, repair and
                more. Same-day bookings via WhatsApp · Transparent pricing · No
                hidden fees.
              </p>

              <div className="mt-6">
                <BookingButton size="lg" />
              </div>

              {/* Trust mini-row */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
                {[
                  { icon: ShieldCheck, label: "Licensed technicians" },
                  { icon: Clock, label: "Same-day service" },
                  { icon: Zap, label: "Fast response" },
                  { icon: Star, label: "5-star rated" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-brand-600/20 ring-1 ring-slate-200 dark:ring-slate-800">
                {/* SVG hero illustration — guaranteed to render, brand-matched colours */}
                <svg
                  viewBox="0 0 800 600"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  role="img"
                  aria-label="KL Renovator — aircon servicing illustration"
                >
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(var(--color-brand-700))" />
                      <stop offset="50%" stopColor="rgb(var(--color-brand-500))" />
                      <stop offset="100%" stopColor="rgb(var(--color-accent-400))" />
                    </linearGradient>
                    <linearGradient id="unit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  {/* Background */}
                  <rect width="800" height="600" fill="url(#sky)" />
                  {/* Glow */}
                  <circle cx="550" cy="180" r="220" fill="url(#glow)" />
                  {/* Wall */}
                  <rect x="0" y="430" width="800" height="170" fill="rgba(255,255,255,0.08)" />
                  {/* Aircon unit */}
                  <rect
                    x="170"
                    y="220"
                    width="460"
                    height="130"
                    rx="18"
                    fill="url(#unit)"
                    stroke="#cbd5e1"
                    strokeWidth="3"
                  />
                  {/* Vent slats */}
                  <rect x="190" y="296" width="420" height="10" rx="5" fill="#cbd5e1" />
                  <rect x="190" y="316" width="420" height="10" rx="5" fill="#cbd5e1" />
                  {/* LED */}
                  <circle cx="590" cy="250" r="6" fill="#22d3ee">
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <rect x="540" y="240" width="40" height="20" rx="4" fill="#0f172a" opacity="0.7" />
                  {/* Cool breeze */}
                  <g opacity="0.9">
                    <path
                      d="M210 380 Q260 430 210 480 Q260 530 210 560"
                      stroke="#e0f2fe"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M320 380 Q370 430 320 480 Q370 530 320 560"
                      stroke="#bae6fd"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M430 380 Q480 430 430 480 Q480 530 430 560"
                      stroke="#e0f2fe"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;1;0.4"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M540 380 Q590 430 540 480 Q590 530 540 560"
                      stroke="#bae6fd"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                  {/* Snowflakes */}
                  {[
                    { x: 240, y: 430, d: "3s" },
                    { x: 350, y: 450, d: "2.4s" },
                    { x: 460, y: 440, d: "2.8s" },
                    { x: 570, y: 460, d: "2.2s" },
                  ].map((s) => (
                    <g key={`${s.x}-${s.y}`} transform={`translate(${s.x},${s.y})`}>
                      <g fill="#ffffff">
                        <circle r="3" />
                        <rect x="-0.5" y="-8" width="1" height="16" />
                        <rect x="-8" y="-0.5" width="16" height="1" />
                        <rect
                          x="-0.5"
                          y="-8"
                          width="1"
                          height="16"
                          transform="rotate(45)"
                        />
                        <rect
                          x="-0.5"
                          y="-8"
                          width="1"
                          height="16"
                          transform="rotate(-45)"
                        />
                      </g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={`${s.x},${s.y}; ${s.x - 5},${s.y + 15}; ${s.x},${s.y}`}
                        dur={s.d}
                        repeatCount="indefinite"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Floating rating card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 w-56 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-xl border border-slate-200 dark:border-slate-800 float-anim">
                <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  4.9 / 5 rating
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  from 500+ Google reviews
                </p>
              </div>

              {/* Floating price card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl bg-white dark:bg-slate-900 px-4 py-3 shadow-xl border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Service from
                </p>
                <p className="flex items-center gap-1 text-xl font-extrabold text-brand-600 dark:text-brand-400">
                  <Snowflake className="h-4 w-4" />
                  RM 99
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
