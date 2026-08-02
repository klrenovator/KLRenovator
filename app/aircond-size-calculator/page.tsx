import type { Metadata } from "next";
import { clampMetaTitle } from "@/lib/seo-title-optimizer";
import { buildCanonicalOnly } from "@/lib/hreflang-canonical";
import { ToolPageLayout } from "@/components/calculators/tool-page-layout";
import { SizeCalculator } from "@/components/calculators/size-calculator";

const PAGE_URL = "https://www.klrenovator.com/aircond-size-calculator";

export const metadata: Metadata = {
  title: clampMetaTitle("Aircond Size Calculator Malaysia — Room Size to HP"),
  description:
    "Free aircond size calculator Malaysia. Enter room size, type, usage & heat exposure to find the recommended HP, BTU and suitable aircond capacity. Accurate room-size-to-HP guide from KL Renovator.",
  alternates: buildCanonicalOnly("/aircond-size-calculator"),
  openGraph: {
    title: clampMetaTitle("Aircond Size Calculator Malaysia — Room to HP"),
    description:
      "Find the right aircond HP & BTU for your room — room size, type, usage and heat exposure. Get the correct capacity before you buy.",
    url: PAGE_URL,
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Size Calculator Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clampMetaTitle("Aircond Size Calculator Malaysia"),
    description: "Room size to HP & BTU — find the right aircond capacity.",
    images: ["https://www.klrenovator.com/hero/aircond-installation-ampang-selangor.webp"],
  },
};

export default function AircondSizeCalculatorPage() {
  return (
    <ToolPageLayout
      eyebrow="Free Instant Estimate"
      h1="Aircond Size Calculator"
      intro="Find the right aircond capacity for your room in Malaysia. Enter your room size, room type, usage intensity and heat exposure — the calculator recommends the exact HP, BTU and suitable aircond capacity, using the standard Malaysian sizing formula (~25 BTU per square foot with adjustments)."
      calculator={<SizeCalculator />}
      howItWorks={[
        "Enter your room length and width in feet — the calculator works out the area in square feet automatically.",
        "Choose the room type: bedroom, master bedroom, living room, home office, kitchen or shop/retail. Kitchens and shops need more cooling power.",
        "Select the usage intensity — light, standard or heavy (12+ hours a day or unusually hot rooms).",
        "Select the heat exposure — low (shaded/north-facing), medium (partial sun) or high (west-facing or top floor).",
        "The calculator applies the standard formula: area × 25 BTU, adjusted by room type, usage and heat exposure multipliers.",
        "The result shows the recommended HP, BTU and suitable aircond capacity — plus the installation starting price for that size.",
      ]}
      factors={[
        { title: "Room size (sqft)", desc: "The base rule: ~25 BTU per square foot. A 120 sqft bedroom needs about 9,000 BTU (1.0 HP); a 250 sqft living room needs about 12,000–18,000 BTU (1.5–2.0 HP)." },
        { title: "Room type", desc: "Master bedrooms (+10%), living rooms (+15%), kitchens (+30%) and shops/retail (+25%) need more cooling than standard bedrooms." },
        { title: "Usage intensity", desc: "Rooms used 12+ hours a day, or rooms with lots of electronics and appliances, need ~15% more capacity (heavy usage multiplier)." },
        { title: "Heat exposure", desc: "West-facing rooms and top-floor units absorb much more heat — up to 25% more capacity is needed (high exposure multiplier)." },
        { title: "Ceiling height", desc: "Rooms with ceilings above 10 ft need extra capacity — about 10% more per extra foot. Use the BTU calculator for a detailed height-adjusted estimate." },
        { title: "People & windows", desc: "Each person beyond two adds about 600 BTU, and each large window beyond the first adds about 600 BTU. The detailed BTU calculator includes both." },
      ]}
      faqs={[
        { q: "What size aircond do I need for a 12x10 room?", a: "A 12×10 ft room is 120 sqft. Using the standard formula it needs about 9,000 BTU — a 1.0 HP aircond is the right size for a normal bedroom with standard sun exposure." },
        { q: "How many square feet does a 1.5 HP aircond cool?", a: "A 1.5 HP aircond (12,000 BTU) typically cools 150–250 sqft. It suits larger master bedrooms, small living rooms and home offices. For rooms above 250 sqft, consider 2.0 HP (up to 380 sqft)." },
        { q: "What HP aircond do I need for a living room in Malaysia?", a: "A typical Malaysian living room of 200–300 sqft needs 1.5–2.0 HP. West-facing or open-concept living rooms with high heat exposure should go up a size — 2.0–2.5 HP — to avoid long cooling times and high electricity bills." },
        { q: "How many BTU do I need per square foot?", a: "The Malaysian standard is about 25 BTU per square foot, adjusted for room type, sun exposure, ceiling height, occupants and windows. A 100 sqft bedroom ≈ 2,500 BTU base before adjustments ≈ 1.0 HP (9,000 BTU)." },
        { q: "What happens if my aircond is the wrong size?", a: "An undersized unit runs non-stop, never cools properly and wastes electricity. An oversized unit short-cycles — it cools the air quickly but never dehumidifies properly, which makes the room feel cold and damp, and it wears out faster. Getting the size right matters as much as the brand." },
        { q: "Is 1.5 HP enough for a master bedroom?", a: "Usually yes — most Malaysian master bedrooms are 150–250 sqft, which is exactly the 1.5 HP sweet spot. If your master bedroom is west-facing, has high ceilings or large windows, check the detailed BTU calculator — you may need 2.0 HP." },
      ]}
      webAppName="KL Renovator Aircond Size Calculator"
      pageUrl={PAGE_URL}
      howToName="How to Choose the Right Aircond Size for Your Room"
    />
  );
}
