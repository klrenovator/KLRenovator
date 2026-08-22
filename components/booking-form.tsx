"use client";

import { useState, useEffect } from "react";
import { calculateDurationMinutes, calculateTotalDurationMinutes } from "@/lib/booking-config";
import { MAX_NOTES_LENGTH } from "@/lib/booking-validation";
import { useLang } from "@/context/language-context";
import { trackBookingSubmit } from "@/lib/analytics";
import { sitePublic } from "@/config/site-public";
import { FaWhatsapp } from "react-icons/fa6";

// Multi-service line item shape. `quantity` is intentionally `number | ""`:
// while the customer is retyping the value (e.g. clearing "1" to type "4")
// the input is momentarily empty. Coercing that back to 1 on every
// keystroke made the field fight the user, so an empty string is allowed
// in state and normalised via `resolveQuantity` wherever a real number is
// needed (duration maths, submission, messaging).
type LineItem = {
  service_type: string;
  aircond_type: string;
  aircond_size: string;
  quantity: number | "";
};

// ─── TRANSLATIONS ────────────────────────────────────────────────────────
const FORM_TXT = {
  en: {
    title: "Book an Appointment",
    adminTitle: "Admin Manual Booking",
    name: "Name",
    namePh: "e.g. Ali bin Ahmad",
    phone: "Phone",
    phonePh: "e.g. 0123456789",
    address: "Full Address",
    addressPh: "Enter your full installation or service address",
    serviceType: "Service Type",
    aircondType: "Aircond Type",
    aircondSize: "Aircond Size / HP",
    quantity: "Quantity",
    estTime: "Estimated Time:",
    hours: "hours",
    selectDate: "Select Date",
    availTimes: "Available Times",
    noSlots: "Not enough time left today to start this job before 6:00 PM. Please select another date.",
    processing: "Processing...",
    confirmBtn: "Confirm Booking",
    successTitle: "Booking Confirmed!",
    successDesc: "Your appointment has been scheduled successfully.",
    multiDayAlert: "Important Note: This job is large and requires {X} days to complete. The time you select below will be booked as Day 1. Our team will coordinate the rest of the schedule with you.",
    adminOverride: "Admin Override: Custom Duration (Hours)",
    adminDefault: "Default:",
    propertyType: "Property Type",
    propertyHelp: "Condo installs may need building management approval — telling us now avoids a wasted trip.",
    floorLevel: "Floor Level",
    floorPh: "e.g. Ground, 5th, 21st",
    pipeRun: "Approx. copper pipe run",
    pipeHelp: "First 7 ft is included. Rough guess is fine — we confirm on site.",
    unitSupply: "Aircond unit",
    honeypot: "Company website",
    sendWa: "Send WhatsApp Confirmation",
    addService: "+ Add Another Service / Unit",
    removeService: "Remove",
    itemHeader: "Service Item #{N}",
    optional: "optional",
    notes: "Job Details / Notes",
    notesPh: "e.g. Aircond not cold, water dripping from indoor unit, 3rd floor with no lift, please come after 2 PM…",
    notesHelp: "Anything we should know before we arrive? Leave it blank if you're not sure — we'll confirm everything on site.",
    consentLabel: "I agree to KL Renovator collecting my personal data for booking purposes.",
    privacyLink: "Privacy Policy",
  },
  ms: {
    title: "Tempah Temujanji",
    adminTitle: "Tempahan Manual Admin",
    name: "Nama",
    namePh: "cth. Ali bin Ahmad",
    phone: "Telefon",
    phonePh: "cth. 0123456789",
    address: "Alamat Penuh",
    addressPh: "Masukkan alamat penuh pemasangan atau servis anda",
    serviceType: "Jenis Servis",
    aircondType: "Jenis Aircond",
    aircondSize: "Saiz Aircond / HP",
    quantity: "Kuantiti",
    estTime: "Anggaran Masa:",
    hours: "jam",
    selectDate: "Pilih Tarikh",
    availTimes: "Masa Tersedia",
    noSlots: "Masa hari ini tidak mencukupi untuk memulakan kerja ini sebelum 6:00 PM. Sila pilih tarikh lain.",
    processing: "Sedang Diproses...",
    confirmBtn: "Sahkan Tempahan",
    successTitle: "Tempahan Disahkan!",
    successDesc: "Temujanji anda telah berjaya dijadualkan.",
    multiDayAlert: "Nota Penting: Kerja ini besar dan memerlukan {X} hari untuk disiapkan. Masa yang anda pilih di bawah akan ditempah sebagai Hari 1. Pasukan kami akan menyelaraskan baki jadual dengan anda.",
    adminOverride: "Admin Ganti: Anggaran Masa Khas (Jam)",
    adminDefault: "Asal:",
    propertyType: "Jenis Hartanah",
    propertyHelp: "Pemasangan kondominium mungkin perlu kelulusan pengurusan bangunan — beritahu kami sekarang untuk elak lawatan sia-sia.",
    floorLevel: "Aras Tingkat",
    floorPh: "cth. Tingkat Bawah, Tingkat 5, Tingkat 21",
    pipeRun: "Anggaran panjang paip kuprum",
    pipeHelp: "7 kaki pertama disertakan. Anggaran kasar memadai — kami sahkan di tapak.",
    unitSupply: "Unit aircond",
    honeypot: "Laman web syarikat",
    sendWa: "Hantar Pengesahan WhatsApp",
    addService: "+ Tambah Servis / Unit Lain",
    removeService: "Buang",
    itemHeader: "Item Servis #{N}",
    optional: "pilihan",
    notes: "Butiran Kerja / Nota",
    notesPh: "cth. Aircond tidak sejuk, air menitis dari unit dalam, tingkat 3 tiada lif, sila datang selepas 2 petang…",
    notesHelp: "Ada apa-apa yang kami patut tahu sebelum tiba? Boleh biarkan kosong jika tidak pasti — kami sahkan semuanya di tapak.",
    consentLabel: "Saya bersetuju KL Renovator mengumpul data peribadi saya untuk tujuan tempahan.",
    privacyLink: "Dasar Privasi",
  },
  zh: {
    title: "预约时间",
    adminTitle: "管理员手动预约",
    name: "姓名",
    namePh: "例如：Ali bin Ahmad",
    phone: "电话",
    phonePh: "例如：0123456789",
    address: "完整地址",
    addressPh: "请输入您的完整安装或服务地址",
    serviceType: "服务类型",
    aircondType: "冷气类型",
    aircondSize: "冷气匹数 / HP",
    quantity: "数量",
    estTime: "预计时间：",
    hours: "小时",
    selectDate: "选择日期",
    availTimes: "可选时间",
    noSlots: "今日时间已不足以在下午6:00前开始此工作。请选择其他日期。",
    processing: "处理中...",
    confirmBtn: "确认预约",
    successTitle: "预约已确认！",
    successDesc: "您的预约已成功安排。",
    multiDayAlert: "重要提示：此项工作规模较大，需要 {X} 天才能完成。您在下方选择的时间将作为第一天。我们的团队将与您协调剩余的日程安排。",
    adminOverride: "管理员：自定义时间（小时）",
    adminDefault: "默认：",
    propertyType: "物业类型",
    propertyHelp: "公寓安装可能需要管理层批准 — 现在告知可避免白跑一趟。",
    floorLevel: "楼层",
    floorPh: "例如：地面层、5楼、21楼",
    pipeRun: "铜管大约长度",
    pipeHelp: "首 7 英尺已包含。大概估算即可 — 我们会在现场确认。",
    unitSupply: "冷气机",
    honeypot: "公司网站",
    sendWa: "发送WhatsApp确认",
    addService: "+ 添加其他服务 / 机器",
    removeService: "删除",
    itemHeader: "服务项目 #{N}",
    optional: "选填",
    notes: "工作详情 / 备注",
    notesPh: "例如：冷气不冷、室内机滴水、3楼没有电梯、请下午2点后到…",
    notesHelp: "有什么需要我们提前知道的吗？不确定可以留空 — 我们会在现场确认。",
    consentLabel: "我同意KL Renovator收集我的个人数据以用于预约目的。",
    privacyLink: "隐私政策",
  }
};

