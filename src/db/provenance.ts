import { z } from "zod";

/**
 * Provenance metadata captured at persistence time, additive to (not part
 * of) the Phase 6 canonical event envelope. Kept separate so the
 * already-versioned SurveyEvent contract never needs retroactive changes.
 */
export const persistenceProvenanceSchema = z.object({
  /** Anonymous, client-generated identifier — never tied to real identity. */
  participantId: z.string().min(1),
  /** Identifier for a single continuous survey session. */
  sessionId: z.string().min(1),

  instrumentVersion: z.string().min(1),
  uiVersion: z.string().min(1),
  clientVersion: z.string().min(1),
  buildIdentifier: z.string().min(1),

  deviceCategory: z.enum(["mobile", "tablet", "desktop", "unknown"]),
  locale: z.string().min(1),
  timezone: z.string().min(1),
});

export type PersistenceProvenance = z.infer<typeof persistenceProvenanceSchema>;