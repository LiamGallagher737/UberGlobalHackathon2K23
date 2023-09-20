import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import forceLogin from '$lib/forceLogin';

type LeaderboardEntry = {
    name: string;
    points: number;
};

type Leaderboard = {
    leaderboard: LeaderboardEntry[] | null;
    user: LeaderboardEntry;
};

export const load = (async ({ locals, fetch }) => {
    await forceLogin(locals);
    const res = await fetch(`/api/leaderboard/friends`);
    if (!res.ok) throw error(500, 'Failed to fetch leaderboard');
    const result: Leaderboard = await res.json();
    result.leaderboard?.push({ points: result.user.points, name: 'You' });
    result.leaderboard?.sort((a, b) => b.points - a.points);
    return {
        leaderboard: result.leaderboard,
    };
}) satisfies PageServerLoad;