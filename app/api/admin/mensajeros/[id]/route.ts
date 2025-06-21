import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Eliminar mensajero
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [userId]); // Asegúrate de tener ON DELETE CASCADE en couriers
    return NextResponse.json({ message: "Mensajero eliminado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar el mensajero" }, { status: 500 });
  }
}

// Actualizar mensajero
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const {
    name,
    phone,
    transport_type,
    rate,
    max_weight,
    is_available
  } = await req.json();

  try {
    await pool.query(
      `UPDATE couriers
       SET name = $1,
           phone = $2,
           transport_type = $3,
           rate = $4,
           max_weight = $5,
           is_available = COALESCE($6, is_available)
       WHERE user_id = $7`,
      [name, phone, transport_type, rate, max_weight, is_available ?? null, userId]
    );

    return NextResponse.json({ message: "Mensajero actualizado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar el mensajero" }, { status: 500 });
  }
}
