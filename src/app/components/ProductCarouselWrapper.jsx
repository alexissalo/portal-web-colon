// components/ProductCarouselWrapper.jsx
import { buildProductoSlug } from "@/src/lib/slugify"
import ProductCarousel from "./ProductCarousel"

async function getProductosDestacados() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  try {
    const res = await fetch(`${baseUrl}/api/productos/destacados?limit=8`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.productos ?? []
  } catch (error) {
    console.error("Error al obtener productos destacados:", error)
    return []
  }
}

export default async function ProductCarouselWrapper() {
  const productos = await getProductosDestacados()

  // Normalizamos los datos para que el carousel reciba siempre el mismo shape
  const productosNormalizados = productos.map((p) => ({
    id: p.id_producto,
    nombre: p.nombre,
    precio: p.precio,
    imagen: p.imagen_principal || "/placeholder.svg",
    categoria: p.categoria_nombre,
    nuevo: p.nuevo,
    slug: buildProductoSlug(p.id_producto, p.nombre),
  }))

  return <ProductCarousel productos={productosNormalizados} />
}