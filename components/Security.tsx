"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/hooks";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";
import { Watermark } from "./ui/Watermark";
import { IconCheck, IconLock, IconShield } from "./ui/Icons";

type Seg = [string, boolean?];

const raw: Seg[][] = [
  [["Anna Petrova", true], [": approved a 15% discount for "], ["Northwind Ltd", true], [" — "], ["$48,000", true], [" contract"]],
  [["Deploy key "], ["sk-live-7f3a9c21", true], [" added by "], ["mike@acme.io", true]],
  [["Call with "], ["John (CFO)", true], [": launch moved to Q3, budget cut to "], ["$120k", true]],
];

const clean: Seg[][] = [
  [["[User_A]", true], [" → Event.Discount_Approved → "], ["[Client_ID]", true], [" · "], ["[Amount]", true]],
  [["Event.Credential_Added → "], ["[REDACTED_SECRET]", true], [" · "], ["[User_B]", true]],
  [["[User_C]", true], [" (Role.Finance) → Decision.Launch_Rescheduled · "], ["[Amount]", true]],
];

const badges = [
  "Read-only OAuth",
  "Zero-Trust architecture",
  "PII Shield on every record",
  "AES-256 at rest",
  "TLS 1.3 in transit",
  "GDPR & CCPA by design",
  "SOC 2 Type II-ready",
];

function PiiDiff() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const [quarantine, setQuarantine] = useState(true);
  const [released, setReleased] = useState(false);

  return (
    <div ref={ref} className={`diff ${inView ? "is-in" : ""}`}>
      <div className="diff__controls">
        <button
          className={`switch ${quarantine ? "is-on" : ""}`}
          role="switch"
          aria-checked={quarantine}
          onClick={() => {
            setQuarantine((q) => !q);
            setReleased(false);
          }}
        >
          <span className="switch__knob" />
          <span className="switch__label">Quarantine zone</span>
        </button>
        <span className="mono muted diff__hint">
          {quarantine ? "Your IT team reviews every record before release" : "Records are released automatically after the scan"}
        </span>
      </div>

      <div className="diff__panes">
        <div className="diff__pane">
          <div className="diff__head mono">
            <span>raw_event.log</span>
            <span className="muted">inside your perimeter</span>
          </div>
          <div className="diff__body mono">
            <span className="diff__scan" aria-hidden />
            {raw.map((row, i) => (
              <p key={i} className="diff__row diff__row--raw">
                <span className="diff__ln">−</span>
                <span>
                  {row.map(([t, sens], j) =>
                    sens ? (
                      <mark key={j} className="sens">
                        {t}
                      </mark>
                    ) : (
                      <span key={j}>{t}</span>
                    )
                  )}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="diff__shield" aria-hidden>
          <IconShield width={22} height={22} />
          <span className="mono">PII Shield</span>
        </div>

        <div className="diff__pane diff__pane--out">
          <div className="diff__head mono">
            <span>sanitized.json</span>
            <span className="muted">what leaves</span>
          </div>
          <div className="diff__body mono">
            {clean.map((row, i) => (
              <p key={i} className="diff__row diff__row--clean" style={{ transitionDelay: `${0.5 + i * 0.35}s` }}>
                <span className="diff__ln">+</span>
                <span>
                  {row.map(([t, tok], j) =>
                    tok ? (
                      <span key={j} className="token">
                        {t}
                      </span>
                    ) : (
                      <span key={j}>{t}</span>
                    )
                  )}
                </span>
              </p>
            ))}
          </div>
          <div className={`diff__status mono ${!quarantine || released ? "is-released" : ""}`}>
            {quarantine && !released ? (
              <>
                <span>
                  <IconLock width={14} height={14} /> Held in quarantine · 3 records
                </span>
                <button className="btn btn--dark btn--xs" onClick={() => setReleased(true)}>
                  Approve release
                </button>
              </>
            ) : (
              <span>
                <IconCheck width={14} height={14} /> Released to stream · 3 records · 0 PII
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Security() {
  return (
    <section className="section security" id="security" data-rail="Security">
      <Watermark word="TRUST" top="2%" />
      <div className="container">
        <div className="section__head">
          <Reveal>
            <Eyebrow>Security & compliance</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2">
              AI labs buy the logic of your processes. <span className="hl-blue">Never your secrets.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Before any data leaves the company&apos;s perimeter, the PII Shield replaces people, clients, credentials and figures with system
              tokens. It is a deterministic, auditable process — not a black box.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <PiiDiff />
        </Reveal>

        <ul className="badges">
          {badges.map((b, i) => (
            <Reveal as="li" key={b} delay={i * 0.05}>
              <IconCheck width={14} height={14} /> {b}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
