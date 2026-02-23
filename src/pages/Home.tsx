import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full min-h-0 flex flex-col justify-between py-3 sm:py-6">
      {/* 상단: 타이틀/설명 */}
      <div className="min-h-0">
        <h1 className="max-w-[18ch] sm:max-w-none font-extrabold leading-[1.05] whitespace-normal text-[clamp(28px,5vw,60px)]">
          Translational <span className="text-sky-400">Bio-AI</span>{" "}
          <span className="block sm:inline">Research Hub</span>
        </h1>

        <p className="mt-3 sm:mt-6 max-w-2xl text-white/80 leading-relaxed text-[clamp(13px,1.7vw,18px)] line-clamp-4 sm:line-clamp-5">
          분자기전 연구, 종양 유전체학, 의료 인공지능 모델링을 통합하고, 한의학 기반 중재
          전략을 과학적으로 재해석하여 기초 생명과학에서 임상 적용까지 연결하는 다학제
          융합 R&amp;D 플랫폼입니다. 협력 연구 네트워크를 기반으로 질환 기전 규명,
          후보물질 발굴, 전임상 검증까지 체계적으로 수행합니다.
        </p>
      </div>

      {/* 하단: CTA 버튼 (모바일에서도 화면 안에 고정되게) */}
      <div className="mt-5 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          to="/about"
          className="
            min-h-[44px]
            w-full sm:w-auto
            rounded-xl
            bg-sky-400
            px-6 py-3
            text-center
            font-semibold
            text-slate-900
            transition-colors duration-150
            hover:bg-gray-100
          "
        >
          연구소 소개
        </Link>

        <Link
          to="/contact"
          className="
            min-h-[44px]
            w-full sm:w-auto
            rounded-xl
            bg-gray-400
            px-6 py-3
            text-center
            font-semibold
            text-slate-900
            transition-colors duration-150
            hover:bg-gray-100
          "
        >
          문의하기
        </Link>
      </div>
    </div>
  );
}