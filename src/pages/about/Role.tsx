// src/pages/about/Role.tsx
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
};

function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70 backdrop-blur-sm">
      {children}
    </span>
  );
}

type RoleCardProps = {
  index: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

function RoleCard({ index, title, subtitle, bullets }: RoleCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md p-6 transition hover:bg-white/[0.06]">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/6 backdrop-blur-sm grid place-items-center">
            <span className="text-[13px] font-extrabold text-sky-200">
              {index}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-[11px] tracking-[0.22em] text-sky-300">
            RESEARCH AREA
          </div>
          <h3 className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
            {title}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {bullets.map((b, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
          >
            <div className="text-[13px] sm:text-[14px] text-white/85 leading-relaxed">
              {b}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ✅ 카드 내부 탭: 개요/역할
 * - useLocation()을 쓰지 않고 pathname을 props로만 받는 "순수 컴포넌트"
 * - Hook 오류(라우터 컨텍스트/호출 위치) 완전 방지
 */
function InlineAboutTabs({
  pathname,
  compact = false,
}: {
  pathname: string;
  compact?: boolean;
}) {
  const isOverview = pathname === "/about";
  const isRole = pathname === "/about/role";

  const wrap = compact
    ? "inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm"
    : "inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm";

  const btnBase =
    "rounded-xl px-3 py-2 text-[13px] font-semibold transition";

  const active = "bg-white/12 text-white";
  const inactive = "text-white/70 hover:text-white hover:bg-white/10";

  return (
    <div className={wrap} aria-label="연구소 소개 탭">
      <Link to="/about" className={`${btnBase} ${isOverview ? active : inactive}`}>
        개요
      </Link>
      <Link to="/about/role" className={`${btnBase} ${isRole ? active : inactive}`}>
        역할
      </Link>
    </div>
  );
}

export default function Role() {
  // ✅ Hook은 여기서만 1회 호출
  const location = useLocation();

  const card = "rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md";
  const padM = "p-5";
  const padD = "p-8";

  const mission =
    "한의학 치료 표준화 및 치료 효과의 과학적 검증을 위한 제반 연구과제 수행";

  const areas: RoleCardProps[] = [
    {
      index: "01",
      title: "한의의료서비스연구",
      subtitle:
        "진료 현장의 흐름을 구조화하고, 성과를 측정 가능한 지표로 정의하여 임상-연구-디지털 연계를 강화합니다.",
      bullets: [
        "진료 프로세스 표준화·모델링",
        "진료 성과지표·평가지표 개발",
        "디지털 헬스·스마트 한의진료 연계 연구",
      ],
    },
    {
      index: "02",
      title: "한의소재개발연구",
      subtitle:
        "질환별 후보를 발굴하고 표준화·제형화까지 연결해, 재현 가능한 근거 기반 소재 파이프라인을 구축합니다.",
      bullets: [
        "질환별 한약재·복합처방 후보 발굴",
        "추출·제형·표준화",
        "오믹스 기반 기전 확장 연구",
      ],
    },
    {
      index: "03",
      title: "한의약안전성연구",
      subtitle:
        "세포 수준의 독성 및 기전 검증을 통해 안전성 근거를 확립하고, 임상 적용 가능성을 높입니다.",
      bullets: ["세포독성평가", "기전 탐색 및 안전성 확립 연구"],
    },
  ];

  return (
    <div className="py-6 sm:py-12">
      {/* ===========================
          MOBILE LAYOUT (< lg)
          =========================== */}
      <div className="block lg:hidden">
        {/* HERO (Mobile) */}
        <section className="grid gap-5">
          <div className={`${card} ${padM} bg-black/30`}>
            {/* 상단 라벨 + 탭 */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] tracking-[0.28em] text-sky-300">
                ABOUT
              </div>
              <InlineAboutTabs pathname={location.pathname} compact />
            </div>

            <h1 className="mt-3 font-extrabold text-[22px] sm:text-[26px] leading-[1.18] tracking-[-0.01em] text-white">
              연구소 역할 및 연구 분야
            </h1>

            <p className="mt-3 text-white/80 text-[13px] leading-[1.75]">
              본 연구소는 임상 현장에서 축적되는 치료 경험을 표준화하고, 과학적 근거로
              확장하기 위한 연구를 수행합니다.
            </p>

            {/* Mission */}
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-[11px] tracking-[0.22em] text-sky-300">
                MISSION
              </div>
              <div className="mt-2 text-[14px] font-semibold text-white leading-snug">
                {mission}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>표준화</Pill>
                <Pill>과학적 검증</Pill>
                <Pill>임상-연구 연결</Pill>
                <Pill>디지털 확장</Pill>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas (Mobile) */}
        <section className="mt-10 grid gap-4">
          {areas.map((a) => (
            <RoleCard
              key={a.index}
              index={a.index}
              title={a.title}
              subtitle={a.subtitle}
              bullets={a.bullets}
            />
          ))}
        </section>

        {/* Closing CTA (Mobile) */}
        <section className="mt-10">
          <div className={`${card} ${padM}`}>
            <div className="text-[11px] tracking-[0.22em] text-sky-300">
              COLLABORATION
            </div>
            <h2 className="mt-2 text-[18px] font-semibold text-white leading-tight">
              협업 및 연구 의뢰
            </h2>
            <p className="mt-2 text-white/70 text-[13px] leading-[1.7]">
              서비스 연구/소재 개발/안전성 검증 등 분야별 맞춤 협업이 가능합니다.
              자세한 논의는 문의하기에서 남겨주세요.
            </p>

            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-white/15 transition"
              >
                문의하기로 이동
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ===========================
          DESKTOP / WEB LAYOUT (>= lg)
          =========================== */}
      <div className="hidden lg:block">
        {/* HERO (Desktop) */}
        <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Main card */}
          <div className="lg:col-span-7">
            <div className={`${card} ${padD} bg-black/30 min-h-[520px]` }>
              {/* 상단 라벨 + 탭 */}
              <div className="flex items-center justify-between gap-4">
                <div className="text-[11px] tracking-[0.28em] text-sky-300">
                  ABOUT
                </div>
                <InlineAboutTabs pathname={location.pathname} />
              </div>

              <h1
                className="
                  mt-3 font-extrabold text-white leading-[1.12] tracking-[-0.015em]
                  text-[clamp(25px,2.4vw,38px)] max-w-[26ch]
                "
              >
                연구소 역할 및 연구 분야
              </h1>

              <p className="mt-5 text-white/80 text-[15px] leading-relaxed max-w-[78ch]">
                임상 현장의 치료 경험을 재현 가능하도록 표준화하고, 객관적 지표와
                분자·<br/>오믹스 기반 근거로 치료 효과를 검증하여 임상 적용 가능성을
                높입니다.
              </p>

              {/* Mission block */}
              <div className="mt-13 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs tracking-[0.22em] text-sky-300">
                      MISSION
                    </div>
                    <div className="mt-2 text-[18px] font-semibold text-white leading-snug">
                      {mission}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill>표준화</Pill>
                      <Pill>과학적 검증</Pill>
                      <Pill>임상-연구 연결</Pill>
                      <Pill>디지털 확장</Pill>
                    </div>
                  </div>

                  <div className="hidden xl:block shrink-0">
                    <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm px-5 py-4">
                      <div className="text-[11px] tracking-[0.22em] text-white/60">
                        KEY OUTPUT
                      </div>
                      <div className="mt-2 space-y-1 text-[13px] text-white/80">
                        <div>• 진료 표준 프로토콜</div>
                        <div>• 성과/평가 지표 체계</div>
                        <div>• 후보 소재 &amp; 표준화</div>
                        <div>• 안전성 근거 확립</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6" />
            </div>
          </div>

            {/* Right: Quick summary (rebalanced) */}
{/* Right: Quick summary cards (same structure, size tuned) */}
<div className="lg:col-span-5">
  <div className="flex h-full flex-col gap-4">
    {/* FOCUS */}
    <div className="flex-1 min-h-[160px] rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md p-7">
      <div className="text-[11px] tracking-[0.22em] text-sky-300">FOCUS</div>
      <h3 className="mt-2 text-[18px] font-semibold text-white">
        임상 기반 근거 확장
      </h3>
      <p className="mt-2 text-white/70 text-[14px] leading-relaxed">
        진료 프로세스와 성과를 데이터화하고, 연구 설계/평가 지표를 구축하여
        임상 근거를 확장합니다.
      </p>
    </div>

    {/* PIPELINE */}
    <div className="flex-1 min-h-[160px] rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md p-7">
      <div className="text-[11px] tracking-[0.22em] text-sky-300">PIPELINE</div>
      <h3 className="mt-2 text-[18px] font-semibold text-white">
        소재 → 기전 → 안전성
      </h3>
      <p className="mt-2 text-white/70 text-[14px] leading-relaxed">
        후보 발굴부터 추출·제형·표준화, 오믹스 기반 기전 확장 및 안전성
        검증까지 전주기 연구를 수행합니다.
      </p>
    </div>

    {/* COLLAB */}
    <div className="flex-1 min-h-[160px] rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md p-7">
      <div className="text-[11px] tracking-[0.22em] text-sky-300">COLLAB</div>
      <h3 className="mt-2 text-[18px] font-semibold text-white">
        맞춤형 협업
      </h3>
      <p className="mt-2 text-white/70 text-[14px] leading-relaxed">
        프로젝트 목표에 맞춰 설계·실험·분석·보고서까지 단계별 협업을
        지원합니다.
      </p>


    </div>
  </div>
</div>
        </section>

        {/* Research Areas (Desktop) */}
        <section className="mt-16">
          <div className="text-center">
            <div className="text-xs tracking-[0.22em] text-sky-300">
              RESEARCH AREAS
            </div>
            <h2 className="mt-2 text-4xl font-extrabold text-white">
              세부 연구 분야
            </h2>
            <p className="mt-2 text-white/60 text-sm">
              임상-연구-표준화-안전성의 연결을 중심으로 연구를 수행합니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {areas.map((a) => (
              <RoleCard
                key={a.index}
                index={a.index}
                title={a.title}
                subtitle={a.subtitle}
                bullets={a.bullets}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}