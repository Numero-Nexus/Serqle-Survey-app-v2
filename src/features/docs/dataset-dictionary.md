# Dataset Dictionary

Describes every field in `ResearchDatasetRow` (`src/features/dataset/schema.ts`).

## provenance
| Field | Type | Description |
|---|---|---|
| sessionId | string | Anonymous session identifier |
| surveyVersion | string | Version of the survey instrument used |
| pipelineVersion | string | Version of the feature pipeline that produced this row |
| extractedAt | ISO datetime | When this row was generated (not deterministic across runs) |

## context
| Field | Type | Description |
|---|---|---|
| deviceCategory | string | mobile/tablet/desktop/unknown |
| locale | string | Browser locale at session start |
| timezone | string | Browser timezone at session start |
| forwardNavigationCount | int | Count of forward navigations |
| interactionFrequency | int | Count of explicit answers given |
| totalSessionDurationMs | number \| null | Session duration; null if incomplete |

## action
| Field | Type | Description |
|---|---|---|
| answerValues | Record<string, unknown> | Final (post-revision) answer per question ID |

## reward (placeholder only)
| Field | Type | Description |
|---|---|---|
| rewardVersion | string | Always "unversioned" in this phase |
| finalRewardScore | number \| null | Always null — no calculation implemented |

## quality
| Field | Type | Description |
|---|---|---|
| completionQuality | boolean | Did the session reach survey_submitted |
| hasMissingResponses | boolean | Any required question unanswered |
| missingQuestionIds | string[] | Which required questions are unanswered |
| isConsistent | boolean \| null | Card 1 vs Card 7 structural match; null if either unanswered |
| attentionCheckPassed | boolean \| null | Card 8 answered "blue"; null if unanswered |
| validationFailureCount | int | Failed Next/Continue attempts |
| backNavigationCount | int | Backward navigations |
| answerRevisionCount | int | Answer changes |

## responseTimeMs / screenDwellTimeMs / questionDwellTimeMs
Keyed maps (`questionId`/`screenId` → milliseconds), one entry per
question/screen the participant reached.