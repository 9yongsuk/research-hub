// src/pages/Contact.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, useLocation } from "react-router-dom";

const RECEIVER_EMAIL = "Roanresearchcenter@gmail.com";

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-white/80">
    {children}
  </span>
);

type InquiryCategory =
  | ""
  | "한의소재·약침 후보 발굴 & 기초 효능 검증"
  | "RNA-seq & bioinformatics 분석(AI 모델링 포함)"
  | "협업 네트워크"
  | "기타";

type FormState = {
  name: string;
  email: string;
  org: string;
  category: InquiryCategory;
  subject: string;
  message: string;
  consent: boolean;
};

type Status = "idle" | "sending" | "success" | "error";

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      (navigator as any)?.maxTouchPoints > 0 ||
      (navigator as any)?.msMaxTouchPoints > 0)
  );
}

export default function Contact() {
  const location = useLocation();

  // ✅ Services에서 Link state로 넘겨준 값 받기
  const presetCategory = (location.state as any)?.presetCategory as
    | InquiryCategory
    | undefined;
  const presetSubject = (location.state as any)?.presetSubject as
    | string
    | undefined;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    org: "",
    category: "",
    subject: "",
    message: "",
    consent: false,
  });

  // ✅ preset은 "처음 들어왔을 때 1회만" 반영
  const appliedPresetRef = useRef(false);
  useEffect(() => {
    if (appliedPresetRef.current) return;

    const next: Partial<FormState> = {};

    if (presetCategory) next.category = presetCategory;
    if (presetSubject && !form.subject) next.subject = presetSubject;

    if (Object.keys(next).length) {
      setForm((prev) => ({ ...prev, ...next }));
    }

    appliedPresetRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetCategory, presetSubject]);

  // ✅ “제출 시도” 이후에만 부족 항목 안내가 보이도록
  const [touched, setTouched] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ✅ Sticky toast 닫기 제어
  const [toastHidden, setToastHidden] = useState(false);

  // ✅ refs
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const orgRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  // ✅ 문의 항목 옵션 (placeholder는 disabled)
  const categoryOptions: {
    value: InquiryCategory;
    label: string;
    disabled?: boolean;
  }[] = [
    { value: "", label: "문의 항목을 선택해주세요", disabled: true },
    {
      value: "한의소재·약침 후보 발굴 & 기초 효능 검증",
      label: "한의소재·약침 후보 발굴 & 기초 효능 검증",
    },
    {
      value: "RNA-seq & bioinformatics 분석(AI 모델링 포함)",
      label: "RNA-seq & bioinformatics 분석(AI 모델링 포함)",
    },
    { value: "협업 네트워크", label: "협업 네트워크" },
    { value: "기타", label: "기타" },
  ];

  // ✅ 부족한 항목 리스트 계산
  const errors = useMemo(() => {
    const list: string[] = [];

    if (form.name.trim().length < 1) list.push("이름을 1글자 이상 입력해주세요.");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) list.push("이메일 형식을 확인해주세요. (예: name@email.com)");

    if (!form.category) list.push("문의 항목을 선택해주세요.");

    if (form.subject.trim().length < 2) list.push("제목을 2글자 이상 입력해주세요.");

    if (form.message.trim().length < 10) list.push("문의 내용을 10자 이상 입력해주세요.");

    if (!form.consent) list.push("개인정보 수집·이용 동의에 체크해주세요.");

    return list;
  }, [form]);

  // ✅ 필드별 에러 (빨간 테두리용)
  const fieldErrors = useMemo(() => {
    // touched 전에는 빨간 테두리 안 보이게
    if (!touched) {
      return {
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
        consent: "",
      };
    }

    const out = {
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
      consent: "",
    };

    if (form.name.trim().length < 1) out.name = "이름을 1글자 이상 입력해주세요.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) out.email = "이메일 형식을 확인해주세요. (예: name@email.com)";

    if (!form.category) out.category = "문의 항목을 선택해주세요.";

    if (form.subject.trim().length < 2) out.subject = "제목을 2글자 이상 입력해주세요.";

    if (form.message.trim().length < 10) out.message = "문의 내용을 10자 이상 입력해주세요.";

    if (!form.consent) out.consent = "개인정보 수집·이용 동의에 체크해주세요.";

    return out;
  }, [touched, form]);

  const isValid = errors.length === 0;

  // ✅ Input base (에러 시 스타일만 갈아끼우기)
  const baseInputCore =
    "mt-2 w-full rounded-2xl bg-black/30 px-4 py-3 text-white outline-none " +
    "text-[15px] leading-6 transition " +
    "focus:ring-2 focus:ring-cyan-400/20";

  const inputClass = (hasError: boolean) =>
    [
      baseInputCore,
      "border",
      hasError
        ? "border-red-500/70 focus:border-red-500/90"
        : "border-white/10 focus:border-cyan-400/60",
    ].join(" ");

  const focusAndScroll = (el: HTMLElement | null) => {
    if (!el) return;
    (el as any).focus?.();

    window.setTimeout(() => {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {
        el.scrollIntoView();
      }
    }, 60);
  };

  const focusFirstError = () => {
    const nameBad = form.name.trim().length < 1;
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const categoryBad = !form.category;
    const subjectBad = form.subject.trim().length < 2;
    const messageBad = form.message.trim().length < 10;
    const consentBad = !form.consent;

    if (nameBad) return focusAndScroll(nameRef.current);
    if (emailBad) return focusAndScroll(emailRef.current);
    if (categoryBad) return focusAndScroll(categoryRef.current);
    if (subjectBad) return focusAndScroll(subjectRef.current);
    if (messageBad) return focusAndScroll(messageRef.current);
    if (consentBad) return focusAndScroll(consentRef.current);
  };

  const onChange =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [key]: value as any }));

      // 입력을 시작하면 status 메시지가 고정되지 않게
      if (status === "success" || status === "error") setStatus("idle");
      if (errorMsg) setErrorMsg("");

      // 토스트 다시 보이게
      if (toastHidden) setToastHidden(false);
    };

  const reset = () => {
    setForm({
      name: "",
      email: "",
      org: "",
      category: "",
      subject: "",
      message: "",
      consent: false,
    });
  };

  // ✅ Enter(Next) 동작: input에서는 Enter를 "다음 필드로"
  const onKeyDownNext =
    (nextEl: HTMLElement | null) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if ((e.nativeEvent as any).isComposing) return;

      e.preventDefault();
      focusAndScroll(nextEl);
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched(true);
    setErrorMsg("");
    setToastHidden(false);

    // ✅ 전송 중 중복 클릭 방지
    if (status === "sending") return;

    // ✅ 유효하지 않으면, 버튼 비활성+문구 표시하고 (첫 오류로 포커스 이동)
    if (!isValid) {
      focusFirstError();
      return;
    }

    try {
      setStatus("sending");

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS 환경변수(VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY)가 설정되지 않았습니다."
        );
      }

      const subjectWithCategory = form.category
        ? `[${form.category}] ${form.subject.trim()}`
        : form.subject.trim();

      const params: Record<string, string> = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        organization: form.org.trim(),
        category: form.category || "기타",
        subject: subjectWithCategory,
        message: form.message.trim(),
        to_email: RECEIVER_EMAIL,
      };

      await emailjs.send(serviceId, templateId, params, { publicKey });

      setStatus("success");
      setToastHidden(false);
      reset();
      setTouched(false);

      // ✅ 성공 시 상단 토스트가 잘 보이게 맨 위로
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);

      // ✅ 입력 다시 시작하기 쉽게 첫 칸으로 포커스
      window.setTimeout(() => {
        focusAndScroll(nameRef.current);
      }, 250);

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      setStatus("error");
      setToastHidden(false);
      setErrorMsg(
        err?.message ||
          "메일 전송에 실패했습니다. 잠시 후 다시 시도하거나 직접 이메일로 문의해주세요."
      );

      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);

      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const showToast = !toastHidden && (status === "success" || status === "error");

  const mailtoSubject = encodeURIComponent(
    (form.category ? `[${form.category}] ` : "") + (form.subject || "문의드립니다")
  );
  const mailtoBody = encodeURIComponent(
    `이름: ${form.name}\n이메일: ${form.email}\n기관/회사: ${form.org}\n문의 항목: ${
      form.category || "기타"
    }\n\n문의 내용:\n${form.message}`
  );

  // ✅ Select 오른쪽 화살표 SVG
  const SelectChevron = ({ active }: { active?: boolean }) => (
    <svg
      className={[
        "h-4 w-4",
        "transition",
        active ? "text-sky-300" : "text-white/60",
      ].join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="relative min-h-screen text-white px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Sticky Toast (상단 고정) */}
        <div className="sticky top-3 z-50">
          {showToast && (
            <div
              className={`
                mx-auto mb-5
                rounded-2xl border
                px-4 py-3
                shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                backdrop-blur-xl
                ${
                  status === "success"
                    ? "border-cyan-400/30 bg-cyan-500/10 text-cyan-200"
                    : "border-red-400/30 bg-red-500/10 text-red-200"
                }
              `}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm leading-6">
                  {status === "success" ? (
                    <span>전송 완료! 확인 후 회신드리겠습니다.</span>
                  ) : (
                    <span>전송 실패: {errorMsg}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setToastHidden(true)}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10"
                  aria-label="알림 닫기"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="text-[11px] sm:text-sm tracking-[0.25em] text-cyan-400 mb-3">
            CONTACT
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold mb-4 sm:mb-6">
            문의하기
          </h1>
          <p className="text-white/70 max-w-3xl text-sm sm:text-base leading-6 sm:leading-7">
            연구 협업, 과제 기획, 분석/검증 의뢰 등 어떤 내용이든 편하게
            남겨주세요. 확인 후 회신드리겠습니다.
          </p>
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
            <Badge>1–2영업일 내 회신</Badge>
            <Badge>비공개 상담</Badge>
            <Badge>R&amp;D / Grant / Translational</Badge>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
          {/* Form */}
          <div
            className="
              lg:col-span-2
              relative z-10
              rounded-3xl border border-white/10
              bg-white/5 backdrop-blur-xl
              p-5 sm:p-8 md:p-10
              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
            "
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
              문의 내용
            </h2>

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              {/* name / email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs sm:text-sm text-white/70">
                    이름 *
                  </label>
                  <input
                    ref={nameRef}
                    value={form.name}
                    onChange={onChange("name")}
                    onKeyDown={onKeyDownNext(emailRef.current)}
                    autoComplete="name"
                    inputMode="text"
                    enterKeyHint="next"
                    autoCapitalize="words"
                    autoCorrect="off"
                    spellCheck={false}
                    className={inputClass(!!fieldErrors.name)}
                    placeholder="성함"
                  />
                  {fieldErrors.name && (
                    <div className="mt-2 text-[11px] sm:text-xs text-red-400">
                      {fieldErrors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-white/70">
                    이메일 *
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange("email")}
                    onKeyDown={onKeyDownNext(orgRef.current)}
                    enterKeyHint="next"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className={inputClass(!!fieldErrors.email)}
                    placeholder="name@email.com"
                  />
                  {fieldErrors.email && (
                    <div className="mt-2 text-[11px] sm:text-xs text-red-400">
                      {fieldErrors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* org / category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-xs sm:text-sm text-white/70">
                    기관/회사
                  </label>
                  <input
                    ref={orgRef}
                    value={form.org}
                    onChange={onChange("org")}
                    onKeyDown={onKeyDownNext(categoryRef.current)}
                    autoComplete="organization"
                    inputMode="text"
                    enterKeyHint="next"
                    autoCapitalize="words"
                    autoCorrect="off"
                    spellCheck={false}
                    className={inputClass(false)}
                    placeholder="소속(선택)"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-white/70">
                    문의 항목 *
                  </label>

                  {/* ✅ select wrapper (svg chevron + error border) */}
                  <div className="relative group mt-2">
                    <select
                      ref={categoryRef}
                      value={form.category}
                      onChange={onChange("category")}
                      className={[
                        // base
                        "w-full appearance-none rounded-2xl bg-black/30 px-4 py-3 pr-10",
                        "text-white outline-none text-[15px] leading-6 transition",
                        "focus:ring-2 focus:ring-cyan-400/20",
                        "border",
                        fieldErrors.category
                          ? "border-red-500/70 focus:border-red-500/90"
                          : "border-white/10 focus:border-cyan-400/60",
                      ].join(" ")}
                    >
                      {categoryOptions.map((opt) => (
                        <option
                          key={opt.label}
                          value={opt.value}
                          disabled={opt.disabled}
                          className="bg-[#0b1220] text-white"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Chevron */}
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <SelectChevron active={false} />
                    </div>

                    {/* focus state 색상: group-focus-within */}
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition">
                      <SelectChevron active />
                    </div>
                  </div>

                  {fieldErrors.category ? (
                    <div className="mt-2 text-[11px] sm:text-xs text-red-400">
                      {fieldErrors.category}
                    </div>
                  ) : (
                    <div className="mt-2 text-[11px] sm:text-xs text-white/50">
                      문의 유형에 맞춰 더 빠르게 검토할 수 있습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* subject */}
              <div>
                <label className="text-xs sm:text-sm text-white/70">제목 *</label>
                <input
                  ref={subjectRef}
                  value={form.subject}
                  onChange={onChange("subject")}
                  onKeyDown={onKeyDownNext(messageRef.current)}
                  inputMode="text"
                  enterKeyHint="next"
                  autoCapitalize="sentences"
                  autoCorrect="off"
                  spellCheck={false}
                  className={inputClass(!!fieldErrors.subject)}
                  placeholder="문의 제목"
                />
                {fieldErrors.subject ? (
                  <div className="mt-2 text-[11px] sm:text-xs text-red-400">
                    {fieldErrors.subject}
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] sm:text-xs text-white/50">
                    메일 제목에 문의 항목이 자동으로 붙습니다.
                  </div>
                )}
              </div>

              {/* message */}
              <div>
                <label className="text-xs sm:text-sm text-white/70">
                  문의 내용 *
                </label>
                <textarea
                  ref={messageRef}
                  value={form.message}
                  onChange={onChange("message")}
                  rows={6}
                  className={[
                    inputClass(!!fieldErrors.message),
                    "resize-none min-h-[160px] sm:min-h-[190px]",
                  ].join(" ")}
                  placeholder="프로젝트 배경, 목표, 원하는 산출물, 일정/예산 범위 등을 적어주시면 더 빠르게 상담 가능합니다."
                />
                {fieldErrors.message ? (
                  <div className="mt-2 text-[11px] sm:text-xs text-red-400">
                    {fieldErrors.message}
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] sm:text-xs text-white/50">
                    * 최소 10자 이상 입력 권장
                  </div>
                )}
              </div>

              {/* Consent */}
              <div
                className={[
                  "rounded-2xl border bg-white/5 px-4 py-3 transition",
                  fieldErrors.consent ? "border-red-500/60" : "border-white/10",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <input
                    ref={consentRef}
                    id="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={onChange("consent")}
                    className="mt-1 h-5 w-5 rounded border-white/20 bg-black/30"
                  />
                  <label htmlFor="consent" className="cursor-pointer select-none">
                    <div className="text-sm text-white/80 leading-6">
                      문의 응대를 위해 이름/이메일을 수집·이용하는 것에 동의합니다. *
                      <div className="text-xs text-white/50 mt-1 leading-5">
                        (수집 항목: 이름, 이메일, 소속(선택), 문의 항목, 문의 내용 / 보관:
                        회신 완료 후 합리적 기간 내 파기)
                      </div>
                      {fieldErrors.consent && (
                        <div className="mt-2 text-[12px] text-red-400">
                          {fieldErrors.consent}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 sm:pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* ✅ Submit: 유효하지 않으면 진짜로 비활성 처리 */}
                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={!isValid || status === "sending"}
                    aria-disabled={!isValid || status === "sending"}
                    className={`
                      relative z-10
                      inline-flex items-center justify-center gap-2
                      w-full sm:w-auto
                      min-h-[46px]
                      px-5 py-3 sm:py-2.5
                      rounded-full
                      border
                      text-sm font-semibold
                      transition-all duration-300
                      select-none
                      ${
                        !isValid || status === "sending"
                          ? `
                            bg-white/5 border-white/10
                            text-white/35
                            cursor-not-allowed
                            opacity-80
                          `
                          : `
                            bg-cyan-500/10
                            border-cyan-400/40
                            text-cyan-200
                            shadow-[0_0_20px_rgba(34,211,238,0.25)]
                            hover:bg-cyan-500/20
                            hover:border-cyan-400
                            hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                            active:translate-y-[1px]
                          `
                      }
                    `}
                  >
                    {status === "sending" ? "전송 중..." : "문의 보내기"}
                    <span className="text-xs">→</span>
                  </button>

                  {/* Mail fallback */}
                  <a
                    href={`mailto:${RECEIVER_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="
                      inline-flex items-center justify-center gap-2
                      w-full sm:w-auto
                      min-h-[46px]
                      px-5 py-3 sm:py-2.5
                      rounded-full
                      border border-white/15
                      bg-white/5
                      text-sm font-semibold text-white/80
                      hover:bg-white/10 hover:border-white/25
                      transition-all duration-300
                    "
                  >
                    메일로 직접 보내기
                    <span className="text-xs">↗</span>
                  </a>
                </div>

                {/* 부족 항목 안내 (제출 시도 후에만) */}
                {touched && errors.length > 0 && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs font-semibold text-white/70 mb-2">
                      아래 항목을 확인해주세요
                    </div>
                    <ul className="space-y-1.5 text-xs text-white/70 leading-5">
                      {errors.map((msg) => (
                        <li key={msg} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="break-words">{msg}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ✅ 모바일 편의: 첫 오류로 이동 버튼 */}
                    {isTouchDevice() && (
                      <button
                        type="button"
                        onClick={focusFirstError}
                        className="
                          mt-3 w-full
                          min-h-[44px]
                          rounded-2xl
                          border border-white/10
                          bg-white/5
                          text-sm font-semibold text-white/80
                          hover:bg-white/10
                          transition-all
                        "
                      >
                        첫 오류로 이동
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Side card */}
          <div
            className="
              relative z-10
              rounded-3xl border border-white/10
              bg-white/5 backdrop-blur-xl
              p-5 sm:p-8
              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
              h-fit
            "
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4">연락처</h3>

            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-start justify-between gap-3">
                <span className="text-white/60 shrink-0">Email</span>
                <a
                  className="text-cyan-300 hover:text-cyan-200 text-right break-all"
                  href={`mailto:${RECEIVER_EMAIL}`}
                >
                  {RECEIVER_EMAIL}
                </a>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">응답</span>
                <span>1–2영업일 내</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h4 className="text-sm font-semibold text-white/80 mb-3">
                문의에 포함하면 좋은 정보
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>목표 적응증 / 연구 목표</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>원하는 산출물(보고서/슬라이드/데이터)</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>일정/예산 범위</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 sm:mt-8">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-semibold"
              >
                연구 서비스 보기 <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center text-[11px] sm:text-xs text-white/50">
          © {new Date().getFullYear()} Roan Bioengineering Research Center
        </div>
      </div>
    </div>
  );
}