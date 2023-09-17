import type { PageLoad } from './$types';

type User = {
    name: string;
    id: number;
    points: number;
    code: string;
}

export const load = (async ({ params, fetch }) => {
    const user: User = await fetch(`/api/user/${params.code}`).then(resp => resp.json());
    return user;
}) satisfies PageLoad;