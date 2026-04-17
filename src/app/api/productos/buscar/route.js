import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!q || q.trim().length < 2) {
      return NextResponse.json({ productos: [] })
    }

    const searchTerm = `%${q.trim()}%`

    // Buscar productos por nombre y descripción
    const [productos] = await pool.query(
      `
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        c.nombre as categoria_nombre,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        SUM(sp.cantidad) as stock_total
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
      WHERE p.nombre LIKE ? OR p.descripcion LIKE ? OR c.nombre LIKE ?
      GROUP BY p.id_producto
      ORDER BY 
        CASE 
          WHEN p.nombre LIKE ? THEN 1
          WHEN p.descripcion LIKE ? THEN 2
          WHEN c.nombre LIKE ? THEN 3
          ELSE 4
        END,
        p.nombre
      LIMIT ?
    `,
      [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, limit],
    )

    const processedProductos = productos.map((producto) => ({
      ...producto,
      imagen_principal: producto.imagen_principal || "/placeholder.svg",
      tiene_stock: (producto.stock_total || 0) > 0,
    }))

    return NextResponse.json({
      productos: processedProductos,
      total: productos.length,
      query: q,
    })
  } catch (error) {
    console.error("Error en búsqueda de productos:", error)
    return NextResponse.json({ error: "Error en la búsqueda" }, { status: 500 })
  }
}
