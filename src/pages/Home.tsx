import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col justify-center">
      <h1 className="text-3xl font-extrabold leading-snug sm:text-4xl md:text-6xl">
        Translational <span className="text-sky-400">Bio-AI</span>
        <br className="hidden sm:block" />
        <span className="block sm:inline">Research Hub</span>
      </h1>

      <p className="mt-6 max-w-2xl text-white/80 text-base leading-relaxed sm:text-lg">
        분자기전 연구, 종양 유전체학, 의료 인공지능 모델링을 통합하고,
        한의학 기반 중재 전략을 과학적으로 재해석하여
        기초 생명과학에서 임상 적용까지 연결하는 다학제 융합 R&amp;D 플랫폼입니다.
        협력 연구 네트워크를 기반으로 질환 기전 규명, 후보물질 발굴,
        전임상 검증까지 체계적으로 수행합니다.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/about"
          className="rounded-xl bg-sky-400 px-6 py-3 text-center font-semibold text-slate-900 transition-colors duration-150 hover:bg-gray-100"
        >
          연구소 소개
        </Link>

        <Link
          to="/contact"
          className="rounded-xl bg-gray-400 px-6 py-3 text-center font-semibold text-slate-900 transition-colors duration-150 hover:bg-gray-100"
        >
          문의하기
        </Link>
      </div>
    </div>
  );
}