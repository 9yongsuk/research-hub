// src/pages/Team.tsx
import { useMemo, useState } from "react";
import { teamMembers } from "../content/team";
import type { Person } from "../content/team";

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-sm">
      <div className="text-xs sm:text-sm font-semibold tracking-wide text-sky-200">
        {title}
      </div>
      <div className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 leading-relaxed">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-[2px] text-white/50">•</span>
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
    <ul className="space-y-2 leading-relaxed text-white/85">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-[2px] text-white/50">•</span>
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
          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs sm:text-sm text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const roleStyle: Record<string, string> = {
  연구소장: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  대표원장: "bg-blue-500/10 border-blue-400/30 text-blue-300",
  원장: "bg-blue-500/10 border-blue-400/30 text-blue-300",
  Collaborator: "bg-indigo-500/10 border-indigo-400/30 text-indigo-300",
};

function RolePill({ role }: { role: string }) {
  return (
    <div
      className={[
        "inline-flex items-center px-3 py-1 rounded-full",
        "text-[11px] uppercase tracking-[0.25em] border",
        roleStyle[role] ?? "bg-white/5 border-white/10 text-white/70",
      ].join(" ")}
      style={{
        fontFamily: role === "Collaborator" ? "Arial, sans-serif" : undefined,
      }}
    >
      {role}
    </div>
  );
}

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
      onClick={onClick}
      className={[
        "relative w-full text-left rounded-2xl border transition-all duration-200",
        "text-white !bg-black/60 backdrop-blur-md",
        "p-4 sm:p-6",
        isActive ? "border-sky-400 shadow-xl" : "border-white/10 !hover:bg-black/70",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <RolePill role={person.role} />

          <div className="mt-2 text-lg sm:text-2xl font-extrabold text-white leading-snug">
            <span className="block truncate">{person.nameKo}</span>
            {person.nameEn && (
              <span className="block sm:inline text-sm sm:ml-2 sm:text-base font-semibold text-white/70">
                {person.nameEn}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm sm:text-base text-white/80 leading-relaxed">
            {person.titleLine}
          </div>
        </div>

        {/* 모바일에서 “선택됨” 표시를 좀 더 명확히 */}
        <div
          className={[
            "mt-1 h-2.5 w-2.5 rounded-full shrink-0",
            isActive ? "bg-sky-400" : "bg-white/20",
          ].join(" ")}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

function DetailPanel({ active }: { active: Person }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-6 backdrop-blur-md">
      <div>
        <RolePill role={active.role} />

        <div className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
          {active.nameKo}
          {active.nameEn && (
            <span className="ml-2 text-sm sm:text-base md:text-lg font-semibold text-white/70">
              {active.nameEn}
            </span>
          )}
        </div>

        <div className="mt-1 text-sm sm:text-base text-white/80 leading-relaxed">
          {active.titleLine}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {active.education?.length ? (
          <SectionBlock title="학력">
            <TimelineList items={active.education} />
          </SectionBlock>
        ) : null}

        {active.experience?.length ? (
          <SectionBlock title="경력">
            <TimelineList items={active.experience} />
          </SectionBlock>
        ) : null}

        {active.licenses?.length ? (
          <SectionBlock title="자격/면허 · 학회활동">
            <BulletList items={active.licenses.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.interests?.length ? (
          <SectionBlock title="연구 분야">
            <TagList items={active.interests} />
          </SectionBlock>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4">
        {active.publications?.length ? (
          <SectionBlock title="주요 논문">
            <BulletList items={active.publications.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.grants?.length ? (
          <SectionBlock title="연구비 수주">
            <BulletList items={active.grants.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.awards?.length ? (
          <SectionBlock title="수상 실적">
            <BulletList items={active.awards.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.scholarships?.length ? (
          <SectionBlock title="장학금">
            <BulletList items={active.scholarships.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.professionalEditorialService?.length ? (
          <SectionBlock title="Professional Editorial Service">
            <BulletList
              items={active.professionalEditorialService.map((x) => x.text)}
            />
          </SectionBlock>
        ) : null}

        {active.professionalMemberships?.length ? (
          <SectionBlock title="Professional Memberships">
            <BulletList
              items={active.professionalMemberships.map((x) => x.text)}
            />
          </SectionBlock>
        ) : null}

        {active.presentations?.length ? (
          <SectionBlock title="Presentations">
            <BulletList items={active.presentations.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.editorials?.length ? (
          <SectionBlock title="Editorial / Membership">
            <BulletList items={active.editorials.map((x) => x.text)} />
          </SectionBlock>
        ) : null}

        {active.technicalSkills?.length ? (
          <SectionBlock title="Technical Skills">
            <BulletList items={active.technicalSkills.map((x) => x.text)} />
          </SectionBlock>
        ) : null}
      </div>
    </div>
  );
}

export default function Team() {
  const [activeId, setActiveId] = useState(teamMembers[0]?.id ?? "");

  const active = useMemo(
    () => teamMembers.find((m) => m.id === activeId) ?? teamMembers[0],
    [activeId]
  );

  if (!active) return null;

  return (
    <div className="py-8 sm:py-12">
      <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.3em] text-sky-300">TEAM</div>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">
              연구진 소개
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/75 leading-relaxed">
              로안생명공학연구소는 한의학과 생명과학 기반 연구를 연결하는 융합형
              연구진과 임상 전문가가 함께합니다.
            </p>
          </div>
        </div>

        {/* ✅ 모바일: 위에 리스트(선택) -> 아래에 상세 / md 이상: 좌-우 패널 */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left list */}
          <div className="space-y-3 sm:space-y-4">
            {teamMembers.map((p) => (
              <PersonCard
                key={p.id}
                person={p}
                isActive={p.id === activeId}
                onClick={() => setActiveId(p.id)}
              />
            ))}
          </div>

          {/* Right details */}
          <DetailPanel active={active} />
        </div>
      </div>
    </div>
  );
}