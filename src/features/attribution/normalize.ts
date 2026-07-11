import type { AttributionSource } from "./types";

const KNOWN_SOURCES: Record<string, AttributionSource> = {
  whatsapp: "whatsapp",
  twitter: "twitter",
  x: "twitter",
  linkedin: "linkedin",
  facebook: "facebook",
  telegram: "telegram",
  reddit: "reddit",
  discord: "discord",
  slack: "slack",
  manual: "manual",
};

export function normalizeSource(raw: string | null | undefined): AttributionSource {
  if (!raw) return "direct";
  const key = raw.trim().toLowerCase();
  return KNOWN_SOURCES[key] ?? "direct";
}