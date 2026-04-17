import Link from "next/link"
import { notFound } from "next/navigation"
import ShopHeader from "@/src/app/components/ShopHeader"
import ShopFooter from "@/src/app/components/ShopFooter"
import ProductImageGallery from "@/src/app/components/ProductImageGallery"
import ProductDetails from "@/src/app/components/ProductDetails"
import RelatedProducts from "@/src/app/components/RelatedProducts"
import { generateMetadata as generateSeoMetadata } from "../../../../lib/seo"
import { buildProductoSlug } from "../../../../lib/slugify"  // 👈

async function getProducto(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  try {
    const res = await fetch(`${baseUrl}/api/productos/${slug}`, {  // 👈 slug en lugar de id
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error("Error al cargar el producto")
    }
    return res.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const slug = params?.slug  // 👈
  const data = await getProducto(slug)

  if (!data || !data.producto) {
    return { title: "Producto no encontrado | Tienda Club Colon de Chivilcoy" }
  }

  const { producto } = data

  return generateSeoMetadata({
    title: `${producto.nombre} | Tienda Club Colon de Chivilcoy`,
    description: producto.descripcion || `Compra ${producto.nombre} en la tienda oficial del Club Colon de Chivilcoy.`,
    keywords: ["tienda", producto.categoria_nombre, producto.nombre, "Club Colon de Chivilcoy"],
    image: producto.imagenes?.[0],
  })
}

export default async function ProductoPage({ params }) {
  const slug = params?.slug  // 👈
  const data = await getProducto(slug)

  if (!data || !data.producto) notFound()

  const { producto, relacionados } = data

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm mb-6">
            <Link href="/" className="text-red-600 hover:underline">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/tienda" className="text-red-600 hover:underline">
              Tienda
            </Link>
            <span className="text-gray-500">/</span>
            <Link
              href={`/tienda/categoria/${producto.categoria_nombre.toLowerCase()}`}
              className="text-red-600 hover:underline"
            >
              {producto.categoria_nombre}
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">{producto.nombre}</span>
          </div>

          {/* Producto principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Galería de imágenes */}
            <div>
              <ProductImageGallery images={producto.imagenes} productName={producto.nombre} />
            </div>

            {/* Detalles del producto */}
            <div>
              <ProductDetails producto={producto} />
            </div>
          </div>

          {/* Descripción completa */}
          {producto.descripcion && (
            <div className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
                </div>
              </div>
            </div>
          )}

          {/* Productos relacionados */}
          {relacionados && relacionados.length > 0 && (
            <RelatedProducts
              products={relacionados.map((rel) => ({
                ...rel,
                // 👇 slug en los links de relacionados
                slug: buildProductoSlug(rel.id_producto, rel.nombre),
              }))}
            />
          )}
        </div>
      </main>
      <ShopFooter />
    </div>
  )
}
