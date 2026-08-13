"use client";

import { CSSProperties, ReactNode } from "react";
import { tokens as t } from "@/lib/tokens";
import { asset } from "@/lib/asset";
import { Em, Eyebrow, Knockout, Reveal, Spine } from "./primitives";
import { RevenueCalculator } from "./RevenueCalculator";

export type HeroVariant = "gradient" | "band";

const HERO_IMG = "/img/hero.jpg";

// One line, deck-style: bold lead clause then regular continuation. The old
// three-line paragraph was the most crowded thing in the hero, image or no
// image, and the decks never run more than a sentence under the headline.
function Subline({ onPhoto = false }: { onPhoto?: boolean }) {
  return (
    <p
      style={{
        fontFamily: t.sans,
        fontSize: onPhoto ? 18 : 17.5,
        lineHeight: 1.55,
        margin: 0,
        maxWidth: 720,
        color: t.paper,
        opacity: onPhoto ? 0.95 : 0.86,
        textShadow: onPhoto ? "0 1px 24px rgba(0,0,0,0.8)" : undefined,
      }}
    >
      <strong style={{ fontWeight: 700 }}>
        We run the wireless company. You put your name on it.
      </strong>{" "}
      Verizon 5G, and a royalty on every subscriber, every month.
    </p>
  );
}

function Headline({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <h1
      style={{
        fontFamily: t.sansDisplay,
        fontSize:
          align === "left" ? "clamp(40px, 5.4vw, 76px)" : "clamp(40px, 4.6vw, 68px)",
        lineHeight: 1.16,
        fontWeight: 300,
        letterSpacing: "-0.03em",
        margin: 0,
        textWrap: "balance",
        textAlign: align,
        color: t.paper,
        textShadow: "0 2px 32px rgba(0,0,0,0.7)",
      } as CSSProperties}
    >
      Be the phone company for the people who{" "}
      <Knockout>love</Knockout>
      <Knockout bg={t.paper} fg={t.ink}>
        you.
      </Knockout>
    </h1>
  );
}

// Photo plus scrim. Kept in one place so both variants darken identically and
// the image is a single-line swap.
function HeroPhoto({
  scrim,
  focal = "center 42%",
}: {
  scrim: string;
  focal?: string;
}) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(HERO_IMG)}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focal,
          display: "block",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: scrim }} />
    </div>
  );
}

function CTA({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <a
      href="#partner"
      style={{
        display: "inline-flex",
        alignItems: "center",
        alignSelf: align === "left" ? "flex-start" : "center",
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
      <span
        aria-hidden="true"
        style={{ fontSize: 14, opacity: 0.85, lineHeight: 1, fontWeight: 500 }}
      >
        &rarr;
      </span>
    </a>
  );
}

function Shell({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <section
      id="top"
      data-screen-label="02 Hero"
      className="ew-pad-md"
      style={{
        background: t.base,
        color: t.paper,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ————————————————————————————————————————————————
// A — gradient. One continuous hero. The photo sits behind the headline and
// resolves to solid black before the calculator, so nothing sits on top of the
// image except the eyebrow, the headline and one line of copy (the deck's
// element count exactly). The calculator lands on flat black and loses nothing.
// ————————————————————————————————————————————————
function GradientHero() {
  return (
    <Shell style={{ padding: "104px 56px 120px", minHeight: 720 }}>
      <HeroPhoto
        scrim={`linear-gradient(to bottom,
          rgba(0,0,0,0.74) 0%,
          rgba(0,0,0,0.76) 20%,
          rgba(0,0,0,0.86) 44%,
          rgba(0,0,0,0.96) 60%,
          ${t.base} 73%)`}
      />
      <Spine />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div className="ew-hero-center">
              <div className="ew-hero-copy">
                <Eyebrow color="rgba(255,255,255,0.8)">Powered by Verizon 5G</Eyebrow>
                <Headline />
                <Subline onPhoto />
              </div>

              <RevenueCalculator variant="home" className="ew-calc-card" />

              <CTA />
            </div>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

// ————————————————————————————————————————————————
// B — band. Closer to the decks' actual slide 1: a full-bleed photo band with
// left-aligned type and a bottom rail, then the calculator in its own clean
// section beneath. More separation, less "one hero" feeling.
// ————————————————————————————————————————————————
function BandHero() {
  return (
    <>
      <Shell
        style={{
          padding: "0",
          minHeight: "clamp(440px, 58vh, 600px)",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <HeroPhoto
          // Two layers: a directional wash that is heaviest where the type
          // sits, over a bottom-up darkening for the rail. A single light
          // gradient left the headline unreadable against lit faces.
          scrim={`linear-gradient(100deg,
              rgba(0,0,0,0.93) 0%,
              rgba(0,0,0,0.88) 34%,
              rgba(0,0,0,0.76) 66%,
              rgba(0,0,0,0.68) 100%),
            linear-gradient(to top,
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.3) 48%,
              rgba(0,0,0,0.4) 100%)`}
          focal="center 38%"
        />
        <Spine />
        <div
          className="ew-pad-md ew-hero-band"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            padding: "0 56px 46px",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 22,
                  maxWidth: 940,
                }}
              >
                <Eyebrow color="rgba(255,255,255,0.8)">Powered by Verizon 5G</Eyebrow>
                <Headline align="left" />
                <Subline onPhoto />
              </div>
            </Reveal>

            {/* The decks' bottom rail, which is what makes the band read as a
                slide rather than a banner. */}
            <div
              style={{
                marginTop: 38,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.28)",
                display: "flex",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <Eyebrow color="rgba(255,255,255,0.72)">
                The first wireless carrier built for audiences, not customers
              </Eyebrow>
              <Eyebrow color="rgba(255,255,255,0.72)">EW · MMXXVI</Eyebrow>
            </div>
          </div>
        </div>
      </Shell>

      <section
        className="ew-pad-md"
        style={{
          background: t.base,
          color: t.paper,
          padding: "84px 56px 110px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Spine />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ maxWidth: 1240, margin: "0 auto" }}>
              <div className="ew-hero-center">
                {/* No eyebrow here: the calculator carries its own heading and
                    the two read as a stutter. */}
                <RevenueCalculator variant="home" className="ew-calc-card" />
                <CTA />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Hero({ variant = "gradient" }: { variant?: HeroVariant } = {}) {
  return variant === "band" ? <BandHero /> : <GradientHero />;
}

// Kept so the royalty phrase treatment is not lost if the longer lede returns.
export function RoyaltyPhrase() {
  return (
    <Em color={t.metalBright} weight={700}>
      a royalty on every subscriber, every month.
    </Em>
  );
}
