import { allPosts, type BlogPost, type BlogPostSummary } from "@/config/blog-posts";

export type RelatedBlogPost = BlogPostSummary;

function toSummary(post: BlogPost): BlogPostSummary {
  const { content: _c, contentMS: _ms, contentZH: _zh, ...summary } = post;
  return summary;
}

/**
 * Score related posts by category / service / tags, return top N without HTML bodies.
 * Keeps blog post client payload small (related cards only need listing fields).
 */
export function getRelatedPosts(slug: string, limit = 3): RelatedBlogPost[] {
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return [];

  return allPosts
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
    .slice(0, limit)
    .map((x) => toSummary(x.post));
}
