import { getBlogPostSummaries } from "./get-blog-summaries";
import BlogIndexClient from "./blog-index-client";

export default function BlogPage() {
  const posts = getBlogPostSummaries();
  return <BlogIndexClient posts={posts} initialLang="en" />;
}
