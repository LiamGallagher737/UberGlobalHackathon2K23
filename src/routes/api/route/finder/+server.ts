import { client } from '$lib/maps';
import {
    TravelMode,
    type LatLng,
    UnitSystem,
    type RouteLeg,
} from '@googlemaps/google-maps-services-js';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { PRIVATE_MAPS_API_KEY } from '$env/static/private';
import { conn } from '$lib/db/conn.server';
import { journeys, users } from '$lib/db/schema';
import type { Session } from '@auth/core/types';
import { eq } from 'drizzle-orm';

type RouteFinderData = {
    start: LatLng | undefined;
    destination: LatLng | undefined;
    carPointMultiplier: number | undefined;
};

/**
 * Handles the user wanting to query a route for the distance,
 * time and amount of points earn't.
 * @returns The journey with all the data the user could possibly want
 */
export const POST: RequestHandler = async ({ locals, request }) => {
    const data: RouteFinderData = await request.json();

    console.log(data);

    const session = await locals.getSession();

    if (!session?.user?.email) throw error(401, 'No session provided');

    const userQuery = conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, session.user?.email))
        .limit(1);

    if (!data?.start || !data?.destination)
        throw error(422, 'Start or Destination was not provided');

    data.carPointMultiplier ??= 1;

    const response = await client.directions({
        params: {
            origin: data.start,
            destination: data.destination,
            mode: TravelMode.driving,
            key: PRIVATE_MAPS_API_KEY,
            units: UnitSystem.metric,
        },
    });

    if (!response.data.routes[0].legs[0]) throw error(500, 'Unable to find route');

    let distance: number = 0;
    let time: number = 0;

    response.data.routes[0].legs.forEach((leg: RouteLeg) => {
        distance += leg.distance.value;
        time += leg.duration.value;
    });

    const polyline = response.data.routes[0].overview_polyline.points;

    //calculate points
    const points = CalculatePoints(distance, time, data.carPointMultiplier);

    const user = (await userQuery)[0];
    if (!user.id) throw error(500, 'Unable to find user');

    const id = await SaveJourney(points, session, user.id);

    return json({
        journey_ID: id,
        points: points,
        distance: distance,
        time: time,
        path: polyline,
    });
};

function CalculatePoints(distance: number, time: number, pointMultiplier: number): number {
    return distance * pointMultiplier;
}

async function SaveJourney(points: number, session: Session, ownerID: number): Promise<number> {
    const result = await conn
        .insert(journeys)
        .values({
            points: points,
            owner: ownerID,
        })
        .returning({ journeyID: journeys.id });

    return result[0].journeyID;
}
