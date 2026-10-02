import type { ReactNode } from "react";

/** Brand "anchor line" label: a short rule followed by an ALL-CAPS caption. */
export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "light" }) {
  return (
    <p className={`eyebrow ${tone === "light" ? "eyebrow--light" : ""}`}>
      <span className="eyebrow__line" aria-hidden />
      {children}
    </p>
  );
}
