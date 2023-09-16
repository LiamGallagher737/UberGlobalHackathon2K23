import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();

    if (session === null) throw error(401, 'Session not found');

    if (!session.user?.email) throw error(500, 'Session email not found');

    const results = await conn.select().from(users).where(eq(users.email, session.user.email));

    if (results.length === 0) throw error(404, 'User not found');

    return json(results[0]);
};
