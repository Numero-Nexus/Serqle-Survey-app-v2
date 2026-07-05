# Feature Lineage Matrix

Extends Phase 6's Feature Lineage (spec-only) with the now-implemented
concrete lineage for each feature.

| Feature | Source Events | Transformation | Output Variable | Dataset Column | Version |
|---|---|---|---|---|---|
| Response Time | question_answered | `deriveResponseTime` — extract timeToAnswerMs per question | responseTimeMs | responseTimeMs (map) | 1.0.0 |
| Screen Dwell Time | screen_exited | `deriveScreenDwellTime` — extract dwellTimeMs per screen | screenDwellTimeMs | screenDwellTimeMs (map) | 1.0.0 |
| Question Dwell Time | question_answered | `deriveQuestionDwellTime` — alias of response time (documented approximation) | questionDwellTimeMs | questionDwellTimeMs (map) | 1.0.0 |
| Answer Revision Count | answer_revised | `deriveRevisionCount` — count of events | answerRevisionCount | quality.answerRevisionCount | 1.0.0 |
| Navigation Behaviour | navigation_back, navigation_next | `deriveNavigationBehaviour` — count each direction | backCount, forwardCount | quality.backNavigationCount, context.forwardNavigationCount | 1.0.0 |
| Validation Behaviour | validation_failed | `deriveValidationBehaviour` — count of events | validationFailureCount | quality.validationFailureCount | 1.0.0 |
| Completion Behaviour | survey_submitted | `deriveCompletionBehaviour` — presence check | completionFlag | quality.completionQuality | 1.0.0 |
| Session Duration | session_started, session_completed | `deriveSessionDuration` — read totalDurationMs from session_completed payload | totalSessionDurationMs | context.totalSessionDurationMs | 1.0.0 |
| Interaction Frequency | question_answered | `deriveInteractionFrequency` — count of events | interactionFrequency | context.interactionFrequency | 1.0.0 |
| Answer Values | question_answered, answer_revised | `deriveAnswerValues` — latest value per question, revisions override originals | answerValues | action.answerValues | 1.0.0 |
| Missing Response Indicator | (derived from Answer Values + survey definition) | `deriveMissingResponseIndicator` — diff against required questions | missingQuestionIds, hasMissingResponses | quality.missingQuestionIds, quality.hasMissingResponses | 1.0.0 |
| Consistency Indicator | (derived from Answer Values, Card 1 & 7) | `deriveConsistencyIndicator` — structural position match | isConsistent | quality.isConsistent | 1.0.0 |
| Attention Check Indicator | (derived from Answer Values, Card 8) | `deriveAttentionCheckIndicator` — exact-match check | attentionCheckPassed | quality.attentionCheckPassed | 1.0.0 |