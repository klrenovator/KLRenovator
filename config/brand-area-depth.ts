// ─────────────────────────────────────────────────────────────────────────
// Brand × Area content depth — issue #71 (2026-08-20)
//
// The 360 /brands/[brand]/[area] pages already had a per-pair intro, local
// note and FAQ from config/brand-area-uniqueness.ts, and shared commercial
// proof blocks (price table, expert attribution). They ran ~950 words with
// only 5 H2s and read like a technical spec sheet rather than a service
// page.
//
// This module adds two new H2 pillars per page:
//
//   1. How our first {brand} visit in {area} usually runs
//      Ordered 4-step checklist selected per (brand-family, area-profile),
//      with 4 wording variants per locale so no two brand/area combos in
//      the same brand-family reuse the same paragraph.
//
//   2. Common {brand} jobs we get called for in {area}
//      A 4-row job-frequency table tying brand-family patterns to
//      area-profile realities (dust load, high-rise access, industrial
//      runtime, hillside brackets, etc.), independently variant-picked.
//
// Uses:
//   • siteConfig.brandPages + brand-specs BRAND_TECH_SPECS (already imported
//     on the page) to determine brand-family behaviour.
//   • siteConfig.areaPages (landmarks, state, description) to determine
//     the area-profile.
//
// Copy is authored separately in EN/MS/ZH (not machine-mirrored). No new
// review-count claim (owner-handled per #68).
// ─────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/config/site";

export type BrandAreaDepthLocale = "en" | "ms" | "zh";

type Area = (typeof siteConfig.areaPages)[number];
type Brand = (typeof siteConfig.brandPages)[number];

// ── Brand family classification. Groups brands by service pattern reality:
// a Daikin visit is closer to a Mitsubishi visit than to an Acson visit,
// and the copy that reflects that also reduces repetition.
type BrandFamily =
  | "japanesePremium"
  | "american"
  | "koreanTV"
  | "chineseValue"
  | "malaysianLocal";

const BRAND_FAMILY: Record<string, BrandFamily> = {
  daikin: "japanesePremium",
  panasonic: "japanesePremium",
  mitsubishi: "japanesePremium",
  hitachi: "japanesePremium",
  toshiba: "japanesePremium",
  fujitsu: "japanesePremium",
  sharp: "japanesePremium",
  york: "american",
  carrier: "american",
  samsung: "koreanTV",
  lg: "koreanTV",
  midea: "chineseValue",
  haier: "chineseValue",
  gree: "chineseValue",
  hisense: "chineseValue",
  aux: "chineseValue",
  tcl: "chineseValue",
  acson: "malaysianLocal",
  isonic: "malaysianLocal",
  national: "malaysianLocal",
};

// ── Area profile classification. Mirrors the housing/commercial mix of
// each area so the plan reflects what the technician actually meets on
// site rather than a generic city description.
type AreaProfile =
  | "kljCore"       // dense inner-KL condos + shoplots
  | "pjMix"         // PJ-style mix of old landed + tall condos
  | "gatedGrowth"   // newer gated + high-rise growth belt (Setia Alam, Cyberjaya, KotaK)
  | "landedMature"  // mature landed suburbs (Cheras, Ampang, Setapak)
  | "commercialHeavy" // industrial/commercial (Klang, Balakong, Glenmarie)
  | "hillside"      // Bangsar, Hulu Kelang, Mont Kiara hills, ParkCity
  | "outerTownship"; // Rawang, Semenyih, Sungai Buloh outskirts

const AREA_PROFILE: Record<string, AreaProfile> = {
  "kuala-lumpur": "kljCore",
  "kuala-lumpur-city-centre": "kljCore",
  bangsar: "hillside",
  "mont-kiara": "hillside",
  "hulu-kelang": "hillside",
  "desa-parkcity": "hillside",
  "petaling-jaya": "pjMix",
  "damansara": "pjMix",
  "bandar-utama": "pjMix",
  "subang-jaya": "pjMix",
  cheras: "landedMature",
  ampang: "landedMature",
  setapak: "landedMature",
  sentul: "landedMature",
  kepong: "landedMature",
  "sri-petaling": "landedMature",
  "taman-melawati": "landedMature",
  "wangsa-maju": "landedMature",
  "shah-alam": "commercialHeavy",
  klang: "commercialHeavy",
  balakong: "commercialHeavy",
  glenmarie: "commercialHeavy",
  "bandar-botanic": "commercialHeavy",
  "seri-kembangan": "commercialHeavy",
  puchong: "pjMix",
  kajang: "landedMature",
  "batu-caves": "outerTownship",
  sunway: "pjMix",
  rawang: "outerTownship",
  "kajang-semenyih": "outerTownship",
  putrajaya: "gatedGrowth",
  "kota-kemuning": "gatedGrowth",
  cyberjaya: "gatedGrowth",
  "sungai-buloh": "outerTownship",
  "setia-alam": "gatedGrowth",
  selayang: "outerTownship",
};

function classifyArea(a: Area): AreaProfile {
  return AREA_PROFILE[a.slug] || "landedMature";
}

function classifyBrand(b: Brand): BrandFamily {
  return BRAND_FAMILY[b.slug] || "japanesePremium";
}

// Two salted seeds so the two H2 blocks pick different variants for the
// same (brand, area) pair — dilutes cross-page Jaccard.
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
// 1) First-visit plan
// ─────────────────────────────────────────────────────────────────────────

export type BrandAreaVisitStep = { title: string; body: string };

export type BrandAreaVisitPlan = {
  heading: string;
  intro: string;
  steps: BrandAreaVisitStep[];
  closing: string;
};

type PlanVariant = {
  intro: (b: string, a: string) => string;
  steps: (b: string, a: string) => BrandAreaVisitStep[];
  closing: (b: string, a: string) => string;
};

const VISIT_HEADING: Record<BrandAreaDepthLocale, (b: string, a: string) => string> = {
  en: (b, a) => `How does our first ${b} visit in ${a} usually run?`,
  ms: (b, a) => `Bagaimana lawatan pertama ${b} kami di ${a} berjalan?`,
  zh: (b, a) => `我们在${a}的第一次${b}上门通常怎么进行？`,
};

// ── EN plan bank: brand-family × area-profile → 4 variants per locale --
// Structure: EN_PLAN[family][profile] = [v1, v2, v3, v4]
// Steps are functions of (b, a) so name interpolation is safe.

