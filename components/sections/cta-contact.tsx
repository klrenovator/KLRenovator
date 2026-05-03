import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { title, eyebrow } from "@/components/primitives";

export const CtaContact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className={eyebrow()}>Get a quote</p>
              <h2 className="mt-3">
                <span className={title({ size: "md" })}>Book your aircon </span>
                <span className={title({ size: "md", color: "brand" })}>
                  in under 60 seconds.
                </span>
              </h2>
              <p className="mt-4 text-slate-600">
                Fill in the form and we&apos;ll open WhatsApp with your message
                pre-filled — just hit send. We reply within 30 minutes during
                business hours.
              </p>

              <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200">
                {[
                  {
                    icon: FaPhoneAlt,
                    label: "Call us",
                    value: siteConfig.phoneDisplay,
                    href: `tel:${siteConfig.phone}`,
                  },
                  {
                    icon: FaEnvelope,
                    label: "Email",
                    value: siteConfig.email,
                    href: `mailto:${siteConfig.email}`,
                  },
                  {
                    icon: FaRegClock,
                    label: "Hours",
                    value: siteConfig.hours,
                  },
                  {
                    icon: FaMapMarkerAlt,
                    label: "Coverage",
                    value: "KL & Selangor",
                  },
                ].map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-start gap-3 bg-white p-5 h-full">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-brand-700 text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink">
                          {value}
                        </p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href} className="hover:bg-slate-50">
                      {inner}
                    </a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
