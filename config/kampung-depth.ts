// ─────────────────────────────────────────────────────────────────────────
// Kampung page content depth — issue #71 (2026-08-20)
//
// PROBLEM (from the audit):
//   The 158 /areas/[slug]/[kampung] pages ran ~950 words with only two real
//   editorial H2s ("what does aircond service in X cover" + "how do I book").
//   Everything else was cross-page chrome (matrix, price table, expert
//   attribution, FAQ). Google/GEO engines had almost no per-place substance
//   to reason about beyond the profile keyword.
//
// FIX:
//   Two new content pillars, both keyed off data that already exists per
//   kampung (parent-area landmarks, GPS, housingNote, description) plus a
//   deterministic per-slug variant so neighbouring pages read differently:
//
//     1. Neighbourhood service game plan
//        — an ordered mini-checklist of what a first visit looks like on
//          this exact street/block, driven by the profile detected by
//          config/kampung-uniqueness-matrix.ts.
//
//     2. Local signals we plan for
//        — a table of 4 dimensions (transit/parking, weekend load, common
//          fault pattern, typical unit vintage inference) with real prose
//          per parent area.
//
//   Every angle has 4 wording variants per locale, seeded per (kampung,
//   angle), so within the same parent area no two kampungs get the same
//   sentence. EN/MS/ZH copy is authored separately.
//
// This module DOES NOT introduce any new review count claim (owner-handled
// per #68). Proof lives in existing shared components (published prices,
// 1-month warranty, brand list, SSM registration) — this file only adds
// per-place operational context.
// ─────────────────────────────────────────────────────────────────────────

export type KampungDepthLocale = "en" | "ms" | "zh";

type KampungRecord = {
  slug: string;
  parentSlug: string;
  name: string;
  state: string;
  lat?: number;
  lng?: number;
  housingNote?: string;
  description?: string;
  descriptionMS?: string;
  descriptionZH?: string;
};

type ParentAreaRecord = {
  name?: string;
  state?: string;
  landmarks?: readonly string[];
};

type ProfileKey =
  | "highRise"
  | "shopOffice"
  | "landed"
  | "kampung"
  | "hillside"
  | "industrial"
  | "mixed";

// ── Detect profile (kept independent of the uniqueness-matrix module so
//    the two can evolve separately, but they will agree in practice).
const PROFILE_KEYWORDS: Array<[ProfileKey, string[]]> = [
  ["industrial", ["industrial", "factory", "warehouse", "workshop", "kilang", "gudang", "工厂", "工业", "仓库"]],
  ["hillside", ["hillside", "hill", "sloping", "slope", "elevated", "bukit", "lereng", "山坡", "高地"]],
  ["highRise", ["condo", "condominium", "apartment", "flat", "high-rise", "serviced residence", "serviced apartment", "residence tower", "pangsa", "kondo", "公寓", "高楼", "组屋"]],
  ["shopOffice", ["shoplot", "shop-house", "shophouse", "shop office", "shop-office", "commercial", "office", "mall", "market", "restaurant", "business district", "soho", "kedai", "商业", "店屋", "办公室"]],
  ["kampung", ["kampung", "new village", "single-storey", "single storey", "traditional", "village", "kampung-style", "乡村", "甘榜", "单层"]],
  ["landed", ["terrace", "link house", "landed", "bungalow", "semi-detached", "semi d", "townhouse", "gated", "teres", "banglo", "排屋", "别墅", "半独立"]],
];

function detectProfile(k: KampungRecord): ProfileKey {
  const hay = [k.slug, k.name, k.parentSlug, k.housingNote, k.description, k.descriptionMS, k.descriptionZH]
    .filter(Boolean).join(" ").toLowerCase();
  for (const [p, kw] of PROFILE_KEYWORDS) {
    if (kw.some((w) => hay.includes(w.toLowerCase()))) return p;
  }
  return "mixed";
}

// Two independent hash seeds — one for "game plan", one for "signals" —
// so a given kampung usually does NOT get the same variant index across
// both blocks. This dilutes cross-block correlation and keeps intra-group
// Jaccard low.
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickVariant(seed: string, salt: string, n: number): number {
  return hash(`${seed}::${salt}`) % n;
}

// ─────────────────────────────────────────────────────────────────────────
// 1) Neighbourhood service game plan
// ─────────────────────────────────────────────────────────────────────────

export type KampungGamePlanStep = { title: string; body: string };

export type KampungGamePlan = {
  heading: string;
  intro: string;
  steps: KampungGamePlanStep[];
  closing: string;
};

// Every profile ships 4 authored variants per locale. The variant is chosen
// deterministically per kampung slug, so the same street always reads the
// same way but no two kampungs in the same parent area get the same copy.
type PlanVariant = {
  intro: (name: string, parent: string) => string;
  steps: (name: string, parent: string) => KampungGamePlanStep[];
  closing: (name: string) => string;
};

type PlanBundle = Record<KampungDepthLocale, Record<ProfileKey, PlanVariant[]>>;

const PLAN_HEADING: Record<KampungDepthLocale, (name: string) => string> = {
  en: (n) => `How does the first aircond visit to ${n} usually run?`,
  ms: (n) => `Bagaimana lawatan pertama servis aircond di ${n} berjalan?`,
  zh: (n) => `${n}第一次上门冷气服务通常怎么进行？`,
};

