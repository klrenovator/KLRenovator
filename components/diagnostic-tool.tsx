"use client";

import { useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DiagnosticStep {
  id: string;
  question: { en: string; ms: string; zh: string };
  options: DiagnosticOption[];
}

interface DiagnosticOption {
  label: { en: string; ms: string; zh: string };
  next?: string; // next step id, or "result:xxx"
  result?: DiagnosticResult;
}

interface DiagnosticResult {
  title: { en: string; ms: string; zh: string };
  cause: { en: string; ms: string; zh: string };
  solution: { en: string; ms: string; zh: string };
  urgency: "low" | "medium" | "high" | "emergency";
  serviceSlug: string;
  serviceName: string;
  problemSlug?: string;
}

// ── Diagnostic Tree ───────────────────────────────────────────────────────────
const STEPS: Record<string, DiagnosticStep> = {
  start: {
    id: "start",
    question: {
      en: "What is the main problem with your aircond?",
      ms: "Apakah masalah utama aircond anda?",
      zh: "您的冷气主要出现什么问题？",
    },
    options: [
      {
        label: { en: "❄️ Not cold / Warm air", ms: "Tidak sejuk / Udara panas", zh: "不冷 / 吹热风" },
        next: "not-cold",
      },
      {
        label: { en: "💧 Water leaking / Dripping", ms: "Bocor air / Menitis", zh: "漏水 / 滴水" },
        next: "water-leak",
      },
      {
        label: { en: "🔊 Making strange noises", ms: "Bunyi pelik / Bising", zh: "发出异常噪音" },
        next: "noise",
      },
      {
        label: { en: "😷 Bad smell / Mouldy odour", ms: "Bau busuk / Bau kulat", zh: "异味 / 霉味" },
        next: "smell",
      },
      {
        label: { en: "🔴 Not turning on at all", ms: "Langsung tidak hidup", zh: "完全无法开机" },
        next: "not-on",
      },
      {
        label: { en: "⚡ Tripping MCB / Power issue", ms: "Jatuh MCB / Masalah kuasa", zh: "跳闸断电" },
        result: {
          title: { en: "Electrical Fault Detected", ms: "Kerosakan Elektrik", zh: "电气故障" },
          cause: { en: "A tripping MCB usually means a shorted compressor, faulty capacitor, or wiring issue. This is a safety concern requiring immediate inspection.", ms: "MCB jatuh biasanya bermakna kompressor terlitar pintas, kapasitor rosak, atau masalah pendawaian. Ini adalah isu keselamatan.", zh: "MCB跳闸通常意味着压缩机短路、电容器故障或接线问题。这是需要立即检查的安全隐患。" },
          solution: { en: "Do not keep resetting the MCB. Switch off the aircond and call KL Renovator immediately for a safety inspection.", ms: "Jangan terus set semula MCB. Matikan aircond dan hubungi KL Renovator segera.", zh: "请勿反复重置MCB。关闭冷气并立即联系KL Renovator进行安全检查。" },
          urgency: "emergency",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Repair",
          problemSlug: "aircond-tripping-power",
        },
      },
      {
        label: { en: "🧊 Ice forming on unit", ms: "Ais terbentuk pada unit", zh: "机器结冰" },
        result: {
          title: { en: "Ice Formation on Evaporator Coil", ms: "Pembentukan Ais pada Gegelung Evaporator", zh: "蒸发器盘管结冰" },
          cause: { en: "Ice on the coil is caused by low refrigerant gas or a severely blocked evaporator coil — or both. The unit will eventually stop cooling completely.", ms: "Ais pada gegelung disebabkan gas penyejuk rendah atau gegelung evaporator tersumbat teruk.", zh: "盘管结冰是由冷媒不足或蒸发器盘管严重堵塞（或两者兼有）引起的。" },
          solution: { en: "Switch off the unit and let it defrost for 2 hours. Then book a gas check + chemical overhaul with KL Renovator to fix both causes.", ms: "Matikan unit dan biarkan ia nyahbeku selama 2 jam. Kemudian tempah semak gas + overhaul kimia.", zh: "关闭机器让其自然化冻2小时，然后预约KL Renovator进行充气检查+化学大修以修复两种原因。" },
          urgency: "high",
          serviceSlug: "chemical-overhaul",
          serviceName: "Chemical Overhaul + Gas Check",
          problemSlug: "aircond-freezing-up",
        },
      },
      {
        label: { en: "📱 Remote / display issue", ms: "Masalah remote / paparan", zh: "遥控/显示屏问题" },
        result: {
          title: { en: "Remote Control or Display Fault", ms: "Kerosakan Remote atau Paparan", zh: "遥控器或显示屏故障" },
          cause: { en: "This is usually a dead battery, faulty IR receiver on the indoor unit, or a PCB board issue.", ms: "Ini biasanya bateri habis, penerima IR rosak pada unit dalam, atau masalah papan PCB.", zh: "通常是电池耗尽、室内机红外接收器故障或PCB电路板问题。" },
          solution: { en: "First try replacing the remote battery. If the unit still doesn't respond, the IR receiver or PCB needs inspection. KL Renovator diagnoses on-site.", ms: "Cuba tukar bateri remote dahulu. Jika unit masih tidak bertindak balas, penerima IR atau PCB perlu diperiksa.", zh: "先尝试更换遥控器电池。如果机器仍无响应，需要检查红外接收器或PCB。KL Renovator上门诊断。" },
          urgency: "medium",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Repair",
          problemSlug: "aircond-remote-not-working",
        },
      },
    ],
  },

  "not-cold": {
    id: "not-cold",
    question: {
      en: "How long has it been not cold?",
      ms: "Sudah berapa lama tidak sejuk?",
      zh: "不制冷多久了？",
    },
    options: [
      {
        label: { en: "Just started — suddenly warm", ms: "Baru bermula — tiba-tiba panas", zh: "刚刚开始——突然变热" },
        next: "not-cold-sudden",
      },
      {
        label: { en: "Gradually getting warmer over weeks", ms: "Beransur-ansur panas selama beberapa minggu", zh: "几周内逐渐变热" },
        result: {
          title: { en: "Gradual Refrigerant Gas Loss", ms: "Kehilangan Gas Penyejuk Beransur-ansur", zh: "冷媒气体逐渐流失" },
          cause: { en: "Gradual cooling loss is almost always caused by slow refrigerant gas leak. Your system has lost pressure over time and can no longer cool effectively.", ms: "Kehilangan penyejukan beransur-ansur hampir selalu disebabkan kebocoran gas perlahan. Tekanan sistem telah berkurang.", zh: "逐渐失去制冷能力几乎总是由缓慢的冷媒泄漏引起的。系统压力随时间降低。" },
          solution: { en: "Book a gas top-up + leak check with KL Renovator. A precision manifold gauge check identifies the gas type and correct pressure. Leak check included.", ms: "Tempah tambah gas + semak kebocoran dengan KL Renovator. Semak tolok manifold mengenal pasti jenis gas dan tekanan betul.", zh: "预约KL Renovator进行充气+泄漏检查。精密压力表检查确定气体类型和正确压力，含泄漏检查。" },
          urgency: "medium",
          serviceSlug: "gas-topup",
          serviceName: "Gas Top-Up / Precision Balancing",
          problemSlug: "aircond-low-gas",
        },
      },
      {
        label: { en: "Always felt slightly warm / weak", ms: "Sentiasa terasa sedikit panas / lemah", zh: "一直感觉偏热/风力弱" },
        result: {
          title: { en: "Blocked Evaporator Coil / Dirty Filter", ms: "Gegelung Evaporator Tersumbat / Penapis Kotor", zh: "蒸发器盘管堵塞/过滤网脏" },
          cause: { en: "Consistently weak cooling is caused by a dirty evaporator coil and blower wheel. Dust and mould block airflow and heat exchange, reducing cooling by up to 40%.", ms: "Penyejukan lemah secara konsisten disebabkan gegelung evaporator dan roda blower yang kotor.", zh: "持续的弱冷是由脏的蒸发器盘管和风轮引起的。灰尘和霉菌堵塞气流和热交换，降低制冷效率高达40%。" },
          solution: { en: "A pressure chemical wash will restore full cooling power. Recommended every 12 months. Book with KL Renovator — from RM 120.", ms: "Cuci kimia bertekanan akan memulihkan kuasa penyejukan penuh. Disyorkan setiap 12 bulan. Tempah dengan KL Renovator — dari RM 120.", zh: "压力化学清洗将恢复全部制冷能力。建议每12个月一次。预约KL Renovator——从RM 120起。" },
          urgency: "medium",
          serviceSlug: "chemical-wash",
          serviceName: "Pressure Chemical Wash",
          problemSlug: "aircond-not-cold",
        },
      },
    ],
  },

  "not-cold-sudden": {
    id: "not-cold-sudden",
    question: {
      en: "Is the outdoor unit running?",
      ms: "Adakah unit luar berjalan?",
      zh: "室外机是否在运转？",
    },
    options: [
      {
        label: { en: "Yes — outdoor fan is spinning", ms: "Ya — kipas luar berpusing", zh: "是的——室外风扇在转" },
        result: {
          title: { en: "Likely Low Gas or Faulty Capacitor", ms: "Kemungkinan Gas Rendah atau Kapasitor Rosak", zh: "可能是气体不足或电容器故障" },
          cause: { en: "If the outdoor unit runs but doesn't cool, the most common causes are low refrigerant gas (R22/R410A/R32) or a failed capacitor — both cause warm air output.", ms: "Jika unit luar berjalan tetapi tidak menyejuk, punca paling biasa adalah gas penyejuk rendah atau kapasitor gagal.", zh: "如果室外机运转但不制冷，最常见的原因是冷媒不足（R22/R410A/R32）或电容器故障——两者都导致吹出暖风。" },
          solution: { en: "Book a diagnostic with KL Renovator. Diagnostic RM 88 (waived if repaired same visit). We'll identify gas loss or capacitor fault on-site.", ms: "Tempah diagnostik dengan KL Renovator. Diagnostik RM 88 (dikecualikan jika diperbaiki dalam lawatan yang sama).", zh: "预约KL Renovator进行诊断。诊断费RM 88（同次上门维修则免收）。我们将现场确认气体不足或电容器故障。" },
          urgency: "medium",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Gas Check",
          problemSlug: "aircond-not-cold",
        },
      },
      {
        label: { en: "No — outdoor unit is completely off", ms: "Tidak — unit luar mati sepenuhnya", zh: "不——室外机完全停止" },
        result: {
          title: { en: "Outdoor Unit Failure", ms: "Kegagalan Unit Luar", zh: "室外机故障" },
          cause: { en: "Outdoor unit not running indicates a compressor fault, blown capacitor, burnt fan motor, or PCB error. This is a significant repair.", ms: "Unit luar tidak berjalan menunjukkan kerosakan kompressor, kapasitor terbakar, motor kipas terbakar, atau ralat PCB.", zh: "室外机不运转表示压缩机故障、电容器烧坏、风扇电机烧坏或PCB错误。这是一项重大维修。" },
          solution: { en: "Book a priority diagnostic. KL Renovator will identify the exact fault and provide a transparent quote before any repair starts.", ms: "Tempah diagnostik keutamaan. KL Renovator akan mengenal pasti kerosakan tepat dan memberikan sebut harga telus sebelum pembaikan.", zh: "预约优先诊断。KL Renovator将确定确切故障并在开始任何维修前提供透明报价。" },
          urgency: "high",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Repair",
          problemSlug: "aircond-outdoor-unit-not-running",
        },
      },
    ],
  },

  "water-leak": {
    id: "water-leak",
    question: {
      en: "How severe is the water leak?",
      ms: "Seberapa teruk kebocoran air?",
      zh: "漏水有多严重？",
    },
    options: [
      {
        label: { en: "Small drip — just occasional drops", ms: "Titisan kecil — titisan sekali-sekala", zh: "小滴水——偶尔几滴" },
        result: {
          title: { en: "Minor Drain Blockage", ms: "Sekatan Longkang Kecil", zh: "轻微排水堵塞" },
          cause: { en: "Small drips from the indoor unit are usually caused by a partially blocked drain pipe. Easy to fix with a chemical wash that includes drain flushing.", ms: "Titisan kecil dari unit dalam biasanya disebabkan paip longkang tersumbat sebahagian.", zh: "室内机偶尔滴水通常是由排水管部分堵塞引起的，通过含排水冲洗的化学清洗即可解决。" },
          solution: { en: "A pressure chemical wash with drain flush from KL Renovator will clear the blockage. From RM 120. Book now before it gets worse.", ms: "Cuci kimia bertekanan dengan pembersihan longkang dari KL Renovator akan membersihkan sekatan. Dari RM 120.", zh: "KL Renovator的压力化学清洗含排水冲洗将清除堵塞。从RM 120起。立即预约以免情况恶化。" },
          urgency: "low",
          serviceSlug: "chemical-wash",
          serviceName: "Pressure Chemical Wash",
          problemSlug: "aircond-water-dripping",
        },
      },
      {
        label: { en: "Heavy leak — water flowing continuously", ms: "Bocor teruk — air mengalir berterusan", zh: "严重漏水——持续流水" },
        result: {
          title: { en: "Severe Drain Blockage or Dirty Drain Pan", ms: "Sekatan Longkang Teruk atau Dulang Longkang Kotor", zh: "严重排水堵塞或排水盘脏污" },
          cause: { en: "Heavy continuous leaking means the drain pipe is fully blocked and the drain pan is overflowing. Requires a chemical overhaul to dismantle and deep-clean the drain system.", ms: "Kebocoran teruk berterusan bermakna paip longkang tersumbat sepenuhnya dan dulang longkang melimpah.", zh: "持续大量漏水意味着排水管完全堵塞且排水盘溢出。需要化学大修来拆开并深度清洁排水系统。" },
          solution: { en: "Book an emergency chemical overhaul with KL Renovator. The unit will be fully dismantled, drain pan cleaned, and drain line cleared. From RM 220.", ms: "Tempah overhaul kimia kecemasan dengan KL Renovator. Unit akan ditanggal sepenuhnya, dulang longkang dibersihkan. Dari RM 220.", zh: "紧急预约KL Renovator化学大修。机器将完全拆开，排水盘清洁，排水管疏通。从RM 220起。" },
          urgency: "high",
          serviceSlug: "chemical-overhaul",
          serviceName: "Chemical Overhaul (Emergency)",
          problemSlug: "aircond-water-leaking",
        },
      },
      {
        label: { en: "Leaking near electrical points / ceiling damage", ms: "Bocor berhampiran titik elektrik / kerosakan siling", zh: "靠近电源位漏水/天花板损坏" },
        result: {
          title: { en: "⚠️ Emergency — Risk of Electrical Damage", ms: "⚠️ Kecemasan — Risiko Kerosakan Elektrik", zh: "⚠️ 紧急——有电气损坏风险" },
          cause: { en: "Water near electrical points is a safety emergency. Switch off the aircond MCB immediately. Heavy drain pan overflow can cause short circuits and ceiling damage.", ms: "Air berhampiran titik elektrik adalah kecemasan keselamatan. Matikan MCB aircond dengan segera.", zh: "电源位附近漏水是安全紧急情况。立即关闭冷气MCB。严重的排水盘溢出会导致短路和天花板损坏。" },
          solution: { en: "Switch off the unit NOW from the MCB. Do not turn it back on. WhatsApp KL Renovator immediately for same-day emergency service.", ms: "Matikan unit SEKARANG dari MCB. Jangan hidupkan semula. WhatsApp KL Renovator segera untuk servis kecemasan hari sama.", zh: "立即从MCB关闭机器。不要重新开启。立即WhatsApp KL Renovator获取当天紧急服务。" },
          urgency: "emergency",
          serviceSlug: "chemical-overhaul",
          serviceName: "Emergency Chemical Overhaul",
          problemSlug: "aircond-indoor-unit-leaking",
        },
      },
    ],
  },

  noise: {
    id: "noise",
    question: {
      en: "What type of noise?",
      ms: "Bunyi jenis apa?",
      zh: "是什么类型的噪音？",
    },
    options: [
      {
        label: { en: "🔔 Rattling / vibration noise", ms: "Bunyi gemetar / getaran", zh: "嘎嘎声/震动声" },
        result: {
          title: { en: "Loose Part or Dirty Fan Blade", ms: "Bahagian Longgar atau Bilah Kipas Kotor", zh: "零件松动或风扇叶片脏" },
          cause: { en: "Rattling is usually a loose fan blade, dirty blower wheel, or loose panel screw. Sometimes a small insect or debris caught in the fan.", ms: "Bunyi gemetar biasanya bilah kipas longgar, roda blower kotor, atau skru panel longgar.", zh: "嘎嘎声通常是风扇叶片松动、风轮脏或面板螺丝松动引起的。有时是小虫或碎屑卡在风扇里。" },
          solution: { en: "A chemical wash will clean the blower wheel and allow the technician to check and tighten all loose components. Book with KL Renovator from RM 120.", ms: "Cuci kimia akan membersihkan roda blower dan membolehkan juruteknik memeriksa dan mengetatkan semua komponen longgar.", zh: "化学清洗将清洁风轮并让技术员检查并拧紧所有松动部件。预约KL Renovator，从RM 120起。" },
          urgency: "low",
          serviceSlug: "chemical-wash",
          serviceName: "Chemical Wash + Inspection",
          problemSlug: "aircond-making-noise",
        },
      },
      {
        label: { en: "💨 Loud humming / buzzing from outdoor unit", ms: "Denguman kuat / berdengung dari unit luar", zh: "室外机嗡嗡响/蜂鸣声" },
        result: {
          title: { en: "Compressor or Fan Motor Issue", ms: "Masalah Kompressor atau Motor Kipas", zh: "压缩机或风扇电机问题" },
          cause: { en: "Loud humming from the outdoor unit is often a failing capacitor, fan motor bearing wear, or compressor starting issue. Left unchecked it can lead to full failure.", ms: "Denguman kuat dari unit luar sering kali kapasitor gagal, haus galas motor kipas, atau masalah permulaan kompressor.", zh: "室外机嗡嗡声通常是电容器失效、风扇电机轴承磨损或压缩机启动问题。不处理可能导致完全故障。" },
          solution: { en: "Book a diagnostic inspection with KL Renovator. Our technician will identify the specific faulty component. Diagnostic RM 88 (waived if repaired same visit).", ms: "Tempah pemeriksaan diagnostik dengan KL Renovator. Juruteknik kami akan mengenal pasti komponen rosak. Diagnostik RM 88.", zh: "预约KL Renovator进行诊断检查。我们的技术员将确定具体的故障部件。诊断费RM 88（同次上门维修则免收）。" },
          urgency: "medium",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Repair",
          problemSlug: "aircond-making-noise",
        },
      },
      {
        label: { en: "🔩 Grinding / screeching noise", ms: "Bunyi menggigit / melengking", zh: "研磨声/尖叫声" },
        result: {
          title: { en: "Fan Motor Bearing Failure", ms: "Kegagalan Galas Motor Kipas", zh: "风扇电机轴承失效" },
          cause: { en: "Grinding or screeching noises indicate a failing fan motor bearing or blower wheel hitting a foreign object. This will worsen and eventually cause complete motor failure.", ms: "Bunyi menggigit atau melengking menunjukkan galas motor kipas gagal atau roda blower terkena objek asing.", zh: "研磨声或尖叫声表示风扇电机轴承失效或风轮碰到异物。这种情况会恶化并最终导致电机完全故障。" },
          solution: { en: "Book an urgent repair inspection. Fan motor replacement from RM 250–450. KL Renovator carries common motor sizes in stock for same-day replacement.", ms: "Tempah pemeriksaan pembaikan segera. Penggantian motor kipas dari RM 250–450. KL Renovator membawa saiz motor biasa untuk penggantian hari sama.", zh: "预约紧急维修检查。风扇电机更换从RM 250–450起。KL Renovator备有常见型号电机可当天更换。" },
          urgency: "high",
          serviceSlug: "repair",
          serviceName: "Fan Motor Replacement",
          problemSlug: "aircond-fan-not-working",
        },
      },
    ],
  },

  smell: {
    id: "smell",
    question: {
      en: "What does the smell remind you of?",
      ms: "Bau apa yang anda rasa?",
      zh: "是什么气味？",
    },
    options: [
      {
        label: { en: "🍄 Musty / mouldy smell", ms: "Bau hapak / kulat", zh: "发霉/霉味" },
        result: {
          title: { en: "Mould and Bacteria Buildup", ms: "Pertumbuhan Kulat dan Bakteria", zh: "霉菌和细菌积累" },
          cause: { en: "Musty smell is caused by mould and bacteria growing on the evaporator coil and blower wheel. Common in Malaysia's high humidity. Affects air quality and health.", ms: "Bau hapak disebabkan kulat dan bakteria tumbuh pada gegelung evaporator dan roda blower.", zh: "发霉气味是由在蒸发器盘管和风轮上生长的霉菌和细菌引起的。在马来西亚高湿度环境中很常见，影响空气质量和健康。" },
          solution: { en: "A pressure chemical wash with anti-bacterial treatment permanently removes mould and smell. From RM 120. For severe cases, a chemical overhaul is recommended.", ms: "Cuci kimia bertekanan dengan rawatan anti-bakteria menghapuskan kulat dan bau secara kekal. Dari RM 120.", zh: "含抗菌处理的压力化学清洗可永久去除霉菌和气味。从RM 120起。严重情况建议化学大修。" },
          urgency: "medium",
          serviceSlug: "chemical-wash",
          serviceName: "Pressure Chemical Wash",
          problemSlug: "aircond-bad-smell",
        },
      },
      {
        label: { en: "🔥 Burning / electrical smell", ms: "Bau terbakar / elektrik", zh: "烧焦/电气气味" },
        result: {
          title: { en: "⚠️ Electrical Fault — Turn Off Immediately", ms: "⚠️ Kerosakan Elektrik — Matikan Segera", zh: "⚠️ 电气故障——立即关机" },
          cause: { en: "A burning or electrical smell from the aircond indicates a PCB board overheating, wiring short circuit, or burning capacitor. This is a fire risk.", ms: "Bau terbakar atau elektrik dari aircond menunjukkan PCB terlampau panas, litar pintas pendawaian, atau kapasitor terbakar. Ini adalah risiko kebakaran.", zh: "冷气发出烧焦或电气气味表示PCB过热、接线短路或电容器燃烧。这是火灾风险。" },
          solution: { en: "TURN OFF THE UNIT IMMEDIATELY from the MCB. Do not turn it back on. Call KL Renovator now for emergency electrical inspection.", ms: "MATIKAN UNIT SEGERA dari MCB. Jangan hidupkan semula. Hubungi KL Renovator sekarang.", zh: "立即从MCB关闭机器。不要重新开启。立即致电KL Renovator进行紧急电气检查。" },
          urgency: "emergency",
          serviceSlug: "repair",
          serviceName: "Emergency Electrical Inspection",
          problemSlug: "aircond-tripping-power",
        },
      },
    ],
  },

  "not-on": {
    id: "not-on",
    question: {
      en: "What happens when you try to turn it on?",
      ms: "Apa yang berlaku apabila anda cuba menghidupkannya?",
      zh: "尝试开机时会发生什么？",
    },
    options: [
      {
        label: { en: "No response at all — completely dead", ms: "Tiada respons langsung — mati sepenuhnya", zh: "完全没有反应——彻底无反应" },
        result: {
          title: { en: "Complete Power Failure", ms: "Kegagalan Kuasa Sepenuhnya", zh: "完全断电故障" },
          cause: { en: "A completely dead unit means power is not reaching the PCB. Check if the MCB has tripped first. If not, the issue is the PCB, capacitor, or wiring.", ms: "Unit yang mati sepenuhnya bermakna kuasa tidak sampai ke PCB. Periksa sama ada MCB jatuh dahulu.", zh: "完全无反应意味着电源没有到达PCB。首先检查MCB是否跳闸。如果没有，问题是PCB、电容器或接线。" },
          solution: { en: "First check your MCB panel. If MCB is fine but unit is still dead, WhatsApp KL Renovator for a same-day diagnostic. RM 88 (waived if repaired same visit).", ms: "Periksa panel MCB anda dahulu. Jika MCB baik-baik saja tetapi unit masih mati, WhatsApp KL Renovator untuk diagnostik hari sama.", zh: "首先检查MCB面板。如果MCB正常但机器仍然无反应，WhatsApp KL Renovator进行当天诊断。RM 88（同次上门维修则免收）。" },
          urgency: "high",
          serviceSlug: "repair",
          serviceName: "Troubleshooting & Repair",
          problemSlug: "aircond-not-turning-on",
        },
      },
      {
        label: { en: "Turns on but shuts off quickly", ms: "Hidup tetapi mati dengan cepat", zh: "开机但很快自动关机" },
        result: {
          title: { en: "Protection Trip / PCB Fault", ms: "Terjatuh Perlindungan / Kerosakan PCB", zh: "保护跳停/PCB故障" },
          cause: { en: "Auto shut-off usually means the unit is entering protection mode — triggered by low gas, high pressure, faulty sensor, or PCB error code.", ms: "Auto mati biasanya bermakna unit memasuki mod perlindungan — dicetuskan oleh gas rendah, tekanan tinggi, sensor rosak, atau kod ralat PCB.", zh: "自动关机通常意味着机器进入保护模式——由气体不足、高压、传感器故障或PCB错误代码触发。" },
          solution: { en: "Check your indoor unit for a blinking light error code. WhatsApp KL Renovator the error code (or a photo) for fast diagnosis. Most causes fixed same-day.", ms: "Semak lampu berkelip unit dalam anda untuk kod ralat. WhatsApp KL Renovator kod ralat untuk diagnosis cepat.", zh: "检查室内机是否有闪烁指示灯错误代码。将错误代码（或照片）WhatsApp给KL Renovator以快速诊断。大多数原因可当天修复。" },
          urgency: "medium",
          serviceSlug: "repair",
          serviceName: "Diagnostic & Error Code Fix",
          problemSlug: "aircond-blinking-light",
        },
      },
      {
        label: { en: "Blinking light / error code showing", ms: "Lampu berkelip / kod ralat ditunjukkan", zh: "指示灯闪烁/显示错误代码" },
        result: {
          title: { en: "Error Code Active", ms: "Kod Ralat Aktif", zh: "错误代码激活" },
          cause: { en: "Blinking lights indicate your aircond has detected a fault and stored an error code. Common codes indicate low gas, sensor fault, communication error, or PCB issue.", ms: "Lampu berkelip menunjukkan aircond anda telah mengesan kerosakan dan menyimpan kod ralat.", zh: "指示灯闪烁表示冷气检测到故障并存储了错误代码。常见代码表示气体不足、传感器故障、通信错误或PCB问题。" },
          solution: { en: "WhatsApp KL Renovator the brand name and blinking pattern / error code shown. We'll diagnose remotely and dispatch the right parts on the same visit.", ms: "WhatsApp KL Renovator nama jenama dan corak berkelip / kod ralat yang ditunjukkan. Kami akan mendiagnosis dari jauh.", zh: "将品牌名称和闪烁模式/错误代码WhatsApp给KL Renovator。我们将远程诊断并在同次上门时携带正确零件。" },
          urgency: "medium",
          serviceSlug: "repair",
          serviceName: "Error Code Diagnosis & Fix",
          problemSlug: "aircond-blinking-light",
        },
      },
    ],
  },
};

const URGENCY_CONFIG = {
  low: {
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Low Urgency — Schedule Within 2–4 Weeks",
    labelMS: "Kecemasan Rendah — Jadualkan Dalam 2–4 Minggu",
    labelZH: "低紧急 — 2-4周内安排",
  },
  medium: {
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    label: "Medium Urgency — Book This Week",
    labelMS: "Kecemasan Sederhana — Tempah Minggu Ini",
    labelZH: "中等紧急 — 本周预约",
  },
  high: {
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    label: "High Urgency — Book Today",
    labelMS: "Kecemasan Tinggi — Tempah Hari Ini",
    labelZH: "高度紧急 — 今天预约",
  },
  emergency: {
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    label: "🚨 Emergency — Act Now",
    labelMS: "🚨 Kecemasan — Bertindak Sekarang",
    labelZH: "🚨 紧急 — 立即行动",
  },
};

function buildDiagnosticWaMsg(result: DiagnosticResult, path: string[]): string {
  return [
    "Hi KL Renovator 👋",
    "",
    "I used your Aircond Diagnostic Tool and need help:",
    "",
    `🔍 Diagnosis: ${result.title.en}`,
    `❄️ Recommended Service: ${result.serviceName}`,
    `⚠️ Urgency: ${result.urgency.toUpperCase()}`,
    "",
    `📋 Problem Path: ${path.join(" → ")}`,
    "",
    "📍 My Location:",
    "🔢 Number of units affected:",
    "🏷️ Aircond brand:",
    "",
    "Please advise and schedule a visit. Thank you!",
  ].join("\n");
}

// ── Component ─────────────────────────────────────────────────────────────────
export function DiagnosticTool() {
  const [currentStep, setCurrentStep] = useState<string>("start");
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  function handleOption(option: DiagnosticOption, optionLabel: string) {
    const newPath = [...path, optionLabel];
    setPath(newPath);

    if (option.result) {
      setResult(option.result);
      setHistory([...history, currentStep]);
    } else if (option.next) {
      setHistory([...history, currentStep]);
      setCurrentStep(option.next);
      setResult(null);
    }
  }

  function handleBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentStep(prev);
    setResult(null);
    setPath(path.slice(0, -1));
  }

  function handleReset() {
    setCurrentStep("start");
    setResult(null);
    setPath([]);
    setHistory([]);
  }

  const step = STEPS[currentStep];
  const urgencyConfig = result ? URGENCY_CONFIG[result.urgency] : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-5 text-white">
        <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Free Instant Diagnosis</p>
        <h3 className="text-xl font-black leading-tight">
          Aircond Problem Diagnostic Tool
        </h3>
        <p className="text-violet-200 text-xs mt-1">
          Alat Diagnostik Masalah Aircond &nbsp;|&nbsp; 冷气问题诊断工具
        </p>
      </div>

      <div className="p-6">
        {/* Progress path */}
        {path.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {path.map((p, i) => (
              <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">
                {p}
              </span>
            ))}
          </div>
        )}

        {/* Question */}
        {!result && step && (
          <div className="space-y-4">
            <div>
              <p className="font-black text-slate-900 text-base sm:text-lg leading-snug mb-1">{step.question.en}</p>
              <p className="text-xs text-slate-400">{step.question.ms} &nbsp;|&nbsp; {step.question.zh}</p>
            </div>
            <div className="space-y-2.5">
              {step.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(option, option.label.en)}
                  className="w-full text-left px-4 py-3.5 rounded-2xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50 text-slate-800 hover:text-violet-900 text-sm font-semibold transition-all active:scale-[0.98] group"
                >
                  <span className="flex items-center justify-between">
                    <span>{option.label.en}</span>
                    <span className="text-slate-300 group-hover:text-violet-400 transition-colors text-lg shrink-0 ml-2">›</span>
                  </span>
                  <span className="text-xs text-slate-400 font-normal block mt-0.5">
                    {option.label.ms} &nbsp;|&nbsp; {option.label.zh}
                  </span>
                </button>
              ))}
            </div>
            {history.length > 0 && (
              <button onClick={handleBack} className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">
                ← Go back
              </button>
            )}
          </div>
        )}

        {/* Result */}
        {result && urgencyConfig && (
          <div className="space-y-4">
            {/* Urgency badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black ${urgencyConfig.badge}`}>
              {urgencyConfig.label}
            </div>

            {/* Result card */}
            <div className={`border rounded-2xl p-5 ${urgencyConfig.color}`}>
              <h4 className="font-black text-slate-900 text-base mb-3">{result.title.en}</h4>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Likely Cause</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.cause.en}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{result.cause.ms}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{result.cause.zh}</p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Recommended Action</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.solution.en}</p>
                </div>
              </div>
            </div>

            {/* Service link */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Recommended Service</p>
                <p className="font-black text-slate-900 text-sm">{result.serviceName}</p>
              </div>
              <Link
                href={`/services/${result.serviceSlug}`}
                className="text-xs font-black text-sky-600 hover:text-sky-800 border border-sky-200 hover:border-sky-400 px-3 py-2 rounded-xl transition-all whitespace-nowrap ml-3"
              >
                View Service →
              </Link>
            </div>

            {/* Problem page link */}
            {result.problemSlug && (
              <Link
                href={`/problems/${result.problemSlug}`}
                className="block text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors text-center"
              >
                Read full guide for this problem →
              </Link>
            )}

            {/* CTAs */}
            <a
              href={waLink(buildDiagnosticWaMsg(result, path))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              WhatsApp My Diagnosis — Book Fix
            </a>

            {result.urgency === "emergency" && (
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider py-3.5 rounded-2xl text-sm transition-all shadow-lg"
              >
                📞 Call Emergency Line Now
              </a>
            )}

            <button
              onClick={handleReset}
              className="w-full text-xs text-slate-400 hover:text-slate-600 font-semibold py-2 transition-colors"
            >
              ↺ Start New Diagnosis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
