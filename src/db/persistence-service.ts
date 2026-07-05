import { sql } from "drizzle-orm";
import { db } from "./client";
import { canonicalEvents, type NewCanonicalEventRow } from "./schema";
import { surveyEventSchema } from "@/research/events/schemas";
import { persistenceProvenanceSchema, type PersistenceProvenance } from "./provenance";
import type { SurveyEvent } from "@/research/events/types";

export class PersistenceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PersistenceValidationError";
  }
}

/**
 * Maps a validated SurveyEvent + PersistenceProvenance into a database row.
 * Performs field mapping ONLY — no behavioural transformation, aggregation,
 * or derivation of any kind. Payload is stored byte-for-byte as received.
 */
function toRow(
  event: SurveyEvent<unknown>,
  provenance: PersistenceProvenance
): NewCanonicalEventRow {
  return {
    eventId: event.eventId,
    category: event.category,
    type: event.type,
    eventTimestamp: new Date(event.timestamp),
    sequenceNumber: event.sequenceNumber,
    parentEventId: event.parentEventId,
    producer: event.producer,
    source: event.source,
    versions: event.versions,
    experiment: event.experiment,
    payload: event.payload,
    participantId: provenance.participantId,
    sessionId: provenance.sessionId,
    instrumentVersion: provenance.instrumentVersion,
    uiVersion: provenance.uiVersion,
    clientVersion: provenance.clientVersion,
    buildIdentifier: provenance.buildIdentifier,
    deviceCategory: provenance.deviceCategory,
    locale: provenance.locale,
    timezone: provenance.timezone,
    surveyVersion: event.versions.surveyVersion,
    experimentId: event.experiment.experimentId ?? null,
    experimentVariant: event.experiment.experimentVariant ?? null,
  };
}

/**
 * Validates a SurveyEvent + PersistenceProvenance pair, throwing
 * PersistenceValidationError if either is malformed. This is the sole
 * validation gate before persistence — nothing reaches the database
 * without passing both schema checks.
 */
function validate(
  event: unknown,
  provenance: unknown
): { event: SurveyEvent<unknown>; provenance: PersistenceProvenance } {
  const eventResult = surveyEventSchema.safeParse(event);
  if (!eventResult.success) {
    throw new PersistenceValidationError(
      `Invalid SurveyEvent: ${eventResult.error.message}`
    );
  }

  const provenanceResult = persistenceProvenanceSchema.safeParse(provenance);
  if (!provenanceResult.success) {
    throw new PersistenceValidationError(
      `Invalid PersistenceProvenance: ${provenanceResult.error.message}`
    );
  }

  return {
    event: eventResult.data as SurveyEvent<unknown>,
    provenance: provenanceResult.data,
  };
}

/**
 * Persists a single canonical event. Idempotent by `eventId` — a retry
 * with the same event is a safe no-op (ON CONFLICT DO NOTHING) rather than
 * an error or a duplicate row, satisfying "retry-safe operations."
 */
export async function persistEvent(
  rawEvent: unknown,
  rawProvenance: unknown
): Promise<void> {
  const { event, provenance } = validate(rawEvent, rawProvenance);
  const row = toRow(event, provenance);

  await db
    .insert(canonicalEvents)
    .values(row)
    .onConflictDoNothing({ target: canonicalEvents.eventId });
}

/**
 * Persists a batch of canonical events transactionally — either all
 * succeed or the entire batch is rolled back. Deterministic ordering is
 * preserved because rows are inserted in array order and `sequenceNumber`
 * is preserved verbatim from each event.
 */
export async function persistEventBatch(
  items: Array<{ event: unknown; provenance: unknown }>
): Promise<void> {
  if (items.length === 0) return;

  const rows = items.map(({ event, provenance }) => {
    const validated = validate(event, provenance);
    return toRow(validated.event, validated.provenance);
  });

  await db.transaction(async (tx) => {
    await tx
      .insert(canonicalEvents)
      .values(rows)
      .onConflictDoNothing({ target: canonicalEvents.eventId });
  });
}

/** Re-exported for callers that want to check server connectivity without inserting data. */
export async function healthCheck(): Promise<boolean> {
  const result = await db.execute(sql`SELECT 1`);
  return result.rows.length > 0;
}