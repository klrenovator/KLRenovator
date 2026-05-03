import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-7xl font-black text-brand-700 tracking-tight">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-ink uppercase tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        The page you were looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
      >
        <FiArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
