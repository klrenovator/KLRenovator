"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

type Service =
  | "normalService"
  | "chemicalWash"
  | "chemicalOverhaul"
  | "gasTopup"
  | "installation"
  | "repair";

const serviceLabels: Record<Service, string> = {
  normalService: "Normal Service",
  chemicalWash: "Chemical Wash",
  chemicalOverhaul: "Chemical Overhaul",
  gasTopup: "Gas Top-Up",
  installation: "Installation",
  repair: "Repair",
};

export const PriceCalculator = () => {
  const [service, setService] = useState<Service>("normalService");
  const options = siteConfig.pricing[service];
  const [option, setOption] = useState(options[0].hp);
  const [qty, setQty] = useState(1);

  // Keep option in sync when service changes
  const currentOption = useMemo(
    () => options.find((o) => o.hp === option) ?? options[0],
    [options, option],
  );

  const total = currentOption.price * qty;

  const msg =
    `Hi Klrenovator, I'd like a quote:\n\n` +
    `• Service: ${serviceLabels[service]}\n` +
    `• Size / Type: ${currentOption.hp}\n` +
    `• Quantity: ${qty}\n` +
    `• Estimated total: RM ${total}\n\n` +
    `Please confirm availability. Thanks!`;

  const sel =
    "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-600">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Quick Price Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Estimate in seconds — no signup needed
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Service type
          </label>
          <select
            className={sel}
            value={service}
            onChange={(e) => {
              const v = e.target.value as Service;
              setService(v);
              setOption(siteConfig.pricing[v][0].hp);
            }}
          >
            {(Object.keys(serviceLabels) as Service[]).map((k) => (
              <option key={k} value={k}>
                {serviceLabels[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Size / Option
          </label>
          <select
            className={sel}
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.hp} value={o.hp}>
                {o.hp} — RM {o.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Quantity (units)
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value) || 1))
              }
              className={`${sel} text-center w-20`}
            />
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg"
            >
              +
            </button>
            <span className="ml-auto text-xs text-slate-500">
              (for bulk jobs)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white p-5">
        <p className="text-xs uppercase tracking-wider opacity-80">
          Estimated total
        </p>
        <p className="mt-1 text-4xl font-bold">RM {total}</p>
        <p className="mt-1 text-xs opacity-80">
          Material/gas (if required) quoted on-site, confirmed before work.
        </p>
      </div>

      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--color-whatsapp))] px-5 py-3.5 text-sm font-semibold text-white hover:brightness-110 transition"
      >
        <MessageCircle className="h-4 w-4" fill="currentColor" />
        Get this quote on WhatsApp
      </a>
    </div>
  );
};
