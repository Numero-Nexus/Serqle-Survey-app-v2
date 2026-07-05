"use server";

import { persistEvent } from "./persistence-service";
import type { PersistenceProvenance } from "./provenance";

/**
 * Server Action bridging client-side instrumentation to the server-only
 * Canonical Event Store. This is the ONLY point where event data crosses
 * from the browser to the database — the client never imports `pg` or
 * Drizzle directly.
 */
export async function persistEventAction(
  event: unknown,
  provenance: PersistenceProvenance
): Promise<{ success: boolean; error?: string }> {
  try {
    await persistEvent(event, provenance);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown persistence error",
    };
  }
}