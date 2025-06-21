import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: Request) {
  try {
    const { name, phone, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }

    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (exists.rowCount > 0) {
      return NextResponse.json({ message: "Este correo ya está registrado" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // 1. Crear en tabla users (solo datos de autenticación)
    const userResult = await pool.query(
      `INSERT INTO users (email, password, role) 
       VALUES ($1, $2, 'client') RETURNING id`,
      [email, hashed]
    );

    const userId = userResult.rows[0].id;

    // 2. Crear en tabla clients con datos personales
    await pool.query(
      `INSERT INTO clients (user_id, name, phone) 
       VALUES ($1, $2, $3)`,
      [userId, name, phone || null]
    );

    return NextResponse.json({ message: "Cliente registrado correctamente" });
  } catch (error) {
    console.error("❌ Error en registro de cliente:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

