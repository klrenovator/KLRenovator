/**
 * Homepage-only AEO / rich-result schemas.
 * Moved out of app/layout.tsx (v102) so FAQPage / HowTo / ItemList / Speakable
 * do NOT pollute every URL sitewide.
 *
 * PERF: previously shipped 12 FAQ questions + two HowTo schemas + an ItemList
 * (~16 KB, doubled in the RSC flight payload). Google retired HowTo rich
 * results for most sites (Aug 2023) and the extra FAQ entries duplicated the
 * /faq page, so this now ships one compact FAQPage matching the visible
 * homepage FAQs plus the small WebPage/Speakable descriptor.
 */
export function HomepageAeoSchemas() {
  return (
    <>
      {/* ── FAQ Schema — AEO / Answer Engine Optimization ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much does aircon installation cost in KL & Selangor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP including 7 ft copper pipe, wiring, drain pipe and vacuum commissioning. Ceiling cassette from RM 290. All prices confirmed before work begins.",
                },
              },
              {
                "@type": "Question",
                name: "How much does aircon chemical wash cost in KL?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chemical wash starts from RM 120 for wall-mounted 1.0–1.5 HP units and RM 220 for ceiling cassette. KL Renovator uses transparent pricing with no hidden fees.",
                },
              },
              {
                "@type": "Question",
                name: "Does KL Renovator offer same-day aircond service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Same-day aircond servicing is available across KL and Selangor. Book via WhatsApp at +60182983573 for the fastest response.",
                },
              },
              {
                "@type": "Question",
                name: "Which aircond brands does KL Renovator service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All 20 major brands including Daikin, Panasonic, Mitsubishi, York, Acson, Carrier, Midea, LG and Samsung — both inverter and non-inverter models.",
                },
              },
              {
                "@type": "Question",
                name: "What warranty does KL Renovator provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A 1-month written workmanship warranty on installation and a 3-month parts warranty on repairs. If an installation-related issue arises, we return and rectify at no cost.",
                },
              },
            ],
          }),
        }}
      />

      {/* ── WebPage + Speakable descriptor ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.klrenovator.com/#webpage",
            name: "KL Renovator — Aircond Installation & Servicing KL Selangor",
            url: "https://www.klrenovator.com",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2", ".speakable"],
            },
            about: { "@id": "https://www.klrenovator.com/#business" },
          }),
        }}
      />
    </>
  );
}
