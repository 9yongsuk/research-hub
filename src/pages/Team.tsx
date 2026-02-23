// src/pages/Team.tsx
import { useState } from "react";
import { teamMembers } from "../content/team";
import type { Person } from "../content/team";

/* ---------- Tone-down Role Pill ---------- */
function RolePill({ role }: { role: string }) {
  return (
    <div
      className="
        inline-flex items-center px-3 py-1 rounded-full
        text-[11px] uppercase tracking-[0.25em]
        border border-white/15
        bg-white/5
        text-white/70
      "
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

/* ---------- Person Card ---------- */

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
        isActive
          ? "border-sky-400 shadow-xl"
          : "border-white/10 hover:bg-black/70",
      ].join(" ")}
    >
      <RolePill role={person.role} />

      <div className="mt-2 font-extrabold text-white leading-snug">
        {/* 모바일: 영문은 항상 아래 작은 글씨 */}
        <span className="block text-[16px]">{person.nameKo}</span>
        {person.nameEn && (
          <span className="block text-[12px] text-white/60 mt-0.5">
            {person.nameEn}
          </span>
        )}
      </div>

      <div className="mt-1 text-[13px] text-white/75 leading-[1.6]">
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
        {/* 핵심 섹션만 기본 노출 */}
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

        {/* 더보기 영역 */}
        {hasExtra && (
          <>
            {!expanded && (
              <button
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
                      items={person.professionalEditorialService.map(
                        (x) => x.text
                      )}
                    />
                  </SectionBlock>
                )}

                {person.professionalMemberships?.length && (
                  <SectionBlock title="Professional Memberships">
                    <BulletList
                      items={person.professionalMemberships.map(
                        (x) => x.text
                      )}
                    />
                  </SectionBlock>
                )}

                {person.presentations?.length && (
                  <SectionBlock title="Presentations">
                    <BulletList
                      items={person.presentations.map((x) => x.text)}
                    />
                  </SectionBlock>
                )}

                {person.editorials?.length && (
                  <SectionBlock title="Editorial / Membership">
                    <BulletList
                      items={person.editorials.map((x) => x.text)}
                    />
                  </SectionBlock>
                )}

                {person.technicalSkills?.length && (
                  <SectionBlock title="Technical Skills">
                    <BulletList
                      items={person.technicalSkills.map((x) => x.text)}
                    />
                  </SectionBlock>
                )}

                <button
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

/* ---------- Main ---------- */

export default function Team() {
  const [activeId, setActiveId] = useState<string>("");

  return (
    <div className="py-6">
      <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-md">
        <div>
          <div className="text-[11px] tracking-[0.3em] text-sky-300">
            TEAM
          </div>
          <h1 className="mt-2 font-extrabold text-[clamp(22px,6vw,30px)]">
            연구진 소개
          </h1>
          <p className="mt-3 text-[13px] text-white/75 leading-[1.65]">
            한의학과 생명과학 기반 연구를 연결하는 융합형 연구진과
            임상 전문가가 함께합니다.
          </p>
        </div>

        {/* 모바일: 순서대로 아코디언 */}
        <div className="mt-6 space-y-4 lg:hidden">
          {teamMembers.map((p) => {
            const open = p.id === activeId;
            return (
              <div key={p.id}>
                <PersonCard
                  person={p}
                  isActive={open}
                  onClick={() =>
                    setActiveId(open ? "" : p.id)
                  }
                />
                {open && <MobileDisclosure person={p} />}
              </div>
            );
          })}
        </div>

        {/* 데스크탑은 기존 패턴 유지 가능 */}
      </div>
    </div>
  );
}