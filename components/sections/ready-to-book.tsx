import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { FaRegClock, FaShieldAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const ReadyToBook = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-sky-600 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-block border border-sky-300 bg-sky-700 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-sky-100 rounded-full">
            Same-day slots available
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] uppercase">
            Ready to book your{" "}
            <span className="text-sky-100">aircond service?</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-sky-100 font-medium">
            Chat with us on WhatsApp and get a transparent quote in minutes.
            Licensed technicians · Honest pricing · Quality workmanship.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
            >
              <FaWhatsapp className="h-5 w-5" />
              Request a Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-900 transition-all rounded-xl"
            >
              <FaPhone className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-sky-500 border border-sky-500 rounded-xl overflow-hidden">
            {[
              { icon: FaRegClock, label: "Reply within 30 mins" },
              { icon: FaShieldAlt, label: "Licensed & insured" },
              { icon: FiCheckCircle, label: "Satisfaction guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2.5 bg-sky-700 hover:bg-sky-600 transition-colors px-4 py-5 text-sm font-black text-white uppercase tracking-wider"
              >
                <Icon className="h-4 w-4 text-sky-200 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
