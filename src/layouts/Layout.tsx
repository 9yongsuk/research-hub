// src/layouts/Layout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

export function Layout() {
  const base = import.meta.env.BASE_URL;

  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // ✅ 데스크탑: 연구소 소개 드롭다운 상태 + 클릭 직후 잠깐 재오픈 방지(lock)
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [aboutHoverLock, setAboutHoverLock] = useState(false);

  // ✅ 모바일: 연구소 소개 하위 메뉴 펼침/접힘
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

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

  // ✅ 현재 About 섹션 활성화 판단 (개요/역할 모두)
  const isAboutSection = useMemo(() => {
    return (
      location.pathname === "/about" || location.pathname.startsWith("/about/")
    );
  }, [location.pathname]);

  // ✅ 모바일 여부 + 모바일에서 "처음은 사진 → 비디오 준비되면 전환"
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // 모바일에서는 라우트/상태 변동 때도 체감 좋게 videoReady 리셋 (원치 않으면 제거해도 됨)
  useEffect(() => {
    if (isMobile) setVideoReady(false);
  }, [isMobile, location.pathname]);

  // 라우트 변경 시 드롭다운 닫기 + lock 해제 + 모바일 메뉴 닫기 + 모바일 about subnav도 닫기
  useEffect(() => {
    setAboutMenuOpen(false);
    setAboutHoverLock(false);
    setMobileOpen(false);
    setMobileAboutOpen(false);
  }, [location.pathname]);

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

  // ✅ Drawer가 열려 있을 때, 배경 스크롤/터치 스크롤 감각까지 더 확실히 잠금
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
      {/* 1) 항상 깔아두는 배경 이미지 */}
      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${base}hero-bg.jpg)` }}
      />

      {/* 2) 모바일에서 "처음엔 사진 → 비디오 준비되면 페이드 아웃" */}
      {isMobile && (
        <img
          src={`${base}hero-bg.jpg`}
          alt=""
          aria-hidden="true"
          className={[
            "pointer-events-none fixed inset-0 -z-25 h-full w-full object-cover",
            "transition-opacity duration-500",
            videoReady ? "opacity-0" : "opacity-100",
          ].join(" ")}
          decoding="async"
          loading="eager"
        />
      )}

      {/* 3) 비디오 레이어 (모바일은 준비될 때까지 투명) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${base}hero-bg.jpg`}
        className={[
          "pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover",
          "transition-opacity duration-500",
          isMobile ? (videoReady ? "opacity-100" : "opacity-0") : "opacity-100",
        ].join(" ")}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
      >
        <source src={`${base}hero-bg.mp4`} type="video/mp4" />
      </video>

      {/* 오버레이 */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/55" />

      {/* ===== 공통 헤더 ===== */}
      <header className="relative w-full shrink-0">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-4 lg:px-10">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => {
              setMobileOpen(false);
              setMobileAboutOpen(false);
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

          {/* ===================== 데스크탑 메뉴 ===================== */}
          <nav className="hidden gap-8 text-base lg:text-[17px] text-white/80 md:flex">
            <Link
              to="/"
              className="hover:text-white"
              onClick={handleNavClick("/")}
            >
              홈
            </Link>

            {/* ✅ 연구소 소개: hover로 열림 + 클릭하면 닫히고 잠깐 재오픈 방지 */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (aboutHoverLock) return;
                setAboutMenuOpen(true);
              }}
              onMouseLeave={() => {
                setAboutMenuOpen(false);
              }}
            >
              <Link
                to="/about"
                className={[
                  "hover:text-white inline-flex items-center gap-1",
                  isAboutSection ? "text-white" : "",
                ].join(" ")}
                onClick={(e) => {
                  handleNavClick("/about")(e);

                  setAboutMenuOpen(false);
                  setAboutHoverLock(true);
                  window.setTimeout(() => setAboutHoverLock(false), 350);
                }}
                aria-haspopup="menu"
                aria-expanded={aboutMenuOpen}
              >
                연구소 소개
                <span className="text-[12px] opacity-80">▾</span>
              </Link>

              {/* ✅ hover 이동할 때 끊김 방지용 bridge */}
              <div className="absolute left-0 top-full h-3 w-[180px]" />

              {/* Dropdown panel */}
              <div
                className={[
                  "absolute left-0 top-full mt-3 w-[180px] rounded-2xl border border-white/10",
                  "bg-black/75 backdrop-blur-md shadow-2xl",
                  "z-[999]",
                  "transition-all duration-150",
                  aboutMenuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none",
                ].join(" ")}
                role="menu"
              >
                <div className="p-2">
                  <Link
                    to="/about"
                    className={[
                      "block rounded-xl px-3 py-2 text-[14px] text-white/85 hover:bg-white/10 hover:text-white",
                      location.pathname === "/about"
                        ? "bg-white/10 text-white"
                        : "",
                    ].join(" ")}
                    onClick={(e) => {
                      handleNavClick("/about")(e);
                      setAboutMenuOpen(false);
                      setAboutHoverLock(true);
                      window.setTimeout(() => setAboutHoverLock(false), 350);
                    }}
                    role="menuitem"
                  >
                    개요
                  </Link>

                  <Link
                    to="/about/role"
                    className={[
                      "mt-1 block rounded-xl px-3 py-2 text-[14px] text-white/85 hover:bg-white/10 hover:text-white",
                      location.pathname === "/about/role"
                        ? "bg-white/10 text-white"
                        : "",
                    ].join(" ")}
                    onClick={(e) => {
                      handleNavClick("/about/role")(e);
                      setAboutMenuOpen(false);
                      setAboutHoverLock(true);
                      window.setTimeout(() => setAboutHoverLock(false), 350);
                    }}
                    role="menuitem"
                  >
                    역할
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/team"
              className="hover:text-white"
              onClick={handleNavClick("/team")}
            >
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

          {/* ===================== 모바일 햄버거 버튼 ===================== */}
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

        {/* ===================== Mobile Drawer ===================== */}
        <div
          className={[
            "md:hidden",
            "fixed inset-0 z-50",
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
            onClick={() => {
              setMobileOpen(false);
              setMobileAboutOpen(false);
            }}
          />

          {/* Panel */}
          <aside
            className={[
              "absolute right-0 top-0 h-full w-[86%] max-w-[360px]",
              "border-l border-white/10 bg-black/70 backdrop-blur-md shadow-2xl",
              "transition-transform duration-250 ease-out",
              mobileOpen ? "translate-x-0" : "translate-x-full",
              "pt-4 pb-6",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
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
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileAboutOpen(false);
                  }}
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

              {/* ✅ 모바일: 연구소 소개 펼치기 */}
              <button
                type="button"
                className={[
                  "rounded-2xl px-3 py-3 text-left",
                  "hover:bg-white/10 active:bg-white/10",
                  "flex items-center justify-between",
                  isAboutSection ? "bg-white/5" : "",
                ].join(" ")}
                aria-expanded={mobileAboutOpen}
                onClick={() => setMobileAboutOpen((v) => !v)}
              >
                <span>연구소 소개</span>
                <span className="text-sm text-white/70">
                  {mobileAboutOpen ? "▴" : "▾"}
                </span>
              </button>

              {/* ✅ 펼쳐진 하위 링크: 개요 / 역할 */}
              <div
                className={[
                  "overflow-hidden transition-all duration-200",
                  mobileAboutOpen
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <div className="mt-1 ml-2 flex flex-col gap-1 border-l border-white/10 pl-3">
                  <Link
                    to="/about"
                    className={[
                      "rounded-2xl px-3 py-2 text-[15px] text-white/85 hover:bg-white/10 active:bg-white/10",
                      location.pathname === "/about"
                        ? "bg-white/10 text-white"
                        : "",
                    ].join(" ")}
                    onClick={handleNavClick("/about")}
                  >
                    개요
                  </Link>
                  <Link
                    to="/about/role"
                    className={[
                      "rounded-2xl px-3 py-2 text-[15px] text-white/85 hover:bg-white/10 active:bg-white/10",
                      location.pathname === "/about/role"
                        ? "bg-white/10 text-white"
                        : "",
                    ].join(" ")}
                    onClick={handleNavClick("/about/role")}
                  >
                    역할
                  </Link>
                </div>
              </div>

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

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/70">
                  연구 협업 및 문의는{" "}
                  <span className="text-white/90">문의하기</span>를 이용해주세요.
                </div>
              </div>

              <div className="h-6" />
            </nav>
          </aside>
        </div>
      </header>

      {/* ===== 본문 ===== */}
      <main
        ref={mainRef}
        className={[
          "relative mx-auto w-full max-w-7xl flex-1 min-h-0 no-scrollbar",
          "px-4 sm:px-6 lg:px-10",
          isHome
            ? "pb-14 sm:pb-16 overflow-hidden"
            : mobileOpen
              ? "pb-12 sm:pb-16 overflow-hidden"
              : "pb-12 sm:pb-16 overflow-y-auto",
        ].join(" ")}
      >
        <div key={`${location.pathname}:${routeNonce}`} className="h-full">
          <Outlet />
        </div>

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
            hideHomeCopyright
              ? "opacity-0 translate-y-2 blur-sm"
              : "opacity-100 blur-0",
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