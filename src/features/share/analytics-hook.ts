import type { SharePlatform } from "./share-service";

export type ShareActionSource = SharePlatform | "native" | "copy-link";

/**
 * Placeholder hook for future analytics wiring. Intentionally a no-op;
 * only defines the event shape so callers don't need to change later.
 */
export function trackShareAction(
  _source: ShareActionSource,
  _campaign?: { utmSource: string; utmMedium: string; utmCampaign: string }
): void {
  // Intentionally empty in this phase.
}