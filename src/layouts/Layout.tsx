import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

export function Layout() {
  const base = import.meta.env.BASE_URL;

  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // ✅ Home 판별
  const isHome = useMemo(() => {
    return location.pathname === "/" || location.pathname === "";
  }, [location.pathname]);

  // ✅ Home에서만 copyright 자동 숨김
  const [hideHomeCopyright, setHideHomeCopyright] = useState(false);

  // ✅ Scroll indicator (Home 제외)
  const mainRef = useRef<HTMLElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hideScrollHint, setHideScrollHint] = useState(false);

  // ✅ 같은 탭 다시 누를 때도 "탭이 나타나는" 느낌을 주기 위한 강제 리마운트 키
  const [routeNonce, setRouteNonce] = useState(0);

  // ✅ 공용: main을 맨 위로 올리기
  const scrollMainToTop = (smooth = true) => {
    const el = mainRef.current;
    if (!el) return;
    try {
      el.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    } catch {
      el.scrollTop = 0;
    }
  };

  // ✅ 공용: 네비게이션 클릭 핸들러 (같은 탭 클릭 포함)
  const handleNavClick =
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // 항상 모바일 메뉴는 닫기
      setMobileOpen(false);

      // "같은 탭"이면 라우트 변화가 없으므로, 우리가 반응을 만들어줘야 함
      if (to === location.pathname || (to === "/" && isHome)) {
        e.preventDefault(); // 라우터가 아무 것도 안 하는 상황을 우리가 제어

        // main을 맨 위로
        scrollMainToTop(true);

        // scroll indicator도 숨김 처리
        setHideScrollHint(true);

        // 화면이 "다시 나타난다" 느낌(리마운트) 주기
        setRouteNonce((n) => n + 1);
      }
    };

  // 라우트가 바뀌면 모바일 메뉴 자동 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ✅ Home 진입 시 copyright 잠깐 보여주고 자동 fade out
  useEffect(() => {
    setHideHomeCopyright(false);

    if (!isHome) return;

    const t = window.setTimeout(() => {
      setHideHomeCopyright(true);
    }, 2200);

    return () => window.clearTimeout(t);
  }, [isHome, location.pathname]);

  // ✅ (Home 제외) 스크롤 가능할 때만 indicator 노출
  useEffect(() => {
    if (isHome) {
      setShowScrollHint(false);
      setHideScrollHint(false);
      return;
    }

    // 페이지 전환 시 다시 힌트를 보여줄 준비
    setHideScrollHint(false);

    const t = window.setTimeout(() => {
      const el = mainRef.current;
      if (!el) return;

      // 새 페이지면 스크롤 위로 올리는 게 UX 좋음
      el.scrollTop = 0;

      const canScroll = el.scrollHeight > el.clientHeight + 2;
      setShowScrollHint(canScroll);
    }, 80);

    return () => window.clearTimeout(t);
  }, [isHome, location.pathname]);

  // ✅ main 스크롤이 발생하면 indicator 숨김
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!hideScrollHint) setHideScrollHint(true);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [hideScrollHint, location.pathname]);

  // ✅ Drawer가 열려 있을 때, 배경 스크롤/터치 스크롤 감각까지 더 확실히 잠그고 싶으면
  // main overflow-hidden만으로도 충분한데, iOS에서 body 스크롤 튀는 경우 대비용.
  // (부작용 최소화 위해 mobileOpen일 때만)
  useEffect(() => {
    if (!mobileOpen) return;

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-white flex flex-col">
      {/* ===== 공통 배경 ===== */}
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

      {/* ===== 공통 헤더 ===== */}
      <header className="relative w-full shrink-0">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-4 lg:px-10">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => {
              // 로고 탭 시 drawer 닫기 (모바일에서 종종 유용)
              setMobileOpen(false);
            }}
          >
            <img
              src={`${base}logo.png`}
              alt="로안생명공학연구소 로고"
              className="h-9 sm:h-10 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg">
              <span className="sm:hidden">로안생명공학연구소</span>
              <span className="hidden sm:inline">로안생명공학연구소</span>
            </span>
          </Link>

          {/* 데스크탑 메뉴 (같은 탭 클릭 시에도 스크롤 top + 리마운트) */}
          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <Link to="/" className="hover:text-white" onClick={handleNavClick("/")}>
              홈
            </Link>
            <Link to="/about" className="hover:text-white" onClick={handleNavClick("/about")}>
              연구소 소개
            </Link>
            <Link to="/team" className="hover:text-white" onClick={handleNavClick("/team")}>
              연구진
            </Link>
            <Link
              to="/services"
              className="hover:text-white"
              onClick={handleNavClick("/services")}
            >
              연구서비스
            </Link>
            <Link
              to="/contact"
              className="hover:text-white"
              onClick={handleNavClick("/contact")}
            >
              문의하기
            </Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 backdrop-blur-md transition hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* ===== Mobile Drawer (overlay + fixed panel) ===== */}
        {/* ✅ 레이아웃을 밀지 않고 화면 위로 덮어서 나타남 */}
        <div
          className={[
            "md:hidden",
            "fixed inset-0 z-50",
            // open일 때만 클릭/터치 가능
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!mobileOpen}
        >
          {/* Backdrop */}
          <div
            className={[
              "absolute inset-0",
              "bg-black/55 backdrop-blur-[2px]",
              "transition-opacity duration-200 ease-out",
              mobileOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <aside
            className={[
              "absolute right-0 top-0 h-full w-[86%] max-w-[360px]",
              "border-l border-white/10 bg-black/70 backdrop-blur-md shadow-2xl",
              "transition-transform duration-250 ease-out",
              mobileOpen ? "translate-x-0" : "translate-x-full",
              // safe area 대응 느낌(아이폰 노치 등)
              "pt-4 pb-6",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
            // 패널 내부 클릭은 backdrop 닫힘 방지
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-4">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={`${base}logo.png`}
                    alt="로안생명공학연구소 로고"
                    className="h-9 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">
                      로안생명공학연구소
                    </div>
                    <div className="truncate text-[11px] text-white/60">
                      LoAn Bioengineering Research Institute
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 backdrop-blur-md transition hover:bg-white/10"
                  aria-label="메뉴 닫기"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 h-px w-full bg-white/10" />
            </div>

            {/* Drawer Nav */}
            <nav className="mt-3 flex flex-col gap-1 px-4 text-base text-white/90">
              <Link
                to="/"
                className="rounded-2xl px-3 py-3 hover:bg-white/10 active:bg-white/10"
                onClick={handleNavClick("/")}
              >
                홈
              </Link>
              <Link
                to="/about"
                className="rounded-2xl px-3 py-3 hover:bg-white/10 active:bg-white/10"
                onClick={handleNavClick("/about")}
              >
                연구소 소개
              </Link>
              <Link
                to="/team"
                className="rounded-2xl px-3 py-3 hover:bg-white/10 active:bg-white/10"
                onClick={handleNavClick("/team")}
              >
                연구진
              </Link>
              <Link
                to="/services"
                className="rounded-2xl px-3 py-3 hover:bg-white/10 active:bg-white/10"
                onClick={handleNavClick("/services")}
              >
                연구서비스
              </Link>
              <Link
                to="/contact"
                className="rounded-2xl px-3 py-3 hover:bg-white/10 active:bg-white/10"
                onClick={handleNavClick("/contact")}
              >
                문의하기
              </Link>

              <div className="mt-3 h-px w-full bg-white/10" />

              {/* Optional: 작은 안내/연락 */}
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/70">
                  연구 협업 및 문의는{" "}
                  <span className="text-white/90">문의하기</span>를 이용해주세요.
                </div>
              </div>

              {/* Safe bottom padding 느낌 */}
              <div className="h-6" />
            </nav>
          </aside>
        </div>
      </header>

      {/* ===== 본문 ===== */}
      <main
        ref={mainRef}
        className={[
          "relative mx-auto w-full max-w-7xl flex-1 min-h-0",
          "px-4 sm:px-6 lg:px-10",
          // ✅ Home: 한 화면 고정 + footer-safe padding
          // ✅ Drawer 열리면 main 스크롤 잠금
          isHome
            ? "pb-14 sm:pb-16 overflow-hidden"
            : mobileOpen
              ? "pb-12 sm:pb-16 overflow-hidden"
              : "pb-12 sm:pb-16 overflow-y-auto",
        ].join(" ")}
      >
        {/* ✅ routeNonce로 같은 탭 클릭 시에도 Outlet이 "다시" 그려지게 */}
        <div key={`${location.pathname}:${routeNonce}`} className="h-full">
          <Outlet />
        </div>

        {/* ✅ Scroll indicator: Home 제외 + 모바일 메뉴 열려있으면 제외 + 실제 스크롤 가능할 때만 */}
        {!isHome && !mobileOpen && showScrollHint && (
          <div
            className={[
              "pointer-events-none absolute left-0 right-0 bottom-3 z-20",
              "transition-all duration-500",
              hideScrollHint ? "opacity-0 translate-y-2" : "opacity-100",
            ].join(" ")}
            aria-hidden={hideScrollHint}
          >
            <div className="mx-auto w-fit rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[11px] text-white/75">
                <span className="inline-block animate-bounce">↓</span>
                <span>아래로 스크롤</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===== Footer: Home에서만 표시 + 자동 fade out + blur ===== */}
      {isHome && (
        <footer
          className={[
            "pointer-events-none absolute left-0 right-0 z-10",
            "bottom-1 sm:bottom-2",
            "transition-all duration-700",
            hideHomeCopyright ? "opacity-0 translate-y-2 blur-sm" : "opacity-100 blur-0",
          ].join(" ")}
          aria-hidden={hideHomeCopyright}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 text-center text-[11px] sm:text-xs text-white/40">
            © {new Date().getFullYear()} 로안생명공학연구소
          </div>
        </footer>
      )}
    </div>
  );
}