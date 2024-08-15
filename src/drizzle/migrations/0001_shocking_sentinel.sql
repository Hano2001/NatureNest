ALTER TABLE "locations" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "locations_utils" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;