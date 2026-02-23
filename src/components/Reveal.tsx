import React from "react";
import { useInView } from "../hooks/useInView";

export default function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView({ once: true });

  return (
    <section
      ref={ref as any}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        isInView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[1px]",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}