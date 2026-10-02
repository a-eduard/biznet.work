"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { IconCoin, IconGraph, IconLayers, IconPlug, IconPulse, IconShield, IconStream, IconArrow } from "./ui/Icons";
import { TraceConsole } from "./TraceConsole";
import { JsonStream } from "./JsonStream";
import { links } from "@/lib/site";

type Tab = "business" | "labs";

type Block = {
  who: string;
  title: string;
  items: { Icon: ComponentType<SVGProps<SVGSVGElement>>; t: string; d: string }[];
  cta: { href: string; label: string };
};

const content: Record<Tab, Block> = {
  business: {
    who: "For businesses · data donors",
    title: "Get paid for work your team already does.",
    items: [
      {
        Icon: IconCoin,
        t: "Passive revenue",
        d: "A dynamic 5–30% share of every sale of your anonymized data, paid monthly. The more transparent your processes, the higher your share.",
      },
      {
        Icon: IconPlug,
        t: "Zero integration",
        d: "Read-only OAuth in about five minutes. No new tools, no reports to fill in, no change in how people work.",
      },
      {
        Icon: IconPulse,
        t: "A free X-ray of your company",
        d: "The CorpTwin dashboard shows where work stalls, which hand-offs fail and what idle time costs you in payroll.",
      },
      {
        Icon: IconShield,
        t: "You stay in control",
        d: "Names and secrets never leave your perimeter. Review every record in a quarantine zone. Disconnect at any time.",
      },
    ],
    cta: { href: links.demo, label: "Estimate my data's value" },
  },
  labs: {
    who: "For frontier AI labs · data buyers",
    title: "Reasoning data you can train on the day it arrives.",
    items: [
      {
        Icon: IconGraph,
        t: "Full reasoning traces",
        d: "Not just outputs: the whole path from initiative to result — debates, decisions, hand-offs and artifacts — linked as causal graphs.",
      },
      {
        Icon: IconLayers,
        t: "AI-ready format",
        d: "Standardized JSON mapped to a 5-level enterprise ontology. No parsing, no manual cleanup, no ingestion backlog.",
      },
      {
        Icon: IconShield,
        t: "Legally clean",
        d: "PII is tokenized at the source. Data provenance and IP ownership are documented for every donor company. GDPR/CCPA-safe by design.",
      },
      {
        Icon: IconStream,
        t: "Live, not archived",
        d: "A continuous stream from companies working right now — instead of static historical dumps that age the day they ship.",
      },
    ],
    cta: { href: links.sampleGraph, label: "Request a sample graph" },
  },
};

export function Value() {
  const [tab, setTab] = useState<Tab>("business");

  // Hero links (#for-business / #for-labs) open the matching tab.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#for-labs") setTab("labs");
      if (window.location.hash === "#for-business") setTab("business");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const c = content[tab];

  return (
    <section className="section value" id="value" data-rail="What you get">
      <span id="for-business" className="anchor" aria-hidden />
      <span id="for-labs" className="anchor" aria-hidden />
      <div className="container">
        <div className="section__head section__head--row">
          <div>
            <Reveal>
              <Eyebrow>What each side gets</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h2">One bridge. Two sides win.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="tabs" role="tablist" aria-label="Choose your side">
              <button
                role="tab"
                id="tab-business"
                aria-selected={tab === "business"}
                aria-controls="panel-value"
                className={tab === "business" ? "is-active" : ""}
                onClick={() => setTab("business")}
              >
                For businesses
              </button>
              <button
                role="tab"
                id="tab-labs"
                aria-selected={tab === "labs"}
                aria-controls="panel-value"
                className={tab === "labs" ? "is-active" : ""}
                onClick={() => setTab("labs")}
              >
                For AI labs
              </button>
              <span className={`tabs__ink ${tab === "labs" ? "is-right" : ""}`} aria-hidden />
            </div>
          </Reveal>
        </div>

        <div className="value__panel" role="tabpanel" id="panel-value" aria-labelledby={`tab-${tab}`} key={tab}>
          <div className="value__text">
            <p className="label">{c.who}</p>
            <h3 className="h3 value__title">{c.title}</h3>
            <ul className="benefits">
              {c.items.map(({ Icon, t, d }, i) => (
                <li key={t} style={{ animationDelay: `${0.06 * i}s` }}>
                  <span className="benefits__icon">
                    <Icon width={22} height={22} />
                  </span>
                  <div>
                    <b>{t}</b>
                    <p className="muted">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className="btn btn--dark" href={c.cta.href}>
              {c.cta.label} <IconArrow width={18} height={18} />
            </a>
          </div>
          <div className="value__visual">
            {tab === "business" ? (
              <>
                <p className="label">From a trace of work to revenue</p>
                <TraceConsole />
              </>
            ) : (
              <>
                <p className="label">What a lab receives — one record of the stream</p>
                <JsonStream />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
