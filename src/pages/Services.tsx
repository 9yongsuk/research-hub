import { Link } from "react-router-dom";
import { services, collaborators } from "../content/Services";

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-white/80">
    {children}
  </span>
);

export default function Services() {
  return (
    <div className="relative min-h-screen text-white px-6 py-10 sm:py-16">
      {/* 컨테이너 */}
      <div className="max-w-7xl mx-auto">
        {/* 상단 타이틀 */}
        <div className="mb-10 sm:mb-16">
          <div className="text-xs sm:text-sm tracking-widest text-cyan-400 mb-3">
            SERVICES
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold mb-4 sm:mb-6">
            연구 서비스
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            한의학과 생명과학 기반 연구를 연결하는 통합 연구 서비스. 후보 발굴부터
            기전 분석, 데이터 패키징까지 협업 네트워크와 함께 수행합니다.
          </p>
        </div>

        {/* 서비스 카드 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-12">
          {services.map((s) => (
            <div
              key={s.title}
              className="
                relative z-10
                rounded-3xl border border-white/10
                bg-white/5 backdrop-blur-xl
                p-5 sm:p-8
                shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                md:hover:shadow-[0_35px_90px_rgba(0,0,0,0.75)]
                md:hover:-translate-y-2
                transition-all duration-500
              "
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {s.tags?.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                {s.title}
              </h3>

              <p className="text-sm sm:text-base text-white/70 mb-5 sm:mb-6 leading-relaxed">
                {s.desc}
              </p>

              <ul className="space-y-3 text-sm sm:text-base text-white/80 leading-relaxed">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 sm:gap-4">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>

              {/* 문의하기 */}
              <Link
                to="/contact"
                className="
                  inline-flex items-center gap-2
                  mt-6 sm:mt-8
                  px-5 py-2.5
                  rounded-full
                  bg-cyan-500/10
                  border border-cyan-400/40
                  text-cyan-300
                  text-sm font-semibold
                  shadow-[0_0_20px_rgba(34,211,238,0.25)]
                  md:hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                  md:hover:bg-cyan-500/20
                  md:hover:border-cyan-400
                  transition-all duration-300
                "
              >
                문의하기 <span className="text-xs">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Collaborator 섹션 */}
        <div className="mt-16 sm:mt-24">
          <div className="text-xs sm:text-sm tracking-widest text-cyan-400 mb-3">
            COLLABORATORS
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold mb-8 sm:mb-12">
            협업 네트워크
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-12">
            {collaborators.map((c) => (
              <div
                key={c.role}
                className="
                  relative z-10
                  rounded-3xl border border-white/10
                  bg-white/5 backdrop-blur-xl
                  p-5 sm:p-8
                  shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                  md:hover:shadow-[0_35px_90px_rgba(0,0,0,0.75)]
                  md:hover:-translate-y-2
                  transition-all duration-500
                "
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {c.role}
                </h3>

                <p className="text-white/60 text-sm sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  {c.who}
                </p>

                <ul className="space-y-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  {c.contributions.map((x) => (
                    <li key={x} className="flex gap-3 sm:gap-4">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="min-w-0">{x}</span>
                    </li>
                  ))}
                </ul>

                {c.notes && (
                  <div className="mt-5 sm:mt-6 text-white/60 text-sm leading-relaxed">
                    {c.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}