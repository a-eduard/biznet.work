const items = [
  "Read-only OAuth",
  "Slack",
  "Jira",
  "GitHub",
  "Google Meet",
  "SLM routers",
  "5-level enterprise ontology",
  "Causal graphs",
  "PII Shield",
  "Daily JSON stream",
  "Multi-licensing",
  "Revenue share",
];

/** Infinite ticker of the platform's vocabulary. */
export function Marquee() {
  const row = items.map((t, i) => (
    <span key={i} className="marquee__item">
      {t}
      <i aria-hidden />
    </span>
  ));
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        <div className="marquee__row">{row}</div>
        <div className="marquee__row">{row}</div>
      </div>
    </div>
  );
}
