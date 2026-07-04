"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

/**
 * Tracks whether a given CSS media query currently matches.
 * Example: useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`)
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false // server snapshot: assume no match during SSR
  );
}