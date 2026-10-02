import type { CSSProperties, ReactNode } from "react";
import { IconBranch, IconChat, IconChip, IconCoin, IconShield, IconTicket, IconVideo } from "./ui/Icons";

type Step = { icon: ReactNode; title: string; body: ReactNode; pay?: boolean };

const steps: Step[] = [
  {
    icon: <IconChat width={20} height={20} />,
    title: "Your team works as usual",
    body: (
      <span className="flow__apps">
        <span>
          <IconChat width={14} height={14} /> Chats
        </span>
        <span>
          <IconTicket width={14} height={14} /> Tasks
        </span>
        <span>
          <IconBranch width={14} height={14} /> Code
        </span>
        <span>
          <IconVideo width={14} height={14} /> Calls
        </span>
      </span>
    ),
  },
  {
    icon: <IconShield width={20} height={20} />,
    title: "We hide everything private",
    body: (
      <span className="flow__swap">
        <s>Anna</s> → <code>[Person 1]</code> <s>Sunrise Motors</s> → <code>[Client]</code>
      </span>
    ),
  },
  {
    icon: <IconChip width={20} height={20} />,
    title: "AI companies buy the examples",
    body: "They use them to teach AI how real work gets done.",
  },
  {
    icon: <IconCoin width={20} height={20} />,
    title: "You get paid every month",
    body: (
      <span className="flow__share">
        <b>5–30%</b> of every sale
      </span>
    ),
    pay: true,
  },
];

/** Hero visual: the whole business model in four plain steps, with a marker travelling down the chain. */
export function MoneyFlow() {
  return (
    <figure className="flow" aria-label="How the money flows">
      <figcaption className="flow__head">
        <span className="label">How the money flows</span>
        <span className="flow__free">Free for you</span>
      </figcaption>
      <div className="flow__steps">
        <span className="flow__track" aria-hidden />
        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className={`flow__step ${s.pay ? "flow__step--pay" : ""}`} style={{ "--i": i } as CSSProperties}>
              <span className="flow__icon">{s.icon}</span>
              <span className="flow__text">
                <span className="flow__title">{s.title}</span>
                <span className="flow__body">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
