import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

import { env } from "../env.mjs";

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
});

// Inside db.ts or a similar file where you connect to the DB
console.log("Connecting to DB with URL: ", env.DATABASE_URL);
