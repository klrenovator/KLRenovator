import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { Check, ArrowRight, ChevronRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { ServiceHeroImage } from "@/components/service-hero-image";
import { title, subtitle } from "@/components/primitives";

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = servicesData[slug];
  if (!data) return { title: "Service not found" };
  return {
    title: data.title,
    description: data.tagline,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = servicesData[slug];
  if (!data) notFound();

  const iconName =
    siteConfig.services.find((s) => s.slug === slug)?.icon ?? "sparkles";

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1 text-xs text-slate-500">
          <NextLink href="/" className="hover:text-brand-600">Home</NextLink>
          <ChevronRight className="h-3 w-3" />
          <NextLink href="/#services" className="hover:text-brand-600">Services</NextLink>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-700 dark:text-slate-300">{data.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
                  <ServiceIcon name={iconName} className="h-6 w-6" />
                </div>
                <h1 className="mt-4">
                  <span className={title({ size: "md" })}>
                    {data.title}
                  </span>
                </h1>
                <p className={subtitle({ class: "mt-3" })}>{data.tagline}</p>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  {data.description}
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-3 py-1 font-semibold">
                    From {data.startPrice}
                  </span>
                  <span className="text-slate-500">All KL & Selangor</span>
                </div>
                <div className="mt-6">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ServiceHeroImage src={data.heroImage} alt={data.title} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 sm:py-12 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2>
              <span className={title({ size: "sm" })}>What&apos;s </span>
              <span className={title({ size: "sm", color: "brand" })}>included</span>
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 60}>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <Check className="h-5 w-5 text-brand-600 shrink-0" />
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2>
                <span className={title({ size: "sm" })}>Transparent </span>
                <span className={title({ size: "sm", color: "brand" })}>pricing</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Starting prices. Material costs (gas, copper, trunking) quoted separately.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                {data.priceTable.map((p) => (
                  <li key={p.label} className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{p.label}</span>
                    <span className="text-base font-bold text-brand-600 whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center">
              <span className={title({ size: "sm" })}>How it </span>
              <span className={title({ size: "sm", color: "brand" })}>works</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 h-full">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{p.step}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center">
              <span className={title({ size: "sm" })}>Frequently asked </span>
              <span className={title({ size: "sm", color: "brand" })}>questions</span>
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {data.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900 dark:text-white">
                    {f.q}
                    <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <h2>
                  <span className={title({ size: "md" })}>Book your </span>
                  <span className={title({ size: "md", color: "brand" })}>{data.title}</span>
                </h2>
                <p className={subtitle({ class: "mt-3" })}>
                  Send us a message now — we&apos;ll reply with availability and a firm quote within 30 minutes.
                </p>
                <div className="mt-4">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>

                {/* Related services */}
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase text-slate-500">Other services</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {siteConfig.services
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <NextLink
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition"
                        >
                          {s.title} <ArrowRight className="h-3 w-3" />
                        </NextLink>
                      ))}
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
    </>
  );
}
