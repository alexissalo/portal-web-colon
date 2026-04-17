import pool from "../../../lib/db"

export async function POST(request) {
  try {
    const { tipo_solicitud, datos_solicitud } = await request.json()

    // Validar datos requeridos
    const { datosPersonales, datosFamiliares, datosMedicos, comunicacion } = datos_solicitud

    if (!datosPersonales.nombre || !datosPersonales.dni || !datosPersonales.fechaNacimiento) {
      return Response.json({ error: "Faltan datos personales requeridos" }, { status: 400 })
    }

    if (!datosFamiliares.nombre || !datosFamiliares.emailResponsable || !datosFamiliares.telefono) {
      return Response.json({ error: "Faltan datos del responsable requeridos" }, { status: 400 })
    }

    if (!datosMedicos.grupoSanguineo || !datosMedicos.factor) {
      return Response.json({ error: "Faltan datos médicos requeridos" }, { status: 400 })
    }

    if (!comunicacion.telefonoEmergencia) {
      return Response.json({ error: "Falta teléfono de emergencia" }, { status: 400 })
    }

    // Verificar si ya existe una solicitud pendiente con el mismo DNI
    const existingSolicitud = await pool.query(
      `SELECT id_solicitud FROM solicitudes 
       WHERE JSON_EXTRACT(datos_solicitud, '$.datosPersonales.dni') = ? 
       AND estado = 'pendiente'`,
      [datosPersonales.dni],
    )

    console.log(existingSolicitud[0])

    if (existingSolicitud[0].length > 0) {
      return Response.json(
        {
          error: "Ya existe una solicitud pendiente para este DNI",
        },
        { status: 409 },
      )

      
    }

    // Insertar la solicitud
    const result = await pool.query(
      `INSERT INTO solicitudes (tipo_solicitud, estado, datos_solicitud) 
       VALUES (?, 'pendiente', ?)`,
      [tipo_solicitud, JSON.stringify(datos_solicitud)],
    )

    return Response.json({
      success: true,
      message: "Solicitud de inscripción enviada exitosamente",
      solicitudId: result.insertId,
    })
  } catch (error) {
    console.error("Error al crear solicitud:", error)
    return Response.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get("estado")
    const tipo = searchParams.get("tipo")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const whereClause = []
    const params = []

    if (estado) {
      whereClause.push("estado = ?")
      params.push(estado)
    }

    if (tipo) {
      whereClause.push("tipo_solicitud = ?")
      params.push(tipo)
    }

    const whereString = whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : ""

    // Obtener solicitudes
    const solicitudes = await pool.query(
      `SELECT id_solicitud, tipo_solicitud, estado, fecha_solicitud, datos_solicitud, observaciones
       FROM solicitudes 
       ${whereString}
       ORDER BY fecha_solicitud DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset],
    )

    // Obtener total para paginación
    const totalResult = await pool.query(`SELECT COUNT(*) as total FROM solicitudes ${whereString}`, params)

    const total = totalResult[0].total
    const totalPages = Math.ceil(total / limit)

    return Response.json({
      solicitudes: solicitudes.map((solicitud) => ({
        ...solicitud,
        datos_solicitud: JSON.parse(solicitud.datos_solicitud),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error al obtener solicitudes:", error)
    return Response.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
