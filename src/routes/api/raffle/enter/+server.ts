import { conn } from '$lib/db/conn.server';
import { raffleEntries, raffles, users } from '$lib/db/schema';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

type EnterData = {
    entries: number;
    raffleId: number;
};

/**
 * Purchase a cetain amount of raffle entries
 * @returns
 */
export const POST: RequestHandler = async ({ request, locals }) => {
    const data: EnterData = await request.json();

    if (!data.entries || !data.raffleId) throw error(422, 'Invalid/missing paramters supplied.');

    const session = await locals.getSession();
    if (session === null) throw error(401, 'Session not found');
    if (!session.user?.email) throw error(500, 'Session email not found');

    const priceRequest = conn
        .select({ cost: raffles.entryCost })
        .from(raffles)
        .where(eq(raffles.id, data.raffleId))
        .limit(1);

    const userRequest = conn
        .select({ id: users.id, points: users.points })
        .from(users)
        .where(eq(users.email, session.user?.email))
        .limit(1);

    const [priceResponse, userResponse] = await Promise.all([priceRequest, userRequest]);

    if (priceResponse.length === 0) throw error(404, 'No raffle of that ID found.');

    if (userResponse.length === 0) throw error(500, 'Unable to find your database entry.');

    const userPoints = userResponse[0].points;
    const userId = userResponse[0].id;

    const price = priceResponse[0].cost;
    const netCost = price * data.entries;

    if (netCost < userPoints) throw error(403, 'You do not have enough points to buy this.');

    const existingEntryResponse = await conn
        .select({ id: raffleEntries.id, count: raffleEntries.count })
        .from(raffleEntries)
        .where(eq(raffleEntries.user, userId));

    let newEntries: number;

    if (existingEntryResponse.length === 0) {
        // Create entry
        const res = await conn
            .insert(raffleEntries)
            .values({ user: userId, raffle: data.raffleId, count: data.entries });

        if (res === null) throw error(500, 'Failed to add entry');

        newEntries = data.entries;
    } else {
        // Update entry
        const newCount = data.entries + existingEntryResponse[0].count;
        const res = await conn
            .update(raffleEntries)
            .set({ count: newCount })
            .where(eq(raffleEntries.id, existingEntryResponse[0].id))
            .returning({ count: raffleEntries.count });

        if (res === null) throw error(500, 'Failed to update entry');

        newEntries = newCount;
    }

    const res = await conn
        .update(users)
        .set({ points: userPoints - netCost })
        .where(eq(users.id, userId));

    if (res === null) throw error(500, 'Failed to subtract points');

    return json({
        newEntries,
    });
};
