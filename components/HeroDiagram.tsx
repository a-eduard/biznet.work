"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { IconLock } from "./ui/Icons";

/**
 * Hero visual: a process-mining view of a company. BPMN swimlanes, telemetry
 * badges and a heatmap that flags one bottleneck. Pure SVG + CSS animation.
 */

type Task = { id: string; x: number; y: number; title: string; src: string; tone?: "warm" };
const W = 124;
const H = 46;

const tasks: Task[] = [
  { id: "n1", x: 250, y: 66, title: "Feature request", src: "slack · #product" },
  { id: "n2", x: 420, y: 66, title: "Spec debate", src: "meet · 42 min", tone: "warm" },
  { id: "n3", x: 420, y: 200, title: "Task created", src: "jira · PRJ-412" },
  { id: "n4", x: 560, y: 334, title: "Commit", src: "github · a3f9c2" },
];

const badges = [
  { x: 188, y: 26, text: "1,402 ev · avg 4.2h" },
  { x: 358, y: 26, text: "866 ev · avg 2.1h" },
  { x: 358, y: 230, text: "512 ev · avg 6.0h" },
  { x: 498, y: 364, text: "2,190 ev · avg 1.3h" },
];

const lanes = [
  { y: 0, name: "COMMUNICATION", sub: "Slack · Meet" },
  { y: 134, name: "MANAGEMENT", sub: "Jira" },
  { y: 268, name: "EXECUTION", sub: "GitHub" },
];

const MAIN_PATH = "M150 66 H420 V200 H560 V334 H748";
const LOOP_PATH = "M560 200 V66 H420";