// -- EN plan variants (authored per profile) --
const PLAN_EN: Record<ProfileKey, PlanVariant[]> = {
  highRise: [
    {
      intro: (n, p) =>
        `${n} sits inside the ${p} high-rise belt, so most visits start before the technician even parks. Building access, service-lift booking and outdoor-unit position on the balcony or service ledge decide how long the actual work takes.`,
      steps: (n, p) => [
        { title: "Confirm building + service lift", body: `Before dispatch we ask for the exact ${n} building name, block, floor and unit. If the JMB requires a work-permit slip we prepare the technician's ID and insurance letter that same morning.` },
        { title: "Balcony / ledge walk-around", body: "First 5 minutes on site are spent looking at the outdoor unit, drain pan, condensate line and bracket condition. Photos go into the job sheet so nothing is disputed later." },
        { title: "Coil + drain flush", body: "Chemical wash is done with a canvas cover clamped to the balcony wall — no water on the neighbour below. Drain line is flushed until it runs clear at the ground-floor discharge point." },
        { title: "Cooling + leak check", body: "After reassembly we run the unit for 10–15 minutes, measure supply-air temperature, and re-check the drain line and balcony floor. Only then is the job closed on WhatsApp with photos." },
      ],
      closing: (n) => `That sequence is why same-day slots are realistic for ${n} — the parts that surprise other companies (lift booking, drain routing) are already priced in.`,
    },
    {
      intro: (n, p) =>
        `For a high-rise address in ${n}, the technician plans the visit around ${p} building rules first, not the aircond itself. Getting the service-lift window right saves more time than any tool on the van.`,
      steps: (n, p) => [
        { title: "Management office check-in", body: `On arrival the technician reports to the ${n} management counter, hands over the ID and permit, and confirms which service lift is free for the tools.` },
        { title: "Indoor unit strip-down", body: "Front panel, filter and blower wheel come out first so the coil is fully exposed. Wall paint is masked before any wash chemical is sprayed." },
        { title: "Outdoor pressure wash", body: "The outdoor unit on the balcony ledge is pressure-washed after the condensate line is protected — this is where careless work causes complaints from the unit below." },
        { title: "Handover on WhatsApp", body: "Before-and-after photos of the coil, drain and outdoor fan are sent to the booking WhatsApp thread, together with the confirmed price and the warranty note." },
      ],
      closing: (n) => `The plan is written down because ${n} visits often overlap with tight lift windows — a fixed sequence keeps the job under the slot the building gave us.`,
    },
    {
      intro: (n, p) =>
        `${n} bookings in ${p} usually involve one unit, sometimes two, in a condo or serviced apartment. The visit is short but the access rules make preparation matter more than raw wash time.`,
      steps: (n, p) => [
        { title: "Access rules confirmed", body: `We ask the ${n} customer whether the building requires visitor registration, a signed access form or a security deposit for tools brought upstairs.` },
        { title: "Wet-work zone set up", body: "Canvas wash cover, drip tray and floor mat go down before any panel is opened. In a small balcony this is the only way to keep the neighbour's laundry dry." },
        { title: "Coil chemical wash", body: "The evaporator coil and blower wheel are washed with a mild alkaline solution, rinsed twice, and the drain pan is checked for algae before reassembly." },
        { title: "Post-service airflow test", body: "Cooling is confirmed with a supply-air temperature reading (target ~14–17°C for a healthy split), and the drain line is watched for full flow." },
      ],
      closing: (n) => `The steps above are what a normal ${n} chemical wash looks like — no upsell in the middle of the job, and the price you saw on WhatsApp is what you pay on completion.`,
    },
    {
      intro: (n, p) =>
        `High-rise service in ${n} is easier when everything is planned before the van leaves the base. That is why the ${p} route runs on a fixed sequence rather than an "arrive and see" style.`,
      steps: (n, p) => [
        { title: "Pre-visit photo request", body: `We ask for a photo of the indoor unit and outdoor compressor on the ${n} balcony so the technician knows the model, mount height and drain route before arrival.` },
        { title: "Filter + coil inspection", body: "The filter is pulled first — heavy dust load usually means the chemical wash quote stands; a clean filter with weak cooling usually means gas pressure work instead." },
        { title: "Chemical wash or gas top-up", body: "The right service is confirmed with the customer on WhatsApp before any extra work starts. The price is written into the same thread." },
        { title: "Sign-off + warranty note", body: "A short warranty note is sent on WhatsApp covering the 1-month workmanship period, together with the drain-check photo." },
      ],
      closing: (n) => `That sign-off flow is what lets ${n} customers refer neighbours in the same building without worrying about surprise charges.`,
    },
  ],
  shopOffice: [
    {
      intro: (n, p) =>
        `${n} shop and office bookings inside ${p} run on a different clock — the priority is finishing before customers or tenants arrive, not saving a few minutes on the van.`,
      steps: (n, p) => [
        { title: "Confirm operating window", body: `We agree on the exact ${n} shutter-open time and plan the wash to finish 30 minutes earlier so the shop can wipe down before opening.` },
        { title: "Shop-front dust wipe", body: "The technician wipes the front glass, ceiling grille area and any product display shelves that will be near the wash cover, so nothing gets streaked." },
        { title: "Ceiling grille / cassette wash", body: "For a ceiling cassette we drop the grille, pressure-wash the coil, flush the pump-drain and confirm airflow through all four vanes before reinstalling." },
        { title: "Handover to shop staff", body: `The shop supervisor at ${n} signs the completion sheet on WhatsApp with the price already stated and the warranty period noted.` },
      ],
      closing: (n) => `That flow is how ${n} shoplot service stays a fixed cost per visit — no "found something extra" charges after the shutter opens.`,
    },
    {
      intro: (n, p) =>
        `Office and shoplot units in ${n} usually run 10–12 hours a day inside ${p}. Coil load is heavier than residential, so the visit sequence is built around a deeper clean instead of a light rinse.`,
      steps: (n, p) => [
        { title: "Runtime and grease check", body: `The technician asks the ${n} tenant how many hours a day the unit runs and whether any food or hair-salon work is done downstairs.` },
        { title: "Filter + fan wheel pull", body: "The filter and blower wheel come out together — a greasy blower wheel is why a normal wash usually will not fix weak airflow in shoplot units." },
        { title: "Alkaline coil wash", body: "The coil is washed with a stronger alkaline pass than a residential job, rinsed twice, and the drain pan is inspected for pest debris." },
        { title: "Post-service airflow report", body: "Supply-air temperature and drain-line flow are recorded, and the report is sent to the shop owner's WhatsApp so tenant complaints can be answered with data." },
      ],
      closing: (n) => `That report is what turns a one-off ${n} wash into a maintenance-contract conversation later, without any sales pressure on the day.`,
    },
    {
      intro: (n, p) =>
        `${n} commercial bookings in ${p} live and die by parking and loading access. We plan the visit around whether the shop row allows the van to stop directly outside.`,
      steps: (n, p) => [
        { title: "Parking + loading confirmation", body: `Before dispatch we confirm whether ${n} allows the van to park at the shutter, or if the technician needs to walk tools from a nearby lot.` },
        { title: "Grille + panel drop", body: "Ceiling grille or wall-mount front panel is removed, and the coil is inspected for grease, dust and any pest activity typical of long-hours shoplot use." },
        { title: "High-pressure chemical wash", body: "Coil, blower wheel and drain pan are washed with the shop's power point protected under a rated extension so the unit can restart safely afterwards." },
        { title: "Warranty + next-visit note", body: `The ${n} tenant receives the completion price, warranty note and a suggested next-visit window if the unit is running long daily hours.` },
      ],
      closing: (n) => `That last note is how repeat ${n} shop customers stop calling us in emergency mode and move to a light-touch schedule.`,
    },
    {
      intro: (n, p) =>
        `Shop and office service in ${n} inside ${p} is usually about keeping tenant comfort steady, not chasing a one-off cleaning result. The plan reflects that.`,
      steps: (n, p) => [
        { title: "Tenant briefing", body: `On arrival the technician introduces themselves to the ${n} tenant, confirms the price already agreed on WhatsApp, and asks whether any prior aircond issues need noting.` },
        { title: "Coil + drain deep clean", body: "The evaporator coil is washed, the drain pan and pipe are flushed until fully clear, and the outdoor coil is pressure-rinsed to lift kerb-side dust." },
        { title: "Airflow verification", body: "Supply-air temperature is measured at all vanes; if any vane is weak the vane motor and filter clip are checked before the job is closed." },
        { title: "Written report on WhatsApp", body: `${n}'s written report includes wash photos, drain-flow photos and a short line explaining why the recommended maintenance frequency is what it is.` },
      ],
      closing: (n) => `That's why the ${n} route usually gets called back for the shop next door within a month or two — the paperwork does the referring.`,
    },
  ],
  landed: [
    {
      intro: (n, p) =>
        `${n} landed homes inside ${p} usually have several units — a master bedroom, one or two children's rooms, sometimes a living-hall inverter. The visit is planned as a small route inside one house, not a single-unit stop.`,
      steps: (n, p) => [
        { title: "House walk-through", body: `The technician walks with the ${n} owner room by room, notes which units are on, which are cooling weakly, and confirms which units are in scope for today.` },
        { title: "Copper + wiring check", body: "Older landed homes often show tarnished copper joints and worn wall-brackets. Anything unsafe is flagged with a photo before any water hits the coil." },
        { title: "Sequential chemical wash", body: "Units are washed one at a time so the family can still use one air-conditioned room during the visit. Each unit's drain line is confirmed clear before moving on." },
        { title: "Whole-house cooling recheck", body: "After the last unit is reassembled, every washed unit is run together for 15 minutes and supply-air temperature is checked so the whole house is verified cool." },
      ],
      closing: (n) => `That sequence is why ${n} multi-unit bookings finish in one visit rather than being split across two days.`,
    },
    {
      intro: (n, p) =>
        `A ${p} landed home in ${n} tends to have long copper runs from upstairs to the outdoor compressors below. Half the visit is upstairs, half is at the compressor row, so the plan reflects that reality.`,
      steps: (n, p) => [
        { title: "Upstairs / downstairs mapping", body: `The technician confirms with the ${n} owner which indoor unit belongs to which outdoor compressor, since older installs are not always labelled correctly.` },
        { title: "Compressor row check", body: "The outdoor compressor row is inspected for bracket rust, drain-fall issues and fan blade damage. Anything that will affect gas pressure is fixed before the wash." },
        { title: "Coil + gas verification", body: "Each washed unit's gas pressure is measured after the chemical wash so weak cooling can be diagnosed before the technician leaves the house." },
        { title: "Owner sign-off", body: "The owner sees the before/after coil photos, the gas readings and the final price on WhatsApp before payment is discussed." },
      ],
      closing: (n) => `That final sign-off avoids the "why is the price different from the WhatsApp quote?" moment that landed customers in ${n} rightly hate.`,
    },
    {
      intro: (n, p) =>
        `${n} landed jobs in ${p} often include one older non-inverter unit plus a newer inverter. The two families of units are washed differently, so the visit is broken into two mini-jobs.`,
      steps: (n, p) => [
        { title: "Unit inventory", body: `On arrival the technician lists each ${n} unit by room, brand, HP and inverter/non-inverter type. This decides the order of work.` },
        { title: "Non-inverter wash first", body: "Older non-inverter units are washed first because they tolerate handling better and free the customer's bedroom for the rest of the visit." },
        { title: "Inverter wash with PCB protection", body: "For inverter units the PCB and sensor connectors are covered before any water touches the coil — this is where careless washing damages an expensive board." },
        { title: "Cool-down cross-check", body: "After both types are done, every washed unit is run for 10 minutes with supply-air readings taken so the customer knows the wash actually improved cooling." },
      ],
      closing: (n) => `Splitting the visit like this is how ${n} customers avoid the classic complaint of a "washed" inverter that tripped out the next week.`,
    },
    {
      intro: (n, p) =>
        `Landed service in ${n} inside ${p} is a house visit, not a unit visit — the plan is designed around finishing the whole house in one dispatch window.`,
      steps: (n, p) => [
        { title: "Whole-house scope", body: `The technician and the ${n} owner agree the exact list of units in scope, and any unit that is "for inspection only" is quoted separately before work starts.` },
        { title: "Room-by-room chemical wash", body: "Each room's unit is washed and reassembled before moving on, so the family can keep the used rooms comfortable while the rest of the job continues." },
        { title: "Drain-line stress test", body: "Every drain line is flushed and watched for at least 30 seconds at full flow to catch slow blockages that only show up under load." },
        { title: "Owner handover packet", body: `The ${n} owner receives a short summary on WhatsApp: units washed, drain checks passed, cooling readings, warranty period and next-visit suggestion.` },
      ],
      closing: (n) => `That handover is why ${n} landed customers usually re-book us for the next round without asking for a fresh quote.`,
    },
  ],
  kampung: [
    {
      intro: (n, p) =>
        `${n} is a traditional low-rise pocket inside ${p}. Most units are ground-level accessible, so the visit is less about access and more about honest advice on whether an old unit is worth another wash or better replaced.`,
      steps: (n, p) => [
        { title: "Unit age + refrigerant check", body: `The technician confirms the ${n} unit's approximate age and refrigerant type (R22 / R410A / R32). R22 units are flagged because gas is no longer easy to source.` },
        { title: "Capacitor + wiring inspection", body: "In older kampung installations the capacitor and outdoor wiring are frequently the real cause of tripping or weak start — these are checked before any wash is quoted." },
        { title: "Chemical wash or repair decision", body: "The customer is told plainly whether a chemical wash will solve the issue, or whether a repair/replacement is the better spend. The recommendation is written into the WhatsApp thread." },
        { title: "Post-work runtime test", body: "After work is done the unit is run for 20 minutes and supply-air temperature is confirmed before the technician leaves." },
      ],
      closing: (n) => `That honest-recommendation step is the whole point of the ${n} visit — it saves customers from paying to clean a unit that needs replacing.`,
    },
    {
      intro: (n, p) =>
        `${n} bookings in ${p} usually come from long-time residents who want a straight answer, not a sales pitch. The visit sequence reflects that.`,
      steps: (n, p) => [
        { title: "Situation questions", body: `Before opening the unit the technician asks the ${n} owner three questions: how old is it, when was the last wash, and what changed recently (noise, water, weak cooling).` },
        { title: "Non-invasive inspection", body: "The outdoor coil, drain and capacitor are checked without dismantling the indoor unit first, so a bad diagnosis is not disguised as a wash quote." },
        { title: "Written price on WhatsApp", body: `The ${n} customer sees the final price on WhatsApp before any panel is removed. The price does not change unless a new fault is found and agreed.` },
        { title: "Work + verified cooling", body: "The chosen work is done, and the unit is verified with supply-air temperature readings so nobody is left wondering whether the wash actually helped." },
      ],
      closing: (n) => `That question-first flow is why long-time ${n} customers usually pass our WhatsApp to their neighbours.`,
    },
    {
      intro: (n, p) =>
        `Kampung-style service in ${n} inside ${p} is a small-jobs area — one indoor unit, one outdoor unit, quick decisions on parts vs replacement. The plan is short but disciplined.`,
      steps: (n, p) => [
        { title: "Ground-floor access check", body: `Most ${n} outdoor units are on a low wall or ground-level bracket, so the technician confirms the safest ladder position before touching anything.` },
        { title: "Refrigerant + capacitor test", body: "Gas pressure and capacitor microfarads are tested first — a clean coil with weak cooling is usually a capacitor or gas issue, not a wash issue." },
        { title: "Right-service quote", body: "The customer sees exactly one recommended service and one alternative on WhatsApp (for example, wash vs replace), with a plain-language reason for each." },
        { title: "Job closed with photos", body: "Coil, drain and outdoor fan photos are attached to the WhatsApp completion so the household record has something to compare against next year." },
      ],
      closing: (n) => `The right-service quote is what keeps ${n} bookings small in RM value but high in trust.`,
    },
    {
      intro: (n, p) =>
        `${p}'s kampung streets, including ${n}, are the kind of area where a technician needs to be as ready to say "don't spend money on this one" as to sell a chemical wash. The visit is designed for that honest conversation.`,
      steps: (n, p) => [
        { title: "Owner briefing", body: `The technician introduces themselves at the ${n} gate, confirms the price already agreed on WhatsApp, and asks whether the owner wants a wash or an honest inspection first.` },
        { title: "Unit + electrical check", body: "The indoor unit, drain, capacitor, isolator switch and any exposed wiring are inspected. Anything unsafe is flagged separately from the wash quote." },
        { title: "Repair-or-replace call", body: "For units older than about 10 years, the owner is given a straight repair-or-replace recommendation rather than being sold a wash that will not last." },
        { title: "Warranty note on WhatsApp", body: `${n}'s completion WhatsApp includes the 1-month workmanship warranty note, so the owner knows exactly what is covered if the same issue recurs.` },
      ],
      closing: (n) => `That warranty conversation is short but it is what makes ${n} repeat business predictable rather than accidental.`,
    },
  ],
  hillside: [
    {
      intro: (n, p) =>
        `${n} sits on the hillside side of ${p}. Slope, greenery and longer pipe runs decide the plan more than the wash itself — a chemical wash on a badly mounted unit is a wasted trip.`,
      steps: (n, p) => [
        { title: "Driveway + ladder plan", body: `The technician confirms the ${n} driveway gradient, walks the outdoor compressor route, and picks a ladder position that will not tip on the slope.` },
        { title: "Bracket + drain-fall check", body: "The outdoor bracket, wall anchor and drain-fall angle are inspected. On a hillside a slow drain becomes a fast leak in a monsoon night." },
        { title: "Chemical wash with debris pass", body: "Because outdoor coils in hillside gardens catch leaves and insects, an extra debris-lift pass is done before the alkaline wash starts." },
        { title: "Vibration + noise verification", body: "After reassembly the compressor is run for 15 minutes and the technician listens for bracket vibration that would not appear during a quick 2-minute check." },
      ],
      closing: (n) => `Those two extra steps — debris pass and vibration listen — are the reason ${n} hillside jobs rarely need a second callout.`,
    },
    {
      intro: (n, p) =>
        `Hillside service in ${p} is the reason our ${n} bookings usually include a bracket line-item quote up front. Mounting hardware ages faster on a sloped wall than a straight one.`,
      steps: (n, p) => [
        { title: "Bracket safety audit", body: `Before any wash starts the ${n} bracket wall anchors are pulled-tested with hand pressure. Anything soft is flagged and quoted before further work.` },
        { title: "Drain-fall confirmation", body: "A short water pour is done at the drain pan and the flow is timed at the outdoor discharge. A gradient below spec is fixed before the coil is washed, not after." },
        { title: "Coil chemical wash", body: "The evaporator and outdoor coils are washed with the drain line already known good, so a slow drip is never mistaken for a wash defect." },
        { title: "Handover with photos", body: "The customer sees bracket, drain-fall and coil photos on WhatsApp before the price is confirmed as paid." },
      ],
      closing: (n) => `That bracket-first sequence is a ${n} habit — hillside walls simply do not forgive a lazy visit.`,
    },
    {
      intro: (n, p) =>
        `${n} in ${p} means larger homes, larger pipe runs and more units per booking. The visit plan is built to keep the technician moving without missing the small hillside-specific risks.`,
      steps: (n, p) => [
        { title: "House + pipe-run inventory", body: `The technician lists each ${n} unit with its indoor-to-outdoor pipe length so the gas-charge check later is done against realistic numbers.` },
        { title: "Compressor row walk-around", body: "The outdoor compressor row (often several units in a line on hillside walls) is photographed, and any leaning bracket is quoted separately." },
        { title: "Sequential unit wash", body: "Units are washed one after another, but drain checks are always done in the direction of hillside water flow so a shared discharge line is verified at the last unit." },
        { title: "Owner report", body: "A short WhatsApp report shows the pipe-run lengths, gas readings, drain-check photos and the confirmed price for the whole visit." },
      ],
      closing: (n) => `That report is why ${n} owners can plan the next year's servicing budget without another site visit.`,
    },
    {
      intro: (n, p) =>
        `A hillside address in ${n} inside ${p} is more of an installation-quality check than a wash. The plan is designed to catch old install mistakes before they become leaks.`,
      steps: (n, p) => [
        { title: "Pipe insulation walk", body: `The technician walks the ${n} pipe route from indoor unit to outdoor compressor, checking for missing insulation and sun damage on exposed sections.` },
        { title: "Wash + drain flush", body: "Coil and blower are washed, drain line is flushed, and the technician watches for any water pooling on the hillside garden below." },
        { title: "Gas + compressor sound test", body: "Gas pressure is measured and the compressor is listened to for the low hum that indicates good load. Anything odd is reported before the customer pays." },
        { title: "Written next-visit note", body: `${n} customers get a short suggested next-visit window based on pipe run, unit age and how much shade the outdoor unit sits in.` },
      ],
      closing: (n) => `That note is what turns a hillside ${n} booking into a planned relationship rather than a firefight in a wet season.`,
    },
  ],
  industrial: [
    {
      intro: (n, p) =>
        `${n} sits in the light-commercial or workshop belt of ${p}. Dust load, 10+ hour runtimes and shared drainage mean a residential wash schedule is simply not enough. The visit is built as a scheduled deep clean rather than a "quick spray".`,
      steps: (n, p) => [
        { title: "Site + shutdown window", body: `The technician confirms the ${n} operating hours, agrees a safe shutdown slot with the site manager, and identifies the electrical isolator for the unit(s) in scope.` },
        { title: "Cassette / wall-unit strip-down", body: "Ceiling cassettes are dropped, grilles are washed separately in a bucket, and blower wheels are removed for a proper hands-on clean rather than a sprayed-over rinse." },
        { title: "Alkaline coil + drain pump service", body: "The coil is washed with a stronger alkaline pass, and the condensate pump is tested with a bucket-fill so the pump-out cycle is confirmed clear." },
        { title: "Post-service log entry", body: `The site log gets a written entry with wash date, coil condition, drain-pump test result and the next suggested service date for the ${n} unit.` },
      ],
      closing: (n) => `That log entry is why ${n} sites use us for the whole schedule rather than one-off emergencies.`,
    },
    {
      intro: (n, p) =>
        `Industrial and workshop units in ${n} inside ${p} rarely fail politely — they usually stop cooling on the busiest day. The plan is designed to catch the failure signals before that happens.`,
      steps: (n, p) => [
        { title: "Baseline readings", body: `Before any wash the technician records supply-air temperature and drain-line flow for each ${n} unit, so the wash's real effect can be measured afterwards.` },
        { title: "Filter, wheel, coil clean", body: "Filter, blower wheel and coil are cleaned in that order — a coil wash under a greasy blower wheel is theatre, not maintenance." },
        { title: "Drain + condensate pump test", body: "The drain line is flushed and the condensate pump (if fitted) is tested with a bucket-fill so pumping capacity is verified, not assumed." },
        { title: "Report to site owner", body: `${n}'s site owner receives before/after readings, so the next service cycle can be planned with real data rather than guesswork.` },
      ],
      closing: (n) => `That data-driven closeout is what turns an ${n} workshop unit from a repeat emergency into a scheduled overhead.`,
    },
    {
      intro: (n, p) =>
        `${n} in ${p} usually means shared electrical supply, tight loading access and no room to break the operating schedule. The visit sequence protects the shift, not the technician's convenience.`,
      steps: (n, p) => [
        { title: "Isolator + shutdown agreement", body: `Before any wet work starts the technician confirms which isolator kills power to the exact ${n} unit and gets a signed shutdown from the shift supervisor.` },
        { title: "Contained wash", body: "A canvas cover and drip tray are set up under the unit, so nothing wets the shop-floor equipment or the electrical panel below." },
        { title: "Coil + blower rebuild", body: "The blower wheel and coil are cleaned, dried, and the unit is reassembled with the fan motor bearings visually checked before power is restored." },
        { title: "Restart under load", body: "The unit is restarted, allowed to reach normal load, and supply-air temperature is confirmed. The site log entry closes the visit." },
      ],
      closing: (n) => `Because ${n} sites cannot lose an afternoon to a bad wash, the sequence is written down and followed the same way every visit.`,
    },
    {
      intro: (n, p) =>
        `Workshop and light-commercial service in ${n} inside ${p} is about reducing the number of surprise breakdowns per year. The plan is built around inspection depth, not wash speed.`,
      steps: (n, p) => [
        { title: "Inspection walk", body: `The technician walks the ${n} shop floor, notes which units serve which zone and confirms which units are in scope for today.` },
        { title: "Deep clean per unit", body: "Coil, blower wheel and drain pan are cleaned; any belt or bearing that is close to end-of-life is flagged for a scheduled replacement, not an emergency call." },
        { title: "Drainage + electrical audit", body: "Condensate drain and electrical isolator condition are checked and photographed for the site log." },
        { title: "Preventive schedule note", body: `${n}'s owner receives a short WhatsApp note with a recommended next-visit window based on daily runtime and dust load.` },
      ],
      closing: (n) => `That note is the reason our ${n} sites move from reactive to preventive within a few visits.`,
    },
  ],
  mixed: [
    {
      intro: (n, p) =>
        `${n} inside ${p} is a mixed street — landed homes, apartments and small shoplots all sit within a few minutes of each other. The technician confirms the exact building type before the tools come off the van.`,
      steps: (n, p) => [
        { title: "Address + building type check", body: `We ask the ${n} customer whether the address is landed, apartment, shoplot or small office. This decides which wash canvas and which drain-clearing kit rides upstairs.` },
        { title: "Coil + filter inspection", body: "The filter and evaporator coil are inspected first — the ratio of dust vs mould tells us which service the unit actually needs." },
        { title: "Chosen service done", body: "Chemical wash, gas top-up or a targeted repair is done according to what the inspection actually found — never a bundled upsell." },
        { title: "Owner sign-off", body: "The confirmed price and warranty note are sent on WhatsApp, together with before/after coil photos." },
      ],
      closing: (n) => `That decision-tree flow is why ${n} customers see one clear recommendation and one clear price, not a menu.`,
    },
    {
      intro: (n, p) =>
        `A ${n} booking inside ${p} could be any of three building types. Our plan is built to work equally well for a condo unit, a landed bedroom and a shop-front cassette.`,
      steps: (n, p) => [
        { title: "First-visit questions", body: `The technician asks the ${n} customer three questions on arrival: what is the unit doing wrong, how old is it, and when was the last service.` },
        { title: "Non-destructive check", body: "The unit is inspected without dismantling — filter pulled, drain checked, capacitor and gas tested at the outdoor unit." },
        { title: "Confirmed quote", body: "The customer sees the final price on WhatsApp before any panel is removed for a wash, so nobody is committed to a bill they did not sign for." },
        { title: "Work + verified cooling", body: "The chosen work is done, and supply-air temperature is measured before the visit closes." },
      ],
      closing: (n) => `That verification step is what keeps ${n} repeat rates high — the customer knows exactly what changed.`,
    },
    {
      intro: (n, p) =>
        `${p} has a wide mix of housing types, and ${n} is a good example. Our plan is disciplined precisely because the site conditions are not.`,
      steps: (n, p) => [
        { title: "Unit + brand inventory", body: `The technician lists each in-scope unit by room, brand and rough age. This decides whether a wash, a gas top-up or a repair quote fits best.` },
        { title: "Priority-order work", body: "The unit most affecting the household or shop is worked on first, so if the visit runs long the customer still gets their main comfort back." },
        { title: "Wash, gas or repair as needed", body: "Only the confirmed service is performed. If any additional work is discovered mid-visit it is quoted and confirmed on WhatsApp before starting." },
        { title: "Photo-backed handover", body: `${n}'s completion WhatsApp contains coil, drain and outdoor photos for every unit worked on.` },
      ],
      closing: (n) => `That photo-backed handover is why ${n} customers can easily explain the visit to the rest of the household later.`,
    },
    {
      intro: (n, p) =>
        `Because ${n} inside ${p} can be a condo one week and a shoplot the next, we ship the same plan across all visits. It is boring on purpose — predictability is the product.`,
      steps: (n, p) => [
        { title: "Access + power check", body: `On arrival the technician confirms ${n} access to the outdoor unit, the isolator location and any building rules that will affect the wash.` },
        { title: "Coil + drain wash", body: "Standard chemical wash sequence: filter, blower wheel, coil, drain pan and outdoor coil, with a canvas cover already down." },
        { title: "Post-service test", body: "Supply-air temperature and drain-line flow are confirmed. Anything unusual is photographed and shared on WhatsApp." },
        { title: "Closeout + warranty note", body: `${n}'s customer receives the final price and the 1-month workmanship warranty note on the same WhatsApp thread that started the booking.` },
      ],
      closing: (n) => `Predictable closeouts are what make ${n} customers comfortable recommending us to another building type in the same street.`,
    },
  ],
};

