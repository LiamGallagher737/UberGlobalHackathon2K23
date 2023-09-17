import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Auth0Provider from '@auth/core/providers/auth0';
import type { Provider } from '@auth/core/providers';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_AUTH0_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
import { PRIVATE_AUTH0_SECRET } from '$env/static/private';
import { conn } from '$lib/db/conn.server';
import { eq } from 'drizzle-orm';
import { users } from '$lib/db/schema';

const config: SvelteKitAuthConfig = {
    providers: [
        Auth0Provider({
            id: 'auth0',
            name: 'Auth0',
            clientId: PUBLIC_AUTH0_ID,
            clientSecret: PRIVATE_AUTH0_SECRET,
            issuer: PUBLIC_AUTH0_DOMAIN,
            wellKnown: `${PUBLIC_AUTH0_DOMAIN}.well-known/openid-configuration`,
        }) as Provider,
    ],
    secret: 'cfc1bb18fc9ba615ea8a3f6db2df089c',
    debug: true,
    session: {
        maxAge: 60 * 60 * 24, // 24 hours
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(`\n\n\nUSERUSERUSERUSEURSU: ${JSON.stringify(profile)}\n\n\n`);
            if (!profile?.email) return false;
            const user_res = await conn.select().from(users).where(eq(users.email, profile.email));

            if (user_res.length !== 0) {
                // User already exists
                return true;
            }

            let insert_res = await conn
                .insert(users)
                .values({
                    email: profile.email,
                    name: profile.name ?? 'Anonymous',
                    code: generateRandomString(8),
                })
                .returning();

            if (insert_res.length !== 0) {
                // User added
                return true;
            }

            // Unable to add user
            return false;
        },
    },
};

export const handle = SvelteKitAuth(config) satisfies Handle;

function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
