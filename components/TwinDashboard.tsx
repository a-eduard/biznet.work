"use client";

import { useRef } from "react";
import { useInView } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { Counter } from "./ui/Counter";
import { LogoMark } from "./ui/Logo";
import { IconCheck, IconClock, IconEye, IconPulse } from "./ui/Icons";
import { Watermark } from "./ui/Watermark";

const teams = [
  { k: "Design", v: 1.9 },
  { k: "Dev_Team", v: 3.1 },
  { k: "QA_Review", v: 4.8, hot: true },
  { k: "Ops", v: 2.2 },
];

const leaks = [
  { k: "Waiting for approval", v: 41 },
  { k: "Rework loops", v: 27 },
  { k: "Context switching", v: 18 },
  { k: "Meetings without a decision", v: 14 },
];

const features = [
  { Icon: IconEye, t: "See the real process", d: "Not the org chart — the way work actually moves between people and tools." },
  { Icon: IconClock, t: "Bottlenecks in dollars", d: "Idle time and rework translated into payroll you are paying for nothing." },
  { Icon: IconPulse, t: "No manual reports", d: "Built from the same data stream. Nobody fills in a single timesheet." },
];

function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });
  return (
    <div ref={ref} className={`dash ${inView ? "is-in" : ""}`}>
      <div className="dash__bar mono">
        <span className="dash__brand">
          <LogoMark /> CorpTwin
        </span>
        <span className="dash__crumbs">acme-co / overview</span>
        <span className="dash__range">Last 30 days</span>
        <span className="dash__live">
          <span className="live-dot" /> live · sample data
        </span>
      </div>

      <div className="dash__grid">
        <div className="tile">
          <span className="tile__k mono">Team signal-to-noise</span>
          <b className="tile__v">
            <Counter to={82} suffix="%" />
          </b>
          <span className="tile__d mono up">▲ 4 pts</span>
          <span className="meter">
            <i style={{ width: inView ? "82%" : 0 }} />
          </span>
        </div>
        <div className="tile">
          <span className="tile__k mono">Avg. trace completeness</span>
          <b className="tile__v">
            <Counter to={94} suffix="%" />
          </b>
          <span className="tile__d mono up">▲ 7 pts</span>
          <span className="meter">
            <i style={{ width: inView ? "94%" : 0 }} />
          </span>
        </div>
        <div className="tile">
          <span className="tile__k mono">Graph Quality Score</span>
          <b className="tile__v">
            <Counter to={0.87} decimals={2} />
          </b>
          <span className="tile__d mono">Tier A · RevShare 24%</span>
          <span className="meter meter--yellow">
            <i style={{ width: inView ? "87%" : 0 }} />
          </span>
        </div>
        <div className="tile">
          <span className="tile__k mono">RevShare accrued</span>
          <b className="tile__v">
            <Counter to={3412} prefix="$" />
          </b>
          <span className="tile__d mono up">▲ 18% vs last month</span>
          <svg className="spark" viewBox="0 0 240 34" aria-hidden>
            <path pathLength={1} d="M2 30 L24 27 L48 28.5 L72 22 L96 23.5 L120 17 L144 18.5 L168 12 L192 13.5 L216 7 L238 4" />
          </svg>
        </div>

        <div className="widget widget--flow">
          <div className="widget__head mono">
            <span>Process flow · feature delivery</span>
            <span className="tag tag--red mono">1 bottleneck</span>
          </div>
          <div className="flowmap-scroll">
          <svg className="flowmap" viewBox="-70 0 700 180" aria-label="Sample process flow: Backlog, Dev team, QA review, Release. A rework loop between QA and Dev causes 48 hours of idle time.">
            <defs>
              <marker id="fm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 1 L9 5 L0 9 z" fill="#8a8a84" />
              </marker>
              <marker id="fm-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 1 L9 5 L0 9 z" fill="#FF5C61" />
              </marker>
            </defs>
            <path pathLength={1} className="fm-edge" d="M104 70 H142" markerEnd="url(#fm-a)" />
            <path pathLength={1} className="fm-edge is-hot is-thick" d="M246 70 H312" markerEnd="url(#fm-r)" />
            <path pathLength={1} className="fm-edge" d="M416 70 H454" markerEnd="url(#fm-a)" />
            <path pathLength={1} className="fm-edge is-hot is-dash" d="M364 94 V140 H194 V96" markerEnd="url(#fm-r)" />
            {[
              { x: 14, t: "Backlog", s: "214 tasks" },
              { x: 144, t: "Dev_Team", s: "avg 3.1d" },
              { x: 314, t: "QA_Review", s: "avg 4.8d", hot: true },
              { x: 456, t: "Release", s: "38 / mo" },
            ].map((n) => (
              <g key={n.t} className={`fm-node ${n.hot ? "is-hot" : ""}`}>
                <rect x={n.x} y="46" width={n.t === "Backlog" || n.t === "Release" ? 90 : 102} height="48" rx="3" />
                <text x={n.x + 10} y="66" className="fm-t">{n.t}</text>
                <text x={n.x + 10} y="82" className="fm-s">{n.s}</text>
              </g>
            ))}
            <g className="fm-tag">
              <rect x="208" y="8" width="144" height="24" rx="2" />
              <text x="280" y="24" textAnchor="middle">Idle 48h → $1,250</text>
            </g>
            <text x="279" y="164" textAnchor="middle" className="fm-loop">rework loop · 31% of tasks return to Dev</text>
          </svg>
          </div>
        </div>

        <div className="widget">
          <div className="widget__head mono">
            <span>Cycle time by team, days</span>
          </div>
          <ul className="bars">
            {teams.map((t, i) => (
              <li key={t.k} className={t.hot ? "is-hot" : ""}>
                <span className="mono">{t.k}</span>
                <span className="bars__track">
                  <i style={{ width: inView ? `${(t.v / 5) * 100}%` : 0, transitionDelay: `${0.2 + i * 0.1}s` }} />
                </span>
                <b className="mono">{t.v.toFixed(1)}</b>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget widget--ok">
          <div className="widget__head mono">
            <span>Resolved</span>
            <span className="tag tag--green mono">
              <IconCheck width={12} height={12} /> fixed
            </span>
          </div>
          <p className="resolved">
            Bottleneck resolved: <span className="mono">Dev_Team → QA_Review</span>
          </p>
          <div className="beforeafter mono">
            <div>
              <span>before</span>
              <i style={{ width: inView ? "100%" : 0 }} />
              <b>7.9d</b>
            </div>
            <div className="is-after">
              <span>after</span>
              <i style={{ width: inView ? "65%" : 0 }} />
              <b>5.1d</b>
            </div>
          </div>
          <p className="resolved__big">
            Cycle time <b>−35%</b>
          </p>
        </div>

        <div className="widget">
          <div className="widget__head mono">
            <span>Where payroll leaks</span>
          </div>
          <ul className="leaks">
            {leaks.map((l, i) => (
              <li key={l.k}>
                <span>{l.k}</span>
                <b className="mono">{l.v}%</b>
                <span className="leaks__track">
                  <i style={{ width: inView ? `${l.v * 2}%` : 0, transitionDelay: `${0.3 + i * 0.1}s` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TwinDashboard() {
  return (
    <section className="section section--dark twin" id="corptwin" data-rail="CorpTwin">
      <Watermark word="TWIN" tone="dark" top="2%" />
      <div className="container">
        <div className="section__head">
          <Reveal>
            <Eyebrow tone="light">Free for every business · CorpTwin</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2">A free X-ray of how your company really works.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              To build data for AI labs, we map a company&apos;s processes anyway. The business gets that map — its Corporate Digital Twin — at no
              cost: bottlenecks, idle time, rework loops and what they cost in payroll.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Dashboard />
        </Reveal>
        <div className="twin__features">
          {features.map(({ Icon, t, d }, i) => (
            <Reveal key={t} className="twin__feature" delay={i * 0.1}>
              <Icon width={22} height={22} />
              <h3 className="h4">{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
