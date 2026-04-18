import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { title } from "@/components/primitives";

export const CtaContact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Get a quote
              </p>
              <h2 className="mt-2">
                <span className={title({ size: "md" })}>Book your aircon </span>
                <span className={title({ size: "md", color: "brand" })}>
                  in under 60 seconds.
                </span>
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Fill in the form and we&apos;ll open WhatsApp with your message
                pre-filled — just hit send. We reply within 30 minutes during business hours.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Call us</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Hours</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {siteConfig.hours}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Coverage</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      KL & Selangor
                    </p>
                  </div>
                </div>
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
