import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();

    if (session === null) throw error(401, 'Session not found');

    const leaderboardCols = {
        name: users.name,
        points: users.points,
    };

    if (!session.user?.email) throw error(500, 'Session email not found');

    const userEntry = await conn
        .select(leaderboardCols)
        .from(users)
        .where(eq(users.email, session.user.email));

    if (userEntry.length === 0) throw error(404, 'User not found');

    const leaderboard = await conn
        .select(leaderboardCols)
        .from(users)
        .orderBy(desc(users.points))
        .limit(10);

    if (leaderboard.length === 0) throw error(500, 'Unable to fetch leaderboard');

    return json({
        result: leaderboard,
        user: userEntry[0],
    });
};
