import { relations } from "drizzle-orm";

import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/* import schema */
import { tbl_class_entries } from "./tbl_class_entries";

export const tbl_class = pgTable("tbl_class", {
  id: serial("id").primaryKey(),

  class_id: uuid("class_id").defaultRandom().notNull(),

  name: text("name").notNull(),
  description: text("description").notNull(),

  features: json("features").default([]),

  offer_price: integer("offer_price"),
  regular_price: integer("regular_price"),

  mode: json("mode").default(["Online", "Offline"]),

  day_of_plan: integer("days_of_plan"), // 5 or 7, ...
  day_of_week: json("day_of_week").default([]), // e.g., "Monday", "Tuesday" or "Mon to Fri", "Tue & Thu"

  timings: json("timings").default([]), // {start: "10:00 am", end: "12:00 pm"}

  eligibility: text("eligibility").default(""),

  images: json("images").default([]),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ** __________ RELATIONS __________ **

export const classRelation = relations(tbl_class, ({ many }) => ({
  entries: many(tbl_class_entries),
}));
