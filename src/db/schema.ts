import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

/**
 * Canonical Event Store — append-only. This schema has no update/delete
 * semantics defined anywhere in this codebase; the repository layer
 * (src/db/repository.ts) exposes only insert and read operations,
 * enforcing the "never updated, never deleted" invariant at the
 * application boundary since PostgreSQL itself has no built-in
 * immutability constraint for standard tables.
 */
export const canonicalEvents = pgTable(
  "canonical_events",
  {
    // Internal surrogate key (insertion order, not semantic ordering —
    // semantic/deterministic ordering is `sequenceNumber` below).
    id: uuid("id").defaultRandom().primaryKey(),

    // ---- Envelope fields (mirrors SurveyEvent, Phase 6) ----
    eventId: uuid("event_id").notNull().unique(),
    category: text("category").notNull(),
    type: text("type").notNull(),
    eventTimestamp: timestamp("event_timestamp", { withTimezone: true }).notNull(),
    sequenceNumber: integer("sequence_number").notNull(),
    parentEventId: uuid("parent_event_id"),
    producer: jsonb("producer").notNull(),
    source: text("source").notNull(),
    versions: jsonb("versions").notNull(),
    experiment: jsonb("experiment").notNull(),
    payload: jsonb("payload").notNull(),

    // ---- Provenance fields (this phase, additive) ----
    participantId: text("participant_id").notNull(),
    sessionId: text("session_id").notNull(),
    instrumentVersion: text("instrument_version").notNull(),
    uiVersion: text("ui_version").notNull(),
    clientVersion: text("client_version").notNull(),
    buildIdentifier: text("build_identifier").notNull(),
    deviceCategory: text("device_category").notNull(),
    locale: text("locale").notNull(),
    timezone: text("timezone").notNull(),

    // Flattened for indexing convenience (also present inside `versions` jsonb).
    surveyVersion: text("survey_version").notNull(),

    // Flattened for indexing convenience (also present inside `experiment` jsonb).
    experimentId: text("experiment_id"),
    experimentVariant: text("experiment_variant"),

    // Server-side insertion timestamp (distinct from client-supplied eventTimestamp).
    persistedAt: timestamp("persisted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_canonical_events_event_id").on(table.eventId),
    index("idx_canonical_events_participant_id").on(table.participantId),
    index("idx_canonical_events_session_id").on(table.sessionId),
    index("idx_canonical_events_type").on(table.type),
    index("idx_canonical_events_category").on(table.category),
    index("idx_canonical_events_timestamp").on(table.eventTimestamp),
    index("idx_canonical_events_sequence_number").on(table.sequenceNumber),
    index("idx_canonical_events_experiment_id").on(table.experimentId),
    index("idx_canonical_events_experiment_variant").on(table.experimentVariant),
    index("idx_canonical_events_survey_version").on(table.surveyVersion),
  ]
);

export type CanonicalEventRow = typeof canonicalEvents.$inferSelect;
export type NewCanonicalEventRow = typeof canonicalEvents.$inferInsert;