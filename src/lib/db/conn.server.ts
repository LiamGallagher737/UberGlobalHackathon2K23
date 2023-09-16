import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { PRIVATE_DATEBASE_URL } from '$env/static/private';

const client = postgres(PRIVATE_DATEBASE_URL)
export const conn = drizzle(client);
