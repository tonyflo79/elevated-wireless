"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { tokens as t } from "@/lib/tokens";

// ————————————————————————————————————————————————
// Revenue calculator — the proposal finance slide, live.
// audience × conversion × $10/sub/mo royalty → monthly + yearly.
// Paper card on the navy hero; mounts on home + /universities.
// ————————————————————————————————————————————————

// Audience stops, 500K → 100M. Log-ish ladder, densest in the
// 500K–10M band where every university and collective lives.
function buildStops(): number[] {
  const stops: number[] = [];
  for (let v = 500_000; v < 2_000_000; v += 100_000) stops.push(v);
  for (let v = 2_000_000; v < 10_000_000; v += 250_000) stops.push(v);
  for (let v = 10_000_000; v < 30_000_000; v += 1_000_000) stops.push(v);
  for (let v = 30_000_000; v <= 100_000_000; v += 5_000_000) stops.push(v);
  return stops;
}
const STOPS = buildStops();

function nearestStopIndex(value: number): number {
  let best = 0;
  for (let i = 1; i < STOPS.length; i++) {
    if (Math.abs(STOPS[i] - value) < Math.abs(STOPS[best] - value)) best = i;
  }
  return best;
}

const ROYALTY = 10;
const CONV_PRESETS = [0.5, 1, 2];

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

function trimZeros(s: string): string {
  return s.replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
}

function fmtMoney(n: number): string {
  if (n >= 995_000_000) return "$" + trimZeros((n / 1e9).toFixed(2)) + "B";
  if (n >= 995_000) return "$" + trimZeros((n / 1e6).toFixed(1)) + "M";
  return "$" + fmtInt(n);
}

function fmtConv(c: number): string {
  return trimZeros(c.toFixed(1)) + "%";
}

// Eased count-up toward a moving target; snaps when motion is reduced.
function useCountUp(target: number, duration = 550): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      current.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

type Variant = "home" | "university";

const VARIANTS: Record<
  Variant,
  {
    title: string;
    audienceLabel: string;
    convLabel: string;
    noun: string;
    defaultAudience: number;
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  home: {
    title: "What's your audience worth?",
    audienceLabel: "Your audience",
    convLabel: "Share who sign up",
    noun: "people",
    defaultAudience: 10_000_000,
    ctaLabel: "Get your exact number",
    ctaHref: "#partner",
  },
  university: {
    title: "What's your fan base worth?",
    audienceLabel: "Fans & alumni",
    convLabel: "Fans who sign up",
    noun: "fans",
    defaultAudience: 2_000_000,
    ctaLabel: "Get your exact number",
    ctaHref:
      "mailto:partnerships@getelevatedwireless.com?subject=University%20Briefing%20%E2%80%94%20Our%20Numbers",
  },
};

export function RevenueCalculator({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const v = VARIANTS[variant];
  const [audienceIdx, setAudienceIdx] = useState(() =>
    nearestStopIndex(v.defaultAudience)
  );
  const [conv, setConv] = useState(1);
  const [brand, setBrand] = useState<string | null>(null);

  // Prefill from URL (?audience=850000&conv=1&brand=Sun%20Devils) —
  // powers personalized outbound links; static-export safe.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const a = Number(q.get("audience"));
    if (Number.isFinite(a) && a > 0) {
      setAudienceIdx(nearestStopIndex(Math.min(100_000_000, Math.max(500_000, a))));
    }
    const c = Number(q.get("conv"));
    if (Number.isFinite(c) && c > 0) {
      setConv(Math.round(Math.min(5, Math.max(0.1, c)) * 10) / 10);
    }
    const b = q.get("brand");
    if (b) {
      const clean = b.replace(/[^A-Za-z0-9 &'.\-]/g, "").trim().slice(0, 40);
      if (clean) setBrand(clean);
    }
  }, []);

  const audience = STOPS[audienceIdx];
  const subs = Math.round(audience * (conv / 100));
  const monthly = useCountUp(subs * ROYALTY);
  const yearly = monthly * 12;

  const label: CSSProperties = {
    fontFamily: t.sans,
    fontSize: 13,
    opacity: 0.62,
    margin: 0,
  };
  const readout: CSSProperties = {
    fontFamily: t.sans,
    fontSize: 15,
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    margin: 0,
  };

  return (
    <div
      className={className}
      style={{
        background: t.paper,
        color: t.ink,
        borderTop: `3px solid ${t.metalBright}`,
        padding: "24px 26px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2
        style={{
          fontFamily: t.sansDisplay,
          fontSize: 21,
          lineHeight: 1.15,
          fontWeight: 500,
          letterSpacing: "-0.015em",
          margin: 0,
          textWrap: "balance",
        } as CSSProperties}
      >
        {brand ? `What are ${brand} fans worth?` : v.title}
      </h2>

      {/* Audience */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <label htmlFor={`ew-audience-${variant}`} style={label}>
            {brand ? `${brand} fans` : v.audienceLabel}
          </label>
          <p style={readout}>{fmtInt(audience)}</p>
        </div>
        <input
          id={`ew-audience-${variant}`}
          className="ew-range"
          type="range"
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={audienceIdx}
          aria-valuetext={`${fmtInt(audience)} ${v.noun}`}
          onChange={(e) => setAudienceIdx(Number(e.target.value))}
        />
      </div>

      {/* Conversion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <label htmlFor={`ew-conv-${variant}`} style={label}>
            {v.convLabel}
          </label>
          <p style={readout}>{fmtConv(conv)}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {CONV_PRESETS.map((c) => {
            const active = Math.abs(conv - c) < 0.001;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setConv(c)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  fontFamily: t.mono,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: active ? t.base : "transparent",
                  color: active ? t.paper : t.ink,
                  border: `1px solid ${active ? t.base : t.line}`,
                }}
              >
                {fmtConv(c)}
              </button>
            );
          })}
        </div>
        <input
          id={`ew-conv-${variant}`}
          className="ew-range"
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={conv}
          aria-valuetext={fmtConv(conv)}
          onChange={(e) => setConv(Number(e.target.value))}
        />
      </div>

      {/* Result */}
      <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ ...label, fontVariantNumeric: "tabular-nums" }}>
          {fmtInt(subs)} subscribers × ${ROYALTY} monthly royalty
        </p>
        {[
          { value: monthly, suffix: "/ month" },
          { value: yearly, suffix: "/ year" },
        ].map(({ value, suffix }) => (
          <div
            key={suffix}
            style={{ display: "flex", alignItems: "baseline", gap: 10, whiteSpace: "nowrap" }}
          >
            <span
              className="ew-num-shimmer"
              style={{
                fontFamily: t.sansDisplay,
                fontSize: "clamp(30px, 2.6vw, 36px)",
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtMoney(value)}
            </span>
            <span style={{ fontFamily: t.sans, fontSize: 14, opacity: 0.55 }}>{suffix}</span>
          </div>
        ))}
      </div>

      <a
        href={v.ctaHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          alignSelf: "flex-start",
          fontFamily: t.mono,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: t.base,
          borderBottom: `1px solid ${t.metal}`,
          paddingBottom: 4,
        }}
      >
        {v.ctaLabel}
        <span aria-hidden="true" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1, fontWeight: 500 }}>→</span>
      </a>
    </div>
  );
}
