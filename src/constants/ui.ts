/** Responsive breakpoints, mirrored from the Tailwind theme for use in JS/TS logic. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** Standard animation/transition durations in milliseconds, mirrored from CSS tokens. */
export const TIMING = {
  fast: 150,
  base: 250,
} as const;