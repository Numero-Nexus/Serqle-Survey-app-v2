/**
 * Client-safe public config — SAFE to import from "use client" components.
 * Contains only NEXT_PUBLIC_* values with no server-secret validation.
 */
export const SURVEY_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";