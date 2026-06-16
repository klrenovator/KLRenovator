"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    area: "",
    service: siteConfig.services.filter(s => s.slug !== "emergency")[0].title,
    units: "1",
    hp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const msg = [
      "Hi KL Renovator 👋",
      "",
      `I would like to get a quotation for "${form.service}".`,
      "",
      "Here are my details:",
      `🙋 Name: ${form.name}`,
      `📍 Location: ${form.area}`,
      `❄️ Type of service: ${form.service}`,
      `🔢 Number of units: ${form.units}`,
      `💨 HP size: ${form.hp || "Not sure"}`,
      ...(form.message ? ["", `📝 Note: ${form.message}`] : []),
      "",
      "Please share price and available time. Thank you!",
    ].join("\n");
    window.open(waLink(msg), "_blank");
    setTimeout(() => setSubmitting(false), 1000);
  };

  const inputCls =
    "w-full border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 rounded-xl focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 focus:bg-white transition-all duration-200";

  return (
    <form
      onSubmit={handle}
      className="w-full space-y-6 border border-slate-100 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0284c7]">
          Fast Quotation
        </p>
        <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
          Tell us what you need.
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Your Name
          </label>
          <input
            required
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Area / Location
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Subang Jaya"
            list="areas"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className={inputCls}
          />
          <datalist id="areas">
            {siteConfig.areas.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
          Required Aircond Service
        </label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          {siteConfig.services.filter(s => s.slug !== "emergency").map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Number of Units
          </label>
          <select
            value={form.units}
            onChange={(e) => setForm({ ...form, units: e.target.value })}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            {["1","2","3","4","5","6","7","8+"].map((n) => (
              <option key={n} value={n}>{n} unit{n !== "1" ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            HP Size (if known)
          </label>
          <select
            value={form.hp}
            onChange={(e) => setForm({ ...form, hp: e.target.value })}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            <option value="">Not sure</option>
            {["1.0 HP","1.5 HP","2.0 HP","2.5 HP","3.0 HP","4.0 HP","5.0 HP"].map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
          Message / Notes (optional)
        </label>
        <textarea
          rows={4}
          placeholder="e.g. No. of units, AC brand, leaking or noise issues, preferred booking date..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Extreme Visual CTR Pure Green WhatsApp Direct Dispatch Button */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-5 py-4 text-sm font-black uppercase tracking-wider text-white rounded-xl disabled:opacity-60 transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
      >
        <FaWhatsapp className="h-5 w-5 animate-pulse" />
        {submitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-400">OR</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      <p className="text-center text-xs text-slate-500 font-medium">
        Prefer calling? Speak with us directly —{" "}
        <a
          className="font-black text-[#0284c7] hover:text-[#0369a1] underline transition-all"
          href={`tel:${siteConfig.phone}`}
        >
          {siteConfig.phoneDisplay}
        </a>
      </p>
    </form>
  );
};
