# Transformation Catalogue

Every transformation function, its file location, purity guarantee, and
determinism basis.

| Function | File | Pure? | Determinism Basis |
|---|---|---|---|
| `deriveResponseTime` | pipeline/transform.ts | Yes | Reads only `payload.timeToAnswerMs` fields already stored |
| `deriveScreenDwellTime` | pipeline/transform.ts | Yes | Reads only `payload.dwellTimeMs` fields already stored |
| `deriveQuestionDwellTime` | pipeline/transform.ts | Yes | Delegates to deriveResponseTime |
| `deriveRevisionCount` | pipeline/transform.ts | Yes | Array length of `answer_revised` events |
| `deriveNavigationBehaviour` | pipeline/transform.ts | Yes | Array lengths of navigation events |
| `deriveValidationBehaviour` | pipeline/transform.ts | Yes | Array length of `validation_failed` events |
| `deriveCompletionBehaviour` | pipeline/transform.ts | Yes | Presence check on `survey_submitted` |
| `deriveSessionDuration` | pipeline/transform.ts | Yes | Reads stored `totalDurationMs`, no recomputation from timestamps |
| `deriveInteractionFrequency` | pipeline/transform.ts | Yes | Array length of `question_answered` events |
| `deriveAnswerValues` | pipeline/transform.ts | Yes | Fold over answered + revised events, deterministic order (sequenceNumber) |
| `deriveCompletionQuality` | pipeline/quality.ts | Yes | Delegates to deriveCompletionBehaviour |
| `deriveMissingResponseIndicator` | pipeline/quality.ts | Yes | Diffs against static `freeTimeSurvey` definition |
| `deriveConsistencyIndicator` | pipeline/quality.ts | Yes | Structural index lookup against static survey option arrays |
| `deriveAttentionCheckIndicator` | pipeline/quality.ts | Yes | Exact string comparison against known correct value |
| `deriveValidationQualityIndicator` | pipeline/quality.ts | Yes | Array length of `validation_failed` events |
| `runFeaturePipeline` | pipeline/orchestrator.ts | No* | *`extractedAt` uses current time — audit metadata, not a feature value; all feature fields remain deterministic |
| `mapToDatasetRow` | dataset/map-to-dataset-row.ts | Yes | Pure structural remapping, Zod-validated |

No transformation performs randomization, external API calls, or
time-dependent logic beyond the single documented `extractedAt` audit
field.