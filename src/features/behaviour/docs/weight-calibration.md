# Weight Calibration Strategy

Documents how survey answer options are translated into behaviour dimension deltas. This governs how `BEHAVIOUR_WEIGHT_TABLE` in `weights.ts` should be populated and maintained — it does not change existing code.

## Principles

1. **Continuous, not binary.** Every weight is a signed float, typically in the range **-1.0 to +1.0**, representing the strength and direction of an option's pull on a dimension. Binary/boolean scoring is disallowed.
2. **Multi-dimensional.** Every survey option must contribute to **two or more** behaviour dimensions. A single option mapped to exactly one dimension is a smell — revisit the option's real-world meaning and add secondary effects.
3. **Explainable.** Each weight entry should be traceable to a plain-language rationale (see "Rationale Convention" below) so a reviewer can sanity-check *why* an option pulls a dimension a given amount.
4. **Normalized independently.** Weights are additive raw deltas; normalization to the final 0–1 vector happens once, centrally, in `calculate-behaviour-vector.ts`. Individual weights are never pre-normalized or clamped at the table level.
5. **Independent from UI.** Weight tables reference only `questionId`/`optionId` strings. They must never import from `components/survey/*` or depend on rendering order.

## Rationale Convention

When adding entries to `BEHAVIOUR_WEIGHT_TABLE`, pair each with an inline comment describing the real-world reasoning, e.g.:

```ts
// "Coffee with a friend" = low-stimulation, high-familiarity social choice
"leisure-choice:coffee-with-friend": {
  socialFamiliarity: 0.9,
  planningPreference: 0.2,
  energyLevel: 0.2,     // low-key, not high-energy
  noveltySeeking: 0.1,  // familiar activity, minimal novelty
},
```

## Tuning Workflow

- Weights are changed **only** in `weights.ts`.
- No survey, engine, or UI file should require edits when recalibrating a weight.
- Adding a new survey question/option requires exactly one new entry keyed `${questionId}:${optionId}` — no other files change.