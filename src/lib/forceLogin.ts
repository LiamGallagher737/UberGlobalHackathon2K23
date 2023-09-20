import { redirect } from "@sveltejs/kit";

/**
 * Forces the user to have a valid session to continue execution.
 * If the user does not have a valid session, they are redirected 
 * to the signin page.
 * @param locals The app locals, pass directly from the .server.ts arguments 
 * @returns The users email to allow for database lookups
 */
export default async function forceLogin(locals: App.Locals): Promise<string> {
    const session = await locals.getSession();

    if (!session?.user?.email) throw redirect(302, '/auth');

    return session.user.email;
}