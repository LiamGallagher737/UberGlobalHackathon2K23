import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const session = await locals.getSession();
    if (!session?.user?.email)
        throw redirect(302, "/auth")

    const query = await fetch("/api/user");
    if (!query.ok)
        throw error(404, "We couldn't find you")

    const data: {
        id: number;
        email: string;
        name: string;
        points: number;
        code: string;
        friends: number[] | null;
        private: boolean;
    } = await query.json()

    return data;
};