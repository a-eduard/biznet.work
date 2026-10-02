"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks";

type Props = {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const fmt = (n: number, d: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Animated number that counts up once it becomes visible. */
export function Counter({ to, from = 0, decimals = 0, prefix = "", suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
}
