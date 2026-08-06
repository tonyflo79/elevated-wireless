import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elevated Wireless | Premium cellular. Direct access.",
  description:
    "Premium wireless on Verizon 5G, plus direct access to operators, AI advisors, curated perks, and a room full of people worth knowing. Built to be run. Built to be licensed.",
  metadataBase: new URL("https://getelevatedwireless.com"),
  openGraph: {
    title: "Elevated Wireless",
    description: "Premium cellular. Direct access.",
    type: "website",
    url: "https://getelevatedwireless.com",
    siteName: "Elevated Wireless",
    // Declared explicitly. With no og:image, iMessage and Slack scrape the page
    // and pick an image themselves, which is how the golf photo ended up as the
    // link preview.
    images: [
      {
        url: "/img/og-elevated-wireless.png",
        width: 1200,
        height: 630,
        alt: "Elevated Wireless. Premium cellular. Direct access.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevated Wireless",
    description: "Premium cellular. Direct access.",
    images: ["/img/og-elevated-wireless.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
