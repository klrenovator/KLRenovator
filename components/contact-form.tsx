"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { sitePublic } from "@/config/site-public";
import { waLink } from "@/lib/whatsapp";
import { trackQuoteSubmit } from "@/lib/analytics";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    area: "",
    service: sitePublic.services.filter(s => s.slug !== "emergency")[0].title,
    units: "1",
    hp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

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

    trackQuoteSubmit("contact_form", { service: form.service, area: form.area, units: form.units });

    // 1. Try to persist lead server-side first (prevents loss if WhatsApp blocked)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          area: form.area,
          service: form.service,
          units: form.units,
          hp: form.hp,
          message: form.message,
        }),
      });
      // Don't block on failure – continue to WhatsApp
    } catch {
      // Silently continue – WhatsApp is primary
    }

    // 2. Open WhatsApp – keep original green #22c55e button color
    try {
      window.open(waLink(msg), "_blank", "noopener,noreferrer");
      setSuccess(true);
    } catch {
      setError("Could not open WhatsApp. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 focus:bg-white transition-all duration-200";

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
          <label htmlFor="contact-name" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Your Name
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-area" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Area / Location
          </label>
          <input
            id="contact-area"
            required
            autoComplete="address-level2"
            type="text"
            placeholder="e.g. Subang Jaya"
            list="areas"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className={inputCls}
          />
          <datalist id="areas">
            {sitePublic.areas.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
          Required Aircond Service
        </label>
        <select
          id="contact-service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          {sitePublic.services.filter(s => s.slug !== "emergency").map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-units" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            Number of Units
          </label>
          <select
            id="contact-units"
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
          <label htmlFor="contact-hp" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
            HP Size (if known)
          </label>
          <select
            id="contact-hp"
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
        <label htmlFor="contact-message" className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-700">
          Message / Notes (optional)
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="e.g. No. of units, AC brand, leaking or noise issues, preferred booking date..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Status */}
      {error && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
          ✅ Lead saved! WhatsApp should have opened. If not, please{" "}
          <a href={waLink(`Hi KL Renovator, I just submitted contact form: ${form.name} in ${form.area} needs ${form.service}`)} target="_blank" rel="noopener noreferrer" className="font-bold underline">click here</a>.
        </div>
      )}

      {/* Extreme Visual CTR Pure Green WhatsApp Direct Dispatch Button – keep original #22c55e */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] px-5 py-4 text-sm font-black uppercase tracking-wider text-white rounded-xl disabled:opacity-60 transition-all active:scale-[0.98] shadow-lg shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <FaWhatsapp className="h-5 w-5 animate-pulse" aria-hidden="true" />
        {submitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>

      <div className="relative flex py-2 items-center" aria-hidden="true">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-600">OR</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      <p className="text-center text-xs text-slate-600 font-medium">
        Prefer calling? Speak with us directly —{" "}
        <a
          className="font-black text-[#0284c7] hover:text-[#0369a1] underline transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
          href={`tel:${sitePublic.phone}`}
        >
          {sitePublic.phoneDisplay}
        </a>
      </p>
    </form>
  );
};
