"use client";

import { tokens as t } from "@/lib/tokens";
import { Reveal } from "./primitives";

const PARAS = [
  "300 million Americans spend $349 billion a year with AT&T, T-Mobile, and Verizon, without feeling loyalty to any of them. Thirty years of price, coverage, and speed. A commodity with a logo.",
  "The brands people actually love should be competing here. Most still believe in a barrier to entry that fell years ago.",
  "For the brands these customers love, wireless is the next layer of a relationship they've already earned. Elevated is the platform that makes it possible.",
];

export function Category() {
  return (
    <section
      id="category"
      data-screen-label="03 Category"
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
            margin: "0 0 18px",
            maxWidth: 1100,
          }}
        >
          Why it works
        </h2>
        {/* Sized between the headline and the body so it reads as a
            subheading rather than as copy. */}
        <p
          style={{
            fontFamily: t.sansDisplay,
            fontSize: "clamp(24px, 2.6vw, 34px)",
            lineHeight: 1.15,
            fontWeight: 500,
            letterSpacing: "-0.018em",
            color: t.metal,
            margin: "0 0 80px",
            maxWidth: 900,
          }}
        >
          No one loves their carrier.
        </p>

        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 56,
          }}
        >
          {PARAS.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20 }}>
                <div
                  style={{
                    fontFamily: t.mono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    opacity: 0.5,
                    marginBottom: 14,
                  }}
                >
                  0{i + 1}
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0 }}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
