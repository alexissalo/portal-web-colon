// app/api/productos/categoria/[nombre]/route.js
import { NextResponse } from "next/server"
import pool from "../../../../../lib/db"

export async function GET(request, { params }) {
  try {
    const { nombre } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Busca la categoría ignorando mayúsculas/minúsculas
    const [categorias] = await pool.query(
      `SELECT id_categoria, nombre FROM categorias_productos WHERE LOWER(nombre) = LOWER(?)`,
      [decodeURIComponent(nombre)]
    )

    if (categorias.length === 0) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
    }

    const categoria = categorias[0]

    const [productos] = await pool.query(
      `SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        p.descripcion,
        c.nombre as categoria_nombre,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        SUM(sp.cantidad) as stock_total
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
      WHERE p.id_categoria = ?
      GROUP BY p.id_producto
      ORDER BY p.fecha_creacion DESC
      LIMIT ? OFFSET ?`,
      [categoria.id_categoria, limit, offset]
    )

    const [totalResult] = await pool.query(
      `SELECT COUNT(*) as total FROM productos WHERE id_categoria = ?`,
      [categoria.id_categoria]
    )

    const procesados = productos.map((p) => ({
      ...p,
      imagen_principal: p.imagen_principal
        ? p.imagen_principal.split(",")[0]
        : "/placeholder.svg",
      tiene_stock: (p.stock_total || 0) > 0,
    }))

    return NextResponse.json({
      categoria,
      productos: procesados,
      total: totalResult[0].total,
    })
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error)
    return NextResponse.json({ error: "Error al obtener los productos" }, { status: 500 })
  }
}