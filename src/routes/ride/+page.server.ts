import forceLogin from '$lib/forceLogin';
import type { PageServerLoad } from '../user/$types';

export const load: PageServerLoad = async ({ locals }) => {
    await forceLogin(locals);
};