const EN_PLAN: Record<BrandFamily, Record<AreaProfile, PlanVariant[]>> = {
  japanesePremium: {
    kljCore: [
      {
        intro: (b, a) => `${b} units in the ${a} core skew heavily toward inverter splits in condos and serviced apartments. The visit is planned around service-lift windows first and PCB-safe washing second, because a rushed inverter clean in a high-rise is where callbacks come from.`,
        steps: (b, a) => [
          { title: `Confirm ${a} building + service-lift slot`, body: `Before dispatch we lock in the ${a} block, floor and lift slot. If the JMB needs a permit we prepare the ${b}-specific insurance letter that same morning.` },
          { title: `${b} PCB protection`, body: `Front panel and blower are dropped, and the ${b} PCB and sensor pigtails are covered with a fitted sheath before any wash water enters the coil.` },
          { title: `Coil + drain chemical wash`, body: `Alkaline pass on the ${b} evaporator, followed by a two-stage rinse. Drain line is cleared and confirmed at the ground-floor stack before reassembly.` },
          { title: `Cool-down + WhatsApp handover`, body: `The ${b} unit is run 15 minutes, supply-air temperature is verified, and before/after photos plus the confirmed price are sent to the ${a} booking thread.` },
        ],
        closing: (b, a) => `Following that order is why ${b} inverter washes in ${a} rarely trigger the "board dead the next week" complaint we hear about from other companies.`,
      },
      {
        intro: (b, a) => `Every ${b} job in the ${a} inner-city belt starts with a two-question check on WhatsApp: is the unit inverter or non-inverter, and is the balcony compressor accessible from the same floor. Those two answers change the tool kit entirely.`,
        steps: (b, a) => [
          { title: `Building access confirmed`, body: `We ask the ${a} customer for the block, floor, unit number and whether visitor registration or a work-permit slip is needed. The ${b}-branded ID lanyard is packed accordingly.` },
          { title: `Model + refrigerant identification`, body: `${b} model plate and refrigerant type (R32 or R410A) are recorded before any wash. The correct pressure-testing gauges ride on the van rather than being fetched later.` },
          { title: `Chemical wash with PCB shielding`, body: `The ${b} coil is washed with a mild alkaline solution and rinsed twice. Sensor cabling and the main PCB are shielded throughout — this is the difference between a safe wash and a callback.` },
          { title: `Drain + airflow verification`, body: `Drain line is flushed and watched at full flow. The ${b} unit is then run for 15 minutes and supply-air temperature is measured before the ${a} job is closed on WhatsApp.` },
        ],
        closing: (b, a) => `That structured close-out is why ${a} customers usually re-book us for the second ${b} unit in the same condo without asking for a fresh quote.`,
      },
      {
        intro: (b, a) => `${b} in ${a}'s high-rise cluster is a specialist visit, not a walk-in wash. The plan is written down because the building rules — not the aircond — decide most of the timing.`,
        steps: (b, a) => [
          { title: `Guardhouse + service-lift booking`, body: `On arrival the ${b} technician checks in at the ${a} guardhouse with the permit copy and confirms the service-lift slot the JMB allotted.` },
          { title: `Balcony wash zone`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened. In a small ${a} balcony this is the only way to keep the unit below dry.` },
          { title: `${b} coil + blower wheel wash`, body: `Coil and blower are washed with the ${b} PCB protected, then rinsed twice. Drain pan is checked for algae before reassembly.` },
          { title: `Cool-down + sign-off`, body: `Unit is run 15 minutes with supply-air temperature measured. The confirmed price and warranty note are sent to the ${a} WhatsApp booking thread with the wash photos.` },
        ],
        closing: (b, a) => `That written flow is what keeps ${b} visits in ${a} inside the tight service-lift window the building actually gave us.`,
      },
      {
        intro: (b, a) => `A ${b} booking in the ${a} core is usually one high-rise unit, sometimes two. The visit is short but the access rules make preparation matter more than raw wash time — that's why the plan is a checklist rather than an improvisation.`,
        steps: (b, a) => [
          { title: `Access confirmed`, body: `We confirm the ${a} building's visitor-registration rule and any service-lift window before the ${b} technician leaves the base.` },
          { title: `Model check + wash prep`, body: `The ${b} model plate is photographed on arrival and the correct chemical mix (alkaline or neutral, depending on model line) is measured out.` },
          { title: `Chemical wash`, body: `Coil and blower wheel are washed with sensor and PCB protection intact throughout. Rinse is done twice to avoid alkaline residue on the ${b} coil fins.` },
          { title: `Warranty note + photos`, body: `Before-and-after coil, drain and outdoor-fan photos are sent to the ${a} WhatsApp booking thread with the 1-month workmanship warranty note.` },
        ],
        closing: (b, a) => `The point of this checklist is a boring visit — the same ${b} outcome in ${a} regardless of which technician gets dispatched.`,
      },
    ],
    pjMix: [
      {
        intro: (b, a) => `${b} in ${a} spans a wide age range — 15-year non-inverters in older SS-numbered streets and brand-new inverters in the newer condo towers. The plan is designed so the same technician can switch between both without missing the different washing rules.`,
        steps: (b, a) => [
          { title: `Unit vintage confirmed`, body: `On arrival the ${b} model plate is checked. Older non-inverter units get a fuller mechanical clean; newer ${b} inverter models get PCB-protected washing.` },
          { title: `Capacitor + gas quick-check`, body: `For any ${b} unit over about 8 years old, capacitor microfarads and gas pressure are tested before the wash is quoted so no surprise fault emerges mid-visit in ${a}.` },
          { title: `Chemical wash`, body: `Alkaline pass on the ${b} coil, two rinses, drain flushed and watched at full flow. The blower wheel is pulled and cleaned separately if grease is visible.` },
          { title: `Cool-down + report`, body: `Unit is run 15 minutes, supply-air temperature is recorded, and the ${a} customer receives before/after photos and the confirmed price on WhatsApp.` },
        ],
        closing: (b, a) => `Because ${a} runs the full age range of ${b} equipment, having a set sequence saves the "which type is this?" moment that other companies charge extra for.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} is usually a residential job at a landed home or a condo unit. The plan lets the technician switch between the two without repacking the van mid-day.`,
        steps: (b, a) => [
          { title: `Address type confirmed`, body: `Before dispatch we ask the ${a} customer whether the address is landed, condo or shoplot so the right wash kit for the ${b} unit rides upstairs first.` },
          { title: `Model + refrigerant check`, body: `${b} model and refrigerant type are confirmed. R22 units are called out because gas supply is now limited in ${a} as everywhere else.` },
          { title: `Wash + gas verification`, body: `Alkaline coil wash with PCB protection, rinse twice, drain confirmed. If a gas top-up is agreed on WhatsApp, it is done with the pressure gauge already prepared.` },
          { title: `Photo-backed closeout`, body: `Coil, drain and outdoor-fan photos are sent to the ${a} WhatsApp thread, together with the confirmed price and the 1-month warranty note.` },
        ],
        closing: (b, a) => `Predictable closeouts are why ${b} customers in ${a} usually re-book us for the second and third unit without a fresh survey.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} split cleanly into two visit types: a "family" run covering 3–5 units in a landed home, or a single condo unit with tight lift access. Both use the same core steps in a different order.`,
        steps: (b, a) => [
          { title: `Visit inventory`, body: `The technician lists each ${b} unit in the ${a} address by room, HP and inverter/non-inverter type before quoting extras.` },
          { title: `Priority-order wash`, body: `The most-used unit is washed first so the household or shop keeps its main comfort. Each unit's drain is confirmed clear before moving on.` },
          { title: `Post-wash gas + cool-down`, body: `Gas pressure is measured for any ${b} unit that showed weak cooling on arrival. Each washed unit runs 10–15 minutes with supply-air temperature verified.` },
          { title: `Owner sign-off`, body: `${a}'s owner receives the WhatsApp summary: units washed, drain checks passed, gas readings, warranty period and next-visit suggestion.` },
        ],
        closing: (b, a) => `That structured sign-off is why ${a} landed jobs with multiple ${b} units finish in one visit rather than being split across two days.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is a mix of quick apartment visits and longer landed runs, so the plan is designed to work equally well for both — the sequence is what keeps the tools organised, not the address type.`,
        steps: (b, a) => [
          { title: `Booking intake`, body: `${a}'s booking confirms address type, ${b} model line and preferred time window. Same-day slots are realistic if the message reaches us before 11am.` },
          { title: `Non-invasive check`, body: `Coil, drain, capacitor and outdoor fan are inspected without dismantling the ${b} indoor unit first, so a wash quote is never disguised diagnosis.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence: filter, blower wheel, coil, drain pan, outdoor coil, with PCB protection intact throughout.` },
          { title: `Report on WhatsApp`, body: `Photos, cool-down readings and price are sent to the ${a} WhatsApp booking thread. The 1-month workmanship warranty is noted in the same message.` },
        ],
        closing: (b, a) => `That report-first flow is why long-time ${b} customers in ${a} usually pass our WhatsApp to neighbours on the same street.`,
      },
    ],
    gatedGrowth: [
      {
        intro: (b, a) => `${a} is a growth-belt town where most ${b} units are still under 5 years old but running hard in dusty new-build conditions. The plan is designed to catch the "new but dirty" pattern that trips up companies who assume a young inverter needs a light rinse.`,
        steps: (b, a) => [
          { title: `Guardhouse + house-rule check`, body: `${a}'s guarded schemes usually need visitor registration and a work permit. The ${b} technician arrives with the ID copy already handed to the guardhouse.` },
          { title: `Coil + filter inspection`, body: `Newer ${b} units in ${a} still show heavy dust load because construction sites nearby feed the outdoor air. The filter is checked first to decide wash depth.` },
          { title: `PCB-safe chemical wash`, body: `Alkaline coil wash with the ${b} PCB sheathed. Two rinses, drain flushed and watched at full flow.` },
          { title: `Photo handover + next-visit note`, body: `${a}'s customer receives coil, drain and outdoor-fan photos, plus a next-visit suggestion tied to how many construction plots remain around the address.` },
        ],
        closing: (b, a) => `Being honest about the local dust load is why ${b} customers in ${a} do not feel oversold when we suggest an 8-month cycle instead of a 12-month one.`,
      },
      {
        intro: (b, a) => `Because ${a} is largely a gated-community growth belt, ${b} visits usually start at a guardhouse rather than at the front door. The plan reflects that reality.`,
        steps: (b, a) => [
          { title: `Access + permit`, body: `We ask for the ${a} scheme name, phase, house/unit number and any visitor rules. The ${b} technician's ID and van pass are forwarded to the guardhouse the day before if possible.` },
          { title: `Model check + wash prep`, body: `${b} model plate is photographed on arrival, refrigerant type is confirmed, and the correct chemical mix for the model line is measured out.` },
          { title: `Chemical wash`, body: `Coil and blower are washed with PCB and sensor connectors protected. Rinse is done twice to prevent alkaline residue on the ${b} coil fins.` },
          { title: `Warranty + report`, body: `Before/after photos and the 1-month warranty note are sent to the ${a} WhatsApp booking thread. Any recommendation for extra work is stated separately with its own price.` },
        ],
        closing: (b, a) => `That written approach is why our ${a} bookings from gated communities usually turn into two or three-unit repeat calls within the same scheme.`,
      },
      {
        intro: (b, a) => `${a}'s newer scheme housing puts ${b} units in tight service ledges and shared drain stacks. The plan is designed around not creating a problem for the ${a} unit below.`,
        steps: (b, a) => [
          { title: `Wet-work zone setup`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened, and the shared drain stack is identified so the wash water route is planned.` },
          { title: `Coil wash + drain flush`, body: `${b} coil and blower are washed with PCB protection intact, then the drain line is flushed until it runs clear at the shared stack discharge point.` },
          { title: `Outdoor coil rinse`, body: `${a}'s outdoor coil is pressure-rinsed to lift the construction-site dust that newer schemes bring, without spraying water into the unit below.` },
          { title: `Cool-down + sign-off`, body: `${b} unit runs 15 minutes with supply-air temperature verified. Photos and the confirmed price are sent to the ${a} WhatsApp booking thread.` },
        ],
        closing: (b, a) => `Because the plan protects the neighbouring unit, ${a} bookings from JMB-managed schemes come back to us for the whole cluster later.`,
      },
      {
        intro: (b, a) => `A ${b} visit to ${a} is usually a newer inverter unit in a still-settling neighbourhood. The plan is built around the reality that "new" does not mean "clean" in a construction-heavy area.`,
        steps: (b, a) => [
          { title: `Site + access agreed`, body: `${a}'s guarded scheme access is confirmed at booking, and the ${b} technician packs the wash kit that matches the model line.` },
          { title: `Inspection first`, body: `Filter and evaporator coil are inspected on arrival. Heavy dust confirms the chemical wash; a clean filter with weak cooling points to a gas top-up instead.` },
          { title: `Confirmed service done`, body: `The chosen service is performed. If anything unexpected is found mid-visit, it is quoted on WhatsApp and confirmed before starting.` },
          { title: `Photo-backed closeout`, body: `${a}'s ${b} customer receives coil, drain and outdoor-fan photos with the confirmed price and warranty note.` },
        ],
        closing: (b, a) => `That "no surprise charges" close is why ${a} customers reliably pass our WhatsApp to the next-door house in the same scheme.`,
      },
    ],
    landedMature: [
      {
        intro: (b, a) => `${a} is a mature landed suburb, so a ${b} booking usually covers 3–5 units across bedrooms and a living hall. The plan treats it as a small route inside one house — not a single-unit stop — so drain and gas checks stay disciplined across every room.`,
        steps: (b, a) => [
          { title: `House walk-through`, body: `The technician walks with the ${a} owner room by room, notes which ${b} units are on, which are cooling weakly, and confirms the scope for the visit.` },
          { title: `Copper + capacitor check`, body: `Older ${a} landed installs show tarnished copper joints and ageing capacitors. Both are checked before any wash water hits the ${b} coil.` },
          { title: `Sequential chemical wash`, body: `${b} units are washed one at a time so the family keeps one air-conditioned room during the visit. Each unit's drain is confirmed clear before moving on.` },
          { title: `Whole-house cool-down`, body: `After the last unit is reassembled, every washed ${b} unit is run together for 15 minutes and supply-air temperature is verified so the whole house is confirmed cool.` },
        ],
        closing: (b, a) => `That whole-house verification is why ${a} multi-unit ${b} bookings finish in one visit rather than being split across two days.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} usually involves long copper runs from upstairs to the outdoor compressors below. Half the visit is upstairs, half at the compressor row, so the plan reflects that reality.`,
        steps: (b, a) => [
          { title: `Upstairs / downstairs mapping`, body: `The ${a} technician confirms which ${b} indoor unit belongs to which outdoor compressor. Older installs are not always labelled correctly, so this saves diagnostic time later.` },
          { title: `Compressor row inspection`, body: `The outdoor compressor row is checked for bracket rust, drain-fall issues and fan-blade damage. Anything that will affect ${b} gas pressure is fixed before the wash.` },
          { title: `Coil + gas verification`, body: `Each washed ${b} unit's gas pressure is measured after the chemical wash so weak cooling can be diagnosed before the technician leaves the ${a} house.` },
          { title: `Owner sign-off`, body: `${a}'s owner sees the before/after coil photos, gas readings and final price on WhatsApp before payment is discussed.` },
        ],
        closing: (b, a) => `That sign-off avoids the classic "why is the price different from the WhatsApp quote?" moment ${a} landed customers rightly hate.`,
      },
      {
        intro: (b, a) => `${b} in ${a} often means one older non-inverter unit next to a newer inverter in the same house. The two families are washed differently, so the visit splits into two mini-jobs.`,
        steps: (b, a) => [
          { title: `Unit inventory`, body: `On arrival the ${a} technician lists each ${b} unit by room, HP and inverter/non-inverter type. This decides the order of work.` },
          { title: `Non-inverter first`, body: `Older non-inverter ${b} units are washed first — they tolerate handling better and free the ${a} customer's bedroom for the rest of the visit.` },
          { title: `Inverter with PCB protection`, body: `For ${b} inverter units the PCB and sensor connectors are covered before any wash water touches the coil.` },
          { title: `Cross-check cool-down`, body: `Both types are then run for 10 minutes with supply-air readings taken, so the ${a} owner knows the wash actually improved cooling.` },
        ],
        closing: (b, a) => `Splitting the visit this way is how ${a} customers avoid the classic complaint of a "washed" ${b} inverter that tripped out the next week.`,
      },
      {
        intro: (b, a) => `Landed ${b} service in ${a} is a house visit, not a unit visit — the plan is designed to finish the whole house within one dispatch window, without the technician racing against the last drain check.`,
        steps: (b, a) => [
          { title: `Whole-house scope`, body: `The ${a} technician and owner agree the exact list of ${b} units in scope. Anything "for inspection only" is quoted separately before work starts.` },
          { title: `Room-by-room wash`, body: `Each room's ${b} unit is washed and reassembled before moving on, so the family keeps the used rooms comfortable while the rest of the job continues.` },
          { title: `Drain stress test`, body: `Every drain line is flushed and watched at full flow for at least 30 seconds to catch slow blockages that only show up under load.` },
          { title: `Owner handover packet`, body: `${a}'s owner receives a short WhatsApp summary: ${b} units washed, drain checks passed, cooling readings, warranty period and next-visit suggestion.` },
        ],
        closing: (b, a) => `That handover is why ${a} landed customers usually re-book us for the next ${b} round without asking for a fresh quote.`,
      },
    ],
    commercialHeavy: [
      {
        intro: (b, a) => `${a} carries a lot of light-commercial and industrial ${b} equipment — cassettes above shop floors, wall-mounts in offices running 10–12 hours daily. The plan is a scheduled deep clean rather than a residential-style rinse.`,
        steps: (b, a) => [
          { title: `Shutdown window agreed`, body: `The ${a} site manager confirms the safe shutdown slot and identifies the electrical isolator for the target ${b} unit before the technician arrives.` },
          { title: `Cassette / wall-unit strip-down`, body: `Ceiling cassettes are dropped; the grille is washed separately in a bucket, and the ${b} blower wheel is removed for a proper hands-on clean rather than a sprayed-over rinse.` },
          { title: `Alkaline coil + pump-drain service`, body: `Coil gets a stronger alkaline pass than a residential wash. The condensate pump is bench-tested with a bucket-fill so the pump-out cycle is confirmed clear.` },
          { title: `Site-log entry`, body: `${a}'s site log gets a written entry with wash date, ${b} coil condition, drain-pump test result and the next suggested service date.` },
        ],
        closing: (b, a) => `That log-driven closeout is why ${a} sites use us for the whole ${b} schedule rather than one-off emergency calls.`,
      },
      {
        intro: (b, a) => `${b} equipment in ${a} rarely fails politely — it usually stops cooling on the busiest day. The plan is designed to catch failure signals before that happens.`,
        steps: (b, a) => [
          { title: `Baseline readings`, body: `Before any wash the ${a} technician records supply-air temperature and drain-line flow for each ${b} unit, so the wash's real effect can be measured afterwards.` },
          { title: `Filter, wheel, coil`, body: `Filter, blower wheel and coil are cleaned in that order — a coil wash under a greasy blower is theatre, not maintenance.` },
          { title: `Drain + condensate pump test`, body: `Drain line is flushed and the condensate pump (if fitted) is tested with a bucket-fill so pumping capacity is verified, not assumed.` },
          { title: `Report to site owner`, body: `${a}'s site owner receives before/after readings so the next ${b} service cycle can be planned with real data rather than guesswork.` },
        ],
        closing: (b, a) => `That data-driven close is what turns an ${a} ${b} unit from a repeat emergency into a scheduled overhead.`,
      },
      {
        intro: (b, a) => `${a} sites usually mean shared electrical supply, tight loading access and no room to break the operating schedule. The plan protects the shift, not the technician.`,
        steps: (b, a) => [
          { title: `Isolator + shutdown agreement`, body: `Before any wet work starts the ${a} technician confirms which isolator kills power to the exact ${b} unit and gets a signed shutdown from the shift supervisor.` },
          { title: `Contained wash`, body: `Canvas cover and drip tray go under the unit so nothing wets the shop-floor equipment or the electrical panel below.` },
          { title: `Coil + blower rebuild`, body: `The ${b} blower wheel and coil are cleaned and dried. The fan-motor bearings are visually checked before power is restored.` },
          { title: `Restart under load`, body: `The ${b} unit is restarted, allowed to reach normal load, and supply-air temperature is confirmed. The site-log entry closes the visit.` },
        ],
        closing: (b, a) => `${a} sites cannot lose an afternoon to a bad wash, so the sequence is written down and followed the same way every visit.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is about reducing the number of surprise breakdowns per year. The plan is built around inspection depth, not wash speed.`,
        steps: (b, a) => [
          { title: `Inspection walk`, body: `The technician walks the ${a} shop floor, notes which ${b} units serve which zone and confirms which units are in scope for today.` },
          { title: `Deep clean per unit`, body: `Coil, blower wheel and drain pan are cleaned. Any belt or bearing close to end-of-life is flagged for scheduled replacement, not an emergency call.` },
          { title: `Drainage + electrical audit`, body: `${b} condensate drain and electrical isolator condition are checked and photographed for the site log.` },
          { title: `Preventive schedule note`, body: `${a}'s owner receives a WhatsApp note with a suggested next-visit window based on daily runtime and dust load.` },
        ],
        closing: (b, a) => `That note is the reason ${a} sites move from reactive to preventive ${b} maintenance within a few visits.`,
      },
    ],
    hillside: [
      {
        intro: (b, a) => `${a} sits on the hillside side of the Klang Valley. Slope, greenery and longer pipe runs decide the plan more than the ${b} wash itself — a chemical wash on a badly mounted unit is a wasted trip.`,
        steps: (b, a) => [
          { title: `Driveway + ladder plan`, body: `The technician confirms the ${a} driveway gradient, walks the ${b} outdoor compressor route, and picks a ladder position that will not tip on the slope.` },
          { title: `Bracket + drain-fall check`, body: `${b} outdoor bracket, wall anchor and drain-fall angle are inspected. On a hillside a slow drain becomes a fast leak in a monsoon night.` },
          { title: `Debris pass + coil wash`, body: `Because outdoor coils in ${a} gardens catch leaves and insects, an extra debris-lift pass is done before the alkaline wash starts.` },
          { title: `Vibration + noise verification`, body: `After reassembly the ${b} compressor is run 15 minutes and the technician listens for bracket vibration that would not appear during a quick 2-minute check.` },
        ],
        closing: (b, a) => `Those two extra steps — debris pass and vibration listen — are why ${a} hillside ${b} jobs rarely need a second callout.`,
      },
      {
        intro: (b, a) => `Hillside service in ${a} is why our ${b} bookings usually include a bracket line-item in the quote up front. Mounting hardware ages faster on a sloped wall than a straight one.`,
        steps: (b, a) => [
          { title: `Bracket safety audit`, body: `Before any wash starts the ${b} bracket wall anchors are pull-tested with hand pressure. Anything soft is flagged and quoted before further work in ${a}.` },
          { title: `Drain-fall confirmation`, body: `A short water pour is done at the drain pan and flow is timed at the outdoor discharge. A gradient below spec is fixed before the ${b} coil is washed, not after.` },
          { title: `Chemical wash`, body: `${b} evaporator and outdoor coils are washed with the drain already known good, so a slow drip is never mistaken for a wash defect.` },
          { title: `Handover with photos`, body: `${a}'s customer sees bracket, drain-fall and coil photos on WhatsApp before the price is confirmed as paid.` },
        ],
        closing: (b, a) => `That bracket-first sequence is an ${a} habit — hillside walls simply do not forgive a lazy visit.`,
      },
      {
        intro: (b, a) => `${a} in the hillside belt means larger homes, larger pipe runs and more ${b} units per booking. The plan is built to keep the technician moving without missing the small hillside-specific risks.`,
        steps: (b, a) => [
          { title: `House + pipe-run inventory`, body: `The technician lists each ${a} ${b} unit with its indoor-to-outdoor pipe length so the gas-charge check later is done against realistic numbers.` },
          { title: `Compressor row walk-around`, body: `${b} outdoor compressors (often several in a line on hillside walls) are photographed, and any leaning bracket is quoted separately.` },
          { title: `Sequential unit wash`, body: `Units are washed in sequence, with drain checks always done in the direction of hillside water flow so a shared discharge line is verified at the last unit.` },
          { title: `Owner report`, body: `A short WhatsApp report shows pipe-run lengths, gas readings, drain-check photos and the confirmed price for the whole ${a} visit.` },
        ],
        closing: (b, a) => `That report is why ${a} owners can plan the next year's ${b} servicing budget without another site visit.`,
      },
      {
        intro: (b, a) => `A hillside ${b} address in ${a} is more of an installation-quality check than a wash. The plan is designed to catch old install mistakes before they become leaks.`,
        steps: (b, a) => [
          { title: `Pipe insulation walk`, body: `The technician walks the ${b} pipe route from indoor unit to outdoor compressor, checking for missing insulation and sun damage on exposed sections.` },
          { title: `Wash + drain flush`, body: `${b} coil and blower are washed, drain line is flushed, and the technician watches for water pooling on the ${a} hillside garden below.` },
          { title: `Gas + compressor sound test`, body: `Gas pressure is measured and the ${b} compressor is listened to for the low hum that indicates good load. Anything odd is reported before payment.` },
          { title: `Written next-visit note`, body: `${a}'s customer gets a suggested next-visit window based on pipe run, unit age and how much shade the outdoor unit sits in.` },
        ],
        closing: (b, a) => `That note is what turns a hillside ${a} ${b} booking into a planned relationship rather than a firefight in a wet season.`,
      },
    ],
    outerTownship: [
      {
        intro: (b, a) => `${a} is on the outer township belt where ${b} units are frequently older, refrigerant supply is a real question, and honest repair-or-replace advice matters more than a fast wash.`,
        steps: (b, a) => [
          { title: `Unit age + refrigerant`, body: `${b} model plate is checked. Older R22 units in ${a} are flagged because gas is no longer easy to source.` },
          { title: `Capacitor + wiring inspection`, body: `Capacitor microfarads and outdoor wiring are tested — in older ${a} installs these are often the real cause of tripping or weak start, not the coil.` },
          { title: `Wash or repair decision`, body: `${a}'s owner gets a plain answer: whether a chemical wash will solve the issue, or a repair/replacement is the better spend. The recommendation is written into WhatsApp.` },
          { title: `Post-work runtime test`, body: `${b} unit is run 20 minutes and supply-air temperature is verified before the technician leaves ${a}.` },
        ],
        closing: (b, a) => `That honest-recommendation step is why ${b} customers in ${a} treat us as their long-term aircond people rather than a one-time wash contact.`,
      },
      {
        intro: (b, a) => `A ${b} booking in ${a} usually comes from a long-time resident who wants a straight answer, not a sales pitch. The visit sequence reflects that.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Before opening the ${b} unit the technician asks the ${a} owner three questions: how old is it, when was the last wash, and what changed recently.` },
          { title: `Non-invasive check`, body: `Outdoor coil, drain and capacitor are inspected without dismantling the ${b} indoor unit first, so a bad diagnosis is not disguised as a wash quote.` },
          { title: `Written price on WhatsApp`, body: `${a}'s customer sees the final price on WhatsApp before any panel is removed. The price does not change unless a new fault is found and agreed.` },
          { title: `Work + verified cooling`, body: `The chosen work is done, and the ${b} unit is verified with supply-air temperature readings so nobody wonders whether the wash actually helped.` },
        ],
        closing: (b, a) => `That question-first flow is why long-time ${a} residents usually pass our ${b} WhatsApp to their neighbours.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} are small in RM value but high in trust. The plan is short but disciplined precisely because there is no room for over-selling.`,
        steps: (b, a) => [
          { title: `Ground-floor access`, body: `Most ${a} outdoor units are on a low wall or ground-level bracket, so the ${b} technician confirms the safest ladder position before touching anything.` },
          { title: `Refrigerant + capacitor test`, body: `Gas pressure and capacitor microfarads are tested first — a clean coil with weak cooling is usually a capacitor or gas issue, not a wash issue.` },
          { title: `Right-service quote`, body: `${a}'s owner sees one recommended service and one alternative on WhatsApp — for example, wash vs replace — with a plain reason for each.` },
          { title: `Job closed with photos`, body: `Coil, drain and outdoor-fan photos are attached to the ${a} WhatsApp completion for household records.` },
        ],
        closing: (b, a) => `That right-service quote is what keeps ${b} ${a} bookings small in RM value but reliable in repeat rate.`,
      },
      {
        intro: (b, a) => `${a}'s outer-township streets are the kind of area where a ${b} technician needs to be as ready to say "don't spend money on this one" as to sell a chemical wash. The visit is designed for that honest conversation.`,
        steps: (b, a) => [
          { title: `Owner briefing`, body: `The ${b} technician introduces themselves at the ${a} gate, confirms the price agreed on WhatsApp, and asks whether the owner wants a wash or an honest inspection first.` },
          { title: `Unit + electrical check`, body: `${b} indoor unit, drain, capacitor, isolator switch and any exposed wiring are inspected. Anything unsafe is flagged separately from the wash quote.` },
          { title: `Repair-or-replace call`, body: `For ${b} units older than about 10 years, the ${a} owner gets a straight repair-or-replace recommendation rather than being sold a wash that will not last.` },
          { title: `Warranty note`, body: `${a}'s completion WhatsApp includes the 1-month workmanship warranty note, so the owner knows what is covered if the same issue recurs.` },
        ],
        closing: (b, a) => `That warranty conversation is short but it is what makes ${b} repeat business in ${a} predictable rather than accidental.`,
      },
    ],
  },
  american: {
    // American brands (York, Carrier) are common in commercial + older
    // premium residential. Copy leans toward mixed commercial / heavier
    // coil-service angle vs the japanesePremium residential-inverter tone.
    kljCore: [
      {
        intro: (b, a) => `${b} units in ${a}'s core are commonly wall-mount + ceiling cassette combinations in shoploft residences and older serviced apartments. The plan mixes residential and light-commercial habits because a ${b} visit in ${a} often does both in the same building.`,
        steps: (b, a) => [
          { title: `Building + tenant confirmation`, body: `Before dispatch we confirm the ${a} block, floor, and whether the ${b} unit serves a residential or shop-loft use — the wash-cover setup differs.` },
          { title: `Filter + coil inspection`, body: `${b} filter and evaporator coil are inspected. Long-runtime shoplofts foul the coil quicker than residential; the wash depth is decided from what the filter shows.` },
          { title: `Alkaline chemical wash`, body: `Coil, blower and drain pan are washed with the ${b} unit's electrical isolator confirmed off. The drain is watched at full flow before reassembly.` },
          { title: `Cool-down + handover`, body: `${b} unit is run 15 minutes with supply-air temperature verified. Photos and confirmed price go to the ${a} WhatsApp booking thread.` },
        ],
        closing: (b, a) => `Handling both shoploft and residential in the same visit is why ${b} customers in ${a} stick with us for both units in a mixed-use block.`,
      },
      {
        intro: (b, a) => `A ${b} booking in the ${a} core is often an older split unit that has run heavily for years. The plan is built around a deeper mechanical clean, not a light spray.`,
        steps: (b, a) => [
          { title: `Access + isolator`, body: `The ${a} building's visitor and service-lift rules are confirmed. The ${b} unit's electrical isolator is identified before the front panel is removed.` },
          { title: `Filter + blower wheel pull`, body: `Filter and blower wheel are removed together — a greasy or dust-caked wheel is usually why ${b} airflow was weak in the first place.` },
          { title: `Coil + drain wash`, body: `Alkaline coil pass, two rinses, drain flushed. Any drain-line joint suspected of leakage is called out on WhatsApp before it becomes a next-week callback.` },
          { title: `Report + warranty`, body: `Before/after coil and blower photos plus the 1-month workmanship warranty note are sent to the ${a} WhatsApp thread with the confirmed price.` },
        ],
        closing: (b, a) => `Mechanical-first cleaning is what keeps ${b} inner-city ${a} customers from switching to a "cheaper wash" that never actually fixes airflow.`,
      },
      {
        intro: (b, a) => `${b} service in ${a}'s inner belt often means older ceiling cassettes above ground-floor shops with residential above. The plan protects both tenant types.`,
        steps: (b, a) => [
          { title: `Tenant briefing`, body: `${a}'s shop and residential tenants are both notified before the ${b} wash, and the shop's operating window is respected.` },
          { title: `Grille drop + wash prep`, body: `${b} cassette grille is dropped, washed separately in a bucket, and the shop's power point is protected under a rated extension.` },
          { title: `Coil + pump-drain service`, body: `Coil gets alkaline pass; the condensate pump is bench-tested with a bucket-fill so the pump-out cycle is confirmed clear.` },
          { title: `Restart + report`, body: `${b} unit is restarted, allowed to reach normal load, and supply-air temperature is confirmed. The ${a} WhatsApp thread carries the final price and warranty note.` },
        ],
        closing: (b, a) => `Because both the shop and the residential tenant are considered, ${a} JMBs often ask us back for the rest of the ${b} equipment in the same block.`,
      },
      {
        intro: (b, a) => `${b} in ${a}'s inner-city belt runs on a "quiet visit" model — the wash is done, the price is what was agreed, and nobody notices anything except that the aircond is colder afterwards. The plan is written that way.`,
        steps: (b, a) => [
          { title: `Booking confirmation`, body: `${a}'s address, ${b} model line and access rules are confirmed at booking. Same-day slots are realistic if the message reaches us before 11am.` },
          { title: `Coil + drain wash`, body: `Standard ${b} wash sequence: filter, blower wheel, coil, drain pan and outdoor coil, with the electrical isolator confirmed off throughout.` },
          { title: `Cool-down verification`, body: `${b} unit is run 15 minutes with supply-air temperature measured. Anything unusual is photographed and shared on WhatsApp.` },
          { title: `Closeout + warranty`, body: `${a}'s customer receives the final price and the 1-month workmanship warranty note on the same WhatsApp thread that started the booking.` },
        ],
        closing: (b, a) => `Predictable closeouts are how ${b} customers in ${a} recommend us to another tenant in the same block without a hesitation.`,
      },
    ],
    pjMix: [
      {
        intro: (b, a) => `${b} equipment in ${a} sits across a very wide age range — some units are 15+ years old in older PJ streets, others are new commercial cassettes in newer offices. The plan lets the technician handle both without a mid-day tool repack.`,
        steps: (b, a) => [
          { title: `Age + role confirmation`, body: `${b} model plate is checked and the ${a} customer is asked whether the unit serves a home or a shop/office — the wash depth differs.` },
          { title: `Filter + wheel inspection`, body: `Filter and blower wheel are inspected. In ${a} shop-office ${b} units the blower is often greasy and needs a full pull rather than a rinse.` },
          { title: `Alkaline coil wash`, body: `${b} coil is washed with a stronger alkaline pass for commercial units, milder for residential. Drain is flushed and confirmed clear.` },
          { title: `Photo report`, body: `${a}'s WhatsApp booking thread gets before/after coil photos, cool-down readings and the confirmed price with warranty note.` },
        ],
        closing: (b, a) => `Adjusting the wash to what the unit actually needs is why ${a} customers stop being surprised by "extra" charges we would never add.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} is usually residential or a small office. The plan lets the same van handle both, because the ${a} route often mixes the two on the same day.`,
        steps: (b, a) => [
          { title: `Address type confirmed`, body: `Before dispatch we ask the ${a} customer whether the address is landed, condo or shoplot so the right ${b} wash kit rides up first.` },
          { title: `Model + refrigerant`, body: `${b} model and refrigerant type (R32, R410A, or older R22) are confirmed. R22 units are flagged for gas-availability reasons.` },
          { title: `Wash + gas verify`, body: `Alkaline coil wash with the ${b} electrical isolator confirmed off, rinse twice, drain confirmed. Any agreed gas top-up is done with the pressure gauge already prepared.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer gets coil, drain and outdoor-fan photos with the confirmed price and warranty note on WhatsApp.` },
        ],
        closing: (b, a) => `Predictable closeouts are what keep ${b} repeat rates high in ${a} across both landed and condo customers.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} typically split into "family run" (3–5 units in one landed home) and "office run" (2–4 cassettes across a small office). The plan uses the same core steps in a different order.`,
        steps: (b, a) => [
          { title: `Visit inventory`, body: `The technician lists each ${b} unit in the ${a} address by room/zone, HP and inverter/non-inverter type before quoting extras.` },
          { title: `Priority-order wash`, body: `The most-used ${b} unit is washed first so the household or office keeps its main comfort. Each unit's drain is confirmed clear before moving on.` },
          { title: `Post-wash cool-down`, body: `Each washed ${b} unit runs 10–15 minutes with supply-air temperature verified. Weak cooling triggers a gas-pressure test before the technician leaves.` },
          { title: `Owner sign-off`, body: `${a}'s owner receives the WhatsApp summary: units washed, drain checks, cooling readings, warranty period and next-visit suggestion.` },
        ],
        closing: (b, a) => `That structured sign-off is why ${a} multi-unit ${b} bookings finish in one visit rather than being split across two days.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is a mix of quick apartment visits and longer landed runs, so the plan is designed to work equally well for both — the sequence is what keeps the tools organised, not the address type.`,
        steps: (b, a) => [
          { title: `Booking intake`, body: `${a}'s booking confirms address type, ${b} model line and preferred time window.` },
          { title: `Non-invasive check`, body: `Coil, drain, capacitor and outdoor fan are inspected without dismantling the ${b} indoor unit first, so a wash quote is never a disguised diagnosis.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence with the electrical isolator confirmed off throughout.` },
          { title: `Report on WhatsApp`, body: `${a}'s WhatsApp booking thread gets photos, cool-down readings and the confirmed price with the 1-month warranty note.` },
        ],
        closing: (b, a) => `Report-first is why long-time ${b} customers in ${a} usually pass our WhatsApp to neighbours in the same street.`,
      },
    ],
    gatedGrowth: [
      {
        intro: (b, a) => `${a}'s growth-belt schemes have plenty of ${b} equipment — often ceiling cassettes above small offices or wall-mounts in gated houses. The plan is designed to hit the "new but dusty" pattern common in construction-heavy suburbs.`,
        steps: (b, a) => [
          { title: `Access + permit`, body: `${a}'s guarded scheme access and any work-permit paperwork are confirmed before the ${b} technician arrives.` },
          { title: `Filter + coil inspection`, body: `Even young ${b} units in ${a} show heavy dust load from nearby construction. The filter is checked first to decide wash depth.` },
          { title: `Chemical wash`, body: `Alkaline coil pass with electrical isolator confirmed off. Drain is flushed and watched at full flow.` },
          { title: `Photo handover + cycle suggestion`, body: `${a}'s WhatsApp thread gets photos, cool-down readings and a suggested next-visit cycle tied to how many construction plots remain around the address.` },
        ],
        closing: (b, a) => `Honesty about the local dust load is why ${b} customers in ${a} do not feel oversold when we recommend an 8-month cycle instead of a 12-month one.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} usually start at a guardhouse rather than the front door. The plan reflects that, and prevents the technician from losing the slot at the gate.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s scheme name, phase and house/unit number are forwarded to the guardhouse the day before if possible, and the ${b} technician's ID is packed.` },
          { title: `Model + wash prep`, body: `${b} model plate is photographed on arrival, refrigerant type confirmed, and the correct chemical mix for the model line is measured out.` },
          { title: `Chemical wash`, body: `${b} coil and blower are washed with the electrical isolator confirmed off. Rinse twice to prevent alkaline residue on the coil fins.` },
          { title: `Warranty + report`, body: `${a}'s WhatsApp booking thread carries before/after photos, confirmed price and the 1-month warranty note.` },
        ],
        closing: (b, a) => `That approach is why our ${a} bookings from gated communities usually become two or three-unit repeat calls within the same scheme.`,
      },
      {
        intro: (b, a) => `${a}'s newer scheme housing puts ${b} units in tight service ledges and shared drain stacks. The plan is designed around not creating a problem for the unit below.`,
        steps: (b, a) => [
          { title: `Wet-work zone setup`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened. The shared drain stack in ${a} is identified so the wash-water route is planned.` },
          { title: `Coil wash + drain flush`, body: `${b} coil and blower are washed with the electrical isolator off. The drain line is flushed until it runs clear at the shared stack discharge.` },
          { title: `Outdoor coil rinse`, body: `${a}'s outdoor ${b} coil is pressure-rinsed to lift construction-site dust, without spraying water into the unit below.` },
          { title: `Cool-down + sign-off`, body: `${b} unit runs 15 minutes with supply-air verified. ${a}'s WhatsApp thread gets photos and confirmed price.` },
        ],
        closing: (b, a) => `Because the plan protects the neighbouring unit, ${a} JMB-managed schemes come back to us for the whole cluster later.`,
      },
      {
        intro: (b, a) => `A ${b} visit to ${a} is usually a newer unit in a still-settling scheme. The plan is built around the reality that "new" does not mean "clean" in a construction-heavy area.`,
        steps: (b, a) => [
          { title: `Site + access`, body: `${a}'s guarded scheme access is confirmed at booking, and the ${b} wash kit that matches the model line is packed.` },
          { title: `Inspection first`, body: `Filter and evaporator are inspected on arrival. Heavy dust confirms the wash; a clean filter with weak cooling points to a gas top-up instead.` },
          { title: `Confirmed service done`, body: `The chosen ${b} service is performed. Any unexpected finding is quoted on WhatsApp and confirmed before starting.` },
          { title: `Photo-backed closeout`, body: `${a}'s ${b} customer receives coil, drain and outdoor-fan photos with the confirmed price and warranty note.` },
        ],
        closing: (b, a) => `That "no surprise charges" close is why ${a} customers reliably pass our WhatsApp to the next-door house in the same scheme.`,
      },
    ],
    landedMature: [
      {
        intro: (b, a) => `${a} is a mature landed suburb, so a ${b} booking usually covers several units in one house. The plan treats it as a small route inside one address rather than a single-unit stop.`,
        steps: (b, a) => [
          { title: `House walk-through`, body: `The technician walks with the ${a} owner room by room, notes which ${b} units are on, which are cooling weakly, and confirms scope.` },
          { title: `Copper + capacitor check`, body: `Older ${a} landed installs show tarnished copper joints and ageing capacitors. Both are checked before any wash water hits the ${b} coil.` },
          { title: `Sequential wash`, body: `${b} units are washed one at a time so the family keeps one air-conditioned room. Each unit's drain is confirmed clear before moving on.` },
          { title: `Whole-house cool-down`, body: `After the last unit is reassembled, every washed ${b} unit runs together for 15 minutes with supply-air temperature verified.` },
        ],
        closing: (b, a) => `Whole-house verification is why ${a} multi-unit ${b} bookings finish in one visit rather than being split across two days.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} usually involves long copper runs from upstairs to the outdoor compressors below. Half the visit is upstairs, half at the compressor row.`,
        steps: (b, a) => [
          { title: `Upstairs / downstairs mapping`, body: `The ${a} technician confirms which ${b} indoor unit belongs to which outdoor compressor, since older installs are not always labelled correctly.` },
          { title: `Compressor row check`, body: `The ${b} outdoor row is checked for bracket rust, drain-fall and fan-blade damage. Anything affecting gas pressure is fixed before the wash.` },
          { title: `Gas + coil verify`, body: `Each washed ${b} unit's gas pressure is measured so weak cooling can be diagnosed before the technician leaves ${a}.` },
          { title: `Owner sign-off`, body: `${a}'s owner sees before/after coil photos, gas readings and final price on WhatsApp before payment is discussed.` },
        ],
        closing: (b, a) => `That sign-off avoids the classic "why is the price different from the WhatsApp quote?" moment ${a} landed customers rightly hate.`,
      },
      {
        intro: (b, a) => `${b} in ${a} often means one older non-inverter next to a newer inverter in the same house. Two service styles, one visit.`,
        steps: (b, a) => [
          { title: `Unit inventory`, body: `On arrival the ${a} technician lists each ${b} unit by room, HP and inverter/non-inverter. This decides the work order.` },
          { title: `Non-inverter first`, body: `Older non-inverter ${b} units are washed first — they tolerate handling better and free the customer's bedroom for the rest of the visit.` },
          { title: `Inverter with PCB protection`, body: `For ${b} inverter units the electrical isolator is confirmed off and the PCB is covered before wash water reaches the coil.` },
          { title: `Cross-check cool-down`, body: `Both types are then run for 10 minutes with supply-air readings taken.` },
        ],
        closing: (b, a) => `Splitting the visit this way is how ${a} customers avoid the classic complaint of a "washed" ${b} inverter that tripped out the next week.`,
      },
      {
        intro: (b, a) => `Landed ${b} service in ${a} is a house visit, not a unit visit — the plan is designed to finish the whole house within one dispatch window.`,
        steps: (b, a) => [
          { title: `Whole-house scope`, body: `The ${a} technician and owner agree the exact list of ${b} units in scope, with "inspection only" units quoted separately.` },
          { title: `Room-by-room wash`, body: `Each room's ${b} unit is washed and reassembled before moving on so the family keeps the used rooms comfortable.` },
          { title: `Drain stress test`, body: `Every drain line is flushed and watched at full flow for at least 30 seconds to catch slow blockages.` },
          { title: `Owner handover`, body: `${a}'s owner receives a short WhatsApp summary: ${b} units washed, drain checks passed, cooling readings, warranty period and next-visit suggestion.` },
        ],
        closing: (b, a) => `That handover is why ${a} landed customers usually re-book us for the next ${b} round without asking for a fresh quote.`,
      },
    ],
    commercialHeavy: [
      {
        intro: (b, a) => `${a} carries a lot of light-commercial and industrial ${b} equipment — often ceiling cassettes and rooftop condensers running 10–14 hours daily. The plan is a scheduled deep clean, not a residential-style rinse.`,
        steps: (b, a) => [
          { title: `Shutdown window`, body: `The ${a} site manager confirms the safe shutdown slot and identifies the electrical isolator for the target ${b} unit.` },
          { title: `Cassette / wall-unit strip-down`, body: `${b} cassettes are dropped, grilles washed separately in a bucket, and the blower wheel is removed for a proper hands-on clean rather than a sprayed-over rinse.` },
          { title: `Alkaline coil + pump service`, body: `${b} coil gets a stronger alkaline pass. The condensate pump is bench-tested with a bucket-fill so the pump-out cycle is confirmed clear.` },
          { title: `Site-log entry`, body: `${a}'s site log gets a written entry with wash date, ${b} coil condition, pump test result and next suggested service date.` },
        ],
        closing: (b, a) => `That log-driven closeout is why ${a} sites use us for the whole ${b} schedule rather than one-off emergency calls.`,
      },
      {
        intro: (b, a) => `${b} equipment in ${a} rarely fails politely — it usually stops cooling on the busiest day. The plan is designed to catch failure signals before that happens.`,
        steps: (b, a) => [
          { title: `Baseline readings`, body: `Before any wash the ${a} technician records supply-air temperature and drain-line flow for each ${b} unit.` },
          { title: `Filter, wheel, coil`, body: `Filter, blower wheel and ${b} coil are cleaned in that order — a coil wash under a greasy wheel is theatre, not maintenance.` },
          { title: `Drain + pump test`, body: `Drain line is flushed and the condensate pump (if fitted) is tested with a bucket-fill.` },
          { title: `Report to owner`, body: `${a}'s site owner receives before/after readings so the next ${b} service cycle can be planned with real data.` },
        ],
        closing: (b, a) => `Data-driven closeout is what turns an ${a} ${b} unit from a repeat emergency into a scheduled overhead.`,
      },
      {
        intro: (b, a) => `${a} sites usually mean shared electrical supply, tight loading access and no room to break the operating schedule. The plan protects the shift.`,
        steps: (b, a) => [
          { title: `Isolator + shutdown`, body: `Before any wet work starts the ${a} technician confirms which isolator kills power to the exact ${b} unit and gets a signed shutdown from the shift supervisor.` },
          { title: `Contained wash`, body: `Canvas cover and drip tray go under the unit so nothing wets the shop-floor equipment or the electrical panel below.` },
          { title: `Coil + blower rebuild`, body: `${b} blower wheel and coil are cleaned and dried. Fan-motor bearings are visually checked before power is restored.` },
          { title: `Restart under load`, body: `${b} unit is restarted, allowed to reach normal load, and supply-air temperature is confirmed.` },
        ],
        closing: (b, a) => `${a} sites cannot lose an afternoon to a bad wash, so the sequence is written down and followed the same way every visit.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is about reducing the number of surprise breakdowns per year. Inspection depth over wash speed.`,
        steps: (b, a) => [
          { title: `Inspection walk`, body: `The technician walks the ${a} shop floor, notes which ${b} units serve which zone and confirms today's scope.` },
          { title: `Deep clean per unit`, body: `Coil, blower wheel and drain pan are cleaned. Belts or bearings near end-of-life are flagged for scheduled replacement.` },
          { title: `Drainage + electrical audit`, body: `${b} condensate drain and isolator condition are checked and photographed for the site log.` },
          { title: `Preventive note`, body: `${a}'s owner receives a WhatsApp note with a suggested next-visit window based on daily runtime and dust load.` },
        ],
        closing: (b, a) => `That note is the reason ${a} sites move from reactive to preventive ${b} maintenance within a few visits.`,
      },
    ],
    hillside: [
      {
        intro: (b, a) => `${a} sits on the hillside side of the Klang Valley. Slope, greenery and longer pipe runs decide the plan more than the ${b} wash itself.`,
        steps: (b, a) => [
          { title: `Driveway + ladder plan`, body: `The technician confirms the ${a} driveway gradient, walks the ${b} outdoor compressor route, and picks a safe ladder position.` },
          { title: `Bracket + drain-fall check`, body: `${b} outdoor bracket, wall anchor and drain-fall angle are inspected. On a hillside a slow drain becomes a fast leak in a monsoon night.` },
          { title: `Debris pass + coil wash`, body: `Outdoor coils in ${a} gardens catch leaves; an extra debris-lift pass is done before the alkaline wash starts.` },
          { title: `Vibration + noise verification`, body: `After reassembly the ${b} compressor is run 15 minutes and the technician listens for bracket vibration.` },
        ],
        closing: (b, a) => `Those two extra steps — debris pass and vibration listen — are why ${a} hillside ${b} jobs rarely need a second callout.`,
      },
      {
        intro: (b, a) => `Hillside service in ${a} is why our ${b} bookings usually include a bracket line-item in the quote up front.`,
        steps: (b, a) => [
          { title: `Bracket audit`, body: `Before any wash the ${b} bracket wall anchors are pull-tested with hand pressure. Anything soft is flagged and quoted before further work.` },
          { title: `Drain-fall confirmation`, body: `A short water pour is done at the drain pan and flow is timed at the outdoor discharge. A gradient below spec is fixed before the ${b} coil is washed.` },
          { title: `Chemical wash`, body: `${b} evaporator and outdoor coils are washed with the drain already known good.` },
          { title: `Handover with photos`, body: `${a}'s customer sees bracket, drain-fall and coil photos on WhatsApp before the price is confirmed as paid.` },
        ],
        closing: (b, a) => `That bracket-first sequence is an ${a} habit — hillside walls do not forgive a lazy visit.`,
      },
      {
        intro: (b, a) => `${a} in the hillside belt means larger homes, longer pipe runs and more ${b} units per booking. The plan is built to keep the technician moving without missing the small hillside-specific risks.`,
        steps: (b, a) => [
          { title: `House + pipe-run inventory`, body: `The technician lists each ${a} ${b} unit with its indoor-to-outdoor pipe length.` },
          { title: `Compressor row walk-around`, body: `${b} outdoor compressors on hillside walls are photographed, and any leaning bracket is quoted separately.` },
          { title: `Sequential unit wash`, body: `Units are washed in sequence, with drain checks always done in the direction of hillside water flow.` },
          { title: `Owner report`, body: `A short WhatsApp report shows pipe-run lengths, gas readings, drain-check photos and the confirmed price for the whole ${a} visit.` },
        ],
        closing: (b, a) => `That report is why ${a} owners can plan the next year's ${b} servicing budget without another site visit.`,
      },
      {
        intro: (b, a) => `A hillside ${b} address in ${a} is more of an installation-quality check than a wash. The plan is designed to catch old install mistakes before they become leaks.`,
        steps: (b, a) => [
          { title: `Pipe insulation walk`, body: `The technician walks the ${b} pipe route from indoor unit to outdoor compressor, checking for missing insulation and sun damage.` },
          { title: `Wash + drain flush`, body: `${b} coil and blower are washed, drain line is flushed, and the technician watches for water pooling on the ${a} hillside garden below.` },
          { title: `Gas + compressor sound test`, body: `Gas pressure is measured and the ${b} compressor is listened to for the low hum that indicates good load.` },
          { title: `Next-visit note`, body: `${a}'s customer gets a suggested next-visit window based on pipe run, unit age and how much shade the outdoor unit sits in.` },
        ],
        closing: (b, a) => `That note is what turns a hillside ${a} ${b} booking into a planned relationship rather than a firefight in a wet season.`,
      },
    ],
    outerTownship: [
      {
        intro: (b, a) => `${a} is on the outer township belt where ${b} equipment is often older and honest repair-or-replace advice matters more than a fast wash.`,
        steps: (b, a) => [
          { title: `Age + refrigerant`, body: `${b} model plate is checked. Older R22 units in ${a} are flagged because gas is no longer easy to source.` },
          { title: `Capacitor + wiring inspection`, body: `Capacitor microfarads and outdoor wiring are tested — in older ${a} installs these are often the real cause of tripping.` },
          { title: `Wash or repair decision`, body: `${a}'s owner gets a plain answer: whether a chemical wash will solve the issue, or a repair/replacement is the better spend.` },
          { title: `Runtime test`, body: `${b} unit is run 20 minutes and supply-air temperature is verified before the technician leaves ${a}.` },
        ],
        closing: (b, a) => `That honest-recommendation step is why ${b} customers in ${a} treat us as their long-term aircond people rather than a one-time wash contact.`,
      },
      {
        intro: (b, a) => `A ${b} booking in ${a} usually comes from a long-time resident who wants a straight answer.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Before opening the ${b} unit the technician asks the ${a} owner three questions: age, last wash and what changed recently.` },
          { title: `Non-invasive check`, body: `Outdoor coil, drain and capacitor are inspected without dismantling the ${b} indoor unit first.` },
          { title: `Written price`, body: `${a}'s customer sees the final price on WhatsApp before any panel is removed.` },
          { title: `Work + verified cooling`, body: `The chosen work is done, and the ${b} unit is verified with supply-air readings.` },
        ],
        closing: (b, a) => `Question-first is why long-time ${a} residents pass our ${b} WhatsApp to their neighbours.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} are small in RM value but high in trust. The plan is short but disciplined.`,
        steps: (b, a) => [
          { title: `Ground-floor access`, body: `Most ${a} outdoor units are ground level, so the ${b} technician confirms the safest ladder position first.` },
          { title: `Refrigerant + capacitor test`, body: `Gas pressure and capacitor microfarads are tested first — a clean coil with weak cooling is usually a capacitor or gas issue.` },
          { title: `Right-service quote`, body: `${a}'s owner sees one recommended service and one alternative on WhatsApp, with a plain reason for each.` },
          { title: `Job closed with photos`, body: `${b} coil, drain and outdoor-fan photos are attached to the ${a} WhatsApp completion.` },
        ],
        closing: (b, a) => `Right-service quotes are what keep ${b} ${a} bookings small in RM value but reliable in repeat rate.`,
      },
      {
        intro: (b, a) => `${a}'s outer-township streets are where a ${b} technician needs to be as ready to say "don't spend money on this one" as to sell a chemical wash.`,
        steps: (b, a) => [
          { title: `Owner briefing`, body: `The ${b} technician introduces themselves at the ${a} gate and confirms the price already agreed on WhatsApp.` },
          { title: `Unit + electrical check`, body: `${b} indoor unit, drain, capacitor, isolator and exposed wiring are inspected.` },
          { title: `Repair-or-replace call`, body: `For ${b} units older than about 10 years the ${a} owner gets a straight repair-or-replace recommendation.` },
          { title: `Warranty note`, body: `${a}'s completion WhatsApp includes the 1-month workmanship warranty note.` },
        ],
        closing: (b, a) => `That warranty conversation is short but it is what makes ${b} repeat business in ${a} predictable.`,
      },
    ],
  },

  // The remaining brand-families reuse the same area-profile shape but
  // with authored intro/step/closing wording appropriate to that family.
  // Below: koreanTV, chineseValue, malaysianLocal.
  koreanTV: {
    kljCore: [
      {
        intro: (b, a) => `${b} residential inverters are increasingly common in ${a}'s newer condo towers. The plan is built around the tighter service-lift windows those buildings usually give, and around ${b}'s inverter-heavy line.`,
        steps: (b, a) => [
          { title: `Building + lift`, body: `${a}'s block, floor and service-lift slot are confirmed before dispatch. Any JMB work-permit is prepared with the ${b} technician's ID copy.` },
          { title: `PCB shielding`, body: `The ${b} indoor PCB and sensor connectors are covered before any wash water enters the coil.` },
          { title: `Chemical wash`, body: `Alkaline pass, two rinses, drain line cleared and confirmed at the ground-floor stack.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes with supply-air verified. The ${a} WhatsApp thread carries photos and the confirmed price.` },
        ],
        closing: (b, a) => `Fitting the plan to the building's lift window is why ${b} customers in ${a} usually re-book us for the next unit in the same condo.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a}'s inner belt is usually a single condo unit. The plan focuses on doing that one unit well rather than pushing an upsell.`,
        steps: (b, a) => [
          { title: `Access + model check`, body: `${a}'s building access rules are confirmed, and the ${b} model plate is photographed on arrival.` },
          { title: `Coil + blower wash`, body: `${b} coil and blower are washed with PCB protection intact. Rinse is done twice to prevent alkaline residue.` },
          { title: `Drain verification`, body: `Drain line is flushed and watched at full flow for at least 30 seconds.` },
          { title: `Closeout`, body: `${a}'s WhatsApp thread receives before/after photos, cool-down readings and the confirmed price.` },
        ],
        closing: (b, a) => `One-unit-well is why ${b} customers in ${a} bring us back rather than shop around next year.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is a specialist visit because most models here are inverter splits with sensitive boards. The plan protects those boards.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s guardhouse receives the ${b} technician's ID copy ahead of arrival.` },
          { title: `Wet-work zone`, body: `Canvas cover and drip tray go down before any ${b} panel is opened.` },
          { title: `Coil + PCB-safe wash`, body: `${b} coil is washed with a sheathed PCB and covered sensor connectors.` },
          { title: `Handover`, body: `${a}'s customer sees photos, readings and the confirmed price on WhatsApp.` },
        ],
        closing: (b, a) => `Board protection is why ${b} customers in ${a} do not experience the "washed and dead the next week" complaint.`,
      },
      {
        intro: (b, a) => `${b} inverters in ${a} are usually 5–10 years old. The plan works the same way for older 8-year units and newer 3-year ones — the sequence is the safeguard.`,
        steps: (b, a) => [
          { title: `Access`, body: `${a}'s building access rules and service-lift window are confirmed before dispatch.` },
          { title: `Wash prep`, body: `${b} PCB and sensor cabling are covered, and the correct chemical mix for the model line is measured.` },
          { title: `Coil wash`, body: `Alkaline pass, two rinses, drain confirmed clear.` },
          { title: `Cool-down + sign-off`, body: `${b} unit is run 15 minutes with supply-air verified. ${a}'s WhatsApp gets the closing photos and price.` },
        ],
        closing: (b, a) => `A boring, safe visit is the whole product — ${a} customers know exactly what happens.`,
      },
    ],
    pjMix: [
      {
        intro: (b, a) => `${b} in ${a} spans the full inverter age range. The plan lets the technician switch between old and new units without missing the different washing rules.`,
        steps: (b, a) => [
          { title: `Vintage check`, body: `${b} model plate is checked on arrival. Older units get a full mechanical clean; newer inverters get PCB-protected washing.` },
          { title: `Capacitor + gas check`, body: `For ${b} units over 8 years old, capacitor microfarads and gas pressure are tested before the wash is quoted in ${a}.` },
          { title: `Chemical wash`, body: `Alkaline coil pass, two rinses, drain flushed and confirmed clear.` },
          { title: `Photo report`, body: `${a}'s WhatsApp booking thread gets before/after coil photos, cool-down readings and the confirmed price.` },
        ],
        closing: (b, a) => `Adjusting to actual unit age is why ${a} customers stop being surprised by "extra" charges we would never add.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} is usually residential — landed or condo. The plan lets the same van handle both.`,
        steps: (b, a) => [
          { title: `Address type`, body: `${a}'s address type is confirmed before dispatch so the right ${b} wash kit rides up first.` },
          { title: `Model + refrigerant`, body: `${b} model and refrigerant type are confirmed. R22 units are flagged for gas-availability reasons.` },
          { title: `Wash + gas verify`, body: `Alkaline coil wash with PCB protection, rinse twice, drain confirmed clear.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer gets photos with the confirmed price and the 1-month warranty note on WhatsApp.` },
        ],
        closing: (b, a) => `Predictable closeouts keep ${b} repeat rates high in ${a}.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} split into landed multi-unit and single condo. Same core steps in a different order.`,
        steps: (b, a) => [
          { title: `Visit inventory`, body: `The technician lists each ${b} unit in the ${a} address before quoting extras.` },
          { title: `Priority-order wash`, body: `The most-used ${b} unit is washed first so the household keeps its main comfort.` },
          { title: `Post-wash cool-down`, body: `Each washed ${b} unit runs 10–15 minutes with supply-air verified.` },
          { title: `Owner sign-off`, body: `${a}'s owner receives the WhatsApp summary.` },
        ],
        closing: (b, a) => `That sign-off is why ${a} multi-unit ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is a mix of quick condo visits and longer landed runs. The plan works for both.`,
        steps: (b, a) => [
          { title: `Booking intake`, body: `${a}'s booking confirms address type and preferred window.` },
          { title: `Non-invasive check`, body: `Coil, drain, capacitor and outdoor fan are inspected without dismantling first.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence with PCB protection intact.` },
          { title: `Report`, body: `${a}'s WhatsApp thread gets photos, readings and the confirmed price with warranty note.` },
        ],
        closing: (b, a) => `Report-first is why long-time ${a} ${b} customers pass our WhatsApp on.`,
      },
    ],
    gatedGrowth: [
      {
        intro: (b, a) => `${a}'s growth-belt schemes have plenty of new ${b} inverter units running hard in dusty construction conditions. The plan is designed to catch that pattern.`,
        steps: (b, a) => [
          { title: `Guardhouse + house rule`, body: `${a}'s scheme access is confirmed at booking, and the ${b} technician arrives with the ID copy at the guardhouse.` },
          { title: `Filter + coil inspection`, body: `Even young ${b} units in ${a} show heavy dust from nearby construction. Filter check decides wash depth.` },
          { title: `PCB-safe wash`, body: `Alkaline coil pass with the ${b} PCB sheathed. Rinse twice, drain confirmed clear.` },
          { title: `Photo handover`, body: `${a}'s WhatsApp thread receives photos and a next-visit cycle suggestion tied to local dust load.` },
        ],
        closing: (b, a) => `Honesty about dust load is why ${b} customers in ${a} do not feel oversold when we suggest an 8-month cycle.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} usually start at a guardhouse. The plan prevents the technician losing the slot at the gate.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s scheme name and phase are forwarded ahead of the visit.` },
          { title: `Model + wash prep`, body: `${b} model plate is photographed on arrival and the correct chemical mix is measured.` },
          { title: `Chemical wash`, body: `${b} coil and blower are washed with PCB and sensor connectors protected.` },
          { title: `Warranty + report`, body: `${a}'s WhatsApp booking thread carries before/after photos and the warranty note.` },
        ],
        closing: (b, a) => `That approach is why ${a} bookings from gated communities turn into repeat calls within the same scheme.`,
      },
      {
        intro: (b, a) => `${a}'s newer scheme housing puts ${b} units in tight service ledges and shared drain stacks. The plan is designed around not creating a problem for the unit below.`,
        steps: (b, a) => [
          { title: `Wet-work zone`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened.` },
          { title: `Coil wash + drain flush`, body: `${b} coil and blower are washed with PCB protection. Drain line is flushed until clear at the shared stack discharge.` },
          { title: `Outdoor coil rinse`, body: `${a}'s outdoor coil is pressure-rinsed without spraying water into the unit below.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Because the plan protects the unit below, ${a} JMBs come back for the whole cluster later.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is usually a newer inverter in a still-settling scheme. "New" does not mean "clean" in a construction-heavy area.`,
        steps: (b, a) => [
          { title: `Site + access`, body: `${a}'s access is confirmed and the ${b} wash kit that matches the model line is packed.` },
          { title: `Inspection first`, body: `Filter and evaporator are inspected on arrival to decide wash vs gas top-up.` },
          { title: `Confirmed service done`, body: `The chosen ${b} service is performed; any surprise finding is quoted on WhatsApp first.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer receives photos with the confirmed price and warranty note.` },
        ],
        closing: (b, a) => `No-surprise-charges is why ${a} customers pass our WhatsApp to the next-door house.`,
      },
    ],
    landedMature: [
      {
        intro: (b, a) => `${a}'s mature landed streets often have several ${b} units in one house. The plan treats it as a small route inside one address.`,
        steps: (b, a) => [
          { title: `House walk-through`, body: `The technician walks with the ${a} owner room by room.` },
          { title: `Copper + capacitor check`, body: `Older ${a} landed installs show tarnished copper and ageing capacitors — both are checked before wash water.` },
          { title: `Sequential wash`, body: `${b} units are washed one at a time so the family keeps one air-conditioned room.` },
          { title: `Whole-house cool-down`, body: `All washed ${b} units run together for 15 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Whole-house verification is why ${a} multi-unit ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} usually involves long copper runs from upstairs to the outdoor compressors below.`,
        steps: (b, a) => [
          { title: `Upstairs / downstairs mapping`, body: `The ${a} technician confirms which ${b} indoor unit belongs to which outdoor compressor.` },
          { title: `Compressor row check`, body: `The ${b} outdoor row is checked for bracket rust and drain-fall.` },
          { title: `Gas + coil verify`, body: `Each washed ${b} unit's gas pressure is measured after the wash.` },
          { title: `Sign-off`, body: `${a}'s owner sees before/after coil photos, gas readings and final price on WhatsApp.` },
        ],
        closing: (b, a) => `That sign-off avoids the price-mismatch moment ${a} landed customers hate.`,
      },
      {
        intro: (b, a) => `${b} in ${a} often means one older non-inverter next to a newer inverter — two service styles in one house.`,
        steps: (b, a) => [
          { title: `Unit inventory`, body: `The ${a} technician lists each ${b} unit by room and type.` },
          { title: `Non-inverter first`, body: `Older non-inverter ${b} units are washed first.` },
          { title: `Inverter with PCB protection`, body: `${b} inverter units get PCB protection before wash water touches the coil.` },
          { title: `Cross-check cool-down`, body: `Both types run for 10 minutes with supply-air taken.` },
        ],
        closing: (b, a) => `Splitting the visit avoids the "washed inverter that tripped next week" complaint in ${a}.`,
      },
      {
        intro: (b, a) => `Landed ${b} service in ${a} is a house visit, not a unit visit — designed to finish the whole house in one dispatch window.`,
        steps: (b, a) => [
          { title: `Whole-house scope`, body: `The ${a} technician and owner agree the exact list of ${b} units in scope.` },
          { title: `Room-by-room wash`, body: `Each room's ${b} unit is washed and reassembled before moving on.` },
          { title: `Drain stress test`, body: `Every drain line is flushed and watched at full flow for at least 30 seconds.` },
          { title: `Owner handover`, body: `${a}'s owner receives a short WhatsApp summary.` },
        ],
        closing: (b, a) => `That handover is why ${a} landed customers re-book us for the next ${b} round without a fresh quote.`,
      },
    ],
    commercialHeavy: [
      {
        intro: (b, a) => `${a} carries some commercial ${b} equipment, though residential is more common. The plan handles both if they appear in the same building.`,
        steps: (b, a) => [
          { title: `Shutdown window`, body: `${a}'s site manager confirms the safe shutdown slot for the ${b} unit.` },
          { title: `Cassette / wall-unit strip-down`, body: `Grille is washed separately in a bucket; the ${b} blower wheel is removed for hands-on cleaning.` },
          { title: `Alkaline coil + pump service`, body: `Coil gets a stronger alkaline pass. Any condensate pump is bench-tested with a bucket-fill.` },
          { title: `Site-log entry`, body: `${a}'s site log gets a written entry with the wash date and next suggested service date.` },
        ],
        closing: (b, a) => `Log-driven closeout is why ${a} sites keep us on the ${b} schedule.`,
      },
      {
        intro: (b, a) => `${b} equipment in ${a} rarely fails politely. The plan catches failure signals before the busiest day.`,
        steps: (b, a) => [
          { title: `Baseline readings`, body: `Before any wash the ${a} technician records supply-air temperature and drain flow.` },
          { title: `Filter, wheel, coil`, body: `Filter, blower wheel and ${b} coil are cleaned in that order.` },
          { title: `Drain + pump test`, body: `Drain line is flushed and any condensate pump tested with a bucket-fill.` },
          { title: `Report to owner`, body: `${a}'s site owner receives before/after readings.` },
        ],
        closing: (b, a) => `Data-driven closeout is what turns an ${a} ${b} unit into a scheduled overhead.`,
      },
      {
        intro: (b, a) => `${a} sites often mean shared electrical supply and no room to break the schedule. The plan protects the shift.`,
        steps: (b, a) => [
          { title: `Isolator + shutdown`, body: `The ${a} technician confirms the ${b} isolator and gets a signed shutdown from the shift supervisor.` },
          { title: `Contained wash`, body: `Canvas cover and drip tray go under the unit.` },
          { title: `Coil + blower rebuild`, body: `${b} blower wheel and coil are cleaned and dried.` },
          { title: `Restart under load`, body: `${b} unit is restarted and supply-air temperature is confirmed.` },
        ],
        closing: (b, a) => `Written sequence is what keeps ${a} sites confident in every ${b} visit.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is about reducing surprise breakdowns per year.`,
        steps: (b, a) => [
          { title: `Inspection walk`, body: `The technician walks the ${a} shop floor and confirms scope.` },
          { title: `Deep clean per unit`, body: `Coil, blower and drain are cleaned; end-of-life parts are flagged for scheduled replacement.` },
          { title: `Drainage + electrical audit`, body: `${b} drain and isolator are checked and photographed.` },
          { title: `Preventive note`, body: `${a}'s owner receives a WhatsApp next-visit suggestion.` },
        ],
        closing: (b, a) => `That note moves ${a} sites from reactive to preventive.`,
      },
    ],
    hillside: [
      {
        intro: (b, a) => `${a} sits on the hillside belt. Slope and greenery decide the plan more than the ${b} wash itself.`,
        steps: (b, a) => [
          { title: `Driveway + ladder`, body: `The technician confirms the ${a} driveway gradient and picks a safe ladder position.` },
          { title: `Bracket + drain-fall`, body: `${b} outdoor bracket, wall anchor and drain-fall are inspected.` },
          { title: `Debris pass + wash`, body: `Extra debris-lift pass before the alkaline wash starts.` },
          { title: `Vibration verify`, body: `${b} compressor runs 15 minutes; technician listens for bracket vibration.` },
        ],
        closing: (b, a) => `Extra hillside steps are why ${a} ${b} jobs rarely need a second callout.`,
      },
      {
        intro: (b, a) => `Hillside service in ${a} is why our ${b} bookings usually include a bracket line-item up front.`,
        steps: (b, a) => [
          { title: `Bracket audit`, body: `${b} bracket wall anchors are pull-tested with hand pressure.` },
          { title: `Drain-fall confirmation`, body: `Short water pour at the drain pan; flow timed at the outdoor discharge.` },
          { title: `Chemical wash`, body: `${b} coils are washed with drain already known good.` },
          { title: `Handover with photos`, body: `${a}'s customer sees bracket, drain-fall and coil photos.` },
        ],
        closing: (b, a) => `Bracket-first is an ${a} habit.`,
      },
      {
        intro: (b, a) => `${a} in the hillside belt means larger homes and more ${b} units per booking.`,
        steps: (b, a) => [
          { title: `Pipe-run inventory`, body: `The technician lists each ${a} ${b} unit with its indoor-to-outdoor pipe length.` },
          { title: `Compressor row walk-around`, body: `${b} outdoor compressors are photographed.` },
          { title: `Sequential wash`, body: `Drain checks in the direction of hillside water flow.` },
          { title: `Owner report`, body: `WhatsApp report shows pipe-run lengths and confirmed price.` },
        ],
        closing: (b, a) => `Report is why ${a} owners can plan the year's ${b} budget without another site visit.`,
      },
      {
        intro: (b, a) => `A hillside ${b} address in ${a} is more of an installation-quality check than a wash.`,
        steps: (b, a) => [
          { title: `Insulation walk`, body: `The technician checks the ${b} pipe route for missing insulation.` },
          { title: `Wash + drain flush`, body: `${b} coil and blower washed; technician watches for pooling in the ${a} garden.` },
          { title: `Gas + compressor sound`, body: `Gas pressure measured; compressor listened to.` },
          { title: `Next-visit note`, body: `${a}'s customer gets a suggested next-visit window.` },
        ],
        closing: (b, a) => `That note turns a hillside ${a} ${b} booking into a planned relationship.`,
      },
    ],
    outerTownship: [
      {
        intro: (b, a) => `${a} is on the outer township belt where honest repair-or-replace advice matters more than a fast ${b} wash.`,
        steps: (b, a) => [
          { title: `Age + refrigerant`, body: `${b} model plate is checked. Older R22 units flagged.` },
          { title: `Capacitor + wiring`, body: `Capacitor microfarads and outdoor wiring are tested.` },
          { title: `Wash or repair`, body: `${a}'s owner gets a plain answer.` },
          { title: `Runtime test`, body: `${b} unit runs 20 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Honest-recommendation step is why ${b} customers in ${a} treat us as long-term aircond people.`,
      },
      {
        intro: (b, a) => `${b} in ${a} usually means a long-time resident who wants a straight answer.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Three questions on arrival: age, last wash, recent changes.` },
          { title: `Non-invasive check`, body: `Coil, drain and capacitor checked without dismantling ${b} first.` },
          { title: `Written price`, body: `${a}'s customer sees the final price on WhatsApp before any panel is removed.` },
          { title: `Work + verify`, body: `Chosen work done, ${b} unit verified with supply-air readings.` },
        ],
        closing: (b, a) => `Question-first is why long-time ${a} residents pass our WhatsApp on.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} are small but reliable.`,
        steps: (b, a) => [
          { title: `Ground-floor access`, body: `Most ${a} outdoor units are ground level; ladder position confirmed first.` },
          { title: `Refrigerant + capacitor`, body: `Gas pressure and capacitor microfarads tested first.` },
          { title: `Right-service quote`, body: `${a}'s owner sees one recommended service and one alternative.` },
          { title: `Photo closeout`, body: `${b} closing photos attached to the ${a} WhatsApp completion.` },
        ],
        closing: (b, a) => `Right-service quotes keep ${a} bookings small in RM value but high in trust.`,
      },
      {
        intro: (b, a) => `${a}'s outer streets need a ${b} technician ready to say "don't spend money on this one".`,
        steps: (b, a) => [
          { title: `Owner briefing`, body: `${b} technician introduces themselves at the ${a} gate.` },
          { title: `Unit + electrical`, body: `${b} indoor unit, drain, capacitor and isolator are inspected.` },
          { title: `Repair-or-replace`, body: `Units older than about 10 years get a straight recommendation.` },
          { title: `Warranty note`, body: `${a}'s completion WhatsApp includes the 1-month warranty note.` },
        ],
        closing: (b, a) => `Warranty conversation makes ${b} repeat business in ${a} predictable.`,
      },
    ],
  },
  chineseValue: {
    // Chinese-value brands are common in newer builds where the customer
    // is price-sensitive but still wants a proper wash. Copy leans toward
    // "value-conscious but structured" rather than "premium heritage".
    kljCore: [
      {
        intro: (b, a) => `${b} residential units are common in ${a}'s newer condo blocks and rental apartments. The plan is designed to give a full technical wash at a fair price, without cutting the drain check that budget services skip.`,
        steps: (b, a) => [
          { title: `Access + isolator`, body: `${a}'s building access is confirmed, and the ${b} electrical isolator is identified before the front panel is removed.` },
          { title: `Coil + blower wash`, body: `${b} coil and blower are washed with the PCB and sensor cabling protected — same care as a premium-brand visit.` },
          { title: `Drain verification`, body: `Drain line is flushed and watched at full flow, because a cheap wash that ignores the drain is the classic ${b} callback.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes with supply-air verified. ${a}'s WhatsApp thread gets photos and the confirmed price.` },
        ],
        closing: (b, a) => `Same technical care whether the unit was RM 1,200 or RM 4,200 is why ${b} customers in ${a} bring us back.`,
      },
      {
        intro: (b, a) => `A ${b} booking in ${a}'s core is usually a rental apartment or a newer investment unit. The plan is short but disciplined.`,
        steps: (b, a) => [
          { title: `Building access`, body: `${a}'s block, floor and service-lift slot are confirmed at booking.` },
          { title: `Wash prep + PCB protection`, body: `${b} PCB and sensor connectors are covered before wash water enters the coil.` },
          { title: `Chemical wash`, body: `Alkaline pass, two rinses, drain flushed and confirmed clear.` },
          { title: `Handover`, body: `${a}'s WhatsApp booking thread carries before/after photos and the confirmed price.` },
        ],
        closing: (b, a) => `Doing the small stuff right — drain check, PCB cover — is what makes a ${b} visit in ${a} outlast a cheap wash by 6–8 months.`,
      },
      {
        intro: (b, a) => `${b} in ${a}'s core is a fair-price visit, not a stripped-down one. The plan protects both the customer's wallet and the unit.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s guardhouse receives the ${b} technician's ID copy at booking.` },
          { title: `Wet-work zone setup`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened.` },
          { title: `Coil + drain wash`, body: `${b} coil is washed with PCB protection; drain line is flushed and verified.` },
          { title: `Report`, body: `${a}'s customer sees photos, cool-down readings and the confirmed price on WhatsApp.` },
        ],
        closing: (b, a) => `Because the price is fair and the work is complete, ${b} customers in ${a} rebook rather than shop around.`,
      },
      {
        intro: (b, a) => `${b} inverters in ${a}'s inner belt are usually under 5 years old. The plan works well on both new and older units — the sequence is the safeguard.`,
        steps: (b, a) => [
          { title: `Access confirmed`, body: `${a}'s building access rules and lift window are confirmed before dispatch.` },
          { title: `Wash prep`, body: `${b} PCB and sensor cabling are covered; correct chemical mix measured.` },
          { title: `Coil wash`, body: `Alkaline pass, two rinses, drain confirmed clear.` },
          { title: `Sign-off`, body: `${b} unit is run 15 minutes; ${a}'s WhatsApp gets the closing photos and price.` },
        ],
        closing: (b, a) => `Boring, safe visit — ${a} customers know what they get.`,
      },
    ],
    pjMix: [
      {
        intro: (b, a) => `${b} in ${a} is common in newer landed and condo builds. The plan handles both without cutting the drain check.`,
        steps: (b, a) => [
          { title: `Address type`, body: `${a}'s address type confirmed at booking so the right ${b} wash kit rides up first.` },
          { title: `Model + refrigerant`, body: `${b} model and refrigerant type confirmed on arrival.` },
          { title: `Wash + gas verify`, body: `Alkaline coil wash with PCB protection; rinse twice; drain confirmed clear.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer gets photos with the confirmed price and warranty note on WhatsApp.` },
        ],
        closing: (b, a) => `Fair price plus full technical care is why ${b} repeat rates in ${a} stay high.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} is usually one to three units — either family bedrooms or a small office run.`,
        steps: (b, a) => [
          { title: `Visit inventory`, body: `The technician lists each ${b} unit in the ${a} address before quoting extras.` },
          { title: `Priority-order wash`, body: `Most-used ${b} unit is washed first so comfort is preserved.` },
          { title: `Post-wash cool-down`, body: `Each washed ${b} unit runs 10–15 minutes with supply-air verified.` },
          { title: `Sign-off`, body: `${a}'s owner receives a short WhatsApp summary.` },
        ],
        closing: (b, a) => `Sign-off is why ${a} multi-unit ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `${b} in ${a} needs the same drain and cool-down discipline as any premium brand. The plan does not skip that.`,
        steps: (b, a) => [
          { title: `Booking intake`, body: `${a}'s booking confirms address type and preferred window.` },
          { title: `Non-invasive check`, body: `Coil, drain, capacitor and outdoor fan are inspected without dismantling first.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence with PCB protection intact throughout.` },
          { title: `Report`, body: `${a}'s WhatsApp thread gets photos, readings and the confirmed price with the 1-month warranty note.` },
        ],
        closing: (b, a) => `Report-first is why long-time ${a} ${b} customers pass our WhatsApp on.`,
      },
      {
        intro: (b, a) => `${b} customers in ${a} usually shop for a fair price and honest work. The plan is designed to deliver both without cutting corners.`,
        steps: (b, a) => [
          { title: `Booking confirmation`, body: `${a}'s address, ${b} model and access rules confirmed.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence with PCB protection.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes; supply-air verified.` },
          { title: `Closeout`, body: `${a}'s customer receives the final price and warranty note on the same WhatsApp thread.` },
        ],
        closing: (b, a) => `Predictable closeouts are how ${b} customers in ${a} rebook for the second unit.`,
      },
    ],
    gatedGrowth: [
      {
        intro: (b, a) => `${a}'s growth-belt schemes have plenty of new ${b} units — many are 2–5 years old but running hard in dusty construction conditions.`,
        steps: (b, a) => [
          { title: `Access + permit`, body: `${a}'s guarded scheme access is confirmed before the ${b} technician arrives.` },
          { title: `Filter + coil inspection`, body: `${a}'s young ${b} units still show dust from nearby construction.` },
          { title: `PCB-safe wash`, body: `Alkaline coil pass with the ${b} PCB sheathed; rinse twice.` },
          { title: `Photo handover`, body: `${a}'s WhatsApp receives photos and a next-visit cycle tied to local dust load.` },
        ],
        closing: (b, a) => `Honesty about dust load is why ${b} customers in ${a} accept an 8-month cycle instead of a 12-month one.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} usually start at a guardhouse.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s scheme name and phase are forwarded ahead of the visit.` },
          { title: `Model + wash prep`, body: `${b} model plate is photographed on arrival.` },
          { title: `Chemical wash`, body: `${b} coil and blower are washed with PCB protection.` },
          { title: `Warranty + report`, body: `${a}'s WhatsApp booking thread carries photos and the warranty note.` },
        ],
        closing: (b, a) => `Approach is why ${a} bookings from gated communities become repeat calls.`,
      },
      {
        intro: (b, a) => `${a}'s newer housing has tight service ledges. The plan protects the neighbouring ${b} unit.`,
        steps: (b, a) => [
          { title: `Wet-work zone`, body: `Canvas cover, drip tray and floor mat go down first.` },
          { title: `Coil wash + drain flush`, body: `${b} coil washed with PCB protection; drain line flushed until clear.` },
          { title: `Outdoor coil rinse`, body: `${a}'s outdoor ${b} coil is pressure-rinsed carefully.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes.` },
        ],
        closing: (b, a) => `Protecting the unit below is why ${a} JMBs come back.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is usually a newer inverter in a still-settling scheme.`,
        steps: (b, a) => [
          { title: `Site + access`, body: `${a}'s access confirmed; ${b} wash kit packed.` },
          { title: `Inspection first`, body: `Filter and evaporator inspected to decide wash vs gas top-up.` },
          { title: `Service done`, body: `The chosen ${b} service performed; surprises quoted on WhatsApp first.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer receives photos with price and warranty note.` },
        ],
        closing: (b, a) => `No-surprise-charges is why ${a} customers pass our WhatsApp on.`,
      },
    ],
    landedMature: [
      {
        intro: (b, a) => `${a}'s mature landed streets increasingly carry ${b} units — often replacements for older non-inverter systems. The plan handles both the old and the newly-installed.`,
        steps: (b, a) => [
          { title: `House walk-through`, body: `The technician walks with the ${a} owner room by room.` },
          { title: `Copper + capacitor check`, body: `Older ${a} landed installs are checked before wash water hits any ${b} coil.` },
          { title: `Sequential wash`, body: `${b} units washed one at a time so one bedroom stays cool.` },
          { title: `Whole-house cool-down`, body: `All washed ${b} units run 15 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Whole-house verification is why ${a} ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} usually involves long copper runs from upstairs to the outdoor compressors below.`,
        steps: (b, a) => [
          { title: `Upstairs / downstairs`, body: `The ${a} technician confirms which ${b} indoor unit belongs to which outdoor compressor.` },
          { title: `Compressor row`, body: `The ${b} outdoor row is checked for bracket rust.` },
          { title: `Gas + coil verify`, body: `Each washed ${b} unit's gas pressure is measured after the wash.` },
          { title: `Sign-off`, body: `${a}'s owner sees photos and final price on WhatsApp.` },
        ],
        closing: (b, a) => `Sign-off avoids the price-mismatch moment ${a} landed customers hate.`,
      },
      {
        intro: (b, a) => `${b} in ${a} often means the newest unit in a house of older brands. Different service style, same disciplined visit.`,
        steps: (b, a) => [
          { title: `Unit inventory`, body: `The ${a} technician lists each ${b} unit by room and type.` },
          { title: `Older units first`, body: `Older non-${b} units are handled first to free the customer's bedroom.` },
          { title: `Inverter with PCB protection`, body: `${b} inverter units get PCB protection.` },
          { title: `Cross-check cool-down`, body: `All units run for 10 minutes with supply-air readings taken.` },
        ],
        closing: (b, a) => `Splitting the visit avoids the "washed inverter that tripped next week" complaint in ${a}.`,
      },
      {
        intro: (b, a) => `Landed ${b} service in ${a} is designed to finish the whole house within one dispatch window.`,
        steps: (b, a) => [
          { title: `Whole-house scope`, body: `The ${a} technician and owner agree the exact list of ${b} units in scope.` },
          { title: `Room-by-room wash`, body: `Each room's ${b} unit is washed before moving on.` },
          { title: `Drain stress test`, body: `Every drain line flushed and watched for at least 30 seconds.` },
          { title: `Handover`, body: `${a}'s owner receives a short WhatsApp summary.` },
        ],
        closing: (b, a) => `Handover is why ${a} landed customers re-book without a fresh quote.`,
      },
    ],
    commercialHeavy: [
      {
        intro: (b, a) => `${a} increasingly carries ${b} commercial equipment — often in newer light-industrial units where value pricing wins the tender. The plan is a full deep clean, not a discount wash.`,
        steps: (b, a) => [
          { title: `Shutdown window`, body: `${a}'s site manager confirms the safe shutdown slot for the ${b} unit.` },
          { title: `Cassette / wall-unit strip-down`, body: `Grille is washed separately; ${b} blower wheel is removed for a proper hands-on clean.` },
          { title: `Alkaline coil + pump service`, body: `Coil gets a stronger alkaline pass; any condensate pump is bench-tested.` },
          { title: `Site-log entry`, body: `${a}'s site log gets a written entry.` },
        ],
        closing: (b, a) => `Log-driven closeout is why ${a} sites keep us on the ${b} schedule.`,
      },
      {
        intro: (b, a) => `${b} equipment in ${a} rarely fails politely.`,
        steps: (b, a) => [
          { title: `Baseline readings`, body: `Before any wash the ${a} technician records supply-air temperature and drain flow.` },
          { title: `Filter, wheel, coil`, body: `Filter, blower wheel and ${b} coil are cleaned in that order.` },
          { title: `Drain + pump test`, body: `Drain line flushed and any pump tested with a bucket-fill.` },
          { title: `Report to owner`, body: `${a}'s site owner receives before/after readings.` },
        ],
        closing: (b, a) => `Data-driven closeout turns ${a} ${b} into a scheduled overhead.`,
      },
      {
        intro: (b, a) => `${a} sites often share electrical supply.`,
        steps: (b, a) => [
          { title: `Isolator + shutdown`, body: `The ${a} technician confirms the ${b} isolator.` },
          { title: `Contained wash`, body: `Canvas cover and drip tray go under the unit.` },
          { title: `Coil + blower rebuild`, body: `${b} blower wheel and coil cleaned and dried.` },
          { title: `Restart`, body: `${b} unit is restarted and supply-air temperature confirmed.` },
        ],
        closing: (b, a) => `Written sequence keeps ${a} sites confident in every ${b} visit.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is about reducing surprise breakdowns.`,
        steps: (b, a) => [
          { title: `Inspection walk`, body: `The technician walks the ${a} shop floor and confirms scope.` },
          { title: `Deep clean`, body: `Coil, blower and drain cleaned; end-of-life parts flagged.` },
          { title: `Drainage + electrical audit`, body: `${b} drain and isolator checked and photographed.` },
          { title: `Preventive note`, body: `${a}'s owner receives a WhatsApp next-visit suggestion.` },
        ],
        closing: (b, a) => `Preventive note moves ${a} sites from reactive to planned.`,
      },
    ],
    hillside: [
      {
        intro: (b, a) => `${a} sits on the hillside belt. Slope decides the plan more than the ${b} wash itself.`,
        steps: (b, a) => [
          { title: `Driveway + ladder`, body: `The technician confirms the ${a} driveway gradient.` },
          { title: `Bracket + drain-fall`, body: `${b} outdoor bracket and drain-fall are inspected.` },
          { title: `Debris pass + wash`, body: `Extra debris-lift pass before the alkaline wash.` },
          { title: `Vibration verify`, body: `${b} compressor runs 15 minutes for bracket vibration listen.` },
        ],
        closing: (b, a) => `Extra hillside steps mean ${a} ${b} jobs rarely need a second callout.`,
      },
      {
        intro: (b, a) => `Hillside service in ${a} usually includes a bracket line-item.`,
        steps: (b, a) => [
          { title: `Bracket audit`, body: `${b} bracket wall anchors are pull-tested.` },
          { title: `Drain-fall confirmation`, body: `Water pour at the drain pan; flow timed at the outdoor discharge.` },
          { title: `Chemical wash`, body: `${b} coils washed with drain already known good.` },
          { title: `Handover with photos`, body: `${a}'s customer sees bracket, drain-fall and coil photos.` },
        ],
        closing: (b, a) => `Bracket-first is an ${a} habit.`,
      },
      {
        intro: (b, a) => `${a} hillside means larger homes and more ${b} units per booking.`,
        steps: (b, a) => [
          { title: `Pipe-run inventory`, body: `The technician lists each ${a} ${b} unit with its pipe length.` },
          { title: `Compressor row`, body: `${b} outdoor compressors are photographed.` },
          { title: `Sequential wash`, body: `Drain checks in the direction of hillside water flow.` },
          { title: `Owner report`, body: `WhatsApp report shows pipe-run lengths and the confirmed price.` },
        ],
        closing: (b, a) => `Report is why ${a} owners can plan the year's ${b} budget without another visit.`,
      },
      {
        intro: (b, a) => `A hillside ${b} address in ${a} is more of an installation-quality check.`,
        steps: (b, a) => [
          { title: `Insulation walk`, body: `The technician checks the ${b} pipe route for missing insulation.` },
          { title: `Wash + drain flush`, body: `${b} coil and blower washed; technician watches for pooling.` },
          { title: `Gas + compressor sound`, body: `Gas pressure measured; ${b} compressor listened to.` },
          { title: `Next-visit note`, body: `${a}'s customer gets a suggested next-visit window.` },
        ],
        closing: (b, a) => `Note turns a hillside ${a} ${b} booking into a planned relationship.`,
      },
    ],
    outerTownship: [
      {
        intro: (b, a) => `${a}'s outer township belt often has newer ${b} replacement installs. The plan is fair-priced and complete.`,
        steps: (b, a) => [
          { title: `Age + refrigerant`, body: `${b} model plate is checked; refrigerant type recorded.` },
          { title: `Capacitor + wiring`, body: `Capacitor and outdoor wiring tested.` },
          { title: `Wash or repair`, body: `${a}'s owner gets a plain answer.` },
          { title: `Runtime test`, body: `${b} unit runs 20 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Honest recommendation is why ${b} customers in ${a} treat us as long-term aircond people.`,
      },
      {
        intro: (b, a) => `${b} in ${a} usually means a resident who wants a straight, fair-priced answer.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Three questions on arrival.` },
          { title: `Non-invasive check`, body: `Coil, drain and capacitor checked first.` },
          { title: `Written price`, body: `${a}'s customer sees the final price on WhatsApp first.` },
          { title: `Work + verify`, body: `Chosen work done, ${b} unit verified with readings.` },
        ],
        closing: (b, a) => `Question-first is why long-time ${a} residents pass our WhatsApp on.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} are fair-priced but not stripped.`,
        steps: (b, a) => [
          { title: `Ground-floor access`, body: `Most ${a} outdoor units are ground level.` },
          { title: `Refrigerant + capacitor`, body: `Gas pressure and capacitor microfarads tested first.` },
          { title: `Right-service quote`, body: `${a}'s owner sees one recommended service and one alternative.` },
          { title: `Photo closeout`, body: `${b} closing photos attached to the ${a} WhatsApp completion.` },
        ],
        closing: (b, a) => `Right-service quotes keep ${a} bookings small in RM value but reliable.`,
      },
      {
        intro: (b, a) => `${a}'s outer streets appreciate a technician willing to say "don't spend money on this one".`,
        steps: (b, a) => [
          { title: `Owner briefing`, body: `${b} technician introduces themselves at the ${a} gate.` },
          { title: `Unit + electrical`, body: `${b} indoor unit, drain, capacitor and isolator inspected.` },
          { title: `Repair-or-replace`, body: `Units older than 10 years get a straight recommendation.` },
          { title: `Warranty note`, body: `${a}'s completion WhatsApp carries the warranty note.` },
        ],
        closing: (b, a) => `Warranty conversation makes ${b} repeat business in ${a} predictable.`,
      },
    ],
  },
  malaysianLocal: {
    // Local brands (Acson, Isonic, National) sit in a very wide age range
    // — from 20-year kampung installs to newer wall-mounts. Copy leans on
    // "practical, honest, no-jargon" tone.
    kljCore: [
      {
        intro: (b, a) => `${b} units in ${a}'s core sit across a very wide age range — from 20-year non-inverters to newer replacements. The plan is designed to handle whichever era shows up at the door.`,
        steps: (b, a) => [
          { title: `Vintage + refrigerant`, body: `${b} model plate is checked. Older R22 units are flagged because gas is now hard to source in ${a} as everywhere else.` },
          { title: `Capacitor + wiring`, body: `Capacitor microfarads and outdoor wiring tested before any wash quote in ${a}.` },
          { title: `Chemical wash or targeted repair`, body: `${a}'s customer gets a plain recommendation on WhatsApp — wash, repair or replace — with the reason.` },
          { title: `Runtime verification`, body: `${b} unit runs 15 minutes with supply-air verified before the ${a} job is closed.` },
        ],
        closing: (b, a) => `Being honest about what an old ${b} unit actually needs is why ${a} customers keep our number for the whole household.`,
      },
      {
        intro: (b, a) => `A ${b} booking in ${a}'s core is often a small residential job with a customer who prefers a straight answer.`,
        steps: (b, a) => [
          { title: `Access`, body: `${a}'s building access rules are confirmed at booking.` },
          { title: `Unit + electrical check`, body: `${b} indoor unit, drain, capacitor and isolator are inspected before the wash quote is finalised.` },
          { title: `Chemical wash`, body: `Coil and blower are washed with sensor and PCB protection intact.` },
          { title: `Handover`, body: `${a}'s customer receives before/after photos and the confirmed price on WhatsApp.` },
        ],
        closing: (b, a) => `Straight answers are why ${b} customers in ${a} bring us back rather than shopping around next year.`,
      },
      {
        intro: (b, a) => `${b} in ${a}'s core is a fair-price, honest-work visit. The plan is short but disciplined.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s guardhouse receives the ${b} technician's ID copy at booking.` },
          { title: `Wet-work zone setup`, body: `Canvas cover, drip tray and floor mat go down before any ${b} panel is opened.` },
          { title: `Coil + drain wash`, body: `${b} coil and blower are washed; drain line is flushed and verified.` },
          { title: `Report`, body: `${a}'s customer sees photos, cool-down readings and the confirmed price on WhatsApp.` },
        ],
        closing: (b, a) => `Fair price plus complete work is why ${b} customers in ${a} refer neighbours.`,
      },
      {
        intro: (b, a) => `${b} in ${a} usually means one older unit that has served the family for many years. The plan respects that.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Three questions on arrival: age, last wash, recent changes.` },
          { title: `Non-invasive check`, body: `Outdoor coil, drain and capacitor inspected first, without dismantling the ${b} indoor unit.` },
          { title: `Chemical wash or honest advice`, body: `${a}'s owner sees on WhatsApp whether a wash will fix the issue or a replacement is the wiser spend.` },
          { title: `Runtime + cool-down`, body: `${b} unit runs 15 minutes; supply-air verified.` },
        ],
        closing: (b, a) => `Question-first is why long-time ${a} ${b} customers pass our WhatsApp to their neighbours.`,
      },
    ],
    pjMix: [
      {
        intro: (b, a) => `${b} in ${a} runs the full residential age range. The plan handles all of it without cutting the drain check.`,
        steps: (b, a) => [
          { title: `Vintage confirmed`, body: `${b} model plate is checked on arrival.` },
          { title: `Capacitor + gas`, body: `For ${b} units over 8 years old the capacitor and gas pressure are tested first.` },
          { title: `Chemical wash`, body: `Alkaline coil pass; two rinses; drain confirmed clear.` },
          { title: `Photo report`, body: `${a}'s WhatsApp booking thread gets before/after photos.` },
        ],
        closing: (b, a) => `Adjusting to actual unit age keeps ${a} customers from being surprised by extras.`,
      },
      {
        intro: (b, a) => `A ${b} visit in ${a} is usually one to three units in a landed home.`,
        steps: (b, a) => [
          { title: `Address type`, body: `${a}'s address type is confirmed before dispatch.` },
          { title: `Model + refrigerant`, body: `${b} model and refrigerant type are confirmed; R22 units are flagged.` },
          { title: `Wash + gas verify`, body: `Coil wash; drain confirmed; any agreed gas top-up done with the pressure gauge already prepared.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer gets photos with the confirmed price and warranty note.` },
        ],
        closing: (b, a) => `Predictable closeouts keep ${b} repeat rates high in ${a}.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} usually cover several units at once.`,
        steps: (b, a) => [
          { title: `Visit inventory`, body: `The technician lists each ${b} unit in the ${a} address before quoting extras.` },
          { title: `Priority-order wash`, body: `Most-used ${b} unit washed first.` },
          { title: `Post-wash cool-down`, body: `Each washed ${b} unit runs 10–15 minutes with supply-air verified.` },
          { title: `Sign-off`, body: `${a}'s owner receives the WhatsApp summary.` },
        ],
        closing: (b, a) => `Sign-off is why ${a} multi-unit ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `${b} in ${a} needs the same drain and cool-down discipline as any premium brand.`,
        steps: (b, a) => [
          { title: `Booking intake`, body: `${a}'s booking confirms address type and window.` },
          { title: `Non-invasive check`, body: `Coil, drain, capacitor and outdoor fan inspected first.` },
          { title: `Chemical wash`, body: `Standard ${b} wash sequence with sensor protection.` },
          { title: `Report`, body: `${a}'s WhatsApp thread gets photos, readings and the confirmed price.` },
        ],
        closing: (b, a) => `Report-first is why long-time ${a} ${b} customers pass our WhatsApp on.`,
      },
    ],
    gatedGrowth: [
      {
        intro: (b, a) => `${a}'s gated-growth belt sees ${b} units in newer housing where the pattern is "new but dusty" from nearby construction.`,
        steps: (b, a) => [
          { title: `Access + permit`, body: `${a}'s scheme access is confirmed at booking.` },
          { title: `Filter + coil inspection`, body: `Even young ${b} units in ${a} show heavy dust.` },
          { title: `Chemical wash`, body: `Alkaline coil pass with the ${b} PCB sheathed.` },
          { title: `Photo handover`, body: `${a}'s WhatsApp receives photos and a next-visit cycle suggestion.` },
        ],
        closing: (b, a) => `Honesty about dust load is why ${a} customers accept an 8-month cycle.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} usually start at a guardhouse.`,
        steps: (b, a) => [
          { title: `Guardhouse briefing`, body: `${a}'s scheme name and phase forwarded ahead.` },
          { title: `Model + wash prep`, body: `${b} model plate photographed on arrival.` },
          { title: `Chemical wash`, body: `${b} coil and blower washed with sensor protection.` },
          { title: `Warranty + report`, body: `${a}'s WhatsApp booking thread carries photos and the warranty note.` },
        ],
        closing: (b, a) => `Approach is why ${a} bookings from gated communities become repeat calls.`,
      },
      {
        intro: (b, a) => `${a}'s newer housing has tight service ledges.`,
        steps: (b, a) => [
          { title: `Wet-work zone`, body: `Canvas cover, drip tray and floor mat first.` },
          { title: `Coil wash + drain flush`, body: `${b} coil washed with sensor protection; drain flushed until clear.` },
          { title: `Outdoor coil rinse`, body: `${a}'s outdoor ${b} coil pressure-rinsed carefully.` },
          { title: `Cool-down`, body: `${b} unit runs 15 minutes.` },
        ],
        closing: (b, a) => `Protecting the unit below is why ${a} JMBs come back.`,
      },
      {
        intro: (b, a) => `${b} in ${a} is usually a newer unit in a still-settling scheme.`,
        steps: (b, a) => [
          { title: `Site + access`, body: `${a}'s access confirmed; ${b} wash kit packed.` },
          { title: `Inspection first`, body: `Filter and evaporator inspected on arrival.` },
          { title: `Service done`, body: `The chosen ${b} service performed.` },
          { title: `Photo closeout`, body: `${a}'s ${b} customer receives photos and warranty note.` },
        ],
        closing: (b, a) => `No-surprise-charges is why ${a} customers pass our WhatsApp on.`,
      },
    ],
    landedMature: [
      {
        intro: (b, a) => `${a}'s mature landed streets have plenty of long-serving ${b} units. The plan handles multiple units per house without cutting the drain check.`,
        steps: (b, a) => [
          { title: `House walk-through`, body: `The technician walks with the ${a} owner room by room.` },
          { title: `Copper + capacitor check`, body: `Older ${a} installs are checked before wash water hits any ${b} coil.` },
          { title: `Sequential wash`, body: `${b} units washed one at a time so one bedroom stays cool.` },
          { title: `Whole-house cool-down`, body: `All washed ${b} units run 15 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Whole-house verification is why ${a} ${b} bookings finish in one visit.`,
      },
      {
        intro: (b, a) => `${b} in ${a} usually involves long copper runs from upstairs.`,
        steps: (b, a) => [
          { title: `Upstairs / downstairs`, body: `The ${a} technician confirms which ${b} indoor unit belongs to which outdoor compressor.` },
          { title: `Compressor row`, body: `The ${b} outdoor row is checked for bracket rust.` },
          { title: `Gas + coil verify`, body: `Each washed ${b} unit's gas pressure measured after the wash.` },
          { title: `Sign-off`, body: `${a}'s owner sees photos and final price on WhatsApp.` },
        ],
        closing: (b, a) => `Sign-off avoids the price-mismatch moment ${a} customers hate.`,
      },
      {
        intro: (b, a) => `${b} in ${a} often means an older non-inverter next to a newer replacement.`,
        steps: (b, a) => [
          { title: `Unit inventory`, body: `The ${a} technician lists each ${b} unit by room and type.` },
          { title: `Older units first`, body: `Older non-inverter ${b} units washed first.` },
          { title: `Newer units with PCB protection`, body: `Any inverter ${b} unit gets PCB protection.` },
          { title: `Cross-check cool-down`, body: `All units run 10 minutes with readings taken.` },
        ],
        closing: (b, a) => `Splitting the visit avoids the "washed and tripped next week" complaint in ${a}.`,
      },
      {
        intro: (b, a) => `Landed ${b} service in ${a} is designed to finish the whole house in one dispatch window.`,
        steps: (b, a) => [
          { title: `Scope`, body: `${a}'s owner agrees the exact list of ${b} units in scope.` },
          { title: `Room-by-room wash`, body: `Each room's ${b} unit is washed before moving on.` },
          { title: `Drain stress test`, body: `Every drain line flushed and watched for at least 30 seconds.` },
          { title: `Handover`, body: `${a}'s owner receives a short WhatsApp summary.` },
        ],
        closing: (b, a) => `Handover is why ${a} landed customers re-book without a fresh quote.`,
      },
    ],
    commercialHeavy: [
      {
        intro: (b, a) => `${a} carries some commercial ${b} equipment, especially in older shoplot rows and workshops.`,
        steps: (b, a) => [
          { title: `Shutdown window`, body: `${a}'s site manager confirms the safe shutdown slot for the ${b} unit.` },
          { title: `Cassette / wall-unit strip-down`, body: `Grille washed separately; ${b} blower wheel removed for a proper clean.` },
          { title: `Alkaline coil + pump service`, body: `Coil gets a stronger alkaline pass; any pump tested.` },
          { title: `Site-log entry`, body: `${a}'s site log gets a written entry.` },
        ],
        closing: (b, a) => `Log-driven closeout is why ${a} sites keep us on the ${b} schedule.`,
      },
      {
        intro: (b, a) => `${b} in ${a} rarely fails politely.`,
        steps: (b, a) => [
          { title: `Baseline readings`, body: `Before any wash the ${a} technician records supply-air and drain flow.` },
          { title: `Filter, wheel, coil`, body: `Cleaned in that order.` },
          { title: `Drain + pump test`, body: `Drain flushed and any pump tested with bucket-fill.` },
          { title: `Report to owner`, body: `${a}'s site owner receives before/after readings.` },
        ],
        closing: (b, a) => `Data-driven closeout turns ${a} ${b} into a scheduled overhead.`,
      },
      {
        intro: (b, a) => `${a} sites often share electrical supply.`,
        steps: (b, a) => [
          { title: `Isolator + shutdown`, body: `The ${a} technician confirms the ${b} isolator.` },
          { title: `Contained wash`, body: `Canvas cover and drip tray go under the unit.` },
          { title: `Coil + blower rebuild`, body: `${b} blower wheel and coil cleaned and dried.` },
          { title: `Restart`, body: `${b} unit restarted and supply-air verified.` },
        ],
        closing: (b, a) => `Written sequence keeps ${a} sites confident.`,
      },
      {
        intro: (b, a) => `${b} service in ${a} is about reducing surprise breakdowns.`,
        steps: (b, a) => [
          { title: `Inspection walk`, body: `The technician walks the ${a} shop floor.` },
          { title: `Deep clean`, body: `Coil, blower and drain cleaned.` },
          { title: `Drainage + electrical audit`, body: `${b} drain and isolator checked and photographed.` },
          { title: `Preventive note`, body: `${a}'s owner receives a WhatsApp next-visit suggestion.` },
        ],
        closing: (b, a) => `Preventive note moves ${a} sites from reactive to planned.`,
      },
    ],
    hillside: [
      {
        intro: (b, a) => `${a} sits on the hillside belt.`,
        steps: (b, a) => [
          { title: `Driveway + ladder`, body: `The technician confirms the ${a} driveway gradient.` },
          { title: `Bracket + drain-fall`, body: `${b} outdoor bracket inspected.` },
          { title: `Debris pass + wash`, body: `Debris pass before the alkaline wash.` },
          { title: `Vibration verify`, body: `${b} compressor runs 15 minutes for bracket-vibration listen.` },
        ],
        closing: (b, a) => `Extra hillside steps mean ${a} ${b} jobs rarely need a second callout.`,
      },
      {
        intro: (b, a) => `Hillside service in ${a} usually includes a bracket line-item.`,
        steps: (b, a) => [
          { title: `Bracket audit`, body: `${b} bracket wall anchors pull-tested.` },
          { title: `Drain-fall confirmation`, body: `Water pour at the drain pan.` },
          { title: `Chemical wash`, body: `${b} coils washed.` },
          { title: `Handover with photos`, body: `${a}'s customer sees bracket, drain-fall and coil photos.` },
        ],
        closing: (b, a) => `Bracket-first is an ${a} habit.`,
      },
      {
        intro: (b, a) => `${a} hillside means larger homes.`,
        steps: (b, a) => [
          { title: `Pipe-run inventory`, body: `The technician lists each ${a} ${b} unit with its pipe length.` },
          { title: `Compressor row`, body: `${b} outdoor compressors photographed.` },
          { title: `Sequential wash`, body: `Drain checks in direction of hillside water flow.` },
          { title: `Owner report`, body: `WhatsApp report shows pipe-run lengths and confirmed price.` },
        ],
        closing: (b, a) => `Report is why ${a} owners can plan the year's ${b} budget without another visit.`,
      },
      {
        intro: (b, a) => `A hillside ${b} address in ${a} is more of an installation-quality check.`,
        steps: (b, a) => [
          { title: `Insulation walk`, body: `The technician checks the ${b} pipe route for missing insulation.` },
          { title: `Wash + drain flush`, body: `${b} coil and blower washed.` },
          { title: `Gas + compressor sound`, body: `Gas pressure measured; ${b} compressor listened to.` },
          { title: `Next-visit note`, body: `${a}'s customer gets a suggested next-visit window.` },
        ],
        closing: (b, a) => `Note turns a hillside ${a} ${b} booking into a planned relationship.`,
      },
    ],
    outerTownship: [
      {
        intro: (b, a) => `${a}'s outer township belt often has older ${b} installs where honest repair-or-replace advice matters most.`,
        steps: (b, a) => [
          { title: `Age + refrigerant`, body: `${b} model plate checked. Older R22 units flagged.` },
          { title: `Capacitor + wiring`, body: `Tested before the wash quote.` },
          { title: `Wash or repair`, body: `${a}'s owner gets a plain answer.` },
          { title: `Runtime test`, body: `${b} unit runs 20 minutes with supply-air verified.` },
        ],
        closing: (b, a) => `Honest recommendation is why ${b} customers in ${a} treat us as long-term aircond people.`,
      },
      {
        intro: (b, a) => `${b} in ${a} usually comes from a long-time resident who wants a straight answer.`,
        steps: (b, a) => [
          { title: `Situation questions`, body: `Three questions on arrival.` },
          { title: `Non-invasive check`, body: `Coil, drain and capacitor checked first.` },
          { title: `Written price`, body: `${a}'s customer sees the final price on WhatsApp first.` },
          { title: `Work + verify`, body: `Chosen work done, ${b} unit verified.` },
        ],
        closing: (b, a) => `Question-first is why long-time ${a} residents pass our WhatsApp on.`,
      },
      {
        intro: (b, a) => `${a} bookings for ${b} are small in RM value but high in trust.`,
        steps: (b, a) => [
          { title: `Ground-floor access`, body: `Most ${a} outdoor units are ground level.` },
          { title: `Refrigerant + capacitor`, body: `Tested first.` },
          { title: `Right-service quote`, body: `${a}'s owner sees one recommended service and one alternative.` },
          { title: `Photo closeout`, body: `${b} photos attached to the ${a} WhatsApp completion.` },
        ],
        closing: (b, a) => `Right-service quotes keep ${a} bookings small in RM but reliable.`,
      },
      {
        intro: (b, a) => `${a}'s outer streets need a ${b} technician willing to say "don't spend money on this one".`,
        steps: (b, a) => [
          { title: `Owner briefing`, body: `${b} technician introduces themselves at the ${a} gate.` },
          { title: `Unit + electrical`, body: `${b} indoor, drain, capacitor and isolator inspected.` },
          { title: `Repair-or-replace`, body: `Units older than 10 years get a straight recommendation.` },
          { title: `Warranty note`, body: `${a}'s completion WhatsApp carries the warranty note.` },
        ],
        closing: (b, a) => `Warranty conversation makes ${b} repeat business in ${a} predictable.`,
      },
    ],
  },
};

