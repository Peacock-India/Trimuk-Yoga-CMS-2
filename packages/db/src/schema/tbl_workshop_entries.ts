import { relations, sql } from "drizzle-orm";

import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/* import schema */
import { tbl_users } from "./tbl_users";
import { tbl_workshop } from "./tbl_workshop";

export const tbl_workshop_entries = pgTable("tbl_workshop_entries", {
  id: serial("id").primaryKey(),
  entry_id: text("entry_id")
    .unique()
    .default(sql`gen_random_uuid()`),

  user_id: text("user_id")
    .notNull()
    .references(() => tbl_users.user_id, { onDelete: "set null" }),

  workshop_id: text("workshop_id")
    .notNull()
    .references(() => tbl_workshop.workshop_id, { onDelete: "set null" }),

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

export const tblWorkshopEntriesRelation = relations(
  tbl_workshop_entries,
  ({ one }) => ({
    workshop: one(tbl_workshop, {
      fields: [tbl_workshop_entries.workshop_id],
      references: [tbl_workshop.workshop_id],
    }),
    users: one(tbl_users, {
      fields: [tbl_workshop_entries.user_id],
      references: [tbl_users.user_id],
    }),
  })
);
