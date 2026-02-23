import { Link, Outlet } from "react-router-dom";

export function Layout() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* ===== 공통 배경 (모든 페이지 동일) ===== */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover"
      >
        <source src={`${base}hero-bg.mp4`} type="video/mp4" />
      </video>

      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${base}hero-bg.jpg)` }}
      />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/55" />
      {/* ===================================== */}

      {/* ===== 공통 헤더 ===== */}
      <header className="relative w-full">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`${base}logo.png`}
              alt="로안생명공학연구소 로고"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden text-lg font-semibold tracking-tight sm:block">
              로안생명공학연구소
            </span>
          </Link>

          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <Link to="/" className="hover:text-white">홈</Link>
            <Link to="/about" className="hover:text-white">연구소 소개</Link>
            <Link to="/team" className="hover:text-white">연구진</Link>
            <Link to="/services" className="hover:text-white">연구서비스</Link>
            <Link to="/contact" className="hover:text-white">문의하기</Link>
          </nav>
        </div>
      </header>

      {/* ===== 본문(라우팅에 따라 바뀌는 영역) ===== */}
      <main className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
        <Outlet />
      </main>

      {/* (선택) 공통 푸터 */}
      <footer className="relative mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 text-white/70 text-sm">
        <div className="border-t border-white/10 pt-6">
          © {new Date().getFullYear()} 로안생명공학연구소
        </div>
      </footer>
    </div>
  );
}
