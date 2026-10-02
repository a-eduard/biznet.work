"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once the element has entered the viewport (or while it is in view when once=false). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, threshold = 0.2, rootMargin = "0px 0px -8% 0px" }: { once?: boolean; threshold?: number; rootMargin?: string } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, threshold, rootMargin]);

  return inView;
}

/** Respects the visitor's OS-level "reduce motion" preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
