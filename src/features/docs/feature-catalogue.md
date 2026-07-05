# Feature Catalogue

All 11 features currently registered in `src/features/registry.ts`
(`FEATURE_REGISTRY`), matching this document exactly — any drift between
this file and the registry means this file is stale.

| Key | Name | Category | Version | Source Events | Construct |
|---|---|---|---|---|---|
| `response_time_ms` | Response Time | quality | 1.0.0 | question_answered | Decision Confidence |
| `screen_dwell_time_ms` | Screen Dwell Time | quality | 1.0.0 | screen_exited | Engagement / Cognitive Load |
| `question_dwell_time_ms` | Question Dwell Time (approx.) | quality | 1.0.0 | question_answered | Decision Confidence |
| `answer_revision_count` | Answer Revision Count | quality | 1.0.0 | answer_revised | Decision Confidence (inverse) |
| `back_navigation_count` | Back Navigation Count | quality | 1.0.0 | navigation_back | Decision Confidence (inverse) / Disengagement |
| `forward_navigation_count` | Forward Navigation Count | context | 1.0.0 | navigation_next | Pacing (covariate) |
| `validation_failure_count` | Validation Failure Count | quality | 1.0.0 | validation_failed | Task Friction |
| `completion_flag` | Completion Flag | quality | 1.0.0 | survey_submitted | Completion Behaviour |
| `total_session_duration_ms` | Total Session Duration | context | 1.0.0 | session_started, session_completed | Completion Behaviour |
| `interaction_frequency` | Interaction Frequency | context | 1.0.0 | question_answered | Engagement (covariate) |
| `answer_values` | Answer Values | action | 1.0.0 | question_answered | Direct choice (varies) |

No `reward`-category feature is registered — correct per phase scope
("Do NOT calculate rewards"); reward *configuration* exists separately in
`src/features/reward/interface.ts`.