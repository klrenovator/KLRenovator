"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

/**
 * Lead contact form.
 * On submit, composes a WhatsApp message and opens wa.me with
 * a pre-filled message — no backend required, lowest friction.
 */
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
    const msg =
      `Hi Klrenovator, I'd like to request a quote.\n\n` +
      `• Name: ${form.name}\n` +
      `• Area: ${form.area}\n` +
      `• Service: ${form.service}\n` +
      `• Message: ${form.message || "-"}\n\n` +
      `Please contact me back. Thanks!`;
    window.open(waLink(msg), "_blank");
    setTimeout(() => setSubmitting(false), 1000);
  };

  const inputCls =
    "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent";

  return (
    <form
      onSubmit={handle}
      className="w-full space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            required
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--color-whatsapp))] px-5 py-3.5 text-sm font-semibold text-white hover:brightness-110 active:scale-[0.99] disabled:opacity-60 transition"
      >
        <MessageCircle className="h-4 w-4" fill="currentColor" />
        {submitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Or send directly — <a className="font-medium text-brand-600" href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
      </p>
    </form>
  );
};
