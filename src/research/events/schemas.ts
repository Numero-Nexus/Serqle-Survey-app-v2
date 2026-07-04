import { z } from "zod";

export const eventCategorySchema = z.enum([
  "lifecycle",
  "interaction",
  "navigation",
  "validation",
  "submission",
  "research",
]);

export const eventProducerSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
});

export const eventVersionsSchema = z.object({
  eventVersion: z.string().min(1),
  schemaVersion: z.string().min(1),
  surveyVersion: z.string().min(1),
  featureVersion: z.string().min(1),
  rewardVersion: z.string().min(1),
});

export const experimentMetadataSchema = z.object({
  experimentId: z.string().optional(),
  experimentVariant: z.string().optional(),
  questionOrder: z.array(z.string()).optional(),
  screenOrder: z.array(z.string()).optional(),
});

/**
 * Canonical envelope schema. `payload` is intentionally `z.unknown()` here;
 * concrete event types (Step 4) layer a specific payload schema on top via
 * `surveyEventSchema.extend({ payload: <specific schema> })`.
 */
export const surveyEventSchema = z.object({
  eventId: z.string().min(1),
  category: eventCategorySchema,
  type: z.string().min(1),
  timestamp: z.string().datetime(),
  sequenceNumber: z.number().int().nonnegative(),
  parentEventId: z.string().min(1).nullable(),
  producer: eventProducerSchema,
  source: z.string().min(1),
  versions: eventVersionsSchema,
  experiment: experimentMetadataSchema,
  payload: z.unknown(),
});

export type SurveyEventSchemaType = z.infer<typeof surveyEventSchema>;