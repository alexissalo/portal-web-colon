import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NoticiaDestacada from "./components/noticia-destacada"
import UltimasNoticias from "./components/ultimas-noticias"
import { generateMetadata } from "../../lib/seo"


export const metadata = generateMetadata({
  title: "Noticias | Club Colon de Chivilcoy",
  description: "Mantente al día con las últimas noticias del Club Colon de Chivilcoy",
  keywords: ["noticias", "actualidad", "Club Colon de Chivilcoy", "chivilcoy"],
})

// Función para obtener noticias desde nuestra API
async function getNoticias(page = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  const res = await fetch(`${baseUrl}/api/noticias?limit=9&page=${page}`, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error("Error al cargar las noticias")
  }

  return res.json()
}

// Función para obtener noticias destacadas
async function getNoticiasDestacadas() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  const res = await fetch(`${baseUrl}/api/noticias/destacadas`, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error("Error al cargar las noticias destacadas")
  }

  return res.json()
}

export default async function NoticiasPage({ searchParams }) {
  // Obtener el número de página actual de los parámetros de búsqueda
   // Esperar los searchParams porque ahora son async
  const params = await searchParams;

  // Obtener page
  const page = params?.page;
  const currentPage = page ? parseInt(page) : 1;

  // Obtener datos de noticias
  const noticiasData = await getNoticias(currentPage)
  const noticiasDestacadasData = await getNoticiasDestacadas()

  // Función para generar el paginador
  const renderPagination = () => {
    const { pagination } = noticiasData
    if (!pagination || pagination.totalPages <= 1) return null

    const { page, totalPages } = pagination

    // Determinar qué páginas mostrar
    let pagesToShow = []

    if (totalPages <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      // Siempre mostrar la primera página
      pagesToShow.push(1)

      // Si la página actual está entre las primeras 3, mostrar las primeras 5 páginas
      if (page <= 3) {
        pagesToShow.push(2, 3, 4, 5)
        pagesToShow.push("ellipsis")
        pagesToShow.push(totalPages)
      }
      // Si la página actual está entre las últimas 3, mostrar las últimas 5 páginas
      else if (page >= totalPages - 2) {
        pagesToShow.push("ellipsis")
        pagesToShow.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      }
      // Si la página actual está en el medio, mostrar 2 páginas antes y 2 después
      else {
        pagesToShow.push("ellipsis")
        pagesToShow.push(page - 1, page, page + 1)
        pagesToShow.push("ellipsis")
        pagesToShow.push(totalPages)
      }
    }

    return (
      <div className="flex justify-center mt-12">
        <nav className="inline-flex items-center rounded-md shadow-sm" aria-label="Paginación">
          {/* Botón Anterior */}
          <Link
            href={page > 1 ? `/noticias?page=${page - 1}` : "#"}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
              page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
          >
            <span className="sr-only">Anterior</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Link>

          {/* Números de página */}
          {pagesToShow.map((pageNum, index) => {
            if (pageNum === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              )
            }

            return (
              <Link
                key={pageNum}
                href={`/noticias?page=${pageNum}`}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  pageNum === page
                    ? "z-10 bg-red-600 border-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {pageNum}
              </Link>
            )
          })}

          {/* Botón Siguiente */}
          <Link
            href={page < totalPages ? `/noticias?page=${page + 1}` : "#"}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
              page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : 0}
          >
            <span className="sr-only">Siguiente</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm mb-6">
            <Link href="/" className="text-red-600 hover:underline">
              Inicio
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">Noticias</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl font-bold text-black mb-8">Noticias</h1>

          {/* Noticia destacada con slider */}
          <NoticiaDestacada noticias={noticiasDestacadasData.noticias} />

          {/* Grid de últimas noticias */}
          <UltimasNoticias noticias={noticiasData.noticias} />

          {/* Paginación mejorada */}
          {renderPagination()}
        </div>
      </main>
    </div>
  )
}