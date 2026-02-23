// src/layouts/Layout.tsx
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/about", label: "연구소 소개" },
      { to: "/team", label: "연구진" },
      { to: "/services", label: "연구서비스" },
      { to: "/contact", label: "문의하기" },
    ],
    []
  );

  // ✅ Home일 때만 상단 여백 제거
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-dvh w-full">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)] bg-white/10" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40">
        <div className="backdrop-blur-md bg-black/35 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-14 sm:h-16 flex items-center justify-between gap-3">
              <NavLink to="/" className="flex items-center gap-2 min-w-0" aria-label="Go to Home">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                  <span className="text-white font-extrabold text-sm">L</span>
                </span>

                <div className="min-w-0">
                  <div className="truncate text-white font-semibold leading-tight text-[13px] sm:text-sm">
                    로안생명공학연구소
                  </div>
                  <div className="truncate text-white/60 text-[11px] sm:text-xs">
                    Translational Bio-AI R&amp;D
                  </div>
                </div>
              </NavLink>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 rounded-xl text-sm font-semibold transition",
                        "text-white/75 hover:text-white hover:bg-white/10",
                        isActive && "text-white bg-white/15 border border-white/15"
                      )
                    }
                    end={item.to === "/"}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                className={cn(
                  "md:hidden inline-flex items-center justify-center",
                  "h-10 w-10 rounded-xl",
                  "bg-white/10 hover:bg-white/15 border border-white/15",
                  "text-white transition"
                )}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden">
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/55"
              aria-label="Close menu overlay"
              onClick={() => setMenuOpen(false)}
            />
            <div className="fixed top-14 left-0 right-0 z-50">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-white/12 bg-black/75 backdrop-blur-md shadow-xl overflow-hidden">
                  <div className="p-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center justify-between",
                            "px-4 py-3 rounded-xl text-[15px] font-semibold transition",
                            "text-white/80 hover:text-white hover:bg-white/10",
                            isActive && "text-white bg-white/15 border border-white/15"
                          )
                        }
                        end={item.to === "/"}
                      >
                        <span>{item.label}</span>
                        <span className="text-white/40">›</span>
                      </NavLink>
                    ))}
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-white/10">
                    <div className="text-white/55 text-xs leading-relaxed">
                      CRO 협업 · 정부과제 · 데이터 기반 검증
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ✅ Main: 헤더 높이를 CSS 변수로 제공 + Home만 pt 제거 */}
      <main
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        style={
          {
            // 헤더: 모바일 56px(h-14), sm 이상 64px(h-16)
            "--header-h": "56px",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            // Home은 hero가 자체적으로 정렬/높이를 먹으므로 pt를 0
            isHome ? "pt-0" : "pt-6 sm:pt-10",
            "pb-10 sm:pb-14"
          )}
        >
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-white/55 text-xs">
              © {new Date().getFullYear()} LoAn Bioengineering Research Institute
            </div>
            <div className="text-white/45 text-xs">Daejeon · Korea</div>
          </div>
        </div>
      </footer>
    </div>
  );
}