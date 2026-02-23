import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function Layout() {
  const base = import.meta.env.BASE_URL;

  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // 라우트가 바뀌면 모바일 메뉴 자동 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={`${base}logo.png`}
            alt="로안생명공학연구소 로고"
            className="h-10 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg">
            <span className="sm:hidden">로안연구소</span>
            <span className="hidden sm:inline">로안생명공학연구소</span>
          </span>
        </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <Link to="/" className="hover:text-white">홈</Link>
            <Link to="/about" className="hover:text-white">연구소 소개</Link>
            <Link to="/team" className="hover:text-white">연구진</Link>
            <Link to="/services" className="hover:text-white">연구서비스</Link>
            <Link to="/contact" className="hover:text-white">문의하기</Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 backdrop-blur-md transition hover:bg-white/10 md:hidden"
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {/* 아이콘(간단) */}
            <span className="text-xl leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {mobileOpen && (
          <div className="md:hidden">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md shadow-xl">
                <nav className="flex flex-col gap-2 text-base text-white/90">
                  <Link
                    to="/"
                    className="rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    홈
                  </Link>
                  <Link
                    to="/about"
                    className="rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    연구소 소개
                  </Link>
                  <Link
                    to="/team"
                    className="rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    연구진
                  </Link>
                  <Link
                    to="/services"
                    className="rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    연구서비스
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    문의하기
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
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