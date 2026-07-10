import type { BehaviourVector } from "./dimensions";

/** Each position's possible letters, in priority order for tie-breaking. */
const POSITION_1 = ["E", "I", "S", "G"] as const;
const POSITION_2 = ["P", "F", "M", "L"] as const;
const POSITION_3 = ["N", "C", "U", "Q"] as const;
const POSITION_4 = ["A", "R", "X", "H"] as const;
const POSITION_5 = ["P", "X", "L", "M"] as const;

/**
 * Picks one of four letters for a position based on where a 0–1 score falls
 * across four equal bands. Internal helper — not exported.
 */
function pickBand<T extends readonly string[]>(letters: T, score: number): T[number] {
  const index = Math.min(3, Math.floor(clamp01(score) * 4));
  return letters[index];
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Derives the five-position Soul Code from a computed BehaviourVector.
 * This is an internal inference — never presented to or answerable by
 * the participant directly.
 */
export function generateSoulCode(vector: BehaviourVector): string {
  const p1 = pickBand(POSITION_1, vector.socialIntensity);
  const p2 = pickBand(POSITION_2, vector.planningPreference);
  const p3 = pickBand(POSITION_3, vector.noveltySeeking);
  const p4 = pickBand(POSITION_4, vector.riskAppetite);
  const p5 = pickBand(POSITION_5, vector.reflectionConfidence);

  return `${p1}${p2}${p3}${p4}${p5}`;
}