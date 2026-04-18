import { ShieldCheck, Clock, Star, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { title, subtitle } from "@/components/primitives";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-300/40 dark:bg-brand-600/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-300/30 dark:bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
                <Star className="h-3.5 w-3.5" fill="currentColor" />
                Trusted by 5,000+ homes & offices in KL & Selangor
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
                    <Icon className="h-4 w-4 text-brand-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-brand-600/20 ring-1 ring-slate-200 dark:ring-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1400&q=80"
                  alt="Klrenovator technician installing air conditioner"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating rating card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 w-56 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-xl border border-slate-200 dark:border-slate-800 float-anim">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  4.9 / 5 rating
                </p>
                <p className="text-xs text-slate-500">from 500+ Google reviews</p>
              </div>

              {/* Floating price card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl bg-white dark:bg-slate-900 px-4 py-3 shadow-xl border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  Service from
                </p>
                <p className="text-xl font-extrabold text-brand-600">RM 99</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
