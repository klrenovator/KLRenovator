import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-8xl font-black text-sky-600 tracking-tight">404</p>
      <h1 className="mt-3 text-2xl font-black text-slate-950 uppercase tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600 font-medium max-w-sm">
        The page you were looking for does not exist. It may have moved or been removed.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all"
        >
          <FiArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 transition-all"
        >
          View Services
        </Link>
      </div>
    </div>
  );
}
