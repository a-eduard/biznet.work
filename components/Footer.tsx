import { Logo } from "./ui/Logo";
import { links, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__claim">Get paid for the work your team already does.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href={links.contact}>Contact</a>
        </nav>
      </div>
      <div className="container footer__base mono">
        <span>© {new Date().getFullYear()} BIZNET.WORK. All rights reserved.</span>
      </div>
      <div className="footer__giant" aria-hidden>
        BIZNET<span />WORK
      </div>
    </footer>
  );
}