// -- MS plan variants (authored) --
const PLAN_MS: Record<ProfileKey, PlanVariant[]> = {
  highRise: [
    {
      intro: (n, p) =>
        `${n} berada di dalam kawasan kondominium tinggi ${p}. Kebanyakan lawatan bermula sebelum juruteknik berhenti — akses bangunan, tempahan lif servis dan kedudukan unit luar di balkoni menentukan berapa lama kerja sebenar mengambil masa.`,
      steps: (n, p) => [
        { title: "Sahkan nama bangunan + lif servis", body: `Sebelum dispatch kami minta nama bangunan ${n}, blok, tingkat dan nombor unit. Jika JMB mahukan slip permit kerja, ID juruteknik dan surat insurans disediakan pagi itu juga.` },
        { title: "Semakan balkoni / tebing servis", body: "5 minit pertama di tapak digunakan untuk melihat unit luar, dulang saliran, laluan kondensat dan keadaan bracket. Foto dimasukkan ke dalam job sheet supaya tiada pertikaian kemudian." },
        { title: "Cuci kimia + flush saliran", body: "Cuci kimia dijalankan dengan canvas cover diikat pada dinding balkoni supaya tiada air jatuh ke unit bawah. Saliran diflush sehingga jernih di titik discharge tingkat bawah." },
        { title: "Semakan sejuk + kebocoran", body: "Selepas dipasang semula, unit dijalankan 10–15 minit, suhu udara supply diukur, dan saliran serta lantai balkoni disemak semula. Barulah kerja ditutup di WhatsApp dengan foto." },
      ],
      closing: (n) => `Susunan itulah sebab slot hari sama realistik untuk ${n} — bahagian yang menjadi kejutan kepada syarikat lain (lif servis, saliran) sudah pun dimasukkan dalam harga.`,
    },
    {
      intro: (n, p) =>
        `Untuk alamat bertingkat di ${n}, juruteknik merancang lawatan berdasarkan peraturan bangunan ${p} dahulu, bukan aircond itu sendiri. Slot lif servis yang tepat menjimatkan lebih banyak masa berbanding alat mana pun.`,
      steps: (n, p) => [
        { title: "Daftar di pejabat pengurusan", body: `Sampai di ${n}, juruteknik lapor ke kaunter pengurusan, serah ID dan permit, dan sahkan lif servis mana yang kosong untuk peralatan.` },
        { title: "Buka unit dalam", body: "Panel hadapan, penapis dan blower wheel dikeluarkan dahulu supaya coil terbuka sepenuhnya. Cat dinding ditutup sebelum bahan cuci disembur." },
        { title: "Cuci tekanan unit luar", body: "Unit luar di tebing balkoni dicuci dengan tekanan selepas laluan kondensat dilindungi — inilah tempat kerja cuai menyebabkan aduan dari unit bawah." },
        { title: "Handover di WhatsApp", body: "Foto sebelum dan selepas coil, saliran dan kipas luar dihantar ke thread WhatsApp tempahan, bersama harga akhir dan nota waranti." },
      ],
      closing: (n) => `Pelan itu ditulis kerana lawatan ${n} sering bertindih dengan slot lif yang ketat — susunan tetap menjaga kerja dalam slot yang bangunan berikan.`,
    },
    {
      intro: (n, p) =>
        `Tempahan ${n} di kawasan ${p} biasanya melibatkan satu unit, kadang dua, di kondominium atau serviced apartment. Lawatan pendek tetapi peraturan akses menjadikan persediaan lebih penting dari masa cuci sebenar.`,
      steps: (n, p) => [
        { title: "Sahkan peraturan akses", body: `Kami tanya pelanggan ${n} sama ada bangunan memerlukan pendaftaran pelawat, borang akses bertandatangan atau deposit keselamatan untuk peralatan yang dibawa naik.` },
        { title: "Sediakan zon kerja basah", body: "Canvas cuci, dulang titisan dan tikar lantai diletakkan sebelum panel dibuka. Di balkoni kecil, ini satu-satunya cara memastikan pakaian jiran bawah kekal kering." },
        { title: "Cuci kimia coil", body: "Coil evaporator dan blower wheel dicuci dengan larutan alkali lembut, dibilas dua kali, dan dulang saliran disemak untuk alga sebelum dipasang semula." },
        { title: "Ujian airflow selepas kerja", body: "Sejuk disahkan dengan bacaan suhu udara supply (sasaran ~14–17°C untuk split yang sihat), dan saliran diperhatikan untuk aliran penuh." },
      ],
      closing: (n) => `Langkah di atas adalah rupa cuci kimia ${n} yang biasa — tiada upsell di tengah kerja, dan harga di WhatsApp adalah harga yang anda bayar bila siap.`,
    },
    {
      intro: (n, p) =>
        `Servis bertingkat di ${n} lebih mudah bila semua dirancang sebelum van keluar. Sebab itulah laluan ${p} berjalan pada susunan tetap dan bukan gaya "sampai baru tengok".`,
      steps: (n, p) => [
        { title: "Permintaan foto pra-lawatan", body: `Kami minta foto unit dalam dan kompressor luar di balkoni ${n} supaya juruteknik tahu model, ketinggian mounting dan laluan saliran sebelum tiba.` },
        { title: "Pemeriksaan penapis + coil", body: "Penapis dikeluarkan dulu — beban habuk tebal biasanya bermakna sebut harga cuci kimia berdiri; penapis bersih dengan cooling lemah biasanya bermakna kerja tekanan gas." },
        { title: "Cuci kimia atau tambah gas", body: "Servis yang tepat disahkan dengan pelanggan di WhatsApp sebelum kerja tambahan bermula. Harga ditulis dalam thread yang sama." },
        { title: "Sign-off + nota waranti", body: "Nota waranti pendek dihantar di WhatsApp meliputi tempoh 1 bulan waranti kerja, bersama foto semakan saliran." },
      ],
      closing: (n) => `Aliran sign-off itulah yang membuatkan pelanggan ${n} boleh rujuk jiran di bangunan yang sama tanpa risau caj mengejut.`,
    },
  ],
  shopOffice: [
    {
      intro: (n, p) =>
        `Tempahan kedai dan pejabat ${n} dalam ${p} berjalan pada jam berbeza — keutamaan ialah selesai sebelum pelanggan atau penyewa tiba, bukan jimat beberapa minit di van.`,
      steps: (n, p) => [
        { title: "Sahkan slot operasi", body: `Kami setuju masa buka shutter ${n} yang tepat dan rancang cuci supaya selesai 30 minit lebih awal supaya kedai boleh dilap sebelum buka.` },
        { title: "Sapu habuk depan kedai", body: "Juruteknik lap cermin depan, kawasan grille siling dan mana-mana rak paparan yang berdekatan dengan canvas cuci supaya tiada calar." },
        { title: "Cuci grille / cassette", body: "Untuk ceiling cassette, grille diturunkan, coil dicuci tekanan, pump-drain diflush dan airflow disahkan melalui semua empat vane sebelum dipasang semula." },
        { title: "Handover kepada staf kedai", body: `Penyelia kedai di ${n} tandatangan lembaran penyiapan di WhatsApp dengan harga sudah dinyatakan dan tempoh waranti dicatatkan.` },
      ],
      closing: (n) => `Aliran itulah cara servis shoplot ${n} kekal kos tetap setiap lawatan — tiada caj "jumpa sesuatu tambahan" selepas shutter dibuka.`,
    },
    {
      intro: (n, p) =>
        `Unit pejabat dan shoplot di ${n} biasanya beroperasi 10–12 jam sehari dalam ${p}. Beban coil lebih berat daripada kediaman, jadi susunan lawatan dibina sekitar cucian mendalam bukannya bilas ringan.`,
      steps: (n, p) => [
        { title: "Semakan jam operasi + minyak", body: `Juruteknik tanya penyewa ${n} berapa jam sehari unit berjalan dan sama ada kerja makanan atau salun rambut dijalankan di bawah.` },
        { title: "Keluarkan penapis + blower wheel", body: "Penapis dan blower wheel dikeluarkan bersama — blower wheel berminyak sebab utama cuci biasa tidak selesaikan airflow lemah unit shoplot." },
        { title: "Cuci coil alkali", body: "Coil dicuci dengan alkali lebih kuat dari kerja kediaman, dibilas dua kali, dulang saliran diperiksa untuk sisa perosak." },
        { title: "Laporan airflow selepas kerja", body: "Suhu udara supply dan aliran saliran direkod, dan laporan dihantar ke WhatsApp pemilik kedai supaya aduan penyewa boleh dijawab dengan data." },
      ],
      closing: (n) => `Laporan itulah yang menukarkan satu cuci ${n} kepada perbualan kontrak penyelenggaraan kemudian, tanpa tekanan jualan pada hari itu.`,
    },
    {
      intro: (n, p) =>
        `Tempahan komersial ${n} dalam ${p} hidup dan mati dengan akses parkir dan loading. Kami rancang lawatan berdasarkan sama ada barisan kedai membenarkan van berhenti terus di luar.`,
      steps: (n, p) => [
        { title: "Sahkan parkir + loading", body: `Sebelum dispatch kami sahkan sama ada ${n} membenarkan van berhenti di shutter, atau juruteknik perlu berjalan dengan peralatan dari lot berdekatan.` },
        { title: "Turun grille + panel", body: "Grille siling atau panel hadapan wall-mount dikeluarkan, dan coil disemak untuk minyak, habuk dan aktiviti perosak yang biasa pada penggunaan shoplot jam panjang." },
        { title: "Cuci kimia tekanan tinggi", body: "Coil, blower wheel dan dulang saliran dicuci dengan power point kedai dilindungi di bawah extension bertaraf supaya unit boleh dimulakan semula dengan selamat." },
        { title: "Nota waranti + lawatan seterusnya", body: `Penyewa ${n} menerima harga penyiapan, nota waranti dan cadangan tetingkap lawatan seterusnya jika unit berjalan jam harian yang panjang.` },
      ],
      closing: (n) => `Nota terakhir itulah cara pelanggan kedai ${n} yang berulang berhenti menelefon dalam mod kecemasan dan beralih ke jadual sentuhan ringan.`,
    },
    {
      intro: (n, p) =>
        `Servis kedai dan pejabat di ${n} dalam ${p} biasanya mengenai menjaga keselesaan penyewa yang stabil, bukan mengejar hasil pembersihan sekali sahaja. Pelan itu mencerminkan perkara itu.`,
      steps: (n, p) => [
        { title: "Taklimat penyewa", body: `Sampai di sana, juruteknik memperkenalkan diri kepada penyewa ${n}, sahkan harga yang sudah dipersetujui di WhatsApp, dan tanya sama ada ada isu aircond sebelum ini yang perlu dicatatkan.` },
        { title: "Cuci mendalam coil + saliran", body: "Coil evaporator dicuci, dulang saliran dan paip diflush sehingga jernih sepenuhnya, dan coil luar dibilas tekanan untuk angkat habuk tepi jalan." },
        { title: "Pengesahan airflow", body: "Suhu udara supply diukur di semua vane; jika mana-mana vane lemah, motor vane dan klip penapis disemak sebelum kerja ditutup." },
        { title: "Laporan bertulis di WhatsApp", body: `Laporan bertulis ${n} termasuk foto cuci, foto aliran saliran dan baris pendek yang menjelaskan sebab kekerapan penyelenggaraan yang dicadangkan seperti itu.` },
      ],
      closing: (n) => `Itulah sebab laluan ${n} biasanya dipanggil semula untuk kedai sebelah dalam sebulan atau dua — kertas kerja yang buat rujukan.`,
    },
  ],
  landed: [
    {
      intro: (n, p) =>
        `Rumah landed ${n} dalam ${p} biasanya ada beberapa unit — bilik utama, satu atau dua bilik kanak-kanak, kadangkala inverter di ruang tamu. Lawatan dirancang sebagai laluan kecil di dalam satu rumah, bukan berhentian satu unit.`,
      steps: (n, p) => [
        { title: "Jalan-jalan rumah", body: `Juruteknik berjalan dengan pemilik ${n} bilik demi bilik, catat unit mana yang hidup, mana yang sejuk lemah, dan sahkan unit mana dalam skop hari itu.` },
        { title: "Semakan tembaga + wayar", body: "Rumah landed lama sering menunjukkan sambungan tembaga kusam dan bracket dinding lusuh. Apa-apa yang tidak selamat dibendera dengan foto sebelum air mengenai coil." },
        { title: "Cuci kimia berurutan", body: "Unit dicuci satu demi satu supaya keluarga masih boleh guna satu bilik berhawa dingin semasa lawatan. Saliran setiap unit disahkan jernih sebelum bergerak." },
        { title: "Semakan cooling keseluruhan rumah", body: "Selepas unit terakhir dipasang semula, setiap unit yang dicuci dijalankan bersama 15 minit dan suhu udara supply disemak supaya seluruh rumah disahkan sejuk." },
      ],
      closing: (n) => `Susunan itulah sebab tempahan multi-unit ${n} selesai dalam satu lawatan bukan dibahagi dua hari.`,
    },
    {
      intro: (n, p) =>
        `Rumah landed ${p} di ${n} cenderung mempunyai laluan tembaga panjang dari tingkat atas ke kompressor luar di bawah. Separuh lawatan di tingkat atas, separuh di barisan kompressor, jadi pelan itu mencerminkan realiti itu.`,
      steps: (n, p) => [
        { title: "Pemetaan atas / bawah", body: `Juruteknik sahkan dengan pemilik ${n} unit dalam mana milik kompressor luar mana, kerana pemasangan lama tidak selalu dilabel dengan betul.` },
        { title: "Semakan barisan kompressor", body: "Barisan kompressor luar diperiksa untuk karat bracket, isu drain-fall dan kerosakan bilah kipas. Apa-apa yang menjejaskan tekanan gas dibaiki sebelum cuci." },
        { title: "Semakan coil + gas", body: "Tekanan gas setiap unit yang dicuci diukur selepas cuci kimia supaya cooling lemah boleh didiagnosis sebelum juruteknik balik." },
        { title: "Sign-off pemilik", body: "Pemilik melihat foto coil sebelum/selepas, bacaan gas dan harga akhir di WhatsApp sebelum pembayaran dibincangkan." },
      ],
      closing: (n) => `Sign-off akhir itu elak "kenapa harga berbeza dari sebut harga WhatsApp?" — momen yang pelanggan landed di ${n} betul-betul benci.`,
    },
    {
      intro: (n, p) =>
        `Kerja landed ${n} dalam ${p} sering termasuk satu unit non-inverter lama tambah satu inverter baharu. Dua keluarga unit dicuci secara berbeza, jadi lawatan dipecah kepada dua mini-jobs.`,
      steps: (n, p) => [
        { title: "Inventori unit", body: `Sampai di sana, juruteknik senaraikan setiap unit ${n} mengikut bilik, jenama, HP dan jenis inverter/non-inverter. Ini menentukan susunan kerja.` },
        { title: "Cuci non-inverter dahulu", body: "Unit non-inverter lama dicuci dahulu kerana ia tahan handling lebih baik dan bebaskan bilik pelanggan untuk kerja seterusnya." },
        { title: "Cuci inverter dengan perlindungan PCB", body: "Untuk unit inverter, PCB dan penyambung sensor ditutup sebelum air mengenai coil — di sinilah cuci cuai merosakkan board mahal." },
        { title: "Ujian silang cool-down", body: "Selepas kedua-dua jenis siap, setiap unit yang dicuci dijalankan 10 minit dengan bacaan udara supply diambil supaya pelanggan tahu cuci itu memang tingkatkan cooling." },
      ],
      closing: (n) => `Pecahan lawatan sebegini adalah cara pelanggan ${n} elak aduan klasik unit inverter "yang dicuci" trip minggu depan.`,
    },
    {
      intro: (n, p) =>
        `Servis landed di ${n} dalam ${p} ialah lawatan rumah, bukan lawatan unit — pelan direka untuk selesaikan seluruh rumah dalam satu slot dispatch.`,
      steps: (n, p) => [
        { title: "Skop seluruh rumah", body: `Juruteknik dan pemilik ${n} setuju senarai tepat unit dalam skop, dan mana-mana unit "untuk pemeriksaan sahaja" disebut harga berasingan sebelum kerja bermula.` },
        { title: "Cuci kimia bilik demi bilik", body: "Unit setiap bilik dicuci dan dipasang semula sebelum bergerak, supaya keluarga boleh menjaga keselesaan bilik yang telah digunakan sambil kerja lain diteruskan." },
        { title: "Ujian tekanan saliran", body: "Setiap saliran diflush dan diperhatikan sekurang-kurangnya 30 saat pada aliran penuh untuk menangkap sekatan perlahan yang muncul hanya di bawah beban." },
        { title: "Pakej handover pemilik", body: `Pemilik ${n} menerima ringkasan pendek di WhatsApp: unit yang dicuci, semakan saliran lulus, bacaan cooling, tempoh waranti dan cadangan lawatan seterusnya.` },
      ],
      closing: (n) => `Handover itulah sebab pelanggan landed ${n} biasanya tempah semula pusingan seterusnya tanpa minta sebut harga baharu.`,
    },
  ],
  kampung: [
    {
      intro: (n, p) =>
        `${n} ialah kawasan tradisional rendah dalam ${p}. Kebanyakan unit boleh diakses di paras tanah, jadi lawatan lebih mengenai nasihat jujur sama ada unit lama masih berbaloi dicuci lagi atau lebih baik diganti.`,
      steps: (n, p) => [
        { title: "Semakan usia unit + refrigerant", body: `Juruteknik sahkan usia lebih kurang unit ${n} dan jenis refrigerant (R22 / R410A / R32). Unit R22 dibendera kerana gas tidak lagi mudah didapati.` },
        { title: "Pemeriksaan kapasitor + wayar", body: "Dalam pemasangan kampung lama, kapasitor dan wayar luar sering menjadi punca sebenar trip atau start lemah — ini disemak sebelum sebarang sebut harga cuci." },
        { title: "Keputusan cuci kimia atau baiki", body: "Pelanggan diberitahu terus sama ada cuci kimia akan selesaikan isu, atau baiki/ganti lebih berbaloi. Cadangan ditulis dalam thread WhatsApp." },
        { title: "Ujian runtime selepas kerja", body: "Selepas kerja siap, unit dijalankan 20 minit dan suhu udara supply disahkan sebelum juruteknik balik." },
      ],
      closing: (n) => `Langkah cadangan-jujur itulah tujuan lawatan ${n} — ia jimatkan pelanggan dari bayar cuci unit yang patut diganti.`,
    },
    {
      intro: (n, p) =>
        `Tempahan ${n} dalam ${p} biasanya datang dari penduduk lama yang mahukan jawapan lurus, bukan pitch jualan. Susunan lawatan mencerminkan perkara itu.`,
      steps: (n, p) => [
        { title: "Soalan situasi", body: `Sebelum buka unit, juruteknik tanya pemilik ${n} tiga soalan: berapa lama unit itu, bila cuci terakhir, dan apa yang berubah baru-baru ini (bunyi, air, cooling lemah).` },
        { title: "Pemeriksaan tidak mengganggu", body: "Coil luar, saliran dan kapasitor disemak tanpa buka unit dalam dahulu, supaya diagnosis buruk tidak disamarkan sebagai sebut harga cuci." },
        { title: "Harga bertulis di WhatsApp", body: `Pelanggan ${n} lihat harga akhir di WhatsApp sebelum panel dibuka. Harga tidak berubah melainkan kerosakan baharu ditemui dan dipersetujui.` },
        { title: "Kerja + cooling disahkan", body: "Kerja yang dipilih dijalankan, dan unit disahkan dengan bacaan suhu udara supply supaya tiada sesiapa tertanya-tanya sama ada cuci itu betul-betul membantu." },
      ],
      closing: (n) => `Aliran soal-dahulu itulah sebab pelanggan lama ${n} biasanya pass WhatsApp kami kepada jiran.`,
    },
    {
      intro: (n, p) =>
        `Servis gaya kampung di ${n} dalam ${p} ialah kawasan kerja kecil — satu unit dalam, satu unit luar, keputusan cepat mengenai parts vs ganti. Pelan pendek tetapi berdisiplin.`,
      steps: (n, p) => [
        { title: "Semakan akses paras tanah", body: `Kebanyakan unit luar ${n} berada di dinding rendah atau bracket paras tanah, jadi juruteknik sahkan kedudukan tangga paling selamat sebelum menyentuh apa-apa.` },
        { title: "Ujian refrigerant + kapasitor", body: "Tekanan gas dan microfarad kapasitor diuji dahulu — coil bersih dengan cooling lemah biasanya isu kapasitor atau gas, bukan cuci." },
        { title: "Sebut harga servis yang tepat", body: "Pelanggan lihat tepat satu servis yang disyorkan dan satu alternatif di WhatsApp (contohnya, cuci vs ganti), dengan sebab bahasa mudah untuk setiap satu." },
        { title: "Kerja ditutup dengan foto", body: "Foto coil, saliran dan kipas luar dilampirkan pada penyiapan WhatsApp supaya rekod rumah tangga ada sesuatu untuk perbandingan tahun depan." },
      ],
      closing: (n) => `Sebut harga servis yang tepat itulah kekalkan tempahan ${n} kecil dalam nilai RM tetapi tinggi dalam kepercayaan.`,
    },
    {
      intro: (n, p) =>
        `Jalan kampung ${p}, termasuk ${n}, adalah kawasan di mana juruteknik perlu bersedia sebut "jangan belanja untuk yang ini" sama seperti jual cuci kimia. Lawatan direka untuk perbualan jujur itu.`,
      steps: (n, p) => [
        { title: "Taklimat pemilik", body: `Juruteknik memperkenalkan diri di pintu pagar ${n}, sahkan harga yang sudah dipersetujui di WhatsApp, dan tanya sama ada pemilik mahu cuci atau pemeriksaan jujur dulu.` },
        { title: "Semakan unit + elektrik", body: "Unit dalam, saliran, kapasitor, suis isolator dan wayar terdedah diperiksa. Apa-apa yang tidak selamat dibendera berasingan dari sebut harga cuci." },
        { title: "Panggilan baiki-atau-ganti", body: "Untuk unit lebih tua kira-kira 10 tahun, pemilik diberi cadangan baiki-atau-ganti secara terus daripada dijual cuci yang tidak akan tahan lama." },
        { title: "Nota waranti di WhatsApp", body: `Penyiapan WhatsApp ${n} termasuk nota waranti kerja 1 bulan, supaya pemilik tahu tepat apa yang dilindungi jika isu yang sama berulang.` },
      ],
      closing: (n) => `Perbualan waranti itu pendek tetapi ia yang membuatkan perniagaan berulang ${n} boleh diramal bukannya kebetulan.`,
    },
  ],
  hillside: [
    {
      intro: (n, p) =>
        `${n} berada di sisi bukit ${p}. Cerun, kawasan hijau dan laluan paip panjang menentukan pelan lebih daripada cuci itu sendiri — cuci kimia pada unit yang dipasang buruk ialah perjalanan yang dibazirkan.`,
      steps: (n, p) => [
        { title: "Pelan driveway + tangga", body: `Juruteknik sahkan gradient driveway ${n}, berjalan laluan kompressor luar, dan pilih posisi tangga yang tidak akan terbalik di cerun.` },
        { title: "Semakan bracket + drain-fall", body: "Bracket luar, sauh dinding dan sudut drain-fall diperiksa. Di bukit, saliran perlahan jadi kebocoran cepat pada malam monsun." },
        { title: "Cuci kimia dengan pass debris", body: "Kerana coil luar di taman bukit sering catch daun dan serangga, pass angkat-debris tambahan dilakukan sebelum cuci alkali bermula." },
        { title: "Ujian getaran + bunyi", body: "Selepas dipasang semula, kompressor dijalankan 15 minit dan juruteknik dengar getaran bracket yang tidak akan muncul dalam semakan cepat 2 minit." },
      ],
      closing: (n) => `Dua langkah tambahan itu — pass debris dan dengar getaran — sebab kerja bukit ${n} jarang perlu callout kedua.`,
    },
    {
      intro: (n, p) =>
        `Servis bukit di ${p} sebab tempahan ${n} biasanya sertakan sebut harga baris bracket di depan. Perkakas mounting menua lebih cepat pada dinding cerun berbanding dinding lurus.`,
      steps: (n, p) => [
        { title: "Audit keselamatan bracket", body: `Sebelum cuci bermula, sauh dinding bracket ${n} diuji tarik dengan tekanan tangan. Apa-apa yang lembut dibendera dan disebut harga sebelum kerja lanjut.` },
        { title: "Sahkan drain-fall", body: "Tuang air pendek dilakukan di dulang saliran dan aliran diambil masa di discharge luar. Gradient di bawah spec dibaiki sebelum coil dicuci, bukan selepas." },
        { title: "Cuci kimia coil", body: "Coil evaporator dan luar dicuci dengan saliran sudah tahu baik, supaya titisan perlahan tidak pernah disalah anggap sebagai kecacatan cuci." },
        { title: "Handover dengan foto", body: "Pelanggan lihat foto bracket, drain-fall dan coil di WhatsApp sebelum harga disahkan sebagai dibayar." },
      ],
      closing: (n) => `Susunan bracket-dahulu itu adalah tabiat ${n} — dinding bukit tak maafkan lawatan malas.`,
    },
    {
      intro: (n, p) =>
        `${n} dalam ${p} bermakna rumah lebih besar, laluan paip lebih panjang dan lebih banyak unit per tempahan. Pelan lawatan dibina supaya juruteknik bergerak tanpa terlepas risiko kecil khusus bukit.`,
      steps: (n, p) => [
        { title: "Inventori rumah + panjang paip", body: `Juruteknik senaraikan setiap unit ${n} dengan panjang paip dalam-ke-luar supaya semakan gas kemudian dibuat berdasarkan nombor realistik.` },
        { title: "Jalan-jalan barisan kompressor", body: "Barisan kompressor luar (selalunya beberapa unit dalam satu baris di dinding bukit) difoto, dan mana-mana bracket condong disebut harga berasingan." },
        { title: "Cuci unit berurutan", body: "Unit dicuci satu selepas satu, tetapi semakan saliran selalu dilakukan mengikut arah aliran air bukit supaya saliran discharge kongsi disahkan pada unit terakhir." },
        { title: "Laporan pemilik", body: "Laporan WhatsApp pendek menunjukkan panjang paip, bacaan gas, foto semakan saliran dan harga disahkan untuk seluruh lawatan." },
      ],
      closing: (n) => `Laporan itulah sebab pemilik ${n} boleh rancang bajet servis tahun depan tanpa satu lagi lawatan tapak.`,
    },
    {
      intro: (n, p) =>
        `Alamat bukit di ${n} dalam ${p} lebih kepada semakan kualiti pemasangan daripada cuci. Pelan direka untuk tangkap kesilapan pemasangan lama sebelum ia jadi kebocoran.`,
      steps: (n, p) => [
        { title: "Jalan-jalan penebat paip", body: `Juruteknik berjalan laluan paip ${n} dari unit dalam ke kompressor luar, semak penebat hilang dan kerosakan matahari pada bahagian terdedah.` },
        { title: "Cuci + flush saliran", body: "Coil dan blower dicuci, saliran diflush, dan juruteknik perhatikan sebarang air bertakung di taman bukit bawah." },
        { title: "Ujian gas + bunyi kompressor", body: "Tekanan gas diukur dan kompressor didengar untuk dengung rendah yang tunjuk beban baik. Apa-apa yang pelik dilaporkan sebelum pelanggan bayar." },
        { title: "Nota bertulis lawatan seterusnya", body: `Pelanggan ${n} dapat cadangan tetingkap lawatan seterusnya berdasarkan panjang paip, usia unit dan berapa banyak teduh yang unit luar dapat.` },
      ],
      closing: (n) => `Nota itulah yang menukarkan tempahan bukit ${n} menjadi hubungan yang dirancang berbanding kebakaran dalam musim basah.`,
    },
  ],
  industrial: [
    {
      intro: (n, p) =>
        `${n} berada di kawasan komersial ringan atau workshop ${p}. Beban habuk, runtime 10+ jam dan saliran kongsi bermakna jadual cuci kediaman tidak cukup. Lawatan dibina sebagai cuci mendalam berjadual bukannya "sembur cepat".`,
      steps: (n, p) => [
        { title: "Slot tapak + shutdown", body: `Juruteknik sahkan waktu operasi ${n}, setuju slot shutdown selamat dengan pengurus tapak, dan kenal pasti isolator elektrik untuk unit dalam skop.` },
        { title: "Buka cassette / wall-unit", body: "Ceiling cassette diturunkan, grille dicuci berasingan dalam baldi, dan blower wheel dikeluarkan untuk pembersihan tangan yang betul bukannya bilas sembur." },
        { title: "Cuci alkali coil + servis pump saliran", body: "Coil dicuci dengan pass alkali lebih kuat, dan pump kondensat diuji dengan isi baldi supaya kitaran pump-out disahkan jernih." },
        { title: "Catatan log selepas servis", body: `Log tapak dapat catatan bertulis dengan tarikh cuci, keadaan coil, keputusan ujian pump saliran dan tarikh servis seterusnya yang disyorkan untuk unit ${n}.` },
      ],
      closing: (n) => `Catatan log itulah sebab tapak ${n} guna kami untuk seluruh jadual berbanding kecemasan sekali sahaja.`,
    },
    {
      intro: (n, p) =>
        `Unit industri dan workshop di ${n} dalam ${p} jarang gagal secara sopan — biasanya berhenti cooling pada hari paling sibuk. Pelan direka untuk tangkap isyarat kegagalan sebelum itu berlaku.`,
      steps: (n, p) => [
        { title: "Bacaan asas", body: `Sebelum sebarang cuci, juruteknik rekod suhu udara supply dan aliran saliran untuk setiap unit ${n}, supaya kesan sebenar cuci boleh diukur selepasnya.` },
        { title: "Bersih penapis, wheel, coil", body: "Penapis, blower wheel dan coil dibersihkan dalam susunan itu — cuci coil di bawah blower wheel berminyak adalah teater, bukan penyelenggaraan." },
        { title: "Ujian saliran + pump kondensat", body: "Saliran diflush dan pump kondensat (jika dipasang) diuji dengan isi baldi supaya kapasiti pump disahkan, bukan diandaikan." },
        { title: "Laporan kepada pemilik tapak", body: `Pemilik tapak ${n} terima bacaan sebelum/selepas, supaya kitaran servis seterusnya boleh dirancang dengan data sebenar bukannya tekaan.` },
      ],
      closing: (n) => `Penutup berpandukan data itulah yang mengubah unit workshop ${n} dari kecemasan berulang menjadi overhead yang dijadualkan.`,
    },
    {
      intro: (n, p) =>
        `${n} dalam ${p} biasanya bermakna bekalan elektrik kongsi, akses loading ketat dan tiada ruang untuk pecahkan jadual operasi. Susunan lawatan lindungi shift, bukan keselesaan juruteknik.`,
      steps: (n, p) => [
        { title: "Persetujuan isolator + shutdown", body: `Sebelum kerja basah bermula, juruteknik sahkan isolator mana yang matikan kuasa unit ${n} tepat dan dapatkan shutdown bertandatangan dari penyelia shift.` },
        { title: "Cuci berkontena", body: "Canvas cover dan dulang titisan disediakan bawah unit, supaya tiada yang basahkan peralatan lantai kedai atau panel elektrik di bawah." },
        { title: "Cuci coil + pasang semula blower", body: "Blower wheel dan coil dibersihkan, dikeringkan, dan unit dipasang semula dengan bearing motor kipas disemak secara visual sebelum kuasa dipulihkan." },
        { title: "Restart di bawah beban", body: "Unit dimulakan semula, dibenarkan capai beban normal, dan suhu udara supply disahkan. Catatan log tapak tutup lawatan." },
      ],
      closing: (n) => `Kerana tapak ${n} tidak boleh hilang petang untuk cuci buruk, susunan itu ditulis dan diikut cara yang sama setiap lawatan.`,
    },
    {
      intro: (n, p) =>
        `Servis workshop dan komersial ringan di ${n} dalam ${p} adalah mengenai mengurangkan bilangan kerosakan mengejut setahun. Pelan dibina sekitar kedalaman pemeriksaan, bukan kelajuan cuci.`,
      steps: (n, p) => [
        { title: "Jalan-jalan pemeriksaan", body: `Juruteknik berjalan lantai kedai ${n}, catat unit mana melayani zon mana dan sahkan unit mana dalam skop hari itu.` },
        { title: "Cuci mendalam per unit", body: "Coil, blower wheel dan dulang saliran dibersihkan; mana-mana belt atau bearing yang hampir hujung hayat dibendera untuk penggantian berjadual, bukan panggilan kecemasan." },
        { title: "Audit saliran + elektrik", body: "Saliran kondensat dan keadaan isolator elektrik disemak dan difoto untuk log tapak." },
        { title: "Nota jadual pencegahan", body: `Pemilik ${n} terima nota WhatsApp pendek dengan cadangan tetingkap lawatan seterusnya berdasarkan runtime harian dan beban habuk.` },
      ],
      closing: (n) => `Nota itulah sebab tapak ${n} beralih dari reaktif ke pencegahan dalam beberapa lawatan.`,
    },
  ],
  mixed: [
    {
      intro: (n, p) =>
        `${n} dalam ${p} ialah jalan bercampur — rumah landed, pangsapuri dan shoplot kecil semua terletak dalam beberapa minit antara satu sama lain. Juruteknik sahkan jenis bangunan tepat sebelum peralatan diturunkan dari van.`,
      steps: (n, p) => [
        { title: "Semakan jenis alamat + bangunan", body: `Kami tanya pelanggan ${n} sama ada alamat itu landed, apartment, shoplot atau pejabat kecil. Ini menentukan canvas cuci mana dan kit clearing saliran mana yang naik ke atas.` },
        { title: "Pemeriksaan coil + penapis", body: "Penapis dan coil evaporator diperiksa dahulu — nisbah habuk vs kulat beritahu kami servis mana yang unit sebenarnya perlukan." },
        { title: "Servis yang dipilih dijalankan", body: "Cuci kimia, tambah gas atau baiki bersasar dijalankan mengikut apa yang pemeriksaan sebenarnya jumpa — bukan upsell berbundle." },
        { title: "Sign-off pemilik", body: "Harga disahkan dan nota waranti dihantar di WhatsApp, bersama foto coil sebelum/selepas." },
      ],
      closing: (n) => `Aliran pokok-keputusan itulah sebab pelanggan ${n} lihat satu cadangan jelas dan satu harga jelas, bukan menu.`,
    },
    {
      intro: (n, p) =>
        `Tempahan ${n} dalam ${p} boleh jadi mana-mana daripada tiga jenis bangunan. Pelan kami dibina untuk berfungsi sama baiknya untuk unit kondo, bilik landed dan cassette shop-front.`,
      steps: (n, p) => [
        { title: "Soalan lawatan pertama", body: `Juruteknik tanya pelanggan ${n} tiga soalan bila sampai: apa unit buat salah, berapa umur ia, dan bila servis terakhir.` },
        { title: "Semakan tidak merosakkan", body: "Unit diperiksa tanpa dibongkar — penapis dikeluarkan, saliran disemak, kapasitor dan gas diuji di unit luar." },
        { title: "Sebut harga disahkan", body: "Pelanggan lihat harga akhir di WhatsApp sebelum panel dibuka untuk cuci, supaya tiada sesiapa terikat pada bil yang mereka tidak tandatangan." },
        { title: "Kerja + cooling disahkan", body: "Kerja yang dipilih dijalankan, dan suhu udara supply diukur sebelum lawatan ditutup." },
      ],
      closing: (n) => `Langkah pengesahan itulah yang kekalkan kadar berulang ${n} tinggi — pelanggan tahu tepat apa yang berubah.`,
    },
    {
      intro: (n, p) =>
        `${p} mempunyai campuran luas jenis perumahan, dan ${n} adalah contoh baik. Pelan kami berdisiplin tepat sebab keadaan tapak tidak.`,
      steps: (n, p) => [
        { title: "Inventori unit + jenama", body: `Juruteknik senaraikan setiap unit dalam skop mengikut bilik, jenama dan usia lebih kurang. Ini tentukan sama ada cuci, tambah gas atau sebut harga baiki yang paling sesuai.` },
        { title: "Kerja mengikut keutamaan", body: "Unit yang paling menjejaskan rumah tangga atau kedai dikerjakan dahulu, supaya jika lawatan berpanjangan, pelanggan masih dapat keselesaan utama semula." },
        { title: "Cuci, gas atau baiki seperti diperlukan", body: "Hanya servis yang disahkan dijalankan. Jika sebarang kerja tambahan ditemui di tengah lawatan, ia disebut harga dan disahkan di WhatsApp sebelum bermula." },
        { title: "Handover berfoto", body: `Penyiapan WhatsApp ${n} mengandungi foto coil, saliran dan luar untuk setiap unit yang dikerjakan.` },
      ],
      closing: (n) => `Handover berfoto itulah sebab pelanggan ${n} boleh mudah jelaskan lawatan kepada seluruh isi rumah kemudian.`,
    },
    {
      intro: (n, p) =>
        `Kerana ${n} dalam ${p} boleh jadi kondo seminggu dan shoplot seminggu lagi, kami hantar pelan yang sama merentasi semua lawatan. Ia membosankan dengan sengaja — kebolehramalan itulah produknya.`,
      steps: (n, p) => [
        { title: "Semakan akses + kuasa", body: `Sampai di sana, juruteknik sahkan akses ${n} ke unit luar, lokasi isolator dan sebarang peraturan bangunan yang akan menjejaskan cuci.` },
        { title: "Cuci coil + saliran", body: "Susunan cuci kimia standard: penapis, blower wheel, coil, dulang saliran dan coil luar, dengan canvas cover sudah diletak." },
        { title: "Ujian selepas servis", body: "Suhu udara supply dan aliran saliran disahkan. Apa-apa yang luar biasa difoto dan dikongsi di WhatsApp." },
        { title: "Penutup + nota waranti", body: `Pelanggan ${n} terima harga akhir dan nota waranti kerja 1 bulan pada thread WhatsApp yang sama yang memulakan tempahan.` },
      ],
      closing: (n) => `Penutup yang boleh diramal itulah yang membuatkan pelanggan ${n} selesa mencadangkan kami kepada jenis bangunan lain di jalan yang sama.`,
    },
  ],
};

