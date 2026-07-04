import type { SurveyEvent } from "@/research/events/types";
import type { EventType } from "@/research/events/taxonomy";
import { classifySignal, type SignalKind } from "./signals";
import { surveyEventBus } from "@/research/bus/event-bus";

export interface CollectedRecord {
  event: SurveyEvent<unknown>;
  signalKind: SignalKind;
  collectedAt: string;
}

/**
 * In-memory research instrumentation collector. Subscribes to every event
 * on the bus, classifies it, and buffers an immutable record. This layer
 * performs NO persistence, storage, or network I/O — records exist only
 * for the lifetime of the page/session, per this phase's explicit scope
 * boundary. Persistence is a future phase's responsibility.
 */
export class ResearchCollector {
  private records: CollectedRecord[] = [];
  private unsubscribe: (() => void) | null = null;

  /** Begins collecting events from the given bus (defaults to the shared singleton). */
  start(bus = surveyEventBus): void {
    if (this.unsubscribe) return; // already started
    this.unsubscribe = bus.subscribeAll((event) => {
      const record: CollectedRecord = Object.freeze({
        event,
        signalKind: classifySignal(event.type as EventType),
        collectedAt: new Date().toISOString(),
      });
      this.records.push(record);
    });
  }

  /** Stops collecting. Buffered records are retained until `clear()` is called. */
  stop(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  /** Returns a read-only snapshot of all collected records, in collection order. */
  getRecords(): readonly CollectedRecord[] {
    return [...this.records];
  }

  /** Returns only explicit-signal records. */
  getExplicitRecords(): readonly CollectedRecord[] {
    return this.records.filter((r) => r.signalKind === "explicit");
  }

  /** Returns only implicit-signal records. */
  getImplicitRecords(): readonly CollectedRecord[] {
    return this.records.filter((r) => r.signalKind === "implicit");
  }

  /** Clears the in-memory buffer. Does not affect any external storage (there is none). */
  clear(): void {
    this.records = [];
  }

  /**
   * Deterministically serializes all collected records to JSON. Deterministic
   * because records are appended in strict sequence-number order and never
   * mutated after creation.
   */
  toJSON(): string {
    return JSON.stringify(this.records, null, 2);
  }
}

/** Singleton collector for the application's single survey session. */
export const researchCollector = new ResearchCollector();