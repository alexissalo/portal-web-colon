import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "100")
    const offset = parseInt(searchParams.get("offset") || "0")

    const [categorias] = await pool.query(`
      SELECT 
        c.id_categoria,
        c.nombre,
        c.descripcion,
        COUNT(p.id_producto) as total_productos
      FROM categorias_productos c
      LEFT JOIN productos p ON c.id_categoria = p.id_categoria
      GROUP BY c.id_categoria
      ORDER BY total_productos DESC
      LIMIT ? OFFSET ?
    `, [limit, offset])

    return NextResponse.json({ categorias })
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return NextResponse.json({ error: "Error al obtener las categorías" }, { status: 500 })
  }
}