// lib/slugify.js
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")                     // separa acentos
    .replace(/[\u0300-\u036f]/g, "")      // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "")        // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, "-")                 // espacios → guiones
    .replace(/-+/g, "-")                  // múltiples guiones → uno
}

export function extractIdFromSlug(slug) {
  // Extrae el ID del final: "titulo-noticia-42" → "42"
  const parts = slug.split("-")
  return parts[parts.length - 1]
}

export function buildNoticiaSlug(id, titulo) {
  return `${slugify(titulo)}-${id}`
}

export function buildProductoSlug(id, nombre) {
  return `${slugify(nombre)}-${id}`
}