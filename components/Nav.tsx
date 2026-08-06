"use client";

import { usePathname } from "next/navigation";
import { tokens as t } from "@/lib/tokens";
import { Wordmark } from "./primitives";

// Which in-page anchors actually exist on each route. Kept here so a nav link
// can never point at a section that is not on the current page, which is how
// ACCESS, PLATFORM and TEAM all silently broke before.
const ANCHORS: Record<string, string[]> = {
  "/": ["#top", "#platform", "#partner", "#contact"],
  "/universities": ["#top", "#partner", "#contact"],
  "/about": ["#top", "#contact"],
};

export type NavLink = { label: string; href: string; anchor?: string };

// href is the always-safe cross-page destination. anchor is used instead when
// that section exists on the page the visitor is already on, so the link
// scrolls rather than reloading.
export const LINKS: NavLink[] = [
  { label: "Home", href: "/", anchor: "#top" },
  { label: "Platform", href: "/#platform", anchor: "#platform" },
  { label: "Partner", href: "/#partner", anchor: "#partner" },
  { label: "About Us", href: "/about/" },
  { label: "Universities", href: "/universities/" },
  { label: "Contact", href: "/#contact", anchor: "#contact" },
];

export function resolveHref(link: NavLink, pathname: string | null): string {
  const route = (pathname || "/").replace(/\/+$/, "") || "/";
  if (link.anchor && (ANCHORS[route] || []).includes(link.anchor)) return link.anchor;
  return link.href;
}

export function Nav() {
  const pathname = usePathname();
  return (
    <nav
      className="ew-nav ew-pad-md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 56px",
        borderBottom: `1px solid ${t.line}`,
        background: "rgba(255, 255, 255, 0.86)",
        color: t.ink,
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <a href="#top" aria-label="Elevated Wireless home">
        <Wordmark color={t.ink} withMark markRing={t.ink} size={13} />
      </a>
      <div
        style={{
          display: "flex",
          gap: 32,
          fontFamily: t.mono,
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {LINKS.map((x) => (
          <a
            key={x.label}
            href={resolveHref(x, pathname)}
            style={{ color: t.ink, opacity: 0.75 }}
          >
            {x.label}
          </a>
        ))}
      </div>
      <a
        href="mailto:partnerships@getelevatedwireless.com"
        style={{
          padding: "10px 18px",
          border: `1px solid ${t.ink}`,
          color: t.ink,
          fontFamily: t.mono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Get in Touch
      </a>
    </nav>
  );
}
