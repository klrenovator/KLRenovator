import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services-data";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { ContactForm } from "@/components/contact-form";
import { ServiceIcon } from "@/components/service-icon";
import { title, subtitle, eyebrow } from "@/components/primitives";

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
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-brand-700 transition">
              Home
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/services" className="hover:text-brand-700 transition">
              Services
            </NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-ink font-semibold">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center bg-brand-600 text-white">
                  <ServiceIcon name={iconName} className="h-7 w-7" />
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                  {data.title}
                </h1>
                <p className="mt-4 text-lg text-slate-300 max-w-xl leading-relaxed">
                  {data.tagline}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="bg-brand-600 text-white px-3 py-1.5 font-bold uppercase tracking-wider">
                    From {data.startPrice}
                  </span>
                  <span className="text-slate-300 font-semibold uppercase tracking-wider text-xs">
                    All KL &amp; Selangor
                  </span>
                </div>
                <div className="mt-8">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white text-ink p-6 sm:p-8">
                <p className={eyebrow()}>Overview</p>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {data.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {data.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <FiCheck className="mt-0.5 h-4 w-4 text-brand-700 shrink-0" />
                      <span className="text-sm font-semibold text-ink">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className={eyebrow()}>What&apos;s included</p>
            <h2 className="mt-3">
              <span className={title({ size: "sm" })}>Everything you </span>
              <span className={title({ size: "sm", color: "brand" })}>
                get with us.
              </span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {data.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 60}>
                <div className="flex items-start gap-3 bg-white p-5 h-full">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-brand-700 text-white">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-ink leading-relaxed">
                    {h}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>Pricing</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Transparent </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  pricing.
                </span>
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Starting prices. Material costs (gas, copper, trunking) quoted
                separately.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-slate-200 bg-white">
              <ul className="divide-y divide-slate-200">
                {data.priceTable.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-3 px-5 py-4"
                  >
                    <span className="text-sm text-slate-700">{p.label}</span>
                    <span className="text-base font-bold text-brand-700 whitespace-nowrap">
                      {p.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>Process</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>How it </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  works.
                </span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200">
            {data.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 80}>
                <div className="bg-white p-6 h-full">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-ink text-white font-extrabold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-extrabold text-ink uppercase tracking-tight">
                    {p.step}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className={eyebrow()}>FAQ</p>
              <h2 className="mt-3">
                <span className={title({ size: "sm" })}>Common </span>
                <span className={title({ size: "sm", color: "brand" })}>
                  questions.
                </span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 border border-slate-200 divide-y divide-slate-200">
            {data.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-ink">
                    {f.q}
                    <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-brand-700" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className={eyebrow()}>Book it</p>
                <h2 className="mt-3">
                  <span className={title({ size: "md" })}>Book your </span>
                  <span className={title({ size: "md", color: "brand" })}>
                    {data.title}.
                  </span>
                </h2>
                <p className={subtitle({ class: "mt-4" })}>
                  Send us a message now — we&apos;ll reply with availability and
                  a firm quote within 30 minutes.
                </p>
                <div className="mt-6">
                  <BookingButton serviceName={data.title} size="lg" />
                </div>

                <div className="mt-10">
                  <p className={eyebrow()}>Other Services</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {siteConfig.services
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <NextLink
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:border-brand-700 hover:text-brand-700 transition"
                        >
                          {s.title} <FiArrowRight className="h-3 w-3" />
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
