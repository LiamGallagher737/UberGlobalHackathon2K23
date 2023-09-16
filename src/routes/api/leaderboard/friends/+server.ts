import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc, eq, inArray } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();
    if (session === null) throw error(401, 'Session not found');

    if (!session.user?.email) throw error(500, 'Session email not found');

    const userResults = await conn
        .select({ name: users.name, points: users.points, friends: users.friends })
        .from(users)
        .where(eq(users.email, session.user.email));

    if (userResults.length === 0) throw error(404, 'User not found');
    const user = userResults[0];

    if (user.friends === null) {
        return json({
            leaderboard: [],
            user: {
                name: user.name,
                points: user.points,
            },
        });
    }

    const leaderboard = conn
        .select({ name: users.name, points: users.points })
        .from(users)
        .innerJoin(users, inArray(users.id, user.friends))
        .orderBy(desc(users.points));

    return json({
        leaderboard,
        user: {
            name: user.name,
            points: user.points,
        },
    });
};
