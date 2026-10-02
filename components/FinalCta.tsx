import { IconArrow } from "./ui/Icons";
import { LogoMark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";
import { links, site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="section section--cta" id="contact">
      <div className="container">
        <Reveal className="cta" variant="scale">
          <LogoMark className="cta__mark" />
          <h2 className="h2">Find out what your work is worth.</h2>
          <p className="cta__text">
            A free 15-minute call. We show you what buyers see, estimate your share and help you connect. No obligation.
          </p>
          <div className="cta__actions">
            <a className="btn btn--yellow btn--lg" href={links.call}>
              Book a 15-min call <IconArrow width={18} height={18} />
            </a>
            <a className="cta__mail" href={links.contact}>
              or write to {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
