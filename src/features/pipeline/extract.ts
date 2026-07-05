import { eventRepository } from "@/db/repository";
import type { CanonicalEventRow } from "@/db/schema";

/**
 * Read-only extraction of all canonical events for a session, in
 * deterministic (sequenceNumber) order. This is the ONLY point where the
 * feature pipeline touches the Canonical Event Store — it never writes,
 * updates, or derives anything here; that happens in transform.ts.
 */
export async function extractSessionEvents(
  sessionId: string
): Promise<CanonicalEventRow[]> {
  return eventRepository.findBySessionId(sessionId);
}

/** Convenience: extracts events for a session and groups them by `type`. */
export async function extractSessionEventsByType(
  sessionId: string
): Promise<Record<string, CanonicalEventRow[]>> {
  const events = await extractSessionEvents(sessionId);
  const grouped: Record<string, CanonicalEventRow[]> = {};

  for (const event of events) {
    if (!grouped[event.type]) {
      grouped[event.type] = [];
    }
    grouped[event.type].push(event);
  }

  return grouped;
}