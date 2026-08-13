"use client";

import { CSSProperties, ReactNode, useEffect, useId, useRef, useState } from "react";
import { tokens as t } from "@/lib/tokens";
import { asset } from "@/lib/asset";

// ————————————————————————————————————————————————
// Label — mono uppercase small-caps style label
// ————————————————————————————————————————————————
export function Label({
  children,
  color,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: t.mono,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: color || "currentColor",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ————————————————————————————————————————————————
// Rule — hairline divider
// ————————————————————————————————————————————————
export function Rule({
  color = "currentColor",
  width = "100%",
  opacity = 0.3,
  style,
}: {
  color?: string;
  width?: string | number;
  opacity?: number;
  style?: CSSProperties;
}) {
  return <div style={{ height: 1, width, background: color, opacity, ...style }} />;
}

// ————————————————————————————————————————————————
// EWMark — E monogram inside a thin ring
// ————————————————————————————————————————————————
export function EWMark({
  size = 56,
  ring = t.ink,
  ink = t.ink,
}: {
  size?: number;
  ring?: string;
  ink?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" style={{ display: "block" }}>
      <circle cx="28" cy="28" r="26.5" fill="none" stroke={ring} strokeWidth="1" />
      <circle cx="28" cy="28" r="22" fill="none" stroke={ring} strokeWidth="0.5" opacity="0.5" />
      <path
        d="M20 19 L36 19 L36 21 L22 21 L22 27 L33 27 L33 29 L22 29 L22 35 L36 35 L36 37 L20 37 Z"
        fill={ink}
      />
    </svg>
  );
}

// ————————————————————————————————————————————————
// Wordmark
// ————————————————————————————————————————————————
export function Wordmark({
  color = t.ink,
  size = 14,
  withMark = false,
  markRing,
}: {
  color?: string;
  size?: number;
  withMark?: boolean;
  markRing?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, color }}>
      {withMark && <EWMark size={22} ring={markRing || color} ink={color} />}
      <div
        style={{
          fontFamily: t.sansDisplay,
          fontSize: size,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Elevated<span style={{ opacity: 0.55, margin: "0 0.4em" }}>·</span>Wireless
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————
// DuotonePhoto — SVG filter, 2 (or 3) color stops,
// with arithmetic blend back toward source via `intensity`.
// ————————————————————————————————————————————————
function hex2rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

export function DuotonePhoto({
  src,
  alt = "",
  ratio = "16 / 9",
  shadow = "#000000",
  highlight = "#F6F6F6",
  midtone,
  intensity = 0.78,
  focalPoint = "center center",
  style = {},
  className = "",
}: {
  src: string;
  alt?: string;
  ratio?: string;
  shadow?: string;
  highlight?: string;
  midtone?: string;
  intensity?: number;
  focalPoint?: string;
  style?: CSSProperties;
  className?: string;
}) {
  // useId gives a stable SSR-safe unique id; prefix to make it a valid CSS-url target
  const rawId = useId();
  const id = `duo-${rawId.replace(/:/g, "")}`;

  const stops = midtone
    ? [hex2rgb(shadow), hex2rgb(midtone), hex2rgb(highlight)]
    : [hex2rgb(shadow), hex2rgb(highlight)];

  const tableR = stops.map((s) => s[0].toFixed(4)).join(" ");
  const tableG = stops.map((s) => s[1].toFixed(4)).join(" ");
  const tableB = stops.map((s) => s[2].toFixed(4)).join(" ");

  const wrapperStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: ratio,
    overflow: "hidden",
    background: shadow,
    ...style,
  };

  return (
    <div className={className} style={wrapperStyle}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id={id} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0 0 0 1 0
              "
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={tableR} />
              <feFuncG type="table" tableValues={tableG} />
              <feFuncB type="table" tableValues={tableB} />
            </feComponentTransfer>
            {intensity < 1 && (
              <feComposite
                in2="SourceGraphic"
                operator="arithmetic"
                k1="0"
                k2={intensity.toFixed(2)}
                k3={(1 - intensity).toFixed(2)}
                k4="0"
              />
            )}
          </filter>
        </defs>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPoint,
          display: "block",
          filter: `url(#${id})`,
        }}
      />
    </div>
  );
}

// ————————————————————————————————————————————————
// DECK SYSTEM
// Lifted from the Orioles partnership deck. Four moves carry it:
//   1. tracked uppercase eyebrows above every block
//   2. mixed weight inside one headline (light + bold)
//   3. accent used as a FIELD, not a hairline
//   4. persistent chrome — section rails top, spine at the left edge
// ————————————————————————————————————————————————

// Eyebrow — the tiny tracked uppercase label that sits above every block in
// the deck. The single most repeated move in it.
export function Eyebrow({
  children,
  color,
  onDark = false,
  style,
}: {
  children: ReactNode;
  color?: string;
  onDark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: t.mono,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        color: color || (onDark ? t.metalBright : t.metal),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Em — bold (and optionally accent) run inside a display headline. The deck
// switches weight mid-sentence constantly: "Customers" light / "save" bold.
export function Em({
  children,
  color,
  weight = 700,
}: {
  children: ReactNode;
  color?: string;
  weight?: number;
}) {
  return <span style={{ fontWeight: weight, color }}>{children}</span>;
}

// Knockout — filled block sitting inline behind a headline word.
// Hero slide: "Oriole" in an accent box, "way." in a black box.
export function Knockout({
  children,
  bg = t.accent,
  fg = t.paper,
  style,
}: {
  children: ReactNode;
  bg?: string;
  fg?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        background: bg,
        color: fg,
        display: "inline-block",
        padding: "0.02em 0.14em 0.1em",
        fontWeight: 700,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// SectionRail — per-section chrome. On the deck this is per-slide: label left,
// counter right, hairline under. Maps slides to sections one-for-one.
export function SectionRail({
  label,
  index,
  onDark = false,
  style,
}: {
  label: ReactNode;
  index?: string;
  onDark?: boolean;
  style?: CSSProperties;
}) {
  const line = onDark ? t.metal : t.line;
  return (
    <div style={{ marginBottom: 64, ...style }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          paddingBottom: 12,
        }}
      >
        <Eyebrow onDark={onDark} color={t.accent}>
          {label}
        </Eyebrow>
        {index && <Eyebrow onDark={onDark}>{index}</Eyebrow>}
      </div>
      <Rule color={line} opacity={onDark ? 0.55 : 1} />
    </div>
  );
}

// Spine — the thin accent stripe running down the far left edge of the deck's
// interior slides. Parent must be position:relative.
export function Spine({ width = 6 }: { width?: number }) {
  return (
    <div
      aria-hidden="true"
      className="ew-spine"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width,
        background: t.accent,
      }}
    />
  );
}

// Stat — eyebrow, enormous numeral, hairline, body. `filled` turns the whole
// block into an accent field, which is how the deck marks the winning column.
export function Stat({
  eyebrow,
  value,
  suffix,
  body,
  note,
  filled = false,
  onDark = false,
  size = "md",
}: {
  eyebrow?: ReactNode;
  value: ReactNode;
  suffix?: ReactNode;
  body?: ReactNode;
  note?: ReactNode;
  filled?: boolean;
  onDark?: boolean;
  size?: "md" | "lg";
}) {
  const light = filled || onDark;
  const fg = light ? t.paper : t.ink;
  const fontSize =
    size === "lg" ? "clamp(64px, 8.6vw, 132px)" : "clamp(44px, 5.4vw, 86px)";

  return (
    <div
      style={{
        background: filled ? t.accent : "transparent",
        color: fg,
        padding: filled ? "28px 28px 32px" : "0 0 4px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {eyebrow && (
        <Eyebrow
          color={filled ? "rgba(255,255,255,0.75)" : undefined}
          onDark={onDark}
          style={{ marginBottom: 18 }}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <div
        style={{
          fontFamily: t.sansDisplay,
          fontSize,
          fontWeight: 700,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          display: "flex",
          alignItems: "baseline",
          gap: 2,
        }}
      >
        {value}
        {suffix && (
          <span
            style={{
              fontSize: "0.34em",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              opacity: 0.65,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      {body && (
        <>
          <Rule
            color={filled ? "rgba(255,255,255,0.45)" : light ? t.metal : t.line}
            opacity={1}
            style={{ margin: "26px 0 18px" }}
          />
          <div
            style={{
              fontFamily: t.sans,
              fontSize: 15,
              lineHeight: 1.55,
              opacity: filled ? 0.95 : 0.82,
            }}
          >
            {body}
          </div>
        </>
      )}
      {note && (
        <Eyebrow
          color={filled ? "rgba(255,255,255,0.7)" : undefined}
          onDark={onDark}
          style={{ marginTop: "auto", paddingTop: 22 }}
        >
          {note}
        </Eyebrow>
      )}
    </div>
  );
}

// Panel — the dark supporting-copy block the deck sets beside a light headline.
export function Panel({
  eyebrow,
  children,
  style,
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: t.baseMid,
        color: t.paper,
        padding: "32px 34px 36px",
        ...style,
      }}
    >
      {eyebrow && <Eyebrow onDark style={{ marginBottom: 18 }}>{eyebrow}</Eyebrow>}
      <div style={{ fontSize: 16, lineHeight: 1.62, opacity: 0.9 }}>{children}</div>
    </div>
  );
}

// AccentBar — the full-bleed accent CTA strip that closes the deck.
export function AccentBar({
  eyebrow,
  headline,
  href,
  linkLabel,
}: {
  eyebrow?: ReactNode;
  headline: ReactNode;
  href: string;
  linkLabel: ReactNode;
}) {
  return (
    <a
      href={href}
      className="ew-accent-bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        background: t.accent,
        color: t.paper,
        padding: "26px 32px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <EWMark size={38} ring={t.paper} ink={t.paper} />
        <div>
          {eyebrow && (
            <Eyebrow color="rgba(255,255,255,0.75)" style={{ marginBottom: 7 }}>
              {eyebrow}
            </Eyebrow>
          )}
          <div
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(19px, 2vw, 24px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {headline}
          </div>
        </div>
      </div>
      <div
        style={{
          fontFamily: t.mono,
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(255,255,255,0.6)",
          paddingBottom: 3,
        }}
      >
        {linkLabel}
        <span aria-hidden="true">&rarr;</span>
      </div>
    </a>
  );
}

// ————————————————————————————————————————————————
// Reveal — Intersection Observer fade-in-on-scroll
// ————————————————————————————————————————————————
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  // Render via React.createElement so `as` prop stays flexible
  const TagName = Tag as unknown as "div";
  return (
    <TagName
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </TagName>
  );
}
