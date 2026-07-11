/**
 * Round 52 / 10.8 — Entity Hub Linking for core HVAC problem clusters.
 *
 * Groups the 20 problem pages into customer-facing symptom hubs so the
 * /problems index (and localized MS/ZH indexes) can strengthen internal
 * linking around related HVAC entities without exposing SEO jargon.
 */

export type HubLocale = "en" | "ms" | "zh";

export interface ProblemEntityHub {
  id: string;
  /** Problem slugs that belong to this hub (must exist in siteConfig.problemPages) */
  problemSlugs: string[];
  /** Primary service slug to promote from this hub */
  primaryService: string;
  /** Optional secondary services */
  secondaryServices: string[];
  labels: {
    en: { title: string; blurb: string };
    ms: { title: string; blurb: string };
    zh: { title: string; blurb: string };
  };
}

export const PROBLEM_ENTITY_HUBS: ProblemEntityHub[] = [
  {
    id: "cooling-performance",
    problemSlugs: [
      "aircond-not-cold",
      "aircond-weak-airflow",
      "aircond-freezing-up",
      "aircond-high-electricity-bill",
    ],
    primaryService: "chemical-wash",
    secondaryServices: ["gas-topup", "basic-servicing"],
    labels: {
      en: {
        title: "Cooling Performance Issues",
        blurb:
          "Not cold, weak airflow, ice build-up, or high TNB bills — usually dirty coils, low gas, or airflow restriction.",
      },
      ms: {
        title: "Masalah Prestasi Penyejukan",
        blurb:
          "Tidak sejuk, angin lemah, berais, atau bil elektrik tinggi — biasanya gegelung kotor, gas rendah, atau aliran udara tersekat.",
      },
      zh: {
        title: "制冷性能问题",
        blurb: "不冷、风量弱、结冰或电费偏高——通常是盘管脏、冷媒不足或风路受阻。",
      },
    },
  },
  {
    id: "water-drainage",
    problemSlugs: [
      "aircond-water-leaking",
      "aircond-indoor-unit-leaking",
      "aircond-water-dripping",
    ],
    primaryService: "chemical-overhaul",
    secondaryServices: ["chemical-wash", "repair"],
    labels: {
      en: {
        title: "Water Leaking & Drainage",
        blurb:
          "Dripping indoor units and blocked drain lines — fixed with deep cleaning or full overhaul when mould and sludge return.",
      },
      ms: {
        title: "Bocor Air & Saliran",
        blurb:
          "Unit dalam bocor dan paip longkang tersumbat — diselesaikan dengan cuci mendalam atau overhaul penuh bila kulat berulang.",
      },
      zh: {
        title: "漏水与排水问题",
        blurb: "室内机滴水、排水管堵塞——深度清洗或彻底大修可处理反复发霉与污泥。",
      },
    },
  },
  {
    id: "gas-refrigerant",
    problemSlugs: ["aircond-low-gas", "aircond-gas-leak", "aircond-not-cold"],
    primaryService: "gas-topup",
    secondaryServices: ["repair", "chemical-wash"],
    labels: {
      en: {
        title: "Gas & Refrigerant Issues",
        blurb:
          "Low cooling from R22 / R410A / R32 imbalance or leaks — precision top-up only after leak checks.",
      },
      ms: {
        title: "Masalah Gas & Refrigerant",
        blurb:
          "Penyejukan lemah akibat gas R22 / R410A / R32 tidak seimbang atau bocor — tambah gas tepat selepas semakan kebocoran.",
      },
      zh: {
        title: "冷媒与加气问题",
        blurb: "R22 / R410A / R32 不足或泄漏导致不冷——先查漏再精准加气。",
      },
    },
  },
  {
    id: "electrical-startup",
    problemSlugs: [
      "aircond-not-turning-on",
      "aircond-tripping-power",
      "aircond-blinking-light",
      "aircond-remote-not-working",
      "aircond-thermostat-problems",
    ],
    primaryService: "repair",
    secondaryServices: ["emergency", "gas-topup"],
    labels: {
      en: {
        title: "Electrical & Startup Faults",
        blurb:
          "Won’t start, MCB trips, blinking error lights, remote or thermostat faults — diagnosed before parts are replaced.",
      },
      ms: {
        title: "Masalah Elektrik & Hidupkan Unit",
        blurb:
          "Tidak hidup, trip MCB, lampu berkedip, remote atau termostat rosak — didiagnosis dulu sebelum tukar alat ganti.",
      },
      zh: {
        title: "电气与启动故障",
        blurb: "无法启动、跳闸、闪灯、遥控或温控故障——先诊断再更换配件。",
      },
    },
  },
  {
    id: "noise-mechanical",
    problemSlugs: [
      "aircond-making-noise",
      "aircond-fan-not-working",
      "aircond-compressor-problem",
      "aircond-outdoor-unit-not-running",
      "aircond-pcb-problem",
    ],
    primaryService: "repair",
    secondaryServices: ["chemical-wash", "emergency"],
    labels: {
      en: {
        title: "Noise & Mechanical Failures",
        blurb:
          "Strange noises, dead fan motors, outdoor unit stoppage, compressor or PCB faults — parts quoted before work.",
      },
      ms: {
        title: "Bunyi & Kerosakan Mekanikal",
        blurb:
          "Bunyi pelik, motor kipas rosak, unit luar berhenti, kompresor atau PCB rosak — harga alat ganti disahkan sebelum kerja.",
      },
      zh: {
        title: "噪音与机械故障",
        blurb: "异响、风扇停转、外机不工作、压缩机或PCB故障——更换前先确认报价。",
      },
    },
  },
  {
    id: "air-quality-smell",
    problemSlugs: ["aircond-bad-smell", "aircond-weak-airflow"],
    primaryService: "chemical-wash",
    secondaryServices: ["chemical-overhaul", "basic-servicing"],
    labels: {
      en: {
        title: "Smell & Air Quality",
        blurb:
          "Musty or foul smell when the unit starts — mould on the coil and blower, cleared with pressure chemical wash.",
      },
      ms: {
        title: "Bau & Kualiti Udara",
        blurb:
          "Bau hapak atau busuk bila unit hidup — kulat pada gegelung dan blower, dibersihkan dengan cuci kimia bertekanan.",
      },
      zh: {
        title: "异味与空气质量",
        blurb: "开机有霉味或臭味——盘管与风轮发霉，高压化学清洗可清除。",
      },
    },
  },
];

export function getHubLabel(hub: ProblemEntityHub, locale: HubLocale) {
  return hub.labels[locale];
}

export function getHubsForProblem(problemSlug: string): ProblemEntityHub[] {
  return PROBLEM_ENTITY_HUBS.filter((hub) => hub.problemSlugs.includes(problemSlug));
}
