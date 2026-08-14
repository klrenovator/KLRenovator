/**
 * Master FAQ Pool — INS-23
 * Aggregates the best FAQs from all site sources into one authoritative hub.
 * Sources: services-data.ts, installation pages, problem pages, pricing pages, existing FAQ page.
 * Target: 100+ questions per language (EN/MS/ZH), deduplicated, curated.
 */

export interface MasterFaqItem {
  category: string;
  q: string;
  a: string;
  source?: string; // optional link back to source page
}

export type Lang = "en" | "ms" | "zh";

// ─── CATEGORY DEFINITIONS ───────────────────────────────────────────────────────
export const FAQ_CATEGORIES: Record<Lang, { key: string; label: string }[]> = {
  en: [
    { key: "all", label: "All Questions" },
    { key: "installation", label: "Installation" },
    { key: "servicing", label: "Servicing" },
    { key: "chemical-wash", label: "Chemical Wash" },
    { key: "overhaul", label: "Overhaul" },
    { key: "gas-topup", label: "Gas Top-Up" },
    { key: "repair", label: "Repair" },
    { key: "pricing", label: "Pricing" },
    { key: "booking", label: "Booking" },
    { key: "warranty", label: "Warranty & Trust" },
    { key: "coverage", label: "Coverage Areas" },
    { key: "brands", label: "Brands" },
    { key: "btu-sizing", label: "BTU & Sizing" },
  ],
  ms: [
    { key: "all", label: "Semua Soalan" },
    { key: "installation", label: "Pemasangan" },
    { key: "servicing", label: "Servis" },
    { key: "chemical-wash", label: "Cuci Kimia" },
    { key: "overhaul", label: "Overhaul" },
    { key: "gas-topup", label: "Tambah Gas" },
    { key: "repair", label: "Pembaikan" },
    { key: "pricing", label: "Harga" },
    { key: "booking", label: "Tempahan" },
    { key: "warranty", label: "Waranti & Amanah" },
    { key: "coverage", label: "Kawasan Liputan" },
    { key: "brands", label: "Jenama" },
    { key: "btu-sizing", label: "BTU & Saiz" },
  ],
  zh: [
    { key: "all", label: "全部问题" },
    { key: "installation", label: "安装" },
    { key: "servicing", label: "保养" },
    { key: "chemical-wash", label: "化学清洗" },
    { key: "overhaul", label: "化学大修" },
    { key: "gas-topup", label: "充冷媒" },
    { key: "repair", label: "维修" },
    { key: "pricing", label: "价格" },
    { key: "booking", label: "预约" },
    { key: "warranty", label: "保修与信赖" },
    { key: "coverage", label: "覆盖范围" },
    { key: "brands", label: "品牌" },
    { key: "btu-sizing", label: "BTU 与选型" },
  ],
};

// ─── MOST ASKED (TOP 10) — shown at the top of the FAQ page ─────────────────────
export const MOST_ASKED_CATEGORIES = [
  "pricing",
  "installation",
  "servicing",
  "booking",
  "warranty",
  "repair",
  "gas-topup",
  "chemical-wash",
  "coverage",
  "brands",
];

