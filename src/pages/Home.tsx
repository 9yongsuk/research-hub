// src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="w-full">
      {/* 히어로: 모바일에서 과도한 full height 느낌을 줄이고 균형 맞추기 */}
      <div className="min-h-[58vh] sm:min-h-[70vh] flex items-center">
        <div className="w-full">
          {/* 모바일 라벨(선택): 있으면 전체가 ‘정돈된’ 느낌이 강해짐 */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-white/70 sm:text-xs">
            Translational R&amp;D Platform
          </p>

          {/* Title: 모바일/데스크탑 완전 분리 */}
          <h1 className="mt-4 sm:hidden max-w-[20ch] font-extrabold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(22px,6.2vw,30px)]">
            Translational <span className="text-sky-400">Bio-AI</span>
            <span className="block">Research Hub</span>
          </h1>

          <h1 className="mt-4 hidden sm:block font-extrabold leading-[1.05] tracking-[-0.03em] text-white text-[clamp(34px,4.2vw,60px)]">
            Translational <span className="text-sky-400">Bio-AI</span>{" "}
            <span className="inline">Research Hub</span>
          </h1>

          {/* Subtitle: 모바일은 13~14px 고정 + 줄간격 넉넉히 */}
          <p className="mt-3 sm:mt-5 max-w-[52ch] text-white/78 text-[13px] leading-[1.65] sm:text-[15px] sm:leading-[1.75]">
            분자기전 연구, 종양 유전체학, 의료 인공지능 모델링을 통합하고, 한의학 기반 중재
            전략을 과학적으로 재해석하여 기초 생명과학에서 임상 적용까지 연결하는 다학제
            융합 R&amp;D 플랫폼입니다. 협력 연구 네트워크를 기반으로 질환 기전 규명,
            후보물질 발굴, 전임상 검증까지 체계적으로 수행합니다.
          </p>

          {/* CTA: 모바일은 세로 스택, 버튼 높이/폭 통일 */}
          <div className="mt-5 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/services"
              className="
                min-h-[46px]
                w-full sm:w-auto
                rounded-xl
                bg-sky-400/95 hover:bg-sky-400
                px-6 py-3
                text-center
                font-semibold
                text-slate-900
                shadow-lg shadow-sky-400/15
                transition
              "
            >
              서비스 소개
            </Link>

            <Link
              to="/contact"
              className="
                min-h-[46px]
                w-full sm:w-auto
                rounded-xl
                border border-white/15
                bg-white/5 hover:bg-white/10
                px-6 py-3
                text-center
                font-semibold
                text-white
                transition
              "
            >
              문의하기
            </Link>

            {/* 모바일 균형용 마이크로텍스트 */}
            <div className="text-[12px] text-white/55 sm:self-center">
              CRO 협업 · 정부과제 · 데이터 기반 검증
            </div>
          </div>

          {/* (선택) 스탯: 모바일에서 너무 크지 않게 */}
          <div className="mt-7 sm:mt-10 grid grid-cols-3 gap-3 max-w-[420px]">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-white text-sm font-bold">3</div>
              <div className="text-white/60 text-[11px] mt-0.5">핵심 연구분야</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-white text-sm font-bold">40+</div>
              <div className="text-white/60 text-[11px] mt-0.5">SCI 논문</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-white text-sm font-bold">2026</div>
              <div className="text-white/60 text-[11px] mt-0.5">설립연도</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}