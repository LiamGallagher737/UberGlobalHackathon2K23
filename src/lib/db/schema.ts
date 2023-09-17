import { char, integer, pgTable, text, serial, boolean, date } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: serial('id').notNull().primaryKey().unique(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    points: integer('points').default(0).notNull(),
    code: char('code', { length: 8 }).notNull().unique(),
    friends: integer('friends').array(),
    private: boolean('private').notNull().default(false),
});

export const journeys = pgTable('journeys', {
    id: serial('id').primaryKey().unique().notNull(),
    owner: integer('owner_id').references(() => users.id),
    points: integer('points'),
});

export const raffles = pgTable('raffles', {
    id: serial('id').primaryKey().unique().notNull(),
    entryCost: integer('entry_cost').notNull(),
    name: text('name').unique().notNull(),
    description: text('description').notNull(),
    closeDate: date('end').notNull(),
});

export const raffleEntries = pgTable('raffle_entries', {
    id: serial('id').primaryKey().unique().notNull(),
    user: integer('user_id')
        .references(() => users.id)
        .notNull(),
    raffle: integer('raffle_id')
        .references(() => raffles.id)
        .notNull(),
    count: integer('num_entries').notNull(),
});
