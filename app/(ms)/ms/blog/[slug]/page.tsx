import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
import { getRelatedPosts } from "@/app/(en)/blog/get-related-posts";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription, padMetaDescription, ensureCtaDescription } from "@/lib/seo-description-optimizer";
import { sanitizeBlogPost } from "@/lib/blog-html-sanitize";
import { explainersForPost } from "@/lib/blog-explainers";
import { BlogPostClient } from "@/app/(en)/blog/[slug]/blog-post-client";

// ─────────────────────────────────────────────────────────────────────────
// /ms/blog/[slug] — Bahasa Malaysia blog post page.
// Reuses the same BlogPostClient component as the English route, passing
// forcedLang="ms" so it always renders Malay regardless of the client-side
// language-toggle state. All 20 posts already have titleMS/excerptMS/
// categoryMS/contentMS in config/blog-posts.ts, so every post gets a page.
// ─────────────────────────────────────────────────────────────────────────

// This route is backed by a finite typed content registry.
// Unknown slugs must be a real 404, never an indexable fallback page.
export const dynamicParams = false;

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
  if (!post) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/blog/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/blog/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/blog/${slug}`;

  const imageUrl = `https://www.klrenovator.com${post.image}`;

  return {
    title: clampMetaTitle(post.titleMS.length + 16 <= 60 ? `${post.titleMS} | KL Renovator` : post.titleMS),
    description: ensureCtaDescription(padMetaDescription(post.excerptMS)),
    openGraph: {
      title: clampMetaTitle(post.titleMS),
      description: padMetaDescription(post.excerptMS),
      type: "article",
      publishedTime: post.date,
      url: msUrl,
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.imageAlt }],
    },
    alternates: {
      canonical: msUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}

export default async function BlogPostPageMS({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  // Sanitise authored article HTML on the server before client rendering
  // (audit item P0-05) — mirrors the EN route.
  return <BlogPostClient post={sanitizeBlogPost(post)} related={related} forcedLang="ms" explainers={explainersForPost(post)} />;
}
