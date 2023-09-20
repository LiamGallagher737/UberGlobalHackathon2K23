import { char, integer, pgTable, text, serial, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
    id: serial('id').notNull().primaryKey().unique(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    points: integer('points').default(0).notNull(),
    code: char('code', { length: 8 }).notNull().unique(),
    friends: integer('friends').array(),
    private: boolean('private').notNull().default(false),
    pfp: text('pfp')
        .notNull()
        .default(
            'https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png'
        ),
    cars: jsonb('cars').$type<{ name: string; id: string }>().array(),
});

export const journeys = pgTable('journeys', {
    id: serial('id').primaryKey().unique().notNull(),
    owner: integer('owner_id').references(() => users.id),
    points: integer('points'),
});
