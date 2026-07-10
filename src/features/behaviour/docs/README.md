# Behaviour Engine — Developer Documentation

Internal documentation for the Behaviour → Soul Code → Archetype engine (`src/features/behaviour/`). This engine is **not user-facing**; participants complete the survey only, and never see personality/archetype output.

## Pipeline

Survey Answer
↓
Behaviour Signals (weight table lookups)
↓
Behaviour Dimensions (continuous, normalized)
↓
Behaviour Vector
↓
Soul Code
↓
Soul Archetype
↓
(Future) Dataset

## Documents in This Folder

| Doc | Covers |
|-----|--------|
| [`behaviour-ontology.md`](./behaviour-ontology.md) | All 14 behaviour dimensions: description, range, default, normalization, interpretation. |
| [`weight-calibration.md`](./weight-calibration.md) | Rules for defining/tuning survey option → dimension weights. |
| [`soul-code-calibration.md`](./soul-code-calibration.md) | Which dimensions drive each of the 5 Soul Code positions, and the threshold model. |
| [`archetype-calibration.md`](./archetype-calibration.md) | How Soul Codes map to the 8 archetypes, and how to add new ones. |
| [`confidence-score-design.md`](./confidence-score-design.md) | Design for a metadata-only inference-confidence metric (not yet implemented). |
| [`consistency-score-design.md`](./consistency-score-design.md) | Design for a metadata-only answer-consistency metric (not yet implemented). |

## Corresponding Source Files

| Module | Responsibility |
|--------|-----------------|
| `dimensions.ts` | Dimension names, types, vector shape. |
| `weights.ts` | Option → dimension weight lookup table. |
| `calculate-behaviour-vector.ts` | Pure calculation: answers → normalized `BehaviourVector`. |
| `generate-soul-code.ts` | Pure calculation: `BehaviourVector` → Soul Code string. |
| `map-soul-archetype.ts` | Pure lookup: Soul Code → `SoulArchetype`. |
| `index.ts` | Orchestrates the full pipeline via `computeBehaviourMapping()`. |

## Golden Rules

1. Survey never scores personality directly — every option contributes weighted deltas across multiple dimensions.
2. Each layer (vector calc → soul code → archetype) is isolated; extending one never requires editing another.
3. Confidence and Consistency scores (when implemented) are metadata only — they never feed back into the Soul Code or Archetype.
4. Nothing in this module is rendered in survey UI or exposed to participants.