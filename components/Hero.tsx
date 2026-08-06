"use client";

import { CSSProperties } from "react";
import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";
import { RevenueCalculator } from "./RevenueCalculator";

function RoyaltyPhrase() {
  // The design-moment word treatment, moved off "ACCESS" onto the royalty line.
  return (
    <span
      style={{
        color: t.metalBright,
        fontWeight: 700,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      a royalty on every subscriber, every month.
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      data-screen-label="02 Hero"
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        padding: "104px 56px 120px",
        position: "relative",
        overflow: "hidden",
        minHeight: 720,
      }}
    >
      <Reveal>
        {/* Option B: the calculator is the centrepiece. Condensed headline and a
            single line of copy above it, one CTA below. */}
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
              textWrap: "balance",
            } as CSSProperties}
          >
            Be the phone company for the people who love you.
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
            Elevated turns your audience into a branded wireless service you never have to run.
            Verizon 5G, fully operated, your name on it. You promote it. We handle everything else.
            You earn <RoyaltyPhrase />
          </p>

            </div>

            <RevenueCalculator variant="home" className="ew-calc-card" />

            <a
              href="#partner"
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
              Launch Your Brand
              <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.85, lineHeight: 1, fontWeight: 500 }}>
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
