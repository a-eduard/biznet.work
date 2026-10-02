import { BookingInline } from "./BookingInline";
import { IconArrow, IconCheck } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { links, site } from "@/lib/site";

const onTheCall = ["See exactly what buyers would get", "Get an estimate of your share", "We help you connect, if you like it"];

export function FinalCta() {
  return (
    <section className="section section--cta" id="contact">
      <div className="container">
        <Reveal className="cta" variant="scale">
          <div className="cta__copy">
            <h2 className="h2">Find out what your work is worth.</h2>
            <p className="cta__text">A free 15-minute call. No obligation. Pick a time that suits you.</p>
            <ul className="cta__list">
              {onTheCall.map((x) => (
                <li key={x}>
                  <IconCheck width={18} height={18} /> {x}
                </li>
              ))}
            </ul>
            <div className="cta__actions">
              <a className="btn btn--yellow btn--lg cta__book" href={links.call} data-booking>
                Book a 15-min call <IconArrow width={18} height={18} />
              </a>
              <a className="cta__mail" href={links.contact}>
                or write to {site.email}
              </a>
            </div>
          </div>
          <BookingInline />
        </Reveal>
      </div>
    </section>
  );
}