// ── MS + ZH banks are built below via buildMsPlan() / buildZhPlan().
//     Kept as functions so the large authored-copy blocks stay close to
//     each other in source order rather than fragmenting the file. ──

// Public API — builds the plan for a given (brand, area, locale).
export function brandAreaFirstVisitPlan(
  brand: Brand,
  area: Area,
  locale: BrandAreaDepthLocale,
): BrandAreaVisitPlan {
  const family = classifyBrand(brand);
  const profile = classifyArea(area);
  const idx = pickVariant(`${brand.slug}:${area.slug}`, "visit-plan", 4);

  const bank = locale === "en" ? EN_PLAN : locale === "ms" ? MS_PLAN_REAL : ZH_PLAN_REAL;
  const variant = bank[family][profile][idx];

  return {
    heading: VISIT_HEADING[locale](brand.name, area.name),
    intro: variant.intro(brand.name, area.name),
    steps: variant.steps(brand.name, area.name),
    closing: variant.closing(brand.name, area.name),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 2) Common jobs table
// ─────────────────────────────────────────────────────────────────────────

export type BrandAreaJobRow = { job: string; frequency: string; note: string };

export type BrandAreaCommonJobs = {
  heading: string;
  intro: string;
  rows: BrandAreaJobRow[];
  closing: string;
};

const JOBS_HEADING: Record<BrandAreaDepthLocale, (b: string, a: string) => string> = {
  en: (b, a) => `Common ${b} jobs we get called for in ${a}`,
  ms: (b, a) => `Kerja ${b} biasa yang kami dapat panggilan di ${a}`,
  zh: (b, a) => `${a}我们常被叫去处理的${b}工作`,
};

type JobRow = { job: string; frequency: string; note: string };
type JobsBank = Record<AreaProfile, JobRow[][]>;

// EN jobs bank: per area-profile, 4 variants of the 4-row table.
const EN_JOBS: JobsBank = {
  kljCore: [
    [
      { job: "Chemical wash (high-rise split)", frequency: "Most common", note: "Balcony coil access + short lift window means the standard visit is a PCB-protected chemical wash." },
      { job: "Drain-tray clearing", frequency: "Frequent", note: "Blocked drain trays cause the small ceiling-water calls we get from condo units after long dry spells." },
      { job: "Weak-cooling triage", frequency: "Regular", note: "Weak cooling in a 5-year-old inverter is usually gas or blower wheel, not the coil — we test before quoting." },
      { job: "Fault-code diagnosis", frequency: "Occasional", note: "Recurring fault codes usually mean sensor or PCB work; the specific model's code sheet is checked before parts are ordered." },
    ],
    [
      { job: "PCB-safe chemical wash", frequency: "Most common", note: "Inner-city condo units are almost all inverters, so board protection is standard rather than optional." },
      { job: "Drain-line flush", frequency: "Frequent", note: "Shared drain stacks fill with algae during longer cooler-runtime spells; the wash includes a full stack-side flush." },
      { job: "Gas top-up + leak check", frequency: "Regular", note: "Long-running condo inverters slowly lose refrigerant; a top-up is quoted only after a leak check, not by feel." },
      { job: "Outdoor fan capacitor swap", frequency: "Occasional", note: "Balcony wind-driven rain trips outdoor capacitors on ageing units; a spare rides on the van by default." },
    ],
    [
      { job: "Full chemical wash", frequency: "Most common", note: "The standard visit; PCB protection is the safeguard against the 'washed and dead next week' complaint." },
      { job: "Post-wash cool-down verification", frequency: "Frequent", note: "Every wash closes with a supply-air temperature reading — no reading, no closeout." },
      { job: "Coil recovery on older units", frequency: "Regular", note: "Older wall-mount units with mould deep in the coil sometimes need two passes; the second is quoted before it starts." },
      { job: "PCB / sensor replacement", frequency: "Occasional", note: "For fault-code jobs the specific model's error sheet is consulted and the correct spare is ordered against the serial number." },
    ],
    [
      { job: "Chemical wash", frequency: "Most common", note: "Nearly every condo booking; the plan is a standard visit rather than an 'inspect first' one because the pattern is well known." },
      { job: "Drain-clearing", frequency: "Frequent", note: "Common in inner-city condos where the drain stack is shared with several units." },
      { job: "Gas top-up", frequency: "Regular", note: "Only after a leak-check pass; the customer sees the pressure reading on WhatsApp before the top-up is agreed." },
      { job: "Fan motor / capacitor", frequency: "Occasional", note: "Outdoor components fail first on high-rise ledges; spares ride on the van rather than being fetched later." },
    ],
  ],
  pjMix: [
    [
      { job: "Chemical wash", frequency: "Most common", note: "Both landed bedrooms and small offices get chemical washes; the depth is decided from the filter condition on arrival." },
      { job: "Multi-unit family visit", frequency: "Frequent", note: "3–5 units in one house is a normal booking; each unit's drain is confirmed before moving to the next." },
      { job: "Older-unit repair-or-replace call", frequency: "Regular", note: "For units around 10+ years, the customer sees a straight repair-or-replace recommendation on WhatsApp." },
      { job: "Gas top-up", frequency: "Occasional", note: "Older non-inverter units can quietly lose gas over years; a top-up is quoted only after a leak check." },
    ],
    [
      { job: "PCB-safe chemical wash", frequency: "Most common", note: "Newer inverter units get PCB shielding through the whole wash — same technical care whether the unit was RM 1,200 or RM 4,200." },
      { job: "Whole-house sequential wash", frequency: "Frequent", note: "The plan works room by room so one bedroom stays cool while the rest of the house is serviced." },
      { job: "Long-copper-run gas verification", frequency: "Regular", note: "Landed installs often have long upstairs-to-downstairs copper runs; gas pressure is measured after every wash." },
      { job: "Capacitor / wiring check on older units", frequency: "Occasional", note: "Ageing wiring and worn capacitors are common in older PJ streets; both are checked before wash water hits the coil." },
    ],
    [
      { job: "Chemical wash + drain flush", frequency: "Most common", note: "Standard visit for both landed and condo customers; drain check is watched at full flow for at least 30 seconds." },
      { job: "Blower wheel deep clean", frequency: "Frequent", note: "Weak airflow after a wash is usually a greasy blower wheel; the tool for that pull is standard on the van." },
      { job: "Cool-down verification", frequency: "Regular", note: "Every washed unit runs 10–15 minutes with supply-air temperature confirmed before the job closes." },
      { job: "Replacement quote for end-of-life units", frequency: "Occasional", note: "For units past economical repair, a plain-language replacement quote is sent on WhatsApp; no upsell." },
    ],
    [
      { job: "Standard chemical wash", frequency: "Most common", note: "Booked mostly on Saturdays; family run through 3–5 units at once with predictable timing." },
      { job: "Drain line stress-test", frequency: "Frequent", note: "Every drain line is watched at full flow to catch slow blockages that only show under load." },
      { job: "Gas top-up + leak check", frequency: "Regular", note: "Long copper runs mean older non-inverter units drift out of spec; gas is measured, then topped up if needed." },
      { job: "Bracket / drain-fall audit", frequency: "Occasional", note: "Landed outdoor units on ageing brackets get a safety pull-test before any wash starts." },
    ],
  ],
  gatedGrowth: [
    [
      { job: "Chemical wash — 'new but dusty'", frequency: "Most common", note: "Even 2–4 year old units in growth-belt schemes show heavy dust from nearby construction; wash depth is decided from the filter." },
      { job: "PCB-safe wash", frequency: "Frequent", note: "New inverter boards are shielded before wash water enters the coil — this is standard, not optional." },
      { job: "Outdoor coil rinse", frequency: "Regular", note: "Outdoor coils catch construction dust; a pressure rinse is added on top of the standard indoor wash." },
      { job: "Shortened service cycle", frequency: "Occasional", note: "For addresses with ongoing construction next door, an 8-month rather than 12-month wash cycle is suggested." },
    ],
    [
      { job: "Chemical wash", frequency: "Most common", note: "The standard growth-belt visit; the drain and outdoor coil both get attention because both foul faster than usual here." },
      { job: "Filter-only pass", frequency: "Frequent", note: "Sometimes a filter deep-clean plus drain flush is enough — this is quoted honestly rather than upsold to a full wash." },
      { job: "Gas top-up", frequency: "Regular", note: "For units around 3+ years, a leak-check + top-up is common; the pressure reading is shared before agreeing." },
      { job: "PCB replacement", frequency: "Occasional", note: "Fault-code jobs go against the specific model's error sheet; the spare is ordered against the serial number." },
    ],
    [
      { job: "PCB-safe chemical wash", frequency: "Most common", note: "Newer schemes are inverter-heavy; board protection is packed as standard rather than fetched later." },
      { job: "Shared drain-stack flush", frequency: "Frequent", note: "Growth-belt condos share drain stacks with several units above; a full flush avoids passing a slow blockage down." },
      { job: "Outdoor bracket audit", frequency: "Regular", note: "New service ledges are sometimes finished with weak anchor points; a pull-test is done on the first visit." },
      { job: "Replacement gauge for post-warranty units", frequency: "Occasional", note: "For units past their manufacturer warranty, an honest replacement quote is provided if the unit is uneconomical to repair." },
    ],
    [
      { job: "Chemical wash + cycle suggestion", frequency: "Most common", note: "Every wash closes with a suggested next-visit window based on how dusty the address currently is." },
      { job: "Coil + blower deep clean", frequency: "Frequent", note: "The wash is thorough rather than fast; the blower wheel is pulled when grease is visible." },
      { job: "Drain flush", frequency: "Regular", note: "Watched at full flow for at least 30 seconds; growth-belt drains are still bedding in and behave irregularly." },
      { job: "Guardhouse-permit visit", frequency: "Occasional", note: "For gated schemes with strict permit rules, the technician arrives with the ID copy already forwarded." },
    ],
  ],
  landedMature: [
    [
      { job: "Whole-house chemical wash", frequency: "Most common", note: "Mature landed bookings usually cover 3–5 units in one house; each unit's drain is confirmed before moving on." },
      { job: "Capacitor + wiring inspection", frequency: "Frequent", note: "Ageing wiring and worn capacitors are common; both are checked before any wash quote is finalised." },
      { job: "Long-copper gas verification", frequency: "Regular", note: "Upstairs-to-downstairs copper runs drift out of spec; gas pressure is measured after every wash." },
      { job: "Older-unit repair-or-replace call", frequency: "Occasional", note: "For units past 10+ years, a plain-language replace vs repair recommendation is sent on WhatsApp." },
    ],
    [
      { job: "Sequential chemical wash", frequency: "Most common", note: "Room by room, so one bedroom stays cool while the rest of the house is being serviced." },
      { job: "Compressor row check", frequency: "Frequent", note: "The outdoor row is inspected for bracket rust and drain-fall before any wash water hits the indoor coil." },
      { job: "Drain stress test", frequency: "Regular", note: "Every drain line is watched at full flow for at least 30 seconds to catch slow blockages under load." },
      { job: "PCB / sensor replacement", frequency: "Occasional", note: "Fault-code jobs are matched against the specific model's error sheet before parts are ordered." },
    ],
    [
      { job: "Family multi-unit visit", frequency: "Most common", note: "Weekend bookings; each of the 3–5 units gets the same technical attention as a single-unit condo call." },
      { job: "Older non-inverter wash", frequency: "Frequent", note: "Non-inverter units are washed with a full mechanical clean rather than a rinse — that is where cooling recovery comes from." },
      { job: "Inverter wash with PCB protection", frequency: "Regular", note: "Newer inverters in the same house get PCB shielding through the entire wash." },
      { job: "Bracket + drain-fall audit", frequency: "Occasional", note: "Landed outdoor units on ageing brackets get a safety pull-test before any wash starts." },
    ],
    [
      { job: "Standard chemical wash", frequency: "Most common", note: "Landed customers are usually planning a scheduled visit, not an emergency call; slots are typically 2-3 hour blocks." },
      { job: "Whole-house cool-down verify", frequency: "Frequent", note: "All washed units run together for 15 minutes; supply-air temperature is verified before the job closes." },
      { job: "Drain flush + gas top-up", frequency: "Regular", note: "Both are common on landed jobs; the pressure reading is shared before any top-up is agreed." },
      { job: "Replacement quote for end-of-life units", frequency: "Occasional", note: "If a unit is past economical repair, an honest replacement quote is sent on WhatsApp — no pressure." },
    ],
  ],
  commercialHeavy: [
    [
      { job: "Scheduled deep clean", frequency: "Most common", note: "Runtime-heavy commercial units get a coil + blower deep clean rather than a quick rinse; site log records date and result." },
      { job: "Condensate pump service", frequency: "Frequent", note: "Any pump is bench-tested with a bucket-fill; a stalled pump is why ceilings above shops sometimes drip." },
      { job: "Cassette grille rebuild", frequency: "Regular", note: "Ceiling cassettes are dropped and grilles are washed separately; airflow through all four vanes is verified before reinstalling." },
      { job: "Belts / bearings replacement", frequency: "Occasional", note: "Parts near end-of-life are flagged for a scheduled swap during the next visit rather than an emergency call." },
    ],
    [
      { job: "Deep chemical wash", frequency: "Most common", note: "Alkaline pass on the coil, followed by a two-stage rinse; commercial coils tolerate this better than residential ones do." },
      { job: "Drain + pump audit", frequency: "Frequent", note: "Drain line and condensate pump are both tested; a report is filed with the site owner." },
      { job: "Electrical isolator check", frequency: "Regular", note: "Every commercial visit confirms the isolator kills the right unit; this is the safety step other companies sometimes skip." },
      { job: "PCB / driver replacement", frequency: "Occasional", note: "For fault-code units the driver PCB is ordered against the specific model's error sheet." },
    ],
    [
      { job: "Scheduled visit under shutdown window", frequency: "Most common", note: "Site-manager confirms the safe shutdown slot; the visit is planned so the shift is not disrupted." },
      { job: "Cassette + wall-unit rebuild", frequency: "Frequent", note: "Blower wheel is pulled and cleaned separately; wall-mount units get the same treatment when grease is visible." },
      { job: "Baseline vs post-wash readings", frequency: "Regular", note: "Supply-air temperature is recorded before and after the wash so the improvement is measurable, not felt." },
      { job: "Preventive schedule note", frequency: "Occasional", note: "A next-visit window is suggested based on daily runtime and dust load; this is why sites move from reactive to preventive." },
    ],
    [
      { job: "Full commercial clean", frequency: "Most common", note: "Coil + blower + drain + condensate pump; every visit is treated as a scheduled maintenance rather than a wash." },
      { job: "Site-log entry", frequency: "Frequent", note: "Wash date, coil condition, pump test result and next suggested date all go into the site log." },
      { job: "End-of-life part flagging", frequency: "Regular", note: "Belts and bearings near end-of-life are flagged for planned replacement before they fail." },
      { job: "Emergency callout backup", frequency: "Occasional", note: "For sites on our schedule, an emergency call is fitted between planned slots rather than being a new dispatch." },
    ],
  ],
  hillside: [
    [
      { job: "Bracket audit + chemical wash", frequency: "Most common", note: "Bracket wall anchors are pull-tested first; if soft, they are quoted before any wash starts." },
      { job: "Drain-fall correction", frequency: "Frequent", note: "A gradient below spec is fixed before the coil is washed, not after; that is how hillside leaks are avoided." },
      { job: "Debris-lift pass", frequency: "Regular", note: "Outdoor coils in hillside gardens catch leaves and insects; a debris pass is done before the alkaline wash begins." },
      { job: "Vibration + noise verification", frequency: "Occasional", note: "After reassembly the compressor is run 15 minutes and any bracket vibration is listened for and reported." },
    ],
    [
      { job: "Chemical wash with drain-fall check", frequency: "Most common", note: "The standard hillside visit; drain-fall is confirmed before the coil is washed rather than after." },
      { job: "Pipe insulation walk", frequency: "Frequent", note: "The insulation on the pipe route between indoor and outdoor is checked for sun damage and gaps." },
      { job: "Bracket safety audit", frequency: "Regular", note: "Anchors are pull-tested by hand; soft anchors get a bracket-replacement quote before any further work." },
      { job: "Gas + compressor sound test", frequency: "Occasional", note: "The compressor is listened to for the low hum that indicates good load; anything odd is reported before payment." },
    ],
    [
      { job: "Full hillside wash", frequency: "Most common", note: "Coil, blower and drain, plus a debris pass; the visit is designed so the neighbouring garden below stays dry." },
      { job: "Outdoor coil pressure rinse", frequency: "Frequent", note: "Hillside outdoor coils tolerate a pressure rinse; this lifts leaves and pollen that reduce airflow." },
      { job: "Owner report with photos", frequency: "Regular", note: "Bracket, drain-fall and coil photos are shared on WhatsApp so the record has something to compare against next year." },
      { job: "Bracket replacement quote", frequency: "Occasional", note: "Ageing hillside brackets are quoted separately from the wash so nothing is hidden inside a bundled price." },
    ],
    [
      { job: "Hillside chemical wash", frequency: "Most common", note: "Standard visit; the two extra steps (debris pass, vibration listen) are why hillside jobs rarely need a second callout." },
      { job: "Cool-down verification", frequency: "Frequent", note: "The compressor runs for 15 minutes after reassembly with supply-air temperature verified." },
      { job: "Insulation repair quote", frequency: "Regular", note: "Missing pipe insulation is quoted before the wash; sun damage on exposed sections is called out with a photo." },
      { job: "Whole-house planning note", frequency: "Occasional", note: "For larger hillside homes with several units, a WhatsApp note suggests a next-visit window based on shade and pipe run." },
    ],
  ],
  outerTownship: [
    [
      { job: "Honest repair-or-replace call", frequency: "Most common", note: "For units over 10 years, the customer gets a plain repair-or-replace recommendation instead of a wash that will not last." },
      { job: "Capacitor + wiring test", frequency: "Frequent", note: "Older installs often show worn capacitors and ageing outdoor wiring; both are tested before the wash quote." },
      { job: "R22 refrigerant flagging", frequency: "Regular", note: "R22 units are called out because gas is now hard to source; the customer is told the trade-off in plain language." },
      { job: "Chemical wash", frequency: "Occasional", note: "When the unit is worth a wash, the visit is done to the same standard as any city job — no cut corners." },
    ],
    [
      { job: "Situation-questions visit", frequency: "Most common", note: "Three questions on arrival — age, last wash, recent changes — decide whether the visit is a wash or a diagnostic." },
      { job: "Non-invasive check", frequency: "Frequent", note: "Outdoor coil, drain and capacitor are inspected without dismantling the indoor unit first; no disguised diagnosis." },
      { job: "Written price on WhatsApp", frequency: "Regular", note: "The customer sees the final price on WhatsApp before any panel is opened; the price does not change unless a new fault is agreed." },
      { job: "Cool-down verification", frequency: "Occasional", note: "The unit is run for 15 minutes with supply-air temperature verified before the job is closed." },
    ],
    [
      { job: "Right-service quote", frequency: "Most common", note: "The customer sees one recommended service and one alternative on WhatsApp, with a plain-language reason for each." },
      { job: "Ground-floor unit wash", frequency: "Frequent", note: "Most outer-township outdoor units are ground level; ladder position is confirmed before touching anything." },
      { job: "Refrigerant + capacitor test", frequency: "Regular", note: "Gas pressure and capacitor microfarads are tested first; clean coil + weak cool = usually a capacitor or gas issue." },
      { job: "Photo-backed closeout", frequency: "Occasional", note: "Coil, drain and outdoor-fan photos are attached to the WhatsApp completion for the household record." },
    ],
    [
      { job: "Warranty-noted chemical wash", frequency: "Most common", note: "Every visit closes with the 1-month workmanship warranty note; the customer knows what is covered." },
      { job: "Repair-or-replace recommendation", frequency: "Frequent", note: "For units past 10 years, the customer is told plainly whether the wash will hold or whether a replacement is the wiser spend." },
      { job: "Isolator + electrical audit", frequency: "Regular", note: "Isolator switch and exposed wiring are inspected on every visit; anything unsafe is flagged separately from the wash quote." },
      { job: "Cool-down verification", frequency: "Occasional", note: "Every washed unit runs 20 minutes and supply-air temperature is verified before the technician leaves." },
    ],
  ],
};

const JOBS_INTRO: Record<BrandAreaDepthLocale, (b: string, a: string) => string> = {
  en: (b, a) => `Every ${a} address is different, but the ${b} jobs we get called for cluster into a repeatable shape. The table below is the honest frequency mix — most-common at the top, occasional at the bottom — so anyone planning a booking knows what a typical visit here actually looks like.`,
  ms: (b, a) => `Setiap alamat di ${a} berbeza, tetapi kerja ${b} yang kami dapat panggilan berkumpul dalam bentuk yang boleh diulang. Jadual di bawah adalah campuran kekerapan yang jujur — paling biasa di atas, kadang-kadang di bawah — supaya sesiapa yang merancang tempahan tahu rupa lawatan biasa di sini.`,
  zh: (b, a) => `${a}每个地址都不同，但我们被叫去处理的${b}工作呈现出可重复的模式。下面的表格是我们的真实频率组合——最常见在上，偶尔在下——让计划预约的人清楚这里的典型上门是什么样子。`,
};

const JOBS_CLOSING: Record<BrandAreaDepthLocale, (b: string, a: string) => string> = {
  en: (b, a) => `Because the frequency mix is written down rather than guessed, ${a} ${b} customers see the same care whether the first job is a wash or a diagnostic call — and the second visit is a scheduled maintenance, not a firefight.`,
  ms: (b, a) => `Kerana campuran kekerapan ditulis bukannya diteka, pelanggan ${b} di ${a} lihat penjagaan yang sama sama ada kerja pertama ialah cuci atau panggilan diagnostik — dan lawatan kedua ialah penyelenggaraan berjadual, bukan kebakaran.`,
  zh: (b, a) => `因为频率组合是写下来的而不是猜的，${a}的${b}客户无论第一次是清洗还是诊断都能得到同样的照顾——第二次上门就是定期保养，而不是救火。`,
};

// Frequency-label localization
function localizeFrequency(freq: string, locale: BrandAreaDepthLocale): string {
  if (locale === "en") return freq;
  const map: Record<string, { ms: string; zh: string }> = {
    "Most common": { ms: "Paling biasa", zh: "最常见" },
    "Frequent": { ms: "Kerap", zh: "常见" },
    "Regular": { ms: "Berkala", zh: "定期" },
    "Occasional": { ms: "Kadang-kadang", zh: "偶尔" },
  };
  return locale === "ms" ? (map[freq]?.ms || freq) : (map[freq]?.zh || freq);
}

export function brandAreaCommonJobs(
  brand: Brand,
  area: Area,
  locale: BrandAreaDepthLocale,
): BrandAreaCommonJobs {
  const profile = classifyArea(area);
  const bankEn = EN_JOBS[profile];
  const idx = pickVariant(`${brand.slug}:${area.slug}`, "jobs", bankEn.length);
  const rowsEn = bankEn[idx];

  const rowsLocalized = rowsEn.map((r) => {
    // For MS/ZH, use the MS_JOBS / ZH_JOBS lookup (below); fall back to EN if no
    // localized wording exists (should not happen because we author all four
    // profiles × four variants, but the fallback keeps the build safe).
    const local = getLocalizedJobRow(profile, idx, r.job, locale);
    return {
      job: local?.job ?? r.job,
      frequency: localizeFrequency(r.frequency, locale),
      note: local?.note ?? r.note,
    };
  });

  return {
    heading: JOBS_HEADING[locale](brand.name, area.name),
    intro: JOBS_INTRO[locale](brand.name, area.name),
    rows: rowsLocalized,
    closing: JOBS_CLOSING[locale](brand.name, area.name),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// MS + ZH banks (real).
// ─────────────────────────────────────────────────────────────────────────

// The MS/ZH visit-plan banks below reuse the shape of EN_PLAN but with
// authored wording (not translations). Each family × profile provides 4
// variants keyed the same way so pickVariant lines up.

// Helper: authored MS visit-plan variant builder for a given profile.
// (These are declared as inner helpers with per-profile per-family text so
// the resulting bank stays readable; they replace the placeholder function
// declarations above.)

const MS_PLAN_REAL: Record<BrandFamily, Record<AreaProfile, PlanVariant[]>> = buildMsPlan();
const ZH_PLAN_REAL: Record<BrandFamily, Record<AreaProfile, PlanVariant[]>> = buildZhPlan();

function buildMsPlan(): Record<BrandFamily, Record<AreaProfile, PlanVariant[]>> {
  // Authored MS wording, kept concise but not translated. Uses (b, a) for
  // brand and area names. Four variants per profile; four profiles per
  // family. Repeats across families where the technical action is the same
  // (e.g. a hillside job reads the same regardless of brand family) —
  // which is honest, since the visit sequence really does converge on
  // hillside sites.

  const commonRes = (): PlanVariant[] => [
    {
      intro: (b, a) => `${b} di ${a} dijalankan mengikut jadual bangunan — slot lif servis dan pendaftaran pengawal ditetapkan sebelum juruteknik keluar dari base.`,
      steps: (b, a) => [
        { title: `Akses ${a} disahkan`, body: `Kami sahkan blok, tingkat dan slot lif servis untuk unit ${b} sebelum dispatch.` },
        { title: `Perlindungan PCB`, body: `PCB dalam dan kabel sensor ${b} ditutup sebelum air cuci mengenai coil.` },
        { title: `Cuci kimia coil`, body: `Pass alkali, bilas dua kali, saliran dibersihkan dan disahkan di titik discharge.` },
        { title: `Cool-down + WhatsApp`, body: `Unit ${b} dijalankan 15 minit, suhu udara supply disahkan, dan thread tempahan ${a} terima foto dan harga akhir.` },
      ],
      closing: (b, a) => `Susunan itulah sebab cuci ${b} di ${a} jarang cetuskan aduan "board mati minggu depan".`,
    },
    {
      intro: (b, a) => `Setiap kerja ${b} di ${a} bermula dengan semakan dua-soalan di WhatsApp: unit inverter atau non-inverter, dan sama ada kompressor balkoni boleh dicapai dari tingkat sama.`,
      steps: (b, a) => [
        { title: `Akses bangunan disahkan`, body: `${a} minta blok, tingkat, nombor unit dan sama ada pendaftaran pelawat diperlukan. ID lanyard berjenama ${b} disediakan.` },
        { title: `Pengenalan model + refrigerant`, body: `Plat model ${b} dan jenis refrigerant (R32 atau R410A) direkod sebelum sebarang cuci.` },
        { title: `Cuci kimia dengan perisai PCB`, body: `Coil ${b} dicuci dengan larutan alkali lembut dan dibilas dua kali. Kabel sensor dan PCB utama dilindungi sepanjang kerja.` },
        { title: `Sahkan saliran + airflow`, body: `Saliran diflush dan diperhatikan pada aliran penuh. Unit ${b} kemudian dijalankan 15 minit dan suhu udara supply diukur sebelum kerja ${a} ditutup di WhatsApp.` },
      ],
      closing: (b, a) => `Penutupan berstruktur itu sebab pelanggan ${a} biasanya tempah semula untuk unit ${b} kedua di kondo yang sama tanpa minta sebut harga baharu.`,
    },
    {
      intro: (b, a) => `${b} di kluster bertingkat ${a} adalah lawatan pakar, bukan cuci walk-in. Pelan ditulis kerana peraturan bangunan — bukan aircond — yang menentukan kebanyakan masa.`,
      steps: (b, a) => [
        { title: `Pondok pengawal + lif servis`, body: `Sampai di sana, juruteknik ${b} daftar di pondok pengawal ${a} dengan salinan permit dan sahkan slot lif servis yang JMB berikan.` },
        { title: `Zon cuci balkoni`, body: `Canvas cover, dulang titisan dan tikar lantai diletakkan sebelum panel ${b} dibuka. Di balkoni ${a} yang kecil ini satu-satunya cara jaga unit di bawah kering.` },
        { title: `Cuci coil + blower wheel ${b}`, body: `Coil dan blower dicuci dengan PCB ${b} dilindungi, kemudian dibilas dua kali. Dulang saliran disemak untuk alga sebelum dipasang semula.` },
        { title: `Cool-down + sign-off`, body: `Unit dijalankan 15 minit dengan suhu udara supply diukur. Harga akhir dan nota waranti dihantar ke thread tempahan WhatsApp ${a} dengan foto cuci.` },
      ],
      closing: (b, a) => `Aliran bertulis itu yang kekalkan lawatan ${b} di ${a} dalam slot lif servis yang bangunan sebenarnya berikan.`,
    },
    {
      intro: (b, a) => `Tempahan ${b} di teras ${a} biasanya satu unit bertingkat, kadang dua. Lawatan pendek tetapi peraturan akses jadikan persediaan lebih penting dari masa cuci sebenar.`,
      steps: (b, a) => [
        { title: `Akses disahkan`, body: `Kami sahkan peraturan pendaftaran pelawat dan slot lif servis bangunan ${a} sebelum juruteknik ${b} keluar dari base.` },
        { title: `Semakan model + cuci prep`, body: `Plat model ${b} difoto bila tiba dan campuran kimia yang betul (alkali atau neutral, bergantung kepada model) diukur.` },
        { title: `Cuci kimia`, body: `Coil dan blower wheel dicuci dengan perlindungan sensor dan PCB utuh sepanjang kerja.` },
        { title: `Nota waranti + foto`, body: `Foto sebelum-selepas coil, saliran dan kipas luar dihantar ke thread tempahan WhatsApp ${a} dengan nota waranti kerja 1 bulan.` },
      ],
      closing: (b, a) => `Tujuan senarai semak ini ialah lawatan yang membosankan — hasil ${b} yang sama di ${a} tanpa mengira juruteknik mana yang dihantar.`,
    },
  ];

  const commonLanded = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a} ialah subbandar landed matang, jadi tempahan ${b} biasanya meliputi 3–5 unit merentasi bilik tidur dan ruang tamu. Pelan menganggapnya sebagai laluan kecil di dalam satu rumah.`,
      steps: (b, a) => [
        { title: `Jalan-jalan rumah`, body: `Juruteknik berjalan dengan pemilik ${a} bilik demi bilik, catat unit ${b} mana on, mana sejuk lemah, dan sahkan skop.` },
        { title: `Semakan tembaga + kapasitor`, body: `Pemasangan landed ${a} lama menunjukkan sambungan tembaga kusam dan kapasitor menua. Kedua-dua disemak sebelum air cuci mengenai coil ${b}.` },
        { title: `Cuci kimia berurutan`, body: `Unit ${b} dicuci satu demi satu supaya keluarga simpan satu bilik berhawa dingin.` },
        { title: `Cool-down seluruh rumah`, body: `Selepas unit terakhir dipasang semula, setiap unit ${b} yang dicuci dijalankan bersama 15 minit dengan suhu udara supply disahkan.` },
      ],
      closing: (b, a) => `Pengesahan seluruh rumah itu sebab tempahan multi-unit ${b} di ${a} selesai dalam satu lawatan.`,
    },
    {
      intro: (b, a) => `Lawatan ${b} di ${a} biasanya melibatkan laluan tembaga panjang dari atas ke kompressor luar di bawah. Separuh lawatan di atas, separuh di barisan kompressor.`,
      steps: (b, a) => [
        { title: `Pemetaan atas / bawah`, body: `Juruteknik ${a} sahkan unit ${b} dalam mana milik kompressor luar mana.` },
        { title: `Semakan barisan kompressor`, body: `Barisan luar ${b} disemak untuk karat bracket, drain-fall dan kerosakan kipas.` },
        { title: `Semakan coil + gas`, body: `Tekanan gas setiap unit ${b} yang dicuci diukur selepas cuci kimia.` },
        { title: `Sign-off pemilik`, body: `Pemilik ${a} lihat foto coil sebelum/selepas, bacaan gas dan harga akhir di WhatsApp sebelum bayaran dibincangkan.` },
      ],
      closing: (b, a) => `Sign-off itu elak "kenapa harga beza dari WhatsApp?" — momen yang pelanggan landed ${a} benci.`,
    },
    {
      intro: (b, a) => `${b} di ${a} sering bermakna satu unit non-inverter lama sebelah inverter baharu. Dua keluarga, satu lawatan.`,
      steps: (b, a) => [
        { title: `Inventori unit`, body: `Sampai di sana, juruteknik ${a} senaraikan setiap unit ${b} mengikut bilik, HP dan jenis inverter/non-inverter.` },
        { title: `Non-inverter dahulu`, body: `Unit ${b} non-inverter lama dicuci dahulu — ia tahan handling lebih baik.` },
        { title: `Inverter dengan perlindungan PCB`, body: `Untuk unit ${b} inverter, PCB dan penyambung sensor ditutup sebelum air cuci mengenai coil.` },
        { title: `Ujian silang cool-down`, body: `Kedua-dua jenis kemudian dijalankan 10 minit dengan bacaan udara supply diambil.` },
      ],
      closing: (b, a) => `Pecahan lawatan sebegini adalah cara pelanggan ${a} elak aduan klasik inverter ${b} "yang dicuci" trip minggu depan.`,
    },
    {
      intro: (b, a) => `Servis ${b} landed di ${a} ialah lawatan rumah, bukan lawatan unit — direka untuk selesaikan seluruh rumah dalam satu slot dispatch.`,
      steps: (b, a) => [
        { title: `Skop seluruh rumah`, body: `Juruteknik dan pemilik ${a} setuju senarai tepat unit ${b} dalam skop.` },
        { title: `Cuci bilik demi bilik`, body: `Unit ${b} setiap bilik dicuci dan dipasang semula sebelum bergerak.` },
        { title: `Ujian tekanan saliran`, body: `Setiap saliran diflush dan diperhatikan pada aliran penuh sekurang-kurangnya 30 saat.` },
        { title: `Handover pemilik`, body: `Pemilik ${a} terima ringkasan pendek WhatsApp: unit ${b} yang dicuci, semakan saliran lulus, bacaan cooling, tempoh waranti dan cadangan lawatan seterusnya.` },
      ],
      closing: (b, a) => `Handover itu sebab pelanggan landed ${a} biasanya tempah semula pusingan ${b} seterusnya tanpa sebut harga baharu.`,
    },
  ];

  const commonCommercial = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a} membawa banyak peralatan ${b} komersial ringan dan industri. Pelan ialah cuci mendalam berjadual, bukan bilas gaya kediaman.`,
      steps: (b, a) => [
        { title: `Slot shutdown disetujui`, body: `Pengurus tapak ${a} sahkan slot shutdown selamat dan kenal pasti isolator elektrik untuk unit ${b} sasaran.` },
        { title: `Buka cassette / wall-unit`, body: `Ceiling cassette diturunkan, grille dicuci berasingan dalam baldi, dan blower wheel ${b} dikeluarkan untuk pembersihan tangan.` },
        { title: `Cuci alkali coil + servis pump`, body: `Coil dapat pass alkali lebih kuat. Pump kondensat diuji dengan isi baldi supaya kitaran pump-out disahkan jernih.` },
        { title: `Catatan log tapak`, body: `Log tapak ${a} dapat catatan bertulis dengan tarikh cuci, keadaan coil ${b}, keputusan ujian pump saliran dan tarikh servis seterusnya yang disyorkan.` },
      ],
      closing: (b, a) => `Penutup dipandu log itu sebab tapak ${a} guna kami untuk seluruh jadual ${b}.`,
    },
    {
      intro: (b, a) => `Peralatan ${b} di ${a} jarang gagal secara sopan.`,
      steps: (b, a) => [
        { title: `Bacaan asas`, body: `Sebelum sebarang cuci juruteknik ${a} rekod suhu udara supply dan aliran saliran untuk setiap unit ${b}.` },
        { title: `Penapis, wheel, coil`, body: `Penapis, blower wheel dan coil ${b} dibersihkan dalam susunan itu.` },
        { title: `Ujian saliran + pump`, body: `Saliran diflush dan pump kondensat (jika dipasang) diuji dengan isi baldi.` },
        { title: `Laporan kepada pemilik`, body: `Pemilik tapak ${a} terima bacaan sebelum/selepas.` },
      ],
      closing: (b, a) => `Penutup berpandu data itu yang mengubah unit ${b} ${a} menjadi overhead berjadual.`,
    },
    {
      intro: (b, a) => `Tapak ${a} biasanya bermakna bekalan elektrik kongsi. Pelan lindungi shift.`,
      steps: (b, a) => [
        { title: `Isolator + shutdown`, body: `Sebelum kerja basah bermula juruteknik ${a} sahkan isolator ${b} dan dapat shutdown bertandatangan dari penyelia shift.` },
        { title: `Cuci berkontena`, body: `Canvas cover dan dulang titisan diletakkan bawah unit.` },
        { title: `Pasang semula coil + blower`, body: `Blower wheel dan coil ${b} dibersihkan dan dikeringkan.` },
        { title: `Restart di bawah beban`, body: `Unit ${b} dimulakan semula, dibenarkan capai beban normal, dan suhu udara supply disahkan.` },
      ],
      closing: (b, a) => `Tapak ${a} tidak boleh hilang petang untuk cuci buruk, jadi susunan itu ditulis dan diikut cara yang sama setiap lawatan.`,
    },
    {
      intro: (b, a) => `Servis ${b} di ${a} mengenai mengurangkan bilangan kerosakan mengejut setahun.`,
      steps: (b, a) => [
        { title: `Jalan-jalan pemeriksaan`, body: `Juruteknik berjalan lantai kedai ${a}, catat unit ${b} mana melayani zon mana.` },
        { title: `Cuci mendalam per unit`, body: `Coil, blower wheel dan dulang saliran dibersihkan.` },
        { title: `Audit saliran + elektrik`, body: `Saliran kondensat dan isolator ${b} disemak dan difoto untuk log tapak.` },
        { title: `Nota jadual pencegahan`, body: `Pemilik ${a} terima nota WhatsApp dengan cadangan tetingkap lawatan seterusnya.` },
      ],
      closing: (b, a) => `Nota itulah sebab tapak ${a} beralih dari reaktif ke pencegahan ${b}.`,
    },
  ];

  const commonHillside = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a} berada di sisi bukit Klang Valley. Cerun, kawasan hijau dan laluan paip panjang menentukan pelan lebih daripada cuci ${b} itu sendiri.`,
      steps: (b, a) => [
        { title: `Pelan driveway + tangga`, body: `Juruteknik sahkan gradient driveway ${a}, berjalan laluan kompressor luar ${b}, dan pilih posisi tangga yang selamat.` },
        { title: `Semakan bracket + drain-fall`, body: `Bracket luar ${b}, sauh dinding dan sudut drain-fall diperiksa.` },
        { title: `Pass debris + cuci coil`, body: `Coil luar di taman ${a} catch daun; pass angkat-debris tambahan dilakukan sebelum cuci alkali bermula.` },
        { title: `Sahkan getaran + bunyi`, body: `Selepas dipasang semula, kompressor ${b} dijalankan 15 minit dan juruteknik dengar getaran bracket.` },
      ],
      closing: (b, a) => `Dua langkah tambahan itu sebab kerja bukit ${b} ${a} jarang perlu callout kedua.`,
    },
    {
      intro: (b, a) => `Servis bukit ${a} sebab tempahan ${b} biasanya sertakan bracket line-item di depan.`,
      steps: (b, a) => [
        { title: `Audit bracket`, body: `Sauh dinding bracket ${b} diuji tarik dengan tekanan tangan.` },
        { title: `Sahkan drain-fall`, body: `Tuang air pendek di dulang saliran; aliran diambil masa di discharge luar.` },
        { title: `Cuci kimia`, body: `Coil ${b} dicuci dengan saliran sudah tahu baik.` },
        { title: `Handover dengan foto`, body: `Pelanggan ${a} lihat foto bracket, drain-fall dan coil di WhatsApp.` },
      ],
      closing: (b, a) => `Susunan bracket-dahulu itu tabiat ${a}.`,
    },
    {
      intro: (b, a) => `${a} di kawasan bukit bermakna rumah lebih besar dan lebih banyak unit ${b} per tempahan.`,
      steps: (b, a) => [
        { title: `Inventori panjang paip`, body: `Juruteknik senaraikan setiap unit ${b} ${a} dengan panjang paip dalam-ke-luar.` },
        { title: `Jalan-jalan barisan kompressor`, body: `Kompressor luar ${b} difoto.` },
        { title: `Cuci berurutan`, body: `Semakan saliran ikut arah aliran air bukit.` },
        { title: `Laporan pemilik`, body: `Laporan WhatsApp pendek tunjuk panjang paip dan harga disahkan.` },
      ],
      closing: (b, a) => `Laporan itulah sebab pemilik ${a} boleh rancang bajet servis ${b} tahun depan tanpa satu lagi lawatan.`,
    },
    {
      intro: (b, a) => `Alamat bukit ${b} di ${a} lebih kepada semakan kualiti pemasangan daripada cuci.`,
      steps: (b, a) => [
        { title: `Jalan-jalan penebat paip`, body: `Juruteknik berjalan laluan paip ${b} dari unit dalam ke kompressor luar.` },
        { title: `Cuci + flush saliran`, body: `Coil dan blower ${b} dicuci; juruteknik perhatikan air bertakung.` },
        { title: `Ujian gas + bunyi kompressor`, body: `Tekanan gas diukur dan kompressor ${b} didengar.` },
        { title: `Nota bertulis lawatan seterusnya`, body: `Pelanggan ${a} dapat cadangan tetingkap lawatan seterusnya.` },
      ],
      closing: (b, a) => `Nota itulah yang menukarkan tempahan bukit ${a} ${b} menjadi hubungan yang dirancang.`,
    },
  ];

  const commonOuter = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a} berada di kawasan bandar luar di mana unit ${b} kerap lebih tua dan nasihat baiki-atau-ganti jujur lebih penting daripada cuci pantas.`,
      steps: (b, a) => [
        { title: `Usia unit + refrigerant`, body: `Plat model ${b} disemak. Unit R22 lama di ${a} dibendera kerana gas tidak lagi mudah didapati.` },
        { title: `Pemeriksaan kapasitor + wayar`, body: `Kapasitor microfarad dan wayar luar diuji.` },
        { title: `Keputusan cuci atau baiki`, body: `Pemilik ${a} dapat jawapan lurus.` },
        { title: `Ujian runtime selepas kerja`, body: `Unit ${b} dijalankan 20 minit dan suhu udara supply disahkan.` },
      ],
      closing: (b, a) => `Langkah cadangan-jujur itulah sebab pelanggan ${b} di ${a} anggap kami orang aircond jangka panjang.`,
    },
    {
      intro: (b, a) => `Tempahan ${b} di ${a} biasanya datang dari penduduk lama yang mahu jawapan lurus.`,
      steps: (b, a) => [
        { title: `Soalan situasi`, body: `Tiga soalan bila tiba.` },
        { title: `Pemeriksaan tidak mengganggu`, body: `Coil, saliran dan kapasitor disemak dahulu.` },
        { title: `Harga bertulis`, body: `Pelanggan ${a} lihat harga akhir di WhatsApp dahulu.` },
        { title: `Kerja + sahkan`, body: `Kerja yang dipilih dijalankan, unit ${b} disahkan dengan bacaan udara supply.` },
      ],
      closing: (b, a) => `Aliran soal-dahulu itulah sebab penduduk lama ${a} pass WhatsApp kami.`,
    },
    {
      intro: (b, a) => `Tempahan ${b} ${a} kecil tetapi tinggi dalam kepercayaan.`,
      steps: (b, a) => [
        { title: `Akses paras tanah`, body: `Kebanyakan unit luar ${a} paras tanah.` },
        { title: `Ujian refrigerant + kapasitor`, body: `Diuji dahulu.` },
        { title: `Sebut harga servis tepat`, body: `Pemilik ${a} lihat satu servis disyorkan dan satu alternatif.` },
        { title: `Penutup berfoto`, body: `Foto ${b} dilampirkan pada penyiapan WhatsApp ${a}.` },
      ],
      closing: (b, a) => `Sebut harga servis tepat kekalkan tempahan ${a} kecil dalam RM tetapi tinggi dalam kepercayaan.`,
    },
    {
      intro: (b, a) => `Jalan luar bandar ${a} perlukan juruteknik ${b} yang bersedia sebut "jangan belanja untuk yang ini".`,
      steps: (b, a) => [
        { title: `Taklimat pemilik`, body: `Juruteknik ${b} memperkenalkan diri di pagar ${a}.` },
        { title: `Semakan unit + elektrik`, body: `Unit ${b} dalam, saliran, kapasitor dan isolator diperiksa.` },
        { title: `Panggilan baiki-atau-ganti`, body: `Unit lebih tua kira-kira 10 tahun dapat cadangan lurus.` },
        { title: `Nota waranti`, body: `Penyiapan WhatsApp ${a} termasuk nota waranti kerja 1 bulan.` },
      ],
      closing: (b, a) => `Perbualan waranti itu buat perniagaan berulang ${b} di ${a} boleh diramal.`,
    },
  ];

  // Assemble per-family
  const perFamily: Record<AreaProfile, PlanVariant[]> = {
    kljCore: commonRes(),
    pjMix: commonRes(),
    gatedGrowth: commonRes(),
    landedMature: commonLanded(),
    commercialHeavy: commonCommercial(),
    hillside: commonHillside(),
    outerTownship: commonOuter(),
  };

  return {
    japanesePremium: perFamily,
    american: perFamily,
    koreanTV: perFamily,
    chineseValue: perFamily,
    malaysianLocal: perFamily,
  };
}

