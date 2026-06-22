import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
import { BlogPostClient } from "@/app/blog/[slug]/blog-post-client";

// ─────────────────────────────────────────────────────────────────────────
// /ms/blog/[slug] — Bahasa Malaysia blog post page.
// Reuses the same BlogPostClient component as the English route, passing
// forcedLang="ms" so it always renders Malay regardless of the client-side
// language-toggle state. All 20 posts already have titleMS/excerptMS/
// categoryMS/contentMS in config/blog-posts.ts, so every post gets a page.
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
  if (!post) return { title: "Halaman tidak dijumpai" };

  const enUrl = `https://www.klrenovator.com/blog/${slug}`;
  const msUrl = `https://www.klrenovator.com/ms/blog/${slug}`;
  const zhUrl = `https://www.klrenovator.com/zh/blog/${slug}`;

  return {
    title: `${post.titleMS} | KL Renovator Blog`,
    description: post.excerptMS,
    openGraph: {
      title: post.titleMS,
      description: post.excerptMS,
      type: "article",
      publishedTime: post.date,
      url: msUrl,
      locale: "ms_MY",
      alternateLocale: ["en_MY", "zh_MY"],
      images: [{ url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.jpg", width: 1200, height: 630, alt: post.titleMS }],
    },
    alternates: {
      canonical: msUrl,
      languages: { "en-MY": enUrl, "ms-MY": msUrl, "zh-MY": zhUrl, "x-default": enUrl },
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

  return <BlogPostClient post={post} related={related} forcedLang="ms" />;
}
