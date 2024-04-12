ALTER TABLE "tbl_class" ALTER COLUMN "class_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_class" ALTER COLUMN "class_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_class_entries" ALTER COLUMN "entry_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_class_entries" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_class_entries" ALTER COLUMN "class_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_users" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_workshop" ALTER COLUMN "workshop_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_workshop_entries" ALTER COLUMN "entry_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_workshop_entries" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_workshop_entries" ALTER COLUMN "workshop_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tbl_class" ADD CONSTRAINT "tbl_class_class_id_unique" UNIQUE("class_id");