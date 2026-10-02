"use client";

import { useEffect, useRef, useState } from "react";
import { bookingEmbedUrl } from "@/lib/site";

/**
 * Calendly embedded right in the final section (desktop and tablets).
 * The iframe is only created when the section gets close to the screen, so it doesn't slow down the first load.
 */
export function BookingInline() {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 900px)");
    let io: IntersectionObserver | null = null;
    const arm = () => {
      if (!mq.matches || io) return;
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSrc(bookingEmbedUrl(window.location.host));
            io?.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      io.observe(el);
    };
    arm();
    mq.addEventListener("change", arm);
    return () => {
      mq.removeEventListener("change", arm);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="cta__calendar">
      {!loaded && (
        <div className="booking__loading" role="status">
          <span className="spinner" aria-hidden /> Loading calendar…
        </div>
      )}
      {src && <iframe src={src} title="Pick a time for your call with biznet.work" loading="lazy" onLoad={() => setLoaded(true)} />}
    </div>
  );
}
