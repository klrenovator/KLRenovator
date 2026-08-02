import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { InstallationCostCalculator } from "@/components/calculators/installation-cost-calculator";

const PAGE_URL = "https://www.klrenovator.com/aircond-installation-cost-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia — Free Quote"),
  description:
    "Free aircond installation cost calculator Malaysia. Estimate labour, copper pipe, wire, drain pipe, bracket, switch & water pump costs with bundle discounts. Get a confirmed quote from KL Renovator.",
  alternates: buildCanonicalOnly("/aircond-installation-cost-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia"),
    description:
      "Estimate your aircond installation cost instantly — labour, copper pipe, electrical wire, drain pipe, bracket & more. From RM 199 installation.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Installation Cost Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Installation Cost Calculator Malaysia"),
    description: "Instant aircond installation cost estimate — labour & materials with bundle discounts.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-wall-mounted-kl.webp"],
  },
};

export default function InstallationCostCalculatorPage() {
  return (
    <ToolPageLayout
      eyebrow="Free Instant Estimate"
      h1="Aircond Installation Cost Calculator"
      intro="Get an instant aircond installation cost estimate in Malaysia — labour, copper pipe, electrical wire, drain pipe, PVC casing, outdoor bracket, aircond switch and water pump, with multi-unit bundle discounts applied automatically. Every published KL Renovator price is used as-is; anything that needs on-site confirmation is clearly marked."
      calculator={<InstallationCostCalculator />}
      howItWorks={[
        "Select the number of units you need installed and the aircond type — wall-mounted, ceiling cassette or window unit.",
        "Choose the horsepower (HP) of each unit — installation labour is charged per HP exactly as published (RM 199 for 1.0–1.5 HP wall-mounted, RM 249 for 2.0 HP, RM 329 for 3.0 HP, and so on).",
        "Enter the copper pipe, electrical wire and drain pipe run lengths. The first 7 ft of each is free with every installation; anything beyond is charged per foot using the published HP-wise rates.",
        "Add optional items: PVC casing (RM 6–12/ft), outdoor bracket (standard RM 45 or heavy duty RM 70), aircond switch / plug point (RM 100) and a condensate water pump for concealed installs.",
        "The calculator applies the instant booking bundle discount — 5% OFF for 4–10 units and 10% OFF for 10+ units — and shows your full line-item breakdown.",
        "Send the estimate to KL Renovator on WhatsApp for a confirmed quotation, or book a slot online. Final pricing is confirmed before any work begins.",
      ]}
      factors={[
        { title: "Horsepower (HP)", desc: "Bigger units cost more to install: 1.0–1.5 HP wall-mounted is RM 199, 2.0 HP RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399, 5.0 HP RM 449. Ceiling cassette starts from RM 290." },
        { title: "Copper pipe length", desc: "7 ft is free. Extra copper pipe is RM 17/ft (1.0–1.5 HP), RM 23/ft (2.0–2.5 HP) and RM 27/ft (3.0 HP and above) — the single biggest price variable on most installs." },
        { title: "Electrical wire length", desc: "7 ft is free. Extra wire is RM 9/ft (1.0–1.5 HP), RM 13/ft (2.0–2.5 HP) and RM 17/ft (3.0–4.0 HP)." },
        { title: "Drain pipe & PVC casing", desc: "7 ft of drain pipe is free; extra run is estimated at RM 5/ft and confirmed on-site. PVC casing for exposed pipe/wire runs is RM 6–12/ft." },
        { title: "Bracket & switch", desc: "Standard outdoor bracket RM 45, heavy duty RM 70, indoor universal bracket RM 35, aircond switch / plug point RM 100 — all published prices." },
        { title: "Bundle discount", desc: "Install 4–10 units and get 5% OFF; 10+ units get 10% OFF. The discount applies to the whole installation package." },
      ]}
      faqs={[
        { q: "How much does aircond installation cost in Malaysia?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft of copper pipe, wiring and drain pipe, standard bracket, vacuum pump commissioning and a 1-month workmanship warranty. Ceiling cassette from RM 290, window unit from RM 199. 2.0 HP is RM 249, 2.5 HP RM 279, 3.0 HP RM 329, 4.0 HP RM 399 and 5.0 HP RM 449." },
        { q: "How much does copper pipe cost for aircond installation?", a: "The first 7 ft of copper pipe is free with installation. Beyond that, copper pipe is charged per foot by HP: RM 17/ft for 1.0–1.5 HP, RM 23/ft for 2.0–2.5 HP and RM 27/ft for 3.0 HP and above." },
        { q: "How much does aircond electrical wire cost per foot?", a: "The first 7 ft of electrical wire is free. Extra wire is RM 9/ft for 1.0–1.5 HP, RM 13/ft for 2.0–2.5 HP and RM 17/ft for 3.0–4.0 HP units." },
        { q: "Is there a discount for installing multiple aircond units?", a: "Yes — KL Renovator gives an instant booking discount on multi-unit installations: 5% OFF for 4–10 units and 10% OFF for 10+ units. This is applied automatically in the calculator and on your final quotation." },
        { q: "What is included in the RM 199 installation package?", a: "The RM 199 package (1.0–1.5 HP wall-mounted) includes 7 ft copper pipe, 7 ft wire, 7 ft drain pipe, standard outdoor bracket, vacuum pump commissioning, full installation labour and a 1-month written workmanship warranty. Anything beyond 7 ft, or extra items like PVC casing, aircond switch or a water pump, is charged separately using the published rates." },
        { q: "Do ceiling cassette installations include a water pump?", a: "Yes — ceiling cassette installation packages (from RM 290) include the drain pipe and condensate pump. For wall-mounted units in concealed or low-ceiling layouts, a water pump is an optional add-on estimated from the published RM 350–550 drain pump range and confirmed on-site." },
      ]}
      webAppName="KL Renovator Aircond Installation Cost Calculator"
      pageUrl={PAGE_URL}
      howToName="How to Calculate Your Aircond Installation Cost in Malaysia"
    />
  );
}
