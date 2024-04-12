import { relations } from "drizzle-orm";

import {
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/* import schema */
import { tbl_workshop_entries } from "./tbl_workshop_entries";

export const tbl_workshop = pgTable("tbl_workshop", {
  id: serial("id").primaryKey(),
  workshop_id: uuid("workshop_id").defaultRandom().unique(),

  workshop_title: text("workshop_title").notNull(),
  description: text("description").default(""),

  date: timestamp("date"), // event date
  start_time: timestamp("start_time"),
  end_time: timestamp("end_time"),

  timezone: text("timezone").notNull(),

  trainer: text("trainer").notNull(),
  images: json("images").default([]),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ** __________ RELATIONS __________ **

export const workshopRelation = relations(tbl_workshop, ({ many }) => ({
  entries: many(tbl_workshop_entries),
}));
