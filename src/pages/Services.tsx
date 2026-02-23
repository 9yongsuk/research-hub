import { Link } from "react-router-dom";
import { services, collaborators } from "../content/Services";

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-white/75">
    {children}
  </span>
);

export default function Services() {
  // --- spacing system (통일 규칙) ---
  const pageX = "px-4 sm:px-6";
  const pageY = "py-6 sm:py-12";
  const sectionGap = "mt-10 sm:mt-16";
  const card =
    "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.55)]";
  const cardPad = "p-5 sm:p-8";
  const kicker = "text-[11px] sm:text-sm tracking-[0.25em] text-cyan-300";
  const h1 =
    "font-semibold text-white leading-[1.15] tracking-[-0.01em] text-[clamp(22px,6vw,34px)] sm:text-5xl";
  const lead =
    "text-white/70 max-w-2xl text-[13px] sm:text-base leading-[1.65] sm:leading-relaxed";
  const h2 = "text-[clamp(18px,5vw,26px)] sm:text-4xl font-semibold text-white";
  const h3 = "text-[17px] sm:text-2xl font-semibold text-white";
  const body = "text-white/70 text-[13px] sm:text-base leading-[1.65] sm:leading-relaxed";
  const bulletText = "text-white/80 text-[13px] sm:text-base leading-[1.65] sm:leading-relaxed";

  return (
    <div className={`relative min-h-dvh text-white ${pageX} ${pageY}`}>
      {/* 컨테이너 */}
      <div className="max-w-6xl mx-auto">
        {/* 상단 타이틀 */}
        <header className="mb-8 sm:mb-12">
          <div className={`${kicker} mb-2 sm:mb-3`}>SERVICES</div>
          <h1 className={h1}>연구 서비스</h1>
          <p className="mt-3 sm:mt-4">
            <span className={lead}>
              한의학과 생명과학 기반 연구를 연결하는 통합 연구 서비스. 후보 발굴부터
              기전 분석, 데이터 패키징까지 협업 네트워크와 함께 수행합니다.
            </span>
          </p>

          {/* 모바일에서 페이지 초반이 너무 비지 않게, 짧은 강조 라벨(선택) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>후보 발굴</Badge>
            <Badge>기전 분석</Badge>
            <Badge>전임상 검증</Badge>
            <Badge>데이터 패키징</Badge>
          </div>
        </header>

        {/* 서비스 카드 grid */}
        <section aria-label="서비스 목록">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {services.map((s) => (
              <article
                key={s.title}
                className={`
                  relative z-10 ${card} ${cardPad}
                  transition-all duration-500
                  md:hover:shadow-[0_35px_90px_rgba(0,0,0,0.75)]
                  md:hover:-translate-y-2
                `}
              >
                {/* Tags */}
                {s.tags?.length ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                ) : (
                  <div className="mb-2" />
                )}

                <h3 className={h3}>{s.title}</h3>

                <p className="mt-2 sm:mt-3 mb-4 sm:mb-6">
                  <span className={body}>{s.desc}</span>
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 sm:space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 sm:gap-4">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className={`min-w-0 ${bulletText}`}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA: 모바일에서는 버튼이 너무 작지 않게, 카드 하단 정렬 */}
                <div className="mt-6 sm:mt-8 flex items-center justify-between gap-3">
                  <Link
                    to="/contact"
                    className="
                      inline-flex items-center justify-center gap-2
                      min-h-[44px]
                      px-5 py-2.5
                      rounded-full
                      bg-cyan-500/10
                      border border-cyan-400/40
                      text-cyan-300
                      text-sm font-semibold
                      shadow-[0_0_20px_rgba(34,211,238,0.25)]
                      hover:bg-cyan-500/20 hover:border-cyan-400
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                      transition
                    "
                  >
                    문의하기 <span className="text-xs">→</span>
                  </Link>

                  {/* 모바일에서 카드 길어도 균형 잡히게 ‘미세 정보’(선택) */}
                  <span className="text-[11px] sm:text-xs text-white/45">
                    협업 기반 수행
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Collaborator 섹션 */}
        <section className={sectionGap} aria-label="협업 네트워크">
          <div className={`${kicker} mb-2 sm:mb-3`}>COLLABORATORS</div>
          <h2 className={h2}>협업 네트워크</h2>
          <p className="mt-3 sm:mt-4">
            <span className={lead}>
              전문 연구기관 및 임상/분석 파트너와 연계하여, 기획부터 실행·검증·보고까지
              일관된 품질의 산출물을 제공합니다.
            </span>
          </p>

          <div className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {collaborators.map((c) => (
              <article
                key={c.role}
                className={`
                  relative z-10 ${card} ${cardPad}
                  transition-all duration-500
                  md:hover:shadow-[0_35px_90px_rgba(0,0,0,0.75)]
                  md:hover:-translate-y-2
                `}
              >
                <h3 className="text-[16px] sm:text-xl font-semibold text-white">
                  {c.role}
                </h3>

                <p className="mt-2 sm:mt-3 text-white/60 text-[13px] sm:text-sm leading-[1.65] sm:leading-relaxed">
                  {c.who}
                </p>

                <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                  {c.contributions.map((x) => (
                    <li key={x} className="flex gap-3 sm:gap-4">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className={`min-w-0 ${bulletText}`}>{x}</span>
                    </li>
                  ))}
                </ul>

                {c.notes && (
                  <div className="mt-5 sm:mt-6 text-white/55 text-[13px] sm:text-sm leading-[1.65] sm:leading-relaxed">
                    {c.notes}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* 섹션 하단 CTA */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              to="/contact"
              className="
                inline-flex items-center justify-center gap-2
                min-h-[46px]
                w-full sm:w-auto
                px-6 py-3 sm:py-2.5
                rounded-full
                bg-cyan-500/10
                border border-cyan-400/40
                text-cyan-200
                text-sm font-semibold
                shadow-[0_0_20px_rgba(34,211,238,0.22)]
                hover:bg-cyan-500/20 hover:border-cyan-400
                hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                transition
              "
            >
              협업 문의하기 <span className="text-xs">→</span>
            </Link>

            <span className="text-[12px] sm:text-sm text-white/50">
              필요한 범위만 선택해서 진행 가능합니다.
            </span>
          </div>
        </section>

        <div className="mt-10 sm:mt-12 text-center text-[11px] sm:text-xs text-white/50">
          © {new Date().getFullYear()} Roan Bioengineering Research Center
        </div>
      </div>
    </div>
  );
}