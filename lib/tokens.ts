// Verizon-aligned palette: black, white, red.
// accent is #CD040B — a deeper red than Verizon's own #EE001E, which read too
// hot once the colour started carrying whole fields rather than hairlines.
//
// Red is a FIELD, not a highlight. It fills half-panels, the winning stat
// block, and the closing CTA bar, exactly as the partner decks use garnet and
// orange. Black and white are the ground it sits on.
//
// This is the one value a partner skin changes: swap accent and the whole
// system reskins (Orioles orange, South Carolina garnet, and so on).
export const tokens = {
  base: "#000000",
  baseMid: "#1B1D1F",
  ink: "#000000",
  paper: "#FFFFFF",
  paperDim: "#F6F6F6",
  line: "#D8DADA",
  metal: "#6F7171",
  metalBright: "#A7A7A7",
  accent: "#CD040B",
  sansDisplay:
    "var(--font-display), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  sans: "var(--font-sans), 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "var(--font-mono), ui-monospace, monospace",
} as const;

export type Tokens = typeof tokens;
