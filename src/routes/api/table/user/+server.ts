import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export const GET: RequestHandler = async ({}) => {
    try {
        const result = await sql`CREATE TABLE users (
            id INT GENERATED ALWAYS AS IDENTITY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        );`;
        return json({ result });
    } catch (error) {
        return json({ error }, { status: 500 });
    }
};
