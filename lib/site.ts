/**
 * Site-wide settings. Edit these values before sending the link out.
 * Everything that points to an external contact lives here.
 */
export const site = {
  name: "BIZNET.WORK",
  url: "https://biznet.work",
  /** Main contact address used by every call-to-action. */
  email: "hello@biznet.work",
  /**
   * Optional booking link (Calendly, Cal.com, Google Calendar…).
   * When empty, the "Book a call" buttons fall back to an e-mail.
   */
  bookingUrl: "",
};

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  call: site.bookingUrl || mail("15-minute call — biznet.work"),
  contact: mail("Hello biznet.work"),
};

export const nav = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Is it safe?" },
  { href: "#dashboard", label: "Free dashboard" },
  { href: "#faq", label: "Questions" },
];
