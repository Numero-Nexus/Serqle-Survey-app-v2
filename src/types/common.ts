/**
 * Generic API response shape, discriminated by `success`.
 * Reused by any future API route regardless of domain.
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Allows `T` or `null`. */
export type Nullable<T> = T | null;

/** Allows `T`, `null`, or `undefined`. */
export type Maybe<T> = T | null | undefined;

/** Flattens intersection types for cleaner hover tooltips in editors. */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};