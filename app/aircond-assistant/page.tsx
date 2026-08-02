import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { AiAssistant } from "@/components/ai-assistant";

const PAGE_URL = "https://www.klrenovator.com/aircond-assistant";

export const metadata: Metadata = {
  title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Aircond Help"),
  description:
    "Ask KL Renovator's AI aircond expert anything: installation cost, gas top-up price, HP recommendation, service advice, troubleshooting & booking help. Trained on our real 2026 pricing.",
  alternates: buildCanonicalOnly("/aircond-assistant"),
  openGraph: {
    title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Help"),
    description:
      "Free AI aircond assistant for KL & Selangor — instant pricing, installation quotes, HP recommendations, gas type advice and booking help.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — AI Aircond Expert Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("AI Aircond Expert Assistant — Free 24/7 Help"),
    description: "Instant aircond pricing, quotes & service advice — free AI assistant.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-kuala-lumpur.webp"],
  },
};

export default function AiAssistantPage() {
  return (
    <ToolPageLayout
      eyebrow="Ask Anything — Free"
      h1="AI Aircond Expert Assistant"
      intro="Meet KL Renovator's aircond expert assistant — trained on the website's real 2026 service information and published pricing. Get accurate answers on installation costs, gas top-up prices, the right HP for your room, material charges, service recommendations, troubleshooting and booking — in seconds, 24/7."
      calculator={<AiAssistant />}
      howItWorksTitle="What the Assistant Knows"
      howItWorks={[
        "Pricing — it answers using KL Renovator's published 2026 price list only: services, per-HP installation rates, materials (copper pipe, wire, drain, casing, brackets), gas per PSI and bundle discounts.",
        "HP recommendation — give it your room size (e.g. \"12 x 10 ft\" or \"200 sqft\") and it recommends the right HP and BTU using the same formula as the BTU calculator.",
        "Installation estimates — it generates a professional estimated quotation with labour and material line items, based on the published installation table.",
        "Material estimation — copper pipe, electrical wire, drain pipe, PVC casing and brackets: it explains the free 7 ft, per-foot rates and what affects the total.",
        "Gas recommendation — R22 vs R410A vs R32: when each applies, the published per-PSI rates, and the reminder that final quantity is confirmed after technician inspection.",
        "Service recommendation & troubleshooting — not cooling, water leakage, bad smell, noise, ice formation, weak airflow or high bills: it explains the likely cause, the recommended service and why.",
        "FAQ & booking — warranty, operating hours, coverage areas, brands, payment, and step-by-step booking guidance with direct links.",
        "Never invented numbers — anything that needs an on-site inspection is always returned as a range or with the on-site confirmation disclaimer, and every answer links back to the relevant page.",
      ]}
      factors={[
        { title: "Published prices only", desc: "The assistant reads prices live from the same price list as the website (services from RM 99, chemical wash RM 120, overhaul RM 220, gas RM 2.50–3.00/PSI, installation RM 199+). It cannot quote prices that are not published." },
        { title: "HP-based pricing", desc: "Installation and servicing are priced by HP — 1.0–1.5 HP wall-mounted RM 199, 2.0 HP RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399, 5.0 HP RM 449. The assistant applies the right tier automatically." },
        { title: "Bundle discounts", desc: "It applies the same instant booking discounts as the website: 5% OFF for 4–10 units and 10% OFF for 10+ units on multi-unit quotes." },
        { title: "On-site confirmation", desc: "Exact gas PSI, drain routing, water pump sizing and high-rise access are always flagged as \"confirmed by the technician after on-site inspection\" — never quoted as false-precision figures." },
      ]}
      faqs={[
        { q: "What can the KL Renovator AI assistant do?", a: "It answers questions about aircond pricing (using the published 2026 price list), recommends the right HP for your room, generates installation quotations, estimates materials like copper pipe and wiring, advises on gas type (R22/R410A/R32), recommends the correct service from your symptoms, troubleshoots common problems (not cooling, leaks, smells, noise, ice, weak airflow, high bills), answers FAQs about warranty, hours and coverage, and guides you through booking." },
        { q: "Is the AI assistant accurate on prices?", a: "Yes — it reads directly from KL Renovator's published price list, the same figures on the service price page and installation price guide. It never invents prices. Where a final figure depends on an on-site inspection (e.g. exact gas PSI), it gives an honest range and the technician confirms the price before work begins." },
        { q: "Is the AI assistant free to use?", a: "Yes — completely free, no login or personal details required. It runs 24/7 and works on mobile, tablet and desktop. You can hand off to a real technician on WhatsApp at any time with one tap." },
        { q: "Does the assistant replace a real technician?", a: "No — it gives instant, accurate guidance based on the website's service knowledge, but the final diagnosis and price are always confirmed by a KL Renovator technician on-site. It is designed to help you choose the right service and book with confidence." },
        { q: "How do I book after using the assistant?", a: "The assistant explains the booking process step by step and links to the online booking form (klrenovator.com/book). You can also WhatsApp +60182983573 directly — mention what the assistant suggested and the technician will continue from there." },
      ]}
      webAppName="KL Renovator AI Aircond Expert Assistant"
      pageUrl={PAGE_URL}
      howToName="How to Use the KL Renovator AI Aircond Expert Assistant"
    />
  );
}
