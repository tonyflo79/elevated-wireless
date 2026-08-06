"use client";

import { CSSProperties } from "react";
import { tokens as t } from "@/lib/tokens";
import { EWMark, Reveal } from "./primitives";
import { RevenueCalculator } from "./RevenueCalculator";

// ————————————————————————————————————————————————
// University Hero — navy, matches homepage type system,
// design-moment treatment on the royalty line.
// ————————————————————————————————————————————————
export function UniversityHero() {
  return (
    <section
      id="top"
      data-screen-label="U1 Hero"
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        padding: "120px 56px 120px",
        position: "relative",
        overflow: "hidden",
        minHeight: 720,
      }}
    >
      {/* Quiet decorative mark, top-right */}
      <div
        aria-hidden="true"
        className="ew-hero-rail"
        style={{ position: "absolute", top: 40, right: 72, opacity: 0.9 }}
      >
        <EWMark size={56} ring={t.metalBright} ink={t.metalBright} />
      </div>

      <Reveal>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="ew-hero-center">
            <div className="ew-hero-copy">
              <h1
                style={{
                  fontFamily: t.sansDisplay,
                  fontSize: "clamp(40px, 4.6vw, 68px)",
                  lineHeight: 1.02,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                A new revenue stream for your university.
              </h1>
              <p
                style={{
                  fontFamily: t.sans,
                  fontSize: 18,
                  lineHeight: 1.55,
                  opacity: 0.82,
                  margin: 0,
                }}
              >
                Elevated turns your fan base into a branded wireless service under your school&apos;s name,
                on the Verizon 5G network, operated entirely by us. Your only job is the one you&apos;re
                already the best in the world at: reaching your fans. You earn{" "}
                <span style={{ color: t.metalBright, fontWeight: 700, whiteSpace: "nowrap" }}>
                  a monthly royalty on every subscriber.
                </span>
              </p>

            </div>

            <RevenueCalculator variant="university" className="ew-calc-card" />

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  href="mailto:partnerships@getelevatedwireless.com?subject=University%20Briefing"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "18px 32px",
                    background: t.accent,
                    color: t.paper,
                    fontFamily: t.mono,
                    fontSize: 12,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Request the University Briefing
                  <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1 }}>→</span>
                </a>
              </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ————————————————————————————————————————————————
// The Opportunity — replaces Category on /universities
// (numbers removed per revision; royalty is negotiated per-deal)
// ————————————————————————————————————————————————
export function UniversityMath() {
  return (
    <section
      id="opportunity"
      data-screen-label="U2 The Opportunity"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "140px 56px",
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: t.sansDisplay,
            fontSize: "clamp(42px, 5.6vw, 72px)",
            lineHeight: 1.02,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            margin: "0 0 48px",
            maxWidth: 1100,
          }}
        >
          Your fans already pay for wireless. Just not to you.
        </h2>

        <p style={{ fontSize: 20, lineHeight: 1.6, margin: 0, maxWidth: 900 }}>
          Every fan in your stadium pays a carrier every month and feels nothing for it. Move a
          fraction of that loyalty to a service carrying your name and it becomes recurring revenue
          your program controls, growing with every subscriber, season after season. No inventory,
          no capital, no new staff.
        </p>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
// Built to fit — how it fits college-sports structure
// ————————————————————————————————————————————————
export function UniversityFit() {
  return (
    <section
      data-screen-label="U4 The Fit"
      className="ew-pad-md"
      style={{
        background: t.paperDim,
        color: t.ink,
        padding: "140px 56px",
        borderTop: `1px solid ${t.line}`,
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.04,
                fontWeight: 500,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Built to fit the structure you already have.
            </h2>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.65, opacity: 0.85, margin: 0, paddingTop: 8 }}>
            We work within your existing multimedia-rights and collective relationships, not
            around them. Whether your properties are managed in-house or by a rights partner, the
            wireless program plugs into the channels and agreements already in place, and everyone
            in the value chain participates.
          </p>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————
// Launch — single-CTA panel (no investor line)
// ————————————————————————————————————————————————
export function UniversityLaunch() {
  return (
    <section
      id="partner"
      data-screen-label="U6 Launch"
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        padding: "140px 56px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
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
            For universities.
          </h2>
        </div>

        <Reveal>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "40px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.82, margin: 0, maxWidth: 520 }}>
              A branded wireless revenue stream for your program, with your name on it, operated
              entirely by us, paying you a royalty on every subscriber, every month. Zero
              operational lift on campus.
            </p>
            <a
              href="mailto:partnerships@getelevatedwireless.com?subject=University%20Briefing"
              style={{
                padding: "14px 22px",
                background: "transparent",
                color: t.paper,
                border: `1px solid ${t.metal}`,
                fontFamily: t.mono,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: 8,
              } as CSSProperties}
            >
              Request the university briefing →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
