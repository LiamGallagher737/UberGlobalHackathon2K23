import { conn } from '$lib/db/conn.server';
import { journeys, users } from '$lib/db/schema';
import forceLogin from '$lib/forceLogin';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

type TakeJourneyData = {
    journey_ID: number | undefined | null;
};

/**
 * Handles the user wanting to actually take a trip instead of just looking
 * @returns The new amount of points that the user has
 */
export const POST: RequestHandler = async ({ locals, request }) => {
    const { email } = await forceLogin(locals);

    const data: TakeJourneyData = await request.json();

    if (!data.journey_ID) throw error(422, 'No journey_ID provided');

    const journey = (
        await conn.select().from(journeys).where(eq(journeys.id, data.journey_ID)).limit(1)
    )[0];

    if (!journey.points || !journey.owner) throw error(404, 'Unable to find journey');

    const currentPoints = (
        await conn.select({ points: users.points }).from(users).where(eq(users.email, email))
    )[0];

    if (!currentPoints.points) throw error(500, 'Unable to fetch user');

    const newPoints = currentPoints.points + journey.points;

    await conn
        .update(users)
        .set({ points: newPoints })
        .where(eq(users.email, email))
        .returning({ newPoints: users.points });

    return json({
        points: newPoints,
    });
};
