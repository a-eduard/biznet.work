import { Eyebrow } from "./ui/Eyebrow";
import { IconArrow, IconCheck } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const alreadyRead = ["Wikipedia", "Books", "News sites", "Forums"];
const chain = ["Request", "Discussion", "Decision", "Done"];

export function Why() {
  return (
    <section className="section" id="why">
      <div className="container why">
        <Reveal className="section__head">
          <Eyebrow>Why it pays</Eyebrow>
          <h2 className="h2">Why would AI companies pay for this?</h2>
          <p className="lead">
            AI has already read the internet. What it has never seen is how real people get real work done. Your team does exactly that, every
            day.
          </p>
        </Reveal>

        <div className="why__grid">
          <Reveal className="card why__card why__card--old">
            <p className="label">AI has already read</p>
            <ul>
              {alreadyRead.map((x) => (
                <li key={x}>
                  <IconCheck width={18} height={18} /> {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card why__card why__card--new" delay={0.12}>
            <p className="label label--light">AI has never seen</p>
            <p className="why__big">How a real team takes a job from start to finish.</p>
            <ol className="chain" aria-label="Request, discussion, decision, done">
              {chain.map((c, i) => (
                <li key={c}>
                  <span>{c}</span>
                  {i < chain.length - 1 && <IconArrow width={14} height={14} />}
                </li>
              ))}
            </ol>
            <p className="why__note">That&rsquo;s what you have, and what they pay for.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
