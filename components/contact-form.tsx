"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    area: "",
    service: siteConfig.services[0].title,
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
      "🔢 Number of units:",
      "💨 HP (if known):",
      ...(form.message ? ["", `📝 Note: ${form.message}`] : []),
      "",
      "Please share price and available time. Thank you!",
    ].join("\n");
    window.open(waLink(msg), "_blank");
    setTimeout(() => setSubmitting(false), 1000);
  };

  const inputCls =
    "w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition";

  return (
    <form
      onSubmit={handle}
      className="w-full space-y-5 border border-slate-200 bg-white p-6 sm:p-7 shadow-sm"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          Request a Quote
        </p>
        <h3 className="mt-1 text-xl font-extrabold text-ink">
          Tell us what you need.
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
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
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Area
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
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Service
        </label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={inputCls}
        >
          {siteConfig.services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Message (optional)
        </label>
        <textarea
          rows={4}
          placeholder="HP size, issue, preferred date..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60 transition"
      >
        <FaWhatsapp className="h-4 w-4" />
        {submitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Or call directly —{" "}
        <a
          className="font-semibold text-brand-700 hover:text-brand-800"
          href={`tel:${siteConfig.phone}`}
        >
          {siteConfig.phoneDisplay}
        </a>
      </p>
    </form>
  );
};
