/**
 * Reusable BreadcrumbList JSON-LD schema.
 *
 * Usage on any page (e.g. app/services/[slug]/page.tsx):
 *
 *   import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
 *
 *   <BreadcrumbSchema
 *     items={[
 *       { name: "Home", url: "https://www.klrenovator.com" },
 *       { name: "Services", url: "https://www.klrenovator.com/services" },
 *       { name: "Chemical Wash", url: "https://www.klrenovator.com/services/chemical-wash" },
 *     ]}
 *   />
 *
 * Drop it anywhere in the page's JSX (server or client component) — it just
 * renders a <script type="application/ld+json"> tag.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url,
          })),
        }),
      }}
    />
  );
}
