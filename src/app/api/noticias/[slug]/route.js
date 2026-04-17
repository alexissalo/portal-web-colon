// app/api/noticias/[slug]/route.js
import { NextResponse } from "next/server"
import pool from "../../../../lib/db"
import { extractIdFromSlug } from "../../../../lib/slugify"  // 👈 nuevo import

export async function GET(request, { params }) {
  try {
    const {slug} = await params
    const id = extractIdFromSlug(slug)  // 👈 extrae solo el ID numérico del slug

    // Obtener la noticia por ID
    const noticias = await pool.query(
      `
      SELECT 
        n.id_noticia, 
        n.titulo, 
        n.subtitulo, 
        n.contenido, 
        n.imagen_principal, 
        n.fecha_publicacion, 
        n.tags,
        c.nombre as categoria_nombre
      FROM noticias n
      LEFT JOIN categorias_noticias c ON n.id_categoria = c.id_categoria
      WHERE n.id_noticia = ?
    `,
      [id],
    )

    if (noticias.length === 0) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 })
    }
    
    

    // Procesar los tags JSON - manejar diferentes formatos posibles
    // Ahora accedemos correctamente al primer objeto de noticias
    const noticiasArray = Object.values(noticias); // Convertir a array
    const noticiaData = noticiasArray[0]; // Tomar la primera noticia
    let tags = [];

    if (noticiaData[0].tags) {
      if (Buffer.isBuffer(noticiaData[0].tags)) {
        // Si es un Buffer, convertirlo a string
        noticiaData[0].tags = noticiaData[0].tags.toString("utf8");
      }

      if (Array.isArray(noticiaData[0].tags)) {
        tags = [...noticiaData[0].tags]; // Si ya es array, copiarlo
      } else {
        try {
          tags = JSON.parse(noticiaData[0].tags); // Intentar parsear JSON
        } catch (e) {
          if (typeof noticiaData[0].tags === "string") {
            tags = noticiaData[0].tags.split(",").map((tag) => tag.trim()); // Separar por comas
          }
        }
      }
    }
   

    const noticia = {
      ...noticiaData[0],
      tags: tags,
    }

    // Obtener noticias relacionadas (misma categoría)
    const [noticiasRelacionadas] = await pool.query(
      `
      SELECT 
        n.id_noticia, 
        n.titulo, 
        n.subtitulo, 
        n.imagen_principal, 
        DATE_FORMAT(n.fecha_publicacion, "%d, %m, %Y") AS fecha_publicacion,
        n.tags
      FROM noticias n
      WHERE n.id_categoria = (
        SELECT id_categoria FROM noticias WHERE id_noticia = ?
      )
      AND n.id_noticia != ?
      ORDER BY n.fecha_publicacion DESC
      LIMIT 4
    `,
      [id, id],
    )

    // Procesar los tags JSON para las noticias relacionadas
    const relacionadas = noticiasRelacionadas.map((relacionada) => {
      // Crear una copia del objeto para no modificar el original
      const relacionadaData = { ...relacionada }
      let relacionadaTags = []

      if (relacionadaData.tags) {
        // Si ya es un array, usarlo directamente
        if (Array.isArray(relacionadaData.tags)) {
          relacionadaTags = [...relacionadaData.tags] // Crear una copia del array
        } else {
          try {
            // Intentar parsear como JSON
            relacionadaTags = JSON.parse(relacionadaData.tags)
          } catch (e) {
            // Si falla, verificar si es una cadena separada por comas
            if (typeof relacionadaData.tags === "string") {
              relacionadaTags = relacionadaData.tags.split(",").map((tag) => tag.trim())
            }
          }
        }
      }

      return {
        ...relacionadaData,
        tags: relacionadaTags,
      }
    })

    return NextResponse.json({
      noticia,
      relacionadas,
    })
  } catch (error) {
    console.error("Error al obtener la noticia:", error)
    return NextResponse.json({ error: "Error al obtener la noticia" }, { status: 500 })
  }
}

