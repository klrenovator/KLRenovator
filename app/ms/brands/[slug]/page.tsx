import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiArrowRight, FiChevronRight } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { title } from "@/components/primitives";
import { waLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────
// /ms/brands/[slug] — Bahasa Malaysia brand page.
// Same pattern as /ms/areas/[slug]. All 15 brands already have faqsBM
// populated in config/site.ts, so every brand gets a page (no filtering).
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return siteConfig.brandPages.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug) as any;
  if (!brand) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/brands/${slug}`;

  return {
    title: brand.metaTitleMS || brand.metaTitle,
    description: brand.metaDescMS || brand.metaDesc,
    openGraph: {
      title: brand.metaTitleMS || brand.metaTitle,
      description: brand.metaDescMS || brand.metaDesc,
      url: msUrl,
      type: "website",
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [
        {
          url: `https://www.klrenovator.com${brand.heroImage || "/hero/aircond-installation-kuala-lumpur.jpg"}`,
          width: 1200,
          height: 630,
          alt: `Servis Aircond ${brand.name} KL & Selangor — KL Renovator`,
        },
      ],
    },
    alternates: {
      canonical: msUrl,
      languages: {
        "en-MY": enUrl,
        "ms-MY": msUrl,
        "zh-MY": zhUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function BrandPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = siteConfig.brandPages.find((b) => b.slug === slug) as any;
  if (!brand) notFound();

  const enUrl = `https://www.klrenovator.com/brands/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/brands/${slug}`;
  const waMsg = `Hi KL Renovator, saya nak tempah servis aircond ${brand.name}.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Servis Aircond ${brand.name}`,
    provider: { "@type": "HVACBusiness", "@id": "https://www.klrenovator.com/#business", name: siteConfig.name },
    areaServed: { "@type": "AdministrativeArea", name: "Kuala Lumpur & Selangor" },
    brand: { "@type": "Brand", name: brand.name },
    description: brand.descriptionMS || brand.description,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Laman Utama", item: "https://www.klrenovator.com" },
      { "@type": "ListItem", position: 2, name: "Jenama", item: "https://www.klrenovator.com/ms/brands" },
      { "@type": "ListItem", position: 3, name: `Aircond ${brand.name}`, item: msUrl },
    ],
  };

  const faqSchema = brand.faqsBM?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: brand.faqsBM.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const otherMsBrands = siteConfig.brandPages.filter((b) => b.slug !== slug).slice(0, 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
              Servis Aircond Jenama
            </p>
            <h1 className="mt-1">
              <span className={title({ size: "lg" })}>Servis Aircond </span>
              <span className={title({ size: "lg", color: "brand" })}>{brand.name}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Ya, KL Renovator menservis semua model aircond <strong>{brand.name}</strong> di KL &amp; Selangor.
              {" "}{brand.descriptionMS || brand.description}
            </p>

            {brand.models?.length > 0 && (
              <p className="mt-3 text-sm text-slate-500 font-medium">
                Model: {brand.models.join(", ")}.
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all rounded-xl"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp Sekarang
              </a>
              <NextLink
                href={enUrl}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-all rounded-xl"
              >
                Read in English <FiArrowRight className="h-3.5 w-3.5" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {brand.highlights?.length > 0 && (
        <section className="py-10 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Kepakaran Kami Untuk {brand.name}
              </h2>
              <ul className="grid gap-px bg-slate-200 sm:grid-cols-2 border border-slate-200 text-sm">
                {brand.highlights.map((h: string, i: number) => (
                  <li key={i} className="bg-white px-4 py-3 flex items-start gap-2">
                    <FiCheck className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {brand.faqsBM?.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-base font-black text-slate-900 mb-4">
                Soalan Lazim — Aircond {brand.name}
              </h2>
              <div className="border border-slate-200 divide-y divide-slate-200 rounded-2xl overflow-hidden">
                {brand.faqsBM.map((faq: { q: string; a: string }, i: number) => (
                  <details key={i} className="group bg-white p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900 text-sm">
                      {faq.q}
                      <FiChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-sky-500 shrink-0" />
                    </summary>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Jenama Lain Yang Kami Servis
            </p>
            <div className="flex flex-wrap gap-2">
              {otherMsBrands.map((b) => (
                <NextLink
                  key={b.slug}
                  href={`/ms/brands/${b.slug}`}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50 transition rounded-xl"
                >
                  Aircond {b.name}
                </NextLink>
              ))}
              <NextLink
                href="/brands"
                className="inline-flex items-center gap-1.5 border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700 hover:bg-sky-100 transition rounded-xl"
              >
                Semua Jenama <FiArrowRight className="h-3 w-3" />
              </NextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
