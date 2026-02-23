import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col justify-center">
      <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
        Translational <span className="text-sky-400">Bio-AI</span> Research Hub
      </h1>

      <p className="mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">
        분자기전 연구, 종양 유전체학, 의료 인공지능 모델링을 통합하여
        기초 생명과학에서 임상 적용까지 연결하는 다학제 융합 R&amp;D 플랫폼입니다.
        협력 연구 네트워크를 기반으로 차세대 의생명 연구개발을 수행합니다.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          to="/about"
          className="rounded-xl bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition-colors duration-150 hover:bg-gray-100"
        >
          연구소 소개
        </Link>

        <Link
          to="/contact"
          className="rounded-xl bg-gray-400 px-6 py-3 font-semibold text-slate-900 transition-colors duration-150 hover:bg-gray-100"
        >
          문의하기
        </Link>
      </div>
    </div>
  );
}