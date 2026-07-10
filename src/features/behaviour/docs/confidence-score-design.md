# Confidence Score Design

Documents the design for a Confidence Score: a metadata metric indicating how reliable a given Soul Code inference is. **This score never affects the Soul Code itself** — it is a parallel, informational output only.

## Inputs

| Signal | Source | Contribution |
|--------|--------|---------------|
| Behaviour strength | `BehaviourVector` | Dimensions far from the neutral 0.5 midpoint (in either direction) indicate stronger, more decisive signal than dimensions clustered near 0.5. |
| Reflection confidence | `behaviourVector.reflectionConfidence` | Directly included as a top-level input — a participant's own decisiveness pattern. |
| Decision consistency | `behaviourVector.decisionConsistency` | Directly included — low internal contradiction raises confidence. |
| Contradictory answers | Research instrumentation (`answer_revised` events) | High revision counts on the same question lower confidence. |
| Attention check | Future dedicated attention-check question(s) | A failed attention check should sharply reduce confidence, independent of other signals. |

## Proposed Shape

```ts
// Illustrative only — not implemented in this phase
interface ConfidenceScore {
  value: number; // 0–1, higher = more reliable inference
  factors: {
    behaviourStrength: number;
    reflectionConfidence: number;
    decisionConsistency: number;
    contradictionPenalty: number;
    attentionCheckPassed: boolean;
  };
}
```

## Design Rules

- Computed **after** the Soul Code, from the same `BehaviourVector` plus instrumentation-derived signals — never fed back into `generateSoulCode`.
- Lives in its own future module (e.g. `confidence-score.ts`), separate from vector calculation, Soul Code generation, and archetype mapping.
- Treated purely as metadata attached alongside `BehaviourMappingResult`, not merged into it, to keep the core mapping result stable.