const SERVICE_OPTS = [
  { val: "service", en: "Aircond Service", ms: "Servis Aircond", zh: "冷气清洗" },
  { val: "installation", en: "Aircond Installation", ms: "Pemasangan Aircond", zh: "冷气安装" },
  { val: "repair", en: "Repair", ms: "Pembaikan", zh: "维修" },
  { val: "gas_top_up", en: "Gas Top Up", ms: "Tambah Gas", zh: "添气" },
  { val: "dismantle", en: "Dismantle", ms: "Buka Aircond", zh: "拆卸" },
  { val: "relocate", en: "Relocate", ms: "Pindah Aircond", zh: "搬迁" },
  { val: "conceal_piping", en: "Copper Pipe & Wiring", ms: "Paip Kuprum & Pendawaian", zh: "铜管与拉线" },
] as const;

// Typed lookup for localized option labels (P3-03).
type LocalizedOption = { val: string; en: string; ms: string; zh: string };
function localizedLabel(opt: LocalizedOption, lang: string) {
  return opt[lang as keyof typeof opt] ?? opt.en;
}

const AIRCOND_OPTS = [
  { val: "Wall Mounted", en: "Wall Mounted", ms: "Lekap Dinding", zh: "壁挂式" },
  { val: "Ceiling Cassette", en: "Ceiling Cassette", ms: "Kaset Siling", zh: "天花板卡式" },
  { val: "Window Unit", en: "Window Unit", ms: "Unit Tingkap", zh: "窗式机" },
  { val: "Centralized/Ducted", en: "Centralized/Ducted", ms: "Berpusat/Saluran", zh: "中央空调/管道机" },
  { val: "Portable", en: "Portable", ms: "Mudah Alih", zh: "移动式冷气" },
];

