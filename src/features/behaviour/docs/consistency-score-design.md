# Consistency Score Design

Documents the design for an internal Consistency Score: metadata describing how internally coherent a participant's answers were. **This is not personality** — it never feeds the Soul Code or Archetype, and is not shown to participants.

## Inputs

| Signal | Source | Contribution |
|--------|--------|---------------|
| Repeated scenarios | Survey design (paired/near-duplicate scenario questions, if present) | Comparing answers to semantically similar scenarios; large divergence lowers consistency. |
| Contradictory answers | Behaviour deltas from `weights.ts` | If two answered options push the same dimension in opposite directions beyond a tolerance, flag a contradiction. |
| Hesitation | Research instrumentation (`hesitation_observed`, `dwell_time_recorded` events) | Elevated hesitation on otherwise "easy" questions is a soft signal, weighted lightly. |
| Answer changes | Research instrumentation (`answer_revised` events) | Frequent revisions on the same question lower consistency more directly than hesitation alone. |

## Proposed Shape

```ts
// Illustrative only — not implemented in this phase
interface ConsistencyScore {
  value: number; // 0–1, higher = more internally consistent
  contradictionCount: number;
  revisionCount: number;
  hesitationPenalty: number;
}
```

## Design Rules

- Consumes `AnsweredOption[]` plus instrumentation events — never the `BehaviourVector` or Soul Code directly, keeping it decoupled from the inference pipeline itself.
- Lives in its own future module (e.g. `consistency-score.ts`), independent from `calculate-behaviour-vector.ts`, `generate-soul-code.ts`, and `map-soul-archetype.ts`.
- Output is attached as metadata only (alongside `BehaviourMappingResult` and the future `ConfidenceScore`), never merged into or influencing the Soul Code/Archetype values.
