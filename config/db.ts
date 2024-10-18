import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
    throw new Error("Database URL is not defined in environment variables");
}

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql);