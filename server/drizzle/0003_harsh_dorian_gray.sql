CREATE TYPE "public"."invite_status" AS ENUM('pending', 'accepted', 'expired', 'revoked');--> statement-breakpoint
CREATE TABLE "business_invites" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role_id" integer NOT NULL,
	"status" "invite_status" DEFAULT 'pending' NOT NULL,
	"invited_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "business_invites" ADD CONSTRAINT "business_invites_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_invites" ADD CONSTRAINT "business_invites_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_invites" ADD CONSTRAINT "business_invites_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;