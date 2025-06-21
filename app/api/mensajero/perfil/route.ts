// app/api/mensajero/perfil/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || token.role !== "courier") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const courierRes = await pool.query(
    `SELECT 
      c.name,
      c.phone,
      c.transport_type,
      c.rate,
      c.max_weight,
      u.email
     FROM couriers c
     JOIN users u ON u.id = c.user_id
     WHERE c.user_id = $1`,
    [token.id]
  );

  if (courierRes.rows.length === 0) {
    return NextResponse.json({ error: "Mensajero no encontrado" }, { status: 404 });
  }

  return NextResponse.json(courierRes.rows[0]);
}

