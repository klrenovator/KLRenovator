/**
 * Chinese route loading UI (audit item P1-06).
 * Shown instantly while any /zh/* route segment is loading its server data.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          加载中&hellip;
        </p>
      </div>
      <span className="sr-only">正在加载页面</span>
    </div>
  );
}
