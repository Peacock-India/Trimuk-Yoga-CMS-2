import { relations, sql } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { tbl_class_entries } from "./tbl_class_entries";

export const tbl_class = pgTable("tbl_class", {
  id: serial("id").primaryKey(),
  class_id: text("class_id")
    .unique()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: json("features").default([]),
  offer_price: integer("offer_price"),
  regular_price: integer("regular_price"),
  mode: json("mode").default(["Online", "Offline"]),
  day_of_plan: integer("days_of_plan"),
  day_of_week: json("day_of_week").default([]),
  timings: json("timings").default([]),
  eligibility: text("eligibility").default(""),
  images: json("images").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const classRelation = relations(tbl_class, ({ many }) => ({
  entries: many(tbl_class_entries),
}));
