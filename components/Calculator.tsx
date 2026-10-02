"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { Eyebrow } from "./ui/Eyebrow";
import { IconArrow, IconCheck } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { estimate, money, niches, shareFor, TEAM_MAX, TEAM_MIN, tools, type NicheId, type ToolId } from "@/lib/calculator";
import { links } from "@/lib/site";

/** The slider is stretched at the small end: most visitors run teams of 2–30 people. */
const toTeam = (pos: number) => Math.round(TEAM_MIN + Math.pow(pos / 100, 2) * (TEAM_MAX - TEAM_MIN));
const toPos = (team: number) => Math.sqrt((team - TEAM_MIN) / (TEAM_MAX - TEAM_MIN)) * 100;

export function Calculator() {
  const [team, setTeam] = useState(10);
  const [picked, setPicked] = useState<ToolId[]>(["chat", "tasks", "calls"]);
  const [niche, setNiche] = useState<NicheId>("office");

  const result = useMemo(() => estimate(team, picked.length, niche), [team, picked.length, niche]);
  const missing = tools.find((t) => !picked.includes(t.id));
  const nextShare = shareFor(picked.length + 1);

  const toggle = (id: ToolId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const pos = toPos(team);

  return (
    <section className="section" id="calculator">
      <div className="container">
        <Reveal className="section__head">
          <Eyebrow>Calculator</Eyebrow>
          <h2 className="h2">How much could you earn?</h2>
          <p className="lead">Three quick questions. You get a rough monthly estimate.</p>
        </Reveal>

        <Reveal className="calc">
          <div className="calc__form card">
            <div className="calc__field">
              <label className="calc__q" htmlFor="calc-team">
                <span>How many people work in your company?</span>
                <output className="calc__team mono" htmlFor="calc-team">
                  {team}
                  {team === TEAM_MAX ? "+" : ""}
                </output>
              </label>
              <input
                id="calc-team"
                className="calc__range"
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={pos}
                aria-valuetext={`${team} people`}
                onChange={(e) => setTeam(toTeam(Number(e.target.value)))}
                style={{ "--fill": `${pos}%` } as CSSProperties}
              />
              <div className="calc__scale mono" aria-hidden>
                <span>{TEAM_MIN}</span>
                <span>{TEAM_MAX}+</span>
              </div>
            </div>

            <fieldset className="calc__field">
              <legend className="calc__q">Which tools does your team use?</legend>
              <div className="calc__chips">
                {tools.map((t) => {
                  const on = picked.includes(t.id);
                  return (
                    <button key={t.id} type="button" className={`chip ${on ? "is-on" : ""}`} aria-pressed={on} onClick={() => toggle(t.id)}>
                      <span className="chip__box">{on && <IconCheck width={14} height={14} />}</span>
                      <span>
                        {t.label}
                        <small>{t.hint}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="calc__field">
              <legend className="calc__q">What kind of business is it?</legend>
              <div className="calc__seg" role="radiogroup">
                {niches.map((n) => (
                  <button key={n.id} type="button" role="radio" aria-checked={niche === n.id} className={niche === n.id ? "is-on" : ""} onClick={() => setNiche(n.id)}>
                    {n.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="calc__result" aria-live="polite">
            {picked.length === 0 ? (
              <p className="calc__empty">Pick at least one tool your team uses to see an estimate.</p>
            ) : (
              <>
                <p className="label label--light">Your estimated payout</p>
                <p className="calc__amount">
                  {money(result.monthly)}
                  <span>/ month</span>
                </p>
                <p className="calc__sub">
                  Usually between {money(result.low)} and {money(result.high)} · about {money(result.yearly)} a year
                </p>

                <div className="calc__share">
                  <div className="calc__shareRow">
                    <span>Your share of every sale</span>
                    <b>{Math.round(result.share * 100)}%</b>
                  </div>
                  <span className="calc__bar">
                    <i style={{ width: `${(result.share / 0.3) * 100}%` }} />
                  </span>
                  <div className="calc__scale mono" aria-hidden>
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                {missing && (
                  <p className="calc__tip">
                    <b>Tip:</b> connect your {missing.label.toLowerCase()} too and your share grows to {Math.round(nextShare * 100)}%.
                  </p>
                )}

                <a className="btn btn--yellow btn--lg calc__cta" href={links.call}>
                  Get your exact number <IconArrow width={18} height={18} />
                </a>
              </>
            )}
            <p className="calc__note">
              Rough estimate, not a promise. Real payouts depend on how complete your data is and on demand from AI companies.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
