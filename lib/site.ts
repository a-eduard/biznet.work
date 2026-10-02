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
  bookingUrl: "https://calendly.com/serge-garden/biznet-work",
};

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  call: site.bookingUrl || mail("15-minute call — biznet.work"),
  contact: mail("Hello biznet.work"),
};

/**
 * Calendly page as an embeddable iframe URL (same parameters Calendly's own widget uses).
 * Colour parameters only take effect on paid Calendly plans and are ignored otherwise.
 */
export function bookingEmbedUrl(host: string) {
  const url = new URL(site.bookingUrl);
  url.searchParams.set("embed_domain", host);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("background_color", "ffffff");
  url.searchParams.set("text_color", "121212");
  url.searchParams.set("primary_color", "1d52a8");
  return url.toString();
}

export const nav = [
  { href: "#how", label: "How it works" },
  { href: "#calculator", label: "Calculator" },
  { href: "#safety", label: "Is it safe?" },
  { href: "#dashboard", label: "Free dashboard" },
  { href: "#faq", label: "Questions" },
];
