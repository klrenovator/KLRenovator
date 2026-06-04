import type { Metadata } from "next";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiArrowRight } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { title, eyebrow } from "@/components/primitives";
import { waLink, rfqMsg } from "@/lib/whatsapp";
import { allPosts } from "@/config/blog-posts";

export const metadata: Metadata = {
  title: "Aircond Tips & Guide Blog | KL Renovator",
  description:
    "Expert aircond maintenance tips, service guides, and HVAC advice from KL Renovator. Learn how to keep your aircon running efficiently in Malaysia's climate.",
  keywords: [
    "aircond tips Malaysia",
    "aircon maintenance guide KL",
    "chemical wash vs overhaul",
    "aircon not cold fix",
    "aircond service guide Selangor",
  ],
  openGraph: {
    title: "Aircond Tips & Guide Blog | KL Renovator",
    description: "Expert HVAC tips from KL & Selangor's trusted aircond specialist.",
    type: "website",
    url: "https://www.klrenovator.com/blog",
  },
};

export default function BlogPage() {
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400 mb-4">
              Knowledge Base
            </p>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Aircond Tips &amp; <span className="text-sky-400">Expert Guides</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium">
              Practical aircond advice from KL Renovator — Malaysia&apos;s trusted HVAC specialist.
              Learn how to maintain, troubleshoot, and get the best from your aircon.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Featured Post */}
          {featured && (
            <Reveal>
              <NextLink href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 bg-white border border-slate-200 hover:border-sky-400 transition-all duration-300 overflow-hidden mb-12 shadow-sm hover:shadow-lg">
                <div className="bg-slate-950 p-8 sm:p-12 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-sky-400 border border-sky-900 bg-sky-950 px-2.5 py-1 mb-4">
                      <FiTag className="h-2.5 w-2.5" /> {featured.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-sky-400 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-slate-400 font-medium text-sm leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <FiClock className="h-3 w-3" /> {featured.readTime} min read
                    </span>
                    <span>{featured.date}</span>
                  </div>
                </div>
                <div className="bg-sky-700 p-8 sm:p-12 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-sky-200 mb-2">Featured Article</p>
                    <p className="text-white font-black text-lg uppercase">Read Full Guide</p>
                  </div>
                  <FiArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform" />
                </div>
              </NextLink>
            </Reveal>
          )}

          {/* Blog Grid */}
          <div className="mb-10">
            <Reveal>
              <p className={eyebrow()}>All Articles</p>
              <h2 className="mt-2">
                <span className={title({ size: "sm" })}>More </span>
                <span className={title({ size: "sm", color: "brand" })}>Guides & Tips</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 50}>
                <NextLink href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  {/* Color bar */}
                  <div className="h-2 bg-gradient-to-r from-sky-600 to-sky-500 group-hover:from-sky-500 group-hover:to-sky-400 transition-all" />
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 mb-3 self-start">
                      <FiTag className="h-2.5 w-2.5" /> {post.category}
                    </span>
                    <h3 className="text-base font-black text-slate-950 uppercase tracking-tight leading-snug group-hover:text-sky-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        <FiClock className="h-3 w-3" /> {post.readTime} min
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">{post.date}</span>
                    </div>
                  </div>
                </NextLink>
              </Reveal>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <Reveal>
            <div className="mt-16 bg-slate-950 text-white p-8 sm:p-12 text-center">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Need expert help with your aircon?
              </h3>
              <p className="mt-2 text-slate-400 font-medium">
                Talk to our team on WhatsApp — quick answers and same-day service.
              </p>
              <a
                href={waLink(rfqMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all"
              >
                <FaWhatsapp className="h-5 w-5" /> Chat with Us on WhatsApp
              </a>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
