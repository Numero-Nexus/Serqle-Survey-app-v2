CREATE TABLE "participant_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"participant_id" text NOT NULL,
	"email" text NOT NULL,
	"consent" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_participant_contacts_participant_id" ON "participant_contacts" USING btree ("participant_id");