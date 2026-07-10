# Behaviour Ontology

Canonical definitions for each behavioural dimension used by the Behaviour Vector Engine. This is documentation only — it does not change runtime logic in `dimensions.ts`, `weights.ts`, or `calculate-behaviour-vector.ts`.

Each dimension is scored continuously in the range **0–1**, defaulting to **0.5** (neutral) when no answered option contributes to it.

## Dimensions

### socialIntensity
- **Description:** Preference for high-stimulation social settings vs. low-key, intimate ones.
- **Range:** 0 (low intensity) – 1 (high intensity)
- **Default:** 0.5
- **Normalization:** Weighted sum of option deltas, clamped to [0,1] via `0.5 + raw/2`.
- **Interpretation:** Feeds Soul Code Position 1 alongside `socialFamiliarity`.

### socialFamiliarity
- **Description:** Preference for familiar/known company vs. new/unfamiliar people.
- **Range:** 0 (unfamiliar-seeking) – 1 (familiarity-seeking)
- **Default:** 0.5
- **Normalization:** Same clamp strategy as above.
- **Interpretation:** Feeds Soul Code Position 1.

### planningPreference
- **Description:** Structured/planned activities vs. spontaneous ones.
- **Range:** 0 (spontaneous) – 1 (planned)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 2 alongside flexibility signals.

### noveltySeeking
- **Description:** Appetite for new/unfamiliar experiences vs. repetition of the known.
- **Range:** 0 (low novelty) – 1 (high novelty)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 3 and 4.

### riskAppetite
- **Description:** Comfort with uncertain or risky outcomes.
- **Range:** 0 (risk-averse) – 1 (risk-seeking)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 4.

### energyLevel
- **Description:** Preference for high-energy/active vs. low-energy/restful activities.
- **Range:** 0 (low energy) – 1 (high energy)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Contributory signal, no direct Soul Code position yet.

### learningOrientation
- **Description:** Motivation toward learning/growth-oriented experiences.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 5.

### experienceOrientation
- **Description:** Value placed on experiences over material/comfort factors.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 5.

### natureAffinity
- **Description:** Preference for outdoor/natural settings.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 3 (environment).

### urbanAffinity
- **Description:** Preference for urban/city settings.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 3 (environment).

### budgetSensitivity
- **Description:** Sensitivity to cost when choosing activities.
- **Range:** 0 (insensitive) – 1 (highly sensitive)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Contributory signal, no direct Soul Code position yet.

### travelWillingness
- **Description:** Willingness to travel distance/time for an activity.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Contributory signal, no direct Soul Code position yet.

### reflectionConfidence
- **Description:** Confidence/decisiveness in reflective, considered choices.
- **Range:** 0 (low) – 1 (high)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Feeds Soul Code Position 5; also an input to the Confidence Score (later step).

### decisionConsistency
- **Description:** Degree to which a participant's answers align internally (low contradiction).
- **Range:** 0 (inconsistent) – 1 (consistent)
- **Default:** 0.5
- **Normalization:** Same clamp strategy.
- **Interpretation:** Not used in Soul Code; feeds the Consistency Score (later step) as metadata only.