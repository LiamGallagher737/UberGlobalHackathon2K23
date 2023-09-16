import { foreignKey, serial } from 'drizzle-orm/mysql-core';
import { char, integer, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    email: text('email').notNull().primaryKey().unique(),
    name: text('name').notNull(),
    points: integer('points').default(0).notNull(),
    code: char('code', { length: 8 }).notNull().unique(),
});

export const journeys = pgTable('journeys', {
    id: serial("id").primaryKey().unique().notNull(),
    ownerId: integer("owner").references(() => users.id),
    points: integer("points")
});