const PROPERTY_OPTS = [
  { val: "Condo / Apartment", en: "Condo / Apartment", ms: "Kondo / Apartmen", zh: "公寓 / 组屋" },
  { val: "Landed House", en: "Landed House", ms: "Rumah Berkembar / Teres", zh: "有地住宅" },
  { val: "Office", en: "Office", ms: "Pejabat", zh: "办公室" },
  { val: "Shoplot / Retail", en: "Shoplot / Retail", ms: "Kedai / Runcit", zh: "店铺 / 零售" },
  { val: "Other", en: "Other", ms: "Lain-lain", zh: "其他" },
];

const PIPE_RUN_OPTS = [
  { val: "Up to 7 ft (included)", en: "Up to 7 ft (included)", ms: "Sehingga 7 kaki (termasuk)", zh: "7 英尺以内（已含）" },
  { val: "8 – 15 ft", en: "8 – 15 ft", ms: "8 – 15 kaki", zh: "8 – 15 英尺" },
  { val: "16 – 30 ft", en: "16 – 30 ft", ms: "16 – 30 kaki", zh: "16 – 30 英尺" },
  { val: "Over 30 ft", en: "Over 30 ft", ms: "Melebihi 30 kaki", zh: "超过 30 英尺" },
  { val: "Not sure", en: "Not sure", ms: "Tidak pasti", zh: "不确定" },
];

const UNIT_SUPPLY_OPTS = [
  { val: "I already have the unit", en: "I already have the unit", ms: "Saya sudah ada unit", zh: "我已有机器" },
  { val: "Please quote me a unit", en: "Please quote me a unit", ms: "Sila sebut harga unit", zh: "请为我报价机器" },
];

