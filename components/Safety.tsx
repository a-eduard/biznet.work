import { Eyebrow } from "./ui/Eyebrow";
import { IconCheck, IconShield } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const promises = [
  "Names, clients and prices are swapped for labels",
  "Passwords, card numbers and code are removed completely",
  "Your IT person can check the data before it leaves",
];

export function Safety() {
  return (
    <section className="section" id="safety">
      <div className="container split">
        <Reveal className="split__text">
          <Eyebrow>Is it safe?</Eyebrow>
          <h2 className="h2">Your secrets stay yours.</h2>
          <p className="lead">
            Before anything leaves your company, private details are removed. Buyers see what happened, never who was involved or the details.
          </p>
          <ul className="checks">
            {promises.map((p) => (
              <li key={p}>
                <IconCheck width={18} height={18} /> {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="diff card" variant="scale" delay={0.1}>
          <div className="diff__pane">
            <p className="label">What your team wrote</p>
            <p className="diff__msg">
              <b>Mark</b>: <b>Anna</b>, give <b>Sunrise Motors</b> a <b>15%</b> discount. Login: <b>admin / sun2024</b>
            </p>
          </div>
          <div className="diff__filter">
            <span>
              <IconShield width={18} height={18} /> Privacy filter
            </span>
          </div>
          <div className="diff__pane diff__pane--after">
            <p className="label">What AI companies see</p>
            <p className="diff__msg">
              <code>[Person 1]</code> asked <code>[Person 2]</code> to give <code>[Client]</code> a discount of <code>[Amount]</code>.{" "}
              <code>[Login removed]</code>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
