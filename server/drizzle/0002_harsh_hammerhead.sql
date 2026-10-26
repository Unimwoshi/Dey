CREATE TYPE "public"."module_pricing" AS ENUM('free', 'paid');--> statement-breakpoint
CREATE TYPE "public"."module_status" AS ENUM('draft', 'published', 'deprecated');--> statement-breakpoint
CREATE TABLE "module_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"module_id" integer NOT NULL,
	"price_paid" integer NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "developer_id" integer;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "pricing" "module_pricing" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "price" integer;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "status" "module_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "module_purchases" ADD CONSTRAINT "module_purchases_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_purchases" ADD CONSTRAINT "module_purchases_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_developer_id_users_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;