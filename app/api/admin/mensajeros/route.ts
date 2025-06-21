import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
    const res = await pool.query(`
    SELECT 
        c.user_id AS id,
        c.name,
        c.phone,
        c.transport_type,
        c.is_available,
        u.email
    FROM couriers c
    JOIN users u ON u.id = c.user_id
    `);

  return NextResponse.json(res.rows);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  await pool.query("DELETE FROM users WHERE id = $1", [id]); // Esto elimina también de `couriers` por ON DELETE CASCADE

  return NextResponse.json({ message: "Mensajero eliminado" });
}

