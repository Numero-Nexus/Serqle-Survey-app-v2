import type { SurveyEvent } from "@/research/events/types";
import type { EventPayloadMap, EventType } from "@/research/events/taxonomy";

type Handler<T extends EventType> = (
  event: SurveyEvent<EventPayloadMap[T]>
) => void;

type WildcardHandler = (event: SurveyEvent<unknown>) => void;

/**
 * Generic, strongly-typed event bus. Depends only on the canonical event
 * types/taxonomy — has no knowledge of the survey engine, UI, or any
 * concrete producer/consumer. This one-way boundary is what lets
 * instrumentation observe the system without the engine ever depending on it.
 */
export class SurveyEventBus {
  private handlers = new Map<EventType, Set<Handler<EventType>>>();
  private wildcardHandlers = new Set<WildcardHandler>();

  /** Subscribe to a specific event type. Returns an unsubscribe function. */
  subscribe<T extends EventType>(type: T, handler: Handler<T>): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    const set = this.handlers.get(type)!;
    set.add(handler as Handler<EventType>);
    return () => {
      set.delete(handler as Handler<EventType>);
    };
  }

  /** Subscribe to every event regardless of type. Returns an unsubscribe function. */
  subscribeAll(handler: WildcardHandler): () => void {
    this.wildcardHandlers.add(handler);
    return () => {
      this.wildcardHandlers.delete(handler);
    };
  }

  /** Publish an event to all matching subscribers, then all wildcard subscribers. */
  publish<T extends EventType>(
    type: T,
    event: SurveyEvent<EventPayloadMap[T]>
  ): void {
    const set = this.handlers.get(type);
    if (set) {
      for (const handler of set) {
        handler(event);
      }
    }
    for (const handler of this.wildcardHandlers) {
      handler(event as SurveyEvent<unknown>);
    }
  }
}

/**
 * Singleton bus instance for the application. A single shared bus is
 * appropriate here since there is exactly one survey session per page load.
 */
export const surveyEventBus = new SurveyEventBus();