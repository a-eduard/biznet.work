"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { IconCheck } from "./ui/Icons";

type Scenario = { rows: [string, string, string][]; value: number };

const scenarios: Scenario[] = [
  {
    rows: [
      ["slack", "10:42", "Architecture debate · 14 msgs"],
      ["jira", "11:05", "PRJ-412 → In review"],
      ["github", "11:31", "Commit a3f9c2 merged"],
    ],
    value: 4.5,
  },
  {
    rows: [
      ["meet", "13:10", "Pricing call · 32 min"],
      ["jira", "13:48", "PRJ-418 → Approved"],
      ["github", "15:02", "Release v2.3.0 tagged"],
    ],
    value: 6.2,
  },
  {
    rows: [
      ["slack", "16:20", "Bug triage · 9 msgs"],
      ["jira", "16:41", "BUG-97 → Fixed"],
      ["github", "17:15", "PR #311 merged"],
    ],
    value: 3.7,
  },
];

type Entry = { id: number; value: number };
const STEPS = 9; // 0 idle · 1-3 rows · 4 merge · 5 ledger · 6-8 hold
const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function TraceConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(5); // first paint shows a complete cycle
  const [cycle, setCycle] = useState(0);
  const [ledger, setLedger] = useState<Entry[]>([
    { id: 20931, value: 4.5 },
    { id: 20930, value: 3.8 },
    { id: 20928, value: 5.1 },
    { id: 20925, value: 2.9 },
  ]);
  const [total, setTotal] = useState(3412.4);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setTick((v) => v + 1), 850);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const step = tick % STEPS;
  const scen = scenarios[cycle % scenarios.length];
  const traceId = 20931 + cycle;

  useEffect(() => {
    if (tick < STEPS) return;
    if (step === 0) setCycle(Math.floor(tick / STEPS));
    if (step === 5) {
      const c = Math.floor(tick / STEPS);
      const s = scenarios[c % scenarios.length];
      setLedger((l) => [{ id: 20931 + c, value: s.value }, ...l].slice(0, 4));
      setTotal((v) => v + s.value);
    }
  }, [tick, step]);

  const merged = step >= 4;

  return (
    <div ref={ref} className="console">
      <div className="console__pane">
        <div className="console__head mono">
          <span>Activity log</span>
          <span className="muted">measurement</span>
        </div>
        <div className={`console__log ${merged ? "is-merged" : ""}`}>
          {scen.rows.map((r, i) => (
            <div key={`${cycle}-${i}`} className={`logrow ${step > i || merged ? "is-on" : ""}`}>
              <span className={`src src--${r[0]}`}>{r[0]}</span>
              <span className="mono muted">{r[1]}</span>
              <span>{r[2]}</span>
            </div>
          ))}
          <div className={`verified ${merged ? "is-on" : ""}`}>
            <IconCheck width={18} height={18} />
            <div>
              <b className="mono">Verified meaningful trace</b>
              <span className="mono">TRC-{traceId} · 3 events · completeness 0.94</span>
            </div>
          </div>
        </div>
      </div>

      <div className="console__pane">
        <div className="console__head mono">
          <span>Payout ledger</span>
          <span className="muted">revenue</span>
        </div>
        <table className="ledger mono">
          <thead>
            <tr>
              <th>Trace</th>
              <th>Destination</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((e, i) => (
              <tr key={e.id} className={i === 0 ? "is-new" : ""}>
                <td>TRC-{e.id}</td>
                <td>AI Labs API</td>
                <td className="pos">+{money(e.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ledger__total">
          <span className="mono muted">Accrued this month</span>
          <b className="mono">{money(total)}</b>
        </div>
      </div>
      <p className="console__note mono">Illustrative figures. Payouts depend on the Graph Quality Score: trace completeness, signal-to-noise and domain value.</p>
    </div>
  );
}
