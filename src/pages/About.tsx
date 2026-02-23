// src/pages/About.tsx
import { aboutContent } from "../content/about";

export default function About() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="py-12">
      {/* ===== HERO SECTION ===== */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
          <h1 className="!text-3xl md:!text-4xl font-semibold leading-tight">
            {aboutContent.heroTitle}
          </h1>

          {aboutContent.heroSubtitle.map((p, i) => (
            <p key={i} className="mt-5 text-white/80 leading-relaxed">
              {p}
            </p>
          ))}

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {aboutContent.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={`${base}about-hero.webp`}
            alt="연구소 이미지"
            className="h-[420px] w-full object-cover"
          />

        </div>
      </section>

      {/* ===== 상세 연구 내용 ===== */}
      <section className="mt-16 rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-md">
        <div className="grid gap-8 md:grid-cols-3">
          {aboutContent.sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-xl font-semibold">{sec.title}</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                {sec.body.map((line, i) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

        {/* ===== 연구소 연혁 ===== */}
        <section className="mt-20">
        <div className="text-center">
            <div className="text-xs tracking-widest text-sky-300">HISTORY</div>
            <h2 className="mt-2 text-4xl font-extrabold">연구소 연혁</h2>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
            <div className="relative">
            {/* 세로 라인 */}
            <div className="absolute left-[176px] top-0 h-full w-px bg-white/20 hidden sm:block" />

            <div className="space-y-12">
                {aboutContent.history.map((item) => (
                <div
                    key={item.date}
                    className="grid sm:grid-cols-[140px_40px_1fr] items-center gap-4"
                >
                    {/* 연도 */}
                    <div className="text-sky-300 text-xl font-extrabold sm:text-right">
                    {item.date}
                    </div>

                    {/* dot */}
                    <div className="flex justify-center">
                    <div className="h-3 w-3 rounded-full bg-sky-400" />
                    </div>

                    {/* 내용 */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm text-white/85">
                    {item.text}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    </div>
  );
}