const SIZE_OPTS = [
  { val: "1.0 HP", en: "1.0 HP", ms: "1.0 HP", zh: "1.0 HP" },
  { val: "1.5 HP", en: "1.5 HP", ms: "1.5 HP", zh: "1.5 HP" },
  { val: "2.0 HP", en: "2.0 HP", ms: "2.0 HP", zh: "2.0 HP" },
  { val: "2.5 HP", en: "2.5 HP", ms: "2.5 HP", zh: "2.5 HP" },
  { val: "3.0 HP", en: "3.0 HP", ms: "3.0 HP", zh: "3.0 HP" },
  { val: "Not Confirmed / Don't Know", en: "Not Confirmed / Don't Know", ms: "Tidak Pasti / Tidak Tahu", zh: "不确定 / 不知道" },
];

// ─────────────────────────────────────────────────────────────────────────

export function BookingForm({
  isAdmin = false,
  forcedLang,
}: {
  isAdmin?: boolean;
  forcedLang?: "en" | "ms" | "zh";
}) {
  const { lang: ctxLang } = useLang();
  const lang = forcedLang ?? ctxLang;
  const t = FORM_TXT[lang as keyof typeof FORM_TXT] || FORM_TXT.en;
  const privacyHref = lang === "en" ? "/privacy-policy" : `/${lang}/privacy-policy`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Multi-service line items state — see LineItem type above for field notes.
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { service_type: "service", aircond_type: "Wall Mounted", aircond_size: "1.0 HP", quantity: 1 }
  ]);

  // Safe fallback: an in-progress empty field counts as a single unit.
  const resolveQuantity = (quantity: number | "") =>
    typeof quantity === "number" && Number.isFinite(quantity) && quantity >= 1 ? quantity : 1;

  const normalisedLineItems = lineItems.map((item) => ({
    ...item,
    quantity: resolveQuantity(item.quantity),
  }));

  // Free-text box where the customer can describe the job in their own words
  // (fault symptoms, access notes, preferred timing). Always optional — the
  // form must never block on it. The cap is shared with the API validator so
  // the counter can never disagree with what the server accepts.
  const [notes, setNotes] = useState("");
  // PDPA consent — audited 2026-08-05 (P1-04). Defaults to false so the
  // customer must actively agree before data is transmitted.
  const [consent, setConsent] = useState(false);

  const [propertyType, setPropertyType] = useState("Condo / Apartment");
  const [floorLevel, setFloorLevel] = useState("");
  const [pipeRun, setPipeRun] = useState("Up to 7 ft (included)");
  const [unitSupply, setUnitSupply] = useState("I already have the unit");
  
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [fetchedOnce, setFetchedOnce] = useState(false);

  // Admin manual override
  const [manualHours, setManualHours] = useState("");

  const hasInstallationOrRelocate = lineItems.some(
    (item) => item.service_type === "installation" || item.service_type === "relocate"
  );

  // Calculations using lineItems total
  const baseDurationMinutes = calculateTotalDurationMinutes(normalisedLineItems);
  const totalDurationMinutes = isAdmin && manualHours !== "" && !isNaN(parseFloat(manualHours))
    ? parseFloat(manualHours) * 60
    : baseDurationMinutes;
    
  // Cap API slot finder to max 8 hours (480 mins) so it fits in a single day
  const apiDurationMinutes = Math.min(totalDurationMinutes, 480);
  
  const totalHours = (totalDurationMinutes / 60).toFixed(1);
  const daysRequired = Math.ceil(totalDurationMinutes / 480);

  // Manage lineItems array helper functions
  const addLineItem = () => {
    if (lineItems.length >= 15) return;
    setLineItems([
      ...lineItems,
      { service_type: "service", aircond_type: "Wall Mounted", aircond_size: "1.0 HP", quantity: 1 }
    ]);
    setFetchedOnce(false);
    setSelectedSlot("");
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((_, i) => i !== index));
    setFetchedOnce(false);
    setSelectedSlot("");
  };

  const updateLineItem = <K extends keyof LineItem>(index: number, key: K, value: LineItem[K]) => {
    const updated = lineItems.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setLineItems(updated);
    setFetchedOnce(false);
    setSelectedSlot("");
  };

  // Fetch availability whenever the date or computed job length changes.
  useEffect(() => {
    if (!selectedDate) return;

    const controller = new AbortController();
    setLoadingSlots(true);
    setSlotsError("");
    setAvailableSlots([]);

    (async () => {
      try {
        const res = await fetch(
          `/api/bookings/availability?date=${selectedDate}&duration=${apiDurationMinutes}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Failed to load slots");
        const data = await res.json();
        setAvailableSlots(data.availableSlots ?? []);
        setFetchedOnce(true);
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") {
          console.error(error);
          setSlotsError(
            lang === "ms"
              ? "Gagal memuatkan slot masa. Sila cuba lagi."
              : lang === "zh"
                ? "加载时间段失败，请重试。"
                : "Failed to load time slots. Please try again."
          );
          setFetchedOnce(true);
        }
      } finally {
        setLoadingSlots(false);
      }
    })();

    return () => controller.abort();
  }, [selectedDate, apiDurationMinutes, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!selectedSlot) {
      setFormError(
        lang === "ms"
          ? "Sila pilih slot masa"
          : lang === "zh"
            ? "请选择时间段"
            : "Please select a time slot"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          phone,
          address,
          line_items: normalisedLineItems,
          notes: notes.trim(),
          start_time: selectedSlot,
          source: isAdmin ? "whatsapp_manual" : "web",
          consent: consent === true,
          company_website: companyWebsite,
          // Installation details formatting
          ...(hasInstallationOrRelocate
            ? {
                address: [
                  address,
                  `Property: ${propertyType}`,
                  floorLevel ? `Floor: ${floorLevel}` : null,
                  `Pipe run: ${pipeRun}`,
                  `Unit: ${unitSupply}`,
                ]
                  .filter(Boolean)
                  .join(" | "),
              }
            : {}),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        trackBookingSubmit({
          line_items_count: lineItems.length,
          total_quantity: normalisedLineItems.reduce((acc, item) => acc + item.quantity, 0),
          source: isAdmin ? "whatsapp_manual" : "web",
          has_notes: notes.trim() !== "",
        });

        if (isAdmin) {
          const slotTime = new Date(selectedSlot).toLocaleTimeString("en-US", {
            hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kuala_Lumpur"
          });
          const slotDate = new Date(selectedSlot).toLocaleDateString("en-US", {
            timeZone: "Asia/Kuala_Lumpur"
          });

          const serviceLines = normalisedLineItems.map((item) => {
            const itemLabel = SERVICE_OPTS.find(o => o.val === item.service_type)?.en || item.service_type;
            return `- ${itemLabel} (${item.aircond_type} ${item.aircond_size} x${item.quantity})`;
          }).join("\n");

          // Admin sends a confirmation TO the customer's WhatsApp.
          let msgText = `Hi ${name}, your booking for services:\n${serviceLines}\n\nat Address: ${address} is confirmed on ${slotDate} at ${slotTime}.`;
          if (notes.trim()) {
            msgText += `\n\nYour notes: ${notes.trim()}`;
          }
          if (daysRequired > 1) {
            msgText += `\n\nNote: As this is a large job, it will take ${daysRequired} days. The selected date is Day 1. Our team will coordinate the rest of the schedule with you.`;
          }
          setGeneratedLink(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msgText)}`);
        } else {
          // Public customer opens WhatsApp to the BUSINESS with a booking
          // summary so they can confirm / ask questions straight after booking.
          const slotTime = new Date(selectedSlot).toLocaleTimeString("en-US", {
            hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kuala_Lumpur"
          });
          const slotDate = new Date(selectedSlot).toLocaleDateString("en-US", {
            timeZone: "Asia/Kuala_Lumpur"
          });
          const serviceLines = normalisedLineItems.map((item) => {
            const itemLabel = SERVICE_OPTS.find(o => o.val === item.service_type)?.en || item.service_type;
            return `- ${itemLabel} (${item.aircond_type} ${item.aircond_size} x${item.quantity})`;
          }).join("\n");

          let pubMsg = `Hi KL Renovator, I just booked online. My details:\n\nName: ${name}\nServices:\n${serviceLines}\nAddress: ${address}\nDate: ${slotDate}\nTime: ${slotTime}`;
          if (notes.trim()) {
            pubMsg += `\nNotes: ${notes.trim()}`;
          }
          if (daysRequired > 1) {
            pubMsg += `\n\nNote: I understand this is a ${daysRequired}-day job.`;
          }
          pubMsg += `\n\nPlease confirm my booking. Thank you!`;
          setGeneratedLink(`https://wa.me/${sitePublic.whatsapp}?text=${encodeURIComponent(pubMsg)}`);
        }
      } else {
        setFormError(data.error || (lang === "ms" ? "Gagal menempah" : lang === "zh" ? "预约失败" : "Failed to book"));
      }
    } catch (error) {
      console.error(error);
      setFormError(
        lang === "ms"
          ? "Ralat berlaku. Sila cuba lagi."
          : lang === "zh"
            ? "发生错误，请重试。"
            : "An error occurred. Please try again."
      );
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center shadow-lg">
        <h3 className="mb-2 text-xl font-bold text-sky-900">{t.successTitle}</h3>
        <p className="text-slate-600 mb-4">{t.successDesc}</p>
        {generatedLink && (
          <>
            <p className="text-sm text-slate-500 mb-3">
              {isAdmin
                ? ""
                : (lang === "ms"
                    ? "Hantar pengesahan WhatsApp untuk sahkan tempahan anda dengan pasukan kami."
                    : lang === "zh"
                      ? "发送WhatsApp确认以与我们的团队核实您的预约。"
                      : "Send a quick WhatsApp to confirm your booking with our team.")}
            </p>
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
            >
              <FaWhatsapp className="h-5 w-5" />
              {t.sendWa}
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{isAdmin ? t.adminTitle : t.title}</h2>
      
      <div>
        <label htmlFor="booking-name" className="block text-sm font-semibold text-slate-700">{t.name}</label>
        <input
          id="booking-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder={t.namePh}
        />
      </div>

      <div>
        <label htmlFor="booking-phone" className="block text-sm font-semibold text-slate-700">{t.phone}</label>
        <input
          id="booking-phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder={t.phonePh}
        />
      </div>

      <div>
        <label htmlFor="booking-address" className="block text-sm font-semibold text-slate-700">{t.address}</label>
        <textarea
          id="booking-address"
          required
          autoComplete="street-address"
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder={t.addressPh}
        />
      </div>

      {/* Honeypot — visually hidden, never focusable. Bots fill it, humans don't. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">{t.honeypot}</label>
        <input
          id="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      {/* Multi-service line items list */}
      <div className="space-y-4">
        {lineItems.map((item, idx) => (
          <div key={idx} className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                {t.itemHeader.replace("{N}", (idx + 1).toString())}
              </span>
              {lineItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLineItem(idx)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 transition cursor-pointer"
                >
                  {t.removeService}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`booking-service-${idx}`} className="block text-xs font-semibold text-slate-600 mb-1">{t.serviceType}</label>
                <select
                  id={`booking-service-${idx}`}
                  value={item.service_type}
                  onChange={(e) => updateLineItem(idx, "service_type", e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm bg-white focus:border-sky-500 focus:outline-none"
                >
                  {SERVICE_OPTS.map(opt => (
                    <option key={opt.val} value={opt.val}>
                      {localizedLabel(opt, lang)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`booking-aircond-type-${idx}`} className="block text-xs font-semibold text-slate-600 mb-1">{t.aircondType}</label>
                <select
                  id={`booking-aircond-type-${idx}`}
                  value={item.aircond_type}
                  onChange={(e) => updateLineItem(idx, "aircond_type", e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm bg-white focus:border-sky-500 focus:outline-none"
                >
                  {AIRCOND_OPTS.map(opt => (
                    <option key={opt.val} value={opt.val}>
                      {localizedLabel(opt, lang)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`booking-size-${idx}`} className="block text-xs font-semibold text-slate-600 mb-1">{t.aircondSize}</label>
                <select
                  id={`booking-size-${idx}`}
                  value={item.aircond_size}
                  onChange={(e) => updateLineItem(idx, "aircond_size", e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm bg-white focus:border-sky-500 focus:outline-none"
                >
                  {SIZE_OPTS.map(opt => (
                    <option key={opt.val} value={opt.val}>
                      {localizedLabel(opt, lang)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`booking-qty-${idx}`} className="block text-xs font-semibold text-slate-600 mb-1">{t.quantity}</label>
                <input
                  id={`booking-qty-${idx}`}
                  type="number"
                  min="1"
                  max="15"
                  required
                  autoComplete="off"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      updateLineItem(idx, "quantity", "");
                      return;
                    }
                    const parsed = parseInt(raw, 10);
                    if (Number.isNaN(parsed)) return;
                    updateLineItem(idx, "quantity", Math.min(Math.max(parsed, 1), 15));
                  }}
                  onBlur={() => {
                    if (item.quantity === "") updateLineItem(idx, "quantity", 1);
                  }}
                  className="block w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {lineItems.length < 15 && (
        <button
          type="button"
          onClick={addLineItem}
          className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-sky-300 hover:border-sky-400 text-sky-600 hover:text-sky-700 text-sm font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer bg-sky-50/10 hover:bg-sky-50/30"
        >
          {t.addService}
        </button>
      )}

      {/* ── Installation-only details ─────────────────────────────────── */}
      {hasInstallationOrRelocate && (
        <div className="space-y-4 rounded-xl border border-sky-100 bg-sky-50/40 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-sky-700">
            {t.propertyType}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="property-type" className="block text-sm font-semibold text-slate-700">
                {t.propertyType}
              </label>
              <select
                id="property-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {PROPERTY_OPTS.map((opt) => (
                  <option key={opt.val} value={opt.val}>
                    {opt[lang as "en" | "ms" | "zh"] || opt.en}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">{t.propertyHelp}</p>
            </div>

            <div>
              <label htmlFor="floor-level" className="block text-sm font-semibold text-slate-700">
                {t.floorLevel}
              </label>
              <input
                id="floor-level"
                type="text"
                value={floorLevel}
                onChange={(e) => setFloorLevel(e.target.value)}
                placeholder={t.floorPh}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor="pipe-run" className="block text-sm font-semibold text-slate-700">
                {t.pipeRun}
              </label>
              <select
                id="pipe-run"
                value={pipeRun}
                onChange={(e) => setPipeRun(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {PIPE_RUN_OPTS.map((opt) => (
                  <option key={opt.val} value={opt.val}>
                    {opt[lang as "en" | "ms" | "zh"] || opt.en}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">{t.pipeHelp}</p>
            </div>

            <div>
              <label htmlFor="unit-supply" className="block text-sm font-semibold text-slate-700">
                {t.unitSupply}
              </label>
              <select
                id="unit-supply"
                value={unitSupply}
                onChange={(e) => setUnitSupply(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {UNIT_SUPPLY_OPTS.map((opt) => (
                  <option key={opt.val} value={opt.val}>
                    {opt[lang as "en" | "ms" | "zh"] || opt.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── Optional job details ──────────────────────────────────────────
          Customers who know what's wrong (or have access/timing quirks) can
          tell us up front; everyone else can leave it empty. Never required. */}
      <div>
        <label htmlFor="booking-notes" className="block text-sm font-semibold text-slate-700">
          {t.notes}{" "}
          <span className="font-normal text-slate-500">({t.optional})</span>
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          maxLength={MAX_NOTES_LENGTH}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t.notesPh}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <div className="mt-1 flex items-start justify-between gap-3">
          <p className="text-[11px] leading-snug text-slate-500">{t.notesHelp}</p>
          <span className="shrink-0 text-[11px] tabular-nums text-slate-500">
            {notes.length}/{MAX_NOTES_LENGTH}
          </span>
        </div>
      </div>

      {isAdmin && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <label className="block text-sm font-bold text-red-700">{t.adminOverride}</label>
          <p className="text-xs text-red-600 mb-2">Leave blank to use standard system calculation ({baseDurationMinutes / 60} hrs).</p>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={manualHours}
            onChange={(e) => {
              setManualHours(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            placeholder={`${t.adminDefault} ${baseDurationMinutes / 60} ${t.hours}`}
            className="block w-full rounded-md border border-red-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      )}

      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        {t.estTime} <span className="font-semibold text-slate-900">{totalHours} {t.hours}</span>
      </div>

      {/* Multi-day Alert */}
      {totalDurationMinutes > 480 && (
        <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 border border-amber-200 shadow-sm leading-relaxed">
          {t.multiDayAlert.replace("{X}", daysRequired.toString())}
        </div>
      )}

      <div>
        <label htmlFor="booking-date" className="block text-sm font-semibold text-slate-700">{t.selectDate}</label>
        <input
          id="booking-date"
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlot("");
            setFetchedOnce(false);
          }}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {selectedDate && (
        <div>
          <p id="avail-times-label" className="block text-sm font-semibold text-slate-700 mb-2">{t.availTimes}</p>
          <div role="group" aria-labelledby="avail-times-label" aria-busy={loadingSlots}>
            {loadingSlots ? (
              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-2" aria-live="polite">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-9 rounded-lg bg-slate-100 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : slotsError ? (
              <div className="rounded-lg bg-red-50 p-3 border border-red-200 text-red-800 text-sm flex items-center justify-between gap-3">
                <span>{slotsError}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFetchedOnce(false);
                    setSelectedDate(selectedDate);
                  }}
                  className="shrink-0 text-xs font-bold underline hover:no-underline"
                >
                  {lang === "ms" ? "Cuba lagi" : lang === "zh" ? "重试" : "Retry"}
                </button>
              </div>
            ) : fetchedOnce ? (
              availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-2">
                  {availableSlots.map((slot) => {
                    const timeStr = new Date(slot).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kuala_Lumpur",
                    });
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setFormError("");
                        }}
                        aria-pressed={selectedSlot === slot}
                        className={`rounded-lg px-2 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${
                          selectedSlot === slot
                            ? "bg-sky-600 text-white shadow-md"
                            : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-100"
                        }`}
                      >
                        {timeStr}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg bg-amber-50 p-3 border border-amber-200 text-amber-900 text-sm">
                  {t.noSlots}
                </div>
              )
            ) : null}
          </div>
        </div>
      )}

      {/* ── PDPA Consent (audit P1-04) ──────────────────────────────────
          The booking form collects name, phone, address and job details.
          PDPA 2010 requires explicit consent before personal data is
          processed. The checkbox defaults to false and the submit button
          is disabled until the customer actively checks it. */}
      <div className="flex items-start gap-2 text-xs text-slate-600 border border-slate-200 rounded-lg p-3 bg-slate-50/50">
        <input
          id="booking-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-sky-600"
        />
        <label htmlFor="booking-consent" className="leading-snug">
          {t.consentLabel}{" "}
          <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline hover:text-sky-800 font-semibold">
            {t.privacyLink}
          </a>
        </label>
      </div>

      {/* Status region for screen readers — updated on validation / submission */}
      <div role="status" aria-live="polite" className="sr-only">
        {loading ? t.processing : ""}
        {success ? t.successTitle : ""}
        {formError ? formError : ""}
      </div>

      {formError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800 flex items-start gap-2">
          <span className="mt-0.5">⚠️</span>
          <span>{formError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedSlot || !consent}
        className="w-full rounded-lg bg-sky-600 px-4 py-3.5 font-black text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4 shadow-md cursor-pointer"
      >
        {loading ? t.processing : t.confirmBtn}
      </button>
    </form>
  );
}
