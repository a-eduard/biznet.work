/**
 * Site-wide settings. Edit these values before sending the link out.
 * Everything that points to an external contact lives here.
 */
export const site = {
  name: "BIZNET.WORK",
  product: "CorpTwin",
  tagline: "Enterprise 5.0 Data Infrastructure",
  url: "https://biznet.work",
  /** Main contact address used by every call-to-action. */
  email: "hello@biznet.work",
  /**
   * Optional booking link (Calendly, Cal.com, Google Calendar…).
   * When empty, the "Book a demo" buttons fall back to an e-mail.
   */
  bookingUrl: "",
};

const mail = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  demo: site.bookingUrl || mail("15-min technical demo — biznet.work"),
  sampleGraph: mail("Sample causal graph request — AI lab"),
  deck: mail("Investor deck request — biznet.work"),
  contact: mail("Hello biznet.work"),
};

export const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#how", label: "How it works" },
  { href: "#value", label: "Value" },
  { href: "#security", label: "Security" },
  { href: "#investors", label: "Investors" },
];
