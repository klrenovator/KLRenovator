import { waLink } from "@/lib/whatsapp";

export type ServiceCROLocale = "en" | "ms" | "zh";

export type ServiceCROStage = {
  id: "ready" | "pricing" | "diagnosis";
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  external?: boolean;
};

export type ServiceCROModule = {
  taskId: "8.5";
  eyebrow: string;
  heading: string;
  intro: string;
  stages: ServiceCROStage[];
  reassurance: string;
};

const SERVICE_CONTEXT: Record<string, Record<ServiceCROLocale, string>> = {
  "chemical-wash": {
    en: "deep-cleaning a mounted wall unit",
    ms: "deep-clean unit dinding tanpa buka penuh",
    zh: "挂壁机原位深层清洗",
  },
  "chemical-overhaul": {
    en: "full dismantle cleaning for severe blockage, leak or ice issues",
    ms: "dismantle penuh untuk blockage, bocor atau ais yang serius",
    zh: "针对严重堵塞、漏水或结冰的完整拆机清洗",
  },
  "gas-topup": {
    en: "pressure diagnosis and refrigerant balancing",
    ms: "diagnosis tekanan dan balancing refrigerant",
    zh: "压力诊断和冷媒平衡",
  },
  repair: {
    en: "fault diagnosis before replacing parts",
    ms: "diagnosis punca sebelum tukar parts",
    zh: "更换零件前的故障诊断",
  },
  installation: {
    en: "new aircond installation with pipe, drain and vacuum workflow",
    ms: "pemasangan aircond baharu dengan paip, drain dan vacuum",
    zh: "包含铜管、排水和抽真空流程的新机安装",
  },
  "basic-servicing": {
    en: "routine maintenance and preventive cleaning",
    ms: "maintenance rutin dan pembersihan pencegahan",
    zh: "例行保养与预防性清洁",
  },
  "ceiling-cassette": {
    en: "commercial cassette servicing and drain checks",
    ms: "servis cassette komersial dan semakan drain",
    zh: "商业卡式机保养和排水检查",
  },
  "dismantling-relocation": {
    en: "safe dismantle, pump-down, relocation and reinstall planning",
    ms: "buka, pump-down, pindah dan rancang pasang semula dengan selamat",
    zh: "安全拆除、回收冷媒、搬迁和重新安装规划",
  },
  emergency: {
    en: "urgent safety triage and same-day breakdown response",
    ms: "triage keselamatan segera dan respons rosak hari sama",
    zh: "紧急安全判断和当天故障响应",
  },
};

const TEXT = {
  en: {
    eyebrow: "8.5 SXO/CRO · Choose by intent stage",
    heading: (title: string) => `What do you want to do next for ${title}?`,
    intro: (title: string, context: string) =>
      `Pick the call-to-action that matches your stage. This ${title} page supports three common user intents: ready to book, checking price first, or confirming whether ${context} is the right solution.`,
    reassurance: "Price, timing and any extra material cost are confirmed before dispatch or before work begins.",
    readyBadge: "Ready now",
    readyTitle: "Book the nearest technician",
    readyDesc: (title: string) => `Send your location, unit count and photos for ${title}. We reply with the nearest slot and confirmed starting price.`,
    readyAction: "WhatsApp booking",
    pricingBadge: "Need price first",
    pricingTitle: "Compare pricing before booking",
    pricingDesc: "Jump straight to the transparent price table, multi-unit savings and material-charge notes before deciding.",
    pricingAction: "Jump to pricing",
    diagnosisBadge: "Still researching",
    diagnosisTitle: "Check symptoms before choosing",
    diagnosisDesc: "If you are not sure this is the correct service, review the diagnostic guide links and symptom explanations first.",
    diagnosisAction: "Check diagnostic guides",
    waMessage: (title: string) => `Hi KL Renovator, I want to book ${title}.\n\nLocation:\nNumber of units:\nHP / brand (if known):\nPhotos attached if needed.\n\nPlease confirm price and nearest available slot.`,
  },
  ms: {
    eyebrow: "8.5 SXO/CRO · Pilih ikut tahap niat",
    heading: (title: string) => `Apa langkah seterusnya untuk ${title}?`,
    intro: (title: string, context: string) =>
      `Pilih CTA yang sepadan dengan tahap anda. Halaman ${title} ini menyokong tiga niat utama: sudah mahu tempah, mahu semak harga dahulu, atau mahu pastikan sama ada ${context} ialah solusi yang betul.`,
    reassurance: "Harga, masa dan sebarang kos bahan tambahan disahkan sebelum dispatch atau sebelum kerja bermula.",
    readyBadge: "Sedia tempah",
    readyTitle: "Tempah juruteknik terdekat",
    readyDesc: (title: string) => `Hantar lokasi, bilangan unit dan foto untuk ${title}. Kami balas slot terdekat dan harga permulaan yang disahkan.`,
    readyAction: "WhatsApp tempahan",
    pricingBadge: "Semak harga dahulu",
    pricingTitle: "Banding harga sebelum tempah",
    pricingDesc: "Pergi terus ke jadual harga telus, diskaun multi-unit dan nota caj bahan sebelum membuat keputusan.",
    pricingAction: "Pergi ke harga",
    diagnosisBadge: "Masih membuat semakan",
    diagnosisTitle: "Semak simptom sebelum pilih",
    diagnosisDesc: "Jika belum pasti servis ini tepat, semak pautan panduan diagnosis dan penerangan simptom terlebih dahulu.",
    diagnosisAction: "Semak panduan diagnosis",
    waMessage: (title: string) => `Hi KL Renovator, saya nak tempah ${title}.\n\nLokasi:\nBilangan unit:\nHP / jenama (jika tahu):\nFoto dilampirkan jika perlu.\n\nSila sahkan harga dan slot terdekat.`,
  },
  zh: {
    eyebrow: "8.5 SXO/CRO · 按意图阶段选择",
    heading: (title: string) => `${title}下一步要做什么？`,
    intro: (title: string, context: string) =>
      `请选择符合您当前阶段的CTA。此${title}页面支持三种常见意图：准备预约、先看价格，或先确认${context}是否是正确方案。`,
    reassurance: "派工或开工前会先确认价格、时间和任何额外材料费用。",
    readyBadge: "准备预约",
    readyTitle: "预约最近技术员",
    readyDesc: (title: string) => `发送位置、机器数量和${title}相关照片。我们会回复最近时段和确认起步价。`,
    readyAction: "WhatsApp预约",
    pricingBadge: "先看价格",
    pricingTitle: "预约前比较收费",
    pricingDesc: "直接跳到透明价格表、多台优惠和材料收费说明，再决定是否预约。",
    pricingAction: "查看收费",
    diagnosisBadge: "还在了解",
    diagnosisTitle: "选择前先检查症状",
    diagnosisDesc: "如果不确定此服务是否正确，请先查看诊断指南链接和症状说明。",
    diagnosisAction: "查看诊断指南",
    waMessage: (title: string) => `Hi KL Renovator，我想预约${title}。\n\n位置：\n机器数量：\nHP / 品牌（如知道）：\n需要时可附照片。\n\n请确认价格和最近可预约时段。`,
  },
} as const;

