import { client } from '$lib/maps';
import type { LatLng } from '@googlemaps/google-maps-services-js';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { PRIVATE_MAPS_API_KEY } from '$env/static/private';
import { conn } from '$lib/db/conn.server';
import { journeys } from '$lib/db/schema';
import type { Session } from '@auth/core/types';

type RouteFinderData = {
    start: LatLng | undefined;
    destination: LatLng | undefined;
    carPointMultiplier: number | undefined;
};

export const POST: RequestHandler = async ({ locals, request }) => {
    const data: RouteFinderData = await request.json();

    const session = await locals.getSession();

    if (session === null) throw error(401, 'No session provided');

    if (!data.start || !data.destination) throw error(422, 'Start or Destination was not provided');

    data.carPointMultiplier ??= 1;

    const response = await client.distancematrix({
        params: {
            origins: [data.start],
            destinations: [data.destination],
            key: PRIVATE_MAPS_API_KEY,
        },
    });

    const journeyData = response.data.rows[0].elements[0];
    const distance = journeyData.distance.value;
    const time = journeyData.duration.value;

    const points = CalculatePoints(distance, time, data.carPointMultiplier);

    const id = SaveJourney(points, session);

    return json({
        journey_ID: id,
        distance: distance,
        time: time,
    });
};

function CalculatePoints(distance: number, time: number, pointMultiplier: number): number {
    return distance * pointMultiplier;
}

async function SaveJourney(points: number, session: Session): Promise<number> {
    const result = await conn.insert(journeys).values({
        points: points,
        ownerEmail: session.user?.email,
    });

    return result.primaryKey;
}
