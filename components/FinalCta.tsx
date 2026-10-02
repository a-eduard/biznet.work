import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { IconArrow } from "./ui/Icons";
import { links, site } from "@/lib/site";

const paths = [
  {
    who: "Business owners & CTOs",
    t: "See what your data is worth",
    d: "A 15-minute call with our engineers. We show a real sanitized reasoning graph, estimate your Graph Quality Score and answer your CTO's security questions.",
    cta: "Book a 15-min demo",
    href: links.demo,
    primary: true,
  },
  {
    who: "AI labs",
    t: "Test a sample graph",
    d: "Get a sanitized JSON causal graph to run through your ingestion pipeline. Check the ontology, the PII Shield and the trace depth yourself.",
    cta: "Request a sample",
    href: links.sampleGraph,
  },
  {
    who: "Investors",
    t: "Get the full picture",
    d: "The investor deck with the financial model, unit economics, go-to-market plan and use of funds for the Seed round.",
    cta: "Request the deck",
    href: links.deck,
  },
];

export function FinalCta() {
  return (
    <section className="section cta" id="contact" data-rail="Next step">
      <div className="container">
        <div className="section__head">
          <Reveal>
            <Eyebrow>Next step</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2">
              No pitch. <span className="hl-blue">Architecture and numbers.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">Pick the conversation that fits you. Each one is short, technical and specific.</p>
          </Reveal>
        </div>
        <div className="cta__grid">
          {paths.map((p, i) => (
            <Reveal key={p.who} as="article" className={`card cta__card ${p.primary ? "cta__card--primary" : ""}`} delay={i * 0.1}>
              <p className="label">{p.who}</p>
              <h3 className="h3">{p.t}</h3>
              <p className="muted">{p.d}</p>
              <a className={`btn ${p.primary ? "btn--yellow" : "btn--dark"}`} href={p.href}>
                {p.cta} <IconArrow width={18} height={18} />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="cta__mail mono">
            Or write to us directly: <a href={links.contact}>{site.email}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
