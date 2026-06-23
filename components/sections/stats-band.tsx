import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

const icons = [
  // People/customers
  <svg key="customers" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
  // Calendar/years
  <svg key="years" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm9.75-4.5h.008v.008H17.25v-.008zM17.25 15h.008v.008H17.25V15zm0 2.25h.008v.008H17.25v-.008zM14.25 13.5h.008v.008H14.25v-.008zM14.25 15h.008v.008H14.25V15zm0 2.25h.008v.008H14.25v-.008zM12 13.5h.008v.008H12v-.008z" />
  </svg>,
  // Star/reviews
  <svg key="reviews" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
  // Clock/response
  <svg key="response" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export const StatsBand = () => {
  return (
    <section className="relative bg-white border-y border-slate-100 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 via-white to-slate-50/80 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Reveal>
          {/* Heading */}
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-10">
            Trusted Across Klang Valley
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {siteConfig.stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-sky-100 transition-all duration-300"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-sky-50 border border-sky-100 text-sky-500 mb-5 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  {icons[i]}
                </div>

                {/* Value */}
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-none">
                  {s.value}
                </p>

                {/* Label */}
                <p className="mt-2.5 text-xs sm:text-sm font-semibold text-slate-500 leading-snug max-w-[140px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
