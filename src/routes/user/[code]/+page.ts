import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type User = {
    name: string;
    id: number;
    points: number;
    code: string;
    isFriend: boolean;
    isMe: boolean;
    pfp: string;
};

export const load = (async ({ params, fetch }) => {
    const res = await fetch(`/api/user/${params.code}`);
    if (!res.ok) throw error(404, 'User not found');
    const user: User = await res.json();
    return user;
}) satisfies PageLoad;
