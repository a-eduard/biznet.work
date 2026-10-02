import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/Eyebrow";

const cards = [
  {
    n: "01",
    k: "Who we are",
    title: "A data bridge between real businesses and frontier AI labs.",
    body: "biznet.work is Data-as-a-Service infrastructure. We collect the digital trace of how companies work, make it safe, and deliver it to the labs that train AI models.",
  },
  {
    n: "02",
    k: "Why it exists",
    title: "AI has read the internet. It has never seen how work gets done.",
    body: "To build agents that plan and execute real work, AI needs the reasoning behind decisions. That data lives inside companies — scattered across chats, tickets and code.",
  },
  {
    n: "03",
    k: "What everyone gets",
    title: "Businesses earn. AI labs learn. Nobody's secrets leak.",
    body: "Businesses get passive revenue and a free map of their own operations. AI labs get a steady stream of clean, legal reasoning data — ready for training on day one.",
  },
];

export function Summary() {
  return (
    <section className="section summary" id="summary" data-rail="In 10 seconds">
      <div className="container">
        <Reveal>
          <Eyebrow>biznet.work in 10 seconds</Eyebrow>
        </Reveal>
        <div className="summary__grid">
          {cards.map((c, i) => (
            <Reveal key={c.n} as="article" className="card summary__card" delay={i * 0.12}>
              <div className="summary__top">
                <span className="num">{c.n}</span>
                <span className="label">{c.k}</span>
              </div>
              <h3 className="h3">{c.title}</h3>
              <p className="muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
