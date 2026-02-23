import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const RECEIVER_EMAIL = "Roanresearchcenter@gmail.com";

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-[11px] sm:text-xs text-white/75">
    {children}
  </span>
);

type FormState = {
  name: string;
  email: string;
  org: string;
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
  // ----- spacing system (통일 규칙) -----
  const pageX = "px-4 sm:px-6";
  const pageY = "py-6 sm:py-12";
  const sectionGap = "mt-8 sm:mt-10";
  const card =
    "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.55)]";
  const cardPad = "p-5 sm:p-8 md:p-10";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    org: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [toastHidden, setToastHidden] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const orgRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const errors = useMemo(() => {
    const list: string[] = [];

    if (form.name.trim().length < 2) list.push("이름을 2글자 이상 입력해주세요.");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) list.push("이메일 형식을 확인해주세요. (예: name@email.com)");

    if (form.subject.trim().length < 2) list.push("제목을 2글자 이상 입력해주세요.");

    if (form.message.trim().length < 10) list.push("문의 내용을 10자 이상 입력해주세요.");

    if (!form.consent) list.push("개인정보 수집·이용 동의에 체크해주세요.");

    return list;
  }, [form]);

  const isValid = errors.length === 0;

  // 입력 베이스 (모바일에서 과한 패딩/폰트 방지 + 일관성)
  const baseInput =
    "mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 " +
    "text-white outline-none text-[15px] leading-6 " +
    "focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

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
    const nameBad = form.name.trim().length < 2;
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const subjectBad = form.subject.trim().length < 2;
    const messageBad = form.message.trim().length < 10;
    const consentBad = !form.consent;

    if (nameBad) return focusAndScroll(nameRef.current);
    if (emailBad) return focusAndScroll(emailRef.current);
    if (subjectBad) return focusAndScroll(subjectRef.current);
    if (messageBad) return focusAndScroll(messageRef.current);
    if (consentBad) return focusAndScroll(consentRef.current);
  };

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [key]: value as any }));

      if (status === "success" || status === "error") setStatus("idle");
      if (errorMsg) setErrorMsg("");
      if (toastHidden) setToastHidden(false);
    };

  const reset = () => {
    setForm({
      name: "",
      email: "",
      org: "",
      subject: "",
      message: "",
      consent: false,
    });
  };

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

    if (status === "sending") return;

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

      const params: Record<string, string> = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        organization: form.org.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        to_email: RECEIVER_EMAIL,
      };

      await emailjs.send(serviceId, templateId, params, { publicKey });

      setStatus("success");
      setToastHidden(false);
      reset();
      setTouched(false);

      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);

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

  // 모바일: 토스트가 헤더 sticky(높이 56px~)와 겹치지 않게 offset
  // Layout에서 header가 sticky라면 top-16이 안정적
  const toastTop = "top-16 sm:top-3";

  return (
    <div className={`relative min-h-dvh text-white ${pageX} ${pageY}`}>
      <div className="max-w-6xl mx-auto">
        {/* ✅ Sticky Toast */}
        <div className={`sticky ${toastTop} z-50`}>
          {showToast && (
            <div
              className={`
                mx-auto mb-4
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
                <div className="text-[13px] sm:text-sm leading-6">
                  {status === "success" ? (
                    <span>전송 완료! 확인 후 회신드리겠습니다.</span>
                  ) : (
                    <span>전송 실패: {errorMsg}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setToastHidden(true)}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] sm:text-xs text-white/80 hover:bg-white/10"
                  aria-label="알림 닫기"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <header className="mb-6 sm:mb-10">
          <div className="text-[11px] sm:text-sm tracking-[0.25em] text-cyan-300 mb-2 sm:mb-3">
            CONTACT
          </div>

          <h1 className="font-semibold text-white leading-[1.15] tracking-[-0.01em] text-[clamp(22px,6vw,34px)] sm:text-5xl">
            문의하기
          </h1>

          <p className="mt-3 text-white/70 max-w-2xl text-[13px] sm:text-base leading-[1.65] sm:leading-7">
            연구 협업, 과제 기획, 분석/검증 의뢰 등 어떤 내용이든 편하게 남겨주세요.
            확인 후 회신드리겠습니다.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>1–2영업일 내 회신</Badge>
            <Badge>비공개 상담</Badge>
            <Badge>R&amp;D / Grant / Translational</Badge>
          </div>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
          {/* Form */}
          <div className={`lg:col-span-2 relative z-10 ${card} ${cardPad}`}>
            <h2 className="text-[18px] sm:text-2xl font-semibold mb-4 sm:mb-6">
              문의 내용
            </h2>

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-[11px] sm:text-sm text-white/70">
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
                    className={baseInput}
                    placeholder="성함"
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-sm text-white/70">
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
                    className={baseInput}
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="text-[11px] sm:text-sm text-white/70">
                    기관/회사
                  </label>
                  <input
                    ref={orgRef}
                    value={form.org}
                    onChange={onChange("org")}
                    onKeyDown={onKeyDownNext(subjectRef.current)}
                    autoComplete="organization"
                    inputMode="text"
                    enterKeyHint="next"
                    autoCapitalize="words"
                    autoCorrect="off"
                    spellCheck={false}
                    className={baseInput}
                    placeholder="소속(선택)"
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-sm text-white/70">
                    제목 *
                  </label>
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
                    className={baseInput}
                    placeholder="문의 제목"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] sm:text-sm text-white/70">
                  문의 내용 *
                </label>
                <textarea
                  ref={messageRef}
                  value={form.message}
                  onChange={onChange("message")}
                  rows={6}
                  className={baseInput + " resize-none min-h-[150px] sm:min-h-[190px]"}
                  placeholder="프로젝트 배경, 목표, 원하는 산출물, 일정/예산 범위 등을 적어주시면 더 빠르게 상담 가능합니다."
                />
                <div className="mt-2 text-[11px] sm:text-xs text-white/50">
                  * 최소 10자 이상 입력 권장
                </div>

                {isTouchDevice() && (
                  <button
                    type="button"
                    onClick={() => focusAndScroll(consentRef.current)}
                    className="
                      mt-3 w-full
                      min-h-[44px]
                      rounded-2xl
                      border border-white/10
                      bg-white/5
                      text-sm font-semibold text-white/80
                      hover:bg-white/10
                      transition
                    "
                  >
                    다음 (동의 체크로 이동)
                  </button>
                )}
              </div>

              {/* Consent */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
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
                    <div className="text-[13px] sm:text-sm text-white/80 leading-6">
                      문의 응대를 위해 이름/이메일을 수집·이용하는 것에 동의합니다. *
                      <div className="text-[11px] sm:text-xs text-white/50 mt-1 leading-5">
                        (수집 항목: 이름, 이메일, 소속(선택), 문의 내용 / 보관: 회신 완료 후
                        합리적 기간 내 파기)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-1 sm:pt-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={!isValid || status === "sending"}
                    className={`
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
                            bg-white/5 border-white/10 text-white/35
                            cursor-not-allowed
                          `
                          : `
                            bg-cyan-500/10 border-cyan-400/40 text-cyan-200
                            shadow-[0_0_20px_rgba(34,211,238,0.25)]
                            hover:bg-cyan-500/20 hover:border-cyan-400
                            hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                            active:translate-y-[1px]
                          `
                      }
                    `}
                  >
                    {status === "sending" ? "전송 중..." : "문의 보내기"}
                    <span className="text-xs">→</span>
                  </button>

                  <a
                    href={`mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(
                      form.subject || "문의드립니다"
                    )}&body=${encodeURIComponent(
                      `이름: ${form.name}\n이메일: ${form.email}\n기관/회사: ${form.org}\n\n문의 내용:\n${form.message}`
                    )}`}
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
                      transition
                    "
                  >
                    메일로 직접 보내기
                    <span className="text-xs">↗</span>
                  </a>
                </div>

                {/* 부족 항목 안내 */}
                {touched && errors.length > 0 && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-[11px] sm:text-xs font-semibold text-white/70 mb-2">
                      아래 항목을 확인해주세요
                    </div>
                    <ul className="space-y-1.5 text-[11px] sm:text-xs text-white/70 leading-5">
                      {errors.map((msg) => (
                        <li key={msg} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="break-words">{msg}</span>
                        </li>
                      ))}
                    </ul>

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
                          transition
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
          <aside className={`relative z-10 ${card} p-5 sm:p-8 h-fit`}>
            <h3 className="text-[16px] sm:text-xl font-semibold mb-3 sm:mb-4">
              연락처
            </h3>

            <div className="space-y-3 text-[13px] sm:text-sm text-white/75">
              <div className="flex items-start justify-between gap-3">
                <span className="text-white/55 shrink-0">Email</span>
                <a
                  className="text-cyan-300 hover:text-cyan-200 text-right break-all"
                  href={`mailto:${RECEIVER_EMAIL}`}
                >
                  {RECEIVER_EMAIL}
                </a>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-white/55">응답</span>
                <span>1–2영업일 내</span>
              </div>
            </div>

            <div className={sectionGap}>
              <h4 className="text-[13px] sm:text-sm font-semibold text-white/80 mb-3">
                문의에 포함하면 좋은 정보
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-sm text-white/70">
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
          </aside>
        </div>

        <div className="mt-10 sm:mt-12 text-center text-[11px] sm:text-xs text-white/50">
          © {new Date().getFullYear()} Roan Bioengineering Research Center
        </div>
      </div>
    </div>
  );
}