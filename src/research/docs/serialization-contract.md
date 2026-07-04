# Serialization Contract

Defines the canonical shapes data takes as it moves through the pipeline.
No persistence or export is implemented in this phase — these are the
contracts a future persistence/export phase must conform to.

## 1. Raw Event JSON

The literal output of `createSurveyEvent()` before/after Zod validation —
this **is** the canonical shape (there is no separate "pre-validation"
representation in this architecture; validation happens at construction
time, per Step 3). Example shape:

```json
{
  "eventId": "uuid",
  "category": "interaction",
  "type": "question_answered",
  "timestamp": "2026-07-04T20:05:24.876Z",
  "sequenceNumber": 3,
  "parentEventId": null,
  "producer": { "name": "survey-ui", "version": "1.0.0" },
  "source": "screen-2-ideal-free-time",
  "versions": {
    "eventVersion": "1.0.0",
    "schemaVersion": "1.0.0",
    "surveyVersion": "free-time-fast-choices-v3",
    "featureVersion": "unversioned",
    "rewardVersion": "unversioned"
  },
  "experiment": {},
  "payload": { "questionId": "s2-ideal-free-time", "screenId": "screen-2-ideal-free-time", "value": "cafe", "timeToAnswerMs": 4213 }
}
```

## 2. Canonical Event JSON

Identical shape to Raw Event JSON in this architecture — "canonical"
means "has passed `surveyEventSchema.safeParse` and is frozen." There is
no additional enrichment step in this phase.

## 3. Normalized Research JSON (future)

A flattened, per-participant-session record combining all events into
research-variable form (per Feature Lineage, Step 13). Not implemented;
conceptual shape:

```json
{
  "sessionId": "uuid",
  "surveyVersion": "free-time-fast-choices-v3",
  "answers": { "s2-ideal-free-time": "cafe", "card-1": "coffee-friend", "...": "..." },
  "decision_confidence": 0.82,
  "risk_appetite_lean": "moderate",
  "decision_consistency": true,
  "attention_check_pass": true,
  "total_session_duration_ms": 132400
}
```

## 4. Research Dataset Mapping (future)

Maps each Dataset Column (from Feature Lineage) to a stable, versioned
name and type — this mapping IS the schema for the eventual research
dataset. Not implemented; governed by `schemaVersion`.

## 5. CSV Export Mapping (future)

One row per completed session; one column per Dataset Column. Ordering
governed by the Research Dataset Mapping above so exports remain stable
across `schemaVersion` bumps.

## 6. Parquet Export Mapping (future)

Same logical schema as the CSV mapping, using Parquet's native typed
columns (e.g. `float64` for `decision_confidence`, `bool` for
`attention_check_pass`) instead of stringified CSV values — preferred for
large-scale (1,200+ record) analysis per Phase 4's target participant range.

## Determinism Guarantee

Because `SurveyEvent` records are immutable (`Object.freeze`) and appended
in strict `sequenceNumber` order (Step 3's monotonic counter), serializing
the same collected session twice always produces byte-identical JSON —
satisfying the "serialization is deterministic" verification requirement.

## Experiment Metadata Coverage

All 9 fields required by this phase's "Experiment Metadata" scope item
are already defined (Step 2, `src/research/events/types.ts`):
`experimentId`, `experimentVariant`, `surveyVersion`, `schemaVersion`,
`featureVersion`, `rewardVersion`, `eventVersion`, `questionOrder`,
`screenOrder`. No randomization is executed against them in this phase.