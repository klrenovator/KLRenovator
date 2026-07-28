import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "@/config/blog-posts";
import { getRelatedPosts } from "@/app/blog/get-related-posts";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { clampMetaDescription } from "@/lib/seo-description-optimizer";
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

  const imageUrl = `https://www.klrenovator.com${post.image}`;

  return {
    title: clampMetaTitle(post.titleMS.length + 16 <= 60 ? `${post.titleMS} | KL Renovator` : post.titleMS),
    description: clampMetaDescription(post.excerptMS),
    openGraph: {
      title: clampMetaTitle(post.titleMS),
      description: clampMetaDescription(post.excerptMS),
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

  return <BlogPostClient post={post} related={related} forcedLang="ms" />;
}
