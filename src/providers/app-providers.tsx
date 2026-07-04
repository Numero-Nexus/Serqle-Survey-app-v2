"use client";

import { ReactNode } from "react";

/**
 * Single composition root for all application-level providers.
 * Future providers (theme, query client, etc.) should be added here
 * rather than modifying the root layout directly.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}