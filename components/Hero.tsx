import { MoneyFlow } from "./MoneyFlow";
import { Eyebrow } from "./ui/Eyebrow";
import { IconArrow, IconArrowDown } from "./ui/Icons";
import { Watermark } from "./ui/Watermark";
import { links } from "@/lib/site";

const proof = ["Free to join", "5-minute setup", "Nothing to install"];

export function Hero() {
  return (
    <section className="hero" id="top">
      <Watermark word="EARN" top="3%" />
      <div className="container">
        <Eyebrow>For business owners</Eyebrow>
        <h1 className="h1 hero__title">
          <span className="line">
            <span>Get paid for the work</span>
          </span>{" "}
          <span className="line">
            <span>
              your team <mark className="marker">already does.</mark>
            </span>
          </span>
        </h1>

        <div className="hero__grid">
          <div className="hero__lead fade-in" style={{ animationDelay: "0.45s" }}>
            <p className="lead">
              AI companies need real examples of how businesses get work done. We collect them from your work apps, remove everything
              private, and <strong>pay you a share of every sale.</strong>
            </p>
            <div className="hero__ctas">
              <a className="btn btn--dark btn--lg" href={links.call} data-booking>
                Book a 15-min call <IconArrow width={18} height={18} />
              </a>
              <a className="btn btn--ghost btn--lg" href="#calculator">
                Estimate your earnings <IconArrowDown width={18} height={18} />
              </a>
            </div>
            <ul className="proof">
              {proof.map((p) => (
                <li key={p}>
                  <span aria-hidden>■</span> {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in" style={{ animationDelay: "0.65s" }}>
            <MoneyFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