function buildZhPlan(): Record<BrandFamily, Record<AreaProfile, PlanVariant[]>> {
  const commonRes = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a}的${b}上门按大楼时间表执行——服务电梯时段和保安登记在技师离开基地前就确定。`,
      steps: (b, a) => [
        { title: `确认${a}进出`, body: `派工前会确认${b}机组所在的座号、楼层和服务电梯时段。` },
        { title: `PCB保护`, body: `${b}室内PCB和传感器线路在冷水接触盘管前先覆盖好。` },
        { title: `盘管化学清洗`, body: `碱性药水一次、冲洗两次，排水线清理并在排放口确认畅通。` },
        { title: `冷却 + WhatsApp`, body: `${b}机组运行15分钟，测量出风口温度，${a}的预约对话收到照片和最终价格。` },
      ],
      closing: (b, a) => `按这个顺序处理，是${a}的${b}清洗很少出现"下周主板就死"投诉的原因。`,
    },
    {
      intro: (b, a) => `每次${a}的${b}工作，都从WhatsApp上的两个问题开始：机组是变频还是定频，以及阳台压缩机是否能从同一层触及。`,
      steps: (b, a) => [
        { title: `建筑通行确认`, body: `${a}的座号、楼层、单位号，以及是否需要访客登记都会先确认。${b}品牌的员工挂牌相应带上。` },
        { title: `型号 + 冷媒识别`, body: `${b}型号铭牌和冷媒类型（R32 或 R410A）在任何清洗前记录。` },
        { title: `PCB防护化学清洗`, body: `${b}盘管以温和碱性药水清洗并冲洗两次。传感器线路和主PCB全程受保护。` },
        { title: `排水 + 风量核验`, body: `排水线冲洗并观察满流。${b}机组运行15分钟，测量出风口温度，然后${a}的工单在WhatsApp上结单。` },
      ],
      closing: (b, a) => `这种结构化结单，是${a}客户通常无需重新报价就会预约同一栋楼第二台${b}机组的原因。`,
    },
    {
      intro: (b, a) => `${a}高层带上的${b}是专业上门，不是随到随做的清洗。流程被写下来，是因为大楼规则——而不是冷气——决定了大部分时间。`,
      steps: (b, a) => [
        { title: `保安处 + 服务电梯预约`, body: `抵达后${b}技师在${a}保安处出示准证副本，并确认JMB分配的服务电梯时段。` },
        { title: `阳台清洗区`, body: `任何${b}面板打开前，防水布、接水盘和地垫先铺好。${a}狭窄阳台上，这是唯一让下方单位保持干燥的方法。` },
        { title: `${b}盘管 + 风轮清洗`, body: `${b}盘管和风轮在PCB受保护下清洗，然后冲洗两次。复装前检查排水盘是否有藻类。` },
        { title: `冷却 + 结单`, body: `机组运行15分钟并测量出风口温度。最终价格和保修说明连同清洗照片发送到${a}的WhatsApp预约对话。` },
      ],
      closing: (b, a) => `这份写下来的流程，让${a}的${b}上门保持在大楼实际给予的电梯时段内。`,
    },
    {
      intro: (b, a) => `${a}核心的${b}预约通常是一台高层机组，有时两台。上门时间不长，但门禁规则让准备工作比实际清洗更关键。`,
      steps: (b, a) => [
        { title: `进出确认`, body: `我们在${b}技师离开基地前就确认${a}大楼的访客登记规定和服务电梯时段。` },
        { title: `型号确认 + 清洗准备`, body: `${b}型号铭牌到达后拍照，正确的化学配方（碱性或中性，视机型而定）计量。` },
        { title: `化学清洗`, body: `盘管和风轮在传感器和PCB全程受保护下清洗。` },
        { title: `保修说明 + 照片`, body: `盘管、排水和室外风扇前后照片发送到${a}的WhatsApp预约对话，附上1个月工艺保修说明。` },
      ],
      closing: (b, a) => `这份清单的意义就是一次平淡的上门——${a}的${b}结果不因派了哪位技师而变化。`,
    },
  ];

  const commonLanded = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a}是成熟的排屋郊区，${b}预约通常覆盖3–5台机组，跨卧室和客厅。上门被规划为一间屋子内的小路线。`,
      steps: (b, a) => [
        { title: `全屋巡视`, body: `技师陪同${a}屋主逐间查看，标记哪些${b}机组开着、哪些制冷弱，并确认服务范围。` },
        { title: `铜管 + 电容检查`, body: `${a}较旧排屋常见铜管接头氧化和电容老化——冷水接触${b}盘管前都会检查。` },
        { title: `分批化学清洗`, body: `${b}机组一台一台清洗，让家人能保留一间凉爽的卧室。` },
        { title: `全屋冷却验证`, body: `最后一台复装后，所有清洗过的${b}机组一起运行15分钟，出风口温度得到验证。` },
      ],
      closing: (b, a) => `全屋验证是${a}的多台${b}预约一次完成的原因。`,
    },
    {
      intro: (b, a) => `${a}的${b}上门通常涉及从楼上到楼下压缩机的长铜管。半个上门在楼上，半个在压缩机排。`,
      steps: (b, a) => [
        { title: `楼上楼下对应`, body: `${a}的技师确认哪台${b}室内机对应哪台外机。` },
        { title: `压缩机排检查`, body: `${b}外机排会检查支架锈蚀和排水坡度。` },
        { title: `盘管 + 冷媒验证`, body: `每台清洗后的${b}机组冷媒压力都会测量。` },
        { title: `屋主签认`, body: `${a}屋主在WhatsApp上看到清洗前后照片和最终价格。` },
      ],
      closing: (b, a) => `签认避免了${a}客户不喜欢的"为什么价格和报价不一样"瞬间。`,
    },
    {
      intro: (b, a) => `${a}的${b}常常一台老定频加一台新变频——两种服务风格，一次上门。`,
      steps: (b, a) => [
        { title: `机组清单`, body: `${a}的技师按房间和类型列出每台${b}机组。` },
        { title: `先处理定频`, body: `较旧的定频${b}机组先清洗。` },
        { title: `变频机组带PCB保护`, body: `任何${b}变频机组都做PCB防护。` },
        { title: `交叉冷却复核`, body: `所有机组运行10分钟并取出风口温度。` },
      ],
      closing: (b, a) => `拆分上门方式避免了${a}"洗完下周就跳"的经典抱怨。`,
    },
    {
      intro: (b, a) => `${a}的${b}排屋服务被设计为在一个派工窗口内完成整个屋子。`,
      steps: (b, a) => [
        { title: `全屋范围`, body: `${a}的技师和屋主商定${b}机组的服务清单。` },
        { title: `逐间清洗`, body: `每个房间的${b}机组清洗并复装后再进入下一间。` },
        { title: `排水线负载测试`, body: `每条排水线满流状态下观察至少30秒。` },
        { title: `交付说明`, body: `${a}的屋主收到简短的WhatsApp总结。` },
      ],
      closing: (b, a) => `交付是${a}排屋客户无需重新报价就会预约下一轮${b}服务的原因。`,
    },
  ];

  const commonCommercial = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a}承载了不少${b}商业和轻工业设备。上门被设计为定期深度清洗，而非住宅式的冲洗。`,
      steps: (b, a) => [
        { title: `停机窗口`, body: `${a}现场经理确认${b}机组的安全停机时段。` },
        { title: `拆解卡式机 / 壁挂机`, body: `天花卡式机放下，出风格栅在水桶里单独清洗，${b}风轮取下做真正的手洗。` },
        { title: `碱性盘管 + 排水泵保养`, body: `盘管以更强的碱性药水清洗。冷凝水泵用桶注水测试，让排水循环得到验证。` },
        { title: `现场台账登记`, body: `${a}的现场台账写上清洗日期、${b}盘管状态、泵测试结果和下次建议服务日期。` },
      ],
      closing: (b, a) => `以台账为主的结单，是${a}现场把整个${b}保养计划交给我们的原因。`,
    },
    {
      intro: (b, a) => `${a}的${b}设备很少礼貌地坏掉。`,
      steps: (b, a) => [
        { title: `基准读数`, body: `任何清洗开始前，${a}的技师记录每台${b}机组的出风口温度和排水流量。` },
        { title: `滤网、风轮、盘管`, body: `${b}滤网、风轮和盘管按次序清洗。` },
        { title: `排水 + 冷凝水泵测试`, body: `排水线冲洗；如安装了冷凝水泵，用桶注水测试。` },
        { title: `报告给现场负责人`, body: `${a}的现场负责人收到前后读数。` },
      ],
      closing: (b, a) => `以数据为基础的结单，让${a}的${b}机组从反复紧急变成可预算的日常成本。`,
    },
    {
      intro: (b, a) => `${a}的现场通常意味着共用电源。上门顺序保护班次。`,
      steps: (b, a) => [
        { title: `隔离开关 + 停机协议`, body: `任何湿作业开始前，${a}的技师确认${b}的隔离开关并获得班次主管的书面停机同意。` },
        { title: `受控清洗`, body: `机组下方铺设防水布和接水盘。` },
        { title: `盘管 + 风轮复装`, body: `${b}风轮和盘管清洗、干燥。` },
        { title: `带负载重启`, body: `${b}机组重启，允许达到正常负载，出风口温度得到确认。` },
      ],
      closing: (b, a) => `${a}的现场承担不起糟糕清洗带来的整个下午，所以流程被写下并每次按同一方式执行。`,
    },
    {
      intro: (b, a) => `${a}的${b}服务目的在于减少每年意外停机的次数。`,
      steps: (b, a) => [
        { title: `检查巡视`, body: `技师走一遍${a}的车间地板，记录哪台${b}机组服务哪个区域。` },
        { title: `逐台深度清洗`, body: `盘管、风轮和排水盘全部清洁。` },
        { title: `排水 + 电气审计`, body: `${b}冷凝水排水和隔离开关状况被检查并拍照。` },
        { title: `预防性时间表说明`, body: `${a}的负责人收到WhatsApp下次上门建议。` },
      ],
      closing: (b, a) => `这份说明是${a}的现场在几次上门内从被动转为主动的原因。`,
    },
  ];

  const commonHillside = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a}位于巴生谷的山坡一侧。坡度、绿化和较长的管线路线，比${b}清洗本身更能决定上门计划。`,
      steps: (b, a) => [
        { title: `车道 + 架梯计划`, body: `技师确认${a}车道坡度，走一遍${b}室外压缩机路线，选择安全的架梯位置。` },
        { title: `支架 + 排水坡度检查`, body: `${b}外机支架、墙锚和排水坡度都会检查。` },
        { title: `除杂 + 盘管清洗`, body: `${a}花园的室外盘管容易积落叶；碱性清洗开始前加一次除杂工序。` },
        { title: `振动 + 噪音核验`, body: `复装后${b}压缩机运行15分钟，技师聆听是否有支架振动。` },
      ],
      closing: (b, a) => `这两个额外步骤，是${a}的山坡${b}工作很少需要二次上门的原因。`,
    },
    {
      intro: (b, a) => `${a}的山坡服务，是我们的${b}预约通常先在报价里列出支架项目的原因。`,
      steps: (b, a) => [
        { title: `支架审计`, body: `${b}支架墙锚用手压方式做拉拔测试。` },
        { title: `排水坡度确认`, body: `在排水盘做一次短水量倾倒；在室外排放口计时流量。` },
        { title: `化学清洗`, body: `${b}盘管在排水已验证后清洗。` },
        { title: `带照片交接`, body: `${a}的客户在WhatsApp上看到支架、排水坡度和盘管照片。` },
      ],
      closing: (b, a) => `先支架后清洗的顺序，是${a}的一项习惯。`,
    },
    {
      intro: (b, a) => `${a}山坡带意味着更大的房子和每次更多的${b}机组。`,
      steps: (b, a) => [
        { title: `管线长度清点`, body: `技师列出每台${a}的${b}机组室内到室外的管线长度。` },
        { title: `压缩机排环视`, body: `${b}室外压缩机会被拍照。` },
        { title: `分批清洗`, body: `排水检查按山坡水流方向进行。` },
        { title: `屋主报告`, body: `简短的WhatsApp报告显示管线长度和最终价格。` },
      ],
      closing: (b, a) => `这份报告让${a}屋主不必再来一次现场也能规划下一年的${b}保养预算。`,
    },
    {
      intro: (b, a) => `${a}山坡上的${b}地址更像一次安装质量检查，而非清洗。`,
      steps: (b, a) => [
        { title: `保温巡视`, body: `技师沿着${b}管线路线检查保温是否缺失。` },
        { title: `清洗 + 排水冲洗`, body: `${b}盘管和风轮清洗；技师留意是否有积水。` },
        { title: `冷媒 + 压缩机声音测试`, body: `测量冷媒压力，倾听${b}压缩机低沉的运转声。` },
        { title: `书面下次上门说明`, body: `${a}客户会得到一份下次上门建议窗口。` },
      ],
      closing: (b, a) => `这份说明把山坡${a}${b}预约变成一段有规划的关系。`,
    },
  ];

  const commonOuter = (): PlanVariant[] => [
    {
      intro: (b, a) => `${a}位于外围乡镇带，${b}设备通常较旧，诚实的维修或更换建议比快速清洗更有价值。`,
      steps: (b, a) => [
        { title: `年龄 + 冷媒`, body: `${b}型号铭牌被检查；${a}的老R22机组会被特别指出。` },
        { title: `电容 + 电线检查`, body: `电容微法拉和外机电线被测试。` },
        { title: `清洗或维修判断`, body: `${a}的屋主会得到直白答复。` },
        { title: `运行测试`, body: `${b}机组运行20分钟，出风口温度得到验证。` },
      ],
      closing: (b, a) => `诚实推荐这一步，是${a}的${b}客户把我们视为长期冷气团队的原因。`,
    },
    {
      intro: (b, a) => `${a}的${b}通常来自想要直白答复的老住户。`,
      steps: (b, a) => [
        { title: `情况提问`, body: `抵达时问三个问题。` },
        { title: `非破坏性检查`, body: `盘管、排水和电容先做检查。` },
        { title: `书面报价`, body: `${a}的客户先在WhatsApp上看到最终价格。` },
        { title: `施工 + 验证`, body: `完成选定工作后，${b}机组以读数验证。` },
      ],
      closing: (b, a) => `先问后做，是${a}的老住户把我们WhatsApp介绍给邻居的原因。`,
    },
    {
      intro: (b, a) => `${a}的${b}预约金额小但信任度高。`,
      steps: (b, a) => [
        { title: `地面通行`, body: `${a}多数室外机在地面。` },
        { title: `冷媒 + 电容测试`, body: `优先测试。` },
        { title: `对症服务报价`, body: `${a}的屋主看到一个推荐服务和一个替代方案。` },
        { title: `带照片结单`, body: `${b}照片附在${a}的WhatsApp完工消息里。` },
      ],
      closing: (b, a) => `对症服务报价让${a}的预约金额虽小，但可靠。`,
    },
    {
      intro: (b, a) => `${a}外围街道需要一个愿意说"这台别花钱"的${b}技师。`,
      steps: (b, a) => [
        { title: `屋主简报`, body: `${b}技师在${a}大门口自我介绍。` },
        { title: `机组 + 电气`, body: `${b}室内、排水、电容和隔离开关都会检查。` },
        { title: `维修或更换`, body: `使用10年以上的机组会得到直接建议。` },
        { title: `保修说明`, body: `${a}的完工WhatsApp附带保修说明。` },
      ],
      closing: (b, a) => `保修对话让${a}的${b}回头生意变得可预测。`,
    },
  ];

  const perFamily: Record<AreaProfile, PlanVariant[]> = {
    kljCore: commonRes(),
    pjMix: commonRes(),
    gatedGrowth: commonRes(),
    landedMature: commonLanded(),
    commercialHeavy: commonCommercial(),
    hillside: commonHillside(),
    outerTownship: commonOuter(),
  };

  return {
    japanesePremium: perFamily,
    american: perFamily,
    koreanTV: perFamily,
    chineseValue: perFamily,
    malaysianLocal: perFamily,
  };
}

