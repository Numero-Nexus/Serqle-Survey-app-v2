# Archetype Calibration

Documents how Soul Codes map to Soul Archetypes, and the rules for keeping this mapping isolated and extensible.

## Current Mapping Logic

`map-soul-archetype.ts` derives an archetype from the **first two letters** of the Soul Code:

- **Letter 1** (Position 1: E/I/S/G) — broad social/energy orientation.
- **Letter 2** (Position 2: P/F/M/L) — planning/structure orientation, used to disambiguate within the Letter 1 group.

This is a lookup table (`ARCHETYPE_LOOKUP`), not conditional branching — adding or changing an archetype means editing table entries, never the lookup function itself.

## Isolation Rule

`map-soul-archetype.ts` must:
- Import only from `dimensions.ts` types if needed — **never** from `calculate-behaviour-vector.ts` or `weights.ts`.
- Take a Soul Code **string** as its only input. It has no knowledge of behaviour dimensions or raw survey answers.

This keeps archetype calibration changeable independently of both the behaviour engine and the Soul Code generator.

## Adding a Future Archetype

1. Add the new archetype name to `SOUL_ARCHETYPES`.
2. Add/update entries in `ARCHETYPE_LOOKUP` for the relevant letter combinations.
3. No changes required in `calculate-behaviour-vector.ts` or `generate-soul-code.ts`.

## Fallback Rule

An unrecognized letter combination falls back to a documented default (currently `"Wanderer"`) rather than throwing — archetype mapping should never break the pipeline due to an uncalibrated combination.