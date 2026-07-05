CREATE TABLE "canonical_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"category" text NOT NULL,
	"type" text NOT NULL,
	"event_timestamp" timestamp with time zone NOT NULL,
	"sequence_number" integer NOT NULL,
	"parent_event_id" uuid,
	"producer" jsonb NOT NULL,
	"source" text NOT NULL,
	"versions" jsonb NOT NULL,
	"experiment" jsonb NOT NULL,
	"payload" jsonb NOT NULL,
	"participant_id" text NOT NULL,
	"session_id" text NOT NULL,
	"instrument_version" text NOT NULL,
	"ui_version" text NOT NULL,
	"client_version" text NOT NULL,
	"build_identifier" text NOT NULL,
	"device_category" text NOT NULL,
	"locale" text NOT NULL,
	"timezone" text NOT NULL,
	"survey_version" text NOT NULL,
	"experiment_id" text,
	"experiment_variant" text,
	"persisted_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "canonical_events_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE INDEX "idx_canonical_events_event_id" ON "canonical_events" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_participant_id" ON "canonical_events" USING btree ("participant_id");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_session_id" ON "canonical_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_type" ON "canonical_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_category" ON "canonical_events" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_timestamp" ON "canonical_events" USING btree ("event_timestamp");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_sequence_number" ON "canonical_events" USING btree ("sequence_number");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_experiment_id" ON "canonical_events" USING btree ("experiment_id");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_experiment_variant" ON "canonical_events" USING btree ("experiment_variant");--> statement-breakpoint
CREATE INDEX "idx_canonical_events_survey_version" ON "canonical_events" USING btree ("survey_version");