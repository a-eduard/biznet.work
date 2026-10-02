"use client";

import { useEffect, useState } from "react";
import { IconArrow } from "./ui/Icons";
import { links } from "@/lib/site";

/**
 * Phones only (hidden by CSS from 960px): a thumb-friendly "Book a call" bar at the bottom of the screen.
 * Hidden while the hero buttons, the calculator or the final section are on screen, so it never doubles up.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ["#top .hero__ctas", "#calculator", "#contact", "footer"]
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el);
    const visible = new Set<Element>();
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        started = started || window.scrollY > 80;
        setShow(started && visible.size === 0);
      },
      { threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    const onScroll = () => {
      if (!started && window.scrollY > 80) {
        started = true;
        setShow(visible.size === 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`sticky-cta ${show ? "is-shown" : ""}`} aria-hidden={!show}>
      <a className="btn btn--dark btn--lg" href={links.call} data-booking tabIndex={show ? 0 : -1}>
        Book a free 15-min call <IconArrow width={18} height={18} />
      </a>
    </div>
  );
}
