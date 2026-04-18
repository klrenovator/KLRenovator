import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { waLink, defaultWhatsAppMsg } from "@/lib/whatsapp";
import { title, subtitle } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for aircon service in KL & Selangor.`,
};

export default function ContactPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Contact us
            </p>
            <h1 className="mt-2">
              <span className={title({ size: "lg" })}>Let&apos;s get your </span>
              <span className={title({ size: "lg", color: "brand" })}>
                aircon sorted.
              </span>
            </h1>
            <p className={subtitle({ class: "mt-3" })}>
              Fastest way to reach us is WhatsApp. We reply within 30 minutes during working hours.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <Reveal>
            <div className="space-y-4">
              <a
                href={waLink(defaultWhatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-[rgb(var(--color-whatsapp))] text-white p-5 shadow-lg shadow-brand-600/30 hover:brightness-110 transition"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="h-6 w-6" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs opacity-80">Fastest response</p>
                  <p className="font-bold">WhatsApp us now</p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Call</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {siteConfig.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-600" />
                    <p className="text-xs text-slate-500">Hours</p>
                  </div>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white text-sm">
                    {siteConfig.hours}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-600" />
                    <p className="text-xs text-slate-500">Coverage</p>
                  </div>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white text-sm">
                    KL & Selangor
                  </p>
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
}
