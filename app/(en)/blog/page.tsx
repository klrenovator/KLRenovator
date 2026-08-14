import { getBlogPostSummaries } from "./get-blog-summaries";
import { padMetaDescription } from "@/lib/seo-description-optimizer";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
export const metadata = {
  title: clampMetaTitle("Aircond Blog — Tips, Guides & Maintenance Advice KL Selangor"),
  description: padMetaDescription("Expert aircond maintenance tips, chemical wash guides, brand comparisons and repair advice for Kuala Lumpur and Selangor."),
};

import BlogIndexClient from "./blog-index-client";

export default function BlogPage() {
  const posts = getBlogPostSummaries();
  return <BlogIndexClient posts={posts} initialLang="en" />;
}
