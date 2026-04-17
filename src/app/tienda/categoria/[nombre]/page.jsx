import { notFound } from "next/navigation"
import ShopHeader from "../../../components/ShopHeader"
import ShopFooter from "../../../components/ShopFooter"
import ProductGrid from "../../../components/ProductGrid"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const LIMIT = 12

async function getProductosPorCategoria(nombre, page = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  try {
    const offset = (page - 1) * LIMIT
    const res = await fetch(
      `${baseUrl}/api/productos/categoria/${encodeURIComponent(nombre)}?limit=${LIMIT}&offset=${offset}`,
      { next: { revalidate: 3600 } }
    )
    if (res.status === 404) return null
    if (!res.ok) throw new Error("Error al cargar productos")
    return res.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { nombre } = await params  // 👈 await
  const data = await getProductosPorCategoria(decodeURIComponent(nombre))

  if (!data) return { title: "Categoría no encontrada | Tienda Club Colón de Chivilcoy" }

  return {
    title: `${data.categoria.nombre} | Tienda Club Colón de Chivilcoy`,
    description: `Productos de ${data.categoria.nombre} en la tienda oficial del Club Colón de Chivilcoy.`,
  }
}

export default async function CategoriaPage({ params, searchParams }) {
  const { nombre } = await params          // 👈 await
  const { page: pageParam } = await searchParams  // 👈 await
  const nombreDecoded = decodeURIComponent(nombre)
  const page = parseInt(pageParam || "1")

  const data = await getProductosPorCategoria(nombreDecoded, page)

  if (!data) notFound()

  const { categoria, productos, total } = data
  const totalPages = Math.ceil(total / LIMIT)

  const generatePageUrl = (pageNum) =>
    `/tienda/categoria/${encodeURIComponent(nombreDecoded)}?page=${pageNum}`

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page <= 3) {
        pages.push(2, 3, 4, 5, "...", totalPages)
      } else if (page >= totalPages - 2) {
        pages.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push("...", page - 1, page, page + 1, "...", totalPages)
      }
    }

    return (
      <div className="flex justify-center mt-12">
        <nav className="inline-flex items-center rounded-md shadow-sm">
          <Link
            href={page > 1 ? generatePageUrl(page - 1) : "#"}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
              page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>

          {pages.map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                ...
              </span>
            ) : (
              <Link
                key={pageNum}
                href={generatePageUrl(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  pageNum === page
                    ? "z-10 bg-red-600 border-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}

          <Link
            href={page < totalPages ? generatePageUrl(page + 1) : "#"}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
              page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-6">
          <Link href="/" className="text-red-600 hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href="/tienda" className="text-red-600 hover:underline">Tienda</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">{categoria.nombre}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoria.nombre}</h1>
          <p className="text-gray-500 text-sm">
            {total} producto{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
            {totalPages > 1 && ` — Página ${page} de ${totalPages}`}
          </p>
        </div>

        {/* Grid */}
        <ProductGrid products={productos} />

        {/* Paginación */}
        {renderPagination()}

        {/* Volver */}
        <div className="mt-12 text-center">
          <Link href="/tienda" className="inline-flex items-center text-red-600 hover:underline font-medium">
            ← Volver a la tienda
          </Link>
        </div>

      </main>
      <ShopFooter />
    </div>
  )
}