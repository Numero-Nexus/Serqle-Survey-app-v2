# Canonical Event Catalogue

Every sanctioned event type, its structural details, and its place in the
research ontology (Step 1). This catalogue is the authoritative source for
"what events exist and why" — matches `EventPayloadMap` in
`src/research/events/taxonomy.ts` exactly (13 event types).

---

### `session_started`
- **Category:** lifecycle
- **Producer:** survey-ui (v1.0.0)
- **Consumer:** research-instrumentation (via event bus wildcard subscription)
- **Payload:** `{ deviceType, viewportWidth, viewportHeight }`
- **Version:** eventVersion 1.0.0
- **Research Purpose:** Establish session start and interface covariates.
- **Behaviour Measured:** None directly — contextual covariate.
- **Ontology Node:** Observation → Interaction (session begins)

### `session_completed`
- **Category:** lifecycle
- **Producer:** survey-ui · **Consumer:** research-instrumentation
- **Payload:** `{ totalDurationMs }`
- **Version:** 1.0.0
- **Research Purpose:** Data-quality filter (total session duration).
- **Behaviour Measured:** Completion Behaviour
- **Ontology Node:** Behaviour → Behavioural Construct (Completion Behaviour)

### `question_answered`
- **Category:** interaction
- **Producer:** survey-ui · **Consumer:** research-instrumentation
- **Payload:** `{ questionId, screenId, value, timeToAnswerMs }`
- **Version:** 1.0.0
- **Research Purpose:** Primary explicit research datum — the participant's declared choice.
- **Behaviour Measured:** Direct measurement of the choice itself (construct depends on the specific question per Phase 4's mapping).
- **Ontology Node:** Interaction → Behaviour (direct choice, not inferred)

### `answer_revised`
- **Category:** interaction
- **Producer:** survey-ui · **Consumer:** research-instrumentation
- **Payload:** `{ questionId, screenId, previousValue, newValue, revisionCount }`
- **Version:** 1.0.0
- **Research Purpose:** Detect uncertainty independent of stated confidence.
- **Behaviour Measured:** Decision Confidence (inverse signal)
- **Ontology Node:** Behaviour → Behavioural Construct (Decision Confidence)

### `screen_entered`
- **Category:** navigation
- **Producer:** survey-ui · **Consumer:** research-instrumentation
- **Payload:** `{ screenId, screenIndex }`
- **Version:** 1.0.0
- **Research Purpose:** Establish dwell-time measurement start point; sequence tracking.
- **Behaviour Measured:** None directly — structural marker.
- **Ontology Node:**