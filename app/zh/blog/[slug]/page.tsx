import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
import { getRelatedPosts } from "@/app/blog/get-related-posts";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
import { BlogPostClient } from "@/app/blog/[slug]/blog-post-client";

// ─────────────────────────────────────────────────────────────────────────
// /zh/blog/[slug] — Mandarin blog post page. Mirrors /ms/blog/[slug].
// ─────────────────────────────────────────────────────────────────────────

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
  if (!post) return { title: "页面未找到" };

  const enUrl = `https://www.klrenovator.com/blog/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/blog/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/blog/${slug}`;

  const imageUrl = `https://www.klrenovator.com${post.image}`;

  return {
    title: clampMetaTitle(post.titleZH.length + 16 <= 60 ? `${post.titleZH} | KL Renovator` : post.titleZH),
    description: clampMetaDescription(post.excerptZH),
    openGraph: {
      title: clampMetaTitle(post.titleZH),
      description: clampMetaDescription(post.excerptZH),
      type: "article",
      publishedTime: post.date,
      url: zhUrl,
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.imageAlt }],
    },
    alternates: {
      canonical: zhUrl,
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

export default async function BlogPostPageZH({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return <BlogPostClient post={post} related={related} forcedLang="zh" />;
}
