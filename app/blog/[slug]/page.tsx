import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
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
      images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.jpg"],
    },
    alternates: {
      canonical: `https://www.klrenovator.com/blog/${slug}`,
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

  // Score posts by relevance: same category (+3), shared tags (+1 each), same relatedService (+2)
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

  return <BlogPostClient post={post} related={related} />;
}
