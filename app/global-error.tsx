"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

/**
 * Global error boundary (audit item P1-06).
 *
 * Next.js requires global-error.tsx to be a Client Component and to render its
 * own <html>/<body> (it replaces the root layout when the whole app crashes,
 * so fonts/global CSS may be unavailable). Keep it self-contained.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center bg-amber-100 text-amber-700">
            <FiAlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold uppercase tracking-tight text-slate-950">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            An unexpected error occurred. You can try again, or WhatsApp us
            directly for faster service.
          </p>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 bg-brand-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-800"
          >
            <FiRefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      </body>
    </html>
  );
}
