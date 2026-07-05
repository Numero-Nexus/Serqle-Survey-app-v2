import type { ResearchDatasetRow } from "./schema";

/**
 * Long-format: one row per (sessionId, variableName, value) triple.
 * Useful for statistical tools that expect tidy/long data.
 */
export interface LongFormatRow {
  sessionId: string;
  variableGroup: "context" | "action" | "reward" | "quality";
  variableName: string;
  value: string | number | boolean | null;
}

/**
 * Wide-format: one row per session, one column per variable — matches
 * ResearchDatasetRow's shape directly when flattened.
 */
export type WideFormatRow = ResearchDatasetRow;

/**
 * CSV export contract: column order and stringification rules. No CSV
 * writer is implemented in this phase — this defines the target shape a
 * future export implementation must produce.
 */
export interface CsvExportContract {
  columns: string[];
  /** Row values in the same order as `columns`, already stringified. */
  rows: string[][];
}

/**
 * Parquet export contract: same logical schema as CSV, but typed natively
 * (no stringification) since Parquet supports typed columns directly.
 */
export interface ParquetExportContract {
  schema: Record<string, "utf8" | "int64" | "float64" | "bool">;
  rows: WideFormatRow[];
}

/** JSON export contract: an array of validated dataset rows, as-is. */
export type JsonExportContract = ResearchDatasetRow[];