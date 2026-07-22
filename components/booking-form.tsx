"use client";

import { useState, useEffect } from "react";
import { calculateDurationMinutes } from "@/lib/booking-config";
import { useLang } from "@/context/language-context";

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

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability();
    }
  }, [selectedDate, apiDurationMinutes]);

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`/api/bookings/availability?date=${selectedDate}&duration=${apiDurationMinutes}`);
      const data = await res.json();
      if (data.availableSlots) {
        setAvailableSlots(data.availableSlots);
      } else {
        setAvailableSlots([]);
      }
      setFetchedOnce(true);
    } catch (error) {
      console.error(error);
    }
  };

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
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
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
