"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        An unexpected error occurred. You can try again, or WhatsApp us directly for faster service.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
      >
        <RefreshCcw className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}
