CREATE TYPE "public"."finance_account_type" AS ENUM('cash', 'bank', 'mobile_money', 'other');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('registered', 'in_registration', 'not_registered');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'done');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"pinned" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" "finance_account_type" NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"name" varchar(100) NOT NULL,
	"type" "transaction_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"category_id" integer,
	"type" "transaction_type" NOT NULL,
	"amount" integer NOT NULL,
	"description" varchar(255),
	"receipt_url" varchar(512),
	"recorded_by" integer NOT NULL,
	"occurred_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"assignee_id" integer,
	"status" "task_status" DEFAULT 'todo' NOT NULL,
	"due_date" timestamp,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"content" text NOT NULL,
	"edited_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "business_invites" ADD COLUMN "code" varchar(12) NOT NULL;--> statement-breakpoint
ALTER TABLE "business_invites" ADD COLUMN "expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "business_members" ADD COLUMN "job_title" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "business_type" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "business_email" varchar(255);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "industry_type" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "phone" varchar(30);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "location" varchar(100);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "logo_url" varchar(512);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "registration_status" "registration_status";--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "registration_prefix" varchar(10);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "registration_number" varchar(50);--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "registration_date" timestamp;--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "onboarding_step" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(30);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" varchar(512);--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_accounts" ADD CONSTRAINT "finance_accounts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_categories" ADD CONSTRAINT "finance_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_account_id_finance_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."finance_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_category_id_finance_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."finance_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_recorded_by_users_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_channels" ADD CONSTRAINT "workspace_channels_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_messages" ADD CONSTRAINT "workspace_messages_channel_id_workspace_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."workspace_channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_messages" ADD CONSTRAINT "workspace_messages_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "business_invites" ADD CONSTRAINT "business_invites_code_unique" UNIQUE("code");