import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-6xl font-black text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        The page you were looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
