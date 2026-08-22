"use client";

import dynamic from "next/dynamic";

/**
 * Homepage interactive tools (price calculator + diagnostic wizard) loaded
 * lazily WITHOUT server rendering. They sit below the fold and are pure
 * client-side widgets; keeping their full form markup out of the initial HTML
 * saves ~40 KB of document size for better mobile LCP/INP. Each calculator
 * still has its own fully server-rendered route (/tools, /btu-calculator,
 * /aircond-installation-cost-calculator, …) for SEO.
 */

const CalculatorLoading = () => (
  <div
    className="min-h-32 animate-pulse rounded-2xl bg-slate-100 p-6 text-center text-sm text-slate-600"
    role="status"
    aria-live="polite"
  >
    Loading free aircond tools…
  </div>
);

const PriceCalculator = dynamic(
  () =>
    import("@/components/price-calculator").then(
      (module) => module.PriceCalculator,
    ),
  { ssr: false, loading: CalculatorLoading },
);
const DiagnosticTool = dynamic(
  () =>
    import("@/components/diagnostic-tool").then(
      (module) => module.DiagnosticTool,
    ),
  { ssr: false, loading: CalculatorLoading },
);

export function HomeToolsLazy() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <DiagnosticTool />
      <PriceCalculator />
    </div>
  );
}
