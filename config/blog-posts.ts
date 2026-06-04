export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  relatedService: string;
  content: string;
};

export const allPosts: BlogPost[] = [
  {
    slug: "chemical-wash-vs-chemical-overhaul",
    title: "Chemical Wash vs Chemical Overhaul — What's the Difference?",
    excerpt:
      "Not sure whether your aircond needs a chemical wash or a full overhaul? This guide explains both services, what they include, and when to choose each one.",
    category: "Service Guide",
    tags: ["chemical wash", "chemical overhaul", "aircon cleaning", "KL Renovator", "aircond service"],
    date: "June 2025",
    readTime: 5,
    relatedService: "Chemical Overhaul",
    content: `
      <h2>What Is a Chemical Wash?</h2>
      <p>A <strong>chemical wash</strong> (also called a pressure chemical wash) is a deep-cleaning service where a trained technician sprays a chemical cleaning solution onto the evaporator coil and blower wheel while the unit remains mounted on the wall.</p>
      <p>High-pressure water is then used to rinse away dissolved dirt, mould, bacteria, and dust. The dirty water drains out through the unit's drainage pipe.</p>
      <h3>When Should You Get a Chemical Wash?</h3>
      <ul>
        <li>Your aircond smells musty or has a foul odour</li>
        <li>Cooling has become weak even though gas is fine</li>
        <li>You haven't cleaned the unit in over 12 months</li>
        <li>Dust or small insects visible inside the unit</li>
      </ul>
      <p>A chemical wash typically takes <strong>45–90 minutes per unit</strong> and starts from <strong>RM 120</strong> for a 1.0–1.5 HP wall-mounted unit.</p>

      <h2>What Is a Chemical Overhaul?</h2>
      <p>A <strong>chemical overhaul</strong> goes much further. The technician fully dismantles the indoor unit from the wall, removes every internal component, and bathes the coil, blower wheel, drain pan, and casing in a deep chemical solution.</p>
      <p>Every hidden corner is cleaned — areas a normal chemical wash cannot reach. The unit is then reassembled, reinstalled, and tested.</p>
      <h3>When Should You Get a Chemical Overhaul?</h3>
      <ul>
        <li>Water is leaking from your unit and a wash didn't fix it</li>
        <li>Ice is forming on the coil</li>
        <li>The unit hasn't been opened in 3+ years</li>
        <li>A chemical wash was done but cooling didn't improve</li>
        <li>Very heavy mould or blockage inside the unit</li>
      </ul>
      <p>A chemical overhaul takes <strong>2–3 hours per unit</strong> and starts from <strong>RM 220</strong>.</p>

      <h2>Side-by-Side Comparison</h2>
      <ul>
        <li><strong>Chemical Wash:</strong> Unit stays on wall · 45–90 mins · From RM 120 · Best for regular maintenance</li>
        <li><strong>Chemical Overhaul:</strong> Unit fully removed · 2–3 hours · From RM 220 · Best for severe cases</li>
      </ul>

      <h2>Which One Do You Need?</h2>
      <p>If your unit just needs a good clean and hasn't been serviced in over a year — a <strong>chemical wash</strong> is the right choice.</p>
      <p>If your unit is leaking water persistently, forming ice, or is heavily soiled — you need a <strong>chemical overhaul</strong>.</p>
      <p>Not sure? WhatsApp us a photo of your unit and we'll advise you honestly — no hard selling.</p>
    `,
  },
  {
    slug: "aircon-not-cold-reasons",
    title: "Aircon Running But Not Cold? 7 Common Causes in Malaysia",
    excerpt:
      "Your aircond is switched on but the room is still warm. Here are the 7 most common reasons why — and what to do about each one.",
    category: "Troubleshooting",
    tags: ["aircon not cold", "aircond warm air", "low gas aircon", "aircon repair KL", "HVAC troubleshoot"],
    date: "May 2025",
    readTime: 6,
    relatedService: "Troubleshooting & Repairs",
    content: `
      <h2>Why Is My Aircond Not Cold?</h2>
      <p>This is the most common complaint we receive at KL Renovator. The good news: most causes are fixable and don't require buying a new unit.</p>

      <h2>1. Low Refrigerant Gas</h2>
      <p>This is the <strong>most common reason</strong>. Refrigerant (R22, R410A, or R32) is what actually cools the air. If there's a slow leak over time, the gas level drops and your unit blows warm air.</p>
      <p><strong>Fix:</strong> A technician checks the pressure and tops up the gas. Costs from RM 80–200 depending on gas type and HP size.</p>

      <h2>2. Dirty Evaporator Coil</h2>
      <p>A coil caked in dust and mould cannot absorb heat efficiently. Even with sufficient gas, a dirty coil means warm, weak airflow.</p>
      <p><strong>Fix:</strong> Chemical wash or chemical overhaul depending on severity.</p>

      <h2>3. Faulty Capacitor</h2>
      <p>The capacitor helps start and run the compressor and fan motors. A failing capacitor means the compressor may not run at full power — resulting in poor cooling.</p>
      <p><strong>Fix:</strong> Capacitor replacement from RM 150.</p>

      <h2>4. Compressor Problems</h2>
      <p>The compressor is the heart of the system. If it's weak or failing, the unit cannot properly compress refrigerant and cooling suffers significantly.</p>
      <p><strong>Fix:</strong> Diagnosis required. Compressor replacement from RM 800–2,000.</p>

      <h2>5. Clogged Air Filter</h2>
      <p>A blocked filter restricts airflow dramatically. The unit works harder but delivers less cold air. This is the easiest fix of all.</p>
      <p><strong>Fix:</strong> Clean or replace the filter. You can do this yourself monthly.</p>

      <h2>6. Refrigerant Leak</h2>
      <p>If your unit loses gas repeatedly, there's likely a leak in the copper piping or connections. Topping up gas without fixing the leak is only a temporary solution.</p>
      <p><strong>Fix:</strong> Leak detection and repair from RM 88 diagnosis fee.</p>

      <h2>7. Undersized Unit for the Room</h2>
      <p>A 1.0 HP unit in a large master bedroom or open-plan area will never cool the space effectively. This is a sizing mismatch — not a fault.</p>
      <p><strong>Fix:</strong> Upgrade to a larger HP unit suitable for the room size.</p>

      <h2>Still Not Sure? Send Us a Photo</h2>
      <p>WhatsApp us a photo of your outdoor unit's label (it shows the model and gas type). Our technicians can give you an accurate diagnosis and quote within 30 minutes.</p>
    `,
  },
  {
    slug: "how-often-service-aircon-malaysia",
    title: "How Often Should You Service Your Aircond in Malaysia?",
    excerpt:
      "Malaysia's heat and humidity means your aircond works harder than most. Here's the recommended servicing schedule based on usage type and unit age.",
    category: "Maintenance",
    tags: ["aircond service frequency", "aircon maintenance schedule", "how often service aircon", "Malaysia aircond"],
    date: "April 2025",
    readTime: 4,
    relatedService: "Basic Servicing / Routine Maintenance",
    content: `
      <h2>Why Malaysia's Climate Demands More Frequent Servicing</h2>
      <p>Malaysia sits on the equator. Year-round heat and humidity means most homes and offices run their aircond <strong>8–12 hours per day</strong> — far more than countries with seasonal climates.</p>
      <p>More runtime = more dust accumulation, more mould growth, and faster wear on components. This is why the servicing schedule for Malaysia is different from Western countries.</p>

      <h2>Recommended Service Intervals</h2>
      <h3>Light Use (4–6 hours/day): Every 6 Months</h3>
      <p>If you run your aircond mainly in the evenings or for sleeping only, a basic service every 6 months keeps it running efficiently.</p>

      <h3>Heavy Use (8–12 hours/day): Every 3 Months</h3>
      <p>Office environments, shops, or homes where the aircond runs most of the day need servicing every 3 months. Dust and mould build up fast.</p>

      <h3>Chemical Wash: Every 12–18 Months</h3>
      <p>Regardless of how often you do basic servicing, a chemical wash is recommended annually. It removes deep mould and bacteria that surface cleaning cannot reach.</p>

      <h3>Chemical Overhaul: Every 3–5 Years</h3>
      <p>For heavy-use units, a full chemical overhaul every 3–5 years ensures the internal components remain in top condition and extends the unit's lifespan significantly.</p>

      <h2>Warning Signs You Need Servicing NOW</h2>
      <ul>
        <li>Bad smell when the aircon turns on</li>
        <li>Water dripping from the indoor unit</li>
        <li>Cooling is noticeably weaker than before</li>
        <li>Unit makes unusual sounds (rattling, hissing, clicking)</li>
        <li>Your electricity bill has suddenly increased</li>
      </ul>

      <h2>The Cost of Skipping Service</h2>
      <p>An unserviced aircon uses <strong>up to 25% more electricity</strong> to deliver the same cooling. A RM 99 basic service can save you significantly more on your monthly TNB bill.</p>
      <p>More importantly, skipping service leads to compressor damage — the most expensive repair at RM 800–2,000.</p>
    `,
  },
  {
    slug: "r32-r410a-r22-gas-difference",
    title: "R22 vs R410A vs R32 Refrigerant Gas — Which Does Your Aircon Use?",
    excerpt:
      "Confused about refrigerant gas types? Here's a simple guide to R22, R410A, and R32 — how to identify which one your unit uses and what top-up costs to expect.",
    category: "Technical Guide",
    tags: ["R32 gas", "R410A gas", "R22 freon", "refrigerant top up Malaysia", "aircond gas KL"],
    date: "March 2025",
    readTime: 5,
    relatedService: "Gas Top-Up (R22, R410A, R32)",
    content: `
      <h2>Why Does Gas Type Matter?</h2>
      <p>Different aircond models use different refrigerant gases. Using the wrong type can damage your compressor and void your warranty. Understanding your gas type also helps you understand top-up costs.</p>

      <h2>R22 (Freon) — The Old Standard</h2>
      <p>R22 was the standard refrigerant for decades. Most aircond units manufactured before 2010 use R22.</p>
      <p><strong>Key facts:</strong></p>
      <ul>
        <li>Older technology — many R22 units are now 10–15+ years old</li>
        <li>R22 is being phased out globally due to environmental impact</li>
        <li>Still available in Malaysia but prices have increased</li>
        <li>Top-up cost: RM 80–160 depending on HP size</li>
      </ul>
      <p><strong>If your unit uses R22</strong> and it's 10+ years old, consider upgrading to a modern R32 inverter unit — the energy savings pay for themselves quickly.</p>

      <h2>R410A — The Transition Gas</h2>
      <p>R410A replaced R22 in most units manufactured between 2010–2020. It's more environmentally friendly than R22 but still being phased out in favour of R32.</p>
      <ul>
        <li>Most mid-range units from 2010–2020 use R410A</li>
        <li>Better efficiency than R22</li>
        <li>Top-up cost: RM 100–180 depending on HP size</li>
      </ul>

      <h2>R32 — The Modern Standard</h2>
      <p>R32 is now the standard in most new inverter aircond units (Daikin, Panasonic, Mitsubishi, Midea). It has a significantly lower environmental impact and better energy efficiency.</p>
      <ul>
        <li>All modern (post-2020) units use R32</li>
        <li>Better cooling efficiency per kg of gas</li>
        <li>Top-up cost: RM 130–200 depending on HP size</li>
      </ul>

      <h2>How to Find Out Which Gas Your Unit Uses</h2>
      <p>Look at the <strong>sticker on your outdoor unit</strong>. It will clearly state the refrigerant type (R22, R410A, or R32) along with the required charge amount.</p>
      <p>You can also WhatsApp us a photo of the outdoor unit sticker — we'll identify the gas type and quote you accurately.</p>

      <h2>Important: Never Mix Gas Types</h2>
      <p>Adding R410A to an R22 system (or vice versa) will cause serious damage. Always use the gas type specified on your unit's label.</p>
    `,
  },
  {
    slug: "aircond-water-leaking-causes",
    title: "Aircon Water Leaking? Here Are the Most Common Causes & Fixes",
    excerpt:
      "Water dripping from your indoor aircond unit is one of the most common problems in Malaysia. Here's what causes it and how to fix it properly.",
    category: "Troubleshooting",
    tags: ["aircond water leaking", "aircon dripping water", "aircon leak repair KL", "aircond drain blocked"],
    date: "February 2025",
    readTime: 4,
    relatedService: "Troubleshooting & Repairs",
    content: `
      <h2>Why Is My Aircond Leaking Water?</h2>
      <p>Water leaking from an indoor aircond unit is a <strong>very common issue</strong> in Malaysia — especially during hot, humid months. The good news: most causes are fixable without replacing the unit.</p>

      <h2>Cause 1: Blocked Drain Pipe (Most Common)</h2>
      <p>Your aircond produces condensation as it cools the air. This water drains out through a pipe. Over time, algae, mould, and dust can block this pipe — causing water to back up and overflow into the room.</p>
      <p><strong>Fix:</strong> Drain pipe cleaning, included in our basic service (from RM 99).</p>

      <h2>Cause 2: Dirty Evaporator Coil</h2>
      <p>A heavily soiled coil can cause ice to form. When the unit switches off, the ice melts rapidly — producing more water than the drain can handle.</p>
      <p><strong>Fix:</strong> Chemical wash to clean the coil. From RM 120.</p>

      <h2>Cause 3: Low Refrigerant Gas</h2>
      <p>When gas pressure is too low, the evaporator coil gets too cold and freezes. The resulting ice melt causes excessive water leaking.</p>
      <p><strong>Fix:</strong> Gas top-up after identifying and fixing any leak. From RM 80.</p>

      <h2>Cause 4: Cracked or Disconnected Drain Pan</h2>
      <p>The internal drain pan collects condensation. If it's cracked or misaligned (common after rough handling), water leaks directly from the unit.</p>
      <p><strong>Fix:</strong> Chemical overhaul with drain pan inspection and realignment. From RM 220.</p>

      <h2>Cause 5: Poor Installation</h2>
      <p>If your unit was installed without proper slope, water cannot flow to the drain pipe and pools inside the casing instead.</p>
      <p><strong>Fix:</strong> Unit remounting with correct slope.</p>

      <h2>Should You Keep Using a Leaking Aircond?</h2>
      <p>We recommend switching it off if water is dripping heavily. Prolonged leaking can damage walls, ceilings, electrical fittings, and furniture. Call us to diagnose the problem quickly.</p>
    `,
  },
  {
    slug: "best-aircond-brands-malaysia-2025",
    title: "Best Aircond Brands in Malaysia 2025 — Daikin, Panasonic, Mitsubishi Compared",
    excerpt:
      "Choosing a new aircond in Malaysia? Here's an honest comparison of the top brands — Daikin, Panasonic, Mitsubishi, Midea, and Samsung — to help you decide.",
    category: "Buying Guide",
    tags: ["best aircond Malaysia 2025", "Daikin vs Panasonic", "Mitsubishi aircond review", "inverter aircon KL", "buy aircond Malaysia"],
    date: "January 2025",
    readTime: 7,
    relatedService: "New Unit Installation",
    content: `
      <h2>Choosing the Right Aircond Brand in Malaysia</h2>
      <p>With so many brands available — Daikin, Panasonic, Mitsubishi, Midea, Samsung, York, LG — it's easy to feel overwhelmed. This guide focuses on what actually matters for Malaysian conditions: reliability, energy efficiency, and after-sales service.</p>

      <h2>Daikin — Premium Choice, Excellent Reliability</h2>
      <p>Daikin is widely considered the gold standard for residential and commercial airconditioning in Malaysia. Their R32 inverter models are consistently rated top for energy efficiency.</p>
      <ul>
        <li><strong>Pros:</strong> Excellent long-term reliability, strong after-sales network, quiet operation, great warranty support</li>
        <li><strong>Cons:</strong> Price premium — typically 15–25% more expensive than competing brands</li>
        <li><strong>Best for:</strong> Master bedrooms, living rooms, long-term investment</li>
      </ul>

      <h2>Panasonic — Best Value Mid-Range</h2>
      <p>Panasonic offers excellent build quality at a lower price point than Daikin. Their inverter series consistently wins energy efficiency awards and they have strong service centre coverage across Malaysia.</p>
      <ul>
        <li><strong>Pros:</strong> Good value, reliable, widely available parts</li>
        <li><strong>Cons:</strong> Some older models have known capacitor issues after 5–7 years</li>
        <li><strong>Best for:</strong> Budget-conscious buyers who want quality without the premium price</li>
      </ul>

      <h2>Mitsubishi Electric — Ultra-Quiet & Premium</h2>
      <p>Mitsubishi Electric's inverter units are among the quietest available. Popular in condominiums and bedrooms where noise is a concern.</p>
      <ul>
        <li><strong>Pros:</strong> Extremely quiet, excellent build quality, good longevity</li>
        <li><strong>Cons:</strong> Higher price, fewer service centres than Daikin/Panasonic</li>
        <li><strong>Best for:</strong> Bedrooms, offices where noise is critical</li>
      </ul>

      <h2>Midea — Best Budget Option</h2>
      <p>Midea has improved dramatically in quality over the past 5 years. For rental properties or secondary rooms where budget is tight, Midea offers decent performance at the lowest price point.</p>
      <ul>
        <li><strong>Pros:</strong> Most affordable, good basic cooling</li>
        <li><strong>Cons:</strong> Build quality not as consistent as Japanese brands, shorter typical lifespan</li>
        <li><strong>Best for:</strong> Rental units, budget installs, secondary rooms</li>
      </ul>

      <h2>Our Recommendation</h2>
      <p>For most Malaysian households: <strong>Daikin or Panasonic inverter</strong> (R32) — whichever fits your budget. The energy savings from inverter technology typically pay back the price difference within 2–3 years.</p>
      <p>We install all brands. WhatsApp us if you need help choosing the right brand and HP size for your room.</p>
    `,
  },
];
