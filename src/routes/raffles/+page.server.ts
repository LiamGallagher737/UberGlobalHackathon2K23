import { conn } from '$lib/db/conn.server';
import { raffles } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async ({ setHeaders }) => {
    const result = await conn.select().from(raffles);

    setHeaders({
        // Browser chache for 5 mins, vercel cache for 30 mins
        'Cache-Control': 'max-age=300, s-maxage=1800',
    });

    return {
        result,
    };
}) satisfies PageServerLoad;
