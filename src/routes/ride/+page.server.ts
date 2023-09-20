import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../user/$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const { email } = await forceLogin(locals);

    const res = await conn.select({ cars: users.cars }).from(users).where(eq(users.email, email));
    if (res.length === 0) throw error(500, 'Failed to get yours cars');

    return {
        cars: res[0].cars ?? [],
    }
};
