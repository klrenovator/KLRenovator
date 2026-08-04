import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
import { getRelatedPosts } from "@/app/blog/get-related-posts";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { buildFaqSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { sanitizeBlogPost } from "@/lib/blog-html-sanitize";
import { BlogPostClient } from "./blog-post-client";

// ─── Static Params (Server Only) ─────────────────────────────────────────────
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

// ─── Metadata (Server Only) ───────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };

  const imageUrl = `https://www.klrenovator.com${post.image}`;

  return {
    title: clampMetaTitle(post.title.length + 16 <= 60 ? `${post.title} | KL Renovator` : post.title),
    description: clampMetaDescription(post.excerpt),
    openGraph: {
      title: clampMetaTitle(post.title),
      description: clampMetaDescription(post.excerpt),
      type: "article",
      publishedTime: post.date,
      url: `https://www.klrenovator.com/blog/${post.slug}`,
      locale: "en_MY",
      alternateLocale: ["ms_MY", "zh_MY"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: clampMetaTitle(post.title),
      description: clampMetaDescription(post.excerpt),
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.klrenovator.com/blog/${slug}`,
      languages: {
        "en-MY": `https://www.klrenovator.com/blog/${slug}`,
        "ms-MY": `https://www.klrenovator.com/ms/blog/${slug}`,
        "zh-MY": `https://www.klrenovator.com/zh/blog/${slug}`,
        "x-default": `https://www.klrenovator.com/blog/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}

// ─── Page (Server Component — passes data to client) ─────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  // Sanitise the authored article HTML once, on the server, before it can
  // reach any `dangerouslySetInnerHTML` in the client (audit item P0-05).
  return <BlogPostClient post={sanitizeBlogPost(post)} related={related} />;
}
