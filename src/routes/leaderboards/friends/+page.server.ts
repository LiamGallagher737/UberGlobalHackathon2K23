import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import forceLogin from '$lib/forceLogin';

type LeaderboardEntry = {
    name: string;
    points: number;
};

type Leaderboard = {
    result: LeaderboardEntry[];
};

export const load = (async ({ locals, fetch }) => {
    await forceLogin(locals);
    const res = await fetch(`/api/leaderboard/friends`);
    if (!res.ok) throw error(500, 'Failed to fetch leaderboard');
    const leaderboard: Leaderboard = await res.json();
    return leaderboard;
}) satisfies PageServerLoad;