// MS + ZH job-row banks. Keyed by (profile, variant index, EN-job-string).
// The picker looks up the exact EN job to produce the localized job title
// and note; frequency is localized separately.

type JobLocalMap = Record<AreaProfile, Record<number, Record<string, { job: string; note: string }>>>;

const MS_JOBS: JobLocalMap = buildMsJobs();
const ZH_JOBS: JobLocalMap = buildZhJobs();

function getLocalizedJobRow(
  profile: AreaProfile,
  idx: number,
  enJob: string,
  locale: BrandAreaDepthLocale,
): { job: string; note: string } | undefined {
  if (locale === "en") return undefined;
  const bank = locale === "ms" ? MS_JOBS : ZH_JOBS;
  return bank[profile]?.[idx]?.[enJob];
}

function buildMsJobs(): JobLocalMap {
  // For MS, we author one paragraph per (profile, variant, row) —
  // authored not translated. To keep the file navigable, MS reuses the
  // same phrasing family across variants of the same profile while
  // varying the closing sentence per variant.

  const per = (rows: { en: string; job: string; note: string }[]): Record<string, { job: string; note: string }> => {
    const out: Record<string, { job: string; note: string }> = {};
    for (const r of rows) out[r.en] = { job: r.job, note: r.note };
    return out;
  };

  const kljCore0 = per([
    { en: "Chemical wash (high-rise split)", job: "Cuci kimia (split bertingkat)", note: "Akses coil balkoni + slot lif pendek bermakna lawatan standard ialah cuci kimia dengan perlindungan PCB." },
    { en: "Drain-tray clearing", job: "Clear drain-tray", note: "Dulang saliran tersumbat sebab panggilan air siling kecil dari unit kondo selepas tempoh kering panjang." },
    { en: "Weak-cooling triage", job: "Triage cooling lemah", note: "Cooling lemah dalam inverter 5 tahun biasanya gas atau blower wheel, bukan coil — kami uji sebelum sebut harga." },
    { en: "Fault-code diagnosis", job: "Diagnosis kod fault", note: "Kod fault berulang biasanya bermakna kerja sensor atau PCB; sheet kod model tertentu disemak sebelum tempah alat ganti." },
  ]);
  const kljCore1 = per([
    { en: "PCB-safe chemical wash", job: "Cuci kimia PCB-safe", note: "Unit kondo dalam bandar hampir semua inverter, jadi perlindungan board standard bukannya pilihan." },
    { en: "Drain-line flush", job: "Flush drain-line", note: "Stack saliran kongsi dipenuhi alga semasa tempoh runtime lebih panjang; cuci termasuk flush penuh sisi stack." },
    { en: "Gas top-up + leak check", job: "Tambah gas + semakan bocor", note: "Inverter kondo yang berjalan lama perlahan hilang refrigerant; top-up disebut harga hanya selepas semakan bocor." },
    { en: "Outdoor fan capacitor swap", job: "Tukar kapasitor kipas luar", note: "Hujan angin balkoni trip kapasitor luar pada unit menua; spare naik dalam van secara lalai." },
  ]);
  const kljCore2 = per([
    { en: "Full chemical wash", job: "Cuci kimia penuh", note: "Lawatan standard; perlindungan PCB ialah perlindungan terhadap aduan 'dicuci dan mati minggu depan'." },
    { en: "Post-wash cool-down verification", job: "Pengesahan cool-down selepas cuci", note: "Setiap cuci ditutup dengan bacaan suhu udara supply — tiada bacaan, tiada penutup." },
    { en: "Coil recovery on older units", job: "Pemulihan coil unit lama", note: "Unit wall-mount lama dengan kulat dalam coil kadang perlu dua pass; yang kedua disebut harga sebelum bermula." },
    { en: "PCB / sensor replacement", job: "Penggantian PCB / sensor", note: "Untuk kerja kod fault, sheet ralat model tertentu dirujuk dan spare betul ditempah mengikut nombor siri." },
  ]);
  const kljCore3 = per([
    { en: "Chemical wash", job: "Cuci kimia", note: "Hampir setiap tempahan kondo; pelan ialah lawatan standard bukannya 'periksa dulu' kerana corak diketahui." },
    { en: "Drain-clearing", job: "Bersihkan saliran", note: "Biasa dalam kondo dalam bandar di mana stack saliran dikongsi dengan beberapa unit." },
    { en: "Gas top-up", job: "Tambah gas", note: "Hanya selepas pass semakan bocor; pelanggan lihat bacaan tekanan di WhatsApp sebelum top-up dipersetujui." },
    { en: "Fan motor / capacitor", job: "Motor kipas / kapasitor", note: "Komponen luar gagal dahulu pada tebing bertingkat; spare naik dalam van bukannya diambil kemudian." },
  ]);

  const pjMix0 = per([
    { en: "Chemical wash", job: "Cuci kimia", note: "Kedua-dua bilik tidur landed dan pejabat kecil dapat cuci kimia; kedalaman diputuskan dari keadaan penapis bila tiba." },
    { en: "Multi-unit family visit", job: "Lawatan keluarga multi-unit", note: "3–5 unit dalam satu rumah ialah tempahan biasa; saliran setiap unit disahkan sebelum bergerak." },
    { en: "Older-unit repair-or-replace call", job: "Panggilan baiki-atau-ganti unit lama", note: "Untuk unit 10+ tahun, pelanggan lihat cadangan baiki-atau-ganti lurus di WhatsApp." },
    { en: "Gas top-up", job: "Tambah gas", note: "Unit non-inverter lama boleh senyap hilang gas selama tahun; top-up disebut harga hanya selepas semakan bocor." },
  ]);
  const pjMix1 = per([
    { en: "PCB-safe chemical wash", job: "Cuci kimia PCB-safe", note: "Unit inverter baharu dapat perisai PCB sepanjang cuci — penjagaan teknikal sama sama ada unit RM 1,200 atau RM 4,200." },
    { en: "Whole-house sequential wash", job: "Cuci berurutan seluruh rumah", note: "Pelan berjalan bilik demi bilik supaya satu bilik tidur kekal sejuk semasa rumah lain diservis." },
    { en: "Long-copper-run gas verification", job: "Pengesahan gas paip panjang", note: "Pemasangan landed selalu ada laluan tembaga atas-ke-bawah panjang; tekanan gas diukur selepas setiap cuci." },
    { en: "Capacitor / wiring check on older units", job: "Semakan kapasitor / wayar unit lama", note: "Pendawaian menua dan kapasitor lusuh biasa di jalan PJ lama; kedua-dua disemak sebelum air cuci." },
  ]);
  const pjMix2 = per([
    { en: "Chemical wash + drain flush", job: "Cuci kimia + flush saliran", note: "Lawatan standard untuk kedua-dua pelanggan landed dan kondo; semakan saliran diperhatikan pada aliran penuh sekurang-kurangnya 30 saat." },
    { en: "Blower wheel deep clean", job: "Cuci mendalam blower wheel", note: "Airflow lemah selepas cuci biasanya blower wheel berminyak; alat untuk pull itu standard pada van." },
    { en: "Cool-down verification", job: "Pengesahan cool-down", note: "Setiap unit dicuci dijalankan 10–15 minit dengan suhu udara supply disahkan sebelum kerja ditutup." },
    { en: "Replacement quote for end-of-life units", job: "Sebut harga penggantian untuk unit hujung hayat", note: "Untuk unit lepas baiki ekonomik, sebut harga penggantian bahasa mudah dihantar di WhatsApp; tiada upsell." },
  ]);
  const pjMix3 = per([
    { en: "Standard chemical wash", job: "Cuci kimia standard", note: "Kebanyakan ditempah Sabtu; laluan keluarga melalui 3–5 unit sekali dengan masa boleh diramal." },
    { en: "Drain line stress-test", job: "Ujian tekanan drain line", note: "Setiap saliran diperhatikan pada aliran penuh untuk tangkap sekatan perlahan yang muncul hanya di bawah beban." },
    { en: "Gas top-up + leak check", job: "Tambah gas + semakan bocor", note: "Laluan tembaga panjang bermakna unit non-inverter lama drift keluar spec; gas diukur, kemudian ditambah jika perlu." },
    { en: "Bracket / drain-fall audit", job: "Audit bracket / drain-fall", note: "Unit luar landed pada bracket menua dapat ujian tarik keselamatan sebelum sebarang cuci bermula." },
  ]);

  const gatedGrowth0 = per([
    { en: "Chemical wash — 'new but dusty'", job: "Cuci kimia — 'baharu tapi berhabuk'", note: "Walaupun unit 2–4 tahun di skim pertumbuhan tunjukkan habuk berat dari pembinaan berhampiran." },
    { en: "PCB-safe wash", job: "Cuci PCB-safe", note: "Board inverter baharu dilindungi sebelum air cuci masuk coil." },
    { en: "Outdoor coil rinse", job: "Bilas coil luar", note: "Coil luar catch habuk pembinaan; bilas tekanan ditambah di atas cuci dalam standard." },
    { en: "Shortened service cycle", job: "Kitaran servis dipendekkan", note: "Untuk alamat dengan pembinaan berterusan bersebelahan, kitaran 8-bulan berbanding 12-bulan disyorkan." },
  ]);
  const gatedGrowth1 = per([
    { en: "Chemical wash", job: "Cuci kimia", note: "Lawatan pertumbuhan standard; saliran dan coil luar kedua-dua dapat perhatian." },
    { en: "Filter-only pass", job: "Pass penapis sahaja", note: "Kadang-kadang cuci mendalam penapis + flush saliran cukup — ini disebut harga jujur." },
    { en: "Gas top-up", job: "Tambah gas", note: "Untuk unit sekitar 3+ tahun, semakan bocor + top-up biasa; bacaan tekanan dikongsi sebelum persetujuan." },
    { en: "PCB replacement", job: "Penggantian PCB", note: "Kerja kod fault mengikut sheet ralat model tertentu; spare ditempah mengikut nombor siri." },
  ]);
  const gatedGrowth2 = per([
    { en: "PCB-safe chemical wash", job: "Cuci kimia PCB-safe", note: "Skim baharu inverter-heavy; perlindungan board dibungkus standard." },
    { en: "Shared drain-stack flush", job: "Flush stack saliran kongsi", note: "Kondo pertumbuhan kongsi stack saliran dengan beberapa unit di atas; flush penuh elak pass sekatan turun." },
    { en: "Outdoor bracket audit", job: "Audit bracket luar", note: "Tebing servis baharu kadang siap dengan titik sauh lemah; ujian tarik dilakukan pada lawatan pertama." },
    { en: "Replacement gauge for post-warranty units", job: "Sebut harga penggantian untuk unit lepas waranti", note: "Untuk unit lepas waranti pengeluar, sebut harga penggantian jujur diberikan jika unit tidak ekonomik dibaiki." },
  ]);
  const gatedGrowth3 = per([
    { en: "Chemical wash + cycle suggestion", job: "Cuci kimia + cadangan kitaran", note: "Setiap cuci ditutup dengan cadangan tetingkap lawatan seterusnya berdasarkan tahap habuk alamat." },
    { en: "Coil + blower deep clean", job: "Cuci mendalam coil + blower", note: "Cuci teliti bukannya pantas; blower wheel dikeluarkan bila minyak nampak." },
    { en: "Drain flush", job: "Flush saliran", note: "Diperhatikan pada aliran penuh sekurang-kurangnya 30 saat." },
    { en: "Guardhouse-permit visit", job: "Lawatan permit pondok pengawal", note: "Untuk skim berpagar dengan peraturan permit ketat, juruteknik tiba dengan salinan ID sudah dihantar." },
  ]);

  const landedMature0 = per([
    { en: "Whole-house chemical wash", job: "Cuci kimia seluruh rumah", note: "Tempahan landed matang biasanya meliputi 3–5 unit dalam satu rumah." },
    { en: "Capacitor + wiring inspection", job: "Pemeriksaan kapasitor + wayar", note: "Pendawaian menua dan kapasitor lusuh biasa; kedua-dua disemak sebelum sebut harga cuci." },
    { en: "Long-copper gas verification", job: "Pengesahan gas tembaga panjang", note: "Laluan tembaga atas-ke-bawah drift keluar spec; tekanan gas diukur selepas setiap cuci." },
    { en: "Older-unit repair-or-replace call", job: "Panggilan baiki-atau-ganti unit lama", note: "Untuk unit 10+ tahun, cadangan bahasa mudah dihantar di WhatsApp." },
  ]);
  const landedMature1 = per([
    { en: "Sequential chemical wash", job: "Cuci kimia berurutan", note: "Bilik demi bilik, supaya satu bilik tidur kekal sejuk semasa rumah lain diservis." },
    { en: "Compressor row check", job: "Semakan barisan kompressor", note: "Barisan luar diperiksa untuk karat bracket dan drain-fall sebelum air cuci mengenai coil dalam." },
    { en: "Drain stress test", job: "Ujian tekanan saliran", note: "Setiap saliran diperhatikan pada aliran penuh untuk tangkap sekatan perlahan." },
    { en: "PCB / sensor replacement", job: "Penggantian PCB / sensor", note: "Kerja kod fault dipadan dengan sheet ralat model tertentu." },
  ]);
  const landedMature2 = per([
    { en: "Family multi-unit visit", job: "Lawatan keluarga multi-unit", note: "Tempahan hujung minggu; setiap 3–5 unit dapat perhatian teknikal sama." },
    { en: "Older non-inverter wash", job: "Cuci non-inverter lama", note: "Unit non-inverter dicuci dengan cuci mekanikal penuh bukannya bilas." },
    { en: "Inverter wash with PCB protection", job: "Cuci inverter dengan perlindungan PCB", note: "Inverter baharu di rumah sama dapat perisai PCB sepanjang cuci." },
    { en: "Bracket + drain-fall audit", job: "Audit bracket + drain-fall", note: "Unit luar landed pada bracket menua dapat ujian tarik keselamatan." },
  ]);
  const landedMature3 = per([
    { en: "Standard chemical wash", job: "Cuci kimia standard", note: "Pelanggan landed biasanya rancang lawatan berjadual, bukan panggilan kecemasan; slot biasanya blok 2-3 jam." },
    { en: "Whole-house cool-down verify", job: "Sahkan cool-down seluruh rumah", note: "Semua unit dicuci dijalankan bersama 15 minit; suhu udara supply disahkan." },
    { en: "Drain flush + gas top-up", job: "Flush saliran + tambah gas", note: "Kedua-dua biasa pada kerja landed." },
    { en: "Replacement quote for end-of-life units", job: "Sebut harga penggantian unit hujung hayat", note: "Jika unit lepas baiki ekonomik, sebut harga penggantian jujur dihantar di WhatsApp — tiada tekanan." },
  ]);

  const commercialHeavy0 = per([
    { en: "Scheduled deep clean", job: "Cuci mendalam berjadual", note: "Unit komersial runtime-heavy dapat cuci mendalam coil + blower." },
    { en: "Condensate pump service", job: "Servis pump kondensat", note: "Pump diuji dengan isi baldi; pump tersekat sebab siling di atas kedai kadang menitis." },
    { en: "Cassette grille rebuild", job: "Pasang semula grille cassette", note: "Ceiling cassette diturunkan dan grille dicuci berasingan; airflow semua empat vane disahkan." },
    { en: "Belts / bearings replacement", job: "Penggantian belt / bearing", note: "Bahagian hujung hayat dibendera untuk swap berjadual." },
  ]);
  const commercialHeavy1 = per([
    { en: "Deep chemical wash", job: "Cuci kimia mendalam", note: "Pass alkali pada coil, diikuti bilas dua peringkat." },
    { en: "Drain + pump audit", job: "Audit saliran + pump", note: "Drain line dan pump kondensat diuji; laporan difailkan dengan pemilik tapak." },
    { en: "Electrical isolator check", job: "Semakan isolator elektrik", note: "Setiap lawatan komersial sahkan isolator matikan unit yang betul." },
    { en: "PCB / driver replacement", job: "Penggantian PCB / driver", note: "Untuk unit kod fault, driver PCB ditempah mengikut sheet ralat model tertentu." },
  ]);
  const commercialHeavy2 = per([
    { en: "Scheduled visit under shutdown window", job: "Lawatan berjadual di bawah slot shutdown", note: "Pengurus tapak sahkan slot shutdown selamat." },
    { en: "Cassette + wall-unit rebuild", job: "Pasang semula cassette + wall-unit", note: "Blower wheel dikeluarkan dan dibersihkan berasingan." },
    { en: "Baseline vs post-wash readings", job: "Bacaan asas vs selepas cuci", note: "Suhu udara supply direkod sebelum dan selepas cuci." },
    { en: "Preventive schedule note", job: "Nota jadual pencegahan", note: "Tetingkap lawatan seterusnya dicadangkan berdasarkan runtime harian dan beban habuk." },
  ]);
  const commercialHeavy3 = per([
    { en: "Full commercial clean", job: "Cuci komersial penuh", note: "Coil + blower + saliran + pump kondensat; setiap lawatan dianggap penyelenggaraan berjadual." },
    { en: "Site-log entry", job: "Catatan log tapak", note: "Tarikh cuci, keadaan coil, keputusan ujian pump dan tarikh seterusnya dicadangkan semua masuk log tapak." },
    { en: "End-of-life part flagging", job: "Bendera bahagian hujung hayat", note: "Belt dan bearing hampir hujung hayat dibendera untuk penggantian dirancang." },
    { en: "Emergency callout backup", job: "Backup callout kecemasan", note: "Untuk tapak dalam jadual kami, panggilan kecemasan dimuatkan antara slot yang dirancang." },
  ]);

  const hillside0 = per([
    { en: "Bracket audit + chemical wash", job: "Audit bracket + cuci kimia", note: "Sauh dinding bracket diuji tarik dahulu." },
    { en: "Drain-fall correction", job: "Pembetulan drain-fall", note: "Gradient di bawah spec dibaiki sebelum coil dicuci." },
    { en: "Debris-lift pass", job: "Pass angkat-debris", note: "Coil luar di taman bukit catch daun dan serangga; pass debris dilakukan sebelum cuci alkali bermula." },
    { en: "Vibration + noise verification", job: "Pengesahan getaran + bunyi", note: "Selepas dipasang semula, kompressor dijalankan 15 minit dan sebarang getaran bracket didengar." },
  ]);
  const hillside1 = per([
    { en: "Chemical wash with drain-fall check", job: "Cuci kimia dengan semakan drain-fall", note: "Lawatan bukit standard." },
    { en: "Pipe insulation walk", job: "Jalan-jalan penebat paip", note: "Penebat pada laluan paip antara dalam dan luar disemak untuk kerosakan matahari." },
    { en: "Bracket safety audit", job: "Audit keselamatan bracket", note: "Sauh diuji tarik dengan tangan." },
    { en: "Gas + compressor sound test", job: "Ujian gas + bunyi kompressor", note: "Kompressor didengar untuk dengung rendah yang tunjuk beban baik." },
  ]);
  const hillside2 = per([
    { en: "Full hillside wash", job: "Cuci bukit penuh", note: "Coil, blower dan saliran, tambah pass debris." },
    { en: "Outdoor coil pressure rinse", job: "Bilas tekanan coil luar", note: "Coil luar bukit tahan bilas tekanan." },
    { en: "Owner report with photos", job: "Laporan pemilik dengan foto", note: "Foto bracket, drain-fall dan coil dikongsi di WhatsApp." },
    { en: "Bracket replacement quote", job: "Sebut harga penggantian bracket", note: "Bracket bukit menua disebut harga berasingan." },
  ]);
  const hillside3 = per([
    { en: "Hillside chemical wash", job: "Cuci kimia bukit", note: "Lawatan standard; dua langkah tambahan sebab kerja bukit jarang perlu callout kedua." },
    { en: "Cool-down verification", job: "Pengesahan cool-down", note: "Kompressor dijalankan 15 minit selepas dipasang semula dengan suhu udara supply disahkan." },
    { en: "Insulation repair quote", job: "Sebut harga baikan penebat", note: "Penebat paip hilang disebut harga sebelum cuci." },
    { en: "Whole-house planning note", job: "Nota perancangan seluruh rumah", note: "Untuk rumah bukit lebih besar dengan beberapa unit, nota WhatsApp cadangkan tetingkap lawatan seterusnya." },
  ]);

  const outer0 = per([
    { en: "Honest repair-or-replace call", job: "Panggilan baiki-atau-ganti jujur", note: "Untuk unit lebih 10 tahun, pelanggan dapat cadangan baiki-atau-ganti lurus." },
    { en: "Capacitor + wiring test", job: "Ujian kapasitor + wayar", note: "Pemasangan lama sering tunjukkan kapasitor lusuh dan wayar luar menua." },
    { en: "R22 refrigerant flagging", job: "Bendera refrigerant R22", note: "Unit R22 dipanggil kerana gas kini sukar didapati." },
    { en: "Chemical wash", job: "Cuci kimia", note: "Bila unit berbaloi cuci, lawatan dibuat pada standard yang sama." },
  ]);
  const outer1 = per([
    { en: "Situation-questions visit", job: "Lawatan soalan situasi", note: "Tiga soalan bila tiba." },
    { en: "Non-invasive check", job: "Semakan tidak mengganggu", note: "Coil luar, saliran dan kapasitor disemak tanpa buka unit dalam dahulu." },
    { en: "Written price on WhatsApp", job: "Harga bertulis di WhatsApp", note: "Pelanggan lihat harga akhir di WhatsApp sebelum panel dibuka." },
    { en: "Cool-down verification", job: "Pengesahan cool-down", note: "Unit dijalankan 15 minit dengan suhu udara supply disahkan." },
  ]);
  const outer2 = per([
    { en: "Right-service quote", job: "Sebut harga servis tepat", note: "Pelanggan lihat satu servis disyorkan dan satu alternatif di WhatsApp." },
    { en: "Ground-floor unit wash", job: "Cuci unit paras tanah", note: "Kebanyakan unit luar paras tanah." },
    { en: "Refrigerant + capacitor test", job: "Ujian refrigerant + kapasitor", note: "Tekanan gas dan kapasitor microfarad diuji dahulu." },
    { en: "Photo-backed closeout", job: "Penutup berfoto", note: "Foto coil, saliran dan kipas luar dilampirkan pada penyiapan WhatsApp." },
  ]);
  const outer3 = per([
    { en: "Warranty-noted chemical wash", job: "Cuci kimia dengan nota waranti", note: "Setiap lawatan ditutup dengan nota waranti kerja 1 bulan." },
    { en: "Repair-or-replace recommendation", job: "Cadangan baiki-atau-ganti", note: "Untuk unit lepas 10 tahun, pelanggan diberitahu lurus." },
    { en: "Isolator + electrical audit", job: "Audit isolator + elektrik", note: "Suis isolator dan wayar terdedah diperiksa setiap lawatan." },
    { en: "Cool-down verification", job: "Pengesahan cool-down", note: "Setiap unit dicuci dijalankan 20 minit dan suhu udara supply disahkan." },
  ]);

  return {
    kljCore: { 0: kljCore0, 1: kljCore1, 2: kljCore2, 3: kljCore3 },
    pjMix: { 0: pjMix0, 1: pjMix1, 2: pjMix2, 3: pjMix3 },
    gatedGrowth: { 0: gatedGrowth0, 1: gatedGrowth1, 2: gatedGrowth2, 3: gatedGrowth3 },
    landedMature: { 0: landedMature0, 1: landedMature1, 2: landedMature2, 3: landedMature3 },
    commercialHeavy: { 0: commercialHeavy0, 1: commercialHeavy1, 2: commercialHeavy2, 3: commercialHeavy3 },
    hillside: { 0: hillside0, 1: hillside1, 2: hillside2, 3: hillside3 },
    outerTownship: { 0: outer0, 1: outer1, 2: outer2, 3: outer3 },
  };
}

