import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';

export type RemoveFriendResponse = {
    status: 'ok' | 'not friends';
};

export const POST: RequestHandler = async ({ params, locals }) => {
    const code = params.code;
    if (!code) throw error(404, 'No code supplied');

    const { email } = await forceLogin(locals);

    const my_query = conn
        .select({ id: users.id, friends: users.friends })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    const other_query = conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.code, code))
        .limit(1);

    const [my_res, other_res] = await Promise.all([my_query, other_query]);
    if (my_res.length === 0) throw error(500, 'Failed to get user');
    if (other_res.length === 0) throw error(404, 'Could not find user with provided code');

    const my_user = my_res[0];
    const other_user = other_res[0];

    if (my_user.friends && !my_user.friends.includes(other_user.id))
        return json({ status: 'not friends' } satisfies RemoveFriendResponse, { status: 208 });

    const meToYou = conn.execute(
        sql`UPDATE "user" SET friends = ARRAY_REMOVE(friends, ${other_user.id}) WHERE id = ${my_user.id};`
    );

    const youToMe = conn.execute(
        sql`UPDATE "user" SET friends = ARRAY_REMOVE(friends, ${my_user.id}) WHERE id = ${other_user.id};`
    );

    await Promise.all([meToYou, youToMe]);

    return json({ status: 'ok' } satisfies RemoveFriendResponse);
};
