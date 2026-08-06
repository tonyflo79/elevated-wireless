// Verizon-aligned palette: black, white, red.
// accent is #EE001E, sampled from verizon.com's production stylesheets
// (the widely published #EE0000 does not appear in their CSS).
// Red is an accent only: CTAs, active states, rules, small highlights.
// Black and white carry the design.
export const tokens = {
  base: "#000000",
  baseMid: "#1B1D1F",
  ink: "#000000",
  paper: "#FFFFFF",
  paperDim: "#F6F6F6",
  line: "#D8DADA",
  metal: "#6F7171",
  metalBright: "#A7A7A7",
  accent: "#EE001E",
  sansDisplay:
    "var(--font-display), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sans: "var(--font-sans), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "var(--font-mono), ui-monospace, monospace",
} as const;

export type Tokens = typeof tokens;
