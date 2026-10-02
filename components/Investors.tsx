"use client";

import { useRef } from "react";
import { useInView } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { Counter } from "./ui/Counter";
import { IconArrow, IconCheck, IconX } from "./ui/Icons";
import { Watermark } from "./ui/Watermark";
import { links } from "@/lib/site";

const labsY = [24, 82, 140, 198, 256];

function MultiLicense() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  return (
    <div ref={ref} className={`ml ${inView ? "is-in" : ""}`}>
      <svg viewBox="0 0 560 300" className="ml__svg" aria-label="One processed dataset licensed to five AI labs at the same time.">
        <g className="ml-src">
          <rect x="8" y="96" width="176" height="108" rx="3" />
          <text x="24" y="124" className="ml-k">DAILY DATA SLICE</text>
          <text x="24" y="150" className="ml-t">Causal graph</text>
          <text x="24" y="170" className="ml-s">processed once</text>
          <text x="24" y="188" className="ml-s">ETL cost paid 1×</text>
        </g>
        <path pathLength={1} className="ml-bus" d="M184 150 H262" />
        <path pathLength={1} className="ml-bus" d="M262 44 V276" style={{ animationDelay: "0.35s" }} />
        {labsY.map((y, i) => (
          <g key={y} className="ml-lab" style={{ transitionDelay: `${0.7 + i * 0.12}s` }}>
            <path pathLength={1} className="ml-line" d={`M262 ${y + 20} H326`} style={{ animationDelay: `${0.6 + i * 0.12}s` }} />
            <rect x="328" y={y} width="226" height="40" rx="3" />
            <text x="342" y={y + 25} className="ml-t2">AI Lab {String.fromCharCode(65 + i)}</text>
            <text x="542" y={y + 25} textAnchor="end" className={`ml-m ${i === 0 ? "" : "is-pure"}`}>
              {i === 0 ? "license #1" : "~100% margin"}
            </text>
            <circle r="3.5" className="ml-pulse">
              <animateMotion dur="2.4s" begin={`${-i * 0.45}s`} repeatCount="indefinite" path={`M184 150 H262 V${y + 20} H326`} />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

const kpis = [
  { pre: "85–", to: 90, suf: "%", t: "Target gross margin on processing", d: "Software ETL, no human labeling in the loop." },
  { pre: "", to: 100, suf: "%", t: "Margin on every repeat license", d: "The same dataset, sold again at near-zero cost." },
  { pre: "3–", to: 5, suf: "", t: "AI labs per dataset", d: "Non-exclusive multi-licensing." },
  { pre: "5–", to: 30, suf: "%", t: "Dynamic revenue share to donors", d: "Set by each company's Graph Quality Score." },
  { pre: "<", to: 24, suf: "h", t: "From connection to first data shipped", d: "Zero-integration onboarding via OAuth." },
  { pre: ">", to: 10, suf: ":1", t: "Target LTV / CAC", d: "Free onboarding, recurring lab contracts." },
];

const compare = [
  ["How data is cleaned", "Armies of human labelers", "Programmatic SLM pipeline"],
  ["What is delivered", "Static historical archives", "A live daily API stream"],
  ["Time to revenue", "Months of audits and parsing", "Under 24 hours"],
  ["Unit economics", "Capped by the cost of human hours", "SaaS margins + multi-licensing"],
];

export function Investors() {
  return (
    <section className="section investors" id="investors" data-rail="Business model">
      <Watermark word="SCALE" top="2%" />
      <div className="container">
        <div className="section__head">
          <Reveal>
            <Eyebrow>For investors · Business model</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2">
              Data-factory demand. <span className="hl-blue">SaaS margins.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Frontier labs spend heavily on training data. We supply it with software instead of armies of labelers — and license every processed
              dataset more than once.
            </p>
          </Reveal>
        </div>

        <div className="split split--model">
          <div className="split__text">
            <Reveal>
              <h3 className="h3">Process once. License many times.</h3>
            </Reveal>
            <ol className="ticks">
              <Reveal as="li" delay={0.05}>
                <span className="num">01</span>
                <p>
                  Each daily slice of a company&apos;s data is processed <b>once</b> — the ETL cost is paid one time.
                </p>
              </Reveal>
              <Reveal as="li" delay={0.12}>
                <span className="num">02</span>
                <p>
                  The clean graph is licensed <b>non-exclusively to 3–5 labs</b> at the same time via API subscription.
                </p>
              </Reveal>
              <Reveal as="li" delay={0.19}>
                <span className="num">03</span>
                <p>
                  Every repeat license is <b>almost pure margin</b>. Donor businesses receive their revenue share from each sale.
                </p>
              </Reveal>
            </ol>
          </div>
          <Reveal className="split__visual" delay={0.1}>
            <MultiLicense />
          </Reveal>
        </div>

        <div className="kpis">
          {kpis.map((k, i) => (
            <Reveal key={k.t} className="kpi" delay={(i % 3) * 0.08}>
              <b className="kpi__v">
                {k.pre}
                <Counter to={k.to} />
                {k.suf}
              </b>
              <span className="kpi__t">{k.t}</span>
              <span className="kpi__d muted">{k.d}</span>
            </Reveal>
          ))}
        </div>
        <p className="footnote mono">Targets from the company&apos;s financial model. Not historical results.</p>

        <div className="streams">
          <Reveal className="stream card">
            <p className="label">Demand side · AI labs pay</p>
            <h3 className="h4">Hybrid API subscription</h3>
            <p className="muted">Platform access plus volume, priced by domain value. Annual contracts, billed monthly.</p>
            <ul className="tiers">
              <li>
                <b>Entry</b>
                <span>Weekly stream · general tech domains</span>
              </li>
              <li>
                <b>Core</b>
                <span>Daily stream · premium verticals · deeper ontology metadata</span>
              </li>
              <li>
                <b>Enterprise</b>
                <span>Regulated domains · custom pipelines · 30–60-day exclusivity window</span>
              </li>
            </ul>
          </Reveal>
          <Reveal className="stream card" delay={0.1}>
            <p className="label">Supply side · businesses earn</p>
            <h3 className="h4">Free to join, paid to stay</h3>
            <p className="muted">Donor companies pay nothing. Revenue share keeps them connected; CorpTwin analytics keeps them engaged.</p>
            <ul className="tiers">
              <li>
                <b>Connect</b>
                <span>Free · read-only OAuth · about 5 minutes</span>
              </li>
              <li>
                <b>Earn</b>
                <span>5–30% revenue share, paid monthly, by Graph Quality Score</span>
              </li>
              <li>
                <b>Use</b>
                <span>Free CorpTwin process analytics dashboard</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="compare">
          <table>
            <caption className="label">Why software beats manual data vendors</caption>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Traditional data vendors</th>
                <th scope="col" className="is-us">
                  biznet.work
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td data-label="Traditional vendors">
                    <IconX width={14} height={14} /> {a}
                  </td>
                  <td className="is-us" data-label="biznet.work">
                    <IconCheck width={14} height={14} /> {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

const market = [
  { k: "TAM", v: ">$100B", d: "Data-driven AI development & foundation-model training" },
  { k: "SAM", v: "$20B", d: "Data-as-a-Service for frontier AI labs" },
  { k: "SOM", v: "$5B", d: "Reachable in 3–5 years via tech-forward SMBs & agencies" },
];

const roadmap = [
  {
    y: "Year 1",
    arr: 5,
    items: ["Core platform live", "Slack, GitHub, Jira connectors", "1,000+ donor businesses", "Contracts with 3–5 AI labs"],
  },
  {
    y: "Year 3",
    arr: 25,
    items: ["Multi-licensing flywheel at scale", "Premium verticals: legal, fintech", "More connectors, incl. meetings & design"],
  },
  {
    y: "Year 5",
    arr: 100,
    items: ["Default infrastructure for reasoning data", "Predictive process analytics for every donor"],
  },
];

function MarketCircles() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  return (
    <div ref={ref} className={`mkt ${inView ? "is-in" : ""}`}>
      <div className="mkt__rings" aria-hidden>
        <span className="mkt__ring mkt__ring--1" />
        <span className="mkt__ring mkt__ring--2" />
        <span className="mkt__ring mkt__ring--3" />
        <span className="mkt__lbl mkt__lbl--1 mono">TAM</span>
        <span className="mkt__lbl mkt__lbl--2 mono">SAM</span>
        <span className="mkt__lbl mkt__lbl--3 mono">SOM</span>
      </div>
      <ul className="mkt__list">
        {market.map((m, i) => (
          <li key={m.k} style={{ transitionDelay: `${0.3 + i * 0.15}s` }}>
            <span className="label">{m.k}</span>
            <b>{m.v}</b>
            <span className="muted">{m.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Market() {
  return (
    <section className="section market" id="market" data-rail="Market & plan">
      <div className="container">
        <div className="split split--market">
          <div className="split__text">
            <Reveal>
              <Eyebrow>For investors · Market</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h2">The race moved from GPUs to data.</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lead">
                Compute and model architectures are converging. The scarce input is now high-quality human reasoning data — and whoever owns the
                pipeline to it owns a toll road for the whole industry.
              </p>
            </Reveal>
          </div>
          <Reveal className="split__visual" delay={0.1}>
            <MarketCircles />
          </Reveal>
        </div>
        <p className="footnote mono">Company estimates, bottom-up and top-down.</p>

        <div className="roadmap">
          <Reveal>
            <p className="label">Roadmap & ARR targets</p>
          </Reveal>
          <ol className="roadmap__list">
            {roadmap.map((r, i) => (
              <Reveal as="li" key={r.y} className="roadmap__item" delay={i * 0.12}>
                <span className="roadmap__dot" aria-hidden />
                <span className="mono roadmap__y">{r.y}</span>
                <b className="roadmap__arr">
                  $<Counter to={r.arr} />M <small>ARR</small>
                </b>
                <ul>
                  {r.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="ask">
          <div>
            <p className="label label--light">The ask</p>
            <h3 className="h3">We are raising a Seed round to build the infrastructure layer between business and AI.</h3>
          </div>
          <ol className="ask__list">
            <li>
              <span className="num">01</span> Zero-Trust cloud infrastructure for the data pipeline
            </li>
            <li>
              <span className="num">02</span> ML engineers for the SLM routers and the PII Shield
            </li>
            <li>
              <span className="num">03</span> Enterprise sales to AI labs and growth of the donor network
            </li>
          </ol>
          <a className="btn btn--yellow btn--lg" href={links.deck}>
            Request the investor deck <IconArrow width={18} height={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
