"use client";

import { useState, useEffect } from "react";
import { calculateDurationMinutes } from "@/lib/booking-config";
import { useLang } from "@/context/language-context";
import { trackBookingSubmit } from "@/lib/analytics";

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
];

const AIRCOND_OPTS = [
  { val: "Wall Mounted", en: "Wall Mounted", ms: "Lekap Dinding", zh: "壁挂式" },
  { val: "Ceiling Cassette", en: "Ceiling Cassette", ms: "Kaset Siling", zh: "天花板卡式" },
  { val: "Window Unit", en: "Window Unit", ms: "Unit Tingkap", zh: "窗式机" },
  { val: "Centralized/Ducted", en: "Centralized/Ducted", ms: "Berpusat/Saluran", zh: "中央空调/管道机" },
  { val: "Portable", en: "Portable", ms: "Mudah Alih", zh: "移动式冷气" },
];

// Installation-specific option lists. The audit noted the booking form
// captured none of the variables that actually drive an installation quote
// or site visit — property type (condo jobs need JMB/management approval),
// floor level (high-rise access charge), copper pipe run (largest price
// variable), and whether the customer already owns the unit.
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

export function BookingForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const { lang } = useLang();
  const t = FORM_TXT[lang as keyof typeof FORM_TXT] || FORM_TXT.en;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("service");
  const [aircondType, setAircondType] = useState("Wall Mounted");
  const [aircondSize, setAircondSize] = useState("1.0 HP");
  const [quantity, setQuantity] = useState(1);
  // Installation-only extras (sent through in the notes/description)
  const [propertyType, setPropertyType] = useState("Condo / Apartment");
  const [floorLevel, setFloorLevel] = useState("");
  const [pipeRun, setPipeRun] = useState("Up to 7 ft (included)");
  const [unitSupply, setUnitSupply] = useState("I already have the unit");
  // Honeypot — real users never see or fill this. Server treats a filled
  // value as a bot and silently discards the submission.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [fetchedOnce, setFetchedOnce] = useState(false);

  // Admin manual override
  const [manualHours, setManualHours] = useState("");

  // Calculations
  const baseDurationMinutes = calculateDurationMinutes(serviceType, aircondType, quantity);
  const totalDurationMinutes = isAdmin && manualHours !== "" && !isNaN(parseFloat(manualHours))
    ? parseFloat(manualHours) * 60
    : baseDurationMinutes;
    
  // Cap API slot finder to max 8 hours (480 mins) so it fits in a single day
  const apiDurationMinutes = Math.min(totalDurationMinutes, 480);
  
  const totalHours = (totalDurationMinutes / 60).toFixed(1);
  const daysRequired = Math.ceil(totalDurationMinutes / 480);

  // Fetch availability whenever the date or the computed job length changes.
  // The request is abortable so a fast date change can't let a slow earlier
  // response overwrite the newer one (stale-response race).
  useEffect(() => {
    if (!selectedDate) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `/api/bookings/availability?date=${selectedDate}&duration=${apiDurationMinutes}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setAvailableSlots(data.availableSlots ?? []);
        setFetchedOnce(true);
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") console.error(error);
      }
    })();

    return () => controller.abort();
  }, [selectedDate, apiDurationMinutes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return alert("Please select a time slot");

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          phone,
          address,
          service_type: serviceType,
          aircond_type: aircondType,
          aircond_size: aircondSize,
          quantity,
          start_time: selectedSlot,
          source: isAdmin ? "whatsapp_manual" : "web",
          // Honeypot — server discards the submission if this is non-empty.
          company_website: companyWebsite,
          // Installation-only context, appended to the address so it reaches
          // the technician and the calendar event without a schema change.
          ...(serviceType === "installation" || serviceType === "relocate"
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
          service_type: serviceType,
          aircond_type: aircondType,
          quantity,
          source: isAdmin ? "whatsapp_manual" : "web",
        });
        if (isAdmin) {
          const slotTime = new Date(selectedSlot).toLocaleTimeString("en-US", {
            hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kuala_Lumpur"
          });
          const slotDate = new Date(selectedSlot).toLocaleDateString("en-US", {
            timeZone: "Asia/Kuala_Lumpur"
          });
          
          let msgText = `Hi ${name}, your booking for ${serviceType.replace(/_/g, " ")} (${aircondType} ${aircondSize} x${quantity}) at ${address} is confirmed on ${slotDate} at ${slotTime}.`;
          
          if (daysRequired > 1) {
            msgText += `\n\nNote: As this is a large job, it will take ${daysRequired} days. The selected date is Day 1. Our team will coordinate the rest of the schedule with you.`;
          }
          
          const msg = encodeURIComponent(msgText);
          setGeneratedLink(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${msg}`);
        }
      } else {
        alert(data.error || "Failed to book");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center shadow-lg">
        <h3 className="mb-2 text-xl font-bold text-sky-900">{t.successTitle}</h3>
        <p className="text-slate-600 mb-4">{t.successDesc}</p>
        {isAdmin && generatedLink && (
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
          >
            {t.sendWa}
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{isAdmin ? t.adminTitle : t.title}</h2>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700">{t.name}</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder={t.namePh}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">{t.phone}</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder={t.phonePh}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">{t.address}</label>
        <textarea
          required
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">{t.serviceType}</label>
          <select
            value={serviceType}
            onChange={(e) => {
              setServiceType(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {SERVICE_OPTS.map(opt => (
              <option key={opt.val} value={opt.val}>
                {(opt as any)[lang] || opt.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">{t.aircondType}</label>
          <select
            value={aircondType}
            onChange={(e) => {
              setAircondType(e.target.value);
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {AIRCOND_OPTS.map(opt => (
              <option key={opt.val} value={opt.val}>
                {(opt as any)[lang] || opt.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">{t.aircondSize}</label>
          <select
            value={aircondSize}
            onChange={(e) => setAircondSize(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {SIZE_OPTS.map(opt => (
              <option key={opt.val} value={opt.val}>
                {(opt as any)[lang] || opt.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">{t.quantity}</label>
          <input
            type="number"
            min="1"
            max="10"
            required
            value={quantity}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value, 10));
              setFetchedOnce(false);
              setSelectedSlot("");
            }}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* ── Installation-only details ───────────────────────────────────
          Shown only for installation / relocation jobs. These are the
          variables that actually determine the on-site quote and whether
          the technician needs building approval before arriving. */}
      {(serviceType === "installation" || serviceType === "relocate") && (
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
        <label className="block text-sm font-semibold text-slate-700">{t.selectDate}</label>
        <input
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

      {selectedDate && fetchedOnce && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">{t.availTimes}</label>
          {availableSlots.length > 0 ? (
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
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-lg px-2 py-2 text-sm font-semibold transition ${
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
            <div className="rounded-lg bg-red-50 p-3 border border-red-100 text-red-800 text-sm">
              {t.noSlots}
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedSlot}
        className="w-full rounded-lg bg-sky-600 px-4 py-3.5 font-black text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4 shadow-md"
      >
        {loading ? t.processing : t.confirmBtn}
      </button>
    </form>
  );
}
