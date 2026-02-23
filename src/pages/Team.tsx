// src/pages/Team.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { teamMembers } from "../content/team";
import type { Person } from "../content/team";

/* ---------- Role Pill (✅ Role에만 컬러/강조) ---------- */
function RolePill({ role, active }: { role: string; active?: boolean }) {
  return (
    <div
      className={[
        "inline-flex items-center px-3 py-1 rounded-full",
        "text-[11px] uppercase tracking-[0.25em]",
        "border backdrop-blur-sm transition-colors",
        active
          ? "border-sky-300/40 bg-sky-400/15 text-sky-100"
          : "border-white/15 bg-white/5 text-white/70",
      ].join(" ")}
    >
      {role}
    </div>
  );
}

/* ---------- Reusable Blocks ---------- */

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="text-[11px] font-semibold tracking-wide text-sky-200">
        {title}
      </div>
      <div className="mt-3 text-[13px] text-white/85 leading-[1.65]">
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 leading-[1.65]">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-[3px] text-white/50">•</span>
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function TimelineList({
  items,
}: {
  items: { period?: string; text: string }[];
}) {
  return (
    <ul className="space-y-2 leading-[1.65] text-white/85">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-[3px] text-white/50">•</span>
          <span className="min-w-0">{it.text}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ---------- Glow Dot (active indicator) ---------- */
function GlowDot({ on }: { on: boolean }) {
  return (
    <span
      className={[
        "relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full",
        "transition-opacity duration-200",
        on ? "opacity-100" : "opacity-0",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-sky-300" />
      <span className="absolute -inset-2 rounded-full bg-sky-300/25 blur-md" />
    </span>
  );
}

/* ---------- Person Card (Mobile list item) ---------- */

function PersonCard({
  person,
  isActive,
  onClick,
}: {
  person: Person;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border transition-all duration-200",
        "bg-black/60 backdrop-blur-md",
        "p-4",
        // ✅ 클릭/활성 느낌 유지
        isActive
          ? "border-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_18px_45px_-25px_rgba(56,189,248,0.55)]"
          : "border-white/10 hover:bg-black/70",
      ].join(" ")}
    >
      {/* ✅ Role에만 컬러 */}
      <RolePill role={person.role} active={isActive} />

      {/* ✅ 이름은 색 넣지 않음 + active 불(점)만 */}
      <div className="mt-2 font-extrabold text-white leading-snug">
        <div className="flex items-center gap-2">
          <span className="block text-[16px]">{person.nameKo}</span>
          <GlowDot on={isActive} />
        </div>

        {/* ✅ 영문 이름: 길어도 2줄까지, truncate 금지 */}
        {person.nameEn && (
          <div className="mt-0.5 text-[12px] text-white/60 leading-snug line-clamp-2 break-words">
            {person.nameEn}
          </div>
        )}
      </div>

      {/* ✅ 직책: 1줄로 잘리지 않게 line-clamp 완화 */}
      <div className="mt-1 text-[13px] text-white/75 leading-[1.6] line-clamp-3 break-words">
        {person.titleLine}
      </div>
    </button>
  );
}

/* ---------- Mobile Disclosure (핵심 + 더보기) ---------- */

function MobileDisclosure({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false);

  const hasExtra =
    person.awards?.length ||
    person.scholarships?.length ||
    person.professionalEditorialService?.length ||
    person.professionalMemberships?.length ||
    person.presentations?.length ||
    person.editorials?.length ||
    person.technicalSkills?.length ||
    person.grants?.length;

  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
      <div className="grid gap-3">
        {person.education?.length && (
          <SectionBlock title="학력">
            <TimelineList items={person.education} />
          </SectionBlock>
        )}

        {person.experience?.length && (
          <SectionBlock title="경력">
            <TimelineList items={person.experience} />
          </SectionBlock>
        )}

        {person.interests?.length && (
          <SectionBlock title="연구 분야">
            <TagList items={person.interests} />
          </SectionBlock>
        )}

        {person.publications?.length && (
          <SectionBlock title="주요 논문">
            <BulletList items={person.publications.map((x) => x.text)} />
          </SectionBlock>
        )}

        {hasExtra && (
          <>
            {!expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="mt-2 text-sm text-sky-300 hover:text-sky-200"
              >
                + 더보기
              </button>
            )}

            {expanded && (
              <div className="grid gap-3 mt-2">
                {person.grants?.length && (
                  <SectionBlock title="연구비 수주">
                    <BulletList items={person.grants.map((x) => x.text)} />
                  </SectionBlock>
                )}

                {person.awards?.length && (
                  <SectionBlock title="수상 실적">
                    <BulletList items={person.awards.map((x) => x.text)} />
                  </SectionBlock>
                )}

                {person.scholarships?.length && (
                  <SectionBlock title="장학금">
                    <BulletList items={person.scholarships.map((x) => x.text)} />
                  </SectionBlock>
                )}

                {person.professionalEditorialService?.length && (
                  <SectionBlock title="Professional Editorial Service">
                    <BulletList
                      items={person.professionalEditorialService.map((x) => x.text)}
                    />
                  </SectionBlock>
                )}

                {person.professionalMemberships?.length && (
                  <SectionBlock title="Professional Memberships">
                    <BulletList
                      items={person.professionalMemberships.map((x) => x.text)}
                    />
                  </SectionBlock>
                )}

                {person.presentations?.length && (
                  <SectionBlock title="Presentations">
                    <BulletList items={person.presentations.map((x) => x.text)} />
                  </SectionBlock>
                )}

                {person.editorials?.length && (
                  <SectionBlock title="Editorial / Membership">
                    <BulletList items={person.editorials.map((x) => x.text)} />
                  </SectionBlock>
                )}

                {person.technicalSkills?.length && (
                  <SectionBlock title="Technical Skills">
                    <BulletList items={person.technicalSkills.map((x) => x.text)} />
                  </SectionBlock>
                )}

                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-sm text-white/60 hover:text-white"
                >
                  접기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Desktop Detail Panel ---------- */

function DesktopDetail({ person }: { person: Person }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* ✅ Role만 강조 */}
          <RolePill role={person.role} active />

          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white leading-tight">
              {person.nameKo}
            </div>

            {/* ✅ 영문 이름 2줄까지 */}
            {person.nameEn && (
              <div className="mt-1 text-sm text-white/60 leading-snug line-clamp-2 break-words">
                {person.nameEn}
              </div>
            )}

            <div className="mt-3 text-[14px] text-white/80 leading-relaxed break-words">
              {person.titleLine}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {person.education?.length && (
          <SectionBlock title="학력">
            <TimelineList items={person.education} />
          </SectionBlock>
        )}

        {person.experience?.length && (
          <SectionBlock title="경력">
            <TimelineList items={person.experience} />
          </SectionBlock>
        )}

        {person.interests?.length && (
          <SectionBlock title="연구 분야">
            <TagList items={person.interests} />
          </SectionBlock>
        )}

        {person.publications?.length && (
          <SectionBlock title="주요 논문">
            <BulletList items={person.publications.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.grants?.length && (
          <SectionBlock title="연구비 수주">
            <BulletList items={person.grants.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.awards?.length && (
          <SectionBlock title="수상 실적">
            <BulletList items={person.awards.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.scholarships?.length && (
          <SectionBlock title="장학금">
            <BulletList items={person.scholarships.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.professionalEditorialService?.length && (
          <SectionBlock title="Professional Editorial Service">
            <BulletList
              items={person.professionalEditorialService.map((x) => x.text)}
            />
          </SectionBlock>
        )}

        {person.professionalMemberships?.length && (
          <SectionBlock title="Professional Memberships">
            <BulletList
              items={person.professionalMemberships.map((x) => x.text)}
            />
          </SectionBlock>
        )}

        {person.presentations?.length && (
          <SectionBlock title="Presentations">
            <BulletList items={person.presentations.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.editorials?.length && (
          <SectionBlock title="Editorial / Membership">
            <BulletList items={person.editorials.map((x) => x.text)} />
          </SectionBlock>
        )}

        {person.technicalSkills?.length && (
          <SectionBlock title="Technical Skills">
            <BulletList items={person.technicalSkills.map((x) => x.text)} />
          </SectionBlock>
        )}
      </div>
    </div>
  );
}

/* ---------- Main ---------- */

export default function Team() {
  const defaultId = teamMembers[0]?.id ?? "";
  const [activeId, setActiveId] = useState<string>(defaultId);

  // ✅ 모바일에서 클릭한 카드가 화면 위쪽으로 오도록 (Layout main에서도 잘 먹히게 scrollIntoView 사용)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activePerson = useMemo(
    () => teamMembers.find((p) => p.id === activeId) ?? teamMembers[0],
    [activeId]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Desktop(lg+)에서는 스크롤 조정하지 않음
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) return;

    if (!activeId) return;

    const target = itemRefs.current[activeId];
    if (!target) return;

    // ✅ 헤더/여백 고려: scroll-margin-top을 주고 start로 이동
    // (Tailwind: scroll-mt-* 클래스가 실제로 margin-top처럼 offset 역할)
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      target.scrollIntoView();
    }
  }, [activeId]);

  return (
    <div className="py-6">
      <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md">
        <div>
          <div className="text-[11px] tracking-[0.3em] text-sky-300">TEAM</div>
          <h1 className="mt-2 font-extrabold text-[22px] sm:text-[28px] lg:text-[40px] leading-tight tracking-[-0.02em]">
            연구진 소개
          </h1>
          <p className="mt-3 text-[13px] text-white/75 leading-[1.65]">
            한의학과 생명과학 기반 연구를 연결하는 융합형 연구진과 임상 전문가가
            함께합니다.
          </p>
        </div>

        {/* ===== Mobile: 아코디언 ===== */}
        <div className="mt-6 space-y-4 lg:hidden">
          {teamMembers.map((p) => {
            const open = p.id === activeId;

            return (
              <div
                key={p.id}
                ref={(el) => {
                  itemRefs.current[p.id] = el;
                }}
                // ✅ scrollIntoView 시 상단이 너무 딱 붙지 않게 offset 역할
                className="scroll-mt-4"
              >
                <PersonCard
                  person={p}
                  isActive={open}
                  onClick={() => setActiveId(open ? "" : p.id)}
                />
                {open && <MobileDisclosure person={p} />}
              </div>
            );
          })}
        </div>

        {/* ===== Desktop: 좌측 리스트 + 우측 상세 ===== */}
        <div className="mt-6 hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left List */}
          <div className="lg:col-span-5 xl:col-span-3">
            <div className="space-y-3">
              {teamMembers.map((p) => {
                const active = p.id === activeId;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    className={[
                      "group w-full text-left rounded-2xl border p-4 transition-all duration-200",
                      "bg-black/35 backdrop-blur-md",
                      active
                        ? "border-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_18px_45px_-25px_rgba(56,189,248,0.55)]"
                        : "border-white/10 hover:bg-black/45",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {/* ✅ 이름은 그냥 흰색(색 X) + active dot */}
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-extrabold text-white">
                            {p.nameKo}
                          </span>

                          <span
                            className={[
                              "relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full",
                              "transition-opacity duration-200",
                              active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                            ].join(" ")}
                            aria-hidden="true"
                          >
                            <span className="absolute inset-0 rounded-full bg-sky-300" />
                            <span className="absolute -inset-2 rounded-full bg-sky-300/25 blur-md" />
                          </span>
                        </div>

                        {/* ✅ 영문 이름 2줄 */}
                        {p.nameEn && (
                          <div className="mt-1 text-[11px] text-white/55 leading-snug line-clamp-2 break-words">
                            {p.nameEn}
                          </div>
                        )}

                        {/* ✅ 직책 4줄 */}
                        <div
                          className="
                            mt-2
                            text-[11px] text-white/70 leading-[1.55]
                            line-clamp-6
                            whitespace-normal
                            break-words
                            [overflow-wrap:anywhere]
                          "
                        >
                          {p.titleLine}
                        </div>
                      </div>

                      {/* ✅ RolePill만 컬러 */}
                      <div className="shrink-0">
                        <RolePill role={p.role} active={active} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail */}
          <div className="lg:col-span-8 xl:col-span-9">
            {activePerson ? (
              <DesktopDetail person={activePerson} />
            ) : (
              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-md">
                <div className="text-white/70 text-sm">
                  연구진을 선택하면 상세 정보가 표시됩니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}