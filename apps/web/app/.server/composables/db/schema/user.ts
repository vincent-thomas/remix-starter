import { randomUUID } from "node:crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(randomUUID),
  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  created_at: timestamp("created_at").notNull(),
});

export const userSessionTable = pgTable("user_sessions", {
  id: text("id").primaryKey().$defaultFn(randomUUID),
  userId: text("user_id")
    .references(() => userTable.id)
    .notNull(),

  unvalidated_at: timestamp("unvalidated_at"),

  valid_until: timestamp("valid_until").notNull(),
  created_at: timestamp("created_at").notNull(),
});