// ─── ENGLISH FAQ POOL (105 questions) ───────────────────────────────────────────
const EN_FAQS: MasterFaqItem[] = [
  // ─── INSTALLATION (18 questions) ────────────────────────────────────────────
  { category: "installation", q: "How much does aircond installation cost in KL & Selangor 2026?", a: "Wall-mounted installation starts from RM 199 for 1.0–1.5 HP, RM 249 for 2.0 HP, RM 279 for 2.5 HP, and RM 329 for 3.0 HP. Ceiling cassette from RM 290. Window unit from RM 199. Every price includes 7ft copper piping, wiring, vacuum pump evacuation, leak test and commissioning — all confirmed before we start.", source: "/installation-price-malaysia" },
  { category: "installation", q: "What does the RM 199 base installation include?", a: "The RM 199 base package includes: site survey, 7ft correctly-sized Type L copper pipe, insulation, electrical wiring through conduit, PVC drainage with vibration pads, mandatory two-stage vacuum evacuation (min 15 min), vacuum pump commissioning (500 microns), full commissioning, and written job card with 1-month workmanship warranty.", source: "/aircond-installation-kl" },
  { category: "installation", q: "How long does aircond installation take?", a: "Standard wall-mounted installation takes 2–3 hours for a single unit. Ceiling cassette takes 3–4 hours. Two units on the same day take about 5–6 hours. We never rush — proper vacuum evacuation alone takes a minimum 15–20 minutes.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Do you vacuum the system during installation?", a: "Yes, absolutely. We perform a two-stage vacuum pump evacuation for a minimum of 15–20 minutes on every installation. Proper vacuuming removes moisture and air from the refrigerant lines, which is essential to protect the compressor and ensure optimal cooling performance. Any installer who skips this step is cutting corners.", source: "/aircond-installation-kl" },
  { category: "installation", q: "What copper pipe do you use for installation?", a: "We use Type L copper pipe, correctly sized for each unit's HP rating. Type L has thicker walls than the cheaper Type M, making it more durable and resistant to leaks over time. All piping is cleanly prepared during brazing to prevent internal oxidation.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Can you install aircond in a condo or apartment?", a: "Yes, we are experienced with condo installations across KL and Selangor. We work within building management rules, coordinate outdoor unit placement on approved ledges or balconies, and handle JMB/MC approval requirements. We also manage after-hours scheduling where buildings restrict daytime drilling.", source: "/new-home-aircond-installation" },
  { category: "installation", q: "What warranty comes with installation?", a: "Every installation carries a 1-month workmanship warranty. If our work causes a gas leak, no cooling, or drainage issues within that period, we return and fix it free of charge. Replaced parts carry a 3-month warranty. Additionally, our installation follows all manufacturer guidelines so your original brand warranty remains fully protected.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Do you provide electrical wiring for the new unit?", a: "Yes. We run electrical wiring through proper PVC conduit from the isolator to the indoor unit. For larger units (2.5 HP and above), we install a dedicated MCB circuit to ensure safe operation. We also fit an outdoor isolator switch for safety and maintenance access.", source: "/aircond-installation-kl" },
  { category: "installation", q: "What insulation do you use on copper pipes?", a: "We use closed-cell insulation — 9mm standard for liquid lines and 13mm for gas lines on most installations. For ceiling cassette and longer pipe runs, we use 19mm thickness. Proper insulation prevents condensation, energy loss, and water dripping along pipe runs.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Can you install a ceiling cassette aircond?", a: "Yes. Ceiling cassette installations are available from RM 290. We handle the ceiling cut-out, suspension mounting, drain pump setup (where gravity drainage isn't possible), and all electrical work. Cassette installations typically take 3–4 hours and are ideal for offices, restaurants, and large open-plan living areas.", source: "/ceiling-cassette-aircond-installation-kl" },
  { category: "installation", q: "Do you install window unit airconds?", a: "Yes. Window unit installation starts from RM 199. We ensure a secure fit with proper sealing to prevent rain and insect ingress, correct electrical connection, and test all functions before handover. Window units are a great budget option for rental properties and older buildings.", source: "/window-unit-aircond-installation-kl" },
  { category: "installation", q: "Can you install aircond during the rainy season?", a: "Yes, installations proceed year-round in Malaysia. During heavy rain, we ensure the outdoor unit has proper weather protection and that all wall penetrations are sealed with weatherproof silicone. Indoor work is unaffected by weather.", source: "/aircond-installation-kl" },
  { category: "installation", q: "What if my house has old wiring?", a: "Our technician will check your electrical circuit capacity during the site survey. If the existing wiring cannot safely handle the aircond load, we will advise you on the MCB upgrade needed. We never install on undersized circuits — safety comes first.", source: "/aircond-installation-kl" },
  { category: "installation", q: "How do you handle drainage for installation?", a: "We install PVC drain pipe with a minimum 1:100 gradient to ensure condensate flows freely by gravity. For installations where gravity drainage isn't possible (e.g., interior rooms far from external walls), we install a condensate pump. Every drain line is tested with water before handover.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Do you dismantle and relocate existing aircond units?", a: "Yes. Dismantling and relocation is available from RM 150 per unit. We carefully disconnect, cap refrigerant lines, dismantle both indoor and outdoor units, and reinstall at the new location with fresh copper pipe and vacuum commissioning.", source: "/services/dismantling-relocation" },
  { category: "installation", q: "What is the maximum pipe length for installation?", a: "For most residential split units, the maximum recommended pipe length is 15–20 meters depending on brand and HP. Beyond 7ft (included in base price), additional copper pipe is charged per foot. Longer runs may slightly reduce cooling efficiency, which we advise during the site survey.", source: "/installation-price-malaysia" },
  { category: "installation", q: "Do you install aircond for new homes?", a: "Yes, new home installation is one of our core services. We offer whole-house packages with volume discounts — 5+ units get 5% OFF Instant Booking Discount, 10+ units get 10% OFF Instant Booking Discount. We coordinate with your renovation timeline to install at the optimal stage.", source: "/new-home-aircond-installation" },
  { category: "installation", q: "Do you offer commercial aircond installation?", a: "Yes. We handle commercial installations for offices, shoplots, restaurants, clinics, and small warehouses. Ceiling cassette and wall-mounted units are our primary commercial offerings. We also offer annual maintenance contracts (AMC) for ongoing care after installation.", source: "/commercial-aircond-installation" },

  // ─── SERVICING (12 questions) ───────────────────────────────────────────────
  { category: "servicing", q: "How often should I service my aircond in Malaysia?", a: "For light use (evenings only), service every 6 months. For heavy use (8+ hours daily), every 3 months. A chemical wash is recommended annually regardless of usage. Malaysia's tropical humidity means units accumulate dirt and microbial growth faster than in temperate countries.", source: "/services/basic-servicing" },
  { category: "servicing", q: "What does a basic aircond service include?", a: "A basic service (from RM 99) includes: filter cleaning, front panel wash, evaporator coil surface cleaning, blower wheel check, drain pipe flush, electrical connections check, thermostat calibration, gas pressure reading, and a full diagnostic report. Takes about 30–45 minutes per unit.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Will servicing reduce my TNB electricity bill?", a: "Yes. A clean aircond uses 15–30% less electricity than a dirty one. Clogged filters and coils force the compressor to work harder and longer to reach the set temperature. Regular servicing keeps the unit running at peak efficiency, directly reducing your monthly TNB bill.", source: "/services/basic-servicing" },
  { category: "servicing", q: "What is the difference between chemical wash and chemical overhaul?", a: "A chemical wash (from RM 120) cleans the unit while it stays mounted on the wall — great for regular maintenance. A chemical overhaul (from RM 220) fully dismantles the unit for a deep clean of every internal component — recommended for water leaking, ice formation, or units not serviced in 3+ years.", source: "/services/chemical-wash" },
  { category: "servicing", q: "My aircond is running but not cold. What's wrong?", a: "The most common causes are low refrigerant gas, a dirty evaporator coil, or a faulty capacitor. Our technicians diagnose the exact issue and quote you before any repair starts. Diagnostic fee is RM 138 (waived if repair is done on the same visit).", source: "/services/repair" },
  { category: "servicing", q: "My aircond is leaking water. What should I do?", a: "Switch off the unit if leaking heavily to prevent damage. The most common cause is a blocked drain pipe — usually fixed with a basic service or chemical wash. If leaking continues after a wash, a chemical overhaul is needed to clean the drain pan and internal channels properly.", source: "/services/chemical-overhaul" },
  { category: "servicing", q: "My aircond is making noise. What could it be?", a: "Common noise causes include: loose front panel (clicking), worn blower bearings (grinding), fan blade imbalance (vibration), or compressor issues (deep humming). Our diagnostic covers all these. Most noise issues are fixed during a basic service or with a simple part replacement.", source: "/services/repair" },
  { category: "servicing", q: "What gas type does my aircond use?", a: "Check the sticker on your outdoor unit — it states the gas type (R22, R410A, or R32). Or WhatsApp us a photo of the outdoor unit sticker and we'll identify it for you. Never mix gas types — each system is designed for a specific refrigerant.", source: "/services/gas-topup" },
  { category: "servicing", q: "Do you do commercial and office aircond servicing?", a: "Yes, we handle commercial wall-mounted and ceiling cassette units for shops, retail outlets, restaurants, offices, and small-to-medium commercial premises. We also offer annual maintenance contracts for offices and commercial properties with flexible scheduling.", source: "/services/basic-servicing" },
  { category: "servicing", q: "What is a maintenance contract (AMC)?", a: "An Annual Maintenance Contract includes scheduled servicing (2–4 visits per year), priority booking, discounted repair rates, and free diagnostic visits. AMCs are ideal for offices, shops, and homes with multiple units. Pricing depends on number of units and visit frequency — WhatsApp us for a quote.", source: "/services/maintenance-contract" },
  { category: "servicing", q: "Can I just clean the filters myself instead of servicing?", a: "Cleaning filters every 2–4 weeks is excellent and extends time between professional services. However, professional servicing reaches internal components you cannot access — evaporator coil deep clean, blower wheel, drain pan, electrical connections, and gas pressure checks that filters alone don't cover.", source: "/services/basic-servicing" },
  { category: "servicing", q: "My aircond smells bad. What causes the smell?", a: "Musty or sour smells usually indicate microbial growth (mould and bacteria) on the evaporator coil or in the drain pan. A chemical wash kills and removes the biofilm causing the smell. For severe cases, a chemical overhaul provides a deeper clean. Using the aircond in 'fan only' mode for 15 minutes before switching off can help prevent future growth.", source: "/services/chemical-wash" },

  // ─── CHEMICAL WASH (8 questions) ────────────────────────────────────────────
  { category: "chemical-wash", q: "How much does a chemical wash cost in KL & Selangor?", a: "Chemical wash starts from RM 120 for a standard 1.0–1.5 HP wall-mounted unit. Ceiling cassette starts from RM 220. Prices vary by unit type and HP size. All prices confirmed before work begins — no hidden charges.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "How long does a chemical wash take?", a: "A pressure chemical wash takes approximately 60–75 minutes per unit. This includes protection setup, chemical application, high-pressure rinse, reassembly, testing, and handover. We use waterproof canvas to protect your walls and furniture throughout.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Is the chemical used safe for my family?", a: "Yes. We use food-safe, non-corrosive alkaline cleaning agents that are safe for families, children, and pets. The chemical dissolves biofilm and microbial growth within minutes without damaging copper coils or aluminium fins.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "How often should I get a chemical wash?", a: "We recommend a chemical wash at least once every 12 months for normal use. For heavy-use units (8+ hours daily), units near busy roads, or homes with allergies, a 6-month cycle is better. Regular chemical washes extend your unit's lifespan by years.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "What is the difference between chemical wash and basic service?", a: "A basic service (RM 99) cleans filters and surfaces — good for routine maintenance. A chemical wash (RM 120) uses high-pressure alkaline solution to deep-clean the internal coil, blower wheel, and drain channels while the unit stays mounted. Chemical wash removes stubborn biofilm that basic service cannot reach.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Will chemical wash fix my aircond that is not cold?", a: "If the cause is a dirty evaporator coil or blocked airflow from biofilm buildup, yes — chemical wash often restores cooling. However, if the issue is low gas, a faulty capacitor, or compressor problems, a repair will be needed. Our technician diagnoses the exact cause before recommending treatment.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Does chemical wash damage the aircond?", a: "No. When done correctly, chemical washing extends the life of your unit. We use non-corrosive chemicals at appropriate pressure (80–120 PSI) that clean without damaging fins or coils. Improper chemical wash with acidic solutions or excessive pressure by untrained technicians can cause damage — which is why professional service matters.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Can chemical wash remove mould from my aircond?", a: "Yes. The alkaline chemical solution kills mould colonies and dissolves the biofilm they grow on. For surface mould on the coil and blower, chemical wash is highly effective. For deep-seated mould in the drain pan or back tray, a chemical overhaul (which dismantles the unit) provides a more thorough clean.", source: "/services/chemical-wash" },

  // ─── OVERHAUL (6 questions) ─────────────────────────────────────────────────
  { category: "overhaul", q: "When do I need a chemical overhaul instead of a chemical wash?", a: "Choose a chemical overhaul when: your unit is leaking water persistently after a chemical wash, ice is forming on the coil, the unit hasn't been deep-cleaned in 3+ years, or there's heavy biofilm buildup in the back tray and drain pan. Overhaul fully dismantles the unit for complete internal cleaning.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "How much does a chemical overhaul cost?", a: "Chemical overhaul starts from RM 220 for a standard 1.0–1.5 HP wall-mounted unit. Pricing varies by HP size and unit type. The process takes 2–2.5 hours and includes full dismantling, deep soak cleaning, reassembly, gas pressure check, and commissioning.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "How long does a chemical overhaul take?", a: "A full chemical overhaul takes approximately 2–2.5 hours per unit. The indoor unit is carefully dismantled, every component soaked and scrubbed clean, drain pan and back tray sanitized, then reassembled and tested. We protect your space throughout the process.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Will chemical overhaul fix water leaking?", a: "In most cases, yes. Persistent water leaks are often caused by clogged drain channels inside the unit that a chemical wash cannot reach. Chemical overhaul dismantles and cleans every internal channel, drain pan, and back tray — permanently resolving most leak causes.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Is chemical overhaul worth it for an old aircond?", a: "If your unit is under 10 years old and the compressor is working well, a chemical overhaul is very cost-effective — it can restore near-new performance for a fraction of the replacement cost. For units over 12–15 years old, we honestly advise whether overhaul or replacement makes better financial sense.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "What parts are cleaned during a chemical overhaul?", a: "Every internal component: front panel, filters, evaporator coil, blower wheel/fan barrel, drain pan, back tray, drain pipe connection, and indoor housing. The outdoor unit condenser coil is also cleaned if accessible. All parts are soaked in chemical solution, scrubbed, rinsed, and dried before reassembly.", source: "/services/chemical-overhaul" },

  // ─── GAS TOP-UP (7 questions) ───────────────────────────────────────────────
  { category: "gas-topup", q: "How much does gas top-up cost?", a: "Gas top-up is charged per PSI: R22 (RM 2.50), R410A (RM 3.00), R32 (RM 3.00). Final cost depends on the actual PSI required after inspection. Price depends on unit HP size and how much refrigerant is needed. Leak check is included with every gas top-up.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Does my aircond need regular gas refills?", a: "No. A properly installed aircond with good flare connections should not lose refrigerant for years. If your unit needs frequent gas top-ups, there is likely a leak that needs to be found and fixed. We always check for leaks before topping up.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "How do I know if my aircond is low on gas?", a: "Common signs of low refrigerant: reduced cooling, ice forming on copper pipes or the indoor coil, hissing sounds near connections, and higher-than-normal electricity consumption. Our technician can confirm with a pressure gauge reading during a diagnostic visit.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "What is the difference between R22, R410A, and R32 gas?", a: "R22 is the older refrigerant being phased out for environmental reasons. R410A is the current standard for most inverter units — higher pressure, more efficient. R32 is the newest, most eco-friendly option with lower global warming potential. Your unit is designed for one specific type — never mix them.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Do you check for leaks before topping up gas?", a: "Yes, always. We perform a leak check using electronic detectors and soap solution on all flare connections, valves, and brazed joints before any gas top-up. If a leak is found, we repair it first — otherwise the new gas will just leak out again.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Can I top up gas myself?", a: "We strongly advise against it. Refrigerant handling requires proper manifold gauges, vacuum equipment, and knowledge of the correct charge weight. Incorrect charging can damage the compressor. Improper R32 handling (it is mildly flammable) poses safety risks.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "How long does a gas top-up take?", a: "A gas top-up with leak check takes approximately 30–45 minutes. If a leak needs repair first (e.g., re-flaring a connection), add 15–30 minutes. We always vacuum the line before recharging to remove any air or moisture.", source: "/services/gas-topup" },

  // ─── REPAIR (8 questions) ───────────────────────────────────────────────────
  { category: "repair", q: "How much does aircond repair cost?", a: "Diagnostic fee is RM 138 (waived if repair proceeds). Common repairs: capacitor replacement RM 80–150, PCB board RM 150–350, fan motor RM 180–280, thermostat sensor RM 80–120, compressor replacement RM 600–1,200. All prices confirmed before work begins.", source: "/services/repair" },
  { category: "repair", q: "My aircond completely stopped working. What should I check?", a: "Before calling us, check: (1) Is the MCB/breaker tripped? (2) Does the remote have batteries? (3) Is the unit receiving power (any LED lights)? If the breaker trips repeatedly, don't reset it — there may be an electrical fault. Call us for diagnosis.", source: "/services/repair" },
  { category: "repair", q: "My aircond is freezing / forming ice. Why?", a: "Ice formation usually means: low refrigerant gas, dirty evaporator coil restricting airflow, or a faulty blower motor not circulating enough air. Running the unit with ice makes it worse. Switch off, let it thaw, and book a service — chemical wash or gas top-up usually fixes it.", source: "/services/repair" },
  { category: "repair", q: "My aircond remote control is not working. What can I do?", a: "First try replacing the batteries (AAA). If still not working, try pointing directly at the unit from 1 meter away. If the remote display works but the unit doesn't respond, the indoor unit's IR receiver may be faulty — a simple replacement part we carry on most service visits.", source: "/services/repair" },
  { category: "repair", q: "My aircond trips the circuit breaker. What's wrong?", a: "A tripping breaker usually indicates: a failing compressor drawing too much current, a shorted capacitor, or damaged wiring. This is a safety issue — do not keep resetting the breaker. Our technician will diagnose the exact electrical fault and quote the repair before proceeding.", source: "/services/emergency" },
  { category: "repair", q: "Do you offer emergency aircond repair?", a: "Yes. Same-day emergency repair is available across KL and Selangor. For complete breakdowns, heavy water leaking, or outdoor unit failures, WhatsApp us immediately. Standard hours 9 AM–6 PM; after-hours surcharge of RM 50 applies for 6 PM–10 PM jobs.", source: "/services/emergency" },
  { category: "repair", q: "Is it worth repairing an old aircond?", a: "Generally, if the repair cost exceeds 50% of a new unit's price, replacement makes more sense. Units over 10–12 years old running R22 gas are good candidates for replacement with a more efficient R32 inverter model. We give honest advice — if repair isn't worth it, we'll tell you.", source: "/services/repair" },
  { category: "repair", q: "Do you repair all brands of aircond?", a: "Yes, we repair all 20 major brands including Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, Fujitsu, Hitachi, Sharp, Acson, Toshiba, and more. Both inverter and non-inverter models. Our technicians carry common spare parts for most brands.", source: "/services/repair" },

  // ─── PRICING (8 questions) ──────────────────────────────────────────────────
  { category: "pricing", q: "Are there any hidden charges?", a: "No hidden charges at all. We provide a full quote before starting any work. Extra materials (copper pipe beyond 7fts, casing) are quoted and approved by you on-site before installation or repair proceeds.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "What is your emergency / after-hours rate?", a: "Standard hours are 9:00 AM to 6:00 PM daily. Jobs booked between 6:00 PM and 10:00 PM carry a mandatory overtime surcharge of RM 50. Total after-hours diagnostic fee is RM 138.", source: "/services/emergency" },
  { category: "pricing", q: "Do you offer volume discounts?", a: "Yes! 5+ units: 5% OFF Instant Booking Discount. 10+ units: 10% OFF Instant Booking Discount. Discounts apply to labour charges. WhatsApp us to confirm your discounted quote.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "How much does a basic aircond service cost?", a: "Basic servicing starts from RM 99 per unit for standard wall-mounted 1.0–2.5 HP. This includes filter cleaning, coil surface wash, drain flush, electrical check, gas pressure reading, and diagnostic report.", source: "/aircond-service-price-malaysia" },
  { category: "pricing", q: "What is included in the installation price vs what costs extra?", a: "Included in base price: 7ft copper pipe, wiring, PVC drain, vacuum, leak test, commissioning. Extras (quoted on-site if needed): additional copper pipe per foot, drain pipe beyond 7 ft at RM 5/ft, heavy-duty bracket, casing/trunking, drilling through reinforced concrete, electrical MCB installation, condensate pump.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "Do you charge for a site visit or quotation?", a: "WhatsApp quotations are free — send us your unit type, HP, and area for an instant estimate. For installations, the site survey is included in the installation package. For repair diagnostics, the RM 88 fee is waived if you proceed with the repair.", source: "/services/repair" },
  { category: "pricing", q: "Can I pay by credit card or bank transfer?", a: "We accept bank transfer (preferred), cash, and e-wallet payments. Credit card payments can be arranged for larger jobs. Payment is collected upon completion of work after you verify everything is working.", source: "/contact" },
  { category: "pricing", q: "Do your prices include SST?", a: "All our quoted prices are the final price you pay — no additional SST or service charges added later. What we quote on WhatsApp or on-site is what you pay upon completion.", source: "/installation-price-malaysia" },

  // ─── BOOKING (6 questions) ──────────────────────────────────────────────────
  { category: "booking", q: "How do I book a service?", a: "The fastest way is via WhatsApp at +60 18-298 3573. Tell us your unit type (HP and brand), area, and the issue. We'll confirm availability and pricing within 30 minutes.", source: "/contact" },
  { category: "booking", q: "Do you offer same-day service?", a: "Yes, same-day appointments are available subject to technician availability. WhatsApp us early in the morning (before 11 AM) for the best chance of a same-day slot across KL and Selangor.", source: "/contact" },
  { category: "booking", q: "Can I book for a specific date and time?", a: "Yes. We accept advance bookings for specific dates and preferred time slots (morning 9 AM–12 PM or afternoon 1 PM–5 PM). Advance booking is recommended for installation jobs and weekend appointments.", source: "/contact" },
  { category: "booking", q: "Do I need to be home during the service?", a: "Yes, someone needs to be present to provide access, approve any extra work, and verify the completed job. For condos, please inform your management office in advance to avoid access delays.", source: "/contact" },
  { category: "booking", q: "How far in advance should I book?", a: "For routine servicing, same-day or next-day slots are usually available. For installations, we recommend booking 1–2 days ahead. Weekend and public holiday slots fill faster — book 2–3 days ahead for best availability.", source: "/contact" },
  { category: "booking", q: "Can I cancel or reschedule a booking?", a: "Yes, please notify us at least 4 hours before the scheduled appointment via WhatsApp. Cancellations and rescheduling are free of charge. Late cancellations (technician already dispatched) may incur a RM 30 transport fee.", source: "/contact" },

  // ─── WARRANTY & TRUST (8 questions) ────────────────────────────────────────
  { category: "warranty", q: "Is there a warranty on your work?", a: "Yes. All workmanship carries a 1-month warranty. Replaced parts carry a 3-month warranty. If any related issue arises within the warranty period, we return and inspect at no charge.", source: "/services/repair" },
  { category: "warranty", q: "Is KL Renovator a registered business?", a: "Yes. KL Renovator operates under Multicore Dynamics Resources, registered with SSM (registration: 003765188-T). We are a legitimate, registered business — not an unregistered freelancer.", source: "/about" },
  { category: "warranty", q: "Will your installation void my aircond manufacturer warranty?", a: "No. Our installation follows all manufacturer guidelines — correct copper pipe sizing, vacuum evacuation, proper electrical connections, and correct refrigerant handling. Your manufacturer warranty remains fully intact after our installation.", source: "/aircond-installation-kl" },
  { category: "warranty", q: "What happens if there is a problem after service?", a: "If any issue related to our work arises within the warranty period, WhatsApp us with your job card details and we will schedule a free return visit. We stand behind our work — customer satisfaction is our priority.", source: "/services/repair" },
  { category: "warranty", q: "Do you have customer reviews I can read?", a: "Yes, we have 500+ verified customer reviews on Google and our review page. Reviews cover installation, servicing, chemical wash, and repair jobs across KL and Selangor. We also share before-and-after photos on our gallery page.", source: "/review" },
  { category: "warranty", q: "Are your technicians trained and certified?", a: "Yes. All KL Renovator technicians are trained in HVAC installation, servicing, and repair. They carry CIDEC/energy commission competency certifications where applicable, and undergo regular training on new refrigerant types (R32, R410A) and inverter technology.", source: "/about" },
  { category: "warranty", q: "Do you carry insurance?", a: "Yes. KL Renovator carries business liability insurance that covers any accidental damage to your property during our work. In over 5 years of operation, we have never needed to make an insurance claim — but the coverage gives you peace of mind.", source: "/about" },
  { category: "warranty", q: "What is your job card system?", a: "Every job — whether installation, service, or repair — generates a written job card documenting: unit details, work performed, materials used, gas pressure readings, warranty start date, and technician signature. Keep your job card for any warranty claims.", source: "/aircond-installation-kl" },

  // ─── COVERAGE AREAS (5 questions) ───────────────────────────────────────────
  { category: "coverage", q: "What areas does KL Renovator cover?", a: "We cover the entire Klang Valley — all areas of Kuala Lumpur and Selangor including Petaling Jaya, Ampang, Batu Caves, Cheras, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, Bangsar, Mont Kiara, Setapak, Sentul, Selayang, Putrajaya, and Cyberjaya.", source: "/areas" },
  { category: "coverage", q: "Do you serve my area near me?", a: "We serve all of KL and Selangor — if you're in Klang Valley, we cover your area. This includes every neighbourhood from raw urban centres to suburban housing areas. Check our areas page for the full list, or WhatsApp us your postcode for instant confirmation.", source: "/areas" },
  { category: "coverage", q: "Do you cover Putrajaya and Cyberjaya?", a: "Yes. Putrajaya and Cyberjaya are within our coverage area. We regularly service government offices, commercial buildings, and residential units in both areas. Same-day slots available.", source: "/areas" },
  { category: "coverage", q: "How far are you willing to travel for a service?", a: "We cover all of Klang Valley (KL + Selangor). For areas beyond Klang Valley (e.g., Seremban, Melaka, Ipoh), we may accommodate multi-unit commercial jobs by special arrangement. WhatsApp us to discuss.", source: "/areas" },
  { category: "coverage", q: "Do you charge extra for distant areas?", a: "No. Our pricing is the same across all KL and Selangor areas. Whether you're in central KL or at the edge of Selangor, you pay the same transparent price for the same quality service.", source: "/areas" },

  // ─── BRANDS (5 questions) ───────────────────────────────────────────────────
  { category: "brands", q: "What brands do you service and install?", a: "We service and install all 20 major brands: Daikin, Panasonic, Mitsubishi Electric, York, Midea, LG, Samsung, Carrier, O-General, Fujitsu, Hitachi, Sharp, Acson, National, Sanyo, Toshiba, Electrolux, Gree, Haier, and Hisense. Both inverter and non-inverter models.", source: "/brands" },
  { category: "brands", q: "Which is better — Daikin or Panasonic?", a: "Both are excellent brands. Daikin is known for superior compressor technology and energy efficiency. Panasonic offers great value with Nanoe-X air purification. For installation, both use R32 gas in newer models. We install and service both equally — the best choice depends on your budget and specific needs.", source: "/brands" },
  { category: "brands", q: "Do you service inverter airconds?", a: "Yes, we service all inverter models across every brand. Inverter units require technicians who understand PCB board diagnostics and variable-speed compressor systems. Our team is trained on all major inverter platforms.", source: "/services/repair" },
  { category: "brands", q: "Can you install a brand not in your list?", a: "Most likely yes. If your brand isn't listed, WhatsApp us the brand name and model number. Our technicians work on all split-type, ceiling cassette, and window unit airconds regardless of brand.", source: "/brands" },
  { category: "brands", q: "Do you use original brand spare parts?", a: "We use original or OEM-equivalent parts that meet or exceed manufacturer specifications. For warranty-covered parts, we always use genuine brand components. We never use cheap knock-off parts that compromise safety or performance.", source: "/services/repair" },

  // ─── BTU & SIZING (4 questions) ─────────────────────────────────────────────
  { category: "btu-sizing", q: "What HP aircond do I need for my room?", a: "General guide: 1.0 HP for rooms up to 150 sqft (standard bedroom), 1.5 HP for 150–250 sqft (master bedroom, small living room), 2.0 HP for 250–400 sqft (large living room), 2.5 HP for 400–550 sqft, 3.0 HP for 550–700 sqft. High ceilings, west-facing rooms, and top-floor units may need one size up.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "How do I calculate the BTU I need?", a: "Basic formula: Room area (sqft) × 25 BTU for standard rooms, × 30 BTU for west-facing or top-floor rooms. Example: 150 sqft bedroom × 25 = 3,750 BTU ≈ 1.0 HP (which is ~9,000 BTU). Oversizing slightly is better than undersizing — the unit cools faster and cycles less.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "Is a bigger HP always better?", a: "Not always. An oversized unit cools the room too quickly without properly dehumidifying, leaving the air cold but clammy. It also short-cycles (turns on and off frequently), which increases wear and electricity consumption. Right-sizing for your room is more important than going bigger.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "Does ceiling height affect which HP I need?", a: "Yes. Standard Malaysian ceiling height is 9–10ft. If your ceiling is higher (12ft+ in some landed homes and duplexes), you need more cooling capacity because the air volume is larger. Add roughly 10% more BTU per extra foot of ceiling height.", source: "/aircond-installation-kl" },
];

// ─── BAHASA MALAYSIA FAQ POOL (105 questions) ──────────────────────────────────
const MS_FAQS: MasterFaqItem[] = [
  // ─── PEMASANGAN (18 soalan) ────────────────────────────────────────────────
  { category: "installation", q: "Berapa kos pemasangan aircond di KL & Selangor 2026?", a: "Pemasangan dinding bermula dari RM 199 untuk 1.0–1.5 HP, RM 249 untuk 2.0 HP, RM 279 untuk 2.5 HP, dan RM 329 untuk 3.0 HP. Ceiling cassette dari RM 290. Unit tingkap dari RM 199. Setiap harga termasuk 7 kaki paip tembaga, pendawaian, evakuasi pam vakum, ujian kebocoran dan pentauliahan — semua disahkan sebelum kerja bermula.", source: "/installation-price-malaysia" },
  { category: "installation", q: "Apa yang termasuk dalam pakej pemasangan asas RM 199?", a: "Pakej asas RM 199 termasuk: tinjauan tapak, 7 kaki paip tembaga Jenis L bersaiz betul, penebat, pendawaian elektrik melalui konduit, saliran PVC, pendakap dengan pad getaran, evakuasi vakum dua peringkat wajib (min 15 min), pentauliahan pam vakum (500 mikron), pentauliahan penuh, dan kad kerja bertulis dengan waranti kerja 1 bulan.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Berapa lama pemasangan aircond mengambil masa?", a: "Pemasangan dinding standard mengambil masa 2–3 jam untuk satu unit. Ceiling cassette mengambil 3–4 jam. Dua unit pada hari yang sama mengambil kira-kira 5–6 jam. Kami tidak pernah tergesa-gesa — evakuasi vakum yang betul sahaja memerlukan minimum 15–20 minit.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Adakah anda melakukan vakum semasa pemasangan?", a: "Ya, sudah tentu. Kami melakukan evakuasi pam vakum dua peringkat selama minimum 15–20 minit pada setiap pemasangan. Vakum yang betul membuang kelembapan dan udara dari saluran penyejuk, yang penting untuk melindungi pemampat dan memastikan prestasi penyejukan optimum.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Paip tembaga apa yang anda gunakan?", a: "Kami menggunakan paip tembaga Jenis L, bersaiz betul untuk setiap kadaran HP unit. Jenis L mempunyai dinding lebih tebal daripada Jenis M yang lebih murah, menjadikannya lebih tahan lama dan tahan kebocoran.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Bolehkah anda memasang aircond di kondominium?", a: "Ya, kami berpengalaman dengan pemasangan kondominium di seluruh KL dan Selangor. Kami bekerja mengikut peraturan pengurusan bangunan, menyelaras penempatan unit luar di tempat yang diluluskan, dan mengendalikan keperluan kelulusan JMB/MC.", source: "/new-home-aircond-installation" },
  { category: "installation", q: "Waranti apa yang datang dengan pemasangan?", a: "Setiap pemasangan mempunyai waranti kerja 1 bulan. Jika kerja kami menyebabkan kebocoran gas, tiada penyejukan, atau masalah saliran dalam tempoh tersebut, kami kembali dan membaikinya secara percuma. Komponen yang diganti mempunyai waranti 3 bulan.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Adakah anda menyediakan pendawaian elektrik?", a: "Ya. Kami menjalankan pendawaian melalui konduit PVC yang betul. Untuk unit lebih besar (2.5 HP ke atas), kami memasang litar MCB khusus. Kami juga memasang suis pengasing luar untuk keselamatan.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Penebat apa yang anda gunakan pada paip tembaga?", a: "Kami menggunakan penebat jenama insulation — 9mm standard untuk saluran cecair dan 13mm untuk saluran gas. Untuk ceiling cassette dan laluan paip lebih panjang, kami menggunakan ketebalan 19mm.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Bolehkah anda memasang ceiling cassette?", a: "Ya. Pemasangan ceiling cassette tersedia dari RM 290. Kami mengendalikan potongan siling, pemasangan penggantungan, persediaan pam saliran, dan semua kerja elektrik. Biasanya mengambil 3–4 jam.", source: "/ceiling-cassette-aircond-installation-kl" },
  { category: "installation", q: "Adakah anda memasang unit tingkap?", a: "Ya. Pemasangan unit tingkap bermula dari RM 199. Kami memastikan pemasangan kukuh dengan pengedap betul untuk mengelakkan hujan dan serangga.", source: "/window-unit-aircond-installation-kl" },
  { category: "installation", q: "Bolehkah memasang aircond semasa musim hujan?", a: "Ya, pemasangan berjalan sepanjang tahun di Malaysia. Semasa hujan lebat, kami memastikan unit luar mempunyai perlindungan cuaca dan semua penembusan dinding ditutup dengan silikon tahan cuaca.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Bagaimana jika rumah saya mempunyai pendawaian lama?", a: "Juruteknik kami akan memeriksa kapasiti litar elektrik semasa tinjauan tapak. Jika pendawaian sedia ada tidak selamat menampung beban aircond, kami akan menasihati anda tentang peningkatan MCB yang diperlukan.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Bagaimana anda mengendalikan saliran?", a: "Kami memasang paip saliran PVC dengan kecerunan minimum 1:100 untuk memastikan kondensat mengalir secara graviti. Untuk pemasangan di mana saliran graviti tidak mungkin, kami memasang pam kondensat.", source: "/aircond-installation-kl" },
  { category: "installation", q: "Adakah anda menanggalkan dan memindahkan unit sedia ada?", a: "Ya. Penanggalan dan pemindahan tersedia dari RM 150 per unit. Kami menanggalkan dengan teliti, menutup saluran penyejuk, menanggalkan kedua-dua unit dalaman dan luar, dan memasang semula di lokasi baharu dengan paip tembaga baru.", source: "/services/dismantling-relocation" },
  { category: "installation", q: "Berapa panjang paip maksimum?", a: "Untuk kebanyakan unit split kediaman, panjang paip maksimum yang disyorkan ialah 15–20 meter. Selain 7 kaki (termasuk dalam harga asas), paip tembaga tambahan dicaj per kaki.", source: "/installation-price-malaysia" },
  { category: "installation", q: "Adakah anda memasang untuk rumah baharu?", a: "Ya, pemasangan rumah baharu adalah salah satu perkhidmatan teras kami. Kami menawarkan pakej seluruh rumah dengan diskaun volum — 5+ unit diskaun 5% OFF Instant Booking Discount, 10+ unit diskaun 10% OFF Instant Booking Discount.", source: "/new-home-aircond-installation" },
  { category: "installation", q: "Adakah anda menawarkan pemasangan komersial?", a: "Ya. Kami mengendalikan pemasangan komersial untuk pejabat, kedai, restoran, klinik, dan gudang kecil. Ceiling cassette dan unit dinding adalah tawaran komersial utama kami.", source: "/commercial-aircond-installation" },

  // ─── SERVIS (12 soalan) ────────────────────────────────────────────────────
  { category: "servicing", q: "Berapa kerap saya perlu servis aircond?", a: "Penggunaan ringan (waktu malam sahaja): setiap 6 bulan. Penggunaan berat (8+ jam sehari): setiap 3 bulan. Cuci kimia disyorkan setiap tahun kerana kelembapan tinggi di Malaysia.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Apa yang termasuk dalam servis asas?", a: "Servis asas (dari RM 99) termasuk: pembersihan penapis, basuhan panel depan, pembersihan permukaan gegelung penyejat, pemeriksaan roda kipas, bilasan paip saliran, pemeriksaan sambungan elektrik, penentukuran termostat, bacaan tekanan gas, dan laporan diagnostik.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Adakah servis mengurangkan bil elektrik TNB?", a: "Ya. Aircond yang bersih menggunakan 15–30% kurang elektrik berbanding yang kotor. Penapis dan gegelung tersumbat memaksa pemampat bekerja lebih keras dan lebih lama.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Aircond saya beroperasi tetapi tidak sejuk. Apa masalahnya?", a: "Punca paling biasa ialah gas rendah, gegelung penyejat kotor, atau kapasitor rosak. Yuran diagnosis RM 88 (dikecualikan jika pembaikan dilakukan).", source: "/services/repair" },
  { category: "servicing", q: "Aircond saya bocor air. Apa yang perlu dilakukan?", a: "Tutup unit jika bocor banyak. Punca paling biasa ialah paip longkang tersumbat — biasanya dibaiki dengan servis asas atau cuci kimia. Jika berterusan, overhaul kimia diperlukan.", source: "/services/chemical-overhaul" },
  { category: "servicing", q: "Aircond saya bising. Apa puncanya?", a: "Punca biasa: panel depan longgar (klik), galas kipas haus (geseran), ketidakseimbangan bilah kipas (getaran), atau masalah pemampat (dengung dalam).", source: "/services/repair" },
  { category: "servicing", q: "Jenis gas apa yang digunakan aircond saya?", a: "Semak pelekat pada unit luar — ia menyatakan jenis gas (R22, R410A, atau R32). Atau WhatsApp kami gambar pelekat unit luar.", source: "/services/gas-topup" },
  { category: "servicing", q: "Adakah anda menyediakan servis komersial?", a: "Ya, kami mengendalikan unit dinding dan ceiling cassette komersial untuk kedai, restoran, pejabat, dan premis komersial kecil hingga sederhana.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Apa itu kontrak penyelenggaraan (AMC)?", a: "Kontrak Penyelenggaraan Tahunan termasuk servis berjadual (2–4 lawatan setahun), tempahan keutamaan, kadar pembaikan diskaun, dan lawatan diagnostik percuma.", source: "/services/maintenance-contract" },
  { category: "servicing", q: "Bolehkah saya hanya bersihkan penapis sendiri?", a: "Membersihkan penapis setiap 2–4 minggu adalah baik. Tetapi servis profesional menjangkau komponen dalaman yang tidak boleh diakses — pembersihan gegelung, roda kipas, dulang saliran, dan pemeriksaan tekanan gas.", source: "/services/basic-servicing" },
  { category: "servicing", q: "Aircond saya berbau. Apa puncanya?", a: "Bau hapak biasanya menunjukkan pertumbuhan mikrob pada gegelung penyejat atau dulang saliran. Cuci kimia membunuh dan membuang biofilm yang menyebabkan bau.", source: "/services/chemical-wash" },
  { category: "servicing", q: "Apa beza cuci kimia dan overhaul kimia?", a: "Cuci kimia (dari RM 120) membersihkan unit di tempat ia terpasang. Overhaul kimia (dari RM 220) menanggalkan unit sepenuhnya untuk pembersihan mendalam.", source: "/services/chemical-wash" },

  // ─── CUCI KIMIA (8 soalan) ─────────────────────────────────────────────────
  { category: "chemical-wash", q: "Berapa harga cuci kimia di KL & Selangor?", a: "Cuci kimia bermula dari RM 120 untuk unit dinding 1.0–1.5 HP. Ceiling cassette bermula RM 220. Semua harga disahkan sebelum kerja bermula.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Berapa lama cuci kimia mengambil masa?", a: "Cuci kimia tekanan mengambil kira-kira 60–75 minit per unit. Termasuk persediaan perlindungan, aplikasi kimia, bilasan tekanan tinggi, pemasangan semula, ujian, dan serahan.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Adakah bahan kimia yang digunakan selamat?", a: "Ya. Kami menggunakan agen pembersih alkali selamat makanan, tidak menghakis yang selamat untuk keluarga, kanak-kanak, dan haiwan peliharaan.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Berapa kerap perlu cuci kimia?", a: "Kami mengesyorkan cuci kimia sekurang-kurangnya sekali setiap 12 bulan. Untuk unit penggunaan berat, kitaran 6 bulan lebih baik.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Apa beza cuci kimia dan servis asas?", a: "Servis asas (RM 99) membersihkan penapis dan permukaan. Cuci kimia (RM 120) menggunakan larutan alkali tekanan tinggi untuk pembersihan mendalam gegelung dalaman dan saluran saliran.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Adakah cuci kimia membaiki aircond tidak sejuk?", a: "Jika puncanya gegelung kotor atau aliran udara tersumbat, ya. Tetapi jika masalahnya gas rendah atau kapasitor rosak, pembaikan diperlukan.", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Adakah cuci kimia merosakkan aircond?", a: "Tidak. Apabila dilakukan dengan betul, cuci kimia memanjangkan hayat unit anda. Kami menggunakan bahan kimia tidak menghakis pada tekanan sesuai (80–120 PSI).", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "Bolehkah cuci kimia membuang kulat?", a: "Ya. Larutan kimia alkali membunuh koloni kulat dan melarutkan biofilm. Untuk kulat mendalam, overhaul kimia memberikan pembersihan lebih menyeluruh.", source: "/services/chemical-wash" },

  // ─── OVERHAUL (6 soalan) ───────────────────────────────────────────────────
  { category: "overhaul", q: "Bila saya perlu overhaul kimia?", a: "Pilih overhaul apabila: unit bocor berterusan selepas cuci kimia, ais terbentuk pada gegelung, unit tidak dibersihkan mendalam selama 3+ tahun.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Berapa kos overhaul kimia?", a: "Overhaul kimia bermula dari RM 220 untuk unit dinding 1.0–1.5 HP standard. Proses mengambil 2–2.5 jam.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Berapa lama overhaul kimia mengambil masa?", a: "Overhaul kimia penuh mengambil kira-kira 2–2.5 jam per unit. Unit dalaman ditanggalkan, setiap komponen direndam dan disental, kemudian dipasang semula dan diuji.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Adakah overhaul membaiki kebocoran air?", a: "Dalam kebanyakan kes, ya. Kebocoran berterusan sering disebabkan saluran saliran tersumbat di dalam unit yang tidak dapat dicapai oleh cuci kimia.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Adakah overhaul berbaloi untuk aircond lama?", a: "Jika unit anda berusia kurang 10 tahun dan pemampat berfungsi baik, overhaul sangat berbaloi — ia boleh memulihkan prestasi hampir baharu.", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "Komponen apa yang dibersihkan semasa overhaul?", a: "Setiap komponen dalaman: panel depan, penapis, gegelung penyejat, roda kipas, dulang saliran, dulang belakang, dan sambungan paip saliran.", source: "/services/chemical-overhaul" },

  // ─── TAMBAH GAS (7 soalan) ─────────────────────────────────────────────────
  { category: "gas-topup", q: "Berapa harga tambah gas?", a: "Tambah gas dikenakan bayaran per PSI: R22 (RM 2.50), R410A (RM 3.00), R32 (RM 3.00). Kos akhir bergantung kepada PSI sebenar yang diperlukan selepas pemeriksaan. Pemeriksaan kebocoran disertakan.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Adakah aircond perlu tambah gas secara berkala?", a: "Tidak. Aircond yang dipasang dengan betul tidak seharusnya kehilangan penyejuk selama bertahun-tahun. Jika perlu tambah gas kerap, kemungkinan ada kebocoran.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Bagaimana saya tahu aircond kurang gas?", a: "Tanda biasa: penyejukan berkurangan, ais terbentuk pada paip tembaga, bunyi desisan berhampiran sambungan, dan penggunaan elektrik lebih tinggi.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Apa beza R22, R410A, dan R32?", a: "R22 ialah penyejuk lama yang dihentikan secara berperingkat. R410A ialah standard semasa. R32 ialah pilihan terkini, paling mesra alam. Unit anda direka untuk satu jenis sahaja.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Adakah anda periksa kebocoran sebelum tambah gas?", a: "Ya, sentiasa. Kami melakukan pemeriksaan kebocoran menggunakan pengesan elektronik dan larutan sabun sebelum sebarang tambah gas.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Bolehkah saya tambah gas sendiri?", a: "Kami sangat menasihatkan jangan. Pengendalian penyejuk memerlukan tolok manifold, peralatan vakum, dan pengetahuan tentang berat cas yang betul.", source: "/services/gas-topup" },
  { category: "gas-topup", q: "Berapa lama tambah gas mengambil masa?", a: "Tambah gas dengan pemeriksaan kebocoran mengambil kira-kira 30–45 minit. Jika kebocoran perlu dibaiki dahulu, tambah 15–30 minit.", source: "/services/gas-topup" },

  // ─── PEMBAIKAN (8 soalan) ──────────────────────────────────────────────────
  { category: "repair", q: "Berapa kos pembaikan aircond?", a: "Yuran diagnosis RM 88 (dikecualikan jika pembaikan diteruskan). Pembaikan biasa: kapasitor RM 80–150, papan PCB RM 150–350, motor kipas RM 180–280, pemampat RM 600–1,200.", source: "/services/repair" },
  { category: "repair", q: "Aircond saya berhenti sepenuhnya. Apa yang perlu diperiksa?", a: "Periksa: (1) MCB terpelantik? (2) Alat kawalan ada bateri? (3) Unit menerima kuasa (ada LED)? Jika MCB terpelantik berulang, jangan reset — mungkin ada kerosakan elektrik.", source: "/services/repair" },
  { category: "repair", q: "Aircond saya membeku. Kenapa?", a: "Pembentukan ais biasanya bermakna: gas rendah, gegelung kotor, atau motor kipas rosak. Tutup unit, biarkan cair, dan tempah servis.", source: "/services/repair" },
  { category: "repair", q: "Alat kawalan jauh tidak berfungsi. Apa yang boleh dilakukan?", a: "Cuba tukar bateri (AAA). Jika masih tidak berfungsi, penerima IR unit dalaman mungkin rosak — komponen ganti mudah yang kami bawa.", source: "/services/repair" },
  { category: "repair", q: "Aircond saya terpelantik breaker. Apa masalahnya?", a: "Breaker terpelantik biasanya menunjukkan: pemampat gagal, kapasitor pintas, atau pendawaian rosak. Ini isu keselamatan — jangan terus reset breaker.", source: "/services/emergency" },
  { category: "repair", q: "Adakah anda menawarkan pembaikan kecemasan?", a: "Ya. Pembaikan kecemasan hari sama tersedia di seluruh KL dan Selangor. Waktu standard 9 PG–6 PTG; surcaj RM 50 untuk kerja 6 PTG–10 malam.", source: "/services/emergency" },
  { category: "repair", q: "Adakah berbaloi membaiki aircond lama?", a: "Secara umumnya, jika kos pembaikan melebihi 50% harga unit baharu, penggantian lebih berbaloi. Unit lebih 10–12 tahun menggunakan gas R22 adalah calon baik untuk penggantian.", source: "/services/repair" },
  { category: "repair", q: "Adakah anda membaiki semua jenama?", a: "Ya, kami membaiki semua 20 jenama utama termasuk Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, dan lain-lain.", source: "/services/repair" },

  // ─── HARGA (8 soalan) ──────────────────────────────────────────────────────
  { category: "pricing", q: "Adakah terdapat caj tersembunyi?", a: "Tiada caj tersembunyi sama sekali. Kami berikan sebut harga penuh sebelum kerja. Bahan tambahan dinyatakan dan diluluskan terlebih dahulu.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "Berapa kadar luar waktu?", a: "Waktu standard 9:00 PG–6:00 PTG. Kerja 6:00 PTG–10:00 malam dikenakan tambahan RM 50. Jumlah yuran diagnosis luar waktu RM 138.", source: "/services/emergency" },
  { category: "pricing", q: "Adakah diskaun volum?", a: "Ya! 5+ unit: 5% OFF Instant Booking Discount. 10+ unit: 10% OFF Instant Booking Discount. Diskaun untuk caj buruh.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "Berapa kos servis asas?", a: "Servis asas bermula dari RM 99 per unit untuk dinding standard 1.0–2.5 HP.", source: "/aircond-service-price-malaysia" },
  { category: "pricing", q: "Apa yang termasuk vs apa yang kos tambahan?", a: "Termasuk: 7 kaki paip tembaga, pendawaian, saliran PVC, vakum, ujian kebocoran, pentauliahan. Tambahan: paip tembaga lebih, pendakap berat, casing, penggerudian konkrit, MCB, pam kondensat.", source: "/installation-price-malaysia" },
  { category: "pricing", q: "Adakah anda caj untuk lawatan tapak?", a: "Sebut harga WhatsApp adalah percuma. Untuk pemasangan, tinjauan tapak termasuk dalam pakej. Untuk diagnosis pembaikan, RM 88 dikecualikan jika pembaikan diteruskan.", source: "/services/repair" },
  { category: "pricing", q: "Bolehkah bayar dengan kad kredit?", a: "Kami menerima pindahan bank (diutamakan), tunai, dan e-dompet. Kad kredit boleh diatur untuk kerja besar.", source: "/contact" },
  { category: "pricing", q: "Adakah harga termasuk SST?", a: "Semua harga yang disebut adalah harga akhir — tiada SST atau caj perkhidmatan tambahan.", source: "/installation-price-malaysia" },

  // ─── TEMPAHAN (6 soalan) ───────────────────────────────────────────────────
  { category: "booking", q: "Bagaimana cara menempah servis?", a: "Cara paling pantas melalui WhatsApp di +60 18-298 3573. Beritahu jenis unit, kawasan, dan masalah anda.", source: "/contact" },
  { category: "booking", q: "Adakah servis hari sama?", a: "Ya, tersedia bergantung kepada ketersediaan juruteknik. WhatsApp sebelum 11 PG untuk peluang terbaik.", source: "/contact" },
  { category: "booking", q: "Bolehkah tempah untuk tarikh tertentu?", a: "Ya. Kami menerima tempahan awal untuk tarikh dan slot masa pilihan.", source: "/contact" },
  { category: "booking", q: "Adakah saya perlu ada di rumah?", a: "Ya, seseorang perlu hadir untuk memberikan akses dan mengesahkan kerja yang siap.", source: "/contact" },
  { category: "booking", q: "Berapa awal perlu ditempah?", a: "Untuk servis rutin, slot hari sama atau keesokan biasanya tersedia. Untuk pemasangan, tempah 1–2 hari awal.", source: "/contact" },
  { category: "booking", q: "Bolehkah batalkan tempahan?", a: "Ya, maklumkan sekurang-kurangnya 4 jam sebelum. Pembatalan dan penjadualan semula adalah percuma.", source: "/contact" },

  // ─── WARANTI (8 soalan) ────────────────────────────────────────────────────
  { category: "warranty", q: "Adakah waranti untuk kerja anda?", a: "Ya. Semua kerja buruh dilindungi waranti 1 bulan. Komponen diganti dilindungi waranti 3 bulan.", source: "/services/repair" },
  { category: "warranty", q: "Adakah KL Renovator perniagaan berdaftar?", a: "Ya. KL Renovator beroperasi di bawah Multicore Dynamics Resources, berdaftar SSM (003765188-T).", source: "/about" },
  { category: "warranty", q: "Adakah pemasangan membatalkan waranti pengeluar?", a: "Tidak. Pemasangan kami mengikut semua garis panduan pengeluar. Waranti pengeluar anda kekal terpelihara.", source: "/aircond-installation-kl" },
  { category: "warranty", q: "Apa berlaku jika ada masalah selepas servis?", a: "Jika masalah berkaitan timbul dalam tempoh waranti, WhatsApp kami dengan butiran kad kerja dan kami jadualkan lawatan semula percuma.", source: "/services/repair" },
  { category: "warranty", q: "Adakah ulasan pelanggan yang boleh dibaca?", a: "Ya, kami mempunyai 500+ ulasan pelanggan yang disahkan di Google dan halaman ulasan kami.", source: "/review" },
  { category: "warranty", q: "Adakah juruteknik anda terlatih?", a: "Ya. Semua juruteknik terlatih dalam pemasangan, servis, dan pembaikan HVAC dengan pensijilan kompetensi.", source: "/about" },
  { category: "warranty", q: "Adakah anda mempunyai insurans?", a: "Ya. KL Renovator mempunyai insurans liabiliti perniagaan yang melindungi sebarang kerosakan tidak sengaja.", source: "/about" },
  { category: "warranty", q: "Apa itu sistem kad kerja anda?", a: "Setiap kerja menjana kad kerja bertulis yang mendokumenkan: butiran unit, kerja dilakukan, bahan digunakan, bacaan tekanan gas, tarikh mula waranti.", source: "/aircond-installation-kl" },

  // ─── KAWASAN (5 soalan) ────────────────────────────────────────────────────
  { category: "coverage", q: "Kawasan mana yang diliputi?", a: "Kami meliputi seluruh Lembah Klang — semua kawasan KL dan Selangor termasuk PJ, Ampang, Batu Caves, Cheras, Subang Jaya, Puchong, Shah Alam, Damansara, Klang, Kajang, dan lain-lain.", source: "/areas" },
  { category: "coverage", q: "Adakah anda servis kawasan berhampiran saya?", a: "Kami berkhidmat di seluruh KL dan Selangor — jika anda di Lembah Klang, kami liputi kawasan anda.", source: "/areas" },
  { category: "coverage", q: "Adakah anda meliputi Putrajaya dan Cyberjaya?", a: "Ya. Putrajaya dan Cyberjaya dalam kawasan liputan kami. Slot hari sama tersedia.", source: "/areas" },
  { category: "coverage", q: "Berapa jauh anda sanggup pergi?", a: "Kami meliputi seluruh Lembah Klang. Untuk kawasan luar, kami boleh mengatur untuk kerja komersial berbilang unit.", source: "/areas" },
  { category: "coverage", q: "Adakah caj tambahan untuk kawasan jauh?", a: "Tidak. Harga kami sama di seluruh KL dan Selangor.", source: "/areas" },

  // ─── JENAMA (5 soalan) ─────────────────────────────────────────────────────
  { category: "brands", q: "Jenama apa yang anda servis?", a: "Semua 20 jenama utama: Daikin, Panasonic, Mitsubishi, York, Midea, LG, Samsung, Carrier, O-General, Fujitsu, Hitachi, Sharp, Acson, dan lain-lain.", source: "/brands" },
  { category: "brands", q: "Mana lebih baik — Daikin atau Panasonic?", a: "Kedua-duanya cemerlang. Daikin terkenal dengan teknologi pemampat unggul. Panasonic menawarkan nilai hebat dengan penulenan udara Nanoe-X.", source: "/brands" },
  { category: "brands", q: "Adakah anda servis aircond inverter?", a: "Ya, kami servis semua model inverter merentasi setiap jenama.", source: "/services/repair" },
  { category: "brands", q: "Bolehkah pasang jenama yang tiada dalam senarai?", a: "Kemungkinan besar ya. WhatsApp kami nama jenama dan nombor model.", source: "/brands" },
  { category: "brands", q: "Adakah anda guna alat ganti asal?", a: "Kami menggunakan alat ganti asal atau setara OEM yang memenuhi atau melebihi spesifikasi pengeluar.", source: "/services/repair" },

  // ─── BTU & SAIZ (4 soalan) ─────────────────────────────────────────────────
  { category: "btu-sizing", q: "HP apa yang saya perlukan untuk bilik saya?", a: "Panduan: 1.0 HP untuk bilik hingga 150 kps, 1.5 HP untuk 150–250 kps, 2.0 HP untuk 250–400 kps, 2.5 HP untuk 400–550 kps, 3.0 HP untuk 550–700 kps.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "Bagaimana mengira BTU yang diperlukan?", a: "Formula asas: Luas bilik (kps) × 25 BTU untuk bilik standard, × 30 BTU untuk bilik menghadap barat atau tingkat atas.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "Adakah HP lebih besar sentiasa lebih baik?", a: "Tidak selalu. Unit terlalu besar menyejukkan terlalu cepat tanpa menghilangkan kelembapan dengan betul.", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "Adakah ketinggian siling mempengaruhi HP?", a: "Ya. Jika siling lebih tinggi (12 kaki+), anda memerlukan kapasiti penyejukan lebih kerana volum udara lebih besar.", source: "/aircond-installation-kl" },
];

// ─── CHINESE FAQ POOL (105 questions) ──────────────────────────────────────────
const ZH_FAQS: MasterFaqItem[] = [
  // ─── 安装 (18 questions) ──────────────────────────────────────────────────
  { category: "installation", q: "2026年 KL & 雪兰莪冷气安装费用是多少？", a: "壁挂式安装 1.0–1.5 HP 起价 RM 199，2.0 HP 起价 RM 249，2.5 HP 起价 RM 279，3.0 HP 起价 RM 329。天花板卡式机起价 RM 290。窗机起价 RM 199。每个价格均包含 7 英尺铜管、电线、真空泵抽气、检漏和调试——全部在开工前确认。", source: "/installation-price-malaysia" },
  { category: "installation", q: "RM 199 基础安装包含什么？", a: "RM 199 基础套餐包括：现场勘查、7 英尺正确尺寸的 L 型铜管、保温棉、穿管电线、PVC 排水管、强制两级真空抽气（至少 15 分钟）、真空泵调试（500微米）、完整调试和附 1 个月工艺保修的书面工单。", source: "/aircond-installation-kl" },
  { category: "installation", q: "冷气安装需要多长时间？", a: "标准壁挂式安装单台需 2–3 小时。天花板卡式机需 3–4 小时。同天安装两台约需 5–6 小时。我们绝不赶工——仅正确真空抽气就需至少 15–20 分钟。", source: "/aircond-installation-kl" },
  { category: "installation", q: "安装时是否会进行真空抽气？", a: "是的，绝对会。我们对每次安装进行两级真空泵抽气至少 15–20 分钟。正确的真空抽气能去除冷媒管路中的水分和空气，保护压缩机并确保最佳制冷效果。", source: "/aircond-installation-kl" },
  { category: "installation", q: "安装使用什么铜管？", a: "我们使用 L 型铜管，按每台机组的匹数正确选配尺寸。L 型壁厚优于便宜的 M 型，更耐用、更不易泄漏。", source: "/aircond-installation-kl" },
  { category: "installation", q: "能在公寓安装冷气吗？", a: "可以，我们在 KL 和雪兰莪各地有丰富的公寓安装经验。我们遵守物业管理规定，协调室外机在批准位置的放置，并处理 JMB/MC 审批要求。", source: "/new-home-aircond-installation" },
  { category: "installation", q: "安装有什么保修？", a: "每次安装均有 1 个月工艺保修。若我们的工程导致漏气、不制冷或排水问题，我们免费返修。更换零件有 3 个月保修。", source: "/aircond-installation-kl" },
  { category: "installation", q: "是否提供电气布线？", a: "是的。我们通过正规 PVC 线管布线。对于较大机型（2.5 HP 及以上），我们安装独立 MCB 断路器以确保安全运行。", source: "/aircond-installation-kl" },
  { category: "installation", q: "铜管上使用什么保温材料？", a: "我们使用闭孔保温棉——液管标准 9mm，气管 13mm。天花板卡式机和较长管路使用 19mm 厚度。", source: "/aircond-installation-kl" },
  { category: "installation", q: "能安装天花板卡式机吗？", a: "可以。天花板卡式机安装起价 RM 290。我们处理天花开口、悬挂安装、排水泵设置和所有电气工作。通常需要 3–4 小时。", source: "/ceiling-cassette-aircond-installation-kl" },
  { category: "installation", q: "能安装窗式冷气机吗？", a: "可以。窗机安装起价 RM 199。我们确保牢固安装并正确密封，防止雨水和昆虫进入。", source: "/window-unit-aircond-installation-kl" },
  { category: "installation", q: "雨季能安装吗？", a: "可以，马来西亚全年均可安装。大雨时我们确保室外机有适当防雨保护，所有穿墙孔用防水硅胶密封。", source: "/aircond-installation-kl" },
  { category: "installation", q: "老房子电线老旧怎么办？", a: "技术员会在现场勘查时检查电路容量。若现有电线无法安全承载冷气负荷，我们会告知所需的 MCB 升级。", source: "/aircond-installation-kl" },
  { category: "installation", q: "如何处理排水？", a: "我们安装最低 1:100 坡度的 PVC 排水管。若重力排水不可行，我们安装冷凝水泵。每条排水管在交付前都经过水测试。", source: "/aircond-installation-kl" },
  { category: "installation", q: "是否拆卸和搬迁现有冷气？", a: "是的。拆卸搬迁每台起价 RM 150。我们仔细断开连接、封闭冷媒管路、拆卸室内外机，并在新位置用新铜管重新安装。", source: "/services/dismantling-relocation" },
  { category: "installation", q: "最大管道长度是多少？", a: "大多数家用分体机推荐最大管长 15–20 米。超过 7 英尺（含在基础价内）的铜管按英尺收费。", source: "/installation-price-malaysia" },
  { category: "installation", q: "是否为新房安装？", a: "是的，新房安装是我们的核心服务之一。我们提供全屋套餐和批量折扣——5+ 台享 5% OFF Instant Booking Discount（5% 即时预订折扣），10 台以上享 10% OFF Instant Booking Discount（10% 即时预订折扣）。", source: "/new-home-aircond-installation" },
  { category: "installation", q: "是否提供商业安装？", a: "是的。我们为办公室、店铺、餐厅、诊所和小型仓库提供商业安装。天花板卡式机和壁挂式是我们的主要商业产品。", source: "/commercial-aircond-installation" },

  // ─── 保养 (12 questions) ──────────────────────────────────────────────────
  { category: "servicing", q: "冷气应该多久保养一次？", a: "轻度使用（晚间使用）：每 6 个月一次。重度使用（每天 8 小时以上）：每 3 个月一次。无论使用频率如何，建议每年进行一次化学清洗。", source: "/services/basic-servicing" },
  { category: "servicing", q: "基本保养包含什么？", a: "基本保养（起价 RM 99）包括：滤网清洗、前面板清洗、蒸发器表面清洗、风轮检查、排水管冲洗、电气连接检查、温控器校准、气压读数和诊断报告。", source: "/services/basic-servicing" },
  { category: "servicing", q: "保养能降低电费吗？", a: "能。干净的冷气比脏的少用 15–30% 的电。堵塞的滤网和线圈迫使压缩机更努力更长时间运行。", source: "/services/basic-servicing" },
  { category: "servicing", q: "冷气开着但不冷怎么办？", a: "最常见原因是冷媒不足、蒸发器脏或电容器故障。诊断费 RM 88（若进行维修则豁免）。", source: "/services/repair" },
  { category: "servicing", q: "冷气漏水怎么办？", a: "若漏水严重先关机。最常见原因是排水管堵塞——通常基本保养或化学清洗即可解决。若持续漏水，需要化学大修。", source: "/services/chemical-overhaul" },
  { category: "servicing", q: "冷气有噪音是什么原因？", a: "常见原因：前面板松动（咔嗒声）、风扇轴承磨损（摩擦声）、扇叶不平衡（振动）或压缩机问题（低沉嗡嗡声）。", source: "/services/repair" },
  { category: "servicing", q: "我的冷气使用哪种冷媒？", a: "查看室外机上的标签——标明冷媒类型（R22、R410A 或 R32）。或 WhatsApp 发送标签照片给我们。", source: "/services/gas-topup" },
  { category: "servicing", q: "是否提供商业保养？", a: "是的，我们为商铺、餐厅、办公室及中小型商业场所提供商用冷气服务。", source: "/services/basic-servicing" },
  { category: "servicing", q: "什么是年度保养合约（AMC）？", a: "年度保养合约包括定时保养（每年 2–4 次）、优先预约、维修折扣和免费诊断。适合办公室和多台冷气的住宅。", source: "/services/maintenance-contract" },
  { category: "servicing", q: "自己清洗滤网可以代替专业保养吗？", a: "每 2–4 周清洗滤网很好。但专业保养能清洁您无法接触的内部部件——蒸发器深层清洗、风轮、排水盘和气压检查。", source: "/services/basic-servicing" },
  { category: "servicing", q: "冷气有异味是什么原因？", a: "霉味通常表示蒸发器或排水盘上有微生物生长。化学清洗能杀灭并去除导致异味的生物膜。", source: "/services/chemical-wash" },
  { category: "servicing", q: "化学清洗和化学大修有什么区别？", a: "化学清洗（起价 RM 120）在安装状态下清洗。化学大修（起价 RM 220）完全拆卸进行深层清洁。", source: "/services/chemical-wash" },

  // ─── 化学清洗 (8 questions) ───────────────────────────────────────────────
  { category: "chemical-wash", q: "化学清洗费用是多少？", a: "化学清洗 1.0–1.5 HP 壁挂式起价 RM 120。天花板卡式机起价 RM 220。所有价格在开工前确认。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "化学清洗需要多长时间？", a: "高压化学清洗每台约 60–75 分钟。包括保护设置、化学施加、高压冲洗、重新组装、测试和交付。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "使用的化学品安全吗？", a: "是的。我们使用食品级、无腐蚀性的碱性清洁剂，对家人、儿童和宠物安全。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "应该多久做一次化学清洗？", a: "正常使用至少每 12 个月一次。重度使用建议 6 个月周期。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "化学清洗和基本保养有什么区别？", a: "基本保养（RM 99）清洁滤网和表面。化学清洗（RM 120）使用高压碱性溶液深层清洁内部线圈和排水通道。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "化学清洗能修复不冷的冷气吗？", a: "若原因是脏蒸发器或生物膜堵塞气流，可以。但若问题是低气压或电容器故障，则需要维修。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "化学清洗会损坏冷气吗？", a: "不会。正确操作下，化学清洗延长机组寿命。我们使用无腐蚀性化学品和适当压力（80–120 PSI）。", source: "/services/chemical-wash" },
  { category: "chemical-wash", q: "化学清洗能去除霉菌吗？", a: "能。碱性化学溶液杀灭霉菌群落并溶解其生长的生物膜。严重情况建议化学大修。", source: "/services/chemical-wash" },

  // ─── 化学大修 (6 questions) ───────────────────────────────────────────────
  { category: "overhaul", q: "什么时候需要化学大修？", a: "当：化学清洗后仍持续漏水、线圈结冰、3年以上未深层清洁时选择大修。", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "化学大修费用多少？", a: "起价 RM 220（1.0–1.5 HP 标准壁挂式）。过程需 2–2.5 小时。", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "大修需要多长时间？", a: "完整化学大修每台约 2–2.5 小时。室内机完全拆卸，每个部件浸泡清洗，然后重新组装测试。", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "大修能修复漏水吗？", a: "大多数情况能。持续漏水通常由内部排水通道堵塞造成，化学清洗无法到达，大修可以。", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "老冷气值得做大修吗？", a: "若机组不到 10 年且压缩机正常，大修非常划算——能以换新机一小部分的费用恢复近新性能。", source: "/services/chemical-overhaul" },
  { category: "overhaul", q: "大修清洗哪些部件？", a: "每个内部部件：前面板、滤网、蒸发器、风轮、排水盘、后托盘和排水管连接。", source: "/services/chemical-overhaul" },

  // ─── 充冷媒 (7 questions) ─────────────────────────────────────────────────
  { category: "gas-topup", q: "充气费用多少？", a: "加气按 PSI 收费：R22 (RM 2.50)、R410A (RM 3.00)、R32 (RM 3.00)。最终费用取决于技师检查后所需的实际 PSI。含漏气检查。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "冷气需要定期加气吗？", a: "不需要。正确安装的冷气不应多年泄漏冷媒。若需频繁加气，可能有泄漏需要修复。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "怎么知道冷气缺气？", a: "常见征兆：制冷减弱、铜管结冰、接头处有嘶嘶声、电费增加。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "R22、R410A 和 R32 有什么区别？", a: "R22 是正在淘汰的旧型冷媒。R410A 是目前主流标准。R32 是最新最环保的选择。每台机组只能用一种指定类型。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "充气前会检漏吗？", a: "是的，始终会。我们使用电子检漏仪和肥皂水检查所有接头后再充气。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "能自己充气吗？", a: "强烈不建议。冷媒操作需要专业压力表、真空设备和正确充注量知识。", source: "/services/gas-topup" },
  { category: "gas-topup", q: "充气需要多长时间？", a: "加气含检漏约 30–45 分钟。若需先修复泄漏，加 15–30 分钟。", source: "/services/gas-topup" },

  // ─── 维修 (8 questions) ───────────────────────────────────────────────────
  { category: "repair", q: "维修费用多少？", a: "诊断费 RM 88（维修则豁免）。常见维修：电容器 RM 80–150，PCB 板 RM 150–350，风扇电机 RM 180–280，压缩机 RM 600–1,200。", source: "/services/repair" },
  { category: "repair", q: "冷气完全不工作了怎么办？", a: "检查：(1) 断路器是否跳闸？(2) 遥控器有电吗？(3) 机组有电源指示灯吗？若断路器反复跳闸，可能有电气故障。", source: "/services/repair" },
  { category: "repair", q: "冷气结冰是什么原因？", a: "结冰通常意味着：冷媒不足、蒸发器脏堵气流或风扇电机故障。关机让冰融化后预约服务。", source: "/services/repair" },
  { category: "repair", q: "遥控器不工作怎么办？", a: "先换电池（AAA）。若仍不行，室内机的红外接收器可能故障——我们携带常见替换零件。", source: "/services/repair" },
  { category: "repair", q: "冷气跳闸是什么原因？", a: "跳闸通常表示：压缩机故障电流过大、电容器短路或电线损坏。这是安全问题——请勿反复复位。", source: "/services/emergency" },
  { category: "repair", q: "有紧急维修吗？", a: "有。KL 和雪兰莪提供当天紧急维修。标准时间 9AM–6PM；6PM–10PM 附加 RM 50。", source: "/services/emergency" },
  { category: "repair", q: "老冷气值得修吗？", a: "通常若维修费超过新机 50%，更换更划算。10–12 年以上使用 R22 的机组建议更换为更高效的 R32 变频机型。", source: "/services/repair" },
  { category: "repair", q: "所有品牌都修吗？", a: "是的，维修所有 20 个主要品牌，包括大金、松下、三菱、约克、美的、LG、三星等。变频和定频均修。", source: "/services/repair" },

  // ─── 价格 (8 questions) ───────────────────────────────────────────────────
  { category: "pricing", q: "有隐藏收费吗？", a: "绝对没有。开工前提供完整报价。额外材料在现场告知并获得批准后才进行。", source: "/installation-price-malaysia" },
  { category: "pricing", q: "非营业时间费用多少？", a: "标准时间 9AM–6PM。6PM–10PM 加收 RM 50。非营业时间诊断费总计 RM 138。", source: "/services/emergency" },
  { category: "pricing", q: "有多台折扣吗？", a: "有！5+ 台享 5% OFF Instant Booking Discount（5% 即时预订折扣），10 台以上享 10% OFF Instant Booking Discount（10% 即时预订折扣）。折扣适用于人工费。", source: "/installation-price-malaysia" },
  { category: "pricing", q: "基本保养多少钱？", a: "基本保养标准壁挂式 1.0–2.5 HP 每台起价 RM 99。", source: "/aircond-service-price-malaysia" },
  { category: "pricing", q: "基础价包含什么？额外费用呢？", a: "包含：7 英尺铜管、电线、PVC 排水、真空、检漏、调试。额外：超长铜管、重型支架、线槽、混凝土钻孔、MCB、冷凝水泵。", source: "/installation-price-malaysia" },
  { category: "pricing", q: "上门估价收费吗？", a: "WhatsApp 估价免费。安装的现场勘查包含在套餐内。维修诊断 RM 88，若进行维修则豁免。", source: "/services/repair" },
  { category: "pricing", q: "能刷卡吗？", a: "接受银行转账（首选）、现金和电子钱包。大型工程可安排信用卡支付。", source: "/contact" },
  { category: "pricing", q: "价格包含 SST 吗？", a: "所有报价即最终价格——无额外 SST 或服务费。", source: "/installation-price-malaysia" },

  // ─── 预约 (6 questions) ───────────────────────────────────────────────────
  { category: "booking", q: "如何预约？", a: "最快方式：WhatsApp +60 18-298 3573。告知机型、匹数、地区和问题。", source: "/contact" },
  { category: "booking", q: "有当天服务吗？", a: "有，视技术员档期而定。上午 11 点前 WhatsApp 预约当天成功率最高。", source: "/contact" },
  { category: "booking", q: "能预约指定日期吗？", a: "可以。接受提前预约指定日期和偏好时段。", source: "/contact" },
  { category: "booking", q: "服务时需要有人在家吗？", a: "是的，需要有人提供通道并验收完工。", source: "/contact" },
  { category: "booking", q: "应该提前多久预约？", a: "常规保养通常当天或隔天有档期。安装建议提前 1–2 天。周末建议提前 2–3 天。", source: "/contact" },
  { category: "booking", q: "能取消或改期吗？", a: "可以，请至少提前 4 小时通知。取消和改期免费。", source: "/contact" },

  // ─── 保修 (8 questions) ───────────────────────────────────────────────────
  { category: "warranty", q: "服务有保修吗？", a: "有。所有工艺 1 个月保修。更换零件 3 个月保修。保修期内相关问题免费返修。", source: "/services/repair" },
  { category: "warranty", q: "KL Renovator 是注册公司吗？", a: "是的。KL Renovator 隶属 Multicore Dynamics Resources，SSM 注册（003765188-T）。", source: "/about" },
  { category: "warranty", q: "安装会影响原厂保修吗？", a: "不会。我们严格遵循品牌安装规范，原厂保修完全保留。", source: "/aircond-installation-kl" },
  { category: "warranty", q: "服务后出问题怎么办？", a: "保修期内相关问题，WhatsApp 附上工单详情，我们安排免费返修。", source: "/services/repair" },
  { category: "warranty", q: "有客户评价吗？", a: "有，Google 和我们的评价页面有 500+ 条真实客户评价。", source: "/review" },
  { category: "warranty", q: "技术员有资质吗？", a: "是的。所有技术员受过 HVAC 专业培训，持有相关资质认证。", source: "/about" },
  { category: "warranty", q: "有保险吗？", a: "有。KL Renovator 投保商业责任险，覆盖工作期间的意外财产损失。", source: "/about" },
  { category: "warranty", q: "工单系统是什么？", a: "每项工作均生成书面工单，记录：机组详情、施工内容、使用材料、气压读数、保修起始日和技术员签名。", source: "/aircond-installation-kl" },

  // ─── 覆盖范围 (5 questions) ───────────────────────────────────────────────
  { category: "coverage", q: "覆盖哪些地区？", a: "覆盖整个巴生谷——KL 和雪兰莪所有地区，包括八打灵再也、安邦、蕉赖、梳邦再也、蒲种、莎阿南等。", source: "/areas" },
  { category: "coverage", q: "你们在我附近服务吗？", a: "我们服务整个 KL 和雪兰莪——在巴生谷内，我们都覆盖。", source: "/areas" },
  { category: "coverage", q: "覆盖布城和赛城吗？", a: "是的。布城和赛城在我们的服务范围内，提供当天服务。", source: "/areas" },
  { category: "coverage", q: "最远服务到哪里？", a: "覆盖整个巴生谷。巴生谷以外的大型商业工程可特别安排。", source: "/areas" },
  { category: "coverage", q: "远地区额外收费吗？", a: "不收费。KL 和雪兰莪全区统一定价。", source: "/areas" },

  // ─── 品牌 (5 questions) ───────────────────────────────────────────────────
  { category: "brands", q: "服务哪些品牌？", a: "所有 20 个主要品牌：大金、松下、三菱、约克、美的、LG、三星、开利、富士通、日立、夏普等。变频和定频均可。", source: "/brands" },
  { category: "brands", q: "大金和松下哪个好？", a: "两者都很优秀。大金以卓越压缩机技术著称，松下以 Nanoe-X 空气净化提供高性价比。", source: "/brands" },
  { category: "brands", q: "修变频冷气吗？", a: "是的，维修所有品牌的变频机型。我们的技术员受过各主流变频平台培训。", source: "/services/repair" },
  { category: "brands", q: "列表外的品牌能安装吗？", a: "大概率可以。WhatsApp 发送品牌名和型号给我们。", source: "/brands" },
  { category: "brands", q: "用原厂零件吗？", a: "使用原厂或满足甚至超越制造商规格的 OEM 等效零件。绝不用廉价替代品。", source: "/services/repair" },

  // ─── BTU 与选型 (4 questions) ─────────────────────────────────────────────
  { category: "btu-sizing", q: "我的房间需要几匹？", a: "指南：1.0 HP 适合 150 平方英尺以下，1.5 HP 适合 150–250 平方英尺，2.0 HP 适合 250–400 平方英尺，2.5 HP 适合 400–550 平方英尺，3.0 HP 适合 550–700 平方英尺。", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "如何计算所需 BTU？", a: "基本公式：房间面积（平方英尺）× 25 BTU（标准房间），× 30 BTU（朝西或顶楼）。", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "匹数越大越好吗？", a: "不一定。过大的机组制冷过快但除湿不充分，且频繁启停增加磨损和耗电。", source: "/aircond-installation-kl" },
  { category: "btu-sizing", q: "层高影响选型吗？", a: "是的。层高超过 10 英尺时需要更大制冷量，因为空气体积更大。每多 1 英尺约增加 10% BTU。", source: "/aircond-installation-kl" },
];

// ─── EXPORT ─────────────────────────────────────────────────────────────────────
export const masterFaqPool: Record<Lang, MasterFaqItem[]> = {
  en: EN_FAQS,
  ms: MS_FAQS,
  zh: ZH_FAQS,
};
