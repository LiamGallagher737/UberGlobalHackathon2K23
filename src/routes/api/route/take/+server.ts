import { conn } from '$lib/db/conn.server';
import { journeys, users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

type TakeJourneyData = {
    journey_ID: number | undefined | null;
};

export const POST: RequestHandler = async ({ locals, request }) => {
    const session = await locals.getSession();

    if (!session?.user?.email) throw error(401, 'No session provided');

    const email = session.user.email;

    const data: TakeJourneyData = await request.json();

    if (!data.journey_ID) throw error(422, 'No journey_ID provided');

    const journey = (
        await conn.select().from(journeys).where(eq(journeys.id, data.journey_ID)).limit(1)
    )[0];

    if (!journey.points || !journey.ownerEmail) throw error(404, 'Unable to find journey');

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
