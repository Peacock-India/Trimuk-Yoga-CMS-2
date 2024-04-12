import type { Config } from "drizzle-kit";
import { env } from "./env.mjs";

const config: Config = {
  schema: "./src/schema/index.ts", // Path to your schema file
  out: "./drizzle", // Output directory for generated code
  driver: "pg", // PostgreSQL driver
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
};

export default config;
