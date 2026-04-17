import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request) {
  try {
    // Obtener todos los talles
    const [talles] = await pool.query(`
      SELECT 
        id_talle,
        nombre,
        descripcion
      FROM talles_productos
      ORDER BY 
        CASE 
          WHEN nombre REGEXP '^[0-9]+$' THEN CAST(nombre AS UNSIGNED)
          ELSE 999
        END,
        nombre
    `)

    return NextResponse.json({ talles })
  } catch (error) {
    console.error("Error al obtener talles:", error)
    return NextResponse.json({ error: "Error al obtener los talles" }, { status: 500 })
  }
}

