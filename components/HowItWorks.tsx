"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { IconBranch, IconChat, IconCoin, IconTicket, IconVideo } from "./ui/Icons";

const sources = [
  { name: "Slack", what: "Messages & threads", Icon: IconChat },
  { name: "Jira", what: "Tasks & statuses", Icon: IconTicket },
  { name: "GitHub", what: "Commits & reviews", Icon: IconBranch },
  { name: "Google Meet", what: "Call transcripts", Icon: IconVideo },
];

const stages = [
  {
    k: "SLM router",
    d: "Classifies every event",
    in: "“guys, let's move billing to a queue?”",
    out: "Event.Execution.Architecture_Debate",
  },
  {
    k: "Causal graph",
    d: "Links cause → effect",
    in: "debate · PRJ-412 · a3f9c2",
    out: "Debate ─CAUSES→ Task ─IMPLEMENTS→ Commit",
  },
  {
    k: "PII Shield",
    d: "Removes people & secrets",
    in: "Anna Petrova · sk-live-7f3a…",
    out: "[User_A] · [REDACTED_SECRET]",
  },
];

const labs = ["Lab A", "Lab B", "Lab C"];

const steps = [
  {
    n: "01",
    t: "Connect",
    d: "The business grants read-only access via OAuth. It takes about five minutes. The team keeps working exactly as before.",
  },
  {
    n: "02",
    t: "Structure",
    d: "Lightweight SLM routers sort every message, ticket and commit into a 5-level enterprise ontology and link them into a causal graph: who decided what, why, and what it led to.",
  },
  {
    n: "03",
    t: "Protect",
    d: "The PII Shield replaces names, clients, keys and financials with tokens before anything leaves the company's perimeter. IT can audit every record.",
  },
  {
    n: "04",
    t: "Deliver & earn",
    d: "AI labs receive the graphs as a continuous JSON stream via API. The business receives a revenue share every month.",
  },
];

/** Deterministic pseudo-random so server and client render the same particles. */
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Flow({ kind }: { kind: "chaos" | "order" }) {
  const count = kind === "chaos" ? 14 : 9;
  return (
    <div className={`flow flow--${kind}`} aria-hidden>
      <span className="flow__rail" />
      {Array.from({ length: count }).map((_, i) => {
        const style =
          kind === "chaos"
            ? {
                "--pos": `${(8 + rnd(i, 1) * 84).toFixed(1)}%`,
                "--size": `${3 + Math.round(rnd(i, 2) * 5)}px`,
                "--dur": `${(1.6 + rnd(i, 3) * 1.8).toFixed(2)}s`,
                "--delay": `${(-rnd(i, 4) * 3).toFixed(2)}s`,
                "--wob": `${((rnd(i, 5) - 0.5) * 26).toFixed(1)}px`,
              }
            : {
                "--pos": `${[22, 50, 78][i % 3]}%`,
                "--size": "7px",
                "--dur": "2.4s",
                "--delay": `${(-(Math.floor(i / 3) * 0.8 + (i % 3) * 0.27)).toFixed(2)}s`,
                "--wob": "0px",
              };
        return <span key={i} className="flow__p" style={style as CSSProperties} />;
      })}
    </div>
  );
}

function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, threshold: 0.25 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 1900);
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <div ref={ref} className={`pipe ${inView ? "is-running" : ""}`}>
      <div className="pipe__col">
        <div className="pipe__head">
          <span className="label">The business's tools</span>
          <span className="tag tag--muted mono">read-only</span>
        </div>
        <ul className="pipe__list">
          {sources.map(({ name, what, Icon }) => (
            <li key={name}>
              <Icon width={20} height={20} />
              <div>
                <b>{name}</b>
                <span className="muted">{what}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="pipe__foot mono">Unstructured · noisy · contains PII</p>
      </div>

      <Flow kind="chaos" />

      <div className="pipe__col pipe__core">
        <div className="pipe__head">
          <span className="label label--light">biznet.work core</span>
          <span className="tag tag--yellow mono">automated</span>
        </div>
        <ol className="stages">
          {stages.map((s, i) => (
            <li key={s.k} className={`stage ${i === active ? "is-active" : ""}`} onMouseEnter={() => setActive(i)}>
              <div className="stage__top">
                <span className="mono stage__n">0{i + 1}</span>
                <b>{s.k}</b>
                <span className="stage__d">{s.d}</span>
              </div>
              <div className="stage__io mono">
                <span className="stage__in">{s.in}</span>
                <span className="stage__arrow">→</span>
                <span className="stage__out">{s.out}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="pipe__foot mono">No human labeling · ETL runs once per data slice</p>
      </div>

      <Flow kind="order" />

      <div className="pipe__col">
        <div className="pipe__head">
          <span className="label">Frontier AI labs</span>
          <span className="tag tag--blue mono">API</span>
        </div>
        <div className="pipe__api mono">GET /v1/stream/daily</div>
        <ul className="pipe__labs">
          {labs.map((l, i) => (
            <li key={l}>
              <span className="pipe__lab">{l}</span>
              <span className="pipe__ticks" style={{ animationDelay: `${i * 0.4}s` }}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </li>
          ))}
        </ul>
        <p className="pipe__foot mono">Clean causal graphs · JSON · legally clear</p>
      </div>

      <div className="pipe__return">
        <div className="pipe__coins" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${-i * 1.1}s` }}>
              <IconCoin width={18} height={18} />
            </span>
          ))}
        </div>
        <p>
          <b>Revenue share flows back to the business</b> <span className="muted">— 5–30% of every sale, paid monthly</span>
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="section how" id="how" data-rail="How it works">
      <div className="container">
        <div className="section__head">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2">
              From daily chaos to a clean data stream. <span className="hl-blue">Automatically.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">No consultants, no new software for the team, no manual labeling. One pipeline, four steps, fully programmatic.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Pipeline />
        </Reveal>

        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} className="step" delay={i * 0.1}>
              <span className="num">{s.n}</span>
              <h3 className="h4">{s.t}</h3>
              <p className="muted">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
