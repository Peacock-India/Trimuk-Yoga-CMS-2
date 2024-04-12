import { json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tbl_admin = pgTable("tbl_admin", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").notNull().unique(), // the clerk User Id
  first_name: text("first_name").default(""),
  last_name: text("last_name").default(""),
  email: text("email").notNull().unique(),
  photo_url: text("photo_url").default(""),
  attributes: json("attributes").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ** __________ RELATIONS __________ **
