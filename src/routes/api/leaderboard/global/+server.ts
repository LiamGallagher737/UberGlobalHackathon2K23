import { conn } from '$lib/db/conn.server';
import { users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

/**
 * Get the top N users globally, if N is not provded it will default to 10
 * @returns Top N users globally names and points in descending order of points
 */
export const GET: RequestHandler = async ({ url, setHeaders }) => {
    const count = Math.min(parseInt(url.searchParams.get('n') ?? '10') ?? 10, 100);

    const leaderboard = await conn
        .select({
            name: users.name,
            points: users.points,
        })
        .from(users)
        .where(eq(users.private, false))
        .orderBy(desc(users.points))
        .limit(count);

    if (leaderboard.length === 0) throw error(500, 'Unable to fetch leaderboard');

    setHeaders({
        // Browser chache for 5 mins, edge cache for 30 mins
        'Cache-Control': 'max-age=300, s-maxage=1800',
    });

    return json({
        result: leaderboard,
    });
};
