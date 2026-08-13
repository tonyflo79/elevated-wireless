"use client";

import { tokens as t } from "@/lib/tokens";
import {
  AccentBar,
  Em,
  Eyebrow,
  Panel,
  Reveal,
  SectionRail,
  Spine,
} from "./primitives";

// Mirrors the closing slide of the partner decks: mixed-weight headline on the
// left, dark supporting panel on the right, full-bleed accent CTA bar beneath.
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
        position: "relative",
      }}
    >
      <Spine />
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionRail label="04 · The Ask" index="04 / 04" onDark />

        <Reveal>
          <div
            className="ew-stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: 72,
              alignItems: "start",
              marginBottom: 72,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(44px, 6vw, 82px)",
                  lineHeight: 1.02,
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  margin: "0 0 28px",
                }}
              >
                What&apos;s next.{" "}
                <Em>Launch your own brand.</Em>
              </h2>
              <p
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(19px, 2vw, 24px)",
                  lineHeight: 1.32,
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  opacity: 0.9,
                  maxWidth: 640,
                }}
              >
                Two-week onboarding once terms are signed.{" "}
                <Em color={t.accent}>Then it&apos;s live.</Em>
              </p>
            </div>

            <Panel
              eyebrow="The conversation"
              style={{ border: `1px solid ${t.baseMid}` }}
            >
              <p style={{ margin: "0 0 18px" }}>
                <strong style={{ fontWeight: 700 }}>
                  Own an audience that trusts you?
                </strong>{" "}
                Turn it into a wireless revenue stream branded as yours, operated
                entirely by us, paying you a royalty on every subscriber, every
                month.
              </p>
              <p style={{ margin: 0 }}>
                You promote it. We run the network, the billing, the support, and
                the compliance.{" "}
                <strong style={{ fontWeight: 700 }}>
                  The risk stays with us.
                </strong>
              </p>
            </Panel>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <AccentBar
            eyebrow="Next step"
            headline="Request a partner briefing."
            href="mailto:partnerships@getelevatedwireless.com?subject=Partner%20Briefing"
            linkLabel="partnerships@getelevatedwireless.com"
          />
        </Reveal>

        <div
          style={{
            marginTop: 28,
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Eyebrow onDark>Powered by Verizon 5G · Built for audiences that expect more</Eyebrow>
          <Eyebrow onDark>EW · MMXXVI</Eyebrow>
        </div>
      </div>
    </section>
  );
}
