import { calculateBehaviourVector, type AnsweredOption } from "./calculate-behaviour-vector";
import { generateSoulCode } from "./generate-soul-code";
import { mapSoulArchetype, type SoulArchetype } from "./map-soul-archetype";
import type { BehaviourVector } from "./dimensions";

export interface BehaviourMappingResult {
  behaviourVector: BehaviourVector;
  soulCode: string;
  soulArchetype: SoulArchetype;
}

/**
 * Orchestrates the full internal pipeline:
 * Survey Answers -> Behaviour Vector -> Soul Code -> Soul Archetype.
 * Consumed later by the dataset pipeline; not called from survey UI yet.
 */
export function computeBehaviourMapping(
  answers: AnsweredOption[]
): BehaviourMappingResult {
  const behaviourVector = calculateBehaviourVector(answers);
  const soulCode = generateSoulCode(behaviourVector);
  const soulArchetype = mapSoulArchetype(soulCode);

  return { behaviourVector, soulCode, soulArchetype };
}

export type { AnsweredOption } from "./calculate-behaviour-vector";
export type { BehaviourVector, BehaviourDimension } from "./dimensions";
export type { SoulArchetype } from "./map-soul-archetype";
export { BEHAVIOUR_DIMENSIONS } from "./dimensions";
export { SOUL_ARCHETYPES } from "./map-soul-archetype";