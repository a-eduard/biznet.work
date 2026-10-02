"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";
import { IconArrow, IconMenu, IconX } from "./ui/Icons";
import { links, nav } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="biznet.work — home" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav className="nav__links" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--dark btn--sm nav__cta" href={links.call}>
          Book a call <IconArrow width={16} height={16} />
        </a>
        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>
      <div className="nav__sheet" hidden={!open}>
        <div className="container">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ animationDelay: `${0.04 * i}s` }}>
              <span className="mono">0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <a className="btn btn--dark" href={links.call} onClick={() => setOpen(false)}>
            Book a 15-min call <IconArrow width={18} height={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
