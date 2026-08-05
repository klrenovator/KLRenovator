import { getBlogPostSummaries } from "./get-blog-summaries";
export const metadata = {
  title: "Aircond Blog — Tips, Guides & Maintenance Advice KL & Selangor",
  description: "Expert aircond maintenance tips, chemical wash guides, brand comparisons and repair advice for Kuala Lumpur and Selangor.",
};

import BlogIndexClient from "./blog-index-client";

export default function BlogPage() {
  const posts = getBlogPostSummaries();
  return <BlogIndexClient posts={posts} initialLang="en" />;
}
