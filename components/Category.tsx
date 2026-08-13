"use client";

import { tokens as t } from "@/lib/tokens";
import { Em, Eyebrow, Reveal, SectionRail, Stat } from "./primitives";

// The numbers were buried in the first paragraph. The deck's move is to make
// the numeral the design, so they are pulled out into a stat row and the
// paragraph keeps the argument.
const STATS = [
  {
    eyebrow: "The market",
    value: "300M",
    body: "Americans carrying a big-three plan right now.",
    note: "AT&T · T-Mobile · Verizon",
  },
  {
    eyebrow: "Spent every year",
    value: "$349B",
    body: "Annual US wireless spend across those three carriers.",
    note: "And climbing",
  },
  {
    eyebrow: "Brand loyalty earned",
    value: "None",
    body: "Thirty years of price, coverage, and speed. A commodity with a logo.",
    note: "This is the opening",
    filled: true,
  },
];

const PARAS = [
  {
    eyebrow: "The incumbents",
    body: "Three carriers split a $349 billion market between them and not one of their customers would describe the relationship as loyalty. They compete on price, coverage, and speed, which is to say they compete on nothing a person can feel.",
  },
  {
    eyebrow: "The barrier that fell",
    body: "The brands people actually love should be competing here. Most still believe in a barrier to entry that fell years ago.",
  },
  {
    eyebrow: "The opening",
    body: "For the brands these customers love, wireless is the next layer of a relationship they've already earned. Elevated is the platform that makes it possible.",
  },
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
        <SectionRail label="01 · The Category" index="01 / 04" />

        {/* Mixed weight inside one line: the deck's signature headline move. */}
        <h2
          style={{
            fontFamily: t.sansDisplay,
            fontSize: "clamp(42px, 5.6vw, 72px)",
            lineHeight: 1.04,
            fontWeight: 300,
            letterSpacing: "-0.025em",
            margin: "0 0 72px",
            maxWidth: 1100,
          }}
        >
          Why it works.{" "}
          <Em color={t.accent}>No one loves their carrier.</Em>
        </h2>

        <Reveal>
          <div className="ew-stat-row" style={{ marginBottom: 96 }}>
            {STATS.map((s) => (
              <div key={s.value} className={s.filled ? "is-filled" : undefined}>
                <Stat
                  eyebrow={s.eyebrow}
                  value={s.value}
                  body={s.body}
                  note={s.note}
                  filled={s.filled}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 56,
          }}
        >
          {PARAS.map((p, i) => (
            <Reveal key={p.eyebrow} delay={i * 80}>
              <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20 }}>
                <Eyebrow style={{ marginBottom: 16 }}>{p.eyebrow}</Eyebrow>
                <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
