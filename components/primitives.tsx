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
