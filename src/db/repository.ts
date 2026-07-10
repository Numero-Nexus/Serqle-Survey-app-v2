import { eq, asc } from "drizzle-orm";
import { db } from "./client";
import {
  canonicalEvents,
  type CanonicalEventRow,
  type NewCanonicalEventRow,
  participantContacts,
  type ParticipantContactRow,
  type NewParticipantContactRow,
} from "./schema";

/**
 * Repository abstraction over the Canonical Event Store. Intentionally
 * exposes ONLY insert and read operations — there is no update or delete
 * method anywhere in this interface, enforcing the store's append-only
 * invariant at the type/API level rather than relying on discipline alone.
 *
 * This repository has no knowledge of research instrumentation, the event
 * bus, or the survey engine — it operates purely on already-constructed
 * row data, preserving the "repository independent of instrumentation"
 * requirement.
 */
export interface EventRepository {
  insertOne(row: NewCanonicalEventRow): Promise<CanonicalEventRow>;
  insertMany(rows: NewCanonicalEventRow[]): Promise<CanonicalEventRow[]>;
  findByEventId(eventId: string): Promise<CanonicalEventRow | null>;
  findBySessionId(sessionId: string): Promise<CanonicalEventRow[]>;
}

export class DrizzleEventRepository implements EventRepository {
  async insertOne(row: NewCanonicalEventRow): Promise<CanonicalEventRow> {
    const [inserted] = await db.insert(canonicalEvents).values(row).returning();
    return inserted;
  }

  async insertMany(rows: NewCanonicalEventRow[]): Promise<CanonicalEventRow[]> {
    if (rows.length === 0) return [];
    return db.insert(canonicalEvents).values(rows).returning();
  }

  async findByEventId(eventId: string): Promise<CanonicalEventRow | null> {
    const [row] = await db
      .select()
      .from(canonicalEvents)
      .where(eq(canonicalEvents.eventId, eventId))
      .limit(1);
    return row ?? null;
  }

  async findBySessionId(sessionId: string): Promise<CanonicalEventRow[]> {
    return db
      .select()
      .from(canonicalEvents)
      .where(eq(canonicalEvents.sessionId, sessionId))
      .orderBy(asc(canonicalEvents.sequenceNumber));
  }
}

/** Singleton repository instance for the application. */
export const eventRepository: EventRepository = new DrizzleEventRepository();

/**
 * Repository abstraction over Participant Contacts. Insert-only — no read,
 * update, or join operations against canonicalEvents live here, keeping PII
 * storage fully isolated from the research event store.
 */
export interface ContactRepository {
  insertOne(row: NewParticipantContactRow): Promise<ParticipantContactRow>;
  findById(id: string): Promise<ParticipantContactRow | null>;
  updateThankYouStatus(
    id: string,
    status: "sent" | "failed",
    sentAt: Date | null
  ): Promise<void>;
}

export class DrizzleContactRepository implements ContactRepository {
  async insertOne(row: NewParticipantContactRow): Promise<ParticipantContactRow> {
    const [inserted] = await db
      .insert(participantContacts)
      .values(row)
      .returning();
    return inserted;
  }

  async findById(id: string): Promise<ParticipantContactRow | null> {
    const [row] = await db
      .select()
      .from(participantContacts)
      .where(eq(participantContacts.id, id))
      .limit(1);
    return row ?? null;
  }

  async updateThankYouStatus(
    id: string,
    status: "sent" | "failed",
    sentAt: Date | null
  ): Promise<void> {
    await db
      .update(participantContacts)
      .set({ thankYouEmailStatus: status, thankYouEmailSentAt: sentAt })
      .where(eq(participantContacts.id, id));
  }
}

/** Singleton repository instance for the application. */
export const contactRepository: ContactRepository = new DrizzleContactRepository();