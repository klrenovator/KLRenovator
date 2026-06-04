import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { FiClock, FiTag, FiChevronRight, FiArrowLeft } from "react-icons/fi";

import { Reveal } from "@/components/reveal";
import { waLink, rfqMsgForService } from "@/lib/whatsapp";
import { allPosts } from "@/config/blog-posts";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | KL Renovator Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://www.klrenovator.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "KL Renovator",
              url: "https://www.klrenovator.com",
            },
            publisher: {
              "@type": "Organization",
              name: "KL Renovator",
              logo: {
                "@type": "ImageObject",
                url: "https://www.klrenovator.com/logo/image.png",
              },
            },
            mainEntityOfPage: `https://www.klrenovator.com/blog/${post.slug}`,
            keywords: post.tags.join(", "),
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <NextLink href="/" className="hover:text-sky-600 transition font-medium">Home</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <NextLink href="/blog" className="hover:text-sky-600 transition font-medium">Blog</NextLink>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article>
        <header className="bg-slate-950 text-white py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-sky-400 border border-sky-900 bg-sky-950 px-2.5 py-1 mb-5">
                <FiTag className="h-2.5 w-2.5" /> {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-slate-400 font-medium text-base leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <FiClock className="h-3 w-3 text-sky-500" /> {post.readTime} min read
                </span>
                <span>{post.date}</span>
                <span className="text-slate-600">·</span>
                <span>By KL Renovator Team</span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Article Body */}
        <div className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">

              {/* Main Content */}
              <div
                className="prose prose-slate prose-sm sm:prose-base max-w-none
                  prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-slate-950
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-900
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium
                  prose-strong:text-slate-900 prose-strong:font-black
                  prose-ul:my-4 prose-li:text-slate-700 prose-li:font-medium
                  prose-a:text-sky-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Sidebar */}
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                {/* Quick Book */}
                <div className="bg-slate-950 text-white p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">
                    Need This Service?
                  </p>
                  <h3 className="text-lg font-black uppercase text-white leading-tight">
                    Book an expert now
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 font-medium leading-relaxed">
                    Same-day service available. WhatsApp for instant quote.
                  </p>
                  <a
                    href={waLink(rfqMsgForService(post.relatedService))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 mt-4 bg-[#22c55e] hover:bg-[#16a34a] px-4 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all"
                  >
                    <FaWhatsapp className="h-4 w-4" /> Book on WhatsApp
                  </a>
                </div>

                {/* Tags */}
                <div className="bg-slate-50 border border-slate-200 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag}
                        className="text-[11px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back to Blog */}
                <NextLink href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-sky-600 transition-colors">
                  <FiArrowLeft className="h-3.5 w-3.5" /> Back to all articles
                </NextLink>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-950 mb-8">
                Related Articles
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 50}>
                  <NextLink href={`/blog/${p.slug}`}
                    className="group block bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all p-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">{p.category}</span>
                    <h3 className="mt-2 text-sm font-black text-slate-950 uppercase leading-snug group-hover:text-sky-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 font-medium line-clamp-2">{p.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 font-bold">
                      <FiClock className="h-3 w-3" /> {p.readTime} min · {p.date}
                    </div>
                  </NextLink>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
