// app/api/productos/novedades/route.js
import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "8")

    const [productos] = await pool.query(
      `SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        p.fecha_creacion,
        c.nombre as categoria_nombre,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        SUM(sp.cantidad) as stock_total
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
      GROUP BY p.id_producto
      ORDER BY p.fecha_creacion DESC
      LIMIT ?`,
      [limit]
    )

    const procesados = productos.map((p) => ({
      ...p,
      imagen_principal: p.imagen_principal
        ? p.imagen_principal.split(",")[0]
        : "/placeholder.svg",
      tiene_stock: (p.stock_total || 0) > 0,
      nuevo: true, // todos los de novedades llevan el badge NUEVO
    }))

    return NextResponse.json({ productos: procesados })
  } catch (error) {
    console.error("Error al obtener novedades:", error)
    return NextResponse.json({ error: "Error al obtener las novedades" }, { status: 500 })
  }
}