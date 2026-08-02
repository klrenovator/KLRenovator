import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { DiagnosticTool } from "@/components/diagnostic-tool";

const PAGE_URL = "https://www.klrenovator.com/which-aircond-service-do-i-need";

export const metadata: Metadata = {
  title: clampMetaTitle("Which Aircond Service Do I Need? — Free Recommendation"),
  description:
    "Not sure if your aircond needs basic service, chemical wash, chemical overhaul, gas top-up or repair? Answer 4 quick questions and get a free service recommendation with pricing from KL Renovator.",
  alternates: buildCanonicalOnly("/which-aircond-service-do-i-need"),
  openGraph: {
    title: clampMetaTitle("Which Aircond Service Do I Need? Free Tool"),
    description:
      "Free aircond service recommendation tool — chemical wash, overhaul, gas top-up or repair. Answer a few questions and get the right service with clear pricing.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Which Aircond Service Do I Need? Free Recommendation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Which Aircond Service Do I Need? Free Tool"),
    description: "Answer 4 questions — get the right aircond service with pricing.",
    images: ["https://www.klrenovator.com/hero/aircond-chemical-service-canvas-wrap-kl.webp"],
  },
};

export default function WhichAircondServicePage() {
  return (
    <ToolPageLayout
      eyebrow="Free Smart Diagnosis"
      h1="Which Aircond Service Do I Need?"
      intro="Is your aircond cooling properly? Water leaking? Bad smell? Noisy? Weak airflow? Answer a few quick questions and this tool tells you whether you need a basic service, chemical wash, chemical overhaul, gas top-up, repair or inspection — with the reason for each recommendation and the published starting price."
      calculator={<DiagnosticTool />}
      howItWorks={[
        "Choose the main problem you are experiencing — not cold, water leaking, noise, bad smell, weak airflow, not turning on, tripping MCB, ice formation or remote issues.",
        "Answer one or two follow-up questions about severity and timing — e.g. did cooling stop suddenly or gradually, is the leak a drip or continuous flow.",
        "The tool matches your answers against common HVAC failure patterns and recommends the correct service: basic servicing (from RM 99), chemical wash (from RM 120), chemical overhaul (from RM 220), gas top-up (from RM 2.50/PSI), repair (diagnostic RM 88, waived with repair) or inspection.",
        "Each recommendation explains WHY it was made — the likely cause, the fix and how urgent it is.",
        "Send the diagnosis to KL Renovator on WhatsApp with one tap, or read the full problem guide linked in the result.",
        "A technician confirms the diagnosis on-site and gives you a fixed price before any work begins.",
      ]}
      factors={[
        { title: "Basic Service — RM 99", desc: "Filter cleaning and multi-point check. Right for routine 3–6 month maintenance when the unit cools fine, no smells, no leaks." },
        { title: "Chemical Wash — RM 120+", desc: "High-pressure internal coil cleaning. Right for weak airflow, musty smell, gradual cooling loss, or units not serviced in 12+ months." },
        { title: "Chemical Overhaul — RM 220+", desc: "Full dismantle and deep clean. Right for water leaking, ice formation, severe blockage — the permanent fix for drain problems." },
        { title: "Gas Top-up — RM 2.50/PSI", desc: "Precision refrigerant balancing with leak check. Right when cooling drops gradually over weeks or the outdoor unit runs but air stays warm." },
        { title: "Repair — Diagnostic RM 88", desc: "Component faults: capacitor, fan motor, PCB, sensor. Right for sudden failure, loud noise from the outdoor unit, or error codes. Diagnostic fee is waived if repaired same visit." },
        { title: "Inspection", desc: "When the problem is unclear or a unit has been untouched for years, an inspection gives a written quote for everything needed — no pressure to proceed." },
      ]}
      faqs={[
        { q: "How do I know if my aircond needs chemical wash or chemical overhaul?", a: "Chemical wash (RM 120+) cleans the coil in place — right for weak cooling, smells and slow airflow. Chemical overhaul (RM 220+) fully removes and dismantles the indoor unit — right when water is leaking, ice forms, or the unit has not been deep-cleaned in 2+ years. As a rule: wash for performance, overhaul for leaks and ice." },
        { q: "How often should an aircond be serviced in Malaysia?", a: "Basic servicing every 3–6 months, and a pressure chemical wash every 12 months — or every 6–8 months if the unit runs 8+ hours a day. Units near busy roads or construction sites need more frequent cleaning due to dust." },
        { q: "My aircond is not cold but the outdoor unit runs. What service do I need?", a: "This is most often low refrigerant gas or a failing capacitor. Book a diagnostic (RM 88, waived if repaired same visit) or a gas top-up with leak check. KL Renovator measures the pressure with a manifold gauge and confirms the cause on-site." },
        { q: "Why does my aircond smell bad?", a: "A musty smell means mould, bacteria and biofilm have built up on the evaporator coil and blower wheel — very common in KL's humidity. A pressure chemical wash (from RM 120) dissolves the biofilm and restores clean airflow. If the smell persists after washing, an overhaul may be needed." },
        { q: "How much does it cost to service an aircond in KL & Selangor?", a: "Basic service from RM 99, pressure chemical wash from RM 120 (1.0–1.5 HP wall-mounted), chemical overhaul from RM 220, gas top-up from RM 2.50/PSI (R22) or RM 3.00/PSI (R410A/R32). Ceiling cassette and commercial units are priced separately. Every price is confirmed before work begins." },
        { q: "Can you recommend the right aircond service for me?", a: "Yes — use this tool to get an instant recommendation, or WhatsApp +60182983573 with your symptoms (not cold, leaking, noise, smell, error code) and KL Renovator will advise the right service and a transparent price, same-day." },
      ]}
      webAppName="KL Renovator Aircond Service Recommendation Tool"
      pageUrl={PAGE_URL}
      howToName="How to Find the Right Aircond Service in Malaysia"
    />
  );
}
