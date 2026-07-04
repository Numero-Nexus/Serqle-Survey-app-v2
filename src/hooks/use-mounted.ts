"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Use to safely guard client-only rendering and avoid hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time mount flag to guard client-only rendering; there is no external store to sync via useSyncExternalStore here.
    setMounted(true);
  }, []);

  return mounted;
}