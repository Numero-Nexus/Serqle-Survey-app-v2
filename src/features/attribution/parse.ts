import { normalizeSource } from "./normalize";
import type { AttributionContext } from "./types";

function readParam(params: URLSearchParams, key: string): string | null {
  const value = params.get(key);
  return value && value.trim().length > 0 ? value.trim() : null;
}

/**
 * Parses attribution from a URL's search params. Never throws; falls back
 * to a "direct" context on any error.
 */
export function parseAttributionFromUrl(url: string): AttributionContext {
  try {
    const { searchParams } = new URL(url);

    return {
      source: normalizeSource(readParam(searchParams, "utm_source")),
      medium: readParam(searchParams, "utm_medium"),
      campaign: readParam(searchParams, "utm_campaign"),
      content: readParam(searchParams, "utm_content"),
      term: readParam(searchParams, "utm_term"),
      sharePlatform: normalizeSource(readParam(searchParams, "share_platform")),
      landingTimestamp: Date.now(),
    };
  } catch {
    return {
      source: "direct",
      medium: null,
      campaign: null,
      content: null,
      term: null,
      sharePlatform: null,
      landingTimestamp: Date.now(),
    };
  }
}