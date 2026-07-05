import { z } from "zod";

/**
 * Runtime-validated environment schema.
 * Extend this schema in later phases as new env vars (DB URL, auth secrets, etc.) are introduced.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required for the Canonical Event Store"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${parsed.error.message}`
    );
  }

  return parsed.data;
}

export const env = loadEnv();