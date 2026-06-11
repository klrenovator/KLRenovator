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
      images: [{ url: "https://www.klrenovator.com/logo/image.png", width: 400, height: 400 }],
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

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.relatedService === post.relatedService ? -1 : 1))
    .slice(0, 3);

  return <BlogPostClient post={post} related={related} />;
}
