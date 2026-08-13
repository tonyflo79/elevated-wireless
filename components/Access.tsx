"use client";

import { CSSProperties, ReactNode } from "react";
import { tokens as t } from "@/lib/tokens";
import { Em, Eyebrow, Reveal, SectionRail, Spine } from "./primitives";

type DealLane = { n: string; title: string; body: string };

const HOME_LANES: DealLane[] = [
  {
    n: "01",
    title: "You promote.",
    body: "Your channels, your voice, your name on the service. That's the whole job. No inventory, no capital, no operations, no customer support line ringing in your building.",
  },
  {
    n: "02",
    title: "We operate.",
    body: "Verizon 5G connectivity, SIM and eSIM activation, billing, support, compliance, carrier reporting. End to end, under your brand. Launch in weeks, not quarters.",
  },
  {
    n: "03",
    title: "You earn.",
    body: "A royalty on every subscriber, every month, from the first subscriber. Recurring, compounding, and yours. A revenue stream that grows every time you do what you already do: reach the people who love you.",
  },
];

function LaneRow({ lane }: { lane: DealLane }) {
  return (
    <div
      className="ew-stack-md"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 56,
        padding: "48px 0",
        borderTop: `1px solid ${t.baseMid}`,
        alignItems: "start",
      }}
    >
      <div
        style={{
          fontFamily: t.sansDisplay,
          fontSize: "clamp(56px, 6vw, 88px)",
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color: t.accent,
        }}
      >
        {lane.n}
      </div>
      <div>
        <h3
          style={{
            fontFamily: t.sansDisplay,
            fontSize: "clamp(28px, 3vw, 38px)",
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "0 0 18px",
            color: t.paper,
          }}
        >
          {lane.title}
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, opacity: 0.82, margin: 0, maxWidth: 640 }}>
          {lane.body}
        </p>
      </div>
    </div>
  );
}

export function Access({
  id = "access",
  screenLabel = "04 The Deal",
  // Rail label is the visitor-facing section number. screenLabel stays an
  // internal design-doc reference and must not leak into the rail.
  railLabel = "02 · The Deal",
  railIndex = "02 / 04",
  heading = (
    <>
      A new revenue stream. <Em>Not a new business.</Em>
    </>
  ),
  lede = "Launching a wireless company used to mean towers, billing systems, support desks, and regulatory filings. On Elevated it means one thing: telling your audience it exists. We built the company so you only bring the brand.",
  lanes = HOME_LANES,
  closer = (
    <>
      The risk stays with us. The brand stays with you.
      <br />
      The revenue shows up monthly.
    </>
  ),
}: {
  id?: string;
  screenLabel?: string;
  railLabel?: ReactNode;
  railIndex?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  lanes?: DealLane[];
  closer?: ReactNode;
} = {}) {
  return (
    <section
      id={id}
      data-screen-label={screenLabel}
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        padding: "160px 56px",
        position: "relative",
      }}
    >
      <Spine />
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionRail label={railLabel} index={railIndex} onDark />
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
            marginBottom: 80,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(48px, 6.4vw, 80px)",
                lineHeight: 1.02,
                fontWeight: 300,
                letterSpacing: "-0.028em",
                margin: 0,
              }}
            >
              {heading}
            </h2>
          </div>
          <div style={{ paddingBottom: 12 }}>
            <Eyebrow onDark style={{ marginBottom: 18 }}>
              What you actually sign up for
            </Eyebrow>
            <div style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.85 }}>{lede}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {lanes.map((lane, i) => (
            <Reveal key={lane.n} delay={i * 80}>
              <LaneRow lane={lane} />
            </Reveal>
          ))}
        </div>

        {/* Was a centred italic line on grey. Now a full accent field, which is
            how the decks land their closing statement. */}
        <div
          style={{
            marginTop: 80,
            background: t.accent,
            color: t.paper,
            padding: "56px 48px",
          }}
        >
          <Eyebrow color="rgba(255,255,255,0.75)" style={{ marginBottom: 22 }}>
            The trade
          </Eyebrow>
          <div
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(28px, 3.2vw, 44px)",
              lineHeight: 1.14,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              maxWidth: 920,
            } as CSSProperties}
          >
            {closer}
          </div>
        </div>
      </div>
    </section>
  );
}
