// src/pages/About.tsx
import { aboutContent } from "../content/about";

function splitLine(line: string) {
  // ":" / "—" / " - " 기준으로 "요약 / 부연" 분리
  const seps = [":", "—", " - "];
  for (const sep of seps) {
    const idx = line.indexOf(sep);
    if (idx > 0) {
      const head = line.slice(0, idx).trim();
      const tail = line.slice(idx + sep.length).trim();
      if (head && tail) return { head, tail };
    }
  }
  return { head: line.trim(), tail: "" };
}

function FeatureRowText({ head, tail }: { head: string; tail?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/[0.07]">
      <div className="text-[14px] font-semibold text-white leading-snug">
        {head}
      </div>
      {tail ? (
        <div className="mt-1 text-[12.5px] text-white/70 leading-relaxed">
          {tail}
        </div>
      ) : null}
    </div>
  );
}

export default function About() {
  const base = import.meta.env.BASE_URL;

  // 공통 카드 톤
  const card = "rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md";
  const padM = "p-5";
  const padD = "p-8";

  return (
    <div className="py-6 sm:py-12">
      {/* ===========================
          MOBILE LAYOUT (< lg)
          =========================== */}
      <div className="block lg:hidden">
        {/* HERO (Mobile): 텍스트 위, 이미지 아래 */}
        <section className="grid gap-5">
          <div className={`${card} ${padM} bg-black/30`}>
            <div className="text-[11px] tracking-[0.28em] text-sky-300">
              ABOUT
            </div>

            <h1 className="mt-2 font-extrabold text-[22px] sm:text-[26px] lg:text-[36px] leading-[1.18] tracking-[-0.01em] text-white">
              {aboutContent.heroTitle}
            </h1>

            <div className="mt-3 space-y-3">
              {aboutContent.heroSubtitle.map((p, i) => (
                <p key={i} className="text-white/80 text-[13px] leading-[1.75]">
                  {p}
                </p>
              ))}
            </div>

            {/* Stats (Mobile) */}
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-3">
                {aboutContent.stats.map((s, idx) => (
                  <div
                    key={s.label}
                    className={[
                      "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
                      "px-4 py-3 text-center",
                      idx === 2 ? "col-span-2" : "",
                    ].join(" ")}
                  >
                    <div className="text-[18px] font-extrabold text-white">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/70">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image (Mobile) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <img
              src={`${base}about-hero.webp`}
              alt="연구소 이미지"
              className="
                w-full h-[210px]
                object-cover object-[center_35%]
                scale-[1.04]
              "
              decoding="async"
              fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </section>

        {/* ✅ 3 BOX (Mobile): 아이콘 없음, 가독성 중심 */}
        <section className="mt-10 grid gap-4">
          {aboutContent.sections.map((sec) => (
            <div key={sec.title} className={`${card} ${padM}`}>
              <div className="min-w-0">
                <div className="text-[11px] tracking-[0.22em] text-sky-300">
                  {sec.title.toUpperCase()}
                </div>
                <h3 className="mt-1 text-[16px] font-semibold text-white leading-tight">
                  {sec.title}
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                {sec.body.map((line, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[13px] leading-[1.7]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Timeline (Mobile) */}
        <section className="mt-10">
          <div className="text-center">
            <div className="text-[11px] tracking-[0.22em] text-sky-300">
              HISTORY
            </div>
            <h2 className="mt-2 text-[22px] font-extrabold text-white">
              연구소 연혁
            </h2>
            <p className="mt-2 text-white/60 text-[12px]">
              주요 이정표를 시간 흐름에 따라 정리했습니다.
            </p>
          </div>

          <div className="mt-7 mx-auto max-w-3xl">
            <div className="relative">
              {/* 세로 라인 */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/12" />

              <div className="space-y-5">
                {aboutContent.history.map((item) => (
                  <div key={item.date} className="relative pl-10">
                    {/* ✅ 점: 박스 세로 중앙 정렬 */}
                    <div className="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-3 w-3 rounded-full bg-sky-300 shadow-sm shadow-sky-300/30" />
                      <div className="absolute inset-0 -m-2 rounded-full bg-sky-300/15 blur-md" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <div className="text-sky-300 text-[14px] font-bold">
                          {item.date}
                        </div>
                      </div>

                      <div className="mt-2 text-[13px] text-white/85 leading-[1.75]">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===========================
          DESKTOP / WEB LAYOUT (>= lg)
          =========================== */}
      <div className="hidden lg:block">
        {/* HERO (Desktop) */}
        <section className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Text (좌) */}
          <div className="lg:col-span-7">
            <div className={`${card} ${padD} bg-black/30 h-full`}>
              <div className="text-[11px] tracking-[0.28em] text-sky-300">
                ABOUT
              </div>

              <h1
                className="
                  mt-2 font-extrabold text-white leading-[1.12] tracking-[-0.015em]
                  text-[clamp(26px,2.2vw,34px)] max-w-[26ch]
                "
              >
                {aboutContent.heroTitle}
              </h1>

              <div className="mt-4 space-y-3">
                {aboutContent.heroSubtitle.map((p, i) => (
                  <p
                    key={i}
                    className="text-white/80 text-[15px] leading-relaxed max-w-[72ch]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Stats (Desktop) */}
              <div className="mt-7">
                <div className="grid grid-cols-3 gap-4">
                  {aboutContent.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-center"
                    >
                      <div className="text-2xl font-extrabold text-white">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6" />
            </div>
          </div>

          {/* Image (우) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 h-full min-h-[360px]">
              <img
                src={`${base}about-hero.webp`}
                alt="연구소 이미지"
                className="
                  w-full h-full
                  object-cover
                  object-[center_35%]
                  transition-transform duration-500
                "
                decoding="async"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </section>

        {/* ✅ 3 BOX (Desktop): 아이콘 없이 고급스러운 "요약 + 부연" 카드형 */}
        <section className="mt-16">
          <div className="grid grid-cols-3 gap-6">
            {aboutContent.sections.map((sec) => (
              <div key={sec.title} className={`${card} ${padD} h-full`}>
                {/* Header */}
                <div>
                  <div className="text-[11px] tracking-[0.22em] text-sky-300">
                    {sec.title.toUpperCase()}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white leading-tight">
                    {sec.title}
                  </h3>
                </div>

                {/* Body (Feature list) */}
                <div className="mt-5 grid gap-3">
                  {sec.body.map((line, i) => {
                    const { head, tail } = splitLine(line);
                    return (
                      <FeatureRowText
                        key={`${sec.title}-${i}`}
                        head={head}
                        tail={tail}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline (Desktop) */}
        <section className="mt-16">
          <div className="text-center">
            <div className="text-xs tracking-[0.22em] text-sky-300">HISTORY</div>
            <h2 className="mt-2 text-4xl font-extrabold text-white">
              연구소 연혁
            </h2>
            <p className="mt-2 text-white/60 text-sm">
              주요 이정표를 시간 흐름에 따라 정리했습니다.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/12" />

              <div className="space-y-8">
                {aboutContent.history.map((item) => (
                  <div key={item.date} className="relative pl-10">
                    {/* ✅ 점: 박스 세로 중앙 정렬 */}
                    <div className="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-3 w-3 rounded-full bg-sky-300 shadow-sm shadow-sky-300/30" />
                      <div className="absolute inset-0 -m-2 rounded-full bg-sky-300/15 blur-md" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <div className="text-sky-300 text-[14px] font-bold">
                          {item.date}
                        </div>
                      </div>

                      <div className="mt-2 text-[15px] text-white/85 leading-relaxed">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}