# Research Variable Mapping

Maps each dataset column to its behavioural construct and hypothesis,
closing the loop from Phase 6's ontology through to an actual, populated
dataset column.

| Dataset Column | Behavioural Construct | Hypothesis (Phase 4) | Ontology Stage Reached |
|---|---|---|---|
| action.answerValues | Direct choice (per-question) | H1, H2, H4, H6, H7, H10, H14, H24, H25 | Research Variable → Dataset Column |
| quality.answerRevisionCount | Decision Confidence (inverse) | H9 | Research Variable → Dataset Column |
| responseTimeMs (map) | Decision Confidence | H9 | Research Variable → Dataset Column |
| screenDwellTimeMs (map) | Engagement / Cognitive Load | H9 | Research Variable → Dataset Column |
| quality.backNavigationCount | Decision Confidence (inverse) / Disengagement | H9 | Research Variable → Dataset Column |
| quality.validationFailureCount | Task Friction | Data-quality filter | Research Variable → Dataset Column |
| quality.completionQuality | Completion Behaviour | Data-quality filter | Research Variable → Dataset Column |
| context.totalSessionDurationMs | Completion Behaviour | Data-quality filter | Research Variable → Dataset Column |
| context.interactionFrequency | Engagement (covariate) | Covariate | Research Variable → Dataset Column |
| quality.isConsistent | Decision Consistency | Cross-validation of H1/H2-style items | Research Variable → Dataset Column |
| quality.attentionCheckPassed | Data Quality | Data-quality filter | Research Variable → Dataset Column |
| personality.behaviourVector | Latent Behavioural Dimensions | H1–H25 (cross-cutting, internal inference layer) | Research Variable → Dataset Column |
| personality.soulCode | Inferred Behavioural Typology | Internal inference — not tied to a single hypothesis | Research Variable → Dataset Column |
| personality.soulArchetype | Inferred Behavioural Typology (categorical) | Internal inference — not tied to a single hypothesis | Research Variable → Dataset Column |
| personality.confidenceScore | Inference Reliability (metadata) | Data-quality filter for typology inference | Research Variable → Dataset Column |
| personality.consistencyScore | Decision Consistency (metadata) | Data-quality filter for typology inference | Research Variable → Dataset Column |
| reward.finalRewardScore | (none yet) | (none yet) | Feature → Research Variable (NOT YET reached — placeholder only) |

Every populated column (all except `reward.finalRewardScore`) traces
completely through the ontology: Observation → Interaction → Behaviour →
Behavioural Construct → Research Variable → Feature → **Dataset Column**
(this phase's endpoint). Future Decision Models remain the next,
unimplemented stage.