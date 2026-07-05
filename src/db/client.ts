import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config/env";
import * as schema from "./schema";

/**
 * Singleton connection pool + typed Drizzle client. One pool per server
 * process — reused across requests/module reloads via globalThis caching
 * to avoid exhausting connections during Next.js dev hot-reload.
 */
const globalForDb = globalThis as unknown as {
  pgPool: Pool | undefined;
};

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

export const db = drizzle(pool, { schema });