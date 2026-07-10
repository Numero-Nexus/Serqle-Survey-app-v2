export const SOUL_ARCHETYPES = [
  "Diver",
  "Gatherer",
  "Wanderer",
  "Curator",
  "Weaver",
  "Dweller",
  "Ignitor",
  "Seeker",
] as const;

export type SoulArchetype = (typeof SOUL_ARCHETYPES)[number];

/**
 * Maps a Soul Code's first letter (broad social/energy orientation) to one
 * of two candidate archetypes, then uses the second letter (planning/
 * structure orientation) to disambiguate. Internal only — never surfaced
 * to the participant.
 */
const ARCHETYPE_LOOKUP: Record<string, Record<string, SoulArchetype>> = {
  E: { P: "Ignitor", F: "Weaver", M: "Weaver", L: "Gatherer" },
  I: { P: "Seeker", F: "Curator", M: "Curator", L: "Dweller" },
  S: { P: "Wanderer", F: "Gatherer", M: "Curator", L: "Dweller" },
  G: { P: "Diver", F: "Seeker", M: "Wanderer", L: "Dweller" },
};

/**
 * Derives the Soul Archetype from a generated Soul Code string
 * (e.g. "EPNAP" -> uses "E" and "P").
 */
export function mapSoulArchetype(soulCode: string): SoulArchetype {
  const [first, second] = soulCode;
  return ARCHETYPE_LOOKUP[first]?.[second] ?? "Wanderer";
}