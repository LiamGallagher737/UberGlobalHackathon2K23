import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Auth0Provider from '@auth/core/providers/auth0';
import type { Provider } from '@auth/core/providers';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_AUTH0_ID, PUBLIC_AUTH0_DOMAIN } from '$env/static/public';
import { PRIVATE_AUTH0_SECRET } from '$env/static/private';

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
        maxAge: 1800, // 30 mins
    },
};

export const handle = SvelteKitAuth(config) satisfies Handle;
