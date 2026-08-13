"use client";

import { tokens as t } from "@/lib/tokens";
import { DuotonePhoto, Em, Eyebrow, Reveal, SectionRail } from "./primitives";

// ————————————————————————————————————————————————
// 6a — NetworkDiagram
// Verizon 5G → Elevated (hub) → Brand carriers → Members
// (Reach Mobile intentionally omitted from the public topology.)
// ————————————————————————————————————————————————
function NetworkDiagram() {
  // Wide canvas: this runs the full width of the section rather than sitting in
  // a half-row, so the geometry is spread out and the labels are set larger.
  const W = 1200;
  const H = 460;
  const cols = [
    { x: 150, label: "Verizon 5G", sub: "Network", r: 34, hub: false },
    { x: 450, label: "Elevated", sub: "Operating co", r: 46, hub: true },
    { x: 790, label: "Brand carrier", sub: "White-label", r: 28, hub: false },
    { x: 1050, label: "Members", sub: "", r: 10, hub: false },
  ];
  const HUB_IDX = 1;
  const BRAND_IDX = 2;
  const MEMBER_IDX = 3;
  const cy = H / 2;
  const brandYs = [cy - 125, cy, cy + 125];
  const memberDots = (bx: number, by: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const ang = -Math.PI / 3 + ((Math.PI * 2) / 3) * (i / 4);
      pts.push({ x: bx + Math.cos(ang) * 95, y: by + Math.sin(ang) * 46 });
    }
    return pts;
  };
  return (
    <div
      style={{
        border: `1px solid ${t.line}`,
        background: t.paper,
        position: "relative",
        overflow: "hidden",
        padding: 32,
        boxSizing: "border-box",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", height: "auto" }}
      >
        <defs>
          <pattern id="grid6a" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={t.line} strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid6a)" />

        {/* Verizon to Elevated */}
        <line
          x1={cols[0].x + cols[0].r}
          y1={cy}
          x2={cols[HUB_IDX].x - cols[HUB_IDX].r}
          y2={cy}
          stroke={t.ink}
          strokeWidth="1.25"
        />

        {/* Elevated to 3 brand carriers */}
        {brandYs.map((by, i) => (
          <line
            key={`eb${i}`}
            x1={cols[HUB_IDX].x + cols[HUB_IDX].r}
            y1={cy}
            x2={cols[BRAND_IDX].x - cols[BRAND_IDX].r}
            y2={by}
            stroke={t.ink}
            strokeWidth="1.25"
            opacity="0.85"
          />
        ))}

        {/* Brands to members */}
        {brandYs.map((by, i) => {
          const pts = memberDots(cols[MEMBER_IDX].x, by);
          return (
            <g key={`bm${i}`}>
              {pts.map((p, j) => (
                <line
                  key={j}
                  x1={cols[BRAND_IDX].x + cols[BRAND_IDX].r}
                  y1={by}
                  x2={p.x}
                  y2={p.y}
                  stroke={t.metal}
                  strokeWidth="0.8"
                  strokeDasharray="3 4"
                  opacity="0.7"
                />
              ))}
              {pts.map((p, j) => (
                <circle key={`m${j}`} cx={p.x} cy={p.y} r="3.4" fill={t.ink} opacity="0.75" />
              ))}
            </g>
          );
        })}

        {/* Nodes */}
        {cols.map((c, i) => {
          if (i === BRAND_IDX) {
            return brandYs.map((by, j) => (
              <g key={`brand-${j}`}>
                <circle cx={c.x} cy={by} r={c.r} fill={t.paper} stroke={t.ink} strokeWidth="1.25" />
                <circle cx={c.x} cy={by} r="6.5" fill={t.ink} opacity="0.9" />
              </g>
            ));
          }
          if (i === MEMBER_IDX) return null;
          return (
            <g key={c.label}>
              {c.hub && (
                <>
                  <circle cx={c.x} cy={cy} r={c.r + 13} fill="none" stroke={t.metal} strokeWidth="0.6" opacity="0.4" />
                  <circle cx={c.x} cy={cy} r={c.r + 23} fill="none" stroke={t.metal} strokeWidth="0.6" opacity="0.2" />
                </>
              )}
              <circle
                cx={c.x}
                cy={cy}
                r={c.r}
                fill={c.hub ? t.base : t.paper}
                stroke={c.hub ? t.base : t.ink}
                strokeWidth="1.5"
              />
              {c.hub && (
                <text
                  x={c.x}
                  y={cy + 8}
                  textAnchor="middle"
                  fill={t.paper}
                  style={{ fontFamily: "serif", fontSize: 26, fontStyle: "italic", fontWeight: 500 }}
                >
                  E
                </text>
              )}
              {!c.hub && <circle cx={c.x} cy={cy} r={c.r * 0.35} fill={t.ink} opacity="0.85" />}
            </g>
          );
        })}

        {/* Labels */}
        {cols.map((c, i) => {
          const y = i === BRAND_IDX ? brandYs[0] - c.r - 24 : cy - c.r - 24;
          return (
            <g key={`lbl-${i}`}>
              <text
                x={c.x}
                y={y}
                textAnchor="middle"
                fill={t.ink}
                style={{ fontFamily: "inherit", fontSize: 17, fontWeight: 600, letterSpacing: "0.01em" }}
              >
                {c.label}
              </text>
              {c.sub && (
                <text
                  x={c.x}
                  y={y + 18}
                  textAnchor="middle"
                  fill={t.metal}
                  style={{
                    fontFamily: t.mono,
                    fontSize: 11.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* Brand-layer bracket */}
        <g opacity="0.6">
          <path
            d={`M ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 12} ${brandYs[0]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 18} ${brandYs[0]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 18} ${brandYs[2]} L ${cols[BRAND_IDX].x + cols[BRAND_IDX].r + 12} ${brandYs[2]}`}
            fill="none"
            stroke={t.metal}
            strokeWidth="0.9"
          />
          <text
            x={cols[BRAND_IDX].x + cols[BRAND_IDX].r + 26}
            y={cy + 4}
            fill={t.metal}
            style={{
              fontFamily: t.mono,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            n brands
          </text>
        </g>
      </svg>
    </div>
  );
}

// ————————————————————————————————————————————————
// Platform section
// ————————————————————————————————————————————————
type Row = {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  diagram?: "network";
  img?: string;
  src?: string;
};

const ROWS: Row[] = [
  {
    label: "Network + Operations",
    title: "Verizon 5G, end-to-end.",
    body: "Connectivity via our MVNO partnership. SIM provisioning, device activation, billing, customer support, regulatory compliance, carrier reporting. All handled.",
    bullets: [
      "Verizon 5G nationwide (same network, different experience)",
      "MVNO operations end-to-end",
      "Billing, compliance, support infrastructure",
      "Onboard a brand in weeks, not quarters",
    ],
    diagram: "network",
  },
  {
    label: "Data + Intelligence",
    title: "Descriptive to prescriptive.",
    body: "Purpose-built analytics across every layer of the business. We don't just run the wireless; we learn from it.",
    bullets: [
      "User-level metrics: activation, usage, engagement, churn",
      "Cohort intelligence and segmentation",
      "Churn prediction, revenue forecasting, capacity planning",
      "Partner dashboards and A/B testing infrastructure",
    ],
  },
  {
    label: "Marketplace",
    title: "And the extras that make members stay",
    body: "On top of the service itself, every brand can switch on a curated marketplace of partner perks, experiences, and expert access for its subscribers. It's not the pitch. It's the retention layer. Your members get more than a signal; you get subscribers who stay.",
    bullets: [
      "Curated partner perks, experiences, and expert access",
      "Category-locked per partner, never generic rewards",
      "Audience stays yours, no cross-carrier sharing or list commingling",
      "Switched on per brand, a retention layer rather than the pitch",
    ],
    img: "editorial · member perks",
    src: "/img/platform-6c.jpg",
  },
];

function RowContent({ r }: { r: Row }) {
  return (
    <div>
      {/* r.label was defined on every row but never rendered. It is the deck's
          eyebrow, so it goes above the heading. */}
      <Eyebrow style={{ marginBottom: 18 }}>{r.label}</Eyebrow>
      <h3
        style={{
          fontFamily: t.sansDisplay,
          fontSize: "clamp(32px, 3.6vw, 44px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          margin: "0 0 20px",
        }}
      >
        {r.title}
      </h3>
      <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", opacity: 0.8, maxWidth: 560 }}>
        {r.body}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {r.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: 14,
              fontSize: 14,
              lineHeight: 1.5,
              opacity: 0.82,
            }}
          >
            <span
              style={{
                color: t.accent,
                flexShrink: 0,
                fontFamily: t.mono,
                fontSize: 11,
                fontWeight: 700,
                paddingTop: 3,
              }}
            >
              —
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RowVisual({ r }: { r: Row }) {
  if (r.diagram === "network") return <NetworkDiagram />;
  return (
    <DuotonePhoto
      ratio="4 / 3"
      shadow={t.base}
      highlight={t.paper}
      midtone={t.metal}
      src={r.src!}
      alt={r.img || ""}
      style={{ height: 420, aspectRatio: "auto" }}
    />
  );
}

export function Platform() {
  return (
    <section
      id="platform"
      data-screen-label="06 Platform"
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
        <SectionRail label="03 · The Platform" index="03 / 04" />
        <div style={{ marginBottom: 80, maxWidth: 1100 }}>
          <h2
            style={{
              fontFamily: t.sansDisplay,
              fontSize: "clamp(40px, 5.2vw, 68px)",
              lineHeight: 1.06,
              fontWeight: 300,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Everything a brand needs to become a carrier,{" "}
            <Em color={t.accent}>and nothing they shouldn&apos;t have to touch.</Em>
          </h2>
        </div>

        {ROWS.map((r, i) => {
          // 6a stacks so the diagram can run the full width of the section.
          // 6b has no visual at all now, so it is copy on a held width rather
          // than one column stranded beside empty space.
          const stacked = r.diagram === "network";
          const copyOnly = !r.diagram && !r.src;
          const rowFrame = {
            padding: "60px 0",
            borderTop: `1px solid ${t.line}`,
          };

          if (stacked) {
            return (
              <Reveal key={r.label} delay={i * 80}>
                <div style={rowFrame}>
                  <div style={{ maxWidth: 900, marginBottom: 48 }}>
                    <RowContent r={r} />
                  </div>
                  <RowVisual r={r} />
                </div>
              </Reveal>
            );
          }

          if (copyOnly) {
            return (
              <Reveal key={r.label} delay={i * 80}>
                <div style={{ ...rowFrame, maxWidth: 900 }}>
                  <RowContent r={r} />
                </div>
              </Reveal>
            );
          }

          return (
            <Reveal key={r.label} delay={i * 80}>
              <div
                className="ew-stack-md"
                style={{
                  ...rowFrame,
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                }}
              >
                <RowContent r={r} />
                <RowVisual r={r} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
