/**
 * Canonical event categories. Every domain event must belong to exactly one.
 */
export type EventCategory =
  | "lifecycle"
  | "interaction"
  | "navigation"
  | "validation"
  | "submission"
  | "research";

/** Identifies what layer produced an event. */
export interface EventProducer {
  /** e.g. "survey-engine", "survey-ui", "research-instrumentation" */
  name: string;
  /** Version of the producing module, independent of event/schema version. */
  version: string;
}

/**
 * Versioning block. Every version is tracked independently so that any
 * one axis (survey content, event schema, feature logic, reward logic)
 * can evolve without invalidating the others.
 */
export interface EventVersions {
  eventVersion: string;
  schemaVersion: string;
  surveyVersion: string;
  featureVersion: string;
  rewardVersion: string;
}

/**
 * Future experimentation metadata. Fields are optional because no
 * experimentation is executed in this phase — only the shape is defined
 * so later phases can populate it without a breaking schema change.
 */
export interface ExperimentMetadata {
  experimentId?: string;
  experimentVariant?: string;
  questionOrder?: string[];
  screenOrder?: string[];
}

/**
 * The canonical event envelope. Every domain event in the system is a
 * `SurveyEvent<TPayload>` — immutable, versioned, and traceable to a
 * parent event for causal/session reconstruction.
 */
export interface SurveyEvent<TPayload = unknown> {
  /** Globally unique identifier for this event instance. */
  eventId: string;
  /** Category this event belongs to. */
  category: EventCategory;
  /** Specific event type name within its category, e.g. "question_answered". */
  type: string;
  /** ISO-8601 timestamp of when the event was produced. */
  timestamp: string;
  /** Monotonically increasing sequence number within a session, for deterministic ordering/replay. */
  sequenceNumber: number;
  /** Event ID of the event that causally preceded/triggered this one, if any. */
  parentEventId: string | null;
  /** What produced this event. */
  producer: EventProducer;
  /** Where the event originated, e.g. "screen-4-micro-scenarios-a". */
  source: string;
  /** All version identifiers active when this event was produced. */
  versions: EventVersions;
  /** Experimentation context, if any is active. */
  experiment: ExperimentMetadata;
  /** Event-specific data. Shape is defined per concrete event type (Step 4). */
  payload: TPayload;
}