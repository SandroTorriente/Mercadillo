// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserByEmail(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const res = await pool.query(
    "SELECT id, email, password, role FROM users WHERE LOWER(email) = $1",
    [cleanEmail]
  );
  return res.rows[0] || null;
}
