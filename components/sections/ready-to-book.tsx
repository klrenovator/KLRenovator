import { Phone, MessageCircle, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";

export const ReadyToBook = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Solid background */}
      <div className="absolute inset-0 -z-10 bg-brand-700" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Same-day slots available
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            Ready to Book Your <span className="text-cyan-300">Aircond Service?</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/85">
            Chat with us on WhatsApp and get a transparent quote in minutes.
            Licensed technicians · Honest pricing · Quality workmanship guaranteed.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[rgb(var(--color-whatsapp))] px-7 py-4 text-base font-bold text-white shadow-2xl shadow-black/30 hover:brightness-110 hover:scale-[1.02] transition-transform"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp us now
              <MessageCircle className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-brand-900 hover:bg-brand-800 ring-1 ring-white/20 px-7 py-4 text-base font-bold text-white shadow-2xl shadow-black/30 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Clock, label: "Reply within 30 mins" },
              { icon: ShieldCheck, label: "Licensed & insured" },
              { icon: Sparkles, label: "Satisfaction guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 text-sm font-semibold text-white"
              >
                <Icon className="h-4 w-4 text-cyan-300 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
