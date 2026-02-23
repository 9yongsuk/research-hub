export default function Card({
  title,
  desc,
  meta,
}: {
  title: string;
  desc: string;
  meta?: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
      {/* hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-slate-300/80" />

      {/* subtle gradient on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      </div>

      <div className="relative">
        {meta ? <div className="text-xs text-slate-500">{meta}</div> : null}
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition group-hover:border-slate-300">
            {/* 아이콘 자리(텍스트로 임시) */}
            ↗
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}