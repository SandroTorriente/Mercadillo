import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password-utils";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: Request) {
  const body = await req.json();

  const {
    email,
    password,
    name,
    phone,
    transport_type,
    rate,
    max_weight,
  } = body;

  // Valida que no exista ya
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: "Correo ya registrado" }, { status: 400 });
  }

  const hashed = await hashPassword(password);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userRes = await client.query(
      `INSERT INTO users (email, password, role) VALUES ($1, $2, 'courier') RETURNING id`,
      [email, hashed]
    );
    const userId = userRes.rows[0].id;

    await client.query(
      `INSERT INTO couriers (user_id, name, phone, transport_type, rate, max_weight)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, name, phone, transport_type, rate, max_weight]
    );

    await client.query("COMMIT");
    return NextResponse.json({ message: "Mensajero creado" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return NextResponse.json({ error: "Error al crear el mensajero" }, { status: 500 });
  } finally {
    client.release();
  }
}
