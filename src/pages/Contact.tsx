import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const RECEIVER_EMAIL = "Roanresearchcenter@gmail.com";

const Badge = ({ children }: any) => (
  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-xs text-white/80">
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

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    org: "",
    subject: "",
    message: "",
    consent: false,
  });

  // ✅ “제출 시도” 이후에만 부족 항목 안내가 보이도록
  const [touched, setTouched] = useState(false);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ✅ 부족한 항목 리스트 계산
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

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [key]: value as any }));

      // 입력을 시작하면 status 메시지가 고정되지 않게
      if (status === "success" || status === "error") setStatus("idle");
      if (errorMsg) setErrorMsg("");
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMsg("");

    // ✅ 전송 중 중복 클릭 방지
    if (status === "sending") return;

    // ✅ 유효하지 않으면, 문구만 표시하고 종료 (버튼은 눌리게 유지)
    if (!isValid) return;

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

      // ✅ EmailJS 템플릿 변수명과 일치
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
      reset();
      setTouched(false);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        err?.message ||
          "메일 전송에 실패했습니다. 잠시 후 다시 시도하거나 직접 이메일로 문의해주세요."
      );
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="relative min-h-screen text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm tracking-widest text-cyan-400 mb-3">CONTACT</div>
          <h1 className="text-5xl font-semibold mb-6">문의하기</h1>
          <p className="text-white/70 max-w-2xl">
            연구 협업, 과제 기획, 분석/검증 의뢰 등 어떤 내용이든 편하게 남겨주세요.
            확인 후 회신드리겠습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>1–2영업일 내 회신</Badge>
            <Badge>비공개 상담</Badge>
            <Badge>R&amp;D / Grant / Translational</Badge>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div
            className="
              lg:col-span-2
              relative z-10
              rounded-3xl border border-white/10
              bg-white/5 backdrop-blur-xl
              p-8 md:p-10
              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
            "
          >
            <h2 className="text-2xl font-semibold mb-6">문의 내용</h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-white/70">이름 *</label>
                  <input
                    value={form.name}
                    onChange={onChange("name")}
                    autoComplete="name"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-white/10 bg-black/30
                      px-4 py-3 text-white
                      outline-none
                      focus:border-cyan-400/60
                      focus:ring-2 focus:ring-cyan-400/20
                    "
                    placeholder="성함"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70">이메일 *</label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange("email")}
                    className="
                      mt-2 w-full rounded-2xl
                      border border-white/10 bg-black/30
                      px-4 py-3 text-white
                      outline-none
                      focus:border-cyan-400/60
                      focus:ring-2 focus:ring-cyan-400/20
                    "
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-white/70">기관/회사</label>
                  <input
                    value={form.org}
                    onChange={onChange("org")}
                    autoComplete="organization"
                    className="
                      mt-2 w-full rounded-2xl
                      border border-white/10 bg-black/30
                      px-4 py-3 text-white
                      outline-none
                      focus:border-cyan-400/60
                      focus:ring-2 focus:ring-cyan-400/20
                    "
                    placeholder="소속(선택)"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70">제목 *</label>
                  <input
                    value={form.subject}
                    onChange={onChange("subject")}
                    className="
                      mt-2 w-full rounded-2xl
                      border border-white/10 bg-black/30
                      px-4 py-3 text-white
                      outline-none
                      focus:border-cyan-400/60
                      focus:ring-2 focus:ring-cyan-400/20
                    "
                    placeholder="문의 제목"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/70">문의 내용 *</label>
                <textarea
                  value={form.message}
                  onChange={onChange("message")}
                  rows={7}
                  className="
                    mt-2 w-full rounded-2xl
                    border border-white/10 bg-black/30
                    px-4 py-3 text-white
                    outline-none
                    focus:border-cyan-400/60
                    focus:ring-2 focus:ring-cyan-400/20
                    resize-none
                  "
                  placeholder="프로젝트 배경, 목표, 원하는 산출물, 일정/예산 범위 등을 적어주시면 더 빠르게 상담 가능합니다."
                />
                <div className="mt-2 text-xs text-white/50">
                  * 최소 10자 이상 입력 권장
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={onChange("consent")}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30"
                />
                <label htmlFor="consent" className="cursor-pointer">
                  <div className="text-sm text-white/70">
                    문의 응대를 위해 이름/이메일을 수집·이용하는 것에 동의합니다. *
                    <div className="text-xs text-white/50 mt-1">
                      (수집 항목: 이름, 이메일, 소속(선택), 문의 내용 / 보관: 회신 완료 후 합리적 기간 내 파기)
                    </div>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Submit (disabled를 쓰지 않고, 눌렀을 때 안내문구 표시) */}
                  <button
                    type="submit"
                    aria-disabled={!isValid || status === "sending"}
                    className={`
                      relative z-10
                      inline-flex items-center justify-center gap-2
                      w-full sm:w-auto
                      px-5 py-2.5
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
                            cursor-pointer
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
                    href={`mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(
                      form.subject || "문의드립니다"
                    )}&body=${encodeURIComponent(
                      `이름: ${form.name}\n이메일: ${form.email}\n기관/회사: ${form.org}\n\n문의 내용:\n${form.message}`
                    )}`}
                    className="
                      inline-flex items-center justify-center gap-2
                      w-full sm:w-auto
                      px-5 py-2.5
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
                    <ul className="space-y-1 text-xs text-white/60">
                      {errors.map((msg) => (
                        <li key={msg} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{msg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Status */}
                <div className="pt-3">
                  {status === "success" && (
                    <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                      전송 완료! 확인 후 회신드리겠습니다.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      전송 실패: {errorMsg}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Side card */}
          <div
            className="
              relative z-10
              rounded-3xl border border-white/10
              bg-white/5 backdrop-blur-xl
              p-8
              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
              h-fit
            "
          >
            <h3 className="text-xl font-semibold mb-4">연락처</h3>
            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">Email</span>
                <a
                  className="text-cyan-300 hover:text-cyan-200"
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

            <div className="mt-8">
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

            <div className="mt-8">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm font-semibold"
              >
                연구 서비스 보기 <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Roan Bioengineering Research Center
        </div>
      </div>
    </div>
  );
}
