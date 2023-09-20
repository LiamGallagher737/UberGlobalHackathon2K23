import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import forceLogin from '$lib/forceLogin';
import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const { email } = await forceLogin(locals);
    const results = await conn.select().from(users).where(eq(users.email, email));
    if (results.length === 0) throw error(500, 'Failed to get your infomation');
    return results[0];
};
