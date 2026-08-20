import type { BlogPost } from "@/config/blog-posts";
import { selectExplainerBundle, type ExplainerBundle } from "@/lib/aeo-explainer-select";

/**
 * Resolve the definition + comparison blocks for one blog post.
 *
 * Called from the server component of all three blog routes so the glossary
 * itself never ships to the browser — only the two or three entries a given
 * post actually earned. All three locales are resolved because the
 * unprefixed `/blog/[slug]` route switches language client-side.
 */
export function explainersForPost(post: BlogPost): ExplainerBundle {
  return selectExplainerBundle({
    seed: post.slug,
    html: {
      en: post.content,
      ms: post.contentMS,
      zh: post.contentZH,
    },
  });
}
