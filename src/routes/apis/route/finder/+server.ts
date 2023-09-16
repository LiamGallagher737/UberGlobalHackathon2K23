import { client } from "$lib/maps";
import type { LatLng } from "@googlemaps/google-maps-services-js";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { PRIVATE_MAPS_API_KEY } from '$env/static/private';
import { conn } from "$lib/db/conn.server";
import { journeys } from "$lib/db/schema";


type RouteFinderData = {
    start: LatLng | undefined,
    destination: LatLng | undefined,
    carPointMultiplier: number | undefined,
}

export const POST: RequestHandler = async ({ locals, request }) => {
    const data: RouteFinderData = await request.json();

    const session = await locals.getSession();

    if (data.start === undefined || data.destination === undefined)
        throw error(422, "Start or Destination was not provided");


    data.carPointMultiplier ??= 1;

    const response = await client.distancematrix({
        params: {
            origins: [data.start],
            destinations: [data.destination],
            key: PRIVATE_MAPS_API_KEY,
        }
    })

    const journeyData = response.data.rows[0].elements[0];
    const distance = journeyData.distance.value;
    const time = journeyData.duration.value;

    const points = CalculatePoints(distance, time, data.carPointMultiplier);

    const Id = SaveJourney(points, session);

    return json({
        journey_ID: Id,
        distance: distance,
        time: time,
    })
}

function CalculatePoints(distance: number, time: number, pointMultiplier: number): number {
    return distance * pointMultiplier;
}


async function SaveJourney(points: number, session: any): Promise<number> {
    const result = await conn
        .insert(journeys)
        .values({
            points: points,
            ownerId: session.user?.id
        });
}