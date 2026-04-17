import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const limit = Number.parseInt(searchParams.get("limit") || "12");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "fecha_creacion";
    const sortOrder = searchParams.get("sortOrder") || "DESC";
    const offset = (page - 1) * limit;

    // Construir la consulta SQL base
    let query = `
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.fecha_creacion,
        c.nombre as categoria_nombre,
        c.id_categoria,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        GROUP_CONCAT(DISTINCT i.ruta_imagen) as imagenes,
        COUNT(DISTINCT sp.id_stock) as tiene_stock,
        SUM(sp.cantidad) as stock_total
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
    `;

    const queryParams = [];
    const whereConditions = [];

    // Filtro por categoría
    if (categoria) {
      whereConditions.push("c.nombre = ?");
      queryParams.push(categoria);
    }

    const precioMin = searchParams.get("precioMin");
    const precioMax = searchParams.get("precioMax");

    // Dentro de whereConditions, después del filtro de búsqueda:
    if (precioMin) {
      whereConditions.push("p.precio >= ?");
      queryParams.push(Number(precioMin));
    }

    if (precioMax) {
      whereConditions.push("p.precio <= ?");
      queryParams.push(Number(precioMax));
    }

    // Filtro por búsqueda
    if (search) {
      whereConditions.push("(p.nombre LIKE ? OR p.descripcion LIKE ?)");
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    // Agregar condiciones WHERE si existen
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(" AND ")}`;
    }

    // Agrupar por producto
    query += ` GROUP BY p.id_producto`;

    // Ordenamiento
    const validSortFields = ["nombre", "precio", "fecha_creacion"];
    const validSortOrders = ["ASC", "DESC"];

    if (
      validSortFields.includes(sortBy) &&
      validSortOrders.includes(sortOrder.toUpperCase())
    ) {
      query += ` ORDER BY p.${sortBy} ${sortOrder.toUpperCase()}`;
    }

    // Paginación
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    // Ejecutar la consulta
    const [productos] = await pool.query(query, queryParams);

    // Procesar las imágenes
    const processedProductos = productos.map((producto) => ({
      ...producto,
      imagenes: producto.imagenes ? producto.imagenes.split(",") : [],
      tiene_stock: producto.tiene_stock > 0,
      stock_total: producto.stock_total || 0,
    }));

    // Obtener el total de productos para la paginación
    let countQuery = `
      SELECT COUNT(DISTINCT p.id_producto) as total 
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
    `;

    if (whereConditions.length > 0) {
      countQuery += ` WHERE ${whereConditions.join(" AND ")}`;
    }

    const [totalResult] = await pool.query(
      countQuery,
      queryParams.slice(0, -2),
    ); // Remover limit y offset
    const total = totalResult[0].total;

    return NextResponse.json({
      productos: processedProductos,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 },
    );
  }
}