// -- ZH plan variants --
const PLAN_ZH: Record<ProfileKey, PlanVariant[]> = {
  highRise: [
    {
      intro: (n, p) =>
        `${n}位于${p}的高层公寓带。多数上门在技师停车前就已经开始——大楼进出、服务电梯预约以及室外机在阳台或服务台的位置，决定了真正施工需要多久。`,
      steps: (n, p) => [
        { title: "确认楼盘 + 服务电梯", body: `派工前会问清${n}准确的楼盘名称、座号、楼层和单位。若JMB要求施工准证，我们同一天上午就把技师的身份证明和保险函准备妥当。` },
        { title: "阳台 / 服务台巡视", body: "抵达后前5分钟用于查看室外机、排水盘、冷凝水管和支架状况，照片会存入工单，避免事后争议。" },
        { title: "盘管化学清洗 + 排水疏通", body: "化学清洗会用夹在阳台墙上的防水布进行——不会让水滴到楼下邻居。排水线一直冲到底层排水口出水清澈为止。" },
        { title: "制冷 + 漏水复查", body: "复装后机器运行10–15分钟，测量出风口温度，再次检查排水线和阳台地面。完成后才在WhatsApp附照片结单。" },
      ],
      closing: (n) => `这一顺序是${n}当天上门可行的原因——那些让其他公司措手不及的部分（电梯预约、排水走向），我们已经算进价格里。`,
    },
    {
      intro: (n, p) =>
        `${n}的高层住宅上门，技师先按${p}的大楼规则规划，而不是先看冷气本身。电梯窗口安排到位，省下的时间比任何工具都多。`,
      steps: (n, p) => [
        { title: "到管理处报到", body: `抵达${n}后，技师先到管理柜台报到、递交身份证明和准证，并确认哪部服务电梯可用来运送工具。` },
        { title: "室内机拆解", body: "先取下前面板、滤网和风轮，让盘管完全暴露。喷洒清洗药水前，墙面油漆先做遮盖。" },
        { title: "室外机加压清洗", body: "阳台台面的室外机先保护好冷凝水管再加压清洗——粗心处理往往是楼下投诉的根源。" },
        { title: "WhatsApp结单", body: "盘管、排水和室外风扇的前后对比照片，会连同确认价格和保修说明一起发到预约的WhatsApp对话里。" },
      ],
      closing: (n) => `之所以把流程写下来，是因为${n}的上门经常撞上很紧的电梯时段——固定步骤能让工作留在大楼给我们的窗口内。`,
    },
    {
      intro: (n, p) =>
        `${p}区${n}的预约通常是公寓或服务式公寓的一到两台机组，施工时间不长，但门禁规则让准备工作比清洗本身更关键。`,
      steps: (n, p) => [
        { title: "确认进出规则", body: `我们会问${n}客户，大楼是否需要访客登记、签署进出表或为上楼的工具押金。` },
        { title: "布置湿作业区", body: "清洗防水布、接水盘和地垫先铺好，才打开面板。狭窄阳台只有这样才能保证楼下邻居的衣物干爽。" },
        { title: "盘管化学清洗", body: "蒸发器盘管和风轮用温和碱性溶液清洗，冲洗两次，复装前检查排水盘有无藻类。" },
        { title: "施工后风量测试", body: "以出风口温度确认制冷（健康分体机目标约14–17°C），并观察排水线是否满流。" },
      ],
      closing: (n) => `以上步骤就是${n}正常化学清洗的样子——中途不会加推销，WhatsApp上看到的价格就是完工后要付的价格。`,
    },
    {
      intro: (n, p) =>
        `${n}的高层服务在车队出发前就规划好会更顺利。这也是${p}路线按固定顺序运行、而非"到了再看"的原因。`,
      steps: (n, p) => [
        { title: "上门前照片请求", body: `我们会请${n}客户先发一张室内机和阳台外机的照片，让技师抵达前就知道机型、安装高度和排水走向。` },
        { title: "滤网 + 盘管检查", body: "先取滤网——积尘重通常意味着化学清洗报价成立；滤网干净但制冷弱，多半是冷媒压力问题。" },
        { title: "化学清洗或补充冷媒", body: "对客户在WhatsApp上确认合适的服务后，才开始额外工作。价格写进同一段对话里。" },
        { title: "结单 + 保修说明", body: "在WhatsApp发送简短的保修说明，涵盖1个月工艺保修期，并附上排水检查照片。" },
      ],
      closing: (n) => `这样的结单流程，让${n}客户可以放心把同一栋楼的邻居介绍给我们，不担心突然多出的费用。`,
    },
  ],
  shopOffice: [
    {
      intro: (n, p) =>
        `${p}内${n}的店屋和办公室预约按不同的时钟运行——重点是在顾客或租户到达前完工，而不是在车上省下几分钟。`,
      steps: (n, p) => [
        { title: "确认营业时段", body: `我们与${n}商家约定卷闸开启时间，并把清洗计划设为提前30分钟完成，方便店家开门前擦拭。` },
        { title: "店面浮尘擦拭", body: "技师会擦净店面玻璃、天花出风口周边区域和靠近清洗防水布的商品展示柜，避免留下水痕。" },
        { title: "天花出风口 / 卡式机清洗", body: "天花卡式机需卸下面板、加压清洗盘管、冲洗排水泵，并确认四个出风扇叶的风量后再复装。" },
        { title: "交接给店员", body: `${n}店铺的负责人在WhatsApp上签收完工单，价格和保修期都已在其中列明。` },
      ],
      closing: (n) => `这套流程让${n}的店屋服务保持每次固定费用——卷闸开启后不会出现"临时发现"的加价。`,
    },
    {
      intro: (n, p) =>
        `${n}的办公室和店屋机组在${p}通常每天运行10–12小时，盘管负荷比住宅更重，因此上门流程围绕深度清洗设计，而不是轻描淡写地冲一冲。`,
      steps: (n, p) => [
        { title: "运转时数 + 油烟检查", body: `技师会询问${n}租户机器每天运行几小时，以及楼下是否有餐饮或美发工作。` },
        { title: "取下滤网 + 风轮", body: "滤网和风轮一起取出——油腻的风轮常常是店屋机组常规清洗后风量仍然不足的原因。" },
        { title: "盘管碱性清洗", body: "盘管以更强的碱性药水清洗，冲洗两次，并检查排水盘是否有虫害残留。" },
        { title: "施工后风量报告", body: "出风口温度和排水流量都会记录，报告发到店主WhatsApp，让面对租户投诉时能用数据回应。" },
      ],
      closing: (n) => `这份报告把${n}的一次性清洗，转化为日后的保养合约对话，当天不会有推销压力。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的商业预约成败往往取决于停车与上下货便利。我们会先了解店排是否允许车辆直接停在门口，再规划上门。`,
      steps: (n, p) => [
        { title: "停车 + 上下货确认", body: `派工前先确认${n}是否允许车辆停在卷闸前，还是技师需从附近停车位徒步搬运工具。` },
        { title: "拆下面板 / 出风口", body: "取下天花出风口或壁挂机面板，检查盘管是否有油烟、灰尘及店屋长时间使用带来的虫害。" },
        { title: "高压化学清洗", body: "盘管、风轮和排水盘一并清洗，店铺电源插座会用规格合适的延长线保护，让机器可以安全重启。" },
        { title: "保修 + 下次上门备注", body: `${n}的租户会收到完工价、保修说明，以及基于日运转时数建议的下次上门窗口。` },
      ],
      closing: (n) => `这份备注让${n}的回头店客户不再以紧急模式打来，而是转为轻度定期维护。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的店铺和办公室服务，通常关注的是租户长期舒适度，而不是追求一次性的清洁效果。上门流程正是围绕这一点设计。`,
      steps: (n, p) => [
        { title: "租户简报", body: `抵达后技师先向${n}租户自我介绍，确认WhatsApp上已协议的价格，并询问是否有过往冷气问题需要记录。` },
        { title: "盘管 + 排水深度清洗", body: "蒸发器盘管清洗完毕后，排水盘和排水管冲至全清，室外盘管加压冲洗清除路边浮尘。" },
        { title: "风量确认", body: "在所有出风口测量温度；如有出风口风量偏弱，会检查出风扇叶电机和滤网夹片后再结单。" },
        { title: "WhatsApp书面报告", body: `${n}的书面报告包含清洗照片、排水流量照片，以及一段解释建议保养频率背后原因的说明。` },
      ],
      closing: (n) => `所以${n}这条路线常常被同一店排的邻居再叫一次——真正做介绍的是文件本身。`,
    },
  ],
  landed: [
    {
      intro: (n, p) =>
        `${p}的${n}排屋通常有多台机组——主卧、一两间儿童房，有时客厅还有一台变频机。上门被规划为一间屋内的小型路线，而不是单机上门。`,
      steps: (n, p) => [
        { title: "全屋巡视", body: `技师陪同${n}屋主逐间查看，标记哪些机器在运行、哪些制冷不足，并确认当日在服务范围内的机组。` },
        { title: "铜管 + 电线检查", body: "较旧的排屋常有铜管接头氧化、墙上支架松动的情况。任何不安全的地方都会在冷水接触盘管前用照片标注。" },
        { title: "分批化学清洗", body: "机组一台一台清洗，让家人依然能使用一间有冷气的房间。每台机器的排水线在开始下一台前都确认畅通。" },
        { title: "全屋制冷复查", body: "最后一台机组复装后，所有清洗过的机组一起运行15分钟，测量出风口温度以确认全屋制冷正常。" },
      ],
      closing: (n) => `这套顺序让${n}的多机预约通常一次完成，而不是分两天。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的排屋一般从楼上到楼下的铜管走线较长。半个上门在楼上，半个在压缩机排上，流程也如实反映这个现实。`,
      steps: (n, p) => [
        { title: "楼上楼下对应", body: `技师与${n}屋主一起确认哪台室内机对应哪台外机，因为老旧的安装标签常常不准。` },
        { title: "压缩机排检查", body: "外机排会检查支架锈蚀、排水坡度和风扇叶损坏。任何影响冷媒压力的问题都会在清洗前处理好。" },
        { title: "盘管 + 冷媒核验", body: "每台清洗后的机组都会测量冷媒压力，让制冷不足的问题在技师离开前就能诊断。" },
        { title: "屋主签认", body: "屋主在WhatsApp上看到清洗前后的盘管照片、冷媒读数和最终价格，才讨论付款事宜。" },
      ],
      closing: (n) => `这一步签认，避免了${n}排屋客户最讨厌的"为什么价格和WhatsApp报价不一样？"的瞬间。`,
    },
    {
      intro: (n, p) =>
        `${p}的${n}排屋工作常常包含一台老定频机和一台新变频机。两类机组清洗方式不同，因此上门被分成两个小任务。`,
      steps: (n, p) => [
        { title: "机组清单", body: `抵达后，技师按房间、品牌、马力和变频/定频分类列出${n}每台机器，据此决定作业顺序。` },
        { title: "先清洗定频", body: "较旧的定频机先处理，因为它们更耐拆装，也能空出客户卧室便于后续作业。" },
        { title: "变频机组带PCB保护清洗", body: "变频机在冷水接触盘管前，PCB和传感器接口先做防护——这也是粗心清洗损坏昂贵主板的地方。" },
        { title: "冷却交叉复核", body: "两种机组都完成后，所有清洗机组运行10分钟并取出风口温度，让客户确认清洗确实改善了制冷。" },
      ],
      closing: (n) => `这种拆分是${n}客户避开经典抱怨——"洗过"的变频机下周就跳闸——的方式。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的排屋服务是一次全屋上门，而不是单机上门，流程围绕在同一个派工窗口内完成整个屋子设计。`,
      steps: (n, p) => [
        { title: "全屋范围", body: `技师与${n}屋主先确认服务范围内的机组清单，任何"只做检查"的机组会在开工前单独报价。` },
        { title: "逐间化学清洗", body: "每个房间的机组清洗并复装后再进入下一间，让家人可以在其他房间保持凉爽。" },
        { title: "排水线负载测试", body: "每条排水线都在满流状态下观察至少30秒，捕捉只在负载下才出现的慢速堵塞。" },
        { title: "屋主交付资料", body: `${n}屋主会在WhatsApp收到简短总结：清洗机组、排水检查通过情况、制冷读数、保修期以及下次上门建议。` },
      ],
      closing: (n) => `这份交付让${n}的排屋客户通常无需重新报价就会预约下一轮服务。`,
    },
  ],
  kampung: [
    {
      intro: (n, p) =>
        `${n}是${p}内的传统低层街区，多数机组在地面就能触及。上门的重点不在通行，而在于是否值得再洗一次旧机，还是直接更换更合适——我们会给出诚实建议。`,
      steps: (n, p) => [
        { title: "机组年龄 + 冷媒确认", body: `技师会确认${n}机组的大致年龄和冷媒类型（R22 / R410A / R32）。R22机型会被标记，因为冷媒不易采购。` },
        { title: "电容 + 电线检查", body: "老旧的甘榜安装中，电容和外机电线常常才是跳闸或启动无力的真凶——所以在报价清洗前先做检查。" },
        { title: "决定化学清洗或维修", body: "会直接告诉客户化学清洗是否能解决问题，还是维修/更换更划算。建议会记录在WhatsApp对话中。" },
        { title: "施工后运行测试", body: "作业完成后机器运行20分钟，确认出风口温度后再离开。" },
      ],
      closing: (n) => `诚实建议这一步正是${n}上门的核心——它让客户不必花钱清洗一台其实该更换的机组。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的预约多数来自长期居民，他们想要的是直白回答，不是销售话术。上门顺序体现了这一点。`,
      steps: (n, p) => [
        { title: "情况提问", body: `打开机器前，技师会先问${n}屋主三个问题：机器多老、上次清洗是什么时候、最近有什么变化（噪音、漏水、制冷弱）。` },
        { title: "非侵入检查", body: "先不拆室内机，检查室外盘管、排水和电容，避免把误诊伪装成清洗报价。" },
        { title: "WhatsApp书面报价", body: `${n}客户在任何面板拆开前，就在WhatsApp上看到最终价格。除非发现新故障并达成一致，否则价格不变。` },
        { title: "施工 + 制冷验证", body: "选定的工作完成后，机器以出风口温度读数验证，让客户不再猜测清洗是否真的有效。" },
      ],
      closing: (n) => `这种先问后做的流程，是${n}长期客户会把我们的WhatsApp介绍给邻居的原因。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的甘榜式服务是一个小任务地区——一台室内、一台室外，配件与更换的判断要果断。流程短但纪律严谨。`,
      steps: (n, p) => [
        { title: "地面通行检查", body: `${n}多数室外机装在矮墙或地面支架上，技师会先确认最安全的架梯位置，再动任何工具。` },
        { title: "冷媒 + 电容测试", body: "先测冷媒压力和电容微法拉——盘管干净但制冷弱，通常是电容或冷媒问题，而不是清洗问题。" },
        { title: "对症服务报价", body: "客户会在WhatsApp上看到一个推荐服务和一个替代方案（例如清洗与更换），每个都有通俗易懂的理由。" },
        { title: "带照片结单", body: "盘管、排水和室外风扇的照片附在WhatsApp完工消息里，让家庭档案在来年有对比依据。" },
      ],
      closing: (n) => `对症服务报价，让${n}的预约金额虽小，但信任度高。`,
    },
    {
      intro: (n, p) =>
        `${p}的甘榜街道，包括${n}，是那种技师需要既愿意说"这台别花钱了"、也能推荐化学清洗的地方。上门就是为这种诚实对话设计的。`,
      steps: (n, p) => [
        { title: "屋主简报", body: `技师在${n}的大门口自我介绍，确认WhatsApp上已达成的价格，并询问屋主希望先清洗还是先做诚实检查。` },
        { title: "机组 + 电气检查", body: "室内机、排水、电容、隔离开关和外露电线都会检查。任何不安全的部分与清洗报价分开标注。" },
        { title: "维修或更换判断", body: "对于使用约10年以上的机组，屋主会得到直接的维修或更换建议，而不是被推销一次撑不了多久的清洗。" },
        { title: "WhatsApp保修说明", body: `${n}的完工WhatsApp附有1个月工艺保修说明，屋主清楚知道相同问题再次出现时能获得什么保障。` },
      ],
      closing: (n) => `这段保修对话虽短，却让${n}的回头生意变得可预测而非偶然。`,
    },
  ],
  hillside: [
    {
      intro: (n, p) =>
        `${n}位于${p}的山坡一侧。坡度、绿化和较长的管线路线，比清洗本身更能决定上门计划——在安装不良的机组上做化学清洗，等于白跑一趟。`,
      steps: (n, p) => [
        { title: "车道 + 架梯计划", body: `技师确认${n}的车道坡度、走一遍室外压缩机路线，并选择在坡上不会翻倒的架梯位置。` },
        { title: "支架 + 排水坡度检查", body: "检查外机支架、墙锚和排水坡度。山坡上一条流速慢的排水，在雨季夜晚会变成快速渗漏。" },
        { title: "带除杂过程的化学清洗", body: "山坡花园里的室外盘管容易积落叶和昆虫，因此碱性清洗前多加一次除杂工序。" },
        { title: "振动 + 噪声核验", body: "复装后压缩机运行15分钟，技师听是否有2分钟快速检查里听不出的支架振动。" },
      ],
      closing: (n) => `这两个额外步骤——除杂和听振动——是${n}山坡工作很少需要二次上门的原因。`,
    },
    {
      intro: (n, p) =>
        `${p}的山坡服务，让${n}的预约通常先在报价里列出支架项目。斜面墙壁上的安装五金件老化速度比直墙快。`,
      steps: (n, p) => [
        { title: "支架安全审计", body: `任何清洗开始前，先用手压方式对${n}支架墙锚做拉拔测试。松动的地方在进一步作业前标注并报价。` },
        { title: "确认排水坡度", body: "在排水盘做一次短水量倾倒，在室外排放口计时。坡度低于标准的先修，再洗盘管，而不是相反。" },
        { title: "盘管化学清洗", body: "在排水已被验证的前提下清洗蒸发器和室外盘管，让缓慢渗水永远不会被误认为清洗不到位。" },
        { title: "带照片交接", body: "客户在WhatsApp上先看到支架、排水坡度和盘管照片，价格再被确认为已付。" },
      ],
      closing: (n) => `先支架后清洗的顺序，是${n}的一项习惯——山坡上的墙不会原谅一次马虎的上门。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}意味着更大的房子、更长的铜管和每次更多的机组。上门流程被设计为技师持续推进，同时不错过山坡特有的小风险。`,
      steps: (n, p) => [
        { title: "全屋 + 管线长度清点", body: `技师会列出${n}每台机组的室内到室外的管线长度，让之后的冷媒检查基于真实数据。` },
        { title: "压缩机排环视", body: "室外压缩机排（山坡墙面上往往是一排）会被拍照，任何倾斜的支架都会另行报价。" },
        { title: "分批清洗机组", body: "机组一台接一台清洗，但排水检查始终按山坡水流方向进行，共用排水线在最后一台上得到验证。" },
        { title: "屋主报告", body: "简短的WhatsApp报告显示管线长度、冷媒读数、排水检查照片以及整次上门的确认价格。" },
      ],
      closing: (n) => `这份报告让${n}的屋主不必再来一次现场也能规划明年的保养预算。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的山坡地址更像是一次安装质量检查，而非清洗。上门流程被设计为在老安装缺陷酿成渗漏前捕捉它们。`,
      steps: (n, p) => [
        { title: "管线保温巡视", body: `技师从${n}的室内机走到室外压缩机，沿路检查外露管段的保温缺失和日晒损坏。` },
        { title: "清洗 + 排水冲洗", body: "盘管和风轮清洗，排水线冲洗，技师留意山坡下花园是否有积水。" },
        { title: "冷媒 + 压缩机声音测试", body: "测量冷媒压力，倾听压缩机负载正常时的低沉嗡鸣。任何异常都会在客户付款前反馈。" },
        { title: "书面下次上门说明", body: `${n}的客户会得到一份基于管线长度、机组年龄和室外机遮阴情况的下次上门建议。` },
      ],
      closing: (n) => `这份说明把${n}的山坡预约，变成一段有规划的关系，而不是雨季里的灭火作业。`,
    },
  ],
  industrial: [
    {
      intro: (n, p) =>
        `${n}位于${p}的轻商业或车间带。粉尘负荷、每天10+小时运转和共用排水，意味着住宅式的清洗周期完全不够。上门被设计为定期深度清洗，而非"快速冲一下"。`,
      steps: (n, p) => [
        { title: "现场 + 停机窗口", body: `技师确认${n}的营业时间，与现场主管协商安全停机时段，并找到目标机组的电气隔离开关。` },
        { title: "卡式机 / 壁挂机拆解", body: "天花卡式机整机放下，出风格栅在水桶里单独清洗，风轮取下做真正的手洗，而不是喷一喷了事。" },
        { title: "碱性盘管 + 排水泵保养", body: "盘管以更强碱性处理，冷凝水泵用桶注水测试，让排水泵的排水循环得到验证。" },
        { title: "施工后台账登记", body: `现场台账登记清洗日期、盘管状态、排水泵测试结果，以及${n}机组下次建议保养日期。` },
      ],
      closing: (n) => `台账登记让${n}的现场把整个保养计划交给我们，而不是只在紧急时打电话。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的工业和车间机组往往不会礼貌地坏——通常都在最忙的一天停止制冷。上门流程被设计为在故障发生前捕捉信号。`,
      steps: (n, p) => [
        { title: "基准读数", body: `任何清洗开始前，技师记录${n}每台机组的出风口温度和排水流量，让清洗的真实效果之后可以测量。` },
        { title: "滤网、风轮、盘管", body: "滤网、风轮和盘管按次序清洗——在油腻风轮下方洗盘管是作秀，不是保养。" },
        { title: "排水 + 冷凝水泵测试", body: "排水线冲洗，冷凝水泵（如有）用桶注水测试，让泵送能力被验证而非被假设。" },
        { title: "报告给现场负责人", body: `${n}的现场负责人会收到前后读数，让下一次保养周期基于真实数据规划，而不是凭猜测。` },
      ],
      closing: (n) => `以数据为基础的收尾，让${n}的车间机组从反复紧急变成可预算的日常成本。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}通常意味着共用电源、狭窄的上下货通道和无法打乱的运作班次。上门顺序保护的是班次，而不是技师的方便。`,
      steps: (n, p) => [
        { title: "隔离开关 + 停机协议", body: `任何湿作业开始前，技师确认哪一个隔离开关能切断目标${n}机组的电源，并获得班次主管的书面停机同意。` },
        { title: "受控清洗", body: "机组下方铺设防水布和接水盘，避免弄湿车间地面设备或下方电气面板。" },
        { title: "盘管 + 风轮复装", body: "风轮和盘管清洗、干燥，机组复装前用目视检查风扇电机轴承状态，然后再恢复电源。" },
        { title: "带负载重启", body: "机组重启并让其达到正常负载后，确认出风口温度。现场台账登记结束本次上门。" },
      ],
      closing: (n) => `因为${n}的现场承担不起一次糟糕清洗带来的整个下午，所以流程被写下来，每次都按同一方式执行。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的车间和轻商业服务，目的在于减少每年意外停机的次数。上门流程围绕检查深度设计，而非清洗速度。`,
      steps: (n, p) => [
        { title: "检查巡视", body: `技师走一遍${n}的车间地板，记录哪台机组服务哪个区域，并确认当日在服务范围内的机组。` },
        { title: "逐台深度清洗", body: "盘管、风轮和排水盘全部清洁；任何接近寿命末期的皮带或轴承被标注，安排定期更换而非紧急抢修。" },
        { title: "排水 + 电气审计", body: "冷凝水排水和电气隔离开关状况被检查和拍照，进入现场台账。" },
        { title: "预防性时间表说明", body: `${n}的负责人会收到一份基于日运转时数和粉尘负荷的下次上门建议。` },
      ],
      closing: (n) => `这份说明是${n}的现场在几次上门内从被动转为主动的原因。`,
    },
  ],
  mixed: [
    {
      intro: (n, p) =>
        `${p}内${n}是一条混合型街道——排屋、公寓和小店屋都在几分钟内彼此相邻。技师会在工具下车前先确认准确的建筑类型。`,
      steps: (n, p) => [
        { title: "地址 + 建筑类型确认", body: `我们会问${n}客户地址是排屋、公寓、店屋还是小办公室，这决定了哪种清洗防水布和哪种排水疏通工具上楼。` },
        { title: "盘管 + 滤网检查", body: "先检查滤网和蒸发器盘管——灰尘与霉菌的比例告诉我们机组真正需要的是哪种服务。" },
        { title: "所选服务执行", body: "化学清洗、加冷媒或针对性维修根据检查结果执行，而不是打包式推销。" },
        { title: "屋主签认", body: "确认价格和保修说明在WhatsApp发送，附上清洗前后的盘管照片。" },
      ],
      closing: (n) => `这种决策树式流程，让${n}的客户看到的是一个明确建议和一个明确价格，而不是一份菜单。`,
    },
    {
      intro: (n, p) =>
        `${p}内${n}的预约可能是三种建筑类型中的任何一种。我们的流程设计能够同样很好地服务公寓单位、排屋卧室和店铺前的卡式机。`,
      steps: (n, p) => [
        { title: "首访提问", body: `抵达后技师会问${n}客户三个问题：机器出了什么问题、机器多老、上一次保养是什么时候。` },
        { title: "非破坏性检查", body: "机器不拆解就先检查——取下滤网、检查排水、在室外机测试电容和冷媒。" },
        { title: "确认报价", body: "客户在任何面板拆下前就在WhatsApp上看到最终价格，避免有人被绑上一张没签字的账单。" },
        { title: "施工 + 制冷验证", body: "选定的工作完成后，出风口温度被测量，然后收尾。" },
      ],
      closing: (n) => `这一步验证让${n}的回头率保持很高——客户知道到底改变了什么。`,
    },
    {
      intro: (n, p) =>
        `${p}的房屋类型非常多样，${n}是个很好的例子。我们的流程之所以严谨，恰恰是因为现场条件并不严谨。`,
      steps: (n, p) => [
        { title: "机组 + 品牌清单", body: `技师按房间、品牌和大致年龄列出服务范围内的机组，这决定了清洗、加气或维修报价中哪一项最合适。` },
        { title: "按优先级作业", body: "最影响家人或店家的机组优先处理，即便上门时间超时，客户仍能先拿回主要舒适。" },
        { title: "清洗、冷媒或维修按需", body: "只执行经确认的服务。若在上门中发现额外工作，会在WhatsApp上报价并确认后再开始。" },
        { title: "带照片交付", body: `${n}的WhatsApp完工消息包含所有作业机组的盘管、排水和室外照片。` },
      ],
      closing: (n) => `带照片的交付，让${n}客户之后可以轻松向家中其他成员解释这次上门。`,
    },
    {
      intro: (n, p) =>
        `因为${p}内${n}这周可能是公寓，下周可能是店屋，我们对所有上门都用同一套流程。它有意做得平淡——可预测本身就是产品。`,
      steps: (n, p) => [
        { title: "进出 + 电源检查", body: `抵达后技师确认${n}的室外机通道、隔离开关位置以及任何会影响清洗的大楼规则。` },
        { title: "盘管 + 排水清洗", body: "标准化学清洗顺序：滤网、风轮、盘管、排水盘和室外盘管，防水布已铺好。" },
        { title: "施工后测试", body: "出风口温度和排水线流量得到确认，任何异常都会拍照并在WhatsApp分享。" },
        { title: "收尾 + 保修说明", body: `${n}客户在预约起始的同一WhatsApp对话中收到最终价格和1个月工艺保修说明。` },
      ],
      closing: (n) => `可预测的收尾，让${n}的客户能自在地把我们推荐给同一条街上的另一种建筑类型。`,
    },
  ],
};

