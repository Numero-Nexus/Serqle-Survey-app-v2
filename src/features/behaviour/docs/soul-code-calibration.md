# Soul Code Calibration

Documents which behaviour dimensions drive each Soul Code position, and the threshold model used to convert a continuous score into one of four letters per position.

## Position → Dimension Mapping

| Position | Letters | Derived From |
|----------|---------|--------------|
| 1 | E / I / S / G | `socialIntensity`, `socialFamiliarity` |
| 2 | P / F / M / L | `planningPreference` (flexibility is the inverse) |
| 3 | N / C / U / Q | `natureAffinity`, `urbanAffinity` (environment preference) |
| 4 | A / R / X / H | `riskAppetite`, `noveltySeeking` |
| 5 | P / X / L / M | `reflectionConfidence`, `learningOrientation`, `experienceOrientation` |

Where a position is derived from more than one dimension, the current engine (`generate-soul-code.ts`) uses a single representative dimension per position as a first pass. Multi-dimension blending (e.g. averaging `natureAffinity`/`urbanAffinity` into one environment score) is a future calibration step, not implemented yet.

## Threshold Model

Rather than hardcoding arbitrary cut points inline, thresholds are defined as a **named, configurable band table** — four equal quartiles by default, but adjustable per position without touching calculation logic:

```ts
// Illustrative shape for a future thresholds.ts module — not yet created
type BandThresholds = readonly [number, number, number]; // 3 cut points -> 4 bands

const DEFAULT_BANDS: BandThresholds = [0.25, 0.5, 0.75];
```

Each position can eventually reference its own `BandThresholds` (e.g. Position 2 might use asymmetric cuts like `[0.3, 0.55, 0.8]` if calibration data shows skew), rather than every position sharing the same quartile split as today's `pickBand` helper does.

## Calibration Rule

- Threshold values live in one dedicated module (future `thresholds.ts`), never inline in `generate-soul-code.ts`.
- Changing a threshold must never require changing which dimensions feed a position, and vice versa — the mapping table above and the threshold table are independent concerns.