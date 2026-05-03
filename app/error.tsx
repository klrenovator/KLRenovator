"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

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
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center bg-amber-100 text-amber-700">
        <FiAlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-2xl font-extrabold text-ink uppercase tracking-tight">
        Something went wrong
      </h2>
      <p className="mt-3 text-sm text-slate-600">
        An unexpected error occurred. You can try again, or WhatsApp us
        directly for faster service.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
      >
        <FiRefreshCw className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}
