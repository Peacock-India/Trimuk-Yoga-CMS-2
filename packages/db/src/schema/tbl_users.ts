import { relations } from "drizzle-orm";

import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

/* import schema */
import { tbl_class_entries } from "./tbl_class_entries";
import { tbl_workshop_entries } from "./tbl_workshop_entries";

export const tbl_users = pgTable("tbl_users", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id").defaultRandom().unique(),

  first_name: text("first_name").default(""),
  last_name: text("last_name").default(""),
  email: text("email").notNull().unique(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ** __________ RELATIONS __________ **

// Defining Relations
export const userRelations = relations(tbl_users, ({ many }) => ({
  class: many(tbl_class_entries),
  workshop: many(tbl_workshop_entries),
}));
