import { Eyebrow } from "./ui/Eyebrow";
import { IconPlus } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const faq = [
  {
    q: "How much will we earn?",
    a: "You get 5–30% of every sale of your data. The more of your work tools you connect, and the tidier your work, the bigger your share. Try the calculator above for a rough number; we give you an exact one on the call.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Joining is free, and so is the dashboard.",
  },
  {
    q: "Will my team notice anything?",
    a: "No. They keep working in the same apps. No new software, no extra steps, no reports.",
  },
  {
    q: "We have strict agreements with our clients. Is that a problem?",
    a: "Buyers never get your messages, only anonymous patterns like “a task was approved, then finished”. We show you real examples on the call.",
  },
  {
    q: "We're a small team. Is our data worth anything?",
    a: "Yes. Buyers pay for clear examples of how work gets done, not for huge volumes. A small team with a clear process is a good fit.",
  },
];

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <Reveal className="section__head">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="h2">What owners usually ask.</h2>
        </Reveal>
        <Reveal className="faq__list" delay={0.1}>
          {faq.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <IconPlus width={20} height={20} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
