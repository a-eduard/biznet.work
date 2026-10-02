"use client";

import { useRef } from "react";
import { useInView } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { Watermark } from "./ui/Watermark";

const seen = ["Encyclopedias", "Books & papers", "Forums & social media", "Public code", "News & blogs"];

const trace = [
  { k: "Idea", src: "meet" },
  { k: "Debate", src: "slack" },
  { k: "Decision", src: "meet" },
  { k: "Task", src: "jira" },
  { k: "Code", src: "github" },
  { k: "Release", src: "deploy" },
];

const why = [
  {
    t: "The open web is used up",
    d: "Frontier models have already been trained on most of the public text that exists. More scraping adds little.",
  },
  {
    t: "Synthetic data backfires",
    d: "Training models on AI-generated text degrades them over time — a failure known as model collapse.",
  },
  {
    t: "Manual vendors don't scale",
    d: "Cleaning and labeling corporate archives by hand takes months, costs a fortune and carries GDPR & IP risk.",
  },
];

function DataWallVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  return (
    <div ref={ref} className={`wall ${inView ? "is-in" : ""}`}>
      <div className="wall__card">
        <div className="wall__head">
          <span className="label">What AI has already read</span>
          <span className="tag tag--muted mono">Exhausted</span>
        </div>
        <ul className="wall__seen">
          {seen.map((s, i) => (
            <li key={s} style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
              <span>{s}</span>
              <span className="stamp mono">read</span>
            </li>
          ))}
        </ul>
        <p className="wall__note muted">Results of human work. Already inside every large model.</p>
      </div>

      <div className="wall__card wall__card--key">
        <div className="wall__head">
          <span className="label">What AI has never seen</span>
          <span className="tag tag--blue mono">Untapped</span>
        </div>
        <ol className="trace">
          {trace.map((s, i) => (
            <li key={s.k} style={{ transitionDelay: `${0.6 + i * 0.16}s` }}>
              <span className="trace__dot" />
              <span className="trace__k">{s.k}</span>
              <span className="trace__src mono">{s.src}</span>
            </li>
          ))}
        </ol>
        <p className="wall__note">
          <strong>The process behind the result — Reasoning Data.</strong> It lives inside companies, buried in chats and tickets, mixed with
          personal data and trade secrets.
        </p>
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <section className="section problem" id="problem" data-rail="The problem">
      <Watermark word="WALL" top="3%" />
      <div className="container">
        <div className="split">
          <div className="split__text">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h2">AI has hit the data wall.</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lead">
                The next generation of AI is agents that plan, coordinate and ship real work. To learn that, models must see the path from an idea
                to a result — the debates, decisions and hand-offs in between.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="muted">
                The open internet only contains the final results. The path itself is private — and it is exactly what frontier AI labs are now
                willing to pay for.
              </p>
            </Reveal>
          </div>
          <Reveal className="split__visual" delay={0.1}>
            <DataWallVisual />
          </Reveal>
        </div>

        <div className="why">
          {why.map((w, i) => (
            <Reveal key={w.t} className="why__item" delay={i * 0.1}>
              <span className="num">0{i + 1}</span>
              <h3 className="h4">{w.t}</h3>
              <p className="muted">{w.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
