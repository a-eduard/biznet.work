"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconCheck, IconX } from "./ui/Icons";
import { bookingEmbedUrl, site } from "@/lib/site";

/**
 * Calendly inside the site. Any link with `data-booking` opens this dialog instead of leaving the page:
 * a centred window on desktop, a full-screen sheet on phones. Without JavaScript the same links
 * simply go to the Calendly page.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);

  const open = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    setSrc((s) => s ?? bookingEmbedUrl(window.location.host));
    dialog.showModal();
    document.documentElement.classList.add("has-modal");
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[data-booking]");
      if (!link) return;
      e.preventDefault();
      open();
    };
    // Calendly reports progress to the parent page with postMessage.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") setBooked(true);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="booking"
      aria-labelledby="booking-title"
      onClose={() => document.documentElement.classList.remove("has-modal")}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="booking__panel">
        <header className="booking__head">
          <div>
            <p id="booking-title" className="booking__title">
              {booked ? (
                <>
                  <IconCheck width={20} height={20} /> You&rsquo;re booked
                </>
              ) : (
                "Book a 15-minute call"
              )}
            </p>
            <p className="booking__sub">{booked ? "Check your inbox for the invite." : "Free · No obligation · Pick any time that suits you"}</p>
          </div>
          <button type="button" className="booking__close" onClick={close} aria-label="Close">
            <IconX width={22} height={22} />
          </button>
        </header>
        <div className="booking__body">
          {!loaded && (
            <div className="booking__loading" role="status">
              <span className="spinner" aria-hidden /> Loading calendar…
            </div>
          )}
          {src && <iframe src={src} title="Pick a time for your call with biznet.work" onLoad={() => setLoaded(true)} />}
        </div>
        <p className="booking__foot">
          Calendar not loading?{" "}
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Open it in a new tab
          </a>
        </p>
      </div>
    </dialog>
  );
}
