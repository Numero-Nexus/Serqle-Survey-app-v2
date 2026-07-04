"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ValidationDisplayContextValue {
  hasAttemptedNext: boolean;
  markAttempted: () => void;
  resetAttempted: () => void;
}

const ValidationDisplayContext = createContext<
  ValidationDisplayContextValue | undefined
>(undefined);

/**
 * Tracks whether the participant has attempted to advance on the current
 * screen, so validation errors only display after a failed attempt rather
 * than immediately on screen load.
 */
export function ValidationDisplayProvider({ children }: { children: ReactNode }) {
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  return (
    <ValidationDisplayContext.Provider
      value={{
        hasAttemptedNext,
        markAttempted: () => setHasAttemptedNext(true),
        resetAttempted: () => setHasAttemptedNext(false),
      }}
    >
      {children}
    </ValidationDisplayContext.Provider>
  );
}

export function useValidationDisplay(): ValidationDisplayContextValue {
  const context = useContext(ValidationDisplayContext);
  if (context === undefined) {
    throw new Error(
      "useValidationDisplay must be used within a ValidationDisplayProvider"
    );
  }
  return context;
}