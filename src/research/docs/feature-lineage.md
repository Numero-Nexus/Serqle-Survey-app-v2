Step 13
Objective
Write the Feature Lineage documentation — for each future feature, the lineage path Raw Events → Transformation → Derived Feature → Research Variable → Dataset Column → Future Decision Model. Per spec: lineage only, no feature engineering implementation.
Current Assessment
Documentation only. Drawing directly from Steps 10–12's research variables.
Files to Modify
New file: src\research\docs\feature-lineage.md
Code Snippet
Create src\research\docs\feature-lineage.md:
md# Feature Lineage

Documents the intended transformation path from raw events to dataset
columns for each research variable identified in the Traceability Matrix.
**No transformation logic is implemented in this phase** — these are
specifications for a future feature-engineering phase.

---

### Lineage: Decision Confidence
Raw Events: hesitation_observed, answer_revised, screen_exited
↓ Transformation: combine pause duration + revision count + dwell time
into a single normalized confidence-inverse score (spec only)
↓ Derived Feature: confidence_proxy_score
↓ Research Variable: decision_confidence
↓ Dataset Column: decision_confidence (float, 0–1)
↓ Future Decision Model: reward-weighting term, consistency cross-check
against Phase 4 Screen 6's self-reported confidence

### Lineage: Risk/Exploration Preference
Raw Events: question_answered (Cards 1–4, Screen 2)
↓ Transformation: map each selected option to its pre-tagged category
(Social/Leisure/Exploration/Learning, per Phase 4's Category Balance
Table) and aggregate across cards (spec only)
↓ Derived Feature: category_lean_vector
↓ Research Variable: risk_appetite_lean, exploration_tendency
↓ Dataset Column: risk_appetite_lean (categorical), exploration_tendency (float)
↓ Future Decision Model: preference-based recommendation/bandit input

### Lineage: Decision Consistency
Raw Events: question_answered (card-1), question_answered (card-7)
↓ Transformation: compare Card 1 vs. Card 7 selected categories (same
hidden structure, different wording) for agreement (spec only)
↓ Derived Feature: consistency_match_flag
↓ Research Variable: decision_consistency
↓ Dataset Column: decision_consistency (boolean)
↓ Future Decision Model: data-quality weighting, individual-differences modeling

### Lineage: Engagement / Time-Penalty
Raw Events: dwell_time_recorded, screen_exited
↓ Transformation: aggregate per-screen dwell time across the session,
normalize against expected completion time (Phase 4's Validation
Table estimates) (spec only)
↓ Derived Feature: normalized_session_pace
↓ Research Variable: decision_time_ms (per-card), total_session_duration_ms
↓ Dataset Column: decision_time_ms, total_session_duration_ms
↓ Future Decision Model: reward-model time-penalty term

### Lineage: Data Quality
Raw Events: validation_failed, navigation_back, question_answered (card-8 attention check)
↓ Transformation: combine attention-check pass/fail with friction/back-nav
counts into a single quality gate (spec only)
↓ Derived Feature: data_quality_gate
↓ Research Variable: attention_check_pass, data_quality_score
↓ Dataset Column: attention_check_pass (boolean), data_quality_score (float)
↓ Future Decision Model: dataset filtering prior to any model training

---

## Note

All transformation steps above are marked **(spec only)** — implementing
them (actual aggregation logic, normalization math, category-mapping
code) is explicitly out of scope for this phase and belongs to a future
Feature Engineering phase.