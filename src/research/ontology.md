# Serqle Research Ontology

This document defines the canonical hierarchy every behavioural signal in
this platform must trace through. No event, signal, or field may be added
to the instrumentation layer unless it can be mapped through every stage
below.

## Hierarchy

1. **Observation** — a raw, timestamped fact that something happened in
   the UI (e.g. a pointerdown/keydown occurred on a given DOM target at
   time T). Observations are the rawest possible unit; they carry no
   interpretation.

2. **Interaction** — an Observation interpreted in the context of the
   survey engine's model: a named, structured occurrence such as
   "participant selected option X for question Y" or "participant
   navigated from screen A to screen B."

3. **Behaviour** — a pattern inferred from one or more Interactions over
   time, e.g. hesitation (long pause before commit), answer revision
   (changed selection before advancing), instant response (sub-second
   first tap), or disengagement (repeated back-navigation).

4. **Behavioural Construct** — a latent trait a Behaviour is evidence
   for. Constructs used in this platform (carried over from the Phase 4
   survey design): Novelty Seeking, Risk Preference, Exploration
   Tendency, Planning Behaviour, Group Orientation, Decision Confidence,
   Social Confidence, Decision Consistency.

5. **Research Variable** — a named, operationalized measurement derived
   from one or more Behavioural Constructs (e.g. `risk_appetite_lean`,
   `decision_time_ms`, `consistency_score`, `hesitation_flag`).

6. **Feature** — a Research Variable transformed into a model-ready
   representation (normalized, bucketed, encoded). Feature engineering
   itself is out of scope for this phase; only the lineage slot exists.

7. **Dataset Column** — the Feature's final, stable, typed column name
   in a research dataset (CSV/Parquet).

8. **Future Decision Model** — any downstream model (bandit,
   recommender, statistical/causal model) consuming Dataset Columns.

## Governing Rule

Every event or signal collected by this platform must be traceable
through all eight stages above. If a proposed signal cannot be mapped to
a documented behavioural construct, research hypothesis, and eventual
research variable, it must not be collected. This rule is enforced
narratively in this phase (via the Signal Dictionary and Traceability
Matrix) and structurally in later phases (schema validation rejects
undocumented event types).

## Pipeline This Ontology Feeds

Survey UI → Survey Engine → Domain Events → Event Bus →
Research Instrumentation → Persistence (future) →
Feature Engineering (future) → Research Dataset → Future Decision Models

The Survey Engine (Phase 3) has no knowledge of this pipeline. It emits
generic state changes; a separate instrumentation layer (this phase)
observes those changes and produces canonical events. This one-way
dependency (instrumentation depends on the engine, never the reverse) is
architecturally enforced in later steps.