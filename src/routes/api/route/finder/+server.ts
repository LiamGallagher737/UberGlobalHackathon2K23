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
import { vehicle } from '$lib/emissions';
import forceLogin from '$lib/forceLogin';

export type RouteFinderData = {
    start: LatLng;
    destination: LatLng;
    carEmissionsId: string;
};

/**
 * Handles the user wanting to query a route for the distance,
 * time and amount of points earn't.
 * @returns The journey with all the data the user could possibly want
 */
export const POST: RequestHandler = async ({ locals, request }) => {
    const data: RouteFinderData = await request.json();

    console.log(data);

    const { email, session } = await forceLogin(locals);

    const userQuery = conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (!data?.start || !data?.destination)
        throw error(422, 'Start or Destination was not provided');

    const pointMultiplier = CalculatePointMultiplier(data.carEmissionsId);

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
    const points = CalculatePoints(distance, time, await pointMultiplier);

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

async function CalculatePointMultiplier(mode: string) {
    if (mode == 'walking') {
        return 15;
    } else {
        const res = await vehicle(mode);
        if (!res.emissionsList) throw new Error('Vehicle has no emissions data');
        return parseInt(res.emissionsList?.emissionsInfo[0].score);
    }
}

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
