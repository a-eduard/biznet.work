import type { ReactNode } from "react";
import { Eyebrow } from "./ui/Eyebrow";
import { IconCalendar, IconCoin, IconPlug, IconX } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const steps: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <IconCalendar />,
    title: "Have a 15-minute call",
    text: "We show you what buyers will see and estimate what you could earn.",
  },
  {
    icon: <IconPlug />,
    title: "Give view-only access",
    text: "About 5 minutes for your IT person. We connect to apps like Slack, Jira, GitHub and Google Meet. We can only look. We can't change or delete anything.",
  },
  {
    icon: <IconCoin />,
    title: "Get paid every month",
    text: "Your earnings appear on your dashboard. The first ones show up at the end of your first month.",
  },
];

const noNeed = ["Install anything", "Change how you work", "Hire anyone", "Write reports"];

export function Steps() {
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal className="section__head">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="h2">Three simple steps.</h2>
        </Reveal>

        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="card step" delay={i * 0.1}>
              <div className="step__top">
                <span className="num">0{i + 1}</span>
                <span className="step__icon">{s.icon}</span>
              </div>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="nope">
          <p className="label">You don&rsquo;t need to</p>
          <ul>
            {noNeed.map((n) => (
              <li key={n}>
                <IconX width={16} height={16} /> {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
