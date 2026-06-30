import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
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

  return {
    title: `${post.titleZH} | KL Renovator Blog`,
    description: post.excerptZH,
    openGraph: {
      title: post.titleZH,
      description: post.excerptZH,
      type: "article",
      publishedTime: post.date,
      url: zhUrl,
      locale: "zh_MY",
      alternateLocale: ["en_MY", "ms_MY"],
      images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp", width: 1200, height: 630, alt: post.titleZH }],
    },
    alternates: {
      canonical: zhUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
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

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      if (p.relatedService === post.relatedService) score += 2;
      const sharedTags = p.tags?.filter((t: string) => post.tags?.includes(t)) ?? [];
      score += sharedTags.length;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post);

  return <BlogPostClient post={post} related={related} forcedLang="zh" />;
}
