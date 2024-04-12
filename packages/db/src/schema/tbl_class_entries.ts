import { relations, sql } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// ** import schema
import { tbl_class } from "./tbl_class";
import { tbl_users } from "./tbl_users";

export const tbl_class_entries = pgTable("tbl_class_entries", {
  id: serial("id").primaryKey(),
  entry_id: text("entry_id")
    .unique()
    .default(sql`gen_random_uuid()`),

  user_id: text("user_id")
    .notNull()
    .references(() => tbl_users.user_id, { onDelete: "set null" }),
  class_id: text("class_id")
    .notNull()
    .references(() => tbl_class.class_id, { onDelete: "set null" }),

  mode: text("mode", { enum: ["Online", "Offline"] }),

  day_of_plan: integer("days_of_plan"), // 5 or 7, ...
  day_of_week: json("day_of_week").default([]), // e.g., "Monday", "Tuesday" or "Mon to Fri", "Tue & Thu"

  timings: json("timings"), // {start: "10:00 am", end: "12:00 pm"}

  amount: integer("amount"),
  currency: text("currency").default("INR"),
  invoice_url: text("invoice_url"),
  transaction_type: text("transaction_type").default(""),
  payment_method: text("payment_method").default(""),
  payu_meta: json("payu_meta"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ** __________ RELATIONS __________ **

export const tblClassEntriesRelation = relations(
  tbl_class_entries,
  ({ one }) => ({
    class: one(tbl_class, {
      fields: [tbl_class_entries.class_id],
      references: [tbl_class.class_id],
    }),
    users: one(tbl_users, {
      fields: [tbl_class_entries.user_id],
      references: [tbl_users.user_id],
    }),
  })
);
