import type { CSSProperties } from "react";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";

/** Illustrative only: one job's journey, bar length = time spent at that stage. */
const stages = [
  { name: "Request comes in", time: "1 hour", share: 0.06 },
  { name: "Assigned to someone", time: "3 hours", share: 0.12 },
  { name: "Waiting for approval", time: "2 days", share: 1, stuck: true },
  { name: "Done and closed", time: "5 hours", share: 0.18 },
];

export function Dashboard() {
  return (
    <section className="section" id="dashboard">
      <div className="container split split--flip">
        <Reveal className="split__text">
          <Eyebrow>Free bonus</Eyebrow>
          <h2 className="h2">See where work gets stuck.</h2>
          <p className="lead">
            You also get a simple dashboard, free. It shows where jobs get stuck and where time is lost, without anyone writing a report.
          </p>
        </Reveal>

        <Reveal className="journey" variant="scale" delay={0.1}>
          <div className="journey__head">
            <p className="label label--light">One job, start to finish</p>
            <span className="tag tag--muted-dark">Example</span>
          </div>
          <ul className="journey__rows">
            {stages.map((s, i) => (
              <li key={s.name} className={s.stuck ? "is-stuck" : ""} style={{ "--w": s.share, "--d": `${0.25 + i * 0.12}s` } as CSSProperties}>
                <span className="journey__name">{s.name}</span>
                <span className="journey__bar">
                  <i />
                </span>
                <span className="journey__time mono">{s.time}</span>
              </li>
            ))}
          </ul>
          <p className="journey__note">
            <b>Most of the time is lost here.</b> Fix this one step and jobs get done much faster.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
