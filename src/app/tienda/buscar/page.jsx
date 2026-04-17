"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ShopHeader from "../../components/ShopHeader"
import ShopFooter from "../../components/ShopFooter"
import ProductGrid from "../../components/ProductGrid"
import { Search } from "lucide-react"

export default function BuscarPage() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [totalResults, setTotalResults] = useState(0)

  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  useEffect(() => {
    setSearchTerm(query)
    if (query && query.trim().length >= 2) {
      searchProducts(query)
    } else {
      setProductos([])
      setTotalResults(0)
    }
  }, [query])

  const searchProducts = async (searchQuery) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/productos/buscar?q=${encodeURIComponent(searchQuery)}&limit=20`)
      const data = await response.json()

      if (response.ok) {
        setProductos(data.productos || [])
        setTotalResults(data.total || 0)
      } else {
        console.error("Error en búsqueda:", data.error)
        setProductos([])
        setTotalResults(0)
      }
    } catch (error) {
      console.error("Error al buscar productos:", error)
      setProductos([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Resultados de búsqueda</h1>
          {query && (
            <div className="flex items-center gap-2 text-gray-600">
              <Search className="h-5 w-5" />
              <span>
                {loading ? "Buscando..." : `${totalResults} resultado${totalResults !== 1 ? "s" : ""} para "${query}"`}
              </span>
            </div>
          )}
        </div>

        {!query || query.trim().length < 2 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Ingresa un término de búsqueda</h3>
            <p className="text-gray-500">Busca productos por nombre, descripción o categoría</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500 mb-4">No hay productos que coincidan con "{query}"</p>
            <div className="text-sm text-gray-500">
              <p>Sugerencias:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Verifica la ortografía</li>
                <li>Usa términos más generales</li>
                <li>Prueba con sinónimos</li>
              </ul>
            </div>
          </div>
        ) : (
          <ProductGrid products={productos} />
        )}
      </main>
      <ShopFooter />
    </div>
  )
}
