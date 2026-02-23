import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6">
      {/* 로고 */}
      <Link to="/" className="text-base sm:text-xl font-bold">
        LoAn Bio Research
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:flex gap-6 text-sm text-white/80">
        <Link className="hover:text-white" to="/about">연구소 소개</Link>
        <Link className="hover:text-white" to="/team">연구진</Link>
        <Link className="hover:text-white" to="/services">연구서비스</Link>
        <Link className="hover:text-white" to="/contact">문의하기</Link>
      </nav>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="메뉴 열기"
        type="button"
      >
        ☰
      </button>

      {/* ✅ 모바일 메뉴 오버레이 (밖 클릭 닫기) */}
      {open && (
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* 모바일 메뉴 */}
      {open && (
        <div
          className="
            md:hidden
            absolute right-4 sm:right-6
            top-14 sm:top-16
            z-50
            flex flex-col gap-3
            min-w-[180px]
            rounded-2xl
            border border-white/10
            bg-slate-900/90
            backdrop-blur-xl
            p-4
            shadow-[0_20px_60px_rgba(0,0,0,0.55)]
          "
        >
          <Link className="text-sm text-white/85 hover:text-white" to="/about" onClick={() => setOpen(false)}>연구소 소개</Link>
          <Link className="text-sm text-white/85 hover:text-white" to="/team" onClick={() => setOpen(false)}>연구진</Link>
          <Link className="text-sm text-white/85 hover:text-white" to="/services" onClick={() => setOpen(false)}>연구서비스</Link>
          <Link className="text-sm text-white/85 hover:text-white" to="/contact" onClick={() => setOpen(false)}>문의하기</Link>
        </div>
      )}
    </header>
  );
}