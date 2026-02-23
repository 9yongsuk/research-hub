import { useEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInView(options: Options = {}) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15, once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 이미 보였고 once면 더 관찰할 필요 없음
    if (once && isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, isInView]);

  return { ref, isInView } as const;
}