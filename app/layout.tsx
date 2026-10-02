import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted (SIL Open Font License, see app/fonts) — no requests to Google at build or run time.
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jb",
  weight: "100 800",
  display: "swap",
});

const title = "BIZNET.WORK — The data bridge between real business and frontier AI";
const description =
  "biznet.work turns everyday business work into clean, anonymized causal graphs for frontier AI labs. Businesses earn a revenue share and get free process analytics.";

// Absolute base for social preview images. On Vercel the production domain is picked up automatically;
// set NEXT_PUBLIC_SITE_URL to override (e.g. https://biznet.work).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "BIZNET.WORK",
  keywords: ["Data-as-a-Service", "reasoning data", "AI training data", "causal graphs", "process mining", "corporate digital twin", "PII"],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "BIZNET.WORK",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F4F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
