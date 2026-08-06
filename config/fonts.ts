// Fonts — deliberate performance trade-off documented
//
// Decision (Aug 6 2026, deep audit P2-03 / P4-02):
// -------------------------------------------------
// The site previously intended to use Inter via next/font/google, but this introduces:
//   - Additional network request to Google Fonts (or self-hosted woff2 bundle)
//   - Flash of unstyled text / layout shift if font-display swaps
//   - Extra ~50-100 KB client payload for font files
//
// Current implementation uses system font stack (ui-sans-serif, system-ui, sans-serif)
// which renders as:
//   - San Francisco on macOS / iOS
//   - Segoe UI on Windows
//   - Roboto on Android
// This gives:
//   - Zero font-loading time, zero CLS from font swap
//   - Better Core Web Vitals (LCP, CLS)
//   - Consistent with Tailwind's default sans stack
//
// The mock exports below preserve the old `fontSans` / `fontMono` API so existing
// layout code (app/layout.tsx, components/site-root-layout.tsx) continues to work
// without changes. If brand ever requires true Inter, replace this file with:
//
//   import { Inter, JetBrains_Mono } from "next/font/google"
//   export const fontSans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" })
//   export const fontMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" })
//
// And remove the `--font-sans` fallback in styles/globals.css @theme block.
//
// For now, this is intentional — not a TODO or placeholder.
// See: deep-audit-progress.md P2-03 / P4-02

export const fontSans = {
  className: "font-sans",
  variable: "--font-sans",
  style: { fontFamily: "Inter, system-ui, sans-serif" },
};

export const fontMono = {
  className: "font-mono",
  variable: "--font-mono",
  style: { fontFamily: "Fira Code, monospace" },
};
