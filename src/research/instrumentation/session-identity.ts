"use client";

/**
 * Anonymous, client-generated session/participant identifiers. Generated
 * once per module load (i.e. once per page session) and reused for every
 * event published during that session — never tied to any real identity.
 */
let cachedParticipantId: string | null = null;
let cachedSessionId: string | null = null;

export function getParticipantId(): string {
  if (!cachedParticipantId) {
    cachedParticipantId = crypto.randomUUID();
  }
  return cachedParticipantId;
}

export function getSessionId(): string {
  if (!cachedSessionId) {
    cachedSessionId = crypto.randomUUID();
  }
  return cachedSessionId;
}