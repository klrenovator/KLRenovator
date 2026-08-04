/**
 * Blog / article HTML sanitizer (audit item P0-05).
 *
 * Blog post bodies in `config/blog-posts.ts` (and the installation-blog
 * batches) are authored HTML rendered through `dangerouslySetInnerHTML`.
 * Although the content is written by the site owner rather than end users,
 * sanitising it at the server boundary guarantees that no unexpected tag,
 * attribute, URL scheme or inline handler can ever reach the browser DOM —
 * protecting against any future content source (CMS imports, guest posts,
 * AI-drafted copy) and against accidentally pasted markdown/HTML.
 *
 * Design:
 * - Strict tag allowlist matching exactly the HTML used by the prose styles
 *   (`h2/h3/p/ul/li/table/...`). Anything else is discarded (text kept).
 * - Attribute allowlist: `href/src/title/target/rel`, table `colspan/rowspan`,
 *   and `class` filtered to the one known-safe value used in blog bodies
 *   (`summary-block`). Inline `style`, event handlers (`on*`) and unknown
 *   attributes are stripped.
 * - URL scheme allowlist: `http`, `https`, `mailto`, `tel` + relative URLs.
 *   `javascript:`/`data:`/`vbscript:` hrefs are removed by sanitize-html.
 * - Results are memoised (blog bodies are static strings; repeated renders
 *   across SSG, SSR and client navigation reuse the cached output).
 */

import sanitizeHtml from "sanitize-html";
import type { BlogPost } from "@/config/blog-posts";

/** Tags allowed in article bodies (everything the prose styles use). */
const ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "sub",
  "sup",
  "a",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "div",
  "span",
  "details",
  "summary",
  "blockquote",
  "code",
  "pre",
  "hr",
  "figure",
  "figcaption",
];

/** Class values that are safe and actually used in blog body HTML. */
const ALLOWED_CLASSES = new Set(["summary-block"]);

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  "*": ["class"],
  a: ["href", "title", "target", "rel"],
  th: ["colspan", "rowspan", "align"],
  td: ["colspan", "rowspan", "align"],
  img: ["src", "alt", "width", "height", "loading", "decoding", "title"],
};

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRIBUTES,
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: true,
  // Discard disallowed tags but keep their text content (default mode) —
  // e.g. a stray <script>alert(1)</script> becomes just "alert(1)".
  disallowedTagsMode: "discard",
  transformTags: {
    "*": (tagName, attribs) => {
      if (attribs.class) {
        const kept = attribs.class
          .split(/\s+/)
          .filter((c) => ALLOWED_CLASSES.has(c));
        if (kept.length > 0) {
          attribs.class = kept.join(" ");
        } else {
          delete attribs.class;
        }
      }
      return { tagName, attribs };
    },
  },
};

/** Memoisation — blog bodies are static, so sanitise each unique string once. */
const CACHE_MAX = 512;
const sanitizeCache = new Map<string, string>();

export function sanitizeBlogHtml(html: string): string {
  const cached = sanitizeCache.get(html);
  if (cached !== undefined) return cached;
  const clean = sanitizeHtml(html, SANITIZE_OPTIONS);
  if (sanitizeCache.size >= CACHE_MAX) sanitizeCache.clear();
  sanitizeCache.set(html, clean);
  return clean;
}

/**
 * Returns a copy of the post with all three body variants sanitised.
 * Used by the server pages before the post is handed to the client
 * component — keeps sanitize-html out of the client bundle entirely.
 */
export function sanitizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    content: sanitizeBlogHtml(post.content),
    contentMS: sanitizeBlogHtml(post.contentMS),
    contentZH: sanitizeBlogHtml(post.contentZH),
  };
}
