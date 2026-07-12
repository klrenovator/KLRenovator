"use client";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { Reveal } from "@/components/reveal";
import { PriceComparisonUI } from "@/components/price-comparison";
import { anchor } from "@/config/anchor-text-diversity";
import { BookingButton } from "@/components/booking-button";

export default function BrandsIndex() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / USP Header */}
      <div className="bg-slate-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            ONE TECHNICIAN • ALL BRANDS
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">
            The Technician<br />Who Services<br />Them All
          </h1>
          
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            One expert. 20 trusted brands. Same-day service across KL & Selangor.
          </p>
          <p className="mt-2 text-lg text-slate-400">
            Satu Juruteknik • 20 Jenama • Servis Hari Sama
          </p>
          <p className="mt-1 text-lg text-slate-400">
            一位技术员 • 20 个品牌 • 当天服务
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton serviceName="All Brands Service" size="lg" />
            <NextLink 
              href="#why-it-matters" 
              className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition"
            >
              Why This Matters →
            </NextLink>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest text-slate-600">
          <span>✓ SSM Registered</span>
          <span>✓ 1-Month Workmanship Warranty</span>
          <span>✓ 500+ 5-Star Google Reviews</span>
          <span>✓ Same-Day Available</span>
          <span>✓ Price Confirmed Before Work</span>
        </div>
      </div>

      {/* Why This Matters Section */}
      <div id="why-it-matters" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">The Real Advantage</p>
          <h2 className="text-3xl font-black tracking-tight">Why One Technician for All Brands Matters</h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Most companies send different technicians for different brands. We don’t.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">Consistent Quality</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The same trained technician who services your Daikin today can handle your Panasonic, Mitsubishi, or LG tomorrow. No learning curve. No brand-specific mistakes.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">Faster Diagnosis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our technicians know the quirks of all 20 brands. They spot problems faster and fix them right the first time — whether it’s a 15-year-old York or a brand-new Gree.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">True Convenience</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              One phone number. One WhatsApp. One team that knows every brand you own. No more explaining your setup to a new technician every visit.
            </p>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">20 Brands • One Team</p>
          <h2 className="text-3xl font-black tracking-tight">All Brands We Service</h2>
          <p className="mt-2 text-slate-600">Every major residential and light-commercial split unit brand in Malaysia</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {siteConfig.brandPages.map((brand, index) => (
            <Reveal key={brand.slug} delay={index * 25}>
              <NextLink
                href={`/brands/${brand.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all h-full"
              >
                <div className="font-black text-2xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  {brand.name}
                </div>
                <div className="mt-1.5 text-sm text-slate-500">
                  {anchor.brand(brand.slug, "en", 0)}
                </div>
                <div className="mt-5 text-xs font-black text-sky-600 flex items-center gap-1.5">
                  View service details <span className="group-hover:translate-x-0.5 transition">→</span>
                </div>
              </NextLink>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Price Comparison */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <PriceComparisonUI locale="en" compact={false} />
      </div>

      {/* Final CTA */}
      <div className="bg-slate-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black tracking-tight">Ready for the technician who knows them all?</h2>
          <p className="mt-3 text-slate-400">Same-day service • Transparent pricing • 1-month warranty</p>
          
          <div className="mt-8">
            <BookingButton serviceName="All Brands Service" size="lg" />
          </div>
          
          <p className="mt-6 text-xs text-slate-500">
            WhatsApp us your brand + problem. We’ll confirm a slot in minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