function contextFor(slug: string, locale: ServiceCROLocale) {
  return SERVICE_CONTEXT[slug]?.[locale] ?? SERVICE_CONTEXT["basic-servicing"][locale];
}

export function buildServiceCRORefinementModule(
  slug: string,
  locale: ServiceCROLocale,
  title: string
): ServiceCROModule {
  const t = TEXT[locale];
  const context = contextFor(slug, locale);
  const isEmergency = slug === "emergency";

  return {
    taskId: "8.5",
    eyebrow: t.eyebrow,
    heading: t.heading(title),
    intro: t.intro(title, context),
    reassurance: t.reassurance,
    stages: [
      {
        id: "ready",
        badge: t.readyBadge,
        title: isEmergency ? (locale === "zh" ? "立即请求紧急帮助" : locale === "ms" ? "Minta bantuan kecemasan sekarang" : "Request emergency help now") : t.readyTitle,
        description: isEmergency
          ? (locale === "zh"
              ? "发送实时位置、症状视频和受影响机器数量，我们会优先判断安全风险并确认最快时段。"
              : locale === "ms"
                ? "Hantar lokasi live, video simptom dan bilangan unit terjejas; kami utamakan risiko keselamatan dan slot terpantas."
                : "Send your live location, symptom video and affected unit count so we can triage safety risk and nearest slot.")
          : t.readyDesc(title),
        actionLabel: isEmergency ? (locale === "zh" ? "WhatsApp紧急服务" : locale === "ms" ? "WhatsApp kecemasan" : "WhatsApp emergency") : t.readyAction,
        href: waLink(t.waMessage(title)),
        external: true,
      },
      {
        id: "pricing",
        badge: t.pricingBadge,
        title: isEmergency ? (locale === "zh" ? "先确认诊断费" : locale === "ms" ? "Sahkan caj diagnosis dahulu" : "Confirm diagnostic fee first") : t.pricingTitle,
        description: isEmergency
          ? (locale === "zh"
              ? "查看紧急服务FAQ，了解RM88诊断费、加班附加费和报价确认流程。"
              : locale === "ms"
                ? "Semak FAQ kecemasan untuk caj diagnostik RM88, caj overtime dan proses pengesahan harga."
                : "Review emergency FAQs for RM88 diagnostic fee, overtime surcharge and quote-before-work policy.")
          : t.pricingDesc,
        actionLabel: isEmergency ? (locale === "zh" ? "查看紧急FAQ" : locale === "ms" ? "Lihat FAQ kecemasan" : "View emergency FAQ") : t.pricingAction,
        href: isEmergency ? "#emergency-faq" : "#service-pricing",
      },
      {
        id: "diagnosis",
        badge: t.diagnosisBadge,
        title: isEmergency ? (locale === "zh" ? "判断是否紧急" : locale === "ms" ? "Sahkan jika ini kecemasan" : "Check if this is urgent") : t.diagnosisTitle,
        description: isEmergency
          ? (locale === "zh"
              ? "先对照紧急情况清单：严重漏水、跳电、烧焦味、完全不运转或商业空间无制冷。"
              : locale === "ms"
                ? "Semak senarai kecemasan: bocor teruk, trip elektrik, bau terbakar, unit mati total atau premis komersial tiada cooling."
                : "Compare against emergency situations: heavy leaking, tripping, burning smell, total breakdown or commercial no-cooling.")
          : t.diagnosisDesc,
        actionLabel: isEmergency ? (locale === "zh" ? "查看紧急情况" : locale === "ms" ? "Semak situasi kecemasan" : "Check emergency situations") : t.diagnosisAction,
        href: isEmergency ? "#emergency-situations" : "#diagnostic-guides",
      },
    ],
  };
}
