export type FeatureCategory = "context" | "action" | "reward" | "quality";

export interface FeatureDefinition {
  /** Stable, unique key — becomes the dataset column name. */
  key: string;
  /** Human-readable name. */
  name: string;
  description: string;
  category: FeatureCategory;
  /** Independent version for this specific feature's derivation logic. */
  version: string;
  /** Which canonical event type(s) this feature is derived from. */
  sourceEventTypes: string[];
  /** Behavioural construct this feature supports (per research ontology). */
  behaviouralConstruct: string;
  /** Module responsible for this feature's transformation logic. */
  owner: string;
}

/**
 * The Feature Registry — the single source of truth for every feature this
 * pipeline is allowed to derive. A feature must be registered here before
 * its transformation function (Step 4) may run. This structurally enforces
 * "no hidden calculations": anything not registered cannot enter the dataset.
 */
export const FEATURE_REGISTRY: readonly FeatureDefinition[] = [
  {
    key: "response_time_ms",
    name: "Response Time",
    description: "Time from screen entry to a specific question's answer.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["question_answered"],
    behaviouralConstruct: "Decision Confidence",
    owner: "features/pipeline/transform.ts#deriveResponseTime",
  },
  {
    key: "screen_dwell_time_ms",
    name: "Screen Dwell Time",
    description: "Time spent on a screen from entry to exit.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["screen_exited"],
    behaviouralConstruct: "Engagement / Cognitive Load",
    owner: "features/pipeline/transform.ts#deriveScreenDwellTime",
  },
  {
    key: "question_dwell_time_ms",
    name: "Question Dwell Time (approximated)",
    description:
      "Approximated as time-to-answer within a screen; true per-question dwell requires future finer-grained instrumentation.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["question_answered"],
    behaviouralConstruct: "Decision Confidence",
    owner: "features/pipeline/transform.ts#deriveQuestionDwellTime",
  },
  {
    key: "answer_revision_count",
    name: "Answer Revision Count",
    description: "Number of times a participant changed an answer.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["answer_revised"],
    behaviouralConstruct: "Decision Confidence (inverse)",
    owner: "features/pipeline/transform.ts#deriveRevisionCount",
  },
  {
    key: "back_navigation_count",
    name: "Back Navigation Count",
    description: "Number of backward navigations during the session.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["navigation_back"],
    behaviouralConstruct: "Decision Confidence (inverse) / Disengagement",
    owner: "features/pipeline/transform.ts#deriveNavigationBehaviour",
  },
  {
    key: "forward_navigation_count",
    name: "Forward Navigation Count",
    description: "Number of forward navigations during the session.",
    category: "context",
    version: "1.0.0",
    sourceEventTypes: ["navigation_next"],
    behaviouralConstruct: "Pacing (covariate)",
    owner: "features/pipeline/transform.ts#deriveNavigationBehaviour",
  },
  {
    key: "validation_failure_count",
    name: "Validation Failure Count",
    description: "Number of failed Next/Continue attempts.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["validation_failed"],
    behaviouralConstruct: "Task Friction",
    owner: "features/pipeline/transform.ts#deriveValidationBehaviour",
  },
  {
    key: "completion_flag",
    name: "Completion Flag",
    description: "Whether the session reached survey_submitted.",
    category: "quality",
    version: "1.0.0",
    sourceEventTypes: ["survey_submitted"],
    behaviouralConstruct: "Completion Behaviour",
    owner: "features/pipeline/transform.ts#deriveCompletionBehaviour",
  },
  {
    key: "total_session_duration_ms",
    name: "Total Session Duration",
    description: "Duration from session_started to session_completed.",
    category: "context",
    version: "1.0.0",
    sourceEventTypes: ["session_started", "session_completed"],
    behaviouralConstruct: "Completion Behaviour",
    owner: "features/pipeline/transform.ts#deriveSessionDuration",
  },
  {
    key: "interaction_frequency",
    name: "Interaction Frequency",
    description: "Count of question_answered events per session.",
    category: "context",
    version: "1.0.0",
    sourceEventTypes: ["question_answered"],
    behaviouralConstruct: "Engagement (covariate)",
    owner: "features/pipeline/transform.ts#deriveInteractionFrequency",
  },
  {
    key: "answer_values",
    name: "Answer Values",
    description: "The participant's explicit selections, keyed by question ID.",
    category: "action",
    version: "1.0.0",
    sourceEventTypes: ["question_answered"],
    behaviouralConstruct: "Direct choice (varies per question)",
    owner: "features/pipeline/transform.ts#deriveAnswerValues",
  },
] as const;

export function getFeatureDefinition(key: string): FeatureDefinition | undefined {
  return FEATURE_REGISTRY.find((f) => f.key === key);
}