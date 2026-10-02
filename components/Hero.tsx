import { HeroDiagram } from "./HeroDiagram";
import { Eyebrow } from "./ui/Eyebrow";
import { IconArrow, IconArrowDown } from "./ui/Icons";
import { Watermark } from "./ui/Watermark";
import { links } from "@/lib/site";

const proof = ["Read-only access", "5-minute setup", "PII removed at source", "5–30% revenue share"];

export function Hero() {
  return (
    <section className="hero" id="top" data-rail="Overview">
      <Watermark word="TRACE" top="2%" />
      <div className="container">
        <div className="hero__intro">
          <Eyebrow>Enterprise 5.0 Data Infrastructure</Eyebrow>
          <h1 className="h1 hero__title">
            <span className="line"><span>We turn business chaos</span></span>
            <span className="line">
              <span>
                into <mark className="marker">AI-ready data.</mark>
              </span>
            </span>
          </h1>
        </div>

        <div className="hero__grid">
          <div className="hero__lead fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="lead">
              <strong>biznet.work</strong> connects read-only to the tools a team already uses — Slack, Jira, GitHub, Google Meet — strips out
              every name and secret, and turns daily work into clean <em>causal graphs</em>.{" "}
              <span className="hl-blue">Frontier AI labs pay for this data.</span> The businesses that generate it earn a revenue share.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--dark btn--lg" href={links.demo}>
                Book a 15-min demo <IconArrow width={18} height={18} />
              </a>
              <a className="btn btn--ghost btn--lg" href="#how">
                See how it works <IconArrowDown width={18} height={18} />
              </a>
            </div>
          </div>

          <div className="hero__aside fade-in" style={{ animationDelay: "0.7s" }}>
            <p className="label">I am —</p>
            <ul className="audience">
              <li>
                <a href="#for-business">
                  <span className="mono">01</span> A business owner <IconArrow width={16} height={16} />
                </a>
              </li>
              <li>
                <a href="#for-labs">
                  <span className="mono">02</span> An AI lab <IconArrow width={16} height={16} />
                </a>
              </li>
              <li>
                <a href="#investors">
                  <span className="mono">03</span> An investor <IconArrow width={16} height={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="proof fade-in" style={{ animationDelay: "0.85s" }}>
          {proof.map((p) => (
            <li key={p} className="mono">
              <span aria-hidden>■</span> {p}
            </li>
          ))}
        </ul>

        <div className="hero__visual fade-in" style={{ animationDelay: "0.4s" }}>
          <HeroDiagram />
          <p className="caption mono">
            <span>FIG. 01</span> What the platform sees inside a company: every chat, ticket and commit linked into one process map. Red = where work
            gets stuck.
          </p>
        </div>
      </div>
    </section>
  );
}
