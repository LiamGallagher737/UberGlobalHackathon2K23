import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type LeaderboardEntry = {
    name: string;
    points: number;
};

type Leaderboard = {
    result: LeaderboardEntry[];
};

export const load = (async ({ fetch }) => {
    const res = await fetch(`/api/leaderboard/global`);
    if (!res.ok) throw error(500, 'Failed to fetch leaderboard');
    const leaderboard: Leaderboard = await res.json();
    return leaderboard;
}) satisfies PageLoad;
