import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc, eq, inArray } from 'drizzle-orm';

/**
 * Get the leaderboard of the current user friends using their session
 * @returns Friends names and points in descending order of points
 */
export const GET: RequestHandler = async ({ locals }) => {
    const { email } = await forceLogin(locals)

    const userResults = await conn
        .select({ name: users.name, points: users.points, friends: users.friends })
        .from(users)
        .where(eq(users.email, email));

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

    const leaderboard = await conn
        .select({ name: users.name, points: users.points })
        .from(users)
        .where(inArray(users.id, user.friends))
        .orderBy(desc(users.points));

    return json({
        leaderboard,
        user: {
            name: user.name,
            points: user.points,
        },
    });
};
