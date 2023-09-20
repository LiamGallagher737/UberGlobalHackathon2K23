import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/**
 * Adds a car to the user
 * @returns Operation status
 */
export const POST: RequestHandler = async ({ locals, request }) => {
    const data = await request.json();
    if (!checkCarEntry(data)) throw error(422, 'Invalid data');

    const { email } = await forceLogin(locals);

    const cars_res = await conn
        .select({ id: users.id, cars: users.cars })
        .from(users)
        .where(eq(users.email, email));
    if (cars_res.length === 0) throw error(500, 'Failed to get current cars');
    const { id, cars } = cars_res[0];
    const cars_list = cars ?? [];
    cars_list.push(data);

    const res = await conn
        .update(users)
        .set({ cars: cars_list })
        .where(eq(users.id, id))
        .returning({ cars: users.cars });
    if (res.length === 0) throw error(500, 'Failed to update cars list');

    return json({
        message: 'Successfully added car',
    });
};

// eslint-disable-next-line
function checkCarEntry(obj: any): obj is { name: string; id: string } {
    return typeof obj.name === 'string' && typeof obj.id === 'string';
}
