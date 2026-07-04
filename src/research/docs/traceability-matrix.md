# Behaviour Traceability Matrix

For every event: why it exists, the hypothesis it supports, the construct
it measures, the research variables it will feed, and downstream
applications. This is the audit trail proving no signal exists without
justification (per the ontology's governing rule, Step 1).

| Event | Why It Exists | Hypothesis | Construct | Future Research Variables | Downstream Applications |
|---|---|---|---|---|---|
| `session_started` | Establish session covariates (device/viewport) needed to control for interface effects in later analysis | Covariate control | — | `device_type`, `viewport_width`, `viewport_height` | Interface/behaviour covariate adjustment in statistical models |
| `session_completed` | Mark session end for duration-based data-quality filtering | Data-quality filter | Completion Behaviour | `total_session_duration_ms` | Outlier/bot detection, completion-rate reporting |
| `question_answered` | Capture the core explicit research datum — the participant's revealed choice | H1, H2, H4, H6, H7, H10, H14, H24, H25 | Direct choice (construct varies per question) | `selected_option`, `option_category` | Reward modeling, preference inference, bandit training data |
| `answer_revised` | Detect changed-mind behaviour as an uncertainty signal independent of self-reported confidence | H9 | Decision Confidence (inverse) | `revision_count`, `revision_flag` | Confidence-weighting term in reward model |
| `screen_entered` | Anchor point for dwell-time measurement and sequence reconstruction | Covariate / sequencing | — | `screen_sequence_position` | Replay/reconstruction of session timeline |
| `screen_exited` | Measure how long a participant spent on each screen | H9 | Decision Confidence (secondary, via dwell time) | `dwell_time_ms` | Time-penalty term in reward model |
| `navigation_back` | Detect backward navigation as a sign of uncertainty or disengagement | H9 | Decision Confidence (inverse) / Disengagement | `back_navigation_count` | Data-quality flag, uncertainty covariate |
| `navigation_next` | Track forward pacing through the survey | Covariate | — | `forward_navigation_count` | Session pacing analysis |
| `validation_failed` | Detect incomplete-answer attempts as friction/data-quality signal | Data-quality filter | Task friction | `validation_failure_count` | UI friction analysis, data-quality flag |
| `validation_passed` | Confirm a screen's requirements were satisfied before advancing | Data-quality filter | — | — | Structural integrity check for replay |
| `survey_submitted` | Mark a fully completed, analyzable response record | Data-quality filter | Completion Behaviour | `completion_flag` | Filters incomplete records from the research dataset |
| `hesitation_observed` | Capture pre-commit pauses as a secondary, non-self-reported confidence proxy | H9 | Decision Confidence | `hesitation_duration_ms`, `hesitation_flag` | Cross-validates Screen 6's self-reported confidence (Phase 4) |
| `dwell_time_recorded` | Capture per-screen timing for the reward model's time-penalty term | H9 | Engagement / cognitive load | `decision_time_ms` | Reward-model time-penalty term (explicitly named in Phase 4's Implicit Signal Logging table) |

## Cross-Reference to Phase 4 Survey Design

This matrix's hypothesis codes (H1–H25) and constructs (Decision
Confidence, Completion Behaviour, etc.) are drawn directly from the
"Research Hypotheses Covered" and "Hidden Behavioural Constructs" fields
documented per-screen in the Phase 4 survey design document — no new
constructs or hypotheses were invented in this phase; this matrix only
formalizes their traceability through the instrumentation layer.