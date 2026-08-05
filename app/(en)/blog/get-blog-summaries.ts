import { allPosts, type BlogPostSummary } from "@/config/blog-posts";

/** Server-only: strip HTML bodies before sending posts to client blog index. */
export function getBlogPostSummaries(): BlogPostSummary[] {
  return allPosts.map(({ content: _c, contentMS: _ms, contentZH: _zh, ...summary }) => summary);
}