function Diamond({ x, y, r, hot }: { x: number; y: number; r: number; hot?: boolean }) {
  return (
    <g className={`hd-node hd-gateway ${hot ? "is-hot" : ""}`}>
      <polygon points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`} />
      <path d={`M${x - r * 0.32} ${y - r * 0.32} L${x + r * 0.32} ${y + r * 0.32} M${x + r * 0.32} ${y - r * 0.32} L${x - r * 0.32} ${y + r * 0.32}`} />
    </g>
  );
}

export function HeroDiagram() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [events, setEvents] = useState(12408);

  // On narrow screens the map is scrollable — start with the bottleneck in view.
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setEvents((v) => v + 1 + Math.floor(Math.random() * 3)), 1400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="hd">
      <div className="hd__bar">
        <div className="hd__title mono">
          <span className="live-dot" aria-hidden />
          <span>CorpTwin</span>
          <span className="hd__sep">/</span>
          <span>process-map</span>
          <span className="hd__sep">/</span>
          <span className="hd__muted">acme-co (sample)</span>
        </div>
        <div className="hd__filters mono" aria-hidden>
          <span className="chk is-on">Filter noise</span>
          <span className="chk is-on">Causal links</span>
          <span className="chk is-locked">
            PII data <IconLock width={12} height={12} />
          </span>
        </div>
      </div>

      <div className="hd__scroll" ref={scroller}>
        <svg className="hd__svg" viewBox="0 0 780 400" role="img" aria-label="Process map of a sample company. The algorithm flags a bottleneck at the client approval step: 48 hours of idle time, $1,250 of payroll lost.">
          <defs>
            <filter id="hd-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <marker id="hd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill="#8C8C84" />
            </marker>
            <marker id="hd-arrow-hot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill="#E5484D" />
            </marker>
            <pattern id="hd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#E7E7E1" strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* swimlanes */}
          <rect x="0" y="0" width="780" height="400" fill="url(#hd-grid)" />
          {lanes.map((l, i) => (
            <g key={l.name} className="hd-lane">
              <rect x="0" y={l.y} width="118" height="132" className="hd-lane__head" />
              {i > 0 && <line x1="0" x2="780" y1={l.y - 1} y2={l.y - 1} className="hd-lane__rule" />}
              <text x="14" y={l.y + 60} className="hd-lane__name">{l.name}</text>
              <text x="14" y={l.y + 77} className="hd-lane__sub">{l.sub}</text>
              <text x="14" y={l.y + 22} className="hd-lane__idx">L{i + 1}</text>
            </g>
          ))}
          <line x1="118" x2="118" y1="0" y2="400" className="hd-lane__rule" />

          {/* heatmap */}
          <g className="hd-heat" filter="url(#hd-blur)">
            <circle cx="250" cy="66" r="44" fill="#2F9E6B" opacity="0.22" />
            <circle cx="420" cy="66" r="46" fill="#F2B33A" opacity="0.38" className="hd-heat__warm" />
            <circle cx="420" cy="200" r="40" fill="#1D52A8" opacity="0.18" />
            <circle cx="560" cy="334" r="42" fill="#2F9E6B" opacity="0.2" />
            <circle cx="690" cy="334" r="36" fill="#1D52A8" opacity="0.16" />
            <circle cx="560" cy="200" r="86" fill="#F08A24" opacity="0.42" className="hd-heat__halo" />
            <circle cx="560" cy="200" r="50" fill="#E5484D" opacity="0.75" className="hd-heat__core" />
            <rect x="548" y="70" width="24" height="130" fill="#E5484D" opacity="0.35" />
          </g>

          {/* edges */}
          <g className="hd-edges">
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "0.2s" }} d="M161 66 H188" markerEnd="url(#hd-arrow)" />
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "0.35s" }} d="M312 66 H358" markerEnd="url(#hd-arrow)" />
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "0.5s" }} d="M420 89 V177" markerEnd="url(#hd-arrow)" />
            <path pathLength={1} className="hd-edge is-hot" style={{ animationDelay: "0.65s" }} d="M482 200 H532" markerEnd="url(#hd-arrow-hot)" />
            <path pathLength={1} className="hd-edge is-hot is-loop" style={{ animationDelay: "0.8s" }} d="M560 174 V66 H484" markerEnd="url(#hd-arrow-hot)" />
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "0.95s" }} d="M560 226 V309" markerEnd="url(#hd-arrow)" />
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "1.1s" }} d="M622 334 H656" markerEnd="url(#hd-arrow)" />
            <path pathLength={1} className="hd-edge" style={{ animationDelay: "1.25s" }} d="M702 334 H734" markerEnd="url(#hd-arrow)" />
          </g>
          <g className="hd-labels">
            <text x="568" y="126" className="hd-branch is-hot">[No] 38% → rework</text>
            <text x="568" y="272" className="hd-branch">[Yes]</text>
            <text x="706" y="326" className="hd-branch">[Yes]</text>
          </g>

          {/* telemetry badges */}
          {badges.map((b, i) => (
            <g key={b.text} className="hd-badge" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
              <rect x={b.x} y={b.y} width="104" height="14" rx="2" />
              <text x={b.x + 6} y={b.y + 10}>{b.text}</text>
            </g>
          ))}
          <g className="hd-badge is-hot" style={{ animationDelay: "1s" }}>
            <rect x="590" y="158" width="108" height="14" rx="2" />
            <text x="596" y="168">311 ev · avg 48.2h</text>
          </g>

          {/* start / end */}
          <g className="hd-node" style={{ animationDelay: "0.1s" }}>
            <circle cx="150" cy="66" r="11" className="hd-event" />
            <text x="150" y="100" textAnchor="middle" className="hd-cap">Request</text>
          </g>
          <g className="hd-node" style={{ animationDelay: "1.3s" }}>
            <circle cx="748" cy="334" r="12" className="hd-event hd-event--end" />
            <text x="748" y="364" textAnchor="middle" className="hd-cap">Deploy</text>
          </g>

          {/* tasks */}
          {tasks.map((t, i) => (
            <g key={t.id} className={`hd-node hd-task ${t.tone === "warm" ? "is-warm" : ""}`} style={{ animationDelay: `${0.25 + i * 0.22}s` }}>
              <rect x={t.x - W / 2} y={t.y - H / 2} width={W} height={H} rx="3" />
              <text x={t.x - W / 2 + 10} y={t.y - 3} className="hd-task__title">{t.title}</text>
              <text x={t.x - W / 2 + 10} y={t.y + 12} className="hd-task__src">{t.src}</text>
            </g>
          ))}

          {/* gateways */}
          <g style={{ animationDelay: "0.9s" }} className="hd-node-wrap">
            <Diamond x={560} y={200} r={26} hot />
          </g>
          <text x="592" y="204" className="hd-gw-label is-hot">Client approval?</text>
          <g style={{ animationDelay: "1.15s" }} className="hd-node-wrap">
            <Diamond x={680} y={334} r={22} />
          </g>
          <text x="680" y="378" textAnchor="middle" className="hd-gw-label">Review approved?</text>

          {/* queue piling up in front of the bottleneck */}
          <g className="hd-queue">
            <rect x="498" y="186" width="6" height="6" />
            <rect x="507" y="186" width="6" height="6" />
            <rect x="516" y="186" width="6" height="6" />
            <rect x="498" y="208" width="6" height="6" />
            <rect x="507" y="208" width="6" height="6" />
          </g>

          {/* moving work items */}
          {!reduced && (
            <g className="hd-packets">
              {[0, -1.75, -3.5, -5.25].map((b) => (
                <rect key={b} x="-3.5" y="-3.5" width="7" height="7" className="hd-packet">
                  <animateMotion dur="7s" begin={`${b}s`} repeatCount="indefinite" path={MAIN_PATH} />
                </rect>
              ))}
              {[0, -1.8].map((b) => (
                <circle key={b} r="3.5" className="hd-packet is-hot">
                  <animateMotion dur="3.6s" begin={`${b}s`} repeatCount="indefinite" path={LOOP_PATH} />
                </circle>
              ))}
            </g>
          )}

          {/* cursor + tooltip */}
          <g className="hd-cursor">
            <path d="M566 206 l0 17 l4.5 -4.2 l3.2 7 l3 -1.4 l-3.2 -6.8 l6 -0.2 z" />
          </g>
          <g className="hd-tip">
            <rect x="588" y="212" width="184" height="92" rx="3" />
            <rect x="588" y="212" width="3" height="92" className="hd-tip__accent" />
            <text x="600" y="229" className="hd-tip__head">[!] BOTTLENECK DETECTED</text>
            <text x="600" y="247"><tspan className="hd-tip__k">Node ID</tspan><tspan x="704">#884A</tspan></text>
            <text x="600" y="261"><tspan className="hd-tip__k">Idle time</tspan><tspan x="704">48h 12m</tspan></text>
            <text x="600" y="275"><tspan className="hd-tip__k">Trace compl.</tspan><tspan x="704" className="hd-tip__warn">42% · low</tspan></text>
            <text x="600" y="289"><tspan className="hd-tip__k">Value loss</tspan><tspan x="704" className="hd-tip__warn">$1,250</tspan></text>
          </g>
        </svg>
      </div>

      <div className="hd__foot mono">
        <span>
          Events / 24h <b>{events.toLocaleString("en-US")}</b>
        </span>
        <span>
          Trace completeness <b>91%</b>
        </span>
        <span>
          Signal / noise <b>0.82</b>
        </span>
        <span className="hd__ok">
          PII <b>masked</b>
        </span>
        <span className="hd__hint">← Swipe to explore</span>
      </div>
    </div>
  );
}
