import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aircond Service FAQ — Pricing, Booking & Coverage | KL Renovator",
  description:
    "Frequently asked questions about KL Renovator's aircond services in KL & Selangor. Chemical wash from RM 120, overhaul from RM 220, gas top-up, repairs, same-day booking, warranty and coverage areas.",
  keywords: [
    "aircond service FAQ Malaysia",
    "aircon chemical wash price KL",
    "chemical wash price Malaysia 2026",
    "aircon service cost Selangor",
    "KL Renovator FAQ",
    "same day aircond repair KL",
    "aircon warranty Malaysia",
    "aircond not cold Malaysia",
    "chemical overhaul price KL",
    "gas top up price Malaysia",
  ].join(", "),
  alternates: {
    canonical: "https://www.klrenovator.com/faq",
  },
  openGraph: {
    title: "Aircond Service FAQ — Pricing, Booking & Coverage | KL Renovator",
    description:
      "Frequently asked questions about KL Renovator's aircond services. Chemical wash from RM 120, overhaul from RM 220, same-day service, 1-month warranty. All areas of KL & Selangor covered.",
    url: "https://www.klrenovator.com/faq",
    type: "website",
    images: [
      {
        url: "https://www.klrenovator.com/logo/image.png",
        width: 1200,
        height: 630,
        alt: "KL Renovator — Aircond Service FAQ KL & Selangor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aircond Service FAQ | KL Renovator",
    description: "Aircond pricing, booking and service FAQs for KL & Selangor. Chemical wash from RM 120.",
    images: ["https://www.klrenovator.com/logo/image.png"],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  // Server-side FAQPage schema for Google — the page itself uses client state
  // so we inject the schema here from the server side for proper crawling.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a chemical wash cost in KL & Selangor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chemical wash starts from RM 120 for a wall-mounted 1.0–1.5 HP unit. Ceiling cassette starts from RM 220. All prices confirmed before work begins — no hidden charges. KL Renovator serves all areas of Kuala Lumpur and Selangor.",
        },
      },
      {
        "@type": "Question",
        name: "Are there any hidden charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No hidden charges at all. KL Renovator provides a full quote before starting any work. Extra materials (copper pipe, brackets) are quoted and approved by you on-site before installation.",
        },
      },
      {
        "@type": "Question",
        name: "What is the emergency after-hours rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard hours are 9:00 AM to 6:00 PM Monday to Sunday. Jobs booked between 6:00 PM and 10:00 PM carry a mandatory overtime surcharge of RM 50. Total after-hours diagnostic fee is RM 138.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer volume discounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. 2–3 units: 5% off. 4–8 units: 10% off. 8+ units: 15% off. Discounts apply to labour charges. WhatsApp +60182983573 to confirm.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between chemical wash and chemical overhaul?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A chemical wash cleans the unit while it stays mounted on the wall — great for regular maintenance, starts from RM 120. A chemical overhaul fully dismantles the unit for a deep clean of every internal component — starts from RM 220, recommended for water leaking, ice formation, or units not serviced in 3+ years.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I service my aircond in Malaysia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For light use (evenings only), service every 6 months. For heavy use (8+ hours daily), every 3 months. A chemical wash is recommended annually regardless of usage due to Malaysia's high humidity.",
        },
      },
      {
        "@type": "Question",
        name: "My aircond is running but not cold. What is wrong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. Our technicians diagnose the exact issue and quote before any repair starts. Diagnostic fee is RM 88 (waived if repair is done on the same visit).",
        },
      },
      {
        "@type": "Question",
        name: "My aircond is leaking water. What should I do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Switch off the unit if leaking heavily to prevent damage. The most common cause is a blocked drain pipe — usually fixed with a basic service or chemical wash. If leaking continues, a chemical overhaul is likely needed to clean the drain pan and internal channels.",
        },
      },
      {
        "@type": "Question",
        name: "What gas type does my aircond use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check the sticker on your outdoor unit — it states the gas type (R22, R410A, or R32). Or WhatsApp us a photo of the outdoor unit sticker at +60182983573 and we will identify it for you.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer same-day aircond service in KL & Selangor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, same-day appointments are available subject to technician availability. WhatsApp +60182983573 early in the morning for the best chance of a same-day slot across KL and Selangor.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a warranty on your aircond work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All workmanship carries a 1-month warranty. Replaced parts carry a 3-month warranty. If any related issue arises within the warranty period, we return and inspect at no charge.",
        },
      },
      {
        "@type": "Question",
        name: "What areas does KL Renovator cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KL Renovator covers the entire Klang Valley — all areas of Kuala Lumpur and Selangor including Petaling Jaya, Ampang, Batu Caves, Cheras, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Selayang, Putrajaya, and Cyberjaya.",
        },
      },
      {
        "@type": "Question",
        name: "What aircond brands does KL Renovator service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KL Renovator services all major brands including Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Acson, Sharp, Toshiba and Haier. All inverter and non-inverter models. WhatsApp us if your brand is not listed.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
