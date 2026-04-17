// src/app/tienda/favoritos/page.jsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2 } from "lucide-react"
import ShopHeader from "../../components/ShopHeader"
import ShopFooter from "../../components/ShopFooter"
import { useFavoritos } from "@/src/lib/useFavoritos"
import { buildProductoSlug } from "@/src/lib/slugify"

export default function FavoritosPage() {
  const { favoritos, removeFavorito } = useFavoritos()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (favoritos.length === 0) {
      setProductos([])
      setLoading(false)
      return
    }

    const fetchFavoritos = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/productos/favoritos?ids=${favoritos.join(",")}`)
        const data = await res.json()
        setProductos(data.productos || [])
      } catch (error) {
        console.error("Error al cargar favoritos:", error)
        setProductos([])
      } finally {
        setLoading(false)
      }
    }

    fetchFavoritos()
  }, [favoritos]) // 👈 se re-ejecuta cuando cambia la lista (al eliminar)

  const handleRemove = (id) => {
    removeFavorito(id)
    // el useEffect de arriba se dispara solo al cambiar `favoritos`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ShopHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">Mis Favoritos</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <Heart className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">No tenés productos favoritos aún.</p>
            <Link
              href="/tienda/productos"
              className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <div
                key={producto.id_producto}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative aspect-square">
                  <Image
                    src={producto.imagen_principal}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemove(producto.id_producto)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors"
                    aria-label="Eliminar de favoritos"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{producto.nombre}</h2>
                  <p className="text-sm text-gray-500 mb-2">{producto.categoria_nombre}</p>
                  <p className="text-gray-800 font-bold mb-4">${Number(producto.precio).toFixed(2)}</p>
                  <Link
                    href={`/tienda/producto/${buildProductoSlug(producto.id_producto, producto.nombre)}`}
                    className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <ShopFooter />
    </div>
  )
}