"use client";

import { tokens as t } from "@/lib/tokens";
import { Eyebrow, Label, Wordmark } from "./primitives";
import { LINKS, resolveHref, type NavLink } from "./Nav";
import { usePathname } from "next/navigation";

type FooterItem = NavLink;

const COLS: { h: string; items: FooterItem[] }[] = [
  // Mirrors the nav exactly, so the two can never drift apart.
  { h: "Company", items: LINKS },
  {
    h: "For",
    items: [
      { label: "Brands", href: "mailto:partnerships@getelevatedwireless.com?subject=Brand%20Enquiry" },
      { label: "Press", href: "mailto:press@getelevatedwireless.com?subject=Press%20Enquiry" },
    ],
  },
  {
    h: "Contact",
    items: [
      {
        label: "partnerships@getelevatedwireless.com",
        href: "mailto:partnerships@getelevatedwireless.com",
      },
      {
        label: "invest@getelevatedwireless.com",
        href: "mailto:invest@getelevatedwireless.com",
      },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  return (
    <footer
      id="contact"
      data-screen-label="09 Footer"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "80px 56px 40px",
        borderTop: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 56,
          }}
        >
          <div>
            <Wordmark color={t.ink} withMark markRing={t.ink} size={15} />
            <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.7, marginTop: 16, maxWidth: 340 }}>
              Your brand. Our wireless company.
              <br />
              <span style={{ fontStyle: "italic" }}>A revenue stream that compounds.</span>
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.h}>
              <Label style={{ opacity: 0.6, marginBottom: 16 }}>{col.h}</Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 13.5,
                }}
              >
                {col.items.map((x) => (
                  <a
                    key={x.label}
                    href={resolveHref(x, pathname)}
                    className="ew-footer-link"
                    style={{ opacity: 0.78 }}
                  >
                    {x.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* The deck's bottom rail: hairline, tracked mono caption left, mark
            right. Replaces the italic disclaimer line. */}
        <div
          style={{
            paddingTop: 22,
            borderTop: `1px solid ${t.line}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Eyebrow>
            © 2026 Elevated Wireless Inc. · Delaware C-Corp · Cellular service on
            the Verizon 5G network
          </Eyebrow>
          <Eyebrow>EW · MMXXVI</Eyebrow>
          {/* Privacy and Terms removed until real documents exist. A link that
              goes nowhere implies a policy that does not. See D19. */}
        </div>
      </div>
    </footer>
  );
}