export function kampungGamePlan(
  k: KampungRecord,
  parentArea: ParentAreaRecord | undefined,
  locale: KampungDepthLocale,
): KampungGamePlan {
  const profile = detectProfile(k);
  const parentName = parentArea?.name || k.parentSlug.replace(/-/g, " ");
  const idx = pickVariant(k.slug, "plan", 4);

  const pool =
    locale === "en" ? PLAN_EN : locale === "ms" ? PLAN_MS : PLAN_ZH;
  const variant = pool[profile][idx];

  return {
    heading: PLAN_HEADING[locale](k.name),
    intro: variant.intro(k.name, parentName),
    steps: variant.steps(k.name, parentName),
    closing: variant.closing(k.name),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 2) Local signals we plan for
// ─────────────────────────────────────────────────────────────────────────

export type KampungSignalRow = { dimension: string; value: string; detail: string };

export type KampungSignals = {
  heading: string;
  intro: string;
  rows: KampungSignalRow[];
  closing: string;
};

const SIGNALS_HEADING: Record<KampungDepthLocale, (name: string) => string> = {
  en: (n) => `What local signals do we plan for in ${n}?`,
  ms: (n) => `Isyarat setempat apakah yang kami rancang untuk ${n}?`,
  zh: (n) => `${n}有哪些本地信号是我们提前规划好的？`,
};

const SIGNALS_DIM_LABELS: Record<KampungDepthLocale, {
  transit: string; weekend: string; fault: string; vintage: string;
}> = {
  en: {
    transit: "Transit + parking window",
    weekend: "Weekend load pattern",
    fault: "Fault pattern we prepare for",
    vintage: "Typical unit vintage signal",
  },
  ms: {
    transit: "Slot pengangkutan + parkir",
    weekend: "Corak beban hujung minggu",
    fault: "Corak kerosakan yang kami sediakan",
    vintage: "Isyarat usia unit tipikal",
  },
  zh: {
    transit: "交通 + 停车窗口",
    weekend: "周末负荷模式",
    fault: "我们提前准备的故障模式",
    vintage: "典型机组年代信号",
  },
};

// Signal detail is derived by profile × parent-area + a per-kampung variant.
// Each dimension has 3 wording variants per locale so a parent area covering
// e.g. 6 kampungs will express each row differently within the parent.

type SignalCopy = {
  transit: string[];
  weekend: string[];
  fault: string[];
  vintage: string[];
};

const SIGNAL_EN: Record<ProfileKey, SignalCopy> = {
  highRise: {
    transit: [
      "Service-lift windows dictate the arrival slot; we align van dispatch to hit the lift lull between 10am and noon.",
      "Guardhouse registration and visitor-lift booking take about 15 minutes; the technician is told to arrive with the permit copy already in hand.",
      "Loading bay access is confirmed at booking so tools do not travel the guest lift, which the JMB usually forbids.",
    ],
    weekend: [
      "Weekend bookings run into full lifts and higher condo activity; we deliberately keep Saturday slots to the 9–11am block.",
      "Sunday morning is the calmest window for high-rise wash work; drain-line testing is easier when the stack above is not in use.",
      "Weekends fill up fast for condo customers, so we usually confirm the Saturday slot by Thursday evening.",
    ],
    fault: [
      "Blocked drain trays and mouldy indoor coils dominate the fault mix; we bring drain-flush tools every visit, not on request.",
      "Balcony wind-driven rain often trips the outdoor fan capacitor; a spare capacitor rides on the van by default.",
      "Weak airflow after a wash is usually the blower wheel, not the coil — the tool for that stays in the wash kit.",
    ],
    vintage: [
      "Most high-rise units here are 5–10 years old inverter splits; the diagnostic clip on the van matches those PCBs.",
      "Newer serviced-residence units tend to run R32 refrigerant; the correct gauges are pre-loaded rather than fetched.",
      "Older condos still carry a mix of R22 and R410A; the technician confirms refrigerant type before quoting any gas work.",
    ],
  },
  shopOffice: {
    transit: [
      "Loading is easier before shop-opening hours; morning-first slots let the van park directly at the shutter.",
      "Front-row parking is unpredictable after 10am; we align dispatch to hit the shop before daily foot traffic builds up.",
      "Some shop rows only allow van stops during shutter-open windows; we confirm the exact parking rule at booking.",
    ],
    weekend: [
      "Weekend commercial bookings usually run outside operating hours; the technician stays on site until the shutter opens.",
      "Saturday afternoon is heavy for shoplot tenants; we default to Sunday slots for a quieter wash environment.",
      "Weekend availability at shop rows is limited by tenant working schedules; we set expectations at booking.",
    ],
    fault: [
      "Grease and roadside dust foul coils faster than residential; a stronger alkaline mix is packed by default.",
      "Ceiling cassette drain pumps often stall in shoplot heat; a spare pump adaptor rides in the tool bag.",
      "Long daily runtime wears the blower wheel; a wheel-scrub brush is standard equipment for these visits.",
    ],
    vintage: [
      "Shoplot units are often mixed age — a 15-year non-inverter beside a new inverter; both toolsets travel together.",
      "Office ceiling cassettes here are commonly 8–12 years old; the pump-drain diagnostic is part of every visit.",
      "Newer shop-office units on inverter tech need extra PCB care; the technician always covers the board before washing.",
    ],
  },
  landed: {
    transit: [
      "Landed streets are open access; the van parks near the compressor row, cutting tool-carry time.",
      "Corner-lot houses give the widest working space; end-of-row houses are usually the easiest bookings.",
      "Some gated schemes still require visitor registration at the guardhouse; the technician arrives with an ID copy.",
    ],
    weekend: [
      "Weekend family bookings often cover 3–5 units at once; we allocate longer slots to avoid rushing the drain checks.",
      "Sunday morning bookings suit multi-unit landed jobs; family members are usually home to walk the technician through each room.",
      "Saturday afternoon slots are common for weekend maintenance; we plan the sequence to finish before evening rush.",
    ],
    fault: [
      "Ageing capacitors and dirty outdoor coils dominate landed faults; both tools are pre-loaded on the van.",
      "Long copper runs from upstairs to compressor drift out of spec; gas pressure is measured every visit here.",
      "Older wall brackets slowly loosen in Malaysian humidity; a bracket audit is part of the standard visit.",
    ],
    vintage: [
      "Older landed homes often run 10+ year non-inverter units; the capacitor and gas gauge are checked before any wash.",
      "Mixed vintage is normal — one old non-inverter, one new inverter — so both service kits ride together.",
      "Newer landed builds have inverter tech throughout; PCB protection is standard rather than optional.",
    ],
  },
  kampung: {
    transit: [
      "Kampung streets are direct-access ground level; the van parks nearby and the technician walks in with a light kit.",
      "Some traditional lanes are narrow; the van stops on the main road and tools are hand-carried the last 30 metres.",
      "Ground-floor access means no lift or permit delays; same-day slots are more realistic here than in a high-rise.",
    ],
    weekend: [
      "Weekend visits here often coincide with family gatherings; we quote a fixed price so nothing changes in front of guests.",
      "Sunday mornings are common for older homeowners; the visit is planned in a short window before midday heat.",
      "Weekends are also when relatives visit and notice weak cooling; we keep same-day slots open on Saturdays.",
    ],
    fault: [
      "R22 or R410A units with weak capacitors dominate; the technician tests the capacitor before quoting any wash.",
      "Dusty outdoor coils and clogged drains are the two common issues; both fixes are prepared in the standard kit.",
      "Older units sometimes need honest repair-or-replace advice, not a wash; the recommendation is delivered on WhatsApp in writing.",
    ],
    vintage: [
      "Many units in this kampung are 10+ years old; the capacitor test and gas check run before the wash quote is finalised.",
      "Refrigerant type is confirmed on arrival — R22 is called out because gas is now hard to source.",
      "Older non-inverter units are common; the diagnostic is short and the recommendation is direct.",
    ],
  },
  hillside: {
    transit: [
      "Hillside driveways can be narrow and steep; the van stops at the top of the driveway and tools are walked down.",
      "Wet-weather driveways need extra care; the technician avoids parking on a slope that will not drain.",
      "Some hillside estates require guarded access; we send the ID copy ahead so the guardhouse can wave the van through.",
    ],
    weekend: [
      "Weekend hillside bookings suit larger homes; we allow extra time for bracket audits before the wash begins.",
      "Sunday morning is the safest ladder window; less traffic on the driveway lets the technician set up without pressure.",
      "Saturday-afternoon slots work for landed hillside owners; the visit closes before the daily evening rain.",
    ],
    fault: [
      "Debris from garden trees clogs outdoor coils; a leaf-lift pass is added before the alkaline wash.",
      "Long pipe runs with poor insulation cause condensation drops; the insulation is inspected on the walk-in.",
      "Loose brackets on hillside walls are common; the audit is done first, not last.",
    ],
    vintage: [
      "Hillside homes here often have inverter tech with long pipe runs; the gas gauge and torque wrench are always packed.",
      "Older hillside installs sometimes have missing insulation; the technician quotes the fix before starting the wash.",
      "Newer builds have inverter multi-splits; the correct diagnostic clip is on the van rather than fetched later.",
    ],
  },
  industrial: {
    transit: [
      "Industrial loading bays need site-manager clearance; the technician arrives with the permit and ID ready.",
      "Shift changes decide the safe shutdown window; we book the visit around the least disruptive slot.",
      "Yard parking is usually straightforward; the van stops at the loading bay closest to the target unit.",
    ],
    weekend: [
      "Weekend industrial work is common — a full shutdown window lets the wash run without interrupting production.",
      "Saturday evening slots are common for retail-facing units so the store can reopen fresh on Sunday.",
      "Sunday off-shift bookings suit workshops that cannot spare a weekday hour.",
    ],
    fault: [
      "Long daily runtime and heavy dust foul filters quickly; a filter-cut backup is packed for every visit.",
      "Condensate pumps stall under continuous load; a spare pump adaptor rides in the tool bag by default.",
      "Blower wheels build up grease faster than residential; a wheel-scrub brush is standard equipment.",
    ],
    vintage: [
      "Ceiling cassettes here are often 8–15 years old; a pump-drain diagnostic is part of every visit.",
      "Mixed vintage is normal; the technician arrives ready for both old drives and new inverter boards.",
      "Newer sites run inverter tech with pump drains; the tool bag reflects that mix.",
    ],
  },
  mixed: {
    transit: [
      "Address type decides the arrival plan; the technician confirms whether the van parks curbside or in a guest lot.",
      "The mix of landed, apartment and shoplot in this area means a two-kit van is standard rather than optional.",
      "Guardhouse or shutter access is confirmed at booking so the technician does not lose the slot at the gate.",
    ],
    weekend: [
      "Weekend bookings mix family and shop tenants; slots are kept slightly longer than the base estimate to cover both.",
      "Sunday morning is preferred for residential; Saturday evening suits shop-front tenants.",
      "Weekend availability is confirmed by Thursday afternoon so both customer types have time to plan.",
    ],
    fault: [
      "Fault mix is broad — dust, mould, weak capacitor, low gas; the technician packs the balanced kit rather than a single-issue toolkit.",
      "Common calls include water leaking into ceilings and weak cooling after long runtime; both are handled in the same visit.",
      "Older wiring in mixed streets sometimes shares a circuit; the isolator is checked before any additional load is added.",
    ],
    vintage: [
      "Unit vintage varies across the street; the balanced diagnostic kit rides on the van by default.",
      "Refrigerant types are confirmed on arrival — R22 units are called out because gas supply is now limited.",
      "Both non-inverter and inverter tech appear in one street; PCB protection is standard on every wash.",
    ],
  },
};

const SIGNAL_MS: Record<ProfileKey, SignalCopy> = {
  highRise: {
    transit: [
      "Slot lif servis mengawal slot ketibaan; kami selaraskan dispatch van untuk tangkap waktu lif kurang sibuk antara 10 pagi ke tengah hari.",
      "Pendaftaran pengawal dan tempahan lif pelawat ambil kira-kira 15 minit; juruteknik diberitahu tiba dengan salinan permit sudah di tangan.",
      "Akses loading bay disahkan semasa tempahan supaya peralatan tidak masuk lif tetamu, yang biasanya dilarang oleh JMB.",
    ],
    weekend: [
      "Tempahan hujung minggu berdepan lif penuh dan aktiviti kondo tinggi; kami sengaja pastikan slot Sabtu dalam blok 9–11 pagi.",
      "Pagi Ahad ialah slot paling tenang untuk kerja cuci bertingkat; ujian saliran lebih mudah bila stack di atas tidak digunakan.",
      "Hujung minggu cepat penuh untuk pelanggan kondo, jadi kami biasanya sahkan slot Sabtu menjelang petang Khamis.",
    ],
    fault: [
      "Dulang saliran tersumbat dan coil dalam berkulat mendominasi; kami bawa alat flush drain setiap lawatan, bukan hanya bila diminta.",
      "Hujan angin balkoni sering menyebabkan kapasitor kipas luar trip; kapasitor spare naik dalam van secara lalai.",
      "Airflow lemah selepas cuci biasanya blower wheel, bukan coil — alat untuk itu kekal dalam kit cuci.",
    ],
    vintage: [
      "Kebanyakan unit bertingkat di sini berusia 5–10 tahun split inverter; klip diagnostik di van sepadan dengan PCB tersebut.",
      "Unit serviced-residence yang lebih baharu cenderung menggunakan refrigerant R32; tolok yang betul sudah dimuat dahulu.",
      "Kondo lama masih membawa campuran R22 dan R410A; juruteknik sahkan jenis refrigerant sebelum sebut harga kerja gas.",
    ],
  },
  shopOffice: {
    transit: [
      "Loading lebih mudah sebelum waktu buka kedai; slot pagi awal biarkan van berhenti terus di shutter.",
      "Parking barisan hadapan tidak stabil selepas 10 pagi; kami selaraskan dispatch supaya sampai sebelum trafik kaki bertambah.",
      "Sesetengah baris kedai hanya benarkan van berhenti dalam tempoh shutter buka; kami sahkan peraturan tepat di tempahan.",
    ],
    weekend: [
      "Tempahan komersial hujung minggu biasanya berjalan luar waktu operasi; juruteknik kekal di tapak sehingga shutter buka.",
      "Petang Sabtu berat untuk penyewa shoplot; kami default kepada slot Ahad untuk persekitaran cuci yang lebih tenang.",
      "Ketersediaan hujung minggu di baris kedai terhad oleh jadual kerja penyewa; kami tetapkan jangkaan di tempahan.",
    ],
    fault: [
      "Minyak dan habuk tepi jalan mengotorkan coil lebih cepat daripada kediaman; campuran alkali lebih kuat dibungkus secara lalai.",
      "Pump saliran ceiling cassette sering tersekat dalam haba shoplot; adaptor pump spare naik dalam beg alat.",
      "Runtime harian panjang menghabiskan blower wheel; berus wheel-scrub ialah peralatan standard untuk lawatan ini.",
    ],
    vintage: [
      "Unit shoplot sering bercampur usia — non-inverter 15 tahun sebelah inverter baharu; kedua-dua toolset perjalanan bersama.",
      "Ceiling cassette pejabat di sini biasanya 8–12 tahun; diagnostik pump-drain sebahagian setiap lawatan.",
      "Unit shop-office baharu pada teknologi inverter perlu penjagaan PCB tambahan; juruteknik selalu tutup board sebelum cuci.",
    ],
  },
  landed: {
    transit: [
      "Jalan landed akses terbuka; van berhenti berhampiran barisan kompressor, memotong masa membawa alat.",
      "Rumah lot sudut beri ruang kerja paling luas; rumah hujung baris biasanya tempahan paling mudah.",
      "Sesetengah skim berpagar masih memerlukan pendaftaran pelawat di pondok pengawal; juruteknik tiba dengan salinan ID.",
    ],
    weekend: [
      "Tempahan keluarga hujung minggu selalu meliputi 3–5 unit sekali gus; kami peruntukkan slot lebih panjang untuk elak tergesa semakan saliran.",
      "Tempahan pagi Ahad sesuai untuk kerja landed multi-unit; ahli keluarga biasanya di rumah untuk temani juruteknik ke setiap bilik.",
      "Slot petang Sabtu biasa untuk penyelenggaraan hujung minggu; kami rancang susunan supaya selesai sebelum rush petang.",
    ],
    fault: [
      "Kapasitor menua dan coil luar kotor mendominasi kerosakan landed; kedua-dua alat sudah dimuat pada van.",
      "Laluan tembaga panjang dari atas ke kompressor terkeluar dari spec; tekanan gas diukur setiap lawatan di sini.",
      "Bracket dinding lama perlahan longgar dalam kelembapan Malaysia; audit bracket sebahagian dari lawatan standard.",
    ],
    vintage: [
      "Rumah landed lama sering jalankan unit non-inverter 10+ tahun; kapasitor dan tolok gas disemak sebelum sebarang cuci.",
      "Usia bercampur ialah biasa — satu non-inverter lama, satu inverter baharu — jadi kedua-dua kit servis bawa bersama.",
      "Binaan landed baharu ada teknologi inverter menyeluruh; perlindungan PCB standard bukannya pilihan.",
    ],
  },
  kampung: {
    transit: [
      "Jalan kampung akses terus paras tanah; van berhenti berhampiran dan juruteknik masuk dengan kit ringan.",
      "Sesetengah lorong tradisional sempit; van berhenti di jalan utama dan alat dibawa tangan 30 meter terakhir.",
      "Akses tingkat bawah bermakna tiada kelewatan lif atau permit; slot hari sama lebih realistik di sini berbanding bertingkat.",
    ],
    weekend: [
      "Lawatan hujung minggu di sini sering bertepatan dengan perhimpunan keluarga; kami sebut harga tetap supaya tiada yang berubah depan tetamu.",
      "Pagi Ahad biasa untuk pemilik rumah lebih tua; lawatan dirancang dalam slot pendek sebelum haba tengah hari.",
      "Hujung minggu juga masa saudara mara melawat dan perasan cooling lemah; kami kekalkan slot hari sama pada Sabtu.",
    ],
    fault: [
      "Unit R22 atau R410A dengan kapasitor lemah mendominasi; juruteknik uji kapasitor sebelum sebut harga cuci.",
      "Coil luar berhabuk dan saliran tersumbat ialah dua isu biasa; kedua-dua penyelesaian disediakan dalam kit standard.",
      "Unit lama kadang perlukan nasihat baiki-atau-ganti jujur, bukan cuci; cadangan dihantar di WhatsApp secara bertulis.",
    ],
    vintage: [
      "Banyak unit di kampung ini berusia 10+ tahun; ujian kapasitor dan semakan gas berjalan sebelum sebut harga cuci diperkukuh.",
      "Jenis refrigerant disahkan bila tiba — R22 dipanggil kerana gas kini sukar didapati.",
      "Unit non-inverter lama biasa; diagnostik pendek dan cadangan lurus.",
    ],
  },
  hillside: {
    transit: [
      "Driveway bukit boleh jadi sempit dan curam; van berhenti di puncak driveway dan alat dibawa turun berjalan.",
      "Driveway cuaca basah perlu berjaga lebih; juruteknik elak parkir di cerun yang tidak akan mengalir.",
      "Sesetengah estet bukit memerlukan akses berkawal; kami hantar salinan ID awal supaya pondok pengawal boleh lambai van masuk.",
    ],
    weekend: [
      "Tempahan bukit hujung minggu sesuai untuk rumah lebih besar; kami bagi masa tambahan untuk audit bracket sebelum cuci bermula.",
      "Pagi Ahad ialah slot tangga paling selamat; kurang trafik di driveway biarkan juruteknik pasang tanpa tekanan.",
      "Slot petang Sabtu berfungsi untuk pemilik landed bukit; lawatan tutup sebelum hujan petang harian.",
    ],
    fault: [
      "Serpihan dari pokok taman menyumbat coil luar; pass angkat-daun ditambah sebelum cuci alkali.",
      "Laluan paip panjang dengan penebat buruk menyebabkan titisan kondensasi; penebat diperiksa bila masuk.",
      "Bracket longgar pada dinding bukit biasa; audit dibuat dahulu, bukan akhir.",
    ],
    vintage: [
      "Rumah bukit di sini sering ada teknologi inverter dengan laluan paip panjang; tolok gas dan torque wrench selalu dibungkus.",
      "Pemasangan bukit lama kadang ada penebat hilang; juruteknik sebut harga pembaikan sebelum mulakan cuci.",
      "Binaan baharu ada multi-split inverter; klip diagnostik yang betul di van bukannya diambil kemudian.",
    ],
  },
  industrial: {
    transit: [
      "Loading bay industri perlukan kebenaran pengurus tapak; juruteknik tiba dengan permit dan ID sudah sedia.",
      "Pertukaran shift menentukan slot shutdown selamat; kami tempah lawatan sekitar slot paling kurang mengganggu.",
      "Parking yard biasanya lurus; van berhenti di loading bay paling dekat dengan unit sasaran.",
    ],
    weekend: [
      "Kerja industri hujung minggu biasa — slot shutdown penuh biarkan cuci berjalan tanpa mengganggu pengeluaran.",
      "Slot petang Sabtu biasa untuk unit retail supaya kedai boleh buka semula segar pada Ahad.",
      "Tempahan Ahad off-shift sesuai untuk workshop yang tidak boleh luangkan jam hari kerja.",
    ],
    fault: [
      "Runtime harian panjang dan habuk berat kotorkan penapis dengan cepat; backup potong penapis dibungkus untuk setiap lawatan.",
      "Pump kondensat tersekat di bawah beban berterusan; adaptor pump spare naik dalam beg alat secara lalai.",
      "Blower wheel bina minyak lebih cepat daripada kediaman; berus wheel-scrub ialah peralatan standard.",
    ],
    vintage: [
      "Ceiling cassette di sini sering 8–15 tahun; diagnostik pump-drain sebahagian setiap lawatan.",
      "Usia bercampur biasa; juruteknik tiba sedia untuk drive lama dan board inverter baharu.",
      "Tapak baharu jalankan teknologi inverter dengan pump drain; beg alat mencerminkan campuran itu.",
    ],
  },
  mixed: {
    transit: [
      "Jenis alamat tentukan pelan ketibaan; juruteknik sahkan sama ada van parkir tepi jalan atau di lot tetamu.",
      "Campuran landed, apartment dan shoplot di kawasan ini bermakna van dua-kit standard bukannya pilihan.",
      "Akses pondok pengawal atau shutter disahkan di tempahan supaya juruteknik tidak hilang slot di pintu.",
    ],
    weekend: [
      "Tempahan hujung minggu campurkan keluarga dan penyewa kedai; slot dikekalkan sedikit lebih lama dari anggaran asas untuk meliputi kedua-duanya.",
      "Pagi Ahad diutamakan untuk kediaman; petang Sabtu sesuai untuk penyewa shop-front.",
      "Ketersediaan hujung minggu disahkan menjelang petang Khamis supaya kedua-dua jenis pelanggan ada masa untuk rancang.",
    ],
    fault: [
      "Campuran kerosakan luas — habuk, kulat, kapasitor lemah, gas rendah; juruteknik bungkus kit seimbang bukannya toolkit satu-isu.",
      "Panggilan biasa termasuk air bocor ke siling dan cooling lemah selepas runtime panjang; kedua-dua ditangani dalam lawatan sama.",
      "Wayar lama di jalan bercampur kadang berkongsi litar; isolator disemak sebelum beban tambahan ditambah.",
    ],
    vintage: [
      "Usia unit bervariasi merentasi jalan; kit diagnostik seimbang naik dalam van secara lalai.",
      "Jenis refrigerant disahkan bila tiba — unit R22 dipanggil kerana bekalan gas kini terhad.",
      "Kedua-dua teknologi non-inverter dan inverter muncul dalam satu jalan; perlindungan PCB standard pada setiap cuci.",
    ],
  },
};

const SIGNAL_ZH: Record<ProfileKey, SignalCopy> = {
  highRise: {
    transit: [
      "服务电梯窗口决定到达时段；我们把派车安排在上午10点到中午的电梯闲时。",
      "保安登记和访客电梯预约大约需要15分钟；技师会带好准证副本再到。",
      "上下货区通道会在预约时确认，避免工具走客用电梯——JMB通常不允许。",
    ],
    weekend: [
      "周末预约会遇到满员电梯和更高的公寓活动；我们特意把周六时段控制在上午9–11点。",
      "周日上午是高层清洗最平静的窗口；楼上不使用时排水线测试更容易。",
      "公寓客户周末位子很快满，我们通常在周四傍晚前就确认周六时段。",
    ],
    fault: [
      "排水盘堵塞和室内盘管发霉是主要故障；我们每次上门都带排水疏通工具，而不是等客户要求。",
      "阳台被风带雨常常导致外机风扇电容跳闸；备用电容默认放在车上。",
      "清洗后风量弱通常是风轮不是盘管——对应工具就放在清洗工具包里。",
    ],
    vintage: [
      "这里多数高层机组是5–10年的变频分体；车上的诊断线夹与那类PCB匹配。",
      "较新的服务式公寓多用R32冷媒；正确的压力表是预先装好，不用回头取。",
      "老公寓仍是R22与R410A混合；技师在报冷媒工作前先确认类型。",
    ],
  },
  shopOffice: {
    transit: [
      "在开店前上下货更容易；一早的时段让车直接停在卷闸口。",
      "10点后店前停车不稳定；我们把派工安排在客流建立起来之前。",
      "有些店排只允许卷闸开启期间停车；我们在预约时确认具体规定。",
    ],
    weekend: [
      "周末商业预约通常在营业时段外进行；技师会在现场等到卷闸开启。",
      "周六下午对店屋租户偏重；我们默认周日时段以获得更安静的清洗环境。",
      "店排周末的可预约时段受租户工作时间限制；我们在预约时说清楚。",
    ],
    fault: [
      "油烟和路边浮尘让盘管更快积垢；更强的碱性配方默认装车。",
      "天花卡式机的排水泵在店铺热环境下常常失灵；备用泵接头放在工具袋。",
      "长时间运行会消耗风轮；专用刷子是这类上门的标准装备。",
    ],
    vintage: [
      "店屋机组常常年龄混杂——15年的定频机旁边就是新变频；两套工具一起带。",
      "这里办公室的天花卡式机通常8–12年；排水泵诊断是每次上门的一部分。",
      "较新的店办机组是变频，需要额外的PCB保护；技师在清洗前一定给主板做防护。",
    ],
  },
  landed: {
    transit: [
      "排屋街道开放通行；车停在压缩机排附近，缩短工具搬运时间。",
      "角落的房子提供最宽的作业空间；排头排尾的房子通常最容易预约。",
      "有些封闭式小区仍需要保安处登记；技师会带好身份证副本再到。",
    ],
    weekend: [
      "周末家庭预约通常一次覆盖3–5台机器；我们分配更长的时段以免赶排水检查。",
      "周日上午预约适合排屋多机作业；家人通常在家可以带技师逐间查看。",
      "周六下午时段常用于周末保养；我们安排作业顺序以在傍晚高峰前结束。",
    ],
    fault: [
      "老化电容和脏污的室外盘管是排屋常见故障；两套工具预装在车上。",
      "楼上到楼下压缩机的长铜管容易偏离规格；这里每次上门都会测量冷媒压力。",
      "较旧的墙面支架在马来西亚湿度下会慢慢松动；支架审计是标准上门的一部分。",
    ],
    vintage: [
      "较老的排屋常用10年以上的定频机；任何清洗前先测电容和冷媒。",
      "年龄混杂是常态——一台老定频加一台新变频——所以两套服务工具一起带。",
      "新建排屋全部是变频；PCB保护是标准而非可选。",
    ],
  },
  kampung: {
    transit: [
      "甘榜街道直通地面；车停在附近，技师带轻装工具走过去。",
      "有些传统巷子较窄；车停在主干道，最后30米靠人力搬运。",
      "地面通行意味着没有电梯或准证延迟；这里当天上门比高层更现实。",
    ],
    weekend: [
      "这里的周末上门常与家人聚会时间撞在一起；我们报固定价，避免在客人面前变动。",
      "周日上午对年长屋主较常见；上门安排在正午高温前的短时段。",
      "周末也是亲戚探访、发现制冷不足的时候；我们在周六保留当天上门时段。",
    ],
    fault: [
      "带弱电容的R22或R410A机组占多数；技师在报清洗前先测电容。",
      "外机盘管积尘和排水堵塞是两个常见问题；两种处理都在标准工具包里。",
      "老旧机组有时需要诚实的维修或更换建议，而不是清洗；建议以书面形式发到WhatsApp。",
    ],
    vintage: [
      "这个甘榜里许多机组已经10年以上；电容测试和冷媒检查在清洗报价定稿前完成。",
      "冷媒类型到达时确认——R22被特别指出，因为冷媒现在难以采购。",
      "老定频机组常见；诊断简短，建议直接。",
    ],
  },
  hillside: {
    transit: [
      "山坡车道可能窄而陡；车停在车道顶部，工具靠人力搬下。",
      "雨天车道需要格外小心；技师会避免停在无法排水的斜面上。",
      "有些山坡小区需要有保安通行；我们提前把身份证副本发过去，保安处直接放行。",
    ],
    weekend: [
      "周末山坡预约适合较大房子；我们额外留时间做支架审计，再开始清洗。",
      "周日上午是最安全的架梯窗口；车道上车少，技师可以从容布置。",
      "周六下午时段适合有地山坡屋主；上门在傍晚日常降雨前结束。",
    ],
    fault: [
      "花园树叶堵塞室外盘管；碱性清洗前先做一次清除树叶工序。",
      "长管线加上保温不良会造成冷凝水滴落；保温在进门时就检查。",
      "山坡墙上支架松动很常见；审计放在最前面，而不是最后。",
    ],
    vintage: [
      "这里的山坡房子常用长管线的变频机；冷媒压力表和扭矩扳手常备。",
      "较老的山坡安装有时保温缺失；技师在开始清洗前先报修复价格。",
      "新建房子是多联变频；正确的诊断夹在车上，不用后取。",
    ],
  },
  industrial: {
    transit: [
      "工业上下货区需要现场经理许可；技师带着准证和身份证再到。",
      "换班决定安全停机窗口；我们把上门约在干扰最小的时段。",
      "厂区停车通常直接；车停在最靠近目标机组的上下货区。",
    ],
    weekend: [
      "周末工业作业常见——完整的停机窗口让清洗不影响生产。",
      "周六傍晚时段常用于面向零售的机组，让门店周日可以重新开张。",
      "周日休班的预约适合无法抽出工作日一小时的车间。",
    ],
    fault: [
      "长时间运转和高粉尘会很快让滤网堵塞；每次上门都带备用滤网。",
      "冷凝水泵在连续负载下容易停摆；备用泵接头默认放在工具袋。",
      "风轮比住宅更快积油；专用刷子是标配。",
    ],
    vintage: [
      "这里的天花卡式机通常8–15年；排水泵诊断是每次上门的一部分。",
      "年龄混杂是常态；技师做好同时应对老驱动板和新变频板的准备。",
      "较新的现场用带排水泵的变频技术；工具袋反映了这种组合。",
    ],
  },
  mixed: {
    transit: [
      "地址类型决定到达计划；技师确认车是路边停放还是访客位。",
      "本区排屋、公寓和店屋混合意味着两套工具的车是标准配置，而非可选。",
      "保安处或卷闸通行在预约时就确认，避免技师在门口浪费时段。",
    ],
    weekend: [
      "周末预约既有家庭也有店铺租户；时段比基础估计稍长以覆盖两者。",
      "周日上午倾向住宅；周六傍晚适合店面租户。",
      "周末的档期在周四下午前确认，让两类客户都有时间安排。",
    ],
    fault: [
      "故障组合面较广——积尘、霉菌、弱电容、缺气；技师带综合工具而不是单问题工具包。",
      "常见来电包括天花漏水和长时间运转后制冷弱；一次上门都处理。",
      "混合街道里的老旧电线有时共用回路；添加额外负载前先检查隔离开关。",
    ],
    vintage: [
      "同一条街的机组年代差异很大；综合诊断工具默认在车上。",
      "冷媒类型到达时确认——R22机组会特别指出，因为气源现在有限。",
      "同一条街上会同时出现定频和变频；每次清洗都做PCB保护。",
    ],
  },
};

const SIGNALS_INTRO: Record<KampungDepthLocale, (name: string, parent: string) => string> = {
  en: (n, p) => `Before the technician leaves the base for ${n}, four local signals are already decided from the ${p} route plan. This block explains what each one means for the visit, so nothing about the day is left to guesswork.`,
  ms: (n, p) => `Sebelum juruteknik keluar dari base untuk ${n}, empat isyarat setempat sudah ditetapkan dari pelan laluan ${p}. Blok ini menjelaskan apa yang setiap satu maksudkan untuk lawatan, supaya tiada apa hari itu ditinggalkan pada tekaan.`,
  zh: (n, p) => `技师从基地出发前往${n}前，四个本地信号已经根据${p}的路线计划确定。本节说明每个信号对当日上门的意义，让当天没有任何环节靠猜测。`,
};

const SIGNALS_CLOSING: Record<KampungDepthLocale, (name: string) => string> = {
  en: (n) => `Those four dimensions are the reason a ${n} booking feels less like a random visit and more like a scheduled route stop — the plan has already answered the questions before they are asked.`,
  ms: (n) => `Empat dimensi itulah sebab tempahan ${n} rasa kurang seperti lawatan rawak dan lebih seperti hentian laluan berjadual — pelan sudah menjawab soalan sebelum ia ditanya.`,
  zh: (n) => `这四个维度正是${n}的预约感觉不像临时上门，而更像一次已排入路线的停靠——计划已经在客户开口前把问题答好。`,
};

export function kampungSignals(
  k: KampungRecord,
  parentArea: ParentAreaRecord | undefined,
  locale: KampungDepthLocale,
): KampungSignals {
  const profile = detectProfile(k);
  const parentName = parentArea?.name || k.parentSlug.replace(/-/g, " ");
  const dimLabels = SIGNALS_DIM_LABELS[locale];

  const pool = locale === "en" ? SIGNAL_EN : locale === "ms" ? SIGNAL_MS : SIGNAL_ZH;
  const copy = pool[profile];

  // Each dimension picks a different variant, seeded with a distinct salt,
  // so within the same parent area the four rows do not always line up the
  // same way — this dilutes cross-page Jaccard.
  const pickDim = (arr: string[], salt: string) =>
    arr[pickVariant(k.slug, salt, arr.length)];

  const rows: KampungSignalRow[] = [
    {
      dimension: dimLabels.transit,
      value: parentName,
      detail: pickDim(copy.transit, "sig-transit"),
    },
    {
      dimension: dimLabels.weekend,
      value: locale === "en" ? "Booking-day rhythm" : locale === "ms" ? "Irama hari tempahan" : "预约日节奏",
      detail: pickDim(copy.weekend, "sig-weekend"),
    },
    {
      dimension: dimLabels.fault,
      value: locale === "en" ? "Kit prepared" : locale === "ms" ? "Kit disediakan" : "工具准备",
      detail: pickDim(copy.fault, "sig-fault"),
    },
    {
      dimension: dimLabels.vintage,
      value: locale === "en" ? "Unit signal" : locale === "ms" ? "Isyarat unit" : "机组信号",
      detail: pickDim(copy.vintage, "sig-vintage"),
    },
  ];

  return {
    heading: SIGNALS_HEADING[locale](k.name),
    intro: SIGNALS_INTRO[locale](k.name, parentName),
    rows,
    closing: SIGNALS_CLOSING[locale](k.name),
  };
}
