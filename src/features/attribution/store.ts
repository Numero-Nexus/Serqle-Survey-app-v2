import type { AttributionContext } from "./types";

let cachedAttribution: AttributionContext | null = null;

/** Sets attribution once per session; subsequent calls are no-ops. */
export function setAttributionOnce(context: AttributionContext): void {
  if (cachedAttribution !== null) return;
  cachedAttribution = context;
}

export function getAttribution(): AttributionContext | null {
  return cachedAttribution;
}