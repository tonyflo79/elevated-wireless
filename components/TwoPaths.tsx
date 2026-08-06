"use client";

import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";

const ctaStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "14px 22px",
  background: "transparent",
  color: t.paper,
  border: `1px solid ${t.metal}`,
  fontFamily: t.mono,
  fontSize: 12,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  marginTop: 8,
};

export function TwoPaths() {
  return (
    <section
      id="partner"
      data-screen-label="08 Two Paths"
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        padding: "140px 56px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h2
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.0,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            What&apos;s next.
          </h2>
        </div>

        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: `1px solid ${t.baseMid}`,
            }}
          >
            {/* Sole remaining panel, centred under the heading. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 20,
                padding: "56px 0",
                maxWidth: 620,
              }}
            >
              <h3
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.06,
                  margin: 0,
                }}
              >
                Launch your own brand.
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.82, margin: 0 }}>
                Own an audience that trusts you? Turn it into a wireless revenue stream branded as
                yours, operated entirely by us, paying you a royalty on every subscriber, every
                month. Two-week onboarding once terms are signed.
              </p>
              <a
                href="mailto:partnerships@getelevatedwireless.com?subject=Partner%20Briefing"
                style={ctaStyle}
              >
                Request a partner briefing →
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