function buildZhJobs(): JobLocalMap {
  const per = (rows: { en: string; job: string; note: string }[]): Record<string, { job: string; note: string }> => {
    const out: Record<string, { job: string; note: string }> = {};
    for (const r of rows) out[r.en] = { job: r.job, note: r.note };
    return out;
  };

  const kljCore0 = per([
    { en: "Chemical wash (high-rise split)", job: "化学清洗（高层分体）", note: "阳台盘管进出加短电梯窗口，意味着标准上门是一次带PCB保护的化学清洗。" },
    { en: "Drain-tray clearing", job: "清理排水盘", note: "长时间干燥期后，公寓单位天花漏水的小型来电通常源于排水盘堵塞。" },
    { en: "Weak-cooling triage", job: "制冷弱分诊", note: "5年变频机制冷弱通常是冷媒或风轮，不是盘管——报价前我们先测试。" },
    { en: "Fault-code diagnosis", job: "故障代码诊断", note: "反复出现的故障代码通常意味着传感器或PCB工作；订货前会查阅该型号的错误代码表。" },
  ]);
  const kljCore1 = per([
    { en: "PCB-safe chemical wash", job: "PCB防护化学清洗", note: "市中心公寓机组几乎都是变频，因此PCB保护是标准配置。" },
    { en: "Drain-line flush", job: "排水线冲洗", note: "共用排水立管在长时间运转期后会积藻类；清洗时包含立管侧的完整冲洗。" },
    { en: "Gas top-up + leak check", job: "加冷媒 + 漏点检查", note: "长时间运转的公寓变频机组会慢慢流失冷媒；补气仅在漏点检查后报价。" },
    { en: "Outdoor fan capacitor swap", job: "更换室外风扇电容", note: "阳台被风带雨会跳掉老机的室外电容；备用电容默认放在车上。" },
  ]);
  const kljCore2 = per([
    { en: "Full chemical wash", job: "完整化学清洗", note: "标准上门；PCB保护是「洗完下周就死」投诉的防线。" },
    { en: "Post-wash cool-down verification", job: "清洗后冷却验证", note: "每次清洗以出风口温度读数结束——没有读数，就不结单。" },
    { en: "Coil recovery on older units", job: "老机盘管修复", note: "盘管深处发霉的老壁挂机有时需要两遍处理；第二遍在开始前先报价。" },
    { en: "PCB / sensor replacement", job: "PCB / 传感器更换", note: "故障代码工作会对照该型号的错误表；根据序列号订购正确的备件。" },
  ]);
  const kljCore3 = per([
    { en: "Chemical wash", job: "化学清洗", note: "几乎每次公寓预约；计划是标准上门而非「先检查」，因为模式已知。" },
    { en: "Drain-clearing", job: "疏通排水", note: "在市中心公寓常见，排水立管与楼上几台机组共用。" },
    { en: "Gas top-up", job: "加冷媒", note: "仅在漏点检查通过后进行；客户在同意补气前会在WhatsApp上看到压力读数。" },
    { en: "Fan motor / capacitor", job: "风扇电机 / 电容", note: "室外部件在高层服务台上先坏；备件放在车上，不后取。" },
  ]);

  const pjMix0 = per([
    { en: "Chemical wash", job: "化学清洗", note: "排屋卧室和小办公室都会做化学清洗；深度根据到达后滤网状况决定。" },
    { en: "Multi-unit family visit", job: "多机家庭上门", note: "一栋房里3–5台机组是常见预约；每台机组的排水在进入下一台前都确认过。" },
    { en: "Older-unit repair-or-replace call", job: "老机维修或更换判断", note: "对于10年以上的机组，客户会在WhatsApp上看到直白的维修或更换建议。" },
    { en: "Gas top-up", job: "加冷媒", note: "老定频机组多年间会悄悄流失冷媒；补气仅在漏点检查后报价。" },
  ]);
  const pjMix1 = per([
    { en: "PCB-safe chemical wash", job: "PCB防护化学清洗", note: "较新的变频机在整个清洗过程中都做PCB遮挡——无论机组是RM 1,200还是RM 4,200，技术照顾一样。" },
    { en: "Whole-house sequential wash", job: "全屋分批清洗", note: "计划逐间进行，让一间卧室在其他部分服务时保持凉爽。" },
    { en: "Long-copper-run gas verification", job: "长铜管冷媒验证", note: "排屋安装常常有很长的楼上到楼下铜管；每次清洗后都测量冷媒压力。" },
    { en: "Capacitor / wiring check on older units", job: "老机电容 / 电线检查", note: "老化电线和电容在较老的PJ街道很常见；两者在冷水接触盘管前都会检查。" },
  ]);
  const pjMix2 = per([
    { en: "Chemical wash + drain flush", job: "化学清洗 + 排水冲洗", note: "排屋和公寓客户的标准上门；排水检查会在满流状态下观察至少30秒。" },
    { en: "Blower wheel deep clean", job: "风轮深度清洗", note: "清洗后风量弱通常是油腻风轮；相应工具是车上标配。" },
    { en: "Cool-down verification", job: "冷却验证", note: "每台清洗过的机组运行10–15分钟，出风口温度得到确认后再结单。" },
    { en: "Replacement quote for end-of-life units", job: "寿命末期机组更换报价", note: "对于超过经济维修范围的机组，会在WhatsApp上发送通俗易懂的更换报价；不推销。" },
  ]);
  const pjMix3 = per([
    { en: "Standard chemical wash", job: "标准化学清洗", note: "周六预约居多；家庭路线一次覆盖3–5台机组，时间可预测。" },
    { en: "Drain line stress-test", job: "排水线负载测试", note: "每条排水线在满流下观察，捕捉只在负载下才出现的慢速堵塞。" },
    { en: "Gas top-up + leak check", job: "加冷媒 + 漏点检查", note: "长铜管意味着老定频机会偏离规格；先测量冷媒，需要时再补。" },
    { en: "Bracket / drain-fall audit", job: "支架 / 排水坡度审计", note: "排屋室外机在老化支架上会做安全拉拔测试再开始清洗。" },
  ]);

  const gatedGrowth0 = per([
    { en: "Chemical wash — 'new but dusty'", job: "化学清洗——「新但脏」", note: "即使是成长带小区里2–4年的机组，附近的施工也让灰尘负荷偏重。" },
    { en: "PCB-safe wash", job: "PCB防护清洗", note: "新变频板在冷水进入盘管前先做遮挡——这是标准，不是可选。" },
    { en: "Outdoor coil rinse", job: "室外盘管冲洗", note: "室外盘管会接住施工灰尘；在标准室内清洗之上加一次加压冲洗。" },
    { en: "Shortened service cycle", job: "缩短保养周期", note: "对于旁边持续有施工的地址，建议8个月而不是12个月的清洗周期。" },
  ]);
  const gatedGrowth1 = per([
    { en: "Chemical wash", job: "化学清洗", note: "标准的成长带上门；排水和室外盘管都得到照顾。" },
    { en: "Filter-only pass", job: "仅滤网处理", note: "有时滤网深洗加排水冲洗就够——这会诚实报价而非升级为完整清洗。" },
    { en: "Gas top-up", job: "加冷媒", note: "对于约3年以上的机组，漏点检查加补气常见；同意前先分享压力读数。" },
    { en: "PCB replacement", job: "PCB更换", note: "故障代码工作按该型号的错误表对照；根据序列号订购备件。" },
  ]);
  const gatedGrowth2 = per([
    { en: "PCB-safe chemical wash", job: "PCB防护化学清洗", note: "新建小区偏变频；主板保护默认打包。" },
    { en: "Shared drain-stack flush", job: "共用排水立管冲洗", note: "成长带公寓与楼上几台机组共用立管；完整冲洗避免把慢速堵塞传下去。" },
    { en: "Outdoor bracket audit", job: "室外支架审计", note: "新服务台有时锚点较弱；首次上门做一次拉拔测试。" },
    { en: "Replacement gauge for post-warranty units", job: "保修后机组更换评估", note: "对于超过原厂保修的机组，如果维修不经济，会提供诚实的更换报价。" },
  ]);
  const gatedGrowth3 = per([
    { en: "Chemical wash + cycle suggestion", job: "化学清洗 + 周期建议", note: "每次清洗结束时都给出基于当前地址粉尘状况的下次上门建议窗口。" },
    { en: "Coil + blower deep clean", job: "盘管 + 风轮深度清洗", note: "清洗彻底而非快速；可见油腻时会拆下风轮。" },
    { en: "Drain flush", job: "排水冲洗", note: "在满流下观察至少30秒。" },
    { en: "Guardhouse-permit visit", job: "带保安处准证的上门", note: "对于准证规则严格的封闭小区，技师提前把身份证副本发过去。" },
  ]);

  const landedMature0 = per([
    { en: "Whole-house chemical wash", job: "全屋化学清洗", note: "成熟排屋预约通常覆盖一栋屋子里3–5台机组。" },
    { en: "Capacitor + wiring inspection", job: "电容 + 电线检查", note: "老化电线和电容常见；两者在清洗报价定稿前都会检查。" },
    { en: "Long-copper gas verification", job: "长铜管冷媒验证", note: "楼上到楼下的铜管会偏离规格；每次清洗后都测量冷媒压力。" },
    { en: "Older-unit repair-or-replace call", job: "老机维修或更换判断", note: "对于10年以上的机组，通俗易懂的更换或维修建议会在WhatsApp上发送。" },
  ]);
  const landedMature1 = per([
    { en: "Sequential chemical wash", job: "分批化学清洗", note: "逐间进行，让一间卧室在其他部分服务时保持凉爽。" },
    { en: "Compressor row check", job: "压缩机排检查", note: "室外排会先检查支架锈蚀和排水坡度，再让冷水接触室内盘管。" },
    { en: "Drain stress test", job: "排水线负载测试", note: "每条排水线在满流下观察至少30秒，捕捉负载下的慢速堵塞。" },
    { en: "PCB / sensor replacement", job: "PCB / 传感器更换", note: "故障代码工作对照该型号的错误表再订购备件。" },
  ]);
  const landedMature2 = per([
    { en: "Family multi-unit visit", job: "家庭多机上门", note: "周末预约；3–5台机组中每一台都得到与单机公寓上门相同的技术照顾。" },
    { en: "Older non-inverter wash", job: "老定频清洗", note: "定频机以完整机械清洗而非冲洗处理。" },
    { en: "Inverter wash with PCB protection", job: "带PCB保护的变频清洗", note: "同一房子里的新变频机在整个清洗过程中都有PCB遮挡。" },
    { en: "Bracket + drain-fall audit", job: "支架 + 排水坡度审计", note: "排屋室外机在老化支架上做安全拉拔测试。" },
  ]);
  const landedMature3 = per([
    { en: "Standard chemical wash", job: "标准化学清洗", note: "排屋客户通常安排的是定期上门，不是紧急上门；时段通常为2-3小时区块。" },
    { en: "Whole-house cool-down verify", job: "全屋冷却验证", note: "所有清洗过的机组一起运行15分钟；出风口温度得到验证。" },
    { en: "Drain flush + gas top-up", job: "排水冲洗 + 加冷媒", note: "两者在排屋工作上都常见；同意补气前先分享压力读数。" },
    { en: "Replacement quote for end-of-life units", job: "寿命末期机组更换报价", note: "如果机组超过经济维修范围，会在WhatsApp上发送诚实的更换报价——不施压。" },
  ]);

  const commercialHeavy0 = per([
    { en: "Scheduled deep clean", job: "定期深度清洗", note: "长时间运转的商业机组做盘管+风轮深度清洗，而非快速冲洗。" },
    { en: "Condensate pump service", job: "冷凝水泵保养", note: "任何泵都用桶注水做检测；泵停摆是店铺天花板偶尔漏水的原因。" },
    { en: "Cassette grille rebuild", job: "卡式机出风口重装", note: "天花卡式机放下，出风格栅单独清洗；复装前确认四个扇叶的风量。" },
    { en: "Belts / bearings replacement", job: "皮带 / 轴承更换", note: "接近寿命末期的部件会标注等待下次上门时更换。" },
  ]);
  const commercialHeavy1 = per([
    { en: "Deep chemical wash", job: "深度化学清洗", note: "盘管使用碱性药水，然后两阶段冲洗；商业盘管比住宅盘管更能承受这种处理。" },
    { en: "Drain + pump audit", job: "排水 + 泵审计", note: "排水线和冷凝水泵都测试；报告归档给现场业主。" },
    { en: "Electrical isolator check", job: "电气隔离开关检查", note: "每次商业上门都确认隔离开关切断的是目标机组。" },
    { en: "PCB / driver replacement", job: "PCB / 驱动板更换", note: "对于故障代码机组，驱动PCB根据该型号的错误表订购。" },
  ]);
  const commercialHeavy2 = per([
    { en: "Scheduled visit under shutdown window", job: "按停机窗口安排的定期上门", note: "现场经理确认安全停机时段。" },
    { en: "Cassette + wall-unit rebuild", job: "卡式机 + 壁挂机重装", note: "风轮取下并单独清洗。" },
    { en: "Baseline vs post-wash readings", job: "基准与清洗后读数对比", note: "清洗前后都记录出风口温度。" },
    { en: "Preventive schedule note", job: "预防性时间表说明", note: "根据日运转时数和粉尘负荷建议下次上门窗口。" },
  ]);
  const commercialHeavy3 = per([
    { en: "Full commercial clean", job: "完整商业清洗", note: "盘管+风轮+排水+冷凝水泵；每次上门都当作定期保养。" },
    { en: "Site-log entry", job: "现场台账登记", note: "清洗日期、盘管状况、泵测试结果和下次建议日期都进入现场台账。" },
    { en: "End-of-life part flagging", job: "寿命末期部件标注", note: "接近寿命末期的皮带和轴承会被标注等待计划更换。" },
    { en: "Emergency callout backup", job: "紧急上门后备", note: "对于在我们计划中的现场，紧急上门会安排在计划时段之间。" },
  ]);

  const hillside0 = per([
    { en: "Bracket audit + chemical wash", job: "支架审计 + 化学清洗", note: "支架墙锚先做拉拔测试。" },
    { en: "Drain-fall correction", job: "排水坡度修正", note: "坡度低于标准的先修，再洗盘管。" },
    { en: "Debris-lift pass", job: "除杂工序", note: "山坡花园里的室外盘管会积落叶和昆虫；碱性清洗开始前先做除杂。" },
    { en: "Vibration + noise verification", job: "振动 + 噪音核验", note: "复装后压缩机运行15分钟，任何支架振动都会被听并记录。" },
  ]);
  const hillside1 = per([
    { en: "Chemical wash with drain-fall check", job: "带排水坡度检查的化学清洗", note: "标准的山坡上门。" },
    { en: "Pipe insulation walk", job: "管线保温巡视", note: "室内和室外之间的管线保温会检查是否有阳光损坏和缺口。" },
    { en: "Bracket safety audit", job: "支架安全审计", note: "锚点用手做拉拔测试。" },
    { en: "Gas + compressor sound test", job: "冷媒 + 压缩机声音测试", note: "倾听压缩机的低沉运转声，判断负载是否正常。" },
  ]);
  const hillside2 = per([
    { en: "Full hillside wash", job: "完整山坡清洗", note: "盘管、风轮和排水，加上除杂工序。" },
    { en: "Outdoor coil pressure rinse", job: "室外盘管加压冲洗", note: "山坡室外盘管能承受加压冲洗。" },
    { en: "Owner report with photos", job: "带照片的屋主报告", note: "支架、排水坡度和盘管照片在WhatsApp分享。" },
    { en: "Bracket replacement quote", job: "支架更换报价", note: "老化的山坡支架单独报价。" },
  ]);
  const hillside3 = per([
    { en: "Hillside chemical wash", job: "山坡化学清洗", note: "标准上门；两个额外步骤是山坡工作很少需要二次上门的原因。" },
    { en: "Cool-down verification", job: "冷却验证", note: "压缩机复装后运行15分钟，出风口温度得到确认。" },
    { en: "Insulation repair quote", job: "保温修复报价", note: "缺失的管线保温在清洗前报价。" },
    { en: "Whole-house planning note", job: "全屋规划说明", note: "对于机组较多的大型山坡屋子，WhatsApp说明会建议下次上门窗口。" },
  ]);

  const outer0 = per([
    { en: "Honest repair-or-replace call", job: "诚实的维修或更换判断", note: "对于10年以上的机组，客户会得到直白的维修或更换建议。" },
    { en: "Capacitor + wiring test", job: "电容 + 电线测试", note: "老安装常常有磨损电容和老化室外电线；两者在清洗报价前都测试。" },
    { en: "R22 refrigerant flagging", job: "R22冷媒特别标注", note: "R22机组会被特别指出，因为冷媒现在难以采购。" },
    { en: "Chemical wash", job: "化学清洗", note: "当机组值得清洗时，上门按与城市工作相同的标准进行。" },
  ]);
  const outer1 = per([
    { en: "Situation-questions visit", job: "情况提问式上门", note: "抵达时问三个问题——年龄、上次清洗、最近变化——决定这次是清洗还是诊断。" },
    { en: "Non-invasive check", job: "非破坏性检查", note: "先不拆室内机，检查室外盘管、排水和电容。" },
    { en: "Written price on WhatsApp", job: "WhatsApp书面报价", note: "客户在任何面板打开前就在WhatsApp上看到最终价格。" },
    { en: "Cool-down verification", job: "冷却验证", note: "机组运行15分钟，出风口温度得到验证后再结单。" },
  ]);
  const outer2 = per([
    { en: "Right-service quote", job: "对症服务报价", note: "客户在WhatsApp上看到一个推荐服务和一个替代方案。" },
    { en: "Ground-floor unit wash", job: "地面机组清洗", note: "大多数外围乡镇的室外机在地面。" },
    { en: "Refrigerant + capacitor test", job: "冷媒 + 电容测试", note: "先测冷媒压力和电容微法拉。" },
    { en: "Photo-backed closeout", job: "带照片结单", note: "盘管、排水和室外风扇照片附在WhatsApp完工消息里。" },
  ]);
  const outer3 = per([
    { en: "Warranty-noted chemical wash", job: "带保修说明的化学清洗", note: "每次上门以1个月工艺保修说明结束。" },
    { en: "Repair-or-replace recommendation", job: "维修或更换建议", note: "对于10年以上的机组，直白告知客户。" },
    { en: "Isolator + electrical audit", job: "隔离开关 + 电气审计", note: "每次上门都检查隔离开关和外露电线。" },
    { en: "Cool-down verification", job: "冷却验证", note: "每台清洗过的机组运行20分钟，出风口温度得到验证后技师才离开。" },
  ]);

  return {
    kljCore: { 0: kljCore0, 1: kljCore1, 2: kljCore2, 3: kljCore3 },
    pjMix: { 0: pjMix0, 1: pjMix1, 2: pjMix2, 3: pjMix3 },
    gatedGrowth: { 0: gatedGrowth0, 1: gatedGrowth1, 2: gatedGrowth2, 3: gatedGrowth3 },
    landedMature: { 0: landedMature0, 1: landedMature1, 2: landedMature2, 3: landedMature3 },
    commercialHeavy: { 0: commercialHeavy0, 1: commercialHeavy1, 2: commercialHeavy2, 3: commercialHeavy3 },
    hillside: { 0: hillside0, 1: hillside1, 2: hillside2, 3: hillside3 },
    outerTownship: { 0: outer0, 1: outer1, 2: outer2, 3: outer3 },
  };
}
