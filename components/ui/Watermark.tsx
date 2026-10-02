"use client";

import { useEffect, useRef } from "react";

/**
 * "Bleeding watermark" from the brand book: huge light-grey word cut by the
 * right edge of the screen. Drifts horizontally while the section scrolls.
 */
export function Watermark({ word, tone = "light", top = "8%" }: { word: string; tone?: "light" | "dark"; top?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const parent = el.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (vh - r.top) / (vh + r.height); // 0 → 1 while section crosses the viewport
      el.style.transform = `translate3d(${(0.5 - p) * 18}%, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={ref} className={`watermark watermark--${tone}`} style={{ top }} aria-hidden>
      {word}
    </span>
  );
}
