import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col justify-center">
      <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
        한의학의 <span className="text-sky-400">과학적 미래</span>를 연구합니다
      </h1>

      <p className="mt-6 max-w-xl text-white/80 text-lg">
        한의학 치료 표준화 및 과학적 검증을 위한 연구를 수행합니다.
        부설 연구소 기반의 체계적인 R&amp;D 허브입니다.
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