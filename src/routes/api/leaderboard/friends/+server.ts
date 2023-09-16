import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc, eq, inArray, or } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();
    if (session === null) throw error(401, 'Session not found');

    const leaderboardCols = {
        name: users.name,
        points: users.points,
    };

    if (!session.user?.email) throw error(500, 'Session email not found');

    const friends = conn
        .select({ friends: users.friends })
        .from(users)
        .where(eq(users.email, session.user.email))
        .as('sq');

    const friendsLeaderboard = await conn
        .select(leaderboardCols)
        .from(users)
        .where(or(inArray(users.id, friends), eq(users.email, session.user?.email)))
        .orderBy(desc(users.points));

    return json({
        result: friendsLeaderboard,
    });
};
