Step 14
Objective
Write the Reward Pipeline Specification — reward components, aggregation stage, normalization stage, weighting stage, and version identifiers. Per spec: specification only, no reward calculations implemented.
Current Assessment
Documentation only, plus a small types-only file to give the specification a typed shape (structure, not logic) — consistent with how the event envelope already carries a rewardVersion field (Step 2) that currently has no consumer; this step defines what that version identifier will eventually govern.
Files to Modify
New file: src\research\docs\reward-pipeline-spec.md
New file: src\research\events\reward-pipeline-types.ts (typed shape only — no calculation logic)
Code Snippet
Create src\research\docs\reward-pipeline-spec.md:
md# Reward Pipeline Specification (v1, spec only)

Defines the architecture for a future reward-scoring system. **No
calculations are implemented in this phase** — this is a versioned
contract for a later phase to implement against.

## Pipeline Stages
Reward Components (raw, per-record)
↓
Aggregation Stage
↓
Normalization Stage
↓
Weighting Stage
↓
Final Reward Score (per research variable, per participant)

## Reward Components (candidate inputs, from Feature Lineage)

| Component | Source Research Variable | Direction |
|---|---|---|
| Decision speed | `decision_time_ms` | Faster = higher confidence signal (non-linear; extremely fast may indicate low engagement) |
| Confidence | `decision_confidence` | Higher = stronger signal |
| Consistency | `decision_consistency` | Consistent = higher data-quality weight |
| Data quality | `data_quality_score` | Higher = record is more trustworthy |
| Completion | `completion_flag` | Complete = eligible for reward computation at all |

## Aggregation Stage

Combines multiple raw reward components belonging to the same
participant/session into a single per-participant vector before any
scaling occurs. (Method: unspecified — future phase decision, e.g.
weighted sum vs. learned aggregation.)

## Normalization Stage

Rescales aggregated components onto a comparable range (e.g. 0–1 or
z-score) so that components with different natural units (milliseconds
vs. boolean flags vs. categorical leans) can be combined meaningfully.

## Weighting Stage

Applies research-determined weights to each normalized component to
produce a final reward score. Weights themselves are a research/statistical
decision for a future phase — not defined here.

## Versioning

Every reward computation must be tagged with a `rewardVersion` (already
present in the event envelope's `EventVersions`, Step 2) so that changes
to aggregation, normalization, or weighting logic never silently
invalidate historical reward scores — old records remain interpretable
under their original `rewardVersion`.

## Explicit Non-Goals of This Phase

- No aggregation formula is implemented.
- No normalization function is implemented.
- No weights are chosen.
- No reward score is ever computed or stored.