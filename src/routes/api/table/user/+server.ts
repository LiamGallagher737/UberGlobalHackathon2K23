import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export const GET: RequestHandler = async () => {
    try {
        const result = await sql`CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email UNIQUE TEXT NOT NULL,
            score INT NOT NULL,
            code UNIQUE CHAR(8)
        );`;
        return json({ result });
    } catch (error) {
        return json({ error }, { status: 500 });
    }
};
