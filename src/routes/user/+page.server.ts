import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import forceLogin from '$lib/forceLogin';

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const session = await forceLogin(locals);

    const query = await fetch('/api/user');
    if (!query.ok) throw error(404, "We couldn't find you");

    const data: {
        id: number;
        email: string;
        name: string;
        points: number;
        code: string;
        friends: number[] | null;
        private: boolean;
        pfp: string;
    } = await query.json();

    return data;
};
