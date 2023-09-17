import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params, locals }) => {
    const code = params.code;
    if (!code) throw error(422, 'No code supplied');

    const otherUserQuery = conn
        .select({
            id: users.id,
            private: users.private,
            points: users.points,
            name: users.name,
            friends: users.friends,
            email: users.email,
        })
        .from(users)
        .where(eq(users.code, code))
        .limit(1);

    const session = await locals.getSession();
    if (!session?.user?.email) throw error(500, 'Session email not found');

    const myUserQuery = await conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

    const [myUserReq, otherUserReq] = await Promise.all([myUserQuery, otherUserQuery]);

    if (otherUserReq.length === 0) throw error(404, 'Could not find user');
    const otherUser = otherUserReq[0];
    if (otherUser.private) throw error(403, 'User has set themselves to private');

    if (myUserReq.length === 0) throw error(404, 'Could not find database entry');
    const myID = myUserReq[0].id;

    const isFriend = !!otherUser.friends && otherUser.friends.includes(myID);
    const isMe = otherUser.id == myID;

    return json({
        name: otherUser.name,
        id: otherUser.id,
        points: otherUser.points,
        code: code,
        isFriend: !isMe && isFriend,
        isMe: isMe,
    });
};
