import { conn } from "$lib/db/conn.server";
import { users } from "$lib/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ params, locals }) => {
    const code = params.code;
    if (!code)
        throw error(422, "No code supplied");

    const user = (await conn
        .select({ id: users.id, private: users.private, points: users.points, name: users.name })
        .from(users)
        .where(eq(users.code, code))
        .limit(1))[0];

    if (!user.id || !user.points)
        throw error(404, "Could not find user");

    if (user.private)
        throw error(403, "User has set themselves to private");

    return json({
        name: user.name,
        id: user.id,
        points: user.points,
        code: code
    })
}