import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/**
 * Get the data of your user with their session
 * @returns User data
 */
export const GET: RequestHandler = async ({ locals }) => {
    const { email } = await forceLogin(locals);

    const results = await conn.select().from(users).where(eq(users.email, email));

    if (results.length === 0) throw error(404, 'User not found');

    return json(results[0]);
};
