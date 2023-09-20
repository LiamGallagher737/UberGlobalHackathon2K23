import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

type RequestData = {
    private: boolean | undefined;
};

/**
 * Set the private column of the user with their session
 * @returns Operation status
 */
export const PUT: RequestHandler = async ({ locals, request }) => {
    const data: RequestData = await request.json();
    if (data.private === undefined) throw error(422, "No 'private' field provided");

    const { email } = await forceLogin(locals);

    const result = await conn
        .update(users)
        .set({ private: data.private })
        .where(eq(users.email, email))
        .returning({ private: users.private });

    if (result.length === 0) throw error(500, 'Failed to update user');

    return json({
        message: 'Successfully updated profile',
    });
};
