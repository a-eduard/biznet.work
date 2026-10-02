"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

const k = (t: string) => <span className="j-k">{t}</span>;
const s = (t: string) => <span className="j-s">{t}</span>;
const n = (t: string) => <span className="j-n">{t}</span>;
const r = (t: string) => <span className="j-r">{t}</span>;
const p = (t: string) => <span className="j-p">{t}</span>;

/** A sample record from the Daily Data Stream (fictional, sanitized). */
const I1 = "  ";
const I2 = "    ";
const I3 = "      ";

const lines: ReactNode[] = [
  <>{p("{")}</>,
  <>{I1}{k('"trace_id"')}{p(": ")}{s('"TRC-20931"')}{p(",")}</>,
  <>{I1}{k('"domain"')}{p(": ")}{s('"saas.product_delivery"')}{p(",")}</>,
  <>{I1}{k('"nodes"')}{p(": [")}</>,
  <>{I2}{p("{ ")}{k('"id"')}{p(": ")}{s('"e1"')}{p(", ")}{k('"actor"')}{p(": ")}{r('"[User_A]"')}{p(",")}</>,
  <>{I3}{k('"class"')}{p(": ")}{s('"Event.Execution.Architecture_Debate"')}{p(" },")}</>,
  <>{I2}{p("{ ")}{k('"id"')}{p(": ")}{s('"e2"')}{p(", ")}{k('"actor"')}{p(": ")}{r('"[User_B]"')}{p(",")}</>,
  <>{I3}{k('"class"')}{p(": ")}{s('"Event.Management.Decision"')}{p(", ")}{k('"outcome"')}{p(": ")}{s('"approved"')}{p(" },")}</>,
  <>{I2}{p("{ ")}{k('"id"')}{p(": ")}{s('"e3"')}{p(", ")}{k('"client"')}{p(": ")}{r('"[Client_ID]"')}{p(",")}</>,
  <>{I3}{k('"class"')}{p(": ")}{s('"Entity.Task"')}{p(", ")}{k('"status"')}{p(": ")}{s('"done"')}{p(" },")}</>,
  <>{I2}{p("{ ")}{k('"id"')}{p(": ")}{s('"e4"')}{p(", ")}{k('"ref"')}{p(": ")}{r('"[REDACTED_SECRET]"')}{p(",")}</>,
  <>{I3}{k('"class"')}{p(": ")}{s('"Event.Execution.Code_Commit"')}{p(" }")}</>,
  <>{I1}{p("],")}</>,
  <>{I1}{k('"edges"')}{p(": [")}</>,
  <>{I2}{p("[")}{s('"e1"')}{p(", ")}{n('"CAUSES"')}{p(", ")}{s('"e2"')}{p("],")}</>,
  <>{I2}{p("[")}{s('"e2"')}{p(", ")}{n('"CREATES"')}{p(", ")}{s('"e3"')}{p("],")}</>,
  <>{I2}{p("[")}{s('"e4"')}{p(", ")}{n('"IMPLEMENTS"')}{p(", ")}{s('"e3"')}{p("]")}</>,
  <>{I1}{p("],")}</>,
  <>{I1}{k('"quality"')}{p(": { ")}{k('"trace_completeness"')}{p(": ")}{n("0.94")}{p(", ")}{k('"signal_to_noise"')}{p(": ")}{n("0.82")}{p(" },")}</>,
  <>{I1}{k('"pii"')}{p(": ")}{s('"tokenized"')}{p(", ")}{k('"license"')}{p(": ")}{s('"non-exclusive"')}</>,
  <>{p("}")}</>,
];

export function JsonStream() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setShown(lines.length);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="code">
      <div className="code__bar mono">
        <span className="code__verb">GET</span>
        <span>/v1/stream/daily</span>
        <span className="code__ok">200 OK</span>
      </div>
      <pre className="code__body mono" aria-label="Sample JSON record from the data stream">
        {lines.map((l, i) => (
          <div key={i} className={`code__line ${i < shown ? "is-on" : ""}`}>
            <span className="code__ln">{String(i + 1).padStart(2, "0")}</span>
            <span>{l}</span>
          </div>
        ))}
        <span className="code__cursor" />
      </pre>
      <div className="code__foot mono">
        <span>application/json</span>
        <span>sample record · fictional company</span>
      </div>
    </div>
  );
}
