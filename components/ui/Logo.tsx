/** BIZNET.WORK sign: three interlocking blocks around an empty core. */
export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="0 0 489 503"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon className="logo-mark__a" points="0,0 94,0 94,409 300,409 300,503 0,503" />
      <polygon className="logo-mark__b" points="119,23 489,23 489,242 394,242 394,117 119,117" />
      <polygon className="logo-mark__c" points="394,266 489,266 489,503 325,503 325,409 394,409" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark />
      <span className="logo__word">
        BIZNET<span className="logo__dot" aria-hidden />WORK
      </span>
      <span className="sr-only">biznet.work</span>
    </span>
  );
}
