import { FaWhatsapp, FaPhoneAlt, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { waLink, rfqMsg } from "@/lib/whatsapp";

export const ReadyToBook = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-brand-900">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-block border border-brand-300/50 bg-brand-950/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-200">
            Same-day slots available
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            Ready to book your{" "}
            <span className="text-brand-300">aircond service?</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
            Chat with us on WhatsApp and get a transparent quote in minutes.
            Licensed technicians · Honest pricing · Quality workmanship.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink(rfqMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-brand-500 hover:bg-brand-400 px-7 py-4 text-base font-bold uppercase tracking-wide text-white transition"
            >
              <FaWhatsapp className="h-5 w-5" />
              Request a Quote
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-white hover:bg-slate-100 px-7 py-4 text-base font-bold uppercase tracking-wide text-black transition"
            >
              <FaPhoneAlt className="h-4 w-4" />
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-800 border border-brand-800">
            {[
              { icon: FaRegClock, label: "Reply within 30 mins" },
              { icon: FaShieldAlt, label: "Licensed & insured" },
              { icon: FiCheckCircle, label: "Satisfaction guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2.5 bg-brand-900 px-4 py-4 text-sm font-semibold text-white"
              >
                <Icon className="h-4 w-4 text-brand-300 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
