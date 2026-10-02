"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./ui/Logo";

/**
 * Brand "Anchor Sidebar": a black rail on the left edge with the current
 * section name rotated 90°. Desktop only.
 */
export function AnchorRail() {
  const [label, setLabel] = useState("Overview");
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    setTotal(sections.length || 1);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setLabel(el.dataset.rail || "");
            setIndex(sections.indexOf(el));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="rail" aria-hidden>
      <a href="#top" className="rail__mark" tabIndex={-1}>
        <LogoMark />
      </a>
      <div className="rail__label">
        <span key={label} className="rail__text">
          {label}
        </span>
      </div>
      <div className="rail__count mono">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <i style={{ transform: `scaleY(${(index + 1) / total})` }} />
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </aside>
  );
}
