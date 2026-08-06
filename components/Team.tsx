"use client";

import { tokens as t } from "@/lib/tokens";
import { Label, Reveal } from "./primitives";
import { asset } from "@/lib/asset";

type Person = { n: string; r: string; img: string; hero: string; c: string };

const TEAM: Person[] = [
  {
    n: "Joe DeMaria",
    r: "Founder & CEO",
    img: "/img/team/joe.jpg",
    hero: "The Visionary.",
    c: "15 years leading go-to-market and content strategy for universities, corporate learning, and influencer brands. Pioneer in e-learning, serial operator, builder of high-performing teams.",
  },
  {
    n: "Roger Love",
    r: "Co-Founder",
    img: "/img/team/roger.jpg",
    hero: "The Connector.",
    c: "One of the world's foremost authorities on voice. Author of four best-selling books. Clients include Reese Witherspoon, Zoe Saldana, Bradley Cooper, Anthony Robbins, Selena Gomez and more.",
  },
  {
    n: "Betsy Perigo",
    r: "Co-Founder · Chief of Staff",
    img: "/img/team/betsy.jpg",
    hero: "The Integrator.",
    c: "Uniquely suited to the demanding, ever-changing needs of early-stage organizations. Previously ran operations alongside both Roger and Joe, defining internal culture, performance standards, and process.",
  },
  {
    n: "Anthony Flores",
    r: "Chief Marketing Officer",
    img: "/img/team/anthony.jpg",
    hero: "The Amplifier.",
    c: "Two decades. Nearly a billion in sales. Direct-response copywriter and marketer. Worked with the who's-who in marketing from day one, now one of the leading innovators in AI marketing systems.",
  },
];

const ADVISORS: Person[] = [
  {
    n: "Jay Abraham",
    r: "Strategic Advisor",
    img: "/img/team/jay.jpg",
    hero: "The 21.7 Billion Dollar Man.",
    c: "Founder, The Abraham Group. Advised 10,000+ businesses across 1,000+ industries. The most-quoted strategic marketer alive.",
  },
  {
    n: "Jim Poole",
    r: "Founder & CEO, NuCalm",
    img: "/img/team/jim-poole.jpg",
    hero: "The world's only patented neuroscience tech.",
    c: "CEO and Founder of NuCalm, a patented neuroscience technology validated by Harvard and NASA.",
  },
  {
    n: "Rich Goldstein",
    r: "IP & Patent Counsel",
    img: "/img/team/rich-goldstein.png",
    hero: "30 years in patent law.",
    c: "Guides startups and inventors in optimizing IP for valuation and exit. Selected by the American Bar Association to author its consumer guide on obtaining a patent.",
  },
];

const portraitBoxStyle = {
  width: "100%",
  aspectRatio: "4 / 5",
  objectFit: "cover" as const,
  objectPosition: "center top" as const,
  display: "block" as const,
  background: t.paperDim,
};

export function Team() {
  return (
    <section
      id="team"
      data-screen-label="07 Team"
      className="ew-pad-md"
      style={{
        background: t.paper,
        color: t.ink,
        padding: "140px 56px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="ew-stack-md"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "end",
            marginBottom: 72,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(40px, 5.2vw, 68px)",
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Built by operators
              <br />
              with receipts.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, paddingBottom: 10, margin: 0 }}>
            Telecom, brand, product, data, and marketing. The team behind the platform and the
            brands that run on it.
          </p>
        </div>

        {/* Team grid — 3 across, portrait with hero credential */}
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 56 }}>
          <div
            className="ew-stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              columnGap: 28,
              rowGap: 72,
            }}
          >
            {TEAM.map((p, i) => (
              <Reveal key={p.n} delay={(i % 4) * 80}>
                <figure style={{ margin: 0 }}>
                  <div style={{ position: "relative", overflow: "hidden", marginBottom: 22 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(p.img)} alt={p.n} className="portrait" style={portraitBoxStyle} />
                  </div>
                  <Label style={{ opacity: 0.55, marginBottom: 10 }}>{p.r}</Label>
                  <div
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: 26,
                      fontWeight: 500,
                      letterSpacing: "-0.018em",
                      lineHeight: 1.1,
                      marginBottom: 14,
                    }}
                  >
                    {p.n}
                  </div>
                  <div
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: 18,
                      lineHeight: 1.3,
                      letterSpacing: "-0.012em",
                      fontWeight: 500,
                      color: t.ink,
                      marginBottom: 14,
                      paddingBottom: 14,
                      borderBottom: `1px solid ${t.line}`,
                    }}
                  >
                    {p.hero}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.72, margin: 0 }}>{p.c}</p>
                </figure>
              </Reveal>
            ))}
          </div>

        </div>

        {/* Advisors — 5-col portrait strip */}
        <div style={{ marginTop: 120 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <Label style={{ opacity: 0.6 }}>Advisors</Label>
          </div>
          <div
            className="ew-stack-md"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: 32,
              rowGap: 48,
              borderTop: `1px solid ${t.line}`,
              paddingTop: 40,
            }}
          >
            {ADVISORS.map((a, i) => (
              <Reveal key={a.n} delay={(i % 3) * 60}>
                <figure style={{ margin: 0 }}>
                  <div style={{ position: "relative", overflow: "hidden", marginBottom: 18 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(a.img)} alt={a.n} className="portrait" style={portraitBoxStyle} />
                  </div>
                  <div
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: 19,
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.15,
                      marginBottom: 4,
                    }}
                  >
                    {a.n}
                  </div>
                  <div
                    style={{
                      fontFamily: t.mono,
                      fontSize: 11.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      opacity: 0.55,
                      marginBottom: 14,
                    }}
                  >
                    {a.r}
                  </div>
                  <div
                    style={{
                      fontFamily: t.sansDisplay,
                      fontSize: 15,
                      lineHeight: 1.3,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      paddingBottom: 10,
                      marginBottom: 10,
                      borderBottom: `1px solid ${t.line}`,
                    }}
                  >
                    {a.hero}
                  </div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.55, opacity: 0.7, margin: 0 }}>{a.c}</p>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
