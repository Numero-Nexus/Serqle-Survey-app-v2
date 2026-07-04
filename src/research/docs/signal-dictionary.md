# Research Signal Dictionary

Every signal collected by the platform, documented per the Data Readiness
Checklist. CAQ column = Context / Action / Reward / Quality classification.

| Signal (event type) | Description | Behavioural Construct | Hypothesis | Unit | Source | Raw/Derived | CAQ | Privacy | Importance |
|---|---|---|---|---|---|---|---|---|---|
| `session_started` | Session begins; device/viewport captured | None (covariate) | Covariate for interface analysis | categorical + px | survey-ui | Raw | Context | Low (device class only, no PII) | Medium |
| `session_completed` | Session ends | Completion Behaviour | Data-quality filter | ms | survey-ui | Derived (from timestamps) | Quality | Low | Medium |
| `question_answered` | Participant's explicit selection | (Direct measurement — construct depends on which question) | H1, H2, H4, H6, H7, H10, H14, H24, H25 | categorical | survey-ui | Raw | Action | Low (no free text; declared choice only) | High |
| `answer_revised` | Participant changed a selection before advancing | Decision Confidence (inverse) | H9 | count | survey-ui | Derived (diff of answers over time) | Quality | Low | Medium |
| `screen_entered` | Participant reached a screen | Engagement/pacing | Covariate | — | survey-ui | Raw | Context | Low | Low |
| `screen_exited` | Participant left a screen | Dwell/engagement | H9 (time-based confidence proxy) | ms | survey-ui | Derived (timestamp delta) | Quality | Low | Medium |
| `navigation_back` | Participant navigated backward | Uncertainty/disengagement | H9 | count | survey-ui | Raw | Quality | Low | Medium |
| `navigation_next` | Participant navigated forward | Pacing | Covariate | count | survey-ui | Raw | Quality | Low | Low |
| `validation_failed` | Required question(s) incomplete on Next attempt | Data-quality / friction | Data-quality filter | count | survey-ui | Raw | Quality | Low | Medium |
| `validation_passed` | Screen requirements satisfied | Data-quality | Data-quality filter | — | survey-ui | Raw | Quality | Low | Low |
| `survey_submitted` | Full survey completed | Completion Behaviour | Data-quality filter | — | survey-ui | Raw | Quality | Low | High |
| `hesitation_observed` | Pause before final commit on a question | Decision Confidence | H9 | ms | survey-ui | Derived (timing heuristic) | Quality | Low | High |
| `dwell_time_recorded` | Time spent on a screen | Engagement / cognitive load | H9 | ms | survey-ui | Derived (timestamp delta) | Quality | Low | Medium |

## Notes

- **`question_answered`** is the only **Explicit** signal (Step 6); all
  others are **Implicit**.
- No signal captures free-text content, IP address, precise geolocation,
  or any directly identifying field — the only "personal" datum is a
  coarse `deviceType`/viewport size, classified **Low** privacy risk.
- Every signal above traces to a named Behavioural Construct or an
  explicit Data-Quality purpose, satisfying the ontology's governing
  rule (Step 1): nothing is collected without a documented reason.
- Hypothesis codes (H1–H25) reference the Phase 4 survey design
  document's Research Hypotheses Covered fields.