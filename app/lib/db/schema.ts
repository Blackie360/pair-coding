import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from ".";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    hashedPassword: text("hashed_password"),
    googleId: text("google_id").unique(),

});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;