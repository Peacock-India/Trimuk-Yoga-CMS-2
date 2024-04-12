CREATE TABLE IF NOT EXISTS "tbl_admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"first_name" text DEFAULT '',
	"last_name" text DEFAULT '',
	"email" text NOT NULL,
	"photo_url" text DEFAULT '',
	"attributes" json DEFAULT '{}'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tbl_admin_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "tbl_admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_class" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"features" json DEFAULT '[]'::json,
	"offer_price" integer,
	"regular_price" integer,
	"mode" json DEFAULT '["Online","Offline"]'::json,
	"days_of_plan" integer,
	"day_of_week" json DEFAULT '[]'::json,
	"timings" json DEFAULT '[]'::json,
	"eligibility" text DEFAULT '',
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_class_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" uuid DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"class_id" text NOT NULL,
	"mode" text,
	"days_of_plan" integer,
	"day_of_week" json DEFAULT '[]'::json,
	"timings" json,
	"amount" integer,
	"currency" text DEFAULT 'INR',
	"invoice_url" text,
	"transaction_type" text DEFAULT '',
	"payment_method" text DEFAULT '',
	"payu_meta" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tbl_class_entries_entry_id_unique" UNIQUE("entry_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid DEFAULT gen_random_uuid(),
	"first_name" text DEFAULT '',
	"last_name" text DEFAULT '',
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tbl_users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "tbl_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_workshop" (
	"id" serial PRIMARY KEY NOT NULL,
	"workshop_id" uuid DEFAULT gen_random_uuid(),
	"workshop_title" text NOT NULL,
	"description" text DEFAULT '',
	"date" timestamp,
	"start_time" timestamp,
	"end_time" timestamp,
	"timezone" text NOT NULL,
	"trainer" text NOT NULL,
	"images" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tbl_workshop_workshop_id_unique" UNIQUE("workshop_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_workshop_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" uuid DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"workshop_id" text NOT NULL,
	"amount" integer,
	"currency" text DEFAULT 'INR',
	"invoice_url" text,
	"transaction_type" text DEFAULT '',
	"payment_method" text DEFAULT '',
	"payu_meta" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tbl_workshop_entries_entry_id_unique" UNIQUE("entry_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_class_entries" ADD CONSTRAINT "tbl_class_entries_user_id_tbl_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_class_entries" ADD CONSTRAINT "tbl_class_entries_class_id_tbl_class_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "tbl_class"("class_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_workshop_entries" ADD CONSTRAINT "tbl_workshop_entries_user_id_tbl_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "tbl_users"("user_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_workshop_entries" ADD CONSTRAINT "tbl_workshop_entries_workshop_id_tbl_workshop_workshop_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "tbl_workshop"("workshop_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
