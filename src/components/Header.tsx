import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-4">
      {/* 로고 */}
      <Link to="/" className="text-xl font-bold">
        LoAn Bio Research
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:flex gap-6">
        <Link to="/about">연구소 소개</Link>
        <Link to="/team">연구진</Link>
        <Link to="/services">연구서비스</Link>
        <Link to="/contact">문의하기</Link>
      </nav>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="absolute top-16 right-4 flex flex-col gap-4 rounded-xl bg-slate-800 p-4 md:hidden">
          <Link to="/about" onClick={() => setOpen(false)}>연구소 소개</Link>
          <Link to="/team" onClick={() => setOpen(false)}>연구진</Link>
          <Link to="/services" onClick={() => setOpen(false)}>연구서비스</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>문의하기</Link>
        </div>
      )}
    </header>
  );
}