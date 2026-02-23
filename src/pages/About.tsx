// src/pages/About.tsx
import { aboutContent } from "../content/about";

export default function About() {
  const base = import.meta.env.BASE_URL;

  // --- Spacing system (통일 규칙) ---
  const pageY = "py-6 sm:py-12";
  const sectionGap = "mt-10 sm:mt-16";
  const card = "rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md";
  const cardPad = "p-5 sm:p-8";
  const titleH1 =
    "font-semibold text-white leading-[1.15] tracking-[-0.01em] text-[clamp(20px,5.2vw,28px)] sm:text-3xl md:text-4xl max-w-[22ch] sm:max-w-none";
  const bodyP =
    "text-white/80 text-[13px] sm:text-base leading-[1.65] sm:leading-relaxed";
  const h3 =
    "text-[16px] sm:text-xl font-semibold text-white leading-tight";
  const listText =
    "text-white/80 text-[13px] sm:text-base leading-[1.65] sm:leading-relaxed";

  return (
    <div className={pageY}>
      {/* ===== HERO SECTION ===== */}
      <section className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* Text Card */}
        <div className={`${card} ${cardPad} bg-black/30`}>
          <h1 className={titleH1}>{aboutContent.heroTitle}</h1>

          <div className="mt-3 sm:mt-5 space-y-3 sm:space-y-4">
            {aboutContent.heroSubtitle.map((p, i) => (
              <p key={i} className={`${bodyP} max-w-[60ch]`}>
                {p}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {aboutContent.stats.map((s, idx) => (
                <div
                  key={s.label}
                  className={[
                    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
                    "px-4 py-3 sm:p-5 text-center",
                    idx === 2 ? "col-span-2 sm:col-span-1" : "",
                  ].join(" ")}
                >
                  <div className="text-[18px] sm:text-2xl font-extrabold text-white">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[11px] sm:text-sm text-white/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (선택) 카드 높이 균형을 위한 하단 여백 통일용 스페이서 */}
          <div className="mt-6 hidden lg:block" />
        </div>

        {/* Image Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <img
            src={`${base}about-hero.webp`}
            alt="연구소 이미지"
            className="
              w-full h-[180px] sm:h-[320px] lg:h-full lg:min-h-[420px]
              object-cover
              object-[center_30%] sm:object-center
              scale-[1.06] sm:scale-100
              transition-transform duration-500
            "
            decoding="async"
            fetchPriority="high"
          />
          {/* 대비/가독성 확보 + 이미지가 길어 보이는 느낌 완화 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </section>

      {/* ===== 상세 연구 내용 ===== */}
      <section className={`${sectionGap} ${card} ${cardPad}`}>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          {aboutContent.sections.map((sec) => (
            <div key={sec.title} className="min-w-0">
              <h3 className={h3}>{sec.title}</h3>

              <ul className="mt-3 space-y-2">
                {sec.body.map((line, i) => (
                  <li key={i} className={`flex gap-2 ${listText}`}>
                    <span className="mt-[3px] text-white/55">•</span>
                    <span className="min-w-0">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 연구소 연혁 (Timeline) ===== */}
      <section className={`${sectionGap}`}>
        <div className="text-center">
          <div className="text-[11px] sm:text-xs tracking-[0.22em] text-sky-300">
            HISTORY
          </div>
          <h2 className="mt-2 text-[clamp(20px,5.2vw,28px)] sm:text-4xl font-extrabold text-white">
            연구소 연혁
          </h2>
          <p className="mt-2 text-white/60 text-[12px] sm:text-sm">
            주요 이정표를 시간 흐름에 따라 정리했습니다.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 mx-auto max-w-3xl">
          {/* Timeline wrapper */}
          <div className="relative">
            {/* 세로 라인 */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/12" />

            <div className="space-y-5 sm:space-y-8">
              {aboutContent.history.map((item) => (
                <div key={item.date} className="relative pl-10">
                  {/* 점 */}
                  <div className="absolute left-3 top-[10px] -translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-sky-300 shadow-sm shadow-sky-300/30" />
                    <div className="absolute inset-0 -m-2 rounded-full bg-sky-300/15 blur-md" />
                  </div>

                  {/* Content bubble */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <div className="text-sky-300 text-[14px] sm:text-base font-bold">
                        {item.date}
                      </div>
                      {/* 모바일에서 날짜 옆에 짧은 태그가 필요하면 여기에 배치 가능 */}
                    </div>

                    <div className="mt-2 text-[13px] sm:text-base text-white/85 leading-[1.65] sm:leading-relaxed">
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
  );
}