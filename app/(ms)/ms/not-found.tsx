import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-8xl font-black text-sky-600 tracking-tight">404</p>
      <h1 className="mt-3 text-2xl font-black text-slate-950 uppercase tracking-tight">
        Halaman Tidak Dijumpai
      </h1>
      <p className="mt-3 text-sm text-slate-600 font-medium max-w-sm">
        Halaman yang anda cari tidak wujud. Ia mungkin telah dipadam atau dipindahkan.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/ms"
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all"
        >
          <FiArrowLeft className="h-4 w-4" /> Kembali ke Utama
        </Link>
        <Link
          href="/ms/services"
          className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-sky-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-700 hover:text-sky-600 transition-all"
        >
          Lihat Perkhidmatan
        </Link>
      </div>
    </div>
  );
}
