import { conn } from "$lib/db/conn.server";
import { users } from "$lib/db/schema";
import { error, json, redirect, type RequestHandler } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export const GET: RequestHandler = async ({ params, locals }) => {
    const code = params.code;

    if (!code)
        throw error(404, "No code supplied");

    const session = await locals.getSession();

    if (!session?.user?.email)
        throw error(402, "No valid session")

    const friendID = (await conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.code, code))
        .limit(1))[0]?.id;

    if (!friendID)
        throw error(404, "Could not find friend of that code");

    const myID = (await conn
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, session.user?.email))
        .limit(1))[0]?.id;

    if (!myID)
        throw error(500, "Could not determine your user ID from session");

    const meToYou = conn
        .execute(
            sql`UPDATE "user" SET friends = ARRAY_REMOVE(friends, ${friendID}) WHERE id = ${myID};`
        );

    const youToMe = conn
        .execute(
            sql`UPDATE "user" SET friends = ARRAY_REMOVE(friends, ${myID}) WHERE id = ${friendID};`
        );

    await Promise.all([meToYou, youToMe])

    return json({ status: "ok" });
}