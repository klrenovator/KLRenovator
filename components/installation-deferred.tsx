"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Viewport-triggered island bundling the three heaviest below-the-fold
 * conversion blocks on installation pillar pages:
 *   • InstallationCROModule   (~17 KB of HTML)
 *   • InstallationTrustSignals (~12 KB of HTML)
 *   • InstallationProof        (~18 KB of HTML, photo grid + reviews)
 *
 * None of it is visible on first paint, so it now loads only when the
 * visitor scrolls near it — removing ~95 KB (DOM + RSC flight payload)
 * from the initial document of /aircond-installation-kl and its
 * MS/ZH equivalents.
 */

const LoadingBlock = () => (
  <div className="py-16" role="status" aria-live="polite">
    <div className="mx-auto max-w-5xl px-4">
      <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  </div>
);

const CRO = dynamic(
  () =>
    import("@/components/installation-cro-module").then(
      (m) => m.InstallationCROModule,
    ),
  { ssr: false, loading: LoadingBlock },
);
const TrustSignals = dynamic(
  () =>
    import("@/components/installation-trust-signals").then(
      (m) => m.InstallationTrustSignals,
    ),
  { ssr: false },
);
const Proof = dynamic(
  () => import("@/components/installation-proof").then((m) => m.InstallationProof),
  { ssr: false },
);

export function InstallationDeferred({
  locale,
  title,
  subtitle,
}: {
  locale: "en" | "ms" | "zh";
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight: 320 }}>
      {visible ? (
        <>
          <CRO
            title={title}
            subtitle={subtitle}
            showObjectionHandling
            showTrustSignals
            showPricingGuarantee
            showUSPBlock
          />
          <TrustSignals variant="default" />
          <Proof locale={locale} />
        </>
      ) : (
        <span className="sr-only">Conversion information</span>
      )}
    </div>
  );
}
