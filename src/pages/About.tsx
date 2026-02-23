// src/pages/About.tsx
import { aboutContent } from "../content/about";

export default function About() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="py-8 sm:py-12">
      {/* ===== HERO SECTION ===== */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8 backdrop-blur-md">
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            {aboutContent.heroTitle}
          </h1>

          {aboutContent.heroSubtitle.map((p, i) => (
            <p
              key={i}
              className="mt-4 text-sm text-white/80 leading-relaxed sm:mt-5 sm:text-base"
            >
              {p}
            </p>
          ))}

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:mt-10">
            {aboutContent.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-center backdrop-blur-sm"
              >
                <div className="text-xl font-extrabold sm:text-2xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/70 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={`${base}about-hero.webp`}
            alt="연구소 이미지"
            className="h-[200px] w-full object-cover sm:h-[300px] lg:h-[420px]"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* ===== 상세 연구 내용 ===== */}
      <section className="mt-12 sm:mt-16 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid gap-10 md:grid-cols-3">
          {aboutContent.sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-lg font-semibold sm:text-xl">
                {sec.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80 leading-relaxed sm:text-base">
                {sec.body.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[2px] text-white/60">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 연구소 연혁 ===== */}
      <section className="mt-14 sm:mt-20">
        <div className="text-center">
          <div className="text-xs tracking-widest text-sky-300">
            HISTORY
          </div>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-4xl">
            연구소 연혁
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 mx-auto max-w-3xl">
          <div className="space-y-6 sm:space-y-10">
            {aboutContent.history.map((item) => (
              <div
                key={item.date}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm"
              >
                <div className="text-sky-300 text-lg font-bold sm:text-xl">
                  {item.date}
                </div>
                <div className="mt-2 text-sm text-white/85 leading-relaxed sm:text-base">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}