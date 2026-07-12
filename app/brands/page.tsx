"use client";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { Reveal } from "@/components/reveal";
import { PriceComparisonUI } from "@/components/price-comparison";
import { anchor } from "@/config/anchor-text-diversity";

export default function BrandsIndex() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight">All Aircond Brands We Service</h1>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
            20 trusted brands • Same-day service across KL & Selangor • Transparent pricing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {siteConfig.brandPages.map((brand, index) => (
            <Reveal key={brand.slug} delay={index * 30}>
              <NextLink
                href={`/brands/${brand.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all"
              >
                <div className="font-black text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  {brand.name}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {anchor.brand(brand.slug, "en", 0)}
                </div>
                <div className="mt-4 text-xs text-sky-600 font-bold flex items-center gap-1">
                  View service details →
                </div>
              </NextLink>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <PriceComparisonUI locale="en" compact={false} />
        </div>
      </div>
    </div>
  );
}
