

import pg from "pg";
import * as schema from "./schema";

import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

const pool = new pg.Pool({
    connectionString: process.env.DB_URL!,
});
const db = drizzle(pool, {schema}) as NodePgDatabase<typeof schema>;

export default db;