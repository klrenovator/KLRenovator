import NextLink from "next/link";

import type { MoneyCrossBlock } from "@/config/orphan-cross-links";

/**
 * Renders a short in-body paragraph with inline contextual links.
 * Deliberately not a "related pages" card grid — those inflate
 * cross-template Jaccard and look like chrome to the extractor.
 */
export function MoneyCrossLinks({ block }: { block: MoneyCrossBlock | null }) {
  if (!block || block.parts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-2">
        {block.eyebrow}
      </p>
      <h3 className="text-base font-black text-slate-900 mb-3">{block.heading}</h3>
      <p className="text-sm leading-relaxed text-slate-700">
        {block.parts.map((p, i) =>
          p.k === "t" ? (
            <span key={i}>{p.v}</span>
          ) : (
            <NextLink
              key={i}
              href={p.href}
              className="font-bold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900 hover:decoration-sky-500"
            >
              {p.v}
            </NextLink>
          ),
        )}
      </p>
    </div>
  );
}
