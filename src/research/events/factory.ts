import { surveyEventSchema } from "./schemas";
import type {
  EventCategory,
  EventProducer,
  EventVersions,
  ExperimentMetadata,
  SurveyEvent,
} from "./types";

/**
 * Monotonic per-session sequence counter. Reset via `resetEventSequence`
 * (useful for tests/replay scenarios where a fresh deterministic sequence
 * is required).
 */
let sequenceCounter = 0;

export function resetEventSequence(): void {
  sequenceCounter = 0;
}

interface CreateEventInput<TPayload> {
  category: EventCategory;
  type: string;
  producer: EventProducer;
  source: string;
  versions: EventVersions;
  payload: TPayload;
  parentEventId?: string | null;
  experiment?: ExperimentMetadata;
}

/**
 * Creates a canonical, immutable SurveyEvent. This is the ONLY sanctioned
 * way to construct an event — ensures every event is versioned, sequenced,
 * timestamped, and schema-valid at creation time.
 */
export function createSurveyEvent<TPayload>(
  input: CreateEventInput<TPayload>
): SurveyEvent<TPayload> {
  const event: SurveyEvent<TPayload> = {
    eventId: crypto.randomUUID(),
    category: input.category,
    type: input.type,
    timestamp: new Date().toISOString(),
    sequenceNumber: sequenceCounter++,
    parentEventId: input.parentEventId ?? null,
    producer: input.producer,
    source: input.source,
    versions: input.versions,
    experiment: input.experiment ?? {},
    payload: input.payload,
  };

  const validation = surveyEventSchema.safeParse(event);
  if (!validation.success) {
    throw new Error(
      `Invalid SurveyEvent constructed: ${validation.error.message}`
    );
  }

  return Object.freeze(event);
}